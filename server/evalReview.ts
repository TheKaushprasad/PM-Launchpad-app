import fs from 'fs';
import path from 'path';
import { getAppFirestore } from '../services/firebaseAdmin';
import { EVAL_INTERVIEWS } from './interviewTesters';
import { TRACKS } from '../eval/types';
import { REAL_DATASET_DIR } from '../eval/dataset';

/**
 * Review of real tester interviews (saved by server/interviewTesters.ts) in the local eval dashboard,
 * and export of a reviewed interview into eval cases. Used only by the dev-only, localhost-only
 * routes in server/evalDashboard.ts.
 *
 * Exported cases go to eval/real/ (git-ignored), so real people's conversations never reach the repo:
 *   eval/real/dataset/real-<track>-<id>.json   scoring case with your score as a human label
 *   eval/real/interviewer-cases.json           one case per Priya turn you rewrote
 */

export const REAL_DIR = path.join(process.cwd(), 'eval', 'real');
export { REAL_DATASET_DIR };
export const REAL_INTERVIEWER_FILE = path.join(REAL_DIR, 'interviewer-cases.json');

const VERDICTS = ['Strong No Hire', 'No Hire', 'Hire', 'Strong Hire'] as const;
type Verdict = (typeof VERDICTS)[number];

export interface TurnReview {
  /** Index into the interview's messages; only interviewer turns are reviewed. */
  index: number;
  action: 'ok' | 'rewrite';
  rewrite?: string;
  note?: string;
}

export interface InterviewReview {
  status: 'draft' | 'done';
  turns: TurnReview[];
  humanScore?: number;
  humanVerdict?: Verdict;
  notes?: string;
  updatedAt?: string;
}

const col = () => getAppFirestore().collection(EVAL_INTERVIEWS);

export async function listTesterInterviews() {
  const snap = await col().orderBy('createdAt', 'desc').limit(500).get();
  return snap.docs.map((d) => {
    const x = d.data();
    return {
      id: d.id,
      email: x.email,
      createdAt: x.createdAt,
      scenarioTitle: x.scenarioTitle,
      track: x.track,
      level: x.level,
      mode: x.mode,
      turns: Array.isArray(x.messages) ? x.messages.length : 0,
      score: x.evaluation?.overallScore ?? null,
      verdict: x.evaluation?.verdict ?? null,
      reviewStatus: x.review?.status ?? null,
      exportedAt: x.exportedAt ?? null,
    };
  });
}

export async function getTesterInterview(id: string) {
  const snap = await col().doc(id).get();
  return snap.exists ? snap.data() : null;
}

export function cleanReview(body: any, messageCount: number): InterviewReview {
  const turns: TurnReview[] = (Array.isArray(body?.turns) ? body.turns : [])
    .filter((t: any) => Number.isInteger(t?.index) && t.index >= 0 && t.index < messageCount && (t.action === 'ok' || t.action === 'rewrite'))
    .map((t: any) => ({
      index: t.index,
      action: t.action,
      ...(t.action === 'rewrite' && typeof t.rewrite === 'string' ? { rewrite: t.rewrite.slice(0, 4000) } : {}),
      ...(typeof t.note === 'string' && t.note.trim() ? { note: t.note.slice(0, 1000) } : {}),
    }));
  const score = Number(body?.humanScore);
  return {
    status: body?.status === 'done' ? 'done' : 'draft',
    turns,
    ...(Number.isFinite(score) && score >= 0 && score <= 100 ? { humanScore: Math.round(score) } : {}),
    ...(VERDICTS.includes(body?.humanVerdict) ? { humanVerdict: body.humanVerdict } : {}),
    ...(typeof body?.notes === 'string' ? { notes: body.notes.slice(0, 5000) } : {}),
    updatedAt: new Date().toISOString(),
  };
}

export async function saveReview(id: string, review: InterviewReview) {
  await col().doc(id).update({ review });
}

/** Removes the tester's email, words from their email address (usually their name) and phone numbers. */
export function anonymizer(email: string) {
  const local = (email || '').split('@')[0] || '';
  const nameParts = local.split(/[^a-zA-Z]+/).filter((p) => p.length >= 3);
  const nameRe = nameParts.length ? new RegExp(`\\b(${nameParts.join('|')})\\b`, 'gi') : null;
  return (text: string) => {
    let t = (text || '').replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, '[email]').replace(/\+?\d[\d\s-]{8,}\d/g, '[phone]');
    if (nameRe) t = t.replace(nameRe, '[name]');
    return t;
  };
}

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const shortId = (id: string) => id.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10);

/** Builds the eval cases for one reviewed interview (pure, so it can be checked without Firestore). */
export function buildEvalCases(id: string, doc: any): { scoringCase: any | null; interviewerCases: any[]; skipped: string[] } {
  const review: InterviewReview | null = doc.review;
  if (review?.status !== 'done') throw new Error('Mark the review as done before making eval cases');

  const anon = anonymizer(doc.email);
  const clean = (list: any[]) =>
    list
      .filter((m: any) => (m.role === 'interviewer' || m.role === 'candidate') && typeof m.text === 'string' && m.text.trim())
      .map((m: any) => ({ role: m.role as 'interviewer' | 'candidate', text: anon(m.text) }));
  const all: any[] = Array.isArray(doc.messages) ? doc.messages : [];
  const messages = clean(all);
  const sid = shortId(id);
  const skipped: string[] = [];
  const level = ['apm', 'pm', 'spm'].includes(doc.level) ? doc.level : 'pm';
  const date = (doc.createdAt || '').slice(0, 10);

  // 1. Scoring case: does Priya's scorecard land near your score and verdict?
  let scoringCase: any = null;
  if (!(TRACKS as readonly string[]).includes(doc.track)) {
    skipped.push(`No scoring case: the eval set has no ${doc.track} track yet.`);
  } else if (typeof review.humanScore !== 'number' || !review.humanVerdict) {
    skipped.push('No scoring case: add your score and verdict first.');
  } else {
    const substantive = messages.filter((m) => m.role === 'candidate' && words(m.text) > 5).length;
    const h = review.humanScore;
    const vi = VERDICTS.indexOf(review.humanVerdict);
    scoringCase = {
      id: `real-${doc.track}-${sid}`,
      name: `Real interview ${date}: ${doc.scenarioTitle || doc.scenarioId}`,
      track: doc.track,
      category: substantive < 3 ? 'edge' : h >= 70 ? 'strong' : h >= 40 ? 'average' : 'weak',
      edgeType: substantive < 3 ? 'quit-early' : null,
      scenarioId: doc.scenarioId,
      personaId: doc.personaId || 'priya',
      elapsedSeconds: doc.elapsedSeconds || 0,
      scratchpadNotes: anon(doc.scratchpadNotes || ''),
      level,
      messages,
      expectations:
        substantive < 3
          ? { expectedStatus: 'insufficient' }
          : {
              expectedStatus: 'complete',
              overallMin: Math.max(0, h - 15),
              overallMax: Math.min(100, h + 15),
              allowedVerdicts: VERDICTS.filter((_, i) => Math.abs(i - vi) <= 1),
            },
      humanLabels: [{ rater: 'kaushal', overallScore: h, verdict: review.humanVerdict }],
    };
  }

  // 2. Interviewer cases: for each Priya turn you rewrote, given the conversation so far,
  //    does her reply do what your rewrite does?
  const interviewerCases: any[] = [];
  for (const t of (review.turns || []).filter((t) => t.action === 'rewrite' && t.rewrite?.trim())) {
    const original = all[t.index];
    if (t.index === 0 || original?.role !== 'interviewer') {
      skipped.push(`Turn ${t.index + 1}: only Priya's replies after the scripted opener can become cases.`);
      continue;
    }
    const before = clean(all.slice(0, t.index));
    if (!before.some((m) => m.role === 'candidate')) {
      skipped.push(`Turn ${t.index + 1}: no candidate answer before it.`);
      continue;
    }
    const ref = anon(t.rewrite!.trim());
    const questions = (ref.match(/\?/g) || []).length;
    interviewerCases.push({
      id: `real-${sid}-t${t.index}`,
      name: t.note?.trim() || `Real interview ${date}, turn ${t.index + 1}: ${doc.scenarioTitle || doc.scenarioId}`,
      scenarioId: doc.scenarioId,
      personaId: doc.personaId || 'priya',
      level,
      // Turn times aren't saved, so place the turn proportionally through the interview.
      elapsedSeconds: Math.round(((doc.elapsedSeconds || 0) * t.index) / Math.max(1, all.length)),
      messages: before,
      checks: { ...(questions ? { mustAskQuestion: true } : {}), maxQuestions: Math.max(1, questions) },
      referenceReply: ref,
      originalReply: anon(original.text),
    });
  }
  return { scoringCase, interviewerCases, skipped };
}

/** Writes the eval cases for one reviewed interview. Re-exporting replaces that interview's earlier cases. */
export async function exportInterview(id: string): Promise<{ scoringCase: string | null; interviewerCases: number; skipped: string[] }> {
  const doc: any = await getTesterInterview(id);
  if (!doc) throw new Error('Interview not found');
  const { scoringCase, interviewerCases, skipped } = buildEvalCases(id, doc);
  const sid = shortId(id);

  fs.mkdirSync(REAL_DATASET_DIR, { recursive: true });
  for (const f of fs.readdirSync(REAL_DATASET_DIR)) if (f.endsWith(`-${sid}.json`)) fs.unlinkSync(path.join(REAL_DATASET_DIR, f));
  if (scoringCase) fs.writeFileSync(path.join(REAL_DATASET_DIR, `${scoringCase.id}.json`), JSON.stringify(scoringCase, null, 2) + '\n');

  const existing: any[] = fs.existsSync(REAL_INTERVIEWER_FILE) ? JSON.parse(fs.readFileSync(REAL_INTERVIEWER_FILE, 'utf-8')) : [];
  const kept = existing.filter((c) => !String(c.id).startsWith(`real-${sid}-`));
  fs.writeFileSync(REAL_INTERVIEWER_FILE, JSON.stringify([...kept, ...interviewerCases], null, 2) + '\n');

  await col().doc(id).update({
    exportedAt: new Date().toISOString(),
    exportedCases: { scoringCase: scoringCase?.id ?? null, interviewerCases: interviewerCases.map((c) => c.id) },
  });
  return { scoringCase: scoringCase?.id ?? null, interviewerCases: interviewerCases.length, skipped };
}
