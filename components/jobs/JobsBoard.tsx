import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import {
  Bookmark, BookmarkCheck, Briefcase, Clock, ExternalLink, Loader2, MapPin, RotateCcw, Save, Search, X,
} from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { JOB_LEVELS, JobDetail, JobLevel, JobPreferences, JobSummary, JobsListResponse, WorkMode } from '../../types/jobs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WORK_MODES: WorkMode[] = ['Remote', 'Hybrid', 'On-site'];
const EXPERIENCE_OPTIONS = [
  { value: 'any', label: 'Any experience' },
  { value: '0-2', label: '0-2 years' },
  { value: '2-5', label: '2-5 years' },
  { value: '5-8', label: '5-8 years' },
  { value: '8+', label: '8+ years' },
];
// 0 means no date limit, so it is labelled as such (it used to say "Last 7 days" while filtering nothing).
const POSTED_OPTIONS = [
  { value: 0, label: 'Any time' },
  { value: 1, label: 'Last 24 hours' },
  { value: 3, label: 'Last 3 days' },
  { value: 7, label: 'Last 7 days' },
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
    aria-pressed={active}
    className={`inline-flex items-center pointer-coarse:min-h-11 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
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
  // The filters as last stored on the profile, so "Saved as my preferences" only shows while they still match.
  const [savedPrefsKey, setSavedPrefsKey] = useState<string | null>(null);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  // The last job shown stays mounted while the panel closes, so the dialog can hand focus back to
  // the card that opened it (and play its exit) instead of vanishing mid-close.
  const [drawerJobId, setDrawerJobId] = useState<string | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const openJob = (id: string) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setDrawerJobId(id);
    setOpenJobId(id);
  };

  // Bumping this reloads the list (the Try again button after a failed load).
  const [loadAttempt, setLoadAttempt] = useState(0);
  useEffect(() => {
    let cancelled = false;
    setLoadError(null);
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
  }, [loadAttempt]);

  // A signed-out visitor who tries to save is asked to sign up; this remembers what they were saving
  // so it can finish once they're in. The ref lets the profile load below see it without re-running.
  const [pendingSave, setPendingSave] = useState<{ kind: 'job'; jobId: string } | { kind: 'prefs' } | null>(null);
  const pendingSaveRef = useRef(pendingSave);
  pendingSaveRef.current = pendingSave;
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Saved filters and bookmarks live on the user's own profile document.
  useEffect(() => {
    setProfileLoaded(false);
    if (!user) {
      setSavedIds([]);
      return;
    }
    getDoc(doc(db, 'users', user.uid))
      .then((snap) => {
        const d = snap.data() || {};
        if (Array.isArray(d.savedJobIds)) setSavedIds(d.savedJobIds);
        // Keep the filters the visitor just chose if they signed up to save them.
        if (d.jobPreferences && pendingSaveRef.current?.kind !== 'prefs') {
          const stored = { ...DEFAULT_PREFS, ...d.jobPreferences };
          setPrefs(stored);
          setSavedPrefsKey(JSON.stringify(stored));
        }
        setProfileLoaded(true);
      })
      .catch((err) => {
        console.warn('[Jobs] Could not load saved preferences:', err?.message);
        // Without their existing saved list we can't add to it safely, so drop the pending save.
        setPendingSave(null);
      });
  }, [user]);

  useEffect(() => setVisible(PAGE_SIZE), [query, prefs, postedWithin, savedOnly]);

  const jobs = data?.jobs || [];
  // Only offer levels that have open roles right now (with a count), plus any the visitor already
  // picked, so a chip never leads to an empty board and a saved choice can still be turned off.
  const levelCounts = useMemo(() => {
    const counts = new Map<JobLevel, number>();
    jobs.forEach((j) => counts.set(j.level, (counts.get(j.level) || 0) + 1));
    return counts;
  }, [jobs]);
  const levelOptions = JOB_LEVELS.filter((l) => (levelCounts.get(l) || 0) > 0 || prefs.levels.includes(l));
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

  const askToSignUp = (save: NonNullable<typeof pendingSave>) => {
    setPendingSave(save);
    setAuthOpen(true);
  };

  const savePreferences = async () => {
    if (!user) return askToSignUp({ kind: 'prefs' });
    if (savingPrefs) return;
    setSavingPrefs(true);
    try {
      await setDoc(doc(db, 'users', user.uid), { jobPreferences: prefs }, { merge: true });
      setSavedPrefsKey(JSON.stringify(prefs));
    } catch (err: any) {
      console.warn('[Jobs] Could not save preferences:', err?.message);
      toast.error("Couldn't save your filters. Check your connection and try again.");
    } finally {
      setSavingPrefs(false);
    }
  };

  const toggleSaved = async (jobId: string) => {
    if (!user) return askToSignUp({ kind: 'job', jobId });
    const removing = savedIds.includes(jobId);
    const next = removing ? savedIds.filter((id) => id !== jobId) : [jobId, ...savedIds].slice(0, 200);
    setSavedIds(next);
    try {
      await setDoc(doc(db, 'users', user.uid), { savedJobIds: next }, { merge: true });
    } catch (err: any) {
      console.warn('[Jobs] Could not save bookmark:', err?.message);
      setSavedIds(savedIds);
      toast.error(removing ? "Couldn't remove that job from your saved list. Try again." : "Couldn't save that job. Try again.");
    }
  };

  const prefsAreSaved = savedPrefsKey !== null && savedPrefsKey === JSON.stringify(prefs);

  const clearFilters = () => {
    setQuery('');
    setPrefs(DEFAULT_PREFS);
    setPostedWithin(0);
    setSavedOnly(false);
  };

  // Finish the save they asked for, once signed in and their existing saved list has loaded.
  // A pending job is only ever added, never toggled off.
  useEffect(() => {
    if (!user || !profileLoaded || !pendingSave) return;
    if (pendingSave.kind === 'job') {
      if (!savedIds.includes(pendingSave.jobId)) toggleSaved(pendingSave.jobId);
    } else {
      savePreferences();
    }
    setPendingSave(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, profileLoaded, pendingSave]);

  const pendingJob = pendingSave?.kind === 'job' ? jobs.find((j) => j.id === pendingSave.jobId) : undefined;
  const signUpPurpose = !pendingSave
    ? undefined
    : pendingSave.kind === 'job'
      ? {
          title: 'Save this job',
          description: pendingJob
            ? `${pendingJob.title} at ${pendingJob.company} stays on your profile, on any device.`
            : 'Saved jobs stay on your profile, on any device.',
        }
      : {
          title: 'Save your job filters',
          description: 'Your filters come back each time you open the jobs board.',
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
      <AuthModal
        isOpen={authOpen}
        onClose={() => {
          setAuthOpen(false);
          setPendingSave(null);
        }}
        initialMode="signup"
        purpose={signUpPurpose}
        redirectTo="/jobs"
        onSuccess={() => setAuthOpen(false)}
      />

      <header className="relative w-full bg-linear-to-r from-[#032A1F] via-[#043C2C] to-[#064E3B] rounded-3xl p-7 sm:p-9 text-white overflow-hidden shadow-2xl border border-[#065F46]/60 mb-6">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-linear-to-bl from-brand-600/25 via-brand-600/15 to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/4 translate-x-1/4" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold mb-3 tracking-tight leading-[1.08]">
            PM jobs in India <br />
            <span className="text-[#6EE7B7]">and remote roles open to you.</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Intern to CPO roles collected every morning from company job boards. Filter by level, city and experience, and save the ones you like.
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
        <div className="grid gap-3 sm:grid-cols-3 lg:flex lg:flex-row">
          <label className="relative sm:col-span-3 lg:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title or company"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-emerald-400"
            />
          </label>
          <Select value={prefs.location} onValueChange={(v) => setPrefs((p) => ({ ...p, location: v }))}>
            <SelectTrigger aria-label="Location" className="w-full lg:w-fit px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white shadow-none h-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All of India + remote</SelectItem>
              <SelectItem value="remote">Remote only</SelectItem>
              {cityOptions.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={prefs.experience} onValueChange={(v) => setPrefs((p) => ({ ...p, experience: v }))}>
            <SelectTrigger aria-label="Experience" className="w-full lg:w-fit px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white shadow-none h-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={String(postedWithin)} onValueChange={(v) => setPostedWithin(Number(v))}>
            <SelectTrigger aria-label="Posted within" className="w-full lg:w-fit px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white shadow-none h-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {POSTED_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={String(o.value)}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          {levelOptions.map((level) => (
            <Chip key={level} active={prefs.levels.includes(level)} onClick={() => toggleLevel(level)}>
              {level}
              <span className="ml-1.5 tabular-nums opacity-70">{levelCounts.get(level) || 0}</span>
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
              onClick={clearFilters}
              className="tap-target inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear
            </button>
          ) : null}
          <button
            type="button"
            onClick={savePreferences}
            disabled={savingPrefs}
            className="inline-flex items-center gap-1.5 pointer-coarse:min-h-11 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-60"
          >
            {savingPrefs ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {prefsAreSaved ? 'Saved as my preferences' : 'Save as my preferences'}
          </button>
        </div>
      </section>

      {/* Results */}
      {!data && !loadError && (
        <div className="flex items-center justify-center py-20 text-slate-500 text-sm gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading jobs…
        </div>
      )}
      {loadError && (
        <div role="alert" className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-sm font-semibold text-zinc-800">We couldn't load the jobs just now.</p>
          <p className="text-sm text-zinc-500">{loadError}</p>
          <button
            type="button"
            onClick={() => setLoadAttempt((n) => n + 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-800 text-white text-sm font-bold hover:bg-brand-900"
          >
            <RotateCcw className="w-4 h-4" /> Try again
          </button>
        </div>
      )}
      {data && jobs.length === 0 && (
        <p className="text-center py-16 text-sm text-slate-500">Job listings are being set up. Please check back tomorrow.</p>
      )}
      {data && jobs.length > 0 && (
        <>
          <p className="text-xs font-semibold text-slate-500 mb-3" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'role' : 'roles'} match
          </p>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="text-sm text-slate-600">
                {savedOnly && savedIds.length === 0
                  ? "You haven't saved any jobs yet. Tap the bookmark on a role to keep it here."
                  : 'No roles match these filters.'}
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-sm font-bold text-zinc-800 hover:bg-zinc-50"
              >
                <RotateCcw className="w-4 h-4" /> Clear filters
              </button>
            </div>
          ) : (
            <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.slice(0, visible).map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  saved={savedIds.includes(job.id)}
                  onToggleSaved={() => toggleSaved(job.id)}
                  onOpen={() => openJob(job.id)}
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
        <a href="https://remoteok.com" target="_blank" rel="noopener" className="underline">Remote OK</a>. Internships link to{' '}
        <a href="https://internshala.com" target="_blank" rel="noopener" className="underline">Internshala</a>.
        Always apply on the employer's own page.
      </p>

      <Dialog open={!!openJobId} onOpenChange={(open) => !open && setOpenJobId(null)}>
        {drawerJobId && (
          <JobDrawer
            jobId={drawerJobId}
            summary={jobs.find((j) => j.id === drawerJobId)}
            saved={savedIds.includes(drawerJobId)}
            onToggleSaved={() => toggleSaved(drawerJobId)}
            onCloseAutoFocus={(e) => {
              // Put keyboard focus back on the card control that opened the panel.
              if (openerRef.current?.isConnected) {
                e.preventDefault();
                openerRef.current.focus();
              }
            }}
          />
        )}
      </Dialog>
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
      <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">{job.level}</span>
      <button
        type="button"
        onClick={onToggleSaved}
        aria-label={saved ? 'Remove from saved jobs' : 'Save job'}
        className="tap-target text-slate-400 hover:text-emerald-600 -mt-1"
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
      <button type="button" onClick={onOpen} className="tap-target text-sm font-semibold text-zinc-900 hover:text-emerald-700">
        View details
      </button>
      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="tap-target inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
      >
        Apply <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  </div>
);

// The job details panel: a side sheet built on the shared Dialog, so focus moves into it, Tab stays
// inside, the page behind doesn't scroll, Escape closes it and focus goes back to the card that opened it.
const JobDrawer: React.FC<{
  jobId: string;
  summary?: JobSummary;
  saved: boolean;
  onToggleSaved: () => void;
  onCloseAutoFocus: (e: Event) => void;
}> = ({ jobId, summary, saved, onToggleSaved, onCloseAutoFocus }) => {
  const [detail, setDetail] = useState<JobDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setError(null);
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
  }, [jobId, attempt]);

  const job = detail || summary;

  return (
    <DialogContent
      showCloseButton={false}
      onCloseAutoFocus={onCloseAutoFocus}
      overlayClassName="bg-black/40"
      className="top-0 right-0 left-auto translate-x-0 translate-y-0 h-dvh w-full max-w-2xl sm:max-w-2xl block gap-0 p-0 rounded-none border-0 border-l border-slate-200 bg-white shadow-2xl overflow-y-auto data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 data-[state=open]:slide-in-from-right-10 data-[state=closed]:slide-out-to-right-10"
    >
        <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-5 sm:px-7 py-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {job && <p className="text-[11px] font-black uppercase tracking-wider text-emerald-700 mb-1">{job.level}</p>}
            <DialogTitle className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">{job?.title || 'Job'}</DialogTitle>
            <DialogDescription className={job ? 'text-sm text-slate-600 mt-0.5' : 'sr-only'}>
              {job ? job.company : 'Job details'}
            </DialogDescription>
          </div>
          <DialogClose aria-label="Close job details" className="tap-target p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 shrink-0">
            <X className="w-5 h-5" />
          </DialogClose>
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
                Apply on {job.source === 'remotive' || job.source === 'remoteok' || job.source === 'internshala' ? job.sourceLabel : job.source === 'sheet' ? 'the job page' : `${job.company}'s site`}
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
            {error && (
              <div role="alert" className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-zinc-700">We couldn't load the full description. You can still apply from the job page.</span>
                <button
                  type="button"
                  onClick={() => setAttempt((n) => n + 1)}
                  className="inline-flex items-center gap-1.5 font-bold text-brand-700 hover:text-brand-800"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Try again
                </button>
              </div>
            )}
            {detail && (
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {detail.description || 'The employer did not include a description. Open the job page for details.'}
              </div>
            )}
          </div>
        </div>
    </DialogContent>
  );
};
