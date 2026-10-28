import fs from 'fs';
import path from 'path';
import type { Express, Request, Response, NextFunction } from 'express';
import { casePassed } from '../eval/casePassed';
import { isFirebaseAdminConfigured } from '../services/firebaseAdmin';
import { getTesterEmails, setTesterEmails } from './interviewTesters';

/**
 * Local eval dashboard (/admin/evals). Reads the report files that `npm run eval` and
 * `npm run eval:interviewer` save in eval/results/ (git-ignored) and returns a compact
 * summary of every run. It only reads files: it never calls a model, so opening the
 * dashboard costs nothing. Registered only outside production, so the live site has no
 * such route and the reports never leave the laptop.
 */

const RESULTS_DIR = path.join(process.cwd(), 'eval', 'results');
const DATASET_DIR = path.join(process.cwd(), 'eval', 'dataset');

export interface DashboardCaseRow {
  caseId: string;
  track: string;
  category: string;
  edgeType?: string | null;
  status: string;
  score?: number;
  verdict?: string;
  model?: string;
  passed: boolean;
  problems: string[];
}

export interface ScoringRunSummary {
  kind: 'scoring';
  file: string;
  startedAt: string;
  promptVersion: string;
  models: string[];
  tracks: string[];
  label: string;
  cases: number;
  passed: number;
  errors: number;
  allPassed: boolean;
  thresholds: Array<{ id: string; name: string; target: string; actual: string; passed: boolean; active: boolean }>;
  consistency?: { runsPerCase: number; passedCases: number; totalCases: number; maxStdDev: number; verdictFlips: number };
  rows: DashboardCaseRow[];
}

export interface InterviewerRunSummary {
  kind: 'interviewer';
  file: string;
  startedAt: string;
  model: string;
  cases: number;
  passed: number;
  leakProblems: string[];
  rows: Array<{ caseId: string; name: string; status: string; reply?: string; failures: string[]; error?: string }>;
}

/** run-2026-10-20T15-41-02-123Z.json -> 2026-10-20T15:41:02.123Z (old files have no startedAt). */
function timeFromFileName(file: string): string {
  const m = file.match(/(\d{4}-\d{2}-\d{2})T(\d{2})-(\d{2})-(\d{2})-(\d{3})Z/);
  return m ? `${m[1]}T${m[2]}:${m[3]}:${m[4]}.${m[5]}Z` : new Date(0).toISOString();
}

/** caseId -> track, read from the dataset so runs saved before results carried a track still group by track. */
function loadCaseTracks(): Record<string, string> {
  const tracks: Record<string, string> = {};
  try {
    for (const f of fs.readdirSync(DATASET_DIR)) {
      if (!f.endsWith('.json')) continue;
      try {
        const c = JSON.parse(fs.readFileSync(path.join(DATASET_DIR, f), 'utf-8'));
        if (c?.id && c?.track) tracks[c.id] = c.track;
      } catch {
        // A broken case file is reported by `npm run eval -- --validate`, not here.
      }
    }
  } catch {
    // No dataset folder: tracks fall back to "unknown".
  }
  return tracks;
}

function summarizeScoring(file: string, report: any, caseTracks: Record<string, string>): ScoringRunSummary {
  const outputs: Record<string, any> = report.outputs || {};
  const versions = new Set<string>();
  for (const o of Object.values(outputs)) if (o?.promptVersion) versions.add(o.promptVersion);
  const promptVersion = report.promptVersion || [...versions].join(', ') || 'unknown';

  const rows: DashboardCaseRow[] = (report.results || []).map((r: any) => {
    const problems: string[] = [];
    if (r.error) problems.push(r.error);
    for (const f of r.expectation?.failures || []) problems.push(`${f.field}: expected ${f.expected}, got ${f.actual}`);
    for (const cr of r.judge?.criteriaResults || []) if (!cr.pass) problems.push(`judge ${cr.type}: ${cr.criterion}`);
    if (r.judgeError) problems.push(`judge error: ${r.judgeError}`);
    if (r.judgeRequired && !r.judge && !r.judgeError) problems.push('judge did not run');
    return {
      caseId: r.caseId,
      track: r.track || caseTracks[r.caseId] || 'unknown',
      category: r.category,
      edgeType: r.edgeType,
      status: r.status,
      score: typeof r.overallScore === 'number' ? r.overallScore : undefined,
      verdict: r.verdict,
      model: r.modelId,
      passed: casePassed(r),
      problems,
    };
  });

  const flags = report.flags || {};
  const tracks = [...new Set(rows.map((r) => r.track))].sort();
  const label = flags.caseIds?.length
    ? `cases: ${flags.caseIds.join(', ')}`
    : flags.tier === 'smoke'
      ? 'smoke'
      : tracks.length === 1 ? tracks[0] : `${tracks.length} tracks`;

  const cr = report.consistencyReport;
  return {
    kind: 'scoring',
    file,
    startedAt: report.startedAt || timeFromFileName(file),
    promptVersion,
    models: [...new Set(rows.map((r) => r.model).filter(Boolean) as string[])],
    tracks,
    label: flags.consistency > 1 ? `${label} · consistency x${flags.consistency}` : label,
    cases: rows.length,
    passed: rows.filter((r) => r.passed).length,
    errors: rows.filter((r) => r.status === 'error').length,
    allPassed: !!report.thresholds?.allPassed,
    thresholds: report.thresholds?.thresholds || [],
    consistency: cr
      ? {
          runsPerCase: cr.runsPerCase,
          passedCases: cr.passedCases,
          totalCases: cr.totalCases,
          maxStdDev: Math.max(0, ...(cr.caseResults || []).map((c: any) => c.stdDevOverallScore || 0)),
          verdictFlips: (cr.caseResults || []).reduce((n: number, c: any) => n + (c.verdictFlips || 0), 0),
        }
      : undefined,
    rows,
  };
}

function summarizeInterviewer(file: string, report: any): InterviewerRunSummary {
  const rows = report.results || [];
  return {
    kind: 'interviewer',
    file,
    startedAt: report.startedAt || timeFromFileName(file),
    model: report.model || 'unknown',
    cases: rows.length,
    passed: rows.filter((r: any) => r.status === 'pass').length,
    leakProblems: report.leakProblems || [],
    rows,
  };
}

export function loadEvalRuns(): { resultsDir: string; runs: Array<ScoringRunSummary | InterviewerRunSummary>; unreadable: string[] } {
  const runs: Array<ScoringRunSummary | InterviewerRunSummary> = [];
  const unreadable: string[] = [];
  if (!fs.existsSync(RESULTS_DIR)) return { resultsDir: RESULTS_DIR, runs, unreadable };
  const caseTracks = loadCaseTracks();
  for (const file of fs.readdirSync(RESULTS_DIR)) {
    if (!file.endsWith('.json')) continue;
    try {
      const report = JSON.parse(fs.readFileSync(path.join(RESULTS_DIR, file), 'utf-8'));
      if (report.kind === 'interviewer') runs.push(summarizeInterviewer(file, report));
      else if (Array.isArray(report.results)) runs.push(summarizeScoring(file, report, caseTracks));
    } catch {
      unreadable.push(file);
    }
  }
  runs.sort((a, b) => b.startedAt.localeCompare(a.startedAt));
  return { resultsDir: RESULTS_DIR, runs, unreadable };
}

/** The dev server listens on every network interface; only the laptop itself may use the dashboard. */
function localOnly(req: Request, res: Response, next: NextFunction) {
  const ip = req.socket.remoteAddress || '';
  if (['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(ip)) return next();
  res.status(403).json({ error: 'The eval dashboard only opens on this computer (localhost).' });
}

const NEEDS_FIREBASE =
  'Firebase Admin is not set up on this computer. Add FIREBASE_SERVICE_ACCOUNT_KEY to services/.env (see eval/README.md) and restart npm run dev.';

export function registerEvalDashboardRoutes(app: Express) {
  if (process.env.NODE_ENV === 'production') return;

  app.get('/api/admin/evals', localOnly, (_req, res) => {
    try {
      res.json(loadEvalRuns());
    } catch (e: any) {
      res.status(500).json({ error: e?.message || 'Could not read eval/results' });
    }
  });

  // Interview testers: who can use the AI interview on the live site before launch.
  app.get('/api/admin/testers', localOnly, async (_req, res) => {
    if (!isFirebaseAdminConfigured()) return res.status(503).json({ error: NEEDS_FIREBASE });
    try {
      res.json({ emails: [...(await getTesterEmails(true))].sort() });
    } catch (e: any) {
      res.status(500).json({ error: e?.message || 'Could not read the tester list' });
    }
  });

  app.put('/api/admin/testers', localOnly, async (req, res) => {
    if (!isFirebaseAdminConfigured()) return res.status(503).json({ error: NEEDS_FIREBASE });
    const emails = Array.isArray(req.body?.emails) ? req.body.emails.filter((e: unknown) => typeof e === 'string') : null;
    if (!emails) return res.status(400).json({ error: 'Send { emails: string[] }' });
    try {
      res.json({ emails: await setTesterEmails(emails) });
    } catch (e: any) {
      res.status(500).json({ error: e?.message || 'Could not save the tester list' });
    }
  });
}
