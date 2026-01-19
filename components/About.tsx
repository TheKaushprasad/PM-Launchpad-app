import React from 'react';
import { Target, BarChart, PenTool, ClipboardList, Code, Brain, Users, CheckCircle, Briefcase, Zap, Star, ArrowRight, BookOpen, Clock, Lightbulb, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 md:space-y-12 pb-12"
    >
      
      {/* Hero Section */}
      <div className="relative rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-zinc-900 shadow-xl bg-[#79BAEC] overflow-hidden isolate">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5 -z-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/30 border border-white/20 text-zinc-900 text-xs font-black uppercase tracking-widest backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 fill-current" /> 
                    <span>Industry Validated Curriculum</span>
                </div>
                
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] text-zinc-900">
                    Master the <br/>
                    PM Craft.
                </h1>
                
                <p className="text-zinc-800 text-base md:text-xl font-medium leading-[1.6] max-w-xl mx-auto lg:mx-0 opacity-90">
                    A structured 45-day journey from Curious Beginner to Job-Ready Product Manager. Apply concepts, build projects, and land your role.
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                    <button 
                        onClick={() => navigate('/dashboard/day/0')}
                        className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3"
                    >
                        Begin Journey <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
            
            <div className="hidden lg:grid grid-cols-2 gap-4 shrink-0">
                <div className="bg-white/20 border border-white/30 p-8 rounded-[2.5rem] backdrop-blur-sm">
                    <Clock className="w-10 h-10 text-zinc-900 mb-4" />
                    <p className="text-zinc-800 text-[10px] font-black uppercase tracking-wider mb-1">Commitment</p>
                    <p className="text-xl font-black leading-tight">1-3 Hours / Day</p>
                </div>
                <div className="bg-white/20 border border-white/30 p-8 rounded-[2.5rem] mt-12 backdrop-blur-sm">
                    <Briefcase className="w-10 h-10 text-zinc-900 mb-4" />
                    <p className="text-zinc-800 text-[10px] font-black uppercase tracking-wider mb-1">Roles</p>
                    <p className="text-xl font-black leading-tight">APM / PM / Ops</p>
                </div>
            </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-12">
            
            {/* About the Course */}
            <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-zinc-100 shadow-sm">
                <h2 className="text-3xl font-black text-zinc-900 mb-6 tracking-tighter flex items-center gap-3">
                    <BookOpen className="text-[#79BAEC]" />
                    About the Course
                </h2>
                <div className="prose prose-zinc prose-lg max-w-none text-zinc-600 font-medium leading-relaxed space-y-6">
                    <p>
                        Welcome to <strong>The NooB PM’s 45-Day Product Management Launchpad</strong>—a structured, outcome-oriented program designed to help you land your first role in product, whether it’s Product Intern, Associate Product Manager, Product Manager, or adjacent roles such as Program Manager, Product Operations, Product Specialist, or Founder’s Office.
                    </p>
                    <p>
                        This course is built from real industry experience, shaped by insights from multiple working PMs who have successfully transitioned into leading tech & startup roles. Every lesson, assignment, and playbook is tailored to what companies actually expect from an entry-level PM today.
                    </p>
                    <p className="bg-zinc-50 p-6 rounded-2xl border-l-4 border-[#79BAEC] italic">
                        By the end of this course, you won’t just learn PM concepts — you will apply them, build real projects, and develop an interview-ready portfolio that gets you shortlisted.
                    </p>
                </div>
            </section>

            {/* Industry Validated Blueprint */}
            <section>
                <div className="px-4 mb-8">
                    <h2 className="text-3xl font-black text-zinc-900 tracking-tighter">Industry-Validated Skill Blueprint</h2>
                    <p className="text-zinc-500 font-medium mt-2">Essential competencies recruiters expect from entry-level PMs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BlueprintCard 
                        icon={<BarChart className="w-6 h-6" />}
                        title="Data & Experimentation"
                        items={["SQL, Excel", "BI Tools (Power BI)", "Mixpanel / GA4", "A/B Testing & Metrics"]}
                    />
                    <BlueprintCard 
                        icon={<PenTool className="w-6 h-6" />}
                        title="Product Design & UX"
                        items={["Figma Basics", "UI UX Principles", "User Journey Mapping", "Usability Heuristics"]}
                    />
                    <BlueprintCard 
                        icon={<ClipboardList className="w-6 h-6" />}
                        title="Product Execution"
                        items={["Agile & Scrum (Jira)", "PRD, BRD, User Stories", "Roadmaps & Documentation", "GTM & Market Research"]}
                    />
                    <BlueprintCard 
                        icon={<Code className="w-6 h-6" />}
                        title="Tech Foundations"
                        items={["APIs & Integration", "System Architecture", "Web App Fundamentals", "Engineering Collaboration"]}
                    />
                    <BlueprintCard 
                        icon={<Brain className="w-6 h-6" />}
                        title="Core Product Thinking"
                        items={["Problem-solving", "Prioritization Frameworks", "Business Acumen", "Decision-making"]}
                    />
                    <BlueprintCard 
                        icon={<Bot className="w-6 h-6" />}
                        title="AI for PMs"
                        items={["Basics of AI/ML", "Prompt Engineering", "AI Agents & RAG", "Context Engineering"]}
                    />
                </div>
            </section>
        </div>

        {/* Sidebar Sections */}
        <div className="space-y-8">
            {/* Commitment Card */}
            <div className="bg-zinc-950 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Zap className="w-16 h-16 text-[#79BAEC]" /></div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-widest text-[#79BAEC]">Prerequisites</h3>
                <p className="text-zinc-400 font-bold mb-6 italic leading-relaxed">No prior experience required — just curiosity and determination.</p>
                <div className="space-y-4">
                    <div className="flex gap-4 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#79BAEC]"></div>
                        <p className="text-sm font-black">1-3 Hours Daily dedication</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#79BAEC]"></div>
                        <p className="text-sm font-black">Hands-on mentality</p>
                    </div>
                </div>
            </div>

            {/* Difference Card */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm space-y-6">
                <h3 className="text-lg font-black text-zinc-900 uppercase tracking-widest flex items-center gap-2">
                    <Lightbulb className="text-amber-500 w-5 h-5" /> Why This?
                </h3>
                <div className="space-y-4">
                    {[
                        "Portfolio-first: Build case studies & a live app",
                        "Hands-on assignments over theory",
                        "Recruiter-oriented interview prep",
                        "Real industry playbooks"
                    ].map((text, i) => (
                        <div key={i} className="flex gap-3 items-start">
                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-sm font-bold text-zinc-600 leading-snug">{text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Outcome Card */}
            <div className="bg-[#79BAEC]/10 rounded-[2.5rem] p-8 border border-[#79BAEC]/20">
                <h3 className="text-lg font-black text-[#2D5A81] uppercase tracking-widest mb-6">Outcome</h3>
                <p className="text-zinc-900 font-black text-2xl mb-6 tracking-tighter leading-tight">In 45 Days, you will have:</p>
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#79BAEC] flex items-center justify-center text-white shrink-0 shadow-sm"><CheckCircle className="w-4 h-4" /></div>
                        <p className="text-xs font-black text-zinc-700">Skills for Entry-Level roles</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#79BAEC] flex items-center justify-center text-white shrink-0 shadow-sm"><CheckCircle className="w-4 h-4" /></div>
                        <p className="text-xs font-black text-zinc-700">Portfolio + Resume + Prep</p>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#79BAEC] flex items-center justify-center text-white shrink-0 shadow-sm"><CheckCircle className="w-4 h-4" /></div>
                        <p className="text-xs font-black text-zinc-700">Shortlisting Confidence</p>
                    </li>
                </ul>
                <button 
                    onClick={() => navigate('/dashboard/day/0')}
                    className="w-full mt-10 py-4 bg-[#79BAEC] text-zinc-950 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-white transition-all border border-[#79BAEC]/30"
                >
                    Let's Begin
                </button>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

const BlueprintCard = ({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) => {
    return (
        <div className="p-8 rounded-[2rem] bg-white border border-zinc-100 shadow-sm hover:border-[#79BAEC]/40 transition-all group">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 bg-zinc-50 rounded-2xl text-zinc-500 group-hover:bg-[#79BAEC] group-hover:text-white transition-colors duration-500 shadow-inner">
                    {icon}
                </div>
                <h3 className="font-black text-zinc-900 tracking-tight text-lg">{title}</h3>
            </div>
            <ul className="space-y-2.5">
                {items.map((item, i) => (
                    <li key={i} className="text-xs text-zinc-500 flex items-center gap-3 font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#79BAEC] opacity-50"></div>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}
