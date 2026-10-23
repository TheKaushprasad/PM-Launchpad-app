import React, { useEffect } from 'react';
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { Laptop } from 'lucide-react';
import { AiPmOverview, AiPmPlan } from './AiPmHome';
import { AiPmDayPage } from './AiPmDayPage';
import {
  AiPmWhy, AiPmWeeks, AiPmCapstone, AiPmTemplates, AiPmSkills, AiPmPortfolio, AiPmInterviews, AiPmReading,
} from './AiPmSections';

// The whole PM → AI PM course. App.tsx only loads this file when the course is switched on
// (always in `npm run dev`), so none of it ships to the live site. See lib/featureFlags.ts.

const TABS = [
  { to: '/ai-pm', label: 'Overview', end: true },
  { to: '/ai-pm/plan', label: '90-day plan' },
  { to: '/ai-pm/why', label: 'Why this course' },
  { to: '/ai-pm/weeks', label: '12-week summary' },
  { to: '/ai-pm/capstone', label: 'Capstone' },
  { to: '/ai-pm/templates', label: 'Templates' },
  { to: '/ai-pm/skills', label: 'Skills checklist' },
  { to: '/ai-pm/portfolio', label: 'Portfolio and tools' },
  { to: '/ai-pm/interviews', label: 'Interview prep' },
  { to: '/ai-pm/reading', label: 'Reading and videos' },
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

const AiPmCourse: React.FC = () => (
  <div className="px-3 md:px-5 py-4 md:py-6 max-w-[1280px] mx-auto space-y-5 pb-24">
    <HashScroller />
    <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 w-fit">
      <Laptop className="w-4 h-4" />
      Local preview only. This course is hidden on thenoobpm.com.
    </div>
    <nav className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto no-scrollbar">
      <div className="flex gap-1.5 min-w-max border-b border-slate-200/80 pb-2">
        {TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              `h-9 px-3.5 rounded-xl text-xs font-bold flex items-center whitespace-nowrap transition-colors ${
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
      <Route index element={<AiPmOverview />} />
      <Route path="plan" element={<AiPmPlan />} />
      <Route path="day/:day" element={<AiPmDayPage />} />
      <Route path="why" element={<AiPmWhy />} />
      <Route path="weeks" element={<AiPmWeeks />} />
      <Route path="capstone" element={<AiPmCapstone />} />
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
