import type { GenerateContentResponse } from "@google/genai";
import { getInterviewGeminiKey } from "../geminiKeys";
import { traceStep, geminiUsage } from "../observability";
import type { StepUsage } from "../../lib/assignmentSolver/types";

// One Gemini call for an Assignment Solver agent, with a fallback model when the first is busy,
// token usage, an estimated cost in USD, and a Langfuse generation on the step's trace.
//
// The solver uses the interview key (paid when GEMINI_INTERVIEW_API_KEY is set), because one run
// makes 10+ calls and the free tier allows about 20 a day.

export const MODELS = {
  strong: "gemini-3.8-flash",
  light: "gemini-3.1-flash-lite",
};

// Rough list prices in USD, used only for the cost shown after each run and the per-run cost cap.
// Langfuse prices the same calls from its own table. Update these if Google changes prices.
const PRICE_PER_MILLION: Record<string, { input: number; output: number }> = {
  [MODELS.strong]: { input: 0.3, output: 2.5 },
  [MODELS.light]: { input: 0.1, output: 0.4 },
};
const PRICE_PER_SEARCH = 0.035;

export function estimateCostUsd(model: string, inputTokens: number, outputTokens: number, searches = 0) {
  const price = PRICE_PER_MILLION[model] || PRICE_PER_MILLION[MODELS.strong];
  return (inputTokens * price.input + outputTokens * price.output) / 1_000_000 + searches * PRICE_PER_SEARCH;
}

export interface SolverCall {
  /** Langfuse observation name, e.g. "parse-assignment". */
  name: string;
  model: string;
  systemInstruction: string;
  prompt: string;
  json?: boolean;
  search?: boolean;
  temperature?: number;
  maxOutputTokens?: number;
}

export class SolverError extends Error {
  constructor(message: string, public status = 500) {
    super(message);
  }
}

const isBusy = (err: any) => /503|UNAVAILABLE|high demand|429|RESOURCE_EXHAUSTED/i.test(err?.message || String(err));

export async function callGemini(call: SolverCall): Promise<{ text: string; response: GenerateContentResponse; usage: StepUsage }> {
  const apiKey = getInterviewGeminiKey();
  if (!apiKey) throw new SolverError("The Gemini API key is not set on the server.", 503);
  const { GoogleGenAI } = await import("@google/genai");
  const ai = new GoogleGenAI({ apiKey });

  const models = call.model === MODELS.light ? [MODELS.light, MODELS.strong] : [call.model, MODELS.light];
  const startedAt = Date.now();
  let lastError: any;
  for (const model of models) {
    const config: any = {
      systemInstruction: call.systemInstruction,
      temperature: call.temperature ?? 0.4,
      maxOutputTokens: call.maxOutputTokens ?? 8192,
    };
    // Google Search grounding can't be combined with JSON mode, so search calls return plain text.
    if (call.json && !call.search) config.responseMimeType = "application/json";
    if (call.search) config.tools = [{ googleSearch: {} }];
    try {
      const response = await traceStep(
        { kind: "llm", name: call.name, provider: "gemini", model, input: { system: call.systemInstruction, prompt: call.prompt } },
        () => ai.models.generateContent({ model, contents: call.prompt, config }),
        (r) => ({ ...geminiUsage(r), output: r?.text })
      );
      const text = response?.text?.trim();
      if (!text) throw new Error("The model returned an empty reply.");
      const { inputTokens = 0, outputTokens = 0 } = geminiUsage(response);
      const searches = response.candidates?.[0]?.groundingMetadata?.webSearchQueries?.length || 0;
      return {
        text,
        response,
        usage: {
          model,
          inputTokens,
          outputTokens,
          searches,
          costUsd: estimateCostUsd(model, inputTokens, outputTokens, searches),
          latencyMs: Date.now() - startedAt,
        },
      };
    } catch (err: any) {
      lastError = err;
      if (!isBusy(err)) break;
      console.log(`[Assignment Solver]: ${model} is busy, trying the next model...`);
    }
  }
  throw new SolverError(isBusy(lastError) ? "Gemini is busy right now. Please try again in a minute." : lastError?.message || "The AI call failed.");
}

/** Parses a JSON reply, tolerating ```json fences and text around the object. */
export function parseJson(text: string): any {
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1));
    throw new SolverError("The AI reply was not valid JSON.");
  }
}
