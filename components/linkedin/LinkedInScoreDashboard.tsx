import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LinkedInAnalysisResult, 
  RecommendationItem, 
  ActionPlanDay, 
  ExperienceRoleAudit, 
  SectionRewrite 
} from '../../types/linkedin';
import { 
  Award, Target, Sparkles, CheckCircle2, AlertTriangle, 
  Copy, Check, ArrowLeft, RefreshCw, ChevronDown, ChevronUp,
  Layers, Search, Eye, TrendingUp, FileText, Briefcase, 
  GraduationCap, ShieldCheck, Zap, Share2, Download, Flame,
  HelpCircle, ExternalLink, Filter, Plus, Lightbulb
} from 'lucide-react';

interface LinkedInScoreDashboardProps {
  analysis: LinkedInAnalysisResult;
  onReAudit: () => void;
}

export const LinkedInScoreDashboard: React.FC<LinkedInScoreDashboardProps> = ({
  analysis,
  onReAudit
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'headline' | 'about' | 'experience' | 'skills' | 'completeness' | 'actionPlan'>('overview');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Interactive Action Plan state
  const [actionPlanState, setActionPlanState] = useState<ActionPlanDay[]>(analysis.actionPlan || []);
  const [recommendationsState, setRecommendationsState] = useState<RecommendationItem[]>(analysis.recommendations || []);

  // Expanded experience roles
  const [expandedRoles, setExpandedRoles] = useState<Record<number, boolean>>({ 0: true });

  // Custom live rewrite generator tool state
  const [customRewriteSection, setCustomRewriteSection] = useState<'headline' | 'about' | 'experience'>('headline');
  const [customInputText, setCustomInputText] = useState<string>('');
  const [isGeneratingCustom, setIsGeneratingCustom] = useState<boolean>(false);
  const [customRewriteResult, setCustomRewriteResult] = useState<any | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleTaskComplete = (dayIdx: number, taskId: string) => {
    setActionPlanState(prev => prev.map((day, dIdx) => {
      if (dIdx !== dayIdx) return day;
      return {
        ...day,
        tasks: day.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed };
          }
          return task;
        })
      };
    }));
  };

  const toggleRecommendationComplete = (id: string) => {
    setRecommendationsState(prev => prev.map(rec => {
      if (rec.id === id) {
        return { ...rec, completed: !rec.completed };
      }
      return rec;
    }));
  };

  const toggleRoleExpand = (idx: number) => {
    setExpandedRoles(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Calculate overall tasks completed
  const totalTasks = actionPlanState.reduce((sum, d) => sum + d.tasks.length, 0);
  const completedTasks = actionPlanState.reduce((sum, d) => sum + d.tasks.filter(t => t.completed).length, 0);
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Grade color helper
  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-emerald-500 text-white';
      case 'B+':
      case 'B':
        return 'bg-indigo-600 text-white';
      case 'C':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-rose-500 text-white';
    }
  };

  const categoriesList = [
    { key: 'headline', label: 'Headline', score: analysis.categories?.headline ?? 0, max: 15, tab: 'headline' },
    { key: 'about', label: 'About', score: analysis.categories?.about ?? 0, max: 15, tab: 'about' },
    { key: 'experience', label: 'Experience', score: analysis.categories?.experience ?? 0, max: 20, tab: 'experience' },
    { key: 'skills', label: 'Skills', score: analysis.categories?.skills ?? 0, max: 10, tab: 'skills' },
    { key: 'education', label: 'Education', score: analysis.categories?.education ?? 0, max: 5, tab: 'overview' },
    { key: 'completeness', label: 'Completeness', score: analysis.categories?.completeness ?? 0, max: 10, tab: 'completeness' },
    { key: 'branding', label: 'Branding', score: analysis.categories?.branding ?? 0, max: 10, tab: 'overview' },
    { key: 'discoverability', label: 'Discoverability', score: analysis.categories?.discoverability ?? 0, max: 10, tab: 'skills' },
  ];

  const handleCustomRewrite = async () => {
    if (!customInputText.trim()) return;
    setIsGeneratingCustom(true);
    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: customRewriteSection,
          currentText: customInputText,
          targetRole: analysis.targetRole
        })
      });
      const data = await res.json();
      if (data.success) {
        setCustomRewriteResult(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingCustom(false);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-4">
        <button
          onClick={onReAudit}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>New LinkedIn Audit</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500 bg-zinc-100/80 px-3 py-1.5 rounded-xl border border-zinc-200/60">
            <span className="font-semibold text-zinc-400">Baseline:</span>
            <strong className="text-zinc-900 font-bold">{analysis.targetRole}</strong>
            {analysis.industry && (
              <>
                <span className="text-zinc-300">•</span>
                <span className="text-zinc-600 font-medium">{analysis.industry}</span>
              </>
            )}
            {analysis.experienceLevel && (
              <>
                <span className="text-zinc-300">•</span>
                <span className="text-zinc-600 font-medium">{analysis.experienceLevel}</span>
              </>
            )}
            {analysis.sourceFileName && (
              <>
                <span className="text-zinc-300">•</span>
                <span className="inline-flex items-center gap-1 text-indigo-700 bg-indigo-50 font-bold px-2 py-0.5 rounded-md border border-indigo-200/60">
                  <FileText className="w-3 h-3 text-indigo-600" />
                  <span>{analysis.sourceFileName}</span>
                </span>
              </>
            )}
          </div>
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Hero Scorecard Section */}
      <section className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950 rounded-[2.5rem] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-zinc-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Main Circular / Prominent Score */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-6 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
            <div className="relative w-36 h-36 flex items-center justify-center rounded-full bg-white/5 border-4 border-indigo-500/30 shrink-0">
              <div className="text-center">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#79BAEC] to-indigo-300">
                  {analysis.overallScore}
                </span>
                <span className="text-xs text-zinc-400 font-bold block">/ 100</span>
              </div>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className={`px-2.5 py-0.5 rounded-full font-black text-xs ${getGradeBadge(analysis.grade)}`}>
                  Grade {analysis.grade}
                </span>
                <span className="text-xs text-zinc-400 font-medium">{analysis.experienceLevel}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug">
                {analysis.verdictLabel}
              </h2>
              <p className="text-zinc-300 text-xs leading-relaxed max-w-sm">
                {analysis.summary}
              </p>
            </div>
          </div>

          {/* 10-Second Recruiter Impression Test */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                <Eye className="w-4 h-4" />
                <span>The 10-Second Recruiter Skim Test</span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed italic">
                "{analysis.recruiterImpression10Sec}"
              </p>
            </div>

            {/* Strengths & Weaknesses Quick Glance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-1">
                <span className="font-black uppercase tracking-wider text-[10px] text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Key Strengths
                </span>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  {analysis.strengths?.[0] || 'Clear baseline title alignment'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-1">
                <span className="font-black uppercase tracking-wider text-[10px] text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Primary Weakness
                </span>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  {analysis.weaknesses?.[0] || 'Lacks measurable business metrics'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Category Mini-Cards Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-8 mt-8 border-t border-white/10">
          {categoriesList.map((cat, i) => {
            const pct = Math.round((cat.score / cat.max) * 100);
            return (
              <button
                key={i}
                onClick={() => setActiveTab(cat.tab as any)}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
              >
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                  <span>{cat.label}</span>
                  <span className="font-black text-white">{cat.score}/{cat.max}</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      pct >= 85 ? 'bg-emerald-400' : pct >= 70 ? 'bg-[#79BAEC]' : 'bg-amber-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* "Fix These 3 Things First" Priority Banner */}
      {analysis.topActions && analysis.topActions.length > 0 && (
        <section className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-600" />
              <h3 className="font-black text-amber-950 text-base tracking-tight">
                Fix These 3 Things First (Highest Recruiter Leverage)
              </h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-200/60 px-3 py-1 rounded-full">
              Priority Fixes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analysis.topActions.map((action, i) => (
              <div 
                key={i} 
                className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center">
                      {action.priority || (i + 1)}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">
                      {action.category}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-zinc-900 leading-snug">
                    {action.action}
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-100 text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                  <span>{action.expectedImpact}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Tabbed Detail Views */}
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-200 no-scrollbar">
          {[
            { id: 'overview', label: 'Full Overview' },
            { id: 'headline', label: 'Headline Audit & Rewrites' },
            { id: 'about', label: 'About Section' },
            { id: 'experience', label: 'Experience Bullets (ACAR)' },
            { id: 'skills', label: 'Skills & Keyword Gap' },
            { id: 'completeness', label: 'Profile Completeness' },
            { id: 'actionPlan', label: `3-Day Action Plan (${progressPercent}%)` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Category Score Explanations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
                <h4 className="font-black text-zinc-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  Strengths & Competitive Advantages
                </h4>
                <ul className="space-y-2.5">
                  {(analysis.strengths || []).map((str, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-medium text-zinc-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
                <h4 className="font-black text-zinc-900 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Identified Weaknesses & Bottlenecks
                </h4>
                <ul className="space-y-2.5">
                  {(analysis.weaknesses || []).map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-medium text-zinc-700">
                      <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Full Actionable Recommendation Cards List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-zinc-900 text-base">
                  Prioritized Recommendations ({recommendationsState.length})
                </h3>
                <span className="text-xs text-zinc-400 font-medium">Click checkbox when completed</span>
              </div>

              <div className="space-y-3">
                {recommendationsState.map((rec, i) => (
                  <div 
                    key={rec.id || i}
                    className={`p-6 rounded-3xl border transition-all ${
                      rec.completed 
                        ? 'bg-zinc-50 border-zinc-200 opacity-60' 
                        : 'bg-white border-zinc-200 shadow-xs hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleRecommendationComplete(rec.id)}
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                            rec.completed 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : 'border-zinc-300 hover:border-indigo-500 bg-white'
                          }`}
                        >
                          {rec.completed && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <div>
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            rec.severity === 'high' ? 'bg-rose-100 text-rose-800' :
                            rec.severity === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {rec.severity} Impact • {rec.category}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-indigo-600">
                        Impact: {rec.impact}
                      </span>
                    </div>

                    <div className="space-y-2 pl-9">
                      <h4 className="font-bold text-zinc-900 text-sm leading-snug">
                        {rec.issue}
                      </h4>
                      <p className="text-zinc-600 text-xs leading-relaxed">
                        <strong className="text-zinc-900">Why it matters:</strong> {rec.whyItMatters}
                      </p>
                      <p className="text-zinc-700 text-xs leading-relaxed font-medium bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                        <strong className="text-indigo-600">Recommendation:</strong> {rec.recommendation}
                      </p>
                      {rec.example && (
                        <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 text-xs space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 block">
                            Example To Model
                          </span>
                          <p className="font-mono text-zinc-800 text-[11px] leading-relaxed">
                            {rec.example}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HEADLINE REWRITES */}
        {activeTab === 'headline' && (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Section Analysis</span>
                  <h3 className="text-xl font-black text-zinc-900">Headline Audit ({analysis.categories.headline}/15 pts)</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-xs">
                  {analysis.categories.headline >= 13 ? 'Strong' : 'Needs Optimization'}
                </span>
              </div>

              {/* Current Headline */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">Current Headline</span>
                <p className="text-sm font-bold text-zinc-900 font-mono">
                  "{analysis.structuredProfile?.personal?.headline || analysis.rewrites?.headline?.original || 'No headline provided'}"
                </p>
                {analysis.rewrites?.headline?.critique && (
                  <p className="text-xs text-rose-700 font-medium pt-1">
                    <strong>Critique:</strong> {analysis.rewrites.headline.critique}
                  </p>
                )}
              </div>

              {/* Suggested Rewritten Options */}
              <div className="space-y-4 pt-2">
                <h4 className="font-black text-zinc-900 text-sm">
                  Recommended Recruiter-Optimized Headlines
                </h4>

                <div className="space-y-4">
                  {analysis.rewrites?.headline?.improvedVersions?.map((opt, i) => (
                    <div 
                      key={i}
                      className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50/50 via-white to-sky-50/30 border border-indigo-100 shadow-xs space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-indigo-900">{opt.title}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">
                          {opt.focusTag}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-mono font-semibold text-zinc-900 leading-relaxed bg-white p-3.5 rounded-xl border border-zinc-200">
                        {opt.content}
                      </p>

                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleCopy(opt.content, `headline_${i}`)}
                          className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                        >
                          {copiedId === `headline_${i}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied to Clipboard</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Headline</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ABOUT SECTION */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Section Analysis</span>
                  <h3 className="text-xl font-black text-zinc-900">About / Summary Audit ({analysis.categories.about}/15 pts)</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-xs">
                  {analysis.categories.about >= 13 ? 'Strong' : 'Needs Optimization'}
                </span>
              </div>

              {/* Current About */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">Current About Summary</span>
                <p className="text-xs text-zinc-700 leading-relaxed whitespace-pre-line font-medium">
                  {analysis.structuredProfile?.about || analysis.rewrites?.about?.original || 'No About section content provided.'}
                </p>
                {analysis.rewrites?.about?.critique && (
                  <p className="text-xs text-rose-700 font-medium pt-2 border-t border-zinc-200">
                    <strong>Critique:</strong> {analysis.rewrites.about.critique}
                  </p>
                )}
              </div>

              {/* Improved Rewritten Versions */}
              <div className="space-y-4 pt-2">
                <h4 className="font-black text-zinc-900 text-sm">
                  AI Rewritten About Section Options
                </h4>

                <div className="space-y-6">
                  {analysis.rewrites?.about?.improvedVersions?.map((opt, i) => (
                    <div 
                      key={i}
                      className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-xs space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                        <span className="font-black text-xs text-zinc-900">{opt.title}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full">
                          {opt.focusTag}
                        </span>
                      </div>

                      <div className="text-xs text-zinc-800 leading-relaxed whitespace-pre-line bg-zinc-50 p-4 rounded-2xl border border-zinc-200 font-medium">
                        {opt.content}
                      </div>

                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleCopy(opt.content, `about_${i}`)}
                          className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                        >
                          {copiedId === `about_${i}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied to Clipboard</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy About Section</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXPERIENCE BULLETS (ACAR) */}
        {activeTab === 'experience' && (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Experience Audit</span>
                  <h3 className="text-xl font-black text-zinc-900">
                    Action + Context + Action Taken + Result (ACAR) Analysis ({analysis.categories.experience}/20 pts)
                  </h3>
                </div>
              </div>

              {/* Role By Role Breakdowns */}
              {analysis.rewrites?.experience && analysis.rewrites.experience.length > 0 ? (
                <div className="space-y-6">
                  {analysis.rewrites.experience.map((role, rIdx) => (
                    <div 
                      key={rIdx}
                      className="rounded-3xl border border-zinc-200 overflow-hidden shadow-xs"
                    >
                      <button
                        onClick={() => toggleRoleExpand(rIdx)}
                        className="w-full p-5 bg-zinc-50 hover:bg-zinc-100/80 flex items-center justify-between transition-colors text-left"
                      >
                        <div className="space-y-0.5">
                          <h4 className="font-black text-zinc-900 text-sm">
                            {role.title} at {role.company}
                          </h4>
                          <p className="text-xs text-zinc-500 font-medium">
                            {role.bullets?.length || 0} bullets analyzed • Score: {role.score}/20
                          </p>
                        </div>
                        {expandedRoles[rIdx] ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                      </button>

                      {expandedRoles[rIdx] && (
                        <div className="p-6 bg-white space-y-6">
                          {role.generalFeedback && (
                            <p className="text-xs text-indigo-900 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100 font-medium">
                              <strong>Role Feedback:</strong> {role.generalFeedback}
                            </p>
                          )}

                          <div className="space-y-4">
                            {role.bullets.map((b, bIdx) => (
                              <div 
                                key={bIdx}
                                className="p-5 rounded-2xl bg-zinc-50/70 border border-zinc-200 space-y-3"
                              >
                                <div>
                                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">
                                    Original Bullet
                                  </span>
                                  <p className="text-xs font-mono text-zinc-800 bg-white p-2.5 rounded-lg border border-zinc-200">
                                    "{b.originalBullet}"
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-700">Critique</span>
                                    <p className="text-rose-900 text-[11px] font-medium">{b.critique}</p>
                                  </div>

                                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">Missing Elements</span>
                                    <div className="flex flex-wrap gap-1 pt-1">
                                      {b.frameworkMissing?.map((f, fi) => (
                                        <span key={fi} className="px-2 py-0.5 bg-amber-200/70 text-amber-900 rounded font-bold text-[10px]">
                                          {f}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                                      ACAR Recruiter-Optimized Bullet
                                    </span>
                                    {b.suggestedMetricPlaceholder && (
                                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                                        Metric Guide: {b.suggestedMetricPlaceholder}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs font-mono font-semibold text-emerald-950 leading-relaxed">
                                    {b.suggestedBullet}
                                  </p>
                                  <div className="flex justify-end pt-1">
                                    <button
                                      onClick={() => handleCopy(b.suggestedBullet, `exp_${rIdx}_${bIdx}`)}
                                      className="px-3 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-[11px] flex items-center gap-1 transition-all"
                                    >
                                      {copiedId === `exp_${rIdx}_${bIdx}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                      <span>{copiedId === `exp_${rIdx}_${bIdx}` ? 'Copied' : 'Copy Bullet'}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-zinc-50 rounded-3xl border border-dashed border-zinc-200 space-y-2">
                  <p className="text-xs text-zinc-500 font-medium">
                    No individual experience roles detected to unpack. You can paste a specific role or bullet point below to test our real-time ACAR optimizer.
                  </p>
                </div>
              )}

              {/* Interactive Bullet Rewriter Tool */}
              <div className="p-6 rounded-3xl bg-zinc-900 text-white space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <h4 className="font-black text-sm">Real-Time ACAR Bullet Enhancer</h4>
                </div>
                <p className="text-xs text-zinc-300">
                  Paste any single bullet from your resume or LinkedIn to generate 3 Action + Context + Result alternatives.
                </p>

                <textarea
                  rows={2}
                  value={customInputText}
                  onChange={(e) => setCustomInputText(e.target.value)}
                  placeholder="e.g. Worked with design and engineering on the new customer onboarding flow."
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleCustomRewrite}
                    disabled={isGeneratingCustom || !customInputText.trim()}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingCustom ? 'Optimizing...' : 'Enhance Bullet'}</span>
                  </button>
                </div>

                {customRewriteResult && (
                  <div className="p-4 rounded-2xl bg-zinc-800/90 border border-zinc-700 space-y-3 pt-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 block">
                      Generated Options
                    </span>
                    {customRewriteResult.improvedVersions?.map((opt: any, i: number) => (
                      <div key={i} className="p-3 bg-zinc-900 rounded-xl border border-zinc-700 text-xs space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-zinc-400">
                          <span className="font-bold">{opt.title}</span>
                          <span className="text-indigo-300">{opt.focusTag}</span>
                        </div>
                        <p className="text-zinc-200 font-mono text-[11px]">{opt.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SKILLS & KEYWORD GAP */}
        {activeTab === 'skills' && (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">ATS & Search Optimization</span>
                  <h3 className="text-xl font-black text-zinc-900">
                    Keyword Gap Analysis for {analysis.targetRole}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500 font-bold">Keyword Coverage:</span>
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-black text-xs">
                    {analysis.keywordGap?.keywordCoveragePercent || 70}%
                  </span>
                </div>
              </div>

              {/* Missing High-Value Keywords */}
              <div className="space-y-3">
                <h4 className="font-black text-zinc-900 text-sm flex items-center gap-2 text-rose-700">
                  <AlertTriangle className="w-4 h-4" />
                  Missing High-Value Recruiter Search Filters
                </h4>
                <p className="text-xs text-zinc-500">
                  Recruiters run Boolean search strings with these exact terms. Adding these to your profile will directly boost search appearances.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {analysis.keywordGap?.missingKeywords?.map((kw, i) => (
                    <div 
                      key={i}
                      className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-rose-950 font-mono">{kw.keyword}</span>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-200/60 text-rose-900">
                          {kw.importance}
                        </span>
                      </div>
                      <p className="text-zinc-600 text-[11px] leading-relaxed font-medium">
                        {kw.whyItMatters}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strong Keywords Detected */}
              <div className="space-y-3 pt-4 border-t border-zinc-100">
                <h4 className="font-black text-zinc-900 text-sm flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  Strong Target Keywords Detected
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {analysis.keywordGap?.strongKeywords?.map((kw, i) => (
                    <div 
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>{kw.keyword}</span>
                      <span className="text-[10px] bg-emerald-200/70 text-emerald-950 px-1.5 py-0.2 rounded-full">
                        {kw.count}x
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overused Buzzwords */}
              {analysis.keywordGap?.overusedKeywords && analysis.keywordGap.overusedKeywords.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-zinc-100">
                  <h4 className="font-black text-zinc-900 text-sm flex items-center gap-2 text-amber-700">
                    <HelpCircle className="w-4 h-4" />
                    Overused Buzzwords to Replace with Evidence
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {analysis.keywordGap.overusedKeywords.map((ow, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100 text-xs space-y-1">
                        <span className="font-bold text-amber-950 font-mono">"{ow.keyword}"</span>
                        <p className="text-zinc-600 text-[11px]">{ow.advice}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: PROFILE COMPLETENESS */}
        {activeTab === 'completeness' && (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Completeness Checklist</span>
                  <h3 className="text-xl font-black text-zinc-900">
                    Profile Real Estate Audit ({analysis.categories.completeness}/10 pts)
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {analysis.completenessChecklist?.map((item, i) => (
                  <div 
                    key={item.id || i}
                    className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      {item.status === 'present' ? (
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      ) : item.status === 'missing' ? (
                        <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-xl bg-zinc-200 text-zinc-600 flex items-center justify-center shrink-0">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-zinc-900 text-xs sm:text-sm">{item.label}</h4>
                        <p className="text-[11px] text-zinc-500 font-medium">{item.recommendation}</p>
                      </div>
                    </div>

                    <div className="self-end sm:self-auto shrink-0">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        item.status === 'present' ? 'bg-emerald-100 text-emerald-800' :
                        item.status === 'missing' ? 'bg-rose-100 text-rose-800' : 'bg-zinc-200 text-zinc-800'
                      }`}>
                        {item.status.replace('_', ' ')} ({item.points}/{item.maxPoints} pts)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: 3-DAY ACTION PLAN */}
        {activeTab === 'actionPlan' && (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Prioritized Roadmap</span>
                  <h3 className="text-xl font-black text-zinc-900">
                    Your 3-Day Profile Transformation Plan
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-bold text-zinc-900 block">{completedTasks} of {totalTasks} Tasks Done</span>
                    <span className="text-[10px] text-zinc-400 font-bold">{progressPercent}% Completed</span>
                  </div>
                  <div className="w-20 h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {actionPlanState.map((day, dIdx) => (
                  <div 
                    key={dIdx}
                    className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-xl bg-zinc-900 text-white font-black text-xs">
                          Day {day.dayNumber}
                        </span>
                        <h4 className="font-black text-zinc-900 text-sm">{day.phaseTitle}</h4>
                      </div>
                      <span className="text-xs text-zinc-400 font-medium">~{day.estimatedMinutes} mins</span>
                    </div>

                    <div className="space-y-3">
                      {day.tasks.map((task) => (
                        <div 
                          key={task.id}
                          className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                            task.completed 
                              ? 'bg-white/50 border-zinc-200 opacity-60' 
                              : 'bg-white border-zinc-200 shadow-xs'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleTaskComplete(dIdx, task.id)}
                              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors mt-0.5 shrink-0 ${
                                task.completed 
                                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                                  : 'border-zinc-300 hover:border-indigo-500 bg-white'
                              }`}
                            >
                              {task.completed && <Check className="w-3 h-3" />}
                            </button>
                            <div className="space-y-0.5">
                              <h5 className={`font-bold text-xs ${task.completed ? 'line-through text-zinc-400' : 'text-zinc-900'}`}>
                                {task.title}
                              </h5>
                              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                                {task.description}
                              </p>
                            </div>
                          </div>

                          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded shrink-0">
                            {task.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
