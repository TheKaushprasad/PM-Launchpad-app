import { CornsilkSection } from '../../components/CornsilkSection';
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
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-amber-50 p-4 sm:p-5 rounded-2xl border border-amber-100">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Job ready</span>
          <p className="text-lg font-black text-amber-900 leading-relaxed italic">
            "Problem-solving in interviews isn't just about the final number or the root cause—it's about the MECE (Mutually Exclusive, Collectively Exhaustive) structure you use to get there."
          </p>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-amber-600 rounded-2xl shadow-lg">
             <Activity className="w-6 h-6 text-white" />
           </div>
           <h2 className="text-lg md:text-xl font-black text-zinc-900">Round Three: RCA (Root Cause Analysis)</h2>
        </div>
        
        <div className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200 space-y-8">
           <div className="flex flex-col md:flex-row gap-3 md:gap-3.5 items-center">
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

        <div className="space-y-2.5">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">RCA Practice Questions:</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { q: "Drop in average watch time by 30%", company: "Netflix", icon: TrendingDown },
                { q: "Sudden revenue drop at Airbnb", company: "Hotstar", icon: HelpCircle },
                { q: "Increase in returns at Amazon", company: "Amazon", icon: Smartphone },
                { q: "Inactive users on Netflix – what would you do?", company: "Netflix", icon: Users }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3 hover:border-amber-200 transition-colors group">
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
           <h2 className="text-lg md:text-xl font-black text-zinc-900">Round Four: Guestimates</h2>
        </div>

        <div className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200 space-y-8">
           <div className="flex flex-col md:flex-row gap-3 md:gap-3.5 items-center">
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

        <div className="space-y-2.5">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Guestimates Practice Questions:</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { q: "Number of tube lights in Bangalore", company: "Flipkart", icon: Zap },
                { q: "Tennis balls in an airplane", company: "Agoda, Netflix", icon: Layers },
                { q: "Daily Uber support calls", company: "Google", icon: MessageSquare },
                { q: "Cars sold in India", company: "PhonePe", icon: BarChart },
                { q: "Credit card users in India", company: "Visa", icon: Search }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-4 hover:border-amber-200 transition-colors group">
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

            <CornsilkSection
        title="Root Cause Analysis & Guesstimate Principles"
        titleColor="blue"
        items={[
                {
                          "subtitle": "Systematic RCA Diagnostics",
                          "headerColor": "blue",
                          "description": "Isolate metric drops across internal factors (bugs, releases, tracking bugs) and external factors (seasonality, competition, regulation) systematically."
                },
                {
                          "subtitle": "Structured Fermi Estimation",
                          "headerColor": "red",
                          "description": "Break complex market sizing and volume estimation problems into transparent, logical top-down or bottom-up arithmetic branches."
                },
                {
                          "subtitle": "Sanity Checking & Boundary Testing",
                          "headerColor": "blue",
                          "description": "Test estimations against real-world population and market benchmarks, proactively identifying and correcting assumption sensitivities."
                }
      ]}
      />

      <div className="pt-3.5 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day43Content;