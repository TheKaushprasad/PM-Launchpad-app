import { z } from 'zod';
import { callJudgeModel } from '../judge';

export * from './types';

// Shared bits for the tool evals (PRD Coach, AI Product Strategy, Assignment Solver).

/** A case outcome before it gets its id and name. */
export interface CaseOutcome {
  summary: string;
  failures: string[];
  score?: number;
  scoreLabel?: string;
  costUsd: number;
  calls: number;
  output?: string;
  /** Text the judge reads (the tool's input and output), when the case has judge criteria. */
  judgeContext?: string;
}

export const words = (s: string) => (s.match(/\S+/g) || []).length;
export const trim = (s: string, max = 6000) => (s.length > max ? `${s.slice(0, max)}\n…(trimmed)` : s);

/** Checks a number against optional min/max bounds and pushes a readable failure. */
export function inRange(failures: string[], label: string, value: number, min?: number, max?: number) {
  if (min !== undefined && value < min) failures.push(`${label} is ${value}, expected at least ${min}`);
  if (max !== undefined && value > max) failures.push(`${label} is ${value}, expected at most ${max}`);
}

const JUDGE_SYSTEM = `You audit the output of an AI tool that helps aspiring product managers.
You receive what the user gave the tool, what the tool returned, and numbered criteria.
A criterion passes only if it is clearly true of the tool's output. Judge only what the output says, not whether you would have written it differently.
Return JSON: {"results":[{"index":number,"pass":boolean,"reason":"one sentence"}]} with one entry per criterion.`;

const JudgeOutput = z.object({ results: z.array(z.object({ index: z.number().int().min(0), pass: z.boolean(), reason: z.string() })) });

/**
 * A second model checks plain-English criteria against the tool's output (gpt-4o when OPENAI_API_KEY
 * is set, else Gemini, same as the interview evals). Throws when the judge can't run.
 */
export async function judgeCriteria(context: string, criteria: string[]) {
  const prompt = `${context}\n\nCRITERIA:\n${criteria.map((c, i) => `${i}. ${c}`).join('\n')}`;
  const { text, judgeModel } = await callJudgeModel(JUDGE_SYSTEM, prompt);
  const parsed = JudgeOutput.parse(JSON.parse(text));
  const byIndex = new Map(parsed.results.map((r) => [r.index, r]));
  const results = criteria.map((criterion, i) => {
    const r = byIndex.get(i);
    if (!r) throw new Error(`Judge skipped criterion ${i}: ${criterion}`);
    return { criterion, pass: r.pass, reason: r.reason };
  });
  return { judgeModel, results };
}

/** Case id rule shared by all three case files. */
export const CaseId = z.string().regex(/^[a-z0-9-]+$/, 'ids use lowercase letters, digits and dashes');
export const Category = z.enum(['strong', 'average', 'weak', 'edge']);
