import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, X, BookOpen, Bookmark, FileEdit, CheckCircle2, Video } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from './AuthModal';

export const SaveDetailsModal: React.FC = () => {
  const { 
    showSaveDetailsModal, 
    closeSaveDetailsPopup, 
    saveDetailsActionType,
    savePendingGuestData,
    user 
  } = useAuth();

  const [authModalOpen, setAuthModalOpen] = useState(false);

  // If user is already logged in and auth modal is closed, do not show
  if (user && !authModalOpen) {
    return null;
  }

  // If both modals are closed, nothing to render
  if (!showSaveDetailsModal && !authModalOpen) {
    return null;
  }

  const handleOpenLogin = () => {
    // Save current guest progress so it syncs to user account upon login
    savePendingGuestData();
    closeSaveDetailsPopup();
    setAuthModalOpen(true);
  };

  const getActionDescription = () => {
    switch (saveDetailsActionType) {
      case 'notes':
        return 'You added personal study notes, but they will not be stored in your account because you are not logged in.';
      case 'bookmark':
        return 'You bookmarked this lesson, but your bookmarks will not be stored in your account because you are not logged in.';
      case 'video':
        return 'You marked the video as complete, but your video completion will not be stored in your account because you are not logged in.';
      case 'complete':
        return 'You marked this lesson as complete, but your launchpad progress will not be stored in your account because you are not logged in.';
      default:
        return 'Your progress, notes, and bookmarks will not be stored in your account because you are not logged in.';
    }
  };

  const getActionIcon = () => {
    switch (saveDetailsActionType) {
      case 'notes':
        return <FileEdit className="w-5 h-5 text-indigo-600" />;
      case 'bookmark':
        return <Bookmark className="w-5 h-5 text-amber-600 fill-amber-100" />;
      case 'video':
        return <Video className="w-5 h-5 text-red-600" />;
      case 'complete':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSaveDetailsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-zinc-200/90 shadow-2xl relative overflow-hidden"
            >
              {/* Top Accent Gradient */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-50/80 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                {/* Header with Icon and Dismiss */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-xs">
                    {getActionIcon()}
                  </div>
                  <button
                    type="button"
                    onClick={closeSaveDetailsPopup}
                    className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
                    title="Dismiss"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Title & Message */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-black uppercase tracking-wider border border-amber-200/80">
                    <span>Guest Mode</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight leading-snug">
                    Log in to save the details
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                    {getActionDescription()}
                  </p>
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 text-zinc-500 text-[11px] leading-relaxed">
                    You can freely explore Day 0 to Day 7. To preserve your notes, bookmarks, and milestone progress across devices, please log in or sign up.
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleOpenLogin}
                    className="flex-1 py-3 px-4 bg-[#4338CA] hover:bg-[#3730A3] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Log In to Save</span>
                  </button>
                  <button
                    type="button"
                    onClick={closeSaveDetailsPopup}
                    className="py-3 px-4 bg-zinc-100 hover:bg-zinc-200 active:scale-95 text-zinc-700 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                  >
                    Continue as Guest
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
      />
    </>
  );
};
