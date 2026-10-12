import type { Request, Response, NextFunction } from 'express';
import { getFirestore, Firestore, FieldValue } from 'firebase-admin/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { getAdminAuth, getFirebaseAdmin, isFirebaseAdminConfigured } from '../services/firebaseAdmin';

// Firestore layout (server-only through the Admin SDK; the default-deny rule keeps clients out):
//   rate_limits/{bucket}_{yyyy-mm-dd}   { count, day, updatedAt }
const RATE_LIMIT_COLLECTION = 'rate_limits';

export interface VerifiedUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}

function db(): Firestore {
  const databaseId = process.env.FIREBASE_FIRESTORE_DATABASE_ID || firebaseConfig.firestoreDatabaseId || '(default)';
  return getFirestore(getFirebaseAdmin(), databaseId);
}

function envLimit(name: string, fallback: number): number {
  const n = Number(process.env[name]);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

// Vercel puts the real client IP first in x-forwarded-for.
export function clientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded || '').split(',')[0].trim();
  return first || (req.headers['x-real-ip'] as string) || req.socket?.remoteAddress || 'unknown';
}

function safeKey(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9_@.\-]/g, '_').slice(0, 200);
}

// A slow quota check must never hold up the tool itself (it delayed the interviewer's voice by 20+ seconds).
const QUOTA_CHECK_TIMEOUT_MS = 2500;

/**
 * Counts one use of `bucket` today and reports whether it is still within `limit`.
 * Uses a read plus an atomic increment rather than a transaction: parallel requests (the interviewer's
 * voice is fetched in pieces) made transactions on the same counter retry with backoff for many seconds.
 * The count can overshoot by a request or two under heavy parallel use, which is fine for a daily cap.
 * Fails open (allows the request) if Firestore is unavailable or slow, so a database hiccup never takes the tools down.
 */
export async function consumeDailyQuota(bucket: string, limit: number): Promise<boolean> {
  if (!isFirebaseAdminConfigured()) return true;
  const day = new Date().toISOString().slice(0, 10);
  const ref = db().collection(RATE_LIMIT_COLLECTION).doc(`${safeKey(bucket)}_${day}`);
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const check = (async () => {
      const snap = await ref.get();
      const count = (snap.exists ? Number(snap.data()?.count) : 0) || 0;
      if (count >= limit) return false;
      await ref.set({ count: FieldValue.increment(1), day, updatedAt: new Date().toISOString() }, { merge: true });
      return true;
    })();
    const timeout = new Promise<boolean>((resolve) => {
      timer = setTimeout(() => {
        console.warn('[RateLimit] Quota check is slow, allowing request:', bucket);
        resolve(true);
      }, QUOTA_CHECK_TIMEOUT_MS);
    });
    check.catch(() => {});
    return await Promise.race([check, timeout]);
  } catch (err: any) {
    console.warn('[RateLimit] Could not check quota, allowing request:', err?.message);
    return true;
  } finally {
    clearTimeout(timer);
  }
}

/** Reads the Firebase ID token from "Authorization: Bearer <token>". Returns null if missing or invalid. */
export async function getVerifiedUser(req: Request): Promise<VerifiedUser | null> {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) return null;
  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    return {
      uid: decoded.uid,
      email: (decoded.email || '').toLowerCase(),
      // Google has already verified the address of anyone who signs in with Google (the app treats them the same way).
      emailVerified: Boolean(decoded.email_verified) || Boolean((decoded.firebase as any)?.identities?.['google.com']),
    };
  } catch (err: any) {
    console.warn('[Auth] Token verification failed:', err?.message);
    return null;
  }
}

/**
 * Guards every endpoint that spends AI credits: the caller must be signed in with a verified email,
 * and stays under a per-user and per-IP daily cap (AI_DAILY_LIMIT_PER_USER / AI_DAILY_LIMIT_PER_IP).
 */
export async function requireAiAccess(req: Request, res: Response, next: NextFunction) {
  const user = await getVerifiedUser(req);
  if (!user) {
    return res.status(401).json({ success: false, error: 'Please sign in to use this tool.', requiresAuth: true });
  }
  if (!user.emailVerified) {
    return res.status(403).json({ success: false, error: 'Please verify your email address to use this tool.', requiresAuth: true });
  }

  // Both counters are checked at once so the second doesn't wait on the first.
  const [userOk, ipOk] = await Promise.all([
    consumeDailyQuota(`ai_user_${user.uid}`, envLimit('AI_DAILY_LIMIT_PER_USER', 200)),
    consumeDailyQuota(`ai_ip_${clientIp(req)}`, envLimit('AI_DAILY_LIMIT_PER_IP', 500)),
  ]);
  if (!userOk || !ipOk) {
    return res.status(429).json({ success: false, error: "You've reached today's limit for AI tools. Please try again tomorrow." });
  }

  res.locals.user = user;
  next();
}
