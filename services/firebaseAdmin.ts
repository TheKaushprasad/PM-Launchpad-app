/**
 * Server-Side Firebase Admin SDK Initialization and Link Generators
 * NEVER import this file in client-side React code.
 */

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, ActionCodeSettings, Auth } from 'firebase-admin/auth';
import firebaseConfig from '../firebase-applet-config.json';

let adminApp: App | null = null;
let isConfiguredWithServiceAccount = false;

interface ServiceAccountCredentials {
  type?: string;
  project_id?: string;
  private_key_id?: string;
  private_key?: string;
  client_email?: string;
  client_id?: string;
  auth_uri?: string;
  token_uri?: string;
  auth_provider_x509_cert_url?: string;
  client_x509_cert_url?: string;
}

/**
 * Safely parses multiple formats of the service account key (raw JSON, stringified JSON, escaped, or base64)
 */
function tryParseServiceAccount(raw: string): ServiceAccountCredentials | null {
  if (!raw || !raw.trim()) return null;
  const trimmed = raw.trim();

  // If user pasted just a 32-44 character Key ID (hex hash) instead of the full JSON
  if (/^[a-f0-9]{32,44}$/i.test(trimmed)) {
    console.warn(
      '[FirebaseAdmin] FIREBASE_SERVICE_ACCOUNT_KEY appears to be a 40-character Key ID rather than the full Service Account JSON. A complete private key JSON file is required.'
    );
    return null;
  }

  // Attempt 1: Direct JSON.parse
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === 'object' && parsed.private_key) {
      if (typeof parsed.private_key === 'string') {
        parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
      }
      return parsed;
    }
  } catch (e) {}

  // Attempt 2: Trim surrounding single/double quotes
  try {
    let unquoted = trimmed;
    if ((unquoted.startsWith('"') && unquoted.endsWith('"')) || (unquoted.startsWith("'") && unquoted.endsWith("'"))) {
      unquoted = unquoted.slice(1, -1);
    }
    const parsed = JSON.parse(unquoted);
    if (parsed && typeof parsed === 'object' && parsed.private_key) {
      if (typeof parsed.private_key === 'string') {
        parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
      }
      return parsed;
    }
  } catch (e) {}

  // Attempt 3: Unescape escaped JSON quotes and newlines
  try {
    const unescaped = trimmed.replace(/\\"/g, '"').replace(/\\\\n/g, '\\n');
    const parsed = JSON.parse(unescaped);
    if (parsed && typeof parsed === 'object' && parsed.private_key) {
      if (typeof parsed.private_key === 'string') {
        parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
      }
      return parsed;
    }
  } catch (e) {}

  // Attempt 4: Base64 decoding
  try {
    const decoded = Buffer.from(trimmed, 'base64').toString('utf8');
    const parsed = JSON.parse(decoded);
    if (parsed && typeof parsed === 'object' && parsed.private_key) {
      if (typeof parsed.private_key === 'string') {
        parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
      }
      return parsed;
    }
  } catch (e) {}

  console.warn(
    '[FirebaseAdmin] Notice: FIREBASE_SERVICE_ACCOUNT_KEY could not be parsed as a Service Account JSON. Ensure you paste the full JSON object containing "type", "project_id", "private_key", and "client_email".'
  );
  return null;
}

/**
 * Check if Firebase Admin is properly initialized with service account credentials
 */
export function isFirebaseAdminConfigured(): boolean {
  if (isConfiguredWithServiceAccount) return true;
  const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!rawKey) return false;
  const parsed = tryParseServiceAccount(rawKey);
  return !!(parsed && parsed.private_key);
}

/**
 * Lazily initialize the Firebase Admin app on the server.
 */
export function getFirebaseAdmin(): App {
  if (adminApp) {
    return adminApp;
  }

  // Reuse existing initialized app if present
  const existingApps = getApps();
  if (existingApps.length > 0 && existingApps[0]) {
    adminApp = existingApps[0];
    return adminApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId;
  const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountEnv && serviceAccountEnv.trim()) {
    const credentials = tryParseServiceAccount(serviceAccountEnv);
    if (credentials && credentials.private_key) {
      try {
        adminApp = initializeApp({
          credential: cert(credentials as any),
          projectId: credentials.project_id || projectId,
        });
        isConfiguredWithServiceAccount = true;
        console.log('[FirebaseAdmin] Initialized successfully with Service Account Private Key for project:', credentials.project_id || projectId);
        return adminApp;
      } catch (err: any) {
        console.warn('[FirebaseAdmin] Failed to initialize Firebase Admin with provided credentials:', err?.message);
      }
    }
  }

  // Safe fallback: Initialize app with project ID only without ambient container ADC
  adminApp = initializeApp({
    projectId,
  });
  return adminApp;
}

/**
 * Returns the Firebase Admin Auth service
 */
export function getAdminAuth(): Auth {
  const app = getFirebaseAdmin();
  return getAuth(app);
}

export interface GeneratedActionLink {
  rawActionLink: string;
  customActionUrl: string;
  oobCode: string;
  mode: string;
  apiKey: string;
}

/**
 * Helper to build custom branded URL while preserving raw Firebase link
 */
function buildActionLinkResult(rawLink: string, defaultMode: string): GeneratedActionLink {
  let oobCode = '';
  let mode = defaultMode;
  let apiKey = '';

  try {
    const urlObj = new URL(rawLink);
    oobCode = urlObj.searchParams.get('oobCode') || '';
    mode = urlObj.searchParams.get('mode') || defaultMode;
    apiKey = urlObj.searchParams.get('apiKey') || '';
  } catch (err) {
    console.warn('[FirebaseAdmin] Could not parse action link URL:', err);
  }

  const appBaseUrl = (process.env.APP_URL || 'https://www.thenoobpm.com').replace(/\/+$/, '');
  const customActionUrl = `${appBaseUrl}/#/auth/action?mode=${encodeURIComponent(mode)}&oobCode=${encodeURIComponent(oobCode)}&apiKey=${encodeURIComponent(apiKey)}`;

  return {
    rawActionLink: rawLink,
    customActionUrl,
    oobCode,
    mode,
    apiKey,
  };
}

/**
 * In-memory cache for action links to prevent hitting Firebase Identity Toolkit rate limits (TOO_MANY_ATTEMPTS_TRY_LATER)
 * Firebase action codes remain valid for up to 24-72 hours.
 */
interface CachedActionLink {
  result: GeneratedActionLink;
  createdAt: number;
}

const verificationLinkCache = new Map<string, CachedActionLink>();
const passwordResetLinkCache = new Map<string, CachedActionLink>();

// Reuse existing link within 15 minutes to guarantee instant response without tripping rate limits
const LINK_CACHE_TTL_MS = 15 * 60 * 1000;
// Fallback threshold if Firebase throttles the API (up to 2 hours)
const LINK_FALLBACK_MAX_AGE_MS = 2 * 60 * 60 * 1000;

/**
 * Checks if a Firebase Auth error is caused by rate limiting (TOO_MANY_ATTEMPTS_TRY_LATER)
 */
export function isFirebaseRateLimitError(err: any): boolean {
  if (!err) return false;
  if (err.code === 'auth/too-many-requests') return true;

  const combined = [
    err.message,
    err.code,
    err?.cause?.message,
    err?.cause?.response?.text,
    JSON.stringify(err?.httpResponse?.data || {}),
    JSON.stringify(err?.cause?.response?.parsedData || {}),
  ].filter(Boolean).join(' ');

  return combined.includes('TOO_MANY_ATTEMPTS_TRY_LATER') || combined.includes('TOO_MANY_ATTEMPTS');
}

/**
 * Look up user details in Firebase Admin Auth safely
 */
export async function getAdminUserByEmail(email: string) {
  if (!isFirebaseAdminConfigured()) return null;
  const auth = getAdminAuth();
  try {
    return await auth.getUserByEmail(email.trim().toLowerCase());
  } catch (err: any) {
    if (err?.code === 'auth/user-not-found') {
      return null;
    }
    throw err;
  }
}

/**
 * Generate a Firebase Email Verification link using Firebase Admin SDK with caching and rate-limit shield
 */
export async function generateVerificationLink(
  email: string,
  returnUrl: string = 'https://www.thenoobpm.com/#/dashboard'
): Promise<GeneratedActionLink> {
  if (!isFirebaseAdminConfigured()) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY is required for server-side link generation. A valid Service Account JSON key must be provided.'
    );
  }

  const cleanEmail = email.trim().toLowerCase();

  // Check cache to avoid hitting Firebase's rate limits
  const cached = verificationLinkCache.get(cleanEmail);
  const now = Date.now();
  if (cached && now - cached.createdAt < LINK_CACHE_TTL_MS) {
    console.log(`[FirebaseAdmin] Reusing fresh cached verification link for ${cleanEmail} (anti-rate-limit shield)`);
    return cached.result;
  }

  const auth = getAdminAuth();
  // Setting handleCodeInApp to false ensures Google Firebase Auth processes the verification
  // directly in the browser and displays the official verification confirmation, then redirects to returnUrl.
  const actionCodeSettings: ActionCodeSettings = {
    url: returnUrl,
    handleCodeInApp: false,
  };

  try {
    const rawLink = await auth.generateEmailVerificationLink(cleanEmail, actionCodeSettings);
    const result = buildActionLinkResult(rawLink, 'verifyEmail');
    verificationLinkCache.set(cleanEmail, { result, createdAt: now });
    return result;
  } catch (err: any) {
    if (isFirebaseRateLimitError(err)) {
      // If we have an older cached link within fallback window, salvage the operation
      if (cached && now - cached.createdAt < LINK_FALLBACK_MAX_AGE_MS) {
        console.warn(`[FirebaseAdmin] Firebase throttled generateVerificationLink for ${cleanEmail}. Rescuing with valid cached link (${Math.round((now - cached.createdAt) / 1000)}s old).`);
        return cached.result;
      }

      const rateLimitErr: any = new Error(
        'Too many verification requests have been sent for this email address. Please check your inbox and spam folder, or wait a few minutes before trying again.'
      );
      rateLimitErr.code = 'auth/too-many-requests';
      rateLimitErr.isRateLimit = true;
      throw rateLimitErr;
    }
    throw err;
  }
}

/**
 * Generate a Firebase Password Reset link using Firebase Admin SDK with caching and rate-limit shield
 */
export async function generatePasswordResetLink(
  email: string,
  returnUrl: string = 'https://www.thenoobpm.com/#/dashboard'
): Promise<GeneratedActionLink> {
  if (!isFirebaseAdminConfigured()) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY is required for server-side link generation. A valid Service Account JSON key must be provided.'
    );
  }

  const cleanEmail = email.trim().toLowerCase();

  const cached = passwordResetLinkCache.get(cleanEmail);
  const now = Date.now();
  if (cached && now - cached.createdAt < LINK_CACHE_TTL_MS) {
    console.log(`[FirebaseAdmin] Reusing fresh cached password reset link for ${cleanEmail}`);
    return cached.result;
  }

  const auth = getAdminAuth();
  const actionCodeSettings: ActionCodeSettings = {
    url: returnUrl,
    handleCodeInApp: false,
  };

  try {
    const rawLink = await auth.generatePasswordResetLink(cleanEmail, actionCodeSettings);
    const result = buildActionLinkResult(rawLink, 'resetPassword');
    passwordResetLinkCache.set(cleanEmail, { result, createdAt: now });
    return result;
  } catch (err: any) {
    if (isFirebaseRateLimitError(err)) {
      if (cached && now - cached.createdAt < LINK_FALLBACK_MAX_AGE_MS) {
        console.warn(`[FirebaseAdmin] Firebase throttled generatePasswordResetLink for ${cleanEmail}. Rescuing with valid cached link.`);
        return cached.result;
      }
      const rateLimitErr: any = new Error(
        'Too many password reset requests have been sent for this email. Please check your inbox or try again in a few minutes.'
      );
      rateLimitErr.code = 'auth/too-many-requests';
      rateLimitErr.isRateLimit = true;
      throw rateLimitErr;
    }
    throw err;
  }
}

/**
 * Verify a user's email directly by UID via Firebase Admin SDK
 */
export async function verifyUserEmailByUid(uid: string) {
  if (!isFirebaseAdminConfigured()) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is required for admin user operations.');
  }
  const auth = getAdminAuth();
  return await auth.updateUser(uid, { emailVerified: true });
}
