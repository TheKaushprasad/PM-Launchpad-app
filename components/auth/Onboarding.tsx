import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Briefcase, Building2, Sparkles, 
  ArrowRight, Loader2, CheckCircle2, AlertCircle, Globe
} from 'lucide-react';
import { useAuth, UserType, getFriendlyAuthErrorMessage } from '../../context/AuthContext';
import { Logo } from '../Logo';

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

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user, userProfile, updateUserProfileData } = useAuth();

  const [userType, setUserType] = useState<UserType>('college_student');

  // Student specific
  const [collegeName, setCollegeName] = useState(userProfile?.collegeName || '');
  const [degree, setDegree] = useState(userProfile?.degree || '');
  const [passingOutYear, setPassingOutYear] = useState(userProfile?.graduationYear?.toString() || '2026');

  // Professional specific
  const [companyName, setCompanyName] = useState(userProfile?.companyName || '');
  const [designation, setDesignation] = useState(userProfile?.designation || '');
  const [yearsOfExperience, setYearsOfExperience] = useState(userProfile?.experienceYears?.toString() || '1-3 years');

  // Career & Target fields
  const [targetRole, setTargetRole] = useState(userProfile?.targetRole || 'Product Manager');
  const [customRole, setCustomRole] = useState('');
  const [industry, setIndustry] = useState(userProfile?.industry || 'SaaS');
  const [customIndustry, setCustomIndustry] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState(userProfile?.linkedinUrl || '');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isStudent = userType === 'student' || userType === 'college_student';

    if (isStudent) {
      if (!collegeName.trim()) {
        setError('Please enter your college or university name.');
        return;
      }
      if (!degree.trim()) {
        setError('Please enter your degree or field of study.');
        return;
      }
    } else {
      if (!companyName.trim()) {
        setError('Please enter your company / organization name.');
        return;
      }
      if (!designation.trim()) {
        setError('Please enter your current designation.');
        return;
      }
    }

    const finalTargetRole = targetRole === 'Other' ? (customRole.trim() || 'Product Manager') : targetRole;
    const finalIndustry = industry === 'Other' ? (customIndustry.trim() || 'Technology') : industry;

    setLoading(true);
    try {
      await updateUserProfileData({
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
      });

      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError(getFriendlyAuthErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-4 sm:p-6 text-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-zinc-200 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 pb-2 border-b border-zinc-100">
          <Logo className="w-9 h-9" />
          <div>
            <h1 className="text-xl font-black text-zinc-900 tracking-tight">
              Tell us about yourself
            </h1>
            <p className="text-xs text-zinc-500 font-medium">
              Help us tailor your LinkedIn audit and PM prep benchmark models.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User Type */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-2">
              Are you a: <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('college_student')}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  userType === 'student' || userType === 'college_student'
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100'
                    : 'border-zinc-200 hover:border-zinc-300 bg-white'
                }`}
              >
                <div className={`p-2 rounded-xl ${userType === 'student' || userType === 'college_student' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-zinc-900 block">College Student</span>
                  <span className="text-[11px] text-zinc-500">Graduating soon or recently graduated</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setUserType('working_professional')}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  userType === 'professional' || userType === 'working_professional'
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100'
                    : 'border-zinc-200 hover:border-zinc-300 bg-white'
                }`}
              >
                <div className={`p-2 rounded-xl ${userType === 'professional' || userType === 'working_professional' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-zinc-900 block">Working Professional</span>
                  <span className="text-[11px] text-zinc-500">Currently employed / pivoting roles</span>
                </div>
              </button>
            </div>
          </div>

          {/* Conditional Education Details */}
          {(userType === 'student' || userType === 'college_student') && (
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-indigo-700">
                Education Details
              </h4>
              
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  College / University Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="e.g. IIT Delhi, Stanford, BITS Pilani"
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Degree / Major <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g. B.Tech / MBA / BCA"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Passing Out Year <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={passingOutYear}
                    onChange={(e) => setPassingOutYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600 font-medium"
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

          {/* Conditional Professional Details */}
          {(userType === 'professional' || userType === 'working_professional') && (
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-indigo-700">
                Professional Details
              </h4>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Microsoft, Razorpay, Fintech Startup"
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Designation <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Associate PM / Analyst"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Experience <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs outline-none focus:border-indigo-600 font-medium"
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

          {/* Target Role & Industry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Target Role <span className="text-rose-500">*</span>
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs outline-none focus:border-indigo-600 font-medium"
              >
                {TARGET_ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              {targetRole === 'Other' && (
                <input
                  type="text"
                  placeholder="Enter target role"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="mt-1.5 w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Target Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs outline-none focus:border-indigo-600 font-medium"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
              {industry === 'Other' && (
                <input
                  type="text"
                  placeholder="Enter target industry"
                  value={customIndustry}
                  onChange={(e) => setCustomIndustry(e.target.value)}
                  className="mt-1.5 w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-xs outline-none focus:border-indigo-600"
                />
              )}
            </div>
          </div>

          {/* Optional LinkedIn URL */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">
              LinkedIn Profile URL <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://www.linkedin.com/in/username"
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 focus:border-indigo-600 text-xs outline-none transition-all"
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Complete Profile & Go to Dashboard</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};
