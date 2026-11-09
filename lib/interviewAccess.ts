import { createContext, useContext, useEffect, useState } from 'react';
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
}

const initialAccess = { enabled: isAnyAiInterviewEnabled, voice: isAiInterviewEnabled, tester: false };

// Whether voice mode is offered, for the mode pickers inside the studio (provided by InterviewGate).
export const InterviewVoiceContext = createContext<boolean>(isAiInterviewEnabled);
export const useVoiceInterviewAvailable = () => useContext(InterviewVoiceContext);

export function useInterviewAccess(uid: string | null | undefined): InterviewAccess {
  const [state, setState] = useState<InterviewAccess>({ loading: true, ...initialAccess });
  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true }));
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
          });
        }
      } catch {
        if (!cancelled) setState({ loading: false, ...initialAccess });
      }
    })();
    return () => { cancelled = true; };
  }, [uid]);
  return state;
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
