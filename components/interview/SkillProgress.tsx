import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { InterviewSessionHistory, PillarKey } from '../../types/interview';
import { BASE_PILLAR_NAMES, PILLAR_KEYS } from '../../data/interviewTracks';

interface SkillProgressProps {
  history: InterviewSessionHistory[];
}

const average = (values: number[]) => values.reduce((a, b) => a + b, 0) / values.length;

/**
 * Shows how each of the five skills moved between earlier and recent interviews,
 * so practice feels like progress rather than a list of scores.
 */
export const SkillProgress: React.FC<SkillProgressProps> = ({ history }) => {
  // Oldest first, only sessions saved with per-skill scores
  const sessions = [...history]
    .filter((h) => h.pillarScores && PILLAR_KEYS.some((k) => typeof h.pillarScores?.[k] === 'number'))
    .sort((a, b) => (a.createdAt || a.id).localeCompare(b.createdAt || b.id));

  if (sessions.length < 2) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6">
        <h2 className="text-base font-extrabold text-slate-900">Your skill progress</h2>
        <p className="text-xs text-slate-500 mt-1">
          Finish {2 - sessions.length} more scored interview{sessions.length === 1 ? '' : 's'} to see how each skill is moving.
        </p>
      </div>
    );
  }

  const span = Math.min(3, Math.floor(sessions.length / 2));
  const earlier = sessions.slice(0, span);
  const recent = sessions.slice(-span);

  const rows = PILLAR_KEYS.map((key: PillarKey) => {
    const before = earlier.map((s) => s.pillarScores?.[key]).filter((v): v is number => typeof v === 'number');
    const after = recent.map((s) => s.pillarScores?.[key]).filter((v): v is number => typeof v === 'number');
    const from = before.length ? average(before) : null;
    const to = after.length ? average(after) : null;
    return { key, from, to, delta: from !== null && to !== null ? to - from : 0 };
  });

  const weakest = [...rows].filter((r) => r.to !== null).sort((a, b) => (a.to as number) - (b.to as number))[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Your skill progress</h2>
          <p className="text-xs text-slate-500">
            Average of your first {span} vs your latest {span} scored interviews, out of 5.
          </p>
        </div>
        {weakest && (
          <p className="text-xs font-semibold text-brand-700">
            Focus next: {BASE_PILLAR_NAMES[weakest.key]}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {rows.map((r) => {
          const Icon = r.delta > 0.2 ? TrendingUp : r.delta < -0.2 ? TrendingDown : Minus;
          const tone = r.delta > 0.2 ? 'text-emerald-600' : r.delta < -0.2 ? 'text-rose-600' : 'text-slate-400';
          return (
            <div key={r.key} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500 leading-tight min-h-[2rem]">{BASE_PILLAR_NAMES[r.key]}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-black text-slate-900 tabular-nums">
                  {r.from !== null ? r.from.toFixed(1) : '–'} → {r.to !== null ? r.to.toFixed(1) : '–'}
                </span>
                <Icon className={`w-4 h-4 ${tone}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
