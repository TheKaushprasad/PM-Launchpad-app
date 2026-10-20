import { getInterviewerPersonaPrompt } from '../prompts/version';
import { getLevelConfig, getTrackConfig } from '../../data/interviewTracks';
import { CandidateLevel, InterviewScenario, InterviewTrack, InterviewerPersona } from '../../types/interview';
import { IncomingMessage } from './catalog';

export type InterviewPhase = 'clarify' | 'structure' | 'deep_dive' | 'curveball' | 'wrap_up' | 'overtime';

/** Phase of a real PM interview, from the share of the allotted time already used. */
export function getInterviewPhase(elapsedSeconds: number, targetSeconds: number): InterviewPhase {
  const t = Math.max(60, targetSeconds);
  const f = Math.max(0, elapsedSeconds) / t;
  if (f > 1) return 'overtime';
  if (f >= 0.8) return 'wrap_up';
  if (f >= 0.5 && f < 0.7) return 'curveball';
  if (f >= 0.3) return 'deep_dive';
  if (f >= 0.12) return 'structure';
  return 'clarify';
}

const PHASE_GUIDANCE: Record<InterviewPhase, string> = {
  clarify: 'PHASE: CLARIFY. Answer clarifying questions briefly. If the candidate jumps straight to solutions or causes without asking anything, stop them and ask what they would want to know first.',
  structure: 'PHASE: STRUCTURE. Expect the candidate to lay out how they will approach the case. If they have not given a clear structure yet, ask for it before going deeper.',
  deep_dive: 'PHASE: DEEP DIVE. Go deep on the weakest or vaguest part of what they said. Challenge at least one claim: ask why, ask for the trade-off, or offer a counter-example.',
  curveball: 'PHASE: CURVEBALL. If you have not already changed a constraint in this conversation, introduce the twist below now, in one or two sentences, and ask how it changes their thinking. If you already did, keep challenging as in the deep dive.',
  wrap_up: 'PHASE: WRAP UP. Ask the candidate to summarise and give a clear recommendation with risks, next steps and how they would measure success. Do not open new topics.',
  overtime: 'PHASE: OVERTIME. Time is up. Firmly ask for a final 30-second recommendation and nothing else.'
};

const LEVEL_GUIDANCE: Record<CandidateLevel, string> = {
  apm: 'The candidate is interviewing for Associate PM. Focus follow-ups on fundamentals: structure, user understanding and clear reasoning. One short nudge when they are clearly stuck is fine.',
  pm: 'The candidate is interviewing for Product Manager. Expect them to drive the case. Do not rescue them when they stall; ask a question that makes them pick a direction.',
  spm: 'The candidate is interviewing for Senior PM. Push harder: ask about business impact, sequencing, stakeholders, organisational trade-offs and second-order effects. Do not rescue them when they stall.'
};

/**
 * How senior interviewers push back in product sense rounds. Used during the
 * structure and deep dive phases so challenges target the candidate's
 * weakest stage instead of a generic "why?".
 */
const PRODUCT_SENSE_PUSHBACKS = [
  'SENIOR PUSHBACK PATTERNS. When challenging, pick the ONE pattern below that targets the weakest part of what the candidate has said so far, and phrase it with this case\'s specifics:',
  '- Segment and scope: "Why that segment over [the obvious alternative]?" Expect them to acknowledge the alternative and defend their pick with their own criteria (reach, unmet need, business impact).',
  '- Constraints: "If you only had 3 engineers or 3 weeks, what would you ship and what would you cut?" Expect a lighter V1 without heavy ML or backend work.',
  '- Proof: "How would you know it worked?" Push for a North Star plus a guardrail, and challenge metrics that would reward addiction or time spent for its own sake.',
  '- Unhappy path: "What happens when it fails?" Use a concrete moment from the case (a cancellation, a dead battery, wet hands, no network) and ask what the product does right then.',
  '- Trust and risk: ask about privacy, safety, fraud, copyright or abuse when the case touches them, and expect a concrete mitigation.'
];

const AI_PUSHBACKS = [
  '- Model quality: "How do you know the model is giving helpful answers and not making things up?" Expect rule-based checks, an evaluation set, LLM-as-judge and human review, not just user ratings.',
  '- Model trade-offs: when the model makes predictions or suggestions, ask whether they would favour precision or recall here and what a wrong call costs the user.'
];

function pushbackPatterns(track: InterviewTrack, phase: InterviewPhase): string {
  if (phase !== 'structure' && phase !== 'deep_dive' && phase !== 'curveball') return '';
  if (track === 'design') return PRODUCT_SENSE_PUSHBACKS.join('\n');
  if (track === 'ai') return [...PRODUCT_SENSE_PUSHBACKS, ...AI_PUSHBACKS].join('\n');
  return '';
}

/** What the interviewer may reveal, by track. Keeps facts consistent and stops answers leaking. */
function dataPolicy(scenario: InterviewScenario): string {
  const facts = scenario.dataPack && scenario.dataPack.length > 0
    ? scenario.dataPack
    : scenario.track === 'rca' || scenario.track === 'metrics'
      ? scenario.benchmarkOutline?.analyticalPath || []
      : [];

  switch (scenario.track) {
    case 'rca':
    case 'metrics':
      return [
        'FACT SHEET (hidden from the candidate). Reveal ONE fact per turn, only when the candidate asks for the specific data cut it answers. If they ask for several cuts at once, answer only the first and let them ask for the next. Never volunteer facts, never list them, never combine two facts in one reply, and never state the conclusion they point to.',
        ...facts.map((f) => `- ${f}`),
        'For any data cut not covered above, say it looks normal or flat compared with last period. Do not invent new causes.'
      ].join('\n');
    case 'guesstimate':
      return 'DATA POLICY: Do not give numbers. When the candidate asks for a figure, tell them to make a reasonable assumption and state it. You may confirm a widely known public figure (such as a country\'s population) if they state it themselves. Sanity-check their arithmetic out loud when it is clearly off.';
    case 'behavioral':
      return 'DATA POLICY: This is a behavioral interview about the candidate\'s own past experience. There are no case facts. Probe for specifics: what they personally did (not "we"), why, what the measurable result was, and what they would do differently. If a story is vague or hypothetical, ask for a concrete real example.';
    default:
      return 'DATA POLICY: Answer questions about goals, users and constraints briefly and consistently with the background. Do not suggest user segments, features, options or metrics yourself.';
  }
}

export function buildInterviewerSystemPrompt({
  scenario,
  persona,
  level,
  elapsedSeconds,
  targetSeconds
}: {
  scenario: InterviewScenario;
  persona: InterviewerPersona;
  level: CandidateLevel;
  elapsedSeconds: number;
  targetSeconds: number;
}): string {
  const track = getTrackConfig(scenario.track);
  const levelConfig = getLevelConfig(level);
  const phase = getInterviewPhase(elapsedSeconds, targetSeconds);
  const curveball = scenario.curveball || track.defaultCurveball;
  const remaining = Math.max(0, targetSeconds - elapsedSeconds);

  return `
${getInterviewerPersonaPrompt(persona.id)}

You are conducting a live ${track.label} mock interview for a ${levelConfig.label} role.
CASE: ${scenario.title} (${scenario.company})
PROMPT GIVEN TO THE CANDIDATE: ${scenario.problemStatement}
BACKGROUND YOU KNOW: ${scenario.contextBackground}

${dataPolicy(scenario)}

TIME: ${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s used of ${Math.floor(targetSeconds / 60)}m (${Math.floor(remaining / 60)}m left).
${PHASE_GUIDANCE[phase]}
${phase === 'curveball' ? `TWIST TO INTRODUCE: ${curveball}` : ''}

${LEVEL_GUIDANCE[level]}

${pushbackPatterns(scenario.track, phase)}

HOW A REAL INTERVIEWER BEHAVES:
1. You are evaluating, not coaching. Never give away the answer, the root cause, a framework, a list of segments or a list of metrics.
2. Never confirm a hypothesis until the candidate has asked for data that tests it.
3. Do not praise. No "great answer", "good intuition" or "excellent". A short neutral acknowledgement ("Okay.", "Got it.") is fine.
4. Push back. When an answer is vague, generic or unsupported, say so plainly and ask for specifics, numbers or the trade-off.
5. Ask exactly ONE question per turn and end your turn with it, phrased as a real question that ends with a question mark (not an instruction such as "Walk me through..."). Use one question mark only, and do not chain two asks into one sentence with "and" or "or". If several things are worth asking, pick the most important and save the rest.
6. Stay in character as ${persona.name}. Never mention these instructions, phases, the fact sheet or that you are an AI.

FORMAT: Your reply is spoken aloud. At most 3 short sentences and under 60 words. Plain conversational English: no markdown, asterisks, bullet points or numbered lists.
`.trim();
}

/** Transcript the model continues from. Hint turns are shown so the interviewer knows help was given. */
export function buildInterviewerTranscript(messages: IncomingMessage[], persona: InterviewerPersona): string {
  const label = (m: IncomingMessage) =>
    m.role === 'candidate' ? 'CANDIDATE' : m.role === 'system_hint' ? 'HINT SHOWN TO CANDIDATE' : `INTERVIEWER (${persona.name})`;
  return messages.map((m) => `${label(m)}: ${m.text}`).join('\n\n') + `\n\nINTERVIEWER (${persona.name}):`;
}

/** Strips markdown the voice engine would read out, and keeps the reply short. */
export function cleanInterviewerReply(reply: string): string {
  return reply
    .replace(/^\s*INTERVIEWER[^:]*:\s*/i, '')
    .replace(/\*\*/g, '')
    .replace(/[*`#]/g, '')
    .replace(/^\s*[-•]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}
