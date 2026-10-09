import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  Bookmark, BookmarkCheck, Briefcase, Clock, ExternalLink, Loader2, MapPin, RotateCcw, Save, Search, X,
} from 'lucide-react';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { JOB_LEVELS, JobDetail, JobLevel, JobPreferences, JobSummary, JobsListResponse, WorkMode } from '../../types/jobs';

const WORK_MODES: WorkMode[] = ['Remote', 'Hybrid', 'On-site'];
const EXPERIENCE_OPTIONS = [
  { value: 'any', label: 'Any experience' },
  { value: '0-2', label: '0-2 years' },
  { value: '2-5', label: '2-5 years' },
  { value: '5-8', label: '5-8 years' },
  { value: '8+', label: '8+ years' },
];
const POSTED_OPTIONS = [
  { value: 0, label: 'Any time' },
  { value: 1, label: 'Last 24 hours' },
  { value: 7, label: 'Last 7 days' },
  { value: 30, label: 'Last 30 days' },
];
const PAGE_SIZE = 30;

const DEFAULT_PREFS: JobPreferences = { levels: [], location: 'all', workModes: [], experience: 'any' };

function matchesExperience(job: JobSummary, bucket: string): boolean {
  if (bucket === 'any' || job.expMin === undefined) return true;
  const [lo, hi] = bucket === '8+' ? [8, 99] : bucket.split('-').map(Number);
  const jobMax = job.expMax ?? job.expMin;
  return job.expMin <= hi && jobMax >= lo;
}

function timeAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? '1 month ago' : `${months} months ago`;
}

function experienceLabel(job: JobSummary): string | null {
  if (job.expMin === undefined) return null;
  return job.expMax !== undefined ? `${job.expMin}-${job.expMax} yrs` : `${job.expMin}+ yrs`;
}

const Chip: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
      active ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
    }`}
  >
    {children}
  </button>
);

export const JobsBoard: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<JobsListResponse | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [prefs, setPrefs] = useState<JobPreferences>(DEFAULT_PREFS);
  const [postedWithin, setPostedWithin] = useState(0);
  const [savedOnly, setSavedOnly] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [prefsSavedAt, setPrefsSavedAt] = useState<number | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/jobs')
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || 'Could not load jobs.');
        return res.json();
      })
      .then((json: JobsListResponse) => !cancelled && setData(json))
      .catch((err) => !cancelled && setLoadError(err.message || 'Could not load jobs.'));
    return () => {
      cancelled = true;
    };
  }, []);

  // Saved filters and bookmarks live on the user's own profile document.
  useEffect(() => {
    if (!user) {
      setSavedIds([]);
      return;
    }
    getDoc(doc(db, 'users', user.uid))
      .then((snap) => {
        const d = snap.data() || {};
        if (Array.isArray(d.savedJobIds)) setSavedIds(d.savedJobIds);
        if (d.jobPreferences) setPrefs({ ...DEFAULT_PREFS, ...d.jobPreferences });
      })
      .catch((err) => console.warn('[Jobs] Could not load saved preferences:', err?.message));
  }, [user]);

  useEffect(() => setVisible(PAGE_SIZE), [query, prefs, postedWithin, savedOnly]);

  const jobs = data?.jobs || [];
  const cityOptions = useMemo(() => {
    const counts = new Map<string, number>();
    jobs.forEach((j) => j.cities.forEach((c) => counts.set(c, (counts.get(c) || 0) + 1)));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).map(([c]) => c);
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cutoff = postedWithin ? Date.now() - postedWithin * 86400000 : 0;
    return jobs.filter((j) => {
      if (savedOnly && !savedIds.includes(j.id)) return false;
      if (q && !`${j.title} ${j.company}`.toLowerCase().includes(q)) return false;
      if (prefs.levels.length && !prefs.levels.includes(j.level)) return false;
      if (prefs.workModes.length && !prefs.workModes.includes(j.workMode)) return false;
      if (prefs.location === 'remote' && j.workMode !== 'Remote') return false;
      if (prefs.location !== 'all' && prefs.location !== 'remote' && !j.cities.includes(prefs.location)) return false;
      if (!matchesExperience(j, prefs.experience)) return false;
      if (cutoff && new Date(j.postedAt).getTime() < cutoff) return false;
      return true;
    });
  }, [jobs, query, prefs, postedWithin, savedOnly, savedIds]);

  const toggleLevel = (level: JobLevel) =>
    setPrefs((p) => ({ ...p, levels: p.levels.includes(level) ? p.levels.filter((l) => l !== level) : [...p.levels, level] }));
  const toggleMode = (mode: WorkMode) =>
    setPrefs((p) => ({ ...p, workModes: p.workModes.includes(mode) ? p.workModes.filter((m) => m !== mode) : [...p.workModes, mode] }));

  const savePreferences = async () => {
    if (!user) return setAuthOpen(true);
    try {
      await setDoc(doc(db, 'users', user.uid), { jobPreferences: prefs }, { merge: true });
      setPrefsSavedAt(Date.now());
    } catch (err: any) {
      console.warn('[Jobs] Could not save preferences:', err?.message);
    }
  };

  const toggleSaved = async (jobId: string) => {
    if (!user) return setAuthOpen(true);
    const next = savedIds.includes(jobId) ? savedIds.filter((id) => id !== jobId) : [jobId, ...savedIds].slice(0, 200);
    setSavedIds(next);
    try {
      await setDoc(doc(db, 'users', user.uid), { savedJobIds: next }, { merge: true });
    } catch (err: any) {
      console.warn('[Jobs] Could not save bookmark:', err?.message);
      setSavedIds(savedIds);
    }
  };

  const hasFilters =
    query || prefs.levels.length || prefs.workModes.length || prefs.location !== 'all' || prefs.experience !== 'any' || postedWithin || savedOnly;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 pb-20"
    >
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" redirectTo="/jobs" onSuccess={() => setAuthOpen(false)} />

      <header className="relative w-full bg-gradient-to-r from-[#032A1F] via-[#043C2C] to-[#064E3B] rounded-3xl p-7 sm:p-9 text-white overflow-hidden shadow-2xl border border-[#065F46]/60 mb-6">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-gradient-to-bl from-purple-600/25 via-indigo-600/15 to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/4 translate-x-1/4" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold mb-3 tracking-tight leading-[1.08]">
            PM jobs in India <br />
            <span className="text-[#6EE7B7]">and remote roles open to you.</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            APM to CPO roles collected every morning from company job boards. Filter by level, city and experience, and save the ones you like.
          </p>
          {data?.refreshedAt && (
            <p className="text-xs text-slate-400 mt-3">
              {jobs.length} open roles · updated {timeAgo(data.refreshedAt).toLowerCase()}
            </p>
          )}
        </div>
      </header>

      {/* Filters */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 mb-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <label className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title or company"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-400"
            />
          </label>
          <select
            value={prefs.location}
            onChange={(e) => setPrefs((p) => ({ ...p, location: e.target.value }))}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
            aria-label="Location"
          >
            <option value="all">All of India + remote</option>
            <option value="remote">Remote only</option>
            {cityOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={prefs.experience}
            onChange={(e) => setPrefs((p) => ({ ...p, experience: e.target.value }))}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
            aria-label="Experience"
          >
            {EXPERIENCE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={postedWithin}
            onChange={(e) => setPostedWithin(Number(e.target.value))}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
            aria-label="Posted within"
          >
            {POSTED_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          {JOB_LEVELS.map((level) => (
            <Chip key={level} active={prefs.levels.includes(level)} onClick={() => toggleLevel(level)}>
              {level}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {WORK_MODES.map((mode) => (
            <Chip key={mode} active={prefs.workModes.includes(mode)} onClick={() => toggleMode(mode)}>
              {mode}
            </Chip>
          ))}
          <span className="w-px h-5 bg-slate-200 mx-1" />
          <Chip active={savedOnly} onClick={() => (user ? setSavedOnly((v) => !v) : setAuthOpen(true))}>
            Saved jobs{savedIds.length ? ` (${savedIds.length})` : ''}
          </Chip>
          <div className="flex-1" />
          {hasFilters ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setPrefs(DEFAULT_PREFS);
                setPostedWithin(0);
                setSavedOnly(false);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear
            </button>
          ) : null}
          <button
            type="button"
            onClick={savePreferences}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
          >
            <Save className="w-3.5 h-3.5" />
            {prefsSavedAt ? 'Saved as my preferences' : 'Save as my preferences'}
          </button>
        </div>
      </section>

      {/* Results */}
      {!data && !loadError && (
        <div className="flex items-center justify-center py-20 text-slate-500 text-sm gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading jobs…
        </div>
      )}
      {loadError && <p className="text-center py-16 text-sm text-rose-600">{loadError}</p>}
      {data && jobs.length === 0 && (
        <p className="text-center py-16 text-sm text-slate-500">Job listings are being set up. Please check back tomorrow.</p>
      )}
      {data && jobs.length > 0 && (
        <>
          <p className="text-xs font-semibold text-slate-500 mb-3">
            {filtered.length} {filtered.length === 1 ? 'role' : 'roles'} match
          </p>
          {filtered.length === 0 ? (
            <p className="text-center py-16 text-sm text-slate-500">No roles match these filters. Try removing one.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.slice(0, visible).map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  saved={savedIds.includes(job.id)}
                  onToggleSaved={() => toggleSaved(job.id)}
                  onOpen={() => setOpenJobId(job.id)}
                />
              ))}
            </div>
          )}
          {filtered.length > visible && (
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-800"
              >
                Show more roles
              </button>
            </div>
          )}
        </>
      )}

      <p className="text-[11px] text-slate-400 mt-10 text-center leading-relaxed">
        Listings come from public company job boards. Remote listings include jobs from{' '}
        <a href="https://remotive.com" target="_blank" rel="noopener" className="underline">Remotive</a> and{' '}
        <a href="https://remoteok.com" target="_blank" rel="noopener" className="underline">Remote OK</a>.
        Always apply on the employer's own page.
      </p>

      <AnimatePresence>
        {openJobId && (
          <JobDrawer
            jobId={openJobId}
            summary={jobs.find((j) => j.id === openJobId)}
            saved={savedIds.includes(openJobId)}
            onToggleSaved={() => toggleSaved(openJobId)}
            onClose={() => setOpenJobId(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const JobMeta: React.FC<{ job: JobSummary }> = ({ job }) => {
  const exp = experienceLabel(job);
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
      <span className="inline-flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5" />
        {job.cities.length ? job.cities.join(', ') : job.locationText}
      </span>
      <span>{job.workMode}</span>
      {exp && <span>{exp}</span>}
      <span className="inline-flex items-center gap-1">
        <Clock className="w-3.5 h-3.5" />
        {timeAgo(job.postedAt)}
      </span>
    </div>
  );
};

const JobCard: React.FC<{ job: JobSummary; saved: boolean; onToggleSaved: () => void; onOpen: () => void }> = ({
  job, saved, onToggleSaved, onOpen,
}) => (
  <div className="group bg-white rounded-2xl border border-slate-200 p-5 flex flex-col hover:shadow-lg hover:border-emerald-200 transition-all">
    <div className="flex items-start justify-between gap-3 mb-2">
      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">{job.level}</span>
      <button
        type="button"
        onClick={onToggleSaved}
        aria-label={saved ? 'Remove from saved jobs' : 'Save job'}
        className="text-slate-400 hover:text-emerald-600 -mt-1"
      >
        {saved ? <BookmarkCheck className="w-5 h-5 text-emerald-600" /> : <Bookmark className="w-5 h-5" />}
      </button>
    </div>
    <button type="button" onClick={onOpen} className="text-left">
      <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-1 group-hover:text-emerald-800">{job.title}</h3>
      <div className="flex items-center gap-1.5 text-sm text-slate-600 mb-3">
        <Briefcase className="w-3.5 h-3.5" />
        {job.company}
      </div>
    </button>
    <JobMeta job={job} />
    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
      <button type="button" onClick={onOpen} className="text-sm font-semibold text-zinc-900 hover:text-emerald-700">
        View details
      </button>
      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
      >
        Apply <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  </div>
);

const JobDrawer: React.FC<{
  jobId: string;
  summary?: JobSummary;
  saved: boolean;
  onToggleSaved: () => void;
  onClose: () => void;
}> = ({ jobId, summary, saved, onToggleSaved, onClose }) => {
  const [detail, setDetail] = useState<JobDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/jobs/${encodeURIComponent(jobId)}`)
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.error || 'Could not load this job.');
        return json;
      })
      .then((json) => !cancelled && setDetail(json))
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, [jobId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const job = detail || summary;

  return (
    <motion.div className="fixed inset-0 z-50 flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.aside
        role="dialog"
        aria-modal="true"
        initial={{ x: 40 }}
        animate={{ x: 0 }}
        exit={{ x: 40 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl h-full bg-white shadow-2xl overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-slate-100 px-5 sm:px-7 py-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {job && <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700 mb-1">{job.level}</p>}
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">{job?.title || 'Job'}</h2>
            {job && <p className="text-sm text-slate-600 mt-0.5">{job.company}</p>}
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-5 sm:px-7 py-5">
          {job && <JobMeta job={job} />}
          {job && (
            <div className="flex flex-wrap gap-3 mt-5">
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-800"
              >
                Apply on {job.source === 'remotive' || job.source === 'remoteok' ? job.sourceLabel : `${job.company}'s site`}
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={onToggleSaved}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:border-slate-300"
              >
                {saved ? <BookmarkCheck className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4" />}
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          )}
          <div className="mt-6">
            {!detail && !error && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading job description…
              </div>
            )}
            {error && <p className="text-sm text-rose-600">{error}</p>}
            {detail && (
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {detail.description || 'The employer did not include a description. Open the job page for details.'}
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
};
