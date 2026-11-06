import { createHmac, timingSafeEqual } from 'node:crypto';
import { configuredOffers } from './catalog';

// Thin Dodo Payments client: plain fetch against the REST API plus Standard Webhooks signature
// checks, so the app needs no extra packages. Docs: https://docs.dodopayments.com
//
// Test mode is the default. Live mode only runs when DODO_PAYMENTS_ENVIRONMENT=live_mode is set,
// and a test key only works against test mode (and a live key only against live mode).

export type DodoMode = 'test_mode' | 'live_mode';

export const dodoMode = (): DodoMode => (process.env.DODO_PAYMENTS_ENVIRONMENT?.trim() === 'live_mode' ? 'live_mode' : 'test_mode');
const baseUrl = () => (dodoMode() === 'live_mode' ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com');
const apiKey = () => process.env.DODO_PAYMENTS_API_KEY?.trim() || '';
const webhookKey = () => process.env.DODO_PAYMENTS_WEBHOOK_KEY?.trim() || '';
export const isDodoKeyConfigured = () => Boolean(apiKey());
/** An API key and at least one product id (see catalog.ts). */
export const isDodoConfigured = () => Boolean(apiKey() && configuredOffers().length);
export const isDodoWebhookConfigured = () => Boolean(webhookKey());

export class DodoError extends Error {
  constructor(message: string, public status = 502) {
    super(message);
  }
}

async function dodoFetch<T>(method: 'GET' | 'POST', path: string, body?: unknown): Promise<T> {
  if (!apiKey()) throw new DodoError('DODO_PAYMENTS_API_KEY is not set.', 503);
  const res = await fetch(`${baseUrl()}${path}`, {
    method,
    headers: { Authorization: `Bearer ${apiKey()}`, 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });
  const text = await res.text();
  let data: any = {};
  try { data = text ? JSON.parse(text) : {}; } catch { /* non-JSON error body */ }
  if (!res.ok) {
    // Dodo returns { code, message }. Log it for the owner; the browser gets a plain message.
    console.error(`[Dodo] ${method} ${path} failed (${res.status}):`, data?.code || '', data?.message || text.slice(0, 300));
    throw new DodoError(res.status === 401 ? 'The Dodo API key was refused. Check it is a test mode key and DODO_PAYMENTS_ENVIRONMENT matches.' : 'The payment provider could not start checkout. Please try again.', res.status === 401 ? 503 : 502);
  }
  return data as T;
}

export interface CheckoutSessionResponse {
  session_id: string;
  checkout_url: string | null;
}

export function createCheckoutSession(input: {
  productId: string;
  email: string;
  name?: string;
  returnUrl: string;
  cancelUrl: string;
  metadata: Record<string, string>;
}) {
  return dodoFetch<CheckoutSessionResponse>('POST', '/checkouts', {
    product_cart: [{ product_id: input.productId, quantity: 1 }],
    customer: { email: input.email, ...(input.name ? { name: input.name } : {}) },
    return_url: input.returnUrl,
    cancel_url: input.cancelUrl,
    metadata: input.metadata,
    feature_flags: { redirect_immediately: true },
  });
}

export interface DodoProduct {
  product_id: string;
  name?: string | null;
  description?: string | null;
  price: { type: string; price?: number; fixed_price?: number; currency: string };
}

const productCache = new Map<string, { at: number; product: DodoProduct }>();

/** A product as set up in the Dodo dashboard (name and price), cached for 10 minutes. */
export async function getProduct(id: string): Promise<DodoProduct> {
  const hit = productCache.get(id);
  if (hit && Date.now() - hit.at < 10 * 60 * 1000) return hit.product;
  const product = await dodoFetch<DodoProduct>('GET', `/products/${encodeURIComponent(id)}`);
  productCache.set(id, { at: Date.now(), product });
  return product;
}

// ---------- webhooks (Standard Webhooks spec) ----------

const TOLERANCE_SECONDS = 5 * 60;

/**
 * Checks the webhook-signature header: base64 HMAC-SHA256 of `${id}.${timestamp}.${rawBody}`
 * with the endpoint secret (whsec_ prefix removed, rest base64-decoded). Rejects stale timestamps.
 */
export function verifyWebhook(rawBody: string, headers: { id?: string; timestamp?: string; signature?: string }, now = Date.now()): boolean {
  const secret = webhookKey();
  const { id, timestamp, signature } = headers;
  if (!secret || !id || !timestamp || !signature) return false;
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(now / 1000 - ts) > TOLERANCE_SECONDS) return false;

  const key = Buffer.from(secret.startsWith('whsec_') ? secret.slice(6) : secret, 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${rawBody}`).digest();
  return signature.split(' ').some((part) => {
    const [version, sig] = part.split(',');
    if (version !== 'v1' || !sig) return false;
    const given = Buffer.from(sig, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
