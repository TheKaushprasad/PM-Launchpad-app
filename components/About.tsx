import React from 'react';
import { Target, BarChart, PenTool, ClipboardList, Code, Brain, Users, CheckCircle, Briefcase, Zap, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 pb-16"
    >
      
      {/* Hero Section */}
      <div className="relative rounded-[2.5rem] p-10 md:p-16 text-white shadow-2xl bg-zinc-900 overflow-hidden isolate">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-zinc-900 -z-10"></div>
        
        {/* Animated Background Blobs */}
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-indigo-500 opacity-20 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-purple-500 opacity-20 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-100 text-sm font-semibold backdrop-blur-md shadow-sm">
                    <Star className="w-4 h-4 fill-current text-yellow-400" /> 
                    <span>Top Rated Product Course</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                    Launch Your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">PM Career</span>
                </h1>
                
                <p className="text-indigo-100 text-lg md:text-xl leading-relaxed max-w-xl opacity-90">
                    A structured 45-day course built by industry experts. Master the skills, build the portfolio, and land the job.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                    <button 
                        onClick={() => navigate('/dashboard/day/0')}
                        className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:bg-indigo-50 transition-all transform hover:-translate-y-1 flex items-center gap-2 group"
                    >
                        Start Learning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-semibold backdrop-blur-sm hover:bg-white/20 transition-all">
                        View Curriculum
                    </button>
                </div>
            </div>
            
            {/* Stats Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-2 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-indigo-500/30">45</div>
                    <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider">Duration</p>
                    <p className="text-2xl font-bold">Days to Mastery</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-2 hover:bg-white/10 transition-colors mt-8">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-blue-500/30">3+</div>
                    <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider">Portfolio</p>
                    <p className="text-2xl font-bold">Real Projects</p>
                </div>
                 <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-2 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-purple-500/30">100%</div>
                    <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider">Access</p>
                    <p className="text-2xl font-bold">Free Forever</p>
                </div>
                 <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-2 hover:bg-white/10 transition-colors mt-8">
                    <div className="w-12 h-12 rounded-2xl bg-pink-500 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-pink-500/30">JD</div>
                    <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider">Focus</p>
                    <p className="text-2xl font-bold">Job Aligned</p>
                </div>
            </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-12">
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-indigo-600 rounded-full"></div>
                    <h2 className="text-3xl font-bold text-zinc-900">About the Program</h2>
                </div>
                <div className="prose prose-lg prose-zinc max-w-none text-zinc-600">
                    <p>
                        Welcome to <strong>The NooB PM</strong>—a structured, outcome-oriented program designed to help you land your first role in product, whether it’s Product Intern, APM, or Founder’s Office.
                    </p>
                    <p>
                        This course is built from <span className="text-indigo-600 font-semibold bg-indigo-50 px-1 rounded">real industry experience</span>, shaped by insights from multiple working PMs. Every lesson, assignment, and playbook is tailored to what companies actually expect from an entry-level PM today.
                    </p>
                </div>
            </section>

             <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-zinc-900">Industry-Validated Skills</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SkillCard 
                        icon={<BarChart className="w-6 h-6 text-indigo-600" />}
                        title="Data & Experimentation"
                        skills={["SQL Basics", "Mixpanel / GA4", "A/B Testing", "Metric Definition"]}
                    />
                    <SkillCard 
                        icon={<PenTool className="w-6 h-6 text-pink-600" />}
                        title="Product Design & UX"
                        skills={["Figma Basics", "User Flows", "Wireframing", "Usability Heuristics"]}
                    />
                    <SkillCard 
                        icon={<ClipboardList className="w-6 h-6 text-emerald-600" />}
                        title="Execution & Agile"
                        skills={["PRD Writing", "User Stories", "Jira / Linear", "Roadmapping"]}
                    />
                    <SkillCard 
                        icon={<Brain className="w-6 h-6 text-violet-600" />}
                        title="Product Sense"
                        skills={["Root Cause Analysis", "Prioritization", "Market Research", "Strategy"]}
                    />
                </div>
             </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
            
            {/* Outcomes Card */}
            <div className="bg-zinc-900 text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-20 rounded-full blur-[80px]"></div>
                
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
                    <Briefcase className="w-6 h-6 text-indigo-400" />
                    Outcomes
                </h3>
                
                <div className="space-y-5 relative z-10">
                    {[
                        "A complete Product Requirements Doc (PRD)",
                        "A Product Design case study",
                        "SQL + Analytics dashboard project",
                        "Go-To-Market (GTM) strategy doc",
                        "Resume & LinkedIn optimization"
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-zinc-200 font-medium leading-snug">{item}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-10 pt-8 border-t border-white/10">
                    <button onClick={() => navigate('/dashboard/day/0')} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2 group">
                        Start Day 0 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Why This Program Card */}
            <div className="bg-white rounded-[2rem] p-8 border border-zinc-200 shadow-xl shadow-zinc-200/50">
                <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-amber-500" /> Why This Program?
                </h3>
                <ul className="space-y-6">
                    <li className="flex gap-4">
                        <span className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 font-bold">1</span>
                        <div className="text-sm text-zinc-600">
                            <strong className="block text-zinc-900 mb-1 text-base">Portfolio-first</strong>
                            You learn by building, not just reading.
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 font-bold">2</span>
                        <div className="text-sm text-zinc-600">
                            <strong className="block text-zinc-900 mb-1 text-base">Interview-ready</strong>
                             Mock practices embedded into assignments.
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 font-bold">3</span>
                        <div className="text-sm text-zinc-600">
                            <strong className="block text-zinc-900 mb-1 text-base">Curated Path</strong>
                             No decision fatigue. Just follow the map.
                        </div>
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
        <div className="p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-zinc-50 rounded-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors text-zinc-500">
                    {icon}
                </div>
                <h3 className="font-bold text-zinc-900">{title}</h3>
            </div>
            <ul className="space-y-2.5">
                {skills.map((skill, i) => (
                    <li key={i} className="text-sm text-zinc-600 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-indigo-400 transition-colors"></div>
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}