import React from 'react';
import { 
  Briefcase, Target, ExternalLink, MonitorPlay, 
  CheckCircle, Zap, MessageSquare, Lightbulb, 
  Users, Layers, ArrowRight, Sparkles, Smartphone,
  Activity, Search, Layout, HelpCircle, TrendingDown,
  BarChart, PieChart, Info
} from 'lucide-react';

export const Day43Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 43: PM Interview Rounds - RCA & Guestimates 🚀</h1>
      
      <section className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Job ready</span>
          <p className="text-lg font-black text-amber-900 leading-relaxed italic">
            "Problem-solving in interviews isn't just about the final number or the root cause—it's about the MECE (Mutually Exclusive, Collectively Exhaustive) structure you use to get there."
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-amber-600 rounded-2xl shadow-lg">
             <Activity className="w-6 h-6 text-white" />
           </div>
           <h2 className="text-2xl font-black text-zinc-900">Round Three: RCA (Root Cause Analysis)</h2>
        </div>
        
        <div className="bg-zinc-50 p-8 rounded-[3rem] border border-zinc-200 space-y-8">
           <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-4">
                 <h3 className="text-xl font-black text-zinc-900">Mastering RCA</h3>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                   RCA rounds test your ability to debug product problems systematically. You must identify external, internal, and technical factors before landing on the most likely cause.
                 </p>
                 <a 
                    href="https://youtu.be/PA-Z__0G8Cs?si=DjJ7mkmdWhzpYU6l" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-red-700 transition-all"
                 >
                    Watch RCA Guide <MonitorPlay className="w-4 h-4" />
                 </a>
              </div>
              <div className="w-full md:w-1/2 aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl relative">
                 <iframe 
                    src="https://www.youtube.com/embed/PA-Z__0G8Cs" 
                    className="w-full h-full" 
                    title="RCA Masterclass" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                 />
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">RCA Practice Questions:</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { q: "Drop in average watch time by 30%", company: "Netflix", icon: TrendingDown },
                { q: "Sudden revenue drop at Airbnb", company: "Hotstar", icon: HelpCircle },
                { q: "Increase in returns at Amazon", company: "Amazon", icon: Smartphone },
                { q: "Inactive users on Netflix – what would you do?", company: "Netflix", icon: Users }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3 hover:border-amber-200 transition-colors group">
                   <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-inner">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">{item.company}</span>
                   </div>
                   <p className="text-sm font-bold text-zinc-700 leading-tight">{item.q}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="space-y-8 pt-10 border-t border-zinc-100">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-amber-600 rounded-2xl shadow-lg">
             <PieChart className="w-6 h-6 text-white" />
           </div>
           <h2 className="text-2xl font-black text-zinc-900">Round Four: Guestimates</h2>
        </div>

        <div className="bg-zinc-50 p-8 rounded-[3rem] border border-zinc-200 space-y-8">
           <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-4">
                 <h3 className="text-xl font-black text-zinc-900">Mastering Guestimates</h3>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                   Guestimates are about your ability to make logical assumptions and perform mental math under pressure. Don't worry about the exact number—focus on the logic of your segmentation.
                 </p>
                 <a 
                    href="https://youtu.be/7C0L_XdlE50?si=bxBFIUcsJEFUsSqr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-red-700 transition-all"
                 >
                    Watch Guestimate Guide <MonitorPlay className="w-4 h-4" />
                 </a>
              </div>
              <div className="w-full md:w-1/2 aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl relative">
                 <iframe 
                    src="https://www.youtube.com/embed/7C0L_XdlE50" 
                    className="w-full h-full" 
                    title="Guestimates Masterclass" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                 />
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Guestimates Practice Questions:</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { q: "Number of tube lights in Bangalore", company: "Flipkart", icon: Zap },
                { q: "Tennis balls in an airplane", company: "Agoda, Netflix", icon: Layers },
                { q: "Daily Uber support calls", company: "Google", icon: MessageSquare },
                { q: "Cars sold in India", company: "PhonePe", icon: BarChart },
                { q: "Credit card users in India", company: "Visa", icon: Search }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-4 hover:border-amber-200 transition-colors group">
                   <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-inner">
                     <item.icon className="w-5 h-5" />
                   </div>
                   <div className="space-y-2">
                      <p className="text-[13px] font-black text-zinc-800 leading-tight">{item.q}</p>
                      <div className="flex items-center gap-2">
                         <span className="text-[9px] font-black uppercase text-zinc-400">Asked by:</span>
                         <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">{item.company}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-10 rounded-[3rem] border-t-8 border-amber-500">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-400">Pro-Tip</h4>
            <p className="text-lg font-black italic text-zinc-300 leading-relaxed">
              "For RCA: Always clarify the timeline and the metric definition first. For Guestimates: Always start with the total population and segment down based on income or age relevancy."
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

export default Day43Content;