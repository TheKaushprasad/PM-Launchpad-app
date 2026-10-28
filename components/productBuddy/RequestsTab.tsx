import React, { useEffect, useRef, useState } from 'react';
import { Ban, Check, FlaskConical, Inbox, Loader2, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Panel, PersonSummary, StatusPill } from './ui';
import { buddyApi } from './api';
import { formatSlot } from '../../lib/productBuddy/time';
import { SESSION_KIND_LABELS, roleFor, type BuddyProfile, type BuddyRequest } from '../../lib/productBuddy/types';

const Detail: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <p className="text-sm text-slate-700"><span className="font-bold text-slate-900">{label}:</span> {children}</p>
);

const ReceivedCard: React.FC<{ request: BuddyRequest; me: BuddyProfile; highlight: boolean; onChange: () => void; onAccepted: () => void }> = ({ request, me, highlight, onChange, onAccepted }) => {
  const [busy, setBusy] = useState<'' | 'accept' | 'decline' | 'block'>('');
  const [declining, setDeclining] = useState(false);
  const [note, setNote] = useState('');
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (highlight) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [highlight]);

  const mine = request.recipients[me.uid];
  const open = request.status === 'pending' && mine?.response === 'waiting';
  const status = request.status === 'accepted' && request.acceptedBy !== me.uid ? 'taken' : mine?.response === 'declined' ? 'declined' : request.status;
  const label = status === 'taken' ? 'Filled by someone else' : status === 'accepted' ? 'You accepted' : status === 'pending' ? 'Needs your answer' : undefined;

  const run = async (kind: 'accept' | 'decline' | 'block', fn: () => Promise<unknown>, done: string) => {
    setBusy(kind);
    try {
      await fn();
      toast.success(done);
      kind === 'accept' ? onAccepted() : onChange();
    } catch (err: any) {
      toast.error(err.message);
      onChange();
    } finally {
      setBusy('');
    }
  };

  return (
    <li ref={ref} className={`rounded-2xl border bg-white p-4 space-y-3 ${highlight ? 'border-brand-500 ring-2 ring-brand-200' : 'border-slate-200'}`}>
      <div className="flex items-start justify-between gap-3">
        <PersonSummary profile={request.requester} />
        <StatusPill status={status} label={label} />
      </div>
      <div className="space-y-1">
        <Detail label="When">{formatSlot(request.startAt, me.timezone, request.durationMinutes)}</Detail>
        <Detail label="Interview">{request.interviewType} · {SESSION_KIND_LABELS[request.kind]}</Detail>
        <Detail label="Your role">{roleFor(request.kind, false)}</Detail>
        {request.topic && <Detail label="Topic">{request.topic}</Detail>}
        {request.notes && <Detail label="Note">{request.notes}</Detail>}
        {open && (
          <p className="text-xs text-slate-500">
            Reply by {formatSlot(request.expiresAt, me.timezone)}.
            {request.recipientIds.length > 1 && ` This went to ${request.recipientIds.length} people; the first to accept gets it.`}
          </p>
        )}
      </div>
      {open && !declining && (
        <div className="flex flex-wrap gap-2">
          <Button variant="brand" size="sm" disabled={!!busy} onClick={() => run('accept', () => buddyApi.accept(request.id), 'Session confirmed! Check your email for the invite.')}>
            {busy === 'accept' ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />} Accept
          </Button>
          <Button variant="outline" size="sm" disabled={!!busy} onClick={() => setDeclining(true)}><X className="size-4" /> Decline</Button>
          <Button variant="ghost" size="sm" className="ml-auto text-slate-500" disabled={!!busy}
            onClick={() => window.confirm(`Block ${request.requester.name}? They won't see you in matches or be able to send you requests.`) && run('block', () => buddyApi.block(request.requesterId), 'Blocked')}>
            <Ban className="size-4" /> Block
          </Button>
        </div>
      )}
      {open && declining && (
        <div className="flex flex-wrap gap-2">
          <Input className="flex-1 min-w-48" value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} placeholder="Optional: suggest another time, e.g. Sat 11 am works" />
          <Button variant="outline" size="sm" disabled={!!busy} onClick={() => run('decline', () => buddyApi.decline(request.id, note), 'Declined')}>
            {busy === 'decline' && <Loader2 className="size-4 animate-spin" />} Decline
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeclining(false)}>Back</Button>
        </div>
      )}
    </li>
  );
};

const SentCard: React.FC<{ request: BuddyRequest; me: BuddyProfile; onChange: () => void; onAccepted: () => void }> = ({ request, me, onChange, onAccepted }) => {
  const [busy, setBusy] = useState(false);
  const run = async (fn: () => Promise<unknown>, done: string, after: () => void) => {
    setBusy(true);
    try {
      await fn();
      toast.success(done);
      after();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };
  const canSimulate = import.meta.env.DEV && request.status === 'pending' && request.recipientIds.some((id) => id.startsWith('sample_') && request.recipients[id]?.response === 'waiting');

  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-black text-slate-900">{request.interviewType} · {SESSION_KIND_LABELS[request.kind]}</p>
          <p className="text-sm text-slate-600">{formatSlot(request.startAt, me.timezone, request.durationMinutes)}</p>
        </div>
        <StatusPill status={request.status} label={request.status === 'pending' ? 'Waiting' : undefined} />
      </div>
      <ul className="space-y-1.5">
        {request.recipientIds.map((id) => {
          const r = request.recipients[id];
          const state = request.acceptedBy === id ? 'accepted' : r.response === 'waiting' && request.status !== 'pending' ? 'missed' : r.response;
          return (
            <li key={id} className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold text-slate-800">{r.name}</span>
              <StatusPill status={state} label={state === 'missed' ? 'no reply' : state} />
              {r.note && <span className="text-xs text-slate-500">"{r.note}"</span>}
            </li>
          );
        })}
      </ul>
      {request.status === 'pending' && (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" disabled={busy} onClick={() => run(() => buddyApi.withdraw(request.id), 'Request withdrawn', onChange)}>Withdraw</Button>
          {canSimulate && (
            <Button variant="outline" size="sm" className="border-violet-300 text-violet-800" disabled={busy}
              onClick={() => run(() => buddyApi.simulateAccept(request.id), 'A sample buddy accepted. See My sessions.', onAccepted)}>
              <FlaskConical className="size-4" /> Simulate a sample buddy accepting
            </Button>
          )}
        </div>
      )}
      {request.status === 'pending' && <p className="text-xs text-slate-500">Closes {formatSlot(request.expiresAt, me.timezone)} if no one accepts.</p>}
    </li>
  );
};

export const RequestsTab: React.FC<{ me: BuddyProfile; highlightId?: string; onAccepted: () => void; onCountChange: (n: number) => void }> = ({ me, highlightId, onAccepted, onCountChange }) => {
  const [data, setData] = useState<{ sent: BuddyRequest[]; received: BuddyRequest[] } | null>(null);
  const load = () =>
    buddyApi.listRequests().then((d) => {
      setData(d);
      onCountChange(d.received.filter((r) => r.status === 'pending' && r.recipients[me.uid]?.response === 'waiting').length);
    }).catch((err) => toast.error(err.message));
  useEffect(() => {
    load();
  }, []);

  if (!data) return <div className="py-10 text-center"><Loader2 className="size-6 animate-spin mx-auto text-brand-600" /></div>;
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-sm font-black text-slate-900 flex items-center gap-2"><Inbox className="size-4" /> Requests to you</h2>
        {data.received.length ? (
          <ul className="space-y-3">{data.received.map((r) => <ReceivedCard key={r.id} request={r} me={me} highlight={r.id === highlightId} onChange={load} onAccepted={onAccepted} />)}</ul>
        ) : (
          <Panel><p className="text-sm text-slate-600">No requests yet. Keep "Show me in matches" on in your profile and add a few weekly times so people can find you.</p></Panel>
        )}
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-black text-slate-900 flex items-center gap-2"><Send className="size-4" /> Requests you sent</h2>
        {data.sent.length ? (
          <ul className="space-y-3">{data.sent.map((r) => <SentCard key={r.id} request={r} me={me} onChange={load} onAccepted={onAccepted} />)}</ul>
        ) : (
          <Panel><p className="text-sm text-slate-600">You haven't asked anyone yet. Use Find a buddy to pick a time and up to 3 people.</p></Panel>
        )}
      </section>
    </div>
  );
};
