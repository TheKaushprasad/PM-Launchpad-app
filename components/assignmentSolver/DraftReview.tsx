import React, { useRef, useState } from 'react';
import { AlertTriangle, BookOpen, Check, ClipboardCopy, Download, ExternalLink, FileText, Loader2, Pencil, Printer, RefreshCw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { BriefMarkdown } from '../assignments/BriefMarkdown';
import { PASS_SCORE, RUBRIC, type Run, type Section, type SectionReview } from '../../lib/assignmentSolver/types';
import { regenerateSection, rescoreSection, runCost, runTimeMs } from '../../lib/assignmentSolver/orchestrator';
import { countInsightTags, draftMarkdown, formatSeconds, formatUsd, highlightInsightTags, linkCitations, runEditRatio } from '../../lib/assignmentSolver/draft';

// Review screen (human-in-the-loop 2): the draft with the Critic's score next to each section,
// inline editing, one-section regeneration, the sources panel, and export.

const ORIGIN_LABEL: Record<Section['origin'], { text: string; tone: string }> = {
  ai: { text: 'AI draft', tone: 'bg-violet-50 text-violet-700 border-violet-200' },
  edited: { text: 'Edited by you', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  regenerated: { text: 'Regenerated', tone: 'bg-sky-50 text-sky-700 border-sky-200' },
};

const scoreTone = (avg: number) => (avg >= 4 ? 'bg-emerald-600' : avg >= PASS_SCORE ? 'bg-amber-500' : 'bg-rose-600');

const ScoreCard: React.FC<{ review?: SectionReview }> = ({ review }) => {
  if (!review) return null;
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2 text-xs">
      <div className="grid grid-cols-5 gap-1.5">
        {RUBRIC.map(({ key, label }) => (
          <div key={key} className="text-center">
            <p className="text-base font-black text-slate-900">{review.scores[key]}</p>
            <p className="text-[11px] text-slate-500 leading-tight">{label}</p>
          </div>
        ))}
      </div>
      {review.feedback && <p className="text-slate-700"><span className="font-bold">Critic:</span> {review.feedback}</p>}
      {review.flags.length > 0 && (
        <div className="text-rose-800">
          <p className="font-bold flex items-center gap-1"><AlertTriangle className="size-3.5" /> Claims to check</p>
          <ul className="list-disc pl-5">{review.flags.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
      )}
    </div>
  );
};

const SectionCard: React.FC<{ run: Run; section: Section; onChange: (run: Run) => void }> = ({ run, section, onChange }) => {
  const item = run.brief?.items.find((i) => i.id === section.itemId);
  const review = run.reviews?.find((r) => r.itemId === section.itemId);
  const strategy = run.strategy?.find((s) => s.itemId === section.itemId);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(section.markdown);
  const [note, setNote] = useState('');
  const [showScores, setShowScores] = useState(false);
  const [working, setWorking] = useState<'' | 'regen' | 'rescore'>('');
  const stale = section.origin === 'edited' && review && !working;

  const saveEdit = () => {
    setEditing(false);
    if (text === section.markdown) return;
    onChange({ ...run, sections: run.sections!.map((s) => (s.itemId === section.itemId ? { ...s, markdown: text, origin: 'edited' } : s)) });
  };

  const act = async (kind: 'regen' | 'rescore') => {
    setWorking(kind);
    try {
      const next = kind === 'regen' ? await regenerateSection(run, section.itemId, note, onChange) : await rescoreSection(run, section.itemId, onChange);
      if (kind === 'regen') {
        setText(next.sections!.find((s) => s.itemId === section.itemId)!.markdown);
        setNote('');
      }
    } catch (err: any) {
      toast.error(err?.message || 'That did not work. Please try again.');
    } finally {
      setWorking('');
    }
  };

  return (
    <article className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
      <header className="flex items-start gap-3">
        <div className="flex-1 min-w-0 space-y-1">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{section.itemId} · {item?.type}</p>
          <h3 className="text-base sm:text-lg font-black text-slate-900">{section.title}</h3>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${ORIGIN_LABEL[section.origin].tone}`}>{ORIGIN_LABEL[section.origin].text}</span>
            {strategy && <span className="text-[11px] font-semibold text-slate-500" title={strategy.frameworkReason}>Framework: {strategy.framework}</span>}
          </div>
        </div>
        {review && (
          <button onClick={() => setShowScores((v) => !v)} className={`shrink-0 rounded-xl px-3 py-1.5 text-white text-center ${scoreTone(review.average)}`} title="Critic score: click for details">
            <span className="block text-lg font-black leading-none">{review.average.toFixed(1)}</span>
            <span className="block text-[11px] font-bold opacity-90">/ 5 Critic</span>
          </button>
        )}
      </header>

      {item && <p className="text-xs text-slate-500 italic line-clamp-2">Question: {item.text}</p>}
      {(showScores || (review && !review.passed)) && <ScoreCard review={review} />}
      {stale && <p className="text-xs text-amber-700">You edited this section; the score is for the earlier text.</p>}

      {editing ? (
        <div className="space-y-2">
          <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={16} className="font-mono text-xs max-h-[32rem]" />
          <div className="flex gap-2">
            <Button size="sm" variant="brand" onClick={saveEdit}><Check className="size-4" /> Save</Button>
            <Button size="sm" variant="outline" onClick={() => { setText(section.markdown); setEditing(false); }}>Cancel</Button>
          </div>
        </div>
      ) : (
        <BriefMarkdown source={highlightInsightTags(linkCitations(section.markdown, run.research))} />
      )}

      {!editing && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <Button size="sm" variant="outline" onClick={() => { setText(section.markdown); setEditing(true); }} disabled={!!working}>
            <Pencil className="size-4" /> Edit
          </Button>
          {section.origin === 'edited' && (
            <Button size="sm" variant="outline" onClick={() => act('rescore')} disabled={!!working}>
              {working === 'rescore' ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />} Score my edit
            </Button>
          )}
          <div className="flex flex-1 min-w-[14rem] gap-2">
            <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder='Optional note, e.g. "make it more data-driven"' className="h-8 text-xs" />
            <Button size="sm" variant="outline" onClick={() => act('regen')} disabled={!!working}>
              {working === 'regen' ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />} Regenerate
            </Button>
          </div>
        </div>
      )}
      {section.origin === 'edited' && !editing && <p className="text-[11px] text-slate-400">Regenerating replaces your edits in this section only.</p>}
    </article>
  );
};

const SourcesPanel: React.FC<{ run: Run }> = ({ run }) => {
  const r = run.research;
  if (!r) return null;
  return (
    <aside className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-3 lg:sticky lg:top-6 lg:max-h-[calc(100dvh-3rem)] lg:overflow-y-auto">
      <h2 className="text-sm font-black text-slate-900 flex items-center gap-2"><BookOpen className="size-4" /> Research and sources</h2>
      {r.productArea && <p className="text-xs text-slate-600"><span className="font-bold">Product area:</span> {r.productArea}</p>}
      {r.competitors.length > 0 && <p className="text-xs text-slate-600"><span className="font-bold">Competitors:</span> {r.competitors.join(', ')}</p>}
      <p className="text-[11px] text-slate-500">Every fact below came from a web search result. Open the source before you rely on it in your submission.</p>
      <ul className="space-y-2.5">
        {r.facts.map((f) => (
          <li key={f.id} className="text-xs text-slate-700">
            <span className="font-black text-slate-900">[{f.id}]</span> {f.text}
            <span className="block text-[11px] text-slate-400 capitalize">{f.category} · {f.confidence} confidence · found {f.retrievedAt}</span>
            <span className="flex flex-wrap gap-x-2">
              {f.sourceIds.map((id) => {
                const s = r.sources.find((x) => x.id === id);
                return s ? (
                  <a key={id} href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-[11px] text-brand-700 font-semibold underline inline-flex items-center gap-0.5">
                    {s.title} <ExternalLink className="size-3" />
                  </a>
                ) : null;
              })}
            </span>
          </li>
        ))}
        {!r.facts.length && <li className="text-xs text-slate-500">The Researcher found no sourced facts, so the draft relies on marked assumptions.</li>}
      </ul>
    </aside>
  );
};

export const DraftReview: React.FC<{ run: Run; onChange: (run: Run) => void; onNew: () => void }> = ({ run, onChange, onNew }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const sections = run.sections || [];
  const reviews = run.reviews || [];
  const average = reviews.length ? reviews.reduce((s, r) => s + r.average, 0) / reviews.length : 0;
  const editPct = Math.round(runEditRatio(run) * 100);
  const insightTags = countInsightTags(run);
  const markdown = draftMarkdown(run);
  const fileBase = `${(run.brief?.company || 'assignment').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-draft`;

  const warnTags = () => insightTags > 0 && toast.warning(`${insightTags} [ADD YOUR INSIGHT] tag${insightTags > 1 ? 's are' : ' is'} still in the draft. Replace ${insightTags > 1 ? 'them' : 'it'} with your own experience before you submit.`);

  const downloadMd = () => {
    const url = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: `${fileBase}.md` });
    a.click();
    URL.revokeObjectURL(url);
    warnTags();
  };

  // Rich text pastes into Google Docs with headings, lists, tables and links intact.
  const copyForDocs = async () => {
    try {
      const html = printRef.current?.innerHTML || '';
      await navigator.clipboard.write([
        new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }), 'text/plain': new Blob([markdown], { type: 'text/plain' }) }),
      ]);
      toast.success('Copied. Open a new Google Doc (docs.new) and paste.');
    } catch {
      await navigator.clipboard.writeText(markdown).catch(() => {});
      toast.success('Copied as Markdown.');
    }
    warnTags();
  };

  const print = () => {
    warnTags();
    window.print();
  };

  return (
    <div className="space-y-4">
      <style>{`@media print { body * { visibility: hidden !important; } #solver-print, #solver-print * { visibility: visible !important; } #solver-print { display: block !important; position: absolute; inset: 0 auto auto 0; width: 100%; padding: 24px; } }`}</style>

      <div className="bg-[#043C2C] text-white rounded-2xl p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div><p className="text-2xl font-black">{average.toFixed(1)}<span className="text-sm text-slate-300"> / 5</span></p><p className="text-[11px] text-slate-300 font-bold">Average Critic score</p></div>
        <div><p className="text-2xl font-black">{editPct}%</p><p className="text-[11px] text-slate-300 font-bold">Text you changed {editPct < 20 ? '(add more of you)' : editPct > 50 ? '(heavy rewrite)' : '(healthy)'}</p></div>
        <div><p className="text-2xl font-black">{formatUsd(runCost(run))}</p><p className="text-[11px] text-slate-300 font-bold">Estimated AI cost</p></div>
        <div><p className="text-2xl font-black">{formatSeconds(runTimeMs(run))}</p><p className="text-[11px] text-slate-300 font-bold">AI time, {run.logs.length} calls</p></div>
      </div>

      {run.error && <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">{run.error}</p>}
      {insightTags > 0 && (
        <p className="text-xs text-violet-800 bg-violet-50 border border-violet-200 rounded-xl p-3">
          {insightTags} <span className="font-bold">⟨ADD YOUR INSIGHT⟩</span> spot{insightTags > 1 ? 's' : ''} marked where your own experience will make the answer stand out. Edit those sections before you submit.
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button variant="brand" size="sm" onClick={copyForDocs}><ClipboardCopy className="size-4" /> Copy for Google Docs</Button>
        <Button variant="outline" size="sm" onClick={print}><Printer className="size-4" /> Save as PDF</Button>
        <Button variant="outline" size="sm" onClick={downloadMd}><Download className="size-4" /> Markdown</Button>
        <Button variant="ghost" size="sm" onClick={onNew}><FileText className="size-4" /> New assignment</Button>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem] gap-4 items-start">
        <div className="space-y-4">
          {sections.map((s) => <SectionCard key={`${s.itemId}-${s.aiMarkdown.length}`} run={run} section={s} onChange={onChange} />)}
        </div>
        <SourcesPanel run={run} />
      </div>

      <details className="text-xs text-slate-500">
        <summary className="cursor-pointer font-bold">Run log ({run.logs.length} steps)</summary>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left">
            <thead><tr className="text-slate-400"><th className="pr-3">Agent</th><th className="pr-3">Item</th><th className="pr-3">Model</th><th className="pr-3">Tokens in/out</th><th className="pr-3">Searches</th><th className="pr-3">Cost</th><th className="pr-3">Time</th><th>Status</th></tr></thead>
            <tbody>
              {run.logs.map((l, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="pr-3">{l.agent}</td><td className="pr-3">{l.itemId || '-'}</td><td className="pr-3">{l.model || '-'}</td>
                  <td className="pr-3">{l.inputTokens}/{l.outputTokens}</td><td className="pr-3">{l.searches}</td><td className="pr-3">{formatUsd(l.costUsd)}</td>
                  <td className="pr-3">{formatSeconds(l.latencyMs)}</td><td className={l.status === 'failed' ? 'text-rose-600' : ''}>{l.status}{l.error ? `: ${l.error}` : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      {/* Clean copy for print and Google Docs: no scores or labels. */}
      <div id="solver-print" ref={printRef} className="hidden">
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{run.brief?.company || run.input.company}: {run.brief?.role || 'Product Manager'} assignment</h1>
        <BriefMarkdown source={markdown.replace(/^# .*\n+/, '')} />
      </div>
    </div>
  );
};
