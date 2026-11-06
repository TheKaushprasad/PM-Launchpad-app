import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Clock, Loader2, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { TOOL_LABELS, formatPrice, paymentsApi, type PaymentStatus, type ToolKey } from './api';
import { TestModeBanner } from './PricingPage';

// Dodo sends the buyer back here with ?payment_id=…&status=…. The status in the URL is only a hint;
// this page waits for the server, which hears about the payment from Dodo's signed webhook.

const POLL_MS = 2500;
const MAX_POLLS = 24; // about a minute

const PaymentThanks: React.FC = () => {
  const { user, loading } = useAuth();
  const [params] = useSearchParams();
  const paymentId = params.get('payment_id') || '';
  const urlStatus = params.get('status') || '';
  // Where the buyer came from: a tool page sets this before sending them to checkout.
  const [next] = useState(() => { try { return sessionStorage.getItem('payment_next') || ''; } catch { return ''; } });
  const [result, setResult] = useState<PaymentStatus | null>(null);
  const [error, setError] = useState('');
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!user || !paymentId) return;
    let polls = 0;
    let stop = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = async () => {
      try {
        const s = await paymentsApi.status(paymentId);
        if (stop) return;
        setResult(s);
        if (s.status === 'succeeded' || s.status === 'failed' || s.status === 'cancelled') return;
      } catch (err: any) {
        if (!stop) setError(err.message);
        return;
      }
      if (++polls >= MAX_POLLS) return setTimedOut(true);
      timer = setTimeout(tick, POLL_MS);
    };
    tick();
    return () => { stop = true; clearTimeout(timer); };
  }, [user?.uid, paymentId]);

  const status = result?.status || 'waiting';
  const isSprint = !result?.product || result.product === 'interview_sprint';
  const runsLeft = result
    ? (['resume', 'linkedin', 'solver'] as ToolKey[])
      .filter((t) => result[t]?.credits)
      .map((t) => `${result[t].credits} ${result[t].credits === 1 ? TOOL_LABELS[t].one : TOOL_LABELS[t].many}`)
      .join(', ')
    : '';
  const nextTool = (Object.keys(TOOL_LABELS) as ToolKey[]).find((t) => TOOL_LABELS[t].path === next);
  const backTo = nextTool
    ? { path: next, label: `Back to ${TOOL_LABELS[nextTool].name}` }
    : isSprint ? { path: '/interview-studio', label: 'Go to the AI interview' } : { path: '/tools', label: 'Go to the tools' };
  let body: React.ReactNode;
  if (!paymentId) {
    body = <p className="text-sm text-slate-600">No payment to show. <Link to="/pricing" className="font-bold text-brand-700 underline">Back to pricing</Link></p>;
  } else if (!user) {
    body = loading ? <Loader2 className="size-6 animate-spin mx-auto text-brand-600" /> : <p className="text-sm text-slate-600">Sign in with the account you paid from to see this payment.</p>;
  } else if (error) {
    body = <p className="text-sm text-rose-700">{error}</p>;
  } else if (status === 'succeeded') {
    body = (
      <div className="space-y-3">
        <p className="flex items-center gap-2 text-lg font-black text-emerald-700"><CheckCircle2 className="size-6" /> Payment received</p>
        <p className="text-sm text-slate-700">
          {result?.amount != null && <>You paid {formatPrice(result.amount, result.currency)}. </>}
          {isSprint
            ? <>You now have {result?.sprints} interview sprint{result?.sprints === 1 ? '' : 's'}</>
            : <>You now have {runsLeft || 'your new runs'}</>}
          {result?.mode === 'test_mode' ? ' (test mode)' : ''}.
        </p>
        <Button asChild variant="brand"><Link to={backTo.path}>{backTo.label}</Link></Button>
      </div>
    );
  } else if (status === 'failed' || status === 'cancelled') {
    body = (
      <div className="space-y-3">
        <p className="flex items-center gap-2 text-lg font-black text-rose-700"><XCircle className="size-6" /> Payment {status}</p>
        <p className="text-sm text-slate-700">No money was taken. You can try again with another card or UPI.</p>
        <Button asChild variant="brand"><Link to="/pricing">Try again</Link></Button>
      </div>
    );
  } else {
    body = (
      <div className="space-y-2">
        <p className="flex items-center gap-2 text-lg font-black text-slate-900">
          {timedOut ? <Clock className="size-6 text-amber-600" /> : <Loader2 className="size-6 animate-spin text-brand-600" />}
          {timedOut ? 'Still confirming your payment' : 'Confirming your payment…'}
        </p>
        <p className="text-sm text-slate-600">
          {timedOut
            ? 'This is taking longer than usual. You will get an email receipt from Dodo Payments once it goes through; refresh this page later to see it here.'
            : urlStatus === 'succeeded' ? 'Your bank approved it. Waiting for the confirmation from Dodo Payments.' : 'This usually takes a few seconds.'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Thank you</h1>
      {result?.mode !== 'live_mode' && <TestModeBanner />}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">{body}</section>
    </div>
  );
};

export default PaymentThanks;
