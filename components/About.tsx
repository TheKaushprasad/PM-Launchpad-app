
import React from 'react';
import { Target, BarChart, PenTool, ClipboardList, Code, Brain, Users, CheckCircle, Briefcase, Zap, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-10 pb-12"
    >
      
      {/* Hero Section - Reduced padding */}
      <div className="relative rounded-3xl p-8 md:p-12 text-white shadow-xl bg-zinc-900 overflow-hidden isolate">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-zinc-900 -z-10"></div>
        <div className="absolute top-0 right-0 -z-10 w-[400px] h-[400px] bg-indigo-500 opacity-10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-indigo-100 text-xs font-black uppercase tracking-widest backdrop-blur-md">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" /> 
                    <span>Industry Expert Content</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                    Launch Your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">PM Career</span>
                </h1>
                
                <p className="text-indigo-100 text-base md:text-lg leading-[1.6] max-w-lg opacity-90">
                    A structured 45-day course built by industry experts. Master the skills, build the portfolio, and land the job.
                </p>
                
                <div className="flex flex-wrap gap-3 pt-2">
                    <button 
                        onClick={() => navigate('/dashboard/day/0')}
                        className="px-6 py-3 bg-white text-zinc-900 rounded-xl font-bold text-sm shadow-lg hover:bg-zinc-50 transition-all flex items-center gap-2"
                    >
                        Start Learning <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-sm hover:bg-white/20 transition-all">
                        Curriculum
                    </button>
                </div>
            </div>
            
            <div className="hidden lg:grid grid-cols-2 gap-3 shrink-0">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-black text-lg mb-3">45</div>
                    <p className="text-indigo-200 text-[9px] font-black uppercase tracking-wider mb-1">Duration</p>
                    <p className="text-lg font-black leading-tight">Days to Mastery</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mt-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white font-black text-lg mb-3">3+</div>
                    <p className="text-indigo-200 text-[9px] font-black uppercase tracking-wider mb-1">Portfolio</p>
                    <p className="text-lg font-black leading-tight">Live Projects</p>
                </div>
            </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-10">
            <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-4 tracking-tighter">About the Program</h2>
                <div className="prose prose-zinc max-w-none text-zinc-600 !leading-[1.6]">
                    <p className="mb-4">
                        Welcome to <strong>The NooB PM</strong>—a structured, outcome-oriented program designed to help you land your first role in product management.
                    </p>
                    <p>
                        This course is built from real industry experience, shaped by insights from multiple working PMs. Every lesson is tailored to what companies actually expect today.
                    </p>
                </div>
            </section>

             <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 tracking-tighter">Core Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SkillCard 
                        icon={<BarChart className="w-5 h-5 text-indigo-600" />}
                        title="Data Mastery"
                        skills={["SQL Basics", "Analytics (GA4/Mixpanel)", "A/B Testing"]}
                    />
                    <SkillCard 
                        icon={<PenTool className="w-5 h-5 text-pink-600" />}
                        title="Product Design"
                        skills={["Wireframing", "Figma Basics", "Usability Heuristics"]}
                    />
                    <SkillCard 
                        icon={<ClipboardList className="w-5 h-5 text-emerald-600" />}
                        title="Execution"
                        skills={["PRD Writing", "Agile/Scrum", "User Stories"]}
                    />
                    <SkillCard 
                        icon={<Brain className="w-5 h-5 text-violet-600" />}
                        title="Product Sense"
                        skills={["Prioritization", "Problem Solving", "Market Research"]}
                    />
                </div>
             </section>
        </div>

        <div className="space-y-6">
            <div className="bg-zinc-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-400" />
                    Outcomes
                </h3>
                <div className="space-y-3">
                    {[
                        "Standard PRD Portfolio",
                        "Design Case Study",
                        "Analytics Dashboard project",
                        "GTM Strategy doc",
                        "Resume Optimization"
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-sm">
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-zinc-200 font-bold tracking-tight">{item}</span>
                        </div>
                    ))}
                </div>
                <button onClick={() => navigate('/dashboard/day/0')} className="w-full mt-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2">
                    Start Learning <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
                <h3 className="text-base font-black text-zinc-900 mb-4 flex items-center gap-2 uppercase tracking-widest">
                    <Zap className="w-4 h-4 text-amber-500" /> Highlights
                </h3>
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <div className="w-6 h-6 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-[10px] shrink-0">1</div>
                        <p className="text-xs text-zinc-600 leading-relaxed"><strong className="text-zinc-900 block mb-0.5">Portfolio-first</strong> Build real assets you can show recruiters.</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-6 h-6 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-[10px] shrink-0">2</div>
                        <p className="text-xs text-zinc-600 leading-relaxed"><strong className="text-zinc-900 block mb-0.5">Job Aligned</strong> Skills mapped to real junior PM requirements.</p>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillCard = ({ icon, title, skills }: { icon: any, title: string, skills: string[] }) => {
    return (
        <div className="p-5 rounded-xl bg-white border border-zinc-100 shadow-sm hover:border-indigo-100 transition-all">
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-zinc-50 rounded-lg text-zinc-500">
                    {icon}
                </div>
                <h3 className="font-black text-zinc-900 tracking-tight text-sm">{title}</h3>
            </div>
            <ul className="space-y-1.5">
                {skills.map((skill, i) => (
                    <li key={i} className="text-xs text-zinc-500 flex items-center gap-2 font-medium">
                        <div className="w-1 h-1 rounded-full bg-indigo-400"></div>
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}
