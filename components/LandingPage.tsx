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
                transition={{ delay: 0.1 * i }}
                onClick={() => scrollToSection(item.toLowerCase())} 
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </motion.button>
            ))}
            
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors"
            >
              Log In
            </motion.button>
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
            >
              Start Free
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden shadow-xl"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                <button onClick={() => scrollToSection('features')} className="text-slate-600 py-2 text-left font-medium">Features</button>
                <button onClick={() => scrollToSection('curriculum')} className="text-slate-600 py-2 text-left font-medium">Curriculum</button>
                <button onClick={() => scrollToSection('faq')} className="text-slate-600 py-2 text-left font-medium">FAQ</button>
                <hr className="border-slate-100"/>
                <button onClick={() => navigate('/login')} className="w-full py-3 text-center font-bold text-slate-700 bg-slate-50 rounded-xl">Log In</button>
                <button onClick={() => navigate('/login')} className="w-full py-3 text-center font-bold text-white bg-indigo-600 rounded-xl">Get Started</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Animated Background Blobs */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 translate-x-1/3 pointer-events-none"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              New Cohort Open
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6"
            >
              Launch your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x bg-[length:200%_auto]">PM Career</span> in 45 days.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg"
            >
              Master the skills, build a real-world portfolio, and land your dream Product Manager role. No fluff, just outcome-based learning.
            </motion.p>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="flex flex-wrap gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 flex items-center gap-2 group overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center gap-2">Start Learning Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('curriculum')}
                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg transition-all"
              >
                View Syllabus
              </motion.button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex items-center gap-4 text-sm font-medium text-slate-500"
            >
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p>Join 10,000+ Aspiring PMs</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative perspective-1000 hidden md:block"
          >
            {/* Dashboard Mockup Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white z-10 transform transition-transform hover:scale-[1.01] duration-500">
               {/* Window Controls */}
               <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 h-6 bg-white rounded-md w-64 opacity-50"></div>
               </div>
               
               {/* Dashboard Content */}
               <div className="p-8 space-y-8 bg-slate-50/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">Welcome Back, PM! 🚀</h3>
                      <p className="text-slate-500">Day 12 of 45 • Discovery Phase</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 animate-pulse">
                      <Zap className="fill-current" />
                    </div>
                  </div>
                  
                  {/* Animated Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold text-slate-700">
                        <span>Course Progress</span>
                        <span>32%</span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "32%" }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            className="h-full bg-indigo-600 rounded-full"
                        />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <motion.div 
                        whileHover={{ y: -5 }}
                        className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm"
                     >
                        <BarChart className="w-8 h-8 text-purple-500 mb-2" />
                        <div className="font-bold text-slate-800">Analytics</div>
                        <div className="text-xs text-slate-500">Module 3</div>
                     </motion.div>
                     <motion.div 
                        whileHover={{ y: -5 }}
                        className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm"
                     >
                        <Users className="w-8 h-8 text-blue-500 mb-2" />
                        <div className="font-bold text-slate-800">Interviews</div>
                        <div className="text-xs text-slate-500">Assignment 4</div>
                     </motion.div>
                  </div>
                  
                  {/* Next Lesson Preview */}
                  <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                         <div className="p-2 bg-indigo-200 rounded-lg text-indigo-700"><Play className="w-4 h-4 fill-current"/></div>
                         <div>
                            <div className="text-xs font-bold text-indigo-400 uppercase">Up Next</div>
                            <div className="font-bold text-indigo-900 text-sm">User Persona Workshop</div>
                         </div>
                     </div>
                     <ChevronDown className="text-indigo-400 w-4 h-4" />
                  </div>
               </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center gap-3 z-20"
            >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 relative">
                    <CheckCircle className="w-6 h-6" />
                    <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">Offer Received</p>
                    <p className="font-bold text-slate-900">Product Manager</p>
                </div>
            </motion.div>
            
            <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -top-10 -right-5 bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 z-0 opacity-80 backdrop-blur-sm"
            >
                <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span className="font-bold text-sm">Top 1%</span>
                </div>
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[80%] h-full bg-amber-500 rounded-full"></div>
                </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Companies / Social Proof */}
      <section className="py-10 border-y border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Curriculum Validated By PMs From</p>
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-60"
          >
             <span className="text-2xl font-bold font-serif hover:grayscale-0 transition-all cursor-default">Google</span>
             <span className="text-2xl font-bold font-sans tracking-tighter hover:grayscale-0 transition-all cursor-default">Uber</span>
             <span className="text-2xl font-bold font-mono hover:grayscale-0 transition-all cursor-default">Notion</span>
             <span className="text-2xl font-bold font-sans italic hover:grayscale-0 transition-all cursor-default">Spotify</span>
             <span className="text-2xl font-bold font-serif tracking-wide hover:grayscale-0 transition-all cursor-default">Airbnb</span>
             <span className="text-2xl font-bold font-sans hover:grayscale-0 transition-all cursor-default">Amazon</span>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Everything you need to <br/>break into Product.</h2>
          <p className="text-lg text-slate-600">We stripped away the fluff and focused on the exact skills, frameworks, and artifacts hiring managers look for.</p>
        </motion.div>

        <motion.div 
           variants={{
             hidden: { opacity: 0 },
             show: {
               opacity: 1,
               transition: { staggerChildren: 0.1 }
             }
           }}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <FeatureCard 
            icon={<Layers className="w-6 h-6 text-indigo-600" />}
            title="Structured 45-Day Path"
            description="No decision fatigue. Just log in and follow the daily roadmap from zero to job-ready."
            delay={0}
          />
          <FeatureCard 
            icon={<Briefcase className="w-6 h-6 text-purple-600" />}
            title="Portfolio Building"
            description="Don't just learn. Build 3 real-world case studies (PRD, GTM, Analytics) to show recruiters."
            delay={0.1}
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-amber-600" />}
            title="AI-Powered Learning"
            description="Learn how to leverage modern AI tools to speed up discovery, writing, and analysis."
            delay={0.2}
          />
          <FeatureCard 
            icon={<Users className="w-6 h-6 text-pink-600" />}
            title="Interview Prep"
            description="Embedded mock interview questions and frameworks in every single module."
            delay={0.3}
          />
          <FeatureCard 
            icon={<CheckCircle className="w-6 h-6 text-green-600" />}
            title="No Prerequisites"
            description="Whether you're a student or switching careers, we start from the fundamentals."
            delay={0.4}
          />
          <FeatureCard 
            icon={<Star className="w-6 h-6 text-blue-600" />}
            title="Completely Free"
            description="We believe education should be accessible. No hidden fees, no paywalls."
            delay={0.5}
          />
        </motion.div>
      </section>

      {/* How it Works / Workflow */}
      <section id="curriculum" className="py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-20">
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900"></div>
         {/* Animated Grid Background */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-20 text-center"
            >
                How PM Launchpad Works
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
               {/* Connecting Line (Desktop) */}
               <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-white/10 -z-10">
                  <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: "100%" }}
                     transition={{ duration: 1.5, ease: "easeInOut" }}
                     viewport={{ once: true }}
                     className="h-full bg-indigo-500"
                  />
               </div>

               {[
                 { step: "01", title: "Sign Up", desc: "Create your free profile to track progress." },
                 { step: "02", title: "Daily Lessons", desc: "Spend 45 mins/day on theory & practice." },
                 { step: "03", title: "Build Portfolio", desc: "Complete assignments & case studies." },
                 { step: "04", title: "Get Hired", desc: "Use your new skills to ace interviews." }
               ].map((item, i) => (
                 <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="relative bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group"
                 >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-4 border-indigo-500 z-20 md:block hidden group-hover:scale-125 transition-transform"></div>
                    <div className="text-4xl font-bold text-white/10 mb-4 group-hover:text-indigo-400/30 transition-colors">{item.step}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-indigo-200">{item.desc}</p>
                 </motion.div>
               ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-20 text-center"
            >
              <button 
                onClick={() => navigate('/login')}
                className="px-10 py-5 bg-white text-indigo-900 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
              >
                Start Your Journey
              </button>
            </motion.div>
         </div>
      </section>

      {/* About / Vision */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div
           initial={{ scale: 0 }}
           whileInView={{ scale: 1 }}
           viewport={{ once: true }}
           className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-8 rotate-3"
        >
           <GraduationCap className="w-10 h-10" />
        </motion.div>
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-3xl md:text-5xl font-bold text-slate-900 mb-6"
        >
            Designed for Outcomes,<br/> Not Just Certificates.
        </motion.h2>
        <motion.p 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="text-xl text-slate-600 mb-8 leading-relaxed"
        >
           Most courses drown you in theory but leave you blank when a recruiter asks, "Show me what you've built." 
           PM Launchpad flips the script. We focus on the <span className="text-indigo-600 font-bold bg-indigo-50 px-2 rounded-lg">Job-To-Be-Done</span>: getting you hired. 
           Every day is designed to add a brick to your career foundation.
        </motion.p>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-slate-50 scroll-mt-20">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FAQItem q="Is this course really free?" a="Yes! We believe in democratizing access to product education. The entire 45-day curriculum is free." />
              <FAQItem q="Do I need a technical background?" a="No. While we cover technical concepts you need to know, you don't need to know how to code to be a great PM." />
              <FAQItem q="How much time does it take daily?" a="Expect to spend 45-60 minutes per day. This includes reading the lesson and working on the mini-assignment." />
              <FAQItem q="Will I get a certificate?" a="Yes, upon completing all 45 days and assignments, you will unlock a completion certificate to add to your LinkedIn." />
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
           <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">PM</div>
                 <span className="font-bold text-lg text-slate-800">Launchpad</span>
              </div>
              <p className="text-slate-500 text-sm">
                The open-source curriculum for aspiring Product Managers. Built with ❤️ for the community.
              </p>
           </div>
           
           <div>
             <h4 className="font-bold text-slate-900 mb-4">Product</h4>
             <ul className="space-y-2 text-sm text-slate-600">
               <li><button onClick={() => scrollToSection('curriculum')} className="hover:text-indigo-600 text-left transition-colors">Curriculum</button></li>
               <li><button onClick={() => navigate('/login')} className="hover:text-indigo-600 text-left transition-colors">Assignments</button></li>
               <li><button onClick={() => navigate('/login')} className="hover:text-indigo-600 text-left transition-colors">Community</button></li>
             </ul>
           </div>

           <div>
             <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
             <ul className="space-y-2 text-sm text-slate-600">
               <li><button onClick={() => navigate('/login')} className="hover:text-indigo-600 text-left transition-colors">PM Glossary</button></li>
               <li><button onClick={() => navigate('/login')} className="hover:text-indigo-600 text-left transition-colors">Interview Guide</button></li>
               <li><button onClick={() => navigate('/login')} className="hover:text-indigo-600 text-left transition-colors">Templates</button></li>
             </ul>
           </div>

           <div>
             <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
             <ul className="space-y-2 text-sm text-slate-600">
               <li><button className="hover:text-indigo-600 text-left transition-colors">Privacy Policy</button></li>
               <li><button className="hover:text-indigo-600 text-left transition-colors">Terms of Service</button></li>
             </ul>
           </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
           © 2024 PM Launchpad Academy. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -10, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
      className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all duration-300"
    >
       <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-700 transition-colors duration-300 hover:bg-indigo-50 hover:text-indigo-600 hover:scale-110">
         {icon}
       </div>
       <h3 className="font-bold text-xl text-slate-900 mb-3">{title}</h3>
       <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}

const FAQItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={false}
      animate={{ backgroundColor: isOpen ? "#fff" : "#fff" }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
      >
        {q}
        <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
        >
             <ChevronDown className="text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
