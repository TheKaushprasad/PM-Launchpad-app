import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Briefcase, Building, MapPin, 
  Sparkles, ArrowLeft, Loader2, AlertCircle, FileText,
  CheckCircle2, RefreshCw, Trash2, Info, Upload,
  Download, ExternalLink, Eye, EyeOff,
  Check, FileCheck, ArrowRight, ChevronDown, ChevronUp, AlertTriangle
} from 'lucide-react';
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
  const [experience, setExperience] = useState<string>('2–4 years · Mid-Level');
  const [industry, setIndustry] = useState<string>('Technology / SaaS');
  const [companyType, setCompanyType] = useState<string>('Growth-stage / Scale-up');
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
  const [pdfUploadError, setPdfUploadError] = useState<string | null>(null);

  // Guide accordion state (collapsed by default)
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const targetCardRef = useRef<HTMLDivElement>(null);

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
    setUploadedFile({
      name: 'Alex_Chen_LinkedIn_Profile.pdf',
      size: 48500,
      wordCount: sampleProfileText.split(/\s+/).filter(Boolean).length
    });
    setPdfUploadError(null);
    setValidationError(null);
    onClearError();
  };

  const handleClearProfile = () => {
    setProfileText('');
    setUploadedFile(null);
    setPdfUploadError(null);
    setValidationError(null);
    setShowExtractedPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // PDF Processor
  const processPdfFile = async (file: File) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && !file.type.includes('pdf')) {
      setPdfUploadError('Please select a valid PDF file exported directly from LinkedIn (e.g. Profile.pdf).');
      return;
    }

    setPdfUploadError(null);
    setValidationError(null);
    onClearError();
    setIsParsingPdf(true);
    setParseStatus('Reading LinkedIn PDF document...');

    try {
      let extractedText = '';

      // 1. Fast client-side PDF extraction
      try {
        const buffer = await file.arrayBuffer();
        setParseStatus('Extracting profile sections (Headline, About, Experience)...');
        const localParsed = await extractTextFromPdfBuffer(buffer, 1500);
        if (localParsed && localParsed.trim().length > 30) {
          extractedText = localParsed.trim();
        }
      } catch (localErr) {
        console.warn('In-browser pdf parser notice, trying server fallback:', localErr);
      }

      // 2. Server-side AI fallback parser if client extraction was insufficient
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
        throw new Error('We couldn\'t read this PDF. Please upload the PDF downloaded directly from LinkedIn.');
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
      setPdfUploadError(err.message || 'We couldn\'t read this PDF. Please upload the PDF downloaded directly from LinkedIn.');
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

  // Target Role options
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

  // Experience options
  const experienceOptions = [
    '0–1 years · Entry / Transition',
    '1–2 years · Early Career',
    '2–4 years · Mid-Level',
    '5–8 years · Senior',
    '8+ years · Lead / Director'
  ];

  // Industry options
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

  // Company type options
  const companyTypeOptions = [
    'Growth-stage / Scale-up',
    'Early-stage Startup (0-to-1)',
    'Big Tech / FAANG',
    'Public Enterprise',
    'Boutique / Agency'
  ];

  const activeRole = targetRole === 'Other (Custom)' ? (customRole || 'Product Professional') : targetRole;
  const wordCount = profileText.trim() ? profileText.trim().split(/\s+/).length : 0;
  const charCount = profileText.length;
  const isProfileReady = (!!uploadedFile || profileText.trim().length >= 40) && !isParsingPdf;

  // Section validation detection
  const detectedSections = useMemo(() => {
    if (!profileText || profileText.trim().length < 20) {
      return { hasExperience: false, hasSkills: false, hasAbout: false, hasEducation: false };
    }
    const clean = profileText.toLowerCase();

    const hasExperience = 
      /(?:^|\n)[#\s*]*(?:experience|work experience|employment history|professional experience|career history)[:\s]*(?:\n|$)/i.test(profileText) ||
      /(\b(?:present|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{4}\b|\bfull-time\b|\bpart-time\b)/i.test(clean);

    const hasSkills = 
      /(?:^|\n)[#\s*]*(?:skills|top skills|skills & endorsements|key competencies|core skills|technical skills)[:\s]*(?:\n|$)/i.test(profileText) ||
      /(\bproduct management\b|\broadmap\b|\ba\/b testing\b|\bsql\b|\bjira\b|\bagile\b|\bscrum\b|\banalytics\b|\bstrategy\b)/i.test(clean);

    const hasAbout = 
      /(?:^|\n)[#\s*]*(?:about|summary|about me|professional summary|executive summary|bio)[:\s]*(?:\n|$)/i.test(profileText) ||
      /(\bproduct manager with\b|\bexperienced in\b|\bpassionate about\b|\bover \d+ years of experience\b|\babout\b)/i.test(clean);

    const hasEducation = 
      /(?:^|\n)[#\s*]*(?:education|academic background|degrees|education history)[:\s]*(?:\n|$)/i.test(profileText) ||
      /(\buniversity\b|\bcollege\b|\bbachelor\b|\bmaster\b|\bb\.s\b|\bm\.s\b|\bmba\b|\bdegree\b)/i.test(clean);

    return { hasExperience, hasSkills, hasAbout, hasEducation };
  }, [profileText]);

  // Stepper state computation
  // Step 1: Target configured
  // Step 2: Profile (active if not ready, checked if ready)
  // Step 3: AI Audit (ready when profile is uploaded)
  const isTargetConfigured = !!activeRole && !!experience && !!industry;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setValidationError(null);
    onClearError();

    if (!isProfileReady) {
      setValidationError(
        activeTab === 'upload'
          ? 'Please select or drop your LinkedIn Profile PDF, or try the sample profile.'
          : 'Please paste your LinkedIn profile details or click "Fill Sample PM Profile" to proceed.'
      );
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

  // Clean label for target summary
  const summaryExperience = experience.includes('·') ? experience.split('·')[1]?.trim() : experience;
  const summaryIndustry = industry.includes('/') ? industry.split('/')[0]?.trim() : industry;
  const summaryCompany = companyType.includes('/') ? companyType.split('/')[0]?.trim() : companyType;

  return (
    <div className="max-w-4xl mx-auto py-2 pb-32 sm:pb-36 transition-all">
      {/* 1. PAGE HEADER */}
      <div className="space-y-4">
        {/* Navigation & Tag */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Overview</span>
          </button>

          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50/90 border border-blue-100/80 px-3 py-1 rounded-full">
            AI PROFILE AUDITOR
          </span>
        </div>

        {/* Title and Supporting Copy */}
        <div className="space-y-1.5 pt-1">
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-zinc-900 tracking-tight leading-tight">
            Optimize your LinkedIn profile
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-2xl font-normal">
            Benchmark your LinkedIn profile against the hiring criteria for your target PM role and get prioritized recommendations.
          </p>
        </div>

        {/* Compact Progress Stepper */}
        <div className="pt-2 sm:pt-3">
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold py-2 px-3 sm:px-4 bg-zinc-50/80 rounded-2xl border border-zinc-200/70 w-fit">
            {/* Step 01 */}
            <div className={`flex items-center gap-1.5 transition-colors ${
              isTargetConfigured ? 'text-blue-600' : 'text-zinc-900'
            }`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isTargetConfigured ? 'bg-blue-100 text-blue-700' : 'bg-zinc-200 text-zinc-700'
              }`}>
                {isTargetConfigured ? <Check className="w-3 h-3 stroke-[2.5]" /> : '01'}
              </span>
              <span className="text-xs font-semibold">01 Target role</span>
            </div>

            <div className={`h-0.5 w-6 sm:w-10 rounded-full transition-colors ${
              isTargetConfigured ? 'bg-blue-200' : 'bg-zinc-200'
            }`} />

            {/* Step 02 */}
            <div className={`flex items-center gap-1.5 transition-colors ${
              isProfileReady 
                ? 'text-emerald-600' 
                : isTargetConfigured 
                ? 'text-blue-600' 
                : 'text-zinc-400'
            }`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isProfileReady 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : isTargetConfigured 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-zinc-100 text-zinc-400'
              }`}>
                {isProfileReady ? <Check className="w-3 h-3 stroke-[2.5]" /> : '02'}
              </span>
              <span className="text-xs font-semibold">02 Profile</span>
            </div>

            <div className={`h-0.5 w-6 sm:w-10 rounded-full transition-colors ${
              isProfileReady ? 'bg-emerald-200' : 'bg-zinc-200'
            }`} />

            {/* Step 03 */}
            <div className={`flex items-center gap-1.5 transition-colors ${
              isProfileReady ? 'text-blue-600 font-bold' : 'text-zinc-400'
            }`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isProfileReady ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-400'
              }`}>
                03
              </span>
              <span className="text-xs font-semibold">03 AI Audit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Error Banner */}
      <AnimatePresence>
        {(scrapeErrorNotice || validationError) && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs leading-relaxed"
          >
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <span className="font-bold">Required action: </span>
              <span>{validationError || scrapeErrorNotice}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="mt-7 space-y-7">
        {/* ==================================================
            2. TARGET CAREER GOALS CARD: "Define your target role"
            ================================================== */}
        <div 
          ref={targetCardRef}
          className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs hover:shadow-sm transition-all space-y-5"
        >
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
                  Define your target role
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200/60">
                  CALIBRATION BASELINE
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-normal mt-1 leading-relaxed">
                Tell us what kind of PM role you're targeting so we can benchmark your profile against relevant hiring criteria.
              </p>
            </div>
          </div>

          {/* Form Fields: Row 1 (3-column on desktop) & Row 2 (2-column on desktop) */}
          <div className="space-y-4">
            {/* Row 1: Target Role, Experience Level, Target Industry */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Target Role */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Target role <span className="text-blue-600">*</span></span>
                  </span>
                </label>
                <select
                  id="target-role-select"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full h-11 sm:h-12 px-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
                >
                  {targetRoleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>

                {targetRole === 'Other (Custom)' && (
                  <div className="pt-1.5">
                    <input
                      type="text"
                      placeholder="e.g. Chief of Staff, Technical PM"
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      className="w-full h-10 px-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                    />
                  </div>
                )}
              </div>

              {/* Experience Level */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Experience level <span className="text-blue-600">*</span></span>
                </label>
                <select
                  id="experience-level-select"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full h-11 sm:h-12 px-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
                >
                  {experienceOptions.map((exp) => (
                    <option key={exp} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>

              {/* Target Industry */}
              <div className="space-y-1.5 md:col-span-2 lg:col-span-1">
                <label className="block text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Target industry <span className="text-blue-600">*</span></span>
                </label>
                <select
                  id="industry-select"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full h-11 sm:h-12 px-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
                >
                  {industryOptions.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Target Company Type & Target Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Target Company Type */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-800">Target company type</label>
                <select
                  id="company-type-select"
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value)}
                  className="w-full h-11 sm:h-12 px-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
                >
                  {companyTypeOptions.map((comp) => (
                    <option key={comp} value={comp}>{comp}</option>
                  ))}
                </select>
              </div>

              {/* Target Location / Hiring Market */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Target location / hiring market · Optional</span>
                </label>
                <input
                  type="text"
                  id="target-location-input"
                  placeholder="e.g. Bengaluru, London, Remote US"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-11 sm:h-12 px-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Microcopy */}
          <p className="text-[11px] text-zinc-400 font-normal">
            These settings determine how your profile is evaluated. You can change them anytime.
          </p>

          {/* 3. TARGET SUMMARY CONFIRMATION */}
          <div className="p-3 bg-zinc-50/80 rounded-2xl border border-zinc-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-zinc-500 font-medium">Audit calibrated for:</span>
              <span className="font-bold text-zinc-900">
                {activeRole} · {summaryExperience} · {summaryIndustry} · {summaryCompany}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                targetCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const el = document.getElementById('target-role-select');
                if (el) el.focus();
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 underline underline-offset-2 self-start sm:self-auto cursor-pointer transition-colors"
            >
              Change target
            </button>
          </div>
        </div>

        {/* ==================================================
            4. LINKEDIN PROFILE CARD: "Add your LinkedIn profile"
            ================================================== */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs hover:shadow-sm transition-all space-y-6">
          {/* Card Header & Tab Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight flex items-center gap-1.5">
                <span>Add your LinkedIn profile</span>
                <span className="text-blue-600 text-sm">*</span>
              </h2>
              <p className="text-xs text-zinc-500 font-normal mt-0.5 leading-relaxed">
                Upload your LinkedIn Profile PDF for the most accurate audit, or paste your profile details manually.
              </p>
            </div>

            {/* Upload Method Selector */}
            <div className="inline-flex p-1 bg-zinc-100 rounded-2xl border border-zinc-200/60 shrink-0">
              <button
                type="button"
                id="tab-upload-pdf"
                onClick={() => {
                  setActiveTab('upload');
                  setValidationError(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-white text-blue-700 shadow-xs ring-1 ring-black/5'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload LinkedIn PDF</span>
                <span className="text-[9px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                  RECOMMENDED
                </span>
              </button>

              <button
                type="button"
                id="tab-paste-text"
                onClick={() => {
                  setActiveTab('paste');
                  setValidationError(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'paste'
                    ? 'bg-white text-blue-700 shadow-xs ring-1 ring-black/5'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Paste profile text</span>
                <span className="text-[9px] text-zinc-400 font-medium hidden sm:inline">
                  Alternative
                </span>
              </button>
            </div>
          </div>

          {/* ==================================================
              5 & 6. UPLOAD AREA (BEFORE INSTRUCTIONS)
              ================================================== */}
          {activeTab === 'upload' && (
            <div className="space-y-5">
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf,application/pdf"
                onChange={handleFileInputChange}
                className="hidden"
                id="linkedin-pdf-file-input"
              />

              {/* State 1: EMPTY UPLOAD ZONE */}
              {!uploadedFile && !isParsingPdf && !pdfUploadError && (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-blue-600 bg-blue-50/60 scale-[1.005]'
                      : 'border-zinc-300 hover:border-blue-400 bg-zinc-50/40 hover:bg-zinc-50/90'
                  }`}
                >
                  <div className="max-w-md mx-auto space-y-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mx-auto shadow-2xs">
                      <Upload className="w-6 h-6 text-blue-600" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-zinc-900">
                        Upload your LinkedIn Profile PDF
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Drop your PDF here or browse your computer
                      </p>
                    </div>

                    <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>SELECT PROFILE PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFillSample();
                        }}
                        className="px-3.5 py-2 bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Try a sample PM profile</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-zinc-400 font-normal">
                      PDF only · Max 10MB · Secure processing
                    </div>
                  </div>
                </div>
              )}

              {/* State 2: UPLOADING STATE */}
              {isParsingPdf && (
                <div className="border-2 border-blue-200 bg-blue-50/40 rounded-2xl p-7 sm:p-9 text-center space-y-3 animate-pulse">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xs">
                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900">
                      Uploading your profile...
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium">
                      {parseStatus || 'Extracting profile structure and keywords...'}
                    </p>
                  </div>
                  <div className="w-48 mx-auto h-1.5 bg-blue-100 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-blue-600 rounded-full animate-progress" />
                  </div>
                </div>
              )}

              {/* State 3: ERROR STATE */}
              {pdfUploadError && !isParsingPdf && (
                <div className="border-2 border-rose-200 bg-rose-50/40 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-rose-900">
                      We couldn't read this PDF
                    </h3>
                    <p className="text-xs text-rose-700 max-w-md mx-auto">
                      {pdfUploadError}
                    </p>
                  </div>
                  <div className="pt-1 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPdfUploadError(null);
                        fileInputRef.current?.click();
                      }}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Try another PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPdfUploadError(null);
                        setActiveTab('paste');
                      }}
                      className="px-3.5 py-2 bg-white text-zinc-700 border border-zinc-200 text-xs font-semibold rounded-xl hover:bg-zinc-50 transition-all cursor-pointer"
                    >
                      Paste text manually
                    </button>
                  </div>
                </div>
              )}

              {/* State 4: SUCCESS STATE */}
              {uploadedFile && !isParsingPdf && (
                <div className="bg-zinc-50/70 rounded-2xl border border-emerald-300/80 p-4 sm:p-5 space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-xs sm:text-sm text-zinc-900 truncate max-w-xs sm:max-w-md">
                            {uploadedFile.name}
                          </h3>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                            <span>Uploaded</span>
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-2">
                          <span>Profile detected · Ready for analysis</span>
                          <span>•</span>
                          <span>{uploadedFile.wordCount} words</span>
                          <span>•</span>
                          <span>{(uploadedFile.size / 1024).toFixed(0)} KB</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-semibold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Replace PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleClearProfile}
                        className="p-1.5 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Optional Preview Toggle */}
                  <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => setShowExtractedPreview(!showExtractedPreview)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {showExtractedPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showExtractedPreview ? 'Hide extracted text' : 'View extracted text'}</span>
                    </button>
                    <span className="text-[11px] text-zinc-400">
                      Standard LinkedIn export parsed
                    </span>
                  </div>

                  {showExtractedPreview && (
                    <div className="pt-1">
                      <textarea
                        rows={6}
                        value={profileText}
                        onChange={(e) => setProfileText(e.target.value)}
                        className="w-full p-3 bg-white border border-zinc-200 rounded-xl text-xs font-mono text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-y"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* ==================================================
                  7. "WHAT YOU'LL GET" BENEFIT ROW
                  ================================================== */}
              <div className="p-3 bg-zinc-50/60 rounded-2xl border border-zinc-200/60 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  What you'll get
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-zinc-700">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                    <span>Profile score</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                    <span>Recruiter search analysis</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                    <span>Keyword gaps</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                    <span>Rewrite recommendations</span>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  8 & 9. MOVE LINKEDIN INSTRUCTIONS INTO ACCORDION & SIMPLIFIED VISUAL HELPER
                  ================================================== */}
              <div className="rounded-2xl border border-zinc-200/70 overflow-hidden bg-zinc-50/40">
                <button
                  type="button"
                  onClick={() => setIsGuideOpen(!isGuideOpen)}
                  className="w-full p-3.5 px-4 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-zinc-800">
                      Need help downloading your LinkedIn PDF?
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-600">
                    <span>{isGuideOpen ? 'Hide guide' : 'View 3-step guide'}</span>
                    {isGuideOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isGuideOpen && (
                  <div className="p-4 pt-2 border-t border-zinc-200/60 space-y-4 bg-white">
                    {/* 3 Step Guide */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-zinc-50 rounded-xl space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                            1
                          </span>
                          <span className="font-bold text-zinc-900">01 Open your profile</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 pl-6 leading-relaxed">
                          Go to your LinkedIn profile page.
                        </p>
                      </div>

                      <div className="p-3 bg-zinc-50 rounded-xl space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                            2
                          </span>
                          <span className="font-bold text-zinc-900">02 Click More (...)</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 pl-6 leading-relaxed">
                          Click More beside your profile actions.
                        </p>
                      </div>

                      <div className="p-3 bg-zinc-50 rounded-xl space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center">
                            3
                          </span>
                          <span className="font-bold text-zinc-900">03 Save to PDF</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 pl-6 leading-relaxed">
                          Select Save to PDF from the menu.
                        </p>
                      </div>
                    </div>

                    {/* Simplified Visual Helper & External Link */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-semibold text-zinc-400">Helper:</span>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 text-zinc-700 rounded-lg font-medium text-[11px]">
                          <span>Open to ▾</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-zinc-300" />
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg font-bold text-[11px]">
                          <span>More (...)</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-zinc-300" />
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg font-bold text-[11px]">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Save to PDF</span>
                        </div>
                      </div>

                      <a
                        href="https://www.linkedin.com/in/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors self-start sm:self-auto"
                      >
                        <span>Open LinkedIn</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PASTE RAW TEXT (Alternative Option) */}
          {activeTab === 'paste' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-zinc-800">
                  Paste entire profile content:
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFillSample}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Fill Sample PM Profile</span>
                  </button>

                  {profileText && (
                    <button
                      type="button"
                      onClick={handleClearProfile}
                      className="px-2.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-semibold text-xs rounded-xl flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>
              </div>

              <textarea
                id="profile-full-text-input"
                rows={10}
                value={profileText}
                onChange={(e) => {
                  setProfileText(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder={`Paste your LinkedIn profile text here...\n\nInclude:\n• Headline\n• About section\n• Experience (roles, bullets, metrics)\n• Education & Skills`}
                className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs sm:text-sm font-mono leading-relaxed text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all resize-y"
              />

              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium px-1">
                <span>{wordCount} words · {charCount} characters</span>
                <span className="text-blue-600 font-semibold">
                  {wordCount > 30 ? 'Ready for AI analysis' : 'Provide headline, experience, and skills'}
                </span>
              </div>
            </div>
          )}

          {/* ==================================================
              12. PROFILE VALIDATION (AFTER UPLOAD OR PASTE)
              ================================================== */}
          {isProfileReady && (
            <div className="p-3.5 bg-zinc-50/70 rounded-2xl border border-zinc-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Profile detected</span>
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Ready for AI analysis
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {/* Experience */}
                <div className={`flex items-center gap-1.5 p-2 rounded-xl transition-all ${
                  detectedSections.hasExperience ? 'bg-white text-zinc-800 border border-zinc-200/70 shadow-2xs' : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                }`}>
                  {detectedSections.hasExperience ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  )}
                  <span className="font-semibold text-[11px]">
                    {detectedSections.hasExperience ? 'Experience' : 'Missing Experience'}
                  </span>
                </div>

                {/* Skills */}
                <div className={`flex items-center gap-1.5 p-2 rounded-xl transition-all ${
                  detectedSections.hasSkills ? 'bg-white text-zinc-800 border border-zinc-200/70 shadow-2xs' : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                }`}>
                  {detectedSections.hasSkills ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  )}
                  <span className="font-semibold text-[11px]">
                    {detectedSections.hasSkills ? 'Skills' : 'Missing Skills'}
                  </span>
                </div>

                {/* About */}
                <div className={`flex items-center justify-between gap-1.5 p-2 rounded-xl transition-all ${
                  detectedSections.hasAbout ? 'bg-white text-zinc-800 border border-zinc-200/70 shadow-2xs' : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                }`}>
                  <div className="flex items-center gap-1.5">
                    {detectedSections.hasAbout ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    <span className="font-semibold text-[11px]">
                      {detectedSections.hasAbout ? 'About' : 'Missing About'}
                    </span>
                  </div>
                  {!detectedSections.hasAbout && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('paste');
                        setProfileText(prev => prev + '\n\nAbout\nProduct Manager with demonstrated experience delivering high-impact products.');
                      }}
                      className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Add manually
                    </button>
                  )}
                </div>

                {/* Education */}
                <div className={`flex items-center gap-1.5 p-2 rounded-xl transition-all ${
                  detectedSections.hasEducation ? 'bg-white text-zinc-800 border border-zinc-200/70 shadow-2xs' : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                }`}>
                  {detectedSections.hasEducation ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  )}
                  <span className="font-semibold text-[11px]">
                    {detectedSections.hasEducation ? 'Education' : 'Missing Education'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ==================================================
            14. CTA VALUE PROPOSITION & SECONDARY IN-PAGE CTA
            ================================================== */}
        <div className="p-4 bg-zinc-50/60 rounded-2xl border border-zinc-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-zinc-600 font-normal leading-relaxed text-center sm:text-left">
            You’ll receive a profile score, recruiter-search analysis, keyword gaps, and prioritized rewrite recommendations.
          </p>

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
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 shrink-0 cursor-pointer hover:underline transition-colors"
          >
            See instant sample audit instead
          </button>
        </div>
      </form>

      {/* ==================================================
          13. STICKY PRIMARY CTA BOTTOM BAR
          ================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200/80 shadow-lg py-3 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Status on the left */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              <Check className="w-3 h-3 stroke-[2.5]" />
              <span>Target configured</span>
            </span>

            {isProfileReady ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                <Check className="w-3 h-3 stroke-[2.5]" />
                <span>Profile ready</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full">
                <span>02 Profile pending</span>
              </span>
            )}

            <span className="hidden md:inline text-[11px] text-zinc-400 font-normal">
              AI audit · ~2 min
            </span>
          </div>

          {/* Dominant Action Button on the right */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              id="btn-sticky-run-audit"
              onClick={() => handleSubmit()}
              disabled={!isProfileReady || isLoading || isParsingPdf}
              className={`group px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                isProfileReady && !isLoading && !isParsingPdf
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 active:scale-[0.98]'
                  : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Auditing Profile...</span>
                </>
              ) : (
                <>
                  <span>RUN AI AUDIT</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
