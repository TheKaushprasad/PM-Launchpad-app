
import React from 'react';
import { 
  Target, CheckCircle, Smartphone, Eye, 
  Layers, Zap, MousePointer2, MessageSquare, 
  MonitorPlay, Layout, Sparkles, UserCheck, 
  FileText, Beaker, Briefcase, Info, Brain,
  // Added missing Activity icon to fix "Cannot find name" error on line 137
  Activity
} from 'lucide-react';

export const Day25Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 25: UI/UX for Product Managers 🚀</h1>
      
      <section className="bg-pink-50 p-10 rounded-[3rem] border border-pink-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-pink-600">Design</span>
          <p className="text-lg font-black text-pink-900 leading-relaxed italic">
            "Essential UX & UI Concepts + Practical Usability"
          </p>
          <p className="text-sm font-bold text-pink-700">
            Today’s Goal: Build a solid foundation in UI/UX principles relevant to product management, including understanding design fundamentals, learning usability testing, integrating cognitive and visual design laws, and communicating effectively with design teams and stakeholders.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Learning Objectives
        </h2>
        <p className="text-sm font-bold text-zinc-500">By the end of Day 25, you will be able to:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Recognize fundamental UX and UI concepts",
            "Apply design principles in product discussions",
            "Understand how and when to run usability tests",
            "Use key visual design laws to evaluate interfaces",
            "Provide actionable feedback to designers"
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-zinc-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Smartphone className="text-indigo-600" />
          1. Understanding Design Fundamentals
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Product managers don't need to be designers, but they must understand the fundamental building blocks of great experiences.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                UX (User Experience)
              </h4>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                The overall 'feel' of the journey. It's about solving the right problem and ensuring the user's path is logical, efficient, and satisfying.
              </p>
              <ul className="space-y-2">
                 {["Information Architecture", "User Flow Mapping", "Wireframing", "Empathy"].map((text, i) => (
                   <li key={i} className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" /> {text}
                   </li>
                 ))}
              </ul>
           </div>
           
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900 flex items-center gap-2">
                <Layout className="w-5 h-5 text-pink-600" />
                UI (User Interface)
              </h4>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                The visual components through which users interact with a product. It's about presentation, interactivity, and brand aesthetic.
              </p>
              <ul className="space-y-2">
                 {["Typography & Color", "Grid Systems", "Interaction Design", "Visual Hierarchy"].map((text, i) => (
                   <li key={i} className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /> {text}
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Beaker className="text-indigo-600" />
          2. Usability Testing for PMs
        </h2>
        <div className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-indigo-500 space-y-6">
           <p className="text-sm font-bold text-zinc-400 leading-relaxed">
             Usability testing is the process of evaluating a product by testing it with representative users. It reveals where users get stuck and why.
           </p>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { title: "When to test", text: "As early as possible (wireframes) and continuously throughout development." },
                { title: "What to measure", text: "Task completion rates, time on task, error rates, and subjective satisfaction." },
                { title: "Moderated vs Unmoderated", text: "Direct interaction (real-time feedback) vs automated remote sessions (faster scale)." },
                { title: "PM's Role", text: "Define test objectives, recruit representative segments, and prioritize resulting fixes." }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                   <h4 className="font-black text-indigo-300 uppercase tracking-widest text-[10px]">{item.title}</h4>
                   <p className="text-sm font-bold leading-relaxed text-zinc-300">{item.text}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Brain className="text-indigo-600" />
          3. Visual & Cognitive Design Laws
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          The most effective interfaces follow universal rules based on human psychology and visual perception.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { title: "Hick's Law", desc: "The time it takes to make a decision increases with the number and complexity of choices.", icon: Zap },
             { title: "Fitts's Law", desc: "The time to acquire a target is a function of the distance to and size of the target.", icon: MousePointer2 },
             { title: "Jakob's Law", desc: "Users spend most of their time on other sites. They prefer your site to work the same way.", icon: UserCheck },
             { title: "Miller's Law", desc: "The average person can only keep 7 (plus or minus 2) items in their working memory.", icon: Layers },
             { title: "Law of Proximity", desc: "Objects that are near each other tend to be grouped together.", icon: Sparkles },
             { title: "Zeigarnik Effect", desc: "People remember uncompleted or interrupted tasks better than completed ones.", icon: Activity }
           ].map((law, i) => (
             <div key={i} className="p-6 bg-zinc-50 border border-zinc-200 rounded-[2rem] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                  <law.icon className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-black text-indigo-900 text-sm mb-1">{law.title}</h4>
                   <p className="text-xs font-bold text-zinc-500 leading-relaxed">{law.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
          <MessageSquare className="text-emerald-500" />
          Communicating with Design
        </h2>
        <p className="text-sm font-bold text-zinc-600 leading-relaxed italic">
          "The best PM feedback is goal-oriented, not solution-oriented. Instead of saying 'Make this button red,' say 'I'm worried users aren't noticing our primary call-to-action.' This respects the designer's craft while ensuring the product goal is met."
        </p>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day25Content;
