import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Briefcase, Building, MapPin, 
  Sparkles, ArrowLeft, Loader2, AlertCircle, FileText,
  CheckCircle2, HelpCircle, RefreshCw, Send, Compass, 
  ClipboardCopy, Trash2, Info, ChevronRight
} from 'lucide-react';
import { TARGET_ROLE_KEYWORDS } from '../../services/profileAnalyzer';

interface LinkedInInputFormProps {
  onBackToLanding: () => void;
  onSubmitAnalysis: (data: {
    profileText?: string;
    rawProfileText?: string;
    targetRole: string;
    experience: string;
    industry: string;
    companyType: string;
    location?: string;
    manualProfileData?: any;
    linkedinUrl?: string;
    useSample?: boolean;
  }) => Promise<void>;
  isLoading: boolean;
  scrapeErrorNotice?: string | null;
  onClearError: () => void;
}

export const LinkedInInputForm: React.FC<LinkedInInputFormProps> = ({
  onBackToLanding,
  onSubmitAnalysis,
  isLoading,
  scrapeErrorNotice,
  onClearError
}) => {
  // Target Career Goals (Benchmarking Baseline)
  const [targetRole, setTargetRole] = useState<string>('Product Manager');
  const [customRole, setCustomRole] = useState<string>('');
  const [experience, setExperience] = useState<string>('2-4 years (Mid-Level)');
  const [industry, setIndustry] = useState<string>('Technology / SaaS');
  const [companyType, setCompanyType] = useState<string>('Growth-stage Scale-up');
  const [location, setLocation] = useState<string>('');

  // Pasted Profile Details
  const [profileText, setProfileText] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const sampleProfileText = `Alex Chen
Product Manager at NovaPay | FinTech & Payments | 0-to-1 Product Discovery & Growth
San Francisco Bay Area · Contact info · 500+ connections

About
Product Manager with 3+ years of experience leading cross-functional teams across engineering, UX design, and data analytics to deliver high-scale FinTech solutions.

Experienced in customer discovery, A/B testing, and roadmap prioritization. Passionate about leveraging data-driven insights to build user-obsessed products that drive measurable business impact.

Experience
Product Manager
NovaPay · Full-time
Jan 2022 - Present · 2 yrs 8 mos
San Francisco, California, United States
• Led end-to-end launch of the new checkout experience, increasing conversion rate by 18% across 450k monthly active users.
• Defined product roadmap and sprint priorities in partnership with 8 engineers and 2 product designers using Jira and Agile Scrum.
• Spearheaded user research sessions with 30+ enterprise merchants, identifying checkout bottlenecks and reducing drop-off by 14%.
• Collaborated with product marketing on GTM release campaigns and enablement.

Associate Product Manager
FastCart · Full-time
Aug 2020 - Dec 2021 · 1 yr 5 mos
• Coordinated feature releases for merchant onboarding portal, accelerating time-to-first-transaction from 4 days to 24 hours.
• Created SQL dashboards and Mixpanel funnels to monitor key adoption KPIs.
• Conducted user feedback interviews with 15+ early beta testers.

Education
University of California, Berkeley
Bachelor of Science (B.S.), Computer Science & Business Administration
2016 - 2020

Skills
Product Strategy · Product Roadmap · A/B Testing · User Research · SQL · Jira · Agile Scrum · Mixpanel · Wireframing · Data Analytics

Licenses & certifications
Certified Scrum Product Owner (CSPO) · Scrum Alliance`;

  const handleFillSample = () => {
    setProfileText(sampleProfileText);
    setValidationError(null);
    onClearError();
  };

  const handleClearText = () => {
    setProfileText('');
    setValidationError(null);
  };

  const targetRoleOptions = [
    'Product Manager',
    'Associate Product Manager',
    'Senior Product Manager',
    'Technical Product Manager',
    'Product Designer',
    'Data Analyst',
    'Software Engineer',
    'Marketing Manager',
    'Business Analyst',
    'Other (Custom)'
  ];

  const experienceOptions = [
    '0-1 years (Entry / Transition)',
    '1-2 years (Early Career)',
    '2-4 years (Mid-Level)',
    '5-8 years (Senior)',
    '8+ years (Lead / Director)'
  ];

  const industryOptions = [
    'Technology / SaaS',
    'FinTech & Banking',
    'AI & DeepTech',
    'E-Commerce & Retail',
    'Healthcare & HealthTech',
    'Consumer Internet',
    'Enterprise & Cloud',
    'Consulting & Services'
  ];

  const companyTypeOptions = [
    'Growth-stage Scale-up',
    'Early-stage Startup (0-to-1)',
    'Big Tech / FAANG',
    'Public Enterprise',
    'Boutique / Agency'
  ];

  const activeRole = targetRole === 'Other (Custom)' ? (customRole || 'Product Professional') : targetRole;
  const wordCount = profileText.trim() ? profileText.trim().split(/\s+/).length : 0;
  const charCount = profileText.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    onClearError();

    if (!profileText.trim()) {
      setValidationError('Please paste your LinkedIn profile details or click "Fill Sample PM Profile" to test.');
      return;
    }

    if (profileText.trim().length < 40) {
      setValidationError('Please provide more profile details (e.g. headline, about, and experience) for an accurate 8-dimension audit.');
      return;
    }

    onSubmitAnalysis({
      profileText: profileText.trim(),
      rawProfileText: profileText.trim(),
      targetRole: activeRole,
      experience,
      industry,
      companyType,
      location
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Navigation Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            AI Profile Auditor
          </span>
        </div>
      </div>

      {/* Error / Notice Banner */}
      <AnimatePresence>
        {(scrapeErrorNotice || validationError) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Input Notice</h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {validationError || scrapeErrorNotice}
                </p>
              </div>
            </div>
            {validationError && !profileText && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleFillSample}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Fill Sample PM Profile</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: Target Career Goals (Benchmarking Baseline) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-zinc-900 tracking-tight">
                  Target Career Goals (Benchmarking Baseline)
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  Your profile score, ATS keyword gaps, and rewrite suggestions will be calibrated against hiring criteria for this baseline.
                </p>
              </div>
            </div>
            <span className="self-start sm:self-auto text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-lg border border-indigo-100">
              Calibration Baseline
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Target Role */}
            <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                <span>Target Role <span className="text-rose-500">*</span></span>
              </label>
              <select
                id="target-role-select"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {targetRoleOptions.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>

              {targetRole === 'Other (Custom)' && (
                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Enter custom target role (e.g. Chief of Staff)"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              )}
            </div>

            {/* Target Experience Level */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-zinc-400" />
                <span>Experience Level <span className="text-rose-500">*</span></span>
              </label>
              <select
                id="experience-level-select"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {experienceOptions.map((exp) => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
            </div>

            {/* Target Industry */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-zinc-400" />
                <span>Target Industry <span className="text-rose-500">*</span></span>
              </label>
              <select
                id="industry-select"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {industryOptions.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Target Company Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-700">Target Company Type</label>
              <select
                id="company-type-select"
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {companyTypeOptions.map((comp) => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </select>
            </div>

            {/* Target Location / Market */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Target Location / Hiring Market (Optional)</span>
              </label>
              <input
                type="text"
                id="target-location-input"
                placeholder="e.g. San Francisco Bay Area, Remote (US), London UK, Bengaluru India"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Paste Entire Profile Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-zinc-900 tracking-tight flex items-center gap-2">
                  <span>Paste Profile Details</span>
                  <span className="text-rose-500 text-xs">*</span>
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  Paste the full text from your LinkedIn profile page (or PDF resume). Our AI backend will automatically segregate each section.
                </p>
              </div>
            </div>

            {/* Action Bar (Sample / Clear) */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                id="btn-fill-sample-profile"
                onClick={handleFillSample}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Fill Sample PM Profile</span>
              </button>

              {profileText && (
                <button
                  type="button"
                  onClick={handleClearText}
                  className="px-2.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-bold text-xs rounded-xl flex items-center gap-1 transition-all"
                  title="Clear text"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Unified Profile Textarea */}
          <div className="space-y-2">
            <div className="relative">
              <textarea
                id="profile-full-text-input"
                rows={13}
                value={profileText}
                onChange={(e) => {
                  setProfileText(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder={`Paste your entire LinkedIn profile content here...\n\nExample format:\nAlex Chen\nProduct Manager at NovaPay | FinTech & Payments | 0-to-1 Product Discovery & Growth\nSan Francisco Bay Area\n\nAbout\nProduct Manager with 3+ years of experience leading cross-functional teams...\n\nExperience\nProduct Manager — NovaPay (2022 - Present)\n• Led end-to-end launch of new checkout experience increasing conversion by 18%...\n• Defined product roadmap and sprint priorities in Jira...\n\nEducation\nB.S. in Computer Science & Business, UC Berkeley\n\nSkills\nProduct Strategy, A/B Testing, User Research, SQL, Jira, Agile Scrum`}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs sm:text-sm font-mono leading-relaxed text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-y"
              />
            </div>

            {/* Word / Char Counter & Format Helper */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400 px-1 font-medium">
              <div className="flex items-center gap-2">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>{charCount} characters</span>
                {wordCount > 30 && (
                  <>
                    <span>•</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Ready for segregation & audit
                    </span>
                  </>
                )}
              </div>
              <span className="text-zinc-400">
                Supports all LinkedIn sections: Headline, About, Experience, Education, Skills
              </span>
            </div>
          </div>

          {/* Helpful Copy Guide Box */}
          <div className="p-4 bg-zinc-50/80 rounded-2xl border border-zinc-200/70 text-xs text-zinc-600 space-y-2">
            <div className="font-bold text-zinc-800 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-indigo-600" />
              <span>How to copy your profile in 5 seconds:</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-zinc-500">
              <li className="flex items-start gap-1.5 bg-white p-2.5 rounded-xl border border-zinc-200/60 shadow-2xs">
                <span className="font-black text-indigo-600">1.</span>
                <span>Open your LinkedIn profile in a browser tab.</span>
              </li>
              <li className="flex items-start gap-1.5 bg-white p-2.5 rounded-xl border border-zinc-200/60 shadow-2xs">
                <span className="font-black text-indigo-600">2.</span>
                <span>Select & copy all text (<kbd className="px-1 py-0.5 bg-zinc-100 rounded text-[10px] font-mono text-zinc-700">Ctrl+A</kbd> / <kbd className="px-1 py-0.5 bg-zinc-100 rounded text-[10px] font-mono text-zinc-700">Cmd+A</kbd>).</span>
              </li>
              <li className="flex items-start gap-1.5 bg-white p-2.5 rounded-xl border border-zinc-200/60 shadow-2xs">
                <span className="font-black text-indigo-600">3.</span>
                <span>Paste directly into the box above and run analysis.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 3: Submit Button & Quick Example */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            type="submit"
            id="btn-run-profile-audit"
            disabled={isLoading}
            className="w-full sm:flex-1 py-4 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-black text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Segregating Profile & Benchmarking...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run 100-Point AI Profile Audit</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              onSubmitAnalysis({
                targetRole: activeRole,
                experience,
                industry,
                companyType,
                location,
                useSample: true
              });
            }}
            disabled={isLoading}
            className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all"
          >
            <span>See Instant Sample Audit</span>
          </button>
        </div>
      </form>
    </div>
  );
};
