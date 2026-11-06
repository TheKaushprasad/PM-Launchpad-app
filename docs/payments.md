# Payments (Dodo Payments, test mode)

The site sells one product for now, the **AI interview sprint**, through [Dodo Payments](https://docs.dodopayments.com).
Dodo is the Merchant of Record: it runs the checkout page, takes cards and UPI, handles GST/tax and emails the receipt.

Everything is in **test mode**: no real money moves. Payments are **off on the live site**.

## How it works

1. `/pricing` shows the product. Name, description and price come from the product in the Dodo dashboard.
2. **Buy now** (signed in, verified email) calls `POST /api/payments/checkout`. The server creates a Dodo checkout
   session with the user's id in `metadata.uid` and sends the browser to Dodo's hosted checkout.
3. After paying, Dodo sends the buyer to `/pricing/thanks?payment_id=…&status=…`.
4. Dodo also calls `POST /api/payments/webhook`, signed (Standard Webhooks). The server checks the signature and, on
   `payment.succeeded`, adds one sprint to `user_entitlements/{uid}.interviewSprints.test_mode`, once per payment.
5. The thanks page polls `GET /api/payments/status` until the webhook has landed.

Access is granted only from the webhook, never from the return URL (anyone could type `?status=succeeded`).

Firestore collections (server-only, the default-deny rule already keeps browsers out, no rule changes needed):
`payment_checkouts`, `payments`, `user_entitlements`. Test and live sprints are counted separately.

Code: `server/payments/dodo.ts` (REST calls + signature check), `server/payments/routes.ts`,
`components/payments/`. No extra npm packages.

A sprint is only counted for now. Nothing in the AI interview checks or uses it yet; that is the next step once
the sprint's contents (how many interviews, how long) are decided.

## Environment variables

| Variable | What | Where |
| - | - | - |
| `DODO_PAYMENTS_API_KEY` | Test mode API key | services/.env, Vercel (Preview) |
| `DODO_PAYMENTS_WEBHOOK_KEY` | Webhook signing secret (`whsec_…`) | services/.env, Vercel (Preview) |
| `DODO_PAYMENTS_ENVIRONMENT` | `test_mode` (default). Only `live_mode` switches to real money | services/.env, Vercel |
| `DODO_SPRINT_PRODUCT_ID` | `pdt_…` id of the sprint product | services/.env, Vercel (Preview) |
| `VITE_PAYMENTS_ENABLED` | `true` shows `/pricing` on a Vercel build. Not needed locally | Vercel **Preview only** |

`/api/health` shows `paymentsEnabled`, `paymentsMode`, `hasDodoKeyAndProduct`, `hasDodoWebhookKey`.

## Setup, click by click

### 1. Dodo dashboard (test mode)

1. Sign in at https://app.dodopayments.com. In the left sidebar, make sure the **Live Mode** switch is **off**
   (test mode). Everything below is created in test mode.
2. **Products → Create product** → One-time payment. Name `AI interview sprint`, a short description, price in
   INR, tax category **EdTech** (or SaaS). Save, open the product and copy its id (`pdt_…`).
3. **Developer → API Keys → Create API key** (test mode). Copy it now; it is shown once.
4. **Developer → Webhooks → Add endpoint**:
   - URL: `https://<your-vercel-preview-url>/api/payments/webhook` (Dodo needs a public https URL, so localhost does not
     work; use the PR's Vercel preview link).
   - Events: tick `payment.succeeded`, `payment.failed`, `payment.processing`, `payment.cancelled`.
   - **Create endpoint**, then copy the signing secret from the endpoint's **Overview** tab.

### 2. Vercel (Preview only)

Vercel → project → **Settings → Environment Variables**. Add the five variables above. For each, tick **Preview**
only (untick Production). `FIREBASE_SERVICE_ACCOUNT_KEY` must also have **Preview** ticked, or purchases can't be saved.
Then **Deployments → the PR's preview → ⋯ → Redeploy**. If `/api/health` still shows `paymentsEnabled: false`,
push any commit to the branch so Vercel builds a fresh preview with the new variables.

Previews sit behind Vercel's login (Deployment Protection), which also blocks Dodo's webhook. Fix: Vercel →
**Settings → Deployment Protection → Protection Bypass for Automation** → generate a secret, then end the Dodo
webhook URL with `?x-vercel-protection-bypass=<secret>`.

### 3. Test a purchase

1. Open `<preview-url>/pricing`, sign in, **Buy now**.
2. On Dodo's checkout pay with card `4242 4242 4242 4242`, expiry `06/32`, CVV `123` (Indian card
   `4576 2389 1277 1450`, or UPI `success@upi` when paying in INR). Card `4000 0000 0000 0002` tests a decline.
3. You land on the thanks page, which should say **Payment received** and "1 interview sprint (test mode)".
4. Check Dodo **Transactions** (payment shows) and **Developer → Webhooks → Logs** (response 200).
5. Firestore: `payments/<pay_…>` and `user_entitlements/<your uid>`.

The webhook page's **Testing → Send example** checks the signature only; example payloads have no `uid`, so the
server answers 200 with "payment not started from the app" and grants nothing.

### 4. Locally (`npm run dev`)

Put the four `DODO_*` keys in `services/.env`. `/pricing` and checkout work at http://localhost:3000; the webhook
cannot reach localhost, so the thanks page waits. To forward test webhooks locally, install the Dodo CLI and run
`dodo login` (choose Test Mode), then `dodo wh listen` pointed at `http://localhost:3000/api/payments/webhook`.

## Dodo MCP (for Claude Code on your laptop)

The MCP lets Claude look at and manage your Dodo account in chat ("list my last 10 test payments", "create a 20%
discount code"). It is not used by the website itself.

In PowerShell, from `D:\THENOOBPM\PM-Launchpad-app`:

```powershell
claude mcp add --transport http dodopayments https://mcp.dodopayments.com/mcp
```

Then start `claude`, type `/mcp`, pick `dodopayments` and sign in. On Dodo's consent page choose your business,
**Test Mode**, and **Read** to start (pick **Write** only when you want Claude to create products or discounts).
Revoke it any time in Dodo **Settings → Connected Apps**. Each connection holds one mode; live mode needs a second
connection.

Optional docs search for Claude: `claude mcp add dodo-knowledge -- npx -y mcp-remote@latest https://knowledge.dodopayments.com/mcp`.

## Going live later (not now)

Finish Dodo account verification, recreate the product and webhook with Live Mode on, set live keys and
`DODO_PAYMENTS_ENVIRONMENT=live_mode` in Vercel **Production**, plus `VITE_PAYMENTS_ENABLED=true`, and redeploy.
