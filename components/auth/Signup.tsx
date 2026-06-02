import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Loader2, ArrowRight, User, Briefcase } from 'lucide-react';
import { AuthLayout } from './AuthLayout';

export const Signup: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [profession, setProfession] = useState<'Student' | 'Working Professional'>('Student');
  const [isAspiringPM, setIsAspiringPM] = useState<boolean>(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    
    if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
    }

    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await signup({
        email,
        password,
        fullName,
        profession,
        isAspiringPM,
      });
      
      // Auto login successful, navigate to Dashboard or path they came from
      navigate('/dashboard');
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
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
                <label htmlFor="fullName" className="block text-sm font-semibold text-zinc-700">Full Name</label>
                <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-5 h-5 text-zinc-400" />
                    <input 
                        type="text" 
                        id="fullName"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3.5 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-zinc-800 placeholder:text-zinc-400 text-sm font-medium"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label htmlFor="profession" className="block text-sm font-semibold text-zinc-700">Profession</label>
                <div className="relative">
                    <Briefcase className="absolute left-3.5 top-3.5 w-5 h-5 text-zinc-400 pointer-events-none" />
                    <select
                        id="profession"
                        required
                        value={profession}
                        onChange={(e) => setProfession(e.target.value as 'Student' | 'Working Professional')}
                        className="w-full pl-10 pr-10 py-3.5 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-zinc-800 appearance-none text-sm font-semibold cursor-pointer"
                    >
                        <option value="Student">Student</option>
                        <option value="Working Professional">Working Professional</option>
                    </select>
                    <div className="absolute right-4 top-4.5 pointer-events-none text-zinc-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-200/60 my-2">
                <div>
                    <span className="block text-sm font-semibold text-zinc-700">Are you an aspiring PM?</span>
                    <span className="text-[11px] text-zinc-500 font-medium">To personalize course templates</span>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setIsAspiringPM(true)}
                        className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all leading-none ${isAspiringPM ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'}`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsAspiringPM(false)}
                        className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all leading-none ${!isAspiringPM ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'}`}
                    >
                        No
                    </button>
                </div>
            </div>

            <div className="space-y-1.5">
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
                        className="w-full pl-10 pr-4 py-3.5 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-zinc-800 placeholder:text-zinc-400 text-sm font-medium"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
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
                        className="w-full pl-10 pr-4 py-3.5 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-zinc-800 placeholder:text-zinc-400 text-sm font-medium"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-zinc-700">Confirm Password</label>
                <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-zinc-400" />
                    <input 
                        type="password" 
                        id="confirmPassword"
                        required
                        minLength={6}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat password"
                        className="w-full pl-10 pr-4 py-3.5 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-zinc-800 placeholder:text-zinc-400 text-sm font-medium"
                    />
                </div>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 font-semibold my-2">
                    {error}
                </div>
            )}

            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group !mt-6"
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

        <div className="mt-6 text-center">
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