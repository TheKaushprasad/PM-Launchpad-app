import React from 'react';
import { 
  Target, CheckCircle, Zap, Brain, Terminal, 
  MessageSquare, MonitorPlay, ExternalLink, Info,
  Lightbulb, Sparkles, Layout, List, Search
} from 'lucide-react';

export const Day30Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 30: Prompt Engineering for Product Managers 🚀</h1>
      
      <section className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">Today’s Goal</span>
          <p className="text-lg font-black text-orange-900 leading-relaxed">
            Learn how to write effective prompts so that large language models (LLMs) return useful, reliable, and actionable outputs — a must-have skill for product managers working with AI-enabled workflows, prototypes, and documentation.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <a 
              href="https://youtu.be/ysPbXH0LpIE?si=5Riv7IB9ezFAt_Kc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-900 transition-colors"
            >
              Prompting 101 Video <MonitorPlay className="w-4 h-4" />
            </a>
            <a 
              href="https://share.google/FdZPEVTPVCkN85d33" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-900 transition-colors"
            >
              AWS Prompt Engineering Foundation (with Certificate) <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <p className="text-sm font-bold text-zinc-500">By the end of Day 30, you will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Define prompt engineering and why it matters for PMs",
            "Structure prompts for clarity, context, and constraints",
            "Use prompting patterns (instructions, examples, chain-of-thought)",
            "Evaluate and refine prompts for consistency and accuracy",
            "Apply prompting to common PM tasks (user stories, specs, analyses)"
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-zinc-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Brain className="text-orange-600" />
          1. What Is Prompt Engineering?
        </h2>
        <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
          <p className="text-sm font-medium text-zinc-600 leading-relaxed">
            Prompt Engineering is the practice of crafting inputs (prompts) so that a language model produces outputs that are:
          </p>
          <div className="flex flex-wrap gap-3">
            {['Relevant', 'Accurate', 'Actionable'].map((word) => (
              <span key={word} className="px-4 py-2 bg-orange-50 text-orange-700 rounded-xl text-xs font-black uppercase tracking-wider border border-orange-100 shadow-sm">
                {word}
              </span>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">For PMs, prompt engineering accelerates:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Ideation", icon: Lightbulb },
                { title: "Specification writing", icon: Terminal },
                { title: "Data interpretation", icon: Layout },
                { title: "User research synthesis", icon: UsersIcon },
                /* Fix: Added missing Search icon import above to resolve line 87 error */
                { title: "Competitive analysis", icon: Search }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 shadow-sm">
                   <item.icon className="w-4 h-4 text-orange-600 shrink-0" />
                   <span className="text-xs font-bold text-zinc-700">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-orange-500">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-400">🧠 Insight</h4>
            <p className="text-lg font-black italic text-zinc-300 leading-relaxed">
              "It’s not about memorizing commands — it’s about clear thinking expressed as structured instructions."
            </p>
          </div>
        </div>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

// Added missing standard components for consistency with icons
const UsersIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default Day30Content;