import React from 'react';
import { Lesson, ModuleInfo, Category } from './types';
import { 
  Lightbulb, Search, BarChart, 
  Code, Bot, Layers, Brain, Target, Sparkles, CheckCircle, Smartphone, Zap, Users, MessageSquare, Rocket, Activity, Database, Cpu, X, Box, HelpCircle, Terminal, TrendingUp, Settings2, ShieldCheck,
  FileText, Calendar, Compass, ClipboardList, PenTool, Hammer, Ship, RefreshCcw, Layout, FileEdit, PieChart, Send, Clock, ArrowRight, Play, LineChart, Recycle, Settings, HeartHandshake, Package, Beaker, AlertTriangle, Eye, Scale,
  BookOpen, ExternalLink, Map, Ear, UserCheck, Link, Smile, History, FileStack, Presentation, Megaphone, Briefcase, Users2, DollarSign, TrendingDown, Percent, ClipboardCheck, Mic2, Users2 as UsersIcon, Star, BarChart2, GraduationCap,
  MonitorPlay, ArrowLeft
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
    preview: 'Start Your PM Journey Right. Before we jump into frameworks, tools, and case studies, today is about building the right mindset.',
    content: (
      <div className="space-y-10 text-left">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day-0: Foundation & Mindset — Start Your PM Journey Right</h1>
        
        <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
            <p className="text-lg font-medium text-blue-900 leading-relaxed">
              Start Your PM Journey Right. Before we jump into frameworks, tools, and case studies, today is about building the right mindset.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <p className="text-zinc-600 font-medium leading-relaxed">
            Welcome to Day-0 of learning Product Management from scratch!
          </p>
          <p className="text-zinc-600 font-medium leading-relaxed">
            Product Management is one of the most competitive and rewarding careers today. But breaking into PM without prior experience can feel overwhelming because the role demands:
          </p>
          <ul className="space-y-3 text-sm font-bold text-zinc-700 list-disc pl-5">
            <li>Cross-functional collaboration</li>
            <li>Strategic thinking & decision-making</li>
            <li>Problem-solving with ambiguity</li>
            <li>Understanding of business, design, tech & data</li>
          </ul>
          <p className="text-zinc-600 font-medium">
            Many aspiring PMs struggle not because they lack skills, but because they lack clarity of purpose and direction.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
            <Target className="text-indigo-600" />
            Why Day-0 Matters
          </h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            Before learning “how to be a PM”, you must understand why you want to be a PM. PMs face pressure, ownership, ambiguity, and constant context switching — your motivation will keep you going when it gets hard.
          </p>
          <p className="text-zinc-600 font-medium">
            Understanding the reality of the role—not just the glamour—helps you evaluate:
          </p>
          <ul className="space-y-3 text-sm font-bold text-zinc-700 list-disc pl-5">
            <li>Is the PM role aligned with your strengths & interests?</li>
            <li>Do you enjoy solving problems and talking to users?</li>
            <li>Are you comfortable making decisions without perfect data?</li>
          </ul>
          <p className="text-zinc-600 font-medium">
            The fastest way to answer these questions is to talk to real PMs, understand their challenges, impact, and day-to-day responsibilities.
          </p>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
          <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
            <Lightbulb className="text-amber-500" />
            Reflection Exercise
          </h2>
          <p className="text-sm font-bold text-zinc-600 mb-4">
            Write answers to this question:
            <br />
            Why do I want to become a Product Manager?
          </p>
          <p className="font-black text-indigo-600 italic">
            Clarity today will drive consistency tomorrow.
          </p>
        </section>

        <section className="bg-zinc-900 text-white p-10 rounded-[3rem]">
          <h2 className="text-2xl font-black mb-8 text-indigo-400">Outcome of Day-0</h2>
          <p className="text-zinc-400 font-medium mb-6">By the end of today, you should have:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Real understanding of what PM is",
              "Motivation aligned with reality",
              "Early networking with professionals",
              "A clear starting point for the course"
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                <Zap className="w-5 h-5 text-indigo-400 shrink-0" />
                <p className="text-xs font-bold text-zinc-300">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
          <p></p>
          <p></p>
        </div>
      </div>
    ),
    assignment: (
      <div className="space-y-6 text-left">
        <h4 className="font-black text-indigo-900 mb-2 underline decoration-indigo-200 underline-offset-4">Task 1 — Must Do Today</h4>
        <p className="font-medium text-zinc-700">Reach out to 5 Product Managers and ask them about their journey & role.</p>
        <p className="font-medium text-zinc-700">Use LinkedIn, alumni networks, or company communities.</p>
        <div className="pt-4 border-t border-indigo-200">
          <p className="font-black text-indigo-900 uppercase text-xs tracking-widest mb-2">Goal</p>
          <p className="font-medium text-zinc-700">Collect insights and note patterns. This will guide your expectations.</p>
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
      <div className="space-y-10 text-left">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 1: What is Product Management?</h1>
        
        <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
            <p className="text-lg font-medium text-blue-900 leading-relaxed">
              Understand the role, responsibilities, types, and myths about Product Management.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">1. What is a Product?</h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            A product is anything that creates value by solving a real user problem or fulfilling a need—whether physical, digital, or service-based.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Uber", "Spotify", "iPhone", "Google Ads", "ATM", "WhatsApp"].map((p) => (
              <span key={p} className="px-4 py-2 bg-zinc-100 rounded-xl text-sm font-bold text-zinc-700 border border-zinc-200">{p}</span>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">2. Do Companies Need Product Managers?</h2>
          <p className="text-zinc-600 font-medium">Short answer: Yes—but the title isn’t always necessary. Product thinking is.</p>
          <div className="overflow-x-auto rounded-3xl border border-zinc-200 shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <th className="px-6 py-4">Stage</th>
                  <th className="px-6 py-4">Who acts as PM</th>
                  <th className="px-6 py-4">Why it works</th>
                  <th className="px-6 py-4">When it breaks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-sm">
                <tr>
                  <td className="px-6 py-4 font-bold">Early startup</td>
                  <td className="px-6 py-4">Founder</td>
                  <td className="px-6 py-4 text-zinc-500">Small team, fast decisions, direct feedback</td>
                  <td className="px-6 py-4 text-zinc-500">Complexity increases, decisions overload</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">Growth stage</td>
                  <td className="px-6 py-4">Dedicated PMs</td>
                  <td className="px-6 py-4 text-zinc-500">Align teams, prioritize impact, execution</td>
                  <td className="px-6 py-4 text-zinc-500">Without PMs: confusion, misalignment</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold">Large enterprise</td>
                  <td className="px-6 py-4">Product org with PM leaders</td>
                  <td className="px-6 py-4 text-zinc-500">Scale, governance, coordination</td>
                  <td className="px-6 py-4 text-zinc-500">Without PMs: feature bloat, chaos, slow</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">3. Real-World Exceptions</h2>
          <p className="text-zinc-600 font-medium mb-4">Some companies have succeeded without formal PMs:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
              <h4 className="font-black text-zinc-900 mb-2">Basecamp</h4>
              <p className="text-xs text-zinc-500 font-bold leading-relaxed">Design-led product development</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
              <h4 className="font-black text-zinc-900 mb-2">Valve</h4>
              <p className="text-xs text-zinc-500 font-bold leading-relaxed">Self-organized teams</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
              <h4 className="font-black text-zinc-900 mb-2">Early FB / Stripe</h4>
              <p className="text-xs text-zinc-500 font-bold leading-relaxed">Engineer-led decisions</p>
            </div>
          </div>
          <p className="text-zinc-600 font-medium mt-4">These work only when everyone practices product thinking: user obsession + data + trade-offs + execution focus.</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">4. What is Product Management?</h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            Product Management is the function responsible for guiding a product from idea → launch → growth → scale by balancing:
          </p>
          <div className="bg-zinc-900 text-white p-8 rounded-[3rem] text-center italic">
            "PMs don’t decide how to build — they decide what to build and why."
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black text-zinc-900">5. The PM Equation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[2.5rem]">
              <h4 className="font-black text-emerald-900 mb-2">Business</h4>
              <p className="text-xs text-emerald-800 font-bold leading-relaxed">Revenue, success metrics, GTM strategy.</p>
            </div>
            <div className="p-8 bg-pink-50 border border-pink-100 rounded-[2.5rem]">
              <h4 className="font-black text-pink-900 mb-2">Design</h4>
              <p className="text-xs text-pink-800 font-bold leading-relaxed">User experience & usability focus.</p>
            </div>
            <div className="p-8 bg-cyan-50 border border-cyan-100 rounded-[2.5rem]">
              <h4 className="font-black text-cyan-900 mb-2">Tech</h4>
              <p className="text-xs text-cyan-800 font-bold leading-relaxed">Feasibility & backend system thinking.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">6. PM Responsibilities</h2>
          <div className="overflow-x-auto rounded-3xl border border-zinc-200 shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <th className="px-6 py-4">Area</th>
                  <th className="px-6 py-4">What it includes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-sm">
                {[
                  ["User understanding", "Research, interviews, personas, feedback"],
                  ["Problem definition", "Insights, hypotheses, opportunity sizing"],
                  ["Prioritization", "RICE, MoSCoW, Kano frameworks"],
                  ["Strategy & Roadmapping", "Vision, goals, milestones, timelines"],
                  ["Execution & Delivery", "PRDs, user stories, cross-functional collab"],
                  ["Analytics & Learning", "KPI tracking, experiments, iterations"],
                  ["Communication", "Stakeholders, presentations, influence"]
                ].map(([area, desc]) => (
                  <tr key={area}>
                    <td className="px-6 py-4 font-bold">{area}</td>
                    <td className="px-6 py-4 text-zinc-500 font-medium">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black text-zinc-900">7. Types of Product Managers & Why They Exist</h2>
          <p className="text-zinc-600 font-medium leading-relaxed">As products scale, complexity grows — more users, more data, and deeper specialization needs. While an early-stage PM owns everything, a scaled organization requires specialization for efficiency.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
              <h3 className="font-black text-lg text-zinc-900 mb-4">1. Core Product Manager</h3>
              <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">The Generalist</p>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed mb-6">Focus: End-to-end ownership of user-facing product experiences.</p>
              <div className="space-y-4">
                <div>
                  <h5 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">Responsibilities</h5>
                  <ul className="text-xs font-bold text-zinc-500 space-y-1">
                    <li>• Define product vision & roadmap</li>
                    <li>• User research & problem discovery</li>
                    <li>• Prioritization & PRD writing</li>
                    <li>• Collaborate with engineering & design</li>
                    <li>• Track adoption & engagement metrics</li>
                  </ul>
                </div>
                <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">Real Example: Swiggy improving checkout conversion from 85% → 92%</p>
                <p className="text-[10px] font-black uppercase text-zinc-400">North Star Metrics: Retention, Adoption, NPS, DAU</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
              <h3 className="font-black text-lg text-zinc-900 mb-4">2. Growth Product Manager</h3>
              <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">The Optimizer</p>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed mb-6">Focus: Driving acquisition, activation, retention & revenue.</p>
              <div className="space-y-4">
                <div>
                  <h5 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">Responsibilities</h5>
                  <ul className="text-xs font-bold text-zinc-500 space-y-1">
                    <li>• Funnel optimization & loops</li>
                    <li>• A/B testing & experimentation</li>
                    <li>• Work closely with marketing & analytics</li>
                    <li>• Monetization strategy</li>
                  </ul>
                </div>
                <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">Real Example: Duolingo improving daily streak feature → +15% retention</p>
                <p className="text-[10px] font-black uppercase text-zinc-400">North Star Metrics: DAU/MAU, Conversion Rate, LTV, Churn</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
              <h3 className="font-black text-lg text-zinc-900 mb-4">3. Platform Product Manager</h3>
              <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">The Enabler</p>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed mb-6">Focus: Internal systems, APIs & developer experience.</p>
              <div className="space-y-4">
                <div>
                  <h5 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">Responsibilities</h5>
                  <ul className="text-xs font-bold text-zinc-500 space-y-1">
                    <li>• Build scalable internal platforms (auth, notifications, payments)</li>
                    <li>• Align engineering teams & reliability goals</li>
                    <li>• Reduce build time and dependency blocks</li>
                  </ul>
                </div>
                <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">Real Example: Razorpay building unified payments gateway API</p>
                <p className="text-[10px] font-black uppercase text-zinc-400">North Star Metrics: API Uptime, Latency, Integration Adoption</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
              <h3 className="font-black text-lg text-zinc-900 mb-4">4. Data Product Manager</h3>
              <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">The Analyst PM</p>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed mb-6">Focus: Data pipelines, dashboards & experimentation framework.</p>
              <div className="space-y-4">
                <div>
                  <h5 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">Responsibilities</h5>
                  <ul className="text-xs font-bold text-zinc-500 space-y-1">
                    <li>• Define tracking & data schemas</li>
                    <li>• Partner with DS/ML teams</li>
                    <li>• Ensure data quality & governance</li>
                    <li>• Enable insight-driven decisions</li>
                  </ul>
                </div>
                <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">Real Example: Meesho enabling real-time retention dashboards</p>
                <p className="text-[10px] font-black uppercase text-zinc-400">North Star Metrics: Data accuracy, Latency, Dashboard usage</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
              <h3 className="font-black text-lg text-zinc-900 mb-4">5. Technical Product Manager</h3>
              <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">TPM</p>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed mb-6">Focus: Highly technical systems & integrations.</p>
              <div className="space-y-4">
                <div>
                  <h5 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">Responsibilities</h5>
                  <ul className="text-xs font-bold text-zinc-500 space-y-1">
                    <li>• Translate business requirements → architecture requirements</li>
                    <li>• Manage APIs, backend integrations & scalability</li>
                    <li>• Balance tech debt & feature delivery</li>
                  </ul>
                </div>
                <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">Real Example: Slack launching developer API endpoints</p>
                <p className="text-[10px] font-black uppercase text-zinc-400">North Star Metrics: Reliability, Integration success, Performance</p>
              </div>
            </div>

            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
              <h3 className="font-black text-lg text-zinc-900 mb-4">6. AI Product Manager</h3>
              <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">The Intelligent Builder</p>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed mb-6">Focus: Products powered by machine learning & generative AI.</p>
              <div className="space-y-4">
                <div>
                  <h5 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">Responsibilities</h5>
                  <ul className="text-xs font-bold text-zinc-500 space-y-1">
                    <li>• Identify opportunities for AI impact</li>
                    <li>• Work with ML engineers on model lifecycle: data → training → deployment</li>
                    <li>• Ensure responsible, bias-free AI behavior</li>
                    <li>• Convert technical model metrics → business metrics</li>
                  </ul>
                </div>
                <div className="space-y-1">
                  <h5 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Key Skills</h5>
                  <p className="text-[11px] font-bold text-zinc-500">ML fundamentals, Prompt engineering, Model testing & iteration</p>
                </div>
                <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">Real Example: Netflix personalization engine → +15% viewing time</p>
                <p className="text-[10px] font-black uppercase text-zinc-400">North Star Metrics: Model accuracy, Usage, Adoption</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">8. PM Deliverables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'PRD', desc: 'Clarifies what & why for teams' },
              { label: 'Roadmap', desc: 'Timeline of priorities & goals' },
              { label: 'User Stories', desc: 'Smallest unit of work detail' },
              { label: 'Metrics Dashboard', desc: 'Tracks feature health & success' },
              { label: 'GTM / Launch Plan', desc: 'Strategy for market entry' }
            ].map((d) => (
              <div key={d.label} className="p-6 bg-zinc-50 border border-zinc-200 rounded-3xl">
                <h4 className="font-black text-zinc-900 text-sm mb-1">{d.label}</h4>
                <p className="text-xs text-zinc-500 font-bold">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
          <h2 className="text-2xl font-black text-zinc-900 mb-8">Myths vs Reality</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-zinc-200 text-zinc-400 shadow-sm"><X className="w-6 h-6" /></div>
              <div>
                <h4 className="font-black text-zinc-900 mb-1 tracking-tight">“PMs are the boss of the team.”</h4>
                <p className="text-sm text-zinc-500 font-medium">PMs have no authority — influence only.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-zinc-200 text-zinc-400 shadow-sm"><X className="w-6 h-6" /></div>
              <div>
                <h4 className="font-black text-zinc-900 mb-1 tracking-tight">“PMs must know how to code.”</h4>
                <p className="text-sm text-zinc-500 font-medium">Not required, but tech literacy is crucial.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-zinc-200 text-zinc-400 shadow-sm"><X className="w-6 h-6" /></div>
              <div>
                <h4 className="font-black text-zinc-900 mb-1 tracking-tight">“PMs only build new features.”</h4>
                <p className="text-sm text-zinc-500 font-medium">PMs solve problems. Sometimes by removing features.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-zinc-200 text-zinc-400 shadow-sm"><X className="w-6 h-6" /></div>
              <div>
                <h4 className="font-black text-zinc-900 mb-1 tracking-tight">“PMs manage timelines.”</h4>
                <p className="text-sm text-zinc-500 font-medium">That's project management. PMs define what & why.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
          <p></p>
          <p></p>
        </div>
      </div>
    ),
    assignment: (
      <div className="space-y-6 text-left">
        <h4 className="font-black text-indigo-900 mb-2 underline decoration-indigo-200 underline-offset-4">Assignment</h4>
        <p className="font-medium text-zinc-700 leading-relaxed">
          Pick a product you use daily (e.g., Spotify, Zomato, Notion, Cred) and answer:
        </p>
        <div className="p-6 bg-white border border-indigo-100 rounded-3xl shadow-sm italic text-sm font-bold text-indigo-600">
           Submission Format: <br/>
           Product Name: ___ User Problem: ___ Key Metrics: ___ Improvement Suggestion: ___
        </div>
        <div className="pt-4 border-t border-indigo-200">
          <p className="font-black text-indigo-900 uppercase text-xs tracking-widest mb-2">Reflection Task</p>
          <p className="font-medium text-zinc-700">Identify which of the 6 PM types excites you the most and why. Does it align with your current background (e.g., Engineer → TPM, Marketing → Growth)?</p>
        </div>
      </div>
    )
  },
  {
    day: 2,
    title: 'The Product Development Lifecycle (PDLC)',
    category: 'Foundations',
    preview: 'How products move from idea → design → build → launch → iterate.',
    content: (
      <div className="space-y-10 text-left">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 2: The Product Development Lifecycle (PDLC) ⚙️</h1>
        
        <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
            <p className="text-lg font-medium text-blue-900 leading-relaxed">
              Theme: How products move from idea → design → build → launch → iterate.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">Learning Objectives</h2>
          <p className="text-zinc-600 font-medium leading-relaxed">By the end of today, you will:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-zinc-700">
             <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Understand the full lifecycle of product development</li>
             <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Know what happens at every stage & what PMs contribute</li>
             <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Learn common outputs, tools, and real examples</li>
             <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Avoid the typical mistakes that junior PMs make</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">1. What is PDLC?</h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            Product Development Lifecycle (PDLC) is the structured process of taking a product from problem discovery → launch → continuous improvement, ensuring decisions are user-driven, data-backed, and business-aligned.
          </p>
          <div className="overflow-x-auto rounded-3xl border border-zinc-200 shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <th className="px-6 py-4">Stage</th>
                  <th className="px-6 py-4">Goal</th>
                  <th className="px-6 py-4">Key Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-sm">
                <tr><td className="px-6 py-4 font-bold">Discovery</td><td className="px-6 py-4">Understand the user problem</td><td className="px-6 py-4 text-zinc-500">Problem statement, Personas</td></tr>
                <tr><td className="px-6 py-4 font-bold">Definition</td><td className="px-6 py-4">Scope & prioritize solution</td><td className="px-6 py-4 text-zinc-500">PRD, success metrics</td></tr>
                <tr><td className="px-6 py-4 font-bold">Design</td><td className="px-6 py-4">Visualize experience</td><td className="px-6 py-4 text-zinc-500">Wireframes, Prototype</td></tr>
                <tr><td className="px-6 py-4 font-bold">Development</td><td className="px-6 py-4">Build & test</td><td className="px-6 py-4 text-zinc-500">MVP, QA sign-off</td></tr>
                <tr><td className="px-6 py-4 font-bold">Launch</td><td className="px-6 py-4">Ship product to users</td><td className="px-6 py-4 text-zinc-500">GTM plan, adoption data</td></tr>
                <tr><td className="px-6 py-4 font-bold">Iteration</td><td className="px-6 py-4">Improve continuously</td><td className="px-6 py-4 text-zinc-500">Insights, next roadmap</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-12">
            {[
                {
                    id: "01",
                    phase: "Phase 1: Discovery (Find the Right Problem)",
                    goal: "“Fall in love with the problem, not the solution.” Understand real user needs and validate the painpoint.",
                    activities: ["Market & competitor research", "User interviews, surveys", "Data analysis (Mixpanel, GA, SQL)", "Identify Jobs-to-be-Done (JTBD)"],
                    outputs: ["Problem statement", "Personas", "Hypothesis", "Opportunity sizing"],
                    case: "Zomato observes high checkout drop-offs because of unpredictable surge delivery fees."
                },
                {
                    id: "02",
                    phase: "Phase 2: Definition (Scope the Solution)",
                    goal: "Turn insights into an actionable plan. Define what we are building and how we measure success.",
                    activities: ["Prioritization (RICE, MOSCOW, Value-Effort)", "Success metrics / OKRs", "PRD writing", "Align with design & engineering"],
                    outputs: ["PRD", "Prioritized roadmap", "Success metrics"],
                    case: "Test a Flat Delivery Fee Subscription Model to reduce checkout abandonment by 15%."
                },
                {
                    id: "03",
                    phase: "Phase 3: Design (Shape the Experience)",
                    goal: "Design an intuitive experience for solving the defined problem.",
                    activities: ["Wireframes & prototypes in Figma", "User testing & usability reviews", "Accessibility & UI polishing"],
                    outputs: ["Prototype", "Usability results", "Design specs"],
                    case: "Prototype for 1-click subscription to Zomato delivery fee waiver."
                },
                {
                    id: "04",
                    phase: "Phase 4: Development (Build)",
                    goal: "Build and test the feature until ready for release. Focus on functional alignment.",
                    activities: ["Sprint planning & execution (Jira)", "Daily standups, bug triage", "QA & UAT testing", "Feature flag rollout"],
                    outputs: ["Working MVP", "Release candidate", "Go/No-Go decision"],
                    case: "Feature toggle rollout to 5% of users in Bangalore to test load performance."
                },
                {
                    id: "05",
                    phase: "Phase 5: Launch (Ship & Distribute)",
                    goal: "“Shipping is a feature.” Release value to users and drive broad adoption.",
                    activities: ["GTM strategy (Marketing, Sales, Support)", "Announcements, tutorials, walkthroughs", "Monitor adoption & sentiment"],
                    outputs: ["GTM docs", "Release comms", "Launch dashboard"],
                    case: "Email + push campaign tracking adoption of the new delivery subscription."
                },
                {
                    id: "06",
                    phase: "Phase 6: Iteration (Learn & Improve)",
                    goal: "Improve continuously based on data. The cycle never truly ends.",
                    activities: ["Analyze Mixpanel, GA, SQL reports", "Collect feedback (NPS, CSAT)", "Identify improvement opportunities"],
                    outputs: ["Insights report", "Updated roadmap", "New hypothesis"],
                    case: "Feature adoption = 70%, renewal = 30% → pricing experiment planned to improve retention."
                }
            ].map((p) => (
                <div key={p.id} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
                    <div className="absolute -top-4 -right-4 text-zinc-50 font-black text-9xl group-hover:text-zinc-100 transition-colors pointer-events-none">{p.id}</div>
                    <h3 className="font-black text-xl text-zinc-900 mb-4 relative z-10">{p.phase}</h3>
                    <div className="space-y-4 relative z-10">
                        <div>
                            <h5 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Goal</h5>
                            <p className="text-sm text-zinc-600 font-medium">{p.goal}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h5 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Activities</h5>
                                <ul className="text-xs font-bold text-zinc-500 space-y-1">
                                    {p.activities.map(a => <li key={a}>• {a}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Outputs</h5>
                                <ul className="text-xs font-bold text-zinc-500 space-y-1">
                                    {p.outputs.map(o => <li key={o}>• {o}</li>)}
                                </ul>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl">Industry Case: {p.case}</p>
                    </div>
                </div>
            ))}
        </section>

        <section className="bg-zinc-900 text-white p-10 rounded-[3rem]">
          <h2 className="text-2xl font-black mb-8 text-indigo-400">Key Takeaways</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "The best PMs don’t build features — they solve problems.",
              "PDLC creates structure, clarity, and alignment across the org.",
              "Launch is not the end — iteration is where results come from."
            ].map((text, i) => (
              <div key={i} className="flex gap-4 items-start bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30 text-indigo-400 font-black">{i+1}</div>
                <p className="text-sm font-medium text-zinc-300 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">SDLC VS PDLC</h2>
          <div className="overflow-x-auto rounded-3xl border border-zinc-200 shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <th className="px-6 py-4">Aspect</th>
                  <th className="px-6 py-4">SDLC (Software Development Life Cycle)</th>
                  <th className="px-6 py-4">PDLC (Product Development Life Cycle)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-sm font-medium">
                <tr><td className="px-6 py-4 font-bold">Focus</td><td className="px-6 py-4 text-zinc-500">Building software correctly</td><td className="px-6 py-4 text-zinc-500">Building the right product</td></tr>
                <tr><td className="px-6 py-4 font-bold">Goal</td><td className="px-6 py-4 text-zinc-500">Deliver a working, stable system</td><td className="px-6 py-4 text-zinc-500">Deliver user & business value</td></tr>
                <tr><td className="px-6 py-4 font-bold">Scope</td><td className="px-6 py-4 text-zinc-500">Technical implementation</td><td className="px-6 py-4 text-zinc-500">Business + user + tech</td></tr>
                <tr><td className="px-6 py-4 font-bold">Owner</td><td className="px-6 py-4 text-zinc-500">Engineering / Tech team</td><td className="px-6 py-4 text-zinc-500">Product Manager</td></tr>
                <tr><td className="px-6 py-4 font-bold">Starts with</td><td className="px-6 py-4 text-zinc-500">Technical requirements</td><td className="px-6 py-4 text-zinc-500">Problem / opportunity</td></tr>
                <tr><td className="px-6 py-4 font-bold">Ends with</td><td className="px-6 py-4 text-zinc-500">Deployment & maintenance</td><td className="px-6 py-4 text-zinc-500">Iteration, scale, or sunset</td></tr>
                <tr><td className="px-6 py-4 font-bold">Success Metric</td><td className="px-6 py-4 text-zinc-500">Bug-free, performant software</td><td className="px-6 py-4 text-zinc-500">Adoption, retention, revenue</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
          <p></p>
          <p></p>
        </div>
      </div>
    ),
    assignment: (
      <div className="space-y-6 text-left">
        <h4 className="font-black text-indigo-900 mb-2 underline decoration-indigo-200 underline-offset-4">Assignment</h4>
        <p className="font-medium text-zinc-700 leading-relaxed">
          Pick any app (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and describe a new feature across the PDLC:
        </p>
        <div className="p-6 bg-white border border-indigo-100 rounded-3xl shadow-sm text-sm font-bold text-indigo-600 space-y-1">
           <p>Product: ___</p>
           <p>Feature Idea: ___</p>
           <p>Discovery – Problem & insight: ___</p>
           <p>Definition – Hypothesis & metrics: ___</p>
           <p>Design – Sketch or description: ___</p>
           <p>Development – Dependencies / risks: ___</p>
           <p>Launch – Target segment & rollout plan: ___</p>
           <p>Iteration – What will you measure?: ___</p>
        </div>
        <p className="text-sm font-medium text-zinc-600">Cover what is SDLC from “SDLC Life Cycle for Beginners”</p>
        <div className="pt-4 border-t border-indigo-200">
          <p className="font-black text-indigo-900 uppercase text-xs tracking-widest mb-2">Expected Outcome</p>
          <p className="font-medium text-zinc-700">You learn to think like a PM end-to-end, considering everything from feasibility to measurement.</p>
        </div>
      </div>
    ),
    resources: [
        { title: "WATCH: SDLC Life Cycle for Beginners", url: "https://youtu.be/SaCYkPD4_K0?si=Ac99nHMQnGAPXxEl", type: "video" }
    ]
  },
  {
    day: 3,
    title: 'Product Life Cycle (PLC) & PLM',
    category: 'Foundations',
    preview: 'Understand how products evolve in the market over time and how companies manage that journey.',
    content: (
      <div className="space-y-10 text-left">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 3: Product Life Cycle (PLC) & PLM 🔄</h1>
        
        <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
            <p className="text-lg font-medium text-blue-900 leading-relaxed">
              Understand how products evolve in the market over time and how companies manage that journey.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">What is Product Life Cycle (PLC)?</h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            Product Life Cycle is the journey a product goes through in the market — from the day it is launched to the day it is eventually retired.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black text-zinc-900">What Are the 4 Stages of Product Life Cycle?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 text-zinc-50 font-black text-9xl group-hover:text-zinc-100 transition-colors pointer-events-none">01</div>
              <h3 className="font-black text-xl text-zinc-900 mb-4 relative z-10">Introduction</h3>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed relative z-10">
                This is when a new product is first introduced to the market. Sales are usually low because customers are just starting to become aware of the product, and marketing efforts are focused on building awareness and generating interest. Companies may be investing heavily in research and development during this stage.
              </p>
            </div>
            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 text-zinc-50 font-black text-9xl group-hover:text-zinc-100 transition-colors pointer-events-none">02</div>
              <h3 className="font-black text-xl text-zinc-900 mb-4 relative z-10">Growth</h3>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed relative z-10">
                In this stage, the product starts to gain interest. Sales begin to increase as more customers become aware of the product and start buying it. Marketing efforts now focus on expanding market share and building brand loyalty. Competitors may also start entering the market during this stage.
              </p>
            </div>
            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 text-zinc-50 font-black text-9xl group-hover:text-zinc-100 transition-colors pointer-events-none">03</div>
              <h3 className="font-black text-xl text-zinc-900 mb-4 relative z-10">Maturity</h3>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed relative z-10">
                This is the stage of peak sales. The product has reached its maximum market penetration, and sales growth starts to level off. Competition is usually intense, and companies may need to focus on differentiating their product through added features, improved quality, or competitive pricing.
              </p>
            </div>
            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 text-zinc-50 font-black text-9xl group-hover:text-zinc-100 transition-colors pointer-events-none">04</div>
              <h3 className="font-black text-xl text-zinc-900 mb-4 relative z-10">Decline</h3>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed relative z-10">
                In the decline stage, sales begin to decline as customer preferences change, new technologies emerge, or market saturation occurs. Companies may choose to discontinue the product or try to extend it via strategies like updates, new marketing, or new segments.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">What is Product Lifecycle Management (PLM)?</h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            Product Lifecycle Management (PLM) is the practice of managing a product from its initiation to its eventual retirement through a systematic approach.
          </p>
          <div className="bg-zinc-900 text-white p-10 rounded-[3rem] text-center italic leading-relaxed">
            "It's a system that helps manage every step of a product's life, from the initial idea and design to manufacturing, distribution, and even after it's sold. It's a way for companies to keep track of all the details and make sure everyone involved is on the same page throughout the product's journey. So, in simpler terms, PLM is like a guidebook that helps companies manage their products from start to finish."
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black text-zinc-900">Stages of a Product in PLM</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 shadow-inner">
              <h4 className="font-black text-zinc-900 mb-2 text-sm uppercase tracking-tight">Concept Stage</h4>
              <p className="text-xs text-zinc-500 font-bold leading-relaxed">The start of making a new product. Involves initial ideas and planning, market research, identifying customer needs, and determining feasibility. Usually R&D takes the lead.</p>
            </div>
            <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 shadow-inner">
              <h4 className="font-black text-zinc-900 mb-2 text-sm uppercase tracking-tight">Design Stage</h4>
              <p className="text-xs text-zinc-500 font-bold leading-relaxed">Careful plan for the product, building prototypes, and testing everything. Ensuring the design meets all rules and safety standards. Significant R&D spend happens here.</p>
            </div>
            <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 shadow-inner">
              <h4 className="font-black text-zinc-900 mb-2 text-sm uppercase tracking-tight">Production Stage</h4>
              <p className="text-xs text-zinc-500 font-bold leading-relaxed">Making the product at scale—getting materials, putting everything together, and quality checks. Design changes should be minimal at this point.</p>
            </div>
            <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-200 shadow-inner">
              <h4 className="font-black text-zinc-900 mb-2 text-sm uppercase tracking-tight">Sales Stage</h4>
              <p className="text-xs text-zinc-500 font-bold leading-relaxed">About telling people about the product and getting them to buy it via advertisements, prices, and special deals. Forecasting is crucial.</p>
            </div>
            <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-200 shadow-inner">
              <h4 className="font-black text-zinc-900 mb-2 text-sm uppercase tracking-tight">Support Stage</h4>
              <p className="text-xs text-zinc-500 font-bold leading-relaxed">Ongoing customer support including customer service, warranties, repairs, and services or training to enhance user experience.</p>
            </div>
            <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-200 shadow-inner">
              <h4 className="font-black text-zinc-900 mb-2 text-sm uppercase tracking-tight">Retirement Stage</h4>
              <p className="text-xs text-zinc-500 font-bold leading-relaxed">The life of the product ends due to better products, preference shifts, or tech moves. Includes responsible recycling or find new uses.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">Benefits of PLM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Improved Collaboration", desc: "PLM encourages cross-functional collaboration, ensuring that all stakeholders, from design to sales, work together seamlessly." },
              { title: "Enhanced Product Quality", desc: "By integrating quality control into each phase, PLM helps identify and rectify potential issues early, resulting in higher-quality products." },
              { title: "Efficient Resource Utilization", desc: "Streamlines processes, reducing waste and optimizing resource utilization, leading to significant cost savings." },
              { title: "Faster Time-to-Market", desc: "A structured approach facilitates quicker development cycles, enabling companies to bring products to market more rapidly." },
              { title: "Regulatory Compliance", desc: "PLM systems assist in ensuring that products meet regulatory standards, minimizing the risk of legal and compliance issues." }
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-zinc-900 text-sm mb-1">{benefit.title}</h4>
                  <p className="text-xs text-zinc-500 font-bold leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
          <p></p>
          <p></p>
        </div>
      </div>
    ),
    assignment: (
      <div className="space-y-6 text-left">
        <h4 className="font-black text-indigo-900 mb-2 underline decoration-indigo-200 underline-offset-4">Assignment</h4>
        <p className="font-medium text-zinc-700 leading-relaxed">
          Pick any product (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and evaluate its lifecycle:
        </p>
        <div className="p-6 bg-white border border-indigo-100 rounded-3xl shadow-sm text-sm font-bold text-indigo-600 space-y-1">
           <p>Product: ___</p>
           <p>Current PLC Stage: ___</p>
           <p>What signals tell you this stage?: ___</p>
           <p>What should PM focus on right now (Strategy)?: ___</p>
           <p>One risky decision PM must make at this stage: ___</p>
           <p>If it’s declining, how would you extend or sunset it?: ___</p>
        </div>
        <div className="pt-4 border-t border-indigo-200">
          <p className="font-black text-indigo-900 uppercase text-xs tracking-widest mb-2">Expected Outcome</p>
          <p className="font-medium text-zinc-700">You learn to think like a PM end-to-end, considering everything from feasibility to measurement.</p>
        </div>
      </div>
    )
  },
  {
    day: 4,
    title: 'Product Sense: The Sixth Sense of PMs',
    category: 'Foundations',
    preview: 'Great PMs don’t build features. They solve meaningful problems. Master the "sixth sense" of Product Management.',
    content: (
      <div className="space-y-10 text-left">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 4: Product Sense: The Sixth Sense of PMs 🧠</h1>
        
        <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
            <p className="text-lg font-medium text-blue-900 leading-relaxed">
              Great PMs don’t build features. They solve meaningful problems. Master the "sixth sense" of Product Management.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">What is Product Sense?</h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            Product sense is the ability to see through complexity and spot the user needs that matter most. Experts like Marty Cagan emphasize that it is deep product knowledge built through immersion, not an innate gift.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black text-zinc-900">The 7 Pillars of Product Sense</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Empathy & Customer Needs", desc: "Listening for spoken and unspoken pain points and emotional drivers.", icon: HeartHandshake },
              { title: "Market & Competitive Insight", desc: "Analyzing trends and mapping competitor gaps to find unique value.", icon: Search },
              { title: "Design & UX Perspective", desc: "Recognizing good flows and how design decisions affect engagement.", icon: Smartphone },
              { title: "Problem Framing & Mapping", desc: "Distinguishing root causes from symptoms and exploring options.", icon: Map },
              { title: "Feasibility & Execution", desc: "Balancing ambitious ideas with tech constraints, budgets, and timelines.", icon: Hammer },
              { title: "Iteration & Validation", desc: "Using prototypes and experiments to adjust based on real data.", icon: Beaker },
              { title: "Domain Immersion", desc: "Gaining deep knowledge of a space to predict behaviors and outcomes.", icon: Layers }
            ].map((pillar, i) => (
              <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm group hover:border-indigo-100 transition-all">
                <pillar.icon className="w-8 h-8 text-indigo-600 mb-4" />
                <h4 className="font-black text-zinc-900 text-sm mb-2">{pillar.title}</h4>
                <p className="text-xs text-zinc-500 font-bold leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-zinc-950 text-white p-10 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10"><TrendingUp className="w-32 h-32" /></div>
          <h2 className="text-2xl font-black mb-8 text-indigo-400">Why Aspiring PMs Must Master It</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">A Key Hiring Criterion</h4>
              <p className="text-sm text-zinc-300 font-medium leading-relaxed">Most companies test for product sense during interviews to see if you can analyze products meaningfully.</p>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">Bridges Strategy and Execution</h4>
              <p className="text-sm text-zinc-300 font-medium leading-relaxed">Ties small features to the 'bigger picture' and strategic goals.</p>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">Anticipates User Behavior</h4>
              <p className="text-sm text-zinc-300 font-medium leading-relaxed">Sense unarticulated needs before competitors (e.g., Original iPhone, Gmail).</p>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-2">Stakeholder Alignment</h4>
              <p className="text-sm text-zinc-300 font-medium leading-relaxed">Provides the rationale needed to explain trade-offs to engineers and execs.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">Daily Habits to Build Instincts</h2>
          <div className="space-y-4">
            {[
              { title: "Talk to Users Regularly", desc: "Read tickets, join sales calls, and observe context surveys miss." },
              { title: "Reverse-Engineer Products", desc: "Break down apps like Airbnb to understand core needs and trade-offs." },
              { title: "Perform Product Drills", desc: "List 3 strengths and 3 weaknesses of a daily-use app with justifications." },
              { title: "Embrace Constraints", desc: "Design solutions under strict limits (e.g., 30s onboarding) to sharpen judgment." }
            ].map((habit, i) => (
              <div key={i} className="flex gap-4 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center shrink-0 font-black text-indigo-600 shadow-sm">{i+1}</div>
                <div>
                  <h4 className="font-black text-zinc-900 text-sm mb-1">{habit.title}</h4>
                  <p className="text-xs text-zinc-500 font-bold leading-relaxed">{habit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm">
          <h2 className="text-2xl font-black text-zinc-900 mb-6">Ace the Product Sense Interview</h2>
          <p className="text-zinc-500 font-bold mb-8 italic">Hiring managers look for clarity, empathy, and reasoning rather than just a "correct" answer.</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-600 font-medium">Frame the problem clearly before jumping to solutions.</p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-600 font-medium">Identify specific user segments and their unique pains.</p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-600 font-medium">Propose solutions with a rationale, explaining the hypothesis.</p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-600 font-medium">Discuss trade-offs—be prepared to answer, "Who suffers if we cut this feature?".</p>
            </li>
          </ul>
        </section>

        <section className="bg-red-50 p-10 rounded-[3rem] border border-red-100">
          <h2 className="text-2xl font-black text-red-900 mb-8 flex items-center gap-3"><AlertTriangle /> Common Pitfalls to Avoid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-red-50">
              <h4 className="font-black text-red-900 text-sm mb-2">Over-reliance on "Gut"</h4>
              <p className="text-xs text-red-700 font-medium leading-relaxed">Instincts must be tempered by data; ignoring analytics is dangerous unless honed by experience.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-red-50">
              <h4 className="font-black text-red-900 text-sm mb-2">The Aesthetic Trap</h4>
              <p className="text-xs text-red-700 font-medium leading-relaxed">Don't mistake polished UI for good product sense; a beautiful design solving the wrong problem is a failure.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-red-50">
              <h4 className="font-black text-red-900 text-sm mb-2">Domain Overfitting</h4>
              <p className="text-xs text-red-700 font-medium leading-relaxed">Don't assume a playbook from one industry will automatically work in another.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-red-50">
              <h4 className="font-black text-red-900 text-sm mb-2">Feature Bloat</h4>
              <p className="text-xs text-red-700 font-medium leading-relaxed">Weak sense leads to "copying competitors," resulting in a bloated product that fails real problems.</p>
            </div>
          </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
          <p></p>
          <p></p>
        </div>
      </div>
    ),
    assignment: (
      <div className="space-y-6 text-left">
        <h4 className="font-black text-indigo-900 mb-2 underline decoration-indigo-200 underline-offset-4">Assignment</h4>
        <p className="font-medium text-zinc-700 leading-relaxed">
          Read this expert breakdown of Product Sense and apply it to a feature teardown:
        </p>
        <a 
          href="https://www.parallelhq.com/blog/what-product-sense" 
          target="_blank" 
          rel="noreferrer" 
          className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline"
        >
          “What is Product Sense? by Robin Dhanwani” <ExternalLink className="w-3 h-3" />
        </a>
        <div className="pt-4 border-t border-indigo-200">
          <p className="font-black text-indigo-900 uppercase text-xs tracking-widest mb-2">Task</p>
          <p className="font-medium text-zinc-700 mb-4 leading-relaxed">Pick a feature from an app you use daily. Write a 1-page "Product Sense Teardown" identifying:</p>
          <ul className="text-sm font-bold text-zinc-500 space-y-2">
            <li>1) The core user problem</li>
            <li>2) The hypothesis behind the design</li>
            <li>3) One critical trade-off they made.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    day: 5,
    title: 'User Empathy: Step Into Their Shoes',
    category: 'Foundations',
    preview: 'Step into their shoes. User empathy is the fundamental driver of human-centered development.',
    content: (
      <div className="space-y-10 text-left">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 5: User Empathy 👣</h1>
        
        <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
            <p className="text-lg font-medium text-blue-900 leading-relaxed">
              Step into their shoes. User empathy is the fundamental driver of human-centered development.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-zinc-900">User Empathy in Product</h2>
          <p className="text-zinc-600 font-medium leading-relaxed">
            User empathy is the ability to understand and share the feelings, needs, and perspectives of users by "stepping into their shoes" to view the product through their eyes. It drives human-centered development.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black text-zinc-900">Core Principles of User Empathy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
              <h4 className="font-black text-indigo-600 mb-3 uppercase tracking-widest text-xs">Active Listening</h4>
              <p className="text-sm text-zinc-500 font-bold leading-relaxed">Listen without judgment. Encourage open communication and hear what's NOT being said.</p>
            </div>
            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
              <h4 className="font-black text-indigo-600 mb-3 uppercase tracking-widest text-xs">Putting Users First</h4>
              <p className="text-sm text-zinc-500 font-bold leading-relaxed">Prioritize user needs over internal assumptions or ego. Align decisions with their interests.</p>
            </div>
            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
              <h4 className="font-black text-indigo-600 mb-3 uppercase tracking-widest text-xs">Deep Connection</h4>
              <p className="text-sm text-zinc-500 font-bold leading-relaxed">Grasp challenges, desires, and emotional motivations of your audience, not just tech specs.</p>
            </div>
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-2xl font-black text-zinc-900">Implementation Process for PMs</h2>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shrink-0 font-black text-xl shadow-lg">1</div>
              <div className="space-y-4">
                <h3 className="text-xl font-black text-zinc-900">User Research & Personas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h5 className="text-[10px] font-black uppercase text-zinc-400 mb-1">Research Methods</h5>
                    <p className="text-xs font-bold text-zinc-600">Interviews, surveys, and usability testing.</p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h5 className="text-[10px] font-black uppercase text-zinc-400 mb-1">Personas</h5>
                    <p className="text-xs font-bold text-zinc-600">Visualize different user groups.</p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h5 className="text-[10px] font-black uppercase text-zinc-400 mb-1">Empathy Maps</h5>
                    <p className="text-xs font-bold text-zinc-600">Map what users think, feel, experience, and do.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shrink-0 font-black text-xl shadow-lg">2</div>
              <div className="space-y-4">
                <h3 className="text-xl font-black text-zinc-900">Design Thinking Integration</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Empathize", "Define", "Ideate", "Prototype", "Test"].map(step => (
                    <span key={step} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest">{step}</span>
                  ))}
                </div>
                <p className="text-sm text-zinc-600 font-medium leading-relaxed">PMs observe interactions, define pain points, ideate solutions, and test prototypes to refine the experience based on feedback.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shrink-0 font-black text-xl shadow-lg">3</div>
              <div className="space-y-4">
                <h3 className="text-xl font-black text-zinc-900">Continuous Feedback Loops</h3>
                <p className="text-sm text-zinc-600 font-medium leading-relaxed">Involve users at every stage, not just at the end. Use User Acceptance Testing (UAT) and iterative analysis to evolve with changing user preferences.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
          <h2 className="text-2xl font-black text-zinc-900 mb-8">Key Tools & Frameworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600"><Map className="w-5 h-5" /></div>
              <div>
                <h4 className="font-black text-zinc-900 text-sm mb-1">User Journey Mapping</h4>
                <p className="text-xs text-zinc-500 font-bold">Visualizing the path a user takes.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600"><MessageSquare className="w-5 h-5" /></div>
              <div>
                <h4 className="font-black text-zinc-900 text-sm mb-1">User Stories</h4>
                <p className="text-xs text-zinc-500 font-bold">Features from the user's perspective.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600"><RefreshCcw className="w-5 h-5" /></div>
              <div>
                <h4 className="font-black text-zinc-900 text-sm mb-1">User Flows</h4>
                <p className="text-xs text-zinc-500 font-bold">Step-by-step task completion.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600"><Users className="w-5 h-5" /></div>
              <div>
                <h4 className="font-black text-zinc-900 text-sm mb-1">User Segments</h4>
                <p className="text-xs text-zinc-500 font-bold">Categorizing unique group needs.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black text-zinc-900">Real-World Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-zinc-900 text-white rounded-[2.5rem] relative overflow-hidden">
              <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest mb-4">Apple</h4>
              <p className="text-sm font-medium text-zinc-300 leading-relaxed">Demonstrates empathy through user-friendly interfaces and seamless experiences that create a loyal base.</p>
            </div>
            <div className="p-8 bg-zinc-900 text-white rounded-[2.5rem] relative overflow-hidden">
              <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest mb-4">Airbnb</h4>
              <p className="text-sm font-medium text-zinc-300 leading-relaxed">Achieved success by focusing on the traveler's need for unique and personalized experiences.</p>
            </div>
          </div>
          <div className="bg-zinc-100 p-8 rounded-[2.5rem] text-center italic font-black text-zinc-600 border border-zinc-200">
            "Empathy is a core value that ensures products exceed expectations, not just meet them."
          </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
          <p></p>
          <p></p>
        </div>
      </div>
    ),
    assignment: (
      <div className="space-y-8 text-left">
        <h4 className="font-black text-indigo-900 mb-4 underline decoration-indigo-200 underline-offset-4">Assignment</h4>
        
        <div className="space-y-4">
          <p className="font-black text-zinc-900 uppercase text-xs tracking-widest">Task</p>
          <p className="font-medium text-zinc-700 leading-relaxed">Find out How did Airbnb use user empathy to drive their success? Look for specific stories about their "early days" and how they handled user problems.</p>
        </div>

        <div className="space-y-6">
          <p className="font-black text-zinc-900 uppercase text-xs tracking-widest">Reflection Questions</p>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex gap-4 p-4 bg-white rounded-2xl border border-indigo-100">
              <span className="font-black text-indigo-600">1</span>
              <p className="text-sm font-bold text-zinc-600">How did they identify the problem travelers faced?</p>
            </div>
            <div className="flex gap-4 p-4 bg-white rounded-2xl border border-indigo-100">
              <span className="font-black text-indigo-600">2</span>
              <p className="text-sm font-bold text-zinc-600">What "unscalable" things did the founders do to empathize with hosts?</p>
            </div>
            <div className="flex gap-4 p-4 bg-white rounded-2xl border border-indigo-100">
              <span className="font-black text-indigo-600">3</span>
              <p className="text-sm font-bold text-zinc-600">How is that empathy reflected in the current app experience?</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-indigo-200">
          <a 
            href="https://youtu.be/fqNAWyOOVfw?si=kDNECTry9tz-J9yf" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-3 p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors"
          >
            <Play className="w-5 h-5 fill-current" />
            <span className="font-black text-xs uppercase tracking-widest">Watch: The Importance of Empathy</span>
          </a>
        </div>
      </div>
    ),
    resources: [
        { title: "The Importance of Empathy", url: "https://youtu.be/fqNAWyOOVfw?si=kDNECTry9tz-J9yf", type: "video" }
    ]
  },
  {
    day: 6,
    title: 'Essential Product Documentation: A Complete Guide',
    category: 'Foundations',
    preview: "Product managers are professional translators. Master PRDs, BRDs, User Stories, and Roadmaps to align your team.",
    content: (
      <div className="space-y-10 text-left text-zinc-600">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 6: Essential Product Documentation: A Product Manager's Complete Guide 📝</h1>
        
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6 flex items-center gap-3">🎯 Learning Objectives</h2>
           <p className="text-sm font-bold text-indigo-500 mb-4 uppercase tracking-widest">By the end of Day 6, you will be able to:</p>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-zinc-700">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Distinguish between document types (PRD, BRD, user stories, roadmaps, etc.)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Create comprehensive Product Requirements Documents (PRDs)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Build compelling Business Requirements Documents (BRDs)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Write effective user stories and acceptance criteria</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Develop outcome-focused roadmaps</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Produce go-to-market documentation</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Apply documentation best practices (scannability, accessibility)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Make strategic decisions about when to document</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Maintain decision logs and meeting notes</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Develop a documentation mindset for clarification</li>
           </ul>
        </section>

        <section className="prose prose-zinc max-w-none">
          <p className="text-lg font-medium leading-relaxed italic border-l-4 border-[#79BAEC] pl-6 mb-10">
            "Product managers are professional translators. We translate customer needs into technical requirements, business strategy into product roadmaps, and abstract visions into concrete execution plans. Documentation is the primary medium for this translation work."
          </p>
          
          <p className="mb-6">
            Yet many product managers struggle with documentation—either producing volumes of text nobody reads or creating nothing at all and wondering why teams feel misaligned. The key is understanding which documents serve which purposes and crafting each with intention.
          </p>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">The Product Requirements Document (PRD)</h2>
          <p className="mb-6">
            The PRD is the product manager's most fundamental artifact. It defines what you're building, why you're building it, and what success looks like. Think of it as the single source of truth that aligns engineering, design, marketing, and leadership around a shared understanding.
          </p>
          <p className="mb-6">
            A strong PRD typically includes several core elements. Start with the problem statement and context—what customer or business problem are you solving, and why does it matter now? Include relevant background on market dynamics, competitive landscape, or strategic rationale. Next comes the objectives and success metrics. Define what good looks like with specific, measurable outcomes. Are you increasing conversion by 15 percent, reducing support tickets by half, or entering a new market segment?
          </p>
          <p className="mb-6">
            The requirements themselves should be clear and prioritized. Describe user stories or use cases that illustrate how people will interact with the product. Specify functional requirements—what the product must do—and non-functional requirements like performance, security, or scalability constraints. Distinguish between must-haves for launch and nice-to-haves for future iterations.
          </p>
          <p className="mb-6">
            Include user experience considerations, even if you have separate design documentation. Call out key user flows, information architecture decisions, or design principles that should guide the work. Add technical considerations or constraints that engineering should know upfront. If you're integrating with existing systems, migrating data, or working within platform limitations, surface these early.
          </p>
          <p className="mb-6">
            Finally, define scope boundaries explicitly. What are you deliberately not doing? What questions remain open? What assumptions are you making? These boundaries prevent scope creep and clarify decision-making authority.
          </p>
          <p className="bg-zinc-900 text-white p-6 rounded-2xl mb-10">
             <strong>The best PRDs are living documents.</strong> Update them as you learn from user testing, technical discovery, or changing business conditions. Date your revisions and maintain a changelog so everyone knows they're working from current information.
          </p>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">The Business Requirements Document (BRD)</h2>
          <p className="mb-6">
            While PRDs focus on the product itself, BRDs articulate the business case. This document answers the question every executive asks: why should we invest resources in this?
          </p>
          <p className="mb-6">
            BRDs typically flow from strategy to execution. Begin with business objectives—how does this initiative support company goals? Connect the dots between your product work and revenue growth, market expansion, cost reduction, or strategic positioning.
          </p>
          <p className="mb-6">
            Market analysis provides essential context. What's the opportunity size? Who are the target customers and what segments are you pursuing? How does the competitive landscape influence your approach? Include relevant market research, customer insights, or industry trends that validate the opportunity.
          </p>
          <p className="mb-6">
            The financial analysis is where you quantify the business case. Project expected revenue impact, development costs, ongoing operational expenses, and return on investment. Be honest about assumptions and risks. Executives appreciate realistic projections more than hockey-stick fantasies.
          </p>
          <p className="mb-6">
            Outline high-level requirements from a business perspective—not technical features but business capabilities. For instance, "enable enterprise customers to manage user permissions" rather than "build role-based access control system." Include stakeholder analysis showing who's impacted and who needs to be involved.
          </p>
          <p className="mb-6">
            Define success criteria and key performance indicators. How will you measure whether this initiative achieved its business objectives? Include both leading indicators you can track during development and lagging indicators that show ultimate business impact.
          </p>
          <p className="mb-6">
            BRDs are particularly valuable for large initiatives requiring executive approval or significant resource allocation. For smaller features, the business rationale might fold into your PRD rather than warranting a separate document.
          </p>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">User Stories and Acceptance Criteria</h2>
          <p className="mb-6">
            User stories translate requirements into human terms. The classic format—"As a [user type], I want to [action] so that [benefit]"—forces you to think from the user's perspective and articulate the underlying value.
          </p>
          <p className="mb-6">
            Effective user stories are independent, negotiable, valuable, estimable, small, and testable. They describe what users want to accomplish, not how the system should work. Instead of "the system shall display a confirmation dialog," write "as a user, I want confirmation before deleting data so that I don't accidentally lose my work."
          </p>
          <p className="mb-6">
            Acceptance criteria define when a story is complete. These are specific, testable conditions that must be met. Use clear language: "Given I'm on the checkout page, when I click 'Apply Coupon' and enter a valid code, then the discount appears and the total updates." This precision prevents misunderstandings and makes testing straightforward.
          </p>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">Product Roadmaps</h2>
          <p className="mb-6">
            Roadmaps communicate your product strategy over time. Unlike detailed project plans, roadmaps show the big picture—what you're building, when, and why it matters.
          </p>
          <p className="mb-6">
            The best roadmaps are theme-based or outcome-focused rather than feature-committed. Instead of promising "advanced search functionality in Q2," articulate the goal: "improve content discoverability." This gives you flexibility in execution while maintaining strategic clarity.
          </p>
          <p className="mb-6">
            Include multiple time horizons. The current quarter might show specific features in development. The next two quarters might show planned initiatives or problem areas you'll address. Beyond that, indicate strategic themes or areas of exploration. This graduated specificity acknowledges increasing uncertainty over time.
          </p>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">Go-to-Market Documentation</h2>
          <p className="mb-6">
            Product launches require coordinating marketing, sales, customer success, and support teams. Go-to-market documents ensure everyone understands the product and their role in the launch.
          </p>
          <p className="mb-6">
            Launch plans outline timelines, responsibilities, and some dependencies across teams. When does marketing need final messaging? When should sales training happen? When do you notify existing customers? Map out the critical path and identify potential bottlenecks.
          </p>
          
          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">Documentation Best Practices</h2>
          <ul className="space-y-4">
             <li><strong>Know your audience:</strong> Engineers need technical detail; executives need business context.</li>
             <li><strong>Be concise and scannable:</strong> Use headers, bullet points, and white space to break up text. Front-load key information.</li>
             <li><strong>Keep it accessible:</strong> Use a central repository (Confluence, Notion, Google Docs) where teams know to look.</li>
             <li><strong>Maintain as you go:</strong> Outdated documentation is worse than none because it spreads misinformation.</li>
             <li><strong>Be visual:</strong> Diagrams often communicate relationships, flows, or architecture more clearly than paragraphs.</li>
          </ul>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">The Documentation Mindset</h2>
          <p className="mb-10">
            Great product managers develop a documentation mindset. They recognize that writing clarifies thinking, that documents create shared understanding, and that good documentation multiplies their impact by aligning teams asynchronously.
          </p>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h2 className="text-2xl font-black text-zinc-900 mb-8">Video Guides</h2>
           <div className="space-y-6">
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <MonitorPlay className="w-6 h-6 text-indigo-600" />
                 </div>
                 <div>
                    <h4 className="font-black text-zinc-900 tracking-tight">📺 PRODUCT STRATEGY & ROADMAP</h4>
                    <a href="https://youtu.be/cnp6Ck8OIiY?si=eJHw5hzcwuiZZyf0" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-indigo-600 underline">Watch Tutorial</a>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <MonitorPlay className="w-6 h-6 text-indigo-600" />
                 </div>
                 <div>
                    <h4 className="font-black text-zinc-900 tracking-tight">📺 GTM Strategy</h4>
                    <a href="https://youtu.be/eDVtBleIxag?si=mE-x6s3HPTloD13x" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-indigo-600 underline">Watch Tutorial</a>
                 </div>
              </div>
           </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
           <p></p>
           <p></p>
        </div>
      </div>
    ),
    assignment: (
      <div className="space-y-6 text-left">
        <h4 className="font-black text-indigo-900 mb-2 underline decoration-indigo-200 underline-offset-4">Assignment</h4>
        <p className="font-medium text-zinc-700 leading-relaxed">
          Create your own Product Requirements Document (PRD) using an AI co-pilot.
        </p>
        <a 
          href="https://www.chatprd.ai/" 
          target="_blank" 
          rel="noreferrer" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-colors"
        >
          Open ChatPRD <ExternalLink className="w-4 h-4" />
        </a>
        <div className="pt-4 border-t border-indigo-200">
          <p className="font-black text-indigo-900 uppercase text-xs tracking-widest mb-2">Goal</p>
          <p className="font-medium text-zinc-700">Practice translating a feature idea into a structured document that includes problem context, goals, and user requirements.</p>
        </div>
      </div>
    ),
    resources: [
        { title: "PRODUCT STRATEGY & ROADMAP", url: "https://youtu.be/cnp6Ck8OIiY?si=eJHw5hzcwuiZZyf0", type: "video" },
        { title: "GTM Strategy", url: "https://youtu.be/eDVtBleIxag?si=mE-x6s3HPTloD13x", type: "video" }
    ]
  },
  {
    day: 7,
    title: "Stakeholder Management: The Product Manager's Essential Guide",
    category: "Foundations",
    preview: "Stakeholder management isn't just important—it's the difference between shipping transformative products and watching promising ideas die in committee.",
    content: (
      <div className="space-y-10 text-left text-zinc-600">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 7: Stakeholder Management: The Product Manager's Essential Guide 🤝</h1>
        
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6 flex items-center gap-3">🎯 Learning Objectives</h2>
           <p className="text-sm font-bold text-indigo-500 mb-4 uppercase tracking-widest">By the end of Day 7, you will be able to:</p>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-indigo-700">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Identify and categorize stakeholders using influence/interest matrices</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Tailor communication strategies to different stakeholder needs</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Build coalitions rather than seeking universal consensus</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Manage executive relationships framing business outcomes</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Navigate conflict constructively using data debates</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Say no gracefully while preserving relationships</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Collaborate effectively with early engineering involvement</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Measure stakeholder management success indicators</li>
           </ul>
        </section>

        <section className="prose prose-zinc max-w-none">
          <p className="text-lg font-medium leading-relaxed italic border-l-4 border-indigo-600 pl-6 mb-10">
            "Product managers often joke that they have 'all the responsibility but none of the authority.' This paradox makes stakeholder management not just important—it's the difference between shipping transformative products and watching promising ideas die in committee."
          </p>

          <p className="mb-6">
            At its core, stakeholder management is the art and science of aligning diverse groups around a shared product vision while navigating competing priorities, limited resources, and organizational politics. For product managers, it's as fundamental as roadmap planning or user research.
          </p>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">Understanding Your Stakeholder Landscape</h2>
          <p className="mb-6">
            The first step in effective stakeholder management is mapping who actually matters to your product's success. Stakeholders typically fall into several categories: executives who control budgets and strategic direction, engineering teams who build your vision, designers who craft the experience, sales and marketing who bring products to market, customer success teams on the front lines, and of course, the customers themselves.
          </p>
          <p className="mb-6">
            Each group views your product through a different lens. Executives care about revenue impact and strategic positioning. Engineers worry about technical debt and feasibility. Sales needs competitive differentiation and clear messaging. This isn't a problem to solve but a reality to embrace. Your job isn't to make everyone think alike but to synthesize these perspectives into coherent product decisions.
          </p>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">The Power Map: Influence vs. Interest</h2>
          <p className="mb-6">
            Not all stakeholders deserve equal time. Create a simple two-by-two matrix plotting stakeholders by their influence over your product and their interest in it. Those with high influence and high interest are your key players who need regular engagement and input. Those with high influence but lower interest need enough information to stay supportive without overwhelming them with details. Those with high interest but lower influence groups can be valuable allies and advocates. Low on both dimensions might only need basic updates.
          </p>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">Communication: Tailored, Transparent, and Timely</h2>
          <p className="mb-6">
            The biggest mistake product managers make is using one-size-fits-all communication. Your engineering lead doesn't need the same update as your CFO. Tailor your message to what each stakeholder cares about and the level of detail they need.
          </p>
          <p className="mb-6">
            Transparency builds trust, even when delivering bad news. If a feature is slipping or a metric missed its target, share it early with context and a plan. Stakeholders can handle setbacks; they can't handle surprises.
          </p>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">Building Coalitions, Not Consensus</h2>
          <p className="mb-6">
            Here's a liberating truth: you don't need everyone to agree. Seeking universal consensus leads to watered-down products that please no one. Instead, build coalitions around decisions. Identify your champions who will advocate alongside you. Find common ground with skeptics rather than trying to convert them entirely.
          </p>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">Managing Up: Your Executive Stakeholders</h2>
          <p className="mb-6">
            Executives control resources, remove roadblocks, and provide air cover for bold bets. Managing up effectively means making their jobs easier while advancing your product goals. Come prepared with recommendations, not just problems. Frame choices in terms of business outcomes they care about.
          </p>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">The Delicate Dance with Engineering</h2>
          <p className="mb-6">
            Product and engineering partnerships make or break execution. The best product managers treat engineers as collaborators, not order-takers. Involve them early in problem framing before jumping to solutions. Respect technical constraints while pushing for creative approaches.
          </p>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">Saying No Gracefully</h2>
          <p className="mb-6">
            Product managers must say no constantly. The key is saying no in a way that preserves relationships. Ground refusals in strategy and data rather than personal preference. Instead of "we can't do that," try "here's where that sits against our priorities."
          </p>

          <h2 className="text-2xl font-black text-zinc-900 mt-12 mb-6">Navigating Conflict and Disagreement</h2>
          <p className="mb-10">
            Conflict is inevitable when passionate people care about product direction. Healthy conflict focused on ideas improves outcomes. When disagreements arise, seek first to understand the underlying concern. Address the root issue, not just the surface request.
          </p>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h2 className="text-2xl font-black text-zinc-900 mb-8">Course Resources</h2>
           <div className="space-y-6">
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <MonitorPlay className="w-6 h-6 text-indigo-600" />
                 </div>
                 <div>
                    <h4 className="font-black text-zinc-900 tracking-tight">📺 Communicating and Working with Stakeholders</h4>
                    <a href="https://youtu.be/jz7tPVDwb50?si=71B7Acqz6U2F0XA8" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-indigo-600 underline">Watch Masterclass</a>
                 </div>
              </div>
           </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
           <p></p>
           <p></p>
        </div>
      </div>
    ),
    resources: [
        { title: "Communicating and Working with Stakeholders", url: "https://youtu.be/jz7tPVDwb50?si=71B7Acqz6U2F0XA8", type: "video" }
    ]
  },
  {
    day: 30,
    title: 'Prompt Engineering for Product Managers',
    category: 'AI',
    preview: 'Learn how to write effective prompts so that LLMs return useful, reliable, and actionable outputs — a must-have skill for PMs.',
    content: (
      <div className="space-y-10 text-left">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 30: Prompt Engineering for Product Managers ✍️</h1>
        
        <section className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100">
           <h2 className="text-2xl font-black text-orange-900 mb-4">Today’s Goal</h2>
           <p className="text-orange-800 font-medium leading-relaxed">
             Learn how to write effective prompts so that large language models (LLMs) return useful, reliable, and actionable outputs — a must-have skill for product managers working with AI-enabled workflows, prototypes, and documentation.
           </p>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">🎯 Learning Objectives</h2>
           <p className="text-sm font-bold text-zinc-500 mb-4 uppercase tracking-widest">By the end of Day 30, you will be able to:</p>
           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-zinc-700">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Define prompt engineering and why it matters for PMs</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Structure prompts for clarity, context, and constraints</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Use prompting patterns (instructions, examples, chain-of-thought)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Evaluate and refine prompts for consistency and accuracy</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Apply prompting to common PM tasks (user stories, specs, analyses)</li>
           </ul>
        </section>

        <section className="space-y-8">
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
              <h2 className="text-2xl font-black text-zinc-900 mb-4">1. What Is Prompt Engineering?</h2>
              <p className="text-zinc-600 font-medium leading-relaxed">
                Prompt Engineering is the practice of crafting inputs (prompts) so that a language model produces outputs that are:
              </p>
              <div className="flex gap-4 mt-4">
                 {['Relevant', 'Accurate', 'Actionable'].map(tag => (
                   <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest">{tag}</span>
                 ))}
              </div>
           </div>

           <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white">
              <h3 className="font-black text-indigo-400 text-[10px] uppercase tracking-widest mb-6">For PMs, prompt engineering accelerates:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[
                   'Ideation',
                   'Specification writing',
                   'Data interpretation',
                   'User research synthesis',
                   'Competitive analysis'
                 ].map(item => (
                   <div key={item} className="flex items-center gap-3 font-bold text-zinc-300 text-[11px]">
                      <Zap className="w-3 h-3 text-indigo-400" />
                      <span>{item}</span>
                   </div>
                 ))}
              </div>
              <p className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10 italic text-zinc-400">
                 🧠 <strong>Insight:</strong> It’s not about memorizing commands — it’s about clear thinking expressed as structured instructions.
              </p>
           </div>
        </section>

        <section className="p-10 bg-zinc-50 border border-zinc-200 rounded-[3rem]">
           <h2 className="text-2xl font-black text-zinc-900 mb-8">Cover: Foundations + Practical Prompting</h2>
           
           {/* Embedded Video Player */}
           <div className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 mb-10">
              <div className="bg-zinc-800/50 px-4 py-3 flex items-center justify-between border-b border-zinc-700/50">
                  <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Featured Lesson</span>
                  </div>
                  <MonitorPlay className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="aspect-video w-full">
                  <iframe 
                      src="https://www.youtube.com/embed/ysPbXH0LpIE" 
                      className="w-full h-full" 
                      title="Prompting 101" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen 
                  />
              </div>
           </div>

           <div className="space-y-6">
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <MonitorPlay className="w-6 h-6 text-indigo-600" />
                 </div>
                 <div>
                    <h4 className="font-black text-zinc-900 tracking-tight">📺 Prompting 101 Video</h4>
                    <a href="https://youtu.be/ysPbXH0LpIE?si=5Riv7IB9ezFAt_Kc" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-indigo-600 underline">Watch Tutorial</a>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-indigo-600" />
                 </div>
                 <div>
                    <h4 className="font-black text-zinc-900 tracking-tight">📜 AWS Prompt Engineering Foundation (with Certificate)</h4>
                    <a href="https://share.google/FdZPEVTPVCkN85d33" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-indigo-600 underline">View Course</a>
                 </div>
              </div>
           </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
           <p>Previous: LLM</p>
           <p>Up next: CONTEXT ENGINEERING</p>
        </div>
      </div>
    )
  },
  {
    day: 31,
    title: 'CONTEXT ENGINEERING',
    category: 'AI',
    preview: 'The natural progression of prompt engineering. Managing tokens (information) during LLM inference.',
    content: (
      <div className="space-y-10 text-left">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 text-left">Day 31: CONTEXT ENGINEERING 🧠</h1>
        
        <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100 text-left">
           <h2 className="text-2xl font-black text-blue-900 mb-4 text-left">What is Context?</h2>
           <p className="text-blue-800 font-medium leading-relaxed mb-6 text-left">Context refers to the set of tokens included when sampling from a large-language model (LLM)</p>

           <h2 className="text-2xl font-black text-blue-900 mb-4 text-left">What is Context Engineering?</h2>
           <p className="text-blue-800 font-medium leading-relaxed mb-6 text-left">
             It is the natural progression of prompt engineering. Context engineering refers to the set of strategies for curating and maintaining the optimal set of tokens (information) during LLM inference, including all the other information that may land there outside of the prompts
           </p>
           <p className="text-blue-800 font-medium leading-relaxed text-left">
             LLMs are like a new kind of operating system. The LLM is like the CPU and its context window is like the RAM, serving as the model’s working memory. Just like RAM, the LLM context window has limited capacity to handle various sources of context. And just as an operating system curates what fits into a CPU’s RAM, we can think about “context engineering” playing a similar role
           </p>
        </section>

        <section className="text-left">
           <h2 className="text-2xl font-black text-zinc-900 mb-6 text-left">What are the types of context that we need to manage when building LLM applications?</h2>
           <p className="text-zinc-600 font-medium mb-6 text-left">Context engineering as an umbrella that applies across a few different context types:</p>
           <ul className="space-y-3 text-sm font-bold text-zinc-700 text-left list-disc pl-5">
              <li className="text-left"><strong>Instructions</strong> – prompts, memories, few‑shot examples, tool descriptions, etc</li>
              <li className="text-left"><strong>Knowledge</strong> – facts, memories, etc</li>
              <li className="text-left"><strong>Tools</strong> – feedback from tool calls</li>
           </ul>
        </section>

        <section className="text-left">
           <h2 className="text-2xl font-black text-zinc-900 mb-6 text-left">Context engineering vs. prompt engineering</h2>
           <p className="text-zinc-600 font-medium leading-relaxed mb-4 text-left">
             The primary focus of prompt engineering is how to write effective prompts, particularly system prompts. However, as we move towards engineering more capable agents that operate over multiple turns of inference and longer time horizons, we need strategies for managing the entire context state (system instructions, tools, Model Context Protocol (MCP), external data, message history, etc).
           </p>
           <p className="text-zinc-600 font-medium leading-relaxed text-left">
             An agent running in a loop generates more and more data that could be relevant for the next turn of inference, and this information must be cyclically refined. Context engineering is the art and science of curating what will go into the limited context window from that constantly evolving universe of possible information.
           </p>
        </section>

        <section className="bg-zinc-900 text-white p-10 rounded-[3rem] text-left">
           <h2 className="text-2xl font-black mb-6 text-indigo-400 text-left">Why is context engineering important to building capable agents?</h2>
           <div className="space-y-6 text-zinc-400 font-medium leading-relaxed text-left">
             <p>Despite their speed and ability to manage larger and larger volumes of data, it is observed that LLMs, like humans, lose focus or experience confusion at a certain point. Studies on needle-in-a-haystack style benchmarking have uncovered the concept of context rot: as the number of tokens in the context window increases, the model’s ability to accurately recall information from that context decreases.</p>
             <p>While some models exhibit more gentle degradation than others, this characteristic emerges across all models. Context, therefore, must be treated as a finite resource with diminishing marginal returns. Like humans, who have limited working memory capacity, LLMs have an “attention budget” that they draw on when parsing large volumes of context. Every new token introduced sprinkles this budget by some amount, increasing the need to carefully curate the tokens available to the LLM.</p>
             <p>This attention scarcity stems from architectural constraints of LLMs. LLMs are based on the transformer architecture, which enables every token to attend to every other token across the entire context. This results in n² pairwise relationships for n tokens.</p>
             <p>As its context length increases, a model's ability to capture these pairwise relationships gets stretched thin, creating a natural tension between context size and attention focus. Additionally, models develop their attention patterns from training data distributions where shorter sequences are typically more common than longer ones. This means models have less experience with, and fewer specialized parameters for, context-wide dependencies.</p>
             <p>Techniques like position encoding interpolation allow models to handle longer sequences by adapting them to the originally trained smaller context, though with some degradation in token position understanding. These factors create a performance gradient rather than a hard cliff: models remain highly capable at longer contexts but may show reduced precision for information retrieval and long-range reasoning compared to their performance on shorter contexts.</p>
             <p>These realities mean that thoughtful context engineering is essential for building capable agents.</p>
           </div>
        </section>

        <section className="text-left">
           <h2 className="text-2xl font-black text-zinc-900 mb-8 text-left">Common Strategies for agent context engineering</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm text-left">
                 <h3 className="font-black text-indigo-600 mb-4 uppercase tracking-widest text-[10px] text-left">1. Write Context</h3>
                 <p className="text-[11px] text-zinc-500 font-bold leading-relaxed mb-4 text-left">Writing context means saving it outside the context window to help an agent perform a task. Agents take note via a “scratchpad” to persist information while it is performing a task. The idea is to save information outside of the context window so that it’s available to the agent. Scratchpads can be implemented in a few different ways. They can be a tool call that simply writes to a file. They can also be a field in a runtime state object that persists during the session. In either case, scratchpads let agents save useful information to help them accomplish a task.</p>
                 <p className="text-[11px] text-zinc-500 font-bold leading-relaxed text-left"><strong>Memories:</strong> Scratchpads help agents solve a task within a given session (or thread), but sometimes agents benefit from remembering things across many sessions! Reflexion introduced the idea of reflection following each agent turn and re-using these self-generated memories. Generative Agents created memories synthesized periodically from collections of past agent feedback.</p>
              </div>
              <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm text-left">
                 <h3 className="font-black text-indigo-600 mb-4 uppercase tracking-widest text-[10px] text-left">2. Select Context</h3>
                 <p className="text-[11px] text-zinc-500 font-bold leading-relaxed mb-4 text-left">Selecting context means pulling it into the context window to help an agent perform a task.</p>
                 <p className="text-[11px] text-zinc-500 font-bold leading-relaxed mb-4 text-left"><strong>Scratchpad:</strong> The mechanism for selecting context from a scratchpad depends upon how the scratchpad is implemented. If it’s a tool, then an agent can simply read it by making a tool call. If it’s part of the agent’s runtime state, then the developer can choose what parts of state to expose to an agent each step. This provides a fine-grained level of control for exposing scratchpad context to the LLM at later turns.</p>
                 <p className="text-[11px] text-zinc-500 font-bold leading-relaxed text-left"><strong>Memories:</strong> If agents have the ability to save memories, they also need the ability to select memories relevant to the task they are performing. This can be useful for a few reasons. Agents might select few-shot examples (episodic memories) for examples of desired behavior, instructions (procedural memories) to steer behavior, or facts (semantic memories) for task-relevant context.</p>
              </div>
              <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm text-left">
                 <h3 className="font-black text-indigo-600 mb-4 uppercase tracking-widest text-[10px] text-left">3. Compressing Context</h3>
                 <p className="text-[11px] text-zinc-500 font-bold leading-relaxed mb-4 text-left">Compressing context involves retaining only the tokens required to perform a task.</p>
                 <p className="text-[11px] text-zinc-500 font-bold leading-relaxed text-left"><strong>Context Summarization:</strong> Agent interactions can span hundreds of turns and use token-heavy tool calls. Summarization is one common way to manage these challenges.</p>
              </div>
              <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm text-left">
                 <h3 className="font-black text-indigo-600 mb-4 uppercase tracking-widest text-[10px] text-left">4. Isolating Context</h3>
                 <p className="text-[11px] text-zinc-500 font-bold leading-relaxed mb-4 text-left">Isolating context involves splitting it up to help an agent perform a task.</p>
                 <p className="text-[11px] text-zinc-500 font-bold leading-relaxed mb-4 text-left"><strong>Multi-agent:</strong> One of the most popular ways to isolate context is to split it across sub-agents. A motivation for the OpenAI Swarm library was separation of concerns, where a team of agents can handle specific sub-tasks. Each agent has a specific set of tools, instructions, and its own context window.</p>
              </div>
           </div>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200 text-left">
           <h2 className="text-2xl font-black text-zinc-900 mb-8 text-left">Example Use Case: AI Interview Coach</h2>
           <p className="text-zinc-600 font-medium mb-8 text-left">Let’s say we’re designing an AI Interview Coach that helps users practice product management interviews by asking them realistic questions, evaluating their answers, and giving feedback.</p>
           
           <div className="space-y-12 text-left">
              <div className="text-left">
                 <h4 className="font-black text-indigo-600 mb-2 text-left">1. Write Context</h4>
                 <p className="text-sm text-zinc-600 font-medium mb-4 text-left">Definition: Writing context means explicitly defining the role, task, goals, constraints, and output format inside the context window — so the agent knows exactly who it is and what to do.</p>
                 <div className="bg-zinc-900 p-6 rounded-xl font-mono text-[11px] text-zinc-400 text-left leading-relaxed">
                   [ROLE] You are an AI Interview Coach specializing in Product Management interviews.<br/><br/>
                   [TASK] Your goal is to simulate an interviewer by asking one question at a time, evaluating the candidate's response, and giving short, actionable feedback.<br/><br/>
                   [BEHAVIOR]<br/>
                   - Be encouraging but honest.<br/>
                   - Avoid generic praise; focus on concrete improvement points.<br/>
                   - Keep each feedback under 80 words.<br/><br/>
                   [OUTPUT FORMAT]<br/>
                   Return your responses in the following JSON format:<br/>
                   {"{"} "question": "...", "evaluation": "...", "feedback": "..." {"}"}
                 </div>
                 <p className="text-[10px] font-black text-indigo-600 mt-2 uppercase tracking-widest text-left">💡 Why this matters: This “written context” gives the model full clarity on its identity, mission, and response structure, without needing prior sessions or memories.</p>
              </div>

              <div className="text-left">
                 <h4 className="font-black text-indigo-600 mb-2 text-left">2. Select Context</h4>
                 <p className="text-sm text-zinc-600 font-medium mb-4 text-left">Definition: Selecting context means choosing what past or external information to reintroduce into the context window during each new turn.</p>
                 <p className="text-sm text-zinc-600 font-medium mb-4 text-left">In Our Example: As the user interacts with the AI Coach across multiple turns (say 10–15 questions), we don’t want to overload the context window with all prior Q&A. So we selectively pull only what’s relevant: The latest user answer, The previous question, A short summary of feedback so far.</p>
                 <div className="bg-zinc-900 p-6 rounded-xl font-mono text-[11px] text-zinc-400 text-left leading-relaxed">
                   [SELECTED CONTEXT]<br/>
                   Previous question: “How do you prioritize features in a product roadmap?”<br/>
                   User’s answer: “I use RICE scoring to align with business goals.”<br/>
                   Last feedback summary: “Good framework usage, try adding more customer empathy.”<br/><br/>
                   [NEW INSTRUCTION]<br/>
                   Ask the next question based on their previous answers to maintain progression.
                 </div>
                 <p className="text-[10px] font-black text-indigo-600 mt-2 uppercase tracking-widest text-left">💡 Why this matters: The agent doesn’t need to see the entire transcript — just the context required for continuity and personalization.</p>
              </div>

              <div className="text-left">
                 <h4 className="font-black text-indigo-600 mb-2 text-left">3. Compressing Context</h4>
                 <p className="text-sm text-zinc-600 font-medium mb-4 text-left">Definition: Compressing context means shortening or summarizing what’s included in the context window so the model stays within token limits while retaining meaning.</p>
                 <p className="text-sm text-zinc-600 font-medium mb-4 text-left">In Our Example: After 10–15 questions, the agent can summarize the interaction history:</p>
                 <div className="bg-zinc-900 p-6 rounded-xl font-mono text-[11px] text-zinc-400 text-left leading-relaxed">
                   [COMPRESSED CONTEXT]<br/>
                   Summary so far:<br/>
                   - Candidate strong in frameworks (RICE, Kano)<br/>
                   - Needs to improve in product metrics articulation<br/>
                   - Good storytelling but lacks data-driven validation
                 </div>
                 <p className="text-[10px] font-black text-indigo-600 mt-2 uppercase tracking-widest text-left">💡 Why this matters: Keeps the model efficient and focused on the user’s learning trajectory instead of wasting tokens on old details.</p>
              </div>

              <div className="text-left">
                 <h4 className="font-black text-indigo-600 mt-2 uppercase tracking-widest text-left">💡 Why this matters: Prevents context clutter, improves reasoning quality, and mirrors real-world modular architectures (like OpenAI Swarm or CrewAI).</h4>
              </div>
           </div>
        </section>

        <p className="text-[10px] text-zinc-400 mt-8 text-left italic">Task: <a href="https://www.blog.langchain.com/context-engineering-for-agents/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Read this</a></p>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400 text-left mt-8">
           <p className="text-left">Previous: Prompt engineering</p>
           <p className="text-left">Up next: RAG</p>
        </div>
      </div>
    )
  },
  {
    day: 32,
    title: 'Retrieval Augmented Generation (RAG)',
    category: 'AI',
    preview: 'One of the most powerful applications enabled by LLMs is sophisticated question-answering (Q&A) chatbots.',
    content: (
      <div className="space-y-10 text-left">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 text-left">Day 32: Retrieval Augmented Generation (RAG) 🔗</h1>
        
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100 text-left">
           <p className="text-lg font-medium text-zinc-700 leading-relaxed mb-6 text-left">
             One of the most powerful applications enabled by LLMs is sophisticated question-answering (Q&A) chatbots. These are applications that can answer questions about specific source information. These applications use a technique known as Retrieval Augmented Generation, or RAG.
           </p>
           
           <h3 className="text-xl font-black text-indigo-900 mb-4 text-left">Let’s understand it with the help of examples:</h3>
           <p className="text-zinc-600 font-medium mb-4 text-left">
             When an LLM, such as ChatGPT, is asked a question about private data—like a company’s reimbursement policy—it cannot access that private document. In this situation, the LLM lacks the necessary context and will typically hallucinate (provide an incorrect or generic answer).
           </p>
           <p className="text-zinc-600 font-medium text-left">
             In such a scenario we will give the entire office policy document/content to ChatGPT and then it will be able to refer to the company’s reimbursement policy and answer the asked question.
           </p>
        </section>

        <section className="text-left">
           <h2 className="text-2xl font-black text-zinc-900 mb-8 flex items-center gap-3 text-left">
             <Layers className="text-indigo-600" />
             The Three Components of RAG
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { label: 'Retrieval (R)', desc: 'The part where the system looks up internal documents (or external knowledge bases) and retrieves relevant information.' },
                { label: 'Augmenting (A)', desc: 'Using retrieved info to improve/augment the user’s prompt before it is sent to the LLM.' },
                { label: 'Generation (G)', desc: 'The final step where the LLM generates a response based on context provided in the augmented prompt.' }
              ].map((comp, i) => (
                <div key={i} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm text-left">
                   <h4 className="font-black text-indigo-600 mb-3 uppercase tracking-widest text-xs text-left">{comp.label}</h4>
                   <p className="text-sm text-zinc-500 font-bold leading-relaxed text-left">{comp.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200 overflow-x-auto text-left">
           <h2 className="text-2xl font-black text-zinc-900 mb-8 text-left">RAG VS fine tuning VS Prompt Engineering</h2>
           <table className="min-w-full text-sm font-medium">
              <thead>
                 <tr className="border-b-2 border-zinc-200 text-zinc-400 font-black uppercase text-[10px] tracking-widest text-left">
                    <th className="pb-4 pr-4 text-left">Strategy</th>
                    <th className="pb-4 pr-4 text-left">Purpose</th>
                    <th className="pb-4 pr-4 text-left">Mechanism</th>
                    <th className="pb-4 text-left">Example Use Case</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                 <tr>
                    <td className="py-6 pr-4 font-black text-indigo-600 text-left">RAG</td>
                    <td className="py-6 pr-4 text-zinc-600 text-left">Get accurate responses by retrieving current info dynamically.</td>
                    <td className="py-6 pr-4 text-zinc-500 text-left">Retrieves relevant external docs and adds them to user prompt.</td>
                    <td className="py-6 text-zinc-500 italic text-left">"What is the reimbursement policy for home office setup?" Searches private policy docs.</td>
                 </tr>
                 <tr>
                    <td className="py-6 pr-4 font-black text-purple-600 text-left">Fine Tuning</td>
                    <td className="py-6 pr-4 text-zinc-600 text-left">Impart stable, unchanging patterns like style, tone, and language.</td>
                    <td className="py-6 pr-4 text-zinc-600 text-left">Retraining model on hundreds of specific sample Q&As.</td>
                    <td className="py-6 text-zinc-500 italic text-left">Building a "policy co-pilot" that responds in the authoritative voice of the CEO.</td>
                 </tr>
                 <tr>
                    <td className="py-6 pr-4 font-black text-emerald-600 text-left">Prompt Engineering</td>
                    <td className="py-6 pr-4 text-zinc-600 text-left">Apply restrictions and behavioral behavioral rules (the "rule book").</td>
                    <td className="py-6 pr-4 text-zinc-500 text-left">Providing strict instructions to control behavior.</td>
                    <td className="py-6 text-zinc-500 italic text-left">Instructing LLM to "never reveal confidential details" or "redirect salary queries to HR."</td>
                 </tr>
              </tbody>
           </table>
        </section>

        <section className="space-y-12 text-left">
           <div>
              <h2 className="text-2xl font-black text-zinc-900 mb-6 text-left">Keyword search</h2>
              <p className="text-zinc-600 font-medium leading-relaxed mb-6 text-left">
                A traditional approach based on <strong>exact word matches</strong>. If a user's query does not contain the specific term found in a document, the search is likely to fail. Popular implementations include <strong>TF-IDF</strong> and <strong>BM25</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                 <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100 text-left">
                    <h4 className="font-black text-red-900 mb-2 text-left">Lack of Understanding</h4>
                    <p className="text-xs text-red-700 font-bold text-left">Fails if user uses synonyms (e.g., "allowance" vs "reimbursement").</p>
                 </div>
                 <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100 text-left">
                    <h4 className="font-black text-red-900 mb-2 text-left">Poor Context</h4>
                    <p className="text-xs text-red-700 font-bold text-left">Pure word frequency doesn't capture semantic relationships.</p>
                 </div>
              </div>
           </div>

           <div>
              <h2 className="text-2xl font-black text-zinc-900 mb-6 text-left">Semantic Search</h2>
              <p className="text-zinc-600 font-medium leading-relaxed mb-6 text-left">
                Searches documents based on the <strong>meaning</strong> of words. This is enabled by <strong>embeddings</strong>, where text is converted into mathematical vectors representing semantic context.
              </p>
              <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden text-left">
                 <div className="absolute top-0 right-0 p-6 opacity-10"><RefreshCcw className="w-32 h-32" /></div>
                 <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest mb-6 text-left">How it works</h4>
                 <ul className="space-y-4 text-sm font-bold text-left">
                    <li className="flex gap-3 text-left"><CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> Conversion: Text converted to arrays of numbers (vectors).</li>
                    <li className="flex gap-3 text-left"><CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> Plotting: Similar meanings end up close together in vector space.</li>
                    <li className="flex gap-3 text-left"><CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> Distance: Similarity is measured by vector distance (closer = more similar).</li>
                 </ul>
              </div>
           </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm text-left">
              <h3 className="text-xl font-black text-zinc-900 mb-6 text-left">Vector Database</h3>
              <p className="text-sm text-zinc-500 font-bold leading-relaxed mb-8 text-left">
                Specialized DB designed to efficiently store and search vectors at scale. Instead of comparing query to every doc (naive way), it uses algorithms like <strong>HNSW (Hierarchical Navigable Small World)</strong> to search specific "neighborhoods."
              </p>
              <div className="flex gap-3 text-left">
                 <span className="px-3 py-1 bg-zinc-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">ChromaDB</span>
                 <span className="px-3 py-1 bg-zinc-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">Pinecone</span>
              </div>
           </div>
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm text-left">
              <h3 className="text-xl font-black text-zinc-900 mb-6 text-left">Chunking</h3>
              <p className="text-sm text-zinc-500 font-bold leading-relaxed mb-8 text-left">
                The process of breaking large docs into smaller, focused pieces. Solves the <strong>precision problem</strong> (getting 1 paragraph vs a 50-page manual). Common strategies include fixed-size chunks with <strong>overlap</strong> (e.g., 500 chars + 50 char overlap) to preserve context.
              </p>
           </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400 text-left">
           <p className="text-left">Previous: context engineering</p>
           <p className="text-left">Up next: mcp</p>
        </div>
      </div>
    ),
    resources: [
        { title: "Watch: How RAG Works", url: "https://youtu.be/fZM3oX4xEyg?si=rlzSJm9TAbqikv7o", type: "video" }
    ]
  },
  {
    day: 33,
    title: 'Model Context Protocol (MCP)',
    category: 'AI',
    preview: 'Learn about the open-source standard for connecting AI applications to external data sources and tools.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 33: What is the Model Context Protocol (MCP)? 🔌</h1>
        
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <p className="text-lg font-medium text-indigo-900 leading-relaxed mb-6">
             MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems. Using MCP, AI applications like Claude or ChatGPT can connect to data sources (e.g. local files, databases), tools (e.g. search engines, calculators) and workflows (e.g. specialized prompts)—enabling them to access key information and perform tasks.
           </p>
           <div className="bg-white/60 p-6 rounded-2xl border border-indigo-200 flex items-start gap-4 mb-8">
              <Zap className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
              <p className="text-sm font-bold text-indigo-800">
                <strong>Analogy:</strong> Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect electronic devices, MCP provides a standardized way to connect AI applications to external systems.
              </p>
           </div>
        </section>

        <section className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-900">Why does MCP Exist?</h2>
           <p className="text-zinc-600 font-medium">Traditional LLMs operate within a fixed context window &mdash; they only &ldquo;know&rdquo; what&rsquo;s inside the current prompt. However, in real-world applications, models need access to:</p>
           <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <li className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-2">
                 <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 font-black text-xs">01</div>
                 <p className="text-sm font-bold text-zinc-700">Private company data (e.g., customer tickets, sales reports)</p>
              </li>
              <li className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-2">
                 <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 font-black text-xs">02</div>
                 <p className="text-sm font-bold text-zinc-700">APIs and tools (e.g., Jira, Slack, Notion)</p>
              </li>
              <li className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-2">
                 <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 font-black text-xs">03</div>
                 <p className="text-sm font-bold text-zinc-700">Dynamic or structured context (e.g., user preferences, codebases)</p>
              </li>
           </ul>
           <p className="text-zinc-600 font-medium mt-4">RAG (Retrieval-Augmented Generation) and Plugins/APIs tried to solve this, but they each have limitations:</p>
           <ul className="list-disc pl-8 space-y-2 text-sm font-medium text-zinc-500">
             <li>RAG: only provides text chunks; limited interactivity</li>
             <li>Plugins: difficult to standardize, manage security, and reuse</li>
             <li>Ad-hoc APIs: brittle integrations and lack of visibility</li>
           </ul>
           <p className="text-zinc-600 font-medium mt-4">Hence, MCP (Model Context Protocol) was introduced by Anthropic to standardize how models communicate with tools and context providers safely and modularly.</p>

           <div className="bg-zinc-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden mt-8">
             <div className="absolute top-0 right-0 p-8 opacity-10"><RefreshCcw className="w-32 h-32" /></div>
             <h4 className="text-indigo-400 font-black mb-6 uppercase tracking-widest text-xs">The Power of Reusability</h4>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <p className="text-sm font-medium text-zinc-300 leading-relaxed">MCP servers are reusable across various AI applications. Build a "Google Drive MCP Server" once, and any compatible assistant or agent can use it immediately.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs font-bold"><CheckCircle className="w-4 h-4 text-indigo-400" /> Developers: Reduced complexity & time.</li>
                    <li className="flex items-center gap-2 text-xs font-bold"><CheckCircle className="w-4 h-4 text-indigo-400" /> Apps: Ecosystem of plug-and-play tools.</li>
                    <li className="flex items-center gap-2 text-xs font-bold"><CheckCircle className="w-4 h-4 text-indigo-400" /> End-users: More capable, action-oriented agents.</li>
                  </ul>
                </div>
             </div>
           </div>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h3 className="text-xl font-black text-zinc-900 mb-6 uppercase tracking-widest text-sm">What can MCP enable?</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Agents can access your Google Calendar and Notion, acting as a personalized AI assistant.",
                "Claude Code can generate an entire web app using a Figma design.",
                "Enterprise chatbots can connect to multiple databases across an organization.",
                "AI models can create 3D designs on Blender and print them out using a 3D printer."
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start bg-white p-4 rounded-2xl border border-zinc-100">
                   <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                   <p className="text-xs font-bold text-zinc-600 leading-relaxed">{item}</p>
                </div>
              ))}
           </div>
        </section>

        <section>
           <h2 className="text-2xl font-black text-zinc-900 mb-8">Client-Server Architecture in MCP</h2>
           <p className="text-zinc-500 font-bold mb-10">The architecture consists of three main entities: the Host, the Client, and the Server.</p>
           
           <div className="mb-12">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
                   <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-white font-black">S</div>
                   <h4 className="font-black text-zinc-900">MCP Server</h4>
                   <p className="text-xs text-zinc-500 font-medium leading-relaxed">Servers are lightweight programs that expose tools, resources, and prompts to the client.</p>
                </div>
                <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
                   <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black">C</div>
                   <h4 className="font-black text-zinc-900">MCP Client</h4>
                   <p className="text-xs text-zinc-500 font-medium leading-relaxed">Maintain connections with servers. Job: find resources/tools and take advantage of them.</p>
                </div>
                <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
                   <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black">H</div>
                   <h4 className="font-black text-zinc-900">Host</h4>
                   <p className="text-xs text-zinc-500 font-medium leading-relaxed">The LLM application (e.g. Claude AI) that stores and maintains all clients and server connections.</p>
                </div>
             </div>
           </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
           <p>Previous: RAG</p>
           <p>Up next: Agent workflow</p>
        </div>
      </div>
    ),
    resources: [
        { title: "Watch: MCP Overview Video", url: "https://youtu.be/-UQ6OZywZ2I?si=9jFH6C88ScZLR3bl", type: "video" }
    ]
  },
  {
    day: 34,
    title: 'Introduction to Agent Workflow',
    category: 'AI',
    preview: 'Master the architecture of agentic systems: planning, reasoning, and iterative task execution.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 34: Introduction to Agent Workflow 🤖</h1>
        
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6">What Is an Agentic AI Workflow?</h2>
           <p className="text-indigo-800 font-medium leading-relaxed mb-6">
             An agentic AI workflow is a process where an AI system executes a series of steps—often iteratively—to complete a task. This mimics complex human problem-solving: <strong>planning &plusmn; researching &plusmn; synthesizing &plusmn; reviewing &plusmn; revising.</strong>
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/60 p-4 rounded-2xl border border-indigo-100">
                 <h4 className="font-black text-indigo-900 mb-1 text-xs uppercase tracking-widest">Iterative</h4>
                 <p className="text-[10px] font-bold text-indigo-700">Loops through reflection and improvement stages.</p>
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-indigo-100">
                 <h4 className="font-black text-indigo-900 mb-1 text-xs uppercase tracking-widest">Decomposed</h4>
                 <p className="text-[10px] font-bold text-indigo-700">Complex jobs are broken into atomic, manageable steps.</p>
              </div>
              <div className="bg-white/60 p-4 rounded-2xl border border-indigo-100">
                 <h4 className="font-black text-indigo-900 mb-1 text-xs uppercase tracking-widest">Autonomous</h4>
                 <p className="text-[10px] font-bold text-indigo-700">Grants AI greater decision-making power over classical prompting.</p>
              </div>
           </div>
        </section>

        <section className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-900">Task Decomposition in Practice</h2>
           <div className="overflow-hidden rounded-[2.5rem] border border-zinc-200">
              <table className="min-w-full bg-white">
                 <thead className="bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest">
                    <tr>
                       <th className="px-6 py-4">Use Case</th>
                       <th className="px-6 py-4">High-Level Workflow Steps</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-zinc-100 text-sm font-medium text-zinc-600">
                    <tr>
                       <td className="px-6 py-4 font-black text-zinc-900">Essay Writing</td>
                       <td className="px-6 py-4">Outline &rarr; Search web &rarr; Analyze &rarr; Draft &rarr; Reflect &rarr; Revise</td>
                    </tr>
                    <tr>
                       <td className="px-6 py-4 font-black text-zinc-900">Invoice Process</td>
                       <td className="px-6 py-4">PDF to text &rarr; Type check &rarr; Extraction &rarr; DB update</td>
                    </tr>
                    <tr>
                       <td className="px-6 py-4 font-black text-zinc-900">Customer Service</td>
                       <td className="px-6 py-4">Extract info &rarr; Query DB &rarr; Draft reply &rarr; Review/Send</td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </section>

        <section>
           <h2 className="text-2xl font-black text-zinc-900 mb-8">Degrees of Autonomy</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all">
                 <span className="text-zinc-400 font-black text-xs uppercase tracking-widest block mb-4">Level 01</span>
                 <h4 className="text-lg font-black text-zinc-900 mb-4">Less Autonomous</h4>
                 <p className="text-xs text-zinc-500 font-bold leading-relaxed">Steps predefined by devs. Tools are hard-coded. Useful for well-structured queries like order status.</p>
              </div>
              <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all">
                 <span className="text-indigo-400 font-black text-xs uppercase tracking-widest block mb-4">Level 02</span>
                 <h4 className="text-lg font-black text-zinc-900 mb-4">Semi-Autonomous</h4>
                 <p className="text-xs text-zinc-500 font-bold leading-relaxed">Tools are predefined but AI decides which to use for a given context and sequences them.</p>
              </div>
              <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all">
                 <span className="text-emerald-400 font-black text-xs uppercase tracking-widest block mb-4">Level 03</span>
                 <h4 className="text-lg font-black text-zinc-900 mb-4">Highly Autonomous</h4>
                 <p className="text-xs text-zinc-500 font-bold leading-relaxed">LLM plans workflows dynamically. May generate new functions or gather more context as needed.</p>
              </div>
           </div>
        </section>

        <section className="bg-zinc-950 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-8 text-indigo-400 uppercase tracking-widest text-xs">AI Design Patterns</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-6">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10"><RefreshCcw className="text-indigo-300" /></div>
                 <div>
                    <h5 className="font-black mb-1">Reflection</h5>
                    <p className="text-xs text-zinc-400 font-medium">AI reviews and critiques its own outputs to improve subsequent versions.</p>
                 </div>
              </div>
              <div className="flex gap-6">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10"><Hammer className="text-emerald-300" /></div>
                 <div>
                    <h5 className="font-black mb-1">Tool Use</h5>
                    <p className="text-xs text-zinc-400 font-medium">AI is empowered to call external APIs for web search, DB queries, or code execution.</p>
                 </div>
              </div>
              <div className="flex gap-6">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10"><Map className="text-amber-300" /></div>
                 <div>
                    <h5 className="font-black mb-1">Planning</h5>
                    <p className="text-xs text-zinc-400 font-medium">AI determines action chains autonomously for unstructured requests.</p>
                 </div>
              </div>
              <div className="flex gap-6">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10"><Users2 className="text-pink-300" /></div>
                 <div>
                    <h5 className="font-black mb-1">Multi-Agent Collaboration</h5>
                    <p className="text-xs text-zinc-400 font-medium">Specialized agents (Researcher, Writer, Editor) work together for robust results.</p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
           <h4 className="font-black text-indigo-900 mb-2">Technical Task</h4>
           <p className="text-sm text-indigo-800 font-medium leading-relaxed">
             Complete the Agentic AI course from DeepLearning.AI to understand the fundamental architecture and evaluation techniques of agentic systems.
           </p>
           <a href="https://www.deeplearning.ai/courses/agentic-ai/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline">Go to Course <ExternalLink className="w-3 h-3" /></a>
        </div>
        <div className="pt-8 border-t border-zinc-200 flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
           <p>Previous: mcp</p>
           <p>Up next: ai AGENT</p>
        </div>
      </div>
    )
  },
  {
    day: 35,
    title: 'AI Agents for Product Managers',
    category: 'AI',
    preview: 'Learn how AI agents work, why building them matters, and how to create them with n8n.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 35: AI Agents for Product Managers 🤖</h1>
        
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6">What Are AI Agents?</h2>
           <p className="text-indigo-800 font-medium leading-relaxed mb-6">
             An AI agent is an autonomous system that perceives its environment, makes decisions, and takes actions to achieve specific goals without constant human intervention.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white/60 p-5 rounded-2xl border border-indigo-100">
               <h4 className="font-black text-indigo-900 mb-2 uppercase text-[10px] tracking-widest">Chatbot</h4>
               <p className="text-xs text-indigo-800">Answers the question: "What is the weather?"</p>
             </div>
             <div className="bg-white/60 p-5 rounded-2xl border border-indigo-100">
               <h4 className="font-black text-indigo-900 mb-2 uppercase text-[10px] tracking-widest">AI Agent</h4>
               <p className="text-xs text-indigo-800">Goal: "Plan outdoor wedding" - Checks forecast, suggests dates, recommends indoor venues, and sends invites.</p>
             </div>
           </div>
        </section>

        <section className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-900">Defining Characteristics</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Autonomy', desc: 'Operate independently; you define the goal, they figure out the how.' },
                { title: 'Reasoning', desc: 'Break complex goals into subtasks and sequence actions logically.' },
                { title: 'Tool Use', desc: 'Invoke external APIs, search the web, query DBs, or send emails.' },
                { title: 'Memory', desc: 'Remember previous context and learn from past actions over time.' },
                { title: 'Feedback', desc: 'Observe results of their actions and adjust strategies accordingly.' },
                { title: 'Goal-Directed', desc: 'Focus on outcomes rather than just simple step-by-step queries.' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                   <h4 className="font-black text-indigo-600 mb-2 uppercase tracking-widest text-[10px]">{item.title}</h4>
                   <p className="text-xs font-bold text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="bg-zinc-950 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-8 text-indigo-400 tracking-tighter">Why PMs Should Build Agents</h2>
           <ul className="space-y-6">
              <li className="flex gap-4">
                 <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30 text-indigo-400 font-black">1</div>
                 <p className="text-sm font-medium text-zinc-300 leading-relaxed"><strong>Visceral Understanding:</strong> Experience hallucinations and failure modes firsthand to inform realistic roadmaps.</p>
              </li>
              <li className="flex gap-4">
                 <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30 text-indigo-400 font-black">2</div>
                 <p className="text-sm font-medium text-zinc-300 leading-relaxed"><strong>Rapid Prototyping:</strong> Assemble working agents in hours to test hypotheses before committing engineering resources.</p>
              </li>
              <li className="flex gap-4">
                 <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30 text-indigo-400 font-black">3</div>
                 <p className="text-sm font-medium text-zinc-300 leading-relaxed"><strong>Better Collaboration:</strong> Speak the language of agent architectures and reliable tool integration with dev teams.</p>
              </li>
           </ul>
        </section>

        <section className="p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm">
           <h2 className="text-2xl font-black text-zinc-900 mb-6">Enter n8n: The PM's Agent Studio</h2>
           <p className="text-zinc-600 font-medium mb-8">n8n provides a visual, low-code canvas to connect AI models with production tools without writing code.</p>
           
           <div className="space-y-4">
              <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                 <h4 className="font-black text-zinc-900 mb-1">Visual Workflow Editor</h4>
                 <p className="text-xs text-zinc-500 font-bold">Drag and drop nodes representing actions: call AI, fetch web content, query DBs.</p>
              </div>
              <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                 <h4 className="font-black text-zinc-900 mb-1">Tool Node Integration</h4>
                 <p className="text-xs text-zinc-500 font-bold">Hundreds of pre-built nodes for Slack, Gmail, Notion, Salesforce, and Jira.</p>
              </div>
              <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
                 <h4 className="font-black text-zinc-900 mb-1">Memory & State</h4>
                 <p className="text-xs text-zinc-500 font-bold">Maintain conversation history and store preferences across different interactions.</p>
              </div>
           </div>
        </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 mb-6">
           <h4 className="font-black text-emerald-900 mb-2">Build an AI Agent</h4>
           <p className="text-sm text-emerald-800 font-medium">Build an AI agent that actually solves a problem you face using tools like n8n, Zapier, or Voiceflow.</p>
        </div>
        <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
           <p>Previous: Agent Workflow</p>
           <p>Up next: Proof of work-one</p>
        </div>
      </div>
    ),
    resources: [
        { title: "WATCH: AI Agent Building Tutorial", url: "https://youtu.be/ZHH3sr234zY?si=5qMS4pLlfl2gYaDs", type: "video" }
    ]
  },
  {
    day: 36,
    title: 'Building Proof of Work: Shipping with No-Code',
    category: 'Foundations',
    preview: 'Why Aspiring PMs Must Ship and How to Do It With No-Code Tools. “Hiring managers prioritize demonstrated ability over potential.”',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 36: Building Proof of Work 🏗️</h1>
        
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
          <p className="text-lg font-medium text-zinc-700 leading-relaxed mb-6">
            The most common mistake aspiring PMs make is missing the single most powerful way to demonstrate capability: <strong>showing something you've built.</strong> The gap between those who get PM roles and those who don't often comes down to one thing: <strong>proof of work.</strong>
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-black text-zinc-900">Why Proof of Work Matters More Than Credentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
              <h4 className="font-black text-indigo-600 uppercase tracking-widest text-xs">Shipping Over Studying</h4>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed">Hiring managers prioritize demonstrated ability. Building revealing what studying hides—like struggling to recruit participants or ambiguous PRDs.</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
              <h4 className="font-black text-indigo-600 uppercase tracking-widest text-xs">Authentic Storytelling</h4>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed">Draw from real tradeoffs you faced when building a simple SaaS. Your interview answers will be compelling and specific, not generic.</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
              <h4 className="font-black text-indigo-600 uppercase tracking-widest text-xs">Technical Credibility</h4>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed">Shipping code (even no-code) lets you speak intelligently about feasibility and implementation with engineering teams.</p>
            </div>
            <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
              <h4 className="font-black text-indigo-600 uppercase tracking-widest text-xs">Portfolio Differentiation</h4>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed">Visual, tangible proof of execution distinguishes you from hundreds of candidates with similar business degrees.</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-900">The Modern No-Code Stack</h2>
           <p className="text-zinc-500 font-medium">Democratizing product building. You can now focus on product thinking while tools handle technical implementation.</p>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Lovable', desc: 'Build complete web applications through conversational prompts.' },
                { name: 'Replit', desc: 'AI-powered dev environment for web apps, APIs, and tools.' },
                { name: 'Claude', desc: 'Generate complete apps in interactive artifacts and prototypes.' },
                { name: 'n8n', desc: 'Visual workflow automation & agents without code.' },
                { name: 'Vercel', desc: 'Deploy web apps with zero configuration instantly.' },
                { name: 'Bolt.new', desc: 'Create apps from descriptions including full backend.' },
              ].map(tool => (
                <div key={tool.name} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm group hover:border-indigo-200 transition-all">
                   <h4 className="font-black text-indigo-600 mb-1 group-hover:scale-105 transition-transform">{tool.name}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{tool.desc}</p>
                </div>
              ))}
           </div>
        </section>

        <section className="p-10 bg-zinc-900 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-10">How to Build Your Portfolio</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest">Start with Your Problems</h4>
                 <p className="text-sm text-zinc-400 font-medium">Solve pain points you face daily. It keeps you motivated and ensures you are your own first user.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest">Ship Small and Often</h4>
                 <p className="text-sm text-zinc-400 font-medium">Better to ship 10 small projects than 1 ambitious one. Forces you to scope aggressively and avoids feature creep.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest">Build in Public</h4>
                 <p className="text-sm text-zinc-400 font-medium">Aim for at least 10 real users (not friends). Strangers' feedback teaches volumes about value prop.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-indigo-400 font-black uppercase text-xs tracking-widest">Document Learnings</h4>
                 <p className="text-sm text-zinc-400 font-medium">Write case studies documenting decisions, user acquisition, and what you'd do differently next time.</p>
              </div>
           </div>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h2 className="text-2xl font-black text-zinc-900 mb-8">Project Ideas for Your First Week</h2>
           <div className="space-y-8">
              <div className="p-6 bg-white rounded-3xl border border-zinc-100">
                 <h4 className="font-black text-lg text-zinc-900 mb-2">1. Personal Metrics Dashboard</h4>
                 <p className="text-sm text-zinc-500 font-medium mb-4">A simple web tool to log habits, mood, and sleep with data visualization trends.</p>
                 <div className="flex gap-2"><span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md uppercase">Claude</span> <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md uppercase">Lovable</span></div>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-zinc-100">
                 <h4 className="font-black text-lg text-zinc-900 mb-2">2. Interview Question Generator</h4>
                 <p className="text-sm text-zinc-500 font-medium mb-4">An AI tool that generates customized behavioral questions based on target role and industry.</p>
                 <div className="flex gap-2"><span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md uppercase">Gemini API</span> <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md uppercase">Bolt.new</span></div>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-zinc-100">
                 <h4 className="font-black text-lg text-zinc-900 mb-2">3. Email Subject Line Analyzer</h4>
                 <p className="text-sm text-zinc-500 font-medium mb-4">Paste lines to receive instant analysis on clarity, appeal, and predicted open rate.</p>
                 <div className="flex gap-2"><span className="text-[10px] font-black bg-pink-50 text-pink-600 px-2 py-1 rounded-md uppercase">n8n</span> <span className="text-[10px] font-black bg-pink-50 text-pink-600 px-2 py-1 rounded-md uppercase">Replit</span></div>
              </div>
           </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
           <p>Previous: AI Agents</p>
           <p>Up next: Proof of work-two</p>
        </div>
      </div>
    ),
    assignment: (
      <div className="space-y-6 text-left">
        <h4 className="font-black text-indigo-900 mb-2 underline decoration-indigo-200 underline-offset-4">Assignment</h4>
        <p className="font-medium text-zinc-700 leading-relaxed">
          Pick a product you use daily (e.g., Spotify, Zomato, Notion, Cred) and answer:
        </p>
        <div className="p-6 bg-white border border-indigo-100 rounded-3xl shadow-sm italic text-sm font-bold text-indigo-600">
           Submission Format: <br/>
           Product Name: ___ User Problem: ___ Key Metrics: ___ Improvement Suggestion: ___
        </div>
        <div className="pt-4 border-t border-indigo-200">
          <p className="font-black text-indigo-900 uppercase text-xs tracking-widest mb-2">Reflection Task</p>
          <p className="font-medium text-zinc-700">Identify which of the 6 PM types excites you the most and why. Does it align with your current background (e.g., Engineer → TPM, Marketing → Growth)?</p>
        </div>
      </div>
    )
  },
  {
    day: 37,
    title: 'Building Proof of Work: Structured Product Teardowns',
    category: 'Foundations',
    preview: 'One of the most credible ways to demonstrate product thinking, analytical rigor, and strategic insight.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 37: Building Proof of Work through Structured Product Teardowns 🛠️</h1>
        
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <p className="text-lg font-medium text-zinc-700 leading-relaxed">
             As an aspiring Product Manager, one of the most credible ways to demonstrate product thinking, analytical rigor, and strategic insight is by doing <strong>product teardowns</strong> — systematic breakdowns of real products to extract insights and propose meaningful improvements.
           </p>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
             <Lightbulb className="text-[#79BAEC]" />
             What Is a Product Teardown?
           </h2>
           <p className="text-zinc-600 font-medium leading-relaxed">
             A product teardown is a structured analysis where you reverse-engineer a digital product to understand how it works, why it was built that way, and what strategic decisions underlie its design, user flows, and business model. This goes far beyond a simple review — you dig into user journeys, feature decisions, growth mechanics, and UX logic to derive insights.
           </p>
        </section>

        <section className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
             <Hammer className="text-indigo-600" />
             Why Product Teardowns Are Great Proof of Work
           </h2>
           <p className="text-zinc-500 font-bold mb-6">Teardowns help you develop and showcase core PM skills:</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
                 <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-xs">
                    <CheckCircle className="w-4 h-4" /> Product Sense
                 </div>
                 <p className="text-sm text-zinc-600 font-medium">You learn to interpret why features exist and what trade-offs were made.</p>
              </div>
              <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
                 <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-xs">
                    <CheckCircle className="w-4 h-4" /> User Empathy
                 </div>
                 <p className="text-sm text-zinc-600 font-medium">You map user personas, pains, and motivations behind decisions.</p>
              </div>
              <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
                 <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-xs">
                    <CheckCircle className="w-4 h-4" /> Strategic Thinking
                 </div>
                 <p className="text-sm text-zinc-600 font-medium">You connect business goals (like retention or monetisation) to product decisions.</p>
              </div>
              <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
                 <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-xs">
                    <CheckCircle className="w-4 h-4" /> Communication
                 </div>
                 <p className="text-sm text-zinc-600 font-medium">Teardowns force you to articulate insights clearly — exactly what employers look for.</p>
              </div>
           </div>

           <p className="bg-zinc-900 text-white p-8 rounded-3xl text-sm font-medium leading-relaxed italic border-l-8 border-indigo-500">
              "These analyses become tangible artifacts you can upload to your portfolio or talk through in interviews — much stronger proof of work than an empty resume."
           </p>
        </section>

        <section className="p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm">
           <h3 className="text-xl font-black text-zinc-900 mb-8 uppercase tracking-widest text-sm">References & Learning</h3>
           <div className="flex flex-col sm:flex-row gap-6">
              <a href="https://hellopm.co/what-is-a-product-teardown/" target="_blank" rel="noreferrer" className="flex-1 p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-indigo-100 transition-all flex items-center justify-between group">
                 <span className="font-bold text-zinc-700">HelloPM Guide</span>
                 <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600" />
              </a>
              <a href="https://thestare.in/case-studies" target="_blank" rel="noreferrer" className="flex-1 p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-indigo-100 transition-all flex items-center justify-between group">
                 <span className="font-bold text-zinc-700">Case Study Examples</span>
                 <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600" />
              </a>
           </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
           <p>Previous: Proof of work-one</p>
           <p>Up next: Proof of work-three</p>
        </div>
      </div>
    ),
    resources: [
        { title: "Watch: Product Teardown Walkthrough", url: "https://youtu.be/3cqHleDYgys", type: "video" }
    ]
  },
  {
    day: 38,
    title: 'Startup Case Study Guide',
    category: 'Foundations',
    preview: 'Master the exact process for identifying real problems, making trade-offs, and reaching out to founders.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 38: How Aspiring PMs Can Do a Startup Case Study to Get a PM Job 🚀</h1>
        
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <blockquote className="text-xl font-black text-indigo-900 italic mb-4 leading-relaxed">
             “A strong startup case study is proof of product thinking, not a presentation exercise. Hiring managers don’t care about fancy slides — they care whether you can identify real problems, make trade-offs, and think in metrics.”
           </blockquote>
           <a href="https://thestare.in/case-studies" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline">
              Refer: thestare.in/case-studies <ExternalLink className="w-4 h-4" />
           </a>
        </section>

        <section className="space-y-12">
           <h2 className="text-2xl font-black text-zinc-900">The Exact Process You Should Follow</h2>
           
           <div className="grid grid-cols-1 gap-8">
              <div className="border-l-4 border-indigo-600 pl-6 space-y-4">
                 <h3 className="text-xl font-black">1. Pick the Right Startup (Very Important)</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium">
                    <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                       <h4 className="text-emerald-900 font-black mb-2 uppercase text-xs tracking-widest">Choose Where:</h4>
                       <ul className="space-y-1 text-emerald-800">
                          <li>• Product is live and usable</li>
                          <li>• Problem space is clear</li>
                          <li>• You observe gaps or friction</li>
                       </ul>
                    </div>
                    <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                       <h4 className="text-red-900 font-black mb-2 uppercase text-xs tracking-widest">Avoid:</h4>
                       <ul className="space-y-1 text-red-800">
                          <li>• Products you’ve never used</li>
                          <li>• Companies where you don’t understand the user</li>
                          <li>• Over-optimized "Too big" products</li>
                       </ul>
                    </div>
                 </div>
                 <p className="text-sm font-black text-indigo-600 bg-indigo-50 inline-block px-3 py-1 rounded-lg">👉 Rule: If you can’t describe the core problem in one line, don’t pick it.</p>
              </div>

              <div className="border-l-4 border-zinc-200 pl-6 space-y-4">
                 <h3 className="text-xl font-black">2. Define the Scope</h3>
                 <p className="text-zinc-600 font-medium">Don't do everything. Pick ONE focus: Onboarding, Activation, Retention, Monetisation, or a Single core feature. Refer reviews on Play Store, Reddit, or LinkedIn.</p>
              </div>

              <div className="border-l-4 border-zinc-200 pl-6 space-y-4">
                 <h3 className="text-xl font-black">3. Understand the Business & Users</h3>
                 <p className="text-zinc-600 font-medium">Hiring managers care more about how you think. Explicitly write assumptions about the Target User, User Goal, Startup’s Business Goal, and Assumed Metrics.</p>
              </div>

              <div className="border-l-4 border-zinc-200 pl-6 space-y-4">
                 <h3 className="text-xl font-black">4. Map the User Journey</h3>
                 <p className="text-zinc-600 font-medium">Signup &plusmn; First Action &plusmn; Core Usage &plusmn; Retention Hooks &plusmn; Monetisation. Write observations, not opinions.</p>
              </div>

              <div className="border-l-4 border-zinc-200 pl-6 space-y-4">
                 <h3 className="text-xl font-black">5. Identify 1–2 High-Impact Problems</h3>
                 <p className="text-zinc-600 font-medium italic">"Users reach dashboard but don’t understand what to do next." (Good) vs "The UI is not good." (Bad)</p>
              </div>

              <div className="border-l-4 border-zinc-200 pl-6 space-y-4">
                 <h3 className="text-xl font-black">6. Do Root Cause Analysis</h3>
                 <p className="text-zinc-600 font-medium">Use "5 Whys" or JTBD to distinguish UX, messaging, or incentive issues. This separates PMs from reviewers.</p>
              </div>

              <div className="border-l-4 border-zinc-200 pl-6 space-y-4">
                 <h3 className="text-xl font-black">7. Propose a Solution (With Trade-offs)</h3>
                 <p className="text-zinc-600 font-medium">Define what changes, why it solves the root cause, and what you are NOT solving right now.</p>
              </div>

              <div className="border-l-4 border-emerald-600 pl-6 space-y-4">
                 <h3 className="text-xl font-black">8. Define Success Metrics (Non-Negotiable)</h3>
                 <div className="flex gap-4 flex-wrap">
                    {['Primary (Activation)', 'Secondary (Retention)', 'Guardrail (Errors)'].map(m => (
                       <span key={m} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-black uppercase tracking-widest border border-emerald-100">{m}</span>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        <section className="bg-zinc-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10"><Send className="w-48 h-48" /></div>
           <h2 className="text-2xl font-black mb-8 text-indigo-400 uppercase tracking-widest text-sm">How to Reach Out to Founders</h2>
           <div className="space-y-6 max-w-3xl font-medium text-zinc-400">
              <p>1. Target Founders of early-stage startups (Seed–Series A) or solo PMs.</p>
              <p>2. <span className="text-red-400">Do NOT ask for a job first.</span> Lead with insight, thoughtfulness, and respect.</p>
              <p>3. Lead with your Case Study — it is your entry ticket.</p>
              
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl font-mono text-[11px] leading-relaxed text-zinc-300">
                 <p className="text-indigo-300 font-black mb-4">LinkedIn / Email Template:</p>
                 <p>Hi {"<Name>"},</p>
                 <br/>
                 <p>I’ve been using {"<Product Name>"} and recently did a short product case study on it, focused on {"<specific area: onboarding / activation / retention>"}.</p>
                 <br/>
                 <p>I noticed {"<1 concrete insight or problem>"}, and proposed a solution that could potentially impact {"<metric>"}.</p>
                 <br/>
                 <p>I’m not asking for anything — just wanted to share the analysis in case it’s useful.</p>
                 <br/>
                 <p>Here’s the link: {"<Notion / PDF>"}</p>
                 <br/>
                 <p>Either way, really admire what you’re building.</p>
                 <p>— {"<Your Name>"}</p>
              </div>
           </div>
        </section>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200 text-left">
           <h3 className="text-xl font-black mb-4 text-left">If They Reply — What Next?</h3>
           <p className="text-zinc-600 font-medium text-left">Be concise. Let the conversation earn the hire. Enjoy understanding how they think. Eventually, suggest exploring contributing even on a short-term trial basis.</p>
        </section>

        <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400 text-left">
           <p className="text-left">Previous: proof of work-two</p>
           <p className="text-left">Up next: Building portfolio</p>
        </div>
      </div>
    )
  },
  {
    day: 39,
    title: 'Building a Strong PM Portfolio',
    category: 'Foundations',
    preview: 'Master the essential components of a product management portfolio, from your about section to contact details.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 39: Building a Strong PM Portfolio 📂</h1>
        
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-4">About Section:</h2>
           <p className="text-zinc-700 font-medium leading-relaxed italic">
             An aspiring Product Manager with a strong focus on solving user-centric problems through structured thinking, data-backed decision-making, and clear prioritisation. Interested in working on products that improve user experience, drive engagement, and create measurable business impact, especially in early-stage and fast-growing environments.
           </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
              <h3 className="font-black text-lg text-zinc-900 mb-4 flex items-center gap-2">
                 <Rocket className="w-5 h-5 text-indigo-600" />
                 Case Studies & Projects
              </h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                 Showcases hands-on proof of work through real and hypothetical product case studies. Includes product teardowns, startup analyses, problem statements, solution proposals, and success metrics to demonstrate practical understanding of product discovery, execution, and impact measurement.
              </p>
           </div>
           <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
              <h3 className="font-black text-lg text-zinc-900 mb-4 flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-indigo-600" />
                 Certifications
              </h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                 Includes relevant product management and analytics certifications that validate foundational knowledge in product strategy, agile practices, data analysis, and experimentation.
              </p>
           </div>
           <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
              <h3 className="font-black text-lg text-zinc-900 mb-4 flex items-center gap-2">
                 <MessageSquare className="w-5 h-5 text-indigo-600" />
                 Testimonials
              </h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                 Feedback from founders, managers, or parents highlighting problem-solving ability, ownership mindset, communication skills, and product thinking approach.
              </p>
           </div>
           <div className="p-8 bg-white border border-zinc-100 rounded-3xl shadow-sm">
              <h3 className="font-black text-lg text-zinc-900 mb-4 flex items-center gap-2">
                 <Briefcase className="w-5 h-5 text-indigo-600" />
                 Work Experience
              </h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                 Details professional experience demonstrating collaboration with cross-functional teams, exposure to real-world product challenges, execution support, and contribution to product delivery and improvement initiatives.
              </p>
           </div>
        </div>

        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h3 className="font-black text-xl text-zinc-900 mb-6">Additional Sections</h3>
           <div className="space-y-4">
              <div className="flex gap-4 items-start">
                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-zinc-200 shrink-0 shadow-sm"><GraduationCap className="w-5 h-5 text-zinc-600" /></div>
                 <div>
                    <h4 className="font-black text-zinc-900">Education</h4>
                    <p className="text-sm text-zinc-500 font-medium">Academic background that supports analytical thinking, technical understanding, and problem-solving skills relevant to product management.</p>
                 </div>
              </div>
              <div className="flex gap-4 items-start">
                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-zinc-200 shrink-0 shadow-sm"><FileText className="w-5 h-5 text-zinc-600" /></div>
                 <div>
                    <h4 className="font-black text-zinc-900">CV Link</h4>
                    <p className="text-sm text-zinc-500 font-medium">A downloadable, up-to-date resume highlighting product-relevant experience, skills, and achievements.</p>
                 </div>
              </div>
           </div>
        </section>

        <section className="p-10 bg-zinc-900 rounded-[3rem] text-white">
           <h3 className="text-xl font-black mb-8 text-indigo-400 uppercase tracking-widest text-xs">Contact Details</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                 <p className="font-black text-zinc-400 text-[10px] uppercase tracking-widest mb-1">LinkedIn</p>
                 <p className="text-sm font-bold">Professional profile for networking and detailed work history</p>
              </div>
              <div>
                 <p className="font-black text-zinc-400 text-[10px] uppercase tracking-widest mb-1">Email</p>
                 <p className="text-sm font-bold">Direct communication for opportunities and collaborations</p>
              </div>
              <div>
                 <p className="font-black text-zinc-400 text-[10px] uppercase tracking-widest mb-1">Phone Number</p>
                 <p className="text-sm font-bold">For interview coordination and urgent follow-ups</p>
              </div>
           </div>
        </section>

        <div className="pt-8 mt-12 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
           <p>Previous: proof of work-two</p>
           <p>Up next: Updating cv</p>
        </div>
      </div>
    )
  },
  {
    day: 40,
    title: 'CV and LinkedIn Optimization',
    category: 'Foundations',
    preview: 'Building CV and optimising your linkedin. Check ATS score and use the Senior Recruiter prompt.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 40: Building CV & Optimizing LinkedIn 📄</h1>
        
        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6 flex items-center gap-3"><FileEdit /> CV Resources</h2>
           <div className="space-y-4">
              <p className="text-zinc-700 font-bold">Refer this template to build your cv:</p>
              <a 
                href="https://believed-mist-f1a.notion.site/CV-template-for-APM-14551b6fbd0e80779ba5f5ade6f00fc5" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-colors"
              >
                Download Notion Templates <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-sm font-medium text-zinc-500 pt-4">Check ATS score here: <a href="https://resumeworded.com/" target="_blank" rel="noreferrer" className="text-indigo-600 underline">resumeworded.com</a> and ensure to keep it above 85.</p>
           </div>
        </section>

        <section className="bg-zinc-950 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-4 text-indigo-400">Prompt to optimise your LinkedIn</h2>
           <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
              <p className="text-zinc-400 text-sm font-medium mb-4">How to use it?</p>
              <ol className="text-xs font-bold text-zinc-300 space-y-2 list-decimal pl-5">
                 <li>Copy paste the prompt below in chatgpt</li>
                 <li>Paste your LinkedinProfile data</li>
              </ol>
           </div>
           <div className="p-8 bg-zinc-900 rounded-3xl border border-zinc-800 font-mono text-[11px] text-zinc-400 h-96 overflow-y-auto no-scrollbar whitespace-pre-wrap leading-relaxed">
{`You are a Senior Recruiter + LinkedIn Search Algorithm Expert with deep experience hiring for Product, Tech, Data, and Business roles. Your job is to first collect the required LinkedIn profile data, then perform a brutally honest, recruiter-grade analysis focused on: • Recruiter search visibility • Hiring manager shortlisting • Credibility & seniority signaling • Inbound opportunity generation Think like a recruiter who spends 7–10 seconds scanning a profile before deciding whether to shortlist or move on. 

STEP 0 — ASK FOR INPUT (DO THIS FIRST, DO NOT ANALYZE YET) 
Start by saying exactly this and nothing else: **“Hey, let’s analyze your LinkedIn profile. Please copy-paste the following sections from your profile (no LinkedIn URL): • Headline • About section • Experience (role titles + descriptions) • Skills • Education • Certifications • Activity (posts / comments / engagement — optional) Paste whatever you have. If something is missing, I’ll call it out as a weak signal.”** 

Do not provide feedback, assumptions, or suggestions until the user pastes their profile data. 

ROLE & MINDSET (APPLIES AFTER INPUT IS RECEIVED) 
Once the user shares the data, analyze it like a recruiter deciding whether to shortlist or move on. Your goal is not to make the profile sound nice. Your goal is to increase recruiter replies and interview callbacks. 

TONE & RULES (NON-NEGOTIABLE) 
• Be direct, blunt, and no-nonsense 
• Be constructively critical, not polite 
• Never assume or invent data 
• If information is missing, explicitly say: “Cannot evaluate due to missing signal” 
Prioritize: • Outcomes > responsibilities • Metrics > buzzwords • Clarity > storytelling 
Avoid vague advice like “add more impact.” Be specific and tactical. 

ANALYSIS FRAMEWORK (USE EXACT THIS STRUCTURE) 
Step 1: Headline Analysis (Highest Priority) 
Evaluate: • Keyword density & recruiter search relevance • Role clarity (title + domain + scope) • 3-second scan effectiveness • Seniority & credibility signals 
Output: • Headline score (0–10) • What works • What fails • 3 rewritten headlines: – SEO-first – Impact-driven – Clean & recruiter-friendly 

Step 2: About Section Analysis 
Evaluate: • First 2 lines (above the fold) • Role clarity & value proposition • Metrics, scale, outcomes • Skimmability • Signal-to-noise ratio 
Output: • About score (0–10) • Missing elements • Red flags • Rewritten About section (150–250 words, recruiter-optimized) 

Step 3: Experience Section Analysis 
For each role, evaluate: • Action vs responsibility dumping • Quantification • Ownership & decision-making • Product / business thinking 
Output: • Experience score (0–10) • Common issues across roles • Rewrite ONE role using: Context → Action → Outcome → Metric 

Step 4: Skills & Keyword Audit 
Evaluate: • Relevance to target roles • Hard skills vs low-signal skills • Redundant / outdated skills • Missing recruiter keywords 
Output: • Skills score (0–10) • Remove • Add • Top 10 pinned skills (ranked) 

Step 5: Credibility & Trust Signals 
Analyze: • Certifications (relevance > quantity) • Brand names & tools • Education positioning • Community / mentoring / content (if available) 
Output: • Credibility score (0–10) • Strengths • Weaknesses • Authority-building actions 

Step 6: Activity & Personal Brand (If Available) 
If data exists, analyze: • Posting consistency • Signal vs noise • Alignment with target roles 
If not, explicitly say: “Cannot evaluate personal brand due to missing activity data.” 
Output (if applicable): • Personal brand score (0–10) • Content gaps • 3 high-ROI post ideas 

Step 7: Overall Recruiter Readiness 
Provide: • Overall profile score (0–100) • Shortlisting probability: Low / Medium / High / VERY HIGH • Top 5 fixes with maximum ROI (ranked, actionable)`}
           </div>
        </section>

        <div className="pt-8 mt-12 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
           <p>Previous: Building Portfolio</p>
           <p>Up next: Job applying</p>
        </div>
      </div>
    )
  },
  {
    day: 41,
    title: 'Applying to jobs',
    category: 'Foundations',
    preview: 'Master platforms to apply PM jobs and the art of asking for referrals.',
    content: (
      <div className="space-y-10">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 41: Applying to jobs 💼</h1>
        <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
           <h2 className="text-2xl font-black text-zinc-900 mb-6">Platforms to apply PM jobs:</h2>
           <p className="text-zinc-600 font-bold text-lg mb-4">
             Naukri | Linkedin | Hirist | Wellfound | Glassdoor Jobs | IIM jobs | Instahyre | Ycombinator jobs 
           </p>
        </section>

        <section className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
           <h2 className="text-2xl font-black text-indigo-900 mb-6 flex items-center gap-3"><Send /> How to ask for referral</h2>
           <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm font-medium text-zinc-700 leading-relaxed whitespace-pre-wrap">
{`Hi [Name],
Hope you’re doing well!

I recently came across the [Position Name] role ([Job Link/ID]) at [Company Name], and it aligns perfectly with my skills in [mention relevant skills] and passion for [highlight industry/area]. Additionally, my achievement of [mention a relevant accomplishment, e.g., "leading a project that improved customer satisfaction by 20%" or "winning the 'Tech Talk' competition"] demonstrates my ability to contribute effectively to this role.

I’d truly appreciate your support with a referral for this opportunity. Please let me know if you need my resume or further details.

Thanks so much for considering this!

Best regards,
[Your Name]`}
           </div>
        </section>

        <section className="bg-zinc-950 p-10 rounded-[3rem] text-white">
           <h2 className="text-2xl font-black mb-8 text-amber-400">Follow-up Tip</h2>
           <p className="text-zinc-400 font-medium mb-6">If no response within 48 hours, send:</p>
           <div className="p-6 bg-white/5 rounded-2xl border border-white/10 font-mono text-sm">
             "Hi [Name], just following up on my previous message about the [Position Name] role. I’d be grateful for any guidance or support regarding a referral. Thank you!"
           </div>
        </section>

        <section className="p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm">
           <h2 className="text-2xl font-black text-zinc-900 mb-4">How to get shortlisted?</h2>
           <p className="text-zinc-500 font-bold mb-6">Refer to this in-depth guide on shortlisting activity:</p>
           <a 
             href="https://www.linkedin.com/posts/kaushalprasadkaush7_jobhunt-careeradvice-shortlisting-activity-7256570552532836352-eNjd?utm_source=share&utm_medium=member_desktop&rcm=ACoAACcjST0B1uRjC1RlnTFh2iI-0IVfZ52FWW0" 
             target="_blank" 
             rel="noreferrer"
             className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-colors"
           >
             View Guide on LinkedIn <ExternalLink className="w-4 h-4" />
           </a>
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
        <p className="font-black text-indigo-900">{"Practice the prompt: \"Design a movie-booking app for elderly users.\" Follow the structure: User &plusmn; Pain Point &plusmn; Solution &plusmn; Metric."}</p>
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
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 text-left">Day 45: Behavioral Rounds & Graduation 🎓</h1>
        <section className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
           <h2 className="text-2xl font-black text-emerald-900 mb-6">Behavioral Mastery</h2>
           <p className="text-emerald-800 font-medium mb-6 leading-relaxed">Prepare for the "Why PM?", "Tell me about a time you failed", and "Stakeholder conflict" questions.</p>
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
    ),
    resources: [
        { title: "Behavioral Rounds Part 1", url: "https://youtu.be/1rOcpwcDTuY?si=GXoS-FRzroxPPJ0U", type: "video" },
        { title: "Behavioral Rounds Part 2", url: "https://youtu.be/Wyvm8vcsaP0?si=JeY3xJKXWfRrGCXG", type: "video" }
    ]
  }
];