
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
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 26: Key Foundations of Agile & Scrum Project Management 🚀</h1>
      
      <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Strategy & Execution</span>
          <p className="text-lg font-black text-indigo-900 leading-relaxed italic">
            "Build a solid understanding of Agile principles, Scrum practices, and prioritization frameworks used in real product delivery."
          </p>
          <p className="text-sm font-bold text-indigo-700">
            Today’s Goal: Learn how teams organize work, how product decisions get translated into backlog items, and how to prioritize work effectively using industry-standard tools like Jira.
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

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-indigo-600" />
          1. Why Agile Matters for Product Managers
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Traditional waterfall development forced product managers to specify everything upfront. Agile fundamentally changes this dynamic. Instead of big bets with delayed feedback, you make smaller bets with continuous learning. You ship increments every few weeks, gather real user data, and adjust based on what you learn.
        </p>
        <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] border-l-8 border-indigo-500">
           <p className="text-base font-bold text-zinc-300 italic">
             "Agile moves the PM from 'requirements writer' to 'value maximizer'—constantly reprioritizing based on learning and ruthlessly cutting scope that doesn't drive impact."
           </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <ShieldCheck className="text-indigo-600" />
          2. The Agile Mindset: Four Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
           {[
             { title: "Individuals & Interactions", desc: "Over processes and tools. No process compensates for poor collaboration.", icon: Users },
             { title: "Working Software", desc: "Over comprehensive documentation. A working prototype teaches more than a 20-page spec.", icon: Activity },
             { title: "Customer Collaboration", desc: "Over contract negotiation. Involve customers throughout development cycles.", icon: HeartHandshake },
             { title: "Responding to Change", desc: "Over following a plan. Plans are hypotheses; adapt roadmaps as you learn.", icon: RefreshCw }
           ].map((item, i) => (
             <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                   <item.icon className="w-5 h-5" />
                </div>
                <h4 className="font-black text-zinc-900 text-sm">{item.title}</h4>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Users2 className="text-indigo-600" />
          3. Scrum Roles: The Three Pillars
        </h2>
        <div className="space-y-6">
           {[
             { 
               role: "Product Owner (The 'What' & 'Why')", 
               desc: "Represents the customer and owns the backlog. In many orgs, the PM is the PO. You define what gets built based on value.",
               icon: Target,
               color: "indigo"
             },
             { 
               role: "Scrum Master (The Coach)", 
               desc: "Facilitates the process, removes impediments, and protects the team from distractions. Not the PM's role.",
               icon: ShieldCheck,
               color: "emerald"
             },
             { 
               role: "Development Team (The 'How')", 
               desc: "Cross-functional group that builds the increment. Self-organizing and responsible for the 'shippable' outcome.",
               icon: Code,
               color: "blue"
             }
           ].map((item, i) => (
             <div key={i} className="flex gap-6 p-6 bg-white border border-zinc-100 rounded-[2rem] shadow-sm items-start">
                <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 shrink-0`}>
                   <item.icon className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-black text-zinc-900 mb-1">{item.role}</h4>
                   <p className="text-sm font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
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

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <MessageSquare className="text-indigo-600" />
          5. User Stories: The Currency of Agile
        </h2>
        <div className="p-8 bg-white border border-zinc-100 rounded-[3rem] shadow-sm space-y-6">
           <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 text-center font-black text-lg italic text-zinc-700">
             "As a [user type], I want to [action] so that [benefit]."
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                 <h4 className="font-black text-indigo-900 text-xs uppercase mb-3 tracking-widest">Acceptance Criteria</h4>
                 <ul className="space-y-2 text-xs font-bold text-indigo-700">
                    <li className="flex gap-2"><CheckCircle className="w-3.5 h-3.5" /> Must be specific & testable</li>
                    <li className="flex gap-2"><CheckCircle className="w-3.5 h-3.5" /> Define 'Done' for the developer</li>
                    <li className="flex gap-2"><CheckCircle className="w-3.5 h-3.5" /> Prevents scope creep mid-sprint</li>
                 </ul>
              </div>
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
                 <h4 className="font-black text-emerald-900 text-xs uppercase mb-3 tracking-widest">INVEST Principle</h4>
                 <p className="text-[10px] font-bold text-emerald-700 leading-relaxed">
                   Independent, Negotiable, Valuable, Estimable, Small, Testable.
                 </p>
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <BarChart className="text-indigo-600" />
          6. Prioritization: RICE & MoSCoW
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          With limited capacity, what you choose NOT to build is as important as what you build. Frameworks help remove bias from these decisions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 bg-zinc-900 text-white rounded-[2.5rem] border-t-8 border-indigo-500 space-y-4">
              <h4 className="text-lg font-black text-indigo-400">RICE Framework</h4>
              <p className="text-2xl font-black text-zinc-100 tracking-tighter">(Reach × Impact × Confidence) / Effort</p>
              <p className="text-xs font-medium text-zinc-400">Best for balancing data-driven features with limited resources.</p>
           </div>
           <div className="p-8 bg-zinc-900 text-white rounded-[2.5rem] border-t-8 border-emerald-500 space-y-4">
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

      <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
          <AlertTriangle className="text-amber-500" />
          A Note on Technical Debt
        </h2>
        <p className="text-sm font-bold text-zinc-600 leading-relaxed italic">
          "Shortcuts today create debt tomorrow. A healthy team allocates <strong>20-30%</strong> of sprint capacity to technical health. Ignoring this results in a product that eventually becomes too fragile to change."
        </p>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day26Content;
