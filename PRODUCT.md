# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

Responsive web app at thenoobpm.com, used on phones, tablets and desktops. No native apps (a PRD non-goal).

## Users

Anyone trying to break into product management or grow early in the role, worldwide. Three groups carry equal weight:

- **Students and fresh graduates** who need a structured path from zero and a first portfolio.
- **Career switchers** (engineers, designers, analysts, consultants, sales) who need interview practice and a resume that presents their past work as PM work.
- **Junior PMs** (APM to about 2 years in) who want sharper frameworks, metrics and strategy practice.

There is no market priority. India is where the product started and is well served (Indian-English interviewer voice, India and remote jobs), but design and copy must not assume an Indian-only audience.

The job they are doing: getting hired into a PM role, or getting better at one, without paying for a cohort or hunting for scattered free material and practice partners.

## Product Purpose

One place where an aspiring PM can learn the craft day by day, practise real interviews against an AI interviewer, fix their resume and LinkedIn, build portfolio projects with feedback, and find openings, for free.

Success means learners move through the curriculum, practise interviews every week, trust the feedback they get, use the career tools, submit projects, and ultimately land PM roles. Today this is tracked through progress and streaks, interview sessions, the evaluator's golden-set pass rate, resume and LinkedIn analyses, project submissions, and sign-ups and landing conversion.

## Positioning

**The all-in-one PM career kit.** Other options cover one step: a course teaches, a mock-interview partner practises, a resume service rewrites. The NooB PM joins the whole path in one account: learn → practise interviews → fix resume and LinkedIn → build projects → find jobs. Saved progress, scorecards, audits and submissions sit together in the learner's profile.

## Operating Context

- **Learning journey:** 46 day-lessons (Day 0 to Day 45) across 8 tracks (Foundations, Research, Strategy, Data, Tech, AI, Design, Job Ready). Long-form reading with assignments, resources, notes, bookmarks, completion and resume-where-you-left-off.
- **AI Mock Interview Studio:** 225 scenarios across 7 interview types, levels APM / PM / Senior PM, an optional 3-round loop, 4 interviewer personas (Maya, Alex, Priya, Marcus), avatar, voice, chat and text modes, hints, a scratchpad, an estimation cheat sheet and an optional webcam mirror. Ends in a scorecard: 5 weighted pillars, a 0–100 score, a hiring verdict (Strong Yes, Lean Yes, Lean No, Strong No), evidence quotes, strengths, growth areas and an exemplar answer.
- **Career tools:** Resume Auditor (PDF or pasted text, with a non-AI fallback engine) and LinkedIn Optimiser (URL or manual entry, with a score, rewrites, keyword gap and action plan).
- **Real-world projects:** 6 fictional case briefs (Beginner to Advanced). Submit a write-up and get AI feedback.
- **PM jobs board:** APM to CPO roles in India and remote, taken only from legal public sources and refreshed daily.
- Learners often use it in short sessions on a phone, alongside job applications and interview prep.

## Capabilities and Constraints

- **Access:** Days 0 to 7, the landing page, About and Resources are open to everyone. Later days, the profile and saved AI results need sign-in and a verified email. There are no paid plans, and payments are a current non-goal. Whether and how to monetise is still undecided.
- **AI is on a free tier and often busy.** Every AI surface needs a friendly busy or retry state, and a non-AI fallback where it is cheap. Scores, verdicts and feedback are written by the server only.
- **The interview evaluator's safeguards are product truth:** grounded evidence quotes, an injection cap at 69 (never a Yes), and an "insufficient" result for sessions that end too early. The UI must never imply a score the evaluator didn't give.
- **Terminology:** "Day N" lessons, tracks, scenarios, personas, scorecard, pillars, verdict, Real-World Projects, Career Tools.
- **Operations:** one non-technical owner ships through PRs with Vercel previews. There are no human mentors, live cohorts, job board for recruiters or recruiter-side features.

## Brand Commitments

- Name: **The NooB PM** (logo in `components/Logo.tsx`). Programme name on the About page: "45-Day Product Management Launchpad".
- Voice: a friendly mentor for beginners. Encouraging, practical, a little playful, never corporate. Plain English, second person, short sentences, concrete outcomes. Jargon only when the lesson is teaching it.
- The four interviewer personas and their names are fixed parts of the product.

## Evidence on Hand

- **Learner testimonials** in `components/LandingPage.tsx` are real, and the learners agreed to be shown. They can be used as proof.
- **Usage numbers exist.** The owner will supply real sign-up, learner or interview counts. Until those figures arrive, do not show any counts, ratings or outcome stats, and never invent them.
- Real catalogue facts can be stated as proof: 46 lessons, 8 tracks, 225 interview scenarios, 7 interview types, 4 personas, 6 project briefs.
- No press coverage, partner logos or hiring-outcome data are on record. Do not fabricate any.

## Product Principles

1. **One continuous path.** Each feature should hand the learner on to the next step (lesson → interview → scorecard → resume → project → job), not sit apart as a separate tool.
2. **Honest feedback over flattery.** Scores and verdicts must be earned and grounded in evidence, because learners use them to judge whether they are ready to be hired.
3. **Free first, sign-in for value.** Show real value before asking for an account, and explain the benefit when sign-in is needed.
4. **Every state is handled.** Loading, AI busy, signed out, empty and insufficient input each get a clear message and a next action, never a blank screen.
5. **Beginner-safe.** Assume no prior PM knowledge and no local context. Explain the term, show an example, then ask for the work.

## Accessibility & Inclusion

- Every page must work at phone width with no horizontal scroll, and touch targets must be usable on phones.
- Voice and avatar interview modes always offer a chat or text alternative, so learners without a quiet room, a mic or a fast connection can still practise.
- Text people need to read keeps strong contrast, and icon-only controls have accessible labels.
- The audience is global, often non-native English speakers, so keep copy plain and avoid idioms that rely on local culture.
