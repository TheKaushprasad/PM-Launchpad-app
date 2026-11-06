import express from 'express';
import { FieldValue, type Firestore } from 'firebase-admin/firestore';
import { getAppFirestore, isFirebaseAdminConfigured } from '../../services/firebaseAdmin';
import { consumeDailyQuota, getVerifiedUser, type VerifiedUser } from '../security';
import {
  DodoError, createCheckoutSession, dodoMode, getSprintProduct, isDodoConfigured, isDodoWebhookConfigured, sprintProductId, verifyWebhook,
} from './dodo';

// Payments through Dodo Payments (test mode for now). The browser only ever asks the server to
// start a checkout; access is granted from the signed webhook, never from the return URL.
//   payment_checkouts/{sessionId}  who started which checkout
//   payments/{paymentId}           one row per Dodo payment, updated by webhooks
//   user_entitlements/{uid}        interviewSprints.<mode>: sprints bought (test and live kept apart)
// All three are server-only (the Firestore default-deny rule keeps browsers out).
// Off on the live site: on in `npm run dev`, or set VITE_PAYMENTS_ENABLED=true (Vercel Preview only for now).

export const paymentsEnabled = () => process.env.NODE_ENV !== 'production' || process.env.VITE_PAYMENTS_ENABLED === 'true';
export const PAYMENTS_WEBHOOK_PATH = '/api/payments/webhook';

const CHECKOUTS = 'payment_checkouts';
const PAYMENTS = 'payments';
const ENTITLEMENTS = 'user_entitlements';
const PRODUCT = 'interview_sprint';
const CHECKOUTS_PER_DAY = 20;

const db = (): Firestore => getAppFirestore();
const nowIso = () => new Date().toISOString();

function appUrl(req: express.Request): string {
  const origin = (req.headers.origin as string) || (req.headers.referer ? new URL(req.headers.referer as string).origin : '') || process.env.APP_URL || 'https://www.thenoobpm.com';
  return origin.replace(/\/+$/, '');
}

const sprintsFor = (data: FirebaseFirestore.DocumentData | undefined) => Number(data?.interviewSprints?.[dodoMode()]) || 0;

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

// payment.succeeded grants one sprint, once per payment id (Dodo retries webhooks, so the same
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

  const status = event.type.replace(/^payment\./, '');
  const mode = dodoMode();
  const paymentRef = db().collection(PAYMENTS).doc(p.payment_id);
  const entRef = db().collection(ENTITLEMENTS).doc(uid);

  return db().runTransaction(async (tx) => {
    const existing = (await tx.get(paymentRef)).data();
    const alreadySucceeded = existing?.status === 'succeeded';
    const grant = status === 'succeeded' && !existing?.granted;
    tx.set(paymentRef, {
      uid,
      email: p.customer?.email || existing?.email || '',
      product: String(p.metadata?.product || PRODUCT),
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
      tx.set(entRef, { interviewSprints: { [mode]: FieldValue.increment(1) }, lastPaymentId: p.payment_id, updatedAt: nowIso() }, { merge: true });
    }
    return grant ? 'granted' : `recorded ${status}`;
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

  const gate: express.RequestHandler = (_req, res, next) => (paymentsEnabled() ? next() : res.status(404).json({ error: 'Not found' }));

  // What the pricing page shows: the product name and price as set in the Dodo dashboard.
  app.get('/api/payments/offer', gate, async (_req, res) => {
    if (!isDodoConfigured()) return res.json({ configured: false, mode: dodoMode() });
    try {
      const product = await getSprintProduct();
      const price = product.price?.price ?? product.price?.fixed_price ?? null;
      res.json({ configured: true, mode: dodoMode(), product: { name: product.name || 'AI interview sprint', description: product.description || '', price, currency: product.price?.currency || 'INR' } });
    } catch (err: any) {
      res.status(err instanceof DodoError ? err.status : 500).json({ configured: true, mode: dodoMode(), error: err?.message || 'Could not load the price.' });
    }
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
    if (!isDodoConfigured()) return res.status(503).json({ error: 'Payments are not set up yet (DODO_PAYMENTS_API_KEY and DODO_SPRINT_PRODUCT_ID).' });
    if (!(await consumeDailyQuota(`checkout:${user.uid}`, CHECKOUTS_PER_DAY))) {
      return res.status(429).json({ error: 'Too many checkout attempts today. Please try again tomorrow.' });
    }
    try {
      const base = appUrl(req);
      const name = String(req.body?.name || '').trim().slice(0, 100);
      const session = await createCheckoutSession({
        productId: sprintProductId(),
        email: user.email,
        name: name || undefined,
        returnUrl: `${base}/pricing/thanks`,
        cancelUrl: `${base}/pricing`,
        metadata: { uid: user.uid, product: PRODUCT },
      });
      if (!session.checkout_url) throw new DodoError('Checkout did not return a link. Please try again.');
      await db().collection(CHECKOUTS).doc(session.session_id).set({ uid: user.uid, email: user.email, product: PRODUCT, mode: dodoMode(), createdAt: nowIso() });
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
        sprints: sprintsFor(entSnap.data()),
      });
    } catch (err: any) {
      console.error('[Payments] Status check failed:', err?.message || err);
      res.status(500).json({ error: 'Could not check the payment.' });
    }
  });
}
