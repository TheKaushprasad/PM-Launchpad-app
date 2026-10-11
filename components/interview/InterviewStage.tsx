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
  Zap,
  Play
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
import { WebcamMirror } from './WebcamMirror';
import { ScratchpadModal } from './ScratchpadModal';
import { InterviewEvaluationView } from './InterviewEvaluationView';
import { useAuth } from '../../context/AuthContext';
import { authJsonHeaders } from '../../lib/apiClient';
import { AnswerRecorder } from '../../lib/answerRecorder';
import { SimliAvatar, decodeTtsAudio, startSimliAvatar } from '../../lib/simliAvatar';

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
  // Text chat starts muted so it doesn't spend voice quota; it can still be switched on.
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(mode !== 'chat');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isAutoSendEnabled, setIsAutoSendEnabled] = useState<boolean>(true);
  const isAutoSendEnabledRef = useRef<boolean>(true);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [micStatusNotice, setMicStatusNotice] = useState<string | null>(null);
  
  // Refs for Speech Recognition & Silence Detection
  const recognitionRef = useRef<any>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
  // Realistic video face (avatar mode only). Falls back to the photo when unavailable.
  const avatarVideoRef = useRef<HTMLVideoElement>(null);
  const avatarAudioRef = useRef<HTMLAudioElement>(null);
  const simliAvatarRef = useRef<SimliAvatar | null>(null);
  const [videoAvatarStatus, setVideoAvatarStatus] = useState<'off' | 'connecting' | 'live' | 'unavailable'>('off');

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

  useEffect(() => {
    isAutoSendEnabledRef.current = isAutoSendEnabled;
  }, [isAutoSendEnabled]);

  // Voice callbacks (silence timer, audio end) run from closures created several renders earlier,
  // so they read the transcript, clock and voice setting through refs to avoid dropping turns.
  const messagesRef = useRef<ConversationMessage[]>([]);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  const isVoiceEnabledRef = useRef<boolean>(mode !== 'chat');
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
  const [isTranscriptOpen, setIsTranscriptOpen] = useState<boolean>(true);
  const [hintLoading, setHintLoading] = useState<boolean>(false);
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [milestoneAlert, setMilestoneAlert] = useState<string | null>(null);
  
  // Custom Confirmation Dialog for End & Evaluate
  const [isEndModalOpen, setIsEndModalOpen] = useState<boolean>(false);

  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Cleanup all audio on unmount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      cleanupSpeech();
      stopVideoAvatar();
    };
  }, []);

  // Ends the paid video session as soon as it is no longer needed.
  const stopVideoAvatar = () => {
    const avatar = simliAvatarRef.current;
    simliAvatarRef.current = null;
    if (avatar) {
      avatar.stop();
      setVideoAvatarStatus('off');
    }
  };

  const cleanupSpeech = () => {
    if (autoStartListeningTimeoutRef.current) {
      clearTimeout(autoStartListeningTimeoutRef.current);
      autoStartListeningTimeoutRef.current = null;
    }
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
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
    setIsSpeaking(false);
    setIsListening(false);
  };

  const cleanupActiveAudio = () => {
    speechPlayCounterRef.current += 1;
    simliAvatarRef.current?.interrupt();
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
    setIsSpeaking(false);
  };

  // Called when interviewer finishes speaking prompt
  const handleInterviewerFinishedSpeaking = () => {
    setIsSpeaking(false);

    // Auto-engage microphone in avatar & voice modes after 400ms echo cooldown
    if ((mode === 'avatar' || mode === 'voice') && !isListeningRef.current && !isThinkingRef.current && !isEvaluatingRef.current) {
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

  // Human-Like Voice Playback (Zero-Delay Direct Audio from Chat Payload -> Fallback Neural TTS)
  const speakTextWithHumanVoice = async (text: string) => {
    if (!isVoiceEnabledRef.current) {
      handleInterviewerFinishedSpeaking();
      return;
    }

    // Stop current microphone while interviewer speaks
    if (isListeningRef.current) {
      stopListeningSession();
    }
    cleanupActiveAudio();
    setIsSpeaking(true);

    const currentSpeechId = ++speechPlayCounterRef.current;

    if (currentSpeechId !== speechPlayCounterRef.current) return;

    // 1. Server TTS (one call per interviewer turn, voice modes only)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch('/api/interview/tts', {
        method: 'POST',
        headers: await authJsonHeaders(),
        signal: controller.signal,
        body: JSON.stringify({
          text: text.trim(),
          personaId: persona.id,
          voiceGender: persona.voiceGender
        })
      });
      clearTimeout(timeoutId);

      if (currentSpeechId !== speechPlayCounterRef.current) return;

      if (res.ok && res.status === 200) {
        const data = await res.json();
        
        if (data.audioBase64 && currentSpeechId === speechPlayCounterRef.current && simliAvatarRef.current) {
          try {
            const buffer = await decodeTtsAudio(data.audioBase64, data.format, data.sampleRate || 24000);
            const avatar = simliAvatarRef.current;
            if (avatar && currentSpeechId === speechPlayCounterRef.current) {
              await avatar.speak(buffer);
              if (currentSpeechId === speechPlayCounterRef.current) {
                handleInterviewerFinishedSpeaking();
              }
              return;
            }
          } catch (avatarErr) {
            console.warn("Video avatar playback failed, playing voice only:", avatarErr);
          }
        }

        if (data.audioBase64 && currentSpeechId === speechPlayCounterRef.current) {
          if (data.format === 'mp3') {
            const audio = new Audio("data:audio/mp3;base64," + data.audioBase64);
            activeAudioElementRef.current = audio;
            audio.onended = () => {
              if (currentSpeechId === speechPlayCounterRef.current) {
                handleInterviewerFinishedSpeaking();
              }
            };
            audio.onerror = () => {
              if (currentSpeechId === speechPlayCounterRef.current) {
                fallbackWebSpeech(text, currentSpeechId);
              }
            };
            await audio.play();
            return;
          } else if (data.format === 'pcm' || data.sampleRate) {
            const success = playRawPCM(data.audioBase64, data.sampleRate || 24000, currentSpeechId);
            if (success) return;
          }
        }
      }
    } catch (ttsErr) {
      console.warn("TTS notice:", ttsErr);
    }

    if (currentSpeechId !== speechPlayCounterRef.current) return;

    // 3. Fallback to optimized browser speech synthesis with neural-like pitch only if server TTS failed
    fallbackWebSpeech(text, currentSpeechId);
  };

  const playRawPCM = (base64Data: string, sampleRate = 24000, speechId?: number): boolean => {
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
        if (!speechId || speechId === speechPlayCounterRef.current) {
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

      utterance.onstart = () => setIsSpeaking(true);
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
    const openerText = buildOpener(scenario, persona);
    setMessages([{
      id: 'msg_init_' + Date.now(),
      role: 'interviewer',
      text: openerText,
      timestamp: nowStamp()
    }]);
    setCurrentSubtitle(openerText);
    setIsSessionPreparing(false);
    await connectVideoAvatar();
    setIsTimerRunning(true);
    speakTextWithHumanVoice(openerText);
  };

  // Avatar mode: connect the realistic video face before the first line. The studio must be on
  // screen first so the <video> element exists. The clock starts only once this settles.
  const connectVideoAvatar = async () => {
    if (mode !== 'avatar' || simliAvatarRef.current) return;
    for (let i = 0; i < 20 && !(avatarVideoRef.current && avatarAudioRef.current); i++) {
      await new Promise((r) => setTimeout(r, 50));
    }
    if (!avatarVideoRef.current || !avatarAudioRef.current) return;
    setVideoAvatarStatus('connecting');
    const result = await startSimliAvatar(avatarVideoRef.current, avatarAudioRef.current, targetDurationSeconds);
    if (result.ok) {
      simliAvatarRef.current = result.avatar;
      setVideoAvatarStatus('live');
    } else {
      setVideoAvatarStatus('unavailable');
      if (result.reason === 'limited') {
        setMilestoneAlert("You've used today's video interviews, so this one uses the photo and voice.");
      }
    }
  };

  // Short briefing screen, then the scripted opener
  useEffect(() => {
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
          setMilestoneAlert("⚠️ 1 Minute Remaining: Wrap up with your executive summary and key tradeoffs.");
          setTimeout(() => setMilestoneAlert(null), 8000);
        } else if (next === targetDurationSeconds) { // Overtime start
          setMilestoneAlert("🚨 Target Duration Reached! Session is now in Overtime.");
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
  // INSTANT SPEECH-TO-TEXT ARCHITECTURE & AUTO-SEND LOGIC
  // =====================================================

  // Reset silence timer on every spoken word/sound. A 3.5s pause submits the answer when Auto-Send is on;
  // shorter pauses are normal thinking time in an interview.
  const AUTO_SEND_SILENCE_MS = 3500;
  const resetSilenceTimer = () => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }
    if (!isAutoSendEnabledRef.current) return;

    silenceTimeoutRef.current = setTimeout(() => {
      const currentText = latestInputTextRef.current.trim();
      if (currentText.length > 0 && !isThinkingRef.current && !isEvaluatingRef.current) {
        handleSendMessage();
      }
    }, AUTO_SEND_SILENCE_MS);
  };

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
          // Without live recognition, a pause in the mic volume decides when the answer is finished.
          let heardSpeech = false;
          let lastLoudAt = Date.now();

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
              if (!SpeechRecognition && recording) {
                const now = Date.now();
                if (average > 12) {
                  heardSpeech = true;
                  lastLoudAt = now;
                } else if (heardSpeech && isAutoSendEnabledRef.current && now - lastLoudAt > AUTO_SEND_SILENCE_MS
                  && !isThinkingRef.current && !isEvaluatingRef.current) {
                  heardSpeech = false;
                  handleSendMessage();
                }
              }
              animationFrameRef.current = requestAnimationFrame(checkVolume);
            };
            checkVolume();
          }
        } catch (mediaErr: any) {
          console.warn("Microphone getUserMedia check:", mediaErr);
        }
      }

      // Step A: Browser API Initialization & Fallback Guard
      if (!SpeechRecognition) {
        setMicStatusNotice(recording
          ? "🎙️ Listening... Your answer is transcribed when you finish. Press Send when you're done."
          : "Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari, or type your answer.");
        setIsListening(true);
        return;
      }

      // Step B: Configuring Instant Real-Time Streaming
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      // Step C: Handling Live Transcripts (onresult)
      recognition.onresult = (event: any) => {
        // Discard any audio picked up while interviewer is speaking (prevents speaker echo)
        if (isSpeakingRef.current) {
          return;
        }

        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Live text preview
        if (finalTranscript) {
          setInputText((prev) => {
            const updated = prev ? `${prev} ${finalTranscript.trim()}` : finalTranscript.trim();
            latestInputTextRef.current = updated;
            return updated;
          });
        } else if (interimTranscript) {
          setInputText((prev) => {
            const base = latestInputTextRef.current;
            return base ? `${base} ${interimTranscript.trim()}` : interimTranscript.trim();
          });
        }

        // Reset silence timer on every recognized word/interim fragment
        resetSilenceTimer();
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition notice:", event.error);
        if (event.error === 'not-allowed') {
          setMicStatusNotice("Microphone permission was denied. Please allow microphone access in browser settings.");
          stopListeningSession();
        }
      };

      // Step D: Continuous Auto-Recovery
      recognition.onend = () => {
        if (isListeningRef.current && !isThinkingRef.current && !isEvaluatingRef.current && !isSpeakingRef.current) {
          try {
            recognition.start();
          } catch (e) {}
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsListening(true);
      setMicStatusNotice(isAutoSendEnabledRef.current
        ? "🎙️ Listening... Take your time. A 3-second pause sends your answer, or press Send when you're done."
        : "🎙️ Listening... Press Send when you're done speaking.");
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
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
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
    if (isListening) {
      stopListeningSession();
    } else {
      startListeningSession();
    }
  };

  // Asks the interviewer to respond to the transcript so far
  const requestInterviewerReply = async (transcript: ConversationMessage[]) => {
    isThinkingRef.current = true;
    setIsThinking(true);
    setChatError(null);
    try {
      const res = await fetch('/api/interview/chat', {
        method: 'POST',
        headers: await authJsonHeaders(),
        body: JSON.stringify({
          scenarioId: scenario.id,
          personaId: persona.id,
          level,
          messages: transcript.map(({ role, text }) => ({ role, text })),
          elapsedSeconds: elapsedSecondsRef.current,
          targetSeconds: targetDurationSeconds
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.text) {
        throw new Error(data.error || "The interviewer couldn't respond. Please retry.");
      }

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

    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }

    const browserText = latestInputTextRef.current.trim() || inputText.trim();
    const recorder = answerRecorderRef.current;
    const hasRecording = recorder.hasAudio();
    if ((!browserText && !hasRecording) || isThinkingRef.current || chatError) return;

    // Pause listening while interviewer processes and speaks
    stopListeningSession();
    cleanupActiveAudio();

    // Prefer the server transcript of the recording; keep the browser text if the candidate edited it
    // or transcription is unavailable.
    let trimmed = browserText;
    if (hasRecording) {
      if (typedEditRef.current && browserText) {
        await recorder.discard();
      } else {
        isThinkingRef.current = true;
        setIsTranscribing(true);
        const result = await recorder.transcribe();
        setIsTranscribing(false);
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
        headers: await authJsonHeaders(),
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
    stopVideoAvatar();

    try {
      const token = user ? await user.getIdToken().catch(() => null) : null;
      const sessionId = 'eval_' + Date.now();

      const res = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          sessionId,
          scenarioId: scenario.id,
          personaId: persona.id,
          level,
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
            createdAt: new Date().toISOString(),
            pillarScores: Object.fromEntries(
              Object.entries(evalData.pillars || {}).map(([k, p]: [string, any]) => [k, p?.rawScore])
            )
          }, evalData.transcriptSummary || '');
        } catch (storageErr) {
          console.warn("Local session history error:", storageErr);
        }
      }

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
    enterStudioImmediately();
  };

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
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] max-w-3xl mx-auto px-4 py-8 select-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full bg-white rounded-3xl border border-zinc-200 shadow-2xl p-6 md:p-8 relative overflow-hidden"
        >
          {/* Ambient Background Gradient Accent */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Top Bar: Case Tags */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
            <div className="flex items-center gap-2.5">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${scenario.companyColor}`}>
                {scenario.company}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 text-xs font-bold uppercase tracking-wider">
                Track: {scenario.track}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">
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
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-950 text-white mb-6 shadow-md">
            <div className="relative">
              <img 
                src={persona.avatarImage} 
                alt={persona.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-indigo-400/50 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-zinc-900 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white">{persona.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-zinc-300 font-bold uppercase tracking-wider">
                  {persona.role}
                </span>
              </div>
              <p className="text-xs text-zinc-400 truncate mt-0.5">{persona.companyBackground}</p>
              <p className="text-[11px] text-indigo-300 font-semibold mt-1">"{persona.styleTrait}"</p>
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
                <Loader2 className="w-4 h-4 text-indigo-500 animate-spin shrink-0" />
              )}
              <span className={`text-xs font-semibold ${prepStep >= 2 ? 'text-zinc-700' : 'text-zinc-400'}`}>
                Setting the bar for {getLevelConfig(level).label} ({getTrackConfig(scenario.track).label} round)
              </span>
            </div>
            <div className="flex items-center gap-3">
              {prepStep >= 3 ? (
                <Loader2 className="w-4 h-4 text-indigo-500 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-zinc-300 shrink-0" />
              )}
              <span className={`text-xs font-semibold ${prepStep >= 3 ? 'text-indigo-600 font-bold' : 'text-zinc-400'}`}>
                Your case is getting processed... {persona.name} is preparing the opening prompt
              </span>
            </div>
          </div>

          {/* Bottom Status & Voice Engine Notice */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-100 text-xs text-zinc-500 font-medium">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>Studio Voice & Rubric Engine Initializing...</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold text-zinc-600 hidden sm:inline">Starting in a moment</span>
              <button
                id="skip-prep-enter-studio-btn"
                type="button"
                onClick={enterStudioImmediately}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-200 transition-all flex items-center gap-1.5 cursor-pointer"
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
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] max-w-xl mx-auto px-4 py-8">
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
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
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
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-7xl mx-auto px-2 md:px-4 py-3 select-none">
      {/* Top Bar: Scenario Info & Live Timer */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-3 md:p-4 mb-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Left: Scenario Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors"
            title="Exit Session"
          >
            <X className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-zinc-900 line-clamp-1">{scenario.title}</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${scenario.companyColor}`}>
                {scenario.company}
              </span>
            </div>
            <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
              {loopInfo ? `Round ${loopInfo.round} of ${loopInfo.total} • ` : ''}{getTrackConfig(scenario.track).label} • {getLevelConfig(level).short} • {scenario.targetDurationMinutes} Mins
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
            <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-black tracking-wider animate-pulse">
              +{formatTime(overtimeSeconds)} OT
            </span>
          )}

          <div className="hidden sm:block w-24 h-2 bg-zinc-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${isOvertime ? 'bg-rose-500' : 'bg-indigo-600'}`}
              style={{ width: `${timeProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Studio Utilities & End Button */}
        <div className="flex items-center gap-2">
          {/* Auto-Send Toggle Button */}
          <button
            onClick={() => setIsAutoSendEnabled(!isAutoSendEnabled)}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-colors ${
              isAutoSendEnabled 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                : 'bg-zinc-100 border-zinc-200 text-zinc-500'
            }`}
            title="Sends your spoken answer after a 3-second pause. Turn off to send with the Send button only."
          >
            <Zap className={`w-3 h-3 ${isAutoSendEnabled ? 'text-emerald-600' : 'text-zinc-400'}`} />
            <span>Auto-Send {isAutoSendEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setIsScratchpadOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold transition-colors"
            title="Open PM Calculator & Scratchpad"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PM Tools</span>
          </button>

          <button
            onClick={() => {
              if (isVoiceEnabled) {
                cleanupActiveAudio();
              }
              setIsVoiceEnabled(!isVoiceEnabled);
            }}
            className={`p-2 rounded-xl border transition-colors ${
              isVoiceEnabled ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-zinc-100 border-zinc-200 text-zinc-400'
            }`}
            title={isVoiceEnabled ? "Mute Natural Voice" : "Enable Natural Voice"}
          >
            {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
            className={`p-2 rounded-xl border transition-colors ${
              isTranscriptOpen ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'
            }`}
            title={isTranscriptOpen ? "Hide Transcript Drawer" : "Show Transcript Drawer"}
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsEndModalOpen(true)}
            disabled={isEvaluating}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-sm transition-all disabled:opacity-50"
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
            className="mb-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-400/40 text-amber-950 text-xs font-semibold flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-amber-500 text-white rounded-lg shadow-sm">
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
            className="mb-3 px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-bold flex items-center justify-between shadow-sm"
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
        <div className={`relative h-full flex flex-col ${isTranscriptOpen ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300`}>
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
              onSubmitTurn={handleSendMessage}
              videoRef={avatarVideoRef}
              videoAudioRef={avatarAudioRef}
              videoLive={videoAvatarStatus === 'live'}
              videoStatusText={videoAvatarStatus === 'connecting' ? 'Connecting video…' : null}
            />

            {/* Floating Candidate Webcam Mirror (Top Right of Avatar Stage) */}
            {mode === 'avatar' && (
              <div className="absolute top-4 right-4 z-20">
                <WebcamMirror isMicActive={isListening} />
              </div>
            )}
          </div>

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
          <div className="mt-3 bg-white rounded-2xl border border-zinc-200 p-2.5 shadow-sm flex items-center gap-2">
            {/* Mic Toggle Button with Live Pulse Ring & Waveform Visualizer */}
            <button
              type="button"
              onClick={toggleListening}
              className={`relative p-3 rounded-xl flex items-center justify-center transition-all ${
                isListening 
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 ring-4 ring-rose-500/20' 
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
              }`}
              title={isListening ? "Stop Microphone" : "Turn on Instant Voice Streaming"}
            >
              {isListening ? (
                <div className="flex items-center gap-1.5">
                  <MicOff className="w-4 h-4 animate-pulse" />
                  {/* Live Volume Waveform Meter */}
                  <div className="flex items-center gap-0.5 h-3.5">
                    {[0.5, 1, 0.7, 1.2, 0.4].map((mult, idx) => (
                      <span
                        key={idx}
                        className="w-0.5 bg-white rounded-full transition-all duration-75"
                        style={{
                          height: `${Math.max(3, Math.min(14, (audioLevel * mult * 0.2)))}px`
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>

            {/* Text Input Box with Live Word-by-Word Preview */}
            <form onSubmit={handleSendMessage} className="flex-1 flex items-center gap-2">
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
                    ? (isAutoSendEnabled ? "🎙️ Listening... take your time (a 3-second pause sends)" : "🎙️ Listening... press Send when you're done") 
                    : "Type your answer, framework step, or tap mic for instant voice streaming..."
                }
                disabled={isThinking || isTranscribing || isEvaluating || !!chatError}
                className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs md:text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isThinking || isEvaluating || !!chatError}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-40 transition-all shrink-0"
              >
                {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>

            {/* Contextual AI Hint Button */}
            <button
              type="button"
              onClick={handleRequestHint}
              disabled={hintLoading || isThinking || hintsLeft <= 0}
              className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors disabled:opacity-40"
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
        {isTranscriptOpen && (
          <div className="lg:col-span-4 h-full bg-white rounded-3xl border border-zinc-200 shadow-sm flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span className="font-extrabold text-xs text-zinc-800 uppercase tracking-wider">Live Transcript</span>
              </div>
              <span className="text-[10px] font-bold text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-200/60">
                {messages.length} Turns
              </span>
            </div>

            {/* Transcript Messages List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m) => {
                const isCandidate = m.role === 'candidate';
                const isInterviewer = m.role === 'interviewer';
                const isHint = m.role === 'system_hint';

                if (isHint) {
                  return (
                    <div key={m.id} className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold leading-relaxed shadow-sm flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{m.text}</span>
                    </div>
                  );
                }

                return (
                  <div key={m.id} className={`flex flex-col ${isCandidate ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                        {isCandidate ? 'You' : persona.name}
                      </span>
                      <span className="text-[9px] text-zinc-400">{m.timestamp}</span>
                    </div>

                    <div className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed max-w-[90%] shadow-sm ${
                      isCandidate 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-zinc-100 text-zinc-800 rounded-tl-none border border-zinc-200/70'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                );
              })}

              {isTranscribing && (
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold p-2 bg-zinc-50 rounded-xl border border-zinc-100">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                  <span>Transcribing your answer...</span>
                </div>
              )}

              {isThinking && (
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold p-2 bg-zinc-50 rounded-xl border border-zinc-100">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                  <span>{persona.name} is reviewing your points and preparing follow-up...</span>
                </div>
              )}

              <div ref={transcriptEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Slide-Out / Floating Scratchpad Modal */}
      <ScratchpadModal
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
        scratchpadNotes={scratchpadNotes}
        setScratchpadNotes={setScratchpadNotes}
      />

      {/* Custom End & Evaluate Confirmation Modal */}
      <AnimatePresence>
        {isEndModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
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
                  <span className="font-bold text-indigo-600">{hintsUsed} of {MAX_HINTS_PER_INTERVIEW}</span>
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
