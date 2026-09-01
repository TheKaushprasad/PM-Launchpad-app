import { CornsilkSection } from '../../components/CornsilkSection';

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
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-blue-50/70 p-3.5 sm:p-4 rounded-xl border border-blue-100/80">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Research</span>
          <p className="text-sm sm:text-base font-medium text-blue-900 leading-relaxed italic">
            “You can’t build a better product until you understand what already exists.”
          </p>
          <p className="text-sm font-bold text-purple-700">
            Today’s goal is to position your idea intelligently. Learn to identify market gaps — not by copying, but by identifying where competitors fall short.
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

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Globe className="text-indigo-600" />
          1. Mapping the Landscape
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5">
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
             <div key={i} className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-4">
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
      </section>

      <CornsilkSection
        title="Strategic Competitive Intelligence Principles"
        titleColor="blue"
        items={[
          {
            subtitle: "Direct vs Indirect Threats",
            headerColor: "red",
            description: "Track direct competitors alongside substitute workflows, legacy habits, and indirect tools competing for the same user time and budget."
          },
          {
            subtitle: "Value Curve Benchmarking",
            headerColor: "blue",
            description: "Map feature parity and pricing matrices to uncover underexplored market whitespace and craft differentiated value propositions."
          },
          {
            subtitle: "Sustainable Differentiation",
            headerColor: "red",
            description: "Focus competitive strategy on reinforcing core moats and workflow superiority rather than mindlessly copying competitor feature releases."
          }
        ]}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
        <div className="bg-zinc-950 text-white p-4 sm:p-5 rounded-2xl border-t-8 border-indigo-500 space-y-8">
          <div className="flex items-center gap-3">
             <MessageSquare className="text-indigo-400 w-6 h-6" />
             <h2 className="text-2xl font-black text-indigo-400">AI Prompts for Strategy</h2>
          </div>
          <div className="space-y-2.5">
            <div className="p-4 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
               <p className="text-sm font-bold text-zinc-300 italic leading-relaxed">
                 "Create a SWOT analysis for Fitbit and identify two strategic gaps a new product could exploit."
               </p>
            </div>
            <div className="p-4 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
               <p className="text-sm font-bold text-zinc-300 italic leading-relaxed">
                 "Summarize the top 5 AI habit tracking apps in 2025, their core features, and pricing."
               </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-sm space-y-8">
           <div className="flex items-center gap-3">
              <BarChart className="text-indigo-600 w-6 h-6" />
              <h2 className="text-lg md:text-xl font-black text-zinc-900">Zerodha vs Groww</h2>
           </div>
           <div className="space-y-2.5">
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
              <div className="bg-emerald-50 p-4 rounded-[2rem] border border-emerald-100">
                 <p className="text-sm font-bold text-emerald-800 leading-relaxed italic">
                   "Design simplicity was the differentiator Groww used to disrupt a market of 'complex dashboards.'"
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

export default Day12Content;
