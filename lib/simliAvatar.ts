// Realistic video interviewer: the interviewer's voice audio is streamed to Simli, which returns a
// lip-synced video face over WebRTC and plays the voice through the given <audio> element.
// If anything fails the interview keeps the photo avatar and plays the voice directly.

// The package's index requires './Client' but ships 'client.js', which breaks on case-sensitive
// file systems (Linux, Vercel), so import the module directly.
import { SimliClient, LogLevel } from 'simli-client/dist/client';
import { authJsonHeaders } from './apiClient';

const SIMLI_SAMPLE_RATE = 16000;
const CHUNK_BYTES = 6000;

export type AvatarStartResult =
  | { ok: true; avatar: SimliAvatar }
  | { ok: false; reason: 'not_configured' | 'limited' | 'failed' };

export class SimliAvatar {
  private client: SimliClient;
  private stopped = false;

  constructor(client: SimliClient) {
    this.client = client;
  }

  /**
   * Speaks the given audio through the video face. Resolves when the avatar goes quiet
   * (or after the audio's length plus a margin, in case the event never arrives).
   */
  speak(audio: AudioBuffer): Promise<void> {
    if (this.stopped) return Promise.resolve();
    const pcm = toPcm16(audio);
    return new Promise<void>((resolve) => {
      let started = false;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearTimeout(fallback);
        this.client.off('speaking', onSpeaking);
        this.client.off('silent', onSilent);
        resolve();
      };
      const onSpeaking = () => { started = true; };
      const onSilent = () => { if (started) finish(); };
      const fallback = setTimeout(finish, audio.duration * 1000 + 4000);
      this.client.on('speaking', onSpeaking);
      this.client.on('silent', onSilent);
      for (let i = 0; i < pcm.length; i += CHUNK_BYTES) {
        this.client.sendAudioData(pcm.subarray(i, Math.min(i + CHUNK_BYTES, pcm.length)));
      }
    });
  }

  /** Cuts the avatar off mid-sentence, e.g. when the interview ends. */
  interrupt() {
    try { this.client.ClearBuffer(); } catch { /* not connected */ }
  }

  async stop() {
    if (this.stopped) return;
    this.stopped = true;
    try { await this.client.stop(); } catch { /* already closed */ }
  }
}

/** Asks the server for a session (it holds the API key and daily caps), then connects the video. */
export async function startSimliAvatar(
  video: HTMLVideoElement,
  audio: HTMLAudioElement,
  targetSeconds: number,
  timeoutMs = 15000
): Promise<AvatarStartResult> {
  let sessionToken: string;
  try {
    const res = await fetch('/api/interview/avatar-session', {
      method: 'POST',
      headers: await authJsonHeaders(),
      body: JSON.stringify({ targetSeconds })
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 503 && data?.configured === false) return { ok: false, reason: 'not_configured' };
    if (res.status === 429) return { ok: false, reason: 'limited' };
    if (!res.ok || !data?.sessionToken) return { ok: false, reason: 'failed' };
    sessionToken = data.sessionToken;
  } catch {
    return { ok: false, reason: 'failed' };
  }

  const client = new SimliClient(sessionToken, video, audio, null, LogLevel.ERROR, 'livekit');
  try {
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Simli start timed out')), timeoutMs);
      client.on('start', () => { clearTimeout(timer); resolve(); });
      client.on('startup_error', (msg: string) => { clearTimeout(timer); reject(new Error(msg)); });
      client.start().catch((err: unknown) => { clearTimeout(timer); reject(err); });
    });
    return { ok: true, avatar: new SimliAvatar(client) };
  } catch (err) {
    console.warn('Video avatar unavailable:', err);
    try { await client.stop(); } catch { /* ignore */ }
    return { ok: false, reason: 'failed' };
  }
}

/** Decodes server TTS audio (mp3, or raw 16-bit PCM) into an AudioBuffer. */
export async function decodeTtsAudio(base64: string, format: string, sampleRate = 24000): Promise<AudioBuffer> {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const Ctx = window.AudioContext || (window as any).webkitAudioContext;
  const ctx: AudioContext = new Ctx();
  try {
    if (format === 'mp3') {
      return await ctx.decodeAudioData(bytes.buffer.slice(0) as ArrayBuffer);
    }
    const int16 = new Int16Array(bytes.buffer, 0, Math.floor(bytes.byteLength / 2));
    const buffer = ctx.createBuffer(1, int16.length, sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < int16.length; i++) channel[i] = int16[i] / 32768;
    return buffer;
  } finally {
    ctx.close().catch(() => {});
  }
}

/** Mixes to mono, resamples to 16 kHz and encodes as little-endian 16-bit PCM bytes. */
function toPcm16(audio: AudioBuffer): Uint8Array {
  const ratio = audio.sampleRate / SIMLI_SAMPLE_RATE;
  const outLength = Math.floor(audio.length / ratio);
  const channels = Array.from({ length: audio.numberOfChannels }, (_, c) => audio.getChannelData(c));
  const out = new Int16Array(outLength);
  for (let i = 0; i < outLength; i++) {
    // Average the source samples that fall into this output sample (simple low-pass + mono mix).
    const start = Math.floor(i * ratio);
    const end = Math.max(start + 1, Math.floor((i + 1) * ratio));
    let sum = 0;
    let count = 0;
    for (const data of channels) {
      for (let j = start; j < end && j < data.length; j++) {
        sum += data[j];
        count++;
      }
    }
    const sample = count ? Math.max(-1, Math.min(1, sum / count)) : 0;
    out[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }
  return new Uint8Array(out.buffer);
}
