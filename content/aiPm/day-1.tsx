import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bot, Brain, Cpu, Sparkles, Layers, Clock, Mic, Lightbulb, Info, Briefcase,
  CheckCircle, ShieldAlert, Music, MessageSquare, Video, Settings, TrendingUp, Search,
  ArrowRight, Target,
} from 'lucide-react';

// PM → AI PM, Day 1: the AI family tree (AI ⊃ ML ⊃ deep learning ⊃ GenAI) and what it means for a PM.
// Same lesson layout as the 45-day course (see content/days/day-28.tsx).

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">{children}</h4>
);

const Dot: React.FC = () => <div className="w-1.5 h-1.5 rounded-full bg-orange-300 mt-2 shrink-0" />;

const TYPES = [
  { term: 'Machine learning (ML)', meaning: 'Systems learn predictions or decisions from data.', example: 'Recommending products on Amazon' },
  { term: 'Deep learning', meaning: 'A type of ML using layered neural networks to learn complex patterns.', example: 'Face recognition in photos' },
  { term: 'Generative AI', meaning: 'AI that creates new text, images, audio, video or code.', example: 'ChatGPT writing a draft' },
  { term: 'Computer vision', meaning: 'AI that interprets images and video.', example: 'Detecting defects in manufacturing' },
  { term: 'Natural language processing (NLP)', meaning: 'AI that understands or generates human language.', example: 'Voice assistants and chatbots' },
];

const VOICE_STEPS = ['Listens to the customer', 'Converts speech to text', 'Understands the intent', 'Retrieves relevant information', 'Responds naturally'];

export const AiPmDay1Content = () => {
  return (
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-blue-50/70 p-3.5 sm:p-4 rounded-xl border border-blue-100/80">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">AI foundations</span>
          <p className="text-lg font-black text-orange-900 leading-relaxed italic">
            “AI is the umbrella. Machine learning sits inside it, deep learning sits inside machine learning, and generative AI is built on top of deep learning.”
          </p>
          <p className="text-sm font-bold text-orange-700">
            Today you’ll learn how the four layers fit together, where today’s AI products come from, and why an AI feature behaves differently from the software you have shipped before.
          </p>
        </div>
      </section>

      {/* The family tree */}
      <section className="space-y-3">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-orange-600" />
          The AI family tree
        </h2>
        <div className="rounded-2xl border-2 border-orange-200 bg-orange-50/40 p-3 sm:p-4">
          <p className="text-xs font-black text-orange-800 uppercase tracking-widest">Artificial intelligence</p>
          <p className="text-[11px] font-bold text-zinc-500 mb-3">Machines that learn, infer and reason</p>
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-3 sm:p-4">
            <p className="text-xs font-black text-amber-800 uppercase tracking-widest">Machine learning</p>
            <p className="text-[11px] font-bold text-zinc-500 mb-3">Learns patterns from data</p>
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-3 sm:p-4">
              <p className="text-xs font-black text-emerald-800 uppercase tracking-widest">Deep learning</p>
              <p className="text-[11px] font-bold text-zinc-500 mb-3">Many-layered neural networks</p>
              <div className="rounded-2xl border-2 border-zinc-300 bg-white p-3 sm:p-4">
                <p className="text-xs font-black text-zinc-900 uppercase tracking-widest">Generative AI</p>
                <p className="text-[11px] font-bold text-zinc-500">Foundation models and LLMs that create new content</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        {/* 1. AI */}
        <div className="space-y-3.5 md:space-y-4">
          <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
            <Bot className="text-orange-600" />
            1. Artificial Intelligence (AI): the umbrella
          </h2>
          <div className="bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-xs space-y-6">
            <div>
              <Label>Definition</Label>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                AI is the broad field focused on creating computer systems that simulate or exceed human intelligence, specifically the ability to learn, infer and reason.
              </p>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed mt-2">
                In simple words: AI builds systems that can do tasks that normally need human intelligence, such as understanding language, recognising images, learning from data, reasoning and making decisions.
              </p>
            </div>
            <div>
              <Label>Early era and history</Label>
              <ul className="space-y-4 pt-1">
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-orange-600 shrink-0 shadow-xs">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-zinc-900">Research projects</p>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">Early AI was mostly research, written in programming languages such as Lisp and Prolog.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-orange-600 shrink-0 shadow-xs">
                    <Settings className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-zinc-900">Expert systems (1980s and 1990s)</p>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">They ran on pre-programmed rules written by people. They did not learn from observations.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. ML */}
        <div className="space-y-3.5 md:space-y-4">
          <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
            <Brain className="text-orange-600" />
            2. Machine Learning (ML): learning from data
          </h2>
          <p className="text-sm font-bold text-zinc-500 italic">ML is a subset of AI. It became widely adopted and mature from the 2010s.</p>
          <div className="bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-xs space-y-6">
            <div>
              <Label>Definition</Label>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Machines learn from data instead of being explicitly programmed for every scenario.
              </p>
            </div>
            <div>
              <Label>How it works</Label>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                ML algorithms analyse data to discover the patterns underneath it, and their predictions improve as more training data is provided. For example, instead of writing a rule for every possible spam email, you train a model on many labelled examples, and it learns to predict whether a new email is spam.
              </p>
            </div>
            <div>
              <Label>Key strengths</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <p className="text-[10px] font-black text-orange-600 uppercase mb-1">Predictions</p>
                  <p className="text-xs font-bold text-zinc-500">Forecasting outcomes from historical patterns.</p>
                </div>
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <p className="text-[10px] font-black text-orange-600 uppercase mb-1">Outlier detection</p>
                  <p className="text-xs font-bold text-zinc-500">Spotting anomalies where a pattern or sequence is broken.</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-xs font-bold text-orange-900 leading-relaxed">
                <span className="font-black">Real-world application:</span> cybersecurity relies heavily on ML outlier detection to flag suspicious user activity or unauthorised access.
              </p>
            </div>
          </div>
        </div>

        {/* 3. DL */}
        <div className="space-y-3.5 md:space-y-4">
          <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
            <Cpu className="text-orange-600" />
            3. Deep Learning (DL): neural networks with many layers
          </h2>
          <p className="text-sm font-bold text-zinc-500 italic">DL is a specialised branch of ML. It rose with ML in the 2010s and is the foundation of modern AI.</p>
          <div className="bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-xs space-y-6">
            <div>
              <Label>Definition</Label>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Deep learning uses multi-layered neural networks that loosely simulate how the human brain works.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
              <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl">
                <p className="text-xs font-black text-zinc-900">Multiple layers</p>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed mt-1">It is called “deep” because information passes through many connected layers of the network.</p>
              </div>
              <div className="p-4 bg-zinc-900 text-white rounded-2xl">
                <p className="text-xs font-black text-orange-400">Hard to explain</p>
                <p className="text-xs font-medium text-zinc-400 leading-relaxed mt-1">With so many layers, it can be hard to break down exactly how the network reached a specific result.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. GenAI */}
        <div className="space-y-3.5 md:space-y-4">
          <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
            <Sparkles className="text-orange-600" />
            4. Generative AI (GenAI) and foundation models
          </h2>
          <p className="text-sm font-bold text-zinc-500 italic">The most recent advance, built directly on deep learning and neural networks.</p>
          <div className="bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-xs space-y-6">
            <div>
              <Label>Foundation models and LLMs</Label>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                GenAI is built on foundation models such as large language models (LLMs). Basic autocomplete predicts the next single word. An LLM goes further and predicts the next sentences, paragraphs or even whole documents.
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
              <Music className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-amber-900">Myth: “LLMs just regurgitate their training data”</p>
                <p className="text-xs font-medium text-amber-900/80 leading-relaxed mt-1">
                  Think of music. Every musical note already exists, yet arranging existing notes in new ways creates original songs. In the same way, GenAI creates genuinely new content by recombining patterns it learned from existing data.
                </p>
              </div>
            </div>
            <div>
              <Label>Forms and use cases</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <p className="text-xs font-black text-zinc-900 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-orange-600" />Text and chatbots</p>
                  <p className="text-xs font-medium text-zinc-500 leading-relaxed mt-1">Generating responses, holding conversations and summarising large amounts of information.</p>
                </div>
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <p className="text-xs font-black text-zinc-900 flex items-center gap-2"><Video className="w-4 h-4 text-orange-600" />Audio and video</p>
                  <p className="text-xs font-medium text-zinc-500 leading-relaxed mt-1">
                    Recreating voices and realistic visuals. Useful in entertainment, parodies or helping people who have lost their voice.
                  </p>
                  <p className="text-xs font-bold text-rose-600 leading-relaxed mt-1 flex gap-1.5"><ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />The same tech powers deepfakes, so it carries a real risk of misuse.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main types */}
      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-orange-600" />
          Main types of AI you will hear about
        </h2>
        <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-medium border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="py-4 px-6 font-black text-zinc-900">Term</th>
                  <th className="py-4 px-6 font-black text-zinc-900">What it means</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Example</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                {TYPES.map((t) => (
                  <tr key={t.term} className="border-b border-zinc-50 last:border-0 align-top">
                    <td className="py-4 px-6 font-bold text-zinc-900">{t.term}</td>
                    <td className="py-4 px-6">{t.meaning}</td>
                    <td className="py-4 px-6 italic">{t.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Simple example */}
      <section className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200 space-y-3">
        <h2 className="text-xl font-black text-zinc-900 flex items-center gap-3">
          <Mic className="text-orange-600" />
          Simple example: a voice AI agent
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {VOICE_STEPS.map((step, i) => (
            <React.Fragment key={step}>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs font-bold text-zinc-700">{step}</span>
              {i < VOICE_STEPS.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />}
            </React.Fragment>
          ))}
        </div>
        <p className="text-sm font-medium text-zinc-600 leading-relaxed">
          One product, three kinds of AI working together: speech recognition, language understanding and generative AI.
        </p>
      </section>

      {/* Timeline */}
      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Clock className="text-orange-600" />
          Timeline of adoption
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5">
          {[
            { era: 'Early AI', text: 'Adoption was slow. AI was seen as a research idea that was always “5–10 years away”.' },
            { era: 'ML and deep learning (2010s)', text: 'Practical applications arrived, and adoption grew steadily.' },
            { era: 'GenAI and foundation models', text: 'Adoption surged. AI moved from niche research into everyday use.' },
          ].map((s, i) => (
            <div key={s.era} className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-50 text-orange-600 text-xs font-black flex items-center justify-center">{i + 1}</span>
                <p className="font-black text-zinc-900 text-sm">{s.era}</p>
              </div>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <p className="text-xs font-bold text-zinc-500 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-orange-500" />Each layer sped up adoption more than the one before it.</p>
      </section>

      {/* Narrow vs AGI */}
      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Info className="text-orange-600" />
          Important distinction: narrow AI vs AGI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3.5">
          <div className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-xs">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Today</p>
            <p className="font-black text-zinc-900 text-sm">Narrow AI</p>
            <p className="text-xs font-medium text-zinc-500 leading-relaxed mt-1">Most AI today is excellent at specific tasks such as translation, recommendations or customer support.</p>
          </div>
          <div className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-xs">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Future goal</p>
            <p className="font-black text-zinc-900 text-sm">Artificial General Intelligence (AGI)</p>
            <p className="text-xs font-medium text-zinc-500 leading-relaxed mt-1">AI with broad, human-like intelligence across almost any task. It remains a goal, not current reality.</p>
          </div>
        </div>
      </section>

      {/* Why it matters for an AI PM */}
      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Briefcase className="text-orange-600" />
          Why this matters for an AI PM
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Classic software is deterministic: the same input gives the same output, and a test passes or fails. ML, deep learning and GenAI learn from data, so their output is probabilistic.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5">
          {[
            { title: 'Quality is a distribution', text: 'An AI feature is right most of the time, not all of the time. You will define “good enough” as a rate, not a yes or no.' },
            { title: 'Failures are hard to explain', text: 'Deep learning is hard to break down, so you plan fallbacks and human review instead of promising zero errors.' },
            { title: 'Pick the right layer', text: 'Not every problem needs GenAI. Some need rules, some need classic ML, and some need an LLM. Choosing is part of the job.' },
          ].map((r) => (
            <div key={r.title} className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-xs space-y-2">
              <p className="font-black text-zinc-900 text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4 text-orange-500" />{r.title}</p>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-2.5 flex items-center gap-3">
          <Lightbulb className="text-amber-500" />
          The bottom line
        </h2>
        <div className="space-y-3">
          <div className="flex gap-2 text-sm font-medium text-zinc-600 leading-relaxed"><Dot />AI is the umbrella; ML learns from data; deep learning uses many-layered networks; GenAI creates new content on top of deep learning.</div>
          <div className="flex gap-2 text-sm font-medium text-zinc-600 leading-relaxed"><Dot />Almost all AI in products today is narrow AI built for one job.</div>
          <p className="text-sm font-bold text-zinc-700 leading-relaxed italic border-l-4 border-orange-500 pl-4">
            “Once you know which layer a feature uses, you know how it can fail, and that is where an AI PM’s work starts.”
          </p>
        </div>
      </section>

      <p className="text-xs font-bold text-zinc-500">
        Want a refresher on ML types (supervised, unsupervised, reinforcement)? See{' '}
        <Link to="/dashboard/day/28" className="text-orange-600 underline decoration-orange-300">Day 28 of the PM course</Link>.
      </p>
    </div>
  );
};

export default AiPmDay1Content;
