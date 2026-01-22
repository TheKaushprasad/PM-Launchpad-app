
import React from 'react';
import { 
  Target, CheckCircle, Lightbulb, Zap, Brain, Eye, 
  Layers, Search, Users, Activity, Briefcase, HeartHandshake, Compass, 
  Smartphone, Beaker, HelpCircle, AlertTriangle
} from 'lucide-react';

export const Day4Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 4: Product Sense: The PM Sixth Sense 🚀</h1>
      
      <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
          <p className="text-lg font-medium text-blue-900 leading-relaxed italic">
            "Great PMs don’t build features. They solve meaningful problems. Master the 'sixth sense' of Product Management."
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Brain className="text-indigo-600" />
          What is Product Sense?
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Product sense is the ability to see through complexity and spot the user needs that matter most. Experts like Marty Cagan emphasize that it is deep product knowledge built through immersion, not an innate gift.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-indigo-600" />
          The 7 Pillars of Product Sense
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Empathy & Customer Needs",
              desc: "Listening for spoken and unspoken pain points and emotional drivers.",
              icon: HeartHandshake
            },
            {
              title: "Market & Competitive Insight",
              desc: "Analyzing trends and mapping competitor gaps to find unique value.",
              icon: Search
            },
            {
              title: "Design & UX Perspective",
              desc: "Recognizing good flows and how design decisions affect engagement.",
              icon: Smartphone
            },
            {
              title: "Problem Framing & Mapping",
              desc: "Distinguishing root causes from symptoms and exploring options.",
              icon: Compass
            },
            {
              title: "Feasibility & Execution",
              desc: "Balancing ambitious ideas with tech constraints, budgets, and timelines.",
              icon: Activity
            },
            {
              title: "Iteration & Validation",
              desc: "Using prototypes and experiments to adjust based on real data.",
              icon: Beaker
            },
            {
              title: "Domain Immersion",
              desc: "Gaining deep knowledge of a space to predict behaviors and outcomes.",
              icon: Eye
            }
          ].map((pillar, i) => (
            <div key={i} className="p-6 bg-white border border-zinc-100 rounded-[2rem] shadow-sm space-y-3 group hover:border-indigo-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <pillar.icon className="w-5 h-5" />
              </div>
              <h3 className="font-black text-zinc-900">{pillar.title}</h3>
              <p className="text-xs font-bold text-zinc-500 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-indigo-600" />
          Why Aspiring PMs Must Master It
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "A Key Hiring Criterion", desc: "Most companies test for product sense during interviews to see if you can analyze products meaningfully.", icon: Briefcase },
            { title: "Bridges Strategy and Execution", desc: "Ties small features to the 'bigger picture' and strategic goals.", icon: Target },
            { title: "Anticipates User Behavior", desc: "Sense unarticulated needs before competitors (e.g., Original iPhone, Gmail).", icon: Eye },
            { title: "Stakeholder Alignment", desc: "Provides the rationale needed to explain trade-offs to engineers and execs.", icon: Users }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-6 bg-zinc-50 rounded-3xl border border-zinc-100 items-start">
               <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                 <item.icon className="w-5 h-5" />
               </div>
               <div>
                 <h4 className="font-black text-zinc-900 mb-1">{item.title}</h4>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <RefreshCcw className="text-indigo-600" />
          Daily Habits to Build Instincts
        </h2>
        <div className="space-y-4">
          {[
            { habit: "Talk to Users Regularly", action: "Read tickets, join sales calls, and observe context surveys miss.", icon: Users },
            { habit: "Reverse-Engineer Products", action: "Break down apps like Airbnb to understand core needs and trade-offs.", icon: Layers },
            { habit: "Perform Product Drills", action: "List 3 strengths and 3 weaknesses of a daily-use app with justifications.", icon: Activity },
            { habit: "Embrace Constraints", action: "Design solutions under strict limits (e.g., 30s onboarding) to sharpen judgment.", icon: Target }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-6 p-6 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
               <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-inner">
                 <item.icon className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-black text-zinc-900 mb-1">{item.habit}</h4>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed">{item.action}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-12 rounded-[3.5rem] space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10"><HelpCircle className="w-24 h-24 text-indigo-400" /></div>
        <h2 className="text-2xl font-black text-indigo-400">Ace the Product Sense Interview</h2>
        <p className="text-zinc-400 font-medium">Hiring managers look for clarity, empathy, and reasoning rather than just a "correct" answer.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            "Frame the problem clearly before jumping to solutions.",
            "Identify specific user segments and their unique pains.",
            "Propose solutions with a rationale, explaining the hypothesis.",
            "Discuss trade-offs—be prepared to answer, 'Who suffers if we cut this feature?'."
          ].map((tip, i) => (
            <div key={i} className="flex gap-4 items-start">
               <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{i+1}</div>
               <p className="text-sm font-bold leading-relaxed text-zinc-300">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <AlertTriangle className="text-rose-500" />
          Common Pitfalls to Avoid
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Over-reliance on 'Gut'", desc: "Instincts must be tempered by data; ignoring analytics is dangerous unless honed by experience." },
            { title: "The Aesthetic Trap", desc: "Don't mistake polished UI for good product sense; a beautiful design solving the wrong problem is a failure." },
            { title: "Domain Overfitting", desc: "Don't assume a playbook from one industry will automatically work in another." },
            { title: "Feature Bloat", desc: "Weak sense leads to 'copying competitors,' resulting in a bloated product that fails real problems." }
          ].map((pitfall, i) => (
            <div key={i} className="p-8 bg-rose-50 border border-rose-100 rounded-[2.5rem] space-y-2">
              <h4 className="font-black text-rose-900">{pitfall.title}</h4>
              <p className="text-sm font-medium text-rose-700/80 leading-relaxed">{pitfall.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

import { RefreshCcw } from 'lucide-react';
export default Day4Content;
