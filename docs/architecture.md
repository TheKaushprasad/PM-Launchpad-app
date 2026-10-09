# Architecture

How thenoobpm.com is built and deployed. Last updated 2026-10-09.

## 1. System overview

```
Browser (React SPA, HashRouter)
   │  Firebase JS SDK ───────────────► Firebase Auth
   │                                   Firestore (named database)
   │
   │  fetch /api/*  (Bearer Firebase ID token where needed)
   ▼
Vercel
   ├── static build (dist/)          ← vite build
   └── /api/index  (serverless)      ← api-handler.ts → createExpressApp() in server.ts
          │
          ├── Gemini API  (@google/genai)       primary AI
          ├── OpenAI API  (gpt-4o, tts-1)       fallback AI
          ├── Firecrawl                          LinkedIn scraping
          ├── Resend                             transactional email
          └── Firebase Admin SDK                 token checks + server-side writes
```

Domain: GoDaddy DNS points thenoobpm.com at Vercel.

## 2. Tech stack

| Layer | Choice |
|---|---|
| Frontend | React 18, TypeScript, Vite 5, react-router-dom 6 (`HashRouter`), framer-motion, lucide-react |
| Styling | Tailwind via CDN script in `index.html`, plus a small inline stylesheet; Inter and Caveat fonts |
| Backend | Express 5 in a single `server.ts`, wrapped for Vercel by `api-handler.ts` |
| Auth | Firebase Auth (Google popup and email/password, email verification) |
| Database | Cloud Firestore, a NAMED database (not `(default)`); ids live in `firebase-applet-config.json` |
| AI | Gemini (`gemini-3.8-flash` first, then `gemini-3.1-flash-lite`, `gemini-flash-latest`, `gemini-3.7-flash`), then OpenAI `gpt-4o` |
| Speech | Gemini `gemini-3.1-flash-tts-preview` for TTS (OpenAI `tts-1` fallback); Gemini for transcription |
| Email | Resend, HTML templates in `services/emailTemplates.ts` |
| Scraping | Firecrawl (`services/firecrawl.ts`) |
| Analytics | Google Analytics gtag, Vercel Analytics |
| Validation | zod 4 (evaluator response schema) |

## 3. Repository layout

```
App.tsx                 Routes, app shell, error boundary
index.tsx, index.html   Entry point, global styles, fonts, analytics
constants.tsx           MODULES (8 tracks) and LESSONS metadata
content/days/           One file per day lesson (day-0 … day-45)
components/             Pages and UI
  auth/                 Auth modal, onboarding, verify gate, protected route
  interview/            Hub, setup, stage, avatar, scratchpad, evaluation view
  linkedin/             LinkedIn input form, landing, score dashboard
  projects/             Projects hub and detail
context/AuthContext.tsx Auth state, profile, and all client Firestore reads/writes
data/                   Interview scenarios, personas, cheat sheet, real-world projects
lib/                    Firebase client init, PDF parser, resume heuristic engine
services/               Server helpers: Firebase Admin, Resend, Firecrawl, profile analyzer
server.ts               Express app: every /api route and the AI helper
server/                 Interview evaluator: engine, grounding, scoring, persistence, prompts
eval/                   Evaluator benchmark: runner, judge, checks, 50-case dataset
types/, types.ts        Shared TypeScript types
firestore.rules         Firestore security rules (published by hand)
vercel.json             Rewrites: /api/* → /api/index, everything else → index.html
```

## 4. Frontend

- `HashRouter`, so URLs look like `thenoobpm.com/#/dashboard/day/3`. Vercel rewrites every non-API path to `index.html`.
- `AuthProvider` wraps the app. It listens to Firebase Auth, loads `users/{uid}`, and subscribes with `onSnapshot` to `progress`, `interview_sessions`, `analyses` and `resumes`.
- `ProtectedRoute` redirects signed-out users home and shows `VerifyEmailGate` to unverified users. Lessons after Day 7 are locked in `DayCard` when signed out.
- `MainShell` provides the sidebar layout for dashboard, tools, interview, projects, resources and profile routes.

### Routes

| Path | Page |
|---|---|
| `/` | Landing page |
| `/onboarding` | Profile setup (protected) |
| `/auth/action` | Email verification and password reset handler |
| `/dashboard`, `/dashboard/{track}` | Curriculum dashboard, filtered by track |
| `/dashboard/day/:id` | Lesson |
| `/dashboard/about` | About |
| `/resources` | Resource library |
| `/interview-studio` (alias `/practice`) | AI Mock Interview Studio |
| `/projects`, `/projects/:projectId` | Real-world projects |
| `/tools` | Career tools hub |
| `/tools/linkedin-optimiser` (alias `/linkedin`) | LinkedIn Optimiser |
| `/tools/resume-auditor` (alias `/resume-auditor`) | Resume Auditor |
| `/profile` | User profile (protected) |

## 5. Backend API (`server.ts`)

| Method and path | Purpose | Auth |
|---|---|---|
| GET `/api/health` | Reports which env keys are present (never the values) | None |
| POST `/api/analyse-profile` | Scrape LinkedIn with Firecrawl and score it | None |
| POST `/api/rewrite` | Rewrite a LinkedIn section | None |
| POST `/api/analyse-experience` | Analyse experience entries | None |
| POST `/api/keyword-gap` | Keyword gap against a target role | None |
| POST `/api/generate-action-plan` | LinkedIn action plan | None |
| POST `/api/audit-linkedin` | Full LinkedIn audit | None |
| POST `/api/parse-resume-file` | Extract resume text from an uploaded file | None |
| POST `/api/audit-resume` | PM resume audit, heuristic fallback | None |
| POST `/api/interview/chat` | Next interviewer turn | None |
| POST `/api/interview/hint` | Hint for the candidate | None |
| POST `/api/interview/tts` | Text to speech | None |
| POST `/api/interview/transcribe` | Speech to text | None |
| POST `/api/interview/evaluate` | Score a session and save it | Firebase ID token |
| POST `/api/projects/feedback` | Score a project submission and save it | Firebase ID token |
| GET `/api/auth/email-service-status` | Email setup check | None |
| POST `/api/auth/send-verification-email` | Verification email via Resend | None (email format check only) |
| POST `/api/auth/send-password-reset-email` | Reset email via Resend | None (email format check only) |
| POST `/api/auth/send-welcome-email` | Welcome email | None (email format check only) |

Routes accept a trailing slash variant. In local dev the same Express app also serves Vite middleware; in production it serves `dist/`.

### AI helper

`generateAIResponse()` in `server.ts` tries each Gemini model in order. A 503, 429 or "high demand" error moves to the next model after a 300 ms pause; other errors in JSON mode retry once without the JSON response type. If every Gemini model fails and `OPENAI_API_KEY` is set, it falls back to `gpt-4o`. With no valid key it throws "No valid AI API key found".

## 6. Interview evaluation pipeline (`server/`)

1. `/api/interview/evaluate` verifies the Firebase ID token and gets the user id.
2. `evaluatorEngine.ts` builds a numbered transcript (`[T3][CANDIDATE]: …`) and returns `insufficient` if the candidate has fewer than 3 turns of more than 5 words.
3. The prompt is `server/prompts/evaluator.txt` plus the track rubric from `server/prompts/tracks/{rca,guesstimate,strategy,design,metrics}.txt`, injected before the grounding rules. Version: `PROMPT_VERSION = "eval-v2.2"`.
4. The model returns JSON that must match the zod schema in `server/schemas/evaluation.ts`.
5. `grounding.ts` checks every evidence quote against the transcript: valid, reindexed, echoed (the interviewer said it) or dropped (fabricated). Pillars built mainly on interviewer echoes are capped.
6. `scoring.ts` computes the weighted overall score, maps it to a verdict (85+ Strong Yes, 70 to 84 Lean Yes, 50 to 69 Lean No, below 50 Strong No) and caps injection attempts at 69.
7. `persistence.ts` writes the scorecard with the Admin SDK to `users/{uid}/interview_sessions/{sessionId}`, including audit fields (model id, prompt version, grounding stats, latency, retries).

Interviewer personas come from `server/prompts/interviewer-{maya,alex,priya,marcus}.txt`.

## 7. Data model (Firestore)

```
users/{uid}                          profile, onboarding fields, counters (completedDaysCount, streakDays)
  progress/day_{n}                   completion, notes, bookmarks, reading position
  interview_sessions/{sessionId}     scorecard (server-written score fields)
  analyses/{analysisId}              LinkedIn analyses
  resumes/{resumeId}                 resume uploads and audits
  project_submissions/{projectId}    project write-up and AI feedback (server-written)
test/connection                      public read-only connectivity check
```

Rules (`firestore.rules`): default deny; a user can only touch their own `users/{uid}` tree; ids must be 1 to 128 characters; clients can never write score, verdict, pillar or audit fields on interview sessions; project submissions are read-only for clients. The intended model is described in `firebase-blueprint.json` and `security_spec.md`.

## 8. Build and deploy

- `npm run dev`: `tsx server.ts` on port 3000 with Vite middleware.
- `npm run build`: `vite build`, then esbuild bundles `server.ts` to `dist/server.cjs` and `api-handler.ts` to `api/index.js`.
- `npm run lint`: `tsc --noEmit`.
- Vercel builds a preview for each PR and deploys `main` to production. Env vars must be ticked for Preview as well as Production.
- Firestore rules are not deployed by Vercel. The owner publishes them in the Firebase console (Firestore, Security tab, on the named database).

## 9. Environment variables

Names only; values live in Vercel and in each developer's local env file, never in git. See `.env.example`.

| Variable | Used by |
|---|---|
| `GEMINI_API_KEY` | All AI features |
| `OPENAI_API_KEY` | Optional AI fallback |
| `FIRECRAWL_API_KEY` | LinkedIn scraping |
| `RESEND_API_KEY`, `APP_URL` | Emails |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Admin SDK (token checks, server-side writes) |
| `VITE_FIREBASE_*` | Client Firebase config overrides |
| `EVAL_JUDGE_MODEL` | Optional, pins the eval judge model |

## 10. Quality and testing

- No unit tests and no CI. `npm ci` fails because `package-lock.json` is out of sync with `package.json` (zod 3 vs 4); `npm install` works.
- The evaluator benchmark in `eval/` is the only automated test harness: 50 golden cases, 10 per track, with threshold checks and an LLM judge. Run it locally; see `eval/README.md`.

## 11. Known technical debt

- `server.ts` is about 1,600 lines; routes, AI helper and email logic all live in one file.
- Most AI endpoints have no auth or rate limiting, so anyone can spend the Gemini quota.
- The `/api/auth/send-*-email` endpoints need no sign-in, so anyone can trigger emails to any address, and `returnUrl` is taken from the request body unchecked.
- Tailwind is loaded from the CDN script, not compiled.
- Supabase leftovers (`lib/supabaseClient.ts`, `supabase_setup.sql`, `@supabase/supabase-js`) and a stray `bun.lock`.
- The compiled `api/index.js` and its source map are committed.
- In-app interview types are 4 (`InterviewTrack` has no `metrics`), while the evaluator supports 5.
