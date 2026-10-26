---
target: components/LandingPage.tsx
total_score: 15
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:D:\\THENOOBPM\\PM-Launchpad-app\\components\\LandingPage.tsx"
target_fingerprint: "sha256:a683b1c7bed32a3c6dd1a159fa1f90349c7192d185e2cbb38df5c574afc24530"
target_path: "D:\\THENOOBPM\\PM-Launchpad-app\\components\\LandingPage.tsx"
timestamp: 2026-10-26T14-42-42Z
slug: components-landingpage-tsx
closed: true
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Newsletter shows "Subscribed!" without sending anything (L1253) |
| 2 | Match System / Real World | 2 | "pillars" vs product's "tracks"; "45 Days" vs 46 lessons; idioms and unexplained jargon (PDLC, JTBD, RICE) |
| 3 | User Control and Freedom | 2 | Search: no Escape, unlabeled close (L247); hover-only nav dropdowns |
| 4 | Consistency and Standards | 1 | Practice/Practise, "Linkedin"; emoji nav icons vs lucide; rainbow icon hues vs one green; serif italic instead of Caveat |
| 5 | Error Prevention | 2 | Search no-match is blank; dead footer links beside an email form |
| 6 | Recognition Rather Than Recall | 3 | Cards labelled; mobile menu uses `Layers` icon |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 2 | 9 header items, 10-word orbit, 6- and 8-card grids, 8,358px phone scroll |
| 9 | Error Recovery | 1 | No empty/error states (newsletter, search, assets) |
| 10 | Help and Documentation | n/a | Landing page |
| **Total** | | **15/32** | **Poor (47%)** |

## Design Specificity Verdict

LLM: category-interchangeable edtech template (hero+illustration, testimonial marquee, six-tools grid, icon-card grid, numbered steps, gradient CTA, 4-col footer). Authored moments: "NooB In. PM Out." (L623) and Launchpad Day-1 preview card (L880–905). Missing ownable assets: 4 interviewers, scorecard, Real-World Projects, catalogue facts (46/225/7/6). Hero orbit (HeroSkillOrbit.tsx) shows generic soft-skill words, not the product.

Deterministic: static detect 0 findings (LandingPage, Logo, RocketIllustration). Browser overlay: 9 desktop / 17 phone. Real: undersized text 8px eyebrow (L290), 9px New badge (L383), 10px orbit labels on phone (HeroSkillOrbit.tsx:81); low contrast footer slate-500 on dark 3.7:1 (L1236–1239) and placeholder 3.4:1 (L1272); skipped heading h2→h4 (L807→L849); marquee; tap targets search 36px / menu 40px (L500–510). Likely false positives: low-contrast on #faf9f6 (mid-fade reveal captures); kicker-above-heading (pattern).

## Priority Issues

- [P0] Fabricated proof: "Trusted by 1,000+" + avatars (L771), hard-coded rating 5 + stars (L79–115, L855), unsourced "Built by PMs." (L807) and "mapped to what hiring managers test" (L1050). Fix: remove; use catalogue facts "46 day-lessons · 225 scenarios · 4 AI interviewers · 6 project briefs · Free". Command: clarify.
- [P1] Page doesn't show the all-in-one path; Projects missing from tools grid; hero is abstract orbit; personas and scorecard absent. Fix: five connected steps incl. Projects; real artifact (scorecard snippet or 4 personas) in hero; merge How-it-works. Command: shape, layout.
- [P1] Dishonest/broken states: fake newsletter success (L1253–1261); "score after every answer" (L192) misdescribes end-of-session scorecard; dead Privacy/Terms (L1238–1239); search no empty state/Escape/label; logo is clickable div (L283). Command: harden.
- [P2] Brand/type drift: rainbow icons incl. hex indigo/violet (L128–184), emoji nav (L322–433), serif italic not Caveat (L776, L1175), 8px eyebrow (L290), mixed greens, slate vs zinc, footer contrast, skipped heading. Command: typeset, colorize.
- [P2] No sign-up reassurance (Day 8 wall unannounced), 3 competing sign-up CTAs, 6/8-card grids, 8,358px phone page with 8 open pillars. Fix: "Days 0–7 open now, no account needed…" under CTAs; collapse pillars on phone. Command: distill, onboard.

## Persona Red Flags

- Jordan: Layers menu icon; unexplained PDLC/JTBD/RICE/RAG/ATS; "Start learning free" vs "Sign up free" unclear; Day 8 wall unmentioned.
- Riley: newsletter accepts anything; blank search with no Escape; single-item Learn dropdown; 4 dead footer links; marquee renders 28 cards (screen readers repeat 4x).
- Casey: animated orbit PNG under CTAs; marquee only pauses on hold; final CTA ~7,000px down; footer email input text-sm (iOS zoom); 36/40px tap targets.
- Career switcher abroad: India-only jobs cues and testimonials; "B-school casebooks", "goldmines"; nothing addressed to switchers.

## Minor Observations

- "Starts with Day 1" (L897) though Day 0 exists; "45 Days" vs "45-Day".
- "NEW" badge twice (L383, L964).
- Testimonial bg #FCFDFE vs page #FAF9F6 seam.
- Blur blobs (L612) and gradient final CTA (L1146) are template decoration.
- Unused imports/state (completedDemoDays L45).
- Two React Router v7 future-flag warnings.

## Questions to Consider

- Would a scorecard with a "Lean Yes" verdict convert better than a Day 1 lesson? Why does the hero show neither?
- What if Maya, Alex, Priya and Marcus were the hero?
- Can the page win on honesty: "Free. No cohort. No paywall. Here's exactly what you get: 46 / 225 / 4 / 6"?
