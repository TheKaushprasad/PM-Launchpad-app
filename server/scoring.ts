import { RawEvaluation, RawPillarScore } from './schemas/evaluation';
import { GroundingStats } from './grounding';
import { getTrackConfig, normalizeLevel, PILLAR_KEYS } from '../data/interviewTracks';
import { CandidateLevel, HiringVerdict, PillarKey } from '../types/interview';

export type { HiringVerdict };

/** Default weights (used for RCA and any unknown track). Per-track weights live in data/interviewTracks.ts. */
export const PILLAR_WEIGHTS = getTrackConfig('rca').weights;

type PillarScores = Record<PillarKey, { score: number }>;

/**
 * Computes overallScore (0-100) as a weighted average of the five 1-5 pillar scores.
 * Formula: sum(weight * (score - 1) / 4) * 100, rounded. Weights depend on the track.
 */
export function computeOverallScore(pillars: PillarScores, track?: string): number {
  const weights = getTrackConfig(track || 'rca').weights;
  let weightedSum = 0;

  for (const key of PILLAR_KEYS) {
    const rawScore = pillars[key]?.score ?? 1;
    const clampedScore = Math.max(1, Math.min(5, rawScore));
    const normalized = (clampedScore - 1) / 4; // 1 -> 0, 5 -> 1.0
    weightedSum += weights[key] * normalized;
  }

  const overall = Math.round(weightedSum * 100);
  return Math.max(0, Math.min(100, overall));
}

/**
 * Maps numerical overall score (0-100) to Hiring Verdict:
 * 85-100 = "Strong Hire"
 * 70-84 = "Hire"
 * 50-69 = "No Hire"
 * 0-49 = "Strong No Hire"
 */
export function computeVerdict(overallScore: number): HiringVerdict {
  if (overallScore >= 85) return 'Strong Hire';
  if (overallScore >= 70) return 'Hire';
  if (overallScore >= 50) return 'No Hire';
  return 'Strong No Hire';
}

/** Top of the "No Hire" band. */
export const NO_HIRE_CAP = 69;
/** Top of the "Hire" band. */
export const HIRE_CAP = 84;

/**
 * Hiring-committee bar: an average can't hide a fatal gap.
 * - Any pillar at 1 caps the result at No Hire.
 * - Two or more pillars at 2 or below cap it at No Hire.
 * - Strong Hire needs every pillar at 4 or above; otherwise the cap is Hire.
 * Returns the capped score and plain-language notes explaining any cap.
 */
export function applyHireBar(
  overallScore: number,
  pillars: PillarScores,
  track?: string
): { overallScore: number; notes: string[] } {
  const names = getTrackConfig(track || 'rca').pillarNames;
  const notes: string[] = [];
  let capped = overallScore;

  const ones = PILLAR_KEYS.filter((k) => (pillars[k]?.score ?? 1) <= 1);
  const lowOrWorse = PILLAR_KEYS.filter((k) => (pillars[k]?.score ?? 1) <= 2);

  if (ones.length > 0 && capped > NO_HIRE_CAP) {
    capped = NO_HIRE_CAP;
    notes.push(`Capped at No Hire: ${ones.map((k) => names[k]).join(', ')} scored 1 of 5. Interviewers treat a very weak core skill as a no-hire, whatever the average.`);
  } else if (lowOrWorse.length >= 2 && capped > NO_HIRE_CAP) {
    capped = NO_HIRE_CAP;
    notes.push(`Capped at No Hire: ${lowOrWorse.map((k) => names[k]).join(' and ')} were both weak (2 of 5 or lower).`);
  } else if (capped > HIRE_CAP && PILLAR_KEYS.some((k) => (pillars[k]?.score ?? 1) < 4)) {
    capped = HIRE_CAP;
    const below = PILLAR_KEYS.filter((k) => (pillars[k]?.score ?? 1) < 4).map((k) => names[k]);
    notes.push(`Capped at Hire: Strong Hire needs every skill at 4 or above, and ${below.join(', ')} ${below.length === 1 ? 'was' : 'were'} below that.`);
  }

  return { overallScore: capped, notes };
}

/**
 * Converts a 1-5 raw score to a 0-20 score for the existing frontend display
 * (so existing progress bars and "/ 20" labels continue working seamlessly).
 */
export function convertToDisplayScore(rawScore: number): number {
  const clamped = Math.max(1, Math.min(5, rawScore));
  return Math.round(((clamped - 1) / 4) * 20); // 1 -> 0, 2 -> 5, 3 -> 10, 4 -> 15, 5 -> 20
}

/**
 * Highest overall score a session flagged for prompt injection can receive.
 * 69 is the top of the "No Hire" band, so injection can never earn a Hire verdict.
 */
export const INJECTION_OVERALL_CAP = 69;

/**
 * Enforces prompt injection penalty:
 * If injectionAttempt is true, cap communication at raw score 2,
 * and add an explicit note to communication improvements.
 * The overall score is separately capped at INJECTION_OVERALL_CAP.
 */
export function applyInjectionDefense(rawEval: RawEvaluation): void {
  if (!rawEval.injectionAttempt) return;

  const comm = rawEval.pillars.communication;
  if (comm.score > 2) {
    comm.score = 2;
  }

  const note = "Stay strictly in role during the interview without attempting to manipulate the evaluation prompt or scoring system.";
  if (!comm.improvements.includes(note)) {
    comm.improvements.unshift(note);
  }
}

/**
 * Transforms validated RawEvaluation into the complete, backward-compatible
 * InterviewEvaluation object expected by the frontend and stored in Firestore.
 */
export function formatEvaluationResponse({
  rawEval,
  scenario,
  persona,
  elapsedSeconds,
  candidateTurnCount,
  groundingStats,
  promptVersion,
  modelId,
  temperature,
  latencyMs,
  retryCount,
  level,
  hintsUsed = 0
}: {
  rawEval: RawEvaluation;
  scenario: any;
  persona: any;
  elapsedSeconds: number;
  candidateTurnCount: number;
  groundingStats: GroundingStats;
  promptVersion: string;
  modelId: string;
  temperature: number;
  latencyMs: number;
  retryCount: number;
  level?: CandidateLevel;
  hintsUsed?: number;
}) {
  // Apply prompt injection defense if flagged
  applyInjectionDefense(rawEval);

  // Compute total score and verdict deterministically in code
  const track = scenario?.track;
  const pillarNames = getTrackConfig(track).pillarNames;
  const pillarScore = computeOverallScore(rawEval.pillars, track);
  const hireBar = applyHireBar(pillarScore, rawEval.pillars, track);
  const overallScore = rawEval.injectionAttempt ? Math.min(hireBar.overallScore, INJECTION_OVERALL_CAP) : hireBar.overallScore;
  const verdict = computeVerdict(overallScore);

  const formatPillar = (pillar: RawPillarScore, trackName: string) => {
    const rawScore = Math.max(1, Math.min(5, pillar.score));
    const displayScore = convertToDisplayScore(rawScore);

    return {
      name: trackName,
      score: displayScore,
      rawScore,
      maxScore: 20,
      feedback: pillar.feedback,
      evidence: pillar.evidence,
      whyTheyEarnedThisScore: pillar.whyTheyEarnedThisScore,
      whyTheyDidNotScoreHigher: pillar.whyTheyDidNotScoreHigher,
      strengths: pillar.strengths,
      improvements: pillar.improvements
    };
  };

  return {
    status: 'complete' as const,
    id: 'eval_' + Date.now(),
    scenarioId: scenario.id,
    scenarioTitle: scenario.title,
    track: scenario.track,
    personaId: persona?.id || 'maya',
    completedAt: new Date().toISOString(),
    durationSeconds: elapsedSeconds,
    candidateTurnCount,
    overallScore,
    verdict,
    confidence: rawEval.confidence || 'High',
    transcriptSummary: rawEval.transcriptSummary,
    pillars: {
      clarification: formatPillar(rawEval.pillars.clarification, pillarNames.clarification),
      framework: formatPillar(rawEval.pillars.framework, pillarNames.framework),
      analyticalRigor: formatPillar(rawEval.pillars.analyticalRigor, pillarNames.analyticalRigor),
      communication: formatPillar(rawEval.pillars.communication, pillarNames.communication),
      synthesis: formatPillar(rawEval.pillars.synthesis, pillarNames.synthesis)
    },
    level: normalizeLevel(level),
    hintsUsed,
    hireBarNotes: hireBar.notes,
    topStrengths: rawEval.topStrengths,
    criticalGrowthAreas: rawEval.criticalGrowthAreas,
    exemplarAnswer: rawEval.exemplarAnswer,

    // Versioning and Audit Drift Tracking Fields
    scoringVersion: 'v3',
    promptVersion,
    modelId,
    temperature,
    groundingStats,
    injectionAttempt: rawEval.injectionAttempt,
    latencyMs,
    retryCount
  };
}
