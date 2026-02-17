import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSearch, ArrowLeft, Loader2, Sparkles, 
  Copy, Check, Info, ShieldCheck, Zap, 
  Bot, ExternalLink, Send,
  Trash2, AlertTriangle, FileText, Target, Eye, TrendingUp, Search,
  Globe, UserCheck, Plus, X, Coffee, List,
  BarChart3, Layout, CheckCircle2, XCircle, ChevronRight,
  TrendingDown, PieChart, Layers, Filter, MessageSquare
} from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

interface ContextType {
  isCollapsed: boolean;
}

// Badge component for priorities and match types
const StatusBadge: React.FC<{ type: string }> = ({ type }) => {
  const normalized = type.toLowerCase().trim();
  
  if (normalized.includes('critical')) return <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[9px] font-black uppercase border border-rose-200">Critical</span>;
  if (normalized.includes('important')) return <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 text-[9px] font-black uppercase border border-amber-200">Important</span>;
  if (normalized.includes('contextual')) return <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-[9px] font-black uppercase border border-zinc-200">Context</span>;
  
  if (normalized === 'yes' || normalized === 'exact' || normalized.includes('matched')) return <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase border border-emerald-200">Match Found</span>;
  if (normalized === 'semantic') return <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[9px] font-black uppercase border border-indigo-200">Semantic</span>;
  if (normalized === 'partial') return <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[9px] font-black uppercase border border-blue-200">Partial</span>;
  if (normalized === 'no' || normalized === 'missing' || normalized.includes('gap')) return <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-400 text-[9px] font-black uppercase border border-rose-100">Gap / Missing</span>;

  return <span className="px-2 py-0.5 rounded-md bg-zinc-50 text-zinc-400 text-[9px] font-black uppercase border border-zinc-100">{type}</span>;
};

// Main Dashboard Parser for the AI Output
const CVReportDashboard: React.FC<{ text: string }> = ({ text }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const rawSections = useMemo(() => {
    return text.split('---').map(p => p.trim()).filter(Boolean);
  }, [text]);

  const clean = (val: string) => val.replace(/\*\*|\*/g, '').trim();

  const score = useMemo(() => {
    const match = text.match(/(?:Score:?\s*)(\d+)(?:\/100)/i) || text.match(/(\d+)\/100/);
    return match ? parseInt(match[1]) : 0;
  }, [text]);

  const rating = useMemo(() => {
    const match = text.match(/Rating:\s*(\w+)/i);
    return match ? match[1] : 'N/A';
  }, [text]);

  const navItems = [
    { id: 'overview', label: 'Overall Match', icon: BarChart3 },
    { id: 'missing', label: 'Missing Gaps', icon: AlertTriangle },
    { id: 'optimized', label: 'Optimized Experience', icon: Sparkles },
    { id: 'formatting', label: 'Format Audit', icon: Layout }
  ];

  // Map raw section blocks to the active tab
  const filteredSections = useMemo(() => {
    return rawSections.filter(section => {
      const lines = section.split('\n').filter(Boolean);
      const headerLine = lines.find(l => l.trim().startsWith('##'));
      if (!headerLine) return false;
      const sectionTitle = clean(headerLine.replace('##', '')).toUpperCase();

      if (activeSection === 'overview') {
        return sectionTitle.includes('SCORE') || sectionTitle.includes('FIT') || sectionTitle.includes('CHECKLIST');
      }
      if (activeSection === 'missing') {
        return sectionTitle.includes('MISSING') || sectionTitle.includes('RISK');
      }
      if (activeSection === 'optimized') {
        return sectionTitle.includes('EXPERIENCE');
      }
      if (activeSection === 'formatting') {
        return sectionTitle.includes('FORMATTING');
      }
      return false;
    });
  }, [rawSections, activeSection]);

  return (
    <div className="flex flex-col h-full">
      {/* HEADER SECTION - STICKY WRAPPER */}
      <div className="sticky top-0 z-40 bg-white pt-2 space-y-6 pb-4 border-b border-zinc-50">
        {/* BIG HERO SCORE BANNER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-stretch">
          <div className="md:col-span-8 bg-zinc-950 rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-center shadow-xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 rounded-full text-indigo-400 text-[9px] font-black uppercase tracking-[0.2em]">
                Recruiter Logic Evaluation
              </div>
              <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter leading-none">
                {score}<span className="text-zinc-700 text-2xl not-italic ml-2 font-black">/100</span>
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                <div className={`px-4 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg ${
                  score >= 85 ? 'bg-emerald-500 text-white' : 
                  score >= 70 ? 'bg-indigo-500 text-white' : 
                  score >= 50 ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                }`}>
                  {rating} Match
                </div>
                <p className="text-zinc-400 text-[10px] font-medium italic">Based on high-precision alignment analysis (Temp: 0).</p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-4 bg-white border border-zinc-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl border-2 border-indigo-50 flex items-center justify-center mx-auto shadow-sm">
                {score >= 85 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <TrendingUp className="w-4 h-4 text-indigo-600" />}
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-zinc-400 tracking-[0.2em] mb-0.5">
                  {score >= 85 ? 'Status' : 'Next Goal'}
                </p>
                <p className="text-lg font-black text-zinc-900 tracking-tight">
                  {score >= 85 ? 'Excellent' : 'Aim for 85+'}
                </p>
              </div>
              <p className="text-[10px] font-bold text-zinc-500 leading-tight">
                {score >= 85 
                  ? 'Highly competitive profile.' 
                  : 'Optimize the gaps identified below.'}
              </p>
            </div>
          </div>
        </div>

        {/* REPORT SECTIONS ROW */}
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-2">Report Sections</p>
          <div className="bg-zinc-50/50 p-1.5 rounded-2xl border border-zinc-100 flex items-center gap-1 overflow-x-auto no-scrollbar shadow-inner">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActiveSection(item.id)}
                className={`whitespace-nowrap px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2.5 transition-all
                  ${activeSection === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-[1.02]' 
                    : 'text-zinc-400 hover:bg-white hover:text-zinc-900'}`}
              >
                <item.icon className={`w-3.5 h-3.5 ${activeSection === item.id ? 'text-white' : 'text-zinc-300'}`} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="mt-8 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12"
          >
            {filteredSections.map((section, idx) => {
              const lines = section.split('\n').filter(Boolean);
              const headerLine = lines.find(l => l.trim().startsWith('##'));
              const sectionTitle = clean(headerLine?.replace('##', '') || '');
              const contentLines = lines.filter(l => !l.trim().startsWith('##'));
              const isTable = contentLines.some(l => l.includes('|'));

              return (
                <div key={idx} className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-6">
                    <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] whitespace-nowrap">{sectionTitle}</h3>
                    <div className="h-[1px] flex-1 bg-zinc-100"></div>
                  </div>

                  {isTable ? (
                    <div className="bg-white border border-zinc-100 rounded-[2rem] overflow-hidden shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-100">
                              {contentLines[0].split('|').filter(s => s.trim() !== '').map((h, i) => (
                                <th key={i} className="px-8 py-4 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                                  {clean(h)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {contentLines.slice(2).map((row, rIdx) => {
                              const cells = row.split('|').filter(s => s.trim() !== '');
                              if (cells.length < 2) return null;
                              return (
                                <tr key={rIdx} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                                  {cells.map((cell, cIdx) => (
                                    <td key={cIdx} className="px-8 py-3.5">
                                      {cIdx === 0 ? (
                                        <span className="text-xs font-black text-zinc-900">{clean(cell)}</span>
                                      ) : (
                                        <StatusBadge type={clean(cell)} />
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-5">
                      {contentLines.map((line, lIdx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;

                        if (trimmed.match(/^\d\./)) {
                          const [key, details] = trimmed.split(':');
                          return (
                            <div key={lIdx} className="p-6 bg-rose-50/30 border border-rose-100 rounded-2xl flex items-start gap-4 group hover:bg-rose-50/50 transition-colors">
                              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                                <XCircle className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-sm font-black text-zinc-900">{clean(key)}</h4>
                                <p className="text-xs font-medium text-rose-700/80 leading-relaxed">{clean(details || '')}</p>
                              </div>
                            </div>
                          );
                        }

                        if (trimmed.startsWith('OPTIMIZED:')) {
                          return (
                            <div key={lIdx} className="p-8 bg-zinc-950 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-zinc-800">
                              <div className="absolute top-0 right-0 p-8 opacity-5"><MessageSquare className="w-32 h-32 text-indigo-400" /></div>
                              <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                                    <Sparkles className="w-4 h-4" />
                                  </div>
                                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400">ATS Optimized Experience</span>
                                </div>
                                <p className="text-lg font-bold leading-relaxed tracking-tight">"{clean(trimmed.replace('OPTIMIZED:', ''))}"</p>
                              </div>
                            </div>
                          );
                        }

                        if (trimmed.includes('HIGH RISK')) {
                          return (
                            <div key={lIdx} className="p-5 bg-rose-600 text-white rounded-2xl flex items-center gap-4 shadow-lg">
                              <AlertTriangle className="w-5 h-5 shrink-0" />
                              <p className="text-[10px] font-black uppercase tracking-widest">{clean(trimmed)}</p>
                            </div>
                          );
                        }

                        return (
                          <div key={lIdx} className="flex gap-4 items-start pl-4 group">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0 opacity-40 group-hover:opacity-100" />
                            <p className="text-sm font-medium text-zinc-500 leading-relaxed">{clean(trimmed)}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            
            {filteredSections.length === 0 && (
              <div className="py-20 text-center bg-zinc-50 rounded-[2rem] border border-dashed border-zinc-200">
                <Info className="w-8 h-8 text-zinc-300 mx-auto mb-3" />
                <p className="text-zinc-400 font-bold">No data processed for this category.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export const CVAnalyser: React.FC = () => {
  const navigate = useNavigate();
  const { isCollapsed } = useOutletContext<ContextType>();
  
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedResult, setCopiedResult] = useState(false);

  const SYSTEM_PROMPT = `You are a high-precision ATS Optimization Engine. Your goal is to map a user's CV against a Job Description (JD) to identify exact matches and actionable gaps.

PRECISION RULES:
- Temperature is 0. Be deterministic.
- For identical inputs, your score and content must be identical.
- NO markdown formatting stars (*) or bold (**). Use plain text only.
- Use horizontal separators --- between major blocks.

STRICT SCORING ALGORITHM (Internal logic for score consistency):
- Hard Skills Match: 40 pts
- Experience Relevance: 30 pts
- Keyword Density: 20 pts
- Education/Seniority: 10 pts

OUTPUT FORMAT (MANDATORY):

## 📊 OVERALL ATS MATCH SCORE
Score: [XX/100]
Rating: [Excellent/Good/Fair/Poor]
Explanation: [2-3 sentences justifying the exact score]

---

## ❌ MISSING CRITICAL KEYWORDS
1. [Keyword]: Precise context on why it matters for this specific JD + Suggested phrasing to include in CV.

---

## ✨ ATS-OPTIMIZED EXPERIENCE BULLETS
OPTIMIZED: [Rewritten bullet from the CV that incorporates missing JD keywords while retaining honesty]
IMPROVEMENTS: [Specific technical context]

---

## 📋 FORMATTING & STRUCTURE REVIEW
Element: [Status] - [Detailed Recommendation for ATS parseability]

---

## 🚨 ATS RISK WARNINGS
HIGH RISK: [Identify graphics, column issues, or font risks]
FIX: [Specific technical corrective steps]

---

## 🎯 ROLE FIT ESTIMATION
Classification: [Fit Level]
Gaps: [Detailed summary of missing domains]
Interview Probability: [Rating]

---

## ✅ FINAL ACTION CHECKLIST
1. [Priority Action 1]
2. [Priority Action 2]`;

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 98) return prev;
          return prev + (Math.random() * 8);
        });
      }, 700);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleScan = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;

    setIsGenerating(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `RESUME CONTENT:\n${resumeText}\n\nTARGET JOB DESCRIPTION:\n${jobDescription}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0, // Deterministic results
        },
      });

      if (response.text) {
        setProgress(100);
        setTimeout(() => {
          setAnalysisResult(response.text!);
          setIsGenerating(false);
        }, 500);
      } else {
        throw new Error("Analysis failed. Try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Connection failure.");
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.replace(/\*\*|\*/g, ''));
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2000);
  };

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
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 shadow-sm">
                <FileSearch className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter">CV Analyser & ATS Matcher</h1>
           </div>
           <p className="text-zinc-500 font-medium max-w-xl italic">Recruiter-grade audit using precise semantic matching (Temperature 0).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        
        {/* Input Pane */}
        {!analysisResult && (
          <div className="w-full">
            <div className="bg-white border border-zinc-100 rounded-[3rem] p-8 md:p-12 shadow-sm space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Your Resume Content</label>
                   </div>
                   <textarea 
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Paste your full resume text here..."
                      className="w-full h-80 p-6 bg-zinc-50 rounded-3xl border border-zinc-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm font-medium text-zinc-700 no-scrollbar resize-none shadow-inner"
                   />
                </div>

                <div className="space-y-4">
                   <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-600" />
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Job Description</label>
                   </div>
                   <textarea 
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the target job description here..."
                      className="w-full h-80 p-6 bg-zinc-50 rounded-3xl border border-zinc-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm font-medium text-zinc-700 no-scrollbar resize-none shadow-inner"
                   />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 pt-6 border-t border-zinc-50">
                <button 
                  onClick={handleScan}
                  disabled={isGenerating || !resumeText.trim() || !jobDescription.trim()}
                  className="w-full md:w-auto px-12 py-5 bg-zinc-950 hover:bg-black disabled:bg-zinc-100 disabled:text-zinc-300 disabled:cursor-not-allowed text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 transition-all group"
                >
                  {isGenerating ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing Match...
                    </>
                  ) : (
                    <>
                        <Zap className="w-5 h-5 text-indigo-400 fill-current group-hover:scale-110 transition-transform" />
                        Run High-Precision Scan
                    </>
                  )}
                </button>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                   <ShieldCheck className="w-4 h-4 text-emerald-500" />
                   Industry-Standard ATS Ranking
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Pane */}
        <div className="w-full">
           <AnimatePresence mode="wait">
              {isGenerating ? (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="h-full min-h-[500px] bg-white border border-zinc-100 rounded-[4rem] flex flex-col items-center justify-center p-12 text-center space-y-10 shadow-sm"
                 >
                    <div className="relative">
                       <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="w-40 h-40 rounded-full border-4 border-dashed border-indigo-100"
                       />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <BarChart3 className="w-12 h-12 text-indigo-600 animate-pulse" />
                       </div>
                    </div>
                    
                    <div className="w-full max-w-sm space-y-4">
                       <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                          <span>Scanning JD Keywords...</span>
                          <span>{Math.round(progress)}%</span>
                       </div>
                       <div className="h-2 w-full bg-zinc-50 rounded-full overflow-hidden border border-zinc-100">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${progress}%` }}
                             className="h-full bg-indigo-600 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                          />
                       </div>
                    </div>
                    <p className="text-sm font-bold text-zinc-400 italic">Performing deterministic scoring (Temp: 0)...</p>
                 </motion.div>
              ) : analysisResult ? (
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-0 flex flex-col min-h-screen"
                 >
                    {/* Sticky Header Banner */}
                    <div className="flex items-center justify-between bg-zinc-950 p-4 rounded-t-[3rem] border-x border-t border-zinc-800 sticky top-0 z-50 shadow-2xl">
                       <div className="flex items-center gap-3 pl-4 md:pl-8">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                          <span className="text-[9px] font-black uppercase text-white tracking-[0.3em] whitespace-nowrap">Recruiter Audit Dashboard</span>
                       </div>
                       <div className="flex gap-2 md:gap-4 pr-2 md:pr-4">
                          <button 
                            onClick={() => {setAnalysisResult(null); setResumeText(''); setJobDescription('');}}
                            className="px-3 md:px-6 py-2 md:py-2.5 text-zinc-500 font-black text-[9px] uppercase tracking-widest hover:text-rose-500 transition-colors"
                          >
                            Discard
                          </button>
                          <button 
                            onClick={() => copyToClipboard(analysisResult)}
                            className={`px-3 md:px-6 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg
                              ${copiedResult ? 'bg-emerald-600 text-white' : 'bg-[#79BAEC] text-zinc-950 hover:bg-white'}`}
                          >
                             {copiedResult ? <Check className="w-3 h-3 md:w-4 md:h-4" /> : <Copy className="w-3 h-3 md:w-4 md:h-4" />}
                             <span className="hidden sm:inline">{copiedResult ? 'Copied' : 'Copy Full Report'}</span>
                             <span className="sm:hidden">{copiedResult ? 'Copied' : 'Copy'}</span>
                          </button>
                       </div>
                    </div>

                    <div className="bg-white border-x border-b border-zinc-100 rounded-b-[3rem] p-4 md:p-10 lg:p-12 shadow-2xl relative flex-1 overflow-visible">
                       <CVReportDashboard text={analysisResult} />
                    </div>
                 </motion.div>
              ) : error ? (
                 <div className="bg-rose-50 border border-rose-100 rounded-[3rem] p-12 text-center space-y-6">
                    <AlertTriangle className="w-16 h-16 text-rose-500 mx-auto" />
                    <h3 className="text-2xl font-black text-rose-900">Scan Failed</h3>
                    <p className="text-sm font-medium text-rose-700/80 max-w-sm mx-auto">{error}</p>
                    <button onClick={handleScan} className="px-8 py-3 bg-rose-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition-all">Retry Analysis</button>
                 </div>
              ) : null}
           </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};