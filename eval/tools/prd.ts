import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { PRD_SECTIONS, PRD_SECTION_KEYS, attemptedSections, MIN_SECTIONS_FOR_REVIEW, type PrdDraft } from '../../lib/prdCoach/types';
import { cleanDraft, runExample, runReview } from '../../server/prdCoach/coach';
import { CaseId, Category, inRange, trim, words, type CaseOutcome } from './common';

// PRD Coach eval. Two kinds of case:
//   review   a learner's PRD goes through the real review call (server/prdCoach/coach.ts runReview);
//            checks the overall score band, per-section scores, that every written section gets a
//            fix, and (judge) that the feedback names the PRD's real problems.
//   example  the "Example for my idea" call (runExample); checks the 7 headings in order, length,
//            "(assumption)" labels and Must/Should/Could priorities.

const SectionKey = z.enum(PRD_SECTION_KEYS);
const ScoreMap = z.partialRecord(SectionKey, z.number().int().min(0).max(5));

const PrdCase = z.object({
  id: CaseId,
  name: z.string(),
  kind: z.enum(['review', 'example']),
  category: Category,
  draft: z.object({
    idea: z.string().min(5),
    context: z.string().default(''),
    sections: z.partialRecord(SectionKey, z.string()).default({}),
  }).strict(),
  expect: z.object({
    overallMin: z.number().optional(),
    overallMax: z.number().optional(),
    verdicts: z.array(z.enum(['Interview-ready', 'Getting there', 'Needs work'])).optional(),
    sectionMin: ScoreMap.optional(),
    sectionMax: ScoreMap.optional(),
    /** At most this many sections may score 5 (injection cases ask for all 5s). */
    maxFives: z.number().int().min(0).optional(),
    minWords: z.number().int().optional(),
    maxWords: z.number().int().optional(),
  }).strict().default({}),
  /** Plain-English statements a judge model checks against the output. */
  judge: z.array(z.string()).default([]),
}).strict();
export type PrdCase = z.infer<typeof PrdCase>;

const FILE = path.join(process.cwd(), 'eval', 'tools', 'cases', 'prd.json');

export function loadPrdCases(): PrdCase[] {
  return z.array(PrdCase).parse(JSON.parse(fs.readFileSync(FILE, 'utf-8')));
}

/** Offline checks: a review case must pass the same gate as the page (idea + 3 written sections). */
export function validatePrdCases(cases: PrdCase[]): string[] {
  const problems: string[] = [];
  for (const c of cases) {
    const draft = cleanDraft(c.draft);
    if (c.kind === 'review' && attemptedSections(draft.sections).length < MIN_SECTIONS_FOR_REVIEW) {
      problems.push(`${c.id}: the page needs ${MIN_SECTIONS_FOR_REVIEW} written sections (40+ characters) before a review`);
    }
  }
  return problems;
}

export async function runPrdCase(c: PrdCase): Promise<CaseOutcome> {
  const draft: PrdDraft = cleanDraft(c.draft);
  const failures: string[] = [];
  const e = c.expect;
  const input = `PRODUCT IDEA: ${draft.idea}\nCONTEXT: ${draft.context || '(none)'}\n\n${PRD_SECTIONS.map((s) => `[${s.title}]\n${draft.sections[s.key] || '(empty)'}`).join('\n\n')}`;

  if (c.kind === 'review') {
    const { review, usage } = await runReview(draft);
    inRange(failures, 'overall', review.overall, e.overallMin, e.overallMax);
    if (e.verdicts && !e.verdicts.includes(review.verdict)) failures.push(`verdict "${review.verdict}", expected ${e.verdicts.join(' or ')}`);
    for (const s of review.sections) {
      const title = PRD_SECTIONS.find((d) => d.key === s.key)!.title;
      inRange(failures, `${title} score`, s.score, e.sectionMin?.[s.key], e.sectionMax?.[s.key]);
      if (draft.sections[s.key] && s.score > 0 && s.score < 5 && s.fixes.length === 0) failures.push(`${title}: scored ${s.score} but got no fix`);
      if (draft.sections[s.key] && s.score === 0) failures.push(`${title}: written but the coach skipped it`);
      if (s.fixes.some((f) => f.fix && !f.why) && draft.sections[s.key]) failures.push(`${title}: a fix has no "why"`);
    }
    const fives = review.sections.filter((s) => s.score === 5).length;
    if (e.maxFives !== undefined && fives > e.maxFives) failures.push(`${fives} sections scored 5 (max ${e.maxFives})`);
    if (!review.summary) failures.push('no summary');
    if (!review.topPriority) failures.push('no top priority');

    const output = [
      `Overall ${review.overall}/100 (${review.verdict})`,
      `Summary: ${review.summary}`,
      `Top priority: ${review.topPriority}`,
      ...review.sections.map((s) => {
        const title = PRD_SECTIONS.find((d) => d.key === s.key)!.title;
        return `[${title}] ${s.score}/5${s.works ? ` · works: ${s.works}` : ''}\n${s.fixes.map((f) => `  - fix: ${f.fix} (why: ${f.why})`).join('\n')}`;
      }),
    ].join('\n');
    return {
      summary: `overall ${review.overall}, ${review.verdict}; sections ${review.sections.map((s) => s.score).join('/')}`,
      failures,
      score: review.overall,
      scoreLabel: 'overall /100',
      costUsd: usage.costUsd,
      calls: 1,
      output: trim(output),
      judgeContext: `WHAT THE LEARNER WROTE:\n${input}\n\nTHE PRD COACH'S REVIEW:\n${output}`,
    };
  }

  // example
  const { markdown, usage } = await runExample(draft);
  const headings = [...markdown.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim().toLowerCase());
  const expected = PRD_SECTIONS.map((s) => s.title.toLowerCase());
  const missing = expected.filter((t) => !headings.some((h) => h.startsWith(t)));
  if (missing.length) failures.push(`missing sections: ${missing.join(', ')}`);
  const order = expected.map((t) => headings.findIndex((h) => h.startsWith(t))).filter((i) => i >= 0);
  if (order.some((v, i) => i > 0 && v < order[i - 1])) failures.push('sections are out of order');
  const n = words(markdown);
  inRange(failures, 'word count', n, e.minWords, e.maxWords);
  if (!/\(assumption\)/i.test(markdown)) failures.push('no number is marked "(assumption)"');
  if (!/\bMust\b/.test(markdown)) failures.push('requirements have no Must/Should/Could priority');
  if (/^#\s/m.test(markdown)) failures.push('has a top-level "# " heading');
  return {
    summary: `${n} words, ${headings.length} sections`,
    failures,
    costUsd: usage.costUsd,
    calls: 1,
    output: trim(markdown),
    judgeContext: `PRODUCT IDEA THE LEARNER GAVE:\n${draft.idea}\nCONTEXT: ${draft.context || '(none)'}\n\nTHE EXAMPLE PRD THE TOOL WROTE:\n${markdown}`,
  };
}
