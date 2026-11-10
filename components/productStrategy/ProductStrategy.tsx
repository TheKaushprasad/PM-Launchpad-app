import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Copy, History, Loader2, Printer, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { Button } from '../ui/button';
import { ToolPaywall, ToolRunsBadge, useToolCredits } from '../payments/ToolPaywall';
import { StrategyForm } from './StrategyForm';
import { StrategyPreview } from './StrategyPreview';
import { ToolFeedbackCard } from '../feedback/ToolFeedbackCard';
import { StrategyApiError, newStrategyId, strategyApi } from '../../lib/productStrategy/api';
import { SAMPLE_INPUTS } from '../../lib/productStrategy/sample';
import { styleById } from '../../lib/productStrategy/styles';
import { EMPTY_INPUTS, HISTORY_LIMIT, QUALITY_PASS, type StrategyInputs, type StrategyRecord } from '../../lib/productStrategy/types';

// AI Product Strategy: learn a strategy framework by filling it in for your own product. The user
// answers a 4-step form, picks one of three framework styles, and gets a strategy where every
// section says why it matters, made-up numbers are labelled as assumptions, and a quality check
// scores it. They edit, regenerate sections and download a PDF.
// Local only for now (VITE_AI_PRODUCT_STRATEGY_ENABLED, lib/featureFlags.ts).

const DRAFT_KEY = 'aps_draft_v1';

function loadDraft(): { inputs: StrategyInputs; step: number } {
  try {
    const raw = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    if (raw?.inputs) return { inputs: { ...EMPTY_INPUTS, ...raw.inputs }, step: Math.min(3, Math.max(0, Number(raw.step) || 0)) };
  } catch { /* storage blocked or bad JSON */ }
  return { inputs: EMPTY_INPUTS, step: 0 };
}

export const ProductStrategy: React.FC = () => {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [{ inputs, step }, setDraft] = useState(loadDraft);
  const [draftSaved, setDraftSaved] = useState(false);
  const [record, setRecord] = useState<StrategyRecord | null>(null);
  const [busyText, setBusyText] = useState('');
  const [stepError, setStepError] = useState('');
  const [formError, setFormError] = useState('');
  const [paywall, setPaywall] = useState('');
  const [printOnOpen, setPrintOnOpen] = useState(false);
  const [history, setHistory] = useState<StrategyRecord[] | null>(null);
  const { credits, refresh: refreshCredits } = useToolCredits();
  const outOfRuns = credits?.strategy ? credits.strategy.freeLeft + credits.strategy.credits === 0 : false;
  const top = useRef<HTMLDivElement>(null);

  // Draft auto-save in this browser (FR-04, AC-02), shortly after each change.
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ inputs, step }));
        setDraftSaved(true);
      } catch { /* storage blocked */ }
    }, 800);
    return () => clearTimeout(t);
  }, [inputs, step]);

  const loadHistory = useCallback(() => {
    if (!user) return setHistory(null);
    strategyApi.list().then((r) => setHistory(r.strategies)).catch(() => setHistory([]));
  }, [user?.uid]);
  useEffect(() => { loadHistory(); }, [loadHistory]);

  const setInputs = (next: StrategyInputs) => setDraft((d) => ({ ...d, inputs: next }));
  const setStep = (next: number) => {
    setDraft((d) => ({ ...d, step: next }));
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /** Runs whatever is left for a strategy: the second part, the score, one rewrite if weak, re-score. */
  const finish = async (start: StrategyRecord) => {
    let r = start;
    setStepError('');
    try {
      while (r.status === 'partial') {
        setBusyText('Writing the remaining sections…');
        r = (await strategyApi.continue(r.id)).strategy;
        setRecord(r);
      }
      if (!r.quality) {
        setBusyText('Checking quality…');
        r = (await strategyApi.score(r.id)).strategy;
        setRecord(r);
      }
      if (r.quality && r.quality.score < QUALITY_PASS && !r.improved) {
        setBusyText(`Scored ${r.quality.score}/100. Rewriting the weakest sections once…`);
        r = (await strategyApi.improve(r.id)).strategy;
        setRecord(r);
        setBusyText('Checking quality again…');
        r = (await strategyApi.score(r.id)).strategy;
        setRecord(r);
      }
    } catch (err: any) {
      setStepError(`${err?.message || 'Something went wrong.'} Your strategy is saved; try this step again.`);
    } finally {
      setBusyText('');
      loadHistory();
    }
  };

  const generate = async () => {
    if (!user) return setAuthOpen(true);
    setFormError('');
    setPaywall('');
    setBusyText('Writing your strategy… this takes 20 to 40 seconds.');
    try {
      const id = newStrategyId();
      const { strategy } = await strategyApi.generate(id, inputs);
      setRecord(strategy);
      refreshCredits();
      top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      await finish(strategy);
    } catch (err: any) {
      setBusyText('');
      if (err instanceof StrategyApiError && err.paywall) setPaywall(err.message);
      else setFormError(err?.message || 'Something went wrong. Try again. No credit used.');
      refreshCredits();
    }
  };

  const open = (r: StrategyRecord, print = false) => {
    setRecord(r);
    setStepError('');
    setPrintOnOpen(print);
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (r.status === 'partial' || !r.quality) finish(r);
  };

  // Duplicate (FR-42) and "Regenerate in another style" (FR-10): copy the inputs into the form.
  const duplicate = (r: StrategyRecord, toStyleStep = false) => {
    setRecord(null);
    setDraft({ inputs: { ...EMPTY_INPUTS, ...r.inputs }, step: toStyleStep ? 3 : 0 });
    toast.success(toStyleStep ? 'Same inputs. Pick another style and generate (uses 1 credit).' : 'Inputs copied into a new draft.');
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const remove = async (r: StrategyRecord) => {
    if (!window.confirm(`Delete “${r.output.title}”? This cannot be undone.`)) return;
    try {
      await strategyApi.remove(r.id);
      if (record?.id === r.id) setRecord(null);
      loadHistory();
      toast.success('Strategy deleted.');
    } catch (err: any) {
      toast.error(err?.message || 'Could not delete it.');
    }
  };

  const generating = Boolean(busyText) && !record;

  return (
    <div ref={top} className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 scroll-mt-20">
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" redirectTo="/tools/ai-product-strategy" onSuccess={() => setAuthOpen(false)} />

      <header className="space-y-2">
        <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">Career tool · preview</p>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">AI Product Strategy</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Learn a real strategy framework by filling it in for your own product. Answer four short steps, pick a framework, and get a
          strategy where every section explains <span className="font-bold text-slate-900">why it matters</span>, made-up numbers are
          labelled as assumptions, and a quality check tells you what to improve. Got a take-home assignment instead? Use the{' '}
          <Link to="/tools/assignment-solver" className="font-semibold text-brand-700 underline underline-offset-2">PM Assignment Solver</Link>.
        </p>
        <ToolRunsBadge tool="strategy" credits={credits} />
      </header>

      {!record && (paywall || outOfRuns) && <ToolPaywall tool="strategy" message={paywall || undefined} />}

      {formError && !record && (
        <div className="flex items-start gap-3 rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-900">
          <AlertTriangle className="size-4 mt-0.5 shrink-0" /> <p>{formError}</p>
        </div>
      )}

      {generating && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center text-sm text-slate-600 space-y-2">
          <Loader2 className="size-6 animate-spin mx-auto text-brand-600" />
          <p>{busyText}</p>
          <p className="text-xs text-slate-400">Keep this tab open. If it closes, the strategy still shows up under My strategies.</p>
        </div>
      )}

      {!record && !generating && (
        <StrategyForm
          inputs={inputs}
          step={step}
          onChange={setInputs}
          onStep={setStep}
          onUseExample={() => { setDraft({ inputs: SAMPLE_INPUTS, step: 0 }); toast.success('Example filled in. Click through the steps or jump to Generate.'); }}
          onGenerate={generate}
          busy={Boolean(busyText)}
          signedIn={Boolean(user)}
          draftSaved={draftSaved}
        />
      )}

      {record && (
        <StrategyPreview
          key={record.id}
          record={record}
          busyText={busyText}
          stepError={stepError}
          printOnOpen={printOnOpen}
          onChange={setRecord}
          onRetry={() => finish(record)}
          onAnotherStyle={() => duplicate(record, true)}
          onNew={() => { setRecord(null); setDraft({ inputs: EMPTY_INPUTS, step: 0 }); }}
        />
      )}
      {record && record.status === 'generated' && !busyText && <ToolFeedbackCard key={record.id} tool="strategy" resultId={record.id} />}

      {user && history && history.length > 0 && !busyText && (
        <section className="space-y-2">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2"><History className="size-4" /> My strategies (last {HISTORY_LIMIT})</h2>
          <ul className="divide-y divide-slate-100 bg-white border border-slate-200/80 rounded-2xl">
            {history.map((h) => (
              <li key={h.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 text-sm">
                <button className="text-left flex-1 min-w-[12rem]" onClick={() => open(h)}>
                  <span className="font-bold text-slate-900">{h.output.title}</span>
                  <span className="block text-xs text-slate-500">
                    {styleById(h.styleId)?.name || h.styleId} · {new Date(h.createdAt).toLocaleDateString('en-IN')} · {h.quality ? `score ${h.quality.score}/100` : h.status === 'partial' ? 'unfinished' : 'not scored'}
                  </span>
                </button>
                <div className="flex items-center gap-0.5">
                  <Button variant="ghost" size="sm" onClick={() => open(h)}>Open</Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => duplicate(h)} aria-label="Duplicate" title="Duplicate inputs into a new draft"><Copy className="size-4" /></Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => open(h, true)} disabled={h.status !== 'generated'} aria-label="Download PDF" title="Download PDF"><Printer className="size-4" /></Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => remove(h)} aria-label="Delete" title="Delete"><Trash2 className="size-4" /></Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ProductStrategy;
