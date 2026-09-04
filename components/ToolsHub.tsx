import React from 'react';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  ArrowRight, 
  ArrowUpRight,
  Sparkles, 
  ShieldCheck, 
  Rocket,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ToolsHub: React.FC = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: "LinkedIn Profile Optimiser",
      description: "Turn your LinkedIn profile into a recruiter-ready profile with AI-powered recommendations.",
      icon: Linkedin,
      iconContainerStyle: "bg-blue-50 text-blue-600 border border-blue-100/80",
      features: [
        "Headline Generator", 
        "About Section Audit", 
        "Search SEO Check"
      ],
      action: "/tools/linkedin-optimiser",
      cta: "OPTIMIZE PROFILE"
    },
    {
      title: "PM Resume Auditor",
      description: "Find the biggest weaknesses in your PM resume and get high-leverage improvements.",
      icon: Award,
      iconContainerStyle: "bg-purple-50 text-purple-600 border border-purple-100/80",
      features: [
        "Impact & Metric Scoring (35%)", 
        "PM Ownership Framing (30%)", 
        "ATS Readability & Bullet Rewrites"
      ],
      action: "/tools/resume-auditor",
      cta: "AUDIT RESUME"
    }
  ];

  const handleAction = (tool: { action: string }) => {
    if (tool.action.startsWith('http')) {
      window.open(tool.action, '_blank');
    } else {
      navigate(tool.action);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-16 sm:pb-20"
    >
      {/* 1. Hero Section - Compact, balanced, deep dark-to-purple gradient */}
      <header className="relative w-full bg-zinc-950 rounded-2xl sm:rounded-3xl md:rounded-[2rem] px-6 py-7 sm:px-9 sm:py-8 md:px-11 md:py-9 text-white overflow-hidden shadow-xl shadow-zinc-950/20 border border-zinc-800/60 mb-8">
        {/* Subtle deep purple/indigo radial glow in top right */}
        <div 
          className="absolute top-0 right-0 w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] bg-gradient-to-bl from-purple-700/20 via-indigo-600/15 to-transparent rounded-full blur-[70px] sm:blur-[100px] -translate-y-1/3 translate-x-1/4 pointer-events-none" 
          aria-hidden="true"
        />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-indigo-300 text-[10px] font-black uppercase tracking-wider mb-3 sm:mb-3.5 backdrop-blur-md">
            <Sparkles className="w-3 h-3 fill-current" /> 
            <span>CAREER ACCELERATION SUITE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight leading-[1.08] text-white">
            Tools to Get <br/>
            You <span className="text-[#79BAEC]">Hired.</span>
          </h1>

          <p className="text-zinc-400 text-xs sm:text-sm md:text-[15px] leading-relaxed font-medium max-w-xl">
            Don't just learn. Ship your professional identity. These tools ensure your work gets noticed by the right recruiters.
          </p>
        </div>
      </header>

      {/* 2 & 3. Tool Cards Grid (Target gap: 32px / mb-8 above) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
        {tools.map((tool) => (
          <div 
            key={tool.title}
            className="group bg-white rounded-2xl sm:rounded-3xl border border-zinc-200/90 p-6 sm:p-7 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-zinc-300/90 transition-all duration-200"
          >
            <div className="flex flex-col flex-grow">
              {/* Card Hierarchy: 1. Icon (40x40px, soft tinted background) */}
              <div className="mb-5">
                <div className={`w-10 h-10 rounded-xl ${tool.iconContainerStyle} flex items-center justify-center`}>
                  <tool.icon className="w-5 h-5" />
                </div>
              </div>

              {/* 2. Tool Name */}
              <h2 className="text-xl sm:text-[22px] font-black tracking-tight text-zinc-900 mb-2">
                {tool.title}
              </h2>

              {/* 3. Outcome-focused description */}
              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                {tool.description}
              </p>

              {/* 4. Key Capabilities */}
              <div className="space-y-2.5 mb-8">
                {tool.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold text-zinc-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Primary CTA - Aligned at exact same vertical position */}
            <button 
              type="button"
              onClick={() => handleAction(tool)}
              className="w-full h-12 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between transition-all duration-200 ease-out shadow-sm hover:shadow-md cursor-pointer group/btn"
            >
              <span>{tool.cta}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover/btn:translate-x-1" />
            </button>
          </div>
        ))}
      </div>

      {/* 9. Manual Review Section (Target gap: 40-44px from cards -> mt-10 sm:mt-11) */}
      <div className="mt-10 sm:mt-11 w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 border border-zinc-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-indigo-50 border border-indigo-100/70 text-indigo-600 flex items-center justify-center shrink-0">
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-black text-zinc-900 tracking-tight leading-snug">
              Need a manual review?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 font-medium leading-normal mt-0.5">
              Get 1-on-1 feedback from a senior PM working at a top tech firm.
            </p>
          </div>
        </div>

        <a 
          href="https://docs.google.com/forms/u/0/d/1gntWQiHg_RBueOSOqZzVQiJ4UGfMIvyuAYUsiuxbOUc/preview" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#79BAEC] hover:bg-[#68a9db] text-zinc-950 font-black text-xs uppercase tracking-wider transition-all duration-150 shadow-sm hover:shadow flex items-center justify-center gap-1.5 shrink-0"
        >
          <span>BOOK A REVIEW</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};