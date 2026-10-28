import { authJsonHeaders } from '../../lib/apiClient';
import type { BuddyFeedback, BuddyMatch, BuddyProfile, BuddyRequest, BuddySessionView, FindBuddyInput } from '../../lib/productBuddy/types';

// Browser side of /api/product-buddy. Every call carries the user's Firebase token; the server
// checks it and owns all status changes.

async function call<T>(method: 'GET' | 'PUT' | 'POST', path: string, body?: unknown): Promise<T> {
  const res = await fetch(`/api/product-buddy${path}`, { method, headers: await authJsonHeaders(), body: body === undefined ? undefined : JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status}).`);
  return data as T;
}

export const buddyApi = {
  getProfile: () => call<{ profile: BuddyProfile | null }>('GET', '/profile'),
  saveProfile: (profile: Partial<BuddyProfile>) => call<{ profile: BuddyProfile }>('PUT', '/profile', profile),
  findMatches: (input: FindBuddyInput) => call<{ matches: BuddyMatch[]; emptyReason?: string }>('POST', '/matches', input),
  sendRequest: (input: FindBuddyInput & { recipientIds: string[]; topic: string; notes: string }) => call<{ request: BuddyRequest }>('POST', '/requests', input),
  listRequests: () => call<{ sent: BuddyRequest[]; received: BuddyRequest[] }>('GET', '/requests'),
  accept: (id: string) => call<{ request: BuddyRequest; session: BuddySessionView }>('POST', `/requests/${id}/accept`),
  decline: (id: string, note: string) => call<{ request: BuddyRequest }>('POST', `/requests/${id}/decline`, { note }),
  withdraw: (id: string) => call<{ request: BuddyRequest }>('POST', `/requests/${id}/withdraw`),
  listSessions: () => call<{ sessions: BuddySessionView[] }>('GET', '/sessions'),
  cancelSession: (id: string, reason: string) => call<{ session: BuddySessionView }>('POST', `/sessions/${id}/cancel`, { reason }),
  markOutcome: (id: string, outcome: 'happened' | 'no_show') => call<{ session: BuddySessionView }>('POST', `/sessions/${id}/outcome`, { outcome }),
  setMeetingLink: (id: string, url: string) => call<{ session: BuddySessionView }>('POST', `/sessions/${id}/meeting-link`, { url }),
  giveFeedback: (id: string, feedback: Omit<BuddyFeedback, 'createdAt'>) => call<{ session: BuddySessionView }>('POST', `/sessions/${id}/feedback`, feedback),
  swapQuestion: (id: string) => call<{ session: BuddySessionView }>('POST', `/sessions/${id}/swap-question`),
  block: (uid: string) => call<{ ok: boolean }>('POST', '/block', { uid }),
  addSampleBuddies: () => call<{ added: number }>('POST', '/dev/sample-buddies'),
  simulateAccept: (id: string) => call<{ request: BuddyRequest; session: BuddySessionView }>('POST', `/dev/requests/${id}/simulate-accept`),
};
