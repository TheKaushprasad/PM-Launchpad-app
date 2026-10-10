import { auth } from './firebase';

/** JSON headers plus the signed-in user's Firebase ID token, which the AI and email endpoints require. */
export async function authJsonHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = await auth.currentUser?.getIdToken().catch(() => null);
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}
