import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import type { AiPmTable } from '../../data/aiPmCourse/levelTypes';

export const PageTitle: React.FC<{ eyebrow?: string; title: string; children?: React.ReactNode }> = ({ eyebrow, title, children }) => (
  <header className="space-y-2">
    {eyebrow && <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">{eyebrow}</p>}
    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
    {children && <div className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">{children}</div>}
  </header>
);

export const Section: React.FC<{ title: string; children: React.ReactNode; id?: string }> = ({ title, children, id }) => (
  <section data-reveal id={id} className="space-y-3 scroll-mt-24">
    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">{title}</h2>
    {children}
  </section>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 ${className}`}>{children}</div>
);

export const Prose: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
);

export const Bullets: React.FC<{ items: string[]; ordered?: boolean }> = ({ items, ordered }) => {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className={`space-y-1.5 text-sm text-slate-700 leading-relaxed pl-5 ${ordered ? 'list-decimal' : 'list-disc'}`}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </Tag>
  );
};

export const DataTable: React.FC<{ table: AiPmTable; firstColBold?: boolean }> = ({ table, firstColBold = true }) => (
  <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-collapse min-w-[640px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200/80">
            {table.headers.map((h) => (
              <th key={h} className="py-3 px-4 font-black text-slate-900 text-xs uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-600">
          {table.rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 last:border-0 align-top">
              {row.map((cell, j) => (
                <td key={j} className={`py-3 px-4 ${j === 0 && firstColBold ? 'font-bold text-slate-900' : ''}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const Checklist: React.FC<{
  idPrefix: string;
  items: string[];
  checks: Record<string, boolean>;
  onToggle: (id: string) => void;
}> = ({ idPrefix, items, checks, onToggle }) => (
  <ul className="space-y-2">
    {items.map((text, i) => {
      const id = `${idPrefix}-${i}`;
      const on = !!checks[id];
      return (
        <li key={id}>
          <button
            type="button"
            onClick={() => onToggle(id)}
            className="w-full flex items-start gap-3 text-left text-sm leading-relaxed p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            aria-pressed={on}
          >
            {on ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
            ) : (
              <Circle className="w-5 h-5 shrink-0 text-slate-300" />
            )}
            <span className={on ? 'text-slate-500 line-through decoration-slate-300' : 'text-slate-700'}>{text}</span>
          </button>
        </li>
      );
    })}
  </ul>
);
