import express from 'express';
import { randomBytes } from 'node:crypto';
import { FieldValue, type Firestore, type Transaction } from 'firebase-admin/firestore';
import { getAppFirestore, isFirebaseAdminConfigured } from '../../services/firebaseAdmin';
import { consumeDailyQuota, getVerifiedUser, type VerifiedUser } from '../security';
import { fitsAvailability, isValidTimezone } from '../../lib/productBuddy/time';
import {
  DAYS, DOMAINS, DURATIONS, INTERVIEW_TYPES, MAX_RECIPIENTS, PROFESSIONS, roleFor,
  type AvailabilityWindow, type BuddyMatch, type BuddyProfile, type BuddyRequest, type BuddySession,
  type FindBuddyInput, type ParticipationMode, type PublicBuddyProfile, type SessionKind,
} from '../../lib/productBuddy/types';
import { emailAllDeclined, emailNewRequest, emailSessionCancelled, emailSessionConfirmed, emailSlotFilled } from './emails';

// Product Buddy: peer mock-interview matching. Server-only Firestore (Admin SDK; the default-deny
// rule keeps browsers out), so every status change is checked here, never in the browser.
//   buddy_profiles/{uid}   buddy_requests/{id}   buddy_sessions/{id}
// One request can go to up to 3 people; the first to accept gets the session, and the others are
// told the slot is filled. Booking runs in a Firestore transaction that also writes both people's
// profiles, so two accepts touching the same person are serialised and can't double-book them.
// Local-only for now: on in `npm run dev`, off on the live site unless VITE_PRODUCT_BUDDY_ENABLED=true.

const devMode = () => process.env.NODE_ENV !== 'production';
const enabled = () => devMode() || process.env.VITE_PRODUCT_BUDDY_ENABLED === 'true';

const PROFILES = 'buddy_profiles';
const REQUESTS = 'buddy_requests';
const SESSIONS = 'buddy_sessions';

const MIN_LEAD_MS = 3 * 60 * 60 * 1000; // recipients need time to see the request
const MAX_AHEAD_MS = 30 * 24 * 60 * 60 * 1000;
const RESPONSE_WINDOW_MS = 24 * 60 * 60 * 1000;
const RESPONSE_CUTOFF_MS = 2 * 60 * 60 * 1000; // requests close 2h before the session at the latest
const REQUESTS_PER_DAY = 10;

class BuddyError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

const db = (): Firestore => getAppFirestore();
const nowIso = () => new Date().toISOString();
const str = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
const pick = <T extends string>(v: unknown, allowed: readonly T[]) => (allowed as readonly string[]).includes(String(v)) ? (v as T) : null;
const pickMany = (v: unknown, allowed: readonly string[]) => Array.isArray(v) ? [...new Set(v.map(String))].filter((x) => allowed.includes(x)) : [];
const endOf = (startAt: string, minutes: number) => new Date(Date.parse(startAt) + minutes * 60000).toISOString();
const overlaps = (aStart: string, aEnd: string, bStart: string, bEnd: string) => Date.parse(aStart) < Date.parse(bEnd) && Date.parse(bStart) < Date.parse(aEnd);

function appUrl(req: express.Request): string {
  const origin = (req.headers.origin as string) || (req.headers.referer ? new URL(req.headers.referer as string).origin : '') || process.env.APP_URL || 'https://www.thenoobpm.com';
  return origin.replace(/\/+$/, '');
}

function publicProfile(p: BuddyProfile): PublicBuddyProfile {
  const { email: _e, blocked: _b, createdAt: _c, updatedAt: _u, ...rest } = p;
  return rest;
}

// ---------- validation ----------

const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/;

function cleanAvailability(v: unknown): AvailabilityWindow[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, 28).flatMap((w: any) => {
    const day = pick(w?.day, DAYS);
    const start = String(w?.start || '');
    const end = String(w?.end || '');
    return day && HHMM.test(start) && HHMM.test(end) && start < end ? [{ day, start, end }] : [];
  });
}

function cleanProfile(body: any, user: VerifiedUser, existing: BuddyProfile | null): BuddyProfile {
  const profile: BuddyProfile = {
    uid: user.uid,
    email: user.email,
    name: str(body.name, 80),
    profession: pick(body.profession, PROFESSIONS) || '',
    organisation: str(body.organisation, 120),
    currentRole: str(body.currentRole, 80),
    experienceYears: Math.max(0, Math.min(40, Math.round(Number(body.experienceYears) || 0))),
    domains: pickMany(body.domains, DOMAINS),
    interviewTypes: pickMany(body.interviewTypes, INTERVIEW_TYPES),
    participation: pick(body.participation, ['candidate', 'interviewer', 'both'] as const) || 'both',
    availability: cleanAvailability(body.availability),
    timezone: isValidTimezone(String(body.timezone)) ? String(body.timezone) : 'Asia/Kolkata',
    about: str(body.about, 300),
    discoverable: body.discoverable !== false,
    blocked: existing?.blocked || [],
    createdAt: existing?.createdAt || nowIso(),
    updatedAt: nowIso(),
  };
  if (!profile.name) throw new BuddyError('Add your name.');
  if (!profile.profession) throw new BuddyError('Pick your profession.');
  if (!profile.currentRole) throw new BuddyError('Add your current role.');
  if (!profile.domains.length) throw new BuddyError('Pick at least one domain.');
  if (!profile.interviewTypes.length) throw new BuddyError('Pick at least one interview type.');
  if (!profile.availability.length) throw new BuddyError('Add at least one weekly time window.');
  return profile;
}

function cleanSlot(body: any): { startAt: string; durationMinutes: number } {
  const start = Date.parse(String(body.startAt));
  if (!Number.isFinite(start)) throw new BuddyError('Pick a date and time.');
  if (start < Date.now() + MIN_LEAD_MS) throw new BuddyError('Pick a time at least 3 hours from now, so your buddy has time to reply.');
  if (start > Date.now() + MAX_AHEAD_MS) throw new BuddyError('Pick a time within the next 30 days.');
  const durationMinutes = (DURATIONS as readonly number[]).includes(Number(body.durationMinutes)) ? Number(body.durationMinutes) : 45;
  return { startAt: new Date(start).toISOString(), durationMinutes };
}

// ---------- reads ----------

async function getProfile(uid: string): Promise<BuddyProfile | null> {
  const snap = await db().collection(PROFILES).doc(uid).get();
  return snap.exists ? (snap.data() as BuddyProfile) : null;
}

async function requireProfile(uid: string): Promise<BuddyProfile> {
  const p = await getProfile(uid);
  if (!p) throw new BuddyError('Create your Product Buddy profile first.', 409);
  return p;
}

/** Confirmed sessions of these people that overlap the slot. */
function busyIn(sessions: BuddySession[], uids: string[], startAt: string, endAt: string): string[] {
  const busy = new Set<string>();
  for (const s of sessions) {
    if (s.status !== 'confirmed' || !overlaps(s.startAt, s.endAt, startAt, endAt)) continue;
    s.participantIds.filter((id) => uids.includes(id)).forEach((id) => busy.add(id));
  }
  return [...busy];
}

/** Can `p` take the other side of a session of this kind? */
function canPartner(kind: SessionKind, mode: ParticipationMode): boolean {
  if (kind === 'swap') return mode === 'both';
  if (kind === 'be_interviewed') return mode === 'interviewer' || mode === 'both';
  return mode === 'candidate' || mode === 'both';
}

async function findMatches(me: BuddyProfile, input: FindBuddyInput): Promise<{ matches: BuddyMatch[]; emptyReason?: string }> {
  const endAt = endOf(input.startAt, input.durationMinutes);
  const [profilesSnap, sessionsSnap] = await Promise.all([
    db().collection(PROFILES).where('discoverable', '==', true).limit(1000).get(),
    // Sessions are at most 60 minutes, so any overlap starts within this range.
    db().collection(SESSIONS).where('startAt', '>', new Date(Date.parse(input.startAt) - 2 * 3600000).toISOString()).where('startAt', '<', endAt).get(),
  ]);
  const others = profilesSnap.docs
    .map((d) => d.data() as BuddyProfile)
    .filter((p) => p.uid !== me.uid && (devMode() || !p.sample) && !me.blocked.includes(p.uid) && !(p.blocked || []).includes(me.uid));
  if (!others.length) return { matches: [], emptyReason: 'No one else has a Product Buddy profile yet. Ask a friend who is preparing to join, or check back soon.' };

  const sessions = sessionsSnap.docs.map((d) => d.data() as BuddySession);
  if (busyIn(sessions, [me.uid], input.startAt, endAt).length) {
    return { matches: [], emptyReason: 'You already have a session booked at this time.' };
  }
  const busy = new Set(busyIn(sessions, others.map((p) => p.uid), input.startAt, endAt));

  const compatible = others.filter((p) => canPartner(input.kind, p.participation));
  if (!compatible.length) {
    return { matches: [], emptyReason: input.kind === 'swap' ? 'No one is open to swapping turns yet. Try "Interview me" or "I interview them".' : 'No one is open to that role yet. Try a swap instead.' };
  }
  const free = compatible.filter((p) => !busy.has(p.uid) && fitsAvailability(p.availability, p.timezone, input.startAt, input.durationMinutes));
  if (!free.length) {
    return { matches: [], emptyReason: `${compatible.length} ${compatible.length === 1 ? 'person is' : 'people are'} open to this format, but no one is free at that time. Try an evening or a weekend slot.` };
  }

  const matches = free.map((p): BuddyMatch => {
    const reasons: string[] = [];
    let score = 0;
    if (p.interviewTypes.includes(input.interviewType)) {
      score += 30;
      reasons.push(`Practises ${input.interviewType.toLowerCase()}`);
    }
    reasons.push('Free at this time');
    if (input.domain && p.domains.includes(input.domain)) {
      score += 20;
      reasons.push(`Knows ${input.domain}`);
    } else {
      const shared = p.domains.filter((d) => me.domains.includes(d) && d !== 'Other');
      if (shared.length) {
        score += 10;
        reasons.push(`Also into ${shared[0]}`);
      }
    }
    const diff = p.experienceYears - me.experienceYears;
    if (input.kind === 'be_interviewed' && diff >= 1) {
      score += 25;
      reasons.push(`${p.experienceYears} yrs experience, more than you`);
    } else if (input.kind !== 'be_interviewed' && Math.abs(diff) <= 2) {
      score += 15;
      reasons.push('Similar experience level');
    }
    return { profile: publicProfile(p), reasons, score };
  });
  matches.sort((a, b) => b.score - a.score);
  return { matches: matches.slice(0, 10) };
}

// ---------- status changes ----------

/** Marks a pending request expired once its deadline has passed. Skips the write if it changed meanwhile. */
async function expireIfDue(request: BuddyRequest): Promise<BuddyRequest> {
  if (request.status !== 'pending' || Date.parse(request.expiresAt) > Date.now()) return request;
  const recipients = Object.fromEntries(Object.entries(request.recipients).map(([id, r]) => [id, r.response === 'waiting' ? { ...r, response: 'missed' as const } : r]));
  const updated = { ...request, status: 'expired' as const, recipients, updatedAt: nowIso() };
  const ref = db().collection(REQUESTS).doc(request.id);
  await db().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if ((snap.data() as BuddyRequest)?.status === 'pending') tx.update(ref, { status: 'expired', recipients, updatedAt: updated.updatedAt });
  });
  return updated;
}

/** The booking: first accept wins. Throws a BuddyError the person can read if it can't go ahead. */
async function acceptRequest(requestId: string, uid: string): Promise<{ request: BuddyRequest; session: BuddySession }> {
  const fs = db();
  const reqRef = fs.collection(REQUESTS).doc(requestId);
  return fs.runTransaction(async (tx: Transaction) => {
    const snap = await tx.get(reqRef);
    if (!snap.exists) throw new BuddyError('This request no longer exists.', 404);
    const request = snap.data() as BuddyRequest;
    if (!request.recipientIds.includes(uid)) throw new BuddyError('This request was not sent to you.', 403);
    if (request.status === 'accepted') throw new BuddyError(request.acceptedBy === uid ? 'You already accepted this.' : 'This slot was already taken by someone else. Thanks for offering!', 409);
    if (request.status !== 'pending') throw new BuddyError(`This request is ${request.status}.`, 409);
    if (Date.parse(request.expiresAt) <= Date.now()) throw new BuddyError('This request has expired. Ask them to send a new one.', 409);
    if (request.recipients[uid]?.response === 'declined') throw new BuddyError('You declined this request.', 409);

    const requesterRef = fs.collection(PROFILES).doc(request.requesterId);
    const meRef = fs.collection(PROFILES).doc(uid);
    const endAt = endOf(request.startAt, request.durationMinutes);
    const [requesterSnap, meSnap, sessionsSnap] = await Promise.all([
      tx.get(requesterRef),
      tx.get(meRef),
      tx.get(fs.collection(SESSIONS).where('participantIds', 'array-contains-any', [request.requesterId, uid])),
    ]);
    if (!requesterSnap.exists || !meSnap.exists) throw new BuddyError('One of the profiles was deleted.', 409);
    const requester = requesterSnap.data() as BuddyProfile;
    const me = meSnap.data() as BuddyProfile;
    const busy = busyIn(sessionsSnap.docs.map((d) => d.data() as BuddySession), [request.requesterId, uid], request.startAt, endAt);
    if (busy.includes(uid)) throw new BuddyError('You already have a session at this time.', 409);
    if (busy.includes(request.requesterId)) throw new BuddyError(`${requester.name} is already booked at this time.`, 409);

    const now = nowIso();
    const sessionRef = fs.collection(SESSIONS).doc();
    const session: BuddySession = {
      id: sessionRef.id,
      requestId,
      participantIds: [request.requesterId, uid],
      participants: {
        [request.requesterId]: { name: requester.name, email: requester.email, role: roleFor(request.kind, true) },
        [uid]: { name: me.name, email: me.email, role: roleFor(request.kind, false) },
      },
      kind: request.kind,
      interviewType: request.interviewType,
      topic: request.topic,
      notes: request.notes,
      startAt: request.startAt,
      endAt,
      // Free and needs no sign-up to join; either person can swap in their own Meet or Zoom link.
      meetingUrl: `https://meet.jit.si/TheNoobPM-Buddy-${randomBytes(6).toString('hex')}`,
      status: 'confirmed',
      icsSequence: 0,
      outcomes: {},
      createdAt: now,
      updatedAt: now,
    };
    const accepted: BuddyRequest = { ...request, status: 'accepted', acceptedBy: uid, sessionId: session.id, updatedAt: now };
    tx.set(sessionRef, session);
    tx.update(reqRef, { status: 'accepted', acceptedBy: uid, sessionId: session.id, updatedAt: now });
    // Writing both profiles makes any other booking that touches either person retry after this one.
    tx.update(requesterRef, { bookingVersion: FieldValue.increment(1) });
    tx.update(meRef, { bookingVersion: FieldValue.increment(1) });
    return { request: accepted, session };
  });
}

async function notifyAccepted(request: BuddyRequest, session: BuddySession, base: string) {
  const ids = [...session.participantIds, ...request.recipientIds];
  const profiles = new Map((await Promise.all([...new Set(ids)].map(getProfile))).filter(Boolean).map((p) => [p!.uid, p!]));
  await Promise.all([
    ...session.participantIds.map((id) => emailSessionConfirmed(session, id, profiles.get(id)?.timezone || 'Asia/Kolkata', base)),
    ...request.recipientIds
      .filter((id) => id !== request.acceptedBy && request.recipients[id]?.response === 'waiting')
      .map((id) => profiles.get(id) && emailSlotFilled(request, profiles.get(id)!, base)),
  ]);
}

// ---------- routes ----------

export function registerProductBuddyRoutes(app: express.Express) {
  const gate: express.RequestHandler = (_req, res, next) => (enabled() ? next() : res.status(404).json({ error: 'Not found' }));

  const requireUser: express.RequestHandler = async (req, res, next) => {
    if (!isFirebaseAdminConfigured()) {
      return res.status(503).json({ error: 'Product Buddy needs FIREBASE_SERVICE_ACCOUNT_KEY in your .env to save profiles and bookings.' });
    }
    const user = await getVerifiedUser(req);
    if (!user) return res.status(401).json({ error: 'Please sign in to use Product Buddy.', requiresAuth: true });
    if (!user.emailVerified) return res.status(403).json({ error: 'Please verify your email address first; session invites go there.', requiresAuth: true });
    res.locals.user = user;
    next();
  };

  type Handler = (req: express.Request, user: VerifiedUser) => Promise<unknown>;
  const route = (method: 'get' | 'put' | 'post', path: string, handler: Handler) => {
    app[method]([`/api/product-buddy${path}`, `/api/product-buddy${path}/`], async (req, res) => {
      try {
        res.json(await handler(req, res.locals.user as VerifiedUser));
      } catch (error: any) {
        if (!(error instanceof BuddyError)) console.error('[ProductBuddy Error]:', error?.message || error);
        res.status(error instanceof BuddyError ? error.status : 500).json({ error: error instanceof BuddyError ? error.message : 'Something went wrong. Please try again.' });
      }
    });
  };

  app.use('/api/product-buddy', gate, requireUser);

  route('get', '/profile', async (_req, user) => ({ profile: await getProfile(user.uid) }));

  route('put', '/profile', async (req, user) => {
    const existing = await getProfile(user.uid);
    const profile = cleanProfile(req.body || {}, user, existing);
    await db().collection(PROFILES).doc(user.uid).set(profile, { merge: true });
    return { profile };
  });

  route('post', '/matches', async (req, user) => {
    const me = await requireProfile(user.uid);
    const kind = pick(req.body?.kind, ['swap', 'be_interviewed', 'interview'] as const);
    const interviewType = pick(req.body?.interviewType, INTERVIEW_TYPES);
    if (!kind || !interviewType) throw new BuddyError('Pick a format and an interview type.');
    const domain = pick(req.body?.domain, DOMAINS) || undefined;
    return findMatches(me, { kind, interviewType, domain, ...cleanSlot(req.body || {}) });
  });

  route('post', '/requests', async (req, user) => {
    const me = await requireProfile(user.uid);
    const body = req.body || {};
    const kind = pick(body.kind, ['swap', 'be_interviewed', 'interview'] as const);
    const interviewType = pick(body.interviewType, INTERVIEW_TYPES);
    if (!kind || !interviewType) throw new BuddyError('Pick a format and an interview type.');
    const slot = cleanSlot(body);
    const recipientIds: string[] = [...new Set<string>((Array.isArray(body.recipientIds) ? body.recipientIds : []).map(String))].filter((id) => id !== user.uid);
    if (!recipientIds.length) throw new BuddyError('Pick at least one buddy.');
    if (recipientIds.length > MAX_RECIPIENTS) throw new BuddyError(`You can ask up to ${MAX_RECIPIENTS} people at once.`);

    // Only people who would show up in the match list for this slot can be asked.
    const { matches } = await findMatches(me, { kind, interviewType, ...slot });
    const eligible = new Map(matches.map((m) => [m.profile.uid, m.profile]));
    const notEligible = recipientIds.filter((id) => !eligible.has(id));
    if (notEligible.length) throw new BuddyError('Someone you picked is no longer free at that time. Search again.', 409);

    // One open request per time slot, so two people can't both accept the same hour of yours.
    const mine = await db().collection(REQUESTS).where('requesterId', '==', user.uid).get();
    const endAt = endOf(slot.startAt, slot.durationMinutes);
    const clash = mine.docs.map((d) => d.data() as BuddyRequest).find((r) => r.status === 'pending' && Date.parse(r.expiresAt) > Date.now() && overlaps(r.startAt, endOf(r.startAt, r.durationMinutes), slot.startAt, endAt));
    if (clash) throw new BuddyError('You already have an open request at this time. Withdraw it first, or pick another time.', 409);

    if (!(await consumeDailyQuota(`buddy_requests_${user.uid}`, REQUESTS_PER_DAY))) {
      throw new BuddyError(`You can send ${REQUESTS_PER_DAY} requests a day. Try again tomorrow.`, 429);
    }

    const ref = db().collection(REQUESTS).doc();
    const now = Date.now();
    const request: BuddyRequest = {
      id: ref.id,
      requesterId: user.uid,
      requester: publicProfile(me),
      recipientIds,
      recipients: Object.fromEntries(recipientIds.map((id) => [id, { name: eligible.get(id)!.name, response: 'waiting' as const }])),
      kind,
      interviewType,
      topic: str(body.topic, 200),
      notes: str(body.notes, 600),
      ...slot,
      timezone: me.timezone,
      status: 'pending',
      expiresAt: new Date(Math.min(now + RESPONSE_WINDOW_MS, Date.parse(slot.startAt) - RESPONSE_CUTOFF_MS)).toISOString(),
      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    };
    await ref.set(request);

    const base = appUrl(req);
    const recipients = (await Promise.all(recipientIds.map(getProfile))).filter(Boolean) as BuddyProfile[];
    await Promise.all(recipients.map((r) => emailNewRequest(request, r, base)));
    return { request };
  });

  route('get', '/requests', async (_req, user) => {
    const [sentSnap, receivedSnap] = await Promise.all([
      db().collection(REQUESTS).where('requesterId', '==', user.uid).get(),
      db().collection(REQUESTS).where('recipientIds', 'array-contains', user.uid).get(),
    ]);
    const byNewest = (a: BuddyRequest, b: BuddyRequest) => b.createdAt.localeCompare(a.createdAt);
    const sent = await Promise.all(sentSnap.docs.map((d) => expireIfDue(d.data() as BuddyRequest)));
    const received = await Promise.all(receivedSnap.docs.map((d) => expireIfDue(d.data() as BuddyRequest)));
    return { sent: sent.sort(byNewest).slice(0, 50), received: received.sort(byNewest).slice(0, 50) };
  });

  route('post', '/requests/:id/accept', async (req, user) => {
    const { request, session } = await acceptRequest(String(req.params.id), user.uid);
    await notifyAccepted(request, session, appUrl(req));
    return { request, session };
  });

  route('post', '/requests/:id/decline', async (req, user) => {
    const ref = db().collection(REQUESTS).doc(String(req.params.id));
    const note = str(req.body?.note, 200);
    const result = await db().runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const request = snap.data() as BuddyRequest | undefined;
      if (!request || !request.recipientIds.includes(user.uid)) throw new BuddyError('This request was not sent to you.', 403);
      if (request.status !== 'pending') throw new BuddyError(`This request is already ${request.status}.`, 409);
      const recipients = { ...request.recipients, [user.uid]: { ...request.recipients[user.uid], response: 'declined' as const, ...(note ? { note } : {}) } };
      const allDeclined = Object.values(recipients).every((r) => r.response === 'declined');
      const updated: BuddyRequest = { ...request, recipients, status: allDeclined ? 'declined' : 'pending', updatedAt: nowIso() };
      tx.update(ref, { recipients, status: updated.status, updatedAt: updated.updatedAt });
      return updated;
    });
    if (result.status === 'declined') {
      const requester = await getProfile(result.requesterId);
      if (requester) await emailAllDeclined(result, requester, appUrl(req));
    }
    return { request: result };
  });

  route('post', '/requests/:id/withdraw', async (req, user) => {
    const ref = db().collection(REQUESTS).doc(String(req.params.id));
    const request = await db().runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const r = snap.data() as BuddyRequest | undefined;
      if (!r || r.requesterId !== user.uid) throw new BuddyError('This is not your request.', 403);
      if (r.status !== 'pending') throw new BuddyError(`This request is already ${r.status}.`, 409);
      const updated: BuddyRequest = { ...r, status: 'withdrawn', updatedAt: nowIso() };
      tx.update(ref, { status: 'withdrawn', updatedAt: updated.updatedAt });
      return updated;
    });
    return { request };
  });

  route('get', '/sessions', async (_req, user) => {
    const snap = await db().collection(SESSIONS).where('participantIds', 'array-contains', user.uid).get();
    const sessions = snap.docs.map((d) => d.data() as BuddySession).sort((a, b) => b.startAt.localeCompare(a.startAt));
    return { sessions: sessions.slice(0, 100) };
  });

  const updateSession = (req: express.Request, user: VerifiedUser, change: (s: BuddySession) => Partial<BuddySession>) => {
    const ref = db().collection(SESSIONS).doc(String(req.params.id));
    return db().runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const session = snap.data() as BuddySession | undefined;
      if (!session || !session.participantIds.includes(user.uid)) throw new BuddyError('This is not your session.', 403);
      const patch = { ...change(session), updatedAt: nowIso() };
      tx.update(ref, patch);
      return { ...session, ...patch } as BuddySession;
    });
  };

  route('post', '/sessions/:id/cancel', async (req, user) => {
    const session = await updateSession(req, user, (s) => {
      if (s.status !== 'confirmed') throw new BuddyError(`This session is already ${s.status}.`, 409);
      if (Date.parse(s.startAt) < Date.now()) throw new BuddyError('This session has already started.', 409);
      return { status: 'cancelled', cancelledBy: user.uid, cancelReason: str(req.body?.reason, 200), icsSequence: s.icsSequence + 1 };
    });
    const partnerId = session.participantIds.find((id) => id !== user.uid)!;
    const partner = await getProfile(partnerId);
    if (partner) await emailSessionCancelled(session, partner, session.participants[user.uid].name, appUrl(req));
    return { session };
  });

  route('post', '/sessions/:id/outcome', async (req, user) => {
    const outcome = pick(req.body?.outcome, ['happened', 'no_show'] as const);
    if (!outcome) throw new BuddyError('Say whether the session happened.');
    const session = await updateSession(req, user, (s) => {
      if (s.status === 'cancelled') throw new BuddyError('This session was cancelled.', 409);
      if (Date.parse(s.startAt) > Date.now()) throw new BuddyError('You can mark this after the session starts.', 409);
      return { status: 'completed', outcomes: { ...s.outcomes, [user.uid]: outcome } };
    });
    return { session };
  });

  route('post', '/sessions/:id/meeting-link', async (req, user) => {
    const url = str(req.body?.url, 300);
    if (!/^https:\/\/[^\s]+$/.test(url)) throw new BuddyError('Paste a full https:// meeting link.');
    const session = await updateSession(req, user, (s) => {
      if (s.status !== 'confirmed') throw new BuddyError(`This session is ${s.status}.`, 409);
      return { meetingUrl: url, icsSequence: s.icsSequence + 1 };
    });
    return { session };
  });

  route('post', '/block', async (req, user) => {
    const target = str(req.body?.uid, 128);
    if (!target || target === user.uid) throw new BuddyError('Pick someone to block.');
    await requireProfile(user.uid);
    await db().collection(PROFILES).doc(user.uid).update({ blocked: FieldValue.arrayUnion(target), updatedAt: nowIso() });
    // Close their open requests to me so they disappear from my list.
    const open = await db().collection(REQUESTS).where('recipientIds', 'array-contains', user.uid).get();
    await Promise.all(open.docs.filter((d) => (d.data() as BuddyRequest).requesterId === target && (d.data() as BuddyRequest).status === 'pending')
      .map((d) => d.ref.update({ [`recipients.${user.uid}.response`]: 'declined', updatedAt: nowIso() })));
    return { ok: true };
  });

  // ---------- local testing only ----------
  // One person can't test a two-sided feature alone, so `npm run dev` can add three sample buddies
  // and play their side of a request. Refused on the live site.

  route('post', '/dev/sample-buddies', async () => {
    if (!devMode()) throw new BuddyError('Not available.', 404);
    const everyEvening = DAYS.map((day) => ({ day, start: '07:00', end: '23:00' }));
    const base = { email: '', organisation: '', availability: everyEvening, timezone: 'Asia/Kolkata', discoverable: true, blocked: [], sample: true, createdAt: nowIso(), updatedAt: nowIso() };
    const samples: BuddyProfile[] = [
      { ...base, uid: 'sample_aarav', name: 'Aarav (sample)', profession: 'Associate Product Manager', organisation: 'Sample fintech', currentRole: 'APM', experienceYears: 2, domains: ['Fintech', 'AI/ML products'], interviewTypes: ['Product design', 'Metrics and analytics', 'Root cause analysis'], participation: 'both', about: 'Happy to swap turns on design and metrics.' },
      { ...base, uid: 'sample_meera', name: 'Meera (sample)', profession: 'Product Manager', organisation: 'Sample SaaS', currentRole: 'Product Manager', experienceYears: 5, domains: ['B2B SaaS', 'Developer tools'], interviewTypes: ['Product strategy', 'Prioritization', 'Behavioral', 'Product design'], participation: 'interviewer', about: 'I interview APM candidates on strategy and behavioral rounds.' },
      { ...base, uid: 'sample_kabir', name: 'Kabir (sample)', profession: 'Student', organisation: 'Sample college', currentRole: 'MBA student', experienceYears: 0, domains: ['E-commerce', 'Consumer technology'], interviewTypes: ['Estimation/guesstimates', 'Product improvement', 'Product design'], participation: 'candidate', about: 'Preparing for APM roles; want practice on guesstimates.' },
    ];
    const batch = db().batch();
    samples.forEach((s) => batch.set(db().collection(PROFILES).doc(s.uid), s));
    await batch.commit();
    return { added: samples.length };
  });

  route('post', '/dev/requests/:id/simulate-accept', async (req, user) => {
    if (!devMode()) throw new BuddyError('Not available.', 404);
    const snap = await db().collection(REQUESTS).doc(String(req.params.id)).get();
    const request = snap.data() as BuddyRequest | undefined;
    if (!request || request.requesterId !== user.uid) throw new BuddyError('This is not your request.', 403);
    const sampleId = request.recipientIds.find((id) => id.startsWith('sample_') && request.recipients[id]?.response === 'waiting');
    if (!sampleId) throw new BuddyError('None of the sample buddies on this request can accept it.', 409);
    const result = await acceptRequest(request.id, sampleId);
    await notifyAccepted(result.request, result.session, appUrl(req));
    return result;
  });
}
