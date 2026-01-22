import React from 'react';
import { 
  Activity, FileText, Zap, Layers, Target, 
  Settings, ShieldCheck, CheckCircle, Info, RefreshCw
} from 'lucide-react';

export const Day28Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 28: Product Analytics: Building a Tracking Plan That Actually Works 🚀</h1>
      
      <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Strategy</span>
          <p className="text-lg font-black text-indigo-900 leading-relaxed italic">
            "Bridging the Gap Between Product Intuition and Data Reality"
          </p>
          <p className="text-sm font-bold text-indigo-700 leading-relaxed">
            Product managers don't just build products; they measure whether those products actually solve user problems. But you can't measure what you haven't tracked. You don't need to be a data scientist to design great analytics, but you do need a structured way to ensure the data you collect is meaningful, accurate, and actionable.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Activity className="text-indigo-600" />
          What Is a Tracking Plan?
        </h2>
        <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-4">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             A tracking plan (sometimes called an implementation spec or measurement plan) is a document that defines exactly what data you will collect, why you're collecting it, and how it maps to your product's goals.
           </p>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed italic border-l-4 border-indigo-100 pl-4">
             It is the bridge between product strategy ("We want to increase retention") and engineering execution ("We need to fire a 'Purchase Completed' event with these five properties").
           </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-indigo-600" />
          Why You Need a Tracking Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[
             { title: "Avoid 'Data Swamp'", desc: "Tracking everything leads to noise. A plan ensures you only collect data that actually answers product questions." },
             { title: "Alignment with Engineering", desc: "Clearly communicates technical requirements to developers so they know exactly what to implement." },
             { title: "Data Consistency", desc: "Ensures naming conventions are uniform. 'Purchase' shouldn't be 'buy_click' on iOS and 'checkout_complete' on Android." },
             { title: "Stakeholder Confidence", desc: "Provides a single source of truth for what is being measured, increasing trust in the resulting dashboards." },
             { title: "Faster Insights", desc: "When tracking is structured properly, building funnels and retention reports takes minutes instead of hours." },
             { title: "Maintainability", desc: "As your product grows, a plan helps you manage legacy events and prevent tracking rot." }
           ].map((item, i) => (
             <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-2 group hover:border-indigo-200 transition-colors">
                <h4 className="font-black text-zinc-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <FileText className="text-indigo-600" />
          The Anatomy of a Great Tracking Plan
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          A functional tracking plan typically lives in a spreadsheet or a dedicated tool. Every row represents an event, and the columns provide the necessary context.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {[
             { label: "Event Name", desc: "Consistent, human-readable name (e.g., 'Article Shared'). Use the Verb + Noun or Noun + Verb pattern consistently." },
             { label: "Event Properties", desc: "Contextual data attached to the event (e.g., 'Channel', 'Content Category', 'Word Count')." },
             { label: "Property Values", desc: "Expected data types (String, Integer, Boolean) and example values to help engineering validate." },
             { label: "Location/Platform", desc: "Where the event is triggered (e.g., 'Web Homepage', 'iOS Settings', 'Android Checkout')." },
             { label: "Priority/Status", desc: "Indicates if it's 'Required' for launch vs 'Nice-to-have', and current implementation status." }
           ].map((item, i) => (
             <div key={i} className="p-5 bg-zinc-50 border border-zinc-100 rounded-2xl space-y-2">
                <h5 className="font-black text-indigo-600 text-[10px] uppercase tracking-widest">{item.label}</h5>
                <p className="text-[10px] font-bold text-zinc-500 leading-tight">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <RefreshCw className="text-indigo-600" />
          Step-by-Step: Building Your Tracking Plan
        </h2>
        <div className="space-y-6">
           {[
             { title: "Define your business goals", desc: "Start with what you want to achieve (e.g., 'Improve 7-day retention'). Don't track actions that don't relate to your goals." },
             { title: "Identify user journeys", desc: "Map out the critical paths users take to reach value. These are your funnels." },
             { title: "Map actions to events", desc: "Translate user actions ('clicked the big red button') into structured event names ('Account Signup Started')." },
             { title: "Define properties", desc: "Think about what context you'll need for analysis. If an article is shared, you'll want to know if it was shared to Twitter or WhatsApp." },
             { title: "Review with engineering", desc: "Collaboration is key. Engineers will help identify which events are easy to track and which require complex custom code." }
           ].map((step, i) => (
             <div key={i} className="flex gap-6 p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:border-indigo-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-black shrink-0">{i+1}</div>
                <div>
                   <h4 className="font-black text-zinc-900 text-sm mb-1">{step.title}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{step.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-indigo-500 space-y-8">
        <h2 className="text-2xl font-black text-indigo-400 flex items-center gap-3">
          <ShieldCheck className="text-emerald-500" />
          The PM’s Role in Analytics Implementation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-4">
             <h4 className="font-black text-indigo-300 uppercase tracking-widest text-[10px]">Strategic Ownership</h4>
             <p className="text-sm font-bold leading-relaxed text-zinc-300">
               You own the "Why" and the "What". Ensure that the events being tracked actually map back to your OKRs and product hypotheses.
             </p>
          </div>
          <div className="space-y-4">
             <h4 className="font-black text-indigo-300 uppercase tracking-widest text-[10px]">Data Governance</h4>
             <p className="text-sm font-bold leading-relaxed text-zinc-300">
               You are the guardian of data quality. Enforce naming conventions and prevent duplicate events from polluting your analytics tools.
             </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          The Bottom Line
        </h2>
        <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-4">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             A tracking plan isn't a "one and done" task. It evolves with your product. Every new feature should include a corresponding update to your tracking plan.
           </p>
           <p className="text-sm font-bold text-zinc-700 leading-relaxed italic border-l-4 border-indigo-500 pl-4">
             Without a plan, analytics is just a pile of numbers. With a plan, analytics becomes the fuel for your product discovery and strategic decision-making.
           </p>
        </div>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day28Content;