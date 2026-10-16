import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Sparkles, Volume2, Radio } from 'lucide-react';
import { InterviewerPersona } from '../../types/interview';

interface AvatarVisualizerProps {
  persona: InterviewerPersona;
  isSpeaking: boolean;
  isThinking: boolean;
  isListening: boolean;
  currentSubtitle: string;
  candidateLiveText?: string;
  audioLevel?: number;
  mode: 'voice';
  onToggleMic?: () => void;
  micDisabled?: boolean;
}

export const AvatarVisualizer: React.FC<AvatarVisualizerProps> = ({
  persona,
  isSpeaking,
  isThinking,
  isListening,
  currentSubtitle,
  candidateLiveText = '',
  audioLevel = 0,
  mode,
  onToggleMic,
  micDisabled = false
}) => {
  // The centre circle is the mic: tap to answer, tap again to pause. It can't be used while the interviewer is thinking.
  const canUseMic = !!onToggleMic && !isThinking && !micDisabled;
  const isYourTurn = !isSpeaking && !isThinking && !isListening;
  const micLabel = isListening
    ? 'Listening. Tap to pause, then press Done answering below.'
    : isSpeaking
    ? `${persona.name} is speaking. Tap to interrupt and answer.`
    : isThinking
    ? `${persona.name} is thinking...`
    : 'Your turn. Tap to answer.';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 md:p-6 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-white rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden select-none">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{
            scale: isSpeaking ? [1, 1.3, 1.1] : isListening ? [1, 1.2, 1] : 1,
            opacity: isSpeaking ? 0.35 : isListening ? 0.3 : 0.15,
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full blur-[110px] ${
            isListening 
              ? 'bg-gradient-to-tr from-rose-500 via-pink-500 to-brand-500' 
              : 'bg-gradient-to-tr from-brand-500 via-brand-500 to-pink-500'
          }`}
        />
      </div>

      {/* Top Header: Interviewer Status & Persona Info */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={persona.avatarImage} 
              alt={persona.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white/20 shadow-md" 
            />
            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-900 ${
              isSpeaking ? 'bg-emerald-400 animate-pulse' : isThinking ? 'bg-amber-400 animate-bounce' : isListening ? 'bg-rose-400 animate-ping' : 'bg-zinc-500'
            }`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">{persona.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-bold uppercase tracking-wider">
                {persona.role}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium tracking-tight">{persona.companyBackground}</p>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2">
          {isSpeaking && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest shadow-lg backdrop-blur-md">
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span>Speaking</span>
            </div>
          )}
          {isThinking && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-widest shadow-lg backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Logic...</span>
            </div>
          )}
          {isListening && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-black uppercase tracking-widest shadow-lg backdrop-blur-md animate-pulse">
              <Radio className="w-3.5 h-3.5 text-rose-400" />
              <span>Listening</span>
            </div>
          )}
          {!isSpeaking && !isThinking && !isListening && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-zinc-400 text-[11px] font-bold tracking-tight">
              <span>Your turn</span>
            </div>
          )}
        </div>
      </div>

      {/* Central Visual: Mode Sensitive (Avatar Stage vs Voice Orb) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-3 w-full max-w-lg">
        {(
          /* Voice Only Reactive Waveform Orb */
          <div className="relative flex flex-col items-center justify-center">
            <motion.button
              type="button"
              onClick={canUseMic ? onToggleMic : undefined}
              disabled={!canUseMic}
              aria-label={isListening ? 'Pause the microphone' : 'Start answering'}
              animate={{
                scale: isSpeaking ? [1, 1.3, 1.1] : isListening ? [1, 1.25 + (audioLevel * 0.004), 1] : [1, 1.05, 1],
                rotate: isThinking ? [0, 360] : 0,
              }}
              transition={{
                scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "linear" }
              }}
              className={`w-32 h-32 md:w-40 md:h-40 rounded-full shadow-[0_0_80px_rgba(16,185,129,0.35)] flex items-center justify-center relative p-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 ${canUseMic ? 'cursor-pointer' : 'cursor-default'} ${
                isListening 
                  ? 'bg-gradient-to-tr from-rose-500 via-pink-500 to-brand-500' 
                  : 'bg-gradient-to-tr from-brand-600 via-brand-500 to-pink-500'
              }`}
            >
              <div className="w-full h-full rounded-full bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden">
                {isSpeaking ? (
                  <div className="flex items-center gap-1.5">
                    {[16, 32, 48, 36, 24, 40, 20].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [8, h, 8] }}
                        transition={{ duration: 0.5 + (i * 0.08), repeat: Infinity }}
                        className="w-1.5 bg-gradient-to-t from-brand-400 to-pink-400 rounded-full"
                      />
                    ))}
                  </div>
                ) : isThinking ? (
                  <Sparkles className="w-10 h-10 text-amber-400 animate-spin" />
                ) : isListening ? (
                  <div className="flex flex-col items-center gap-1">
                    <Mic className="w-8 h-8 text-rose-400 animate-pulse" />
                    <div className="flex items-center gap-0.5 h-3">
                      {[0.5, 1, 0.7, 1.2, 0.4].map((mult, idx) => (
                        <span
                          key={idx}
                          className="w-1 bg-rose-400 rounded-full transition-all duration-75"
                          style={{
                            height: `${Math.max(4, Math.min(12, (audioLevel * mult * 0.2)))}px`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <Mic className={`w-12 h-12 ${isYourTurn ? 'text-white' : 'text-zinc-400'}`} />
                )}
              </div>
            </motion.button>
            <p className={`text-sm font-bold mt-4 text-center ${isYourTurn ? 'text-white' : 'text-zinc-400'}`}>
              {micLabel}
            </p>
          </div>
        )}
      </div>

      {/* Subtitles: the interviewer's latest words, or your answer as it is heard */}
      <div className="relative z-10 w-full max-w-2xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-4 md:p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {isSpeaking ? (
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
                <Volume2 className="w-3 h-3 text-brand-400 animate-pulse" />
                {persona.name}
              </span>
            ) : isListening ? (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Mic className="w-3 h-3 animate-pulse" />
                You
              </span>
            ) : (
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Volume2 className="w-3 h-3" />
                {persona.name}
              </span>
            )}
          </div>
        </div>

        <div className="min-h-[46px] flex items-center">
          <p className="text-sm md:text-base font-semibold leading-relaxed tracking-tight">
            {isListening && candidateLiveText ? (
              <span className="text-emerald-300">
                "{candidateLiveText}"
              </span>
            ) : (
              <span className="text-zinc-100">
                {currentSubtitle || (isThinking ? "Formulating strategic follow-up..." : isListening ? "Listening... Your words show here as you speak, or after you finish if live captions aren't available." : "Waiting for next turn...")}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
