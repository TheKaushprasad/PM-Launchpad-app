import React from 'react';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Rocket,
  ExternalLink
} from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';

interface ContextType {
  isCollapsed: boolean;
}

export const ToolsHub: React.FC = () => {
  const navigate = useNavigate();
  const { isCollapsed } = useOutletContext<ContextType>();

  const tools = [
    {
      title: "LinkedIn Profile Optimiser",
      description: "Increase profile visibility. Use our AI agent to turn your profile into a recruiter magnet.",
      icon: Linkedin,
      color: "bg-blue-50 text-blue-600",
      accent: "blue",
      features: ["Headline Generator", "About Section Audit", "Search SEO Check"],
      action: "/tools/linkedin-optimiser",
      cta: "Optimize Profile"
    }
  ];

  const handleAction = (tool: any) => {
    if (tool.action.startsWith('http')) {
      window.open(tool.action, '_blank');
    } else {
      navigate(tool.action);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`pb-20 transition-all duration-500 mx-auto ${isCollapsed ? 'max-w-[1600px] px-4 md:px-12' : 'max-w-[1200px] px-4 md:px-6'}`}
    >
      <header className="relative bg-zinc-950 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 text-white overflow-hidden shadow-2xl mb-12">
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-600/20 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 fill-current" /> 
                Career Acceleration Suite
            </div>
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.95]">
                Tools to Get <br/>
                You <span className="text-[#79BAEC]">Hired.</span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-xl max-w-2xl leading-relaxed font-medium">
                Don't just learn. Ship your professional identity. These tools ensure your work gets noticed by the right recruiters.
            </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {tools.map((tool, idx) => (
          <motion.div 
            key={tool.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white rounded-[2.8rem] border border-zinc-100 p-2 h-full flex flex-col transition-all duration-700 hover:border-indigo-100 hover:shadow-[0_32px_64px_rgba(79,70,229,0.12)]"
          >
            <div className="flex flex-col h-full rounded-[2.4rem] p-8 bg-white group-hover:bg-zinc-50/50 transition-colors duration-500">
              <div className={`w-14 h-14 rounded-2xl ${tool.color} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}>
                <tool.icon className="w-7 h-7" />
              </div>

              <h3 className="font-black text-2xl mb-4 tracking-tighter text-zinc-900 group-hover:text-indigo-600 transition-colors">
                {tool.title}
              </h3>
              
              <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-8 flex-grow">
                {tool.description}
              </p>

              <div className="space-y-3 mb-10">
                {tool.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-3 text-xs font-bold text-zinc-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    {feat}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleAction(tool)}
                className="mt-auto flex items-center justify-between w-full p-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest group-hover:bg-indigo-600 transition-all shadow-lg"
              >
                {tool.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-[3rem] p-8 md:p-12 border border-zinc-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-xl">
            <Rocket className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-xl font-black text-zinc-900 tracking-tight">Need a manual review?</h4>
            <p className="text-sm font-medium text-zinc-500">Get 1-on-1 feedback from working PMs at top tech firms.</p>
          </div>
        </div>
        <a 
          href="https://docs.google.com/forms/u/0/d/1gntWQiHg_RBueOSOqZzVQiJ4UGfMIvyuAYUsiuxbOUc/preview" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-8 py-4 bg-[#79BAEC] text-zinc-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all shadow-lg flex items-center gap-2"
        >
          Book a Review <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};