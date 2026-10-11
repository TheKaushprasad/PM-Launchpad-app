# Database scaling review (Firestore)

Reviewed 2026-10-11 against `main` at e6af22c.

The app's database is **Cloud Firestore**, on the named database `ai-studio-thenoobpm-02bc883c-ea67-47f0-bf74-b76c386d5c68` in project `gen-lang-client-0507824938`. It is not Postgres, so there is no `pg_stat_statements`, `EXPLAIN ANALYZE` or `CREATE INDEX CONCURRENTLY`. The Firestore equivalents are: reading the code for queries (below), Query Explain for timings, and `firestore.indexes.json` as the reviewable, undoable "migration". `supabase_setup.sql` and `lib/supabaseClient.ts` are unused leftovers.

## Short answer

- **No read scans the whole database.** Every read is either one document fetched by its id, or one signed-in user's own folder (for example `users/{uid}/interview_sessions`). Firestore cost and speed for these depend on how big that one user's folder is, not on how many users or documents exist.
- **No query filters or sorts in the database** (no `where`, `orderBy` or `limit` anywhere). Sorting happens in the browser. So **no new indexes are needed**; Firestore's automatic single-field indexes cover everything, and `firestore.indexes.json` adds zero composite indexes.
- **Unused indexes:** Firestore indexes every field automatically, and the app never queries by any field, so every automatic index is technically unused. Turning them all off is not worth it. The file turns indexing off only for five large text fields that will never be searched, which makes those saves cheaper and smaller.
- **What will actually get slower as users grow** is listed under "Things that grow" below. None needs an index; each would need a small code change, which this PR does not make because the ask was to keep app behaviour the same.

## Every database read

| # | Where | Path | Kind | Grows with |
|---|---|---|---|---|
| 1 | `context/AuthContext.tsx:287` (every signed-in page) | `users/{uid}` | live listen, 1 doc | nothing |
| 2 | `context/AuthContext.tsx:376` (LinkedIn optimiser, profile) | `users/{uid}/analyses` | live listen, whole user folder, no limit | that user's saved analyses |
| 3 | `context/AuthContext.tsx:415` (Resume auditor, profile) | `users/{uid}/resumes` | live listen, whole user folder, no limit | that user's saved resumes (each up to 50 KB of text) |
| 4 | `context/AuthContext.tsx:503` (Learning) | `users/{uid}/progress` | live listen, whole user folder | capped at 46 docs (one per day) |
| 5 | `context/AuthContext.tsx:574` (Interview history) | `users/{uid}/interview_sessions` | live listen, whole user folder, no limit | that user's completed interviews |
| 6 | `context/AuthContext.tsx:703` (sign-in) | `users/{uid}` | get, 1 doc | nothing |
| 7 | `components/jobs/JobsBoard.tsx:99` | `users/{uid}` | get, 1 doc | nothing |
| 8 | `components/projects/ProjectsHub.tsx:27` | `users/{uid}/project_submissions` | get, whole user folder | capped at 6 docs (one per project) |
| 9 | `server.ts:1272` (interview evaluate) | `users/{uid}/interview_sessions/{id}` | get, 1 doc | nothing |
| 10 | `server/persistence.ts:37` (save interview) | `users/{uid}/interview_sessions/{id}` | get, 1 doc | nothing |
| 11 | `server/security.ts:46` (rate limit on every AI call) | `rate_limits/{bucket}_{day}` | transaction, 1 doc | nothing |
| 12 | `server/jobs/store.ts:33` (`/api/jobs`) | `jobs_meta/status` + `jobs_meta/index_0..n` | get, 1 + n docs (400 jobs per doc) | total jobs; cached 15 min in memory and at Vercel's CDN |
| 13 | `server/jobs/store.ts:56` (`/api/jobs/:id`) | `jobs/{id}` | get, 1 doc | nothing; CDN-cached 1 hour |

Writes (saves and deletes) were not examined for timing, as asked.

## Index changes in this PR (`firestore.indexes.json`)

No composite indexes are added, because no query needs one. These single-field exemptions stop Firestore indexing large fields nobody searches by:

| Collection | Field | Why it's safe | What it speeds up |
|---|---|---|---|
| `jobs_meta` | `jobs` | Array of up to 400 job summaries per doc; only ever read whole by id | the daily jobs refresh save |
| `jobs` | `description` | Long job text; only read whole by id | the daily jobs refresh save |
| `resumes` | `extractedText` | Up to 50 KB of resume text; never filtered | saving a resume |
| `interview_sessions` | `transcriptSummary`, `evaluationSummary` | Up to 5 KB each; never filtered | saving an interview result |

Undo: delete the entry from `firestore.indexes.json` and deploy again, or in the console remove the exemption (steps below). Nothing in the app reads differently either way.

`firebase.json` is added so the CLI targets the named database. It only lists indexes, on purpose: rules are published by hand in the console and must not be overwritten by a CLI deploy.

## Things that grow (not changed here)

1. **Interview history, saved analyses and saved resumes load everything, every visit** (reads 2, 3, 5). A user with 200 interviews downloads all 200 scorecards each time they open the app, and each counts as a billed read. Fix when needed: `orderBy('createdAt', 'desc')` plus `limit(50)` and a "load more" button. That needs no new index (single-field indexes on `createdAt` are automatic), but it changes what the screen shows, so it's a product call.
2. **Resumes folder is heavy per doc.** Each resume carries up to 50 KB of text, and the listener downloads all of it just to show a list. Fix when needed: keep the text in a separate doc and load it on open.
3. **`rate_limits` keeps one doc per user, per AI feature, per day, forever.** Harmless for reads (always by id) but storage grows without end. Fix when needed: store an `expiresAt` timestamp and add a Firestore TTL policy on it to auto-delete old docs.
4. **Jobs list sends every job in one response.** Fine at hundreds of jobs (cached for 15 minutes); at several thousand the response gets large. Fix when needed: server-side paging or filtering.

## Timings (before and after)

Firestore has no `EXPLAIN ANALYZE`. Its equivalent, **Query Explain**, only applies to queries with filters or sorting, which this app doesn't run, and it needs credentials this review didn't have. Single-document reads take the same time whether the database holds a hundred documents or a hundred million, and the five exemptions don't change any read path, so before and after read times are expected to be identical. What to measure instead, and where:

**Firestore usage dashboard (reads, writes, deletes per day):**
1. Open https://console.firebase.google.com/project/gen-lang-client-0507824938/firestore/databases/ai-studio-thenoobpm-02bc883c-ea67-47f0-bf74-b76c386d5c68/usage
2. Note the reads per day for the last 7 days. If reads per active user climb over weeks, item 1 under "Things that grow" is the cause.

**Latency (Google Cloud console):**
1. Open https://console.cloud.google.com/firestore/databases?project=gen-lang-client-0507824938 and click the `ai-studio-thenoobpm-...` database.
2. In the left menu open **Monitoring** (or **Key Visualizer**). Note the read latency now, and again a week after deploying.

**Browser timing for one screen:**
1. Open thenoobpm.com signed in, press F12, go to the Network tab, filter by `firestore`.
2. Open Interview history; the "Time" column shows how long the listener took. Repeat after the change.

## How to deploy the index changes

Either way works. Neither touches security rules.

**Console (no tools needed):**
1. Open https://console.firebase.google.com/project/gen-lang-client-0507824938/firestore/databases/ai-studio-thenoobpm-02bc883c-ea67-47f0-bf74-b76c386d5c68/indexes
2. Click the **Single field** tab, then **Add exemption**.
3. Collection ID: `jobs_meta`. Field path: `jobs`. Leave "Collection" scope. Untick all index types (Ascending, Descending, Arrays). Click **Save exemption**.
4. Repeat for `jobs` / `description`, `resumes` / `extractedText`, `interview_sessions` / `transcriptSummary`, `interview_sessions` / `evaluationSummary`.

**Command line (from the repo folder):**
```
npx firebase-tools login
npx firebase-tools deploy --only firestore:indexes --project gen-lang-client-0507824938
```
`firebase.json` points it at the named database. If the CLI says the console has indexes not in the file and asks whether to delete them, answer **No**.
