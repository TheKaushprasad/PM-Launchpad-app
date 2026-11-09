import express from "express";
import { getAppFirestore, isFirebaseAdminConfigured } from "../../services/firebaseAdmin";
import { consumeDailyQuota, getVerifiedUser } from "../security";
import { traceIO, traceMeta, traceProductStrategyRequests } from "../observability";
import { paymentsEnabled, requireToolRun } from "../payments/credits";
import { styleById } from "../../lib/productStrategy/styles";
import {
  HISTORY_LIMIT, MAX_SECTION_CHARS, MAX_SECTION_REGENERATIONS, PROMPT_VERSION, QUALITY_PASS,
  type StrategyInputs, type StrategyOutput, type StrategyRecord,
} from "../../lib/productStrategy/types";
import { StrategyError, cleanInputs, cleanText, rewriteSections, scoreStrategy, sectionParts, validateInputs, writePart } from "./engine";

// HTTP endpoints for the AI Product Strategy tool. Local only for now: on in `npm run dev`, off on
// the live site unless VITE_AI_PRODUCT_STRATEGY_ENABLED=true is set in Vercel.
//
// Each AI step is its own request so none runs near Vercel's 60s limit: generate (part 1, spends one
// credit), continue (part 2 of a Detailed strategy), score, improve (once, when the score is below 60),
// and regenerate one section (free, 5 per strategy). Strategies are saved server-side in Firestore
// `product_strategies` (Admin SDK only, no client rules needed); each user keeps the last 5.

const COLLECTION = "product_strategies";
const MAX_SCORE_RUNS = 3;
const GENERATIONS_PER_HOUR = 10;

export const productStrategyEnabled = () =>
  process.env.NODE_ENV !== "production" || process.env.VITE_AI_PRODUCT_STRATEGY_ENABLED === "true";

// With payments off (a Vercel preview without VITE_PAYMENTS_ENABLED) there are no credits to spend,
// so a simple daily limit keeps costs in check instead.
const runsPerDay = () => {
  const n = Number(process.env.PRODUCT_STRATEGY_RUNS_PER_DAY);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 3;
};

const db = () => getAppFirestore();
const nowIso = () => new Date().toISOString();
const cleanId = (v: unknown) => (typeof v === "string" && /^aps_[a-z0-9]{6,40}$/.test(v) ? v : "");

type Stored = StrategyRecord & { uid: string };

// Firestore rejects undefined values; a JSON round trip drops them.
const plain = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

async function loadOwned(id: string, uid: string) {
  if (!cleanId(id)) throw new StrategyError("Strategy not found.", 404);
  const ref = db().collection(COLLECTION).doc(id);
  const snap = await ref.get();
  const data = snap.data() as Stored | undefined;
  if (!data || data.uid !== uid) throw new StrategyError("Strategy not found.", 404);
  return { ref, record: data };
}

const publicRecord = ({ uid: _uid, ...rest }: Stored): StrategyRecord => rest;

/** Keeps each user's newest strategies and deletes the rest. Sorted here, so no Firestore index is needed. */
async function pruneHistory(uid: string) {
  const snap = await db().collection(COLLECTION).where("uid", "==", uid).get();
  const old = snap.docs
    .sort((a, b) => String(b.data().createdAt).localeCompare(String(a.data().createdAt)))
    .slice(HISTORY_LIMIT);
  await Promise.all(old.map((d) => d.ref.delete()));
}

export function registerProductStrategyRoutes(app: express.Express, requireAiAccess: express.RequestHandler) {
  const base = "/api/product-strategy";
  const gate: express.RequestHandler = (_req, res, next) => (productStrategyEnabled() ? next() : res.status(404).json({ error: "Not found" }));
  const store: express.RequestHandler = (_req, res, next) =>
    isFirebaseAdminConfigured() ? next() : res.status(503).json({ error: "The strategy tool needs FIREBASE_SERVICE_ACCOUNT_KEY on the server to save strategies." });
  const signedIn: express.RequestHandler = async (req, res, next) => {
    const user = await getVerifiedUser(req);
    if (!user) return res.status(401).json({ error: "Please sign in.", requiresAuth: true });
    res.locals.user = user;
    next();
  };
  const uidOf = (res: express.Response) => (res.locals.user as { uid: string }).uid;

  const handle = (fn: (req: express.Request, res: express.Response) => Promise<unknown>): express.RequestHandler => async (req, res) => {
    try {
      const result = await fn(req, res);
      traceIO({ output: result });
      res.json(result);
    } catch (error: any) {
      if (!(error instanceof StrategyError) || error.status >= 500) console.error("[Product Strategy Error]:", error?.message || error);
      const status = typeof error?.status === "number" ? error.status : 500;
      res.status(status).json({ error: error?.message || "Something went wrong. Try again." });
    }
  };

  app.use(base, gate, store, traceProductStrategyRequests);

  // Checks the form and the hourly limit before any credit is spent.
  const checkGenerate: express.RequestHandler = async (req, res, next) => {
    const inputs = cleanInputs(req.body?.inputs);
    const problem = validateInputs(inputs);
    if (problem) return res.status(400).json({ error: problem });
    const id = cleanId(req.body?.id);
    if (!id) return res.status(400).json({ error: "Missing strategy id." });
    const uid = uidOf(res);
    if (!(await consumeDailyQuota(`aps_gen_${uid}_h${new Date().getUTCHours()}`, GENERATIONS_PER_HOUR))) {
      return res.status(429).json({ error: "That's a lot of strategies in one hour. Please wait a little and try again." });
    }
    res.locals.strategyInputs = inputs;
    res.locals.strategyId = id;
    next();
  };

  // Part 1 of a strategy. Spends one credit (refunded automatically if this request fails).
  app.post(`${base}/generate`, requireAiAccess, checkGenerate, requireToolRun("strategy"), handle(async (_req, res) => {
    const uid = uidOf(res);
    const inputs = res.locals.strategyInputs as StrategyInputs;
    const id = res.locals.strategyId as string;
    if (!paymentsEnabled() && !(await consumeDailyQuota(`aps_runs_${uid}`, runsPerDay()))) {
      throw new StrategyError(`You've used today's ${runsPerDay()} free strategies. Please come back tomorrow.`, 429);
    }
    const ref = db().collection(COLLECTION).doc(id);
    if ((await ref.get()).exists) throw new StrategyError("This strategy already exists. Start a new one.", 409);

    const style = styleById(inputs.styleId)!;
    const parts = sectionParts(inputs, style);
    const part = await writePart(inputs, 0);
    const record: Stored = {
      id,
      uid,
      status: parts.length > 1 ? "partial" : "generated",
      styleId: inputs.styleId,
      inputs,
      output: {
        title: part.title || `Product strategy for ${inputs.productName}`,
        summary: part.summary || "",
        sections: part.sections,
        assumptions: part.assumptions || [],
        metrics: part.metrics || [],
        competitorTable: part.competitorTable || [],
      },
      quality: null,
      improved: false,
      scoreRuns: 0,
      regenCount: 0,
      promptVersion: PROMPT_VERSION,
      authorName: "",
      authorRole: "",
      logs: part.logs,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    await ref.set(plain(record));
    pruneHistory(uid).catch((err) => console.error("[Product Strategy] Could not prune history:", err?.message || err));
    traceMeta({ style: style.id, detail: inputs.detail, tone: inputs.tone, promptVersion: PROMPT_VERSION });
    return { strategy: publicRecord(record), parts: parts.length };
  }));

  // The next part of a Detailed strategy. Free: the credit was spent on part 1.
  app.post(`${base}/:id/continue`, requireAiAccess, handle(async (req, res) => {
    const { ref, record } = await loadOwned(String(req.params.id), uidOf(res));
    if (record.status !== "partial") throw new StrategyError("This strategy is already complete.", 409);
    const style = styleById(record.styleId);
    if (!style) throw new StrategyError("This strategy's style no longer exists.", 400);
    const parts = sectionParts(record.inputs, style);
    const done = new Set(record.output.sections.map((s) => s.key));
    const next = parts.findIndex((keys) => keys.some((k) => !done.has(k)));
    if (next < 0) throw new StrategyError("This strategy is already complete.", 409);
    const part = await writePart(record.inputs, next, record.output.sections);
    const order = style.sections.map((s) => s.key);
    const output: StrategyOutput = {
      ...record.output,
      sections: [...record.output.sections, ...part.sections].sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key)),
      assumptions: part.assumptions ?? record.output.assumptions,
      metrics: part.metrics ?? record.output.metrics,
      competitorTable: part.competitorTable ?? record.output.competitorTable,
    };
    const status = next === parts.length - 1 ? "generated" : "partial";
    const update = { output, status, logs: [...record.logs, ...part.logs], updatedAt: nowIso() };
    await ref.update(plain(update));
    return { strategy: publicRecord({ ...record, ...update } as Stored) };
  }));

  // The quality check (FR-15). Free, at most 3 times per strategy.
  app.post(`${base}/:id/score`, requireAiAccess, handle(async (req, res) => {
    const { ref, record } = await loadOwned(String(req.params.id), uidOf(res));
    if (record.status !== "generated") throw new StrategyError("Finish the strategy first.", 409);
    if ((record.scoreRuns || 0) >= MAX_SCORE_RUNS) throw new StrategyError("This strategy has been scored the most times allowed.", 429);
    const { quality, logs } = await scoreStrategy(record.inputs, record.output);
    const update = { quality, scoreRuns: (record.scoreRuns || 0) + 1, logs: [...record.logs, ...logs], updatedAt: nowIso() };
    await ref.update(plain(update));
    traceMeta({ qualityScore: quality.score, style: record.styleId });
    return { strategy: publicRecord({ ...record, ...update } as Stored) };
  }));

  // One automatic rewrite of the weakest sections when the score is below 60 (FR-15).
  app.post(`${base}/:id/improve`, requireAiAccess, handle(async (req, res) => {
    const { ref, record } = await loadOwned(String(req.params.id), uidOf(res));
    if (!record.quality || record.quality.score >= QUALITY_PASS) throw new StrategyError("This strategy does not need a rewrite.", 409);
    if (record.improved) throw new StrategyError("This strategy was already rewritten once.", 409);
    const weak = record.quality.weakSections.length ? record.quality.weakSections : record.output.sections.slice(-2).map((s) => s.key);
    const guidance = [record.quality.feedback, ...record.quality.tips].filter(Boolean).join("\n");
    const { sections, logs } = await rewriteSections(record.inputs, record.output, weak, guidance, "strategy-improve");
    const output = {
      ...record.output,
      sections: record.output.sections.map((s) => {
        const next = sections.find((n) => n.key === s.key);
        return next ? { ...next, hidden: s.hidden } : s;
      }),
    };
    const update = { output, improved: true, logs: [...record.logs, ...logs], updatedAt: nowIso() };
    await ref.update(plain(update));
    return { strategy: publicRecord({ ...record, ...update } as Stored), rewritten: weak };
  }));

  // Regenerate one section with an optional instruction (FR-21). No credit; 5 per strategy.
  app.post(`${base}/:id/sections/:key/regenerate`, requireAiAccess, handle(async (req, res) => {
    const { ref, record } = await loadOwned(String(req.params.id), uidOf(res));
    if (record.status !== "generated") throw new StrategyError("Finish the strategy first.", 409);
    if ((record.regenCount || 0) >= MAX_SECTION_REGENERATIONS) {
      throw new StrategyError(`You've regenerated ${MAX_SECTION_REGENERATIONS} sections for this strategy, the most allowed. Edit the text yourself, or start a new strategy.`, 429);
    }
    const key = String(req.params.key);
    const current = record.output.sections.find((s) => s.key === key);
    if (!current) throw new StrategyError("That section is not in this strategy.", 400);
    // Base the rewrite on what the user sees now, including their own edits.
    const output = mergeSectionEdits(record.output, req.body?.sections);
    const instruction = cleanText(req.body?.instruction, 300);
    const { sections, logs } = await rewriteSections(record.inputs, output, [key], instruction, "strategy-regenerate-section");
    const fresh = sections[0];
    const before = output.sections.find((s) => s.key === key)!;
    const next = { ...output, sections: output.sections.map((s) => (s.key === key ? { ...fresh, origin: "regenerated" as const, previous: before.content, hidden: s.hidden } : s)) };
    const update = { output: next, regenCount: (record.regenCount || 0) + 1, logs: [...record.logs, ...logs], updatedAt: nowIso() };
    await ref.update(plain(update));
    return { strategy: publicRecord({ ...record, ...update } as Stored) };
  }));

  // Save edits (FR-20, FR-24, FR-26): section text, hide/show, title, summary, author name and role.
  app.patch(`${base}/:id`, signedIn, handle(async (req, res) => {
    const { ref, record } = await loadOwned(String(req.params.id), uidOf(res));
    const b = req.body || {};
    const output = mergeSectionEdits(record.output, b.sections);
    if (typeof b.title === "string" && b.title.trim()) output.title = cleanText(b.title, 140);
    if (typeof b.summary === "string") output.summary = cleanText(b.summary, 800);
    const update = {
      output,
      authorName: typeof b.authorName === "string" ? cleanText(b.authorName, 80) : record.authorName || "",
      authorRole: typeof b.authorRole === "string" ? cleanText(b.authorRole, 80) : record.authorRole || "",
      updatedAt: nowIso(),
    };
    await ref.update(plain(update));
    return { ok: true, updatedAt: update.updatedAt };
  }));

  // History (FR-40): the user's last 5 strategies, newest first.
  app.get(base, signedIn, handle(async (_req, res) => {
    const snap = await db().collection(COLLECTION).where("uid", "==", uidOf(res)).get();
    const strategies = snap.docs
      .map((d) => publicRecord(d.data() as Stored))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, HISTORY_LIMIT);
    return { strategies };
  }));

  app.delete(`${base}/:id`, signedIn, handle(async (req, res) => {
    const { ref } = await loadOwned(String(req.params.id), uidOf(res));
    await ref.delete();
    return { ok: true };
  }));
}

/** Applies the browser's section edits (text, hidden, undo copy) to the stored output. */
function mergeSectionEdits(output: StrategyOutput, raw: unknown): StrategyOutput {
  if (!Array.isArray(raw)) return { ...output };
  const edits = new Map<string, any>();
  for (const e of raw) if (e && typeof e.key === "string") edits.set(e.key, e);
  return {
    ...output,
    sections: output.sections.map((s) => {
      const e = edits.get(s.key);
      if (!e) return s;
      const content = typeof e.content === "string" ? String(e.content).replace(/<[^>]*>/g, " ").trim().slice(0, MAX_SECTION_CHARS) : s.content;
      const next = { ...s, content, hidden: Boolean(e.hidden) };
      if (typeof e.previous === "string") next.previous = e.previous.slice(0, MAX_SECTION_CHARS);
      if (e.origin === "edited" && content !== s.content) next.origin = "edited";
      else if (["ai", "edited", "regenerated"].includes(e.origin)) next.origin = e.origin;
      return next;
    }),
  };
}
