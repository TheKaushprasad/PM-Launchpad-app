
import React from 'react';
import { 
  Target, CheckCircle, Lightbulb, Zap, ArrowRight, ArrowLeft,
  Layers, BarChart, TrendingUp, TrendingDown, RefreshCcw, Ship, Hammer, Box, Search, Users, Activity
} from 'lucide-react';

export const Day3Content = () => {
  return (
    <div className="space-y-10 text-left">
      <h1 className="text-3xl font-black tracking-tight text-zinc-900">Day 3: Product Life Cycle (PLC) & PLM 🚀</h1>
      
      <section className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Foundation</span>
          <p className="text-lg font-medium text-blue-900 leading-relaxed">
            Understand how products evolve in the market over time and how companies manage that journey.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Activity className="text-indigo-600" />
          1. What is Product Life Cycle (PLC)?
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Product Life Cycle is the journey a product goes through in the market — from the day it is launched to the day it is eventually retired.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900">What Are the 4 Stages of Product Life Cycle?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Introduction",
              desc: "This is when a new product is first introduced to the market. Sales are usually low because customers are just starting to become aware of the product, and marketing efforts are focused on building awareness and generating interest. Companies may be investing heavily in research and development during this stage.",
              icon: Zap,
              color: "bg-amber-50 border-amber-100 text-amber-700"
            },
            {
              title: "Growth",
              desc: "In this stage, the product starts to gain interest. Sales begin to increase as more customers become aware of the product and start buying it. Marketing efforts now focus on expanding market share and building brand loyalty. Competitors may also start entering the market during this stage.",
              icon: TrendingUp,
              color: "bg-emerald-50 border-emerald-100 text-emerald-700"
            },
            {
              title: "Maturity",
              desc: "This is the stage of peak sales. The product has reached its maximum market penetration, and sales growth starts to level off. Competition is usually intense, and companies may need to focus on differentiating their product through added features, improved quality, or competitive pricing.",
              icon: BarChart,
              color: "bg-blue-50 border-blue-100 text-blue-700"
            },
            {
              title: "Decline",
              desc: "In the decline stage, sales begin to decline as customer preferences change, new technologies emerge, or market saturation occurs. Companies may choose to discontinue the product or try to extend it via strategies like updates, new marketing, or new segments.",
              icon: TrendingDown,
              color: "bg-rose-50 border-rose-100 text-rose-700"
            }
          ].map((stage, i) => (
            <div key={i} className={`p-8 rounded-[2.5rem] border ${stage.color} space-y-4 shadow-sm`}>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                   <stage.icon className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-black">{stage.title}</h3>
              </div>
              <p className="text-sm font-medium leading-relaxed opacity-90">{stage.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-indigo-600" />
          2. What is Product Lifecycle Management (PLM)?
        </h2>
        <div className="bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-200 space-y-4">
          <p className="text-zinc-600 font-medium leading-relaxed">
            Product Lifecycle Management (PLM) is the practice of managing a product from its initiation to its eventual retirement through a systematic approach.
          </p>
          <p className="text-zinc-600 font-medium leading-relaxed">
            It's a system that helps manage every step of a product's life, from the initial idea and design to manufacturing, distribution, and even after it's sold. It's a way for companies to keep track of all the details and make sure everyone involved is on the same page throughout the product's journey. So, in simpler terms, PLM is like a guidebook that helps companies manage their products from start to finish.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-black text-zinc-900">Stages of a Product in PLM</h2>
        
        <div className="space-y-4">
          {[
            { stage: "Concept Stage", goal: "The start of making a new product. Involves initial ideas and planning, market research, identifying customer needs, and determining feasibility. Usually R&D takes the lead.", icon: Search },
            { stage: "Design Stage", goal: "Careful plan for the product, building prototypes, and testing everything. Ensuring the design meets all rules and safety standards. Significant R&D spend happens here.", icon: Hammer },
            { stage: "Production Stage", goal: "Making the product at scale—getting materials, putting everything together, and quality checks. Design changes should be minimal at this point.", icon: Box },
            { stage: "Sales Stage", goal: "About telling people about the product and getting them to buy it via advertisements, prices, and special deals. Forecasting is crucial.", icon: Zap },
            { stage: "Support Stage", goal: "Ongoing customer support including customer service, warranties, repairs, and services or training to enhance user experience.", icon: Users },
            { stage: "Retirement Stage", goal: "The life of the product ends due to better products, preference shifts, or tech moves. Includes responsible recycling or find new uses.", icon: Ship }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 p-6 bg-white border border-zinc-100 rounded-[2rem] shadow-sm items-start">
               <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-inner">
                 <item.icon className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-black text-zinc-900 mb-1">{item.stage}</h4>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed">{item.goal}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 text-white p-12 rounded-[3.5rem] space-y-8">
        <h2 className="text-2xl font-black text-indigo-400">Benefits of PLM</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Improved Collaboration", desc: "PLM encourages cross-functional collaboration, ensuring that all stakeholders, from design to sales, work together seamlessly." },
            { title: "Enhanced Product Quality", desc: "By integrating quality control into each phase, PLM helps identify and rectify potential issues early, resulting in higher-quality products." },
            { title: "Efficient Resource Utilization", desc: "Streamlines processes, reducing waste and optimizing resource utilization, leading to significant cost savings." },
            { title: "Faster Time-to-Market", desc: "A structured approach facilitates quicker development cycles, enabling companies to bring products to market more rapidly." },
            { title: "Regulatory Compliance", desc: "PLM systems assist in ensuring that products meet regulatory standards, minimizing the risk of legal and compliance issues." }
          ].map((benefit, i) => (
            <div key={i} className="space-y-3">
              <h4 className="font-black text-indigo-300">{benefit.title}</h4>
              <p className="text-xs font-bold leading-relaxed text-zinc-400">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-8 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day3Content;
