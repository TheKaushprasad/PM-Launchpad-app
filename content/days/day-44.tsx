import React from 'react';
import { 
  Briefcase, Target, ExternalLink, MonitorPlay, 
  CheckCircle, Zap, MessageSquare, Lightbulb, 
  Users, Layers, ArrowRight, Sparkles, Smartphone,
  Activity, Search, Layout, HelpCircle, TrendingUp,
  BarChart, PieChart, Info, Mail, Music, Heart, ShoppingBag
} from 'lucide-react';

export const Day44Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 44: PM Interview Rounds - Product Improvement 🚀</h1>
      
      <section className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Job ready</span>
          <p className="text-lg font-black text-amber-900 leading-relaxed italic">
            "Product improvement isn't about making it 'better' in a vacuum—it's about identifying a specific user segment, understanding their unmet needs, and proposing a solution that drives a core business metric."
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-amber-600 rounded-2xl shadow-lg">
             <TrendingUp className="w-6 h-6 text-white" />
           </div>
           <h2 className="text-2xl font-black text-zinc-900">Round Five: Product Improvement</h2>
        </div>
        
        <div className="bg-zinc-50 p-8 rounded-[3rem] border border-zinc-200 space-y-8">
           <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-4">
                 <h3 className="text-xl font-black text-zinc-900">Mastering Product Improvement</h3>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                   In this round, interviewers test your ability to think critically about an existing product. You need to show that you can move from a broad product to a specific, high-impact improvement through a structured framework.
                 </p>
                 <a 
                    href="https://youtu.be/Fhm0F240v9Y?si=Sqp9VhYoenUKYcw7" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-red-700 transition-all"
                 >
                    Watch Masterclass <MonitorPlay className="w-4 h-4" />
                 </a>
              </div>
              <div className="w-full md:w-1/2 aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl relative">
                 <iframe 
                    src="https://www.youtube.com/embed/Fhm0F240v9Y" 
                    className="w-full h-full" 
                    title="Product Improvement Masterclass" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                 />
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Practice Questions:</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { q: "How would you improve Netflix?", company: "Netflix", icon: MonitorPlay },
                { q: "How would you improve Prime Video?", company: "Amazon", icon: Smartphone },
                { q: "How would you improve Gmail?", company: "Adobe", icon: Mail },
                { q: "How would you improve Spotify?", company: "Adobe", icon: Music },
                { q: "How would you improve Meesho UX?", company: "Meesho", icon: ShoppingBag },
                { q: "How would you improve Zepto?", company: "Zepto", icon: Zap },
                { q: "What would you improve in your favorite product?", company: "Multiple companies", icon: Heart }
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

      <section className="bg-zinc-950 text-white p-10 rounded-[3rem] border-t-8 border-amber-500">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-400">Pro-Tip</h4>
            <p className="text-lg font-black italic text-zinc-300 leading-relaxed">
              "The 'Improvement' framework: Clarify the product goal → Pick a specific user segment → Identify their biggest pain point → Brainstorm solutions → Prioritize using RICE → Define success metrics."
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

export default Day44Content;