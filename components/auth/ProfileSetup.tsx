import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserProfile, Profession } from '../../types';
import { motion } from 'framer-motion';
import { UserCircle, Briefcase, GraduationCap, ArrowRight, Loader2 } from 'lucide-react';

export const ProfileSetup: React.FC = () => {
  const { updateProfile, user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<UserProfile>({
    fullName: '',
    profession: 'Student', // default
    yearsOfExperience: '',
    designation: '',
    collegeName: '',
    degreeName: '',
    passOutYear: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setProfession = (profession: Profession) => {
    setFormData(prev => ({ ...prev, profession }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateProfile(formData);
      navigate('/');
    } catch (error) {
      console.error("Profile update failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 md:p-12 w-full max-w-2xl shadow-xl border border-zinc-100"
         >
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 mb-2">Create Your Profile</h1>
                <p className="text-zinc-500">Tell us a bit about yourself so we can personalize your experience.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-zinc-700">Full Name</label>
                    <div className="relative">
                        <UserCircle className="absolute left-3.5 top-3.5 w-5 h-5 text-zinc-400" />
                        <input 
                            type="text" 
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Profession Selector */}
                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-zinc-700">I am a...</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div 
                            onClick={() => setProfession('Student')}
                            className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${formData.profession === 'Student' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-zinc-100 hover:border-zinc-200 text-zinc-500'}`}
                        >
                            <GraduationCap className="w-8 h-8" />
                            <span className="font-bold text-sm">Student</span>
                        </div>
                        <div 
                            onClick={() => setProfession('Professional')}
                            className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${formData.profession === 'Professional' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-zinc-100 hover:border-zinc-200 text-zinc-500'}`}
                        >
                            <Briefcase className="w-8 h-8" />
                            <span className="font-bold text-sm">Professional</span>
                        </div>
                    </div>
                </div>

                {/* Conditional Fields */}
                <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 space-y-6">
                    {formData.profession === 'Professional' ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-zinc-700">Job Designation</label>
                                    <input 
                                        type="text" 
                                        name="designation"
                                        required
                                        value={formData.designation}
                                        onChange={handleChange}
                                        placeholder="Product Analyst"
                                        className="w-full px-4 py-3 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-zinc-700">Years of Experience</label>
                                    <select 
                                        name="yearsOfExperience"
                                        required
                                        value={formData.yearsOfExperience}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                    >
                                        <option value="">Select...</option>
                                        <option value="0-1">0-1 Years</option>
                                        <option value="1-3">1-3 Years</option>
                                        <option value="3-5">3-5 Years</option>
                                        <option value="5+">5+ Years</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                             <div className="space-y-2">
                                <label className="block text-sm font-semibold text-zinc-700">College Name</label>
                                <input 
                                    type="text" 
                                    name="collegeName"
                                    required
                                    value={formData.collegeName}
                                    onChange={handleChange}
                                    placeholder="University of Tech"
                                    className="w-full px-4 py-3 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-zinc-700">Degree Name</label>
                                    <input 
                                        type="text" 
                                        name="degreeName"
                                        required
                                        value={formData.degreeName}
                                        onChange={handleChange}
                                        placeholder="B.Tech CS"
                                        className="w-full px-4 py-3 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-zinc-700">Pass Out Year</label>
                                    <input 
                                        type="number" 
                                        name="passOutYear"
                                        required
                                        value={formData.passOutYear}
                                        onChange={handleChange}
                                        placeholder="2025"
                                        className="w-full px-4 py-3 bg-white rounded-xl border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                     {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Complete Setup <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>
         </motion.div>
    </div>
  );
};