import { getFirestore } from 'firebase-admin/firestore';
import { getFirebaseAdmin } from '../services/firebaseAdmin';
import { InterviewEvaluation } from '../types/interview';

export interface PersistSessionOptions {
  userId: string;
  sessionId?: string;
  evaluation: InterviewEvaluation;
  scenario: any;
  elapsedSeconds: number;
}

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
  const { userId, evaluation, scenario, elapsedSeconds, sessionId } = options;

  if (!userId || typeof userId !== 'string' || !userId.trim()) {
    throw new Error('Persistence requires a verified user ID from Firebase Auth token.');
  }

  const app = getFirebaseAdmin();
  const db = getFirestore(app);

  const docId = (sessionId || evaluation.id || `eval_${Date.now()}`).replace(/[^a-zA-Z0-9_\-]/g, '_');
  const docRef = db.collection('users').doc(userId).collection('interview_sessions').doc(docId);

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

    // Versioning & Audit Drift-Tracking Fields
    scoringVersion: 'v2',
    promptVersion: evaluation.promptVersion || 'eval-v2.2',
    modelId: evaluation.modelId || 'unknown',
    temperature: typeof evaluation.temperature === 'number' ? evaluation.temperature : 0.1,
    groundingStats: evaluation.groundingStats || { total: 0, valid: 0, dropped: 0, echoed: 0, reindexed: 0 },
    injectionAttempt: Boolean(evaluation.injectionAttempt),
    latencyMs: evaluation.latencyMs || 0,
    retryCount: evaluation.retryCount || 0,
    candidateTurnCount: evaluation.candidateTurnCount || 0
  };

  await docRef.set(sessionDocument, { merge: true });
  const docPath = `users/${userId}/interview_sessions/${docId}`;
  console.log(`[Persistence] Successfully saved evaluation to Firestore via Admin SDK: ${docPath}`);

  return { saved: true, docPath };
}
