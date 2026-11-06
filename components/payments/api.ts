import { authJsonHeaders } from '../../lib/apiClient';

// Browser side of /api/payments. The server starts checkout and records payments from Dodo's
// signed webhook; the browser never decides whether something was paid for.

export interface Offer {
  configured: boolean;
  mode: 'test_mode' | 'live_mode';
  product?: { name: string; description: string; price: number | null; currency: string };
  error?: string;
}

export interface PaymentStatus {
  mode: 'test_mode' | 'live_mode';
  status: string; // waiting | succeeded | failed | cancelled | processing | ...
  amount: number | null;
  currency: string;
  sprints: number;
}

async function call<T>(method: 'GET' | 'POST', path: string, body?: unknown): Promise<T> {
  const res = await fetch(`/api/payments${path}`, { method, headers: await authJsonHeaders(), body: body === undefined ? undefined : JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status}).`);
  return data as T;
}

export const paymentsApi = {
  offer: () => call<Offer>('GET', '/offer'),
  startCheckout: (name?: string) => call<{ checkoutUrl: string }>('POST', '/checkout', { name }),
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
