import React, { useEffect, useState } from 'react';
import { CreditCard, FlaskConical, Loader2, LogIn, Mic } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { Button } from '../ui/button';
import { formatPrice, paymentsApi, type Offer } from './api';

// One product for now: the AI interview sprint. Name, description and price come from the product
// in the Dodo dashboard, so the page never shows a price Dodo won't charge.

export const TestModeBanner: React.FC = () => (
  <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 space-y-1">
    <p className="font-black flex items-center gap-2"><FlaskConical className="size-4" /> Test mode: no real money moves</p>
    <p>Pay with card <span className="font-mono font-bold">4242 4242 4242 4242</span> (any name, expiry 06/32, CVV 123), Indian card <span className="font-mono font-bold">4576 2389 1277 1450</span>, or UPI <span className="font-mono font-bold">success@upi</span>. Card <span className="font-mono font-bold">4000 0000 0000 0002</span> shows a declined payment.</p>
  </div>
);

const PricingPage: React.FC = () => {
  const { user, userProfile, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [error, setError] = useState('');
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    paymentsApi.offer().then(setOffer).catch((err) => setError(err.message));
  }, []);

  const buy = async () => {
    if (!user) return setAuthOpen(true);
    setError('');
    setStarting(true);
    try {
      const { checkoutUrl } = await paymentsApi.startCheckout(userProfile?.name || user.displayName || undefined);
      window.location.href = checkoutUrl;
    } catch (err: any) {
      setError(err.message);
      setStarting(false);
    }
  };

  const product = offer?.product;
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" redirectTo="/pricing" onSuccess={() => setAuthOpen(false)} />
      <header className="space-y-2">
        <p className="text-[11px] font-black uppercase tracking-widest text-brand-600">Pricing</p>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Practise with Priya</h1>
      </header>

      {offer?.mode !== 'live_mode' && <TestModeBanner />}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
        {!offer && !error && <div className="py-6 text-center"><Loader2 className="size-6 animate-spin mx-auto text-brand-600" /></div>}
        {offer && !offer.configured && (
          <p className="text-sm text-slate-600">Payments are not set up yet. Add DODO_PAYMENTS_API_KEY and DODO_SPRINT_PRODUCT_ID to the server settings (see docs/payments.md).</p>
        )}
        {offer?.error && <p className="text-sm text-rose-700">{offer.error}</p>}
        {product && (
          <>
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-brand-50 p-2.5"><Mic className="size-5 text-brand-600" /></span>
              <div className="min-w-0">
                <h2 className="text-lg font-black text-slate-900">{product.name}</h2>
                {product.description && <p className="text-sm text-slate-600 mt-1 whitespace-pre-line">{product.description}</p>}
              </div>
            </div>
            {product.price != null && <p className="text-3xl font-black text-slate-900">{formatPrice(product.price, product.currency)}</p>}
            <Button variant="brand" size="cta" onClick={buy} disabled={starting || loading} className="w-full sm:w-auto">
              {starting ? <Loader2 className="size-4 animate-spin" /> : user ? <CreditCard className="size-4" /> : <LogIn className="size-4" />}
              {user ? 'Buy now' : 'Sign in to buy'}
            </Button>
            <p className="text-xs text-slate-500">Secure checkout by Dodo Payments. Your receipt is emailed to {user?.email || 'your account email'}.</p>
          </>
        )}
        {error && <p className="text-sm text-rose-700">{error}</p>}
      </section>
    </div>
  );
};

export default PricingPage;
