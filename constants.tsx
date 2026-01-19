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
  { id: 'foundations', title: 'Core Foundations', category: 'Foundations', description: 'Mindset, PDLC, PLC, Product Sense, Empathy, and Documentation.' },
  { id: 'strategy', title: 'Product Strategy', category: 'Strategy', description: 'Stakeholder Management, Business Fundamentals, Competitive Analysis, and Market Sizing.' },
  { id: 'data', title: 'Data & Analytics', category: 'Data', description: 'SQL Mastery, Advanced Excel, Dashboards, Mixpanel, and GA4.' },
  { id: 'tech-ai', title: 'Tech & AI Strategy', category: 'AI', description: 'APIs, System Design, Prompt Engineering, Context Engineering, RAG, and AI Agents.' },
  { id: 'career', title: 'Career & Execution', category: 'Strategy', description: 'Agile/Scrum, Portfolio Building, Case Studies, and Interview Preparation.' },
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
                    {['Is PM role aligned with your strengths & interests?', 'Do you enjoy solving problems and talking to users?', 'Are you comfortable making decisions without perfect data?'].map(q => (
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
    title: 'Product Development Lifecycle (PDLC)',
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
                    <p className="text-lg text-indigo-800 font-bold italic leading-relaxed">Design solutions under strict limits (e.g., 30s onboarding) to sharpen judgment.</p>
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
                       <p className="text-[10px] font-black uppercase text-pink-400 tracking-widest mb-2 text-white text-white">Personas</p>
                       <p className="text-lg font-bold text-zinc-300 italic text-zinc-300">Visualize different user groups.</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-pink-400 tracking-widest mb-2 text-white text-white">Empathy Maps</p>
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
                       <h5 className="text-3xl font-black mb-4 text-white">Apple</h5>
                       <p className="text-lg text-zinc-300 font-medium italic leading-relaxed text-zinc-300">Demonstrates empathy through user-friendly interfaces and seamless experiences that create a loyal base.</p>
                    </div>
                 </div>
                 <div className="space-y-6 text-white">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-white">
                       <h5 className="text-3xl font-black mb-4 text-white text-white">Airbnb</h5>
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
    title: 'Essential Product Documentation',
    category: 'Foundations',
    preview: 'A Product Manager\'s Complete Guide to PRDs, BRDs, User Stories, and Roadmaps.',
    content: (
      <div className="space-y-12">
        <section className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200">
           <div className="flex gap-4 mb-6">
              <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Foundations</span>
              <span className="px-4 py-1.5 bg-zinc-200 text-zinc-700 text-[10px] font-black uppercase tracking-widest rounded-lg">45m read</span>
           </div>
           <h2 className="text-3xl font-black mb-4 tracking-tight">Essential Product Documentation</h2>
           <p className="text-xl text-zinc-600 font-medium leading-relaxed italic">"Product managers are professional translators. Documentation is the primary medium for this translation work."</p>
        </section>

        <section className="bg-white border-2 border-indigo-100 p-8 rounded-[2.5rem] shadow-sm">
           <h3 className="text-2xl font-black mb-6 text-zinc-900">Learning Objectives</h3>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Distinguish between document types (PRD, BRD, user stories)",
                "Create comprehensive PRDs with clear scope boundaries",
                "Build compelling BRDs with ROI justification",
                "Write effective user stories and acceptance criteria",
                "Develop outcome-focused roadmaps",
                "Maintain decision logs and meeting notes"
              ].map((obj, i) => (
                <li key={i} className="flex gap-3 text-zinc-700 font-bold">
                   <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0" /> {obj}
                </li>
              ))}
           </ul>
        </section>

        <section className="space-y-8">
           <div className="p-8 bg-zinc-950 rounded-[3rem] text-white">
              <h4 className="text-2xl font-black mb-6 text-indigo-400">The PRD: Single Source of Truth</h4>
              <p className="text-lg text-zinc-300 mb-6">The PRD defines what you're building, why you're building it, and what success looks like. It aligns engineering, design, marketing, and leadership.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {['Problem Context', 'User Stories', 'Success Metrics', 'Scope Boundaries'].map(item => (
                   <div key={item} className="p-4 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-center uppercase tracking-widest">{item}</div>
                 ))}
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-10 bg-white border-2 border-indigo-200 rounded-[3rem] shadow-xl">
           <h5 className="text-xl font-black mb-4 uppercase text-indigo-600">Task: Write Your Own PRD</h5>
           <p className="text-lg font-bold text-zinc-700 mb-6">Use the AI workspace to generate a draft for a new feature.</p>
           <a href="https://www.chatprd.ai/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-black text-sm uppercase tracking-widest">
              Try ChatPRD <ExternalLink className="w-4 h-4" />
           </a>
        </div>
      </div>
    )
  },
  {
    day: 7,
    title: 'Stakeholder Management',
    category: 'Strategy',
    preview: 'Master the art of aligning diverse groups around a shared product vision without direct authority.',
    content: (
      <div className="space-y-12">
        <section className="bg-indigo-50 p-12 rounded-[4rem] border border-indigo-100">
           <h2 className="text-4xl font-black tracking-tighter mb-4 text-indigo-950 text-center">Stakeholder Management Guide 🤝</h2>
           <p className="text-xl text-indigo-900 font-bold leading-relaxed italic text-center max-w-2xl mx-auto">"All the responsibility but none of the authority."</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] space-y-6 shadow-sm">
              <h3 className="text-2xl font-black text-zinc-900">The Power Map</h3>
              <p className="text-zinc-600 font-medium">Map stakeholders by <strong>Influence vs. Interest</strong>:</p>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-black uppercase text-center tracking-widest">
                 <div className="p-4 bg-indigo-600 text-white rounded-xl">Key Players (High/High)</div>
                 <div className="p-4 bg-indigo-100 text-indigo-700 rounded-xl">Keep Satisfied (High/Low)</div>
                 <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">Keep Informed (Low/High)</div>
                 <div className="p-4 bg-zinc-100 text-zinc-400 rounded-xl">Minimal Effort (Low/Low)</div>
              </div>
           </div>
           <div className="p-10 bg-zinc-900 rounded-[3rem] text-white flex flex-col justify-center space-y-6">
              <h4 className="text-2xl font-black text-indigo-400">Saying No Gracefully</h4>
              <p className="text-lg italic leading-relaxed text-zinc-400">"Every yes to one feature is a no to dozens of others. Ground refusals in strategy and data rather than personal preference."</p>
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'Communicating with Stakeholders', url: 'https://youtu.be/jz7tPVDwb50?si=71B7Acqz6U2F0XA8', type: 'video' }
    ]
  },
  {
    day: 8,
    title: 'Business Fundamentals for PMs',
    category: 'Strategy',
    preview: 'Master the metrics that drive sustainable products. Learn CAC, LTV, and the "Golden Ratio" of business success.',
    content: (
      <div className="space-y-12">
        <header className="bg-emerald-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 translate-x-1/3 blur-3xl"></div>
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
           <div className="p-12 bg-white border-2 border-zinc-100 rounded-[4rem] space-y-12 shadow-sm text-center">
              <h3 className="text-3xl font-black tracking-tight text-zinc-950">Unit Economics & Formulas</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-center text-zinc-900">
                 <div className="p-10 bg-indigo-50 border border-indigo-100 rounded-[3rem] space-y-6">
                    <h5 className="text-2xl font-black text-indigo-950">Customer Acquisition Cost (CAC)</h5>
                    <div className="p-6 bg-white rounded-2xl border-4 border-indigo-200 font-mono text-xl text-center text-indigo-600 font-black">
                       (Total Mkt + Sales Costs) / # New Users
                    </div>
                    <p className="text-sm font-bold text-indigo-900/60 italic text-center">Example: $50,000 spend + 500 users = $100 CAC</p>
                 </div>
                 
                 <div className="p-10 bg-emerald-50 border border-emerald-100 rounded-[3rem] space-y-6 text-emerald-950">
                    <h5 className="text-2xl font-black text-emerald-950">Lifetime Value (LTV)</h5>
                    <div className="space-y-4">
                       <div className="p-4 bg-white rounded-xl border border-emerald-200 flex justify-between items-center">
                          <span className="font-bold text-emerald-900">Simple LTV</span>
                          <span className="font-mono text-emerald-600 font-black">ARPU × Avg Lifespan</span>
                       </div>
                       <div className="p-4 bg-white rounded-xl border border-emerald-200 flex justify-between items-center">
                          <span className="font-bold text-emerald-900">LTV with Churn</span>
                          <span className="font-mono text-emerald-600 font-black">(ARPU × Gross Margin) / Churn Rate</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-12 bg-zinc-950 rounded-[4rem] text-white">
                 <h4 className="text-2xl font-black mb-10 text-indigo-400 text-center tracking-widest uppercase">The Golden Ratio: LTV:CAC</h4>
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
           <h5 className="text-xl font-black mb-8 uppercase tracking-[0.2em] text-emerald-600 text-center">🎯 Day-6 Mini Assignment</h5>
           <p className="text-3xl font-black text-zinc-900 mb-10 text-center tracking-tight">Unit Economics Problem</p>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="p-10 bg-zinc-950 rounded-[3rem] border border-zinc-800 space-y-6 text-white font-mono text-sm leading-relaxed">
                 <h6 className="text-xl font-black text-indigo-400 border-b border-white/10 pb-4 mb-6 uppercase tracking-widest">The Data Set</h6>
                 <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <span className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Ad Spend:</span> <span className="text-indigo-300 font-black">$30,000</span>
                    <span className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Sales Team:</span> <span className="text-indigo-300 font-black">$20,000</span>
                    <span className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">New Users:</span> <span className="text-indigo-300 font-black">250</span>
                    <span className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">ARPU:</span> <span className="text-indigo-300 font-black">$40/mo</span>
                 </div>
              </div>
              <div className="flex flex-col justify-center space-y-10">
                 <div className="space-y-4 text-zinc-900">
                    <p className="text-lg font-black text-zinc-950 border-l-4 border-indigo-600 pl-6 uppercase tracking-widest">Calculate</p>
                    <p className="text-xl font-black text-zinc-900 pl-6">1. CAC <br/> 2. LTV (10mo span, 80% margin) <br/> 3. LTV:CAC Ratio</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 9,
    title: 'Introduction to User & Market Research',
    category: 'Research',
    preview: 'Think like a researcher. Learn structured methods to uncover pain points and validate product ideas.',
    content: (
      <div className="space-y-12">
        <header className="bg-purple-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl text-white"></div>
           <div className="flex gap-4 mb-6">
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">Research</span>
              <span className="px-4 py-1.5 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-white">45m read</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white text-white">Introduction to User & Market Research 🔍</h1>
           <p className="text-purple-100 text-xl font-bold italic text-white">Think like a researcher. Learn structured methods to uncover pain points and validate product ideas.</p>
        </header>

        <section className="p-10 bg-purple-50 border border-purple-100 rounded-[3.5rem] space-y-10">
           <h3 className="text-2xl font-black text-purple-950 px-4">Learning Objectives</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Explain the difference between user research and market research',
                'Identify user pain points using qualitative methods',
                'Apply basic frameworks — Empathy Map, JTBD, and Segmentation',
                'Use AI tools to accelerate research synthesis'
              ].map(item => (
                <div key={item} className="p-6 bg-white rounded-3xl border border-purple-200 flex items-center gap-4 text-lg font-bold text-purple-900 italic">
                   <CheckCircle className="w-6 h-6 text-purple-600 shrink-0" /> {item}
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-10">
           <h3 className="text-3xl font-black text-zinc-950 px-4">1. User Research vs Market Research</h3>
           <div className="overflow-hidden rounded-[3rem] border-4 border-zinc-100 bg-white shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-zinc-950 text-white font-black text-xs uppercase tracking-[0.2em]">
                  <tr>
                    <th className="p-8 text-white">Aspect</th>
                    <th className="p-8 text-white">User Research</th>
                    <th className="p-8 text-white">Market Research</th>
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
                       <td className="p-8 text-purple-600 font-black uppercase tracking-widest text-[10px]">{row.a}</td>
                       <td className="p-8 text-zinc-900 leading-relaxed italic">{row.u}</td>
                       <td className="p-8 text-zinc-500 leading-relaxed italic">{row.m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'Doing User Research', url: 'https://youtu.be/MxwyGi-3dzY?si=CV5VWd2bNnUDW-fP', type: 'video' },
        { title: 'Market Research 101', url: 'https://youtu.be/LoJDAeq6i34?si=Ok2GW9U0wFmSJzz8', type: 'video' }
    ]
  },
  {
    day: 10,
    title: 'User Interviews & Surveys',
    category: 'Research',
    preview: '“If you listen carefully, your users will write your roadmap for you.” Master structured feedback and real validation.',
    content: (
      <div className="space-y-12">
        <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white text-white">User Interviews & Surveys 🎙️</h1>
           <p className="text-indigo-100 text-xl font-bold italic text-white">“If you listen carefully, your users will write your roadmap for you.”</p>
        </header>

        <section className="space-y-12">
           <h3 className="text-3xl font-black text-zinc-950 px-4 text-center text-zinc-900">Types of Interview Questions</h3>
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
           <div className="p-10 bg-indigo-50 rounded-[3rem] border border-indigo-200 text-center">
              <p className="text-2xl font-black text-indigo-950 italic leading-tight text-indigo-950 text-indigo-950">🧠 Golden Rule: No leading questions. Don't ask "Wouldn't it be better if...?" Ask "How do you feel about...?"</p>
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'How To Conduct User Interviews', url: 'https://youtu.be/5tVbFfQCk?si=91eAlcNvjUAFfxM1', type: 'video' }
    ],
    assignment: (
        <div className="space-y-6">
            <h5 className="text-xl font-black text-indigo-900">Day-8: User Insights Report</h5>
            <p className="font-bold text-zinc-600">Create a 1-page deliverable covering:</p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-700">
                <li>Top 3 Pain Points with user quotes</li>
                <li>Top 3 Desired Outcomes</li>
                <li>One "How might we..." opportunity statement</li>
            </ul>
        </div>
    )
  },
  {
    day: 11,
    title: 'User Personas & JTBD',
    category: 'Research',
    preview: '“You don’t design for everyone — you design for someone.” Convert raw feedback into structured user profiles.',
    content: (
      <div className="space-y-12">
        <header className="bg-purple-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white text-white">User Personas & JTBD 👥</h1>
           <p className="text-purple-100 text-xl font-bold italic text-white">“You don’t design for everyone — you design for someone.”</p>
        </header>

        <section className="p-12 bg-white border-2 border-zinc-100 rounded-[4rem] shadow-xl text-center space-y-10">
           <h4 className="text-lg font-black uppercase tracking-[0.3em] text-zinc-400">The JTBD Template</h4>
           <p className="text-3xl md:text-5xl font-black tracking-tight leading-tight italic text-zinc-900">
              When I <span className="text-purple-600">situation</span>, I want to <span className="text-purple-600">motivation</span>, So I can <span className="text-purple-600">desired outcome</span>.
           </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-zinc-950 rounded-3xl text-white">
                <h4 className="text-xl font-black mb-4 text-purple-400">Duolingo Example</h4>
                <p className="text-zinc-400 italic">"When I have free time, I want quick practice, so I feel productive."</p>
            </div>
            <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-200">
                <h4 className="text-xl font-black mb-4 text-zinc-900">Notion Example</h4>
                <p className="text-zinc-500 italic">"When I start a project, I want everything in one place, so I stay organized."</p>
            </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'Jobs to be Done Framework', url: 'https://youtu.be/dbVN6EYql6k?si=2440TMiKd3ZVmGvK', type: 'video' },
        { title: 'Creating User Personas', url: 'https://youtu.be/v6EWN4EjHM0?si=5up6JXpGPfYnIq1d', type: 'video' }
    ]
  },
  {
    day: 12,
    title: 'Competitive & Market Analysis',
    category: 'Strategy',
    preview: '“You can’t build a better product until you understand what already exists.” Master SWOT and benchmarking.',
    content: (
      <div className="space-y-12">
        <header className="bg-zinc-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">Competitive Analysis 🧭</h1>
           <p className="text-zinc-400 text-xl font-bold italic leading-relaxed">Today’s goal is to position your idea intelligently by identifying where competitors fall short.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center text-zinc-900">
              {[
                { title: 'Strengths', desc: 'What do they do well?', color: 'bg-emerald-50 border-emerald-100 text-emerald-950' },
                { title: 'Weaknesses', desc: 'Where do they fall short?', color: 'bg-rose-50 border-rose-100 text-rose-950' },
                { title: 'Opportunities', desc: 'What can we do better?', color: 'bg-blue-50 border-blue-100 text-blue-950' },
                { title: 'Threats', desc: 'What could hurt us?', color: 'bg-amber-50 border-amber-100 text-amber-950' }
              ].map(item => (
                <div key={item.title} className={`p-12 rounded-[4rem] border space-y-6 ${item.color} shadow-sm`}>
                   <h5 className="text-3xl font-black tracking-tight">{item.title}</h5>
                   <p className="text-xl font-bold italic font-medium">{item.desc}</p>
                </div>
              ))}
        </section>

        <section className="p-12 bg-white border-4 border-zinc-100 rounded-[4rem] shadow-xl text-zinc-900">
           <h3 className="text-4xl font-black text-zinc-950 mb-12 tracking-tighter text-center">Zerodha vs Groww Case Study</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 space-y-4">
                 <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Zerodha Strength</p>
                 <p className="text-2xl font-black text-zinc-900 leading-tight">Advanced tools for professional Traders.</p>
              </div>
              <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100 space-y-4">
                 <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Groww Strength</p>
                 <p className="text-2xl font-black text-zinc-900 leading-tight">UI simplicity for First-time investors.</p>
              </div>
           </div>
           <p className="mt-8 text-center text-zinc-500 font-bold italic">“Design simplicity was the differentiator Groww used to disrupt a market of 'complex dashboards.'”</p>
        </section>
      </div>
    ),
    resources: [
        { title: 'Competitive Analysis for PMs', url: 'https://youtu.be/UnBL8h8TVX8?si=v7_4Kx9EDy357xjg', type: 'video' }
    ]
  },
  {
    day: 13,
    title: 'Opportunity Sizing (TAM / SAM / SOM)',
    category: 'Strategy',
    preview: 'Learn to estimate market potential using data, top-down and bottom-up sizing frameworks.',
    content: (
      <div className="space-y-12">
        <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">Opportunity Sizing</h1>
           <p className="text-indigo-100 text-xl font-bold italic leading-relaxed max-w-3xl">“A great product solves a real problem — but a great business solves it for a market that’s big enough.”</p>
        </header>

        <section className="overflow-hidden rounded-[4rem] border-4 border-zinc-100 bg-white shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-zinc-950 text-white font-black text-xs uppercase tracking-[0.2em]">
                  <tr>
                    <th className="p-8 text-white">Term</th>
                    <th className="p-8 text-white">Meaning</th>
                    <th className="p-8 text-white">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-bold text-sm">
                  {[
                    { t: 'TAM (Total Addressable Market)', m: 'Total global demand for your product', e: '“Global fitness app market = $7B”' },
                    { t: 'SAM (Serviceable Available Market)', m: 'Portion you can serve based on geography', e: '“India’s fitness app market = $1.2B”' },
                    { t: 'SOM (Serviceable Obtainable Market)', m: 'Realistic share capture in 2–3 years', e: '“Target 1% of SAM → $12M”' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-50 transition-colors">
                       <td className="p-8 text-indigo-600 font-black text-lg">{row.t}</td>
                       <td className="p-8 text-zinc-900 italic font-medium leading-relaxed">{row.m}</td>
                       <td className="p-8 text-zinc-400 italic font-black uppercase tracking-widest text-[10px]">{row.e}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </section>
      </div>
    ),
    resources: [
        { title: 'TAM SAM SOM Explained', url: 'https://youtu.be/nCYOMU7rKCs?si=cvu8yrnAbxDueKEI', type: 'video' }
    ]
  },
  {
    day: 14,
    title: 'Introduction to SQL (SELECT, WHERE)',
    category: 'Data',
    preview: '"Data is the voice of your users. SQL lets you listen." Master querying fundamentals for independent analysis.',
    content: (
      <div className="space-y-12">
        <header className="bg-emerald-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">SQL for PMs 📊</h1>
           <p className="text-emerald-100 text-xl font-bold italic leading-relaxed">Today you\'ll learn the fundamentals of querying databases — a superpower that lets PMs answer their own questions.</p>
        </header>

        <section className="bg-white border-2 border-zinc-100 p-10 rounded-[3rem] shadow-sm">
           <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-zinc-900"><Target className="text-emerald-600"/> Learning Objectives</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Understand what SQL is and why PMs need it",
                "Set up a practice SQL environment",
                "Write basic SELECT queries to retrieve data",
                "Filter data using WHERE clauses",
                "Execute DDL and DML commands"
              ].map(item => (
                <div key={item} className="p-4 bg-emerald-50 rounded-2xl font-bold text-emerald-950 border border-emerald-100 flex items-center gap-3">
                   <CheckCircle className="w-5 h-5 text-emerald-600" /> {item}
                </div>
              ))}
           </div>
        </section>

        <section className="p-8 bg-zinc-950 rounded-[3rem] text-white">
           <h3 className="text-2xl font-black mb-8 text-emerald-400 text-center">Timestamps - Beginner Level</h3>
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
    ),
    resources: [
        { title: 'Complete SQL Beginner Course', url: 'https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg', type: 'video' }
    ]
  },
  {
    day: 15,
    title: 'Filtering Data & SQL Joins',
    category: 'Data',
    preview: 'Master advanced filtering and learn to combine data from multiple tables — essential for real-world analysis.',
    content: (
      <div className="space-y-12">
        <section className="bg-emerald-700 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Filtering & Joins</h1>
           <p className="text-emerald-100 text-lg font-bold italic leading-relaxed">"Joining tables is where SQL becomes powerful for PMs."</p>
        </section>

        <section className="p-8 bg-zinc-950 rounded-[3rem] text-white">
          <h3 className="text-2xl font-black mb-8 text-emerald-400 text-center">Timestamps - Intermediate Level</h3>
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
    ),
    resources: [
        { title: 'Intermediate SQL Course', url: 'https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg', type: 'video' }
    ]
  },
  {
    day: 16,
    title: 'SQL Set Operators & Functions',
    category: 'Data',
    preview: 'Learn UNION, string manipulation, and numeric functions for complex product analysis.',
    content: (
      <div className="space-y-12">
        <section className="p-8 bg-zinc-950 rounded-[3rem] text-white">
          <h3 className="text-2xl font-black mb-8 text-emerald-400 text-center">Timestamps - Advanced Functions</h3>
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
    ),
    resources: [
        { title: 'SQL Advanced Functions', url: 'https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg', type: 'video' }
    ]
  },
  {
    day: 17,
    title: 'SQL Date & Advanced Logic',
    category: 'Data',
    preview: 'Handle time-based analysis, missing data, and complex conditional logic in your reports.',
    content: (
      <div className="space-y-12">
        <section className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Date Functions & CASE Logic</h1>
           <p className="text-indigo-100 text-lg font-bold italic leading-relaxed italic text-white">"Transform messy data into clean insights with SQL’s most powerful functions."</p>
        </section>

        <section className="p-8 bg-zinc-950 rounded-[3rem] text-white">
              <h3 className="text-xl font-black mb-6 text-indigo-400 text-center">Final SQL Mastery Timestamps</h3>
              <div className="space-y-3">
                 {[{t:"05:22:48", l:"Date and Time Functions"}, {t:"06:59:06", l:"NULL Functions"}, {t:"08:07:50", l:"Case Statement"}, {t:"08:43:36", l:"Aggregate Functions"}].map(idx => (
                    <div key={idx.t} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5 px-10">
                       <span className="font-mono text-indigo-300 text-xs">{idx.t}</span>
                       <span className="font-bold text-xs">{idx.l}</span>
                    </div>
                 ))}
              </div>
           </section>
      </div>
    ),
    resources: [
        { title: 'Final SQL Mastery Session', url: 'https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg', type: 'video' }
    ]
  },
  {
    day: 18,
    title: 'Excel Fundamentals for PMs',
    category: 'Data',
    preview: 'Excel is the PM\'s Swiss Army knife. Master workbooks, ribbons, and core daily formulas.',
    content: (
      <div className="space-y-12">
        <header className="bg-emerald-500 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">Excel Mastery 📘</h1>
           <p className="text-emerald-100 text-xl font-bold italic">"Excel is the PM's Swiss Army knife — from quick analysis to complex models."</p>
        </header>

        <section className="p-10 bg-zinc-950 rounded-[4rem] text-white">
           <h3 className="text-3xl font-black mb-10 text-emerald-400 text-center uppercase tracking-widest text-sm">Timestamps</h3>
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
    ),
    resources: [
        { title: 'Excel PM Bootcamp', url: 'https://youtu.be/pCJ15nGFgVg?si=aqGEbVfcwFuLi7fY', type: 'video' }
    ]
  },
  {
    day: 19,
    title: 'Excel Charts, Pivot Tables & Dashboards',
    category: 'Data',
    preview: 'Learn to transform data into compelling visualizations and building interactive dashboards that tell stories.',
    content: (
      <div className="space-y-12">
        <section className="p-8 bg-zinc-950 rounded-[4rem] text-white">
           <h3 className="text-3xl font-black mb-10 text-blue-400 text-center uppercase tracking-widest text-sm">Visualization Modules</h3>
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
    ),
    resources: [
        { title: 'Excel Dashboards Masterclass', url: 'https://youtu.be/pCJ15nGFgVg?si=aqGEbVfcwFuLi7fY', type: 'video' }
    ]
  },
  {
    day: 20,
    title: 'Learn Power BI in Under 3 Hours',
    category: 'Data',
    preview: 'Build a solid foundation in data transformation, modeling, DAX, and dashboard finalization.',
    content: (
      <div className="space-y-12">
        <section className="bg-yellow-500 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Power BI Masterclass 📈</h1>
           <p className="text-yellow-100 text-xl font-bold italic leading-relaxed">Formatting, Visualizations, Dashboards + Full Project.</p>
        </section>

        <section className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
              <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Today’s Goal</h3>
              <p className="text-lg text-zinc-600 leading-relaxed font-medium italic border-l-4 border-yellow-500 pl-6">
                  Build a strong foundation in Power BI by understanding how raw data is transformed, modeled, calculated, and finally presented as interactive dashboards. The focus is on hands-on concepts essential for real-world analytics.
              </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-50 rounded-3xl">
                <h4 className="font-black mb-4 uppercase tracking-widest text-xs text-zinc-400">Core Workflow</h4>
                <ul className="space-y-3 font-bold text-zinc-700">
                    <li>1. Data Transformation (Power Query)</li>
                    <li>2. Data Modeling & Relationships</li>
                    <li>3. DAX Calculations (Measures)</li>
                    <li>4. Visualizations & Interactivity</li>
                    <li>5. Dashboard Finalization</li>
                </ul>
            </div>
            <div className="p-6 bg-zinc-900 rounded-3xl text-white">
                <h4 className="font-black mb-4 uppercase tracking-widest text-xs text-yellow-400">Cardinality Basics</h4>
                <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-black text-zinc-400">
                    <div className="p-2 border border-white/10 rounded">One-to-many</div>
                    <div className="p-2 border border-white/10 rounded">Many-to-one</div>
                    <div className="p-2 border border-white/10 rounded">One-to-one</div>
                    <div className="p-2 border border-white/10 rounded">Many-to-many</div>
                </div>
            </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'Learn Power BI in Under 3 Hours', url: 'https://youtu.be/I0vQ_VLZTWg?si=Gkh1WYh75MOngmbS', type: 'video' }
    ]
  },
  {
    day: 21,
    title: 'Product Analytics with Mixpanel',
    category: 'Data',
    preview: 'Differentiate web vs product analytics. Master event-based tracking, funnels, retention, and cohort analysis.',
    content: (
      <div className="space-y-12">
        <section className="bg-indigo-700 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">Analytics Foundations</h1>
           <p className="text-indigo-200 text-xl font-bold italic">Understand how product analytics fits into the entire lifecycle.</p>
        </section>

        <section className="p-10 bg-zinc-950 rounded-[4rem] text-white">
            <h3 className="text-2xl font-black mb-8 text-indigo-400 tracking-tight">The Metric Pyramid</h3>
            <div className="flex flex-col items-center gap-4">
                <div className="w-48 h-12 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-sm uppercase">Focus Metric</div>
                <div className="w-72 h-12 bg-indigo-800 rounded-lg flex items-center justify-center font-black text-sm uppercase">Engagement & Retention</div>
                <div className="w-full h-12 bg-zinc-900 rounded-lg flex items-center justify-center font-black text-sm uppercase border border-white/5">Activation & Exposure</div>
            </div>
        </section>

        <section className="bg-white border-2 border-zinc-100 p-8 rounded-3xl">
           <h4 className="text-xl font-black mb-6 text-zinc-900">What is Product Analytics?</h4>
           <p className="text-lg text-zinc-600 italic">"Product analytics focuses on tracking user actions and events within your product rather than just page views."</p>
        </section>
      </div>
    ),
    resources: [
        { title: 'Mixpanel Basics', url: 'https://youtu.be/5O4ST-R5ZVw?si=IN49CzqS5qHexth3', type: 'video' }
    ]
  },
  {
    day: 22,
    title: 'GA4 and A/B Testing with VWO',
    category: 'Data',
    preview: 'End-to-End GA4 Setup, Reporting, and Installation. Learn to run scientific experiments that settle disputes objectives.',
    content: (
      <div className="space-y-12">
        <section className="bg-orange-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">GA4 & A/B Testing 🧪</h1>
           <p className="text-orange-100 text-xl font-bold italic text-white">"Actions speak louder than opinions, and A/B tests measure actions."</p>
        </section>

        <section className="p-8 bg-zinc-50 border border-zinc-100 rounded-[3rem] space-y-8">
            <h4 className="text-2xl font-black text-zinc-900">The A/B Testing Framework</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Start with Clear Hypothesis', 'Define Success Metrics', 'Sample Size & Duration'].map((step, i) => (
                    <div key={step} className="p-5 bg-white rounded-2xl border border-zinc-100 shadow-sm font-black text-zinc-700 text-sm">0{i+1}. {step}</div>
                ))}
            </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'End-to-End GA4 Setup', url: 'https://youtu.be/hsIP4iH25Wg?si=kahtDEdtF6LY7cTU', type: 'video' },
        { title: 'VWO A/B Testing Tutorial', url: 'https://youtu.be/QEqholJ28qI?si=Y7KfY4Sr_eKJUIBn', type: 'video' }
    ]
  },
  {
    day: 23,
    title: 'Understanding APIs for PMs',
    category: 'Tech',
    preview: '“Tech literacy is a PM\'s bridge to engineering success.” Learn how the internet works and why APIs matter.',
    content: (
      <div className="space-y-12">
        <header className="bg-cyan-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">APIs as a PM 🌐</h1>
           <p className="text-cyan-100 text-xl font-bold italic">Building blocks of integrations and extensible products.</p>
        </header>

        <section className="bg-white border-2 border-cyan-100 p-10 rounded-[3rem] space-y-6">
           <h3 className="text-2xl font-black text-zinc-900 mb-6">Learning Objectives</h3>
           <ul className="space-y-4 font-bold text-zinc-700">
               <li>● Explain what APIs are and how they work</li>
               <li>● Identify key API concepts every PM should know</li>
               <li>● Understand API documentation and testing basics</li>
               <li>● Use APIs to inform product strategy and partnerships</li>
           </ul>
        </section>
      </div>
    ),
    resources: [
        { title: 'How the Internet Works (Cloudflare)', url: 'https://www.cloudflare.com/en-in/learning/network-layer/how-does-the-internet-work/', type: 'article' },
        { title: 'API for Product Managers', url: 'https://dune-leek-31a.notion.site/API-for-Product-Managers-24abaab379148074abc3f57b062db2bf', type: 'tool' }
    ]
  },
  {
    day: 24,
    title: 'System Design for PMs',
    category: 'Tech',
    preview: 'Bridge the gap between product vision and technical reality to avoid costly mistakes.',
    content: (
      <div className="space-y-12">
        <header className="bg-zinc-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">System Design 🏗️</h1>
           <p className="text-zinc-400 text-xl font-bold italic text-white text-white">Building Products That Scale</p>
        </header>

        <section className="p-12 bg-white border-4 border-zinc-100 rounded-[4rem] shadow-xl text-zinc-900">
           <h3 className="text-3xl font-black mb-8 text-zinc-950">Why PMs Need This?</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 italic font-bold">"Making realistic roadmap commitments requires understanding technical complexity."</div>
              <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 italic font-bold">"Evaluating build versus buy decisions demands technical literacy."</div>
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'System Design Masterclass', url: 'https://youtu.be/m8Icp_Cid5o?si=u52HzOf12e0cMvyI', type: 'video' }
    ]
  },
  {
    day: 25,
    title: 'UI/UX for Product Managers',
    category: 'Design',
    preview: 'Essential UX & UI Concepts + Practical Usability. Learn to evaluate interfaces using design laws.',
    content: (
      <div className="space-y-12">
        <header className="bg-pink-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">UI/UX Strategy</h1>
           <p className="text-pink-100 text-xl font-bold italic leading-relaxed text-white">"A product is only as good as its experience."</p>
        </header>

        <section className="bg-white border-2 border-pink-100 p-10 rounded-[3rem] shadow-sm space-y-10">
              <h3 className="text-3xl font-black tracking-tight text-zinc-900">Learning Objectives</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Recognize fundamental UX/UI concepts', 'Apply design principles in product discussions', 'Understand how and when to run usability tests', 'Use key visual design laws to evaluate interfaces'].map(goal => (
                   <div key={goal} className="flex items-center gap-4 text-sm font-bold text-zinc-700 bg-pink-50/50 p-4 rounded-xl border border-pink-50">
                      <CheckCircle className="w-5 h-5 text-pink-500" /> {goal}
                   </div>
                ))}
              </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'UX Design Essentials', url: 'https://youtu.be/QJBP2uy8LCU?si=GIa6MA8amS8vYBdd', type: 'video' },
        { title: '12 UI/UX Laws You MUST KNOW', url: 'https://youtu.be/wELfwQmtnvo?si=t7AEn1xVBoB8lPTm', type: 'video' }
    ]
  },
  {
    day: 26,
    title: 'Agile & Scrum Project Management',
    category: 'Strategy',
    preview: 'Master iterative delivery, customer feedback, and adaptability. Learn the roles and ceremonies of Scrum.',
    content: (
      <div className="space-y-12">
        <header className="bg-indigo-800 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Agile & Scrum</h1>
           <p className="text-indigo-200 text-xl font-bold italic leading-relaxed text-white">"Agile isn’t a checklist — it’s a way to deliver value faster."</p>
        </header>

        <section className="p-10 bg-zinc-50 border border-zinc-200 rounded-[3.5rem] space-y-10">
           <h3 className="text-2xl font-black text-indigo-950 px-4">SCRUM ROLES</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { r: 'Product Owner', d: 'Represents the customer, owns the backlog, makes prioritization decisions.' },
                { r: 'Scrum Master', d: 'Facilitates the process, removes impediments, and coaches on Agile.' },
                { r: 'Development Team', d: 'Engineers, designers, QA who build the potentially shippable increment.' }
              ].map(role => (
                <div key={role.r} className="p-8 bg-white rounded-3xl border border-indigo-100 shadow-sm">
                   <h4 className="font-black text-indigo-600 mb-2 uppercase text-xs tracking-widest">{role.r}</h4>
                   <p className="text-xs font-bold text-zinc-500 leading-relaxed italic">{role.d}</p>
                </div>
              ))}
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'Agile & Scrum Intro', url: 'https://youtu.be/WDAQq5vCMME?si=FaBFP9KwcKDsviFh', type: 'video' },
        { title: 'Jira Beginner Tooling', url: 'https://youtu.be/NDVSMIVYxm8?si=GptGyKBY7AlhEZ8', type: 'video' }
    ]
  },
  {
    day: 27,
    title: 'Cloud Computing for PMs',
    category: 'Tech',
    preview: 'Understand IaaS, PaaS, and SaaS models. Master cloud economics, elasticity, and microservices.',
    content: (
      <div className="space-y-12">
        <header className="bg-blue-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Cloud Strategy ☁️</h1>
           <p className="text-blue-200 text-xl font-bold italic leading-relaxed text-white">"The cloud isn't just someone else's computer—it's a paradigm shift."</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { m: 'IaaS', d: 'Raw compute: EC2, GCE, Azure VMs. Max control.' },
                { m: 'PaaS', d: 'Managed platforms: Heroku, App Engine. Speed over config.' },
                { m: 'SaaS', d: 'Complete apps: Salesforce, Slack. Zero infra worries.' }
            ].map(model => (
                <div key={model.m} className="p-8 bg-white border-2 border-blue-100 rounded-3xl shadow-sm">
                    <h4 className="font-black text-blue-800 text-xl mb-2">{model.m}</h4>
                    <p className="text-xs text-zinc-500 font-bold italic">{model.d}</p>
                </div>
            ))}
        </section>
      </div>
    )
  },
  {
    day: 28,
    title: 'What is AI, ML, and DL?',
    category: 'AI',
    preview: 'The modern method for Artificial Intelligence. Learn Supervised, Unsupervised, and Reinforcement Learning.',
    content: (
      <div className="space-y-12">
        <header className="bg-orange-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">AI Foundations 🤖</h1>
           <p className="text-orange-100 text-xl font-bold italic text-white">"ML teaches systems to think like humans by learning from data."</p>
        </header>

        <section className="p-12 bg-white border-4 border-zinc-100 rounded-[4rem] shadow-xl text-center">
            <h3 className="text-3xl font-black mb-8 text-zinc-950">Three Core ML Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                    <div className="text-5xl">📊</div>
                    <h5 className="text-xl font-black uppercase text-orange-600">Supervised</h5>
                    <p className="text-xs font-bold text-zinc-500 italic">Labeled data with known outputs. (Classification/Regression)</p>
                </div>
                <div className="space-y-4">
                    <div className="text-5xl">🔍</div>
                    <h5 className="text-xl font-black uppercase text-orange-600">Unsupervised</h5>
                    <p className="text-xs font-bold text-zinc-500 italic">Unlabeled data. (Clustering/Association)</p>
                </div>
                <div className="space-y-4">
                    <div className="text-5xl">🕹️</div>
                    <h5 className="text-xl font-black uppercase text-orange-600">Reinforcement</h5>
                    <p className="text-xs font-bold text-zinc-500 italic">Trial and error with rewards/penalties.</p>
                </div>
            </div>
        </section>
      </div>
    )
  },
  {
    day: 29,
    title: 'Large Language Models (LLM)',
    category: 'AI',
    preview: 'Deep dive into LLMs like ChatGPT. Learn Statistical Token Simulation, RLHF, and the "Swiss Cheese" capability model.',
    content: (
      <div className="space-y-12">
        <header className="bg-zinc-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">LLM Mastery</h1>
           <p className="text-zinc-400 text-xl font-bold italic leading-relaxed text-white">Statistical Token Simulators and Internet Document Simulators.</p>
        </header>

        <section className="bg-white border-2 border-zinc-100 p-8 rounded-3xl">
            <h4 className="text-xl font-black mb-6 text-zinc-900 uppercase tracking-widest text-xs">LLM Characteristics</h4>
            <div className="space-y-4 font-bold text-zinc-600">
                <p>● <strong>Stochastic & Imperfect:</strong> Relying on probability and sampling.</p>
                <p>● <strong>Hallucinations:</strong> Prone to fabricating information confidently.</p>
                <p>● <strong>Swiss Cheese Capability:</strong> Brilliant in one domain, fail randomly at simple tasks.</p>
            </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'Deep Dive into LLMs (Karpathy)', url: 'https://youtu.be/7xTGNNLPyMI?si=_FGxNCEjJcvyxdAz', type: 'video' }
    ]
  },
  {
    day: 30,
    title: 'Prompt Engineering for PMs',
    category: 'AI',
    preview: 'Learn to write effective prompts to get actionable outputs for ideation, spec writing, and research.',
    content: (
      <div className="space-y-12">
        <header className="bg-orange-500 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Prompt Engineering</h1>
           <p className="text-orange-100 text-xl font-bold italic text-white">"It’s about clear thinking expressed as structured instructions."</p>
        </header>

        <section className="bg-zinc-950 p-10 rounded-[3rem] text-white">
            <h4 className="text-xl font-black mb-8 text-orange-400 text-center uppercase tracking-widest text-xs">Prompt Structure</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {['Role', 'Task', 'Behavior', 'Output Format'].map(item => (
                    <div key={item} className="p-5 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest">{item}</div>
                ))}
            </div>
        </section>
      </div>
    ),
    resources: [
        { title: 'Prompting 101 Video', url: 'https://youtu.be/ysPbXH0LpIE?si=5Riv7IB9ezFAt_Kc', type: 'video' },
        { title: 'AWS Prompting Foundation', url: 'https://share.google/FdZPEVTPVCkN85d33', type: 'tool' }
    ]
  },
  {
    day: 31,
    title: 'Context Engineering',
    category: 'AI',
    preview: 'The natural progression of prompt engineering. Learn to curate and maintain the optimal set of tokens during inference.',
    content: (
        <div className="space-y-12">
            <section className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Context Engineering</h1>
                <p className="text-indigo-200 text-xl font-bold italic text-white text-white">"LLM context window is like RAM, serving as working memory."</p>
            </section>

            <section className="bg-white border-2 border-zinc-100 p-8 rounded-3xl space-y-6">
                <h3 className="text-2xl font-black">Building Capable Agents</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {['Write Context', 'Select Context', 'Compress Context', 'Isolate Context'].map(item => (
                        <div key={item} className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl font-black text-center text-[10px] uppercase tracking-widest">{item}</div>
                    ))}
                </div>
            </section>
        </div>
    )
  },
  {
    day: 32,
    title: 'Retrieval Augmented Generation (RAG)',
    category: 'AI',
    preview: 'Build sophisticated Q&A chatbots by giving LLMs access to private documents. Master chunking and vector databases.',
    content: (
        <div className="space-y-12">
            <header className="bg-zinc-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">RAG Strategy</h1>
                <p className="text-zinc-400 text-xl font-bold italic leading-relaxed text-white">Bridging the gap between LLMs and private data.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { c: 'Retrieval (R)', d: 'Look up internal documents and retrieve information.' },
                    { c: 'Augmenting (A)', d: 'Improve user prompt with retrieved info.' },
                    { c: 'Generation (G)', d: 'LLM generates response based on context.' }
                ].map(item => (
                    <div key={item.c} className="p-8 bg-white border-2 border-indigo-100 rounded-3xl shadow-sm">
                        <h4 className="font-black text-indigo-600 mb-2">{item.c}</h4>
                        <p className="text-xs font-bold text-zinc-500 italic">{item.d}</p>
                    </div>
                ))}
            </section>
        </div>
    )
  },
  {
    day: 33,
    title: 'Model Context Protocol (MCP)',
    category: 'AI',
    preview: 'Think of MCP like a USB-C port for AI. Standardize how models communicate with tools and context providers safely.',
    content: (
        <div className="space-y-12">
            <header className="bg-indigo-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">MCP 🔌</h1>
                <p className="text-indigo-200 text-xl font-bold italic leading-relaxed text-white">Standardizing AI application connectivity.</p>
            </header>

            <section className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-sm">
                <h3 className="text-2xl font-black mb-6">Why MCP Exists?</h3>
                <p className="text-lg text-zinc-600 italic">"RAG and Plugins tried to solve this, but each had limitations: text chunks only, difficult to reuse, and brittle integrations."</p>
            </section>
        </div>
    )
  },
  {
    day: 34,
    title: 'Introduction to Agent Workflow',
    category: 'AI',
    preview: 'Design AI systems that execute series of steps iteratively. Master task decomposition and varying degrees of autonomy.',
    content: (
        <div className="space-y-12">
            <header className="bg-zinc-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Agentic AI Workflows</h1>
                <p className="text-indigo-400 text-xl font-bold italic text-white">Mimicking complex human problem-solving stages.</p>
            </header>

            <section className="bg-zinc-50 p-10 rounded-[3rem] space-y-8">
                <h3 className="text-2xl font-black">Degrees of Autonomy</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bold text-zinc-600">
                    <div className="p-6 bg-white rounded-2xl border">Less Autonomous: Predefined steps.</div>
                    <div className="p-6 bg-white rounded-2xl border">Semi-Autonomous: Decisions on tools.</div>
                    <div className="p-6 bg-white rounded-2xl border">Highly Autonomous: Dynamic planning.</div>
                </div>
            </section>
        </div>
    ),
    resources: [
        { title: 'Agentic AI Course (DeepLearning.ai)', url: 'https://www.deeplearning.ai/courses/agentic-ai/', type: 'tool' }
    ]
  },
  {
    day: 35,
    title: 'AI Agents for Product Managers',
    category: 'AI',
    preview: 'Learn to build agents using LangChain or AutoGPT. Understand why direct experience with failure modes is crucial.',
    content: (
        <div className="space-y-12">
            <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">Building AI Agents</h1>
                <p className="text-indigo-100 text-xl font-bold italic text-white text-white">Move from prompts to autonomous systems.</p>
            </header>

            <section className="p-10 bg-zinc-950 rounded-[4rem] text-white">
                <h3 className="text-2xl font-black mb-8 text-indigo-400 text-center uppercase tracking-widest text-xs">Types of Agents</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {['Simple Reflex', 'Model-based', 'Goal-based', 'Utility-based'].map(item => (
                        <div key={item} className="p-5 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest">{item}</div>
                    ))}
                </div>
            </section>
        </div>
    ),
    resources: [
        { title: 'AI Agent Course', url: 'https://youtu.be/ZHH3sr234zY?si=5qMS4pLlfl2gYaDs', type: 'video' }
    ]
  },
  {
    day: 36,
    title: 'Building Proof of Work: No-Code',
    category: 'Tech',
    preview: 'Why aspiring PMs must ship. Learn to use Replit, Lovable, Claude, and Vercel to build real products.',
    content: (
        <div className="space-y-12">
            <header className="bg-zinc-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Proof of Work 🛠️</h1>
                <p className="text-zinc-400 text-xl font-bold italic text-white">Hiring managers prioritize demonstrated ability over potential.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-4">
                    <h4 className="text-xl font-black">Modern No-Code Stack</h4>
                    <ul className="text-sm font-medium text-zinc-500 space-y-2 italic">
                        <li>● <strong>Lovable:</strong> Complete web apps from prompts.</li>
                        <li>● <strong>Replit:</strong> AI-powered dev environment.</li>
                        <li>● <strong>Vercel:</strong> Zero-config deployment.</li>
                        <li>● <strong>Zapier/Make:</strong> Business workflow automation.</li>
                    </ul>
                </div>
                <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 italic font-bold text-indigo-900">
                    "Better to ship ten small projects than spend six months on one ambitious product you never finish."
                </div>
            </section>
        </div>
    )
  },
  {
    day: 37,
    title: 'Structured Product Teardowns',
    category: 'Strategy',
    preview: 'Reverse-engineer digital products to extract insights. Demonstrate analytical rigor and product sense.',
    content: (
        <div className="space-y-12">
            <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">Product Teardowns</h1>
                <p className="text-indigo-100 text-xl font-bold italic text-white">"Reverse-engineer to understand how it works and WHY."</p>
            </header>

            <section className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-sm">
                <h3 className="text-2xl font-black mb-6">Core Teardown Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-zinc-600 italic">
                    <div>✔️ Product Sense (Feature Interpretations)</div>
                    <div>✔️ User Empathy (Pains & Motivations)</div>
                    <div>✔️ Strategic Thinking (Business Goals)</div>
                    <div>✔️ Communication (Clarity of Insights)</div>
                </div>
            </section>
        </div>
    ),
    resources: [
        { title: 'The Stare: Case Studies', url: 'https://thestare.in/case-studies', type: 'article' },
        { title: 'What is a Product Teardown?', url: 'https://youtu.be/3cqHleDYgys', type: 'video' }
    ]
  },
  {
    day: 38,
    title: 'Startup Case Studies for PM Jobs',
    category: 'Strategy',
    preview: 'Pick the right startup, define scope, map the journey, and identify high-impact problems.',
    content: (
        <div className="space-y-12">
            <header className="bg-emerald-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Startup Case Studies</h1>
                <p className="text-emerald-100 text-xl font-bold italic text-white">Proof of product thinking, not a presentation exercise.</p>
            </header>

            <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
                <h4 className="text-xl font-black mb-6">Process Checklist</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold text-zinc-700">
                    <div>1. Pick the Right Startup (Live/Usable)</div>
                    <div>2. Define Scope (Don't do everything)</div>
                    <div>3. Map the User Journey</div>
                    <div>4. Root Cause Analysis (5 Whys)</div>
                </div>
            </section>
        </div>
    )
  },
  {
    day: 39,
    title: 'Building a Strong PM Portfolio',
    category: 'Strategy',
    preview: 'Master the About section, project showcases, certifications, and testimonials that land interviews.',
    content: (
        <div className="space-y-12">
            <header className="bg-indigo-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden text-white">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">PM Portfolio Mastery</h1>
                <p className="text-indigo-200 text-xl font-bold italic text-white">"Show, don't just tell, your product management value."</p>
            </header>

            <section className="bg-white border-2 border-zinc-100 p-10 rounded-[3rem] shadow-sm">
                <h3 className="text-2xl font-black mb-6">Key Portfolio Elements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 italic font-bold text-zinc-500">
                    <div>● User-Centric About Section</div>
                    <div>● Proof of Work (Teardowns)</div>
                    <div>● Validated Certifications</div>
                </div>
            </section>
        </div>
    )
  },
  {
    day: 40,
    title: 'CV Building & LinkedIn Optimization',
    category: 'Strategy',
    preview: 'Optimize your profile for the 7-10 second recruiter scan. Use AI to refine your headline and about section.',
    content: (
        <div className="space-y-12">
            <header className="bg-zinc-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white text-white">Career Optimization</h1>
                <p className="text-zinc-400 text-xl font-bold italic text-white">Increasing search visibility and credibility signaling.</p>
            </header>

            <section className="bg-white border-2 border-zinc-100 p-10 rounded-[3rem] space-y-8">
                <h3 className="text-2xl font-black">Analysis Framework</h3>
                <ul className="space-y-2 font-bold text-zinc-600">
                    <li>1. Headline (SEO-first)</li>
                    <li>2. About (Value Proposition)</li>
                    <li>3. Experience (Outcomes > Responsibilities)</li>
                    <li>4. Skills Audit (Target relevance)</li>
                </ul>
            </section>
        </div>
    ),
    resources: [
        { title: 'Resume Worded (ATS Check)', url: 'https://resumeworded.com/', type: 'tool' }
    ]
  },
  {
    day: 41,
    title: 'Applying to Jobs & Referrals',
    category: 'Strategy',
    preview: 'Learn the right platforms and outreach messages. Follow-up tips to get shortlisted at top companies.',
    content: (
        <div className="space-y-12">
            <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">Job Hunt Strategy</h1>
                <p className="text-indigo-100 text-xl font-bold italic text-white">"Lead with insight and thoughtfulness, not just asks."</p>
            </header>

            <section className="p-10 bg-zinc-50 border border-zinc-200 rounded-[3.5rem] space-y-6">
                <h4 className="text-xl font-black uppercase tracking-widest text-xs text-zinc-400">Top Platforms</h4>
                <p className="font-black text-indigo-700">Linkedin | Wellfound | Ycombinator jobs | Instahyre</p>
            </section>
        </div>
    )
  },
  {
    day: 42,
    title: 'Interview Prep: Case & Product Sense',
    category: 'Strategy',
    preview: 'Master depth of analysis, assumptions, and prioritisation. Practice designing for Google, Atlassian, and Meta.',
    content: (
        <div className="space-y-12">
            <header className="bg-zinc-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white">Interview Prep (Part 1)</h1>
                <p className="text-zinc-400 text-xl font-bold italic text-white">Depth of analysis and clarity of communication.</p>
            </header>

            <section className="bg-white border-2 border-zinc-100 p-10 rounded-[3rem] space-y-6 shadow-sm">
                <h3 className="text-2xl font-black">Practice Questions</h3>
                <ul className="space-y-4 italic font-bold text-zinc-500">
                    <li>● Design a movie-booking app for elderly users (Flipkart)</li>
                    <li>● Design a Google Pixel tablet for restaurants (Google)</li>
                    <li>● Design a TV remote for older people (Netflix)</li>
                </ul>
            </section>
        </div>
    ),
    resources: [
        { title: 'Product Sense Round Prep', url: 'https://youtu.be/tlpfb_VsogA?si=VMQtzA2CME3KtR1z', type: 'video' }
    ]
  },
  {
    day: 43,
    title: 'Interview Prep: RCA & Guestimates',
    category: 'Strategy',
    preview: 'Learn to solve "Sudden revenue drop" and "Number of tube lights" problems with structured frameworks.',
    content: (
        <div className="space-y-12">
            <section className="p-8 bg-zinc-50 border border-zinc-200 rounded-[3rem] space-y-6">
                <h4 className="text-2xl font-black">Round Three: RCA (Root Cause Analysis)</h4>
                <ul className="space-y-2 font-bold text-zinc-600 italic">
                    <li>● Drop in average watch time by 30% (Netflix)</li>
                    <li>● Increase in returns at Amazon (Amazon)</li>
                </ul>
            </section>
            <section className="p-8 bg-indigo-900 rounded-[3rem] text-white shadow-xl">
                <h4 className="text-2xl font-black text-indigo-400 mb-4">Round Four: Guestimates</h4>
                <p className="italic text-indigo-200">"Number of tube lights in Bangalore or Tennis balls in an airplane."</p>
            </section>
        </div>
    ),
    resources: [
        { title: 'RCA Mastery', url: 'https://youtu.be/PA-Z__0G8Cs?si=DjJ7mkmdWhzpYU6l', type: 'video' },
        { title: 'Guestimates Framework', url: 'https://youtu.be/7C0L_XdIE50?si=bxBFIUcsJEFUsSqr', type: 'video' }
    ]
  },
  {
    day: 44,
    title: 'Interview Prep: Product Improvement',
    category: 'Strategy',
    preview: 'Learn how to improve Netflix, Spotify, or Gmail. Answer "What would you improve in your favorite product?".',
    content: (
        <div className="space-y-12">
            <header className="bg-indigo-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white">Product Improvement</h1>
                <p className="text-indigo-100 text-xl font-bold italic text-white text-white">Learn to evaluate and evolve existing success stories.</p>
            </header>
        </div>
    ),
    resources: [
        { title: 'Product Improvement Round', url: 'https://youtu.be/Fhm0F240v9Y?si=Sqp9VhYoenUKYcw7', type: 'video' }
    ]
  },
  {
    day: 45,
    title: 'Interview Prep: Behavioral Rounds',
    category: 'Strategy',
    preview: 'Final behavioral round preparation. Course conclusion and feedback loop for continuous learning.',
    content: (
        <div className="space-y-12 text-center">
            <div className="p-12 bg-white border-2 border-zinc-100 rounded-[4rem] shadow-xl space-y-8">
                <h2 className="text-4xl font-black text-zinc-900 tracking-tighter">Congratulations! 🎓</h2>
                <p className="text-xl text-zinc-600 italic">"You've completed the 45-day PM Launchpad journey."</p>
                <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
                    <h4 className="text-2xl font-black text-indigo-900 mb-4">Final Feedback</h4>
                    <p className="text-zinc-600 mb-6 font-medium">We hope you liked the course, please help us by your valuable feedback.</p>
                    <a href="https://docs.google.com/forms/d/14esag07MESDVDzUmHGRFWyGfSkahwky18qZmW36_ooQ/preview" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 shadow-lg transition-all">
                        Take Feedback Survey
                    </a>
                </div>
            </div>
        </div>
    ),
    resources: [
        { title: 'Behavioral Rounds Part 1', url: 'https://youtu.be/1rOcpwcDTuY?si=GXoS-FRzroxPPJ0U', type: 'video' },
        { title: 'Behavioral Rounds Part 2', url: 'https://youtu.be/Wyvm8vcsaP0?si=JeY3xJKXWfRrGCXG', type: 'video' }
    ]
  }
];

export const DayCard: React.FC<{ lesson: Lesson; index: number }> = ({ lesson, index }) => {
  return (
    <div className="group relative bg-white rounded-[2.8rem] border border-zinc-100 p-2 h-full flex flex-col transition-all duration-700 hover:border-indigo-100 hover:shadow-[0_32px_64px_rgba(79,70,229,0.12)] cursor-pointer overflow-hidden">
        <div className="flex flex-col h-full rounded-[2.4rem] p-8 bg-white group-hover:bg-indigo-50/20 transition-colors duration-500">
            <div className="flex justify-between items-center mb-8">
                <span className={`text-[10px] px-3.5 py-2 rounded-full font-black uppercase tracking-widest flex items-center gap-2 border ${getCategoryColor(lesson.category)} shadow-sm`}>
                   {getCategoryIcon(lesson.category)}
                   {lesson.category}
                </span>
                <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-indigo-600 transition-colors">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-black tracking-tight">15m read</span>
                </div>
            </div>

            <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-zinc-900 text-white text-[9px] font-black uppercase tracking-widest mb-4">
                   <ShieldCheck className="w-3 h-3 text-indigo-400" />
                   Day {lesson.day}
                </div>
                <h3 className="font-black text-2xl leading-[1.1] transition-colors line-clamp-2 text-zinc-900 group-hover:text-indigo-600 tracking-tighter text-zinc-900">
                    {lesson.title}
                </h3>
            </div>

            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-10 flex-grow font-medium text-zinc-500">
                {lesson.preview}
            </p>

            <div className="mt-auto pt-8 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[12px] font-black text-zinc-400 group-hover:text-indigo-600 transition-colors tracking-[0.15em] uppercase">
                    Launch Lesson
                </span>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 bg-zinc-50 text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                    <ArrowRight className="w-6 h-6" />
                </div>
            </div>
        </div>
    </div>
  );
};
