import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Circle, FileUp, History, Loader2, Plus, ShieldAlert, Sparkles, Trash2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ON_SITE_ASSIGNMENTS } from '../../data/assignments';
import { extractTextFromPdfBuffer } from '../../lib/pdfParser';
import { AGENTS, AGENT_LABELS, ITEM_TYPES, type Brief, type ItemType, type Run, type SolverInput } from '../../lib/assignmentSolver/types';
import { parseAssignment, runAgents, runCost, runTimeMs } from '../../lib/assignmentSolver/orchestrator';
import { deleteRun, formatSeconds, formatUsd, loadRuns, saveRun } from '../../lib/assignmentSolver/draft';
import { DraftReview } from './DraftReview';

// PM Assignment Solver: the user pastes a take-home assignment, approves what the Parser found,
// and five agents produce a first draft that the user reviews and edits. "AI drafts, the PM decides."
// Local-only for now (lib/featureFlags.ts).

const AgentPipeline: React.FC<{ run: Run }> = ({ run }) => (
  <ol className="grid grid-cols-5 gap-2">
    {AGENTS.map((agent, i) => {
      const status = run.agentStatus[agent];
      const Icon = status === 'done' ? CheckCircle2 : status === 'failed' ? XCircle : status === 'running' ? Loader2 : Circle;
      const tone =
        status === 'done' ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
          : status === 'failed' ? 'text-rose-600 bg-rose-50 border-rose-200'
            : status === 'running' ? 'text-amber-700 bg-amber-50 border-amber-200'
              : 'text-slate-400 bg-white border-slate-200';
      return (
        <li key={agent} className={`rounded-xl border px-2 py-2.5 text-center ${tone}`}>
          <Icon className={`size-4 mx-auto ${status === 'running' ? 'animate-spin' : ''}`} />
          <p className="text-[11px] sm:text-xs font-black mt-1">{i + 1}. {AGENT_LABELS[agent]}</p>
          <p className="text-[10px] sm:text-[11px] font-semibold capitalize">{status}</p>
        </li>
      );
    })}
  </ol>
);

const RunMeta: React.FC<{ run: Run }> = ({ run }) => (
  <p className="text-xs text-slate-500 font-semibold">
    {formatSeconds(runTimeMs(run))} of AI time · about {formatUsd(runCost(run))} of {formatUsd(run.costLimitUsd)} limit
    {run.loopCount > 0 && ` · Critic sent sections back ${run.loopCount} time${run.loopCount > 1 ? 's' : ''}`}
  </p>
);

// ---------- input screen ----------

const InputForm: React.FC<{ onStart: (input: SolverInput) => void; busy: boolean }> = ({ onStart, busy }) => {
  const [assignment, setAssignment] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [pdfName, setPdfName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const onPdf = async (file?: File) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return toast.error('That PDF is over 10 MB.');
    const text = await extractTextFromPdfBuffer(await file.arrayBuffer(), 5000);
    if (text.trim().length < 40) return toast.error('No text found in that PDF. It may be a scanned image; paste the text instead.');
    setAssignment(text.trim());
    setPdfName(file.name);
  };

  const useSample = (slug: string) => {
    const a = ON_SITE_ASSIGNMENTS.find((x) => x.slug === slug);
    if (!a) return;
    setAssignment(a.body.replace(/\*\*/g, ''));
    setCompany(a.company);
    setPdfName('');
  };

  const ready = assignment.trim().length >= 40 && company.trim().length > 0;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-5">
      <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs sm:text-sm text-amber-900">
        <ShieldAlert className="size-4 mt-0.5 shrink-0" />
        <p>Check the assignment isn't under an NDA before you paste it. The text is sent to Google's Gemini to draft the answer. Runs are saved only in this browser for 30 days, and you can delete them any time.</p>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label htmlFor="as-assignment" className="font-bold">Assignment</Label>
          <div className="flex items-center gap-2">
            <Select onValueChange={useSample}>
              <SelectTrigger className="h-8 text-xs w-48"><SelectValue placeholder="Try a sample brief" /></SelectTrigger>
              <SelectContent>
                {ON_SITE_ASSIGNMENTS.map((a) => <SelectItem key={a.slug} value={a.slug}>{a.company}: {a.title}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
              <FileUp className="size-4" /> PDF
            </Button>
            <input ref={fileRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => onPdf(e.target.files?.[0])} />
          </div>
        </div>
        <Textarea id="as-assignment" value={assignment} onChange={(e) => { setAssignment(e.target.value); setPdfName(''); }} rows={10} className="max-h-96" placeholder="Paste the take-home assignment here, or upload a text-based PDF (up to 10 pages)." />
        {pdfName && <p className="text-xs text-slate-500">Text read from {pdfName}. Check it looks right.</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="as-company" className="font-bold">Company</Label>
          <Input id="as-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Swiggy" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="as-deadline" className="font-bold">Deadline <span className="text-slate-400 font-medium">(optional)</span></Label>
          <Input id="as-deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="e.g. 72 hours, or 30 Oct" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="as-jd" className="font-bold">Job description <span className="text-slate-400 font-medium">(optional, helps the research)</span></Label>
        <Textarea id="as-jd" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={4} className="max-h-60" placeholder="Paste the job description so the draft fits the product area this role owns." />
      </div>

      <Button variant="brand" size="lg" disabled={!ready || busy} onClick={() => onStart({ assignment: assignment.trim(), company: company.trim(), jobDescription: jobDescription.trim(), deadline: deadline.trim() })}>
        {busy ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />} Read the assignment
      </Button>
    </div>
  );
};

// ---------- brief approval (human-in-the-loop 1) ----------

const BriefApproval: React.FC<{ brief: Brief; onApprove: (brief: Brief) => void; onCancel: () => void }> = ({ brief: initial, onApprove, onCancel }) => {
  const [brief, setBrief] = useState<Brief>(initial);
  const setItem = (id: string, patch: Partial<Brief['items'][number]>) =>
    setBrief((b) => ({ ...b, items: b.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) }));
  const removeItem = (id: string) => setBrief((b) => ({ ...b, items: b.items.filter((i) => i.id !== id) }));
  const addItem = () =>
    setBrief((b) => ({ ...b, items: [...b.items, { id: `Q${Math.max(0, ...b.items.map((i) => Number(i.id.slice(1)) || 0)) + 1}`, text: '', type: 'other' }] }));
  const setConstraint = (key: 'wordLimit' | 'format' | 'deadline', value: string) =>
    setBrief((b) => ({ ...b, constraints: { ...b.constraints, [key]: value } }));
  const items = brief.items.filter((i) => i.text.trim());

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-5">
      <div>
        <h2 className="text-lg font-black text-slate-900">Check what the Parser found</h2>
        <p className="text-sm text-slate-600">Fix anything it read wrong before the other agents start. Each question becomes one section of the draft.</p>
      </div>

      {brief.openQuestions.length > 0 && (
        <div className="rounded-xl bg-sky-50 border border-sky-200 p-3 text-sm text-sky-900 space-y-1">
          <p className="font-bold">Open questions to decide yourself</p>
          <ul className="list-disc pl-5 space-y-0.5">{brief.openQuestions.map((q) => <li key={q}>{q}</li>)}</ul>
          <p className="text-xs">If one changes the scope, edit or remove the questions below.</p>
        </div>
      )}

      <div className="space-y-3">
        {brief.items.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 p-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-500 w-8">{item.id}</span>
              <Select value={item.type} onValueChange={(v) => setItem(item.id, { type: v as ItemType })}>
                <SelectTrigger className="h-8 text-xs w-44"><SelectValue /></SelectTrigger>
                <SelectContent>{ITEM_TYPES.map((t) => <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>)}</SelectContent>
              </Select>
              <Button variant="ghost" size="icon-sm" className="ml-auto" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.id}`}>
                <Trash2 className="size-4" />
              </Button>
            </div>
            <Textarea value={item.text} onChange={(e) => setItem(item.id, { text: e.target.value })} rows={2} className="max-h-48 text-sm" />
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addItem}><Plus className="size-4" /> Add a question</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {([['wordLimit', 'Word limit'], ['format', 'Format'], ['deadline', 'Deadline']] as const).map(([key, label]) => (
          <div key={key} className="space-y-1.5">
            <Label className="text-xs font-bold">{label}</Label>
            <Input value={brief.constraints[key]} onChange={(e) => setConstraint(key, e.target.value)} placeholder="Not stated" />
          </div>
        ))}
      </div>
      {brief.constraints.deliverables.length > 0 && (
        <p className="text-sm text-slate-600"><span className="font-bold">Deliverables:</span> {brief.constraints.deliverables.join('; ')}</p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button variant="brand" size="lg" disabled={!items.length} onClick={() => onApprove({ ...brief, items })}>
          <CheckCircle2 className="size-4" /> Looks right, write the draft
        </Button>
        <Button variant="outline" size="lg" onClick={onCancel}>Start over</Button>
      </div>
      <p className="text-xs text-slate-500">This makes about {3 * items.length + 1} more AI calls (usually under $0.30) and takes 2 to 5 minutes.</p>
    </div>
  );
};

// ---------- page ----------

export const AssignmentSolver: React.FC = () => {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [run, setRun] = useState<Run | null>(null);
  const [history, setHistory] = useState<Run[]>(() => loadRuns());
  const busy = !!run && (run.status === 'parsing' || run.status === 'running');

  // Finished, failed and paused runs go into this browser's history.
  useEffect(() => {
    if (run && !busy) {
      saveRun(run);
      setHistory(loadRuns());
    }
  }, [run, busy]);

  const start = async (input: SolverInput) => {
    if (!user) return setAuthOpen(true);
    await parseAssignment(input, setRun);
  };

  const approve = async (brief: Brief) => {
    if (!run) return;
    await runAgents(run, brief, setRun);
  };

  const remove = (id: string) => {
    deleteRun(id);
    setHistory(loadRuns());
    if (run?.id === id) setRun(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" redirectTo="/tools/assignment-solver" onSuccess={() => setAuthOpen(false)} />

      <header className="space-y-2">
        <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">Career tool · local preview</p>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">PM Assignment Solver</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Five AI agents read your take-home assignment, research the company, pick a framework, write a first draft and grade it.
          <span className="font-bold text-slate-900"> AI drafts, the PM decides:</span> you edit every section and add your own insight before you submit.
        </p>
      </header>

      {run && (
        <div className="space-y-2">
          <AgentPipeline run={run} />
          <RunMeta run={run} />
        </div>
      )}

      {run?.status === 'failed' && (
        <div className="flex items-start gap-3 rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-900">
          <AlertTriangle className="size-4 mt-0.5 shrink-0" />
          <div className="space-y-2">
            <p>{run.error}</p>
            <div className="flex gap-2">
              {run.brief && run.agentStatus.parse === 'done' && (
                <Button size="sm" variant="outline" onClick={() => setRun({ ...run, status: 'awaiting-approval', error: undefined, agentStatus: { ...run.agentStatus, research: 'waiting', strategy: 'waiting', write: 'waiting', critique: 'waiting' } })}>
                  Back to the brief
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={() => setRun(null)}>Start over</Button>
            </div>
          </div>
        </div>
      )}

      {(!run || run.status === 'parsing' || (run.status === 'failed' && !run.brief)) && (
        <InputForm onStart={start} busy={run?.status === 'parsing'} />
      )}

      {run?.status === 'awaiting-approval' && run.brief && (
        <BriefApproval key={run.id} brief={run.brief} onApprove={approve} onCancel={() => setRun(null)} />
      )}

      {run?.status === 'running' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center text-sm text-slate-600 space-y-2">
          <Loader2 className="size-6 animate-spin mx-auto text-brand-600" />
          <p>The agents are working. This usually takes 2 to 5 minutes; keep this tab open.</p>
        </div>
      )}

      {run?.status === 'review' && <DraftReview run={run} onChange={setRun} onNew={() => setRun(null)} />}

      {history.length > 0 && !busy && (
        <section className="space-y-2">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2"><History className="size-4" /> Past runs (this browser, 30 days)</h2>
          <ul className="divide-y divide-slate-100 bg-white border border-slate-200/80 rounded-2xl">
            {history.map((h) => (
              <li key={h.id} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                <button className="text-left flex-1 min-w-0" onClick={() => setRun(h)}>
                  <span className="font-bold text-slate-900">{h.brief?.company || h.input.company}</span>
                  <span className="text-slate-500"> · {h.brief?.items.length || 0} questions · {h.status === 'review' ? 'draft ready' : h.status === 'failed' ? 'failed' : 'brief waiting'} · {new Date(h.createdAt).toLocaleDateString()}</span>
                </button>
                <span className="text-xs text-slate-400">{formatUsd(runCost(h))}</span>
                <Button variant="ghost" size="icon-sm" onClick={() => remove(h.id)} aria-label="Delete run"><Trash2 className="size-4" /></Button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default AssignmentSolver;
