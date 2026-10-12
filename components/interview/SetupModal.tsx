import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Video, 
  Mic, 
  MessageSquare, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Play, 
  Target,
  Layers,
  Shield
} from 'lucide-react';
import { InterviewScenario, InterviewerPersona, InterviewMode, InterviewerPersonaId, CandidateLevel } from '../../types/interview';
import { LEVELS, getTrackConfig } from '../../data/interviewTracks';
import { ACTIVE_INTERVIEWER } from '../../data/interviewPersonas';
import { AccessRequestModal } from './AccessRequestModal';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: InterviewScenario | null;
  level: CandidateLevel;
  onLevelChange: (level: CandidateLevel) => void;
  onStartSession: (scenario: InterviewScenario, persona: InterviewerPersona, mode: InterviewMode) => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({
  isOpen,
  onClose,
  scenario,
  level,
  onLevelChange,
  onStartSession
}) => {
  const selectedMode: InterviewMode = 'voice';
  const [showAccessRequestModal, setShowAccessRequestModal] = useState<boolean>(false);
  const [hasPromptedPermissions, setHasPromptedPermissions] = useState<boolean>(false);

  if (!isOpen || !scenario) return null;

  const selectedPersona = ACTIVE_INTERVIEWER;

  const handleLaunch = () => {
    onStartSession(scenario, selectedPersona, selectedMode);
  };

  const handlePermissionContinue = () => {
    setShowAccessRequestModal(false);
    onStartSession(scenario, selectedPersona, selectedMode);
  };

  return (
    <>
      <AccessRequestModal
        isOpen={showAccessRequestModal}
        mode={selectedMode}
        onClose={() => setShowAccessRequestModal(false)}
        onContinue={handlePermissionContinue}
      />

      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl border border-zinc-200 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-zinc-900"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-600">
                  Session Customization
                </span>
                <h2 className="text-xl font-black text-zinc-900 tracking-tight">
                  Setup Your AI Mock Studio
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              {/* Scenario Summary Card */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${scenario.companyColor}`}>
                    {scenario.company}
                  </span>
                  <span className="text-xs font-bold text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-600" /> {scenario.targetDurationMinutes} Minutes Allocation
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-zinc-900">{scenario.title}</h3>
                <p className="text-xs text-zinc-600 font-medium leading-relaxed">{scenario.problemStatement}</p>
              </div>

              {/* Level: sets how high the bar is for follow-ups and scoring */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-zinc-500 block">
                  Level you're interviewing for
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {LEVELS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => onLevelChange(l.id)}
                      className={`p-3 rounded-2xl border text-left transition-colors ${level === l.id ? 'border-brand-600 bg-brand-50' : 'border-zinc-200 hover:bg-zinc-50'}`}
                    >
                      <div className="text-sm font-extrabold text-zinc-900">{l.short}</div>
                      <div className="text-[11px] text-zinc-500 leading-snug mt-0.5">{l.description}</div>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-500">
                  You'll be scored on the 5 {getTrackConfig(scenario.track).label} skills against this level's bar.
                </p>
              </div>

              {/* Step 1: Voice interview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-zinc-500 block">
                    1. Voice Interview
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAccessRequestModal(true)}
                    className="text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <Shield className="w-3 h-3" /> Test Microphone
                  </button>
                </div>
                <div className="p-4 rounded-2xl border-2 border-brand-600 bg-brand-50/50 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-brand-600 text-white shrink-0">
                    <Mic className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] text-zinc-600 font-medium leading-snug">
                    Speak your answers out loud, like a real phone screen. Your words appear as text so you can fix them before they're sent. Use Chrome or Edge on a laptop for the best results.
                  </p>
                </div>
              </div>

              {/* Step 2: Your interviewer */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-zinc-500 block">
                  2. Your Interviewer
                </label>
                <div className="p-4 rounded-2xl border-2 border-brand-600 bg-brand-50/50 flex items-start gap-3.5">
                  <img
                    src={selectedPersona.avatarImage}
                    alt={selectedPersona.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-xs text-zinc-900">{selectedPersona.name}</h4>
                    <span className="text-[10px] font-bold text-brand-600 block">{selectedPersona.role} • {selectedPersona.companyBackground}</span>
                    <p className="text-[11px] text-zinc-500 font-medium mt-1">{selectedPersona.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleLaunch}
                className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-brand-600/20 flex items-center gap-2 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Enter Studio
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};
