
import React from 'react';
import { 
  Target, CheckCircle, Users, Lightbulb, Zap, ArrowRight, Star, 
  BarChart, Code, Bot, Smartphone, Briefcase, Activity, 
  Layers, Search, MessageSquare, ArrowLeft, FileText, Calendar, Rocket, TrendingUp
} from 'lucide-react';

export const Day1Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 1: What is Product Management? 🚀</h1>
      
      <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
          <p className="text-lg font-medium text-blue-900 leading-relaxed">
            Understand the role, responsibilities, types, and myths about Product Management.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
            <Layers className="text-indigo-600" />
            1. What is a Product?
          </h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            A product is anything that creates value by solving a real user problem or fulfilling a need—whether physical, digital, or service-based.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['Uber', 'Spotify', 'iPhone', 'Google Ads', 'ATM', 'WhatsApp'].map((item) => (
              <span key={item} className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-xl text-xs font-black uppercase tracking-wider border border-zinc-200 shadow-sm">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
            <Briefcase className="text-indigo-600" />
            2. Do Companies Need Product Managers?
          </h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            Short answer: Yes—but the title isn’t always necessary. Product thinking is.
          </p>
          
          <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-200 overflow-hidden">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">Why PMs emerge: Company Growth Stages</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-medium border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="pb-4 pr-4 font-black text-zinc-900">Stage</th>
                    <th className="pb-4 px-4 font-black text-zinc-900">Who acts as PM</th>
                    <th className="pb-4 px-4 font-black text-zinc-900">Why it works</th>
                    <th className="pb-4 pl-4 font-black text-zinc-900">When it breaks</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-600">
                  <tr className="border-b border-zinc-100">
                    <td className="py-4 pr-4 font-bold text-zinc-900">Early startup</td>
                    <td className="py-4 px-4">Founder</td>
                    <td className="py-4 px-4">Small team, fast decisions, direct feedback</td>
                    <td className="py-4 pl-4">Complexity increases, decisions overload</td>
                  </tr>
                  <tr className="border-b border-zinc-100">
                    <td className="py-4 pr-4 font-bold text-zinc-900">Growth stage</td>
                    <td className="py-4 px-4">Dedicated PMs</td>
                    <td className="py-4 px-4">Align teams, prioritize impact, execution</td>
                    <td className="py-4 pl-4">Without PMs: confusion, misalignment</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-bold text-zinc-900">Large enterprise</td>
                    <td className="py-4 px-4">Product org with PM leaders</td>
                    <td className="py-4 px-4">Scale, governance, coordination</td>
                    <td className="py-4 pl-4">Without PMs: feature bloat, chaos, slow</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
            <Star className="text-indigo-600" />
            3. Real-World Exceptions
          </h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            Some companies have succeeded without formal PMs:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h4 className="font-black text-zinc-900 mb-1">Basecamp</h4>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Design-led product development</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h4 className="font-black text-zinc-900 mb-1">Valve</h4>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Self-organized teams</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h4 className="font-black text-zinc-900 mb-1">Early FB / Stripe</h4>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Engineer-led decisions</p>
            </div>
          </div>
          <p className="text-zinc-500 text-sm font-bold italic pt-2">
            These work only when everyone practices product thinking: user obsession + data + trade-offs + execution focus.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
            <Zap className="text-indigo-600" />
            4. What is Product Management?
          </h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            Product Management is the function responsible for guiding a product from idea → launch → growth → scale by balancing:
          </p>
          <blockquote className="p-8 bg-zinc-900 text-white rounded-[2.5rem] border-l-8 border-indigo-600">
            <p className="text-xl font-black tracking-tight leading-relaxed italic">
              "PMs don’t decide how to build — they decide what to build and why."
            </p>
          </blockquote>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
            <Target className="text-indigo-600" />
            5. The PM Equation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-md">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-black text-indigo-900 mb-1">Business</h4>
              <p className="text-xs font-bold text-indigo-700 leading-relaxed">Revenue, success metrics, GTM strategy.</p>
            </div>
            <div className="p-6 bg-pink-50 border border-pink-100 rounded-3xl">
              <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-md">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="font-black text-pink-900 mb-1">Design</h4>
              <p className="text-xs font-bold text-pink-700 leading-relaxed">User experience & usability focus.</p>
            </div>
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-md">
                <Code className="w-5 h-5" />
              </div>
              <h4 className="font-black text-emerald-900 mb-1">Tech</h4>
              <p className="text-xs font-bold text-emerald-700 leading-relaxed">Feasibility & backend system thinking.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
            <Activity className="text-indigo-600" />
            6. PM Responsibilities
          </h2>
          <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-medium border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="py-4 px-6 font-black text-zinc-900">Area</th>
                    <th className="py-4 px-6 font-black text-zinc-900">What it includes</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-600">
                  <tr className="border-b border-zinc-50">
                    <td className="py-4 px-6 font-bold text-zinc-900">User understanding</td>
                    <td className="py-4 px-6">Research, interviews, personas, feedback</td>
                  </tr>
                  <tr className="border-b border-zinc-50">
                    <td className="py-4 px-6 font-bold text-zinc-900">Problem definition</td>
                    <td className="py-4 px-6">Insights, hypotheses, opportunity sizing</td>
                  </tr>
                  <tr className="border-b border-zinc-50">
                    <td className="py-4 px-6 font-bold text-zinc-900">Prioritization</td>
                    <td className="py-4 px-6">RICE, MoSCoW, Kano frameworks</td>
                  </tr>
                  <tr className="border-b border-zinc-50">
                    <td className="py-4 px-6 font-bold text-zinc-900">Strategy & Roadmapping</td>
                    <td className="py-4 px-6">Vision, goals, milestones, timelines</td>
                  </tr>
                  <tr className="border-b border-zinc-50">
                    <td className="py-4 px-6 font-bold text-zinc-900">Execution & Delivery</td>
                    <td className="py-4 px-6">PRDs, user stories, cross-functional collab</td>
                  </tr>
                  <tr className="border-b border-zinc-50">
                    <td className="py-4 px-6 font-bold text-zinc-900">Analytics & Learning</td>
                    <td className="py-4 px-6">KPI tracking, experiments, iterations</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-zinc-900">Communication</td>
                    <td className="py-4 px-6">Stakeholders, presentations, influence</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
            <Search className="text-indigo-600" />
            7. Types of Product Managers & Why They Exist
          </h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            As products scale, complexity grows — more users, more data, and deeper specialization needs. While an early-stage PM owns everything, a scaled organization requires specialization for efficiency.
          </p>
          
          <div className="space-y-6">
            {[
              { 
                id: 1, title: 'Core Product Manager', subtitle: 'The Generalist', 
                focus: 'End-to-end ownership of user-facing product experiences.',
                res: ['Define product vision & roadmap', 'User research & problem discovery', 'Prioritization & PRD writing', 'Collaborate with engineering & design', 'Track adoption & engagement metrics'],
                ex: 'Swiggy improving checkout conversion from 85% → 92%',
                nsm: 'Retention, Adoption, NPS, DAU',
                color: 'bg-blue-50 border-blue-100 text-blue-900'
              },
              { 
                id: 2, title: 'Growth Product Manager', subtitle: 'The Optimizer', 
                focus: 'Driving acquisition, activation, retention & revenue.',
                res: ['Funnel optimization & loops', 'A/B testing & experimentation', 'Work closely with marketing & analytics', 'Monetization strategy'],
                ex: 'Duolingo improving daily streak feature → +15% retention',
                nsm: 'DAU/MAU, Conversion Rate, LTV, Churn',
                color: 'bg-emerald-50 border-emerald-100 text-emerald-900'
              },
              { 
                id: 3, title: 'Platform Product Manager', subtitle: 'The Enabler', 
                focus: 'Internal systems, APIs & developer experience.',
                res: ['Build scalable internal platforms (auth, notifications, payments)', 'Align engineering teams & reliability goals', 'Reduce build time and dependency blocks'],
                ex: 'Razorpay building unified payments gateway API',
                nsm: 'API Uptime, Latency, Integration Adoption',
                color: 'bg-purple-50 border-purple-100 text-purple-900'
              },
              { 
                id: 4, title: 'Data Product Manager', subtitle: 'The Analyst PM', 
                focus: 'Data pipelines, dashboards & experimentation framework.',
                res: ['Define tracking & data schemas', 'Partner with DS/ML teams', 'Ensure data quality & governance', 'Enable insight-driven decisions'],
                ex: 'Meesho enabling real-time retention dashboards',
                nsm: 'Data accuracy, Latency, Dashboard usage',
                color: 'bg-amber-50 border-amber-100 text-amber-900'
              },
              { 
                id: 5, title: 'Technical Product Manager', subtitle: 'TPM', 
                focus: 'Highly technical systems & integrations.',
                res: ['Translate business requirements → architecture requirements', 'Manage APIs, backend integrations & scalability', 'Balance tech debt & feature delivery'],
                ex: 'Slack launching developer API endpoints',
                nsm: 'Reliability, Integration success, Performance',
                color: 'bg-zinc-50 border-zinc-200 text-zinc-900'
              },
              { 
                id: 6, title: 'AI Product Manager', subtitle: 'The Intelligent Builder', 
                focus: 'Products powered by machine learning & generative AI.',
                res: ['Identify opportunities for AI impact', 'Work with ML engineers on model lifecycle: data → training → deployment', 'Ensure responsible, bias-free AI behavior', 'Convert technical model metrics → business metrics'],
                ex: 'Netflix personalization engine → +15% viewing time',
                nsm: 'Model accuracy, Usage, Adoption',
                color: 'bg-orange-50 border-orange-100 text-orange-900',
                skills: ['ML fundamentals', 'Prompt engineering', 'Model testing & iteration']
              }
            ].map((type) => (
              <div key={type.id} className={`p-8 rounded-[2.5rem] border ${type.color}`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1 block">{type.subtitle}</span>
                    <h3 className="text-xl font-black text-zinc-900">{type.id}. {type.title}</h3>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white border border-zinc-100 shadow-sm`}>
                    Specialist
                  </div>
                </div>
                <p className="text-sm font-bold mb-6 flex items-start gap-2">
                   <Zap className="w-4 h-4 shrink-0 mt-0.5 text-indigo-600" />
                   Focus: <span className="text-zinc-600 font-medium">{type.focus}</span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Responsibilities</p>
                    <ul className="space-y-2">
                      {type.res.map((r, i) => (
                        <li key={i} className="text-xs font-bold text-zinc-700 flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white/50 p-4 rounded-2xl border border-white">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Real Example</p>
                      <p className="text-xs font-bold text-zinc-700 italic">{type.ex}</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-2xl border border-white">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">North Star Metrics</p>
                      <p className="text-xs font-black text-indigo-600">{type.nsm}</p>
                    </div>
                  </div>
                </div>
                {type.skills && (
                  <div className="mt-8 pt-6 border-t border-white/50">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">Key Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {type.skills.map((s, i) => (
                        <span key={i} className="px-3 py-1 bg-white border border-zinc-100 rounded-lg text-[10px] font-bold text-zinc-600">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
            <Activity className="text-indigo-600" />
            8. PM Deliverables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'PRD', desc: 'Clarifies what & why for teams', icon: FileText },
              { title: 'Roadmap', desc: 'Timeline of priorities & goals', icon: Calendar },
              { title: 'User Stories', desc: 'Smallest unit of work detail', icon: MessageSquare },
              { title: 'Metrics Dashboard', desc: 'Tracks feature health & success', icon: BarChart },
              { title: 'GTM / Launch Plan', desc: 'Strategy for market entry', icon: Rocket }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border border-zinc-100 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 mb-4">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="font-black text-zinc-900 mb-1">{item.title}</h4>
                <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
          <h2 className="text-xl font-black text-zinc-900 mb-8 flex items-center gap-3">
            <Lightbulb className="text-amber-500" />
            Myths vs Reality
          </h2>
          <div className="space-y-4">
            {[
              { myth: "PMs are the boss of the team.", reality: "PMs have no authority — influence only." },
              { myth: "PMs must know how to code.", reality: "Not required, but tech literacy is crucial." },
              { myth: "PMs only build new features.", reality: "PMs solve problems. Sometimes by removing features." },
              { myth: "PMs manage timelines.", reality: "That's project management. PMs define what & why." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-2xl border border-zinc-100">
                <div className="flex-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-1">Myth</p>
                   <p className="text-sm font-bold text-zinc-800">“{item.myth}”</p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                   <ArrowRight className="w-5 h-5 text-zinc-300" />
                </div>
                <div className="flex-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Reality</p>
                   <p className="text-sm font-bold text-zinc-800">{item.reality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
          <p></p>
          <p></p>
        </div>
      </section>
    </div>
  );
};

export default Day1Content;
