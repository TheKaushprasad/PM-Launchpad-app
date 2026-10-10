import type { Request, Response, NextFunction } from 'express';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
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

/**
 * Counts one use of `bucket` today and reports whether it is still within `limit`.
 * Fails open (allows the request) if Firestore is unavailable, so a database hiccup never takes the tools down.
 */
export async function consumeDailyQuota(bucket: string, limit: number): Promise<boolean> {
  if (!isFirebaseAdminConfigured()) return true;
  const day = new Date().toISOString().slice(0, 10);
  const ref = db().collection(RATE_LIMIT_COLLECTION).doc(`${safeKey(bucket)}_${day}`);
  try {
    return await db().runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const count = (snap.exists ? Number(snap.data()?.count) : 0) || 0;
      if (count >= limit) return false;
      tx.set(ref, { count: count + 1, day, updatedAt: new Date().toISOString() }, { merge: true });
      return true;
    });
  } catch (err: any) {
    console.warn('[RateLimit] Could not check quota, allowing request:', err?.message);
    return true;
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
      emailVerified: Boolean(decoded.email_verified),
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

  const userOk = await consumeDailyQuota(`ai_user_${user.uid}`, envLimit('AI_DAILY_LIMIT_PER_USER', 200));
  const ipOk = userOk && (await consumeDailyQuota(`ai_ip_${clientIp(req)}`, envLimit('AI_DAILY_LIMIT_PER_IP', 500)));
  if (!userOk || !ipOk) {
    return res.status(429).json({ success: false, error: "You've reached today's limit for AI tools. Please try again tomorrow." });
  }

  res.locals.user = user;
  next();
}
