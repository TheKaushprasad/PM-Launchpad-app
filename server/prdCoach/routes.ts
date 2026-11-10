import express from "express";
import { attemptedSections, MIN_SECTIONS_FOR_REVIEW } from "../../lib/prdCoach/types";
import { tracePrdCoachRequests, traceIO } from "../observability";
import { consumeDailyQuota } from "../security";
import { SolverError } from "../assignmentSolver/gemini";
import { requireRecentRun, requireToolRun } from "../payments/credits";
import { cleanDraft, runExample, runReview } from "./coach";

// HTTP endpoints for the PRD Coach. Live; VITE_PRD_COACH_ENABLED=false switches it off
// (lib/featureFlags.ts reads the same variable).
//
// Free plan: one PRD review per calendar month (FREE_RUNS_PER_MONTH.prd in server/payments/catalog.ts),
// counted like the other tools and given back if the review fails. The example PRD comes with a review:
// it works for 7 days after the account's last review, a few times a day.

const enabled = () => process.env.VITE_PRD_COACH_ENABLED !== "false";
const EXAMPLE_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

const examplesPerDay = () => {
  const n = Number(process.env.PRD_COACH_EXAMPLES_PER_DAY);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 3;
};

// Checks the draft before a run is spent, and passes the cleaned draft on.
const validDraft: express.RequestHandler = (req, res, next) => {
  const draft = cleanDraft(req.body?.draft);
  if (draft.idea.length < 5) return res.status(400).json({ error: "Describe the product idea first." });
  if (attemptedSections(draft.sections).length < MIN_SECTIONS_FOR_REVIEW) {
    return res.status(400).json({ error: `Write at least ${MIN_SECTIONS_FOR_REVIEW} sections (a few sentences each) first.` });
  }
  res.locals.prdDraft = draft;
  next();
};

export function registerPrdCoachRoutes(app: express.Express, requireAiAccess: express.RequestHandler) {
  const gate: express.RequestHandler = (_req, res, next) => (enabled() ? next() : res.status(404).json({ error: "Not found" }));
  app.use("/api/prd-coach", gate, tracePrdCoachRequests);

  const route = (name: string, limits: express.RequestHandler[], handler: (body: any, res: express.Response) => Promise<Record<string, unknown>>) => {
    app.post([`/api/prd-coach/${name}`, `/api/prd-coach/${name}/`], requireAiAccess, validDraft, ...limits, async (req, res) => {
      try {
        const result = await handler({ ...(req.body || {}), draft: res.locals.prdDraft }, res);
        traceIO({ output: result });
        res.json(result);
      } catch (error: any) {
        console.error(`[PRD Coach ${name} Error]:`, error?.message || error);
        res.status(error instanceof SolverError ? error.status : 500).json({ error: error?.message || "The review failed." });
      }
    });
  };

  // One review = one Gemini call (well under $0.01), and one run of the monthly free use.
  route("review", [requireToolRun("prd")], async ({ draft }) => runReview(draft));

  // The example is shown only after a review, so the learner attempts the PRD first.
  route(
    "example",
    [requireRecentRun("prd", EXAMPLE_WINDOW_MS, "The example PRD comes with a review. Get your PRD reviewed first.")],
    async ({ draft, reviewed }, res) => {
      if (reviewed !== true) throw new SolverError("Get a review of your own PRD first, then compare it with the example.", 400);
      const uid = (res.locals.user as { uid?: string } | undefined)?.uid;
      if (uid && !(await consumeDailyQuota(`prd_examples_${uid}`, examplesPerDay()))) {
        throw new SolverError(`You've used today's ${examplesPerDay()} example PRDs. Please come back tomorrow.`, 429);
      }
      return runExample(draft);
    }
  );
}
