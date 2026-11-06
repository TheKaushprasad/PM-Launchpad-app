# Payments (Dodo Payments, test mode)

The site sells the **AI interview sprint** and **paid runs** of three career tools through [Dodo Payments](https://docs.dodopayments.com).
Dodo is the Merchant of Record: it runs the checkout page, takes cards and UPI, handles GST/tax and emails the receipt.

Everything is in **test mode**: no real money moves. Payments are **off on the live site**.

## What is sold

| Offer key | Env var with the Dodo product id | Suggested price | Gives |
| - | - | - | - |
| `interview_sprint` | `DODO_SPRINT_PRODUCT_ID` | ₹300 | 1 interview sprint (counted only, not used yet) |
| `resume_1` | `DODO_RESUME_PRODUCT_ID` | ₹49 | 1 Resume Auditor run |
| `resume_3` | `DODO_RESUME_PACK_PRODUCT_ID` | ₹99 | 3 Resume Auditor runs |
| `linkedin_1` | `DODO_LINKEDIN_PRODUCT_ID` | ₹79 | 1 LinkedIn Optimiser audit |
| `linkedin_3` | `DODO_LINKEDIN_PACK_PRODUCT_ID` | ₹149 | 3 LinkedIn Optimiser audits |
| `solver_1` | `DODO_SOLVER_PRODUCT_ID` | ₹149 | 1 Assignment Solver run |
| `job_pack` | `DODO_JOB_PACK_PRODUCT_ID` | ₹299 | 3 resume + 3 LinkedIn + 2 Solver runs |

The list lives in `server/payments/catalog.ts`. The price you set in Dodo is the price shown and charged; the
"suggested" column is only a starting point. A product whose env var is empty is simply not shown.

### Free runs and paid runs (only while payments are on)

- **Resume Auditor** and **LinkedIn Optimiser**: the first run on each account is free, then each run uses one
  paid credit. The LinkedIn sample preview is always free. LinkedIn rewrites are included for 24 hours after an
  audit.
- **Assignment Solver**: no free run. One credit is spent at the first (Parser) step; the later steps only work
  for that paid run. The 3-runs-a-day limit is skipped while payments are on, since each run is paid.
- If a run fails (server error, blocked LinkedIn profile), the run is given back.
- Out of runs, the server answers `402` with `paywall: "<tool>"` and the tool shows buy buttons.

On the **live site (payments off) none of this applies**: the tools stay free exactly as before.

Stored in `user_entitlements/{uid}` (per mode): `credits.<mode>.<tool>`, `freeUsed.<mode>.<tool>`,
`lastRun.<mode>.<tool>`, `solverRuns.<mode>.<runId>`. Code: `server/payments/credits.ts`,
`components/payments/ToolPaywall.tsx`. `GET /api/payments/credits` returns the signed-in user's runs.

## How it works

1. `/pricing` shows the product. Name, description and price come from the product in the Dodo dashboard.
2. **Buy now** (signed in, verified email) calls `POST /api/payments/checkout`. The server creates a Dodo checkout
   session with the user's id in `metadata.uid` and sends the browser to Dodo's hosted checkout.
3. After paying, Dodo sends the buyer to `/pricing/thanks?payment_id=…&status=…`.
4. Dodo also calls `POST /api/payments/webhook`, signed (Standard Webhooks). The server checks the signature and, on
   `payment.succeeded`, adds what that offer gives (a sprint, or tool credits) to `user_entitlements/{uid}`, once per
   payment.
5. The thanks page polls `GET /api/payments/status` until the webhook has landed.

Access is granted only from the webhook, never from the return URL (anyone could type `?status=succeeded`).

Firestore collections (server-only, the default-deny rule already keeps browsers out, no rule changes needed):
`payment_checkouts`, `payments`, `user_entitlements`. Test and live sprints are counted separately.

Code: `server/payments/dodo.ts` (REST calls + signature check), `server/payments/routes.ts`,
`components/payments/`. No extra npm packages.

A sprint is only counted for now (tool credits are used, see above). Nothing in the AI interview checks or uses it yet; that is the next step once
the sprint's contents (how many interviews, how long) are decided.

## Environment variables

| Variable | What | Where |
| - | - | - |
| `DODO_PAYMENTS_API_KEY` | Test mode API key | services/.env, Vercel (Preview) |
| `DODO_PAYMENTS_WEBHOOK_KEY` | Webhook signing secret (`whsec_…`) | services/.env, Vercel (Preview) |
| `DODO_PAYMENTS_ENVIRONMENT` | `test_mode` (default). Only `live_mode` switches to real money | services/.env, Vercel |
| `DODO_SPRINT_PRODUCT_ID` | `pdt_…` id of the sprint product | services/.env, Vercel (Preview) |
| `DODO_RESUME_PRODUCT_ID`, `DODO_RESUME_PACK_PRODUCT_ID`, `DODO_LINKEDIN_PRODUCT_ID`, `DODO_LINKEDIN_PACK_PRODUCT_ID`, `DODO_SOLVER_PRODUCT_ID`, `DODO_JOB_PACK_PRODUCT_ID` | `pdt_…` ids of the tool products (table above) | services/.env, Vercel (Preview) |
| `VITE_PAYMENTS_ENABLED` | `true` shows `/pricing` on a Vercel build. Not needed locally | Vercel **Preview only** |

`/api/health` shows `paymentsEnabled`, `paymentsMode`, `hasDodoKeyAndProduct`, `hasDodoWebhookKey`, `dodoProducts`
(which offers have a product id).

## Setup, click by click

### 1. Dodo dashboard (test mode)

1. Sign in at https://app.dodopayments.com. In the left sidebar, make sure the **Live Mode** switch is **off**
   (test mode). Everything below is created in test mode.
2. **Products → Create product** → One-time payment. Name `AI interview sprint`, a short description, price in
   INR, tax category **EdTech** (or SaaS). Save, open the product and copy its id (`pdt_…`).
   Repeat for each tool product in the table above (for example `3 resume audits`, ₹99), one product each, and
   put each id in its env var. The description you write shows on the pricing page.
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

### 3b. Test the tools' paid runs

1. Sign in on the preview (or locally), open **Resume Auditor** and run one audit: it is free and the badge then
   says the free audit is used.
2. Run a second audit: the buy box appears. Buy `3 resume audits` with the test card, come back, run again; the
   badge counts down.
3. Same for **LinkedIn Optimiser**. **Assignment Solver** shows the buy box straight away.
4. Firestore `user_entitlements/<your uid>` shows `credits`, `freeUsed` and `solverRuns`.
To test the free run again, delete the `freeUsed` field in that document.

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
