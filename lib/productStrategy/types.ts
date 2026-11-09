// Shared types for the AI Product Strategy tool (browser and server).
// The tool teaches a strategy framework by filling it in for the user's product: each section comes
// with a one-line "why it matters" tip, and every number the AI made up is labelled as an assumption.

export const PROMPT_VERSION = 'aps-v1';

export const STAGES = ['Idea', 'MVP', 'Growth', 'Mature'] as const;
export const INDUSTRIES = ['EdTech', 'FinTech', 'HealthTech', 'E-commerce', 'SaaS', 'Food delivery', 'Other'] as const;
export const BUSINESS_MODELS = ['B2C', 'B2B', 'B2B2C', 'Marketplace'] as const;
export const GEOGRAPHIES = ['India', 'US', 'SEA', 'Europe', 'Global'] as const;
export const HORIZONS = ['6 months', '1 year', '2 years', '3 years'] as const;
export const TONES = ['Interview-ready', 'Investor', 'Internal team'] as const;
export const DETAIL_LEVELS = ['concise', 'detailed'] as const;
export const EXTRAS = ['assumptions', 'okrs', 'competitors'] as const;

export type DetailLevel = (typeof DETAIL_LEVELS)[number];
export type Extra = (typeof EXTRAS)[number];

export const EXTRA_LABELS: Record<Extra, string> = {
  assumptions: 'Assumptions and risks',
  okrs: 'Success metrics (OKRs)',
  competitors: 'Competitor table',
};

export interface StrategyInputs {
  productName: string;
  oneLiner: string;
  stage: string;
  industry: string;
  industryOther: string;
  businessModel: string;
  geographies: string[];
  targetUsers: string;
  problem: string;
  alternatives: string;
  competitors: string[];
  goal: string;
  horizon: string;
  constraints: string;
  metrics: string;
  styleId: string;
  detail: DetailLevel;
  tone: string;
  extras: Extra[];
}

export const EMPTY_INPUTS: StrategyInputs = {
  productName: '',
  oneLiner: '',
  stage: '',
  industry: '',
  industryOther: '',
  businessModel: '',
  geographies: ['India'],
  targetUsers: '',
  problem: '',
  alternatives: '',
  competitors: [],
  goal: '',
  horizon: '',
  constraints: '',
  metrics: '',
  styleId: '',
  detail: 'concise',
  tone: 'Interview-ready',
  extras: [],
};

export type Confidence = 'High' | 'Medium' | 'Low';

export interface StrategySection {
  key: string;
  title: string;
  /** Markdown (paragraphs, - lists, **bold**). */
  content: string;
  whyItMatters: string;
  confidence: Confidence;
  /** The text before the last edit or regeneration, for Undo. */
  previous?: string;
  origin: 'ai' | 'edited' | 'regenerated';
  hidden?: boolean;
}

export interface StrategyMetric {
  name: string;
  target: string;
  /** "From your inputs" when the number came from the form, otherwise "Assumption". */
  type: 'Assumption' | 'From your inputs';
}

export interface CompetitorRow {
  name: string;
  strength: string;
  gap: string;
  ourAngle: string;
}

export const QUALITY_CHECKS = [
  { key: 'specific', label: 'Specific to your product' },
  { key: 'consistent', label: 'Sections agree with each other' },
  { key: 'measurable', label: 'Measurable metrics' },
  { key: 'tradeoffs', label: 'Clear trade-offs' },
] as const;
export type QualityKey = (typeof QUALITY_CHECKS)[number]['key'];

/** Below this the engine rewrites the weakest sections once with the checker's feedback (FR-15). */
export const QUALITY_PASS = 60;

export interface StrategyQuality {
  /** 0 to 100: four checks of 0 to 25 each. */
  score: number;
  checks: Record<QualityKey, number>;
  tips: string[];
  /** Section keys the checker thinks are weakest, rewritten when the score is below QUALITY_PASS. */
  weakSections: string[];
  feedback: string;
}

export interface StrategyOutput {
  title: string;
  summary: string;
  sections: StrategySection[];
  assumptions: string[];
  metrics: StrategyMetric[];
  competitorTable: CompetitorRow[];
}

export interface StrategyUsageLog {
  step: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  latencyMs: number;
}

export interface StrategyRecord {
  id: string;
  status: 'partial' | 'generated';
  styleId: string;
  inputs: StrategyInputs;
  output: StrategyOutput;
  quality: StrategyQuality | null;
  /** True once the weak sections were rewritten after a low score (allowed once). */
  improved: boolean;
  scoreRuns: number;
  regenCount: number;
  promptVersion: string;
  authorName: string;
  authorRole: string;
  logs: StrategyUsageLog[];
  createdAt: string;
  updatedAt: string;
}

export const MAX_SECTION_REGENERATIONS = 5;
export const MAX_SECTION_CHARS = 3000;
export const HISTORY_LIMIT = 5;
export const FREE_STRATEGIES_PER_MONTH = 3;

/** Field rules from the FRD (min/max characters). Optional fields have min 0. */
export const FIELD_RULES: Record<string, { min: number; max: number; label: string }> = {
  productName: { min: 2, max: 60, label: 'Product name' },
  oneLiner: { min: 10, max: 150, label: 'One-line description' },
  targetUsers: { min: 20, max: 500, label: 'Target users' },
  problem: { min: 20, max: 500, label: 'Main user problem' },
  alternatives: { min: 0, max: 500, label: 'Current alternatives' },
  goal: { min: 20, max: 300, label: 'Company or business goal' },
  constraints: { min: 0, max: 300, label: 'Key constraints' },
  metrics: { min: 0, max: 300, label: 'Current metrics' },
};

export const MAX_COMPETITORS = 5;
