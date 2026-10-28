import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, FlaskConical, Loader2, Search, Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Chips, Panel, PersonSummary } from './ui';
import { buddyApi } from './api';
import { formatSlot, formatWindows } from '../../lib/productBuddy/time';
import {
  DOMAINS, DURATIONS, INTERVIEW_TYPES, MAX_RECIPIENTS, SESSION_KIND_LABELS,
  type BuddyMatch, type BuddyProfile, type FindBuddyInput, type SessionKind,
} from '../../lib/productBuddy/types';

const pad = (n: number) => String(n).padStart(2, '0');
const tomorrow = () => {
  const d = new Date(Date.now() + 86400000);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const ANY_DOMAIN = 'any';

export const FindBuddy: React.FC<{ profile: BuddyProfile; onSent: () => void }> = ({ profile, onSent }) => {
  const [kind, setKind] = useState<SessionKind>('swap');
  const [interviewType, setInterviewType] = useState<string>(profile.interviewTypes[0] || INTERVIEW_TYPES[0]);
  const [domain, setDomain] = useState(ANY_DOMAIN);
  const [date, setDate] = useState(tomorrow());
  const [time, setTime] = useState('20:00');
  const [duration, setDuration] = useState<number>(45);
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<{ input: FindBuddyInput; matches: BuddyMatch[]; emptyReason?: string } | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [sending, setSending] = useState(false);

  const search = async () => {
    const start = new Date(`${date}T${time}`);
    if (Number.isNaN(start.getTime())) return toast.error('Pick a date and time.');
    const input: FindBuddyInput = { kind, interviewType, domain: domain === ANY_DOMAIN ? undefined : domain, startAt: start.toISOString(), durationMinutes: duration };
    setSearching(true);
    setPicked([]);
    try {
      setResult({ input, ...(await buddyApi.findMatches(input)) });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSearching(false);
    }
  };

  const togglePick = (uid: string) =>
    setPicked((p) => (p.includes(uid) ? p.filter((x) => x !== uid) : p.length >= MAX_RECIPIENTS ? (toast.info(`You can ask up to ${MAX_RECIPIENTS} people at once.`), p) : [...p, uid]));

  const send = async () => {
    if (!result) return;
    setSending(true);
    try {
      await buddyApi.sendRequest({ ...result.input, recipientIds: picked, topic, notes });
      toast.success(picked.length > 1 ? `Request sent to ${picked.length} people. The first to accept gets the session.` : 'Request sent');
      setResult(null);
      setPicked([]);
      setTopic('');
      setNotes('');
      onSent();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  const addSamples = async () => {
    try {
      const { added } = await buddyApi.addSampleBuddies();
      toast.success(`Added ${added} sample buddies, free every day 7 am–11 pm IST. Search again.`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <Panel className="space-y-5">
        <div className="space-y-2">
          <Label className="font-bold">Format</Label>
          <Chips options={['swap', 'be_interviewed', 'interview'] as const} value={[kind]} onChange={(v) => setKind(v[0])} multiple={false} labels={SESSION_KIND_LABELS} />
          <p className="text-xs text-slate-500">
            {kind === 'swap' ? 'One call, two halves: you interview each other. Easiest way to find a partner.'
              : kind === 'be_interviewed' ? 'Your buddy asks the questions and gives feedback.'
                : 'You run the interview and give feedback; good practice for thinking like an interviewer.'}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="font-bold">Interview type</Label>
            <Select value={interviewType} onValueChange={setInterviewType}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>{INTERVIEW_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="font-bold">Domain <span className="text-slate-400 font-medium">(optional)</span></Label>
            <Select value={domain} onValueChange={setDomain}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY_DOMAIN}>Any domain</SelectItem>
                {DOMAINS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pb-date" className="font-bold">Date</Label>
            <Input id="pb-date" type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pb-time" className="font-bold">Start time <span className="text-slate-400 font-medium">(your local time)</span></Label>
            <Input id="pb-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-2">
            <Label className="font-bold">Length</Label>
            <Chips options={DURATIONS.map(String) as string[]} value={[String(duration)]} onChange={(v) => setDuration(Number(v[0]))} multiple={false} labels={{ '45': '45 min', '60': '60 min' }} />
          </div>
          <Button variant="brand" onClick={search} disabled={searching}>
            {searching ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />} Find buddies
          </Button>
        </div>
      </Panel>

      {import.meta.env.DEV && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-violet-300 bg-violet-50 px-4 py-3 text-sm text-violet-900">
          <FlaskConical className="size-4 shrink-0" />
          <span className="flex-1 min-w-0">Local testing: add three sample buddies so you can try the whole flow with one account.</span>
          <Button size="sm" variant="outline" onClick={addSamples}>Add sample buddies</Button>
        </div>
      )}

      {result && result.matches.length === 0 && (
        <Panel className="text-center space-y-3">
          <p className="font-black text-slate-900">No buddy free for this slot yet</p>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">{result.emptyReason}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setResult(null)}>Try another time</Button>
            <Button variant="brand" size="sm" asChild>
              <Link to="/interview-studio"><Sparkles className="size-4" /> Practise with Priya now</Link>
            </Button>
          </div>
        </Panel>
      )}

      {result && result.matches.length > 0 && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-sm font-black text-slate-900">
              {result.matches.length} {result.matches.length === 1 ? 'buddy' : 'buddies'} free {formatSlot(result.input.startAt, profile.timezone, result.input.durationMinutes)}
            </h2>
            <p className="text-xs text-slate-500">Pick up to {MAX_RECIPIENTS}. The first to accept gets the session; the others are told it's filled.</p>
          </div>
          <ul className="grid md:grid-cols-2 gap-3">
            {result.matches.map(({ profile: p, reasons }) => {
              const on = picked.includes(p.uid);
              return (
                <li key={p.uid}>
                  <button
                    type="button"
                    onClick={() => togglePick(p.uid)}
                    aria-pressed={on}
                    className={`w-full text-left rounded-2xl border p-4 space-y-3 transition-colors ${on ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-200' : 'border-slate-200 bg-white hover:border-brand-300'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <PersonSummary profile={p} />
                      <CheckCircle2 className={`size-5 shrink-0 ${on ? 'text-brand-600' : 'text-slate-200'}`} />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {reasons.map((r) => <span key={r} className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-bold text-emerald-800">{r}</span>)}
                    </div>
                    <p className="text-xs text-slate-600"><span className="font-bold text-slate-800">Practises:</span> {p.interviewTypes.join(', ')}</p>
                    <p className="text-xs text-slate-600"><span className="font-bold text-slate-800">Usually free:</span> {formatWindows(p.availability)} ({p.timezone})</p>
                    {p.about && <p className="text-xs text-slate-600 italic">"{p.about}"</p>}
                  </button>
                </li>
              );
            })}
          </ul>

          {picked.length > 0 && (
            <Panel className="space-y-4 sticky bottom-4 shadow-lg">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pb-topic" className="font-bold">Question or topic <span className="text-slate-400 font-medium">(optional)</span></Label>
                  <Input id="pb-topic" value={topic} onChange={(e) => setTopic(e.target.value)} maxLength={200} placeholder="e.g. Improve onboarding for a fintech app" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pb-notes" className="font-bold">Note to your buddy <span className="text-slate-400 font-medium">(optional)</span></Label>
                  <Textarea id="pb-notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={1} maxLength={600} placeholder="e.g. Please push me on clarifying questions." />
                </div>
              </div>
              <Button variant="brand" onClick={send} disabled={sending}>
                {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                Send request to {picked.length} {picked.length === 1 ? 'person' : 'people'}
              </Button>
            </Panel>
          )}
        </div>
      )}
    </div>
  );
};
