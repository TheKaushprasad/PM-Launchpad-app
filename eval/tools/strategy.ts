import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { QUALITY_CHECKS, QUALITY_PASS, type StrategyInputs, type StrategyOutput, type StrategySection } from '../../lib/productStrategy/types';
import { SAMPLE_INPUTS } from '../../lib/productStrategy/sample';
import { styleById } from '../../lib/productStrategy/styles';
import { cleanInputs, scoreStrategy, sectionParts, StrategyError, validateInputs, writePart } from '../../server/productStrategy/engine';
import { CaseId, Category, inRange, trim, words, type CaseOutcome } from './common';

// AI Product Strategy eval. Three kinds of case:
//   score     a fixed, hand-written strategy goes to the quality checker only (scoreStrategy):
//             a strong one must pass, a generic one must fail "specific". 1 call.
//   generate  the real pipeline for one form: write the strategy (writePart, 1 call per part) and
//             score it (1 call). Checks every section is there, no headings or tables, made-up
//             numbers are labelled "(Assumption)", and the checker's score clears the bar.
//   reject    inputs the tool must refuse: validateInputs (offline, no call) or the model's
//             offTopic answer (1 call). Passes when the tool refuses.

const QualityKey = z.enum(QUALITY_CHECKS.map((q) => q.key) as [string, ...string[]]);
const ScoreMap = z.partialRecord(QualityKey, z.number().int().min(0).max(25));

const StrategyCase = z.object({
  id: CaseId,
  name: z.string(),
  kind: z.enum(['score', 'generate', 'reject']),
  category: Category,
  /** Overrides on top of the form's "Use example" product (lib/productStrategy/sample.ts). */
  inputs: z.record(z.string(), z.any()).default({}),
  /** score cases: the strategy to check. Section titles come from the style. */
  strategy: z.object({
    title: z.string(),
    summary: z.string(),
    sections: z.array(z.object({ key: z.string(), content: z.string() }).strict()),
    assumptions: z.array(z.string()).default([]),
    metrics: z.array(z.object({ name: z.string(), target: z.string(), type: z.enum(['Assumption', 'From your inputs']) }).strict()).default([]),
  }).strict().optional(),
  expect: z.object({
    scoreMin: z.number().optional(),
    scoreMax: z.number().optional(),
    checkMin: ScoreMap.optional(),
    checkMax: ScoreMap.optional(),
    /** reject cases: part of the error message the tool should show. */
    errorIncludes: z.string().optional(),
  }).strict().default({}),
  judge: z.array(z.string()).default([]),
}).strict();
export type StrategyCase = z.infer<typeof StrategyCase>;

const FILE = path.join(process.cwd(), 'eval', 'tools', 'cases', 'strategy.json');

export function loadStrategyCases(): StrategyCase[] {
  return z.array(StrategyCase).parse(JSON.parse(fs.readFileSync(FILE, 'utf-8')));
}

const inputsFor = (c: StrategyCase): StrategyInputs => cleanInputs({ ...SAMPLE_INPUTS, ...c.inputs });

function outputFor(c: StrategyCase, inputs: StrategyInputs): StrategyOutput {
  const style = styleById(inputs.styleId)!;
  const s = c.strategy!;
  return {
    title: s.title,
    summary: s.summary,
    sections: s.sections.map((sec) => ({
      key: sec.key,
      title: style.sections.find((d) => d.key === sec.key)?.title || sec.key,
      content: sec.content,
      whyItMatters: '',
      confidence: 'Medium',
      origin: 'ai',
    })),
    assumptions: s.assumptions,
    metrics: s.metrics,
    competitorTable: [],
  };
}

export function validateStrategyCases(cases: StrategyCase[]): string[] {
  const problems: string[] = [];
  for (const c of cases) {
    const inputs = inputsFor(c);
    const style = styleById(inputs.styleId);
    if (!style) { problems.push(`${c.id}: unknown styleId ${inputs.styleId}`); continue; }
    const invalid = validateInputs(inputs);
    if (c.kind !== 'reject' && invalid) problems.push(`${c.id}: the form would refuse these inputs (${invalid})`);
    if (c.kind === 'score') {
      if (!c.strategy) { problems.push(`${c.id}: score cases need a "strategy"`); continue; }
      const keys = style.sections.map((s) => s.key);
      const missing = keys.filter((k) => !c.strategy!.sections.some((s) => s.key === k));
      if (missing.length) problems.push(`${c.id}: strategy is missing sections ${missing.join(', ')} for ${style.name}`);
    }
  }
  return problems;
}

// A number with at least 2 digits, or a % / ₹ / x / k / lakh / crore figure.
const NUMBER = /(?:₹\s?)?\d[\d,.]*\s?(?:%|x\b|k\b|lakh|crore|L\b)?/gi;

/** Numbers in the strategy that are neither in the user's inputs nor labelled "(Assumption)" nearby. */
export function unlabelledNumbers(content: string, inputs: StrategyInputs): string[] {
  const inputText = Object.values(inputs).flat().join(' ').replace(/,/g, '');
  const found: string[] = [];
  for (const line of content.split('\n')) {
    if (/\(assumption\)/i.test(line)) continue;
    for (const m of line.match(NUMBER) || []) {
      const digits = m.replace(/[^\d.]/g, '');
      // Single digits ("3 bets", "Phase 1") and years in the horizon are wording, not data.
      if (digits.length < 2 || /^20\d\d$/.test(digits)) continue;
      if (inputText.includes(digits)) continue;
      found.push(m.trim());
    }
  }
  return [...new Set(found)];
}

const strategyText = (o: StrategyOutput) =>
  [`# ${o.title}`, o.summary, ...o.sections.map((s) => `## ${s.title}\n${s.content}`),
    o.metrics.length ? `## Metrics\n${o.metrics.map((m) => `- ${m.name}: ${m.target} (${m.type})`).join('\n')}` : '',
    o.assumptions.length ? `## Assumptions\n${o.assumptions.map((a) => `- ${a}`).join('\n')}` : ''].filter(Boolean).join('\n\n');

const inputsText = (i: StrategyInputs) =>
  Object.entries(i).filter(([, v]) => (Array.isArray(v) ? v.length : v)).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n');

export async function runStrategyCase(c: StrategyCase): Promise<CaseOutcome> {
  const inputs = inputsFor(c);
  const failures: string[] = [];
  const e = c.expect;
  let costUsd = 0;
  let calls = 0;
  const addLogs = (logs: Array<{ costUsd: number }>) => { calls += logs.length; costUsd += logs.reduce((a, l) => a + l.costUsd, 0); };

  if (c.kind === 'reject') {
    const invalid = validateInputs(inputs);
    let message = invalid;
    if (!invalid) {
      try {
        const part = await writePart(inputs, 0);
        addLogs(part.logs);
        failures.push('the tool wrote a strategy instead of refusing');
      } catch (err: any) {
        calls += 1;
        if (!(err instanceof StrategyError)) throw err;
        message = err.message;
        if (err.status !== 422) failures.push(`refused with HTTP ${err.status} ("${err.message}"), expected the off-topic refusal (422)`);
      }
    }
    if (message && e.errorIncludes && !message.toLowerCase().includes(e.errorIncludes.toLowerCase())) {
      failures.push(`refused with "${message}", expected it to mention "${e.errorIncludes}"`);
    }
    return { summary: message ? `refused: ${message}` : 'not refused', failures, costUsd, calls };
  }

  let output: StrategyOutput;
  if (c.kind === 'score') {
    output = outputFor(c, inputs);
  } else {
    const style = styleById(inputs.styleId)!;
    const parts = sectionParts(inputs, style);
    const sections: StrategySection[] = [];
    let title = '', summary = '', assumptions: string[] = [], metrics: StrategyOutput['metrics'] = [];
    for (let p = 0; p < parts.length; p++) {
      const r = await writePart(inputs, p, sections);
      addLogs(r.logs);
      sections.push(...r.sections);
      if (p === 0) { title = r.title || ''; summary = r.summary || ''; }
      if (p === parts.length - 1) { assumptions = r.assumptions || []; metrics = r.metrics || []; }
    }
    output = { title, summary, sections, assumptions, metrics, competitorTable: [] };

    // Format rules from the system prompt
    for (const s of sections) {
      if (/^#{1,6}\s/m.test(s.content)) failures.push(`${s.title}: has a heading (only bullets and bold are allowed)`);
      if (/^\s*\|.*\|\s*$/m.test(s.content)) failures.push(`${s.title}: has a table`);
      if (/—/.test(s.content)) failures.push(`${s.title}: uses an em dash`);
    }
    const unlabelled = sections.flatMap((s) => unlabelledNumbers(s.content, inputs).map((n) => `${s.title}: ${n}`));
    if (unlabelled.length > 2) failures.push(`${unlabelled.length} numbers are not from the inputs and not marked (Assumption): ${unlabelled.slice(0, 5).join('; ')}`);
    const total = words(sections.map((s) => s.content).join(' '));
    const [lo, hi] = inputs.detail === 'detailed' ? [1500, 2500] : [400, 800];
    // The prompt asks for lo-hi words; allow 30% either way before calling it a fail.
    inRange(failures, 'word count', total, Math.round(lo * 0.7), Math.round(hi * 1.3));
    if (inputs.extras.includes('assumptions') && assumptions.length < 3) failures.push(`asked for assumptions and risks, got ${assumptions.length}`);
    if (metrics.length === 0) failures.push('no metrics');
  }

  const { quality, logs } = await scoreStrategy(inputs, output);
  addLogs(logs);
  const minScore = e.scoreMin ?? (c.kind === 'generate' ? QUALITY_PASS : undefined);
  inRange(failures, 'quality score', quality.score, minScore, e.scoreMax);
  for (const q of QUALITY_CHECKS) inRange(failures, `"${q.label}"`, quality.checks[q.key], e.checkMin?.[q.key], e.checkMax?.[q.key]);

  const text = strategyText(output);
  return {
    summary: `quality ${quality.score} (${QUALITY_CHECKS.map((q) => `${q.key} ${quality.checks[q.key]}`).join(', ')})`,
    failures,
    score: quality.score,
    scoreLabel: 'quality /100',
    costUsd,
    calls,
    output: trim(`${text}\n\n---\nChecker tips: ${quality.tips.join(' | ')}\nChecker feedback: ${quality.feedback}`),
    judgeContext: `THE USER'S FORM:\n${inputsText(inputs)}\n\nTHE STRATEGY:\n${text}`,
  };
}
