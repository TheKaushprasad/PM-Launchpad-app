import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Check,
  ClipboardList,
  Compass,
  Puzzle,
  FileText,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModal';
import { isAssignmentSolverEnabled, isPrdCoachEnabled, isProductStrategyEnabled } from '../lib/featureFlags';
import { useToolCredits } from './payments/ToolPaywall';
import type { ToolKey } from './payments/api';

interface Tool {
  key: ToolKey;
  title: string;
  description: string;
  iconType: string;
  iconContainerStyle: string;
  features: string[];
  action: string;
  cta: string;
  isNew?: boolean;
}

type UsageLine = (key: ToolKey) => { text: string; left: boolean } | null;

const ToolIcon: React.FC<{ type: string }> = ({ type }) => {
  if (type === 'linkedin') {
    return (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    );
  }
  if (type === 'strategy') return <Compass className="w-6 h-6 stroke-2" />;
  if (type === 'assignment') return <Puzzle className="w-6 h-6 stroke-2" />;
  if (type === 'prd') return <ClipboardList className="w-6 h-6 stroke-2" />;
  return <FileText className="w-6 h-6 stroke-2" />;
};

// Compact card: icon + title (+ New), the free-use line, one sentence, two bullets, the button.
const ToolCard: React.FC<{ tool: Tool; usage: ReturnType<UsageLine>; onOpen: (path: string) => void }> = ({ tool, usage, onOpen }) => (
  <div
    onClick={() => onOpen(tool.action)}
    className="group bg-white rounded-3xl border border-slate-200/90 p-5 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer"
  >
    <div className="flex flex-col grow">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl ${tool.iconContainerStyle} flex items-center justify-center shrink-0 [&_svg]:w-5 [&_svg]:h-5 group-hover:scale-105 transition-transform duration-200`}>
          <ToolIcon type={tool.iconType} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-tight group-hover:text-brand-950 transition-colors">{tool.title}</h3>
            {tool.isNew && (
              <span className="shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#047857]">New</span>
            )}
          </div>
          {usage && (
            <p className={`text-xs font-bold mt-0.5 ${usage.left ? 'text-[#047857]' : 'text-slate-400'}`}>{usage.text}</p>
          )}
        </div>
      </div>

      <p className="text-sm text-slate-500 leading-relaxed mb-3">{tool.description}</p>

      <ul className="space-y-1.5 mb-5">
        {tool.features.slice(0, 2).map((feat) => (
          <li key={feat} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
            <span className="w-4 h-4 mt-0.5 rounded-full bg-[#059669] flex items-center justify-center shrink-0 text-white">
              <Check className="w-3 h-3 stroke-3" />
            </span>
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </div>

    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpen(tool.action);
      }}
      className="w-full py-3 px-4 rounded-xl bg-[#064E3B] hover:bg-[#043C2C] active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-between transition-colors group/btn cursor-pointer"
    >
      <span>{tool.cta}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover/btn:translate-x-1" />
    </button>
  </div>
);

const ToolGroup: React.FC<{ title: string; subtitle: string; tools: Tool[]; columns: string; usageLine: UsageLine; onOpen: (path: string) => void }> = ({ title, subtitle, tools, columns, usageLine, onOpen }) => (
  <section className="mb-7">
    <div className="mb-3 px-1">
      <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
    <div data-reveal-stagger className={`grid grid-cols-1 ${columns} gap-4 sm:gap-5 items-stretch`}>
      {tools.map((tool) => <ToolCard key={tool.key} tool={tool} usage={usageLine(tool.key)} onOpen={onOpen} />)}
    </div>
  </section>
);

export const ToolsHub: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [pendingRedirect, setPendingRedirect] = useState<string>('/tools');

  // One free use of each tool per month for signed-in users (server/payments/catalog.ts). The line
  // under each card's title shows what's left, so people know before they click.
  const { credits } = useToolCredits();

  const getNoticed: Tool[] = [
    {
      key: 'linkedin',
      title: 'LinkedIn Profile Optimiser',
      description: 'Turn your LinkedIn profile into one that recruiters for PM roles find and read.',
      iconType: 'linkedin',
      iconContainerStyle: 'bg-[#ECFDF5] text-[#047857]',
      features: ['Headline and About section fixes', 'Search keywords check'],
      action: '/tools/linkedin-optimiser',
      cta: 'Optimise profile',
    },
    {
      key: 'resume',
      title: 'PM Resume Auditor',
      description: 'Find the biggest gaps in your PM resume and fix them before you apply.',
      iconType: 'resume',
      iconContainerStyle: 'bg-[#ECFDF5] text-[#047857]',
      features: ['Impact and ownership score', 'ATS check and bullet rewrites'],
      action: '/tools/resume-auditor',
      cta: 'Audit resume',
    },
  ];

  // Each can be switched off with its VITE_*_ENABLED=false flag (lib/featureFlags.ts).
  const practise: Tool[] = [
    ...(isAssignmentSolverEnabled ? [{
      key: 'solver' as const,
      title: 'PM Assignment Solver',
      description: 'Get a researched first draft of your take-home assignment, then make it yours.',
      iconType: 'assignment',
      iconContainerStyle: 'bg-violet-50 text-violet-700',
      features: ['Company research with sources', 'Critic score per section', 'A draft for every question'],
      action: '/tools/assignment-solver',
      cta: 'Start an assignment',
    }] : []),
    ...(isProductStrategyEnabled ? [{
      key: 'strategy' as const,
      title: 'AI Product Strategy',
      description: 'Learn a strategy framework by filling it in for your product.',
      iconType: 'strategy',
      iconContainerStyle: 'bg-amber-50 text-amber-700',
      features: ['Canvas, Vision Board or One-page', 'Quality score, download as PDF', 'Assumptions labelled'],
      action: '/tools/ai-product-strategy',
      cta: 'Build a strategy',
      isNew: true,
    }] : []),
    ...(isPrdCoachEnabled ? [{
      key: 'prd' as const,
      title: 'PRD Coach',
      description: 'Write your own PRD, section by section, and learn what good looks like.',
      iconType: 'prd',
      iconContainerStyle: 'bg-sky-50 text-sky-700',
      features: ['Score and fixes for each section', 'Example PRD to compare with', '7 guided sections'],
      action: '/tools/prd-coach',
      cta: 'Write a PRD',
      isNew: true,
    }] : []),
  ];

  /** "1 free use left this month" / "Used · back on 1 Dec" for signed-in users; nothing otherwise. */
  const usageLine = (key: ToolKey): { text: string; left: boolean } | null => {
    const c = credits?.signedIn ? credits[key] : undefined;
    if (!c) return null;
    if (c.freeLeft > 0) return { text: `${c.freeLeft} free use left this month`, left: true };
    if (c.credits > 0) return { text: `${c.credits} paid ${c.credits === 1 ? 'run' : 'runs'} left`, left: true };
    if (!c.freeResetsOn) return null;
    const back = new Date(`${c.freeResetsOn}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' });
    return { text: `Free use used · back on ${back}`, left: false };
  };

  const handleAction = (actionUrl: string) => {
    if (actionUrl.startsWith('http')) {
      window.open(actionUrl, '_blank');
      return;
    }

    navigate(actionUrl);
  };

  return (
    <>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
        redirectTo={pendingRedirect}
        onSuccess={() => {
          setAuthModalOpen(false);
          navigate(pendingRedirect);
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 pb-20"
      >
        {/* Hero Section Banner */}
        <header className="relative w-full bg-linear-to-r from-[#032A1F] via-[#043C2C] to-[#064E3B] rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-xl border border-[#065F46]/60 mb-7">
          {/* Subtle vibrant background glow shapes */}
          <div 
            className="absolute top-0 right-0 w-[480px] h-[480px] bg-linear-to-bl from-brand-600/25 via-brand-600/15 to-transparent rounded-full blur-[100px] pointer-events-none -translate-y-1/4 translate-x-1/4" 
            aria-hidden="true"
          />
          <div 
            className="absolute bottom-0 right-1/4 w-[320px] h-[320px] bg-brand-500/10 rounded-full blur-[90px] pointer-events-none" 
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 sm:mb-3 tracking-tight leading-[1.08] text-white">
                Tools to Get{' '}
                <span className="text-[#6EE7B7]">You Hired.</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-lg">
                Don't just learn the theory. Fix your resume and LinkedIn, then practise real PM work, with AI feedback on every step.
              </p>
            </div>

            {/* 3D Visual: Document, Magnifying Glass, Floating Tilted Badge & Sparkles */}
            <div className="hidden md:flex items-center justify-center shrink-0 self-center lg:self-auto pr-2">
              <div className="relative w-72 h-56 scale-[0.7] -my-8 origin-center">
                {/* Decorative Sparkle Crosses */}
                <div className="absolute top-2 left-6 text-white/70 animate-pulse">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>
                <div className="absolute bottom-4 left-24 text-white/50">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>
                <div className="absolute bottom-12 right-2 text-white/60">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                  </svg>
                </div>

                <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 300 220" fill="none">
                  <defs>
                    <linearGradient id="docGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#EEF2F6" />
                    </linearGradient>
                    <linearGradient id="lensGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.25" />
                    </linearGradient>
                    <linearGradient id="darkBadgeGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1E293B" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                    <filter id="docShadow" x="-10%" y="-10%" width="130%" height="130%">
                      <feDropShadow dx="3" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity="0.35" />
                    </filter>
                  </defs>

                  {/* 1. Resume Document (White 3D Sheet) */}
                  <g filter="url(#docShadow)">
                    <rect x="70" y="15" width="135" height="185" rx="16" fill="url(#docGrad)" stroke="#FFFFFF" strokeWidth="2" />
                    
                    {/* User profile avatar icon at top left */}
                    <rect x="85" y="32" width="28" height="28" rx="8" fill="#6EE7B7" />
                    <circle cx="99" cy="42" r="5" fill="#FFFFFF" />
                    <path d="M 91 55 C 91 49 107 49 107 55 Z" fill="#FFFFFF" />

                    {/* Resume Header lines */}
                    <rect x="122" y="36" width="65" height="6" rx="3" fill="#A7F3D0" />
                    <rect x="122" y="48" width="45" height="5" rx="2.5" fill="#CBD5E1" />

                    {/* Resume Body lines & bullet placeholders */}
                    <rect x="85" y="74" width="105" height="5" rx="2.5" fill="#94A3B8" />
                    <rect x="85" y="86" width="95" height="5" rx="2.5" fill="#CBD5E1" />
                    <rect x="85" y="98" width="85" height="5" rx="2.5" fill="#CBD5E1" />
                    <rect x="85" y="110" width="100" height="5" rx="2.5" fill="#94A3B8" />
                    <rect x="85" y="122" width="70" height="5" rx="2.5" fill="#CBD5E1" />
                    <rect x="85" y="134" width="90" height="5" rx="2.5" fill="#CBD5E1" />
                    <rect x="85" y="146" width="60" height="5" rx="2.5" fill="#CBD5E1" />
                    <rect x="85" y="158" width="80" height="5" rx="2.5" fill="#CBD5E1" />
                  </g>

                  {/* 2. Floating Tilted Dark Card: Update ↗ / Optimise / Get Hired */}
                  <g transform="rotate(4 220 85)" filter="url(#docShadow)">
                    <rect x="165" y="45" width="112" height="78" rx="16" fill="url(#darkBadgeGrad)" stroke="#6EE7B7" strokeWidth="1.2" />
                    
                    {/* Text rows inside the badge */}
                    <text x="178" y="70" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="system-ui, sans-serif">
                      Update ↗
                    </text>
                    <text x="178" y="88" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="system-ui, sans-serif">
                      Optimise
                    </text>
                    <text x="178" y="106" fill="#6EE7B7" fontSize="11" fontWeight="800" fontFamily="system-ui, sans-serif">
                      Get Hired
                    </text>
                  </g>

                  {/* 3. Floating 3D Magnifying Glass */}
                  <g filter="url(#docShadow)">
                    {/* Magnifying Glass Lens */}
                    <circle cx="160" cy="140" r="28" fill="url(#lensGrad)" stroke="#047857" strokeWidth="5" />
                    {/* Glass Specular Reflection */}
                    <path d="M 144 125 A 20 20 0 0 1 176 125 A 20 20 0 0 0 144 125 Z" fill="#FFFFFF" fillOpacity="0.4" />
                    {/* Magnifying Glass Handle */}
                    <rect x="180" y="158" width="10" height="32" rx="5" transform="rotate(-45 180 158)" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </header>

        <ToolGroup title="Get noticed" subtitle="Make recruiters stop on your resume and LinkedIn." tools={getNoticed} columns="md:grid-cols-2 lg:grid-cols-3" usageLine={usageLine} onOpen={handleAction} />
        {practise.length > 0 && (
          <ToolGroup title="Practise the PM job" subtitle="Do real PM work, with AI feedback on every step." tools={practise} columns="md:grid-cols-2 lg:grid-cols-3" usageLine={usageLine} onOpen={handleAction} />
        )}

        {/* Bottom Manual Review Banner Card */}
        <div className="w-full bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#047857] flex items-center justify-center shrink-0 shadow-2xs">
              <Users className="w-6 h-6 stroke-2" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                Want a human review?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-normal mt-0.5">
                1-on-1 resume reviews and expert mock interviews. Tell us what you need and we'll get back to you.
              </p>
            </div>
          </div>

          <a 
            href="https://docs.google.com/forms/u/0/d/1gntWQiHg_RBueOSOqZzVQiJ4UGfMIvyuAYUsiuxbOUc/preview" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-[#ECFDF5] hover:bg-[#A7F3D0] text-[#047857] font-bold text-sm transition-colors shadow-2xs flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <span>Request a session</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </>
  );
};
