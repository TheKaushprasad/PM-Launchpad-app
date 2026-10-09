# The NooB PM

Source for [thenoobpm.com](https://thenoobpm.com): a career platform for aspiring product managers with learning tracks, AI mock interviews, resume and LinkedIn tools, and real-world projects.

**Stack:** React + Vite frontend, Express API (`server.ts`, served on Vercel via `api-handler.ts`), Firebase Auth and Firestore, Gemini (with OpenAI fallback) for AI features.

## Run locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Create a `.env` file with the keys you need:
   - `GEMINI_API_KEY` (AI features)
   - `OPENAI_API_KEY` (optional fallback)
   - `FIREBASE_SERVICE_ACCOUNT_KEY` (server-side auth checks and saving results)
   - `RESEND_API_KEY`, `APP_URL` (transactional emails)
   - `FIRECRAWL_API_KEY` (LinkedIn profile scraping)
3. Start the app: `npm run dev` (http://localhost:3000)

Typecheck with `npm run lint` and build with `npm run build`.

## Deploying

Vercel deploys `main` to production and builds a preview for every pull request. Firestore security rules in `firestore.rules` are deployed separately with the Firebase CLI (`firebase deploy --only firestore:rules`).

## Project docs

See [`docs/`](docs/): [PRD](docs/prd.md), [architecture](docs/architecture.md), [design](docs/design.md), [rules](docs/rules.md), [tasks](docs/tasks.md) and [memory](docs/memory.md).
