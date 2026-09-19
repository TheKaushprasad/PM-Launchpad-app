import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, Mail, Briefcase, GraduationCap, 
  Globe, Target, CheckCircle2, AlertTriangle, 
  Trash2, ShieldCheck, Save, Loader2, KeyRound,
  Sparkles, ChevronDown, Compass
} from 'lucide-react';
import { useAuth, UserType, getFriendlyAuthErrorMessage } from '../context/AuthContext';

const TARGET_ROLES = [
  'Product Manager',
  'Associate Product Manager',
  'Software Engineer',
  'Data Analyst',
  'Product Designer',
  'Marketing',
  'Customer Success',
  'Business Analyst',
  'Other'
];

const INDUSTRIES = [
  'SaaS',
  'FinTech',
  'AI/ML',
  'E-commerce',
  'EdTech',
  'Healthcare',
  'Gaming',
  'Other'
];

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, userProfile, updateUserProfileData, deleteAccount, resetPassword } = useAuth();

  // Personal
  const [name, setName] = useState(userProfile?.name || userProfile?.displayName || user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(userProfile?.photoURL || user?.photoURL || '');

  // User type
  const [userType, setUserType] = useState<UserType>(
    userProfile?.userType || 'college_student'
  );

  // Student specific
  const [collegeName, setCollegeName] = useState(userProfile?.education?.collegeName || userProfile?.collegeName || '');
  const [degree, setDegree] = useState(userProfile?.education?.degree || userProfile?.degree || '');
  const [passingOutYear, setPassingOutYear] = useState(
    userProfile?.education?.passingOutYear?.toString() || userProfile?.graduationYear?.toString() || '2026'
  );

  // Professional specific
  const [companyName, setCompanyName] = useState(userProfile?.professional?.companyName || userProfile?.companyName || '');
  const [designation, setDesignation] = useState(userProfile?.professional?.designation || userProfile?.designation || '');
  const [yearsOfExperience, setYearsOfExperience] = useState(
    userProfile?.professional?.yearsOfExperience?.toString() || userProfile?.experienceYears?.toString() || '1-3 years'
  );

  // Career
  const initialTargetRole = userProfile?.career?.targetRole || userProfile?.targetRole || 'Product Manager';
  const isKnownRole = TARGET_ROLES.includes(initialTargetRole);
  const [targetRole, setTargetRole] = useState(isKnownRole ? initialTargetRole : 'Other');
  const [customRole, setCustomRole] = useState(isKnownRole ? '' : initialTargetRole);

  const initialIndustry = userProfile?.career?.industry || userProfile?.industry || 'SaaS';
  const isKnownIndustry = INDUSTRIES.includes(initialIndustry);
  const [industry, setIndustry] = useState(isKnownIndustry ? initialIndustry : 'Other');
  const [customIndustry, setCustomIndustry] = useState(isKnownIndustry ? '' : initialIndustry);

  // LinkedIn
  const [linkedinUrl, setLinkedinUrl] = useState(userProfile?.linkedinUrl || '');

  // Synchronize initial values when userProfile finishes loading from cloud
  const initializedRef = useRef(false);
  useEffect(() => {
    if (userProfile && !initializedRef.current) {
      initializedRef.current = true;
      if (userProfile.name || userProfile.displayName) {
        setName(userProfile.name || userProfile.displayName || '');
      }
      if (userProfile.photoURL) {
        setPhotoURL(userProfile.photoURL);
      }
      if (userProfile.userType) {
        setUserType(userProfile.userType);
      }
      if (userProfile.collegeName || userProfile.education?.collegeName) {
        setCollegeName(userProfile.collegeName || userProfile.education?.collegeName || '');
      }
      if (userProfile.degree || userProfile.education?.degree) {
        setDegree(userProfile.degree || userProfile.education?.degree || '');
      }
      if (userProfile.graduationYear || userProfile.education?.passingOutYear) {
        setPassingOutYear((userProfile.graduationYear || userProfile.education?.passingOutYear || '2026').toString());
      }
      if (userProfile.companyName || userProfile.professional?.companyName) {
        setCompanyName(userProfile.companyName || userProfile.professional?.companyName || '');
      }
      if (userProfile.designation || userProfile.professional?.designation) {
        setDesignation(userProfile.designation || userProfile.professional?.designation || '');
      }
      if (userProfile.experienceYears || userProfile.professional?.yearsOfExperience) {
        setYearsOfExperience((userProfile.experienceYears || userProfile.professional?.yearsOfExperience || '1-3 years').toString());
      }
      const role = userProfile.career?.targetRole || userProfile.targetRole;
      if (role) {
        const known = TARGET_ROLES.includes(role);
        setTargetRole(known ? role : 'Other');
        setCustomRole(known ? '' : role);
      }
      const ind = userProfile.career?.industry || userProfile.industry;
      if (ind) {
        const known = INDUSTRIES.includes(ind);
        setIndustry(known ? ind : 'Other');
        setCustomIndustry(known ? '' : ind);
      }
      if (userProfile.linkedinUrl) {
        setLinkedinUrl(userProfile.linkedinUrl);
      }
    } else if (user && !initializedRef.current) {
      initializedRef.current = true;
      if (user.displayName) setName(user.displayName);
      if (user.photoURL) setPhotoURL(user.photoURL);
    }
  }, [userProfile, user]);

  // State flags
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Password reset message
  const [resetSent, setResetSent] = useState(false);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const isStudent = userType === 'student' || userType === 'college_student';

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setSaveSuccess(false);

    if (!name.trim()) {
      setSaveError('Full Name cannot be empty.');
      return;
    }

    const finalTargetRole = targetRole === 'Other' ? (customRole.trim() || 'Product Manager') : targetRole;
    const finalIndustry = industry === 'Other' ? (customIndustry.trim() || 'Technology') : industry;

    setIsSaving(true);
    try {
      const payload = {
        name: name.trim(),
        displayName: name.trim(),
        photoURL: photoURL.trim(),
        userType,
        ...(isStudent ? {
          education: {
            passingOutYear,
            degree: degree.trim(),
            collegeName: collegeName.trim()
          },
          collegeName: collegeName.trim(),
          degree: degree.trim(),
          graduationYear: passingOutYear
        } : {
          professional: {
            companyName: companyName.trim(),
            designation: designation.trim(),
            yearsOfExperience
          },
          companyName: companyName.trim(),
          designation: designation.trim(),
          experienceYears: yearsOfExperience
        }),
        career: {
          targetRole: finalTargetRole,
          industry: finalIndustry
        },
        targetRole: finalTargetRole,
        industry: finalIndustry,
        linkedinUrl: linkedinUrl.trim()
      };

      // Dispatch async persistence
      updateUserProfileData(payload).catch((err: any) => {
        console.error("Save profile error:", err);
        setSaveSuccess(false);
        setSaveError(getFriendlyAuthErrorMessage(err));
      });

      // Snappy UI feedback
      setTimeout(() => {
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      }, 150);
    } catch (err: any) {
      setIsSaving(false);
      setSaveError(getFriendlyAuthErrorMessage(err));
    }
  };

  const handleSendPasswordReset = async () => {
    if (!user?.email) return;
    try {
      await resetPassword(user.email);
      setResetSent(true);
      setTimeout(() => setResetSent(false), 4500);
    } catch (err: any) {
      setSaveError(getFriendlyAuthErrorMessage(err));
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText.trim().toLowerCase() !== 'delete') {
      setDeleteError('Please type "delete" to confirm.');
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteAccount();
      navigate('/', { replace: true });
    } catch (err: any) {
      setDeleteError(getFriendlyAuthErrorMessage(err));
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] px-4 md:px-8 py-6 sm:py-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6 pb-20">

        {/* Hero Banner Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#070B19] via-[#0E172E] to-[#1E1B4B] p-6 sm:p-8 md:p-10 shadow-lg border border-slate-800">
          {/* Subtle Ambient Radial Light */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Content */}
            <div className="space-y-3.5 max-w-xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/25 text-sky-400 text-[11px] font-bold tracking-wider uppercase">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span>YOUR PROFILE, YOUR JOURNEY</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                User Profile &amp; <span className="text-[#38BDF8]">Account</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                Update your profile details, manage password resets, and account controls.
              </p>
            </div>

            {/* Right Graphic: 3D ID Card with Gear & Handwritten Annotation */}
            <div className="relative flex items-center justify-center lg:justify-end shrink-0 py-2 sm:py-0">
              {/* Handwritten Note + Doodle Arrow */}
              <div className="hidden sm:flex flex-col items-end absolute -top-4 right-0 sm:right-2 z-20 text-black select-none pointer-events-none">
                <div 
                  style={{ fontFamily: "'Caveat', cursive", color: '#000000' }} 
                  className="text-lg sm:text-xl text-black text-right leading-tight font-black tracking-wide pr-2 bg-amber-100/95 border border-amber-200 px-3.5 py-1.5 rounded-xl shadow-md rotate-1"
                >
                  Keep your<br />
                  profile up to date<br />
                  for a better<br />
                  learning experience.
                </div>
                {/* Curved hand-drawn style arrow */}
                <svg 
                  className="w-10 h-10 text-black mr-6 -mt-1 transform -rotate-12" 
                  viewBox="0 0 50 50" 
                  fill="none" 
                  stroke="#000000" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M 38 4 C 32 16, 20 22, 10 38" />
                  <path d="M 6 30 L 10 39 L 20 37" />
                </svg>
              </div>

              {/* 3D Tilted ID Card */}
              <div className="relative mt-6 sm:mt-8 mr-0 sm:mr-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                {/* Soft Ambient Card Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/25 to-indigo-500/35 rounded-3xl blur-md" />
                
                {/* Physical Card */}
                <div className="relative w-64 sm:w-72 bg-gradient-to-br from-white via-[#F0F4FF] to-[#DBEAFE] rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/80">
                  <div className="flex items-center gap-3.5">
                    {/* Avatar circle / square */}
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
                      <UserIcon className="w-7 h-7" />
                    </div>
                    {/* Placeholder Lines */}
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-blue-300/80 rounded-full w-4/5" />
                      <div className="h-2.5 bg-blue-200/90 rounded-full w-3/5" />
                      <div className="h-2 bg-blue-100 rounded-full w-1/2" />
                    </div>
                  </div>
                  
                  {/* Bottom divider with mini lines */}
                  <div className="mt-4 pt-3 border-t border-blue-100/90 flex items-center justify-between">
                    <div className="h-2 bg-blue-200/70 rounded-full w-24" />
                    <div className="h-2 bg-blue-100/90 rounded-full w-12" />
                  </div>

                  {/* 3D Shiny Blue Gear Cog on Bottom Right */}
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center shadow-xl border-2 border-white">
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.9 2.25c.34-.9 1.63-.9 1.97 0l.4.98a2.25 2.25 0 0 0 2.24 1.34l1.05-.13c.96-.12 1.6 1 1.05 1.83l-.6.91a2.25 2.25 0 0 0 .54 2.58l.78.74c.72.68.42 1.95-.5 2.22l-1.02.3a2.25 2.25 0 0 0-1.57 2.15v1.07c0 .97-1.14 1.54-1.92.96l-.86-.64a2.25 2.25 0 0 0-2.67 0l-.86.64c-.78.58-1.92.01-1.92-.96v-1.07a2.25 2.25 0 0 0-1.57-2.15l-1.02-.3c-.92-.27-1.22-1.54-.5-2.22l.78-.74a2.25 2.25 0 0 0 .54-2.58l-.6-.91c-.55-.83.09-1.95 1.05-1.83l1.05.13a2.25 2.25 0 0 0 2.24-1.34l.4-.98Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Notifications */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-3 shadow-xs"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Profile changes saved successfully!</span>
            </motion.div>
          )}

          {saveError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold flex items-center gap-3 shadow-xs"
            >
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{saveError}</span>
            </motion.div>
          )}

          {resetSent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-sm font-semibold flex items-center gap-3 shadow-xs"
            >
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Password reset email dispatched to {user?.email}! Check your inbox.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Edit Form */}
        <form onSubmit={handleSaveChanges} className="space-y-6">

          {/* Card 1: Personal Information */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3.5 pb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0F172A] tracking-tight">Personal Information</h2>
                <p className="text-xs text-slate-500 font-normal">Your public identity and account details</p>
              </div>
            </div>

            {/* Row 1: Full Name & Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address <span className="text-slate-400 font-normal text-xs">(Managed by Auth)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-slate-600 cursor-not-allowed outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Avatar Photo URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Avatar Photo URL <span className="text-slate-400 font-normal text-xs">(Optional image link)</span>
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://images.unsplash.com/... or Google avatar link"
                className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-normal"
              />
            </div>
          </div>

          {/* Card 2: Academic & Professional Background */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3.5 pb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0F172A] tracking-tight">Academic &amp; Professional Background</h2>
                <p className="text-xs text-slate-500 font-normal">Tailors ATS keyword density and seniority metrics</p>
              </div>
            </div>

            {/* User Category Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">User Category</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('college_student')}
                  className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isStudent
                      ? 'border-blue-600 bg-white text-blue-600 shadow-xs'
                      : 'border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <GraduationCap className={`w-4 h-4 ${isStudent ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>College Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUserType('working_professional')}
                  className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    !isStudent
                      ? 'border-blue-600 bg-white text-blue-600 shadow-xs'
                      : 'border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Briefcase className={`w-4 h-4 ${!isStudent ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>Working Professional</span>
                </button>
              </div>
            </div>

            {/* Student Conditional Inputs */}
            {isStudent && (
              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    College / University Name
                  </label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="e.g. IIT Kharagpur, BITS Pilani"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Degree / Major</label>
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="e.g. B.Tech Computer Science"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Graduation Year</label>
                    <div className="relative">
                      <select
                        value={passingOutYear}
                        onChange={(e) => setPassingOutYear(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0F172A] outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-medium cursor-pointer"
                      >
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030+</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Professional Conditional Inputs */}
            {!isStudent && (
              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Amazon, Zomato, Tech Startup"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Designation</label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. Senior Business Analyst"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Years of Experience</label>
                    <div className="relative">
                      <select
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0F172A] outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-medium cursor-pointer"
                      >
                        <option value="0-1 years">0-1 years</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Career Benchmark & LinkedIn URL */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3.5 pb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0F172A] tracking-tight">Career Benchmark &amp; LinkedIn URL</h2>
                <p className="text-xs text-slate-500 font-normal">Calibration targets for AI profile audits</p>
              </div>
            </div>

            {/* Target Role & Industry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Role</label>
                <div className="relative">
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0F172A] outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-medium cursor-pointer"
                  >
                    {TARGET_ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {targetRole === 'Other' && (
                  <input
                    type="text"
                    placeholder="Specify target role"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    className="mt-2 w-full px-4 py-2 rounded-xl border border-[#CBD5E1] text-xs outline-none focus:border-blue-600"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Industry</label>
                <div className="relative">
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0F172A] outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-medium cursor-pointer"
                  >
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {industry === 'Other' && (
                  <input
                    type="text"
                    placeholder="Specify target industry"
                    value={customIndustry}
                    onChange={(e) => setCustomIndustry(e.target.value)}
                    className="mt-2 w-full px-4 py-2 rounded-xl border border-[#CBD5E1] text-xs outline-none focus:border-blue-600"
                  />
                )}
              </div>
            </div>

            {/* LinkedIn Profile URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/in/username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Right Aligned Save Changes Button */}
          <div className="flex items-center justify-end pt-1">
            <button
              type="submit"
              id="save-profile-btn"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all flex items-center gap-2 active:scale-[0.99] cursor-pointer disabled:opacity-75"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                  <span>Saved Changes</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Card 4: Account & Security */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3.5 pb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A] tracking-tight">Account &amp; Security</h2>
              <p className="text-xs text-slate-500 font-normal">Manage credentials and data privacy</p>
            </div>
          </div>

          {/* Row 1: Password Management */}
          <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Password Management</h3>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Send a secure reset link to update your account password.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSendPasswordReset}
              className="bg-white border border-[#CBD5E1] hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs shrink-0 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-slate-500" />
              <span>Send Reset Email</span>
            </button>
          </div>

          {/* Row 2: Delete Account & Data */}
          <div className="rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-[#E11D48]">Delete Account &amp; Data</h3>
              <p className="text-xs text-[#E11D48]/80 font-normal mt-0.5">
                Permanently delete your account, LinkedIn audits, and interview scores.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="bg-[#E11D48] hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs shrink-0 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5 z-10"
            >
              <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl w-fit">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Delete Account Permanently?</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  This will permanently delete your account and associated LinkedIn Optimiser and interview data. This action cannot be undone.
                </p>
              </div>

              {deleteError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                  {deleteError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Type <span className="font-mono text-rose-600 font-black">delete</span> to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="delete"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-rose-600 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeleting || deleteConfirmText.toLowerCase() !== 'delete'}
                  onClick={handleDeleteAccount}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold disabled:opacity-50 flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  <span>Confirm Delete</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
