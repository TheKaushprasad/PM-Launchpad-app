const env = (import.meta as unknown as { env?: Record<string, string | boolean> }).env || {};

// The AI interview is hidden on the live site until it is ready. It always works in local dev
// (`npm run dev`); set VITE_AI_INTERVIEW_ENABLED=true in Vercel and redeploy to turn it on live.
export const isAiInterviewEnabled = env.DEV === true || env.VITE_AI_INTERVIEW_ENABLED === 'true';
