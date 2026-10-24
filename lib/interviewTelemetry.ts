// Interview observability, browser side.
// Every interview gets an id that is sent with each /api/interview request, so the server can group
// one interview's traces together (server/observability.ts). The page also reports what only the
// browser can see: how long the candidate waited for Priya's voice, voice fallbacks, and quits.

import { authJsonHeaders } from './apiClient';

let sessionId = '';
let turn = 0;
// Voice or text interview: sent on every request and event so traces and scores can be split by mode.
let interviewMode = 'voice';
// Langfuse trace of the interviewer's reply this turn, so the turn's timings are scored on it.
let turnTraceId = '';
// Kept from the last call so a quit can still be reported while the page is closing.
let cachedHeaders: Record<string, string> = { 'Content-Type': 'application/json' };

/** Starts a new interview id. Call once per interview, before its first request. */
export function startInterviewTelemetry(mode: 'voice' | 'text' = 'voice') {
  interviewMode = mode;
  const random = Math.random().toString(36).slice(2, 10);
  sessionId = `iv_${Date.now().toString(36)}_${random}`;
  turn = 0;
  turnTraceId = '';
  authJsonHeaders().then((h) => { cachedHeaders = h; }).catch(() => {});
}

/** Moves to the next candidate answer; later requests are tagged with the new turn number. */
export function nextInterviewTurn() {
  turn += 1;
  turnTraceId = '';
}

/** Remembers the trace id the server returned for this turn's interviewer reply. */
export function rememberTurnTrace(res: Response) {
  turnTraceId = res.headers.get('X-Langfuse-Trace-Id') || turnTraceId;
}

export function currentInterviewTurn() {
  return turn;
}

/** Headers that tie a request to this interview and turn. */
export function interviewTraceHeaders(): Record<string, string> {
  return sessionId
    ? { 'X-Interview-Session': sessionId, 'X-Interview-Turn': String(turn), 'X-Interview-Mode': interviewMode }
    : {};
}

type EventName = 'started' | 'turn' | 'voice_fallback' | 'ended' | 'abandoned';

/**
 * Reports one interview event. Never throws and never delays the interview.
 * `metrics` are numbers (Langfuse scores); `metadata` is short labels. Turn timings and voice fallbacks are
 * scored on the turn's trace, finishes and quits on the whole interview.
 * Pass `closing` when the page is going away: it skips refreshing the sign-in token.
 */
export function trackInterviewEvent(
  event: EventName,
  metrics: Record<string, number> = {},
  metadata: Record<string, string | number | boolean> = {},
  closing = false
) {
  if (!sessionId) return;
  const traceId = event === 'turn' || event === 'voice_fallback' ? turnTraceId || undefined : undefined;
  const body = JSON.stringify({ event, sessionId, traceId, turn, metrics, metadata: { mode: interviewMode, ...metadata } });
  const send = (headers: Record<string, string>) =>
    fetch('/api/interview/telemetry', { method: 'POST', headers, body, keepalive: true }).catch(() => {});
  if (closing) {
    send(cachedHeaders);
    return;
  }
  authJsonHeaders()
    .then((headers) => {
      cachedHeaders = headers;
      send(headers);
    })
    .catch(() => {});
}
