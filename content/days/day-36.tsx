import React from 'react';
import { 
  Rocket, Briefcase, Zap, Code, Smartphone, CheckCircle, 
  Lightbulb, Sparkles, Layers, Target, Info, MessageSquare, 
  Cpu, Globe, Activity, List, Layout, Database, Terminal, 
  ShieldCheck, ArrowRight, MousePointer2, Hammer,
  Bot, Share2, FileText, RefreshCw, BarChart
} from 'lucide-react';

export const Day36Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 36: Building Proof of Work: Why Aspiring PMs Must Ship and How to Do It With No-Code Tools 🚀</h1>
      
      <section className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Job ready</span>
          <p className="text-lg font-black text-amber-900 leading-relaxed italic">
            "The gap between those who get PM roles and those who don't often comes down to one thing: proof of work."
          </p>
          <p className="text-sm font-medium text-amber-800 leading-relaxed">
            The most common mistake aspiring product managers make is spending months preparing—reading books, taking courses, studying frameworks—without ever actually building and shipping a product. They polish their resumes, practice case interviews, and memorize STAR stories while missing the single most powerful way to demonstrate product management capability: showing something you've built.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-amber-600" />
          Why Proof of Work Matters More Than Credentials
        </h2>
        <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Product management is fundamentally about turning ideas into reality that people actually use. It's not a theoretical discipline. You can't truly understand product management from books alone any more than you can learn to swim by reading about it.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  title: "Demonstrated Ability over Potential", 
                  desc: "Hiring managers prioritize candidates who built and launched small products that attracted users over those who just studied strategy. It proves you can ship." 
                },
                { 
                  title: "Building Reveals What Studying Hides", 
                  desc: "You discover the real friction of product work—recruiting participants, ambiguous specs, and stakeholder tradeoffs—only through building." 
                },
                { 
                  title: "Authentic Storytelling", 
                  desc: "Specific stories about features you launched, feedback you received, and features you killed sound far more convincing than hypotheticals." 
                },
                { 
                  title: "Initiative and Self-Direction", 
                  desc: "Building in your spare time identifies you as a self-starter who drives solutions without being told—a core PM quality." 
                }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-2">
                   <h4 className="font-black text-zinc-900 text-sm">{item.title}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-amber-600" />
          The No-Code Revolution: Building Without Engineering Skills
        </h2>
        <div className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-amber-500 space-y-6">
           <p className="text-sm font-medium text-zinc-400 leading-relaxed">
             Today, no-code and low-code platforms enable anyone to build sophisticated applications, automation workflows, AI agents, and web experiences without writing code. This democratization removes the primary barrier aspiring PMs faced.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Lovable / Bolt.new", desc: "Build complete web apps from conversational prompts.", icon: Layout },
                { name: "Claude Artifacts", desc: "Generate interactive React components and tools in minutes.", icon: Bot },
                { name: "n8n / Zapier", desc: "Build workflow automation and AI agents visually.", icon: Share2 },
                { name: "Replit Agent", desc: "AI-powered dev environment that writes and deploys code for you.", icon: Terminal },
                { name: "Vercel", desc: "Deploy your projects to live websites instantly.", icon: Globe },
                { name: "Cursor", desc: "AI code editor for building apps conversationally.", icon: Code }
              ].map((tool, i) => (
                <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                   <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500 shadow-sm">
                      <tool.icon className="w-4 h-4" />
                   </div>
                   <h5 className="font-black text-white text-[10px] uppercase tracking-widest">{tool.name}</h5>
                   <p className="text-[10px] font-medium text-zinc-500 leading-tight">{tool.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-amber-600" />
          How to Build Your Proof of Work Portfolio
        </h2>
        <div className="space-y-6">
           {[
             { title: "Start with Problems You Personally Experience", desc: "Solve pain points you understand intimately. You'll stay motivated and be your own first user. A simple budgeting tool beats a half-finished finance suite.", icon: Briefcase },
             { title: "Ship Small and Ship Often", desc: "Better to ship ten small projects than spend six months on one. Aim to ship your first project within a week (5-10 hours of work) to learn the complete cycle fast.", icon: Rocket },
             { title: "Build in Public and Gather Real Users", desc: "Aim for at least 10 real users (not friends). Launch on Twitter, Reddit, or Product Hunt. Real feedback is what teaches you product management.", icon: Users2 },
             { title: "Document Your Process and Learnings", desc: "Write case studies for each: the problem, how you validated it, key decisions, metrics tracked, and what you'd do differently next time.", icon: FileText },
             { title: "Iterate Based on Feedback", desc: "The best portfolio projects show evolution. Version 2 and 3 after analyzing usage patterns prove you can actually manage a product lifecycle.", icon: RefreshCw }
           ].map((step, i) => (
             <div key={i} className="flex gap-6 p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] items-start">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-amber-600 shrink-0 shadow-sm border border-zinc-100">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-black text-zinc-900 text-sm mb-1">{step.title}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{step.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Lightbulb className="text-amber-600" />
          Project Ideas You Can Build This Week
        </h2>
        
        <div className="space-y-6">
           <div className="p-8 bg-white border border-zinc-100 rounded-[3rem] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                   <BarChart className="w-5 h-5" />
                 </div>
                 <h4 className="font-black text-zinc-900">1. Personal Dashboard for Daily Metrics</h4>
              </div>
              <p className="text-[11px] font-bold text-zinc-400 leading-relaxed">Demonstrates: Data visualization, user input, state management.</p>
              <p className="text-xs font-medium text-zinc-600">A simple web dashboard where users log habits, mood, and sleep. Use Claude or Lovable to create the interface and a simple database for persistence.</p>
           </div>

           <div className="p-8 bg-white border border-zinc-100 rounded-[3rem] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                   <MessageSquare className="w-5 h-5" />
                 </div>
                 <h4 className="font-black text-zinc-900">2. Interview Prep Question Generator</h4>
              </div>
              <p className="text-[11px] font-bold text-zinc-400 leading-relaxed">Demonstrates: AI integration, personalization, user need understanding.</p>
              <p className="text-xs font-medium text-zinc-600">Generates contextual behavioral questions based on role and industry. Use the Google AI Studio API for the brain and a simple form interface.</p>
           </div>

           <div className="p-8 bg-white border border-zinc-100 rounded-[3rem] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 shadow-inner">
                   <Smartphone className="w-5 h-5" />
                 </div>
                 <h4 className="font-black text-zinc-900">3. Micro-SaaS: Email Subject Line Analyzer</h4>
              </div>
              <p className="text-[11px] font-bold text-zinc-400 leading-relaxed">Demonstrates: AI application, utility design, viral growth potential.</p>
              <p className="text-xs font-medium text-zinc-600">Users paste subject lines and receive instant scores on clarity and urgency with improvement suggestions. High utility and easy to share.</p>
           </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-10 rounded-[3rem] border-t-8 border-amber-500">
        <h2 className="text-2xl font-black text-amber-400 flex items-center gap-3 mb-6">
          <Sparkles className="text-amber-400" />
          Final Insight
        </h2>
        <div className="space-y-4">
           <p className="text-sm font-bold text-zinc-300 leading-relaxed italic">
             "Technical credibility increases when you've shipped. You don't need to be an engineer, but showing you can use tools to translate vision into a working URL accessible to anyone in the world is the ultimate PM superpower."
           </p>
        </div>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

const Users2 = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default Day36Content;