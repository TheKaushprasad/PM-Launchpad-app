import { useSyncExternalStore } from 'react';

// Level 1 progress, kept in this browser only and apart from the old 104-day plan's progress.
const STORAGE_KEY = 'aipm_level1_v1';

export interface Level1Progress {
  lessonsDone: string[]; // lesson ids such as "1.2"
  checks: Record<string, boolean>; // "m1-0" = milestone 1, "Done when" item 0
  quizPassed: Record<string, boolean>; // lesson id -> quiz passed (quizzes are optional)
  bookmarks: string[]; // lesson ids
  videosDone: Record<string, boolean>; // "lessonId:videoId" -> marked complete
}

const empty: Level1Progress = { lessonsDone: [], checks: {}, quizPassed: {}, bookmarks: [], videosDone: {} };

const load = (): Level1Progress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
};

let state: Level1Progress = load();
const listeners = new Set<() => void>();

const save = (next: Level1Progress) => {
  state = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage blocked (private window): progress lasts for this visit only.
  }
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useLevel1Progress = () => {
  const progress = useSyncExternalStore(subscribe, () => state);
  return {
    progress,
    isLessonDone: (id: string) => progress.lessonsDone.includes(id),
    passQuiz: (id: string) => save({ ...state, quizPassed: { ...state.quizPassed, [id]: true } }),
    toggleBookmark: (id: string) =>
      save({ ...state, bookmarks: state.bookmarks.includes(id) ? state.bookmarks.filter((x) => x !== id) : [...state.bookmarks, id] }),
    toggleVideo: (key: string) => save({ ...state, videosDone: { ...state.videosDone, [key]: !state.videosDone[key] } }),
    toggleLesson: (id: string) =>
      save({
        ...state,
        lessonsDone: state.lessonsDone.includes(id) ? state.lessonsDone.filter((x) => x !== id) : [...state.lessonsDone, id],
      }),
    toggleCheck: (id: string) => save({ ...state, checks: { ...state.checks, [id]: !state.checks[id] } }),
    milestoneDone: (week: number, count: number) => Array.from({ length: count }, (_, i) => state.checks[`m${week}-${i}`]).every(Boolean),
  };
};
