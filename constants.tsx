import React from 'react';
import { Lesson, ModuleInfo, Category } from './types';
import { 
  Lightbulb, Search, BarChart, 
  Code, Bot, Layers, Brain, Target, Sparkles, CheckCircle, Smartphone, Zap, Users, MessageSquare, Rocket, Activity, Database, Cpu, X, Box, HelpCircle, Terminal, TrendingUp, Settings2, ShieldCheck,
  FileText, Calendar, Compass, ClipboardList, PenTool, Hammer, Ship, RefreshCcw, Layout, FileEdit, PieChart, Send,
  TrendingDown, Info, Settings, LifeBuoy, Recycle, Users2, Gauge, Timer, ShieldAlert, BookOpen, UserPlus, Milestone,
  ArrowRight, Briefcase, DollarSign, PieChart as PieChartIcon, TrendingUp as TrendingUpIcon, Landmark, Play, Mic, ClipboardCheck, MessageCircle, User, HeartHandshake, Star,
  Globe, BarChart3, Filter, Table, Network, GitMerge, Binary, Hash, Type, Calculator, CalendarDays, Ghost, FileSpreadsheet,
  Palette, ArrowLeft, ExternalLink, Heart, ChevronRight, TrendingUp as TrendingUpLucide,
  Music, UserCheck, ClipboardList as ClipboardIcon, Clock, Footprints, Coins, TrendingUp as TrendingUp2,
  ListChecks, Quote, UserCircle, Compass as CompassIcon, ShieldAlert as ShieldAlertIcon,
  PlayCircle
} from 'lucide-react';

export const getCategoryColor = (category: Category): string => {
  switch (category) {
    case 'Foundations': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Research': return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Data': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Design': return 'bg-pink-50 text-pink-700 border-pink-200';
    case 'AI': return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'Strategy': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'Tech': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    default: return 'bg-zinc-50 text-zinc-700 border-zinc-200';
  }
};

export const getCategoryIcon = (category: Category) => {
  switch (category) {
    case 'Foundations': return <Layers className="w-4 h-4" />;
    case 'Research': return <Search className="w-4 h-4" />;
    case 'Data': return <BarChart className="w-4 h-4" />;
    case 'Design': return <Smartphone className="w-4 h-4" />;
    case 'AI': return <Bot className="w-4 h-4" />;
    case 'Strategy': return <Zap className="w-4 h-4" />;
    case 'Tech': return <Code className="w-4 h-4" />;
    default: return <Lightbulb className="w-4 h-4" />;
  }
};

export const MODULES: ModuleInfo[] = [
  { id: 'foundations', title: 'Foundations & Strategy', category: 'Foundations', description: 'Core PM concepts and strategic thinking.' },
  { id: 'research', title: 'Discovery & Research', category: 'Research', description: 'User interviews, personas, and market analysis.' },
  { id: 'data', title: 'Data & Analytics', category: 'Data', description: 'Metrics, SQL, and data-driven decision making.' },
  { id: 'design', title: 'Design & UX', category: 'Design', description: 'UI/UX principles, prototyping, and design systems.' },
  { id: 'ai', title: 'AI for PMs', category: 'AI', description: 'Leveraging AI tools and building AI-driven products.' },
];

export const LESSONS: Lesson[] = [
  {
    day: 0,
    title: 'Foundation & Mindset',
    category: 'Foundations',
    preview: 'Start Your PM Journey Right 🚀. Before we jump into frameworks, tools, and case studies, today is about building the right mindset.',
    content: (
      <div className="space-y-12">
        <section className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200">
           <div className="flex gap-4 mb-6">
              <div className="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest">Foundations</div>
              <div className="px-4 py-1.5 rounded-full bg-zinc-200 text-zinc-700 text-xs font-black uppercase tracking-widest">15m read</div>
           </div>
           <h2 className="text-3xl font-black mb-4 tracking-tight">Foundation & Mindset</h2>
           <p className="text-xl text-zinc-600 font-medium leading-relaxed italic">Start Your PM Journey Right 🚀. Before we jump into frameworks, tools, and case studies, today is about building the right mindset.</p>
        </section>

        <section className="space-y-8">
           <div className="p-10 bg-white border-2 border-indigo-100 rounded-[3rem] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <h3 className="text-2xl font-black mb-6 text-zinc-900">Day-0: Foundation & Mindset — Start Your PM Journey Right 🚀</h3>
              <p className="text-lg text-zinc-700 leading-relaxed mb-8">Welcome to Day-0 of learning Product Management from scratch! Before we jump into frameworks, tools, and case studies, today is about building the right mindset to succeed as a Product Manager.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <p className="font-bold text-zinc-900">Product Management is one of the most competitive and rewarding careers today. But breaking into PM without prior experience can feel overwhelming because the role demands:</p>
                  <ul className="space-y-4">
                    {['Cross-functional collaboration', 'Strategic thinking & decision-making', 'Problem-solving with ambiguity', 'Understanding of business, design, tech & data'].map(item => (
                      <li key={item} className="flex items-center gap-4 text-zinc-700 font-bold">
                        <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white">
                   <p className="text-indigo-300 font-black uppercase tracking-widest text-[10px] mb-4">Hard Truth</p>
                   <p className="text-lg font-medium leading-relaxed italic">Many aspiring PMs struggle not because they lack skills, but because they lack clarity of purpose and direction.</p>
                </div>
              </div>
           </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="p-10 bg-indigo-50 rounded-[3rem] space-y-6 border border-indigo-100">
              <h4 className="text-xl font-black text-indigo-950">Why Day-0 Matters</h4>
              <p className="text-indigo-900 leading-relaxed font-medium">Before learning “how to be a PM”, you must understand why you want to be a PM. PMs face pressure, ownership, ambiguity, and constant context switching — your motivation will keep you going when it gets hard.</p>
              <div className="pt-6 border-t border-indigo-200">
                 <p className="text-sm font-bold text-indigo-800 mb-4 uppercase tracking-widest">Understanding the reality helps evaluate:</p>
                 <ul className="space-y-3">
                    {['Is PM aligned with your strengths & interests?', 'Do you enjoy solving problems and talking to users?', 'Are you comfortable making decisions without perfect data?'].map(q => (
                       <li key={q} className="flex items-start gap-3 text-sm font-bold text-indigo-950">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></span> {q}
                       </li>
                    ))}
                 </ul>
              </div>
           </div>
           
           <div className="p-10 bg-emerald-50 rounded-[3rem] space-y-6 border border-emerald-100">
              <h4 className="text-xl font-black text-emerald-950">Outcome of Day-0</h4>
              <p className="text-emerald-900 leading-relaxed font-medium italic">By the end of today, you should have:</p>
              <ul className="space-y-4">
                 {['Real understanding of what PM is', 'Motivation aligned with reality', 'Early networking with professionals', 'A clear starting point for the course'].map(item => (
                    <li key={item} className="flex items-center gap-4 text-emerald-950 font-bold">
                       <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" /> {item}
                    </li>
                 ))}
              </ul>
           </div>
        </section>

        <section className="p-10 bg-zinc-950 rounded-[3rem] text-center text-white space-y-8">
           <h4 className="text-2xl font-black tracking-tight">Reflection Exercise</h4>
           <p className="text-zinc-400 font-medium">Write answers to these 3 questions:</p>
           <div className="max-w-xl mx-auto p-8 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-xl font-black tracking-tight">1. Why do I want to become a Product Manager?</p>
           </div>
           <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs">Clarity today will drive consistency tomorrow.</p>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-10 bg-white border-2 border-indigo-200 rounded-[3rem] shadow-xl">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg"><ClipboardIcon className="w-6 h-6" /></div>
              <h5 className="text-xl font-black text-zinc-950 tracking-tight uppercase">Task 1 — Must Do Today</h5>
           </div>
           <p className="text-2xl font-black text-zinc-950 leading-tight mb-4">Reach out to 5 Product Managers and ask them about their journey & role.</p>
           <p className="text-zinc-500 font-bold mb-8">Use LinkedIn, alumni networks, or company communities.</p>
           <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Goal</p>
              <p className="text-lg font-bold text-zinc-800">Collect insights and note patterns. This will guide your expectations.</p>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 1,
    title: 'What is Product Management?',
    category: 'Foundations',
    preview: 'Understand the role, responsibilities, types, and myths about Product Management.',
    content: (
      <div className="space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-6">
              <div className="inline-flex gap-4">
                 <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-lg">Foundations</span>
                 <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-black uppercase tracking-widest rounded-lg">45m Read</span>
              </div>
              <h2 className="text-4xl font-black tracking-tighter">What is Product Management? 🚀</h2>
              <p className="text-xl text-zinc-600 font-medium">Understand the role, responsibilities, types, and myths about Product Management.</p>
           </div>
           <div className="p-8 bg-zinc-900 rounded-[2.5rem] flex flex-col justify-center border border-zinc-800 shadow-2xl">
              <p className="text-indigo-400 font-black uppercase tracking-widest text-[10px] mb-4">Core Definition</p>
              <p className="text-lg text-white font-bold leading-relaxed">1. What is a Product?</p>
              <p className="text-zinc-400 font-medium">A product is anything that creates value by solving a real user problem or fulfilling a need—whether physical, digital, or service-based.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                 {['Uber', 'Spotify', 'iPhone', 'Google Ads', 'ATM', 'WhatsApp'].map(p => (
                   <span key={p} className="px-3 py-1 bg-white/10 rounded-lg text-[11px] font-black text-white">{p}</span>
                 ))}
              </div>
           </div>
        </section>

        <section className="space-y-10">
           <div className="p-10 bg-indigo-50 border border-indigo-100 rounded-[3rem]">
              <h3 className="text-2xl font-black mb-6">2. Do Companies Need Product Managers?</h3>
              <p className="text-xl font-black text-indigo-950 mb-8 italic">Short answer: Yes—but the title isn’t always necessary. Product thinking is.</p>
              
              <div className="overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-indigo-600 text-white font-black text-xs uppercase tracking-widest">
                    <tr>
                      <th className="p-6">Stage</th>
                      <th className="p-6">Who acts as PM</th>
                      <th className="p-6">Why it works</th>
                      <th className="p-6">When it breaks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-50 font-bold text-sm text-indigo-900">
                    <tr>
                      <td className="p-6 bg-indigo-50/30">Early startup</td>
                      <td className="p-6">Founder</td>
                      <td className="p-6">Small team, fast decisions, direct feedback</td>
                      <td className="p-6">Complexity increases, decisions overload</td>
                    </tr>
                    <tr>
                      <td className="p-6 bg-indigo-50/30">Growth stage</td>
                      <td className="p-6">Dedicated PMs</td>
                      <td className="p-6">Align teams, prioritize impact, execution</td>
                      <td className="p-6">Without PMs: confusion, misalignment</td>
                    </tr>
                    <tr>
                      <td className="p-6 bg-indigo-50/30">Large enterprise</td>
                      <td className="p-6">Product org with PM leaders</td>
                      <td className="p-6">Scale, governance, coordination</td>
                      <td className="p-6">Without PMs: feature bloat, chaos, slow</td>
                    </tr>
                  </tbody>
                </table>
              </div>
           </div>
        </section>

        <section className="p-10 bg-zinc-50 border border-zinc-200 rounded-[3rem] space-y-8">
           <h3 className="text-2xl font-black text-zinc-900">3. Real-World Exceptions</h3>
           <p className="text-zinc-600 font-bold">Some companies have succeeded without formal PMs:</p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Basecamp', desc: 'Design-led product development' },
                { title: 'Valve', desc: 'Self-organized teams' },
                { title: 'Early FB / Stripe', desc: 'Engineer-led decisions' }
              ].map(ex => (
                <div key={ex.title} className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                  <p className="font-black text-indigo-600 mb-2">{ex.title}</p>
                  <p className="text-sm font-bold text-zinc-500">{ex.desc}</p>
                </div>
              ))}
           </div>
           <div className="p-6 bg-white border-4 border-indigo-100 rounded-3xl text-center">
              <p className="text-lg font-black text-indigo-950">These work only when everyone practices product thinking: user obsession + data + trade-offs + execution focus.</p>
           </div>
        </section>

        <section className="space-y-12">
           <div className="p-10 bg-zinc-950 rounded-[4rem] text-white overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
              <h3 className="text-2xl font-black mb-8 border-b border-white/10 pb-6">4. What is Product Management?</h3>
              <p className="text-xl leading-relaxed text-zinc-300 font-medium mb-12">Product Management is the function responsible for guiding a product from idea → launch → growth → scale by balancing:</p>
              <div className="text-center py-10 border-y border-white/5 bg-white/5 rounded-3xl mb-12">
                 <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 italic leading-tight">
                    "PMs don’t decide how to build — they decide what to build and why."
                 </p>
              </div>
              <h4 className="text-lg font-black mb-8 tracking-widest uppercase text-indigo-400">5. The PM Equation</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="space-y-3">
                    <p className="font-black text-xl">Business</p>
                    <p className="text-sm text-zinc-400 font-bold leading-relaxed">Revenue, success metrics, GTM strategy.</p>
                 </div>
                 <div className="space-y-3">
                    <p className="font-black text-xl">Design</p>
                    <p className="text-sm text-zinc-400 font-bold leading-relaxed">User experience & usability focus.</p>
                 </div>
                 <div className="space-y-3">
                    <p className="font-black text-xl">Tech</p>
                    <p className="text-sm text-zinc-400 font-bold leading-relaxed">Feasibility & backend system thinking.</p>
                 </div>
              </div>
           </div>
        </section>

        <section className="space-y-12">
           <h3 className="text-2xl font-black text-zinc-900 px-4">6. PM Responsibilities</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { area: 'User understanding', items: 'Research, interviews, personas, feedback' },
                { area: 'Problem definition', items: 'Insights, hypotheses, opportunity sizing' },
                { area: 'Prioritization', items: 'RICE, MoSCoW, Kano frameworks' },
                { area: 'Strategy & Roadmapping', items: 'Vision, goals, milestones, timelines' },
                { area: 'Execution & Delivery', items: 'PRDs, user stories, cross-functional collab' },
                { area: 'Analytics & Learning', items: 'KPI tracking, experiments, iterations' },
                { area: 'Communication', items: 'Stakeholders, presentations, influence' }
              ].map((res, i) => (
                <div key={i} className="p-6 bg-white border-2 border-zinc-50 rounded-2xl hover:border-indigo-100 transition-all shadow-sm">
                   <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2">{res.area}</p>
                   <p className="text-sm font-bold text-zinc-800 leading-relaxed">{res.items}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="p-12 bg-white border-4 border-zinc-100 rounded-[4rem] space-y-10 shadow-xl">
           <h3 className="text-3xl font-black text-zinc-950 tracking-tight">7. Types of Product Managers & Why They Exist 🔍</h3>
           <p className="text-lg text-zinc-600 font-medium leading-relaxed">As products scale, complexity grows — more users, more data, and deeper specialization needs. While an early-stage PM owns everything, a scaled organization requires specialization for efficiency.</p>
           
           <div className="space-y-12">
             {[
               { id: '1', title: 'Core Product Manager', subtitle: 'The Generalist', focus: 'End-to-end ownership of user-facing product experiences.', items: ['Define product vision & roadmap', 'User research & problem discovery', 'Prioritization & PRD writing', 'Collaborate with engineering & design', 'Track adoption & engagement metrics'], case: 'Swiggy improving checkout conversion from 85% → 92%', metrics: 'Retention, Adoption, NPS, DAU' },
               { id: '2', title: 'Growth Product Manager', subtitle: 'The Optimizer', focus: 'Driving acquisition, activation, retention & revenue.', items: ['Funnel optimization & loops', 'A/B testing & experimentation', 'Work closely with marketing & analytics', 'Monetization strategy'], case: 'Duolingo improving daily streak feature → +15% retention', metrics: 'DAU/MAU, Conversion Rate, LTV, Churn' },
               { id: '3', title: 'Platform Product Manager', subtitle: 'The Enabler', focus: 'Focus: Internal systems, APIs & developer experience.', items: ['Build scalable internal platforms (auth, notifications, payments)', 'Align engineering teams & reliability goals', 'Reduce build time and dependency blocks'], case: 'Razorpay building unified payments gateway API', metrics: 'API Uptime, Latency, Integration Adoption' },
               { id: '4', title: 'Data Product Manager', subtitle: 'The Analyst PM', focus: 'Data pipelines, dashboards & experimentation framework.', items: ['Define tracking & data schemas', 'Partner with DS/ML teams', 'Ensure data quality & governance', 'Enable insight-driven decisions'], case: 'Meesho enabling real-time retention dashboards', metrics: 'Data accuracy, Latency, Dashboard usage' },
               { id: '5', title: 'Technical Product Manager', subtitle: 'TPM', focus: 'Highly technical systems & integrations.', items: ['Translate business requirements → architecture requirements', 'Manage APIs, backend integrations & scalability', 'Balance tech debt & feature delivery'], case: 'Slack launching developer API endpoints', metrics: 'Reliability, Integration success, Performance' },
               { id: '6', title: 'AI Product Manager', subtitle: 'The Intelligent Builder', focus: 'Products powered by machine learning & generative AI.', items: ['Identify opportunities for AI impact', 'Work with ML engineers on model lifecycle: data → training → deployment', 'Ensure responsible, bias-free AI behavior', 'Convert technical model metrics → business metrics'], case: 'Netflix personalization engine → +15% viewing time', metrics: 'Model accuracy, Usage, Adoption' }
             ].map((type) => (
               <div key={type.id} className="p-8 bg-zinc-50 border border-zinc-200 rounded-[3rem] space-y-6">
                 <div className="flex justify-between items-start">
                   <div>
                     <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{type.subtitle}</span>
                     <h4 className="text-2xl font-black text-zinc-900">{type.id}. {type.title}</h4>
                   </div>
                   <div className="px-4 py-1.5 bg-white rounded-xl border border-zinc-200 shadow-sm text-xs font-black">Focus: {type.focus}</div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                     <p className="text-xs font-black uppercase text-zinc-400 tracking-widest mb-4">Responsibilities</p>
                     <ul className="space-y-2">
                       {type.items.map(i => <li key={i} className="flex items-center gap-3 text-sm font-bold text-zinc-700"><CheckCircle className="w-4 h-4 text-emerald-500" /> {i}</li>)}
                     </ul>
                   </div>
                   <div className="space-y-6">
                     <div className="p-6 bg-white rounded-2xl shadow-sm border border-zinc-100">
                        <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mb-2">Real Example</p>
                        <p className="text-sm font-black text-zinc-900">{type.case}</p>
                     </div>
                     <div className="p-6 bg-white rounded-2xl shadow-sm border border-zinc-100">
                        <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mb-2">North Star Metrics</p>
                        <p className="text-sm font-black text-zinc-900">{type.metrics}</p>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </section>

        <section className="p-12 bg-zinc-900 rounded-[4rem] text-white shadow-2xl overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
           <h3 className="text-3xl font-black mb-10 tracking-tight text-indigo-400">8. PM Deliverables</h3>
           <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <table className="w-full text-left">
                <thead className="bg-indigo-600 text-white font-black text-xs uppercase tracking-widest">
                  <tr>
                    <th className="p-6">Deliverable</th>
                    <th className="p-6">Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-bold text-sm text-zinc-300">
                  {[
                    { title: 'PRD', desc: 'Clarifies what & why for teams' },
                    { title: 'Roadmap', desc: 'Timeline of priorities & goals' },
                    { title: 'User Stories', desc: 'Smallest unit of work detail' },
                    { title: 'Metrics Dashboard', desc: 'Tracks feature health & success' },
                    { title: 'GTM Plan', desc: 'Strategy for market entry' }
                  ].map((d, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-6 text-white font-black">{d.title}</td>
                      <td className="p-6 italic">{d.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </section>

        <section className="bg-rose-50 border-4 border-rose-100 p-12 rounded-[4rem] space-y-10">
           <h3 className="text-3xl font-black text-rose-950 tracking-tight">Myths vs Reality</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {[
               { myth: '“PMs are the boss of the team.”', reality: 'PMs have no authority — influence only.' },
               { myth: '“PMs must know how to code.”', reality: 'Not required, but tech literacy is crucial.' },
               { myth: '“PMs only build new features.”', reality: 'PMs solve problems. Sometimes by removing features.' },
               { myth: '“PMs manage timelines.”', reality: 'That\'s project management. PMs define what & why.' }
             ].map((m, i) => (
               <div key={i} className="flex flex-col p-6 bg-white rounded-3xl border border-rose-200">
                  <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Myth</span>
                  <p className="text-lg font-black text-rose-900 mb-4">{m.myth}</p>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Reality</span>
                  <p className="text-lg font-black text-emerald-900">{m.reality}</p>
               </div>
             ))}
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-10 bg-white border-2 border-indigo-200 rounded-[3rem] shadow-xl">
           <h5 className="text-xl font-black mb-8 uppercase tracking-widest text-indigo-600">🎯 Day-1 Mini Assignment</h5>
           <p className="text-lg font-bold text-zinc-700 mb-6">Pick a product you use daily (e.g., Spotify, Zomato, Notion, Cred) and answer:</p>
           <div className="p-8 bg-zinc-50 rounded-2xl font-mono text-sm border border-zinc-100 mb-10">
              Product Name: ___ User Problem: ___ Key Metrics: ___ Improvement Suggestion: ___
           </div>
           
           <h5 className="text-xl font-black mb-6 uppercase tracking-widest text-zinc-900">Reflection Task</h5>
           <p className="text-lg font-bold text-zinc-700 leading-relaxed italic">Identify which of the 6 PM types excites you the most and why. Does it align with your current background (e.g., Engineer → TPM, Marketing → Growth)?</p>
        </div>
      </div>
    )
  },
  {
    day: 2,
    title: 'The Product Development Lifecycle (PDLC)',
    category: 'Foundations',
    preview: 'Theme: How products move from idea → design → build → launch → iterate.',
    content: (
      <div className="space-y-12">
        <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
           <div className="flex gap-4 mb-6 relative z-10">
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest">Foundations</span>
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest">45m read</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">The Product Development Lifecycle (PDLC) 📘</h1>
           <p className="text-indigo-100 text-xl font-bold italic">Theme: How products move from idea → design → build → launch → iterate.</p>
        </header>

        <section className="bg-white p-10 border border-zinc-100 rounded-[3rem] shadow-sm">
           <h2 className="text-2xl font-black mb-8 tracking-tight">Learning Objectives</h2>
           <p className="text-lg font-bold text-zinc-500 mb-6 uppercase tracking-widest">By the end of today, you will:</p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Understand the full lifecycle of product development', 'Know what happens at every stage & what PMs contribute', 'Learn common outputs, tools, and real examples', 'Avoid the typical mistakes that junior PMs make'].map(item => (
                <div key={item} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl font-bold text-zinc-900 border border-zinc-100">
                   <CheckCircle className="w-5 h-5 text-indigo-600" /> {item}
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-10">
           <h3 className="text-3xl font-black text-zinc-950 px-4">1. What is PDLC?</h3>
           <p className="text-xl text-zinc-600 font-medium leading-relaxed italic max-w-4xl border-l-4 border-indigo-600 pl-8">
              Product Development Lifecycle (PDLC) is the structured process of taking a product from problem discovery → launch → continuous improvement, ensuring decisions are user-driven, data-backed, and business-aligned.
           </p>

           <div className="overflow-hidden rounded-[3rem] border-4 border-zinc-100 bg-white shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-zinc-950 text-white font-black text-xs uppercase tracking-widest">
                  <tr>
                    <th className="p-8">Stage</th>
                    <th className="p-8">Goal</th>
                    <th className="p-8">Key Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-bold text-lg">
                  {[
                    { s: 'Discovery', g: 'Understand the user problem', o: 'Problem statement, Personas' },
                    { s: 'Definition', g: 'Scope & prioritize solution', o: 'PRD, success metrics' },
                    { s: 'Design', g: 'Visualize experience', o: 'Wireframes, Prototype' },
                    { s: 'Development', g: 'Build & test', o: 'MVP, QA sign-off' },
                    { s: 'Launch', g: 'Ship product to users', o: 'GTM plan, adoption data' },
                    { s: 'Iteration', g: 'Improve continuously', o: 'Insights, next roadmap' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-50 transition-colors">
                       <td className="p-8 text-indigo-600 font-black">{row.s}</td>
                       <td className="p-8 text-zinc-900">{row.g}</td>
                       <td className="p-8 text-zinc-500 italic text-sm">{row.o}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </section>

        <section className="space-y-12">
           {[
             { id: '1', title: 'Phase 1: Discovery', subtitle: 'Find the Right Problem', goal: '“Fall in love with the problem, not the solution.” Understand real user needs and validate the painpoint.', activities: 'Market & competitor research, User interviews, surveys, Data analysis (Mixpanel, GA, SQL), Identify Jobs-to-be-Done (JTBD)', outputs: 'Problem statement, Personas, Hypothesis, Opportunity sizing', case: 'Zomato observes high checkout drop-offs because of unpredictable surge delivery fees.' },
             { id: '2', title: 'Phase 2: Definition', subtitle: 'Scope the Solution', goal: 'Turn insights into an actionable plan. Define what we are building and how we measure success.', activities: 'Prioritization (RICE, MOSCOW, Value-Effort), Success metrics / OKRs, PRD writing, Align with design & engineering', outputs: 'PRD, Prioritized roadmap, Success metrics', case: 'Test a Flat Delivery Fee Subscription Model to reduce checkout abandonment by 15%.' },
             { id: '3', title: 'Phase 3: Design', subtitle: 'Shape the Experience', goal: 'Design an intuitive experience for solving the defined problem.', activities: 'Wireframes & prototypes in Figma, User testing & usability reviews, Accessibility & UI polishing', outputs: 'Prototype, Usability results, Design specs', case: 'Prototype for 1-click subscription to Zomato delivery fee waiver.' },
             { id: '4', title: 'Phase 4: Development', subtitle: 'Build', goal: 'Build and test the feature until ready for release. Focus on functional alignment.', activities: 'Sprint planning & execution (Jira), Daily standups, bug triage, QA & UAT testing, Feature flag rollout', outputs: 'Working MVP, Release candidate, Go/No-Go decision', case: 'Feature toggle rollout to 5% of users in Bangalore to test load performance.' },
             { id: '5', title: 'Phase 5: Launch', subtitle: 'Ship & Distribute', goal: '“Shipping is a feature.” Release value to users and drive broad adoption.', activities: 'GTM strategy (Marketing, Sales, Support), Announcements, tutorials, walkthroughs, Monitor adoption & sentiment', outputs: 'GTM docs, Release comms, Launch dashboard', case: 'Email + push campaign tracking adoption of the new delivery subscription.' },
             { id: '6', title: 'Phase 6: Iteration', subtitle: 'Learn & Improve', goal: 'Improve continuously based on data. The cycle never truly ends.', activities: 'Analyze Mixpanel, GA, SQL reports, Collect feedback (NPS, CSAT), Identify improvement opportunities', outputs: 'Insights report, Updated roadmap, New hypothesis', case: 'Feature adoption = 70%, renewal = 30% → pricing experiment planned to improve retention.' }
           ].map((phase) => (
             <div key={phase.id} className="p-12 bg-white border-2 border-zinc-100 rounded-[4rem] space-y-8 hover:shadow-xl transition-all relative group">
                <span className="absolute top-8 right-12 text-[8rem] font-black text-zinc-100 group-hover:text-indigo-50 -z-0 pointer-events-none transition-colors">{phase.id}</span>
                <div className="relative z-10 space-y-6">
                   <h4 className="text-3xl font-black text-zinc-950">{phase.title}</h4>
                   <p className="text-xs font-black uppercase text-indigo-600 tracking-[0.2em]">{phase.subtitle}</p>
                   <div className="p-6 bg-zinc-50 border-l-4 border-indigo-600 rounded-r-2xl">
                      <p className="text-lg font-black text-zinc-900 leading-relaxed italic">{phase.goal}</p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <p className="text-xs font-black uppercase text-zinc-400 tracking-widest">Activities</p>
                        <p className="text-sm font-bold text-zinc-700 leading-relaxed">{phase.activities}</p>
                      </div>
                      <div className="space-y-4">
                        <p className="text-xs font-black uppercase text-zinc-400 tracking-widest">Outputs</p>
                        <p className="text-sm font-black text-indigo-600 leading-relaxed italic">{phase.outputs}</p>
                      </div>
                   </div>
                   <div className="p-8 bg-zinc-900 rounded-3xl text-white">
                      <div className="flex items-center gap-3 mb-4">
                         <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs">🏢</div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Industry Case</p>
                      </div>
                      <p className="text-lg font-bold italic text-zinc-200 leading-snug">{phase.case}</p>
                   </div>
                </div>
             </div>
           ))}
        </section>

        <section className="bg-emerald-50 p-12 rounded-[4rem] border-4 border-emerald-100 shadow-sm text-center space-y-8">
           <h3 className="text-3xl font-black text-emerald-950 tracking-tight">Key Takeaways</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white rounded-3xl space-y-4 shadow-sm">
                 <span className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 font-black">1</span>
                 <p className="text-lg font-black text-zinc-900">The best PMs don’t build features — they solve problems.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl space-y-4 shadow-sm">
                 <span className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 font-black">2</span>
                 <p className="text-lg font-black text-zinc-900">PDLC creates structure, clarity, and alignment across the org.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl space-y-4 shadow-sm">
                 <span className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 font-black">3</span>
                 <p className="text-lg font-black text-zinc-900">Launch is not the end — iteration is where results come from.</p>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-10 bg-white border-2 border-indigo-200 rounded-[3rem] shadow-xl">
           <h5 className="text-xl font-black mb-8 uppercase tracking-widest text-indigo-600">🎯 Day-2 Mini Assignment</h5>
           <p className="text-lg font-bold text-zinc-700 mb-8">Pick any app (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and describe a new feature across the PDLC:</p>
           <div className="p-10 bg-zinc-950 rounded-[2.5rem] font-mono text-xs text-zinc-300 leading-relaxed mb-10 border-4 border-zinc-800">
              Product: ___ Feature Idea: ___ Discovery – Problem & insight: ___ Definition – Hypothesis & metrics: ___ Design – Sketch or description: ___ Development – Dependencies / risks: ___ Launch – Target segment & rollout plan: ___ Iteration – What will you measure?: ___
           </div>
           <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
              <span className="text-2xl">📌</span>
              <p className="text-lg font-black text-emerald-950 italic">Expected outcome: You learn to think like a PM end-to-end, considering everything from feasibility to measurement.</p>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 3,
    title: 'Product Life Cycle (PLC) & PLM',
    category: 'Foundations',
    preview: 'Understand how products evolve in the market over time and how companies manage that journey.',
    content: (
      <div className="space-y-12">
        <section className="bg-zinc-50 p-12 rounded-[4rem] border border-zinc-200">
           <div className="flex gap-4 mb-8">
              <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-blue-200">Foundations</span>
              <span className="px-4 py-1.5 bg-white border border-zinc-200 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">45m read</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight text-zinc-900">Product Life Cycle (PLC) & PLM 📘</h2>
           <p className="text-xl text-zinc-600 font-bold leading-relaxed max-w-3xl border-l-4 border-indigo-600 pl-8 italic">
              Understand how products evolve in the market over time and how companies manage that journey.
           </p>
        </section>

        <section className="space-y-12">
           <div className="p-12 bg-white border-2 border-zinc-100 rounded-[4rem] shadow-sm relative overflow-hidden">
              <h3 className="text-3xl font-black mb-8 tracking-tight">What is Product Life Cycle (PLC)?</h3>
              <p className="text-xl text-zinc-900 font-medium leading-relaxed italic mb-12">Product Life Cycle is the journey a product goes through in the market — from the day it is launched to the day it is eventually retired.</p>
              
              <h4 className="text-lg font-black uppercase tracking-widest text-indigo-500 mb-10">What Are the 4 Stages of Product Life Cycle?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                   { title: 'Introduction', icon: '🌱', desc: 'This is when a new product is first introduced to the market. Sales are usually low because customers are just starting to become aware of the product, and marketing efforts are focused on building awareness and generating interest. Companies may be investing heavily in research and development during this stage.' },
                   { title: 'Growth', icon: '🚀', desc: 'In this stage, the product starts to gain interest. Sales begin to increase as more customers become aware of the product and start buying it. Marketing efforts now focus on expanding market share and building brand loyalty. Competitors may also start entering the market during this stage.' },
                   { title: 'Maturity', icon: '🏆', desc: 'This is the stage of peak sales. The product has reached its maximum market penetration, and sales growth starts to level off. Competition is usually intense, and companies may need to focus on differentiating their product through added features, improved quality, or competitive pricing.' },
                   { title: 'Decline', icon: '📉', desc: 'In the decline stage, sales begin to decline as customer preferences change, new technologies emerge, or market saturation occurs. Companies may choose to discontinue the product or try to extend it via strategies like updates, new marketing, or new segments.' }
                 ].map((stage, i) => (
                   <div key={i} className="p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] space-y-4 hover:border-indigo-200 transition-all shadow-sm">
                      <div className="text-4xl">{stage.icon}</div>
                      <h5 className="text-2xl font-black text-zinc-950">{stage.title}</h5>
                      <p className="text-sm font-bold text-zinc-600 leading-relaxed">{stage.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        <section className="space-y-12">
           <div className="p-12 bg-zinc-950 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-600/10 via-transparent to-transparent"></div>
              <h3 className="text-3xl font-black mb-10 text-indigo-400 tracking-tight relative z-10 text-white">What is Product Lifecycle Management (PLM)?</h3>
              <p className="text-xl leading-relaxed text-zinc-300 font-medium mb-10 relative z-10 italic">Product Lifecycle Management (PLM) is the practice of managing a product from its initiation to its eventual retirement through a systematic approach.</p>
              <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-6 relative z-10">
                 <p className="text-lg leading-relaxed font-bold">It's a system that helps manage every step of a product's life, from the initial idea and design to manufacturing, distribution, and even after it's sold. It's a way for companies to keep track of all the details and make sure everyone involved is on the same page throughout the product's journey.</p>
                 <div className="pt-6 border-t border-white/5 text-center">
                    <p className="text-2xl font-black italic text-indigo-400">“So, in simpler terms, PLM is like a guidebook that helps companies manage their products from start to finish.”</p>
                 </div>
              </div>
           </div>
        </section>

        <section className="space-y-12">
           <h3 className="text-3xl font-black text-zinc-900 px-4">Stages of a Product in PLM</h3>
           <div className="space-y-6">
              {[
                { title: 'Concept Stage', desc: 'The start of making a new product. Involves initial ideas and planning, market research, identifying customer needs, and determining feasibility. Usually R&D takes the lead.' },
                { title: 'Design Stage', desc: 'Careful plan for the product, building prototypes, and testing everything. Ensuring the design meets all rules and safety standards. Significant R&D spend happens here.' },
                { title: 'Production Stage', desc: 'Making the product at scale—getting materials, putting everything together, and quality checks. Design changes should be minimal at this point.' },
                { title: 'Sales Stage', desc: 'About telling people about the product and getting them to buy it via advertisements, prices, and special deals. Forecasting is crucial.' },
                { title: 'Support Stage', desc: 'Ongoing customer support including customer service, warranties, repairs, and services or training to enhance user experience.' },
                { title: 'Retirement Stage', desc: 'The life of the product ends due to better products, preference shifts, or tech moves. Includes responsible recycling or find new uses.' }
              ].map((stage, i) => (
                <div key={i} className="p-10 bg-white border-2 border-zinc-100 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start hover:border-indigo-100 transition-all shadow-sm">
                   <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black shrink-0 shadow-sm border border-indigo-100">{i+1}</div>
                   <div>
                      <h5 className="text-xl font-black text-zinc-950 mb-3">{stage.title}</h5>
                      <p className="text-lg text-zinc-600 font-bold leading-relaxed">{stage.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        <section className="p-12 bg-indigo-50 border-4 border-indigo-100 rounded-[4rem] shadow-sm">
           <h3 className="text-3xl font-black text-indigo-950 mb-10 tracking-tight text-center text-indigo-950">Benefits of PLM</h3>
           <div className="overflow-hidden rounded-3xl border border-indigo-200 bg-white shadow-sm mb-12">
              <table className="w-full text-left">
                <thead className="bg-indigo-600 text-white font-black text-xs uppercase tracking-widest text-white">
                  <tr>
                    <th className="p-6">Benefit</th>
                    <th className="p-6">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-50 font-bold text-sm text-indigo-900">
                  <tr>
                    <td className="p-6 bg-indigo-50/30 font-black">Improved Collaboration</td>
                    <td className="p-6">PLM encourages cross-functional collaboration, ensuring that all stakeholders, from design to sales, work together seamlessly.</td>
                  </tr>
                  <tr>
                    <td className="p-6 bg-indigo-50/30 font-black">Enhanced Product Quality</td>
                    <td className="p-6">By integrating quality control into each phase, PLM helps identify and rectify potential issues early, resulting in higher-quality products.</td>
                  </tr>
                  <tr>
                    <td className="p-6 bg-indigo-50/30 font-black">Efficient Resource Utilization</td>
                    <td className="p-6">Streamlines processes, reducing waste and optimizing resource utilization, leading to significant cost savings.</td>
                  </tr>
                  <tr>
                    <td className="p-6 bg-indigo-50/30 font-black">Faster Time-to-Market</td>
                    <td className="p-6">A structured approach facilitates quicker development cycles, enabling companies to bring products to market more rapidly.</td>
                  </tr>
                </tbody>
              </table>
           </div>
           <div className="mt-12 p-8 bg-indigo-950 rounded-[2.5rem] text-center">
              <p className="text-xl font-black text-white italic">“Regulatory Compliance: PLM systems assist in ensuring that products meet regulatory standards, minimizing the risk of legal and compliance issues.”</p>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-10 bg-white border-2 border-indigo-200 rounded-[3rem] shadow-xl">
           <h5 className="text-xl font-black mb-8 uppercase tracking-widest text-indigo-600 text-center">🎯 Day-3 Mini Assignment</h5>
           <p className="text-lg font-bold text-zinc-700 mb-8 text-center px-12">Pick any product (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and evaluate its lifecycle:</p>
           <div className="p-10 bg-zinc-950 rounded-[3rem] font-mono text-xs text-indigo-300 leading-relaxed mb-10 border-4 border-zinc-800 shadow-2xl text-indigo-300">
              Product: ___ <br/>
              Current PLC Stage: ___ <br/>
              What signals tell you this stage?: ___ <br/>
              What should PM focus on right now (Strategy)?: ___ <br/>
              One risky decision PM must make at this stage: ___ <br/>
              If it’s declining, how would you extend or sunset it?: ___
           </div>
           <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100 text-center">
              <p className="text-lg font-black text-emerald-950 italic">📌 Expected outcome: You learn to think like a PM end-to-end, considering everything from feasibility to measurement.</p>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 4,
    title: 'Product Sense Framework',
    category: 'Foundations',
    preview: 'Great PMs don’t build features. They solve meaningful problems. Master the "sixth sense" of Product Management.',
    content: (
      <div className="space-y-12">
        <section className="bg-zinc-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden isolate">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-transparent -z-10"></div>
           <div className="flex gap-4 mb-8">
              <span className="px-4 py-1.5 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Foundations</span>
              <span className="px-4 py-1.5 bg-white/10 text-zinc-300 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10">15m read</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">Product Sense Framework 📘</h1>
           <p className="text-xl text-zinc-300 font-bold leading-relaxed max-w-4xl border-l-4 border-indigo-500 pl-8 italic">
              Great PMs don’t build features. They solve meaningful problems. Master the "sixth sense" of Product Management.
           </p>
        </section>

        <section className="space-y-12">
           <div className="p-12 bg-white border-2 border-zinc-100 rounded-[4rem] shadow-sm">
              <h3 className="text-3xl font-black mb-8 tracking-tight text-zinc-900">What is Product Sense?</h3>
              <p className="text-2xl text-zinc-900 font-black leading-tight italic mb-8 border-b border-zinc-100 pb-12">
                 Product sense is the ability to see through complexity and spot the user needs that matter most. Experts like Marty Cagan emphasize that it is deep product knowledge built through immersion, not an innate gift.
              </p>
              
              <h4 className="text-lg font-black uppercase tracking-[0.2em] text-indigo-500 mb-10">The 7 Pillars of Product Sense</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[
                   { title: 'Empathy & Customer Needs', desc: 'Listening for spoken and unspoken window pain points and emotional drivers.' },
                   { title: 'Market & Competitive Insight', desc: 'Analyzing trends and mapping competitor gaps to find unique value.' },
                   { title: 'Design & UX Perspective', desc: 'Recognizing good flows and how design decisions affect engagement.' },
                   { title: 'Problem Framing & Mapping', desc: 'Distinguishing root causes from symptoms and exploring options.' },
                   { title: 'Feasibility & Execution', desc: 'Balancing ambitious ideas with tech constraints, budgets, and timelines.' },
                   { title: 'Iteration & Validation', desc: 'Using prototypes and experiments to adjust based on real data.' }
                 ].map((pillar, i) => (
                   <div key={i} className="p-8 bg-zinc-50 border border-zinc-100 rounded-3xl space-y-4 hover:border-indigo-200 transition-all shadow-sm">
                      <h5 className="text-xl font-black text-zinc-950 leading-tight">{pillar.title}</h5>
                      <p className="text-sm font-bold text-zinc-500 leading-relaxed">{pillar.desc}</p>
                   </div>
                 ))}
                 <div className="p-8 bg-indigo-600 rounded-3xl space-y-4 shadow-xl flex flex-col justify-center text-white">
                    <h5 className="text-xl font-black leading-tight text-white">Domain Immersion</h5>
                    <p className="text-sm font-bold text-indigo-100 leading-relaxed">Gaining deep knowledge of a space to predict behaviors and outcomes.</p>
                 </div>
              </div>
           </div>
        </section>

        <section className="space-y-12">
           <h3 className="text-3xl font-black text-zinc-950 px-4 tracking-tight text-center">Why Aspiring PMs Must Master It</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-900">
              {[
                { title: 'A Key Hiring Criterion', desc: 'Most companies test for product sense during interviews to see if you can analyze products meaningfully.' },
                { title: 'Bridges Strategy and Execution', desc: 'Ties small features to the \'bigger picture\' and strategic goals.' },
                { title: 'Anticipates User Behavior', desc: 'Sense unarticulated needs before competitors (e.g., Original iPhone, Gmail).' },
                { title: 'Stakeholder Alignment', desc: 'Provides the rationale needed to explain trade-offs to engineers and execs.' }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-white border border-zinc-100 rounded-[3rem] hover:bg-zinc-50 transition-all shadow-sm flex flex-col items-start">
                   <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mb-6 shadow-inner text-2xl font-black text-zinc-300">{i+1}</div>
                   <h5 className="text-2xl font-black text-zinc-950 mb-4">{item.title}</h5>
                   <p className="text-lg text-zinc-600 font-bold leading-relaxed italic">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-12">
           <div className="p-12 bg-indigo-50 border border-indigo-100 rounded-[4rem] space-y-10">
              <h3 className="text-3xl font-black text-indigo-950 tracking-tight text-center text-indigo-950">Daily Habits to Build Instincts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-indigo-950">
                 <div className="p-10 bg-white rounded-[3rem] border border-indigo-100 space-y-6">
                    <h5 className="text-xl font-black text-rose-900 border-b border-rose-50 pb-4">Talk to Users Regularly</h5>
                    <p className="text-lg text-indigo-800 font-bold italic leading-relaxed">Read tickets, join sales calls, and observe context surveys miss.</p>
                    <h5 className="text-xl font-black text-rose-900 border-b border-rose-50 pb-4 mt-12">Reverse-Engineer Products</h5>
                    <p className="text-lg text-indigo-800 font-bold italic leading-relaxed">Break down apps like Airbnb to understand core needs and trade-offs.</p>
                 </div>
                 <div className="p-10 bg-white rounded-[3rem] border border-indigo-100 space-y-6">
                    <h5 className="text-xl font-black text-rose-900 border-b border-rose-50 pb-4">Perform Product Drills</h5>
                    <p className="text-lg text-indigo-800 font-bold italic leading-relaxed">List 3 strengths and 3 weaknesses of a daily-use app with justifications.</p>
                    <h5 className="text-xl font-black text-rose-900 border-b border-rose-50 pb-4 mt-12">Embrace Constraints</h5>
                    <p className="text-lg text-indigo-800 font-bold italic leading-relaxed">Design solutions under xstrict limits (e.g., 30s onboarding) to sharpen judgment.</p>
                 </div>
              </div>
           </div>
        </section>

        <section className="p-12 bg-zinc-950 rounded-[4rem] text-white space-y-12 shadow-2xl">
           <h3 className="text-3xl font-black mb-10 text-indigo-400 tracking-tight border-b border-white/5 pb-8 text-center text-white">Ace the Product Sense Interview</h3>
           <p className="text-xl text-zinc-400 font-medium text-center">Hiring managers look for clarity, empathy, and reasoning rather than just a "correct" answer.</p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
              {[
                { title: 'Frame the problem clearly', desc: 'Before jumping to solutions.' },
                { title: 'Identify specific user segments', desc: 'And their unique pains.' },
                { title: 'Propose solutions with a rationale', desc: 'Explaining the hypothesis.' },
                { title: 'Discuss trade-offs', desc: 'Be prepared to answer, "Who suffers if we cut this feature?".' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start p-8 bg-white/5 rounded-3xl border border-white/10">
                   <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg text-white font-black text-white">{i+1}</div>
                   <div>
                      <p className="text-xl font-black text-white leading-tight mb-2 text-white">{item.title}</p>
                      <p className="text-sm font-bold text-zinc-500">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        <section className="bg-rose-50 border-4 border-rose-100 p-12 rounded-[4rem] space-y-10">
           <h3 className="text-3xl font-black text-rose-950 tracking-tight text-center">Common Pitfalls to Avoid</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-rose-950">
              <div className="p-10 bg-white rounded-[3rem] border border-rose-200 space-y-4">
                 <h5 className="text-xl font-black text-rose-900 border-b border-rose-50 pb-4">Over-reliance on "Gut"</h5>
                 <p className="text-sm font-bold text-rose-900/60 leading-relaxed italic">Instincts must be tempered by data; ignoring analytics is dangerous unless honed by experience.</p>
              </div>
              <div className="p-10 bg-white rounded-[3rem] border border-rose-200 space-y-4">
                 <h5 className="text-xl font-black text-rose-900 border-b border-rose-50 pb-4">The Aesthetic Trap</h5>
                 <p className="text-sm font-bold text-rose-900/60 leading-relaxed italic">Don't mistake polished UI for good product sense; a beautiful design solving the wrong problem is a failure.</p>
              </div>
              <div className="p-10 bg-white rounded-[3rem] border border-rose-200 space-y-4">
                 <h5 className="text-xl font-black text-rose-900 border-b border-rose-50 pb-4">Domain Overfitting</h5>
                 <p className="text-sm font-bold text-rose-900/60 leading-relaxed italic">Don't assume a playbook from one industry will automatically work in another.</p>
              </div>
           </div>
           <div className="p-8 bg-rose-950 rounded-[2.5rem] text-center text-white">
              <p className="text-xl font-black italic text-white">“Feature Bloat: Weak sense leads to 'copying competitors,' resulting in a bloated product that fails real problems.”</p>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-12 bg-white border-2 border-indigo-200 rounded-[3rem] shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
           <h5 className="text-xl font-black mb-8 uppercase tracking-[0.2em] text-indigo-600 text-center">🎯 Day-4 Mini Assignment</h5>
           <p className="text-lg font-bold text-zinc-700 mb-10 text-center px-12">Read this expert breakdown of Product Sense and apply it to a feature teardown. <br/> <strong className="text-zinc-900"><a href="https://www.parallelhq.com/blog/what-product-sense" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline decoration-2 underline-offset-4 transition-all">Reading: What is Product Sense? by Robin Dhanwani</a></strong></p>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 space-y-6">
                 <h6 className="text-2xl font-black text-zinc-900 border-b border-zinc-200 pb-6">The Task</h6>
                 <p className="text-lg font-bold text-zinc-700 leading-relaxed">Pick a feature from an app you use daily. Write a 1-page "Product Sense Teardown" identifying:</p>
                 <ul className="space-y-4 pt-4">
                    {['1) The core user problem', '2) The hypothesis behind the design', '3) One critical trade-off they made.'].map(step => (
                      <li key={step} className="flex items-center gap-4 text-lg font-black text-zinc-950 italic">
                         <span className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-sm font-black shadow-sm text-indigo-600 shrink-0">{step.charAt(0)}</span> {step.substring(2)}
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="p-10 bg-indigo-600 rounded-[3rem] text-white flex flex-col justify-center space-y-6 shadow-2xl">
                 <div className="text-5xl opacity-50">🧭</div>
                 <h6 className="text-2xl font-black text-white">Strategic Intent</h6>
                 <p className="text-lg font-bold italic text-indigo-100">“This teardown isn't about UI beauty — it's about the underlying logic of WHY the product works the way it does.”</p>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 5,
    title: 'User Empathy',
    category: 'Foundations',
    preview: 'Step into their shoes. User empathy is the fundamental driver of human-centered development.',
    content: (
      <div className="space-y-12">
        <section className="bg-pink-50 p-12 rounded-[4rem] border border-pink-100">
           <div className="flex gap-4 mb-8">
              <span className="px-4 py-1.5 bg-pink-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-pink-200">Foundations</span>
              <span className="px-4 py-1.5 bg-white border border-pink-100 text-pink-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">45m read</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight text-pink-950">User Empathy 📘</h2>
           <p className="text-xl text-pink-900 font-bold leading-relaxed max-w-3xl border-l-4 border-pink-600 pl-8 italic">
              Step into their shoes. User empathy is the fundamental driver of human-centered development.
           </p>
        </section>

        <section className="space-y-12">
           <div className="p-12 bg-white border-2 border-zinc-100 rounded-[4rem] shadow-sm">
              <h3 className="text-3xl font-black mb-8 tracking-tight">User Empathy in Product</h3>
              <p className="text-xl text-zinc-900 font-medium leading-relaxed italic mb-12">User empathy is the ability to understand and share the feelings, needs, and perspectives of users by "stepping into their shoes" to view the product through their eyes. It drives human-centered development.</p>
              
              <h4 className="text-lg font-black uppercase tracking-widest text-pink-500 mb-10">Core Principles of User Empathy</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { title: 'Active Listening', desc: 'Listen without judgment. Encourage open communication and hear what\'s NOT being said.' },
                   { title: 'Putting Users First', desc: 'Prioritize user needs over internal assumptions or ego. Align decisions with their interests.' },
                   { title: 'Deep Connection', desc: 'Grasp challenges, desires, and emotional motivations of your audience, not just tech specs.' }
                 ].map((prince, i) => (
                   <div key={i} className="p-10 bg-pink-50/30 border border-pink-100 rounded-[3rem] space-y-4 hover:bg-pink-50 transition-all shadow-sm">
                      <h5 className="text-xl font-black text-pink-950">{prince.title}</h5>
                      <p className="text-sm font-bold text-pink-900/60 leading-relaxed italic">{prince.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        <section className="space-y-12">
           <h3 className="text-3xl font-black text-zinc-900 px-4">Implementation Process for PMs</h3>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="p-12 bg-zinc-950 rounded-[4rem] text-white space-y-10 shadow-2xl relative overflow-hidden text-white">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px]"></div>
                 <div className="flex gap-4 items-center">
                    <span className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center font-black shadow-lg">1</span>
                    <h4 className="text-2xl font-black tracking-tight text-white">User Research & Personas</h4>
                 </div>
                 <div className="space-y-6">
                    <div>
                       <p className="text-[10px] font-black uppercase text-pink-400 tracking-widest mb-2 text-white text-white">Research Methods</p>
                       <p className="text-lg font-bold text-zinc-300 italic text-zinc-300">Interviews, surveys, and usability testing.</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-pink-400 tracking-widest mb-2 text-white text-white text-white">Personas</p>
                       <p className="text-lg font-bold text-zinc-300 italic text-zinc-300">Visualize different user groups.</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-pink-400 tracking-widest mb-2 text-white text-white text-white text-white">Empathy Maps</p>
                       <p className="text-lg font-bold text-zinc-300 italic text-zinc-300">Map what users think, feel, experience, and do.</p>
                    </div>
                 </div>
              </div>

              <div className="p-12 bg-white border-2 border-zinc-100 rounded-[4rem] space-y-10 shadow-sm relative overflow-hidden text-zinc-900">
                 <div className="flex gap-4 items-center">
                    <span className="w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center font-black shadow-lg text-white">2</span>
                    <h4 className="text-2xl font-black tracking-tight text-zinc-900">Design Thinking Integration</h4>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    {['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'].map(step => (
                      <div key={step} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center gap-3 font-black text-zinc-900">
                         <span className="w-2 h-2 rounded-full bg-pink-500 text-white"></span> {step}
                      </div>
                    ))}
                 </div>
                 <p className="text-lg text-zinc-600 font-bold leading-relaxed italic max-w-md">PMs observe interactions, define pain points, ideate solutions, and test prototypes to refine the experience based on feedback.</p>
              </div>
           </div>
           
           <div className="p-12 bg-white border-4 border-zinc-100 rounded-[4rem] flex flex-col md:flex-row gap-12 items-center shadow-xl">
              <div className="w-24 h-24 bg-pink-100 rounded-[2rem] flex items-center justify-center text-5xl shrink-0">♻️</div>
              <div>
                 <h4 className="text-2xl font-black text-zinc-950 mb-4">3 Continuous Feedback Loops</h4>
                 <p className="text-lg text-zinc-600 font-bold leading-relaxed italic max-w-3xl">Involve users at every stage, not just at the end. Use User Acceptance Testing (UAT) and iterative analysis to evolve with changing user preferences.</p>
              </div>
           </div>
        </section>

        <section className="space-y-12">
           <h3 className="text-3xl font-black text-zinc-900 px-4 text-center">Key Tools & Frameworks</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-zinc-900">
              {[
                { title: 'User Journey Mapping', desc: 'Visualizing the path a user takes.' },
                { title: 'User Stories', desc: 'Features from the user\'s perspective.' },
                { title: 'User Flows', desc: 'Step-by-step task completion.' },
                { title: 'User Segments', desc: 'Categorizing unique group needs.' }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] hover:border-pink-200 transition-all text-center">
                   <p className="font-black text-zinc-950 mb-2">{item.title}</p>
                   <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-12">
           <div className="p-12 bg-pink-950 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
              <h3 className="text-3xl font-black mb-12 text-pink-400 tracking-tight text-center text-white">Real-World Success</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
                 <div className="space-y-6 text-white">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-white">
                       <h5 className="text-3xl font-black mb-4 text-white text-white">Apple</h5>
                       <p className="text-lg text-zinc-300 font-medium italic leading-relaxed text-zinc-300">Demonstrates empathy through user-friendly interfaces and seamless experiences that create a loyal base.</p>
                    </div>
                 </div>
                 <div className="space-y-6 text-white">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-white">
                       <h5 className="text-3xl font-black mb-4 text-white text-white text-white">Airbnb</h5>
                       <p className="text-lg text-zinc-300 font-medium italic leading-relaxed text-zinc-300">Achieved success by focusing on the traveler's need for unique and personalized experiences.</p>
                    </div>
                 </div>
              </div>
              <div className="mt-12 text-center py-10 border-t border-white/5">
                 <p className="text-3xl font-black italic text-pink-400">“Empathy is a core value that ensures products exceed expectations, not just meet them.”</p>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-12 bg-white border-2 border-pink-200 rounded-[3rem] shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
           <h5 className="text-xl font-black mb-8 uppercase tracking-[0.2em] text-pink-600 text-center">🎯 Day-5 Mini Assignment</h5>
           <p className="text-xl font-black text-zinc-900 mb-10 text-center px-12">Find out How did Airbnb use user empathy to drive their success? <br/> <span className="text-zinc-500 text-lg">Look for specific stories about their "early days" and how they handled user problems.</span></p>
           
           <h6 className="text-lg font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 text-center text-zinc-400">Reflection Questions</h6>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { id: '1', q: 'How did they identify the problem travelers faced?' },
                { id: '2', q: 'What "unscalable" things did the founders do to empathize with hosts?' },
                { id: '3', q: 'How is that empathy reflected in the current app experience?' }
              ].map(item => (
                <div key={item.id} className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 flex flex-col gap-6 hover:shadow-lg transition-all">
                   <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-pink-600 shadow-sm border border-zinc-100 text-pink-600">{item.id}</span>
                   <p className="text-lg font-black text-zinc-950 italic leading-snug">{item.q}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    )
  },
  {
    day: 6,
    title: 'Business Fundamentals for PMs',
    category: 'Foundations',
    preview: 'Master the metrics that drive sustainable products. Learn CAC, LTV, and the "Golden Ratio" of business success.',
    content: (
      <div className="space-y-12">
        <header className="bg-emerald-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 translate-x-1/3 blur-3xl"></div>
           <div className="flex gap-4 mb-6">
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">Foundations</span>
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">45m read</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white text-white">Business Fundamentals for PMs 💰</h1>
           <p className="text-emerald-100 text-xl font-bold italic">Master the metrics that drive sustainable products. Learn CAC, LTV, and the "Golden Ratio" of business success.</p>
        </header>

        <section className="bg-white p-10 border border-zinc-100 rounded-[3rem] shadow-sm">
           <h2 className="text-2xl font-black mb-8 tracking-tight text-zinc-900">Learning Objectives</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Understand and calculate key unit economics metrics (CAC, LTV, payback period)',
                'Identify and analyze different business models and revenue streams',
                'Evaluate product decisions through a business lens',
                'Communicate the business impact of product features',
                'Assess product-market fit using business metrics'
              ].map(item => (
                <div key={item} className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl font-bold text-emerald-950 border border-emerald-100 text-sm">
                   <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" /> {item}
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-12">
           <div className="p-12 bg-zinc-950 rounded-[4rem] text-white space-y-12 shadow-2xl relative overflow-hidden text-white">
              <h3 className="text-3xl font-black text-indigo-400 tracking-tight text-center text-white">Why Business Fundamentals Matter for PMs</h3>
              <p className="text-2xl leading-tight font-black italic max-w-3xl text-center mx-auto text-white">Product Managers are often called the "mini-CEO" of their product. Here's why business knowledge is critical:</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">
                 <div className="space-y-6 text-center text-white">
                    <h5 className="text-lg font-black uppercase tracking-widest text-indigo-300 mb-6 text-white text-white">What Good PMs Do</h5>
                    <div className="grid grid-cols-1 gap-4 text-left text-white">
                       {['Balance user value with business value', 'Justify investments with ROI calculations', 'Speak confidently to executives', 'Understand customer lifecycle economics'].map(item => (
                         <div key={item} className="p-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-zinc-300 italic text-white">{item}</div>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-6 text-center text-white">
                    <h5 className="text-lg font-black uppercase tracking-widest text-rose-400 mb-6 text-white text-white text-white">Common PM Mistakes</h5>
                    <div className="grid grid-cols-1 gap-4 text-left text-white">
                       {['Building features users love but don\'t pay for', 'Ignoring customer acquisition costs', 'Focusing on vanity metrics', 'Ignoring sustainability'].map(item => (
                         <div key={item} className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl font-bold text-rose-200 italic text-white text-white text-white">{item}</div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <section className="space-y-12">
           <h3 className="text-3xl font-black text-zinc-900 px-4 text-center">Case Studies: Engagement vs Success</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              {[
                { title: 'Twitter/X', color: 'bg-zinc-950 text-white', desc: 'Built incredible engagement but struggled with monetization for a decade. Engagement ≠ Business Success.' },
                { title: 'Instagram', color: 'bg-gradient-to-tr from-purple-600 to-orange-500 text-white', desc: 'Delayed monetization to focus on growth. Worked because they had Facebook\'s massive resources.' },
                { title: 'Notion', color: 'bg-white text-zinc-950 border-2 border-zinc-100', desc: 'Freemium model carefully designed to convert power users. Model aligned perfectly with user behavior.' }
              ].map(item => (
                <div key={item.title} className={`p-10 rounded-[3rem] space-y-6 flex flex-col justify-center ${item.color} shadow-xl hover:scale-105 transition-transform`}>
                   <h5 className="text-3xl font-black tracking-tight text-center text-white text-white">{item.title}</h5>
                   <p className="text-sm font-bold leading-relaxed text-center italic">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-12">
           <div className="p-12 bg-white border-2 border-zinc-100 rounded-[4rem] space-y-12 shadow-sm text-center">
              <h3 className="text-3xl font-black tracking-tight text-zinc-950 text-center text-zinc-950 text-zinc-950 text-zinc-950">Unit Economics & Formulas</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-center text-zinc-900">
                 <div className="p-10 bg-indigo-50 border border-indigo-100 rounded-[3rem] space-y-6 text-center text-indigo-950">
                    <h5 className="text-2xl font-black text-indigo-950 text-center text-indigo-950">Customer Acquisition Cost (CAC)</h5>
                    <div className="p-6 bg-white rounded-2xl border-4 border-indigo-200 font-mono text-xl text-center text-indigo-600 font-black text-indigo-600">
                       (Total Mkt + Sales Costs) / # New Users
                    </div>
                    <p className="text-sm font-bold text-indigo-900/60 italic text-center text-center">Example: $50,000 spend + 500 users = $100 CAC</p>
                 </div>
                 
                 <div className="p-10 bg-emerald-50 border border-emerald-100 rounded-[3rem] space-y-6 text-emerald-950">
                    <h5 className="text-2xl font-black text-emerald-950 text-emerald-950">Lifetime Value (LTV)</h5>
                    <div className="space-y-4">
                       <div className="p-4 bg-white rounded-xl border border-emerald-200 flex justify-between items-center text-emerald-950">
                          <span className="font-bold text-emerald-900 text-emerald-900 text-emerald-900">Simple LTV</span>
                          <span className="font-mono text-emerald-600 font-black text-emerald-600">ARPU × Avg Lifespan</span>
                       </div>
                       <div className="p-4 bg-white rounded-xl border border-emerald-200 flex justify-between items-center text-emerald-950">
                          <span className="font-bold text-emerald-900 text-emerald-900 text-emerald-900">LTV with Churn</span>
                          <span className="font-mono text-emerald-600 font-black text-emerald-600">(ARPU × Gross Margin) / Churn Rate</span>
                       </div>
                    </div>
                    <p className="text-xs font-black text-emerald-950 bg-white/50 px-4 py-2 rounded-lg italic text-center text-emerald-950">Critical Insight: Increasing customer lifespan by 50% directly increases LTV by 50%!</p>
                 </div>
              </div>

              <div className="p-12 bg-zinc-950 rounded-[4rem] text-white">
                 <h4 className="text-2xl font-black mb-10 text-indigo-400 text-center tracking-widest uppercase text-white">The Golden Ratio: LTV:CAC</h4>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
                    {[
                      { range: '< 1:1', title: 'Crisis Mode', color: 'text-rose-500', desc: 'Losing money. Reduce CAC or increase LTV urgently.' },
                      { range: '3:1 to 5:1', title: 'The Sweet Spot', color: 'text-emerald-400', desc: 'Optimal balance. Scalable and healthy business.' },
                      { range: '> 5:1', title: 'Underinvesting', color: 'text-amber-400', desc: 'Too conservative. Competitors might outgrow you.' }
                    ].map(item => (
                      <div key={item.title} className="space-y-4 text-white">
                         <p className={`text-4xl font-black ${item.color} text-white`}>{item.range}</p>
                         <p className="text-lg font-black tracking-tight text-white">{item.title}</p>
                         <p className="text-xs font-bold text-zinc-500 italic text-white">{item.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-12 bg-white border-2 border-emerald-200 rounded-[3rem] shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
           <h5 className="text-xl font-black mb-8 uppercase tracking-[0.2em] text-emerald-600 text-center">🎯 Day-6 Mini Assignment</h5>
           <p className="text-3xl font-black text-zinc-900 mb-10 text-center tracking-tight text-zinc-900 text-zinc-900">Unit Economics Problem</p>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="p-10 bg-zinc-950 rounded-[3rem] border border-zinc-800 space-y-6 text-white font-mono text-sm leading-relaxed text-white">
                 <h6 className="text-xl font-black text-indigo-400 border-b border-white/10 pb-4 mb-6 uppercase tracking-widest text-white text-white">The Data Set</h6>
                 <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-white">
                    <span className="text-zinc-500 font-black uppercase tracking-widest text-[10px] text-white">Ad Spend:</span> <span className="text-indigo-300 font-black text-white">$30,000</span>
                    <span className="text-zinc-500 font-black uppercase tracking-widest text-[10px] text-white">Sales Team:</span> <span className="text-indigo-300 font-black text-white">$20,000</span>
                    <span className="text-zinc-500 font-black uppercase tracking-widest text-[10px] text-white">New Users:</span> <span className="text-indigo-300 font-black text-white">250</span>
                    <span className="text-zinc-500 font-black uppercase tracking-widest text-[10px] text-white">ARPU:</span> <span className="text-indigo-300 font-black text-white">$40/mo</span>
                 </div>
              </div>
              <div className="flex flex-col justify-center space-y-10">
                 <div className="space-y-4 text-zinc-900 text-zinc-900">
                    <p className="text-lg font-black text-zinc-950 border-l-4 border-indigo-600 pl-6 uppercase tracking-widest">Calculate</p>
                    <p className="text-xl font-black text-zinc-900 pl-6">1 CAC, 2 LTV, 3 LTV:CAC Ratio</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 7,
    title: 'Introduction to User & Market Research',
    category: 'Research',
    preview: 'Think like a researcher. Learn structured methods to uncover pain points and validate product ideas.',
    content: (
      <div className="space-y-12">
        <header className="bg-purple-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl text-white"></div>
           <div className="flex gap-4 mb-6">
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white text-white">Research</span>
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white text-white text-white text-white">45m read</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white text-white text-white text-white text-white">Introduction to User & Market Research 🔍</h1>
           <p className="text-purple-100 text-xl font-bold italic text-white">Think like a researcher. Learn structured methods to uncover pain points and validate product ideas.</p>
        </header>

        {/* Must Watch section with thumbnails at the top for Day 7 */}
        <section className="p-10 bg-zinc-950 rounded-[3rem] text-white space-y-8 relative overflow-hidden shadow-2xl text-white text-white text-white text-white text-white text-white">
           <h6 className="text-lg font-black uppercase tracking-widest text-indigo-400 text-center text-white text-white">Must Watch Videos</h6>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white text-white">
              <a href="https://youtu.be/MxwyGi-3dzY?si=CV5VWd2bNnUDW-fP" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
                 <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-800 border border-white/10">
                    <img src="https://img.youtube.com/vi/MxwyGi-3dzY/mqdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Doing User Research" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                       <PlayCircle className="w-12 h-12 text-white fill-current text-white" />
                    </div>
                 </div>
                 <p className="text-lg font-black text-center group-hover:text-indigo-400 transition-colors text-white">Doing User Research</p>
              </a>
              <a href="https://youtu.be/LoJDAeq6i34?si=Ok2GW9U0wFmSJzz8" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
                 <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-800 border border-white/10">
                    <img src="https://img.youtube.com/vi/LoJDAeq6i34/mqdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Market Research" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                       <PlayCircle className="w-12 h-12 text-white fill-current text-white" />
                    </div>
                 </div>
                 <p className="text-lg font-black text-center group-hover:text-indigo-400 transition-colors text-white text-white">Market Research</p>
              </a>
           </div>
        </section>

        <section className="bg-white p-12 border border-zinc-100 rounded-[4rem] text-center shadow-sm">
           <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 italic tracking-tighter leading-tight mb-8 max-w-4xl mx-auto">
              “Great products start with deep understanding — of users, their needs, and the market around them.”
           </p>
           <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl mx-auto italic text-zinc-600">
              Today’s focus is to think like a researcher, not a builder. You’ll learn how to identify who your users are, what they struggle with, and why solving it matters.
           </p>
        </section>

        <section className="p-10 bg-purple-50 border border-purple-100 rounded-[3.5rem] space-y-10">
           <h3 className="text-2xl font-black text-purple-950 px-4 text-purple-950">Learning Objectives</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Explain the difference between user research and market research',
                'Identify user pain points using qualitative and quantitative methods',
                'Apply basic frameworks — Empathy Map, JTBD, and Segmentation',
                'Use AI tools to accelerate research synthesis'
              ].map(item => (
                <div key={item} className="p-6 bg-white rounded-3xl border border-purple-200 flex items-center gap-4 text-lg font-bold text-purple-900 italic text-purple-900">
                   <CheckCircle className="w-6 h-6 text-purple-600 shrink-0 text-purple-600" /> {item}
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-10">
           <h3 className="text-3xl font-black text-zinc-950 px-4 text-zinc-900 text-zinc-900">1. User Research vs Market Research</h3>
           <div className="overflow-hidden rounded-[3rem] border-4 border-zinc-100 bg-white shadow-2xl">
              <table className="w-full text-left text-zinc-900">
                <thead className="bg-zinc-950 text-white font-black text-xs uppercase tracking-[0.2em] text-white">
                  <tr>
                    <th className="p-8">Aspect</th>
                    <th className="p-8">User Research</th>
                    <th className="p-8">Market Research</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-bold text-sm text-zinc-900">
                  {[
                    { a: 'Focus', u: 'Individual behaviors & pain points', m: 'Industry, competitors, trends' },
                    { a: 'Goal', u: 'Validate Problem', m: 'Validate Opportunity' },
                    { a: 'Methods', u: 'Interviews, surveys, usability tests', m: 'Desk research, benchmarking' },
                    { a: 'Output', u: 'Personas, Journey Maps', m: 'TAM/SAM/SOM, SWOT' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-50 transition-colors">
                       <td className="p-8 text-purple-600 font-black uppercase tracking-widest text-[10px] text-purple-600">{row.a}</td>
                       <td className="p-8 text-zinc-900 leading-relaxed italic">{row.u}</td>
                       <td className="p-8 text-zinc-500 leading-relaxed italic text-zinc-500">{row.m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
           <div className="p-8 bg-zinc-950 rounded-[3rem] text-center border-4 border-indigo-600 text-white text-white">
              <p className="text-2xl font-black text-white italic text-white text-white text-white">💡 PM Tip: Always start with user research before market research. If users don’t want it, market data doesn’t matter.</p>
           </div>
        </section>

        <section className="space-y-12">
           <h3 className="text-3xl font-black text-zinc-950 px-4 tracking-tight text-zinc-900 text-zinc-900">2. The Research Process</h3>
           <div className="overflow-hidden rounded-[3rem] border-4 border-zinc-100 bg-white shadow-2xl">
              <table className="w-full text-left text-zinc-900">
                <thead className="bg-zinc-950 text-white font-black text-xs uppercase tracking-[0.2em] text-white">
                  <tr>
                    <th className="p-8">Step</th>
                    <th className="p-8">Activity</th>
                    <th className="p-8">Key Question / Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-bold text-sm text-zinc-900 text-zinc-900">
                  {[
                    { n: '1', t: 'Define Objective', q: '“What do I want to learn?”' },
                    { n: '2', t: 'Choose Method', q: 'Interviews, surveys, or secondary.' },
                    { n: '3', t: 'Recruit Users', q: 'Identify your target segments.' },
                    { n: '4', t: 'Collect Data', q: 'Ask open-ended questions.' },
                    { n: '5', t: 'Synthesize', q: 'Identify themes and insights.' }
                  ].map((step, i) => (
                    <tr key={i} className="hover:bg-zinc-50 transition-colors">
                       <td className="p-8 text-purple-600 font-black text-lg text-purple-600">{step.n}</td>
                       <td className="p-8 text-zinc-900">{step.t}</td>
                       <td className="p-8 text-zinc-500 italic text-zinc-500">{step.q}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </section>

        <section className="space-y-12">
           <h3 className="text-3xl font-black text-zinc-900 px-4 text-zinc-900 text-zinc-900">3. Research Frameworks</h3>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-zinc-900">
              <div className="p-12 bg-zinc-900 rounded-[4rem] text-white space-y-8 shadow-2xl border border-zinc-800 text-white text-white">
                 <h4 className="text-2xl font-black text-purple-400 tracking-tight text-purple-400">Empathy Map</h4>
                 <p className="text-lg font-bold text-zinc-300 italic mb-8">Map out what users: Says, Does, Thinks, and Feels.</p>
                 <div className="grid grid-cols-2 gap-4">
                    {['SAYS', 'DOES', 'THINKS', 'FEELS'].map(cap => (
                       <div key={cap} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-2xl tracking-widest text-white/40">{cap}</div>
                    ))}
                 </div>
              </div>
              
              <div className="p-12 bg-purple-50 rounded-[4rem] border border-purple-100 space-y-8 shadow-sm text-purple-950">
                 <h4 className="text-2xl font-black text-purple-950 tracking-tight">Jobs To Be Done (JTBD)</h4>
                 <p className="text-xl font-black text-purple-900 italic leading-snug text-purple-900">“People don’t buy products; they hire them to get a job done.”</p>
                 <div className="space-y-4 pt-6 border-t border-purple-200 text-purple-950">
                    <p className="text-lg font-black text-purple-950 text-purple-950">When I... <span className="text-purple-400 font-bold text-purple-400">(situation)</span></p>
                    <p className="text-lg font-black text-purple-950 text-purple-950">I want to... <span className="text-purple-400 font-bold text-purple-400">(motivation)</span></p>
                    <p className="text-lg font-black text-purple-950 text-purple-950">So I can... <span className="text-purple-400 font-bold text-purple-400">(desired outcome)</span></p>
                 </div>
                 <div className="p-6 bg-white rounded-3xl border border-purple-200 italic font-bold text-purple-900 text-sm">Example: hiring Duolingo to feel productive while waiting.</div>
              </div>
           </div>
        </section>

        <section className="space-y-12">
           <h3 className="text-3xl font-black text-zinc-950 px-4 text-zinc-900 text-zinc-900">Segmentation Strategies</h3>
           <div className="overflow-hidden rounded-[3rem] border-4 border-zinc-100 bg-white shadow-2xl">
              <table className="w-full text-left text-zinc-900">
                <thead className="bg-zinc-950 text-white font-black text-xs uppercase tracking-[0.2em] text-white">
                  <tr>
                    <th className="p-8">Strategy</th>
                    <th className="p-8">Target Criteria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-bold text-sm text-zinc-900">
                  {[
                    { title: 'Demographics', val: 'Age, gender, location, income.' },
                    { title: 'Psychographics', val: 'Motivations, lifestyle, values.' },
                    { title: 'Behavior', val: 'Usage freq, loyalty, spending.' },
                    { title: 'Needs-Based', val: 'Specific pain points & goals.' }
                  ].map((seg, i) => (
                    <tr key={i} className="hover:bg-zinc-50 transition-colors">
                       <td className="p-8 text-purple-600 font-black uppercase tracking-widest text-[10px] text-purple-600">{seg.title}</td>
                       <td className="p-8 text-zinc-900 italic leading-relaxed">{seg.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </section>

        <section className="p-12 bg-white border-4 border-zinc-100 rounded-[4rem] space-y-12 shadow-2xl text-zinc-900">
           <h3 className="text-3xl font-black text-zinc-950 tracking-tight text-zinc-950">Tools & AI Assistants</h3>
           <div className="overflow-hidden rounded-[3rem] border border-zinc-200 bg-zinc-50">
              <table className="w-full text-left text-zinc-900">
                <thead className="bg-purple-600 text-white font-black text-xs uppercase tracking-[0.2em] text-white">
                  <tr>
                    <th className="p-6">Tool</th>
                    <th className="p-6">Role / Context</th>
                    <th className="p-6">Example Usage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-bold text-sm text-zinc-900">
                  {[
                    { tool: 'ChatGPT', role: 'Interview Prep', use: '"Generate 10 questions for student productivity challenges."' },
                    { tool: 'Perplexity AI', role: 'Competitor Scan', use: '"Real-time deep competitive analysis and market data."' },
                    { tool: 'Notion AI', role: 'Synthesis', use: '"Summarize key pain points from long interview transcripts."' },
                    { tool: 'Canva', role: 'Visualization', use: '"Create visually compelling user personas."' }
                  ].map((item, i) => (
                    <tr key={item.tool} className="hover:bg-white transition-colors">
                       <td className="p-6 text-purple-700 font-black text-purple-700">{item.tool}</td>
                       <td className="p-6 text-zinc-900">{item.role}</td>
                       <td className="p-6 text-zinc-500 italic leading-relaxed text-zinc-500">{item.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </section>

        <section className="bg-zinc-950 rounded-[4rem] text-white p-12 shadow-2xl relative overflow-hidden text-white text-white">
           <h3 className="text-3xl font-black mb-10 text-indigo-400 tracking-tight text-center text-indigo-400 text-white">Real-World Case: Zomato One-Tap</h3>
           <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <table className="w-full text-left">
                <thead className="bg-indigo-600 text-white font-black text-xs uppercase tracking-widest text-white">
                  <tr>
                    <th className="p-6">Stage</th>
                    <th className="p-6">Detail / Metric</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-bold text-sm text-zinc-300 text-zinc-300">
                  <tr>
                    <td className="p-6 text-indigo-300 font-black uppercase tracking-widest text-[10px] text-indigo-300 text-white">Pain Point</td>
                    <td className="p-6 italic">“Hungry but don't want to call restaurants or search again.”</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-indigo-300 font-black uppercase tracking-widest text-[10px] text-indigo-300 text-white">Method</td>
                    <td className="p-6 italic">Surveys & Usage Data Analysis</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-indigo-300 font-black uppercase tracking-widest text-[10px] text-indigo-300 text-white">Insight</td>
                    <td className="p-6 italic">Users repeat specific orders 60% of the time.</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-indigo-300 font-black uppercase tracking-widest text-[10px] text-indigo-300 text-white">Outcome</td>
                    <td className="p-6 font-black text-white">1-Tap Reordering feature launched → Orders ↑ 22%</td>
                  </tr>
                </tbody>
              </table>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-12">
        <div className="p-12 bg-white border-2 border-purple-200 rounded-[3rem] shadow-xl relative overflow-hidden">
           <h5 className="text-xl font-black mb-8 uppercase tracking-[0.2em] text-purple-600 text-center">🎯 Day-7 Research Drill</h5>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 text-zinc-900">
              <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 space-y-6 text-zinc-900 text-zinc-900">
                 <p className="text-lg font-black text-zinc-900 leading-relaxed italic text-zinc-900">1. Use ChatGPT to generate 5 open-ended interview questions for your idea.</p>
                 <p className="text-lg font-black text-zinc-900 leading-relaxed italic border-t border-zinc-200 pt-6 text-zinc-900 text-zinc-900">2. Document these in your workspace and highlight the top 3 themes you expect to uncover. <br/> <strong className="text-indigo-600 text-indigo-600">Reflect: “What might surprise you about how real users respond vs your assumptions?”</strong></p>
              </div>
              <div className="p-10 bg-purple-600 rounded-[3rem] text-white flex flex-col justify-center shadow-2xl relative overflow-hidden text-white">
                 <h6 className="text-2xl font-black mb-6 border-b border-white/10 pb-4 text-white text-white">Day-7 Comprehensive Assignment</h6>
                 <div className="space-y-4 font-bold italic text-purple-100 text-sm">
                    <p>Research Task List: 1 Define Target Segment, 2 Pain Point vs. Outcome Table, 3 Competitor Scan</p>
                    <p>Final Deliverable (One-Slide Summary): • The User, • The Problem, • The Market. Deliverable: User & Market Research Report. Outcome: Readiness for Day 8 User Interviews</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 8,
    title: 'User Interviews & Surveys',
    category: 'Research',
    preview: '“If you listen carefully, your users will write your roadmap for you.” Master structured feedback and real validation.',
    content: (
      <div className="space-y-12">
        <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl text-white"></div>
           <div className="flex gap-4 mb-6">
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white text-white text-white">Research</span>
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white text-white text-white text-white">45m read</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white text-white text-white text-white">User Interviews & Surveys 🎙️</h1>
           <p className="text-indigo-100 text-xl font-bold italic text-white">“If you listen carefully, your users will write your roadmap for you.” Master structured feedback and real validation.</p>
        </header>

        {/* Must Watch section with thumbnail at the top for Day 8 */}
        <section className="p-10 bg-zinc-950 rounded-[3rem] text-white space-y-8 relative overflow-hidden shadow-2xl text-white text-white text-white">
           <h6 className="text-lg font-black uppercase tracking-widest text-indigo-400 text-center text-indigo-400">Must Watch Video</h6>
           <div className="max-w-2xl mx-auto text-white">
              <a href="https://youtu.be/5tVbFfGDQCk?si=91eAlcNvjUAFfxM1" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
                 <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-800 border border-white/10 shadow-2xl">
                    <img src="https://img.youtube.com/vi/5tVbFfGDQCk/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" alt="How To Conduct User Interviews" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                       <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 fill-current text-white" />
                       </div>
                    </div>
                 </div>
                 <p className="text-xl font-black text-center group-hover:text-indigo-400 transition-colors text-white">How To Conduct User Interviews Like A Pro</p>
              </a>
           </div>
        </section>

        <section className="bg-white p-12 border border-zinc-100 rounded-[4rem] text-center shadow-sm">
           <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic tracking-tighter leading-tight mb-8 max-w-4xl mx-auto">
              “If you listen carefully, your users will write your roadmap for you.”
           </p>
           <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl mx-auto italic text-zinc-600">
              Yesterday we explored target segments. Today we learn how to validate insights through real conversations and structured feedback.
           </p>
        </section>

        <section className="p-10 bg-indigo-50 border border-indigo-100 rounded-[3.5rem] space-y-10">
           <h3 className="text-2xl font-black text-indigo-950 px-4 text-indigo-950">Learning Objectives</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Conduct structured discovery interviews', 'Design clear & unbiased surveys', 'Identify recurring pain themes', 'Synthesize insights using AI tools'].map(item => (
                <div key={item} className="p-6 bg-white rounded-3xl border border-indigo-200 flex items-center gap-4 text-lg font-bold text-indigo-900 italic shadow-sm">
                   <CheckCircle className="w-6 h-6 text-indigo-600 shrink-0 text-indigo-600" /> {item}
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-12">
           <h3 className="text-3xl font-black text-zinc-950 px-4 tracking-tight text-center text-zinc-900">1. Why User Interviews Matter</h3>
           <div className="overflow-hidden rounded-[3rem] border-4 border-zinc-100 bg-white shadow-2xl">
              <table className="w-full text-left text-zinc-900">
                <thead className="bg-zinc-950 text-white font-black text-xs uppercase tracking-[0.2em] text-white">
                  <tr>
                    <th className="p-8">Reason</th>
                    <th className="p-8">Benefit for PMs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-bold text-sm text-zinc-900">
                  {[
                    { title: 'Deep \'Why\'', desc: 'Understand user motivation beyond what behavioral data shows.' },
                    { title: 'Assumptions', desc: 'Validate high-risk assumptions early before spending engineering resources.' },
                    { title: 'Unspoken Needs', desc: 'Discover emotional triggers and pain points users didn\'t mention.' },
                    { title: 'Empathy', desc: 'Build genuine intuition for the user\'s daily life and environment.' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-50 transition-colors">
                       <td className="p-8 text-indigo-600 font-black text-lg text-indigo-600">{row.title}</td>
                       <td className="p-8 text-zinc-500 leading-relaxed font-medium text-zinc-500">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
           <div className="p-10 bg-zinc-950 rounded-[4rem] text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden text-white text-white">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-4xl shrink-0">💎</div>
              <div>
                 <p className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.3em] mb-4 text-indigo-400">Example: Insight to Feature</p>
                 <p className="text-2xl font-black leading-tight italic text-white text-white">"I want to feel progress even if I study for 5 minutes."</p>
                 <p className="text-lg font-bold text-zinc-400 mt-4 leading-relaxed text-zinc-400">→ Inspired Duolingo's Streak system, now a core retention driver.</p>
              </div>
           </div>
        </section>

        <section className="space-y-10">
           <h3 className="text-3xl font-black text-zinc-950 px-4 text-center text-zinc-900">2. Types of Interview Questions</h3>
           <div className="overflow-hidden rounded-[3rem] border-4 border-zinc-100 bg-white shadow-2xl">
              <table className="w-full text-left text-zinc-900">
                <thead className="bg-zinc-950 text-white font-black text-xs uppercase tracking-[0.2em] text-white">
                  <tr>
                    <th className="p-8">Type</th>
                    <th className="p-8">Example</th>
                    <th className="p-8">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-bold text-sm text-zinc-900">
                  {[
                    { t: 'Behavioral (Past)', e: '“Tell me about the last time you ordered food.”', p: 'Habit Analysis' },
                    { t: 'Attitudinal (Feelings)', e: '“What frustrations you most about your current apps?”', p: 'Pain Discovery' },
                    { t: 'Aspirational (Future)', e: '“What would make your experience 10x better?”', p: 'Ideation' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-50 transition-colors">
                       <td className="p-8 text-indigo-600 font-black uppercase tracking-widest text-xs text-indigo-600">{row.t}</td>
                       <td className="p-8 text-zinc-900 leading-relaxed italic">{row.e}</td>
                       <td className="p-8 text-zinc-500 leading-relaxed italic text-zinc-500">{row.p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
           <div className="p-10 bg-indigo-50 rounded-[3rem] border border-indigo-200 text-center text-center">
              <p className="text-2xl font-black text-indigo-950 italic leading-tight text-indigo-950">🧠 Golden Rule: No leading questions. Don't ask "Wouldn't it be better if...?" Ask "How do you feel about...?"</p>
           </div>
        </section>

        <section className="space-y-12">
           <h3 className="text-3xl font-black text-zinc-900 px-4 text-center text-zinc-900">3. Interview Structure (15–20 min)</h3>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-zinc-900 text-zinc-900">
              {[
                { n: '1', t: 'Intro', q: 'Make the user comfortable. Explain purpose, emphasize there are no wrong answers.' },
                { n: '2', t: 'Context', q: 'Understand background. Ask about their current tools, role, and daily routine.' },
                { n: '3', t: 'Core Questions', q: 'Explore behaviors & pain. Deep dive into the specific problem area you\'re solving.' },
                { n: '4', t: 'Wrap Up', q: 'Final insights & referrals. Ask if they have anything to add or know someone else to talk to.' }
              ].map(step => (
                <div key={step.n} className="p-8 bg-white border border-zinc-100 rounded-3xl space-y-4 hover:bg-zinc-900 hover:text-white transition-all group shadow-sm text-center">
                   <span className="text-4xl font-black text-zinc-200 group-hover:text-indigo-50 transition-colors">{step.n}</span>
                   <h5 className="font-black text-lg uppercase tracking-widest text-zinc-400 group-hover:text-white">{step.t}</h5>
                   <p className="text-xs font-bold text-zinc-500 group-hover:text-zinc-400 italic leading-relaxed">{step.q}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-center text-zinc-900 text-zinc-900">
           <div className="p-12 bg-zinc-950 rounded-[4rem] text-white space-y-8 shadow-2xl relative overflow-hidden text-white text-white">
              <h4 className="text-2xl font-black text-indigo-400 tracking-tight text-indigo-400 text-white">AI Accelerator</h4>
              <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-6 text-white text-white">
                 <p className="text-xl font-black italic text-white text-white text-white">"Summarize these interview transcripts into 3 distinct pain points and 3 desired outcomes."</p>
                 <p className="text-[10px] font-black uppercase text-indigo-300 tracking-widest mt-6 text-indigo-300 text-white">Synthesis Prompt</p>
              </div>
           </div>
           
           <div className="p-12 bg-white border-2 border-zinc-100 rounded-[4rem] space-y-8 shadow-sm text-zinc-900 text-zinc-900 text-zinc-900">
              <h4 className="text-2xl font-black text-zinc-950 tracking-tight text-zinc-950">Survey Principles</h4>
              <div className="grid grid-cols-1 gap-4">
                 {['Ask one thing per question', 'Avoid biased wording', 'Mix question types (MCQ + scale)', 'Keep it under 10 questions'].map(princ => (
                   <div key={princ} className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center gap-4 text-sm font-black text-zinc-900 italic">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 text-white"></span> {princ}
                   </div>
                 ))}
              </div>
           </div>
        </section>

        <section className="p-12 bg-indigo-50 border-4 border-indigo-100 rounded-[4rem] shadow-sm text-center">
           <h3 className="text-3xl font-black text-indigo-950 mb-10 tracking-tight text-center text-indigo-950">4. Synthesizing Insights</h3>
           <p className="text-xl text-center text-indigo-900 font-bold mb-12 italic text-indigo-900 text-indigo-900">After 5–10 interviews, group similar issues into actionable themes.</p>
           
           <div className="p-12 bg-white rounded-[3rem] border border-indigo-200 shadow-xl max-w-4xl mx-auto space-y-10 relative overflow-hidden text-center text-zinc-900 text-zinc-900">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 text-center"></div>
              <div className="text-center space-y-4 relative z-10 text-center text-center">
                 <p className="text-3xl font-black text-zinc-900 leading-tight text-zinc-900">"I forget my fitness goals midweek."</p>
                 <div className="h-1 w-20 bg-indigo-600 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 text-center text-center">
                 <div className="space-y-6 text-left text-left">
                    <div>
                       <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mb-2 text-indigo-500">The Pain</p>
                       <p className="text-lg font-black text-zinc-900">Motivation Drop</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mb-2 text-indigo-500">Feature Opportunity</p>
                       <p className="text-lg font-black text-zinc-900 text-zinc-900">AI Reminder Coach</p>
                    </div>
                 </div>
                 <div className="flex flex-col justify-center text-center">
                    <div className="p-6 bg-indigo-950 rounded-3xl text-white text-white">
                       <p className="text-sm font-bold leading-relaxed italic text-white text-white text-white">Contextual nudges based on historical low-activity days.</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-12 bg-white border-2 border-indigo-200 rounded-[3rem] shadow-xl relative overflow-hidden text-center text-center">
           <h5 className="text-xl font-black mb-8 uppercase tracking-[0.2em] text-indigo-600 text-center text-indigo-600 text-center">🎯 Day-8: User Insights Report</h5>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 text-center text-center">
              <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 space-y-10 text-center text-center">
                 <h6 className="text-2xl font-black text-zinc-950 border-b border-zinc-200 pb-6 tracking-tight text-center text-zinc-950 text-zinc-950">1-Page Deliverable</h6>
                 <ul className="space-y-6 text-center text-zinc-900 text-zinc-900">
                    {[
                      { n: '1', t: 'Top 3 Pain Points (with supporting user quotes)' },
                      { n: '2', t: 'Top 3 Desired Outcomes (what users want to achieve)' },
                      { n: '3', t: 'One Opportunity Statement: How might we solve for X?' }
                    ].map(item => (
                      <li key={item.n} className="flex gap-6 items-start text-center">
                         <span className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center shrink-0 shadow-sm text-indigo-600 font-black italic text-center text-indigo-600">{item.n}</span>
                         <p className="text-lg font-black text-zinc-900 leading-snug italic font-medium">{item.t}</p>
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="p-10 bg-emerald-600 rounded-[3rem] text-white flex flex-col justify-center space-y-6 shadow-2xl text-white text-white text-white">
                 <div className="text-5xl opacity-50 text-white text-white text-white">🏆</div>
                 <h6 className="text-2xl font-black text-white text-white text-white">Evaluation Criteria</h6>
                 <p className="text-lg font-bold italic text-emerald-100 leading-relaxed font-medium text-white text-white text-white text-white">“Great: 3 strong actionable themes supported by data.”</p>
                 <div className="p-6 bg-white/10 rounded-2xl border border-white/10 mt-6 text-white text-white text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-emerald-300 text-white text-white text-white">Deadline</p>
                    <p className="text-xl font-black text-white text-white text-white">End of Day 10</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 9,
    title: 'User Personas & Jobs To Be Done (JTBD)',
    category: 'Research',
    preview: '“You don’t design for everyone — you design for someone.” Convert raw feedback into structured user profiles.',
    content: (
      <div className="space-y-12">
        <header className="bg-purple-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl text-white"></div>
           <div className="flex gap-4 mb-6">
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white text-white text-white">Research</span>
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white text-white text-white text-white">45m read</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white text-white text-white text-white text-white">User Personas & Jobs To Be Done (JTBD) 👥</h1>
           <p className="text-purple-100 text-xl font-bold italic text-white">“You don’t design for everyone — you design for someone.” Convert raw feedback into structured user profiles.</p>
        </header>

        {/* Day 9 Must Watch with thumbnails at the top */}
        <section className="p-10 bg-zinc-950 rounded-[3rem] text-white space-y-8 relative overflow-hidden shadow-2xl text-white text-white text-white text-white text-white text-white text-white">
           <h6 className="text-lg font-black uppercase tracking-widest text-indigo-400 text-center text-indigo-400 text-white">Must Watch Videos</h6>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white text-white">
              <a href="https://youtu.be/dbVN6EYql6k?si=2440TMiKd3ZVmGvK" target="_blank" rel="noopener noreferrer" className="group block space-y-4 text-white text-white">
                 <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-800 border border-white/10 shadow-2xl">
                    <img src="https://img.youtube.com/vi/dbVN6EYql6k/mqdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Jobs to be done" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                       <PlayCircle className="w-12 h-12 text-white fill-current text-white text-white" />
                    </div>
                 </div>
                 <p className="text-lg font-black text-center group-hover:text-indigo-400 transition-colors text-white text-white">Jobs to be done</p>
              </a>
              <a href="https://youtu.be/v6EWN4EjHM0?si=5up6JXpGPfYnIq1d" target="_blank" rel="noopener noreferrer" className="group block space-y-4 text-white text-white text-white">
                 <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-800 border border-white/10 shadow-2xl">
                    <img src="https://img.youtube.com/vi/v6EWN4EjHM0/mqdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Creating Personas" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                       <PlayCircle className="w-12 h-12 text-white fill-current text-white text-white text-white" />
                    </div>
                 </div>
                 <p className="text-lg font-black text-center group-hover:text-indigo-400 transition-colors text-white text-white">Creating Personas</p>
              </a>
           </div>
        </section>

        <section className="bg-white p-12 border border-zinc-100 rounded-[4rem] text-center shadow-sm">
           <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 italic tracking-tighter leading-tight mb-8 max-w-4xl mx-auto">
              “You don’t design for everyone — you design for someone.”
           </p>
           <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl mx-auto italic text-zinc-600 text-zinc-600">
              Yesterday we captured raw feedback. Today we turn that data into structured, usable insights.
           </p>
        </section>

        <section className="p-10 bg-purple-50 border border-purple-100 rounded-[3.5rem] space-y-10">
           <h3 className="text-2xl font-black text-purple-950 px-4 text-purple-950 text-purple-950">Learning Objectives</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-purple-900 text-purple-900">
              {[
                'Build realistic user personas based on real data',
                'Write JTBD statements that reflect true motivations',
                'Use personas to guide feature & UX decisions',
                'Apply AI tools to accelerate synthesis'
              ].map(item => (
                <div key={item} className="p-6 bg-white rounded-3xl border border-purple-200 flex items-center gap-4 text-lg font-bold text-purple-900 italic shadow-sm">
                   <CheckCircle className="w-6 h-6 text-purple-600 shrink-0 text-purple-600 text-purple-600" /> {item}
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-12">
           <h3 className="text-3xl font-black text-zinc-950 px-4 text-center text-zinc-900 text-zinc-900">1. From Research → Insights → Personas</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-zinc-900 text-zinc-900">
              {[
                { n: 'Step 1', t: 'Clustering', d: 'Group similar behaviors and motivations from Day-8 transcripts.' },
                { n: 'Step 2', t: 'Identification', d: 'Find recurring pain points and primary goals across clusters.' },
                { n: 'Step 3', t: 'Narrative', d: 'Write a short, human-centric story for each segment.' }
              ].map(step => (
                <div key={step.n} className="p-10 bg-zinc-50 border border-zinc-100 rounded-[3rem] space-y-6 hover:bg-zinc-900 hover:text-white transition-all group text-center text-center">
                   <span className="text-xs font-black uppercase tracking-widest text-purple-500 transition-colors text-purple-500 text-purple-500">{step.n}</span>
                   <h5 className="text-2xl font-black tracking-tight">{step.t}</h5>
                   <p className="text-sm font-bold text-zinc-500 group-hover:text-zinc-400 italic leading-relaxed font-medium">{step.d}</p>
                </div>
              ))}
           </div>
           
           <div className="overflow-hidden rounded-[3rem] border-4 border-zinc-100 bg-white shadow-2xl mt-12">
              <table className="w-full text-left text-zinc-900 text-zinc-900">
                <thead className="bg-zinc-950 text-white font-black text-xs uppercase tracking-[0.2em] text-white">
                  <tr>
                    <th className="p-8">User Quote</th>
                    <th className="p-8">Persona Name</th>
                    <th className="p-8">Core Insight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-bold text-sm text-zinc-900">
                  {[
                    { q: '“I start strong but can’t stay consistent.”', p: 'Motivated Starter', c: 'Needs daily accountability loops' },
                    { q: '“I want data to track my progress.”', p: 'Data-Driven Achiever', c: 'Needs progress visualizations' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-50 transition-colors">
                       <td className="p-8 text-zinc-900 italic font-black leading-snug">“{row.q}”</td>
                       <td className="p-8 text-purple-600 font-black uppercase tracking-widest text-[10px] text-purple-600 text-purple-600">{row.p}</td>
                       <td className="p-8 text-zinc-500 italic font-medium leading-relaxed text-zinc-500">{row.c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
           <div className="p-10 bg-indigo-50 rounded-[3rem] border border-indigo-200 text-center text-center">
              <p className="text-2xl font-black text-indigo-950 italic leading-tight text-indigo-950 text-indigo-950 text-center">🧠 Best Practice: 2–3 meaningful personas are better than 8–10 generic ones.</p>
           </div>
        </section>

        <section className="p-12 bg-zinc-950 rounded-[4rem] text-white space-y-12 shadow-2xl relative overflow-hidden text-center text-white text-white text-white">
           <h3 className="text-3xl font-black mb-10 text-indigo-400 tracking-tight border-b border-white/5 pb-8 text-center text-white text-white text-white text-indigo-400">2. Persona Template: Rahul</h3>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white text-white">
              <div className="space-y-8 text-center lg:text-left text-white text-white text-white">
                 <div className="flex flex-col lg:flex-row items-center gap-8 text-white text-white text-white text-white">
                    <div className="w-32 h-32 bg-white/10 rounded-full border-4 border-white/10 shadow-2xl flex items-center justify-center text-6xl text-white">👨‍💻</div>
                    <div className="text-white text-white">
                       <h4 className="text-4xl font-black tracking-tighter text-white text-white text-white text-white">Rahul Sharma, 27</h4>
                       <p className="text-indigo-300 font-black uppercase tracking-widest text-[10px] text-indigo-300 text-white">Software Engineer</p>
                    </div>
                 </div>
                 <p className="text-3xl font-black italic text-zinc-200 leading-tight text-white text-zinc-200 text-white">“I need a coach who reminds me daily.”</p>
              </div>
              
              <div className="grid grid-cols-1 gap-6 text-white text-white">
                 <div className="p-8 bg-white/5 rounded-3xl border border-white/10 text-white text-white">
                    <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest mb-2 text-white text-emerald-400 text-white">Goals</p>
                    <p className="text-lg font-bold text-zinc-300 italic leading-snug font-medium text-zinc-300">Build a long-term habit and see measurable physical results.</p>
                 </div>
                 <div className="p-8 bg-white/5 rounded-3xl border border-white/10 text-white text-white">
                    <p className="text-[10px] font-black uppercase text-rose-400 tracking-widest mb-2 text-white text-rose-400 text-white">Frustrations</p>
                    <p className="text-lg font-bold text-zinc-300 italic leading-snug font-medium text-zinc-300">Lack of personalized accountability; tools don't adapt to his schedule.</p>
                 </div>
              </div>
           </div>
           <div className="text-center pt-8 border-t border-white/5 text-center text-center">
              <p className="text-2xl font-black italic text-indigo-400 text-indigo-400 text-indigo-400">📌 Tip: Add emotion — Personas should feel human, not just data points.</p>
           </div>
        </section>

        <section className="space-y-12 text-center text-zinc-900 text-zinc-900">
           <h3 className="text-3xl font-black text-zinc-950 px-4 text-center text-center">3. Jobs To Be Done (JTBD) Framework</h3>
           <p className="text-2xl font-black text-zinc-950 italic leading-snug border-l-4 border-purple-600 pl-8 mb-12 max-w-4xl mx-auto text-center text-zinc-950 text-zinc-950 text-zinc-950">
              Users don’t buy products. They hire them to get a job done.
           </p>
           
           <div className="p-12 bg-white border-2 border-zinc-100 rounded-[4rem] shadow-xl text-center space-y-10 text-center text-center text-center">
              <h4 className="text-lg font-black uppercase tracking-[0.3em] text-zinc-400 text-center text-zinc-400 text-center">The Template</h4>
              <p className="text-3xl md:text-5xl font-black tracking-tight leading-tight italic text-zinc-900 text-center text-center">
                 When I <span className="text-purple-600 text-purple-600 text-purple-600">situation</span>, I want to <span className="text-purple-600 text-purple-600 text-purple-600">motivation</span>, So I can <span className="text-purple-600 text-purple-600 text-purple-600">desired outcome</span>.
              </p>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-12 bg-white border-2 border-purple-200 rounded-[3rem] shadow-xl relative overflow-hidden text-center text-center">
           <h5 className="text-xl font-black mb-10 uppercase tracking-[0.2em] text-purple-600 text-center text-purple-600 text-purple-600 text-center">🎯 Day-9: Persona & JTBD Deck</h5>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 text-center text-zinc-900 text-zinc-900 text-center">
              {[
                { id: '1', t: '2 Personas', d: 'Name, Bio, Goals, Pains, Behavior, Quote.' },
                { id: '2', t: 'JTBD Statements', d: '1 clear statement per persona.' },
                { id: '3', t: '1 Feature Suggestion', d: 'Clearly aligned to the "Job".' }
              ].map(item => (
                <div key={item.id} className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 flex flex-col gap-6 hover:shadow-lg transition-all relative group overflow-hidden text-center text-center text-center text-center">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-50 transition-colors text-center text-zinc-50 text-center text-center"></div>
                   <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-purple-600 shadow-sm border border-zinc-100 relative z-10 mx-auto text-center text-purple-600 text-purple-600 text-center">{item.id}</span>
                   <h6 className="text-2xl font-black text-zinc-950 tracking-tight leading-none relative z-10 text-center text-zinc-950 text-center text-center">{item.t}</h6>
                   <p className="text-lg font-black text-zinc-900 italic leading-snug relative z-10 font-medium text-center text-zinc-900 text-center text-center">{item.d}</p>
                </div>
              ))}
           </div>
           
           <div className="p-10 bg-zinc-950 rounded-[3rem] text-white space-y-12 shadow-2xl text-center text-white text-white">
              <div className="text-white text-white">
                <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-4 text-white text-indigo-400 text-white">Submission Details</p>
                <p className="text-xl font-black text-zinc-300 italic mb-2 text-white text-zinc-300 text-white text-center">Format: Canva / Slides / Notion</p>
                <p className="text-xl font-black text-zinc-300 italic text-white text-zinc-300 text-white text-center">Deadline: End of Day 11</p>
              </div>
              <div className="flex items-center justify-center pt-8 border-t border-white/5 text-center text-center text-center text-center text-center text-center text-center">
                <p className="text-2xl font-black italic text-indigo-400 leading-tight text-indigo-400 text-indigo-400 text-center">“ 👉 Tip: Use Canva’s Persona Templates to make your deck professional!”</p>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 10,
    title: 'Competitive & Market Analysis',
    category: 'Strategy',
    preview: '“You can’t build a better product until you understand what already exists.” Master SWOT and feature benchmarking.',
    content: (
      <div className="space-y-12">
        <header className="bg-zinc-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white text-white">
           <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl text-white text-white"></div>
           <div className="flex gap-4 mb-6">
              <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg text-white">Strategy</span>
              <span className="px-4 py-1.5 bg-white/10 text-zinc-300 text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/10 text-white text-white text-white text-white text-white">15m read</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white text-white text-white text-white text-white">Competitive & Market Analysis 🧭</h1>
           <p className="text-zinc-400 text-xl font-bold italic leading-relaxed text-zinc-400 text-zinc-400 text-white">“You can’t build a better product until you understand what already exists.” Master SWOT and feature benchmarking.</p>
        </header>

        {/* Day 10 Must Watch with thumbnail at the top */}
        <section className="p-10 bg-zinc-950 rounded-[3rem] text-white space-y-8 relative overflow-hidden shadow-2xl text-white text-white text-white text-white text-white text-white">
           <h6 className="text-lg font-black uppercase tracking-widest text-indigo-400 text-center text-white text-indigo-400 text-white text-white">Must Watch Video</h6>
           <div className="max-w-2xl mx-auto text-white text-white text-white text-white">
              <a href="https://youtu.be/UnBL8h8TVX8?si=v7_4Kx9EDy357xjg" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
                 <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-800 border border-white/10 shadow-2xl">
                    <img src="https://img.youtube.com/vi/UnBL8h8TVX8/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" alt="Competitive Analysis" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                       <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 fill-current text-white" />
                       </div>
                    </div>
                 </div>
                 <p className="text-xl font-black text-center group-hover:text-indigo-400 transition-colors text-white text-white text-white">Competitive Analysis for Product Managers</p>
              </a>
           </div>
        </section>

        <section className="bg-white p-12 border border-zinc-100 rounded-[4rem] text-center shadow-xl">
           <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600 italic tracking-tighter leading-tight mb-8 max-w-4xl mx-auto">
              “You can’t build a better product until you understand what already exists.”
           </p>
           <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-3xl mx-auto italic text-center text-zinc-600 text-zinc-600 text-center text-center">
              Today’s goal is to position your idea intelligently. Learn to identify market gaps — not by copying, but by identifying where competitors fall short.
           </p>
        </section>

        <section className="p-10 bg-indigo-50 border border-indigo-100 rounded-[4rem] space-y-10 shadow-sm text-center">
           <h3 className="text-2xl font-black text-indigo-950 px-4 text-center text-indigo-950 text-indigo-950 text-indigo-950 text-center text-center">Learning Objectives</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center text-indigo-900 text-indigo-900 text-indigo-900 text-center text-center text-center">
              {[
                'Conduct structured competitive benchmarking',
                'Perform SWOT analysis for 2–3 competitors',
                'Identify feature gaps and differentiators',
                'Define your product\'s unique positioning statement'
              ].map(item => (
                <div key={item} className="p-6 bg-white rounded-[2.5rem] border border-indigo-200 flex items-center gap-4 text-lg font-bold text-indigo-900 italic shadow-sm text-center text-center">
                   <CheckCircle className="w-6 h-6 text-indigo-600 shrink-0 text-indigo-600 text-indigo-600 text-indigo-600 text-center" /> {item}
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-12 text-center text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center">
           <h3 className="text-3xl font-black text-zinc-950 px-4 text-center text-zinc-950 text-zinc-950 text-zinc-950 text-center text-center text-center text-center text-center">1. Mapping the Landscape</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center text-center text-center text-center">
              {[
                { title: 'Direct Competitors', desc: 'Same product, same target audience.', ex: 'Example: Habitica vs Streaks' },
                { title: 'Indirect Competitors', desc: 'Solve the same need differently.', ex: 'Example: Google Tasks vs Notion' },
                { title: 'Aspirational', desc: 'Inspire UX or growth strategies.', ex: 'Example: Headspace for UI vibes' }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] space-y-6 hover:shadow-xl hover:border-indigo-100 transition-all group text-center text-center text-center text-center text-center text-center text-center">
                   <h5 className="text-2xl font-black text-zinc-950 leading-tight text-center text-center text-center text-center text-center text-center text-center text-center text-center">{item.title}</h5>
                   <p className="text-sm font-bold text-zinc-500 leading-relaxed italic font-medium text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">{item.desc}</p>
                   <div className="pt-6 border-t border-zinc-50 text-indigo-600 font-black text-[10px] group-hover:text-indigo-400 transition-colors uppercase tracking-widest text-center text-indigo-600 text-indigo-600 text-indigo-600 text-center text-center text-center text-center text-center">{item.ex}</div>
                </div>
              ))}
           </div>
           <div className="p-10 bg-zinc-50 border-4 border-dashed border-zinc-200 rounded-[4rem] text-center group text-center text-center text-center text-center text-center text-center text-center text-center text-center">
              <p className="text-2xl font-black text-zinc-900 italic transition-transform group-hover:scale-105 text-center text-center text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center text-center text-center text-center text-center text-center">🧩 AI Hack: Ask Perplexity AI "List top 10 apps competing with [idea], include audience and unique features."</p>
           </div>
        </section>

        <section className="space-y-12 text-center text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center text-center text-center text-center">
           <h3 className="text-3xl font-black text-zinc-950 px-4 text-center text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-center text-center text-center text-center text-center text-center text-center">2. Framework 1: SWOT Analysis</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center text-center text-center text-center text-center text-center text-center text-center">
              {[
                { title: 'Strengths', desc: 'What do they do well?', ex: 'Example: "Beautiful UI, gamified loop"', color: 'bg-emerald-50 border-emerald-100 text-emerald-950' },
                { title: 'Weaknesses', desc: 'Where do they fall short?', ex: 'Example: "Limited AI personalization"', color: 'bg-rose-50 border-rose-100 text-rose-950' },
                { title: 'Opportunities', desc: 'What can we do better?', ex: 'Example: "Add AI coach habit nudges"', color: 'bg-blue-50 border-blue-100 text-blue-950' },
                { title: 'Threats', desc: 'What could hurt us?', ex: 'Example: "Big tech (Apple) entry"', color: 'bg-amber-50 border-amber-100 text-amber-950' }
              ].map(item => (
                <div key={item.title} className={`p-12 rounded-[4rem] border space-y-6 ${item.color} shadow-sm text-center text-center text-center text-center text-center text-center text-center text-center text-center`}>
                   <h5 className="text-3xl font-black tracking-tight text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">{item.title}</h5>
                   <p className="text-xl font-bold italic font-medium text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">{item.desc}</p>
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-60 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">{item.ex}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-10 text-center text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center text-center text-center text-center text-center text-center">
           <h3 className="text-3xl font-black text-zinc-950 px-4 text-center text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-center text-center text-center text-center text-center text-center text-center text-center text-center">3. Framework 2: Feature Comparison Matrix</h3>
           <div className="overflow-hidden rounded-[4rem] border-4 border-zinc-100 bg-white shadow-2xl text-center text-center text-center text-center text-center text-center text-center text-center text-center">
              <table className="w-full text-left text-center text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center text-center text-center text-center">
                <thead className="bg-zinc-950 text-white font-black text-xs uppercase tracking-[0.2em] text-white text-center text-center text-center text-center text-center">
                  <tr>
                    <th className="p-8">Feature</th>
                    <th className="p-8">Us</th>
                    <th className="p-8">Comp A</th>
                    <th className="p-8">Comp B</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-bold text-lg text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
                  {[
                    { f: 'Personalized Dashboard', u: '✅', a: '❌', b: '✅' },
                    { f: 'AI Habit Coach', u: '✅', a: '❌', b: '❌' },
                    { f: 'Gamified Streaks', u: '✅', a: '✅', b: '✅' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-50 transition-colors text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
                       <td className="p-8 text-zinc-900 italic font-black text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">{row.f}</td>
                       <td className="p-8 text-2xl text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">{row.u}</td>
                       <td className="p-8 text-2xl text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">{row.a}</td>
                       <td className="p-8 text-2xl text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
           <div className="p-10 bg-indigo-50 rounded-[3rem] border border-indigo-200 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
              <p className="text-2xl font-black text-indigo-950 italic leading-tight text-indigo-950 text-indigo-950 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">🧠 Insight: Discover what is "table-stakes" vs "differentiating".</p>
           </div>
        </section>

        <section className="p-12 bg-zinc-950 rounded-[4rem] text-white space-y-12 shadow-2xl relative overflow-hidden text-center text-white text-white text-white text-center text-center text-center text-center text-center text-center text-center text-center">
           <h3 className="text-3xl font-black mb-12 text-indigo-400 tracking-tight text-center text-white text-indigo-400 text-white text-white text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">AI Prompts for Strategy</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center text-white text-white text-white text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
              <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-4 text-white text-white text-white text-white text-white text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
                 <p className="text-xl font-black italic text-white leading-relaxed text-white text-white text-white text-white text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">"Create a SWOT analysis for Fitbit and identify two strategic gaps a new product could exploit."</p>
              </div>
              <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-4 text-white text-white text-white text-white text-white text-white text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
                 <p className="text-xl font-black italic text-white leading-relaxed text-white text-white text-white text-white text-white text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">"Summarize the top 5 AI habit tracking apps in 2025, their core features, and pricing."</p>
              </div>
           </div>
        </section>

        <section className="p-12 bg-white border-4 border-zinc-100 rounded-[4rem] shadow-xl relative overflow-hidden text-center text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center text-center text-center text-center text-center text-center text-center">
           <h3 className="text-4xl font-black text-zinc-950 mb-12 tracking-tighter text-zinc-950 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">Zerodha vs Groww</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-center text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
              <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 space-y-4 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
                 <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest text-center text-indigo-600 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">Zerodha Strength</p>
                 <p className="text-2xl font-black text-zinc-900 leading-tight text-center text-zinc-900 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">Advanced tools for Traders.</p>
              </div>
              <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 space-y-4 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
                 <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest text-center text-emerald-600 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">Groww Strength</p>
                 <p className="text-2xl font-black text-zinc-900 leading-tight text-center text-zinc-900 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">UI simplicity for First-timers.</p>
              </div>
           </div>
           <div className="mt-12 p-12 bg-indigo-950 rounded-[3rem] text-white text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
              <p className="text-3xl font-black italic tracking-tighter leading-tight text-white text-white text-white text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">“Design simplicity was the differentiator Groww used to disrupt a market of 'complex dashboards.'”</p>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-12 bg-white border-2 border-indigo-200 rounded-[3rem] shadow-xl relative overflow-hidden">
           <h5 className="text-xl font-black mb-10 uppercase tracking-[0.2em] text-indigo-600 text-center text-indigo-600 text-center text-center text-center text-center text-center text-center text-center text-center">🎯 Day-10: Competitive Report</h5>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 text-center text-zinc-900 text-zinc-900 text-center text-center text-center text-center text-center text-center">
              {[
                { id: '1', t: '2 SWOT Analyses', d: 'Competitor A & B.' },
                { id: '2', t: 'Feature Matrix', d: 'Us vs others.' },
                { id: '3', t: 'Positioning Statement', d: '“Unlike X and Y, our product [does what] for [whom].”' }
              ].map(item => (
                <div key={item.id} className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 flex flex-col gap-6 hover:shadow-lg transition-all relative group text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
                   <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-indigo-600 shadow-sm border border-zinc-100 mx-auto text-center text-indigo-600 text-indigo-600 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">{item.id}</span>
                   <h6 className="text-2xl font-black text-zinc-950 tracking-tight leading-none text-center text-zinc-950 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">{item.t}</h6>
                   <p className="text-lg font-black text-zinc-900 italic leading-snug font-medium text-center text-zinc-900 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    )
  },
  {
    day: 11,
    title: 'Opportunity Sizing (TAM / SAM / SOM)',
    category: 'Strategy',
    preview: '“A great product solves a real problem — but a great business solves it for a market that’s big enough.”',
    content: (
      <div className="space-y-12">
        <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white text-white text-white">
           <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl text-white text-white text-white"></div>
           <div className="flex gap-4 mb-6">
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white text-white text-white text-white text-white">Strategy</span>
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white">45m read</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white text-white text-white text-white text-white text-white text-white text-white text-white">Day 11 — Opportunity Sizing (TAM / SAM / SOM)</h1>
           <p className="text-indigo-100 text-xl font-bold italic text-white text-white text-white text-white text-white text-white text-white">Learn to estimate market potential using data, frameworks, and AI tools.</p>
        </header>

        {/* Day 11 Must Watch with thumbnail at the top */}
        <section className="p-10 bg-zinc-950 rounded-[3rem] text-white space-y-8 relative overflow-hidden shadow-2xl text-white text-white text-white text-white text-white text-white">
           <h6 className="text-lg font-black uppercase tracking-widest text-indigo-400 text-center text-indigo-400 text-white text-white text-white text-white text-white">Must Watch Video</h6>
           <div className="max-w-2xl mx-auto text-white text-white text-white text-white text-white text-white text-white">
              <a href="https://youtu.be/nCYOMU7rKCs?si=cvu8yrnAbxDueKEI" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
                 <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-800 border border-white/10 shadow-2xl">
                    <img src="https://img.youtube.com/vi/nCYOMU7rKCs/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" alt="TAM SAM SOM Explained" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                       <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 fill-current text-white" />
                       </div>
                    </div>
                 </div>
                 <p className="text-xl font-black text-center group-hover:text-indigo-400 transition-colors text-white text-white text-white text-white text-white text-white">TAM, SAM, SOM Explained</p>
              </a>
           </div>
        </section>

        <section className="bg-white border-2 border-zinc-100 p-10 rounded-[3rem] shadow-sm">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900">
              <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600">Topic</p>
                 <p className="text-lg font-black text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950">Opportunity Sizing (TAM, SAM, SOM)</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600">Key Outcomes</p>
                 <p className="text-xs font-bold text-zinc-500 leading-relaxed italic font-medium text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500">Learn to estimate market potential using data, frameworks, and AI tools.</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600">Tools / Resources</p>
                 <p className="text-xs font-black text-zinc-950 italic text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950">Statista / Google Trends / ChatGPT / Excel</p>
              </div>
           </div>
        </section>

        <section className="p-12 bg-indigo-50 border-4 border-indigo-100 rounded-[4rem] text-center shadow-sm text-center text-center text-center text-center text-center">
           <h3 className="text-3xl font-black text-indigo-950 mb-8 tracking-tight text-center text-indigo-950 text-indigo-950 text-indigo-950 text-indigo-950 text-indigo-950 text-indigo-950 text-indigo-950">Theme</h3>
           <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-900 italic tracking-tighter leading-tight mb-8 max-w-4xl mx-auto text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
              “A great product solves a real problem — but a great business solves it for a market that’s big enough.”
           </p>
        </section>

        <section className="space-y-12 text-center text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center">
           <div className="p-12 bg-white border-2 border-zinc-100 rounded-[4rem] shadow-sm text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
              <h3 className="text-3xl font-black mb-10 tracking-tight text-zinc-950 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">Learning Objectives</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
                 {[
                   '1. Define TAM, SAM, and SOM clearly and apply them.',
                   '2. Use top-down and bottom-up approaches for sizing.',
                   '3. Leverage AI + data tools for market estimates.',
                   '4. Create a clear Market Opportunity Slide.'
                 ].map(item => (
                   <div key={item} className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 text-lg font-black text-zinc-900 italic leading-snug text-center text-center text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-center">{item}</div>
                 ))}
              </div>
           </div>
        </section>

        <section className="space-y-12 text-center text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center">
           <h3 className="text-3xl font-black text-zinc-950 px-4 text-center text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-center text-center">1. Key Concepts</h3>
           <div className="overflow-hidden rounded-[4rem] border-4 border-zinc-100 bg-white shadow-2xl text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
              <table className="w-full text-left text-center text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center">
                <thead className="bg-zinc-950 text-white font-black text-xs uppercase tracking-[0.2em] text-white text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
                  <tr>
                    <th className="p-8">Term</th>
                    <th className="p-8">Meaning</th>
                    <th className="p-8">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-bold text-sm text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
                  {[
                    { t: 'TAM (Total Addressable Market)', m: 'Total global demand for your product', e: '“Global fitness app market = $7B”' },
                    { t: 'SAM (Serviceable Available Market)', m: 'Portion you can serve based on geography', e: '“India’s fitness app market = $1.2B”' },
                    { t: 'SOM (Serviceable Obtainable Market)', m: 'Realistic share capture in 2–3 years', e: '“Target 1% of SAM → $12M”' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-50 transition-colors text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">
                       <td className="p-8 text-indigo-600 font-black text-lg text-center text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-indigo-600 text-center text-center">{row.t}</td>
                       <td className="p-8 text-zinc-900 italic font-medium leading-relaxed text-center text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center">{row.m}</td>
                       <td className="p-8 text-zinc-400 italic font-black uppercase tracking-widest text-[10px] text-center text-zinc-400 text-zinc-400 text-zinc-400 text-zinc-400 text-zinc-400 text-zinc-400 text-zinc-400 text-zinc-400 text-zinc-400 text-zinc-400 text-zinc-400 text-zinc-400 text-zinc-400 text-center text-center">{row.e}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </section>

        <section className="space-y-12 text-center text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center">
           <h3 className="text-3xl font-black text-zinc-950 px-4 text-center text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-zinc-950 text-center text-center">approaches for sizing</h3>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center">
              {[
                { title: 'A. Top-Down', desc: 'Use industry reports to derive size. Statista, McKinsey, etc.', ex: 'Example: 10% of India EdTech' },
                { title: 'B. Bottom-Up', desc: 'Start from user base × Price × Frequency.', ex: 'Example: 1M users × ₹300' },
                { title: 'C. Value-Based', desc: 'Estimate based on value created or replaced.', ex: 'Example: 10% of time saved' }
              ].map((app, i) => (
                <div key={i} className={`p-10 rounded-[3rem] border border-zinc-100 flex flex-col justify-between space-y-6 bg-white transition-all hover:scale-105 shadow-sm text-center text-center text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-center text-center`}>
                   <h5 className="text-2xl font-black leading-tight tracking-tight text-zinc-900 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">{app.title}</h5>
                   <p className="text-sm font-bold text-zinc-500 italic leading-relaxed font-medium text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">{app.desc}</p>
                   <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest border-t border-zinc-50 pt-6 text-center text-indigo-500 text-indigo-500 text-indigo-500 text-indigo-500 text-indigo-500 text-indigo-500 text-indigo-500 text-indigo-500 text-indigo-500 text-indigo-500 text-indigo-500 text-indigo-500 text-indigo-500 text-indigo-500 text-center text-center">{app.ex}</p>
                </div>
              ))}
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-12 bg-white border-2 border-indigo-200 rounded-[3rem] shadow-xl relative overflow-hidden text-center text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900 text-zinc-900">
           <h5 className="text-xl font-black mb-10 uppercase tracking-[0.2em] text-indigo-600 text-center text-indigo-600 text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center text-center">🎯 Day-11 Comprehensive Assignment</h5>
           <div className="p-10 bg-zinc-950 rounded-[3rem] text-white space-y-8 shadow-2xl relative overflow-hidden text-center text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white">
              <h6 className="text-2xl font-black text-indigo-400 border-b border-white/10 pb-4 text-white text-white text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400 text-indigo-400">Assignment Deliverable</h6>
              <p className="text-xl font-black text-zinc-300 italic mb-6 leading-tight text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-white text-zinc-300">Market Sizing Deck (1–2 slides). Must include:</p>
              <div className="space-y-4 font-bold text-zinc-500 italic text-sm text-white text-white text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500 text-zinc-500">
                 <p>● 1 Funnel diagram (TAM → SAM → SOM)</p>
                 <p>● Data source references</p>
                 <p>● Key assumptions</p>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 12,
    title: 'Introduction to SQL for PMs',
    category: 'Data',
    preview: '"Data is the voice of your users. SQL lets you listen." Master basic querying and environment setup.',
    content: (
      <div className="space-y-12">
        <header className="bg-emerald-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
           <div className="flex gap-4 mb-6">
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">Data</span>
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">30m read</span>
           </div>
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Introduction to SQL for PMs (SELECT, WHERE, Basics)</h1>
           <p className="text-emerald-100 text-lg font-bold italic">"Data is the voice of your users. SQL lets you listen."</p>
        </header>

        <section className="bg-white border border-zinc-100 p-8 rounded-3xl">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><Target className="text-emerald-600"/> Learning Objectives</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Understand what SQL is and why PMs need it",
              "Set up a practice SQL environment",
              "Write basic SELECT queries to retrieve data",
              "Filter data using WHERE clauses",
              "Execute DDL and DML commands"
            ].map((obj, i) => (
              <li key={i} className="flex gap-3 text-zinc-700 font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> {obj}
              </li>
            ))}
          </ul>
        </section>

        <section className="p-8 bg-zinc-50 rounded-3xl border border-zinc-200">
          <h3 className="text-2xl font-black mb-4">1. What is SQL and Why PMs Need It</h3>
          <p className="text-zinc-700 leading-relaxed mb-6 font-medium">
            SQL (Structured Query Language) is the language for communicating with databases. Think of it as asking questions to a spreadsheet on steroids.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                <h4 className="font-bold text-emerald-700 mb-2 uppercase tracking-widest text-xs">Without SQL</h4>
                <p className="text-sm text-zinc-500 italic">You wait for analysts, ask vague questions, get delayed answers.</p>
             </div>
             <div className="bg-emerald-900 p-6 rounded-2xl text-white">
                <h4 className="font-bold text-emerald-400 mb-2 uppercase tracking-widest text-xs">With SQL</h4>
                <p className="text-sm">Validate hypotheses in real-time and make data-driven decisions independently.</p>
             </div>
          </div>
        </section>

        <section className="p-8 bg-zinc-950 rounded-[3rem] text-white">
          <h3 className="text-2xl font-black mb-8 text-emerald-400">Must Watch: SQL Beginners</h3>
          <div className="max-w-xl mx-auto mb-10">
            <a href="https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                <img src="https://img.youtube.com/vi/SSKVgrwhzus/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="SQL Intro"/>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/0 transition-all">
                  <PlayCircle className="w-16 h-16 text-emerald-400 fill-zinc-950"/>
                </div>
              </div>
              <p className="text-center font-bold group-hover:text-emerald-400">SQL Beginner Course - Cover these topics</p>
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[{t:"00:00", l:"Intro"}, {t:"07:38", l:"Intro to SQL"}, {t:"22:33", l:"Setup Env"}, {t:"34:01", l:"Query (SELECT)"}, {t:"01:32:31", l:"DDL Commands"}, {t:"01:43:44", l:"DML Commands"}].map(idx => (
              <div key={idx.t} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                <span className="text-emerald-400 font-mono text-xs">{idx.t}</span>
                <span className="text-xs font-bold">{idx.l}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  },
  {
    day: 13,
    title: 'Filtering Data & SQL Joins',
    category: 'Data',
    preview: '"Joining tables is where SQL becomes powerful for PMs." Master advanced filtering and table relationships.',
    content: (
      <div className="space-y-12">
        <header className="bg-emerald-700 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Day 13 — Filtering Data & SQL Joins</h1>
           <p className="text-emerald-100 text-lg font-bold italic leading-relaxed">"Joining tables is where SQL becomes powerful for PMs."</p>
        </header>

        <section className="bg-white border border-zinc-100 p-8 rounded-3xl">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><Target className="text-emerald-600"/> Learning Objectives</h2>
          <div className="space-y-4">
            {["Use advanced WHERE filters (LIKE, IN, BETWEEN)", "Understand the concept of database relationships", "Perform INNER, LEFT, RIGHT, and FULL JOINS", "Combine data from multiple tables to answer complex PM questions"].map((obj, i) => (
              <div key={i} className="flex gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shrink-0">{i+1}</div>
                <p className="font-bold text-zinc-700">{obj}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 bg-zinc-950 rounded-[3rem] text-white">
          <h3 className="text-2xl font-black mb-8 text-emerald-400">Intermediate SQL Masterclass</h3>
          <div className="max-w-xl mx-auto mb-10">
            <a href="https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-emerald-500/10">
                <img src="https://img.youtube.com/vi/SSKVgrwhzus/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="SQL Joins"/>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/0 transition-all">
                  <PlayCircle className="w-16 h-16 text-emerald-400 fill-zinc-950"/>
                </div>
              </div>
              <p className="text-center font-bold text-emerald-300">Intermediate Level Lessons</p>
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            {[{t:"02:08:03", l:"Filtering Data"}, {t:"02:47:57", l:"SQL Joins (Basics)"}, {t:"03:27:29", l:"SQL Joins (Advanced)"}].map(idx => (
              <div key={idx.t} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center px-8">
                <span className="text-emerald-400 font-black tracking-widest">{idx.t}</span>
                <span className="font-black italic uppercase tracking-tighter text-zinc-400">{idx.l}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  },
  {
    day: 14,
    title: 'SQL Set Operators & Functions',
    category: 'Data',
    preview: '"Master SQL functions to transform raw data into actionable insights." Learn UNION, INTERSECT, and data manipulation.',
    content: (
      <div className="space-y-12">
        <header className="bg-emerald-800 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Day 14 — SQL Set Operators & Functions</h1>
           <p className="text-emerald-200 text-lg font-bold italic leading-relaxed">"Master SQL functions to transform raw data into actionable insights."</p>
        </header>

        <section className="bg-white border-2 border-emerald-100 p-8 rounded-3xl shadow-sm">
           <h2 className="text-2xl font-black mb-6 text-zinc-900">Learning Objectives</h2>
           <ul className="space-y-3">
             {["Combine query results using UNION, INTERSECT, and EXCEPT", "Apply string functions to clean and format text data", "Use numeric functions for calculations and rounding", "Solve complex data transformation problems"].map((item, i) => (
               <li key={i} className="flex items-center gap-3 font-medium text-zinc-600">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> {item}
               </li>
             ))}
           </ul>
        </section>

        <section className="p-8 bg-zinc-950 rounded-[3rem] text-white">
          <h3 className="text-2xl font-black mb-8 text-emerald-400">Deep Dive Video</h3>
          <div className="max-w-xl mx-auto mb-10">
            <a href="https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                <img src="https://img.youtube.com/vi/SSKVgrwhzus/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="SQL Functions"/>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-current text-white"/>
                  </div>
                </div>
              </div>
              <p className="text-center font-black uppercase tracking-widest text-xs text-zinc-400">SQL Functions & Sets Section</p>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{t:"04:02:09", l:"Set Operators"}, {t:"04:47:41", l:"SQL Functions"}, {t:"04:52:58", l:"String Functions"}, {t:"05:18:44", l:"Numeric Functions"}].map(idx => (
              <div key={idx.t} className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-emerald-400 font-mono text-sm mb-1">{idx.t}</p>
                <p className="text-sm font-black">{idx.l}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  },
  {
    day: 15,
    title: 'SQL Date Functions & Advanced Logic',
    category: 'Data',
    preview: '"Transform messy data into clean insights with SQL’s most powerful functions." Learn time calculations and CASE logic.',
    content: (
      <div className="space-y-12">
        <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Day 15 — SQL Date Functions, NULL Handling & Advanced Logic</h1>
           <p className="text-indigo-100 text-lg font-bold italic leading-relaxed italic">"Transform messy data into clean insights with SQL’s most powerful functions."</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <section className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm h-full">
              <h3 className="text-2xl font-black mb-6 text-zinc-900">Learning Objectives</h3>
              <ul className="space-y-4">
                {[
                  "Perform sophisticated date and time calculations",
                  "Handle NULL values correctly in queries",
                  "Build complex conditional logic with CASE statements",
                  "Use aggregate functions for data summarization",
                  "Solve real-world PM analytics problems"
                ].map((obj, i) => (
                  <li key={i} className="flex gap-4 font-bold text-zinc-600 leading-relaxed">
                    <span className="text-indigo-600 font-black">0{i+1}.</span> {obj}
                  </li>
                ))}
              </ul>
           </section>
           
           <section className="bg-zinc-950 p-8 rounded-3xl text-white h-full">
              <h3 className="text-xl font-black mb-6 text-indigo-400">Timestamps</h3>
              <div className="space-y-3">
                 {[{t:"05:22:48", l:"Date and Time Functions"}, {t:"06:59:06", l:"NULL Functions"}, {t:"08:07:50", l:"Case Statement"}, {t:"08:43:36", l:"Aggregate Functions"}].map(idx => (
                    <div key={idx.t} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                       <span className="font-mono text-indigo-300 text-xs">{idx.t}</span>
                       <span className="font-bold text-xs">{idx.l}</span>
                    </div>
                 ))}
              </div>
              <div className="mt-8">
                <a href="https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-indigo-600 rounded-2xl hover:bg-indigo-500 transition-all">
                  <PlayCircle className="w-8 h-8 text-white" />
                  <span className="font-black text-sm uppercase tracking-widest">Watch Final SQL Session</span>
                </a>
              </div>
           </section>
        </div>
      </div>
    )
  },
  {
    day: 16,
    title: 'Excel Fundamentals for PMs',
    category: 'Data',
    preview: '"Excel is the PM\'s Swiss Army knife — from quick analysis to complex models." Master ribbons, workbooks, and formulas.',
    content: (
      <div className="space-y-12">
        <header className="bg-emerald-500 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">Day 16 — Excel Fundamentals for PMs</h1>
           <p className="text-emerald-100 text-xl font-bold italic">"Excel is the PM's Swiss Army knife — from quick analysis to complex models."</p>
        </header>

        <section className="bg-white border-2 border-emerald-50 p-8 rounded-3xl">
           <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-emerald-900"><Target className="w-8 h-8"/> Learning Objectives</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Navigate Excel efficiently (workbooks, worksheets, ribbon)",
                "Write formulas and use essential functions",
                "Apply logical functions for conditional analysis",
                "Use lookup functions to merge data",
                "Perform basic statistical analysis",
                "Work with dates and text data"
              ].map(item => (
                <div key={item} className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center gap-4 text-emerald-900 font-black italic">
                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div> {item}
                </div>
              ))}
           </div>
        </section>

        <section className="p-10 bg-zinc-950 rounded-[4rem] text-white">
           <h3 className="text-3xl font-black mb-10 text-emerald-400">Master Class: Excel Fundamentals</h3>
           <div className="max-w-2xl mx-auto mb-12">
              <a href="https://youtu.be/pCJ15nGFgVg?si=aqGEbVfcwFuLi7fY" target="_blank" rel="noopener noreferrer" className="group block space-y-6">
                 <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <img src="https://img.youtube.com/vi/pCJ15nGFgVg/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" alt="Excel Masterclass"/>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                       <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_50px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform">
                          <Play className="w-10 h-10 fill-current"/>
                       </div>
                    </div>
                 </div>
                 <div className="text-center space-y-2">
                    <p className="text-2xl font-black tracking-tight">Excel Beginner to Pro Bootcamp</p>
                    <p className="text-zinc-500 font-bold italic">Watch carefully to master these specific PM modules</p>
                 </div>
              </a>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {t:"0:00:00", l:"Welcome"}, {t:"0:03:53", l:"What is Excel?"}, {t:"0:07:19", l:"About Course"},
                {t:"0:11:19", l:"Excel Setup"}, {t:"0:22:42", l:"Worksheets"}, {t:"0:39:15", l:"Workbooks"},
                {t:"0:52:06", l:"Ribbon"}, {t:"1:06:39", l:"Formulas Intro"}, {t:"1:18:08", l:"Functions Intro"},
                {t:"1:29:14", l:"Logical Functions"}, {t:"1:39:54", l:"Math Functions"}, {t:"2:21:28", l:"Lookup Functions"}
              ].map(item => (
                <div key={item.t} className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center gap-4">
                   <span className="text-emerald-400 font-mono text-xs">{item.t}</span>
                   <span className="text-sm font-bold opacity-80">{item.l}</span>
                </div>
              ))}
           </div>
        </section>
      </div>
    )
  },
  {
    day: 17,
    title: 'Excel Charts, Pivot Tables & Dashboards',
    category: 'Data',
    preview: '"A picture is worth a thousand rows of data." Build interactive dashboards and professional charts for stakeholders.',
    content: (
      <div className="space-y-12">
        <header className="bg-blue-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">Day 17 — Excel Charts, Pivot Tables & Dashboards</h1>
           <p className="text-blue-100 text-xl font-bold italic">"A picture is worth a thousand rows of data."</p>
        </header>

        <section className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200">
           <h3 className="text-2xl font-black mb-8 text-zinc-900 uppercase tracking-widest flex items-center gap-3">
              <Sparkles className="text-blue-500" /> Learning Objectives
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Create and customize professional charts",
                "Use sparklines for inline visualizations",
                "Format data as Excel Tables for better analysis",
                "Build interactive Pivot Tables",
                "Create a complete dashboard for stakeholders",
                "Present data insights effectively"
              ].map(obj => (
                <div key={obj} className="p-5 bg-white rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-4 text-zinc-700 font-bold">
                   <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" /> {obj}
                </div>
              ))}
           </div>
        </section>

        <section className="p-10 bg-zinc-950 rounded-[4rem] text-white">
           <h3 className="text-3xl font-black mb-10 text-blue-400">Excel Dashboard Tutorial</h3>
           <div className="max-w-2xl mx-auto mb-12">
              <a href="https://youtu.be/pCJ15nGFgVg?si=aqGEbVfcwFuLi7fY" target="_blank" rel="noopener noreferrer" className="group block space-y-6">
                 <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <img src="https://img.youtube.com/vi/pCJ15nGFgVg/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" alt="Excel Visualization"/>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                       <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-10 h-10 fill-current"/>
                       </div>
                    </div>
                 </div>
                 <p className="text-center font-black uppercase tracking-widest text-sm text-blue-400">Charts, Pivot Tables & Dashboard Construction</p>
              </a>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                 <h4 className="text-indigo-400 font-black text-xs uppercase tracking-widest">3️⃣ Charts & Visualization</h4>
                 {[{t:"3:01:33", l:"Charts Intro"}, {t:"3:22:05", l:"Charts Advanced"}, {t:"3:35:37", l:"Charts Statistics"}, {t:"3:47:59", l:"Sparklines"}].map(idx => (
                    <div key={idx.t} className="p-3 bg-white/5 rounded-xl border border-white/5 flex gap-4">
                       <span className="font-mono text-blue-300 text-xs">{idx.t}</span>
                       <span className="text-xs font-bold">{idx.l}</span>
                    </div>
                 ))}
              </div>
              <div className="space-y-4">
                 <h4 className="text-emerald-400 font-black text-xs uppercase tracking-widest">4️⃣ Tables & Dashboards</h4>
                 {[{t:"3:51:57", l:"Excel Tables"}, {t:"4:40:30", l:"Project: Salary Dashboard"}, {t:"5:33:46", l:"PivotTable Intro"}, {t:"6:09:33", l:"PivotCharts"}].map(idx => (
                    <div key={idx.t} className="p-3 bg-white/5 rounded-xl border border-white/5 flex gap-4">
                       <span className="font-mono text-emerald-300 text-xs">{idx.t}</span>
                       <span className="text-xs font-bold">{idx.l}</span>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      </div>
    )
  },
  {
    day: 18,
    title: 'Learn Power BI Mastery',
    category: 'Data',
    preview: 'Build a strong foundation in Power BI. Learn Power Query for cleaning, DAX for calculations, and storytelling through dashboards.',
    content: (
      <div className="space-y-12">
        <header className="bg-yellow-500 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">Day 18 — Learn Power BI</h1>
           <p className="text-yellow-100 text-xl font-bold italic leading-relaxed">Build strong foundation in data transformation and modeling.</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
              <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Today’s Goal</h3>
              <p className="text-lg text-zinc-600 leading-relaxed font-medium">Build a strong foundation in <strong>Power BI</strong> by understanding how raw data is transformed, modeled, calculated, and finally presented as interactive dashboards.</p>
              <div className="pt-6 border-t border-zinc-100">
                 <h4 className="text-sm font-black uppercase text-zinc-400 mb-4 tracking-widest">Learning Objectives</h4>
                 <ul className="space-y-3">
                    {[
                      "Clean and transform raw datasets using Power Query",
                      "Build proper data models and relationships",
                      "Write basic to intermediate DAX calculations",
                      "Create interactive, insight-driven dashboards",
                      "Apply design best practices for professional reports"
                    ].map(item => (
                       <li key={item} className="flex gap-3 text-sm font-bold text-zinc-700">
                          <ShieldCheck className="w-5 h-5 text-yellow-500 shrink-0" /> {item}
                       </li>
                    ))}
                 </ul>
              </div>
           </div>
           
           <div className="bg-zinc-950 p-8 rounded-3xl text-white">
              <h3 className="text-2xl font-black mb-8 text-yellow-400 tracking-tight">Master Video Resource</h3>
              <a href="https://youtu.be/I0vQ_VLZTWg?si=Gkh1WYh75MOngmbS" target="_blank" rel="noopener noreferrer" className="group block space-y-6">
                 <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <img src="https://img.youtube.com/vi/I0vQ_VLZTWg/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Power BI Course"/>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                       <PlayCircle className="w-16 h-16 text-yellow-400 fill-zinc-950"/>
                    </div>
                 </div>
                 <p className="text-center font-black uppercase tracking-widest text-xs text-zinc-400">Power BI in Under 3 Hours | Formatting, Viz, Dashboards</p>
              </a>
           </div>
        </section>

        <section className="space-y-10">
           <h3 className="text-3xl font-black text-zinc-950 px-4">Core Power BI Workflow</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: '1. Data Transformation', icon: <Recycle className="text-emerald-500"/>, desc: 'Power Query Editor: Cleaning, Preparation, Applied Steps, and Advanced Unpivoting.' },
                { title: '2. Data Modeling', icon: <Network className="text-blue-500"/>, desc: 'Model tab: Relationship Management, Cardinality (1:*), and Cross-Filter directions.' },
                { title: '3. Calculations (DAX)', icon: <Calculator className="text-yellow-500"/>, desc: 'Creating Measures vs Columns using SUM, COUNT, SUMX, and Time Intelligence.' }
              ].map(step => (
                <div key={step.title} className="p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm hover:border-yellow-200 transition-all">
                   <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 shadow-sm">{step.icon}</div>
                   <h4 className="text-xl font-black mb-4 tracking-tight">{step.title}</h4>
                   <p className="text-sm text-zinc-500 leading-relaxed font-medium">{step.desc}</p>
                </div>
              ))}
           </div>
        </section>
      </div>
    )
  },
  {
    day: 19,
    title: 'Product Analytics & Metrics Foundations',
    category: 'Data',
    preview: 'Understand how product analytics fits into the entire lifecycle. Learn to define success metrics using Mixpanel.',
    content: (
      <div className="space-y-12">
        <header className="bg-indigo-700 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Day 19 — Product Analytics & Metrics Foundations</h1>
           <p className="text-indigo-200 text-xl font-bold italic">"Analytics is not about dashboards — it is about decisions and feedback loops."</p>
        </header>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div className="space-y-6">
              <h3 className="text-3xl font-black tracking-tight text-zinc-900">Today’s Goal</h3>
              <p className="text-lg text-zinc-600 leading-relaxed font-medium">Understand how product analytics fits into the entire product development lifecycle, how to define meaningful success metrics, and how tools like <strong>Mixpanel</strong> are used to analyze behavior.</p>
              <div className="flex gap-4">
                 {['Design', 'Development', 'Iteration'].map(phase => (
                   <span key={phase} className="px-4 py-2 bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest rounded-full">{phase}</span>
                 ))}
              </div>
           </div>
           <div className="bg-zinc-950 p-8 rounded-[3rem] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
              <h4 className="text-lg font-black mb-6 text-indigo-400">Mixpanel Basics Video</h4>
              <a href="https://youtu.be/5O4ST-R5ZVw?si=IN49CzqS5qHexth3" target="_blank" rel="noopener noreferrer">
                 <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                    <img src="https://img.youtube.com/vi/5O4ST-R5ZVw/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Mixpanel Foundations"/>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <PlayCircle className="w-16 h-16 text-white group-hover:text-indigo-400 transition-colors"/>
                    </div>
                 </div>
              </a>
           </div>
        </section>

        <section className="space-y-10">
           <h3 className="text-3xl font-black text-zinc-950 px-4">2. The Six Key Metrics</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Exposure', icon: <Globe/>, desc: 'Number of users who reach the first point of the product (e.g., Homepage visits).' },
                { title: 'Activation', icon: <Zap/>, desc: 'Rate at which users perform a key action for the first time.' },
                { title: 'Engagement', icon: <Activity/>, desc: 'How much an active user uses the product (key actions per active user).' },
                { title: 'Retention', icon: <RefreshCcw/>, desc: 'Portion of users who continue taking key actions after a fixed period (30/90-day).' },
                { title: 'Focus Metric', icon: <Target/>, desc: 'The overarching success metric (DAU/WAU/MAU).' },
                { title: 'Onboarding', icon: <Milestone/>, desc: 'Conversion rate from exposure to completed onboarding steps.' }
              ].map(item => (
                <div key={item.title} className="p-6 bg-white border-2 border-zinc-100 rounded-3xl hover:border-indigo-200 transition-all">
                   <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center mb-4 text-indigo-600">{item.icon}</div>
                   <h4 className="text-lg font-black mb-2">{item.title}</h4>
                   <p className="text-xs text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>
      </div>
    )
  },
  {
    day: 20,
    title: 'Google Analytics 4 (GA4) Setup',
    category: 'Data',
    preview: 'End-to-End GA4 Setup, Reporting & Installation. Master streams, enhanced measurement, and building advanced explorations.',
    content: (
      <div className="space-y-12">
        <header className="bg-orange-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">Day 20 — Google Analytics 4 (GA4)</h1>
           <p className="text-orange-100 text-xl font-bold italic">End-to-End GA4 Setup, Reporting & Installation.</p>
        </header>

        <section className="bg-white border-2 border-orange-100 p-10 rounded-[3rem] grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div className="space-y-8">
              <h3 className="text-3xl font-black tracking-tight text-zinc-900">Today’s Goal</h3>
              <p className="text-lg text-zinc-600 leading-relaxed font-medium">Gain a step-by-step understanding of Google Analytics 4 (GA4) — from creating accounts and properties to exploring standard and advanced reports.</p>
              <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                 <h4 className="text-xs font-black uppercase text-orange-600 mb-4 tracking-widest">Learning Objectives</h4>
                 <ul className="space-y-3">
                    {["Set up GA4 accounts and configurations correctly", "Collect data using streams and enhanced measurement", "Navigate and interpret standard reports", "Build advanced analysis using explorations"].map(obj => (
                       <li key={obj} className="flex gap-3 text-sm font-bold text-orange-950">
                          <CheckCircle className="w-5 h-5 text-orange-600 shrink-0" /> {obj}
                       </li>
                    ))}
                 </ul>
              </div>
           </div>
           <div className="bg-zinc-950 p-8 rounded-[3rem] text-white flex flex-col justify-center">
              <h4 className="text-xl font-black mb-8 text-orange-400 tracking-tight text-center">Video Walkthrough</h4>
              <a href="https://youtu.be/hsIP4iH25Wg?si=96-l6Lg9vTKdEbD" target="_blank" rel="noopener noreferrer" className="group block space-y-6">
                 <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <img src="https://img.youtube.com/vi/hsIP4iH25Wg/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" alt="GA4 Setup"/>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                       <PlayCircle className="w-16 h-16 text-orange-500 fill-zinc-950"/>
                    </div>
                 </div>
              </a>
           </div>
        </section>

        <section className="space-y-10">
           <h3 className="text-3xl font-black text-zinc-950 px-4">Core Components of GA4</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-zinc-50 rounded-[3rem] border border-zinc-100 h-full">
                 <h4 className="text-xl font-black mb-6 text-zinc-900 border-b border-zinc-200 pb-4 flex items-center gap-3">
                    <Settings className="w-6 h-6 text-orange-500"/> Account & Property
                 </h4>
                 <ul className="space-y-4 text-sm font-medium text-zinc-500">
                    <li>● <strong>Account:</strong> Top folder level organization.</li>
                    <li>● <strong>Property:</strong> Reporting level for specific site/app.</li>
                    <li>● <strong>Configuration:</strong> Setting time zones and currencies.</li>
                 </ul>
              </div>
              <div className="p-8 bg-zinc-50 rounded-[3rem] border border-zinc-100 h-full">
                 <h4 className="text-xl font-black mb-6 text-zinc-900 border-b border-zinc-200 pb-4 flex items-center gap-3">
                    <Database className="w-6 h-6 text-orange-500"/> Data Collection
                 </h4>
                 <ul className="space-y-4 text-sm font-medium text-zinc-500">
                    <li>● <strong>Streams:</strong> Web, Android, and iOS data flow.</li>
                    <li>● <strong>Enhanced Measurement:</strong> Automatic tracking for scrolls and clicks.</li>
                    <li>● <strong>Measurement ID:</strong> Unique identifier linking site to analytics.</li>
                 </ul>
              </div>
           </div>
        </section>
      </div>
    )
  },
  {
    day: 21,
    title: 'Understanding APIs for PMs',
    category: 'Tech',
    preview: 'Master how the internet works and how systems communicate. Learn to collaborate effectively with engineers on API-driven features.',
    content: (
      <div className="space-y-12">
        <header className="bg-cyan-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Day 21 — Understanding APIs as a Product Manager</h1>
           <p className="text-cyan-100 text-xl font-bold italic">"Tech literacy is a PM's bridge to engineering success."</p>
        </header>

        <section className="bg-white border-2 border-cyan-100 p-10 rounded-[3rem] space-y-10">
           <div className="prose prose-zinc max-w-none">
              <h3 className="text-2xl font-black text-zinc-900 mb-6">Let's first understand How the Internet Works 🌐</h3>
              <p className="text-lg text-zinc-600 leading-relaxed font-medium mb-8">
                 Read this essential primer from Cloudflare: <a href="https://www.cloudflare.com/en-in/learning/network-layer/how-does-the-internet-work/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 underline font-black">How does the internet work?</a>
              </p>
           </div>
           
           <div className="p-8 bg-zinc-950 rounded-[3rem] text-white">
              <h3 className="text-2xl font-black mb-10 text-cyan-400 tracking-tight text-center">System Design & Architecture Masterclass</h3>
              <div className="max-w-2xl mx-auto mb-12">
                 <a href="https://youtu.be/iiR6DY1w3jI?si=dHoLOunLp-kaNXgY" target="_blank" rel="noopener noreferrer" className="group block space-y-6">
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                       <img src="https://img.youtube.com/vi/iiR6DY1w3jI/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" alt="API System Design"/>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-cyan-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                             <Play className="w-10 h-10 fill-current"/>
                          </div>
                       </div>
                    </div>
                    <p className="text-center font-black uppercase tracking-widest text-xs text-zinc-400">Tech Every Product Manager Must Know!</p>
                 </a>
              </div>
           </div>
        </section>

        <section className="p-8 bg-zinc-50 border border-zinc-200 rounded-[3rem] space-y-8">
           <h3 className="text-3xl font-black text-zinc-950 px-4">Why APIs Matter for Product Managers</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { t: 'Communication', d: 'Communicate clearly with engineering teams about capabilities.' },
                { t: 'Value Unlock', d: 'Design integrations that unlock massive value for users.' },
                { t: 'Scalability', d: 'Build products that scale with partner ecosystems.' },
                { t: 'Efficiency', d: 'Reduce dependencies on reinventing functionality internally.' }
              ].map(item => (
                <div key={item.t} className="p-6 bg-white rounded-2xl border border-zinc-100 flex gap-4 items-start shadow-sm">
                   <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 font-black shrink-0">✓</div>
                   <div>
                      <h4 className="font-black text-zinc-900 mb-1">{item.t}</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed font-medium">{item.d}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    )
  },
  {
    day: 22,
    title: 'Prompt Engineering for PMs',
    category: 'AI',
    preview: 'Learn to write effective prompts for LLMs. Accelerate ideation, spec writing, and user research synthesis using AI.',
    content: (
      <div className="space-y-12">
        <header className="bg-orange-500 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Day 22 — Prompt Engineering for Product Managers</h1>
           <p className="text-orange-100 text-xl font-bold italic">"AI won't replace PMs, but PMs who use AI will replace those who don't."</p>
        </header>

        <section className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm space-y-8">
           <h3 className="text-3xl font-black tracking-tight text-zinc-900">Today’s Goal</h3>
           <p className="text-lg text-zinc-600 leading-relaxed font-medium">Learn how to write <strong>effective prompts</strong> so that large language models (LLMs) return useful, reliable, and actionable outputs — a must-have skill for modern PM workflows.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-100">
              <div className="space-y-6">
                 <h4 className="text-xl font-black text-zinc-800">For PMs, AI accelerates:</h4>
                 <div className="grid grid-cols-1 gap-3">
                    {['Ideation', 'Specification writing', 'Data interpretation', 'User research synthesis', 'Competitive analysis'].map(task => (
                       <div key={task} className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100 text-orange-950 font-bold">
                          <Zap className="w-5 h-5 text-orange-500" /> {task}
                       </div>
                    ))}
                 </div>
              </div>
              <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white flex flex-col justify-center">
                 <p className="text-orange-400 font-black uppercase tracking-widest text-[10px] mb-4">Core Insight</p>
                 <p className="text-xl font-medium leading-relaxed italic">"It’s not about memorizing commands — it’s about clear thinking expressed as structured instructions."</p>
              </div>
           </div>
        </section>

        <section className="p-10 bg-zinc-950 rounded-[4rem] text-white">
           <h3 className="text-3xl font-black mb-10 text-orange-400 tracking-tight text-center">Prompting Masterclass</h3>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <a href="https://youtu.be/ysPbXH0LpIE?si=5Riv7IB9ezFAt_Kc" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
                 <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <img src="https://img.youtube.com/vi/ysPbXH0LpIE/maxresdefault.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Prompting 101"/>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                       <PlayCircle className="w-16 h-16 text-orange-500 fill-zinc-950"/>
                    </div>
                 </div>
                 <p className="text-center font-bold">Foundations + Practical Prompting 101</p>
              </a>
              <div className="space-y-6">
                 <h4 className="text-2xl font-black text-white leading-tight">Professional Certification</h4>
                 <p className="text-zinc-400 leading-relaxed">Level up your credentials with the official AWS certification course.</p>
                 <a href="https://share.google/FdZPEVTPVCkN85d33" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-500 transition-all shadow-xl shadow-orange-600/20">
                    <ExternalLink className="w-4 h-4"/> Get AWS AI Certificate
                 </a>
              </div>
           </div>
        </section>
      </div>
    )
  },
  {
    day: 23,
    title: 'UI/UX for Product Managers',
    category: 'Design',
    preview: 'Master essential UX & UI concepts. Learn cognitive design laws, usability testing, and how to provide actionable feedback to designers.',
    content: (
      <div className="space-y-12">
        <header className="bg-pink-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">Day 23 — UI/UX for Product Managers</h1>
           <p className="text-pink-100 text-xl font-bold italic leading-relaxed">"A product is only as good as its experience."</p>
        </header>

        <section className="bg-white border-2 border-pink-100 p-10 rounded-[3rem] shadow-sm space-y-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <h3 className="text-3xl font-black tracking-tight text-zinc-900">Today’s Goal</h3>
                 <p className="text-lg text-zinc-600 leading-relaxed font-medium">Build a solid foundation in <strong>UI/UX principles</strong> relevant to product management, including design fundamentals and cognitive laws.</p>
                 <div className="grid grid-cols-1 gap-4 pt-4">
                    {['Understand design fundamentals', 'Learn usability testing', 'Integrate cognitive laws', 'Provide actionable feedback'].map(goal => (
                       <div key={goal} className="flex items-center gap-4 text-sm font-bold text-zinc-700 bg-pink-50/50 p-4 rounded-xl border border-pink-50">
                          <CheckCircle className="w-5 h-5 text-pink-500" /> {goal}
                       </div>
                    ))}
                 </div>
              </div>
              <div className="space-y-6">
                 <h4 className="text-xl font-black text-pink-600 uppercase tracking-widest text-xs">Curated Master Videos</h4>
                 <div className="space-y-4">
                    {[
                      { t: 'UX Design UI Essentials', u: 'https://youtu.be/QJBP2uy8LCU?si=GIa6MA8amS8vYBdd' },
                      { t: 'Usability Testing for UX', u: 'https://youtu.be/nYCJTea1AUQ?si=8RcveOgK6wybwlk4' },
                      { t: 'Basics of UI/UX', u: 'https://youtu.be/ziEqGZB8GE?si=gdeMwyRMYEwOmBOL' },
                      { t: '12 UI/UX Laws You MUST KNOW', u: 'https://youtu.be/wELfwQmtnvo?si=t7AEn1xVBoB8lPTm' }
                    ].map(video => (
                       <a key={video.t} href={video.u} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-zinc-50 rounded-2xl hover:bg-pink-50 border border-zinc-100 transition-all group">
                          <span className="font-bold text-zinc-700 tracking-tight">{video.t}</span>
                          <PlayCircle className="w-6 h-6 text-zinc-300 group-hover:text-pink-500 transition-colors" />
                       </a>
                    ))}
                 </div>
              </div>
           </div>
        </section>
      </div>
    )
  },
  {
    day: 24,
    title: 'Agile & Scrum Project Management',
    category: 'Strategy',
    preview: 'Master the mechanics of real product delivery. Learn roles, ceremonies, artifacts, and prioritization frameworks like RICE and MoSCoW.',
    content: (
      <div className="space-y-12">
        <header className="bg-indigo-800 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Day 24 — Key Foundations of Agile & Scrum</h1>
           <p className="text-indigo-200 text-xl font-bold italic leading-relaxed">"Agile isn’t a checklist — it’s a way to deliver value faster."</p>
        </header>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200 space-y-10">
           <h3 className="text-3xl font-black tracking-tight text-zinc-900">Agile Fundamentals</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6 bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
                 <h4 className="text-xl font-black text-indigo-900 border-b border-zinc-100 pb-4">Agile Manifesto Values</h4>
                 <ul className="space-y-4">
                    {['Individuals and interactions over processes and tools', 'Working software over comprehensive documentation', 'Customer collaboration over contract negotiation', 'Responding to change over following a plan'].map((val, i) => (
                       <li key={i} className="flex gap-4 text-sm font-bold text-zinc-600">
                          <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0" /> {val}
                       </li>
                    ))}
                 </ul>
              </div>
              <div className="space-y-6">
                 <h4 className="text-xl font-black text-indigo-900">Jira Beginner Course</h4>
                 <a href="https://youtu.be/NDVSMIVYxm8?si=GptGyKBY7AlhEZ8" target="_blank" rel="noopener noreferrer" className="group block space-y-4">
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-200 shadow-lg group-hover:shadow-indigo-500/20 transition-all">
                       <img src="https://img.youtube.com/vi/NDVSMIVYxm8/maxresdefault.jpg" className="w-full h-full object-cover" alt="Jira Tooling"/>
                       <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0">
                          <PlayCircle className="w-16 h-16 text-white"/>
                       </div>
                    </div>
                    <p className="text-xs font-black uppercase text-center tracking-widest text-zinc-400">Master Agile Tooling (Jira)</p>
                 </a>
              </div>
           </div>
        </section>

        <section className="p-10 bg-white rounded-[4rem] border-4 border-zinc-100 shadow-xl space-y-12">
           <h3 className="text-3xl font-black text-center tracking-tight">Prioritization Frameworks</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 bg-zinc-50 rounded-3xl space-y-6">
                 