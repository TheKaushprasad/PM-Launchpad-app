import { CornsilkSection } from '../../components/CornsilkSection';
import React from 'react';
import { 
  Cloud, Server, ShieldCheck, Zap, Layers, Globe, 
  Activity, Database, Briefcase, Info, Smartphone, 
  Box, Cpu, TrendingUp, DollarSign, Target, RefreshCw, Share2,
  // Added missing icons to fix "Cannot find name" errors
  Bot, Send, BarChart, CheckCircle
} from 'lucide-react';

export const Day27Content = () => {
  return (
    <div className="space-y-4 md:space-y-5 text-left">
      <section className="bg-blue-50/70 p-3.5 sm:p-4 rounded-xl border border-blue-100/80">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Strategy</span>
          <p className="text-lg font-black text-indigo-900 leading-relaxed italic">
            "The cloud isn't just 'someone else's computer'—it's a paradigm shift."
          </p>
          <p className="text-sm font-bold text-indigo-700 leading-relaxed">
            Product managers don't need to architect cloud infrastructure, but understanding cloud computing fundamentally changes how you think about building products. Cloud decisions impact everything from your cost structure to feature velocity to competitive positioning.
          </p>
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Info className="text-indigo-600" />
          What Is Cloud Computing?
        </h2>
        <div className="bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-sm space-y-4">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Cloud computing means accessing computing resources—servers, storage, databases, networking, software—over the internet rather than owning and maintaining physical infrastructure.
           </p>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed italic border-l-4 border-indigo-100 pl-4">
             Instead of buying servers, installing them in a data center, managing power and cooling, and forecasting capacity years in advance, you rent computing resources on-demand, paying only for what you use, scaling up or down instantly.
           </p>
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             This shift from capital expenditure to operational expenditure, from fixed capacity to elastic scaling, and from months-long procurement to instant provisioning changes product economics and possibilities fundamentally.
           </p>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Layers className="text-indigo-600" />
          The Three Cloud Service Models
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-3.5">
           {[
             { 
               title: "Infrastructure as a Service (IaaS)", 
               desc: "Provides raw computing resources—virtual machines, storage, and networks. You control the OS and apps while the provider manages physical hardware.",
               example: "AWS EC2, GCE, Azure VM",
               icon: Server
             },
             { 
               title: "Platform as a Service (PaaS)", 
               desc: "Provides managed platforms for building and running apps. You focus on code while the provider manages middleware and runtimes.",
               example: "Heroku, Google App Engine",
               icon: Cpu
             },
             { 
               title: "Software as a Service (SaaS)", 
               desc: "Delivers complete applications over the internet. Users access software through browsers without installing or managing anything.",
               example: "Slack, Salesforce, Google Workspace",
               icon: Smartphone
             }
           ].map((model, i) => (
             <div key={i} className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <model.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-zinc-900 text-sm mb-1">{model.title}</h4>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">{model.desc}</p>
                <div className="pt-2">
                   <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Examples</p>
                   <p className="text-xs font-black text-indigo-600">{model.example}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Globe className="text-indigo-600" />
          Major Cloud Providers: AWS, Azure, and GCP
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5">
           <div className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-4 hover:border-indigo-200 transition-colors group">
              <h4 className="font-black text-zinc-900">AWS</h4>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                Pioneered modern cloud computing and remains the market leader. Offers the broadest portfolio—over 200 services. Maturity means extensive documentation and proven reliability.
              </p>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Strength: Breadth & Maturity</p>
           </div>
           <div className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-4 hover:border-indigo-200 transition-colors group">
              <h4 className="font-black text-zinc-900">Microsoft Azure</h4>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                Excels in hybrid cloud scenarios and enterprise integration. tight Office 365 and Active Directory integration makes it popular for large company migrations.
              </p>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Strength: Enterprise Ecosystem</p>
           </div>
           <div className="p-4 sm:p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm space-y-4 hover:border-indigo-200 transition-colors group">
              <h4 className="font-black text-zinc-900">Google Cloud (GCP)</h4>
              <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                Leads in data analytics, machine learning, and Kubernetes. BigQuery offers unmatched performance. TensorFlow and other AI tools integrate seamlessly.
              </p>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Strength: Data & AI</p>
           </div>
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <DollarSign className="text-indigo-600" />
          Cloud Economics: Pricing Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3.5">
           {[
             { title: "Pay-as-you-go", desc: "Pay only for resources consumed. Enables cheap experimentation with MVPs and prototypes." },
             { title: "Elastic Scaling", desc: "Match capacity to demand automatically. Start small and scale based on actual growth." },
             { title: "Variable Costs", desc: "Infrastructure costs scale directly with usage, changing unit economics calculations." },
             { title: "Ongoing Optimization", desc: "Right-sized instances and reserved capacity directly improve product margins." }
           ].map((item, i) => (
             <div key={i} className="p-4 bg-zinc-50 border border-zinc-200 rounded-3xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-black text-zinc-900 text-sm mb-1">{item.title}</h4>
                   <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Box className="text-indigo-600" />
          Cloud-Native Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3.5">
           {[
             { title: "Microservices", desc: "Break monolithic apps into small, independent services communicating through APIs." },
             { title: "Serverless", desc: "Execute code in response to events without managing servers at all (e.g., AWS Lambda)." },
             { title: "Containerization", desc: "Packages apps with all dependencies into portable containers (e.g., Docker & Kubernetes)." },
             { title: "API-first Design", desc: "Expose functionality through well-designed APIs that any interface can consume." }
           ].map((item, i) => (
             <div key={i} className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm space-y-2">
                <h4 className="font-black text-zinc-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Database className="text-indigo-600" />
          Cloud Services That Enable Product Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {[
             { name: "Managed Databases", desc: "AWS RDS, Cloud SQL. Scaling & backups handled automatically.", icon: Database },
             { name: "Object Storage", desc: "AWS S3. Virtually unlimited file storage for media-heavy products.", icon: Box },
             { name: "CDNs", desc: "Distribute content globally for fast access anywhere.", icon: Globe },
             { name: "ML Services", desc: "Pre-built models for NLP, vision, and recommendations.", icon: Bot },
             { name: "Auth & Identity", desc: "Handle user registration, login, and MFA using managed services.", icon: ShieldCheck },
             { name: "Messaging & Queues", desc: "Enable asynchronous communication for reliable background processing.", icon: Send },
             { name: "Data Warehouses", desc: "Google BigQuery, Redshift. Large-scale data analysis in seconds.", icon: BarChart },
             { name: "API Gateways", desc: "Manage, monitor, and secure API traffic efficiently.", icon: Share2 }
           ].map((item, i) => (
             <div key={i} className="p-5 bg-zinc-50 border border-zinc-100 rounded-2xl space-y-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                   <item.icon className="w-4 h-4" />
                </div>
                <h5 className="font-black text-zinc-900 text-[10px] uppercase tracking-widest">{item.name}</h5>
                <p className="text-[10px] font-bold text-zinc-500 leading-tight">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

            <CornsilkSection
        title="Cloud Infrastructure & Cost Optimization"
        titleColor="blue"
        items={[
                {
                          "subtitle": "IaaS vs PaaS vs Serverless",
                          "headerColor": "blue",
                          "description": "Choose the appropriate cloud compute model to balance development speed, operational overhead, and scalable infrastructure costs."
                },
                {
                          "subtitle": "Cloud Cost Governance (FinOps)",
                          "headerColor": "red",
                          "description": "Monitor cloud unit costs per active user and egress fees to maintain healthy gross margins as platform usage scales exponentially."
                },
                {
                          "subtitle": "Global Availability & Disaster Recovery",
                          "headerColor": "blue",
                          "description": "Define Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) to safeguard product uptime and customer data integrity."
                }
      ]}
      />

      <section className="space-y-3.5 md:space-y-4">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <TrendingUp className="text-indigo-600" />
          Cost Management and FinOps
        </h2>
        <p className="text-zinc-600 font-medium leading-relaxed">
          Cloud's variable costs require new financial disciplines. PMs should monitor infrastructure costs as a key product metric.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5">
           <div className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm">
              <h4 className="font-black text-zinc-900 text-sm mb-2">Cost Visibility</h4>
              <p className="text-xs font-medium text-zinc-500">Understand what drives spending—by feature, customer, or business unit.</p>
           </div>
           <div className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm">
              <h4 className="font-black text-zinc-900 text-sm mb-2">Reserved Capacity</h4>
              <p className="text-xs font-medium text-zinc-500">Get 30-70% discounts for committed, predictable usage patterns.</p>
           </div>
           <div className="p-4 bg-white border border-zinc-100 rounded-3xl shadow-sm">
              <h4 className="font-black text-zinc-900 text-sm mb-2">Right-sizing</h4>
              <p className="text-xs font-medium text-zinc-500">Continuously optimize resource allocation to avoid paying for idle CPU or storage.</p>
           </div>
        </div>
      </section>

      <section className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200">
        <h2 className="text-xl font-black text-zinc-900 mb-2.5 flex items-center gap-3">
          <Target className="text-indigo-600" />
          Making Cloud Decisions as a PM
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             "Which cloud provider fits our service needs and team expertise?",
             "Managed services (speed) vs. custom solutions (control)?",
             "How do feature infrastructure costs impact pricing and margins?",
             "What are the compliance and data residency requirements for our target market?",
             "How can we ensure reliability through redundancy and graceful degradation?"
           ].map((q, i) => (
             <div key={i} className="flex gap-3 items-start bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm">
                <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-zinc-700">{q}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-lg md:text-xl font-black text-zinc-900 flex items-center gap-3">
          <Activity className="text-indigo-600" />
          The Bottom Line
        </h2>
        <div className="bg-white border border-zinc-100 p-4 sm:p-5 rounded-2xl shadow-sm space-y-4">
           <p className="text-sm font-medium text-zinc-600 leading-relaxed">
             Cloud computing fundamentally changed what's possible in product development. Features that once required months of infrastructure planning now deploy in minutes. Capabilities that once required expert teams now come as managed services.
           </p>
           <p className="text-sm font-bold text-zinc-700 leading-relaxed italic border-l-4 border-indigo-500 pl-4">
             The best product managers speak cloud fluently enough to participate meaningfully in architecture discussions, make informed strategic decisions, and recognize when cloud capabilities enable new product opportunities.
           </p>
        </div>
      </section>

      <div className="pt-3.5 border-t border-zinc-200 flex justify-between text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Day27Content;