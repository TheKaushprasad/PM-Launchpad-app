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
  ListChecks, Quote, UserCircle, Compass as CompassIcon, ShieldAlert as ShieldAlertIcon
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
  },
  {
    day: 3,
    title: 'Product Life Cycle (PLC) & PLM 📘',
    category: 'Foundations',
    preview: 'Understand how products evolve in the market over time and how companies manage that journey.',
    content: (
      <div className="space-y-16">
        <header className="bg-zinc-950 p-12 rounded-[3rem] border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">
            <Clock className="w-4 h-4" /> 45 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">Product Life Cycle (PLC) & PLM 📘</h1>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed">Understand how products evolve in the market over time and how companies manage that journey.</p>
        </header>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">What is Product Life Cycle (PLC)?</h2>
          <p className="text-xl text-zinc-800 leading-relaxed font-bold">Product Life Cycle is the journey a product goes through in the market — from the day it is launched to the day it is eventually retired.</p>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">What Are the 4 Stages of Product Life Cycle?</h2>
          <div className="space-y-8">
            {[
              { title: 'Introduction', desc: 'This is when a new product is first introduced to the market. Sales are usually low because customers are just starting to become aware of the product, and marketing efforts are focused on building awareness and generating interest. Companies may be investing heavily in research and development during this stage.', color: 'bg-blue-50 border-blue-100 text-blue-900' },
              { title: 'Growth', desc: 'In this stage, the product starts to gain interest. Sales begin to increase as more customers become aware of the product and start buying it. Marketing efforts now focus on expanding market share and building brand loyalty. Competitors may also start entering the market during this stage.', color: 'bg-emerald-50 border-emerald-100 text-emerald-900' },
              { title: 'Maturity', desc: 'This is the stage of peak sales. The product has reached its maximum market penetration, and sales growth starts to level off. Competition is usually intense, and companies may need to focus on differentiating their product through added features, improved quality, or competitive pricing.', color: 'bg-indigo-50 border-indigo-100 text-indigo-900' },
              { title: 'Decline', desc: 'In the decline stage, sales begin to decline as customer preferences change, new technologies emerge, or market saturation occurs. Companies may choose to discontinue the product or try to extend it via strategies like updates, new marketing, or new segments.', color: 'bg-rose-50 border-rose-100 text-rose-900' }
            ].map((stage, i) => (
              <div key={i} className={`p-10 border-2 rounded-[3rem] shadow-sm ${stage.color} flex flex-col md:flex-row gap-8 items-center`}>
                <div className="w-20 h-20 shrink-0 bg-white rounded-2xl flex items-center justify-center text-3xl font-black shadow-sm">
                  0{i + 1}
                </div>
                <div>
                  <h4 className="text-2xl font-black mb-3 tracking-tight">{stage.title}</h4>
                  <p className="text-lg font-bold leading-relaxed opacity-90">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">What is Product Lifecycle Management (PLM)?</h2>
          <div className="p-10 bg-zinc-900 rounded-[3rem] text-white space-y-6 shadow-2xl border border-zinc-800">
            <p className="text-xl font-black text-indigo-400">Product Lifecycle Management (PLM) is the practice of managing a product from its initiation to its eventual retirement through a systematic approach.</p>
            <p className="text-lg text-zinc-300 font-bold leading-relaxed">It's a system that helps manage every step of a product's life, from the initial idea and design to manufacturing, distribution, and even after it's sold. It's a way for companies to keep track of all the details and make sure everyone involved is on the same page throughout the product's journey. So, in simpler terms, PLM is like a guidebook that helps companies manage their products from start to finish.</p>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Stages of a Product in PLM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Concept Stage', desc: 'The start of making a new product. Involves initial ideas and planning, market research, identifying customer needs, and determining feasibility. Usually R&D takes the lead.' },
              { title: 'Design Stage', desc: 'Careful plan for the product, building prototypes, and testing everything. Ensuring the design meets all rules and safety standards. Significant R&D spend happens here.' },
              { title: 'Production Stage', desc: 'Making the product at scale—getting materials, putting everything together, and quality checks. Design changes should be minimal at this point.' },
              { title: 'Sales Stage', desc: 'About telling people about the product and getting them to buy it via advertisements, prices, and special deals. Forecasting is crucial.' },
              { title: 'Support Stage', desc: 'Ongoing customer support including customer service, warranties, repairs, and services or training to enhance user experience.' },
              { title: 'Retirement Stage', desc: 'The life of the product ends due to better products, preference shifts, or tech moves. Includes responsible recycling or find new uses.' }
            ].map((stage, i) => (
              <div key={i} className="p-10 bg-white border-2 border-zinc-100 rounded-[2.5rem] shadow-sm hover:border-indigo-100 transition-colors">
                <h4 className="text-xl font-black text-zinc-950 mb-3 tracking-tight">{stage.title}</h4>
                <p className="text-sm text-zinc-500 font-black leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight text-center">Benefits of PLM</h2>
          <div className="space-y-6">
            {[
              { icon: <Users className="w-8 h-8" />, title: 'Improved Collaboration', desc: 'PLM encourages cross-functional collaboration, ensuring that all stakeholders, from design to sales, work together seamlessly.', color: 'bg-blue-50 text-blue-600 border-blue-100' },
              { icon: <ShieldCheck className="w-8 h-8" />, title: 'Enhanced Product Quality', desc: 'By integrating quality control into each phase, PLM helps identify and rectify potential issues early, resulting in higher-quality products.', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
              { icon: <Settings2 className="w-8 h-8" />, title: 'Efficient Resource Utilization', desc: 'Streamlines processes, reducing waste and optimizing resource utilization, leading to significant cost savings.', color: 'bg-orange-50 text-orange-600 border-orange-100' },
              { icon: <Zap className="w-8 h-8" />, title: 'Faster Time-to-Market', desc: 'A structured approach facilitates quicker development cycles, enabling companies to bring products to market more rapidly.', color: 'bg-amber-50 text-amber-600 border-amber-100' },
              { icon: <Landmark className="w-8 h-8" />, title: 'Regulatory Compliance', desc: 'PLM systems assist in ensuring that products meet regulatory standards, minimizing the risk of legal and compliance issues.', color: 'bg-purple-50 text-purple-600 border-purple-100' }
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
      </div>
    ),
    assignment: (
      <div className="space-y-12">
        <div className="p-16 bg-white border-4 border-indigo-200 rounded-[4rem] shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200"><Target className="w-10 h-10" /></div>
              <h4 className="text-4xl font-black text-zinc-950 tracking-tighter">🎯 Day-3 Mini Assignment</h4>
            </div>
            <p className="text-xl text-zinc-500 font-black uppercase tracking-widest">Assignment</p>
          </div>
          <p className="text-3xl text-zinc-800 font-black mb-12 leading-relaxed text-center">Pick any product (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and evaluate its lifecycle:</p>
          <div className="p-12 bg-zinc-950 rounded-[3rem] border-4 border-zinc-800 shadow-2xl">
            <p className="text-white font-black uppercase tracking-[0.4em] text-[12px] mb-10 opacity-50">Submission Template</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-indigo-400 font-mono text-xl">
              <div className="space-y-2"><span>Product: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>Current PLC Stage: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>What signals tell you this stage?: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>What should PM focus on right now (Strategy)?: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>One risky decision PM must make at this stage: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>If it’s declining, how would you extend or sunset it?: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
            </div>
          </div>
          <p className="mt-12 text-center text-zinc-500 font-black uppercase tracking-widest text-sm">📌 Expected outcome: You learn to think like a PM end-to-end, considering everything from feasibility to measurement.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 p-8 bg-zinc-100 rounded-3xl border border-zinc-200">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Previous</p>
            <p className="text-xl font-black text-zinc-900">The Product Development Lifecycle (PDLC) 📘</p>
          </div>
          <div className="flex-1 p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-2">Up Next</p>
            <p className="text-xl font-black">Product Sense Framework 📘</p>
          </div>
        </div>
      </div>
    )
  },
  {
    day: 4,
    title: 'Product Sense Framework 📘',
    category: 'Foundations',
    preview: 'Great PMs don’t build features. They solve meaningful problems. Master the "sixth sense" of Product Management.',
    content: (
      <div className="space-y-16">
        <header className="bg-zinc-950 p-12 rounded-[3rem] border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">
            <Clock className="w-4 h-4" /> 45 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">Product Sense Framework 📘</h1>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed">Great PMs don’t build features. They solve meaningful problems. Master the "sixth sense" of Product Management.</p>
        </header>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">What is Product Sense?</h2>
          <p className="text-xl text-zinc-800 leading-relaxed font-bold">Product sense is the ability to see through complexity and spot the user needs that matter most. Experts like Marty Cagan emphasize that it is deep product knowledge built through immersion, not an innate gift.</p>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">The 7 Pillars of Product Sense</h2>
          <div className="space-y-6">
            {[
              { title: 'Empathy & Customer Needs', desc: 'Listening for spoken and unspoken pain points and emotional drivers.' },
              { title: 'Market & Competitive Insight', desc: 'Analyzing trends and mapping competitor gaps to find unique value.' },
              { title: 'Design & UX Perspective', desc: 'Recognizing good flows and how design decisions affect engagement.' },
              { title: 'Problem Framing & Mapping', desc: 'Distinguishing root causes from symptoms and exploring options.' },
              { title: 'Feasibility & Execution', desc: 'Balancing ambitious ideas with tech constraints, budgets, and timelines.' },
              { title: 'Iteration & Validation', desc: 'Using prototypes and experiments to adjust based on real data.' },
              { title: 'Domain Immersion', desc: 'Gaining deep knowledge of a space to predict behaviors and outcomes.' }
            ].map((pillar, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-6 p-10 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-sm group hover:border-indigo-100 transition-all">
                <div className="w-16 h-16 shrink-0 bg-zinc-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black group-hover:bg-indigo-600 transition-colors">
                  {i + 1}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-black text-zinc-950 mb-2 tracking-tight">{pillar.title}</h4>
                  <p className="text-xl text-zinc-500 font-bold leading-tight">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Why Aspiring PMs Must Master It</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'A Key Hiring Criterion', desc: 'Most companies test for product sense during interviews to see if you can analyze products meaningfully.', icon: <Users className="w-8 h-8" />, color: 'bg-blue-50 text-blue-600 border-blue-100' },
              { title: 'Bridges Strategy and Execution', desc: 'Ties small features to the \'bigger picture\' and strategic goals.', icon: <Zap className="w-8 h-8" />, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
              { title: 'Anticipates User Behavior', desc: 'Sense unarticulated needs before competitors (e.g., Original iPhone, Gmail).', icon: <Brain className="w-8 h-8" />, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
              { title: 'Stakeholder Alignment', desc: 'Provides the rationale needed to explain trade-offs to engineers and execs.', icon: <Users2 className="w-8 h-8" />, color: 'bg-purple-50 text-purple-600 border-purple-100' }
            ].map((reason, i) => (
              <div key={i} className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-sm space-y-6">
                <div className={`p-6 rounded-[2rem] w-fit ${reason.color}`}>
                  {reason.icon}
                </div>
                <h4 className="text-2xl font-black text-zinc-950 tracking-tight">{reason.title}</h4>
                <p className="text-xl text-zinc-500 font-bold leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight text-center">Daily Habits to Build Instincts</h2>
          <div className="space-y-6">
            {[
              { title: 'Talk to Users Regularly', desc: 'Read tickets, join sales calls, and observe context surveys miss.', color: 'bg-zinc-900 text-white' },
              { title: 'Reverse-Engineer Products', desc: 'Break down apps like Airbnb to understand core needs and trade-offs.', color: 'bg-white border-zinc-200' },
              { title: 'Perform Product Drills', desc: 'List 3 strengths and 3 weaknesses of a daily-use app with justifications.', color: 'bg-zinc-50 border-zinc-200' },
              { title: 'Embrace Constraints', desc: 'Design solutions under strict limits (e.g., 30s onboarding) to sharpen judgment.', color: 'bg-white border-zinc-200 shadow-sm' }
            ].map((habit, i) => (
              <div key={i} className={`p-10 rounded-[3rem] border-2 flex flex-col md:flex-row gap-8 items-center ${habit.color}`}>
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h4 className="text-2xl font-black tracking-tight">{habit.title}</h4>
                  <p className="text-xl font-bold opacity-80">{habit.desc}</p>
                </div>
                <div className="hidden md:block">
                  <ArrowRight className="w-8 h-8 opacity-20" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-indigo-950 p-16 rounded-[4rem] text-white space-y-12 shadow-2xl">
          <h2 className="text-4xl font-black tracking-tighter text-center">Ace the Product Sense Interview</h2>
          <p className="text-xl text-indigo-200 font-bold text-center max-w-3xl mx-auto">Hiring managers look for clarity, empathy, and reasoning rather than just a "correct" answer.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-lg font-bold">
            <div className="space-y-4">
              <p className="text-indigo-400 font-black uppercase tracking-widest text-sm">Framework Step 1</p>
              <p className="text-2xl font-black leading-tight">Frame the problem clearly before jumping to solutions.</p>
            </div>
            <div className="space-y-4">
              <p className="text-indigo-400 font-black uppercase tracking-widest text-sm">Framework Step 2</p>
              <p className="text-2xl font-black leading-tight">Identify specific user segments and their unique pains.</p>
            </div>
            <div className="space-y-4">
              <p className="text-indigo-400 font-black uppercase tracking-widest text-sm">Framework Step 3</p>
              <p className="text-2xl font-black leading-tight">Propose solutions with a rationale, explaining the hypothesis.</p>
            </div>
            <div className="space-y-4">
              <p className="text-indigo-400 font-black uppercase tracking-widest text-sm">Framework Step 4</p>
              <p className="text-2xl font-black leading-tight">Discuss trade-offs—be prepared to answer, "Who suffers if we cut this feature?".</p>
            </div>
          </div>
        </section>

        <section className="bg-rose-50 border-4 border-rose-200 p-16 rounded-[4rem] space-y-12 shadow-xl">
          <h2 className="text-4xl font-black text-rose-950 tracking-tighter text-center">Common Pitfalls to Avoid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            {[
              { m: 'Over-reliance on "Gut"', r: 'Instincts must be tempered by data; ignoring analytics is dangerous unless honed by experience.' },
              { m: 'The Aesthetic Trap', r: 'Don\'t mistake polished UI for good product sense; a beautiful design solving the wrong problem is a failure.' },
              { m: 'Domain Overfitting', r: 'Don\'t assume a playbook from one industry will automatically work in another.' },
              { m: 'Feature Bloat', r: 'Weak sense leads to "copying competitors," resulting in a bloated product that fails real problems.' }
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
              <h4 className="text-4xl font-black text-zinc-950 tracking-tighter">🎯 Day-4 Mini Assignment</h4>
            </div>
            <p className="text-xl text-zinc-500 font-black uppercase tracking-widest">Assignment</p>
          </div>
          <p className="text-2xl text-zinc-800 font-bold mb-8 text-center">Read this expert breakdown of Product Sense and apply it to a feature teardown.</p>
          
          <div className="mb-12 p-8 bg-indigo-50 border-2 border-indigo-200 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 group">
            <div className="flex-1">
              <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">Required Reading</p>
              <h5 className="text-2xl font-black text-indigo-950 mb-2">What is Product Sense? by Robin Dhanwani</h5>
              <p className="text-indigo-700 font-bold">https://www.parallelhq.com/blog/what-product-sense</p>
            </div>
            <a href="https://www.parallelhq.com/blog/what-product-sense" target="_blank" rel="noopener noreferrer" className="p-6 bg-indigo-600 text-white rounded-2xl group-hover:scale-110 transition-transform">
              <ExternalLink className="w-8 h-8" />
            </a>
          </div>

          <p className="text-3xl text-zinc-800 font-black mb-12 leading-relaxed text-center">Pick a feature from an app you use daily. Write a 1-page "Product Sense Teardown" identifying:</p>
          
          <div className="p-12 bg-zinc-950 rounded-[3rem] border-4 border-zinc-800 shadow-2xl">
            <p className="text-white font-black uppercase tracking-[0.4em] text-[12px] mb-10 opacity-50">Submission Template</p>
            <div className="space-y-8 text-indigo-400 font-mono text-xl">
              <div className="space-y-2"><span>1) The core user problem: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>2) The hypothesis behind the design: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
              <div className="space-y-2"><span>3) One critical trade-off they made: ___</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 p-8 bg-zinc-100 rounded-3xl border border-zinc-200">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Previous</p>
            <p className="text-xl font-black text-zinc-900">Product Life Cycle (PLC) & PLM 📘</p>
          </div>
          <div className="flex-1 p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-2">Up Next</p>
            <p className="text-xl font-black">User Empathy 📘</p>
          </div>
        </div>
      </div>
    )
  },
  {
    day: 5,
    title: 'User Empathy 📘',
    category: 'Foundations',
    preview: 'Step into their shoes. User empathy is the fundamental driver of human-centered development.',
    content: (
      <div className="space-y-16">
        <header className="bg-zinc-950 p-12 rounded-[3rem] border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">
            <Clock className="w-4 h-4" /> 45 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">User Empathy 📘</h1>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed">Step into their shoes. User empathy is the fundamental driver of human-centered development.</p>
        </header>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">User Empathy in Product</h2>
          <p className="text-xl text-zinc-800 leading-relaxed font-bold">User empathy is the ability to understand and share the feelings, needs, and perspectives of users by "stepping into their shoes" to view the product through their eyes. It drives human-centered development.</p>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight text-center">Core Principles of User Empathy</h2>
          <div className="space-y-6">
            {[
              { title: 'Active Listening', desc: 'Listen without judgment. Encourage open communication and hear what\'s NOT being said.', icon: <Mic className="w-8 h-8" />, color: 'bg-blue-50 text-blue-600 border-blue-100' },
              { title: 'Putting Users First', desc: 'Prioritize user needs over internal assumptions or ego. Align decisions with their interests.', icon: <Users2 className="w-8 h-8" />, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
              { title: 'Deep Connection', desc: 'Grasp challenges, desires, and emotional motivations of your audience, not just tech specs.', icon: <Heart className="w-8 h-8" />, color: 'bg-pink-50 text-pink-600 border-pink-100' }
            ].map((principle, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-8 p-10 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-sm hover:border-indigo-100 transition-all">
                <div className={`p-6 rounded-[2rem] ${principle.color} shrink-0`}>
                  {principle.icon}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-black text-zinc-950 mb-2 tracking-tight">{principle.title}</h4>
                  <p className="text-xl text-zinc-500 font-bold leading-tight">{principle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Implementation Process for PMs</h2>
          <div className="space-y-8">
            {[
              { 
                id: '1', 
                title: 'User Research & Personas', 
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Research Methods</p>
                      <p className="text-base font-bold text-zinc-800 leading-snug">Interviews, surveys, and usability testing.</p>
                    </div>
                    <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Personas</p>
                      <p className="text-base font-bold text-zinc-800 leading-snug">Visualize different user groups.</p>
                    </div>
                    <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Empathy Maps</p>
                      <p className="text-base font-bold text-zinc-800 leading-snug">Map what users think, feel, experience, and do.</p>
                    </div>
                  </div>
                )
              },
              { 
                id: '2', 
                title: 'Design Thinking Integration', 
                content: (
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-3 py-4">
                      {['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'].map((step, idx) => (
                        <div key={step} className="flex items-center gap-2">
                          <span className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-black tracking-tight">{step}</span>
                          {idx < 4 && <ArrowRight className="w-4 h-4 text-zinc-300" />}
                        </div>
                      ))}
                    </div>
                    <p className="text-lg text-zinc-600 font-medium leading-relaxed">PMs observe interactions, define pain points, ideate solutions, and test prototypes to refine the experience based on feedback.</p>
                  </div>
                )
              },
              { 
                id: '3', 
                title: 'Continuous Feedback Loops', 
                content: (
                  <p className="text-lg text-zinc-600 font-medium leading-relaxed">Involve users at every stage, not just at the end. Use User Acceptance Testing (UAT) and iterative analysis to evolve with changing user preferences.</p>
                )
              }
            ].map((item) => (
              <div key={item.id} className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-zinc-950 text-white rounded-xl flex items-center justify-center text-xl font-black mb-6">{item.id}</div>
                  <h4 className="text-2xl font-black text-zinc-950 mb-4 tracking-tight">{item.title}</h4>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight text-center">Key Tools & Frameworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Compass className="w-8 h-8" />, title: 'User Journey Mapping', desc: 'Visualizing the path a user takes.' },
              { icon: <MessageSquare className="w-8 h-8" />, title: 'User Stories', desc: 'Features from the user\'s perspective.' },
              { icon: <Activity className="w-8 h-8" />, title: 'User Flows', desc: 'Step-by-step task completion.' },
              { icon: <Layers className="w-8 h-8" />, title: 'User Segments', desc: 'Categorizing unique group needs.' }
            ].map((tool, i) => (
              <div key={i} className="p-8 bg-zinc-50 border-2 border-zinc-100 rounded-[2.5rem] text-center space-y-4 hover:border-indigo-200 transition-colors">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 mx-auto shadow-sm">
                  {tool.icon}
                </div>
                <h4 className="text-lg font-black text-zinc-950 tracking-tight">{tool.title}</h4>
                <p className="text-sm text-zinc-500 font-bold leading-tight">{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Real-World Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-sm space-y-4">
              <h4 className="text-2xl font-black text-zinc-950 flex items-center gap-2">
                <Smartphone className="w-6 h-6 text-zinc-400" /> Apple
              </h4>
              <p className="text-lg text-zinc-600 font-medium leading-relaxed">Demonstrates empathy through user-friendly interfaces and seamless experiences that create a loyal base.</p>
            </div>
            <div className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-sm space-y-4">
              <h4 className="text-2xl font-black text-zinc-950 flex items-center gap-2">
                <Globe className="w-6 h-6 text-zinc-400" /> Airbnb
              </h4>
              <p className="text-lg text-zinc-600 font-medium leading-relaxed">Achieved success by focusing on the traveler's need for unique and personalized experiences.</p>
            </div>
          </div>
          <div className="p-12 bg-zinc-900 rounded-[3.5rem] text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
            <p className="text-2xl md:text-3xl font-black italic relative z-10 leading-tight">"Empathy is a core value that ensures products exceed expectations, not just meet them."</p>
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
              <h4 className="text-4xl font-black text-zinc-950 tracking-tighter">🎯 Day-5 Mini Assignment</h4>
            </div>
            <p className="text-xl text-zinc-500 font-black uppercase tracking-widest">Assignment</p>
          </div>
          
          <div className="space-y-10">
            <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100">
              <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Task</p>
              <p className="text-2xl text-zinc-800 font-black leading-relaxed">Find out How did Airbnb use user empathy to drive their success? Look for specific stories about their "early days" and how they handled user problems.</p>
            </div>

            <div className="p-12 bg-zinc-950 rounded-[3rem] border-4 border-zinc-800 shadow-2xl">
              <p className="text-white font-black uppercase tracking-[0.4em] text-[12px] mb-10 opacity-50">Reflection Questions</p>
              <div className="space-y-12 text-indigo-400 font-mono text-xl">
                <div className="space-y-4">
                  <span className="flex items-center gap-4"><span className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white text-sm font-black">1</span> How did they identify the problem travelers faced?</span>
                  <span className="block h-1 bg-zinc-800 w-full"></span>
                </div>
                <div className="space-y-4">
                  <span className="flex items-center gap-4"><span className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white text-sm font-black">2</span> What "unscalable" things did the founders do to empathize with hosts?</span>
                  <span className="block h-1 bg-zinc-800 w-full"></span>
                </div>
                <div className="space-y-4">
                  <span className="flex items-center gap-4"><span className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white text-sm font-black">3</span> How is that empathy reflected in the current app experience?</span>
                  <span className="block h-1 bg-zinc-800 w-full"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 p-8 bg-zinc-100 rounded-3xl border border-zinc-200">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Previous</p>
            <p className="text-xl font-black text-zinc-900">Product Sense Framework 📘</p>
          </div>
          <div className="flex-1 p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-2">Up Next</p>
            <p className="text-xl font-black">Business Fundamentals for PMs 💰</p>
          </div>
        </div>
      </div>
    )
  },
  {
    day: 6,
    title: 'Business Fundamentals for PMs 💰',
    category: 'Foundations',
    preview: 'Master the metrics that drive sustainable products. Learn CAC, LTV, and the "Golden Ratio" of business success.',
    content: (
      <div className="space-y-16">
        <header className="bg-zinc-950 p-12 rounded-[3rem] border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">
            <Clock className="w-4 h-4" /> 45 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">Business Fundamentals for PMs 💰</h1>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed">Master the metrics that drive sustainable products. Learn CAC, LTV, and the "Golden Ratio" of business success.</p>
        </header>

        <section className="bg-blue-50 border-4 border-blue-100 p-12 rounded-[3.5rem] space-y-8 shadow-sm">
          <h2 className="text-3xl font-black text-blue-950 tracking-tight">Learning Objectives</h2>
          <ul className="space-y-4">
            {[
              'Understand and calculate key unit economics metrics (CAC, LTV, payback period)',
              'Identify and analyze different business models and revenue streams',
              'Evaluate product decisions through a business lens',
              'Communicate the business impact of product features',
              'Assess product-market fit using business metrics'
            ].map(item => (
              <li key={item} className="flex items-center gap-4 text-blue-950 font-black text-lg">
                <CheckCircle className="w-6 h-6 text-blue-600 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Why Business Fundamentals Matter for PMs</h2>
          <p className="text-xl text-zinc-800 leading-relaxed font-bold">Product Managers are often called the "mini-CEO" of their product. Here's why business knowledge is critical:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="p-10 bg-emerald-50 border-2 border-emerald-100 rounded-[3rem] space-y-6">
              <h4 className="text-2xl font-black text-emerald-950 flex items-center gap-3">
                <TrendingUp2 className="w-7 h-7 text-emerald-600" /> What Good PMs Do
              </h4>
              <ul className="space-y-3 text-lg font-bold text-emerald-900">
                {['Balance user value with business value', 'Justify investments with ROI calculations', 'Speak confidently to executives', 'Understand customer lifecycle economics'].map(i => <li key={i}>• {i}</li>)}
              </ul>
            </div>
            <div className="p-10 bg-rose-50 border-2 border-rose-100 rounded-[3rem] space-y-6">
              <h4 className="text-2xl font-black text-rose-950 flex items-center gap-3">
                <ShieldAlert className="w-7 h-7 text-rose-600" /> Common PM Mistakes
              </h4>
              <ul className="space-y-3 text-lg font-bold text-rose-900">
                {['Building features users love but don\'t pay for', 'Ignoring customer acquisition costs', 'Focusing on vanity metrics', 'Ignoring sustainability'].map(i => <li key={i}>• {i}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Twitter/X', desc: 'Built incredible engagement but struggled with monetization for a decade. Engagement ≠ Business Success.', color: 'bg-zinc-100 border-zinc-200' },
                { title: 'Instagram', desc: 'Delayed monetization to focus on growth. Worked because they had Facebook\'s massive resources.', color: 'bg-zinc-100 border-zinc-200' },
                { title: 'Notion', desc: 'Freemium model carefully designed to convert power users. Model aligned perfectly with user behavior.', color: 'bg-zinc-100 border-zinc-200' }
              ].map((item, i) => (
                <div key={i} className={`p-10 border-2 rounded-[3rem] shadow-sm ${item.color}`}>
                   <h4 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h4>
                   <p className="text-lg font-bold leading-relaxed text-zinc-600">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="space-y-12">
          <div className="p-12 bg-zinc-950 rounded-[4rem] text-white space-y-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
              <div className="space-y-8">
                <h2 className="text-3xl font-black text-indigo-400 tracking-tight">Customer Acquisition Cost (CAC)</h2>
                <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">The Formula</p>
                  <p className="text-2xl font-black text-indigo-300">CAC = (Total Mkt + Sales Costs) / # New Users</p>
                </div>
                <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Example</p>
                  <p className="text-xl font-bold text-zinc-300">$50,000 spend + 500 users = $100 CAC</p>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl font-black text-indigo-400 tracking-tight">Lifetime Value (LTV)</h2>
                <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Simple LTV</p>
                  <p className="text-2xl font-black text-indigo-300">ARPU × Avg Lifespan</p>
                  <p className="text-sm text-zinc-500 font-bold">Basic calculation for recurring revenue products.</p>
                </div>
                <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">LTV with Churn</p>
                  <p className="text-2xl font-black text-indigo-300">(ARPU × Gross Margin) / Churn Rate</p>
                  <p className="text-sm text-zinc-500 font-bold">More sophisticated for mature SaaS startups.</p>
                </div>
              </div>
            </div>

            <div className="p-10 bg-indigo-600 rounded-[3rem] text-center relative z-10 shadow-xl">
               <p className="text-xl md:text-2xl font-black leading-tight italic">"Critical Insight: Increasing customer lifespan by 50% directly increases LTV by 50%, without spending more on marketing! This is why retention features are high-ROI."</p>
            </div>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight text-center">The Golden Ratio: LTV:CAC</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { ratio: '< 1:1', title: 'Crisis Mode', desc: 'Losing money. Reduce CAC or increase LTV urgently.', color: 'bg-rose-50 border-rose-100 text-rose-900' },
               { ratio: '3:1 to 5:1', title: 'The Sweet Spot', desc: 'Optimal balance. Scalable and healthy business.', color: 'bg-emerald-50 border-emerald-100 text-emerald-900 shadow-xl scale-105' },
               { ratio: '> 5:1', title: 'Underinvesting', desc: 'Too conservative. Competitors might outgrow you.', color: 'bg-amber-50 border-amber-100 text-amber-900' }
             ].map((card, i) => (
               <div key={i} className={`p-10 border-2 rounded-[3.5rem] flex flex-col items-center text-center space-y-6 ${card.color}`}>
                  <span className="text-4xl font-black tracking-tighter">{card.ratio}</span>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black uppercase tracking-widest">{card.title}</h4>
                    <p className="text-lg font-bold opacity-80">{card.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </section>

        <section className="p-12 bg-zinc-50 border-2 border-zinc-100 rounded-[4rem] flex flex-col md:flex-row items-center gap-10">
           <div className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-zinc-100 text-center w-full md:w-fit shrink-0">
              <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">Payback Period</p>
              <p className="text-4xl font-black text-zinc-900 mb-2">CAC / (ARPU × GM)</p>
           </div>
           <div className="space-y-2">
              <h3 className="text-2xl font-black text-zinc-950 tracking-tight">Payback Period</h3>
              <p className="text-xl text-zinc-500 font-bold leading-relaxed">Time to recover CAC. Target: <span className="text-indigo-600 font-black">&lt; 12 months.</span></p>
           </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight text-center">Business Models & Revenue Streams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Subscription', desc: 'Netflix, SaaS. Focus: Retention, MRR.' },
              { title: 'Freemium', desc: 'Slack, Spotify. Focus: Upgrade loops.' },
              { title: 'Marketplace', desc: 'Airbnb, Uber. Focus: Liquidity, Trust.' },
              { title: 'Advertising', desc: 'Google, Meta. Focus: Attention, Data.' },
              { title: 'E-commerce', desc: 'Amazon, Myntra. Focus: Conv Rate, GMV.' },
              { title: 'Enterprise SaaS', desc: 'Salesforce. Focus: Adoption, Security.' },
              { title: 'Usage-Based', desc: 'Stripe, AWS. Focus: Volume driving.' },
              { title: 'Hybrid', desc: 'LinkedIn. Multi-stream strategy.' }
            ].map((model, i) => (
              <div key={i} className="p-8 bg-white border-2 border-zinc-100 rounded-[2.5rem] space-y-3 hover:border-indigo-100 transition-colors shadow-sm">
                <h4 className="text-lg font-black text-zinc-950 tracking-tight">{model.title}</h4>
                <p className="text-sm text-zinc-500 font-bold leading-tight">{model.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Strategy Insight</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-indigo-50 border-2 border-indigo-100 rounded-[3.5rem] space-y-4 shadow-sm">
              <h4 className="text-2xl font-black text-indigo-950">Subscription Model</h4>
              <p className="text-lg text-indigo-900 font-medium leading-relaxed opacity-80">Prioritize engagement & retention. Avoid high-friction flows that cause churn. Measure NRR (Net Revenue Retention).</p>
            </div>
            <div className="p-10 bg-emerald-50 border-2 border-emerald-100 rounded-[3.5rem] space-y-4 shadow-sm">
              <h4 className="text-2xl font-black text-emerald-950">Marketplace Model</h4>
              <p className="text-lg text-emerald-900 font-medium leading-relaxed opacity-80">Prioritize supply growth & liquidity. Avoid changes hurting one side of the market. Measure GMV (Gross Merchandise Value).</p>
            </div>
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
               <h4 className="text-4xl font-black text-zinc-950 tracking-tighter">🎯 Day-6 Mini Assignment</h4>
            </div>
            <p className="text-xl text-zinc-500 font-black uppercase tracking-widest">Assignment</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h5 className="text-2xl font-black text-zinc-900 tracking-tight">Unit Economics Problem</h5>
              <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 space-y-4 font-bold text-lg text-zinc-700">
                <div className="flex justify-between border-b border-zinc-200 pb-3"><span>Ad Spend:</span> <span>$30,000</span></div>
                <div className="flex justify-between border-b border-zinc-200 pb-3"><span>Sales Team Costs:</span> <span>$20,000</span></div>
                <div className="flex justify-between border-b border-zinc-200 pb-3"><span>New Customers:</span> <span>250</span></div>
                <div className="flex justify-between border-b border-zinc-200 pb-3"><span>ARPU:</span> <span>$40/month</span></div>
                <div className="flex justify-between border-b border-zinc-200 pb-3"><span>Avg Lifespan:</span> <span>10 months</span></div>
                <div className="flex justify-between"><span>Gross Margin:</span> <span>80%</span></div>
              </div>
            </div>

            <div className="space-y-8">
               <h5 className="text-2xl font-black text-zinc-900 tracking-tight text-center lg:text-left">Calculate</h5>
               <div className="p-10 bg-zinc-950 rounded-[3rem] border-4 border-zinc-800 shadow-2xl space-y-10">
                  <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-black">1</span>
                        <p className="text-white font-black text-xl uppercase tracking-tighter">CAC</p>
                     </div>
                     <p className="text-zinc-500 text-sm font-bold pl-14">(Total Mkt + Sales / New Users)</p>
                     <span className="block h-1 bg-zinc-800 w-full mt-4"></span>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-black">2</span>
                        <p className="text-white font-black text-xl uppercase tracking-tighter">LTV</p>
                     </div>
                     <p className="text-zinc-500 text-sm font-bold pl-14">(ARPU × GM × Lifespan)</p>
                     <span className="block h-1 bg-zinc-800 w-full mt-4"></span>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-black">3</span>
                        <p className="text-white font-black text-xl uppercase tracking-tighter">LTV:CAC Ratio</p>
                     </div>
                     <p className="text-zinc-500 text-sm font-bold pl-14">sustainability check</p>
                     <span className="block h-1 bg-zinc-800 w-full mt-4"></span>
                  </div>
               </div>
            </div>
          </div>

          <div className="p-12 bg-indigo-50 border-2 border-indigo-100 rounded-[4rem] space-y-6">
             <h5 className="text-2xl font-black text-indigo-950 tracking-tight">Reflective Strategy</h5>
             <p className="text-xl text-indigo-900 font-bold">Based on your results, what should the PM prioritize:</p>
             <div className="flex flex-wrap gap-4 pt-2">
                {['Growth (spend more)', 'Efficiency (reduce CAC)', 'Retention (increase lifespan)'].map(s => (
                  <span key={s} className="px-6 py-3 bg-white border border-indigo-200 rounded-2xl text-indigo-600 font-black text-sm shadow-sm">{s}</span>
                ))}
             </div>
             <p className="text-sm text-indigo-400 font-black uppercase tracking-widest pt-4">Hint: Look at the LTV:CAC Ratio Sweet Spot table above.</p>
          </div>

          <div className="p-10 bg-zinc-900 rounded-[3.5rem] border border-zinc-800 flex flex-col md:flex-row items-center gap-8 group">
             <div className="flex-1 space-y-2">
                <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">Required Task</p>
                <h5 className="text-2xl font-black text-white">Product Management Basics Certification Course by Pendo</h5>
                <p className="text-zinc-400 font-bold text-sm">Covers PM fundamentals, ideal starting point for beginners.</p>
             </div>
             <a href="https://www.productledcertified.com/product-management-basics?_gl=1*7kmqe3*_gcl_au*MTk4MTAyNjIyMS4xNzIyMjU0MTQ0" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black tracking-tight flex items-center gap-3 hover:bg-indigo-500 transition-colors">
                Open Course <ExternalLink className="w-5 h-5" />
             </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 p-8 bg-zinc-100 rounded-3xl border border-zinc-200">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Previous</p>
            <p className="text-xl font-black text-zinc-900">User Empathy 📘</p>
          </div>
          <div className="flex-1 p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-2">Up Next</p>
            <p className="text-xl font-black">Introduction to User & Market Research 🔍</p>
          </div>
        </div>
      </div>
    )
  },
  {
    day: 7,
    title: 'Introduction to User & Market Research 🔍',
    category: 'Research',
    preview: 'Think like a researcher. Learn structured methods to uncover pain points and validate product ideas.',
    content: (
      <div className="space-y-16">
        <header className="bg-zinc-950 p-12 rounded-[3rem] border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">
            <Clock className="w-4 h-4" /> 45 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">Introduction to User & Market Research 🔍</h1>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed">Think like a researcher. Learn structured methods to uncover pain points and validate product ideas.</p>
        </header>

        <section className="space-y-8">
          <p className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight italic">
            “Great products start with deep understanding — of users, their needs, and the market around them.”
          </p>
          <p className="text-xl text-zinc-800 leading-relaxed font-bold">Today’s focus is to think like a researcher, not a builder. You’ll learn how to identify who your users are, what they struggle with, and why solving it matters.</p>
        </section>

        <section className="bg-purple-50 border-4 border-purple-100 p-12 rounded-[3.5rem] space-y-8 shadow-sm">
          <h2 className="text-3xl font-black text-purple-950 tracking-tight">Learning Objectives</h2>
          <ul className="space-y-4">
            {[
              'Explain the difference between user research and market research',
              'Identify user pain points using qualitative and quantitative methods',
              'Apply basic frameworks — Empathy Map, JTBD, and Segmentation',
              'Use AI tools to accelerate research synthesis'
            ].map(item => (
              <li key={item} className="flex items-center gap-4 text-purple-950 font-black text-lg">
                <CheckCircle className="w-6 h-6 text-purple-600 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-10">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">1. User Research vs Market Research</h2>
          <div className="overflow-hidden rounded-[3rem] border-2 border-zinc-100 shadow-2xl bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-white">
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Aspect</th>
                  <th className="p-8 font-black text-xs uppercase tracking-widest">User Research</th>
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Market Research</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-bold text-lg">
                <tr>
                  <td className="p-8 text-zinc-950 font-black bg-zinc-50">Focus</td>
                  <td className="p-8 text-indigo-600">Individual behaviors & pain points</td>
                  <td className="p-8 text-zinc-600">Industry, competitors, trends</td>
                </tr>
                <tr>
                  <td className="p-8 text-zinc-950 font-black bg-zinc-50">Goal</td>
                  <td className="p-8 text-indigo-600">Validate Problem</td>
                  <td className="p-8 text-zinc-600">Validate Opportunity</td>
                </tr>
                <tr>
                  <td className="p-8 text-zinc-950 font-black bg-zinc-50">Methods</td>
                  <td className="p-8 text-indigo-600">Interviews, surveys, usability tests</td>
                  <td className="p-8 text-zinc-600">Desk research, benchmarking</td>
                </tr>
                <tr>
                  <td className="p-8 text-zinc-950 font-black bg-zinc-50">Output</td>
                  <td className="p-8 text-indigo-600">Personas, Journey Maps</td>
                  <td className="p-8 text-zinc-600">TAM/SAM/SOM, SWOT</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-[2.5rem] flex items-center gap-6">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shrink-0">👉</div>
             <p className="text-xl text-emerald-950 font-black">PM Tip: Always start with user research before market research. If users don’t want it, market data doesn’t matter.</p>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">2. The Research Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { id: '1', title: 'Define Objective', desc: '“What do I want to learn?”' },
              { id: '2', title: 'Choose Method', desc: 'Interviews, surveys, or secondary.' },
              { id: '3', title: 'Recruit Users', desc: 'Identify your target segments.' },
              { id: '4', title: 'Collect Data', desc: 'Ask open-ended questions.' },
              { id: '5', title: 'Synthesize', desc: 'Identify themes and insights.' }
            ].map((step) => (
              <div key={step.id} className="p-8 bg-white border-2 border-zinc-100 rounded-[2.5rem] space-y-4 shadow-sm hover:border-indigo-100 transition-colors group">
                <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center font-black group-hover:bg-indigo-600 transition-colors">{step.id}</div>
                <h4 className="font-black text-lg text-zinc-950 tracking-tight leading-tight">{step.title}</h4>
                <p className="text-sm text-zinc-500 font-bold">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">3. Research Frameworks</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Empathy Map */}
            <div className="p-10 bg-zinc-50 border-2 border-zinc-100 rounded-[3.5rem] space-y-8">
               <h4 className="text-2xl font-black text-zinc-950">Empathy Map</h4>
               <p className="text-lg text-zinc-600 font-bold">Map out what users: Says, Does, Thinks, and Feels.</p>
               <div className="grid grid-cols-2 gap-4">
                  {['SAYS', 'DOES', 'THINKS', 'FEELS'].map(item => (
                    <div key={item} className="p-6 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center text-sm font-black tracking-widest text-zinc-400 group-hover:text-indigo-600 transition-colors">{item}</div>
                  ))}
               </div>
            </div>

            {/* JTBD */}
            <div className="p-10 bg-zinc-900 text-white rounded-[3.5rem] space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10"><Briefcase className="w-24 h-24" /></div>
               <h4 className="text-2xl font-black">Jobs To Be Done (JTBD)</h4>
               <p className="text-lg text-indigo-300 font-black italic">“People don’t buy products; they hire them to get a job done.”</p>
               <div className="space-y-4 font-bold text-lg">
                  <p className="text-zinc-400"><span className="text-white">When I...</span> (situation)</p>
                  <p className="text-zinc-400"><span className="text-white">I want to...</span> (motivation)</p>
                  <p className="text-zinc-400"><span className="text-white">So I can...</span> (desired outcome)</p>
               </div>
               <p className="text-sm text-zinc-500">Example: hiring Duolingo to feel productive while waiting.</p>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-2xl font-black text-zinc-900 text-center">Segmentation Strategies</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Demographics', desc: 'Age, gender, location, income.', icon: <User className="w-6 h-6" /> },
                { title: 'Psychographics', desc: 'Motivations, lifestyle, values.', icon: <Heart className="w-6 h-6" /> },
                { title: 'Behavior', desc: 'Usage freq, loyalty, spending.', icon: <Activity className="w-6 h-6" /> },
                { title: 'Needs-Based', desc: 'Specific pain points & goals.', icon: <Target className="w-6 h-6" /> }
              ].map((strat, i) => (
                <div key={i} className="p-8 bg-white border-2 border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4 hover:border-indigo-100 transition-all">
                  <div className="p-4 bg-zinc-50 rounded-xl w-fit text-indigo-600">{strat.icon}</div>
                  <h5 className="font-black text-zinc-950">{strat.title}</h5>
                  <p className="text-sm text-zinc-500 font-bold leading-relaxed">{strat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight text-center">Tools & AI Assistants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {[
               { tool: 'ChatGPT', role: 'Interview Prep', prompt: '“Generate 10 questions for student productivity challenges.”', color: 'bg-emerald-50 border-emerald-100 text-emerald-950' },
               { tool: 'Perplexity AI', role: 'Competitor Scan', prompt: '“Real-time deep competitive analysis and market data.”', color: 'bg-blue-50 border-blue-100 text-blue-950' },
               { tool: 'Notion AI', role: 'Synthesis', prompt: '“Summarize key pain points from long interview transcripts.”', color: 'bg-zinc-100 border-zinc-200 text-zinc-950' },
               { tool: 'Canva', role: 'Visualization', prompt: '“Create visually compelling user personas.”', color: 'bg-pink-50 border-pink-100 text-pink-950' }
             ].map((item, i) => (
               <div key={i} className={`p-10 border-2 rounded-[3rem] shadow-sm ${item.color} flex flex-col md:flex-row gap-8 items-center`}>
                  <div className="flex-1 space-y-2">
                    <p className="text-xs font-black uppercase tracking-widest opacity-60">{item.role}</p>
                    <h4 className="text-2xl font-black">{item.tool}</h4>
                    <p className="text-lg font-bold italic leading-tight">{item.prompt}</p>
                  </div>
                  <div className="hidden md:block opacity-20"><ExternalLink className="w-10 h-10" /></div>
               </div>
             ))}
          </div>
        </section>

        <section className="p-12 bg-white border-4 border-zinc-100 rounded-[4rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
           <h2 className="text-3xl font-black text-zinc-950 mb-10 tracking-tight flex items-center gap-4">
             <Rocket className="w-8 h-8 text-indigo-600" />
             Real-World Case: Zomato One-Tap
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { label: 'Pain Point', value: '“Hungry but don\'t want to call restaurants or search again.”' },
                { label: 'Method', value: 'Surveys & Usage Data Analysis' },
                { label: 'Insight', value: 'Users repeat specific orders 60% of the time.' },
                { label: 'Outcome', value: '1-Tap Reordering feature launched → Orders ↑ 22%' }
              ].map((c, i) => (
                <div key={i} className="space-y-2">
                   <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">{c.label}</p>
                   <p className="text-lg font-black text-zinc-800 leading-tight">{c.value}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="bg-indigo-950 p-16 rounded-[4rem] text-white space-y-10 shadow-2xl">
           <h2 className="text-4xl font-black tracking-tighter">Day-7 Research Drill</h2>
           <div className="space-y-8 text-xl font-bold">
              <p className="flex gap-4"><span className="text-indigo-400">1.</span> Use ChatGPT to generate 5 open-ended interview questions for your idea.</p>
              <p className="flex gap-4"><span className="text-indigo-400">2.</span> Document these in your workspace and highlight the top 3 themes you expect to uncover.</p>
           </div>
           <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <p className="text-indigo-300 font-black italic">Reflect: “What might surprise you about how real users respond vs your assumptions?”</p>
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
              <h4 className="text-4xl font-black text-zinc-950 tracking-tighter">🎯 Day-7 Comprehensive Assignment</h4>
            </div>
            <p className="text-xl text-zinc-500 font-black uppercase tracking-widest">Assignment</p>
          </div>
          
          <div className="space-y-12">
            <h5 className="text-2xl font-black text-zinc-900 tracking-tight">Research Task List</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { id: '1', title: 'Define Target Segment', desc: 'Identify exactly who you are solving for using demographics and psychographics.' },
                 { id: '2', title: 'Pain Point vs. Outcome Table', desc: 'Create a 2x2 table mapping current struggles to desired future states.' },
                 { id: '3', title: 'Competitor Scan', desc: 'Use Perplexity AI to find 3 direct or indirect competitors.' }
               ].map(task => (
                 <div key={task.id} className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 space-y-4">
                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 font-black shadow-sm">{task.id}</span>
                    <h6 className="text-lg font-black text-zinc-950 leading-tight">{task.title}</h6>
                    <p className="text-sm text-zinc-500 font-bold">{task.desc}</p>
                 </div>
               ))}
            </div>

            <div className="p-12 bg-zinc-950 rounded-[3.5rem] border-4 border-zinc-800 shadow-2xl space-y-10">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h5 className="text-2xl font-black text-white tracking-tight">Final Deliverable (One-Slide Summary)</h5>
                  <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">User & Market Research Report</span>
               </div>
               <div className="space-y-12 text-indigo-400 font-mono text-xl">
                  <div className="space-y-2"><span>• The User: [Who are they?]</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
                  <div className="space-y-2"><span>• The Problem: [What is their core struggle?]</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
                  <div className="space-y-2"><span>• The Market: [Why does this matter right now?]</span><span className="block h-1 bg-zinc-800 w-full mt-4"></span></div>
               </div>
            </div>
          </div>
          <p className="mt-12 text-center text-zinc-500 font-black uppercase tracking-widest text-sm">Outcome: Readiness for Day 8 User Interviews</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 p-8 bg-zinc-100 rounded-3xl border border-zinc-200">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Previous</p>
            <p className="text-xl font-black text-zinc-900">Business Fundamentals for PMs 💰</p>
          </div>
          <div className="flex-1 p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-2">Up Next</p>
            <p className="text-xl font-black">User Interviews & Surveys 🎙️</p>
          </div>
        </div>
      </div>
    ),
    resources: [
      { title: 'Doing User Research', url: 'https://youtu.be/MxwyGi-3dzY?si=CV5VWd2bNnUDW-fP', type: 'video' },
      { title: 'Market research', url: 'https://youtu.be/LoJDAeq6i34?si=Ok2GW9U0wFmSJzz8', type: 'video' }
    ]
  },
  {
    day: 8,
    title: 'User Interviews & Surveys 🎙️',
    category: 'Research',
    preview: '“If you listen carefully, your users will write your roadmap for you.” Master structured feedback and real validation.',
    content: (
      <div className="space-y-16">
        <header className="bg-zinc-950 p-12 rounded-[3rem] border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">
            <Clock className="w-4 h-4" /> 45 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">User Interviews & Surveys 🎙️</h1>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed">“If you listen carefully, your users will write your roadmap for you.” Master structured feedback and real validation.</p>
        </header>

        <section className="space-y-8">
          <p className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight italic">
            “If you listen carefully, your users will write your roadmap for you.”
          </p>
          <p className="text-xl text-zinc-800 leading-relaxed font-bold">Yesterday we explored target segments. Today we learn how to validate insights through real conversations and structured feedback.</p>
        </section>

        <section className="bg-purple-50 border-4 border-purple-100 p-12 rounded-[3.5rem] space-y-8 shadow-sm">
          <h2 className="text-3xl font-black text-purple-950 tracking-tight">Learning Objectives</h2>
          <ul className="space-y-4">
            {[
              'Conduct structured discovery interviews',
              'Design clear & unbiased surveys',
              'Identify recurring pain themes',
              'Synthesize insights using AI tools'
            ].map(item => (
              <li key={item} className="flex items-center gap-4 text-purple-950 font-black text-lg">
                <CheckCircle className="w-6 h-6 text-purple-600 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-10">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">1. Why User Interviews Matter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Deep 'Why'", desc: "Understand user motivation beyond what behavioral data shows." },
              { title: "Assumptions", desc: "Validate high-risk assumptions early before spending engineering resources." },
              { title: "Unspoken Needs", desc: "Discover emotional triggers and pain points users didn't mention." },
              { title: "Empathy", desc: "Build genuine intuition for the user's daily life and environment." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white border-2 border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
                <h4 className="font-black text-zinc-950">{item.title}</h4>
                <p className="text-sm text-zinc-500 font-bold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="p-10 bg-indigo-50 border-2 border-indigo-100 rounded-[3rem] space-y-4 shadow-sm">
            <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">Example: Insight to Feature</p>
            <p className="text-xl text-indigo-900 font-black italic">"I want to feel progress even if I study for 5 minutes."</p>
            <p className="text-lg text-indigo-600 font-bold">→ Inspired Duolingo's Streak system, now a core retention driver.</p>
          </div>
        </section>

        <section className="space-y-10">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">2. Types of Interview Questions</h2>
          <div className="overflow-hidden rounded-[3rem] border-2 border-zinc-100 shadow-2xl bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-white">
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Type</th>
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Example</th>
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-bold text-lg">
                <tr>
                  <td className="p-8 text-zinc-950 font-black bg-zinc-50">Behavioral (Past)</td>
                  <td className="p-8 text-indigo-600">“Tell me about the last time you ordered food.”</td>
                  <td className="p-8 text-zinc-600">Habit Analysis</td>
                </tr>
                <tr>
                  <td className="p-8 text-zinc-950 font-black bg-zinc-50">Attitudinal (Feelings)</td>
                  <td className="p-8 text-indigo-600">“What frustrates you most about your current apps?”</td>
                  <td className="p-8 text-zinc-600">Pain Discovery</td>
                </tr>
                <tr>
                  <td className="p-8 text-zinc-950 font-black bg-zinc-50">Aspirational (Future)</td>
                  <td className="p-8 text-indigo-600">“What would make your experience 10x better?”</td>
                  <td className="p-8 text-zinc-600">Ideation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-amber-50 border-2 border-dashed border-amber-200 rounded-[2.5rem] flex items-center gap-6">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shrink-0">🧠</div>
             <p className="text-xl text-amber-950 font-black">Golden Rule: No leading questions. Don't ask "Wouldn't it be better if...?" Ask "How do you feel about...?"</p>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">3. Interview Structure (15–20 min)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: '1', title: 'Intro', desc: 'Make the user comfortable. Explain purpose, emphasize there are no wrong answers.' },
              { id: '2', title: 'Context', desc: 'Understand background. Ask about their current tools, role, and daily routine.' },
              { id: '3', title: 'Core Questions', desc: 'Explore behaviors & pain. Deep dive into the specific problem area you\'re solving.' },
              { id: '4', title: 'Wrap Up', desc: 'Final insights & referrals. Ask if they have anything to add or know someone else to talk to.' }
            ].map((step) => (
              <div key={step.id} className="p-8 bg-white border-2 border-zinc-100 rounded-[2.5rem] space-y-4 hover:border-indigo-100 transition-all group">
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center font-black group-hover:bg-indigo-600 transition-colors">{step.id}</div>
                <h4 className="font-black text-xl text-zinc-950 tracking-tight">{step.title}</h4>
                <p className="text-zinc-500 font-bold leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-12 bg-zinc-950 rounded-[3.5rem] border-4 border-zinc-800 shadow-2xl relative overflow-hidden mt-12">
             <div className="absolute top-0 right-0 p-10 opacity-10"><MessageSquare className="w-32 h-32 text-white" /></div>
             <div className="relative z-10 space-y-6">
                <h4 className="text-2xl font-black text-indigo-400 flex items-center gap-3">
                  <Zap className="w-6 h-6" /> AI Accelerator
                </h4>
                <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem]">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Synthesis Prompt</p>
                  <p className="text-2xl font-black text-zinc-100 italic">"Summarize these interview transcripts into 3 distinct pain points and 3 desired outcomes."</p>
                </div>
             </div>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Survey Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Ask one thing per question",
              "Avoid biased wording",
              "Mix question types (MCQ + scale)",
              "Keep it under 10 questions"
            ].map((principle, i) => (
              <div key={i} className="flex items-center gap-6 p-8 bg-zinc-50 border-2 border-zinc-100 rounded-[2.5rem]">
                <CheckCircle className="w-8 h-8 text-emerald-500 shrink-0" />
                <p className="text-xl font-black text-zinc-800 tracking-tight">{principle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">4. Synthesizing Insights</h2>
          <p className="text-xl text-zinc-600 font-bold">After 5–10 interviews, group similar issues into actionable themes.</p>
          
          <div className="p-10 bg-white border-2 border-zinc-100 rounded-[3.5rem] shadow-sm flex flex-col md:row-span-1 gap-12 group transition-all hover:border-indigo-200">
            <div className="flex-1 space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 transition-colors">
                  <Quote className="w-8 h-8" />
                </div>
                <p className="text-3xl font-black text-zinc-900 tracking-tighter">"I forget my fitness goals midweek."</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-4">
                  <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">The Pain</p>
                  <p className="text-xl font-black text-rose-600">Motivation Drop</p>
                </div>
                <div className="space-y-4">
                  <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Feature Opportunity</p>
                  <p className="text-xl font-black text-indigo-600">AI Reminder Coach</p>
                </div>
                <div className="space-y-4">
                  <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Context</p>
                  <p className="text-lg font-bold text-zinc-600 leading-tight">Contextual nudges based on historical low-activity days.</p>
                </div>
              </div>
            </div>
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
              <h4 className="text-4xl font-black text-zinc-950 tracking-tighter">🎯 Day-8: User Insights Report</h4>
            </div>
            <p className="text-xl text-zinc-500 font-black uppercase tracking-widest">Assignment</p>
          </div>
          
          <div className="space-y-12">
            <h5 className="text-2xl font-black text-zinc-900 tracking-tight">1-Page Deliverable</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { id: '1', title: 'Top 3 Pain Points', desc: 'with supporting user quotes' },
                 { id: '2', title: 'Top 3 Desired Outcomes', desc: 'what users want to achieve' },
                 { id: '3', title: 'One Opportunity Statement', desc: 'How might we solve for X?' }
               ].map(task => (
                 <div key={task.id} className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 space-y-4">
                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 font-black shadow-sm">{task.id}</span>
                    <h6 className="text-lg font-black text-zinc-950 leading-tight">{task.title}</h6>
                    <p className="text-sm text-zinc-500 font-bold">{task.desc}</p>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-10 bg-zinc-900 rounded-[3rem] border border-zinc-800 text-white space-y-4">
                  <h6 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em]">Evaluation</h6>
                  <p className="text-xl font-black">Great: 3 strong actionable themes supported by data.</p>
               </div>
               <div className="p-10 bg-rose-50 rounded-[3rem] border-2 border-rose-100 flex items-center justify-center">
                  <p className="text-rose-900 font-black text-xl flex items-center gap-3">
                    <Clock className="w-6 h-6" /> 📌 Deadline: End of Day 10
                  </p>
               </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 p-8 bg-zinc-100 rounded-3xl border border-zinc-200">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Previous</p>
            <p className="text-xl font-black text-zinc-900">Introduction to User & Market Research 🔍</p>
          </div>
          <div className="flex-1 p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-2">Up Next</p>
            <p className="text-xl font-black">User Personas & Jobs To Be Done (JTBD) 👥</p>
          </div>
        </div>
      </div>
    ),
    resources: [
      { title: 'How To Conduct User Interviews Like A Pro', url: 'https://youtu.be/5tVbFfGDQCk?si=91eAIcNvjUAFfxM1', type: 'video' }
    ]
  },
  {
    day: 9,
    title: 'User Personas & Jobs To Be Done (JTBD) 👥',
    category: 'Research',
    preview: '“You don’t design for everyone — you design for someone.” Convert raw feedback into structured user profiles.',
    content: (
      <div className="space-y-16">
        <header className="bg-zinc-950 p-12 rounded-[3rem] border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">
            <Clock className="w-4 h-4" /> 45 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">User Personas & JTBD 👥</h1>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed">“You don’t design for everyone — you design for someone.” Convert raw feedback into structured user profiles.</p>
        </header>

        <section className="space-y-8">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Turning Data into Insights</h2>
          <p className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight italic">
            “You don’t design for everyone — you design for someone.”
          </p>
          <p className="text-xl text-zinc-800 leading-relaxed font-bold">Yesterday we captured raw feedback. Today we turn that data into structured, usable insights.</p>
        </section>

        <section className="bg-purple-50 border-4 border-purple-100 p-12 rounded-[3.5rem] space-y-8 shadow-sm">
          <h2 className="text-3xl font-black text-purple-950 tracking-tight">Learning Objectives</h2>
          <ul className="space-y-4">
            {[
              'Build realistic user personas based on real data',
              'Write JTBD statements that reflect true motivations',
              'Use personas to guide feature & UX decisions',
              'Apply AI tools to accelerate synthesis'
            ].map(item => (
              <li key={item} className="flex items-center gap-4 text-purple-950 font-black text-lg">
                <CheckCircle className="w-6 h-6 text-purple-600 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">1. From Research → Insights → Personas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: '1', title: 'Clustering', desc: 'Group similar behaviors and motivations from Day-8 transcripts.', icon: <Layers className="w-6 h-6" /> },
              { id: '2', title: 'Identification', desc: 'Find recurring pain points and primary goals across clusters.', icon: <Search className="w-6 h-6" /> },
              { id: '3', title: 'Narrative', desc: 'Write a short, human-centric story for each segment.', icon: <FileEdit className="w-6 h-6" /> }
            ].map((step) => (
              <div key={step.id} className="p-8 bg-white border-2 border-zinc-100 rounded-[2.5rem] space-y-4 shadow-sm hover:border-indigo-100 transition-colors group">
                <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center font-black group-hover:bg-indigo-600 transition-colors">{step.id}</div>
                <div className="p-4 bg-zinc-50 rounded-xl w-fit text-indigo-600">{step.icon}</div>
                <h4 className="font-black text-xl text-zinc-950 tracking-tight leading-tight">{step.title}</h4>
                <p className="text-sm text-zinc-500 font-bold">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-[3rem] border-2 border-zinc-100 shadow-2xl bg-white mt-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-white">
                  <th className="p-8 font-black text-xs uppercase tracking-widest">User Quote</th>
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Persona Name</th>
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Core Insight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-bold text-lg">
                <tr>
                  <td className="p-8 text-zinc-500 italic font-medium">“I start strong but can’t stay consistent.”</td>
                  <td className="p-8 text-indigo-600">Motivated Starter</td>
                  <td className="p-8 text-zinc-950">Needs daily accountability loops</td>
                </tr>
                <tr>
                  <td className="p-8 text-zinc-500 italic font-medium">“I want data to track my progress.”</td>
                  <td className="p-8 text-indigo-600">Data-Driven Achiever</td>
                  <td className="p-8 text-zinc-950">Needs progress visualizations</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-amber-50 border-2 border-dashed border-amber-200 rounded-[2.5rem] flex items-center gap-6">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shrink-0">🧠</div>
             <p className="text-xl text-amber-950 font-black">Best Practice: 2–3 meaningful personas are better than 8–10 generic ones.</p>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">2. Persona Template</h2>
          <div className="p-10 bg-white border-2 border-zinc-100 rounded-[3.5rem] shadow-xl flex flex-col md:row-span-1 gap-12 group transition-all hover:border-indigo-200">
             <div className="flex-1 space-y-10">
                <div className="flex flex-col md:flex-row items-center gap-8 border-b border-zinc-100 pb-10">
                   <div className="w-24 h-24 bg-zinc-100 rounded-[2rem] flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 transition-colors">
                      <UserCircle className="w-12 h-12" />
                   </div>
                   <div className="text-center md:text-left space-y-2">
                      <h4 className="text-3xl font-black text-zinc-900 tracking-tighter">Rahul</h4>
                      <p className="text-zinc-500 font-bold">Rahul Sharma, 27 | Software Engineer</p>
                      <p className="text-xl font-black text-indigo-600 italic">“I need a coach who reminds me daily.”</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-4">
                      <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Bio</p>
                      <p className="text-lg font-bold text-zinc-600 leading-tight">Works long hours; highly motivated to stay fit but misses consistency due to exhaustion.</p>
                   </div>
                   <div className="space-y-4">
                      <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Goals</p>
                      <p className="text-lg font-bold text-zinc-600 leading-tight">Build a long-term habit and see measurable physical results.</p>
                   </div>
                   <div className="space-y-4">
                      <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Frustrations</p>
                      <p className="text-lg font-bold text-zinc-600 leading-tight">Lack of personalized accountability; generalized tools don't adapt to his schedule.</p>
                   </div>
                   <div className="space-y-4">
                      <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Tech Comfort</p>
                      <p className="text-lg font-bold text-zinc-600 leading-tight">High. Owns a Garmin smartwatch and uses multiple trackers.</p>
                   </div>
                </div>
             </div>
          </div>
          <div className="p-8 bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-[2.5rem] flex items-center gap-6">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shrink-0">📍</div>
             <p className="text-xl text-emerald-950 font-black">Tip: Add emotion — Personas should feel human, not just like data points.</p>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">3. Jobs To Be Done (JTBD) Framework</h2>
          <p className="text-xl text-zinc-600 font-bold">Users don’t buy products. They hire them to get a job done.</p>
          
          <div className="p-12 bg-zinc-900 text-white rounded-[3.5rem] space-y-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-10"><Target className="w-32 h-32" /></div>
             <div className="space-y-6">
                <h4 className="text-2xl font-black text-indigo-400">The Template</h4>
                <div className="space-y-4 text-3xl md:text-4xl font-black tracking-tighter">
                   <p className="text-zinc-500"><span className="text-white">When I</span> situation,</p>
                   <p className="text-zinc-500"><span className="text-white">I want to</span> motivation,</p>
                   <p className="text-zinc-500"><span className="text-white">So I can</span> desired outcome.</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/10">
                {[
                  { brand: 'Duolingo', quote: '"When I have free time, I want quick practice, so I feel productive."' },
                  { brand: 'Notion', quote: '"When I start a project, I want everything in one place, so I stay organized."' },
                  { brand: 'Swiggy', quote: '"When I’m tired, I want fast ordering, so I can relax without effort."' }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                     <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">{item.brand}</p>
                     <p className="text-lg font-bold text-zinc-300 italic">{item.quote}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">4. Connecting Personas → JTBD → Features</h2>
          <div className="overflow-hidden rounded-[3rem] border-2 border-zinc-100 shadow-2xl bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-white">
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Persona</th>
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Job To Be Done</th>
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Feature Idea</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-bold text-lg">
                <tr>
                  <td className="p-8 text-zinc-950">Motivated Starter</td>
                  <td className="p-8 text-indigo-600">Stay consistent even when busy</td>
                  <td className="p-8 text-zinc-600">AI habit reminders + streaks</td>
                </tr>
                <tr>
                  <td className="p-8 text-zinc-950">Data Achiever</td>
                  <td className="p-8 text-indigo-600">Track measurable progress</td>
                  <td className="p-8 text-zinc-600">Analytics dashboard</td>
                </tr>
                <tr>
                  <td className="p-8 text-zinc-950">Social Sharer</td>
                  <td className="p-8 text-indigo-600">Celebrate success publicly</td>
                  <td className="p-8 text-zinc-600">Leaderboards & badges</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-12">
          <div className="p-12 bg-zinc-50 border-2 border-zinc-100 rounded-[3.5rem] space-y-10">
             <h4 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
               <Zap className="w-6 h-6 text-indigo-600" /> AI Accelerator
             </h4>
             <div className="p-8 bg-white border border-zinc-200 rounded-[2.5rem] shadow-sm">
                <p className="text-lg font-bold text-zinc-700 leading-relaxed italic">“You are a Product Manager summarizing 10 interview transcripts about study habits. Group user patterns into 2-3 personas and write JTBD statements for each.”</p>
                <div className="flex gap-4 mt-6">
                   <span className="px-4 py-1.5 bg-zinc-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">ChatGPT</span>
                   <span className="px-4 py-1.5 bg-zinc-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">Notion AI</span>
                </div>
             </div>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Spotify Case Study</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-sm space-y-4 hover:border-indigo-100 transition-all group">
                <h4 className="text-2xl font-black text-zinc-900">Music Explorer</h4>
                <p className="text-lg font-bold text-zinc-500 italic">“Give me music for my mood instantly”</p>
                <div className="pt-4 flex items-center gap-3 text-indigo-600 font-black">
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                   <span>Discover Weekly</span>
                </div>
             </div>
             <div className="p-10 bg-white border-2 border-zinc-100 rounded-[3rem] shadow-sm space-y-4 hover:border-indigo-100 transition-all group">
                <h4 className="text-2xl font-black text-zinc-900">Loyal Listener</h4>
                <p className="text-lg font-bold text-zinc-500 italic">“Save songs automatically for later”</p>
                <div className="pt-4 flex items-center gap-3 text-indigo-600 font-black">
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                   <span>Liked Songs Library</span>
                </div>
             </div>
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
              <h4 className="text-4xl font-black text-zinc-950 tracking-tighter">🎯 Day-9: Persona & JTBD Deck</h4>
            </div>
            <p className="text-xl text-zinc-500 font-black uppercase tracking-widest">Assignment</p>
          </div>
          
          <div className="space-y-12">
            <h5 className="text-2xl font-black text-zinc-900 tracking-tight">Final Deliverables</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { id: '1', title: '2 Personas', desc: 'Name, Bio, Goals, Pains, Behavior, Quote.' },
                 { id: '2', title: 'JTBD Statements', desc: '1 clear statement per persona.' },
                 { id: '3', title: '1 Feature Suggestion', desc: 'Clearly aligned to the "Job".' }
               ].map(task => (
                 <div key={task.id} className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 space-y-4">
                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 font-black shadow-sm">{task.id}</span>
                    <h6 className="text-lg font-black text-zinc-950 leading-tight">{task.title}</h6>
                    <p className="text-sm text-zinc-500 font-bold">{task.desc}</p>
                 </div>
               ))}
            </div>

            <div className="p-10 bg-zinc-950 rounded-[3rem] border-4 border-zinc-800 text-white space-y-6">
               <div className="flex justify-between items-center">
                  <h6 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em]">Format</h6>
                  <p className="text-xl font-black">Canva / Slides / Notion</p>
               </div>
               <div className="flex justify-between items-center border-t border-white/10 pt-6">
                  <h6 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em]">Submission</h6>
                  <p className="text-xl font-black">End of Day 11</p>
               </div>
            </div>
          </div>
          <div className="mt-12 p-8 bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-[2.5rem] flex items-center gap-6">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shrink-0">👉</div>
             <p className="text-xl text-emerald-950 font-black">Tip: Use Canva’s Persona Templates to make your deck professional!</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 p-8 bg-zinc-100 rounded-3xl border border-zinc-200">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Previous</p>
            <p className="text-xl font-black text-zinc-900">User Interviews & Surveys 🎙️</p>
          </div>
          <div className="flex-1 p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-2">Up Next</p>
            <p className="text-xl font-black">Competitive & Market Analysis 🧭</p>
          </div>
        </div>
      </div>
    ),
    resources: [
      { title: 'Jobs to be done', url: 'https://youtu.be/dbVN6EYql6k?si=2440TMiKd3ZVmGvK', type: 'video' },
      { title: 'Creating Personas', url: 'https://youtu.be/v6EWN4EjHM0?si=5up6JXpGPfYnIq1d', type: 'video' }
    ]
  },
  {
    day: 10,
    title: 'Competitive & Market Analysis 🧭',
    category: 'Strategy',
    preview: '“You can’t build a better product until you understand what already exists.” Master SWOT and feature benchmarking.',
    content: (
      <div className="space-y-16">
        <header className="bg-zinc-950 p-12 rounded-[3rem] border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">
            <Clock className="w-4 h-4" /> 45 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">Competitive & Market Analysis 🧭</h1>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed">“You can’t build a better product until you understand what already exists.” Master SWOT and feature benchmarking.</p>
        </header>

        <section className="space-y-8">
          <p className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight italic">
            “You can’t build a better product until you understand what already exists.”
          </p>
          <p className="text-xl text-zinc-800 leading-relaxed font-bold">Today’s goal is to position your idea intelligently. Learn to identify market gaps — not by copying, but by identifying where competitors fall short.</p>
        </section>

        <section className="bg-indigo-50 border-4 border-indigo-100 p-12 rounded-[3.5rem] space-y-8 shadow-sm">
          <h2 className="text-3xl font-black text-indigo-950 tracking-tight">Learning Objectives</h2>
          <ul className="space-y-4">
            {[
              'Conduct structured competitive benchmarking',
              'Perform SWOT analysis for 2–3 competitors',
              'Identify feature gaps and differentiators',
              'Define your product\'s unique positioning statement'
            ].map(item => (
              <li key={item} className="flex items-center gap-4 text-indigo-950 font-black text-lg">
                <CheckCircle className="w-6 h-6 text-indigo-600 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">1. Mapping the Landscape</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Direct Competitors', desc: 'Same product, same target audience.', ex: 'Habitica vs Streaks', icon: <Target className="w-6 h-6" /> },
              { title: 'Indirect Competitors', desc: 'Solve the same need differently.', ex: 'Google Tasks vs Notion', icon: <RefreshCcw className="w-6 h-6" /> },
              { title: 'Aspirational', desc: 'Inspire UX or growth strategies.', ex: 'Headspace for UI vibes', icon: <Star className="w-6 h-6" /> }
            ].map((cat, i) => (
              <div key={i} className="p-8 bg-white border-2 border-zinc-100 rounded-[2.5rem] space-y-4 shadow-sm hover:border-indigo-100 transition-all group">
                <div className="p-4 bg-zinc-50 rounded-xl w-fit text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">{cat.icon}</div>
                <h4 className="font-black text-xl text-zinc-900">{cat.title}</h4>
                <p className="text-sm text-zinc-500 font-bold leading-relaxed">{cat.desc}</p>
                <div className="pt-2 border-t border-zinc-50">
                   <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Example</p>
                   <p className="text-sm font-black text-zinc-800">{cat.ex}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-10 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[3rem] flex items-center gap-8 group">
             <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-3xl shrink-0 shadow-sm group-hover:rotate-12 transition-transform">🧩</div>
             <p className="text-xl text-zinc-900 font-black italic">
                AI Hack: Ask Perplexity AI "List top 10 apps competing with [idea], include audience and unique features."
             </p>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">2. Framework 1: SWOT Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-10 bg-emerald-50 border-2 border-emerald-100 rounded-[3rem] space-y-4">
              <h4 className="text-2xl font-black text-emerald-950 flex items-center gap-3">
                <TrendingUp2 className="w-7 h-7" /> Strengths
              </h4>
              <p className="text-lg text-emerald-900 font-bold">What do they do well?</p>
              <p className="text-sm text-emerald-800/70 italic">Example: "Beautiful UI, gamified loop"</p>
            </div>
            <div className="p-10 bg-rose-50 border-2 border-rose-100 rounded-[3rem] space-y-4">
              <h4 className="text-2xl font-black text-rose-950 flex items-center gap-3">
                <ShieldAlertIcon className="w-7 h-7" /> Weaknesses
              </h4>
              <p className="text-lg text-rose-900 font-bold">Where do they fall short?</p>
              <p className="text-sm text-rose-800/70 italic">Example: "Limited AI personalization"</p>
            </div>
            <div className="p-10 bg-blue-50 border-2 border-blue-100 rounded-[3rem] space-y-4">
              <h4 className="text-2xl font-black text-blue-950 flex items-center gap-3">
                <CompassIcon className="w-7 h-7" /> Opportunities
              </h4>
              <p className="text-lg text-blue-900 font-bold">What can we do better?</p>
              <p className="text-sm text-blue-800/70 italic">Example: "Add AI coach habit nudges"</p>
            </div>
            <div className="p-10 bg-amber-50 border-2 border-amber-100 rounded-[3rem] space-y-4">
              <h4 className="text-2xl font-black text-amber-950 flex items-center gap-3">
                <Zap className="w-7 h-7" /> Threats
              </h4>
              <p className="text-lg text-amber-900 font-bold">What could hurt us?</p>
              <p className="text-sm text-amber-800/70 italic">Example: "Big tech (Apple) entry"</p>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">3. Framework 2: Feature Comparison Matrix</h2>
          <div className="overflow-hidden rounded-[3rem] border-2 border-zinc-100 shadow-2xl bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-white">
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Feature</th>
                  <th className="p-8 font-black text-xs uppercase tracking-widest text-indigo-400">Us</th>
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Comp A</th>
                  <th className="p-8 font-black text-xs uppercase tracking-widest">Comp B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-bold text-lg">
                <tr>
                  <td className="p-8 text-zinc-950">Personalized Dashboard</td>
                  <td className="p-8 text-indigo-600">✅</td>
                  <td className="p-8 text-rose-500">❌</td>
                  <td className="p-8 text-indigo-600">✅</td>
                </tr>
                <tr>
                  <td className="p-8 text-zinc-950">AI Habit Coach</td>
                  <td className="p-8 text-indigo-600">✅</td>
                  <td className="p-8 text-rose-500">❌</td>
                  <td className="p-8 text-rose-500">❌</td>
                </tr>
                <tr>
                  <td className="p-8 text-zinc-950">Gamified Streaks</td>
                  <td className="p-8 text-indigo-600">✅</td>
                  <td className="p-8 text-indigo-600">✅</td>
                  <td className="p-8 text-indigo-600">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-amber-50 border-2 border-dashed border-amber-200 rounded-[2.5rem] flex items-center gap-6">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shrink-0">🧠</div>
             <p className="text-xl text-amber-950 font-black">Insight: Discover what is "table-stakes" vs "differentiating".</p>
          </div>
        </section>

        <section className="space-y-12">
          <div className="p-12 bg-zinc-900 rounded-[4rem] text-white space-y-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
            <h2 className="text-3xl font-black text-indigo-400 tracking-tight flex items-center gap-4">
               <Bot className="w-8 h-8" /> AI Prompts for Strategy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
               <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-2">
                  <p className="text-lg font-bold text-zinc-100 italic leading-relaxed">"Create a SWOT analysis for Fitbit and identify two strategic gaps a new product could exploit."</p>
               </div>
               <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-2">
                  <p className="text-lg font-bold text-zinc-100 italic leading-relaxed">"Summarize the top 5 AI habit tracking apps in 2025, their core features, and pricing."</p>
               </div>
            </div>
          </div>
        </section>

        <section className="p-12 bg-white border-4 border-zinc-100 rounded-[4rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
           <h2 className="text-3xl font-black text-zinc-950 mb-10 tracking-tight flex items-center gap-4">
             <BarChart className="w-8 h-8 text-indigo-600" />
             Zerodha vs Groww
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-4">
                 <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Zerodha Strength</p>
                 <p className="text-2xl font-black text-zinc-800 leading-tight">Advanced tools for Traders.</p>
              </div>
              <div className="space-y-4">
                 <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Groww Strength</p>
                 <p className="text-2xl font-black text-zinc-800 leading-tight">UI simplicity for First-timers.</p>
              </div>
           </div>
           <div className="mt-12 p-8 bg-indigo-50 border-2 border-indigo-100 rounded-[2.5rem]">
              <p className="text-xl font-black text-indigo-900 leading-relaxed italic">Design simplicity was the differentiator Groww used to disrupt a market of "complex dashboards."</p>
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
              <h4 className="text-4xl font-black text-zinc-950 tracking-tighter">🎯 Day-10: Competitive Report</h4>
            </div>
            <p className="text-xl text-zinc-500 font-black uppercase tracking-widest">Assignment</p>
          </div>
          
          <div className="space-y-12">
            <h5 className="text-2xl font-black text-zinc-900 tracking-tight">Final Deliverables (2–3 slides)</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { id: '1', title: '2 SWOT Analyses', desc: 'Competitor A & B.' },
                 { id: '2', title: 'Feature Comparison Matrix', desc: 'Us vs others.' },
                 { id: '3', title: 'Positioning Statement', desc: '“Unlike X and Y, our product [does what] for [whom].”' }
               ].map(task => (
                 <div key={task.id} className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 space-y-4">
                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 font-black shadow-sm">{task.id}</span>
                    <h6 className="text-lg font-black text-zinc-950 leading-tight">{task.title}</h6>
                    <p className="text-sm text-zinc-500 font-bold">{task.desc}</p>
                 </div>
               ))}
            </div>

            <div className="p-10 bg-zinc-950 rounded-[3rem] border-4 border-zinc-800 text-white space-y-6">
               <div className="flex justify-between items-center">
                  <h6 className="text-xs font-black text-rose-400 uppercase tracking-[0.2em]">Deadline</h6>
                  <p className="text-xl font-black">End of Day 10</p>
               </div>
               <div className="flex items-center gap-4 text-emerald-400 border-t border-white/10 pt-6">
                  <CheckCircle className="w-6 h-6" />
                  <p className="text-xl font-black uppercase tracking-widest">You've reached the end! 🏆</p>
               </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 p-8 bg-zinc-100 rounded-3xl border border-zinc-200">
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Previous</p>
            <p className="text-xl font-black text-zinc-900">User Personas & Jobs To Be Done (JTBD) 👥</p>
          </div>
          <div className="flex-1 p-8 bg-indigo-100 rounded-3xl border-2 border-dashed border-indigo-300 flex items-center justify-center opacity-70">
            <p className="text-sm font-black text-indigo-600 uppercase tracking-widest">End of Module</p>
          </div>
        </div>
      </div>
    ),
    resources: [
      { title: 'Competitive Analysis for Product Managers', url: 'https://youtu.be/UnBL8h8TVX8?si=v7_4Kx9EDy357xjg', type: 'video' }
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