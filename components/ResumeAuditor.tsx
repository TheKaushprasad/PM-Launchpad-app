import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, ArrowLeft, Sparkles, CheckCircle2, AlertTriangle, 
  TrendingUp, Compass, Cpu, FileCheck, Copy, Check, RefreshCw, 
  ChevronRight, Award, ShieldCheck, Zap, HelpCircle, Download,
  Plus, Target, Briefcase, ChevronDown, ChevronUp, X, CheckSquare,
  Crosshair, Layers
} from 'lucide-react';
import { ResumeAuditResult } from '../types/resumeAuditor';

const INITIAL_ROLES = [
  'Associate Product Manager (APM)',
  'Product Manager',
  'Senior Product Manager',
  'Lead / Group PM',
  'Growth Product Manager',
  'Technical Product Manager'
];

const SAMPLE_PM_RESUME = `Karthik Sharma
Product Professional | karthik.pm@example.com | San Francisco, CA

EXPERIENCE
Associate Product Manager | SaaSFlow Inc. | 2022 - Present
- Managed product backlog and coordinated with engineering team for sprint deliverables.
- Worked on user research and conducted interviews with various customers to understand pain points.
- Helped design new onboarding flow with UI/UX designers and launched the feature.
- Responsible for tracking weekly active users and preparing presentation decks for executive leadership.
- Coordinated cross-functional meetings between engineering, design, customer success, and sales teams.

Product Analyst / Intern | DataMetrics Lab | 2021 - 2022
- Wrote SQL queries and built Tableau dashboards for business stakeholders.
- Monitored product metrics and reported drop-offs across customer sign-up journey.
- Documented user stories and acceptance criteria for Jira tickets.
- Assisted lead product manager with competitor benchmarking analysis.

EDUCATION
B.S. in Computer Science & Business Information Systems, 2021

SKILLS & TOOLS
Product Discovery, Jira, Confluence, SQL, Figma, User Research, Tableau, Agile Scrum, PRDs`;

const SAMPLE_JOB_ROLE = "Senior B2B SaaS Product Manager";
const SAMPLE_JOB_DESCRIPTION = `About the Role:
We are looking for a Senior Product Manager to lead our Core Platform Growth team. You will own the self-serve funnel, user onboarding activation, and subscription retention metrics.

Key Responsibilities:
- Own end-to-end product strategy for activation and self-serve PLG conversion.
- Define North Star metrics, track cohort retention, and execute rapid A/B experiments.
- Partner with Engineering, Product Design, and Data Science to deliver high-velocity sprint cycles.
- Conduct continuous quantitative funnel analysis and direct customer discovery.

Requirements:
- 3+ years of PM experience in B2B SaaS or PLG (Product-Led Growth).
- Proven track record of improving activation, conversion rate, or net retention.
- Strong SQL and experimentation / A/B testing proficiency.
- Excellent stakeholder leadership and executive presentation skills.`;

export const ResumeAuditor: React.FC = () => {
  const navigate = useNavigate();
  
  // Form State
  const [resumeText, setResumeText] = useState<string>('');
  const [roles, setRoles] = useState<string[]>(() => {
    const saved = localStorage.getItem('pm_auditor_custom_roles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // ignore fallback
      }
    }
    return INITIAL_ROLES;
  });
  const [targetRole, setTargetRole] = useState<string>('Product Manager');
  const [isAddingRole, setIsAddingRole] = useState<boolean>(false);
  const [newRoleInput, setNewRoleInput] = useState<string>('');

  // Optional Job Suitability Check State
  const [enableJobCheck, setEnableJobCheck] = useState<boolean>(false);
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');

  // Execution & UI State
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [loadingPhase, setLoadingPhase] = useState<string>('Parsing resume structure...');
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState<boolean>(false);

  // Result State
  const [auditResult, setAuditResult] = useState<ResumeAuditResult | null>(null);

  const handleAddCustomRole = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newRoleInput.trim();
    if (!trimmed) return;
    if (!roles.includes(trimmed)) {
      const updated = [...roles, trimmed];
      setRoles(updated);
      localStorage.setItem('pm_auditor_custom_roles', JSON.stringify(updated));
    }
    setTargetRole(trimmed);
    setNewRoleInput('');
    setIsAddingRole(false);
  };

  const handleLoadSample = () => {
    setResumeText(SAMPLE_PM_RESUME);
    setError(null);
  };

  const handleLoadSampleJob = () => {
    setJobTitle(SAMPLE_JOB_ROLE);
    setJobDescription(SAMPLE_JOB_DESCRIPTION);
    setEnableJobCheck(true);
  };

  const handleAudit = async () => {
    if (!resumeText.trim()) {
      setError('Please paste or enter your resume text to begin audit.');
      return;
    }

    if (resumeText.trim().split(/\s+/).length < 25) {
      setError('Resume text seems too short. Please paste full experience bullets or full resume content.');
      return;
    }

    if (enableJobCheck && !jobDescription.trim()) {
      setError('You enabled Job Suitability check. Please paste the Job Description or turn the option off.');
      return;
    }

    setError(null);
    setIsAuditing(true);
    setLoadingPhase('Senior PM Hiring Manager reviewing resume signals...');

    const phaseTimers = [
      setTimeout(() => setLoadingPhase('Evaluating quantified impact & business metrics (35%)...'), 1400),
      setTimeout(() => setLoadingPhase('Assessing strategic ownership vs coordination framing (30%)...'), 2800),
      setTimeout(() => setLoadingPhase(enableJobCheck ? 'Benchmarking keyword & skill suitability against Job Description...' : 'Auditing ATS structural readability & clarity (35%)...'), 4200),
      setTimeout(() => setLoadingPhase('Synthesizing bullet rewrites with [METRIC] placeholders...'), 5600),
    ];

    try {
      const response = await fetch('/api/audit-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetRole,
          jobTitle: enableJobCheck ? (jobTitle.trim() || targetRole) : undefined,
          jobDescription: enableJobCheck ? jobDescription.trim() : undefined
        })
      });

      phaseTimers.forEach(clearTimeout);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to complete resume audit.');
      }

      const data = await response.json();
      if (data.success && data.audit) {
        setAuditResult(data.audit);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Received unexpected response format.');
      }
    } catch (err: any) {
      phaseTimers.forEach(clearTimeout);
      setError(err.message || 'An error occurred while auditing the resume. Please check your connection or try again.');
    } finally {
      setIsAuditing(false);
    }
  };

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAllRewrites = () => {
    if (!auditResult?.bullet_rewrites) return;
    const compiled = auditResult.bullet_rewrites
      .map((b, i) => `${i + 1}. ${b.rewritten}\n   (Fixed: ${b.reason})`)
      .join('\n\n');
    navigator.clipboard.writeText(compiled);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2500);
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return { label: 'FAANG / Tier-1 Ready', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' };
    if (score >= 70) return { label: 'Competitive • Minor Refinements', color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' };
    if (score >= 55) return { label: 'Task-Focused • Needs Metric Reframing', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' };
    return { label: 'Action-Heavy • Critical PM Overhaul', color: 'bg-rose-500/10 text-rose-600 border-rose-500/20' };
  };

  const getSuitabilityVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'Strong Match':
        return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30';
      case 'Moderate Match':
        return 'bg-indigo-500/10 text-indigo-700 border-indigo-500/30';
      case 'Gaps Detected':
        return 'bg-amber-500/10 text-amber-700 border-amber-500/30';
      default:
        return 'bg-rose-500/10 text-rose-700 border-rose-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/60 pb-24">
      {/* Top Breadcrumb & Navigation */}
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/tools')}
              className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Career Tools</span>
            </button>
            <span className="text-zinc-300">/</span>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold text-zinc-900">PM Resume Auditor</span>
            </div>
          </div>

          {auditResult && (
            <button
              onClick={() => { setAuditResult(null); }}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Audit</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {!auditResult ? (
          /* ================= INPUT MODE ================= */
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200/80 rounded-full text-purple-700 text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>15+ Years Senior PM Hiring Manager AI System</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
                PM Resume Auditor
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto font-medium">
                Get an unvarnished, 30-second hiring manager assessment with 4-pillar dimensional scoring, optional target job suitability matching, and high-leverage bullet rewrites.
              </p>
            </div>

            {/* Input Card */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-zinc-200/40 space-y-6">
              {/* 1. Target Role Selector with Custom Role Option */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Target Product Role
                  </label>
                  {!isAddingRole && (
                    <button
                      type="button"
                      onClick={() => setIsAddingRole(true)}
                      className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Custom Role</span>
                    </button>
                  )}
                </div>

                {/* Role Pill Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setTargetRole(role)}
                      className={`px-3.5 py-2.5 rounded-xl text-left text-xs font-bold transition-all border flex items-center justify-between ${
                        targetRole === role
                          ? 'bg-purple-50 text-purple-700 border-purple-400 ring-2 ring-purple-400/20'
                          : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <span className="truncate">{role}</span>
                      {targetRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 ml-1.5" />}
                    </button>
                  ))}
                </div>

                {/* Custom Role Input Form Drawer */}
                {isAddingRole && (
                  <form onSubmit={handleAddCustomRole} className="mt-3 p-3 bg-purple-50/70 border border-purple-200 rounded-2xl flex items-center gap-2">
                    <input
                      type="text"
                      autoFocus
                      value={newRoleInput}
                      onChange={(e) => setNewRoleInput(e.target.value)}
                      placeholder="e.g. AI Product Manager, Director of Product, Fintech PM..."
                      className="flex-1 px-3 py-2 text-xs bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-zinc-900"
                    />
                    <button
                      type="submit"
                      disabled={!newRoleInput.trim()}
                      className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                    >
                      Add Role
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsAddingRole(false); setNewRoleInput(''); }}
                      className="p-2 text-zinc-400 hover:text-zinc-600 rounded-xl hover:bg-purple-100 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>

              {/* 2. Resume Text Input Area */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Paste Resume Content or Experience Bullets
                  </label>
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline flex items-center gap-1"
                  >
                    <span>Load Sample Resume</span>
                  </button>
                </div>
                <div className="relative">
                  <textarea
                    rows={10}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your raw resume text, work experience section, or bullet points here..."
                    className="w-full bg-zinc-50 border border-zinc-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 rounded-2xl p-4 text-xs font-mono text-zinc-800 leading-relaxed resize-y focus:outline-none transition-all placeholder:text-zinc-400"
                  />
                  <div className="absolute bottom-3 right-4 text-[10px] font-mono text-zinc-400">
                    {resumeText.trim() ? `${resumeText.trim().split(/\s+/).length} words` : '0 words'}
                  </div>
                </div>
              </div>

              {/* 3. OPTIONAL FEATURE: Target Job Description Suitability Benchmark */}
              <div className="border border-zinc-200 bg-zinc-50/50 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => setEnableJobCheck(!enableJobCheck)}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${enableJobCheck ? 'bg-purple-600 text-white' : 'bg-zinc-200 text-zinc-600'}`}>
                      <Crosshair className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-zinc-900">
                          Check Suitability for a Specific Job
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                          Optional
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500">
                        Benchmark your resume directly against an open job description to uncover role gaps and tailoring tips.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setEnableJobCheck(!enableJobCheck); }}
                    className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${enableJobCheck ? 'bg-purple-600' : 'bg-zinc-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${enableJobCheck ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Job Inputs Expandable Section */}
                <AnimatePresence>
                  {enableJobCheck && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 pt-3 border-t border-zinc-200 overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-zinc-700">
                          Target Job Role Name
                        </label>
                        <button
                          type="button"
                          onClick={handleLoadSampleJob}
                          className="text-[11px] font-bold text-purple-600 hover:text-purple-700 hover:underline"
                        >
                          Load Sample Job Spec
                        </button>
                      </div>
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Senior Product Manager - Core Growth (Stripe)"
                        className="w-full bg-white border border-zinc-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl px-3.5 py-2.5 text-xs text-zinc-800 font-medium focus:outline-none"
                      />

                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                          Job Description / Requirements Text
                        </label>
                        <textarea
                          rows={6}
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          placeholder="Paste the full job posting, responsibilities, and qualifications text here..."
                          className="w-full bg-white border border-zinc-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl p-3.5 text-xs font-mono text-zinc-800 leading-relaxed resize-y focus:outline-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-rose-700 text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  disabled={isAuditing}
                  onClick={handleAudit}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer"
                >
                  {isAuditing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{loadingPhase}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Run PM Hiring Manager Audit {enableJobCheck ? '& Job Suitability' : ''}</span>
                    </>
                  )}
                </button>
              </div>

              {/* 4 Pillars Info Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-100 text-center">
                <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200/60">
                  <span className="text-[10px] font-black uppercase text-zinc-400 block mb-0.5">Weight: 35%</span>
                  <span className="text-xs font-bold text-zinc-800">Impact & Metrics</span>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200/60">
                  <span className="text-[10px] font-black uppercase text-zinc-400 block mb-0.5">Weight: 30%</span>
                  <span className="text-xs font-bold text-zinc-800">PM Ownership</span>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200/60">
                  <span className="text-[10px] font-black uppercase text-zinc-400 block mb-0.5">Weight: 15%</span>
                  <span className="text-xs font-bold text-zinc-800">ATS Readability</span>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200/60">
                  <span className="text-[10px] font-black uppercase text-zinc-400 block mb-0.5">Weight: 20%</span>
                  <span className="text-xs font-bold text-zinc-800">Clarity & Brevity</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= AUDIT RESULTS MODE ================= */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Top Scorecard Hero Banner */}
            <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                      Hiring Manager Audit Report
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs text-zinc-300 font-medium">
                      Target Role: <strong className="text-white">{auditResult.targetRole || targetRole}</strong>
                    </span>
                    {auditResult.jobSuitability && (
                      <>
                        <span className="text-zinc-600">•</span>
                        <span className="text-[10px] font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">
                          Job Spec Benchmarked
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    PM Resume Scorecard
                  </h2>
                  <p className="text-xs text-zinc-400 max-w-xl">
                    Evaluated against 15+ years of top-tier product hiring standards. Focused on business outcome ownership, metrics, and signal density.
                  </p>
                </div>

                {/* Big Composite Score Badge */}
                <div className="flex items-center gap-4 bg-zinc-800/80 border border-zinc-700/80 p-4 rounded-2xl shrink-0">
                  <div className="text-center">
                    <div className="text-4xl font-black text-white leading-none">
                      {auditResult.composite_score}
                      <span className="text-base text-zinc-400 font-bold">/100</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 block mt-1">
                      Composite Score
                    </span>
                  </div>
                  <div className="h-10 w-px bg-zinc-700"></div>
                  <div className="space-y-1">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg border block ${getScoreBadge(auditResult.composite_score).color}`}>
                      {getScoreBadge(auditResult.composite_score).label}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium block">
                      30-Second Recruiter Read
                    </span>
                  </div>
                </div>
              </div>

              {/* Narrative Feedback Quote Block */}
              <div className="pt-6">
                <div className="flex items-start gap-3 bg-zinc-800/50 border border-zinc-700/60 rounded-2xl p-4 sm:p-5">
                  <Compass className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-purple-300">
                      Hiring Manager Assessment
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
                      "{auditResult.narrative_feedback}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* JOB SUITABILITY REPORT CARD (If enabled and returned) */}
            {auditResult.jobSuitability && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border-2 border-purple-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Crosshair className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-black text-zinc-900">
                        Target Job Suitability Benchmark
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-500">
                      Role Analyzed: <strong className="text-zinc-800">{auditResult.jobSuitability.target_job_title || jobTitle || targetRole}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-black text-purple-700">
                        {auditResult.jobSuitability.match_score}%
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        Role Fit Match
                      </span>
                    </div>
                    <span className={`text-xs font-black px-3 py-1.5 rounded-xl border ${getSuitabilityVerdictBadge(auditResult.jobSuitability.verdict)}`}>
                      {auditResult.jobSuitability.verdict}
                    </span>
                  </div>
                </div>

                {/* 3-Column Breakdown: Matched, Gaps, Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* 1. Matched Skills */}
                  <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4" />
                      <h4 className="text-xs font-black uppercase tracking-wider">
                        Direct Match Strengths
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {auditResult.jobSuitability.matched_skills?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 2. Missing Skills / Gaps */}
                  <div className="bg-rose-50/50 border border-rose-200/80 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-rose-800">
                      <AlertTriangle className="w-4 h-4" />
                      <h4 className="text-xs font-black uppercase tracking-wider">
                        JD Gaps & Missing Proof
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {auditResult.jobSuitability.missing_skills_or_experiences?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                          <X className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 3. Tailoring Recommendations */}
                  <div className="bg-purple-50/50 border border-purple-200/80 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-purple-800">
                      <Sparkles className="w-4 h-4" />
                      <h4 className="text-xs font-black uppercase tracking-wider">
                        Tailoring Action Plan
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {auditResult.jobSuitability.tailoring_recommendations?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                          <span className="w-4 h-4 rounded-full bg-purple-200 text-purple-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4 Dimension Sub-scores Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. Impact & Metrics */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black text-zinc-900">Impact & Metrics</span>
                  </div>
                  <span className="text-base font-black text-emerald-600">
                    {auditResult.sub_scores.impact_metrics_score}<span className="text-xs text-zinc-400 font-normal">/100</span>
                  </span>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-700" 
                    style={{ width: `${Math.min(100, Math.max(5, auditResult.sub_scores.impact_metrics_score))}%` }}
                  />
                </div>
                <p className="text-[11px] text-zinc-500 leading-tight">
                  Quantified outcomes (%, $, users, latency, time saved) tied to real business results.
                </p>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Weight: 35%</span>
              </div>

              {/* 2. PM Framing & Ownership */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Compass className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black text-zinc-900">PM Ownership</span>
                  </div>
                  <span className="text-base font-black text-indigo-600">
                    {auditResult.sub_scores.pm_framing_score}<span className="text-xs text-zinc-400 font-normal">/100</span>
                  </span>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-700" 
                    style={{ width: `${Math.min(100, Math.max(5, auditResult.sub_scores.pm_framing_score))}%` }}
                  />
                </div>
                <p className="text-[11px] text-zinc-500 leading-tight">
                  Problem ownership, trade-off decisions, and strategic reasoning over mere task coordination.
                </p>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Weight: 30%</span>
              </div>

              {/* 3. ATS Readability */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black text-zinc-900">ATS Readability</span>
                  </div>
                  <span className="text-base font-black text-purple-600">
                    {auditResult.sub_scores.ats_readability_score}<span className="text-xs text-zinc-400 font-normal">/100</span>
                  </span>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-700" 
                    style={{ width: `${Math.min(100, Math.max(5, auditResult.sub_scores.ats_readability_score))}%` }}
                  />
                </div>
                <p className="text-[11px] text-zinc-500 leading-tight">
                  Structural cleanliness, standard headers, dates, and plain-text ATS parseability.
                </p>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Weight: 15%</span>
              </div>

              {/* 4. Clarity & Brevity */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black text-zinc-900">Clarity & Brevity</span>
                  </div>
                  <span className="text-base font-black text-amber-600">
                    {auditResult.sub_scores.clarity_score}<span className="text-xs text-zinc-400 font-normal">/100</span>
                  </span>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all duration-700" 
                    style={{ width: `${Math.min(100, Math.max(5, auditResult.sub_scores.clarity_score))}%` }}
                  />
                </div>
                <p className="text-[11px] text-zinc-500 leading-tight">
                  Concise active voice, scannable bullet lengths, and elimination of filler buzzwords.
                </p>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Weight: 20%</span>
              </div>
            </div>

            {/* Strengths & Priorities 2-Column Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Strengths */}
              <div className="bg-white border border-emerald-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-black text-zinc-900">Top Strengths in Resume</h3>
                </div>
                <ul className="space-y-2.5">
                  {auditResult.top_strengths?.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Priorities */}
              <div className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-black text-zinc-900">Highest-Leverage Priorities</h3>
                </div>
                <ul className="space-y-2.5">
                  {auditResult.top_priorities?.map((priority, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700">
                      <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{priority}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* High-Impact Bullet Rewrites Section */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <h3 className="text-lg font-black text-zinc-900">
                      High-Impact PM Bullet Rewrites ({auditResult.bullet_rewrites?.length || 0})
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium">
                    Weak task bullets reframed into ownership-driven outcomes with <span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-mono font-bold">[METRIC]</span> placeholders for your genuine numbers.
                  </p>
                </div>

                <button
                  onClick={handleCopyAllRewrites}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                >
                  {allCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{allCopied ? 'All Copied!' : 'Copy All Rewrites'}</span>
                </button>
              </div>

              {/* Rewrites List */}
              <div className="space-y-5">
                {auditResult.bullet_rewrites?.map((item, idx) => (
                  <div 
                    key={idx}
                    className="border border-zinc-200 hover:border-purple-300 rounded-2xl p-5 bg-zinc-50/50 hover:bg-white transition-all space-y-3"
                  >
                    {/* Header Strip */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-zinc-500">
                        Bullet #{idx + 1}
                      </span>
                      <button
                        onClick={() => handleCopyBullet(item.rewritten, idx)}
                        className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 hover:bg-purple-50 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Rewrite</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Original Bullet */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-black uppercase text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          Original (Weak)
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 line-through bg-rose-50/40 p-2.5 rounded-xl border border-rose-100 font-mono">
                        {item.original}
                      </p>
                    </div>

                    {/* Improved Rewrite */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          PM Outcome Framing (Improved)
                        </span>
                      </div>
                      <div className="text-xs text-zinc-900 bg-emerald-50/50 p-3 rounded-xl border border-emerald-200 font-medium leading-relaxed">
                        {item.rewritten.split(/(\[METRIC[^\]]*\])/g).map((part, pIdx) => {
                          if (part.startsWith('[') && part.endsWith(']')) {
                            return (
                              <span key={pIdx} className="bg-purple-100 text-purple-800 font-mono font-bold px-1.5 py-0.5 rounded mx-0.5 border border-purple-200">
                                {part}
                              </span>
                            );
                          }
                          return <span key={pIdx}>{part}</span>;
                        })}
                      </div>
                    </div>

                    {/* Hiring Manager Reason */}
                    <div className="pt-1 flex items-start gap-2 text-[11px] text-zinc-500">
                      <span className="font-bold text-zinc-700 shrink-0">Hiring Signal Fix:</span>
                      <span>{item.reason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setAuditResult(null)}
                className="px-6 py-3 bg-white border border-zinc-300 hover:border-zinc-400 text-zinc-700 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Audit Another Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
