import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Zap, BookOpen, Users, 
  BarChart, Layers, ChevronDown, ChevronUp, Star,
  Menu, X, Briefcase, GraduationCap, Play, Lock, Trophy
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={scrollToTop}
          >
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">PM</div>
             <span className="font-bold text-xl tracking-tight text-slate-800">Launchpad</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Curriculum', 'FAQ'].map((item, i) => (
              <motion.button 
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {item}
              </motion.button>
            ))}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 pl-4 border-l border-slate-200"
            >
                <button onClick={() => navigate('/login')} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
                    Sign In
                </button>
                <button onClick={() => navigate('/signup')} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
                    Start Free
                </button>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-600">
             {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 bg-white border-b border-slate-200 z-40 md:hidden overflow-hidden"
          >
             <div className="p-6 space-y-4">
                {['Features', 'Curriculum', 'FAQ'].map((item) => (
                    <button 
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="block w-full text-left text-lg font-medium text-slate-600 py-2"
                    >
                        {item}
                    </button>
                ))}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                     <button onClick={() => navigate('/login')} className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-bold">
                        Sign In
                    </button>
                    <button onClick={() => navigate('/signup')} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold">
                        Start Free Account
                    </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
         {/* Background Blobs */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold mb-6 border border-indigo-100">
                    <Zap className="w-4 h-4 fill-current" />
                    <span>New Batch Starting Today</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                    Launch Your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Product Career</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                    A structured 45-day interactive roadmap designed to take you from beginner to job-ready Product Manager. 
                </p>
                <div className="flex flex-wrap gap-4">
                    <button onClick={() => navigate('/signup')} className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 transition-all hover:-translate-y-1 flex items-center gap-2">
                        Start Learning Now <ArrowRight className="w-5 h-5" />
                    </button>
                    <button onClick={() => scrollToSection('curriculum')} className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg transition-all">
                        View Curriculum
                    </button>
                </div>
                <div className="mt-10 flex items-center gap-4 text-sm font-medium text-slate-500">
                    <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="User" />
                            </div>
                        ))}
                    </div>
                    <p>Joined by 100+ aspiring PMs</p>
                </div>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
            >
                 <div className="relative rounded-[2.5rem] bg-slate-900 p-8 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                    {/* Simulated App Interface */}
                    <div className="bg-slate-800 rounded-2xl p-6 mb-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="h-2 w-20 bg-slate-700 rounded-full"></div>
                        </div>
                        <div className="flex gap-4">
                             <div className="w-1/3 space-y-3">
                                <div className="h-24 bg-indigo-600 rounded-xl"></div>
                                <div className="h-16 bg-slate-700 rounded-xl"></div>
                                <div className="h-16 bg-slate-700 rounded-xl"></div>
                             </div>
                             <div className="w-2/3 space-y-4">
                                <div className="h-32 bg-slate-700 rounded-xl p-4 flex flex-col justify-end">
                                    <div className="w-1/2 h-3 bg-slate-600 rounded-full mb-2"></div>
                                    <div className="w-3/4 h-3 bg-slate-500 rounded-full"></div>
                                </div>
                                <div className="h-48 bg-slate-700 rounded-xl p-4">
                                     <div className="flex gap-2 mb-4">
                                         <div className="w-8 h-8 rounded-full bg-slate-600"></div>
                                         <div className="flex-1 h-8 bg-slate-600 rounded-lg"></div>
                                     </div>
                                     <div className="space-y-2">
                                         <div className="h-2 bg-slate-600 rounded-full w-full"></div>
                                         <div className="h-2 bg-slate-600 rounded-full w-full"></div>
                                         <div className="h-2 bg-slate-600 rounded-full w-5/6"></div>
                                     </div>
                                </div>
                             </div>
                        </div>
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                         <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                             <CheckCircle className="w-6 h-6" />
                         </div>
                         <div>
                             <p className="text-xs text-slate-400 font-bold uppercase">Status</p>
                             <p className="font-bold text-slate-800">Job Ready</p>
                         </div>
                    </div>
                 </div>
            </motion.div>
         </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to break into Product</h2>
                  <p className="text-lg text-slate-500">We stripped away the fluff. This is a practical, rigorous, and project-based curriculum designed for outcomes.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FeatureCard 
                    icon={<Layers className="w-6 h-6 text-indigo-600" />}
                    title="Structured Roadmap"
                    desc="45 days of daily lessons, from foundations to advanced strategy. No more random YouTube videos."
                  />
                  <FeatureCard 
                    icon={<Briefcase className="w-6 h-6 text-pink-600" />}
                    title="Build a Portfolio"
                    desc="Complete 5 real-world projects including a PRD, a teardown, and a GTM strategy."
                  />
                  <FeatureCard 
                    icon={<Users className="w-6 h-6 text-emerald-600" />}
                    title="Interview Prep"
                    desc="Embedded mock interview questions and behavioral answers in every module."
                  />
              </div>
          </div>
      </section>

      {/* Curriculum Preview */}
      <section id="curriculum" className="py-20 bg-slate-50">
           <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                  <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The 45-Day Syllabus</h2>
                      <p className="text-lg text-slate-500 max-w-xl">A glimpse into your daily learning schedule. Designed to be manageable alongside a full-time job.</p>
                  </div>
                  <button onClick={() => navigate('/signup')} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                      Full Syllabus →
                  </button>
              </div>

              <div className="space-y-4">
                  {[
                      { week: "Week 1", title: "Product Foundations & Strategy", topics: "Product Sense, Vision, Mission, OKRs, PDLC" },
                      { week: "Week 2", title: "User Research & Discovery", topics: "User Interviews, Personas, Empathy Mapping, JTBD" },
                      { week: "Week 3", title: "Design & UX for PMs", topics: "Wireframing, Figma, Design Systems, Usability Testing" },
                      { week: "Week 4", title: "Data Analytics & SQL", topics: "Metrics, Funnels, Cohorts, A/B Testing, SQL Basics" },
                      { week: "Week 5", title: "Tech Stack & Engineering", topics: "APIs, System Design, Cloud, working with Engineers" },
                      { week: "Week 6", title: "Growth & Execution", topics: "GTM Strategy, Launch Planning, Retention Loops" },
                  ].map((module, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-300 transition-colors group">
                          <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                  {i + 1}
                              </div>
                              <div>
                                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{module.week}</div>
                                  <h3 className="text-lg font-bold text-slate-900">{module.title}</h3>
                                  <p className="text-slate-500 text-sm">{module.topics}</p>
                              </div>
                          </div>
                          <div className="md:text-right">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 text-slate-400 group-hover:border-indigo-200 group-hover:text-indigo-600">
                                  <Lock className="w-4 h-4" />
                              </span>
                          </div>
                      </div>
                  ))}
              </div>
           </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
           <div className="max-w-5xl mx-auto px-6">
               <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/50 to-slate-900 z-0"></div>
                   <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-30"></div>
                   <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-500 rounded-full blur-[80px] opacity-30"></div>
                   
                   <div className="relative z-10 space-y-8">
                       <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                           Ready to become a <br/> Product Manager?
                       </h2>
                       <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                           Join thousands of students building their future. No credit card required. Free access to the first module.
                       </p>
                       <button 
                           onClick={() => navigate('/signup')} 
                           className="px-10 py-5 bg-white text-indigo-900 text-xl font-bold rounded-2xl shadow-2xl hover:bg-indigo-50 transition-all transform hover:-translate-y-1 inline-flex items-center gap-2"
                       >
                           Start Learning for Free <ArrowRight className="w-6 h-6" />
                       </button>
                       <p className="text-sm text-slate-400">Limited spots for the live cohort • Self-paced always open</p>
                   </div>
               </div>
           </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                  <div className="col-span-1 md:col-span-2">
                      <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">PM</div>
                          <span className="font-bold text-xl text-slate-900">Launchpad</span>
                      </div>
                      <p className="text-slate-500 max-w-xs">
                          The most practical way to learn Product Management. Built by PMs from Google, Uber, and Notion.
                      </p>
                  </div>
                  <div>
                      <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                          <li><a href="#" className="hover:text-indigo-600">Curriculum</a></li>
                          <li><a href="#" className="hover:text-indigo-600">Mentors</a></li>
                          <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
                          <li><a href="#" className="hover:text-indigo-600">Login</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                          <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
                          <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
                      </ul>
                  </div>
              </div>
              <div className="pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
                  © 2024 PM Launchpad Academy. All rights reserved.
              </div>
          </div>
      </footer>

    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
);