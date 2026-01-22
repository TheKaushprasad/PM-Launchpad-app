
import React from 'react';
import { 
  Target, CheckCircle, BarChart, Layout, 
  TrendingUp, Activity, Zap, MonitorPlay, 
  Briefcase, Layers, Sparkles, Database,
  Settings, PieChart, Info, ShieldCheck,
  MousePointer2, Smartphone, Share2, Filter,
  Beaker, Search, FileText, Globe, AlertTriangle
} from 'lucide-react';

export const Day22Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 22: Google Analytics 4 (GA4) & A/B Testing 🚀</h1>
      
      <section className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Data & Experimentation</span>
          <p className="text-lg font-black text-emerald-900 leading-relaxed italic">
            "Gain a step-by-step understanding of Google Analytics 4 (GA4) and the frameworks of A/B Testing to drive evidence-based decisions."
          </p>
          <p className="text-sm font-bold text-emerald-700">
            Today’s Goal: From creating accounts and properties to collecting data, exploring standard and advanced reports, configuring conversions, and validating installation using industry-recommended practices.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <p className="text-sm font-bold text-zinc-500">By the end of Day 22, you will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Set up GA4 accounts, properties, and configurations correctly",
            "Collect data using streams and enhanced measurement",
            "Navigate and interpret standard GA4 reports",
            "Build advanced analysis using explorations and attribution models",
            "Configure events, conversions, audiences, and installations properly",
            "Understand what is A/B testing and why it is needed"
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
          <Beaker className="text-indigo-600" />
          1. A/B Testing: From Hypothesis to Decision
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Product managers make dozens of decisions every week. Should the call-to-action button be blue or green? Will a simplified onboarding flow improve activation? Does surfacing social proof increase conversions?
        </p>
        <p className="text-zinc-600 font-medium leading-relaxed">
          A/B testing—also called split testing—is the product manager's most powerful tool for making evidence-based product decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-indigo-600" />
                What Is A/B Testing?
              </h4>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                A/B testing is a controlled experiment where you show different variants of a product experience to randomly assigned user groups and measure which performs better against predetermined success metrics.
              </p>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                This scientific approach removes guesswork. Instead of debating whether users prefer option A or B, you observe what they actually do. Actions speak louder than opinions.
              </p>
           </div>
           
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Why It Matters
              </h4>
              <ul className="space-y-2">
                 {[
                   "Transform from opinion-driven to evidence-driven.",
                   "Validate hypotheses before committing heavy resources.",
                   "De-risk decision-making by testing variations incrementally.",
                   "Settle disputes objectively among stakeholders."
                 ].map((text, i) => (
                   <li key={i} className="flex items-start gap-2 text-xs font-bold text-zinc-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" /> {text}
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-indigo-600" />
          2. The A/B Testing Framework
        </h2>
        <div className="space-y-6">
           {[
             { title: "Start with a clear hypothesis", desc: "Good hypotheses are specific and testable. Instead of 'we should improve checkout,' try 'reducing checkout from five steps to three will increase purchase completion by 10% because users abandon when processes feel too long.'" },
             { title: "Define your success metrics", desc: "Primary metrics (conversion, activation) measure your hypothesis. Secondary metrics help understand side effects. Guardrail metrics ensure you're not breaking technical health or CSAT." },
             { title: "Determine sample size & duration", desc: "You need enough users to detect differences with statistical confidence. Duration must account for day-of-week behavior and 'novelty effects' where users react to change just because it's new." },
             { title: "Randomize assignments carefully", desc: "Users should be randomly assigned and consistently see the same version. This ensures groups are comparable and differences reflect your changes." },
             { title: "Run the experiment & analyze", desc: "Monitor for technical issues early. Analyze results rigorously looking at confidence intervals and significance before drawing conclusions." },
             { title: "Make a decision & document", desc: "Ship the winner or iterate. Document institucional knowledge—why you think things happened and what you learned." }
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

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Globe className="text-indigo-600" />
          3. How Google Analytics (GA4) Helps PMs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { title: "Understand Behavior", desc: "See exactly which pages users visit, how long they stay, and where they bounce. Bridge the gap between what users say and do.", icon: Activity },
             { title: "Track User Journeys", desc: "Identify common paths to conversion and discover unexpected detours or friction points in your designed flows.", icon: Share2 },
             { title: "Measure What Matters", desc: "Define custom events for sign-ups, feature adoption, or purchases. Track multi-step funnels to see exactly where drop-off occurs.", icon: BarChart },
             { title: "Segmentation", desc: "Slice data by device, traffic source, or location to reveal insights like 'mobile users convert at half the rate of desktop'.", icon: Filter },
             { title: "Validate Decisions", desc: "Provide baseline metrics needed for A/B tests and measure the long-term impact of shipped changes.", icon: ShieldCheck },
             { title: "Acquisition & Attribution", desc: "Know how users discover you and which channels drive the highest quality/LTV customers.", icon: Target },
             { title: "Monitor Product Health", desc: "Catch sudden drops in traffic or spikes in bounce rates using real-time data and automated alerts.", icon: Zap },
             { title: "Roadmap Prioritization", desc: "If 80% of users never touch a feature you built, that is valuable feedback for your next prioritization cycle.", icon: Layout }
           ].map((benefit, i) => (
             <div key={i} className="p-6 bg-zinc-50 border border-zinc-200 rounded-[2rem] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-black text-indigo-900 text-sm mb-1">{benefit.title}</h4>
                   <p className="text-xs font-bold text-zinc-500 leading-relaxed">{benefit.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-indigo-500 space-y-8">
        <h2 className="text-2xl font-black text-indigo-400 flex items-center gap-3">
          <AlertTriangle className="text-amber-500" />
          Key Limitations & Best Practices
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-4">
             <h4 className="font-black text-indigo-300 uppercase tracking-widest text-[10px]">GA4 Limitations</h4>
             <p className="text-sm font-bold leading-relaxed text-zinc-300">
               GA4 shows what users do but not <strong>why</strong>—you need qualitative research for that. Privacy regulations and ad blockers can create data blind spots.
             </p>
          </div>
          <div className="space-y-4">
             <h4 className="font-black text-indigo-300 uppercase tracking-widest text-[10px]">A/B Test Pitfalls</h4>
             <p className="text-sm font-bold leading-relaxed text-zinc-300">
               Calling tests too early is a common mistake. Ensure statistical significance and account for external factors (e.g., marketing spikes, holidays) that might confound results.
             </p>
          </div>
        </div>
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 italic text-xs font-medium text-zinc-400">
          "The best PMs balance the rigor of scientific testing with the speed and vision required in product development. They know when to test, and when to ship with conviction."
        </div>
      </section>

      <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
          <Sparkles className="text-emerald-500" />
          Analytics Mastery Tip
        </h2>
        <p className="text-sm font-bold text-zinc-600 leading-relaxed italic">
          "Instead of 'I think users would prefer this,' say 'Analytics shows 70% of users exit at this point, suggesting friction we should address.' Data-driven conversations are more productive and less political."
        </p>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day22Content;
