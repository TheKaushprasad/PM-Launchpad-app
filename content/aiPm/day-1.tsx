import React, { useEffect, useState } from 'react';
import { Bot, Brain, Cpu, Sparkles, Layers, PlayCircle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

// PM → AI PM, Day 1: the AI umbrella (AI, ML, deep learning, GenAI), four definitions with product examples,
// two videos and a 3-question quiz. Quiz picks are kept in this browser only.

const STORAGE_KEY = 'aipm_day1_v1';
const SECOND_VIDEO = { id: 'mUw27wG7uFA', title: '6 Concepts You Need to Know About Modern AI' };

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">{children}</h4>
);

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
    tone: 'bg-brand-50 text-brand-600',
    definition: 'AI is the broad category. It includes systems that reason, perceive, plan, predict, or generate outputs.',
    example: 'A chess program chooses a move. It may use search and planning rather than learning from a large training dataset.',
  },
  {
    icon: Brain,
    title: '2. Machine Learning (ML)',
    tone: 'bg-sky-50 text-sky-600',
    definition: 'Instead of programming every rule explicitly, developers train a model on data so it can learn patterns.',
    example: 'A payment product predicts whether a transaction is fraudulent based on patterns in past transactions.',
    note: 'The model produces a prediction; the product decides what to do with it.',
  },
  {
    icon: Cpu,
    title: '3. Deep Learning (DL)',
    tone: 'bg-teal-50 text-teal-600',
    definition: 'A subset of ML that uses neural networks with multiple layers to learn complex representations from data.',
    example: 'A speech recognition system converts spoken audio into text.',
    note: 'Deep learning is especially useful for complex inputs such as language, images, audio, and video.',
  },
  {
    icon: Sparkles,
    title: '4. Generative AI (GenAI)',
    tone: 'bg-violet-50 text-violet-600',
    definition: 'AI that generates new content based on learned patterns and the input it receives.',
    example: 'An AI assistant drafts a customer support reply, summarizes a meeting, or generates code.',
    note: 'Many modern GenAI systems use large language models (LLMs), though generative AI also includes image, audio, and video models.',
  },
];

const QUIZ = [
  {
    q: 'What primary characteristic distinguishes agentic AI from predictive AI and generative AI?',
    answer: 0,
    options: [
      { text: 'It outputs explicit actions to complete a given task independently.', why: 'Agentic AI takes a task or destination as input and directly executes actions, such as navigating a vehicle or operating software applications.' },
      { text: 'It relies on strict, hardcoded conditional statements written by human developers.', why: 'Following strict predefined rules characterizes legacy rules-based machines, whereas modern AI learns to process inputs independently.' },
      { text: 'It creates entirely new digital media such as text, images, or video.', why: 'Creating new media content like text or images is the defining feature of generative AI.' },
      { text: 'It labels and categorizes existing datasets based on historical patterns.', why: 'Labeling and categorizing based on prior data describes predictive AI rather than agentic AI.' },
    ],
  },
  {
    q: 'What major bottleneck regarding training data do researchers predict AI developers will encounter between 2026 and 2032?',
    answer: 1,
    options: [
      { text: 'Synthetic data will be legally banned across all commercial AI platforms.', why: 'Synthetic data is actively being explored as a key solution to data exhaustion rather than being prohibited.' },
      { text: 'Publicly available high-quality human-generated data will be completely exhausted.', why: 'The rapid pace of AI development means companies will soon run out of usable public human data to train new models.' },
      { text: 'Global server infrastructure will run out of physical digital storage space.', why: 'The critical issue highlighted by researchers is data availability and quality, not hardware storage limits.' },
      { text: 'Language models will become incapable of tokenizing natural human languages.', why: 'Tokenization is a fundamental mathematical representation of text and is unaffected by external data limits.' },
    ],
  },
  {
    q: 'How does a Large Language Model (LLM) generate response text when given a prompt?',
    answer: 1,
    options: [
      { text: 'By converting words into pixel grids and reversing random noise patterns.', why: 'Reversing noise in pixel grids is the core mechanism used by diffusion image generators.' },
      { text: 'By calculating and predicting the next numerical token in a sequence one at a time.', why: 'LLMs apply mathematical parameters to input prompts to guess the most fitting sequence of tokens sequentially.' },
      { text: 'By executing human-programmed decision trees to verify logical consistency.', why: 'LLMs rely on statistical token probabilities trained on massive text collections rather than human decision trees.' },
      { text: 'By searching a verified database of factual statements and retrieving matching answers.', why: 'LLMs are probabilistic text generators rather than truth lookup databases.' },
    ],
  },
];

const COMPLETION = [
  'Explain the four concepts in your own words.',
  'Answer all three quiz questions.',
];

interface Day1State { picks: (number | null)[]; done: boolean[] }

function loadState(): Day1State {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && Array.isArray(saved.picks) && saved.picks.length === QUIZ.length) {
      return { picks: saved.picks, done: COMPLETION.map((_, i) => !!saved.done?.[i]) };
    }
  } catch {}
  return { picks: QUIZ.map(() => null), done: COMPLETION.map(() => false) };
}

const h2Class = 'text-lg md:text-xl font-bold text-zinc-900 flex items-center gap-2.5 tracking-tight';

// Sections for the "Topics to cover" list on the day page; ids match the <section> ids below.
export const AI_PM_DAY1_TOPICS = [
  { id: 'objective', label: 'Today’s objective' },
  { id: 'second-video', label: 'Watch: 6 concepts of modern AI' },
  { id: 'concepts', label: 'AI as an umbrella' },
  { id: 'definitions', label: 'Some helpful definitions' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'completion', label: 'Completion criteria' },
];

export const AiPmDay1Content = () => {
  const [state, setState] = useState<Day1State>(loadState);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const answered = state.picks.filter((p) => p !== null).length;
  const correct = state.picks.filter((p, i) => p === QUIZ[i].answer).length;
  const pick = (i: number, n: number) =>
    setState((s) => ({ ...s, picks: s.picks.map((p, j) => (j === i ? n : p)) }));

  return (
    <div className="space-y-6 md:space-y-7 text-left">
      {/* Objective */}
      <section id="objective" className="scroll-mt-32 bg-brand-50/60 p-4 sm:p-5 rounded-2xl border border-brand-100 space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-widest text-brand-600">Today’s objective</span>
        <p className="text-base font-bold text-zinc-900 leading-relaxed">
          Understand AI, ML, deep learning, and generative AI well enough to explain the differences and identify where each is useful in a real product.
        </p>
      </section>

      {/* Second video (the first is embedded at the top of the day page) */}
      <section id="second-video" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><PlayCircle className="w-5 h-5 text-brand-600" />Watch next: {SECOND_VIDEO.title}</h2>
        <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100" style={{ aspectRatio: '16 / 9' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${SECOND_VIDEO.id}`}
            title={SECOND_VIDEO.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Umbrella */}
      <section id="concepts" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Layers className="w-5 h-5 text-brand-600" />AI as an umbrella</h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Think of AI as an umbrella of techniques that enable computers to perform tasks associated with intelligence, such as recognizing patterns, making predictions, understanding language, or generating content.
        </p>
        <div className={`rounded-2xl border-2 ${LAYERS[0].border} ${LAYERS[0].bg} p-3 sm:p-4`}>
          <p className={`text-xs font-bold uppercase tracking-widest ${LAYERS[0].color}`}>{LAYERS[0].name}</p>
          <p className="text-[11px] font-bold text-zinc-500 mb-3">{LAYERS[0].text}</p>
          <div className={`rounded-2xl border-2 ${LAYERS[1].border} ${LAYERS[1].bg} p-3 sm:p-4`}>
            <p className={`text-xs font-bold uppercase tracking-widest ${LAYERS[1].color}`}>{LAYERS[1].name}</p>
            <p className="text-[11px] font-bold text-zinc-500 mb-3">{LAYERS[1].text}</p>
            <div className={`rounded-2xl border-2 ${LAYERS[2].border} ${LAYERS[2].bg} p-3 sm:p-4`}>
              <p className={`text-xs font-bold uppercase tracking-widest ${LAYERS[2].color}`}>{LAYERS[2].name}</p>
              <p className="text-[11px] font-bold text-zinc-500 mb-3">{LAYERS[2].text}</p>
              <div className={`rounded-2xl border-2 ${LAYERS[3].border} ${LAYERS[3].bg} p-3 sm:p-4`}>
                <p className={`text-xs font-bold uppercase tracking-widest ${LAYERS[3].color}`}>{LAYERS[3].name}</p>
                <p className="text-[11px] font-bold text-zinc-500">{LAYERS[3].text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Definitions */}
      <section id="definitions" className="scroll-mt-32 space-y-3">
        <h2 className={h2Class}><Sparkles className="w-5 h-5 text-brand-600" />Some helpful definitions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3.5">
          {CONCEPTS.map((c) => (
            <div key={c.title} className="bg-white border border-zinc-200/80 p-4 rounded-xl space-y-3">
              <h3 className="font-bold text-zinc-900 flex items-center gap-2.5"><span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${c.tone}`}><c.icon className="w-4 h-4" /></span>{c.title}</h3>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">{c.definition}</p>
              <div>
                <Label>Product example</Label>
                <p className="text-sm font-medium text-zinc-600 leading-relaxed italic">{c.example}</p>
              </div>
              {c.note && <p className="text-xs font-bold text-zinc-500 leading-relaxed">{c.note}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section id="quiz" className="scroll-mt-32 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className={h2Class}><CheckCircle className="w-5 h-5 text-brand-600" />Quiz</h2>
          <span className="text-xs font-bold text-zinc-500">
            {answered === QUIZ.length ? `${correct}/${QUIZ.length} correct` : `${answered}/${QUIZ.length} answered`}
          </span>
        </div>
        <div className="space-y-3">
          {QUIZ.map((s, i) => {
            const picked = state.picks[i];
            const choice = picked !== null ? s.options[picked] : null;
            const right = picked === s.answer;
            return (
              <div key={s.q} className="border border-zinc-200/80 rounded-xl p-4 space-y-2.5">
                <p className="text-sm font-bold text-zinc-900">{i + 1}. {s.q}</p>
                <div className="flex flex-col gap-1.5">
                  {s.options.map((o, n) => {
                    const selected = picked === n;
                    const tone = selected
                      ? (right ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800')
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-brand-300 hover:bg-brand-50/40';
                    return (
                      <button key={o.text} type="button" onClick={() => pick(i, n)} className={`px-3 py-2 rounded-lg border text-sm font-medium text-left ${tone}`}>
                        <span className="font-bold mr-1.5">{String.fromCharCode(65 + n)}.</span>{o.text}
                      </button>
                    );
                  })}
                </div>
                {choice && (
                  <p className={`text-xs leading-relaxed flex gap-1.5 ${right ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {right ? <CheckCircle className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                    <span><span className="font-bold">{right ? 'Correct.' : 'Not quite.'}</span> {choice.why}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section id="completion" className="scroll-mt-32 bg-zinc-50/70 p-4 sm:p-5 rounded-xl border border-zinc-200/70 space-y-3">
        <h2 className={h2Class}><Lightbulb className="w-5 h-5 text-amber-500" />Day 1 completion criteria</h2>
        <p className="text-sm font-medium text-zinc-600">Before you finish today, make sure you can:</p>
        <div className="space-y-2">
          {COMPLETION.map((c, i) => (
            <label key={c} className="flex gap-2.5 items-start text-sm font-medium text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-brand-600"
                checked={state.done[i]}
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

export default AiPmDay1Content;
