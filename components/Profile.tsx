import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, Mail, Briefcase, GraduationCap, 
  Globe, Target, CheckCircle2, AlertTriangle, 
  Trash2, ShieldCheck, Save, Loader2, ArrowLeft, KeyRound
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
  const initializedRef = React.useRef(false);
  React.useEffect(() => {
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

      // Dispatch async persistence in background
      updateUserProfileData(payload).catch((err: any) => {
        console.error("Save profile error:", err);
        setSaveSuccess(false);
        setSaveError(getFriendlyAuthErrorMessage(err));
      });

      // Instant UI response for snappy feel
      setTimeout(() => {
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      }, 120);
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
      setTimeout(() => setResetSent(false), 4000);
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
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 px-4 md:px-8 py-8">
      <div className="max-w-4xl mx-auto space-y-8 pb-16">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-zinc-900">User Profile & Account</h1>
              <p className="text-xs text-zinc-500 font-medium">
                Update your profile details, manage password resets, and account controls.
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Profile changes saved successfully!</span>
            </motion.div>
          )}

          {saveError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2.5"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{saveError}</span>
            </motion.div>
          )}

          {resetSent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold flex items-center gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Password reset email dispatched to {user?.email}!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSaveChanges} className="space-y-6">
          {/* Card 1: Personal Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-zinc-900 tracking-tight">Personal Information</h3>
                <p className="text-xs text-zinc-500">Your public identity and account details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:border-indigo-600 text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Email Address <span className="text-zinc-400 font-normal">(Managed by Auth)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-sm text-zinc-500 cursor-not-allowed outline-none font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Avatar Photo URL <span className="text-zinc-400 font-normal">(Optional image link)</span>
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:border-indigo-600 text-sm outline-none transition-all"
              />
            </div>
          </div>

          {/* Card 2: User Type & Background */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                {isStudent ? <GraduationCap className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-base font-black text-zinc-900 tracking-tight">Academic & Professional Background</h3>
                <p className="text-xs text-zinc-500">Tailors ATS keyword density and seniority metrics</p>
              </div>
            </div>

            {/* User Type Switcher */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-2">User Category</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('college_student')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isStudent
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>College Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUserType('working_professional')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    !isStudent
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Working Professional</span>
                </button>
              </div>
            </div>

            {/* Student Fields */}
            {isStudent && (
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    College / University Name
                  </label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="e.g. IIT Kharagpur, BITS Pilani"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Degree / Major</label>
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="e.g. B.Tech Computer Science"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Graduation Year</label>
                    <select
                      value={passingOutYear}
                      onChange={(e) => setPassingOutYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600 font-medium"
                    >
                      <option value="2024">2024 (Recent)</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028+</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Professional Fields */}
            {!isStudent && (
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Amazon, Zomato, Tech Startup"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Designation</label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. Senior Business Analyst"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Years of Experience</label>
                    <select
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600 font-medium"
                    >
                      <option value="0-1 years">0-1 years</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Career Aspirations & LinkedIn */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-zinc-900 tracking-tight">Career Benchmark & LinkedIn URL</h3>
                <p className="text-xs text-zinc-500">Calibration targets for AI profile audits</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Target Role</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium focus:border-indigo-600 outline-none"
                >
                  {TARGET_ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {targetRole === 'Other' && (
                  <input
                    type="text"
                    placeholder="Specify target role"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    className="mt-2 w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Target Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium focus:border-indigo-600 outline-none"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
                {industry === 'Other' && (
                  <input
                    type="text"
                    placeholder="Specify target industry"
                    value={customIndustry}
                    onChange={(e) => setCustomIndustry(e.target.value)}
                    className="mt-2 w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                LinkedIn Profile URL
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/in/username"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-200 focus:border-indigo-600 text-xs outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              id="save-profile-btn"
              disabled={isSaving}
              className={`px-6 py-3 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-75 ${
                saveSuccess
                  ? 'bg-emerald-600 shadow-emerald-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                  <span>Saved Successfully!</span>
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

        {/* Card 4: Account Security & Danger Zone */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-100">
            <div className="p-2.5 rounded-xl bg-zinc-100 text-zinc-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-zinc-900 tracking-tight">Account & Security</h3>
              <p className="text-xs text-zinc-500">Manage credentials and data privacy</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
            <div>
              <h4 className="text-xs font-bold text-zinc-900">Password Management</h4>
              <p className="text-[11px] text-zinc-500">
                Send a secure reset link to update your account password.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSendPasswordReset}
              className="px-4 py-2 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Send Reset Email</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-rose-50/50 border border-rose-200">
            <div>
              <h4 className="text-xs font-bold text-rose-900">Delete Account & Data</h4>
              <p className="text-[11px] text-rose-700">
                Permanently delete your account, LinkedIn audits, and interview scores.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0"
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
              className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-2xl space-y-5 z-10"
            >
              <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl w-fit">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-zinc-900">Delete Account Permanently?</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  This will permanently delete your account and associated LinkedIn Optimiser data. This action cannot be undone.
                </p>
              </div>

              {deleteError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                  {deleteError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Type <span className="font-mono text-rose-600 font-black">delete</span> to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="delete"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs outline-none focus:border-rose-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeleting || deleteConfirmText.toLowerCase() !== 'delete'}
                  onClick={handleDeleteAccount}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
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
