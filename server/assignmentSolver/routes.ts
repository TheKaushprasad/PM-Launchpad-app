import express from "express";
import { DEFAULT_COST_LIMIT_USD } from "../../lib/assignmentSolver/types";
import { traceAssignmentSolverRequests, traceIO } from "../observability";
import { cleanBrief, cleanFacts, cleanStrategy, runCritic, runParser, runResearcher, runStrategist, runWriter } from "./agents";
import { SolverError } from "./gemini";

// HTTP endpoints for the PM Assignment Solver, one per agent step. Each step is its own request so
// no request runs near Vercel's 60s limit, and the browser can pause for the user after the Parser.
// Local-only for now: on in `npm run dev`, off on the live site unless VITE_ASSIGNMENT_SOLVER_ENABLED=true.

const enabled = () => process.env.NODE_ENV !== "production" || process.env.VITE_ASSIGNMENT_SOLVER_ENABLED === "true";

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

  const route = (agent: string, handler: (body: any) => Promise<Record<string, unknown>>) => {
    app.post([`/api/assignment-solver/${agent}`, `/api/assignment-solver/${agent}/`], requireAiAccess, costCap, async (req, res) => {
      try {
        const result = await handler(req.body || {});
        traceIO({ output: result });
        res.json(result);
      } catch (error: any) {
        console.error(`[Assignment Solver ${agent} Error]:`, error?.message || error);
        res.status(error instanceof SolverError ? error.status : 500).json({ error: error?.message || "The agent failed." });
      }
    });
  };

  app.use("/api/assignment-solver", gate, traceAssignmentSolverRequests);

  route("parse", async (body) => {
    const assignment = str(body.assignment, 30000);
    if (assignment.length < 40) throw new SolverError("Paste the assignment text (at least a few sentences) or upload a PDF.", 400);
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
