/**
 * Tool evals: golden cases for the PRD Coach, the AI Product Strategy tool and the PM Assignment Solver.
 *
 *   npm run eval:tools -- --validate                 offline: check every case file, no API calls
 *   npm run eval:tools -- --tool prd                 PRD Coach cases
 *   npm run eval:tools -- --tool strategy            AI Product Strategy cases
 *   npm run eval:tools -- --tool solver              Assignment Solver cases (Google Search case skipped)
 *   npm run eval:tools -- --tool solver --search     also run the Researcher case (grounding is billed per search)
 *   npm run eval:tools -- --tool prd --case prd-review-strong-refills,prd-example-pg-finder
 *   npm run eval:tools -- --tool prd --delay 15      wait 15s between cases (default 10)
 *
 * Calls the same functions as the live routes, on the same key (GEMINI_INTERVIEW_API_KEY, else
 * GEMINI_API_KEY). Saves eval/results/tool-<tool>-<time>.json for the dashboard (/admin/evals,
 * Tools tab) and, with Langfuse keys, one trace per case tagged "eval". Exits 1 when a case fails.
 */
import fs from 'fs';
import path from 'path';
import { loadAppEnv } from '../../services/env';
import { getInterviewGeminiKey } from '../../server/geminiKeys';
import { flushObservability, initObservability, scoreEvalTrace, traceEvalCase } from '../../server/observability';
import { judgeCriteria, TOOL_LABELS, TOOLS, type CaseOutcome, type ToolCaseResult, type ToolName, type ToolRunReport } from './common';
import { loadPrdCases, runPrdCase, validatePrdCases } from './prd';
import { loadStrategyCases, runStrategyCase, validateStrategyCases } from './strategy';
import { loadSolverCases, runSolverCase, validateSolverCases } from './solver';

loadAppEnv();

const USD_TO_INR = 88;

interface AnyCase { id: string; name: string; kind: string; category: string; judge: string[] }
interface ToolSuite { load: () => AnyCase[]; validate: (cases: any[]) => string[]; run: (c: any) => Promise<CaseOutcome> }

const SUITES: Record<ToolName, ToolSuite> = {
  prd: { load: loadPrdCases, validate: validatePrdCases, run: runPrdCase },
  strategy: { load: loadStrategyCases, validate: validateStrategyCases, run: runStrategyCase },
  solver: { load: loadSolverCases, validate: validateSolverCases, run: runSolverCase },
};

function parseFlags(argv: string[]) {
  const value = (name: string) => {
    const i = argv.indexOf(name);
    return i >= 0 ? argv[i + 1] : undefined;
  };
  const tool = value('--tool');
  if (tool && !(TOOLS as readonly string[]).includes(tool)) throw new Error(`--tool must be one of ${TOOLS.join(', ')}`);
  return {
    validate: argv.includes('--validate'),
    search: argv.includes('--search'),
    tool: tool as ToolName | undefined,
    caseIds: (value('--case') || '').split(',').map((s) => s.trim()).filter(Boolean),
    delaySeconds: Number(value('--delay') ?? 10),
  };
}

const sleep = (s: number) => new Promise((r) => setTimeout(r, s * 1000));

async function runTool(tool: ToolName, flags: ReturnType<typeof parseFlags>): Promise<boolean> {
  const suite = SUITES[tool];
  const all = suite.load();
  const cases = all
    .filter((c) => !flags.caseIds.length || flags.caseIds.includes(c.id))
    .filter((c) => flags.search || c.kind !== 'research' || flags.caseIds.includes(c.id));
  const skipped = all.filter((c) => c.kind === 'research' && !cases.includes(c)).length;
  console.log(`\n${TOOL_LABELS[tool]}: ${cases.length} case(s)${skipped ? ` (${skipped} Google Search case skipped, add --search to run it)` : ''}`);
  if (!cases.length) return true;

  const startedAt = new Date().toISOString();
  const results: ToolCaseResult[] = [];
  for (let i = 0; i < cases.length; i++) {
    const c = cases[i];
    if (i > 0) await sleep(flags.delaySeconds);
    const base = { caseId: c.id, name: c.name, kind: c.kind, category: c.category };
    const result = await traceEvalCase(
      { name: `eval-${tool}-${c.kind}`, tags: ['eval', `eval:${tool}`, `kind:${c.kind}`], metadata: { caseId: c.id, category: c.category }, input: { caseId: c.id, name: c.name } },
      async (traceId): Promise<ToolCaseResult> => {
        try {
          const out = await suite.run(c);
          const r: ToolCaseResult = { ...base, status: 'pass', summary: out.summary, failures: [...out.failures], score: out.score, scoreLabel: out.scoreLabel, costUsd: out.costUsd, calls: out.calls, output: out.output, traceId };
          if (c.judge.length && out.judgeContext) {
            try {
              const j = await judgeCriteria(out.judgeContext, c.judge);
              r.judge = j.results;
              r.judgeModel = j.judgeModel;
              for (const jr of j.results) if (!jr.pass) r.failures.push(`judge: ${jr.criterion} (${jr.reason})`);
            } catch (err: any) {
              r.failures.push(`judge error: ${err?.message || err}`);
            }
          }
          r.status = r.failures.length ? 'fail' : 'pass';
          scoreEvalTrace(traceId, 'eval_pass', r.status === 'pass' ? 1 : 0, r.failures.join(' | ') || r.summary);
          return r;
        } catch (err: any) {
          scoreEvalTrace(traceId, 'eval_pass', 0, `error: ${err?.message || err}`);
          return { ...base, status: 'error', summary: 'error', failures: [], error: String(err?.message || err), costUsd: 0, calls: 0, traceId };
        }
      }
    );
    results.push(result);
    const mark = result.status === 'pass' ? 'PASS ' : result.status === 'fail' ? 'FAIL ' : 'ERROR';
    console.log(`  ${mark} ${c.id}: ${result.error || result.summary}`);
    result.failures.forEach((f) => console.log(`        - ${f}`));
  }

  const passed = results.filter((r) => r.status === 'pass').length;
  const costUsd = results.reduce((a, r) => a + r.costUsd, 0);
  const calls = results.reduce((a, r) => a + r.calls, 0);
  console.log(`  ${passed} of ${results.length} passed · ${calls} Gemini calls · about ₹${(costUsd * USD_TO_INR).toFixed(2)} (plus the judge)`);

  const report: ToolRunReport = {
    kind: 'tool', tool, startedAt, finishedAt: new Date().toISOString(),
    flags: { caseIds: flags.caseIds, search: flags.search },
    results, totals: { cases: results.length, passed, costUsd, calls },
  };
  const outDir = path.join(process.cwd(), 'eval', 'results');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `tool-${tool}-${startedAt.replace(/[:.]/g, '-')}.json`);
  fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
  console.log(`  Full report: ${path.relative(process.cwd(), outFile)}`);
  return passed === results.length;
}

async function main() {
  const flags = parseFlags(process.argv.slice(2));
  const tools = flags.tool ? [flags.tool] : [...TOOLS];

  let problems = 0;
  for (const tool of tools) {
    const cases = SUITES[tool].load();
    const ids = new Set<string>();
    const found = SUITES[tool].validate(cases);
    for (const c of cases) {
      if (ids.has(c.id)) found.push(`${c.id}: duplicate id`);
      ids.add(c.id);
    }
    console.log(`${TOOL_LABELS[tool]}: ${cases.length} cases, ${found.length ? `${found.length} problem(s)` : 'case file OK'}`);
    found.forEach((p) => console.log(`  - ${p}`));
    problems += found.length;
  }
  if (flags.validate) process.exit(problems ? 1 : 0);
  if (problems) {
    console.log('\nFix the case files first (npm run eval:tools -- --validate).');
    process.exit(1);
  }
  if (!flags.tool && !flags.caseIds.length) {
    console.log('\nPick one tool so a run stays small: --tool prd, --tool strategy or --tool solver.');
    process.exit(1);
  }
  if (!getInterviewGeminiKey()) {
    console.log('\nGEMINI_INTERVIEW_API_KEY (or GEMINI_API_KEY) is not set. Put it in services/.env.');
    process.exit(1);
  }

  initObservability();
  let ok = true;
  for (const tool of tools) ok = (await runTool(tool, flags)) && ok;
  await flushObservability();
  process.exit(ok ? 0 : 1);
}

main().catch(async (err) => {
  console.error(err?.message || err);
  await flushObservability();
  process.exit(1);
});
