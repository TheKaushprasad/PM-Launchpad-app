import React from 'react';
import { Lesson, ModuleInfo, Category } from './types';
import { 
  Lightbulb, Users, Target, PenTool, Brain, Search, Layout, BarChart, 
  Code, Bot, CheckCircle, Zap, TrendingUp, Layers, Database, Server, 
  Cpu, Rocket, RefreshCw, Play, Wrench, XCircle, Settings, HelpCircle, 
  Youtube, ExternalLink, Compass, ClipboardList, CheckSquare, FileText, 
  Flag, Microscope, ArrowRight, Activity, ShieldCheck, Sparkles, 
  DatabaseZap, Briefcase, Info, MessageSquare, AlertCircle, ChevronRight,
  Eye, MousePointer2, Hammer, Send, Repeat, TrendingDown, LifeBuoy, Trash2,
  Stethoscope, Presentation, Boxes, Heart, Globe, Footprints, ClipboardCheck,
  Ear, Smile, Map, UserPlus, Filter, DollarSign, PieChart, Scale, ShoppingCart, 
  Globe2, Building2, Cpu as CpuIcon, Microscope as MicroscopeIcon, ListChecks,
  UserCircle2, Quote, Sparkle, MessageCircle, Clipboard, SplitSquareVertical
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
                        <Rocket className="w-3 h-3" /> Industry Case
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
            {/* Header & Flow Illustration */}
            <section className="text-center space-y-6">
                <div className="bg-zinc-100 p-8 rounded-[3rem] overflow-hidden relative">
                    <div className="absolute inset-0 bg-yellow-200/30"></div>
                    <div className="relative z-10 space-y-8">
                        <h3 className="text-3xl font-black text-zinc-900 tracking-tight">The Product Development Lifecycle (PDLC)</h3>
                        
                        {/* Custom Arrow Flow CSS-like Tailwind implementation */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                            {[
                                { label: 'DISCOVERY', color: 'bg-zinc-400' },
                                { label: 'DEFINITION', color: 'bg-zinc-400' },
                                { label: 'DESIGN', color: 'bg-zinc-400' },
                                { label: 'DEVELOPMENT', color: 'bg-zinc-400' },
                                { label: 'LAUNCH', color: 'bg-zinc-400' },
                                { label: 'ITERATION', color: 'bg-zinc-400' }
                            ].map((step, i) => (
                                <div key={i} className="relative h-16 group">
                                    <div className={`absolute inset-0 ${step.color} clip-arrow flex items-center justify-center`}>
                                        <span className="text-[10px] font-black tracking-widest text-zinc-900">{step.label}</span>
                                    </div>
                                    <style>{`
                                        .clip-arrow {
                                            clip-path: polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%);
                                        }
                                    `}</style>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

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

            {/* 1. What is PDLC? */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-zinc-100 rounded-lg text-zinc-600"><Settings className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-bold text-zinc-900">1. What is PDLC?</h3>
                </div>
                <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                    Product Development Lifecycle (PDLC) is the structured process of taking a product from <strong>problem discovery → launch → continuous improvement</strong>, ensuring decisions are user-driven, data-backed, and business-aligned.
                </p>

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
                <div className="grid grid-cols-1 gap-8">
                    <PDLCPhaseCard 
                        phase="1"
                        title="Discovery (Find the Right Problem)"
                        icon={<Eye className="w-6 h-6" />}
                        colorClass="bg-indigo-500"
                        goal="“Fall in love with the problem, not the solution.” Understand real user needs and validate the painpoint."
                        activities={['Market & competitor research', 'User interviews, surveys', 'Data analysis (Mixpanel, GA, SQL)', 'Identify Jobs-to-be-Done (JTBD)']}
                        outputs={['Problem statement', 'Personas', 'Hypothesis', 'Opportunity sizing']}
                        example="Zomato observes high checkout drop-offs because of unpredictable surge delivery fees."
                    />

                    <PDLCPhaseCard 
                        phase="2"
                        title="Definition (Scope the Solution)"
                        icon={<Target className="w-6 h-6" />}
                        colorClass="bg-blue-500"
                        goal="Turn insights into an actionable plan. Define what we are building and how we measure success."
                        activities={['Prioritization (RICE, MOSCOW, Value-Effort)', 'Success metrics / OKRs', 'PRD writing', 'Align with design & engineering']}
                        outputs={['PRD', 'Prioritized roadmap', 'Success metrics']}
                        example="Test a Flat Delivery Fee Subscription Model to reduce checkout abandonment by 15%."
                    />

                    <PDLCPhaseCard 
                        phase="3"
                        title="Design (Shape the Experience)"
                        icon={<MousePointer2 className="w-6 h-6" />}
                        colorClass="bg-pink-500"
                        goal="Design an intuitive experience for solving the defined problem."
                        activities={['Wireframes & prototypes in Figma', 'User testing & usability reviews', 'Accessibility & UI polishing']}
                        outputs={['Prototype', 'Usability results', 'Design specs']}
                        example="Prototype for 1-click subscription to Zomato delivery fee waiver."
                    />

                    <PDLCPhaseCard 
                        phase="4"
                        title="Development (Build)"
                        icon={<Hammer className="w-6 h-6" />}
                        colorClass="bg-cyan-500"
                        goal="Build and test the feature until ready for release. Focus on functional alignment."
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
                        activities={['GTM strategy (Marketing, Sales, Support)', 'Announcements, tutorials, walkthroughs', 'Monitor adoption & sentiment']}
                        outputs={['GTM docs', 'Release comms', 'Launch dashboard']}
                        example="Email + push campaign tracking adoption of the new delivery subscription."
                    />

                    <PDLCPhaseCard 
                        phase="6"
                        title="Iteration (Learn & Improve)"
                        icon={<Repeat className="w-6 h-6" />}
                        colorClass="bg-orange-500"
                        goal="Improve continuously based on data. The cycle never truly ends."
                        activities={['Analyze Mixpanel, GA, SQL reports', 'Collect feedback (NPS, CSAT)', 'Identify improvement opportunities']}
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
                            <p className="text-zinc-300 font-bold leading-relaxed italic">"Launch is not the end — iteration is where results come from."</p>
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
                    <p className="text-xs text-indigo-800 font-medium leading-relaxed italic">
                        📌 Expected outcome: You learn to think like a PM end-to-end, considering everything from feasibility to measurement.
                    </p>
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
        <div className="space-y-12 text-zinc-800">
          {/* 1. What is Product Life Cycle (PLC)? */}
          <section>
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Compass className="w-6 h-6" /></div>
               <h3 className="text-2xl font-bold text-zinc-900">What is Product Life Cycle (PLC)?</h3>
            </div>
            <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
              Product Life Cycle is the journey a product goes through in the market — from the day it is launched to the day it is eventually retired.
            </p>
            
            <h4 className="font-bold text-lg mb-6 text-zinc-800">What Are the 4 Stages of Product Life Cycle?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {[
                    { 
                        title: 'Introduction', 
                        desc: 'This is when a new product is first introduced to the market. Sales are usually low because customers are just starting to become aware of the product, and marketing efforts are focused on building awareness and generating interest. Companies may be investing heavily in research and development during this stage.',
                        icon: Rocket, color: 'text-blue-500', bg: 'bg-blue-50' 
                    },
                    { 
                        title: 'Growth', 
                        desc: 'In this stage, the product starts to gain interest. Sales begin to increase as more customers become aware of the product and start buying it. Marketing efforts now focus on expanding market share and building brand loyalty. Competitors may also start entering the market during this stage.',
                        icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' 
                    },
                    { 
                        title: 'Maturity', 
                        desc: 'This is the stage of peak sales. The product has reached its maximum market penetration, and sales growth starts to level off. Competition is usually intense, and companies may need to focus on differentiating their product through added features, improved quality, or competitive pricing.',
                        icon: CheckCircle, color: 'text-orange-500', bg: 'bg-orange-50' 
                    },
                    { 
                        title: 'Growth', 
                        desc: 'In the decline stage, sales begin to decline as customer preferences change, new technologies emerge, or market saturation occurs. Companies may choose to discontinue the product or try to extend it via strategies like updates, new marketing, or new segments.',
                        icon: TrendingDown, color: 'text-rose-500', bg: 'bg-rose-50' 
                    }
                ].map((s, i) => (
                    <div key={i} className={`p-6 rounded-2xl border border-zinc-100 transition-all hover:shadow-md ${s.bg}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <s.icon className={`w-6 h-6 ${s.color}`} />
                            <h5 className="font-bold text-zinc-900">{s.title}</h5>
                        </div>
                        <p className="text-sm text-zinc-600 leading-relaxed font-medium">{s.desc}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* 2. What is Product Lifecycle Management (PLM)? */}
          <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-zinc-900 rounded-lg text-white"><Settings className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-zinc-900">What is Product Lifecycle Management (PLM)?</h3>
            </div>
            <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200 mb-8">
                <p className="text-lg text-zinc-600 leading-relaxed italic mb-4">
                    Product Lifecycle Management (PLM) is the practice of managing a product from its initiation to its eventual retirement through a systematic approach.
                </p>
                <p className="text-sm text-zinc-500 leading-relaxed">
                    It's a system that helps manage every step of a product's life, from the initial idea and design to manufacturing, distribution, and even after it's sold. It's a way for companies to keep track of all the details and make sure everyone involved is on the same page throughout the product's journey. So, in simpler terms, PLM is like a guidebook that helps companies manage their products from start to finish.
                </p>
            </div>

            <h4 className="font-bold text-lg mb-6 text-zinc-800">Stages of a Product in Product Life Cycle Management (PLM)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {[
                    { 
                        title: 'Concept Stage', 
                        desc: 'The start of making a new product. Involves initial ideas and planning, market research, identifying customer needs, and determining feasibility. Usually research and development takes the lead.',
                        icon: Lightbulb, color: 'text-yellow-600' 
                    },
                    { 
                        title: 'Design Stage', 
                        desc: 'Careful plan for the product, building prototypes, and testing everything. Ensuring the design meets all rules and safety standards. Significant R&D spend happens here.',
                        icon: PenTool, color: 'text-pink-600' 
                    },
                    { 
                        title: 'Production Stage', 
                        desc: 'Making the product at scale—getting materials, putting everything together, and quality checks. Design changes should be minimal at this point.',
                        icon: Hammer, color: 'text-zinc-600' 
                    },
                    { 
                        title: 'Sales Stage', 
                        desc: 'About telling people about the product and getting them to buy it via advertisements, prices, and special deals. Forecasting is crucial.',
                        icon: Presentation, color: 'text-indigo-600' 
                    },
                    { 
                        title: 'Support Stage', 
                        desc: 'Ongoing customer support including customer service, warranties, repairs, and services or training to enhance user experience.',
                        icon: LifeBuoy, color: 'text-blue-600' 
                    },
                    { 
                        title: 'Retirement Stage', 
                        desc: 'The life of the product ends due to better products, preference shifts, or tech moves. Includes responsible recycling or find new uses.',
                        icon: Trash2, color: 'text-rose-600' 
                    }
                ].map((s, i) => (
                    <div key={i} className="p-6 bg-white rounded-2xl border border-zinc-100 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <s.icon className={`w-5 h-5 ${s.color}`} />
                            <span className="font-bold text-zinc-900 tracking-tight">{s.title}</span>
                        </div>
                        <p className="text-xs text-zinc-500 font-medium leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* Benefits of PLM */}
          <section className="bg-zinc-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><ShieldCheck className="w-32 h-32" /></div>
             <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-400" /> Benefits of Using a Product Life Cycle Management Approach
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                    { t: "Improved Collaboration", d: "PLM encourages cross-functional collaboration, ensuring that all stakeholders, from design to sales, work together seamlessly." },
                    { t: "Enhanced Product Quality", d: "By integrating quality control into each phase, PLM helps identify and rectify potential issues early, resulting in higher-quality products." },
                    { t: "Efficient Resource Utilization", d: "Streamlines processes, reducing waste and optimizing resource utilization, leading to significant cost savings." },
                    { t: "Faster Time-to-Market", d: "A structured approach facilitates quicker development cycles, enabling companies to bring products to market more rapidly." },
                    { t: "Regulatory Compliance", d: "PLM systems assist in ensuring that products meet regulatory standards, minimizing the risk of legal and compliance issues." }
                 ].map((b, i) => (
                    <div key={i} className="flex gap-4">
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-zinc-100">{b.t}</p>
                            <p className="text-sm text-zinc-400 leading-relaxed font-medium">{b.d}</p>
                        </div>
                    </div>
                 ))}
             </div>
          </section>
        </div>
    ),
    assignment: (
      <div className="space-y-6">
          <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> 🎯 Day-3 Mini Assignment
          </h4>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
             <p className="text-zinc-700 font-medium">Pick any product (Spotify / Swiggy / Cred / Duolingo / ChatGPT) and evaluate its lifecycle:</p>
             <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100 space-y-4">
                <div className="grid grid-cols-1 gap-2 text-xs md:text-sm text-zinc-600">
                    <p><span className="font-bold text-zinc-800">Product:</span> ___</p>
                    <p><span className="font-bold text-zinc-800">Current PLC Stage:</span> ___</p>
                    <p><span className="font-bold text-zinc-800">What signals tell you this stage?:</span> ___</p>
                    <p><span className="font-bold text-zinc-800">What should PM focus on right now (Strategy)?:</span> ___</p>
                    <p><span className="font-bold text-zinc-800">One risky decision PM must make at this stage:</span> ___</p>
                    <p><span className="font-bold text-zinc-800">If it’s declining, how would you extend or sunset it?:</span> ___</p>
                </div>
             </div>
             <div className="flex items-start gap-3 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <Zap className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-indigo-800 font-medium leading-relaxed italic">
                    📌 Expected outcome: You learn to reason about products strategically over time, adapting your management style (PLM) to the market stage (PLC).
                </p>
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
        <div className="space-y-12 text-zinc-800">
          {/* Header */}
          <section className="bg-indigo-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles className="w-40 h-40" /></div>
             <h3 className="text-3xl font-bold mb-4">What is Product Sense?</h3>
             <p className="text-lg text-indigo-100 max-w-2xl leading-relaxed">
                Product sense is the ability to see through complexity and spot the user needs that matter most. Experts like <strong>Marty Cagan</strong> emphasize that it is एक्चुअली deep product knowledge built through immersion, not an innate gift.
             </p>
          </section>

          {/* Pillars of Product Sense */}
          <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Layers className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-zinc-900">The 7 Pillars of Product Sense</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { t: "Empathy & Customer Needs", d: "Listening for spoken and unspoken pain points and emotional drivers.", i: Heart },
                    { t: "Market & Competitive Insight", d: "Analyzing trends and mapping competitor gaps to find unique value.", i: Globe },
                    { t: "Design & UX Perspective", d: "Recognizing good flows and how design decisions affect engagement.", i: PenTool },
                    { t: "Problem Framing & Mapping", d: "Distinguishing root causes from symptoms and exploring options.", i: Target },
                    { t: "Feasibility & Execution", d: "Balancing ambitious ideas with tech constraints, budgets, and timelines.", i: Code },
                    { t: "Iteration & Validation", d: "Using prototypes and experiments to adjust based on real data.", i: Repeat },
                    { t: "Domain Immersion", d: "Gaining deep knowledge of a space to predict behaviors and outcomes.", i: Microscope }
                ].map((p, idx) => (
                    <div key={idx} className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm hover:border-indigo-100 transition-colors">
                        <p.i className="w-6 h-6 text-indigo-500 mb-4" />
                        <h4 className="font-bold text-zinc-900 mb-2">{p.t}</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed font-medium">{p.d}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* Why Master It */}
          <section className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200">
             <h3 className="text-xl font-bold text-zinc-900 mb-6">Why Aspiring PMs Must Master It</h3>
             <div className="space-y-4">
                 {[
                    { t: "A Key Hiring Criterion", d: "Most companies test for product sense during interviews to see if you can analyze products meaningfully." },
                    { t: "Bridges Strategy and Execution", d: "Ties small features to the 'bigger picture' and strategic goals." },
                    { t: "Anticipates User Behavior", d: "Sense unarticulated needs before competitors (e.g., Original iPhone, Gmail)." },
                    { t: "Stakeholder Alignment", d: "Provides the rationale needed to explain trade-offs to engineers and execs." }
                 ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start bg-white p-4 rounded-xl border border-zinc-100">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-bold text-zinc-800 text-sm">{item.t}</p>
                            <p className="text-xs text-zinc-500 font-medium leading-relaxed">{item.d}</p>
                        </div>
                    </div>
                 ))}
             </div>
          </section>

          {/* Daily Habits */}
          <section>
            <h3 className="text-2xl font-bold text-zinc-900 mb-6">Daily Habits to Build Instincts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                        <Users className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                            <p className="font-bold text-blue-900">Talk to Users Regularly</p>
                            <p className="text-sm text-blue-700">Read tickets, join sales calls, and observe context surveys miss.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-5 bg-purple-50 rounded-2xl border border-purple-100">
                        <Repeat className="w-6 h-6 text-purple-600 mt-1" />
                        <div>
                            <p className="font-bold text-purple-900">Reverse-Engineer Products</p>
                            <p className="text-sm text-purple-700">Break down apps like Airbnb to understand core needs and trade-offs.</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex gap-4 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <ClipboardCheck className="w-6 h-6 text-emerald-600 mt-1" />
                        <div>
                            <p className="font-bold text-emerald-900">Perform Product Drills</p>
                            <p className="text-sm text-emerald-700">List 3 strengths and 3 weaknesses of a daily-use app with justifications.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-5 bg-orange-50 rounded-2xl border border-orange-100">
                        <XCircle className="w-6 h-6 text-orange-600 mt-1" />
                        <div>
                            <p className="font-bold text-orange-900">Embrace Constraints</p>
                            <p className="text-sm text-orange-700">Design solutions under strict limits (e.g., 30s onboarding) to sharpen judgment.</p>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* Interview Tips */}
          <section className="bg-zinc-900 text-white p-10 rounded-[2.5rem]">
             <h3 className="text-2xl font-bold mb-6">Ace the Product Sense Interview</h3>
             <p className="text-zinc-400 mb-8 italic">Hiring managers look for clarity, empathy, and reasoning rather than just a "correct" answer.</p>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Frame the problem clearly before jumping to solutions.</span>
                 </li>
                 <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Identify specific user segments and their unique pains.</span>
                 </li>
                 <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Propose solutions with a rationale, explaining the hypothesis.</span>
                 </li>
                 <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Discuss trade-offs—be prepared to answer, "Who suffers if we cut this feature?".</span>
                 </li>
             </ul>
          </section>

          {/* Pitfalls */}
          <section className="p-8 border-2 border-dashed border-red-200 rounded-3xl bg-red-50/30">
             <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" /> Common Pitfalls to Avoid
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                    <p className="font-bold text-zinc-900 mb-1">Over-reliance on "Gut"</p>
                    <p className="text-sm text-zinc-600">Instincts must be tempered by data; ignoring analytics is dangerous unless honed by experience.</p>
                 </div>
                 <div>
                    <p className="font-bold text-zinc-900 mb-1">The Aesthetic Trap</p>
                    <p className="text-sm text-zinc-600">Don't mistake polished UI for good product sense; a beautiful design solving the wrong problem is a failure.</p>
                 </div>
                 <div>
                    <p className="font-bold text-zinc-900 mb-1">Domain Overfitting</p>
                    <p className="text-sm text-zinc-600">Don't assume a playbook from one industry will automatically work in another.</p>
                 </div>
                 <div>
                    <p className="font-bold text-zinc-900 mb-1">Feature Bloat</p>
                    <p className="text-sm text-zinc-600">Weak sense leads to "copying competitors," resulting in a bloated product that fails real problems.</p>
                 </div>
             </div>
          </section>
        </div>
    ),
    assignment: (
      <div className="space-y-6">
          <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> 🎯 Day-4 Mini Assignment
          </h4>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
             <p className="text-zinc-700 font-medium">Read this expert breakdown of Product Sense and apply it to a feature teardown.</p>
             
             <a 
                href="https://www.parallelhq.com/blog/what-product-sense" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-indigo-300 transition-all group"
             >
                <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    <span className="font-bold text-zinc-800">Reading: What is Product Sense? by Robin Dhanwani</span>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 transition-colors" />
             </a>

             <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 space-y-4">
                <p className="text-xs font-bold text-indigo-900 uppercase tracking-widest">Task</p>
                <p className="text-sm text-indigo-800 font-medium">
                    Pick a feature from an app you use daily. Write a 1-page "Product Sense Teardown" identifying: 
                    1) The core user problem 2) The hypothesis behind the design 3) One critical trade-off they made.
                </p>
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
        <div className="space-y-12 text-zinc-800">
          {/* Intro Section */}
          <section className="bg-rose-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><Heart className="w-40 h-40 fill-current" /></div>
             <h3 className="text-3xl font-bold mb-4">User Empathy in Product</h3>
             <p className="text-lg text-rose-100 max-w-2xl leading-relaxed">
                User empathy is the ability to understand and share the feelings, needs, and perspectives of users by <strong>"stepping into their shoes"</strong> to view the product through their eyes. It drives human-centered development.
             </p>
          </section>

          {/* Core Principles */}
          <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-rose-100 rounded-lg text-rose-600"><Zap className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-zinc-900">Core Principles of User Empathy</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { t: "Active Listening", d: "Listen without judgment. Encourage open communication and hear what's NOT being said.", i: Ear, color: "text-blue-500", bg: "bg-blue-50" },
                    { t: "Putting Users First", d: "Prioritize user needs over internal assumptions or ego. Align decisions with their interests.", i: UserPlus, color: "text-rose-500", bg: "bg-rose-50" },
                    { t: "Deep Connection", d: "Grasp challenges, desires, and emotional motivations of your audience, not just tech specs.", i: Smile, color: "text-orange-500", bg: "bg-orange-50" }
                ].map((p, idx) => (
                    <div key={idx} className={`p-8 rounded-3xl border border-transparent hover:border-zinc-200 transition-all ${p.bg}`}>
                        <p.i className={`w-8 h-8 ${p.color} mb-6`} />
                        <h4 className="font-bold text-zinc-900 mb-3">{p.t}</h4>
                        <p className="text-sm text-zinc-600 leading-relaxed font-medium">{p.d}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* Implementation Process */}
          <section className="bg-zinc-50 p-8 md:p-12 rounded-[3rem] border border-zinc-200">
             <h3 className="text-2xl font-bold text-zinc-900 mb-8">Implementation Process for PMs</h3>
             <div className="space-y-12">
                 <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-lg">1</div>
                    <div>
                        <h4 className="text-xl font-bold mb-4">User Research & Personas</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm text-zinc-600 font-medium">
                                <Search className="w-4 h-4 text-indigo-500" /> Research Methods: Interviews, surveys, and usability testing.
                            </li>
                            <li className="flex items-center gap-3 text-sm text-zinc-600 font-medium">
                                <Users className="w-4 h-4 text-indigo-500" /> Personas: Visualize different user groups.
                            </li>
                            <li className="flex items-center gap-3 text-sm text-zinc-600 font-medium">
                                <Map className="w-4 h-4 text-indigo-500" /> Empathy Maps: Map what users think, feel, experience, and do.
                            </li>
                        </ul>
                    </div>
                 </div>

                 <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-lg">2</div>
                    <div>
                        <h4 className="text-xl font-bold mb-4">Design Thinking Integration</h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'].map((step) => (
                                <div key={step} className="px-4 py-2 bg-white rounded-xl border border-zinc-200 text-[10px] font-black uppercase tracking-widest text-center shadow-sm">
                                    {step}
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm text-zinc-500 font-medium leading-relaxed">
                            PMs observe interactions, define pain points, ideate solutions, and test prototypes to refine the experience based on feedback.
                        </p>
                    </div>
                 </div>

                 <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-lg">3</div>
                    <div>
                        <h4 className="text-xl font-bold mb-4">Continuous Feedback Loops</h4>
                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                            Involve users at every stage, not just at the end. Use <strong>User Acceptance Testing (UAT)</strong> and iterative analysis to evolve with changing user preferences.
                        </p>
                    </div>
                 </div>
             </div>
          </section>

          {/* Importance & Success */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 bg-zinc-900 text-white rounded-[2.5rem]">
                 <h3 className="text-xl font-bold mb-6">Key Tools & Frameworks</h3>
                 <div className="space-y-4">
                     {[
                        { t: "User Journey Mapping", d: "Visualizing the path a user takes." },
                        { t: "User Stories", d: "Features from the user's perspective." },
                        { t: "User Flows", d: "Step-by-step task completion." },
                        { t: "User Segments", d: "Categorizing unique group needs." }
                     ].map((item, idx) => (
                        <div key={idx} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                            <Filter className="w-5 h-5 text-indigo-400 mt-0.5" />
                            <div>
                                <p className="font-bold text-sm">{item.t}</p>
                                <p className="text-xs text-zinc-400">{item.d}</p>
                            </div>
                        </div>
                     ))}
                 </div>
             </div>
             <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-zinc-900">Real-World Success</h3>
                <div className="space-y-6">
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <p className="font-bold text-zinc-800 mb-1">Apple</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">Demonstrates empathy through user-friendly interfaces and seamless experiences that create a loyal base.</p>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <p className="font-bold text-zinc-800 mb-1">Airbnb</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">Achieved success by focusing on the traveler's need for unique and personalized experiences.</p>
                    </div>
                </div>
                <div className="mt-8 p-6 bg-indigo-900 text-white rounded-2xl">
                    <p className="text-sm font-bold italic leading-relaxed">"Empathy is a core value that ensures products exceed expectations, not just meet them."</p>
                </div>
             </div>
          </section>
        </div>
    ),
    assignment: (
      <div className="space-y-6">
          <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> 🎯 Day-5 Mini Assignment
          </h4>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
             <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 space-y-4">
                <p className="text-xs font-bold text-indigo-900 uppercase tracking-widest">Task</p>
                <p className="text-sm text-indigo-800 font-medium">
                    Find out <strong>How did Airbnb use user empathy to drive their success?</strong> Look for specific stories about their "early days" and how they handled user problems.
                </p>
             </div>
             
             <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Reflection Questions:</p>
                <ul className="list-disc pl-5 text-xs text-zinc-600 space-y-2">
                    <li>How did they identify the problem travelers faced?</li>
                    <li>What "unscalable" things did the founders do to empathize with hosts?</li>
                    <li>How is that empathy reflected in the current app experience?</li>
                </ul>
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
        <div className="space-y-12 text-zinc-800">
          {/* Learning Objectives */}
          <section className="bg-emerald-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><DollarSign className="w-40 h-40" /></div>
             <h3 className="text-3xl font-bold mb-4 flex items-center gap-3"><Target className="w-8 h-8" /> Learning Objectives</h3>
             <p className="text-lg text-emerald-100 mb-6">By the end of Day 6, you will be able to:</p>
             <ul className="space-y-2 text-emerald-50">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /> Understand and calculate key unit economics metrics (CAC, LTV, payback period)</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /> Identify and analyze different business models and revenue streams</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /> Evaluate product decisions through a business lens</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /> Communicate the business impact of product features</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /> Assess product-market fit using business metrics</li>
             </ul>
          </section>

          {/* Section 1: Importance */}
          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-zinc-900 border-b-2 border-zinc-100 pb-2">Why Business Fundamentals Matter for PMs</h3>
            <p className="text-lg text-zinc-600 leading-relaxed font-medium">Product Managers are often called the <strong>"mini-CEO"</strong> of their product. Here's why business knowledge is critical:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-3xl">
                    <h4 className="font-bold text-zinc-900 mb-6 flex items-center gap-2 text-lg">What Good PMs Do:</h4>
                    <ul className="space-y-4">
                        <li className="flex gap-3 text-zinc-600 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                            Balance user value with business value
                        </li>
                        <li className="flex gap-3 text-zinc-600 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                            Justify investments with ROI calculations
                        </li>
                        <li className="flex gap-3 text-zinc-600 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                            Speak confidently to executives and stakeholders
                        </li>
                        <li className="flex gap-3 text-zinc-600 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                            Understand the full customer lifecycle economics
                        </li>
                    </ul>
                </div>
                <div className="p-8 bg-red-50/50 border border-red-100 rounded-3xl">
                    <h4 className="font-bold text-red-900 mb-6 flex items-center gap-2 text-lg">Common PM Mistakes:</h4>
                    <ul className="space-y-4">
                        <li className="flex gap-3 text-red-700 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                            Building features users love but don't pay for
                        </li>
                        <li className="flex gap-3 text-red-700 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                            Ignoring customer acquisition costs
                        </li>
                        <li className="flex gap-3 text-red-700 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                            Focusing on vanity metrics instead of business metrics
                        </li>
                        <li className="flex gap-3 text-red-700 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                            Making product decisions without considering sustainability
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-zinc-900 p-8 rounded-[2rem] text-white">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2"><Zap className="w-6 h-6 text-yellow-400" /> Real-World Examples</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <p className="font-black text-indigo-400 mb-2">Twitter/X</p>
                        <p className="text-xs text-zinc-400 leading-relaxed">Built incredible engagement but struggled with monetization for a decade. Engagement ≠ Business Success.</p>
                    </div>
                    <div>
                        <p className="font-black text-pink-400 mb-2">Instagram</p>
                        <p className="text-xs text-zinc-400 leading-relaxed">Delayed monetization to focus on growth. Worked because they had Facebook's massive resources.</p>
                    </div>
                    <div>
                        <p className="font-black text-emerald-400 mb-2">Notion</p>
                        <p className="text-xs text-zinc-400 leading-relaxed">Freemium model carefully designed to convert power users. Model aligned perfectly with user behavior.</p>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-indigo-200 font-bold italic">"Every product decision has business implications."</p>
                </div>
            </div>
          </section>

          {/* Section 2: CAC */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><DollarSign className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-zinc-900">Customer Acquisition Cost (CAC)</h3>
            </div>
            <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                <h4 className="text-xl font-bold text-zinc-800 mb-4">What is CAC?</h4>
                <p className="text-zinc-600 mb-8 font-medium leading-relaxed">
                    Customer Acquisition Cost (CAC) is the total cost to acquire one new customer. This includes all marketing, advertising, and sales expenses.
                </p>
                <div className="bg-zinc-900 p-8 rounded-2xl text-center mb-8">
                    <code className="text-indigo-400 text-xl font-bold">CAC = (Total Marketing + Sales Costs) / # New Customers</code>
                </div>
                <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl mb-8">
                    <h5 className="font-bold text-indigo-900 mb-2">Example Calculation</h5>
                    <p className="text-sm text-indigo-800">Scenario: $50,000 marketing spend + 500 new customers = <strong>$100 CAC</strong>.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h5 className="font-bold text-zinc-900 mb-4 uppercase tracking-widest text-xs">Factors that INCREASE CAC</h5>
                        <ul className="space-y-2 text-sm text-zinc-500 font-medium">
                            <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-red-400" /> Competitive markets with high ad costs</li>
                            <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-red-400" /> Complex products requiring education</li>
                            <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-red-400" /> Long sales cycles</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-zinc-900 mb-4 uppercase tracking-widest text-xs">Factors that DECREASE CAC</h5>
                        <ul className="space-y-2 text-sm text-zinc-500 font-medium">
                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-emerald-500" /> Strong word-of-mouth & Product-Led Growth</li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-emerald-500" /> Effective onboarding & Clear value prop</li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-emerald-500" /> Strategic partnerships</li>
                        </ul>
                    </div>
                </div>
            </div>
          </section>

          {/* Section 3: LTV */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg text-pink-600"><TrendingUp className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-zinc-900">Lifetime Value (LTV)</h3>
            </div>
            <div className="bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] text-white">
                <h4 className="text-xl font-bold mb-4">What is LTV?</h4>
                <p className="text-zinc-400 mb-10 font-medium leading-relaxed max-w-2xl">
                    Lifetime Value (LTV) is the total revenue you expect from a customer over their entire relationship with your product.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <p className="text-indigo-400 font-bold mb-2 uppercase tracking-widest text-xs">Method 1: Simple LTV</p>
                        <code className="text-sm">LTV = ARPU × Avg Customer Lifespan</code>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <p className="text-pink-400 font-bold mb-2 uppercase tracking-widest text-xs">Method 2: LTV with Churn</p>
                        <code className="text-sm">LTV = (ARPU × Gross Margin) / Churn Rate</code>
                    </div>
                </div>
                <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl">
                    <h5 className="font-bold text-emerald-400 mb-4 flex items-center gap-2"><Activity className="w-5 h-5" /> The Power of Retention</h5>
                    <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                        Critical Insight: Increasing customer lifespan from 12 to 18 months (50% increase) <strong>directly increases LTV by 50%</strong>, without spending more on marketing! This is why retention features are high-ROI.
                    </p>
                </div>
            </div>
          </section>

          {/* Section 4: Golden Ratio */}
          <section className="bg-indigo-900 text-white p-10 md:p-16 rounded-[3rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
             <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Scale className="w-8 h-8 text-indigo-400" /> The Golden Ratio: LTV:CAC
             </h3>
             <p className="text-indigo-100 text-lg mb-10 max-w-2xl font-medium leading-relaxed">
                This ratio determines if your business model is actually sustainable and efficient at scale.
             </p>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                 <div className="p-8 rounded-3xl bg-red-500/20 border border-red-500/30">
                    <p className="text-3xl font-black mb-2">&lt; 1:1</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-red-200 mb-3">Crisis Mode</p>
                    <p className="text-xs text-red-100/70 leading-relaxed">Losing money. Reduce CAC or increase LTV urgently.</p>
                 </div>
                 <div className="p-8 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 ring-4 ring-emerald-500/20 scale-105">
                    <p className="text-3xl font-black mb-2">3:1 to 5:1</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-3">The Sweet Spot</p>
                    <p className="text-xs text-emerald-100/70 leading-relaxed">Optimal balance. Scalable and healthy business.</p>
                 </div>
                 <div className="p-8 rounded-3xl bg-blue-500/20 border border-blue-500/30">
                    <p className="text-3xl font-black mb-2">&gt; 5:1</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-3">Underinvesting</p>
                    <p className="text-xs text-blue-100/70 leading-relaxed">Too conservative. Competitors might outgrow you.</p>
                 </div>
             </div>
             <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-8 items-center justify-between">
                <div>
                    <h4 className="font-bold text-indigo-300 text-xl mb-2">Payback Period</h4>
                    <p className="text-sm text-indigo-100 opacity-70">Time to recover CAC. Healthy target: &lt; 12 months.</p>
                </div>
                <div className="px-8 py-4 bg-white/10 rounded-full font-mono text-lg border border-white/20">
                    CAC / (ARPU × Gross Margin)
                </div>
             </div>
          </section>

          {/* Section 5: Business Models */}
          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-zinc-900 border-b-2 border-zinc-100 pb-2">Business Models & Revenue Streams</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { t: "Subscription", d: "Recurring fees (Netflix). Focus: Habit-building, retention, MRR growth.", i: RefreshCw },
                    { t: "Freemium", d: "Free base + Paid premium (Slack). Focus: Upgrade triggers, feature gating.", i: Zap },
                    { t: "Marketplace", d: "Commission on transactions (Airbnb). Focus: Supply-demand liquidity, trust.", i: Globe2 },
                    { t: "Advertising", d: "Attention sales (Google). Focus: User engagement, data targeting.", i: MessageSquare },
                    { t: "E-commerce", d: "Direct sales markup (Amazon). Focus: Conversion rate, cart abandonment.", i: ShoppingCart },
                    { t: "Enterprise SaaS", d: "Large B2B contracts (Salesforce). Focus: Org adoption, security, ROI.", i: Building2 },
                    { t: "Usage-Based", d: "Pay as you go (Stripe). Focus: Volume driving, value alignment.", i: CpuIcon }
                ].map((model, idx) => (
                    <div key={idx} className="flex gap-5 p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:border-indigo-200 transition-all hover:shadow-md group">
                        <div className="p-3 bg-zinc-50 rounded-xl group-hover:bg-indigo-50 transition-colors h-fit">
                            <model.i className="w-6 h-6 text-zinc-400 group-hover:text-indigo-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-zinc-900 mb-1">{model.t} Model</h4>
                            <p className="text-sm text-zinc-500 font-medium leading-relaxed">{model.d}</p>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          {/* Hybrid Models & Decision Framework */}
          <section className="p-8 md:p-12 bg-zinc-900 rounded-[3rem] text-white">
             <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Boxes className="w-8 h-8 text-indigo-400" /> Hybrid Strategy</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                 <div className="space-y-3">
                    <h4 className="font-bold text-indigo-400">Spotify</h4>
                    <p className="text-xs text-zinc-400 font-medium leading-relaxed">Freemium (Ads) + Subscription. Free drives adoption, Ads monetize free, Premium is the ultimate experience.</p>
                 </div>
                 <div className="space-y-3">
                    <h4 className="font-bold text-pink-400">LinkedIn</h4>
                    <p className="text-xs text-zinc-400 font-medium leading-relaxed">Freemium + Subscription + Advertising + Enterprise. Massive multi-stream monetization strategy.</p>
                 </div>
                 <div className="space-y-3">
                    <h4 className="font-bold text-emerald-400">Amazon</h4>
                    <p className="text-xs text-zinc-400 font-medium leading-relaxed">E-commerce + Subscription (Prime) + Marketplace + Ads + Usage (AWS). The ultimate hybrid giant.</p>
                 </div>
             </div>
             <div className="pt-8 border-t border-white/10">
                <h4 className="font-bold mb-6 text-xl text-center">How Business Model Affects Your Decisions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div className="space-y-2">
                        <p className="text-indigo-300 font-bold underline">If Subscription:</p>
                        <p className="text-zinc-400 font-medium">Prioritize engagement & retention. Avoid high-friction flows that cause churn. Measure NRR.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-emerald-300 font-bold underline">If Marketplace:</p>
                        <p className="text-zinc-400 font-medium">Prioritize supply growth & liquidity. Avoid changes hurting one side. Measure GMV.</p>
                    </div>
                </div>
             </div>
          </section>
        </div>
    ),
    assignment: (
      <div className="space-y-6">
          <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> 🎯 Day-6 Mini Assignment
          </h4>
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
             <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 space-y-6">
                <p className="text-xs font-bold text-emerald-900 uppercase tracking-widest flex items-center gap-2"><DollarSign className="w-4 h-4" /> Unit Economics Problem</p>
                <div className="space-y-4 text-sm text-emerald-800 font-medium">
                    <p className="text-lg">A SaaS startup has the following monthly metrics:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/40 p-6 rounded-xl border border-emerald-200/50">
                        <ul className="space-y-2">
                            <li>• Ad Spend: <strong>$30,000</strong></li>
                            <li>• Sales Team Costs: <strong>$20,000</strong></li>
                            <li>• New Customers: <strong>250</strong></li>
                        </ul>
                        <ul className="space-y-2">
                            <li>• ARPU: <strong>$40/month</strong></li>
                            <li>• Avg Lifespan: <strong>10 months</strong></li>
                            <li>• Gross Margin: <strong>80%</strong></li>
                        </ul>
                    </div>
                    <div className="pt-6">
                        <p className="font-bold text-emerald-900 text-base mb-4 underline">Calculate:</p>
                        <ol className="space-y-4">
                            <li className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                                <span><strong>CAC</strong> (Total Marketing+Sales / New Customers)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                                <span><strong>LTV</strong> (ARPU × Gross Margin × Lifespan)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                                <span><strong>LTV:CAC Ratio</strong></span>
                            </li>
                        </ol>
                    </div>
                    <div className="mt-8 p-6 bg-white rounded-xl border border-emerald-200">
                        <p className="italic text-emerald-900 font-bold">Reflective Strategy:</p>
                        <p className="text-emerald-700 mt-2">Based on your results, what should the PM prioritize: <strong>Growth</strong> (spend more), <strong>Efficiency</strong> (reduce CAC), or <strong>Retention</strong> (increase lifespan)?</p>
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
    resources: [
        { title: 'Doing User Research', url: 'https://youtu.be/MxwyGi-3dzY', type: 'video' },
        { title: 'Market Research', url: 'https://youtu.be/LoJDAeq6i34', type: 'video' }
    ],
    content: (
        <div className="space-y-12 text-zinc-800">
          {/* Theme Section */}
          <section className="bg-purple-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><MicroscopeIcon className="w-40 h-40" /></div>
             <p className="text-lg text-purple-100 max-w-2xl leading-relaxed italic mb-4">
                “Great products start with deep understanding — of users, their needs, and the market around them.”
             </p>
             <p className="text-purple-200 font-medium">
                Today’s focus is to think like a researcher, not a builder. You’ll learn how to identify who your users are, what they struggle with, and why solving it matters.
             </p>
          </section>

          {/* Learning Objectives */}
          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-zinc-900">
                <Target className="w-6 h-6 text-purple-500" /> Learning Objectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    "Explain the difference between user research and market research",
                    "Identify user pain points using qualitative and quantitative methods",
                    "Apply basic frameworks — Empathy Map, JTBD, and Segmentation",
                    "Use AI tools to accelerate research synthesis"
                ].map((obj, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-purple-900">{obj}</span>
                    </div>
                ))}
            </div>
          </section>

          {/* Section 1: User vs Market */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900">1. User Research vs Market Research</h3>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-50 border-b border-zinc-200">
                        <tr>
                            <th className="p-4 font-bold text-zinc-700 text-sm">Aspect</th>
                            <th className="p-4 font-bold text-zinc-700 text-sm">User Research</th>
                            <th className="p-4 font-bold text-zinc-700 text-sm">Market Research</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-zinc-100">
                            <td className="p-4 font-bold text-zinc-800 bg-zinc-50/50">Focus</td>
                            <td className="p-4 text-zinc-600 italic">Individual behaviors & pain points</td>
                            <td className="p-4 text-zinc-600 italic">Industry, competitors, trends</td>
                        </tr>
                        <tr className="border-b border-zinc-100">
                            <td className="p-4 font-bold text-zinc-800 bg-zinc-50/50">Goal</td>
                            <td className="p-4 font-bold text-indigo-600">Validate Problem</td>
                            <td className="p-4 font-bold text-emerald-600">Validate Opportunity</td>
                        </tr>
                        <tr className="border-b border-zinc-100">
                            <td className="p-4 font-bold text-zinc-800 bg-zinc-50/50">Methods</td>
                            <td className="p-4 text-zinc-600">Interviews, surveys, usability tests</td>
                            <td className="p-4 text-zinc-600">Desk research, benchmarking</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold text-zinc-800 bg-zinc-50/50">Output</td>
                            <td className="p-4 text-zinc-600 font-medium">Personas, Journey Maps</td>
                            <td className="p-4 text-zinc-600 font-medium">TAM/SAM/SOM, SWOT</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl">
                <p className="text-sm text-amber-900 font-bold flex items-center gap-2">
                    <Brain className="w-4 h-4" /> PM Tip: Always start with user research before market research. If users don’t want it, market data doesn’t matter.
                </p>
            </div>
          </section>

          {/* Section 2: Process */}
          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-zinc-900">2. The Research Process</h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {[
                    { s: "1", t: "Define Objective", d: "“What do I want to learn?”" },
                    { s: "2", t: "Choose Method", d: "Interviews, surveys, or secondary." },
                    { s: "3", t: "Recruit Users", d: "Identify your target segments." },
                    { s: "4", t: "Collect Data", d: "Ask open-ended questions." },
                    { s: "5", t: "Synthesize", d: "Identify themes and insights." }
                ].map((step, idx) => (
                    <div key={idx} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 text-center flex flex-col items-center">
                        <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs mb-4 shadow-md shadow-purple-200">{step.s}</span>
                        <h4 className="font-bold text-zinc-900 text-sm mb-2 leading-tight">{step.t}</h4>
                        <p className="text-[11px] text-zinc-500 font-medium">{step.d}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* Section 3: Frameworks */}
          <section className="space-y-12">
            <h3 className="text-2xl font-bold text-zinc-900">3. Research Frameworks</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Empathy Map */}
                <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Ear className="w-24 h-24" /></div>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2"><Brain className="w-5 h-5 text-indigo-500" /> Empathy Map</h4>
                    <p className="text-sm text-zinc-500 mb-6 font-medium">Map out what users: <strong>Says, Does, Thinks, and Feels.</strong></p>
                    <div className="grid grid-cols-2 gap-2">
                        {['SAYS', 'DOES', 'THINKS', 'FEELS'].map(m => (
                            <div key={m} className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 text-center font-black text-[10px] tracking-widest text-zinc-400 group-hover:text-indigo-400 transition-colors">{m}</div>
                        ))}
                    </div>
                </div>

                {/* JTBD */}
                <div className="bg-indigo-900 p-8 rounded-3xl text-white shadow-xl">
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-400" /> Jobs To Be Done (JTBD)</h4>
                    <p className="text-sm text-indigo-200 mb-6 font-medium">“People don’t buy products; they hire them to get a job done.”</p>
                    <div className="bg-white/10 p-5 rounded-xl border border-white/10 italic text-sm space-y-3">
                        <p><span className="text-indigo-300 font-bold">When I...</span> (situation)</p>
                        <p><span className="text-indigo-300 font-bold">I want to...</span> (motivation)</p>
                        <p><span className="text-indigo-300 font-bold">So I can...</span> (desired outcome)</p>
                    </div>
                    <p className="mt-6 text-[11px] text-indigo-300 font-bold">Example: hiring Duolingo to feel productive while waiting.</p>
                </div>
            </div>

            {/* Segmentation */}
            <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-200">
                <h4 className="text-xl font-bold mb-8 text-zinc-900 flex items-center gap-2"><Filter className="w-5 h-5 text-purple-600" /> Segmentation Strategies</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { t: 'Demographics', d: 'Age, gender, location, income.' },
                        { t: 'Psychographics', d: 'Motivations, lifestyle, values.' },
                        { t: 'Behavior', d: 'Usage freq, loyalty, spending.' },
                        { t: 'Needs-Based', d: 'Specific pain points & goals.' }
                    ].map((seg, i) => (
                        <div key={i} className="space-y-2">
                            <p className="font-bold text-zinc-900 text-sm">{seg.t}</p>
                            <p className="text-xs text-zinc-500 font-medium leading-relaxed">{seg.d}</p>
                        </div>
                    ))}
                </div>
            </div>
          </section>

          {/* Section 4: Market Basics */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900">4. Market Research Basics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white border border-zinc-200 rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Trends</p>
                    <p className="text-sm font-bold text-zinc-700">Monitor space evolution using Google Trends or Statista.</p>
                </div>
                <div className="p-6 bg-white border border-zinc-200 rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Competition</p>
                    <p className="text-sm font-bold text-zinc-700">Scan landscape using Perplexity AI or Crunchbase.</p>
                </div>
                <div className="p-6 bg-white border border-zinc-200 rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Sizing</p>
                    <p className="text-sm font-bold text-zinc-700 italic">TAM → SAM → SOM</p>
                </div>
            </div>
          </section>

          {/* Section 5: Tools */}
          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-zinc-900 flex items-center gap-3"><Wrench className="w-6 h-6 text-indigo-500" /> Tools & AI Assistants</h3>
            <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white">
                {[
                    { p: 'Interview Prep', t: 'ChatGPT', d: '“Generate 10 questions for student productivity challenges.”' },
                    { p: 'Competitor Scan', t: 'Perplexity AI', d: 'Real-time deep competitive analysis and market data.' },
                    { p: 'Synthesis', t: 'Notion AI', d: 'Summarize key pain points from long interview transcripts.' },
                    { p: 'Visualization', t: 'Canva', d: 'Create visually compelling user personas.' }
                ].map((tool, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-5 border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-colors">
                        <div className="mb-2 md:mb-0">
                            <span className="text-[10px] font-black uppercase tracking-tight text-indigo-400 block">{tool.p}</span>
                            <span className="font-bold text-zinc-800">{tool.t}</span>
                        </div>
                        <p className="text-xs text-zinc-500 font-medium md:max-w-sm italic">"{tool.d}"</p>
                    </div>
                ))}
            </div>
          </section>

          {/* Section 6: Example */}
          <section className="bg-zinc-900 p-10 rounded-[3rem] text-white">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center"><Rocket className="w-6 h-6 text-zinc-900" /></div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Real-World Case</p>
                    <h4 className="text-2xl font-bold">Zomato: One-Tap Convenience</h4>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Pain Point</p>
                    <p className="text-sm font-medium">“Hungry but don't want to call restaurants or search again.”</p>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Method</p>
                    <p className="text-sm font-medium">Surveys & Usage Data Analysis</p>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Insight</p>
                    <p className="text-sm font-medium">Users repeat specific orders 60% of the time.</p>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Outcome</p>
                    <p className="text-sm font-bold text-emerald-400">1-Tap Reordering feature launched → Orders ↑ 22%</p>
                </div>
            </div>
          </section>

          {/* Section 7: Activity */}
          <section className="p-8 border-2 border-dashed border-indigo-200 rounded-3xl bg-indigo-50/30">
            <h4 className="text-xl font-bold text-indigo-900 mb-6 flex items-center gap-2"><Bot className="w-6 h-6" /> Day-7 Research Drill</h4>
            <div className="space-y-4">
                <p className="text-sm text-indigo-800 font-medium">1. Use ChatGPT to generate 5 open-ended interview questions for your idea.</p>
                <p className="text-sm text-indigo-800 font-medium">2. Document these in your workspace and highlight the top 3 themes you expect to uncover.</p>
                <p className="text-sm text-indigo-800 font-medium italic">Reflect: “What might surprise you about how real users respond vs your assumptions?”</p>
            </div>
          </section>
        </div>
    ),
    assignment: (
      <div className="space-y-6">
          <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> 🎯 Day-7 Comprehensive Assignment
          </h4>
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
             <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100 space-y-6">
                <p className="text-xs font-bold text-purple-900 uppercase tracking-widest flex items-center gap-2"><ListChecks className="w-4 h-4" /> Research Task List</p>
                <div className="space-y-4 text-sm text-purple-800 font-medium">
                    <ol className="space-y-6">
                        <li className="flex gap-4">
                            <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                            <div>
                                <p className="font-bold">Define Target Segment</p>
                                <p className="text-xs text-purple-600 mt-1">Identify exactly who you are solving for using demographics and psychographics.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                            <div>
                                <p className="font-bold">Pain Point vs. Outcome Table</p>
                                <p className="text-xs text-purple-600 mt-1">Create a 2x2 table mapping current struggles to desired future states.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                            <div>
                                <p className="font-bold">Competitor Scan</p>
                                <p className="text-xs text-purple-600 mt-1">Use Perplexity AI to find 3 direct or indirect competitors.</p>
                            </div>
                        </li>
                    </ol>
                    
                    <div className="mt-8 pt-8 border-t border-purple-200">
                        <p className="font-black text-[10px] uppercase tracking-widest text-purple-400 mb-4">Final Deliverable (One-Slide Summary)</p>
                        <div className="grid grid-cols-1 gap-2 bg-white/50 p-6 rounded-xl text-purple-900">
                            <p>• <strong>The User:</strong> [Who are they?]</p>
                            <p>• <strong>The Problem:</strong> [What is their core struggle?]</p>
                            <p>• <strong>The Market:</strong> [Why does this matter right now?]</p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-purple-600 text-xs font-bold">
                        <FileText className="w-4 h-4" /> Deliverable: 🗂 User & Market Research Report (Notion / Google Docs)
                    </div>
                </div>
             </div>
             <p className="text-center text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">Outcome: Readiness for Day 8 User Interviews</p>
          </div>
      </div>
    )
  },
  {
    day: 8,
    title: 'User Interviews & Surveys 🎙️',
    category: 'Research',
    preview: '“If you listen carefully, your users will write your roadmap for you.” Master structured feedback and real validation.',
    resources: [
        { title: 'How To Conduct User Interviews Like A Pro', url: 'https://youtu.be/5tVbFfGDQCk', type: 'video' }
    ],
    content: (
        <div className="space-y-12 text-zinc-800">
          {/* Header */}
          <section className="bg-indigo-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><MessageCircle className="w-40 h-40" /></div>
             <p className="text-lg text-indigo-100 max-w-2xl leading-relaxed italic mb-4">
                “If you listen carefully, your users will write your roadmap for you.”
             </p>
             <p className="text-indigo-200 font-medium">
                Yesterday we explored target segments. Today we learn how to validate insights through real conversations and structured feedback.
             </p>
          </section>

          {/* Objectives */}
          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-zinc-900">
                <Target className="w-6 h-6 text-indigo-500" /> Learning Objectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    "Conduct structured discovery interviews",
                    "Design clear & unbiased surveys",
                    "Identify recurring pain themes",
                    "Synthesize insights using AI tools"
                ].map((obj, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                        <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-indigo-900">{obj}</span>
                    </div>
                ))}
            </div>
          </section>

          {/* Section 1: Why interviews */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900">1. Why User Interviews Matter</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { t: "Deep 'Why'", d: "Understand user motivation beyond what behavioral data shows." },
                    { t: "Assumptions", d: "Validate high-risk assumptions early before spending engineering resources." },
                    { t: "Unspoken Needs", d: "Discover emotional triggers and pain points users didn't mention." },
                    { t: "Empathy", d: "Build genuine intuition for the user's daily life and environment." }
                ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm">
                        <Zap className="w-6 h-6 text-amber-500 shrink-0" />
                        <div>
                            <p className="font-bold text-zinc-900">{item.t}</p>
                            <p className="text-xs text-zinc-500 leading-relaxed font-medium">{item.d}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-zinc-900 p-6 rounded-3xl text-white">
                <p className="text-xs font-bold text-indigo-400 uppercase mb-2">Example: Insight to Feature</p>
                <p className="text-sm font-medium italic">"I want to feel progress even if I study for 5 minutes."</p>
                <p className="text-sm text-zinc-400 mt-2">→ Inspired Duolingo's Streak system, now a core retention driver.</p>
            </div>
          </section>

          {/* Section 2: Questions */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900">2. Types of Interview Questions</h3>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-50">
                        <tr>
                            <th className="p-4 text-xs font-bold text-zinc-400 uppercase">Type</th>
                            <th className="p-4 text-xs font-bold text-zinc-400 uppercase">Example</th>
                            <th className="p-4 text-xs font-bold text-zinc-400 uppercase">Purpose</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-zinc-100">
                            <td className="p-4 font-bold">Behavioral (Past)</td>
                            <td className="p-4 text-zinc-600">“Tell me about the last time you ordered food.”</td>
                            <td className="p-4 font-medium text-indigo-600">Habit Analysis</td>
                        </tr>
                        <tr className="border-b border-zinc-100">
                            <td className="p-4 font-bold">Attitudinal (Feelings)</td>
                            <td className="p-4 text-zinc-600">“What frustrates you most about your current apps?”</td>
                            <td className="p-4 font-medium text-pink-600">Pain Discovery</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold">Aspirational (Future)</td>
                            <td className="p-4 text-zinc-600">“What would make your experience 10x better?”</td>
                            <td className="p-4 font-medium text-emerald-600">Ideation</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl">
                <p className="text-sm text-rose-900 font-bold">🧠 Golden Rule: No leading questions. Don't ask "Wouldn't it be better if...?" Ask "How do you feel about...?"</p>
            </div>
          </section>

          {/* Section 3: Structure */}
          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-zinc-900">3. Interview Structure (15–20 min)</h3>
            <div className="relative pl-8 space-y-8 border-l-2 border-zinc-100 ml-4">
                {[
                    { s: "Intro", g: "Make the user comfortable.", d: "Explain purpose, emphasize there are no wrong answers." },
                    { s: "Context", g: "Understand background.", d: "Ask about their current tools, role, and daily routine." },
                    { s: "Core Questions", g: "Explore behaviors & pain.", d: "Deep dive into the specific problem area you're solving." },
                    { s: "Wrap Up", g: "Final insights & referrals.", d: "Ask if they have anything to add or know someone else to talk to." }
                ].map((step, idx) => (
                    <div key={idx} className="relative">
                        <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm"></div>
                        <h4 className="font-bold text-zinc-900 text-lg">{step.s}</h4>
                        <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-1">{step.g}</p>
                        <p className="text-sm text-zinc-500 font-medium">{step.d}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* Section 4 & 5: AI & Surveys */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-200">
                 <h4 className="text-xl font-bold mb-6 flex items-center gap-2"><Bot className="w-5 h-5 text-indigo-500" /> AI Accelerator</h4>
                 <div className="space-y-4">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Synthesis Prompt</p>
                    <div className="bg-white p-4 rounded-xl border border-zinc-100 italic text-xs text-zinc-600 leading-relaxed shadow-sm">
                        "Summarize these interview transcripts into 3 distinct pain points and 3 desired outcomes."
                    </div>
                 </div>
             </div>
             <div className="p-8 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm">
                 <h4 className="text-xl font-bold mb-6 flex items-center gap-2"><Clipboard className="w-5 h-5 text-emerald-500" /> Survey Principles</h4>
                 <ul className="space-y-3">
                     <li className="flex items-center gap-2 text-xs font-bold text-zinc-600"><CheckCircle className="w-4 h-4 text-emerald-500" /> Ask one thing per question</li>
                     <li className="flex items-center gap-2 text-xs font-bold text-zinc-600"><CheckCircle className="w-4 h-4 text-emerald-500" /> Avoid biased wording</li>
                     <li className="flex items-center gap-2 text-xs font-bold text-zinc-600"><CheckCircle className="w-4 h-4 text-emerald-500" /> Mix question types (MCQ + scale)</li>
                     <li className="flex items-center gap-2 text-xs font-bold text-zinc-600"><CheckCircle className="w-4 h-4 text-emerald-500" /> Keep it under 10 questions</li>
                 </ul>
             </div>
          </section>

          {/* Section 6: Synthesizing Insights */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900">4. Synthesizing Insights</h3>
            <p className="text-zinc-600 font-medium">After 5–10 interviews, group similar issues into actionable themes.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <Quote className="w-6 h-6 text-indigo-400 mb-3" />
                    <p className="text-sm font-bold text-indigo-900 leading-relaxed italic">"I forget my fitness goals midweek."</p>
                    <div className="mt-4 pt-4 border-t border-indigo-200">
                        <p className="text-[10px] font-black uppercase text-indigo-400">The Pain</p>
                        <p className="text-xs font-bold">Motivation Drop</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-6">
                    <ArrowRight className="w-8 h-8 text-zinc-300" />
                </div>
                <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white">
                    <Sparkles className="w-6 h-6 text-yellow-400 mb-3" />
                    <p className="text-[10px] font-black uppercase text-zinc-500">Feature Opportunity</p>
                    <p className="text-sm font-bold mt-2">AI Reminder Coach</p>
                    <p className="text-xs text-zinc-400 mt-2">Contextual nudges based on historical low-activity days.</p>
                </div>
            </div>
          </section>
        </div>
    ),
    assignment: (
      <div className="space-y-6">
          <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> 🎯 Day-8: User Insights Report
          </h4>
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
             <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 space-y-6">
                <p className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2"><FileText className="w-4 h-4" /> 1-Page Deliverable</p>
                <div className="space-y-4 text-sm text-indigo-800 font-medium">
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            <span>Top 3 Pain Points (with supporting user quotes)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            <span>Top 3 Desired Outcomes (what users want to achieve)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            <span><strong>One Opportunity Statement:</strong> How might we solve for X?</span>
                        </li>
                    </ul>
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-xl border border-indigo-200">
                            <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">Evaluation</p>
                            <p className="text-xs font-bold">Great: 3 strong actionable themes supported by data.</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-indigo-200">
                            <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">Deadline</p>
                            <p className="text-xs font-bold">End of Day 10</p>
                        </div>
                    </div>
                </div>
             </div>
          </div>
      </div>
    )
  },
  {
    day: 9,
    title: 'User Personas & Jobs To Be Done (JTBD) 👥',
    category: 'Research',
    preview: '“You don’t design for everyone — you design for someone.” Convert raw feedback into structured user profiles.',
    resources: [
        { title: 'Jobs to be Done', url: 'https://youtu.be/dbVN6EYql6k', type: 'video' },
        { title: 'Creating Personas', url: 'https://youtu.be/u44pBnAn7cM', type: 'video' }
    ],
    content: (
        <div className="space-y-12 text-zinc-800">
          {/* Header */}
          <section className="bg-indigo-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><UserCircle2 className="w-40 h-40" /></div>
             <h3 className="text-3xl font-bold mb-4">Turning Data into Insights</h3>
             <p className="text-lg text-indigo-100 max-w-2xl leading-relaxed italic mb-4">
                “You don’t design for everyone — you design for someone.”
             </p>
             <p className="text-indigo-200 font-medium">
                Yesterday we captured raw feedback via interviews & surveys. Today we turn that data into structured, usable insights.
             </p>
          </section>

          {/* Objectives */}
          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-zinc-900">
                <Target className="w-6 h-6 text-indigo-500" /> Learning Objectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    "Build realistic user personas based on real data",
                    "Write JTBD statements that reflect true motivations",
                    "Use personas to guide feature & UX decisions",
                    "Apply AI tools to accelerate synthesis"
                ].map((obj, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                        <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-indigo-900">{obj}</span>
                    </div>
                ))}
            </div>
          </section>

          {/* Section 1: Research to Personas */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900">1. From Research → Insights → Personas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { t: "Clustering", d: "Group similar behaviors and motivations from Day-8 transcripts." },
                    { t: "Identification", d: "Find recurring pain points and primary goals across clusters." },
                    { t: "Narrative", d: "Write a short, human-centric story for each segment." }
                ].map((item, i) => (
                    <div key={i} className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
                        <p className="font-black text-[10px] uppercase tracking-widest text-indigo-400 mb-2">Step {i+1}</p>
                        <h4 className="font-bold text-zinc-800 mb-1">{item.t}</h4>
                        <p className="text-xs text-zinc-500 font-medium leading-relaxed">{item.d}</p>
                    </div>
                ))}
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white mt-8 shadow-sm">
                <div className="p-4 bg-zinc-50 border-b border-zinc-200">
                    <p className="text-xs font-bold text-zinc-500 uppercase">Example: Mapping Themes to Personas</p>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-50/50">
                        <tr>
                            <th className="p-4 text-xs font-bold text-zinc-400">User Quote</th>
                            <th className="p-4 text-xs font-bold text-zinc-400">Persona Name</th>
                            <th className="p-4 text-xs font-bold text-zinc-400">Core Insight</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-zinc-50">
                            <td className="p-4 italic text-zinc-600">“I start strong but can’t stay consistent.”</td>
                            <td className="p-4 font-bold text-zinc-800">Motivated Starter</td>
                            <td className="p-4 text-zinc-500 font-medium">Needs daily accountability loops</td>
                        </tr>
                        <tr>
                            <td className="p-4 italic text-zinc-600">“I want data to track my progress.”</td>
                            <td className="p-4 font-bold text-zinc-800">Data-Driven Achiever</td>
                            <td className="p-4 text-zinc-500 font-medium">Needs detailed progress visualizations</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
                <p className="text-sm text-blue-900 font-bold italic">🧠 Best Practice: 2–3 meaningful personas are better than 8–10 generic ones.</p>
            </div>
          </section>

          {/* Section 2: Persona Template */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900">2. Persona Template</h3>
            <div className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5"><Quote className="w-32 h-32" /></div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
                        <div className="w-32 h-32 rounded-3xl bg-indigo-100 flex items-center justify-center">
                            <UserCircle2 className="w-16 h-16 text-indigo-400" />
                        </div>
                        <div>
                            <h4 className="font-black text-xl text-zinc-800">Rahul Sharma, 27</h4>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Software Engineer</p>
                        </div>
                        <div className="p-4 bg-indigo-50/50 rounded-2xl italic text-xs text-indigo-700 font-medium">
                            “I need a coach who reminds me daily.”
                        </div>
                    </div>
                    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">Bio</p>
                            <p className="text-xs text-zinc-600 font-medium leading-relaxed">Works long hours; highly motivated to stay fit but misses consistency due to exhaustion.</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">Goals</p>
                            <p className="text-xs text-zinc-600 font-medium leading-relaxed">Build a long-term habit and see measurable physical results.</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">Frustrations</p>
                            <p className="text-xs text-zinc-600 font-medium leading-relaxed">Lack of personalized accountability; generalized tools don't adapt to his schedule.</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">Tech Comfort</p>
                            <p className="text-xs text-zinc-600 font-medium leading-relaxed">High. Owns a Garmin smartwatch and uses multiple trackers.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl">
                <p className="text-sm text-amber-900 font-bold">📍 Tip: Add emotion — Personas should feel human, not just like data points.</p>
            </div>
          </section>

          {/* Section 3: JTBD */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900">3. Jobs To Be Done (JTBD) Framework</h3>
            <p className="text-lg text-zinc-600 font-medium leading-relaxed">
                Users don’t buy products. They <strong>hire them</strong> to get a job done.
            </p>
            <div className="bg-zinc-900 p-8 rounded-3xl text-white">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6">The Template</p>
                <div className="text-2xl md:text-3xl font-black tracking-tighter leading-tight space-y-4">
                    <p className="opacity-50">When I <span className="text-white border-b-2 border-indigo-500 px-2">situation</span>,</p>
                    <p className="opacity-50">I want to <span className="text-white border-b-2 border-pink-500 px-2">motivation</span>,</p>
                    <p className="opacity-50 text-indigo-400">So I can <span className="text-indigo-400 border-b-2 border-indigo-400 px-2">desired outcome</span>.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {[
                    { p: "Duolingo", j: "When I have free time, I want quick practice, so I feel productive." },
                    { p: "Notion", j: "When I start a project, I want everything in one place, so I stay organized." },
                    { p: "Swiggy", j: "When I’m tired, I want fast ordering, so I can relax without effort." }
                ].map((ex, i) => (
                    <div key={i} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 h-full flex flex-col">
                        <span className="font-black text-[10px] text-zinc-400 uppercase mb-3">{ex.p}</span>
                        <p className="text-sm text-zinc-700 font-bold leading-relaxed">{ex.j}</p>
                    </div>
                ))}
            </div>
          </section>

          {/* Section 4: Connecting the Dots */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900">4. Connecting Personas → JTBD → Features</h3>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-50">
                        <tr>
                            <th className="p-4 text-xs font-black uppercase text-zinc-400">Persona</th>
                            <th className="p-4 text-xs font-black uppercase text-zinc-400">Job To Be Done</th>
                            <th className="p-4 text-xs font-black uppercase text-zinc-400">Feature Idea</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-zinc-50">
                            <td className="p-4 font-bold">Motivated Starter</td>
                            <td className="p-4 text-zinc-600">Stay consistent even when busy</td>
                            <td className="p-4 font-bold text-indigo-600">AI habit reminders + streaks</td>
                        </tr>
                        <tr className="border-b border-zinc-50">
                            <td className="p-4 font-bold">Data Achiever</td>
                            <td className="p-4 text-zinc-600">Track measurable progress</td>
                            <td className="p-4 font-bold text-pink-600">Analytics dashboard</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold">Social Sharer</td>
                            <td className="p-4 text-zinc-600">Celebrate success publicly</td>
                            <td className="p-4 font-bold text-emerald-600">Leaderboards & badges</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>

          {/* Section 5: AI & Spotify Example */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-200">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2"><Sparkle className="w-5 h-5 text-indigo-500" /> AI Accelerator</h4>
                <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Prompt Idea</p>
                    <p className="text-xs text-zinc-600 italic leading-relaxed">
                        “You are a Product Manager summarizing 10 interview transcripts about study habits. Group user patterns into 2-3 personas and write JTBD statements for each.”
                    </p>
                    <div className="pt-4 border-t border-zinc-50 flex items-center gap-4">
                        <span className="px-3 py-1 bg-zinc-900 text-white rounded-lg font-bold text-[10px]">ChatGPT</span>
                        <span className="px-3 py-1 bg-zinc-900 text-white rounded-lg font-bold text-[10px]">Notion AI</span>
                    </div>
                </div>
             </div>
             <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-400"><Rocket className="w-5 h-5" /> Spotify Case Study</h4>
                <div className="space-y-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                        <p className="font-bold text-sm text-indigo-300">Persona: Music Explorer</p>
                        <p className="text-[11px] text-zinc-400 mt-1">JTBD: “Give me music for my mood instantly”</p>
                        <p className="text-xs font-bold text-emerald-400 mt-2">Feature: Discover Weekly</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                        <p className="font-bold text-sm text-indigo-300">Persona: Loyal Listener</p>
                        <p className="text-[11px] text-zinc-400 mt-1">JTBD: “Save songs automatically for later”</p>
                        <p className="text-xs font-bold text-emerald-400 mt-2">Feature: Liked Songs Library</p>
                    </div>
                </div>
             </div>
          </section>
        </div>
    ),
    assignment: (
      <div className="space-y-6">
          <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> 🎯 Day-9: Persona & JTBD Deck
          </h4>
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
             <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 space-y-6">
                <p className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2">
                    <ListChecks className="w-4 h-4" /> Final Deliverables
                </p>
                <div className="space-y-4 text-sm text-indigo-800 font-medium">
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                            <span><strong>2 Personas:</strong> Name, Bio, Goals, Pains, Behavior, Quote.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                            <span><strong>JTBD Statements:</strong> 1 clear statement per persona.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                            <span><strong>1 Feature Suggestion:</strong> Clearly aligned to the "Job".</span>
                        </li>
                    </ul>
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-xl border border-indigo-200">
                            <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">Format</p>
                            <p className="text-xs font-bold">Canva / Slides / Notion</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-indigo-200">
                            <p className="text-[10px] font-black text-zinc-400 uppercase mb-1">Submission</p>
                            <p className="text-xs font-bold">End of Day 11</p>
                        </div>
                    </div>
                </div>
             </div>
             <div className="p-6 bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200 text-center">
                <p className="text-zinc-500 text-sm font-bold">👉 Tip: Use Canva’s Persona Templates to make your deck professional!</p>
             </div>
          </div>
      </div>
    )
  },
  {
    day: 10,
    title: 'Competitive & Market Analysis 🧭',
    category: 'Strategy',
    preview: '“You can’t build a better product until you understand what already exists.” Master SWOT and feature benchmarking.',
    resources: [
        { title: 'Competitive Analysis for Product Managers', url: 'https://youtu.be/UnBL8h8TVX8', type: 'video' }
    ],
    content: (
        <div className="space-y-12 text-zinc-800">
          {/* Header */}
          <section className="bg-indigo-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10"><SplitSquareVertical className="w-40 h-40" /></div>
             <h3 className="text-3xl font-bold mb-4 italic tracking-tight leading-tight">“You can’t build a better product until you understand what already exists.”</h3>
             <p className="text-lg text-indigo-200 max-w-2xl leading-relaxed font-medium">
                Today’s goal is to position your idea intelligently. Learn to identify market gaps — not by copying, but by identifying where competitors fall short.
             </p>
          </section>

          {/* Objectives */}
          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-zinc-900 tracking-tight">
                <Target className="w-6 h-6 text-indigo-500" /> Learning Objectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    "Conduct structured competitive benchmarking",
                    "Perform SWOT analysis for 2–3 competitors",
                    "Identify feature gaps and differentiators",
                    "Define your product's unique positioning statement"
                ].map((obj, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                        <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-indigo-900 tracking-tight">{obj}</span>
                    </div>
                ))}
            </div>
          </section>

          {/* Section 1: Types of Competitors */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">1. Mapping the Landscape</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { t: "Direct Competitors", d: "Same product, same target audience.", ex: "Habitica vs Streaks" },
                    { t: "Indirect Competitors", d: "Solve the same need differently.", ex: "Google Tasks vs Notion" },
                    { t: "Aspirational", d: "Inspire UX or growth strategies.", ex: "Headspace for UI vibes" }
                ].map((item, i) => (
                    <div key={i} className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:border-indigo-200 transition-colors">
                        <h4 className="font-bold text-zinc-800 mb-1 tracking-tight">{item.t}</h4>
                        <p className="text-xs text-zinc-500 font-medium mb-4 leading-relaxed">{item.d}</p>
                        <div className="p-2 bg-zinc-50 rounded-lg text-[10px] font-black uppercase text-indigo-600 text-center tracking-widest">{item.ex}</div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl">
                <p className="text-sm text-purple-900 font-bold">🧩 AI Hack: Ask Perplexity AI "List top 10 apps competing with [idea], include audience and unique features."</p>
            </div>
          </section>

          {/* Section 2: SWOT Framework */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">2. Framework 1: SWOT Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-green-50 border border-green-100 rounded-2xl">
                    <p className="text-xs font-black uppercase text-green-600 mb-2 tracking-widest">Strengths</p>
                    <p className="text-sm font-bold text-zinc-800">What do they do well?</p>
                    <p className="text-[11px] text-zinc-500 mt-1 italic">Example: "Beautiful UI, gamified loop"</p>
                </div>
                <div className="p-6 bg-red-50 border border-red-100 rounded-2xl">
                    <p className="text-xs font-black uppercase text-red-600 mb-2 tracking-widest">Weaknesses</p>
                    <p className="text-sm font-bold text-zinc-800">Where do they fall short?</p>
                    <p className="text-[11px] text-zinc-500 mt-1 italic">Example: "Limited AI personalization"</p>
                </div>
                <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                    <p className="text-xs font-black uppercase text-blue-600 mb-2 tracking-widest">Opportunities</p>
                    <p className="text-sm font-bold text-zinc-800">What can we do better?</p>
                    <p className="text-[11px] text-zinc-500 mt-1 italic">Example: "Add AI coach habit nudges"</p>
                </div>
                <div className="p-6 bg-orange-50 border border-orange-100 rounded-2xl">
                    <p className="text-xs font-black uppercase text-orange-600 mb-2 tracking-widest">Threats</p>
                    <p className="text-sm font-bold text-zinc-800">What could hurt us?</p>
                    <p className="text-[11px] text-zinc-500 mt-1 italic">Example: "Big tech (Apple) entry"</p>
                </div>
            </div>
          </section>

          {/* Section 3: Feature Matrix */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">3. Framework 2: Feature Comparison Matrix</h3>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-50">
                        <tr>
                            <th className="p-4 text-xs font-black uppercase text-zinc-400">Feature</th>
                            <th className="p-4 text-xs font-black uppercase text-indigo-600">Us</th>
                            <th className="p-4 text-xs font-black uppercase text-zinc-400">Comp A</th>
                            <th className="p-4 text-xs font-black uppercase text-zinc-400">Comp B</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-zinc-50">
                            <td className="p-4 font-bold">Personalized Dashboard</td>
                            <td className="p-4">✅</td><td className="p-4">❌</td><td className="p-4">✅</td>
                        </tr>
                        <tr className="border-b border-zinc-50">
                            <td className="p-4 font-bold">AI Habit Coach</td>
                            <td className="p-4">✅</td><td className="p-4">❌</td><td className="p-4">❌</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-bold">Gamified Streaks</td>
                            <td className="p-4">✅</td><td className="p-4">✅</td><td className="p-4">✅</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="text-center text-xs text-zinc-400 font-bold italic">🧠 Insight: Discover what is "table-stakes" vs "differentiating".</p>
          </section>

          {/* Section 4: AI & Real Example */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-300" /> AI Prompts for Strategy</h4>
                <div className="space-y-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-xs leading-relaxed italic text-zinc-400">
                        "Create a SWOT analysis for Fitbit and identify two strategic gaps a new product could exploit."
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-xs leading-relaxed italic text-zinc-400">
                        "Summarize the top 5 AI habit tracking apps in 2025, their core features, and pricing."
                    </div>
                </div>
             </div>
             <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm">
                <h4 className="text-xl font-bold mb-4 text-zinc-800">Zerodha vs Groww</h4>
                <div className="space-y-4">
                    <p className="text-xs text-zinc-500 font-medium">Zerodha Strength: <span className="text-zinc-800 font-bold">Advanced tools for Traders.</span></p>
                    <p className="text-xs text-zinc-500 font-medium">Groww Strength: <span className="text-zinc-800 font-bold">UI simplicity for First-timers.</span></p>
                    <p className="text-xs font-bold text-indigo-600 bg-indigo-50 p-3 rounded-xl border border-indigo-100 italic">
                        Design simplicity was the differentiator Groww used to disrupt a market of "complex dashboards."
                    </p>
                </div>
             </div>
          </section>
        </div>
    ),
    assignment: (
      <div className="space-y-6">
          <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> 🎯 Day-10: Competitive Report
          </h4>
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
             <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 space-y-6">
                <p className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2"><FileText className="w-4 h-4" /> Final Deliverables (2–3 slides)</p>
                <div className="space-y-4 text-sm text-indigo-800 font-medium">
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                            <span><strong>2 SWOT Analyses:</strong> Competitor A & B.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                            <span><strong>Feature Comparison Matrix:</strong> Us vs others.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                            <span><strong>Positioning Statement:</strong> “Unlike X and Y, our product [does what] for [whom].”</span>
                        </li>
                    </ul>
                    <div className="mt-6 p-4 bg-white rounded-xl border border-indigo-200 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-indigo-400">Deadline</span>
                        <span className="text-xs font-bold">End of Day 12</span>
                    </div>
                </div>
             </div>
          </div>
      </div>
    )
  }
];