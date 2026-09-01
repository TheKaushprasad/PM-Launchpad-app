import { CornsilkSection } from '../../components/CornsilkSection';

import React from 'react';
import { 
  Target, CheckCircle, Database, Layout, Clock, 
  Settings, Zap, BarChart, TrendingUp, Calculator,
  Activity, Info, FileText, Smartphone, Table, Search
} from 'lucide-react';

export const Day18Content = () => {
  return (
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-blue-50/70 p-3.5 sm:p-4 rounded-xl border border-blue-100/80">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Data</span>
          <p className="text-sm sm:text-base font-medium text-blue-900 leading-relaxed italic">
            "Excel is the PM's Swiss Army knife — from quick analysis to complex models."
          </p>
          <p className="text-sm font-bold text-emerald-700">
            Today you'll master Excel basics and essential formulas that PMs use daily for data analysis, reporting, and decision-making.
          </p>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <p className="text-sm font-bold text-zinc-500">By the end of Day 18, you will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Navigate Excel efficiently (workbooks, worksheets, ribbon)",
            "Write formulas and use essential functions",
            "Apply logical functions for conditional analysis",
            "Use lookup functions to merge data",
            "Perform basic statistical analysis",
            "Work with dates and text data"
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
          <Info className="text-indigo-600" />
          1. What is Excel and Why PMs Need It
        </h2>
        
        <div className="space-y-2.5">
          <div className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-4">
            <h4 className="font-black text-zinc-900 flex items-center gap-2">
              <Table className="w-5 h-5 text-indigo-600" />
              What is Excel?
            </h4>
            <p className="text-sm font-medium text-zinc-600 leading-relaxed">
              Excel is a spreadsheet application for organizing, analyzing, and visualizing data.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-6">
            <h4 className="font-black text-zinc-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600" />
              Why PMs Use Excel Daily
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
               <div className="space-y-4">
                  <div className="flex items-center gap-2">
                     <TrendingUp className="w-4 h-4 text-emerald-500" />
                     <p className="text-xs font-black uppercase text-zinc-400 tracking-widest">Quick Analysis</p>
                  </div>
                  <ul className="space-y-2">
                     {["What's our week-over-week growth?", "Which features have highest adoption?", "Calculate metrics without waiting for dashboards"].map((text, i) => (
                       <li key={i} className="text-sm font-bold text-zinc-700 italic border-l-2 border-indigo-100 pl-3">"{text}"</li>
                     ))}
                  </ul>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center gap-2">
                     <Settings className="w-4 h-4 text-indigo-500" />
                     <p className="text-xs font-black uppercase text-zinc-400 tracking-widest">Data Manipulation</p>
                  </div>
                  <ul className="space-y-2">
                     {["Clean messy CSV exports", "Combine data from multiple sources", "Transform data for presentations"].map((text, i) => (
                       <li key={i} className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> {text}
                       </li>
                     ))}
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Calculator className="text-indigo-600" />
          2. Core Formulas & Functions
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5">
           {[
             { 
               title: "Logical Functions", 
               desc: "IF, AND, OR — build conditional logic into your models.", 
               icon: Zap,
               color: "text-amber-500",
               bgColor: "bg-amber-50"
             },
             { 
               title: "Lookup Functions", 
               desc: "VLOOKUP, XLOOKUP — merge datasets from different sheets.", 
               icon: Search,
               color: "text-indigo-600",
               bgColor: "bg-indigo-50"
             },
             { 
               title: "Statistical Functions", 
               desc: "AVERAGE, MEDIAN, STDEV — understand data distribution.", 
               icon: Activity,
               color: "text-emerald-600",
               bgColor: "bg-emerald-50"
             }
           ].map((item, i) => (
             <div key={i} className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${item.bgColor} flex items-center justify-center ${item.color} shadow-sm`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-zinc-900">{item.title}</h4>
                <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-2.5 flex items-center gap-3">
          <Clock className="text-indigo-600" />
          Time and Text Mastery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
           <div className="space-y-4">
              <h4 className="font-black text-zinc-900 text-sm uppercase tracking-widest">Text Functions</h4>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">Clean email lists, extract user IDs from strings, or format names for reports using <code>LEFT</code>, <code>RIGHT</code>, <code>MID</code>, and <code>CONCATENATE</code>.</p>
           </div>
           <div className="space-y-4">
              <h4 className="font-black text-zinc-900 text-sm uppercase tracking-widest">Date Functions</h4>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">Calculate user age, days since last login, or cohort months using <code>DATEDIF</code>, <code>TODAY</code>, and <code>EOMONTH</code>.</p>
           </div>
        </div>
      </section>

            <CornsilkSection
        title="Financial & Operational Modeling in Excel"
        titleColor="blue"
        items={[
                {
                          "subtitle": "Fast Data Cleaning & Lookups",
                          "headerColor": "red",
                          "description": "Master XLOOKUP, INDEX/MATCH, and TEXT functions to merge disparate CSV exports and clean raw telemetry logs in minutes."
                },
                {
                          "subtitle": "Scenario & Sensitivity Modeling",
                          "headerColor": "blue",
                          "description": "Build dynamic financial models with Data Tables and Goal Seek to evaluate pricing changes, churn sensitivity, and revenue forecasts."
                },
                {
                          "subtitle": "Data Validation & Error Auditing",
                          "headerColor": "red",
                          "description": "Implement input controls and auditing formulas (ISBLANK, IFERROR) to deliver robust, error-free models for leadership approval."
                }
      ]}
      />

      <div className="pt-3.5 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day18Content;
