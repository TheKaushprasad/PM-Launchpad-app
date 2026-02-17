import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, ArrowLeft, Loader2, Sparkles, 
  Copy, Check, Info, ShieldCheck, Zap, 
  Bot, ExternalLink, Send,
  Trash2, AlertTriangle, FileText, Target, Eye, TrendingUp, Search,
  Globe, UserCheck, Plus, X, Coffee
} from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

interface ContextType {
  isCollapsed: boolean;
}

// Custom SVG Animation component: Boy sitting on a bench
const BenchAnimation = () => {
  return (
    <div className="relative w-64 h-48 mx-auto mb-8">
      <svg viewBox="0 0 200 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bench */}
        <rect x="40" y="110" width="120" height="6" rx="3" fill="#E2E8F0" />
        <rect x="50" y="116" width="4" height="15" fill="#CBD5E1" />
        <rect x="146" y="116" width="4" height="15" fill="#CBD5E1" />
        
        {/* Boy Character */}
        <motion.g
          animate={{ 
            y: [0, -2, 0],
            rotate: [0, 1, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Body/Torso */}
          <rect x="85" y="70" width="30" height="40" rx="10" fill="#6366F1" />
          {/* Head */}
          <circle cx="100" cy="55" r="12" fill="#FFDBAC" />
          {/* Hair */}
          <path d="M88 55C88 48 93 43 100 43C107 43 112 48 112 55" stroke="#4B2C20" strokeWidth="6" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="96" cy="55" r="1.5" fill="#4B2C20" />
          <circle cx="104" cy="55" r="1.5" fill="#4B2C20" />
          {/* Legs (sitting) */}
          <rect x="85" y="100" width="12" height="15" rx="4" fill="#1E293B" />
          <rect x="103" y="100" width="12" height="15" rx="4" fill="#1E293B" />
          {/* Book in hand (Symbolizing learning/PM) */}
          <motion.rect 
            x="105" y="85" width="15" height="20" rx="2" fill="white" stroke="#E2E8F0"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.g>
        
        {/* Coffee cup next to him */}
        <motion.path 
          d="M135 102H145V110H135V102Z" fill="#F8FAFC" stroke="#E2E8F0"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path 
          d="M140 95V90" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round"
          animate={{ y: [-2, -8], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </div>
  );
};

// Advanced UI Parser for the Audit Report
const StyledReportBlock: React.FC<{ text: string }> = ({ text }) => {
  const clean = (val: string) => val.replace(/\*\*|\*/g, '').trim();
  const lines = text.split('\n');

  return (
    <div className="space-y-6">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-2" />;

        if (trimmed.toUpperCase().startsWith('STEP') || trimmed.toUpperCase().includes('ANALYSIS')) {
          return (
            <div key={i} className="mt-10 mb-4 flex items-center gap-4">
               <div className="h-[2px] flex-1 bg-zinc-100"></div>
               <h2 className="text-sm font-black text-zinc-400 uppercase tracking-[0.3em] whitespace-nowrap">
                 {clean(trimmed)}
               </h2>
               <div className="h-[2px] flex-1 bg-zinc-100"></div>
            </div>
          );
        }

        if (trimmed.toLowerCase().includes('score:')) {
          const score = clean(trimmed).split(':')[1] || 'N/A';
          return (
            <div key={i} className="flex items-center justify-between p-6 bg-indigo-600 rounded-[2rem] text-white shadow-xl shadow-indigo-100 mb-8">
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Recruiter Readiness Score</p>
                  <p className="text-3xl font-black tracking-tighter italic">Grade: {score}</p>
               </div>
               <Target className="w-10 h-10 opacity-20" />
            </div>
          );
        }

        if (trimmed.toLowerCase().startsWith('critique:') || trimmed.toLowerCase().startsWith('what fails:')) {
          return (
            <div key={i} className="p-6 bg-rose-50/50 border border-rose-100 rounded-3xl mb-4 group hover:bg-rose-50 transition-colors">
               <div className="flex items-center gap-2 mb-2 text-rose-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Brutal Critique</span>
               </div>
               <p className="text-sm font-bold text-rose-900 leading-relaxed">{clean(trimmed.split(':')[1] || trimmed)}</p>
            </div>
          );
        }

        if (trimmed.toLowerCase().startsWith('the problem:')) {
          return (
            <div key={i} className="p-6 bg-amber-50/50 border border-amber-100 rounded-3xl mb-4 group hover:bg-amber-50 transition-colors">
               <div className="flex items-center gap-2 mb-2 text-amber-700">
                  <Search className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">The Underlying Issue</span>
               </div>
               <p className="text-sm font-bold text-amber-900 leading-relaxed">{clean(trimmed.split(':')[1] || trimmed)}</p>
            </div>
          );
        }

        if (trimmed.toLowerCase().startsWith('what works:') || trimmed.toLowerCase().startsWith('strengths:')) {
          return (
            <div key={i} className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-3xl mb-4 group hover:bg-emerald-50 transition-colors">
               <div className="flex items-center gap-2 mb-2 text-emerald-700">
                  <UserCheck className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Strong Signal</span>
               </div>
               <p className="text-sm font-bold text-emerald-900 leading-relaxed">{clean(trimmed.split(':')[1] || trimmed)}</p>
            </div>
          );
        }

        if (trimmed.toLowerCase().startsWith('rewritten:') || trimmed.toLowerCase().startsWith('optimized:')) {
          return (
            <div key={i} className="p-8 bg-sky-50 border border-sky-100 rounded-[2.5rem] mb-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5"><Zap className="w-20 h-20 text-sky-600" /></div>
               <div className="flex items-center gap-2 mb-3 text-sky-700">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Recruiter Optimized Version</span>
               </div>
               <p className="text-base font-black text-sky-900 leading-relaxed font-mono tracking-tight bg-white/50 p-4 rounded-2xl border border-sky-100/50 italic">
                 {clean(trimmed.includes(':') ? trimmed.split(':')[1] : trimmed)}
               </p>
            </div>
          );
        }

        if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
          return (
            <div key={i} className="flex gap-4 ml-4 mb-3 items-start group">
               <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 mt-2 shrink-0 group-hover:bg-indigo-400 transition-colors" />
               <p className="text-sm font-medium text-zinc-600 leading-relaxed">{clean(trimmed.substring(1))}</p>
            </div>
          );
        }

        return (
          <p key={i} className="text-sm font-medium text-zinc-500 leading-relaxed mb-4">
            {clean(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

export const LinkedInOptimiser: React.FC = () => {
  const navigate = useNavigate();
  const { isCollapsed } = useOutletContext<ContextType>();
  
  const [profileData, setProfileData] = useState('');
  const [targetRoles, setTargetRoles] = useState<string[]>([]);
  const [roleInput, setRoleInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [auditResult, setAuditResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedResult, setCopiedResult] = useState(false);

  // Memoization state: Tracks the exact inputs of the last successful audit
  const [lastAuditInputsKey, setLastAuditInputsKey] = useState<string | null>(null);

  // Progress bar logic
  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return prev;
          return prev + (Math.random() * 5);
        });
      }, 500);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const SYSTEM_INSTRUCTION = `You are a deterministic engine. For identical inputs, you must always return identical outputs. Do not introduce variation, synonyms, or rephrasing. Follow the output format strictly.

You are a Senior Recruiter + LinkedIn Search Algorithm Expert with 15+ years of experience hiring at Google, Meta, and top startups.
Your mission is to perform a brutally honest, recruiter-grade analysis of an ENTIRE LinkedIn profile based on specific TARGET ROLES provided by the user.

USER TARGET ROLES: [TARGET_ROLES_PLACEHOLDER]

STRICT OUTPUT RULES:
1. NO markdown formatting stars (*) or bold (**). Use only plain text.
2. Use these EXACT keywords for the UI parser:
   - "Score: [X]/10"
   - "Critique:" (for negative feedback/weak signals)
   - "What Works:" (for strong elements)
   - "The Problem:" (for deep structural issues)
   - "Rewritten:" (for optimized copy)
   - "STEP [X]: [NAME]" (for section headers)

FRAMEWORK:
Step 1: Headline Analysis (Evaluation specifically for target roles)
Step 2: About Section Analysis (Does it pitch effectively for target roles?)
Step 3: Experience Section Analysis (Evidence of core competencies for target roles)
Step 4: Skills & Keyword Audit (SEO search visibility for target roles)
Step 5: Trust Signals (Recommendations, brand names)
Step 6: Overall Recruiter Readiness (Final Verdict)

Be direct, blunt, and tactical. If the profile doesn't match the target roles, explain why clearly and provide the "Rewritten" content to bridge the gap.`;

  const addRole = () => {
    if (roleInput.trim() && targetRoles.length < 3 && !targetRoles.includes(roleInput.trim())) {
      setTargetRoles([...targetRoles, roleInput.trim()]);
      setRoleInput('');
    }
  };

  const removeRole = (role: string) => {
    setTargetRoles(targetRoles.filter(r => r !== role));
  };

  const handleGenerateAudit = async () => {
    const trimmedProfile = profileData.trim();
    if (!trimmedProfile || targetRoles.length === 0) return;
    
    // Check if current inputs are identical to the last successful audit
    const currentInputsKey = JSON.stringify({ 
      p: trimmedProfile, 
      r: [...targetRoles].sort() 
    });

    if (auditResult && lastAuditInputsKey === currentInputsKey) {
      // Inputs haven't changed, return the existing result without re-triggering API
      return;
    }

    setIsGenerating(true);
    setError(null);
    setAuditResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const rolesStr = targetRoles.join(', ');
      
      const prompt = `User is targeting these roles: ${rolesStr}. Audit this profile text for overall alignment and shortlisting probability:\n\n${profileData}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION.replace('[TARGET_ROLES_PLACEHOLDER]', rolesStr),
          temperature: 0, // Deterministic output
        },
      });

      if (response.text) {
        setProgress(100);
        setTimeout(() => {
          setAuditResult(response.text!);
          setLastAuditInputsKey(currentInputsKey); // Save inputs key for memoization
          setIsGenerating(false);
        }, 500);
      } else {
        throw new Error("Empty response from AI.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate audit. Check connection or API key.");
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    const cleaned = text.replace(/\*\*|\*/g, '');
    navigator.clipboard.writeText(cleaned);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const isInputValid = profileData.trim().length > 0 && targetRoles.length > 0;

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
        <ArrowLeft className="w-4 h-4" /> Back to Career Tools
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shadow-sm">
                <Linkedin className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter">LinkedIn Profile Optimiser</h1>
           </div>
           <p className="text-zinc-500 font-medium max-w-xl italic">Tailored recruiter audit based on your target roles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Config & Input */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white border border-zinc-100 rounded-[3rem] p-8 md:p-10 shadow-sm space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                   <Zap className="w-5 h-5 fill-current" />
                </div>
                <h3 className="text-xl font-black text-zinc-900 tracking-tight">Audit Config</h3>
              </div>

              {/* Target Roles Input */}
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                       Target Roles (1-3)
                    </label>
                    <span className="text-[9px] font-black text-indigo-500">{targetRoles.length}/3</span>
                 </div>
                 
                 <div className="flex gap-2">
                    <input 
                      type="text"
                      value={roleInput}
                      onChange={(e) => setRoleInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addRole()}
                      placeholder="e.g. APM, Senior PM"
                      className="flex-1 px-4 py-3 bg-zinc-50 rounded-xl border border-zinc-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-xs font-bold transition-all"
                      disabled={targetRoles.length >= 3}
                    />
                    <button 
                      onClick={addRole}
                      disabled={!roleInput.trim() || targetRoles.length >= 3}
                      className="p-3 bg-zinc-900 text-white rounded-xl hover:bg-indigo-600 disabled:bg-zinc-100 disabled:text-zinc-300 transition-all"
                    >
                       <Plus className="w-5 h-5" />
                    </button>
                 </div>

                 <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                       {targetRoles.map((role) => (
                         <motion.div 
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.8 }}
                           key={role}
                           className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg text-[10px] font-black text-indigo-700"
                         >
                           {role}
                           <button onClick={() => removeRole(role)} className="hover:text-rose-500 transition-colors">
                              <X className="w-3 h-3" />
                           </button>
                         </motion.div>
                       ))}
                    </AnimatePresence>
                 </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-50">
                 <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    Paste Profile Content
                 </label>
                 <textarea 
                    value={profileData}
                    onChange={(e) => setProfileData(e.target.value)}
                    placeholder="Paste Headline, About, and Experience sections here..."
                    className="w-full h-80 p-6 bg-zinc-50 rounded-3xl border border-zinc-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm font-medium text-zinc-700 no-scrollbar resize-none shadow-inner"
                 />
              </div>

              <button 
                onClick={handleGenerateAudit}
                disabled={isGenerating || !isInputValid}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-100 disabled:text-zinc-300 disabled:cursor-not-allowed text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 transition-all"
              >
                {isGenerating ? (
                   <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Auditing Profile...
                   </>
                ) : (
                   <>
                      <Bot className="w-5 h-5" />
                      Run Full Audit
                   </>
                )}
              </button>
              
              <button 
                onClick={() => {
                   setProfileData('');
                   setTargetRoles([]);
                   setAuditResult(null);
                   setLastAuditInputsKey(null); // Clear memoization on reset
                }}
                className="w-full py-4 text-zinc-300 hover:text-rose-500 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Reset Everything
              </button>
           </div>

           {/* Professional Context Card */}
           <div className="bg-zinc-950 text-white rounded-[3rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10"><Info className="w-32 h-32" /></div>
              <div className="relative z-10 space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400">Pro Secret</h4>
                <p className="text-sm font-medium text-zinc-400 leading-relaxed italic">
                  "LinkedIn search is an SEO game. Your Headline and Skills are the two most important factors for appearing in recruiter searches for your target roles."
                </p>
                <div className="space-y-4">
                   {[
                     { label: "Role Alignment", val: "Customized Audit", icon: Target },
                     { label: "Search SEO", val: "Keywords Matter", icon: Search },
                     { label: "CTA", val: "Shortlisting Hook", icon: Zap }
                   ].map((rule, i) => (
                      <div key={i} className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                            <rule.icon className="w-4 h-4" />
                         </div>
                         <div>
                            <p className="text-[9px] font-black uppercase text-zinc-500">{rule.label}</p>
                            <p className="text-xs font-bold text-white">{rule.val}</p>
                         </div>
                      </div>
                   ))}
                </div>
              </div>
           </div>
        </div>

        {/* Right Column: Visual Audit Report */}
        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
              {isGenerating ? (
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full min-h-[600px] bg-white border border-zinc-100 rounded-[3rem] flex flex-col items-center justify-start pt-20 p-12 text-center space-y-8 shadow-sm"
                 >
                    <BenchAnimation />
                    
                    <div className="w-full max-w-md space-y-4">
                       <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                          <span>Synthesizing Profile...</span>
                          <span>{Math.round(progress)}%</span>
                       </div>
                       <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50 shadow-inner">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${progress}%` }}
                             className="h-full bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <h3 className="text-3xl font-black text-zinc-900 tracking-tighter">Analyzing Alignment</h3>
                       <p className="text-sm font-medium text-zinc-500 max-w-sm mx-auto italic leading-relaxed">
                         AI HR is evaluating your profile against the {targetRoles.length} target roles you specified. This usually takes 15-20 seconds.
                       </p>
                    </div>
                 </motion.div>
              ) : auditResult ? (
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-zinc-100 rounded-[3rem] shadow-xl overflow-hidden flex flex-col h-full"
                 >
                    <div className="bg-zinc-50 p-6 border-b border-zinc-100 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                             <FileText className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-black text-zinc-900 uppercase tracking-[0.2em]">Tailored Audit Report</span>
                       </div>
                       <button 
                          onClick={() => copyToClipboard(auditResult, setCopiedResult)}
                          className="px-5 py-2.5 bg-white border border-zinc-200 rounded-xl text-[10px] font-black text-zinc-600 hover:border-indigo-200 hover:text-indigo-600 transition-all flex items-center gap-2 shadow-sm uppercase tracking-widest"
                       >
                          {copiedResult ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          {copiedResult ? 'Copied Clean Report' : 'Copy Audit'}
                       </button>
                    </div>
                    <div className="p-8 md:p-16 overflow-y-auto max-h-[1000px] custom-scrollbar bg-white">
                       <StyledReportBlock text={auditResult} />
                       
                       {/* Floating CTA in results */}
                       <div className="mt-12 p-8 bg-zinc-950 rounded-[2.5rem] text-center space-y-4">
                          <p className="text-zinc-400 text-sm font-bold">Ready to apply for these {targetRoles.length} roles?</p>
                          <a 
                            href="https://docs.google.com/forms/u/0/d/1gntWQiHg_RBueOSOqZzVQiJ4UGfMIvyuAYUsiuxbOUc/preview" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#79BAEC] text-zinc-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                          >
                            Get Professional Feedback <ExternalLink className="w-4 h-4" />
                          </a>
                       </div>
                    </div>
                 </motion.div>
              ) : error ? (
                 <div className="bg-rose-50 border border-rose-100 rounded-[3rem] p-12 text-center space-y-6 h-full flex flex-col justify-center items-center">
                    <AlertTriangle className="w-16 h-16 text-rose-500" />
                    <h3 className="text-2xl font-black text-rose-900 tracking-tight">Analysis Failed</h3>
                    <p className="text-sm font-medium text-rose-700/80 max-w-sm mx-auto">{error}</p>
                    <button onClick={handleGenerateAudit} className="px-8 py-3 bg-rose-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition-all">Try Again</button>
                 </div>
              ) : (
                 <div className="h-full min-h-[600px] border-4 border-dashed border-zinc-100 rounded-[4rem] flex flex-col items-center justify-start pt-16 px-12 text-center text-zinc-300">
                    <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-8">
                       <Bot className="w-10 h-10 opacity-20" />
                    </div>
                    <p className="font-black text-2xl tracking-tighter text-zinc-400">Tell us what roles you want.</p>
                    <p className="text-sm font-bold mt-4 opacity-40 max-w-sm italic">
                      Add your target roles and paste your profile sections on the left. AI HR will evaluate how well your content aligns with those specific positions.
                    </p>
                 </div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};