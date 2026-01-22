
import React from 'react';
import { 
  Bot, Brain, Cpu, Zap, Layers, Activity, 
  List, Search, ShieldCheck, TrendingUp, 
  MessageSquare, Settings, Target, RefreshCw, 
  MonitorPlay, Info, Sparkles, Database, 
  Terminal, Layout, ArrowRight, BookOpen, Share2, Filter, 
  CheckCircle, FileText
} from 'lucide-react';

export const Day32Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 32: Retrieval Augmented Generation (RAG) 🚀</h1>
      
      <section className="bg-orange-50 p-10 rounded-[3rem] border border-orange-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">AI Module</span>
          <p className="text-lg font-black text-orange-900 leading-relaxed italic">
            "One of the most powerful applications enabled by LLMs is sophisticated question-answering (Q&A) chatbots. These use a technique known as Retrieval Augmented Generation."
          </p>
          <a 
            href="https://youtu.be/fZM3oX4xEyg?si=lIBXXip-Qh0z962l" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-900 transition-colors"
          >
            Watch Intro to RAG <MonitorPlay className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Info className="text-orange-600" />
          Understanding the Problem RAG Solves
        </h2>
        <div className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             When an LLM, such as ChatGPT, is asked a question about private data—like a company’s reimbursement policy—it cannot access that private document. In this situation, the LLM lacks the necessary context and will typically hallucinate (provide an incorrect or generic answer).
           </p>
           <div className="bg-orange-50 p-6 rounded-2xl border-l-4 border-orange-500 italic">
             "In such a scenario we will give the entire office policy document/content to ChatGPT and then it will be able to refer to the company’s reimbursement policy and answer the asked question."
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-orange-600" />
          The Three Components of RAG
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { 
               title: "1. Retrieval (R)", 
               desc: "The system looks up internal documents (or external knowledge bases) and retrieves the relevant information.", 
               icon: Search,
               color: "text-indigo-600",
               bgColor: "bg-indigo-50"
             },
             { 
               title: "2. Augmenting (A)", 
               desc: "Using the retrieved information to improve or augment the user’s prompt before it is sent to the LLM.", 
               icon: Zap,
               color: "text-amber-600",
               bgColor: "bg-amber-50"
             },
             { 
               title: "3. Generation (G)", 
               desc: "The final step where the LLM generates a response based on the context provided in the augmented prompt.", 
               icon: Bot,
               color: "text-emerald-600",
               bgColor: "bg-emerald-50"
             }
           ].map((comp, i) => (
             <div key={i} className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${comp.bgColor} flex items-center justify-center ${comp.color} shadow-sm`}>
                  <comp.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-zinc-900 text-sm mb-1">{comp.title}</h4>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">{comp.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <RefreshCw className="text-orange-600" />
          RAG VS Fine Tuning VS Prompt Engineering
        </h2>
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="py-4 px-6 font-black text-zinc-900">Concept</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Purpose</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Type of Info</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Mechanism</th>
                  <th className="py-4 px-6 font-black text-zinc-900">Example Use Case</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">RAG</td>
                  <td className="py-4 px-6">Accurate responses via dynamic retrieval</td>
                  <td className="py-4 px-6">Dynamic factual info (Internal policies)</td>
                  <td className="py-4 px-6">Retrieval → Augmentation → Generation</td>
                  <td className="py-4 px-6 text-[10px]">Employee asking about home office setup policies.</td>
                </tr>
                <tr className="border-b border-zinc-50">
                  <td className="py-4 px-6 font-bold text-zinc-900">Fine Tuning</td>
                  <td className="py-4 px-6">Impart stable patterns (style, tone, jargon)</td>
                  <td className="py-4 px-6">Communication style, specific language</td>
                  <td className="py-4 px-6">Retraining model on sample Q&A sets</td>
                  <td className="py-4 px-6 text-[10px]">Co-pilot with CEO's voice/accent and unique jargon.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-zinc-900">Prompt Engineering</td>
                  <td className="py-4 px-6">Apply restrictions and security rules</td>
                  <td className="py-4 px-6">Behavioral control, security rule book</td>
                  <td className="py-4 px-6">Strict instructions in system prompt</td>
                  <td className="py-4 px-6 text-[10px]">Restricting chat about salaries or personal employee info.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
          <Activity className="text-orange-600" />
          The Engine of RAG: Search Types
        </h2>

        {/* Keyword Search */}
        <div className="space-y-6">
           <h3 className="text-xl font-black text-zinc-900 flex items-center gap-3">
             <Filter className="text-indigo-600" />
             Keyword Search
           </h3>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Traditional approach finding information based on <strong>exact word matches</strong>.
           </p>
           <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-200 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Mechanism</h4>
                    <ul className="space-y-3">
                       <li className="text-xs font-bold text-zinc-700 flex gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                         <strong>Ranking:</strong> Based on occurrence and frequency of query terms.
                       </li>
                       <li className="text-xs font-bold text-zinc-700 flex gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                         <strong>TF-IDF:</strong> Uses an analyzer to calculate word importance scores.
                       </li>
                       <li className="text-xs font-bold text-zinc-700 flex gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                         <strong>BM25:</strong> Stricter scoring for important and unique words.
                       </li>
                    </ul>
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Limitations</h4>
                    <p className="text-xs font-medium text-rose-600 leading-relaxed italic">
                      "Lack of semantic understanding: synonyms cause search to fail (e.g., 'allowance' vs 'reimbursement'). Poor results for contextual phrases."
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Semantic Search */}
        <div className="space-y-6">
           <h3 className="text-xl font-black text-zinc-900 flex items-center gap-3">
             <Database className="text-emerald-600" />
             Semantic Search
           </h3>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Search based on <strong>meaning</strong>, not just word overlap.
           </p>
           <div className="bg-zinc-900 text-white p-10 rounded-[3rem] space-y-8 border-t-8 border-emerald-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Step 1: Embeddings</h4>
                    <p className="text-xs font-medium text-zinc-400 leading-relaxed">
                      Convert query and documents into mathematical vectors (arrays of numbers) representing meaning.
                    </p>
                 </div>
                 <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Step 2: Vector Space</h4>
                    <p className="text-xs font-medium text-zinc-400 leading-relaxed">
                      Vectors act as coordinates in high-dimensional space. Similar meanings cluster together (e.g., "dogs" and "pets").
                    </p>
                 </div>
                 <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Step 3: Dot Product</h4>
                    <p className="text-xs font-medium text-zinc-400 leading-relaxed">
                      "Mathematical ruler" measuring distance. Shorter distance = higher similarity score (0 to 1).
                    </p>
                 </div>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 italic text-[11px] text-zinc-500">
                Similarity Example: "Dogs vs pets" = 73.3% similarity | "Dogs vs remote" = 36.2% similarity.
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Database className="text-orange-600" />
          Technical Infrastructure
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-orange-600" />
                Embedding Models
              </h4>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                Fundamental components taking text and converting it into meaning-rich numbers (vectors).
              </p>
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 font-mono text-[10px] text-zinc-400">
                Example: All Mini LM L6V2 Model
              </div>
           </div>

           <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm space-y-4">
              <h4 className="font-black text-zinc-900 flex items-center gap-2">
                <Layout className="w-5 h-5 text-indigo-600" />
                Vector Databases
              </h4>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                Efficiently store and search vectors. Acts as a "smart librarian" grouping vectors into neighborhoods.
              </p>
              <div className="flex gap-4">
                 <div className="flex-1 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <p className="text-[10px] font-black text-zinc-900">Chroma</p>
                    <p className="text-[9px] text-zinc-400">Open-source / Local</p>
                 </div>
                 <div className="flex-1 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <p className="text-[10px] font-black text-zinc-900">Pinecone</p>
                    <p className="text-[9px] text-zinc-400">Managed Service / Scalable</p>
                 </div>
              </div>
              <div className="pt-2 text-[9px] font-bold text-indigo-600 uppercase tracking-widest">
                 HNSW: Hierarchical Navigable Small World algorithm
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Settings className="text-orange-600" />
          Chunking: The Precision Problem
        </h2>
        <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-200 space-y-6">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Breaking down large documents into smaller pieces called <strong>chunks</strong>. Crucial for avoiding overwhelming the model with irrelevant context.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                 <h5 className="text-[10px] font-black uppercase text-zinc-400">Fixed Size</h5>
                 <p className="text-xs font-bold text-zinc-700">Split into predetermined sizes (e.g., 500 characters).</p>
              </div>
              <div className="space-y-2">
                 <h5 className="text-[10px] font-black uppercase text-orange-600">Overlap</h5>
                 <p className="text-xs font-bold text-zinc-700">Crucial context preservation between splits (e.g., 50-100 characters).</p>
              </div>
              <div className="space-y-2">
                 <h5 className="text-[10px] font-black uppercase text-zinc-400">Content-Based</h5>
                 <p className="text-xs font-bold text-zinc-700">Split by sentence or paragraph boundaries.</p>
              </div>
           </div>
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
          <RefreshCw className="text-orange-600" />
          The RAG Pipeline
        </h2>

        {/* Phase 1 */}
        <div className="space-y-6">
           <div className="flex items-center gap-4">
              <div className="px-4 py-1.5 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Phase 1</div>
              <h3 className="text-xl font-black text-zinc-900">The Data Preparation Pipeline (Ingestion)</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Document Chunking", desc: "Break 50-page docs into focused pieces to solve the precision problem.", icon: FileText },
                { title: "Embedding Generation", desc: "Convert chunks into vectors using an embedding model.", icon: Cpu },
                { title: "Storage in Vector DB", desc: "Load vectors into Chroma or Pinecone for instant retrieval.", icon: Database }
              ].map((step, i) => (
                <div key={i} className="p-6 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-3">
                   <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                      <step.icon className="w-5 h-5" />
                   </div>
                   <h4 className="font-black text-zinc-900 text-sm">{step.title}</h4>
                   <p className="text-[10px] font-medium text-zinc-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Phase 2 */}
        <div className="space-y-6">
           <div className="flex items-center gap-4">
              <div className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Phase 2</div>
              <h3 className="text-xl font-black text-zinc-900">The Query-Time Execution Flow (R-A-G)</h3>
           </div>
           <div className="space-y-4">
              {[
                { label: "Retrieval (R)", text: "User query converts to vector. Semantic search finds closest chunks in Vector DB using dot product." },
                { label: "Augmentation (A)", text: "Retrieved context combines with original question to create context-augmented prompt." },
                { label: "Generation (G)", text: "LLM receives question + context and produces a factual, accurate response." }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 p-8 bg-zinc-50 border border-zinc-200 rounded-[2.5rem] items-center">
                   <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 font-black text-lg shadow-sm shrink-0 border border-zinc-100">{step.label[0]}</div>
                   <div>
                      <h4 className="font-black text-zinc-900 text-sm mb-1">{step.label}</h4>
                      <p className="text-xs font-medium text-zinc-500 leading-relaxed">{step.text}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="bg-zinc-900 text-white p-10 rounded-[3rem] border-t-8 border-orange-500">
        <h2 className="text-2xl font-black text-orange-400 flex items-center gap-3 mb-6">
          <Sparkles className="text-orange-400" />
          The Bottom Line
        </h2>
        <div className="space-y-4">
           <p className="text-sm font-bold text-zinc-300 leading-relaxed">
             RAG is the standard for building reliable AI agents that can interact with private, dynamic, and massive datasets without retraining the base LLM. For PMs, it means building products that are truly "grounded" in facts.
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

export default Day32Content;
