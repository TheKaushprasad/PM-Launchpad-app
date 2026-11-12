import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { isAiInterviewEnabled, isAnyAiInterviewEnabled } from './featureFlags';
import { authJsonHeaders } from './apiClient';

// Whether the signed-in user may use the AI interview, and whether they are an invited tester.
// Testers (list kept in the local eval dashboard) can use it on the live site before launch; when
// they agree, their full interviews are saved for review (server/interviewTesters.ts).

export interface InterviewAccess {
  loading: boolean;
  /** The interview studio is open (text, voice, or both). */
  enabled: boolean;
  /** Voice mode is offered. Off on the live site until VITE_AI_INTERVIEW_ENABLED=true; testers always get it. */
  voice: boolean;
  tester: boolean;
  /** Free mock interviews left this month (null when signed out or unknown). */
  allowance: InterviewAllowance | null;
  /** Voice interviews left this year (null when voice isn't offered or there's no limit here). */
  voiceAllowance: VoiceInterviewAllowance | null;
  /** Reads access and the free interviews left again (after an interview ends). */
  refresh: () => void;
}

/** Free plan: mock interviews per calendar month (server/interviewAllowance.ts). */
export interface InterviewAllowance {
  /** Paid account or tester: no monthly limit. */
  unlimited: boolean;
  limit: number;
  used: number;
  left: number;
  /** When the free interviews come back, e.g. "1 Dec". */
  resetsOn: string;
}

/** Voice interviews per calendar year, for everyone (server/interviewAllowance.ts). */
export interface VoiceInterviewAllowance {
  limit: number;
  used: number;
  left: number;
  /** e.g. "2026" */
  year: string;
}

export const freeInterviewsUsedUp = (a: InterviewAllowance | null | undefined) => !!a && !a.unlimited && a.left <= 0;

export function freeInterviewsExhaustedText(a: InterviewAllowance) {
  return `You have used your ${a.limit} free mock interview${a.limit === 1 ? '' : 's'} for this month. Your free interviews come back on ${a.resetsOn}.`;
}

const initialAccess = { enabled: isAnyAiInterviewEnabled, voice: isAiInterviewEnabled, tester: false, allowance: null, voiceAllowance: null };

// Whether voice mode is offered, for the mode pickers inside the studio (provided by InterviewGate).
export const InterviewVoiceContext = createContext<boolean>(isAiInterviewEnabled);
export const useVoiceInterviewAvailable = () => useContext(InterviewVoiceContext);

// Voice interviews left this year (provided by InterviewGate).
export const VoiceAllowanceContext = createContext<VoiceInterviewAllowance | null>(null);
export const useVoiceAllowance = () => useContext(VoiceAllowanceContext);

/** Voice can be picked: it is offered and enough voice interviews are left (a full loop needs one per round). */
export function useVoiceModeOpen(needed = 1): boolean {
  const offered = useVoiceInterviewAvailable();
  const voice = useVoiceAllowance();
  return offered && (!voice || voice.left >= needed);
}

// Free interviews left this month, for the studio (provided by InterviewGate).
export const InterviewAllowanceContext = createContext<{ allowance: InterviewAllowance | null; refresh: () => void }>({
  allowance: null,
  refresh: () => {},
});
export const useInterviewAllowance = () => useContext(InterviewAllowanceContext);

export function useInterviewAccess(uid: string | null | undefined): InterviewAccess {
  const [state, setState] = useState<Omit<InterviewAccess, 'refresh'>>({ loading: true, ...initialAccess });
  const [version, setVersion] = useState(0);
  const refresh = useCallback(() => setVersion((v) => v + 1), []);
  const loaded = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    let cancelled = false;
    // A refresh keeps the studio on screen; only a new sign-in shows the loading spinner.
    if (loaded.current !== uid) setState((s) => ({ ...s, loading: true }));
    (async () => {
      try {
        const res = await fetch('/api/interview-access', { headers: await authJsonHeaders() });
        const json = res.ok ? await res.json() : null;
        if (!cancelled) {
          setState({
            loading: false,
            enabled: isAnyAiInterviewEnabled || !!json?.enabled,
            voice: isAiInterviewEnabled || !!json?.voice,
            tester: !!json?.tester,
            allowance: json?.allowance && typeof json.allowance.left === 'number' ? json.allowance : null,
            voiceAllowance: json?.voiceAllowance && typeof json.voiceAllowance.left === 'number' ? json.voiceAllowance : null,
          });
          loaded.current = uid;
        }
      } catch {
        if (!cancelled) setState({ loading: false, ...initialAccess });
      }
    })();
    return () => { cancelled = true; };
  }, [uid, version]);
  return { ...state, refresh };
}

const consentKey = (uid: string) => `interviewEvalConsent:${uid}`;
// Fallback when the browser blocks storage (private mode): consent lasts until the page reloads.
const sessionConsent = new Set<string>();

export function hasEvalConsent(uid: string | null | undefined): boolean {
  if (!uid) return false;
  if (sessionConsent.has(uid)) return true;
  try {
    return !!localStorage.getItem(consentKey(uid));
  } catch {
    return false;
  }
}

export function setEvalConsent(uid: string, agreed: boolean): void {
  if (agreed) sessionConsent.add(uid);
  else sessionConsent.delete(uid);
  try {
    if (agreed) localStorage.setItem(consentKey(uid), new Date().toISOString());
    else localStorage.removeItem(consentKey(uid));
  } catch {
    // Storage blocked: sessionConsent above still covers this visit.
  }
}
