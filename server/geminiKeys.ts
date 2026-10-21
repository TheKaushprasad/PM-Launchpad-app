/**
 * Which Gemini API key each feature uses.
 *
 * GEMINI_API_KEY is the general key (tools, projects feedback, resume and profile helpers).
 * GEMINI_INTERVIEW_API_KEY is an optional separate key for the AI interview only: Priya's
 * replies, hints, scoring, and the Gemini fallbacks for her voice and transcription. It lets
 * the interview run on a paid key while the rest of the site stays on a free one. When it is
 * not set, the interview uses GEMINI_API_KEY as before.
 */
const clean = (value: string | undefined) => {
  const key = value?.trim();
  return key && key !== "undefined" && key !== "null" ? key : undefined;
};

export const getGeminiKey = () => clean(process.env.GEMINI_API_KEY);

export const getInterviewGeminiKey = () => clean(process.env.GEMINI_INTERVIEW_API_KEY) || getGeminiKey();

export const hasSeparateInterviewGeminiKey = () => !!clean(process.env.GEMINI_INTERVIEW_API_KEY);
