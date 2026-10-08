import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { z } from 'zod';
import { BenchmarkCase } from './types';

export interface JudgeCriterionResult {
  type: 'mustMention' | 'mustNotCredit';
  criterion: string;
  pass: boolean;
  reason: string;
}

export interface JudgeResult {
  judgeModel: string;
  criteriaResults: JudgeCriterionResult[];
}

const JudgeOutputSchema = z.object({
  results: z.array(
    z.object({
      index: z.number().int().min(0),
      pass: z.boolean(),
      reason: z.string(),
    })
  ),
});

const SYSTEM = `You audit the output of an AI that grades product management mock interviews.
You receive the interview transcript, the grader's evaluation, and numbered criteria.
Each criterion is one of two types:
- MUST_NOT_CREDIT: passes only if the evaluation does NOT give the candidate credit for this anywhere (scores, feedback, strengths, evidence). Neutral mentions or criticism are fine.
- MUST_MENTION: passes only if the evaluation clearly addresses this point somewhere in its feedback.
Judge only what the evaluation says, not whether you agree with its scores.
Return JSON: {"results":[{"index":number,"pass":boolean,"reason":"one sentence"}]} with one entry per criterion.`;

const GEMINI_JUDGE_MODELS = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
const BUSY_RETRY_DELAYS_MS = [3000, 8000];

const isBusy = (e: any) => /\b(503|429)\b|UNAVAILABLE|RESOURCE_EXHAUSTED/.test(e?.message ?? '');

/** Retries a call that failed because the model was busy, then rethrows. */
async function withBusyRetry<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (e) {
      if (!isBusy(e) || attempt >= BUSY_RETRY_DELAYS_MS.length) throw e;
      await new Promise((r) => setTimeout(r, BUSY_RETRY_DELAYS_MS[attempt]));
    }
  }
}

/** Strips fields the judge doesn't need so it reads what a user would see. */
function evaluationView(output: any) {
  const pillars = Object.fromEntries(
    Object.entries(output?.pillars ?? {}).map(([k, p]: [string, any]) => [
      k,
      {
        rawScore: p?.rawScore,
        feedback: p?.feedback,
        evidence: p?.evidence,
        whyTheyEarnedThisScore: p?.whyTheyEarnedThisScore,
        whyTheyDidNotScoreHigher: p?.whyTheyDidNotScoreHigher,
        strengths: p?.strengths,
        improvements: p?.improvements,
      },
    ])
  );
  return {
    overallScore: output?.overallScore,
    verdict: output?.verdict,
    transcriptSummary: output?.transcriptSummary,
    topStrengths: output?.topStrengths,
    criticalGrowthAreas: output?.criticalGrowthAreas,
    pillars,
  };
}

/**
 * Checks the evaluator output against the case's mustNotCredit / mustMention
 * criteria with a separate LLM call. Uses EVAL_JUDGE_MODEL if set, otherwise
 * gemini-3.8-flash with busy retries and Gemini fallbacks, then gpt-4o when
 * OPENAI_API_KEY is set.
 * Throws on failure: the threshold step treats a missing judge as a FAIL.
 */
export async function runJudge(bCase: BenchmarkCase, output: any): Promise<JudgeResult> {
  const criteria = [
    ...(bCase.mustNotCredit ?? []).map((c) => ({ type: 'mustNotCredit' as const, criterion: c })),
    ...(bCase.mustMention ?? []).map((c) => ({ type: 'mustMention' as const, criterion: c })),
  ];
  if (criteria.length === 0) return { judgeModel: 'none', criteriaResults: [] };

  const transcript = bCase.messages
    .map((m, i) => `[T${i + 1}][${m.role === 'candidate' ? 'CANDIDATE' : 'INTERVIEWER'}]: ${m.text}`)
    .join('\n');
  const prompt = `TRANSCRIPT:\n${transcript}\n\nEVALUATION:\n${JSON.stringify(evaluationView(output), null, 2)}\n\nCRITERIA:\n${criteria
    .map((c, i) => `${i}. ${c.type === 'mustNotCredit' ? 'MUST_NOT_CREDIT' : 'MUST_MENTION'}: ${c.criterion}`)
    .join('\n')}`;

  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  const errors: string[] = [];
  let text = '';
  let judgeModel = '';

  if (geminiKey) {
    // EVAL_JUDGE_MODEL pins one model; otherwise busy models fall through the chain
    const models = process.env.EVAL_JUDGE_MODEL ? [process.env.EVAL_JUDGE_MODEL] : GEMINI_JUDGE_MODELS;
    const ai = new GoogleGenAI({ apiKey: geminiKey });
    for (const model of models) {
      try {
        const res = await withBusyRetry(() =>
          ai.models.generateContent({
            model,
            contents: prompt,
            config: { systemInstruction: SYSTEM, temperature: 0, responseMimeType: 'application/json' },
          })
        );
        text = res?.text ?? '';
        judgeModel = model;
        break;
      } catch (e: any) {
        errors.push(`${model}: ${e?.message ?? e}`);
      }
    }
  }
  if (!text && openAiKey) {
    const model = 'gpt-4o';
    try {
      const openai = new OpenAI({ apiKey: openAiKey });
      const res = await openai.chat.completions.create({
        model,
        temperature: 0,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: prompt },
        ],
      });
      text = res.choices[0]?.message?.content ?? '';
      judgeModel = model;
    } catch (e: any) {
      errors.push(`${model}: ${e?.message ?? e}`);
    }
  }
  if (!geminiKey && !openAiKey) throw new Error('Judge needs GEMINI_API_KEY or OPENAI_API_KEY');
  if (!text) throw new Error(`Judge failed on every model. ${errors.join(' | ')}`);

  const parsed = JudgeOutputSchema.safeParse(JSON.parse(text));
  if (!parsed.success) throw new Error(`Judge returned invalid JSON: ${parsed.error.message}`);

  const byIndex = new Map(parsed.data.results.map((r) => [r.index, r]));
  const criteriaResults = criteria.map((c, i) => {
    const r = byIndex.get(i);
    if (!r) throw new Error(`Judge skipped criterion ${i}: ${c.criterion}`);
    return { ...c, pass: r.pass, reason: r.reason };
  });

  return { judgeModel, criteriaResults };
}
