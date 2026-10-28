// Product Buddy: peer mock-interview matching. Shared by the browser and the server.
// Local-only for now (lib/featureFlags.ts).

export const PROFESSIONS = [
  'Student',
  'Aspiring Product Manager',
  'Associate Product Manager',
  'Product Manager',
  'Senior Product Manager',
  'Product-adjacent professional',
  'Other',
] as const;

export const DOMAINS = [
  'B2B SaaS',
  'Consumer technology',
  'Fintech',
  'E-commerce',
  'AI/ML products',
  'Edtech',
  'Healthtech',
  'Marketplace',
  'Developer tools',
  'Other',
] as const;

export const INTERVIEW_TYPES = [
  'Product design',
  'Product improvement',
  'Product strategy',
  'Metrics and analytics',
  'Root cause analysis',
  'Prioritization',
  'Estimation/guesstimates',
  'Behavioral',
  'Technical product management',
] as const;

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type Day = (typeof DAYS)[number];

export const DURATIONS = [45, 60] as const;

/** What the person is open to on their profile. */
export type ParticipationMode = 'candidate' | 'interviewer' | 'both';

/** What the requester wants from one session. A swap is one call where each person interviews the other. */
export type SessionKind = 'swap' | 'be_interviewed' | 'interview';

export const PARTICIPATION_LABELS: Record<ParticipationMode, string> = {
  candidate: 'I want to be interviewed',
  interviewer: 'I want to interview others',
  both: 'Both (happy to swap turns)',
};

export const SESSION_KIND_LABELS: Record<SessionKind, string> = {
  swap: 'Swap: we take turns',
  be_interviewed: 'Interview me',
  interview: 'I interview them',
};

/** A weekly window in the profile's own timezone, e.g. Wed 19:00–21:00. */
export interface AvailabilityWindow {
  day: Day;
  start: string; // "HH:MM"
  end: string; // "HH:MM"
}

export interface BuddyProfile {
  uid: string;
  name: string;
  email: string; // never sent to other users before a session is confirmed
  profession: string;
  organisation: string; // college or company
  currentRole: string;
  experienceYears: number;
  domains: string[];
  interviewTypes: string[];
  participation: ParticipationMode;
  availability: AvailabilityWindow[];
  timezone: string; // IANA, e.g. Asia/Kolkata
  about: string;
  discoverable: boolean;
  blocked: string[];
  sample?: boolean; // local test profiles only
  createdAt: string;
  updatedAt: string;
}

/** What other users see before a session is confirmed: no email. */
export type PublicBuddyProfile = Omit<BuddyProfile, 'email' | 'blocked' | 'createdAt' | 'updatedAt'>;

export interface BuddyMatch {
  profile: PublicBuddyProfile;
  reasons: string[];
  score: number;
}

export type RequestStatus = 'pending' | 'accepted' | 'declined' | 'expired' | 'withdrawn';
export type RecipientResponse = 'waiting' | 'declined' | 'missed';

export const MAX_RECIPIENTS = 3;

export interface BuddyRequest {
  id: string;
  requesterId: string;
  requester: PublicBuddyProfile;
  recipientIds: string[];
  recipients: Record<string, { name: string; response: RecipientResponse; note?: string }>;
  kind: SessionKind;
  interviewType: string;
  topic: string;
  notes: string;
  startAt: string; // ISO, UTC
  durationMinutes: number;
  timezone: string; // requester's timezone, for display
  status: RequestStatus;
  acceptedBy?: string;
  sessionId?: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export type SessionStatus = 'confirmed' | 'cancelled' | 'completed';

export interface BuddySession {
  id: string;
  requestId: string;
  participantIds: string[];
  participants: Record<string, { name: string; email: string; role: string }>;
  kind: SessionKind;
  interviewType: string;
  topic: string;
  notes: string;
  startAt: string;
  endAt: string;
  meetingUrl: string;
  status: SessionStatus;
  icsSequence: number;
  cancelledBy?: string;
  cancelReason?: string;
  outcomes: Record<string, 'happened' | 'no_show'>;
  createdAt: string;
  updatedAt: string;
}

export interface FindBuddyInput {
  kind: SessionKind;
  interviewType: string;
  domain?: string;
  startAt: string;
  durationMinutes: number;
}

/** The role a person plays in a session. */
export function roleFor(kind: SessionKind, isRequester: boolean): string {
  if (kind === 'swap') return 'Swap (takes turns)';
  const requesterIsCandidate = kind === 'be_interviewed';
  return requesterIsCandidate === isRequester ? 'Candidate' : 'Interviewer';
}
