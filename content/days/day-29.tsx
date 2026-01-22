import React from 'react';
import { 
  Bot, Brain, Cpu, Zap, Layers, Activity, 
  List, Search, ShieldCheck, TrendingUp, 
  MessageSquare, Settings, Target, RefreshCw, 
  Play, ArrowRight, MonitorPlay, Info,
  // Added CheckCircle and Briefcase to fix "Cannot find name" errors
  CheckCircle, Briefcase
} from 'lucide-react';

export const Day29Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 29: LLM 🚀</h1>
      
      <section className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">AI & LLMs</span>
          <p className="text-lg font-black text-orange-900 leading-relaxed italic">
            "Fundamentally a neural network designed to be a highly sophisticated predictive system for text."
          </p>
          <a 
            href="https://youtu.be/7xTGNNLPyMI?si=_FGxNCEjJcvyxdAz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-900 transition-colors"
          >
            Watch Video Lesson <MonitorPlay className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Brain className="text-orange-600" />
          What is an LLM?
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          A Large Language Model (LLM) is fundamentally a neural network designed to be a highly sophisticated predictive system for text.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "1. Statistical Token Simulator",
              desc: "At its core, an LLM is a complex mathematical function trained to model the statistical relationships of how tokens follow each other in a sequence. The training process involves taking input token sequences and generating an output that predicts the probability of the next token.",
              icon: Activity
            },
            {
              title: "2. Internet Document Simulator",
              desc: "The initial output of the first stage (pre-training) is the base model, which acts as an internet document simulator. It stores knowledge acquired from processing vast amounts of internet text in billions of parameters (weights) — a lossy compression of the internet.",
              icon: Layers
            },
            {
              title: "3. An Assistant",
              desc: "Most commercially used LLMs, such as ChatGPT, are not just base models; they are models that have gone through post-training stages to transform them into an assistant programmed to be knowledgeable and helpful.",
              icon: Bot
            }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
               <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-sm">
                  <item.icon className="w-6 h-6" />
               </div>
               <h4 className="font-black text-zinc-900 text-sm mb-1">{item.title}</h4>
               <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Zap className="text-orange-600" />
          Why do we need it? / Why are companies using it?
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Companies are heavily invested in building and deploying LLMs because they represent a powerful class of tools that accelerate work, drive innovation, and unlock complex computational abilities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {[
             { title: "Acceleration and Wealth Creation", desc: "LLMs are extremely useful as tools for work and dramatically accelerate work. The expectation is that they will lead to a huge amount of wealth creation." },
             { title: "Creating High-Quality Assistants", desc: "The central goal is to create an assistant that is helpful, truthful, and harmless, capable of answering a wide variety of questions and taking on a specific personality." },
             { title: "Advanced Reasoning and Thinking", desc: "Reinforcement Learning (RL) leads to the emergence of advanced reasoning capabilities. RL encourages the model to discover 'chains of thought' or cognitive strategies." },
             { title: "Tool Utilization", desc: "LLMs can be trained to use external tools (Web Search, Code Interpreter) which mitigates major shortcomings like hallucinations and precise calculations." }
           ].map((item, i) => (
             <div key={i} className="p-6 bg-zinc-50 border border-zinc-200 rounded-3xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-orange-600 shadow-sm shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-black text-zinc-900 text-sm mb-1">{item.title}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Briefcase className="text-orange-600" />
          Why should a product manager learn about it?
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          A product manager (PM) should learn about LLMs not just for their capabilities, but specifically for their limitations and the proper techniques required to deploy them effectively and reliably.
        </p>

        <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-medium border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="py-4 px-6 font-black text-zinc-900 w-1/3">LLM Characteristic</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Implication for Product/User Experience</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Stochastic and Imperfect</td>
                  <td className="py-4 px-6">LLMs are stochastic systems (relying on probability and sampling). They must be used as a tool in a toolbox and should not be fully trusted. The user must check and verify the output.</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Hallucinations</td>
                  <td className="py-4 px-6">LLMs are prone to hallucinations (fabricating information). A PM must understand the need for safeguards like tool use (web search) and specific training to allow the model to admit when it doesn't know an answer.</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Vague Knowledge vs. Working Memory</td>
                  <td className="py-4 px-6">The knowledge stored in the model's billions of parameters is a vague recollection. For high-quality results, the relevant information must be explicitly provided in the context window, which acts as the model's working memory.</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Swiss Cheese Capability Model</td>
                  <td className="py-4 px-6">Models have holes in the cheese. They can be brilliant in one domain but fail randomly at simple tasks like counting or spelling. This requires using specialized tools like code interpreters.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-zinc-900">Thinking Requires Tokens</td>
                  <td className="py-4 px-6">LLMs require an adequate number of tokens to perform computation. They cannot cram complex arithmetic into a single token. Product interfaces must encourage the model to generate intermediate results.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
          <Settings className="text-orange-600" />
          Stages of Building an LLM
        </h2>

        {/* First Stage */}
        <div className="space-y-8">
           <div className="flex items-center gap-4">
              <div className="px-4 py-1.5 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">First Stage</div>
              <h3 className="text-xl font-black text-zinc-900">The Pretraining Stage</h3>
           </div>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             The first and most computationally demanding stage. Responsible for the neural network acquiring foundational knowledge by internalizing statistical patterns in massive amounts of text.
           </p>

           <div className="space-y-6 pl-6 border-l-2 border-dashed border-zinc-200 ml-4">
              <div className="space-y-4">
                 <h4 className="text-base font-black text-zinc-900">Step 1 - Download and preprocess the Internet</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { name: "URL filtering", desc: "Ensure we do not fetch data from malware, Adult, or spam websites." },
                      { name: "Text Extraction", desc: "Fetching the textual data of the Websites." },
                      { name: "Language Filtering", desc: "Filter by condition. Ex: scrape only if >50% english." },
                      { name: "Gopher Filtering", desc: "Ensure reliability, factual grounding, and safety." },
                      { name: "MinHash Dedup", desc: "Technique for detecting and removing near-duplicate items." },
                      { name: "C4 filters", desc: "Data filtering process used in building the Colossal Clean Crawled Corpus." },
                      { name: "Custom filters", desc: "Additional filters for model goals, safety, and domain focus." },
                      { name: "PII Removal", desc: "Removal of Personally Identifiable Information." }
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm">
                         <p className="text-[10px] font-black text-orange-600 uppercase mb-1">{item.name}</p>
                         <p className="text-[10px] font-bold text-zinc-500 leading-tight">{item.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-base font-black text-zinc-900">Step 2 - Tokenization</h4>
                 <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-200 space-y-4">
                    <p className="text-sm font-medium text-zinc-600">The process of converting raw text into smaller units called tokens — the building blocks LLMs use to understand and generate language.</p>
                    <ul className="space-y-2">
                       <li className="text-xs font-bold text-zinc-500 flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" /> <strong>Byte-Pair Encoding (BPE):</strong> Iterative process that shrinks sequence length in return for more symbols.</li>
                       <li className="text-xs font-bold text-zinc-500 flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" /> <strong>Vocabulary Size:</strong> Around 100,000 possible symbols. Each token has a unique ID (number).</li>
                    </ul>
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-base font-black text-zinc-900">Step 3 - Neural Network Training</h4>
                 <div className="p-8 bg-zinc-900 text-white rounded-[2.5rem] space-y-4 border-t-4 border-orange-500">
                    <p className="text-xs font-black uppercase tracking-widest text-orange-400">Modeling Statistical Relationships</p>
                    <ul className="space-y-3">
                       {[
                         "Objective: Model statistical relationships of how tokens follow each other.",
                         "Prediction Task: Neural network predicts the next token in the sequence (Next-Token Prediction).",
                         "Output: A probability distribution over the entire vocabulary (e.g., 100,277 numbers).",
                         "Optimization: Mathematical process adjusts parameters to increase probability of correct tokens.",
                         "Monitoring Loss: Researchers monitor 'loss' and update parameters to decrease it."
                       ].map((text, i) => (
                         <li key={i} className="text-xs font-bold text-zinc-400 flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                            {text}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </div>

        {/* Second Stage */}
        <div className="space-y-8">
           <div className="flex items-center gap-4">
              <div className="px-4 py-1.5 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Second Stage</div>
              <h3 className="text-xl font-black text-zinc-900">The post-training stage</h3>
           </div>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Responsible for transforming the pre-trained model—merely an internet document simulator—into a helpful, conversational assistant. Much less computationally expensive than pre-training.
           </p>

           <div className="p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm space-y-6">
              <h4 className="text-lg font-black text-zinc-900">1. Supervised Fine-Tuning (SFT)</h4>
              <p className="text-sm font-medium text-zinc-500">Teaches the model its persona and conversational abilities. Programming is done implicitly via datasets of conversations.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                 <div className="space-y-4">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-orange-600">Mechanism</h5>
                    <ul className="space-y-2 text-xs font-bold text-zinc-600">
                       <li>• <strong>Data Swap:</strong> Discard massive internet dataset.</li>
                       <li>• <strong>Conversation Data:</strong> Millions of high-quality multi-turn conversations.</li>
                       <li>• <strong>Rapid Adjustment:</strong> Often taking around 3 hours.</li>
                    </ul>
                 </div>
                 <div className="space-y-4">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-orange-600">Data Creation</h5>
                    <ul className="space-y-2 text-xs font-bold text-zinc-600">
                       <li>• <strong>Human Labelers:</strong> Contractors creating ideal responses.</li>
                       <li>• <strong>Labeling Instructions:</strong> Helpful, truthful, and harmless.</li>
                       <li>• <strong>Statistical Imitation:</strong> Mimicking expert solutions from textbooks.</li>
                    </ul>
                 </div>
              </div>
           </div>
        </div>

        {/* Third Stage */}
        <div className="space-y-8">
           <div className="flex items-center gap-4">
              <div className="px-4 py-1.5 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Third Stage</div>
              <h3 className="text-xl font-black text-zinc-900">Reinforcement Learning (RL)</h3>
           </div>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Move beyond imitating examples to refining problem-solving capabilities. Allowing the model to discover internal cognitive strategies that lead to correct answers.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] space-y-4">
                 <h4 className="font-black text-zinc-900 text-sm uppercase tracking-widest">Emergent Thinking</h4>
                 <ul className="space-y-2">
                    <li className="text-xs font-bold text-zinc-600"><strong>Chains of Thought:</strong> Model spreads reasoning across many tokens, performing self-evaluations.</li>
                    <li className="text-xs font-bold text-zinc-600"><strong>Higher Accuracy:</strong> Significant increase in accuracy in verifiable domains like math and code.</li>
                 </ul>
              </div>
              <div className="p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] space-y-4">
                 <h4 className="font-black text-zinc-900 text-sm uppercase tracking-widest">RL from Human Feedback (RLHF)</h4>
                 <ul className="space-y-2">
                    <li className="text-xs font-bold text-zinc-600"><strong>Human Ordering:</strong> Labelers rank candidate responses from best to worst.</li>
                    <li className="text-xs font-bold text-zinc-600"><strong>Reward Model:</strong> Separate neural network trained to output a score consistent with human preferences.</li>
                 </ul>
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
           <p className="text-sm font-medium text-zinc-600 leading-relaxed italic">
             "For Subjective Tasks: Use RLHF. For Verifiable Tasks (Math/Code): Use RL with scoring. RLHF improves performance but can be 'gamed' by the optimizer."
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

export default Day29Content;