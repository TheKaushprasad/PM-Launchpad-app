import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { 
  getFirestore, 
  initializeFirestore, 
  doc, 
  getDocFromServer,
  persistentLocalCache,
  persistentSingleTabManager
} from 'firebase/firestore';
import defaultFirebaseConfig from '../firebase-applet-config.json';

const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};

// Support both environment variable overrides and the platform's auto-provisioned config
const activeFirebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || defaultFirebaseConfig.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || defaultFirebaseConfig.authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || defaultFirebaseConfig.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || defaultFirebaseConfig.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || defaultFirebaseConfig.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || defaultFirebaseConfig.appId,
  firestoreDatabaseId: env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || defaultFirebaseConfig.firestoreDatabaseId,
};

// Initialize Firebase App without duplicate instances during HMR
export const app = getApps().length === 0 ? initializeApp(activeFirebaseConfig) : getApp();

// Initialize Firestore with auto-detect long polling to prevent websocket/stream dropped connections in iframes
export const db = (() => {
  const databaseId = activeFirebaseConfig.firestoreDatabaseId || '(default)';
  try {
    return initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true,
      ignoreUndefinedProperties: true,
      localCache: persistentLocalCache({
        tabManager: persistentSingleTabManager({})
      })
    }, databaseId);
  } catch {
    // If already initialized (e.g. during fast-refresh), obtain existing instance
    return getFirestore(app, databaseId);
  }
})();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Connection verification test
async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firestore client operating in offline cache mode.");
    }
  }
}
testFirestoreConnection();

// Error Handling Definition
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMsg = error instanceof Error ? error.message : String(error);
  const errCode = (error as { code?: string })?.code;

  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };

  // If client is offline or unavailable, warn gracefully without fatal throwing
  if (errMsg.includes('offline') || errMsg.includes('the client is offline') || errCode === 'unavailable') {
    console.warn(`Firestore offline/pending (${operationType} on ${path}): ${errMsg}`);
    return;
  }

  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Development integration check helper
export function checkFirebaseIntegration() {
  const status = {
    appInitialized: !!app,
    authInitialized: !!auth,
    firestoreInitialized: !!db,
    projectId: activeFirebaseConfig.projectId,
    databaseId: activeFirebaseConfig.firestoreDatabaseId,
    timestamp: new Date().toISOString()
  };
  return status;
}

