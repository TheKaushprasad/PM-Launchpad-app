import { useSyncExternalStore } from 'react';

// Progress for the local-only PM → AI PM course lives in this browser only, kept apart from the
// 45-day course progress so AI PM Day 5 never ticks 45-day Day 5.
const STORAGE_KEY = 'aipm_progress_v1';

export interface AiPmProgress {
  done: number[];
  checks: Record<string, boolean>;
  skills: Record<string, number>;
  notes: Record<string, string>; // day number -> personal notes
  bookmarks: number[];
  videosDone: number[];
}

const empty: AiPmProgress = { done: [], checks: {}, skills: {}, notes: {}, bookmarks: [], videosDone: [] };

const load = (): AiPmProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
};

let state: AiPmProgress = load();
const listeners = new Set<() => void>();

const save = (next: AiPmProgress) => {
  state = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage blocked (private window): progress just lasts for this visit.
  }
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useAiPmProgress = () => {
  const progress = useSyncExternalStore(subscribe, () => state);
  return {
    progress,
    isDone: (day: number) => progress.done.includes(day),
    toggleDay: (day: number) =>
      save({
        ...state,
        done: state.done.includes(day) ? state.done.filter((d) => d !== day) : [...state.done, day],
      }),
    toggleCheck: (id: string) => save({ ...state, checks: { ...state.checks, [id]: !state.checks[id] } }),
    setSkill: (id: string, score: number) => save({ ...state, skills: { ...state.skills, [id]: score } }),
    isBookmarked: (day: number) => progress.bookmarks.includes(day),
    toggleBookmark: (day: number) =>
      save({
        ...state,
        bookmarks: state.bookmarks.includes(day) ? state.bookmarks.filter((d) => d !== day) : [...state.bookmarks, day].sort((a, b) => a - b),
      }),
    isVideoDone: (day: number) => progress.videosDone.includes(day),
    toggleVideoDone: (day: number) =>
      save({
        ...state,
        videosDone: state.videosDone.includes(day) ? state.videosDone.filter((d) => d !== day) : [...state.videosDone, day],
      }),
    setNote: (day: number, text: string) => save({ ...state, notes: { ...state.notes, [day]: text.slice(0, 5000) } }),
  };
};
