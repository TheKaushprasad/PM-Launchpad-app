import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  ExternalLink, 
  Sparkles, 
  Bot, 
  Cloud, 
  Code, 
  Layout, 
  TrendingUp, 
  BarChart2, 
  Rocket, 
  Target, 
  ChevronDown,
  GraduationCap,
  BookOpen,
  ArrowLeft,
  Library,
  Zap,
  Search,
  Layers,
  Activity,
  Smartphone,
  Briefcase,
  FileText,
  Search as SearchIcon,
  X,
  Filter as FilterIcon,
  Building2,
  MessageSquare,
  HelpCircle,
  PieChart,
  Eye,
  Globe,
  ArrowRight
} from 'lucide-react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ContextType {
  isCollapsed: boolean;
}

const certificationData = [
  {
    category: "🤖 AI, Cloud & Developer Foundations",
    items: [
      { title: "Foundations of Prompt Engineering — AWS Skill Builder", description: "Learn how to design effective prompts and work efficiently with large language models.", url: "https://skillbuilder.aws/learn/VF6H4SZ1BU/foundations-of-prompt-engineering/7U8XFUVXDT", icon: Bot },
      { title: "AWS Cloud Practitioner Essentials — AWS Skill Builder", description: "Covers core cloud concepts, AWS services, pricing models, and security fundamentals.", url: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7", icon: Cloud },
      { title: "AI Agents Course — Hugging Face", description: "Hands-on introduction to building AI agents, tool use, planning, and reasoning.", url: "https://huggingface.co/learn/agents-course/en/unit0/introduction", icon: Zap },
      { title: "Postman API Fundamentals – Student Expert — Postman", description: "Demonstrates strong fundamentals in APIs, requests, collections, testing, and documentation.", url: "https://academy.postman.com/postman-api-fundamentals-student-expert-certification-1", icon: Code }
    ]
  },
  {
    category: "🧱 Beginner Level – Product Management Foundations",
    items: [
      { title: "Product Management Basics Certification — ProductLed", description: "Covers core PM concepts including roles, responsibilities, lifecycle, and stakeholder management.", url: "https://www.productledcertified.com/product-management-basics", icon: Layout },
      { title: "Radical Product Thinking: Vision Setting — ProductLed", description: "Focuses on defining a strong product vision, strategy, and long-term roadmap.", url: "https://www.productledcertified.com/radical-product-thinking-vision-setting", icon: Target }
    ]
  },
  {
    category: "⚙️ Intermediate Level – Core Product Skills",
    items: [
      { title: "Product Strategy Micro-Certification (PSC) — Product School", description: "Aligns product decisions with business outcomes and competitive strategy.", url: "https://productschool.teachable.com/p/productstrategy", icon: TrendingUp },
      { title: "Product Discovery Micro-Certification (PDC) — Product School", description: "Deep dive into user research, validation, and hypothesis-driven development.", url: "https://productschool.teachable.com/p/pdc", icon: Search },
      { title: "Product Roadmapping Micro-Certification (PRC) — Product School", description: "Covers prioritization frameworks, stakeholder alignment, and execution planning.", url: "https://productschool.teachable.com/p/productanalytics", icon: Layers },
      { title: "Product Analytics Micro-Certification (PAC) — Product School", description: "Teaches data-driven decision-making using metrics, funnels, and experimentation.", url: "https://productschool.teachable.com/p/productanalytics", icon: BarChart2 }
    ]
  },
  {
    category: "🚀 Advanced Level – Specialized & Execution-Focused",
    items: [
      { title: "Product Launches Micro-Certification (PRLC) — Product School", description: "End-to-end product launch planning, GTM strategy, and post-launch optimization.", url: "https://productschool.teachable.com/p/productlaunches", icon: Rocket },
      { title: "A/B Testing for Business Analysts — Udacity", description: "Practical experimentation techniques to evaluate and optimize product decisions.", url: "https://www.udacity.com/course/ab-testing-business-analysts--ud979", icon: Activity },
      { title: "Product Design — Udacity", description: "Covers UX principles, design thinking, and building intuitive, user-centric products.", url: "https://www.udacity.com/course/product-design--ud509", icon: Smartphone }
    ]
  }
];

const casebookData = {
  category: "🎓 Case book by Top B-Schools",
  items: [
    { title: "IIM C PM casebook", description: "Structured product cases from IIM Calcutta.", url: "https://lnkd.in/gAXsXx5f", icon: GraduationCap },
    { title: "IIM B PM casebook", description: "Exclusive PM interview prep material from IIM Bangalore.", url: "https://lnkd.in/gpesd2mc", icon: GraduationCap },
    { title: "IIM A PM casebook", description: "Case-based learning insights from IIM Ahmedabad.", url: "https://lnkd.in/gm5gTpR7", icon: GraduationCap },
    { title: "IIM V PM casebook", description: "Product management concepts and cases from IIM Vizag.", url: "https://lnkd.in/gC7kA-_f", icon: GraduationCap },
    { title: "IIM L PM casebook", description: "In-depth product cases compiled by IIM Lucknow.", url: "https://lnkd.in/g6Qft32x", icon: GraduationCap },
    { title: "IIM I PM casebook", description: "Comprehensive PM interview guide from IIM Indore.", url: "https://lnkd.in/gMc53Sar", icon: GraduationCap },
    { title: "MDI GGN PM casebook", description: "Product management strategy and design cases from MDI Gurgaon.", url: "https://lnkd.in/gYFZvp4P", icon: GraduationCap },
    { title: "BitSoM PM casebook", description: "Modern PM cases and frameworks from BitSoM.", url: "https://lnkd.in/g3derdd2", icon: GraduationCap },
    { title: "IIT M PM casebook", description: "Technical and business product cases from IIT Madras.", url: "https://lnkd.in/gQsRTYxF", icon: GraduationCap },
    { title: "IIT K PM casebook", description: "Problem-solving and product strategy cases from IIT Kanpur.", url: "https://lnkd.in/gtKFsPhx", icon: GraduationCap }
  ]
};

const companyQuestionsData = [
  {
    company: "Google",
    items: [
      { category: "Product Sense", question: "What is your favorite Google product and how would you improve it?" },
      { category: "Product Sense", question: "Design a product for the next billion internet users in Southeast Asia." },
      { category: "Product Sense", question: "If you were the PM for Google Maps, what new feature would you prioritize?" },
      { category: "Product Sense", question: "How would you redesign Google Search for teenagers?" },
      { category: "Product Sense", question: "Design a product that helps people manage their mental health using Google's ecosystem." },
      { category: "Product Design", question: "Design a time machine product — what would it look like and who is it for?" },
      { category: "Product Design", question: "How would you improve the Google Drive real-time collaboration experience?" },
      { category: "Product Design", question: "Design a YouTube feature to reduce misinformation at scale." },
      { category: "Product Design", question: "Design onboarding for Google Workspace for a non-technical small business owner." },
      { category: "RCA / Metrics", question: "YouTube watch time dropped 10% last week. How do you investigate?" },
      { category: "RCA / Metrics", question: "Google Search CTR has declined in a specific region. Walk me through your diagnosis." },
      { category: "RCA / Metrics", question: "Gmail's daily active users fell 8% month-over-month. What would you do?" },
      { category: "RCA / Metrics", question: "Google Ads revenue is declining but impressions are up — what's happening?" },
      { category: "Guesstimates", question: "Estimate the number of Google searches per second globally." },
      { category: "Guesstimates", question: "How much storage space is needed to host all Google Street View images?" },
      { category: "Guesstimates", question: "Estimate YouTube's annual ad revenue in the US." },
      { category: "Guesstimates", question: "How many Gmail accounts are created per day worldwide?" },
      { category: "Guesstimates", question: "How much bandwidth does a typical US college campus need?" },
      { category: "Behavioral", question: "Tell me about a time your product vision conflicted with your manager's." },
      { category: "Behavioral", question: "Describe a project you managed end-to-end. What tools did you use?" },
      { category: "Behavioral", question: "How do you resolve conflicting requirements from engineering and sales?" },
      { category: "Behavioral", question: "Tell me about a time you shipped a product knowing it wasn't perfect." },
      { category: "Behavioral", question: "What is the most valuable advice you've received in your career?" },
      { category: "Strategy", question: "If you were Google CEO, what is your #1 priority for the next 3 years?" },
      { category: "Strategy", question: "Should Google enter the healthcare space? How?" },
      { category: "Strategy", question: "How should Google compete with OpenAI in the generative AI space?" }
    ]
  },
  {
    company: "Meta (Facebook)",
    items: [
      { category: "Product Sense", question: "Design a better way to find roommates in a new city using Facebook." },
      { category: "Product Sense", question: "Design Facebook Movies — what would it look like and who is the target user?" },
      { category: "Product Sense", question: "How would you improve Instagram's content discovery for users above 35?" },
      { category: "Product Sense", question: "Design a product around sports for Meta's entire ecosystem." },
      { category: "Product Sense", question: "How would you improve WhatsApp for small businesses in India?" },
      { category: "Product Design", question: "Design a peer-to-peer payments feature for Messenger or WhatsApp." },
      { category: "Product Design", question: "How would you redesign Facebook Groups for Gen Z?" },
      { category: "Product Design", question: "Design a Facebook product for blood donation using the social graph." },
      { category: "Product Design", question: "Build a Meta product for parents to monitor teen app usage safely." },
      { category: "RCA / Metrics", question: "Friend requests on Facebook are down 10%. What would you do?" },
      { category: "RCA / Metrics", question: "Instagram Reels views are up but overall session time is down. Why?" },
      { category: "RCA / Metrics", question: "WhatsApp message send rate dropped in a specific country — how do you diagnose?" },
      { category: "RCA / Metrics", question: "Facebook Marketplace transactions declined 15% this quarter. Walk through your analysis." },
      { category: "Guesstimates", question: "Estimate the number of WhatsApp messages sent per day globally." },
      { category: "Guesstimates", question: "How many Instagram posts are uploaded every minute?" },
      { category: "Guesstimates", question: "Estimate Meta's total ad revenue for a single day in the US." },
      { category: "Behavioral", question: "Tell me about a time you tried to convince your manager and were unsuccessful." },
      { category: "Behavioral", question: "Describe a time you brought different perspectives together to solve a problem." },
      { category: "Behavioral", question: "Tell me about a time you took a calculated risk. What was the outcome?" },
      { category: "Behavioral", question: "How have you dealt with a difficult cross-functional stakeholder?" },
      { category: "Strategy", question: "What goals would you set for Facebook Marketplace as the PM?" },
      { category: "Strategy", question: "Should Meta spin off Instagram? Why or why not?" },
      { category: "Strategy", question: "How would you approach Meta's VR/AR strategy for the next 5 years?" }
    ]
  },
  {
    company: "Amazon",
    items: [
      { category: "Product Sense", question: "What product would you build to improve the Amazon delivery experience?" },
      { category: "Product Sense", question: "How would you improve Amazon Prime for rural customers?" },
      { category: "Product Sense", question: "Design a feature for Alexa to better support elderly users living alone." },
      { category: "Product Sense", question: "If you were PM of Amazon Go stores, what is your next big bet?" },
      { category: "Product Sense", question: "How would you improve the returns experience on Amazon?" },
      { category: "Product Design", question: "Design an Amazon product for borrowing and lending money between individuals." },
      { category: "Product Design", question: "Design a new feature for Kindle to increase daily reading time." },
      { category: "Product Design", question: "How would you redesign Amazon search results for mobile?" },
      { category: "RCA / Metrics", question: "Amazon Prime subscription cancellations increased by 20%. What do you do?" },
      { category: "RCA / Metrics", question: "AWS revenue is growing but customer CSAT is declining — investigate." },
      { category: "RCA / Metrics", question: "Add-to-cart rate on Amazon dropped 12% in the last month. How do you diagnose?" },
      { category: "RCA / Metrics", question: "Alexa daily active usage declined 15% YoY. What's your RCA framework?" },
      { category: "Guesstimates", question: "How many packages does Amazon ship globally per day?" },
      { category: "Guesstimates", question: "Estimate the number of Amazon Prime members worldwide." },
      { category: "Guesstimates", question: "How many items are listed on Amazon at any given moment?" },
      { category: "Behavioral", question: "Tell me about a time you made a mistake and how you fixed it. (Ownership LP)" },
      { category: "Behavioral", question: "Tell me about a time you made a short-term sacrifice for long-term gains. (Think Big LP)" },
      { category: "Behavioral", question: "Describe a time you disagreed with your team and what you did. (Have Backbone LP)" },
      { category: "Behavioral", question: "Tell me about a time you used data to decide despite uncertainty. (Are Right, A Lot LP)" },
      { category: "Behavioral", question: "Tell me about a product you led from idea to launch. (Bias for Action LP)" },
      { category: "Strategy", question: "How would you prioritize features for Amazon's healthcare initiative?" },
      { category: "Strategy", question: "Should Amazon acquire a logistics company? Make the case." },
      { category: "Strategy", question: "How would you approach expanding AWS in Asia-Pacific?" }
    ]
  },
  {
    company: "Microsoft",
    items: [
      { category: "Product Sense", question: "What is your favorite Microsoft product? How would you improve it?" },
      { category: "Product Sense", question: "How would you increase adoption of Microsoft Azure among SMBs?" },
      { category: "Product Sense", question: "Design a new feature for Microsoft Teams for a remote-first world." },
      { category: "Product Sense", question: "How would you improve Microsoft Excel for non-technical users?" },
      { category: "Product Design", question: "Design a Copilot feature for Microsoft Word that goes beyond basic generation." },
      { category: "Product Design", question: "How would you redesign Outlook for mobile-first users in 2025?" },
      { category: "Product Design", question: "Design a product within Microsoft 365 for student collaboration." },
      { category: "RCA / Metrics", question: "Microsoft Teams daily active users declined after a major release. What do you check?" },
      { category: "RCA / Metrics", question: "Azure churn increased 10% in a specific region. Walk through your investigation." },
      { category: "RCA / Metrics", question: "Office 365 renewal rate dropped. What is your RCA process?" },
      { category: "Guesstimates", question: "Estimate the total number of Microsoft Office licenses globally." },
      { category: "Guesstimates", question: "How many Teams meetings happen per day worldwide?" },
      { category: "Guesstimates", question: "Estimate the market size for enterprise cloud services in 2025." },
      { category: "Behavioral", question: "Explain the PM position to someone who has no idea what it is." },
      { category: "Behavioral", question: "Tell me about the most challenging product you have worked on." },
      { category: "Behavioral", question: "How do you manage people on teams with whom you may not get along?" },
      { category: "Behavioral", question: "Tell me about a time you influenced without authority." },
      { category: "Strategy", question: "Should Microsoft build a consumer social media product? Why or why not?" },
      { category: "Strategy", question: "How should Microsoft position Copilot against Google Gemini in the enterprise?" }
    ]
  },
  {
    company: "Apple",
    items: [
      { category: "Product Sense", question: "How would you improve the iPhone for users with disabilities?" },
      { category: "Product Sense", question: "How would you enhance Apple Music's content discovery feature?" },
      { category: "Product Sense", question: "How would you increase Apple Pay adoption in emerging markets?" },
      { category: "Product Sense", question: "Design a new Apple Watch feature for health monitoring." },
      { category: "Product Design", question: "How would you improve AirPods for professional use?" },
      { category: "Product Design", question: "Design a new onboarding experience for first-time iPhone users above 60." },
      { category: "Product Design", question: "How would you redesign the iOS notification system to reduce overwhelm?" },
      { category: "RCA / Metrics", question: "App Store purchase conversion rate dropped 8%. How do you investigate?" },
      { category: "RCA / Metrics", question: "iCloud subscription renewal rate declined in a region. What's your RCA?" },
      { category: "Guesstimates", question: "Estimate the number of active Apple Watch users worldwide." },
      { category: "Guesstimates", question: "How many apps are downloaded from the App Store per day globally?" },
      { category: "Guesstimates", question: "Estimate Apple's Services revenue for a single quarter." },
      { category: "Behavioral", question: "Tell me something you built end-to-end without outside help." },
      { category: "Behavioral", question: "Tell me about a challenging moment in your career and what you learned." },
      { category: "Behavioral", question: "How do you manage people on teams you may not get along with?" },
      { category: "Behavioral", question: "Tell me about a time you felt appreciated at work." },
      { category: "Strategy", question: "Should Apple build its own search engine to compete with Google?" },
      { category: "Strategy", question: "How should Apple monetize Vision Pro for the mass market?" }
    ]
  },
  {
    company: "Netflix",
    items: [
      { category: "Product Sense", question: "How would you improve Netflix's content recommendation algorithm?" },
      { category: "Product Sense", question: "Design a Netflix feature that helps users discover content across languages." },
      { category: "Product Sense", question: "How would you build Netflix for users with low-bandwidth connections?" },
      { category: "Product Sense", question: "What feature would you add to Netflix Games to drive daily engagement?" },
      { category: "Product Design", question: "Design a social watch-party feature for Netflix." },
      { category: "Product Design", question: "How would you improve the 'Continue Watching' experience on Netflix?" },
      { category: "RCA / Metrics", question: "Netflix subscriber churn increased by 5% this quarter. What do you investigate?" },
      { category: "RCA / Metrics", question: "Streaming quality complaints are up 20% in a specific region. Walk me through it." },
      { category: "RCA / Metrics", question: "Content completion rate for a new series dropped. Why?" },
      { category: "RCA / Metrics", question: "How would you handle negative feedback about a Netflix UI redesign?" },
      { category: "Guesstimates", question: "Estimate Netflix's total monthly bandwidth consumption globally." },
      { category: "Guesstimates", question: "How many hours of content are streamed on Netflix per day?" },
      { category: "Guesstimates", question: "Estimate the cost of producing one Netflix Original series." },
      { category: "Behavioral", question: "Tell me about a time you used data to drive a controversial product decision." },
      { category: "Behavioral", question: "Describe a time you had to let go of a feature you believed in." },
      { category: "Behavioral", question: "How do you keep your team motivated during a product pivot?" },
      { category: "Strategy", question: "Should Netflix launch a free, ad-supported tier globally? Pros and cons." },
      { category: "Strategy", question: "How would you prioritize Netflix's expansion into live sports?" }
    ]
  },
  {
    company: "Uber",
    items: [
      { category: "Product Sense", question: "Should Uber Eats be a separate app from Uber? Defend your position." },
      { category: "Product Sense", question: "How would you improve the Uber driver experience to reduce churn?" },
      { category: "Product Sense", question: "Design a safety feature for solo female travelers at night." },
      { category: "Product Sense", question: "How would you improve Uber's surge pricing experience for riders?" },
      { category: "Product Design", question: "Design an AI product for Uber — what would it do and who is it for?" },
      { category: "Product Design", question: "How would you redesign the Uber ride-booking flow for first-time users?" },
      { category: "RCA / Metrics", question: "There are more Uber drop-offs at the airport than pick-ups. Why and what do you do?" },
      { category: "RCA / Metrics", question: "Uber ride completion rate dropped 8% in NYC. How do you investigate?" },
      { category: "RCA / Metrics", question: "Uber Eats order cancellation rate increased significantly. What's your RCA?" },
      { category: "RCA / Metrics", question: "Driver acceptance rate for long trips dropped. Walk through the diagnosis." },
      { category: "Guesstimates", question: "Estimate Uber rides taken in New York City on a typical Friday night." },
      { category: "Guesstimates", question: "How many restaurants are partnered with Uber Eats in the US?" },
      { category: "Guesstimates", question: "Estimate Uber's total driver hours globally per week." },
      { category: "Behavioral", question: "Tell me about a time you shipped a product that failed. What did you learn?" },
      { category: "Behavioral", question: "Describe how you managed competing priorities from multiple stakeholders." },
      { category: "Behavioral", question: "Tell me about a time you had to adapt your strategy mid-execution." },
      { category: "Strategy", question: "How should Uber approach autonomous vehicles — build, buy, or partner?" },
      { category: "Strategy", question: "How would you prioritize Uber's expansion into 3-wheeler markets in Southeast Asia?" }
    ]
  },
  {
    company: "Airbnb",
    items: [
      { category: "Product Sense", question: "How would you solve for the worst post-booking experience at Airbnb?" },
      { category: "Product Sense", question: "What feature would you build to increase host retention on Airbnb?" },
      { category: "Product Sense", question: "How would you improve Airbnb Experiences for solo travelers?" },
      { category: "Product Sense", question: "Design a product for Airbnb that targets the long-term rental market." },
      { category: "Product Design", question: "Design an Airbnb feature that helps guests feel safe in a new city." },
      { category: "Product Design", question: "How would you improve Airbnb's search and filter experience on mobile?" },
      { category: "RCA / Metrics", question: "Airbnb booking conversion rate dropped 12% in Europe. How do you investigate?" },
      { category: "RCA / Metrics", question: "Host review response rate declined 15%. What's your RCA?" },
      { category: "RCA / Metrics", question: "Guest cancellation rate increased sharply. Walk through your analysis." },
      { category: "Guesstimates", question: "Estimate the number of Airbnb listings globally." },
      { category: "Guesstimates", question: "How many Airbnb nights are booked per day worldwide?" },
      { category: "Guesstimates", question: "Estimate Airbnb's revenue per quarter from experiences alone." },
      { category: "Behavioral", question: "Tell me about a time you prioritized user experience over a business metric." },
      { category: "Behavioral", question: "Describe how you handled a cross-functional disagreement about a feature direction." },
      { category: "Behavioral", question: "Tell me about a product launch that didn't go as planned." },
      { category: "Strategy", question: "Should Airbnb launch a budget hotel product to compete with OYO and Booking.com?" },
      { category: "Strategy", question: "How would you approach Airbnb's expansion into co-living?" }
    ]
  },
  {
    company: "LinkedIn",
    items: [
      { category: "Product Sense", question: "How would you improve LinkedIn's job recommendation algorithm?" },
      { category: "Product Sense", question: "Design a LinkedIn feature for recent graduates entering the job market." },
      { category: "Product Sense", question: "How would you improve LinkedIn Learning's content discovery?" },
      { category: "Product Sense", question: "Design a product on LinkedIn for freelancers to showcase and sell their work." },
      { category: "Product Design", question: "How would you redesign LinkedIn's newsfeed to reduce noise for power users?" },
      { category: "Product Design", question: "Design a LinkedIn feature that helps PMs network more effectively." },
      { category: "RCA / Metrics", question: "LinkedIn messages sent per day dropped 10%. Walk through your investigation." },
      { category: "RCA / Metrics", question: "Job application rate dropped on LinkedIn. What's your RCA framework?" },
      { category: "RCA / Metrics", question: "Premium subscription cancellations spiked. How do you diagnose?" },
      { category: "Guesstimates", question: "Estimate the number of active LinkedIn users in India." },
      { category: "Guesstimates", question: "How many job listings are posted on LinkedIn per day?" },
      { category: "Guesstimates", question: "Estimate LinkedIn's annual revenue from Talent Solutions." },
      { category: "Behavioral", question: "Tell me about a time you launched a feature that had mixed feedback. How did you respond?" },
      { category: "Behavioral", question: "Describe a time you worked with a sales team to drive product adoption." },
      { category: "Behavioral", question: "Tell me about a time you made a data-driven decision that changed your product roadmap." },
      { category: "Strategy", question: "Should LinkedIn build a freelance marketplace to compete with Upwork?" },
      { category: "Strategy", question: "How would you grow LinkedIn's presence in tier-2 cities in India?" }
    ]
  },
  {
    company: "Spotify",
    items: [
      { category: "Product Sense", question: "How would you improve Spotify's podcast discovery for new listeners?" },
      { category: "Product Sense", question: "Design a Spotify feature for friends to create collaborative playlists." },
      { category: "Product Sense", question: "How would you improve content recommendations for users who skip often?" },
      { category: "Product Sense", question: "What feature would you build to help emerging artists grow on Spotify?" },
      { category: "Product Design", question: "Design a Spotify product for the creator side — podcasters and musicians." },
      { category: "Product Design", question: "How would you redesign Spotify's home screen for desktop users?" },
      { category: "RCA / Metrics", question: "Spotify's monthly active users grew but daily listening hours dropped. Why?" },
      { category: "RCA / Metrics", question: "Podcast completion rate on Spotify declined 20%. How do you investigate?" },
      { category: "RCA / Metrics", question: "Spotify premium conversion from free tier dropped. Walk through your RCA." },
      { category: "Guesstimates", question: "Estimate how many songs are streamed on Spotify per day." },
      { category: "Guesstimates", question: "Estimate Spotify's total podcast catalog size." },
      { category: "Guesstimates", question: "How many new playlists are created on Spotify per day?" },
      { category: "Behavioral", question: "Tell me about a time you had to choose between two valid user needs." },
      { category: "Behavioral", question: "Describe a time you had to make a product decision without enough data." },
      { category: "Behavioral", question: "Tell me about a time your team pushed back on a feature you championed." },
      { category: "Strategy", question: "Should Spotify acquire a live music ticketing platform? Why or why not?" },
      { category: "Strategy", question: "How would you compete with Apple Music for Android users?" }
    ]
  },
  {
    company: "Stripe",
    items: [
      { category: "Product Sense", question: "How would you improve Stripe's onboarding experience for first-time developers?" },
      { category: "Product Sense", question: "Design a Stripe product for SMBs that have no technical founders." },
      { category: "Product Sense", question: "How would you help Stripe increase adoption among non-US merchants?" },
      { category: "Product Sense", question: "Design a fraud detection product for Stripe that balances security and UX." },
      { category: "Product Design", question: "How would you redesign Stripe's dashboard for non-technical business owners?" },
      { category: "Product Design", question: "Design a subscription management product within Stripe for SaaS companies." },
      { category: "RCA / Metrics", question: "Stripe's payment success rate dropped 5% in a specific region. How do you investigate?" },
      { category: "RCA / Metrics", question: "API error rates spiked 3x after a new release. What's your RCA process?" },
      { category: "RCA / Metrics", question: "Merchant churn increased in the SMB segment. Walk through your analysis." },
      { category: "Guesstimates", question: "Estimate Stripe's total annual transaction volume." },
      { category: "Guesstimates", question: "How many merchants are actively using Stripe globally?" },
      { category: "Guesstimates", question: "Estimate the market size for global payment processing in 2025." },
      { category: "Behavioral", question: "Tell me about a time you worked with developers to build a product they would love." },
      { category: "Behavioral", question: "Describe a time you had to simplify a complex technical concept for a non-technical audience." },
      { category: "Behavioral", question: "Tell me about a product decision you made that you would make differently today." },
      { category: "Strategy", question: "Should Stripe build a consumer-facing banking product?" },
      { category: "Strategy", question: "How would you position Stripe Atlas against its competitors?" }
    ]
  },
  {
    company: "Salesforce",
    items: [
      { category: "Product Sense", question: "How would you improve Salesforce's CRM product for small sales teams?" },
      { category: "Product Sense", question: "Design a Salesforce AI feature to help sales reps close deals faster." },
      { category: "Product Sense", question: "How would you improve Slack's integration with Salesforce for enterprise users?" },
      { category: "Product Sense", question: "Design a product for Salesforce that helps customer success teams reduce churn." },
      { category: "Product Design", question: "How would you redesign Salesforce's reporting dashboard for non-analysts?" },
      { category: "Product Design", question: "Design an onboarding experience for a first-time Salesforce admin." },
      { category: "RCA / Metrics", question: "Salesforce active users dropped in the SMB segment. How do you investigate?" },
      { category: "RCA / Metrics", question: "Slack daily messages declined after a Salesforce integration release. RCA?" },
      { category: "RCA / Metrics", question: "Enterprise renewal rate slipped 8% YoY. Walk through your analysis." },
      { category: "Guesstimates", question: "Estimate the total number of active Salesforce CRM seats globally." },
      { category: "Guesstimates", question: "How many Slack messages are sent per day?" },
      { category: "Guesstimates", question: "Estimate the global market size for CRM software in 2025." },
      { category: "Behavioral", question: "Tell me about a time you successfully influenced a large enterprise customer decision." },
      { category: "Behavioral", question: "Describe how you handled a product request that conflicted with the roadmap." },
      { category: "Behavioral", question: "Tell me about a time you built consensus across engineering, sales, and marketing." },
      { category: "Strategy", question: "How should Salesforce compete with Microsoft Dynamics 365?" },
      { category: "Strategy", question: "Should Salesforce enter the project management space beyond Slack?" }
    ]
  },
  {
    company: "DoorDash",
    items: [
      { category: "Product Sense", question: "How would you improve the DoorDash experience for Dashers (delivery partners)?" },
      { category: "Product Sense", question: "Design a DoorDash feature to increase reorder rates from existing customers." },
      { category: "Product Sense", question: "How would you improve restaurant discovery on DoorDash for new users?" },
      { category: "Product Sense", question: "Design a product that helps restaurants use DoorDash's demand data to optimize menus." },
      { category: "Product Design", question: "How would you design DashPass to reduce churn after the first month?" },
      { category: "Product Design", question: "Design a group ordering feature for DoorDash for office teams." },
      { category: "RCA / Metrics", question: "DoorDash order cancellations increased by 15% this week. Walk through your RCA." },
      { category: "RCA / Metrics", question: "Average delivery time increased by 8 minutes. How do you investigate?" },
      { category: "RCA / Metrics", question: "Dasher acceptance rate of long-distance orders dropped. What's your analysis?" },
      { category: "Guesstimates", question: "Estimate the number of DoorDash orders placed per day in the US." },
      { category: "Guesstimates", question: "How many restaurants are listed on DoorDash nationwide?" },
      { category: "Guesstimates", question: "Estimate DoorDash's revenue from DashPass subscriptions annually." },
      { category: "Behavioral", question: "Tell me about a time you balanced the needs of two opposing sides of a marketplace." },
      { category: "Behavioral", question: "Describe a product experiment you ran. What did you learn?" },
      { category: "Behavioral", question: "Tell me about a time you used customer feedback to change your product direction." },
      { category: "Strategy", question: "Should DoorDash expand into grocery delivery internationally?" },
      { category: "Strategy", question: "How would you build a DoorDash loyalty program to compete with Uber One?" }
    ]
  },
  {
    company: "Lyft",
    items: [
      { category: "Product Sense", question: "Design Lyft for college students — how would it differ from the standard product?" },
      { category: "Product Sense", question: "How would you improve Lyft's driver experience to reduce churn?" },
      { category: "Product Sense", question: "Design a Lyft feature to improve safety for riders traveling alone at night." },
      { category: "Product Sense", question: "How would you improve Lyft's product for users with disabilities?" },
      { category: "Product Design", question: "How would you redesign Lyft's pricing transparency feature for riders?" },
      { category: "Product Design", question: "Design a Lyft product that encourages using bikes and scooters over cars." },
      { category: "RCA / Metrics", question: "Lyft ride quality scores dropped in San Francisco. How do you investigate?" },
      { category: "RCA / Metrics", question: "Rider cancellation rate increased by 10%. Walk through your RCA." },
      { category: "RCA / Metrics", question: "Driver hours per week declined in a specific city. What's your analysis?" },
      { category: "Guesstimates", question: "Estimate the total number of Lyft rides per day in the US." },
      { category: "Guesstimates", question: "How many scooters does Lyft operate across all markets?" },
      { category: "Guesstimates", question: "Estimate Lyft's annual revenue from ridesharing alone." },
      { category: "Behavioral", question: "Tell me about a time you made a decision with incomplete data." },
      { category: "Behavioral", question: "Describe how you managed a product launch with a tight deadline." },
      { category: "Behavioral", question: "Tell me about a time you had to kill a feature mid-development." },
      { category: "Strategy", question: "How should Lyft differentiate from Uber given limited resources?" },
      { category: "Strategy", question: "Should Lyft expand internationally? Where and why?" }
    ]
  },
  {
    company: "TikTok / ByteDance",
    items: [
      { category: "Product Sense", question: "How would you improve TikTok's content moderation without hurting creator reach?" },
      { category: "Product Sense", question: "Design a TikTok feature to help brands collaborate with micro-influencers." },
      { category: "Product Sense", question: "How would you improve TikTok Shop for first-time buyers?" },
      { category: "Product Sense", question: "Design a product on TikTok to support education-focused content creators." },
      { category: "Product Design", question: "If you were CEO of TikTok, what would be your #1 product priority next year?" },
      { category: "Product Design", question: "Design a parental control system for TikTok that doesn't hurt engagement." },
      { category: "RCA / Metrics", question: "TikTok's average session length dropped 15% after a UI update. How do you diagnose?" },
      { category: "RCA / Metrics", question: "Creator posting rate declined month-over-month. Walk through your RCA." },
      { category: "RCA / Metrics", question: "TikTok Shop conversion rate dropped. What do you investigate?" },
      { category: "Guesstimates", question: "Estimate the number of TikTok videos uploaded globally per day." },
      { category: "Guesstimates", question: "How many hours of video are watched on TikTok per day?" },
      { category: "Guesstimates", question: "Estimate TikTok's annual ad revenue in the US." },
      { category: "Behavioral", question: "Tell me about a time you had to navigate regulatory or compliance constraints." },
      { category: "Behavioral", question: "Describe a time you worked with content, policy, and engineering teams simultaneously." },
      { category: "Behavioral", question: "Tell me about a product you built for a non-English-speaking market." },
      { category: "Strategy", question: "How would TikTok compete with YouTube for long-form content creators?" },
      { category: "Strategy", question: "What is TikTok's strategy to enter the music streaming market?" }
    ]
  },
  {
    company: "Shopify",
    items: [
      { category: "Product Sense", question: "How would you improve Shopify's onboarding for first-time merchants?" },
      { category: "Product Sense", question: "Design a Shopify feature that helps merchants increase repeat purchases." },
      { category: "Product Sense", question: "How would you help Shopify merchants better compete with Amazon?" },
      { category: "Product Sense", question: "Design a product for Shopify that leverages AI to help merchants with pricing." },
      { category: "Product Design", question: "How would you improve Shopify's mobile app for merchants running stores on-the-go?" },
      { category: "Product Design", question: "Design a Shopify analytics dashboard for a non-data-savvy merchant." },
      { category: "RCA / Metrics", question: "Shopify merchant churn spiked 12% in the SMB segment. How do you investigate?" },
      { category: "RCA / Metrics", question: "Average order value declined across Shopify stores. What's your RCA?" },
      { category: "RCA / Metrics", question: "Shopify Payments failure rate increased. Walk through your diagnosis." },
      { category: "Guesstimates", question: "Estimate the total number of active Shopify stores globally." },
      { category: "Guesstimates", question: "How much total GMV flows through Shopify annually?" },
      { category: "Guesstimates", question: "Estimate the number of Shopify merchants in India." },
      { category: "Behavioral", question: "Tell me about a time you advocated for a small merchant over a large enterprise client." },
      { category: "Behavioral", question: "Describe a time you used data to prove a feature was not working." },
      { category: "Behavioral", question: "Tell me about a product you are most proud of shipping." },
      { category: "Strategy", question: "Should Shopify build its own advertising network to compete with Meta and Google?" },
      { category: "Strategy", question: "How would you grow Shopify's presence in Southeast Asian markets?" }
    ]
  },
  {
    company: "Atlassian",
    items: [
      { category: "Product Sense", question: "How would you improve Jira for non-software teams like HR or Finance?" },
      { category: "Product Sense", question: "Design a Confluence feature that encourages teams to keep documentation up-to-date." },
      { category: "Product Sense", question: "How would you reduce the complexity of Jira for first-time project managers?" },
      { category: "Product Sense", question: "Design a Trello power-up for AI-assisted task prioritization." },
      { category: "Product Design", question: "How would you redesign Jira's board view for remote distributed teams?" },
      { category: "Product Design", question: "Design an onboarding experience for Confluence for a 5-person startup." },
      { category: "RCA / Metrics", question: "Jira daily active usage dropped 10% after a pricing change. How do you investigate?" },
      { category: "RCA / Metrics", question: "Confluence page creation rate declined in existing enterprise accounts. RCA?" },
      { category: "RCA / Metrics", question: "Trello free-to-paid conversion dropped. Walk through your analysis." },
      { category: "Guesstimates", question: "Estimate the number of Jira boards created globally per day." },
      { category: "Guesstimates", question: "How many active Confluence users are there worldwide?" },
      { category: "Guesstimates", question: "Estimate the market size for B2B project management software." },
      { category: "Behavioral", question: "Tell me about a time you prioritized a B2B customer's need over a product principle." },
      { category: "Behavioral", question: "Describe a time you balanced technical debt with feature development." },
      { category: "Behavioral", question: "Tell me about a time you influenced product direction at an executive level." },
      { category: "Strategy", question: "Should Atlassian build a Slack competitor to own the full enterprise communication stack?" },
      { category: "Strategy", question: "How would you position Jira against Monday.com and Asana for SMBs?" }
    ]
  },
  {
    company: "Adobe",
    items: [
      { category: "Product Sense", question: "How would you improve Adobe Photoshop for beginners who feel overwhelmed?" },
      { category: "Product Sense", question: "Design an Adobe product for content creators managing multi-platform publishing." },
      { category: "Product Sense", question: "How would you increase adoption of Adobe Firefly AI among professional photographers?" },
      { category: "Product Sense", question: "Design a collaborative design review feature for Adobe XD." },
      { category: "Product Design", question: "How would you redesign Adobe Acrobat's e-signature flow for mobile?" },
      { category: "Product Design", question: "Design an AI assistant within Adobe Premiere Pro for video editors." },
      { category: "RCA / Metrics", question: "Creative Cloud annual subscription renewal rate dropped. How do you investigate?" },
      { category: "RCA / Metrics", question: "Adobe Firefly AI image generation is up but users are not saving or exporting. Why?" },
      { category: "RCA / Metrics", question: "Adobe Sign usage dropped after a UI overhaul. Walk through your RCA." },
      { category: "Guesstimates", question: "Estimate the number of active Adobe Creative Cloud users globally." },
      { category: "Guesstimates", question: "How many PDFs are created using Adobe Acrobat per day?" },
      { category: "Guesstimates", question: "Estimate the global market size for design software in 2025." },
      { category: "Behavioral", question: "Tell me about a time you had to make a product accessible to a completely new audience." },
      { category: "Behavioral", question: "Describe a time you had to manage a difficult creative stakeholder." },
      { category: "Behavioral", question: "Tell me about a time you built a product that required deep user empathy." },
      { category: "Strategy", question: "How should Adobe integrate Figma after its acquisition?" },
      { category: "Strategy", question: "How would you position Adobe Firefly against Midjourney and DALL-E?" }
    ]
  },
  {
    company: "PayPal",
    items: [
      { category: "Product Sense", question: "How would you improve Venmo's social feed to drive more peer-to-peer payments?" },
      { category: "Product Sense", question: "Design a PayPal feature for cross-border payments targeting freelancers globally." },
      { category: "Product Sense", question: "How would you increase PayPal checkout adoption among Gen Z shoppers?" },
      { category: "Product Sense", question: "Design a PayPal product for small businesses that don't accept cards yet." },
      { category: "Product Design", question: "How would you redesign the PayPal checkout experience to reduce cart abandonment?" },
      { category: "Product Design", question: "Design a savings and budgeting feature within the PayPal app." },
      { category: "RCA / Metrics", question: "PayPal's checkout conversion rate dropped 8% in mobile. How do you investigate?" },
      { category: "RCA / Metrics", question: "Venmo P2P transaction volume declined. Walk through your RCA." },
      { category: "RCA / Metrics", question: "PayPal dispute rate increased significantly in a specific product category. RCA?" },
      { category: "Guesstimates", question: "Estimate the total PayPal transactions processed per day." },
      { category: "Guesstimates", question: "How many Venmo users are active monthly?" },
      { category: "Guesstimates", question: "Estimate PayPal's total addressable market for BNPL (Buy Now Pay Later)." },
      { category: "Behavioral", question: "Tell me about a time you balanced security and user friction in a product decision." },
      { category: "Behavioral", question: "Describe a time you worked with compliance and legal teams to ship a feature." },
      { category: "Behavioral", question: "Tell me about a time you dealt with a high-stakes product failure." },
      { category: "Strategy", question: "How should PayPal compete with Apple Pay and Google Pay at the point of sale?" },
      { category: "Strategy", question: "Should PayPal build a crypto wallet product for mass consumers?" }
    ]
  },
  {
    company: "Coinbase",
    items: [
      { category: "Product Sense", question: "How would you improve Coinbase's onboarding for first-time crypto buyers?" },
      { category: "Product Sense", question: "Design a Coinbase product for institutional investors to manage crypto portfolios." },
      { category: "Product Sense", question: "How would you simplify the Coinbase Wallet experience for non-technical users?" },
      { category: "Product Sense", question: "Design a feature on Coinbase to help users understand tax implications of trades." },
      { category: "Product Design", question: "Design an education product within Coinbase to help users learn DeFi safely." },
      { category: "Product Design", question: "How would you redesign the crypto price tracking dashboard for power users?" },
      { category: "RCA / Metrics", question: "Coinbase trading volume dropped 25% this quarter. How do you investigate?" },
      { category: "RCA / Metrics", question: "User identity verification failure rate increased. Walk through your RCA." },
      { category: "RCA / Metrics", question: "Coinbase Wallet daily active users declined. What's your diagnosis?" },
      { category: "Guesstimates", question: "Estimate the number of Coinbase accounts created per day during a crypto bull run." },
      { category: "Guesstimates", question: "How many crypto transactions happen on Coinbase per day?" },
      { category: "Guesstimates", question: "Estimate the global retail crypto trading market size in 2025." },
      { category: "Behavioral", question: "Tell me about a time you built a product in a highly regulated, uncertain environment." },
      { category: "Behavioral", question: "Describe how you handled a significant product security incident." },
      { category: "Behavioral", question: "Tell me about a time you had to educate users about a complex new concept." },
      { category: "Strategy", question: "How would Coinbase grow in markets where crypto regulation is unclear?" },
      { category: "Strategy", question: "Should Coinbase build a stablecoin product to compete with USDT and USDC?" }
    ]
  },
  {
    company: "Twitter / X",
    items: [
      { category: "Product Sense", question: "How would you improve Twitter/X's content discovery for new users?" },
      { category: "Product Sense", question: "Design an X product to increase creator monetization beyond subscriptions." },
      { category: "Product Sense", question: "How would you redesign the X timeline algorithm to balance recency and relevance?" },
      { category: "Product Sense", question: "Design a product within X for live sports commentary and real-time discussion." },
      { category: "Product Design", question: "How would you redesign the X profile page to better support personal branding?" },
      { category: "Product Design", question: "Design an X spaces feature for audio discussions with structured topics." },
      { category: "RCA / Metrics", question: "X daily active users declined 12% after a policy change. How do you investigate?" },
      { category: "RCA / Metrics", question: "X Premium subscription cancellations spiked. Walk through your RCA." },
      { category: "RCA / Metrics", question: "Tweet engagement rate dropped for verified accounts. What's your analysis?" },
      { category: "Guesstimates", question: "Estimate the number of tweets/posts sent per day on X." },
      { category: "Guesstimates", question: "How many X Premium subscribers are there globally?" },
      { category: "Guesstimates", question: "Estimate X's annual advertising revenue." },
      { category: "Behavioral", question: "Tell me about a time you worked under highly ambiguous leadership direction." },
      { category: "Behavioral", question: "Describe a time you had to ship a product under extreme time pressure." },
      { category: "Behavioral", question: "Tell me about a time you had to deprioritize a project despite user demand." },
      { category: "Strategy", question: "How would you grow X's revenue without relying primarily on advertising?" },
      { category: "Strategy", question: "Should X build a payment product to become a super app in Western markets?" }
    ]
  },
  {
    company: "Dropbox",
    items: [
      { category: "Product Sense", question: "How would you improve Dropbox for distributed creative teams?" },
      { category: "Product Sense", question: "Design a Dropbox feature to help SMBs manage contracts and approvals." },
      { category: "Product Sense", question: "How would you improve Dropbox's file sharing experience for external collaboration?" },
      { category: "Product Sense", question: "Design a Dropbox product for managing large video asset libraries." },
      { category: "Product Design", question: "How would you redesign Dropbox's onboarding for non-technical users?" },
      { category: "Product Design", question: "Design a Dropbox AI assistant that helps users find files faster." },
      { category: "RCA / Metrics", question: "Dropbox paid team plan churn increased 10%. How do you investigate?" },
      { category: "RCA / Metrics", question: "File upload frequency per user declined. Walk through your RCA." },
      { category: "RCA / Metrics", question: "Dropbox paper active usage dropped after a new release. What's your diagnosis?" },
      { category: "Guesstimates", question: "Estimate the total number of files stored on Dropbox globally." },
      { category: "Guesstimates", question: "How many Dropbox business accounts are active?" },
      { category: "Guesstimates", question: "Estimate the cloud storage market size in 2025." },
      { category: "Behavioral", question: "Tell me about a time you simplified a complex feature for enterprise users." },
      { category: "Behavioral", question: "Describe how you managed a product that had declining engagement." },
      { category: "Behavioral", question: "Tell me about a time you had to make a trade-off between security and usability." },
      { category: "Strategy", question: "How should Dropbox differentiate from Google Drive and Microsoft OneDrive?" },
      { category: "Strategy", question: "Should Dropbox expand further into e-signature to compete with DocuSign?" }
    ]
  },
  {
    company: "Instacart",
    items: [
      { category: "Product Sense", question: "How would you improve Instacart's shopper experience to reduce substitution errors?" },
      { category: "Product Sense", question: "Design an Instacart feature that helps users reduce food waste." },
      { category: "Product Sense", question: "How would you improve grocery discovery for users with dietary restrictions on Instacart?" },
      { category: "Product Sense", question: "Design a product for Instacart's advertising platform for emerging CPG brands." },
      { category: "Product Design", question: "How would you redesign the Instacart checkout experience to reduce cart abandonment?" },
      { category: "Product Design", question: "Design a meal planning feature within Instacart that drives reorder behavior." },
      { category: "RCA / Metrics", question: "Instacart order frequency per customer declined. How do you investigate?" },
      { category: "RCA / Metrics", question: "Shopper cancellation rate spiked during peak hours. Walk through your RCA." },
      { category: "RCA / Metrics", question: "Instacart+ subscription conversion dropped. What's your analysis?" },
      { category: "Guesstimates", question: "Estimate the number of Instacart orders per day in the US." },
      { category: "Guesstimates", question: "How many grocery stores are partnered with Instacart?" },
      { category: "Guesstimates", question: "Estimate Instacart's annual advertising revenue." },
      { category: "Behavioral", question: "Tell me about a time you balanced customer experience with operational constraints." },
      { category: "Behavioral", question: "Describe a time you used shopper or partner feedback to improve a product." },
      { category: "Behavioral", question: "Tell me about a time you had to make a fast product decision with limited data." },
      { category: "Strategy", question: "How should Instacart compete with Amazon Fresh and Walmart Grocery Delivery?" },
      { category: "Strategy", question: "Should Instacart build its own private label grocery brand?" }
    ]
  },
  {
    company: "Flipkart",
    items: [
      { category: "Product Sense", question: "How would you improve Flipkart's product discovery for first-time internet shoppers?" },
      { category: "Product Sense", question: "Design a Flipkart product for influencer-led e-commerce in India." },
      { category: "Product Sense", question: "How would you increase Flipkart's penetration in tier-2 and tier-3 Indian cities?" },
      { category: "Product Sense", question: "Design a Flipkart feature for group buying to drive higher order values." },
      { category: "Product Design", question: "How would you improve the Flipkart Big Billion Days experience for repeat buyers?" },
      { category: "Product Design", question: "Design a Flipkart Quick product for hyperlocal grocery delivery under 10 minutes." },
      { category: "RCA / Metrics", question: "YouTube's India ad revenue is declining — RCA as Flipkart's ad PM (cross-sell case)." },
      { category: "RCA / Metrics", question: "Flipkart product ratings volume dropped 20%. How do you investigate?" },
      { category: "RCA / Metrics", question: "Returns rate on Flipkart Fashion increased. Walk through your RCA." },
      { category: "RCA / Metrics", question: "Bulk order delivery failures increased during a sale event. What's your analysis?" },
      { category: "Guesstimates", question: "Estimate how many refrigerators are sold on Flipkart during Diwali." },
      { category: "Guesstimates", question: "How many daily active users does Flipkart have?" },
      { category: "Guesstimates", question: "Estimate the number of sellers on Flipkart's marketplace." },
      { category: "Behavioral", question: "Tell me about a product you built for a price-sensitive market. What trade-offs did you make?" },
      { category: "Behavioral", question: "Describe a time you balanced speed-to-market with product quality." },
      { category: "Behavioral", question: "Tell me about a time you worked with a large engineering team under tight deadlines." },
      { category: "Strategy", question: "Should Flipkart enter the online pharmacy space? What's your strategy?" },
      { category: "Strategy", question: "How would you improve Flipkart's logistics to compete with Amazon Prime delivery?" }
    ]
  },
  {
    company: "Swiggy",
    items: [
      { category: "Product Sense", question: "How would you improve the Swiggy delivery partner experience to reduce attrition?" },
      { category: "Product Sense", question: "Design a Swiggy feature that increases repeat orders from existing customers." },
      { category: "Product Sense", question: "How would you improve Swiggy Instamart for grocery discovery?" },
      { category: "Product Sense", question: "Design a Swiggy product for corporate meal ordering for office teams." },
      { category: "Product Design", question: "How would you redesign Swiggy's restaurant search for a user with dietary preferences?" },
      { category: "Product Design", question: "Design a loyalty program for Swiggy ONE that reduces churn." },
      { category: "RCA / Metrics", question: "Swiggy orders dropped 20% in a week. Walk through your RCA. (Zomato anniversary scenario)" },
      { category: "RCA / Metrics", question: "Average delivery time increased by 10 mins during peak hours. How do you investigate?" },
      { category: "RCA / Metrics", question: "Swiggy Instamart return rate increased. What's your analysis?" },
      { category: "RCA / Metrics", question: "Swiggy app uninstalls spiked after a new feature release. Walk through your diagnosis." },
      { category: "Guesstimates", question: "As a PM at Swiggy, what metrics would you track daily?" },
      { category: "Guesstimates", question: "Estimate the number of Swiggy orders per day in Bangalore." },
      { category: "Guesstimates", question: "How many restaurant partners does Swiggy have across India?" },
      { category: "Guesstimates", question: "Estimate Swiggy's annual GMV from food delivery." },
      { category: "Behavioral", question: "Tell me about a product you built for a hyper-local market with diverse user needs." },
      { category: "Behavioral", question: "Describe a time you worked with operations and supply chain to improve a product." },
      { category: "Behavioral", question: "Tell me about a time you made a product decision that balanced customer and partner needs." },
      { category: "Strategy", question: "Should Swiggy launch a subscription product beyond Swiggy ONE?" },
      { category: "Strategy", question: "How would you compete with Zomato in the quick commerce (10-minute delivery) space?" }
    ]
  },
  {
    company: "Zomato",
    items: [
      { category: "Product Sense", question: "How would you increase adoption of Zomato's 'Under 10-minute delivery' feature?" },
      { category: "Product Sense", question: "Design a Zomato product to help restaurants manage and reduce food waste." },
      { category: "Product Sense", question: "How would you improve Zomato Gold for restaurant dining use cases?" },
      { category: "Product Sense", question: "Design a Zomato feature for first-time users in tier-3 cities who have never ordered online." },
      { category: "Product Design", question: "How would you redesign Zomato's restaurant rating system to be more trustworthy?" },
      { category: "Product Design", question: "Design a Blinkit product for bulk grocery buying by housing societies." },
      { category: "RCA / Metrics", question: "Zomato's profits are declining but orders are growing — what's happening? (Case study format)" },
      { category: "RCA / Metrics", question: "Restaurant partner ratings are dropping on Zomato. How do you investigate?" },
      { category: "RCA / Metrics", question: "Zomato Pro cancellation rate increased. Walk through your RCA." },
      { category: "RCA / Metrics", question: "Blinkit delivery times increased during a warehouse expansion. What's your diagnosis?" },
      { category: "Guesstimates", question: "Estimate the number of pizzas sold in Bangalore on a Saturday night." },
      { category: "Guesstimates", question: "How many Zomato orders are placed per day across India?" },
      { category: "Guesstimates", question: "Estimate Zomato's annual revenue from advertising to restaurants." },
      { category: "Behavioral", question: "Tell me about a time you improved a product metric that had a complex root cause." },
      { category: "Behavioral", question: "Describe a time you had to prioritize between two equally important features." },
      { category: "Behavioral", question: "Tell me about a time you worked with a restaurant partner to co-develop a feature." },
      { category: "Strategy", question: "How would Zomato compete with Swiggy in tier-2 cities for quick commerce?" },
      { category: "Strategy", question: "Should Zomato expand internationally to Southeast Asia? Where and why?" }
    ]
  },
  {
    company: "Razorpay",
    items: [
      { category: "Product Sense", question: "How would you improve Razorpay's onboarding for first-time business owners?" },
      { category: "Product Sense", question: "Design a Razorpay product to help small retailers accept digital payments offline." },
      { category: "Product Sense", question: "How would you monetize Amazon Alexa as a Razorpay PM (design payments use case)?" },
      { category: "Product Sense", question: "Design a payment optimization product that reduces transaction failures for merchants." },
      { category: "Product Design", question: "Design a payment optimizer product for Razorpay merchants." },
      { category: "Product Design", question: "How would you improve RazorpayX dashboard for CFOs of mid-sized companies?" },
      { category: "RCA / Metrics", question: "Cancellation rate for Uber-like rides integrated via Razorpay increased 10%. RCA?" },
      { category: "RCA / Metrics", question: "Razorpay payment success rate dropped in a specific bank's ecosystem. Diagnose." },
      { category: "RCA / Metrics", question: "RazorpayX wallet adoption stagnated. Walk through your investigation." },
      { category: "Guesstimates", question: "Estimate the total digital payment volume in India per day." },
      { category: "Guesstimates", question: "How many businesses are using Razorpay as their primary payment gateway?" },
      { category: "Guesstimates", question: "Estimate Razorpay's annual revenue from payment processing fees." },
      { category: "Behavioral", question: "Tell me about a time you challenged the status quo and drove a new solution." },
      { category: "Behavioral", question: "Describe a time you had to work with banks or regulatory bodies to ship a feature." },
      { category: "Behavioral", question: "Tell me about a time you improved a product metric with a counter-intuitive insight." },
      { category: "Strategy", question: "Should Razorpay build a consumer-facing wallet to compete with PhonePe and Paytm?" },
      { category: "Strategy", question: "How would Razorpay expand its lending product to tier-2 businesses?" }
    ]
  },
  {
    company: "Intuit",
    items: [
      { category: "Product Sense", question: "How would you improve QuickBooks for a non-accountant small business owner?" },
      { category: "Product Sense", question: "Design a TurboTax feature that simplifies filing for gig economy workers." },
      { category: "Product Sense", question: "How would you improve Mint's budgeting experience for users who never stick to budgets?" },
      { category: "Product Sense", question: "Design an Intuit AI product that proactively identifies tax-saving opportunities." },
      { category: "Product Design", question: "How would you redesign TurboTax's onboarding to reduce early drop-off?" },
      { category: "Product Design", question: "Design a QuickBooks mobile experience for a plumber managing invoices on-the-go." },
      { category: "RCA / Metrics", question: "TurboTax completion rate dropped during peak tax season. How do you investigate?" },
      { category: "RCA / Metrics", question: "QuickBooks Online churn increased in the SMB segment. Walk through your RCA." },
      { category: "RCA / Metrics", question: "Mint daily active users declined sharply. What's your diagnosis?" },
      { category: "Guesstimates", question: "Estimate the number of US tax returns filed via TurboTax annually." },
      { category: "Guesstimates", question: "How many QuickBooks users are there globally?" },
      { category: "Guesstimates", question: "Estimate the total SMB accounting software market size in the US." },
      { category: "Behavioral", question: "Tell me about a time you simplified a product for a non-expert user." },
      { category: "Behavioral", question: "Describe a time you had to navigate compliance requirements in a product." },
      { category: "Behavioral", question: "Tell me about a time you worked with customer support data to improve a product." },
      { category: "Strategy", question: "How should Intuit compete with free tax filing tools offered by the IRS?" },
      { category: "Strategy", question: "Should Intuit build a banking product for small businesses?" }
    ]
  },
  {
    company: "Pinterest",
    items: [
      { category: "Product Sense", question: "How would you improve Pinterest's content discovery for new users in the first 7 days?" },
      { category: "Product Sense", question: "Design a Pinterest feature to help users move from inspiration to purchase." },
      { category: "Product Sense", question: "How would you improve Pinterest's value for male users who are underrepresented?" },
      { category: "Product Sense", question: "Design a Pinterest product for home renovation planning with contractor integration." },
      { category: "Product Design", question: "How would you redesign Pinterest boards for collaborative project planning?" },
      { category: "Product Design", question: "Design a Pinterest shopping feature for small independent artisans." },
      { category: "RCA / Metrics", question: "Pinterest monthly active users grew but engagement (saves/pins) declined. Why?" },
      { category: "RCA / Metrics", question: "Pinterest shopping click-through rate dropped after a recommendation algorithm update. RCA?" },
      { category: "RCA / Metrics", question: "Creator content volume on Pinterest declined. Walk through your investigation." },
      { category: "Guesstimates", question: "Estimate the number of pins saved on Pinterest per day globally." },
      { category: "Guesstimates", question: "How many active advertisers use Pinterest Ads?" },
      { category: "Guesstimates", question: "Estimate the market size for visual search advertising in 2025." },
      { category: "Behavioral", question: "Tell me about a time you used data to convince skeptical stakeholders about a product direction." },
      { category: "Behavioral", question: "Describe a time you built a feature that helped a niche user segment disproportionately." },
      { category: "Behavioral", question: "Tell me about a time you had to balance advertiser needs with user experience." },
      { category: "Strategy", question: "How should Pinterest compete with Instagram Shopping and TikTok Shop?" },
      { category: "Strategy", question: "Should Pinterest build a video-first product to compete for creator attention?" }
    ]
  },
  {
    company: "Snap (Snapchat)",
    items: [
      { category: "Product Sense", question: "How would you improve Snapchat's Stories for users above 30?" },
      { category: "Product Sense", question: "Design a Snapchat AR feature for live events and concerts." },
      { category: "Product Sense", question: "How would you improve Snap Map to become the go-to product for local discovery?" },
      { category: "Product Sense", question: "Design a Snapchat product that helps users maintain long-distance friendships." },
      { category: "Product Design", question: "Design a Snapchat feature for creators to monetize their AR lenses." },
      { category: "Product Design", question: "How would you redesign Snapchat's onboarding for users who have never used ephemeral messaging?" },
      { category: "RCA / Metrics", question: "Snapchat daily active users declined in the 18-24 age group. How do you investigate?" },
      { category: "RCA / Metrics", question: "Story view rate dropped after a redesign. Walk through your RCA." },
      { category: "RCA / Metrics", question: "Snap Ads click-through rate declined for a major advertiser. What's your diagnosis?" },
      { category: "Guesstimates", question: "Estimate the number of Snaps sent per day globally." },
      { category: "Guesstimates", question: "How many Snapchat AR lenses are actively used per day?" },
      { category: "Guesstimates", question: "Estimate Snapchat's annual advertising revenue." },
      { category: "Behavioral", question: "Tell me about a time you built a product for a Gen Z or younger audience. What did you learn?" },
      { category: "Behavioral", question: "Describe a time you had to compete for user attention against a dominant platform." },
      { category: "Behavioral", question: "Tell me about a time you had to kill a beloved feature for business reasons." },
      { category: "Strategy", question: "How should Snap compete with Instagram and TikTok for advertiser budgets?" },
      { category: "Strategy", question: "Should Snap double down on AR glasses (Spectacles) for mass consumer use?" }
    ]
  }
];

const assignmentData = [
  { company: "Origin medical", position: "Product Analyst", url: "https://drive.google.com/file/d/1oM5p1fzhNb-cLr6gdFBsbzEeGJz8937x/view?usp=sharing" },
  { company: "ADDA", position: "APM", url: "https://drive.google.com/file/d/1UJ_TuzMqaT__pHqzr0YLvcd4IwrBiP1M/view?usp=sharing" },
  { company: "Emoto red", position: "APM", url: "https://drive.google.com/file/d/1D3P6ycIQ0rQZbzi_yiKRHV36INusyrOi/view?usp=drivesdk" },
  { company: "Emitrr", position: "PM intern", url: "https://docs.google.com/document/d/1Lj4omawgUDSsakcdpWSS8qfAvaYVJAyZ8Rg8_EAUQ5g/edit#heading=h.3rpv252qftd2" },
  { company: "Physics Wallah", position: "PM intern", url: "https://docs.google.com/document/d/1tlKfzPlKfF6wsEzA4Md3S-mlBGWebsrP0SwYdsNn3xg/edit?usp=sharing" },
  { company: "The Media Ant", position: "PM intern", url: "https://docs.google.com/document/d/1I08hOCQOGh0gTbA5lHv5ZAg9GEvEjUMAZyi31CKfrGE/edit?usp=sharing" },
  { company: "Netwon school", position: "APM", url: "https://drive.google.com/file/d/1-3D9LCjsXkmCwaen9_JcwyW4-hFop9Xx/view?usp=drivesdk" },
  { company: "Finnable", position: "APM", url: "https://drive.google.com/file/d/1sj3JrsAQt1uUghZH9O51-pR4_RWNHe1s/view?usp=drive_link" },
  { company: "MCS", position: "PM intern", url: "https://docs.google.com/document/d/10XbE3ctMt287b-zx6srYzvp7-AHZyT9ttMbApu3LmIM/edit?usp=drivesdk" },
  { company: "SmartApi", position: "APM", url: "https://docs.google.com/document/d/1Tp-uo1CACWcBspyjaz62SQ382UBtw58-_8niCYZmSsw/edit?usp=drivesdk" },
  { company: "Clipboard", position: "APM", url: "https://docs.google.com/document/d/109AI3lmtk85RfcrA_MqekfKCGyPUTpUCGocVEL0XFDQ/edit?usp=drivesdk" },
  { company: "Makerble", position: "APM", url: "https://docs.google.com/document/d/1HtCrp-GPgaQyKdvqzgpRd0leibS4LZW5HWQ0I0_vwEo/edit?usp=drivesdk" },
  { company: "Sivi", position: "PM intern", url: "https://docs.google.com/document/d/1JBxa5kFjy3xp3L1jXKMG9937WEW_1taI72Gy_94FBnY/edit?usp=drivesdk" },
  { company: "Leap scholar", position: "PM intern", url: "https://docs.google.com/document/d/1JqZUetaxxYQfDoAyR7Y3ih-bnJdF9EZjItJc3czrLEM/edit?usp=drivesdk" },
  { company: "Trustt", position: "Pm intern", url: "https://drive.google.com/file/d/1tQksWt1vBCUDMq_29uNEZ00JWnmaWmts/view?usp=sharing" },
  { company: "Admitkard", position: "APM", url: "https://drive.google.com/file/d/1ZNOxI3_V3pZC3GDQpG1WoNjpaxKpHxMa/view?usp=sharing" },
  { company: "Loop", position: "Product analyst Intern", url: "https://www.notion.so/789fa5edadc84032a6f53b1e23790451?pvs=21" },
  { company: "Nurturev", position: "Product analyst", url: "https://drive.google.com/file/d/1Hk9JECHLBKd_kVhvict8j2KyIDePLiWH/view?usp=sharing" },
  { company: "Enalo", position: "Pm intern", url: "https://drive.google.com/file/d/1iHwcgwFReHoEwZCvoORCEfNfquXeMn6q/view?usp=sharing" },
  { company: "Reachin Box", position: "APM", url: "https://www.notion.so/2250cd44adb64df7adf952765201cde1?pvs=21" },
  { company: "Creditas", position: "APM", url: "https://drive.google.com/file/d/1RNMlJTECv_2e2DUZ4XlnJiRWyATnKp2-/view?pli=1" },
  { company: "Meesho", position: "SPM", url: "https://docs.google.com/document/d/10mZAfZ7IhFOcSY5eo0hte0o1YZ5Y2_mMsdjJQREM-cw/edit?tab=t.0" },
  { company: "ICICI Lombard", position: "Prod operations", url: "https://docs.google.com/spreadsheets/d/1Hn22LHheC38WR0KhApmsTiNuzBYq8-Uj/edit?usp=drivesdk&ouid=111019526669883583658&rtpof=true&sd=true" },
  { company: "Motilal Oswal AMC", position: "SPM", url: "https://drive.google.com/file/d/1YB3szTgrppNX-efeAJwfI1iPE0NHYVe4/view?usp=drivesdk" },
  { company: "FLexmoney", position: "Pm Intern", url: "https://drive.google.com/file/d/1pFFCVOD1clj5gadDZP-KbnsaFcpRhPSl/view?usp=sharing" },
  { company: "Paytm", position: "APM", url: "https://drive.google.com/file/d/1D5-7d9qy_fXcjn2hcEtWsX9xH5nMKqcK/view?usp=sharing" },
  { company: "SkillSwap", position: "APM", url: "https://drive.google.com/file/d/1zimBFkaWDq93lDLhC5Ak58C2ORFHOmbE/view?usp=sharing" },
  { company: "TZURONI LTD.", position: "Pm Intern", url: "https://drive.google.com/file/d/1H0TV5AQt5K2du5McoM0iS8VaoClMEP-I/view?usp=sharing" },
  { company: "Accredian", position: "PM intern", url: "https://drive.google.com/drive/folders/1VC2rjqBsUfUlylNCJano7UxZYM21HDXe" },
  { company: "Verifast", position: "Product Analyst", url: "https://www.notion.so/177f4f312ae38064a4b0f7c1a6883f28?pvs=21" },
  { company: "Wyra", position: "PM intern", url: "https://drive.google.com/file/d/1RgeGKVBEoiEIaNf_-pLgianpiZAuiMfl/view?usp=sharing" },
  { company: "Virgio", position: "APM", url: "https://drive.google.com/file/d/1Exd6bwiD5n5-kMVielltIO0ZPLvXiHFQ/view?usp=sharing" },
  { company: "EMA", position: "APM", url: "https://drive.google.com/file/d/1om0qxMVDH54dz-o1XLjf9Mc2cMEjzSmD/view?usp=sharing" },
  { company: "Visist", position: "PM intern", url: "https://drive.google.com/file/d/1eum6GQ6DGUVzN9jdUunNbsYfiQfSEm9U/view?usp=drivesdk" },
  { company: "Justdial", position: "PM intern", url: "https://drive.google.com/file/d/1exRibCUN879aACiMN4hYQc24t2g4XbiJ/view?usp=drivesdk" },
  { company: "Zocket", position: "PM intern", url: "https://drive.google.com/file/d/1DiwMfSVEnJ8rWLSPdedmO-0VS3jLgWP7/view?usp=drivesdk" },
  { company: "Ivy", position: "PM", url: "https://docs.google.com/document/d/1Z_OSwpaEfTjBOLlgORSTkm3_PZV59D6oOGhbj7H85F8/edit?usp=sharing" },
  { company: "Elfina Health", position: "APM", url: "https://drive.google.com/file/d/1XWMk0ohrEdeDtQpYNikKgtpv5lMRelRn/view?usp=sharing" },
  { company: "HealMeRight", position: "APM Intern", url: "https://drive.google.com/file/d/1tlAXAcwmf9r3pwWfA84VmRCt-KwJEMxW/view?usp=sharing" },
  { company: "NXTwave", position: "APM", url: "https://www.notion.so/c7c2120316934c17b42543ac693bab08?pvs=21" },
  { company: "Ctruh", position: "PM Intern", url: "https://drive.google.com/file/d/106R_TGiyu6aiKbmzWBt2wxs2319x9mK4/view?usp=sharing" },
  { company: "Dotech", position: "PM intern", url: "https://drive.google.com/file/d/1e6CUZJJ-Ho3KZ8MRuXUcFFldX7YO7lM5/view?usp=sharing" },
  { company: "JAR", position: "PA Intern", url: "https://drive.google.com/file/d/1GDkIOabKwqtzGD3h04xewIYeVZuBZgty/view?usp=sharing" },
  { company: "OpenInApp", position: "PM Intern", url: "https://drive.google.com/file/d/1hPvoBhNa3zErJDSSWZYbLaOr0-wvpZYi/view?usp=sharing" },
  { company: "SaaSPay", position: "PM Intern", url: "https://drive.google.com/file/d/1CAouu9jyj6HP3oQ-yJj4RiHByT9rCQKs/view?usp=sharing" },
  { company: "Wizdom", position: "PM Intern", url: "https://drive.google.com/file/d/1jecktkeXZaEdGwERd6fhkd4DvNWhxYhc/view?usp=sharing" },
  { company: "KUKUFM", position: "APM", url: "https://drive.google.com/file/d/1Ixij3CFKXSN_UUMBGOQ7FFIxn1oCbNoO/view?usp=sharing" },
  { company: "UnStop", position: "PM", url: "https://drive.google.com/file/d/1Ixij3CFKXSN_UUMBGOQ7FFIxn1oCbNoO/view?usp=sharing" },
  { company: "PeakMind", position: "APM", url: "https://drive.google.com/file/d/1zqTVvppblplSqeOICQFKg0gDmcA2YCCo/view?usp=sharing" },
  { company: "Internshala", position: "APM", url: "https://drive.google.com/file/d/15lwhrcraoMS7SQ1Q6lfDY4WbGcPBCaPP/view?usp=sharing" },
  { company: "Ringg AI", position: "APM", url: "https://docs.google.com/document/d/1yWWTCarD4CDfovGek0CwASRcTnSXc6mrIJG0N9XO9mw/edit?tab=t.0" },
  { company: "RISA Labs", position: "APM", url: "https://docs.google.com/document/d/18xWMkgPG5md4DuvjGHF4PgfUP13Vnq5xfmoT46EUPwo/edit?usp=sharing" },
  { company: "PACTAP", position: "APM", url: "https://docs.google.com/document/d/1u69N_nZV6gFX054_IN9el6Yz0qDVvYIupHApSQf2zbY/edit?usp=sharing" },
  { company: "Keficommerce/Scalenut", position: "APM", url: "https://docs.google.com/document/d/15cJRy245fNvls2ucwlUuG3yi-LzflwEdf97a0xM1tEM/edit?usp=sharing" },
  { company: "Bento Lab", position: "PM Intern", url: "https://drive.google.com/file/d/1eF16yBJDTzwpN2vjKB3hi3rJ9AkFdsW0/view?usp=sharing" },
  { company: "Reelo", position: "PM Intern", url: "https://docs.google.com/document/d/1w78sKPURQ6Ukv_hC9TyewSUMu0X6wtR2TQeHUCzbGzM/edit?usp=sharing" },
  { company: "Zocket (Mobile)", position: "PM Intern", url: "https://drive.google.com/file/d/1jMzVIMJTa0zII7IEGB5b_Om_m4___G8p/view?usp=sharing" },
  { company: "Coastr", position: "PM Intern", url: "https://drive.google.com/file/d/1fnpMIZnFuAdxPfqr-3RNqsKUMnXe9Jer/view?usp=sharing" }
];

export const Resources: React.FC = () => {
  const { isCollapsed } = useOutletContext<ContextType>();
  const { completedCount, interviewHistory } = useAuth();
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState<'main' | 'certs' | 'casebooks' | 'assignments' | 'questions'>('main');
  const [openCerts, setOpenCerts] = useState<number[]>([0]);
  const [openCompanies, setOpenCompanies] = useState<string[]>(['Google']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  const [selectedQuestionCategory, setSelectedQuestionCategory] = useState('All');

  // Dynamic resource counts
  const totalCerts = useMemo(() => {
    return certificationData.reduce((acc, cat) => acc + cat.items.length, 0);
  }, []);

  const totalAssignments = assignmentData.length;
  const totalCasebooks = casebookData.items.length;
  
  const totalQuestions = useMemo(() => {
    return companyQuestionsData.reduce((acc, comp) => acc + comp.items.length, 0);
  }, []);

  const hasProgress = completedCount > 0 || (interviewHistory && interviewHistory.length > 0);
  const bottomCtaText = hasProgress ? 'CONTINUE YOUR JOURNEY' : 'START LEARNING';

  const toggleCert = (index: number) => {
    setOpenCerts(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleCompany = (company: string) => {
    setOpenCompanies(prev => 
      prev.includes(company) ? prev.filter(c => c !== company) : [...prev, company]
    );
  };

  const roleFilters = ['All', 'APM', 'PM Intern', 'Product Analyst', 'PM / SPM'];
  const questionCategories = ['All', 'Product Sense', 'Product Design', 'RCA / Metrics', 'Guesstimates', 'Behavioral', 'Strategy'];

  const filteredAssignments = useMemo(() => {
    return assignmentData.filter(item => {
      const matchesSearch = item.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.position.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedRoleFilter === 'All') return matchesSearch;
      const pos = item.position.toLowerCase();
      if (selectedRoleFilter === 'APM') return matchesSearch && pos.includes('apm');
      if (selectedRoleFilter === 'PM Intern') return matchesSearch && (pos.includes('intern') || pos.includes('pm intern'));
      if (selectedRoleFilter === 'Product Analyst') return matchesSearch && (pos.includes('analyst') || pos.includes('pa'));
      if (selectedRoleFilter === 'PM / SPM') return matchesSearch && (pos === 'pm' || pos === 'spm' || pos.includes('senior'));
      return matchesSearch;
    });
  }, [searchQuery, selectedRoleFilter]);

  const filteredQuestionsData = useMemo(() => {
    return companyQuestionsData.map(companyData => {
      const matchesSearch = companyData.company.toLowerCase().includes(searchQuery.toLowerCase());
      const filteredItems = companyData.items.filter(item => {
        if (selectedQuestionCategory === 'All') return true;
        return item.category === selectedQuestionCategory;
      });
      return { ...companyData, items: filteredItems, matchesSearch };
    }).filter(companyData => companyData.matchesSearch && companyData.items.length > 0);
  }, [searchQuery, selectedQuestionCategory]);

  const getQuestionIcon = (cat: string) => {
    switch (cat) {
      case 'Product Sense': return <Eye className="w-4 h-4" />;
      case 'Product Design': return <Layout className="w-4 h-4" />;
      case 'RCA / Metrics': return <Activity className="w-4 h-4" />;
      case 'Guesstimates': return <PieChart className="w-4 h-4" />;
      case 'Behavioral': return <MessageSquare className="w-4 h-4" />;
      case 'Strategy': return <Target className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className={`pb-16 transition-all duration-300 mx-auto ${isCollapsed ? 'max-w-[1360px] px-4 sm:px-6 lg:px-8' : 'max-w-[1180px] px-4 sm:px-6 lg:px-8'}`}
    >
      {/* Hero Section: Compact, high-contrast, ~15-20% reduced height */}
      <header className="relative bg-zinc-950 rounded-3xl md:rounded-[2.25rem] p-6 sm:p-8 md:p-10 text-white overflow-hidden shadow-xl border border-zinc-800/80 mb-8">
        <div className="absolute top-0 right-0 w-[420px] md:w-[540px] h-[420px] md:h-[540px] bg-[#79BAEC]/15 rounded-full blur-[100px] pointer-events-none -translate-y-1/3 translate-x-1/4"></div>
        <div className="relative z-10 max-w-3xl">
            {activeView !== 'main' && (
              <button 
                onClick={() => setActiveView('main')} 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold uppercase tracking-wider mb-5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Library
              </button>
            )}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/10 text-indigo-300 text-[11px] font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
                <Library className="w-3.5 h-3.5 text-indigo-400" /> 
                <span>Knowledge & Credential Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight text-white leading-tight">
                {activeView === 'main' ? 'Curated' : activeView === 'certs' ? 'Industry' : activeView === 'assignments' ? 'Interview' : activeView === 'casebooks' ? 'B-School' : 'Company'}{' '}
                <span className="text-[#79BAEC]">
                  {activeView === 'main' ? 'Resources.' : activeView === 'certs' ? 'Certifications.' : activeView === 'assignments' ? 'Assignments.' : activeView === 'casebooks' ? 'Casebooks.' : 'Questions.'}
                </span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
                {activeView === 'main' 
                  ? 'Everything you need to build PM skills, strengthen your credentials, and prepare for top-tier interviews.'
                  : activeView === 'certs' 
                  ? 'Industry-recognized certification pathways and courses to validate your technical, analytical, and PM expertise.'
                  : activeView === 'assignments'
                  ? 'Real-world product assignment briefs and decks used by hiring teams at high-growth startups and top tech firms.'
                  : activeView === 'casebooks'
                  ? 'Curated PM case repositories, frameworks, and problem sets compiled by premier business school product clubs.'
                  : 'Exhaustive company-wise PM interview question banks spanning Product Sense, RCA, Guesstimates, and Strategy.'}
            </p>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeView === 'main' && (
          <motion.div 
            key="main" 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Section label */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                EXPLORE THE LIBRARY
              </span>
            </div>

            {/* 4 Cards Grid: 4 columns on desktop, 2x2 on tablet, 1 column on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {/* Card 1: Certifications */}
              <div 
                onClick={() => setActiveView('certs')}
                className="group relative bg-white rounded-2xl border border-zinc-200/90 hover:border-indigo-300 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg text-left cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/25 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container: 44x44px rounded square with accent */}
                  <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200 mb-6">
                    <Award className="w-5 h-5" />
                  </div>

                  {/* Category & Title */}
                  <div className="mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 block mb-1">
                      Certifications
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight leading-snug">
                      Certifications
                    </h2>
                  </div>

                  {/* Outcome-focused description */}
                  <p className="text-xs text-zinc-500 font-normal leading-relaxed mb-5">
                    Industry-recognized certifications to strengthen your PM credentials.
                  </p>

                  {/* Metadata */}
                  <div className="mt-auto pt-3">
                    <span className="inline-flex items-center text-[11px] font-bold text-zinc-500 bg-zinc-100/90 border border-zinc-200/70 px-2.5 py-1 rounded-md">
                      {certificationData.length} certification tracks · {totalCerts} courses
                    </span>
                  </div>

                  {/* Text-based CTA with animated arrow */}
                  <div className="pt-4 mt-5 border-t border-zinc-100 flex items-center justify-between text-indigo-600 group-hover:text-indigo-700">
                    <span className="text-[11px] font-extrabold tracking-wider uppercase">
                      EXPLORE CERTIFICATIONS
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

              {/* Card 2: PM Assignments */}
              <div 
                onClick={() => setActiveView('assignments')}
                className="group relative bg-white rounded-2xl border border-zinc-200/90 hover:border-amber-300 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg text-left cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-amber-50/25 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container: 44x44px rounded square with accent */}
                  <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200 mb-6">
                    <Briefcase className="w-5 h-5" />
                  </div>

                  {/* Category & Title */}
                  <div className="mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 block mb-1">
                      PM Assignments
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight leading-snug">
                      PM Assignments
                    </h2>
                  </div>

                  {/* Outcome-focused description */}
                  <p className="text-xs text-zinc-500 font-normal leading-relaxed mb-5">
                    Real-world product tasks inspired by hiring processes at top tech companies.
                  </p>

                  {/* Metadata */}
                  <div className="mt-auto pt-3">
                    <span className="inline-flex items-center text-[11px] font-bold text-zinc-500 bg-zinc-100/90 border border-zinc-200/70 px-2.5 py-1 rounded-md">
                      {totalAssignments}+ assignments
                    </span>
                  </div>

                  {/* Text-based CTA with animated arrow */}
                  <div className="pt-4 mt-5 border-t border-zinc-100 flex items-center justify-between text-amber-600 group-hover:text-amber-700">
                    <span className="text-[11px] font-extrabold tracking-wider uppercase">
                      VIEW ASSIGNMENTS
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

              {/* Card 3: Casebooks */}
              <div 
                onClick={() => setActiveView('casebooks')}
                className="group relative bg-white rounded-2xl border border-zinc-200/90 hover:border-emerald-300 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg text-left cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/25 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container: 44x44px rounded square with accent */}
                  <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200 mb-6">
                    <BookOpen className="w-5 h-5" />
                  </div>

                  {/* Category & Title */}
                  <div className="mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 block mb-1">
                      Casebooks
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight leading-snug">
                      Casebooks
                    </h2>
                  </div>

                  {/* Outcome-focused description */}
                  <p className="text-xs text-zinc-500 font-normal leading-relaxed mb-5">
                    Structured product cases from IMs and leading business schools.
                  </p>

                  {/* Metadata */}
                  <div className="mt-auto pt-3">
                    <span className="inline-flex items-center text-[11px] font-bold text-zinc-500 bg-zinc-100/90 border border-zinc-200/70 px-2.5 py-1 rounded-md">
                      {totalCasebooks} case studies
                    </span>
                  </div>

                  {/* Text-based CTA with animated arrow */}
                  <div className="pt-4 mt-5 border-t border-zinc-100 flex items-center justify-between text-emerald-600 group-hover:text-emerald-700">
                    <span className="text-[11px] font-extrabold tracking-wider uppercase">
                      EXPLORE CASEBOOKS
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

              {/* Card 4: Company Qs */}
              <div 
                onClick={() => setActiveView('questions')}
                className="group relative bg-white rounded-2xl border border-zinc-200/90 hover:border-rose-300 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg text-left cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-rose-50/25 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container: 44x44px rounded square with accent */}
                  <div className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200 mb-6">
                    <Building2 className="w-5 h-5" />
                  </div>

                  {/* Category & Title */}
                  <div className="mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 block mb-1">
                      Company Qs
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight leading-snug">
                      Company Qs
                    </h2>
                  </div>

                  {/* Outcome-focused description */}
                  <p className="text-xs text-zinc-500 font-normal leading-relaxed mb-5">
                    Real interview questions and patterns from top tech companies.
                  </p>

                  {/* Metadata */}
                  <div className="mt-auto pt-3">
                    <span className="inline-flex items-center text-[11px] font-bold text-zinc-500 bg-zinc-100/90 border border-zinc-200/70 px-2.5 py-1 rounded-md">
                      {totalQuestions}+ interview questions
                    </span>
                  </div>

                  {/* Text-based CTA with animated arrow */}
                  <div className="pt-4 mt-5 border-t border-zinc-100 flex items-center justify-between text-rose-600 group-hover:text-rose-700">
                    <span className="text-[11px] font-extrabold tracking-wider uppercase">
                      PRACTICE COMPANY QUESTIONS
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'questions' && (
          <motion.div key="questions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
            <div className="space-y-8">
              <div className="relative max-w-xl mx-auto">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-zinc-400" />
                 </div>
                 <input 
                    type="text"
                    placeholder="Search by company name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-12 pr-12 py-4 bg-white border border-zinc-200 rounded-[1.5rem] focus:ring-4 focus:ring-rose-100 outline-none text-sm font-bold shadow-sm transition-all"
                 />
                 {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600"><X className="w-5 h-5" /></button>}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                 {questionCategories.map((filter) => (
                   <button
                    key={filter}
                    onClick={() => setSelectedQuestionCategory(filter)}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border flex items-center gap-2
                      ${selectedQuestionCategory === filter 
                        ? 'bg-rose-600 border-rose-600 text-white shadow-lg' 
                        : 'bg-white border-zinc-100 text-zinc-500 hover:bg-rose-50'}`}
                   >
                     {filter !== 'All' && getQuestionIcon(filter)}
                     {filter}
                   </button>
                 ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredQuestionsData.map((data, idx) => (
                <div key={idx} className="overflow-hidden">
                  <button
                    onClick={() => toggleCompany(data.company)}
                    className={`w-full text-left p-6 md:p-8 rounded-[2rem] border transition-all duration-300 flex items-center justify-between group
                      ${openCompanies.includes(data.company) 
                        ? 'bg-zinc-900 border-zinc-800 text-white shadow-lg' 
                        : 'bg-white border-zinc-100 text-zinc-900 hover:border-rose-100 hover:bg-rose-50/50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm
                        ${openCompanies.includes(data.company) ? 'bg-rose-600 text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg md:text-xl font-black">{data.company}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${openCompanies.includes(data.company) ? 'bg-white/10 text-rose-400' : 'bg-zinc-100 text-zinc-400'}`}>
                        {data.items.length} Items
                      </span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openCompanies.includes(data.company) ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openCompanies.includes(data.company) && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="pt-4 pb-8 space-y-3 px-4">
                          {data.items.map((item, qIdx) => (
                            <div key={qIdx} className="group flex gap-4 p-5 bg-white border border-zinc-100 rounded-2xl hover:border-rose-100 hover:shadow-sm transition-all">
                               <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                                 {getQuestionIcon(item.category)}
                               </div>
                               <div className="space-y-1">
                                  <span className="text-[9px] font-black uppercase text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-lg">
                                    {item.category}
                                  </span>
                                  <p className="text-sm font-bold text-zinc-700 leading-relaxed mt-2">
                                    {item.question}
                                  </p>
                               </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* The rest of the views (certs, assignments, casebooks) follow the original logic ... */}
        {activeView === 'certs' && (
           <motion.div key="certs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
             {certificationData.map((section, sectionIdx) => (
               <div key={sectionIdx} className="overflow-hidden">
                 <button onClick={() => toggleCert(sectionIdx)} className={`w-full text-left p-6 md:p-8 rounded-[2.5rem] border transition-all duration-300 flex items-center justify-between group ${openCerts.includes(sectionIdx) ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-100 text-zinc-900'}`}>
                   <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight">{section.category}</h2>
                   <ChevronDown className={`w-6 h-6 transition-transform ${openCerts.includes(sectionIdx) ? 'rotate-180' : ''}`} />
                 </button>
                 <AnimatePresence>
                   {openCerts.includes(sectionIdx) && (
                     <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 pb-12 px-2">
                         {section.items.map((cert, certIdx) => (
                           <div key={certIdx} className="group bg-white rounded-[2.5rem] border border-zinc-100 p-8 h-full flex flex-col transition-all hover:border-indigo-100 hover:shadow-xl">
                             <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-[#79BAEC] group-hover:text-white transition-all mb-6"><cert.icon className="w-6 h-6" /></div>
                             <h3 className="font-black text-lg text-zinc-900 mb-2">{cert.title}</h3>
                             <p className="text-sm text-zinc-500 font-medium mb-8 flex-grow">{cert.description}</p>
                             <a href={cert.url} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between w-full p-4 bg-zinc-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all">View Certification <ExternalLink className="w-4 h-4" /></a>
                           </div>
                         ))}
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             ))}
           </motion.div>
        )}

        {activeView === 'assignments' && (
           <motion.div key="assignments" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
             <div className="space-y-8">
               <div className="relative max-w-xl mx-auto">
                 <input type="text" placeholder="Search assignments..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-[1.5rem] focus:ring-4 focus:ring-amber-100 outline-none text-sm font-bold shadow-sm" />
                 <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
               </div>
               <div className="flex flex-wrap items-center justify-center gap-2">
                 {roleFilters.map((filter) => (
                   <button key={filter} onClick={() => setSelectedRoleFilter(filter)} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all border ${selectedRoleFilter === filter ? 'bg-amber-500 border-amber-500 text-white shadow-lg' : 'bg-white text-zinc-500 hover:bg-amber-50'}`}>{filter}</button>
                 ))}
               </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredAssignments.map((item, idx) => (
                 <div key={idx} className="group bg-white rounded-[2rem] border border-zinc-100 p-6 h-full flex flex-col transition-all hover:border-amber-100 hover:shadow-xl">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-amber-500 group-hover:text-white transition-all"><FileText className="w-5 h-5" /></div>
                     <div className="min-w-0">
                        <h3 className="font-black text-sm text-zinc-900 truncate">{item.company}</h3>
                        <p className="text-[10px] font-black uppercase text-zinc-400 truncate">{item.position}</p>
                     </div>
                   </div>
                   <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between w-full p-3 bg-zinc-900 text-white rounded-xl font-black text-[9px] uppercase hover:bg-amber-500 transition-all">View Assignment <ExternalLink className="w-3 h-3" /></a>
                 </div>
               ))}
             </div>
           </motion.div>
        )}

        {activeView === 'casebooks' && (
           <motion.div key="casebooks" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {casebookData.items.map((cert, certIdx) => (
               <div key={certIdx} className="group bg-white rounded-[2.5rem] border border-zinc-100 p-8 h-full flex flex-col transition-all hover:border-emerald-100 hover:shadow-xl">
                 <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-600 group-hover:text-white transition-all mb-6"><cert.icon className="w-6 h-6" /></div>
                 <h3 className="font-black text-lg text-zinc-900 mb-2">{cert.title}</h3>
                 <p className="text-sm text-zinc-500 font-medium mb-8 flex-grow">{cert.description}</p>
                 <a href={cert.url} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between w-full p-4 bg-zinc-900 text-white rounded-xl font-black text-[10px] uppercase hover:bg-emerald-600 transition-all">View Casebook <ExternalLink className="w-4 h-4" /></a>
               </div>
             ))}
           </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Showcase & Journey CTA Banner */}
      <div className="mt-12 md:mt-16 bg-zinc-950 rounded-3xl md:rounded-[2.25rem] p-7 sm:p-9 md:p-10 text-white relative overflow-hidden shadow-xl border border-zinc-800/80">
        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none text-zinc-400">
          <Award className="w-36 h-36 sm:w-44 sm:h-44 stroke-[1.2]" />
        </div>
        <div className="relative z-10 max-w-xl space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to showcase your skills?
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-normal leading-relaxed">
            Build the knowledge. Practice the cases. Then prove what you can do.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer group"
            >
              <span>{bottomCtaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
