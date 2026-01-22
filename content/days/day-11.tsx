
import React from 'react';
import { 
  Target, CheckCircle, Search, Layers, Activity, Users, 
  MessageSquare, Bot, FileText, Zap, BarChart, TrendingUp, 
  Sparkles, MonitorPlay, HeartHandshake, Smile, Layout, Database,
  History, Clock, Lightbulb, UserCircle
} from 'lucide-react';

export const Day11Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 11: User Personas & JTBD 🚀</h1>
      
      <section className="bg-purple-50 p-10 rounded-[3rem] border border-purple-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Research</span>
          <p className="text-lg font-medium text-purple-900 leading-relaxed italic">
            “You don’t design for everyone — you design for someone.”
          </p>
          <p className="text-sm font-bold text-purple-700">
            Yesterday we captured raw feedback. Today we turn that data into structured, usable insights.
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
            "Build realistic user personas based on real data",
            "Write JTBD statements that reflect true motivations",
            "Use personas to guide feature & UX decisions",
            "Apply AI tools to accelerate synthesis"
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
          <Activity className="text-indigo-600" />
          1. From Research → Insights → Personas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 1, title: "Clustering", desc: "Group similar behaviors and motivations from Day-8 transcripts.", icon: Layers },
            { id: 2, title: "Identification", desc: "Find recurring pain points and primary goals across clusters.", icon: Search },
            { id: 3, title: "Narrative", desc: "Write a short, human-centric story for each segment.", icon: FileText }
          ].map((step) => (
            <div key={step.id} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
               <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-indigo-600 shadow-inner">
                 <step.icon className="w-5 h-5" />
               </div>
               <h4 className="font-black text-zinc-900">Step {step.id}: {step.title}</h4>
               <p className="text-xs font-bold text-zinc-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-medium border-collapse">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="py-4 px-6 font-black text-zinc-900">User Quote</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Persona Name</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Core Insight</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <tr className="border-b border-zinc-100">
                  <td className="py-4 px-6 italic text-zinc-500">“I start strong but can’t stay consistent.”</td>
                  <td className="py-4 px-6 font-bold text-zinc-900">Motivated Starter</td>
                  <td className="py-4 px-6">Needs daily accountability loops</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 italic text-zinc-500">“I want data to track my progress.”</td>
                  <td className="py-4 px-6 font-bold text-zinc-900">Data-Driven Achiever</td>
                  <td className="py-4 px-6">Needs progress visualizations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-center gap-3">
           <Lightbulb className="w-5 h-5 text-indigo-600" />
           <p className="text-sm font-bold text-indigo-900">Best Practice: 2–3 meaningful personas are better than 8–10 generic ones.</p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <UserCircle className="text-indigo-600" />
          2. Persona Template
        </h2>
        
        <div className="p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
             <Users className="w-48 h-48 text-indigo-600" />
           </div>
           
           <div className="relative z-10 space-y-8">
              <div className="flex flex-col md:flex-row md:items-end gap-6 border-b border-zinc-100 pb-8">
                 <div className="w-24 h-24 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600">
                    <Smile className="w-12 h-12" />
                 </div>
                 <div>
                    <h3 className="text-3xl font-black text-zinc-900 leading-none mb-2">Rahul</h3>
                    <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Rahul Sharma, 27 • Software Engineer</p>
                 </div>
              </div>

              <blockquote className="text-xl font-black italic text-zinc-700 border-l-4 border-indigo-500 pl-6">
                “I need a coach who reminds me daily.”
              </blockquote>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Bio</h4>
                       <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                         Works long hours; highly motivated to stay fit but misses consistency due to exhaustion.
                       </p>
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Goals</h4>
                       <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                         Build a long-term habit and see measurable physical results.
                       </p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Frustrations</h4>
                       <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                         Lack of personalized accountability; generalized tools don't adapt to his schedule.
                       </p>
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Tech Comfort</h4>
                       <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                         High. Owns a Garmin smartwatch and uses multiple trackers.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        <div className="text-center text-xs font-bold text-zinc-400 italic">
          Tip: Add emotion — Personas should feel human, not just like data points.
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-indigo-600" />
          3. Jobs To Be Done (JTBD) Framework
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Users don’t buy products. They hire them to get a job done.
        </p>

        <div className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-indigo-500">
           <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-6">The Template</h4>
           <div className="space-y-6">
              <p className="text-2xl font-black tracking-tighter leading-tight italic text-zinc-300">
                When I <span className="text-indigo-400">situation</span>,
              </p>
              <p className="text-2xl font-black tracking-tighter leading-tight italic text-zinc-300">
                I want to <span className="text-indigo-400">motivation</span>,
              </p>
              <p className="text-2xl font-black tracking-tighter leading-tight italic text-zinc-300">
                So I can <span className="text-indigo-400">achieve my desired outcome</span>.
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { name: "Duolingo", job: "When I have free time, I want quick practice, so I feel productive." },
             { name: "Notion", job: "When I start a project, I want everything in one place, so I stay organized." },
             { name: "Swiggy", job: "When I’m tired, I want fast ordering, so I can relax without effort." }
           ].map((item, i) => (
             <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
                <h4 className="font-black text-zinc-900">{item.name}</h4>
                <p className="text-xs font-bold text-zinc-500 leading-relaxed">"{item.job}"</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Sparkles className="text-indigo-600" />
          4. Connecting Personas → JTBD → Features
        </h2>
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-medium border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="py-4 px-6 font-black text-zinc-900">Persona</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Job To Be Done</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Feature Idea</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Motivated Starter</td>
                  <td className="py-4 px-6">Stay consistent even when busy</td>
                  <td className="py-4 px-6 text-indigo-600 font-black">AI habit reminders + streaks</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Data Achiever</td>
                  <td className="py-4 px-6">Track measurable progress</td>
                  <td className="py-4 px-6 text-indigo-600 font-black">Analytics dashboard</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-zinc-900">Social Sharer</td>
                  <td className="py-4 px-6">Celebrate success publicly</td>
                  <td className="py-4 px-6 text-indigo-600 font-black">Leaderboards & badges</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900 text-white p-10 rounded-[2.5rem] border-t-8 border-indigo-500 relative overflow-hidden">
          <Bot className="absolute top-4 right-4 w-12 h-12 text-white/10" />
          <h2 className="text-2xl font-black text-indigo-400 mb-6">AI Accelerator</h2>
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Synthesis Prompt</p>
            <p className="text-lg font-black italic text-zinc-300 leading-tight">
              “You are a Product Manager summarizing 10 interview transcripts about study habits. Group user patterns into 2-3 personas and write JTBD statements for each.”
            </p>
            <div className="flex gap-3 pt-2">
              <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold text-zinc-400">ChatGPT</span>
              <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold text-zinc-400">Notion AI</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-zinc-100 p-10 rounded-[2.5rem] shadow-sm space-y-6">
           <h2 className="text-2xl font-black text-zinc-900 mb-4">Spotify Case Study</h2>
           <div className="space-y-4">
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                 <h4 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-1">Music Explorer</h4>
                 <p className="text-xs font-bold text-zinc-500 italic">“Give me music for my mood instantly”</p>
                 <p className="text-xs font-black text-indigo-600 mt-2">→ Discover Weekly</p>
              </div>
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                 <h4 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-1">Loyal Listener</h4>
                 <p className="text-xs font-bold text-zinc-500 italic">“Save songs automatically for later”</p>
                 <p className="text-xs font-black text-indigo-600 mt-2">→ Liked Songs Library</p>
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

export default Day11Content;
