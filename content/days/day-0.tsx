import { CornsilkSection } from '../../components/CornsilkSection';

import React from 'react';
import { Target, CheckCircle, Users, Lightbulb, Zap, ArrowRight, Star } from 'lucide-react';

export const Day0Content = () => {
  return (
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-blue-50/70 p-3.5 sm:p-4 rounded-xl border border-blue-100/80">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
          <p className="text-sm sm:text-base font-medium text-blue-900 leading-relaxed">
            Start Your PM Journey Right . Before we jump into frameworks, tools, and case studies, today is about building the right mindset.
          </p>
        </div>
      </section>

      <section className="space-y-2.5">
        <p className="text-zinc-600 font-medium leading-relaxed">
          Welcome to Day-0 of learning Product Management from scratch!
        </p>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Product Management is one of the most competitive and rewarding careers today. But breaking into PM without prior experience can feel overwhelming because the role demands:
        </p>
        <ul className="space-y-1.5 text-xs sm:text-sm font-bold text-zinc-700 list-disc pl-5">
          <li>Cross-functional collaboration</li>
          <li>Strategic thinking & decision-making</li>
          <li>Problem-solving with ambiguity</li>
          <li>Understanding of business, design, tech & data</li>
        </ul>
        <p className="text-zinc-600 font-medium">
          Many aspiring PMs struggle not because they lack skills, but because they lack clarity of purpose and direction.
        </p>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Why Day-0 Matters
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Before learning “how to be a PM”, you must understand why you want to be a PM. PMs face pressure, ownership, ambiguity, and constant context switching — your motivation will keep you going when it gets hard.
        </p>
        <p className="text-zinc-600 font-medium">
          Understanding the reality of the role—not just the glamour—helps you evaluate:
        </p>
        <ul className="space-y-1.5 text-xs sm:text-sm font-bold text-zinc-700 list-disc pl-5">
          <li>Is the PM role aligned with your strengths & interests?</li>
          <li>Do you enjoy solving problems and talking to users?</li>
          <li>Are you comfortable making decisions without perfect data?</li>
        </ul>
        <p className="text-zinc-600 font-medium">
          The fastest way to answer these questions is to talk to real PMs, understand their challenges, impact, and day-to-day responsibilities.
        </p>
      </section>

      <section className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-2.5 flex items-center gap-3">
          <Lightbulb className="text-amber-500" />
          Reflection Exercise
        </h2>
        <p className="text-sm font-bold text-zinc-600 mb-4">
          Write answers to this question: Why do I want to become a Product Manager?
        </p>
        <p className="font-black text-indigo-600 italic">
          Clarity today will drive consistency tomorrow.
        </p>
      </section>

            <CornsilkSection
        title="Strategic Mindset Transformations for Day 0"
        titleColor="blue"
        items={[
                {
                          "subtitle": "Clarity of Purpose",
                          "headerColor": "blue",
                          "description": "Clarify your foundational 'Why' to navigate ambiguous roadmaps, shifting team priorities, and high-stakes trade-offs with unshakeable resilience."
                },
                {
                          "subtitle": "Customer-First Alignment",
                          "headerColor": "red",
                          "description": "Pivot your focus away from vanity feature delivery toward deep customer empathy, quantifiable user pain points, and measurable business outcomes."
                },
                {
                          "subtitle": "Influence Without Authority",
                          "headerColor": "blue",
                          "description": "Master cross-functional persuasion by asking high-leverage questions, aligning diverse perspectives, and driving organizational clarity."
                }
      ]}
      />

      <section className="bg-indigo-50 rounded-2xl p-4 sm:p-5 border border-indigo-100 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2.5 relative z-10">
          <div className="p-3 bg-indigo-600 rounded-xl shadow-md">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-black text-xl text-indigo-900 tracking-tighter text-left">Day's Assignment</h3>
        </div>
        <div className="space-y-6 text-zinc-700 leading-relaxed relative z-10 text-base">
          <div>
            <h4 className="font-black text-indigo-900 mb-2">Assignment</h4>
            <h5 className="font-black text-indigo-900 mb-2 underline decoration-indigo-200 underline-offset-4">Task 1 — Must Do Today</h5>
            <p className="font-medium">Reach out to 5 Product Managers and ask them about their journey & role.</p>
            <p className="font-medium">Use LinkedIn, alumni networks, or company communities.</p>
          </div>
          <div className="pt-4 border-t border-indigo-200">
            <p className="font-black text-indigo-900 uppercase text-xs tracking-widest mb-2">Goal</p>
            <p className="font-medium">Collect insights and note patterns. This will guide your expectations.</p>
          </div>
        </div>
      </section>

      <div className="pt-3.5 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p className="flex items-center gap-2"></p>
      </div>
    </div>
  );
};

export default Day0Content;
