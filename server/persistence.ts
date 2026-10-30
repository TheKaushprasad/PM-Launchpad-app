import { getAppFirestore } from '../services/firebaseAdmin';
import { InterviewEvaluation } from '../types/interview';

export interface PersistSessionOptions {
  userId: string;
  sessionId?: string;
  evaluation: InterviewEvaluation;
  scenario: any;
  elapsedSeconds: number;
  /** The full conversation, shown again from Past Scorecards */
  messages?: Array<{ role: string; text: string }>;
}

export type UnscoredReason = 'exited' | 'too_short' | 'scoring_failed';

const MAX_SAVED_MESSAGES = 400;
const MAX_SAVED_MESSAGE_CHARS = 4000;

/** The conversation as saved on the session document (well under Firestore's 1 MB document limit). */
export function cleanTranscript(messages?: Array<{ role: string; text: string }>) {
  return (messages || [])
    .slice(-MAX_SAVED_MESSAGES)
    .filter((m) => m && typeof m.text === 'string' && m.text.trim())
    .map((m) => ({ role: String(m.role || 'interviewer'), text: m.text.trim().slice(0, MAX_SAVED_MESSAGE_CHARS) }));
}

const sessionRef = (userId: string, sessionId: string) => {
  const docId = sessionId.replace(/[^a-zA-Z0-9_\-]/g, '_');
  return { docId, docRef: getAppFirestore().collection('users').doc(userId).collection('interview_sessions').doc(docId) };
};

/**
 * Saves interview evaluation scorecard and all audit/drift-tracking fields
 * directly into Firestore via the Firebase Admin SDK.
 * Bypasses client-side permission restrictions while enforcing that clients
 * can only read evaluation and audit results.
 * Throws on failure so retry logic can catch and re-attempt.
 */
export async function saveInterviewEvaluationServerSide(
  options: PersistSessionOptions
): Promise<{ saved: boolean; docPath: string }> {
  const { userId, evaluation, scenario, elapsedSeconds, sessionId, messages } = options;

  if (!userId || typeof userId !== 'string' || !userId.trim()) {
    throw new Error('Persistence requires a verified user ID from Firebase Auth token.');
  }

  const { docId, docRef } = sessionRef(userId, sessionId || evaluation.id || `eval_${Date.now()}`);

  // Verify that sessionId, if provided, belongs to that user before writing
  if (sessionId) {
    const existing = await docRef.get();
    if (existing.exists) {
      const existingData = existing.data();
      if (existingData?.userId && existingData.userId !== userId) {
        throw new Error(`Unauthorized: Session ${sessionId} does not belong to user ${userId}`);
      }
    }
  }

  const durationMinutes = Math.ceil((elapsedSeconds || evaluation.durationSeconds || 0) / 60);
  const now = new Date().toISOString();

  const sessionDocument = {
    id: docId,
    sessionId: docId,
    userId,
    scenarioId: scenario?.id || evaluation.scenarioId || 'unknown_scenario',
    scenarioTitle: (scenario?.title || evaluation.scenarioTitle || '').slice(0, 200),
    company: (scenario?.company || 'Tech Company').slice(0, 100),
    track: scenario?.track || evaluation.track || 'general',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    score: evaluation.overallScore,
    overallScore: evaluation.overallScore,
    verdict: evaluation.verdict,
    durationMinutes,
    durationSeconds: elapsedSeconds || evaluation.durationSeconds || 0,
    evaluationSummary: (evaluation.transcriptSummary || '').slice(0, 5000),
    transcriptSummary: (evaluation.transcriptSummary || '').slice(0, 5000),
    confidence: evaluation.confidence || 'High',
    pillars: evaluation.pillars,
    topStrengths: evaluation.topStrengths || [],
    criticalGrowthAreas: evaluation.criticalGrowthAreas || [],
    exemplarAnswer: evaluation.exemplarAnswer || null,
    createdAt: now,
    status: 'complete',
    unscoredReason: null,
    ...(messages ? { transcript: cleanTranscript(messages) } : {}),

    // Versioning & Audit Drift-Tracking Fields
    scoringVersion: evaluation.scoringVersion || 'v3',
    promptVersion: evaluation.promptVersion || 'unknown',
    modelId: evaluation.modelId || 'unknown',
    temperature: typeof evaluation.temperature === 'number' ? evaluation.temperature : 0.1,
    groundingStats: evaluation.groundingStats || { total: 0, valid: 0, dropped: 0, echoed: 0, reindexed: 0 },
    injectionAttempt: Boolean(evaluation.injectionAttempt),
    latencyMs: evaluation.latencyMs || 0,
    retryCount: evaluation.retryCount || 0,
    candidateTurnCount: evaluation.candidateTurnCount || 0,
    level: evaluation.level || 'pm',
    mode: evaluation.mode || 'voice',
    hintsUsed: evaluation.hintsUsed || 0,
    hireBarNotes: evaluation.hireBarNotes || []
  };

  await docRef.set(sessionDocument, { merge: true });
  const docPath = `users/${userId}/interview_sessions/${docId}`;
  console.log(`[Persistence] Successfully saved evaluation to Firestore via Admin SDK: ${docPath}`);

  return { saved: true, docPath };
}

/**
 * Saves an interview that has no score (the candidate left, it was too short, or scoring failed)
 * so it still shows in Past Scorecards as "Not scored" with its conversation.
 * A later successful score for the same session overwrites it.
 */
export async function saveUnscoredInterviewServerSide(options: {
  userId: string;
  sessionId: string;
  scenario: any;
  messages: Array<{ role: string; text: string }>;
  elapsedSeconds: number;
  level: string;
  mode: string;
  reason: UnscoredReason;
}): Promise<{ saved: boolean; docPath: string }> {
  const { userId, sessionId, scenario, messages, elapsedSeconds, level, mode, reason } = options;
  if (!userId) throw new Error('Persistence requires a verified user ID from Firebase Auth token.');
  const { docId, docRef } = sessionRef(userId, sessionId);

  const existing = await docRef.get();
  if (existing.exists) {
    const data = existing.data();
    if (data?.userId && data.userId !== userId) {
      throw new Error(`Unauthorized: Session ${sessionId} does not belong to user ${userId}`);
    }
    // Never replace a real scorecard with an unscored copy
    if (data?.status === 'complete') return { saved: false, docPath: docRef.path };
  }

  await docRef.set({
    id: docId,
    sessionId: docId,
    userId,
    scenarioId: scenario?.id || 'unknown_scenario',
    scenarioTitle: (scenario?.title || '').slice(0, 200),
    company: (scenario?.company || 'Tech Company').slice(0, 100),
    track: scenario?.track || 'general',
    durationMinutes: Math.ceil((elapsedSeconds || 0) / 60),
    durationSeconds: elapsedSeconds || 0,
    candidateTurnCount: messages.filter((m) => m.role === 'candidate').length,
    level,
    mode,
    status: 'unscored',
    unscoredReason: reason,
    transcript: cleanTranscript(messages),
    createdAt: existing.exists && existing.data()?.createdAt ? existing.data()!.createdAt : new Date().toISOString()
  }, { merge: true });

  return { saved: true, docPath: docRef.path };
}
