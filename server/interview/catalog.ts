import { INTERVIEW_SCENARIOS } from '../../data/interviewScenarios';
import { INTERVIEWER_PERSONAS } from '../../data/interviewPersonas';
import { InterviewScenario, InterviewerPersona } from '../../types/interview';

const scenariosById = new Map<string, InterviewScenario>(INTERVIEW_SCENARIOS.map((s) => [s.id, s]));

/**
 * Scenarios are looked up on the server by id, so a browser can't rewrite the
 * case, the interviewer's fact sheet or the answer key it is scored against.
 */
export function getScenarioById(id: unknown): InterviewScenario | null {
  if (typeof id !== 'string' || id.length > 128) return null;
  return scenariosById.get(id) || null;
}

export function getPersonaById(id: unknown): InterviewerPersona {
  return INTERVIEWER_PERSONAS.find((p) => p.id === id) || INTERVIEWER_PERSONAS[0];
}

export interface IncomingMessage {
  role: 'interviewer' | 'candidate' | 'system_hint';
  text: string;
}

const MAX_MESSAGES = 120;
const MAX_MESSAGE_CHARS = 4000;

/** Validates and caps the transcript a browser sends. */
export function sanitizeMessages(raw: unknown): IncomingMessage[] | null {
  if (!Array.isArray(raw)) return null;
  return raw.slice(-MAX_MESSAGES).flatMap((m: any) => {
    if (!m || typeof m.text !== 'string') return [];
    const role = m.role === 'candidate' || m.role === 'user'
      ? 'candidate'
      : m.role === 'system_hint'
        ? 'system_hint'
        : 'interviewer';
    const text = m.text.trim().slice(0, MAX_MESSAGE_CHARS);
    return text ? [{ role, text } as IncomingMessage] : [];
  });
}
