import React, { useEffect, useState } from 'react';
import { StickyNote } from 'lucide-react';

// Personal notes for a lesson. Saved as you type, in this browser only (like the rest of Level 1 progress).
const STORAGE_KEY = 'aipm_notes_v1';

const loadAll = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
};

export const LessonNotes: React.FC<{ lessonId: string; subtitle?: string }> = ({ lessonId, subtitle }) => {
  const [text, setText] = useState(() => loadAll()[lessonId] ?? '');
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    if (saved) return;
    const t = setTimeout(() => {
      try {
        const all = loadAll();
        if (text.trim()) all[lessonId] = text;
        else delete all[lessonId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      } catch {
        // Storage blocked (private window): notes last for this visit only.
      }
      setSaved(true);
    }, 400);
    return () => clearTimeout(t);
  }, [text, saved, lessonId]);

  return (
    <section aria-label="Personal notes" className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 space-y-3">
      <header className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <span className="size-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <StickyNote className="size-4 text-emerald-700" />
          </span>
          <div>
            <label htmlFor={`notes-${lessonId}`} className="block text-sm font-black text-slate-900">Personal Notes</label>
            {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
          </div>
        </div>
        <span className="inline-flex items-center h-6 px-2 rounded-md border border-slate-200 text-[11px] font-bold text-slate-500">
          {saved ? 'Saved' : 'Saving…'}
        </span>
      </header>
      <textarea
        id={`notes-${lessonId}`}
        value={text}
        onChange={(e) => { setText(e.target.value); setSaved(false); }}
        placeholder="Write down your key learnings, frameworks, or interview takeaways for this day. Notes auto-save as you type..."
        rows={6}
        className="block w-full resize-y rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-300 focus:bg-white"
      />
      <p className="text-[11px] text-slate-400">Saved in this browser only.</p>
    </section>
  );
};
