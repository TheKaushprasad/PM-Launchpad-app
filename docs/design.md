---
name: The NooB PM
description: A calm green practice field for aspiring product managers to learn, drill and get honest scores.
colors:
  pitch-green: "#064e3b"
  pitch-green-deep: "#043c2c"
  coach-green: "#047857"
  signal-green: "#059669"
  mint-wash: "#ecfdf5"
  mint-line: "#a7f3d0"
  floodlight-mint: "#7ee2b0"
  night-field: "#0f1a16"
  paper: "#fafaf9"
  card-white: "#ffffff"
  ink: "#18181b"
  graphite: "#3f3f46"
  muted-zinc: "#71717a"
  hairline: "#e4e4e7"
  chip-fill: "#f4f4f5"
  caution-amber: "#b45309"
  caution-wash: "#fffbeb"
  alert-rose: "#e11d48"
  alert-wash: "#fff1f2"
  info-blue: "#3b82f6"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(3rem, 7vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.33
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-lesson:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.1em"
  hand:
    fontFamily: "Caveat, cursive"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "24px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.pitch-green}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.pitch-green-deep}"
  button-secondary:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-brand-cta:
    backgroundColor: "{colors.coach-green}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
    height: "48px"
    padding: "0 16px"
  card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  chip:
    backgroundColor: "{colors.mint-wash}"
    textColor: "{colors.coach-green}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  band-dark:
    backgroundColor: "{colors.pitch-green-deep}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.2xl}"
    padding: "48px"
---

# Design System: The NooB PM

Taken from the code (`index.css`, `components/ui`, the pages in `components/`) on 2026-10-26. Product facts, users, voice and principles live in [`PRODUCT.md`](../PRODUCT.md); this file is strictly visual. The frontmatter tokens are normative: when the prose and a token disagree, the token wins.

## Overview

**Creative North Star: "The Practice Field"**

The NooB PM is a calm, green training ground. Learners come here to drill: read a short lesson, run a mock interview, fix a resume, and get an honest score back. The interface should feel like a well-kept practice pitch: open warm off-white space, one confident green, clear lines marking where things are, and a scoreboard that tells the truth. Nothing is decorated for its own sake. Energy comes from progress (a completed day, a verdict pill, a filled pillar bar), not from ornament.

Density is moderate. Pages use generous padding and short line lengths so a beginner never feels buried, while working screens (the interview stage, scorecards, dashboards) stay compact and scannable. Type does the heavy lifting: Inter at weight 800 with tight tracking for headings, plain Inter for reading, and Caveat only as a coach's handwritten note in the margin.

The system rejects the generic edtech and SaaS template: gradient call-to-action banners, blurred colour blobs behind sections, rainbow-coloured icon tiles, and emoji used as icons. Those make the product look interchangeable with every course site; the practice field is quieter and more specific than that.

**Key Characteristics:**
- Warm off-white paper (`paper`) with white cards and hairline zinc borders.
- One accent family: Pitch Green for weight, Coach Green for action, Signal Green for focus and highlights.
- Inter 800 headings with tight tracking; Caveat only for handwritten coach notes.
- Flat at rest, lifts on use.
- Honest, consistent score colours everywhere a verdict appears.

## Colors

One green family on warm neutrals, with amber, rose and a single true blue held back for meaning.

### Primary
- **Pitch Green** (`pitch-green`): the main call to action ("Start learning free", "Sign up free"), the shadcn `primary` token, and the weight of the system. Hover deepens to **Pitch Green Deep** (`pitch-green-deep`), which also carries the dark hero and CTA bands.
- **Coach Green** (`coach-green`): links, active nav items, loaders, selected states, the caret, and the shadcn `brand` button. It is `--brand` and `brand-600` in `index.css`.
- **Signal Green** (`signal-green`): the focus ring and the highlighted half of a headline ("PM Out."). It is `brand-500`. Use it for emphasis, never as a large fill.
- **Mint Wash** (`mint-wash`) and **Mint Line** (`mint-line`): tinted backgrounds and borders for chips, selected cards and text selection (`brand-50`, `brand-200`).
- **Floodlight Mint** (`floodlight-mint`): the accent on dark surfaces only (the footer and dark bands), where Coach Green would be too dark to read.

The full `brand-50` to `brand-950` scale is defined in the `@theme` block of `index.css`. The old `indigo`, `blue`, `sky`, `violet` and `purple` class names are mapped to the same green as a safety net, so a class like `bg-indigo-600` renders green.

### Neutral
- **Paper** (`paper`): the page background, set on `body`. The landing page uses a near-identical `#FAF9F6`; treat both as Paper.
- **Card White** (`card-white`): cards, popups and inputs that sit on Paper.
- **Ink** (`ink`): primary text and headings (`zinc-900`).
- **Graphite** (`graphite`): long-form lesson prose (`zinc-700`), softer than Ink for comfortable reading.
- **Muted Zinc** (`muted-zinc`): secondary text and metadata (`zinc-500`). This is the lightest text allowed on white for anything people need to read.
- **Hairline** (`hairline`): the 1px border on cards, inputs and dividers (`zinc-200`).
- **Chip Fill** (`chip-fill`): subtle fills for inputs, chips and hover rows (`zinc-100`).
- **Night Field** (`night-field`): the footer background, a green-black.

Zinc is the neutral. Slate still appears in older pages (about a third of neutral uses); new work uses zinc only.

### Meaning colours
- **Caution Amber** (`caution-amber`) on **Caution Wash** (`caution-wash`): the Intermediate badge, "Lean No" verdicts, warnings.
- **Alert Rose** (`alert-rose`) on **Alert Wash** (`alert-wash`): errors, weak scores, "Strong No", the Advanced badge. It is also the shadcn `destructive` token.
- **Info Blue** (`info-blue`): "Lean Yes" and informational states. Because `blue-*` classes render green, a real blue must be written as a hex value (`#3B82F6`, `#2563EB`).

**The Honest Scoreboard Rule.** Verdict and score colours never change between screens: Strong Yes and scores of 85 or more in green, Lean Yes in Info Blue, Lean No in Caution Amber, Strong No in Alert Rose. A learner should be able to read a verdict from its colour alone, and always see the word as well.

**The One Green Voice Rule.** Green is the only accent. Icon tiles, badges and section highlights use the green family or neutrals, never a rainbow of hues. Amber, rose and blue appear only when they carry meaning.

**Persona colours** are the one sanctioned exception: the interview avatars keep their gradients (Maya amber to rose, Alex blue to indigo, Priya purple to pink, Marcus emerald to teal). Alex and Priya use hex values so they stay blue and purple.

## Typography

**Display Font:** Inter (with sans-serif)
**Body Font:** Inter (with sans-serif)
**Accent Font:** Caveat (with cursive), for handwritten notes only

**Character:** One sturdy sans in heavy and regular weights does all the work, like a coach's whiteboard. Caveat is the coach's scribble in the margin, used sparingly so it stays special.

### Hierarchy
- **Display** (800, 3rem to 4.5rem, line height 1.05): the landing hero and other single-statement openers. One per page.
- **Headline** (800, 2.25rem to 3rem, line height 1.05, tracking -0.035em): section headings on marketing pages and page titles in the app.
- **Title** (800, 1.5rem): card titles, scorecard section titles, lesson h3.
- **Body** (400, 1rem, line height 1.6): app text, descriptions and forms.
- **Body Lesson** (400, 1.125rem, line height 1.7, Graphite, max 75ch): lesson prose inside `.prose`. Lesson h1 is 2.5rem, h2 1.875rem, h3 1.5rem.
- **Label** (700, 0.75rem, tracking 0.1em, uppercase, Muted Zinc or lighter): small section labels and metadata. Never below 11px.
- **Hand** (Caveat 600, around 1.5rem): annotations and playful callouts. Never body text, never a heading.

`h1` to `h4` get weight 800 and tracking -0.025em globally; `font-black` is capped at 800 in `@theme`. Headings use `text-wrap: balance` and paragraphs `text-wrap: pretty`. On touch screens below 1024px every text field is 16px so iOS doesn't zoom on focus.

**The Real Handwriting Rule.** A handwritten accent is set in Caveat, never in a serif italic or a browser-default font standing in for it.

**The Readable Floor Rule.** No text people need to read is smaller than 11px, and body text on phones stays at 16px.

## Layout

- **App shell** (`MainShell` in `App.tsx`): from 1024px (`lg`) a fixed left sidebar; below that, a top bar with a menu button opens the sidebar as a drawer. The shell is `h-dvh` and content scrolls in its own container. Full-height screens use `dvh`, never `vh`, so mobile browser bars never hide the bottom.
- **Sidebar order:** the 8 learning tracks, then AI Mock Interview (with an "AI" badge), Real-World Projects, Resources, Career Tools and User Profile.
- **Containers:** centred, `max-w-7xl` (1280px) for marketing and wide pages, `max-w-4xl` to `max-w-6xl` for app pages, with 16px side padding on phones rising to 32px on desktop.
- **Grids:** 1 column on phones, 2 to 3 on desktop. Card padding is 16px on small cards and 24px on standard ones (the most common values).
- **Rhythm:** tight inside a group (8 to 16px), generous between groups (32 to 48px), more space above a heading than below it.
- **Reading:** lessons are long-form pages with a 75ch measure that remember the reader's scroll position.
- **Phones:** every page works at 390px with no horizontal scroll. `body` has `overflow-x: hidden`, but layouts must not rely on it.

## Elevation & Depth

Flat at rest, lift on use. Surfaces sit on Paper with a Hairline border and, at most, a near-invisible shadow. Shadow grows only as a response: a card lifts on hover, a primary button gains a soft shadow on hover, and popups and modals float above a dimmed backdrop with a large soft shadow. Depth is never decoration.

### Shadow Vocabulary
- **Resting hairline** (`box-shadow: 0 1px rgb(0 0 0 / 0.05)`, Tailwind `shadow-2xs`): buttons and cards at rest. The most common shadow in the app.
- **Resting soft** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`, `shadow-xs`): inputs and small raised controls.
- **Lift** (`box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`, `shadow-md`): hover state for cards and primary buttons.
- **Green lift** (`box-shadow: 0 8px 24px -12px rgba(6, 78, 59, 0.25)`): hover on green-tinted feature cards.
- **Popup** (`box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)`, `shadow-2xl`): modals, the search dialog, dropdowns.

**The Earned Shadow Rule.** If nothing is being hovered, focused or opened, it doesn't get more than a hairline shadow.

The `.glass` panel (70% white, 12px blur) is reserved for panels floating over imagery or video, such as the interview stage. It is not a general card style.

## Shapes

Generously rounded and friendly, never sharp. Corners step up with the size of the surface: 8 to 12px (`md`/`lg`) on inputs and small buttons, 16px (`xl`) on standard cards, 24px (`2xl`) on large feature cards and dark bands, and full pills on primary buttons, chips and avatars. `rounded-xl` (12px) is the single most used radius. Borders are 1px Hairline; there are no thick coloured side borders. Icons are lucide-react line icons at 16 to 20px in one stroke weight.

## Components

Sturdy and friendly: bold labels, rounded corners, clear borders, nothing fragile or fussy.

### Buttons
- **Shape:** full pill (9999px) for page-level CTAs; 12px corners (`lg`) for buttons inside cards and popups.
- **Primary:** Pitch Green fill, white bold text, about 12px by 24px padding. Hover deepens to Pitch Green Deep and lifts to the Lift shadow.
- **Popup CTA:** `<Button variant="brand" size="cta">`, a 48px tall Coach Green button with uppercase extra-bold text, used for the main action in dialogs.
- **Secondary:** Card White with a Hairline border and Ink text; hover fills Chip Fill.
- **Focus:** a 2px Signal Green outline with a 2px offset (global `:focus-visible`).
- **Touch:** small controls add `tap-target` (an invisible 44px touch area on touch screens). Rows of wrapping chips use `inline-flex items-center pointer-coarse:min-h-11` instead so touch areas don't overlap.

### Chips and badges
- **Style:** small pill, tinted wash background with matching text and border (Mint Wash with Coach Green; Caution Wash with Caution Amber; Alert Wash with Alert Rose).
- **Uses:** difficulty (Beginner green, Intermediate amber, Advanced rose), track, the "AI" badge, and the verdict pill on scorecards.

### Cards / Containers
- **Corner style:** 16px (`xl`), 24px for large feature cards.
- **Background:** Card White on Paper; Mint Wash for selected or highlighted cards.
- **Shadow strategy:** resting hairline, Lift on hover (see Elevation & Depth).
- **Border:** 1px Hairline.
- **Internal padding:** 16px small, 24px standard, 32px feature.

### Inputs / Fields
- **Style:** Card White, 1px Hairline border, 12px corners, Ink text, placeholders in zinc-400 or darker.
- **Focus:** border shifts to Signal Green with a soft green ring.
- **Error / disabled:** Alert Rose border and ring with the message beneath; disabled at 50% opacity.

### Navigation
- **Sidebar:** Inter semibold labels with lucide icons; the active item gets green text (Coach Green, or `#065F46` for the icon) on a Mint Wash fill with a faint `brand-100` border. On phones and tablets it becomes a drawer behind a top bar.
- **Landing header:** sticky on Paper with a backdrop blur and a bottom Hairline; Sign In as a secondary pill, Sign up free as a primary pill.

### Modals
A centred Card White panel over a dimmed backdrop, with a framer-motion fade and scale. New popups use the shadcn `Dialog` with a `DialogTitle`, so Escape, focus trapping and screen readers work.

### Score Dashboard (signature component)
The scoreboard of the practice field, used by the interview scorecard, the resume and LinkedIn dashboards, and project feedback. It has a big overall number (0 to 100), a verdict pill in the Honest Scoreboard colours, per-pillar progress bars, and evidence quotes from the learner's own work. It always shows the word with the colour, and never shows a score the evaluator didn't give.

### States
Every feature handles them visibly:
- **Loading:** a spinning `Loader2` in Coach Green with a short uppercase caption, never a blank screen.
- **AI busy or failed:** a friendly retry message ("Our AI is busy, try again in a minute") with a retry action.
- **Signed out:** explain the benefit and open the auth modal rather than failing silently.
- **Empty:** a one-line explanation and the next action ("No interviews yet, start your first one").
- **Insufficient input:** say exactly what is missing.

### Motion
- **One easing:** `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`), a quick start and soft landing, on all buttons and links.
- **Page and modal transitions:** framer-motion, plus `.page-transition` (0.3s).
- **Scroll reveal:** GSAP ScrollTrigger through `data-reveal` (fade and rise) or `data-reveal-stagger` (cards follow one another), wired by `components/motion/useScrollReveal.ts`. Never on an element that already animates with framer-motion.
- **The landing hero** is the one authored entrance: "NooB In." then "PM Out." (`.hero-line`), then the product settles in (`.hero-shot`).
- **Path progress** (`components/motion/usePathProgress.ts`): on the landing page's numbered path, a 2px Coach Green line fills down the grey rail with the scroll, and each step number turns Pitch Green when the line reaches it (reversing on the way up). Use it only where the order of steps is the message; it replaces the stagger reveal on that list, never adds to it.
- **Reduced motion:** everything above switches off under `prefers-reduced-motion`.

### Browser surfaces
Selection is Mint Line with dark green text, the caret is Coach Green, scrollbars are thin (6px) with pale green thumbs, and links have a 3px underline offset. Keep these themed when adding new surfaces.

## Do's and Don'ts

### Do:
- **Do** use Pitch Green (`#064E3B`) for the main action and Coach Green (`#047857`) for links and active states, and keep every other accent meaningful.
- **Do** use zinc for every neutral in new work; convert slate to zinc when you touch a page.
- **Do** keep verdict colours identical everywhere: green for Strong Yes and 85+, Info Blue for Lean Yes, Caution Amber for Lean No, Alert Rose for Strong No, always with the word.
- **Do** write a real blue as a hex value (`#3B82F6`), because `blue-*` classes render green.
- **Do** set handwritten accents in Caveat.
- **Do** keep cards flat at rest (1px Hairline, hairline shadow) and add lift only on hover, focus or for popups.
- **Do** use lucide-react icons at 16 to 20px for every icon.
- **Do** give small controls `tap-target`, and keep phone text fields at 16px.
- **Do** design the loading, AI busy, signed-out, empty and insufficient-input states for every feature.
- **Do** use shadcn components from `components/ui` for new work, with `<Button variant="brand" size="cta">` for the main action in popups.

### Don't:
- **Don't** use gradient call-to-action banners or gradient text.
- **Don't** put blurred colour blobs behind sections as decoration.
- **Don't** colour icon tiles in a rainbow of hues (indigo, violet, pink, orange); use the green family or neutrals.
- **Don't** use emoji or Unicode symbols (such as ▶) as icons.
- **Don't** fake the Caveat accent with a serif italic.
- **Don't** set readable text below 11px, or use text lighter than zinc-500 on white for anything people need to read.
- **Don't** put an eyebrow or kicker label above a heading; let the heading speak.
- **Don't** add thick coloured side borders to cards, callouts or alerts.
- **Don't** use `vh` for full-height screens; use `dvh`.
- **Don't** add animation to an element that already animates with framer-motion, and don't run continuous motion without a reduced-motion fallback.

## Known gaps

- Slate is still used in older pages alongside zinc, and the landing page mixes several hex greens (`#059669`, `#047857`, `#064E3B`) with `emerald-*` classes alongside `brand-*`.
- The landing page still has rainbow pillar icons, emoji nav icons and serif-italic accents (see the 2026-10-26 critique in `.impeccable/critique/`).
- Tailwind v4 is compiled from `index.css`, which carries compatibility rules so pages keep their v3 spacing (border colour, text line heights, `space-y`).
- `RocketIllustration.tsx`, the logo and `Resources.tsx` company colours keep their original hex blues on purpose.
- No dark mode.
- Fonts load in two separate `<link>` tags in `index.html` (Caveat, then Inter); merge them when touching it.
