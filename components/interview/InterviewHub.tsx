import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Sparkles, 
  Target, 
  Calculator, 
  Compass, 
  Layers, 
  Search, 
  Filter, 
  Clock, 
  ArrowRight, 
  History, 
  Award, 
  ChevronRight, 
  Flame,
  CheckCircle2,
  Shield,
  Camera,
  Mic
} from 'lucide-react';
import { InterviewScenario, InterviewTrack, InterviewerPersona, InterviewMode, InterviewSessionHistory } from '../../types/interview';
import { INTERVIEW_SCENARIOS } from '../../data/interviewScenarios';
import { INTERVIEWER_PERSONAS } from '../../data/interviewPersonas';
import { SetupModal } from './SetupModal';
import { AccessRequestModal } from './AccessRequestModal';
import { InterviewStage } from './InterviewStage';
import { useAuth } from '../../context/AuthContext';

export const InterviewHub: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showAccessModal, setShowAccessModal] = useState<boolean>(false);

  const { interviewHistory, user } = useAuth();
  const history = interviewHistory;

  // Active Session & Setup Modal State
  const [setupScenario, setSetupScenario] = useState<InterviewScenario | null>(null);
  const [activeSession, setActiveSession] = useState<{
    scenario: InterviewScenario;
    persona: InterviewerPersona;
    mode: InterviewMode;
  } | null>(null);

  const tracks = [
    { id: 'all', label: 'All Tracks', icon: Layers, count: INTERVIEW_SCENARIOS.length },
    { id: 'rca', label: 'Root Cause Analysis (RCA)', icon: Target, count: INTERVIEW_SCENARIOS.filter(s => s.track === 'rca').length },
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

  const averageScore = history.length > 0
    ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / history.length)
    : 0;

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
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Studio Banner */}
      <div className="relative rounded-[3rem] p-8 md:p-12 bg-zinc-950 text-white shadow-2xl overflow-hidden border border-zinc-800">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-indigo-600/30 via-purple-600/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> 24/7 AI Interview Partner
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider">
              Gemini 3.7 Powered Studio
            </span>
            <button
              onClick={() => setShowAccessModal(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Access Request</span>
            </button>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            AI Mock Interview Studio
          </h1>

          <p className="text-zinc-400 text-sm md:text-base font-medium leading-relaxed">
            Practice live PM interviews with dynamic AI avatars, voice simulations, and realistic FAANG interviewer personas. Enforce authentic time constraints, receive contextual Socratic framework nudges, and get comprehensive 5-pillar rubric scorecards.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Total Cases</span>
              <span className="text-2xl font-black text-white">{INTERVIEW_SCENARIOS.length} Scenarios</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Completed</span>
              <span className="text-2xl font-black text-indigo-400">{history.length} Sessions</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Average Score</span>
              <span className="text-2xl font-black text-emerald-400">{history.length > 0 ? `${averageScore}/100` : '—'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">Interviewer Personas</span>
              <span className="text-2xl font-black text-purple-400">4 FAANG Leads</span>
            </div>
          </div>
        </div>
      </div>

      {/* Track Tabs & Filters */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Track Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {tracks.map(t => {
              const Icon = t.icon;
              const isSelected = selectedTrack === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrack(t.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                    isSelected 
                      ? 'bg-zinc-900 text-white shadow-md' 
                      : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                    {t.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* History Button */}
          {history.length > 0 && (
            <button
              onClick={() => setShowHistoryModal(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors"
            >
              <History className="w-4 h-4" /> Past Scorecards ({history.length})
            </button>
          )}
        </div>

        {/* Search and Difficulty Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company (Uber, Swiggy, Netflix, Airbnb) or case title..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-zinc-200 text-xs md:text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {['all', 'easy', 'medium', 'hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider capitalize transition-colors ${
                  selectedDifficulty === diff 
                    ? 'bg-zinc-800 text-white' 
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScenarios.map((sc) => {
          const difficultyColor = 
            sc.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            sc.difficulty === 'Medium' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            'bg-amber-50 text-amber-700 border-amber-200';

          return (
            <motion.div
              key={sc.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[2rem] border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden p-6"
            >
              <div className="space-y-4">
                {/* Header Tags */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${sc.companyColor}`}>
                    {sc.company}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${difficultyColor}`}>
                      {sc.difficulty}
                    </span>
                    <span className="text-zinc-400 text-xs font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-500" /> {sc.targetDurationMinutes}m
                    </span>
                  </div>
                </div>

                {/* Title & Track */}
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 block mb-1">
                    Track: {sc.track.toUpperCase()}
                  </span>
                  <h3 className="font-extrabold text-base md:text-lg text-zinc-900 tracking-tight leading-snug">
                    {sc.title}
                  </h3>
                </div>

                {/* Problem Statement */}
                <p className="text-xs text-zinc-600 font-medium leading-relaxed line-clamp-3">
                  {sc.problemStatement}
                </p>

                {/* Key Metrics / Focus Areas */}
                <div className="pt-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">
                    Core Evaluation Focus
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sc.keyEvaluationMetrics.slice(0, 3).map((metric, i) => (
                      <span key={i} className="text-[10px] font-semibold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-zinc-100">
                <button
                  onClick={() => setSetupScenario(sc)}
                  className="w-full py-3 px-4 rounded-xl bg-zinc-900 hover:bg-black text-white font-extrabold text-xs uppercase tracking-widest shadow-md shadow-zinc-200 flex items-center justify-center gap-2 group transition-all"
                >
                  <span>Start Mock Interview</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden text-zinc-900">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-base text-zinc-900">Your Interview Scorecard History</h3>
              </div>
              <button onClick={() => setShowHistoryModal(false)} className="text-zinc-400 hover:text-zinc-700">
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3">
              {history.map((h, i) => (
                <div key={i} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">{h.track.toUpperCase()} • {h.company}</span>
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
              ))}
            </div>

            <div className="px-6 py-3 border-t border-zinc-100 bg-zinc-50 text-right">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 rounded-xl bg-zinc-900 text-white font-bold text-xs"
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
