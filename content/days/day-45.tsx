import React from 'react';
import { 
  Users, MonitorPlay, MessageSquare, Heart, 
  ExternalLink, Sparkles, CheckCircle, Lightbulb,
  Briefcase, Target, Trophy, Send
} from 'lucide-react';

export const Day45Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 45: PM Interview Rounds - Behavioral 🚀</h1>
      
      <section className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Job ready</span>
          <p className="text-lg font-black text-amber-900 leading-relaxed italic">
            "Behavioral rounds are where you prove you can actually work with people. Your technical skills get you the interview; your behavioral skills get you the job."
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-amber-600 rounded-2xl shadow-lg">
             <Users className="w-6 h-6 text-white" />
           </div>
           <h2 className="text-2xl font-black text-zinc-900">Round Five: Behavioral Rounds</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-zinc-50 p-8 rounded-[3rem] border border-zinc-200 space-y-6">
              <div className="space-y-4">
                 <h3 className="text-xl font-black text-zinc-900">Behavioral Masterclass Part 1</h3>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                   Learn the fundamentals of STAR (Situation, Task, Action, Result) and how to frame your stories.
                 </p>
                 <a 
                    href="https://youtu.be/1rOcpwcDTuY?si=GXoS-FRzroxPPJ0U" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-red-700 transition-all"
                 >
                    Watch Guide 1 <MonitorPlay className="w-4 h-4" />
                 </a>
              </div>
              <div className="aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl">
                 <iframe 
                    src="https://www.youtube.com/embed/1rOcpwcDTuY" 
                    className="w-full h-full" 
                    title="Behavioral Rounds Guide 1" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                 />
              </div>
           </div>

           <div className="bg-zinc-50 p-8 rounded-[3rem] border border-zinc-200 space-y-6">
              <div className="space-y-4">
                 <h3 className="text-xl font-black text-zinc-900">Behavioral Masterclass Part 2</h3>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                   Deep dive into advanced situational questions: conflict management, failure, and leadership.
                 </p>
                 <a 
                    href="https://youtu.be/Wyvm8vcsaP0?si=JeY3xJKXWfRrGCXG" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-red-700 transition-all"
                 >
                    Watch Guide 2 <MonitorPlay className="w-4 h-4" />
                 </a>
              </div>
              <div className="aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl">
                 <iframe 
                    src="https://www.youtube.com/embed/Wyvm8vcsaP0" 
                    className="w-full h-full" 
                    title="Behavioral Rounds Guide 2" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                 />
              </div>
           </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-12 rounded-[3.5rem] border-t-8 border-amber-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Trophy className="w-48 h-48 text-amber-500" /></div>
        <div className="relative z-10 space-y-8 text-center max-w-2xl mx-auto">
           <div className="w-20 h-20 bg-amber-500/20 rounded-3xl flex items-center justify-center text-amber-400 mx-auto">
              <Sparkles className="w-10 h-10" />
           </div>
           <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Congratulations! 🎓</h2>
              <p className="text-xl font-medium text-zinc-400">
                You have completed the 45-Day PM Launchpad.
              </p>
           </div>
           <div className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-6">
              <p className="text-lg font-bold text-zinc-200">
                We hope you liked the course, please help us by your valuable feedback.
              </p>
              <a 
                href="https://docs.google.com/forms/d/14esag07MESDVDzUmHGRFWyGfSkahwky18qZmW36_ooQ/preview" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-zinc-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl"
              >
                Submit Feedback <Send className="w-5 h-5" />
              </a>
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

export default Day45Content;