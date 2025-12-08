import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { KeyRound, ArrowRight, Loader2, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { verifyOtp, resendOtp, tempEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tempEmail) {
      navigate('/login');
    }
  }, [tempEmail, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
        setError("Please enter a 6-digit code");
        return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const isValid = await verifyOtp(otp);
      
      if (isValid) {
        // Successful verification. Check if profile is complete.
        // We use direct supabase call here for speed before context updates
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
             const { data: profile } = await supabase
                .from('profiles')
                .select('full_name') // Check for a required field
                .eq('id', user.id)
                .single();
             
             // If profile exists AND has a name, go to dashboard. Otherwise Setup.
             if (profile && profile.full_name) {
                 navigate('/');
             } else {
                 navigate('/profile-setup');
             }
        }
      } else {
        setError('Invalid code. Please check your email and try again.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError('');
    try {
        await resendOtp();
        alert(`New code sent to ${tempEmail}`);
    } catch (err) {
        setError('Failed to resend code.');
    } finally {
        setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/3"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] translate-y-1/3 translate-x-1/3"></div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 md:p-10 w-full max-w-md shadow-2xl relative z-10"
        >
             <button 
                onClick={() => navigate('/login')}
                className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors"
                title="Back to Login"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <KeyRound className="w-6 h-6 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Verify Email</h1>
                <p className="text-slate-500 mt-2 text-sm">
                    Enter the code sent to <span className="font-semibold text-slate-700">{tempEmail}</span>.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="otp" className="block text-sm font-semibold text-slate-700">One-Time Password</label>
                    <input 
                        type="text" 
                        id="otp"
                        value={otp}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 6) setOtp(val);
                        }}
                        placeholder="000000"
                        className="w-full text-center text-3xl tracking-[0.5em] font-mono py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 placeholder:text-slate-300"
                        autoComplete="one-time-code"
                        autoFocus
                    />
                    {error && <p className="text-red-500 text-xs font-medium text-center bg-red-50 p-2 rounded">{error}</p>}
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 flex gap-2">
                   <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                   <p className="text-xs text-yellow-800 leading-tight">
                      <strong>Tip:</strong> If you don't see the code in the email, check your Supabase Email Template settings to ensure <code>{`{{ .Token }}`}</code> is included.
                   </p>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting || otp.length < 6}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Verify & Continue <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 text-center">
                <button 
                    type="button" 
                    onClick={handleResend}
                    disabled={isResending}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                >
                    {isResending ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                    Resend Code
                </button>
            </div>
        </motion.div>
    </div>
  );
};