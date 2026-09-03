import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Mic, CheckCircle2, Shield, AlertCircle, X, ArrowRight } from 'lucide-react';
import { InterviewMode } from '../../types/interview';

interface AccessRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: () => void;
  mode?: InterviewMode;
}

export const AccessRequestModal: React.FC<AccessRequestModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  mode = 'avatar'
}) => {
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'granted' | 'denied'>('idle');
  const [micStatus, setMicStatus] = useState<'idle' | 'granted' | 'denied'>('idle');
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isVoiceOnly = mode === 'voice';

  // Check initial permission states if supported by browser Permissions API
  useEffect(() => {
    if (!isOpen) return;

    const checkExistingPermissions = async () => {
      try {
        if (navigator.permissions && navigator.permissions.query) {
          if (!isVoiceOnly) {
            try {
              const camPermission = await navigator.permissions.query({ name: 'camera' as any });
              if (camPermission.state === 'granted') setCameraStatus('granted');
              else if (camPermission.state === 'denied') setCameraStatus('denied');
            } catch (e) {}
          }

          try {
            const micPermission = await navigator.permissions.query({ name: 'microphone' as any });
            if (micPermission.state === 'granted') setMicStatus('granted');
            else if (micPermission.state === 'denied') setMicStatus('denied');
          } catch (e) {}
        }
      } catch (err) {}
    };

    checkExistingPermissions();
  }, [isOpen, isVoiceOnly]);

  const handleGrantAccess = async () => {
    setIsRequesting(true);
    setErrorMessage(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMessage("Media devices API is not available in this browser environment. You can still enter and type your answers.");
        setIsRequesting(false);
        return;
      }

      if (isVoiceOnly) {
        // Voice-only mode only needs microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
        setMicStatus('granted');
      } else {
        // Avatar mode tries camera & mic with graceful single-device fallback
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          });
          stream.getTracks().forEach((track) => track.stop());
          setCameraStatus('granted');
          setMicStatus('granted');
        } catch (bothErr) {
          // If both fail, attempt microphone separately
          try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioStream.getTracks().forEach((t) => t.stop());
            setMicStatus('granted');
          } catch (audioErr) {
            setMicStatus('denied');
          }

          // Attempt camera separately
          try {
            const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoStream.getTracks().forEach((t) => t.stop());
            setCameraStatus('granted');
          } catch (videoErr) {
            setCameraStatus('denied');
          }
        }
      }

      setIsRequesting(false);

      if (onContinue) {
        setTimeout(() => {
          onContinue();
        }, 400);
      }
    } catch (err: any) {
      console.warn("Permission request notice:", err);
      setIsRequesting(false);
      setErrorMessage("Permissions were declined or unavailable. You can still proceed directly into the studio and use text or audio fallbacks.");
    }
  };

  const handleProceedDirectly = () => {
    if (onContinue) {
      onContinue();
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="access-request-modal-overlay"
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md"
      >
        <motion.div
          id="access-request-card"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl border border-zinc-200 shadow-2xl w-full max-w-md overflow-hidden text-zinc-900"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-black text-zinc-900 tracking-tight">
                  Studio Media Access
                </h2>
                <p className="text-[11px] text-zinc-500 font-medium">
                  {isVoiceOnly ? 'Voice-Only Simulation' : 'AI Avatar Interview Studio'}
                </p>
              </div>
            </div>
            <button
              id="access-request-close-btn"
              onClick={onClose}
              className="px-3 py-1 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors flex items-center gap-1"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <p className="text-xs font-medium text-zinc-600 leading-relaxed">
              {isVoiceOnly 
                ? "Voice-Only Mode uses your microphone for hands-free speech-to-text. Camera is never required."
                : "The AI Avatar Studio can use your microphone for speech-to-text and your webcam for candidate video mirror."}
            </p>

            {/* Permissions List */}
            <div className="space-y-3">
              {/* Camera Permission Item (Only for Avatar mode) */}
              {!isVoiceOnly && (
                <div 
                  id="permission-item-camera"
                  className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      cameraStatus === 'granted' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-zinc-900">Webcam Mirror</h3>
                      <p className="text-[11px] text-zinc-500 font-medium">Candidate video mirror (optional)</p>
                    </div>
                  </div>

                  <div>
                    {cameraStatus === 'granted' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Granted
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-zinc-400">
                        Optional
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Microphone Permission Item */}
              <div 
                id="permission-item-microphone"
                className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    micStatus === 'granted' 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-zinc-900">Microphone</h3>
                    <p className="text-[11px] text-zinc-500 font-medium">Real-time speech-to-text input</p>
                  </div>
                </div>

                <div>
                  {micStatus === 'granted' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Granted
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-zinc-500">
                      Recommended
                    </span>
                  )}
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between gap-3">
            <button
              id="access-request-footer-proceed-btn"
              onClick={handleProceedDirectly}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>Enter Studio Anyway</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            <button
              id="access-request-grant-btn"
              onClick={handleGrantAccess}
              disabled={isRequesting}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-md shadow-indigo-200 transition-all flex items-center gap-2"
            >
              {isRequesting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (isVoiceOnly ? micStatus === 'granted' : (cameraStatus === 'granted' && micStatus === 'granted')) ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ready • Enter Studio</span>
                </>
              ) : (
                <span>Allow & Connect</span>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
