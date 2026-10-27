import React, { useEffect, useState } from 'react';
import {
  Settings, TrendingUp, Sparkles, Scale, Compass, CheckCircle, Target, XCircle,
} from 'lucide-react';

// PM → AI PM, Day 2: rules vs predictive ML vs generative AI, deterministic vs probabilistic, a decision
// framework, and a 3-scenario quiz. Answers stay in this browser.

const STORAGE_KEY = 'aipm_day2_v1';

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">{children}</h4>
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

const COMPLETION = [
  'Explain rules vs. predictive ML vs. GenAI.',
  'Explain why AI output can be uncertain.',
  'Complete the three scenario questions.',
];

export const AI_PM_DAY2_TOPICS = [
  { id: 'objective', label: 'Today’s objective' },
  { id: 'three-ways', label: 'Three ways to solve a problem' },
  { id: 'deterministic', label: 'Probabilistic vs. deterministic' },
  { id: 'framework', label: 'A PM decision framework' },
  { id: 'scenarios', label: 'Choose the right approach' },
  { id: 'completion', label: 'Completion checklist' },
];

// Shown at the top of the day page, above the video.
export const AI_PM_DAY2_OBJECTIVE = { text: 'Learn when to use traditional software, predictive machine learning, or generative AI, and defend your choice like a Product Manager.', lead: 'By the end of today, you should be able to look at a product problem and answer: Do we actually need AI here?' };

interface Day2State {
  picks: (number | null)[];
  checked: boolean;
  done: boolean[];
}

const emptyState = (): Day2State => ({
  picks: SCENARIOS.map(() => null),
  checked: false,
  done: COMPLETION.map(() => false),
});

function loadState(): Day2State {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && Array.isArray(saved.picks)) return { ...emptyState(), ...saved };
  } catch {}
  return emptyState();
}

const h2Class = 'text-lg md:text-xl font-bold text-zinc-900 flex items-center gap-2.5 tracking-tight';

export const AiPmDay2Content = () => {
  const [state, setState] = useState<Day2State>(loadState);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const allPicked = state.picks.every((p) => p !== null);
  const correct = state.picks.filter((p, i) => p === SCENARIOS[i].answer).length;

  const pick = (i: number, n: number) =>
    setState((s) => ({ ...s, checked: false, picks: s.picks.map((p, j) => (j === i ? n : p)) }));

  return (
    <div className="space-y-6 md:space-y-7 text-left">
      <section id="three-ways" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Compass className="w-5 h-5 text-brand-600" />Three ways to solve a product problem</h2>
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

      <section id="deterministic" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Scale className="w-5 h-5 text-brand-600" />The critical concept: probabilistic vs. deterministic</h2>
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

      <section id="framework" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Target className="w-5 h-5 text-brand-600" />A PM decision framework</h2>
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

      <section id="scenarios" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><CheckCircle className="w-5 h-5 text-brand-600" />Your exercise: choose the right approach</h2>
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

    </div>
  );
};

export default AiPmDay2Content;
