import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Mic, Sparkles, Volume2, ShieldCheck, User, Zap, Radio, CornerDownLeft } from 'lucide-react';
import { InterviewerPersona } from '../../types/interview';

interface AvatarVisualizerProps {
  persona: InterviewerPersona;
  isSpeaking: boolean;
  isThinking: boolean;
  isListening: boolean;
  currentSubtitle: string;
  candidateLiveText?: string;
  audioLevel?: number;
  mode: 'avatar' | 'voice' | 'chat';
  onToggleMic?: () => void;
  onSubmitTurn?: () => void;
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
  onSubmitTurn
}) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 md:p-6 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-white rounded-[2.5rem] border border-zinc-800 shadow-2xl overflow-hidden select-none">
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
              ? 'bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-500' 
              : 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500'
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
              <span>Listening (Auto-Send)</span>
            </div>
          )}
          {!isSpeaking && !isThinking && !isListening && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-zinc-400 text-[11px] font-bold tracking-tight">
              <span>Ready</span>
            </div>
          )}
        </div>
      </div>

      {/* Central Visual: Mode Sensitive (Avatar Stage vs Voice Orb) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-3 w-full max-w-lg">
        {mode === 'avatar' ? (
          <div className="relative flex flex-col items-center">
            {/* Animated Concentric Wave Rings for Speaking */}
            {isSpeaking && (
              <>
                <motion.div 
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 w-44 h-44 md:w-52 md:h-52 m-auto rounded-full border-2 border-indigo-500/40 pointer-events-none"
                />
                <motion.div 
                  animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, delay: 0.4, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 w-44 h-44 md:w-52 md:h-52 m-auto rounded-full border border-pink-500/30 pointer-events-none"
                />
              </>
            )}

            {/* Concentric Reactive Wave Rings for Listening to Candidate */}
            {isListening && (
              <>
                <motion.div 
                  animate={{ 
                    scale: [1, 1.15 + (audioLevel * 0.005), 1], 
                    opacity: [0.5, 0.1, 0.5] 
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 w-44 h-44 md:w-52 md:h-52 m-auto rounded-full border-2 border-rose-500/50 pointer-events-none"
                />
              </>
            )}

            {/* Avatar Headshot with Reactive Rim Light */}
            <motion.div 
              animate={{
                y: isSpeaking ? [0, -6, 0] : isListening ? [0, 2, 0] : 0,
                scale: isSpeaking ? [1, 1.03, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`relative w-36 h-36 md:w-44 md:h-44 rounded-full p-1.5 shadow-2xl overflow-hidden ${
                isListening 
                  ? 'bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-500 ring-4 ring-rose-500/30' 
                  : 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500'
              }`}
            >
              <img 
                src={persona.avatarImage} 
                alt={persona.name}
                className="w-full h-full rounded-full object-cover" 
              />
              {/* Speaking Voice Wave Overlay on bottom of avatar */}
              {isSpeaking && (
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center gap-1 px-4">
                  {[40, 70, 30, 90, 50, 80, 45, 60].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ['20%', `${h}%`, '20%'] }}
                      transition={{ duration: 0.4 + (i * 0.05), repeat: Infinity, repeatType: "reverse" }}
                      className="w-1 bg-white rounded-full"
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Persona Style Badge Below Avatar */}
            <div className="mt-3 text-center">
              <span className="text-xs font-bold text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                {persona.styleTrait}
              </span>
            </div>
          </div>
        ) : (
          /* Voice Only Reactive Waveform Orb */
          <div className="relative flex flex-col items-center justify-center">
            <motion.div 
              animate={{
                scale: isSpeaking ? [1, 1.3, 1.1] : isListening ? [1, 1.25 + (audioLevel * 0.004), 1] : [1, 1.05, 1],
                rotate: isThinking ? [0, 360] : 0,
              }}
              transition={{
                scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "linear" }
              }}
              className={`w-32 h-32 md:w-40 md:h-40 rounded-full shadow-[0_0_80px_rgba(99,102,241,0.5)] flex items-center justify-center relative p-1 ${
                isListening 
                  ? 'bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-500' 
                  : 'bg-gradient-to-tr from-indigo-600 via-violet-500 to-pink-500'
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
                        className="w-1.5 bg-gradient-to-t from-indigo-400 to-pink-400 rounded-full"
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
                  <Bot className="w-10 h-10 text-zinc-400" />
                )}
              </div>
            </motion.div>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-3">
              Voice-First Studio • {persona.name}
            </p>
          </div>
        )}
      </div>

      {/* Real-Time Live Subtitles Box (Dual View: Interviewer Question & Candidate Real-Time Spoken Words) */}
      <div className="relative z-10 w-full max-w-2xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-4 md:p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {isSpeaking ? (
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Volume2 className="w-3 h-3 text-indigo-400 animate-pulse" />
                Interviewer Speaking ({persona.name})
              </span>
            ) : isListening ? (
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Mic className="w-3 h-3 animate-pulse" />
                Candidate Speaking (Your Turn)
              </span>
            ) : (
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Volume2 className="w-3 h-3" />
                {persona.name} (Ready)
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isListening && candidateLiveText && onSubmitTurn && (
              <button 
                onClick={onSubmitTurn}
                className="text-[10px] font-extrabold text-indigo-300 hover:text-white bg-indigo-600/30 hover:bg-indigo-600/50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-indigo-400/30 transition-all"
              >
                <span>Send Answer</span>
                <CornerDownLeft className="w-2.5 h-2.5" />
              </button>
            )}
            <span className="text-[10px] text-zinc-500 font-medium">Real-Time</span>
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
                {currentSubtitle || (isThinking ? "Formulating strategic follow-up..." : isListening ? "Listening closely to your answer (speak naturally)..." : "Waiting for next turn...")}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
