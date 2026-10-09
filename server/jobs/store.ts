import { getFirestore, Firestore } from 'firebase-admin/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { getFirebaseAdmin, isFirebaseAdminConfigured } from '../../services/firebaseAdmin';
import { JobDetail, JobSourceStatus, JobSummary, JobsListResponse } from '../../types/jobs';
import { dedupeKey } from './normalize';
import { getJobSources, mapWithConcurrency, runSource } from './sources';

// Firestore layout (written only by the server through the Admin SDK; clients never read it directly):
//   jobs/{jobId}            full job incl. description, read when a user opens a job
//   jobs_meta/status        refreshedAt, chunk count, per-source results
//   jobs_meta/index_{n}     { jobs: JobSummary[] }, the list the Jobs page shows (a few reads per page load)
const CHUNK_SIZE = 400;
const BATCH_SIZE = 400;
const LIST_CACHE_MS = 10 * 60 * 1000;

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

export interface RefreshSummary {
  refreshedAt: string;
  total: number;
  added: number;
  updated: number;
  removed: number;
  dryRun: boolean;
  sources: JobSourceStatus[];
}

/** Fetches every source, keeps PM roles in India / open to India, and replaces the stored list. */
export async function refreshJobs({ dryRun = false } = {}): Promise<RefreshSummary> {
  const nowIso = new Date().toISOString();
  const results = await mapWithConcurrency(getJobSources(), 10, (s) => runSource(s, nowIso));
  const sources = results.map((r) => r.status);

  const store = dryRun ? null : db();
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

  const merged = Array.from(byKey.values()).sort((a, b) => b.postedAt.localeCompare(a.postedAt));
  const changed = fresh.filter((j) => ids.has(j.id) && prevById.get(j.id)?.h !== j.h);
  const removed = previous.jobs.filter((j) => !ids.has(j.id));
  const summary: RefreshSummary = {
    refreshedAt: nowIso,
    total: merged.length,
    added: changed.filter((j) => !prevById.has(j.id)).length,
    updated: changed.filter((j) => prevById.has(j.id)).length,
    removed: removed.length,
    dryRun,
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
  // Status last, so readers never see a chunk count that points at unwritten chunks.
  await store.collection('jobs_meta').doc('status').set({ refreshedAt: nowIso, chunkCount, total: merged.length, sources });
  listCache = null;
  return summary;
}
