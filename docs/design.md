# Design

The visual language and UX patterns of thenoobpm.com, taken from the current code. Last updated 2026-10-09. Use this as the reference when adding or changing a page so new work looks like the rest of the site.

## 1. Brand

- Name: **The NooB PM** (logo in `components/Logo.tsx`).
- Personality: friendly mentor for beginners. Encouraging, practical, a little playful (the rocket illustration, handwritten Caveat accents), never corporate.
- Voice in copy: plain English, second person ("your PM journey"), short sentences, concrete outcomes. Avoid jargon unless the lesson is teaching it.

## 2. Colour

Tailwind's default palette, loaded from the CDN. Neutrals do most of the work; indigo is the brand accent.

| Role | Tailwind classes | Notes |
|---|---|---|
| Page background | `bg-[#fcfdfe]`, `bg-[#FDFDFD]`, `bg-white` | Near-white, set on `body` in `index.html` |
| Primary text | `text-zinc-900`, `text-slate-900` | Body text colour `#18181b` |
| Secondary text | `text-zinc-500`, `text-zinc-600`, `text-zinc-700` | Descriptions, metadata |
| Muted text and labels | `text-zinc-400`, `text-slate-400` | Small uppercase labels |
| Borders and dividers | `border-zinc-200`, `border-slate-200` | 1px, the default card border |
| Subtle fills | `bg-zinc-50`, `bg-zinc-100` | Inputs, chips, hover states |
| Brand accent | `text-indigo-600`, `bg-indigo-50`, `bg-indigo-600` | Primary buttons, links, active nav, loaders (`--brand-indigo: #6366f1`) |
| Success | `text-emerald-600/700`, `bg-emerald-50` | Completed lessons, strong scores, Beginner badge |
| Warning | `text-amber-700`, `bg-amber-50`, `border-amber-200` | Intermediate badge, cautions |
| Danger | `text-rose-*`, `text-red-*` | Errors, weak scores, Advanced badge |
| Info | `text-blue-600`, sky `#38BDF8`, `#79BAEC` | Illustrations, secondary highlights |
| Dark surfaces | `#0F172A` (slate-900) | Hero blocks, interview stage |

Persona gradients (interview avatars): Maya amber to rose, Alex blue to indigo, Priya purple to pink, Marcus emerald to teal.

Score and verdict colours should stay consistent everywhere: Strong Yes and 85+ in emerald, Lean Yes in indigo or blue, Lean No in amber, Strong No in rose.

## 3. Typography

- **Inter** (300 to 900) for everything; set on `body`.
- **Caveat** (500 to 700) for handwritten accents only (annotations, playful callouts), never for body text.
- Headings: weight 800, letter-spacing `-0.025em`.
- Lesson prose (`.prose`): h1 2.5rem, h2 1.875rem, h3 1.5rem; paragraphs 1.125rem, line-height 1.7, colour `#3f3f46`, max width 75ch.
- Small labels: `text-xs font-bold uppercase tracking-widest text-zinc-400`.

## 4. Layout

- App shell (`MainShell` in `App.tsx`): left `Sidebar` on desktop, a top bar with a menu button on mobile. Content scrolls in its own container.
- Sidebar groups: the 8 learning tracks (Foundations, Research, Strategy, Data, Tech, AI, Design, Job Ready), then AI Mock Interview (with an "AI" badge), Real-World Projects, Resources, Career Tools and User Profile.
- Pages use a centred max-width container with generous padding; cards sit in responsive grids (1 column on mobile, 2 to 3 on desktop).
- Lessons are long-form reading pages that remember the reader's scroll position.

## 5. Components and patterns

| Pattern | Look | Where |
|---|---|---|
| Card | White, `border border-zinc-200`, large radius (`rounded-2xl` / `rounded-3xl`), soft shadow on hover | DayCard, project cards, tool cards |
| Primary button | Indigo or near-black fill, white bold text, `rounded-xl` or `rounded-full` | CTAs |
| Secondary button | White with zinc border, zinc text | Cancel, back |
| Badge / chip | Small rounded pill, tinted background and matching text and border | Difficulty, track, "AI" |
| Glass panel | `.glass`: 70% white, 12px backdrop blur, faint border | Floating panels over imagery |
| Modal | Centred card over a dimmed backdrop, framer-motion fade and scale | Auth, setup, scratchpad, access request, save details |
| Loader | `Loader2` spinning in indigo plus an uppercase caption | Route and session loading |
| Score dashboard | Big overall number, verdict pill, per-pillar progress bars | Interview scorecard, LinkedIn and resume dashboards, project feedback |
| Icons | lucide-react, 16 to 20px, stroke style | Everywhere |
| Motion | framer-motion for page and modal transitions; `.page-transition` uses `cubic-bezier(0.4, 0, 0.2, 1)` over 0.4s | Pages, modals |
| Scrollbars | Thin 6px, slate thumbs | Global |

## 6. Key flows

1. **First visit**: landing page, then "Start learning" to the dashboard. Days 0 to 7 open without an account.
2. **Sign up**: auth modal (Google or email and password), email verification gate, onboarding (profession, experience, college or company), then dashboard.
3. **Learn**: dashboard, filter by track, open a day, read, take notes, mark complete. Locked days prompt sign-in.
4. **Mock interview**: Interview Studio, pick a scenario (filter by type, difficulty, company), setup modal (persona and mode), interview stage (avatar, voice or chat, with hints and scratchpad), end session, scorecard, saved in history.
5. **Resume audit**: upload a PDF or paste text, audit dashboard, saved to profile.
6. **LinkedIn**: paste URL or fill the form, score dashboard with rewrites, keyword gap and action plan.
7. **Project**: projects hub, open a brief, write the submission, get AI feedback, see the status on the hub card.

## 7. States every feature should handle

- Loading: spinner with a short caption, never a blank screen.
- AI busy or failed: a friendly retry message ("Our AI is busy, try again in a minute"); the free Gemini tier returns 503 and 429 often.
- Signed out: explain the benefit and open the auth modal instead of failing silently.
- Empty: a one-line explanation and the next action (for example "No interviews yet, start your first one").
- Insufficient input: say what is missing (for example a project write-up under 200 characters, or an interview that ended too early to score).

## 8. Accessibility and responsiveness

- Every page must work at phone width with no horizontal scroll (`overflow-x: hidden` is set on `body`, but layouts should not rely on it).
- Keep text contrast at zinc-500 or darker on white for anything users need to read.
- Icon-only buttons need a `title` or `aria-label`.
- Voice and avatar interview modes must always have the chat mode as an alternative.

## 9. Gaps to fix

- Tailwind comes from the CDN with no config file, so there is no single source of design tokens and zinc and slate are used interchangeably. Pick one neutral (zinc) for new work.
- No dark mode.
- Fonts are loaded twice in `index.html` (Caveat in the head, Inter later); consolidate when touching it.
