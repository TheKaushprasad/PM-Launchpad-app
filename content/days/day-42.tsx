import React from 'react';
import { 
  Briefcase, Target, ExternalLink, MonitorPlay, 
  CheckCircle, Zap, MessageSquare, Lightbulb, 
  Users, Layers, ArrowRight, Sparkles, Smartphone,
  Activity, Search, Layout
} from 'lucide-react';

export const Day42Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 42: PM Interview Rounds - Case Study & Product Sense 🚀</h1>
      
      <section className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Job ready</span>
          <p className="text-lg font-black text-amber-900 leading-relaxed italic">
            "Interviews aren't just about giving the 'right' answer—they are about demonstrating your structured thinking and ability to handle ambiguity."
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Briefcase className="text-amber-600" />
          Round One: Case Study Round
        </h2>
        <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">What is evaluated:</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Depth of analysis",
                "Assumptions & reasoning",
                "Prioritisation",
                "Clarity of communication",
                "Metrics & impact"
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <p className="text-sm font-bold text-zinc-700">{item}</p>
                </div>
              ))}
           </div>
           
           <div className="pt-6 border-t border-zinc-100">
              <a 
                href="https://believed-mist-f1a.notion.site/Assignments-14251b6fbd0e8055830cd5ecf8147313" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 p-6 rounded-3xl bg-zinc-900 text-white hover:bg-black transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
                  <ExternalLink className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Repository</p>
                  <p className="text-sm font-bold group-hover:text-amber-400 transition-colors">Get access to 50 + case studies asked by top companies here</p>
                </div>
              </a>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-amber-600" />
          Round Two: Product Sense Round
        </h2>
        <div className="bg-zinc-50 p-8 rounded-[3rem] border border-zinc-200 space-y-8">
           <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-4">
                 <h3 className="text-xl font-black text-zinc-900">Mastering Product Sense</h3>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                   Product sense rounds test your ability to design products for specific users while balancing constraints and business goals.
                 </p>
                 <a 
                    href="https://youtu.be/tlpfb_VsogA?si=VMQtzA2CME3KtR1z" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-red-700 transition-all"
                 >
                    Watch Masterclass <MonitorPlay className="w-4 h-4" />
                 </a>
              </div>
              <div className="w-full md:w-1/2 aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl relative">
                 <iframe 
                    src="https://www.youtube.com/embed/tlpfb_VsogA" 
                    className="w-full h-full" 
                    title="Product Sense Masterclass" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                 />
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Sparkles className="text-amber-600" />
          Practice Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { title: "Design a movie-booking app for elderly users", company: "Flipkart", icon: Smartphone },
             { title: "Design a Google Pixel tablet for restaurants", company: "Google", icon: Layout },
             { title: "Design a TV remote for older people", company: "Atlassian, Netflix", icon: Zap },
             { title: "Design a water bottle", company: "Atlassian", icon: Layers },
             { title: "Design a car parking system", company: "Google, Atlassian, Meta", icon: Activity },
             { title: "Design a gardening / hobby app", company: "Atlassian, Adobe", icon: Search }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4 hover:border-amber-200 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-inner">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-black text-zinc-900 text-sm leading-relaxed mb-2">{item.title}</h4>
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Asked by:</span>
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">{item.company}</span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-10 rounded-[3rem] border-t-8 border-amber-500">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-400">Interview Tip</h4>
            <p className="text-lg font-black italic text-zinc-300 leading-relaxed">
              "Never jump to the solution. Spend the first 5 minutes clarifying the objective, identifying user segments, and selecting the most impactful pain point."
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

export default Day42Content;