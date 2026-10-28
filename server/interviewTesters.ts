import type { Express, Request, Response, NextFunction } from 'express';
import { FieldValue } from 'firebase-admin/firestore';
import { getAppFirestore, isFirebaseAdminConfigured } from '../services/firebaseAdmin';
import { getVerifiedUser } from './security';

/**
 * Invite-only testers for the AI interview, and the full conversations they agree to share.
 *
 * While the interview is hidden on the live site, people on the tester list can still use it.
 * When a tester has agreed (consent box on the interview page), each interview's full
 * conversation is saved so the owner can review it in the local eval dashboard and turn it
 * into eval cases. The list is edited from the eval dashboard (/admin/evals, local only).
 *
 * Firestore (server-only through the Admin SDK; the default-deny rule keeps clients out):
 *   admin_config/interview_testers   { emails: string[], updatedAt }
 *   eval_interviews/{id}             { uid, email, scenario, messages, evaluation, consentAt, ... }
 */

const TESTERS_DOC = ['admin_config', 'interview_testers'] as const;
export const EVAL_INTERVIEWS = 'eval_interviews';
const CACHE_MS = 60_000;

let cache: { emails: Set<string>; at: number } | null = null;

const cleanEmail = (e: unknown) => (typeof e === 'string' ? e.trim().toLowerCase() : '');
const isEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 200;

export async function getTesterEmails(fresh = false): Promise<Set<string>> {
  if (!isFirebaseAdminConfigured()) return new Set();
  if (!fresh && cache && Date.now() - cache.at < CACHE_MS) return cache.emails;
  try {
    const snap = await getAppFirestore().collection(TESTERS_DOC[0]).doc(TESTERS_DOC[1]).get();
    const list: unknown[] = snap.exists && Array.isArray(snap.data()?.emails) ? snap.data()!.emails : [];
    cache = { emails: new Set(list.map(cleanEmail).filter(isEmail)), at: Date.now() };
  } catch (err: any) {
    console.warn('[Testers] Could not read the tester list:', err?.message);
    if (!cache) return new Set();
  }
  return cache!.emails;
}

export async function setTesterEmails(emails: string[]): Promise<string[]> {
  const clean = [...new Set(emails.map(cleanEmail).filter(isEmail))].sort().slice(0, 500);
  await getAppFirestore()
    .collection(TESTERS_DOC[0])
    .doc(TESTERS_DOC[1])
    .set({ emails: clean, updatedAt: new Date().toISOString() });
  cache = { emails: new Set(clean), at: Date.now() };
  return clean;
}

export async function isInterviewTester(email: string | undefined): Promise<boolean> {
  const e = cleanEmail(email);
  return !!e && (await getTesterEmails()).has(e);
}

/**
 * Lets /api/interview/* through when the interview is on for everyone, or the signed-in caller
 * is on the tester list (verified email only). Everyone else gets the "coming soon" answer.
 */
export function interviewAccessGate(enabledForEveryone: boolean) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (enabledForEveryone) return next();
    const user = await getVerifiedUser(req);
    if (user?.emailVerified && (await isInterviewTester(user.email))) return next();
    res.status(503).json({ error: 'The AI interview is coming soon.' });
  };
}

/** Called before scoring so the conversation is kept even if scoring fails. Returns the doc id, or null when not saved. */
export async function saveTesterInterview(input: {
  uid: string;
  email: string;
  scenario: { id: string; title?: string; track?: string; company?: string };
  personaId?: string;
  level: string;
  mode: string;
  messages: Array<{ role: string; text: string }>;
  elapsedSeconds: number;
  scratchpadNotes: string;
  sessionId?: string;
}): Promise<string | null> {
  if (!isFirebaseAdminConfigured() || !(await isInterviewTester(input.email))) return null;
  try {
    const ref = getAppFirestore().collection(EVAL_INTERVIEWS).doc();
    const now = new Date().toISOString();
    await ref.set({
      id: ref.id,
      uid: input.uid,
      email: cleanEmail(input.email),
      sessionId: typeof input.sessionId === 'string' ? input.sessionId.slice(0, 100) : null,
      scenarioId: input.scenario.id,
      scenarioTitle: (input.scenario.title || '').slice(0, 200),
      company: (input.scenario.company || '').slice(0, 100),
      track: input.scenario.track || 'general',
      personaId: input.personaId || 'priya',
      level: input.level,
      mode: input.mode,
      messages: input.messages.map(({ role, text }) => ({ role, text })),
      elapsedSeconds: input.elapsedSeconds,
      scratchpadNotes: input.scratchpadNotes,
      evaluation: null,
      review: null,
      consentAt: now,
      createdAt: now,
    });
    return ref.id;
  } catch (err: any) {
    console.warn('[Testers] Could not save the interview:', err?.message);
    return null;
  }
}

/** Adds Priya's scorecard to a saved tester interview once scoring finishes. */
export async function attachTesterEvaluation(id: string, evaluation: any): Promise<void> {
  try {
    await getAppFirestore()
      .collection(EVAL_INTERVIEWS)
      .doc(id)
      .update({
        evaluation: {
          status: evaluation?.status || 'complete',
          overallScore: typeof evaluation?.overallScore === 'number' ? evaluation.overallScore : null,
          verdict: evaluation?.verdict || null,
          pillars: evaluation?.pillars || null,
          promptVersion: evaluation?.promptVersion || null,
          modelId: evaluation?.modelId || null,
          transcriptSummary: (evaluation?.transcriptSummary || '').slice(0, 5000),
        },
        evaluatedAt: FieldValue.serverTimestamp(),
      });
  } catch (err: any) {
    console.warn('[Testers] Could not attach the scorecard:', err?.message);
  }
}

export function registerInterviewAccessRoutes(app: Express, enabledForEveryone: boolean) {
  // Tells the browser whether to show the interview studio and the tester consent box.
  app.get(['/api/interview-access', '/api/interview-access/'], async (req, res) => {
    const user = await getVerifiedUser(req);
    const tester = !!user?.emailVerified && (await isInterviewTester(user.email));
    res.json({ enabled: enabledForEveryone || tester, tester });
  });
}
