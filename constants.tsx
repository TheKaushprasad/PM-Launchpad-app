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
  Music, UserCheck, ClipboardList as ClipboardIcon
} from 'lucide-react';

export const getCategoryColor = (category: Category): string => {
  switch (category) {
    case 'Foundations': return 'bg-blue-50 text-blue-600 border-blue-100';
    case 'Research': return 'bg-purple-50 text-purple-600 border-purple-100';
    case 'Data': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'Design': return 'bg-pink-50 text-pink-600 border-pink-100';
    case 'AI': return 'bg-orange-50 text-orange-600 border-orange-100';
    case 'Strategy': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
    case 'Tech': return 'bg-cyan-50 text-cyan-600 border-cyan-100';
    default: return 'bg-zinc-50 text-zinc-600 border-zinc-100';
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans text-left">
        <header className="bg-indigo-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Day-0: Foundation & Mindset — Start Your PM Journey Right 🚀</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Welcome to Day-0 of learning Product Management from scratch! Before we jump into frameworks, tools, and case studies, today is about building the right mindset to succeed as a Product Manager.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-6 text-left">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">The Path Ahead</h2>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">Product Management is one of the most competitive and rewarding careers today. But breaking into PM without prior experience can feel overwhelming because the role demands:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {[
                { t: 'Collaboration', d: 'Cross-functional teamwork across design and tech.' },
                { t: 'Strategy', d: 'Strategic thinking & data-driven decision-making.' },
                { t: 'Problem-solving', d: 'Solving complex problems with high ambiguity.' },
                { t: 'Interdisciplinary', d: 'Deep understanding of business, design, tech & data.' }
              ].map(item => (
                <div key={item.t} className="p-5 bg-zinc-50 border border-zinc-100 rounded-2xl">
                   <h4 className="font-black text-indigo-600 mb-1">{item.t}</h4>
                   <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
            <p className="text-lg leading-relaxed text-zinc-600 mt-6">Many aspiring PMs struggle not because they lack skills, but because they lack clarity of purpose and direction.</p>
          </section>

          <section className="space-y-6 bg-zinc-950 text-white p-8 md:p-12 rounded-[2.5rem] border border-zinc-800">
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <Target className="w-8 h-8 text-indigo-400" />
              Why Day-0 Matters
            </h2>
            <div className="space-y-6 text-zinc-300 text-left">
              <p className="text-lg leading-relaxed font-medium">Before learning “how to be a PM”, you must understand why you want to be a PM. PMs face pressure, ownership, ambiguity, and constant context switching — your motivation will keep you going when it gets hard.</p>
              <p className="text-lg leading-relaxed font-medium">Understanding the reality of the role—not just the glamour—helps you evaluate:</p>
              <ul className="space-y-4">
                {[
                  "Is PM aligned with your strengths & interests?",
                  "Do you enjoy solving problems and talking to users?",
                  "Are you comfortable making decisions without perfect data?"
                ].map(q => (
                  <li key={q} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span className="font-bold">{q}</span>
                  </li>
                ))}
              </ul>
              <p className="text-indigo-300 font-bold italic border-l-2 border-indigo-500 pl-4">The fastest way to answer these questions is to talk to real PMs, understand their challenges, impact, and day-to-day responsibilities.</p>
            </div>
          </section>

          <section className="space-y-8 text-left">
            <div className="flex items-center gap-3 text-left">
              <div className="p-3 bg-pink-100 rounded-xl text-pink-600"><PenTool className="w-6 h-6" /></div>
              <h2 className="text-3xl font-black tracking-tight text-zinc-900">Reflection Exercise</h2>
            </div>
            <p className="text-lg text-zinc-600 font-medium">Write answers to these 3 questions:</p>
            <div className="grid grid-cols-1 gap-4">
               {[
                 { q: '1. Why do I want to become a Product Manager?', c: 'Focus on your internal drivers.' },
                 { q: '2. What strengths do I already have that can help me succeed?', c: 'Inventory your current skillset.' },
                 { q: '3. What areas do I need to improve over the next 45 days?', c: 'Be honest about your gaps.' }
               ].map(item => (
                 <div key={item.q} className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:border-indigo-200 transition-all text-left">
                    <p className="text-zinc-900 font-black text-lg mb-2">{item.q}</p>
                    <p className="text-zinc-400 text-sm font-medium italic">{item.c}</p>
                 </div>
               ))}
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10 text-left">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Day's Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4 mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Users className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">Task 1 — Must Do Today</h4>
            <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl">Reach out to 5 Product Managers and ask them about their journey & role.</p>
          </header>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans text-left">
        <header className="bg-indigo-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">What is Product Management? 🚀</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Understand the role, responsibilities, types, and myths about Product Management.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-6 text-left">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">1. What is a Product?</h2>
            <p className="text-lg text-zinc-600">A product is anything that creates value by solving a real user problem or fulfilling a need—whether physical, digital, or service-based.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {['Uber', 'Spotify', 'iPhone', 'Google Ads', 'ATM', 'WhatsApp'].map(p => (
                <span key={p} className="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-xl font-bold text-zinc-700">{p}</span>
              ))}
            </div>
          </section>

          <section className="space-y-6 text-left">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">2. Do Companies Need Product Managers?</h2>
            <p className="text-lg text-zinc-600">Short answer: Yes—but the title isn’t always necessary. Product thinking is.</p>
            <div className="overflow-x-auto rounded-2xl border border-zinc-100 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="p-4 font-black text-xs uppercase tracking-widest text-zinc-400">Stage</th>
                    <th className="p-4 font-black text-xs uppercase tracking-widest text-zinc-400">Who acts as PM</th>
                    <th className="p-4 font-black text-xs uppercase tracking-widest text-zinc-400">Why it works</th>
                    <th className="p-4 font-black text-xs uppercase tracking-widest text-zinc-400">When it breaks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <tr>
                    <td className="p-4 font-bold text-zinc-900">Early startup</td>
                    <td className="p-4 text-zinc-600">Founder</td>
                    <td className="p-4 text-zinc-600 text-sm">Small team, fast decisions</td>
                    <td className="p-4 text-zinc-600 text-sm">Complexity increases</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-zinc-900">Growth stage</td>
                    <td className="p-4 text-zinc-600">Dedicated PMs</td>
                    <td className="p-4 text-zinc-600 text-sm">Align teams, prioritize impact</td>
                    <td className="p-4 text-zinc-600 text-sm">Misalignment without PMs</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-zinc-900">Large enterprise</td>
                    <td className="p-4 text-zinc-600">Product leaders</td>
                    <td className="p-4 text-zinc-600 text-sm">Scale & coordination</td>
                    <td className="p-4 text-zinc-600 text-sm">Feature bloat & chaos</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-6 bg-zinc-50 p-8 rounded-3xl border border-zinc-100 text-left">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">3. Real-World Exceptions</h2>
            <p className="text-zinc-600 font-medium">Some companies have succeeded without formal PMs:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { n: 'Basecamp', d: 'Design-led product development' },
                { n: 'Valve', d: 'Self-organized teams' },
                { n: 'Early FB / Stripe', d: 'Engineer-led decisions' }
              ].map(item => (
                <div key={item.n} className="p-4 bg-white border border-zinc-100 rounded-2xl">
                   <h4 className="font-black text-indigo-600 mb-1">{item.n}</h4>
                   <p className="text-xs text-zinc-500 font-bold">{item.d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm font-black text-indigo-900 bg-indigo-100 p-4 rounded-xl">👉 These work only when everyone practices product thinking: user obsession + data + trade-offs + execution focus.</p>
          </section>

          <section className="space-y-6 text-left">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">4. What is Product Management?</h2>
            <p className="text-lg text-zinc-600">Product Management is the function responsible for guiding a product from idea → launch → growth → scale by balancing:</p>
            <div className="flex flex-col md:flex-row items-center gap-4 text-center">
              <div className="flex-1 p-6 bg-blue-50 border border-blue-100 rounded-2xl font-black text-blue-900">User Value (Solving Pain)</div>
              <X className="text-zinc-300 hidden md:block" />
              <div className="flex-1 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl font-black text-emerald-900">Business Goals (Revenue)</div>
              <X className="text-zinc-300 hidden md:block" />
              <div className="flex-1 p-6 bg-pink-50 border border-pink-100 rounded-2xl font-black text-pink-900">Tech Feasibility</div>
            </div>
            <p className="text-center font-bold text-zinc-500 italic">"PMs don’t decide how to build — they decide what to build and why."</p>
          </section>

          <section className="space-y-8 text-left">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">7. Types of Product Managers & Why They Exist 🔍</h2>
            <p className="text-zinc-600 leading-relaxed font-medium">As products scale, complexity grows — more users, more data, and deeper specialization needs.</p>
            
            <div className="space-y-6">
              {[
                { 
                  t: '1. Core Product Manager', 
                  s: 'The Generalist', 
                  f: 'End-to-end ownership of user-facing product experiences.',
                  ex: 'Swiggy improving checkout conversion from 85% → 92%',
                  m: 'Retention, Adoption, NPS, DAU'
                },
                { 
                  t: '2. Growth Product Manager', 
                  s: 'The Optimizer', 
                  f: 'Driving acquisition, activation, retention & revenue.',
                  ex: 'Duolingo improving daily streak feature → +15% retention',
                  m: 'DAU/MAU, Conversion Rate, LTV, Churn'
                },
                { 
                  t: '3. Platform Product Manager', 
                  s: 'The Enabler', 
                  f: 'Internal systems, APIs & developer experience.',
                  ex: 'Razorpay building unified payments gateway API',
                  m: 'API Uptime, Latency, Integration Adoption'
                },
                { 
                  t: '4. Data Product Manager', 
                  s: 'The Analyst PM', 
                  f: 'Data pipelines, dashboards & experimentation framework.',
                  ex: 'Meesho enabling real-time retention dashboards',
                  m: 'Data accuracy, Latency, Dashboard usage'
                },
                { 
                  t: '5. Technical Product Manager', 
                  s: 'TPM', 
                  f: 'Highly technical systems & integrations.',
                  ex: 'Slack launching developer API endpoints',
                  m: 'Reliability, Integration success, Performance'
                },
                { 
                  t: '6. AI Product Manager', 
                  s: 'The Intelligent Builder', 
                  f: 'Products powered by machine learning & generative AI.',
                  ex: 'Netflix personalization engine → +15% viewing time',
                  m: 'Model accuracy, Usage, Adoption'
                }
              ].map(type => (
                <div key={type.t} className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2rem] space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black text-zinc-900 tracking-tight">{type.t}</h3>
                      <p className="text-indigo-600 font-black uppercase text-xs tracking-widest">{type.s}</p>
                    </div>
                    <span className="p-3 bg-white rounded-xl shadow-sm"><Settings2 className="w-5 h-5 text-zinc-400" /></span>
                  </div>
                  <p className="text-zinc-600 font-bold">Focus: {type.f}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-left">
                    <div className="p-4 bg-white rounded-xl border border-zinc-100">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Real Example</p>
                      <p className="text-sm font-bold text-zinc-800">{type.ex}</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-zinc-100">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">North Star Metrics</p>
                      <p className="text-sm font-bold text-emerald-900">{type.m}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6 text-left">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Myths vs Reality</h2>
            <div className="space-y-4">
              {[
                { m: '“PMs are the boss of the team.”', r: 'PMs have no authority — influence only.' },
                { m: '“PMs must know how to code.”', r: 'Not required, but tech literacy is crucial.' },
                { m: '“PMs only build new features.”', r: 'PMs solve problems. Sometimes by removing features.' },
                { m: '“PMs manage timelines.”', r: 'That\'s project management. PMs define what & why.' }
              ].map(item => (
                <div key={item.m} className="flex flex-col md:flex-row gap-4 p-5 border border-zinc-100 rounded-2xl">
                  <div className="flex-1 line-through text-zinc-400 font-bold">{item.m}</div>
                  <div className="hidden md:block text-zinc-300">→</div>
                  <div className="flex-1 text-emerald-600 font-black">{item.r}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10 text-left">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Day's Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4 mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-1 Mini Assignment</h4>
            <p className="text-xl text-zinc-600 font-medium">Analyze a Daily Product</p>
          </header>
          
          <div className="space-y-8">
            <div className="p-8 bg-zinc-950 rounded-3xl border border-zinc-800 text-left">
              <p className="font-black text-indigo-400 uppercase tracking-widest text-xs mb-6">Submission Format</p>
              <div className="p-6 bg-zinc-900 rounded-2xl font-mono text-zinc-300 text-sm">
                Product Name: ___ <br/>
                User Problem: ___ <br/>
                Key Metrics: ___ <br/>
                Improvement Suggestion: ___
              </div>
            </div>

            <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-3xl">
              <h5 className="font-black text-indigo-900 mb-2">Reflection Task</h5>
              <p className="text-indigo-800 font-medium text-left">Identify which of the 6 PM types excites you the most and why. Does it align with your current background (e.g., Engineer → TPM, Marketing → Growth)?</p>
            </div>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans text-left">
        <header className="bg-indigo-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">The Product Development Lifecycle (PDLC) 📘</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Theme: How products move from idea → design → build → launch → iterate.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-8 text-left">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">The PDLC Roadmap</h2>
            <div className="bg-zinc-50 rounded-3xl p-6 md:p-10 border border-zinc-100 mb-8 text-center">
                <div className="bg-[#FDF8E1] p-12 rounded-[2.5rem] border border-[#F1E5C1] shadow-sm max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-black text-[#1F1E1C] mb-12 tracking-tight">The Product Development Lifecycle (PDLC)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6">
                        {['DISCOVERY', 'DEFINITION', 'DESIGN', 'DEVELOPMENT', 'LAUNCH', 'ITERATION'].map((label) => (
                            <div key={label} className="relative group">
                                <div className="bg-[#9CA3AF] text-white py-6 px-4 font-black tracking-[0.2em] text-sm clip-path-arrow shadow-sm group-hover:bg-[#4B5563] transition-colors">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </section>

          <section className="space-y-6 text-left">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">1. What is PDLC?</h2>
            <p className="text-lg text-zinc-600">Product Development Lifecycle (PDLC) is the structured process of taking a product from problem discovery → launch → continuous improvement, ensuring decisions are user-driven, data-backed, and business-aligned.</p>
            <div className="overflow-x-auto rounded-2xl border border-zinc-100">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="p-4 font-black text-xs uppercase tracking-widest text-zinc-400">Stage</th>
                    <th className="p-4 font-black text-xs uppercase tracking-widest text-zinc-400">Goal</th>
                    <th className="p-4 font-black text-xs uppercase tracking-widest text-zinc-400">Key Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {[
                    { s: 'Discovery', g: 'Understand the user problem', o: 'Problem statement, Personas' },
                    { s: 'Definition', g: 'Scope & prioritize solution', o: 'PRD, success metrics' },
                    { s: 'Design', g: 'Visualize experience', o: 'Wireframes, Prototype' },
                    { s: 'Development', g: 'Build & test', o: 'MVP, QA sign-off' },
                    { s: 'Launch', g: 'Ship product to users', o: 'GTM plan, adoption data' },
                    { s: 'Iteration', g: 'Improve continuously', o: 'Insights, next roadmap' }
                  ].map(row => (
                    <tr key={row.s}>
                      <td className="p-4 font-bold text-zinc-900">{row.s}</td>
                      <td className="p-4 text-zinc-600 text-sm">{row.g}</td>
                      <td className="p-4 text-indigo-600 font-bold text-sm">{row.o}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10 text-left">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Day's Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4 mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Rocket className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-2 Mini Assignment</h4>
            <p className="text-xl text-zinc-600 font-medium">PDLC Feature Design</p>
          </header>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans text-left">
        <header className="bg-indigo-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Product Life Cycle (PLC) & PLM 📘</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Understand how products evolve in the market over time and how companies manage that journey.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-6 text-left">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">What is Product Life Cycle (PLC)?</h2>
            <p className="text-lg text-zinc-600">Product Life Cycle is the journey a product goes through in the market — from the day it is launched to the day it is eventually retired.</p>
          </section>

          <section className="space-y-8 text-left">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">What Are the 4 Stages of Product Life Cycle?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  s: 'Introduction', 
                  d: 'This is when a new product is first introduced to the market. Sales are usually low because customers are just starting to become aware of the product.',
                  color: 'bg-blue-50 border-blue-200 text-blue-900'
                },
                { 
                  s: 'Growth', 
                  d: 'In this stage, the product starts to gain interest. Sales begin to increase as more customers become aware of the product and start buying it.',
                  color: 'bg-emerald-50 border-emerald-200 text-emerald-900'
                },
                { 
                  s: 'Maturity', 
                  d: 'This is the stage of peak sales. The product has reached its maximum market penetration, and sales growth starts to level off.',
                  color: 'bg-indigo-50 border-indigo-200 text-indigo-900'
                },
                { 
                  s: 'Decline', 
                  d: 'In the decline stage, sales begin to decline as customer preferences change, new technologies emerge, or market saturation occurs.',
                  color: 'bg-rose-50 border-rose-200 text-rose-900'
                }
              ].map(stage => (
                <div key={stage.s} className={`p-8 rounded-[2rem] border ${stage.color} space-y-4`}>
                  <h4 className="text-2xl font-black tracking-tight">{stage.s}</h4>
                  <p className="text-sm font-medium leading-relaxed opacity-80">{stage.d}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10 text-left">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Day's Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4 mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900 text-left">🎯 Day-3 Mini Assignment</h4>
            <p className="text-xl text-zinc-600 font-medium">Evaluate Product Life Cycle</p>
          </header>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans text-left">
        <header className="bg-indigo-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Product Sense Framework 📘</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Great PMs don’t build features. They solve meaningful problems. Master the "sixth sense" of Product Management.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-6 text-left">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">What is Product Sense?</h2>
            <p className="text-lg text-zinc-600 leading-relaxed">Product sense is the ability to see through complexity and spot the user needs that matter most. Experts like Marty Cagan emphasize that it is deep product knowledge built through immersion, not an innate gift.</p>
          </section>

          <section className="space-y-8 text-left">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              The 7 Pillars of Product Sense
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { t: 'Empathy & Customer Needs', d: 'Listening for spoken and unspoken pain points and emotional drivers.' },
                { t: 'Market & Competitive Insight', d: 'Analyzing trends and mapping competitor gaps to find unique value.' },
                { t: 'Design & UX Perspective', d: 'Recognizing good flows and how design decisions affect engagement.' },
                { t: 'Problem Framing & Mapping', d: 'Distinguishing root causes from symptoms and exploring options.' },
                { t: 'Feasibility & Execution', d: 'Balancing ambitious ideas with tech constraints, budgets, and timelines.' },
                { t: 'Iteration & Validation', d: 'Using prototypes and experiments to adjust based on real data.' },
                { t: 'Domain Immersion', d: 'Gaining deep knowledge of a space to predict behaviors and outcomes.' }
              ].map((pillar, i) => (
                <div key={pillar.t} className="p-6 bg-zinc-50 border border-zinc-100 rounded-3xl hover:border-indigo-200 transition-colors text-left">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xs mb-4">0{i+1}</div>
                  <h4 className="font-black text-zinc-900 mb-2 leading-tight">{pillar.t}</h4>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">{pillar.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6 pt-10 border-t border-zinc-100 text-left">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">Why Aspiring PMs Must Master It</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { t: 'A Key Hiring Criterion', d: 'Most companies test for product sense during interviews to see if you can analyze products meaningfully.' },
                { t: 'Bridges Strategy and Execution', d: 'Ties small features to the \'bigger picture\' and strategic goals.' },
                { t: 'Anticipates User Behavior', d: 'Sense unarticulated needs before competitors (e.g., Original iPhone, Gmail).' },
                { t: 'Stakeholder Alignment', d: 'Provides the rationale needed to explain trade-offs to engineers and execs.' }
              ].map(item => (
                <div key={item.t} className="flex gap-4 p-5 border border-zinc-100 rounded-2xl text-left">
                  <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-zinc-900 text-sm mb-1">{item.t}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8 pt-10 border-t border-zinc-100 text-left">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
              <Zap className="w-8 h-8 text-amber-500" />
              Daily Habits to Build Instincts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="group">
                  <h4 className="font-black text-zinc-900 mb-2">Talk to Users Regularly</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">Read tickets, join sales calls, and observe context surveys miss.</p>
                </div>
                <div className="group">
                  <h4 className="font-black text-zinc-900 mb-2">Reverse-Engineer Products</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">Break down apps like Airbnb to understand core needs and trade-offs.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="group">
                  <h4 className="font-black text-zinc-900 mb-2">Perform Product Drills</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">List 3 strengths and 3 weaknesses of a daily-use app with justifications.</p>
                </div>
                <div className="group">
                  <h4 className="font-black text-zinc-900 mb-2">Embrace Constraints</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">Design solutions under strict limits (e.g., 30s onboarding) to sharpen judgment.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-zinc-950 text-white p-8 md:p-12 rounded-[2.5rem] border border-zinc-800 space-y-8 text-left">
            <h2 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <Target className="w-8 h-8 text-indigo-400" />
              Ace the Product Sense Interview
            </h2>
            <p className="text-zinc-400 font-medium leading-relaxed italic">Hiring managers look for clarity, empathy, and reasoning rather than just a "correct" answer.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span className="font-bold">Frame the problem clearly before jumping to solutions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span className="font-bold">Identify specific user segments and their unique pains.</span>
                </li>
              </ul>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span className="font-bold">Propose solutions with a rationale, explaining the hypothesis.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <span className="font-bold">Discuss trade-offs—be prepared to answer, "Who suffers if we cut this feature?".</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-6 pt-10 border-t border-zinc-100 text-left">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">Common Pitfalls to Avoid</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { t: 'Over-reliance on "Gut"', d: 'Instincts must be tempered by data; ignoring analytics is dangerous unless honed by experience.' },
                { t: 'The Aesthetic Trap', d: 'Don\'t mistake polished UI for good product sense; a beautiful design solving the wrong problem is a failure.' },
                { t: 'Domain Overfitting', d: 'Don\'t assume a playbook from one industry will automatically work in another.' },
                { t: 'Feature Bloat', d: 'Weak sense leads to "copying competitors," resulting in a bloated product that fails real problems.' }
              ].map(pitfall => (
                <div key={pitfall.t} className="p-5 border border-rose-100 bg-rose-50/30 rounded-2xl text-left">
                  <h4 className="font-black text-rose-600 mb-1 text-sm">{pitfall.t}</h4>
                  <p className="text-xs text-rose-900/60 font-medium leading-relaxed">{pitfall.d}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10 text-left">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Day's Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4 mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <PenTool className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900 text-left">🎯 Day-4 Mini Assignment</h4>
            <p className="text-xl text-zinc-600 font-medium">Product Sense Teardown</p>
          </header>
          
          <div className="space-y-8">
            <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-3xl text-left">
              <h5 className="font-black text-indigo-900 mb-4">Reading Material</h5>
              <a href="https://www.parallelhq.com/blog/what-product-sense" target="_blank" className="flex items-center gap-3 text-indigo-600 font-bold hover:underline">
                <ExternalLink className="w-5 h-5" /> Reading: What is Product Sense? by Robin Dhanwani
              </a>
            </div>

            <div className="p-8 bg-zinc-950 rounded-3xl border border-zinc-800 text-left">
              <p className="font-black text-indigo-400 uppercase tracking-widest text-xs mb-6">Task Instructions</p>
              <p className="text-zinc-300 font-medium leading-relaxed mb-6">
                Pick a feature from an app you use daily. Write a 1-page "Product Sense Teardown" identifying:
              </p>
              <div className="p-6 bg-zinc-900 rounded-2xl font-mono text-zinc-300 text-sm space-y-2">
                <p>1) The core user problem</p>
                <p>2) The hypothesis behind the design</p>
                <p>3) One critical trade-off they made</p>
              </div>
            </div>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans text-left">
        <header className="bg-indigo-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">User Empathy 📘</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Step into their shoes. User empathy is the fundamental driver of human-centered development.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-6 text-left">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">User Empathy in Product</h2>
            <p className="text-lg text-zinc-600 leading-relaxed">User empathy is the ability to understand and share the feelings, needs, and perspectives of users by "stepping into their shoes" to view the product through their eyes.</p>
          </section>

          <section className="space-y-8 text-left">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-500" />
              Core Principles of User Empathy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { t: 'Active Listening', d: "Listen without judgment. Hear what's NOT being said.", c: 'bg-rose-50 border-rose-100' },
                { t: 'Putting Users First', d: 'Prioritize user needs over internal assumptions or ego.', c: 'bg-blue-50 border-blue-100' },
                { t: 'Deep Connection', d: 'Grasp challenges, desires, and emotional motivations.', c: 'bg-emerald-50 border-emerald-100' }
              ].map(principle => (
                <div key={principle.t} className={`p-6 rounded-3xl border ${principle.c} space-y-3`}>
                  <h4 className="font-black text-zinc-900">{principle.t}</h4>
                  <p className="text-xs text-zinc-600 font-medium leading-relaxed">{principle.d}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10 text-left">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Day's Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4 mb-10">
            <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Heart className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900 text-left">🎯 Day-5 Mini Assignment</h4>
            <p className="text-xl text-zinc-600 font-medium">Airbnb Empathy Case Study</p>
          </header>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans text-left">
        <header className="bg-amber-500 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-amber-100 border border-amber-400">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-amber-50 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Business Fundamentals for PMs 💰</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Master the metrics that drive sustainable products. Learn CAC, LTV, and the "Golden Ratio" of business success.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          
          <section className="space-y-6 text-left">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">Learning Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Understand and calculate key unit economics metrics (CAC, LTV, payback period)",
                "Identify and analyze different business models and revenue streams",
                "Evaluate product decisions through a business lens",
                "Communicate the business impact of product features",
                "Assess product-market fit using business metrics"
              ].map(obj => (
                <div key={obj} className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-900">{obj}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8 pt-10 border-t border-zinc-100 text-left">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">1. Customer Acquisition Cost (CAC)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
               <div className="p-8 bg-zinc-900 text-white rounded-[2rem] space-y-4">
                  <p className="text-xs font-black uppercase text-indigo-400 tracking-widest">The Formula</p>
                  <p className="text-2xl font-mono font-bold tracking-tight">CAC = (Total Mkt + Sales Costs) / # New Users</p>
               </div>
               <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[2rem] space-y-4">
                  <p className="text-xs font-black uppercase text-indigo-600 tracking-widest">Example</p>
                  <p className="text-xl font-bold text-indigo-900">$50,000 spend + 500 users = $100 CAC</p>
               </div>
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10 text-left">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Day's Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4 mb-10">
            <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <DollarSign className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900 text-left">🎯 Day-6 Mini Assignment</h4>
            <p className="text-xl text-zinc-600 font-medium">Unit Economics Problem</p>
          </header>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans text-left">
        <header className="bg-purple-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-purple-100 border border-purple-500 text-left">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Discovery</span>
            <span className="text-purple-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Introduction to User & Market Research 🔍</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Think like a researcher. Learn structured methods to uncover pain points and validate product ideas.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 text-left">
            <p className="text-xl text-zinc-700 italic font-black leading-relaxed">
              “Great products start with deep understanding — of users, their needs, and the market around them.”
            </p>
            <p className="text-zinc-500 mt-4 font-medium">
              Today’s focus is to think like a researcher, not a builder. You’ll learn how to identify who your users are, what they struggle with, and why solving it matters.
            </p>
          </section>

          <section className="space-y-6 text-left">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">Learning Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                "Explain the difference between user research and market research",
                "Identify user pain points using qualitative and quantitative methods",
                "Apply basic frameworks — Empathy Map, JTBD, and Segmentation",
                "Use AI tools to accelerate research synthesis"
              ].map(obj => (
                <div key={obj} className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-900">{obj}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8 text-left">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">2. The Research Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { n: '1', t: 'Define Objective', d: '“What do I want to learn?”' },
                { n: '2', t: 'Choose Method', d: 'Interviews, surveys, or secondary.' },
                { n: '3', t: 'Recruit Users', d: 'Identify your target segments.' },
                { n: '4', t: 'Collect Data', d: 'Ask open-ended questions.' },
                { n: '5', t: 'Synthesize', d: 'Identify themes and insights.' }
              ].map(step => (
                <div key={step.n} className="p-6 bg-zinc-50 border border-zinc-100 rounded-3xl space-y-3 text-left">
                   <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xs mb-2">{step.n}</div>
                   <h4 className="font-black text-zinc-900 text-sm leading-tight mb-1">{step.t}</h4>
                   <p className="text-[10px] text-zinc-500 font-bold leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10 text-left">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Day's Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4 mb-10">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <FileEdit className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900 text-left">🎯 Day-7 Comprehensive Assignment</h4>
            <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl text-left">Research Task List</p>
          </header>
        </div>
      </div>
    ),
    resources: [
      { title: 'Doing User Research', url: 'https://youtu.be/MxwyGi-3dzY', type: 'video' },
      { title: 'Market research', url: 'https://youtu.be/LoJDAeq6i34', type: 'video' }
    ]
  },
  {
    day: 8,
    title: 'User Interviews & Surveys 🎙️',
    category: 'Research',
    preview: '“If you listen carefully, your users will write your roadmap for you.” Master structured feedback and real validation.',
    content: (
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans text-left">
        <header className="bg-purple-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-purple-100 border border-purple-500 text-left">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Discovery</span>
            <span className="text-purple-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">User Interviews & Surveys 🎙️</h1>
          <p className="text