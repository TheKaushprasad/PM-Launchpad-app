import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, ClipboardCopy, Lightbulb, Loader2, RotateCcw, Sparkles, Target } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { BriefMarkdown } from '../assignments/BriefMarkdown';
import { EXAMPLE_PRD_MARKDOWN, EXAMPLE_PRD_TITLE } from '../../lib/prdCoach/examplePrd';
import { authJsonHeaders } from '../../lib/apiClient';
import { ToolFeedbackCard } from '../feedback/ToolFeedbackCard';
import { ToolPaywall, ToolRunsBadge, useToolCredits } from '../payments/ToolPaywall';
import {
  MIN_SECTION_CHARS, MIN_SECTIONS_FOR_REVIEW, PRD_SECTIONS, attemptedSections, emptySections, prdMarkdown,
  type PrdDraft, type PrdReview, type PrdSectionDef, type PrdSectionReview,
} from '../../lib/prdCoach/types';

// PRD Coach: the learner writes their own PRD in seven guided sections, the coach scores each one and
// says what to fix and why, and only then can they see an example PRD to compare with.
// "You write it, the coach reviews it." Live; VITE_PRD_COACH_ENABLED=false switches it off.

const STORAGE_KEY = 'prd_coach_v1';

interface Saved {
  draft: PrdDraft;
  review: PrdReview | null;
  reviewedText: string;
  example: string;
}

const blank = (): Saved => ({ draft: { idea: '', context: '', sections: emptySections() }, review: null, reviewedText: '', example: '' });

function load(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return blank();
    const s = JSON.parse(raw);
    const b = blank();
    return { ...b, ...s, draft: { ...b.draft, ...s.draft, sections: { ...b.draft.sections, ...s.draft?.sections } } };
  } catch {
    return blank();
  }
}

function save(s: Saved) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* storage full or blocked: the page still works, the draft just isn't kept */
  }
}

const SAMPLE_IDEAS = [
  'One-tap reorder of a weekly grocery basket for a quick-commerce app',
  'A savings goal feature inside a UPI payments app for first-time earners',
  'Helping first-time users of a food delivery app pick a restaurant faster',
];

/** A 402 from the server: this month's free review is used up. */
class PaywallError extends Error {}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`/api/prd-coach/${path}`, { method: 'POST', headers: await authJsonHeaders(), body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (res.status === 402) throw new PaywallError(data?.error || 'You have used your free PRD review for this month.');
  if (!res.ok) throw new Error(data?.error || `Something went wrong (HTTP ${res.status}).`);
  return data as T;
}

const scoreTone = (score: number) =>
  score >= 4 ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : score === 3 ? 'bg-amber-50 text-amber-800 border-amber-200'
      : 'bg-rose-50 text-rose-700 border-rose-200';

const verdictTone: Record<PrdReview['verdict'], string> = {
  'Interview-ready': 'text-emerald-300',
  'Getting there': 'text-amber-300',
  'Needs work': 'text-rose-300',
};

// ---------- one section ----------

const SectionCard: React.FC<{
  index: number;
  def: PrdSectionDef;
  value: string;
  onChange: (v: string) => void;
  review?: PrdSectionReview;
  stale: boolean;
}> = ({ index, def, value, onChange, review, stale }) => {
  const [showGuide, setShowGuide] = useState(false);
  const chars = value.trim().length;
  return (
    <section id={`prd-${def.key}`} className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-black text-slate-900">{index + 1}. {def.title}</h3>
          <p className="text-sm text-slate-500">{def.purpose}</p>
        </div>
        {review && (
          <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-black ${scoreTone(review.score)}`}>
            {review.score ? `${review.score}/5` : chars ? 'Not scored' : 'Empty'}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => setShowGuide((v) => !v)}
        className="flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-900"
        aria-expanded={showGuide}
      >
        <Lightbulb className="size-3.5" /> What good looks like
        <ChevronDown className={`size-3.5 transition-transform ${showGuide ? 'rotate-180' : ''}`} />
      </button>
      {showGuide && (
        <ul className="list-disc text-xs text-slate-600 space-y-1 bg-slate-50 rounded-xl p-3 pl-7">
          {def.goodLooksLike.map((g) => <li key={g}>{g}</li>)}
        </ul>
      )}

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={def.placeholder}
        className="min-h-32 text-sm"
        aria-label={def.title}
      />
      <p className="text-[11px] text-slate-400 font-semibold">
        {chars === 0 ? 'Not started' : chars < MIN_SECTION_CHARS ? 'Keep going: a few sentences at least' : `${chars} characters`}
      </p>

      {review && (
        <div className={`rounded-xl border p-3 space-y-2 text-sm ${stale ? 'border-slate-200 bg-slate-50/60 opacity-75' : 'border-brand-100 bg-brand-50/40'}`}>
          {review.works && (
            <p className="flex gap-2 text-slate-700"><CheckCircle2 className="size-4 mt-0.5 shrink-0 text-emerald-600" /><span><span className="font-bold">Works: </span>{review.works}</span></p>
          )}
          {review.fixes.length > 0 && (
            <ol className="space-y-2">
              {review.fixes.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className="size-5 shrink-0 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center mt-0.5">{i + 1}</span>
                  <span className="text-slate-800">
                    {f.fix}
                    {f.why && <span className="block text-xs text-slate-500 mt-0.5"><span className="font-bold">Why: </span>{f.why}</span>}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </section>
  );
};

// ---------- page ----------

export const PrdCoach: React.FC = () => {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [state, setState] = useState<Saved>(() => load());
  const [busy, setBusy] = useState<'review' | 'example' | null>(null);
  const [error, setError] = useState('');
  const [paywall, setPaywall] = useState('');
  // A ready-made example PRD anyone can open before writing (no AI call, no sign-in).
  const [showSample, setShowSample] = useState(false);
  // One free review a month (server/payments/catalog.ts); the badge shows what's left.
  const { credits, refresh: refreshCredits } = useToolCredits();
  const outOfRuns = credits?.signedIn && credits.prd ? credits.prd.freeLeft + credits.prd.credits === 0 : false;
  const { draft, review, example } = state;

  useEffect(() => save(state), [state]);

  const text = useMemo(() => prdMarkdown(draft), [draft]);
  const stale = !!review && text !== state.reviewedText;
  const attempted = attemptedSections(draft.sections).length;
  const canReview = draft.idea.trim().length >= 5 && attempted >= MIN_SECTIONS_FOR_REVIEW;

  const setDraft = (next: Partial<PrdDraft>) => setState((s) => ({ ...s, draft: { ...s.draft, ...next } }));
  const setSection = (key: keyof PrdDraft['sections'], v: string) =>
    setState((s) => ({ ...s, draft: { ...s.draft, sections: { ...s.draft.sections, [key]: v } } }));

  const runReview = async () => {
    if (!user) return setAuthOpen(true);
    setBusy('review');
    setError('');
    try {
      const { review: next } = await post<{ review: PrdReview }>('review', { draft });
      setState((s) => ({ ...s, review: next, reviewedText: prdMarkdown(s.draft) }));
      document.getElementById('prd-review')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e: any) {
      if (e instanceof PaywallError) setPaywall(e.message);
      else setError(e.message);
    } finally {
      setBusy(null);
      refreshCredits();
    }
  };

  const runExample = async () => {
    if (!user) return setAuthOpen(true);
    setBusy('example');
    setError('');
    try {
      const { markdown } = await post<{ markdown: string }>('example', { draft, reviewed: !!review });
      setState((s) => ({ ...s, example: markdown }));
    } catch (e: any) {
      if (e instanceof PaywallError) setPaywall(e.message);
      else setError(e.message);
    } finally {
      setBusy(null);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Your PRD is copied as Markdown.');
    } catch {
      toast.error('Could not copy. Select the text and copy it instead.');
    }
  };

  const startOver = () => {
    if (!window.confirm('Clear this PRD and its review? This cannot be undone.')) return;
    setState(blank());
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" redirectTo="/tools/prd-coach" onSuccess={() => setAuthOpen(false)} />

      <header className="space-y-2">
        <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">Career tool · beta</p>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">PRD Coach</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Write your own PRD, one section at a time. The coach scores each section, tells you what to fix and why, and then shows an example PRD to compare with.
          <span className="font-bold text-slate-900"> You write it, the coach reviews it</span>, so you can explain every line in an interview.
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button variant="outline" size="sm" onClick={() => setShowSample((v) => !v)} aria-expanded={showSample}>
            <BookOpen className="size-4" /> {showSample ? 'Hide the example PRD' : 'See an example PRD'}
          </Button>
          <ToolRunsBadge tool="prd" credits={credits} />
        </div>
        <p className="text-xs text-slate-500">You get one free review a month, so write all seven sections before you ask for it.</p>
      </header>

      {showSample && (
        <section id="prd-sample" className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">Example PRD</p>
              <h2 className="text-lg font-black text-slate-900">{EXAMPLE_PRD_TITLE}</h2>
              <p className="text-sm text-slate-500">See what each of the seven sections looks like when it's done well, then write your own for your idea. Numbers marked as assumptions are made up for the example.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowSample(false)}>Close</Button>
          </div>
          <div className="prose-sm text-slate-800 border-t border-slate-100 pt-3">
            <BriefMarkdown source={EXAMPLE_PRD_MARKDOWN} />
          </div>
        </section>
      )}

      {(paywall || (outOfRuns && !review)) && <ToolPaywall tool="prd" message={paywall || undefined} onClose={paywall ? () => setPaywall('') : undefined} />}

      {/* The idea */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="prd-idea" className="font-black text-slate-900">What are you writing a PRD for?</Label>
          <Input id="prd-idea" value={draft.idea} onChange={(e) => setDraft({ idea: e.target.value })} placeholder="e.g. One-tap reorder of a weekly grocery basket for a quick-commerce app" />
          {!draft.idea && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-xs text-slate-500 font-semibold py-1">Need an idea?</span>
              {SAMPLE_IDEAS.map((idea) => (
                <button key={idea} type="button" onClick={() => setDraft({ idea })} className="text-xs rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 text-slate-700 text-left">
                  {idea}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="prd-context" className="font-bold text-slate-700">Context (optional)</Label>
          <Textarea id="prd-context" value={draft.context} onChange={(e) => setDraft({ context: e.target.value })} placeholder="Company, the role you're applying for, or the assignment brief. The coach uses it to judge fit." className="min-h-20 text-sm" />
        </div>
      </section>

      {/* Review summary */}
      {review && (
        <section id="prd-review" className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 space-y-3 scroll-mt-20">
          <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
            <p className="text-4xl font-black">{review.overall}<span className="text-lg text-slate-400">/100</span></p>
            <p className={`text-base font-black ${verdictTone[review.verdict]}`}>{review.verdict}</p>
          </div>
          {review.summary && <p className="text-sm text-slate-200 leading-relaxed">{review.summary}</p>}
          {review.topPriority && (
            <p className="flex gap-2 text-sm bg-white/10 rounded-xl p-3">
              <Target className="size-4 mt-0.5 shrink-0 text-emerald-300" />
              <span><span className="font-black">Fix this first: </span>{review.topPriority}</span>
            </p>
          )}
          <div className="flex flex-wrap gap-1.5">
            {review.sections.map((s) => {
              const def = PRD_SECTIONS.find((d) => d.key === s.key)!;
              return (
                <a key={s.key} href={`#prd-${s.key}`} className="text-xs font-bold rounded-full bg-white/10 hover:bg-white/20 px-2.5 py-1">
                  {def.title} · {s.score ? `${s.score}/5` : draft.sections[s.key].trim() ? 'not scored' : 'empty'}
                </a>
              );
            })}
          </div>
          {stale && <p className="text-xs text-amber-200 font-semibold">You've edited the PRD since this review. Review it again to see your new score.</p>}
        </section>
      )}

      {/* Sections */}
      <div className="space-y-4">
        {PRD_SECTIONS.map((def, i) => (
          <SectionCard
            key={def.key}
            index={i}
            def={def}
            value={draft.sections[def.key]}
            onChange={(v) => setSection(def.key, v)}
            review={review?.sections.find((s) => s.key === def.key)}
            stale={stale}
          />
        ))}
      </div>

      {error && <p className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-900">{error}</p>}

      {/* Actions */}
      <div className="sticky bottom-3 z-10 bg-white/95 backdrop-blur border border-slate-200 rounded-2xl p-3 shadow-md flex flex-wrap items-center gap-2">
        <Button variant="brand" onClick={runReview} disabled={!canReview || !!busy}>
          {busy === 'review' ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          {review ? 'Review again' : 'Review my PRD'}
        </Button>
        <Button variant="outline" onClick={runExample} disabled={!review || !canReview || !!busy} title={review ? '' : 'Get a review first'}>
          {busy === 'example' ? <Loader2 className="size-4 animate-spin" /> : <BookOpen className="size-4" />}
          {example ? 'New example for my idea' : 'Example for my idea'}
        </Button>
        <Button variant="ghost" onClick={copy} disabled={!attempted}><ClipboardCopy className="size-4" /> Copy</Button>
        <Button variant="ghost" onClick={startOver} disabled={!!busy}><RotateCcw className="size-4" /> Start over</Button>
        <p className="text-xs text-slate-500 font-semibold w-full sm:w-auto sm:ml-auto">
          {canReview ? `${attempted} of 7 sections written` : `Add the idea and write at least ${MIN_SECTIONS_FOR_REVIEW} sections to get a review (${attempted} so far)`}
        </p>
      </div>

      {/* Optional feedback on the review (skippable) */}
      {review && !busy && <ToolFeedbackCard key={review.reviewedAt} tool="prd" resultId={review.reviewedAt} />}

      {/* Example */}
      {example && (
        <section className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-3">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900">Example PRD for your idea</h2>
            <p className="text-sm text-slate-500">Written by AI for the same idea. Compare it with yours section by section, then improve your own in your words. Numbers marked (assumption) are not real data.</p>
          </div>
          <div className="prose-sm text-slate-800">
            <BriefMarkdown source={example} />
          </div>
        </section>
      )}
    </div>
  );
};

export default PrdCoach;
