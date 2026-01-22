import React from 'react';
import { 
  Rocket, Briefcase, Zap, Search, Target, MessageSquare, 
  MonitorPlay, ExternalLink, Info, CheckCircle, Eye, Layers,
  Sparkles, Award, User, GraduationCap, Link, Phone, Mail, FileText,
  // Added Lightbulb to fix "Cannot find name" error on line 155
  Lightbulb
} from 'lucide-react';

export const Day39Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 39: Building a Strong PM Portfolio 🚀</h1>
      
      <section className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Job ready</span>
          <h2 className="text-xl font-black text-amber-900">Portfolio Structure & Essential Sections</h2>
          <p className="text-sm font-medium text-amber-800 leading-relaxed italic">
            "Your portfolio is the ultimate proof of work. It translates your theoretical knowledge into tangible artifacts that prove you can think, execute, and deliver results like a PM."
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <User className="text-amber-600" />
          About Section
        </h2>
        <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm">
          <p className="text-sm font-medium text-zinc-600 leading-relaxed">
            An aspiring Product Manager with a strong focus on solving user-centric problems through structured thinking, data-backed decision-making, and clear prioritisation. Interested in working on products that improve user experience, drive engagement, and create measurable business impact, especially in early-stage and fast-growing environments.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-amber-600" />
          Core Portfolio Modules
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-black text-zinc-900">Case Studies & Projects</h4>
            </div>
            <p className="text-xs font-medium text-zinc-500 leading-relaxed">
              Showcases hands-on proof of work through real and hypothetical product case studies. Includes product teardowns, startup analyses, problem statements, solution proposals, and success metrics to demonstrate practical understanding of product discovery, execution, and impact measurement.
            </p>
          </div>

          <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-black text-zinc-900">Certifications</h4>
            </div>
            <p className="text-xs font-medium text-zinc-500 leading-relaxed">
              Includes relevant product management and analytics certifications that validate foundational knowledge in product strategy, agile practices, data analysis, and experimentation.
            </p>
          </div>

          <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="font-black text-zinc-900">Testimonials</h4>
            </div>
            <p className="text-xs font-medium text-zinc-500 leading-relaxed">
              Feedback from founders, managers, or peers highlighting problem-solving ability, ownership mindset, communication skills, and product thinking approach.
            </p>
          </div>

          <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="font-black text-zinc-900">Work Experience</h4>
            </div>
            <p className="text-xs font-medium text-zinc-500 leading-relaxed">
              Details professional experience demonstrating collaboration with cross-functional teams, exposure to real-world product challenges, execution support, and contribution to product delivery and improvement initiatives.
            </p>
          </div>

          <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-black text-zinc-900">Education</h4>
            </div>
            <p className="text-xs font-medium text-zinc-500 leading-relaxed">
              Academic background that supports analytical thinking, technical understanding, and problem-solving skills relevant to product management.
            </p>
          </div>

          <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Link className="w-5 h-5" />
              </div>
              <h4 className="font-black text-zinc-900">CV Link</h4>
            </div>
            <p className="text-xs font-medium text-zinc-500 leading-relaxed">
              A downloadable, up-to-date resume highlighting product-relevant experience, skills, and achievements.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Phone className="text-amber-600" />
          Contact Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 shadow-sm">
             <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-amber-600 shadow-sm">
               <Link className="w-4 h-4" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase text-zinc-400">LinkedIn</p>
                <p className="text-xs font-bold text-zinc-700">Networking & History</p>
             </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 shadow-sm">
             <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-amber-600 shadow-sm">
               <Mail className="w-4 h-4" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase text-zinc-400">Email</p>
                <p className="text-xs font-bold text-zinc-700">Opportunities</p>
             </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 shadow-sm">
             <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-amber-600 shadow-sm">
               <Phone className="w-4 h-4" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase text-zinc-400">Phone</p>
                <p className="text-xs font-bold text-zinc-700">Urgent Follow-ups</p>
             </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-10 rounded-[3rem] border-t-8 border-amber-500">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-400">Pro-Tip: Build Your Portfolio</h4>
            <p className="text-lg font-black italic text-zinc-300 leading-relaxed">
              "Use tools like Notion, Canva, Framer, or Google AI Studio + Vercel to build a portfolio that is visually professional and easily shareable."
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

export default Day39Content;