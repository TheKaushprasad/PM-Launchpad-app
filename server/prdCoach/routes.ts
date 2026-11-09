import express from "express";
import { attemptedSections, MIN_SECTIONS_FOR_REVIEW } from "../../lib/prdCoach/types";
import { tracePrdCoachRequests, traceIO } from "../observability";
import { consumeDailyQuota } from "../security";
import { SolverError } from "../assignmentSolver/gemini";
import { cleanDraft, runExample, runReview } from "./coach";

// HTTP endpoints for the PRD Coach. Local-only for now: on in `npm run dev`, off on the live site
// unless VITE_PRD_COACH_ENABLED=true (lib/featureFlags.ts reads the same variable).

const enabled = () => process.env.NODE_ENV !== "production" || process.env.VITE_PRD_COACH_ENABLED === "true";

const perDay = (envVar: string, fallback: number) => {
  const n = Number(process.env[envVar]);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
};

export function registerPrdCoachRoutes(app: express.Express, requireAiAccess: express.RequestHandler) {
  const gate: express.RequestHandler = (_req, res, next) => (enabled() ? next() : res.status(404).json({ error: "Not found" }));
  app.use("/api/prd-coach", gate, tracePrdCoachRequests);

  const route = (name: string, limit: { bucket: string; envVar: string; fallback: number; noun: string }, handler: (body: any) => Promise<Record<string, unknown>>) => {
    app.post([`/api/prd-coach/${name}`, `/api/prd-coach/${name}/`], requireAiAccess, async (req, res) => {
      try {
        const body = req.body || {};
        const draft = cleanDraft(body.draft);
        if (draft.idea.length < 5) throw new SolverError("Describe the product idea first.", 400);
        if (attemptedSections(draft.sections).length < MIN_SECTIONS_FOR_REVIEW) {
          throw new SolverError(`Write at least ${MIN_SECTIONS_FOR_REVIEW} sections (a few sentences each) first.`, 400);
        }
        const uid = (res.locals.user as { uid?: string } | undefined)?.uid;
        const max = perDay(limit.envVar, limit.fallback);
        if (uid && !(await consumeDailyQuota(`${limit.bucket}_${uid}`, max))) {
          throw new SolverError(`You've used today's ${max} ${limit.noun}. Please come back tomorrow.`, 429);
        }
        const result = await handler({ ...body, draft });
        traceIO({ output: result });
        res.json(result);
      } catch (error: any) {
        console.error(`[PRD Coach ${name} Error]:`, error?.message || error);
        res.status(error instanceof SolverError ? error.status : 500).json({ error: error?.message || "The review failed." });
      }
    });
  };

  // Each review is one Gemini call (well under $0.01).
  route("review", { bucket: "prd_reviews", envVar: "PRD_COACH_REVIEWS_PER_DAY", fallback: 10, noun: "PRD reviews" }, async ({ draft }) => runReview(draft));

  // The example is shown only after a review, so the learner attempts the PRD first.
  route("example", { bucket: "prd_examples", envVar: "PRD_COACH_EXAMPLES_PER_DAY", fallback: 3, noun: "example PRDs" }, async ({ draft, reviewed }) => {
    if (reviewed !== true) throw new SolverError("Get a review of your own PRD first, then compare it with the example.", 400);
    return runExample(draft);
  });
}
