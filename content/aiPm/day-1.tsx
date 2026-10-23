import React, { useEffect, useState } from 'react';
import {
  Bot, Brain, Cpu, Sparkles, Layers, Lightbulb, Briefcase, CheckCircle, Target, Search, Loader2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../../components/auth/AuthModal';

// PM → AI PM, Day 1: what AI is (AI, ML, deep learning, GenAI), when to use which, an AI landscape map
// the learner fills in (reviewed by AI) and a 0–15 baseline self-score. Answers are kept in this browser only.

const STORAGE_KEY = 'aipm_day1_v1';

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">{children}</h4>
);

const Dot: React.FC = () => <div className="w-1.5 h-1.5 rounded-full bg-brand-300 mt-2 shrink-0" />;

const LAYERS = [
  { name: 'Artificial Intelligence (AI)', text: 'The broad field of intelligent computer systems', border: 'border-brand-200', bg: 'bg-brand-50/40', color: 'text-brand-800' },
  { name: 'Machine Learning (ML)', text: 'Learns patterns from data to make predictions or decisions', border: 'border-emerald-200', bg: 'bg-emerald-50/60', color: 'text-emerald-800' },
  { name: 'Deep Learning (DL)', text: 'Uses multi-layer neural networks to learn complex patterns', border: 'border-teal-200', bg: 'bg-teal-50/70', color: 'text-teal-800' },
  { name: 'Generative AI', text: 'Generates text, images, audio, code and other content', border: 'border-zinc-300', bg: 'bg-white', color: 'text-zinc-900' },
];

const CONCEPTS = [
  {
    icon: Bot,
    title: '1. Artificial Intelligence (AI)',
    definition: 'AI is the broad category. It includes systems that reason, perceive, plan, predict, or generate outputs.',
    example: 'A chess program chooses a move. It may use search and planning rather than learning from a large training dataset.',
  },
  {
    icon: Brain,
    title: '2. Machine Learning (ML)',
    definition: 'Instead of programming every rule explicitly, developers train a model on data so it can learn patterns.',
    example: 'A payment product predicts whether a transaction is fraudulent based on patterns in past transactions.',
    note: 'The model produces a prediction; the product decides what to do with it.',
  },
  {
    icon: Cpu,
    title: '3. Deep Learning (DL)',
    definition: 'A subset of ML that uses neural networks with multiple layers to learn complex representations from data.',
    example: 'A speech recognition system converts spoken audio into text.',
    note: 'Deep learning is especially useful for complex inputs such as language, images, audio, and video.',
  },
  {
    icon: Sparkles,
    title: '4. Generative AI (GenAI)',
    definition: 'AI that generates new content based on learned patterns and the input it receives.',
    example: 'An AI assistant drafts a customer support reply, summarizes a meeting, or generates code.',
    note: 'Many modern GenAI systems use large language models (LLMs), though generative AI also includes image, audio, and video models.',
  },
];

const DISTINCTION = [
  { tech: 'AI', question: 'Can a computer perform an intelligent task?', example: 'Chess-playing system' },
  { tech: 'ML', question: 'What pattern or outcome can it learn from data?', example: 'Fraud prediction' },
  { tech: 'DL', question: 'Can neural networks learn complex patterns?', example: 'Speech recognition' },
  { tech: 'GenAI', question: 'What can it generate?', example: 'Drafting a support response' },
];

const USE_CASES = [
  { label: 'Use case A', title: 'Order tracking', what: 'A user enters an order ID and sees its delivery status.', approach: 'Rules + APIs', why: 'The status is already stored in a database. Generative AI usually adds unnecessary uncertainty.' },
  { label: 'Use case B', title: 'Fraud detection', what: 'The system estimates whether a payment is suspicious.', approach: 'ML', why: 'A predictive model can learn patterns from historical transactions, with rules and human review added where appropriate.' },
  { label: 'Use case C', title: 'Customer support assistant', what: 'The user asks a question in natural language and receives an answer grounded in order and policy data.', approach: 'GenAI + retrieval/tools', why: 'The model interprets the question and generates a response, while APIs retrieve order data and enforce permissions.' },
];

const STARTER_MAP = [
  { product: 'Netflix', problem: 'Help users discover relevant content', approach: 'Recommendation systems, ML' },
  { product: 'Gmail', problem: 'Filter unwanted messages', approach: 'ML classification and rules' },
  { product: 'ChatGPT', problem: 'Answer questions and generate content', approach: 'Generative AI, LLMs' },
  { product: 'Google Maps', problem: 'Find routes and estimate travel times', approach: 'Search, optimization, ML and other systems' },
  { product: 'Spotify', problem: 'Discover music', approach: 'Recommendation systems, ML' },
];

const APPROACHES = [
  'Rules / traditional software',
  'Machine learning',
  'Deep learning',
  'Generative AI',
  'Combination of approaches',
  'Not sure yet',
];

const SKILLS = [
  'Explain AI vs ML vs deep learning vs GenAI',
  'Recognize when rules are better than AI',
  'Explain how ML learns patterns from data',
  'Explain what an LLM does at a high level',
  'Identify AI risks such as incorrect outputs and unreliable predictions',
];

const LEVELS = [
  '0 — I don’t know this yet',
  '1 — I’ve heard of it',
  '2 — I can explain it simply',
  '3 — I can apply it to a product decision',
];

const COMPLETION = [
  'Explain the four concepts in your own words.',
  'Map three real products to their likely AI approaches.',
  'Explain one situation where adding GenAI would be a bad product decision.',
  'Record your baseline score.',
];

interface MapRow { product: string; problem: string; approach: string }
interface Review {
  summary: string;
  products: { product: string; verdict: string; comment: string }[];
  misconceptions: string[];
  nextStep: string;
}
interface Day1State { map: MapRow[]; scores: (number | null)[]; done: boolean[]; review?: Review }

const emptyState = (): Day1State => ({
  map: [0, 1, 2].map(() => ({ product: '', problem: '', approach: '' })),
  scores: SKILLS.map(() => null),
  done: COMPLETION.map(() => false),
});

function loadState(): Day1State {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && Array.isArray(saved.map) && Array.isArray(saved.scores)) return { ...emptyState(), ...saved };
  } catch {}
  return emptyState();
}

const inputClass = 'w-full h-10 px-3 rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-200';

const VERDICT_STYLES: Record<string, string> = {
  Good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Partly right': 'bg-amber-50 text-amber-700 border-amber-200',
  Rethink: 'bg-rose-50 text-rose-700 border-rose-200',
};

export const AiPmDay1Content = () => {
  const { user } = useAuth();
  const [state, setState] = useState<Day1State>(loadState);
  const [reviewing, setReviewing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const score = state.scores.reduce<number>((sum, s) => sum + (s ?? 0), 0);
  const mapReady = state.map.every((r) => r.product.trim() && r.problem.trim() && r.approach);

  const setRow = (i: number, patch: Partial<MapRow>) =>
    setState((s) => ({ ...s, map: s.map.map((r, j) => (j === i ? { ...r, ...patch } : r)) }));

  const reviewMap = async () => {
    if (!user) { setAuthOpen(true); return; }
    if (!mapReady) { setError('Fill in all three products, the problem each solves, and an approach first.'); return; }
    setError(null);
    setReviewing(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/ai-pm/review-landscape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ map: state.map }),
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
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" redirectTo="/ai-pm/day/1" onSuccess={() => setAuthOpen(false)} />

      {/* Objective */}
      <section className="bg-brand-50/60 p-4 sm:p-5 rounded-2xl border border-brand-100 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-brand-600">Today’s objective</span>
        <p className="text-base font-black text-zinc-900 leading-relaxed">
          Understand AI, ML, deep learning, and generative AI well enough to explain the differences and identify where each is useful in a real product.
        </p>
        <p className="text-sm font-bold text-brand-700">By the end of today, you’ll have three outputs:</p>
        <ul className="space-y-1">
          {['A clear mental model of the AI landscape.', 'A map of real products and the AI techniques they use.', 'A baseline score of your current AI PM knowledge.'].map((o) => (
            <li key={o} className="flex gap-2 text-sm font-medium text-zinc-900"><CheckCircle className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />{o}</li>
          ))}
        </ul>
      </section>

      {/* Part 1: concepts */}
      <section className="space-y-3">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-brand-600" />
          Part 1 — Learn the concepts
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Think of AI as an umbrella of techniques that enable computers to perform tasks associated with intelligence, such as recognizing patterns, making predictions, understanding language, or generating content.
        </p>
        <div className={`rounded-2xl border-2 ${LAYERS[0].border} ${LAYERS[0].bg} p-3 sm:p-4`}>
          <p className={`text-xs font-black uppercase tracking-widest ${LAYERS[0].color}`}>{LAYERS[0].name}</p>
          <p className="text-[11px] font-bold text-zinc-500 mb-3">{LAYERS[0].text}</p>
          <div className={`rounded-2xl border-2 ${LAYERS[1].border} ${LAYERS[1].bg} p-3 sm:p-4`}>
            <p className={`text-xs font-black uppercase tracking-widest ${LAYERS[1].color}`}>{LAYERS[1].name}</p>
            <p className="text-[11px] font-bold text-zinc-500 mb-3">{LAYERS[1].text}</p>
            <div className={`rounded-2xl border-2 ${LAYERS[2].border} ${LAYERS[2].bg} p-3 sm:p-4`}>
              <p className={`text-xs font-black uppercase tracking-widest ${LAYERS[2].color}`}>{LAYERS[2].name}</p>
              <p className="text-[11px] font-bold text-zinc-500 mb-3">{LAYERS[2].text}</p>
              <div className={`rounded-2xl border-2 ${LAYERS[3].border} ${LAYERS[3].bg} p-3 sm:p-4`}>
                <p className={`text-xs font-black uppercase tracking-widest ${LAYERS[3].color}`}>{LAYERS[3].name}</p>
                <p className="text-[11px] font-bold text-zinc-500">{LAYERS[3].text}</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs font-bold text-zinc-500">
          A simplified mental model: generative AI often uses deep learning, but AI also includes techniques outside this hierarchy.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3.5">
        {CONCEPTS.map((c) => (
          <div key={c.title} className="bg-zinc-50/70 border border-zinc-200/70 p-4 rounded-xl space-y-3">
            <h3 className="font-black text-zinc-900 flex items-center gap-2"><c.icon className="w-5 h-5 text-brand-600" />{c.title}</h3>
            <p className="text-sm font-medium text-zinc-600 leading-relaxed">{c.definition}</p>
            <div>
              <Label>Product example</Label>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed italic">{c.example}</p>
            </div>
            {c.note && <p className="text-xs font-bold text-zinc-500 leading-relaxed">{c.note}</p>}
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-brand-600" />
          The distinction you must remember
        </h2>
        <div className="border border-zinc-200/70 rounded-xl overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <tr><th className="py-3 px-4">Technology</th><th className="py-3 px-4">Core question</th><th className="py-3 px-4">Example</th></tr>
            </thead>
            <tbody className="text-zinc-600">
              {DISTINCTION.map((d) => (
                <tr key={d.tech} className="border-t border-zinc-50 align-top">
                  <td className="py-3 px-4 font-black text-zinc-900">{d.tech}</td>
                  <td className="py-3 px-4">{d.question}</td>
                  <td className="py-3 px-4 italic">{d.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs font-bold text-zinc-500">These categories overlap. They are not four competing technologies.</p>
      </section>

      {/* Part 2: think like a PM */}
      <section className="space-y-3">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Briefcase className="text-brand-600" />
          Part 2 — Think like a Product Manager (10 minutes)
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">A PM shouldn’t ask only, “Can we use AI here?” Ask three questions:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5">
          {[
            { title: 'Problem', text: 'What user problem are we solving?' },
            { title: 'Approach', text: 'Do we need fixed rules, a predictive model, generative AI, or a combination?' },
            { title: 'Value and risk', text: 'Will this improve the user outcome enough to justify the cost, latency, and potential errors?' },
          ].map((q) => (
            <div key={q.title} className="p-4 bg-zinc-50/70 border border-zinc-200/70 rounded-xl space-y-1.5">
              <p className="font-black text-zinc-900 text-sm">{q.title}</p>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">{q.text}</p>
            </div>
          ))}
        </div>
        <p className="text-sm font-bold text-zinc-700">Consider an e-commerce app:</p>
        <div className="space-y-3">
          {USE_CASES.map((u) => (
            <div key={u.title} className="p-4 bg-zinc-50/70 border border-zinc-200/70 rounded-xl space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-black text-zinc-900 text-sm"><span className="text-zinc-400">{u.label} — </span>{u.title}</p>
                <span className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 text-[11px] font-black">{u.approach}</span>
              </div>
              <p className="text-sm font-medium text-zinc-600">{u.what}</p>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">{u.why}</p>
            </div>
          ))}
        </div>
        <p className="text-sm font-bold text-zinc-700 leading-relaxed italic border-l-4 border-brand-500 pl-4">
          PM takeaway: The best solution is not necessarily the most advanced AI solution. Use the simplest approach that reliably solves the problem.
        </p>
      </section>

      {/* Part 3: landscape map */}
      <section className="space-y-3">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Search className="text-brand-600" />
          Part 3 — Your first exercise: build an AI landscape map (15 minutes)
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Choose real products you know. Identify the user problem, the likely AI approach, and the value created. Here is a starter map:
        </p>
        <div className="border border-zinc-200/70 rounded-xl overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <tr><th className="py-3 px-4">Product</th><th className="py-3 px-4">User problem</th><th className="py-3 px-4">Likely approach</th></tr>
            </thead>
            <tbody className="text-zinc-600">
              {STARTER_MAP.map((r) => (
                <tr key={r.product} className="border-t border-zinc-50 align-top">
                  <td className="py-3 px-4 font-black text-zinc-900">{r.product}</td>
                  <td className="py-3 px-4">{r.problem}</td>
                  <td className="py-3 px-4">{r.approach}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs font-bold text-zinc-500">
          These products can use multiple techniques; the table identifies representative approaches, not their complete internal architectures.
        </p>

        <div className="bg-zinc-50/70 p-4 sm:p-5 rounded-xl border border-zinc-200/70 space-y-4">
          <div>
            <p className="font-black text-zinc-900">Your AI landscape map</p>
            <p className="text-xs font-medium text-zinc-500 mt-0.5">
              Pick three products you use at work, in daily life, or while building AI applications. It’s okay to be uncertain.
            </p>
          </div>
          {state.map.map((row, i) => (
            <div key={i} className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-2.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-600">Product {i + 1}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input className={inputClass} placeholder="Product name" value={row.product} onChange={(e) => setRow(i, { product: e.target.value })} aria-label={`Product ${i + 1} name`} />
                <input className={inputClass} placeholder="User problem solved" value={row.problem} onChange={(e) => setRow(i, { problem: e.target.value })} aria-label={`Product ${i + 1} user problem`} />
              </div>
              <div>
                <Label>Likely approach</Label>
                <div className="flex flex-wrap gap-1.5">
                  {APPROACHES.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setRow(i, { approach: a })}
                      className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-colors ${
                        row.approach === a ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:border-brand-300'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Part 4: baseline */}
      <section className="space-y-3">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <CheckCircle className="text-brand-600" />
          Part 4 — Baseline assessment (5 minutes)
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">Before moving on, score yourself honestly. This is your starting point, not an exam.</p>
        <div className="border border-zinc-200/70 rounded-xl p-4 space-y-4">
          <p className="font-black text-zinc-900 text-sm">Day 1 skills checklist</p>
          {SKILLS.map((skill, i) => (
            <div key={skill} className="space-y-1.5">
              <p className="text-sm font-bold text-zinc-800">{i + 1}. {skill}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {LEVELS.map((level, n) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setState((s) => ({ ...s, scores: s.scores.map((v, j) => (j === i ? n : v)) }))}
                    className={`text-left px-3 py-2 rounded-lg border text-xs font-bold transition-colors ${
                      state.scores[i] === n ? 'bg-brand-50 border-brand-400 text-brand-800' : 'bg-white border-zinc-200 text-zinc-600 hover:border-brand-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
            <p className="text-sm font-black text-zinc-900">Your baseline score</p>
            <p className="text-2xl font-black text-brand-600">{score} <span className="text-sm text-zinc-400">/ 15</span></p>
          </div>
        </div>
      </section>

      {/* Completion criteria */}
      <section className="bg-zinc-50/70 p-4 sm:p-5 rounded-xl border border-zinc-200/70 space-y-3">
        <h2 className="text-xl font-black text-zinc-900 flex items-center gap-3">
          <Lightbulb className="text-amber-500" />
          Day 1 completion criteria
        </h2>
        <p className="text-sm font-medium text-zinc-600">Before you finish today, make sure you can:</p>
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
          Your task now: Complete the landscape map and click <span className="text-brand-700">Review my landscape map</span>. AI will evaluate your reasoning and correct any misconceptions before you move to Day 2.
        </p>
        <button
          type="button"
          onClick={reviewMap}
          disabled={reviewing}
          className="h-11 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-black text-sm flex items-center gap-2"
        >
          {reviewing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {reviewing ? 'Reviewing…' : state.review ? 'Review again' : 'Review my landscape map'}
        </button>
        {!user && <p className="text-xs font-medium text-zinc-500">You’ll be asked to sign in first.</p>}
        {error && <p className="text-sm font-bold text-rose-600">{error}</p>}

        {state.review && (
          <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3">
            <p className="text-sm font-medium text-zinc-700 leading-relaxed">{state.review.summary}</p>
            {state.review.products.map((p) => (
              <div key={p.product} className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-black text-zinc-900 text-sm">{p.product}</p>
                  <span className={`px-2 py-0.5 rounded-md border text-[10px] font-black ${VERDICT_STYLES[p.verdict] || VERDICT_STYLES['Partly right']}`}>{p.verdict}</span>
                </div>
                <p className="text-xs font-medium text-zinc-600 leading-relaxed">{p.comment}</p>
              </div>
            ))}
            {state.review.misconceptions.length > 0 && (
              <div>
                <Label>Misconceptions to fix</Label>
                <div className="space-y-1.5">
                  {state.review.misconceptions.map((m) => (
                    <div key={m} className="flex gap-2 text-xs font-medium text-zinc-600 leading-relaxed"><Dot />{m}</div>
                  ))}
                </div>
              </div>
            )}
            {state.review.nextStep && <p className="text-xs font-bold text-brand-700">{state.review.nextStep}</p>}
          </div>
        )}
      </section>
    </div>
  );
};

export default AiPmDay1Content;
