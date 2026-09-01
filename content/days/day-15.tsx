import { CornsilkSection } from '../../components/CornsilkSection';

import React from 'react';
import { 
  Target, CheckCircle, Database, Search, Code, Terminal, 
  MessageSquare, Bot, Zap, BarChart, TrendingUp, Sparkles, 
  Activity, List, Layout, Clock, MonitorPlay, Info, Layers, 
  ArrowRight, Share2, Filter
} from 'lucide-react';

export const Day15Content = () => {
  return (
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-blue-50/70 p-3.5 sm:p-4 rounded-xl border border-blue-100/80">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Data</span>
          <p className="text-sm sm:text-base font-medium text-blue-900 leading-relaxed italic">
            "Joining tables is where SQL becomes powerful for PMs."
          </p>
          <p className="text-sm font-bold text-emerald-700">
            Today you'll master advanced filtering and learn to combine data from multiple tables — essential for real-world product analysis.
          </p>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <p className="text-sm font-bold text-zinc-500">By the end of Day 15, you will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Use advanced WHERE filters (LIKE, IN, BETWEEN)",
            "Understand the concept of database relationships",
            "Perform INNER, LEFT, RIGHT, and FULL JOINS",
            "Combine data from multiple tables to answer complex PM questions",
            "Use UNION and other set operators"
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
          <Filter className="text-indigo-600" />
          1. Advanced Filtering (WHERE Clause)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5">
           {[
             { 
               title: "LIKE Operator", 
               desc: "Search for patterns in strings.", 
               example: "WHERE email LIKE '%@gmail.com'",
               icon: Search,
               color: "text-indigo-600",
               bgColor: "bg-indigo-50"
             },
             { 
               title: "IN Operator", 
               desc: "Specify multiple values in a WHERE clause.", 
               example: "WHERE country IN ('India', 'USA', 'UK')",
               icon: List,
               color: "text-emerald-600",
               bgColor: "bg-emerald-50"
             },
             { 
               title: "BETWEEN Operator", 
               desc: "Filter values within a range.", 
               example: "WHERE age BETWEEN 18 AND 25",
               icon: Activity,
               color: "text-amber-600",
               bgColor: "bg-amber-50"
             }
           ].map((item, i) => (
             <div key={i} className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-4">
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

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Share2 className="text-indigo-600" />
          2. SQL Joins Explained
        </h2>
        
        <div className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
              <div className="space-y-2.5">
                 <div className="p-4 bg-white rounded-3xl border border-zinc-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">INNER</div>
                       <h4 className="font-black text-zinc-900">Inner Join</h4>
                    </div>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">Returns records that have matching values in both tables. Most common join for PMs.</p>
                 </div>
                 <div className="p-4 bg-white rounded-3xl border border-zinc-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xs">LEFT</div>
                       <h4 className="font-black text-zinc-900">Left Join</h4>
                    </div>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">Returns all records from the left table, and matched records from the right table. Great for finding "ghost" users.</p>
                 </div>
              </div>
              <div className="space-y-2.5">
                 <div className="p-4 bg-white rounded-3xl border border-zinc-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-black text-xs">RIGHT</div>
                       <h4 className="font-black text-zinc-900">Right Join</h4>
                    </div>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">Returns all records from the right table, and matched records from the left table. Rare compared to Left Join.</p>
                 </div>
                 <div className="p-4 bg-white rounded-3xl border border-zinc-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs">FULL</div>
                       <h4 className="font-black text-zinc-900">Full Outer Join</h4>
                    </div>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">Returns all records when there is a match in either left or right table records.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Terminal className="text-indigo-600" />
          Real-World Join Example
        </h2>
        
        <div className="space-y-2.5">
          <div className="p-4 sm:p-5 bg-zinc-900 text-white rounded-2xl border-t-8 border-emerald-500 space-y-6">
             <div>
                <p className="text-xs font-black uppercase text-emerald-400 mb-2">Scenario</p>
                <p className="text-lg font-black tracking-tight leading-relaxed italic text-zinc-300">
                  "Find the names of users who have made a purchase in January 2025."
                </p>
             </div>
             
             <div className="bg-black/50 p-4 rounded-2xl font-mono text-sm overflow-hidden">
                <pre className="text-indigo-300 leading-relaxed">
{`SELECT users.name, purchases.amount
FROM users
INNER JOIN purchases ON users.user_id = purchases.user_id
WHERE purchases.date >= '2025-01-01';`}
                </pre>
             </div>

             <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] font-black uppercase text-zinc-500 mb-2">Why we join</p>
                <p className="text-sm font-medium text-zinc-400">
                  User names are in the <code className="text-indigo-400">users</code> table, but transaction data is in the <code className="text-indigo-400">purchases</code> table. The <code className="text-indigo-400">user_id</code> connects them.
                </p>
             </div>
          </div>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-indigo-600" />
          3. Set Operators: UNION vs UNION ALL
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
           <div className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900">UNION</h4>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">Combines results and <strong>removes duplicates</strong>. Slower because of the distinct operation.</p>
           </div>
           <div className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900">UNION ALL</h4>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">Combines results and <strong>keeps duplicates</strong>. Faster because it doesn't filter.</p>
           </div>
        </div>
      </section>

            <CornsilkSection
        title="Relational Data Modeling & SQL Joins"
        titleColor="blue"
        items={[
                {
                          "subtitle": "Cross-Table Relationship Mapping",
                          "headerColor": "blue",
                          "description": "Master INNER, LEFT, and FULL OUTER joins to combine transactional logs, user profiles, and event clickstreams into unified analytical views."
                },
                {
                          "subtitle": "Aggregations & Grouping",
                          "headerColor": "red",
                          "description": "Leverage COUNT, SUM, AVG, and GROUP BY clauses with HAVING filters to calculate active user metrics and cohort retention trends accurately."
                },
                {
                          "subtitle": "Data Hygiene & Null Handling",
                          "headerColor": "blue",
                          "description": "Guard queries against missing foreign keys, null values, and duplicate records to ensure metrics accurately reflect customer behavior."
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

export default Day15Content;
