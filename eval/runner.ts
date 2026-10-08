/**
 * Interview evaluator benchmark.
 *
 *   npm run eval                       run every case, judge trap cases, print thresholds
 *   npm run eval -- --validate         offline: check the dataset, no API calls
 *   npm run eval -- --tier smoke       representative subset plus every trap case
 *   npm run eval -- --case a,b         only these case ids
 *   npm run eval -- --consistency 3    also run each case 3 times and check stability
 *   npm run eval -- --model gemini-3.8-flash   force one model, no failover
 *   npm run eval -- --provider openai          force a provider, no failover
 *
 * Exits 1 when any active threshold fails.
 */
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { loadCases } from './dataset';
import { callEngine, EngineCallOptions } from './engineCall';
import { checkExpectations } from './checks/expectations';
import { runConsistencyCheck } from './checks/consistency';
import { computeHumanAgreement } from './checks/agreement';
import { runJudge } from './judge';
import { evaluateThresholds, formatThresholdsTable, ThresholdCaseResult } from './thresholds';
import { BenchmarkCase } from './types';

dotenv.config();

interface Flags {
  validate: boolean;
  tier: 'smoke' | 'full';
  caseIds: string[];
  consistency: number;
  model?: string;
  provider?: 'gemini' | 'openai';
}

function parseFlags(argv: string[]): Flags {
  const flags: Flags = { validate: false, tier: 'full', caseIds: [], consistency: 0 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      const v = argv[++i];
      if (v === undefined) throw new Error(`${a} needs a value`);
      return v;
    };
    if (a === '--validate') flags.validate = true;
    else if (a === '--tier') {
      const t = next();
      if (t !== 'smoke' && t !== 'full') throw new Error('--tier must be smoke or full');
      flags.tier = t;
    } else if (a === '--case') flags.caseIds.push(...next().split(',').map((s) => s.trim()).filter(Boolean));
    else if (a === '--consistency') flags.consistency = parseInt(next(), 10) || 0;
    else if (a === '--model') flags.model = next();
    else if (a === '--provider') {
      const p = next();
      if (p !== 'gemini' && p !== 'openai') throw new Error('--provider must be gemini or openai');
      flags.provider = p;
    } else throw new Error(`Unknown flag ${a}`);
  }
  return flags;
}

/** One case per track and category, plus every case a judge must check. */
function smokeSubset(cases: BenchmarkCase[]): BenchmarkCase[] {
  const picked = new Map<string, BenchmarkCase>();
  const seenKeys = new Set<string>();
  for (const c of cases) {
    const key = c.category === 'edge' ? `edge:${c.edgeType}` : `${c.track}:${c.category}`;
    if (!seenKeys.has(key) && picked.size < 10) {
      seenKeys.add(key);
      picked.set(c.id, c);
    }
  }
  for (const c of cases) if (c.mustNotCredit?.length) picked.set(c.id, c);
  return [...picked.values()];
}

const SUBSTANTIVE_WORDS = 5;
const MIN_SUBSTANTIVE_TURNS = 3;

/** Mirrors the engine's incomplete-session guard so dataset mistakes show up offline. */
function substantiveCandidateTurns(c: BenchmarkCase): number {
  return c.messages.filter(
    (m) => m.role === 'candidate' && m.text.trim().split(/\s+/).filter(Boolean).length > SUBSTANTIVE_WORDS
  ).length;
}

async function validate(cases: BenchmarkCase[]): Promise<boolean> {
  const problems: string[] = [];
  for (const c of cases) {
    const turns = substantiveCandidateTurns(c);
    const expected = c.expectations?.expectedStatus;
    if (expected === 'insufficient' && turns >= MIN_SUBSTANTIVE_TURNS) {
      problems.push(`${c.id}: expects "insufficient" but has ${turns} substantive candidate turns`);
    }
    if (expected !== 'insufficient' && turns < MIN_SUBSTANTIVE_TURNS) {
      problems.push(`${c.id}: has only ${turns} substantive candidate turns, so the engine will return "insufficient"`);
    }
    if (c.edgeType === 'injection' && c.expectations?.injectionAttempt !== true) {
      problems.push(`${c.id}: injection cases must expect injectionAttempt: true`);
    }
    // Insufficient cases never reach a model, so they can run for real here.
    if (expected === 'insufficient') {
      const out = await callEngine(c);
      if (out?.status !== 'insufficient') problems.push(`${c.id}: engine returned "${out?.status}", expected "insufficient"`);
    }
  }

  console.log(`\nDataset: ${cases.length} cases`);
  for (const c of cases) {
    console.log(`  ${c.id.padEnd(34)} ${c.track.padEnd(12)} ${(c.edgeType ?? c.category).padEnd(24)} turns=${substantiveCandidateTurns(c)}`);
  }
  if (problems.length) {
    console.log(`\nVALIDATION FAILED:\n  ${problems.join('\n  ')}`);
    return false;
  }
  console.log('\nVALIDATION PASSED');
  return true;
}

async function main() {
  const flags = parseFlags(process.argv.slice(2));
  let cases = loadCases();

  if (flags.caseIds.length) {
    const unknown = flags.caseIds.filter((id) => !cases.some((c) => c.id === id));
    if (unknown.length) throw new Error(`Unknown case id(s): ${unknown.join(', ')}`);
    cases = cases.filter((c) => flags.caseIds.includes(c.id));
  } else if (flags.tier === 'smoke') {
    cases = smokeSubset(cases);
  }

  if (flags.validate) {
    process.exit((await validate(cases)) ? 0 : 1);
  }

  if (!process.env.GEMINI_API_KEY?.trim() && !process.env.OPENAI_API_KEY?.trim()) {
    throw new Error('Set GEMINI_API_KEY (or OPENAI_API_KEY) in .env to run the benchmark. Use --validate for an offline check.');
  }

  const engineOpts: EngineCallOptions = { model: flags.model, provider: flags.provider };
  const results: (ThresholdCaseResult & { overallScore?: number; modelId?: string; error?: string })[] = [];
  const outputs: Record<string, any> = {};
  let quotesTotal = 0;
  let quotesDropped = 0;

  for (const [i, c] of cases.entries()) {
    process.stdout.write(`[${i + 1}/${cases.length}] ${c.id} ... `);
    const judgeRequired = (c.mustNotCredit?.length ?? 0) + (c.mustMention?.length ?? 0) > 0;
    try {
      const output = await callEngine(c, engineOpts);
      outputs[c.id] = output;
      const status = output.status === 'insufficient' ? 'insufficient' : 'complete';
      const expectation = checkExpectations(c.id, c.expectations, output);

      if (status === 'complete') {
        quotesTotal += output.groundingStats?.total ?? 0;
        quotesDropped += output.groundingStats?.dropped ?? 0;
      }

      let judge, judgeError: string | undefined;
      if (judgeRequired && status === 'complete') {
        try {
          judge = await runJudge(c, output);
        } catch (e: any) {
          judgeError = e.message;
        }
      }

      results.push({
        caseId: c.id,
        category: c.category,
        edgeType: c.edgeType,
        status,
        injectionAttempt: output.injectionAttempt,
        verdict: output.verdict,
        overallScore: output.overallScore,
        modelId: output.modelId,
        judgeRequired: judgeRequired && status === 'complete',
        judge,
        judgeError,
        expectation,
      });
      const failed = expectation.failures.length + (judge?.criteriaResults.filter((r) => !r.pass).length ?? 0) + (judgeError ? 1 : 0);
      console.log(
        status === 'complete'
          ? `${output.overallScore} ${output.verdict} (${output.modelId})${failed ? `  ${failed} check(s) failed` : ''}`
          : `insufficient${failed ? `  ${failed} check(s) failed` : ''}`
      );
    } catch (e: any) {
      results.push({ caseId: c.id, category: c.category, edgeType: c.edgeType, status: 'error', judgeRequired, error: e.message });
      console.log(`ERROR ${e.message}`);
    }
  }

  const consistencyReport = flags.consistency > 1
    ? await runConsistencyCheck(cases, { ...engineOpts, runs: flags.consistency })
    : undefined;

  const humanAgreementReport = computeHumanAgreement(
    results
      .filter((r) => r.status === 'complete' && typeof r.overallScore === 'number')
      .map((r) => ({
        caseId: r.caseId,
        modelScore: r.overallScore!,
        modelVerdict: r.verdict ?? '',
        humanLabels: cases.find((c) => c.id === r.caseId)?.humanLabels ?? [],
      }))
  );

  const thresholds = evaluateThresholds({
    caseResults: results,
    droppedQuotePct: quotesTotal ? (quotesDropped / quotesTotal) * 100 : 0,
    consistencyReport,
    humanAgreementReport,
  });

  for (const r of results) {
    for (const cr of r.judge?.criteriaResults ?? []) {
      if (!cr.pass) console.log(`  judge FAIL ${r.caseId} [${cr.type}] ${cr.criterion}: ${cr.reason}`);
    }
    if (r.judgeError) console.log(`  judge ERROR ${r.caseId}: ${r.judgeError}`);
  }
  console.log(formatThresholdsTable(thresholds));

  const outDir = path.join(process.cwd(), 'eval', 'results');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `run-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  fs.writeFileSync(
    outFile,
    JSON.stringify({ flags, results, thresholds, consistencyReport, humanAgreementReport, outputs }, null, 2)
  );
  console.log(`Full report: ${path.relative(process.cwd(), outFile)}`);

  process.exit(thresholds.allPassed ? 0 : 1);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
