import React, { useEffect, useState } from 'react';
import {
  Tag, Shapes, Repeat, Sparkles, Compass, CheckCircle, Lightbulb, Target, Loader2, XCircle, Info, Flag,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../../components/auth/AuthModal';

// PM → AI PM, Day 3: supervised, unsupervised and reinforcement learning, worked product examples, a 4-question
// quiz and a mini product brief reviewed by AI. Answers stay in this browser.

const STORAGE_KEY = 'aipm_day3_v1';

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">{children}</h4>
);

const OBJECTIVES = [
  'Explain supervised, unsupervised, and reinforcement learning in simple language.',
  'Identify the type of learning behind common product features.',
  'Choose an appropriate approach based on the problem, available data, and business outcome.',
];

const TYPES = [
  {
    icon: Tag,
    tone: 'bg-brand-50 text-brand-600',
    title: '1. Supervised learning',
    tagline: 'Learn from labelled examples',
    text: 'The model learns from examples where the correct answer is already known.',
    example: 'A fraud detection system learns from historical transactions labelled as fraudulent or legitimate.',
    question: 'Do we have enough reliable historical examples with known outcomes?',
  },
  {
    icon: Shapes,
    tone: 'bg-sky-50 text-sky-600',
    title: '2. Unsupervised learning',
    tagline: 'Find patterns without labels',
    text: 'The model looks for structure or patterns in data without being given the correct answer for every example.',
    example: 'Grouping customers into behavioural segments based on their product usage.',
    question: 'What patterns might help us make better product decisions, and how will we validate their usefulness?',
  },
  {
    icon: Repeat,
    tone: 'bg-violet-50 text-violet-600',
    title: '3. Reinforcement learning',
    tagline: 'Learn through rewards and feedback',
    text: 'The system learns which actions to take by trying them and receiving rewards or penalties based on what happens next.',
    example: 'A notification system learns when to send a nudge. Each send is an action, and the reward is whether the user stays active over the following weeks, not just whether they tap.',
    question: 'Can we define a meaningful reward, safely explore alternatives, and measure long-term outcomes?',
  },
];

const PROBLEMS = [
  { name: 'Problem A: Predict fraudulent orders', setup: 'Historical orders are labelled as fraudulent or legitimate.', approach: 'Likely approach: supervised learning (classification).' },
  { name: 'Problem B: Discover customer segments', setup: 'You have browsing and purchasing data, but no predefined customer groups.', approach: 'Likely approach: unsupervised learning (clustering).' },
  { name: 'Problem C: Choose which offer to show at checkout', setup: 'The system tries different offers, and the reward is repeat purchases over the next 30 days rather than a single click.', approach: 'Potential approach: reinforcement learning, tested carefully because every poor choice reaches a real customer.' },
];

const TYPE_OPTIONS = ['Supervised learning', 'Unsupervised learning', 'Reinforcement learning'];

const QUIZ = [
  {
    q: 'You have 100,000 past support tickets labelled by their correct category. You want to classify new tickets.',
    answer: 0,
    why: 'Every past ticket already has the correct category, so the model can learn from labelled examples. This is classification.',
  },
  {
    q: 'You want to discover groups of users with similar usage patterns, but no segments have been defined yet.',
    answer: 1,
    why: 'There are no labels to learn from. The goal is to find structure in the data, which is clustering.',
  },
  {
    q: 'A streaming app wants to learn which reminder to send each user, and counts it as a success when the user keeps watching over the next few weeks.',
    answer: 2,
    why: 'The system takes an action, then gets a delayed reward based on what the user does later. That is the reinforcement learning pattern.',
  },
  {
    q: 'You want to predict next month’s revenue using historical revenue and other known variables.',
    answer: 0,
    why: 'Past months have known revenue, so they act as labelled examples. Predicting a number rather than a category is called regression.',
  },
];

const BRIEF_APPROACHES = [...TYPE_OPTIONS, 'A different approach or combination', 'Not sure yet'];

const BRIEF_FIELDS = [
  { key: 'problem', label: 'What user problem does it solve?' },
  { key: 'data', label: 'What data or feedback is available?' },
  { key: 'metric', label: 'How would you measure success?' },
] as const;

const COMPLETION = [
  'I can explain the three learning types in plain language.',
  'I completed the four scenario questions.',
  'I applied the framework to a real product feature.',
  'I saved my product brief.',
];

export const AI_PM_DAY3_TOPICS = [
  { id: 'objective', label: 'Today’s learning objectives' },
  { id: 'types', label: 'The three types of machine learning' },
  { id: 'examples', label: 'See how a PM applies this' },
  { id: 'quiz', label: 'Choose the learning type' },
  { id: 'apply', label: 'Apply it to a product you know' },
  { id: 'completion', label: 'Completion checklist' },
];

type BriefKey = 'feature' | 'approach' | (typeof BRIEF_FIELDS)[number]['key'];
interface Review {
  summary: string;
  strengths: string[];
  gaps: string[];
  nextStep: string;
}
interface Day3State {
  picks: (number | null)[];
  checked: boolean;
  brief: Record<BriefKey, string>;
  done: boolean[];
  review?: Review;
}

const emptyState = (): Day3State => ({
  picks: QUIZ.map(() => null),
  checked: false,
  brief: { feature: '', problem: '', data: '', approach: '', metric: '' },
  done: COMPLETION.map(() => false),
});

function loadState(): Day3State {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && Array.isArray(saved.picks)) return { ...emptyState(), ...saved, brief: { ...emptyState().brief, ...saved.brief } };
  } catch {}
  return emptyState();
}

const fieldClass = 'w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-200';
const h2Class = 'text-lg md:text-xl font-bold text-zinc-900 flex items-center gap-2.5 tracking-tight';

export const AiPmDay3Content = () => {
  const { user } = useAuth();
  const [state, setState] = useState<Day3State>(loadState);
  const [reviewing, setReviewing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const answered = state.picks.filter((p) => p !== null).length;
  const allPicked = answered === QUIZ.length;
  const correct = state.picks.filter((p, i) => p === QUIZ[i].answer).length;
  const briefReady = Object.values(state.brief).every((v) => v.trim().length > 0);
  const doneCount = state.done.filter(Boolean).length;

  const pick = (i: number, n: number) =>
    setState((s) => ({ ...s, checked: false, picks: s.picks.map((p, j) => (j === i ? n : p)) }));
  const setField = (key: BriefKey, value: string) =>
    setState((s) => ({ ...s, brief: { ...s.brief, [key]: value.slice(0, 600) } }));

  const reviewBrief = async () => {
    if (!user) { setAuthOpen(true); return; }
    if (!briefReady) { setError('Fill in every part of your product brief first.'); return; }
    setError(null);
    setReviewing(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/ai-pm/review-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ brief: state.brief }),
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
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" redirectTo="/ai-pm/day/3" onSuccess={() => setAuthOpen(false)} />

      <section id="objective" className="scroll-mt-32 bg-brand-50/60 p-4 sm:p-5 rounded-2xl border border-brand-100 space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-widest text-brand-600">Today’s learning objectives</span>
        <p className="text-sm font-medium text-brand-800">By the end of this lesson, you should be able to:</p>
        <ul className="space-y-1.5">
          {OBJECTIVES.map((o) => (
            <li key={o} className="flex gap-2 text-sm font-bold text-zinc-900 leading-relaxed">
              <CheckCircle className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />{o}
            </li>
          ))}
        </ul>
      </section>

      {/* Part 1 */}
      <section id="types" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Compass className="w-5 h-5 text-brand-600" />Part 1 — The three types of machine learning</h2>
        <div className="space-y-3">
          {TYPES.map((t) => (
            <div key={t.title} className="bg-white border border-zinc-200/80 p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-2.5">
                <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${t.tone}`}><t.icon className="w-4 h-4" /></span>
                <div>
                  <h3 className="font-bold text-zinc-900">{t.title}</h3>
                  <p className="text-xs font-semibold text-zinc-500">{t.tagline}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">{t.text}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Example</Label>
                  <p className="text-sm text-zinc-600 leading-relaxed italic">{t.example}</p>
                </div>
                <div>
                  <Label>PM question</Label>
                  <p className="text-sm text-zinc-700 font-semibold leading-relaxed">{t.question}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 p-4 bg-violet-50/60 border border-violet-100 rounded-xl">
          <Sparkles className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-sm text-zinc-700 leading-relaxed">
            <p>
              <span className="font-bold text-zinc-900">Important distinction:</span> generative AI is not a fourth category alongside these three. It describes systems that generate content.
            </p>
            <p>
              Modern generative models are mostly trained with <span className="font-bold">self-supervised learning</span>: the model learns by predicting the next word in huge amounts of text, so the text supplies its own labels. They may then use supervised fine-tuning or reinforcement learning to become more helpful.
            </p>
          </div>
        </div>
      </section>

      {/* Part 2 */}
      <section id="examples" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Target className="w-5 h-5 text-brand-600" />Part 2 — See how a PM applies this</h2>
        <p className="text-zinc-600 font-medium leading-relaxed">Imagine you are building an AI product for an e-commerce company.</p>
        <div className="space-y-2">
          {PROBLEMS.map((p) => (
            <div key={p.name} className="p-3 bg-zinc-50/70 border border-zinc-200/70 rounded-xl space-y-1">
              <p className="text-sm font-bold text-zinc-900">{p.name}</p>
              <p className="text-sm text-zinc-600">{p.setup}</p>
              <p className="text-sm font-semibold text-brand-700">{p.approach}</p>
            </div>
          ))}
        </div>
        <p className="text-sm font-bold text-zinc-700 leading-relaxed italic border-l-4 border-brand-500 pl-4">
          The PM’s job isn’t to select an algorithm by name. It’s to define the problem, determine what data and feedback exist, set success metrics, and work with technical experts to evaluate whether the approach is appropriate.
        </p>
        <div className="flex gap-3 p-4 bg-brand-50/60 border border-brand-100 rounded-xl">
          <Flag className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-700 leading-relaxed">
            <span className="font-bold text-zinc-900">Your capstone:</span> the knowledge assistant you’ll build is mostly generative AI on top of retrieval, but its parts use today’s ideas too. A classifier could route questions by topic (supervised), and clustering the questions people ask shows which documents are missing (unsupervised).
          </p>
        </div>
      </section>

      {/* Part 3 */}
      <section id="quiz" className="scroll-mt-32 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className={h2Class}><CheckCircle className="w-5 h-5 text-brand-600" />Part 3 — Choose the learning type</h2>
          <span className="text-xs font-bold text-zinc-500">{answered}/{QUIZ.length} answered</span>
        </div>
        <div className="space-y-3">
          {QUIZ.map((s, i) => {
            const picked = state.picks[i];
            const right = picked === s.answer;
            return (
              <div key={s.q} className="border border-zinc-200/80 rounded-xl p-4 space-y-2.5">
                <p className="text-sm font-bold text-zinc-900">{i + 1}. {s.q}</p>
                <div className="flex flex-wrap gap-1.5">
                  {TYPE_OPTIONS.map((o, n) => {
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
                    <span><span className="font-bold">{right ? 'Correct.' : `Answer: ${TYPE_OPTIONS[s.answer]}.`}</span> {s.why}</span>
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
          {state.checked && <p className="text-sm font-bold text-zinc-700">{correct} / {QUIZ.length} correct</p>}
          {!allPicked && <p className="text-xs text-zinc-500">Answer all four to check.</p>}
        </div>
      </section>

      {/* Part 4 */}
      <section id="apply" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Lightbulb className="w-5 h-5 text-brand-600" />Part 4 — Apply it to a product you know</h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Choose a feature from The NooB PM, your workplace, or a product you use regularly, and fill in this mini product brief.
        </p>
        <div className="border border-zinc-200/80 rounded-xl p-4 space-y-3">
          <div>
            <label className="text-sm font-bold text-zinc-800" htmlFor="d3-feature">Product feature</label>
            <input id="d3-feature" className={`${fieldClass} mt-1`} placeholder="For example: Spotify’s Discover Weekly" value={state.brief.feature} onChange={(e) => setField('feature', e.target.value)} />
          </div>
          {BRIEF_FIELDS.slice(0, 2).map((f) => (
            <div key={f.key}>
              <label className="text-sm font-bold text-zinc-800" htmlFor={`d3-${f.key}`}>{f.label}</label>
              <textarea id={`d3-${f.key}`} rows={2} className={`${fieldClass} mt-1 resize-y`} value={state.brief[f.key]} onChange={(e) => setField(f.key, e.target.value)} />
            </div>
          ))}
          <div>
            <p className="text-sm font-bold text-zinc-800">Which approach might fit best?</p>
            <div className="flex flex-wrap gap-1.5 mt-1.5" role="radiogroup" aria-label="Which approach might fit best?">
              {BRIEF_APPROACHES.map((a) => {
                const selected = state.brief.approach === a;
                return (
                  <button
                    key={a}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setField('approach', a)}
                    className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-colors ${
                      selected ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:border-brand-300'
                    }`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="text-sm font-bold text-zinc-800" htmlFor="d3-metric">{BRIEF_FIELDS[2].label}</label>
            <textarea id="d3-metric" rows={2} className={`${fieldClass} mt-1 resize-y`} value={state.brief.metric} onChange={(e) => setField('metric', e.target.value)} />
          </div>
          <p className="text-xs text-zinc-500 flex gap-1.5"><Info className="w-3.5 h-3.5 shrink-0 mt-px" />Your brief saves automatically in this browser.</p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={reviewBrief}
            disabled={reviewing}
            className="h-11 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold text-sm flex items-center gap-2"
          >
            {reviewing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {reviewing ? 'Reviewing…' : state.review ? 'Review again' : 'Review my product brief'}
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
        </div>
      </section>

      {/* Completion */}
      <section id="completion" className="scroll-mt-32 bg-zinc-50/70 p-4 sm:p-5 rounded-xl border border-zinc-200/70 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className={h2Class}><CheckCircle className="w-5 h-5 text-brand-600" />Day 3 completion checklist</h2>
          <span className="text-xs font-bold text-zinc-500">{doneCount} of {COMPLETION.length} completed</span>
        </div>
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

      <p className="text-sm font-bold text-zinc-700 leading-relaxed italic border-l-4 border-brand-500 pl-4">
        Key takeaway: start with the problem and the available feedback, not the algorithm. The type of learning depends on what the system needs to learn and what evidence is available.
      </p>
    </div>
  );
};

export default AiPmDay3Content;
