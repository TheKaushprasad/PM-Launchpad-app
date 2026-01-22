
import React from 'react';
import { 
  Bot, Brain, Cpu, Sparkles, Briefcase, 
  Target, CheckCircle, Zap, Layers, Search, 
  Lightbulb, Info, Activity, ShieldCheck,
  // Added Settings, MessageSquare, and RefreshCw to fix errors on lines 50, 189, and 198
  TrendingUp, Table, Settings, MessageSquare, RefreshCw
} from 'lucide-react';

export const Day28Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 28: What is Artificial Intelligence, Machine Learning and Deep Learning? 🚀</h1>
      
      <section className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">AI & Machine Learning</span>
          <p className="text-sm font-bold text-orange-700">
            Cover AI for Everyone <a href="https://learn.deeplearning.ai/courses/ai-for-everyone/lesson/i76hs/machine-learning" target="_blank" rel="noopener noreferrer" className="underline decoration-orange-300">https://learn.deeplearning.ai/courses/ai-for-everyone/lesson/i76hs/machine-learning</a>
          </p>
          <p className="text-lg font-black text-orange-900 leading-relaxed italic">
            "The goal is to simulate human intelligence to perform tasks like problem-solving, decision-making, learning, and planning."
          </p>
        </div>
      </section>

      <section className="space-y-12">
        <div className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
             <Bot className="text-orange-600" />
             1. Artificial Intelligence (AI) - The Broad Goal
           </h2>
           <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Definition</h4>
                 <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                   The science and engineering of making intelligent machines, especially intelligent computer programs. The goal is to simulate human intelligence to perform tasks like problem-solving, decision-making, learning, and planning.
                 </p>
              </div>
              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Scope</h4>
                 <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                   AI includes a vast array of techniques, both modern and old.
                 </p>
              </div>
              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Examples of AI (Non-ML)</h4>
                 <ul className="space-y-4 pt-2">
                    <li className="flex gap-4 items-start">
                       <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-orange-600 shrink-0 shadow-sm">
                          <Settings className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-xs font-black text-zinc-900">Rule-Based Systems (Expert Systems)</p>
                          <p className="text-[10px] font-bold text-zinc-500">Early AI where human experts encoded knowledge into if/then rules (e.g., a simple diagnostic tool).</p>
                       </div>
                    </li>
                    <li className="flex gap-4 items-start">
                       <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-orange-600 shrink-0 shadow-sm">
                          <Search className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-xs font-black text-zinc-900">Search Algorithms</p>
                          <p className="text-[10px] font-bold text-zinc-500">Algorithms used in older video games or route planners (A* search).</p>
                       </div>
                    </li>
                 </ul>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
             <Brain className="text-orange-600" />
             2. Machine Learning (ML) - The Modern Method for AI
           </h2>
           <p className="text-sm font-bold text-zinc-500 italic">ML is a subset of AI and is the dominant way to achieve AI today.</p>
           <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Definition</h4>
                 <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                   The practice of using algorithms to learn patterns from data and improve automatically, without being explicitly programmed for every scenario. Instead of writing rules, you feed the machine data and let it derive the rules.
                 </p>
              </div>
              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Scope</h4>
                 <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                   ML encompasses all methods that rely on data to improve performance.
                 </p>
              </div>
              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Key Techniques</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                       <p className="text-[10px] font-black text-orange-600 uppercase mb-1">Supervised Learning</p>
                       <p className="text-[10px] font-bold text-zinc-500">Classification, Regression</p>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                       <p className="text-[10px] font-black text-orange-600 uppercase mb-1">Unsupervised Learning</p>
                       <p className="text-[10px] font-bold text-zinc-500">Clustering, Dimensionality Reduction</p>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 col-span-full">
                       <p className="text-[10px] font-black text-orange-600 uppercase mb-1">Traditional Algorithms</p>
                       <p className="text-[10px] font-bold text-zinc-500">Decision Trees, Support Vector Machines (SVMs), Random Forests, K-Means.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
             <Cpu className="text-orange-600" />
             3. Deep Learning (DL) - A Specialized Type of ML
           </h2>
           <p className="text-sm font-bold text-zinc-500 italic">DL is a specialized subset of ML and is responsible for the recent breakthroughs in AI.</p>
           <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
              <div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Definition</h4>
                 <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                   A specific subfield of ML that uses Artificial Neural Networks with multiple processing layers (hence "deep") to learn complex patterns directly from large amounts of raw, unstructured data.
                 </p>
              </div>
              <div className="p-6 bg-zinc-900 text-white rounded-[2rem] space-y-3">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-400">Distinction from Traditional ML</h4>
                 <p className="text-xs font-medium text-zinc-400 leading-relaxed">
                   Traditional ML often requires a human to manually perform feature engineering (telling the algorithm what to look for, like a car's size). Deep Learning models can automatically extract the relevant features (like edges, shapes, and textures in an image) through its deep layers.
                 </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Key Techniques</h4>
                    <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl">
                       <p className="text-xs font-black text-zinc-900">Deep Neural Networks</p>
                       <p className="text-[10px] font-bold text-zinc-500 leading-relaxed">Including Convolutional Neural Networks (CNNs) for images and Recurrent Neural Networks (RNNs) and Transformers (used in LLMs) for sequence data like text.</p>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Examples</h4>
                    <ul className="space-y-2">
                       {['Image recognition', 'Natural language processing (powering LLMs)', 'Autonomous driving'].map((ex, i) => (
                          <li key={i} className="flex gap-2 items-center text-[10px] font-bold text-zinc-600">
                             <CheckCircle className="w-3 h-3 text-orange-500" /> {ex}
                          </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
          <Lightbulb className="text-amber-500" />
          What is Machine Learning in simpler terms?
        </h2>
        <p className="text-sm font-bold text-zinc-600 leading-relaxed">
          Machine learning is a branch of Artificial Intelligence that focuses on developing models and algorithms that let computers learn from data without being explicitly programmed for every task. In simple words, ML teaches the systems to think and understand like humans by learning from the data.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Briefcase className="text-orange-600" />
          Why should a PM learn this?
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Machine learning (ML) is critically important for an AI Product Manager (AI PM) because it is the fundamental technology underlying most Artificial Intelligence (AI) products. Understanding ML allows the AI PM to effectively define, develop, and manage these products.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { 
               title: "1. Defining and Scoping the Product", 
               items: [
                 "Feasibility Assessment: Determine if a problem is a good fit for ML.",
                 "Translating Problems: Translate business problems into ML tasks.",
                 "Data Strategy: Understand required data volume, quality, and labeling effort."
               ],
               icon: Target
             },
             { 
               title: "2. Collaboration and Communication", 
               items: [
                 "Working with Data Scientists: Speak the language (architecture, features, metrics).",
                 "Setting Expectations: Manage probabilistic uncertainty and failure modes.",
                 "Prioritization: Balance ML features with infrastructure like data pipelines."
               ],
               icon: MessageSquare
             },
             { 
               title: "3. Product Lifecycle Management", 
               items: [
                 "Monitoring Performance: Track data drift and performance metrics.",
                 "Continuous Improvement: Implement feedback loops to retrain models.",
                 "A/B Testing: Validate impact of ML models on user behavior."
               ],
               icon: RefreshCw
             },
             { 
               title: "4. Responsible AI and Ethics", 
               items: [
                 "Bias Mitigation: Monitor and prevent harmful outcomes in training data.",
                 "Explainability (XAI): Make model decisions transparent for regulators and users."
               ],
               icon: ShieldCheck
             }
           ].map((reason, i) => (
             <div key={i} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                      <reason.icon className="w-5 h-5" />
                   </div>
                   <h4 className="font-black text-zinc-900 text-sm">{reason.title}</h4>
                </div>
                <ul className="space-y-2">
                   {reason.items.map((item, idx) => (
                      <li key={idx} className="text-xs font-medium text-zinc-500 leading-relaxed flex gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-orange-200 mt-1.5 shrink-0" />
                         {item}
                      </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-orange-600" />
          Machine Learning Types
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Machine Learning is mainly divided into three core types:
        </p>

        <div className="space-y-12">
           {/* Supervised */}
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Supervised</div>
                 <h3 className="text-xl font-black text-zinc-900">Labeled Learning</h3>
              </div>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Supervised learning trains a model using labeled data where each input has a known correct output. The model learns by comparing its predictions with these correct answers and improves over time.
              </p>
              <div className="bg-white border border-zinc-100 rounded-[2rem] overflow-hidden shadow-sm">
                 <div className="bg-zinc-50 p-6 border-b border-zinc-100">
                    <p className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-1">Example: Patient Diagnosis</p>
                    <p className="text-[10px] font-bold text-zinc-400">Predict if a patient is healthy or sick based on gender and age.</p>
                 </div>
                 <div className="p-6">
                    <div className="overflow-x-auto">
                       <table className="w-full text-left text-xs font-medium border-collapse">
                          <thead>
                             <tr className="border-b border-zinc-100">
                                <th className="pb-3 pr-4 font-black text-zinc-900">Gender</th>
                                <th className="pb-3 px-4 font-black text-zinc-900">Age</th>
                                <th className="pb-3 pl-4 font-black text-indigo-600">Label</th>
                             </tr>
                          </thead>
                          <tbody className="text-zinc-500">
                             {['M,48,sick', 'M,67,sick', 'F,53,healthy', 'M,49,sick', 'F,32,healthy', 'M,34,healthy', 'M,21,healthy'].map((row, i) => {
                                const [g, a, l] = row.split(',');
                                return (
                                   <tr key={i} className="border-b border-zinc-50 last:border-0">
                                      <td className="py-3 pr-4">{g}</td>
                                      <td className="py-3 px-4">{a}</td>
                                      <td className={`py-3 pl-4 font-bold ${l === 'sick' ? 'text-rose-500' : 'text-emerald-500'}`}>{l}</td>
                                   </tr>
                                );
                             })}
                          </tbody>
                       </table>
                    </div>
                    <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                       <p className="text-xs font-bold text-indigo-900 leading-relaxed italic">
                         In this example, supervised learning is to use this labeled data to train a model that can predict the label ("healthy" or "sick") for new patients. For example if a new patient i.e Male with 50 years old visits the clinic, the model can classify whether the patient is "healthy" or "sick" based on patterns learned during training.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Unsupervised */}
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Unsupervised</div>
                 <h3 className="text-xl font-black text-zinc-900">Hidden Patterns</h3>
              </div>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Unsupervised learning works with unlabeled data where no correct answers or categories are provided. The model's job is to find the data, hidden patterns, similarities or groups on its own.
              </p>
              <div className="bg-white border border-zinc-100 rounded-[2rem] overflow-hidden shadow-sm p-6">
                 <p className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-4">Example: Clustering Patients</p>
                 <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 mb-6">
                    {['M,48', 'M,67', 'F,53', 'M,49', 'F,34', 'M,21'].map((row, i) => (
                       <div key={i} className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-center">
                          <p className="text-[10px] font-black text-zinc-400">{row.split(',')[0]}</p>
                          <p className="text-xs font-black text-zinc-900">{row.split(',')[1]}</p>
                       </div>
                    ))}
                 </div>
                 <p className="text-xs font-bold text-emerald-900 leading-relaxed italic p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    Here unsupervised learning looks for patterns or groups within the data on its own. For example, it might cluster patients by age or gender and group them into categories like "younger healthy patients" or "older patients" without knowing their health status.
                 </p>
              </div>
           </div>

           {/* Reinforcement */}
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="px-4 py-1.5 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Reinforcement</div>
                 <h3 className="text-xl font-black text-zinc-900">Trial & Reward</h3>
              </div>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Reinforcement Learning (RL) trains an agent to make decisions by interacting with an environment. Instead of being told the correct answers, the agent learns by trial and error method and gets rewards for good actions and penalties for bad ones.
              </p>
              <div className="bg-zinc-900 text-white p-8 rounded-[2rem] space-y-6 border-l-8 border-amber-500">
                 <div className="flex items-center gap-3">
                    <Zap className="text-amber-400 w-5 h-5" />
                    <h4 className="text-xs font-black uppercase tracking-widest">Example: Fruit Identification</h4>
                 </div>
                 <p className="text-sm font-medium text-zinc-400 leading-relaxed">
                    While Identifying a Fruit, the system receives an input for example an apple and initially makes an incorrect prediction like "It's a mango". Feedback is provided to correct the error "Wrong! It's an apple" and the system updates its model based on this feedback.
                 </p>
                 <p className="text-sm font-bold text-amber-200 italic">
                    Over time it learns to respond correctly that "It's an apple" when getting similar inputs and also improves accuracy.
                 </p>
              </div>
           </div>
        </div>
      </section>

      <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
          <Info className="text-orange-600" />
          The Bottom Line
        </h2>
        <div className="space-y-4">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             AI proficiency isn't just about understanding the tech; it's about identifying where it creates 10x value.
           </p>
           <p className="text-sm font-bold text-zinc-700 leading-relaxed italic border-l-4 border-orange-500 pl-4">
             "For a PM, the biggest risk isn't choosing the wrong algorithm—it's choosing the wrong problem to solve with AI."
           </p>
        </div>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day28Content;
