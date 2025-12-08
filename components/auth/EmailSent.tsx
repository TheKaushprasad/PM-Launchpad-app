import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, ArrowLeft, ExternalLink } from 'lucide-react';

export const EmailSent: React.FC = () => {
  const { tempEmail } = useAuth();
  const navigate = useNavigate();
  const [simulatedLink, setSimulatedLink] = useState<string | null>(null);

  useEffect(() => {
    if (!tempEmail) {
      navigate('/login');
      return;
    }

    // SIMULATION: In a real app, the email goes to the inbox. 
    // Here, we fetch the pending token from localStorage to display the "Simulated Link" 
    // so the user can actually test the flow.
    const pendingTokens = JSON.parse(localStorage.getItem('pm_launchpad_pending_tokens') || '{}');
    const token = Object.keys(pendingTokens).find(key => pendingTokens[key].email === tempEmail);
    
    if (token) {
        setSimulatedLink(`${window.location.origin}/#/confirm?token=${token}`);
    }

  }, [tempEmail, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 md:p-12 w-full max-w-lg shadow-xl border border-slate-100 text-center relative z-10"
        >
             <button 
                onClick={() => navigate('/login')}
                className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors"
                title="Back to Login"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Mail className="w-10 h-10 text-green-600" />
                <div className="absolute top-0 right-0 bg-green-500 rounded-full p-1 border-4 border-white">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-4">Check Your Inbox</h1>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                We've sent a magic link to <br/>
                <span className="font-bold text-slate-800">{tempEmail}</span>
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
                <p className="text-sm text-slate-600 mb-2">Click the link in the email to sign in.</p>
                <p className="text-xs text-slate-400">Can't find it? Check your spam folder.</p>
            </div>

            <button 
                onClick={() => navigate('/login')} 
                className="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-colors"
            >
                Use a different email address
            </button>

            {/* DEV MODE SIMULATION HELPER */}
            {simulatedLink && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-10 pt-8 border-t border-dashed border-slate-300"
                >
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Dev Mode: Simulated Email</p>
                    <a 
                        href={simulatedLink} 
                        className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition-all shadow-lg"
                    >
                        Click to Confirm Account <ExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>
            )}

        </motion.div>
    </div>
  );
};