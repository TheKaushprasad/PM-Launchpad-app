// Interview observability, browser side.
// Every interview gets an id that is sent with each /api/interview request, so the server can group
// one interview's traces together (server/observability.ts). The page also reports what only the
// browser can see: how long the candidate waited for Priya's voice, voice fallbacks, and quits.

import { authJsonHeaders } from './apiClient';

let sessionId = '';
let turn = 0;
// Kept from the last call so a quit can still be reported while the page is closing.
let cachedHeaders: Record<string, string> = { 'Content-Type': 'application/json' };

/** Starts a new interview id. Call once per interview, before its first request. */
export function startInterviewTelemetry() {
  const random = Math.random().toString(36).slice(2, 10);
  sessionId = `iv_${Date.now().toString(36)}_${random}`;
  turn = 0;
  authJsonHeaders().then((h) => { cachedHeaders = h; }).catch(() => {});
}

/** Moves to the next candidate answer; later requests are tagged with the new turn number. */
export function nextInterviewTurn() {
  turn += 1;
}

export function currentInterviewTurn() {
  return turn;
}

/** Headers that tie a request to this interview and turn. */
export function interviewTraceHeaders(): Record<string, string> {
  return sessionId ? { 'X-Interview-Session': sessionId, 'X-Interview-Turn': String(turn) } : {};
}

type EventName = 'started' | 'turn' | 'voice_fallback' | 'ended' | 'abandoned';

/**
 * Reports one interview event. Never throws and never delays the interview.
 * `metrics` are numbers (charted in Langfuse); `metadata` is short labels.
 * Pass `closing` when the page is going away: it skips refreshing the sign-in token.
 */
export function trackInterviewEvent(
  event: EventName,
  metrics: Record<string, number> = {},
  metadata: Record<string, string | number | boolean> = {},
  closing = false
) {
  if (!sessionId) return;
  const body = JSON.stringify({ event, sessionId, turn, metrics, metadata });
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
