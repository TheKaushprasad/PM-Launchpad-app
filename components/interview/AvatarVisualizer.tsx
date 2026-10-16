import React, { useState } from 'react';
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
  // Falls back to initials if the photo can't load.
  const [photoFailed, setPhotoFailed] = useState(false);
  const initials = persona.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  // Ring colour: green while she talks, rose while you record, amber while she thinks.
  const ringClass = isListening
    ? 'from-rose-500 via-pink-500 to-rose-400'
    : isThinking
    ? 'from-amber-400 via-amber-300 to-amber-500'
    : 'from-brand-400 via-emerald-300 to-brand-600';

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

      {/* Centre: Priya's photo in a ring that pulses when she talks. Tapping it starts or pauses your answer. */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-3 w-full max-w-lg">
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 md:w-44 md:h-44">
            {/* Pulse rings: only while someone is talking */}
            {(isSpeaking || isListening) && [0, 1].map((i) => (
              <motion.span
                key={i}
                aria-hidden
                initial={{ scale: 1, opacity: 0.45 }}
                animate={{ scale: isListening ? 1.25 + audioLevel * 0.004 : 1.3, opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}
                className={`absolute inset-0 rounded-full border-2 ${isListening ? 'border-rose-400' : 'border-emerald-400'}`}
              />
            ))}
            <motion.button
              type="button"
              onClick={canUseMic ? onToggleMic : undefined}
              disabled={!canUseMic}
              aria-label={isListening ? 'Pause the microphone' : 'Start answering'}
              animate={{ rotate: isThinking ? 360 : 0 }}
              transition={{ rotate: { duration: 6, repeat: isThinking ? Infinity : 0, ease: 'linear' } }}
              className={`relative w-full h-full rounded-full p-1 bg-gradient-to-tr ${ringClass} shadow-[0_0_60px_rgba(16,185,129,0.3)] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 ${canUseMic ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <motion.div
                animate={{ rotate: isThinking ? -360 : 0 }}
                transition={{ rotate: { duration: 6, repeat: isThinking ? Infinity : 0, ease: 'linear' } }}
                className="w-full h-full rounded-full overflow-hidden bg-zinc-800 border-4 border-zinc-950"
              >
                {persona.avatarImage && !photoFailed ? (
                  <img
                    src={persona.avatarImage}
                    alt={persona.name}
                    onError={() => setPhotoFailed(true)}
                    className={`w-full h-full object-cover transition ${isListening ? 'brightness-50' : ''}`}
                    draggable={false}
                  />
                ) : (
                  <span className="w-full h-full flex items-center justify-center text-3xl font-extrabold text-zinc-300">{initials}</span>
                )}
              </motion.div>
            </motion.button>
            {/* Mic badge: shows the circle is also the answer button */}
            {!isThinking && (
              <span
                aria-hidden
                className={`pointer-events-none absolute bottom-1 right-1 w-11 h-11 rounded-full flex items-center justify-center border-4 border-zinc-950 shadow-lg ${
                  isListening ? 'bg-rose-500 text-white' : isYourTurn ? 'bg-white text-zinc-900' : 'bg-zinc-700 text-zinc-300'
                }`}
              >
                <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
              </span>
            )}
            {isThinking && (
              <span aria-hidden className="pointer-events-none absolute bottom-1 right-1 w-11 h-11 rounded-full flex items-center justify-center border-4 border-zinc-950 bg-amber-400 text-zinc-900 shadow-lg">
                <Sparkles className="w-5 h-5" />
              </span>
            )}
          </div>

          {isListening ? (
            /* You · Recording, with a live waveform from the mic level */
            <div className="mt-5 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-sm font-bold">
                <span className="text-white">You</span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" /> Recording
                </span>
              </div>
              <div className="flex items-center gap-[3px] h-6" aria-hidden>
                {Array.from({ length: 28 }, (_, i) => {
                  const shape = 0.35 + 0.65 * Math.abs(Math.sin(i * 1.7));
                  return (
                    <span
                      key={i}
                      className="w-[3px] rounded-full bg-rose-300/80 transition-all duration-75"
                      style={{ height: `${Math.max(3, Math.min(24, audioLevel * shape * 0.35))}px` }}
                    />
                  );
                })}
              </div>
              <p className="text-xs text-zinc-400">Tap the photo to pause, then press Done answering below.</p>
            </div>
          ) : (
            <p className={`text-sm font-bold mt-5 text-center ${isYourTurn ? 'text-white' : 'text-zinc-400'}`}>
              {micLabel}
            </p>
          )}
        </div>
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
