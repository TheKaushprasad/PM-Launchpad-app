// Shared shapes for the PM Assignment Solver: five agents (Parser, Researcher, Strategist, Writer,
// Critic) each read and write one part of a run. The browser keeps the run state and calls one
// server endpoint per agent step (server/assignmentSolver/agents.ts).

export const ITEM_TYPES = ['product design', 'metrics', 'strategy', 'prioritization', 'GTM', 'case study', 'other'] as const;
export type ItemType = (typeof ITEM_TYPES)[number];

export const FRAMEWORKS = [
  'CIRCLES', 'RICE', 'HEART', 'North Star', 'JTBD', 'AARRR', 'Kano', 'MoSCoW', 'Porter\'s Five Forces', 'SWOT', 'Issue tree', 'Funnel analysis',
] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export const AGENTS = ['parse', 'research', 'strategy', 'write', 'critique'] as const;
export type AgentName = (typeof AGENTS)[number];

export const AGENT_LABELS: Record<AgentName, string> = {
  parse: 'Parser',
  research: 'Researcher',
  strategy: 'Strategist',
  write: 'Writer',
  critique: 'Critic',
};

/** Critic rubric: each section is scored 1-5 on these five criteria. */
export const RUBRIC = [
  { key: 'answers', label: 'Answers the question' },
  { key: 'structure', label: 'Structure' },
  { key: 'data', label: 'Use of data' },
  { key: 'metrics', label: 'Clear metrics' },
  { key: 'tradeoffs', label: 'Trade-offs' },
] as const;
export type RubricKey = (typeof RUBRIC)[number]['key'];

/** Sections that average below this go back to the Writer (FR-CR-02). */
export const PASS_SCORE = 3.5;
/** Writer-Critic loops per run (FR-OR-04). */
export const MAX_CRITIC_LOOPS = 2;
/** A run stops once its estimated spend passes this (FR-OR-07). */
export const DEFAULT_COST_LIMIT_USD = 1;

export interface SolverInput {
  assignment: string;
  company: string;
  jobDescription?: string;
  deadline?: string;
}

export interface BriefItem {
  id: string;
  text: string;
  type: ItemType;
}

export interface Brief {
  company: string;
  role: string;
  items: BriefItem[];
  constraints: { wordLimit: string; format: string; deadline: string; deliverables: string[] };
  openQuestions: string[];
}

export interface ResearchFact {
  id: string; // "S1", "S2", ... cited inline by the Writer as [S1]
  category: 'company' | 'users' | 'competitors' | 'market';
  text: string;
  sourceIds: number[];
  confidence: 'high' | 'medium' | 'low';
  retrievedAt: string; // YYYY-MM-DD
}

export interface ResearchSource {
  id: number;
  title: string;
  url: string;
}

export interface Research {
  companyProfile: string;
  productArea: string;
  competitors: string[];
  facts: ResearchFact[];
  sources: ResearchSource[];
  searchQueries: string[];
}

export interface StrategyOption {
  name: string;
  description: string;
}

export interface ItemStrategy {
  itemId: string;
  framework: Framework;
  frameworkReason: string;
  segments: string[];
  problem: string;
  metrics: string[];
  options: StrategyOption[];
  recommendation: string;
  tradeoffs: string[];
  assumptions: string[];
  outline: string[];
  factIds: string[];
}

export interface Section {
  itemId: string;
  title: string;
  /** The Writer's latest text, kept so the edit ratio can be measured against the final text. */
  aiMarkdown: string;
  markdown: string;
  origin: 'ai' | 'edited' | 'regenerated';
}

export interface SectionReview {
  itemId: string;
  scores: Record<RubricKey, number>;
  average: number;
  feedback: string;
  flags: string[];
  passed: boolean;
}

export interface StepLog {
  agent: AgentName;
  itemId?: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  searches: number;
  costUsd: number;
  latencyMs: number;
  status: 'ok' | 'failed';
  error?: string;
  at: string;
}

/** What every agent endpoint returns next to its own output. */
export interface StepUsage {
  model: string;
  inputTokens: number;
  outputTokens: number;
  searches: number;
  costUsd: number;
  latencyMs: number;
}

export type AgentStatus = 'waiting' | 'running' | 'done' | 'failed';

export type RunStatus =
  | 'parsing'
  | 'awaiting-approval'
  | 'running'
  | 'review'
  | 'failed';

export interface Run {
  id: string;
  createdAt: string;
  input: SolverInput;
  status: RunStatus;
  error?: string;
  agentStatus: Record<AgentName, AgentStatus>;
  brief?: Brief;
  research?: Research;
  strategy?: ItemStrategy[];
  sections?: Section[];
  reviews?: SectionReview[];
  loopCount: number;
  logs: StepLog[];
  costLimitUsd: number;
}
