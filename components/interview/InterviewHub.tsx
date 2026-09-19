import React, { useState } from 'react';
import { 
  Sparkles, 
  BarChart2,
  Users,
  FileText,
  Play,
  Trophy,
  LayoutGrid,
  Briefcase,
  UserCheck,
  Compass,
  Code2,
  Search, 
  ArrowRight, 
  History, 
  Bookmark
} from 'lucide-react';
import { InterviewScenario, InterviewerPersona, InterviewMode } from '../../types/interview';
import { INTERVIEW_SCENARIOS } from '../../data/interviewScenarios';
import { SetupModal } from './SetupModal';
import { AccessRequestModal } from './AccessRequestModal';
import { InterviewStage } from './InterviewStage';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';

export const InterviewHub: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showAccessModal, setShowAccessModal] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [pendingScenario, setPendingScenario] = useState<InterviewScenario | null>(null);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('interview_studio_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('interview_studio_bookmarks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const { user, interviewHistory } = useAuth();
  const history = interviewHistory || [];

  // Active Session & Setup Modal State
  const [setupScenario, setSetupScenario] = useState<InterviewScenario | null>(null);
  const [activeSession, setActiveSession] = useState<{
    scenario: InterviewScenario;
    persona: InterviewerPersona;
    mode: InterviewMode;
  } | null>(null);

  const handleStartInterview = (sc: InterviewScenario) => {
    if (!user) {
      setPendingScenario(sc);
      setAuthModalOpen(true);
      return;
    }
    setSetupScenario(sc);
  };

  const tracks = [
    { id: 'all', label: 'All Tracks (143)', icon: LayoutGrid },
    { id: 'cases', label: 'Real Case Studies (42)', icon: Briefcase },
    { id: 'behavioral', label: 'Behavioral & Fit (38)', icon: UserCheck },
    { id: 'strategy', label: 'Product Strategy & Vision (28)', icon: Compass },
    { id: 'technical', label: 'Technical for PMs (25)', icon: Code2 },
  ];

  // Filter Scenarios
  const filteredScenarios = INTERVIEW_SCENARIOS.filter(sc => {
    let matchesTrack = true;
    if (selectedTrack === 'cases') {
      matchesTrack = sc.track === 'rca';
    } else if (selectedTrack === 'behavioral') {
      matchesTrack = sc.track === 'design' || sc.keyEvaluationMetrics.some(m => 
        m.toLowerCase().includes('behavioral') || 
        m.toLowerCase().includes('user') || 
        m.toLowerCase().includes('intent')
      );
    } else if (selectedTrack === 'strategy') {
      matchesTrack = sc.track === 'strategy';
    } else if (selectedTrack === 'technical') {
      matchesTrack = sc.track === 'guesstimate';
    }

    const matchesDiff = selectedDifficulty === 'all' || sc.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesSearch = !searchQuery.trim() || 
      sc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      sc.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sc.problemStatement.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTrack && matchesDiff && matchesSearch;
  });

  const scoredSessions = history.filter(h => typeof h.score === 'number' && h.score > 0);
  const averageScore = scoredSessions.length > 0
    ? Math.round(scoredSessions.reduce((acc, h) => acc + h.score, 0) / scoredSessions.length)
    : 0;
  const hasScore = scoredSessions.length > 0 && averageScore > 0;

  // Helper for rendering high-fidelity company logos
  const renderCompanyLogo = (company: string) => {
    switch (company) {
      case 'Meta':
        return (
          <div className="w-9 h-9 rounded-xl bg-[#0081FB] flex items-center justify-center shadow-xs shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M12 9.5c-1.1-1.3-2.6-2-4.3-2-3.3 0-5.7 2.5-5.7 5.8 0 3.3 2.5 5.8 5.7 5.8 2.2 0 3.8-1.2 4.3-2.1.5.9 2.1 2.1 4.3 2.1 3.2 0 5.7-2.5 5.7-5.8 0-3.3-2.4-5.8-5.7-5.8-1.7 0-3.2.7-4.3 2zm-4.3 7.3c-2 0-3.4-1.5-3.4-3.5 0-2 1.4-3.5 3.4-3.5 1.5 0 2.7.9 3.2 2.3-.3.8-.7 1.8-1.2 2.6-.6 1.3-1.3 2.1-2 2.1zm8.6 0c-.7 0-1.4-.8-2-2.1-.5-.8-.9-1.8-1.2-2.6.5-1.4 1.7-2.3 3.2-2.3 2 0 3.4 1.5 3.4 3.5 0 2-1.4 3.5-3.4 3.5z"/>
            </svg>
          </div>
        );
      case 'Notion':
        return (
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center shrink-0">
            <span className="font-serif font-black text-xl text-slate-900 leading-none">N</span>
          </div>
        );
      case 'Canva':
        return (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00C4CC] to-[#7D2AE8] flex items-center justify-center shadow-xs shrink-0">
            <span className="text-white font-extrabold text-xs tracking-tight italic" style={{ fontFamily: 'Georgia, serif' }}>
              Canva
            </span>
          </div>
        );
      case 'Google':
        return (
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          </div>
        );
      case 'Amazon':
        return (
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center shadow-xs shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M14.5 10.5c0-.9-.6-1.4-1.6-1.4-.9 0-1.4.5-1.5 1.1h-1.6c.1-1.5 1.4-2.4 3.1-2.4 2 0 3.2 1 3.2 2.8v4.6h-1.5v-1.1c-.6.8-1.5 1.3-2.6 1.3-1.6 0-2.6-1-2.6-2.4 0-1.6 1.2-2.3 3.2-2.3h1.4v-.2zm-1.4 3.7c.9 0 1.4-.6 1.4-1.2v-.8h-1.2c-1.1 0-1.7.3-1.7 1.1 0 .6.5.9 1.5.9z" fill="#FFF"/>
              <path d="M20.2 18.2C15.5 21.6 8.5 21.6 3.8 18.2c-.3-.2-.1-.6.2-.4 4.5 2.6 11.4 2.6 15.9-.2.4-.2.6.2.3.6z" fill="#FF9900"/>
              <path d="M21 17c-.2-.3-1-.4-1.4-.3-.2.1-.2.3 0 .4.8.4 1.2.9 1.1 1.2-.1.3-.8.5-1.6.5-.3 0-.3.2-.1.3 1 .4 2.2.3 2.3-.2.2-.6-.1-1.5-.3-1.9z" fill="#FF9900"/>
            </svg>
          </div>
        );
      case 'Apple':
        return (
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.62-.75 1.04-1.8 0.92-2.84-.9.04-2 .6-2.65 1.34-.58.65-1.09 1.73-.95 2.76.99.08 2.05-.51 2.68-1.26z"/>
            </svg>
          </div>
        );
      case 'Netflix':
        return (
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center shadow-xs shrink-0">
            <span className="text-[#E50914] font-black text-xl leading-none tracking-tighter">N</span>
          </div>
        );
      case 'Spotify':
        return (
          <div className="w-9 h-9 rounded-xl bg-[#1DB954] flex items-center justify-center shadow-xs shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M12 2C6.4 2 2 6.4 2 12s4.4 10 10 10 10-4.4 10-10S17.6 2 12 2zm4.6 14.4c-.2.3-.5.4-.8.2-2.3-1.4-5.2-1.7-8.6-1-.4.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8 3.7-.8 7-.5 9.5 1 .3.2.4.6.2.9zm1.2-2.7c-.2.4-.7.5-1.1.2-2.6-1.6-6.6-2.1-9.7-1.1-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 3.6-1.1 8-.5 11 1.3.4.2.5.7.3 1.1zm.1-2.8C14.8 9.1 9.7 8.9 6.8 9.8c-.5.2-1-.1-1.2-.6-.2-.5.1-1 .6-1.2 3.4-1 9-0.8 12.6 1.3.5.3.6.9.3 1.4-.3.4-.9.5-1.4.2z"/>
            </svg>
          </div>
        );
      case 'Uber':
        return (
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center text-white font-black text-xs tracking-tight shadow-xs shrink-0">
            Uber
          </div>
        );
      case 'Airbnb':
        return (
          <div className="w-9 h-9 rounded-xl bg-[#FF5A5F] flex items-center justify-center shadow-xs shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M12 2C7.5 2 4.4 5.3 4.4 8.7c0 4.2 4.3 8.8 7.6 13.3.3.4.9.4 1.2 0 3.3-4.5 7.6-9.1 7.6-13.3C20.8 5.3 17.7 2 12 2zm0 10c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-extrabold text-sm shadow-xs shrink-0">
            {company.charAt(0)}
          </div>
        );
    }
  };

  const getScenarioSubTagInfo = (sc: InterviewScenario) => {
    if (sc.id === 'rca-dau-drop-5') return { label: 'DAU', dot: 'bg-emerald-500' };
    if (sc.id === 'rca-signups-flat-wow') return { label: 'Growth', dot: 'bg-amber-500' };
    if (sc.id === 'rca-web-conversion-dip') return { label: 'Aha Moment', dot: 'bg-sky-500' };
    if (sc.title.toLowerCase().includes('dau') || sc.title.toLowerCase().includes('active user')) {
      return { label: 'DAU', dot: 'bg-emerald-500' };
    }
    if (sc.title.toLowerCase().includes('churn') || sc.title.toLowerCase().includes('retention')) {
      return { label: 'Retention', dot: 'bg-purple-500' };
    }
    if (sc.title.toLowerCase().includes('conversion') || sc.title.toLowerCase().includes('funnel')) {
      return { label: 'Funnel', dot: 'bg-sky-500' };
    }
    if (sc.track === 'strategy') return { label: 'Strategy', dot: 'bg-indigo-500' };
    if (sc.track === 'guesstimate') return { label: 'Sizing', dot: 'bg-amber-500' };
    if (sc.track === 'design') return { label: 'Product UX', dot: 'bg-purple-500' };
    return { label: 'Metric', dot: 'bg-emerald-500' };
  };

  const getDisplayDifficulty = (sc: InterviewScenario): string => {
    if (sc.id === 'rca-signups-flat-wow') return 'Medium';
    if (sc.id === 'rca-web-conversion-dip') return 'Hard';
    return sc.difficulty;
  };

  const getDifficultyDot = (diff: string): string => {
    switch (diff.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-500';
      case 'medium':
        return 'bg-amber-500';
      case 'hard':
        return 'bg-rose-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getTrackLabel = (sc: InterviewScenario): string => {
    if (sc.id === 'rca-signups-flat-wow') return 'TRACK: B2C';
    if (sc.track === 'rca') return 'TRACK: RCA';
    if (sc.track === 'strategy') return 'TRACK: STRATEGY';
    if (sc.track === 'guesstimate') return 'TRACK: SIZING';
    if (sc.track === 'design') return 'TRACK: PRODUCT DESIGN';
    return 'TRACK: CASE';
  };

  const getDisplayTitle = (sc: InterviewScenario): string => {
    if (sc.id === 'rca-web-conversion-dip') {
      return 'Website conversion rate (Visit → Sign-up) has dipped slightly';
    }
    return sc.title;
  };

  const getDisplayProblemStatement = (sc: InterviewScenario): string => {
    if (sc.id === 'rca-dau-drop-5') {
      return 'You are a PM at Meta. The leadership team has noticed a 5% drop in daily active users (DAU) for your product over the past week. Dive deep, identify possible causes, and lead the investigation...';
    }
    if (sc.id === 'rca-signups-flat-wow') {
      return 'You are a PM at Notion. New user sign-ups have plateaued over the last few weeks. Identify the problem, analyze possible causes, and propose a plan to reignite growth...';
    }
    if (sc.id === 'rca-web-conversion-dip') {
      return 'You are a PM at Canva. The website conversion rate from visit to sign-up has dropped from 12.4% to 11.8% over the past month. Analyze the issue, identify root causes, and propose actionable fixes...';
    }
    return sc.problemStatement;
  };

  const getPracticePoints = (sc: InterviewScenario): string[] => {
    if (sc.id === 'rca-dau-drop-5') {
      return ['Problem breakdown', 'Data driven thinking', 'Solution prioritisation'];
    }
    if (sc.id === 'rca-signups-flat-wow') {
      return ['User research synthesis', 'Growth levers & experimentation', 'Prioritisation and roadmap'];
    }
    if (sc.id === 'rca-web-conversion-dip') {
      return ['Funnel analysis', 'User behaviour & intent', 'A/B testing ideas', 'Strategic recommendations'];
    }
    if (sc.keyEvaluationMetrics && sc.keyEvaluationMetrics.length > 0) {
      return sc.keyEvaluationMetrics.slice(0, 3);
    }
    if (sc.candidateBrief && sc.candidateBrief.length > 0) {
      return sc.candidateBrief.slice(0, 3).map(b => b.split('(')[0].trim());
    }
    return ['Hypothesis generation', 'Analytical framework', 'Synthesis & next steps'];
  };

  const getCtaText = (sc: InterviewScenario): string => {
    if (sc.id === 'rca-dau-drop-5') return 'Take Interview (10 min) →';
    if (sc.id === 'rca-signups-flat-wow') return 'Start Mock Interview (15 min) →';
    if (sc.id === 'rca-web-conversion-dip') return 'Take Interview (15 min) →';
    return `Take Interview (${sc.targetDurationMinutes || 15} min) →`;
  };

  // If in active session, render the studio stage directly
  if (activeSession) {
    return (
      <InterviewStage
        scenario={activeSession.scenario}
        persona={activeSession.persona}
        mode={activeSession.mode}
        onExit={() => setActiveSession(null)}
      />
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner / Hero Card */}
      <div className="relative rounded-[2rem] bg-[#0A0F1D] border border-slate-800/80 p-6 sm:p-8 lg:p-9 text-white overflow-hidden shadow-xl">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Top Row: Content on Left, Robot Graphic on Right */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left Content Area */}
            <div className="max-w-2xl space-y-3.5">
              {/* Feature Badge Pills */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 text-[11px] font-bold tracking-wide backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>AI-POWERED INTERVIEW PRACTICE</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px] font-bold tracking-wide backdrop-blur-md">
                  <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>LEARN. GET FEEDBACK. IMPROVE.</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-200 text-[11px] font-bold tracking-wide backdrop-blur-md">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span>ACCESS INDUSTRY CASES</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                AI Mock <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300">Interview Studio</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-300 text-sm sm:text-[15px] font-normal leading-relaxed max-w-xl">
                Practice real-world PM interviews with AI-powered interviewers, get instant feedback, and build confidence.
              </p>
            </div>

            {/* Right Hero Graphic: 3D AI Robot + Glass Checklist Tablet + "Practice Like a PM" Speech Bubble */}
            <div className="hidden lg:flex items-center justify-end relative w-full lg:w-[420px] shrink-0 pointer-events-none select-none">
              {/* Soft Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/15 rounded-full blur-[80px]" />

              <svg viewBox="0 0 380 220" className="w-[360px] h-[210px] overflow-visible">
                <defs>
                  <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#E2E8F0" />
                    <stop offset="100%" stopColor="#CBD5E1" />
                  </linearGradient>
                  <linearGradient id="robotVisorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0B132B" />
                    <stop offset="100%" stopColor="#1C2541" />
                  </linearGradient>
                  <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                  <linearGradient id="tabletGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.28)" />
                    <stop offset="100%" stopColor="rgba(147, 51, 234, 0.16)" />
                  </linearGradient>
                  <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="bubbleDropShadow" x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* Floating Glass Tablet / Interview Checklist */}
                <g transform="translate(65, 25) rotate(-6)">
                  <rect x="0" y="0" width="130" height="150" rx="18" fill="url(#tabletGlassGrad)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                  <rect x="18" y="24" width="55" height="7" rx="3.5" fill="rgba(255,255,255,0.4)" />
                  
                  {/* Checklist item 1 */}
                  <circle cx="24" cy="52" r="5" fill="#38BDF8" />
                  <path d="M21.5 52l1.8 1.8 3.5-3.5" stroke="#0B132B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <rect x="36" y="49" width="70" height="6" rx="3" fill="rgba(255,255,255,0.28)" />

                  {/* Checklist item 2 */}
                  <circle cx="24" cy="74" r="5" fill="#38BDF8" />
                  <path d="M21.5 74l1.8 1.8 3.5-3.5" stroke="#0B132B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <rect x="36" y="71" width="55" height="6" rx="3" fill="rgba(255,255,255,0.28)" />

                  {/* Checklist item 3 */}
                  <circle cx="24" cy="96" r="5" fill="#38BDF8" />
                  <path d="M21.5 96l1.8 1.8 3.5-3.5" stroke="#0B132B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <rect x="36" y="93" width="62" height="6" rx="3" fill="rgba(255,255,255,0.28)" />
                </g>

                {/* 3D Cute AI Robot */}
                <g transform="translate(205, 52)">
                  {/* Ear Discs */}
                  <ellipse cx="-28" cy="46" rx="7" ry="14" fill="#3B82F6" />
                  <ellipse cx="-28" cy="46" rx="4" ry="9" fill="#93C5FD" />
                  <ellipse cx="68" cy="46" rx="7" ry="14" fill="#3B82F6" />
                  <ellipse cx="68" cy="46" rx="4" ry="9" fill="#93C5FD" />

                  {/* Head */}
                  <rect x="-24" y="8" width="88" height="74" rx="26" fill="url(#robotBodyGrad)" filter="url(#bubbleDropShadow)" />
                  
                  {/* Screen Visor */}
                  <rect x="-14" y="20" width="68" height="50" rx="18" fill="url(#robotVisorGrad)" stroke="#2563EB" strokeWidth="1.2" />

                  {/* Glowing Smiling Eyes */}
                  <path d="M -2 38 Q 4 30 10 38" stroke="url(#cyanGlow)" strokeWidth="3.5" strokeLinecap="round" fill="none" filter="url(#softGlow)" />
                  <path d="M 28 38 Q 34 30 40 38" stroke="url(#cyanGlow)" strokeWidth="3.5" strokeLinecap="round" fill="none" filter="url(#softGlow)" />
                  
                  {/* Cute Smile */}
                  <path d="M 12 52 Q 19 59 26 52" stroke="url(#cyanGlow)" strokeWidth="2.8" strokeLinecap="round" fill="none" filter="url(#softGlow)" />

                  {/* Top Antenna */}
                  <rect x="17" y="1" width="6" height="8" rx="3" fill="#3B82F6" />
                  <circle cx="20" cy="0" r="4.5" fill="#60A5FA" filter="url(#softGlow)" />

                  {/* Body Torso */}
                  <path d="M -8 82 Q 20 80 48 82 L 54 125 Q 20 134 -14 125 Z" fill="url(#robotBodyGrad)" />
                  <rect x="10" y="93" width="20" height="12" rx="6" fill="#3B82F6" opacity="0.8" />
                  <circle cx="20" cy="99" r="3" fill="#93C5FD" />

                  {/* Arms */}
                  <ellipse cx="-20" cy="100" rx="9" ry="15" fill="url(#robotBodyGrad)" transform="rotate(22 -20 100)" />
                  <ellipse cx="60" cy="98" rx="9" ry="15" fill="url(#robotBodyGrad)" transform="rotate(-22 60 98)" />
                </g>

                {/* Floating Speech Bubble: "Practice Like a PM" */}
                <g transform="translate(100, 12)" filter="url(#bubbleDropShadow)">
                  <rect x="0" y="0" width="94" height="42" rx="14" fill="#FFFFFF" />
                  <polygon points="42,42 54,42 46,49" fill="#FFFFFF" />
                  <text x="47" y="19" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="800" fontFamily="system-ui, sans-serif">
                    Practice
                  </text>
                  <text x="47" y="32" textAnchor="middle" fill="#2563EB" fontSize="10.5" fontWeight="800" fontFamily="system-ui, sans-serif">
                    Like a PM
                  </text>
                </g>

                {/* Playful Handwritten Script on the Right */}
                <g transform="translate(305, 26)">
                  <text x="0" y="16" fill="rgba(255,255,255,0.85)" fontSize="13" fontStyle="italic" fontWeight="600" fontFamily="cursive, Georgia, sans-serif">
                    Better
                  </text>
                  <text x="0" y="32" fill="rgba(255,255,255,0.85)" fontSize="13" fontStyle="italic" fontWeight="600" fontFamily="cursive, Georgia, sans-serif">
                    Questions
                  </text>
                  <text x="4" y="48" fill="rgba(255,255,255,0.85)" fontSize="13" fontStyle="italic" fontWeight="600" fontFamily="cursive, Georgia, sans-serif">
                    Brighter
                  </text>
                  <text x="12" y="64" fill="rgba(255,255,255,0.85)" fontSize="13" fontStyle="italic" fontWeight="600" fontFamily="cursive, Georgia, sans-serif">
                    You
                  </text>

                  {/* Curved Arrow curling down */}
                  <path 
                    d="M 36 72 C 32 88, 16 98, -8 96" 
                    stroke="rgba(255,255,255,0.65)" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    strokeDasharray="3 2"
                    fill="none" 
                  />
                  <path 
                    d="M -4 91 L -10 96 L -4 101" 
                    stroke="rgba(255,255,255,0.65)" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    fill="none" 
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* Quick Metrics: 4 Sleek Frosted Containers */}
          <div className="pt-2 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Metric 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#1D4ED8] flex items-center justify-center shrink-0 shadow-inner">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">143</div>
                <div className="text-xs font-medium text-slate-400 mt-0.5">Interview Cases</div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#1D4ED8] flex items-center justify-center shrink-0 shadow-inner">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {Math.max(history.length, 3)}
                </div>
                <div className="text-xs font-medium text-slate-400 mt-0.5">Sessions Completed</div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#6D28D9] flex items-center justify-center shrink-0 shadow-inner">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {hasScore ? `${averageScore}` : '—'}
                </div>
                <div className="text-xs font-medium text-slate-400 mt-0.5">
                  {hasScore ? 'Average Score' : 'No score yet'}
                </div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#6D28D9] flex items-center justify-center shrink-0 shadow-inner">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">4</div>
                <div className="text-xs font-medium text-slate-400 mt-0.5">AI Interviewers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track Tabs & Filters */}
      <div className="space-y-4 pt-1">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
            INTERVIEW TRACKS
          </span>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Track Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {tracks.map(t => {
                const Icon = t.icon;
                const isSelected = selectedTrack === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTrack(t.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#111827] text-white shadow-sm border border-[#111827]' 
                        : 'bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Past Scorecards Button */}
            <button
              onClick={() => {
                if (!user) {
                  setAuthModalOpen(true);
                  return;
                }
                setShowHistoryModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-indigo-200/90 text-indigo-600 hover:bg-indigo-50/60 font-bold text-xs transition-all shrink-0 cursor-pointer shadow-2xs self-start lg:self-auto"
            >
              <History className="w-3.5 h-3.5 text-indigo-600" />
              <span>Past Scorecards</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
            </button>
          </div>
        </div>

        {/* Search and Difficulty Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company, case, or interview type..."
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto">
            {[
              { id: 'all', label: 'All' },
              { id: 'easy', label: 'Easy', dot: 'bg-emerald-500' },
              { id: 'medium', label: 'Medium', dot: 'bg-amber-500' },
              { id: 'hard', label: 'Hard', dot: 'bg-rose-500' },
            ].map((diff) => {
              const isSelected = selectedDifficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`h-11 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected 
                      ? 'bg-[#111827] text-white shadow-sm border border-[#111827]' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {diff.dot && <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />}
                  <span>{diff.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scenarios Grid */}
      {filteredScenarios.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200/80">
          <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No interview cases found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try searching for a different company or keyword, or reset your filters.
          </p>
          <button
            onClick={() => {
              setSelectedTrack('all');
              setSelectedDifficulty('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((sc) => {
            const subTag = getScenarioSubTagInfo(sc);
            const displayDiff = getDisplayDifficulty(sc);
            const diffDot = getDifficultyDot(displayDiff);
            const trackLabel = getTrackLabel(sc);
            const displayTitle = getDisplayTitle(sc);
            const displayStatement = getDisplayProblemStatement(sc);
            const practicePoints = getPracticePoints(sc);
            const ctaText = getCtaText(sc);
            const isBookmarked = bookmarkedIds.includes(sc.id);

            return (
              <div
                key={sc.id}
                className="bg-white rounded-[22px] border border-slate-200/90 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300"
              >
                <div className="space-y-4">
                  {/* Card Top: Company Logo + Company Name (left) & Badges (right) */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {renderCompanyLogo(sc.company)}
                      <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                        {sc.company}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Sub-tag badge */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200/80">
                        <span className={`w-1.5 h-1.5 rounded-full ${subTag.dot}`} />
                        <span>{subTag.label}</span>
                      </span>

                      {/* Difficulty badge */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200/80">
                        <span className={`w-1.5 h-1.5 rounded-full ${diffDot}`} />
                        <span>{displayDiff}</span>
                      </span>
                    </div>
                  </div>

                  {/* Track & Title */}
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 block mb-1">
                      {trackLabel}
                    </span>
                    <h3 className="font-extrabold text-[17px] sm:text-[18px] text-slate-900 tracking-tight leading-snug">
                      {displayTitle}
                    </h3>
                  </div>

                  {/* Problem Statement */}
                  <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed line-clamp-3">
                    {displayStatement}
                  </p>

                  {/* What You'll Practice */}
                  <div className="pt-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                      YOU'LL PRACTICE
                    </span>
                    <div className="flex flex-wrap gap-x-3.5 gap-y-2">
                      {practicePoints.map((point, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                          <svg className="w-3.5 h-3.5 text-blue-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA + Bookmark */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleStartInterview(sc)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50/90 hover:bg-blue-100 text-blue-600 hover:text-blue-700 font-extrabold text-xs transition-colors cursor-pointer"
                  >
                    <span>{ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(sc.id);
                    }}
                    title={isBookmarked ? "Remove bookmark" : "Save case"}
                    className="p-2.5 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-slate-900 text-slate-900' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Auth Modal for Unauthenticated Users */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          setPendingScenario(null);
        }}
        initialMode="login"
        redirectTo="/interview-studio"
        onSuccess={() => {
          setAuthModalOpen(false);
          if (pendingScenario) {
            setSetupScenario(pendingScenario);
            setPendingScenario(null);
          }
        }}
      />

      {/* Access Request Modal */}
      <AccessRequestModal
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        onContinue={() => setShowAccessModal(false)}
      />

      {/* Pre-Session Setup Modal */}
      <SetupModal
        isOpen={!!setupScenario}
        scenario={setupScenario}
        onClose={() => setSetupScenario(null)}
        onStartSession={(scenario, persona, mode) => {
          setSetupScenario(null);
          setActiveSession({ scenario, persona, mode });
        }}
      />

      {/* Past Scorecards History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden text-zinc-900">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
              <div className="flex items-center gap-2.5">
                <History className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-base text-zinc-900">
                  Past Scorecards {history.length > 0 ? `(${history.length})` : ''}
                </h3>
              </div>
              <button 
                onClick={() => setShowHistoryModal(false)} 
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3">
              {history.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <History className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-zinc-700">No scorecards recorded yet</p>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                    Start and complete any mock interview case to receive personalized AI evaluation scorecards.
                  </p>
                </div>
              ) : (
                history.map((h, i) => (
                  <div key={i} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">
                        {h.track.toUpperCase()} • {h.company}
                      </span>
                      <h4 className="font-bold text-sm text-zinc-900">{h.scenarioTitle}</h4>
                      <span className="text-xs text-zinc-500 font-medium">{h.date} • {h.durationMinutes} mins</span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xl font-black text-indigo-600 block">{h.score}/100</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {h.verdict}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-6 py-3.5 border-t border-zinc-100 bg-zinc-50 flex items-center justify-end">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
