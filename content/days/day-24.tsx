import { CornsilkSection } from '../../components/CornsilkSection';

import React from 'react';
import { 
  Target, CheckCircle, Code, Zap, Share2, 
  Terminal, MonitorPlay, Briefcase, Layers, 
  Sparkles, Info, ShieldCheck, Globe, 
  ExternalLink, MessageSquare, Bot, Cpu,
  Settings, Activity, RefreshCcw, Box,
  // Added missing icons to fix "Cannot find name" errors on lines 72 and 82
  TrendingUp, Users
} from 'lucide-react';

export const Day24Content = () => {
  return (
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-blue-50/70 p-3.5 sm:p-4 rounded-xl border border-blue-100/80">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Strategy</span>
          <p className="text-lg font-black text-indigo-900 leading-relaxed italic">
            "Building Products That Scale"
          </p>
          <p className="text-sm font-bold text-indigo-700 leading-relaxed">
            Most product managers focus on what to build—features, user experiences, workflows. The best product managers also understand how things work under the hood. System design knowledge bridges the gap between product vision and technical reality, enabling you to make better decisions, collaborate more effectively with engineering, and avoid costly mistakes.
          </p>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Info className="text-indigo-600" />
          What Is System Design?
        </h2>
        <div className="bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-sm space-y-4">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             System design is the process of defining the architecture, components, modules, interfaces, and data flows needed to build software systems that meet specific requirements. It's the blueprint that guides how engineers will implement your product vision.
           </p>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed italic border-l-4 border-indigo-100 pl-4">
             For product managers, system design knowledge means understanding concepts like client-server architecture, databases, APIs, caching, load balancing, and microservices well enough to have informed conversations with engineers and make product decisions that account for technical reality.
           </p>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             You're not designing the actual implementation—that's engineering's domain. You're understanding the design space well enough to ask good questions, appreciate constraints, and collaborate on solutions that balance user needs with technical feasibility.
           </p>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-indigo-600" />
          Why Product Managers Need System Design Knowledge
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3.5">
           {[
             { 
               title: "Realistic Roadmap Commitments", 
               desc: "Understanding technical complexity helps you estimate timelines accurately and avoid frustrating engineering teams.",
               icon: Terminal
             },
             { 
               title: "Productive Engineering Dialogues", 
               desc: "When timelines are long, knowledge helps you understand why and discuss alternatives or phacing effectively.",
               icon: MessageSquare
             },
             { 
               title: "Build vs. Buy Decisions", 
               desc: "Evaluate tradeoffs around cost, flexibility, and time-to-market for authentication, analytics, and more.",
               icon: Briefcase
             },
             { 
               title: "Designing for Scale", 
               desc: "Ask the right questions about performance early (e.g., 'What happens at 100x users?') to prevent painful rewrites.",
               icon: TrendingUp
             },
             { 
               title: "Scoping MVPs Intelligently", 
               desc: "Identify load-bearing walls vs cosmetic features. Understand what is architecturally essential for launch.",
               icon: Layers
             },
             { 
               title: "Collaborating as Peers", 
               desc: "Speak enough of engineering's language to grasp why suggestions might be technically infeasible or complex.",
               icon: Users
             },
             { 
               title: "Managing Technical Debt", 
               desc: "Understand the business implications of refactoring and service decomposition to make informed prioritization.",
               icon: Settings
             },
             { 
               title: "Architecting Integrations", 
               desc: "Verify API rate limits, authentication, and webhook reliability when working with partner ecosystems.",
               icon: Share2
             },
             { 
               title: "Faster Debugging", 
               desc: "Understand system architecture to ask the right diagnostic questions and participate in incident response.",
               icon: Activity
             }
           ].map((item, i) => (
             <div key={i} className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm flex items-start gap-4 hover:border-indigo-200 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-black text-zinc-900 text-sm mb-1">{item.title}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

            <CornsilkSection
        title="Scalable System Architecture for PMs"
        titleColor="blue"
        items={[
                {
                          "subtitle": "Latency, Throughput & Bottlenecks",
                          "headerColor": "red",
                          "description": "Master the trade-offs between latency, throughput, and compute resources to make informed decisions on architectural scalability."
                },
                {
                          "subtitle": "Caching & Database Strategy",
                          "headerColor": "blue",
                          "description": "Understand when to deploy Redis caching, relational databases, or NoSQL stores based on data consistency and read/write access patterns."
                },
                {
                          "subtitle": "Microservices & Event-Driven Flows",
                          "headerColor": "red",
                          "description": "Grasp how message queues (Kafka, RabbitMQ) decouple services to maintain product uptime and fault tolerance under surge loads."
                }
      ]}
      />

      <section className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-2.5 flex items-center gap-3">
          <Sparkles className="text-amber-500" />
          Technical Fluency Tip
        </h2>
        <p className="text-sm font-bold text-zinc-600 leading-relaxed italic">
          "The best way to learn system design is to ask your engineers to draw the architecture of your product on a whiteboard. Ask about data flow, bottlenecks, and dependencies. Understanding your specific 'stack' makes the general concepts much easier to apply."
        </p>
      </section>

      <div className="pt-3.5 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day24Content;