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
  Music, UserCheck, ClipboardList as ClipboardIcon, Clock
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
        <header className="bg-zinc-950 p-12 rounded-[3rem] border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">
            <Clock className="w-4 h-4" /> 45 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">Foundation & Mindset</h1>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed">Start Your PM Journey Right 🚀. Before we jump into frameworks, tools, and case studies, today is about building the right mindset.</p>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Day-0: Foundation & Mindset — Start Your PM Journey Right 🚀</h2>
          <p className="text-lg text-zinc-800 leading-relaxed font-bold">Welcome to Day-0 of learning Product Management from scratch! Before we jump into frameworks, tools, and case studies, today is about building the right mindset to succeed as a Product Manager.</p>
          <div className="p-10 bg-indigo-50 border border-indigo-200 rounded-[3rem] shadow-sm">
            <p className="text-xl font-black text-indigo-950 leading-relaxed mb-6">Product Management is one of the most competitive and rewarding careers today. But breaking into PM without prior experience can feel overwhelming because the role demands:</p>
            <ul className="space-y-4">
              {['Cross-functional collaboration', 'Strategic thinking & decision-making', 'Problem-solving with ambiguity', 'Understanding of business, design, tech & data'].map(item => (
                <li key={item} className="flex items-center gap-4 text-indigo-900 font-black text-lg">
                  <CheckCircle className="w-6 h-6 text-indigo-600 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-zinc-700 text-xl font-medium italic">Many aspiring PMs struggle not because they lack skills, but because they lack clarity of purpose and direction.</p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Why Day-0 Matters</h2>
          <p className="text-xl text-zinc-800 leading-relaxed font-medium">Before learning “how to be a PM”, you must understand why you want to be a PM. PMs face pressure, ownership, ambiguity, and constant context switching — your motivation will keep you going when it gets hard.</p>
          <div className="p-10 bg-zinc-900 rounded-[3rem] text-white space-y-6 shadow-2xl">
            <p className="text-xl font-black text-indigo-400">Understanding the reality of the role—not just the glamour—helps you evaluate:</p>
            <ul className="space-y-4 text-lg font-bold">
              <li>• Is PM aligned with your strengths & interests?</li>
              <li>• Do you enjoy solving problems and talking to users?</li>
              <li>• Are you comfortable making decisions without perfect data?</li>
            </ul>
          </div>
          <p className="text-xl text-zinc-800 font-bold leading-relaxed">The fastest way to answer these questions is to talk to real PMs, understand their challenges, impact, and day-to-day responsibilities.</p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Reflection Exercise</h2>
          <p className="text-xl text-zinc-800 font-bold mb-6">Write answers to these 3 questions:</p>
          <div className="space-y-6">
            <div className="p-8 bg-white border-2 border-zinc-200 rounded-[2rem] shadow-sm text-xl font-black text-zinc-900">1. Why do I want to become a Product Manager?</div>
            <div className="p-8 bg-white border-2 border-zinc-200 rounded-[2rem] shadow-sm text-xl font-black text-zinc-900">2. What strengths do I already have that can help me succeed?</div>
            <div className="p-8 bg-white border-2 border-zinc-200 rounded-[2rem] shadow-sm text-xl font-black text-zinc-900">3. What areas do I need to improve over the next 45 days?</div>
          </div>
          <p className="text-center py-10 text-indigo-600 font-black uppercase tracking-[0.3em] text-sm">Clarity today will drive consistency tomorrow.</p>
        </section>

        <section className="bg-emerald-50 border border-emerald-200 p-12 rounded-[3.5rem] space-y-8 shadow-sm">
          <h2 className="text-3xl font-black text-emerald-950 tracking-tight">Outcome of Day-0</h2>
          <p className="text-xl text-emerald-900 font-bold">By the end of today, you should have:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Real understanding of what PM is', 'Motivation aligned with reality', 'Early networking with professionals', 'A clear starting point for the course'].map(item => (
              <li key={item} className="flex items-center gap-4 text-emerald-950 font-black text-lg">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-8">
        <div className="p-12 bg-white border-2 border-indigo-200 rounded-[3.5rem] shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl"><ClipboardIcon className="w-8 h-8" /></div>
            <h3 className="text-3xl font-black text-zinc-900 tracking-tight">Task 1 — Must Do Today</h3>
          </div>
          <p className="text-2xl text-zinc-800 font-black leading-relaxed mb-6">Reach out to 5 Product Managers and ask them about their journey & role.</p>
          <p className="text-xl text-zinc-500 font-bold mb-10">Use LinkedIn, alumni networks, or company communities.</p>
          <div className="bg-zinc-950 p-10 rounded-[2.5rem] border border-zinc-800">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-4 text-indigo-400">Goal</p>
            <p className="text-xl font-bold text-white leading-relaxed">Collect insights and note patterns. This will guide your expectations.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    day: 1,
    title: 'What is Product Management? 🚀',
    category: 'Foundations',
    preview: 'Understand the role, responsibilities, types, and myths about Product Management.',
    content: (
      <div className="space-y-16">
        <header className="bg-zinc-950 p-12 rounded-[3rem] border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">
            <Clock className="w-4 h-4" /> 45 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">What is Product Management? 🚀</h1>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed">Understand the role, responsibilities, types, and myths about Product Management.</p>
        </header>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">1. What is a Product?</h2>
          <p className="text-xl text-zinc-800 leading-relaxed font-bold">A product is anything that creates value by solving a real user problem or fulfilling a need—whether physical, digital, or service-based.</p>
          <div className="flex flex-wrap gap-4 pt-4">
            {['Uber', 'Spotify', 'iPhone', 'Google Ads', 'ATM', 'WhatsApp'].map(tag => (
              <span key={tag} className="px-8 py-4 bg-zinc-900 text-white rounded-[1.5rem] text-sm font-black tracking-tight shadow-md">{tag}</span>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">2. Do Companies Need Product Managers?</h2>
          <p className="text-2xl font-black text-indigo-600 leading-tight">Short answer: Yes—but the title isn’t always necessary. Product thinking is.</p>
          <div className="space-y-6">
            <h4 className="text-xl font-black text-zinc-800 tracking-tight">Why PMs emerge: Company Growth Stages</h4>
            <div className="overflow-hidden rounded-[3rem] border-2 border-zinc-100 shadow-2xl bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="p-8 font-black text-xs uppercase tracking-widest">Stage</th>
                    <th className="p-8 font-black text-xs uppercase tracking-widest">Who acts as PM</th>
                    <th className="p-8 font-black text-xs uppercase tracking-widest">Why it works</th>
                    <th className="p-8 font-black text-xs uppercase tracking-widest">When it breaks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-bold text-lg">
                  <tr>
                    <td className="p-8 text-zinc-950 font-black">Early startup</td>
                    <td className="p-8 text-indigo-600">Founder</td>
                    <td className="p-8 text-zinc-600 text-sm font-bold">Small team, fast decisions, direct feedback</td>
                    <td className="p-8 text-rose-600 text-sm font-black">Complexity increases, decisions overload</td>
                  </tr>
                  <tr>
                    <td className="p-8 text-zinc-950 font-black">Growth stage</td>
                    <td className="p-8 text-indigo-600">Dedicated PMs</td>
                    <td className="p-8 text-zinc-600 text-sm font-bold">Align teams, prioritize impact, execution</td>
                    <td className="p-8 text-rose-600 text-sm font-black">Without PMs: confusion, misalignment</td>
                  </tr>
                  <tr>
                    <td className="p-8 text-zinc-950 font-black">Large enterprise</td>
                    <td className="p-8 text-indigo-600">Product org with PM leaders</td>
                    <td className="p-8 text-zinc-600 text-sm font-bold">Scale, governance, coordination</td>
                    <td className="p-8 text-rose-600 text-sm font-black">Without PMs: feature bloat, chaos, slow</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">3. Real-World Exceptions</h2>
          <p className="text-xl text-zinc-800 font-black">Some companies have succeeded without formal PMs:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-white border-2 border-zinc-100 rounded-[2.5rem] shadow-sm text-center">
              <h4 className="font-black text-zinc-950 text-xl mb-2">Basecamp</h4>
              <p className="text-sm text-zinc-500 font-black">Design-led product development</p>
            </div>
            <div className="p-10 bg-white border-2 border-zinc-100 rounded-[2.5rem] shadow-sm text-center">
              <h4 className="font-black text-zinc-950 text-xl mb-2">Valve</h4>
              <p className="text-sm text-zinc-500 font-black">Self-organized teams</p>
            </div>
            <div className="p-10 bg-white border-2 border-zinc-100 rounded-[2.5rem] shadow-sm text-center">
              <h4 className="font-black text-zinc-950 text-xl mb-2">Early FB / Stripe</h4>
              <p className="text-sm text-zinc-500 font-black">Engineer-led decisions</p>
            </div>
          </div>
          <div className="p-12 bg-emerald-50 border-4 border-dashed border-emerald-200 rounded-[3.5rem] text-center shadow-inner">
            <p className="text-emerald-950 font-black text-2xl">👉 These work only when everyone practices product thinking: user obsession + data + trade-offs + execution focus.</p>
          </div>
        </section>

        <section className="space-y-10">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">4. What is Product Management?</h2>
          <p className="text-xl text-zinc-800 leading-relaxed font-bold">Product Management is the function responsible for guiding a product from idea → launch → growth → scale by balancing:</p>
          <p className="text-3xl md:text-4xl font-black text-zinc-950 text-center tracking-tight italic leading-tight py-12">"PMs don’t decide how to build — they decide what to build and why."</p>
        </section>

        <section className="space-y-10">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">5. The PM Equation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-white border-2 border-zinc-100 rounded-[2.5rem] space-y-4 shadow-sm">
              <h4 className="text-2xl font-black text-zinc-950">Business</h4>
              <p className="text-lg text-zinc-600 font-black leading-relaxed">Revenue, success metrics, GTM strategy.</p>
            </div>
            <div className="p-10 bg-white border-2 border-zinc-100 rounded-[2.5rem] space-y-4 shadow-sm">
              <h4 className="text-2xl font-black text-zinc-950">Design</h4>
              <p className="text-lg text-zinc-600 font-black leading-relaxed">User experience & usability focus.</p>
            </div>
            <div className="p-10 bg-white border-2 border-zinc-100 rounded-[2.5rem] space-y-4 shadow-sm">
              <h4 className="text-2xl font-black text-zinc-950">Tech</h4>
              <p className="text-lg text-zinc-600 font-black leading-relaxed">Feasibility & backend system thinking.</p>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">6. PM Responsibilities</h2>
          <div className="bg-white border-2 border-zinc-200 rounded-[3.5rem] overflow-hidden shadow-2xl">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-zinc-50 border-b-2 border-zinc-100">
                   <th className="p-8 font-black text-xs uppercase tracking-widest text-zinc-500">Area</th>
                   <th className="p-8 font-black text-xs uppercase tracking-widest text-zinc-500">What it includes</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-zinc-100 font-black text-xl">
                 {[
                   { area: 'User understanding', detail: 'Research, interviews, personas, feedback' },
                   { area: 'Problem definition', detail: 'Insights, hypotheses, opportunity sizing' },
                   { area: 'Prioritization', detail: 'RICE, MoSCoW, Kano frameworks' },
                   { area: 'Strategy & Roadmapping', detail: 'Vision, goals, milestones, timelines' },
                   { area: 'Execution & Delivery', detail: 'PRDs, user stories, cross-functional collab' },
                   { area: 'Analytics & Learning', detail: 'KPI tracking, experiments, iterations' },
                   { area: 'Communication', detail: 'Stakeholders, presentations, influence' }
                 ].map((row, i) => (
                   <tr key={i} className="hover:bg-zinc-50 transition-colors">
                      <td className="p-8 text-zinc-950">{row.area}</td>
                      <td className="p-8 text-zinc-500 font-bold">{row.detail}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </section>

        <section className="space-y-12">
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">7. Types of Product Managers & Why They Exist 🔍</h2>
            <p className="text-xl text-zinc-800 leading-relaxed font-bold">As products scale, complexity grows — more users, more data, and deeper specialization needs. While an early-stage PM owns everything, a scaled organization requires specialization for efficiency.</p>
          </div>

          <div className="space-y-12">
            {[
              { id: '1', title: 'Core Product Manager', subtitle: 'The Generalist', focus: 'End-to-end ownership of user-facing product experiences.', res: ['Define product vision & roadmap', 'User research & problem discovery', 'Prioritization & PRD writing', 'Collaborate with engineering & design', 'Track adoption & engagement metrics'], ex: 'Swiggy improving checkout conversion from 85% → 92%', ns: 'Retention, Adoption, NPS, DAU' },
              { id: '2', title: 'Growth Product Manager', subtitle: 'The Optimizer', focus: 'Driving acquisition, activation, retention & revenue.', res: ['Funnel optimization & loops', 'A/B testing & experimentation', 'Work closely with marketing & analytics', 'Monetization strategy'], ex: 'Duolingo improving daily streak feature → +15% retention', ns: 'DAU/MAU, Conversion Rate, LTV, Churn' },
              { id: '3', title: 'Platform Product Manager', subtitle: 'The Enabler', focus: 'Internal systems, APIs & developer experience.', res: ['Build scalable internal platforms (auth, notifications, payments)', 'Align engineering teams & reliability goals', 'Reduce build time and dependency blocks'], ex: 'Razorpay building unified payments gateway API', ns: 'API Uptime, Latency, Integration Adoption' },
              { id: '4', title: 'Data Product Manager', subtitle: 'The Analyst PM', focus: 'Data pipelines, dashboards & experimentation framework.', res: ['Define tracking & data schemas', 'Partner with DS/ML teams', 'Ensure data quality & governance', 'Enable insight-driven decisions'], ex: 'Meesho enabling real-time retention dashboards', ns: 'Data accuracy, Latency, Dashboard usage' },
              { id: '5', title: 'Technical Product Manager', subtitle: 'TPM', focus: 'Highly technical systems & integrations.', res: ['Translate business requirements → architecture requirements', 'Manage APIs, backend integrations & scalability', 'Balance tech debt & feature delivery'], ex: 'Slack launching developer API endpoints', ns: 'Reliability, Integration success, Performance' },
              { id: '6', title: 'AI Product Manager', subtitle: 'The Intelligent Builder', focus: 'Products powered by machine learning & generative AI.', res: ['Identify opportunities for AI impact', 'Work with ML engineers on model lifecycle: data → training → deployment', 'Ensure responsible, bias-free AI behavior', 'Convert technical model metrics → business metrics'], skills: ['ML fundamentals', 'Prompt engineering', 'Model testing & iteration'], ex: 'Netflix personalization engine → +15% viewing time', ns: 'Model accuracy, Usage, Adoption' }
            ].map((type) => (
              <div key={type.id} className="p-10 md:p-14 bg-zinc-50 border-2 border-zinc-200 rounded-[3.5rem] shadow-sm flex flex-col md:flex-row gap-12 group transition-all hover:bg-white hover:shadow-xl">
                <div className="flex-1 space-y-8">
                  <div>
                    <h4 className="text-3xl font-black text-zinc-950">{type.id}. {type.title}</h4>
                    <p className="text-sm font-black text-indigo-600 uppercase tracking-widest mt-1">{type.subtitle}</p>
                  </div>
                  <p className="text-xl text-zinc-600 font-black italic leading-relaxed">{type.focus}</p>
                  <div className="space-y-4">
                    <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Responsibilities</p>
                    <ul className="text-lg font-bold text-zinc-800 space-y-2">
                      {type.res.map((r, i) => <li key={i}>• {r}</li>)}
                    </ul>
                    {type.skills && (
                      <>
                        <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mt-6">Key Skills</p>
                        <ul className="text-lg font-bold text-zinc-800 space-y-2">
                          {type.skills.map((s, i) => <li key={i}>• {s}</li>)}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-full md:w-1/3 flex flex-col gap-6 self-start md:self-stretch">
                  <div className="bg-white p-8 rounded-[2rem] border-2 border-zinc-100 shadow-sm flex-1">
                     <p className="text-[11px] font-black text-zinc-400 uppercase mb-4 tracking-widest">Real Example</p>
                     <p className="text-xl font-black text-zinc-950 leading-tight">{type.ex}</p>
                  </div>
                  <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-lg text-white">
                     <p className="text-[11px] font-black text-indigo-200 uppercase mb-3 tracking-widest">North Star Metrics</p>
                     <p className="text-lg font-black">{type.ns}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight text-center">8. PM Deliverables</h2>
          <div className="space-y-6">
             {[
               { icon: <FileText className="w-8 h-8" />, title: 'PRD', desc: 'Clarifies what & why for teams', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
               { icon: <Milestone className="w-8 h-8" />, title: 'Roadmap', desc: 'Timeline of priorities & goals', color: 'bg-blue-50 text-blue-600 border-blue-100' },
               { icon: <MessageSquare className="w-8 h-8" />, title: 'User Stories', desc: 'Smallest unit of work detail', color: 'bg-purple-50 text-purple-600 border-purple-100' },
               { icon: <Activity className="w-8 h-8" />, title: 'Metrics Dashboard', desc: 'Tracks feature health & success', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
               { icon: <Rocket className="w-8 h-8" />, title: 'GTM / Launch Plan', desc: 'Strategy for market entry', color: 'bg-orange-50 text-orange-600 border-orange-100' }
             ].map((d, i) => (
               <div key={i} className={`flex flex-col md:flex-row items-center gap-6 p-10 border-2 rounded-[3rem] shadow-sm transition-all hover:shadow-md bg-white border-zinc-100`}>
                  <div className={`p-6 rounded-[2rem] ${d.color} shrink-0`}>
                    {d.icon}
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <h4 className="font-black text-2xl tracking-tighter text-zinc-950">{d.title}</h4>
                    <p className="text-xl text-zinc-500 font-bold leading-tight">{d.desc}</p>
                  </div>
                  <div className="hidden md:block">
                    <ArrowRight className="w-8 h-8 text-zinc-200" />
                  </div>
               </div>
             ))}
          </div>
        </section>

        <section className="bg-rose-50 border-4 border-rose-200 p-16 rounded-[4rem] space-y-12 shadow-xl">
           <h2 className="text-4xl font-black text-rose-950 tracking-tighter text-center">Myths vs Reality</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
              {[
                { m: '“PMs are the boss of the team.”', r: 'PMs have no authority — influence only.' },
                { m: '“PMs must know how to code.”', r: 'Not required, but tech literacy is crucial.' },
                { m: '“PMs only build new features.”', r: 'PMs solve problems. Sometimes by removing features.' },
                { m: '“PMs manage timelines.”', r: "That's project management. PMs define what & why." }
              ].map((item, i) => (
                <div key={i} className="space-y-4">
                   <p className="text-3xl font-black text-rose-950 leading-tight">{item.m}</p>
                   <p className="text-xl font-bold text-rose-800 opacity-90">{item.r}</p>
                </div>
              ))}
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-12">
        <div className="p-16 bg-white border-4 border-indigo-200 rounded-[4rem] shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200"><Target className="w-10 h-10" /></div>
               <h4 className="text-4xl font-black text-zinc-950 tracking-tighter">🎯 Day-1 Mini Assignment</h4>
            </div>
            <p className="text-xl text-zinc-500 font-black uppercase tracking-widest">Assignment</p>
          </div>
          <p className="text-3xl text-zinc-800 font-black mb-12 leading-relaxed">Pick a product you use daily (e.g., Spotify, Zomato, Notion, Cred) and answer:</p>
          <div className="p-12 bg-zinc-950 rounded-[3rem] border-4 border-zinc-800 shadow-2xl">
             <p className="text-white font-black uppercase tracking-[0.4em] text-[12px] mb-10 opacity-50">Submission Format</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-indigo-400 font-mono text-xl">
                <div className="space-y-2"><span>Product Name: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
                <div className="space-y-2"><span>User Problem: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
                <div className="space-y-2"><span>Key Metrics: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
                <div className="space-y-2"><span>Improvement Suggestion: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
             </div>
          </div>
        </div>

        <div className="p-16 bg-zinc-900 text-white rounded-[4rem] shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-600 rounded-full blur-[150px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
           <h4 className="text-4xl font-black mb-10 tracking-tighter flex items-center gap-4">
             <Sparkles className="w-10 h-10 text-indigo-400" />
             Reflection Task
           </h4>
           <p className="text-zinc-300 text-2xl leading-relaxed font-black">
              Identify which of the 6 PM types excites you the most and why. Does it align with your current background (e.g., Engineer → TPM, Marketing → Growth)?
           </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 p-8 bg-zinc-100 rounded-3xl border border-zinc-200">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Previous</p>
            <p className="text-xl font-black text-zinc-900">Foundation & Mindset</p>
          </div>
          <div className="flex-1 p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-2">Up Next</p>
            <p className="text-xl font-black">The Product Development Lifecycle (PDLC) 📘</p>
          </div>
        </div>
      </div>
    )
  },
  {
    day: 2,
    title: 'The Product Development Lifecycle (PDLC) 📘',
    category: 'Foundations',
    preview: 'Theme: How products move from idea → design → build → launch → iterate.',
    content: (
      <div className="space-y-16">
        <header className="bg-zinc-950 p-12 rounded-[3rem] border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">
            <Clock className="w-4 h-4" /> 45 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">The Product Development Lifecycle (PDLC) 📘</h1>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed">Theme: How products move from idea → design → build → launch → iterate.</p>
        </header>

        <section className="space-y-10">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">The Product Development Lifecycle (PDLC)</h2>
          <div className="flex flex-wrap gap-4 pt-4">
            {['DISCOVERY', 'DEFINITION', 'DESIGN', 'DEVELOPMENT', 'LAUNCH', 'ITERATION'].map((tag, i) => (
              <div key={tag} className="flex items-center gap-2">
                <span className="px-8 py-4 bg-zinc-900 text-white rounded-[1.5rem] text-sm font-black tracking-tight shadow-md uppercase">{tag}</span>
                {i < 5 && <ArrowRight className="w-5 h-5 text-zinc-300" />}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 border-4 border-blue-100 p-12 rounded-[3.5rem] space-y-8 shadow-sm">
          <h2 className="text-3xl font-black text-blue-950 tracking-tight">Learning Objectives</h2>
          <p className="text-xl text-blue-900 font-bold">By the end of today, you will:</p>
          <ul className="space-y-4">
            {['Understand the full lifecycle of product development', 'Know what happens at every stage & what PMs contribute', 'Learn common outputs, tools, and real examples', 'Avoid the typical mistakes that junior PMs make'].map(item => (
              <li key={item} className="flex items-center gap-4 text-blue-950 font-black text-lg">
                <CheckCircle className="w-6 h-6 text-blue-600 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">1. What is PDLC?</h2>
          <p className="text-xl text-zinc-800 leading-relaxed font-bold">Product Development Lifecycle (PDLC) is the structured process of taking a product from problem discovery → launch → continuous improvement, ensuring decisions are user-driven, data-backed, and business-aligned.</p>
          
          <div className="overflow-hidden rounded-[3rem] border-2 border-zinc-100 shadow-2xl bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-white">
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Stage</th>
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Goal</th>
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Key Output</th>
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
                  <tr key={i}>
                    <td className="p-8 text-zinc-950 font-black">{row.s}</td>
                    <td className="p-8 text-indigo-600">{row.g}</td>
                    <td className="p-8 text-zinc-500 text-sm font-bold">{row.o}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-12">
          {[
            { id: '01', title: 'Phase 1: Discovery (Find the Right Problem)', goal: '“Fall in love with the problem, not the solution.” Understand real user needs and validate the painpoint.', act: ['Market & competitor research', 'User interviews, surveys', 'Data analysis (Mixpanel, GA, SQL)', 'Identify Jobs-to-be-Done (JTBD)'], out: ['Problem statement', 'Personas', 'Hypothesis', 'Opportunity sizing'], case: 'Zomato observes high checkout drop-offs because of unpredictable surge delivery fees.' },
            { id: '02', title: 'Phase 2: Definition (Scope the Solution)', goal: 'Turn insights into an actionable plan. Define what we are building and how we measure success.', act: ['Prioritization (RICE, MOSCOW, Value-Effort)', 'Success metrics / OKRs', 'PRD writing', 'Align with design & engineering'], out: ['PRD', 'Prioritized roadmap', 'Success metrics'], case: 'Test a Flat Delivery Fee Subscription Model to reduce checkout abandonment by 15%.' },
            { id: '03', title: 'Phase 3: Design (Shape the Experience)', goal: 'Design an intuitive experience for solving the defined problem.', act: ['Wireframes & prototypes in Figma', 'User testing & usability reviews', 'Accessibility & UI polishing'], out: ['Prototype', 'Usability results', 'Design specs'], case: 'Prototype for 1-click subscription to Zomato delivery fee waiver.' },
            { id: '04', title: 'Phase 4: Development (Build)', goal: 'Build and test the feature until ready for release. Focus on functional alignment.', act: ['Sprint planning & execution (Jira)', 'Daily standups, bug triage', 'QA & UAT testing', 'Feature flag rollout'], out: ['Working MVP', 'Release candidate', 'Go/No-Go decision'], case: 'Feature toggle rollout to 5% of users in Bangalore to test load performance.' },
            { id: '05', title: 'Phase 5: Launch (Ship & Distribute)', goal: '“Shipping is a feature.” Release value to users and drive broad adoption.', act: ['GTM strategy (Marketing, Sales, Support)', 'Announcements, tutorials, walkthroughs', 'Monitor adoption & sentiment'], out: ['GTM docs', 'Release comms', 'Launch dashboard'], case: 'Email + push campaign tracking adoption of the new delivery subscription.' },
            { id: '06', title: 'Phase 6: Iteration (Learn & Improve)', goal: 'Improve continuously based on data. The cycle never truly ends.', act: ['Analyze Mixpanel, GA, SQL reports', 'Collect feedback (NPS, CSAT)', 'Identify improvement opportunities'], out: ['Insights report', 'Updated roadmap', 'New hypothesis'], case: 'Feature adoption = 70%, renewal = 30% → pricing experiment planned to improve retention.' }
          ].map((phase) => (
            <div key={phase.id} className="p-12 md:p-14 bg-zinc-50 border-2 border-zinc-200 rounded-[3.5rem] shadow-sm flex flex-col md:row-span-1 gap-12 group transition-all hover:bg-white hover:shadow-xl">
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-6">
                  <span className="text-6xl font-black text-zinc-200 group-hover:text-indigo-100 transition-colors">{phase.id}</span>
                  <h4 className="text-3xl font-black text-zinc-950 tracking-tighter leading-tight">{phase.title}</h4>
                </div>
                <div className="p-8 bg-indigo-50 border-2 border-indigo-100 rounded-[2.5rem]">
                  <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">Goal</p>
                  <p className="text-xl font-black text-indigo-900 italic leading-relaxed">{phase.goal}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                  <div className="space-y-6">
                    <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Activities</p>
                    <ul className="text-lg font-bold text-zinc-800 space-y-3">
                      {phase.act.map((a, i) => <li key={i}>• {a}</li>)}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Outputs</p>
                    <ul className="text-lg font-bold text-zinc-800 space-y-3">
                      {phase.out.map((o, i) => <li key={i}>• {o}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-6 self-start md:self-stretch">
                <div className="bg-zinc-900 p-8 rounded-[2.5rem] shadow-lg text-white flex-1">
                  <p className="text-[11px] font-black text-indigo-400 uppercase mb-4 tracking-widest">Industry Case</p>
                  <p className="text-lg font-black leading-relaxed">{phase.case}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight text-center">Key Takeaways</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: '1', desc: 'The best PMs don’t build features — they solve problems.' },
              { id: '2', desc: 'PDLC creates structure, clarity, and alignment across the org.' },
              { id: '3', desc: 'Launch is not the end — iteration is where results come from.' }
            ].map((t) => (
              <div key={t.id} className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] text-center shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-black">{t.id}</div>
                <p className="text-xl font-black text-zinc-900 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-12">
        <div className="p-16 bg-white border-4 border-indigo-200 rounded-[4rem] shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200"><Target className="w-10 h-10" /></div>
              <h4 className="text-4xl font-black text-zinc-950 tracking-tighter">🎯 Day-2 Mini Assignment</h4>
            </div>
            <p className="text-xl text-zinc-500 font-black uppercase tracking-widest">Assignment</p>
          </div>
          <p className="text-3xl text-zinc-800 font-black mb-12 leading-relaxed text-center">Pick any app (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and describe a new feature across the PDLC:</p>
          <div className="p-12 bg-zinc-950 rounded-[3rem] border-4 border-zinc-800 shadow-2xl">
            <p className="text-white font-black uppercase tracking-[0.4em] text-[12px] mb-10 opacity-50">Submission Template</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-indigo-400 font-mono text-xl">
              <div className="space-y-2"><span>Product: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>Feature Idea: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>Discovery – Problem & insight: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>Definition – Hypothesis & metrics: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>Design – Sketch or description: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>Development – Dependencies / risks: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>Launch – Target segment & rollout plan: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>Iteration – What will you measure?: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
            </div>
          </div>
          <p className="mt-12 text-center text-zinc-500 font-black uppercase tracking-widest text-sm">📌 Expected outcome: You learn to think like a PM end-to-end, considering everything from feasibility to measurement.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 p-8 bg-zinc-100 rounded-3xl border border-zinc-200">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Previous</p>
            <p className="text-xl font-black text-zinc-900">What is Product Management? 🚀</p>
          </div>
          <div className="flex-1 p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-2">Up Next</p>
            <p className="text-xl font-black">Product Life Cycle (PLC) & PLM 📘</p>
          </div>
        </div>
      </div>
    )
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
                  <span className="text-[11px] font-black tracking-tight">45m read</span>
                </div>
            </div>

            <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-zinc-900 text-white text-[9px] font-black uppercase tracking-widest mb-4">
                   <ShieldCheck className="w-3 h-3 text-indigo-400" />
                   Day {lesson.day}
                </div>
                <h3 className="font-black text-2xl leading-[1.1] transition-colors line-clamp-2 text-zinc-900 group-hover:text-indigo-600 tracking-tighter">
                    {lesson.title}
                </h3>
            </div>

            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-10 flex-grow font-medium">
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