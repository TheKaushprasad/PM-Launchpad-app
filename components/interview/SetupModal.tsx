import React, { useState } from 'react';
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
import { InterviewModePicker } from './InterviewModePicker';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
  const [selectedMode, setSelectedMode] = useState<InterviewMode>('voice');
  const [showAccessRequestModal, setShowAccessRequestModal] = useState<boolean>(false);
  const [hasPromptedPermissions, setHasPromptedPermissions] = useState<boolean>(false);

  if (!scenario) return null;

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

      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-zinc-950/80 backdrop-blur-md"
          aria-describedby={undefined}
          className="gap-0 p-0 bg-white rounded-3xl border-zinc-200 shadow-2xl w-[calc(100%-2rem)] max-w-3xl sm:max-w-3xl max-h-[90dvh] flex flex-col overflow-hidden text-zinc-900"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-brand-600">
                Session Customization
              </span>
              <DialogTitle className="text-xl leading-7 font-black text-zinc-900 tracking-tight">
                Setup Your AI Mock Studio
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close"
              className="rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
            >
              <X className="size-5" />
            </Button>
          </div>

          {/* Modal Body */}
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            {/* Scenario Summary Card */}
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider ${scenario.companyColor}`}>
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

            {/* Step 1: How you'll answer */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-zinc-500 block">
                  1. Interview Mode
                </label>
                <button
                  type="button"
                  onClick={() => setShowAccessRequestModal(true)}
                  className="text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <Shield className="w-3 h-3" /> Test Microphone
                </button>
              </div>
              <InterviewModePicker value={selectedMode} onChange={setSelectedMode} />
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
                  <span className="text-[11px] font-bold text-brand-600 block">{selectedPersona.role} • {selectedPersona.companyBackground}</span>
                  <p className="text-[11px] text-zinc-500 font-medium mt-1">{selectedPersona.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onClose}
              className="h-auto px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800 hover:bg-transparent"
            >
              Cancel
            </Button>

            <Button
              variant="brand"
              onClick={handleLaunch}
              className="h-auto px-6 py-3 rounded-2xl active:scale-100 font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-brand-600/20"
            >
              <Play className="size-3.5 fill-current" /> Enter Studio
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
