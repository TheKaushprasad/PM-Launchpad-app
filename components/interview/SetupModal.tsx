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
import { InterviewScenario, InterviewerPersona, InterviewMode, InterviewerPersonaId } from '../../types/interview';
import { INTERVIEWER_PERSONAS } from '../../data/interviewPersonas';
import { AccessRequestModal } from './AccessRequestModal';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: InterviewScenario | null;
  onStartSession: (scenario: InterviewScenario, persona: InterviewerPersona, mode: InterviewMode) => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({
  isOpen,
  onClose,
  scenario,
  onStartSession
}) => {
  const [selectedMode, setSelectedMode] = useState<InterviewMode>('avatar');
  const [selectedPersonaId, setSelectedPersonaId] = useState<InterviewerPersonaId>('maya');
  const [showAccessRequestModal, setShowAccessRequestModal] = useState<boolean>(false);
  const [hasPromptedPermissions, setHasPromptedPermissions] = useState<boolean>(false);

  if (!isOpen || !scenario) return null;

  const selectedPersona = INTERVIEWER_PERSONAS.find(p => p.id === selectedPersonaId) || INTERVIEWER_PERSONAS[0];

  const modes: { id: InterviewMode; title: string; desc: string; icon: any; badge: string }[] = [
    {
      id: 'avatar',
      title: 'AI Avatar Studio',
      desc: 'Interactive visual interviewer avatar with real-time reactive voice animation and candidate webcam mirror.',
      icon: Video,
      badge: 'Recommended'
    },
    {
      id: 'voice',
      title: 'Voice-Only Mode',
      desc: 'Hands-free spoken simulation with audio frequency energy orb and speech-to-text transcription.',
      icon: Mic,
      badge: 'Audio First'
    },
    {
      id: 'chat',
      title: 'Text Chat Mode',
      desc: 'Conversational messaging layout with rapid typing and optional text-to-speech feedback.',
      icon: MessageSquare,
      badge: 'Fast Pace'
    }
  ];

  const handleLaunch = () => {
    // If mode uses camera or mic and user hasn't seen the access request yet
    if ((selectedMode === 'avatar' || selectedMode === 'voice') && !hasPromptedPermissions) {
      setShowAccessRequestModal(true);
      return;
    }

    onStartSession(scenario, selectedPersona, selectedMode);
  };

  const handlePermissionContinue = () => {
    setHasPromptedPermissions(true);
    setShowAccessRequestModal(false);
    onStartSession(scenario, selectedPersona, selectedMode);
  };

  return (
    <>
      <AccessRequestModal
        isOpen={showAccessRequestModal}
        onClose={() => {
          setHasPromptedPermissions(true);
          setShowAccessRequestModal(false);
          onStartSession(scenario, selectedPersona, selectedMode);
        }}
        onContinue={handlePermissionContinue}
      />

      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-zinc-900"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">
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
                    <Clock className="w-3.5 h-3.5 text-indigo-600" /> {scenario.targetDurationMinutes} Minutes Allocation
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-zinc-900">{scenario.title}</h3>
                <p className="text-xs text-zinc-600 font-medium leading-relaxed">{scenario.problemStatement}</p>
              </div>

              {/* Step 1: Select Interview Mode */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-zinc-500 block">
                    1. Select Interview Format
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAccessRequestModal(true)}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <Shield className="w-3 h-3" /> Access Permissions
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {modes.map((m) => {
                    const Icon = m.icon;
                    const isSelected = selectedMode === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMode(m.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected 
                            ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-600/20' 
                            : 'border-zinc-200 hover:border-zinc-300 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className={`p-2 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              isSelected ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-500'
                            }`}>
                              {m.badge}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-xs text-zinc-900 mb-1">{m.title}</h4>
                          <p className="text-[11px] text-zinc-500 font-medium leading-tight">{m.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Select Interviewer Persona */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-zinc-500 block">
                  2. Select Interviewer Persona
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {INTERVIEWER_PERSONAS.map((p) => {
                    const isSelected = selectedPersonaId === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPersonaId(p.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                          isSelected 
                            ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-600/20' 
                            : 'border-zinc-200 hover:border-zinc-300 bg-white'
                        }`}
                      >
                        <img 
                          src={p.avatarImage} 
                          alt={p.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-black text-xs text-zinc-900 truncate">{p.name}</h4>
                            {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                          </div>
                          <span className="text-[10px] font-bold text-indigo-600 block">{p.role} • {p.companyBackground}</span>
                          <p className="text-[11px] text-zinc-500 font-medium mt-1 line-clamp-2">{p.tagline}</p>
                        </div>
                      </div>
                    );
                  })}
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
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all"
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
