import { useEffect, useState } from 'react';
import { isAiInterviewEnabled } from './featureFlags';
import { authJsonHeaders } from './apiClient';

// Whether the signed-in user may use the AI interview, and whether they are an invited tester.
// Testers (list kept in the local eval dashboard) can use it on the live site before launch; when
// they agree, their full interviews are saved for review (server/interviewTesters.ts).

export interface InterviewAccess {
  loading: boolean;
  enabled: boolean;
  tester: boolean;
}

export function useInterviewAccess(uid: string | null | undefined): InterviewAccess {
  const [state, setState] = useState<InterviewAccess>({ loading: true, enabled: isAiInterviewEnabled, tester: false });
  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true }));
    (async () => {
      try {
        const res = await fetch('/api/interview-access', { headers: await authJsonHeaders() });
        const json = res.ok ? await res.json() : null;
        if (!cancelled) setState({ loading: false, enabled: isAiInterviewEnabled || !!json?.enabled, tester: !!json?.tester });
      } catch {
        if (!cancelled) setState({ loading: false, enabled: isAiInterviewEnabled, tester: false });
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
