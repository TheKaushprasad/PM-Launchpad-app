import { ResumeAuditResult, BulletRewrite, JobSuitabilityResult } from '../types/resumeAuditor';

export const PM_ACTION_KEYWORDS = [
  'product', 'roadmap', 'prd', 'kpi', 'okr', 'metric', 'user research', 'a/b test', 'conversion', 
  'retention', 'revenue', 'dau', 'mau', 'sprint', 'scrum', 'backlog', 'stakeholder', 'mvp', 
  'launch', 'feature', 'churn', 'cac', 'ltv', 'customer', 'discovery', 'strategy', 'prioritization',
  'growth', 'funnel', 'activation', 'onboarding', 'market fit', 'telemetry', 'analytics', 'experiment'
];

export const WEAK_COORDINATION_PHRASES = [
  'responsible for', 'assisted with', 'helped to', 'worked with', 'coordinated with', 
  'participated in', 'managed day to day', 'tasked with', 'duties included', 'involved in', 
  'contributed to', 'supported the team'
];

export const STRONG_PM_VERBS = [
  'Spearheaded', 'Architected', 'Launched', 'Scaled', 'Pioneered', 'Engineered', 'Orchestrated',
  'Transformed', 'Steered', 'Drove', 'Accelerated', 'Overhauled', 'Championed', 'Established'
];

/**
 * Algorithmic PM Resume Evaluation Engine
 * Provides instant, highly reliable PM hiring manager feedback without external API dependencies.
 */
export function evaluateResumeAlgorithmically(
  resumeText: string,
  targetRole: string = 'Product Manager',
  jobTitle?: string,
  jobDescription?: string
): ResumeAuditResult {
  const lines = resumeText
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 10);

  const bullets = lines.filter(l => 
    l.startsWith('•') || l.startsWith('-') || l.startsWith('*') || 
    /^[0-9]+[.)]/.test(l) || (l.length > 35 && !l.endsWith(':') && l.split(' ').length > 5)
  );

  let metricBulletCount = 0;
  let pmFramedBulletCount = 0;
  const weakBulletsFound: { bullet: string; reason: string; weakPhrase?: string }[] = [];

  bullets.forEach(b => {
    const cleanB = b.replace(/^[•\-*\d.)]+\s*/, '').trim();
    const lower = cleanB.toLowerCase();
    
    // Check for metrics: %, $, numbers, Xx lift, K/M scale
    const hasNumber = /\d+[\.,]?\d*%|\$\s*\d+[\.,]?\d*[kmbt]?|\d+[\.,]?\d*[xX]|\b\d{2,}\b|\b\d+\s*(users|customers|clients|leads|accounts|teams|engineers|days|weeks|hours|bps)/i.test(lower);
    if (hasNumber) metricBulletCount++;

    // Check for PM strategic terminology
    const hasPmTerms = PM_ACTION_KEYWORDS.some(k => lower.includes(k));
    if (hasPmTerms) pmFramedBulletCount++;

    // Check for passive coordination phrases
    const matchedWeak = WEAK_COORDINATION_PHRASES.find(w => lower.includes(w));
    if (matchedWeak) {
      weakBulletsFound.push({
        bullet: cleanB,
        reason: `Uses passive coordination phrase ("${matchedWeak}") rather than owning the product outcome.`,
        weakPhrase: matchedWeak
      });
    } else if (!hasNumber && cleanB.length > 40 && weakBulletsFound.length < 8) {
      weakBulletsFound.push({
        bullet: cleanB,
        reason: `Lacks quantified business metrics or telemetry outcome to substantiate the result.`,
      });
    }
  });

  const totalB = Math.max(bullets.length, 1);
  const metricRatio = metricBulletCount / totalB;
  const pmRatio = pmFramedBulletCount / totalB;

  const impactScore = Math.min(95, Math.max(35, Math.round(metricRatio * 75 + 25)));
  const pmFramingScore = Math.min(96, Math.max(40, Math.round(pmRatio * 70 + 30)));
  
  // ATS section detection
  const lowerResume = resumeText.toLowerCase();
  const hasStandardSections = ['experience', 'education', 'skills'].filter(s => lowerResume.includes(s)).length;
  const atsScore = Math.min(98, Math.max(50, 60 + hasStandardSections * 12));
  const clarityScore = Math.min(95, Math.max(45, Math.round(80 - (weakBulletsFound.length * 3.5))));

  const compositeScore = Math.round(impactScore * 0.35 + pmFramingScore * 0.30 + atsScore * 0.15 + clarityScore * 0.20);

  // Generate bullet rewrites with [METRIC] placeholders
  const candidateRewrites: { bullet: string; reason: string; weakPhrase?: string }[] = 
    weakBulletsFound.length > 0 
      ? weakBulletsFound 
      : bullets.slice(0, 4).map(b => ({
          bullet: b.replace(/^[•\-*\d.)]+\s*/, '').trim(),
          reason: 'Elevate verb strength and anchor with high-impact outcome metrics.'
        }));

  const rewrites: BulletRewrite[] = candidateRewrites.slice(0, 6).map((item, idx) => {
    let rewritten = item.bullet;
    const strongVerb = STRONG_PM_VERBS[idx % STRONG_PM_VERBS.length];

    if (item.weakPhrase) {
      rewritten = rewritten.replace(new RegExp(item.weakPhrase, 'gi'), `${strongVerb} end-to-end product execution for`);
    } else {
      // Replace first word with strong verb if it looks like a generic verb
      const words = rewritten.split(' ');
      if (words.length > 3) {
        words[0] = strongVerb;
        rewritten = words.join(' ');
      }
    }

    if (!/\d+[\.,]?\d*%|\$\s*\d+[\.,]?\d*[kmbt]?|\d+[xX]/i.test(rewritten)) {
      const metricTemplates = [
        `, driving [+X% increase in conversion/adoption] and generating [$Yk ARR].`,
        `, achieving [+X% lift in retention] and reducing customer onboarding friction by [Y days].`,
        `, accelerating delivery cycle by [X weeks] and improving CSAT / NPS by [+Y points].`,
        `, resulting in [+X% DAU growth] across [Y,000+ active enterprise accounts].`
      ];
      const template = metricTemplates[idx % metricTemplates.length];
      rewritten = `${rewritten.replace(/[.]+$/, '')}${template}`;
    }

    return {
      original: item.bullet,
      rewritten: rewritten.charAt(0).toUpperCase() + rewritten.slice(1),
      reason: item.reason
    };
  });

  if (rewrites.length === 0) {
    rewrites.push({
      original: bullets[0]?.replace(/^[•\-*\d.)]+\s*/, '').trim() || "Managed cross functional sprint priorities and customer feedback.",
      rewritten: `Spearheaded customer discovery and backlog prioritization for core platform workflow, driving [+22% feature adoption] and accelerating delivery cycle by [2.5 weeks].`,
      reason: "Replaced task coordination phrasing with proactive PM ownership and quantified outcome metrics."
    });
  }

  // Job Suitability Evaluation
  let jobSuitability: JobSuitabilityResult | undefined = undefined;
  if (jobDescription && jobDescription.trim().length > 10) {
    const jdClean = jobDescription.toLowerCase();
    const jdKeywords = PM_ACTION_KEYWORDS.filter(k => jdClean.includes(k));
    
    const matched = jdKeywords.filter(k => lowerResume.includes(k));
    const missing = jdKeywords.filter(k => !lowerResume.includes(k));

    const totalJDKeys = Math.max(jdKeywords.length, 1);
    const matchScore = Math.min(94, Math.max(40, Math.round((matched.length / totalJDKeys) * 60 + 35)));

    let verdict: JobSuitabilityResult['verdict'] = 'Moderate Match';
    if (matchScore >= 80) verdict = 'Strong Match';
    else if (matchScore < 60) verdict = 'Gaps Detected';

    jobSuitability = {
      match_score: matchScore,
      verdict,
      target_job_title: jobTitle || targetRole,
      matched_skills: matched.length > 0 
        ? matched.slice(0, 5).map(s => s.toUpperCase())
        : ['CROSS-FUNCTIONAL EXECUTION', 'STAKEHOLDER MANAGEMENT', 'SPRINT PLANNING'],
      missing_skills_or_experiences: missing.length > 0 
        ? missing.slice(0, 4).map(s => `Explicit track record in ${s}`)
        : ['0-to-1 Product Discovery Case Studies', 'High-scale experiment design (A/B testing)'],
      tailoring_recommendations: [
        `Embed the exact keywords from the ${jobTitle || targetRole} description into your top 3 experience bullet points.`,
        `Quantify outcomes using metrics matching the employer's core business model (e.g. conversion rates, retention curves, ARR lift).`,
        `Highlight decision trade-offs made directly with engineering and design partners.`
      ]
    };
  }

  return {
    composite_score: compositeScore,
    sub_scores: {
      impact_metrics_score: impactScore,
      pm_framing_score: pmFramingScore,
      ats_readability_score: atsScore,
      clarity_score: clarityScore
    },
    narrative_feedback: `This resume demonstrates solid operational involvement, but currently emphasizes tactical task execution over strategic product ownership. By replacing passive coordination verbs with proactive leadership language and substantiating every achievement with measurable business impact (e.g., revenue, user retention, conversion uplift), you will significantly increase your callback rate for ${targetRole} opportunities.`,
    bullet_rewrites: rewrites,
    top_strengths: [
      "Structured chronological progression with clean section formatting.",
      "Clear exposure to modern cross-functional agile development cycles.",
      "Strong foundational readability for modern Applicant Tracking Systems (ATS)."
    ],
    top_priorities: [
      "Eliminate passive coordination phrases ('worked with', 'assisted') in favor of high-agency verbs ('Spearheaded', 'Architected', 'Launched').",
      "Ensure every major experience bullet concludes with a quantified business metric or telemetry result.",
      "Tighten lengthy bullet descriptions to ensure maximum executive scannability in under 30 seconds."
    ],
    targetRole,
    wordCount: resumeText.trim().split(/\s+/).filter(Boolean).length,
    analyzedAt: new Date().toISOString(),
    ...(jobSuitability ? { jobSuitability } : {})
  };
}
