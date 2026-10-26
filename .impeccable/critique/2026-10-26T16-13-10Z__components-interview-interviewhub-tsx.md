---
target: components/interview/InterviewHub.tsx
total_score: 18
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
target_identity: "file:D:\\THENOOBPM\\PM-Launchpad-app\\components\\interview\\InterviewHub.tsx"
target_fingerprint: "sha256:5ec4d5dd48ab7900c71cea392617d0d15594cc0253ddf8fdf71266a5a93bd135"
target_path: "D:\\THENOOBPM\\PM-Launchpad-app\\components\\interview\\InterviewHub.tsx"
timestamp: 2026-10-26T16-13-10Z
slug: components-interview-interviewhub-tsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | No result count after filter/search; chips have no pressed state; no "done" marker on cards |
| 2 | Match System / Real World | 2 | Search ignores type names ("guesstimate" = 0, :142-145); jargon practice points |
| 3 | User Control and Freedom | 2 | Past Scorecards is a raw div, no Escape/dialog (:831); Escape from setup drops focus to body; saved cases unviewable |
| 4 | Consistency and Standards | 1 | Blur blobs, eyebrow labels, rainbow category dots, black selected chip, slate+zinc mix |
| 5 | Error Prevention | 2 | Voice default (SetupModal.tsx:41); guests learn about sign-in only on click |
| 6 | Recognition Rather Than Recall | 2 | No Saved view, no Done marker, chosen level not shown on cards |
| 7 | Flexibility and Efficiency | 1 | No company filter/sort/recommendation; 225 cards at once; only small CTA clickable |
| 8 | Aesthetic and Minimalist Design | 2 | Type named 3x per card; "0 Sessions / No score yet" to guests |
| 9 | Error Recovery | 3 | Clear empty state with Reset; doesn't name the blocking filter |
| 10 | Help and Documentation | 1 | No "what a mock is like / what you get"; Full loop help is hover-only (:589) |
| **Total** | | **18/40** | **Poor** |

## Design Specificity Verdict

LLM: mostly generic AI-edtech hub; only cards are product-specific. Hero = blur blobs (:339-362), off-palette robot (:364-493), slogan, frosted stat tiles. Missing ownable assets: Priya (the only active interviewer, ACTIVE_INTERVIEWER_ID='priya') replaced by a robot; scorecard hidden; 7 types only as chips. First card ~650px down desktop, ~1.7 screens on phone.

Deterministic: static detect 0 real, 16 advisory font-size (11px x12). Overlay 19 @1440 / 14 @390: low contrast hero stat labels 4.2:1 (:506-545), "YOU'LL PRACTICE" 2.6:1 (:734), placeholder 2.6:1 (:623); skipped heading (h1 then 225 h3); nested stat panels (:500-545). Facts: no overflow; all names present; tap-targets OK; focus visible; Escape from SetupModal returns focus to body; MAIN 37,760px desktop / 101,644px phone, 465 controls. Canva tile contrast/palette = brand-logo exception.

## Priority Issues

- [P0] Cold login wall: every CTA opens "Welcome Back / LOG IN" (initialMode="login", :781-796) with no case context. Fix: signup mode, name the case + benefit, resume Full loop / Past Scorecards after sign-in. Command: onboard.
- [P1] 225-case wall, weak search: no count/company filter/sort; search skips type names & synonyms; free-text companies; all cards render (~101k px phone); bookmarks unviewable. Fix: search type labels+synonyms, live "Showing N", company filter, 12 + Show more or group by type, Saved filter. Command: layout + harden.
- [P1] Generic hero vs ownable assets: blobs, robot, nested frosted stats (4.2:1), guest zero-stats, cases below fold. Fix: compact Paper header, Priya avatar + one line, mini scorecard preview in Honest Scoreboard colours, progress only when signed in. Command: distill + bolder.
- [P2] Card noise & drift: type x3, eyebrows (2.6:1), category dots reuse meaning colours (amber/rose), check icons read "done", black selected chip, logo pastiches, slate. Fix: one meta line, neutral bullets, Mint Wash + Coach Green selected chip with aria-pressed, neutral letter tiles, zinc. Command: quieter + polish.
- [P2] A11y & modals: Past Scorecards no dialog/Escape/focus trap (:831), verdict pill always emerald (:888); setup Escape loses focus; chips no aria-pressed; search unlabeled; no live count; skipped heading; voice default; inconsistent step numbering. Fix: shadcn Dialog, verdict colours by value, return focus, aria-pressed, label, live region, h2s, safe default. Command: harden.

## Persona Red Flags

- Alex: hero pushes cases down; no company filter/sort/random; card not clickable; no count/Done; saved unreachable.
- Sam: chips no pressed state; unlabeled search; scorecards modal no dialog/Escape; focus lost after setup Escape; silent result changes; 15 filter stops then up to 450 card buttons.
- Jordan: no start-here; types unexplained; jargon/idioms; Welcome Back wall; voice default, "Minutes Allocation".
- Career switcher abroad (phone, company loop): first case ~1.7 screens down; no company filter; Full loop not company-aimable, help hover-only; ~100k px page; no count after filter.

## Minor Observations

- Dead AccessRequestModal (:42, 799-803), unused imports; black Reset button; key={i} in history; "v1/v2/v3 rubric" jargon (:852); Test Microphone in text mode; robot SVG text in system-ui; forwardRef warning from components/ui/dialog.tsx.

## Questions to Consider

- Why is a robot the face of the studio if Priya is the interviewer?
- Does a Meta-loop candidate need 225 cards, or two questions and three suggestions?
- What if guests saw a real scorecard before the login wall?
