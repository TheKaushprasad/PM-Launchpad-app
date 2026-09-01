import { CornsilkSection } from '../../components/CornsilkSection';
import React from 'react';
import { 
  Users, MonitorPlay, MessageSquare, Heart, 
  ExternalLink, Sparkles, CheckCircle, Lightbulb,
  Briefcase, Target, Trophy, Send
} from 'lucide-react';

export const Day45Content = () => {
  return (
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-amber-50 p-4 sm:p-5 rounded-2xl border border-amber-100">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Job ready</span>
          <p className="text-lg font-black text-amber-900 leading-relaxed italic">
            "Behavioral rounds are where you prove you can actually work with people. Your technical skills get you the interview; your behavioral skills get you the job."
          </p>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-amber-600 rounded-2xl shadow-lg">
             <Users className="w-6 h-6 text-white" />
           </div>
           <h2 className="text-lg md:text-xl font-black text-zinc-900">Round Five: Behavioral Rounds</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 md:gap-4">
           <div className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200 space-y-6">
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

           <div className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200 space-y-6">
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

            <CornsilkSection
        title="Behavioral Excellence & Executive Presence"
        titleColor="blue"
        items={[
                {
                          "subtitle": "The STAR Storytelling Method",
                          "headerColor": "blue",
                          "description": "Structure behavioral answers with Situation, Task, Action, and quantifiable Result, focusing heavily on your personal actions and learnings."
                },
                {
                          "subtitle": "Vulnerability & Growth Mindset",
                          "headerColor": "red",
                          "description": "Discuss past mistakes and failed product launches with self-awareness, highlighting specific framework upgrades and team lessons learned."
                },
                {
                          "subtitle": "Strategic Reverse Interviewing",
                          "headerColor": "blue",
                          "description": "Ask thoughtful, non-generic questions about team culture, product velocity, and roadmap challenges to evaluate company fit and leave a lasting impression."
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

export default Day45Content;