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
      <div className="space-y-8">
        <section className="bg-blue-50 border border-blue-100 p-8 rounded-3xl">
          <p className="text-xl font-bold text-blue-900 mb-4 tracking-tight">Day-0: Foundation & Mindset — Start Your PM Journey Right 🚀</p>
          <p>Welcome to Day-0 of learning Product Management from scratch! Before we jump into frameworks, tools, and case studies, today is about building the right mindset to succeed as a Product Manager.</p>
        </section>

        <section className="space-y-4">
          <p className="text-lg font-black text-zinc-900">Product Management is one of the most competitive and rewarding careers today. But breaking into PM without prior experience can feel overwhelming because the role demands:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Cross-functional collaboration', 'Strategic thinking & decision-making', 'Problem-solving with ambiguity', 'Understanding of business, design, tech & data'].map(item => (
              <li key={item} className="flex items-center gap-3 p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm">
                <CheckCircle className="w-5 h-5 text-indigo-500" />
                <span className="font-bold text-zinc-700">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-zinc-500 italic">Many aspiring PMs struggle not because they lack skills, but because they lack clarity of purpose and direction.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Why Day-0 Matters</h3>
          <p>Before learning “how to be a PM”, you must understand why you want to be a PM. PMs face pressure, ownership, ambiguity, and constant context switching — your motivation will keep you going when it gets hard.</p>
          <p className="font-bold text-zinc-800">Understanding the reality of the role—not just the glamour—helps you evaluate:</p>
          <ul className="space-y-2 list-disc pl-5 text-zinc-600">
            <li>Is PM aligned with your strengths & interests?</li>
            <li>Do you enjoy solving problems and talking to users?</li>
            <li>Are you comfortable making decisions without perfect data?</li>
          </ul>
          <p className="p-4 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-900 font-medium">The fastest way to answer these questions is to talk to real PMs, understand their challenges, impact, and day-to-day responsibilities.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Reflection Exercise</h3>
          <p className="font-bold">Write answers to these 3 questions:</p>
          <ol className="space-y-3">
            <li className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 font-bold text-zinc-800">1. Why do I want to become a Product Manager?</li>
            <li className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 font-bold text-zinc-800">2. What strengths do I already have that can help me succeed?</li>
            <li className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 font-bold text-zinc-800">3. What areas do I need to improve over the next 45 days?</li>
          </ol>
          <p className="text-center py-4 text-indigo-600 font-black uppercase tracking-widest text-sm">Clarity today will drive consistency tomorrow.</p>
        </section>

        <section className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl">
          <h3 className="text-xl font-black text-emerald-900 mb-4">Outcome of Day-0</h3>
          <p className="mb-4">By the end of today, you should have:</p>
          <ul className="space-y-2">
            {['Real understanding of what PM is', 'Motivation aligned with reality', 'Early networking with professionals', 'A clear starting point for the course'].map(item => (
              <li key={item} className="flex items-center gap-3 text-emerald-800 font-bold">
                <CheckCircle className="w-5 h-5" /> {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-6 bg-white border border-indigo-100 rounded-2xl shadow-sm">
          <h4 className="text-lg font-black text-indigo-900 mb-4">Task 1 — Must Do Today</h4>
          <p className="mb-4">Reach out to 5 Product Managers and ask them about their journey & role.</p>
          <p className="text-zinc-500 text-sm mb-4">Use LinkedIn, alumni networks, or company communities.</p>
          <div className="bg-indigo-900 text-white p-4 rounded-xl">
            <p className="text-xs uppercase font-black tracking-widest text-indigo-300 mb-1">Goal</p>
            <p className="font-bold">Collect insights and note patterns. This will guide your expectations.</p>
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
      <div className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">1. What is a Product?</h3>
          <p>A product is anything that creates value by solving a real user problem or fulfilling a need—whether physical, digital, or service-based.</p>
          <div className="flex flex-wrap gap-2">
            {['Uber', 'Spotify', 'iPhone', 'Google Ads', 'ATM', 'WhatsApp'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-full text-xs font-bold text-zinc-600">{tag}</span>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">2. Do Companies Need Product Managers?</h3>
          <p className="font-bold text-zinc-800">Short answer: Yes—but the title isn’t always necessary. Product thinking is.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-sm">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="p-4 text-left font-black uppercase text-xs tracking-widest">Stage</th>
                  <th className="p-4 text-left font-black uppercase text-xs tracking-widest">Who acts as PM</th>
                  <th className="p-4 text-left font-black uppercase text-xs tracking-widest">Why it works</th>
                  <th className="p-4 text-left font-black uppercase text-xs tracking-widest">When it breaks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr>
                  <td className="p-4 font-bold text-zinc-900">Early startup</td>
                  <td className="p-4 text-zinc-600">Founder</td>
                  <td className="p-4 text-zinc-600">Small team, fast decisions, direct feedback</td>
                  <td className="p-4 text-zinc-600">Complexity increases, decisions overload</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-900">Growth stage</td>
                  <td className="p-4 text-zinc-600">Dedicated PMs</td>
                  <td className="p-4 text-zinc-600">Align teams, prioritize impact, execution</td>
                  <td className="p-4 text-zinc-600">Without PMs: confusion, misalignment</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-900">Large enterprise</td>
                  <td className="p-4 text-zinc-600">Product org with PM leaders</td>
                  <td className="p-4 text-zinc-600">Scale, governance, coordination</td>
                  <td className="p-4 text-zinc-600">Without PMs: feature bloat, chaos, slow</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">4. What is Product Management?</h3>
          <p>Product Management is the function responsible for guiding a product from idea → launch → growth → scale by balancing:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
              <p className="font-black text-blue-900 text-lg">User Value</p>
              <p className="text-sm text-blue-700">Solving real pain points</p>
            </div>
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
              <p className="font-black text-emerald-900 text-lg">Business Goals</p>
              <p className="text-sm text-emerald-700">Revenue & Growth</p>
            </div>
            <div className="p-6 bg-pink-50 border border-pink-100 rounded-2xl">
              <p className="font-black text-pink-900 text-lg">Tech Feasibility</p>
              <p className="text-sm text-pink-700">System capabilities</p>
            </div>
          </div>
          <p className="text-center italic text-zinc-500">"PMs don’t decide how to build — they decide what to build and why."</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">6. PM Responsibilities</h3>
          <div className="space-y-3">
            {[
              { a: 'User understanding', i: 'Research, interviews, personas, feedback' },
              { a: 'Problem definition', i: 'Insights, hypotheses, opportunity sizing' },
              { a: 'Prioritization', i: 'RICE, MoSCoW, Kano frameworks' },
              { a: 'Strategy & Roadmapping', i: 'Vision, goals, milestones, timelines' },
              { a: 'Execution & Delivery', i: 'PRDs, user stories, cross-functional collab' },
              { a: 'Analytics & Learning', i: 'KPI tracking, experiments, iterations' },
              { a: 'Communication', i: 'Stakeholders, presentations, influence' }
            ].map(row => (
              <div key={row.a} className="flex justify-between items-center p-4 bg-zinc-50 border border-zinc-100 rounded-xl">
                <span className="font-black text-zinc-900">{row.a}</span>
                <span className="text-sm text-zinc-500 font-medium">{row.i}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">7. Types of Product Managers & Why They Exist 🔍</h3>
          <div className="space-y-4">
            <div className="p-6 bg-zinc-900 text-white rounded-3xl">
              <h4 className="text-xl font-black mb-2">1. Core Product Manager</h4>
              <p className="text-zinc-400 mb-4 font-medium italic">The Generalist. Focus: End-to-end ownership of user-facing product experiences.</p>
              <p className="text-sm"><span className="font-black text-indigo-400">Responsibilities:</span> Vision, roadmap, PRD writing, tracking metrics.</p>
              <p className="text-sm mt-2"><span className="font-black text-indigo-400">Real Example:</span> Swiggy improving checkout conversion.</p>
              <p className="text-sm mt-1"><span className="font-black text-emerald-400">North Star Metrics:</span> Retention, Adoption, NPS, DAU.</p>
            </div>
            <div className="p-6 bg-white border border-zinc-200 rounded-3xl shadow-sm">
              <h4 className="text-xl font-black text-zinc-900 mb-2">2. Growth Product Manager</h4>
              <p className="text-zinc-500 mb-4 font-medium italic">The Optimizer. Focus: Driving acquisition, activation, retention & revenue.</p>
              <p className="text-sm"><span className="font-black text-indigo-600">Responsibilities:</span> Funnel optimization, A/B testing, monetization.</p>
              <p className="text-sm mt-2"><span className="font-black text-indigo-600">Real Example:</span> Duolingo streak feature.</p>
              <p className="text-sm mt-1"><span className="font-black text-emerald-600">North Star Metrics:</span> Conversion Rate, LTV, Churn.</p>
            </div>
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="p-6 bg-white border border-orange-100 rounded-2xl shadow-sm">
          <h4 className="text-lg font-black text-orange-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" /> Day-1 Mini Assignment
          </h4>
          <p className="mb-4">Pick a product you use daily (e.g., Spotify, Zomato, Notion, Cred) and answer:</p>
          <div className="p-4 bg-zinc-950 text-zinc-300 font-mono text-sm rounded-xl">
            Product Name: ___ <br/>
            User Problem: ___ <br/>
            Key Metrics: ___ <br/>
            Improvement Suggestion: ___
          </div>
        </div>
      </div>
    )
  },
  {
    day: 2,
    title: 'Product Development Lifecycle (PDLC) 📘',
    category: 'Foundations',
    preview: 'Theme: How products move from idea → design → build → launch → iterate.',
    content: (
      <div className="space-y-8">
        <section className="bg-indigo-600 text-white p-8 rounded-3xl">
          <h3 className="text-2xl font-black mb-2">The Product Development Lifecycle (PDLC)</h3>
          <div className="flex flex-wrap gap-4 mt-6">
            {['DISCOVERY', 'DEFINITION', 'DESIGN', 'DEVELOPMENT', 'LAUNCH', 'ITERATION'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white text-indigo-600 flex items-center justify-center font-black text-xs">{i+1}</span>
                <span className="font-black text-xs tracking-widest">{step}</span>
                {i < 5 && <ArrowRight className="w-3 h-3 text-indigo-300" />}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">1. What is PDLC?</h3>
          <p>Product Development Lifecycle (PDLC) is the structured process of taking a product from problem discovery → launch → continuous improvement, ensuring decisions are user-driven, data-backed, and business-aligned.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { s: 'Discovery', g: 'Understand user problem', o: 'Problem statement, Personas' },
              { s: 'Definition', g: 'Scope & prioritize solution', o: 'PRD, success metrics' },
              { s: 'Design', g: 'Visualize experience', o: 'Wireframes, Prototype' },
              { s: 'Development', g: 'Build & test', o: 'MVP, QA sign-off' },
              { s: 'Launch', g: 'Ship product to users', o: 'GTM plan, adoption data' },
              { s: 'Iteration', g: 'Improve continuously', o: 'Insights, next roadmap' }
            ].map(item => (
              <div key={item.s} className="p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm">
                <p className="font-black text-indigo-600 text-sm mb-1 uppercase tracking-widest">{item.s}</p>
                <p className="text-xs font-bold text-zinc-800 mb-2">{item.g}</p>
                <p className="text-[10px] text-zinc-400 font-medium">Output: {item.o}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="border-l-4 border-purple-500 pl-6 space-y-4">
            <h4 className="text-xl font-black text-zinc-900 tracking-tight">Phase 1: Discovery (Find the Right Problem)</h4>
            <p className="italic font-bold text-purple-700">“Fall in love with the problem, not the solution.”</p>
            <p className="text-sm font-medium">Activities: Market research, user interviews, data analysis (GA, SQL), JTBD.</p>
            <p className="text-sm font-black text-zinc-400">Industry Case: Zomato observes high checkout drop-offs due to surge fees.</p>
          </div>

          <div className="border-l-4 border-emerald-500 pl-6 space-y-4">
            <h4 className="text-xl font-black text-zinc-900 tracking-tight">Phase 2: Definition (Scope the Solution)</h4>
            <p className="text-sm font-medium">Goal: Turn insights into an actionable plan. Define what we are building and how we measure success.</p>
            <p className="text-sm font-medium">Activities: Prioritization (RICE), PRD writing, alignment with engineering.</p>
            <p className="text-sm font-black text-zinc-400">Industry Case: Test a Flat Delivery Fee Subscription to reduce abandonment by 15%.</p>
          </div>
        </section>

        <section className="bg-zinc-50 border border-zinc-200 p-8 rounded-3xl">
          <h3 className="text-xl font-black text-zinc-900 mb-4">Key Takeaways</h3>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-black shrink-0">1</span>
              <p className="font-bold text-zinc-700">The best PMs don’t build features — they solve problems.</p>
            </li>
            <li className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-black shrink-0">2</span>
              <p className="font-bold text-zinc-700">PDLC creates structure, clarity, and alignment across the org.</p>
            </li>
            <li className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-black shrink-0">3</span>
              <p className="font-bold text-zinc-700">Launch is not the end — iteration is where results come from.</p>
            </li>
          </ul>
        </section>
      </div>
    ),
    assignment: (
      <div className="p-6 bg-white border border-indigo-100 rounded-2xl shadow-sm">
        <h4 className="text-lg font-black text-indigo-900 mb-4">Day-2 Mini Assignment</h4>
        <p className="mb-4">Pick any app (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and describe a new feature across the PDLC:</p>
        <div className="space-y-2 text-sm font-bold text-zinc-600">
          <p>Product: ___ Feature Idea: ___</p>
          <p>Discovery – Problem & insight: ___</p>
          <p>Definition – Hypothesis & metrics: ___</p>
          <p>Design – Sketch or description: ___</p>
          <p>Development – Dependencies / risks: ___</p>
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
      <div className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">What is Product Life Cycle (PLC)?</h3>
          <p>Product Life Cycle is the journey a product goes through in the market — from the day it is launched to the day it is eventually retired.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
            {[
              { s: 'Introduction', d: 'Low sales, high R&D. Focus: Awareness.' },
              { s: 'Growth', d: 'Increasing sales, competitors enter. Focus: Market share.' },
              { s: 'Maturity', d: 'Peak penetration. Focus: Differentiation.' },
              { s: 'Decline', d: 'Sales drop. Focus: Sunset or extend.' }
            ].map(item => (
              <div key={item.s} className="p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm border-t-4 border-indigo-500">
                <p className="font-black text-zinc-900 mb-2">{item.s}</p>
                <p className="text-xs text-zinc-500 font-medium">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">What is Product Lifecycle Management (PLM)?</h3>
          <p>Product Lifecycle Management (PLM) is the practice of managing a product from its initiation to its eventual retirement through a systematic approach. It's like a guidebook that helps companies manage their products from start to finish.</p>
          <div className="space-y-4">
            {[
              { t: 'Concept Stage', d: 'Involves initial ideas, market research, and determining feasibility.' },
              { t: 'Design Stage', d: 'Building prototypes and testing. R&D spend happens here.' },
              { t: 'Production Stage', d: 'Making the product at scale with quality checks.' },
              { t: 'Sales Stage', d: 'Advertisements, pricing, and special deals. Forecasting is crucial.' },
              { t: 'Support Stage', d: 'Customer service, warranties, and training.' },
              { t: 'Retirement Stage', d: 'Product ends due to preference shifts. Responsible recycling.' }
            ].map(stage => (
              <div key={stage.t} className="flex gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <div>
                  <p className="font-black text-zinc-900 text-sm">{stage.t}</p>
                  <p className="text-xs text-zinc-500 font-medium">{stage.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl">
          <h3 className="text-xl font-black text-emerald-900 mb-4">Benefits of PLM</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="font-black text-emerald-900 mb-1">Collaboration</p>
              <p className="text-xs text-emerald-700">Encourages cross-functional teamwork.</p>
            </div>
            <div>
              <p className="font-black text-emerald-900 mb-1">Quality</p>
              <p className="text-xs text-emerald-700">Identifies potential issues early.</p>
            </div>
            <div>
              <p className="font-black text-emerald-900 mb-1">Efficiency</p>
              <p className="text-xs text-emerald-700">Reduces waste and optimizes resources.</p>
            </div>
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="p-6 bg-white border border-indigo-100 rounded-2xl shadow-sm">
        <h4 className="text-lg font-black text-indigo-900 mb-4">Day-3 Mini Assignment</h4>
        <p className="mb-4">Pick any product (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and evaluate its lifecycle:</p>
        <div className="p-4 bg-zinc-950 text-indigo-300 font-mono text-xs rounded-xl space-y-2">
          <p>Product: ___</p>
          <p>Current PLC Stage: ___</p>
          <p>What signals tell you this stage?: ___</p>
          <p>What should PM focus on right now (Strategy)?: ___</p>
          <p>One risky decision PM must make at this stage: ___</p>
        </div>
      </div>
    )
  },
  {
    day: 4,
    title: 'Product Sense Framework 📘',
    category: 'Foundations',
    preview: 'Master the "sixth sense" of Product Management. Learn how to analyze products meaningfully.',
    content: (
      <div className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">What is Product Sense?</h3>
          <p>Product sense is the ability to see through complexity and spot the user needs that matter most. Experts like Marty Cagan emphasize that it is deep product knowledge built through immersion, not an innate gift.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">The 7 Pillars of Product Sense</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { t: 'Empathy & Customer Needs', d: 'Listening for spoken and unspoken pain points.' },
              { t: 'Market & Competitive Insight', d: 'Analyzing trends and mapping competitor gaps.' },
              { t: 'Design & UX Perspective', d: 'Recognizing good flows and effect on engagement.' },
              { t: 'Problem Framing & Mapping', d: 'Distinguishing root causes from symptoms.' },
              { t: 'Feasibility & Execution', d: 'Balancing ideas with tech constraints.' },
              { t: 'Iteration & Validation', d: 'Using prototypes to adjust based on data.' },
              { t: 'Domain Immersion', d: 'Deep knowledge to predict behaviors.' }
            ].map(pillar => (
              <div key={pillar.t} className="p-4 bg-white border border-zinc-100 rounded-xl shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-black text-zinc-900 text-sm">{pillar.t}</p>
                  <p className="text-xs text-zinc-500 font-medium">{pillar.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Daily Habits to Build Instincts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-zinc-900 text-white rounded-3xl">
              <p className="font-black mb-2 uppercase text-xs tracking-widest text-indigo-400">Reverse-Engineer</p>
              <p className="text-sm font-medium">Break down apps like Airbnb to understand core needs and trade-offs.</p>
            </div>
            <div className="p-6 bg-zinc-900 text-white rounded-3xl">
              <p className="font-black mb-2 uppercase text-xs tracking-widest text-indigo-400">Product Drills</p>
              <p className="text-sm font-medium">List 3 strengths and 3 weaknesses of a daily-use app with justifications.</p>
            </div>
          </div>
        </section>

        <section className="p-8 bg-rose-50 border border-rose-100 rounded-3xl">
          <h3 className="text-xl font-black text-rose-900 mb-4">Common Pitfalls to Avoid</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 font-bold text-rose-800">
              <X className="w-5 h-5" /> Over-reliance on "Gut"
            </li>
            <li className="flex items-center gap-3 font-bold text-rose-800">
              <X className="w-5 h-5" /> The Aesthetic Trap (UI ≠ Product Sense)
            </li>
            <li className="flex items-center gap-3 font-bold text-rose-800">
              <X className="w-5 h-5" /> Feature Bloat (Copying competitors)
            </li>
          </ul>
        </section>
      </div>
    ),
    assignment: (
      <div className="p-6 bg-white border border-indigo-100 rounded-2xl shadow-sm">
        <h4 className="text-lg font-black text-indigo-900 mb-4">Day-4 Mini Assignment</h4>
        <p className="mb-4">Pick a feature from an app you use daily. Write a 1-page "Product Sense Teardown" identifying:</p>
        <ol className="space-y-2 text-sm font-bold text-zinc-700">
          <li>1) The core user problem</li>
          <li>2) The hypothesis behind the design</li>
          <li>3) One critical trade-off they made</li>
        </ol>
      </div>
    )
  },
  {
    day: 5,
    title: 'User Empathy 📘',
    category: 'Foundations',
    preview: 'Step into their shoes. User empathy is the fundamental driver of human-centered development.',
    content: (
      <div className="space-y-8">
        <section className="bg-blue-600 text-white p-8 rounded-3xl">
          <h3 className="text-2xl font-black mb-4">Step Into Their Shoes</h3>
          <p>User empathy is the ability to understand and share the feelings, needs, and perspectives of users by "stepping into their shoes" to view the product through their eyes.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
            <h4 className="font-black text-zinc-900 mb-2">Active Listening</h4>
            <p className="text-xs text-zinc-500 font-medium">Listen without judgment. Hear what is NOT being said.</p>
          </div>
          <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
            <h4 className="font-black text-zinc-900 mb-2">Putting Users First</h4>
            <p className="text-xs text-zinc-500 font-medium">Prioritize user needs over internal assumptions or ego.</p>
          </div>
          <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
            <h4 className="font-black text-zinc-900 mb-2">Deep Connection</h4>
            <p className="text-xs text-zinc-500 font-medium">Grasp emotional motivations, not just tech specs.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Process for PMs</h3>
          <div className="space-y-4">
            <div className="flex gap-6 items-start">
              <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shrink-0">1</span>
              <div>
                <p className="font-black text-zinc-900">User Research & Personas</p>
                <p className="text-sm text-zinc-500 font-medium">Methods: Interviews, Empathy Maps (Says, Does, Thinks, Feels).</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shrink-0">2</span>
              <div>
                <p className="font-black text-zinc-900">Design Thinking Integration</p>
                <p className="text-sm text-zinc-500 font-medium">Empathize → Define → Ideate → Prototype → Test.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="p-8 bg-zinc-900 text-white rounded-3xl">
          <h3 className="text-xl font-black text-white mb-6">Real-World Success</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="font-black text-indigo-400 uppercase tracking-widest text-xs">Apple</p>
              <p className="text-sm text-zinc-300">Demonstrates empathy through user-friendly interfaces and seamless experiences.</p>
            </div>
            <div className="space-y-2">
              <p className="font-black text-indigo-400 uppercase tracking-widest text-xs">Airbnb</p>
              <p className="text-sm text-zinc-300">Achieved success by focusing on the traveler's need for unique and personalized experiences.</p>
            </div>
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="p-6 bg-white border border-indigo-100 rounded-2xl shadow-sm">
        <h4 className="text-lg font-black text-indigo-900 mb-4">Day-5 Mini Assignment</h4>
        <p className="mb-4 font-bold text-zinc-700">Find out: How did Airbnb use user empathy to drive their success?</p>
        <p className="text-sm text-zinc-500 mb-4">Look for specific stories about their "early days" and how they handled user problems.</p>
        <div className="space-y-2 text-sm font-bold text-zinc-700">
          <p>1. How did they identify the problem travelers faced?</p>
          <p>2. What "unscalable" things did the founders do to empathize with hosts?</p>
        </div>
      </div>
    )
  },
  {
    day: 6,
    title: 'Business Fundamentals for PMs 💰',
    category: 'Foundations',
    preview: 'Master the metrics that drive sustainable products. Learn CAC, LTV, and the "Golden Ratio".',
    content: (
      <div className="space-y-8">
        <section className="bg-amber-500 text-white p-8 rounded-3xl">
          <h3 className="text-2xl font-black mb-4">Business Fundamentals for PMs 💰</h3>
          <p>Product Managers are often called the "mini-CEO" of their product. Master the metrics that drive sustainable products.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-black text-zinc-900 uppercase tracking-widest text-xs border-b pb-2 border-zinc-200">What Good PMs Do</h4>
            <ul className="space-y-2">
              {['Balance user value with business value', 'Justify investments with ROI', 'Understand lifecycle economics'].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm font-bold text-zinc-700">
                   <div className="w-1 h-1 rounded-full bg-indigo-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-zinc-900 uppercase tracking-widest text-xs border-b pb-2 border-zinc-200">Common PM Mistakes</h4>
            <ul className="space-y-2 text-rose-600">
              {['Ignoring customer acquisition costs', 'Focusing on vanity metrics', 'Ignoring sustainability'].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm font-bold">
                   <X className="w-3 h-3" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-zinc-900 text-white rounded-3xl">
              <p className="font-black text-indigo-400 uppercase tracking-[0.2em] text-[10px] mb-2">The Formula: CAC</p>
              <p className="text-xl font-bold tracking-tight mb-2">CAC = (Total Mkt + Sales Costs) / # New Users</p>
              <p className="text-xs text-zinc-400">Example: $50,000 spend + 500 users = $100 CAC</p>
            </div>
            <div className="p-6 bg-zinc-900 text-white rounded-3xl">
              <p className="font-black text-indigo-400 uppercase tracking-[0.2em] text-[10px] mb-2">The Formula: LTV</p>
              <p className="text-xl font-bold tracking-tight mb-2">LTV = ARPU × Avg Lifespan</p>
              <p className="text-xs text-zinc-400">Basic calculation for recurring revenue products.</p>
            </div>
          </div>
        </section>

        <section className="bg-indigo-50 border border-indigo-100 p-8 rounded-3xl">
          <h3 className="text-xl font-black text-indigo-900 mb-6">The Golden Ratio: LTV:CAC</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-xl">
              <p className="font-black text-rose-600 text-sm mb-1">&lt; 1:1 Crisis Mode</p>
              <p className="text-[10px] text-zinc-500 font-medium">Losing money. Reduce CAC urgently.</p>
            </div>
            <div className="p-4 bg-white rounded-xl">
              <p className="font-black text-emerald-600 text-sm mb-1">3:1 to 5:1 Sweet Spot</p>
              <p className="text-[10px] text-zinc-500 font-medium">Optimal balance. Healthy business.</p>
            </div>
            <div className="p-4 bg-white rounded-xl">
              <p className="font-black text-amber-600 text-sm mb-1">&gt; 5:1 Underinvesting</p>
              <p className="text-[10px] text-zinc-500 font-medium">Too conservative. Competitors might outgrow you.</p>
            </div>
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="p-6 bg-white border border-indigo-100 rounded-2xl shadow-sm">
        <h4 className="text-lg font-black text-indigo-900 mb-4">Day-6 Mini Assignment</h4>
        <p className="mb-4 font-bold text-zinc-700">Calculate Sustainability:</p>
        <div className="grid grid-cols-2 gap-4 text-xs font-bold text-zinc-500 mb-4">
          <p>Ad Spend: $30,000</p>
          <p>Sales Team Costs: $20,000</p>
          <p>New Customers: 250</p>
          <p>ARPU: $40/month</p>
          <p>Avg Lifespan: 10 months</p>
          <p>Gross Margin: 80%</p>
        </div>
        <p className="text-indigo-600 font-black mb-2">Questions:</p>
        <ol className="space-y-2 text-sm font-bold text-zinc-700">
          <li>1. What is the CAC?</li>
          <li>2. What is the LTV?</li>
          <li>3. What is the LTV:CAC Ratio?</li>
        </ol>
      </div>
    )
  },
  {
    day: 7,
    title: 'Introduction to User & Market Research 🔍',
    category: 'Research',
    preview: 'Think like a researcher. Learn structured methods to uncover pain points and validate product ideas.',
    content: (
      <div className="space-y-8">
        <section className="bg-purple-600 text-white p-8 rounded-3xl">
          <p className="text-xl font-bold mb-4 tracking-tight">Introduction to User & Market Research 🔍</p>
          <p className="italic">“Great products start with deep understanding — of users, their needs, and the market around them.”</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">1. User Research vs Market Research</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-sm">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="p-4 text-left font-black text-xs uppercase tracking-widest">Aspect</th>
                  <th className="p-4 text-left font-black text-xs uppercase tracking-widest">User Research</th>
                  <th className="p-4 text-left font-black text-xs uppercase tracking-widest">Market Research</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-sm">
                <tr>
                  <td className="p-4 font-black">Focus</td>
                  <td className="p-4">Individual behaviors & pain points</td>
                  <td className="p-4">Industry, competitors, trends</td>
                </tr>
                <tr>
                  <td className="p-4 font-black">Goal</td>
                  <td className="p-4">Validate Problem</td>
                  <td className="p-4">Validate Opportunity</td>
                </tr>
                <tr>
                  <td className="p-4 font-black">Output</td>
                  <td className="p-4">Personas, Journey Maps</td>
                  <td className="p-4">TAM/SAM/SOM, SWOT</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="p-4 bg-orange-50 border-l-4 border-orange-400 text-orange-900 font-bold text-sm">PM Tip: Always start with user research before market research. If users don’t want it, market data doesn’t matter.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">2. The Research Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { n: '1', t: 'Define Objective', d: '“What do I want to learn?”' },
              { n: '2', t: 'Choose Method', d: 'Interviews, surveys, or secondary.' },
              { n: '3', t: 'Recruit Users', d: 'Identify your target segments.' },
              { n: '4', t: 'Collect Data', d: 'Ask open-ended questions.' },
              { n: '5', t: 'Synthesize', d: 'Identify themes and insights.' }
            ].map(step => (
              <div key={step.n} className="p-4 bg-white border border-zinc-100 rounded-xl text-center shadow-sm">
                <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center mx-auto mb-2 font-black text-[10px]">{step.n}</div>
                <p className="font-black text-zinc-900 text-[10px] mb-1 leading-tight">{step.t}</p>
                <p className="text-[8px] text-zinc-400 font-medium">{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">3. Research Frameworks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-2xl">
              <h4 className="font-black text-indigo-600 uppercase tracking-widest text-xs mb-4">Empathy Map</h4>
              <div className="grid grid-cols-2 gap-2 text-center">
                {['SAYS', 'DOES', 'THINKS', 'FEELS'].map(m => (
                  <div key={m} className="p-4 bg-white border border-zinc-100 rounded-lg font-black text-[10px] text-zinc-400">{m}</div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-zinc-900 text-white rounded-2xl">
              <h4 className="font-black text-emerald-400 uppercase tracking-widest text-xs mb-4">Jobs To Be Done (JTBD)</h4>
              <p className="text-xs mb-4 font-medium italic">“People don’t buy products; they hire them to get a job done.”</p>
              <div className="space-y-2 font-mono text-[10px] text-zinc-400">
                <p>When I... (situation)</p>
                <p>I want to... (motivation)</p>
                <p>So I can... (desired outcome)</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="p-6 bg-white border border-purple-100 rounded-2xl shadow-sm">
        <h4 className="text-lg font-black text-purple-900 mb-4">Day-7 Comprehensive Assignment</h4>
        <div className="space-y-4">
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <p className="font-black text-zinc-900 text-sm mb-2">Research Task List:</p>
            <ul className="space-y-2 text-xs font-bold text-zinc-600">
              <li>1. Define Target Segment (Demographics & Psychographics)</li>
              <li>2. Pain Point vs. Outcome Table (Mapping current struggles to desired states)</li>
              <li>3. Competitor Scan (Find 3 direct or indirect competitors)</li>
            </ul>
          </div>
          <div className="p-4 bg-zinc-950 text-white rounded-xl">
             <p className="text-[10px] font-black uppercase text-indigo-300 mb-2 tracking-widest">Final Deliverable</p>
             <p className="text-xs font-medium">• One-Slide Summary: User, Problem, Market.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    day: 8,
    title: 'User Interviews & Surveys 🎙️',
    category: 'Research',
    preview: '“If you listen carefully, your users will write your roadmap for you.” Master structured feedback and real validation.',
    content: (
      <div className="space-y-12 text-zinc-800 pb-16 font-sans text-left">
        <section className="bg-zinc-50 p-8 md:p-10 rounded-[2.5rem] border border-zinc-100 text-left space-y-6">
          <p className="text-2xl text-zinc-800 italic font-black leading-tight">
            “If you listen carefully, your users will write your roadmap for you.”
          </p>
          <p className="text-lg text-zinc-600 leading-relaxed font-medium">
            Yesterday we explored target segments. Today we learn how to validate insights through real conversations and structured feedback.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 border-l-8 border-purple-500 pl-6">Learning Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Conduct structured discovery interviews",
              "Design clear & unbiased surveys",
              "Identify recurring pain themes",
              "Synthesize insights using AI tools"
            ].map(obj => (
              <div key={obj} className="flex items-center gap-4 p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                <div className="p-1.5 bg-emerald-100 rounded-full">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-base font-bold text-emerald-900">{obj}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <h2 className="text-3xl font-black tracking-tight text-zinc-900">1. Why User Interviews Matter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { t: "Deep 'Why'", d: "Understand user motivation beyond what behavioral data shows." },
              { t: "Assumptions", d: "Validate high-risk assumptions early before spending engineering resources." },
              { t: "Unspoken Needs", d: "Discover emotional triggers and pain points users didn't mention." },
              { t: "Empathy", d: "Build genuine intuition for the user's daily life and environment." }
            ].map(item => (
              <div key={item.t} className="p-8 bg-zinc-50 border border-zinc-100 rounded-3xl hover:border-purple-200 transition-all">
                 <h4 className="font-black text-purple-600 text-lg mb-3 tracking-tight">{item.t}</h4>
                 <p className="text-base text-zinc-500 font-medium leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
          <div className="p-8 bg-indigo-600 text-white rounded-[2.5rem] shadow-xl shadow-indigo-100 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Lightbulb className="w-24 h-24" /></div>
             <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-indigo-200">Example: Insight to Feature</p>
             <p className="text-2xl font-black italic leading-tight mb-4">"I want to feel progress even if I study for 5 minutes."</p>
             <p className="text-lg font-bold text-indigo-100">→ Inspired Duolingo's Streak system, now a core retention driver.</p>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-black tracking-tight text-zinc-900">2. Types of Interview Questions</h2>
          <div className="overflow-hidden rounded-3xl border border-zinc-200 shadow-lg">
            <table className="w-full text-left border-collapse">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="p-6 font-black text-sm uppercase tracking-widest">Type</th>
                  <th className="p-6 font-black text-sm uppercase tracking-widest">Example</th>
                  <th className="p-6 font-black text-sm uppercase tracking-widest">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="p-6 font-black text-zinc-900">Behavioral (Past)</td>
                  <td className="p-6 text-zinc-600 font-medium italic">“Tell me about the last time you ordered food.”</td>
                  <td className="p-6 text-purple-600 font-black">Habit Analysis</td>
                </tr>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="p-6 font-black text-zinc-900">Attitudinal (Feelings)</td>
                  <td className="p-6 text-zinc-600 font-medium italic">“What frustrates you most about your current apps?”</td>
                  <td className="p-6 text-purple-600 font-black">Pain Discovery</td>
                </tr>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="p-6 font-black text-zinc-900">Aspirational (Future)</td>
                  <td className="p-6 text-zinc-600 font-medium italic">“What would make your experience 10x better?”</td>
                  <td className="p-6 text-purple-600 font-black">Ideation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-orange-50 border-2 border-dashed border-orange-200 rounded-3xl flex items-start gap-5">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0">
              <Brain className="w-6 h-6 text-orange-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black text-orange-800 uppercase tracking-widest">🧠 Golden Rule</p>
              <p className="text-lg font-bold text-orange-950">No leading questions. Don't ask "Wouldn't it be better if...?" Ask "How do you feel about...?"</p>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <h2 className="text-3xl font-black tracking-tight text-zinc-900">3. Interview Structure (15–20 min)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: '1', t: 'Intro', d: 'Make the user comfortable. Explain purpose, emphasize there are no wrong answers.' },
              { n: '2', t: 'Context', d: 'Understand background. Ask about their current tools, role, and daily routine.' },
              { n: '3', t: 'Core Questions', d: "Explore behaviors & pain. Deep dive into the specific problem area you're solving." },
              { n: '4', t: 'Wrap Up', d: 'Final insights & referrals. Ask if they have anything to add or know someone else to talk to.' }
            ].map(step => (
              <div key={step.n} className="relative p-8 bg-zinc-50 border border-zinc-100 rounded-[2rem] space-y-4 pt-12 text-left">
                 <div className="absolute top-0 left-8 -translate-y-1/2 w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-purple-200">
                    {step.n}
                 </div>
                 <h4 className="font-black text-zinc-900 text-xl tracking-tight leading-none">{step.t}</h4>
                 <p className="text-sm text-zinc-500 font-medium leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="p-10 bg-zinc-950 text-white rounded-[2.5rem] border border-zinc-800 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10"><Bot className="w-8 h-8 text-purple-400" /></div>
                <h3 className="text-xl font-black uppercase tracking-widest text-white">AI Accelerator</h3>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                 <p className="text-xs font-black text-purple-400 uppercase tracking-[0.2em]">Synthesis Prompt</p>
                 <p className="text-xl font-medium italic text-zinc-300 leading-relaxed">"Summarize these interview transcripts into 3 distinct pain points and 3 desired outcomes."</p>
              </div>
            </div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-4">Speed up your synthesis by 80%</p>
          </section>

          <section className="p-10 bg-white border border-zinc-200 rounded-[2.5rem] shadow-sm space-y-8">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100"><ClipboardCheck className="w-8 h-8 text-emerald-600" /></div>
                <h3 className="text-xl font-black uppercase tracking-widest text-zinc-900">Survey Principles</h3>
             </div>
             <div className="space-y-5">
                {[
                  'Ask one thing per question',
                  'Avoid biased wording',
                  'Mix question types (MCQ + scale)',
                  'Keep it under 10 questions'
                ].map(rule => (
                  <div key={rule} className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                     <span className="font-bold text-zinc-700 text-lg">{rule}</span>
                  </div>
                ))}
             </div>
          </section>
        </div>

        <section className="space-y-10">
           <h2 className="text-3xl font-black tracking-tight text-zinc-900">4. Synthesizing Insights</h2>
           <p className="text-xl text-zinc-500 font-medium leading-relaxed">After 5–10 interviews, group similar issues into actionable themes.</p>
           
           <div className="p-10 md:p-14 bg-zinc-50 border border-zinc-100 rounded-[3rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 <div className="space-y-8">
                    <div className="space-y-4">
                      <p className="text-sm font-black text-purple-600 uppercase tracking-widest">The Pain</p>
                      <h4 className="text-4xl font-black text-zinc-900 tracking-tighter">"I forget my fitness goals midweek."</h4>
                      <div className="p-4 bg-purple-100 text-purple-800 rounded-2xl font-bold inline-block">Motivation Drop</div>
                    </div>
                 </div>
                 
                 <div className="p-8 bg-white rounded-[2rem] border border-zinc-100 shadow-xl shadow-indigo-100/20 space-y-6">
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 text-amber-500 fill-amber-500" />
                      <h5 className="font-black text-lg text-zinc-900 uppercase tracking-tight">Feature Opportunity</h5>
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-black text-emerald-600 leading-none">AI Reminder Coach</p>
                      <p className="text-lg text-zinc-500 font-medium leading-relaxed italic">Contextual nudges based on historical low-activity days.</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="p-6 bg-white border border-indigo-100 rounded-2xl shadow-sm">
        <h4 className="text-lg font-black text-indigo-900 mb-4">Day-8: User Insights Report</h4>
        <p className="text-xs font-black uppercase text-zinc-400 mb-4 tracking-widest">1-Page Deliverable</p>
        <ol className="space-y-4">
          {['Top 3 Pain Points (with supporting user quotes)', 'Top 3 Desired Outcomes (what users want to achieve)', 'One Opportunity Statement: How might we solve for X?'].map((item, i) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="w-6 h-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xs shrink-0">{i+1}</span>
              <p className="text-sm font-bold text-zinc-700">{item}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 p-4 bg-zinc-950 rounded-xl border border-zinc-800 flex justify-between items-center">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Evaluation: 3 strong actionable themes</span>
            <span className="text-xs font-black text-rose-400 uppercase tracking-widest">Deadline: End of Day 10</span>
        </div>
      </div>
    ),
    resources: [
      { title: 'How To Conduct User Interviews Like A Pro', url: 'https://youtu.be/5tVbFfGDQCk', type: 'video' }
    ]
  },
  {
    day: 9,
    title: 'User Personas & Jobs To Be Done (JTBD) 👥',
    category: 'Research',
    preview: '“You don’t design for everyone — you design for someone.” Convert raw feedback into structured user profiles.',
    content: (
      <div className="space-y-8">
        <section className="bg-emerald-600 text-white p-8 rounded-3xl">
          <h3 className="text-2xl font-black mb-4">Turning Data into Insights</h3>
          <p>“You don’t design for everyone — you design for someone.” Yesterday we captured raw feedback. Today we turn that data into structured, usable insights.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">1. From Research → Insights → Personas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white border border-zinc-100 rounded-xl shadow-sm">
              <p className="font-black text-indigo-600 text-xs mb-1 uppercase tracking-widest">Step 1: Clustering</p>
              <p className="text-xs text-zinc-500 font-medium">Group similar behaviors and motivations from Day-8 transcripts.</p>
            </div>
            <div className="p-4 bg-white border border-zinc-100 rounded-xl shadow-sm">
              <p className="font-black text-indigo-600 text-xs mb-1 uppercase tracking-widest">Step 2: Identification</p>
              <p className="text-xs text-zinc-500 font-medium">Find recurring pain points and primary goals across clusters.</p>
            </div>
            <div className="p-4 bg-white border border-zinc-100 rounded-xl shadow-sm">
              <p className="font-black text-indigo-600 text-xs mb-1 uppercase tracking-widest">Step 3: Narrative</p>
              <p className="text-xs text-zinc-500 font-medium">Write a short, human-centric story for each segment.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">2. Persona Template</h3>
          <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-3xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-zinc-200 overflow-hidden border-2 border-white shadow-sm">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" alt="Rahul" />
              </div>
              <div>
                <p className="text-xl font-black text-zinc-900">Rahul Sharma, 27</p>
                <p className="text-xs font-bold text-zinc-400">Software Engineer | Motivated Starter</p>
              </div>
            </div>
            <p className="italic text-zinc-600">“I start strong but can’t stay consistent. I need a coach who reminds me daily.”</p>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-black text-zinc-900 mb-1">Bio</p>
                <p className="text-[10px] text-zinc-500 font-medium">Works long hours; highly motivated to stay fit but misses consistency due to exhaustion.</p>
              </div>
              <div>
                <p className="font-black text-zinc-900 mb-1">Goals</p>
                <p className="text-[10px] text-zinc-500 font-medium">Build a long-term habit and see measurable physical results.</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-rose-500 font-bold">Tip: Add emotion — Personas should feel human, not just like data points.</p>
        </section>

        <section className="bg-zinc-900 text-white p-8 rounded-3xl">
          <h3 className="text-xl font-black text-emerald-400 mb-6 tracking-tight">Connecting Personas → JTBD → Features</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead className="text-zinc-500 uppercase tracking-widest">
                <tr>
                  <th className="p-4 text-left font-black">Persona</th>
                  <th className="p-4 text-left font-black">Job To Be Done</th>
                  <th className="p-4 text-left font-black">Feature Idea</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="p-4 font-bold text-white">Motivated Starter</td>
                  <td className="p-4 text-zinc-400">Stay consistent even when busy</td>
                  <td className="p-4 text-indigo-400 font-bold">AI habit reminders + streaks</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Data Achiever</td>
                  <td className="p-4 text-zinc-400">Track measurable progress</td>
                  <td className="p-4 text-indigo-400 font-bold">Analytics dashboard</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="p-6 bg-white border border-emerald-100 rounded-2xl shadow-sm">
        <h4 className="text-lg font-black text-emerald-900 mb-4">Day-9: Persona & JTBD Deck</h4>
        <p className="text-xs font-black uppercase text-zinc-400 mb-4 tracking-widest">Final Deliverables</p>
        <ul className="space-y-4">
           <li className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs shrink-0">1</div>
              <p className="text-sm font-bold text-zinc-700">2 Personas (Name, Bio, Goals, Pains, Behavior, Quote)</p>
           </li>
           <li className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs shrink-0">2</div>
              <p className="text-sm font-bold text-zinc-700">JTBD Statements (1 clear statement per persona)</p>
           </li>
           <li className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs shrink-0">3</div>
              <p className="text-sm font-bold text-zinc-700">1 Feature Suggestion clearly aligned to the "Job"</p>
           </li>
        </ul>
        <div className="mt-6 p-4 bg-zinc-50 rounded-xl text-center border border-dashed border-zinc-200">
            <span className="text-[10px] font-black uppercase text-zinc-400">Format: Canva / Slides / Notion • Due: End of Day 11</span>
        </div>
      </div>
    )
  },
  {
    day: 10,
    title: 'Competitive & Market Analysis 🧭',
    category: 'Strategy',
    preview: '“You can’t build a better product until you understand what already exists.” Master SWOT and feature benchmarking.',
    content: (
      <div className="space-y-8">
        <section className="bg-indigo-600 text-white p-8 rounded-3xl">
          <p className="text-xl font-bold mb-4 tracking-tight">Competitive & Market Analysis 🧭</p>
          <p className="italic">“You can’t build a better product until you understand what already exists.” Today’s goal is to position your idea intelligently.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">1. Mapping the Landscape</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h4 className="font-black text-indigo-600 text-sm mb-2">Direct Competitors</h4>
              <p className="text-xs text-zinc-500 font-medium mb-3">Same product, same target audience.</p>
              <div className="bg-zinc-50 p-2 rounded-lg text-[10px] font-bold text-zinc-400">Example: Habitica vs Streaks</div>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h4 className="font-black text-indigo-600 text-sm mb-2">Indirect Competitors</h4>
              <p className="text-xs text-zinc-500 font-medium mb-3">Solve the same need differently.</p>
              <div className="bg-zinc-50 p-2 rounded-lg text-[10px] font-bold text-zinc-400">Example: Google Tasks vs Notion</div>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h4 className="font-black text-indigo-600 text-sm mb-2">Aspirational</h4>
              <p className="text-xs text-zinc-500 font-medium mb-3">Inspire UX or growth strategies.</p>
              <div className="bg-zinc-50 p-2 rounded-lg text-[10px] font-bold text-zinc-400">Example: Headspace UI vibes</div>
            </div>
          </div>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
             <Zap className="w-5 h-5 text-emerald-600" />
             <p className="text-xs font-bold text-emerald-900">AI Hack: Ask Perplexity AI "List top 10 apps competing with [idea], include audience and unique features."</p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">2. Framework 1: SWOT Analysis</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
               <p className="font-black text-emerald-900 text-xs mb-1">STRENGTHS</p>
               <p className="text-[10px] text-emerald-700">"Beautiful UI, gamified loop"</p>
            </div>
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
               <p className="font-black text-rose-900 text-xs mb-1">WEAKNESSES</p>
               <p className="text-[10px] text-rose-700">"Limited AI personalization"</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
               <p className="font-black text-blue-900 text-xs mb-1">OPPORTUNITIES</p>
               <p className="text-[10px] text-blue-700">"Add AI coach habit nudges"</p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
               <p className="font-black text-amber-900 text-xs mb-1">THREATS</p>
               <p className="text-[10px] text-amber-700">"Big tech (Apple) entry"</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">3. Framework 2: Feature Comparison Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-sm">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="p-4 text-left font-black text-xs uppercase tracking-widest">Feature</th>
                  <th className="p-4 text-left font-black text-xs uppercase tracking-widest text-indigo-400">Us</th>
                  <th className="p-4 text-left font-black text-xs uppercase tracking-widest">Comp A</th>
                  <th className="p-4 text-left font-black text-xs uppercase tracking-widest">Comp B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-sm">
                <tr>
                  <td className="p-4 font-bold text-zinc-900">Personalized Dashboard</td>
                  <td className="p-4">✅</td>
                  <td className="p-4">❌</td>
                  <td className="p-4">✅</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-900">AI Habit Coach</td>
                  <td className="p-4">✅</td>
                  <td className="p-4">❌</td>
                  <td className="p-4">❌</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-900">Gamified Streaks</td>
                  <td className="p-4">✅</td>
                  <td className="p-4">✅</td>
                  <td className="p-4">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center italic text-zinc-400 text-xs">Insight: Discover what is "table-stakes" vs "differentiating".</p>
        </section>
      </div>
    ),
    assignment: (
      <div className="p-6 bg-white border border-indigo-100 rounded-2xl shadow-sm">
        <h4 className="text-lg font-black text-indigo-900 mb-4">Day-10: Competitive Report</h4>
        <p className="text-xs font-black uppercase text-zinc-400 mb-4 tracking-widest">Final Deliverables (2–3 slides)</p>
        <ul className="space-y-2 text-sm font-bold text-zinc-700">
           <li>• 2 SWOT Analyses: Competitor A & B.</li>
           <li>• Feature Comparison Matrix: Us vs others.</li>
           <li>• Positioning Statement: “Unlike X and Y, our product [does what] for [whom].”</li>
        </ul>
        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
           <p className="text-xs font-black text-emerald-900">Case Study: Zerodha vs Groww</p>
           <p className="text-[10px] text-emerald-700 mt-1">Design simplicity was the differentiator Groww used to disrupt a market of "complex dashboards."</p>
        </div>
      </div>
    )
  }
];