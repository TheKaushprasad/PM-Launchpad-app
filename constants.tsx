import React from 'react';
import { Lesson, ModuleInfo, Category } from './types';
import { 
  Lightbulb, Search, BarChart, 
  Code, Bot, Layers, Brain, Target, Sparkles, CheckCircle, Smartphone, Zap, Users, MessageSquare, Rocket, Activity, Database, Cpu, X, Box, HelpCircle, Terminal, TrendingUp, Settings2, ShieldCheck,
  FileText, Calendar, Compass, ClipboardList, PenTool, Hammer, Ship, RefreshCcw, Layout, FileEdit, PieChart, Send, Clock, ArrowRight, Play, LineChart, Recycle, Settings, HeartHandshake, Package, Beaker, AlertTriangle, Eye, Scale,
  BookOpen, ExternalLink, Map, Ear, UserCheck, Link, Smile, History, FileStack, Presentation, Megaphone, Briefcase, Users2, DollarSign, TrendingDown, Percent, ClipboardCheck, Mic2, Users2 as UsersIcon, Star, BarChart2
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
  { id: 'foundations', title: 'Foundations', category: 'Foundations', description: 'Core mindset, PLC, PDLC, and essential PM documentation.' },
  { id: 'research', title: 'Research', category: 'Research', description: 'User interviews, market analysis, and opportunity sizing.' },
  { id: 'strategy', title: 'Strategy', category: 'Strategy', description: 'Business fundamentals, stakeholder management, and roadmapping.' },
  { id: 'data', title: 'Data', category: 'Data', description: 'SQL, Excel, Power BI, and Product Analytics.' },
  { id: 'tech', title: 'Tech', category: 'Tech', description: 'APIs, System Design, and Cloud Computing for PMs.' },
  { id: 'design', title: 'Design', category: 'Design', description: 'UI/UX principles, wireframing, and usability testing.' },
  { id: 'ai', title: 'AI', category: 'AI', description: 'LLMs, Prompt Engineering, RAG, and AI Agents.' },
];

export const LESSONS: Lesson[] = [
  {
    day: 0,
    title: 'Foundation & Mindset',
    category: 'Foundations',
    preview: 'Start Your PM Journey Right 🚀. Before we jump into frameworks, today is about building the right mindset.',
    content: (
      <div className="space-y-6">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 mb-6">Day-0: Foundation & Mindset — Start Your PM Journey Right 🚀</h1>
        <p>Welcome to Day-0 of learning Product Management from scratch!</p>
        <p>Product Management is one of the most competitive and rewarding careers today. But breaking into PM without prior experience can feel overwhelming because the role demands:</p>
        <ol className="list-decimal pl-5 space-y-2 font-medium">
          <li>Cross-functional collaboration</li>
          <li>Strategic thinking & decision-making</li>
          <li>Problem-solving with ambiguity</li>
          <li>Understanding of business, design, tech & data</li>
          <li>Many aspiring PMs struggle not because they lack skills, but because they lack clarity of purpose and direction.</li>
        </ol>
        <h2 className="text-2xl font-black tracking-tight text-zinc-900 mt-8 mb-4">Why Day-0 Matters</h2>
        <p>Before learning “how to be a PM”, you must understand <strong>why you want to be a PM</strong>. PMs face pressure, ownership, ambiguity, and constant context switching — your motivation will keep you going when it gets hard.</p>
        <p>Understanding the reality of the role—not just the glamour—helps you evaluate:</p>
        <ul className="list-disc pl-5 space-y-2 font-medium">
          <li>Is the PM role aligned with your strengths & interests?</li>
          <li>Do you enjoy solving problems and talking to users?</li>
          <li>Are you comfortable making decisions without perfect data?</li>
        </ul>
        <p>The fastest way to answer these questions is to talk to real PMs, understand their challenges, impact, and day-to-day responsibilities.</p>
        <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
           <h3 className="font-black text-indigo-900 mb-2">Reflection Exercise</h3>
           <p className="italic">Write answers to this question: Why do I want to become a Product Manager?</p>
        </div>
        <p className="font-bold">Clarity today will drive consistency tomorrow.</p>
        <div className="mt-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
           <h3 className="font-black text-zinc-900 flex items-center gap-2 mb-4 uppercase tracking-widest text-xs">Outcome of Day-0</h3>
           <ul className="space-y-2">
              <li className="flex items-center gap-2 font-bold text-zinc-700"><CheckCircle className="w-4 h-4 text-emerald-500" /> Real understanding of what PM is</li>
              <li className="flex items-center gap-2 font-bold text-zinc-700"><CheckCircle className="w-4 h-4 text-emerald-500" /> Motivation aligned with reality</li>
              <li className="flex items-center gap-2 font-bold text-zinc-700"><CheckCircle className="w-4 h-4 text-emerald-500" /> Early networking with professionals</li>
              <li className="flex items-center gap-2 font-bold text-zinc-700"><CheckCircle className="w-4 h-4 text-emerald-500" /> A clear starting point for the course</li>
           </ul>
        </div>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <h4 className="text-lg font-black text-indigo-900 mb-2">Task 1 — Must Do Today</h4>
        <p className="text-zinc-700 leading-relaxed mb-4">Reach out to 5 Product Managers and ask them about their journey & role.</p>
        <p className="text-zinc-500 text-sm font-medium">Use LinkedIn, alumni networks, or company communities.</p>
        <p className="text-zinc-900 font-bold mt-4 underline">Goal</p>
        <p className="text-zinc-600">Collect insights and note patterns. This will guide your expectations.</p>
      </div>
    )
  },
  {
    day: 1,
    title: 'What is Product Management?',
    category: 'Foundations',
    preview: 'Understand the role, responsibilities, types, and myths about Product Management.',
    content: (
      <div className="space-y-8">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 1: What is Product Management? 🚀</h1>
        
        <section>
          <h2 className="text-2xl font-black text-zinc-900 mb-4">1. What is a Product?</h2>
          <p>A product is anything that creates value by solving a real user problem or fulfilling a need—whether physical, digital, or service-based.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Uber', 'Spotify', 'iPhone', 'Google Ads', 'ATM', 'WhatsApp'].map(item => (
              <span key={item} className="px-3 py-1 bg-zinc-100 rounded-lg text-xs font-bold text-zinc-600">{item}</span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-zinc-900 mb-4">2. Do Companies Need Product Managers?</h2>
          <p className="font-bold text-indigo-600 mb-4 italic">Short answer: Yes—but the title isn’t always necessary. Product thinking is.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-2xl border border-zinc-200 overflow-hidden">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-black uppercase text-zinc-500">Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-black uppercase text-zinc-500">Who acts as PM</th>
                  <th className="px-6 py-3 text-left text-xs font-black uppercase text-zinc-500">Why it works</th>
                  <th className="px-6 py-3 text-left text-xs font-black uppercase text-zinc-500">When it breaks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-sm">
                <tr>
                  <td className="px-6 py-4 font-bold">Early startup</td>
                  <td className="px-6 py-4">Founder</td>
                  <td className="px-6 py-4">Small team, fast decisions, direct feedback</td>
                  <td className="px-6 py-4">Complexity increases, decisions overload</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">Growth stage</td>
                  <td className="px-6 py-4">Dedicated PMs</td>
                  <td className="px-6 py-4">Align teams, prioritize impact, execution</td>
                  <td className="px-6 py-4">Without PMs: confusion, misalignment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-zinc-900 mb-4">3. Real-World Exceptions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h3 className="font-black text-zinc-900 mb-2">Basecamp</h3>
              <p className="text-xs text-zinc-500 font-medium">Design-led product development</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h3 className="font-black text-zinc-900 mb-2">Valve</h3>
              <p className="text-xs text-zinc-500 font-medium">Self-organized teams</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h3 className="font-black text-zinc-900 mb-2">Early FB / Stripe</h3>
              <p className="text-xs text-zinc-500 font-medium">Engineer-led decisions</p>
            </div>
          </div>
          <p className="mt-6 text-sm italic font-medium text-zinc-500">👉 These work only when everyone practices product thinking: user obsession + data + trade-offs + execution focus.</p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-zinc-900 mb-4">4. What is Product Management?</h2>
          <p>Product Management is the function responsible for guiding a product from idea → launch → growth → scale by balancing the <strong>PM Equation</strong>:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
               <h3 className="font-black text-blue-900 mb-2">Business</h3>
               <p className="text-sm text-blue-700">Revenue, success metrics, GTM strategy.</p>
            </div>
            <div className="p-6 bg-pink-50 rounded-3xl border border-pink-100">
               <h3 className="font-black text-pink-900 mb-2">Design</h3>
               <p className="text-sm text-pink-700">User experience & usability focus.</p>
            </div>
            <div className="p-6 bg-cyan-50 rounded-3xl border border-cyan-100">
               <h3 className="font-black text-cyan-900 mb-2">Tech</h3>
               <p className="text-sm text-cyan-700">Feasibility & backend system thinking.</p>
            </div>
          </div>
          <p className="mt-8 text-xl font-black text-center italic text-zinc-400">"PMs don’t decide how to build — they decide what to build and why."</p>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p className="font-black text-indigo-900 underline">Pick a product you use daily (e.g., Spotify, Zomato, Notion, Cred) and answer:</p>
        <div className="space-y-4 font-mono text-xs bg-white p-4 rounded-xl border border-zinc-100">
           <p>Product Name: ___</p>
           <p>User Problem: ___</p>
           <p>Key Metrics: ___</p>
           <p>Improvement Suggestion: ___</p>
        </div>
        <h4 className="font-black text-zinc-900 mt-6">Reflection Task</h4>
        <p className="text-sm text-zinc-600">Identify which of the 6 PM types (Core, Growth, Platform, Data, Technical, AI) excites you the most and why. Does it align with your current background?</p>
      </div>
    )
  },
  {
    day: 2,
    title: 'The Product Development Lifecycle (PDLC)',
    category: 'Foundations',
    preview: 'Theme: How products move from idea → design → build → launch → iterate.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 2: The Product Development Lifecycle (PDLC) 📘</h1>
        
        <section className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
          <h2 className="text-xl font-black text-indigo-900 mb-4 flex items-center gap-2">
             <Target className="w-5 h-5" /> Learning Objectives
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-indigo-700">
             <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Understand full PDLC</li>
             <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> PM contributions at each stage</li>
             <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> common outputs & tools</li>
             <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Avoid typical junior PM mistakes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black text-zinc-900 mb-6 underline decoration-indigo-600 underline-offset-8">1. What is PDLC?</h2>
          <p className="text-lg leading-relaxed text-zinc-600 mb-8">
            Product Development Lifecycle (PDLC) is the structured process of taking a product from 
            <strong> problem discovery → launch → continuous improvement</strong>, ensuring decisions are user-driven, data-backed, and business-aligned.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               { stage: 'Discovery', goal: 'Understand problem', output: 'Problem statement, Personas', color: 'bg-blue-50' },
               { stage: 'Definition', goal: 'Scope & prioritize', output: 'PRD, success metrics', color: 'bg-purple-50' },
               { stage: 'Design', goal: 'Visualize experience', output: 'Wireframes, Prototype', color: 'bg-pink-50' },
               { stage: 'Development', goal: 'Build & test', output: 'MVP, QA sign-off', color: 'bg-emerald-50' },
               { stage: 'Launch', goal: 'Ship product', output: 'GTM plan, adoption data', color: 'bg-orange-50' },
               { stage: 'Iteration', goal: 'Improve continuously', output: 'Insights, next roadmap', color: 'bg-zinc-50' },
             ].map((item, i) => (
               <div key={item.stage} className={`${item.color} p-6 rounded-3xl border border-black/5 shadow-sm transition-transform hover:-translate-y-1`}>
                  <div className="text-[10px] font-black uppercase text-zinc-400 mb-1">0{i+1}</div>
                  <h3 className="text-xl font-black mb-2">{item.stage}</h3>
                  <p className="text-xs font-bold mb-4 opacity-70">Goal: {item.goal}</p>
                  <div className="pt-3 border-t border-black/5">
                     <p className="text-[10px] font-black uppercase text-zinc-500">Key Output</p>
                     <p className="text-xs font-bold">{item.output}</p>
                  </div>
               </div>
             ))}
          </div>
        </section>

        <section className="space-y-12">
           <div className="border-l-4 border-indigo-600 pl-6 py-2">
              <h2 className="text-2xl font-black text-zinc-900 mb-2">Phase 1: Discovery (Find the Right Problem)</h2>
              <p className="text-indigo-600 font-black italic">“Fall in love with the problem, not the solution.”</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
                 <div>
                   <p className="uppercase text-[10px] font-black text-zinc-400">Activities</p>
                   <p>Market research, User interviews, SQL Analysis</p>
                 </div>
                 <div>
                   <p className="uppercase text-[10px] font-black text-zinc-400">Outputs</p>
                   <p>Problem Statement, JTBD, Hypothesis</p>
                 </div>
              </div>
              <div className="mt-6 p-4 bg-zinc-900 rounded-2xl text-white text-xs">
                 <p className="text-zinc-500 font-black mb-1 uppercase tracking-widest">Industry Case: Zomato</p>
                 <p>"Zomato observes high checkout drop-offs because of unpredictable surge delivery fees."</p>
              </div>
           </div>

           {/* Definition Phase Content placeholder following OCR exactly */}
           <div className="border-l-4 border-purple-600 pl-6 py-2">
              <h2 className="text-2xl font-black text-zinc-900 mb-2">Phase 2: Definition (Scope the Solution)</h2>
              <p className="text-zinc-500 font-medium">Turn insights into an actionable plan. Define what we are building and how we measure success.</p>
              <div className="mt-6 p-4 bg-zinc-900 rounded-2xl text-white text-xs">
                 <p className="text-zinc-500 font-black mb-1 uppercase tracking-widest">Industry Case: Zomato</p>
                 <p>"Test a Flat Delivery Fee Subscription Model to reduce checkout abandonment by 15%."</p>
              </div>
           </div>
        </section>

        <section className="bg-zinc-950 rounded-[3rem] p-10 text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 p-8 opacity-5"><Zap className="w-64 h-64" /></div>
           <h2 className="text-3xl font-black mb-10 tracking-tighter">SDLC VS PDLC</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                 <p className="text-indigo-400 font-black uppercase text-xs tracking-[0.2em]">Aspect</p>
                 <p className="h-10 flex items-center font-bold">Focus</p>
                 <p className="h-10 flex items-center font-bold">Goal</p>
                 <p className="h-10 flex items-center font-bold">Owner</p>
              </div>
              <div className="space-y-4 p-6 bg-white/5 rounded-3xl border border-white/10">
                 <p className="text-emerald-400 font-black uppercase text-xs tracking-[0.2em]">SDLC</p>
                 <p className="h-10 flex items-center text-sm font-medium">Building software correctly</p>
                 <p className="h-10 flex items-center text-sm font-medium">Deliver a working system</p>
                 <p className="h-10 flex items-center text-sm font-medium">Engineering / Tech team</p>
              </div>
              <div className="space-y-4 p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/20">
                 <p className="text-indigo-400 font-black uppercase text-xs tracking-[0.2em]">PDLC</p>
                 <p className="h-10 flex items-center text-sm font-medium text-indigo-100">Building the right product</p>
                 <p className="h-10 flex items-center text-sm font-medium text-indigo-100">Deliver user & business value</p>
                 <p className="h-10 flex items-center text-sm font-medium text-indigo-100">Product Manager</p>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p className="font-black text-indigo-900 underline">Pick any app (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and describe a new feature across the PDLC:</p>
        <div className="space-y-4 font-mono text-[10px] bg-white p-6 rounded-3xl border border-indigo-100 leading-relaxed">
           <p>Product: ___</p>
           <p>Feature Idea: ___</p>
           <p>Discovery – Problem & insight: ___</p>
           <p>Definition – Hypothesis & metrics: ___</p>
           <p>Design – Sketch or description: ___</p>
           <p>Development – Dependencies / risks: ___</p>
           <p>Launch – Target segment & rollout plan: ___</p>
           <p>Iteration – What will you measure?: ___</p>
        </div>
        <p className="text-sm font-bold text-indigo-600 mt-4">📌 Expected outcome: You learn to think like a PM end-to-end, considering everything from feasibility to measurement.</p>
      </div>
    ),
    resources: [
        { title: "SDLC Life Cycle for Beginners", url: "https://youtu.be/kSU2MPeptpM?si=k5ln45xHGIlrPV_o", type: "video" }
    ]
  },
  {
    day: 3,
    title: 'Product Life Cycle (PLC) & PLM',
    category: 'Foundations',
    preview: 'Understand how products evolve in the market over time and how companies manage that journey.',
    content: (
      <div className="space-y-8">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 3: Product Life Cycle (PLC) & PLM 🔄</h1>
        <section>
          <h2 className="text-2xl font-black text-zinc-900 mb-4">What is Product Life Cycle (PLC)?</h2>
          <p>Product Life Cycle is the journey a product goes through in the market — from the day it is launched to the day it is eventually retired.</p>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100">
              <h3 className="font-black text-blue-900 text-lg mb-3">1. Introduction</h3>
              <p className="text-sm text-blue-700 leading-relaxed">Sales are usually low. Marketing focus on building awareness. High R&D spend.</p>
           </div>
           <div className="p-8 bg-emerald-50/50 rounded-3xl border border-emerald-100">
              <h3 className="font-black text-emerald-900 text-lg mb-3">2. Growth</h3>
              <p className="text-sm text-emerald-700 leading-relaxed">Sales begin to increase. Focus on market share & brand loyalty. Competitors enter.</p>
           </div>
           <div className="p-8 bg-amber-50/50 rounded-3xl border border-amber-100">
              <h3 className="font-black text-amber-900 text-lg mb-3">3. Maturity</h3>
              <p className="text-sm text-amber-700 leading-relaxed">Peak sales & maximum penetration. Intense competition. Differentiation is key.</p>
           </div>
           <div className="p-8 bg-red-50/50 rounded-3xl border border-red-100">
              <h3 className="font-black text-red-900 text-lg mb-3">4. Decline</h3>
              <p className="text-sm text-red-700 leading-relaxed">Sales decline due to preferences or tech shifts. Decisions: extend or sunset.</p>
           </div>
        </div>

        <section className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-200">
          <h2 className="text-2xl font-black text-zinc-900 mb-4">Product Lifecycle Management (PLM)</h2>
          <p className="font-medium text-zinc-600">PLM is the practice of managing a product from its initiation to its eventual retirement through a systematic approach. It's like a <strong>guidebook</strong> that helps companies manage their products from start to finish.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               { title: 'Improved Collaboration', desc: 'Ensuring stakeholders from design to sales work together seamlessly.' },
               { title: 'Enhanced Quality', desc: 'Integrating quality control into each phase to rectify issues early.' },
               { title: 'Efficient Utilization', desc: 'Reducing waste and optimizing resource usage for cost savings.' },
               { title: 'Faster Time-to-Market', desc: 'Quicker development cycles through a structured approach.' }
             ].map(item => (
               <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shrink-0 shadow-sm"><CheckCircle className="w-5 h-5 text-indigo-500" /></div>
                  <div>
                    <h4 className="font-black text-zinc-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-zinc-500 font-medium">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p className="font-black text-indigo-900">Pick any product (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and evaluate its lifecycle:</p>
        <div className="space-y-4 font-mono text-[10px] bg-white p-6 rounded-3xl border border-indigo-100 leading-relaxed">
           <p>Product: ___</p>
           <p>Current PLC Stage: ___</p>
           <p>What signals tell you this stage?: ___</p>
           <p>What should PM focus on right now (Strategy)?: ___</p>
           <p>One risky decision PM must make at this stage: ___</p>
           <p>If it’s declining, how would you extend or sunset it?: ___</p>
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
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 4: Product Sense Framework 🧠</h1>
        <section className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10"><Brain className="w-48 h-48" /></div>
           <h2 className="text-2xl font-black mb-6">What is Product Sense?</h2>
           <p className="text-indigo-100 text-lg leading-relaxed max-w-2xl font-medium">
             Product sense is the ability to <strong>see through complexity</strong> and spot the user needs that matter most. 
             Marty Cagan emphasizes that it is deep product knowledge built through immersion, not an innate gift.
           </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-zinc-900 mb-8 uppercase tracking-[0.2em]">The 7 Pillars of Product Sense</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { title: 'Empathy & Customer Needs', desc: 'Listening for spoken and unspoken pain points and emotional drivers.', icon: HeartHandshake },
               { title: 'Market & Competitive Insight', desc: 'Analyzing trends and mapping competitor gaps to find unique value.', icon: Eye },
               { title: 'Design & UX Perspective', desc: 'Recognizing good flows and how design decisions affect engagement.', icon: Layout },
               { stage: '04', title: 'Problem Framing & Mapping', desc: 'Distinguishing root causes from symptoms and exploring options.', icon: Map },
               { stage: '05', title: 'Feasibility & Execution', desc: 'Balancing ambitious ideas with tech constraints and timelines.', icon: Hammer },
               { stage: '06', title: 'Iteration & Validation', desc: 'Using prototypes and experiments to adjust based on real data.', icon: RefreshCcw },
             ].map((pillar, i) => (
               <div key={pillar.title} className="group p-8 bg-white border border-zinc-100 rounded-[2.5rem] hover:border-indigo-100 hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-inner mb-6">
                     <pillar.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-black text-lg mb-2 text-zinc-900">{pillar.title}</h3>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">{pillar.desc}</p>
               </div>
             ))}
          </div>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h2 className="text-2xl font-black text-zinc-900 mb-8">Daily Habits to Build Instincts</h2>
           <div className="space-y-6">
              <div className="flex gap-6">
                 <div className="p-4 bg-white rounded-2xl shadow-sm border border-zinc-100"><Users className="w-6 h-6 text-indigo-600" /></div>
                 <div>
                    <h4 className="font-black text-zinc-900">Talk to Users Regularly</h4>
                    <p className="text-sm text-zinc-500 font-medium">Read tickets, join sales calls, and observe context surveys miss.</p>
                 </div>
              </div>
              <div className="flex gap-6">
                 <div className="p-4 bg-white rounded-2xl shadow-sm border border-zinc-100"><RefreshCcw className="w-6 h-6 text-indigo-600" /></div>
                 <div>
                    <h4 className="font-black text-zinc-900">Reverse-Engineer Products</h4>
                    <p className="text-sm text-zinc-500 font-medium">Break down apps like Airbnb to understand core needs and trade-offs.</p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <h4 className="font-black text-indigo-900">Task</h4>
        <p className="text-sm font-medium text-zinc-600 leading-relaxed">Pick a feature from an app you use daily. Write a 1-page "Product Sense Teardown" identifying:</p>
        <ul className="list-disc pl-5 text-sm font-bold text-zinc-800 space-y-2">
           <li>1) The core user problem</li>
           <li>2) The hypothesis behind the design</li>
           <li>3) One critical trade-off they made.</li>
        </ul>
        <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
           <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
           <div>
              <h5 className="font-black text-amber-900 text-sm">Common Pitfalls to Avoid</h5>
              <p className="text-xs text-amber-800 mt-1 font-bold">The Aesthetic Trap: Don't mistake polished UI for good product sense; a beautiful design solving the wrong problem is a failure.</p>
           </div>
        </div>
      </div>
    ),
    resources: [
        { title: "What is Product Sense? by Robin Dhanwani", url: "https://www.parallelhq.com/blog/what-product-sense", type: "article" }
    ]
  },
  {
    day: 5,
    title: 'User Empathy',
    category: 'Foundations',
    preview: 'Step into their shoes. User empathy is the fundamental driver of human-centered development.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 5: User Empathy 🤝</h1>
        <section className="bg-pink-50 p-10 rounded-[3rem] border border-pink-100">
           <blockquote className="text-2xl font-black italic text-pink-900 leading-tight">
             “Empathy is a core value that ensures products exceed expectations, not just meet them.”
           </blockquote>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="space-y-6">
              <h2 className="text-2xl font-black text-zinc-900">Core Principles</h2>
              <div className="space-y-4">
                 {[
                   { title: 'Active Listening', desc: 'Listen without judgment. Encourage open communication.' },
                   { title: 'Putting Users First', desc: 'Prioritize user needs over internal assumptions or ego.' },
                   { title: 'Deep Connection', desc: 'Grasp challenges, desires, and emotional motivations.' },
                 ].map(item => (
                   <div key={item.title} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                      <h4 className="font-black text-zinc-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-zinc-500 font-medium">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
           <div className="space-y-6">
              <h2 className="text-2xl font-black text-zinc-900">Implementation</h2>
              <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white">
                 <h3 className="text-indigo-400 font-black text-xs uppercase tracking-widest mb-6">Process</h3>
                 <ol className="space-y-6">
                    <li className="flex gap-4">
                       <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black text-xs shrink-0">1</span>
                       <p className="text-sm font-bold">User Research & Personas: Map what users think, feel, experience, and do.</p>
                    </li>
                    <li className="flex gap-4">
                       <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black text-xs shrink-0">2</span>
                       <p className="text-sm font-bold">Design Thinking Integration: Empathize → Define → Ideate → Prototype → Test.</p>
                    </li>
                    <li className="flex gap-4">
                       <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black text-xs shrink-0">3</span>
                       <p className="text-sm font-bold">Continuous Feedback Loops: Involve users at every stage, not just at the end.</p>
                    </li>
                 </ol>
              </div>
           </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-zinc-900 mb-6">Real-World Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <h3 className="font-black text-zinc-900 mb-2">Apple</h3>
                <p className="text-sm text-zinc-500 font-medium">Demonstrates empathy through user-friendly interfaces and seamless experiences.</p>
             </div>
             <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <h3 className="font-black text-zinc-900 mb-2">Airbnb</h3>
                <p className="text-sm text-zinc-500 font-medium">Achieved success by focusing on the traveler's need for unique and personalized experiences.</p>
             </div>
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <h4 className="font-black text-indigo-900">Task</h4>
        <p className="text-sm font-bold text-zinc-800">Find out How did Airbnb use user empathy to drive their success? Look for specific stories about their "early days" and how they handled user problems.</p>
        <div className="space-y-4 pt-4">
           <p className="text-xs font-black uppercase text-zinc-400">Reflection Questions</p>
           <ol className="list-decimal pl-5 text-xs font-bold text-zinc-600 space-y-2">
              <li>How did they identify the problem travelers faced?</li>
              <li>What "unscalable" things did the founders do to empathize with hosts?</li>
              <li>How is that empathy reflected in the current app experience?</li>
           </ol>
        </div>
      </div>
    )
  },
  {
    day: 6,
    title: 'Essential Product Documentation',
    category: 'Foundations',
    preview: 'A Product Manager\'s Complete Guide. Distinguish between PRD, BRD, user stories, and more.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 6: Essential Product Documentation 📄</h1>
        
        <div className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6 flex items-center gap-3"><ClipboardList /> Learning Objectives</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm font-bold text-indigo-700">
              <p>• Distinguish between document types (PRD, BRD, etc.)</p>
              <p>• Create comprehensive PRDs</p>
              <p>• Write effective user stories & acceptance criteria</p>
              <p>• Develop outcome-focused roadmaps</p>
              <p>• Produce GTM documentation</p>
              <p>• Maintain decision logs and meeting notes</p>
           </div>
        </div>

        <section className="space-y-8">
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
              <h3 className="text-2xl font-black text-zinc-900 mb-4">The Product Requirements Document (PRD)</h3>
              <p className="text-zinc-600 font-medium leading-relaxed">
                 The PRD is the product manager's most fundamental artifact. It defines what you're building, why you're building it, and what success looks like. 
                 Think of it as the <strong>single source of truth</strong> that aligns teams.
              </p>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                 {['Context', 'Metrics', 'User Stories', 'Scope Boundaries'].map(tag => (
                   <div key={tag} className="px-4 py-2 bg-indigo-50 rounded-xl text-[10px] font-black text-indigo-600 text-center uppercase tracking-widest">{tag}</div>
                 ))}
              </div>
           </div>

           <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem]">
              <h3 className="text-2xl font-black text-zinc-900 mb-4">The Business Requirements Document (BRD)</h3>
              <p className="text-zinc-600 font-medium leading-relaxed">
                 BRDs articulate the business case. This document answers the question every executive asks: <strong>why should we invest resources in this?</strong>
              </p>
           </div>
        </section>

        <section className="bg-zinc-950 rounded-[3rem] p-10 text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 p-8 opacity-5"><Zap className="w-64 h-64" /></div>
           <h2 className="text-3xl font-black mb-8 tracking-tighter">Documentation Best Practices</h2>
           <ul className="space-y-4 text-zinc-300 font-medium">
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> Know your audience and write for them.</li>
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> Be concise and scannable. Use headers & bullet points.</li>
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> Keep documentation accessible and discoverable.</li>
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> Maintain documentation as you go rather than letting it rot.</li>
           </ul>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <h4 className="font-black text-indigo-900">Assignment</h4>
        <p className="text-sm font-bold text-zinc-800 underline decoration-indigo-600">Create your own PRD using ChatPRD.ai</p>
        <div className="space-y-4 pt-4">
           <p className="text-xs font-black uppercase text-zinc-400">Watch Lessons</p>
           <ul className="text-xs font-black text-indigo-600 space-y-2">
              <li className="flex items-center gap-2"><Play className="w-3 h-3" /> <a href="https://youtu.be/cnp6Ck8OIiY?si=eJHw5hzcwuiZZyf0" target="_blank" rel="noreferrer">Product Strategy & Roadmap</a></li>
              <li className="flex items-center gap-2"><Play className="w-3 h-3" /> <a href="https://youtu.be/eDVtBleIxag?si=mE-x6s3HPTloD13x" target="_blank" rel="noreferrer">GTM Strategy</a></li>
           </ul>
        </div>
      </div>
    )
  },
  {
    day: 7,
    title: 'Stakeholder Management',
    category: 'Foundations',
    preview: 'The Product Manager\'s Essential Guide. Align diverse groups around a shared vision.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 7: Stakeholder Management 🤝</h1>
        <section className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
           <p className="text-xl font-black text-emerald-900 leading-tight">
             “Product managers have all the responsibility but none of the authority.”
           </p>
        </section>

        <section>
           <h2 className="text-2xl font-black text-zinc-900 mb-6">The Power Map: Influence vs. Interest</h2>
           <p className="text-zinc-600 font-medium mb-8">Not all stakeholders deserve equal time. Create a simple two-by-two matrix plotting stakeholders by their influence over your product and their interest in it.</p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                 <h4 className="font-black text-zinc-900 mb-2">High Influence / High Interest</h4>
                 <p className="text-sm text-zinc-500 font-medium">Key players who need regular engagement and input.</p>
              </div>
              <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                 <h4 className="font-black text-zinc-900 mb-2">High Influence / Low Interest</h4>
                 <p className="text-sm text-zinc-500 font-medium">Keep satisfied. Provide enough info to stay supportive.</p>
              </div>
           </div>
        </section>

        <section className="space-y-6">
           <h2 className="text-2xl font-black text-zinc-900">Saying No Gracefully</h2>
           <p className="text-zinc-600 font-medium">Product managers must say no constantly. Every <strong>yes</strong> to one feature is a <strong>no</strong> to dozens of others.</p>
           <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-200">
              <p className="text-zinc-800 font-bold italic mb-4">Instead of "we can't do that," try:</p>
              <p className="text-indigo-600 font-black">"Here's where that sits against our priorities and why we're sequencing things this way."</p>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-4">
        <h4 className="font-black text-indigo-900 flex items-center gap-2"><Play className="w-4 h-4" /> Watch:</h4>
        <a href="https://youtu.be/jz7tPVDwb50?si=71B7Acqz6U2F0XA8" target="_blank" rel="noreferrer" className="text-sm font-bold text-indigo-600 underline">Communicating and Working with Stakeholders</a>
      </div>
    )
  },
  {
    day: 8,
    title: 'Business Fundamentals for PMs',
    category: 'Foundations',
    preview: 'Master the metrics that drive sustainable products. Learn CAC, LTV, and the "Golden Ratio".',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 8: Business Fundamentals for PMs 💰</h1>
        
        <section className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100">
           <h2 className="text-xl font-black text-amber-900 mb-4">The "Mini-CEO" Mindset</h2>
           <p className="text-amber-800 font-medium">Product Managers must justify investments with ROI and understand customer lifecycle economics.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xl font-black text-zinc-900">Customer Acquisition Cost (CAC)</h3>
              <div className="p-4 bg-zinc-900 rounded-2xl text-indigo-400 font-mono text-sm">
                 CAC = (Total Mkt + Sales Costs) / # New Users
              </div>
              <p className="text-xs text-zinc-500 font-bold">Example: $50,000 spend + 500 users = $100 CAC</p>
           </div>
           <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xl font-black text-zinc-900">Lifetime Value (LTV)</h3>
              <div className="p-4 bg-zinc-900 rounded-2xl text-indigo-400 font-mono text-sm">
                 LTV = (ARPU × Gross Margin) / Churn Rate
              </div>
              <p className="text-xs text-zinc-500 font-bold italic">Critical Insight: Increasing customer lifespan by 50% directly increases LTV by 50%!</p>
           </div>
        </section>

        <section>
           <h2 className="text-2xl font-black text-zinc-900 mb-6">The Golden Ratio: LTV:CAC</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                 <h4 className="font-black text-red-900 mb-2">{"< 1:1 Crisis Mode"}</h4>
                 <p className="text-xs text-red-700">Losing money. Reduce CAC or increase LTV urgently.</p>
              </div>
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                 <h4 className="font-black text-emerald-900 mb-2">3:1 to 5:1 The Sweet Spot</h4>
                 <p className="text-xs text-emerald-700">Optimal balance. Scalable and healthy business.</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                 <h4 className="font-black text-blue-900 mb-2">{"> 5:1 Underinvesting"}</h4>
                 <p className="text-xs text-blue-700">Too conservative. Competitors might outgrow you.</p>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <h4 className="font-black text-indigo-900">Unit Economics Problem</h4>
        <div className="p-6 bg-white border border-zinc-100 rounded-2xl space-y-2 text-xs font-bold text-zinc-600">
           <p>Ad Spend: $30,000</p>
           <p>Sales Team Costs: $20,000</p>
           <p>New Customers: 250</p>
           <p>ARPU: $40/month</p>
           <p>Avg Lifespan: 10 months</p>
           <p>Gross Margin: 80%</p>
        </div>
        <p className="text-sm font-black text-zinc-900">Calculate CAC, LTV, and LTV:CAC Ratio. Based on your results, what should the PM prioritize?</p>
      </div>
    )
  },
  {
    day: 9,
    title: 'Introduction to User & Market Research',
    category: 'Research',
    preview: 'Think like a researcher. Learn structured methods to uncover pain points and validate ideas.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 9: Intro to User & Market Research 🔍</h1>
        <section className="bg-purple-50 p-10 rounded-[3rem] border border-purple-100">
           <blockquote className="text-xl font-black text-purple-900 italic">
             “Great products start with deep understanding — of users, their needs, and the market around them.”
           </blockquote>
        </section>

        <section>
           <h2 className="text-2xl font-black text-zinc-900 mb-6">User Research vs Market Research</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                 <h3 className="font-black text-lg mb-4 text-purple-600 uppercase tracking-widest">User Research</h3>
                 <ul className="space-y-3 text-sm font-bold text-zinc-600">
                    <li>• Focus: Individual behaviors & pain points</li>
                    <li>• Goal: Validate Problem</li>
                    <li>• Output: Personas, Journey Maps</li>
                 </ul>
              </div>
              <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                 <h3 className="font-black text-lg mb-4 text-indigo-600 uppercase tracking-widest">Market Research</h3>
                 <ul className="space-y-3 text-sm font-bold text-zinc-600">
                    <li>• Focus: Industry, competitors, trends</li>
                    <li>• Goal: Validate Opportunity</li>
                    <li>• Output: TAM/SAM/SOM, SWOT</li>
                 </ul>
              </div>
           </div>
           <p className="mt-6 text-sm font-black text-zinc-400">💡 PM Tip: Always start with user research before market research. If users don’t want it, market data doesn’t matter.</p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-zinc-900 mb-6">Research Frameworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
                <h4 className="font-black mb-2">Empathy Map</h4>
                <p className="text-xs font-bold text-zinc-500">Map out what users: Says, Does, Thinks, and Feels.</p>
             </div>
             <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
                <h4 className="font-black mb-2">Jobs To Be Done (JTBD)</h4>
                <p className="text-xs font-bold text-zinc-500">“People don’t buy products; they hire them to get a job done.”</p>
             </div>
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <h4 className="font-black text-indigo-900">Research Task List</h4>
        <ol className="list-decimal pl-5 text-sm font-bold text-zinc-700 space-y-3">
           <li>Define Target Segment using demographics and psychographics.</li>
           <li>Create a 2x2 Pain Point vs. Outcome Table.</li>
           <li>Competitor Scan: Use Perplexity AI to find 3 competitors.</li>
        </ol>
        <p className="pt-4 text-xs font-black text-zinc-400 uppercase tracking-widest">Must Watch:</p>
        <ul className="text-[10px] font-black text-indigo-600 space-y-1">
           <li>• <a href="https://youtu.be/MxwyGi-3dzY?si=CV5VWd2bNnUDW-fP" target="_blank" rel="noreferrer">Doing User Research</a></li>
           <li>• <a href="https://youtu.be/LoJDAeq6i34?si=Ok2GW9U0wFmSJzz8" target="_blank" rel="noreferrer">Market Research</a></li>
        </ul>
      </div>
    )
  },
  {
    day: 10,
    title: 'User Interviews & Surveys',
    category: 'Research',
    preview: 'Learn how to validate insights through real conversations and structured feedback.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 10: User Interviews & Surveys 🎙️</h1>
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <blockquote className="text-xl font-black text-indigo-900 italic">
             “If you listen carefully, your users will write your roadmap for you.”
           </blockquote>
        </section>

        <section className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-900">Types of Interview Questions</h2>
           <div className="overflow-hidden rounded-3xl border border-zinc-200">
              <table className="min-w-full bg-white">
                 <thead className="bg-zinc-50 text-left text-xs font-black text-zinc-500 uppercase tracking-widest">
                    <tr>
                       <th className="px-6 py-4">Type</th>
                       <th className="px-6 py-4">Example</th>
                       <th className="px-6 py-4">Purpose</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-zinc-100 text-sm font-medium">
                    <tr>
                       <td className="px-6 py-4 font-bold">Behavioral (Past)</td>
                       <td className="px-6 py-4 text-zinc-500">“Tell me about the last time you ordered food.”</td>
                       <td className="px-6 py-4 text-indigo-600 font-bold">Habit Analysis</td>
                    </tr>
                    <tr>
                       <td className="px-6 py-4 font-bold">Attitudinal (Feelings)</td>
                       <td className="px-6 py-4 text-zinc-500">“What frustrates you most about your current apps?”</td>
                       <td className="px-6 py-4 text-indigo-600 font-bold">Pain Discovery</td>
                    </tr>
                    <tr>
                       <td className="px-6 py-4 font-bold">Aspirational (Future)</td>
                       <td className="px-6 py-4 text-zinc-500">“What would make your experience 10x better?”</td>
                       <td className="px-6 py-4 text-indigo-600 font-bold">Ideation</td>
                    </tr>
                 </tbody>
              </table>
           </div>
           <p className="text-xs font-black text-zinc-400">🧠 Golden Rule: No leading questions. Don't ask "Wouldn't it be better if...?" Ask "How do you feel about...?"</p>
        </section>

        <section className="bg-zinc-900 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-8">Synthesizing Insights</h2>
           <p className="text-zinc-400 font-medium mb-10 leading-relaxed">After 5–10 interviews, group similar issues into actionable themes.</p>
           <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-2">
                 <p className="text-xs font-black uppercase text-indigo-400">The Pain</p>
                 <p className="text-lg font-bold">Motivation Drop</p>
                 <p className="text-sm text-zinc-500">"I forget my fitness goals midweek."</p>
              </div>
              <div className="flex-1 space-y-2">
                 <p className="text-xs font-black uppercase text-emerald-400">Feature Opportunity</p>
                 <p className="text-lg font-bold">AI Reminder Coach</p>
                 <p className="text-sm text-zinc-500">Contextual nudges based on historical low-activity days.</p>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <h4 className="font-black text-indigo-900">User Insights Report (1-Page Deliverable)</h4>
        <ol className="list-decimal pl-5 text-sm font-bold text-zinc-700 space-y-3">
           <li>Top 3 Pain Points (with supporting user quotes)</li>
           <li>Top 3 Desired Outcomes (what users want to achieve)</li>
           <li>One Opportunity Statement: How might we solve for X?</li>
        </ol>
        <p className="pt-4 text-xs font-black text-zinc-400 uppercase tracking-widest">Must Watch:</p>
        <a href="https://youtu.be/5tVbFfGQCk?si=91eAlcNvjUAFfxM1" target="_blank" rel="noreferrer" className="text-sm font-black text-indigo-600 underline">How To Conduct User Interviews Like A Pro</a>
      </div>
    )
  },
  {
    day: 11,
    title: 'User Personas & JTBD',
    category: 'Research',
    preview: 'Convert raw feedback into structured user profiles. “You don’t design for everyone — you design for someone.”',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 11: User Personas & JTBD 👥</h1>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {['Clustering', 'Identification', 'Narrative'].map((step, i) => (
             <div key={step} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm text-center">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 block">Step 0{i+1}</span>
                <h4 className="font-black text-zinc-900 mb-1">{step}</h4>
             </div>
           ))}
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3.5rem] border border-zinc-200">
           <h2 className="text-2xl font-black text-zinc-900 mb-6">Persona Template: Rahul</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-medium text-zinc-600">
              <div className="space-y-4">
                 <p className="text-xl font-black text-zinc-900">Rahul Sharma, 27</p>
                 <p className="text-indigo-600 font-bold uppercase tracking-widest text-xs">Software Engineer</p>
                 <p className="italic">“I need a coach who reminds me daily.”</p>
                 <p><strong>Bio:</strong> Works long hours; highly motivated to stay fit but misses consistency due to exhaustion.</p>
              </div>
              <div className="space-y-4">
                 <p><strong>Goals:</strong> Build a long-term habit and see measurable physical results.</p>
                 <p><strong>Frustrations:</strong> Lack of personalized accountability; tools don't adapt to his schedule.</p>
                 <p><strong>Tech Comfort:</strong> High. Owns a Garmin smartwatch.</p>
              </div>
           </div>
           <p className="mt-8 text-xs font-black text-zinc-400">📍 Tip: Add emotion — Personas should feel human, not just like data points.</p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-zinc-900 mb-6">JTBD Framework</h2>
          <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white">
             <p className="text-indigo-400 font-mono text-sm mb-6">{"When I [situation], I want to [motivation], So I can [desired outcome]."}</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                   <p className="font-black mb-1">Duolingo</p>
                   <p className="text-zinc-400">"When I have free time, I want quick practice, so I feel productive."</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                   <p className="font-black mb-1">Notion</p>
                   <p className="text-zinc-400">"When I start a project, I want everything in one place, so I stay organized."</p>
                </div>
             </div>
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <h4 className="font-black text-indigo-900">Day-9: Persona & JTBD Deck</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h5 className="font-black text-xs uppercase tracking-widest text-zinc-400 mb-2">Deliverable 1</h5>
              <p className="text-xs font-bold text-zinc-800">2 Personas (Name, Bio, Goals, Pains)</p>
           </div>
           <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h5 className="font-black text-xs uppercase tracking-widest text-zinc-400 mb-2">Deliverable 2</h5>
              <p className="text-xs font-bold text-zinc-800">JTBD Statements (1 per persona)</p>
           </div>
           <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <h5 className="font-black text-xs uppercase tracking-widest text-zinc-400 mb-2">Deliverable 3</h5>
              <p className="text-xs font-bold text-zinc-800">1 Feature Suggestion aligned to Job</p>
           </div>
        </div>
      </div>
    )
  },
  {
    day: 12,
    title: 'Competitive & Market Analysis',
    category: 'Research',
    preview: '“You can’t build a better product until you understand what already exists.” Master SWOT and benchmarking.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 12: Competitive & Market Analysis 🧭</h1>
        
        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h2 className="text-2xl font-black mb-8">Framework 1: SWOT Analysis</h2>
           <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                 <h4 className="font-black text-emerald-900">Strengths</h4>
                 <p className="text-xs text-emerald-600 font-bold">What do they do well?</p>
              </div>
              <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                 <h4 className="font-black text-red-900">Weaknesses</h4>
                 <p className="text-xs text-red-600 font-bold">Where do they fall short?</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                 <h4 className="font-black text-blue-900">Opportunities</h4>
                 <p className="text-xs text-blue-600 font-bold">What can we do better?</p>
              </div>
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                 <h4 className="font-black text-amber-900">Threats</h4>
                 <p className="text-xs text-amber-600 font-bold">What could hurt us?</p>
              </div>
           </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-zinc-900 mb-6">Framework 2: Feature Comparison Matrix</h2>
          <div className="overflow-hidden rounded-3xl border border-zinc-200">
            <table className="min-w-full bg-white">
              <thead className="bg-zinc-900 text-white text-left text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Feature</th>
                  <th className="px-6 py-4">Us</th>
                  <th className="px-6 py-4">Comp A</th>
                  <th className="px-6 py-4">Comp B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr>
                  <td className="px-6 py-4 text-xs font-black">Personalized Dashboard</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">✅</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-xs font-black">AI Habit Coach</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">❌</td>
                  <td className="px-6 py-4">❌</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-xs font-black">Gamified Streaks</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                  <td className="px-6 py-4">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[10px] font-black text-zinc-400">🧠 Insight: Discover what is "table-stakes" vs "differentiating".</p>
        </section>

        <section className="bg-zinc-950 p-10 rounded-[3rem] text-white">
           <h3 className="text-xl font-black mb-4">Zerodha vs Groww</h3>
           <p className="text-zinc-400 font-medium mb-4 italic">Design simplicity was the differentiator Groww used to disrupt a market of "complex dashboards."</p>
           <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10">
              <div>
                 <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">Zerodha Strength</p>
                 <p className="text-sm font-bold">Advanced tools for Traders.</p>
              </div>
              <div>
                 <p className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-1">Groww Strength</p>
                 <p className="text-sm font-bold">UI simplicity for First-timers.</p>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <h4 className="font-black text-indigo-900 uppercase tracking-widest text-sm">Competitive Report (2–3 slides)</h4>
        <ul className="text-sm font-bold text-zinc-700 space-y-2">
           <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 2 SWOT Analysis: Competitor A & B.</li>
           <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Feature Comparison Matrix: Us vs others.</li>
           <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Positioning Statement: “Unlike X and Y, our product [does what] for [whom].”</li>
        </ul>
        <p className="pt-6 text-xs font-black text-zinc-400 uppercase tracking-widest">Must Watch:</p>
        <a href="https://youtu.be/UnBL8h8TVX8?si=v7_4Kx9EDy357xjg" target="_blank" rel="noreferrer" className="text-sm font-black text-indigo-600 underline">Competitive Analysis for Product Managers</a>
      </div>
    )
  },
  {
    day: 13,
    title: 'Opportunity Sizing (TAM/SAM/SOM)',
    category: 'Research',
    preview: 'Quantify the potential behind your product idea. “A great product solves a problem — but a great business solves it for a market that’s big enough.”',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 13: Opportunity Sizing (TAM/SAM/SOM) 📊</h1>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'TAM', title: 'Total Addressable Market', desc: 'Total global demand if everyone bought it.', ex: '$7B Global fitness app' },
             { label: 'SAM', title: 'Serviceable Available Market', desc: 'The portion you can serve based on geography.', ex: '$1.2B India fitness app' },
             { label: 'SOM', title: 'Serviceable Obtainable Market', desc: 'Share you can realistically capture in 2-3 years.', ex: '$12M (1% of SAM)' },
           ].map(item => (
             <div key={item.label} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
                <span className="text-indigo-600 font-black text-xs uppercase tracking-widest block mb-4">{item.label}</span>
                <h3 className="font-black text-lg text-zinc-900 mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-500 font-medium mb-6 leading-relaxed">{item.desc}</p>
                <div className="pt-4 border-t border-zinc-50 text-[10px] font-black text-zinc-400 uppercase">{item.ex}</div>
             </div>
           ))}
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3.5rem] border border-zinc-200">
           <h2 className="text-2xl font-black text-zinc-900 mb-8">Approaches to Estimate Market Size</h2>
           <div className="space-y-6">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-zinc-100">
                 <h4 className="font-black text-indigo-600 mb-2">A. Top-Down (Market Reports)</h4>
                 <p className="text-sm font-medium text-zinc-600">Use existing industry reports (Statista, McKinsey). Example: "Statista reports Indian EdTech market is $5.7B → your target 10% → SAM = $570M"</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-zinc-100">
                 <h4 className="font-black text-indigo-600 mb-2">B. Bottom-Up (User-Based)</h4>
                 <p className="text-sm font-medium text-zinc-600">Start from customer base and scale up. SOM = (Number of target users × Price × Frequency)</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-zinc-100">
                 <h4 className="font-black text-indigo-600 mb-2">C. Value-Based</h4>
                 <p className="text-sm font-medium text-zinc-600">Estimate based on value created/replaced. Example: Tool saves 5 hrs/week ($500 value) → Price at 10% → $50/month.</p>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <h4 className="font-black text-indigo-900">Market Sizing Deck (1–2 slides)</h4>
        <ul className="text-sm font-bold text-zinc-700 space-y-2">
           <li>• 1 Funnel diagram (TAM → SAM → SOM)</li>
           <li>• Data source references & key assumptions</li>
           <li>• 1-line insight: “Our product addresses a $500M opportunity growing at 15% CAGR.”</li>
        </ul>
        <p className="pt-4 text-xs font-black text-zinc-400 uppercase tracking-widest">Recommended Video:</p>
        <a href="https://youtu.be/nCYOMU7rKCs?si=cvu8yrnAbxDueKEI" target="_blank" rel="noreferrer" className="text-sm font-black text-indigo-600 underline">TAM, SAM, SOM Explained</a>
      </div>
    )
  },
  {
    day: 14,
    title: 'Introduction to SQL for PMs',
    category: 'Data',
    preview: '“Data is the voice of your users. SQL lets you listen.” Master the fundamentals of querying databases.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 14: Introduction to SQL for PMs 📊</h1>
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6 flex items-center gap-3">🎯 Learning Objectives</h2>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-indigo-700">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Setup a practice SQL environment</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Write basic SELECT queries</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Filter data using WHERE clauses</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Execute DDL and DML commands</li>
           </ul>
        </section>

        <section className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-900">Why PMs Need SQL</h2>
           <p className="text-zinc-600 font-medium">Without SQL: You wait for analysts, ask vague questions. With SQL: You validate hypotheses in real-time independently.</p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-zinc-900 rounded-3xl p-8 text-white">
                 <h4 className="font-black text-xs uppercase tracking-widest text-indigo-400 mb-4">Case 1: Feature Adoption</h4>
                 <pre className="font-mono text-[10px] text-zinc-400">
{`SELECT feature_name, 
       COUNT(DISTINCT user_id) as users
FROM feature_usage
WHERE date >= '2025-01-01'
GROUP BY feature_name;`}
                 </pre>
              </div>
              <div className="bg-zinc-900 rounded-3xl p-8 text-white">
                 <h4 className="font-black text-xs uppercase tracking-widest text-indigo-400 mb-4">Case 2: Churn Analysis</h4>
                 <pre className="font-mono text-[10px] text-zinc-400">
{`SELECT * FROM users
WHERE last_active_date < '2025-01-01'
AND signup_date < '2024-12-01';`}
                 </pre>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-4">
        <p className="font-black text-indigo-900">Task: Complete these topics from the featured video:</p>
        <ul className="text-xs font-bold text-zinc-600 space-y-2 pl-5 list-disc">
           <li>00:00 Intro</li>
           <li>07:38 Introduction to SQL</li>
           <li>34:01 Query Data (SELECT)</li>
           <li>01:32:31 DDL Commands</li>
           <li>01:43:44 DML Commands</li>
        </ul>
        <a href="https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg" target="_blank" rel="noreferrer" className="block mt-4 text-xs font-black text-indigo-600 underline">Watch SQL Tutorial</a>
      </div>
    )
  },
  {
    day: 15,
    title: 'Filtering Data & SQL Joins',
    category: 'Data',
    preview: '“Joining tables is where SQL becomes powerful for PMs.” Master advanced filtering and multiple table queries.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 15: Filtering Data & SQL Joins 🔗</h1>
        
        <section className="bg-emerald-50/50 p-10 rounded-[3rem] border border-emerald-100">
           <blockquote className="text-2xl font-black text-emerald-900 italic">
             “Joining tables is where SQL becomes powerful for PMs.”
           </blockquote>
           <p className="mt-4 text-emerald-700 font-medium">Master advanced filtering (LIKE, IN, BETWEEN) and learn to combine data from multiple tables.</p>
        </section>

        <section className="space-y-8">
           <h2 className="text-xl font-black uppercase tracking-widest text-zinc-400">Intermediate Level Chapters</h2>
           <div className="space-y-4">
              {[
                { time: "02:08:03", label: "Filtering Data" },
                { time: "02:47:57", label: "SQL Joins (Basics)" },
                { time: "03:27:29", label: "SQL Joins (Advanced)" },
              ].map(chapter => (
                <div key={chapter.time} className="flex items-center justify-between p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
                   <span className="font-black text-zinc-900">{chapter.label}</span>
                   <span className="font-mono text-xs font-black text-indigo-600">{chapter.time}</span>
                </div>
              ))}
           </div>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h2 className="text-2xl font-black text-zinc-900 mb-6">Learning Objectives</h2>
           <ul className="space-y-4 text-sm font-bold text-zinc-600">
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500" /> Use advanced WHERE filters (LIKE, IN, BETWEEN)</li>
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500" /> Understand database relationships</li>
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500" /> Perform INNER, LEFT, RIGHT, and FULL JOINS</li>
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500" /> Combine tables to answer complex questions</li>
           </ul>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-4">
        <h4 className="font-black text-indigo-900 uppercase tracking-widest text-xs mb-2">Practice Tasks</h4>
        <p className="text-sm font-bold text-zinc-700 leading-relaxed italic">
          {"Previous: Introduction to SQL — Up Next: SQL Set Operators & Functions Deep Dive"}
        </p>
      </div>
    ),
    resources: [
        { title: "SQL Tutorial (Intermediate)", url: "https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg", type: "video" }
    ]
  },
  {
    day: 16,
    title: 'SQL Set Operators & Functions Deep Dive',
    category: 'Data',
    preview: '“Master SQL functions to transform raw data into actionable insights.”',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 16: SQL Set Operators & Functions Deep Dive 🧪</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { label: "Set Operators", desc: "Combine results using UNION, INTERSECT, and EXCEPT." },
             { label: "String Functions", desc: "Apply string functions to clean and format text data." },
             { label: "Numeric Functions", desc: "Use numeric functions for calculations and rounding." },
             { label: "Transformations", desc: "Solve complex data transformation problems." },
           ].map(item => (
             <div key={item.label} className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <h4 className="font-black text-indigo-600 mb-2 uppercase tracking-widest text-xs">{item.label}</h4>
                <p className="text-sm font-bold text-zinc-600">{item.desc}</p>
             </div>
           ))}
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-4">
        <h4 className="font-black text-indigo-900 uppercase tracking-widest text-xs mb-2">Chapter Guide</h4>
        <ul className="text-xs font-bold text-zinc-500 space-y-2">
           <li>04:02:09 Set Operators</li>
           <li>04:47:41 SQL Functions</li>
           <li>04:52:58 String Functions</li>
           <li>05:18:44 Numeric Functions</li>
        </ul>
      </div>
    ),
    resources: [
        { title: "SQL Tutorial (Functions Deep Dive)", url: "https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg", type: "video" }
    ]
  },
  {
    day: 17,
    title: 'SQL Date Functions, NULL Handling & Logic',
    category: 'Data',
    preview: '“Transform messy data into clean insights with SQL’s most powerful functions.”',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 17: SQL Date Functions & Advanced Logic 🔮</h1>
        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h2 className="text-2xl font-black mb-6">Learning Objectives</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-zinc-600">
              <p>• Perform sophisticated date calculations</p>
              <p>• Handle NULL values correctly</p>
              <p>• Build complex conditional logic with CASE</p>
              <p>• Use aggregate functions for summarization</p>
           </div>
        </section>
        <section className="bg-indigo-900 rounded-[2.5rem] p-10 text-white">
           <h3 className="font-black text-xs uppercase tracking-[0.2em] text-indigo-400 mb-4">Core Chapters</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                 <p className="font-mono text-[10px] opacity-60">05:22:48</p>
                 <p className="font-black text-xs">Date Functions</p>
              </div>
              <div>
                 <p className="font-mono text-[10px] opacity-60">06:59:06</p>
                 <p className="font-black text-xs">NULL Handling</p>
              </div>
              <div>
                 <p className="font-mono text-[10px] opacity-60">08:07:50</p>
                 <p className="font-black text-xs">CASE Logic</p>
              </div>
              <div>
                 <p className="font-mono text-[10px] opacity-60">08:43:36</p>
                 <p className="font-black text-xs">Aggregates</p>
              </div>
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: "SQL Tutorial (Date & Logic)", url: "https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg", type: "video" }
    ]
  },
  {
    day: 18,
    title: 'Excel Fundamentals for PMs',
    category: 'Data',
    preview: '“Excel is the PM’s Swiss Army knife — from quick analysis to complex models.”',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 18: Excel Fundamentals for PMs 📈</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
              <h3 className="text-xl font-black text-emerald-900 mb-4">Quick Analysis</h3>
              <ul className="space-y-2 text-sm font-bold text-emerald-700">
                 <li>• week-over-week growth</li>
                 <li>• feature adoption rates</li>
                 <li>• metrics without waiting for dashboards</li>
              </ul>
           </div>
           <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
              <h3 className="text-xl font-black text-blue-900 mb-4">Data Manipulation</h3>
              <ul className="space-y-2 text-sm font-bold text-blue-700">
                 <li>• Clean messy CSV exports</li>
                 <li>• Combine data from multiple sources</li>
                 <li>• Transform data for presentations</li>
              </ul>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-4">
        <h4 className="font-black text-indigo-900 uppercase tracking-widest text-xs mb-2">Tutorial Chapters</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
           {['Welcome (0:00)', 'Excel Setup (0:11)', 'Worksheets (0:22)', 'Ribbon (0:52)', 'Formulas (1:06)', 'Lookups (2:21)'].map(c => (
             <div key={c} className="p-3 bg-white border border-zinc-100 rounded-xl text-[10px] font-black text-center">{c}</div>
           ))}
        </div>
      </div>
    ),
    resources: [
        { title: "Excel Fundamentals", url: "https://youtu.be/pCJ15nGFgVg?si=aqGEbVfcwFuLi7fY", type: "video" }
    ]
  },
  {
    day: 19,
    title: 'Excel Charts, Pivot Tables & Dashboards',
    category: 'Data',
    preview: '“A picture is worth a thousand rows of data.” Transform data into compelling visualizations.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 19: Excel Visualizations & Dashboards 🎨</h1>
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6">Learning Objectives</h2>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-indigo-700">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Create professional charts</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Use sparklines for inline vis</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Format data as Excel Tables</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Build interactive Pivot Tables</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Create complete dashboards</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Present data insights effectively</li>
           </ul>
        </section>
        <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white">
           <h3 className="font-black text-xs uppercase tracking-widest text-indigo-400 mb-6">Course Material</h3>
           <div className="space-y-3 font-mono text-[10px] text-zinc-400">
              <p>3:01:33 - Charts Intro</p>
              <p>3:22:05 - Charts Advanced</p>
              <p>3:51:57 - Tables</p>
              <p>5:33:46 - PivotTable Intro</p>
              <p>6:09:33 - PivotCharts</p>
           </div>
        </div>
      </div>
    ),
    assignment: (
      <div className="space-y-4">
        <h4 className="font-black text-indigo-900">Project #1 - Salary Dashboard</h4>
        <p className="text-sm font-medium text-zinc-600 italic">Build a comprehensive dashboard utilizing Pivot Tables and advanced Charts as shown at 4:40:30 in the tutorial.</p>
      </div>
    ),
    resources: [
        { title: "Excel Charts & Pivot Tables", url: "https://youtu.be/pCJ15nGFgVg?si=aqGEbVfcwFuLi7fY", type: "video" }
    ]
  },
  {
    day: 20,
    title: 'Learn Power BI',
    category: 'Data',
    preview: 'Learn Power BI in Under 3 Hours | Formatting, Visualizations, Dashboards + Full Project.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 20: Learn Power BI 📊</h1>
        <section className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
           <h2 className="text-2xl font-black text-emerald-900 mb-4">Why Power BI for PMs?</h2>
           <p className="text-emerald-800 font-medium leading-relaxed">
             Product managers swim in data. Connecting disparate sources (Mixpanel, Salesforce, SQL) together usually requires manual exports. 
             <strong> Power BI connects directly and refreshes automatically.</strong>
           </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { title: 'Data modeling', desc: 'Define relationships between different data sources (Demographics → Behavioral).' },
             { title: 'DAX formulas', desc: 'Enable custom calculations like CLV, activation rates, and multi-condition metrics.' },
             { title: 'Time intelligence', desc: 'Built-in functions for WoW/YoY comparisons without tedious math.' },
             { title: 'Drill-down capabilities', desc: 'Let stakeholders click through high-level summaries into detailed views.' },
           ].map(item => (
             <div key={item.title} className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-black text-zinc-900 mb-2">{item.title}</h4>
                <p className="text-sm text-zinc-500 font-medium">{item.desc}</p>
             </div>
           ))}
        </section>

        <section className="bg-zinc-950 p-10 rounded-[3rem] text-white overflow-hidden relative isolate">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>
           <h3 className="text-xl font-black mb-6">Key Capabilities</h3>
           <ul className="space-y-4 text-sm font-bold text-zinc-400">
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Filtering and slicing for interactive reports</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Parameters for "what-if" scenario analysis</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Row-level security for data privacy</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Automated refresh for near-real-time metrics</li>
           </ul>
        </section>
      </div>
    ),
    resources: [
        { title: "Power BI Full Course", url: "https://youtu.be/l0vQ_VLZTWg?si=Gkh1WYh75MOngmbS", type: "video" }
    ]
  },
  {
    day: 21,
    title: 'Product Analytics & Mixpanel Foundations',
    category: 'Data',
    preview: '“Product analytics dive deeper into how users actually interact with features.” Understand the basics of Mixpanel.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 21: Product Analytics & Mixpanel 📈</h1>
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6">What is Product Analytics?</h2>
           <p className="text-indigo-800 font-medium leading-relaxed">
             Product analytics focuses on tracking user actions and events within your product rather than just page views. 
             Instead of knowing someone visited your dashboard, you know they <strong>created three reports and shared them.</strong>
           </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
              <h3 className="font-black text-lg text-zinc-900 mb-4 uppercase tracking-widest text-xs">Mixpanel Foundation</h3>
              <ul className="space-y-3 text-sm font-bold text-zinc-600">
                 <li>• Event-based tracking (Clicked Button, Invited User)</li>
                 <li>• User profiles (Persistent identity across devices)</li>
                 <li>• Funnels (Multi-step conversion analysis)</li>
                 <li>• Retention reports (Are users coming back?)</li>
              </ul>
           </div>
           <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white">
              <h3 className="font-black text-indigo-400 text-xs uppercase tracking-widest mb-6">Advanced Metrics</h3>
              <ul className="space-y-3 text-sm font-bold">
                 <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Cohort analysis over time</li>
                 <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Flow reports (Organic user paths)</li>
                 <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Impact reports (Tie usage to business)</li>
                 <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Experimentation framework (A/B testing)</li>
              </ul>
           </div>
        </section>

        <section className="p-10 bg-zinc-50 rounded-[3.5rem] border border-zinc-200">
           <h2 className="text-2xl font-black text-zinc-900 mb-6">Leading Indicators</h2>
           <p className="text-zinc-500 font-medium">Identifying leading indicators of retention and churn allows you to intervene before users leave.</p>
           <div className="mt-6 p-6 bg-white rounded-2xl shadow-sm border border-zinc-100 italic">
              "Users who activate within the first day might retain at 80% while those who don't might retain at only 20%."
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: "Basics of Mixpanel", url: "https://youtu.be/5O4ST-R5ZVw?si=IN49CzqS5qHexth3", type: "video" }
    ]
  },
  {
    day: 22,
    title: 'Google Analytics 4 & A/B Testing',
    category: 'Data',
    preview: 'Learn GA4 account setup, standard reports, and advanced explorations alongside A/B testing frameworks.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 22: GA4 & A/B Testing 🧪</h1>
        <section className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100">
           <h2 className="text-2xl font-black text-amber-900 mb-6">What is A/B Testing?</h2>
           <p className="text-amber-800 font-medium leading-relaxed">
             A/B testing is a controlled experiment where you show different variants (A/B) to randomly assigned groups 
             and measure which performs better against predetermined success metrics.
           </p>
        </section>

        <section className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-900">Successful A/B Testing Framework</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-zinc-100 rounded-2xl">
                 <h4 className="font-black text-zinc-900 mb-2">1. Clear Hypothesis</h4>
                 <p className="text-xs text-zinc-500 font-bold italic">"Reducing checkout from 5 steps to 3 will increase conversion by 10%."</p>
              </div>
              <div className="p-6 bg-white border border-zinc-100 rounded-2xl">
                 <h4 className="font-black text-zinc-900 mb-2">2. Success Metrics</h4>
                 <p className="text-xs text-zinc-500 font-bold italic">Primary (Conversion Rate) + Guardrail metrics (Error Rate).</p>
              </div>
              <div className="p-6 bg-white border border-zinc-100 rounded-2xl">
                 <h4 className="font-black text-zinc-900 mb-2">3. Sample Size</h4>
                 <p className="text-xs text-zinc-500 font-bold italic">Determine duration and volume for statistical significance.</p>
              </div>
           </div>
        </section>

        <section className="p-10 bg-zinc-900 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-6">Google Analytics 4 for PMs</h2>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm font-bold text-zinc-400">
              <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-indigo-400" /> Tracking user acquisition & attribution</li>
              <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-indigo-400" /> Monitoring product health (Real-time)</li>
              <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-indigo-400" /> Segmenting data by device, location, or user properties</li>
              <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-indigo-400" /> Informing roadmap prioritization based on usage data</li>
           </ul>
        </section>
      </div>
    ),
    resources: [
        { title: "Google Analytics 4 Tutorial", url: "https://youtu.be/hsIP4iH25Wg?si=kahtDEdtF6LY7cTU", type: "video" },
        { title: "A/B Testing with VWO", url: "https://youtu.be/QEqholJ28qI?si=Y7KfY4Sr_eKJUIBn", type: "video" }
    ]
  },
  {
    day: 23,
    title: 'Understanding APIs as a PM',
    category: 'Tech',
    preview: 'APIs are the building blocks of integrations, automation, and extensible products. Communicate clearly with engineering.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 23: Understanding APIs 🔌</h1>
        <section className="bg-cyan-50 p-10 rounded-[3rem] border border-cyan-100">
           <h2 className="text-2xl font-black text-cyan-900 mb-4">Why APIs Matter for PMs</h2>
           <p className="text-cyan-800 font-medium leading-relaxed">
             APIs (Application Programming Interfaces) are how software systems communicate. A solid grasp lets you 
             <strong> unlock value for users through integrations</strong> and reduce dependencies on reinventing functionality internally.
           </p>
        </section>
        <section className="p-8 bg-zinc-50 border border-zinc-200 rounded-3xl">
           <h3 className="font-black text-zinc-900 mb-6">Learning Objectives</h3>
           <ul className="space-y-3 text-sm font-bold text-zinc-600">
              <li>• Explain what APIs are and how they work</li>
              <li>• Identify key API concepts every PM should know</li>
              <li>• Understand API documentation and testing basics</li>
              <li>• Use APIs to inform product strategy and partnerships</li>
           </ul>
        </section>
      </div>
    ),
    resources: [
        { title: "How the Internet Works", url: "https://www.cloudflare.com/en-in/learning/network-layer/how-does-the-internet-work/", type: "article" },
        { title: "API for Product Managers", url: "https://dune-leek-31a.notion.site/API-for-Product-Managers-24abaab379148074abc3f57b062db2bf", type: "article" }
    ]
  },
  {
    day: 24,
    title: 'System Design for Product Managers',
    category: 'Tech',
    preview: 'Building Products That Scale. Knowledge bridges the gap between vision and technical reality.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 24: System Design for PMs 🏗️</h1>
        <section className="bg-zinc-950 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-6">Building Products That Scale</h2>
           <p className="text-zinc-400 font-medium leading-relaxed">
             You don't need to code or architect systems yourself. But understanding how systems work transforms you 
             from someone who requests features into someone who <strong>designs feasible, elegant solutions.</strong>
           </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
              <h3 className="font-black text-zinc-900 mb-4">Why PMs Need System Design</h3>
              <ul className="space-y-3 text-sm font-bold text-zinc-600">
                 <li>• Making realistic roadmap commitments</li>
                 <li>• Evaluating build versus buy decisions</li>
                 <li>• Designing for scale from the start</li>
                 <li>• Scoping MVPs intelligently</li>
              </ul>
           </div>
           <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
              <h3 className="font-black text-zinc-900 mb-4">Core Concepts</h3>
              <ul className="space-y-3 text-sm font-bold text-zinc-600">
                 <li>• Client-server architecture</li>
                 <li>• Databases & Caching</li>
                 <li>• Load balancing & Microservices</li>
                 <li>• Technical debt and its impacts</li>
              </ul>
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: "System Design for PMs", url: "https://youtu.be/m8Icp_Cid5o?si=u52HzOf12e0cMvyI", type: "video" }
    ]
  },
  {
    day: 25,
    title: 'UI/UX for Product Managers',
    category: 'Design',
    preview: 'Essential UX & UI Concepts + Practical Usability. Build a solid foundation in design principles.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 25: UI/UX for Product Managers 🎨</h1>
        <section className="bg-pink-50 p-10 rounded-[3rem] border border-pink-100">
           <h2 className="text-2xl font-black text-pink-900 mb-6">Learning Objectives</h2>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-pink-700">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Recognize fundamental UX/UI concepts</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Apply design principles in discussions</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Run usability tests</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Use visual design laws to evaluate</li>
           </ul>
        </section>
        <section className="space-y-6">
           <h3 className="text-xl font-black text-zinc-900">Mastering UX/UI</h3>
           <p className="text-zinc-600 font-medium">PMs act as the bridge between user needs and design execution. Understanding cognitive laws (like Hick’s Law or Fitts’s Law) is crucial.</p>
        </section>
      </div>
    ),
    resources: [
        { title: "UX Design Essentials Course", url: "https://youtu.be/QJBP2uy8LCU?si=Gla6MA8amS8vYBdd", type: "video" },
        { title: "Usability Testing for UX", url: "https://youtu.be/nYC JTea1AUQ?si=8RcveOgK6wybwlk4", type: "video" },
        { title: "Basics of UI/UX", url: "https://youtu.be/ziQEqGZB8GE?si=gdeMwyRMYEwOmBOL", type: "video" },
        { title: "12 UI/UX Laws", url: "https://youtu.be/wELFwQmtnvo?si=t7AEn1xVBoB8lPTm", type: "video" }
    ]
  },
  {
    day: 26,
    title: 'Foundations of Agile & Scrum',
    category: 'Strategy',
    preview: 'Iterative delivery, and continuous learning. Understand the roles, ceremonies, and artifacts in Scrum.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 26: Agile & Scrum Foundations 🏃‍♂️</h1>
        <section className="bg-indigo-950 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-6">The Agile Mindset: Four Core Values</h2>
           <ul className="space-y-6">
              <li>
                 <p className="text-indigo-400 font-black uppercase text-xs">Individuals and interactions over processes and tools</p>
                 <p className="text-sm font-medium text-zinc-400">Spending time with your team, having real conversations.</p>
              </li>
              <li>
                 <p className="text-pink-400 font-black uppercase text-xs">Working software over comprehensive documentation</p>
                 <p className="text-sm font-medium text-zinc-400">Delivering value to customers, not just writing perfect PRDs.</p>
              </li>
              <li>
                 <p className="text-emerald-400 font-black uppercase text-xs">Customer collaboration over contract negotiation</p>
                 <p className="text-sm font-medium text-zinc-400">Involving customers throughout development.</p>
              </li>
              <li>
                 <p className="text-amber-400 font-black uppercase text-xs">Responding to change over following a plan</p>
                 <p className="text-sm font-medium text-zinc-400">Adapting roadmaps based on new information.</p>
              </li>
           </ul>
        </section>

        <section>
           <h2 className="text-2xl font-black text-zinc-900 mb-6">The Three Scrum Roles</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                 <h4 className="font-black text-zinc-900 mb-2">Product Owner</h4>
                 <p className="text-xs text-zinc-500 font-bold italic">Represents the customer, owns the product backlog. In many orgs, this IS the PM.</p>
              </div>
              <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                 <h4 className="font-black text-zinc-900 mb-2">Scrum Master</h4>
                 <p className="text-xs text-zinc-500 font-bold italic">Facilitates the process, removes impediments. Typically not the PM.</p>
              </div>
              <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                 <h4 className="font-black text-zinc-900 mb-2">Development Team</h4>
                 <p className="text-xs text-zinc-500 font-bold italic">Cross-functional engineers, designers, and QA building the product increment.</p>
              </div>
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: "Agile & Scrum Intro Video", url: "https://youtu.be/WDAQq5vCMME?si=FaBFP9KwcKDsviFh", type: "video" },
        { title: "Jira Beginner Course", url: "https://youtu.be/NDVSMlVYxm8?si=GptGyKBB Y7AlhEZ8", type: "video" },
        { title: "Prioritization Frameworks", url: "https://www.atlassian.com/agile/product-management/prioritization-framework", type: "article" }
    ]
  },
  {
    day: 27,
    title: 'Cloud Computing for PMs',
    category: 'Tech',
    preview: 'A paradigm shift that enables capabilities, business models, and product strategies impossible in the pre-cloud era.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 27: Cloud Computing for PMs ☁️</h1>
        <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
           <h2 className="text-2xl font-black text-blue-900 mb-4">What Is Cloud Computing?</h2>
           <p className="text-blue-800 font-medium leading-relaxed">
             Accessing computing resources—servers, storage, databases—over the internet rather than owning physical infrastructure. 
             <strong> Rent resources on-demand, paying only for what you use.</strong>
           </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { title: 'IaaS', full: 'Infrastructure as a Service', ex: 'Amazon EC2', desc: 'Raw resources. Maximum control.' },
             { title: 'PaaS', full: 'Platform as a Service', ex: 'Heroku', desc: 'Managed platforms for code execution.' },
             { title: 'SaaS', full: 'Software as a Service', ex: 'Salesforce', desc: 'Complete applications over internet.' },
           ].map(item => (
             <div key={item.title} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-4">{item.title}</span>
                <h3 className="font-black text-zinc-900 mb-1">{item.full}</h3>
                <p className="text-[10px] font-black text-zinc-400 mb-4">{item.ex}</p>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </section>

        <section className="bg-zinc-950 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-8">Cloud Economics</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                 <h4 className="font-black text-indigo-400 mb-2">Pay-as-you-go</h4>
                 <p className="text-sm font-medium text-zinc-400">Eliminates upfront capital investment and aligns costs with usage.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                 <h4 className="font-black text-emerald-400 mb-2">Elastic scaling</h4>
                 <p className="text-sm font-medium text-zinc-400">Traffic spikes don't crash your product; the cloud adds servers automatically.</p>
              </div>
           </div>
        </section>
      </div>
    )
  },
  {
    day: 28,
    title: 'What is AI, ML and DL?',
    category: 'AI',
    preview: 'Understand the hierarchy of Artificial Intelligence. Machine learning teaches systems to think and understand like humans.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 28: AI, ML, and Deep Learning 🤖</h1>
        
        <section className="flex justify-center p-10 bg-zinc-50 rounded-[3rem] border border-zinc-200">
           <div className="relative w-full max-w-sm aspect-square bg-blue-600 rounded-full flex items-center justify-center p-4">
              <span className="absolute top-8 text-white font-black text-sm uppercase tracking-widest">AI</span>
              <div className="w-3/4 h-3/4 bg-emerald-500 rounded-full flex items-center justify-center p-4">
                 <span className="absolute top-20 text-white font-black text-xs uppercase tracking-widest">Machine Learning</span>
                 <div className="w-1/2 h-1/2 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-black text-[8px] uppercase tracking-widest text-center">Deep Learning</span>
                 </div>
              </div>
           </div>
        </section>

        <section className="space-y-6 text-sm font-medium text-zinc-600">
           <div>
              <h3 className="text-lg font-black text-zinc-900">1. Artificial Intelligence (AI) - The Broad Goal</h3>
              <p>The science and engineering of making intelligent machines. The goal is to simulate human intelligence to perform tasks like problem-solving.</p>
           </div>
           <div>
              <h3 className="text-lg font-black text-zinc-900">2. Machine Learning (ML) - The Modern Method</h3>
              <p>A subset of AI where algorithms learn patterns from data and improve automatically, without being explicitly programmed for every scenario.</p>
           </div>
           <div>
              <h3 className="text-lg font-black text-zinc-900">3. Deep Learning (DL) - Specialized ML</h3>
              <p>Uses Artificial Neural Networks with multiple processing layers (hence "deep") to learn complex patterns directly from large amounts of raw, unstructured data.</p>
           </div>
        </section>

        <section className="bg-indigo-900 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-8">Why should a PM learn this?</h2>
           <ul className="space-y-4 font-bold text-indigo-100">
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> Feasibility Assessment: Is the problem a good fit for an ML solution?</li>
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> Data Strategy: ML models are powered by data quality & volume.</li>
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> Collaboration: Speak the language of Data Scientists/Engineers.</li>
              <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-indigo-400" /> Ethics: Understand responsible AI and bias mitigation.</li>
           </ul>
        </section>
      </div>
    )
  },
  {
    day: 29,
    title: 'Large Language Models (LLM)',
    category: 'AI',
    preview: 'Large Language Model (LLM) is fundamentally a neural network designed to be a highly sophisticated predictive system for text.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 29: Large Language Models (LLM) 📚</h1>
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6">What is an LLM?</h2>
           <div className="space-y-4 font-medium text-indigo-800">
              <p><strong>1. Statistical Token Simulator:</strong> Trained to model the statistical relationships of how tokens follow each other in a sequence.</p>
              <p><strong>2. Internet Document Simulator:</strong> Can generate token sequences that statistically resemble documents found on the internet (Lossy compression of the internet).</p>
              <p><strong>3. An Assistant:</strong> Post-training stages transform base models into knowledgeable assistants that engage in conversation.</p>
           </div>
        </section>

        <section className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
           <h2 className="text-2xl font-black text-zinc-900 mb-6">LLM Characteristics & PM Implications</h2>
           <div className="space-y-6">
              {[
                { label: 'Stochastic', desc: 'Rely on probability. User must check and verify the output.' },
                { label: 'Hallucinations', desc: 'Prone to fabricating info. Safeguards like web search are needed.' },
                { label: 'Vague Knowledge', desc: 'Knowledge is a vague recollection; use context window as "working memory".' },
                { label: 'Swiss Cheese Capability', desc: 'Brilliant in one domain but fail randomly at simple tasks like counting.' },
              ].map(item => (
                <div key={item.label} className="flex gap-6 items-start">
                   <div className="px-3 py-1 bg-zinc-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest shrink-0 mt-1">{item.label}</div>
                   <p className="text-sm font-bold text-zinc-600">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="bg-zinc-950 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-8">Stages of Building an LLM</h2>
           <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1 p-6 bg-white/5 rounded-2xl border border-white/10">
                 <h4 className="font-black text-xs uppercase tracking-[0.2em] text-indigo-400 mb-4">1. Pretraining</h4>
                 <p className="text-xs text-zinc-400 font-medium">Internalizing statistical patterns from massive text. Takes ~3 months.</p>
              </div>
              <div className="flex-1 p-6 bg-white/5 rounded-2xl border border-white/10">
                 <h4 className="font-black text-xs uppercase tracking-[0.2em] text-emerald-400 mb-4">2. Post-training (SFT)</h4>
                 <p className="text-xs text-zinc-400 font-medium">Supervised Fine-Tuning. Teaches persona and conversational abilities.</p>
              </div>
              <div className="flex-1 p-6 bg-white/5 rounded-2xl border border-white/10">
                 <h4 className="font-black text-xs uppercase tracking-[0.2em] text-red-400 mb-4">3. Reinforcement Learning</h4>
                 <p className="text-xs text-zinc-400 font-medium">Refining problem-solving via Guess & Check (Trial and Error).</p>
              </div>
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: "Deep Dive into LLMs like ChatGPT", url: "https://youtu.be/7xTGNNLPyMI?si=_FGxNCEjJcvyxdAz", type: "video" }
    ]
  },
  {
    day: 30,
    title: 'Prompt Engineering for PMs',
    category: 'AI',
    preview: 'Learn how to write effective prompts so that LLMs return useful, reliable, and actionable outputs.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 30: Prompt Engineering ✍️</h1>
        <section className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100">
           <h2 className="text-2xl font-black text-orange-900 mb-4">Practical Prompting</h2>
           <p className="text-orange-800 font-medium leading-relaxed italic">
             "It’s not about memorizing commands — it’s about clear thinking expressed as structured instructions."
           </p>
        </section>
        <section className="p-8 bg-zinc-50 border border-zinc-200 rounded-3xl">
           <h3 className="font-black text-zinc-900 mb-6 uppercase tracking-widest text-xs">For PMs, prompt engineering accelerates:</h3>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Ideation', 'Specification writing', 'Data interpretation', 'User research synthesis', 'Competitive analysis'].map(item => (
                <div key={item} className="p-4 bg-white rounded-xl font-bold text-xs shadow-sm border border-zinc-100">{item}</div>
              ))}
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: "Prompting 101 Video", url: "https://youtu.be/ysPbXH0LpIE?si=5Riv7IB9ezFAt_Kc", type: "video" },
        { title: "AWS Prompt Engineering Foundation", url: "https://share.google/FdZPEVTPVCkN85d33", type: "article" }
    ]
  },
  {
    day: 31,
    title: 'Context Engineering',
    category: 'AI',
    preview: 'The natural progression of prompt engineering. Managing tokens (information) during LLM inference.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 31: Context Engineering 🧠</h1>
        <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
           <h2 className="text-2xl font-black text-blue-900 mb-6">RAM for LLMs</h2>
           <p className="text-blue-800 font-medium leading-relaxed">
             LLMs are like a new kind of operating system. The LLM is like the CPU and its <strong>context window is like the RAM</strong>. 
             Context engineering is curating what fits into this limited space.
           </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Write Context', desc: 'Saving info outside context (Scratchpad/Memories).' },
             { label: 'Select Context', desc: 'Choosing what past info to reintroduce each turn.' },
             { label: 'Compress Context', desc: 'Summarizing messages to stay within token limits.' },
             { label: 'Isolate Context', desc: 'Modularizing across sub-agents (Team of Agents).' },
           ].map(item => (
             <div key={item.label} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <h4 className="font-black text-indigo-600 mb-2 uppercase tracking-widest text-[10px]">{item.label}</h4>
                <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </section>

        <section className="p-10 bg-zinc-900 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-6">Why this matters: Context Rot</h2>
           <p className="text-zinc-400 font-medium">As the number of tokens in the context window increases, the model’s ability to accurately recall information decreases. Every new token depletes the limited "attention budget".</p>
        </section>
      </div>
    )
  },
  {
    day: 32,
    title: 'Retrieval Augmented Generation (RAG)',
    category: 'AI',
    preview: 'One of the most powerful applications enabled by LLMs is sophisticated question-answering (Q&A) chatbots.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 32: Retrieval Augmented Generation (RAG) 🔗</h1>
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6">The Three Components of RAG</h2>
           <div className="space-y-8">
              <div className="flex gap-6 items-start">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-indigo-600 shrink-0 shadow-sm">R</div>
                 <div>
                    <h4 className="font-black text-zinc-900">Retrieval</h4>
                    <p className="text-sm text-zinc-500 font-medium">System looks up internal documents or knowledge bases.</p>
                 </div>
              </div>
              <div className="flex gap-6 items-start">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-indigo-600 shrink-0 shadow-sm">A</div>
                 <div>
                    <h4 className="font-black text-zinc-900">Augmenting</h4>
                    <p className="text-sm text-zinc-500 font-medium">Retrieved info improves the user’s prompt before sending to LLM.</p>
                 </div>
              </div>
              <div className="flex gap-6 items-start">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-indigo-600 shrink-0 shadow-sm">G</div>
                 <div>
                    <h4 className="font-black text-zinc-900">Generation</h4>
                    <p className="text-sm text-zinc-500 font-medium">LLM generates a response based on the provided context.</p>
                 </div>
              </div>
           </div>
        </section>

        <section>
          <h2 className="text-2xl font-black text-zinc-900 mb-8 underline decoration-indigo-600 underline-offset-8">Data Preparation Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
                <h4 className="font-black text-indigo-600 mb-4 uppercase tracking-widest text-xs">1. Chunking</h4>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">Breaking down large documents into smaller, focused pieces to solve the precision problem.</p>
             </div>
             <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
                <h4 className="font-black text-emerald-600 mb-4 uppercase tracking-widest text-xs">2. Embeddings</h4>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">Converting text chunks into numerical vectors representing semantic meaning.</p>
             </div>
             <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
                <h4 className="font-black text-red-600 mb-4 uppercase tracking-widest text-xs">3. Vector Database</h4>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">Efficiently storing and searching mathematical vectors (e.g., Chroma, Pinecone).</p>
             </div>
          </div>
        </section>
      </div>
    )
  },
  {
    day: 33,
    title: 'Model Context Protocol (MCP)',
    category: 'AI',
    preview: 'An open-source standard for connecting AI applications to external systems.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 33: Model Context Protocol (MCP) 🔌</h1>
        <section className="bg-zinc-900 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-6">The USB-C for AI</h2>
           <p className="text-zinc-400 font-medium leading-relaxed max-w-2xl">
             Think of MCP like a USB-C port. Just as USB-C provides a standardized way to connect electronic devices, 
             MCP provides a standardized way to connect <strong>AI applications to external systems</strong> (Databases, Tools, workflows).
           </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { title: 'MCP Server', desc: 'Lightweight programs that expose specific capabilities (tools/resources).' },
             { title: 'MCP Client', desc: 'Job is to find resources and tools from the server.' },
             { title: 'Host', desc: 'LLM application (e.g. Claude Desktop) that stores and maintains clients.' },
           ].map(item => (
             <div key={item.title} className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <h3 className="font-black text-lg text-zinc-900 mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </section>
      </div>
    )
  },
  {
    day: 34,
    title: 'Introduction to Agent Workflow',
    category: 'AI',
    preview: 'Agentic workflows are designed to more closely mimic complex human problem-solving by involving multiple discrete stages.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 34: Introduction to Agent Workflow 🤖</h1>
        <section className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
           <h2 className="text-2xl font-black text-emerald-900 mb-6">What Is an Agentic AI Workflow?</h2>
           <p className="text-emerald-800 font-medium leading-relaxed">
             An AI system that executes a <strong>series of steps</strong> iteratively to complete a task. 
             Includes planning, researching, synthesizing, reviewing, and revising.
           </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-zinc-900 mb-6 uppercase tracking-widest">Degrees of Autonomy</h2>
          <div className="space-y-4">
             <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm flex items-center gap-6">
                <div className="w-12 h-12 bg-zinc-900 text-white flex items-center justify-center font-black rounded-xl shrink-0">1</div>
                <div>
                   <h4 className="font-black text-zinc-900">Less Autonomous Agents</h4>
                   <p className="text-sm text-zinc-500 font-medium">Steps strictly predefined; tools are hard-coded.</p>
                </div>
             </div>
             <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm flex items-center gap-6">
                <div className="w-12 h-12 bg-zinc-900 text-white flex items-center justify-center font-black rounded-xl shrink-0">2</div>
                <div>
                   <h4 className="font-black text-zinc-900">Semi-Autonomous Agents</h4>
                   <p className="text-sm text-zinc-500 font-medium">AI may decide which tool to use for a given query.</p>
                </div>
             </div>
             <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm flex items-center gap-6">
                <div className="w-12 h-12 bg-zinc-900 text-white flex items-center justify-center font-black rounded-xl shrink-0">3</div>
                <div>
                   <h4 className="font-black text-zinc-900">Highly Autonomous Agents</h4>
                   <p className="text-sm text-zinc-500 font-medium">Plans and sequences steps dynamically; generates new functions.</p>
                </div>
             </div>
          </div>
        </section>
      </div>
    ),
    resources: [
        { title: "Agentic AI Course", url: "https://www.deeplearning.ai/courses/agentic-ai/", type: "article" }
    ]
  },
  {
    day: 35,
    title: 'AI Agents for Product Managers',
    category: 'AI',
    preview: 'Artificial intelligence is shifting from tools that respond to prompts to agents that accomplish complex tasks autonomously.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 35: AI Agents for PMs 🦾</h1>
        <section className="bg-indigo-900 p-10 rounded-[3rem] text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 p-8 opacity-10"><Zap className="w-48 h-48" /></div>
           <h2 className="text-2xl font-black mb-6">Why Building Them Matters</h2>
           <p className="text-indigo-100 text-lg font-medium leading-relaxed">
             Understanding AI agents—and knowing how to build them using platforms like n8n—is strategically essential for PMs who want to operate more efficiently.
           </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-4">
              <h4 className="font-black text-xs uppercase tracking-widest text-indigo-600">Enter n8n</h4>
              <p className="text-sm font-bold text-zinc-600">n8n is a visual workflow automation platform that makes building AI agents accessible to non-engineers.</p>
              <ul className="text-xs space-y-2 text-zinc-400 font-bold">
                 <li>• Visual workflow editor (Drag & Drop)</li>
                 <li>• AI model integration (Claude/GPT-4)</li>
                 <li>• Hundreds of pre-built tool nodes</li>
                 <li>• Conditional logic & branching</li>
              </ul>
           </div>
           <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-200">
              <h4 className="font-black text-xs uppercase tracking-widest text-zinc-400 mb-4">Other Platforms</h4>
              <ul className="space-y-3 text-xs font-bold text-zinc-600">
                 <li>• <strong>Zapier/Make:</strong> Extremely accessible automation.</li>
                 <li>• <strong>LangChain:</strong> Powerful developer framework.</li>
                 <li>• <strong>Voiceflow:</strong> Conversational design tools.</li>
                 <li>• <strong>LlamaIndex:</strong> Focused on private data RAG.</li>
              </ul>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-4">
        <h4 className="font-black text-indigo-900">Task: Build an AI Agent</h4>
        <p className="text-sm font-medium text-zinc-600 italic">Build an AI agent that actually solves a problem you face using the tools introduced today.</p>
        <a href="https://youtu.be/ZHH3sr234zY?si=5qMS4pLlfl2gYaDs" target="_blank" rel="noreferrer" className="block mt-4 text-xs font-black text-indigo-600 underline">Watch n8n Tutorial</a>
      </div>
    )
  },
  {
    day: 36,
    title: 'Building Proof of Work',
    category: 'Foundations',
    preview: 'Why Aspiring PMs Must Ship and How to Do It With No-Code Tools. “Hiring managers prioritize demonstrated ability over potential.”',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 36: Building Proof of Work 🏗️</h1>
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <blockquote className="text-xl font-black text-indigo-900 italic">
             “The gap between those who get PM roles and those who don't often comes down to one thing: proof of work.”
           </blockquote>
        </section>

        <section className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-900">The Modern No-Code Stack</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Lovable', desc: 'Build complete web apps through conversational prompts.' },
                { name: 'Replit', desc: 'AI-powered dev environment for web apps & APIs.' },
                { name: 'Claude', desc: 'Generate complete apps in interactive artifacts.' },
                { name: 'n8n', desc: 'Visual workflow automation & agents without code.' },
                { name: 'Vercel', desc: 'Deploy web apps with zero configuration.' },
                { name: 'Bolt.new', desc: 'Create apps from descriptions including backend.' },
              ].map(tool => (
                <div key={tool.name} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                   <h4 className="font-black text-indigo-600 mb-1">{tool.name}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{tool.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="p-10 bg-zinc-900 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-6">Ship Small and Ship Often</h2>
           <p className="text-zinc-400 font-medium mb-10 leading-relaxed">Better to ship ten small projects than spend six months on one ambitious product you never finish.</p>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Start with problems YOU experience</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Aim to ship within a week (5-10 hours work)</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Build in public & gather 10 real users</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Document your process and learnings</li>
           </ul>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-4">
        <h4 className="font-black text-indigo-900">Project Idea: Personal Dashboard</h4>
        <p className="text-sm font-medium text-zinc-600 italic">"A simple web dashboard where users log daily habits, rate mood, track sleep, and see trends over time."</p>
      </div>
    )
  },
  {
    day: 37,
    title: 'Product Teardowns',
    category: 'Foundations',
    preview: 'One of the most credible ways to demonstrate product thinking, analytical rigor, and strategic insight.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 37: Product Teardowns 🛠️</h1>
        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h2 className="text-2xl font-black text-zinc-900 mb-6">What Is a Product Teardown?</h2>
           <p className="text-zinc-600 font-medium leading-relaxed">
             A structured analysis where you <strong>reverse-engineer a digital product</strong> to understand how it works, why it was built that way, 
             and what strategic decisions underlie its design and business model.
           </p>
        </section>

        <section>
          <h2 className="text-2xl font-black text-zinc-900 mb-8 underline decoration-indigo-600 underline-offset-8">Core PM Skills Gained</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <h4 className="font-black mb-2">Product Sense</h4>
                <p className="text-sm text-zinc-500 font-medium">Interpret why features exist and what trade-offs were made.</p>
             </div>
             <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <h4 className="font-black mb-2">User Empathy</h4>
                <p className="text-sm text-zinc-500 font-medium">Map user personas, pains, and motivations behind decisions.</p>
             </div>
             <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <h4 className="font-black mb-2">Strategic Thinking</h4>
                <p className="text-sm text-zinc-500 font-medium">Connect business goals (monetization) to product decisions.</p>
             </div>
             <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <h4 className="font-black mb-2">Communication</h4>
                <p className="text-sm text-zinc-500 font-medium">Articulate insights clearly — exactly what employers look for.</p>
             </div>
          </div>
        </section>
      </div>
    ),
    resources: [
        { title: "What is a Product Teardown?", url: "https://hellopm.co/what-is-a-product-teardown/", type: "article" },
        { title: "Example Case Studies", url: "https://thestare.in/case-studies", type: "article" }
    ]
  },
  {
    day: 38,
    title: 'Startup Case Study',
    category: 'Foundations',
    preview: 'Hiring managers don’t care about fancy slides — they care whether you can identify real problems, make trade-offs, and think in metrics.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 38: Startup Case Study 🚀</h1>
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6">1. Pick the Right Startup</h2>
           <ul className="space-y-4 text-sm font-bold text-indigo-700">
              <li className="flex gap-2"><CheckCircle className="w-5 h-5" /> Product is live and usable</li>
              <li className="flex gap-2"><CheckCircle className="w-5 h-5" /> Problem space is clear</li>
              <li className="flex gap-2"><CheckCircle className="w-5 h-5" /> You can observe gaps or missed opportunities</li>
           </ul>
        </section>

        <section className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-900">Process to Follow</h2>
           <div className="space-y-4">
              <div className="p-6 bg-zinc-50 rounded-2xl">
                 <h4 className="font-black mb-1">Define the Scope</h4>
                 <p className="text-xs font-bold text-zinc-500 italic">Pick ONE clear focus: Onboarding, Retention, or a Single core feature.</p>
              </div>
              <div className="p-6 bg-zinc-50 rounded-2xl">
                 <h4 className="font-black mb-1">Identify 1–2 High-Impact Problems</h4>
                 <p className="text-xs font-bold text-zinc-500 italic">Good: "Users reach dashboard but don’t understand what to do next."</p>
              </div>
              <div className="p-6 bg-zinc-50 rounded-2xl">
                 <h4 className="font-black mb-1">Define Success Metrics</h4>
                 <p className="text-xs font-bold text-zinc-500 italic">Primary metric (e.g., activation rate) + Guardrail metrics.</p>
              </div>
           </div>
        </section>

        <section className="p-10 bg-zinc-950 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-8 text-indigo-400 uppercase tracking-widest text-sm">Outreach Message Template</h2>
           <div className="p-8 bg-white/5 rounded-3xl border border-white/10 font-mono text-[10px] text-zinc-400">
              <p>Hi [Name],</p>
              <br/>
              <p>I’ve been using [Product Name] and recently did a short product case study on it, focused on [specific area: onboarding / activation / retention].</p>
              <br/>
              <p>I noticed [1 concrete insight or problem], and proposed a solution that could potentially impact [metric]. I’m not asking for anything — just wanted to share.</p>
              <br/>
              <p>Here’s the link: [Notion / PDF]</p>
           </div>
        </section>
      </div>
    )
  },
  {
    day: 39,
    title: 'Building a Strong PM Portfolio',
    category: 'Foundations',
    preview: 'Showcases hands-on proof of work through real and hypothetical product case studies.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 39: Building a Strong PM Portfolio 📂</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { title: 'Case Studies & Projects', desc: 'Product teardowns, startup analyses, and solution proposals.' },
             { title: 'Certifications', desc: 'Validating foundational knowledge in strategy and data analysis.' },
             { title: 'Testimonials', desc: 'Feedback from founders or managers highlighting problem-solving ability.' },
             { title: 'Work Experience', desc: 'Collaboration with cross-functional teams and real-world challenges.' },
           ].map(item => (
             <div key={item.title} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
                <h4 className="font-black text-indigo-600 mb-2 uppercase tracking-widest text-[10px]">{item.title}</h4>
                <p className="text-sm font-bold text-zinc-600 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </section>
        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h3 className="font-black text-zinc-900 mb-4 uppercase tracking-widest text-xs">Contact Details</h3>
           <ul className="space-y-4 text-sm font-bold text-zinc-600">
              <li className="flex items-center gap-3">LinkedIn: Professional profile for networking.</li>
              <li className="flex items-center gap-3">Email: Direct communication for opportunities.</li>
              <li className="flex items-center gap-3">Phone: For interview coordination and follow-ups.</li>
           </ul>
        </section>
      </div>
    )
  },
  {
    day: 40,
    title: 'Building CV and LinkedIn Optimization',
    category: 'Foundations',
    preview: 'Check ATS score and ensure to keep it above 85. Learn how to optimize your LinkedIn using the Recruiter mindset.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 40: CV & LinkedIn Optimization 📄</h1>
        <section className="bg-indigo-900 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-6">LinkedIn Analysis Structure</h2>
           <ul className="space-y-6">
              <li>
                 <p className="text-indigo-400 font-black uppercase text-xs">Step 1: Headline Analysis</p>
                 <p className="text-sm font-medium text-zinc-400">Evaluate keyword density & role clarity (3 rewritten headlines).</p>
              </li>
              <li>
                 <p className="text-pink-400 font-black uppercase text-xs">Step 2: About Section</p>
                 <p className="text-sm font-medium text-zinc-400">First 2 lines, role clarity, and value proposition.</p>
              </li>
              <li>
                 <p className="text-emerald-400 font-black uppercase text-xs">Step 3: Experience Section</p>
                 <p className="text-sm font-medium text-zinc-400">Action vs responsibility dumping using Context → Action → Outcome → Metric.</p>
              </li>
           </ul>
        </section>
        <section className="p-8 bg-zinc-50 border border-zinc-200 rounded-3xl">
           <p className="text-sm font-black text-zinc-900 mb-4">Check ATS score here: <a href="https://resumeworded.com/" target="_blank" rel="noreferrer" className="text-indigo-600 underline">resumeworded.com</a></p>
           <p className="text-sm font-black text-zinc-900">Refer this template to build your cv: <a href="https://file.notion.so/f/f/3c4f9e1f-65a2-4b8b-9844-1b0dc047962e/25dc5412-8920-4d3f-88a8-17db447517e3/The_Noob_Pm-_Cv_templates.pdf" target="_blank" rel="noreferrer" className="text-indigo-600 underline">Notion Templates</a></p>
        </section>
      </div>
    )
  },
  {
    day: 41,
    title: 'Applying to Jobs',
    category: 'Foundations',
    preview: 'Platforms to apply for PM jobs and how to ask for referrals effectively.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 41: Applying to Jobs 💼</h1>
        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h2 className="text-2xl font-black text-zinc-900 mb-6">Top Platforms</h2>
           <div className="flex flex-wrap gap-3">
              {['Naukri', 'LinkedIn', 'Hirist', 'Wellfound', 'Glassdoor', 'IIM jobs', 'Instahyre', 'Ycombinator'].map(item => (
                <span key={item} className="px-6 py-3 bg-white border border-zinc-100 rounded-2xl font-black text-xs shadow-sm">{item}</span>
              ))}
           </div>
        </section>

        <section className="bg-zinc-950 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-8">How to ask for a referral</h2>
           <div className="p-8 bg-white/5 rounded-3xl border border-white/10 font-mono text-[10px] text-zinc-400">
              <p>Hi [Name],</p>
              <br/>
              <p>I recently came across the [Position Name] role at [Company Name], and it aligns perfectly with my skills in [skills]. Additionally, my achievement of [achievement] demonstrates my ability to contribute effectively.</p>
              <br/>
              <p>I’d truly appreciate your support with a referral. Please let me know if you need my resume.</p>
           </div>
        </section>
      </div>
    )
  },
  {
    day: 42,
    title: 'Case Study Interviews',
    category: 'Foundations',
    preview: 'Practice real-world interview prompts. Learn what is evaluated during Case rounds.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 42: Case Study Interviews 🎤</h1>
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6">Round One Evaluation</h2>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-indigo-700">
              <li>1. Depth of analysis</li>
              <li>2. Assumptions & reasoning</li>
              <li>3. Prioritisation</li>
              <li>4. Clarity of communication</li>
              <li>5. Metrics & impact</li>
           </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black text-zinc-900 mb-8 underline decoration-indigo-600 underline-offset-8">Round Two: Product Sense Practice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               "Design a movie-booking app for elderly users (Flipkart)",
               "Design a Google Pixel tablet for restaurants (Google)",
               "Design a TV remote for older people (Atlassian/Netflix)",
               "Design a water bottle (Atlassian)",
               "Design a car parking system (Google/Atlassian/Meta)",
               "Design a gardening / hobby app (Atlassian/Adobe)",
             ].map(q => (
               <div key={q} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm text-sm font-bold text-zinc-600">{q}</div>
             ))}
          </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <p className="font-black text-indigo-900">{"Practice the prompt: \"Design a movie-booking app for elderly users.\" Follow the structure: User -> Pain Point -> Solution -> Metric."}</p>
        <p className="text-xs font-black text-zinc-400">Get access to 50+ case studies here:</p>
        <a href="https://believed-mist-f1a.notion.site/Assignments-14251b6fbd0e8055830cd5ecf8147313" target="_blank" rel="noreferrer" className="text-sm font-black text-indigo-600 underline">Believed Mist Notion</a>
      </div>
    ),
    resources: [
        { title: "Product Sense Round", url: "https://youtu.be/tlpfb_VsogA?si=VMQtzA2CME3KtR1z", type: "video" }
    ]
  },
  {
    day: 43,
    title: 'Interview Prep: RCA & Guestimates',
    category: 'Foundations',
    preview: 'Drop in average watch time by 30%? Number of tube lights in Bangalore? Master these rounds.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 43: RCA & Guestimates 📉</h1>
        <section className="bg-zinc-950 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-8">Round Three: RCA Practice</h2>
           <ul className="space-y-4 text-sm font-bold text-zinc-400">
              <li>• Drop in average watch time by 30% (Netflix)</li>
              <li>• Sudden revenue drop at Airbnb (Hotstar)</li>
              <li>• Increase in returns at Amazon (Amazon)</li>
              <li>• Inactive users on Netflix – what would you do? (Netflix)</li>
           </ul>
        </section>

        <section className="p-10 bg-zinc-50 rounded-[3.5rem] border border-zinc-200">
           <h2 className="text-2xl font-black text-zinc-900 mb-8">Round Four: Guestimates</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Number of tube lights in Bangalore (Flipkart)",
                "Tennis balls in an airplane (Agoda/Netflix)",
                "Daily Uber support calls (Google)",
                "Cars sold in India (PhonePe)",
                "Credit card users in India (Visa)",
              ].map(q => (
                <div key={q} className="p-4 bg-white border border-zinc-100 rounded-2xl text-xs font-bold text-zinc-600">{q}</div>
              ))}
           </div>
        </section>
      </div>
    ),
    resources: [
        { title: "RCA Masterclass", url: "https://youtu.be/PA-Z__0G8Cs?si=DjJ7mkmdWhzpYU6l", type: "video" },
        { title: "Guestimates Masterclass", url: "https://youtu.be/7C0L_XdlE50?si=bxBFIUcsJEFUsSqr", type: "video" }
    ]
  },
  {
    day: 44,
    title: 'Product Improvement Round',
    category: 'Foundations',
    preview: 'How would you improve Netflix? Amazon Prime? Master the improvement framework.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 44: Product Improvement 🚀</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { name: 'Netflix', company: 'Netflix' },
             { name: 'Prime Video', company: 'Amazon' },
             { name: 'Gmail', company: 'Adobe' },
             { name: 'Spotify', company: 'Adobe' },
             { name: 'Meesho UX', company: 'Meesho' },
             { name: 'Zepto', company: 'Zepto' },
           ].map(item => (
             <div key={item.name} className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <h4 className="font-black text-indigo-600 text-xs uppercase tracking-widest mb-2">{item.company}</h4>
                <p className="text-sm font-black text-zinc-900">How would you improve {item.name}?</p>
             </div>
           ))}
        </section>
        <div className="p-10 bg-indigo-900 rounded-[3rem] text-white text-center">
           <h3 className="text-xl font-black mb-4">Final Challenge</h3>
           <p className="text-indigo-400 font-bold italic">“What would you improve in your favorite product?” (Multiple companies)</p>
        </div>
      </div>
    ),
    resources: [
        { title: "Product Improvement Round", url: "https://youtu.be/Fhm0F240v9Y?si=Sqp9VhYoenUKYcw7", type: "video" }
    ]
  },
  {
    day: 45,
    title: 'Behavioral Rounds & Graduation',
    category: 'Foundations',
    preview: 'Final preparations. Reflect on your 45-day journey and prepare for behavioral questions.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 45: Behavioral Rounds & Graduation 🎓</h1>
        <section className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
           <h2 className="text-2xl font-black text-emerald-900 mb-6">Behavioral Mastery</h2>
           <p className="text-emerald-800 font-medium mb-6 leading-relaxed">Prepare for the "Why PM?", "Tell me about a time you failed", and "Stakeholder conflict" questions.</p>
           <ul className="text-xs font-black text-indigo-600 space-y-2">
              <li>• <a href="https://youtu.be/1rOcpwcDTuY?si=GXoS-FRzroxPPJ0U" target="_blank" rel="noreferrer">Behavioral Rounds Part 1</a></li>
              <li>• <a href="https://youtu.be/Wyvm8vcsaP0?si=JeY3xJKXWfRrGCXG" target="_blank" rel="noreferrer">Behavioral Rounds Part 2</a></li>
           </ul>
        </section>

        <section className="p-10 bg-zinc-900 rounded-[3rem] text-white text-center">
           <h2 className="text-3xl font-black mb-4">The Wrap</h2>
           <p className="text-zinc-400 font-medium leading-relaxed mb-8">
             Product Management is a journey of lifelong learning. You now have the skills, the portfolio, and the confidence to land your role.
           </p>
           <p className="font-black text-2xl text-indigo-400">Congratulations on completing the 45-Day PM Launchpad! 🚀</p>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6 text-center">
        <p className="font-black text-zinc-900 text-lg">We hope you liked the course, please help us by your valuable feedback.</p>
        <a 
          href="https://docs.google.com/forms/d/14esag07MESDVDzUmHGRFWyGfSkahwky18qZmW36_ooQ/preview" 
          target="_blank" 
          rel="noreferrer"
          className="inline-block px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-indigo-700 transition-colors"
        >
          Submit Feedback Form
        </a>
      </div>
    )
  }
];
