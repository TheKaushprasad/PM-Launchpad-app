import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // OTP is no longer used, redirect to login
    const timer = setTimeout(() => {
        navigate('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900">Redirecting...</h2>
            <p className="text-slate-500 mt-2">OTP authentication is disabled. Redirecting to login.</p>
        </div>
    </div>
  );
};