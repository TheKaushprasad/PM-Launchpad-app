import express from "express";
import { DEFAULT_COST_LIMIT_USD, FEEDBACK_BAD, FEEDBACK_GOOD } from "../../lib/assignmentSolver/types";
import { cleanSessionId, recordClientEvent, traceAssignmentSolverRequests, traceIO } from "../observability";
import { consumeDailyQuota, getVerifiedUser } from "../security";
import { getAppFirestore, isFirebaseAdminConfigured } from "../../services/firebaseAdmin";
import { cleanBrief, cleanFacts, cleanStrategy, runCritic, runParser, runResearcher, runStrategist, runWriter } from "./agents";
import { SolverError } from "./gemini";
import { paymentsEnabled, requirePaidSolverRun, requireToolRun } from "../payments/credits";

// HTTP endpoints for the PM Assignment Solver, one per agent step. Each step is its own request so
// no request runs near Vercel's 60s limit, and the browser can pause for the user after the Parser.
// Live; VITE_ASSIGNMENT_SOLVER_ENABLED=false switches it off.

const enabled = () => process.env.VITE_ASSIGNMENT_SOLVER_ENABLED !== "false";

// Each run spends real money (about $0.20 to $0.50), so a signed-in user can start only this many
// runs a day. Regenerating or re-scoring a section doesn't count as a new run.
const runsPerDay = () => {
  const n = Number(process.env.ASSIGNMENT_SOLVER_RUNS_PER_DAY);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 3;
};

const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export function registerAssignmentSolverRoutes(app: express.Express, requireAiAccess: express.RequestHandler) {
  const gate: express.RequestHandler = (_req, res, next) => (enabled() ? next() : res.status(404).json({ error: "Not found" }));

  // Stops a runaway run (FR-OR-07): the browser sends what the run has spent so far.
  const costCap: express.RequestHandler = (req, res, next) => {
    const spent = Number(req.body?.spentUsd) || 0;
    const limit = Math.min(Number(req.body?.costLimitUsd) || DEFAULT_COST_LIMIT_USD, 2);
    if (spent >= limit) return res.status(402).json({ error: `This run has reached its cost limit of $${limit.toFixed(2)}.` });
    next();
  };

  // When payments are on, a run costs one Solver credit, spent at the Parser step (given back if it
  // fails); the later steps only work for that paid run. Off on the live site: the daily limit applies.
  const paidRun = (agent: string): express.RequestHandler =>
    agent === "parse" ? requireToolRun("solver", { runId: (req) => cleanSessionId(req.header("X-Solver-Run")) || "" }) : requirePaidSolverRun;

  const route = (agent: string, handler: (body: any, res: express.Response) => Promise<Record<string, unknown>>) => {
    app.post([`/api/assignment-solver/${agent}`, `/api/assignment-solver/${agent}/`], requireAiAccess, costCap, paidRun(agent), async (req, res) => {
      try {
        const result = await handler(req.body || {}, res);
        traceIO({ output: result });
        res.json(result);
      } catch (error: any) {
        console.error(`[Assignment Solver ${agent} Error]:`, error?.message || error);
        res.status(error instanceof SolverError ? error.status : 500).json({ error: error?.message || "The agent failed." });
      }
    });
  };

  app.use("/api/assignment-solver", gate, traceAssignmentSolverRequests);

  // Feedback after a draft is ready. Only the ratings and a short run summary are stored, never the
  // assignment or the draft. It needs sign-in but spends no AI credits, so it skips requireAiAccess.
  app.post(["/api/assignment-solver/feedback", "/api/assignment-solver/feedback/"], async (req, res) => {
    const user = await getVerifiedUser(req);
    if (!user) return res.status(401).json({ error: "Please sign in to send feedback." });
    const body = req.body || {};
    const runId = cleanSessionId(body.runId);
    const rating = Math.round(Number(body.rating));
    if (!runId || !(rating >= 1 && rating <= 5)) return res.status(400).json({ error: "Pick a star rating first." });
    const pick = (v: unknown, allowed: readonly string[]) => [...new Set((Array.isArray(v) ? v : []).filter((x) => allowed.includes(x)))];
    const num = (v: unknown) => (Number.isFinite(Number(v)) ? Number(v) : null);
    const feedback = {
      runId,
      uid: user.uid,
      rating,
      good: pick(body.good, FEEDBACK_GOOD),
      bad: pick(body.bad, FEEDBACK_BAD),
      comment: str(body.comment, 1000),
      run: {
        company: str(body.run?.company, 120),
        questions: num(body.run?.questions),
        criticAverage: num(body.run?.criticAverage),
        editRatio: num(body.run?.editRatio),
        costUsd: num(body.run?.costUsd),
        loops: num(body.run?.loops),
      },
      createdAt: new Date().toISOString(),
    };
    try {
      if (isFirebaseAdminConfigured()) {
        await getAppFirestore().collection("assignmentSolverFeedback").doc(`${runId}_${user.uid}`).set(feedback);
      }
      // The rating also lands on the run's Langfuse session, next to its traces.
      recordClientEvent({
        name: "solver-feedback",
        sessionId: runId,
        metrics: { user_rating: rating, ...(feedback.run.editRatio !== null ? { edit_ratio: feedback.run.editRatio } : {}) },
        metadata: { good: feedback.good.join("; "), bad: feedback.bad.join("; "), comment: feedback.comment },
      });
      res.json({ ok: true });
    } catch (error: any) {
      console.error("[Assignment Solver feedback Error]:", error?.message || error);
      res.status(500).json({ error: "Could not save your feedback. Please try again." });
    }
  });

  route("parse", async (body, res) => {
    const assignment = str(body.assignment, 30000);
    if (assignment.length < 40) throw new SolverError("Paste the assignment text (at least a few sentences) or upload a PDF.", 400);
    const uid = (res.locals.user as { uid?: string } | undefined)?.uid;
    if (uid && !paymentsEnabled() && !(await consumeDailyQuota(`solver_runs_${uid}`, runsPerDay()))) {
      throw new SolverError(`You've used today's ${runsPerDay()} free assignment drafts. Please come back tomorrow.`, 429);
    }
    return runParser({ assignment, company: str(body.company, 120), jobDescription: str(body.jobDescription, 8000), deadline: str(body.deadline, 60) });
  });

  route("research", async (body) => {
    const brief = cleanBrief(body.brief);
    if (!brief.items.length) throw new SolverError("The brief has no items.", 400);
    return runResearcher({ brief, jobDescription: str(body.jobDescription, 8000), maxSearches: 10 });
  });

  const itemFrom = (body: any) => {
    const brief = cleanBrief(body.brief);
    const item = brief.items.find((i) => i.id === body.itemId);
    if (!item) throw new SolverError("That item is not in the brief.", 400);
    return { brief, item };
  };

  route("strategy", async (body) => {
    const { brief, item } = itemFrom(body);
    return runStrategist({ brief, item, facts: cleanFacts(body.facts) });
  });

  route("write", async (body) => {
    const { brief, item } = itemFrom(body);
    const facts = cleanFacts(body.facts);
    const strategy = body.strategy && typeof body.strategy === "object" ? cleanStrategy(body.strategy, item.id, facts) : null;
    return runWriter({
      brief, item, strategy, facts,
      feedback: str(body.feedback, 3000), note: str(body.note, 500), previous: str(body.previous, 20000),
    });
  });

  route("critique", async (body) => {
    const { item } = itemFrom(body);
    const markdown = str(body.markdown, 20000);
    if (!markdown) throw new SolverError("The section is empty.", 400);
    return runCritic({ item, markdown, facts: cleanFacts(body.facts) });
  });
}
