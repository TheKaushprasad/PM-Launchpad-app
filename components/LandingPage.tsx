import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Zap, Briefcase, Users, 
  Layers, Menu, X
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
                <button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
                    Start Learning
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
                    <button onClick={() => navigate('/dashboard')} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold">
                        Start Learning
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
                    <span>Now Open for Everyone</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                    Launch Your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Product Career</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                    A structured 45-day interactive roadmap designed to take you from beginner to job-ready Product Manager. 
                </p>
                <div className="flex flex-wrap gap-4">
                    <button onClick={() => navigate('/dashboard')} className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 transition-all hover:-translate-y-1 flex items-center gap-2">
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
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                            </div>
                        ))}
                    </div>
                    <span>Joined by 10,000+ Aspiring PMs</span>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-[2.5rem] rotate-3 opacity-20 blur-xl"></div>
                <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative border border-slate-800">
                    {/* Mock Dashboard UI */}
                    <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-slate-500 text-xs font-mono">dashboard.tsx</div>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
                                <Layers className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="h-4 w-32 bg-slate-700 rounded mb-2"></div>
                                <div className="h-3 w-48 bg-slate-800 rounded"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             {[1,2,3,4].map(i => (
                                 <div key={i} className="bg-slate-800 p-4 rounded-xl border border-slate-700/50">
                                     <div className="w-8 h-8 bg-slate-700 rounded-lg mb-3"></div>
                                     <div className="h-3 w-20 bg-slate-700 rounded mb-2"></div>
                                     <div className="h-2 w-full bg-slate-800 rounded"></div>
                                 </div>
                             ))}
                        </div>
                        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-4 rounded-xl border border-indigo-500/30">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span className="text-slate-300 text-sm">Day 1: Foundations Complete</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
         </div>
      </section>

      {/* Curriculum Preview */}
      <section id="curriculum" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What You Will Learn</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    A comprehensive curriculum covering every aspect of modern Product Management.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Briefcase, title: 'Foundations', desc: 'Master the role, mindset, and core frameworks used by top PMs.' },
                    { icon: Users, title: 'User Research', desc: 'Learn to interview users, uncover insights, and define problems.' },
                    { icon: Layers, title: 'Product Strategy', desc: 'Build roadmaps, define metrics (OKRs), and prioritize features.' }
                ].map((feature, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-xl transition-all"
                    >
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-6">
                            <feature.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* FAQ / Features Section */}
      <section id="features" className="py-24 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div>
                     <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for Action, <br/> Not Just Reading.</h2>
                     <p className="text-indigo-200 text-lg mb-8">
                         Most courses give you theory. We give you a workspace. Complete daily assignments, build a portfolio, and track your progress.
                     </p>
                     <ul className="space-y-4">
                         {['45 Daily Lessons', 'Real-world Assignments', 'Portfolio Builder', 'Interview Prep'].map(item => (
                             <li key={item} className="flex items-center gap-3 text-lg font-medium">
                                 <CheckCircle className="w-6 h-6 text-green-400" />
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </div>
                 <div className="relative">
                     <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full opacity-30 blur-2xl"></div>
                     <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 relative">
                         <div className="space-y-6">
                             <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                                 <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">1</div>
                                 <div>
                                     <h4 className="font-bold">Read the Lesson</h4>
                                     <p className="text-sm text-slate-400">Deep dive into a core concept.</p>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                                 <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center font-bold">2</div>
                                 <div>
                                     <h4 className="font-bold">Complete Assignment</h4>
                                     <p className="text-sm text-slate-400">Apply what you learned immediately.</p>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                                 <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold">3</div>
                                 <div>
                                     <h4 className="font-bold">Build Portfolio</h4>
                                     <p className="text-sm text-slate-400">Document your work for recruiters.</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">PM</div>
                  <span className="font-bold text-slate-800">Launchpad</span>
              </div>
              <p className="text-slate-500 text-sm">© {new Date().getFullYear()} PM Launchpad. Open Source Education.</p>
              <div className="flex gap-6">
                  <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Twitter</a>
                  <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">LinkedIn</a>
                  <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">GitHub</a>
              </div>
          </div>
      </footer>
    </div>
  );
};