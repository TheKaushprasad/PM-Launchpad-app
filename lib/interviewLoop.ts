import { INTERVIEW_SCENARIOS } from '../data/interviewScenarios';
import { ACTIVE_INTERVIEWER } from '../data/interviewPersonas';
import { normalizeVerdict } from '../data/interviewTracks';
import {
  CandidateLevel,
  DifficultyLevel,
  HiringVerdict,
  InterviewEvaluation,
  InterviewScenario,
  InterviewTrack,
  InterviewerPersona
} from '../types/interview';

/**
 * A full loop runs several rounds back to back, like an onsite:
 * product sense, an analytical round, then behavioral.
 */
export interface LoopRoundPlan {
  scenario: InterviewScenario;
  persona: InterviewerPersona;
}

const LOOP_ROUNDS: { tracks: InterviewTrack[] }[] = [
  { tracks: ['design'] },
  { tracks: ['metrics', 'rca'] },
  { tracks: ['behavioral'] }
];

const DIFFICULTY_BY_LEVEL: Record<CandidateLevel, DifficultyLevel[]> = {
  apm: ['Easy', 'Medium'],
  pm: ['Medium', 'Hard'],
  spm: ['Hard', 'Medium']
};

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function planFullLoop(level: CandidateLevel): LoopRoundPlan[] {
  return LOOP_ROUNDS.map((round) => {
    const pool = INTERVIEW_SCENARIOS.filter((s) => round.tracks.includes(s.track));
    const preferred = pool.filter((s) => DIFFICULTY_BY_LEVEL[level].includes(s.difficulty));
    const scenario = pick(preferred.length > 0 ? preferred : pool);
    return { scenario, persona: ACTIVE_INTERVIEWER };
  });
}

export function loopTotalMinutes(plan: LoopRoundPlan[]): number {
  return plan.reduce((sum, r) => sum + r.scenario.targetDurationMinutes, 0);
}

/**
 * Hiring-committee style decision across rounds:
 * - Any Strong No Hire round means No Hire at best.
 * - Two or more No Hire rounds mean No Hire.
 * - Strong Hire needs every round at Hire or better and an average of 85+.
 * Otherwise the verdict follows the average score.
 */
export function computeLoopVerdict(rounds: InterviewEvaluation[]): { verdict: HiringVerdict; averageScore: number; reason: string } {
  const scored = rounds.filter((r) => r.status !== 'insufficient' && typeof r.overallScore === 'number');
  if (scored.length === 0) {
    return { verdict: 'No Hire', averageScore: 0, reason: 'No round had enough of an answer to score.' };
  }

  const averageScore = Math.round(scored.reduce((sum, r) => sum + r.overallScore, 0) / scored.length);
  const verdicts = scored.map((r) => normalizeVerdict(r.verdict));
  const strongNo = verdicts.filter((v) => v === 'Strong No Hire').length;
  const no = verdicts.filter((v) => v === 'No Hire' || v === 'Strong No Hire').length;
  const unscored = rounds.length - scored.length;

  if (unscored > 0) {
    return { verdict: 'No Hire', averageScore, reason: `${unscored} round${unscored === 1 ? ' was' : 's were'} too short to score, so the committee can't make a hire decision.` };
  }
  if (strongNo > 0) {
    return { verdict: averageScore < 50 ? 'Strong No Hire' : 'No Hire', averageScore, reason: 'One round was a Strong No Hire. Committees rarely hire past a strong no.' };
  }
  if (no >= 2) {
    return { verdict: 'No Hire', averageScore, reason: 'Two or more rounds were No Hire.' };
  }
  if (averageScore >= 85 && no === 0 && verdicts.every((v) => v === 'Strong Hire' || v === 'Hire')) {
    return { verdict: 'Strong Hire', averageScore, reason: 'Every round was Hire or better, with a high average.' };
  }
  if (averageScore >= 70) {
    return {
      verdict: 'Hire',
      averageScore,
      reason: no === 1 ? 'One weak round, but the others were strong enough to outweigh it.' : 'Consistent Hire-level performance across rounds.'
    };
  }
  return { verdict: 'No Hire', averageScore, reason: 'The average across rounds was below the Hire bar.' };
}
