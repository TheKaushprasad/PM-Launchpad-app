import { authJsonHeaders } from '../apiClient';
import type { StrategyInputs, StrategyRecord, StrategySection } from './types';

// Browser side of /api/product-strategy. The server checks credits, runs Gemini and saves each
// strategy; the browser drives the steps (each step is its own request, under Vercel's 60s limit).

export class StrategyApiError extends Error {
  constructor(message: string, public status: number, public paywall = false) {
    super(message);
  }
}

export const newStrategyId = () => `aps_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

async function call<T>(method: 'GET' | 'POST' | 'PATCH' | 'DELETE', path: string, body?: unknown, strategyId?: string): Promise<T> {
  const headers = await authJsonHeaders();
  if (strategyId) headers['X-Strategy-Id'] = strategyId;
  const res = await fetch(`/api/product-strategy${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new StrategyApiError(data?.error || `Request failed (${res.status}).`, res.status, res.status === 402 && typeof data?.paywall === 'string');
  return data as T;
}

type One = { strategy: StrategyRecord };

/** The section fields the server keeps from an edit. */
export const sectionEdits = (sections: StrategySection[]) =>
  sections.map(({ key, content, hidden, previous, origin }) => ({ key, content, hidden: Boolean(hidden), previous, origin }));

export const strategyApi = {
  generate: (id: string, inputs: StrategyInputs) => call<One & { parts: number }>('POST', '/generate', { id, inputs }, id),
  continue: (id: string) => call<One>('POST', `/${id}/continue`, {}, id),
  score: (id: string) => call<One>('POST', `/${id}/score`, {}, id),
  improve: (id: string) => call<One & { rewritten: string[] }>('POST', `/${id}/improve`, {}, id),
  regenerateSection: (id: string, key: string, instruction: string, sections: StrategySection[]) =>
    call<One>('POST', `/${id}/sections/${encodeURIComponent(key)}/regenerate`, { instruction, sections: sectionEdits(sections) }, id),
  save: (id: string, patch: { title?: string; summary?: string; authorName?: string; authorRole?: string; sections?: StrategySection[] }) =>
    call<{ ok: true; updatedAt: string }>('PATCH', `/${id}`, { ...patch, sections: patch.sections ? sectionEdits(patch.sections) : undefined }, id),
  list: () => call<{ strategies: StrategyRecord[] }>('GET', ''),
  remove: (id: string) => call<{ ok: true }>('DELETE', `/${id}`),
};
