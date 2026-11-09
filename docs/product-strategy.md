# AI Product Strategy tool

Route: `/tools/ai-product-strategy`. **Local only for now**: on in `npm run dev`, off on the live site.
Built from the owner's FRD (v0.1, 2026-11-09) as a lean V1.

Positioning: "learn a strategy framework by filling it in for your product". The PM Assignment Solver
answers someone else's take-home; this tool teaches a framework on your own product.

## What V1 does

- 4-step form with progress bar, field rules and errors (FR-01, FR-02), "Use example" (FR-05), draft
  saved in the browser as you type (AC-02), going back keeps data (FR-04). A guest can fill the form;
  Generate asks them to sign in and keeps the draft (FR-36).
- 3 styles, all free: Product Strategy Canvas, Product Vision Board, One-page Strategy
  (`lib/productStrategy/styles.ts`; add a style by adding an entry there). Framework authors are
  credited as "structure inspired by", in the preview and the PDF footer.
- Concise or Detailed, tone, extras (assumptions and risks, OKR metrics, competitor table).
- Gemini on the interview key (`GEMINI_INTERVIEW_API_KEY`, falls back to `GEMINI_API_KEY`), through the
  Assignment Solver's Gemini helper (fallback model, cost estimate, Langfuse generations).
- Each section has content, a "why it matters" tip and a confidence level (FR-12). Numbers the AI made
  up must carry "(Assumption)" and show as an amber label (FR-13).
- Quality check (FR-15): 4 checks of 0 to 25. Below 60, the weakest sections are rewritten once with the
  checker's feedback, then re-scored. Tips show in the score panel (FR-25).
- Edit any section (plain text with `- ` bullets and `**bold**`), Undo, hide from PDF, regenerate a
  section with an optional instruction (5 per strategy, no credit), rename, author name and role.
  Edits auto-save 1.5 s after typing.
- Download PDF through the browser's print dialog: cover, summary, one-page canvas grid for canvas
  styles, sections, extras, footer on every page; A4 or US Letter, tips on/off; file name
  `<product>-strategy-<style>-<date>`. Text stays selectable and ₹ prints.
- History: last 5 strategies per user (Open, Duplicate, Download PDF, Delete). "Try another style"
  copies the inputs back to step 4.

## Requests (each under Vercel's 60 s limit)

| Endpoint | What it does |
| --- | --- |
| `POST /api/product-strategy/generate` | Part 1 (whole strategy for Concise). Spends 1 credit, refunded if it fails. |
| `POST /:id/continue` | Part 2 of a Detailed strategy (free). |
| `POST /:id/score` | Quality check (free, max 3 per strategy). |
| `POST /:id/improve` | One rewrite of the weakest sections when the score is below 60. |
| `POST /:id/sections/:key/regenerate` | One section, optional instruction (5 per strategy). |
| `PATCH /:id`, `GET /`, `DELETE /:id` | Save edits, history, delete. |

Also: 10 generations per user per hour, nonsense-input pre-check, HTML and "ignore previous
instructions" text stripped, off-topic products refused with "This tool only makes product strategies."

## Credits

- Payments on (local dev, or `VITE_PAYMENTS_ENABLED=true`): 3 free strategies per calendar month, then
  paid credits (`strategy` tool in `server/payments/catalog.ts`, offer `strategy_5`, Dodo product id in
  `DODO_STRATEGY_PRODUCT_ID`; the ₹99 price is a placeholder).
- Payments off: 3 strategies per user per day (`PRODUCT_STRATEGY_RUNS_PER_DAY`).

## Storage

Firestore collection `product_strategies` (named database), written only by the server through the
Admin SDK, so no client rules are needed. Needs `FIREBASE_SERVICE_ACCOUNT_KEY` on the server.

## Turning it on

Vercel > Settings > Environment Variables: `VITE_AI_PRODUCT_STRATEGY_ENABLED=true` (tick Preview to try
it on a preview first), then redeploy. Add the page to the sitemap in `lib/seo.ts` at launch.

## Left out of V1 (from the FRD)

File upload, rich text editor, "Help me choose" quiz, per-field AI suggest, Pro styles (Playing to Win,
Lean Canvas, Strategy with Assumptions), watermark and theme options, server-side Puppeteer PDF,
OpenAI, reorder or custom sections, streaming, Mixpanel/GA4 events (Langfuse traces each step instead).
