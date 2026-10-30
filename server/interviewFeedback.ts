import { getAppFirestore } from '../services/firebaseAdmin';
import {
  FEEDBACK_DISLIKED_OPTIONS,
  FEEDBACK_LIKED_OPTIONS,
  FEEDBACK_OTHER_MAX_CHARS,
  InterviewFeedbackInput
} from '../data/interviewFeedback';

/**
 * Candidate feedback about an interview (stars, what they liked, what didn't go well),
 * given on the card shown while the scorecard is being prepared.
 *
 *   interview_feedback/{uid}_{sessionId}   { uid, email, sessionId, scenario..., rating, liked, disliked, ... }
 *
 * Written only by the server (Admin SDK). The Firestore rules have no match for this
 * collection, so browsers can neither read nor write it. Read on the local eval dashboard.
 */

const COLLECTION = 'interview_feedback';

const pickIds = (raw: unknown, allowed: string[]) =>
  Array.isArray(raw) ? [...new Set(raw.filter((v): v is string => typeof v === 'string' && allowed.includes(v)))] : [];

const cleanText = (raw: unknown) => (typeof raw === 'string' ? raw.trim().slice(0, FEEDBACK_OTHER_MAX_CHARS) : '');

/** Keeps only known option ids and a 1-5 rating. Returns null when nothing was given. */
export function cleanFeedback(body: any): InterviewFeedbackInput | null {
  const rating = Number.isInteger(body?.rating) && body.rating >= 1 && body.rating <= 5 ? body.rating : null;
  const feedback: InterviewFeedbackInput = {
    rating,
    liked: pickIds(body?.liked, FEEDBACK_LIKED_OPTIONS.map((o) => o.id)),
    likedOther: cleanText(body?.likedOther),
    disliked: pickIds(body?.disliked, FEEDBACK_DISLIKED_OPTIONS.map((o) => o.id)),
    dislikedOther: cleanText(body?.dislikedOther)
  };
  const empty = !feedback.rating && !feedback.liked.length && !feedback.disliked.length && !feedback.likedOther && !feedback.dislikedOther;
  return empty ? null : feedback;
}

export async function saveInterviewFeedback(input: {
  uid: string;
  email: string;
  sessionId: string;
  scenario: { id: string; title: string; company: string; track: string };
  level: string;
  mode: string;
  feedback: InterviewFeedbackInput;
}) {
  const sessionId = input.sessionId.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 100);
  const docId = `${input.uid}_${sessionId}`;
  await getAppFirestore().collection(COLLECTION).doc(docId).set({
    uid: input.uid,
    email: input.email || '',
    sessionId,
    scenarioId: input.scenario.id,
    scenarioTitle: input.scenario.title,
    company: input.scenario.company,
    track: input.scenario.track,
    level: input.level,
    mode: input.mode,
    ...input.feedback,
    createdAt: new Date().toISOString()
  });
  return docId;
}

export async function listInterviewFeedback(limit = 200) {
  const snap = await getAppFirestore().collection(COLLECTION).orderBy('createdAt', 'desc').limit(limit).get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
