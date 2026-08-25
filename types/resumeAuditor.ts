export interface ResumeSubScores {
  impact_metrics_score: number;
  pm_framing_score: number;
  ats_readability_score: number;
  clarity_score: number;
}

export interface BulletRewrite {
  original: string;
  rewritten: string;
  reason: string;
}

export interface JobSuitabilityResult {
  match_score: number;
  verdict: 'Strong Match' | 'Moderate Match' | 'Gaps Detected' | 'High Risk Gap';
  target_job_title?: string;
  matched_skills: string[];
  missing_skills_or_experiences: string[];
  tailoring_recommendations: string[];
}

export interface ResumeAuditResult {
  composite_score: number;
  sub_scores: ResumeSubScores;
  narrative_feedback: string;
  bullet_rewrites: BulletRewrite[];
  top_strengths: string[];
  top_priorities: string[];
  targetRole?: string;
  jobSuitability?: JobSuitabilityResult;
  wordCount?: number;
  analyzedAt?: string;
}
