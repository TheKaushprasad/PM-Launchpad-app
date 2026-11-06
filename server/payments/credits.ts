import type express from 'express';
import { FieldValue } from 'firebase-admin/firestore';
import { getAppFirestore, isFirebaseAdminConfigured } from '../../services/firebaseAdmin';
import { FREE_RUNS, TOOLS, type ToolKey } from './catalog';
import { dodoMode } from './dodo';

// Paid runs for the Resume Auditor, LinkedIn Optimiser and Assignment Solver.
// Only active when payments are on (npm run dev, or VITE_PAYMENTS_ENABLED=true on a Vercel build);
// on the live site every middleware here just calls next(), so the tools behave exactly as before.
//
// user_entitlements/{uid} (server-only), everything kept apart per Dodo mode (test_mode / live_mode):
//   credits.<mode>.<tool>        paid runs left
//   freeUsed.<mode>.<tool>       when the account used its free run
//   lastRun.<mode>.<tool>        when the last run started (LinkedIn rewrites ride on it)
//   solverRuns.<mode>.<runId>    Assignment Solver runs that were paid for (later steps check it)

const ENTITLEMENTS = 'user_entitlements';
const LINKEDIN_REWRITE_WINDOW_MS = 24 * 60 * 60 * 1000;
const SOLVER_RUN_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const KEEP_SOLVER_RUNS = 20;

export const paymentsEnabled = () => process.env.NODE_ENV !== 'production' || process.env.VITE_PAYMENTS_ENABLED === 'true';

const entRef = (uid: string) => getAppFirestore().collection(ENTITLEMENTS).doc(uid);
const nowIso = () => new Date().toISOString();

export interface ToolCredits { freeLeft: number; credits: number }
export type CreditState = Record<ToolKey, ToolCredits> & { sprints: number };

export function creditStateFrom(data: FirebaseFirestore.DocumentData | undefined): CreditState {
  const mode = dodoMode();
  const state = { sprints: Number(data?.interviewSprints?.[mode]) || 0 } as CreditState;
  for (const tool of TOOLS) {
    state[tool] = {
      freeLeft: FREE_RUNS[tool] > 0 && !data?.freeUsed?.[mode]?.[tool] ? FREE_RUNS[tool] : 0,
      credits: Math.max(0, Number(data?.credits?.[mode]?.[tool]) || 0),
    };
  }
  return state;
}

export async function getCreditState(uid: string): Promise<CreditState> {
  return creditStateFrom((await entRef(uid).get()).data());
}

type Spent = 'free' | 'credit';

/** Takes one run: the free run first, then a paid credit. Null when the account has neither. */
async function takeRun(uid: string, tool: ToolKey, runId?: string): Promise<Spent | null> {
  const mode = dodoMode();
  const ref = entRef(uid);
  return getAppFirestore().runTransaction(async (tx) => {
    const data = (await tx.get(ref)).data();
    const state = creditStateFrom(data)[tool];
    const spent: Spent | null = state.freeLeft > 0 ? 'free' : state.credits > 0 ? 'credit' : null;
    if (!spent) return null;
    const update: Record<string, unknown> = { lastRun: { [mode]: { [tool]: nowIso() } }, updatedAt: nowIso() };
    if (spent === 'free') update.freeUsed = { [mode]: { [tool]: nowIso() } };
    else update.credits = { [mode]: { [tool]: FieldValue.increment(-1) } };
    if (runId) {
      // Keep only the most recent paid Solver runs so the document stays small.
      const runs: Record<string, string> = { ...(data?.solverRuns?.[mode] || {}), [runId]: nowIso() };
      const kept = Object.entries(runs).sort((a, b) => b[1].localeCompare(a[1])).slice(0, KEEP_SOLVER_RUNS);
      tx.set(ref, { solverRuns: { [mode]: FieldValue.delete() } }, { merge: true });
      update.solverRuns = { [mode]: Object.fromEntries(kept) };
    }
    tx.set(ref, update, { merge: true });
    return spent;
  });
}

/** Gives a run back when the tool failed, so nobody pays for an error. */
async function giveBack(uid: string, tool: ToolKey, spent: Spent, runId?: string) {
  const mode = dodoMode();
  const update: Record<string, unknown> = { updatedAt: nowIso() };
  if (spent === 'free') update.freeUsed = { [mode]: { [tool]: FieldValue.delete() } };
  else update.credits = { [mode]: { [tool]: FieldValue.increment(1) } };
  if (runId) update.solverRuns = { [mode]: { [runId]: FieldValue.delete() } };
  await entRef(uid).set(update, { merge: true });
}

const TOOL_NAMES: Record<ToolKey, string> = { resume: 'resume audit', linkedin: 'LinkedIn audit', solver: 'Assignment Solver run' };

function paywall(res: express.Response, tool: ToolKey) {
  const message = FREE_RUNS[tool] > 0
    ? `You've used your free ${TOOL_NAMES[tool]}. Buy more runs to keep going.`
    : `The Assignment Solver is a paid tool. Buy a run to draft your assignment.`;
  return res.status(402).json({ success: false, error: message, paywall: tool });
}

/**
 * Spends one run of `tool` before the handler runs (after requireAiAccess). If the handler answers
 * with an error, success: false or a blocked profile, the run is given back.
 */
export function requireToolRun(tool: ToolKey, opts: { skip?: (req: express.Request) => boolean; runId?: (req: express.Request) => string } = {}): express.RequestHandler {
  return async (req, res, next) => {
    if (!paymentsEnabled() || opts.skip?.(req)) return next();
    const uid = (res.locals.user as { uid?: string } | undefined)?.uid;
    if (!uid) return res.status(401).json({ success: false, error: 'Please sign in to use this tool.', requiresAuth: true });
    if (!isFirebaseAdminConfigured()) return res.status(503).json({ success: false, error: 'Paid runs need FIREBASE_SERVICE_ACCOUNT_KEY on the server.' });
    const runId = opts.runId?.(req) || undefined;
    let spent: Spent | null;
    try {
      spent = await takeRun(uid, tool, runId);
    } catch (err: any) {
      console.error('[Credits] Could not check runs:', err?.message || err);
      return res.status(503).json({ success: false, error: 'Could not check your runs. Please try again.' });
    }
    if (!spent) return paywall(res, tool);

    // Give the run back before the error reaches the browser, so an immediate retry finds it.
    let given = false;
    const refund = () => {
      if (given) return Promise.resolve();
      given = true;
      return giveBack(uid, tool, spent!, runId).catch((err) => console.error('[Credits] Could not give a run back:', err?.message || err));
    };
    const json = res.json.bind(res);
    res.json = ((body: any) => {
      if (res.statusCode >= 400 || body?.success === false || body?.isBlockedOrPrivate) {
        refund().finally(() => json(body));
        return res;
      }
      return json(body);
    }) as typeof res.json;
    res.on('finish', () => { if (res.statusCode >= 400) refund(); });
    next();
  };
}

async function entitlementData(res: express.Response) {
  const uid = (res.locals.user as { uid?: string } | undefined)?.uid;
  if (!uid || !isFirebaseAdminConfigured()) return null;
  return (await entRef(uid).get()).data() || {};
}

/** LinkedIn rewrites come with an audit: allowed for 24 hours after the account's last audit. */
export const requireRecentLinkedInRun: express.RequestHandler = async (_req, res, next) => {
  if (!paymentsEnabled()) return next();
  try {
    const data = await entitlementData(res);
    const last = Date.parse(data?.lastRun?.[dodoMode()]?.linkedin || '');
    if (data && Number.isFinite(last) && Date.now() - last < LINKEDIN_REWRITE_WINDOW_MS) return next();
  } catch (err: any) {
    console.error('[Credits] Could not check the last LinkedIn run:', err?.message || err);
  }
  return res.status(402).json({ success: false, error: 'Rewrites come with a LinkedIn audit. Run an audit first (it uses one run).', paywall: 'linkedin' });
};

/** Later Assignment Solver steps only run for a run whose Parser step was paid for. */
export const requirePaidSolverRun: express.RequestHandler = async (req, res, next) => {
  if (!paymentsEnabled()) return next();
  const runId = String(req.header('X-Solver-Run') || '');
  try {
    const data = await entitlementData(res);
    const started = Date.parse(data?.solverRuns?.[dodoMode()]?.[runId] || '');
    if (runId && Number.isFinite(started) && Date.now() - started < SOLVER_RUN_WINDOW_MS) return next();
  } catch (err: any) {
    console.error('[Credits] Could not check the Solver run:', err?.message || err);
  }
  return res.status(402).json({ success: false, error: 'This run was not paid for. Start a new run from the first step.', paywall: 'solver' });
};
