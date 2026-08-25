import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff, User, RefreshCw, CheckCircle2 } from 'lucide-react';

interface WebcamMirrorProps {
  isMicActive: boolean;
}

export const WebcamMirror: React.FC<WebcamMirrorProps> = ({ isMicActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const streamRef = useRef<MediaStream | null>(null);

  const startWebcam = async () => {
    if (!cameraEnabled) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setHasPermission(false);
      return;
    }

    setIsInitializing(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn("getUserMedia not supported in this browser environment");
        setHasPermission(false);
        setIsInitializing(false);
        return;
      }

      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }

      let stream: MediaStream;
      try {
        // Try user facing ideal constraint
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false
        });
      } catch (e) {
        // Fallback to generic video constraint
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(playErr => {
            console.warn("Video play error:", playErr);
          });
        };
      }
      setHasPermission(true);
    } catch (err: any) {
      console.warn("Webcam access error:", err);
      setHasPermission(false);
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    startWebcam();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [cameraEnabled]);

  const toggleCamera = () => {
    if (!cameraEnabled) {
      setCameraEnabled(true);
    } else {
      setCameraEnabled(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setHasPermission(false);
    }
  };

  return (
    <div className="relative w-36 h-28 md:w-48 md:h-36 rounded-2xl bg-zinc-900 border border-zinc-700/80 shadow-2xl overflow-hidden group">
      {cameraEnabled && hasPermission ? (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover transform -scale-x-100 bg-zinc-950"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-400 gap-1.5 p-2 text-center">
          {isInitializing ? (
            <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin" />
          ) : (
            <User className="w-7 h-7 text-zinc-500" />
          )}
          <button 
            onClick={startWebcam}
            className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 underline mt-0.5"
          >
            {isInitializing ? "Detecting camera..." : hasPermission === false ? "Enable Camera" : "Turn on Camera"}
          </button>
        </div>
      )}

      {/* Candidate Overlay Badges */}
      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-black uppercase tracking-wider text-zinc-300 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>You (Candidate)</span>
      </div>

      {/* Bottom Controls inside Pip */}
      <div className="absolute bottom-2 inset-x-2 flex items-center justify-between pointer-events-auto">
        <button 
          onClick={toggleCamera}
          className="p-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white transition-colors backdrop-blur-md"
          title={cameraEnabled ? "Turn camera off" : "Turn camera on"}
        >
          {cameraEnabled && hasPermission ? (
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <CameraOff className="w-3.5 h-3.5 text-zinc-400" />
          )}
        </button>

        <div className={`px-1.5 py-1 rounded-lg backdrop-blur-md flex items-center gap-1 ${
          isMicActive ? 'bg-emerald-500 text-white animate-pulse' : 'bg-black/70 text-zinc-400'
        }`}>
          {isMicActive ? (
            <>
              <Mic className="w-3 h-3 text-white" />
              <span className="text-[8px] font-black uppercase">Live</span>
            </>
          ) : (
            <MicOff className="w-3 h-3 text-zinc-400" />
          )}
        </div>
      </div>
    </div>
  );
};
