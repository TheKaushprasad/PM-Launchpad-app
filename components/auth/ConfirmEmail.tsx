import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ConfirmEmail: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If Supabase has established the session (via onAuthStateChange),
    // user will be truthy. We then redirect to home or profile setup.
    if (user) {
        if (!user.profile) {
            navigate('/profile-setup');
        } else {
            navigate('/');
        }
    } else {
        // If no user yet, Supabase might be processing the hash fragment
        // We just wait. If it fails or takes too long, we could add a timeout here.
        const timer = setTimeout(() => {
            // Optional: Handle timeout or let user manually go back
        }, 5000);
        return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-xl border border-slate-100 text-center"
      >
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Verifying...</h2>
          <p className="text-slate-500 mt-2 text-sm">Finishing up your secure login.</p>
        </div>
      </motion.div>
    </div>
  );
};