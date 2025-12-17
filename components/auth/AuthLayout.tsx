import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  backLink?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, backLink = '/' }) => {
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
             <Link 
                to={backLink}
                className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors"
                title="Back"
            >
                <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200 mx-auto mb-4">PM</div>
                <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                <p className="text-slate-500 mt-2">{subtitle}</p>
            </div>

            {children}
        </motion.div>
    </div>
  );
};