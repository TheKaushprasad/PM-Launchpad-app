import { authJsonHeaders } from '../../lib/apiClient';

// Browser side of /api/payments. The server starts checkout and records payments from Dodo's
// signed webhook; the browser never decides whether something was paid for.

export type ToolKey = 'resume' | 'linkedin' | 'solver';

export const TOOL_LABELS: Record<ToolKey, { one: string; many: string; path: string; name: string }> = {
  resume: { one: 'resume audit', many: 'resume audits', path: '/tools/resume-auditor', name: 'PM Resume Auditor' },
  linkedin: { one: 'LinkedIn audit', many: 'LinkedIn audits', path: '/tools/linkedin-optimiser', name: 'LinkedIn Optimiser' },
  solver: { one: 'Assignment Solver run', many: 'Assignment Solver runs', path: '/tools/assignment-solver', name: 'Assignment Solver' },
};

export interface OfferItem {
  key: string;
  name: string;
  description: string;
  price: number | null;
  currency: string;
  sprints: number;
  credits: Partial<Record<ToolKey, number>>;
  error?: string;
}

export interface Offer {
  configured: boolean;
  mode: 'test_mode' | 'live_mode';
  offers: OfferItem[];
  error?: string;
}

export interface ToolCredits { freeLeft: number; credits: number }

export interface Credits {
  enabled: boolean;
  signedIn?: boolean;
  mode?: 'test_mode' | 'live_mode';
  sprints?: number;
  resume?: ToolCredits;
  linkedin?: ToolCredits;
  solver?: ToolCredits;
  error?: string;
}

export interface PaymentStatus {
  mode: 'test_mode' | 'live_mode';
  status: string; // waiting | succeeded | failed | cancelled | processing | ...
  amount: number | null;
  currency: string;
  product: string;
  sprints: number;
  resume: ToolCredits;
  linkedin: ToolCredits;
  solver: ToolCredits;
}

async function call<T>(method: 'GET' | 'POST', path: string, body?: unknown): Promise<T> {
  const res = await fetch(`/api/payments${path}`, { method, headers: await authJsonHeaders(), body: body === undefined ? undefined : JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status}).`);
  return data as T;
}

export const paymentsApi = {
  offer: () => call<Offer>('GET', '/offer'),
  startCheckout: (offer: string, opts: { name?: string; next?: string } = {}) => call<{ checkoutUrl: string }>('POST', '/checkout', { offer, ...opts }),
  credits: () => call<Credits>('GET', '/credits'),
  status: (paymentId: string) => call<PaymentStatus>('GET', `/status?payment_id=${encodeURIComponent(paymentId)}`),
};

/** Amounts come in the currency's smallest unit (paise for INR). */
export function formatPrice(amount: number | null | undefined, currency: string): string {
  if (amount == null) return '';
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency || 'INR', maximumFractionDigits: amount % 100 === 0 ? 0 : 2 }).format(amount / 100);
  } catch {
    return `${(amount / 100).toFixed(2)} ${currency}`;
  }
}

/** The 402 answer a paid tool sends when the account has no runs left. */
export const isPaywallResponse = (status: number, data: any): data is { error: string; paywall: ToolKey } =>
  status === 402 && typeof data?.paywall === 'string';
