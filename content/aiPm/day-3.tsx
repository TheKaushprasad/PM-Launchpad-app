import React, { useEffect, useState } from 'react';
import {
  Tag, Shapes, Repeat, Sparkles, Compass, CheckCircle, Target, XCircle,
} from 'lucide-react';

// PM → AI PM, Day 3: supervised, unsupervised and reinforcement learning, worked product examples, a 4-question
// quiz. Answers stay in this browser.

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

const COMPLETION = [
  'I can explain the three learning types in plain language.',
  'I completed the four scenario questions.',
];

export const AI_PM_DAY3_TOPICS = [
  { id: 'objective', label: 'Today’s objective' },
  { id: 'types', label: 'The three types of machine learning' },
  { id: 'examples', label: 'See how a PM applies this' },
  { id: 'quiz', label: 'Choose the learning type' },
  { id: 'completion', label: 'Completion checklist' },
];

// Shown at the top of the day page, above the video.
export const AI_PM_DAY3_OBJECTIVE = { lead: 'By the end of this lesson, you should be able to:', items: OBJECTIVES };

interface Day3State {
  picks: (number | null)[];
  checked: boolean;
  done: boolean[];
}

const emptyState = (): Day3State => ({
  picks: QUIZ.map(() => null),
  checked: false,
  done: COMPLETION.map(() => false),
});

function loadState(): Day3State {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && Array.isArray(saved.picks)) return { ...emptyState(), ...saved };
  } catch {}
  return emptyState();
}

const h2Class = 'text-lg md:text-xl font-bold text-zinc-900 flex items-center gap-2.5 tracking-tight';

export const AiPmDay3Content = () => {
  const [state, setState] = useState<Day3State>(loadState);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const answered = state.picks.filter((p) => p !== null).length;
  const allPicked = answered === QUIZ.length;
  const correct = state.picks.filter((p, i) => p === QUIZ[i].answer).length;
  const doneCount = state.done.filter(Boolean).length;

  const pick = (i: number, n: number) =>
    setState((s) => ({ ...s, checked: false, picks: s.picks.map((p, j) => (j === i ? n : p)) }));

  return (
    <div className="space-y-6 md:space-y-7 text-left">
      <section id="types" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Compass className="w-5 h-5 text-brand-600" />The three types of machine learning</h2>
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

      <section id="examples" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Target className="w-5 h-5 text-brand-600" />See how a PM applies this</h2>
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
      </section>

      <section id="quiz" className="scroll-mt-32 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className={h2Class}><CheckCircle className="w-5 h-5 text-brand-600" />Choose the learning type</h2>
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
