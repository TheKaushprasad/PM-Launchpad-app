import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

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
      
      // If a session exists, the user is logged in (auto-confirm enabled)
      if (data && data.session) {
        navigate('/');
      } else {
        // If no session, email confirmation is likely required
        alert('Account created successfully! Please check your email to confirm your account before logging in.');
        navigate('/login');
      }
    } catch (error: any) {
      console.error(error);
      setError(error.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
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
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors"
                title="Back to Home"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200 mx-auto mb-4">PM</div>
                <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
                <p className="text-slate-500 mt-2">Start your product management journey today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 placeholder:text-slate-400"
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
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min 6 characters"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700">Confirm Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                        <input 
                            type="password" 
                            id="confirmPassword"
                            required
                            minLength={6}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repeat password"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 placeholder:text-slate-400"
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
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
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
                <p className="text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </motion.div>
    </div>
  );
};