
import React from 'react';
import { 
  Target, CheckCircle, Search, Layers, Activity, Users, 
  MessageSquare, Bot, FileText, Zap, BarChart, TrendingUp, 
  SearchCode, Globe, Cpu, Lightbulb, Compass, MonitorPlay, Sparkles,
  // Added HeartHandshake to fix the error on line 173
  HeartHandshake
} from 'lucide-react';

export const Day9Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 9: Introduction to User & Market Research 🚀</h1>
      
      <section className="bg-purple-50 p-10 rounded-[3rem] border border-purple-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Research</span>
          <p className="text-lg font-medium text-purple-900 leading-relaxed italic">
            “Great products start with deep understanding — of users, their needs, and the market around them.”
          </p>
          <p className="text-sm font-bold text-purple-700">
            Today’s focus is to think like a researcher, not a builder. You’ll learn how to identify who your users are, what they struggle with, and why solving it matters.
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
            "Explain the difference between user research and market research",
            "Identify user pain points using qualitative and quantitative methods",
            "Apply basic frameworks — Empathy Map, JTBD, and Segmentation",
            "Use AI tools to accelerate research synthesis"
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
          <Layers className="text-indigo-600" />
          1. User Research vs Market Research
        </h2>
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-medium border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="py-4 px-6 font-black text-zinc-900">Aspect</th>
                  <th className="py-4 px-6 font-black text-zinc-900">User Research</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Market Research</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Focus</td>
                  <td className="py-4 px-6">Individual behaviors & pain points</td>
                  <td className="py-4 px-6">Industry, competitors, trends</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Goal</td>
                  <td className="py-4 px-6">Validate Problem</td>
                  <td className="py-4 px-6">Validate Opportunity</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Methods</td>
                  <td className="py-4 px-6">Interviews, surveys, usability tests</td>
                  <td className="py-4 px-6">Desk research, benchmarking</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-zinc-900">Output</td>
                  <td className="py-4 px-6">Personas, Journey Maps</td>
                  <td className="py-4 px-6">TAM/SAM/SOM, SWOT</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-center gap-3">
           <Lightbulb className="w-5 h-5 text-indigo-600" />
           <p className="text-sm font-bold text-indigo-900">PM Tip: Always start with user research before market research. If users don’t want it, market data doesn’t matter.</p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Activity className="text-indigo-600" />
          2. The Research Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            { id: 1, title: "Define Objective", desc: "“What do I want to learn?”", icon: Target },
            { id: 2, title: "Choose Method", desc: "Interviews, surveys, or secondary.", icon: Compass },
            { id: 3, title: "Recruit Users", desc: "Identify your target segments.", icon: Users },
            { id: 4, title: "Collect Data", desc: "Ask open-ended questions.", icon: MessageSquare },
            { id: 5, title: "Synthesize", desc: "Identify themes and insights.", icon: Sparkles }
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

      <section className="space-y-12">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-indigo-600" />
          3. Research Frameworks
        </h2>

        <div className="space-y-8">
          <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-200">
             <h3 className="text-xl font-black text-zinc-900 mb-6">Empathy Map</h3>
             <p className="text-sm font-bold text-zinc-500 mb-8">Map out what users: Says, Does, Thinks, and Feels.</p>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white rounded-2xl border border-zinc-100 text-center shadow-sm">
                   <span className="text-[10px] font-black uppercase text-indigo-500 mb-2 block">SAYS</span>
                   <p className="text-xs font-medium text-zinc-400">Verbal expressions</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-zinc-100 text-center shadow-sm">
                   <span className="text-[10px] font-black uppercase text-rose-500 mb-2 block">DOES</span>
                   <p className="text-xs font-medium text-zinc-400">Behaviors observed</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-zinc-100 text-center shadow-sm">
                   <span className="text-[10px] font-black uppercase text-emerald-500 mb-2 block">THINKS</span>
                   <p className="text-xs font-medium text-zinc-400">Internal thoughts</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-zinc-100 text-center shadow-sm">
                   <span className="text-[10px] font-black uppercase text-amber-500 mb-2 block">FEELS</span>
                   <p className="text-xs font-medium text-zinc-400">Emotional state</p>
                </div>
             </div>
          </div>

          <div className="bg-zinc-900 text-white p-10 rounded-[2.5rem] border-t-8 border-indigo-500">
             <h3 className="text-xl font-black mb-2">Jobs To Be Done (JTBD)</h3>
             <p className="text-zinc-400 font-medium mb-8">“People don’t buy products; they hire them to get a job done.”</p>
             <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                   <p className="text-lg font-black italic text-indigo-200 tracking-tight">"When I... (situation)"</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                   <p className="text-lg font-black italic text-indigo-200 tracking-tight">"I want to... (motivation)"</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                   <p className="text-lg font-black italic text-indigo-200 tracking-tight">"So I can... (desired outcome)"</p>
                </div>
             </div>
             <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/10 italic text-xs font-bold text-zinc-500">
                Example: hiring Duolingo to feel productive while waiting.
             </div>
          </div>

          <div className="space-y-6">
             <h3 className="text-xl font-black text-zinc-900">Segmentation Strategies</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Demographics", desc: "Age, gender, location, income.", icon: Users },
                  { title: "Psychographics", desc: "Motivations, lifestyle, values.", icon: HeartHandshake },
                  { title: "Behavior", desc: "Usage freq, loyalty, spending.", icon: Zap },
                  { title: "Needs-Based", desc: "Specific pain points & goals.", icon: Target }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-2">
                     <h4 className="font-black text-zinc-900">{item.title}</h4>
                     <p className="text-[10px] font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Bot className="text-indigo-600" />
          Tools & AI Assistants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { title: "Interview Prep", tool: "ChatGPT", use: "“Generate 10 questions for student productivity challenges.”", icon: MessageSquare },
             { title: "Competitor Scan", tool: "Perplexity AI", use: "Real-time deep competitive analysis and market data.", icon: Globe },
             { title: "Synthesis", tool: "Notion AI", use: "Summarize key pain points from long interview transcripts.", icon: FileText },
             { title: "Visualization", tool: "Canva", use: "Create visually compelling user personas.", icon: MonitorPlay }
           ].map((item, i) => (
             <div key={i} className="flex gap-4 p-6 bg-zinc-50 rounded-3xl border border-zinc-100 items-start">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-zinc-900 mb-1">{item.title}: <span className="text-indigo-600">{item.tool}</span></h4>
                  <p className="text-xs font-bold text-zinc-500 italic leading-relaxed">{item.use}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <BarChart className="text-indigo-600" />
          Real-World Case: Zomato One-Tap
        </h2>
        <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Pain Point", text: "“Hungry but don't want to call restaurants or search again.”", color: "text-rose-500" },
                { label: "Method", text: "Surveys & Usage Data Analysis", color: "text-indigo-500" },
                { label: "Insight", text: "Users repeat specific orders 60% of the time.", color: "text-emerald-500" },
                { label: "Outcome", text: "1-Tap Reordering feature launched → Orders ↑ 22%", color: "text-amber-500" }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                   <p className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.label}</p>
                   <p className="text-sm font-bold text-zinc-900 leading-tight">{item.text}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-12 rounded-[3.5rem] space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10"><SearchCode className="w-24 h-24 text-indigo-400" /></div>
        <h2 className="text-2xl font-black text-indigo-400">Research Drill</h2>
        <div className="space-y-6">
           <div className="flex gap-4 items-start bg-white/5 p-6 rounded-3xl border border-white/10">
              <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black shrink-0">1</span>
              <p className="text-sm font-bold leading-relaxed text-zinc-300">
                Use ChatGPT to generate 5 open-ended interview questions for your idea.
              </p>
           </div>
           <div className="flex gap-4 items-start bg-white/5 p-6 rounded-3xl border border-white/10">
              <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black shrink-0">2</span>
              <p className="text-sm font-bold leading-relaxed text-zinc-300">
                Document these in your workspace and highlight the top 3 themes you expect to uncover.
              </p>
           </div>
        </div>
        <blockquote className="pt-8 border-t border-white/10">
            <p className="text-lg font-black tracking-tight leading-relaxed italic text-indigo-300">
              Reflect: “What might surprise you about how real users respond vs your assumptions?”
            </p>
        </blockquote>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day9Content;
