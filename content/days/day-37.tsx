import React from 'react';
import { 
  Rocket, Briefcase, Zap, Search, Target, MessageSquare, 
  MonitorPlay, ExternalLink, Info, CheckCircle, Eye, Layers,
  // Added Sparkles to resolve error on line 129
  Sparkles
} from 'lucide-react';

export const Day37Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 37: Building Proof of Work as an Aspiring Product Manager Through Structured Product Teardowns 🚀</h1>
      
      <section className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Job ready</span>
          <p className="text-lg font-black text-amber-900 leading-relaxed">
            As an aspiring Product Manager, one of the most credible ways to demonstrate product thinking, analytical rigor, and strategic insight is by doing product teardowns — systematic breakdowns of real products to extract insights and propose meaningful improvements.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Info className="text-amber-600" />
          Study Materials & References
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://hellopm.co/what-is-a-product-teardown/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-zinc-100 hover:border-amber-200 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Refer</p>
              <p className="text-sm font-bold text-zinc-700 group-hover:text-amber-600">What is a Product Teardown?</p>
            </div>
          </a>
          <a 
            href="https://thestare.in/case-studies" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-zinc-100 hover:border-amber-200 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Refer</p>
              <p className="text-sm font-bold text-zinc-700 group-hover:text-amber-600">Case Studies Repository</p>
            </div>
          </a>
          <a 
            href="https://youtu.be/3cqHleDYgys" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-zinc-100 hover:border-amber-200 hover:shadow-md transition-all group md:col-span-2"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
              <MonitorPlay className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Watch</p>
              <p className="text-sm font-bold text-zinc-700 group-hover:text-amber-600">Video Guide</p>
            </div>
          </a>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-amber-600" />
          What Is a Product Teardown?
        </h2>
        <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm">
          <p className="text-sm font-medium text-zinc-600 leading-relaxed">
            A product teardown is a structured analysis where you reverse-engineer a digital product to understand how it works, why it was built that way, and what strategic decisions underlie its design, user flows, and business model. This goes far beyond a simple review — you dig into user journeys, feature decisions, growth mechanics, and UX logic to derive insights.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-amber-600" />
          Why Product Teardowns Are Great Proof of Work
        </h2>
        <p className="text-sm font-bold text-zinc-500">Teardowns help you develop and showcase core PM skills:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              title: "Product Sense", 
              desc: "You learn to interpret why features exist and what trade-offs were made.",
              icon: Eye
            },
            { 
              title: "User Empathy", 
              desc: "You map user personas, pains, and motivations behind decisions.",
              icon: Target
            },
            { 
              title: "Strategic Thinking", 
              desc: "You connect business goals (like retention or monetisation) to product decisions.",
              icon: Zap
            },
            { 
              title: "Communication", 
              desc: "Teardowns force you to articulate insights clearly — exactly what employers look for.",
              icon: MessageSquare
            }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-6 bg-zinc-50 border border-zinc-100 rounded-3xl items-start">
               <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-600 shrink-0 shadow-sm border border-zinc-100">
                 <item.icon className="w-5 h-5" />
               </div>
               <div>
                 <h4 className="font-black text-zinc-900 text-sm mb-1">{item.title}</h4>
                 <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-10 rounded-[3rem] border-t-8 border-amber-500">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-400">The Ultimate Portfolio Piece</h4>
            <p className="text-lg font-black italic text-zinc-300 leading-relaxed">
              "These analyses become tangible artifacts you can upload to your portfolio or talk through in interviews — much stronger proof of work than an empty resume."
            </p>
          </div>
        </div>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day37Content;