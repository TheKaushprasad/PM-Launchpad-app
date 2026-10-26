import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  Calculator, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  X, 
  Volume2, 
  VolumeX, 
  FileText, 
  ChevronLeft,
  Bot,
  User,
  Info,
  Loader2,
  StopCircle,
  HelpCircle,
  CheckCircle2,
  Lightbulb,
  Radio,
  Briefcase,
  Target,
  Layers,
  ArrowRight,
  Shield,
  Play,
  ChevronDown,
  BookOpen
} from 'lucide-react';
import { 
  InterviewScenario, 
  InterviewerPersona, 
  InterviewMode, 
  ConversationMessage, 
  InterviewEvaluation,
  CandidateLevel
} from '../../types/interview';
import { getLevelConfig, getTrackConfig, MAX_HINTS_PER_INTERVIEW } from '../../data/interviewTracks';
import { AvatarVisualizer } from './AvatarVisualizer';
import { ScratchpadModal, PmToolTab } from './ScratchpadModal';
import { InterviewEvaluationView } from './InterviewEvaluationView';
import { useAuth } from '../../context/AuthContext';
import { authJsonHeaders } from '../../lib/apiClient';
import { AnswerRecorder } from '../../lib/answerRecorder';
import { startInterviewTelemetry, nextInterviewTurn, currentInterviewTurn, interviewTraceHeaders, trackInterviewEvent, rememberTurnTrace } from '../../lib/interviewTelemetry';

interface InterviewStageProps {
  scenario: InterviewScenario;
  persona: InterviewerPersona;
  mode: InterviewMode;
  level: CandidateLevel;
  onExit: () => void;
  /** Set when this interview is one round of a full loop. */
  loopInfo?: { round: number; total: number };
  /** Full loop only: called with the round's scorecard when the candidate moves on. */
  onRoundComplete?: (evaluation: InterviewEvaluation) => void;
}

/** Scripted opener: real interviewers read the prompt out, and it costs no AI call. */
function buildOpener(scenario: InterviewScenario, persona: InterviewerPersona): string {
  const track = getTrackConfig(scenario.track);
  if (scenario.track === 'behavioral') {
    return `Hi, I'm ${persona.name}. Thanks for making the time. This is a behavioral round, so I'll ask about your own experience. ${scenario.problemStatement} Take a moment to pick a specific example, then walk me through it.`;
  }
  return `Hi, I'm ${persona.name}. Thanks for making the time. Today's ${track.label.toLowerCase()} question is for ${scenario.company}. ${scenario.problemStatement} Take a moment, and tell me how you'd like to start.`;
}

const nowStamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Splits a line into short pieces (one or two sentences each) so each voice request is quick:
// the first piece is the first sentence, so the interviewer starts talking as soon as possible.
function splitForSpeech(text: string): string[] {
  const sentences = text.trim().match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g)?.map(t => t.trim()).filter(Boolean) || [];
  if (sentences.length === 0) return [text.trim()];
  const pieces: string[] = [];
  for (const sentence of sentences) {
    const last = pieces[pieces.length - 1];
    // Keep the first sentence on its own; join very short sentences onto the previous piece.
    if (pieces.length > 1 && last && (last.length < 40 || last.length + sentence.length < 160)) {
      pieces[pieces.length - 1] = `${last} ${sentence}`;
    } else if (pieces.length === 1 && last && last.length < 12) {
      pieces[0] = `${last} ${sentence}`;
    } else {
      pieces.push(sentence);
    }
  }
  return pieces;
}

// How long to wait for the natural voice before using the browser voice. Allows for a cold server start.
const TTS_TIMEOUT_MS = 20000;

export const InterviewStage: React.FC<InterviewStageProps> = ({
  scenario,
  persona,
  mode,
  level,
  onExit,
  loopInfo,
  onRoundComplete
}) => {
  const { user, recordInterviewSession } = useAuth();
  // Text mode: Priya replies in text only (no voice requests); the candidate can type or record answers.
  const isTextMode = mode === 'text';

  // Initial Loading / Preparation State
  const [isSessionPreparing, setIsSessionPreparing] = useState<boolean>(true);
  const [prepStep, setPrepStep] = useState<number>(1);

  // Conversational State
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<InterviewEvaluation | null>(null);
  // Set when scoring fails. We show a retry screen instead of inventing a score.
  const [evaluationError, setEvaluationError] = useState<string | null>(null);
  // Set when the interviewer's reply fails. The candidate retries; no scripted line is added.
  const [chatError, setChatError] = useState<string | null>(null);
  const [hintsUsed, setHintsUsed] = useState<number>(0);

  // Audio / Speech State
  // Text mode never plays Priya's voice, so it spends no voice quota.
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(!isTextMode);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [micStatusNotice, setMicStatusNotice] = useState<string | null>(null);
  // Why the interviewer is using the browser's basic voice instead of the natural one (null when natural).
  const [voiceFallbackReason, setVoiceFallbackReason] = useState<string | null>(null);
  
  // Refs for Speech Recognition & Silence Detection
  const recognitionRef = useRef<any>(null);
  const latestInputTextRef = useRef<string>('');
  const isListeningRef = useRef<boolean>(false);
  const isThinkingRef = useRef<boolean>(false);
  const isEvaluatingRef = useRef<boolean>(false);
  const isSpeakingRef = useRef<boolean>(false);
  const autoStartListeningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Web Audio & Media Stream Refs
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const activePlaybackAudioCtxRef = useRef<AudioContext | null>(null);
  const activeAudioSourceRef = useRef<any>(null);
  const activeAudioElementRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const speechPlayCounterRef = useRef<number>(0);
  // Spoken answers are also recorded and transcribed server-side (Groq Whisper) for accuracy.
  const answerRecorderRef = useRef<AnswerRecorder>(new AnswerRecorder());
  const serverTranscriptionRef = useRef<boolean>(true);
  // True once the candidate types or edits the answer box; their text then wins over the recording.
  const typedEditRef = useRef<boolean>(false);
  // Live browser recognition is only a preview; it is switched off for the session if it errors.
  const liveRecognitionBrokenRef = useRef<boolean>(false);
  // Keeps the browser-voice utterance alive (Chrome can drop its onend event if it is garbage collected).
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  // Ends a stuck interviewer turn so the mic is never locked out.
  const speakWatchdogRef = useRef<NodeJS.Timeout | null>(null);

  // Keep refs in sync with state for callbacks
  useEffect(() => {
    latestInputTextRef.current = inputText;
  }, [inputText]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    isThinkingRef.current = isThinking;
  }, [isThinking]);

  useEffect(() => {
    isEvaluatingRef.current = isEvaluating;
  }, [isEvaluating]);

  // Voice callbacks (audio end) run from closures created several renders earlier,
  // so they read the transcript, clock and voice setting through refs to avoid dropping turns.
  const messagesRef = useRef<ConversationMessage[]>([]);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  const isVoiceEnabledRef = useRef<boolean>(!isTextMode);
  useEffect(() => {
    isVoiceEnabledRef.current = isVoiceEnabled;
  }, [isVoiceEnabled]);

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  // Timer & Utilities
  const targetDurationSeconds = scenario.targetDurationMinutes * 60;
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const elapsedSecondsRef = useRef<number>(0);
  useEffect(() => {
    elapsedSecondsRef.current = elapsedSeconds;
  }, [elapsedSeconds]);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [scratchpadNotes, setScratchpadNotes] = useState<string>('');
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);
  const [pmToolTab, setPmToolTab] = useState<PmToolTab>('scratchpad');
  const [isPmToolsMenuOpen, setIsPmToolsMenuOpen] = useState<boolean>(false);
  const pmToolsMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isPmToolsMenuOpen) return;
    const close = (e: MouseEvent) => {
      if (pmToolsMenuRef.current && !pmToolsMenuRef.current.contains(e.target as Node)) {
        setIsPmToolsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [isPmToolsMenuOpen]);

  const openPmTool = (tab: PmToolTab) => {
    setPmToolTab(tab);
    setIsScratchpadOpen(true);
    setIsPmToolsMenuOpen(false);
  };
  // Closed by default: the stage subtitles already show what the interviewer says.
  const [isTranscriptOpen, setIsTranscriptOpen] = useState<boolean>(false);
  const [hintLoading, setHintLoading] = useState<boolean>(false);
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [milestoneAlert, setMilestoneAlert] = useState<string | null>(null);
  
  // Custom Confirmation Dialog for End & Evaluate
  const [isEndModalOpen, setIsEndModalOpen] = useState<boolean>(false);

  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Observability (lib/interviewTelemetry.ts): one pending timing per turn, from the moment the
  // candidate submits (or the interview opens) until Priya's voice starts playing (in text mode, until her reply shows).
  const turnTimingRef = useRef<{ startedAt: number; transcribeMs?: number; replyMs?: number } | null>(null);
  const interviewEndedRef = useRef<boolean>(false);
  const reportVoiceStarted = (voice: 'natural' | 'browser' | 'text') => {
    const timing = turnTimingRef.current;
    if (!timing) return;
    turnTimingRef.current = null;
    // The scripted opener shows instantly in text mode, so there is nothing to time.
    if (voice === 'text' && currentInterviewTurn() === 0) return;
    // The opener has no interviewer-turn trace, so its wait is scored on the whole interview under its own name.
    const waitName = voice === 'text' ? 'first_reply_ms'
      : currentInterviewTurn() === 0 ? 'opener_first_voice_ms' : 'first_voice_ms';
    const metrics: Record<string, number> = { [waitName]: Math.round(performance.now() - timing.startedAt) };
    if (timing.transcribeMs !== undefined) metrics.transcribe_ms = timing.transcribeMs;
    if (timing.replyMs !== undefined) metrics.reply_ms = timing.replyMs;
    trackInterviewEvent('turn', metrics, { voice });
  };
  // A started interview that closes without a scorecard counts as a quit, with how far it got.
  const reportAbandoned = () => {
    if (!startedRef.current || interviewEndedRef.current) return;
    interviewEndedRef.current = true;
    trackInterviewEvent('abandoned', {
      elapsed_seconds: elapsedSecondsRef.current,
      candidate_turns: messagesRef.current.filter((m) => m.role === 'candidate').length
    }, { scenarioId: scenario.id }, true);
  };
  const reportAbandonedRef = useRef(reportAbandoned);
  reportAbandonedRef.current = reportAbandoned;
  useEffect(() => {
    const onPageHide = () => reportAbandonedRef.current();
    window.addEventListener('pagehide', onPageHide);
    return () => {
      window.removeEventListener('pagehide', onPageHide);
      reportAbandonedRef.current();
    };
  }, []);

  // Cleanup all audio on unmount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      cleanupSpeech();
    };
  }, []);


  const cleanupSpeech = () => {
    if (autoStartListeningTimeoutRef.current) {
      clearTimeout(autoStartListeningTimeoutRef.current);
      autoStartListeningTimeoutRef.current = null;
    }
    cleanupActiveAudio();
    answerRecorderRef.current.discard();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setSpeaking(false);
    setIsListening(false);
  };

  // Updates the ref immediately so mic guards never read a stale "interviewer is speaking".
  const setSpeaking = (value: boolean) => {
    isSpeakingRef.current = value;
    setIsSpeaking(value);
  };

  const clearSpeakWatchdog = () => {
    if (speakWatchdogRef.current) {
      clearTimeout(speakWatchdogRef.current);
      speakWatchdogRef.current = null;
    }
  };

  const cleanupActiveAudio = () => {
    speechPlayCounterRef.current += 1;
    clearSpeakWatchdog();
    if (activeAudioElementRef.current) {
      try {
        activeAudioElementRef.current.pause();
        activeAudioElementRef.current.src = "";
      } catch (e) {}
      activeAudioElementRef.current = null;
    }
    if (activeAudioSourceRef.current) {
      try {
        activeAudioSourceRef.current.stop();
      } catch (e) {}
      activeAudioSourceRef.current = null;
    }
    if (activePlaybackAudioCtxRef.current) {
      try {
        activePlaybackAudioCtxRef.current.close().catch(() => {});
      } catch (e) {}
      activePlaybackAudioCtxRef.current = null;
    }
    if (synthRef.current) {
      try {
        synthRef.current.cancel();
      } catch (e) {}
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    setSpeaking(false);
  };

  // Called when interviewer finishes speaking prompt
  const handleInterviewerFinishedSpeaking = () => {
    clearSpeakWatchdog();
    setSpeaking(false);

    // Text mode: the candidate chooses to type or tap the mic, so the mic never opens on its own.
    if (isTextMode) return;

    // Auto-engage the microphone after a 400ms echo cooldown
    if (!isListeningRef.current && !isThinkingRef.current && !isEvaluatingRef.current) {
      if (autoStartListeningTimeoutRef.current) {
        clearTimeout(autoStartListeningTimeoutRef.current);
      }
      autoStartListeningTimeoutRef.current = setTimeout(() => {
        if (!isSpeakingRef.current && !isThinkingRef.current && !isEvaluatingRef.current) {
          startListeningSession();
        }
      }, 400);
    }
  };

  // Asks the server for the interviewer's voice audio for this text.
  // Audio requested ahead of time (the opener, during the briefing screen), keyed by its text.
  const prefetchedTtsRef = useRef<Map<string, Promise<Response>>>(new Map());
  const requestTts = async (text: string): Promise<Response> =>
    fetch('/api/interview/tts', {
      method: 'POST',
      headers: { ...(await authJsonHeaders()), ...interviewTraceHeaders() },
      body: JSON.stringify({
        text: text.trim(),
        personaId: persona.id,
        voiceGender: persona.voiceGender
      })
    });

  // Fetches one piece of the interviewer's line and plays it to the end.
  // Resolves 'done' when it finished, 'cancelled' if a newer line took over, or a reason string on failure.
  const fetchAndPlay = async (request: Promise<Response>, speechId: number): Promise<string> => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    try {
      const timeout = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => reject(new DOMException('Voice request timed out', 'AbortError')), TTS_TIMEOUT_MS);
      });
      const res = await Promise.race([request, timeout]);
      clearTimeout(timeoutId);
      if (speechId !== speechPlayCounterRef.current) return 'cancelled';

      if (!res.ok || res.status !== 200) {
        const body = await res.json().catch(() => ({}));
        return res.status === 204
          ? 'no natural voice is available right now'
          : `the voice service returned ${res.status}${body?.error ? `: ${body.error}` : ''}`;
      }
      const data = await res.json();
      if (speechId !== speechPlayCounterRef.current) return 'cancelled';
      if (!data.audioBase64) return 'the voice service did not answer';

      if (data.format === 'mp3') {
        const audio = new Audio("data:audio/mp3;base64," + data.audioBase64);
        activeAudioElementRef.current = audio;
        let stallTimer: ReturnType<typeof setTimeout> | undefined;
        let finish: (outcome: string) => void = () => {};
        const finished = new Promise<string>((resolve) => {
          finish = resolve;
          audio.onended = () => resolve('done');
          audio.onerror = () => resolve(speechId === speechPlayCounterRef.current
            ? 'the natural voice audio could not be played'
            : 'cancelled');
        });
        try {
          await audio.play();
        } catch {
          return speechId === speechPlayCounterRef.current ? 'Chrome blocked the audio from playing' : 'cancelled';
        }
        setVoiceFallbackReason(null);
        reportVoiceStarted('natural');
        // If the audio never gets going or never ends, say so instead of sitting silent.
        const expectedMs = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration * 1000 : 15000;
        stallTimer = setTimeout(() => {
          finish(audio.currentTime > 0 ? 'the natural voice stopped partway' : 'the natural voice audio stayed silent');
        }, expectedMs + 4000);
        const outcome = await finished;
        clearTimeout(stallTimer);
        if (outcome !== 'done') {
          try { audio.pause(); } catch {}
        }
        return speechId === speechPlayCounterRef.current ? outcome : 'cancelled';
      }

      // Raw audio (backup voice): 16-bit samples, so its length tells us how long it should play.
      const sampleRate = data.sampleRate || 24000;
      const expectedMs = (data.audioBase64.length * 3 / 4 / 2 / sampleRate) * 1000;
      let stallTimer: ReturnType<typeof setTimeout> | undefined;
      const outcome = await new Promise<string>((resolve) => {
        const started = playRawPCM(data.audioBase64, sampleRate, speechId, () => resolve('done'));
        if (!started) {
          resolve('the backup voice audio could not be played');
          return;
        }
        setVoiceFallbackReason(null);
        reportVoiceStarted('natural');
        stallTimer = setTimeout(() => {
          const ctx = activePlaybackAudioCtxRef.current;
          resolve(ctx && ctx.state === 'suspended'
            ? 'Chrome kept the backup voice paused'
            : 'the backup voice audio stayed silent');
        }, expectedMs + 4000);
      });
      clearTimeout(stallTimer);
      if (outcome !== 'done' && activeAudioSourceRef.current) {
        try { activeAudioSourceRef.current.onended = null; activeAudioSourceRef.current.stop(); } catch {}
      }
      return speechId === speechPlayCounterRef.current ? outcome : 'cancelled';
    } catch (ttsErr: any) {
      clearTimeout(timeoutId);
      console.warn("TTS notice:", ttsErr);
      return ttsErr?.name === 'AbortError' ? 'the voice service took too long' : 'the voice service did not answer';
    }
  };

  // Human-Like Voice Playback (Zero-Delay Direct Audio from Chat Payload -> Fallback Neural TTS)
  const speakTextWithHumanVoice = async (text: string) => {
    if (!isVoiceEnabledRef.current) {
      if (isTextMode) reportVoiceStarted('text');
      handleInterviewerFinishedSpeaking();
      return;
    }

    // Stop current microphone while interviewer speaks
    if (isListeningRef.current) {
      stopListeningSession();
    }
    cleanupActiveAudio();
    setSpeaking(true);

    const currentSpeechId = ++speechPlayCounterRef.current;

    // Safety net: if audio playback never reports that it ended, hand the turn back to the
    // candidate anyway (voice fetch timeout + roughly 3 words a second + margin).
    const wordCount = text.trim().split(/\s+/).length;
    speakWatchdogRef.current = setTimeout(() => {
      if (currentSpeechId === speechPlayCounterRef.current && isSpeakingRef.current) {
        console.warn("Interviewer audio did not finish; handing the turn back.");
        cleanupActiveAudio();
        handleInterviewerFinishedSpeaking();
      }
    }, TTS_TIMEOUT_MS + wordCount * 400 + 6000);

    // 1. Server TTS, one short piece at a time. Each piece is requested one step ahead of playback,
    // so the next piece is usually ready when the current one ends and no request waits long.
    const parts = splitForSpeech(text);
    const prefetched = prefetchedTtsRef.current;
    const requests: Promise<Response>[] = [];
    const ensureRequested = (i: number) => {
      if (i >= parts.length || i in requests) return;
      const ready = prefetched.get(parts[i]);
      prefetched.delete(parts[i]);
      requests[i] = ready || requestTts(parts[i]);
      requests[i].catch(() => {});
    };
    ensureRequested(0);
    ensureRequested(1);

    for (let i = 0; i < parts.length; i++) {
      ensureRequested(i);
      ensureRequested(i + 1);
      const outcome = await fetchAndPlay(requests[i], currentSpeechId);
      if (outcome === 'cancelled' || currentSpeechId !== speechPlayCounterRef.current) return;
      if (outcome !== 'done') {
        // 2. Fallback to browser speech synthesis for whatever has not been spoken yet
        setVoiceFallbackReason(outcome);
        trackInterviewEvent('voice_fallback', { piece: i }, { reason: outcome });
        if (i === 0) reportVoiceStarted('browser');
        fallbackWebSpeech(parts.slice(i).join(' '), currentSpeechId);
        return;
      }
    }
    handleInterviewerFinishedSpeaking();
  };

  const playRawPCM = (base64Data: string, sampleRate = 24000, speechId?: number, onEnded?: () => void): boolean => {
    try {
      const binary = atob(base64Data);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const int16 = new Int16Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 2));
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return false;
      const audioCtx = new AudioContextClass({ sampleRate });
      activePlaybackAudioCtxRef.current = audioCtx;

      const buffer = audioCtx.createBuffer(1, float32.length, sampleRate);
      buffer.copyToChannel(float32, 0);

      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.onended = () => {
        audioCtx.close().catch(() => {});
        if (onEnded) {
          onEnded();
        } else if (!speechId || speechId === speechPlayCounterRef.current) {
          handleInterviewerFinishedSpeaking();
        }
      };
      activeAudioSourceRef.current = source;

      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }

      source.start(0);
      return true;
    } catch (e) {
      console.warn("PCM audio playback error:", e);
      return false;
    }
  };

  const fallbackWebSpeech = (text: string, speechId?: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      handleInterviewerFinishedSpeaking();
      return;
    }

    if (speechId && speechId !== speechPlayCounterRef.current) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      utterance.rate = 1.0;
      utterance.pitch = persona.voiceGender === 'female' ? 1.02 : 0.96;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        persona.voiceGender === 'female' 
          ? (v.name.includes('Natural') || v.name.includes('Google US English') || v.name.includes('Samantha') || v.name.includes('Victoria')) 
          : (v.name.includes('Natural') || v.name.includes('Google UK English Male') || v.name.includes('Daniel') || v.name.includes('Alex'))
      ) || voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        if (!speechId || speechId === speechPlayCounterRef.current) {
          handleInterviewerFinishedSpeaking();
        }
      };
      utterance.onerror = () => {
        if (!speechId || speechId === speechPlayCounterRef.current) {
          handleInterviewerFinishedSpeaking();
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      handleInterviewerFinishedSpeaking();
    }
  };

  const startedRef = useRef<boolean>(false);

  // Opens the interview with the scripted opener. No AI call.
  const enterStudioImmediately = async () => {
    if (startedRef.current) return;
    startedRef.current = true;
    interviewEndedRef.current = false;
    turnTimingRef.current = { startedAt: performance.now() };
    trackInterviewEvent('started', { target_minutes: scenario.targetDurationMinutes }, {
      scenarioId: scenario.id,
      track: scenario.track,
      level,
      mode,
      voice: isVoiceEnabledRef.current
    });
    const openerText = buildOpener(scenario, persona);
    setMessages([{
      id: 'msg_init_' + Date.now(),
      role: 'interviewer',
      text: openerText,
      timestamp: nowStamp()
    }]);
    setCurrentSubtitle(openerText);
    setIsSessionPreparing(false);
    setIsTimerRunning(true);
    speakTextWithHumanVoice(openerText);
  };

  // Short briefing screen, then the scripted opener
  useEffect(() => {
    startInterviewTelemetry(mode);
    if (isVoiceEnabledRef.current) {
      for (const part of splitForSpeech(buildOpener(scenario, persona)).slice(0, 2)) {
        const response = requestTts(part);
        response.catch(() => {}); // handled when the opener is spoken
        prefetchedTtsRef.current.set(part, response);
      }
    }
    const prepTimer1 = setTimeout(() => setPrepStep(2), 700);
    const prepTimer2 = setTimeout(() => setPrepStep(3), 1400);
    const enterTimer = setTimeout(() => enterStudioImmediately(), 2200);

    return () => {
      clearTimeout(prepTimer1);
      clearTimeout(prepTimer2);
      clearTimeout(enterTimer);
    };
  }, []);

  // Timer Tick
  useEffect(() => {
    if (!isTimerRunning || evaluationResult || isSessionPreparing) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;

        const remaining = targetDurationSeconds - next;
        if (remaining === 300) { // 5 mins left
          setMilestoneAlert("⏱️ 5 Minutes Remaining: Time to begin synthesizing your hypothesis or final recommendation!");
          setTimeout(() => setMilestoneAlert(null), 8000);
        } else if (remaining === 60) { // 1 min left
          setMilestoneAlert("1 Minute Remaining: Wrap up with your executive summary and key tradeoffs.");
          setTimeout(() => setMilestoneAlert(null), 8000);
        } else if (next === targetDurationSeconds) { // Overtime start
          setMilestoneAlert("Target Duration Reached! Session is now in Overtime.");
          setTimeout(() => setMilestoneAlert(null), 8000);
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, evaluationResult, isSessionPreparing, targetDurationSeconds]);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // =====================================================
  // INSTANT SPEECH-TO-TEXT ARCHITECTURE
  // =====================================================
  // The candidate ends each answer with Done answering; nothing is sent automatically.

  // Start instant speech-to-text session
  const startListeningSession = async () => {
    if (isListeningRef.current || isThinkingRef.current || isEvaluatingRef.current || isSpeakingRef.current) return;

    cleanupActiveAudio();

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    let recording = false;

    try {
      // Connect to Mic & AnalyserNode for Visualizer
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;

          if (serverTranscriptionRef.current && !typedEditRef.current) {
            answerRecorderRef.current.start(stream);
            recording = answerRecorderRef.current.hasAudio();
          }
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            const ctx = new AudioContextClass();
            audioContextRef.current = ctx;
            const source = ctx.createMediaStreamSource(stream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const checkVolume = () => {
              if (!analyser) return;
              analyser.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
              }
              const average = sum / bufferLength;
              setAudioLevel(Math.min(100, Math.round(average * 2.5))); // Drives UI waveform & pulsing rings
              animationFrameRef.current = requestAnimationFrame(checkVolume);
            };
            checkVolume();
          }
        } catch (mediaErr: any) {
          console.warn("Microphone getUserMedia check:", mediaErr);
          if (mediaErr?.name === 'NotAllowedError' || mediaErr?.name === 'SecurityError') {
            setMicStatusNotice("Microphone access is blocked. Click the lock icon in the address bar, allow the microphone, then tap the mic again.");
            return;
          }
          if (mediaErr?.name === 'NotFoundError' || mediaErr?.name === 'NotReadableError') {
            setMicStatusNotice("Your microphone isn't available. Check it's connected and not in use by another app (Zoom, Meet), then tap the mic again.");
            return;
          }
        }
      }

      // Step A: Browser API Initialization & Fallback Guard
      if (!SpeechRecognition || liveRecognitionBrokenRef.current) {
        if (!recording) {
          setMicStatusNotice("Voice capture isn't supported in this browser. Please use Chrome or Edge on a laptop.");
          stopListeningSession();
          return;
        }
        setMicStatusNotice("Listening... Your words will appear after you finish. Press Done answering when you're ready.");
        setIsListening(true);
        return;
      }

      // Step B: Configuring Instant Real-Time Streaming
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      // Step C: Handling Live Transcripts (onresult)
      // Text already in the box when this recognition run starts (Chrome restarts it after pauses).
      let sessionBase = latestInputTextRef.current.trim();
      recognition.onstart = () => {
        sessionBase = latestInputTextRef.current.trim();
      };

      recognition.onresult = (event: any) => {
        // Discard any audio picked up while interviewer is speaking (prevents speaker echo)
        if (isSpeakingRef.current) {
          return;
        }
        // The candidate is editing the text by hand; don't overwrite it.
        if (typedEditRef.current) {
          return;
        }

        // Rebuild this run's text from every result, so interim guesses replace each other instead of piling up.
        const pieces: string[] = [];
        for (let i = 0; i < event.results.length; ++i) {
          const transcript = String(event.results[i][0]?.transcript || '').trim();
          if (!transcript) continue;
          const previous = pieces[pieces.length - 1];
          // Some Chrome builds repeat the earlier result inside the next one ("I would", "I would like").
          if (previous && transcript.toLowerCase().startsWith(previous.toLowerCase())) {
            pieces[pieces.length - 1] = transcript;
          } else {
            pieces.push(transcript);
          }
        }

        // Live text preview
        const updated = [sessionBase, pieces.join(' ')].filter(Boolean).join(' ');
        latestInputTextRef.current = updated;
        setInputText(updated);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition notice:", event.error);
        if (event.error === 'not-allowed' && !recording) {
          setMicStatusNotice("Microphone permission was denied. Click the lock icon in the address bar, allow the microphone, then tap the mic again.");
          stopListeningSession();
        } else if (event.error === 'audio-capture') {
          setMicStatusNotice("No microphone was found. Check that a mic is connected and selected in your system settings.");
          stopListeningSession();
        } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
          // Live preview failed (network, blocked service, etc.). The recording still gets transcribed.
          liveRecognitionBrokenRef.current = true;
          try { recognition.stop(); } catch (e) {}
          if (recording) {
            setMicStatusNotice("Listening... Your words will appear after you finish. Press Done answering when you're ready.");
          } else {
            setMicStatusNotice("Voice capture isn't working in this browser right now. Please refresh the page and try again.");
          }
        }
      };

      // Step D: Continuous Auto-Recovery
      recognition.onend = () => {
        if (!liveRecognitionBrokenRef.current && isListeningRef.current && !isThinkingRef.current && !isEvaluatingRef.current && !isSpeakingRef.current) {
          try {
            recognition.start();
          } catch (e) {}
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsListening(true);
      setMicStatusNotice("Listening... Take your time, then press Done answering.");
    } catch (err: any) {
      console.error("Speech recognition start failed:", err);
      setMicStatusNotice("Could not start microphone. You can type your response directly.");
      stopListeningSession();
    }
  };

  const stopListeningSession = () => {
    answerRecorderRef.current.stop();
    if (autoStartListeningTimeoutRef.current) {
      clearTimeout(autoStartListeningTimeoutRef.current);
      autoStartListeningTimeoutRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsListening(false);
    setAudioLevel(0);
    setMicStatusNotice(null);
  };

  // Toggle Microphone manually
  const toggleListening = () => {
    if (isListeningRef.current) {
      stopListeningSession();
      return;
    }
    // Tapping the mic while the interviewer talks cuts them off and starts your answer.
    if (isSpeakingRef.current) {
      cleanupActiveAudio();
    }
    startListeningSession();
  };

  // Asks the interviewer to respond to the transcript so far
  const requestInterviewerReply = async (transcript: ConversationMessage[]) => {
    isThinkingRef.current = true;
    setIsThinking(true);
    setChatError(null);
    try {
      const replyStartedAt = performance.now();
      const res = await fetch('/api/interview/chat', {
        method: 'POST',
        headers: { ...(await authJsonHeaders()), ...interviewTraceHeaders() },
        body: JSON.stringify({
          scenarioId: scenario.id,
          personaId: persona.id,
          level,
          messages: transcript.map(({ role, text }) => ({ role, text })),
          elapsedSeconds: elapsedSecondsRef.current,
          targetSeconds: targetDurationSeconds
        })
      });

      rememberTurnTrace(res);
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.text) {
        throw new Error(data.error || "The interviewer couldn't respond. Please retry.");
      }
      if (turnTimingRef.current) turnTimingRef.current.replyMs = Math.round(performance.now() - replyStartedAt);

      const interviewerMsg: ConversationMessage = {
        id: 'interviewer_' + Date.now(),
        role: 'interviewer',
        text: data.text,
        timestamp: nowStamp()
      };

      setMessages((prev) => [...prev, interviewerMsg]);
      setCurrentSubtitle(data.text);
      speakTextWithHumanVoice(data.text);
    } catch (err: any) {
      console.error("Chat turn error:", err);
      setChatError(err?.message || "The interviewer couldn't respond. Please retry.");
    } finally {
      setIsThinking(false);
    }
  };

  // Candidate Submits Response Turn
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();


    const browserText = latestInputTextRef.current.trim() || inputText.trim();
    const recorder = answerRecorderRef.current;
    const hasRecording = recorder.hasAudio();
    if ((!browserText && !hasRecording) || isThinkingRef.current || chatError) return;

    // Pause listening while interviewer processes and speaks
    stopListeningSession();
    cleanupActiveAudio();
    nextInterviewTurn();
    const submittedAt = performance.now();
    turnTimingRef.current = { startedAt: submittedAt };

    // Prefer the server transcript of the recording; keep the browser text if the candidate edited it
    // or transcription is unavailable.
    let trimmed = browserText;
    if (hasRecording) {
      if (typedEditRef.current && browserText) {
        await recorder.discard();
      } else {
        isThinkingRef.current = true;
        setIsTranscribing(true);
        const result = await recorder.transcribe(interviewTraceHeaders());
        setIsTranscribing(false);
        if (turnTimingRef.current) turnTimingRef.current.transcribeMs = Math.round(performance.now() - submittedAt);
        isThinkingRef.current = false;
        if ('text' in result && result.text) {
          trimmed = result.text;
        } else if ('notConfigured' in result && result.notConfigured) {
          serverTranscriptionRef.current = false;
        }
      }
    }
    typedEditRef.current = false;
    if (!trimmed) {
      setMicStatusNotice("I couldn't catch that. Please tap the mic and answer again, or type your answer.");
      return;
    }

    const candidateMsg: ConversationMessage = {
      id: 'candidate_' + Date.now(),
      role: 'candidate',
      text: trimmed,
      timestamp: nowStamp()
    };

    const updatedMessages = [...messagesRef.current, candidateMsg];
    messagesRef.current = updatedMessages;
    setMessages(updatedMessages);
    setInputText('');
    latestInputTextRef.current = '';
    setCurrentSubtitle(`You: "${trimmed}"`);
    setMicStatusNotice(null);

    await requestInterviewerReply(updatedMessages);
  };

  const retryInterviewerReply = () => {
    if (isThinking) return;
    turnTimingRef.current = { startedAt: performance.now() };
    requestInterviewerReply(messagesRef.current);
  };

  // Takes the unanswered answer back into the input box so the candidate can rephrase it
  const discardLastAnswer = () => {
    const current = messagesRef.current;
    const last = current[current.length - 1];
    if (!last || last.role !== 'candidate') {
      setChatError(null);
      return;
    }
    const remaining = current.slice(0, -1);
    messagesRef.current = remaining;
    setMessages(remaining);
    setInputText(last.text);
    latestInputTextRef.current = last.text;
    typedEditRef.current = true;
    setChatError(null);
  };

  // Trigger Contextual AI Hint (limited, and counted on the scorecard)
  const hintsLeft = MAX_HINTS_PER_INTERVIEW - hintsUsed;
  const handleRequestHint = async () => {
    if (hintLoading || isThinking || hintsLeft <= 0) return;
    setHintLoading(true);

    try {
      const res = await fetch('/api/interview/hint', {
        method: 'POST',
        headers: { ...(await authJsonHeaders()), ...interviewTraceHeaders() },
        body: JSON.stringify({
          scenarioId: scenario.id,
          messages: messagesRef.current.map(({ role, text }) => ({ role, text }))
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.hint) throw new Error(data.error || 'Hint unavailable');
      const hintText: string = data.hint;

      const hintMsg: ConversationMessage = {
        id: 'hint_' + Date.now(),
        role: 'system_hint',
        text: `💡 Framework Hint: ${hintText}`,
        timestamp: nowStamp()
      };

      setMessages((prev) => [...prev, hintMsg]);
      setHintsUsed((n) => n + 1);
      setActiveHint(hintText);
      
      // Auto-hide the floating hint banner after 12 seconds
      setTimeout(() => {
        setActiveHint(null);
      }, 12000);
    } catch (err) {
      console.warn("Hint error:", err);
      setMicStatusNotice("Couldn't load a hint right now. It wasn't counted, so you can try again.");
    } finally {
      setHintLoading(false);
    }
  };

  // Execute End Interview and Generate Rubric Scorecard
  const executeEndInterview = async () => {
    setIsEndModalOpen(false);
    setIsEvaluating(true);
    setEvaluationError(null);
    setIsTimerRunning(false);
    cleanupSpeech();

    try {
      const token = user ? await user.getIdToken().catch(() => null) : null;
      const sessionId = 'eval_' + Date.now();

      const res = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          ...interviewTraceHeaders()
        },
        body: JSON.stringify({
          sessionId,
          scenarioId: scenario.id,
          personaId: persona.id,
          level,
          mode,
          messages: messages.map(({ role, text }) => ({ role, text })),
          elapsedSeconds,
          scratchpadNotes: scratchpadNotes || ''
        })
      });

      const evalData = await res.json().catch(() => null);
      if (!res.ok || !evalData) {
        throw new Error(evalData?.error || "We couldn't score this interview right now.");
      }

      // Server persists to Firestore; this keeps the local history in step
      if (evalData.status !== 'insufficient') {
        try {
          recordInterviewSession({
            id: evalData.id || sessionId,
            scenarioId: scenario.id,
            scenarioTitle: scenario.title,
            company: scenario.company,
            track: scenario.track,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            score: evalData.overallScore,
            verdict: evalData.verdict,
            durationMinutes: Math.ceil(elapsedSeconds / 60),
            scoringVersion: evalData.scoringVersion || 'v3',
            level,
            mode,
            createdAt: new Date().toISOString(),
            pillarScores: Object.fromEntries(
              Object.entries(evalData.pillars || {}).map(([k, p]: [string, any]) => [k, p?.rawScore])
            )
          }, evalData.transcriptSummary || '');
        } catch (storageErr) {
          console.warn("Local session history error:", storageErr);
        }
      }

      interviewEndedRef.current = true;
      trackInterviewEvent('ended', {
        elapsed_seconds: elapsedSeconds,
        candidate_turns: currentInterviewTurn(),
        hints_used: hintsUsed,
        ...(typeof evalData.overallScore === 'number' ? { overall_score: evalData.overallScore } : {})
      }, { scenarioId: scenario.id, status: evalData.status || 'scored', verdict: evalData.verdict || '' });
      setEvaluationResult(evalData as InterviewEvaluation);
    } catch (err: any) {
      console.error("Evaluation error:", err);
      setEvaluationError(err?.message || "We couldn't score this interview right now.");
    } finally {
      setIsEvaluating(false);
    }
  };

  // Back to the same interview after a failed scoring attempt
  const resumeAfterEvaluationError = () => {
    setEvaluationError(null);
    setIsTimerRunning(true);
  };

  // Starts the same case again from the scripted opener
  const restartInterview = () => {
    cleanupSpeech();
    setEvaluationResult(null);
    setEvaluationError(null);
    setChatError(null);
    setMessages([]);
    setElapsedSeconds(0);
    setInputText('');
    latestInputTextRef.current = '';
    setActiveHint(null);
    setHintsUsed(0);
    setScratchpadNotes('');
    typedEditRef.current = false;
    startedRef.current = false;
    startInterviewTelemetry(mode);
    enterStudioImmediately();
  };

  // The conversation as chat bubbles: the transcript drawer in voice mode, the main panel in text mode.
  const renderTranscript = (large: boolean) => (
    <>
      {messages.map((m) => {
        const isCandidate = m.role === 'candidate';
        const isInterviewer = m.role === 'interviewer';
        const isHint = m.role === 'system_hint';

        if (isHint) {
          return (
            <div key={m.id} className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold leading-relaxed shadow-xs flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{m.text}</span>
            </div>
          );
        }

        return (
          <div key={m.id} className={`flex flex-col ${isCandidate ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-1.5 mb-1 px-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
                {isCandidate ? 'You' : persona.name}
              </span>
              <span className="text-[11px] text-zinc-400">{m.timestamp}</span>
            </div>

            <div className={`p-3.5 rounded-2xl ${large ? 'text-sm' : 'text-xs'} font-medium leading-relaxed max-w-[90%] shadow-xs whitespace-pre-wrap select-text ${
              isCandidate 
                ? 'bg-brand-600 text-white rounded-tr-none' 
                : 'bg-zinc-100 text-zinc-800 rounded-tl-none border border-zinc-200/70'
            }`}>
              {m.text}
            </div>
          </div>
        );
      })}

      {isTranscribing && (
        <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold p-2 bg-zinc-50 rounded-xl border border-zinc-100">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-500" />
          <span>Transcribing your answer...</span>
        </div>
      )}

      {isThinking && (
        <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold p-2 bg-zinc-50 rounded-xl border border-zinc-100">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-500" />
          <span>{persona.name} is reviewing your points and preparing follow-up...</span>
        </div>
      )}
    </>
  );

  // Format Elapsed / Remaining Timer
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isOvertime = elapsedSeconds > targetDurationSeconds;
  const overtimeSeconds = isOvertime ? elapsedSeconds - targetDurationSeconds : 0;
  const timeProgressPercent = Math.min(100, (elapsedSeconds / targetDurationSeconds) * 100);

  // If session is preparing, show dedicated Loading / Case Processing Briefing Screen
  if (isSessionPreparing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-5rem)] max-w-3xl mx-auto px-4 py-8 select-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full bg-white rounded-3xl border border-zinc-200 shadow-2xl p-6 md:p-8 relative overflow-hidden"
        >
          {/* Ambient Background Gradient Accent */}
          <div className="absolute top-0 inset-x-0 h-2 bg-linear-to-r from-brand-500 via-brand-500 to-pink-500" />

          {/* Top Bar: Case Tags */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
            <div className="flex items-center gap-2.5">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${scenario.companyColor}`}>
                {scenario.company}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 text-xs font-bold uppercase tracking-wider">
                Track: {scenario.track}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 text-xs font-bold">
                {scenario.targetDurationMinutes} Mins Target
              </span>
            </div>
            <button
              onClick={onExit}
              className="p-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-500 transition-colors"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Case Header */}
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-black text-zinc-900 tracking-tight mb-2">
              {scenario.title}
            </h2>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-medium bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200/80">
              {scenario.problemStatement}
            </p>
          </div>

          {/* Interviewer Persona Box */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-linear-to-r from-zinc-900 to-zinc-950 text-white mb-6 shadow-md">
            <div className="relative">
              <img 
                src={persona.avatarImage} 
                alt={persona.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-brand-400/50 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-zinc-900 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white">{persona.name}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-zinc-300 font-bold uppercase tracking-wider">
                  {persona.role}
                </span>
              </div>
              <p className="text-xs text-zinc-400 truncate mt-0.5">{persona.companyBackground}</p>
              <p className="text-[11px] text-brand-300 font-semibold mt-1">"{persona.styleTrait}"</p>
            </div>
          </div>

          {/* Dynamic Progress Checklist */}
          <div className="space-y-3 mb-6 bg-zinc-50/80 p-4 rounded-2xl border border-zinc-200/70">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-xs font-semibold text-zinc-700">
                Loaded the case
              </span>
            </div>
            <div className="flex items-center gap-3">
              {prepStep >= 2 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <Loader2 className="w-4 h-4 text-brand-500 animate-spin shrink-0" />
              )}
              <span className={`text-xs font-semibold ${prepStep >= 2 ? 'text-zinc-700' : 'text-zinc-400'}`}>
                Setting the bar for {getLevelConfig(level).label} ({getTrackConfig(scenario.track).label} round)
              </span>
            </div>
            <div className="flex items-center gap-3">
              {prepStep >= 3 ? (
                <Loader2 className="w-4 h-4 text-brand-500 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-zinc-300 shrink-0" />
              )}
              <span className={`text-xs font-semibold ${prepStep >= 3 ? 'text-brand-600 font-bold' : 'text-zinc-400'}`}>
                Your case is getting processed... {persona.name} is preparing the opening prompt
              </span>
            </div>
          </div>

          {/* Bottom Status & Voice Engine Notice */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-100 text-xs text-zinc-500 font-medium">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>{isTextMode ? 'Text interview: Priya replies in writing' : 'Studio Voice & Rubric Engine Initializing...'}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold text-zinc-600 hidden sm:inline">Starting in a moment</span>
              <button
                id="skip-prep-enter-studio-btn"
                type="button"
                onClick={enterStudioImmediately}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-md shadow-brand-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enter Studio Now</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // If evaluation is ready, show scorecard view
  if (evaluationResult) {
    return (
      <InterviewEvaluationView
        evaluation={evaluationResult}
        scenario={scenario}
        onRetry={restartInterview}
        onNewInterview={onExit}
        loopInfo={loopInfo}
        onNextRound={onRoundComplete ? () => onRoundComplete(evaluationResult) : undefined}
      />
    );
  }

  // Scoring failed: say so plainly and keep the transcript. Never show an invented score.
  if (evaluationError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-5rem)] max-w-xl mx-auto px-4 py-8">
        <div className="w-full bg-white rounded-3xl border border-amber-200 shadow-xl p-8 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-zinc-900">We couldn't score this interview yet</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {evaluationError} Your answers are still here: {messages.filter((m) => m.role === 'candidate').length} of them, over {formatTime(elapsedSeconds)}. Nothing was saved to your history.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={executeEndInterview}
              disabled={isEvaluating}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isEvaluating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Try scoring again
            </button>
            <button
              type="button"
              onClick={resumeAfterEvaluationError}
              disabled={isEvaluating}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-sm font-bold"
            >
              Back to the interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)] max-w-7xl mx-auto px-2 md:px-4 py-3 select-none">
      {/* Top Bar: Scenario Info & Live Timer */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-3 md:p-4 mb-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: Scenario Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="tap-target p-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors"
            aria-label="Exit session"
            title="Exit Session"
          >
            <X className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-zinc-900 line-clamp-1">{scenario.title}</span>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider ${scenario.companyColor}`}>
                {scenario.company}
              </span>
            </div>
            <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
              {loopInfo ? `Round ${loopInfo.round} of ${loopInfo.total} • ` : ''}{isTextMode ? 'Text • ' : ''}{getTrackConfig(scenario.track).label} • {getLevelConfig(level).short} • {scenario.targetDurationMinutes} Mins
            </span>
          </div>
        </div>

        {/* Center: Live Timer & Progress */}
        <div className="flex items-center gap-4 bg-zinc-50 px-4 py-2 rounded-xl border border-zinc-200/80">
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${isOvertime ? 'text-rose-600 animate-pulse' : 'text-zinc-500'}`} />
            <div className="font-mono font-black text-sm text-zinc-800">
              {formatTime(elapsedSeconds)}
              <span className="text-zinc-400 text-xs font-normal"> / {formatTime(targetDurationSeconds)}</span>
            </div>
          </div>

          {isOvertime && (
            <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[11px] font-black tracking-wider animate-pulse">
              +{formatTime(overtimeSeconds)} OT
            </span>
          )}

          <div className="hidden sm:block w-24 h-2 bg-zinc-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${isOvertime ? 'bg-rose-500' : 'bg-brand-600'}`}
              style={{ width: `${timeProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Studio Utilities & End Button */}
        <div className="flex items-center gap-2">
          {/* PM Tools menu: each option opens that tool in a panel on the left */}
          <div className="relative" ref={pmToolsMenuRef}>
            <button
              type="button"
              onClick={() => setIsPmToolsMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={isPmToolsMenuOpen}
              className="tap-target flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold transition-colors"
              aria-label="PM Tools"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PM Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isPmToolsMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {isPmToolsMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 z-40 w-60 bg-white rounded-2xl border border-zinc-200 shadow-xl p-1.5"
              >
                {([
                  { tab: 'scratchpad', label: 'Scratchpad', note: 'Private notes for your answer', Icon: FileText },
                  { tab: 'calculator', label: 'PM Calculator', note: 'Quick maths for estimates', Icon: Calculator },
                  { tab: 'cheatSheet', label: 'Estimation Constants', note: 'Population and market numbers', Icon: BookOpen },
                ] as const).map(({ tab, label, note, Icon }) => (
                  <button
                    key={tab}
                    type="button"
                    role="menuitem"
                    onClick={() => openPmTool(tab)}
                    className="w-full flex items-start gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-zinc-100 transition-colors"
                  >
                    <Icon className="w-4 h-4 mt-0.5 text-brand-600 shrink-0" />
                    <span>
                      <span className="block text-xs font-bold text-zinc-800">{label}</span>
                      <span className="block text-[11px] text-zinc-500">{note}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {!isTextMode && (
          <button
            onClick={() => {
              if (isVoiceEnabled) {
                cleanupActiveAudio();
              }
              setIsVoiceEnabled(!isVoiceEnabled);
            }}
            className={`p-2 rounded-xl border transition-colors ${
              isVoiceEnabled ? 'bg-brand-50 border-brand-200 text-brand-600' : 'bg-zinc-100 border-zinc-200 text-zinc-400'
            }`}
            title={isVoiceEnabled ? "Mute the interviewer's voice" : "Turn the interviewer's voice on"}
            aria-label={isVoiceEnabled ? "Mute the interviewer's voice" : "Turn the interviewer's voice on"}
          >
            {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          )}

          {!isTextMode && (
          <button
            onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
              isTranscriptOpen ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200'
            }`}
            title={isTranscriptOpen ? "Hide transcript" : "Show transcript"}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isTranscriptOpen ? 'Hide transcript' : 'Transcript'}</span>
          </button>
          )}

          <button
            onClick={() => setIsEndModalOpen(true)}
            disabled={isEvaluating}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-xs transition-all disabled:opacity-50"
          >
            {isEvaluating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Evaluating...
              </>
            ) : (
              <>
                <StopCircle className="w-3.5 h-3.5" /> End & Evaluate
              </>
            )}
          </button>
        </div>
      </div>

      {/* Floating Active Framework Hint Banner */}
      <AnimatePresence>
        {activeHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-3 px-4 py-3 rounded-2xl bg-linear-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-400/40 text-amber-950 text-xs font-semibold flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-amber-500 text-white rounded-lg shadow-xs">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-amber-900 block text-[11px] uppercase tracking-wider">Framework Hint</span>
                <span className="text-zinc-800 text-xs">{activeHint}</span>
              </div>
            </div>
            <button onClick={() => setActiveHint(null)} className="text-amber-800 hover:text-amber-950 p-1">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone Alerts Banner */}
      <AnimatePresence>
        {milestoneAlert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-3 px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-bold flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{milestoneAlert}</span>
            </div>
            <button onClick={() => setMilestoneAlert(null)} className="text-amber-700 hover:text-amber-950">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {voiceFallbackReason && (
        <div className="mb-3 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-800">
          Using your browser's basic voice because {voiceFallbackReason}.
        </div>
      )}

      {/* Mic Status Banner */}
      <AnimatePresence>
        {micStatusNotice && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`mb-3 px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-between ${
              isListening ? 'bg-rose-50 border border-rose-200 text-rose-800' : 'bg-zinc-100 border border-zinc-200 text-zinc-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Radio className={`w-3.5 h-3.5 ${isListening ? 'text-rose-600 animate-pulse' : 'text-zinc-500'}`} />
              <span>{micStatusNotice}</span>
            </div>
            <button onClick={() => setMicStatusNotice(null)} className="hover:opacity-70">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Workspace Stage */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-hidden">
        {/* Left/Center Visual Stage */}
        <div className={`relative h-full flex flex-col ${isTranscriptOpen && !isTextMode ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300 min-h-0`}>
          {isTextMode ? (
            <div className="relative flex-1 w-full min-h-[300px] bg-white rounded-3xl border border-zinc-200 shadow-xs flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-100 flex items-center gap-3 bg-zinc-50/70">
                <img src={persona.avatarImage} alt={persona.name} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
                <div className="min-w-0">
                  <div className="font-extrabold text-sm text-zinc-900">{persona.name}</div>
                  <div className="text-[11px] text-zinc-500 font-medium truncate">
                    {isThinking ? 'Typing...' : `${persona.role} • Text interview`}
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-3">
                {renderTranscript(true)}
                <div ref={transcriptEndRef} />
              </div>
            </div>
          ) : (
          <div className="relative flex-1 w-full h-full min-h-[350px]">
            <AvatarVisualizer
              persona={persona}
              isSpeaking={isSpeaking}
              isThinking={isThinking}
              isListening={isListening}
              currentSubtitle={currentSubtitle}
              candidateLiveText={inputText}
              audioLevel={audioLevel}
              mode={mode}
              onToggleMic={toggleListening}
              micDisabled={isTranscribing || isEvaluating || !!chatError}
            />
          </div>
          )}

          {/* Interviewer reply failed: retry, no scripted stand-in */}
          {chatError && (
            <div className="mt-3 px-4 py-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{chatError} Your answer was kept.</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={retryInterviewerReply}
                  disabled={isThinking}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold disabled:opacity-50"
                >
                  {isThinking ? 'Retrying...' : 'Retry'}
                </button>
                <button
                  type="button"
                  onClick={discardLastAnswer}
                  disabled={isThinking}
                  className="px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-100 font-bold"
                >
                  Edit answer
                </button>
              </div>
            </div>
          )}

          {/* Bottom Candidate Response Toolbar */}
          <div className="mt-3 bg-white rounded-2xl border border-zinc-200 p-2.5 shadow-xs flex items-center gap-2">
            {/* Text Input Box with Live Word-by-Word Preview */}
            <form onSubmit={handleSendMessage} className="flex-1 min-w-0 flex items-center gap-2">
              {isTextMode ? (
                <>
                  <textarea
                    value={inputText}
                    autoFocus
                    rows={2}
                    onChange={(e) => {
                      typedEditRef.current = true;
                      setInputText(e.target.value);
                      latestInputTextRef.current = e.target.value;
                    }}
                    onKeyDown={(e) => {
                      // Enter sends, Shift+Enter starts a new line
                      if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder={
                      isListening
                        ? "Recording... Press Done answering when you finish. You can fix the text before it's sent."
                        : 'Type your answer, or tap the mic to record it. Shift+Enter adds a new line.'
                    }
                    disabled={isThinking || isTranscribing || isEvaluating || !!chatError}
                    className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-800 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium resize-none select-text"
                  />
                  <button
                    type="button"
                    onClick={toggleListening}
                    disabled={isThinking || isTranscribing || isEvaluating || !!chatError}
                    className={`tap-target p-2.5 rounded-xl border shrink-0 transition-colors disabled:opacity-40 ${
                      isListening ? 'bg-rose-600 border-rose-600 text-white animate-pulse' : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:bg-zinc-200'
                    }`}
                    title={isListening ? 'Stop recording' : 'Record your answer'}
                    aria-label={isListening ? 'Stop recording' : 'Record your answer'}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </>
              ) : (
              <input
                type="text"
                value={inputText}
                onChange={(e) => {
                  typedEditRef.current = true;
                  setInputText(e.target.value);
                  latestInputTextRef.current = e.target.value;
                }}
                placeholder={
                  isListening
                    ? "Listening... You can fix the text here before you press Done answering."
                    : "Tap the circle above to answer, or type here."
                }
                disabled={isThinking || isTranscribing || isEvaluating || !!chatError}
                className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs md:text-sm text-zinc-800 focus:outline-hidden focus:ring-2 focus:ring-brand-500 font-medium"
              />
              )}

              <button
                type="submit"
                disabled={(!inputText.trim() && !isListening) || isThinking || isTranscribing || isEvaluating || !!chatError}
                className="tap-target px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs disabled:opacity-40 transition-all shrink-0"
                aria-label="Done answering"
              >
                {isThinking || isTranscribing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span className="hidden sm:inline">Done answering</span>
              </button>
            </form>

            {/* Contextual AI Hint Button */}
            <button
              type="button"
              onClick={handleRequestHint}
              disabled={hintLoading || isThinking || hintsLeft <= 0}
              className="tap-target p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors disabled:opacity-40"
              aria-label={hintsLeft > 0 ? `Get a hint, ${hintsLeft} left` : 'No hints left'}
              title={hintsLeft > 0 ? `Get a hint (${hintsLeft} left). Hints are shown on your scorecard.` : 'No hints left in this interview'}
            >
              {hintLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
              ) : (
                <Sparkles className="w-4 h-4 text-amber-600" />
              )}
              <span className="hidden md:inline">{hintsLeft > 0 ? `Hint (${hintsLeft} left)` : 'No hints left'}</span>
            </button>
          </div>
        </div>

        {/* Right Conversation Transcript Drawer */}
        {isTranscriptOpen && !isTextMode && (
          <div className="lg:col-span-4 h-full bg-white rounded-3xl border border-zinc-200 shadow-xs flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" />
                <span className="font-extrabold text-xs text-zinc-800 uppercase tracking-wider">Live Transcript</span>
              </div>
              <span className="text-[11px] font-bold text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-200/60">
                {messages.length} {messages.length === 1 ? 'message' : 'messages'}
              </span>
            </div>

            {/* Transcript Messages List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {renderTranscript(false)}

              <div ref={transcriptEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Slide-Out / Floating Scratchpad Modal */}
      <ScratchpadModal
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
        initialTab={pmToolTab}
        scratchpadNotes={scratchpadNotes}
        setScratchpadNotes={setScratchpadNotes}
      />

      {/* Custom End & Evaluate Confirmation Modal */}
      <AnimatePresence>
        {isEndModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl border border-zinc-200 shadow-2xl max-w-md w-full p-6 text-zinc-900 overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mb-4 text-rose-600">
                <StopCircle className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-black text-zinc-900 mb-2">
                End Session & Generate Evaluation?
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-6">
                You have practiced for <span className="font-bold text-zinc-900">{formatTime(elapsedSeconds)}</span> across <span className="font-bold text-zinc-900">{messages.length} conversational turns</span>. Ready to be scored on the 5 {getTrackConfig(scenario.track).label} skills at {getLevelConfig(level).label} level?
              </p>

              <div className="bg-zinc-50 rounded-2xl p-3 border border-zinc-200/80 mb-6 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Round</span>
                  <span className="font-bold text-zinc-900">{getTrackConfig(scenario.track).label}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Interviewer</span>
                  <span className="font-bold text-zinc-900">{persona.name} ({persona.companyBackground})</span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Hints used</span>
                  <span className="font-bold text-brand-600">{hintsUsed} of {MAX_HINTS_PER_INTERVIEW}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEndModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 text-xs font-bold transition-colors"
                >
                  Keep Practicing
                </button>
                <button
                  type="button"
                  onClick={executeEndInterview}
                  disabled={isEvaluating}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md shadow-rose-600/20 flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {isEvaluating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Generate Scorecard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
