import fs from 'fs';
import path from 'path';

export const PROMPT_VERSION = "eval-v2.2";

// In-memory cache for prompts loaded at server start
let cachedEvaluatorPrompt = "";
const cachedInterviewerPrompts: Record<string, string> = {};
const cachedTrackPrompts: Record<string, string> = {};

function safeReadFile(filePath: string, fallback: string): string {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8').trim();
      if (content.length > 0) return content;
    }
  } catch (err) {
    console.warn(`[PromptLoader] Failed reading prompt from ${filePath}:`, err);
  }
  return fallback;
}

export function normalizeTrackKey(track?: string): string | null {
  if (!track || typeof track !== 'string') return null;
  const t = track.trim().toLowerCase();
  if (t === 'rca' || t === 'root_cause' || t === 'root-cause') return 'rca';
  if (t === 'guesstimate' || t === 'guesstimates' || t === 'estimation') return 'guesstimate';
  if (t === 'strategy' || t === 'product_strategy') return 'strategy';
  if (t === 'design' || t === 'product_design') return 'design';
  if (t === 'metrics' || t === 'metric' || t === 'execution') return 'metrics';
  return null;
}

export function loadPrompts(baseDir: string = process.cwd()) {
  const promptsDir = path.resolve(baseDir, 'server/prompts');

  cachedEvaluatorPrompt = safeReadFile(
    path.join(promptsDir, 'evaluator.txt'),
    "You are an expert Product Management Interview Bar Raiser evaluating a candidate's mock interview session."
  );

  const personas = ['maya', 'alex', 'priya', 'marcus'];
  for (const p of personas) {
    cachedInterviewerPrompts[p] = safeReadFile(
      path.join(promptsDir, `interviewer-${p}.txt`),
      `You are an expert PM interviewer with persona ${p}.`
    );
  }

  const tracks = ['rca', 'guesstimate', 'strategy', 'design', 'metrics'];
  const tracksDir = path.join(promptsDir, 'tracks');
  for (const tr of tracks) {
    cachedTrackPrompts[tr] = safeReadFile(
      path.join(tracksDir, `${tr}.txt`),
      ""
    );
  }

  console.log(`[PromptLoader] Initialized prompts version=${PROMPT_VERSION} (Evaluator + ${personas.length} personas + ${tracks.length} tracks loaded)`);
}

export function getTrackPrompt(track?: string): string | null {
  if (Object.keys(cachedTrackPrompts).length === 0) {
    loadPrompts();
  }
  const key = normalizeTrackKey(track);
  if (!key) {
    if (track) {
      console.warn(`[PromptLoader] Unknown track "${track}". Using base anchors only.`);
    }
    return null;
  }
  const content = cachedTrackPrompts[key];
  if (!content) {
    console.warn(`[PromptLoader] Track prompt for "${key}" is empty or not found. Using base anchors only.`);
    return null;
  }
  return content;
}

export function getEvaluatorPrompt(track?: string): string {
  if (!cachedEvaluatorPrompt) {
    loadPrompts();
  }

  const basePrompt = cachedEvaluatorPrompt;
  const trackContent = getTrackPrompt(track);

  if (!trackContent) {
    return basePrompt;
  }

  // Inject matching track file after the base anchors
  const marker = "==================================================\nGROUNDED EVIDENCE RULES";
  const trackOverrideNotice = "TRACK OVERRIDE: The anchors below are specific to this case's track. Where a track anchor exists for a pillar, it REPLACES the base anchor for that pillar. Use base anchors only for pillars the track file does not cover.";
  const injection = `==================================================\nTRACK-SPECIFIC RUBRIC ADJUSTMENTS\n==================================================\n${trackOverrideNotice}\n\n${trackContent}\n\n`;

  if (basePrompt.includes(marker)) {
    return basePrompt.replace(marker, `${injection}${marker}`);
  }

  // Fallback: append after base anchors section
  return `${basePrompt}\n\n${injection}`;
}

export function getInterviewerPersonaPrompt(personaId: string): string {
  if (Object.keys(cachedInterviewerPrompts).length === 0) {
    loadPrompts();
  }
  return cachedInterviewerPrompts[personaId] || cachedInterviewerPrompts.maya || "You are an expert PM interviewer.";
}

