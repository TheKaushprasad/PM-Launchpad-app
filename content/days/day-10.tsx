
import React from 'react';
import { 
  Target, CheckCircle, MessageSquare, Zap, Search, 
  Layers, Lightbulb, Activity, Users, Star, 
  HelpCircle, Bot, FileText, Sparkles, MonitorPlay
} from 'lucide-react';

export const Day10Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 10: User Interviews & Surveys 🚀</h1>
      
      <section className="bg-purple-50 p-10 rounded-[3rem] border border-purple-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Research</span>
          <p className="text-lg font-medium text-purple-900 leading-relaxed italic">
            “If you listen carefully, your users will write your roadmap for you.”
          </p>
          <p className="text-sm font-bold text-purple-700">
            Yesterday we explored target segments. Today we learn how to validate insights through real conversations and structured feedback.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
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

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Users className="text-indigo-600" />
          1. Why User Interviews Matter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm flex flex-col gap-3">
               <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-indigo-600 shadow-inner">
                 <item.icon className="w-5 h-5" />
               </div>
               <h4 className="font-black text-zinc-900">{item.title}</h4>
               <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100">
           <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Example: Insight to Feature</h4>
           <p className="text-sm font-bold text-zinc-700 italic border-l-4 border-emerald-500 pl-4">
             "I want to feel progress even if I study for 5 minutes."
           </p>
           <p className="text-xs font-black text-indigo-600 mt-3">
             → Inspired Duolingo's Streak system, now a core retention driver.
           </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <MessageSquare className="text-indigo-600" />
          2. Types of Interview Questions
        </h2>
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm overflow-hidden">
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
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-center gap-3">
           <Zap className="w-5 h-5 text-indigo-600" />
           <p className="text-sm font-bold text-indigo-900">Golden Rule: No leading questions. Don't ask "Wouldn't it be better if...?" Ask "How do you feel about...?"</p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
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
            <div key={step.id} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm text-center space-y-3">
               <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black mx-auto shadow-md">
                 {step.id}
               </div>
               <h4 className="font-black text-zinc-900 text-sm">{step.title}</h4>
               <p className="text-[10px] font-bold text-zinc-400 leading-tight">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900 text-white p-10 rounded-[2.5rem] border-t-8 border-indigo-500 relative overflow-hidden">
          <Bot className="absolute top-4 right-4 w-12 h-12 text-white/10" />
          <h2 className="text-2xl font-black text-indigo-400 mb-6">AI Accelerator</h2>
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Synthesis Prompt</p>
            <p className="text-lg font-black italic text-zinc-300 leading-tight">
              "Summarize these interview transcripts into 3 distinct pain points and 3 desired outcomes."
            </p>
          </div>
        </div>

        <div className="bg-white border border-zinc-100 p-10 rounded-[2.5rem] shadow-sm">
           <h2 className="text-2xl font-black text-zinc-900 mb-6">Survey Principles</h2>
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

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Sparkles className="text-indigo-600" />
          4. Synthesizing Insights
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          After 5–10 interviews, group similar issues into actionable themes.
        </p>
        
        <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day10Content;
