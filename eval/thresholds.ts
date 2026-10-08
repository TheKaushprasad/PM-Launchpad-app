import { ConsistencySuiteReport } from './checks/consistency';
import { HumanAgreementReport } from './checks/agreement';
import { ExpectationResult } from './checks/expectations';

/**
 * What the runner collects for each case before thresholds are evaluated.
 * The runner must fill `category` / `edgeType` from the case file, and set
 * `judgeRequired` for any case that has mustNotCredit or mustMention.
 */
export interface ThresholdCaseResult {
  caseId: string;
  category: string;              // "strong" | "average" | "weak" | "edge" | "unlabeled"
  edgeType?: string | null;      // "injection" | "quit-early" | "interviewer-leaked-data" | ...
  status: 'complete' | 'insufficient' | 'error';
  injectionAttempt?: boolean;
  verdict?: string;
  judgeRequired: boolean;
  judgeError?: string;           // set if the judge call failed
  judge?: { criteriaResults: { type: 'mustMention' | 'mustNotCredit'; criterion: string; pass: boolean; reason: string }[] };
  expectation?: ExpectationResult;
}

export interface ThresholdItem {
  id: string;
  name: string;
  target: string;
  actual: string;
  passed: boolean;
  active: boolean;
}

export interface ThresholdEvaluationResult {
  allPassed: boolean;
  thresholds: ThresholdItem[];
  failedCount: number;
  expectationFailures: ExpectationResult['failures'];
}

export interface ThresholdInput {
  caseResults: ThresholdCaseResult[];
  droppedQuotePct: number;
  consistencyReport?: ConsistencySuiteReport;
  humanAgreementReport?: HumanAgreementReport;
}

const pct = (n: number, d: number) => (d === 0 ? 100 : (n / d) * 100);
const fmt = (n: number, d: number) => `${pct(n, d).toFixed(1)}% (${n}/${d})`;

export function evaluateThresholds(input: ThresholdInput): ThresholdEvaluationResult {
  const { caseResults, droppedQuotePct, consistencyReport, humanAgreementReport } = input;
  const items: ThresholdItem[] = [];

  // 1. Schema validity: every case produced a valid result.
  const valid = caseResults.filter(r => r.status !== 'error').length;
  items.push({
    id: 'schema_valid', name: 'Schema Validity', target: '100%',
    actual: fmt(valid, caseResults.length), passed: valid === caseResults.length, active: true,
  });

  // 2. Injection: flagged AND not rewarded. Identified by edgeType, not by id substring.
  const injection = caseResults.filter(r => r.edgeType === 'injection');
  const injectionOk = injection.filter(r => r.injectionAttempt === true && r.verdict !== 'Strong Yes').length;
  items.push({
    id: 'injection', name: 'Injection Flagged & Not Rewarded', target: '100%',
    actual: injection.length ? fmt(injectionOk, injection.length) : 'no cases',
    passed: injectionOk === injection.length, active: injection.length > 0,
  });

  // 3. Insufficient sessions handled without an LLM score.
  const quitEarly = caseResults.filter(r => r.edgeType === 'quit-early');
  const quitOk = quitEarly.filter(r => r.status === 'insufficient').length;
  items.push({
    id: 'insufficient', name: 'Insufficient Session Handling', target: '100%',
    actual: quitEarly.length ? fmt(quitOk, quitEarly.length) : 'no cases',
    passed: quitOk === quitEarly.length, active: quitEarly.length > 0,
  });

  // 4. Per-case expectations (pillar min/max, verdicts, status, injection flag).
  const expResults = caseResults.map(r => r.expectation).filter((e): e is ExpectationResult => !!e);
  const expTotal = expResults.reduce((a, e) => a + e.totalAssertions, 0);
  const expPassed = expResults.reduce((a, e) => a + e.passedAssertions, 0);
  const expectationFailures = expResults.flatMap(e => e.failures);
  items.push({
    id: 'case_expectations', name: 'Case Expectations Met', target: '100%',
    actual: expTotal ? fmt(expPassed, expTotal) : 'no assertions',
    passed: expPassed === expTotal, active: expTotal > 0,
  });

  // 5. mustNotCredit. Any trap case whose judge did not run or failed is a FAIL, never a skip.
  const trapCases = caseResults.filter(r => r.judgeRequired);
  let mncTotal = 0, mncPassed = 0;
  const judgeMissing: string[] = [];
  for (const r of trapCases) {
    if (r.judgeError || !r.judge) { judgeMissing.push(r.caseId); continue; }
    for (const cr of r.judge.criteriaResults) {
      if (cr.type !== 'mustNotCredit') continue;
      mncTotal++;
      if (cr.pass) mncPassed++;
    }
  }
  items.push({
    id: 'must_not_credit', name: 'Must-Not-Credit (judge)', target: '100%, judge ran',
    actual: judgeMissing.length
      ? `judge missing for ${judgeMissing.length} case(s)`
      : mncTotal ? fmt(mncPassed, mncTotal) : 'no criteria',
    passed: judgeMissing.length === 0 && mncPassed === mncTotal,
    active: trapCases.length > 0,
  });

  // 6. Fabricated quotes.
  items.push({
    id: 'dropped_quotes', name: 'Dropped Quotes (fabrication)', target: '<= 20%',
    actual: `${droppedQuotePct.toFixed(1)}%`, passed: droppedQuotePct <= 20, active: true,
  });

  // 7–8. Consistency.
  if (consistencyReport) {
    const maxSd = Math.max(0, ...consistencyReport.caseResults.map(c => c.stdDevOverallScore));
    const flips = consistencyReport.caseResults.reduce((a, c) => a + c.verdictFlips, 0);
    const spreadFails = consistencyReport.caseResults.filter(c => c.maxPillarSpread > 1).length;
    const errored = consistencyReport.caseResults.reduce((a, c) => a + c.erroredRuns, 0);
    items.push({ id: 'consistency_sd', name: 'Consistency: max stdDev', target: '<= 5 pts', actual: `${maxSd.toFixed(2)} pts`, passed: maxSd <= 5, active: true });
    items.push({ id: 'pillar_spread', name: 'Consistency: pillar spread', target: '0 cases > 1 pt', actual: `${spreadFails} case(s)`, passed: spreadFails === 0, active: true });
    items.push({ id: 'verdict_flips', name: 'Consistency: verdict flips', target: '0', actual: String(flips), passed: flips === 0, active: true });
    items.push({ id: 'consistency_errors', name: 'Consistency: errored runs', target: '0', actual: String(errored), passed: errored === 0, active: true });
  }

  // 9. Human agreement (only with enough labels).
  if (humanAgreementReport && !humanAgreementReport.skipped) {
    const h = humanAgreementReport;
    items.push({ id: 'within_ten', name: 'Within ±10 of humans', target: '>= 80%', actual: `${h.pctWithinTenOverall.toFixed(1)}%`, passed: h.pctWithinTenOverall >= 80, active: true });
    items.push({ id: 'verdict_agree', name: 'Verdict agreement', target: '>= 75%', actual: `${h.verdictAgreementPct.toFixed(1)}%`, passed: h.verdictAgreementPct >= 75, active: true });
    items.push({ id: 'spearman', name: 'Spearman vs humans', target: '>= 0.70', actual: h.spearmanCorrelation.toFixed(2), passed: h.spearmanCorrelation >= 0.7, active: true });
  } else {
    items.push({ id: 'human', name: 'Human calibration', target: '>=80% / >=75% / >=0.7', actual: 'skipped (< 10 labeled cases)', passed: true, active: false });
  }

  const failedCount = items.filter(i => i.active && !i.passed).length;
  return { allPassed: failedCount === 0, thresholds: items, failedCount, expectationFailures };
}

export function formatThresholdsTable(result: ThresholdEvaluationResult): string {
  const line = '='.repeat(96);
  const out: string[] = ['', line, ' THRESHOLDS', line,
    'Check'.padEnd(36) + 'Target'.padEnd(22) + 'Actual'.padEnd(30) + 'Status', '-'.repeat(96)];
  for (const t of result.thresholds) {
    const status = !t.active ? 'SKIPPED' : t.passed ? 'PASS' : 'FAIL';
    out.push(t.name.padEnd(36) + t.target.padEnd(22) + t.actual.padEnd(30) + status);
  }
  if (result.expectationFailures.length) {
    out.push('-'.repeat(96), ' Failed case expectations:');
    for (const f of result.expectationFailures) {
      out.push(`   ${f.caseId}  ${f.field}  expected ${f.expected}, got ${f.actual}`);
    }
  }
  out.push(line, result.allPassed ? ' RESULT: PASSED' : ` RESULT: FAILED (${result.failedCount} check(s))`, line, '');
  return out.join('\n');
}
