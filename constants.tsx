import React from 'react';
import { Lesson, ModuleInfo, Category } from './types';
import { 
  Lightbulb, Users, Target, PenTool, Brain, Search, Layout, BarChart, 
  Code, Bot, CheckCircle, Zap, TrendingUp, Layers, Database, Server, 
  Cpu, Rocket, RefreshCw, Play, Wrench, XCircle, Settings, HelpCircle, 
  Youtube, ExternalLink, Compass, ClipboardList, CheckSquare, FileText, 
  Flag, Microscope, ArrowRight, Activity, ShieldCheck, Sparkles, 
  DatabaseZap, Briefcase, Info, MessageSquare, AlertCircle, ChevronRight,
  Eye, MousePointer2, Hammer, Send, Repeat
} from 'lucide-react';

export const getCategoryColor = (category: Category): string => {
  switch (category) {
    case 'Foundations': return 'bg-blue-100 text-blue-700';
    case 'Research': return 'bg-purple-100 text-purple-700';
    case 'Data': return 'bg-emerald-100 text-emerald-700';
    case 'Design': return 'bg-pink-100 text-pink-700';
    case 'AI': return 'bg-orange-100 text-orange-700';
    case 'Strategy': return 'bg-indigo-100 text-indigo-700';
    case 'Tech': return 'bg-cyan-100 text-cyan-700';
    default: return 'bg-zinc-100 text-zinc-700';
  }
};

export const getCategoryIcon = (category: Category) => {
  switch (category) {
    case 'Foundations': return <Layers className="w-3.5 h-3.5" />;
    case 'Research': return <Search className="w-3.5 h-3.5" />;
    case 'Data': return <BarChart className="w-3.5 h-3.5" />;
    case 'Design': return <PenTool className="w-3.5 h-3.5" />;
    case 'AI': return <Bot className="w-3.5 h-3.5" />;
    case 'Strategy': return <Compass className="w-3.5 h-3.5" />;
    case 'Tech': return <Code className="w-3.5 h-3.5" />;
    default: return <Lightbulb className="w-3.5 h-3.5" />;
  }
};

const PMTypeCard = ({ icon, title, subtitle, focus, responsibilities, example, metrics, color }: any) => {
    const colorClasses: Record<string, string> = {
        blue: 'bg-blue-50 border-blue-100 text-blue-900',
        emerald: 'bg-emerald-50 border-emerald-100 text-emerald-900',
        indigo: 'bg-indigo-50 border-indigo-100 text-indigo-900',
        purple: 'bg-purple-50 border-purple-100 text-purple-900',
        cyan: 'bg-cyan-50 border-cyan-100 text-cyan-900',
        orange: 'bg-orange-50 border-orange-100 text-orange-900'
    };

    const iconClasses: Record<string, string> = {
        blue: 'bg-blue-100 text-blue-600',
        emerald: 'bg-emerald-100 text-emerald-600',
        indigo: 'bg-indigo-100 text-indigo-600',
        purple: 'bg-purple-100 text-purple-600',
        cyan: 'bg-cyan-100 text-cyan-600',
        orange: 'bg-orange-100 text-orange-600'
    };

    return (
        <div className={`p-6 rounded-2xl border transition-all hover:shadow-md ${colorClasses[color]}`}>
            <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${iconClasses[color]}`}>
                    {icon}
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 block">{subtitle}</span>
                    <h5 className="font-bold text-lg leading-tight tracking-tight">{title}</h5>
                </div>
            </div>
            
            <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">Focus</p>
                <p className="text-sm font-medium leading-relaxed">{focus}</p>
            </div>

            <div className="space-y-3 mb-6">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Responsibilities</p>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {responsibilities.map((res: string, i: number) => (
                        <li key={i} className="text-xs flex items-center gap-1.5">
                            <CheckCircle className="w-3 h-3 opacity-50" />
                            <span className="font-semibold">{res}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white/40 p-3 rounded-xl border border-white/50 space-y-2">
                <div className="flex items-center gap-2">
                    <Rocket className="w-3.5 h-3.5 opacity-50" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Real Example</span>
                </div>
                <p className="text-xs font-bold text-zinc-800">{example}</p>
                
                <div className="pt-2 flex items-center gap-2 border-t border-white/30">
                    <BarChart className="w-3.5 h-3.5 opacity-50" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">North Star Metrics</span>
                </div>
                <p className="text-xs font-medium text-zinc-700">{metrics}</p>
            </div>
        </div>
    );
};

const PDLCPhaseCard = ({ phase, title, goal, activities, outputs, example, icon, colorClass }: any) => {
    return (
        <div className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 ${colorClass} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform`}></div>
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-2xl ${colorClass.replace('bg-', 'bg-').replace('-500', '-100')} ${colorClass.replace('bg-', 'text-')}`}>
                        {icon}
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Phase {phase}</span>
                        <h4 className="text-xl font-bold text-zinc-900 leading-none">{title}</h4>
                    </div>
                </div>
                
                <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Goal</p>
                    <p className="text-zinc-700 font-medium leading-relaxed">{goal}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">Activities</p>
                        <ul className="space-y-2">
                            {activities.map((act: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 font-medium">
                                    <div className="w-1 h-1 rounded-full bg-zinc-300 mt-2"></div>
                                    <span>{act}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">Outputs</p>
                        <div className="flex flex-wrap gap-1.5">
                            {outputs.map((out: string, i: number) => (
                                <span key={i} className="px-2.5 py-1 bg-zinc-50 border border-zinc-100 rounded-lg text-[10px] font-bold text-zinc-500 uppercase tracking-tight">
                                    {out}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-50/50 p-4 rounded-2xl border border-zinc-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
                        <Rocket className="w-3 h-3" /> Real Example: Zomato
                    </p>
                    <p className="text-sm font-semibold text-zinc-800 italic leading-relaxed">
                        {example}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const MODULES: ModuleInfo[] = [
  { id: 'foundations', title: 'Foundations & Strategy', category: 'Foundations', description: 'Core PM concepts and strategic thinking.' },
  { id: 'research', title: 'Discovery & Research', category: 'Research', description: 'User interviews, personas, and market analysis.' },
  { id: 'data', title: 'Data & Analytics', category: 'Data', description: 'Metrics, SQL, and data-driven decision making.' },
  { id: 'design', title: 'Design, Tech & Agile', category: 'Design', description: 'UI/UX principles, engineering basics, and execution.' },
  { id: 'ai', title: 'AI & Future of PM', category: 'AI', description: 'Leveraging AI tools and preparing for the future.' },
];

export const LESSONS: Lesson[] = [
  {
    day: 0,
    title: 'Foundation & Mindset',
    category: 'Foundations',
    preview: 'Start Your PM Journey Right 🚀. Before we jump into frameworks, tools, and case studies, today is about building the right mindset.',
    content: (
      <div className="space-y-8 text-zinc-800">
        <section>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
             <h3 className="font-bold text-blue-900 text-lg">Day-0: Foundation & Mindset — Start Your PM Journey Right 🚀</h3>
          </div>
          
          <p className="text-lg leading-relaxed mb-6 text-zinc-600">
            Welcome to Day-0 of learning Product Management from scratch! Before we jump into frameworks, tools, and case studies, today is about building the right mindset to succeed as a Product Manager.
          </p>

          <p className="mb-4 font-medium text-zinc-700">
            Product Management is one of the most competitive and rewarding careers today. But breaking into PM without prior experience can feel overwhelming because the role demands:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-zinc-100 shadow-sm flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-500" />
                <span>Cross-functional collaboration</span>
            </div>
             <div className="bg-white p-4 rounded-lg border border-zinc-100 shadow-sm flex items-center gap-3">
                <Brain className="w-5 h-5 text-orange-500" />
                <span>Strategic thinking & decision-making</span>
            </div>
             <div className="bg-white p-4 rounded-lg border border-zinc-100 shadow-sm flex items-center gap-3">
                <Target className="w-5 h-5 text-red-500" />
                <span>Problem-solving with ambiguity</span>
            </div>
             <div className="bg-white p-4 rounded-lg border border-zinc-100 shadow-sm flex items-center gap-3">
                <Code className="w-5 h-5 text-blue-500" />
                <span>Understanding of business, design, tech & data</span>
            </div>
          </div>

          <p className="italic text-zinc-500 border-l-2 border-zinc-300 pl-4">
            Many aspiring PMs struggle not because they lack skills, but because they lack <strong>clarity of purpose and direction</strong>.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-zinc-900">
            <Lightbulb className="w-6 h-6 text-yellow-500" /> Why Day-0 Matters
          </h3>
          <p className="mb-4 text-zinc-600">
            Before learning “how to be a PM”, you must understand <strong>why</strong> you want to be a PM. PMs face pressure, ownership, ambiguity, and constant context switching — your motivation will keep you going when it gets hard.
          </p>
          <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
             <p className="font-bold text-zinc-900 mb-3">Understanding the reality of the role—not just the glamour—helps you evaluate:</p>
             <ul className="space-y-2 text-zinc-700">
                <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Is PM aligned with your strengths & interests?</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Do you enjoy solving problems and talking to users?</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Are you comfortable making decisions without perfect data?</span>
                </li>
             </ul>
             <p className="mt-4 text-sm text-zinc-600 bg-white p-3 rounded border border-zinc-100 inline-block">
                The fastest way to answer these questions is to talk to real PMs, understand their challenges, impact, and day-to-day responsibilities.
             </p>
          </div>
        </section>

        <section>
           <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-zinc-900">
            <Brain className="w-6 h-6 text-pink-500" /> Reflection Exercise
           </h3>
           <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-orange-100">
              <p className="font-bold text-orange-900 mb-4">Write answers to these 3 questions:</p>
              <div className="space-y-3">
                  <div className="bg-white p-3 rounded shadow-sm text-zinc-800">1. Why do I want to become a Product Manager?</div>
                  <div className="bg-white p-3 rounded shadow-sm text-zinc-800">2. What strengths do I already have that can help me succeed?</div>
                  <div className="bg-white p-3 rounded shadow-sm text-zinc-800">3. What areas do I need to improve over the next 45 days?</div>
              </div>
              <p className="mt-4 font-medium text-orange-800 text-center">Clarity today will drive consistency tomorrow.</p>
           </div>
        </section>

        <section>
            <h3 className="text-2xl font-bold mb-4 text-zinc-900">Outcome of Day-0</h3>
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <p className="font-medium text-green-900 mb-4">By the end of today, you should have:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        "Real understanding of what PM is",
                        "Motivation aligned with reality",
                        "Early networking with professionals",
                        "A clear starting point for the course"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-zinc-700">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </div>
    ),
    assignment: (
        <div className="space-y-4">
            <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" /> Task 1 — Must Do Today
            </h4>
            <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
                <p className="font-medium text-zinc-800 mb-3">Reach out to <span className="text-blue-600 font-bold">5 Product Managers</span> and ask them about their journey & role.</p>
                <p className="text-xs text-zinc-500 mb-4 bg-zinc-50 p-2 rounded">Use LinkedIn, alumni networks, or company communities.</p>
                <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
                    <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                    <p className="text-xs text-blue-800 font-medium">Goal: Collect insights and note patterns. This will guide your expectations.</p>
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
        <div className="space-y-12 text-zinc-800">
          {/* Section 1: What is a Product? */}
          <section>
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-zinc-100 rounded-lg text-zinc-600"><Layers className="w-6 h-6" /></div>
               <h3 className="text-2xl font-bold text-zinc-900">1. What is a Product?</h3>
            </div>
            <p className="text-lg mb-4 text-zinc-600">A product is anything that creates value by solving a real user problem or fulfilling a need—whether physical, digital, or service-based.</p>
            <div className="flex flex-wrap gap-2 mb-6">
               {['Uber', 'Spotify', 'iPhone', 'Google Ads', 'ATM', 'WhatsApp'].map(ex => (
                 <span key={ex} className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-sm font-bold text-zinc-700 shadow-sm">{ex}</span>
               ))}
            </div>
          </section>
    
          {/* Section 2: Do Companies Need PMs? */}
          <section>
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Briefcase className="w-6 h-6" /></div>
               <h3 className="text-2xl font-bold text-zinc-900">2. Do Companies Need Product Managers?</h3>
            </div>
            <p className="mb-6 font-medium text-zinc-600">Short answer: <span className="text-indigo-600 font-bold underline">Yes</span>—but the title isn’t always necessary. <span className="text-zinc-900">Product thinking</span> is.</p>
            
            <h4 className="font-bold mb-4 text-zinc-500 uppercase tracking-widest text-[10px]">Why PMs emerge: Company Growth Stages</h4>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm bg-white">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-50 border-b border-zinc-200">
                        <tr>
                            <th className="p-4 font-bold text-zinc-700 text-sm">Stage</th>
                            <th className="p-4 font-bold text-zinc-700 text-sm">Who acts as PM</th>
                            <th className="p-4 font-bold text-zinc-700 text-sm">Why it works</th>
                            <th className="p-4 font-bold text-zinc-700 text-sm">When it breaks</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs md:text-sm">
                        <tr className="border-b border-zinc-100">
                            <td className="p-4 font-bold text-zinc-800">Early startup</td>
                            <td className="p-4 text-zinc-600">Founder</td>
                            <td className="p-4 text-zinc-600">Small team, fast decisions, direct feedback</td>
                            <td className="p-4 text-zinc-600">Complexity increases, decisions overload</td>
                        </tr>
                        <tr className="border-b border-zinc-100">
                            <td className="p-4 font-bold text-zinc-800">Growth stage</td>
                            <td className="p-4 text-zinc-600">Dedicated PMs</td>
                            <td className="p-4 text-zinc-600">Align teams, prioritize impact, execution</td>
                            <td className="p-4 text-zinc-600">Without PMs: confusion, misalignment</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold text-zinc-800">Large enterprise</td>
                            <td className="p-4 text-zinc-600">Product org</td>
                            <td className="p-4 text-zinc-600">Scale, governance, coordination</td>
                            <td className="p-4 text-zinc-600">Without PMs: feature bloat, chaos, slow</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>

          {/* Section 3: Real-World Exceptions */}
          <section>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><AlertCircle className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-zinc-900">3. Real-World Exceptions</h3>
            </div>
            <p className="mb-4 text-zinc-600">Some companies have succeeded without formal PMs:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { name: 'Basecamp', context: 'Design-led product development' },
                    { name: 'Valve', context: 'Self-organized teams' },
                    { name: 'Stripe (Early)', context: 'Engineer-led decisions' }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-zinc-100 shadow-sm">
                        <p className="font-bold text-zinc-900 mb-1">{item.name}</p>
                        <p className="text-xs text-zinc-500 font-medium">{item.context}</p>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-sm text-zinc-500 italic bg-zinc-50 p-4 rounded-lg border border-dashed border-zinc-200">
               👉 These work only when everyone practices product thinking: <span className="font-bold text-zinc-700">user obsession + data + trade-offs + execution focus.</span>
            </p>
          </section>

          {/* Section 4: What is Product Management? */}
          <section className="bg-zinc-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><Sparkles className="w-32 h-32" /></div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300"><Compass className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-bold">4. What is Product Management?</h3>
                </div>
                <p className="text-lg text-zinc-300 mb-8 leading-relaxed max-w-3xl">
                    Product Management is the function responsible for guiding a product from <strong>idea → launch → growth → scale</strong> by balancing:
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center mb-10">
                    <div className="px-6 py-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm flex-1 w-full">
                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1">User Value</p>
                        <p className="text-sm">Solving real pain points</p>
                    </div>
                    <div className="text-xl font-bold text-zinc-500">×</div>
                    <div className="px-6 py-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm flex-1 w-full">
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">Business Goals</p>
                        <p className="text-sm">Revenue & Growth</p>
                    </div>
                    <div className="text-xl font-bold text-zinc-500">×</div>
                    <div className="px-6 py-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm flex-1 w-full">
                        <p className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-1">Tech Feasibility</p>
                        <p className="text-sm">System capabilities</p>
                    </div>
                </div>
                <p className="text-center font-bold text-xl bg-white/5 py-3 rounded-full border border-white/10">
                    "PMs don’t decide how to build — they decide <span className="text-indigo-400">what</span> to build and <span className="text-indigo-400">why</span>."
                </p>
            </div>
          </section>

          {/* Section 5: PM Responsibilities */}
          <section>
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-rose-50 rounded-lg text-rose-600"><CheckSquare className="w-6 h-6" /></div>
               <h3 className="text-2xl font-bold text-zinc-900">5. PM Responsibilities</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "User Understanding", content: "Research, interviews, personas, feedback loops.", icon: Users },
                    { title: "Problem Definition", content: "Insights, hypotheses, opportunity sizing.", icon: Brain },
                    { title: "Prioritization", content: "Frameworks (RICE, MoSCoW, Kano).", icon: Target },
                    { title: "Strategy & Roadmapping", content: "Vision, goals, milestones, timelines.", icon: TrendingUp },
                    { title: "Execution & Delivery", content: "PRDs, user stories, cross-functional collab.", icon: Zap },
                    { title: "Analytics & Learning", content: "KPI tracking, experiments, iterations.", icon: BarChart }
                ].map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-zinc-100 bg-white shadow-sm hover:border-indigo-100 transition-colors">
                        <item.icon className="w-6 h-6 text-indigo-600 mb-4" />
                        <h4 className="font-bold text-zinc-900 mb-2">{item.title}</h4>
                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.content}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* Section 6: PM Deliverables */}
          <section className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200">
             <h3 className="text-xl font-bold text-zinc-900 mb-6">6. PM Deliverables (The Artifacts)</h3>
             <div className="space-y-3">
                 {[
                    { art: "PRD", purpose: "Clarifies what & why for the whole team" },
                    { art: "Roadmap", purpose: "Visual timeline of priorities and milestones" },
                    { art: "User Stories", purpose: "Granular execution details for engineering" },
                    { art: "Metrics Dashboard", purpose: "Real-time tracking of product success" },
                    { art: "GTM / Launch Plan", purpose: "Alignment with marketing for market entry" }
                 ].map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                        <span className="font-bold text-zinc-800">{d.art}</span>
                        <span className="text-sm text-zinc-500 font-medium">{d.purpose}</span>
                    </div>
                 ))}
             </div>
          </section>

          {/* Section 7 & Deep Dive: Types of PMs */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Search className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-zinc-900">7. Types of Product Managers & Why They Exist 🔍</h3>
            </div>

            <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200 relative overflow-hidden mb-12">
                <h4 className="text-xl font-bold mb-4 text-zinc-800">Why Different PM Types Exist</h4>
                <p className="text-zinc-600 leading-relaxed mb-6">As products scale, complexity grows — more users, more data, and deeper specialization needs. While an early-stage PM owns everything, a scaled organization requires specialization for efficiency.</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Core PM */}
                    <PMTypeCard 
                        icon={<Layout className="w-5 h-5 text-blue-600" />}
                        title="1. Core Product Manager"
                        subtitle="The Generalist"
                        focus="End-to-end ownership of user-facing product experiences."
                        responsibilities={['Vision & Roadmap', 'User Research', 'Prioritization', 'PRD Writing']}
                        example="Swiggy improving checkout conversion from 85% → 92%"
                        metrics="Retention, Adoption, NPS, DAU"
                        color="blue"
                    />

                    {/* Growth PM */}
                    <PMTypeCard 
                        icon={<Activity className="w-5 h-5 text-emerald-600" />}
                        title="2. Growth Product Manager"
                        subtitle="The Optimizer"
                        focus="Driving acquisition, activation, retention & revenue."
                        responsibilities={['Funnel Optimization', 'A/B Testing', 'Monetization Strategy', 'Referral Loops']}
                        example="Duolingo improving daily streak feature → +15% retention"
                        metrics="DAU/MAU, Conversion Rate, LTV, Churn"
                        color="emerald"
                    />

                    {/* Platform PM */}
                    <PMTypeCard 
                        icon={<Server className="w-5 h-5 text-indigo-600" />}
                        title="3. Platform Product Manager"
                        subtitle="The Enabler"
                        focus="Internal systems, APIs & developer experience."
                        responsibilities={['Build Scalable Auth/Payments', 'Align Engineering Reliability', 'Reduce Build Blocks', 'Internal Tooling']}
                        example="Razorpay building unified payments gateway API"
                        metrics="API Uptime, Latency, Integration Adoption"
                        color="indigo"
                    />

                    {/* Data PM */}
                    <PMTypeCard 
                        icon={<DatabaseZap className="w-5 h-5 text-purple-600" />}
                        title="4. Data Product Manager"
                        subtitle="The Analyst PM"
                        focus="Data pipelines, dashboards & experimentation frameworks."
                        responsibilities={['Tracking & Schemas', 'Partner with DS/ML teams', 'Data Governance', 'Enable Insight Decisions']}
                        example="Meesho enabling real-time retention dashboards"
                        metrics="Data Accuracy, Latency, Dashboard Usage"
                        color="purple"
                    />

                    {/* Technical PM */}
                    <PMTypeCard 
                        icon={<Code className="w-5 h-5 text-cyan-600" />}
                        title="5. Technical Product Manager (TPM)"
                        subtitle="The Architect"
                        focus="Highly technical systems & infrastructure integrations."
                        responsibilities={['Biz Req → Architecture Req', 'Manage APIs & Backend', 'Balance Tech Debt', 'Scalability Goals']}
                        example="Slack launching developer API endpoints"
                        metrics="Reliability, Integration Success, Performance"
                        color="cyan"
                    />

                    {/* AI PM */}
                    <PMTypeCard 
                        icon={<Sparkles className="w-5 h-5 text-orange-600" />}
                        title="6. AI Product Manager"
                        subtitle="The Intelligent Builder"
                        focus="Products powered by machine learning & generative AI."
                        responsibilities={['Identify AI Impact Opps', 'ML Model Lifecycle Management', 'Responsible AI Behavior', 'Model Metrics → Business Metrics']}
                        example="Netflix personalization engine (+15% viewing time)"
                        metrics="Model Accuracy, Prompt Success, Usage, NPS"
                        color="orange"
                    />
                </div>
            </div>
          </section>

          {/* Section 8: Who does a PM work with? */}
          <section>
             <h3 className="text-2xl font-bold text-zinc-900 mb-6">8. Who Does a PM Work With?</h3>
             <div className="space-y-4">
                 {[
                    { team: "Engineering", provides: "Priorities, clarity, context" },
                    { team: "Design", provides: "Problem definition, constraints, feedback" },
                    { team: "Marketing", provides: "Messaging, positioning, GTM strategy" },
                    { team: "Leadership", provides: "Strategy, metrics, high-level roadmap" },
                    { team: "Users", provides: "Feedback loops and insights" }
                 ].map((w, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <span className="font-bold text-zinc-800 w-32">{w.team}</span>
                        <span className="text-zinc-500 text-sm font-medium">PM Provides: {w.provides}</span>
                    </div>
                 ))}
             </div>
          </section>

          {/* Section 9: Myths vs Reality */}
          <section className="bg-rose-50 p-8 rounded-3xl border border-rose-100">
             <h3 className="text-2xl font-bold text-rose-900 mb-6 flex items-center gap-2">
                <Info className="w-6 h-6" /> 9. Myths vs Reality
             </h3>
             <div className="space-y-4">
                 {[
                    { myth: "PMs are the boss of the team.", reality: "PMs have no authority — influence only." },
                    { myth: "PMs must know how to code.", reality: "Not required, but tech literacy is crucial." },
                    { myth: "PMs only build new features.", reality: "PMs solve problems. Sometimes by removing features." },
                    { myth: "PMs manage timelines.", reality: "That's project management. PMs define what & why." }
                 ].map((m, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-xl border border-rose-200 line-through text-zinc-400 text-sm">“{m.myth}”</div>
                        <div className="p-4 bg-white rounded-xl border border-rose-200 text-rose-700 text-sm font-bold">Reality: {m.reality}</div>
                    </div>
                 ))}
             </div>
          </section>

          {/* Section 10: Example: PM at a Food Delivery App */}
          <section>
            <h3 className="text-2xl font-bold text-zinc-900 mb-6">10. Example: PM at a Food Delivery App</h3>
            <div className="relative border-l-2 border-zinc-100 ml-4 pl-8 space-y-8">
                {[
                    { phase: "Research", act: "Understand checkout drop-offs" },
                    { phase: "Prioritize", act: "Identify high-impact issues" },
                    { phase: "Design", act: "Improve cart UX" },
                    { phase: "Build", act: "Collaborate via PRD + sprint goals" },
                    { phase: "Launch", act: "Marketing coordination" },
                    { phase: "Measure", act: "Track completion rate in Mixpanel" }
                ].map((p, i) => (
                    <div key={i} className="relative">
                        <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white"></div>
                        <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">{p.phase}</p>
                        <p className="font-bold text-zinc-800">{p.act}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* Recap */}
          <section className="bg-zinc-900 text-white p-10 rounded-[2.5rem] text-center">
             <h3 className="text-2xl font-bold mb-6 tracking-tight">📌 Quick Recap</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">PM = Outcome-driven, not output-driven</div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">PM is a role of clarity & empathy</div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">PM success = Impact on user + business</div>
             </div>
          </section>
      </div>
    ),
    assignment: (
      <div className="space-y-6">
          <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> 🎯 Day-1 Mini Assignment
          </h4>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
             <p className="text-zinc-700 font-medium">Pick a product you use daily (e.g., Spotify, Zomato, Notion, Cred) and answer:</p>
             <ul className="list-disc pl-5 text-sm text-zinc-600 space-y-2">
                <li>What problem does it solve for you?</li>
                <li>What metrics might the PM track?</li>
                <li>What is one improvement you would suggest?</li>
             </ul>
             
             <div className="mt-6 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Submission Format:</p>
                <code className="text-[10px] md:text-xs text-indigo-600 block leading-relaxed whitespace-pre">
                    Product Name: ___{'\n'}
                    User Problem:{'\n'}
                    Key Metrics:{'\n'}
                    Improvement Suggestion:
                </code>
             </div>
          </div>
          
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
              <h5 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" /> Reflection Task
              </h5>
              <p className="text-xs text-indigo-700 leading-relaxed font-medium">
                Identify which of the 6 PM types excites you the most and why. Does it align with your current background (e.g., Engineer → TPM, Marketing → Growth)?
              </p>
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
        <div className="space-y-12 text-zinc-800">
            {/* Learning Objectives */}
            <section className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-900">
                    <Target className="w-5 h-5" /> Learning Objectives
                </h3>
                <p className="mb-4 font-semibold text-blue-800">By the end of today, you will:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        "Understand the full lifecycle of product development",
                        "Know what happens at every stage & what PMs contribute",
                        "Learn common outputs, tools, and real examples",
                        "Avoid the typical mistakes that junior PMs make"
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 bg-white/50 p-3 rounded-xl border border-blue-200">
                            <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-sm text-blue-900 font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* What is PDLC? */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-zinc-100 rounded-lg text-zinc-600"><Settings className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-bold text-zinc-900">1. What is PDLC?</h3>
                </div>
                <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                    Product Development Lifecycle (PDLC) is the structured process of taking a product from <strong>problem discovery → launch → continuous improvement</strong>, ensuring decisions are user-driven, data-backed, and business-aligned.
                </p>

                {/* Visual Flow Component */}
                <div className="bg-zinc-900 p-8 rounded-[2rem] overflow-x-auto no-scrollbar mb-10">
                    <div className="flex items-center min-w-[800px] justify-between gap-4">
                        {[
                            { label: 'Discovery', color: 'bg-indigo-500' },
                            { label: 'Definition', color: 'bg-blue-500' },
                            { label: 'Design', color: 'bg-pink-500' },
                            { label: 'Development', color: 'bg-cyan-500' },
                            { label: 'Launch', color: 'bg-emerald-500' },
                            { label: 'Iteration', color: 'bg-orange-500' }
                        ].map((step, i) => (
                            <React.Fragment key={i}>
                                <div className="flex flex-col items-center gap-3">
                                    <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-lg`}>
                                        <span className="font-bold">{i+1}</span>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{step.label}</span>
                                </div>
                                {i < 5 && <ChevronRight className="w-5 h-5 text-zinc-700" />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm bg-white">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-zinc-50 border-b border-zinc-200">
                            <tr>
                                <th className="p-4 font-bold text-zinc-700 text-sm">Stage</th>
                                <th className="p-4 font-bold text-zinc-700 text-sm">Goal</th>
                                <th className="p-4 font-bold text-zinc-700 text-sm">Key Output</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[
                                { s: 'Discovery', g: 'Understand the user problem', o: 'Problem statement, Personas' },
                                { s: 'Definition', g: 'Scope & prioritize solution', o: 'PRD, success metrics' },
                                { s: 'Design', g: 'Visualize experience', o: 'Wireframes, Prototype' },
                                { s: 'Development', g: 'Build & test', o: 'MVP, QA sign-off' },
                                { s: 'Launch', g: 'Ship product to users', o: 'GTM plan, adoption data' },
                                { s: 'Iteration', g: 'Improve continuously', o: 'Insights, next roadmap' }
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
                                    <td className="p-4 font-bold text-zinc-800">{row.s}</td>
                                    <td className="p-4 text-zinc-600">{row.g}</td>
                                    <td className="p-4 text-indigo-600 font-bold">{row.o}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Deep Dive Phases */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Layers className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-bold text-zinc-900">Six Key Stages of PDLC</h3>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <PDLCPhaseCard 
                        phase="1"
                        title="Discovery (Find the Right Problem)"
                        icon={<Eye className="w-6 h-6" />}
                        colorClass="bg-indigo-500"
                        goal="“Fall in love with the problem, not the solution.” Understand real user needs and validate the painpoint."
                        activities={['Market & competitor research', 'User interviews, surveys', 'Data analysis (Mixpanel, SQL)', 'Identify Jobs-to-be-Done (JTBD)']}
                        outputs={['Problem statement', 'Personas', 'Hypothesis', 'Opportunity sizing']}
                        example="Zomato observes high checkout drop-offs because of unpredictable surge delivery fees."
                    />

                    <PDLCPhaseCard 
                        phase="2"
                        title="Definition (Scope the Solution)"
                        icon={<Target className="w-6 h-6" />}
                        colorClass="bg-blue-500"
                        goal="Turn insights into an actionable plan. Define what we are building and how we measure success."
                        activities={['Prioritization (RICE, MoSCoW)', 'Success metrics / OKRs', 'PRD writing', 'Cross-team alignment']}
                        outputs={['PRD', 'Prioritized roadmap', 'Success metrics']}
                        example="Test a Flat Delivery Fee Subscription Model to reduce checkout abandonment by 15%."
                    />

                    <PDLCPhaseCard 
                        phase="3"
                        title="Design (Shape the Experience)"
                        icon={<MousePointer2 className="w-6 h-6" />}
                        colorClass="bg-pink-500"
                        goal="Design an intuitive and user-friendly experience for solving the defined problem."
                        activities={['Wireframes & prototypes (Figma)', 'User testing & usability reviews', 'Accessibility & UI polishing']}
                        outputs={['Prototype', 'Usability results', 'Design specs']}
                        example="Prototype for 1-click subscription to Zomato delivery fee waiver."
                    />

                    <PDLCPhaseCard 
                        phase="4"
                        title="Development (Build)"
                        icon={<Hammer className="w-6 h-6" />}
                        colorClass="bg-cyan-500"
                        goal="Build and test the feature until ready for release. Focus on quality and functional alignment."
                        activities={['Sprint planning & execution (Jira)', 'Daily standups, bug triage', 'QA & UAT testing', 'Feature flag rollout']}
                        outputs={['Working MVP', 'Release candidate', 'Go/No-Go decision']}
                        example="Feature toggle rollout to 5% of users in Bangalore to test load performance."
                    />

                    <PDLCPhaseCard 
                        phase="5"
                        title="Launch (Ship & Distribute)"
                        icon={<Send className="w-6 h-6" />}
                        colorClass="bg-emerald-500"
                        goal="“Shipping is a feature.” Release value to users and drive broad adoption."
                        activities={['GTM strategy (Marketing, Sales)', 'Tutorials & walkthroughs', 'Monitor adoption & sentiment']}
                        outputs={['GTM docs', 'Release comms', 'Launch dashboard']}
                        example="Email + push campaign alerting Bangalore users about the new flat fee subscription."
                    />

                    <PDLCPhaseCard 
                        phase="6"
                        title="Iteration (Learn & Improve)"
                        icon={<Repeat className="w-6 h-6" />}
                        colorClass="bg-orange-500"
                        goal="Improve continuously based on real-world data and user feedback."
                        activities={['Analyze SQL/Mixpanel reports', 'Collect feedback (NPS, CSAT)', 'Identify improvement opportunities']}
                        outputs={['Insights report', 'Updated roadmap', 'New hypothesis']}
                        example="Feature adoption = 70%, renewal = 30% → pricing experiment planned to improve retention."
                    />
                </div>
            </section>

            {/* Key Takeaways */}
            <section className="bg-zinc-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-transparent"></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <Zap className="w-6 h-6 text-yellow-400" /> Key Takeaways
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <p className="text-zinc-300 font-bold leading-relaxed italic">"The best PMs don’t build features — they solve problems."</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <p className="text-zinc-300 font-bold leading-relaxed italic">"PDLC creates structure, clarity, and alignment across the org."</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <p className="text-zinc-300 font-bold leading-relaxed italic">"Launch is not the end — iteration is where true results come from."</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    ),
    assignment: (
        <div className="space-y-6">
            <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" /> 🎯 Day-2 Mini Assignment
            </h4>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
                <p className="text-zinc-700 font-medium">Pick any app (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and describe a new feature across the PDLC:</p>
                
                <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100 space-y-4">
                    <div className="grid grid-cols-1 gap-2 text-xs md:text-sm text-zinc-600">
                        <p><span className="font-bold text-zinc-800">Product:</span> ___</p>
                        <p><span className="font-bold text-zinc-800">Feature Idea:</span> ___</p>
                        <p><span className="font-bold text-zinc-800">Discovery – Problem & insight:</span> ___</p>
                        <p><span className="font-bold text-zinc-800">Definition – Hypothesis & metrics:</span> ___</p>
                        <p><span className="font-bold text-zinc-800">Design – Sketch or description:</span> ___</p>
                        <p><span className="font-bold text-zinc-800">Development – Dependencies / risks:</span> ___</p>
                        <p><span className="font-bold text-zinc-800">Launch – Target segment & rollout plan:</span> ___</p>
                        <p><span className="font-bold text-zinc-800">Iteration – What will you measure?:</span> ___</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 bg-indigo-50 p-4 rounded-xl">
                    <Zap className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <p className="text-xs text-indigo-800 font-medium leading-relaxed">
                        📌 Expected outcome: You learn to think like a PM end-to-end, considering feasibility, launch, and measurement from day one.
                    </p>
                </div>
            </div>
        </div>
    )
  }
];
