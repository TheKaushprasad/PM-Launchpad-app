/**
 * Single entry point the harness uses to call the production evaluator.
 *
 * Guarantees:
 * 1. Only the fields the production app would send are passed to the engine.
 *    Test expectations (expectations, mustNotCredit, mustMention, humanLabels)
 *    can never leak into the evaluator input.
 * 2. userId / sessionId are never passed, so eval runs never write to Firestore.
 * 3. When a model or provider is forced, failover is disabled and the run fails
 *    loudly if a different model actually answered.
 */
import { runEvaluationEngine, EvaluationRequestPayload } from '../server/evaluatorEngine';
import { traceRun } from '../server/observability';
import { BenchmarkCase } from './types';

export interface EngineCallOptions {
  provider?: 'gemini' | 'openai';
  model?: string;
}

export class ForcedModelMismatchError extends Error {
  constructor(forced: string, actual: string) {
    super(
      `Forced model "${forced}" but "${actual}" answered (failover kicked in), ` +
      `so this result would be attributed to the wrong model.`
    );
    this.name = 'ForcedModelMismatchError';
  }
}

// One eval run is one Langfuse session, so a run's cases can be compared side by side.
const EVAL_SESSION_ID = `eval-${new Date().toISOString().replace(/[:.]/g, '-')}`;

export async function callEngine(bCase: BenchmarkCase, opts: EngineCallOptions = {}): Promise<any> {
  // Explicit allow-list: nothing else from the case file reaches the engine.
  const payload: Record<string, unknown> = {
    scenario: bCase.scenario,
    persona: bCase.persona,
    messages: bCase.messages,
    elapsedSeconds: bCase.elapsedSeconds ?? 0,
    scratchpadNotes: bCase.scratchpadNotes ?? '',
    level: bCase.level ?? 'pm',
  };

  if (opts.provider) payload.provider = opts.provider;
  if (opts.model) payload.model = opts.model;
  if (opts.provider || opts.model) payload.disableFailover = true;

  if ('userId' in payload || 'sessionId' in payload) {
    throw new Error(
      'CRITICAL SAFETY VIOLATION: userId or sessionId must never be passed to runEvaluationEngine in the eval harness.'
    );
  }

  const output: any = await traceRun(
    'eval-score-case',
    { sessionId: EVAL_SESSION_ID, tags: ['eval', bCase.track], metadata: { caseId: bCase.id, category: bCase.category }, input: payload },
    () => runEvaluationEngine(payload as unknown as EvaluationRequestPayload),
    (out: any) => ({ status: out?.status, score: out?.overallScore ?? out?.score, verdict: out?.verdict, model: out?.modelId })
  );

  if (opts.model && output?.status !== 'insufficient') {
    const actual = output?.modelId ?? 'unknown';
    if (actual !== opts.model) {
      throw new ForcedModelMismatchError(opts.model, actual);
    }
  }

  return output;
}
