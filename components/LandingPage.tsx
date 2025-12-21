import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Zap, Briefcase, Users, 
  Layers, Menu, X, BarChart2, FileText
} from 'lucide-react';
import { Logo } from './Logo';

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
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-zinc-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={scrollToTop}
          >
             <Logo className="w-9 h-9 drop-shadow-sm group-hover:scale-105 transition-transform" />
             <span className="font-bold text-xl tracking-tighter text-zinc-900">PM Launchpad</span>
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
                className="text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition-colors tracking-tight"
              >
                {item}
              </motion.button>
            ))}
            
            <motion.button 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => navigate('/dashboard')}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors tracking-tight"
            >
                Dashboard
            </motion.button>

            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 pl-4 border-l border-zinc-200"
            >
                <button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 tracking-tight">
                    Start Learning
                </button>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-zinc-600">
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
            className="fixed top-20 left-0 right-0 bg-white border-b border-zinc-200 z-40 md:hidden overflow-hidden"
          >
             <div className="p-6 space-y-4">
                {['Features', 'Curriculum', 'FAQ'].map((item) => (
                    <button 
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="block w-full text-left text-lg font-semibold text-zinc-700 py-2 tracking-tight"
                    >
                        {item}
                    </button>
                ))}
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="block w-full text-left text-lg font-semibold text-indigo-600 py-2 tracking-tight"
                >
                    Dashboard
                </button>
                <div className="pt-4 border-t border-zinc-100 flex flex-col gap-3">
                    <button onClick={() => navigate('/dashboard')} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold tracking-tight">
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
                <h1 className="text-6xl md:text-8xl font-extrabold text-zinc-900 tracking-tighter leading-[0.95] mb-8">
                    NooB In. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">PM Out.</span>
                </h1>
                <p className="text-xl text-zinc-600 mb-10 leading-relaxed max-w-lg font-medium tracking-tight">
                    A structured 45-day interactive course designed to take you from beginner to job-ready Product Manager. 
                </p>
                <div className="flex flex-wrap gap-4">
                    <button onClick={() => navigate('/dashboard')} className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-zinc-200 transition-all hover:-translate-y-1 flex items-center gap-2 tracking-tight">
                        Start Learning Now <ArrowRight className="w-5 h-5" />
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="px-8 py-4 bg-white hover:bg-zinc-50 text-indigo-600 border border-zinc-200 rounded-2xl font-bold text-lg transition-all tracking-tight shadow-sm">
                        Dashboard
                    </button>
                </div>
                <div className="mt-12 flex items-center gap-4 text-sm font-semibold text-zinc-500 tracking-tight">
                    <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-zinc-200 flex items-center justify-center overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                            </div>
                        ))}
                    </div>
                    <span>Joined by 100+ Aspiring PMs</span>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-[2.5rem] rotate-3 opacity-20 blur-xl"></div>
                <div className="bg-zinc-900 rounded-[2.5rem] p-8 shadow-2xl relative border border-zinc-800 overflow-hidden">
                    {/* Header simulating app window */}
                    <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-zinc-500 text-xs font-mono tracking-widest">pm_workspace.app</div>
                    </div>
                    
                    {/* Animated Workspace Content */}
                    <div className="space-y-4">
                        {/* Task 1: Roadmap Progress */}
                        <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-indigo-400" />
                                    <span className="text-sm font-bold text-zinc-200 tracking-tight">Q3 Roadmap Launch</span>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">In Progress</span>
                            </div>
                            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-indigo-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "75%" }}
                                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                                />
                            </div>
                        </motion.div>

                        {/* Task 2: Data Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                             <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50"
                             >
                                 <div className="flex items-center gap-2 mb-2">
                                     <BarChart2 className="w-4 h-4 text-emerald-400" />
                                     <span className="text-xs font-medium text-zinc-400 tracking-wide">Growth</span>
                                 </div>
                                 <div className="text-2xl font-bold text-white flex items-end gap-2 tracking-tight">
                                     +124%
                                     <motion.span 
                                         animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                                         transition={{ duration: 2, repeat: Infinity }}
                                         className="w-2 h-2 rounded-full bg-emerald-500 mb-1.5"
                                     />
                                 </div>
                             </motion.div>

                             <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50"
                             >
                                 <div className="flex items-center gap-2 mb-2">
                                     <Users className="w-4 h-4 text-blue-400" />
                                     <span className="text-xs font-medium text-zinc-400 tracking-wide">Active Users</span>
                                 </div>
                                 <div className="text-2xl font-bold text-white tracking-tight">12.5k</div>
                             </motion.div>
                        </div>

                        {/* Task 3: PRD Writing Simulation */}
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50"
                        >
                             <div className="flex items-center justify-between mb-3">
                                 <div className="flex items-center gap-2">
                                     <FileText className="w-4 h-4 text-pink-400" />
                                     <span className="text-sm font-bold text-zinc-200 tracking-tight">Writing PRD</span>
                                 </div>
                                 <div className="flex -space-x-2">
                                     {[1,2].map(i => (
                                         <div key={i} className="w-6 h-6 rounded-full border border-zinc-800 bg-zinc-600 flex items-center justify-center text-[10px] text-white">
                                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+5}`} alt="collab" className="w-full h-full rounded-full" />
                                         </div>
                                     ))}
                                 </div>
                             </div>
                             <div className="space-y-2">
                                 <motion.div 
                                     className="h-2 bg-zinc-600 rounded-full"
                                     animate={{ width: ["20%", "90%"] }}
                                     transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                                 />
                                 <motion.div 
                                     className="h-2 bg-zinc-600 rounded-full"
                                     animate={{ width: ["20%", "60%"] }}
                                     transition={{ duration: 2, delay: 0.2, repeat: Infinity, repeatDelay: 0.5 }}
                                 />
                             </div>
                        </motion.div>

                        {/* Task 4: Success Message Pop-up */}
                        <motion.div 
                            className="absolute bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-20"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 2, duration: 0.5 }}
                        >
                             <CheckCircle className="w-5 h-5" />
                             <div className="text-sm font-bold tracking-tight">Sprint Goal Met!</div>
                        </motion.div>

                    </div>
                </div>
            </motion.div>
         </div>
      </section>

      {/* Curriculum Preview */}
      <section id="curriculum" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">What You Will Learn</h2>
                <p className="text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
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
                        className="p-8 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-indigo-100 hover:shadow-xl transition-all"
                    >
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-6">
                            <feature.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">{feature.title}</h3>
                        <p className="text-zinc-600 leading-relaxed font-medium">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* FAQ / Features Section */}
      <section id="features" className="py-24 bg-zinc-900 text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div>
                     <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">Built for Action, <br/> Not Just Reading.</h2>
                     <p className="text-indigo-200 text-lg mb-8 leading-relaxed">
                         Most courses give you theory. We give you a workspace. Complete daily assignments, build a portfolio, and track your progress.
                     </p>
                     <ul className="space-y-4">
                         {['45 Daily Lessons', 'Real-world Assignments', 'Portfolio Builder', 'Interview Prep'].map(item => (
                             <li key={item} className="flex items-center gap-3 text-lg font-medium tracking-tight">
                                 <CheckCircle className="w-6 h-6 text-green-400" />
                                 {item}
                             </li>
                         ))}
                     </ul>
                 </div>
                 <div className="relative">
                     <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full opacity-30 blur-2xl"></div>
                     <div className="bg-zinc-800 rounded-3xl p-8 border border-zinc-700 relative">
                         <div className="space-y-6">
                             <div className="flex items-center gap-4 p-4 bg-zinc-700/50 rounded-xl border border-zinc-600">
                                 <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">1</div>
                                 <div>
                                     <h4 className="font-bold tracking-tight">Read the Lesson</h4>
                                     <p className="text-sm text-zinc-400 font-medium">Deep dive into a core concept.</p>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4 p-4 bg-zinc-700/50 rounded-xl border border-zinc-600">
                                 <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center font-bold">2</div>
                                 <div>
                                     <h4 className="font-bold tracking-tight">Complete Assignment</h4>
                                     <p className="text-sm text-zinc-400 font-medium">Apply what you learned immediately.</p>
                                 </div>
                             </div>
                             <div className="flex items-center gap-4 p-4 bg-zinc-700/50 rounded-xl border border-zinc-600">
                                 <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold">3</div>
                                 <div>
                                     <h4 className="font-bold tracking-tight">Build Portfolio</h4>
                                     <p className="text-sm text-zinc-400 font-medium">Document your work for recruiters.</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-zinc-200">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                  <Logo className="w-8 h-8" />
                  <span className="font-bold text-zinc-900 tracking-tight">PM Launchpad</span>
              </div>
              <p className="text-zinc-500 text-sm font-medium">© {new Date().getFullYear()} PM Launchpad. Open Source Education.</p>
              <div className="flex gap-6">
                  <a href="#" className="text-zinc-400 hover:text-indigo-600 transition-colors font-medium text-sm">Twitter</a>
                  <a href="#" className="text-zinc-400 hover:text-indigo-600 transition-colors font-medium text-sm">LinkedIn</a>
                  <a href="#" className="text-zinc-400 hover:text-indigo-600 transition-colors font-medium text-sm">GitHub</a>
              </div>
          </div>
      </footer>
    </div>
  );
};