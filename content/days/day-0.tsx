import React from 'react';
import { Target, CheckCircle, Users, Lightbulb, Zap, ArrowRight, Star } from 'lucide-react';

export const Day0Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day-0: Foundation & Mindset — Start Your PM Journey Right 🚀</h1>
      
      <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
          <p className="text-lg font-medium text-blue-900 leading-relaxed">
            Start Your PM Journey Right. Before we jump into frameworks, tools, and case studies, today is about building the right mindset.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <p className="text-zinc-600 font-medium leading-relaxed">
          Welcome to Day-0 of learning Product Management from scratch!
        </p>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Product Management is one of the most competitive and rewarding careers today. But breaking into PM without prior experience can feel overwhelming because the role demands:
        </p>
        <ul className="space-y-3 text-sm font-bold text-zinc-700 list-disc pl-5">
          <li>Cross-functional collaboration</li>
          <li>Strategic thinking & decision-making</li>
          <li>Problem-solving with ambiguity</li>
          <li>Understanding of business, design, tech & data</li>
        </ul>
        <p className="text-zinc-600 font-medium">
          Many aspiring PMs struggle not because they lack skills, but because they lack clarity of purpose and direction.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Why Day-0 Matters
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Before learning “how to be a PM”, you must understand why you want to be a PM. PMs face pressure, ownership, ambiguity, and constant context switching — your motivation will keep you going when it gets hard.
        </p>
        <p className="text-zinc-600 font-medium">
          Understanding the reality of the role—not just the glamour—helps you evaluate:
        </p>
        <ul className="space-y-3 text-sm font-bold text-zinc-700 list-disc pl-5">
          <li>Is the PM role aligned with your strengths & interests?</li>
          <li>Do you enjoy solving problems and talking to users?</li>
          <li>Are you comfortable making decisions without perfect data?</li>
        </ul>
        <p className="text-zinc-600 font-medium">
          The fastest way to answer these questions is to talk to real PMs, understand their challenges, impact, and day-to-day responsibilities.
        </p>
      </section>

      <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
          <Lightbulb className="text-amber-500" />
          Reflection Exercise
        </h2>
        <p className="text-sm font-bold text-zinc-600 mb-4">
          Write answers to this question:
          <br />
          Why do I want to become a Product Manager?
        </p>
        <p className="font-black text-indigo-600 italic">
          Clarity today will drive consistency tomorrow.
        </p>
      </section>

      <section className="bg-zinc-900 text-white p-10 rounded-[3rem]">
        <h2 className="text-2xl font-black mb-8 text-indigo-400">Outcome of Day-0</h2>
        <p className="text-zinc-400 font-medium mb-6">By the end of today, you should have:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Real understanding of what PM is",
            "Motivation aligned with reality",
            "Early networking with professionals",
            "A clear starting point for the course"
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-center bg-white/5 p-4 rounded-2xl border border-white/10">
              <Zap className="w-5 h-5 text-indigo-400 shrink-0" />
              <p className="text-xs font-bold text-zinc-300">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="p-3 bg-indigo-600 rounded-xl shadow-md">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-black text-xl text-indigo-900 tracking-tighter text-left">Day's Assignment</h3>
        </div>
        <div className="space-y-6 text-zinc-700 leading-relaxed relative z-10 text-base">
          <div>
            <h4 className="font-black text-indigo-900 mb-2 underline decoration-indigo-200 underline-offset-4">Task 1 — Must Do Today</h4>
            <p className="font-medium">Reach out to 5 Product Managers and ask them about their journey & role.</p>
            <p className="font-medium">Use LinkedIn, alumni networks, or company communities.</p>
          </div>
          <div className="pt-4 border-t border-indigo-200">
            <p className="font-black text-indigo-900 uppercase text-xs tracking-widest mb-2">Goal</p>
            <p className="font-medium">Collect insights and note patterns. This will guide your expectations.</p>
          </div>
        </div>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p className="flex items-center gap-2">Up Next: What is Product Management? <ArrowRight className="w-3 h-3" /></p>
      </div>
    </div>
  );
};

export default Day0Content;