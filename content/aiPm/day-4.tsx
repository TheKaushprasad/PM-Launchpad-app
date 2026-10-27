import React, { useEffect, useState } from 'react';
import {
  Table, ShieldCheck, Tags, AlertTriangle, CheckCircle, XCircle,
  Database, Users, Clock, UserCheck, Hand, MousePointerClick, Server,
} from 'lucide-react';

// PM → AI PM, Day 4: examples, features and labels; four data-quality checks; where labels come from; leakage;
// and a "what's wrong with this data?" quiz.
// Answers stay in this browser.

const STORAGE_KEY = 'aipm_day4_v1';

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">{children}</h4>
);

const OBJECTIVES = [
  'Explain examples, features, and labels using a real product case.',
  'Judge whether a dataset is good enough with four simple checks.',
  'Compare where labels come from and the trap in each source.',
];

const TICKETS = [
  { text: '“I was charged twice for my order”', plan: 'Premium', channel: 'App', label: 'Billing' },
  { text: '“The app crashes when I open my cart”', plan: 'Free', channel: 'Email', label: 'Bug' },
  { text: '“Where is my parcel? It’s 4 days late”', plan: 'Free', channel: 'Chat', label: 'Delivery' },
];

const CHECKS = [
  { icon: Database, title: 'Enough', text: 'Are there enough examples of each outcome, especially the rare ones?', example: 'A fraud model with only 40 fraud cases in a million orders has almost nothing to learn from.' },
  { icon: Users, title: 'Representative', text: 'Does the data look like the users and situations the product will actually face?', example: 'Tickets only in English won’t prepare the model for customers who write in Hinglish.' },
  { icon: Clock, title: 'Fresh', text: 'Does the data still reflect how people behave today?', example: 'Shopping data from before a major app redesign may describe a product that no longer exists.' },
  { icon: UserCheck, title: 'Consistent labels', text: 'Would two people give the same example the same label?', example: 'If one agent tags “refund for a late parcel” as Billing and another as Delivery, the model learns confusion.' },
];

const SOURCES = [
  { icon: Hand, tone: 'bg-brand-50 text-brand-600', title: 'Human labelling', text: 'People review examples and assign the correct answer.', cost: 'Slow and expensive, but you control the definition.', trap: 'Unclear guidelines produce inconsistent labels. Write a short labelling guide with examples first.' },
  { icon: MousePointerClick, tone: 'bg-sky-50 text-sky-600', title: 'User behaviour', text: 'Actions such as clicks, purchases, returns, or ratings act as labels.', cost: 'Cheap and plentiful, collected automatically.', trap: 'Behaviour is a proxy. A click measures attention, not satisfaction; a model optimised for clicks can promote clickbait.' },
  { icon: Server, tone: 'bg-violet-50 text-violet-600', title: 'Existing systems', text: 'Past decisions already recorded, such as approved refunds or resolved ticket categories.', cost: 'Often free, because the data already exists.', trap: 'It copies the old process, including its mistakes and biases. If past refunds were unfair, the model learns to be unfair.' },
];

const PROBLEMS = ['Not representative', 'Leakage', 'Inconsistent labels', 'Stale data'];

const QUIZ = [
  {
    q: 'A loan-approval model is trained only on applicants from metro cities, then launched across India, including small towns.',
    answer: 0,
    why: 'The training data doesn’t look like the new users. The model may perform well in metros and poorly everywhere else.',
  },
  {
    q: 'A fraud model uses “chargeback filed” as an input feature and scores 99% accuracy in testing.',
    answer: 1,
    why: 'A chargeback is filed after fraud is discovered, so the model is seeing the answer. At checkout that information doesn’t exist yet.',
  },
  {
    q: 'Three support agents label the same 100 tickets and agree on only 60 of them.',
    answer: 2,
    why: 'If humans can’t agree, the model can’t learn a clear pattern. Fix the category definitions and labelling guide before training.',
  },
  {
    q: 'A recommendation model was trained on shopping data from three years ago, before customers shifted to quick-commerce.',
    answer: 3,
    why: 'Behaviour has changed since the data was collected. The model is recommending for customers who no longer exist.',
  },
];

const COMPLETION = [
  'I can explain examples, features, and labels in plain language.',
  'I completed the four data-problem questions.',
];

export const AI_PM_DAY4_TOPICS = [
  { id: 'objective', label: 'Today’s objective' },
  { id: 'vocabulary', label: 'Examples, features, and labels' },
  { id: 'quality', label: 'Four checks for good data' },
  { id: 'labels', label: 'Where labels come from' },
  { id: 'leakage', label: 'Leakage: when the model sees the answer' },
  { id: 'quiz', label: 'What’s wrong with this data?' },
  { id: 'completion', label: 'Completion checklist' },
];

// Shown at the top of the day page, above the video.
export const AI_PM_DAY4_OBJECTIVE = { lead: 'Yesterday you learned that the right approach depends on the data and feedback you have. Today you learn to judge whether that data is good enough. By the end of this lesson, you should be able to:', items: OBJECTIVES };

interface Day4State {
  picks: (number | null)[];
  checked: boolean;
  done: boolean[];
}

const emptyState = (): Day4State => ({
  picks: QUIZ.map(() => null),
  checked: false,
  done: COMPLETION.map(() => false),
});

function loadState(): Day4State {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && Array.isArray(saved.picks)) return { ...emptyState(), ...saved };
  } catch {}
  return emptyState();
}

const h2Class = 'text-lg md:text-xl font-bold text-zinc-900 flex items-center gap-2.5 tracking-tight';

export const AiPmDay4Content = () => {
  const [state, setState] = useState<Day4State>(loadState);

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
      <section id="vocabulary" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Table className="w-5 h-5 text-brand-600" />Examples, features, and labels</h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Imagine you want a model that sorts incoming support tickets into categories. Your training data is a table of past tickets.
        </p>
        <ul className="space-y-1.5 text-sm text-zinc-700 leading-relaxed">
          <li><span className="font-bold text-zinc-900">Example:</span> one row, meaning one past ticket.</li>
          <li><span className="font-bold text-zinc-900">Features:</span> the inputs the model can see, such as the ticket text, the customer’s plan, and the channel.</li>
          <li><span className="font-bold text-zinc-900">Label:</span> the correct answer the model should learn to predict, here the category.</li>
        </ul>
        <div className="overflow-x-auto border border-zinc-200/80 rounded-xl">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="bg-zinc-50 text-left">
                <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-sky-700" colSpan={3}>Features (inputs)</th>
                <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-brand-700 bg-brand-50">Label (answer)</th>
              </tr>
              <tr className="text-left border-t border-zinc-200/80 text-xs text-zinc-500">
                <th className="px-3 py-1.5 font-semibold">Ticket text</th>
                <th className="px-3 py-1.5 font-semibold">Plan</th>
                <th className="px-3 py-1.5 font-semibold">Channel</th>
                <th className="px-3 py-1.5 font-semibold bg-brand-50/60">Category</th>
              </tr>
            </thead>
            <tbody>
              {TICKETS.map((t) => (
                <tr key={t.text} className="border-t border-zinc-200/80">
                  <td className="px-3 py-2 text-zinc-700 italic">{t.text}</td>
                  <td className="px-3 py-2 text-zinc-600">{t.plan}</td>
                  <td className="px-3 py-2 text-zinc-600">{t.channel}</td>
                  <td className="px-3 py-2 font-bold text-brand-800 bg-brand-50/60">{t.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm font-bold text-zinc-700 leading-relaxed italic border-l-4 border-brand-500 pl-4">
          A model can only be as good as the label it learns from. The most important PM decision here is often what the label means and who decides it.
        </p>
      </section>

      <section id="quality" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><ShieldCheck className="w-5 h-5 text-brand-600" />Four checks for good data</h2>
        <p className="text-zinc-600 font-medium leading-relaxed">Before anyone trains a model, ask these four questions. You don’t need to be a data scientist to ask them.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CHECKS.map((c) => (
            <div key={c.title} className="bg-white border border-zinc-200/80 p-4 rounded-xl space-y-2">
              <h3 className="font-bold text-zinc-900 flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-brand-50 text-brand-600"><c.icon className="w-4 h-4" /></span>
                {c.title}
              </h3>
              <p className="text-sm font-medium text-zinc-700 leading-relaxed">{c.text}</p>
              <p className="text-sm text-zinc-500 leading-relaxed italic">{c.example}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="labels" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Tags className="w-5 h-5 text-brand-600" />Where labels come from, and what they cost</h2>
        <div className="space-y-3">
          {SOURCES.map((s) => (
            <div key={s.title} className="bg-white border border-zinc-200/80 p-4 rounded-xl space-y-3">
              <h3 className="font-bold text-zinc-900 flex items-center gap-2.5">
                <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${s.tone}`}><s.icon className="w-4 h-4" /></span>
                {s.title}
              </h3>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">{s.text}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Cost</Label>
                  <p className="text-sm text-zinc-600 leading-relaxed">{s.cost}</p>
                </div>
                <div>
                  <Label>The trap</Label>
                  <p className="text-sm text-zinc-700 font-semibold leading-relaxed">{s.trap}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="leakage" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><AlertTriangle className="w-5 h-5 text-amber-500" />Leakage: when the model sees the answer</h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Leakage happens when training data includes information that won’t exist at the moment the model makes a real prediction. The model looks brilliant in testing and fails in production.
        </p>
        <div className="p-4 bg-amber-50/60 border border-amber-100 rounded-xl space-y-1.5 text-sm text-zinc-700 leading-relaxed">
          <p><span className="font-bold text-zinc-900">Example:</span> a churn model uses the field “cancellation reason”. It predicts churn almost perfectly, because that field is only filled in after a customer has already cancelled.</p>
          <p><span className="font-bold text-zinc-900">PM question:</span> for every feature, ask “Would we actually know this at the moment we need the prediction?”</p>
        </div>
        <p className="text-xs text-zinc-500">You’ll study leakage and other failure modes in depth on Day 13.</p>
      </section>

      <section id="quiz" className="scroll-mt-32 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className={h2Class}><CheckCircle className="w-5 h-5 text-brand-600" />What’s wrong with this data?</h2>
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
                  {PROBLEMS.map((o, n) => {
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
                    <span><span className="font-bold">{right ? 'Correct.' : `Answer: ${PROBLEMS[s.answer]}.`}</span> {s.why}</span>
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
          <h2 className={h2Class}><CheckCircle className="w-5 h-5 text-brand-600" />Day 4 completion checklist</h2>
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
        Key takeaway: before asking “which model?”, ask “is our data enough, representative, fresh, and consistently labelled, and would we know every input at prediction time?”
      </p>
    </div>
  );
};

export default AiPmDay4Content;
