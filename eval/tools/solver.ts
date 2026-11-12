import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { FRAMEWORKS, ITEM_TYPES, PASS_SCORE, RUBRIC, type Brief, type BriefItem, type ResearchFact } from '../../lib/assignmentSolver/types';
import { cleanBrief, cleanStrategy, runCritic, runParser, runResearcher, runStrategist, runWriter } from '../../server/assignmentSolver/agents';
import { CaseId, Category, inRange, trim, words, type CaseOutcome } from './common';

// Assignment Solver eval: each agent is tested on its own, with fixed inputs, so a failure points at
// one agent and a case costs 1-2 calls instead of a 10+ call run.
//   parse     Parser: assignment text -> brief. Checks item count, item types, word limit, open questions.
//   plan      Strategist: one item + facts -> plan. Checks framework, 2+ options, metrics, fact ids.
//   write     Writer then Critic: plan -> section -> review. Checks citations, (assumption) labels,
//             headings, length, insight tags, and that the Critic passes the section.
//   critique  Critic only, on a fixed section: a strong section must pass, a generic one must fail,
//             uncited numbers must be flagged.
//   research  Researcher with Google Search (only with --search: grounding is billed per search).

const Fact = z.object({ id: z.string().regex(/^S\d{1,3}$/), category: z.enum(['company', 'users', 'competitors', 'market']), text: z.string() }).strict();

const SolverCase = z.object({
  id: CaseId,
  name: z.string(),
  kind: z.enum(['parse', 'plan', 'write', 'critique', 'research']),
  category: Category,
  /** parse cases: what the user pastes on the first screen. */
  input: z.object({ assignment: z.string(), company: z.string().default(''), jobDescription: z.string().default(''), deadline: z.string().default('') }).strict().optional(),
  /** plan / write / critique / research cases. */
  brief: z.any().optional(),
  itemId: z.string().optional(),
  facts: z.array(Fact).default([]),
  /** write cases: the Strategist's plan (as it would come back). critique cases: the section to review. */
  strategy: z.any().optional(),
  markdown: z.string().optional(),
  expect: z.object({
    itemsMin: z.number().int().optional(),
    itemsMax: z.number().int().optional(),
    /** parse: allowed types for each item, in order, e.g. [["product design"], ["metrics"]]. */
    itemTypes: z.array(z.array(z.enum(ITEM_TYPES))).optional(),
    wordLimitIncludes: z.string().optional(),
    openQuestionsMin: z.number().int().optional(),
    averageMin: z.number().optional(),
    averageMax: z.number().optional(),
    passed: z.boolean().optional(),
    /** critique: each string must appear (case-insensitive) in at least one flag. */
    flagsInclude: z.array(z.string()).optional(),
    minWords: z.number().int().optional(),
    maxWords: z.number().int().optional(),
    factsMin: z.number().int().optional(),
  }).strict().default({}),
  judge: z.array(z.string()).default([]),
}).strict();
export type SolverCase = z.infer<typeof SolverCase>;

const FILE = path.join(process.cwd(), 'eval', 'tools', 'cases', 'solver.json');

export function loadSolverCases(): SolverCase[] {
  return z.array(SolverCase).parse(JSON.parse(fs.readFileSync(FILE, 'utf-8')));
}

const today = new Date().toISOString().slice(0, 10);
const factsFor = (c: SolverCase): ResearchFact[] =>
  c.facts.map((f) => ({ ...f, sourceIds: [1], confidence: 'high', retrievedAt: today }));

function briefAndItem(c: SolverCase): { brief: Brief; item: BriefItem } {
  const brief = cleanBrief(c.brief);
  const item = brief.items.find((i) => i.id === c.itemId) || brief.items[0];
  return { brief, item };
}

export function validateSolverCases(cases: SolverCase[]): string[] {
  const problems: string[] = [];
  for (const c of cases) {
    if (c.kind === 'parse' && !c.input?.assignment) problems.push(`${c.id}: parse cases need input.assignment`);
    if (['plan', 'write', 'critique', 'research'].includes(c.kind)) {
      const brief = cleanBrief(c.brief);
      if (!brief.items.length) problems.push(`${c.id}: brief has no items`);
      if (c.itemId && !brief.items.some((i) => i.id === c.itemId)) problems.push(`${c.id}: itemId ${c.itemId} is not in the brief`);
    }
    if (c.kind === 'write' && !c.strategy) problems.push(`${c.id}: write cases need a strategy`);
    if (c.kind === 'critique' && !c.markdown) problems.push(`${c.id}: critique cases need markdown`);
  }
  return problems;
}

/** Problems with a Writer section that need no model to spot. */
function sectionProblems(markdown: string, facts: ResearchFact[], hasAssumptions: boolean): string[] {
  const out: string[] = [];
  const known = new Set(facts.map((f) => f.id));
  const cited = [...new Set([...markdown.matchAll(/\[(S\d{1,3})\]/g)].map((m) => m[1]))];
  const unknown = cited.filter((id) => !known.has(id));
  if (unknown.length) out.push(`cites facts that do not exist: ${unknown.join(', ')}`);
  if (facts.length && !cited.length) out.push('cites none of the research facts');
  if (hasAssumptions && !/\(assumption\)/i.test(markdown)) out.push('no claim is marked "(assumption)"');
  if (/^#{1,2}\s/m.test(markdown)) out.push('uses # or ## headings (only ### allowed)');
  if (!/\[ADD YOUR INSIGHT/i.test(markdown)) out.push('no [ADD YOUR INSIGHT: ...] tag for the candidate');
  if (/in conclusion/i.test(markdown)) out.push('says "In conclusion"');
  return out;
}

const factText = (facts: ResearchFact[]) => facts.map((f) => `[${f.id}] ${f.text}`).join('\n') || '(none)';

export async function runSolverCase(c: SolverCase): Promise<CaseOutcome> {
  const failures: string[] = [];
  const e = c.expect;
  const facts = factsFor(c);

  if (c.kind === 'parse') {
    const input = { assignment: c.input!.assignment, company: c.input!.company, jobDescription: c.input!.jobDescription, deadline: c.input!.deadline };
    const { brief, usage } = await runParser(input);
    inRange(failures, 'items', brief.items.length, e.itemsMin, e.itemsMax);
    (e.itemTypes || []).forEach((allowed, i) => {
      const got = brief.items[i]?.type;
      if (got && !allowed.includes(got)) failures.push(`Q${i + 1} tagged "${got}", expected ${allowed.join(' or ')}`);
    });
    if (e.wordLimitIncludes && !brief.constraints.wordLimit.toLowerCase().includes(e.wordLimitIncludes.toLowerCase())) {
      failures.push(`word limit "${brief.constraints.wordLimit}", expected it to include "${e.wordLimitIncludes}"`);
    }
    inRange(failures, 'open questions', brief.openQuestions.length, e.openQuestionsMin);
    const output = JSON.stringify(brief, null, 1);
    return {
      summary: `${brief.items.length} items (${brief.items.map((i) => i.type).join(', ')}), ${brief.openQuestions.length} open questions`,
      failures, costUsd: usage.costUsd, calls: 1, output: trim(output),
      judgeContext: `THE ASSIGNMENT:\n${input.assignment}\n\nTHE PARSER'S BRIEF:\n${output}`,
    };
  }

  if (c.kind === 'research') {
    const { brief } = briefAndItem(c);
    const { research, usage } = await runResearcher({ brief, jobDescription: '', maxSearches: 4 });
    inRange(failures, 'sourced facts', research.facts.length, e.factsMin ?? 5);
    if (research.facts.some((f) => !f.sourceIds.length)) failures.push('a fact has no source');
    if (research.sources.some((s) => !/^https?:\/\//.test(s.url))) failures.push('a source has no link');
    const output = research.facts.map((f) => `[${f.id}] (${f.category}) ${f.text}`).join('\n');
    return {
      summary: `${research.facts.length} facts from ${research.sources.length} sources, ${usage.searches} searches`,
      failures, costUsd: usage.costUsd, calls: 1, output: trim(output),
      judgeContext: `COMPANY: ${brief.company}\n\nFACTS THE RESEARCHER FOUND:\n${output}`,
    };
  }

  const { brief, item } = briefAndItem(c);

  if (c.kind === 'plan') {
    const { strategy, usage } = await runStrategist({ brief, item, facts });
    if (!(FRAMEWORKS as readonly string[]).includes(strategy.framework)) failures.push(`framework "${strategy.framework}" is not in the library`);
    if (!strategy.frameworkReason) failures.push('no reason for the framework');
    inRange(failures, 'options', strategy.options.length, 2);
    inRange(failures, 'metrics', strategy.metrics.length, 2);
    if (!strategy.recommendation) failures.push('no recommendation');
    if (!strategy.tradeoffs.length) failures.push('no trade-offs');
    if (!strategy.assumptions.length) failures.push('no assumptions');
    inRange(failures, 'outline headings', strategy.outline.length, 4, 8);
    if (facts.length && !strategy.factIds.length) failures.push('uses none of the research facts');
    const output = JSON.stringify(strategy, null, 1);
    return {
      summary: `${strategy.framework}, ${strategy.options.length} options, ${strategy.metrics.length} metrics, ${strategy.factIds.length} facts used`,
      failures, costUsd: usage.costUsd, calls: 1, output: trim(output),
      judgeContext: `QUESTION: ${item.text}\n\nRESEARCH FACTS:\n${factText(facts)}\n\nTHE STRATEGIST'S PLAN:\n${output}`,
    };
  }

  let markdown = c.markdown || '';
  let costUsd = 0;
  let calls = 0;
  if (c.kind === 'write') {
    const strategy = cleanStrategy(c.strategy, item.id, facts);
    const w = await runWriter({ brief, item, strategy, facts, feedback: '', note: '', previous: '' });
    markdown = w.section.markdown;
    costUsd += w.usage.costUsd;
    calls++;
    failures.push(...sectionProblems(markdown, facts, strategy.assumptions.length > 0));
    inRange(failures, 'word count', words(markdown), e.minWords, e.maxWords);
  }

  const { review, usage } = await runCritic({ item, markdown, facts });
  costUsd += usage.costUsd;
  calls++;
  // Write cases must reach the Critic's pass mark on the first draft unless the case says otherwise.
  const averageMin = e.averageMin ?? (c.kind === 'write' ? PASS_SCORE : undefined);
  inRange(failures, 'Critic average', review.average, averageMin, e.averageMax);
  if (e.passed !== undefined && review.passed !== e.passed) failures.push(`Critic ${review.passed ? 'passed' : 'failed'} the section, expected it to ${e.passed ? 'pass' : 'fail'}`);
  for (const needle of e.flagsInclude || []) {
    if (!review.flags.some((f) => f.toLowerCase().includes(needle.toLowerCase()))) failures.push(`Critic did not flag "${needle}"`);
  }

  const reviewText = `Scores: ${RUBRIC.map((r) => `${r.key} ${review.scores[r.key]}`).join(', ')} (average ${review.average})\nFeedback: ${review.feedback}\nFlags:\n${review.flags.map((f) => `- ${f}`).join('\n') || '(none)'}`;
  return {
    summary: `Critic average ${review.average} (${review.passed ? 'passes' : 'fails'}), ${review.flags.length} flags${c.kind === 'write' ? `, ${words(markdown)} words` : ''}`,
    failures,
    score: review.average,
    scoreLabel: 'Critic average /5',
    costUsd,
    calls,
    output: trim(`${c.kind === 'write' ? `${markdown}\n\n---\n` : ''}${reviewText}`),
    judgeContext: `QUESTION: ${item.text}\n\nRESEARCH FACTS:\n${factText(facts)}\n\nTHE SECTION:\n${markdown}\n\nTHE CRITIC'S REVIEW:\n${reviewText}`,
  };
}
