import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2, XCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ConfirmEmail: React.FC = () => {
  const { verifyMagicLink } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const verify = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        return;
      }

      try {
        const isValid = await verifyMagicLink(token);
        if (isValid) {
          setStatus('success');
          // Wait briefly to show success state before redirecting
          setTimeout(() => {
             // Logic to determine where to go next based on if profile exists is handled in HomeRoute
             // But we can double check here or just send to home which will redirect to setup if needed
             navigate('/');
          }, 1500);
        } else {
          setStatus('error');
        }
      } catch (e) {
        setStatus('error');
      }
    };

    verify();
  }, [location, verifyMagicLink, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-xl border border-slate-100 text-center"
      >
        {status === 'verifying' && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-slate-800">Verifying Link...</h2>
            <p className="text-slate-500 mt-2 text-sm">Please wait while we secure your session.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                 <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Email Verified!</h2>
            <p className="text-slate-500 mt-2 text-sm">Redirecting you to the app...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                 <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Invalid Link</h2>
            <p className="text-slate-500 mt-2 text-sm mb-6">This link has expired or is invalid.</p>
            <button 
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
            >
                Back to Login
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};