import React, { useEffect } from 'react';
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { AiPmPlan } from './AiPmHome';
import {
  LevelsOverview, ProductRules, Level1Home, Level1WeekPage, Level1LessonPage, Level1MilestonePage, Level2Page,
} from './Levels';
import { AiPmDayPage } from './AiPmDayPage';
import {
  AiPmWhy, AiPmWeeks, AiPmTemplates, AiPmSkills, AiPmPortfolio, AiPmInterviews, AiPmReading,
} from './AiPmSections';

// The whole PM → AI PM course. App.tsx only loads this file when the course is switched on
// (always in `npm run dev`), so none of it ships to the live site. See lib/featureFlags.ts.

// The course is now "AI PM in 90 Days: Level 1 + Level 2" (owner's plan, 2026-11-13). The old 104-day plan's pages
// still work by URL (/ai-pm/plan, /ai-pm/day/N, ...) until the owner confirms they can go, but are off the tab bar.
const TABS = [
  { to: '/ai-pm', label: 'Overview', end: true },
  { to: '/ai-pm/level-1', label: 'Level 1 · Free' },
  { to: '/ai-pm/level-2', label: 'Level 2 · Cohort' },
  { to: '/ai-pm/product', label: 'Your product' },
];

// Jump to a #t3-style anchor after navigation (used by template chips on day pages).
const HashScroller = () => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }, [hash, pathname]);
  return null;
};

// Level pages open at the top when you move between them (the app scrolls inside <main>, not the window).
const LevelScrollTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash || pathname.startsWith('/ai-pm/day/')) return;
    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
};

const AiPmCourse: React.FC = () => (
  <div className="px-3 md:px-5 py-4 md:py-6 max-w-[1280px] mx-auto space-y-5 pb-24">
    <HashScroller />
    <LevelScrollTop />
    <nav className="sticky top-0 z-30 -mx-3 px-3 md:-mx-5 md:px-5 pt-2 bg-zinc-50/95 backdrop-blur-md overflow-x-auto no-scrollbar">
      <div className="flex gap-1.5 min-w-max border-b border-slate-200/80 pb-2">
        {TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              `tap-target h-9 px-3.5 rounded-xl text-xs font-bold flex items-center whitespace-nowrap transition-colors ${
                isActive ? 'bg-[#111827] text-white' : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`
            }
          >
            {t.label}
          </NavLink>
        ))}
      </div>
    </nav>
    <Routes>
      <Route index element={<LevelsOverview />} />
      <Route path="level-1" element={<Level1Home />} />
      <Route path="level-1/week/:week" element={<Level1WeekPage />} />
      <Route path="level-1/lesson/:lesson" element={<Level1LessonPage />} />
      <Route path="level-1/milestone/:week" element={<Level1MilestonePage />} />
      <Route path="level-2" element={<Level2Page />} />
      <Route path="product" element={<ProductRules />} />
      <Route path="plan" element={<AiPmPlan />} />
      <Route path="day/:day" element={<AiPmDayPage />} />
      <Route path="why" element={<AiPmWhy />} />
      <Route path="weeks" element={<AiPmWeeks />} />
      <Route path="templates" element={<AiPmTemplates />} />
      <Route path="skills" element={<AiPmSkills />} />
      <Route path="portfolio" element={<AiPmPortfolio />} />
      <Route path="interviews" element={<AiPmInterviews />} />
      <Route path="reading" element={<AiPmReading />} />
      <Route path="*" element={<Navigate to="/ai-pm" replace />} />
    </Routes>
  </div>
);

export default AiPmCourse;
