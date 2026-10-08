import { RawEvaluation, RawPillarScore } from './schemas/evaluation';
import { GroundingStats } from './grounding';

export const PILLAR_WEIGHTS = {
  clarification: 0.15,
  framework: 0.25,
  analyticalRigor: 0.25,
  communication: 0.15,
  synthesis: 0.20,
} as const;

export type HiringVerdict = 'Strong Yes' | 'Lean Yes' | 'Lean No' | 'Strong No';

/**
 * Computes overallScore (0-100) as a weighted average:
 * clarification 15%, framework 25%, analyticalRigor 25%, communication 15%, synthesis 20%.
 * Formula: sum(weight * (score - 1) / 4) * 100, rounded.
 */
export function computeOverallScore(pillars: {
  clarification: { score: number };
  framework: { score: number };
  analyticalRigor: { score: number };
  communication: { score: number };
  synthesis: { score: number };
}): number {
  let weightedSum = 0;

  for (const [key, weight] of Object.entries(PILLAR_WEIGHTS) as [keyof typeof PILLAR_WEIGHTS, number][]) {
    const rawScore = pillars[key]?.score ?? 1;
    const clampedScore = Math.max(1, Math.min(5, rawScore));
    const normalized = (clampedScore - 1) / 4; // 1 -> 0, 5 -> 1.0
    weightedSum += weight * normalized;
  }

  const overall = Math.round(weightedSum * 100);
  return Math.max(0, Math.min(100, overall));
}

/**
 * Maps numerical overall score (0-100) to Hiring Verdict:
 * 85-100 = "Strong Yes"
 * 70-84 = "Lean Yes"
 * 50-69 = "Lean No"
 * 0-49 = "Strong No"
 */
export function computeVerdict(overallScore: number): HiringVerdict {
  if (overallScore >= 85) return 'Strong Yes';
  if (overallScore >= 70) return 'Lean Yes';
  if (overallScore >= 50) return 'Lean No';
  return 'Strong No';
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
 * Enforces prompt injection penalty:
 * If injectionAttempt is true, cap communication at raw score 2,
 * and add an explicit note to communication improvements.
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
  retryCount
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
}) {
  // Apply prompt injection defense if flagged
  applyInjectionDefense(rawEval);

  // Compute total score and verdict deterministically in code
  const overallScore = computeOverallScore(rawEval.pillars);
  const verdict = computeVerdict(overallScore);

  const formatPillar = (pillar: RawPillarScore, defaultName: string) => {
    const rawScore = Math.max(1, Math.min(5, pillar.score));
    const displayScore = convertToDisplayScore(rawScore);

    return {
      name: pillar.name || defaultName,
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
      clarification: formatPillar(rawEval.pillars.clarification, "Clarification & Scope"),
      framework: formatPillar(rawEval.pillars.framework, "Structured Thinking"),
      analyticalRigor: formatPillar(rawEval.pillars.analyticalRigor, "Analysis & Reasoning"),
      communication: formatPillar(rawEval.pillars.communication, "Communication"),
      synthesis: formatPillar(rawEval.pillars.synthesis, "Final Recommendation")
    },
    topStrengths: rawEval.topStrengths,
    criticalGrowthAreas: rawEval.criticalGrowthAreas,
    exemplarAnswer: rawEval.exemplarAnswer,

    // Versioning and Audit Drift Tracking Fields
    scoringVersion: 'v2',
    promptVersion,
    modelId,
    temperature,
    groundingStats,
    injectionAttempt: rawEval.injectionAttempt,
    latencyMs,
    retryCount
  };
}
