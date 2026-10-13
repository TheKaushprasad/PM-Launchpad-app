import { getFirestore, Firestore } from 'firebase-admin/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { getFirebaseAdmin, isFirebaseAdminConfigured } from '../../services/firebaseAdmin';
import { JobDetail, JobSourceStatus, JobSummary, JobsListResponse } from '../../types/jobs';
import { dedupeKey } from './normalize';
import { boardKey, getJobSources, mapWithConcurrency, runSource, SourceResult } from './sources';
import { COMPANY_BOARDS } from './companies';
import { DiscoveredBoard, MAX_BOARD_FAILURES, searchForBoards, toCompanyBoards } from './discovery';

// Firestore layout (written only by the server through the Admin SDK; clients never read it directly):
//   jobs/{jobId}            full job incl. description, read when a user opens a job
//   jobs_meta/status        refreshedAt, chunk count, per-source results
//   jobs_meta/index_{n}     { jobs: JobSummary[] }, the list the Jobs page shows (a few reads per page load)
//   jobs_meta/discovered    { boards: DiscoveredBoard[] }, company boards found by the weekly Firecrawl search
const CHUNK_SIZE = 400;
const BATCH_SIZE = 400;
const LIST_CACHE_MS = 10 * 60 * 1000;
// The function may run for 60s (vercel.json); feeds not reached by then keep yesterday's jobs.
const REFRESH_DEADLINE_MS = 45 * 1000;
const SKIPPED_ERROR = 'skipped: refresh ran out of time';
// Only fresh roles are listed (owner's call, 2026-10-13).
const MAX_JOB_AGE_DAYS = 7;

/** Age by the employer's posted date, or by when we first saw it if that is older (feeds without a date). */
function isFresh(job: JobSummary, cutoffIso: string): boolean {
  const seen = job.postedAt < job.firstSeenAt ? job.postedAt : job.firstSeenAt;
  return seen >= cutoffIso;
}

let listCache: { at: number; data: JobsListResponse } | null = null;

export function jobsStoreReady(): boolean {
  return isFirebaseAdminConfigured();
}

function db(): Firestore {
  const databaseId = process.env.FIREBASE_FIRESTORE_DATABASE_ID || firebaseConfig.firestoreDatabaseId || '(default)';
  return getFirestore(getFirebaseAdmin(), databaseId);
}

function toSummary(job: JobDetail): JobSummary {
  const { description, ...summary } = job;
  return summary;
}

async function readIndex(store: Firestore): Promise<{ status: any | null; jobs: JobSummary[] }> {
  const statusSnap = await store.collection('jobs_meta').doc('status').get();
  if (!statusSnap.exists) return { status: null, jobs: [] };
  const status = statusSnap.data() || {};
  const chunkCount = Number(status.chunkCount || 0);
  const refs = Array.from({ length: chunkCount }, (_, i) => store.collection('jobs_meta').doc(`index_${i}`));
  const snaps = refs.length ? await store.getAll(...refs) : [];
  const jobs = snaps.flatMap((s) => (s.exists ? ((s.data()?.jobs as JobSummary[]) || []) : []));
  return { status, jobs };
}

export async function getJobsList(): Promise<JobsListResponse> {
  if (listCache && Date.now() - listCache.at < LIST_CACHE_MS) return listCache.data;
  const { status, jobs } = await readIndex(db());
  const data: JobsListResponse = {
    refreshedAt: status?.refreshedAt || null,
    jobs,
    sources: (status?.sources as JobSourceStatus[]) || [],
  };
  listCache = { at: Date.now(), data };
  return data;
}

export async function getJobDetail(id: string): Promise<JobDetail | null> {
  const snap = await db().collection('jobs').doc(id).get();
  return snap.exists ? (snap.data() as JobDetail) : null;
}

async function readDiscovered(store: Firestore): Promise<DiscoveredBoard[]> {
  const snap = await store.collection('jobs_meta').doc('discovered').get();
  return snap.exists ? ((snap.data()?.boards as DiscoveredBoard[]) || []) : [];
}

export interface RefreshSummary {
  refreshedAt: string;
  total: number;
  added: number;
  updated: number;
  removed: number;
  dryRun: boolean;
  discoveredBoards: number;
  sources: JobSourceStatus[];
}

/** Fetches every source, keeps PM roles in India / open to India, and replaces the stored list. */
export async function refreshJobs({ dryRun = false } = {}): Promise<RefreshSummary> {
  const nowIso = new Date().toISOString();
  const deadline = Date.now() + REFRESH_DEADLINE_MS;
  const readStore = jobsStoreReady() ? db() : null;
  const discovered = readStore ? await readDiscovered(readStore) : [];
  const discoveredBoards = toCompanyBoards(discovered);
  const results = await mapWithConcurrency(getJobSources(discoveredBoards), 16, (s): Promise<SourceResult> =>
    Date.now() > deadline
      ? Promise.resolve({ status: { key: s.key, label: s.label, ok: false, count: 0, error: SKIPPED_ERROR }, jobs: [] })
      : runSource(s, nowIso)
  );
  const sources = results.map((r) => r.status);

  const store = dryRun ? null : readStore;
  const previous = store ? await readIndex(store) : { status: null, jobs: [] as JobSummary[] };
  const prevById = new Map(previous.jobs.map((j) => [j.id, j]));
  const failedKeys = new Set(sources.filter((s) => !s.ok).map((s) => s.key));

  // Merge: today's results, plus yesterday's jobs from any feed that failed today.
  // Company boards come first so they win duplicates against the remote aggregators.
  const fresh = results.flatMap((r) => r.jobs);
  const byKey = new Map<string, JobDetail | JobSummary>();
  const ids = new Set<string>();
  for (const job of fresh) {
    const key = dedupeKey(job.company, job.title, job.cities);
    if (byKey.has(key) || ids.has(job.id)) continue;
    const prev = prevById.get(job.id);
    if (prev) job.firstSeenAt = prev.firstSeenAt;
    byKey.set(key, job);
    ids.add(job.id);
  }
  for (const prev of previous.jobs) {
    if (!failedKeys.has(prev.sk) || ids.has(prev.id)) continue;
    const key = dedupeKey(prev.company, prev.title, prev.cities);
    if (byKey.has(key)) continue;
    byKey.set(key, prev);
    ids.add(prev.id);
  }

  const cutoffIso = new Date(Date.now() - MAX_JOB_AGE_DAYS * 86400000).toISOString();
  const merged = Array.from(byKey.values())
    .filter((j) => isFresh(j, cutoffIso))
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt));
  const kept = new Set(merged.map((j) => j.id));
  const changed = fresh.filter((j) => kept.has(j.id) && prevById.get(j.id)?.h !== j.h);
  const removed = previous.jobs.filter((j) => !kept.has(j.id));
  const summary: RefreshSummary = {
    refreshedAt: nowIso,
    total: merged.length,
    added: changed.filter((j) => !prevById.has(j.id)).length,
    updated: changed.filter((j) => prevById.has(j.id)).length,
    removed: removed.length,
    dryRun,
    discoveredBoards: discoveredBoards.length,
    sources,
  };
  if (!store) return summary;

  const writes: Array<(b: FirebaseFirestore.WriteBatch) => void> = [];
  for (const job of changed) writes.push((b) => b.set(store.collection('jobs').doc(job.id), job));
  for (const job of removed) writes.push((b) => b.delete(store.collection('jobs').doc(job.id)));

  const summaries = merged.map((j) => ('description' in j ? toSummary(j as JobDetail) : j));
  const chunkCount = Math.max(1, Math.ceil(summaries.length / CHUNK_SIZE));
  for (let i = 0; i < chunkCount; i++) {
    const jobs = summaries.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    writes.push((b) => b.set(store.collection('jobs_meta').doc(`index_${i}`), { jobs }));
  }
  const oldChunkCount = Number(previous.status?.chunkCount || 0);
  for (let i = chunkCount; i < oldChunkCount; i++) {
    writes.push((b) => b.delete(store.collection('jobs_meta').doc(`index_${i}`)));
  }

  for (let i = 0; i < writes.length; i += BATCH_SIZE) {
    const batch = store.batch();
    writes.slice(i, i + BATCH_SIZE).forEach((w) => w(batch));
    await batch.commit();
  }
  // Count failures per discovered board so dead ones stop being fetched.
  if (discovered.length) {
    const statusByKey = new Map(sources.map((st) => [st.key, st]));
    let changedBoards = false;
    const boards = discovered.map((b) => {
      const st = statusByKey.get(boardKey(b));
      if (!st || st.error === SKIPPED_ERROR) return b;
      const failures = st.ok ? 0 : Math.min(b.failures + 1, MAX_BOARD_FAILURES);
      if (failures !== b.failures) changedBoards = true;
      return { ...b, failures };
    });
    if (changedBoards) await store.collection('jobs_meta').doc('discovered').set({ boards }, { merge: true });
  }

  // Status last, so readers never see a chunk count that points at unwritten chunks.
  await store.collection('jobs_meta').doc('status').set({ refreshedAt: nowIso, chunkCount, total: merged.length, sources });
  listCache = null;
  return summary;
}

export interface DiscoverySummary {
  ranAt: string;
  dryRun: boolean;
  queries: Array<{ query: string; results: number; error?: string }>;
  boardsFound: number;
  newBoards: number;
  totalBoards: number;
}

/** Runs the Firecrawl searches and adds any new company boards for the daily refresh to read. */
export async function discoverJobBoards({ dryRun = false } = {}): Promise<DiscoverySummary> {
  const apiKey = process.env.FIRECRAWL_API_KEY?.trim();
  if (!apiKey) throw new Error('FIRECRAWL_API_KEY is not set in the server environment.');
  const nowIso = new Date().toISOString();
  const run = await searchForBoards(apiKey);

  const store = jobsStoreReady() ? db() : null;
  const existing = store ? await readDiscovered(store) : [];
  const fixed = new Set(COMPANY_BOARDS.map(boardKey));
  const byKey = new Map(existing.map((b) => [boardKey(b), b]));
  let newBoards = 0;
  for (const found of run.boards) {
    const key = boardKey(found);
    if (fixed.has(key)) continue;
    const prev = byKey.get(key);
    if (prev) {
      // Found again by a search, so give it another try even if it failed before.
      byKey.set(key, { ...prev, ...(found.name && !prev.name ? { name: found.name } : {}), lastSeenAt: nowIso, failures: 0 });
    } else {
      byKey.set(key, { ...found, firstSeenAt: nowIso, lastSeenAt: nowIso, failures: 0 });
      newBoards++;
    }
  }
  // Boards that keep failing and no search has found for 60 days are dropped.
  const cutoff = new Date(Date.now() - 60 * 86400000).toISOString();
  const boards = Array.from(byKey.values()).filter((b) => b.failures < MAX_BOARD_FAILURES || b.lastSeenAt >= cutoff);

  if (store && !dryRun) {
    await store.collection('jobs_meta').doc('discovered').set({ boards, updatedAt: nowIso, queries: run.queries });
  }
  return { ranAt: nowIso, dryRun, queries: run.queries, boardsFound: run.boards.length, newBoards, totalBoards: boards.length };
}
