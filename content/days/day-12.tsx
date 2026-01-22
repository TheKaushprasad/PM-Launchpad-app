
import React from 'react';
import { 
  Target, CheckCircle, Search, Layers, Activity, Users, 
  MessageSquare, Bot, FileText, Zap, BarChart, TrendingUp, 
  Sparkles, MonitorPlay, Globe, Layout, Database,
  History, Clock, Lightbulb, UserCircle, Briefcase, HelpCircle,
  TrendingDown, Box, ShieldCheck, PieChart, Info,
  // Fix: Add missing icons used in SWOT and AI sections
  AlertTriangle, SearchCode
} from 'lucide-react';

export const Day12Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 12: Competitive & Market Analysis 🚀</h1>
      
      <section className="bg-purple-50 p-10 rounded-[3rem] border border-purple-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Research</span>
          <p className="text-lg font-medium text-purple-900 leading-relaxed italic">
            “You can’t build a better product until you understand what already exists.”
          </p>
          <p className="text-sm font-bold text-purple-700">
            Today’s goal is to position your idea intelligently. Learn to identify market gaps — not by copying, but by identifying where competitors fall short.
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
            "Conduct structured competitive benchmarking",
            "Perform SWOT analysis for 2–3 competitors",
            "Identify feature gaps and differentiators",
            "Define your product's unique positioning statement"
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
          <Globe className="text-indigo-600" />
          1. Mapping the Landscape
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { 
               title: "Direct Competitors", 
               desc: "Same product, same target audience.", 
               example: "Habitica vs Streaks",
               icon: Target,
               color: "text-indigo-600",
               bgColor: "bg-indigo-50"
             },
             { 
               title: "Indirect Competitors", 
               desc: "Solve the same need differently.", 
               example: "Google Tasks vs Notion",
               icon: Layers,
               color: "text-emerald-600",
               bgColor: "bg-emerald-50"
             },
             { 
               title: "Aspirational", 
               desc: "Inspire UX or growth strategies.", 
               example: "Headspace for UI vibes",
               icon: Sparkles,
               color: "text-amber-600",
               bgColor: "bg-amber-50"
             }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${item.bgColor} flex items-center justify-center ${item.color} shadow-sm`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-zinc-900">{item.title}</h4>
                <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
                <div className="pt-2">
                   <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Example</p>
                   <p className="text-xs font-black text-zinc-700">{item.example}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] border-t-8 border-indigo-500 relative overflow-hidden group">
           <Bot className="absolute top-4 right-4 w-12 h-12 text-white/10 group-hover:text-white/20 transition-colors" />
           <div className="flex items-center gap-3 mb-4">
              <Zap className="text-indigo-400 w-5 h-5" />
              <h4 className="font-black text-indigo-400 text-sm uppercase tracking-widest">AI Hack</h4>
           </div>
           <p className="text-lg font-black italic text-zinc-300 leading-tight">
             Ask Perplexity AI: "List top 10 apps competing with [idea], include audience and unique features."
           </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <PieChart className="text-indigo-600" />
          2. Framework 1: SWOT Analysis
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           {[
             { title: "Strengths", desc: "What do they do well?", example: "Beautiful UI, gamified loop", icon: TrendingUp, color: "text-emerald-500", bgColor: "bg-emerald-50" },
             { title: "Weaknesses", desc: "Where do they fall short?", example: "Limited AI personalization", icon: TrendingDown, color: "text-rose-500", bgColor: "bg-rose-50" },
             { title: "Opportunities", desc: "What can we do better?", example: "Add AI coach habit nudges", icon: Lightbulb, color: "text-indigo-500", bgColor: "bg-indigo-50" },
             { title: "Threats", desc: "What could hurt us?", example: "Big tech (Apple) entry", icon: AlertTriangle, color: "text-amber-500", bgColor: "bg-amber-50" }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
                <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center ${item.color} shadow-inner`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-black text-zinc-900">{item.title}</h4>
                   <p className="text-xs font-medium text-zinc-400 mb-3">{item.desc}</p>
                   <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                      <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Example</p>
                      <p className="text-xs font-bold text-zinc-700 italic">"{item.example}"</p>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-950 text-white p-10 rounded-[3rem] border-t-8 border-indigo-500 space-y-8">
          <div className="flex items-center gap-3">
             <MessageSquare className="text-indigo-400 w-6 h-6" />
             <h2 className="text-2xl font-black text-indigo-400">AI Prompts for Strategy</h2>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
               <p className="text-sm font-bold text-zinc-300 italic leading-relaxed">
                 "Create a SWOT analysis for Fitbit and identify two strategic gaps a new product could exploit."
               </p>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
               <p className="text-sm font-bold text-zinc-300 italic leading-relaxed">
                 "Summarize the top 5 AI habit tracking apps in 2025, their core features, and pricing."
               </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-zinc-100 p-10 rounded-[3rem] shadow-sm space-y-8">
           <div className="flex items-center gap-3">
              <BarChart className="text-indigo-600 w-6 h-6" />
              <h2 className="text-2xl font-black text-zinc-900">Zerodha vs Groww</h2>
           </div>
           <div className="space-y-6">
              <div className="flex gap-4 items-start border-l-4 border-indigo-600 pl-6">
                 <div>
                    <h4 className="text-sm font-black text-zinc-900 mb-1">Zerodha Strength:</h4>
                    <p className="text-sm font-medium text-zinc-500">Advanced tools for Traders.</p>
                 </div>
              </div>
              <div className="flex gap-4 items-start border-l-4 border-emerald-500 pl-6">
                 <div>
                    <h4 className="text-sm font-black text-zinc-900 mb-1">Groww Strength:</h4>
                    <p className="text-sm font-medium text-zinc-500">UI simplicity for First-timers.</p>
                 </div>
              </div>
              <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                 <p className="text-sm font-bold text-emerald-800 leading-relaxed italic">
                   "Design simplicity was the differentiator Groww used to disrupt a market of 'complex dashboards.'"
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

export default Day12Content;
