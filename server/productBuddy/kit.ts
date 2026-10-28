import { INTERVIEW_SCENARIOS } from '../../data/interviewScenarios';
import type { InterviewScenario, InterviewTrack } from '../../types/interview';
import type { SessionKind, SessionKitView } from '../../lib/productBuddy/types';

// The session kit: for each person who interviews in a Product Buddy session, one question from the
// mock-interview question bank, with follow-ups and a short rubric, so a peer mock runs like a real one.
// The person being asked never receives it (routes.ts strips other people's kits).

const TRACKS_FOR_TYPE: Record<string, InterviewTrack[]> = {
  'Product design': ['design'],
  'Product improvement': ['design'],
  'Product strategy': ['strategy'],
  'Metrics and analytics': ['metrics'],
  'Root cause analysis': ['rca'],
  Prioritization: ['strategy', 'design'],
  'Estimation/guesstimates': ['guesstimate'],
  Behavioral: ['behavioral'],
  'Technical product management': ['ai', 'design'],
};

const FOLLOW_UPS: Record<InterviewTrack, string[]> = {
  design: [
    'Which user did you pick, and why that one over the others?',
    'If you could ship only one of your ideas next month, which one and why?',
    'How would you know in 4 weeks that it worked?',
  ],
  strategy: [
    'What would make you change your recommendation?',
    'How would the biggest competitor respond?',
    'What do you need to believe for this bet to pay off?',
  ],
  metrics: [
    'Which single metric would you put on the CEO dashboard?',
    'What guardrail metric stops you from gaming that number?',
    'The metric went up 10% but revenue fell. What happened?',
  ],
  rca: [
    'Is this drop real, or could it be a tracking issue? How would you check?',
    'Which segment would you look at first, and why?',
    'You have one day of a data analyst. What do you ask for?',
  ],
  guesstimate: [
    'Which assumption, if wrong, changes your answer the most?',
    'Sanity-check your number another way.',
    'How would the answer change for a tier-2 city?',
  ],
  behavioral: [
    'What exactly did you do, as opposed to the team?',
    'What would you do differently now?',
    'How did you measure the result?',
  ],
  ai: [
    'How would you evaluate whether the model is good enough to launch?',
    'What happens when the model is confidently wrong?',
    'What does each request cost, and is it worth it?',
  ],
};

function tracksFor(interviewType: string): InterviewTrack[] {
  return TRACKS_FOR_TYPE[interviewType] || ['design'];
}

/**
 * Picks one question per interviewer, skipping questions either person has already had in a past
 * Product Buddy session where possible, and never the same question twice in one session.
 */
export function pickKit(interviewType: string, interviewerIds: string[], usedScenarioIds: Set<string>): Record<string, string> {
  const pool = INTERVIEW_SCENARIOS.filter((s) => tracksFor(interviewType).includes(s.track));
  const kit: Record<string, string> = {};
  const taken = new Set<string>();
  for (const uid of interviewerIds) {
    const fresh = pool.filter((s) => !usedScenarioIds.has(s.id) && !taken.has(s.id));
    const choices = fresh.length ? fresh : pool.filter((s) => !taken.has(s.id));
    const pick = choices[Math.floor(Math.random() * choices.length)];
    if (!pick) continue;
    kit[uid] = pick.id;
    taken.add(pick.id);
  }
  return kit;
}

/** Another question of the same type for this interviewer, different from every question in the session. */
export function swapQuestion(interviewType: string, current: Record<string, string>): string | null {
  const inUse = new Set(Object.values(current));
  const choices = INTERVIEW_SCENARIOS.filter((s) => tracksFor(interviewType).includes(s.track) && !inUse.has(s.id));
  return choices.length ? choices[Math.floor(Math.random() * choices.length)].id : null;
}

/** Who asks the questions: the requester, the recipient, or both in a swap. */
export function interviewersFor(kind: SessionKind, requesterId: string, recipientId: string): string[] {
  if (kind === 'swap') return [requesterId, recipientId];
  return kind === 'interview' ? [requesterId] : [recipientId];
}

export function kitView(scenarioId: string): SessionKitView | undefined {
  const s: InterviewScenario | undefined = INTERVIEW_SCENARIOS.find((x) => x.id === scenarioId);
  if (!s) return undefined;
  return {
    scenarioId: s.id,
    title: s.title,
    company: s.company,
    difficulty: s.difficulty,
    readOut: s.problemStatement,
    context: s.contextBackground,
    handOutIfAsked: s.dataPack || [],
    curveball: s.curveball,
    followUps: FOLLOW_UPS[s.track] || [],
    strongAnswerCovers: [...s.benchmarkOutline.analyticalPath, s.benchmarkOutline.synthesisModel].filter(Boolean),
    rubric: s.keyEvaluationMetrics,
  };
}
