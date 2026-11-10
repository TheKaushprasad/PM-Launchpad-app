import React, { useCallback, useEffect, useState } from 'react';
import { CreditCard, Gift, Loader2, Lock, Ticket } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isPaymentsEnabled } from '../../lib/featureFlags';
import { Button } from '../ui/button';
import { TOOL_LABELS, formatPrice, paymentsApi, type Credits, type OfferItem, type ToolKey } from './api';

// Runs for the Resume Auditor, LinkedIn Optimiser, Assignment Solver and AI Product Strategy. Every
// account gets one free run of each tool per month (live site too); buy buttons only show while payments
// are on (npm run dev, or VITE_PAYMENTS_ENABLED=true). The server decides what is allowed; these only show it.

/** The signed-in user's runs for every tool. `refresh` after a run to update the counts. */
export function useToolCredits() {
  const { user } = useAuth();
  const [credits, setCredits] = useState<Credits | null>(null);
  const refresh = useCallback(() => {
    if (!user) return setCredits(null);
    paymentsApi.credits().then(setCredits).catch(() => setCredits(null));
  }, [user?.uid]);
  useEffect(() => { refresh(); }, [refresh]);
  return { credits, refresh };
}

/** "1 free run left" / "3 runs left" / "No runs left" next to a tool's main button. */
export const ToolRunsBadge: React.FC<{ tool: ToolKey; credits: Credits | null; className?: string }> = ({ tool, credits, className = '' }) => {
  const c = credits?.signedIn ? credits[tool] : undefined;
  if (!c) return null;
  const label = TOOL_LABELS[tool];
  let text: string;
  if (c.freeResetsOn) {
    // Free runs that come back each month (AI Product Strategy).
    const resets = new Date(`${c.freeResetsOn}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' });
    text = c.freeLeft > 0
      ? `${c.freeLeft} free ${c.freeLeft === 1 ? label.one : label.many} left this month${c.credits ? ` + ${c.credits} paid` : ''}`
      : c.credits > 0 ? `${c.credits} paid ${c.credits === 1 ? label.one : label.many} left (free use comes back on ${resets})` : `Free use for this month used up. It comes back on ${resets}`;
  } else if (c.freeLeft > 0) text = `Your first ${label.one} is free${c.credits ? `, then ${c.credits} paid left` : ''}`;
  else if (c.credits > 0) text = `${c.credits} ${c.credits === 1 ? label.one : label.many} left`;
  else text = tool === 'solver' ? 'Paid tool: buy a run to start' : `Free ${label.one} used: buy more to keep going`;
  const Icon = c.freeLeft > 0 ? Gift : c.credits > 0 ? Ticket : Lock;
  return (
    <p className={`inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 ${className}`}>
      <Icon className="size-3.5" /> {text}
    </p>
  );
};

const runsText = (offer: OfferItem) =>
  (Object.entries(offer.credits) as [ToolKey, number][])
    .map(([tool, n]) => `${n} ${n === 1 ? TOOL_LABELS[tool].one : TOOL_LABELS[tool].many}`)
    .join(' + ');

/** Buy buttons for every offer that gives runs of `tool` (single run, packs, Job-ready pack). */
export const ToolPaywall: React.FC<{ tool: ToolKey; message?: string; onClose?: () => void }> = ({ tool, message, onClose }) => {
  const { user, userProfile } = useAuth();
  const [offers, setOffers] = useState<OfferItem[] | null>(null);
  const [mode, setMode] = useState<string>('test_mode');
  const [error, setError] = useState('');
  const [buying, setBuying] = useState('');

  useEffect(() => {
    if (!isPaymentsEnabled) return;
    paymentsApi.offer()
      .then((o) => { setMode(o.mode); setOffers(o.offers.filter((x) => (x.credits[tool] || 0) > 0)); })
      .catch((err) => setError(err.message));
  }, [tool]);

  // Payments off (live site): nothing to buy, just say the free run is used up and when it comes back.
  if (!isPaymentsEnabled) {
    return (
      <section className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 sm:p-6 text-left">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-amber-100 p-2.5"><Lock className="size-5 text-amber-700" /></span>
          <div className="min-w-0 space-y-1">
            <h2 className="text-lg font-black text-slate-900">You have exhausted the free use for this month</h2>
            <p className="text-sm text-slate-700">{message || `You have used your free ${TOOL_LABELS[tool].one} for this month. It comes back at the start of next month.`}</p>
          </div>
        </div>
        {onClose && <div className="mt-3 flex justify-end"><Button size="sm" variant="ghost" onClick={onClose}>OK</Button></div>}
      </section>
    );
  }

  const buy = async (key: string) => {
    if (!user) return setError('Please sign in first.');
    setError('');
    setBuying(key);
    try {
      // The thanks page reads this to offer "Back to <tool>" (Dodo sets the return URL's query).
      try { sessionStorage.setItem('payment_next', TOOL_LABELS[tool].path); } catch { /* storage blocked */ }
      const { checkoutUrl } = await paymentsApi.startCheckout(key, { name: userProfile?.name || user.displayName || undefined, next: TOOL_LABELS[tool].path });
      window.location.href = checkoutUrl;
    } catch (err: any) {
      setError(err.message);
      setBuying('');
    }
  };

  return (
    <section className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 sm:p-6 space-y-4 text-left">
      <div className="flex items-start gap-3">
        <span className="rounded-xl bg-amber-100 p-2.5"><Lock className="size-5 text-amber-700" /></span>
        <div className="min-w-0 space-y-1">
          <h2 className="text-lg font-black text-slate-900">Get more {TOOL_LABELS[tool].many}</h2>
          <p className="text-sm text-slate-700">{message || `You have used your free ${TOOL_LABELS[tool].one} for this month.`} Each run is one full result; if a run fails, you get it back.</p>
        </div>
      </div>

      {!offers && !error && <Loader2 className="size-5 animate-spin text-amber-700" />}
      {offers && !offers.length && <p className="text-sm text-slate-600">No products are set up for this tool yet. Add its Dodo product id to the server settings (see docs/payments.md).</p>}
      {offers && offers.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-3">
          {offers.map((o) => (
            <div key={o.key} className={`rounded-xl border bg-white p-4 flex flex-col gap-2 ${o.key === 'job_pack' ? 'border-brand-300 ring-1 ring-brand-200' : 'border-slate-200'}`}>
              {o.key === 'job_pack' && <span className="self-start rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-brand-700">All three tools</span>}
              <p className="font-black text-slate-900">{o.name}</p>
              <p className="text-xs text-slate-600 flex-1">{runsText(o)}</p>
              {o.price != null && <p className="text-2xl font-black text-slate-900">{formatPrice(o.price, o.currency)}</p>}
              {o.error && <p className="text-xs text-rose-700">{o.error}</p>}
              <Button variant="brand" size="sm" onClick={() => buy(o.key)} disabled={Boolean(buying) || o.price == null}>
                {buying === o.key ? <Loader2 className="size-4 animate-spin" /> : <CreditCard className="size-4" />} Buy
              </Button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-sm text-rose-700">{error}</p>}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-slate-500">Secure checkout by Dodo Payments{mode !== 'live_mode' ? ' (test mode: pay with card 4242 4242 4242 4242, no real money moves)' : ''}.</p>
        {onClose && <Button size="sm" variant="ghost" onClick={onClose}>Not now</Button>}
      </div>
    </section>
  );
};
