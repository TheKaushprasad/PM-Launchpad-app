import { CandidateLevel, HiringVerdict, InterviewTrack, LegacyHiringVerdict, PillarKey } from '../types/interview';

/**
 * One entry per interview round. Shared by the browser (tabs, scorecard labels)
 * and the server (pillar weights, interviewer guidance). Pillar keys stay the
 * same for every track so stored scorecards keep working; only the names and
 * weights change to match how each round is scored in real PM loops.
 */
export interface TrackConfig {
  id: InterviewTrack;
  label: string;
  shortLabel: string;
  description: string;
  pillarNames: Record<PillarKey, string>;
  /** Must add up to 1. */
  weights: Record<PillarKey, number>;
  /** Used when a scenario has no curveball of its own. */
  defaultCurveball: string;
}

export const PILLAR_KEYS: PillarKey[] = ['clarification', 'framework', 'analyticalRigor', 'communication', 'synthesis'];

export const BASE_PILLAR_NAMES: Record<PillarKey, string> = {
  clarification: 'Clarification & Scope',
  framework: 'Structured Thinking',
  analyticalRigor: 'Analysis & Reasoning',
  communication: 'Communication',
  synthesis: 'Final Recommendation'
};

export const TRACK_CONFIGS: Record<InterviewTrack, TrackConfig> = {
  design: {
    id: 'design',
    label: 'Product Design',
    shortLabel: 'Design',
    description: 'Product sense: users, pain points, prioritised solutions and success metrics.',
    pillarNames: {
      clarification: 'Goal & User Framing',
      framework: 'Segments & Prioritisation',
      analyticalRigor: 'Solution Quality & Trade-offs',
      communication: 'Communication',
      synthesis: 'Metrics & Recommendation'
    },
    weights: { clarification: 0.15, framework: 0.25, analyticalRigor: 0.3, communication: 0.1, synthesis: 0.2 },
    defaultCurveball: 'Engineering capacity was just cut in half for the next two quarters. Ask which part of their solution they would keep and why.'
  },
  rca: {
    id: 'rca',
    label: 'Root Cause Analysis',
    shortLabel: 'Root Cause',
    description: 'Diagnose a metric change: scope it, form hypotheses, test them with data.',
    pillarNames: { ...BASE_PILLAR_NAMES },
    weights: { clarification: 0.15, framework: 0.25, analyticalRigor: 0.25, communication: 0.15, synthesis: 0.2 },
    defaultCurveball: 'Tell them a second metric (for example, support tickets or session length) moved at the same time. Ask whether that changes their leading hypothesis.'
  },
  metrics: {
    id: 'metrics',
    label: 'Metrics & Execution',
    shortLabel: 'Metrics',
    description: 'Define success, pick a North Star and guardrails, and make metric trade-off calls.',
    pillarNames: {
      clarification: 'Goal & Context',
      framework: 'Metric Framework',
      analyticalRigor: 'Metric Choice & Trade-offs',
      communication: 'Communication',
      synthesis: 'Decision & Guardrails'
    },
    weights: { clarification: 0.15, framework: 0.2, analyticalRigor: 0.3, communication: 0.1, synthesis: 0.25 },
    defaultCurveball: 'Tell them the North Star they picked went up but a guardrail metric dropped 4% in the experiment. Ask whether they ship.'
  },
  guesstimate: {
    id: 'guesstimate',
    label: 'Estimation',
    shortLabel: 'Estimation',
    description: 'Market sizing and estimation: structure, assumptions, arithmetic and a sanity check.',
    pillarNames: {
      clarification: 'Scope & Definitions',
      framework: 'Estimation Structure',
      analyticalRigor: 'Assumptions & Math',
      communication: 'Communication',
      synthesis: 'Final Number & Sanity Check'
    },
    weights: { clarification: 0.15, framework: 0.25, analyticalRigor: 0.35, communication: 0.1, synthesis: 0.15 },
    defaultCurveball: 'Challenge their most important assumption with a plausible alternative value. Ask how much the final number moves.'
  },
  strategy: {
    id: 'strategy',
    label: 'Product Strategy',
    shortLabel: 'Strategy',
    description: 'Market, competition, options and a clear strategic bet with risks.',
    pillarNames: {
      clarification: 'Goal & Market Context',
      framework: 'Strategic Framing & Options',
      analyticalRigor: 'Competitive & Economic Reasoning',
      communication: 'Communication',
      synthesis: 'Strategic Bet & Risks'
    },
    weights: { clarification: 0.15, framework: 0.25, analyticalRigor: 0.25, communication: 0.1, synthesis: 0.25 },
    defaultCurveball: 'A major competitor just announced the same move at a lower price. Ask whether their recommendation changes.'
  },
  behavioral: {
    id: 'behavioral',
    label: 'Behavioral & Leadership',
    shortLabel: 'Behavioral',
    description: 'STAR stories about leadership, conflict, failure and ownership (incl. Amazon Leadership Principles).',
    pillarNames: {
      clarification: 'Situation & Stakes',
      framework: 'Story Structure (STAR)',
      analyticalRigor: 'Ownership & Actions',
      communication: 'Communication',
      synthesis: 'Results & Reflection'
    },
    weights: { clarification: 0.1, framework: 0.15, analyticalRigor: 0.35, communication: 0.15, synthesis: 0.25 },
    defaultCurveball: 'Ask what they would have done if their manager had disagreed with their decision at the critical moment.'
  },
  ai: {
    id: 'ai',
    label: 'AI Product Sense',
    shortLabel: 'AI Product',
    description: 'Design and evaluate AI features: user value, model behaviour, evaluation, risks and cost.',
    pillarNames: {
      clarification: 'Problem & User Framing',
      framework: 'Solution & System Design',
      analyticalRigor: 'Quality, Evaluation & Risks',
      communication: 'Communication',
      synthesis: 'Launch Plan & Metrics'
    },
    weights: { clarification: 0.15, framework: 0.2, analyticalRigor: 0.3, communication: 0.1, synthesis: 0.25 },
    defaultCurveball: 'Tell them early testing shows the model gives a confidently wrong answer about 5% of the time. Ask what they change before launch.'
  }
};

/** Order of tabs in the interview hub. */
export const TRACK_ORDER: InterviewTrack[] = ['design', 'rca', 'metrics', 'guesstimate', 'strategy', 'behavioral', 'ai'];

export function getTrackConfig(track?: string): TrackConfig {
  return TRACK_CONFIGS[(track as InterviewTrack)] || TRACK_CONFIGS.rca;
}

export interface LevelConfig {
  id: CandidateLevel;
  label: string;
  short: string;
  description: string;
}

export const LEVELS: LevelConfig[] = [
  { id: 'apm', label: 'Associate PM', short: 'APM', description: 'New grads and career switchers. Strong structure and clear reasoning; some guidance on strategy is expected.' },
  { id: 'pm', label: 'Product Manager', short: 'PM', description: '2-5 years. Drives the case with little prompting and makes sound trade-offs.' },
  { id: 'spm', label: 'Senior PM', short: 'Senior PM', description: '5+ years. Handles ambiguity, business trade-offs, second-order effects and stakeholders unprompted.' }
];

export function normalizeLevel(level?: unknown): CandidateLevel {
  return level === 'apm' || level === 'spm' ? level : 'pm';
}

export function getLevelConfig(level?: unknown): LevelConfig {
  const id = normalizeLevel(level);
  return LEVELS.find((l) => l.id === id) || LEVELS[1];
}

const LEGACY_VERDICTS: Record<LegacyHiringVerdict, HiringVerdict> = {
  'Strong Yes': 'Strong Hire',
  'Lean Yes': 'Hire',
  'Lean No': 'No Hire',
  'Strong No': 'Strong No Hire'
};

/** Maps verdicts saved before scoring v3 to the current names. */
export function normalizeVerdict(verdict?: string): HiringVerdict {
  if (!verdict) return 'No Hire';
  if (verdict in LEGACY_VERDICTS) return LEGACY_VERDICTS[verdict as LegacyHiringVerdict];
  if (verdict === 'Strong Hire' || verdict === 'Hire' || verdict === 'No Hire' || verdict === 'Strong No Hire') return verdict;
  return 'No Hire';
}

/** Max hints per interview. Real interviewers notice when you need help. */
export const MAX_HINTS_PER_INTERVIEW = 2;
