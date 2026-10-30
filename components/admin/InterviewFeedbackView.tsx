import React, { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, Loader2, RefreshCw, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { FEEDBACK_DISLIKED_OPTIONS, FEEDBACK_LIKED_OPTIONS, feedbackLabel } from '../../data/interviewFeedback';

// Feedback candidates gave while their scorecard was loading (server/interviewFeedback.ts).
// Read straight from Firestore through the local-only /api/admin/feedback route.

interface FeedbackRow {
  id: string;
  email: string;
  scenarioTitle: string;
  track: string;
  level: string;
  mode: string;
  rating: number | null;
  liked: string[];
  likedOther: string;
  disliked: string[];
  dislikedOther: string;
  createdAt: string;
}

const fmtDate = (iso: string) =>
  iso ? new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-';

const countOf = (rows: FeedbackRow[], key: 'liked' | 'disliked', id: string) => rows.filter((r) => (r[key] || []).includes(id)).length;

export function InterviewFeedbackView() {
  const [rows, setRows] = useState<FeedbackRow[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const r = await fetch('/api/admin/feedback');
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || `HTTP ${r.status}`);
      setRows(j.feedback || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (error) {
    return (
      <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
        <span>{error}</span>
      </div>
    );
  }
  if (!rows) return <Loader2 className="size-5 animate-spin text-slate-400" />;

  const rated = rows.filter((r) => typeof r.rating === 'number');
  const avg = rated.length ? (rated.reduce((a, r) => a + (r.rating || 0), 0) / rated.length).toFixed(1) : '-';

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-700">
          <span className="font-bold">{rows.length}</span> responses · average rating <span className="font-bold">{avg}</span> / 5
          {rated.length > 0 && <span className="text-slate-500"> from {rated.length} ratings</span>}
        </p>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </Button>
      </div>

      {rows.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {([['liked', 'What they liked', FEEDBACK_LIKED_OPTIONS], ['disliked', "What didn't go well", FEEDBACK_DISLIKED_OPTIONS]] as const).map(([key, title, options]) => (
            <div key={key} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">{title}</h3>
              <ul className="space-y-1 text-sm">
                {options
                  .map((o) => ({ ...o, n: countOf(rows, key, o.id) }))
                  .sort((a, b) => b.n - a.n)
                  .map((o) => (
                    <li key={o.id} className="flex justify-between gap-2">
                      <span className="text-slate-700">{o.label}</span>
                      <span className="font-bold text-slate-900">{o.n}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {rows.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
          No feedback yet. It appears here after someone finishes an interview and fills in the card while their scorecard loads.
        </div>
      ) : (
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-900">{r.scenarioTitle}</span>
                  <span className="text-slate-500"> · {r.track} · {r.level?.toUpperCase()} · {r.mode}</span>
                </div>
                <span className="text-xs text-slate-500">{r.email || 'unknown'} · {fmtDate(r.createdAt)}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-0.5" aria-label={r.rating ? `${r.rating} of 5 stars` : 'No rating'}>
                {r.rating
                  ? [1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={`size-4 ${n <= (r.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    ))
                  : <span className="text-xs text-slate-400">No rating</span>}
              </div>
              {(r.liked?.length > 0 || r.likedOther) && (
                <p className="mt-1.5 text-slate-700">
                  <span className="font-semibold text-emerald-700">Liked:</span> {[...(r.liked || []).map(feedbackLabel), r.likedOther].filter(Boolean).join(' · ')}
                </p>
              )}
              {(r.disliked?.length > 0 || r.dislikedOther) && (
                <p className="mt-1 text-slate-700">
                  <span className="font-semibold text-rose-700">Didn't go well:</span> {[...(r.disliked || []).map(feedbackLabel), r.dislikedOther].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
