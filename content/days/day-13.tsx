
import React from 'react';
import { 
  Target, CheckCircle, Search, Layers, Activity, Users, 
  MessageSquare, Bot, FileText, Zap, BarChart, TrendingUp, 
  Sparkles, MonitorPlay, Globe, Layout, Database,
  History, Clock, Lightbulb, UserCircle, Briefcase, HelpCircle,
  TrendingDown, Box, ShieldCheck, PieChart, Info,
  DollarSign, BarChart2, ArrowRight
} from 'lucide-react';

export const Day13Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 13: Opportunity Sizing (TAM / SAM / SOM) 🚀</h1>
      
      <section className="bg-purple-50 p-10 rounded-[3rem] border border-purple-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Research</span>
          <p className="text-sm font-black text-purple-600 uppercase tracking-widest mb-1">Theme</p>
          <p className="text-lg font-medium text-purple-900 leading-relaxed italic">
            “A great product solves a real problem — but a great business solves it for a market that’s big enough.”
          </p>
          <p className="text-sm font-bold text-purple-700">
            Today you’ll quantify the potential behind your product idea and learn how PMs and founders evaluate market opportunities before investing in them.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-[#7d99bf]" />
          Learning Objectives
        </h2>
        <p className="text-sm font-bold text-zinc-500">By the end of this session, learners will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Define TAM, SAM, and SOM clearly and apply them to a product idea.",
            "Use top-down, bottom-up, and value-based approaches for market sizing.",
            "Leverage AI + data tools to find reliable market estimates.",
            "Create a clear Market Opportunity Slide (for PRD or pitch decks)."
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <CheckCircle className="w-5 h-5 text-[#b4c17b] shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-zinc-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <PieChart className="text-[#7d99bf]" />
          1. Key Concepts
        </h2>
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-medium border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="py-4 px-6 font-black text-zinc-900">Term</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Meaning</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Example</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">TAM (Total Addressable Market)</td>
                  <td className="py-4 px-6">The total global demand for your product — if everyone bought it</td>
                  <td className="py-4 px-6 italic">“Global fitness app market = $7B”</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">SAM (Serviceable Available Market)</td>
                  <td className="py-4 px-6">The portion you can serve based on geography or target users</td>
                  <td className="py-4 px-6 italic">“India’s fitness app market = $1.2B”</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-zinc-900">SOM (Serviceable Obtainable Market)</td>
                  <td className="py-4 px-6">The share you can realistically capture in 2–3 years</td>
                  <td className="py-4 px-6 italic">“Target 1% of SAM → $12M”</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-[#7d99bf]/10 p-6 rounded-2xl border border-[#7d99bf]/20 flex items-center gap-3">
           <Lightbulb className="w-5 h-5 text-[#7d99bf]" />
           <p className="text-sm font-bold text-[#7d99bf] italic">Rule of Thumb: TAM shows scale, SAM shows focus, SOM shows realism.</p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <BarChart2 className="text-[#7d99bf]" />
          2. Approaches to Estimate Market Size
        </h2>
        
        <div className="space-y-6">
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-[#7d99bf]/10 flex items-center justify-center text-[#7d99bf] shadow-inner">
                   <FileText className="w-5 h-5" />
                 </div>
                 <h4 className="font-black text-zinc-900">A. Top-Down (Market Reports)</h4>
              </div>
              <p className="text-sm font-bold text-zinc-500 leading-relaxed">Use existing industry reports to derive size.</p>
              <div className="flex gap-2">
                 {['Statista', 'McKinsey', 'Gartner', 'IBISWorld'].map(s => (
                   <span key={s} className="px-2 py-1 bg-zinc-50 border border-zinc-200 rounded-lg text-[10px] font-black text-zinc-400">{s}</span>
                 ))}
              </div>
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                 <p className="text-xs font-bold text-zinc-700 italic">
                   Example: Statista reports the Indian EdTech market is $5.7B → your product targets 10% → SAM = $570M
                 </p>
              </div>
           </div>

           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-[#b4c17b]/10 flex items-center justify-center text-[#b4c17b] shadow-inner">
                   <Users className="w-5 h-5" />
                 </div>
                 <h4 className="font-black text-zinc-900">B. Bottom-Up (User-Based)</h4>
              </div>
              <p className="text-sm font-bold text-zinc-500 leading-relaxed">Start from your customer base and scale up.</p>
              <div className="p-4 bg-[#b4c17b] text-white rounded-2xl border-t-4 border-[#b4c17b]/50">
                 <p className="text-[10px] font-black uppercase text-white/80 mb-1">Formula</p>
                 <p className="text-lg font-black tracking-tight italic">SOM = (Number of target users × Price per user × Frequency)</p>
              </div>
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                 <p className="text-xs font-bold text-zinc-700 italic">
                   Example: 1M potential users × ₹300/year = ₹300M
                 </p>
              </div>
           </div>

           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
                   <Zap className="w-5 h-5" />
                 </div>
                 <h4 className="font-black text-zinc-900">C. Value-Based</h4>
              </div>
              <p className="text-sm font-bold text-zinc-500 leading-relaxed">Estimate based on how much value you create or replace.</p>
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                 <p className="text-xs font-bold text-zinc-700 italic">
                   Example: AI recruitment tool saves 5 hours/week per recruiter × ₹500/hour → ₹2,500 value per user/month. 
                   If users pay 10% → ₹250/month × 10,000 users = ₹30M market.
                 </p>
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Bot className="text-[#7d99bf]" />
          3. Using AI Tools for Market Sizing
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-zinc-950 text-white p-8 rounded-[2.5rem] border-t-8 border-[#7d99bf] space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <Zap className="text-[#7d99bf] w-4 h-4" />
                 <h4 className="font-black text-[#7d99bf] text-xs uppercase tracking-widest">Perplexity AI Prompt</h4>
              </div>
              <p className="text-sm font-bold text-zinc-300 italic">
                “Estimate the total addressable market (TAM) for AI-powered personal productivity tools globally and in India for 2025. Include data sources.”
              </p>
              <div className="pt-4 border-t border-white/10 space-y-2">
                 <p className="text-[10px] font-black uppercase text-zinc-500">Output Example</p>
                 <ul className="text-xs font-medium text-zinc-400 space-y-1">
                    <li>• Global market: $9.8B (CAGR 17%)</li>
                    <li>• India: $520M (growing at 22%)</li>
                    <li>• Sources: Statista, Markets & Markets...</li>
                 </ul>
              </div>
           </div>

           <div className="bg-zinc-950 text-white p-8 rounded-[2.5rem] border-t-8 border-[#b4c17b] space-y-4">
              <div className="flex items-center gap-2 mb-2">
                 <MessageSquare className="text-[#b4c17b] w-4 h-4" />
                 <h4 className="font-black text-[#b4c17b] text-xs uppercase tracking-widest">ChatGPT Prompt</h4>
              </div>
              <p className="text-sm font-bold text-zinc-300 italic">
                “You’re a Product Manager at a startup building a sleep-tracking AI app. Estimate TAM, SAM, and SOM using a bottom-up model based on smartphone users aged 20–45.”
              </p>
              <p className="text-xs font-medium text-zinc-500 pt-2">
                ChatGPT can then calculate user segments × pricing × conversion = SOM estimate.
              </p>
           </div>

           <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                 <Globe className="text-[#7d99bf] w-5 h-5" />
                 <h4 className="font-black text-zinc-900">Google Trends</h4>
              </div>
              <p className="text-xs font-bold text-zinc-500 leading-relaxed">
                Use to identify demand spikes by region or term.
              </p>
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <p className="text-[10px] font-black text-[#7d99bf]">Example: “AI productivity tools” searches ↑ 350% YoY → validates growing market.</p>
              </div>
           </div>

           <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                 <Layout className="text-[#7d99bf] w-5 h-5" />
                 <h4 className="font-black text-zinc-900">Power BI / Excel</h4>
              </div>
              <p className="text-xs font-bold text-zinc-500 leading-relaxed">
                Use to visualize TAM → SAM → SOM funnel and highlight potential revenue over 3 years.
              </p>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-[#7d99bf]" />
          4. Visual Framework
        </h2>
        
        <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-200">
           <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 mb-10 text-center">TAM–SAM–SOM Funnel (Example)</h3>
           <div className="flex flex-col items-center gap-2 max-w-md mx-auto">
              <div className="w-full bg-[#7d99bf] text-white p-6 rounded-t-[3rem] text-center border-b border-[#7d99bf]/80 shadow-xl">
                 <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-1">TAM</p>
                 <p className="text-xl font-black">$5B (Global market)</p>
              </div>
              <ArrowRight className="w-6 h-6 text-zinc-300 rotate-90" />
              <div className="w-4/5 bg-[#7d99bf]/90 text-white p-6 text-center border-b border-[#7d99bf]/70 shadow-lg">
                 <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-1">SAM</p>
                 <p className="text-lg font-black">$1B (India + SEA)</p>
              </div>
              <ArrowRight className="w-6 h-6 text-zinc-300 rotate-90" />
              <div className="w-3/5 bg-[#7d99bf]/80 text-white p-6 rounded-b-[3rem] text-center shadow-md">
                 <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-1">SOM</p>
                 <p className="text-sm font-black">$50M (5% realistic capture in 3 years)</p>
              </div>
           </div>
        </div>

        <div className="bg-[#b4c17b]/10 p-6 rounded-2xl border border-[#b4c17b]/20 flex items-center gap-3">
           <TrendingUp className="w-5 h-5 text-[#b4c17b]" />
           <p className="text-sm font-bold text-zinc-800">📈 Pro Tip: Investors and PMs always look for large TAM ({">"}$1B) but realistic SOM (~1–5% of SAM).</p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Activity className="text-[#7d99bf]" />
          5. Example: Zomato (Early Days)
        </h2>
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-medium border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="py-4 px-6 font-black text-zinc-900">Metric</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Estimate</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Explanation</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">TAM</td>
                  <td className="py-4 px-6 font-black text-[#7d99bf]">$20B</td>
                  <td className="py-4 px-6">Global food delivery market</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">SAM</td>
                  <td className="py-4 px-6 font-black text-[#7d99bf]">$1.5B</td>
                  <td className="py-4 px-6">Indian food delivery segment</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-zinc-900">SOM</td>
                  <td className="py-4 px-6 font-black text-[#7d99bf]">$150M</td>
                  <td className="py-4 px-6">10% share targeted in 3 years</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-[#7d99bf]/10 border-t border-[#7d99bf]/20">
             <p className="text-sm font-bold text-[#7d99bf] italic">Result: Large TAM, strong focus. Attracted early investors due to market depth.</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Briefcase className="text-[#7d99bf]" />
          6. Real-World PM Example
        </h2>
        <div className="p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
             <Globe className="w-48 h-48 text-[#7d99bf]" />
           </div>
           <h3 className="text-2xl font-black text-zinc-900 mb-6">Product: Duolingo</h3>
           <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#7d99bf]" />
                 <p className="text-sm font-bold text-zinc-700 leading-relaxed">
                   <span className="font-black text-[#7d99bf]">TAM:</span> Global EdTech & language learning market ($60B)
                 </p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#7d99bf]" />
                 <p className="text-sm font-bold text-zinc-700 leading-relaxed">
                   <span className="font-black text-[#7d99bf]">SAM:</span> App-based learning ($8B)
                 </p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#7d99bf]" />
                 <p className="text-sm font-bold text-zinc-700 leading-relaxed">
                   <span className="font-black text-[#7d99bf]">SOM:</span> 2% of SAM ($160M initial target)
                 </p>
              </div>
           </div>
           <div className="mt-8 p-6 bg-[#b4c17b]/10 rounded-2xl border border-[#b4c17b]/20">
              <p className="text-sm font-bold text-zinc-800 italic leading-relaxed">
                Result: PMs used this sizing to justify product investment → Duolingo’s monetization strategy followed later.
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

export default Day13Content;
