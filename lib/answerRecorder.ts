// Records the candidate's spoken answer so the server can transcribe it with Groq Whisper,
// which is far more accurate than the browser's live speech recognition.
// One answer can span several mic sessions (the mic pauses while the interviewer speaks),
// so each session is kept as its own segment and transcribed separately.

import { authJsonHeaders } from './apiClient';

// Vercel rejects request bodies over about 4.5 MB; base64 adds a third, so stay well under.
const MAX_SEGMENT_BYTES = 3 * 1024 * 1024;

const PREFERRED_TYPES = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];

export const canRecordAudio = () =>
  typeof window !== 'undefined' && typeof (window as any).MediaRecorder !== 'undefined';

function pickMimeType(): string | undefined {
  const MR = (window as any).MediaRecorder;
  if (!MR?.isTypeSupported) return undefined;
  return PREFERRED_TYPES.find(t => MR.isTypeSupported(t));
}

export class AnswerRecorder {
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private segments: Blob[] = [];
  private stopping: Promise<void> | null = null;

  /** Starts recording a new segment on an already-open mic stream. */
  start(stream: MediaStream) {
    if (!canRecordAudio() || this.recorder) return;
    try {
      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, { ...(mimeType ? { mimeType } : {}), audioBitsPerSecond: 32000 });
      this.chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) this.chunks.push(e.data);
      };
      this.stopping = new Promise<void>((resolve) => {
        recorder.onstop = () => {
          if (this.chunks.length > 0) {
            this.segments.push(new Blob(this.chunks, { type: recorder.mimeType || mimeType || 'audio/webm' }));
          }
          this.chunks = [];
          this.recorder = null;
          resolve();
        };
      });
      recorder.start(1000);
      this.recorder = recorder;
    } catch (err) {
      console.warn('Answer recording unavailable:', err);
      this.recorder = null;
    }
  }

  /** Stops the current segment (if any) and waits until it is saved. */
  async stop() {
    const pending = this.stopping;
    if (this.recorder && this.recorder.state !== 'inactive') {
      try { this.recorder.stop(); } catch { /* already stopped */ }
    }
    if (pending) await pending;
    this.stopping = null;
  }

  hasAudio() {
    return this.segments.length > 0 || !!this.recorder;
  }

  /** Drops everything recorded so far, e.g. when the candidate typed their answer instead. */
  async discard() {
    await this.stop();
    this.segments = [];
  }

  /**
   * Stops recording and transcribes every segment of this answer.
   * Returns { unavailable } when transcription fails or is not set up, so the caller keeps the browser transcript.
   */
  async transcribe(extraHeaders: Record<string, string> = {}): Promise<{ text: string } | { unavailable: true; notConfigured?: boolean }> {
    await this.stop();
    const segments = this.segments;
    this.segments = [];
    if (segments.length === 0) return { unavailable: true };
    if (segments.some(s => s.size > MAX_SEGMENT_BYTES)) return { unavailable: true };

    try {
      const headers = { ...(await authJsonHeaders()), ...extraHeaders };
      const parts: string[] = [];
      for (const segment of segments) {
        const audioBase64 = await blobToBase64(segment);
        const res = await fetch('/api/interview/transcribe', {
          method: 'POST',
          headers,
          body: JSON.stringify({ audioBase64, mimeType: segment.type || 'audio/webm' })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return { unavailable: true, notConfigured: data?.configured === false };
        if (data.transcript) parts.push(String(data.transcript).trim());
      }
      return { text: parts.filter(Boolean).join(' ') };
    } catch (err) {
      console.warn('Answer transcription failed:', err);
      return { unavailable: true };
    }
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = String(reader.result || '');
      resolve(result.slice(result.indexOf(',') + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
