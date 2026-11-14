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

export const LessonNotes: React.FC<{ lessonId: string }> = ({ lessonId }) => {
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
    <section aria-label="My notes" className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <header className="px-4 py-3 border-b border-amber-100 bg-amber-50 flex items-center justify-between gap-2">
        <label htmlFor={`notes-${lessonId}`} className="text-[11px] font-black uppercase tracking-widest text-amber-800 flex items-center gap-1.5">
          <StickyNote className="size-4" /> My notes
        </label>
        <span className="text-[11px] font-bold text-slate-400">{saved ? (text.trim() ? 'Saved' : '') : 'Saving…'}</span>
      </header>
      <textarea
        id={`notes-${lessonId}`}
        value={text}
        onChange={(e) => { setText(e.target.value); setSaved(false); }}
        placeholder="Write what you learned, questions, or ideas for your product…"
        rows={6}
        className="block w-full resize-y px-4 py-3 text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:outline-none"
      />
      <p className="px-4 pb-3 text-[11px] text-slate-400">Saved in this browser only.</p>
    </section>
  );
};
