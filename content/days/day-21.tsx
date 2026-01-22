
import React from 'react';
import { 
  Target, CheckCircle, BarChart, Activity, Zap, 
  MousePointer2, Layers, MonitorPlay, LineChart, 
  Smartphone, Users, RefreshCw, Info, PieChart, 
  Database, Search, FileText, Sparkles, Briefcase,
  // Added TrendingUp to fix the 'Cannot find name' error on line 111
  TrendingUp
} from 'lucide-react';

export const Day21Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 21: Product Analytics & Metrics Foundations 🚀</h1>
      
      <section className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Data</span>
          <p className="text-lg font-black text-emerald-900 leading-relaxed italic">
            "Covering the Basics of Mixpanel"
          </p>
          <p className="text-sm font-bold text-emerald-700">
            Today’s Goal: Understand how product analytics fits into the entire product development lifecycle, how to define meaningful success metrics, and how tools like Mixpanel are used to analyze user behavior, build dashboards, and guide product decisions.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <p className="text-sm font-bold text-zinc-500">By the end of Day 21, you will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Explain the product development and improvement cycle through analytics",
            "Define product success metrics using a structured KPI framework",
            "Understand events, properties, and dashboards in Mixpanel",
            "Create a basic tracking plan for engineers",
            "Identify next steps for deeper analytics maturity"
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
          <Info className="text-indigo-600" />
          How Product Analytics Helps Product Managers
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Product managers need to understand user behavior at a granular level. While web analytics tools like Google Analytics tell you about page views and traffic, product analytics tools dive deeper into how users actually interact with your product's features and functionality.
        </p>

        <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-6">
           <h4 className="font-black text-zinc-900 flex items-center gap-2">
             <BarChart className="w-5 h-5 text-indigo-600" />
             What Is Product Analytics?
           </h4>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Product analytics focuses on tracking user actions and events within your product rather than just page views. Instead of knowing someone visited your dashboard, you know they created three reports, shared one with colleagues, and exported data to Excel—all within a single session.
           </p>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed italic border-l-4 border-indigo-100 pl-4">
             This event-based tracking reveals patterns in how users adopt features, where they find value, and why they churn. For product managers, these insights drive everything from roadmap prioritization to optimization.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { 
               title: "Feature Adoption & Usage", 
               desc: "See which features users actually use vs ones that sit ignored. Learn about usage frequency and depth.",
               icon: MousePointer2
             },
             { 
               title: "User Journey & Funnels", 
               desc: "Reveal how people actually experience your product vs intended. Map multi-step processes to find drop-offs.",
               icon: Smartphone
             },
             { 
               title: "Activation & Time-to-Value", 
               desc: "Define and track the 'aha moment'. Identify how quickly users reach meaningful value.",
               icon: Zap
             },
             { 
               title: "Leading Indicators", 
               desc: "Identify behavioral patterns that predict long-term success or churn before it happens.",
               icon: LineChart
             },
             { 
               title: "Cohort Analysis", 
               desc: "Track groups over time to see if product changes improved retention across signup dates.",
               icon: Layers
             },
             { 
               title: "Segmentation", 
               desc: "Slice data by user properties to understand how different roles or industries engage.",
               icon: PieChart
             },
             { 
               title: "A/B Test Analysis", 
               desc: "Measure feature experiments based on activation and retention, not just clicks.",
               icon: Activity
             },
             { 
               title: "Path to Conversion", 
               desc: "Discover which behaviors correlate with upgrading to paid plans for freemium products.",
               icon: TrendingUp
             }
           ].map((benefit, i) => (
             <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm flex items-start gap-4 hover:border-emerald-200 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-black text-zinc-900 text-sm mb-1">{benefit.title}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{benefit.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Sparkles className="text-indigo-600" />
          Enter Mixpanel: Purpose-Built Product Analytics
        </h2>
        <div className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-indigo-500 space-y-8">
           <p className="text-sm font-bold text-zinc-400 leading-relaxed">
             Mixpanel is designed specifically for tracking user behavior in digital products. Its architecture makes granular insights significantly easier to extract.
           </p>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Event-Based Tracking", text: "Everything revolves around user actions (Events) and context (Properties)." },
                { title: "User Profiles", text: "Persistent identities allow for complete history of a specific user's journey." },
                { title: "Funnels", text: "Trivial to create conversion funnels for any sequence of events with segmentation." },
                { title: "Retention Reports", text: "Measure what percentage of users return to perform an action again." },
                { title: "Flow Reports", text: "Visualize actual paths users take organically through your product." },
                { title: "Impact Reports", text: "Tie specific feature usage directly to business outcomes like conversion." }
              ].map((comp, i) => (
                <div key={i} className="space-y-2">
                   <h4 className="font-black text-indigo-300 uppercase tracking-widest text-[10px]">{comp.title}</h4>
                   <p className="text-sm font-bold leading-relaxed text-zinc-300">{comp.text}</p>
                </div>
              ))}
           </div>

           <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-xs font-medium text-zinc-400 italic">
                "Mixpanel's interface makes ad-hoc questions answerable in minutes rather than requiring complex SQL queries or custom reports from data teams."
              </p>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <RefreshCw className="text-indigo-600" />
          How PMs Use Mixpanel Day-to-Day
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { phase: "Discovery", action: "Analyze current usage patterns to identify pain points and low adoption features." },
             { phase: "Prioritization", action: "Understand which features drive retention to quantify potential roadmap impact." },
             { phase: "Development", action: "Plan instrumentation with events to enable tracking immediately upon ship." },
             { phase: "Post-Launch", action: "Monitor adoption curves and validate if features achieve intended outcomes." },
             { phase: "Optimization", action: "Continuously analyze funnels and engagement to identify incremental improvements." },
             { phase: "Stakeholder Communication", action: "Provide concrete evidence for decisions with visual reports and dashboards." }
           ].map((item, i) => (
             <div key={i} className="p-6 bg-zinc-50 border border-zinc-200 rounded-[2rem] flex flex-col gap-2">
                <h4 className="font-black text-indigo-900 text-sm uppercase tracking-widest">{item.phase}</h4>
                <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.action}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
          <Database className="text-emerald-500" />
          Analytics Mastery Tip
        </h2>
        <p className="text-sm font-bold text-zinc-600 leading-relaxed italic">
          "The biggest mistake PMs make is tracking everything. Start with your primary business goals, work backwards to the user behaviors that drive them, and track those actions with high precision. A clean tracking plan with 10 meaningful events is infinitely more valuable than a messy one with 1,000."
        </p>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day21Content;
