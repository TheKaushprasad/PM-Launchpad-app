import { CornsilkSection } from '../../components/CornsilkSection';

import React from 'react';
// Added missing icons (HeartHandshake, Code, MonitorPlay, History) to fix "Cannot find name" errors
import { 
  Target, CheckCircle, Zap, Users, Layers, 
  Settings, ShieldCheck, Activity, FileText, 
  Layout, Clock, Calendar, MessageSquare, 
  BarChart, TrendingUp, AlertTriangle, Users2,
  Info, RefreshCw, HeartHandshake, Code, MonitorPlay, History
} from 'lucide-react';

export const Day26Content = () => {
  return (
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-blue-50/70 p-3.5 sm:p-4 rounded-xl border border-blue-100/80">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Strategy & Execution</span>
          <p className="text-lg font-black text-indigo-900 leading-relaxed italic">
            "Build a solid understanding of Agile principles, Scrum practices, and prioritization frameworks used in real product delivery."
          </p>
          <p className="text-sm font-bold text-indigo-700">
            Today’s Goal: Learn how teams organize work, how product decisions get translated into backlog items, and how to prioritize work effectively using industry-standard tools like Jira.
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
            "Explain core Agile values and Scrum mechanics",
            "Understand roles, ceremonies, and artifacts in Scrum",
            "Navigate Jira basics for Agile project tracking",
            "Use prioritization frameworks to make data-informed decisions",
            "Apply prioritization within team backlogs"
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
          <Zap className="text-indigo-600" />
          1. Why Agile Matters for Product Managers
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Traditional waterfall development forced product managers to specify everything upfront. Agile fundamentally changes this dynamic. Instead of big bets with delayed feedback, you make smaller bets with continuous learning. You ship increments every few weeks, gather real user data, and adjust based on what you learn.
        </p>
      </section>

      <CornsilkSection
        title="Agile Delivery & Sprint Execution Best Practices"
        titleColor="blue"
        items={[
          {
            subtitle: "Backlog Grooming & INVEST Criteria",
            headerColor: "red",
            description: "Write user stories following INVEST criteria with explicit acceptance criteria to empower engineers and avoid mid-sprint ambiguity."
          },
          {
            subtitle: "Sprint Ceremonies & Velocity",
            headerColor: "blue",
            description: "Lead sprint planning, standups, and retrospectives to foster continuous team improvement and predict delivery timelines reliably."
          },
          {
            subtitle: "Balancing Tech Debt vs Features",
            headerColor: "red",
            description: "Allocate dedicated sprint capacity (15–20%) for refactoring and tech debt to sustain long-term platform velocity and stability."
          }
        ]}
      />

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Clock className="text-indigo-600" />
          4. The Five Scrum Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
           {[
             { title: "Sprint Planning", desc: "Commit to a goal and stories.", icon: Calendar },
             { title: "Daily Standup", desc: "15m sync to align and unblock.", icon: Activity },
             { title: "Sprint Review", desc: "Demo progress to stakeholders.", icon: MonitorPlay },
             { title: "Retrospective", desc: "Team looks back to improve.", icon: History },
             { title: "Refinement", desc: "Ongoing backlog grooming.", icon: Settings }
           ].map((event, i) => (
             <div key={i} className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-center space-y-2">
                <event.icon className="w-5 h-5 text-indigo-600 mx-auto" />
                <h5 className="font-black text-zinc-900 text-[10px] uppercase tracking-widest">{event.title}</h5>
                <p className="text-[9px] font-bold text-zinc-400 leading-tight">{event.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <MessageSquare className="text-indigo-600" />
          5. User Stories: The Currency of Agile
        </h2>
        <div className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-6">
           <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-center font-black text-lg italic text-zinc-700">
             "As a [user type], I want to [action] so that [benefit]."
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                 <h4 className="font-black text-indigo-900 text-xs uppercase mb-3 tracking-widest">Acceptance Criteria</h4>
                 <ul className="space-y-2 text-xs font-bold text-indigo-700">
                    <li className="flex gap-2"><CheckCircle className="w-3.5 h-3.5" /> Must be specific & testable</li>
                    <li className="flex gap-2"><CheckCircle className="w-3.5 h-3.5" /> Define 'Done' for the developer</li>
                    <li className="flex gap-2"><CheckCircle className="w-3.5 h-3.5" /> Prevents scope creep mid-sprint</li>
                 </ul>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                 <h4 className="font-black text-emerald-900 text-xs uppercase mb-3 tracking-widest">INVEST Principle</h4>
                 <p className="text-[10px] font-bold text-emerald-700 leading-relaxed">
                   Independent, Negotiable, Valuable, Estimable, Small, Testable.
                 </p>
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <BarChart className="text-indigo-600" />
          6. Prioritization: RICE & MoSCoW
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          With limited capacity, what you choose NOT to build is as important as what you build. Frameworks help remove bias from these decisions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
           <div className="p-4 sm:p-5 bg-zinc-900 text-white rounded-2xl border-t-8 border-indigo-500 space-y-4">
              <h4 className="text-lg font-black text-indigo-400">RICE Framework</h4>
              <p className="text-2xl font-black text-zinc-100 tracking-tighter">(Reach × Impact × Confidence) / Effort</p>
              <p className="text-xs font-medium text-zinc-400">Best for balancing data-driven features with limited resources.</p>
           </div>
           <div className="p-4 sm:p-5 bg-zinc-900 text-white rounded-2xl border-t-8 border-emerald-500 space-y-4">
              <h4 className="text-lg font-black text-emerald-400">MoSCoW Method</h4>
              <ul className="grid grid-cols-2 gap-2 text-xs font-black uppercase tracking-widest">
                 <li className="text-emerald-400">• Must Have</li>
                 <li className="text-blue-400">• Should Have</li>
                 <li className="text-amber-400">• Could Have</li>
                 <li className="text-rose-400">• Won't Have</li>
              </ul>
              <p className="text-xs font-medium text-zinc-400 pt-2">Best for scoping MVPs and specific release boundaries.</p>
           </div>
        </div>
      </section>

      <section className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-2.5 flex items-center gap-3">
          <AlertTriangle className="text-amber-500" />
          A Note on Technical Debt
        </h2>
        <p className="text-sm font-bold text-zinc-600 leading-relaxed italic">
          "Shortcuts today create debt tomorrow. A healthy team allocates <strong>20-30%</strong> of sprint capacity to technical health. Ignoring this results in a product that eventually becomes too fragile to change."
        </p>
      </section>

      <div className="pt-3.5 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day26Content;
