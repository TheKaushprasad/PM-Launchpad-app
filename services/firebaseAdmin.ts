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
 * Generate a Firebase Email Verification link using Firebase Admin SDK
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

  const auth = getAdminAuth();
  // Setting handleCodeInApp to false ensures Google Firebase Auth processes the verification
  // directly in the browser and displays the official verification confirmation, then redirects to returnUrl.
  const actionCodeSettings: ActionCodeSettings = {
    url: returnUrl,
    handleCodeInApp: false,
  };

  const rawLink = await auth.generateEmailVerificationLink(email.trim(), actionCodeSettings);
  return buildActionLinkResult(rawLink, 'verifyEmail');
}

/**
 * Generate a Firebase Password Reset link using Firebase Admin SDK
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

  const auth = getAdminAuth();
  const actionCodeSettings: ActionCodeSettings = {
    url: returnUrl,
    handleCodeInApp: false,
  };

  const rawLink = await auth.generatePasswordResetLink(email.trim(), actionCodeSettings);
  return buildActionLinkResult(rawLink, 'resetPassword');
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
