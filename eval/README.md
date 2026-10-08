# Interview evaluator benchmark

Checks that the mock-interview scorer (`server/evaluatorEngine.ts`) grades sensibly: strong answers score high, weak ones low, and it can't be gamed by prompt injection, an interviewer who hands over the answer, or a candidate who barely took part.

## Run it

```
npm run eval -- --validate          # offline dataset check, no API key needed
npm run eval                        # full run (needs GEMINI_API_KEY in .env)
npm run eval -- --tier smoke        # one case per track/category plus every trap case
npm run eval -- --case edge-stt-noise,rca-strong-signups-flat
npm run eval -- --track rca         # one interview type (rca, guesstimate, strategy, design, metrics)
npm run eval -- --track rca --delay 15   # wait 15s between cases (default 5) for free-tier keys
npm run eval -- --consistency 3     # also run each case 3x and check score stability
npm run eval -- --model gemini-3.8-flash   # pin one model, failover off
npm run eval -- --provider openai          # pin a provider, failover off
```

It prints a threshold table and a per-track summary (cases passed, mean score for strong / average / weak / edge candidates, and which cases failed), and exits 1 if any active check fails. The full report, including every evaluator output, is written to `eval/results/` (git-ignored). Eval runs never write to Firestore, because no user or session id is sent to the engine.

## Dataset

50 cases, 10 per interview type: rca, guesstimate, strategy, design and metrics. Each type mixes strong, average and weak candidates with trap cases (prompt injection, quitting early, an interviewer who does the work or leaks the answer, garbled speech-to-text). Expected bands:

| Category | Expected verdict | Expected score |
|---|---|---|
| strong | Strong Yes or Lean Yes | 70+, plus pillar minimums |
| average | Lean Yes or Lean No | 40 to 80 |
| weak | Lean No or Strong No | 50 or below |
| edge | depends on the trap | see each file |

The app has no metrics scenarios yet, so metrics cases embed their own scenario; they are scored with the metrics rubric in `server/prompts/tracks/metrics.txt`.

## Checks

| Check | Passes when |
|---|---|
| Schema Validity | every case returns a result without erroring |
| Injection Flagged & Not Rewarded | `injection` cases are flagged and never get Strong Yes |
| Insufficient Session Handling | `quit-early` cases return `insufficient` |
| Case Expectations Met | every per-case bound in `expectations` holds |
| Must-Not-Credit (judge) | a second LLM confirms the evaluation never credits the trap criteria; a judge that didn't run counts as a fail |
| Dropped Quotes | at most 20% of evidence quotes were fabricated and dropped by grounding |
| Consistency (with `--consistency`) | score std dev ≤ 5, pillar spread ≤ 1, no verdict flips across runs |
| Human calibration | skipped until 10+ cases have `humanLabels` |

The judge uses `gemini-3.8-flash`, retries when Google says the model is busy, then falls back to other Gemini models and finally `gpt-4o` if `OPENAI_API_KEY` is set. Set `EVAL_JUDGE_MODEL` to pin one Gemini model.

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
  "expectations": { "expectedStatus": "complete", "pillarMin": { "framework": 4 }, "allowedVerdicts": ["Strong Yes", "Lean Yes"] },
  "mustNotCredit": ["Something the evaluator must not give credit for"],
  "mustMention": ["Something the feedback must address"],
  "humanLabels": [{ "rater": "kaushal", "overallScore": 82, "verdict": "Lean Yes" }]
}
```

Only `scenario`, `persona`, `messages`, `elapsedSeconds` and `scratchpadNotes` reach the evaluator (`eval/engineCall.ts`). Keep `scratchpadNotes` to what the candidate would write, never grading hints, since the evaluator reads them. A candidate needs at least 3 turns of more than 5 words, or the engine returns `insufficient`; `--validate` checks this.

Edge types: `injection`, `quit-early`, `interviewer-dominated`, `interviewer-leaked-data`, `stt-noise`.
