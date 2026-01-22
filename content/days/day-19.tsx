
import React from 'react';
import { 
  Target, CheckCircle, BarChart, PieChart, Layout, 
  TrendingUp, Activity, FileText, Zap, MousePointer2, 
  MonitorPlay, Briefcase, Layers, LineChart, Sparkles, Table
} from 'lucide-react';

export const Day19Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 19: Excel Charts, Pivot Tables & Dashboards 🚀</h1>
      
      <section className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Data</span>
          <p className="text-lg font-medium text-emerald-900 leading-relaxed italic">
            "A picture is worth a thousand rows of data."
          </p>
          <p className="text-sm font-bold text-emerald-700">
            Today you'll learn to transform data into compelling visualizations and build interactive dashboards that tell stories and drive decisions.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <p className="text-sm font-bold text-zinc-500">By the end of Day 19, you will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Create and customize professional charts",
            "Use sparklines for inline visualizations",
            "Format data as Excel Tables for better analysis",
            "Build interactive Pivot Tables",
            "Create a complete dashboard for stakeholders",
            "Present data insights effectively"
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
          <BarChart className="text-indigo-600" />
          1. Data Visualization: Charts & Sparklines
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Effective PMs don't just share data; they share insights. Choosing the right chart type is critical for clarity.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900 flex items-center gap-2">
                 <LineChart className="w-5 h-5 text-indigo-600" /> Essential Charts
              </h4>
              <ul className="space-y-3">
                 {[
                   { name: "Column/Bar Charts", use: "Compare categories (e.g., users per region)." },
                   { name: "Line Charts", use: "Show trends over time (e.g., DAU growth)." },
                   { name: "Pie/Donut Charts", use: "Show parts of a whole (e.g., revenue share)." },
                   { name: "Scatter Plots", use: "Relationship between two variables." }
                 ].map((item, i) => (
                   <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <p className="text-xs font-bold text-zinc-700"><strong>{item.name}</strong>: {item.use}</p>
                   </li>
                 ))}
              </ul>
           </div>
           
           <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-200 space-y-4">
              <h4 className="font-black text-zinc-900 flex items-center gap-2">
                 <Activity className="w-5 h-5 text-emerald-600" /> Sparklines
              </h4>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                Tiny charts inside a single cell. Perfect for showing mini-trends next to table data without taking up dashboard space.
              </p>
              <div className="bg-white p-4 rounded-xl border border-zinc-100 flex items-center justify-center gap-4">
                 <span className="text-xs font-black text-zinc-400">Retention Rate: </span>
                 <TrendingUp className="w-8 h-8 text-emerald-500 animate-pulse" />
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Table className="text-indigo-600" />
          2. Advanced Spreadsheet Management
        </h2>
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row gap-8 overflow-hidden">
           <div className="flex-1 p-8 space-y-4 border-b md:border-b-0 md:border-r border-zinc-100">
              <h4 className="font-black text-zinc-900 uppercase tracking-widest text-xs text-indigo-600">Excel Tables (Ctrl + T)</h4>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Never analyze raw ranges. Converting data to a Table gives you structured references, auto-formatting, and dynamic ranges for Pivot Tables.
              </p>
           </div>
           <div className="flex-1 p-8 space-y-4">
              <h4 className="font-black text-zinc-900 uppercase tracking-widest text-xs text-emerald-600">Collaboration</h4>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Use comments, shared workbooks, and protected ranges when working with stakeholders. Version history is your safety net.
              </p>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-indigo-600" />
          3. Pivot Tables: The Powerhouse
        </h2>
        <div className="bg-zinc-900 text-white p-8 rounded-[3rem] border-t-8 border-indigo-500 space-y-6">
           <div className="space-y-2">
              <p className="text-xs font-black uppercase text-indigo-400">The Analyst's Best Friend</p>
              <p className="text-lg font-black tracking-tight leading-relaxed italic text-zinc-300">
                "Pivot Tables allow you to summarize thousands of rows into a clean, actionable report in seconds."
              </p>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Filters", desc: "Slicing the data" },
                { label: "Columns", desc: "Comparing categories" },
                { label: "Rows", desc: "Grouping entities" },
                { label: "Values", desc: "Calculations (Sum/Avg)" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10">
                   <h5 className="font-black text-white text-sm">{item.label}</h5>
                   <p className="text-[10px] text-zinc-500 font-bold">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layout className="text-indigo-600" />
          4. Project #1: Salary Dashboard
        </h2>
        <div className="p-8 bg-white border border-zinc-100 rounded-[3rem] shadow-sm space-y-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Briefcase className="w-32 h-32 text-indigo-600" />
           </div>
           <div className="relative z-10 space-y-4">
              <h4 className="text-xl font-black text-zinc-900">Your First PM Dashboard</h4>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed max-w-2xl">
                Build a Salary Dashboard to visualize pay gaps, trends by role, and regional distribution. This exercise combines every skill learned so far.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                 {[
                   { step: "1. Clean Data", tool: "Text Functions" },
                   { step: "2. Summarize", tool: "Pivot Tables" },
                   { step: "3. Visualize", tool: "Pivot Charts" }
                 ].map((item, i) => (
                   <div key={i} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
                      <p className="text-xs font-black text-zinc-900 mb-1">{item.step}</p>
                      <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{item.tool}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
          <Sparkles className="text-amber-500" />
          Dashboard Pro-Tip
        </h2>
        <p className="text-sm font-bold text-zinc-600 leading-relaxed italic">
          "A dashboard is meant to be glanced at, not read. Use <strong>Slicers</strong> instead of manual filters to let your stakeholders interact with the data themselves without breaking your formulas."
        </p>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day19Content;
