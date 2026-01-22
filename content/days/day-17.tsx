
import React from 'react';
import { 
  Target, CheckCircle, Database, Clock, Calendar, 
  AlertCircle, ToggleLeft, Zap, Sparkles, Terminal, 
  Activity, Layers, Info, RefreshCw, BarChart2, ShieldCheck
} from 'lucide-react';

export const Day17Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 17: SQL Date Functions, NULL Handling & Advanced Logic 🚀</h1>
      
      <section className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Data</span>
          <p className="text-lg font-medium text-emerald-900 leading-relaxed italic">
            "Transform messy data into clean insights with SQL's most powerful functions."
          </p>
          <p className="text-sm font-bold text-emerald-700">
            Today you'll master the essential SQL functions that PMs use daily for time-based analysis, handling missing data, and building conditional logic.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <p className="text-sm font-bold text-zinc-500">By the end of Day 17, you will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Perform sophisticated date and time calculations",
            "Handle NULL values correctly in queries",
            "Build complex conditional logic with CASE statements",
            "Use aggregate functions for data summarization",
            "Solve real-world PM analytics problems"
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
          <Calendar className="text-indigo-600" />
          1. Date and Time Functions
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Product analytics is 90% time-based. "How many users signed up last week?" or "What is the average time to first purchase?" all require date functions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900 flex items-center gap-2">
                 <Clock className="w-5 h-5 text-indigo-600" /> Key Functions
              </h4>
              <ul className="space-y-3">
                 {[
                   { f: "NOW()", d: "Current date and time." },
                   { f: "DATE_TRUNC()", d: "Round dates to nearest day/week/month (critical for cohorting)." },
                   { f: "DATEDIFF()", d: "Calculate distance between two dates." },
                   { f: "EXTRACT()", d: "Get year, month, or day from a timestamp." }
                 ].map((item, i) => (
                   <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <p className="text-xs font-bold text-zinc-700"><code className="text-indigo-600 bg-zinc-50 px-1 rounded">{item.f}</code>: {item.d}</p>
                   </li>
                 ))}
              </ul>
           </div>
           
           <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 space-y-4">
              <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Example: Weekly Active Users</p>
              <div className="bg-black/50 p-4 rounded-xl font-mono text-[11px] overflow-hidden">
                <pre className="text-indigo-300">
{`SELECT 
  DATE_TRUNC('week', login_date) as week,
  COUNT(DISTINCT user_id) as wau
FROM active_logins
GROUP BY 1;`}
                </pre>
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <AlertCircle className="text-indigo-600" />
          2. NULL Handling (IS NULL, COALESCE)
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          NULL represents missing data. If you don't handle it, your metrics (like Average Revenue) will be mathematically incorrect.
        </p>
        
        <div className="space-y-6">
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                 <h4 className="font-black text-zinc-900">COALESCE()</h4>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed">Returns the first non-null value in a list. Use it to replace missing values with zeros or "Unknown".</p>
                 <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                    <code className="text-xs font-black text-indigo-600">COALESCE(referral_code, 'Organic')</code>
                 </div>
              </div>
              <div className="flex-1 space-y-4 border-t md:border-t-0 md:border-l border-zinc-100 pt-6 md:pt-0 md:pl-8">
                 <h4 className="font-black text-zinc-900">IS NULL / IS NOT NULL</h4>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed">Critical for finding "unfinished" user actions or gaps in the funnel.</p>
                 <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                    <code className="text-xs font-black text-emerald-600">WHERE payment_date IS NULL</code>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <ToggleLeft className="text-indigo-600" />
          3. Conditional Logic (CASE Statements)
        </h2>
        <div className="p-8 bg-zinc-900 text-white rounded-[3rem] border-t-8 border-indigo-500 space-y-6">
           <div className="space-y-2">
              <p className="text-xs font-black uppercase text-indigo-400">The PM's logic builder</p>
              <p className="text-lg font-black tracking-tight leading-relaxed italic text-zinc-300">
                "Bucket users by their lifetime spend to define Power, Regular, and New user segments."
              </p>
           </div>
           
           <div className="bg-black/50 p-6 rounded-2xl font-mono text-sm overflow-hidden">
              <pre className="text-indigo-300 leading-relaxed">
{`SELECT 
  user_id,
  CASE 
    WHEN lifetime_spend > 1000 THEN 'Power'
    WHEN lifetime_spend > 100 THEN 'Regular'
    ELSE 'New'
  END as user_segment
FROM payments;`}
              </pre>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <BarChart2 className="text-indigo-600" />
          4. Aggregate Functions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {[
             { name: "COUNT()", d: "Tallying items (total signups)." },
             { name: "SUM()", d: "Total value (GMV, total revenue)." },
             { name: "AVG()", d: "Averages (AOV, avg time on page)." },
             { name: "MAX/MIN()", d: "Ranges (last login, first purchase)." }
           ].map((item, i) => (
             <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-2">
                <h4 className="font-black text-indigo-600 text-sm font-mono">{item.name}</h4>
                <p className="text-[10px] font-bold text-zinc-500">{item.d}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
          <Zap className="text-amber-500" />
          Advanced Logic Pro-Tip
        </h2>
        <p className="text-sm font-bold text-zinc-600 leading-relaxed italic">
          "When using <code>COUNT(column)</code>, SQL only counts non-null values. If you want to count every single row including those with missing data, always use <code>COUNT(*)</code> or <code>COUNT(1)</code>."
        </p>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day17Content;
