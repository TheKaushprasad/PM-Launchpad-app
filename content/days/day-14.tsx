
import React from 'react';
import { 
  Target, CheckCircle, Database, Search, Code, Terminal, 
  MessageSquare, Bot, Zap, BarChart, TrendingUp, Sparkles, 
  Activity, List, Layout, Clock, MonitorPlay, Info
} from 'lucide-react';

export const Day14Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 14: Introduction to SQL (SELECT, WHERE, Basics) 🚀</h1>
      
      <section className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Data</span>
          <p className="text-lg font-medium text-emerald-900 leading-relaxed italic">
            "Data is the voice of your users. SQL lets you listen."
          </p>
          <p className="text-sm font-bold text-emerald-700">
            Today you'll learn the fundamentals of querying databases — a superpower that lets PMs answer their own questions instead of waiting for analysts.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <p className="text-sm font-bold text-zinc-500">By the end of Day 14, you will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Understand what SQL is and why PMs need it",
            "Set up a practice SQL environment",
            "Write basic SELECT queries to retrieve data",
            "Filter data using WHERE clauses",
            "Execute DDL and DML commands"
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
          1. What is SQL and Why PMs Need It
        </h2>
        
        <div className="space-y-6">
          <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
            <h4 className="font-black text-zinc-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              What is SQL?
            </h4>
            <p className="text-sm font-medium text-zinc-600 leading-relaxed">
              SQL (Structured Query Language) = the language for communicating with databases.
            </p>
            <p className="text-sm font-bold text-zinc-500 italic">
              Think of it as asking questions to a spreadsheet on steroids:
            </p>
            <ul className="space-y-2">
              {["\"How many users signed up last week?\"", "\"Which features are most used by paying customers?\"", "\"What's our 7-day retention rate?\""].map((q, i) => (
                <li key={i} className="text-xs font-black text-indigo-600 flex items-center gap-2 italic">
                  <MessageSquare className="w-3 h-3" /> {q}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
            <h4 className="font-black text-zinc-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600" />
              Why PMs Need SQL
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-xs font-black uppercase text-zinc-400 tracking-widest">The Problem</p>
                <p className="text-sm font-bold text-rose-600 italic">"Without SQL: You wait for analysts, ask vague questions, get delayed answers."</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black uppercase text-zinc-400 tracking-widest">The Solution</p>
                <p className="text-sm font-bold text-emerald-600 italic">"With SQL: You validate hypotheses in real-time and make data-driven decisions independently."</p>
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <p className="text-xs font-black text-zinc-900 uppercase tracking-widest">PMs use SQL to:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Fetch user data: Signups, purchases, churn",
                  "Validate hypotheses: \"Do users who complete onboarding have higher retention?\"",
                  "Track KPIs: DAU (Daily Active Users), retention, conversion rates",
                  "Support A/B tests: Compare metrics between control and variant groups",
                  "Debug issues: \"Why did sign-ups drop yesterday?\""
                ].map((item, i) => (
                  <li key={i} className="text-xs font-bold text-zinc-500 flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-indigo-400 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Terminal className="text-indigo-600" />
          Real PM Use Cases
        </h2>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <span className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-black text-xs">C1</span>
               <h4 className="font-black text-zinc-900">Case 1: Feature Adoption</h4>
            </div>
            <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 font-mono text-sm overflow-hidden">
              <pre className="text-indigo-300">
{`SELECT feature_name, COUNT(DISTINCT user_id) as users
FROM feature_usage
WHERE date >= '2025-01-01'
GROUP BY feature_name;`}
              </pre>
            </div>
            <p className="text-xs font-bold text-zinc-500 italic flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Result: Identify which features are actually being used
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <span className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-black text-xs">C2</span>
               <h4 className="font-black text-zinc-900">Case 2: Churn Analysis</h4>
            </div>
            <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 font-mono text-sm overflow-hidden">
              <pre className="text-indigo-300">
{`SELECT * FROM users
WHERE last_active_date < '2025-01-01'
AND signup_date < '2024-12-01';`}
              </pre>
            </div>
            <p className="text-xs font-bold text-zinc-500 italic flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Result: Find users who haven't logged in for 30+ days
            </p>
          </div>
        </div>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day14Content;