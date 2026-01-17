
import React from 'react';
import { Lesson, ModuleInfo, Category } from './types';
import { 
  Lightbulb, Search, BarChart, 
  Code, Bot, Layers, Brain, Target, Sparkles, CheckCircle, Smartphone, Zap, Users, MessageSquare, Rocket, Activity, Database, Cpu, X, Box, HelpCircle, Terminal, TrendingUp, Settings2, ShieldCheck,
  FileText, Calendar, Compass, ClipboardList, PenTool, Hammer, Ship, RefreshCcw, Layout, FileEdit, PieChart, Send,
  TrendingDown, Info, Settings, LifeBuoy, Recycle, Users2, Gauge, Timer, ShieldAlert, BookOpen, UserPlus, Milestone,
  ArrowRight, Briefcase, DollarSign, PieChart as PieChartIcon, TrendingUp as TrendingUpIcon, Landmark, Play, Mic, ClipboardCheck, MessageCircle, User, HeartHandshake, Star,
  Globe, BarChart3, Filter, Table, Network, GitMerge, Binary, Hash, Type, Calculator, CalendarDays, Ghost
} from 'lucide-react';
import { Logo } from './components/Logo';

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

const PDLCChevron = ({ text }: { text: string }) => (
  <div className="relative group flex-1 min-w-[140px]">
    <div className="bg-[#9ea2b0] text-zinc-900 font-black text-[10px] md:text-xs tracking-widest text-center py-6 px-4 relative flex items-center justify-center overflow-hidden" 
         style={{ clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)' }}>
      {text}
    </div>
  </div>
);

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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16">
        <header className="bg-indigo-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Foundation & Mindset</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Start Your PM Journey Right 🚀. Before we jump into frameworks, tools, and case studies, today is about building the right mindset.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Day-0: Foundation & Mindset — Start Your PM Journey Right 🚀</h2>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">Welcome to Day-0 of learning Product Management from scratch! Before we jump into frameworks, tools, and case studies, today is about building the right mindset to succeed as a Product Manager.</p>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">Product Management is one of the most competitive and rewarding careers today. But breaking into PM without prior experience can feel overwhelming because the role demands:</p>
            <ul className="space-y-3 pl-6 list-disc text-lg font-medium text-zinc-700">
              <li>Cross-functional collaboration</li>
              <li>Strategic thinking & decision-making</li>
              <li>Problem-solving with ambiguity</li>
              <li>Understanding of business, design, tech & data</li>
            </ul>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">Many aspiring PMs struggle not because they lack skills, but because they lack clarity of purpose and direction.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">Why Day-0 Matters</h2>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">Before learning “how to be a PM”, you must understand why you want to be a PM. PMs face pressure, ownership, ambiguity, and constant context switching — your motivation will keep you going when it gets hard.</p>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">Understanding the reality of the role—not just the glamour—helps you evaluate:</p>
            <ul className="space-y-3 pl-6 list-disc text-lg font-medium text-zinc-700">
              <li>Is PM aligned with your strengths & interests?</li>
              <li>Do you enjoy solving problems and talking to users?</li>
              <li>Are you comfortable making decisions without perfect data?</li>
            </ul>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">The fastest way to answer these questions is to talk to real PMs, understand their challenges, impact, and day-to-day responsibilities.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">Reflection Exercise</h2>
            <p className="text-lg leading-relaxed text-zinc-600">Write answers to these 3 questions:</p>
            <div className="space-y-4 pt-2">
              <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
                <p className="font-bold text-zinc-900">1. Why do I want to become a Product Manager?</p>
              </div>
              <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
                <p className="font-bold text-zinc-900">2. What strengths do I already have that can help me succeed?</p>
              </div>
              <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
                <p className="font-bold text-zinc-900">3. What areas do I need to improve over the next 45 days?</p>
              </div>
            </div>
            <p className="text-xl font-black italic text-indigo-600 pt-4">Clarity today will drive consistency tomorrow.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">Outcome of Day-0</h2>
            <p className="text-lg leading-relaxed text-zinc-600">By the end of today, you should have:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Real understanding of what PM is",
                "Motivation aligned with reality",
                "Early networking with professionals",
                "A clear starting point for the course"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 p-4 bg-white border border-zinc-100 rounded-xl shadow-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="font-bold text-zinc-700">{text}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[2.5rem] space-y-10 shadow-xl shadow-indigo-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">Task 1 — Must Do Today</h4>
            <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl">Reach out to 5 Product Managers and ask them about their journey & role.</p>
          </header>
          <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
            <p className="text-lg text-zinc-800 font-medium leading-relaxed">Use LinkedIn, alumni networks, or company communities.</p>
          </div>
          <div className="p-8 bg-zinc-950 rounded-3xl border border-zinc-800">
            <p className="font-black text-indigo-400 uppercase tracking-widest text-xs mb-2">Goal</p>
            <p className="text-zinc-300 font-bold text-lg">Collect insights and note patterns. This will guide your expectations.</p>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16">
        <header className="bg-indigo-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">What is Product Management? 🚀</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Understand the role, responsibilities, types, and myths about Product Management.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">1. What is a Product?</h2>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">A product is anything that creates value by solving a real user problem or fulfilling a need—whether physical, digital, or service-based.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {['Uber', 'Spotify', 'iPhone', 'Google Ads', 'ATM', 'WhatsApp'].map(item => (
                <div key={item} className="px-6 py-4 bg-zinc-50 rounded-2xl text-center border border-zinc-100 hover:border-indigo-200 hover:bg-white transition-all shadow-sm">
                   <span className="text-sm font-black text-zinc-800 tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">2. Do Companies Need Product Managers?</h2>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">Short answer: <span className="text-indigo-600 font-bold underline">Yes</span>—but the title isn’t always necessary. <span className="font-bold text-zinc-900">Product thinking is.</span></p>
            <div className="pt-6">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                Why PMs emerge: Company Growth Stages
              </h3>
              <div className="overflow-x-auto border border-zinc-100 rounded-3xl bg-zinc-50/30 shadow-inner">
                <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                  <thead className="bg-zinc-100/50 border-b border-zinc-100">
                    <tr>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Stage</th>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Who acts as PM</th>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Why it works</th>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">When it breaks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-zinc-600 font-medium">
                    <tr className="hover:bg-white transition-colors">
                      <td className="p-5 font-black text-zinc-900">Early startup</td>
                      <td className="p-5">Founder</td>
                      <td className="p-5">Small team, fast decisions, direct feedback</td>
                      <td className="p-5">Complexity increases, decisions overload</td>
                    </tr>
                    <tr className="hover:bg-white transition-colors">
                      <td className="p-5 font-black text-zinc-900">Growth stage</td>
                      <td className="p-5">Dedicated PMs</td>
                      <td className="p-5">Align teams, prioritize impact, execution</td>
                      <td className="p-5">Without PMs: confusion, misalignment</td>
                    </tr>
                    <tr className="hover:bg-white transition-colors">
                      <td className="p-5 font-black text-zinc-900">Large enterprise</td>
                      <td className="p-5">Product org with PM leaders</td>
                      <td className="p-5">Scale, governance, coordination</td>
                      <td className="p-5">Without PMs: feature bloat, chaos, slow</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">3. Real-World Exceptions</h2>
            <p className="text-lg leading-relaxed text-zinc-600">Some companies have succeeded without formal PMs:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-3xl">
                  <h4 className="font-black text-lg text-zinc-900 mb-1">Basecamp</h4>
                  <p className="text-sm text-zinc-500 font-medium">Design-led product development</p>
               </div>
               <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-3xl">
                  <h4 className="font-black text-lg text-zinc-900 mb-1">Valve</h4>
                  <p className="text-sm text-zinc-500 font-medium">Self-organized teams</p>
               </div>
               <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-3xl">
                  <h4 className="font-black text-lg text-zinc-900 mb-1">Early FB / Stripe</h4>
                  <p className="text-sm text-zinc-500 font-medium">Engineer-led decisions</p>
               </div>
            </div>
            <p className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl font-bold text-indigo-700 flex items-center gap-3">
               <span className="text-2xl shrink-0">👉</span> These work only when everyone practices product thinking: user obsession + data + trade-offs + execution focus.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">4. What is Product Management?</h2>
            <p className="text-lg leading-relaxed text-zinc-600">Product Management is the function responsible for guiding a product from idea → launch → growth → scale by balancing:</p>
            <div className="flex flex-col md:flex-row items-center gap-10 justify-center py-12 bg-indigo-50/30 rounded-[3rem] border border-indigo-100/50">
              <div className="text-center group">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-md border border-zinc-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Users className="w-10 h-10 text-indigo-500" />
                </div>
                <p className="font-black text-xl text-zinc-900">User Value</p>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Solving real pain points</p>
              </div>
              <div className="text-zinc-300 font-light text-4xl hidden md:block">×</div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-md border border-zinc-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                  <TrendingUp className="w-10 h-10 text-emerald-500" />
                </div>
                <p className="font-black text-xl text-zinc-900">Business Goals</p>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Revenue & Growth</p>
              </div>
              <div className="text-zinc-300 font-light text-4xl hidden md:block">×</div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-md border border-zinc-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Cpu className="w-10 h-10 text-blue-500" />
                </div>
                <p className="font-black text-xl text-zinc-900">Tech Feasibility</p>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">System capabilities</p>
              </div>
            </div>
            <p className="text-2xl font-black italic text-center text-zinc-800 leading-tight border-l-8 border-indigo-600 pl-8 mx-auto max-w-3xl py-4 bg-zinc-50 rounded-r-3xl">
              "PMs don’t decide how to build — they decide what to build and why."
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">5. The PM Equation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4"><Zap className="w-5 h-5" /></div>
                  <h4 className="font-black text-lg text-zinc-900 mb-2">Business</h4>
                  <p className="text-sm text-zinc-500 font-medium">Revenue, success metrics, GTM strategy.</p>
               </div>
               <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                  <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 mb-4"><Smartphone className="w-5 h-5" /></div>
                  <h4 className="font-black text-lg text-zinc-900 mb-2">Design</h4>
                  <p className="text-sm text-zinc-500 font-medium">User experience & usability focus.</p>
               </div>
               <div className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4"><Code className="w-5 h-5" /></div>
                  <h4 className="font-black text-lg text-zinc-900 mb-2">Tech</h4>
                  <p className="text-sm text-zinc-500 font-medium">Feasibility & backend system thinking.</p>
               </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">6. PM Responsibilities</h2>
            <div className="overflow-x-auto border border-zinc-100 rounded-3xl">
                <table className="w-full text-left text-sm border-collapse min-w-[500px]">
                  <thead className="bg-zinc-50 border-b border-zinc-100">
                    <tr>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Area</th>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">What it includes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-zinc-600 font-medium">
                    {[
                      { a: "User understanding", i: "Research, interviews, personas, feedback" },
                      { a: "Problem definition", i: "Insights, hypotheses, opportunity sizing" },
                      { a: "Prioritization", i: "RICE, MoSCoW, Kano frameworks" },
                      { a: "Strategy & Roadmapping", i: "Vision, goals, milestones, timelines" },
                      { a: "Execution & Delivery", i: "PRDs, user stories, cross-functional collab" },
                      { a: "Analytics & Learning", i: "KPI tracking, experiments, iterations" },
                      { a: "Communication", i: "Stakeholders, presentations, influence" }
                    ].map(row => (
                      <tr key={row.a}>
                         <td className="p-5 font-black text-zinc-900">{row.a}</td>
                         <td className="p-5">{row.i}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">7. Types of Product Managers & Why They Exist 🔍</h2>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">As products scale, complexity grows — more users, more data, and deeper specialization needs. While an early-stage PM owns everything, a scaled organization requires specialization for efficiency.</p>
            
            <div className="space-y-12">
               {/* PM Type Categories */}
               {[
                 { 
                   role: "Core Product Manager", badge: "The Generalist", 
                   focus: "End-to-end ownership of user-facing product experiences.", 
                   res: ["Define product vision & roadmap", "User research & problem discovery", "Prioritization & PRD writing", "Collaborate with engineering & design", "Track adoption & engagement metrics"],
                   case: "Swiggy improving checkout conversion from 85% → 92%",
                   metrics: "Retention, Adoption, NPS, DAU"
                 },
                 { 
                   role: "Growth Product Manager", badge: "The Optimizer", 
                   focus: "Driving acquisition, activation, retention & revenue.", 
                   res: ["Funnel optimization & loops", "A/B testing & experimentation", "Work closely with marketing & analytics", "Monetization strategy"],
                   case: "Duolingo improving daily streak feature → +15% retention",
                   metrics: "DAU/MAU, Conversion Rate, LTV, Churn"
                 },
                 { 
                   role: "Platform Product Manager", badge: "The Enabler", 
                   focus: "Internal systems, APIs & developer experience.", 
                   res: ["Build scalable internal platforms (auth, notifications, payments)", "Align engineering teams & reliability goals", "Reduce build time and dependency blocks"],
                   case: "Razorpay building unified payments gateway API",
                   metrics: "API Uptime, Latency, Integration Adoption"
                 },
                 { 
                    role: "Data Product Manager", badge: "The Analyst PM", 
                    focus: "Data pipelines, dashboards & experimentation framework.", 
                    res: ["Define tracking & data schemas", "Partner with DS/ML teams", "Ensure data quality & governance", "Enable insight-driven decisions"],
                    case: "Meesho enabling real-time retention dashboards",
                    metrics: "Data accuracy, Latency, Dashboard usage"
                 },
                 { 
                    role: "Technical Product Manager", badge: "TPM", 
                    focus: "Highly technical systems & integrations.", 
                    res: ["Translate business requirements → architecture requirements", "Manage APIs, backend integrations & scalability", "Balance tech debt & feature delivery"],
                    case: "Slack launching developer API endpoints",
                    metrics: "Reliability, Integration success, Performance"
                 },
                 { 
                    role: "AI Product Manager", badge: "The Intelligent Builder", 
                    focus: "Products powered by machine learning & generative AI.", 
                    res: ["Identify opportunities for AI impact", "Work with ML engineers on model lifecycle: data → training → deployment", "Ensure responsible, bias-free AI behavior", "Convert technical model metrics → business metrics"],
                    case: "Netflix personalization engine → +15% viewing time",
                    metrics: "Model accuracy, Usage, Adoption",
                    skills: ["ML fundamentals", "Prompt engineering", "Model testing & iteration"]
                 }
               ].map((type, i) => (
                 <div key={type.role} className="relative pl-12 border-l-2 border-zinc-100">
                    <div className="absolute left-[-11px] top-0 w-5 h-5 bg-white border-4 border-indigo-600 rounded-full"></div>
                    <div className="space-y-4">
                       <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">{i+1}. {type.role}</h3>
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">{type.badge}</span>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                             <p className="text-zinc-600"><span className="font-black text-zinc-900">Focus:</span> {type.focus}</p>
                             <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Responsibilities</p>
                                <ul className="grid grid-cols-1 gap-2">
                                    {type.res.map(r => <li key={r} className="text-xs font-bold text-zinc-500 flex items-start gap-2"><div className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5 shrink-0"></div> {r}</li>)}
                                </ul>
                             </div>
                             {type.skills && (
                                <div className="pt-2">
                                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">Key Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {type.skills.map(s => <span key={s} className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[9px] font-black rounded uppercase">{s}</span>)}
                                    </div>
                                </div>
                             )}
                          </div>
                          <div className="p-5 bg-zinc-900 rounded-3xl text-zinc-300 text-sm space-y-3 shadow-xl h-fit">
                             <div className="flex items-center gap-2 mb-1">
                                <Target className="w-4 h-4 text-indigo-400" />
                                <p className="font-black text-indigo-400 uppercase tracking-widest text-[10px]">Real Example</p>
                             </div>
                             <p className="font-bold text-white leading-relaxed">{type.case}</p>
                             <div className="pt-3 border-t border-zinc-800">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity className="w-4 h-4 text-indigo-400" />
                                    <p className="font-black text-indigo-400 uppercase tracking-widest text-[10px]">North Star Metrics</p>
                                </div>
                                <p className="text-xs font-medium text-zinc-400">{type.metrics}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">8. PM Deliverables</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { t: "PRD", p: "Clarifies what & why for teams", i: FileEdit },
                    { t: "Roadmap", p: "Timeline of priorities & goals", i: Calendar },
                    { t: "User Stories", p: "Smallest unit of work detail", i: MessageSquare },
                    { t: "Metrics Dashboard", p: "Tracks feature health & success", i: Gauge },
                    { t: "GTM / Launch Plan", p: "Strategy for market entry", i: Send }
                ].map(item => (
                    <div key={item.t} className="p-5 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-start gap-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-600"><item.i className="w-4 h-4" /></div>
                        <div>
                            <h4 className="font-black text-zinc-900 text-sm">{item.t}</h4>
                            <p className="text-xs text-zinc-500 font-medium">{item.p}</p>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          <section className="bg-zinc-900 text-white p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><Brain className="w-32 h-32" /></div>
             <h3 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tight">
                <Sparkles className="w-6 h-6 text-indigo-400" />
                Myths vs Reality
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {[
                  { m: "“PMs are the boss of the team.”", r: "PMs have no authority — influence only." },
                  { m: "“PMs must know how to code.”", r: "Not required, but tech literacy is crucial." },
                  { m: "“PMs only build new features.”", r: "PMs solve problems. Sometimes by removing features." },
                  { m: "“PMs manage timelines.”", r: "That's project management. PMs define what & why." }
                ].map((myth, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-zinc-500 font-bold text-sm italic">{myth.m}</p>
                    <p className="text-indigo-400 font-black text-lg flex items-center gap-2">
                       <CheckCircle className="w-4 h-4" /> {myth.r}
                    </p>
                  </div>
                ))}
             </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[2.5rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-1 Mini Assignment</h4>
            <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl">Pick a product you use daily (e.g., Spotify, Zomato, Notion, Cred) and answer:</p>
          </header>
          
          <div className="mt-10 p-8 bg-zinc-950 rounded-3xl border border-zinc-800">
             <p className="font-black text-indigo-400 uppercase tracking-widest text-xs mb-6">Submission Format</p>
             <pre className="font-mono text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
Product Name: ___
User Problem: ___
Key Metrics: ___
Improvement Suggestion: ___
             </pre>
          </div>

          <div className="mt-12 space-y-6">
            <h4 className="text-2xl font-black text-zinc-900 tracking-tight">Reflection Task</h4>
            <p className="text-zinc-600 font-medium leading-relaxed">Identify which of the 6 PM types excites you the most and why. Does it align with your current background (e.g., Engineer → TPM, Marketing → Growth)?</p>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16">
        <header className="bg-emerald-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-emerald-100 border border-emerald-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-emerald-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">The Product Development Lifecycle (PDLC) 📘</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Theme: How products move from idea → design → build → launch → iterate.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="bg-[#fdfbe9] rounded-[2.5rem] p-8 md:p-12 border border-[#f5f1c5] shadow-sm space-y-10">
             <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tighter text-center">The Product Development Lifecycle (PDLC)</h2>
             <div className="space-y-4">
                <div className="flex flex-wrap md:flex-nowrap justify-center gap-2 md:gap-0">
                   <PDLCChevron text="DISCOVERY" />
                   <PDLCChevron text="DEFINITION" />
                   <PDLCChevron text="DESIGN" />
                </div>
                <div className="flex flex-wrap md:flex-nowrap justify-center gap-2 md:gap-0">
                   <PDLCChevron text="DEVELOPMENT" />
                   <PDLCChevron text="LAUNCH" />
                   <PDLCChevron text="ITERATION" />
                </div>
             </div>
          </section>

          <section className="space-y-6">
             <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Learning Objectives</h2>
             <p className="text-lg text-zinc-600 font-medium">By the end of today, you will:</p>
             <ul className="space-y-3 pl-6 list-disc text-zinc-700 font-medium">
                <li>Understand the full lifecycle of product development</li>
                <li>Know what happens at every stage & what PMs contribute</li>
                <li>Learn common outputs, tools, and real examples</li>
                <li>Avoid the typical mistakes that junior PMs make</li>
             </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">1. What is PDLC?</h2>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">Product Development Lifecycle (PDLC) is the structured process of taking a product from problem discovery → launch → continuous improvement, ensuring decisions are user-driven, data-backed, and business-aligned.</p>
            
            <div className="overflow-x-auto border border-zinc-100 rounded-2xl bg-zinc-50/30 mt-6">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-zinc-100/50 border-b border-zinc-100">
                    <tr>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Stage</th>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Goal</th>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Key Output</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-zinc-600 font-medium">
                    {[
                       { s: "Discovery", g: "Understand the user problem", o: "Problem statement, Personas" },
                       { s: "Definition", g: "Scope & prioritize solution", o: "PRD, success metrics" },
                       { s: "Design", g: "Visualize experience", o: "Wireframes, Prototype" },
                       { s: "Development", g: "Build & test", o: "MVP, QA sign-off" },
                       { s: "Launch", g: "Ship product to users", o: "GTM plan, adoption data" },
                       { s: "Iteration", g: "Improve continuously", o: "Insights, next roadmap" }
                    ].map(row => (
                      <tr key={row.s}>
                         <td className="p-5 font-black text-zinc-900">{row.s}</td>
                         <td className="p-5">{row.g}</td>
                         <td className="p-5 text-indigo-600 font-bold">{row.o}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </section>

          {[
            { phase: "1", title: "Discovery (Find the Right Problem)", goal: "“Fall in love with the problem, not the solution.” Understand real user needs and validate the painpoint.", act: ["Market & competitor research", "User interviews, surveys", "Data analysis (Mixpanel, GA, SQL)", "Identify Jobs-to-be-Done (JTBD)"], out: ["Problem statement", "Personas", "Hypothesis", "Opportunity sizing"], case: "Zomato observes high checkout drop-offs because of unpredictable surge delivery fees." },
            { phase: "2", title: "Definition (Scope the Solution)", goal: "Turn insights into an actionable plan. Define what we are building and how we measure success.", act: ["Prioritization (RICE, MOSCOW, Value-Effort)", "Success metrics / OKRs", "PRD writing", "Align with design & engineering"], out: ["PRD", "Prioritized roadmap", "Success metrics"], case: "Test a Flat Delivery Fee Subscription Model to reduce checkout abandonment by 15%." },
            { phase: "3", title: "Design (Shape the Experience)", goal: "Design an intuitive experience for solving the defined problem.", act: ["Wireframes & prototypes in Figma", "User testing & usability reviews", "Accessibility & UI polishing"], out: ["Prototype", "Usability results", "Design specs"], case: "Prototype for 1-click subscription to Zomato delivery fee waiver." },
            { phase: "4", title: "Development (Build)", goal: "Build and test the feature until ready for release. Focus on functional alignment.", act: ["Sprint planning & execution (Jira)", "Daily standups, bug triage", "QA & UAT testing", "Feature flag rollout"], out: ["Working MVP", "Release candidate", "Go/No-Go decision"], case: "Feature toggle rollout to 5% of users in Bangalore to test load performance." },
            { phase: "5", title: "Launch (Ship & Distribute)", goal: "“Shipping is a feature.” Release value to users and drive broad adoption.", act: ["GTM strategy (Marketing, Sales, Support)", "Announcements, tutorials, walkthroughs", "Monitor adoption & sentiment"], out: ["GTM docs", "Release comms", "Launch dashboard"], case: "Email + push campaign tracking adoption of the new delivery subscription." },
            { phase: "6", title: "Iteration (Learn & Improve)", goal: "Improve continuously based on data. The cycle never truly ends.", act: ["Analyze Mixpanel, GA, SQL reports", "Collect feedback (NPS, CSAT)", "Identify improvement opportunities"], out: ["Insights report", "Updated roadmap", "New hypothesis"], case: "Feature adoption = 70%, renewal = 30% → pricing experiment planned to improve retention." }
          ].map(p => (
            <section key={p.phase} className="space-y-6 pt-10 border-t border-zinc-100">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-lg">0{p.phase}</div>
                  <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Phase {p.phase}: {p.title}</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <div>
                        <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Goal</p>
                        <p className="text-lg font-bold text-zinc-800 leading-relaxed italic">{p.goal}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Activities</p>
                        <ul className="space-y-1">
                           {p.act.map(a => (
                             <li key={a} className="text-zinc-600 font-medium flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> {a}
                             </li>
                           ))}
                        </ul>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <p className="text-[10px] font-black uppercase text-zinc-400 mb-2">Outputs</p>
                        <div className="flex flex-wrap gap-2">
                           {p.out.map(o => (
                             <span key={o} className="px-2.5 py-1 bg-white rounded-lg border border-zinc-200 text-[10px] font-black text-zinc-700 shadow-sm">{o}</span>
                           ))}
                        </div>
                     </div>
                     <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <p className="text-[10px] font-black uppercase text-indigo-400 mb-1">Industry Case</p>
                        <p className="text-xs font-bold text-indigo-900 leading-relaxed">{p.case}</p>
                     </div>
                  </div>
               </div>
            </section>
          ))}

          <section className="bg-zinc-900 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 tracking-tight">
               <Sparkles className="w-6 h-6 text-indigo-400" />
               Key Takeaways
            </h3>
            <div className="space-y-4">
               {[
                 "The best PMs don’t build features — they solve problems.",
                 "PDLC creates structure, clarity, and alignment across the org.",
                 "Launch is not the end — iteration is where results come from."
               ].map((text, i) => (
                 <div key={i} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 font-black text-white group-hover:scale-110 transition-transform">{i+1}</div>
                    <p className="text-lg font-bold tracking-tight text-zinc-300">{text}</p>
                 </div>
               ))}
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[2.5rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-2 Mini Assignment</h4>
            <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl">Pick any app (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and describe a new feature across the PDLC:</p>
          </header>
          <div className="p-8 bg-zinc-950 rounded-3xl border border-zinc-800 mt-8">
            <pre className="font-mono text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
Product: ___
Feature Idea: ___
Discovery – Problem & insight: ___
Definition – Hypothesis & metrics: ___
Design – Sketch or description: ___
Development – Dependencies / risks: ___
Launch – Target segment & rollout plan: ___
Iteration – What will you measure?: ___
            </pre>
          </div>
          <div className="pt-6 border-t border-zinc-100 flex items-start gap-4">
            <Info className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
            <p className="text-zinc-600 text-lg leading-relaxed font-medium">📌 Expected outcome: You learn to think like a PM end-to-end, considering everything from feasibility to measurement.</p>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16">
        <header className="bg-indigo-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Product Life Cycle (PLC) & PLM 📘</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Understand how products evolve in the market over time and how companies manage that journey.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">What is Product Life Cycle (PLC)?</h2>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">Product Life Cycle is the journey a product goes through in the market — from the day it is launched to the day it is eventually retired.</p>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">What Are the 4 Stages of Product Life Cycle?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <h4 className="font-black text-xl text-blue-900 mb-2">Introduction</h4>
                  <p className="text-sm text-blue-800 leading-relaxed">This is when a new product is first introduced to the market. Sales are usually low because customers are just starting to become aware of the product, and marketing efforts are focused on building awareness and generating interest. Companies may be investing heavily in research and development during this stage.</p>
               </div>
               <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <h4 className="font-black text-xl text-emerald-900 mb-2">Growth</h4>
                  <p className="text-sm text-emerald-800 leading-relaxed">In this stage, the product starts to gain interest. Sales begin to increase as more customers become aware of the product and start buying it. Marketing efforts now focus on expanding market share and building brand loyalty. Competitors may also start entering the market during this stage.</p>
               </div>
               <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                  <h4 className="font-black text-xl text-amber-900 mb-2">Maturity</h4>
                  <p className="text-sm text-amber-800 leading-relaxed">This is the stage of peak sales. The product has reached its maximum market penetration, and sales growth starts to level off. Competition is usually intense, and companies may need to focus on differentiating their product through added features, improved quality, or competitive pricing.</p>
               </div>
               <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                  <h4 className="font-black text-xl text-rose-900 mb-2">Decline</h4>
                  <p className="text-sm text-rose-800 leading-relaxed">In the decline stage, sales begin to decline as customer preferences change, new technologies emerge, or market saturation occurs. Companies may choose to discontinue the product or try to extend it via strategies like updates, new marketing, or new segments.</p>
               </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">What is Product Lifecycle Management (PLM)?</h2>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">Product Lifecycle Management (PLM) is the practice of managing a product from its initiation to its eventual retirement through a systematic approach.</p>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">It's a system that helps manage every step of a product's life, from the initial idea and design to manufacturing, distribution, and even after it's sold. It's a way for companies to keep track of all the details and make sure everyone involved is on the same page throughout the product's journey. So, in simpler terms, PLM is like a guidebook that helps companies manage their products from start to finish.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Stages of a Product in PLM</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { t: "Concept Stage", d: "The start of making a new product. Involves initial ideas and planning, market research, identifying customer needs, and determining feasibility. Usually R&D takes the lead." },
                 { t: "Design Stage", d: "Careful plan for the product, building prototypes, and testing everything. Ensuring the design meets all rules and safety standards. Significant R&D spend happens here." },
                 { t: "Production Stage", d: "Making the product at scale—getting materials, putting everything together, and quality checks. Design changes should be minimal at this point." },
                 { t: "Sales Stage", d: "About telling people about the product and getting them to buy it via advertisements, prices, and special deals. Forecasting is crucial." },
                 { t: "Support Stage", d: "Ongoing customer support including customer service, warranties, repairs, and services or training to enhance user experience." },
                 { t: "Retirement Stage", d: "The life of the product ends due to better products, preference shifts, or tech moves. Includes responsible recycling or find new uses." }
               ].map(s => (
                 <div key={s.t} className="p-5 bg-zinc-50 border border-zinc-100 rounded-2xl">
                    <h4 className="font-black text-zinc-900 mb-2">{s.t}</h4>
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed">{s.d}</p>
                 </div>
               ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Benefits of PLM</h2>
            <div className="space-y-4">
               {[
                 { t: "Improved Collaboration", d: "PLM encourages cross-functional collaboration, ensuring that all stakeholders, from design to sales, work together seamlessly." },
                 { t: "Enhanced Product Quality", d: "By integrating quality control into each phase, PLM helps identify and rectify potential issues early, resulting in higher-quality products." },
                 { t: "Efficient Resource Utilization", d: "Streamlines processes, reducing waste and optimizing resource utilization, leading to significant cost savings." },
                 { t: "Faster Time-to-Market", d: "A structured approach facilitates quicker development cycles, enabling companies to bring products to market more rapidly." },
                 { t: "Regulatory Compliance", d: "PLM systems assist in ensuring that products meet regulatory standards, minimizing the risk of legal and compliance issues." }
               ].map(b => (
                 <div key={b.t} className="flex gap-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white shrink-0 h-fit"><Zap className="w-4 h-4" /></div>
                    <div>
                       <h4 className="font-black text-indigo-900 mb-1">{b.t}</h4>
                       <p className="text-sm text-indigo-800 font-medium">{b.d}</p>
                    </div>
                 </div>
               ))}
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[2.5rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-3 Mini Assignment</h4>
            <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl">Pick any product (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and evaluate its lifecycle:</p>
          </header>
          <div className="p-8 bg-zinc-950 rounded-3xl border border-zinc-800 mt-8">
            <pre className="font-mono text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
Product: ___
Current PLC Stage: ___
What signals tell you this stage?: ___
What should PM focus on right now (Strategy)?: ___
One risky decision PM must make at this stage: ___
If it’s declining, how would you extend or sunset it?: ___
            </pre>
          </div>
          <div className="pt-6 border-t border-zinc-100 flex items-start gap-4">
            <Info className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
            <p className="text-zinc-600 text-lg leading-relaxed font-medium">📌 Expected outcome: You learn to think like a PM end-to-end, considering everything from feasibility to measurement.</p>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans">
        <header className="bg-indigo-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Product Sense Framework 📘</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Great PMs don’t build features. They solve meaningful problems. Master the "sixth sense" of Product Management.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">What is Product Sense?</h2>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">Product sense is the ability to see through complexity and spot the user needs that matter most. Experts like Marty Cagan emphasize that it is actually deep product knowledge built through immersion, not an innate gift.</p>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">The 7 Pillars of Product Sense</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { t: "Empathy & Customer Needs", d: "Listening for spoken and unspoken pain points and emotional drivers.", i: HeartHandshake },
                { t: "Market & Competitive Insight", d: "Analyzing trends and mapping competitor gaps to find unique value.", i: TrendingUpIcon },
                { t: "Design & UX Perspective", d: "Recognizing good flows and how design decisions affect engagement.", i: Layout },
                { t: "Problem Framing & Mapping", d: "Distinguishing root causes from symptoms and exploring options.", i: Compass },
                { t: "Feasibility & Execution", d: "Balancing ambitious ideas with tech constraints, budgets, and timelines.", i: Hammer },
                { t: "Iteration & Validation", d: "Using prototypes and experiments to adjust based on real data.", i: RefreshCcw },
                { t: "Domain Immersion", d: "Gaining deep knowledge of a space to predict behaviors and outcomes.", i: BookOpen }
              ].map((p, idx) => (
                <div key={idx} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col hover:bg-white hover:border-indigo-100 transition-all shadow-sm group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <p.i className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-lg text-zinc-900 mb-2 leading-tight">{p.t}</h4>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">{p.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Why Aspiring PMs Must Master It</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { t: "A Key Hiring Criterion", d: "Most companies test for product sense during interviews to see if you can analyze products meaningfully." },
                { t: "Bridges Strategy and Execution", d: "Ties small features to the 'bigger picture' and strategic goals." },
                { t: "Anticipates User Behavior", d: "Sense unarticulated needs before competitors (e.g., Original iPhone, Gmail)." },
                { t: "Stakeholder Alignment", d: "Provides the rationale needed to explain trade-offs to engineers and execs." }
              ].map(reason => (
                <div key={reason.t} className="p-6 bg-zinc-50/50 rounded-2xl border border-zinc-100">
                  <h4 className="font-black text-zinc-900 mb-2">{reason.t}</h4>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">{reason.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Daily Habits to Build Instincts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { t: "Talk to Users Regularly", d: "Read tickets, join sales calls, and observe context surveys miss.", i: Users },
                { t: "Reverse-Engineer Products", d: "Break down apps like Airbnb to understand core needs and trade-offs.", i: RefreshCcw },
                { t: "Perform Product Drills", d: "List 3 strengths and 3 weaknesses of a daily-use app with justifications.", i: FileEdit },
                { t: "Embrace Constraints", d: "Design solutions under strict limits (e.g., 30s onboarding) to sharpen judgment.", i: Timer }
              ].map(habit => (
                <div key={habit.t} className="p-6 bg-white border border-zinc-100 rounded-2xl flex items-start gap-4 shadow-sm">
                  <div className="p-2 bg-indigo-50 rounded-lg shrink-0"><habit.i className="w-4 h-4 text-indigo-600" /></div>
                  <div>
                    <p className="font-black text-zinc-900 mb-1 leading-tight">{habit.t}</p>
                    <p className="text-sm text-zinc-500 font-medium">{habit.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6 pt-10 border-t border-zinc-100">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Ace the Product Sense Interview</h2>
            <p className="text-zinc-600 font-medium">Hiring managers look for clarity, empathy, and reasoning rather than just a "correct" answer.</p>
            <ul className="space-y-4">
              {[
                "Frame the problem clearly before jumping to solutions.",
                "Identify specific user segments and their unique pains.",
                "Propose solutions with a rationale, explaining the hypothesis.",
                "Discuss trade-offs—be prepared to answer, \"Who suffers if we cut this feature?\"."
              ].map((tip, i) => (
                <li key={i} className="flex gap-4 items-start">
                   <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle className="w-4 h-4 text-emerald-600" /></div>
                   <p className="text-zinc-700 font-medium">{tip}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-zinc-900 text-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><Brain className="w-32 h-32" /></div>
             <h3 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tight text-indigo-400">
                <ShieldAlert className="w-6 h-6" />
                Common Pitfalls to Avoid
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {[
                  { t: "Over-reliance on \"Gut\"", d: "Instincts must be tempered by data; ignoring analytics is dangerous unless honed by experience." },
                  { t: "The Aesthetic Trap", d: "Don't mistake polished UI for good product sense; a beautiful design solving the wrong problem is a failure." },
                  { t: "Domain Overfitting", d: "Don't assume a playbook from one industry will automatically work in another." },
                  { t: "Feature Bloat", d: "Weak sense leads to \"copying competitors,\" resulting in a bloated product that fails real problems." }
                ].map((pitfall, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="font-black text-lg text-white">{pitfall.t}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{pitfall.d}</p>
                  </div>
                ))}
             </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[2.5rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-4 Mini Assignment</h4>
            <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl">Read this expert breakdown of Product Sense and apply it to a feature teardown.</p>
          </header>
          <div className="mt-8 p-6 bg-zinc-50 border border-zinc-100 rounded-3xl">
             <p className="font-black text-zinc-900 mb-2">Reading: <a href="https://www.parallelhq.com/blog/what-product-sense" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">What is Product Sense?</a> by Robin Dhanwani</p>
             <div className="space-y-4 mt-6">
                <p className="text-xs font-black uppercase text-indigo-600 tracking-widest">Task</p>
                <p className="text-zinc-700 font-medium leading-relaxed">
                   Pick a feature from an app you use daily. Write a 1-page "Product Sense Teardown" identifying: <br/>
                   <span className="font-black text-zinc-900">1)</span> The core user problem <br/>
                   <span className="font-black text-zinc-900">2)</span> The hypothesis behind the design <br/>
                   <span className="font-black text-zinc-900">3)</span> One critical trade-off they made.
                </p>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans">
        <header className="bg-indigo-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">User Empathy 📘</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Step into their shoes. User empathy is the fundamental driver of human-centered development.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">User Empathy in Product</h2>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">User empathy is the ability to understand and share the feelings, needs, and perspectives of users by "stepping into their shoes" to view the product through their eyes. It drives human-centered development.</p>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Core Principles of User Empathy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { t: "Active Listening", d: "Listen without judgment. Encourage open communication and hear what's NOT being said.", i: Mic },
                { t: "Putting Users First", d: "Prioritize user needs over internal assumptions or ego. Align decisions with their interests.", i: HeartHandshake },
                { t: "Deep Connection", d: "Grasp challenges, desires, and emotional motivations of your audience, not just tech specs.", i: Users }
              ].map((principle, idx) => (
                <div key={idx} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 flex flex-col hover:bg-white hover:border-indigo-100 transition-all shadow-sm">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 text-indigo-600 shadow-sm">
                    {principle.i && <principle.i className="w-5 h-5" />}
                  </div>
                  <h4 className="font-black text-lg text-zinc-900 mb-2 leading-tight">{principle.t}</h4>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">{principle.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-10">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Implementation Process for PMs</h2>
            <div className="space-y-12">
               <div className="flex gap-8 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shrink-0 font-black text-xl group-hover:scale-110 transition-transform">1</div>
                  <div className="space-y-4">
                     <h4 className="text-2xl font-black text-zinc-900 tracking-tight">User Research & Personas</h4>
                     <ul className="space-y-2 text-zinc-600 font-medium">
                       <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> <strong className="text-zinc-900">Research Methods:</strong> Interviews, surveys, and usability testing.</li>
                       <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> <strong className="text-zinc-900">Personas:</strong> Visualize different user groups.</li>
                       <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> <strong className="text-zinc-900">Empathy Maps:</strong> Map what users think, feel, experience, and do.</li>
                     </ul>
                  </div>
               </div>

               <div className="flex gap-8 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shrink-0 font-black text-xl group-hover:scale-110 transition-transform">2</div>
                  <div className="space-y-4">
                     <h4 className="text-2xl font-black text-zinc-900 tracking-tight">Design Thinking Integration</h4>
                     <div className="flex flex-wrap gap-2">
                        {['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'].map(step => (
                          <span key={step} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-black text-xs uppercase tracking-widest border border-indigo-100">{step}</span>
                        ))}
                     </div>
                     <p className="text-zinc-600 font-medium leading-relaxed max-w-2xl">PMs observe interactions, define pain points, ideate solutions, and test prototypes to refine the experience based on feedback.</p>
                  </div>
               </div>

               <div className="flex gap-8 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shrink-0 font-black text-xl group-hover:scale-110 transition-transform">3</div>
                  <div className="space-y-4">
                     <h4 className="text-2xl font-black text-zinc-900 tracking-tight">Continuous Feedback Loops</h4>
                     <p className="text-zinc-600 font-medium leading-relaxed max-w-2xl">Involve users at every stage, not just at the end. Use User Acceptance Testing (UAT) and iterative analysis to evolve with changing user preferences.</p>
                  </div>
               </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Key Tools & Frameworks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { t: "User Journey Mapping", d: "Visualizing the path a user takes.", i: Compass },
                { t: "User Stories", d: "Features from the user's perspective.", i: MessageSquare },
                { t: "User Flows", d: "Step-by-step task completion.", i: RefreshCcw },
                { t: "User Segments", d: "Categorizing unique group needs.", i: Users2 }
              ].map(tool => (
                <div key={tool.t} className="p-6 bg-white border border-zinc-100 rounded-2xl flex items-center gap-5 shadow-sm hover:border-indigo-100 transition-colors">
                  <div className="p-3 bg-zinc-50 rounded-xl text-zinc-400"><tool.i className="w-5 h-5" /></div>
                  <div>
                    <p className="font-black text-zinc-900 leading-tight mb-1">{tool.t}</p>
                    <p className="text-xs text-zinc-500 font-medium">{tool.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-10 md:p-14 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5"><Logo className="w-48 h-48" /></div>
            <h3 className="text-2xl font-black text-indigo-900 tracking-tight flex items-center gap-3">
               <Sparkles className="w-6 h-6 text-indigo-600" />
               Real-World Success
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-4">
                  <h4 className="text-xl font-black text-zinc-900">Apple</h4>
                  <p className="text-zinc-600 font-medium leading-relaxed">Demonstrates empathy through user-friendly interfaces and seamless experiences that create a loyal base.</p>
               </div>
               <div className="space-y-4">
                  <h4 className="text-xl font-black text-zinc-900">Airbnb</h4>
                  <p className="text-zinc-600 font-medium leading-relaxed">Achieved success by focusing on the traveler's need for unique and personalized experiences.</p>
               </div>
            </div>
            <p className="text-2xl font-black italic text-center text-indigo-900 pt-10 border-t border-indigo-200/50">
               "Empathy is a core value that ensures products exceed expectations, not just meet them."
            </p>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[2.5rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-5 Mini Assignment</h4>
          </header>
          <div className="mt-8 space-y-8">
             <div className="space-y-2">
                <p className="text-xs font-black uppercase text-indigo-600 tracking-widest">Task</p>
                <p className="text-xl text-zinc-800 font-bold leading-relaxed">Find out How did Airbnb use user empathy to drive their success? Look for specific stories about their "early days" and how they handled user problems.</p>
             </div>
             
             <div className="p-8 bg-zinc-950 rounded-3xl border border-zinc-800 space-y-6">
                <p className="font-black text-indigo-400 uppercase tracking-widest text-xs">Reflection Questions</p>
                <ul className="space-y-4">
                   {[
                      "How did they identify the problem travelers faced?",
                      "What \"unscalable\" things did the founders do to empathize with hosts?",
                      "How is that empathy reflected in the current app experience?"
                   ].map((q, i) => (
                      <li key={i} className="flex gap-4 items-start">
                         <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 font-black text-xs">{i+1}</span>
                         <p className="text-zinc-200 font-bold">{q}</p>
                      </li>
                   ))}
                </ul>
             </div>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans">
        <header className="bg-amber-500 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-amber-100 border border-amber-400">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Foundations</span>
            <span className="text-amber-50 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Business Fundamentals for PMs 💰</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Master the metrics that drive sustainable products. Learn CAC, LTV, and the "Golden Ratio" of business success.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Learning Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Understand and calculate key unit economics metrics (CAC, LTV, payback period)",
                "Identify and analyze different business models and revenue streams",
                "Evaluate product decisions through a business lens",
                "Communicate the business impact of product features",
                "Assess product-market fit using business metrics"
              ].map((obj, i) => (
                <div key={i} className="flex gap-3 items-start p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-zinc-700">{obj}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Why Business Fundamentals Matter for PMs</h2>
            <p className="text-lg text-zinc-600 leading-relaxed max-w-[75ch]">Product Managers are often called the "mini-CEO" of their product. Here's why business knowledge is critical:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <h4 className="font-black text-emerald-600 flex items-center gap-2 uppercase tracking-widest text-xs">
                    <TrendingUp className="w-4 h-4" /> What Good PMs Do
                  </h4>
                  <ul className="space-y-3">
                    {["Balance user value with business value", "Justify investments with ROI calculations", "Speak confidently to executives", "Understand customer lifecycle economics"].map(t => (
                      <li key={t} className="text-sm font-bold text-zinc-700 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {t}</li>
                    ))}
                  </ul>
               </div>
               <div className="space-y-4">
                  <h4 className="font-black text-rose-600 flex items-center gap-2 uppercase tracking-widest text-xs">
                    <X className="w-4 h-4" /> Common PM Mistakes
                  </h4>
                  <ul className="space-y-3">
                    {["Building features users love but don't pay for", "Ignoring customer acquisition costs", "Focusing on vanity metrics", "Ignoring sustainability"].map(t => (
                      <li key={t} className="text-sm font-bold text-zinc-700 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> {t}</li>
                    ))}
                  </ul>
               </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "Twitter/X", d: "Built incredible engagement but struggled with monetization for a decade. Engagement ≠ Business Success." },
              { t: "Instagram", d: "Delayed monetization to focus on growth. Worked because they had Facebook's massive resources." },
              { t: "Notion", d: "Freemium model carefully designed to convert power users. Model aligned perfectly with user behavior." }
            ].map(caseItem => (
              <div key={caseItem.t} className="p-6 bg-zinc-50 border border-zinc-100 rounded-3xl group hover:border-indigo-200 transition-all">
                <h4 className="font-black text-zinc-900 mb-2">{caseItem.t}</h4>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed">{caseItem.d}</p>
              </div>
            ))}
          </section>

          <section className="space-y-12 py-10 border-y border-zinc-100">
             <div className="space-y-6">
                <h2 className="text-3xl font-black tracking-tight text-zinc-900">Customer Acquisition Cost (CAC)</h2>
                <div className="p-8 bg-zinc-900 text-white rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                   <div className="space-y-2">
                      <p className="text-indigo-400 font-black uppercase tracking-widest text-[10px]">The Formula</p>
                      <p className="text-2xl font-black tracking-tight">CAC = (Total Mkt + Sales Costs) / # New Users</p>
                   </div>
                   <div className="w-full md:w-1/3 p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">Example</p>
                      <p className="text-sm font-bold text-zinc-300">$50,000 spend + 500 users = <span className="text-white font-black">$100 CAC</span></p>
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <h2 className="text-3xl font-black tracking-tight text-zinc-900">Lifetime Value (LTV)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      <p className="font-black text-indigo-600 uppercase tracking-widest text-[10px] mb-4">Simple LTV</p>
                      <p className="text-xl font-black text-zinc-900 mb-2">ARPU × Avg Lifespan</p>
                      <p className="text-xs text-indigo-700 font-medium leading-relaxed">Basic calculation for recurring revenue products.</p>
                   </div>
                   <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                      <p className="font-black text-indigo-400 uppercase tracking-widest text-[10px] mb-4">LTV with Churn</p>
                      <p className="text-xl font-black text-white mb-2">(ARPU × Gross Margin) / Churn Rate</p>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed">More sophisticated for mature SaaS startups.</p>
                   </div>
                </div>
                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4">
                  <Zap className="w-8 h-8 text-emerald-600 shrink-0" />
                  <p className="text-sm font-bold text-emerald-900 leading-relaxed">
                    <span className="font-black">Critical Insight:</span> Increasing customer lifespan by 50% directly increases LTV by 50%, without spending more on marketing! This is why retention features are high-ROI.
                  </p>
                </div>
             </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">The Golden Ratio: LTV:CAC</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="p-6 border border-rose-100 bg-rose-50 rounded-3xl space-y-3">
                  <p className="font-black text-rose-600 text-2xl tracking-tighter">&lt; 1:1</p>
                  <p className="font-black text-rose-900 text-sm">Crisis Mode</p>
                  <p className="text-xs text-rose-800 font-medium">Losing money. Reduce CAC or increase LTV urgently.</p>
               </div>
               <div className="p-6 border border-emerald-100 bg-emerald-50 rounded-3xl space-y-3 shadow-lg shadow-emerald-100/50">
                  <p className="font-black text-emerald-600 text-2xl tracking-tighter">3:1 to 5:1</p>
                  <p className="font-black text-emerald-900 text-sm uppercase tracking-widest">The Sweet Spot</p>
                  <p className="text-xs text-emerald-800 font-medium">Optimal balance. Scalable and healthy business.</p>
               </div>
               <div className="p-6 border border-blue-100 bg-blue-50 rounded-3xl space-y-3">
                  <p className="font-black text-blue-600 text-2xl tracking-tighter">&gt; 5:1</p>
                  <p className="font-black text-blue-900 text-sm">Underinvesting</p>
                  <p className="text-xs text-blue-800 font-medium">Too conservative. Competitors might outgrow you.</p>
               </div>
            </div>
            <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-between">
               <div>
                  <h4 className="font-black text-zinc-900">Payback Period</h4>
                  <p className="text-xs text-zinc-500 font-medium">Time to recover CAC. Target: &lt; 12 months.</p>
               </div>
               <p className="text-lg font-mono font-black text-indigo-600">CAC / (ARPU × GM)</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Business Models & Revenue Streams</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { t: "Subscription", d: "Netflix, SaaS. Focus: Retention, MRR.", i: RefreshCcw },
                { t: "Freemium", d: "Slack, Spotify. Focus: Upgrade loops.", i: Star },
                { t: "Marketplace", d: "Airbnb, Uber. Focus: Liquidity, Trust.", i: Users2 },
                { t: "Advertising", d: "Google, Meta. Focus: Attention, Data.", i: Smartphone },
                { t: "E-commerce", d: "Amazon, Myntra. Focus: Conv Rate, GMV.", i: Box },
                { t: "Enterprise SaaS", d: "Salesforce. Focus: Adoption, Security.", i: ShieldCheck },
                { t: "Usage-Based", d: "Stripe, AWS. Focus: Volume driving.", i: Zap },
                { t: "Hybrid", d: "LinkedIn. Multi-stream strategy.", i: Layers }
              ].map(model => (
                <div key={model.t} className="p-5 bg-white border border-zinc-100 rounded-2xl hover:border-indigo-100 transition-colors shadow-sm">
                   <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-3"><model.i className="w-5 h-5" /></div>
                   <h4 className="font-black text-sm text-zinc-900 mb-1 leading-tight">{model.t}</h4>
                   <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">{model.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-10 md:p-14 space-y-8">
            <h3 className="text-2xl font-black text-indigo-900 tracking-tight flex items-center gap-3">
               <span className="text-2xl">✨</span> Strategy Insight
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-4">
                  <h4 className="text-xl font-black text-zinc-900 flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full" /> Subscription Model</h4>
                  <p className="text-zinc-600 font-medium leading-relaxed text-sm">Prioritize engagement & retention. Avoid high-friction flows that cause churn. Measure <span className="font-black text-indigo-600">NRR</span> (Net Revenue Retention).</p>
               </div>
               <div className="space-y-4">
                  <h4 className="text-xl font-black text-zinc-900 flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full" /> Marketplace Model</h4>
                  <p className="text-zinc-600 font-medium leading-relaxed text-sm">Prioritize supply growth & liquidity. Avoid changes hurting one side of the market. Measure <span className="font-black text-indigo-600">GMV</span> (Gross Merchandise Value).</p>
               </div>
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-6 Mini Assignment</h4>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
             <div className="space-y-8">
                <div className="space-y-4">
                   <p className="text-xs font-black uppercase text-indigo-600 tracking-widest">Unit Economics Problem</p>
                   <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 space-y-2">
                      <p className="text-sm font-bold text-zinc-700">Ad Spend: $30,000</p>
                      <p className="text-sm font-bold text-zinc-700">Sales Team Costs: $20,000</p>
                      <p className="text-sm font-bold text-zinc-700">New Customers: 250</p>
                      <p className="text-sm font-bold text-zinc-700">ARPU: $40/month</p>
                      <p className="text-sm font-bold text-zinc-700">Avg Lifespan: 10 months</p>
                      <p className="text-sm font-bold text-zinc-700">Gross Margin: 80%</p>
                   </div>
                </div>

                <div className="space-y-4">
                   <p className="text-xs font-black uppercase text-indigo-600 tracking-widest">Calculate</p>
                   <ul className="space-y-4">
                      {[
                        { n: "1", l: "CAC", d: "(Total Mkt + Sales / New Users)" },
                        { n: "2", l: "LTV", d: "(ARPU × GM × Lifespan)" },
                        { n: "3", l: "LTV:CAC Ratio", d: " sustainability check" }
                      ].map(step => (
                        <li key={step.n} className="flex gap-4 items-center group">
                           <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0 font-black text-sm group-hover:scale-110 transition-transform">{step.n}</div>
                           <div>
                              <p className="font-black text-zinc-900 text-base leading-none">{step.l}</p>
                              <p className="text-[10px] text-zinc-500 font-medium">{step.d}</p>
                           </div>
                        </li>
                      ))}
                   </ul>
                </div>
             </div>

             <div className="bg-zinc-950 rounded-[2.5rem] p-10 border border-zinc-800 flex flex-col justify-center space-y-6">
                <p className="text-xs font-black uppercase text-indigo-400 tracking-widest">Reflective Strategy</p>
                <p className="text-zinc-300 font-bold text-lg leading-relaxed">
                   Based on your results, what should the PM prioritize: <br/><br/>
                   <span className="text-white underline underline-offset-4 decoration-indigo-500">Growth</span> (spend more), <br/>
                   <span className="text-white underline underline-offset-4 decoration-emerald-500">Efficiency</span> (reduce CAC), or <br/>
                   <span className="text-white underline underline-offset-4 decoration-pink-500">Retention</span> (increase lifespan)?
                </p>
                <div className="pt-6 border-t border-zinc-100 flex items-start gap-4">
                   <p className="text-zinc-500 text-xs font-medium italic">Hint: Look at the LTV:CAC Ratio Sweet Spot table above.</p>
                </div>
             </div>
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
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans">
        <header className="bg-purple-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-purple-100 border border-purple-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Research</span>
            <span className="text-purple-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Introduction to User & Market Research 🔍</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Think like a researcher. Learn structured methods to uncover pain points and validate product ideas.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 italic text-zinc-700 font-medium text-lg leading-relaxed">
            “Great products start with deep understanding — of users, their needs, and the market around them.”
          </section>

          <p className="text-lg leading-relaxed text-zinc-600">Today’s focus is to think like a researcher, not a builder. You’ll learn how to identify who your users are, what they struggle with, and why solving it matters.</p>

          <section className="space-y-6">
             <h2 className="text-3xl font-black tracking-tight text-zinc-900">Learning Objectives</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    "Explain the difference between user research and market research",
                    "Identify user pain points using qualitative and quantitative methods",
                    "Apply basic frameworks — Empathy Map, JTBD, and Segmentation",
                    "Use AI tools to accelerate research synthesis"
                ].map((obj, i) => (
                    <div key={i} className="flex gap-3 items-start p-4 bg-purple-50/30 rounded-xl border border-purple-100">
                        <CheckCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-zinc-700">{obj}</span>
                    </div>
                ))}
             </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">1. User Research vs Market Research</h2>
            <div className="overflow-x-auto border border-zinc-100 rounded-3xl bg-zinc-50/30">
                <table className="w-full text-left text-sm border-collapse min-w-[500px]">
                  <thead className="bg-zinc-100/50 border-b border-zinc-100">
                    <tr>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Aspect</th>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">User Research</th>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Market Research</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-zinc-600 font-medium">
                    <tr>
                      <td className="p-5 font-black text-zinc-900">Focus</td>
                      <td className="p-5">Individual behaviors & pain points</td>
                      <td className="p-5">Industry, competitors, trends</td>
                    </tr>
                    <tr>
                      <td className="p-5 font-black text-zinc-900">Goal</td>
                      <td className="p-5">Validate Problem</td>
                      <td className="p-5">Validate Opportunity</td>
                    </tr>
                    <tr>
                      <td className="p-5 font-black text-zinc-900">Methods</td>
                      <td className="p-5">Interviews, surveys, usability tests</td>
                      <td className="p-5">Desk research, benchmarking</td>
                    </tr>
                    <tr>
                      <td className="p-5 font-black text-zinc-900">Output</td>
                      <td className="p-5">Personas, Journey Maps</td>
                      <td className="p-5">TAM/SAM/SOM, SWOT</td>
                    </tr>
                  </tbody>
                </table>
             </div>
             <p className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl font-bold text-indigo-700 flex items-center gap-3">
               <span className="text-2xl shrink-0">👉</span> PM Tip: Always start with user research before market research. If users don’t want it, market data doesn’t matter.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">2. The Research Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                    { n: "1", t: "Define Objective", d: "“What do I want to learn?”" },
                    { n: "2", t: "Choose Method", d: "Interviews, surveys, or secondary." },
                    { n: "3", t: "Recruit Users", d: "Identify your target segments." },
                    { n: "4", t: "Collect Data", d: "Ask open-ended questions." },
                    { n: "5", t: "Synthesize", d: "Identify themes and insights." }
                ].map(step => (
                    <div key={step.n} className="p-5 bg-white border border-zinc-100 rounded-2xl flex flex-col items-center text-center group hover:border-purple-200 transition-all">
                        <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-black text-sm mb-3 group-hover:scale-110 transition-transform">{step.n}</div>
                        <h4 className="font-black text-zinc-900 text-xs uppercase tracking-widest mb-1">{step.t}</h4>
                        <p className="text-[10px] text-zinc-500 font-medium">{step.d}</p>
                    </div>
                ))}
            </div>
          </section>

          <section className="space-y-12 py-10 border-y border-zinc-100">
             <div className="space-y-6">
                <h2 className="text-3xl font-black tracking-tight text-zinc-900">3. Research Frameworks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-3xl space-y-6">
                      <h4 className="font-black text-xl text-zinc-900 tracking-tight">Empathy Map</h4>
                      <p className="text-sm text-zinc-500 font-medium">Map out what users: Says, Does, Thinks, and Feels.</p>
                      <div className="grid grid-cols-2 gap-3">
                         {['SAYS', 'DOES', 'THINKS', 'FEELS'].map(part => (
                             <div key={part} className="p-4 bg-white rounded-xl border border-zinc-100 flex items-center justify-center font-black text-zinc-400 text-xs tracking-widest">{part}</div>
                         ))}
                      </div>
                   </div>
                   <div className="p-8 bg-zinc-950 text-white rounded-3xl space-y-4">
                      <h4 className="font-black text-xl tracking-tight text-indigo-400">Jobs To Be Done (JTBD)</h4>
                      <p className="text-sm text-zinc-400 font-medium italic">“People don’t buy products; they hire them to get a job done.”</p>
                      <div className="space-y-2 font-black text-lg tracking-tight">
                         <p>When I... <span className="text-zinc-500">(situation)</span></p>
                         <p>I want to... <span className="text-zinc-500">(motivation)</span></p>
                         <p>So I can... <span className="text-zinc-500">(desired outcome)</span></p>
                      </div>
                      <p className="text-xs text-zinc-500 pt-4 border-t border-white/10">Example: hiring Duolingo to feel productive while waiting.</p>
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <h2 className="text-3xl font-black tracking-tight text-zinc-900">Segmentation Strategies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                   {[
                       { t: "Demographics", d: "Age, gender, location, income.", i: User },
                       { t: "Psychographics", d: "Motivations, lifestyle, values.", i: Brain },
                       { t: "Behavior", d: "Usage freq, loyalty, spending.", i: Activity },
                       { t: "Needs-Based", d: "Specific pain points & goals.", i: Target }
                   ].map(seg => (
                       <div key={seg.t} className="p-6 bg-white border border-zinc-100 rounded-2xl hover:shadow-md transition-all">
                          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4"><seg.i className="w-5 h-5" /></div>
                          <h4 className="font-black text-sm text-zinc-900 mb-1">{seg.t}</h4>
                          <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">{seg.d}</p>
                       </div>
                   ))}
                </div>
             </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Tools & AI Assistants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                   { t: "Interview Prep", app: "ChatGPT", d: "“Generate 10 questions for student productivity challenges.”", i: MessageCircle },
                   { t: "Competitor Scan", app: "Perplexity AI", d: "Real-time deep competitive analysis and market data.", i: Search },
                   { t: "Synthesis", app: "Notion AI", d: "Summarize key pain points from long interview transcripts.", i: FileText },
                   { t: "Visualization", app: "Canva", d: "Create visually compelling user personas.", i: Smartphone }
               ].map(tool => (
                   <div key={tool.t} className="p-6 bg-zinc-50 border border-zinc-100 rounded-3xl flex items-start gap-5 group">
                       <div className="p-3 bg-white rounded-2xl text-zinc-400 group-hover:bg-purple-600 group-hover:text-white transition-colors"><tool.i className="w-5 h-5" /></div>
                       <div>
                          <p className="text-[10px] font-black uppercase text-purple-600 mb-1">{tool.t}</p>
                          <h4 className="font-black text-lg text-zinc-900 mb-1">{tool.app}</h4>
                          <p className="text-sm text-zinc-500 font-medium leading-relaxed italic">"{tool.d}"</p>
                       </div>
                   </div>
               ))}
            </div>
          </section>

          <section className="bg-zinc-950 text-white p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><Zap className="w-32 h-32" /></div>
             <h3 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tight text-indigo-400">
                <Sparkles className="w-6 h-6" />
                Real-World Case: Zomato One-Tap
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { t: "Pain Point", d: "“Hungry but don't want to call restaurants or search again.”" },
                    { t: "Method", d: "Surveys & Usage Data Analysis" },
                    { t: "Insight", d: "Users repeat specific orders 60% of the time." },
                    { t: "Outcome", d: "1-Tap Reordering feature launched → Orders ↑ 22%" }
                ].map((item, i) => (
                    <div key={i} className="space-y-2">
                        <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{item.t}</p>
                        <p className="text-sm font-bold text-zinc-200 leading-relaxed">{item.d}</p>
                    </div>
                ))}
             </div>
          </section>

          <section className="p-8 bg-indigo-50 border border-indigo-100 rounded-3xl space-y-6">
             <h3 className="text-2xl font-black text-indigo-900 tracking-tight">Day-7 Research Drill</h3>
             <div className="space-y-4">
                <p className="text-sm text-zinc-700 font-medium">1. Use ChatGPT to generate 5 open-ended interview questions for your idea.</p>
                <p className="text-sm text-zinc-700 font-medium">2. Document these in your workspace and highlight the top 3 themes you expect to uncover.</p>
                <p className="text-sm font-bold text-indigo-600 italic mt-6">Reflect: “What might surprise you about how real users respond vs your assumptions?”</p>
             </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-purple-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-7 Comprehensive Assignment</h4>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
             <div className="space-y-8">
                <div className="space-y-4">
                   <p className="text-xs font-black uppercase text-purple-600 tracking-widest">Research Task List</p>
                   <div className="space-y-4">
                      {[
                        { n: "1", t: "Define Target Segment", d: "Identify exactly who you are solving for using demographics and psychographics." },
                        { n: "2", t: "Pain Point vs. Outcome Table", d: "Create a 2x2 table mapping current struggles to desired future states." },
                        { n: "3", t: "Competitor Scan", d: "Use Perplexity AI to find 3 direct or indirect competitors." }
                      ].map(step => (
                        <div key={step.n} className="flex gap-4 items-start group">
                           <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 font-black text-sm group-hover:bg-purple-600 group-hover:text-white transition-all">{step.n}</div>
                           <div>
                              <p className="font-black text-zinc-900 text-sm leading-tight mb-1">{step.t}</p>
                              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">{step.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="bg-zinc-950 rounded-[2.5rem] p-10 border border-zinc-800 flex flex-col justify-center space-y-8">
                <p className="text-xs font-black uppercase text-purple-400 tracking-widest">Final Deliverable (One-Slide Summary)</p>
                <div className="space-y-4 font-mono text-xs">
                   <p className="text-zinc-300 font-bold">• The User: <span className="text-zinc-500">[Who are they?]</span></p>
                   <p className="text-zinc-300 font-bold">• The Problem: <span className="text-zinc-500">[What is their core struggle?]</span></p>
                   <p className="text-zinc-300 font-bold">• The Market: <span className="text-zinc-500">[Why does this matter right now?]</span></p>
                </div>
                <div className="pt-6 border-t border-zinc-100 space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><ClipboardCheck className="w-4 h-4" /></div>
                      <p className="text-xs text-zinc-300 font-bold">Deliverable: <span className="text-white">User & Market Research Report</span></p>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Rocket className="w-4 h-4" /></div>
                      <p className="text-xs text-zinc-300 font-bold">Outcome: <span className="text-white">Readiness for Day 8 User Interviews</span></p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    ),
    resources: [
      { title: 'Doing User Research', url: 'https://youtu.be/MxwyGi-3dzY?si=AWM6_QJxOvbw0ARn', type: 'video' },
      { title: 'Market research', url: 'https://youtu.be/LoJDAeq6i34?si=O3IMIfyNvl-USRWv', type: 'video' }
    ]
  },
  {
    day: 8,
    title: 'User Interviews & Surveys 🎙️',
    category: 'Research',
    preview: '“If you listen carefully, your users will write your roadmap for you.” Master structured feedback and real validation.',
    content: (
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans">
        <header className="bg-purple-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-purple-100 border border-purple-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Research</span>
            <span className="text-purple-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">User Interviews & Surveys 🎙️</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">“If you listen carefully, your users will write your roadmap for you.” Master structured feedback and real validation.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 italic text-zinc-700 font-medium text-lg leading-relaxed">
            “If you listen carefully, your users will write your roadmap for you.”
          </section>

          <p className="text-lg leading-relaxed text-zinc-600">Yesterday we explored target segments. Today we learn how to validate insights through real conversations and structured feedback.</p>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Learning Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Conduct structured discovery interviews",
                "Design clear & unbiased surveys",
                "Identify recurring pain themes",
                "Synthesize insights using AI tools"
              ].map((obj, i) => (
                <div key={i} className="flex gap-3 items-start p-4 bg-purple-50/30 rounded-xl border border-purple-100">
                  <CheckCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-zinc-700">{obj}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">1. Why User Interviews Matter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { t: "Deep 'Why'", d: "Understand user motivation beyond what behavioral data shows.", i: Search },
                { t: "Assumptions", d: "Validate high-risk assumptions early before spending engineering resources.", i: ShieldCheck },
                { t: "Unspoken Needs", d: "Discover emotional triggers and pain points users didn't mention.", i: Lightbulb },
                { t: "Empathy", d: "Build genuine intuition for the user's daily life and environment.", i: HeartHandshake }
              ].map(reason => (
                <div key={reason.t} className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl text-purple-600 shadow-sm"><reason.i className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-black text-zinc-900 mb-1">{reason.t}</h4>
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed">{reason.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl flex flex-col md:flex-row md:items-center gap-6">
              <div className="p-4 bg-white rounded-xl shadow-sm h-fit shrink-0"><Star className="w-8 h-8 text-indigo-600" /></div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Example: Insight to Feature</p>
                <p className="text-sm text-indigo-900 leading-relaxed font-bold">
                  "I want to feel progress even if I study for 5 minutes." 
                  <span className="text-indigo-600 font-black block mt-1">→ Inspired Duolingo's Streak system, now a core retention driver.</span>
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">2. Types of Interview Questions</h2>
            <div className="overflow-x-auto border border-zinc-100 rounded-3xl bg-zinc-50/30">
              <table className="w-full text-left text-sm border-collapse min-w-[500px]">
                <thead className="bg-zinc-100/50 border-b border-zinc-100">
                  <tr>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Type</th>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Example</th>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-600 font-medium">
                  <tr>
                    <td className="p-5 font-black text-zinc-900">Behavioral (Past)</td>
                    <td className="p-5 italic">“Tell me about the last time you ordered food.”</td>
                    <td className="p-5">Habit Analysis</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-black text-zinc-900">Attitudinal (Feelings)</td>
                    <td className="p-5 italic">“What frustrates you most about your current apps?”</td>
                    <td className="p-5">Pain Discovery</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-black text-zinc-900">Aspirational (Future)</td>
                    <td className="p-5 italic">“What would make your experience 10x better?”</td>
                    <td className="p-5">Ideation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="p-5 bg-zinc-900 text-white rounded-2xl font-bold text-sm flex items-center gap-3">
              <Brain className="w-5 h-5 text-indigo-400" />
              🧠 Golden Rule: No leading questions. Don't ask "Wouldn't it be better if...?" Ask "How do you feel about...?"
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">3. Interview Structure (15–20 min)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { t: "Intro", d: "Make the user comfortable. Explain purpose, emphasize there are no wrong answers." },
                { t: "Context", d: "Understand background. Ask about their current tools, role, and daily routine." },
                { t: "Core Questions", d: "Explore behaviors & pain. Deep dive into the specific problem area you're solving." },
                { t: "Wrap Up", d: "Final insights & referrals. Ask if they have anything to add or know someone else to talk to." }
              ].map((step, i) => (
                <div key={i} className="p-5 bg-white border border-zinc-100 rounded-2xl flex flex-col group hover:border-purple-200 transition-all shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-black text-sm mb-4 group-hover:scale-110 transition-transform">{i+1}</div>
                  <h4 className="font-black text-zinc-900 text-sm mb-1">{step.t}</h4>
                  <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-10 py-10 border-y border-zinc-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-3xl space-y-6">
                <h4 className="font-black text-xl text-indigo-900 tracking-tight flex items-center gap-2"><Zap className="w-5 h-5" /> AI Accelerator</h4>
                <div className="p-4 bg-white rounded-xl border border-indigo-100 shadow-sm font-mono text-xs text-zinc-600">
                  "Summarize these interview transcripts into 3 distinct pain points and 3 desired outcomes."
                </div>
                <p className="text-[11px] text-indigo-700 font-bold uppercase tracking-widest">Synthesis Prompt</p>
              </div>
              <div className="p-8 bg-zinc-950 text-white rounded-3xl space-y-4">
                <h4 className="font-black text-xl tracking-tight text-indigo-400 flex items-center gap-2"><ClipboardList className="w-5 h-5" /> Survey Principles</h4>
                <ul className="space-y-3">
                  {["Ask one thing per question", "Avoid biased wording", "Mix question types (MCQ + scale)", "Keep it under 10 questions"].map(p => (
                    <li key={p} className="flex items-center gap-3 text-sm font-bold text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">4. Synthesizing Insights</h2>
            <p className="text-lg text-zinc-600 leading-relaxed">After 5–10 interviews, group similar issues into actionable themes.</p>
            <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10">
              <div className="text-center w-full md:w-1/3">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-md border border-zinc-100 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-10 h-10 text-indigo-500" />
                </div>
                <p className="font-black text-lg text-zinc-900 italic">"I forget my fitness goals midweek."</p>
              </div>
              <div className="flex-1 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0"><X className="w-4 h-4" /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">The Pain</p>
                    <p className="font-bold text-zinc-800">Motivation Drop</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle className="w-4 h-4" /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Feature Opportunity</p>
                    <p className="font-bold text-zinc-800">AI Reminder Coach</p>
                    <p className="text-xs text-zinc-500 font-medium">Contextual nudges based on historical low-activity days.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-purple-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-8: User Insights Report</h4>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
             <div className="space-y-8">
                <div className="space-y-4">
                   <p className="text-xs font-black uppercase text-purple-600 tracking-widest">1-Page Deliverable</p>
                   <ul className="space-y-3">
                      {[
                        "Top 3 Pain Points (with supporting user quotes)",
                        "Top 3 Desired Outcomes (what users want to achieve)",
                        "One Opportunity Statement: How might we solve for X?"
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4 items-start group">
                           <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 font-black text-xs group-hover:bg-purple-600 group-hover:text-white transition-all">{i+1}</div>
                           <p className="text-sm font-bold text-zinc-700 leading-tight">{item}</p>
                        </li>
                      ))}
                   </ul>
                </div>
             </div>

             <div className="bg-zinc-950 rounded-[2.5rem] p-10 border border-zinc-800 flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                   <p className="text-xs font-black uppercase text-indigo-400 tracking-widest">Evaluation</p>
                   <p className="text-zinc-200 font-bold text-lg">Great: 3 strong actionable themes supported by data.</p>
                </div>
                <div className="pt-6 border-t border-zinc-100 flex items-center gap-3">
                    <Info className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
                    <p className="text-zinc-600 text-lg leading-relaxed font-medium">📌 Deadline: End of Day 10</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    ),
    resources: [
        { title: 'How To Conduct User Interviews Like A Pro', url: 'https://youtu.be/5tVbFfGDQCk?si=CvBJz1iU7JQ3CKZ8', type: 'video' }
    ]
  },
  {
    day: 9,
    title: 'User Personas & Jobs To Be Done (JTBD) 👥',
    category: 'Research',
    preview: '“You don’t design for everyone — you design for someone.” Convert raw feedback into structured user profiles.',
    content: (
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans">
        <header className="bg-purple-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-purple-100 border border-purple-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Research</span>
            <span className="text-purple-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">User Personas & JTBD 👥</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">“You don’t design for everyone — you design for someone.” Convert raw feedback into structured user profiles.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Turning Data into Insights</h2>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">“You don’t design for everyone — you design for someone.” Yesterday we captured raw feedback. Today we turn that data into structured, usable insights.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Learning Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Build realistic user personas based on real data",
                "Write JTBD statements that reflect true motivations",
                "Use personas to guide feature & UX decisions",
                "Apply AI tools to accelerate synthesis"
              ].map((obj, i) => (
                <div key={i} className="flex gap-3 items-start p-4 bg-purple-50/30 rounded-xl border border-purple-100">
                  <CheckCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-zinc-700">{obj}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">1. From Research → Insights → Personas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { n: "1", t: "Clustering", d: "Group similar behaviors and motivations from Day-8 transcripts." },
                { n: "2", t: "Identification", d: "Find recurring pain points and primary goals across clusters." },
                { n: "3", t: "Narrative", d: "Write a short, human-centric story for each segment." }
              ].map(step => (
                <div key={step.n} className="p-6 bg-zinc-50 border border-zinc-100 rounded-3xl">
                  <div className="text-[10px] font-black uppercase text-purple-600 tracking-[0.2em] mb-2">Step {step.n}</div>
                  <h4 className="font-black text-zinc-900 mb-1 leading-tight">{step.t}</h4>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto border border-zinc-100 rounded-3xl bg-zinc-50/30 mt-6">
              <table className="w-full text-left text-sm border-collapse min-w-[500px]">
                <thead className="bg-zinc-100/50 border-b border-zinc-100">
                  <tr>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">User Quote</th>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Persona Name</th>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Core Insight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-600 font-medium">
                  <tr>
                    <td className="p-5 italic text-zinc-500">“I start strong but can’t stay consistent.”</td>
                    <td className="p-5 font-black text-zinc-900">Motivated Starter</td>
                    <td className="p-5">Needs daily accountability loops</td>
                  </tr>
                  <tr>
                    <td className="p-5 italic text-zinc-500">“I want data to track my progress.”</td>
                    <td className="p-5 font-black text-zinc-900">Data-Driven Achiever</td>
                    <td className="p-5">Needs progress visualizations</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="p-5 bg-zinc-900 text-white rounded-2xl font-bold text-sm flex items-center gap-3">
              <Brain className="w-5 h-5 text-indigo-400" />
              🧠 Best Practice: 2–3 meaningful personas are better than 8–10 generic ones.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">2. Persona Template</h2>
            <div className="p-8 md:p-12 bg-white border border-zinc-200 rounded-[2.5rem] shadow-xl relative overflow-hidden group hover:border-indigo-100 transition-all">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><User className="w-48 h-48" /></div>
              <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
                <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-lg overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" alt="Rahul" className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-zinc-900 tracking-tighter">Rahul Sharma, 27</h3>
                  <p className="text-indigo-600 font-black uppercase tracking-widest text-xs">Software Engineer</p>
                  <p className="mt-2 text-xl font-bold text-zinc-400 italic">“I need a coach who reminds me daily.”</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Bio</p>
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">Works long hours; highly motivated to stay fit but misses consistency due to exhaustion.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Goals</p>
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">Build a long-term habit and see measurable physical results.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Frustrations</p>
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">Lack of personalized accountability; generalized tools don't adapt to his schedule.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Tech Comfort</p>
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">High. Owns a Garmin smartwatch and uses multiple trackers.</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-zinc-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600"><Zap className="w-4 h-4" /></div>
                <p className="text-xs font-bold text-zinc-500 italic">📍 Tip: Add emotion — Personas should feel human, not just like data points.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">3. Jobs To Be Done (JTBD) Framework</h2>
            <p className="text-lg text-zinc-600 leading-relaxed font-medium">Users don’t buy products. They hire them to get a job done.</p>
            <div className="p-8 bg-zinc-950 text-white rounded-3xl space-y-4">
              <h4 className="font-black text-indigo-400 uppercase tracking-widest text-xs">The Template</h4>
              <div className="space-y-2 font-black text-2xl tracking-tight leading-tight">
                <p>When I <span className="text-indigo-400">situation</span>,</p>
                <p>I want to <span className="text-indigo-400">motivation</span>,</p>
                <p>So I can <span className="text-indigo-400">desired outcome</span>.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { app: "Duolingo", d: "When I have free time, I want quick practice, so I feel productive." },
                { app: "Notion", d: "When I start a project, I want everything in one place, so I stay organized." },
                { app: "Swiggy", d: "When I’m tired, I want fast ordering, so I can relax without effort." }
              ].map(ex => (
                <div key={ex.app} className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl group hover:border-indigo-100 transition-all">
                  <h4 className="font-black text-zinc-900 mb-2 leading-tight">{ex.app}</h4>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed italic">"{ex.d}"</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">4. Connecting Personas → JTBD → Features</h2>
            <div className="overflow-x-auto border border-zinc-100 rounded-3xl bg-zinc-50/30">
              <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                <thead className="bg-zinc-100/50 border-b border-zinc-100">
                  <tr>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Persona</th>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Job To Be Done</th>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Feature Idea</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-600 font-medium">
                  <tr>
                    <td className="p-5 font-black text-zinc-900">Motivated Starter</td>
                    <td className="p-5">Stay consistent even when busy</td>
                    <td className="p-5 text-indigo-600 font-bold">AI habit reminders + streaks</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-black text-zinc-900">Data Achiever</td>
                    <td className="p-5">Track measurable progress</td>
                    <td className="p-5 text-indigo-600 font-bold">Analytics dashboard</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-black text-zinc-900">Social Sharer</td>
                    <td className="p-5">Celebrate success publicly</td>
                    <td className="p-5 text-indigo-600 font-bold">Leaderboards & badges</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-10 py-10 border-y border-zinc-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-3xl space-y-6">
                <h4 className="font-black text-xl text-indigo-900 tracking-tight flex items-center gap-2"><Zap className="w-5 h-5" /> AI Accelerator</h4>
                <div className="p-4 bg-white rounded-xl border border-indigo-100 shadow-sm font-mono text-xs text-zinc-600 leading-relaxed">
                  “You are a Product Manager summarizing 10 interview transcripts about study habits. Group user patterns into 2-3 personas and write JTBD statements for each.”
                </div>
                <div className="flex gap-2">
                   <span className="px-3 py-1 bg-white rounded-lg border border-indigo-100 text-[9px] font-black text-indigo-500 uppercase tracking-widest">ChatGPT</span>
                   <span className="px-3 py-1 bg-white rounded-lg border border-indigo-100 text-[9px] font-black text-indigo-500 uppercase tracking-widest">Notion AI</span>
                </div>
              </div>
              <div className="p-8 bg-zinc-950 text-white rounded-3xl space-y-6">
                <h4 className="font-black text-xl tracking-tight text-indigo-400 flex items-center gap-2"><Sparkles className="w-5 h-5" /> Spotify Case Study</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase text-zinc-500">Music Explorer</p>
                      <p className="text-xs font-bold leading-relaxed text-zinc-300 italic">“Give me music for my mood instantly”</p>
                      <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mt-1">→ Discover Weekly</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase text-zinc-500">Loyal Listener</p>
                      <p className="text-xs font-bold leading-relaxed text-zinc-300 italic">“Save songs automatically for later”</p>
                      <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mt-1">→ Liked Songs Library</p>
                   </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-purple-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-9: Persona & JTBD Deck</h4>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
             <div className="space-y-8">
                <div className="space-y-4">
                   <p className="text-xs font-black uppercase text-purple-600 tracking-widest">Final Deliverables</p>
                   <ul className="space-y-4">
                      {[
                        { t: "2 Personas", d: "Name, Bio, Goals, Pains, Behavior, Quote." },
                        { t: "JTBD Statements", d: "1 clear statement per persona." },
                        { t: "1 Feature Suggestion", d: "Clearly aligned to the \"Job\"." }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4 items-start group">
                           <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 font-black text-xs group-hover:bg-purple-600 group-hover:text-white transition-all">{i+1}</div>
                           <div>
                              <p className="font-black text-zinc-900 text-sm leading-tight mb-1">{item.t}</p>
                              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">{item.d}</p>
                           </div>
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center gap-3">
                   <FileText className="w-5 h-5 text-zinc-400" />
                   <p className="text-xs font-bold text-zinc-600">Format: <span className="text-zinc-900">Canva / Slides / Notion</span></p>
                </div>
             </div>

             <div className="bg-zinc-950 rounded-[2.5rem] p-10 border border-zinc-800 flex flex-col justify-center space-y-8 text-center">
                <div className="space-y-2">
                   <p className="text-xs font-black uppercase text-indigo-400 tracking-widest">Submission</p>
                   <p className="text-white font-black text-2xl tracking-tight">End of Day 11</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                   <p className="text-lg font-bold text-zinc-300 leading-relaxed italic">
                      “👉 Tip: Use Canva’s Persona Templates to make your deck professional!”
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    ),
    resources: [
        { title: 'Jobs to be done', url: 'https://youtu.be/dbVN6EYql6k?si=wsS4tJ8sW1ht-iNr', type: 'video' },
        { title: 'Creating Personas', url: 'https://youtu.be/u44pBnAn7cM?si=bhAgCUv6FbeME3Nr', type: 'video' }
    ]
  },
  {
    day: 10,
    title: 'Competitive & Market Analysis 🧭',
    category: 'Strategy',
    preview: '“You can’t build a better product until you understand what already exists.” Master SWOT and feature benchmarking.',
    content: (
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16">
        <header className="bg-indigo-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Strategy</span>
            <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Competitive & Market Analysis 🧭</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">“You can’t build a better product until you understand what already exists.” Master SWOT and feature benchmarking.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          
          <section className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100 italic text-zinc-700 font-medium">
            “You can’t build a better product until you understand what already exists.”
          </section>

          <p className="text-lg leading-relaxed text-zinc-600">Today’s goal is to position your idea intelligently. Learn to identify market gaps — not by copying, but by identifying where competitors fall short.</p>

          <section className="space-y-6">
             <h2 className="text-3xl font-black tracking-tight text-zinc-900">Learning Objectives</h2>
             <ul className="space-y-4 pl-6 list-disc font-medium text-zinc-700">
                <li>Conduct structured competitive benchmarking</li>
                <li>Perform SWOT analysis for 2–3 competitors</li>
                <li>Identify feature gaps and differentiators</li>
                <li>Define your product's unique positioning statement</li>
             </ul>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">1. Mapping the Landscape</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { t: "Direct Competitors", d: "Same product, same target audience.", ex: "Habitica vs Streaks" },
                 { t: "Indirect Competitors", d: "Solve the same need differently.", ex: "Google Tasks vs Notion" },
                 { t: "Aspirational", d: "Inspire UX or growth strategies.", i: Globe, ex: "Headspace for UI vibes" }
               ].map(item => (
                 <div key={item.t} className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
                    <h4 className="font-black text-xl text-zinc-900 mb-2">{item.t}</h4>
                    <p className="text-sm text-zinc-500 font-medium mb-4">{item.d}</p>
                    <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">Example: {item.ex}</p>
                 </div>
               ))}
            </div>
            <p className="p-4 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 font-bold text-base flex items-center gap-3">
                <span className="text-xl">🧩</span> AI Hack: Ask Perplexity AI "List top 10 apps competing with [idea], include audience and unique features."
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">2. Framework 1: SWOT Analysis</h2>
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
               {[
                 { t: "Strengths", d: "What do they do well?", ex: "\"Beautiful UI, gamified loop\"", c: "bg-emerald-50 text-emerald-900 border-emerald-100" },
                 { t: "Weaknesses", d: "Where do they fall short?", ex: "\"Limited AI personalization\"", c: "bg-rose-50 text-rose-900 border-rose-100" },
                 { t: "Opportunities", d: "What can we do better?", ex: "\"Add AI coach habit nudges\"", c: "bg-blue-50 text-blue-900 border-blue-100" },
                 { t: "Threats", d: "What could hurt us?", ex: "\"Big tech (Apple) entry\"", c: "bg-amber-50 text-amber-900 border-amber-100" }
               ].map(swot => (
                 <div key={swot.t} className={`p-6 rounded-3xl border ${swot.c} space-y-2`}>
                    <h4 className="font-black text-xl">{swot.t}</h4>
                    <p className="text-xs font-bold opacity-70 leading-relaxed">{swot.d}</p>
                    <p className="text-xs font-black italic">Example: {swot.ex}</p>
                 </div>
               ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">3. Framework 2: Feature Comparison Matrix</h2>
            <div className="overflow-x-auto border border-zinc-100 rounded-2xl">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-zinc-50 border-b border-zinc-100">
                    <tr>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Feature</th>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Us</th>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Comp A</th>
                      <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Comp B</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-zinc-600 font-medium">
                    <tr>
                      <td className="p-5 font-black text-zinc-900">Personalized Dashboard</td>
                      <td className="p-5 text-xl">✅</td>
                      <td className="p-5 text-xl">❌</td>
                      <td className="p-5 text-xl">✅</td>
                    </tr>
                    <tr>
                      <td className="p-5 font-black text-zinc-900">AI Habit Coach</td>
                      <td className="p-5 text-xl">✅</td>
                      <td className="p-5 text-xl">❌</td>
                      <td className="p-5 text-xl">❌</td>
                    </tr>
                    <tr>
                      <td className="p-5 font-black text-zinc-900">Gamified Streaks</td>
                      <td className="p-5 text-xl">✅</td>
                      <td className="p-5 text-xl">✅</td>
                      <td className="p-5 text-xl">✅</td>
                    </tr>
                  </tbody>
                </table>
             </div>
             <p className="p-4 bg-zinc-900 text-white rounded-xl font-bold text-sm flex items-center gap-3">
                <Brain className="w-5 h-5 text-indigo-400" />
                🧠 Insight: Discover what is "table-stakes" vs "differentiating".
             </p>
          </section>

          <section className="space-y-6 pt-10 border-t border-zinc-100">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">AI Prompts for Strategy</h2>
            <div className="space-y-4">
              <div className="p-6 bg-white border-2 border-dashed border-zinc-200 rounded-3xl">
                 <p className="text-zinc-600 font-bold italic">"Create a SWOT analysis for Fitbit and identify two strategic gaps a new product could exploit."</p>
              </div>
              <div className="p-6 bg-white border-2 border-dashed border-zinc-200 rounded-3xl">
                 <p className="text-zinc-600 font-bold italic">"Summarize the top 5 AI habit tracking apps in 2025, their core features, and pricing."</p>
              </div>
            </div>
          </section>

          <section className="bg-zinc-900 text-white p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden">
             <h3 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tight">
                <Zap className="w-6 h-6 text-indigo-400" />
                Zerodha vs Groww
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <h4 className="font-black text-xl text-indigo-400">Zerodha Strength:</h4>
                   <p className="text-zinc-300 font-bold leading-relaxed">Advanced tools for Traders.</p>
                </div>
                <div className="space-y-4">
                   <h4 className="font-black text-xl text-emerald-400">Groww Strength:</h4>
                   <p className="text-zinc-300 font-bold leading-relaxed">UI simplicity for First-timers.</p>
                </div>
             </div>
             <p className="mt-8 text-lg font-bold text-indigo-200 italic border-l-4 border-indigo-500 pl-4">
               Design simplicity was the differentiator Groww used to disrupt a market of "complex dashboards."
             </p>
          </section>

          <section className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12">
            <div className="text-center sm:text-left">
               <p className="text-zinc-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Previous</p>
               <p className="text-lg font-black text-zinc-900 tracking-tight">User Personas & JTBD 👥</p>
            </div>
            <div className="text-center sm:text-right">
               <p className="text-zinc-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Up Next</p>
               <p className="text-lg font-black text-indigo-600 tracking-tight">Opportunity Sizing (TAM / SAM / SOM) 🧭</p>
            </div>
          </section>

        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[2.5rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-10: Competitive Report</h4>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
             <div className="space-y-6">
                <div>
                   <p className="text-xs font-black uppercase text-indigo-600 tracking-widest mb-2">Final Deliverables (2–3 slides)</p>
                   <ul className="space-y-3 text-zinc-700 font-bold">
                      <li>• 2 SWOT Analyses: Competitor A & B.</li>
                      <li>• Feature Comparison Matrix: Us vs others.</li>
                      <li>• Positioning Statement: “Unlike X and Y, our product [does what] for [whom].”</li>
                   </ul>
                </div>
                <div>
                   <p className="text-xs font-black uppercase text-indigo-600 tracking-widest mb-2">Deadline</p>
                   <p className="text-zinc-700 font-bold">End of Day 12</p>
                </div>
             </div>
             <div className="p-8 bg-zinc-950 rounded-3xl border border-zinc-800 flex flex-col justify-center text-center">
                <p className="text-zinc-300 font-bold leading-relaxed italic">You've reached the end! 🏆</p>
             </div>
          </div>
        </div>
      </div>
    ),
    resources: [
      { title: 'Competitive Analysis for Product Managers', url: 'https://youtu.be/UnBL8h8TVX8?si=2cNc8UqREUr6V3_R', type: 'video' }
    ]
  },
  {
    day: 11,
    title: 'Discovery Phase Conclusion 🏁',
    category: 'Research',
    preview: 'Wrapping up your user research and market findings before heading into strategy and opportunity sizing.',
    content: (
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16">
        <header className="bg-purple-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-purple-100 border border-purple-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Research</span>
            <span className="text-purple-100 text-xs font-bold uppercase tracking-widest">30 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Discovery Phase Conclusion 🏁</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Wrapping up your user research and market findings before heading into strategy and opportunity sizing.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Consolidating Discovery</h2>
            <p className="text-lg leading-relaxed text-zinc-600 max-w-[75ch]">You've interviewed users, built personas, and analyzed competitors. Today is about tying it all together. A PM's job is not just to collect data, but to synthesize it into a compelling narrative.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-3xl">
                <h4 className="font-black text-zinc-900 mb-2">Checklist for Success</h4>
                <ul className="space-y-2">
                  {['Clear Problem Statement', '2-3 Validated Personas', 'Feature Gap Analysis', 'Market Positioning'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm font-bold text-zinc-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
                <h4 className="font-black text-indigo-900 mb-2">Discovery Mindset</h4>
                <p className="text-sm text-indigo-800 leading-relaxed italic">"The goal is not to prove you were right, but to find out what is true about your users."</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[2.5rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <ClipboardCheck className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Final Discovery Synthesis</h4>
            <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl">Review all your findings from Days 7-10. Refine your Problem Statement one last time based on everything you've learned.</p>
          </header>
        </div>
      </div>
    )
  },
  {
    day: 12,
    title: 'Opportunity Sizing (TAM / SAM / SOM) 🧭',
    category: 'Strategy',
    preview: 'Learn to estimate market potential using data, frameworks, and AI tools to validate if an idea is worth building.',
    content: (
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans">
        <header className="bg-indigo-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-indigo-100 border border-indigo-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Strategy</span>
            <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest">45 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Opportunity Sizing (TAM, SAM, SOM) 🧭</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">“A great product solves a real problem — but a great business solves it for a market that’s big enough.”</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          
          <section className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 space-y-4">
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2"><Globe className="w-6 h-6 text-indigo-600" /> The Theme</h2>
            <p className="text-lg text-zinc-700 leading-relaxed font-medium">
              Today you’ll quantify the potential behind your product idea and learn how PMs and founders evaluate market opportunities before investing in them.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">🎯 Learning Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Define TAM, SAM, and SOM clearly and apply them to a product idea.",
                "Use top-down, bottom-up, and value-based approaches for market sizing.",
                "Leverage AI + data tools to find reliable market estimates.",
                "Create a clear Market Opportunity Slide (for PRD or pitch decks)."
              ].map((obj, i) => (
                <div key={i} className="flex gap-4 items-start p-5 bg-indigo-50/30 border border-indigo-100 rounded-2xl">
                   <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs font-black">{i+1}</div>
                   <p className="text-zinc-700 font-bold text-sm leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">🧩 1. Key Concepts</h2>
            <div className="overflow-x-auto border border-zinc-100 rounded-3xl bg-zinc-50/30">
              <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                <thead className="bg-zinc-100/50 border-b border-zinc-100">
                  <tr>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Term</th>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Meaning</th>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-600 font-medium">
                  <tr>
                    <td className="p-5 font-black text-zinc-900 text-lg">TAM</td>
                    <td className="p-5">Total Addressable Market: Total global demand if everyone bought it.</td>
                    <td className="p-5 italic">“Global fitness app market = $7B”</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-black text-zinc-900 text-lg">SAM</td>
                    <td className="p-5">Serviceable Available Market: The portion you can serve based on geography/users.</td>
                    <td className="p-5 italic">“India’s fitness app market = $1.2B”</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-black text-zinc-900 text-lg">SOM</td>
                    <td className="p-5">Serviceable Obtainable Market: The share you capture in 2–3 years.</td>
                    <td className="p-5 italic">“Target 1% of SAM → $12M”</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-5 bg-zinc-900 text-white rounded-2xl flex items-center gap-4 shadow-lg">
               <div className="p-3 bg-indigo-600 rounded-xl"><Brain className="w-6 h-6" /></div>
               <p className="font-bold tracking-tight text-sm">
                 <span className="text-indigo-400 font-black uppercase tracking-widest block mb-1">Rule of Thumb</span>
                 TAM shows scale, SAM shows focus, SOM shows realism.
               </p>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">💼 2. Approaches to Estimate Market Size</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {[
                 { t: "Top-Down", s: "Market Reports", d: "Use existing reports from Statista, McKinsey, or Gartner.", i: TrendingUp, ex: "Statista says India EdTech is $5.7B. You target 10% → SAM $570M." },
                 { t: "Bottom-Up", s: "User-Based", d: "Start from your customer base and scale up via formula.", i: Users, ex: "SOM = (1M Target Users × ₹300/year × 1% capture) = ₹3M." },
                 { t: "Value-Based", s: "Impact-Based", d: "Estimate based on value created or costs saved.", i: Zap, ex: "Tool saves 5hrs/week × ₹500/hr. If user pays 10% → ₹250/mo." }
               ].map(approach => (
                 <div key={approach.t} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:border-indigo-100 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors mb-6 shadow-inner">
                       <approach.i className="w-6 h-6" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-1">{approach.s}</h4>
                    <h3 className="text-xl font-black text-zinc-900 mb-4 tracking-tight">{approach.t}</h3>
                    <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-6">{approach.d}</p>
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 border-dashed">
                       <p className="text-[10px] font-black uppercase text-zinc-400 mb-2">Example</p>
                       <p className="text-xs text-zinc-600 font-bold leading-relaxed">{approach.ex}</p>
                    </div>
                 </div>
               ))}
            </div>
          </section>

          <section className="space-y-8 py-10 border-y border-zinc-100">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">🤖 3. Using AI Tools for Market Sizing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="p-6 bg-white border border-zinc-200 rounded-[2rem] shadow-sm space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg font-black text-[10px]">PERPLEXITY</div>
                        <h4 className="font-bold text-zinc-800">TAM/SAM Data Fetch</h4>
                     </div>
                     <p className="text-sm text-zinc-500 italic leading-relaxed">“Estimate the total addressable market (TAM) for AI-powered personal productivity tools globally and in India for 2025. Include data sources.”</p>
                  </div>
                  <div className="p-6 bg-white border border-zinc-200 rounded-[2rem] shadow-sm space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg font-black text-[10px]">CHATGPT</div>
                        <h4 className="font-bold text-zinc-800">Bottom-Up Modeling</h4>
                     </div>
                     <p className="text-sm text-zinc-500 italic leading-relaxed">“You’re a Product Manager at a startup building a sleep-tracking AI app. Estimate TAM, SAM, and SOM using a bottom-up model based on smartphone users aged 20–45.”</p>
                  </div>
               </div>
               <div className="bg-zinc-950 rounded-[2.5rem] p-8 md:p-10 border border-zinc-800 flex flex-col justify-center space-y-8">
                  <h4 className="text-indigo-400 font-black uppercase tracking-widest text-xs">Other Power Tools</h4>
                  <div className="space-y-6">
                     <div className="flex gap-4">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white"><Search className="w-5 h-5" /></div>
                        <div>
                           <p className="text-white font-bold text-sm">Google Trends</p>
                           <p className="text-xs text-zinc-500">Identify demand spikes by region or specific search terms.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white"><BarChart3 className="w-5 h-5" /></div>
                        <div>
                           <p className="text-white font-bold text-sm">Excel / Power BI</p>
                           <p className="text-xs text-zinc-500">Visualize TAM → SAM → SOM funnel and revenue projections.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 text-center">📊 4. Visual Framework</h2>
            <div className="max-w-md mx-auto py-10 space-y-4">
               <div className="bg-indigo-600 text-white p-8 rounded-full text-center shadow-xl shadow-indigo-100 flex flex-col items-center justify-center border-4 border-indigo-400">
                  <span className="font-black text-4xl tracking-tighter">TAM</span>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">$5B Global Market</span>
               </div>
               <div className="flex justify-center"><Filter className="w-6 h-6 text-zinc-200" /></div>
               <div className="bg-indigo-500 text-white p-6 rounded-full text-center shadow-lg w-[85%] mx-auto flex flex-col items-center justify-center border-4 border-indigo-300">
                  <span className="font-black text-2xl tracking-tighter">SAM</span>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">$1B Target Region</span>
               </div>
               <div className="flex justify-center"><Filter className="w-6 h-6 text-zinc-200" /></div>
               <div className="bg-indigo-400 text-white p-4 rounded-full text-center shadow-md w-[65%] mx-auto flex flex-col items-center justify-center border-4 border-indigo-200">
                  <span className="font-black text-xl tracking-tighter">SOM</span>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">$50M Realistic Capture</span>
               </div>
            </div>
            <p className="text-center text-sm font-bold text-zinc-500 italic max-w-sm mx-auto">
               📈 Pro Tip: Investors look for large TAM (>$1B) but realistic SOM (~1–5% of SAM).
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">💡 5. Example: Zomato (Early Days)</h2>
            <div className="overflow-x-auto border border-zinc-100 rounded-3xl">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-zinc-50 border-b border-zinc-100">
                  <tr>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Metric</th>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Estimate</th>
                    <th className="p-5 font-black uppercase tracking-widest text-[10px] text-zinc-400">Explanation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-600 font-medium">
                  <tr>
                    <td className="p-5 font-black text-zinc-900">TAM</td>
                    <td className="p-5">$20B</td>
                    <td className="p-5">Global food delivery market</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-black text-zinc-900">SAM</td>
                    <td className="p-5">$1.5B</td>
                    <td className="p-5">Indian food delivery segment</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-black text-zinc-900">SOM</td>
                    <td className="p-5">$150M</td>
                    <td className="p-5">10% share targeted in 3 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] flex items-center gap-6">
               <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg"><Star className="w-8 h-8" /></div>
               <div>
                  <h4 className="font-black text-emerald-900 text-lg mb-1">Result</h4>
                  <p className="text-sm text-emerald-800 font-medium leading-relaxed">Large TAM + Strong Focus attracted early investors due to market depth.</p>
               </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">🧠 6. Real-World PM Example: Duolingo</h2>
            <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                     <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">TAM</p>
                     <p className="text-lg font-black text-zinc-900">$60B</p>
                     <p className="text-xs text-zinc-500 font-medium">Global EdTech market</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                     <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">SAM</p>
                     <p className="text-lg font-black text-zinc-900">$8B</p>
                     <p className="text-xs text-zinc-500 font-medium">App-based learning</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                     <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">SOM</p>
                     <p className="text-lg font-black text-zinc-900">$160M</p>
                     <p className="text-xs text-zinc-500 font-medium">2% initial target</p>
                  </div>
               </div>
               <p className="text-sm font-bold text-zinc-600 leading-relaxed italic border-l-4 border-indigo-600 pl-4 bg-indigo-50/50 py-3 rounded-r-xl">
                 🧩 PM Insight: PMs used this sizing to justify product investment → Duolingo’s monetization strategy followed later.
               </p>
            </div>
          </section>

          <section className="bg-zinc-950 text-white p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><Zap className="w-32 h-32" /></div>
             <h3 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tight text-indigo-400">
                <CheckCircle className="w-6 h-6" />
                End-of-Day Outcomes
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-bold text-zinc-300">
                <p>• Estimate market potential using data & logic</p>
                <p>• Visualize market size (TAM/SAM/SOM)</p>
                <p>• Support product ideas with quantifiable data</p>
             </div>
          </section>
        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Target className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-12: Market Sizing Deck</h4>
            <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl">Create 1–2 slides showing your market potential.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
             <div className="space-y-8">
                <div className="space-y-4">
                   <p className="text-xs font-black uppercase text-indigo-600 tracking-widest">Slide Requirements</p>
                   <div className="space-y-4">
                      {[
                        { n: "1", t: "Funnel Diagram", d: "Clear visual of TAM → SAM → SOM." },
                        { n: "2", t: "Data Sources", d: "References for all estimates (reports or logic)." },
                        { n: "3", t: "Key Assumptions", d: "Pricing, audience, and penetration rate." },
                        { n: "4", t: "1-Line Insight", d: "“Our product addresses a $500M opportunity...”" }
                      ].map(step => (
                        <div key={step.n} className="flex gap-4 items-start group">
                           <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-black text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">{step.n}</div>
                           <div>
                              <p className="font-black text-zinc-900 text-sm mb-1">{step.t}</p>
                              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">{step.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="bg-zinc-950 rounded-[2.5rem] p-10 border border-zinc-800 flex flex-col justify-center space-y-8">
                <div className="space-y-2 text-center">
                   <p className="text-xs font-black uppercase text-indigo-400 tracking-widest">Submission Info</p>
                   <p className="text-white font-black text-xl">End of Day 13</p>
                   <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Format: Canva / Notion / PPT</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    ),
    resources: [
      { title: 'TAM, SAM, SOM Explained', url: 'https://youtu.be/nCYOMU7rKCs?si=cvu8yrnAbxDueKEI', type: 'video' }
    ]
  },
  {
    day: 13,
    title: 'Introduction to SQL (SELECT, WHERE, Basics) 📊',
    category: 'Data',
    preview: 'Learn the language for communicating with databases to fetch signups, track KPIs, and validate hypotheses independently.',
    content: (
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans">
        <header className="bg-emerald-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-emerald-100 border border-emerald-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Data</span>
            <span className="text-emerald-100 text-xs font-bold uppercase tracking-widest">60 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Introduction to SQL 📊</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Communicating with databases to make data-driven decisions independently.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          
          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">🎯 Learning Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Understand what SQL is and why PMs need it",
                "Set up a practice SQL environment",
                "Write basic SELECT queries to retrieve data",
                "Filter data using WHERE clauses",
                "Execute DDL (Data Definition) and DML (Data Manipulation) commands"
              ].map((obj, i) => (
                <div key={i} className="flex gap-3 items-start p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-zinc-700">{obj}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">🧩 1. What is SQL and Why PMs Need It</h2>
            <p className="text-lg text-zinc-600 leading-relaxed">
              SQL (Structured Query Language) = the language for communicating with databases. 
              Think of it as asking questions to a spreadsheet on steroids.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <h4 className="font-black text-zinc-900 uppercase tracking-widest text-xs flex items-center gap-2"><Zap className="w-4 h-4 text-amber-500" /> Life WITHOUT SQL</h4>
                  <p className="text-sm text-zinc-500 font-medium">You wait for analysts, ask vague questions, and get delayed answers that slow down your product cycle.</p>
               </div>
               <div className="space-y-4">
                  <h4 className="font-black text-emerald-600 uppercase tracking-widest text-xs flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Life WITH SQL</h4>
                  <p className="text-sm text-zinc-500 font-medium">You validate hypotheses in real-time, track signups, churn, and feature adoption independently.</p>
               </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">💡 2. Real PM Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-6 bg-zinc-900 rounded-3xl space-y-4 shadow-xl">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-indigo-500 rounded-lg"><Activity className="w-4 h-4 text-white" /></div>
                     <h4 className="text-white font-bold">Feature Adoption</h4>
                  </div>
                  <pre className="bg-zinc-800 p-4 rounded-xl font-mono text-[11px] text-indigo-300 overflow-x-auto">
{`SELECT feature_name, 
       COUNT(DISTINCT user_id) as users
FROM feature_usage
WHERE date >= '2025-01-01'
GROUP BY feature_name;`}
                  </pre>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Result: Identify high-usage features</p>
               </div>
               <div className="p-6 bg-zinc-900 rounded-3xl space-y-4 shadow-xl">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-rose-500 rounded-lg"><TrendingDown className="w-4 h-4 text-white" /></div>
                     <h4 className="text-white font-bold">Churn Analysis</h4>
                  </div>
                  <pre className="bg-zinc-800 p-4 rounded-xl font-mono text-[11px] text-rose-300 overflow-x-auto">
{`SELECT * FROM users
WHERE last_active_date < '2025-01-01'
AND signup_date < '2024-12-01';`}
                  </pre>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Result: Find inactive users (30+ days)</p>
               </div>
            </div>
          </section>

          <section className="bg-zinc-50 rounded-[2.5rem] p-8 md:p-12 border border-zinc-100">
             <h2 className="text-2xl font-black text-zinc-900 mb-8 tracking-tight flex items-center gap-3"><Play className="w-6 h-6 text-indigo-600" /> Video Learning Path</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                   { t: "Intro & Basics", time: "07:38", i: Info },
                   { t: "Environment Setup", time: "22:33", i: Settings },
                   { t: "Querying (SELECT)", time: "34:01", i: Search },
                   { t: "DDL Commands", time: "01:32:31", i: Table },
                   { t: "DML Commands", time: "01:43:44", i: Terminal }
                ].map(step => (
                   <div key={step.t} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-zinc-100 rounded-lg text-zinc-400"><step.i className="w-4 h-4" /></div>
                         <span className="font-bold text-zinc-700 text-sm">{step.t}</span>
                      </div>
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{step.time}</span>
                   </div>
                ))}
             </div>
             <p className="mt-8 text-xs text-zinc-500 font-medium italic text-center">Reference Video: "SQL Tutorial for Beginners" (Link in Resources)</p>
          </section>

        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Terminal className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-13: SQL Hands-on</h4>
            <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl">Complete the topics listed in the video reference and write 3 basic queries for your product idea.</p>
          </header>
          
          <div className="mt-10 p-8 bg-zinc-950 rounded-3xl border border-zinc-800">
             <p className="font-black text-indigo-400 uppercase tracking-widest text-xs mb-6">Task Checklist</p>
             <ul className="space-y-4 text-zinc-300 font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Watch video from 00:00 to 01:50:00</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Write a SELECT query for all users</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Write a query with WHERE to filter by city</li>
             </ul>
          </div>
        </div>
      </div>
    ),
    resources: [
      { title: 'SQL Tutorial for Beginners - Full Course', url: 'https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg', type: 'video' }
    ]
  },
  {
    day: 14,
    title: 'Filtering Data & SQL Joins 🔗',
    category: 'Data',
    preview: '“Joining tables is where SQL becomes powerful for PMs.” Master advanced filtering and combine data from multiple tables.',
    content: (
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans">
        <header className="bg-emerald-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-emerald-100 border border-emerald-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Data</span>
            <span className="text-emerald-100 text-xs font-bold uppercase tracking-widest">60 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Filtering Data & SQL Joins 🔗</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Combine data from multiple tables to answer complex product questions.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          
          <section className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 space-y-4">
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2"><Network className="w-6 h-6 text-emerald-600" /> The Theme</h2>
            <p className="text-lg text-zinc-700 leading-relaxed font-medium">
              “Joining tables is where SQL becomes powerful for PMs.” 
              Today you'll master advanced filtering and learn to combine data from multiple tables — essential for real-world product analysis.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">🎯 Learning Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Use advanced WHERE filters (LIKE, IN, BETWEEN)",
                "Understand database relationships (One-to-One, One-to-Many)",
                "Perform INNER, LEFT, RIGHT, and FULL JOINS",
                "Combine data to answer complex PM questions",
                "Use UNION and other set operators"
              ].map((obj, i) => (
                <div key={i} className="flex gap-4 items-start p-5 bg-emerald-50/30 border border-emerald-100 rounded-2xl">
                   <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-black">{i+1}</div>
                   <p className="text-zinc-700 font-bold text-sm leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">🧩 1. Advanced Filtering</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { t: "LIKE", d: "Pattern matching for text search.", code: "name LIKE 'User%'" },
                 { t: "IN", d: "Filter by multiple specific values.", code: "city IN ('NY', 'SF', 'LDN')" },
                 { t: "BETWEEN", d: "Filter within a numerical/date range.", code: "price BETWEEN 10 AND 50" }
               ].map(item => (
                 <div key={item.t} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm">
                    <h4 className="font-black text-emerald-600 text-xs uppercase tracking-[0.2em] mb-2">{item.t}</h4>
                    <p className="text-sm text-zinc-500 font-medium mb-4">{item.d}</p>
                    <code className="block p-3 bg-zinc-900 text-emerald-400 rounded-xl text-[10px] font-mono">{item.code}</code>
                 </div>
               ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">🔗 2. The Power of Joins</h2>
            <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <h3 className="font-black text-zinc-900 text-xl flex items-center gap-2"><GitMerge className="w-5 h-5 text-indigo-500" /> Inner Join</h3>
                     <p className="text-sm text-zinc-500 font-medium leading-relaxed">Returns records that have matching values in both tables. Most common join for clean metrics.</p>
                     <div className="p-4 bg-zinc-900 rounded-2xl">
                        <code className="text-[10px] text-indigo-300 font-mono">SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;</code>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <h3 className="font-black text-zinc-900 text-xl flex items-center gap-2"><GitMerge className="w-5 h-5 text-indigo-500" /> Left Join</h3>
                     <p className="text-sm text-zinc-500 font-medium leading-relaxed">Returns all records from the left table, plus matched records from the right. Great for finding "inactive" users.</p>
                     <div className="p-4 bg-zinc-900 rounded-2xl">
                        <code className="text-[10px] text-indigo-300 font-mono">SELECT users.name, orders.id FROM users LEFT JOIN orders ON users.id = orders.user_id;</code>
                     </div>
                  </div>
               </div>
            </div>
          </section>

          <section className="bg-zinc-950 rounded-[2.5rem] p-8 md:p-12 border border-zinc-800">
             <h2 className="text-2xl font-black text-white mb-8 tracking-tight flex items-center gap-3"><Play className="w-6 h-6 text-indigo-400" /> Video Learning Path</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                   { t: "Filtering Data", time: "02:08:03", i: Filter },
                   { t: "Joins Basics", time: "02:47:57", i: GitMerge },
                   { t: "Joins Advanced", time: "03:27:29", i: Network }
                ].map(step => (
                   <div key={step.t} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><step.i className="w-4 h-4" /></div>
                         <span className="font-bold text-zinc-100 text-sm">{step.t}</span>
                      </div>
                      <span className="text-[10px] font-black text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-md">{step.time}</span>
                   </div>
                ))}
             </div>
             <p className="mt-8 text-xs text-zinc-500 font-medium italic text-center">Reference Video: "SQL Full Course" (Link in Resources)</p>
          </section>

        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-emerald-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Terminal className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-14: The "Inactive User" Query</h4>
            <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl">Use a LEFT JOIN to identify users who signed up in the last 30 days but haven't performed a single action.</p>
          </header>
          
          <div className="mt-10 p-8 bg-zinc-950 rounded-3xl border border-zinc-800">
             <p className="font-black text-indigo-400 uppercase tracking-widest text-xs mb-6">Task Requirements</p>
             <ul className="space-y-4 text-zinc-300 font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Use LEFT JOIN between Users and Actions table</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Filter for Action.id IS NULL</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Add a date filter for Signup Date</li>
             </ul>
          </div>
        </div>
      </div>
    ),
    resources: [
      { title: 'SQL Tutorial for Beginners - Filtering & Joins', url: 'https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg', type: 'video' }
    ]
  },
  {
    day: 15,
    title: 'SQL Functions & Data Transformation 🛠️',
    category: 'Data',
    preview: '“Transform raw data into insights with SQL functions.” Learn to clean, calculate, and categorize data effectively.',
    content: (
      <div className="max-w-[1100px] mx-auto space-y-8 text-zinc-800 pb-16 font-sans">
        <header className="bg-emerald-600 text-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-emerald-100 border border-emerald-500">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/20">Data</span>
            <span className="text-emerald-100 text-xs font-bold uppercase tracking-widest">60 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">SQL Functions & Data Transformation 🛠️</h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl font-medium">Master the tools for data cleaning and conditional analysis.</p>
        </header>

        <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 md:p-12 shadow-sm space-y-12">
          
          <section className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 space-y-4">
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2"><Binary className="w-6 h-6 text-emerald-600" /> The Theme</h2>
            <p className="text-lg text-zinc-700 leading-relaxed font-medium">
              Raw data is messy. Today you'll learn to manipulate and format data using built-in SQL functions — essential for cleaning datasets before they reach your dashboard.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">🎯 Learning Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Use string functions to clean and format text data (CONCAT, LOWER, UPPER)",
                "Apply numeric functions for calculations (ROUND, CEIL, FLOOR)",
                "Work with date and time functions for temporal analysis",
                "Handle NULL values with COALESCE or IFNULL",
                "Use CASE statements for conditional logic (Categorization)"
              ].map((obj, i) => (
                <div key={i} className="flex gap-4 items-start p-5 bg-emerald-50/30 border border-emerald-100 rounded-2xl">
                   <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-black">{i+1}</div>
                   <p className="text-zinc-700 font-bold text-sm leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">🧩 1. The PM Toolset: Common Functions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { t: "String Functions", s: "Text Formatting", d: "LOWER(email), CONCAT(first, last). Great for matching user records.", i: Type },
                 { t: "Numeric Functions", s: "Math & Stats", d: "ROUND(avg_order, 2). Essential for clean business reporting.", i: Hash },
                 { t: "Set Operators", s: "Combining Results", d: "UNION and UNION ALL to merge results from different queries.", i: GitMerge }
               ].map(item => (
                 <div key={item.t} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:border-emerald-100 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors mb-6 shadow-inner">
                       <item.i className="w-6 h-6" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 mb-1">{item.s}</h4>
                    <h3 className="text-xl font-black text-zinc-900 mb-4 tracking-tight">{item.t}</h3>
                    <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-6">{item.d}</p>
                 </div>
               ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">💡 2. Conditional Logic: CASE Statements</h2>
            <p className="text-lg text-zinc-600 leading-relaxed">
              CASE is the "IF-THEN" of SQL. Use it to categorize users based on their behavior metrics.
            </p>
            <div className="p-8 bg-zinc-900 rounded-[2.5rem] shadow-xl space-y-6">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500 rounded-lg"><CheckCircle className="w-4 h-4 text-white" /></div>
                  <h4 className="text-white font-bold tracking-tight">User Segmentation Query</h4>
               </div>
               <pre className="bg-zinc-800 p-4 rounded-xl font-mono text-[11px] text-indigo-300 overflow-x-auto leading-relaxed">
{`SELECT user_id,
       CASE 
         WHEN order_count > 10 THEN 'Power User'
         WHEN order_count > 0 THEN 'Active'
         ELSE 'Churned'
       END AS user_status
FROM user_metrics;`}
               </pre>
               <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-widest">Real Use Case</p>
                  <p className="text-xs text-zinc-300 font-bold leading-relaxed">Segmenting users for a targeted email campaign based on their usage history.</p>
               </div>
            </div>
          </section>

          <section className="bg-zinc-950 rounded-[2.5rem] p-8 md:p-12 border border-zinc-800">
             <h2 className="text-2xl font-black text-white mb-8 tracking-tight flex items-center gap-3"><Play className="w-6 h-6 text-indigo-400" /> Video Learning Path (Intermediate)</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                   { t: "Set Operators", time: "04:02:09", i: GitMerge },
                   { t: "SQL Functions Overview", time: "04:47:41", i: Binary },
                   { t: "String Functions", time: "04:52:58", i: Type },
                   { t: "Numeric Functions", time: "05:18:44", i: Hash }
                ].map(step => (
                   <div key={step.t} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><step.i className="w-4 h-4" /></div>
                         <span className="font-bold text-zinc-100 text-sm">{step.t}</span>
                      </div>
                      <span className="text-[10px] font-black text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-md">{step.time}</span>
                   </div>
                ))}
             </div>
             <p className="mt-8 text-xs text-zinc-500 font-medium italic text-center">Continue with the SQL Full Course reference.</p>
          </section>

        </div>
      </div>
    ),
    assignment: (
      <div className="max-w-[1100px] mx-auto space-y-10">
        <h3 className="text-3xl font-black tracking-tight text-zinc-900">Assignment</h3>
        <div className="bg-white p-10 md:p-14 border border-zinc-200 rounded-[3rem] shadow-xl shadow-indigo-50">
          <header className="space-y-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <Terminal className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-black tracking-tighter text-zinc-900">🎯 Day-15: Data Cleaning Pro</h4>
            <p className="text-xl text-zinc-600 font-medium leading-relaxed max-w-2xl">Use SQL functions to clean a simulated 'Users' table and categorize them by spend.</p>
          </header>
          
          <div className="mt-10 p-8 bg-zinc-950 rounded-3xl border border-zinc-800">
             <p className="font-black text-indigo-400 uppercase tracking-widest text-xs mb-6">Task Requirements</p>
             <ul className="space-y-4 text-zinc-300 font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Create a query that combines first and last name into 'Full Name'</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Use ROUND() to format order amounts to 2 decimal places</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Implement a CASE statement to label users with >$500 spend as 'VIP'</li>
             </ul>
          </div>
        </div>
      </div>
    ),
    resources: [
      { title: 'SQL Full Course (Intermediate Sections)', url: 'https://youtu.be/SSKVgrwhzus?si=M8AlYQA1WTxvKdBg', type: 'video' }
    ]
  }
];
