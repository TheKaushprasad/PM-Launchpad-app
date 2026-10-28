import React, { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, ArrowLeft, Check, Loader2, PencilLine, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// Real interviews from invited testers (saved by server/interviewTesters.ts): read each one, mark Priya's
// replies right or rewrite them, add your own score and verdict, then turn it into eval cases
// (server/evalReview.ts). Everything stays on this computer; nothing here calls a model.

interface Row {
  id: string;
  email: string;
  createdAt: string;
  scenarioTitle: string;
  track: string;
  level: string;
  mode: string;
  turns: number;
  score: number | null;
  verdict: string | null;
  reviewStatus: 'draft' | 'done' | null;
  exportedAt: string | null;
}
interface TurnState { action: 'ok' | 'rewrite'; rewrite?: string; note?: string }

const VERDICTS = ['Strong Hire', 'Hire', 'No Hire', 'Strong No Hire'];
const fmtDate = (iso: string) =>
  iso ? new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-';

async function api(url: string, init?: RequestInit) {
  const r = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json' } });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || `HTTP ${r.status}`);
  return j;
}

const ErrorNote = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
    <AlertTriangle className="mt-0.5 size-4 shrink-0" />
    <span>{text}</span>
  </div>
);

function ReviewView({ id, onBack }: { id: string; onBack: () => void }) {
  const [doc, setDoc] = useState<any>(null);
  const [turns, setTurns] = useState<Record<number, TurnState>>({});
  const [score, setScore] = useState('');
  const [verdict, setVerdict] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'draft' | 'done' | null>(null);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api(`/api/admin/interviews/${id}`)
      .then(({ interview }) => {
        setDoc(interview);
        const r = interview.review;
        if (r) {
          setTurns(Object.fromEntries((r.turns || []).map((t: any) => [t.index, { action: t.action, rewrite: t.rewrite, note: t.note }])));
          setScore(typeof r.humanScore === 'number' ? String(r.humanScore) : '');
          setVerdict(r.humanVerdict || '');
          setNotes(r.notes || '');
          setStatus(r.status);
        }
      })
      .catch((e) => setError(e.message));
  }, [id]);

  if (error && !doc) return <ErrorNote text={error} />;
  if (!doc) return <Loader2 className="size-5 animate-spin text-slate-400" />;

  const messages: Array<{ role: string; text: string }> = doc.messages || [];
  const priyaTurns = messages.map((m, i) => (m.role === 'interviewer' && i > 0 ? i : -1)).filter((i) => i >= 0);
  const reviewed = priyaTurns.filter((i) => turns[i]).length;
  const setTurn = (i: number, t: TurnState | null) =>
    setTurns((prev) => {
      const next = { ...prev };
      if (t) next[i] = t;
      else delete next[i];
      return next;
    });

  const save = async (nextStatus: 'draft' | 'done') => {
    setBusy(nextStatus);
    setError('');
    setMessage('');
    try {
      const body = {
        status: nextStatus,
        turns: Object.entries(turns).map(([index, t]) => ({ index: Number(index), ...t })),
        humanScore: score === '' ? undefined : Number(score),
        humanVerdict: verdict || undefined,
        notes,
      };
      const { review } = await api(`/api/admin/interviews/${id}/review`, { method: 'PUT', body: JSON.stringify(body) });
      setStatus(review.status);
      setMessage(nextStatus === 'done' ? 'Review saved and marked done.' : 'Draft saved.');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy('');
    }
  };

  const makeCases = async () => {
    setBusy('export');
    setError('');
    setMessage('');
    try {
      const r = await api(`/api/admin/interviews/${id}/export`, { method: 'POST' });
      const made = [r.scoringCase ? '1 scoring case' : null, r.interviewerCases ? `${r.interviewerCases} interviewer case${r.interviewerCases === 1 ? '' : 's'}` : null].filter(Boolean);
      setMessage(`${made.length ? `Made ${made.join(' and ')}.` : 'No cases made.'} ${(r.skipped || []).join(' ')}`.trim());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy('');
    }
  };

  return (
    <div className="space-y-5">
      <Button variant="ghost" onClick={onBack}><ArrowLeft className="size-4" /> All interviews</Button>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-900">{doc.scenarioTitle || doc.scenarioId}</h2>
        <p className="text-sm text-slate-600">
          {doc.track} · {doc.level?.toUpperCase()} · {doc.mode} · {fmtDate(doc.createdAt)} · {doc.email}
        </p>
        <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Priya's scorecard: </span>
          {doc.evaluation ? `${doc.evaluation.overallScore ?? '-'} · ${doc.evaluation.verdict ?? doc.evaluation.status}` : 'not scored (scoring failed or the tester left early)'}
          {doc.evaluation?.transcriptSummary && <p className="mt-1 text-slate-600">{doc.evaluation.transcriptSummary}</p>}
        </div>
      </div>

      <p className="text-sm text-slate-600">
        For each of Priya's replies, mark it right or write what a real interviewer should have said. {reviewed}/{priyaTurns.length} reviewed.
      </p>

      <ol className="space-y-3">
        {messages.map((m, i) => {
          const isPriya = m.role === 'interviewer';
          const t = turns[i];
          return (
            <li key={i} className={`rounded-xl border p-3 text-sm ${isPriya ? 'border-emerald-200 bg-white' : 'border-slate-200 bg-slate-50'}`}>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {i + 1}. {isPriya ? 'Priya' : 'Candidate'}
                {isPriya && i === 0 && <span className="ml-2 normal-case font-normal">(scripted opener, not reviewed)</span>}
              </div>
              <p className={`whitespace-pre-wrap ${t?.action === 'rewrite' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{m.text}</p>
              {isPriya && i > 0 && (
                <div className="mt-2 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant={t?.action === 'ok' ? 'brand' : 'outline'} onClick={() => setTurn(i, t?.action === 'ok' ? null : { action: 'ok' })}>
                      <Check className="size-4" /> Looks right
                    </Button>
                    <Button
                      size="sm"
                      variant={t?.action === 'rewrite' ? 'brand' : 'outline'}
                      onClick={() => setTurn(i, t?.action === 'rewrite' ? null : { action: 'rewrite', rewrite: m.text })}
                    >
                      <PencilLine className="size-4" /> Rewrite
                    </Button>
                  </div>
                  {t?.action === 'rewrite' && (
                    <>
                      <Textarea
                        value={t.rewrite || ''}
                        onChange={(e) => setTurn(i, { ...t, rewrite: e.target.value })}
                        rows={3}
                        className="bg-white"
                        aria-label="What Priya should have said"
                      />
                      <Input
                        value={t.note || ''}
                        onChange={(e) => setTurn(i, { ...t, note: e.target.value })}
                        placeholder="Why (optional), e.g. she hinted at the answer"
                        className="bg-white"
                      />
                    </>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-slate-900">Your rating of the candidate</h3>
        <div className="flex flex-wrap gap-3">
          <Input type="number" min={0} max={100} value={score} onChange={(e) => setScore(e.target.value)} placeholder="Score 0-100" className="w-36" />
          <Select value={verdict} onValueChange={setVerdict}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Verdict" /></SelectTrigger>
            <SelectContent>{VERDICTS.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Notes for yourself (optional)" />
      </div>

      {error && <ErrorNote text={error} />}
      {message && <p className="text-sm text-emerald-700">{message}</p>}

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => save('draft')} disabled={!!busy}>
          {busy === 'draft' && <Loader2 className="size-4 animate-spin" />} Save draft
        </Button>
        <Button variant="brand" onClick={() => save('done')} disabled={!!busy}>
          {busy === 'done' && <Loader2 className="size-4 animate-spin" />} Mark review done
        </Button>
        <Button variant="outline" onClick={makeCases} disabled={!!busy || status !== 'done'} title={status !== 'done' ? 'Mark the review done first' : ''}>
          {busy === 'export' ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />} Make eval cases
        </Button>
      </div>
      <p className="text-xs text-slate-500">
        Eval cases are saved in eval/real/ on this computer (never uploaded to GitHub). Run them with{' '}
        <code>npm run eval -- --real --delay 15</code> (about ₹3 per interview) and <code>npm run eval:interviewer -- --real</code> (about ₹2–3 per rewritten reply).
      </p>
    </div>
  );
}

export function RealInterviews() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const load = useCallback(() => {
    setError('');
    api('/api/admin/interviews').then((j) => setRows(j.interviews)).catch((e) => setError(e.message));
  }, []);
  useEffect(load, [load]);

  if (selected) return <ReviewView id={selected} onBack={() => { setSelected(null); load(); }} />;
  if (error) return <ErrorNote text={error} />;
  if (!rows) return <Loader2 className="size-5 animate-spin text-slate-400" />;
  if (!rows.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
        No tester interviews yet. Add testers in the Testers tab; each interview they finish shows up here.
      </div>
    );
  }

  const done = rows.filter((r) => r.reviewStatus === 'done').length;
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600">{rows.length} interviews · {done} reviewed · {rows.filter((r) => r.exportedAt).length} turned into eval cases</p>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">When</th>
              <th className="px-3 py-2">Tester</th>
              <th className="px-3 py-2">Question</th>
              <th className="px-3 py-2">Priya's score</th>
              <th className="px-3 py-2">Your review</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.id} onClick={() => setSelected(r.id)} className="cursor-pointer hover:bg-slate-50">
                <td className="px-3 py-2 whitespace-nowrap text-slate-800">{fmtDate(r.createdAt)}</td>
                <td className="px-3 py-2 text-slate-700">{r.email}</td>
                <td className="px-3 py-2 text-slate-700">{r.scenarioTitle}<div className="text-xs text-slate-400">{r.track} · {r.level} · {r.mode} · {r.turns} turns</div></td>
                <td className="px-3 py-2 text-slate-700">{r.score ?? '-'} {r.verdict ? `· ${r.verdict}` : ''}</td>
                <td className="px-3 py-2 text-slate-700">
                  {r.exportedAt ? 'Eval cases made' : r.reviewStatus === 'done' ? 'Done' : r.reviewStatus === 'draft' ? 'Draft' : <span className="text-slate-400">Not started</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
