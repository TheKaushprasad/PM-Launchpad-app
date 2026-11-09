import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle, Check, Eye, EyeOff, FileText, Lightbulb, Loader2, Palette, Pencil, Printer, RefreshCw, RotateCcw, Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { BriefMarkdown } from '../assignments/BriefMarkdown';
import { StrategyPrint, printStrategy, type PrintOptions } from './StrategyPrint';
import { strategyApi } from '../../lib/productStrategy/api';
import { styleById } from '../../lib/productStrategy/styles';
import {
  MAX_SECTION_CHARS, MAX_SECTION_REGENERATIONS, QUALITY_CHECKS, QUALITY_PASS,
  type StrategyRecord, type StrategySection,
} from '../../lib/productStrategy/types';

// Preview, edit and regenerate (FRD section 8). The layout matches the PDF. Edits save to the
// server 1.5 seconds after the last keystroke.

const CONFIDENCE_TONE: Record<string, string> = {
  High: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Medium: 'bg-amber-50 text-amber-800 border-amber-200',
  Low: 'bg-rose-50 text-rose-700 border-rose-200',
};
const ORIGIN_LABEL: Record<StrategySection['origin'], string> = { ai: 'AI draft', edited: 'Edited by you', regenerated: 'Regenerated' };

const scoreTone = (score: number) => (score >= 75 ? 'text-emerald-300' : score >= QUALITY_PASS ? 'text-amber-300' : 'text-rose-300');

const ScorePanel: React.FC<{ record: StrategyRecord; busyText: string }> = ({ record, busyText }) => {
  const q = record.quality;
  return (
    <section className="bg-[#043C2C] text-white rounded-2xl p-4 sm:p-5 space-y-3" aria-label="Strategy score">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-emerald-200">Strategy score</p>
          {q ? (
            <p className={`text-4xl font-black ${scoreTone(q.score)}`}>{q.score}<span className="text-base text-slate-300"> / 100</span></p>
          ) : (
            <p className="text-sm text-slate-200 flex items-center gap-2 pt-1">{busyText ? <><Loader2 className="size-4 animate-spin" /> {busyText}</> : 'Not scored yet'}</p>
          )}
        </div>
        {q && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-2 flex-1 min-w-[16rem] max-w-xl">
            {QUALITY_CHECKS.map(({ key, label }) => (
              <div key={key}>
                <div className="h-1.5 rounded-full bg-white/15 overflow-hidden"><div className="h-full bg-emerald-300" style={{ width: `${(q.checks[key] / 25) * 100}%` }} /></div>
                <p className="text-[11px] text-slate-200 mt-1"><span className="font-black text-white">{q.checks[key]}/25</span> {label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {q && q.tips.length > 0 && (
        <div className="rounded-xl bg-white/10 p-3 text-sm">
          <p className="font-bold flex items-center gap-1.5"><Lightbulb className="size-4 text-amber-300" /> To make it stronger</p>
          <ul className="list-disc pl-5 mt-1 space-y-0.5 text-slate-100">{q.tips.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      )}
      {q && busyText && <p className="text-xs text-slate-200 flex items-center gap-2"><Loader2 className="size-3.5 animate-spin" /> {busyText}</p>}
      {record.improved && !busyText && (
        <p className="text-xs text-slate-300">The first draft scored below {QUALITY_PASS}, so the weakest sections were rewritten once with the checker’s feedback.</p>
      )}
    </section>
  );
};

const SectionCard: React.FC<{
  section: StrategySection;
  canRegenerate: boolean;
  regenLeft: number;
  onEdit: (content: string) => void;
  onUndo: () => void;
  onToggleHidden: () => void;
  onRegenerate: (instruction: string) => Promise<void>;
}> = ({ section, canRegenerate, regenLeft, onEdit, onUndo, onToggleHidden, onRegenerate }) => {
  const [editing, setEditing] = useState(false);
  const [askRegen, setAskRegen] = useState(false);
  const [instruction, setInstruction] = useState('');
  const [working, setWorking] = useState(false);

  const regen = async () => {
    setWorking(true);
    try {
      await onRegenerate(instruction.trim());
      setAskRegen(false);
      setInstruction('');
    } finally {
      setWorking(false);
    }
  };

  return (
    <article className={`bg-white border rounded-2xl p-4 sm:p-5 space-y-3 ${section.hidden ? 'border-dashed border-slate-300 opacity-60' : 'border-slate-200/80'}`}>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-base sm:text-lg font-black text-slate-900 mr-auto">{section.title}</h3>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-black uppercase ${CONFIDENCE_TONE[section.confidence]}`} title="How much this rests on your inputs rather than assumptions">
          {section.confidence} confidence
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-600">{ORIGIN_LABEL[section.origin]}</span>
      </div>

      <p className="flex items-start gap-1.5 rounded-lg bg-brand-50/70 border border-brand-100 px-3 py-2 text-xs text-brand-900">
        <Lightbulb className="size-3.5 mt-0.5 shrink-0 text-brand-600" /> <span><span className="font-bold">Why it matters:</span> {section.whyItMatters}</span>
      </p>

      {editing ? (
        <div className="space-y-1.5">
          <Textarea value={section.content} maxLength={MAX_SECTION_CHARS} rows={10} className="max-h-[28rem] text-sm font-mono" onChange={(e) => onEdit(e.target.value)} aria-label={`Edit ${section.title}`} />
          <p className="text-[11px] text-slate-500">{section.content.length}/{MAX_SECTION_CHARS} · Use “- ” for bullets and **double stars** for bold.</p>
        </div>
      ) : (
        <BriefMarkdown source={section.content} assumptionPills />
      )}

      {askRegen && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2">
          <Label htmlFor={`regen-${section.key}`} className="text-xs font-bold">What should change? <span className="font-medium text-slate-400">(optional)</span></Label>
          <Input id={`regen-${section.key}`} value={instruction} maxLength={300} onChange={(e) => setInstruction(e.target.value)} placeholder="e.g. make it more specific to tier-2 cities" />
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="brand" onClick={regen} disabled={working}>{working ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />} Regenerate</Button>
            <Button size="sm" variant="ghost" onClick={() => setAskRegen(false)} disabled={working}>Cancel</Button>
            <span className="text-[11px] text-slate-500">{regenLeft} of {MAX_SECTION_REGENERATIONS} regenerations left for this strategy. No credit used.</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        <Button size="sm" variant={editing ? 'brand' : 'outline'} onClick={() => setEditing(!editing)}>
          {editing ? <><Check className="size-4" /> Done</> : <><Pencil className="size-4" /> Edit</>}
        </Button>
        <Button size="sm" variant="outline" disabled={!canRegenerate || regenLeft <= 0 || working} onClick={() => setAskRegen(true)} title={regenLeft <= 0 ? 'No regenerations left for this strategy' : undefined}>
          <RefreshCw className="size-4" /> Regenerate section
        </Button>
        {section.previous !== undefined && section.previous !== section.content && (
          <Button size="sm" variant="ghost" onClick={onUndo}><RotateCcw className="size-4" /> Undo</Button>
        )}
        <Button size="sm" variant="ghost" onClick={onToggleHidden}>
          {section.hidden ? <><Eye className="size-4" /> Show in PDF</> : <><EyeOff className="size-4" /> Hide from PDF</>}
        </Button>
      </div>
    </article>
  );
};

export const StrategyPreview: React.FC<{
  record: StrategyRecord;
  busyText: string;
  stepError: string;
  printOnOpen?: boolean;
  onChange: (record: StrategyRecord) => void;
  onRetry: () => void;
  onAnotherStyle: () => void;
  onNew: () => void;
}> = ({ record, busyText, stepError, printOnOpen, onChange, onRetry, onAnotherStyle, onNew }) => {
  const style = styleById(record.styleId);
  const [options, setOptions] = useState<PrintOptions>({ pageSize: 'A4', includeTips: false });
  const [saveState, setSaveState] = useState<'' | 'saving' | 'saved' | 'error'>('');
  const pending = useRef<ReturnType<typeof setTimeout>>();
  const latest = useRef(record);
  latest.current = record;
  const complete = record.status === 'generated';
  const regenLeft = MAX_SECTION_REGENERATIONS - (record.regenCount || 0);

  // Auto-save (FR-24): 1.5 seconds after the last change.
  const queueSave = (next: StrategyRecord) => {
    onChange(next);
    setSaveState('saving');
    clearTimeout(pending.current);
    pending.current = setTimeout(async () => {
      const r = latest.current;
      try {
        await strategyApi.save(r.id, { title: r.output.title, summary: r.output.summary, authorName: r.authorName, authorRole: r.authorRole, sections: r.output.sections });
        setSaveState('saved');
      } catch (err: any) {
        setSaveState('error');
        toast.error(err?.message || 'Could not save your edits. Check your connection.');
      }
    }, 1500);
  };
  useEffect(() => () => clearTimeout(pending.current), []);

  useEffect(() => {
    if (printOnOpen && complete) setTimeout(() => printStrategy(latest.current), 300);
  }, [printOnOpen, complete]);

  const setSection = (key: string, patch: (s: StrategySection) => StrategySection) =>
    queueSave({ ...record, output: { ...record.output, sections: record.output.sections.map((s) => (s.key === key ? patch(s) : s)) } });

  const edit = (key: string, content: string) =>
    setSection(key, (s) => ({ ...s, content, origin: 'edited', previous: s.origin === 'edited' && s.previous !== undefined ? s.previous : s.content }));

  const regenerate = async (key: string, instruction: string) => {
    clearTimeout(pending.current);
    try {
      const { strategy } = await strategyApi.regenerateSection(record.id, key, instruction, latest.current.output.sections);
      onChange({ ...strategy, authorName: latest.current.authorName, authorRole: latest.current.authorRole });
      toast.success('Section regenerated. Use Undo to go back.');
    } catch (err: any) {
      toast.error(err?.message || 'Could not regenerate that section.');
      throw err;
    }
  };

  const download = () => {
    if (saveState === 'saving') toast.message('Saving your last edit first…');
    printStrategy(latest.current);
  };

  return (
    <div className="space-y-4">
      <ScorePanel record={record} busyText={busyText} />

      {stepError && (
        <div className="flex items-start gap-3 rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-900">
          <AlertTriangle className="size-4 mt-0.5 shrink-0" />
          <div className="space-y-2">
            <p>{stepError}</p>
            <Button size="sm" variant="outline" onClick={onRetry}><RefreshCw className="size-4" /> Try again</Button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="brand" size="sm" onClick={download} disabled={!complete}><Printer className="size-4" /> Download PDF</Button>
        <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <input type="checkbox" className="size-4 accent-emerald-700" checked={options.includeTips} onChange={(e) => setOptions({ ...options, includeTips: e.target.checked })} /> Tips in PDF
        </label>
        <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          Page
          <select className="rounded-md border border-slate-300 bg-white px-1.5 py-1 text-xs" value={options.pageSize} onChange={(e) => setOptions({ ...options, pageSize: e.target.value as PrintOptions['pageSize'] })}>
            <option value="A4">A4</option><option value="Letter">US Letter</option>
          </select>
        </label>
        <span className="flex-1" />
        <Button variant="outline" size="sm" onClick={onAnotherStyle} disabled={Boolean(busyText)}><Palette className="size-4" /> Try another style</Button>
        <Button variant="ghost" size="sm" onClick={onNew} disabled={Boolean(busyText)}><FileText className="size-4" /> New strategy</Button>
      </div>
      <p className="text-[11px] text-slate-500 -mt-2">
        In the print window, pick “Save as PDF” as the printer. {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'All changes saved.' : saveState === 'error' ? 'Not saved: check your connection.' : ''}
      </p>

      <section className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
        <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">{style?.name}</p>
        <Input value={record.output.title} maxLength={140} onChange={(e) => queueSave({ ...record, output: { ...record.output, title: e.target.value } })} className="text-lg sm:text-xl font-black h-auto py-1.5" aria-label="Strategy title" />
        <Textarea value={record.output.summary} maxLength={800} rows={3} onChange={(e) => queueSave({ ...record, output: { ...record.output, summary: e.target.value } })} className="text-sm max-h-40" aria-label="Executive summary" />
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="aps-author" className="text-xs font-bold">Your name (for the PDF cover)</Label>
            <Input id="aps-author" value={record.authorName} maxLength={80} onChange={(e) => queueSave({ ...record, authorName: e.target.value })} placeholder="e.g. Priya Sharma" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="aps-role" className="text-xs font-bold">Your role</Label>
            <Input id="aps-role" value={record.authorRole} maxLength={80} onChange={(e) => queueSave({ ...record, authorRole: e.target.value })} placeholder="e.g. APM candidate" />
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Numbers marked <span className="rounded-full border border-amber-300 bg-amber-50 px-1.5 text-[10px] font-black uppercase text-amber-800">Assumption</span> were estimated by the AI, not taken from your inputs. Check or replace them before you submit.
        </p>
      </section>

      <div className="space-y-4">
        {record.output.sections.map((s) => (
          <SectionCard
            key={s.key}
            section={s}
            canRegenerate={complete && !busyText}
            regenLeft={regenLeft}
            onEdit={(c) => edit(s.key, c)}
            onUndo={() => setSection(s.key, (x) => ({ ...x, content: x.previous ?? x.content, previous: x.content, origin: 'edited' }))}
            onToggleHidden={() => setSection(s.key, (x) => ({ ...x, hidden: !x.hidden }))}
            onRegenerate={(instruction) => regenerate(s.key, instruction)}
          />
        ))}
        {!complete && (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-5 text-sm text-slate-500 flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" /> Writing the remaining sections…
          </div>
        )}
      </div>

      {record.output.metrics.length > 0 && (
        <section className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-2">
          <h3 className="font-black text-slate-900">Success metrics</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-slate-500 text-xs"><tr><th className="py-1.5 pr-3">Metric</th><th className="py-1.5 pr-3">Target</th><th className="py-1.5">Source</th></tr></thead>
              <tbody>
                {record.output.metrics.map((m) => (
                  <tr key={m.name} className="border-t border-slate-100">
                    <td className="py-2 pr-3 font-semibold text-slate-900">{m.name}</td>
                    <td className="py-2 pr-3">{m.target}</td>
                    <td className="py-2"><span className={`rounded-full border px-2 py-0.5 text-[10px] font-black uppercase ${m.type === 'Assumption' ? 'border-amber-300 bg-amber-50 text-amber-800' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>{m.type}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {record.output.assumptions.length > 0 && (
        <section className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-2">
          <h3 className="font-black text-slate-900">Assumptions and risks to test</h3>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">{record.output.assumptions.map((a) => <li key={a}>{a}</li>)}</ul>
        </section>
      )}

      {record.output.competitorTable.length > 0 && (
        <section className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-2">
          <h3 className="font-black text-slate-900">Competitors</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[36rem]">
              <thead className="text-slate-500 text-xs"><tr><th className="py-1.5 pr-3">Name</th><th className="py-1.5 pr-3">Strength</th><th className="py-1.5 pr-3">Gap</th><th className="py-1.5">Our angle</th></tr></thead>
              <tbody>
                {record.output.competitorTable.map((c) => (
                  <tr key={c.name} className="border-t border-slate-100 align-top">
                    <td className="py-2 pr-3 font-semibold text-slate-900">{c.name}</td><td className="py-2 pr-3">{c.strength}</td><td className="py-2 pr-3">{c.gap}</td><td className="py-2">{c.ourAngle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <p className="text-[11px] text-slate-400">{style?.credit}. Prompt {record.promptVersion}.</p>

      <StrategyPrint record={record} options={options} />
    </div>
  );
};
