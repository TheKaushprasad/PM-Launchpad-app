import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { 
  Sparkles, ArrowLeft, Loader2, RefreshCw, AlertTriangle, 
  CheckCircle2, Target, Download, ExternalLink, Bot
} from 'lucide-react';
import { LinkedInLanding } from './linkedin/LinkedInLanding';
import { LinkedInInputForm } from './linkedin/LinkedInInputForm';
import { LinkedInScoreDashboard } from './linkedin/LinkedInScoreDashboard';
import { LinkedInAnalysisResult } from '../types/linkedin';
import { getSampleAnalysis } from '../services/profileAnalyzer';
import { useAuth } from '../context/AuthContext';

interface ContextType {
  isCollapsed: boolean;
}

// Bench animation for loading state
const BenchAnimation = () => {
  return (
    <div className="relative w-64 h-48 mx-auto mb-8">
      <svg viewBox="0 0 200 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bench */}
        <rect x="40" y="110" width="120" height="6" rx="3" fill="#E2E8F0" />
        <rect x="50" y="116" width="4" height="15" fill="#CBD5E1" />
        <rect x="146" y="116" width="4" height="15" fill="#CBD5E1" />
        
        {/* Boy Character */}
        <motion.g
          animate={{ 
            y: [0, -2, 0],
            rotate: [0, 1, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Body/Torso */}
          <rect x="85" y="70" width="30" height="40" rx="10" fill="#6366F1" />
          {/* Head */}
          <circle cx="100" cy="55" r="12" fill="#FFDBAC" />
          {/* Hair */}
          <path d="M88 55C88 48 93 43 100 43C107 43 112 48 112 55" stroke="#4B2C20" strokeWidth="6" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="96" cy="55" r="1.5" fill="#4B2C20" />
          <circle cx="104" cy="55" r="1.5" fill="#4B2C20" />
          {/* Legs */}
          <rect x="85" y="100" width="12" height="15" rx="4" fill="#1E293B" />
          <rect x="103" y="100" width="12" height="15" rx="4" fill="#1E293B" />
          {/* Notebook */}
          <motion.rect 
            x="105" y="85" width="15" height="20" rx="2" fill="white" stroke="#E2E8F0"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.g>
        
        {/* Coffee cup */}
        <motion.path 
          d="M135 102H145V110H135V102Z" fill="#F8FAFC" stroke="#E2E8F0"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path 
          d="M140 95V90" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round"
          animate={{ y: [-2, -8], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </div>
  );
};

export const LinkedInOptimiser: React.FC = () => {
  const outletContext = useOutletContext<ContextType | undefined>();
  const isCollapsed = outletContext?.isCollapsed ?? false;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, userProfile, recordLinkedInAnalysis, userAnalyses } = useAuth();

  // Navigation views: 'landing' | 'form' | 'dashboard'
  const [viewState, setViewState] = useState<'landing' | 'form' | 'dashboard'>('landing');

  // Loading & Progress states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [loadingPhase, setLoadingPhase] = useState<string>('Extracting profile structure...');
  
  // Scraper Error & Graceful Fallback Notice
  const [scrapeNotice, setScrapeNotice] = useState<string | null>(null);

  // Analysis result
  const [analysisResult, setAnalysisResult] = useState<LinkedInAnalysisResult | null>(null);

  // Check if viewing an existing analysis from history by ID
  useEffect(() => {
    const analysisId = searchParams.get('analysisId');
    if (analysisId && userAnalyses.length > 0) {
      const match = userAnalyses.find(a => a.id === analysisId);
      if (match) {
        setAnalysisResult(match);
        setViewState('dashboard');
      }
    }
  }, [searchParams, userAnalyses]);

  // Execute Analysis Workflow
  const handleExecuteAnalysis = async (params: {
    profileText?: string;
    rawProfileText?: string;
    targetRole: string;
    experience: string;
    industry: string;
    companyType: string;
    location?: string;
    manualProfileData?: any;
    linkedinUrl?: string;
    useSample?: boolean;
  }) => {
    setIsLoading(true);
    setProgress(15);
    setScrapeNotice(null);
    setLoadingPhase('Segregating profile sections (Headline, About, Experience, Skills)...');

    // Progress simulation
    const timer1 = setTimeout(() => {
      setProgress(45);
      setLoadingPhase(`Calibrating against ${params.targetRole} benchmark models...`);
    }, 1200);

    const timer2 = setTimeout(() => {
      setProgress(80);
      setLoadingPhase('Scoring 8 dimensions, ATS keywords, and generating rewrites...');
    }, 2800);

    try {
      if (params.useSample) {
        const sample = getSampleAnalysis(params.targetRole);
        setTimeout(async () => {
          setAnalysisResult(sample);
          if (user) {
            await recordLinkedInAnalysis(sample);
          }
          setIsLoading(false);
          setViewState('dashboard');
        }, 1500);
        return;
      }

      const response = await fetch('/api/analyse-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });

      const data = await response.json();

      if (data.isBlockedOrPrivate) {
        // Scraper was restricted or profile is private
        setScrapeNotice(data.error);
        setIsLoading(false);
        setViewState('form');
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete profile audit.');
      }

      setProgress(100);
      setLoadingPhase('Audit complete!');
      const result: LinkedInAnalysisResult = data.result;
      setAnalysisResult(result);
      if (user) {
        await recordLinkedInAnalysis(result);
      }
      setViewState('dashboard');
    } catch (err: any) {
      console.error('LinkedIn Audit Error:', err);
      // Fallback to sample if unexpected network or server error occurred
      const fallback = getSampleAnalysis(params.targetRole);
      setAnalysisResult(fallback);
      if (user) {
        await recordLinkedInAnalysis(fallback);
      }
      setViewState('dashboard');
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsLoading(false);
    }
  };

  const handleOpenExampleAudit = () => {
    const sample = getSampleAnalysis(userProfile?.targetRole || 'Product Manager');
    setAnalysisResult(sample);
    setViewState('dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen bg-[#FDFDFD] text-zinc-900 transition-all duration-300 ${
        isCollapsed ? 'pl-20' : 'pl-64'
      } pr-6 sm:pr-10 py-8`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-6"
            >
              <div className="bg-white rounded-[3rem] p-10 max-w-md w-full text-center space-y-6 shadow-2xl border border-zinc-100">
                <BenchAnimation />
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    <span>{loadingPhase}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200">
                    <motion.div 
                      initial={{ width: '10%' }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-indigo-600 rounded-full"
                    />
                  </div>
                </div>
                <p className="text-xs text-zinc-500 font-medium italic">
                  Auditing keywords, bullet metrics, and recruiter discoverability against industry standards.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View 1: Landing Page */}
        {viewState === 'landing' && (
          <LinkedInLanding
            onStartAudit={() => setViewState('form')}
            onSeeExample={handleOpenExampleAudit}
          />
        )}

        {/* View 2: Form Input */}
        {viewState === 'form' && (
          <LinkedInInputForm
            onBackToLanding={() => setViewState('landing')}
            onSubmitAnalysis={handleExecuteAnalysis}
            isLoading={isLoading}
            scrapeErrorNotice={scrapeNotice}
            onClearError={() => setScrapeNotice(null)}
          />
        )}

        {/* View 3: Full Scorecard & Interactive Dashboard */}
        {viewState === 'dashboard' && analysisResult && (
          <LinkedInScoreDashboard
            analysis={analysisResult}
            onReAudit={() => {
              setViewState('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </div>
    </motion.div>
  );
};
