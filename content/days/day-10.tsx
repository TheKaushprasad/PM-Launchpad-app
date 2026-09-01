import { CornsilkSection } from '../../components/CornsilkSection';

import React from 'react';
import { 
  Target, CheckCircle, MessageSquare, Zap, Search, 
  Layers, Lightbulb, Activity, Users, Star, 
  HelpCircle, Bot, FileText, Sparkles, MonitorPlay
} from 'lucide-react';

export const Day10Content = () => {
  return (
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-blue-50/70 p-3.5 sm:p-4 rounded-xl border border-blue-100/80">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Research</span>
          <p className="text-sm sm:text-base font-medium text-blue-900 leading-relaxed italic">
            “If you listen carefully, your users will write your roadmap for you.”
          </p>
          <p className="text-sm font-bold text-purple-700">
            Yesterday we explored target segments. Today we learn how to validate insights through real conversations and structured feedback.
          </p>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Conduct structured discovery interviews",
            "Design clear & unbiased surveys",
            "Identify recurring pain themes",
            "Synthesize insights using AI tools"
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-zinc-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Users className="text-indigo-600" />
          1. Why User Interviews Matter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3.5">
          {[
            { 
              title: "Deep 'Why'", 
              desc: "Understand user motivation beyond what behavioral data shows.",
              icon: Search
            },
            { 
              title: "Assumptions", 
              desc: "Validate high-risk assumptions early before spending engineering resources.",
              icon: Zap
            },
            { 
              title: "Unspoken Needs", 
              desc: "Discover emotional triggers and pain points users didn't mention.",
              icon: Lightbulb
            },
            { 
              title: "Empathy", 
              desc: "Build genuine intuition for the user's daily life and environment.",
              icon: Star
            }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm flex flex-col gap-3">
               <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-indigo-600 shadow-inner">
                 <item.icon className="w-5 h-5" />
               </div>
               <h4 className="font-black text-zinc-900">{item.title}</h4>
               <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-4 sm:p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
           <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Example: Insight to Feature</h4>
           <p className="text-sm font-bold text-zinc-700 italic border-l-4 border-emerald-500 pl-4">
             "I want to feel progress even if I study for 5 minutes."
           </p>
           <p className="text-xs font-black text-indigo-600 mt-3">
             → Inspired Duolingo's Streak system, now a core retention driver.
           </p>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <MessageSquare className="text-indigo-600" />
          2. Types of Interview Questions
        </h2>
        <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-medium border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="py-4 px-6 font-black text-zinc-900">Type</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Example</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Behavioral (Past)</td>
                  <td className="py-4 px-6">“Tell me about the last time you ordered food.”</td>
                  <td className="py-4 px-6">Habit Analysis</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Attitudinal (Feelings)</td>
                  <td className="py-4 px-6">“What frustrates you most about your current apps?”</td>
                  <td className="py-4 px-6">Pain Discovery</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-zinc-900">Aspirational (Future)</td>
                  <td className="py-4 px-6">“What would make your experience 10x better?”</td>
                  <td className="py-4 px-6">Ideation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex items-center gap-3">
           <Zap className="w-5 h-5 text-indigo-600" />
           <p className="text-sm font-bold text-indigo-900">Golden Rule: No leading questions. Don't ask "Wouldn't it be better if...?" Ask "How do you feel about...?"</p>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Activity className="text-indigo-600" />
          3. Interview Structure (15–20 min)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { id: 1, title: "Intro", desc: "Make the user comfortable. Explain purpose, emphasize there are no wrong answers." },
            { id: 2, title: "Context", desc: "Understand background. Ask about their current tools, role, and daily routine." },
            { id: 3, title: "Core Questions", desc: "Explore behaviors & pain. Deep dive into the specific problem area you're solving." },
            { id: 4, title: "Wrap Up", desc: "Final insights & referrals. Ask if they have anything to add or know someone else to talk to." }
          ].map((step, i) => (
            <div key={step.id} className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm text-center space-y-3">
               <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black mx-auto shadow-md">
                 {step.id}
               </div>
               <h4 className="font-black text-zinc-900 text-sm">{step.title}</h4>
               <p className="text-[10px] font-bold text-zinc-400 leading-tight">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
              <CornsilkSection
        title="Actionable User Interview & Survey Techniques"
        titleColor="blue"
        items={[
                {
                          "subtitle": "The Mom Test Protocol",
                          "headerColor": "red",
                          "description": "Ask strictly about past behaviors and concrete actions rather than hypothetical opinions or future promises to extract unfiltered customer truth."
                },
                {
                          "subtitle": "Survey Design & Sampling",
                          "headerColor": "blue",
                          "description": "Craft concise, unbiased survey questions with clear Likert and open-ended splits, targeting representative user cohorts to avoid sample skew."
                },
                {
                          "subtitle": "Synthesis & Pattern Clustering",
                          "headerColor": "red",
                          "description": "Group qualitative interview quotes into affinity maps and recurring themes to uncover root pain points and validate core product assumptions."
                }
      ]}
      />

        <div className="bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-sm">
           <h2 className="text-lg md:text-xl font-black text-zinc-900 mb-2.5">Survey Principles</h2>
           <ul className="space-y-3">
              {[
                "Ask one thing per question",
                "Avoid biased wording",
                "Mix question types (MCQ + scale)",
                "Keep it under 10 questions"
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-center text-sm font-bold text-zinc-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  {item}
                </li>
              ))}
           </ul>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Sparkles className="text-indigo-600" />
          4. Synthesizing Insights
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          After 5–10 interviews, group similar issues into actionable themes.
        </p>
        
        <div className="p-4 sm:p-5 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 md:gap-4">
              <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">The Pain</p>
                 <p className="text-sm font-bold text-zinc-900 italic">"I forget my fitness goals midweek."</p>
                 <p className="text-xs font-black text-zinc-400 mt-2">→ Motivation Drop</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Feature Opportunity</p>
                 <p className="text-sm font-bold text-zinc-900">AI Reminder Coach</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Value Proposition</p>
                 <p className="text-xs font-bold text-zinc-500 leading-relaxed">
                   Contextual nudges based on historical low-activity days.
                 </p>
              </div>
           </div>
        </div>
      </section>

      <div className="pt-3.5 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day10Content;
