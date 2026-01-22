
import React from 'react';
import { 
  Target, CheckCircle, BarChart, Layout, 
  TrendingUp, Activity, Zap, MonitorPlay, 
  Briefcase, Layers, Sparkles, Database,
  Settings, PieChart, Info, ShieldCheck,
  MousePointer2, Smartphone, Share2, Filter
} from 'lucide-react';

export const Day20Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 20: Learn Power BI 🚀</h1>
      
      <section className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Data</span>
          <p className="text-lg font-black text-emerald-900 leading-relaxed italic">
            "Today’s Goal: Build a strong foundation in Power BI by understanding how raw data is transformed, modeled, calculated, and finally presented as interactive dashboards."
          </p>
          <p className="text-sm font-bold text-emerald-700">
            The focus is on hands-on concepts that are essential for real-world analytics roles.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <p className="text-sm font-bold text-zinc-500">By the end of Day 20, you will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Clean and transform raw datasets using Power Query",
            "Build proper data models and relationships",
            "Write basic to intermediate DAX calculations",
            "Create interactive, insight-driven dashboards",
            "Apply design best practices for professional reports"
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
          Power BI for Product Managers: What It Is and Why It Matters
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Product managers swim in data. Customer feedback, usage metrics, sales figures, support tickets, market research—the information needed to make good product decisions comes from dozens of sources in different formats. The challenge isn't accessing data; it's making sense of it all and communicating insights effectively.
        </p>
        <p className="text-zinc-600 font-medium leading-relaxed">
          This is where Power BI comes in. Understanding what it does, how it helps product managers, and whether you should invest time learning it can significantly impact your effectiveness in the role.
        </p>

        <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
           <h4 className="font-black text-zinc-900 flex items-center gap-2">
             <Layout className="w-5 h-5 text-indigo-600" />
             What Is Power BI?
           </h4>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Power BI is Microsoft's business intelligence and data visualization platform. At its core, it transforms raw data from multiple sources into interactive dashboards, reports, and visualizations that make patterns, trends, and insights immediately visible.
           </p>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Think of Power BI as a bridge between spreadsheets full of numbers and compelling visual stories that drive decisions. It connects to virtually any data source—databases, Excel files, cloud services, APIs, web data—combines them into unified datasets, and lets you create visual reports that update automatically as underlying data changes.
           </p>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {[
                { name: "Power BI Desktop", desc: "Windows app for building reports." },
                { name: "Power BI Service", desc: "Cloud platform for collaboration." },
                { name: "Power BI Mobile", desc: "Access on phones and tablets." },
                { name: "Power BI Gateway", desc: "Connects on-prem to cloud." }
              ].map((comp, i) => (
                <div key={i} className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                   <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">{comp.name}</p>
                   <p className="text-[10px] font-bold text-zinc-500">{comp.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-indigo-600" />
          How Power BI Helps Product Managers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { 
               title: "Connecting Disparate Sources", 
               desc: "Blend Mixpanel, Salesforce, Zendesk, and Excel directly. Refreshes automatically.",
               icon: Share2
             },
             { 
               title: "Storytelling with Dashboards", 
               desc: "Transform 10,000 rows into interactive retention curves and conversion funnels.",
               icon: MonitorPlay
             },
             { 
               title: "Building Product Health", 
               desc: "Track DAU, adoption, and support tickets in a single unified view.",
               icon: Activity
             },
             { 
               title: "Analyzing User Cohorts", 
               desc: "Instantly compare how mobile vs desktop or SMB vs Enterprise users behave.",
               icon: Layers
             },
             { 
               title: "Tracking OKRs & Metrics", 
               desc: "Visual indicators of progress. Color coding and trend arrows make status obvious.",
               icon: TrendingUp
             },
             { 
               title: "Supporting Decisions", 
               desc: "Bring evidence to product debates. Stakeholders can ask 'what if' questions themselves.",
               icon: Database
             },
             { 
               title: "Executive Impact", 
               desc: "A well-designed dashboard conveys in 30 seconds what might take 10 slides.",
               icon: Briefcase
             },
             { 
               title: "A/B Test Monitoring", 
               desc: "Build dashboards that update automatically with new test results across variants.",
               icon: Sparkles
             },
             { 
               title: "Reporting Release Velocity", 
               desc: "Templates showing feature adoption post-release without rebuilding from scratch.",
               icon: Settings
             },
             { 
               title: "Feedback Analysis", 
               desc: "Sentiment analysis integrated with product usage to reveal real user value.",
               icon: Info
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
          Why Product Managers Should Learn Power BI
        </h2>
        <div className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-indigo-500 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "Self-Sufficiency", text: "Answer your own questions rather than waiting days for analysts." },
                { title: "Communication Multiplier", text: "Humans process visuals faster. Charts are more persuasive than arguments." },
                { title: "Strategic Rigor", text: "Building dashboards forces you to think critically about what metrics truly matter." },
                { title: "Career Advancement", text: "Proficiency signals you can navigate data independently and make evidence-based decisions." },
                { title: "Language of Data", text: "Speak the same language as data teams, marketing, and finance partners." },
                { title: "Efficiency Gains", text: "Dashboards serve you repeatedly. Upfront investment pays dividends continuously." }
              ].map((reason, i) => (
                <div key={i} className="space-y-2">
                   <h4 className="font-black text-indigo-300 uppercase tracking-widest text-[10px]">{reason.title}</h4>
                   <p className="text-sm font-bold leading-relaxed text-zinc-300">{reason.text}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-indigo-600" />
          Specific Capabilities for PMs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { name: "Data Modeling", desc: "Connect user demographics to behavioral and revenue data for a unified customer view." },
             { name: "DAX Formulas", desc: "Create custom calculations for LTV, Growth Rates, and Retention that update automatically." },
             { name: "Time Intelligence", desc: "Built-in functions for Year-over-Year and period-to-date analysis without tedious spreadsheet math." },
             { name: "Drill-down", desc: "Move from overall conversion rates into specific segments or funnel steps with a click." },
             { name: "Filtering & Slicing", desc: "Add slicers for dates, versions, or regions so stakeholders can explore themselves." },
             { name: "Parameters", desc: "Scenario analysis ('what-if') models to support strategic planning and allocation." },
             { name: "Custom Visuals", desc: "Specialized charts like funnels, sankey diagrams, and network graphs for unique PM needs." },
             { name: "Security & Sharing", desc: "Control data privacy while enabling broad dashboard sharing via row-level security." },
             { name: "Automated Refresh", desc: "Schedule daily or hourly refreshes so stakeholders never see stale snapshots." },
             { name: "Mobile Optimization", desc: "Check your critical metrics on the go from your phone or tablet." }
           ].map((cap, i) => (
             <div key={i} className="p-6 bg-zinc-50 border border-zinc-200 rounded-[2rem] flex flex-col gap-2">
                <h4 className="font-black text-indigo-900 text-sm uppercase tracking-widest">{cap.name}</h4>
                <p className="text-xs font-bold text-zinc-500 leading-relaxed">{cap.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
          <ShieldCheck className="text-emerald-500" />
          Dashboards Pro-Tip
        </h2>
        <p className="text-sm font-bold text-zinc-600 leading-relaxed italic">
          "A well-designed Power BI dashboard conveys in 30 seconds what might take 10 slides to explain. Executives are busy—create executive-specific views that highlight revenue impact and strategic alignment while preserving the ability to drill deep if they ask 'Why?'"
        </p>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day20Content;
