import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { AuthLayout } from './AuthLayout';

export const Login: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user?.isAuthenticated) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/');
    } catch (error: any) {
      console.error(error);
      if (error.message.includes('Email not confirmed')) {
          setError('Please verify your email address before logging in.');
      } else if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password.');
      } else {
          setError(error.message || 'Failed to sign in.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
        title="Welcome Back" 
        subtitle="Enter your credentials to access your dashboard."
    >
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
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                        type="password" 
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                    />
                </div>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                    {error}
                </div>
            )}

            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
                {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>

        <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
                Don't have an account?{' '}
                <Link to="/signup" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                    Sign up
                </Link>
            </p>
        </div>
    </AuthLayout>
  );
};