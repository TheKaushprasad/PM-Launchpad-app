# Tasks

The working backlog for thenoobpm.com. Move items to **Done** when merged, and add the PR number. Last updated 2026-10-09.

Priority: **P0** blocks safe growth, **P1** important next, **P2** nice to have.

## In progress

- [ ] Run the golden-set eval one track per day on the eval-only key: rca, guesstimate, strategy, design, metrics. Record pass rate and mean scores per track here. (Owner, local)

## Next up

### Reliability and security
- [ ] **P0** Move the live site to a paid Gemini key with a billing budget alert, so users stop hitting the 20 requests per day free limit.
- [ ] **P0** Require sign-in (Firebase ID token) and add per-user rate limits on AI endpoints: interview chat, hint, TTS, transcribe, LinkedIn and resume routes. Today anyone can spend the quota.
- [ ] **P0** Lock down `/api/auth/send-*-email`: require sign-in or a captcha, rate-limit per address, and only accept `returnUrl` on our own domain.
- [ ] **P1** Fix clean installs: regenerate `package-lock.json` so `npm ci` works, delete `bun.lock`.
- [ ] **P1** Add GitHub Actions CI running `npm ci`, `npm run lint`, `npm run build` and `npm run eval -- --validate` on every PR.
- [ ] **P1** Remove Supabase leftovers: `lib/supabaseClient.ts`, `supabase_setup.sql`, the `@supabase/supabase-js` dependency.
- [ ] **P2** Stop committing the built `api/index.js` and its source map if Vercel can build them (check the preview first).
- [ ] **P2** Upstream the owner's `services/.env` loading and `.gitignore` entry so local changes stop blocking `git checkout main`.

### Interview Studio
- [ ] **P1** Add in-app Metrics interview scenarios (add `metrics` to `InterviewTrack`, a `data/scenarios/metrics.ts`, hub filter), so all 5 types are practisable.
- [ ] **P1** Add human labels to at least 10 golden cases so the human-calibration check turns on.
- [ ] **P2** Show the user a clear message when the AI is busy (503/429) instead of a generic error.
- [ ] **P2** Interview progress view: score trend per track over time on the profile.

### Learning
- [ ] **P1** Fill thin tracks: Tech (1 lesson), Design (1), Strategy (3).
- [ ] **P2** Lesson quizzes or a "check your understanding" step at the end of each day.
- [ ] **P2** Completion certificate after Day 45.

### Career tools and projects
- [ ] **P1** More real-world projects (currently 6), especially AI Product and Growth.
- [ ] **P2** Let users resubmit a project and compare feedback versions.
- [ ] **P2** Export resume audit and LinkedIn report as PDF.

### PM Jobs board
- [ ] **P1** Phase 2: more sources: Adzuna India API and Firecrawl scraping of company career pages that have no public job feed. Prune companies that show as failed in the refresh result.
- [ ] **P1** Phase 3: "My CV" on the Profile page (reuse `/api/parse-resume-file` and `users/{uid}/resumes`) and an instant match % on every job card, no AI.
- [ ] **P1** Phase 4: "Check my fit" AI match + shortlisting tips per job, reusing `/api/audit-resume` job suitability, cached per user and job, max 2 per user per day.
- [ ] **P2** Phase 5: email alerts for new jobs matching saved filters (Resend).

### Code health
- [ ] **P1** Split `server.ts` (about 1,600 lines) into route files: `linkedin`, `resume`, `interview`, `projects`, `auth-email`, plus a shared `ai.ts` helper.
- [ ] **P2** Compile Tailwind with a config file instead of the CDN script, and define design tokens (see `docs/design.md`).
- [ ] **P2** Add unit tests for `server/scoring.ts` and `server/grounding.ts`.

### Business
- [ ] **P2** Decide on monetisation (premium interviews, project reviews, cohort access) before building payments.
- [ ] **P2** Set up a weekly metrics view: sign-ups, lessons completed, interviews completed, tool usage.

## Done

- [x] Project docs in `docs/` (prd, rules, design, tasks, memory, architecture). 2026-10-09
- [x] 50-case golden dataset across 5 interview types, `--track` flag and per-track summary. PR #3, 2026-10-08
- [x] Evaluator benchmark suite; injection cap at 69; busy-model retry; interviewer-echo cap. PR #2, 2026-10-08
- [x] Real-world projects section with AI feedback, saved server-side. PR #1, 2026-10-08
- [x] Remove Google AI Studio leftovers; `/api/health` reports the Gemini key. PR #1, 2026-10-08
- [x] Interview evaluation guard and session ownership check. 2026-10-08
- [x] Rotate the Gemini key that was pasted in chat (owner). 2026-10-08
- [x] Email verification gate for protected areas. 2026-09-16
- [x] Sign-in gate for lessons 8 to 45. 2026-09-11
- [x] Testimonial slider on the landing page. 2026-09-09
