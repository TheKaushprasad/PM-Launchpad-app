# Product Requirements: The NooB PM

Live at [thenoobpm.com](https://thenoobpm.com). Last updated 2026-10-09.

## 1. Problem

People who want to break into product management have to stitch together free YouTube videos, blog posts, paid cohorts and random mock-interview partners. They rarely get structured practice or honest feedback on their interview answers, resume, LinkedIn profile or portfolio work.

## 2. Vision

One place where an aspiring PM can learn the craft day by day, practise real interviews against an AI interviewer, fix their resume and LinkedIn, and build portfolio-worthy projects with feedback, for free or close to it.

## 3. Target users

| Segment | Who they are | What they need most |
|---|---|---|
| Students | College students and fresh graduates (profile captures college, degree, pass-out year) | A structured path from zero, plus a first portfolio |
| Career switchers | Working professionals moving into PM from engineering, design, analytics, consulting, sales | Interview practice and a resume that reframes past work as PM work |
| Junior PMs | APMs and PMs with 0 to 2 years of experience | Sharper frameworks, metrics and strategy practice |

Onboarding asks for profession (Student or Working Professional), experience, designation or college details, so the product can tailor content later.

## 4. Goals and success metrics

| Goal | Metric | How we measure today |
|---|---|---|
| Learners progress through the curriculum | Lessons completed per user, streak days | `users/{uid}/progress` docs, `completedDaysCount`, `streakDays` |
| Learners practise interviews | Mock interviews completed per user per week | `users/{uid}/interview_sessions` |
| Interview feedback is trustworthy | Golden-set pass rate per track | `npm run eval` (50-case golden dataset) |
| Career tools are used | Resume audits and LinkedIn analyses per user | `resumes` and `analyses` sub-collections |
| Portfolio work gets done | Project submissions per user | `project_submissions` sub-collection |
| Acquisition | Weekly sign-ups and landing-page conversion | Firebase Auth, Google Analytics (gtag), Vercel Analytics |

## 5. Features (current scope)

### 5.1 Learning journey (Day 0 to Day 45)
- 46 day-lessons, each with content, an optional assignment, resources (video, article, tool) and topic timestamps.
- 8 tracks: Foundations (9 lessons), Research (5), Strategy (3), Data (9), Tech (1), AI (7), Design (1), Job Ready (11).
- Days 0 to 7 are open to everyone; Day 8 onward needs sign-in (`components/DayCard.tsx`).
- Signed-in users can bookmark lessons, take notes, mark lessons complete and resume reading where they left off.

### 5.2 AI Mock Interview Studio (`/interview-studio`)
- Scenario library of about 140 cases across 4 interview types in the app: Product Design, Guesstimates, Root Cause Analysis and Product Strategy. A fifth type, Metrics, exists in the evaluator rubric and eval set but has no in-app scenarios yet.
- 4 interviewer personas with distinct styles: Maya Chen (supportive, structured), Alex Rivera (data-rigorous), Priya Sharma (strategy and moats), Marcus Vance (execution and trade-offs).
- 3 modes: avatar (default), voice, and chat. Voice uses server text-to-speech and speech-to-text.
- In-session tools: hints, a scratchpad, an estimation cheat sheet, an optional webcam mirror.
- Evaluation: a scorecard with 5 weighted pillars (clarification 15%, framework 25%, analytical rigour 25%, communication 15%, synthesis 20%), an overall 0 to 100 score, a hiring verdict (Strong Yes, Lean Yes, Lean No, Strong No), evidence quotes from the transcript, strengths, growth areas and an exemplar answer.
- Safeguards: evidence quotes are checked against the transcript, prompt-injection attempts cap the score at 69 (never a Yes), too-short sessions return "insufficient" instead of a score.
- Scorecards are saved server-side and listed in the user's history.

### 5.3 Resume Auditor (`/tools/resume-auditor`)
- Upload a PDF or paste text; the server extracts text and runs a PM-specific audit.
- If the AI call fails, a built-in heuristic engine (`lib/resumeAuditEngine.ts`) still returns an audit.
- Audits are saved to the user's `resumes` collection.

### 5.4 LinkedIn Optimiser (`/tools/linkedin-optimiser`)
- Paste a public LinkedIn URL (scraped with Firecrawl) or fill in sections manually.
- Returns a score dashboard, rewrites for headline and about, experience analysis, a keyword gap against target roles and a step-by-step action plan.
- Analyses are saved to the user's `analyses` collection.

### 5.5 Real-World Projects (`/projects`)
- 6 case briefs across Beginner, Intermediate and Advanced: food delivery win-back, B2B SaaS activation, ride-hailing North Star, EdTech AI tutor launch, fintech market entry, e-commerce launch post-mortem.
- Each brief has context, a problem statement, deliverables, constraints, evaluation criteria and hints.
- Signed-in users submit a write-up (at least 200 characters) and get AI feedback: an overall score, a verdict, per-criterion scores, strengths, improvements and next steps. Submissions are saved server-side.

### 5.6 Supporting pages
- Landing page, About, Resources library, Career Tools hub, Profile (stats, history, saved work), onboarding, email verification and password-reset pages.
- Transactional emails (verification, password reset, welcome) via Resend.

## 6. Access model

| Area | Signed out | Signed in, email not verified | Signed in and verified |
|---|---|---|---|
| Landing, About, Resources | Yes | Yes | Yes |
| Lessons Day 0 to 7 | Yes | Yes | Yes |
| Lessons Day 8 onward | Prompted to log in | Verify gate | Yes |
| Profile and protected tools | Redirect to home | Verify gate | Yes |
| Interview evaluation, project feedback | No (server returns 401) | Depends on token | Yes |

There are no paid plans today.

## 7. Non-goals (for now)
- Payments, subscriptions or paywalls.
- Human mentor marketplace or live cohorts.
- Native mobile apps.
- Job board or recruiter-side features.

## 8. Constraints
- AI runs on a free-tier Gemini key (20 requests per day per project on `gemini-3.8-flash`), with failover to cheaper Gemini models and OpenAI if configured. Expect 503 and 429 errors under load.
- One non-technical owner ships through PRs; Vercel builds a preview per PR and deploys `main` to production.
- No automated CI yet.

## 9. Open questions
- When to move the live site to a paid Gemini key (recommended before real traffic).
- Whether to add in-app Metrics interview scenarios so all 5 types are practisable.
- Whether and how to monetise (premium interviews, project reviews, cohort access).

See [tasks.md](tasks.md) for the backlog and [architecture.md](architecture.md) for how it is built.
