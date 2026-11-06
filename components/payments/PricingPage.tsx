import React, { useEffect, useState } from 'react';
import { ClipboardList, CreditCard, FileText, FlaskConical, Linkedin, Loader2, LogIn, Mic, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { Button } from '../ui/button';
import { TOOL_LABELS, formatPrice, paymentsApi, type Offer, type OfferItem, type ToolKey } from './api';
import { useToolCredits } from './ToolPaywall';

// Everything the site sells: the AI interview sprint and paid runs for the Resume Auditor, LinkedIn
// Optimiser and Assignment Solver. Names, descriptions and prices come from the products in the
// Dodo dashboard, so the page never shows a price Dodo won't charge. Products without an id in the
// server settings are simply not shown (see server/payments/catalog.ts and docs/payments.md).

export const TestModeBanner: React.FC = () => (
  <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 space-y-1">
    <p className="font-black flex items-center gap-2"><FlaskConical className="size-4" /> Test mode: no real money moves</p>
    <p>Pay with card <span className="font-mono font-bold">4242 4242 4242 4242</span> (any name, expiry 06/32, CVV 123), Indian card <span className="font-mono font-bold">4576 2389 1277 1450</span>, or UPI <span className="font-mono font-bold">success@upi</span>. Card <span className="font-mono font-bold">4000 0000 0000 0002</span> shows a declined payment.</p>
  </div>
);

const OfferCard: React.FC<{ offer: OfferItem; buying: string; onBuy: (key: string) => void; signedIn: boolean; loading: boolean }> = ({ offer, buying, onBuy, signedIn, loading }) => {
  const tools = Object.entries(offer.credits) as [ToolKey, number][];
  const Icon = offer.sprints ? Mic : offer.key === 'job_pack' ? Package : tools[0]?.[0] === 'solver' ? ClipboardList : tools[0]?.[0] === 'linkedin' ? Linkedin : FileText;
  return (
    <div className={`rounded-2xl border bg-white p-5 flex flex-col gap-3 ${offer.key === 'job_pack' ? 'border-brand-300 ring-2 ring-brand-100' : 'border-slate-200'}`}>
      <div className="flex items-start gap-3">
        <span className="rounded-xl bg-brand-50 p-2.5"><Icon className="size-5 text-brand-600" /></span>
        <div className="min-w-0">
          {offer.key === 'job_pack' && <p className="text-[10px] font-black uppercase tracking-widest text-brand-700">Best value</p>}
          <h3 className="font-black text-slate-900">{offer.name}</h3>
          {offer.description && <p className="text-sm text-slate-600 mt-1 whitespace-pre-line">{offer.description}</p>}
          {tools.length > 0 && (
            <ul className="text-sm text-slate-700 mt-1">
              {tools.map(([tool, n]) => <li key={tool}>{n} × {TOOL_LABELS[tool].one}</li>)}
            </ul>
          )}
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3">
        <p className="text-2xl font-black text-slate-900">{offer.price != null ? formatPrice(offer.price, offer.currency) : ''}</p>
        <Button variant="brand" size="sm" onClick={() => onBuy(offer.key)} disabled={Boolean(buying) || loading || offer.price == null}>
          {buying === offer.key ? <Loader2 className="size-4 animate-spin" /> : signedIn ? <CreditCard className="size-4" /> : <LogIn className="size-4" />}
          {signedIn ? 'Buy' : 'Sign in to buy'}
        </Button>
      </div>
      {offer.error && <p className="text-xs text-rose-700">{offer.error}</p>}
    </div>
  );
};

const PricingPage: React.FC = () => {
  const { user, userProfile, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [error, setError] = useState('');
  const [buying, setBuying] = useState('');
  const { credits } = useToolCredits();

  useEffect(() => {
    paymentsApi.offer().then(setOffer).catch((err) => setError(err.message));
  }, []);

  const buy = async (key: string) => {
    if (!user) return setAuthOpen(true);
    setError('');
    setBuying(key);
    try {
      try { sessionStorage.removeItem('payment_next'); } catch { /* storage blocked */ }
      const { checkoutUrl } = await paymentsApi.startCheckout(key, { name: userProfile?.name || user.displayName || undefined });
      window.location.href = checkoutUrl;
    } catch (err: any) {
      setError(err.message);
      setBuying('');
    }
  };

  const offers = offer?.offers || [];
  const sprint = offers.filter((o) => o.sprints > 0);
  const toolOffers = offers.filter((o) => !o.sprints);
  const card = (o: OfferItem) => <OfferCard key={o.key} offer={o} buying={buying} onBuy={buy} signedIn={Boolean(user)} loading={loading} />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" redirectTo="/pricing" onSuccess={() => setAuthOpen(false)} />
      <header className="space-y-2">
        <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">Pricing</p>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Pay only for what you use</h1>
        <p className="text-sm text-slate-600 max-w-2xl">Your first Resume Auditor and LinkedIn Optimiser runs are free. After that, buy runs one at a time or in packs. A run that fails is given back.</p>
      </header>

      {offer?.mode !== 'live_mode' && <TestModeBanner />}

      {credits?.signedIn && credits.resume && (
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-black text-slate-900 mb-1">Your runs</p>
          <ul className="grid gap-1 sm:grid-cols-3">
            {(['resume', 'linkedin', 'solver'] as ToolKey[]).map((tool) => {
              const c = credits[tool]!;
              return <li key={tool}><span className="font-bold">{TOOL_LABELS[tool].name}:</span> {c.credits} paid{c.freeLeft ? ` + ${c.freeLeft} free` : ''}</li>;
            })}
          </ul>
          {Boolean(credits.sprints) && <p className="mt-1"><span className="font-bold">Interview sprints:</span> {credits.sprints}</p>}
        </section>
      )}

      {!offer && !error && <div className="py-6 text-center"><Loader2 className="size-6 animate-spin mx-auto text-brand-600" /></div>}
      {offer && !offer.configured && (
        <p className="text-sm text-slate-600">Payments are not set up yet. Add DODO_PAYMENTS_API_KEY and the product ids to the server settings (see docs/payments.md).</p>
      )}
      {offer?.error && <p className="text-sm text-rose-700">{offer.error}</p>}

      {toolOffers.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">Career tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{toolOffers.map(card)}</div>
        </section>
      )}
      {sprint.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">Practise with Priya</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{sprint.map(card)}</div>
        </section>
      )}
      {offers.length > 0 && <p className="text-xs text-slate-500">Secure checkout by Dodo Payments. Your receipt is emailed to {user?.email || 'your account email'}.</p>}
      {error && <p className="text-sm text-rose-700">{error}</p>}
    </div>
  );
};

export default PricingPage;
