# PM Assignment Solver

> AI drafts, the PM decides.

A PM co-pilot for take-home assignments. The candidate pastes an assignment (or uploads a PDF), checks what the system understood, and five AI agents produce a structured first draft with sourced research, a Critic score per section, and placeholders for the candidate's own insight. The candidate edits, regenerates single sections, and exports. Nothing is submitted for them.

Status: **local only.** It runs with `npm run dev` at `/tools/assignment-solver`. The live site hides it until `VITE_ASSIGNMENT_SOLVER_ENABLED=true` is set in Vercel (Production) and the site is redeployed.

## Why

Take-home assignments take 6 to 12 hours each, and most of that time goes to research and structure, not judgment. Candidates who apply widely can't do that well for every company. The goal for v1 is a usable first draft in under 30 minutes, at under USD 1 per run.

## How it works

```
Input ──► Parser ──► [you approve the brief] ──► Researcher ──► Strategist ──► Writer ──► Critic ──► [you review]
                                                                                 ▲           │
                                                                                 └── weak ───┘  (max 2 loops)
```

| Agent | Job | Model | Output |
|---|---|---|---|
| Parser | Split the assignment into questions, tag each type, pull out word limit, format, deadline, deliverables, open questions | gemini-3.1-flash-lite (cheap) | `brief` |
| Researcher | Google Search for the company, users, top 3 competitors, market; facts only | gemini-3.8-flash with Google Search grounding | `research`: facts with sources, confidence, date |
| Strategist | Per question: pick a framework from a fixed library and say why; segments, problem, metrics, 2+ options, recommendation, trade-offs, assumptions | gemini-3.8-flash | `strategy[]` |
| Writer | Per question: write the section, cite facts inline as [S3], mark other claims "(assumption)", add [ADD YOUR INSIGHT] tags | gemini-3.8-flash, temp 0.6 | `sections[]` |
| Critic | Per section: score 1-5 on answers the question, structure, use of data, clear metrics, trade-offs; flag unsupported claims | gemini-3.8-flash, separate "hiring manager" prompt, temp 0 | `reviews[]` |

Design choices:

- **Every fact has a source by construction.** Research facts are built from Gemini's grounding metadata: each fact is a sentence the search results support, linked to those results. Sentences without a search result behind them are dropped, so nothing unsourced reaches the Strategist.
- **The orchestrator runs in the browser** (`lib/assignmentSolver/orchestrator.ts`). Each agent step is its own request, so no request gets near Vercel's 60-second limit, and the pause for brief approval needs no server state. It retries a failed call once, then stops with a reason; sections averaging under 3.5 go back to the Writer with the Critic's feedback, at most twice; the run stops improving sections once its estimated cost passes the limit (USD 1 by default, also checked on the server).
- **The Critic is not the Writer.** It uses a different prompt (a strict hiring manager who did not write the section), temperature 0, and a deterministic check that every [S#] citation exists.
- **The UI shows what came from AI.** Each section is labelled AI draft, Edited by you, or Regenerated. The edit ratio (share of words the candidate changed) is shown: under 20% means "add more of you", over 50% means the draft was weak.
- **Privacy.** Runs are kept only in the user's browser (localStorage), for 30 days, and can be deleted. The server stores nothing. Prompts and replies are traced in Langfuse when it is configured. Users see an NDA warning before they paste.

## Code map

| Path | What |
|---|---|
| `lib/assignmentSolver/types.ts` | Shared shapes, rubric, item types, framework library, limits |
| `lib/assignmentSolver/orchestrator.ts` | Run order, retries, Critic loop, cost cap, step logs |
| `lib/assignmentSolver/draft.ts` | Citation links, Markdown export, edit ratio, history |
| `server/assignmentSolver/agents.ts` | The five agents' prompts and output checks |
| `server/assignmentSolver/gemini.ts` | Gemini call with fallback model, usage, cost estimate, Langfuse generation |
| `server/assignmentSolver/routes.ts` | `POST /api/assignment-solver/{parse,research,strategy,write,critique}` (sign-in, daily limit, feature flag, cost cap) |
| `components/assignmentSolver/` | Input, brief approval, live agent status, review screen, sources panel, export |

## Cost and time

A run with 3 questions makes about 11 to 15 Gemini calls: 1 Parser, 1 Researcher (up to 10 searches), 3 Strategist, 3 Writer, 3 Critic, plus Writer and Critic again for weak sections. Estimated cost is about USD 0.20 to 0.50, most of it Google Search grounding. Prices used for the estimate are in `server/assignmentSolver/gemini.ts`; check them against real usage in Google AI Studio after the first runs. The solver uses `GEMINI_INTERVIEW_API_KEY` (the paid key) and falls back to `GEMINI_API_KEY`, because the free tier allows about 20 calls a day.

Every step is a Langfuse trace named `solver-<agent>`, tagged `assignment-solver`, grouped into one session per run.

## Export

- **Copy for Google Docs:** copies rich text; paste into a new Google Doc (docs.new) and headings, tables and links stay.
- **Save as PDF:** the browser print dialog with a clean copy (no scores or labels).
- **Markdown:** downloads a `.md` file with a Sources list.

A direct Google Docs API export needs Google sign-in permissions and is left for later.

## Evals (FRD section 9)

v1 passes when a human scores the draft 3.5 or higher on at least 7 of 10 assignments.

1. Pick 10 assignments of different types from `/resources/assignments` (product design, metrics, prioritization, GTM, case study).
2. Run each one through the solver without editing. Note the run cost and time from the summary bar.
3. Score each section yourself (or with a PM peer) on the same 5 criteria the Critic uses.
4. Compare with the Critic's scores. An average gap above 0.5 means the Critic prompt needs work.
5. Repeat after each prompt or model change, and log results below.

| Date | Assignment | Human avg | Critic avg | Gap | Unsupported claims | Cost | Time | Notes |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |

## What's out of scope for v1

Run history across devices, team or mentor views, a direct Google Docs export, scanned (image) PDFs, and auto-submission (never).
