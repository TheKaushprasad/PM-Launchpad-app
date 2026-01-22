
import React from 'react';
import { 
  Target, CheckCircle, Zap, TrendingUp, BarChart, 
  Layers, DollarSign, PieChart, Users, Star, 
  Briefcase, Activity, Scale, AlertTriangle, ShieldCheck,
  TrendingDown, Percent, Box, RefreshCcw, Smartphone, Code, Bot, Rocket, Search, Globe, CreditCard,
  // Added missing icons to fix "Cannot find name" errors
  Lightbulb, MonitorPlay
} from 'lucide-react';

export const Day8Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 8: Business Fundamentals for Product Managers 🚀</h1>
      
      <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Strategy</span>
          <p className="text-lg font-medium text-blue-900 leading-relaxed italic">
            "Master the Metrics That Drive Sustainable Products. Learn CAC, LTV, and the 'Golden Ratio' of business success."
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Understand and calculate key unit economics metrics (CAC, LTV, payback period)",
            "Identify and analyze different business models and revenue streams",
            "Evaluate product decisions through a business lens",
            "Communicate the business impact of product features",
            "Assess product-market fit using business metrics"
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-zinc-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Briefcase className="text-indigo-600" />
          Why Business Fundamentals Matter for PMs
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Product Managers are often called the "mini-CEO" of their product. Here's why business knowledge is critical:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 space-y-4">
            <h4 className="font-black text-emerald-900 uppercase tracking-widest text-xs">What Good PMs Do</h4>
            <ul className="space-y-3">
              {[
                "Balance user value with business value - Build features that delight users AND drive revenue",
                "Justify investments with ROI calculations - Make data-backed cases for resource allocation",
                "Speak confidently to executives - Communicate in the language of business impact",
                "Understand customer lifecycle economics - Know what makes customers profitable over time"
              ].map((text, i) => (
                <li key={i} className="flex gap-2 text-sm font-bold text-emerald-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100 space-y-4">
            <h4 className="font-black text-rose-900 uppercase tracking-widest text-xs">Common PM Mistakes</h4>
            <ul className="space-y-3">
              {[
                "Building features users love but don't pay for - High engagement, zero revenue",
                "Ignoring customer acquisition costs - Growing unprofitably",
                "Focusing on vanity metrics - Celebrating downloads while losing money",
                "Ignoring sustainability - Short-term wins, long-term failure"
              ].map((text, i) => (
                <li key={i} className="flex gap-2 text-sm font-bold text-rose-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Globe className="text-indigo-600" />
          Real-World Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: "Twitter/X", 
              lesson: "Built incredible engagement but struggled with monetization for a decade. Lesson: Engagement ≠ Business Success.",
              color: "bg-zinc-50"
            },
            { 
              title: "Instagram", 
              lesson: "Delayed monetization to focus on growth. Worked because they had Facebook's massive resources. Lesson: Context matters - most startups can't afford this luxury.",
              color: "bg-zinc-50"
            },
            { 
              title: "Notion", 
              lesson: "Freemium model carefully designed to convert power users. Model aligned perfectly with user behavior. Lesson: Business model should match how users naturally derive value.",
              color: "bg-zinc-50"
            }
          ].map((item, i) => (
            <div key={i} className={`p-6 rounded-3xl border border-zinc-100 ${item.color} shadow-sm`}>
               <h4 className="font-black text-zinc-900 mb-2">{item.title}</h4>
               <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.lesson}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg">
             <DollarSign className="w-6 h-6 text-white" />
           </div>
           <div>
              <h2 className="text-2xl font-black text-zinc-900">Core Metric #1: Customer Acquisition Cost (CAC)</h2>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">How much it costs to acquire one new customer.</p>
           </div>
        </div>

        <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] text-center border-t-8 border-indigo-500">
           <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">The Formula</p>
           <p className="text-2xl font-black tracking-tighter">CAC = (Total Marketing Costs + Total Sales Costs) / Number of New Customers Acquired</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-4">
             <h4 className="font-black text-zinc-900 uppercase tracking-widest text-xs">Example Calculation</h4>
             <div className="space-y-1">
                <p className="text-sm font-bold text-zinc-500">Marketing spend: $40,000</p>
                <p className="text-sm font-bold text-zinc-500">Sales team costs: $10,000</p>
                <p className="text-sm font-bold text-zinc-500">New customers acquired: 500</p>
             </div>
             <p className="text-xl font-black text-indigo-600">CAC = ($40,000 + $10,000) / 500 = $100</p>
          </div>
          
          <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-4">
             <h4 className="font-black text-zinc-900 uppercase tracking-widest text-xs">What to Include in CAC</h4>
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <p className="text-[10px] font-black uppercase text-indigo-500 mb-2">Marketing</p>
                 <ul className="text-[10px] font-bold text-zinc-500 space-y-1">
                   <li>Paid ads (Google/FB)</li>
                   <li>Content marketing</li>
                   <li>Marketing tools</li>
                   <li>Team salaries</li>
                 </ul>
               </div>
               <div>
                 <p className="text-[10px] font-black uppercase text-rose-500 mb-2">Sales</p>
                 <ul className="text-[10px] font-bold text-zinc-500 space-y-1">
                   <li>Team commissions</li>
                   <li>Sales tools (CRM)</li>
                   <li>Training/Enablement</li>
                   <li>Travel/Entertainment</li>
                 </ul>
               </div>
             </div>
          </div>
        </div>

        <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-100 overflow-hidden">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">CAC by Channel</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-medium border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="pb-4 pr-4 font-black text-zinc-900">Channel</th>
                    <th className="pb-4 px-4 font-black text-zinc-900">CAC</th>
                    <th className="pb-4 pl-4 font-black text-zinc-900">Insight</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-600">
                  <tr className="border-b border-zinc-100">
                    <td className="py-4 pr-4 font-bold text-zinc-900">Organic Search</td>
                    <td className="py-4 px-4">$25</td>
                    <td className="py-4 pl-4">Invest in SEO</td>
                  </tr>
                  <tr className="border-b border-zinc-100">
                    <td className="py-4 pr-4 font-bold text-zinc-900">Paid Search</td>
                    <td className="py-4 px-4">$120</td>
                    <td className="py-4 pl-4">Monitor closely</td>
                  </tr>
                  <tr className="border-b border-zinc-100">
                    <td className="py-4 pr-4 font-bold text-zinc-900">Social Media</td>
                    <td className="py-4 px-4">$80</td>
                    <td className="py-4 pl-4">Good performer</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-bold text-zinc-900">Referrals</td>
                    <td className="py-4 px-4">$15</td>
                    <td className="py-4 pl-4">Build referral program</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg">
             <Activity className="w-6 h-6 text-white" />
           </div>
           <div>
              <h2 className="text-2xl font-black text-zinc-900">Core Metric #2: Lifetime Value (LTV)</h2>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Total revenue earned from a customer over their entire relationship.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] border-t-8 border-emerald-500">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Simple LTV Formula</p>
              <p className="text-xl font-black tracking-tighter mb-4">LTV = ARPU × Average Customer Lifespan</p>
              <div className="p-4 bg-white/5 rounded-xl text-xs font-bold text-zinc-400">
                 ARPU = Average Revenue Per User (monthly or annual)
              </div>
           </div>
           <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] border-t-8 border-indigo-500">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Advanced LTV Formula (with Churn)</p>
              <p className="text-xl font-black tracking-tighter mb-4">LTV = (ARPU × Gross Margin) / Churn Rate</p>
           </div>
        </div>

        <div className="bg-indigo-50 p-8 rounded-[3rem] border border-indigo-100">
           <h4 className="text-lg font-black text-indigo-900 mb-4 flex items-center gap-2">
             <Lightbulb className="w-5 h-5" /> Critical Insight
           </h4>
           <p className="text-indigo-800 font-bold leading-relaxed">
             Increasing customer lifespan by 50% directly increases LTV by 50%, without spending more on marketing! This is why retention features are often the highest-ROI investments you can make.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <h4 className="font-black text-zinc-900 uppercase tracking-widest text-xs flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> Increase LTV by:
              </h4>
              <ul className="space-y-2">
                 {[
                   "Reducing churn (retention features)",
                   "Increasing ARPU (upsells, premium tiers)",
                   "Improving gross margin (operational efficiency)",
                   "Adding new revenue streams"
                 ].map((t, i) => (
                   <li key={i} className="flex gap-3 text-sm font-bold text-zinc-700">
                     <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> {t}
                   </li>
                 ))}
              </ul>
           </div>
           <div className="space-y-4">
              <h4 className="font-black text-zinc-900 uppercase tracking-widest text-xs flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-rose-500" /> LTV Killers:
              </h4>
              <ul className="space-y-2">
                 {[
                   "Poor onboarding",
                   "Missing core features",
                   "Bad customer support",
                   "Lack of product updates"
                 ].map((t, i) => (
                   <li key={i} className="flex gap-3 text-sm font-bold text-zinc-700">
                     <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" /> {t}
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-amber-600 rounded-2xl shadow-lg">
             <Star className="w-6 h-6 text-white" />
           </div>
           <div>
              <h2 className="text-2xl font-black text-zinc-900">The Golden Ratio: LTV:CAC</h2>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">The most important business metric for PMs.</p>
           </div>
        </div>

        <p className="text-zinc-600 font-medium leading-relaxed">
           This ratio tells you whether your business model is sustainable and how aggressively you can grow.
        </p>

        <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm overflow-hidden">
            <h3 className="p-6 bg-zinc-50 border-b border-zinc-100 text-sm font-black uppercase tracking-[0.2em] text-zinc-400">The Ratio Guide</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-medium border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="py-4 px-6 font-black text-zinc-900">Ratio</th>
                    <th className="py-4 px-6 font-black text-zinc-900">Status</th>
                    <th className="py-4 px-6 font-black text-zinc-900">What It Means</th>
                    <th className="py-4 px-6 font-black text-zinc-900">Action Required</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-600">
                  <tr className="border-b border-zinc-50">
                    <td className="py-4 px-6 font-bold text-zinc-900">{"< 1:1"}</td>
                    <td className="py-4 px-6"><span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-[10px] font-black uppercase">Crisis Mode</span></td>
                    <td className="py-4 px-6">Losing money on every customer</td>
                    <td className="py-4 px-6 font-black text-rose-600">Reduce CAC or increase LTV urgently</td>
                  </tr>
                  <tr className="border-b border-zinc-50">
                    <td className="py-4 px-6 font-bold text-zinc-900">1:1 to 3:1</td>
                    <td className="py-4 px-6"><span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase">Concerning</span></td>
                    <td className="py-4 px-6">Barely sustainable</td>
                    <td className="py-4 px-6">Optimize efficiency</td>
                  </tr>
                  <tr className="border-b border-zinc-50">
                    <td className="py-4 px-6 font-bold text-zinc-900">3:1 to 5:1</td>
                    <td className="py-4 px-6"><span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase">Sweet Spot</span></td>
                    <td className="py-4 px-6">Optimal balance. Scalable and healthy</td>
                    <td className="py-4 px-6 font-black text-emerald-600">Maintain and scale</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-zinc-900">{"> 5:1"}</td>
                    <td className="py-4 px-6"><span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase">Underinvesting</span></td>
                    <td className="py-4 px-6">Too conservative on growth</td>
                    <td className="py-4 px-6">Competitors might outgrow you</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg">
             <Percent className="w-6 h-6 text-white" />
           </div>
           <div>
              <h2 className="text-2xl font-black text-zinc-900">Core Metric #3: Payback Period</h2>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">How long it takes to recover the cost of acquiring a customer.</p>
           </div>
        </div>

        <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] text-center border-t-8 border-indigo-500">
           <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">The Formula</p>
           <p className="text-2xl font-black tracking-tighter">Payback Period (months) = CAC / (ARPU × Gross Margin)</p>
        </div>

        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
           <p className="text-sm font-bold text-emerald-800 tracking-tight">
             Target Benchmark: <span className="font-black">{"< 12 months"}</span> is generally considered healthy for SaaS businesses.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { title: "Cash Flow Management", desc: "Shorter payback = less capital tied up. Can reinvest revenue faster." },
             { title: "Risk Reduction", desc: "Faster payback means less exposure to churn. More resilient to changes." },
             { title: "Growth Velocity", desc: "Revenue compounds quickly. Companies can scale much faster." }
           ].map((item, i) => (
             <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <h4 className="font-black text-zinc-900 mb-2">{item.title}</h4>
                <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
          <PieChart className="text-indigo-600" />
          Business Models & Revenue Streams
        </h2>

        <div className="space-y-8">
          {[
            {
              id: "01",
              name: "Subscription Model",
              ex: "Netflix, Spotify, SaaS products",
              revenue: "Monthly/Annual Recurring Revenue (MRR/ARR)",
              metrics: ["MRR growth rate", "Churn rate", "NRR", "Customer lifetime"],
              strategy: "Retention is king. Build engagement loops and reduce friction. Onboarding is critical to reach 'aha moment'.",
              icon: RefreshCcw
            },
            {
              id: "02",
              name: "Freemium Model",
              ex: "Slack, Spotify, Dropbox, Notion",
              revenue: "Free-to-paid conversion rate",
              metrics: ["Conversion rate", "Time to conversion", "Free tier adoption"],
              strategy: "Design upgrade triggers. Free tier must deliver real value, but paid features should solve 'good problems' users hit naturally.",
              icon: Star
            },
            {
              id: "03",
              name: "Marketplace Model",
              ex: "Airbnb, Uber, Etsy, Upwork",
              revenue: "Gross Merchandise Value (GMV) × Take Rate",
              metrics: ["GMV", "Take rate", "Liquidity", "Repeat transaction rate"],
              strategy: "Balance both sides (buyers/sellers). Network effects are key. Trust and safety are critical for transactions.",
              icon: Globe
            },
            {
              id: "04",
              name: "Advertising Model",
              ex: "Google, Meta, YouTube",
              revenue: "Impressions × Click Rate × Advertiser Spend",
              metrics: ["DAU", "Time spent", "Ad load", "CPM/CTR"],
              strategy: "Maximize engagement and time spent. Better targeting = higher CPMs. Balance ads with UX carefully.",
              icon: MonitorPlay
            },
            {
              id: "05",
              name: "E-commerce Model",
              ex: "Amazon, Myntra, Nykaa",
              revenue: "Traffic × Conversion Rate × Average Order Value",
              metrics: ["Conversion rate", "AOV", "Cart abandonment", "Repeat rate"],
              strategy: "Relentless A/B testing of checkout funnel. Personalization and trust signals (reviews) are vital.",
              icon: Smartphone
            },
            {
              id: "06",
              name: "Enterprise SaaS Model",
              ex: "Salesforce, Workday, ServiceNow",
              revenue: "Contract Value × Number of Seats × Expansion",
              metrics: ["ACV", "Sales cycle length", "Win rate", "NRR"],
              strategy: "Build for the buyer (Exec) AND the user (Contributor). Security, compliance, and integrations are table stakes.",
              icon: Briefcase
            },
            {
              id: "07",
              name: "Usage-Based Pricing",
              ex: "Stripe, AWS, Twilio",
              revenue: "Volume of Usage × Price per Unit",
              metrics: ["Volume growth", "Revenue per user", "Churn rate"],
              strategy: "Remove barriers to adoption. Easy to start, scales with success. Transparency in billing builds trust.",
              icon: CreditCard
            }
          ].map((item) => (
            <div key={item.id} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-6 group hover:border-indigo-100 transition-colors">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Model {item.id}</span>
                    <h3 className="text-xl font-black text-zinc-900">{item.name}</h3>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Revenue & Metrics</p>
                     <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <p className="text-xs font-black text-zinc-900 mb-2">Primary Driver: {item.revenue}</p>
                        <div className="flex flex-wrap gap-1.5">
                           {item.metrics.map((m, idx) => (
                             <span key={idx} className="px-2 py-1 bg-white border border-zinc-200 rounded-lg text-[10px] font-bold text-zinc-500">{m}</span>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">PM Strategy</p>
                     <p className="text-sm font-bold text-zinc-700 leading-relaxed">{item.strategy}</p>
                  </div>
               </div>

               <div className="pt-4 flex items-center gap-2 border-t border-zinc-50">
                  <span className="text-[10px] font-black uppercase text-zinc-400">Examples:</span>
                  <span className="text-xs font-black text-indigo-600">{item.ex}</span>
               </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-12 rounded-[3.5rem] space-y-8 relative overflow-hidden text-center">
         <div className="absolute top-0 right-0 p-8 opacity-10"><ShieldCheck className="w-24 h-24 text-indigo-400" /></div>
         <h2 className="text-2xl font-black text-indigo-400">Sustainability Advantage</h2>
         <p className="text-zinc-400 font-medium max-w-2xl mx-auto italic">
            "Your revenue grows when customers succeed. Perfectly aligned incentives create the most sustainable products in the world."
         </p>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day8Content;
