import { authJsonHeaders } from '../apiClient';
import {
  AGENTS, DEFAULT_COST_LIMIT_USD, MAX_CRITIC_LOOPS,
  type AgentName, type Brief, type ItemStrategy, type Research, type Run, type Section, type SectionReview,
  type SolverInput, type StepLog, type StepUsage,
} from './types';

// The orchestrator for the PM Assignment Solver. It runs in the browser: it calls the agents in
// order (Parser, then after the user approves the brief: Researcher, Strategist, Writer, Critic),
// sends weak sections back to the Writer at most twice, retries a failed call once, stops when the
// run's cost passes its limit, and logs every step. Each change is pushed to the screen through
// `onUpdate`, so the run status is live.

type Update = (run: Run) => void;

class StepFailed extends Error {}

export const newRunId = () => `as_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export function createRun(input: SolverInput): Run {
  return {
    id: newRunId(),
    createdAt: new Date().toISOString(),
    input,
    status: 'parsing',
    agentStatus: Object.fromEntries(AGENTS.map((a) => [a, 'waiting'])) as Run['agentStatus'],
    loopCount: 0,
    logs: [],
    costLimitUsd: DEFAULT_COST_LIMIT_USD,
  };
}

export const runCost = (run: Run) => run.logs.reduce((sum, l) => sum + l.costUsd, 0);
export const runTimeMs = (run: Run) => run.logs.reduce((sum, l) => sum + l.latencyMs, 0);

const clone = (run: Run): Run => JSON.parse(JSON.stringify(run));

/** Runs `fn` over `items` with at most `limit` calls at once, keeping the order of results. */
async function inBatches<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

// Errors that a retry can't fix: bad input, signed out, over the cost cap or daily limit.
const NO_RETRY = new Set([400, 401, 402, 403, 404, 422]);

async function callAgent<T>(run: Run, agent: AgentName, body: Record<string, unknown>, itemId?: string): Promise<T & { usage: StepUsage }> {
  let lastError = '';
  for (let attempt = 0; attempt < 2; attempt++) {
    const startedAt = Date.now();
    try {
      const res = await fetch(`/api/assignment-solver/${agent}`, {
        method: 'POST',
        headers: { ...(await authJsonHeaders()), 'X-Solver-Run': run.id },
        body: JSON.stringify({ ...body, spentUsd: runCost(run), costLimitUsd: run.costLimitUsd }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        lastError = data?.error || `The ${agent} step failed (HTTP ${res.status}).`;
        logStep(run, { agent, itemId, model: '', inputTokens: 0, outputTokens: 0, searches: 0, costUsd: 0, latencyMs: Date.now() - startedAt }, lastError);
        if (NO_RETRY.has(res.status)) break;
        continue;
      }
      logStep(run, { agent, itemId, ...data.usage });
      return data;
    } catch (err: any) {
      lastError = err?.message || 'Network error';
      logStep(run, { agent, itemId, model: '', inputTokens: 0, outputTokens: 0, searches: 0, costUsd: 0, latencyMs: Date.now() - startedAt }, lastError);
    }
  }
  throw new StepFailed(lastError);
}

function logStep(run: Run, step: Omit<StepLog, 'status' | 'at' | 'error'>, error?: string) {
  run.logs.push({
    ...step,
    model: step.model || '',
    costUsd: Number(step.costUsd) || 0,
    status: error ? 'failed' : 'ok',
    error,
    at: new Date().toISOString(),
  });
}

function fail(run: Run, agent: AgentName, err: unknown, onUpdate: Update): Run {
  run.agentStatus[agent] = 'failed';
  run.status = 'failed';
  run.error = `${agent === 'critique' ? 'Critic' : agent[0].toUpperCase() + agent.slice(1)} step failed: ${(err as Error)?.message || err}`;
  onUpdate(clone(run));
  return run;
}

/** Step 1: the Parser reads the assignment. The run then waits for the user to approve the brief. */
export async function parseAssignment(input: SolverInput, onUpdate: Update): Promise<Run> {
  const run = createRun(input);
  run.agentStatus.parse = 'running';
  onUpdate(clone(run));
  try {
    const { brief } = await callAgent<{ brief: Brief }>(run, 'parse', { ...input });
    run.brief = brief;
    run.agentStatus.parse = 'done';
    run.status = 'awaiting-approval';
    onUpdate(clone(run));
    return run;
  } catch (err) {
    return fail(run, 'parse', err, onUpdate);
  }
}

const facts = (run: Run) => run.research?.facts || [];

async function writeSection(run: Run, itemId: string, extra: { feedback?: string; note?: string; previous?: string } = {}) {
  const strategy = run.strategy?.find((s) => s.itemId === itemId) || null;
  const { section } = await callAgent<{ section: { itemId: string; title: string; markdown: string } }>(
    run, 'write', { brief: run.brief, itemId, strategy, facts: facts(run), ...extra }, itemId,
  );
  return section;
}

async function critiqueSection(run: Run, section: Section) {
  const { review } = await callAgent<{ review: SectionReview }>(
    run, 'critique', { brief: run.brief, itemId: section.itemId, markdown: section.markdown, facts: facts(run) }, section.itemId,
  );
  return review;
}

const feedbackFor = (review: SectionReview) =>
  [review.feedback, ...review.flags.map((f) => `Unsupported claim: ${f}`)].filter(Boolean).join('\n');

/** Steps 2-5, after the user approved (and maybe edited) the brief. */
export async function runAgents(approved: Run, brief: Brief, onUpdate: Update): Promise<Run> {
  const run = clone(approved);
  run.brief = brief;
  run.status = 'running';
  let agent: AgentName = 'research';
  try {
    run.agentStatus.research = 'running';
    onUpdate(clone(run));
    const { research } = await callAgent<{ research: Research }>(run, 'research', { brief, jobDescription: run.input.jobDescription || '' });
    run.research = research;
    run.agentStatus.research = 'done';

    agent = 'strategy';
    run.agentStatus.strategy = 'running';
    onUpdate(clone(run));
    run.strategy = await inBatches(brief.items, 3, async (item) =>
      (await callAgent<{ strategy: ItemStrategy }>(run, 'strategy', { brief, itemId: item.id, facts: research.facts }, item.id)).strategy,
    );
    run.agentStatus.strategy = 'done';

    agent = 'write';
    run.agentStatus.write = 'running';
    onUpdate(clone(run));
    run.sections = await inBatches(brief.items, 3, async (item) => {
      const s = await writeSection(run, item.id);
      return { ...s, aiMarkdown: s.markdown, origin: 'ai' as const };
    });
    run.agentStatus.write = 'done';

    agent = 'critique';
    run.agentStatus.critique = 'running';
    onUpdate(clone(run));
    run.reviews = await inBatches(run.sections, 3, (s) => critiqueSection(run, s));

    // Critic loop: weak sections go back to the Writer with the feedback, at most twice.
    while (run.loopCount < MAX_CRITIC_LOOPS) {
      const failed: SectionReview[] = run.reviews.filter((r) => !r.passed);
      if (!failed.length) break;
      if (runCost(run) >= run.costLimitUsd) {
        run.error = `Stopped improving sections: the run reached its cost limit of $${run.costLimitUsd.toFixed(2)}.`;
        break;
      }
      run.loopCount++;
      agent = 'write';
      run.agentStatus.write = 'running';
      run.agentStatus.critique = 'waiting';
      onUpdate(clone(run));
      await inBatches(failed, 3, async (review) => {
        const old = run.sections!.find((s) => s.itemId === review.itemId)!;
        const s = await writeSection(run, review.itemId, { feedback: feedbackFor(review), previous: old.markdown });
        Object.assign(old, { title: s.title, markdown: s.markdown, aiMarkdown: s.markdown });
      });
      run.agentStatus.write = 'done';
      agent = 'critique';
      run.agentStatus.critique = 'running';
      onUpdate(clone(run));
      const fresh: SectionReview[] = await inBatches(failed, 3, (r) => critiqueSection(run, run.sections!.find((s) => s.itemId === r.itemId)!));
      run.reviews = run.reviews.map((r) => fresh.find((f) => f.itemId === r.itemId) || r);
    }
    run.agentStatus.critique = 'done';
    run.status = 'review';
    onUpdate(clone(run));
    return run;
  } catch (err) {
    return fail(run, agent, err, onUpdate);
  }
}

/** Rewrites one section with the user's note, then has the Critic score it again. Other sections are untouched. */
export async function regenerateSection(current: Run, itemId: string, note: string, onUpdate: Update): Promise<Run> {
  const run = clone(current);
  const section = run.sections?.find((s) => s.itemId === itemId);
  if (!section) return run;
  const s = await writeSection(run, itemId, { note, previous: section.markdown });
  Object.assign(section, { title: s.title, markdown: s.markdown, aiMarkdown: s.markdown, origin: 'regenerated' });
  const review = await critiqueSection(run, section);
  run.reviews = (run.reviews || []).map((r) => (r.itemId === itemId ? review : r));
  onUpdate(clone(run));
  return run;
}

/** Scores the user's edited text again, so the score matches what they will submit. */
export async function rescoreSection(current: Run, itemId: string, onUpdate: Update): Promise<Run> {
  const run = clone(current);
  const section = run.sections?.find((s) => s.itemId === itemId);
  if (!section) return run;
  const review = await critiqueSection(run, section);
  run.reviews = (run.reviews || []).map((r) => (r.itemId === itemId ? review : r));
  onUpdate(clone(run));
  return run;
}
