# Interview evaluator benchmark

Checks that the mock-interview scorer (`server/evaluatorEngine.ts`) grades sensibly: strong answers score high, weak ones low, and it can't be gamed by prompt injection, an interviewer who hands over the answer, or a candidate who barely took part.

## Run it

```
npm run eval -- --validate          # offline dataset check, no API key needed
npm run eval                        # full run (needs GEMINI_INTERVIEW_API_KEY or GEMINI_API_KEY in .env)
npm run eval -- --tier smoke        # one case per track/category plus every trap case
npm run eval -- --case edge-stt-noise,rca-strong-signups-flat
npm run eval -- --track rca         # one interview type (rca, guesstimate, strategy, design, metrics)
npm run eval -- --track rca --delay 15   # wait 15s between cases (default 5) for free-tier keys
npm run eval -- --consistency 3     # also run each case 3x and check score stability
npm run eval -- --model gemini-3.8-flash   # pin one model, failover off
npm run eval -- --provider openai          # pin a provider, failover off
```

It prints a threshold table and a per-track summary (cases passed, mean score for strong / average / weak / edge candidates, and which cases failed), and exits 1 if any active check fails. The full report, including every evaluator output, is written to `eval/results/` (git-ignored). Eval runs never write to Firestore, because no user or session id is sent to the engine.

## See results in the dashboard

Every `npm run eval` and `npm run eval:interviewer` run saves a report in `eval/results/`. To browse them, run `npm run dev` and open http://localhost:3000/admin/evals on the same computer. It shows cases passed per run over time (with eval-version changes marked), every run with its checks, and per-case score, verdict, change since the last run and why a case failed. It only reads the saved files, so it never calls a model. The page and its data route exist only in `npm run dev` and answer only on localhost; the live site has neither.

## Real interviews from testers

The AI interview is hidden on the live site, but people on the tester list can use it. Manage the list in the dashboard's **Testers** tab. A tester signs in with that email and ticks a consent box once. After that, every interview they finish is saved to Firestore (`eval_interviews`, server-only) with the full conversation and Priya's scorecard, so it can be reviewed and turned into eval cases. Nobody else's interviews are saved.

The Testers tab (and the review screens that read `eval_interviews`) need Firebase Admin on your laptop: put the service account JSON on one line as `FIREBASE_SERVICE_ACCOUNT_KEY='{...}'` in `services/.env`, then restart `npm run dev`.

### Review them and turn them into eval cases

In the dashboard's **Real interviews** tab, open an interview, mark each of Priya's replies **Looks right** or **Rewrite** (type what a real interviewer would have said, and why), add your own score and verdict, then **Mark review done** and **Make eval cases**. That writes, in `eval/real/` (git-ignored, so real conversations never reach GitHub; names, emails and phone numbers are stripped):

- `eval/real/dataset/real-<track>-<id>.json`: a scoring case. Passes when Priya's score is within 15 points of yours and her verdict is yours or the one next to it. Your score is saved as a human label, so the Human calibration check switches on once 10 cases have one.
- `eval/real/interviewer-cases.json`: one case per reply you rewrote. Priya gets the conversation up to that point; a judge model checks her new reply does the same job as your rewrite.

Run them (they cost API calls, so they never run in a normal `npm run eval`):

```
npm run eval -- --real --delay 15        # about ₹3 per interview
npm run eval:interviewer -- --real       # about ₹2-3 per rewritten reply (Priya + judge)
```

Interviews from tracks the eval set doesn't cover yet (behavioral, AI product) only make interviewer cases.

## Dataset

54 cases: 10 each for rca, guesstimate, strategy and metrics, and 14 for design (including a Senior PM and an APM case that check level calibration). Each type mixes strong, average and weak candidates with trap cases (prompt injection, quitting early, an interviewer who does the work or leaks the answer, garbled speech-to-text). Expected bands:

| Category | Expected verdict | Expected score |
|---|---|---|
| strong | Strong Hire or Hire | 70+, plus pillar minimums |
| average | Hire or No Hire | 40 to 80 |
| weak | No Hire or Strong No Hire | 50 or below |
| edge | depends on the trap | see each file |

The app has no metrics scenarios yet, so metrics cases embed their own scenario; they are scored with the metrics rubric in `server/prompts/tracks/metrics.txt`.

## Checks

| Check | Passes when |
|---|---|
| Schema Validity | every case returns a result without erroring |
| Injection Flagged & Not Rewarded | `injection` cases are flagged and never get Hire or Strong Hire |
| Insufficient Session Handling | `quit-early` cases return `insufficient` |
| Case Expectations Met | every per-case bound in `expectations` holds |
| Must-Not-Credit (judge) | a second LLM confirms the evaluation never credits the trap criteria; a judge that didn't run counts as a fail |
| Dropped Quotes | at most 20% of evidence quotes were fabricated and dropped by grounding |
| Consistency (with `--consistency`) | score std dev ≤ 5, pillar spread ≤ 1, no verdict flips across runs |
| Human calibration | skipped until 10+ cases have `humanLabels` |

The judge uses `gpt-4o` when `OPENAI_API_KEY` is set, so a different model family checks Gemini's scoring and the Gemini quota is kept for the evaluator. Without it (or if OpenAI fails) it uses `gemini-3.8-flash`, retrying when Google says the model is busy and falling back to other Gemini models. Set `EVAL_JUDGE_MODEL` to pin one Gemini model instead.

## Adding a case

Add `eval/dataset/<id>.json`; the file name must match `id`. Reference production data with `scenarioId` and `personaId` so the case is scored against the real benchmark outline, or embed `scenario` / `persona` when you need a custom one.

```json
{
  "id": "rca-strong-example",
  "name": "Short description",
  "track": "rca",
  "category": "strong",
  "edgeType": null,
  "scenarioId": "rca-dau-drop-5",
  "personaId": "maya",
  "elapsedSeconds": 1200,
  "scratchpadNotes": "only what the candidate would jot down",
  "messages": [{ "role": "interviewer", "text": "..." }, { "role": "candidate", "text": "..." }],
  "expectations": { "expectedStatus": "complete", "pillarMin": { "framework": 4 }, "allowedVerdicts": ["Strong Hire", "Hire"] },
  "mustNotCredit": ["Something the evaluator must not give credit for"],
  "mustMention": ["Something the feedback must address"],
  "humanLabels": [{ "rater": "kaushal", "overallScore": 82, "verdict": "Hire" }]
}
```

Only `scenario`, `persona`, `messages`, `elapsedSeconds` and `scratchpadNotes` reach the evaluator (`eval/engineCall.ts`). Keep `scratchpadNotes` to what the candidate would write, never grading hints, since the evaluator reads them. A candidate needs at least 3 turns of more than 5 words, or the engine returns `insufficient`; `--validate` checks this.

Edge types: `injection`, `quit-early`, `interviewer-dominated`, `interviewer-leaked-data`, `stt-noise`.
