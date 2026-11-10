import { getAppFirestore, isFirebaseAdminConfigured } from '../services/firebaseAdmin';
import { dodoMode } from './payments/dodo';
import { paymentsEnabled } from './payments/credits';

/**
 * Free plan: each account gets a few AI mock interviews per calendar month (India time), 2 by default
 * (INTERVIEW_FREE_PER_MONTH). An interview is counted when the candidate sends their first answer, that is
 * the first /api/interview/chat call carrying a new interview id (X-Interview-Session, made by the browser
 * for every interview and every round of a full loop). Later answers in the same interview ride on it.
 *
 * Not limited: invited testers (they skip the gate before this runs) and, while payments are on, anyone
 * who has bought an interview sprint.
 *
 * Firestore, server-only (Admin SDK, no rules change):
 *   user_entitlements/{uid}.freeInterviews.<YYYY-MM> = { used: number, sessions: { <interview id>: ISO time } }
 */

const ENTITLEMENTS = 'user_entitlements';
const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;
// An interview id stays usable this long after it was counted (long interviews, retries, a month change mid-interview).
const SESSION_WINDOW_MS = 6 * 60 * 60 * 1000;
const CACHE_LIMIT = 5000;

export function freeInterviewsPerMonth(): number {
  const raw = process.env.INTERVIEW_FREE_PER_MONTH;
  const n = Number(raw);
  return raw !== undefined && raw.trim() !== '' && Number.isFinite(n) && n >= 0 ? Math.floor(n) : 2;
}

/** YYYY-MM in India time, `offset` months from now. */
function monthKey(offset = 0, now = Date.now()): string {
  const d = new Date(now + IST_OFFSET_MS);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + offset, 1)).toISOString().slice(0, 7);
}

/** The day the free interviews come back, e.g. "1 Dec". */
export function freeInterviewsResetLabel(now = Date.now()): string {
  return new Date(`${monthKey(1, now)}-01T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' });
}

export function exhaustedMessage(): string {
  const limit = freeInterviewsPerMonth();
  return `You have used your ${limit} free mock interview${limit === 1 ? '' : 's'} for this month. Your free interviews come back on ${freeInterviewsResetLabel()}.`;
}

const isPaid = (data: FirebaseFirestore.DocumentData | undefined) =>
  paymentsEnabled() && (Number(data?.interviewSprints?.[dodoMode()]) || 0) > 0;

export interface InterviewAllowance {
  /** No monthly limit for this account (paid, tester, or the limit can't be checked here). */
  unlimited: boolean;
  limit: number;
  used: number;
  left: number;
  resetsOn: string;
}

function allowanceFrom(data: FirebaseFirestore.DocumentData | undefined, now = Date.now()): InterviewAllowance {
  const limit = freeInterviewsPerMonth();
  const used = Number(data?.freeInterviews?.[monthKey(0, now)]?.used) || 0;
  return { unlimited: isPaid(data), limit, used, left: Math.max(0, limit - used), resetsOn: freeInterviewsResetLabel() };
}

export const unlimitedAllowance = (): InterviewAllowance => ({
  unlimited: true,
  limit: freeInterviewsPerMonth(),
  used: 0,
  left: freeInterviewsPerMonth(),
  resetsOn: freeInterviewsResetLabel(),
});

export async function getInterviewAllowance(uid: string): Promise<InterviewAllowance> {
  if (!isFirebaseAdminConfigured()) return unlimitedAllowance();
  const snap = await getAppFirestore().collection(ENTITLEMENTS).doc(uid).get();
  return allowanceFrom(snap.data());
}

// Interviews already counted on this server instance, so later answers skip the database.
const counted = new Map<string, number>();
const remember = (key: string, at: number) => {
  if (counted.size >= CACHE_LIMIT) counted.delete(counted.keys().next().value as string);
  counted.set(key, at);
};

export const cleanInterviewId = (raw: unknown) => {
  const id = typeof raw === 'string' ? raw.trim() : '';
  return /^[A-Za-z0-9_-]{6,80}$/.test(id) ? id : '';
};

export type InterviewStartResult = 'ok' | 'exhausted' | 'missing_id';

/**
 * Lets one answer through: the interview is already counted, the account is paid, or there's a free
 * interview left this month (which this call uses up). 'exhausted' when none is left.
 */
export async function useFreeInterview(uid: string, rawInterviewId: unknown, now = Date.now()): Promise<InterviewStartResult> {
  if (!isFirebaseAdminConfigured()) return 'ok';
  const interviewId = cleanInterviewId(rawInterviewId);
  if (!interviewId) return 'missing_id';
  const key = `${uid}:${interviewId}`;
  const cachedAt = counted.get(key);
  if (cachedAt && now - cachedAt < SESSION_WINDOW_MS) return 'ok';

  const ref = getAppFirestore().collection(ENTITLEMENTS).doc(uid);
  return getAppFirestore().runTransaction(async (tx) => {
    const decision = decideInterviewStart((await tx.get(ref)).data(), interviewId, now);
    if (decision.update) tx.set(ref, decision.update, { merge: true });
    if (decision.result === 'ok') remember(key, decision.startedAt);
    return decision.result;
  });
}

/** The rule on its own (no database), so it can be checked in isolation. */
export function decideInterviewStart(
  data: FirebaseFirestore.DocumentData | undefined,
  interviewId: string,
  now = Date.now()
): { result: 'ok' | 'exhausted'; startedAt: number; update?: Record<string, unknown> } {
  const thisMonth = monthKey(0, now);
  // Already counted this month or last month (an interview that runs past midnight on the 1st).
  for (const month of [thisMonth, monthKey(-1, now)]) {
    const startedAt = Date.parse(data?.freeInterviews?.[month]?.sessions?.[interviewId] || '');
    if (Number.isFinite(startedAt) && now - startedAt < SESSION_WINDOW_MS) return { result: 'ok', startedAt };
  }
  if (isPaid(data)) return { result: 'ok', startedAt: now };
  const limit = freeInterviewsPerMonth();
  const monthData = data?.freeInterviews?.[thisMonth] || {};
  const used = Number(monthData.used) || 0;
  if (used >= limit) return { result: 'exhausted', startedAt: now };
  const iso = new Date(now).toISOString();
  return {
    result: 'ok',
    startedAt: now,
    update: {
      freeInterviews: { [thisMonth]: { used: used + 1, sessions: { ...(monthData.sessions || {}), [interviewId]: iso } } },
      updatedAt: iso,
    },
  };
}
