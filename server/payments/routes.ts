import express from 'express';
import { FieldValue, type Firestore } from 'firebase-admin/firestore';
import { getAppFirestore, isFirebaseAdminConfigured } from '../../services/firebaseAdmin';
import { consumeDailyQuota, getVerifiedUser, type VerifiedUser } from '../security';
import {
  DodoError, createCheckoutSession, dodoMode, getProduct, isDodoKeyConfigured, isDodoWebhookConfigured, verifyWebhook,
} from './dodo';
import { configuredOffers, findOffer, offerByProductId, offerProductId, type OfferDef } from './catalog';
import { creditStateFrom, paymentsEnabled } from './credits';

// Payments through Dodo Payments (test mode for now). The browser only ever asks the server to
// start a checkout; access is granted from the signed webhook, never from the return URL.
//   payment_checkouts/{sessionId}  who started which checkout
//   payments/{paymentId}           one row per Dodo payment, updated by webhooks
//   user_entitlements/{uid}        interviewSprints.<mode> and credits.<mode>.<tool>: what was bought
//                                  (test and live kept apart; see credits.ts for the tool runs)
// All three are server-only (the Firestore default-deny rule keeps browsers out).
// Off on the live site: on in `npm run dev`, or set VITE_PAYMENTS_ENABLED=true (Vercel Preview only for now).

export { paymentsEnabled };
export const PAYMENTS_WEBHOOK_PATH = '/api/payments/webhook';

const CHECKOUTS = 'payment_checkouts';
const PAYMENTS = 'payments';
const ENTITLEMENTS = 'user_entitlements';
const CHECKOUTS_PER_DAY = 20;

const db = (): Firestore => getAppFirestore();
const nowIso = () => new Date().toISOString();

function appUrl(req: express.Request): string {
  const origin = (req.headers.origin as string) || (req.headers.referer ? new URL(req.headers.referer as string).origin : '') || process.env.APP_URL || 'https://www.thenoobpm.com';
  return origin.replace(/\/+$/, '');
}

// Where to send the buyer after paying: a path on this site only (no open redirects).
const safeNext = (v: unknown) => {
  const s = String(v || '');
  return /^\/[A-Za-z0-9/_?=&.-]*$/.test(s) && !s.startsWith('//') ? s.slice(0, 200) : '';
};

interface PaymentEvent {
  type: string;
  timestamp?: string;
  data: {
    payment_id?: string;
    checkout_session_id?: string | null;
    status?: string | null;
    total_amount?: number;
    currency?: string;
    metadata?: Record<string, unknown>;
    customer?: { email?: string; customer_id?: string };
    error_code?: string | null;
    product_cart?: { product_id: string; quantity: number }[] | null;
  };
}

// payment.succeeded grants what the offer gives (a sprint or tool runs), once per payment id (Dodo retries webhooks, so the same
// event can arrive more than once). A later failed/cancelled event never undoes a success.
async function applyPaymentEvent(event: PaymentEvent): Promise<string> {
  const p = event.data;
  if (!p?.payment_id) return 'no payment id';
  let uid = typeof p.metadata?.uid === 'string' ? p.metadata.uid : '';
  if (!uid && p.checkout_session_id) {
    const checkout = await db().collection(CHECKOUTS).doc(p.checkout_session_id).get();
    uid = String(checkout.data()?.uid || '');
  }
  if (!uid) return 'payment not started from the app';

  // The offer comes from our own checkout record (or the metadata we set), else from the product id.
  const offer: OfferDef | undefined = findOffer(p.metadata?.product) || offerByProductId(p.product_cart?.[0]?.product_id);
  const status = event.type.replace(/^payment\./, '');
  const mode = dodoMode();
  const paymentRef = db().collection(PAYMENTS).doc(p.payment_id);
  const entRef = db().collection(ENTITLEMENTS).doc(uid);

  return db().runTransaction(async (tx) => {
    const existing = (await tx.get(paymentRef)).data();
    const alreadySucceeded = existing?.status === 'succeeded';
    const grant = status === 'succeeded' && !existing?.granted && Boolean(offer);
    tx.set(paymentRef, {
      uid,
      email: p.customer?.email || existing?.email || '',
      product: offer?.key || String(p.metadata?.product || ''),
      productId: p.product_cart?.[0]?.product_id || existing?.productId || '',
      checkoutSessionId: p.checkout_session_id || existing?.checkoutSessionId || null,
      status: alreadySucceeded ? 'succeeded' : status,
      amount: p.total_amount ?? existing?.amount ?? null,
      currency: p.currency || existing?.currency || '',
      errorCode: p.error_code || null,
      mode,
      granted: Boolean(existing?.granted) || grant,
      createdAt: existing?.createdAt || nowIso(),
      updatedAt: nowIso(),
    }, { merge: true });
    if (grant) {
      const update: Record<string, unknown> = { lastPaymentId: p.payment_id, updatedAt: nowIso() };
      if (offer!.sprints) update.interviewSprints = { [mode]: FieldValue.increment(offer!.sprints) };
      const credits = Object.fromEntries(Object.entries(offer!.credits || {}).map(([tool, n]) => [tool, FieldValue.increment(n!)]));
      if (Object.keys(credits).length) update.credits = { [mode]: credits };
      tx.set(entRef, update, { merge: true });
    }
    if (status === 'succeeded' && !offer) console.error(`[Payments] Payment ${p.payment_id} succeeded but its product is not in catalog.ts; nothing granted.`);
    return grant ? `granted ${offer!.key}` : `recorded ${status}`;
  });
}

export function registerPaymentRoutes(app: express.Express) {
  // Signed by Dodo, so it needs no user token. express.raw (set up in server.ts) keeps the exact
  // bytes Dodo signed; parsing to JSON first would break the signature check.
  app.post(PAYMENTS_WEBHOOK_PATH, async (req, res) => {
    if (!paymentsEnabled()) return res.status(404).json({ error: 'Not found' });
    if (!isDodoWebhookConfigured() || !isFirebaseAdminConfigured()) {
      console.error('[Payments] Webhook arrived but DODO_PAYMENTS_WEBHOOK_KEY or FIREBASE_SERVICE_ACCOUNT_KEY is missing.');
      return res.status(503).json({ error: 'Webhook not configured' });
    }
    const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : typeof req.body === 'string' ? req.body : '';
    if (!raw) {
      console.error('[Payments] Webhook body was not raw; check the express.raw middleware in server.ts.');
      return res.status(400).json({ error: 'Empty body' });
    }
    const ok = verifyWebhook(raw, {
      id: req.header('webhook-id'),
      timestamp: req.header('webhook-timestamp'),
      signature: req.header('webhook-signature'),
    });
    if (!ok) return res.status(401).json({ error: 'Invalid signature' });

    let event: PaymentEvent;
    try { event = JSON.parse(raw); } catch { return res.status(400).json({ error: 'Bad JSON' }); }
    if (!event?.type?.startsWith('payment.')) return res.json({ received: true, ignored: event?.type });
    try {
      const result = await applyPaymentEvent(event);
      console.log(`[Payments] ${event.type} ${event.data?.payment_id}: ${result}`);
      res.json({ received: true, result });
    } catch (err: any) {
      // A non-2xx makes Dodo retry later, which is what we want if Firestore hiccuped.
      console.error('[Payments] Could not record webhook:', err?.message || err);
      res.status(500).json({ error: 'Could not record payment' });
    }
  });

  registerCreditRoutes(app);

  const gate: express.RequestHandler = (_req, res, next) => (paymentsEnabled() ? next() : res.status(404).json({ error: 'Not found' }));

  // What the pricing page shows: each configured product's name and price as set in the Dodo dashboard.
  app.get('/api/payments/offer', gate, async (_req, res) => {
    const offers = configuredOffers();
    if (!isDodoKeyConfigured() || !offers.length) return res.json({ configured: false, mode: dodoMode(), offers: [] });
    const loaded = await Promise.all(offers.map(async (o) => {
      try {
        const product = await getProduct(offerProductId(o));
        const price = product.price?.price ?? product.price?.fixed_price ?? null;
        return { key: o.key, name: product.name || o.fallbackName, description: product.description || '', price, currency: product.price?.currency || 'INR', sprints: o.sprints || 0, credits: o.credits || {} };
      } catch (err: any) {
        return { key: o.key, name: o.fallbackName, description: '', price: null, currency: 'INR', sprints: o.sprints || 0, credits: o.credits || {}, error: err?.message || 'Could not load the price.' };
      }
    }));
    // Kept for the old single-product page shape.
    const sprint = loaded.find((o) => o.key === 'interview_sprint');
    res.json({ configured: true, mode: dodoMode(), offers: loaded, product: sprint && !sprint.error ? sprint : undefined });
  });

  const requireUser: express.RequestHandler = async (req, res, next) => {
    if (!isFirebaseAdminConfigured()) return res.status(503).json({ error: 'Payments need FIREBASE_SERVICE_ACCOUNT_KEY to record purchases.' });
    const user = await getVerifiedUser(req);
    if (!user) return res.status(401).json({ error: 'Please sign in to buy.', requiresAuth: true });
    if (!user.emailVerified) return res.status(403).json({ error: 'Please verify your email address first; your receipt goes there.', requiresAuth: true });
    res.locals.user = user;
    next();
  };

  app.post('/api/payments/checkout', gate, requireUser, async (req, res) => {
    const user = res.locals.user as VerifiedUser;
    const offer = findOffer(req.body?.offer || 'interview_sprint');
    if (!offer) return res.status(400).json({ error: 'Unknown product.' });
    if (!isDodoKeyConfigured() || !offerProductId(offer)) return res.status(503).json({ error: `Payments are not set up yet (DODO_PAYMENTS_API_KEY and ${offer.envVar}).` });
    if (!(await consumeDailyQuota(`checkout:${user.uid}`, CHECKOUTS_PER_DAY))) {
      return res.status(429).json({ error: 'Too many checkout attempts today. Please try again tomorrow.' });
    }
    try {
      const base = appUrl(req);
      const name = String(req.body?.name || '').trim().slice(0, 100);
      const next = safeNext(req.body?.next);
      const session = await createCheckoutSession({
        productId: offerProductId(offer),
        email: user.email,
        name: name || undefined,
        returnUrl: `${base}/pricing/thanks`,
        cancelUrl: `${base}${next || '/pricing'}`,
        metadata: { uid: user.uid, product: offer.key },
      });
      if (!session.checkout_url) throw new DodoError('Checkout did not return a link. Please try again.');
      await db().collection(CHECKOUTS).doc(session.session_id).set({ uid: user.uid, email: user.email, product: offer.key, mode: dodoMode(), createdAt: nowIso() });
      res.json({ checkoutUrl: session.checkout_url });
    } catch (err: any) {
      if (!(err instanceof DodoError)) console.error('[Payments] Checkout failed:', err?.message || err);
      res.status(err instanceof DodoError ? err.status : 500).json({ error: err instanceof DodoError ? err.message : 'Could not start checkout. Please try again.' });
    }
  });

  // The thanks page polls this until the webhook has recorded the payment.
  app.get('/api/payments/status', gate, requireUser, async (req, res) => {
    const user = res.locals.user as VerifiedUser;
    const paymentId = String(req.query.payment_id || '').trim().slice(0, 100);
    try {
      const [paymentSnap, entSnap] = await Promise.all([
        paymentId ? db().collection(PAYMENTS).doc(paymentId).get() : Promise.resolve(null),
        db().collection(ENTITLEMENTS).doc(user.uid).get(),
      ]);
      const payment = paymentSnap?.exists && paymentSnap.data()?.uid === user.uid ? paymentSnap.data() : null;
      res.json({
        mode: dodoMode(),
        status: payment?.status || 'waiting',
        amount: payment?.amount ?? null,
        currency: payment?.currency || '',
        product: payment?.product || '',
        ...creditStateFrom(entSnap.data()),
      });
    } catch (err: any) {
      console.error('[Payments] Status check failed:', err?.message || err);
      res.status(500).json({ error: 'Could not check the payment.' });
    }
  });
}

// Runs left per tool for the signed-in user (free run + paid credits), so tools can show
// "1 free run left" and the paywall card. Answers { enabled: false } on the live site.
function registerCreditRoutes(app: express.Express) {
  app.get('/api/payments/credits', async (req, res) => {
    if (!paymentsEnabled()) return res.json({ enabled: false });
    if (!isFirebaseAdminConfigured()) return res.json({ enabled: true, error: 'FIREBASE_SERVICE_ACCOUNT_KEY is missing.' });
    const user = await getVerifiedUser(req);
    if (!user) return res.json({ enabled: true, signedIn: false });
    try {
      const snap = await db().collection(ENTITLEMENTS).doc(user.uid).get();
      res.json({ enabled: true, signedIn: true, mode: dodoMode(), ...creditStateFrom(snap.data()) });
    } catch (err: any) {
      console.error('[Payments] Credits check failed:', err?.message || err);
      res.status(500).json({ error: 'Could not load your runs.' });
    }
  });
}
