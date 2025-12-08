import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Loader2, ArrowLeft, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { sendMagicLink } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      // Use Magic Link flow
      await sendMagicLink(email);
      navigate('/email-sent');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 md:p-10 w-full max-w-md shadow-2xl relative z-10"
        >
             <button 
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors"
                title="Back to Home"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200 mx-auto mb-4">PM</div>
                <h1 className="text-2xl font-bold text-slate-900">Welcome</h1>
                <p className="text-slate-500 mt-2">Enter your email to receive a secure login link.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                        <input 
                            type="email" 
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Send Magic Link <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-xs text-slate-400">
                    We'll email you a magic link for a password-free sign in.
                </p>
            </div>
        </motion.div>
    </div>
  );
};