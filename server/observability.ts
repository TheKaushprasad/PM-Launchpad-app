import { AsyncLocalStorage } from "node:async_hooks";
import type { Request, Response, NextFunction } from "express";
import { context as otelContext, trace as otelTrace } from "@opentelemetry/api";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { LangfuseSpanProcessor } from "@langfuse/otel";
import { LangfuseClient } from "@langfuse/client";
import { propagateAttributes, startObservation, type LangfuseSpan } from "@langfuse/tracing";

// Observability for the AI mock interview, built on the official Langfuse SDK (JS/TS v6).
// One interview turn (one /api/interview request) is one Langfuse trace; one interview is one session.
// Each provider call is a nested generation with model, usage and cost; guardrails that fire are
// "guardrail" observations; browser timings and outcomes become scores.
// Without LANGFUSE_PUBLIC_KEY / LANGFUSE_SECRET_KEY nothing is sent, and each request still writes one
// "[obs]" summary line to the server log. Tracing never blocks or breaks a request.

export const USD_TO_INR = 88;

// Rough list prices for the voice providers, which Langfuse can't price by itself. LLM cost is left to
// Langfuse's model price table, from the model name and token usage.
const PRICES = {
  // ₹ per 1,000 characters spoken
  ttsInrPer1kChars: { sarvam: 3, deepgram: 0.03 * USD_TO_INR, openai: 0.015 * USD_TO_INR, gemini: 0 } as Record<string, number>,
  // ₹ per hour of candidate audio
  sttInrPerHour: { groq: 0.04 * USD_TO_INR } as Record<string, number>,
};

// Stable, verb-first trace names: Langfuse dashboards and evaluators target these, so keep them fixed.
const TRACE_NAMES: Record<string, string> = {
  chat: "interviewer-turn",
  transcribe: "transcribe-answer",
  tts: "speak-interviewer-line",
  evaluate: "score-interview",
  hint: "give-hint",
};

export type StepKind = "llm" | "stt" | "tts";

export interface StepInfo {
  kind: StepKind;
  /** Stable, verb-first observation name, e.g. "generate-response". */
  name: string;
  provider: string;
  model?: string;
  input?: unknown;
  output?: unknown;
  inputTokens?: number;
  outputTokens?: number;
  chars?: number;
  audioSeconds?: number;
}

interface RequestTrace {
  root?: LangfuseSpan;
  name: string;
  sessionId?: string;
  turn?: number;
  res: Response;
  startedAt: number;
  guardrails: string[];
  metadata: Record<string, unknown>;
  steps: { label: string; ms: number; ok: boolean; costInr?: number; kind: StepKind }[];
}

const storage = new AsyncLocalStorage<RequestTrace>();

const hasKey = (v?: string) => !!v && v.trim() !== "" && v !== "undefined" && v !== "null";
export const isLangfuseConfigured = () => hasKey(process.env.LANGFUSE_PUBLIC_KEY) && hasKey(process.env.LANGFUSE_SECRET_KEY);
const baseUrl = () => (process.env.LANGFUSE_BASE_URL || process.env.LANGFUSE_HOST || "").trim() || undefined;

// Candidate answers go to Langfuse so bad interviews can be reviewed. OBS_LOG_TEXT=false sends timings only.
const logText = () => process.env.OBS_LOG_TEXT !== "false";
const text = <T>(value: T): T | undefined => (logText() ? value : undefined);

let spanProcessor: LangfuseSpanProcessor | null = null;
let scoreClient: LangfuseClient | null = null;

/**
 * Starts OpenTelemetry with the Langfuse span processor. Call once, after the .env file is loaded
 * (importing this module does not read the keys). Does nothing without Langfuse keys.
 */
export function initObservability() {
  if (spanProcessor || !isLangfuseConfigured()) return;
  try {
    spanProcessor = new LangfuseSpanProcessor({
      baseUrl: baseUrl(),
      environment: process.env.VERCEL_ENV || (process.env.NODE_ENV === "production" ? "production" : "development"),
      release: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7),
    });
    new NodeSDK({ spanProcessors: [spanProcessor] }).start();
    scoreClient = new LangfuseClient({ baseUrl: baseUrl() });
  } catch (err: any) {
    spanProcessor = null;
    scoreClient = null;
    console.warn("[obs] Could not start Langfuse tracing:", err?.message || err);
  }
}

function headerValue(req: Request, name: string): string | undefined {
  const v = req.headers[name];
  return Array.isArray(v) ? v[0] : v;
}

/** The browser's interview id, e.g. "iv_k3j2...". Anything else is ignored. */
export function cleanSessionId(raw: unknown): string | undefined {
  return typeof raw === "string" && /^[a-zA-Z0-9_\-]{6,80}$/.test(raw) ? raw : undefined;
}

/** A Langfuse trace id (32 hex characters), as sent back to the browser in X-Langfuse-Trace-Id. */
export function cleanTraceId(raw: unknown): string | undefined {
  return typeof raw === "string" && /^[0-9a-f]{32}$/.test(raw) ? raw : undefined;
}

/**
 * Express middleware: makes each interview request one Langfuse trace (a root span that every provider
 * call nests under), grouped into the interview's session, and sends it once the response is done.
 */
export function traceInterviewRequests(req: Request, res: Response, next: NextFunction) {
  // Browser events are recorded as scores by recordClientEvent instead.
  if (req.path.startsWith("/telemetry")) return next();
  const route = req.path.replace(/^\/+|\/+$/g, "").split("/")[0] || "unknown";
  const turn = Number(headerValue(req, "x-interview-turn"));
  const state: RequestTrace = {
    name: TRACE_NAMES[route] || `interview-${route}`,
    sessionId: cleanSessionId(headerValue(req, "x-interview-session")),
    turn: Number.isInteger(turn) && turn >= 0 && turn < 1000 ? turn : undefined,
    res,
    startedAt: Date.now(),
    guardrails: [],
    metadata: {},
    steps: [],
  };
  res.on("finish", () => finishTrace(state, res.statusCode));

  if (!spanProcessor) {
    storage.run(state, next);
    return;
  }
  try {
    propagateAttributes(
      {
        sessionId: state.sessionId,
        traceName: state.name,
        tags: ["interview"],
        metadata: { route, ...(state.turn !== undefined ? { turn: state.turn } : {}) },
      },
      () => {
        const root = startObservation(state.name, {}, { asType: "span" });
        state.root = root;
        // The browser sends this back with its timings, so they land on the right trace as scores.
        res.setHeader("X-Langfuse-Trace-Id", root.traceId);
        otelContext.with(otelTrace.setSpan(otelContext.active(), root.otelSpan), () => storage.run(state, next));
      }
    );
  } catch (err: any) {
    console.warn("[obs] Could not start a trace:", err?.message || err);
    if (!state.root) storage.run(state, next);
  }
}

/** Sets the trace's input/output (shown in the Langfuse tracing table): what a reviewer needs at a glance. */
export function traceIO(io: { input?: unknown; output?: unknown }) {
  const state = storage.getStore();
  if (!state?.root) return;
  try {
    state.root.update({ input: text(io.input), output: text(io.output) });
  } catch { /* tracing is best effort */ }
}

/** Adds key/value details to the current request's trace (no-op outside an interview request). */
export function traceMeta(details: Record<string, unknown>) {
  const state = storage.getStore();
  if (!state) return;
  Object.assign(state.metadata, details);
  try {
    state.root?.update({ metadata: details });
  } catch { /* tracing is best effort */ }
}

/**
 * Records a guardrail that fired (bad AI output, a fallback used) as a "guardrail" observation in the
 * trace, so guardrail hits can be filtered and counted in Langfuse.
 */
export function noteGuardrail(name: string, details?: Record<string, unknown>) {
  const state = storage.getStore();
  if (!state || state.guardrails.includes(name)) return;
  state.guardrails.push(name);
  if (!state.root) return;
  try {
    withUser(state, () =>
      startObservation(name.replace(/_/g, "-"), { output: { triggered: true, ...details }, level: "WARNING" }, { asType: "guardrail" }).end()
    );
  } catch { /* tracing is best effort */ }
}

function stepCostInr(info: StepInfo): number | undefined {
  if (info.kind === "tts" && info.chars) {
    const rate = PRICES.ttsInrPer1kChars[info.provider];
    return rate === undefined ? undefined : (info.chars / 1000) * rate;
  }
  if (info.kind === "stt" && info.audioSeconds) {
    const rate = PRICES.sttInrPerHour[info.provider];
    return rate === undefined ? undefined : (info.audioSeconds / 3600) * rate;
  }
  return undefined;
}

// The user is known only after the auth check that runs inside the request, so it is attached to each
// observation as it is created (any observation can carry the trace's user).
function withUser<T>(state: RequestTrace, fn: () => T): T {
  const uid = (state.res.locals?.user as { uid?: string } | undefined)?.uid;
  return uid ? propagateAttributes({ userId: uid }, fn) : fn();
}

/**
 * Runs one provider call (LLM, speech-to-text or text-to-speech) as a Langfuse generation nested in
 * the current interview trace, recording model, input/output, usage and cost, or the error if it throws.
 * `details` reads token counts and output from the result. Returns the call's own result unchanged.
 */
export async function traceStep<T>(info: StepInfo, call: () => Promise<T>, details?: (result: T) => Partial<StepInfo>): Promise<T> {
  const state = storage.getStore();
  if (!state) return call();
  const startedAt = Date.now();
  let generation: ReturnType<typeof startGeneration> | undefined;
  try {
    generation = withUser(state, () => startGeneration(info));
  } catch { /* tracing is best effort */ }

  const finish = (ok: boolean, extra: Partial<StepInfo>, error?: string) => {
    const merged = { ...info, ...extra };
    const costInr = ok ? stepCostInr(merged) : 0;
    state.steps.push({ label: `${merged.provider}${merged.model ? `:${merged.model}` : ""}`, ms: Date.now() - startedAt, ok, costInr, kind: info.kind });
    if (!generation) return;
    try {
      const usage: Record<string, number> = {};
      if (merged.inputTokens !== undefined) usage.input = merged.inputTokens;
      if (merged.outputTokens !== undefined) usage.output = merged.outputTokens;
      if (merged.kind === "tts" && merged.chars) usage.characters = merged.chars;
      if (merged.kind === "stt" && merged.audioSeconds) usage.seconds = merged.audioSeconds;
      generation.update({
        output: ok ? text(merged.output) : undefined,
        usageDetails: Object.keys(usage).length ? usage : undefined,
        costDetails: typeof costInr === "number" && merged.kind !== "llm" ? { total: costInr / USD_TO_INR } : undefined,
        level: ok ? "DEFAULT" : "ERROR",
        statusMessage: error,
      }).end();
    } catch { /* tracing is best effort */ }
  };

  try {
    const result = await call();
    let extra: Partial<StepInfo> = {};
    try { extra = details ? details(result) : {}; } catch { /* details are best effort */ }
    finish(true, extra);
    return result;
  } catch (err: any) {
    finish(false, {}, String(err?.message || err).slice(0, 300));
    throw err;
  }
}

function startGeneration(info: StepInfo) {
  return startObservation(
    info.name,
    { model: info.model, input: text(info.input), metadata: { provider: info.provider } },
    { asType: "generation" }
  );
}

/** Token counts from a Gemini response (usageMetadata), for traceStep's `details`. */
export function geminiUsage(response: any): Partial<StepInfo> {
  const u = response?.usageMetadata;
  if (!u) return {};
  return {
    inputTokens: u.promptTokenCount,
    outputTokens: (u.candidatesTokenCount || 0) + (u.thoughtsTokenCount || 0),
  };
}

/** Token counts from an OpenAI chat completion, for traceStep's `details`. */
export function openAiUsage(completion: any): Partial<StepInfo> {
  const u = completion?.usage;
  return u ? { inputTokens: u.prompt_tokens, outputTokens: u.completion_tokens } : {};
}

function finishTrace(state: RequestTrace, status: number) {
  const sum = (kind: StepKind) => state.steps.filter((s) => s.kind === kind).reduce((ms, s) => ms + s.ms, 0);
  const costs = state.steps.map((s) => s.costInr).filter((c): c is number => typeof c === "number");
  console.log("[obs]", JSON.stringify({
    trace: state.root?.traceId,
    name: state.name,
    session: state.sessionId,
    turn: state.turn,
    status,
    totalMs: Date.now() - state.startedAt,
    llmMs: sum("llm"),
    sttMs: sum("stt"),
    ttsMs: sum("tts"),
    // The provider that actually answered, and every one that failed before it.
    providers: state.steps.map((s) => `${s.label}${s.ok ? "" : "(failed)"}`),
    voiceCostInr: costs.length ? Number(costs.reduce((a, b) => a + b, 0).toFixed(4)) : undefined,
    guardrails: state.guardrails.length ? state.guardrails : undefined,
    ...state.metadata,
  }));
  if (!state.root) return;
  try {
    const uid = (state.res.locals?.user as { uid?: string } | undefined)?.uid;
    if (uid) state.root.otelSpan.setAttribute("user.id", uid);
    state.root.update({
      metadata: { status },
      level: status >= 500 ? "ERROR" : status >= 400 ? "WARNING" : "DEFAULT",
      statusMessage: status >= 400 ? `HTTP ${status}` : undefined,
    }).end();
  } catch { /* tracing is best effort */ }
  flushAfterResponse();
}

/**
 * Records a browser-side interview event as Langfuse scores: per-turn timings go on that turn's trace
 * (the browser echoes its X-Langfuse-Trace-Id), and interview outcomes go on the session.
 */
export function recordClientEvent(event: {
  name: string;
  sessionId?: string;
  traceId?: string;
  turn?: number;
  metrics: Record<string, number>;
  metadata: Record<string, unknown>;
}) {
  console.log("[obs]", JSON.stringify({ name: `client.${event.name}`, session: event.sessionId, trace: event.traceId, turn: event.turn, ...event.metrics, ...event.metadata }));
  if (!scoreClient) return;
  const target = event.traceId ? { traceId: event.traceId } : event.sessionId ? { sessionId: event.sessionId } : null;
  if (!target) return;
  const comment = Object.entries(event.metadata).map(([k, v]) => `${k}: ${v}`).join(", ").slice(0, 500) || undefined;
  try {
    for (const [name, value] of Object.entries(event.metrics)) {
      scoreClient.score.create({ ...target, name, value, dataType: "NUMERIC", comment });
    }
    keepAliveUntil(scoreClient.flush());
  } catch (err: any) {
    console.warn("[obs] Could not send scores:", err?.message || err);
  }
}

// On Vercel the function can be frozen as soon as the response is sent. waitUntil (the same hook the
// @vercel/functions package uses) keeps it alive until the spans are exported. Locally it does nothing,
// and the span processor sends in the background on its own.
function flushAfterResponse() {
  if (!spanProcessor) return;
  keepAliveUntil(spanProcessor.forceFlush());
}

function keepAliveUntil(promise: Promise<unknown>) {
  const safe = promise.catch((err) => console.warn("[obs] Langfuse flush failed:", err?.message || err));
  try {
    const ctx = (globalThis as any)[Symbol.for("@vercel/request-context")]?.get?.();
    ctx?.waitUntil?.(safe);
  } catch {
    /* not on Vercel */
  }
}
