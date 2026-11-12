// Report shapes for the tool evals, shared by the runner and the eval dashboard (no model imports here).

export const TOOLS = ['prd', 'strategy', 'solver'] as const;
export type ToolName = (typeof TOOLS)[number];

export const TOOL_LABELS: Record<ToolName, string> = {
  prd: 'PRD Coach',
  strategy: 'AI Product Strategy',
  solver: 'Assignment Solver',
};

/** What one case produced. `failures` empty and no `error` = pass. */
export interface ToolCaseResult {
  caseId: string;
  name: string;
  /** Which call the case tests, e.g. "review", "example", "generate", "parse", "critique". */
  kind: string;
  category: string;
  status: 'pass' | 'fail' | 'error';
  /** The tool's own headline number, when it has one (PRD overall /100, strategy quality /100, critic average /5). */
  score?: number;
  scoreLabel?: string;
  /** One line a reviewer reads first, e.g. "overall 72, Getting there". */
  summary: string;
  failures: string[];
  error?: string;
  judge?: Array<{ criterion: string; pass: boolean; reason: string }>;
  judgeModel?: string;
  /** Estimated Gemini spend for the tool's own calls (not the judge), in USD. */
  costUsd: number;
  calls: number;
  /** The tool's output, trimmed, so the dashboard can show what it said. */
  output?: string;
  traceId?: string;
}

export interface ToolRunReport {
  kind: 'tool';
  tool: ToolName;
  startedAt: string;
  finishedAt: string;
  flags: { caseIds: string[]; search: boolean };
  results: ToolCaseResult[];
  totals: { cases: number; passed: number; costUsd: number; calls: number };
}
