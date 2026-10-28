import React, { useEffect, useState } from 'react';
import { CalendarPlus, CalendarX, Download, Link2, Loader2, Video } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Panel, StatusPill } from './ui';
import { buddyApi } from './api';
import { buildIcs, googleCalendarLink, sessionCalendarEvent } from '../../lib/productBuddy/calendar';
import { formatSlot } from '../../lib/productBuddy/time';
import { type BuddyProfile, type BuddySession } from '../../lib/productBuddy/types';

const downloadIcs = (session: BuddySession) => {
  const blob = new Blob([buildIcs(sessionCalendarEvent(session, window.location.origin), 'PUBLISH')], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: `product-buddy-${session.startAt.slice(0, 10)}.ics` });
  a.click();
  URL.revokeObjectURL(url);
};

const SessionCard: React.FC<{ session: BuddySession; me: BuddyProfile; onChange: (s: BuddySession) => void }> = ({ session, me, onChange }) => {
  const [busy, setBusy] = useState(false);
  const [panel, setPanel] = useState<'' | 'cancel' | 'link'>('');
  const [text, setText] = useState('');
  const partnerId = session.participantIds.find((id) => id !== me.uid)!;
  const partner = session.participants[partnerId];
  const mine = session.participants[me.uid];
  const started = Date.parse(session.startAt) <= Date.now();
  const upcoming = session.status === 'confirmed' && !started;
  const needsOutcome = session.status !== 'cancelled' && started && !session.outcomes[me.uid];
  const minutes = Math.round((Date.parse(session.endAt) - Date.parse(session.startAt)) / 60000);
  const event = sessionCalendarEvent(session, window.location.origin);

  const run = async (fn: () => Promise<{ session: BuddySession }>, done: string) => {
    setBusy(true);
    try {
      const { session: updated } = await fn();
      toast.success(done);
      setPanel('');
      setText('');
      onChange(updated);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const status = session.status === 'confirmed' && started ? 'completed' : session.status;
  const statusLabel = session.status === 'confirmed' ? (started ? 'Past' : 'Confirmed') : session.status === 'cancelled' ? `Cancelled${session.cancelledBy === me.uid ? ' by you' : ''}` : 'Done';

  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-black text-slate-900">{session.interviewType} with {partner.name}</p>
          <p className="text-sm text-slate-600">{formatSlot(session.startAt, me.timezone, minutes)}</p>
        </div>
        <StatusPill status={status} label={statusLabel} />
      </div>
      <div className="text-sm text-slate-700 space-y-1">
        <p><span className="font-bold text-slate-900">Your role:</span> {mine.role}</p>
        {session.status !== 'cancelled' && <p><span className="font-bold text-slate-900">{partner.name.split(' ')[0]}'s email:</span> {partner.email || 'sample buddy (no email)'}</p>}
        {session.topic && <p><span className="font-bold text-slate-900">Topic:</span> {session.topic}</p>}
        {session.notes && <p><span className="font-bold text-slate-900">Notes:</span> {session.notes}</p>}
        {session.cancelReason && <p><span className="font-bold text-slate-900">Reason:</span> {session.cancelReason}</p>}
      </div>

      {upcoming && (
        <>
          <div className="flex flex-wrap gap-2">
            <Button variant="brand" size="sm" asChild><a href={session.meetingUrl} target="_blank" rel="noreferrer"><Video className="size-4" /> Join call</a></Button>
            <Button variant="outline" size="sm" asChild><a href={googleCalendarLink(event)} target="_blank" rel="noreferrer"><CalendarPlus className="size-4" /> Add to Google Calendar</a></Button>
            <Button variant="outline" size="sm" onClick={() => downloadIcs(session)}><Download className="size-4" /> Calendar file (.ics)</Button>
            <Button variant="ghost" size="sm" onClick={() => setPanel(panel === 'link' ? '' : 'link')}><Link2 className="size-4" /> Use my own link</Button>
            <Button variant="ghost" size="sm" className="text-rose-700 hover:text-rose-800" onClick={() => setPanel(panel === 'cancel' ? '' : 'cancel')}><CalendarX className="size-4" /> Cancel</Button>
          </div>
          <p className="text-xs text-slate-500 break-all">Call link: {session.meetingUrl}</p>
          {panel === 'link' && (
            <div className="flex flex-wrap gap-2">
              <Input className="flex-1 min-w-56" value={text} onChange={(e) => setText(e.target.value)} placeholder="https://meet.google.com/abc-defg-hij" />
              <Button size="sm" variant="outline" disabled={busy} onClick={() => run(() => buddyApi.setMeetingLink(session.id, text), 'Call link updated. Tell your buddy, and re-add the calendar entry.')}>Save link</Button>
            </div>
          )}
          {panel === 'cancel' && (
            <div className="flex flex-wrap gap-2">
              <Input className="flex-1 min-w-56" value={text} onChange={(e) => setText(e.target.value)} maxLength={200} placeholder={`Optional: a short note for ${partner.name.split(' ')[0]}`} />
              <Button size="sm" variant="destructive" disabled={busy} onClick={() => run(() => buddyApi.cancelSession(session.id, text), `Cancelled. ${partner.name.split(' ')[0]} has been told.`)}>
                {busy && <Loader2 className="size-4 animate-spin" />} Cancel session
              </Button>
            </div>
          )}
        </>
      )}

      {needsOutcome && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 p-3">
          <span className="text-sm font-semibold text-slate-800 mr-1">Did it happen?</span>
          <Button size="sm" variant="outline" disabled={busy} onClick={() => run(() => buddyApi.markOutcome(session.id, 'happened'), 'Nice work! Book the next one while it is fresh.')}>Yes, we practised</Button>
          <Button size="sm" variant="ghost" disabled={busy} onClick={() => run(() => buddyApi.markOutcome(session.id, 'no_show'), 'Sorry about that. Thanks for telling us.')}>{partner.name.split(' ')[0]} didn't show</Button>
        </div>
      )}
      {session.outcomes[me.uid] && <p className="text-xs text-slate-500">You marked this as {session.outcomes[me.uid] === 'happened' ? 'done' : 'a no-show'}.</p>}
    </li>
  );
};

export const SessionsTab: React.FC<{ me: BuddyProfile }> = ({ me }) => {
  const [sessions, setSessions] = useState<BuddySession[] | null>(null);
  useEffect(() => {
    buddyApi.listSessions().then((d) => setSessions(d.sessions)).catch((err) => toast.error(err.message));
  }, []);
  if (!sessions) return <div className="py-10 text-center"><Loader2 className="size-6 animate-spin mx-auto text-brand-600" /></div>;

  const replace = (s: BuddySession) => setSessions((all) => all!.map((x) => (x.id === s.id ? s : x)));
  const now = Date.now();
  const upcoming = sessions.filter((s) => s.status === 'confirmed' && Date.parse(s.startAt) > now).reverse();
  const past = sessions.filter((s) => !upcoming.includes(s));

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-sm font-black text-slate-900">Upcoming</h2>
        {upcoming.length ? <ul className="space-y-3">{upcoming.map((s) => <SessionCard key={s.id} session={s} me={me} onChange={replace} />)}</ul>
          : <Panel><p className="text-sm text-slate-600">No sessions booked. Confirmed sessions show here with the call link and calendar buttons.</p></Panel>}
      </section>
      {past.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-black text-slate-900">Past and cancelled</h2>
          <ul className="space-y-3">{past.map((s) => <SessionCard key={s.id} session={s} me={me} onChange={replace} />)}</ul>
        </section>
      )}
    </div>
  );
};
