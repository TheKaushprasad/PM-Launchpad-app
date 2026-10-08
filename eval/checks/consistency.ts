import { BenchmarkCase } from '../types';
import { callEngine, EngineCallOptions } from '../engineCall';
import { getRawPillarScore, PILLARS, PillarKey } from './expectations';

export interface CaseConsistencyResult {
  caseId: string;
  caseName: string;
  runsCount: number;
  erroredRuns: number;
  scores: number[];
  meanOverallScore: number;
  stdDevOverallScore: number;
  pillarSpreads: Record<PillarKey, number>;
  maxPillarSpread: number;
  verdicts: string[];
  verdictFlips: number;
  verdictFlipRate: number;
  passed: boolean;
  failures: string[];
}

export interface ConsistencySuiteReport {
  timestamp: string;
  runsPerCase: number;
  model: string;
  provider: string;
  totalCases: number;
  passedCases: number;
  failedCases: number;
  caseResults: CaseConsistencyResult[];
  passed: boolean;
  failures: string[];
}

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const stdDev = (xs: number[], m: number) =>
  xs.length <= 1 ? 0 : Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / xs.length);

/**
 * Runs each case N times. FAIL if overallScore stdDev > 5, any pillar spread > 1,
 * the verdict changes across runs, or any run errors / returns a missing pillar.
 */
export async function runConsistencyCheck(
  cases: BenchmarkCase[],
  options: EngineCallOptions & { runs?: number } = {}
): Promise<ConsistencySuiteReport> {
  const N = options.runs ?? 3;
  const caseResults: CaseConsistencyResult[] = [];
  const suiteFailures: string[] = [];

  for (const bCase of cases) {
    if ((bCase as any).expectations?.expectedStatus === 'insufficient') continue;

    const scores: number[] = [];
    const verdicts: string[] = [];
    const pillarScores = Object.fromEntries(PILLARS.map(p => [p, [] as number[]])) as Record<PillarKey, number[]>;
    const caseFailures: string[] = [];
    let erroredRuns = 0;

    for (let r = 0; r < N; r++) {
      try {
        const res = await callEngine(bCase, options);
        if (res.status === 'insufficient') {
          throw new Error('engine returned "insufficient" for a case expected to complete');
        }
        // Read every pillar first, so a missing one errors the whole run (no partial data).
        const runPillars = PILLARS.map(p => getRawPillarScore(res, p));
        PILLARS.forEach((p, i) => pillarScores[p].push(runPillars[i]));
        scores.push(res.overallScore);
        verdicts.push(res.verdict);
      } catch (e: any) {
        erroredRuns++;
        caseFailures.push(`run ${r + 1} errored: ${e.message}`);
      }
    }

    const m = mean(scores);
    const sd = stdDev(scores, m);
    const spread = (xs: number[]) => (xs.length ? Math.max(...xs) - Math.min(...xs) : 0);
    const pillarSpreads = Object.fromEntries(PILLARS.map(p => [p, spread(pillarScores[p])])) as Record<PillarKey, number>;
    const maxPillarSpread = Math.max(...PILLARS.map(p => pillarSpreads[p]));

    const counts: Record<string, number> = {};
    verdicts.forEach(v => (counts[v] = (counts[v] ?? 0) + 1));
    const majority = verdicts.length ? Math.max(...Object.values(counts)) : 0;
    const verdictFlips = verdicts.length - majority;

    if (sd > 5) caseFailures.push(`overallScore stdDev ${sd.toFixed(2)} > 5`);
    if (maxPillarSpread > 1) caseFailures.push(`max pillar spread ${maxPillarSpread} > 1`);
    if (verdictFlips > 0) caseFailures.push(`verdict changed across runs (${verdicts.join(', ')})`);

    const passed = caseFailures.length === 0;
    if (!passed) suiteFailures.push(`${bCase.id}: ${caseFailures.join('; ')}`);

    caseResults.push({
      caseId: bCase.id,
      caseName: (bCase as any).name ?? bCase.id,
      runsCount: N,
      erroredRuns,
      scores,
      meanOverallScore: m,
      stdDevOverallScore: sd,
      pillarSpreads,
      maxPillarSpread,
      verdicts,
      verdictFlips,
      verdictFlipRate: verdicts.length ? verdictFlips / verdicts.length : 0,
      passed,
      failures: caseFailures,
    });
  }

  const passedCases = caseResults.filter(c => c.passed).length;
  return {
    timestamp: new Date().toISOString(),
    runsPerCase: N,
    model: options.model ?? 'default-chain',
    provider: options.provider ?? 'default',
    totalCases: caseResults.length,
    passedCases,
    failedCases: caseResults.length - passedCases,
    caseResults,
    passed: suiteFailures.length === 0,
    failures: suiteFailures,
  };
}
