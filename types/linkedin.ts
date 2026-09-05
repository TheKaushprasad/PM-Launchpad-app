export interface StructuredProfile {
  personal: {
    name: string;
    location: string;
    headline: string;
  };
  target: {
    role: string;
    industry?: string;
    experience?: string;
    companyType?: string;
    location?: string;
  };
  about: string;
  experience: Array<{
    company: string;
    title: string;
    startDate?: string;
    endDate?: string;
    duration?: string;
    location?: string;
    description: string;
    bullets?: string[];
  }>;
  education: Array<{
    institution: string;
    degree?: string;
    field?: string;
    startDate?: string;
    endDate?: string;
  }>;
  skills: string[];
  certifications: string[];
  projects: string[];
  featured: string[];
  other?: Record<string, any>;
}

export interface CategoryScores {
  headline: number;       // out of 15
  about: number;          // out of 15
  experience: number;     // out of 20
  skills: number;         // out of 10
  education: number;      // out of 5
  completeness: number;   // out of 10
  branding: number;       // out of 10
  discoverability: number;// out of 10
}

export interface RecommendationItem {
  id: string;
  category: 'Headline' | 'About' | 'Experience' | 'Skills' | 'Education' | 'Branding' | 'Discoverability' | 'Completeness';
  severity: 'high' | 'medium' | 'low';
  issue: string;
  whyItMatters: string;
  recommendation: string;
  example: string;
  impact: 'High' | 'Medium' | 'Low';
  completed?: boolean;
}

export interface ExperienceBulletAudit {
  originalBullet: string;
  critique: string;
  frameworkMissing: string[]; // e.g. ["Action", "Context", "Result", "Metric"]
  suggestedBullet: string;
  suggestedMetricPlaceholder?: string;
}

export interface ExperienceRoleAudit {
  company: string;
  title: string;
  score: number; // out of 20
  bullets: ExperienceBulletAudit[];
  generalFeedback: string;
}

export interface KeywordGapData {
  strongKeywords: Array<{ keyword: string; count: number; context: string }>;
  missingKeywords: Array<{ keyword: string; importance: 'Critical' | 'Recommended'; whyItMatters: string }>;
  overusedKeywords: Array<{ keyword: string; advice: string }>;
  irrelevantKeywords: string[];
  keywordCoveragePercent: number;
}

export interface SectionRewrite {
  section: 'headline' | 'about' | 'experience' | 'skills' | 'featured';
  original: string;
  critique: string;
  improvedVersions: Array<{
    title: string;
    content: string;
    focusTag: string; // e.g. "Value-Proposition Focus", "Metrics-Driven", "Executive / Strategic"
  }>;
}

export interface ActionPlanDay {
  dayNumber: number;
  phaseTitle: string;
  estimatedMinutes: number;
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    impact: 'High' | 'Medium' | 'Low';
    completed: boolean;
  }>;
}

export interface CompletenessItem {
  id: string;
  label: string;
  status: 'present' | 'missing' | 'not_detected';
  points: number;
  maxPoints: number;
  recommendation: string;
}

export interface LinkedInAnalysisResult {
  id: string;
  createdAt: string;
  targetRole: string;
  experienceLevel: string;
  industry?: string;
  companyType?: string;
  overallScore: number; // 0-100
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
  verdictLabel: string; // "Exceptional", "Strong", "Good, but needs optimisation", "Needs improvement", "Major optimisation required"
  summary: string;
  recruiterImpression10Sec: string;
  categories: CategoryScores;
  categoryExplanations: {
    headline: string;
    about: string;
    experience: string;
    skills: string;
    education: string;
    completeness: string;
    branding: string;
    discoverability: string;
  };
  strengths: string[];
  weaknesses: string[];
  topActions: Array<{
    priority: number;
    category: string;
    action: string;
    expectedImpact: string;
  }>;
  recommendations: RecommendationItem[];
  rewrites: {
    headline: SectionRewrite;
    about: SectionRewrite;
    experience?: ExperienceRoleAudit[];
  };
  keywordGap: KeywordGapData;
  completenessChecklist: CompletenessItem[];
  actionPlan: ActionPlanDay[];
  structuredProfile: StructuredProfile;
  rawScrapedExcerpt?: string;
  isMockSample?: boolean;
  sourceFileName?: string;
  sourceType?: 'pdf' | 'paste' | 'sample';
}
