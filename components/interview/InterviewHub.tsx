import React, { useState } from 'react';
import { 
  Sparkles, 
  Target, 
  Calculator, 
  Compass, 
  Layers, 
  Search, 
  ArrowRight, 
  History, 
  Shield
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
    { id: 'all', label: 'All Tracks', icon: Layers, count: INTERVIEW_SCENARIOS.length },
    { id: 'rca', label: 'Root Cause Analysis', icon: Target, count: INTERVIEW_SCENARIOS.filter(s => s.track === 'rca').length },
    { id: 'guesstimate', label: 'Guesstimates & Sizing', icon: Calculator, count: INTERVIEW_SCENARIOS.filter(s => s.track === 'guesstimate').length },
    { id: 'strategy', label: 'Product Strategy & Vision', icon: Compass, count: INTERVIEW_SCENARIOS.filter(s => s.track === 'strategy').length },
    { id: 'design', label: 'Product Design & UX', icon: Sparkles, count: INTERVIEW_SCENARIOS.filter(s => s.track === 'design').length },
  ];

  // Filter Scenarios
  const filteredScenarios = INTERVIEW_SCENARIOS.filter(sc => {
    const matchesTrack = selectedTrack === 'all' || sc.track === selectedTrack;
    const matchesDiff = selectedDifficulty === 'all' || sc.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesSearch = sc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sc.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sc.problemStatement.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesDiff && matchesSearch;
  });

  const scoredSessions = history.filter(h => typeof h.score === 'number' && h.score > 0);
  const averageScore = scoredSessions.length > 0
    ? Math.round(scoredSessions.reduce((acc, h) => acc + h.score, 0) / scoredSessions.length)
    : 0;
  const hasScore = scoredSessions.length > 0 && averageScore > 0;

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
    <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Studio Banner */}
      <div className="relative rounded-3xl md:rounded-[2.25rem] p-6 sm:p-8 md:p-10 bg-zinc-950 text-white shadow-xl overflow-hidden border border-zinc-800/80">
        <div className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-gradient-to-bl from-indigo-600/25 via-purple-600/15 to-transparent rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4 sm:space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>24/7 AI Interview Partner</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider">
              Gemini 3.7 Powered Studio
            </span>
            <button
              onClick={() => {
                if (!user) {
                  setAuthModalOpen(true);
                  return;
                }
                setShowAccessModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Access Request</span>
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            AI Mock Interview Studio
          </h1>

          <p className="text-zinc-400 text-sm md:text-base font-normal leading-relaxed max-w-2xl">
            Practice realistic PM interviews with AI-powered interviewers, timed scenarios, and structured feedback.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm flex flex-col justify-center min-h-[92px]">
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {INTERVIEW_SCENARIOS.length}
              </div>
              <div className="text-xs font-medium text-zinc-400 mt-1">
                Interview Cases
              </div>
            </div>
            
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm flex flex-col justify-center min-h-[92px]">
              <div className="text-2xl sm:text-3xl font-black text-indigo-400 tracking-tight">
                {history.length}
              </div>
              <div className="text-xs font-medium text-zinc-400 mt-1">
                Sessions Completed
              </div>
            </div>
            
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm flex flex-col justify-center min-h-[92px]">
              <div className={`text-2xl sm:text-3xl font-black tracking-tight ${hasScore ? 'text-emerald-400' : 'text-zinc-500'}`}>
                {hasScore ? `${averageScore}/100` : '—'}
              </div>
              <div className="text-xs font-medium text-zinc-400 mt-1">
                {hasScore ? 'Average Score' : 'No score yet'}
              </div>
            </div>
            
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm flex flex-col justify-center min-h-[92px]">
              <div className="text-2xl sm:text-3xl font-black text-purple-400 tracking-tight">
                4
              </div>
              <div className="text-xs font-medium text-zinc-400 mt-1">
                AI Interviewers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track Tabs & Filters */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2.5">
            Interview Tracks
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
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-zinc-900 text-white shadow-sm border border-zinc-900' 
                        : 'bg-white border border-zinc-200/80 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                      {t.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Past Scorecards Button (Secondary Action) */}
            <button
              onClick={() => {
                if (!user) {
                  setAuthModalOpen(true);
                  return;
                }
                setShowHistoryModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200/80 text-indigo-700 text-xs font-bold transition-all shrink-0 cursor-pointer group self-start lg:self-auto"
            >
              <History className="w-3.5 h-3.5 text-indigo-600" />
              <span>Past Scorecards {history.length > 0 ? `· ${history.length}` : ''}</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Search and Difficulty Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company, case, or interview type..."
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-white border border-zinc-200 text-xs sm:text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto">
            {[
              { id: 'all', label: 'All' },
              { id: 'easy', label: 'Easy', dot: 'bg-emerald-500' },
              { id: 'medium', label: 'Medium', dot: 'bg-blue-500' },
              { id: 'hard', label: 'Hard', dot: 'bg-amber-500' },
            ].map((diff) => {
              const isSelected = selectedDifficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`h-11 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected 
                      ? 'bg-zinc-900 text-white shadow-sm border border-zinc-900' 
                      : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
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
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-zinc-200/80">
          <Search className="w-8 h-8 text-zinc-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-800">No interview cases found</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            Try searching for a different company or keyword, or reset your filters.
          </p>
          <button
            onClick={() => {
              setSelectedTrack('all');
              setSelectedDifficulty('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {filteredScenarios.map((sc) => {
            const caseHistory = history.filter(h => h.scenarioId === sc.id);
            const lastAttempt = caseHistory.length > 0 ? caseHistory[0] : null;
            const bestScore = caseHistory.length > 0 ? Math.max(...caseHistory.map(h => h.score)) : null;

            let statusTag: string | null = null;
            let ctaText = 'START MOCK INTERVIEW →';

            if (bestScore !== null && bestScore >= 80) {
              statusTag = `Best score: ${bestScore}/100`;
              ctaText = 'PRACTICE AGAIN →';
            } else if (lastAttempt) {
              statusTag = `Last attempt: ${lastAttempt.score}/100`;
              ctaText = 'RETRY →';
            }

            return (
              <div
                key={sc.id}
                onClick={() => handleStartInterview(sc)}
                className="group bg-white rounded-2xl border border-zinc-200/90 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-zinc-300 cursor-pointer"
              >
                <div className="space-y-3.5">
                  {/* Top Header: Company badge (left) & Difficulty · Duration metadata (right) */}
                  <div className="flex items-start justify-between gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider shadow-xs ${sc.companyColor || 'bg-zinc-800 text-white'}`}>
                      {sc.company}
                    </span>
                    <div className="flex flex-col items-end">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100/80 border border-zinc-200/80 text-[11px] font-bold text-zinc-700">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          sc.difficulty === 'Easy' ? 'bg-emerald-500' :
                          sc.difficulty === 'Medium' ? 'bg-blue-500' : 'bg-amber-500'
                        }`} />
                        <span>{sc.difficulty.toUpperCase()} · {sc.targetDurationMinutes} min</span>
                      </div>
                      <span className="text-[10px] font-medium text-zinc-400 mt-1">
                        {sc.difficulty === 'Easy' ? 'Start here' : sc.difficulty === 'Medium' ? 'Build your skills' : 'Challenge yourself'}
                      </span>
                    </div>
                  </div>

                  {/* Track Label */}
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 block mb-1">
                      TRACK: {sc.track === 'rca' ? 'RCA' : sc.track.toUpperCase()}
                    </span>
                    {/* Increased Title Size (18-20px) */}
                    <h3 className="font-extrabold text-[18px] sm:text-[19px] text-zinc-900 tracking-tight leading-snug">
                      {sc.title}
                    </h3>
                  </div>

                  {/* Problem Statement */}
                  <p className="text-xs sm:text-[13px] text-zinc-500 font-normal leading-relaxed line-clamp-2">
                    {sc.problemStatement}
                  </p>

                  {/* What You'll Practice */}
                  <div className="pt-3 border-t border-zinc-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                      You'll practice
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-600 font-medium">
                      {sc.keyEvaluationMetrics.slice(0, 3).map((metric, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                          <span className="truncate">{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Status tag if previously attempted */}
                  {statusTag && (
                    <div className="pt-1">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md ${
                        bestScore && bestScore >= 80
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}>
                        {statusTag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Primary CTA Button */}
                <div className="pt-5 mt-5 border-t border-zinc-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartInterview(sc);
                    }}
                    className="w-full h-11 px-5 rounded-xl bg-zinc-900 hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all duration-200 flex items-center justify-between group-hover:bg-black cursor-pointer"
                  >
                    <span className="tracking-wider">{ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
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

