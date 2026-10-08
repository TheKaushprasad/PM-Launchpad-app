/**
 * Per-case expectation assertions.
 *
 * Reads the case's top-level "expectations" field (never sent to the engine)
 * and checks it against the engine output. Every failed assertion is reported
 * as { caseId, field, expected, actual }.
 */

export type PillarKey = 'clarification' | 'framework' | 'analyticalRigor' | 'communication' | 'synthesis';
export const PILLARS: PillarKey[] = ['clarification', 'framework', 'analyticalRigor', 'communication', 'synthesis'];

export interface CaseExpectations {
  expectedStatus?: 'complete' | 'insufficient';
  pillarMin?: Partial<Record<PillarKey, number>>;
  pillarMax?: Partial<Record<PillarKey, number>>;
  overallMin?: number;
  overallMax?: number;
  allowedVerdicts?: string[];
  injectionAttempt?: boolean;
  /** Reported only. Never affects pass/fail. */
  informational?: { minEchoed?: number };
}

export interface AssertionFailure {
  caseId: string;
  field: string;
  expected: string;
  actual: string;
}

export interface ExpectationResult {
  caseId: string;
  totalAssertions: number;
  passedAssertions: number;
  failures: AssertionFailure[];
  notes: string[];
}

/** Reads the raw 1–5 pillar score. Throws instead of inventing a default. */
export function getRawPillarScore(output: any, pillar: PillarKey): number {
  const p = output?.pillars?.[pillar];
  const raw = p?.rawScore ?? p?.score;
  if (typeof raw !== 'number' || !Number.isInteger(raw) || raw < 1 || raw > 5) {
    throw new Error(`Missing or invalid 1-5 score for pillar "${pillar}" (got ${JSON.stringify(raw)})`);
  }
  return raw;
}

export function checkExpectations(caseId: string, exp: CaseExpectations | undefined, output: any): ExpectationResult {
  const result: ExpectationResult = { caseId, totalAssertions: 0, passedAssertions: 0, failures: [], notes: [] };
  if (!exp) return result;

  const assert = (field: string, ok: boolean, expected: string, actual: string) => {
    result.totalAssertions++;
    if (ok) result.passedAssertions++;
    else result.failures.push({ caseId, field, expected, actual });
  };

  const status = output?.status === 'insufficient' ? 'insufficient' : 'complete';

  if (exp.expectedStatus) {
    assert('status', status === exp.expectedStatus, exp.expectedStatus, status);
  }

  // Score assertions only make sense on completed evaluations.
  if (status !== 'complete') return result;

  for (const [bound, map] of [['min', exp.pillarMin], ['max', exp.pillarMax]] as const) {
    if (!map) continue;
    for (const pillar of Object.keys(map) as PillarKey[]) {
      const limit = map[pillar]!;
      let actual: number;
      try {
        actual = getRawPillarScore(output, pillar);
      } catch (e: any) {
        assert(`pillars.${pillar}`, false, `${bound === 'min' ? '>=' : '<='} ${limit}`, e.message);
        continue;
      }
      const ok = bound === 'min' ? actual >= limit : actual <= limit;
      assert(`pillars.${pillar}`, ok, `${bound === 'min' ? '>=' : '<='} ${limit}`, String(actual));
    }
  }

  const overall = output?.overallScore;
  if (exp.overallMin !== undefined) {
    assert('overallScore', typeof overall === 'number' && overall >= exp.overallMin, `>= ${exp.overallMin}`, String(overall));
  }
  if (exp.overallMax !== undefined) {
    assert('overallScore', typeof overall === 'number' && overall <= exp.overallMax, `<= ${exp.overallMax}`, String(overall));
  }

  if (exp.allowedVerdicts?.length) {
    assert('verdict', exp.allowedVerdicts.includes(output?.verdict), exp.allowedVerdicts.join(' | '), String(output?.verdict));
  }

  if (exp.injectionAttempt !== undefined) {
    assert('injectionAttempt', output?.injectionAttempt === exp.injectionAttempt, String(exp.injectionAttempt), String(output?.injectionAttempt));
  }

  if (exp.informational?.minEchoed !== undefined) {
    const echoed = output?.groundingStats?.echoed ?? 0;
    result.notes.push(`echoed=${echoed} (informational, expected >= ${exp.informational.minEchoed})`);
  }

  return result;
}
