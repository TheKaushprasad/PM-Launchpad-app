
import React from 'react';
import { 
  Target, CheckCircle, Database, Search, Code, Terminal, 
  MessageSquare, Bot, Zap, BarChart, TrendingUp, Sparkles, 
  Activity, List, Layout, Clock, MonitorPlay, Info, Layers, 
  ArrowRight, Share2, Filter
} from 'lucide-react';

export const Day15Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 15: Filtering Data & SQL Joins 🚀</h1>
      
      <section className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Data</span>
          <p className="text-lg font-medium text-emerald-900 leading-relaxed italic">
            "Joining tables is where SQL becomes powerful for PMs."
          </p>
          <p className="text-sm font-bold text-emerald-700">
            Today you'll master advanced filtering and learn to combine data from multiple tables — essential for real-world product analysis.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
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

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Filter className="text-indigo-600" />
          1. Advanced Filtering (WHERE Clause)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <Share2 className="text-indigo-600" />
          2. SQL Joins Explained
        </h2>
        
        <div className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <div className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">INNER</div>
                       <h4 className="font-black text-zinc-900">Inner Join</h4>
                    </div>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">Returns records that have matching values in both tables. Most common join for PMs.</p>
                 </div>
                 <div className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xs">LEFT</div>
                       <h4 className="font-black text-zinc-900">Left Join</h4>
                    </div>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">Returns all records from the left table, and matched records from the right table. Great for finding "ghost" users.</p>
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-black text-xs">RIGHT</div>
                       <h4 className="font-black text-zinc-900">Right Join</h4>
                    </div>
                    <p className="text-xs font-medium text-zinc-500 leading-relaxed">Returns all records from the right table, and matched records from the left table. Rare compared to Left Join.</p>
                 </div>
                 <div className="p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm relative overflow-hidden group">
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

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Terminal className="text-indigo-600" />
          Real-World Join Example
        </h2>
        
        <div className="space-y-6">
          <div className="p-8 bg-zinc-900 text-white rounded-[2.5rem] border-t-8 border-emerald-500 space-y-6">
             <div>
                <p className="text-xs font-black uppercase text-emerald-400 mb-2">Scenario</p>
                <p className="text-lg font-black tracking-tight leading-relaxed italic text-zinc-300">
                  "Find the names of users who have made a purchase in January 2025."
                </p>
             </div>
             
             <div className="bg-black/50 p-6 rounded-2xl font-mono text-sm overflow-hidden">
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

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-indigo-600" />
          3. Set Operators: UNION vs UNION ALL
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900">UNION</h4>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">Combines results and <strong>removes duplicates</strong>. Slower because of the distinct operation.</p>
           </div>
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900">UNION ALL</h4>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">Combines results and <strong>keeps duplicates</strong>. Faster because it doesn't filter.</p>
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

export default Day15Content;
