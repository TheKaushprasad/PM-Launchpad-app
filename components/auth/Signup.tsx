import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { AuthLayout } from './AuthLayout';

export const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const data = await signup(email, password);
      
      // If Supabase returns a user but no session, email verification is required
      if (data?.user && !data?.session) {
          navigate('/email-sent', { state: { email } });
      } else {
          // Auto login successful (Email verification disabled or implicit)
          navigate('/');
      }
    } catch (error: any) {
      console.error(error);
      setError(error.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
        title="Create Account" 
        subtitle="Start your product management journey today."
    >
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-zinc-700">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-zinc-400" />
                    <input 
                        type="email" 
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-zinc-800 placeholder:text-zinc-400"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-zinc-700">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-zinc-400" />
                    <input 
                        type="password" 
                        id="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-zinc-800 placeholder:text-zinc-400"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-zinc-700">Confirm Password</label>
                <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-zinc-400" />
                    <input 
                        type="password" 
                        id="confirmPassword"
                        required
                        minLength={6}
                        value={confirmPassword}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Repeat password"
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-zinc-800 placeholder:text-zinc-400"
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
                        Sign Up <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>

        <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                    Sign in
                </Link>
            </p>
        </div>
    </AuthLayout>
  );
};