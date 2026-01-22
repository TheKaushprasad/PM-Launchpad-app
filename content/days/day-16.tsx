
import React from 'react';
import { 
  Target, CheckCircle, Database, Code, Terminal, 
  MessageSquare, Bot, Zap, BarChart, TrendingUp, Sparkles, 
  Activity, List, Layout, Clock, MonitorPlay, Info, Layers, 
  ArrowRight, Share2, Filter, Settings2, ShieldCheck, Box
} from 'lucide-react';

export const Day16Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 16: SQL Set Operators & Functions Deep Dive 🚀</h1>
      
      <section className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Data</span>
          <p className="text-lg font-medium text-emerald-900 leading-relaxed italic">
            "Master SQL functions to transform raw data into actionable insights."
          </p>
          <p className="text-sm font-bold text-emerald-700">
            Today you'll learn advanced SQL techniques for combining datasets and manipulating data with built-in functions — essential skills for complex product analysis.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <p className="text-sm font-bold text-zinc-500">By the end of Day 16, you will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Combine query results using UNION, INTERSECT, and EXCEPT",
            "Apply string functions to clean and format text data",
            "Use numeric functions for calculations and rounding",
            "Solve complex data transformation problems",
            "Write efficient queries for real-world PM scenarios"
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
          <Layers className="text-indigo-600" />
          1. Set Operators
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Set operators allow you to combine the results of two or more SELECT statements into a single result set.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { 
               title: "UNION / UNION ALL", 
               desc: "Combines result sets. UNION removes duplicates, UNION ALL keeps them.", 
               example: "SELECT name FROM ios_users UNION SELECT name FROM android_users",
               icon: Share2,
               color: "text-indigo-600",
               bgColor: "bg-indigo-50"
             },
             { 
               title: "INTERSECT", 
               desc: "Returns only the records that exist in both result sets.", 
               example: "SELECT user_id FROM free_tier INTERSECT SELECT user_id FROM beta_testers",
               icon: Target,
               color: "text-emerald-600",
               bgColor: "bg-emerald-50"
             },
             { 
               title: "EXCEPT (or MINUS)", 
               desc: "Returns records from the first query that are NOT in the second query.", 
               example: "SELECT user_id FROM signups EXCEPT SELECT user_id FROM active_users",
               icon: Filter,
               color: "text-amber-600",
               bgColor: "bg-amber-50"
             }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${item.bgColor} flex items-center justify-center ${item.color} shadow-sm`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-zinc-900">{item.title}</h4>
                <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
                <div className="pt-2">
                   <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">SQL snippet</p>
                   <code className="text-[10px] font-black text-indigo-600 bg-zinc-50 px-2 py-1 rounded border border-zinc-100 block truncate">{item.example}</code>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Settings2 className="text-indigo-600" />
          2. SQL Functions Deep Dive
        </h2>
        
        <div className="space-y-8">
          {/* String Functions */}
          <div className="p-8 bg-zinc-50 rounded-[3rem] border border-zinc-200 space-y-6">
             <div className="flex items-center gap-3">
                <MessageSquare className="text-indigo-600 w-6 h-6" />
                <h3 className="text-xl font-black text-zinc-900">String Functions</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "UPPER() / LOWER()", use: "Standardize case for comparisons (e.g., email matching)." },
                  { name: "TRIM()", use: "Remove leading/trailing spaces from user input." },
                  { name: "CONCAT()", use: "Combine columns (e.g., first_name + last_name)." },
                  { name: "SUBSTRING()", use: "Extract specific parts of a string (e.g., area code from phone)." }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm">
                     <p className="text-xs font-black text-indigo-600 mb-1 font-mono">{item.name}</p>
                     <p className="text-xs font-bold text-zinc-500">{item.use}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* Numeric Functions */}
          <div className="p-8 bg-zinc-50 rounded-[3rem] border border-zinc-200 space-y-6">
             <div className="flex items-center gap-3">
                <TrendingUp className="text-emerald-600 w-6 h-6" />
                <h3 className="text-xl font-black text-zinc-900">Numeric Functions</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "ROUND()", use: "Format currency or percentage results (e.g., ROUND(conversion, 2))." },
                  { name: "ABS()", use: "Get the absolute value (useful for variance analysis)." },
                  { name: "CEIL() / FLOOR()", use: "Round up or down to the nearest integer." },
                  { name: "RAND()", use: "Generate random numbers for data sampling." }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm">
                     <p className="text-xs font-black text-emerald-600 mb-1 font-mono">{item.name}</p>
                     <p className="text-xs font-bold text-zinc-500">{item.use}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Terminal className="text-indigo-600" />
          Real-World PM Scenario
        </h2>
        
        <div className="p-8 bg-zinc-900 text-white rounded-[2.5rem] border-t-8 border-indigo-500 space-y-6">
           <div>
              <p className="text-xs font-black uppercase text-indigo-400 mb-2">The Task</p>
              <p className="text-lg font-black tracking-tight leading-relaxed italic text-zinc-300">
                "Identify users who signed up but have NEVER logged in, and format their names for a marketing email."
              </p>
           </div>
           
           <div className="bg-black/50 p-6 rounded-2xl font-mono text-sm overflow-hidden">
              <pre className="text-indigo-300 leading-relaxed">
{`SELECT 
    UPPER(TRIM(first_name)) as formatted_first_name,
    LOWER(TRIM(email)) as contact_email
FROM users
EXCEPT
SELECT 
    UPPER(TRIM(u.first_name)),
    LOWER(TRIM(u.email))
FROM users u
JOIN logins l ON u.user_id = l.user_id;`}
              </pre>
           </div>

           <div className="pt-4 border-t border-white/10">
              <p className="text-[10px] font-black uppercase text-zinc-500 mb-2">Why this works</p>
              <p className="text-sm font-medium text-zinc-400 leading-relaxed">
                We use <code className="text-indigo-400">EXCEPT</code> to find the difference between "all users" and "users with login records". <code className="text-indigo-400">UPPER</code> and <code className="text-indigo-400">TRIM</code> ensure the marketing tool gets clean, consistent data.
              </p>
           </div>
        </div>
      </section>

      <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
          <Sparkles className="text-amber-500" />
          Data Transformation Pro-Tip
        </h2>
        <p className="text-sm font-bold text-zinc-600 leading-relaxed italic">
          "Raw database strings are messy. Always use <code>LOWER(TRIM(column))</code> when comparing user emails or IDs to prevent 'ghost' duplicates caused by hidden spaces or case differences."
        </p>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day16Content;
