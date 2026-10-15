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
| POST `/api/analyse-profile` | Scrape LinkedIn with Firecrawl and score it | Signed in, verified email, daily limit (sample preview is public) |
| POST `/api/rewrite` | Rewrite a LinkedIn section | Signed in, verified email, daily limit |
| POST `/api/analyse-experience` | Analyse experience entries | Signed in, verified email, daily limit |
| POST `/api/keyword-gap` | Keyword gap against a target role | Signed in, verified email, daily limit |
| POST `/api/generate-action-plan` | LinkedIn action plan | Signed in, verified email, daily limit |
| POST `/api/parse-resume-file` | Extract resume text from an uploaded file | Signed in, verified email, daily limit |
| POST `/api/audit-resume` | PM resume audit, heuristic fallback | Signed in, verified email, daily limit |
| POST `/api/interview/chat` | Next interviewer turn | Signed in, verified email, daily limit |
| POST `/api/interview/hint` | Hint for the candidate | Signed in, verified email, daily limit |
| POST `/api/interview/tts` | Text to speech | Signed in, verified email, daily limit |
| POST `/api/interview/transcribe` | Speech to text | Signed in, verified email, daily limit |
| POST `/api/interview/evaluate` | Score a session and save it | Signed in, verified email, daily limit |
| POST `/api/projects/feedback` | Score a project submission and save it | Signed in, verified email, daily limit |
| GET `/api/auth/email-service-status` | Email setup check | None |
| POST `/api/auth/send-verification-email` | Verification email via Resend, to the signed-in user's own address | Firebase ID token, 5 per user per day |
| POST `/api/auth/send-password-reset-email` | Reset email via Resend | None; 5 per email and 20 per IP per day |

The AI guard lives in `server/security.ts`. Daily counters are kept server-side in the Firestore `rate_limits` collection; limits default to 200 AI calls per user and 500 per IP and can be changed with the `AI_DAILY_LIMIT_PER_USER` and `AI_DAILY_LIMIT_PER_IP` env vars. The welcome email is sent once, from the verification endpoint, only for accounts created in the last 15 minutes. Request bodies are capped at 1 MB, except 10 MB for resume and audio uploads.

Routes accept a trailing slash variant. In local dev the same Express app also serves Vite middleware; in production it serves `dist/`.

### AI helper

`generateAIResponse()` in `server.ts` tries each Gemini model in order. A 503, 429 or "high demand" error moves to the next model after a 300 ms pause; other errors in JSON mode retry once without the JSON response type. If every Gemini model fails and `OPENAI_API_KEY` is set, it falls back to `gpt-4o`. With no valid key it throws "No valid AI API key found".

## 6. Interview evaluation pipeline (`server/`)

1. `/api/interview/evaluate` verifies the Firebase ID token and gets the user id.
2. `evaluatorEngine.ts` builds a numbered transcript (`[T3][CANDIDATE]: …`) and returns `insufficient` if the candidate has fewer than 3 turns of more than 5 words.
3. The prompt is `server/prompts/evaluator.txt` plus the track rubric from `server/prompts/tracks/{rca,guesstimate,strategy,design,metrics,behavioral,ai}.txt`, injected before the grounding rules. Version: `PROMPT_VERSION = "eval-v3.0"`. The prompt also gets the candidate level (APM, PM, Senior PM) and the number of hints used.
4. The model returns JSON that must match the zod schema in `server/schemas/evaluation.ts`.
5. `grounding.ts` checks every evidence quote against the transcript: valid, reindexed, echoed (the interviewer said it) or dropped (fabricated). Pillars built mainly on interviewer echoes are capped.
6. `scoring.ts` computes the overall score with per-track pillar weights (`data/interviewTracks.ts`), applies the hiring bar (any pillar at 1, or two pillars at 2 or below, caps at 69; Strong Hire needs every pillar at 4+, else cap 84), maps it to a verdict (85+ Strong Hire, 70 to 84 Hire, 50 to 69 No Hire, below 50 Strong No Hire) and caps injection attempts at 69. Old saved verdicts (Strong Yes, Lean Yes, Lean No, Strong No) are mapped to the new names on display.
7. `persistence.ts` writes the scorecard with the Admin SDK to `users/{uid}/interview_sessions/{sessionId}`, including audit fields (model id, prompt version, grounding stats, latency, retries).

Interviewer personas come from `server/prompts/interviewer-{maya,alex,priya,marcus}.txt`. Personas change the interviewer's tone only; the scorecard uses the same bar for all of them.

### Live interviewer (`server/interview/`)

- `/api/interview/chat` takes `{scenarioId, personaId, level, messages, elapsedSeconds, targetSeconds}`. The server looks the scenario up by id (`catalog.ts`), so the client never sends hidden answers. One AI call per turn (400 output tokens, thinking off); on failure it returns 503 `{retryable: true}` and the client shows a Retry button instead of a scripted line.
- `interviewerPrompt.ts` builds the system prompt: interview phase from elapsed time (clarify, structure, deep dive, curveball at 50 to 70%, wrap-up at 80%+), level guidance, and a data policy (RCA and metrics answer only from a hidden fact sheet built from `dataPack`; guesstimates give no numbers; behavioral probes for specifics). The interviewer never gives answers or praise.
- `/api/interview/hint` is capped at 2 per interview by the client; hints used are sent to the evaluator.
- The opening line is scripted on the client, so starting an interview costs no AI call.
- 7 tracks with 205 scenarios: design, RCA, metrics, guesstimate, strategy, behavioral, AI product. A "Full interview loop" runs 3 rounds (design, metrics or RCA, behavioral) and combines them into one decision (`lib/interviewLoop.ts`).
- `npm run eval:interviewer -- --validate` checks offline that no scenario leaks its answers into the prompt; without `--validate` it runs 8 live cases in `eval/interviewer/cases.json`.
- `/api/health` reports `interviewPromptsLoaded`; `vercel.json` bundles `server/prompts/**` into the function.
- One interviewer (`ACTIVE_INTERVIEWER` in `data/interviewPersonas.ts`, Priya) runs every round; the other personas stay only so old scorecards render.

### Voice (`server/voice.ts`, `lib/answerRecorder.ts`)

- Interviews are voice-only (`InterviewMode = 'voice'`); the avatar and text-chat modes were removed on 2026-10-11.
- Speaking: `/api/interview/tts` tries Sarvam Bulbul v4 Flash (`SARVAM_API_KEY`, Indian-English voice `roopa_en_conversational`), then Deepgram Aura-2 (`DEEPGRAM_API_KEY`), then Gemini TTS, then OpenAI, then the browser voice. A watchdog hands the turn back to the candidate if playback never reports that it ended, and tapping the mic interrupts the interviewer.
- Listening: every answer is recorded (MediaRecorder) and, on "Done answering" or a 3.5 s pause in mic volume, sent to `/api/interview/transcribe`: Groq Whisper (`GROQ_API_KEY`), else Gemini. The browser's live recognition is only a preview and is switched off for the session if it errors (Brave, blocked service). If the candidate edits the text box, their text is sent instead.

### Observability (`server/observability.ts`, `lib/interviewTelemetry.ts`)

- Langfuse JS/TS SDK v6 (`@langfuse/tracing`, `@langfuse/otel` with the OpenTelemetry `NodeSDK`, `@langfuse/client` for scores). `initObservability()` runs right after `dotenv.config()` and does nothing without `LANGFUSE_PUBLIC_KEY`/`LANGFUSE_SECRET_KEY`. On Vercel each request's spans are flushed with `waitUntil` after the response.
- One trace per `/api/interview/*` request, one session per interview (`X-Interview-Session` from the browser). Trace names are stable and verb-first: `interviewer-turn`, `transcribe-answer`, `speak-interviewer-line`, `score-interview`, `give-hint`. Trace input/output is what a reviewer needs (candidate answer → Priya's reply, transcript, verdict).
- Every provider call is a nested `generation` via `traceStep`: `generate-response`, `score-transcript`, `transcribe-audio`, `synthesize-speech`, with model, chat-format input, output, token usage, and an estimated cost for voice providers (LLM cost comes from Langfuse's model prices). Failed attempts before a fallback show as ERROR generations. `noteGuardrail` adds a `guardrail` observation (empty or cleaned reply, hint fallback, no natural voice, evaluator schema failure, dropped quotes).
- The browser posts to `/api/interview/telemetry`. `first_voice_ms`, `transcribe_ms`, `reply_ms` and `voice_fallback` become scores on that turn's trace (the browser echoes `X-Langfuse-Trace-Id`); `interview_completed`, `overall_score`, `elapsed_seconds` and friends become session scores.
- Each request also logs one `[obs]` JSON line, with or without Langfuse. `OBS_LOG_TEXT=false` keeps interview text out of Langfuse. `.claude/skills/langfuse` is Langfuse's own agent skill, vendored for future tracing work.

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
- `returnUrl` on the auth email endpoints is taken from the request body; Firebase only accepts domains on the Authentication authorized-domains list.
- Tailwind is loaded from the CDN script, not compiled.
- Supabase leftovers (`lib/supabaseClient.ts`, `supabase_setup.sql`, `@supabase/supabase-js`) and a stray `bun.lock`.
- The compiled `api/index.js` and its source map are committed.
- In-app interview types are 4 (`InterviewTrack` has no `metrics`), while the evaluator supports 5.
