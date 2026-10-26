---
target: jobs page
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:D:\\THENOOBPM\\PM-Launchpad-app\\components\\jobs\\JobsBoard.tsx"
target_fingerprint: "sha256:7381d7979dfdeb2042f60afce52705ea16d86506ba97fe9df47ed484fbcdde35"
target_path: "D:\\THENOOBPM\\PM-Launchpad-app\\components\\jobs\\JobsBoard.tsx"
timestamp: 2026-10-26T16-26-02Z
slug: components-jobs-jobsboard-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence). Note: the parent ran a URL detector scan before Assessment A was spawned; A stayed isolated from it.

Target: components/jobs/JobsBoard.tsx, rendered at https://www.thenoobpm.com/jobs (production; local dev server was down). Production is slightly behind local source (level label 10px live vs 11px local, L370/L451). Data at test time: 11 roles.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Count + "updated today" + loader good; failed saves silent; "Saved as my preferences" stays after filters change (L275) |
| 2 | Match System / Real World | 3 | Real PM level names; default "Last 7 days" applies no cutoff at all (L21-25, L119) |
| 3 | User Control and Freedom | 2 | Clear + Escape work; filters and open job not in URL, Back leaves the page |
| 4 | Consistency and Standards | 2 | Primary buttons zinc-900 not Pitch Green; slate/zinc mixed; hand-built drawer instead of shadcn Sheet/Dialog |
| 5 | Error Prevention | 2 | 5 of 11 level chips always yield 0 roles; "0-2 years" lets jobs with no experience data through (L31) |
| 6 | Recognition Rather Than Recall | 3 | All options visible; no counts on chips/cities |
| 7 | Flexibility and Efficiency | 2 | No sort, no shareable filter URL, saving prefs needs an account |
| 8 | Aesthetic and Minimalist Design | 2 | ~20 controls above the first job; on phone no job card above the fold (first card y≈920-998) |
| 9 | Error Recovery | 1 | Load error is red text with no retry (L286); empty state has no action (L296); save failures only console.warn (L143-145, L154-156) |
| 10 | Help and Documentation | 2 | Footer explains sources; nothing tells a beginner which levels fit them |
| **Total** | | **22/40** | **Acceptable** |

## Design Specificity Verdict

LLM assessment: category-interchangeable job board wearing NooB PM colours. Search + 3 selects + chip cloud + title/company/meta cards could be any board. Nothing reflects the beginner audience or connects a role to the interview studio, resume auditor or lessons, which breaks the "one continuous path" positioning. Hero blur blob (L173) and gradient band (L172) are DESIGN.md don'ts.

Deterministic scan: source scan 4 advisory design-system-font-size (L175 44px, L324/L370/L451 11px), 0 real. URL scan 24 desktop / 7 phone; on-target real findings: header meta contrast 3.7:1 (L183), search placeholder 2.6:1 (L195-199), footer disclaimer 2.5:1 + 11px (L324), production level labels 10px (fixed locally), skipped heading h1→h3 (L175→L381). Shell findings (8px tagline, sidebar badges 3.8:1, "Apps and tools" 2.6:1) are out of scope. False positives: content-hidden-at-rest at 390 (scroll reveal does fire inside the inner main scroller; the scanner scrolls only the window), dark-glow #ffba00 (no matching CSS anywhere).

Visual overlays: injected in Assessment B's own headless browser (inline, since https production cannot load http://localhost); no user-visible [Human] tab overlay exists.

## Overall Impression

Honest, fast, clean list (CLS 0, LCP ~1.1s, sources named on every Apply) buried under a filter wall built for a 500-job board that has 11 jobs. Biggest opportunity: make it a beginner's board that leads back into the product.

## What's Working

- Source honesty: "Apply on Internshala / {Company}'s site" (L469) and "Always apply on the employer's own page" build trust.
- Real PM level taxonomy with a level label per card, plus a live "{n} roles match" count.
- Mobile basics: chips and save become 44px on coarse pointers, no horizontal scroll, drawer goes full-width, reduced-motion shows cards immediately.

## Priority Issues

1. [P1] Filter wall crowds out jobs; empty level chips lead nowhere. On a 390 phone not one card is above the fold; 11 level chips for 11 jobs, 5 always return 0. Fix: derive chips with counts from jobs like cityOptions (L111-115, L236-242) and hide/disable empty ones; on mobile show search + "Filters (n)" sheet (L191-278); shrink hero on phones (L172-188). Command: /impeccable distill, then /impeccable layout.
2. [P1] Job drawer is not an accessible dialog. Focus never moves in, Tab walks the background cards (12/12), background main still scrolls, no aria-labelledby, no focus return. Fix: rebuild JobDrawer (L404-499) on shadcn Sheet with DialogTitle. Command: /impeccable harden.
3. [P1] Failure states unhandled. Load error without retry (L286), empty state without "Clear filters" (L296), silent save/bookmark failures (L143-145, L154-156), stale saved label (L275), mislabelled "Last 7 days" (L22). Command: /impeccable harden + /impeccable clarify.
4. [P2] Contrast, size and touch-target misses on the board itself: header meta 3.7:1 (L183), placeholder 2.6:1 (L199), footer 2.5:1 at 11px (L324); card bookmark 20×20, View details/Apply 20px tall, Clear 16px, drawer close 32px, footer links 15px; search and select focus shows only a 1px border (L199 focus:outline-hidden; select ring renders transparent). Command: /impeccable audit fixes via /impeccable polish + /impeccable adapt.
5. [P2] Dead end in the product path and cold sign-in gate. Apply sends users off-site with no "practise this interview / check your resume" step; Save opens a "Welcome Back / LOG IN" modal for first-time visitors (L139, L149, L170). Fix: next-step row in drawer, "Good for your first PM role" preset, initialMode="signup" with benefit copy. Command: /impeccable shape, /impeccable onboard.

## Persona Red Flags

Casey (mobile): filters fill screen one, first card ~y 920-998; three 20px targets crowded in card footer; whole card not tappable; open job lost on reload/Back.
Jordan (first-timer): 11 level chips with no "entry level" guidance; APM gives 1 job; "Welcome Back" to someone new; "0-2 years" still shows roles without experience data.
Sam (accessibility): drawer without focus management or label; chips lack aria-pressed (L52-58); search named only by placeholder (L195); results count not announced (L292); 57 decorative SVGs not aria-hidden; heading skip h1→h3.
Career switcher: experience filter counts total years not PM years; no Technical PM highlight; no bridge to resume reframing tools.

## Minor Observations

- Data quality: "India, India", "India; India; India" location strings; Secunderabad roles unreachable by city filter.
- Two Apply styles (black button in drawer L467, green link on card L392); "Show more" is black (L315).
- Two tab stops per card open the same drawer (L380 + L389).
- whitespace-pre-line raw descriptions; many say "employer did not include a description".
- timeAgo floors days; "Today" can mean 23h ago.
- Bundle: /jobs eagerly loads interviewScenarios (156 KB) it never uses.

## Questions to Consider

- With 11 roles, does the page need any filters above the fold, or should it open on "Today's 11 roles" and reveal filters past ~50?
- If this is the all-in-one PM career kit, what does "get ready for this one" look like on every job?
- Should Director/VP/CPO chips exist on a board for beginners?
