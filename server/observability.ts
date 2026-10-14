import { AsyncLocalStorage } from "node:async_hooks";
import { randomBytes } from "node:crypto";
import type { Request, Response, NextFunction } from "express";

// Observability for the AI mock interview.
// Every /api/interview/* request becomes one trace: which providers ran, how long each took, what it
// cost, and any guardrail that fired. One interview (one browser session) groups its traces together.
// Traces always go to the server log as one "[obs]" JSON line, and to Langfuse when its keys are set
// (LANGFUSE_PUBLIC_KEY, LANGFUSE_SECRET_KEY, optional LANGFUSE_HOST), through Langfuse's OpenTelemetry
// endpoint. Browser timings become Langfuse scores so they can be charted. Tracing never blocks or breaks a request.

export const USD_TO_INR = 88;

// Rough list prices, used only to estimate ₹ per interview. Update them when a provider changes its price.
const PRICES = {
  // ₹ per 1,000 characters spoken
  ttsInrPer1kChars: { sarvam: 3, deepgram: 0.03 * USD_TO_INR, openai: 0.015 * USD_TO_INR, gemini: 0 } as Record<string, number>,
  // ₹ per hour of candidate audio
  sttInrPerHour: { groq: 0.04 * USD_TO_INR, gemini: 0 } as Record<string, number>,
  // ₹ per 1M tokens (flash-class list price; the free tier costs nothing but has tight daily limits)
  llmInrPer1MTokens: { input: 0.3 * USD_TO_INR, output: 2.5 * USD_TO_INR },
};

export type StepKind = "llm" | "stt" | "tts";

export interface TraceStep {
  id: string;
  kind: StepKind;
  name: string;
  provider: string;
  model?: string;
  startedAt: number;
  endedAt: number;
  ok: boolean;
  error?: string;
  inputTokens?: number;
  outputTokens?: number;
  chars?: number;
  audioSeconds?: number;
  costInr?: number;
  input?: string;
  output?: string;
}

interface Trace {
  id: string;
  name: string;
  sessionId?: string;
  turn?: number;
  startedAt: number;
  steps: TraceStep[];
  guardrails: string[];
  metadata: Record<string, unknown>;
}

const storage = new AsyncLocalStorage<Trace>();

// OpenTelemetry ids: 16 bytes for a trace, 8 for a span, as hex.
const newTraceId = () => randomBytes(16).toString("hex");
const newSpanId = () => randomBytes(8).toString("hex");

const hasKey = (v?: string) => !!v && v.trim() !== "" && v !== "undefined" && v !== "null";
export const isLangfuseConfigured = () => hasKey(process.env.LANGFUSE_PUBLIC_KEY) && hasKey(process.env.LANGFUSE_SECRET_KEY);

// Candidate answers go to Langfuse so bad interviews can be reviewed. OBS_LOG_TEXT=false sends timings only.
const logText = () => process.env.OBS_LOG_TEXT !== "false";
const clip = (s: unknown, max = 4000) => (typeof s === "string" ? s.slice(0, max) : undefined);

function headerValue(req: Request, name: string): string | undefined {
  const v = req.headers[name];
  return Array.isArray(v) ? v[0] : v;
}

/** The browser's interview id, e.g. "iv_k3j2...". Anything else is ignored. */
export function cleanSessionId(raw: unknown): string | undefined {
  return typeof raw === "string" && /^[a-zA-Z0-9_\-]{6,80}$/.test(raw) ? raw : undefined;
}

/** Express middleware: wraps each interview request in a trace and sends it once the response is done. */
export function traceInterviewRequests(req: Request, res: Response, next: NextFunction) {
  // Browser events are recorded by recordClientEvent instead.
  if (req.path.startsWith("/telemetry")) return next();
  const turn = Number(headerValue(req, "x-interview-turn"));
  const trace: Trace = {
    id: newTraceId(),
    name: `interview.${req.path.replace(/^\/+|\/+$/g, "").split("/")[0] || "unknown"}`,
    sessionId: cleanSessionId(headerValue(req, "x-interview-session")),
    turn: Number.isInteger(turn) && turn >= 0 && turn < 1000 ? turn : undefined,
    startedAt: Date.now(),
    steps: [],
    guardrails: [],
    metadata: {},
  };
  res.on("finish", () => {
    const user = res.locals?.user as { uid?: string } | undefined;
    finishTrace(trace, res.statusCode, user?.uid);
  });
  storage.run(trace, next);
}

/** Adds key/value details to the current request's trace (no-op outside an interview request). */
export function traceMeta(details: Record<string, unknown>) {
  const trace = storage.getStore();
  if (trace) Object.assign(trace.metadata, details);
}

/** Notes a guardrail that fired (bad AI output, rejected input, fallback used), so it can be counted. */
export function noteGuardrail(name: string) {
  const trace = storage.getStore();
  if (trace && !trace.guardrails.includes(name)) trace.guardrails.push(name);
}

function estimateCost(step: Omit<TraceStep, "id" | "costInr">): number | undefined {
  if (!step.ok) return 0;
  if (step.kind === "tts" && step.chars) {
    const rate = PRICES.ttsInrPer1kChars[step.provider];
    return rate === undefined ? undefined : (step.chars / 1000) * rate;
  }
  if (step.kind === "stt" && step.audioSeconds) {
    const rate = PRICES.sttInrPerHour[step.provider];
    return rate === undefined ? undefined : (step.audioSeconds / 3600) * rate;
  }
  if (step.kind === "llm" && (step.inputTokens || step.outputTokens)) {
    const p = PRICES.llmInrPer1MTokens;
    return ((step.inputTokens || 0) * p.input + (step.outputTokens || 0) * p.output) / 1_000_000;
  }
  return undefined;
}

type StepInfo = Omit<TraceStep, "id" | "startedAt" | "endedAt" | "ok" | "error" | "costInr">;

/**
 * Times one provider call and records it on the current trace, whether it succeeds or throws.
 * `details` reads token counts etc. from the result. Returns the call's own result unchanged.
 */
export async function traceStep<T>(info: StepInfo, call: () => Promise<T>, details?: (result: T) => Partial<StepInfo>): Promise<T> {
  const trace = storage.getStore();
  if (!trace) return call();
  const startedAt = Date.now();
  const record = (ok: boolean, extra: Partial<StepInfo>, error?: string) => {
    const base = { ...info, ...extra, startedAt, endedAt: Date.now(), ok, error };
    trace.steps.push({ ...base, id: newSpanId(), costInr: estimateCost(base) });
  };
  try {
    const result = await call();
    let extra: Partial<StepInfo> = {};
    try { extra = details ? details(result) : {}; } catch { /* details are best effort */ }
    record(true, extra);
    return result;
  } catch (err: any) {
    record(false, {}, String(err?.message || err).slice(0, 300));
    throw err;
  }
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

function finishTrace(trace: Trace, status: number, userId?: string) {
  const endedAt = Date.now();
  const sum = (kind: StepKind) => trace.steps.filter((s) => s.kind === kind).reduce((ms, s) => ms + (s.endedAt - s.startedAt), 0);
  const costs = trace.steps.map((s) => s.costInr).filter((c): c is number => typeof c === "number");
  const summary: Record<string, unknown> = {
    status,
    totalMs: endedAt - trace.startedAt,
    llmMs: sum("llm"),
    sttMs: sum("stt"),
    ttsMs: sum("tts"),
    // The provider that actually answered, and every one that failed before it.
    providers: trace.steps.map((s) => `${s.provider}${s.model ? `:${s.model}` : ""}${s.ok ? "" : "(failed)"}`),
    costInr: costs.length ? Number(costs.reduce((a, b) => a + b, 0).toFixed(4)) : undefined,
    guardrails: trace.guardrails.length ? trace.guardrails : undefined,
    turn: trace.turn,
    ...trace.metadata,
  };
  console.log("[obs]", JSON.stringify({ trace: trace.id, name: trace.name, session: trace.sessionId, ...summary }));
  if (!isLangfuseConfigured()) return;

  const rootId = newSpanId();
  const traceAttrs = traceAttributes(trace.name, trace.sessionId, userId, [
    "interview",
    ...(status >= 400 ? ["error"] : []),
    ...trace.guardrails.map((g) => `guardrail:${g}`),
  ]);
  const withText = logText();
  const spans = [
    otelSpan({
      traceId: trace.id,
      spanId: rootId,
      name: trace.name,
      start: trace.startedAt,
      end: endedAt,
      ok: status < 400,
      statusMessage: status >= 400 ? `HTTP ${status}` : undefined,
      attributes: { ...traceAttrs, ...metadataAttributes("langfuse.trace.metadata", summary), "langfuse.observation.type": "span", "langfuse.trace.output": JSON.stringify({ status }) },
    }),
    ...trace.steps.map((step) =>
      otelSpan({
        traceId: trace.id,
        spanId: step.id,
        parentSpanId: rootId,
        name: step.name,
        start: step.startedAt,
        end: step.endedAt,
        ok: step.ok,
        statusMessage: step.error,
        attributes: {
          ...traceAttrs,
          "langfuse.observation.type": step.kind === "llm" ? "generation" : "span",
          "langfuse.observation.level": step.ok ? "DEFAULT" : "WARNING",
          "langfuse.observation.status_message": step.error,
          "langfuse.observation.model.name": step.model,
          "langfuse.observation.input": withText ? clip(step.input) : undefined,
          "langfuse.observation.output": withText ? clip(step.output) : undefined,
          "langfuse.observation.usage_details": step.inputTokens || step.outputTokens
            ? JSON.stringify({ input: step.inputTokens || 0, output: step.outputTokens || 0 })
            : undefined,
          "langfuse.observation.cost_details": typeof step.costInr === "number" ? JSON.stringify({ total: step.costInr / USD_TO_INR }) : undefined,
          ...metadataAttributes("langfuse.observation.metadata", { provider: step.provider, kind: step.kind, chars: step.chars, audioSeconds: step.audioSeconds, costInr: step.costInr }),
        },
      })
    ),
  ];
  sendToLangfuse(spans, []);
}

/** Records a browser-side interview event (timings, quits) as its own small trace. */
export function recordClientEvent(event: {
  name: string;
  sessionId?: string;
  userId?: string;
  turn?: number;
  metrics: Record<string, number>;
  metadata: Record<string, unknown>;
}) {
  const traceId = newTraceId();
  const name = `client.${event.name}`;
  console.log("[obs]", JSON.stringify({ trace: traceId, name, session: event.sessionId, turn: event.turn, ...event.metrics, ...event.metadata }));
  if (!isLangfuseConfigured()) return;
  const now = Date.now();
  const span = otelSpan({
    traceId,
    spanId: newSpanId(),
    name,
    start: now,
    end: now,
    ok: true,
    attributes: {
      ...traceAttributes(name, event.sessionId, event.userId, ["interview", "client"]),
      "langfuse.observation.type": "event",
      ...metadataAttributes("langfuse.trace.metadata", { ...event.metadata, ...event.metrics, turn: event.turn }),
    },
  });
  // Numbers become Langfuse scores, so they can be averaged and charted on a dashboard.
  const scores = Object.entries(event.metrics).map(([scoreName, value]) => ({ traceId, sessionId: event.sessionId, name: scoreName, value, dataType: "NUMERIC" }));
  sendToLangfuse([span], scores);
}

// ---- Langfuse delivery (OpenTelemetry JSON) ----

type AttrValue = string | number | boolean | string[] | undefined;

function traceAttributes(name: string, sessionId: string | undefined, userId: string | undefined, tags: string[]): Record<string, AttrValue> {
  return {
    "langfuse.trace.name": name,
    "session.id": sessionId,
    "user.id": userId,
    "langfuse.trace.tags": tags,
    "langfuse.environment": process.env.VERCEL_ENV || (process.env.NODE_ENV === "production" ? "production" : "development"),
  };
}

function metadataAttributes(prefix: string, data: Record<string, unknown>): Record<string, AttrValue> {
  const out: Record<string, AttrValue> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) continue;
    out[`${prefix}.${key}`] = typeof value === "string" ? value : JSON.stringify(value);
  }
  return out;
}

function otelValue(v: Exclude<AttrValue, undefined>): Record<string, unknown> {
  if (Array.isArray(v)) return { arrayValue: { values: v.map((x) => ({ stringValue: x })) } };
  if (typeof v === "boolean") return { boolValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { intValue: String(v) } : { doubleValue: v };
  return { stringValue: v };
}

function otelSpan(span: {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  name: string;
  start: number;
  end: number;
  ok: boolean;
  statusMessage?: string;
  attributes: Record<string, AttrValue>;
}) {
  const nanos = (ms: number) => `${ms}000000`;
  return {
    traceId: span.traceId,
    spanId: span.spanId,
    ...(span.parentSpanId ? { parentSpanId: span.parentSpanId } : {}),
    name: span.name,
    kind: 1,
    startTimeUnixNano: nanos(span.start),
    endTimeUnixNano: nanos(span.end),
    attributes: Object.entries(span.attributes)
      .filter((entry): entry is [string, Exclude<AttrValue, undefined>] => entry[1] !== undefined)
      .map(([key, value]) => ({ key, value: otelValue(value) })),
    status: span.ok ? { code: 1 } : { code: 2, message: span.statusMessage || "error" },
  };
}

const LANGFUSE_TIMEOUT_MS = 3000;

function sendToLangfuse(spans: unknown[], scores: unknown[]) {
  const host = (process.env.LANGFUSE_HOST || process.env.LANGFUSE_BASE_URL || "https://cloud.langfuse.com").trim().replace(/\/+$/, "");
  const auth = Buffer.from(`${process.env.LANGFUSE_PUBLIC_KEY!.trim()}:${process.env.LANGFUSE_SECRET_KEY!.trim()}`).toString("base64");
  const post = (path: string, body: unknown, extraHeaders: Record<string, string> = {}) =>
    fetch(`${host}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}`, ...extraHeaders },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(LANGFUSE_TIMEOUT_MS),
    })
      .then(async (r) => {
        // 207 means some items were rejected; log why so a broken field shows up in the Vercel logs.
        if (!r.ok || r.status === 207) console.warn(`[obs] Langfuse ${path} answered ${r.status}:`, (await r.text().catch(() => "")).slice(0, 300));
      })
      .catch((err) => console.warn(`[obs] Could not reach Langfuse ${path}:`, err?.message || err));

  const sends: Promise<unknown>[] = [];
  if (spans.length) {
    sends.push(post("/api/public/otel/v1/traces", {
      resourceSpans: [{
        resource: { attributes: [{ key: "service.name", value: { stringValue: "thenoobpm" } }] },
        scopeSpans: [{ scope: { name: "thenoobpm-interview", version: "1" }, spans }],
      }],
    }, { "x-langfuse-ingestion-version": "4" }));
  }
  if (scores.length) sends.push(post("/api/public/scores", scores));
  keepAliveUntilSent(Promise.all(sends));
}

// On Vercel the function can be frozen as soon as the response is sent. waitUntil (the same hook the
// @vercel/functions package uses) keeps it alive until the trace is delivered. Locally it does nothing.
function keepAliveUntilSent(promise: Promise<unknown>) {
  try {
    const ctx = (globalThis as any)[Symbol.for("@vercel/request-context")]?.get?.();
    ctx?.waitUntil?.(promise);
  } catch {
    /* not on Vercel */
  }
}
