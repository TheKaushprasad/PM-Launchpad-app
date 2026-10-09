# Project Memory

Decisions, context and lessons learned that are not obvious from the code. Newest first within each section. Add to this file whenever a decision is made. Last updated 2026-10-09.

## People

- **Owner:** Kaushal (GitHub `TheKaushprasad`). Solo founder; not deeply technical. Prefers click-by-click steps for Vercel, Firebase and GoDaddy dashboards.
- Works on Windows (PowerShell). Runs evals locally from their own checkout.

## Decision log

| Date | Decision | Why |
|---|---|---|
| 2026-10-09 | Keep project docs (`prd`, `rules`, `design`, `tasks`, `memory`, `architecture`) in `docs/` | One place for humans and AI assistants to get context |
| 2026-10-08 | Stay on the free Gemini tier for now | Cost; accepted the 20 requests per day limit and frequent 503s. Paid key is recommended before real traffic |
| 2026-10-08 | Run golden-set evals one track per day, in this order: rca, guesstimate, strategy, design, metrics, on a separate eval-only key | A full 50-case run is about 60 calls and does not fit in one free-tier day |
| 2026-10-08 | Build a 50-case golden dataset, 10 per interview type (PR #3) | Trustworthy scoring is the core promise of the interview product |
| 2026-10-08 | Cap injection-flagged interviews at 69 (Lean No) and cap pillars built on interviewer echoes (PR #2) | The evaluator could be gamed |
| 2026-10-08 | Add Real-World Projects with AI feedback; submissions saved server-side (PR #1) | It was the only goal area with nothing built |
| 2026-10-08 | Remove Google AI Studio leftovers, keep `firebase-applet-config.json` | It is the live Firebase config |
| 2026-10-08 | Keep Gemini as the AI provider | Owner's choice when moving off AI Studio |
| 2026-10-08 | Move development from Google AI Studio to Claude Code; GitHub repo is the source of truth | AI Studio workflow became impractical |
| 2026-09-16 | Email verification gate is required for protected areas | After a brief removal on 2026-09-11 it was put back |
| 2026-09-11 | Lessons 8 to 45 gated behind sign-in ("paywall gating" commit; no payment exists) | Drive sign-ups |

## Facts worth remembering

- **Origin:** built with Google AI Studio and the Gemini API, hosted on Vercel, domain on GoDaddy, Firebase for auth and database.
- **Deploys:** every PR gets a Vercel preview; merging to `main` deploys to thenoobpm.com.
- **Firestore uses a NAMED database**, not `(default)`. Its id and the Firebase project id are in `firebase-applet-config.json`. Any CLI deploy or console edit must target that database.
- **Rules are published by hand** in the Firebase console. Append new blocks rather than replacing the live rules.
- **Vercel env vars must be ticked for Preview** as well as Production, or PR previews fail with "No valid AI API key". Redeploy after changing them. `/api/health` reports which keys are present.
- **Free tier limits:** `gemini-3.8-flash` allows 20 requests per day per project (429 `RESOURCE_EXHAUSTED`). Under load it returns 503 "high demand", so results often come from `gemini-3.1-flash-lite` via failover.
- **Eval runs never write to Firestore** because the harness sends no user or session id.
- **The app offers 4 interview types** (design, guesstimate, RCA, strategy). The evaluator and golden set also cover a 5th, metrics, using scenarios embedded in the eval cases.
- **`npm ci` fails** because `package-lock.json` pins zod 3 while `package.json` wants zod 4. Use `npm install`.
- **Owner's local setup:** keys live in `services/.env` on their machine, with local, uncommitted edits to `.gitignore` and `eval/runner.ts` to load it. These block `git checkout main`; the safe sequence after a merge is `git stash`, `git checkout main`, `git pull`, `git stash pop`.
- A Gemini key was once pasted into chat; it was rotated on 2026-10-08. Never paste keys into chats, issues or commits.

## Lessons learned

- Free-tier quota is per project, so evals should use a separate Google Cloud project and key from the live site.
- Firestore client writes of score fields were a cheating risk; scores are now written only by the server with the Admin SDK and blocked in the rules.
- The AI interviewer sometimes hands the candidate the answer; the evaluator must not credit quotes the interviewer said first (grounding marks them "echoed").

## Pull request history

| PR | Title | Merged |
|---|---|---|
| #1 | Real-world projects section, AI Studio cleanup, health check for Gemini key | 2026-10-08 |
| #2 | Evaluator benchmark suite and scoring fixes (injection cap, busy-model retry, echo cap) | 2026-10-08 |
| #3 | 50-case golden dataset, `--track` and per-track summary | 2026-10-08 |
