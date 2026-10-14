// Voice providers for the interview: Sarvam Bulbul speaks (Deepgram Aura-2 as backup), Groq Whisper listens.
// All are optional; when a key is missing the routes fall back to the older paths.

const SARVAM_SPEAK_URL = "https://api.sarvam.ai/text-to-speech";
const DEEPGRAM_SPEAK_URL = "https://api.deepgram.com/v1/speak";
const GROQ_TRANSCRIBE_URL = "https://api.groq.com/openai/v1/audio/transcriptions";

/** One Aura-2 voice per interviewer persona. */
export const DEEPGRAM_VOICES: Record<string, string> = {
  maya: "aura-2-hera-en",      // smooth, warm, professional
  alex: "aura-2-asteria-en",   // clear, confident, knowledgeable
  priya: "aura-2-athena-en",   // calm, smooth, professional
  marcus: "aura-2-zeus-en"     // deep, trustworthy
};

const DEFAULT_VOICE: Record<string, string> = {
  female: "aura-2-hera-en",
  male: "aura-2-orpheus-en"
};

// Vocabulary hint so Whisper spells product terms correctly.
const PM_VOCAB_PROMPT =
  "Product manager interview answer. Terms: DAU, MAU, WAU, retention, churn, funnel, conversion, KPI, OKR, " +
  "north star metric, A/B test, cohort, GMV, ARPU, LTV, CAC, NPS, MVP, RCA, TAM, SAM, SOM, guesstimate, " +
  "user persona, pain point, prioritisation, RICE, trade-off, go-to-market.";

const hasKey = (value?: string) => !!value && value.trim() !== "" && value !== "undefined";

export const isSarvamConfigured = () => hasKey(process.env.SARVAM_API_KEY);
export const isDeepgramConfigured = () => hasKey(process.env.DEEPGRAM_API_KEY);
export const isGroqConfigured = () => hasKey(process.env.GROQ_API_KEY);

export function deepgramVoiceFor(personaId: string, voiceGender: string): string {
  return DEEPGRAM_VOICES[personaId] || DEFAULT_VOICE[voiceGender === "male" ? "male" : "female"];
}

/** Indian-English Bulbul v4 Flash voice for Priya, picked by the owner on 2026-10-14. SARVAM_VOICE overrides it. */
export const sarvamVoice = () => process.env.SARVAM_VOICE?.trim() || "roopa_en_conversational";

/** Returns MP3 audio for the text from Sarvam Bulbul v4 Flash, or throws. */
export async function synthesizeWithSarvam(text: string, timeoutMs = 6000): Promise<Buffer> {
  const res = await fetch(SARVAM_SPEAK_URL, {
    method: "POST",
    headers: {
      "api-subscription-key": process.env.SARVAM_API_KEY!.trim(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text,
      language_code: "en-IN",
      model: "bulbul:v4-flash",
      speaker: sarvamVoice(),
      output_audio_codec: "mp3"
    }),
    signal: AbortSignal.timeout(timeoutMs)
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Sarvam TTS ${res.status}: ${detail.slice(0, 200)}`);
  }
  const data = await res.json();
  const audio = Array.isArray(data?.audios) ? data.audios.join("") : "";
  if (!audio) throw new Error("Sarvam TTS returned no audio");
  return Buffer.from(audio, "base64");
}

/** Returns MP3 audio for the text, or throws. */
export async function synthesizeWithDeepgram(text: string, voice: string, timeoutMs = 12000): Promise<Buffer> {
  const url = `${DEEPGRAM_SPEAK_URL}?model=${encodeURIComponent(voice)}&encoding=mp3`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.DEEPGRAM_API_KEY!.trim()}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text }),
    signal: AbortSignal.timeout(timeoutMs)
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Deepgram TTS ${res.status}: ${detail.slice(0, 200)}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

function extensionFor(mimeType: string): string {
  if (mimeType.includes("webm")) return "webm";
  if (mimeType.includes("ogg")) return "ogg";
  if (mimeType.includes("mp4") || mimeType.includes("m4a") || mimeType.includes("aac")) return "m4a";
  if (mimeType.includes("mpeg") || mimeType.includes("mp3")) return "mp3";
  return "wav";
}

/** Transcribes one recorded answer with Groq Whisper. Returns plain text, or throws. */
export async function transcribeWithGroq(audio: Buffer, mimeType: string, timeoutMs = 20000): Promise<string> {
  const baseType = mimeType.split(";")[0] || "audio/webm";
  const form = new FormData();
  form.append("file", new Blob([new Uint8Array(audio)], { type: baseType }), `answer.${extensionFor(baseType)}`);
  form.append("model", process.env.GROQ_WHISPER_MODEL?.trim() || "whisper-large-v3-turbo");
  form.append("language", "en");
  form.append("temperature", "0");
  form.append("response_format", "json");
  form.append("prompt", PM_VOCAB_PROMPT);

  const res = await fetch(GROQ_TRANSCRIBE_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY!.trim()}` },
    body: form,
    signal: AbortSignal.timeout(timeoutMs)
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Groq transcription ${res.status}: ${detail.slice(0, 200)}`);
  }
  const data: any = await res.json();
  return typeof data?.text === "string" ? data.text.trim() : "";
}
