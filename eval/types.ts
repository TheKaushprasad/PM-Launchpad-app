import { z } from 'zod';
import { CaseExpectations } from './checks/expectations';

export type CaseCategory = 'strong' | 'average' | 'weak' | 'edge';

/**
 * Interview tracks the dataset covers. "metrics" has an evaluator rubric
 * (server/prompts/tracks/metrics.txt) but no app scenarios yet, so metrics
 * cases embed their scenario.
 */
export const TRACKS = ['rca', 'guesstimate', 'strategy', 'design', 'metrics'] as const;
export type Track = (typeof TRACKS)[number];

export type EdgeType =
  | 'injection'
  | 'quit-early'
  | 'interviewer-dominated'
  | 'interviewer-leaked-data'
  | 'stt-noise';

/** Human-assigned scores used for calibration. */
export interface HumanLabel {
  rater: string;
  overallScore: number; // 0-100
  verdict: 'Strong Yes' | 'Lean Yes' | 'Lean No' | 'Strong No';
}

/**
 * A benchmark case after loading. Case files may either embed a full
 * `scenario` / `persona`, or reference production data by `scenarioId` /
 * `personaId`; the loader resolves references so `scenario` and `persona`
 * are always present here.
 */
export interface BenchmarkCase {
  id: string;
  name: string;
  track: string;
  category: CaseCategory;
  edgeType: EdgeType | null;
  scenario: any;
  persona: any;
  messages: Array<{ role: 'interviewer' | 'candidate'; text: string }>;
  elapsedSeconds?: number;
  scratchpadNotes?: string;

  // Test-only fields. engineCall.ts never sends these to the evaluator.
  expectations?: CaseExpectations;
  mustNotCredit?: string[];
  mustMention?: string[];
  humanLabels?: HumanLabel[];
}

const pillarBounds = z
  .object({
    clarification: z.number().int().min(1).max(5),
    framework: z.number().int().min(1).max(5),
    analyticalRigor: z.number().int().min(1).max(5),
    communication: z.number().int().min(1).max(5),
    synthesis: z.number().int().min(1).max(5),
  })
  .partial()
  .strict();

const verdict = z.enum(['Strong Yes', 'Lean Yes', 'Lean No', 'Strong No']);

export const CaseFileSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(1),
    track: z.enum(TRACKS),
    category: z.enum(['strong', 'average', 'weak', 'edge']),
    edgeType: z
      .enum(['injection', 'quit-early', 'interviewer-dominated', 'interviewer-leaked-data', 'stt-noise'])
      .nullable(),
    scenarioId: z.string().optional(),
    scenario: z.record(z.string(), z.any()).optional(),
    personaId: z.string().optional(),
    persona: z.record(z.string(), z.any()).optional(),
    messages: z
      .array(z.object({ role: z.enum(['interviewer', 'candidate']), text: z.string() }).strict())
      .min(1),
    elapsedSeconds: z.number().int().min(0).optional(),
    scratchpadNotes: z.string().optional(),
    expectations: z
      .object({
        expectedStatus: z.enum(['complete', 'insufficient']).optional(),
        pillarMin: pillarBounds.optional(),
        pillarMax: pillarBounds.optional(),
        overallMin: z.number().min(0).max(100).optional(),
        overallMax: z.number().min(0).max(100).optional(),
        allowedVerdicts: z.array(verdict).optional(),
        injectionAttempt: z.boolean().optional(),
        informational: z.object({ minEchoed: z.number().int().min(0).optional() }).strict().optional(),
      })
      .strict()
      .optional(),
    mustNotCredit: z.array(z.string().min(1)).optional(),
    mustMention: z.array(z.string().min(1)).optional(),
    humanLabels: z
      .array(z.object({ rater: z.string(), overallScore: z.number().min(0).max(100), verdict }).strict())
      .optional(),
  })
  .strict()
  .refine((c) => !!c.scenarioId !== !!c.scenario, { message: 'Provide exactly one of scenarioId or scenario' })
  .refine((c) => !!c.personaId !== !!c.persona, { message: 'Provide exactly one of personaId or persona' });

export type CaseFile = z.infer<typeof CaseFileSchema>;
