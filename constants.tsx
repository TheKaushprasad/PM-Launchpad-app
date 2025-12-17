import React from 'react';
import { Lesson, ModuleInfo, Category } from './types';
import { Lightbulb, Users, Target, PenTool, Brain, Search, Layout, BarChart, Code, Bot, CheckCircle, Zap, TrendingUp, Layers, Database, Server, Cpu, Rocket, RefreshCw, Play, Wrench, XCircle, Settings, HelpCircle, Youtube, ExternalLink, Compass, ClipboardList, CheckSquare, FileText, Flag, Microscope } from 'lucide-react';

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
                        "A clear starting point for the roadmap"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-zinc-700">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="bg-zinc-900 text-white p-8 rounded-2xl text-center relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">Mindset Reminder</h3>
                <p className="text-lg text-zinc-300 italic mb-6">"You don’t get into PM by reading. You get into PM by doing, asking, learning, and iterating."</p>
                <div className="inline-block bg-blue-600 hover:bg-blue-500 transition-colors px-6 py-3 rounded-full font-bold shadow-lg cursor-pointer">
                    This journey begins TODAY. 🚀
                </div>
             </div>
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-zinc-800 to-zinc-900 opacity-50 z-0"></div>
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
                
                <p className="font-semibold text-xs text-zinc-500 uppercase tracking-wide mb-2">Suggested questions:</p>
                <ul className="list-disc pl-4 space-y-2 text-sm text-zinc-600 mb-4">
                    <li>What does a typical day look like for you?</li>
                    <li>What is the hardest part of your job?</li>
                    <li>How did you break into product without prior experience?</li>
                    <li>What advice would you give to someone starting now?</li>
                </ul>
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
    preview: 'Theme: Understanding the role, responsibilities, types, and myths about Product Management.',
    content: (
        <div className="space-y-8 text-zinc-800">
          {/* Learning Objectives */}
          <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-blue-900">
              <Target className="w-5 h-5" /> Learning Objectives
            </h3>
            <p className="mb-2 font-medium text-blue-800">By the end of today, you will:</p>
            <ul className="space-y-2">
              {['Understand what a product and product management truly mean', 'Learn why PMs exist and how their value changes with company stage', 'Know the core responsibilities, deliverables, and skill areas of PMs', 'Break common myths and misconceptions about PM careers', 'Analyze real-world examples through a structured lens'].map((item, i) => (
                 <li key={i} className="flex items-start gap-2 text-blue-700">
                    <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                 </li>
              ))}
            </ul>
          </section>
    
          {/* 1. What is a Product? */}
          <section>
            <h3 className="text-2xl font-bold mb-4 text-zinc-900">1. What is a Product?</h3>
            <p className="text-lg mb-4 text-zinc-600">A product is anything that creates value by solving a real user problem or fulfilling a need—whether physical, digital, or service-based.</p>
            <div className="bg-zinc-100 p-4 rounded-lg text-zinc-700">
               <span className="font-bold">Examples:</span> Uber, Spotify, iPhone, Google Ads, ATM, WhatsApp.
            </div>
          </section>
    
          {/* 2. Do Companies Need PMs? */}
          <section>
            <h3 className="text-2xl font-bold mb-4 text-zinc-900">2. Do Companies Need Product Managers?</h3>
            <p className="mb-4 font-medium text-zinc-700">Short answer: Yes—but the title isn’t always necessary. Product thinking is.</p>
            
            <h4 className="font-bold mb-2 text-zinc-700">Why PMs emerge: Company Growth Stages</h4>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-zinc-200 rounded-lg">
                    <thead className="bg-zinc-50">
                        <tr>
                            <th className="p-3 border-b border-zinc-200 font-semibold text-zinc-700">Stage</th>
                            <th className="p-3 border-b border-zinc-200 font-semibold text-zinc-700">Who acts as PM</th>
                            <th className="p-3 border-b border-zinc-200 font-semibold text-zinc-700">Why it works</th>
                            <th className="p-3 border-b border-zinc-200 font-semibold text-zinc-700">When it breaks</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-zinc-100">
                            <td className="p-3 font-medium text-zinc-800">Early startup</td>
                            <td className="p-3 text-zinc-600">Founder</td>
                            <td className="p-3 text-zinc-600">Small team, fast decisions</td>
                            <td className="p-3 text-zinc-600">Complexity increases, decisions overload</td>
                        </tr>
                        <tr className="border-b border-zinc-100">
                            <td className="p-3 font-medium text-zinc-800">Growth stage</td>
                            <td className="p-3 text-zinc-600">Dedicated PMs</td>
                            <td className="p-3 text-zinc-600">Align teams, prioritize impact</td>
                            <td className="p-3 text-zinc-600">Without PMs: confusion, misalignment</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium text-zinc-800">Large enterprise</td>
                            <td className="p-3 text-zinc-600">Product org</td>
                            <td className="p-3 text-zinc-600">Scale, governance</td>
                            <td className="p-3 text-zinc-600">Without PMs: feature bloat, chaos</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>
    
          {/* 3. Real-World Exceptions */}
          <section>
             <h3 className="text-2xl font-bold mb-4 text-zinc-900">3. Real-World Exceptions</h3>
             <p className="mb-3 text-zinc-600">Some companies have succeeded without formal PMs:</p>
             <ul className="list-disc pl-5 space-y-1 mb-4 text-zinc-700">
                <li>Basecamp (design-lead)</li>
                <li>Valve (self-organized)</li>
                <li>Early Facebook / Stripe (engineer-led)</li>
             </ul>
             <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
               <p className="text-yellow-800 text-sm font-medium">
                 <strong>Key Takeaway:</strong> While titles vary, the <em>function</em> of product management—understanding users, prioritizing value, and driving execution—is universal.
               </p>
            </div>
          </section>
      </div>
    ),
    assignment: (
      <div className="space-y-4">
          <h4 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> Reflection Task
          </h4>
          <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
             <p className="mb-2 text-zinc-700">Identify one product you love and one you hate. Write down 3 reasons for each.</p>
             <p className="text-xs text-zinc-500">This helps you start analyzing products critically rather than just consuming them.</p>
          </div>
      </div>
    )
  }
];