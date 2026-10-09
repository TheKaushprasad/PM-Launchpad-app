# Rules

How work is done on this repository, for humans and AI coding assistants alike. Last updated 2026-10-09.

## 1. Workflow

1. Never push straight to `main`. Every change goes through a pull request.
2. Vercel builds a preview deployment for every PR. Check the preview before merging.
3. Merging to `main` deploys to thenoobpm.com automatically.
4. Firestore rules are **not** deployed by Vercel. After changing `firestore.rules`, the owner publishes them by hand in the Firebase console (Firestore, Security tab) on the named database. Append new `match` blocks rather than replacing the live rules wholesale.
5. One PR per topic. Keep diffs focused; do not mix refactors with features.
6. PR descriptions start with a plain-language "Before:" and "After:", then a short "How".

## 2. Before opening a PR

- `npm install` (not `npm ci`, which fails until the lockfile is fixed).
- `npm run lint` (TypeScript check) must pass.
- `npm run build` must pass.
- If you touched the interview evaluator (`server/`, `server/prompts/`), run `npm run eval -- --validate` and at least one track: `npm run eval -- --track <rca|guesstimate|strategy|design|metrics> --delay 15`.
- Click through the changed page on the Vercel preview.

## 3. Secrets and config

- Never commit API keys, service account JSON or `.env` files. `.env` and `.env.local` are git-ignored.
- Document new env vars by **name only** in `.env.example` and in `docs/architecture.md`.
- When adding an env var, set it in Vercel for **both Production and Preview**, then redeploy. `/api/health` shows which keys the server sees.
- `firebase-applet-config.json` is the live Firebase web config. It is public client config, not a secret; keep it.
- If a key is ever pasted into a chat, issue or commit, rotate it immediately (Google AI Studio for Gemini) and update Vercel.

## 4. Code conventions

- TypeScript everywhere; `strict` is on. Shared types go in `types/` (one file per feature) or `types.ts`.
- React function components with hooks; one component per file, PascalCase file names, named exports.
- Pages live in `components/` (feature folders for bigger areas: `interview/`, `linkedin/`, `projects/`, `auth/`).
- Static content and catalogues live in `data/` (scenarios, personas, projects) and `content/days/` (lessons).
- Client Firestore access goes through `context/AuthContext.tsx`; do not scatter new Firestore calls across components without a reason.
- Styling uses Tailwind utility classes and follows [design.md](design.md). Prefer zinc neutrals and indigo accents.
- Icons from `lucide-react`; animation with `framer-motion`.
- Commit messages follow Conventional Commits: `feat(scope): …`, `fix(scope): …`, `refactor: …`, `chore: …`.

## 5. Backend and AI

- All AI calls go through the server; the browser never sees an AI key.
- Use the shared `generateAIResponse()` helper in `server.ts` so new features get the Gemini model failover and the OpenAI fallback for free.
- Keep Gemini as the primary provider (decided 2026-10-08).
- Assume the free tier: about 20 requests per day per project on `gemini-3.8-flash`, with frequent 503 and 429 responses. Every AI feature needs a friendly busy or retry state, and a non-AI fallback where it is cheap (as the resume auditor does).
- Endpoints that save results must verify the Firebase ID token (`Authorization: Bearer <token>`) with the Admin SDK and write with the Admin SDK, as `/api/interview/evaluate` and `/api/projects/feedback` do.
- Validate and cap user input on the server (lengths, enums, ids).
- Ask the model for JSON (`jsonMode`) and validate the shape before using it.

## 6. Interview evaluator

- Any change to `server/prompts/*.txt`, `server/scoring.ts`, `server/grounding.ts` or `server/evaluatorEngine.ts` must bump `PROMPT_VERSION` in `server/prompts/version.ts` when it changes scoring behaviour.
- Do not loosen the safeguards: grounded evidence quotes, the injection cap at 69, the interviewer-echo cap and the "insufficient" rule for sessions with fewer than 3 substantive candidate turns.
- New golden cases go in `eval/dataset/<id>.json` (file name equals `id`). Keep `scratchpadNotes` to what a candidate would write, never grading hints.
- Run evals one track per day on a separate, eval-only Gemini key so the live site keeps its quota.

## 7. Firestore and security

- Default deny. Every user document lives under `users/{uid}` and only its owner may read it.
- Score, verdict, pillar, audit and feedback fields are server-written only. Clients must not be able to set them; add new protected field names to the rules when you add them to a document.
- Ids are 1 to 128 characters.
- Keep `security_spec.md` and `firebase-blueprint.json` in step with the rules when the data model changes.

## 8. Content

- Lessons are one file per day in `content/days/day-N.tsx`, registered in `constants.tsx` with day, title, category, preview, resources and topics.
- Days 0 to 7 stay free and public; later days require sign-in.
- Resource links must be public and free to view.
- Real-world projects are fictional companies with realistic numbers. Each needs context, a problem statement, deliverables, constraints, evaluation criteria and hints.

## 9. For AI assistants working in this repo

- Read [memory.md](memory.md) and [tasks.md](tasks.md) first.
- The owner is not deeply technical. When a change needs action in Vercel, Firebase or GoDaddy, give click-by-click steps.
- Do not include API keys or other secrets in docs, code, commits or chat.
- Update `docs/memory.md` when a decision is made, and `docs/tasks.md` when a task is finished or found.
