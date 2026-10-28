import React, { useState } from 'react';
import { ChevronDown, ClipboardList, Loader2, Lock, MessageSquare, Shuffle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Chips } from './ui';
import { buddyApi } from './api';
import { feedbackScale, type BuddyFeedback, type BuddySessionView, type SessionKitView } from '../../lib/productBuddy/types';

// The session kit (the interviewer's question sheet) and the 3-question feedback form after the call.

const Section: React.FC<{ title: string; items: string[]; ordered?: boolean }> = ({ title, items, ordered }) => {
  if (!items.length) return null;
  const List = ordered ? 'ol' : 'ul';
  return (
    <div className="space-y-1">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{title}</p>
      <List className={`${ordered ? 'list-decimal' : 'list-disc'} pl-5 space-y-0.5 text-sm text-slate-700`}>
        {items.map((item) => <li key={item}>{item}</li>)}
      </List>
    </div>
  );
};

export const KitPanel: React.FC<{ kit: SessionKitView; canSwap: boolean; sessionId: string; onChange: (s: BuddySessionView) => void }> = ({ kit, canSwap, sessionId, onChange }) => {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const swap = async () => {
    setBusy(true);
    try {
      const { session } = await buddyApi.swapQuestion(sessionId);
      onChange(session);
      toast.success('New question drawn');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-xl border border-sky-200 bg-sky-50/60">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="w-full flex items-center gap-2 px-3 py-2.5 text-left">
        <ClipboardList className="size-4 text-sky-700 shrink-0" />
        <span className="flex-1 min-w-0 text-sm">
          <span className="font-black text-sky-900">Your interviewer kit</span>
          <span className="text-sky-800"> · the question you'll ask, follow-ups and a rubric. Don't share it before the call.</span>
        </span>
        <ChevronDown className={`size-4 text-sky-700 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-3 border-t border-sky-200 pt-3">
          <div>
            <p className="font-black text-slate-900">{kit.title}</p>
            <p className="text-xs text-slate-500">{kit.company} · {kit.difficulty}</p>
          </div>
          <div className="rounded-lg bg-white border border-slate-200 p-3 space-y-1">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Read this out</p>
            <p className="text-sm text-slate-800">{kit.readOut}</p>
          </div>
          {kit.context && <p className="text-xs text-slate-600"><span className="font-bold">Context for you:</span> {kit.context}</p>}
          <Section title="Hand out only if they ask" items={kit.handOutIfAsked} />
          {kit.curveball && <Section title="Throw in once, midway" items={[kit.curveball]} />}
          <Section title="Follow-up questions" items={kit.followUps} />
          <Section title="A strong answer covers" items={kit.strongAnswerCovers} ordered />
          <Section title="Score each 1 to 4" items={kit.rubric} />
          {canSwap && (
            <Button variant="outline" size="sm" onClick={swap} disabled={busy}>
              {busy ? <Loader2 className="size-4 animate-spin" /> : <Shuffle className="size-4" />} Draw a different question
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const FeedbackCard: React.FC<{ title: string; feedback: BuddyFeedback; giverRole: string }> = ({ title, feedback, giverRole }) => (
  <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 space-y-1.5 text-sm text-slate-700">
    <p className="font-black text-emerald-900 flex items-center gap-2"><MessageSquare className="size-4" /> {title}</p>
    <p><span className="font-bold text-slate-900">{feedbackScale(giverRole).label}:</span> {feedbackScale(giverRole).options[feedback.readiness - 1]}</p>
    <p><span className="font-bold text-slate-900">Did well:</span> {feedback.didWell}</p>
    <p><span className="font-bold text-slate-900">Work on next:</span> {feedback.toImprove}</p>
  </div>
);

export const FeedbackPanel: React.FC<{ session: BuddySessionView; me: string; partnerFirstName: string; canMarkNoShow: boolean; onChange: (s: BuddySessionView) => void; onNoShow: () => void }> = ({ session, me, partnerFirstName, canMarkNoShow, onChange, onNoShow }) => {
  const partnerId = session.participantIds.find((id) => id !== me)!;
  const scale = feedbackScale(session.participants[me].role);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [didWell, setDidWell] = useState('');
  const [toImprove, setToImprove] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    try {
      const { session: updated } = await buddyApi.giveFeedback(session.id, { readiness: (scale.options as readonly string[]).indexOf(readiness[0]) + 1, didWell, toImprove });
      onChange(updated);
      toast.success(`Thanks! ${partnerFirstName} has been told.`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      {session.feedbackForMe === 'locked' && (
        <p className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-900">
          <Lock className="size-4 shrink-0" /> {partnerFirstName} left you feedback. Share yours to read it.
        </p>
      )}
      {session.feedbackForMe && session.feedbackForMe !== 'locked' && <FeedbackCard title={`${partnerFirstName}'s feedback for you`} feedback={session.feedbackForMe} giverRole={session.participants[partnerId].role} />}

      {session.myFeedback ? (
        <p className="text-xs text-slate-500">You sent feedback to {partnerFirstName}.{!session.feedbackForMe && ` You'll see theirs once they send it.`}</p>
      ) : (
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-3">
          <p className="text-sm font-black text-slate-900">Feedback for {partnerFirstName} (3 quick questions)</p>
          <div className="space-y-2">
            <Label className="font-bold">1. {scale.question}</Label>
            <Chips<string> options={scale.options} value={readiness} onChange={setReadiness} multiple={false} />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`fb-well-${session.id}`} className="font-bold">2. One thing they did well</Label>
            <Textarea id={`fb-well-${session.id}`} value={didWell} onChange={(e) => setDidWell(e.target.value)} rows={2} maxLength={600} placeholder="e.g. Asked sharp clarifying questions before jumping in." />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`fb-improve-${session.id}`} className="font-bold">3. One thing to work on next</Label>
            <Textarea id={`fb-improve-${session.id}`} value={toImprove} onChange={(e) => setToImprove(e.target.value)} rows={2} maxLength={600} placeholder="e.g. Pick one user segment and go deep instead of listing five." />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="brand" size="sm" onClick={submit} disabled={busy || !readiness.length || !didWell.trim() || !toImprove.trim()}>
              {busy && <Loader2 className="size-4 animate-spin" />} Send feedback
            </Button>
            {canMarkNoShow && (
              <Button variant="ghost" size="sm" onClick={onNoShow} disabled={busy}>{partnerFirstName} didn't show</Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
