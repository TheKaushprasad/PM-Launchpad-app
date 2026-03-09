import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, ArrowLeft, Rocket, CheckCircle, 
  FileText, ExternalLink, ShieldCheck, Zap, 
  Target, Briefcase, Award, Plus, Layers
} from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';

interface ContextType {
  isCollapsed: boolean;
}

export const PortfolioBuilder: React.FC = () => {
  const navigate = useNavigate();
  const { isCollapsed } = useOutletContext<ContextType>();

  const sections = [
    { title: "Personal Brand", icon: UserIcon, items: ["Tagline", "Professional Bio", "Contact Details"] },
    { title: "Core Projects", icon: Rocket, items: ["App Prototype", "PRD Artifacts", "Analytics Dashboard"] },
    { title: "Case Studies", icon: FileText, items: ["Product Teardown", "RCA Analysis", "Growth Experiment"] }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`pb-20 transition-all duration-500 mx-auto ${isCollapsed ? 'max-w-[1600px] px-4 md:px-12' : 'max-w-[1200px] px-4 md:px-6'}`}
    >
      <button 
        onClick={() => navigate('/tools')}
        className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 font-bold mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <Layout className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter">Portfolio Builder</h1>
           </div>
           <p className="text-zinc-500 font-medium max-w-xl">Document your 45-day journey. Turn daily assignments into high-impact case studies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-950 text-white rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 p-8 opacity-10"><Rocket className="w-40 h-40" /></div>
             <div className="relative z-10 space-y-6">
                <h2 className="text-4xl font-black tracking-tighter">Ready to ship?</h2>
                <p className="text-zinc-400 font-medium leading-relaxed max-w-md">
                   Don't leave your assignments in Notion. Use our blueprint to build a portfolio that recruiters actually want to read.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                   <button onClick={() => navigate('/dashboard/day/39')} className="px-8 py-4 bg-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-emerald-600 transition-all shadow-lg">
                      View Blueprint
                   </button>
                   <a href="https://notion.so" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2">
                      Start in Notion <ExternalLink className="w-4 h-4" />
                   </a>
                </div>
             </div>
          </div>

          <div className="space-y-6">
             <h3 className="text-xl font-black text-zinc-900 tracking-tight px-2">The Essential Structure</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sections.map((sec, i) => (
                  <div key={i} className="p-6 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 shadow-inner">
                       <sec.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-black text-zinc-900 text-sm">{sec.title}</h4>
                    <ul className="space-y-2">
                       {sec.items.map(item => (
                         <li key={item} className="text-[10px] font-bold text-zinc-500 flex items-center gap-2">
                           <div className="w-1 h-1 rounded-full bg-emerald-500" /> {item}
                         </li>
                       ))}
                    </ul>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600">Pro Checklist</h4>
              <div className="space-y-4">
                 {[
                   "Is the user problem clearly defined?",
                   "Are assumptions called out?",
                   "Do you have visual artifacts?",
                   "Are metrics primary/secondary?",
                   "Is the CV link working?",
                   "Did you include a self-reflection?"
                 ].map((text, i) => (
                   <div key={i} className="flex gap-3 items-center text-xs font-bold text-zinc-700">
                     <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                     {text}
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-indigo-900 leading-relaxed">
                Tip: The best portfolios show evolution. Include a "v2" for one project to show you can iterate based on feedback.
              </p>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const UserIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);