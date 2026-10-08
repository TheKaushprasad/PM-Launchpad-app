import { RawEvidenceItem, RawPillarScore } from './schemas/evaluation';

export interface GroundingStats {
  total: number;
  valid: number;
  dropped: number;
  echoed: number;
  reindexed: number;
}

export interface TranscriptTurn {
  turnIndex: number;
  speaker: 'CANDIDATE' | 'INTERVIEWER';
  text: string;
}

export type EvidenceValidationStatus = 'valid' | 'reindexed' | 'echoed' | 'dropped';

export const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'aren', 'arent', 'as', 'at', 'be', 'because', 'been', 'before',
  'being', 'below', 'between', 'both', 'but', 'by', 'can', 'cannot', 'could',
  'couldn', 'couldnt', 'did', 'didn', 'didnt', 'do', 'does', 'doesn', 'doesnt',
  'doing', 'don', 'dont', 'down', 'during', 'each', 'few', 'for', 'from',
  'further', 'had', 'hadn', 'hadnt', 'has', 'hasn', 'hasnt', 'have', 'haven',
  'havent', 'having', 'he', 'hed', 'hell', 'hes', 'her', 'here', 'heres',
  'hers', 'herself', 'him', 'himself', 'his', 'how', 'hows', 'i', 'id', 'ill',
  'im', 'ive', 'if', 'in', 'into', 'is', 'isn', 'isnt', 'it', 'its', 'itself',
  'let', 'lets', 'me', 'more', 'most', 'mustn', 'mustnt', 'my', 'myself',
  'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other',
  'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shant',
  'she', 'shed', 'shell', 'shes', 'should', 'shouldn', 'shouldnt', 'so',
  'some', 'such', 'than', 'that', 'thats', 'the', 'their', 'theirs', 'them',
  'themselves', 'then', 'there', 'theres', 'these', 'they', 'theyd', 'theyll',
  'theyre', 'theyve', 'this', 'those', 'through', 'to', 'too', 'under',
  'until', 'up', 'very', 'was', 'wasn', 'wasnt', 'we', 'wed', 'well', 'were',
  'weve', 'weren', 'werent', 'what', 'whats', 'when', 'whens', 'where',
  'wheres', 'which', 'while', 'who', 'whos', 'whom', 'why', 'whys', 'with',
  'won', 'wont', 'would', 'wouldn', 'wouldnt', 'you', 'youd', 'youll', 'youre',
  'youve', 'your', 'yours', 'yourself', 'yourselves'
]);

export function normalizeText(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractNonStopwords(text: string): string[] {
  return normalizeText(text)
    .split(' ')
    .filter(token => Boolean(token) && !STOPWORDS.has(token));
}

/**
 * Contiguous quote matching with sliding-window across candidate turn tokens:
 * 1. Exact substring match is the first, fastest check.
 * 2. Tokenize normalized quote (length n) and normalized candidate turn (length m).
 * 3. Slide a window of n tokens across the turn. For each window, compute the matching
 *    tokens at the same positions, allowing up to 2 tokens of offset for speech-to-text noise.
 * 4. Accept if the best window ratio >= 0.85.
 */
export function slidingWindowMatch(quote: string, candidateTurnText: string): { match: boolean; bestRatio: number } {
  const normQuote = normalizeText(quote);
  const normTurn = normalizeText(candidateTurnText);

  if (!normQuote || !normTurn) {
    return { match: false, bestRatio: 0 };
  }

  // Exact substring check as the first, fastest check
  if (normTurn.includes(normQuote)) {
    return { match: true, bestRatio: 1.0 };
  }

  const qTokens = normQuote.split(' ').filter(Boolean);
  const tTokens = normTurn.split(' ').filter(Boolean);
  const n = qTokens.length;
  const m = tTokens.length;

  if (n === 0 || m === 0) {
    return { match: false, bestRatio: 0 };
  }

  let bestRatio = 0;

  // Slide a window of n tokens across candidate turn tokens
  for (let start = 0; start < Math.max(1, m - n + 2); start++) {
    let matchedInWindow = 0;
    const usedTurnIndices = new Set<number>();

    for (let i = 0; i < n; i++) {
      const qToken = qTokens[i];
      const targetPos = start + i;

      // Allow up to 2 tokens of offset for speech-to-text noise [-2, -1, 0, 1, 2]
      const offsets = [0, -1, 1, -2, 2];
      for (const off of offsets) {
        const checkPos = targetPos + off;
        if (checkPos >= 0 && checkPos < m && !usedTurnIndices.has(checkPos)) {
          if (tTokens[checkPos] === qToken) {
            usedTurnIndices.add(checkPos);
            matchedInWindow++;
            break;
          }
        }
      }
    }

    const ratio = matchedInWindow / n;
    if (ratio > bestRatio) {
      bestRatio = ratio;
    }

    if (bestRatio >= 0.85) {
      return { match: true, bestRatio };
    }
  }

  return { match: bestRatio >= 0.85, bestRatio };
}

/**
 * Measures novelty: (quote tokens NOT present in the matched interviewer turn, excluding stopwords)
 * / (quote tokens, excluding stopwords).
 */
export function calculateNovelty(
  quote: string,
  interviewerText: string
): { novelty: number; nonStopwordCount: number } {
  const quoteNonStopwords = extractNonStopwords(quote);
  if (quoteNonStopwords.length === 0) {
    return { novelty: 1, nonStopwordCount: 0 };
  }

  const interviewerNonStopwords = new Set(extractNonStopwords(interviewerText));
  let notPresentCount = 0;
  for (const token of quoteNonStopwords) {
    if (!interviewerNonStopwords.has(token)) {
      notPresentCount++;
    }
  }

  const novelty = notPresentCount / quoteNonStopwords.length;
  return { novelty, nonStopwordCount: quoteNonStopwords.length };
}

/**
 * Validates candidate quote citations against the transcript:
 * 1. Must be from a CANDIDATE turn.
 * 2. Max 30 words.
 * 3. Contiguous matching: Substring check first, then sliding-window with <=2 token offset >= 0.85.
 * 4. Rejects if quote only matches an INTERVIEWER turn.
 * 5. Reindexing: If quote is not found in cited turnIndex, but found in another candidate turn,
 *    accept it, overwrite item.turnIndex with that candidate turn's turnIndex, and return 'reindexed'.
 * 6. Refined Echo Check:
 *    - Applied ONLY to evidence for analyticalRigor and synthesis. Never to clarification, framework, communication.
 *    - Never compare against turn 0 (the case prompt) or the initial case opener turn.
 *      Only compare against interviewer turns that came after the case prompt (mid-case hints/data).
 *    - Ignore quotes under 6 non-stopword tokens for echo purposes.
 *    - novelty = (quote tokens NOT present in matched interviewer turn, excluding stopwords) / (quote tokens, excluding stopwords).
 *    - Mark as echoed only if novelty < 0.3.
 *    - Logs every echoed item with { pillar, quote, matchedInterviewerTurnIndex, novelty }.
 */
export function validateEvidenceItemDetailed(
  item: RawEvidenceItem,
  turns: TranscriptTurn[],
  pillarKey?: string
): EvidenceValidationStatus {
  if (!item || !item.quote || typeof item.quote !== 'string') return 'dropped';

  // Minimum and maximum quote word count check before normalization
  const words = item.quote.trim().split(/\s+/).filter(Boolean);
  if (words.length < 3 || words.length > 30) return 'dropped';

  const quoteNorm = normalizeText(item.quote);
  if (!quoteNorm || quoteNorm.length < 3) return 'dropped';

  // 1. Check cited turn first
  const citedTurn = turns.find(t => t.turnIndex === item.turnIndex);
  let matchingCandTurn: TranscriptTurn | null = null;
  let wasReindexed = false;

  if (citedTurn && citedTurn.speaker === 'CANDIDATE') {
    const matchResult = slidingWindowMatch(item.quote, citedTurn.text);
    if (matchResult.match) {
      matchingCandTurn = citedTurn;
      wasReindexed = false;
    }
  }

  // 2. If not found in the cited turn, search other candidate turns
  if (!matchingCandTurn) {
    const otherCandidateTurns = turns.filter(
      t => t.speaker === 'CANDIDATE' && (!citedTurn || t.turnIndex !== citedTurn.turnIndex)
    );

    for (const candTurn of otherCandidateTurns) {
      const matchResult = slidingWindowMatch(item.quote, candTurn.text);
      if (matchResult.match) {
        matchingCandTurn = candTurn;
        wasReindexed = true;
        // Overwrite item.turnIndex with the actual matching turn's index
        item.turnIndex = candTurn.turnIndex;
        break;
      }
    }
  }

  // 3. Not found in any candidate turn
  if (!matchingCandTurn) {
    return 'dropped';
  }

  // 4. REFINED ECHO DETECTION
  // Apply ONLY to analyticalRigor and synthesis. Never to clarification, framework, communication.
  const isEchoCheckablePillar = pillarKey === 'analyticalRigor' || pillarKey === 'synthesis';
  if (isEchoCheckablePillar) {
    const quoteNonStopwords = extractNonStopwords(item.quote);

    // Ignore quotes under 6 non-stopword tokens for echo purposes. Too short to judge.
    if (quoteNonStopwords.length >= 6) {
      const firstInterviewer = turns.find(t => t.speaker === 'INTERVIEWER');
      const firstInterviewerIndex = firstInterviewer ? firstInterviewer.turnIndex : -1;

      // Never compare against turn 0 (the case prompt) or the initial case opener.
      // Only compare against interviewer turns that came after the case prompt, i.e. mid-case hints/data.
      const midCaseInterviewerTurns = turns.filter(
        t => t.speaker === 'INTERVIEWER' &&
             t.turnIndex !== 0 &&
             t.turnIndex !== firstInterviewerIndex &&
             t.turnIndex < matchingCandTurn!.turnIndex
      );

      for (const midCaseTurn of midCaseInterviewerTurns) {
        const { novelty } = calculateNovelty(item.quote, midCaseTurn.text);

        // Mark as echoed only if novelty < 0.3
        if (novelty < 0.3) {
          console.log('[Grounding Echo Detected]:', {
            pillar: pillarKey,
            quote: item.quote,
            matchedInterviewerTurnIndex: midCaseTurn.turnIndex,
            novelty: Number(novelty.toFixed(4))
          });
          return 'echoed';
        }
      }
    }
  }

  return wasReindexed ? 'reindexed' : 'valid';
}

export function validateEvidenceItem(
  item: RawEvidenceItem,
  turns: TranscriptTurn[],
  pillarKey?: string
): boolean {
  const status = validateEvidenceItemDetailed(item, turns, pillarKey);
  return status === 'valid' || status === 'reindexed';
}

/**
 * Validates all evidence items across the 5 pillars, gathers grounding stats,
 * and enforces:
 * - Drops invalid or echoed evidence items.
 * - Reindexes quotes found in a different candidate turn (overwrites item.turnIndex and counts in reindexed).
 * - Records groundingStats { total, valid, dropped, echoed, reindexed }.
 * - If a pillar ends up with zero valid evidence and its score is >= 4, cap that pillar at 3.
 */
export function groundAndCapPillars(
  pillars: {
    clarification: RawPillarScore;
    framework: RawPillarScore;
    analyticalRigor: RawPillarScore;
    communication: RawPillarScore;
    synthesis: RawPillarScore;
  },
  transcriptTurns: TranscriptTurn[]
): {
  groundingStats: GroundingStats;
  cappedPillars: string[];
} {
  let total = 0;
  let valid = 0;
  let dropped = 0;
  let echoed = 0;
  let reindexed = 0;
  const cappedPillars: string[] = [];

  const pillarKeys: (keyof typeof pillars)[] = [
    'clarification',
    'framework',
    'analyticalRigor',
    'communication',
    'synthesis'
  ];

  for (const key of pillarKeys) {
    const pillar = pillars[key];
    const originalEvidence = Array.isArray(pillar.evidence) ? pillar.evidence : [];
    total += originalEvidence.length;

    const validatedEvidence: RawEvidenceItem[] = [];

    for (const ev of originalEvidence) {
      const status = validateEvidenceItemDetailed(ev, transcriptTurns, key);
      if (status === 'valid') {
        validatedEvidence.push(ev);
        valid++;
      } else if (status === 'reindexed') {
        validatedEvidence.push(ev);
        valid++;
        reindexed++;
      } else if (status === 'echoed') {
        echoed++;
        dropped++;
      } else {
        dropped++;
      }
    }

    pillar.evidence = validatedEvidence;

    // Rule: If a pillar ends up with zero valid evidence and its score is >= 4, cap that pillar at 3
    if (validatedEvidence.length === 0 && pillar.score >= 4) {
      pillar.score = 3;
      cappedPillars.push(key);
      const capNotice = "Capped at 3: to score higher here, the transcript needs to show clear moments where you demonstrated this skill yourself.";
      pillar.whyTheyDidNotScoreHigher = pillar.whyTheyDidNotScoreHigher 
        ? `${pillar.whyTheyDidNotScoreHigher} ${capNotice}` 
        : capNotice;
    }
  }

  return {
    groundingStats: { total, valid, dropped, echoed, reindexed },
    cappedPillars
  };
}
