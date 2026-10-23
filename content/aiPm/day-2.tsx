import React, { useEffect, useState } from 'react';
import {
  Settings, TrendingUp, Sparkles, Scale, Compass, CheckCircle, Lightbulb, Target, Loader2, XCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../../components/auth/AuthModal';

// PM → AI PM, Day 2: rules vs predictive ML vs generative AI, deterministic vs probabilistic, a decision
// framework, a 3-scenario quiz and a five-question feature analysis reviewed by AI. Answers stay in this browser.

const STORAGE_KEY = 'aipm_day2_v1';

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">{children}</h4>
);

const APPROACHES = [
  {
    icon: Settings,
    tone: 'bg-brand-50 text-brand-600',
    title: '1. Traditional software: follow rules',
    text: 'A developer defines the logic explicitly. Given the same inputs and system state, the software follows its programmed rules.',
    example: 'An e-commerce app calculates a 10% discount when the cart value exceeds ₹2,000.',
    best: 'Rules are clear, outcomes must be predictable, and the task is easy to express as logic.',
    limit: 'Rules become difficult to maintain when there are too many exceptions or ambiguous inputs.',
  },
  {
    icon: TrendingUp,
    tone: 'bg-sky-50 text-sky-600',
    title: '2. Predictive ML: estimate an outcome',
    text: 'A model learns patterns from historical data and estimates a label, score, probability, or numerical value.',
    example: 'A payment system estimates the probability that a transaction is fraudulent.',
    best: 'Historical data contains useful patterns, and the product needs to predict something not captured reliably by a few hand-written rules.',
    limit: 'Predictions can be wrong, data can become outdated, and performance can vary across users or situations.',
  },
  {
    icon: Sparkles,
    tone: 'bg-violet-50 text-violet-600',
    title: '3. Generative AI: understand and create',
    text: 'A generative model produces content such as text, code, images, or audio based on instructions and context.',
    example: 'A support assistant interprets “My order hasn’t arrived” and drafts a response using the customer’s order details.',
    best: 'Inputs are unstructured, users express themselves in many ways, or the desired output needs flexible language or content generation.',
    limit: 'Outputs can be incorrect, inconsistent, expensive, or slow. Important actions need appropriate validation and controls.',
  },
];

const CONTRAST = [
  { kind: 'Rule', text: 'If a customer has paid, mark the invoice as paid.', role: 'Enforces a known fact or policy', tone: 'text-brand-700 bg-brand-50' },
  { kind: 'Predictive ML', text: 'Estimate whether a customer is likely to churn.', role: 'Estimates an unknown outcome', tone: 'text-sky-700 bg-sky-50' },
  { kind: 'Generative AI', text: 'Explain why the customer may be frustrated and draft a retention message.', role: 'Generates a useful response', tone: 'text-violet-700 bg-violet-50' },
];

const FRAMEWORK = [
  { q: 'Can explicit rules solve the problem reliably?', a: 'Start with rules if the logic is clear, stable, and easy to maintain.' },
  { q: 'Do you need to predict an outcome from patterns in data?', a: 'Consider predictive ML when you have suitable data and can measure prediction quality.' },
  { q: 'Do you need to interpret unstructured inputs or generate flexible content?', a: 'Consider GenAI when flexibility creates enough user value to justify its risks and cost.' },
  { q: 'What happens if the system is wrong?', a: 'For high-impact decisions, consider verification, human review, permissions, fallbacks, and explicit decision thresholds.' },
];

const SCENARIOS = [
  {
    q: 'An online store must apply a fixed 15% discount to every eligible order.',
    options: ['Traditional rules', 'Predictive ML', 'Generative AI'],
    answer: 0,
    why: 'The logic is fixed and known in advance. A rule is exact, cheap, and easy to test; a model would only add uncertainty.',
  },
  {
    q: 'A lender wants to estimate the likelihood that an applicant will default, using historical repayment data.',
    options: ['Traditional rules only', 'Predictive ML', 'Generative AI'],
    answer: 1,
    why: 'This is an unknown outcome to estimate from patterns in historical data. Rules still matter for eligibility and regulation, and high-impact decisions need review and explainability.',
  },
  {
    q: 'A support tool must read a customer’s natural-language complaint and draft a helpful reply grounded in the company’s policies.',
    options: ['Traditional rules only', 'Predictive ML only', 'Generative AI with grounded context'],
    answer: 2,
    why: 'The input is unstructured and the output is flexible language, so GenAI fits. Grounding it in real policies and order data (retrieval and APIs) keeps answers accurate.',
  },
];

const FIVE_QUESTIONS = [
  { key: 'problem', label: 'Problem', hint: 'What user problem does it solve?' },
  { key: 'approach', label: 'Approach', hint: 'Rules, predictive ML, GenAI, or a combination?' },
  { key: 'why', label: 'Why', hint: 'Why is that approach better than the alternatives?' },
  { key: 'failure', label: 'Failure', hint: 'What happens if it makes a mistake?' },
  { key: 'metric', label: 'Metric', hint: 'What measurable user outcome should improve?' },
] as const;

const WORKED_EXAMPLE = [
  { label: 'Feature', text: 'An internal company knowledge assistant.' },
  { label: 'Problem', text: 'Employees waste time searching through SOPs and project documents.' },
  { label: 'Approach', text: 'GenAI plus retrieval, with document permissions enforced by the application.' },
  { label: 'Why', text: 'Employees ask questions in natural language, while answers need to be grounded in existing documents.' },
  { label: 'Failure', text: 'It cites the wrong document or exposes restricted information.' },
  { label: 'Metric', text: 'Time to find a correct answer, with access-control violations as a zero-tolerance guardrail.' },
];

const COMPLETION = [
  'Explain rules vs. predictive ML vs. GenAI.',
  'Explain why AI output can be uncertain.',
  'Complete the three scenario questions.',
  'Analyze one real product feature using the five questions.',
];

export const AI_PM_DAY2_TOPICS = [
  { id: 'objective', label: 'Today’s objective' },
  { id: 'three-ways', label: 'Three ways to solve a problem' },
  { id: 'deterministic', label: 'Probabilistic vs. deterministic' },
  { id: 'framework', label: 'A PM decision framework' },
  { id: 'scenarios', label: 'Choose the right approach' },
  { id: 'apply', label: 'Apply it to a product you know' },
  { id: 'completion', label: 'Completion checklist' },
];

type FeatureKey = 'feature' | (typeof FIVE_QUESTIONS)[number]['key'];
interface Review {
  summary: string;
  strengths: string[];
  gaps: string[];
  nextStep: string;
}
interface Day2State {
  picks: (number | null)[];
  checked: boolean;
  feature: Record<FeatureKey, string>;
  done: boolean[];
  review?: Review;
}

const emptyState = (): Day2State => ({
  picks: SCENARIOS.map(() => null),
  checked: false,
  feature: { feature: '', problem: '', approach: '', why: '', failure: '', metric: '' },
  done: COMPLETION.map(() => false),
});

function loadState(): Day2State {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && Array.isArray(saved.picks)) return { ...emptyState(), ...saved, feature: { ...emptyState().feature, ...saved.feature } };
  } catch {}
  return emptyState();
}

const fieldClass = 'w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-200';
const h2Class = 'text-lg md:text-xl font-bold text-zinc-900 flex items-center gap-2.5 tracking-tight';

export const AiPmDay2Content = () => {
  const { user } = useAuth();
  const [state, setState] = useState<Day2State>(loadState);
  const [reviewing, setReviewing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const allPicked = state.picks.every((p) => p !== null);
  const correct = state.picks.filter((p, i) => p === SCENARIOS[i].answer).length;
  const featureReady = Object.values(state.feature).every((v) => v.trim().length > 0);

  const pick = (i: number, n: number) =>
    setState((s) => ({ ...s, checked: false, picks: s.picks.map((p, j) => (j === i ? n : p)) }));
  const setField = (key: FeatureKey, value: string) =>
    setState((s) => ({ ...s, feature: { ...s.feature, [key]: value.slice(0, 600) } }));

  const reviewAnswers = async () => {
    if (!user) { setAuthOpen(true); return; }
    if (!allPicked || !featureReady) { setError('Answer the three scenarios and fill in all five questions for your feature first.'); return; }
    setError(null);
    setReviewing(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/ai-pm/review-feature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          scenarios: SCENARIOS.map((s, i) => ({ scenario: s.q, choice: s.options[state.picks[i] as number], expected: s.options[s.answer] })),
          feature: state.feature,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'The review failed. Please try again.');
      setState((s) => ({ ...s, review: data.review }));
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setReviewing(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-7 text-left">
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" redirectTo="/ai-pm/day/2" onSuccess={() => setAuthOpen(false)} />

      <section id="objective" className="scroll-mt-32 bg-brand-50/60 p-4 sm:p-5 rounded-2xl border border-brand-100 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">Today’s objective</span>
        <p className="text-base font-bold text-zinc-900 leading-relaxed">
          Learn when to use traditional software, predictive machine learning, or generative AI, and defend your choice like a Product Manager.
        </p>
        <p className="text-sm font-medium text-brand-800">
          By the end of today, you should be able to look at a product problem and answer: <span className="font-bold">Do we actually need AI here?</span>
        </p>
      </section>

      {/* Part 1 */}
      <section id="three-ways" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Compass className="w-5 h-5 text-brand-600" />Part 1 — Three ways to solve a product problem</h2>
        <div className="space-y-3">
          {APPROACHES.map((a) => (
            <div key={a.title} className="bg-white border border-zinc-200/80 p-4 rounded-xl space-y-3">
              <h3 className="font-bold text-zinc-900 flex items-center gap-2.5">
                <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${a.tone}`}><a.icon className="w-4 h-4" /></span>
                {a.title}
              </h3>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">{a.text}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label>Example</Label>
                  <p className="text-sm text-zinc-600 leading-relaxed italic">{a.example}</p>
                </div>
                <div>
                  <Label>Best when</Label>
                  <p className="text-sm text-zinc-600 leading-relaxed">{a.best}</p>
                </div>
                <div>
                  <Label>Limitation</Label>
                  <p className="text-sm text-zinc-600 leading-relaxed">{a.limit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Part 2 */}
      <section id="deterministic" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Scale className="w-5 h-5 text-brand-600" />Part 2 — The critical concept: probabilistic vs. deterministic</h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Traditional software is often deterministic: given the same inputs and state, it should produce the same result.
        </p>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Many ML systems are probabilistic in their predictions, and generative AI can produce different responses to the same prompt. However, AI is not always nondeterministic: inference settings, model versions, infrastructure, and system design all affect repeatability.
        </p>
        <p className="text-sm font-bold text-zinc-700">Consider this example:</p>
        <div className="space-y-2">
          {CONTRAST.map((c) => (
            <div key={c.kind} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 bg-zinc-50/70 border border-zinc-200/70 rounded-xl">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg w-fit shrink-0 ${c.tone}`}>{c.kind}</span>
              <p className="text-sm text-zinc-700 flex-1">{c.text}</p>
              <span className="text-xs font-semibold text-zinc-500 shrink-0">{c.role}</span>
            </div>
          ))}
        </div>
        <p className="text-sm font-bold text-zinc-700 leading-relaxed italic border-l-4 border-brand-500 pl-4">
          A PM should not let a language model invent whether an invoice was paid. The payment record should come from the system of record. GenAI may explain that record to the user, but it should not replace the source of truth.
        </p>
      </section>

      {/* Part 3 */}
      <section id="framework" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Target className="w-5 h-5 text-brand-600" />Part 3 — A PM decision framework</h2>
        <p className="text-zinc-600 font-medium leading-relaxed">Use this checklist before proposing AI. Which approach should you choose?</p>
        <ol className="space-y-2">
          {FRAMEWORK.map((f, i) => (
            <li key={f.q} className="flex gap-3 p-3 bg-zinc-50/70 border border-zinc-200/70 rounded-xl">
              <span className="w-7 h-7 rounded-lg bg-brand-50 text-brand-800 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <div>
                <p className="text-sm font-bold text-zinc-900">{f.q}</p>
                <p className="text-sm text-zinc-600 leading-relaxed mt-0.5">{f.a}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Real products often combine all three approaches. For example, an AI support assistant might use an LLM to understand a question, retrieval to find the relevant policy, rules to enforce permissions, and an API to retrieve the actual order status.
        </p>
      </section>

      {/* Part 4 */}
      <section id="scenarios" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><CheckCircle className="w-5 h-5 text-brand-600" />Part 4 — Your exercise: choose the right approach</h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          For each scenario, choose the primary approach you would start with. Assume the problem is as described; you can propose a combination if justified.
        </p>
        <div className="space-y-3">
          {SCENARIOS.map((s, i) => {
            const picked = state.picks[i];
            const right = picked === s.answer;
            return (
              <div key={s.q} className="border border-zinc-200/80 rounded-xl p-4 space-y-2.5">
                <p className="text-sm font-bold text-zinc-900">{i + 1}. {s.q}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.options.map((o, n) => {
                    const selected = picked === n;
                    const reveal = state.checked && selected;
                    return (
                      <button
                        key={o}
                        type="button"
                        onClick={() => pick(i, n)}
                        className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-colors ${
                          reveal
                            ? right ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800'
                            : selected ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:border-brand-300'
                        }`}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
                {state.checked && picked !== null && (
                  <p className={`text-xs leading-relaxed flex gap-1.5 ${right ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {right ? <CheckCircle className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                    <span><span className="font-bold">{right ? 'Good call.' : `Start with: ${s.options[s.answer]}.`}</span> {s.why}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={!allPicked}
            onClick={() => setState((s) => ({ ...s, checked: true }))}
            className="h-10 px-4 rounded-xl bg-zinc-900 hover:bg-black disabled:opacity-40 text-white text-sm font-semibold"
          >
            Check answers
          </button>
          {state.checked && <p className="text-sm font-bold text-zinc-700">{correct} / 3 match the expected starting point</p>}
          {!allPicked && <p className="text-xs text-zinc-500">Answer all three to check.</p>}
        </div>
      </section>

      {/* Part 5 */}
      <section id="apply" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Lightbulb className="w-5 h-5 text-brand-600" />Part 5 — Apply it to a product you know</h2>
        <p className="text-zinc-600 font-medium leading-relaxed">Choose a feature from a product you use or build. Here’s a worked example:</p>
        <div className="bg-zinc-50/70 border border-zinc-200/70 rounded-xl p-4">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
            {WORKED_EXAMPLE.map((w) => (
              <React.Fragment key={w.label}>
                <dt className="font-bold text-zinc-900">{w.label}</dt>
                <dd className="text-zinc-600">{w.text}</dd>
              </React.Fragment>
            ))}
          </dl>
        </div>

        <div className="border border-zinc-200/80 rounded-xl p-4 space-y-3">
          <p className="font-bold text-zinc-900">Your feature</p>
          <input className={fieldClass} placeholder="Feature (for example: Swiggy’s restaurant recommendations)" value={state.feature.feature} onChange={(e) => setField('feature', e.target.value)} aria-label="Feature" />
          {FIVE_QUESTIONS.map((q, i) => (
            <div key={q.key}>
              <label className="text-sm font-bold text-zinc-800" htmlFor={`d2-${q.key}`}>{i + 1}. {q.label}</label>
              <textarea id={`d2-${q.key}`} rows={2} className={`${fieldClass} mt-1 resize-y`} placeholder={q.hint} value={state.feature[q.key]} onChange={(e) => setField(q.key, e.target.value)} />
            </div>
          ))}
        </div>
      </section>

      {/* Completion */}
      <section id="completion" className="scroll-mt-32 bg-zinc-50/70 p-4 sm:p-5 rounded-xl border border-zinc-200/70 space-y-3">
        <h2 className={h2Class}><CheckCircle className="w-5 h-5 text-brand-600" />Day 2 completion checklist</h2>
        <div className="space-y-2">
          {COMPLETION.map((c, i) => (
            <label key={c} className="flex gap-2.5 items-start text-sm font-medium text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-brand-600"
                checked={!!state.done[i]}
                onChange={() => setState((s) => ({ ...s, done: s.done.map((v, j) => (j === i ? !v : v)) }))}
              />
              {c}
            </label>
          ))}
        </div>
      </section>

      {/* Review */}
      <section className="bg-brand-50/60 p-4 sm:p-5 rounded-xl border border-brand-100 space-y-3">
        <p className="text-sm font-bold text-zinc-800 leading-relaxed">
          Your next step: complete the exercise and click <span className="text-brand-700">Review my answers</span>. AI will assess your reasoning, not just whether you picked the expected technology.
        </p>
        <button
          type="button"
          onClick={reviewAnswers}
          disabled={reviewing}
          className="h-11 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold text-sm flex items-center gap-2"
        >
          {reviewing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {reviewing ? 'Reviewing…' : state.review ? 'Review again' : 'Review my answers'}
        </button>
        {!user && <p className="text-xs font-medium text-zinc-500">You’ll be asked to sign in first.</p>}
        {error && <p className="text-sm font-bold text-rose-600">{error}</p>}

        {state.review && (
          <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3">
            <p className="text-sm font-medium text-zinc-700 leading-relaxed">{state.review.summary}</p>
            {state.review.strengths.length > 0 && (
              <div>
                <Label>What you did well</Label>
                <ul className="space-y-1 text-sm text-zinc-600 list-disc pl-5">{state.review.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            )}
            {state.review.gaps.length > 0 && (
              <div>
                <Label>Sharpen this</Label>
                <ul className="space-y-1 text-sm text-zinc-600 list-disc pl-5">{state.review.gaps.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            )}
            {state.review.nextStep && <p className="text-xs font-bold text-brand-700">{state.review.nextStep}</p>}
          </div>
        )}
      </section>
    </div>
  );
};

export default AiPmDay2Content;
