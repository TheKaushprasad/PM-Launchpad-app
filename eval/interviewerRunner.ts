/**
 * Interviewer benchmark: checks the live interviewer behaves like a real one.
 *
 *   npm run eval:interviewer -- --validate   offline: checks every scenario's prompt for answer leaks, no API calls
 *   npm run eval:interviewer                 calls Gemini once per case (10 calls) and checks each reply
 *   npm run eval:interviewer -- --case a,b   only these cases
 *   npm run eval:interviewer -- --delay 15   wait between cases (default 15s; the free tier allows 5 calls a minute)
 *
 * Uses the same prompt builder as /api/interview/chat. Run it on the eval-only key,
 * like the evaluator benchmark. Exits 1 when any check fails.
 */
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { z } from 'zod';
import { INTERVIEW_SCENARIOS } from '../data/interviewScenarios';
import { getScenarioById, getPersonaById, sanitizeMessages } from '../server/interview/catalog';
import { getInterviewGeminiKey } from '../server/geminiKeys';
import {
  buildInterviewerSystemPrompt,
  buildInterviewerTranscript,
  cleanInterviewerReply,
  getInterviewPhase
} from '../server/interview/interviewerPrompt';
import { normalizeLevel } from '../data/interviewTracks';

dotenv.config();
// Keys usually live in services/.env (same place the main eval reads them from).
dotenv.config({ path: 'services/.env' });

const CaseSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  scenarioId: z.string(),
  personaId: z.string(),
  level: z.enum(['apm', 'pm', 'spm']),
  elapsedSeconds: z.number().int().min(0),
  messages: z.array(z.object({ role: z.enum(['interviewer', 'candidate']), text: z.string().min(1) }).strict()).min(1),
  checks: z.object({
    maxWords: z.number().int().positive().optional(),
    /** Most question marks allowed in one reply. Defaults to 1: real interviewers ask one thing at a time. */
    maxQuestions: z.number().int().positive().optional(),
    mustAskQuestion: z.boolean().optional(),
    noPraise: z.boolean().optional(),
    mustNotContain: z.array(z.string()).optional(),
    mustContainAny: z.array(z.string()).optional()
  }).strict()
}).strict();
type InterviewerCase = z.infer<typeof CaseSchema>;

const PRAISE = /\b(great|excellent|awesome|fantastic|brilliant|good (?:intuition|insight|answer|point|job)|nice (?:work|job)|love (?:that|it)|well done|impressive)\b/i;

function loadCases(): InterviewerCase[] {
  const raw = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'eval', 'interviewer', 'cases.json'), 'utf-8'));
  const cases = z.array(CaseSchema).parse(raw);
  for (const c of cases) {
    if (!getScenarioById(c.scenarioId)) throw new Error(`${c.id}: unknown scenarioId ${c.scenarioId}`);
  }
  return cases;
}

function promptFor(c: InterviewerCase): string {
  const scenario = getScenarioById(c.scenarioId)!;
  return buildInterviewerSystemPrompt({
    scenario,
    persona: getPersonaById(c.personaId),
    level: normalizeLevel(c.level),
    elapsedSeconds: c.elapsedSeconds,
    targetSeconds: scenario.targetDurationMinutes * 60
  });
}

/** Offline: the interviewer prompt must never contain the model answer, for any scenario or phase. */
function validateNoLeaks(): string[] {
  const problems: string[] = [];
  const persona = getPersonaById('maya');
  for (const scenario of INTERVIEW_SCENARIOS) {
    const target = scenario.targetDurationMinutes * 60;
    for (const elapsed of [0, target * 0.2, target * 0.4, target * 0.6, target * 0.9, target * 1.2]) {
      const prompt = buildInterviewerSystemPrompt({ scenario, persona, level: 'pm', elapsedSeconds: Math.floor(elapsed), targetSeconds: target });
      if (scenario.benchmarkOutline.synthesisModel && prompt.includes(scenario.benchmarkOutline.synthesisModel)) {
        problems.push(`${scenario.id}: model answer (synthesisModel) is in the interviewer prompt`);
      }
      // Only root cause and metrics rounds get a fact sheet; elsewhere the ideal path is the answer.
      if (scenario.track !== 'rca' && scenario.track !== 'metrics') {
        for (const step of scenario.benchmarkOutline.analyticalPath) {
          if (step.length > 20 && prompt.includes(step)) {
            problems.push(`${scenario.id}: ideal analytical path leaks into the ${scenario.track} interviewer prompt`);
            break;
          }
        }
      }
      // Fact-sheet lines are revealed only on request, so ignore them here.
      const facts = scenario.dataPack ?? (scenario.track === 'rca' || scenario.track === 'metrics' ? scenario.benchmarkOutline.analyticalPath : []);
      const promptWithoutFacts = facts.reduce((p, f) => p.split(`- ${f}`).join(''), prompt);
      for (const hypothesis of scenario.benchmarkOutline.coreHypothesesOrSegments) {
        if (hypothesis.length > 20 && promptWithoutFacts.includes(hypothesis)) {
          problems.push(`${scenario.id}: expected hypotheses/segments leak into the interviewer prompt`);
          break;
        }
      }
    }
  }
  // Phases follow the clock
  const expectations: Array<[number, string]> = [[0, 'clarify'], [200, 'structure'], [400, 'deep_dive'], [550, 'curveball'], [850, 'wrap_up'], [1000, 'overtime']];
  for (const [elapsed, phase] of expectations) {
    const got = getInterviewPhase(elapsed, 900);
    if (got !== phase) problems.push(`phase at ${elapsed}s of 900s should be ${phase}, got ${got}`);
  }
  return Array.from(new Set(problems));
}

function checkReply(c: InterviewerCase, reply: string): string[] {
  const failures: string[] = [];
  const words = reply.split(/\s+/).filter(Boolean).length;
  const lower = reply.toLowerCase();
  if (!reply) failures.push('empty reply');
  if (c.checks.maxWords && words > c.checks.maxWords) failures.push(`${words} words (max ${c.checks.maxWords})`);
  if (/[*#`]|^\s*[-•]\s/m.test(reply)) failures.push('contains markdown');
  if (c.checks.mustAskQuestion && !reply.includes('?')) failures.push('does not ask a question');
  const questions = (reply.match(/\?/g) || []).length;
  const maxQuestions = c.checks.maxQuestions ?? 1;
  if (questions > maxQuestions) failures.push(`asks ${questions} questions in one turn (max ${maxQuestions})`);
  if (c.checks.noPraise && PRAISE.test(reply)) failures.push(`praises the candidate ("${reply.match(PRAISE)?.[0]}")`);
  for (const s of c.checks.mustNotContain || []) {
    if (lower.includes(s.toLowerCase())) failures.push(`leaks or confirms "${s}"`);
  }
  if (c.checks.mustContainAny && !c.checks.mustContainAny.some((s) => lower.includes(s.toLowerCase()))) {
    failures.push(`expected one of: ${c.checks.mustContainAny.join(', ')}`);
  }
  return failures;
}

async function callInterviewer(c: InterviewerCase, model: string): Promise<string> {
  const key = getInterviewGeminiKey();
  if (!key) throw new Error('GEMINI_INTERVIEW_API_KEY (or GEMINI_API_KEY) is not set (use the eval-only key)');
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: key });
  const messages = sanitizeMessages(c.messages)!;
  const response = await ai.models.generateContent({
    model,
    contents: buildInterviewerTranscript(messages, getPersonaById(c.personaId)),
    config: {
      systemInstruction: promptFor(c),
      temperature: 0.7,
      maxOutputTokens: 1000,
      thinkingConfig: { thinkingBudget: 0 }
    }
  });
  const finish = response.candidates?.[0]?.finishReason;
  if (finish && finish !== 'STOP') {
    const u: any = response.usageMetadata || {};
    console.log(`  (model stopped early: ${finish}; reply tokens ${u.candidatesTokenCount ?? '?'}, thinking tokens ${u.thoughtsTokenCount ?? 0})`);
  }
  return cleanInterviewerReply(response.text || '');
}

async function main() {
  const argv = process.argv.slice(2);
  const validateOnly = argv.includes('--validate');
  const caseIdx = argv.indexOf('--case');
  const only = caseIdx >= 0 ? (argv[caseIdx + 1] || '').split(',').filter(Boolean) : [];
  const delayIdx = argv.indexOf('--delay');
  const delaySeconds = delayIdx >= 0 ? Number(argv[delayIdx + 1]) : 15;
  const modelIdx = argv.indexOf('--model');
  const model = modelIdx >= 0 ? argv[modelIdx + 1] : 'gemini-3.8-flash';

  const cases = loadCases().filter((c) => only.length === 0 || only.includes(c.id));
  const leakProblems = validateNoLeaks();
  console.log(`Interviewer prompt leak check across ${INTERVIEW_SCENARIOS.length} scenarios: ${leakProblems.length === 0 ? 'PASSED' : 'FAILED'}`);
  leakProblems.forEach((p) => console.log(`  - ${p}`));
  console.log(`${cases.length} interviewer case(s) loaded.`);

  if (validateOnly) {
    process.exit(leakProblems.length === 0 ? 0 : 1);
  }

  let failed = leakProblems.length > 0 ? 1 : 0;
  const startedAt = new Date().toISOString();
  const results: Array<{ caseId: string; name: string; status: 'pass' | 'fail' | 'error'; reply?: string; failures: string[]; error?: string }> = [];
  for (let i = 0; i < cases.length; i++) {
    const c = cases[i];
    if (i > 0) await new Promise((r) => setTimeout(r, delaySeconds * 1000));
    try {
      const reply = await callInterviewer(c, model);
      const failures = checkReply(c, reply);
      console.log(`\n${failures.length === 0 ? 'PASS' : 'FAIL'}  ${c.id}: ${c.name}\n  reply: ${reply}`);
      failures.forEach((f) => console.log(`  - ${f}`));
      if (failures.length) failed++;
      results.push({ caseId: c.id, name: c.name, status: failures.length ? 'fail' : 'pass', reply, failures });
    } catch (err: any) {
      console.log(`\nERROR ${c.id}: ${err?.message || err}`);
      failed++;
      results.push({ caseId: c.id, name: c.name, status: 'error', failures: [], error: String(err?.message || err) });
    }
  }
  console.log(`\n${cases.length - failed} of ${cases.length} cases passed.`);

  // Saved for the local eval dashboard (/admin/evals), next to the scoring runs.
  const outDir = path.join(process.cwd(), 'eval', 'results');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `interviewer-${startedAt.replace(/[:.]/g, '-')}.json`);
  fs.writeFileSync(
    outFile,
    JSON.stringify({ kind: 'interviewer', startedAt, finishedAt: new Date().toISOString(), model, leakProblems, results }, null, 2)
  );
  console.log(`Full report: ${path.relative(process.cwd(), outFile)}`);
  process.exit(failed === 0 ? 0 : 1);
}

main();
