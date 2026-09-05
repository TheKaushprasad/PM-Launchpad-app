import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Briefcase, Building, MapPin, 
  Sparkles, ArrowLeft, Loader2, AlertCircle, FileText,
  CheckCircle2, HelpCircle, RefreshCw, Send, Compass, 
  ClipboardCopy, Trash2, Info, ChevronRight, Upload,
  Download, MoreHorizontal, ExternalLink, Eye, EyeOff,
  Check, FileCheck, ArrowDown, ArrowRight
} from 'lucide-react';
import { TARGET_ROLE_KEYWORDS } from '../../services/profileAnalyzer';
import { extractTextFromPdfBuffer } from '../../lib/pdfParser';

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
    sourceFileName?: string;
    sourceType?: 'pdf' | 'paste' | 'sample';
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
  // Input Method Tab: 'upload' (PDF) | 'paste' (Raw Text)
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');

  // Target Career Goals (Benchmarking Baseline)
  const [targetRole, setTargetRole] = useState<string>('Product Manager');
  const [customRole, setCustomRole] = useState<string>('');
  const [experience, setExperience] = useState<string>('2-4 years (Mid-Level)');
  const [industry, setIndustry] = useState<string>('Technology / SaaS');
  const [companyType, setCompanyType] = useState<string>('Growth-stage Scale-up');
  const [location, setLocation] = useState<string>('');

  // Profile Details
  const [profileText, setProfileText] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // PDF Upload State
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: number;
    wordCount: number;
  } | null>(null);
  const [isParsingPdf, setIsParsingPdf] = useState<boolean>(false);
  const [parseStatus, setParseStatus] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showExtractedPreview, setShowExtractedPreview] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setUploadedFile(null);
    setValidationError(null);
    setActiveTab('paste');
    onClearError();
  };

  const handleClearText = () => {
    setProfileText('');
    setUploadedFile(null);
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // PDF Processor
  const processPdfFile = async (file: File) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && !file.type.includes('pdf')) {
      setValidationError('Please select a valid PDF file exported from LinkedIn (e.g. Profile.pdf).');
      return;
    }

    setValidationError(null);
    onClearError();
    setIsParsingPdf(true);
    setParseStatus('Reading LinkedIn PDF document...');

    try {
      let extractedText = '';

      // 1. Fast client-side PDF extraction
      try {
        const buffer = await file.arrayBuffer();
        setParseStatus('Extracting profile sections (Headline, Summary, Experience)...');
        const localParsed = await extractTextFromPdfBuffer(buffer, 1500);
        if (localParsed && localParsed.trim().length > 30) {
          extractedText = localParsed.trim();
        }
      } catch (localErr) {
        console.warn('In-browser pdf parser notice, trying server fallback if needed:', localErr);
      }

      // 2. Server-side AI fallback parser if client extraction was empty
      if (!extractedText || extractedText.length < 30) {
        setParseStatus('Processing through high-fidelity document extractor...');
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.includes(',') ? result.split(',')[1] : result;
            resolve(base64);
          };
          reader.onerror = () => reject(new Error('Failed to read file from disk.'));
          reader.readAsDataURL(file);
        });

        const response = await fetch('/api/parse-resume-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileBase64: base64Data,
            fileName: file.name,
            mimeType: file.type || 'application/pdf'
          })
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to extract text from this PDF file.');
        }
        extractedText = data.text;
      }

      if (!extractedText || extractedText.trim().length < 20) {
        throw new Error('Could not extract readable text from this PDF. Please check that the file is not password-protected.');
      }

      const words = extractedText.split(/\s+/).filter(Boolean).length;
      setProfileText(extractedText);
      setUploadedFile({
        name: file.name,
        size: file.size,
        wordCount: words
      });
      setShowExtractedPreview(false);
    } catch (err: any) {
      console.error('PDF parsing error:', err);
      setValidationError(err.message || 'Failed to parse PDF. You can also switch to the "Paste Profile Text" tab.');
    } finally {
      setIsParsingPdf(false);
      setParseStatus('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processPdfFile(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processPdfFile(files[0]);
    }
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
      setValidationError(
        activeTab === 'upload'
          ? 'Please upload your LinkedIn profile PDF (Save to PDF) or switch to the Paste tab.'
          : 'Please paste your LinkedIn profile details or click "Fill Sample PM Profile" to test.'
      );
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
      location,
      sourceFileName: uploadedFile?.name,
      sourceType: uploadedFile ? 'pdf' : 'paste'
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
              <div className="pt-1 flex items-center gap-3">
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

        {/* SECTION 2: Profile Input (Upload PDF or Paste Details) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
          {/* Header with Mode Switcher Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
            <div>
              <h3 className="text-base sm:text-lg font-black text-zinc-900 tracking-tight flex items-center gap-2">
                <span>Provide LinkedIn Profile</span>
                <span className="text-rose-500 text-xs">*</span>
              </h3>
              <p className="text-xs text-zinc-500 font-medium mt-0.5">
                Upload your official LinkedIn Profile PDF (recommended) or paste your profile details below.
              </p>
            </div>

            {/* Tab Selector */}
            <div className="inline-flex p-1 bg-zinc-100 rounded-2xl border border-zinc-200/80 shrink-0">
              <button
                type="button"
                id="tab-upload-pdf"
                onClick={() => {
                  setActiveTab('upload');
                  setValidationError(null);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'upload'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Profile PDF</span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded">
                  Fastest
                </span>
              </button>

              <button
                type="button"
                id="tab-paste-text"
                onClick={() => {
                  setActiveTab('paste');
                  setValidationError(null);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'paste'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Paste Text</span>
              </button>
            </div>
          </div>

          {/* TAB 1: UPLOAD PROFILE PDF */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              {/* Step-by-Step LinkedIn PDF Download Guide */}
              <div className="p-5 sm:p-6 bg-gradient-to-br from-indigo-50/60 via-sky-50/40 to-zinc-50 rounded-2xl border border-indigo-100/80 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-zinc-900 tracking-tight">
                        How to Download Your LinkedIn Profile PDF
                      </h4>
                      <p className="text-[11px] text-zinc-500 font-medium">
                        LinkedIn allows you to export your complete profile to PDF in 3 seconds:
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-white/80 px-2.5 py-1 rounded-lg border border-indigo-200/60 transition-colors self-start sm:self-auto"
                  >
                    <span>Open LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* 3 Step Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-indigo-100/80 shadow-2xs space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-black text-[11px] flex items-center justify-center">
                        1
                      </span>
                      <span className="font-bold text-zinc-900 text-xs">Go to Profile section</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed pl-7">
                      Open LinkedIn and click on your profile photo or navigate to your personal profile page.
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-indigo-200 shadow-xs space-y-1.5 ring-1 ring-indigo-500/10">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[11px] flex items-center justify-center">
                        2
                      </span>
                      <span className="font-bold text-zinc-900 text-xs">Click 3 dots (...) next to "Open to"</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed pl-7">
                      In the top profile intro card, locate the <strong className="text-zinc-800">"..."</strong> (More) button right beside the blue <strong className="text-indigo-600 font-bold">"Open to"</strong> button.
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-indigo-100/80 shadow-2xs space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-black text-[11px] flex items-center justify-center">
                        3
                      </span>
                      <span className="font-bold text-zinc-900 text-xs">Click "Save to PDF"</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-relaxed pl-7">
                      From the dropdown menu, select <strong className="text-emerald-700 font-bold">"Save to PDF"</strong>. Your browser downloads your official profile PDF instantly!
                    </p>
                  </div>
                </div>

                {/* Visual Interface Preview of LinkedIn Header */}
                <div className="bg-white/95 rounded-xl p-3 border border-indigo-100/80 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-zinc-500 pb-2 border-b border-zinc-100">
                    <span className="font-bold text-zinc-700 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-indigo-600" />
                      Visual helper: what it looks like on LinkedIn
                    </span>
                    <span className="text-[10px] text-zinc-400">Profile Header Action Row</span>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <div className="px-3 py-1 bg-[#0A66C2] text-white rounded-full text-[11px] font-bold opacity-80 cursor-default">
                      Open to ▾
                    </div>
                    <div className="px-3 py-1 border border-[#0A66C2] text-[#0A66C2] rounded-full text-[11px] font-bold opacity-80 cursor-default">
                      Add profile section
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border-2 border-indigo-600 text-indigo-900 rounded-full text-[11px] font-black shadow-xs">
                      <MoreHorizontal className="w-4 h-4 text-indigo-600" />
                      <span>More (...)</span>
                      <span className="text-[9px] bg-indigo-600 text-white font-black px-1.5 py-0.5 rounded-full uppercase ml-1">
                        Click Here
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400 hidden sm:block" />
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-[11px] font-bold">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Save to PDF</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Dropzone */}
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf,application/pdf"
                onChange={handleFileInputChange}
                className="hidden"
                id="linkedin-pdf-file-input"
              />

              {!uploadedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-indigo-600 bg-indigo-50/80 scale-[1.01]'
                      : 'border-zinc-300 hover:border-indigo-400 bg-zinc-50/50 hover:bg-zinc-50'
                  }`}
                >
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto shadow-xs">
                      {isParsingPdf ? (
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                      ) : (
                        <Upload className="w-8 h-8 text-indigo-600" />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-base font-black text-zinc-900 tracking-tight">
                        {isParsingPdf
                          ? (parseStatus || 'Processing LinkedIn PDF...')
                          : isDragging
                          ? 'Drop your LinkedIn Profile PDF here'
                          : 'Drop your LinkedIn Profile PDF here, or browse'}
                      </h4>
                      <p className="text-xs text-zinc-500 font-medium">
                        Upload the PDF downloaded via <span className="font-semibold text-zinc-700">"3 dots (...) &gt; Save to PDF"</span>. Standard LinkedIn PDF formats supported.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Select Profile PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFillSample();
                        }}
                        className="px-4 py-2.5 bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Try Sample PM Profile</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-zinc-400 font-medium">
                      Maximum file size: 10MB • All profile data is evaluated securely
                    </div>
                  </div>
                </div>
              ) : (
                /* Uploaded File Success Card */
                <div className="bg-white rounded-2xl border-2 border-emerald-500/30 p-5 sm:p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                        <FileCheck className="w-6 h-6" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm sm:text-base text-zinc-900 truncate max-w-xs sm:max-w-md">
                            {uploadedFile.name}
                          </h4>
                          <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            PDF Ready
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 font-medium flex items-center gap-2">
                          <span>{(uploadedFile.size / 1024).toFixed(0)} KB</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-bold">{uploadedFile.wordCount} words extracted</span>
                          <span>•</span>
                          <span>Headline, About, Experience & Skills detected</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Change File</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleClearText}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Toggle Preview Button */}
                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setShowExtractedPreview(!showExtractedPreview)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors"
                    >
                      {showExtractedPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showExtractedPreview ? 'Hide Extracted Profile Text' : 'View Extracted Profile Text'}</span>
                    </button>
                    <span className="text-[11px] text-zinc-400">
                      You can edit or add notes in the text view if needed
                    </span>
                  </div>

                  {/* Collapsible Preview Box */}
                  <AnimatePresence>
                    {showExtractedPreview && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden space-y-2 pt-2"
                      >
                        <textarea
                          rows={8}
                          value={profileText}
                          onChange={(e) => setProfileText(e.target.value)}
                          className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-mono text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-y"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PASTE RAW TEXT */}
          {activeTab === 'paste' && (
            <div className="space-y-5">
              {/* Quick tip banner for PDF upload */}
              <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex items-start sm:items-center justify-between gap-3 text-xs text-indigo-900">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    <strong>Have your LinkedIn PDF?</strong> Switch to the <strong>Upload Profile PDF</strong> tab to upload the PDF exported from LinkedIn.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className="px-2.5 py-1 bg-indigo-600 text-white font-bold rounded-lg shrink-0 text-[11px] hover:bg-indigo-500 transition-colors"
                >
                  Switch to Upload
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-zinc-700">
                  Paste entire profile content (Headline, About, Experience, Education, Skills):
                </span>

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

              {/* Copy Guide Box */}
              <div className="p-4 bg-zinc-50/80 rounded-2xl border border-zinc-200/70 text-xs text-zinc-600 space-y-2">
                <div className="font-bold text-zinc-800 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-600" />
                  <span>How to copy your profile text:</span>
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
          )}
        </div>

        {/* SECTION 3: Submit Button & Quick Example */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            type="submit"
            id="btn-run-profile-audit"
            disabled={isLoading || isParsingPdf}
            className="w-full sm:flex-1 py-4 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-black text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Segregating Profile & Benchmarking...</span>
              </>
            ) : isParsingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Parsing LinkedIn PDF Document...</span>
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
            disabled={isLoading || isParsingPdf}
            className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all"
          >
            <span>See Instant Sample Audit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

