import React from 'react';
import { Briefcase } from 'lucide-react';
import type { PublicBuddyProfile } from '../../lib/productBuddy/types';

export const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 ${className}`}>{children}</div>
);

/** Toggle chips for picking one or many values from a short list. */
export function Chips<T extends string>({ options, value, onChange, multiple = true, labels }: {
  options: readonly T[];
  value: T[];
  onChange: (v: T[]) => void;
  multiple?: boolean;
  labels?: Partial<Record<T, string>>;
}) {
  const toggle = (opt: T) => {
    if (!multiple) return onChange([opt]);
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const on = value.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(opt)}
            className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${on ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-brand-50'}`}
          >
            {labels?.[opt] || opt}
          </button>
        );
      })}
    </div>
  );
}

const TONES: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-800 border-amber-200',
  waiting: 'bg-amber-50 text-amber-800 border-amber-200',
  accepted: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  confirmed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  completed: 'bg-sky-50 text-sky-800 border-sky-200',
  declined: 'bg-slate-100 text-slate-600 border-slate-200',
  expired: 'bg-slate-100 text-slate-600 border-slate-200',
  missed: 'bg-slate-100 text-slate-600 border-slate-200',
  withdrawn: 'bg-slate-100 text-slate-600 border-slate-200',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  taken: 'bg-slate-100 text-slate-600 border-slate-200',
};

export const StatusPill: React.FC<{ status: string; label?: string }> = ({ status, label }) => (
  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-black uppercase tracking-wide ${TONES[status] || TONES.pending}`}>
    {label || status}
  </span>
);

export const Avatar: React.FC<{ name: string }> = ({ name }) => (
  <div className="size-10 shrink-0 rounded-full bg-brand-100 text-brand-800 font-black flex items-center justify-center">
    {name.trim().charAt(0).toUpperCase() || '?'}
  </div>
);

export const PersonSummary: React.FC<{ profile: PublicBuddyProfile }> = ({ profile }) => (
  <div className="flex items-start gap-3 min-w-0">
    <Avatar name={profile.name} />
    <div className="min-w-0">
      <p className="font-black text-slate-900 truncate">{profile.name}</p>
      <p className="text-xs text-slate-600 flex items-center gap-1">
        <Briefcase className="size-3.5 shrink-0" />
        <span className="truncate">
          {profile.currentRole}{profile.organisation ? ` · ${profile.organisation}` : ''} · {profile.experienceYears} yr{profile.experienceYears === 1 ? '' : 's'}
        </span>
      </p>
    </div>
  </div>
);
