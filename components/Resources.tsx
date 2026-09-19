import React, { useState, useMemo, useEffect } from 'react';
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
  ArrowRight,
  Settings,
  Copy,
  Check
} from 'lucide-react';
import { useOutletContext, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ContextType {
  isCollapsed: boolean;
}

const certificationData = [
  {
    id: "ai-cloud-dev",
    category: "AI, CLOUD & DEVELOPER FOUNDATIONS",
    description: "Build foundational skills in AI, cloud platforms, and developer tools for modern product roles.",
    icon: Cloud,
    iconBg: "bg-[#EEF2FF] text-[#6366F1]",
    items: [
      { 
        title: "Foundations of Prompt Engineering", 
        provider: "AWS Skill Builder",
        description: "Learn how to design effective prompts and work efficiently with large language models.", 
        url: "https://skillbuilder.aws/learn/VF6H4SZ1BU/foundations-of-prompt-engineering/7U8XFUVXDT", 
        icon: Bot 
      },
      { 
        title: "AWS Cloud Practitioner Essentials", 
        provider: "AWS Skill Builder",
        description: "Covers core cloud concepts, AWS services, pricing models, and security fundamentals.", 
        url: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7", 
        icon: Cloud 
      },
      { 
        title: "AI Agents Course", 
        provider: "Hugging Face",
        description: "Hands-on introduction to building AI agents, tool use, planning, and reasoning.", 
        url: "https://huggingface.co/learn/agents-course/en/unit0/introduction", 
        icon: Zap 
      },
      { 
        title: "Postman API Fundamentals – Student Expert", 
        provider: "Postman",
        description: "Demonstrates strong fundamentals in APIs, requests, collections, testing, and documentation.", 
        url: "https://academy.postman.com/postman-api-fundamentals-student-expert-certification-1", 
        icon: Code 
      }
    ]
  },
  {
    id: "beginner-pm",
    category: "BEGINNER LEVEL – PRODUCT MANAGEMENT FOUNDATIONS",
    description: "Start your PM journey with core concepts, frameworks, and essential product thinking.",
    icon: BarChart2,
    iconBg: "bg-[#FFF7ED] text-[#F97316]",
    items: [
      { 
        title: "Product Management Basics Certification", 
        provider: "ProductLed",
        description: "Covers core PM concepts including roles, responsibilities, lifecycle, and stakeholder management.", 
        url: "https://www.productledcertified.com/product-management-basics", 
        icon: Layout 
      },
      { 
        title: "Radical Product Thinking: Vision Setting", 
        provider: "ProductLed",
        description: "Focuses on defining a strong product vision, strategy, and long-term roadmap.", 
        url: "https://www.productledcertified.com/radical-product-thinking-vision-setting", 
        icon: Target 
      }
    ]
  },
  {
    id: "intermediate-pm",
    category: "INTERMEDIATE LEVEL – CORE PRODUCT SKILLS",
    description: "Deepen your expertise with data, analytics, user research, and product strategy.",
    icon: Settings,
    iconBg: "bg-[#ECFDF5] text-[#10B981]",
    items: [
      { 
        title: "Product Strategy Micro-Certification (PSC)", 
        provider: "Product School",
        description: "Aligns product decisions with business outcomes and competitive strategy.", 
        url: "https://productschool.teachable.com/p/productstrategy", 
        icon: TrendingUp 
      },
      { 
        title: "Product Discovery Micro-Certification (PDC)", 
        provider: "Product School",
        description: "Deep dive into user research, validation, and hypothesis-driven development.", 
        url: "https://productschool.teachable.com/p/pdc", 
        icon: Search 
      },
      { 
        title: "Product Roadmapping Micro-Certification (PRC)", 
        provider: "Product School",
        description: "Covers prioritization frameworks, stakeholder alignment, and execution planning.", 
        url: "https://productschool.teachable.com/p/productanalytics", 
        icon: Layers 
      },
      { 
        title: "Product Analytics Micro-Certification (PAC)", 
        provider: "Product School",
        description: "Teaches data-driven decision-making using metrics, funnels, and experimentation.", 
        url: "https://productschool.teachable.com/p/productanalytics", 
        icon: BarChart2 
      }
    ]
  },
  {
    id: "advanced-pm",
    category: "ADVANCED LEVEL – SPECIALIZED & EXECUTION-FOCUSED",
    description: "Master advanced topics like growth, monetization, leadership, and real-world execution.",
    icon: Rocket,
    iconBg: "bg-[#FFE4E6] text-[#F43F5E]",
    items: [
      { 
        title: "Product Launches Micro-Certification (PRLC)", 
        provider: "Product School",
        description: "End-to-end product launch planning, GTM strategy, and post-launch optimization.", 
        url: "https://productschool.teachable.com/p/productlaunches", 
        icon: Rocket 
      },
      { 
        title: "A/B Testing for Business Analysts", 
        provider: "Udacity",
        description: "Practical experimentation techniques to evaluate and optimize product decisions.", 
        url: "https://www.udacity.com/course/ab-testing-business-analysts--ud979", 
        icon: Activity 
      },
      { 
        title: "Product Design", 
        provider: "Udacity",
        description: "Covers UX principles, design thinking, and building intuitive, user-centric products.", 
        url: "https://www.udacity.com/course/product-design--ud509", 
        icon: Smartphone 
      }
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

const casebookSections = [
  {
    id: "iim-flagship",
    title: "IIM Flagship PM Casebooks",
    subtitle: "Comprehensive interview question banks, guesstimates, and frameworks from IIM Calcutta, Bangalore, Ahmedabad, Vizag, Lucknow, and Indore",
    icon: GraduationCap,
    iconBg: "bg-[#ECFDF5] text-[#059669]",
    items: [
      { title: "IIM C PM casebook", description: "Structured product cases and breakdown frameworks from IIM Calcutta.", url: "https://lnkd.in/gAXsXx5f", icon: GraduationCap },
      { title: "IIM B PM casebook", description: "Exclusive PM interview prep material and product teardowns from IIM Bangalore.", url: "https://lnkd.in/gpesd2mc", icon: GraduationCap },
      { title: "IIM A PM casebook", description: "Case-based learning insights, root cause analysis, and product sense from IIM Ahmedabad.", url: "https://lnkd.in/gm5gTpR7", icon: GraduationCap },
      { title: "IIM V PM casebook", description: "Product management concepts, metrics trees, and cases from IIM Vizag.", url: "https://lnkd.in/gC7kA-_f", icon: GraduationCap },
      { title: "IIM L PM casebook", description: "In-depth product cases and user journey models compiled by IIM Lucknow.", url: "https://lnkd.in/g6Qft32x", icon: GraduationCap },
      { title: "IIM I PM casebook", description: "Comprehensive PM interview guide, strategy problems, and teardowns from IIM Indore.", url: "https://lnkd.in/gMc53Sar", icon: GraduationCap }
    ]
  },
  {
    id: "top-bschools-tech",
    title: "Premier B-Schools & Engineering Institutes",
    subtitle: "Curated product cases and industry problem sets from MDI Gurgaon, BitSoM, IIT Madras, and IIT Kanpur",
    icon: Library,
    iconBg: "bg-[#EFF6FF] text-[#2563EB]",
    items: [
      { title: "MDI GGN PM casebook", description: "Product management strategy and user design cases from MDI Gurgaon.", url: "https://lnkd.in/gYFZvp4P", icon: GraduationCap },
      { title: "BitSoM PM casebook", description: "Modern PM cases, product teardowns, and execution frameworks from BitSoM.", url: "https://lnkd.in/g3derdd2", icon: GraduationCap },
      { title: "IIT M PM casebook", description: "Technical and business product cases and systems thinking from IIT Madras.", url: "https://lnkd.in/gQsRTYxF", icon: GraduationCap },
      { title: "IIT K PM casebook", description: "Problem-solving, algorithmic thinking, and product strategy cases from IIT Kanpur.", url: "https://lnkd.in/gtKFsPhx", icon: GraduationCap }
    ]
  },
  {
    id: "frameworks-global",
    title: "Global Tech & Strategy Frameworks",
    subtitle: "Mental models, root cause trees, metrics breakdowns, and estimation guides",
    icon: BookOpen,
    iconBg: "bg-[#FDF4FF] text-[#C026D3]",
    items: [
      { title: "Product Sense & Execution Playbook", description: "First-principles mental models for feature definition, user journey mapping, and prioritization.", url: "https://lnkd.in/gpesd2mc", icon: Sparkles },
      { title: "Root Cause Analysis (RCA) Frameworks", description: "Systematic approaches to diagnosing metric drops and debugging growth bottlenecks.", url: "https://lnkd.in/gm5gTpR7", icon: TrendingUp },
      { title: "Guesstimate & Market Sizing Guide", description: "Top-down and bottom-up estimation methods, sanity checks, and sample problems.", url: "https://lnkd.in/gAXsXx5f", icon: PieChart }
    ]
  }
];

const assignmentSections = [
  {
    id: "apm",
    role: "APM Problem Statements",
    subtitle: "Associate Product Manager problem statements, feature specs & take-home decks",
    icon: Sparkles,
    iconBg: "bg-[#FEF3C7] text-[#D97706]",
    badge: "ENTRY & ACCELERATOR",
    items: assignmentData.filter(a => a.position.toLowerCase().includes("apm"))
  },
  {
    id: "intern",
    role: "PM Intern Challenges",
    subtitle: "Real-world summer internship assessments and student product challenges",
    icon: GraduationCap,
    iconBg: "bg-[#EFF6FF] text-[#2563EB]",
    badge: "CAMPUS & INTERNSHIP",
    items: assignmentData.filter(a => a.position.toLowerCase().includes("intern"))
  },
  {
    id: "analyst",
    role: "Product Analyst Assessments",
    subtitle: "Data-intensive analytics, telemetry modeling & SQL problem statements",
    icon: TrendingUp,
    iconBg: "bg-[#ECFDF5] text-[#059669]",
    badge: "DATA & ANALYTICS",
    items: assignmentData.filter(a => a.position.toLowerCase().includes("analyst") || a.position.toLowerCase().includes("pa"))
  },
  {
    id: "spm",
    role: "Senior PM & Specialized Roles",
    subtitle: "Strategic leadership, operations, and mid-to-senior product management challenges",
    icon: Briefcase,
    iconBg: "bg-[#F3E8FF] text-[#7E22CE]",
    badge: "EXPERIENCED PM",
    items: assignmentData.filter(a => !a.position.toLowerCase().includes("apm") && !a.position.toLowerCase().includes("intern") && !a.position.toLowerCase().includes("analyst"))
  }
];

const companyMetaMap: Record<string, { subtitle: string; tags: string[] }> = {
  "Google": {
    subtitle: "Product, strategy & interview cases",
    tags: ["Product Sense", "Guesstimates", "Behavioral"]
  },
  "Meta (Facebook)": {
    subtitle: "Growth, product strategy & behavioral",
    tags: ["Product Design", "RCA / Metrics", "Behavioral"]
  },
  "Amazon": {
    subtitle: "Product strategy, metrics & leadership",
    tags: ["Product Sense", "RCA / Metrics", "Strategy"]
  },
  "Microsoft": {
    subtitle: "Product, strategy & technical thinking",
    tags: ["Product Design", "Behavioral", "Strategy"]
  },
  "Apple": {
    subtitle: "Product intuition & design thinking",
    tags: ["Product Sense", "Product Design", "Strategy"]
  },
  "Netflix": {
    subtitle: "Growth, product strategy & analytics",
    tags: ["RCA / Metrics", "Guesstimates", "Behavioral"]
  },
  "Uber": {
    subtitle: "Marketplace strategy & execution",
    tags: ["Product Sense", "RCA / Metrics", "Strategy"]
  },
  "Airbnb": {
    subtitle: "Hospitality, community & marketplace design",
    tags: ["Product Sense", "Product Design", "RCA / Metrics"]
  },
  "LinkedIn": {
    subtitle: "Social graph, enterprise & B2B networking",
    tags: ["Product Sense", "RCA / Metrics", "Guesstimates"]
  },
  "Spotify": {
    subtitle: "Audio streaming, personalization & growth",
    tags: ["Product Sense", "Product Design", "Behavioral"]
  },
  "Stripe": {
    subtitle: "Developer platform, fintech & infra",
    tags: ["Product Sense", "Product Design", "RCA / Metrics"]
  },
  "Salesforce": {
    subtitle: "Enterprise CRM, AI & B2B SaaS",
    tags: ["Product Sense", "Product Design", "Strategy"]
  },
  "DoorDash": {
    subtitle: "On-demand logistics & 3-sided marketplace",
    tags: ["Product Sense", "RCA / Metrics", "Strategy"]
  },
  "Lyft": {
    subtitle: "Rideshare, micro-mobility & urban transit",
    tags: ["Product Sense", "Product Design", "RCA / Metrics"]
  },
  "TikTok / ByteDance": {
    subtitle: "Short-form video, algorithm & creator economy",
    tags: ["Product Sense", "RCA / Metrics", "Strategy"]
  },
  "Shopify": {
    subtitle: "E-commerce platform, merchants & payment rails",
    tags: ["Product Sense", "Product Design", "RCA / Metrics"]
  },
  "Atlassian": {
    subtitle: "Developer tools, workflow & enterprise collaboration",
    tags: ["Product Sense", "Product Design", "Strategy"]
  },
  "Adobe": {
    subtitle: "Creative Cloud, generative AI & design software",
    tags: ["Product Sense", "Product Design", "Strategy"]
  },
  "PayPal": {
    subtitle: "Digital wallets, checkout & global payments",
    tags: ["Product Sense", "Product Design", "RCA / Metrics"]
  },
  "Coinbase": {
    subtitle: "Crypto exchange, web3 infrastructure & DeFi",
    tags: ["Product Sense", "Product Design", "Strategy"]
  },
  "Twitter / X": {
    subtitle: "Real-time feed, creator subscriptions & live audio",
    tags: ["Product Sense", "Product Design", "Behavioral"]
  },
  "Dropbox": {
    subtitle: "Cloud storage, collaboration & smart workspace",
    tags: ["Product Sense", "Product Design", "RCA / Metrics"]
  },
  "Instacart": {
    subtitle: "On-demand grocery, logistics & retail media",
    tags: ["Product Sense", "Product Design", "RCA / Metrics"]
  },
  "Flipkart": {
    subtitle: "Hyper-scale e-commerce, logistics & marketplace",
    tags: ["Product Sense", "Product Design", "RCA / Metrics"]
  },
  "Swiggy": {
    subtitle: "Hyperlocal food delivery, Instamart & quick commerce",
    tags: ["Product Sense", "Product Design", "RCA / Metrics"]
  },
  "Zomato": {
    subtitle: "Food delivery, Blinkit quick-commerce & dining out",
    tags: ["Product Sense", "Product Design", "RCA / Metrics"]
  },
  "Razorpay": {
    subtitle: "Payment gateway, neo-banking & financial infra",
    tags: ["Product Sense", "Product Design", "RCA / Metrics"]
  },
  "Intuit": {
    subtitle: "TurboTax, QuickBooks & SMB fintech platform",
    tags: ["Product Sense", "Product Design", "Strategy"]
  },
  "Pinterest": {
    subtitle: "Visual discovery, shopping & creator boards",
    tags: ["Product Sense", "Product Design", "RCA / Metrics"]
  },
  "Snap (Snapchat)": {
    subtitle: "Augmented reality, ephemeral messaging & camera company",
    tags: ["Product Sense", "Product Design", "RCA / Metrics"]
  }
};

const CompanyLogo: React.FC<{ company: string }> = ({ company }) => {
  switch (company) {
    case 'Google':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
          <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.91 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
        </svg>
      );
    case 'Meta (Facebook)':
    case 'Meta':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#0866FF">
          <path d="M12 6.5C8.8 6.5 6.2 8.7 5.1 11.6c-.8 2-1.7 3.7-2.9 4.8C1.5 17.1.8 17.5 0 17.5v-2.2c.4 0 .9-.3 1.5-.9 1-1 1.8-2.5 2.6-4.4C5.4 7.2 8.5 4.5 12 4.5s6.6 2.7 7.9 5.5c.8 1.9 1.6 3.4 2.6 4.4.6.6 1.1.9 1.5.9v2.2c-.8 0-1.5-.4-2.2-1.1-1.2-1.1-2.1-2.8-2.9-4.8-1.1-2.9-3.7-5.1-6.9-5.1z"/>
          <path d="M12 8.7c2.5 0 4.6 1.9 5.4 4.5-1.1 1.6-2.1 2.8-3.1 3.5-1.1.8-2.3 1.3-3.8 1.3s-2.7-.5-3.8-1.3c-1-.7-2-1.9-3.1-3.5.8-2.6 2.9-4.5 5.4-4.5zm0-2.2C7.5 6.5 3.8 10 2.8 14.5c1.1 1.3 2.2 2.2 3.6 2.8 1.7.7 3.6 1.1 5.6 1.1s3.9-.4 5.6-1.1c1.4-.6 2.5-1.5 3.6-2.8-1-4.5-4.7-8-9.2-8z" opacity="0.95"/>
        </svg>
      );
    case 'Amazon':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <path d="M14.5 10.5c0-.9-.6-1.4-1.6-1.4-.9 0-1.4.5-1.5 1.1h-1.6c.1-1.5 1.4-2.4 3.1-2.4 2 0 3.2 1 3.2 2.8v4.6h-1.5v-1.1c-.6.8-1.5 1.3-2.6 1.3-1.6 0-2.6-1-2.6-2.4 0-1.6 1.2-2.3 3.2-2.3h1.4v-.2zm-1.4 3.7c.9 0 1.4-.6 1.4-1.2v-.8h-1.2c-1.1 0-1.7.3-1.7 1.1 0 .6.5.9 1.5.9z" fill="#111827"/>
          <path d="M20.2 18.2C15.5 21.6 8.5 21.6 3.8 18.2c-.3-.2-.1-.6.2-.4 4.5 2.6 11.4 2.6 15.9-.2.4-.2.6.2.3.6z" fill="#FF9900"/>
          <path d="M21 17c-.2-.3-1-.4-1.4-.3-.2.1-.2.3 0 .4.8.4 1.2.9 1.1 1.2-.1.3-.8.5-1.6.5-.3 0-.3.2-.1.3 1 .4 2.2.3 2.3-.2.2-.6-.1-1.5-.3-1.9z" fill="#FF9900"/>
        </svg>
      );
    case 'Microsoft':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <rect x="2" y="2" width="9.2" height="9.2" fill="#F25022"/>
          <rect x="12.8" y="2" width="9.2" height="9.2" fill="#7FBA00"/>
          <rect x="2" y="12.8" width="9.2" height="9.2" fill="#00A4EF"/>
          <rect x="12.8" y="12.8" width="9.2" height="9.2" fill="#FFB900"/>
        </svg>
      );
    case 'Apple':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#1E293B">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.62-.75 1.04-1.8 0.92-2.84-.89.04-1.98.6-2.61 1.34-.55.63-1.03 1.66-.9 2.68 1 .08 2.01-.51 2.59-1.18z"/>
        </svg>
      );
    case 'Netflix':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-7">
          <path fill="#E50914" d="M5.3 0v24c1.8-.4 3.4-.8 5.3-1.1V0H5.3z"/>
          <path fill="#B81D24" d="M13.4 0v11.3l5.3 11.6V0h-5.3z"/>
          <path fill="#E50914" d="M5.3 24l8.1-17.7 5.3 11.6L5.3 24z"/>
        </svg>
      );
    case 'Uber':
      return (
        <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white font-extrabold text-sm tracking-tight shadow-xs">
          Uber
        </div>
      );
    case 'Airbnb':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#FF385C">
          <path d="M12 1.5c-4.2 0-7.5 3.3-7.5 7.5 0 3.2 1.9 6.2 4.4 9.1 1 1.1 2 2.3 3.1 3.9 1.1-1.6 2.1-2.8 3.1-3.9 2.5-2.9 4.4-5.9 4.4-9.1 0-4.2-3.3-7.5-7.5-7.5zm0 11.8c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3z"/>
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#0A66C2">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
      );
    case 'Spotify':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <circle cx="12" cy="12" r="11" fill="#1DB954"/>
          <path d="M17.5 16.2c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.8-9.3-1-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 4.1-.9 7.5-.6 10.4 1.1.2.2.3.6.2.9zm1.3-2.9c-.3.4-.8.5-1.2.3-3-1.8-7.5-2.3-11-1.3-.5.1-1-.2-1.1-.6-.1-.5.2-1 .6-1.1 4.1-1.2 9.1-.6 12.5 1.5.4.2.5.7.2 1.2zm.1-3C15.2 8.2 9.1 8 5.6 9.1c-.6.2-1.2-.2-1.4-.7-.2-.6.2-1.2.7-1.4 4.1-1.2 10.8-1 14.9 1.4.5.3.7 1 .4 1.5-.3.4-1 .6-1.3.4z" fill="#FFFFFF"/>
        </svg>
      );
    case 'Stripe':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#635BFF"/>
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-4.116C17.658 2.25 15.304 1.7 12.52 1.7 7.218 1.7 3.5 4.515 3.5 9.096c0 6.643 8.878 5.58 8.878 8.528 0 1.054-.916 1.53-2.227 1.53-2.526 0-5.385-1.173-7.151-2.138l-.946 4.26c1.996 1.054 4.887 1.687 7.914 1.687 5.577 0 9.53-2.673 9.53-7.391 0-7.228-8.522-5.748-8.522-8.422z" fill="#FFFFFF" transform="scale(0.7) translate(5, 5)"/>
        </svg>
      );
    case 'Salesforce':
      return (
        <div className="w-8 h-8 rounded-lg bg-[#00A1E0] flex items-center justify-center text-white shadow-xs">
          <Cloud className="w-5 h-5 fill-white text-white" />
        </div>
      );
    case 'DoorDash':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#FF3008"/>
          <path d="M19.5 8.5C18.1 6.3 15.6 5 12.5 5H4v4.5h8.5c1.4 0 2.6.7 3.3 1.8.7 1.1.7 2.4 0 3.5-.7 1.1-1.9 1.8-3.3 1.8H7V19h5.5c3.1 0 5.6-1.3 7-3.5 1.3-2.1 1.3-4.9 0-7z" fill="#FFFFFF"/>
        </svg>
      );
    case 'Lyft':
      return (
        <div className="w-8 h-8 rounded-xl bg-[#FF00BF] flex items-center justify-center text-white font-black text-xs tracking-tight shadow-xs">
          lyft
        </div>
      );
    case 'TikTok / ByteDance':
    case 'TikTok':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#010101"/>
          <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-2.95v12.2a2.45 2.45 0 0 1-2.45 2.45 2.45 2.45 0 0 1-2.45-2.45 2.45 2.45 0 0 1 2.45-2.45c.34 0 .66.07.95.2V9.89a5.53 5.53 0 0 0-.95-.08 5.4 5.4 0 0 0-5.4 5.4 5.4 5.4 0 0 0 5.4 5.4 5.4 5.4 0 0 0 5.4-5.4V8.71a7.18 7.18 0 0 0 4.19 1.35V7.11a4.24 4.24 0 0 1-2.68-1.29z" fill="#25F4EE"/>
          <path d="M17.1 6.32a4.28 4.28 0 0 1-1.06-2.82h-1v.5a4.28 4.28 0 0 0 1.06 2.82 4.24 4.24 0 0 0 2.68 1.29V7.61a4.24 4.24 0 0 1-1.68-1.29z" fill="#FE2C55"/>
        </svg>
      );
    case 'Shopify':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#95BF47"/>
          <path d="M17.8 7.2l-1.5-.4c-.1 0-.2 0-.2.1l-.8 1.8-.8-1.5c-.1-.1-.2-.2-.3-.2h-.4l-2.4-.6c-.2-.1-.5 0-.6.2l-1.7 5.9-2.2-.6c-.3-.1-.5.1-.6.3l-.9 3.5c-.1.2 0 .5.3.6l6.6 2.1c.1 0 .2 0 .3-.1l5.4-3.5c.2-.1.3-.4.3-.6l-.8-6.4c0-.1-.1-.2-.2-.2zm-3.2 2.6l-1 2.2-1.3-4.5 2.3.6v1.7z" fill="#FFFFFF"/>
        </svg>
      );
    case 'Atlassian':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#0052CC"/>
          <path d="M11.6 13.9c-.3.4-.4.9-.3 1.4.3 1.1 1.4 1.7 2.4 1.4l3.1-1c-.8-1.8-2.2-3.2-4-4l-1.2 2.2zm-.9-2.3C9.2 12.1 8 13.6 7.4 15.3l3.1 1c1.1.3 2.1-.3 2.4-1.4.1-.5 0-1-.3-1.4l-1.9-3.3z" fill="#2684FF"/>
          <path d="M16.7 15.7l-3.1 1c-1 .3-2.1-.3-2.4-1.4-.1-.5 0-1 .3-1.4l1.9-3.3c.3-.4.8-.7 1.3-.7s1 .2 1.3.7l1.9 3.3c.6 1 .4 1.5-.2 1.8z" fill="#FFFFFF"/>
        </svg>
      );
    case 'Adobe':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#FF0000"/>
          <path d="M14.7 4.5h5.3v15H14.7zm-5.4 0H4v15h5.3zm2.7 6.4L15.3 19.5h-2.9l-1.2-3H8.8l2.6-5.6z" fill="#FFFFFF"/>
        </svg>
      );
    case 'PayPal':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#003087"/>
          <path d="M7 5.5h5c2.2 0 3.9 1.4 3.5 3.7-.4 2.5-2.2 3.8-4.4 3.8H9.3l-.8 5.5H6.2L7 5.5z" fill="#0079C1"/>
          <path d="M9.8 8h4.5c2 0 3.5 1.2 3.1 3.3-.4 2.2-2 3.4-4 3.4h-1.6l-.8 5.3H9l.8-5.3V8z" fill="#00457C" opacity="0.6"/>
          <path d="M10.8 9.5h4c1.7 0 3 1 2.7 2.8-.3 1.8-1.7 2.8-3.4 2.8h-1.4l-.7 4.4h-1.8l.6-4.4V9.5z" fill="#0079C1"/>
        </svg>
      );
    case 'Coinbase':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#0052FF"/>
          <circle cx="12" cy="12" r="5.5" fill="#FFFFFF"/>
          <rect x="9.8" y="9.8" width="4.4" height="4.4" rx="1" fill="#0052FF"/>
        </svg>
      );
    case 'Twitter / X':
    case 'Twitter':
    case 'X':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#000000"/>
          <path d="M17.4 5.5h2.1l-4.6 5.3 5.4 7.2h-4.2l-3.3-4.3-3.8 4.3H6.9l4.9-5.6L6.5 5.5h4.3l3 4 3.6-4zm-.7 11.2h1.2L9.4 6.7H8.1l8.6 10z" fill="#FFFFFF"/>
        </svg>
      );
    case 'Dropbox':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#0061FF"/>
          <path d="M7 6.5l5 3.2-5 3.3-5-3.3 5-3.2zm10 0l5 3.2-5 3.3-5-3.3 5-3.2zM2 13l5 3.3 5-3.3-5-3.2-5 3.2zm15 3.3l5-3.3-5-3.2-5 3.2 5 3.3zM12 17.1l-5-3.3v1.4l5 3.3 5-3.3v-1.4l-5 3.3z" fill="#FFFFFF"/>
        </svg>
      );
    case 'Instacart':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#003D29"/>
          {/* Carrot leaf green */}
          <path d="M12 5c0 1.5-.8 2.6-1.8 2.9.2-.8.6-1.7 1.4-2.4.2-.2.4-.4.4-.5z" fill="#43B02A"/>
          <path d="M12.5 5c0 1.2.6 2.2 1.4 2.6-.2-.7-.4-1.5-.9-2.2-.3-.3-.5-.4-.5-.4z" fill="#43B02A"/>
          {/* Carrot body orange */}
          <path d="M10.2 8.5c-.3.4-.4.9-.2 1.4l2.4 6.8c.2.6.8 1 1.4.8.4-.1.7-.5.8-.9l1.6-6.8c.2-.7-.3-1.4-1-1.6l-4.1-.7c-.3 0-.7.3-.9 1z" fill="#FF8200"/>
        </svg>
      );
    case 'Flipkart':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#2874F0"/>
          {/* Yellow shopping bag emblem */}
          <path d="M7.5 9h9l-1 9.5H8.5L7.5 9z" fill="#FFE11B"/>
          {/* Bag handle */}
          <path d="M10 9V7.2C10 6 10.9 5 12 5s2 1 2 2.2V9" stroke="#FFE11B" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          {/* 'f' in blue */}
          <path d="M13.2 11h-2v1.5h1.8v1.2h-1.8V17H10v-6.8c0-.7.5-1.2 1.2-1.2h2V11z" fill="#2874F0"/>
        </svg>
      );
    case 'Swiggy':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#FC8019"/>
          {/* Swiggy location pin 'S' swirl */}
          <path d="M12 4.5C8.7 4.5 6 7.2 6 10.5c0 4.5 5.2 8.5 5.6 8.8.2.2.6.2.8 0 .4-.3 5.6-4.3 5.6-8.8 0-3.3-2.7-6-6-6zm1.1 7.9c-.8.8-2 .9-2.8.2l1.6-1.6c.2.2.5.2.7 0 .2-.2.2-.5 0-.7l-1.9-1.9c-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0l-1.6 1.6c-.2-.2-.5-.2-.7 0-.2.2-.2.5 0 .7l1.9 1.9c.8.8.8 2 0 2.6z" fill="#FFFFFF"/>
        </svg>
      );
    case 'Zomato':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#CB202D"/>
          <text x="12" y="15.8" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontSize="11" fontStyle="italic" fontWeight="900" letterSpacing="-0.5">
            zomato
          </text>
        </svg>
      );
    case 'Razorpay':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#0C2340"/>
          {/* Razorpay dynamic blue lightning blade */}
          <path d="M14.8 5l-6.6 7.2h4.1L8.5 19l8.2-8.5h-4.3L14.8 5z" fill="#0C78F0"/>
        </svg>
      );
    case 'Intuit':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#0077C5"/>
          <circle cx="8" cy="12" r="2.2" fill="#FFFFFF"/>
          <path d="M11.5 9.8h2.2v4.4h-2.2z" fill="#FFFFFF"/>
          <circle cx="16" cy="12" r="2.2" fill="#FFFFFF"/>
        </svg>
      );
    case 'Pinterest':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#E60023"/>
          <path d="M12 5c-3.9 0-7 3.1-7 7 0 3 1.9 5.5 4.5 6.5-.1-.6-.1-1.4.1-2.1l1-4.3s-.3-.5-.3-1.3c0-1.2.7-2.1 1.6-2.1.8 0 1.1.6 1.1 1.3 0 .8-.5 1.9-.8 3-.2.9.4 1.7 1.3 1.7 1.6 0 2.8-1.7 2.8-4.1 0-2.1-1.5-3.6-3.7-3.6-2.5 0-4 1.9-4 3.9 0 .8.3 1.6.7 2.1.1.1.1.2 0 .4l-.3 1.1c0 .2-.2.3-.4.2-1.4-.7-2.3-2.7-2.3-4.4 0-3.6 2.6-6.8 7.5-6.8 3.9 0 7 2.8 7 6.6 0 3.9-2.5 7.1-5.9 7.1-1.2 0-2.2-.6-2.6-1.3l-.7 2.7c-.3 1-.9 2.2-1.4 3 .9.3 1.9.4 3 .4 3.9 0 7-3.1 7-7 0-3.9-3.1-7-7-7z" fill="#FFFFFF"/>
        </svg>
      );
    case 'Snap (Snapchat)':
    case 'Snap':
    case 'Snapchat':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7">
          <rect width="24" height="24" rx="6" fill="#FFFC00"/>
          {/* Ghost outline */}
          <path d="M12 5.5c-2.3 0-3.8 1.6-3.8 3.6 0 .5.1 1.1.2 1.5-.5.1-1 .3-1.2.7-.2.4 0 .8.2 1.1.1.1.2.2.2.3-.3.4-.8.9-1.3 1.2-.2.1-.3.3-.2.5.1.2.3.3.5.3.7 0 1.5-.2 2.2-.6.4.8 1.1 1.4 2.1 1.6-.3.4-.8.7-1.4.8-.2 0-.3.2-.3.4 0 .2.2.3.4.3.8 0 1.6-.3 2.3-.7.1.1.3.1.4.1s.3 0 .4-.1c.7.4 1.5.7 2.3.7.2 0 .4-.1.4-.3 0-.2-.1-.4-.3-.4-.6-.1-1.1-.4-1.4-.8 1-.2 1.7-.8 2.1-1.6.7.4 1.5.6 2.2.6.2 0 .4-.1.5-.3.1-.2 0-.4-.2-.5-.5-.3-1-.8-1.3-1.2 0-.1.1-.2.2-.3.2-.3.4-.7.2-1.1-.2-.4-.7-.6-1.2-.7.1-.4.2-1 .2-1.5 0-2-1.5-3.6-3.8-3.6z" fill="#FFFFFF" stroke="#000000" strokeWidth="0.8" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return (
        <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
          {company.charAt(0)}
        </div>
      );
  }
};

const getTagBadgeStyle = (tag: string) => {
  switch (tag) {
    case 'Product Sense':
      return 'bg-[#FFE4E6] text-[#F43F5E]';
    case 'Product Design':
      return 'bg-[#EDE9FE] text-[#7C3AED]';
    case 'RCA / Metrics':
      return 'bg-[#D1FAE5] text-[#059669]';
    case 'Guesstimates':
      return 'bg-[#FEF3C7] text-[#D97706]';
    case 'Behavioral':
      return 'bg-[#E0F2FE] text-[#0284C7]';
    case 'Strategy':
      return 'bg-[#FEF3C7] text-[#D97706]';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

export const Resources: React.FC = () => {
  const { isCollapsed } = useOutletContext<ContextType>();
  const { completedCount, interviewHistory } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlView = searchParams.get('view') as any;
  const initialView = ['main', 'certs', 'casebooks', 'assignments', 'questions'].includes(urlView) ? urlView : 'main';
  const [activeView, setActiveView] = useState<'main' | 'certs' | 'casebooks' | 'assignments' | 'questions'>(initialView);
  const [openCerts, setOpenCerts] = useState<number[]>([]);
  const [openCompanies, setOpenCompanies] = useState<string[]>([]);
  const [openCasebooks, setOpenCasebooks] = useState<number[]>([]);
  const [openAssignments, setOpenAssignments] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  const [selectedQuestionCategory, setSelectedQuestionCategory] = useState('All');
  const [copiedQuestionKey, setCopiedQuestionKey] = useState<string | null>(null);

  const handleCopyQuestion = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestionKey(key);
    setTimeout(() => {
      setCopiedQuestionKey(null);
    }, 2000);
  };

  // Synchronize state when URL param changes
  useEffect(() => {
    const v = searchParams.get('view') as any;
    if (v && ['main', 'certs', 'casebooks', 'assignments', 'questions'].includes(v)) {
      setActiveView(v);
    } else if (!v) {
      setActiveView('main');
    }
  }, [searchParams]);

  const handleViewChange = (view: 'main' | 'certs' | 'casebooks' | 'assignments' | 'questions') => {
    setActiveView(view);
    const newParams = new URLSearchParams(searchParams);
    if (view === 'main') {
      newParams.delete('view');
    } else {
      newParams.set('view', view);
    }
    setSearchParams(newParams, { replace: true });
  };

  // Dynamic resource counts
  const totalCerts = useMemo(() => {
    return certificationData.reduce((acc, cat) => acc + cat.items.length, 0);
  }, []);

  const totalAssignments = assignmentData.length;
  const totalCasebooks = casebookSections.reduce((acc, sec) => acc + sec.items.length, 0);
  
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

  const toggleCasebook = (index: number) => {
    setOpenCasebooks(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleAssignment = (index: number) => {
    setOpenAssignments(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const roleFilters = ['All', 'APM', 'PM Intern', 'Product Analyst', 'PM / SPM'];
  const questionCategories = ['All', 'Product Sense', 'Product Design', 'RCA / Metrics', 'Guesstimates', 'Behavioral', 'Strategy'];

  const questionFilters = [
    { id: 'All', label: 'All', icon: null, iconColor: '' },
    { id: 'Product Sense', label: 'Product Sense', icon: Target, iconColor: 'text-[#F43F5E]' },
    { id: 'Product Design', label: 'Product Design', icon: Layout, iconColor: 'text-[#7C3AED]' },
    { id: 'RCA / Metrics', label: 'RCA / Metrics', icon: TrendingUp, iconColor: 'text-[#059669]' },
    { id: 'Guesstimates', label: 'Guesstimates', icon: PieChart, iconColor: 'text-[#D97706]' },
    { id: 'Behavioral', label: 'Behavioral', icon: MessageSquare, iconColor: 'text-[#0284C7]' },
    { id: 'Strategy', label: 'Strategy', icon: Award, iconColor: 'text-[#D97706]' }
  ];

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
      const meta = companyMetaMap[companyData.company] || {
        subtitle: "Product, strategy & interview cases",
        tags: ["Product Sense", "RCA / Metrics", "Behavioral"]
      };
      const matchesSearch = companyData.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            meta.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const filteredItems = companyData.items.filter(item => {
        if (selectedQuestionCategory === 'All') return true;
        return item.category === selectedQuestionCategory;
      });

      return { 
        ...companyData, 
        subtitle: meta.subtitle,
        tags: meta.tags,
        items: filteredItems, 
        totalCount: companyData.items.length,
        matchesSearch 
      };
    }).filter(companyData => companyData.matchesSearch && companyData.items.length > 0);
  }, [searchQuery, selectedQuestionCategory]);

  const getQuestionIcon = (cat: string) => {
    switch (cat) {
      case 'Product Sense': return <Target className="w-3.5 h-3.5 text-[#F43F5E]" />;
      case 'Product Design': return <Layout className="w-3.5 h-3.5 text-[#7C3AED]" />;
      case 'RCA / Metrics': return <TrendingUp className="w-3.5 h-3.5 text-[#059669]" />;
      case 'Guesstimates': return <PieChart className="w-3.5 h-3.5 text-[#D97706]" />;
      case 'Behavioral': return <MessageSquare className="w-3.5 h-3.5 text-[#0284C7]" />;
      case 'Strategy': return <Award className="w-3.5 h-3.5 text-[#D97706]" />;
      default: return <HelpCircle className="w-3.5 h-3.5" />;
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
      {/* Hero Section: Matched to Reference resources.png */}
      <header className="relative bg-gradient-to-r from-[#070D2A] via-[#0E1B4F] to-[#1E3A8A] rounded-3xl p-6 sm:p-8 md:p-10 text-white overflow-hidden shadow-xl border border-blue-950/40 mb-8">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
        <div className="relative z-10 max-w-2xl">
          {activeView !== 'main' && (
            <button 
              onClick={() => handleViewChange('main')} 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold uppercase tracking-wider mb-5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Library
            </button>
          )}
          {activeView === 'questions' ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold tracking-wide mb-4 backdrop-blur-md">
              <FileText className="w-3.5 h-3.5 text-sky-400" /> 
              <span className="uppercase text-[11px] font-bold tracking-wider text-slate-200">COMPANY-WISE INTERVIEW PREP</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold tracking-wide mb-4 backdrop-blur-md">
              <BookOpen className="w-3.5 h-3.5 text-sky-400" /> 
              <span className="uppercase text-[11px] font-bold tracking-wider text-slate-200">YOUR PM KNOWLEDGE LIBRARY</span>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-white leading-tight">
            {activeView === 'main' ? (
              <>Curated <span className="text-[#38BDF8]">Resources.</span></>
            ) : (
              <>
                {activeView === 'certs' ? 'Industry' : activeView === 'assignments' ? 'Interview' : activeView === 'casebooks' ? 'B-School' : 'Company'}{' '}
                <span className="text-[#38BDF8]">
                  {activeView === 'certs' ? 'Certifications.' : activeView === 'assignments' ? 'Assignments.' : activeView === 'casebooks' ? 'Casebooks.' : 'Questions.'}
                </span>
              </>
            )}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
            {activeView === 'main' 
              ? 'Everything you need to build PM skills, strengthen your credentials, and prepare for top-line interviews.'
              : activeView === 'certs' 
              ? 'Industry-recognized certifications and pathways to validate your technical, analytical, and PM capabilities.'
              : activeView === 'assignments'
              ? 'Real-world product assignment briefs and decks used by hiring teams at high-growth startups and top tech firms.'
              : activeView === 'casebooks'
              ? 'Curated PM case repositories, frameworks, and problem sets compiled by premier business school product clubs.'
              : 'Exhaustive company-wise PM interview question banks spanning Product Sense, RCA, Guesstimates, and Strategy.'}
          </p>

          {activeView === 'questions' && (
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-medium text-slate-200 backdrop-blur-xs">
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>Real interview questions</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-medium text-slate-200 backdrop-blur-xs">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Company-wise breakdown</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-medium text-slate-200 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Prepare smarter</span>
              </div>
            </div>
          )}
        </div>

        {/* Hero Right Visuals: 3D Certificate or Documents & Book + Annotation */}
        <div className="hidden md:flex items-center justify-end absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 z-10 pointer-events-none select-none">
          <div className="relative w-72 h-56 flex items-center justify-end">
            {/* Handwritten annotation on top-right */}
            <div className="absolute -top-2 right-2 flex flex-col items-end z-20">
              <span 
                style={{ fontFamily: "'Caveat', cursive" }} 
                className="text-white text-base lg:text-lg font-bold leading-tight text-right tracking-wide"
              >
                {activeView === 'questions' ? (
                  <>Real<br />Questions.<br />Real<br />Opportunities.</>
                ) : activeView === 'certs' ? (
                  <>Learn.<br />Credential.<br />Grow.</>
                ) : (
                  <>Learn.<br />Prepare.<br />Grow.</>
                )}
              </span>
              {/* Hand-drawn curved doodle arrow pointing down-left toward the visual */}
              <svg className="w-8 h-8 text-white -mr-1 mt-0.5" viewBox="0 0 50 50" fill="none">
                <path 
                  d="M 38 6 C 42 18, 30 28, 12 36" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M 12 36 L 20 34 M 12 36 L 16 26" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>

            {activeView === 'questions' ? (
              /* 3D Company Questions Isometric Tablet & Checklist Illustration matching reference */
              <svg className="w-64 h-56 drop-shadow-2xl translate-y-2" viewBox="0 0 260 220" fill="none">
                <defs>
                  <linearGradient id="tabletGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#1E40AF" />
                  </linearGradient>
                  <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#1E293B" />
                  </linearGradient>
                  <linearGradient id="bubbleGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                  <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#F1F5F9" />
                  </linearGradient>
                  <filter id="qShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* Sparkle decorative dashes */}
                <path d="M 24 48 L 30 48 M 27 45 L 27 51" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
                <path d="M 228 145 L 236 149" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />

                {/* Background Tablet / Folder with Corporate Skyscraper (rotated -6deg) */}
                <g transform="rotate(-6 140 100)" filter="url(#qShadow)">
                  <rect x="75" y="24" width="130" height="150" rx="18" fill="url(#tabletGrad)" stroke="#60A5FA" strokeWidth="1.5" />
                  <rect x="85" y="38" width="110" height="122" rx="12" fill="url(#screenGrad)" />
                  
                  {/* Skyscraper */}
                  <rect x="135" y="55" width="45" height="90" rx="4" fill="#334155" stroke="#475569" strokeWidth="1" />
                  <rect x="142" y="65" width="8" height="6" rx="1" fill="#38BDF8" />
                  <rect x="156" y="65" width="8" height="6" rx="1" fill="#FDE047" />
                  <rect x="168" y="65" width="8" height="6" rx="1" fill="#38BDF8" />
                  <rect x="142" y="78" width="8" height="6" rx="1" fill="#FDE047" />
                  <rect x="156" y="78" width="8" height="6" rx="1" fill="#38BDF8" />
                  <rect x="168" y="78" width="8" height="6" rx="1" fill="#38BDF8" />
                  <rect x="142" y="91" width="8" height="6" rx="1" fill="#38BDF8" />
                  <rect x="156" y="91" width="8" height="6" rx="1" fill="#38BDF8" />
                  <rect x="168" y="91" width="8" height="6" rx="1" fill="#FDE047" />
                  <rect x="142" y="104" width="8" height="6" rx="1" fill="#FDE047" />
                  <rect x="156" y="104" width="8" height="6" rx="1" fill="#38BDF8" />
                  <rect x="168" y="104" width="8" height="6" rx="1" fill="#38BDF8" />

                  {/* Side lines */}
                  <rect x="94" y="55" width="30" height="5" rx="2.5" fill="#38BDF8" />
                  <rect x="94" y="66" width="22" height="4" rx="2" fill="#64748B" />
                  <rect x="94" y="75" width="26" height="4" rx="2" fill="#64748B" />
                  <rect x="94" y="84" width="18" height="4" rx="2" fill="#64748B" />
                </g>

                {/* Floating Chat Bubble on the Left */}
                <g transform="translate(16, 70)" filter="url(#qShadow)">
                  <rect x="0" y="0" width="76" height="54" rx="16" fill="url(#bubbleGrad)" stroke="#BFDBFE" strokeWidth="1.5" />
                  <path d="M 52 54 L 62 66 L 40 54 Z" fill="#2563EB" />
                  <rect x="14" y="16" width="36" height="5" rx="2.5" fill="#FFFFFF" />
                  <rect x="14" y="26" width="48" height="4" rx="2" fill="#BFDBFE" />
                  <rect x="14" y="35" width="28" height="4" rx="2" fill="#BFDBFE" />
                </g>

                {/* Front Checklist Card: ✓ Prepare, ✓ Practice, ✓ Progress */}
                <g transform="rotate(4 110 160)" filter="url(#qShadow)">
                  <rect x="70" y="105" width="128" height="88" rx="16" fill="url(#cardGrad)" stroke="#DBEAFE" strokeWidth="1.5" />
                  <rect x="82" y="116" width="40" height="4" rx="2" fill="#93C5FD" />
                  
                  {/* Row 1: Prepare */}
                  <circle cx="86" cy="132" r="5" fill="#3B82F6" />
                  <path d="M 83.5 132 L 85.5 134 L 88.5 130" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="96" y="135" fill="#0F172A" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">Prepare</text>

                  {/* Row 2: Practice */}
                  <circle cx="86" cy="150" r="5" fill="#3B82F6" />
                  <path d="M 83.5 150 L 85.5 152 L 88.5 148" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="96" y="153" fill="#0F172A" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">Practice</text>

                  {/* Row 3: Progress */}
                  <circle cx="86" cy="168" r="5" fill="#3B82F6" />
                  <path d="M 83.5 168 L 85.5 170 L 88.5 166" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="96" y="171" fill="#0F172A" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">Progress</text>
                </g>
              </svg>
            ) : activeView === 'certs' ? (
              /* 3D Certificate Document with Rosette Ribbon Medal */
              <svg className="w-60 h-52 drop-shadow-2xl translate-y-2" viewBox="0 0 240 200" fill="none">
                <defs>
                  <linearGradient id="certGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#F8FAFC" />
                  </linearGradient>
                  <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                  <filter id="certShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* Decorative Sparkles */}
                <path d="M 28 42 L 34 42 M 31 39 L 31 45" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
                <path d="M 22 95 L 30 99" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
                <path d="M 218 135 L 226 138" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />

                {/* Certificate Parchment Frame */}
                <g transform="rotate(3 115 105)" filter="url(#certShadow)">
                  <rect x="36" y="24" width="168" height="128" rx="18" fill="url(#certGrad)" stroke="#DBEAFE" strokeWidth="1.5" />
                  {/* Subtle inner decorative borders */}
                  <rect x="44" y="32" width="152" height="112" rx="12" fill="none" stroke="#BFDBFE" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Header Title Line (Emblem/Heading) */}
                  <rect x="76" y="44" width="88" height="8" rx="4" fill="#3B82F6" />
                  <rect x="94" y="56" width="52" height="4" rx="2" fill="#93C5FD" />

                  {/* Certificate Body Lines */}
                  <rect x="58" y="70" width="124" height="4" rx="2" fill="#E2E8F0" />
                  <rect x="68" y="80" width="104" height="4" rx="2" fill="#E2E8F0" />
                  <rect x="58" y="90" width="112" height="4" rx="2" fill="#E2E8F0" />
                  <rect x="64" y="100" width="80" height="4" rx="2" fill="#E2E8F0" />

                  {/* Signature Marks on bottom left */}
                  <line x1="58" y1="126" x2="96" y2="126" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 64 122 C 70 114, 76 124, 88 118" stroke="#64748B" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                  {/* Rosette Medal / Official Seal on bottom right */}
                  <g transform="translate(152, 102)">
                    {/* Ribbon Tails */}
                    <path d="M 12 18 L 6 36 L 14 32 L 20 36 L 16 18 Z" fill="#1E40AF" />
                    <path d="M 20 18 L 26 36 L 20 32 L 14 36 L 18 18 Z" fill="#2563EB" />
                    {/* Outer Rosette Circle */}
                    <circle cx="16" cy="14" r="14" fill="url(#ribbonGrad)" />
                    {/* Inner Golden/Light Rim */}
                    <circle cx="16" cy="14" r="10.5" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1" />
                    {/* Star in Center */}
                    <path d="M 16 8.5 L 17.5 12 L 21 12.3 L 18.3 14.7 L 19.1 18.2 L 16 16.3 L 12.9 18.2 L 13.7 14.7 L 11 12.3 L 14.5 12 Z" fill="#FFFFFF" />
                  </g>
                </g>
              </svg>
            ) : (
              /* 3D Stack: Papers + Upright Open Book */
              <svg className="w-56 h-48 drop-shadow-2xl translate-y-3" viewBox="0 0 240 200" fill="none">
                <defs>
                  <linearGradient id="paperGrad1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="paperGrad2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#F1F5F9" />
                  </linearGradient>
                  <linearGradient id="bookGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#EEF2FF" />
                    <stop offset="100%" stopColor="#E0E7FF" />
                  </linearGradient>
                  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* Sparkle decorative dashes */}
                <path d="M 30 50 L 36 50 M 33 47 L 33 53" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
                <path d="M 20 110 L 28 114" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
                <path d="M 220 140 L 226 142" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />

                {/* Rear Document Sheet (rotated slightly left) */}
                <g transform="rotate(-8 80 100)" filter="url(#softShadow)">
                  <rect x="35" y="30" width="80" height="110" rx="16" fill="url(#paperGrad1)" />
                  {/* Horizontal blue lines */}
                  <rect x="48" y="52" width="40" height="5" rx="2.5" fill="#93C5FD" />
                  <rect x="48" y="65" width="54" height="5" rx="2.5" fill="#BFDBFE" />
                  <rect x="48" y="78" width="48" height="5" rx="2.5" fill="#BFDBFE" />
                  <rect x="48" y="91" width="36" height="5" rx="2.5" fill="#BFDBFE" />
                </g>

                {/* Front Document Sheet (upright with perspective) */}
                <g transform="rotate(4 110 110)" filter="url(#softShadow)">
                  <rect x="65" y="24" width="85" height="118" rx="18" fill="url(#paperGrad2)" />
                  {/* Clean lines representing document content */}
                  <rect x="78" y="46" width="32" height="6" rx="3" fill="#60A5FA" />
                  <rect x="78" y="60" width="58" height="5" rx="2.5" fill="#93C5FD" />
                  <rect x="78" y="74" width="52" height="5" rx="2.5" fill="#BFDBFE" />
                  <rect x="78" y="88" width="56" height="5" rx="2.5" fill="#BFDBFE" />
                  <rect x="78" y="102" width="40" height="5" rx="2.5" fill="#BFDBFE" />
                </g>

                {/* Upright Open Book (standing in front-right) */}
                <g transform="translate(110, 35)" filter="url(#softShadow)">
                  {/* Left Page */}
                  <path d="M 40 20 C 25 18, 8 26, 0 34 L 0 110 C 8 102, 25 96, 40 98 Z" fill="url(#bookGrad)" stroke="#C7D2FE" strokeWidth="1.5" />
                  {/* Left Page lines */}
                  <path d="M 10 46 C 18 42, 28 40, 34 42" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 10 58 C 18 54, 28 52, 34 54" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 10 70 C 18 66, 28 64, 34 66" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" />

                  {/* Right Page */}
                  <path d="M 40 20 C 55 18, 72 26, 80 34 L 80 110 C 72 102, 55 96, 40 98 Z" fill="#FFFFFF" stroke="#C7D2FE" strokeWidth="1.5" />
                  {/* Right Page lines */}
                  <path d="M 46 42 C 52 40, 62 42, 70 46" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 46 54 C 52 52, 62 54, 70 58" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 46 66 C 52 64, 62 66, 70 70" stroke="#A5B4FC" strokeWidth="2" strokeLinecap="round" />

                  {/* Book Spine / Bookmark Ribbon */}
                  <path d="M 40 20 L 40 102" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 40 102 L 40 118 L 44 114 L 48 118 L 48 98" fill="#4338CA" />
                </g>
              </svg>
            )}
          </div>
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
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                EXPLORE THE LIBRARY
              </span>
            </div>

            {/* 4 Cards Grid: 4 columns on desktop, 2x2 on tablet, 1 column on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {/* Card 1: Certifications */}
              <div 
                onClick={() => handleViewChange('certs')}
                className="group relative bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl text-left cursor-pointer"
              >
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container: Soft lavender with Award icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] mb-5 group-hover:scale-105 transition-transform duration-200">
                    <Award className="w-7 h-7 stroke-[2]" />
                  </div>

                  {/* Eyebrow badge */}
                  <div className="mb-2">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-black uppercase tracking-wider mb-2">
                      LEARN & EARN
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                      Certifications
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mb-5 min-h-[42px]">
                    Industry-recognized certifications to strengthen your PM foundation.
                  </p>

                  {/* Metadata Pill */}
                  <div className="mt-auto mb-6">
                    <span className="inline-flex items-center text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                      Certifications tracks • 10+ courses
                    </span>
                  </div>

                  {/* Text-based CTA with animated arrow */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] uppercase tracking-wider group-hover:gap-2.5 transition-all">
                    <span>EXPLORE CERTIFICATIONS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Card 2: PM Assignments */}
              <div 
                onClick={() => handleViewChange('assignments')}
                className="group relative bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl text-left cursor-pointer"
              >
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container: Soft amber with Briefcase */}
                  <div className="w-14 h-14 rounded-2xl bg-[#FEF3C7] flex items-center justify-center text-[#F59E0B] mb-5 group-hover:scale-105 transition-transform duration-200">
                    <Briefcase className="w-7 h-7 stroke-[2]" />
                  </div>

                  {/* Eyebrow badge */}
                  <div className="mb-2">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#FEF3C7] text-[#D97706] text-[10px] font-black uppercase tracking-wider mb-2">
                      PRACTICE & IMPROVE
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                      PM Assignments
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mb-5 min-h-[42px]">
                    Real-world product case assignments to build your problem-solving skills.
                  </p>

                  {/* Metadata Pill */}
                  <div className="mt-auto mb-6">
                    <span className="inline-flex items-center text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                      50+ assignments
                    </span>
                  </div>

                  {/* Text-based CTA with animated arrow */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#D97706] uppercase tracking-wider group-hover:gap-2.5 transition-all">
                    <span>VIEW ASSIGNMENTS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Card 3: Casebooks */}
              <div 
                onClick={() => handleViewChange('casebooks')}
                className="group relative bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl text-left cursor-pointer"
              >
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container: Soft emerald with BookOpen */}
                  <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] flex items-center justify-center text-[#10B981] mb-5 group-hover:scale-105 transition-transform duration-200">
                    <BookOpen className="w-7 h-7 stroke-[2]" />
                  </div>

                  {/* Eyebrow badge */}
                  <div className="mb-2">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#ECFDF5] text-[#059669] text-[10px] font-black uppercase tracking-wider mb-2">
                      LEARN FROM
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                      Casebooks
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mb-5 min-h-[42px]">
                    Structured product cases (with hints & solutions) to learn by doing.
                  </p>

                  {/* Metadata Pill */}
                  <div className="mt-auto mb-6">
                    <span className="inline-flex items-center text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                      100+ case studies
                    </span>
                  </div>

                  {/* Text-based CTA with animated arrow */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#059669] uppercase tracking-wider group-hover:gap-2.5 transition-all">
                    <span>EXPLORE CASEBOOKS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Card 4: Company Qs */}
              <div 
                onClick={() => handleViewChange('questions')}
                className="group relative bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl text-left cursor-pointer"
              >
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container: Soft rose with FileText */}
                  <div className="w-14 h-14 rounded-2xl bg-[#FFE4E6] flex items-center justify-center text-[#F43F5E] mb-5 group-hover:scale-105 transition-transform duration-200">
                    <FileText className="w-7 h-7 stroke-[2]" />
                  </div>

                  {/* Eyebrow badge */}
                  <div className="mb-2">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#FFE4E6] text-[#E11D48] text-[10px] font-black uppercase tracking-wider mb-2">
                      GET INTERVIEW READY
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                      Company Qs
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mb-5 min-h-[42px]">
                    Real interview questions & solutions from top product companies.
                  </p>

                  {/* Metadata Pill */}
                  <div className="mt-auto mb-6">
                    <span className="inline-flex items-center text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                      50+ interview questions
                    </span>
                  </div>

                  {/* Text-based CTA with animated arrow */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#E11D48] uppercase tracking-wider group-hover:gap-2.5 transition-all">
                    <span>PRACTICE COMPANY QUESTIONS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'questions' && (
          <motion.div 
            key="questions" 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -8 }} 
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Search Input Bar with clean rounded-2xl border */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input 
                type="text"
                placeholder="Search by company name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 sm:pl-12 pr-10 sm:pr-12 py-3.5 sm:py-4 bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all shadow-xs"
              />
              {searchQuery ? (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <span className="hidden sm:inline-block absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-medium text-slate-400 pointer-events-none">
                  e.g. Google, Amazon, Microsoft...
                </span>
              )}
            </div>

            {/* Filter Pills matching image.png */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {questionFilters.map((filter) => {
                const isSelected = selectedQuestionCategory === filter.id;
                const FilterIcon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedQuestionCategory(filter.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                      isSelected 
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs' 
                        : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50'
                    }`}
                  >
                    {FilterIcon && (
                      <FilterIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : filter.iconColor}`} />
                    )}
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Section Eyebrow Label */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                ALL COMPANIES ({filteredQuestionsData.length})
              </span>
              <span className="text-xs font-medium text-slate-400">
                Click any company to view question bank
              </span>
            </div>

            {/* Company Cards with Expandable Dropdown */}
            <div className="space-y-4 sm:space-y-5">
              {filteredQuestionsData.map((data, idx) => {
                const isOpen = openCompanies.includes(data.company);
                
                return (
                  <div 
                    key={data.company || idx} 
                    className="bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md"
                  >
                    {/* Category Header Row - Clicking toggles dropdown */}
                    <button 
                      type="button"
                      onClick={() => toggleCompany(data.company)} 
                      className="w-full text-left p-5 sm:p-6 md:p-7 flex items-center justify-between group cursor-pointer transition-colors hover:bg-slate-50/50"
                    >
                      {/* Left: Company Logo + Company Name + Subtitle */}
                      <div className="flex items-center gap-4 sm:gap-5 min-w-0 pr-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200 p-2">
                          <CompanyLogo company={data.company} />
                        </div>
                        
                        <div className="min-w-0">
                          <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                            {data.company}
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mt-0.5 line-clamp-1">
                            {data.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Center: Highlighted Tags matching image.png */}
                      <div className="hidden lg:flex items-center gap-2 shrink-0 px-4">
                        {data.tags.map((tag: string) => (
                          <span 
                            key={tag} 
                            className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-tight ${getTagBadgeStyle(tag)}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Right: Items counter + circular chevron button */}
                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100/90 px-3 py-1 rounded-full whitespace-nowrap">
                          {data.items.length} ITEMS
                        </span>
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/90 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700 transition-all">
                          <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-slate-900' : 'text-slate-500'}`} />
                        </div>
                      </div>
                    </button>

                    {/* Dropdown Content - Animated expansion of questions */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: 'auto', opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }} 
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-100 p-5 sm:p-6 md:p-7 bg-slate-50/40">
                            {selectedQuestionCategory !== 'All' && (
                              <div className="mb-4 text-xs font-medium text-slate-500 flex items-center gap-2">
                                <span>Showing <b>{data.items.length}</b> questions in category:</span>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getTagBadgeStyle(selectedQuestionCategory)}`}>
                                  {selectedQuestionCategory}
                                </span>
                              </div>
                            )}

                            <div className="space-y-3">
                              {data.items.map((item, qIdx) => {
                                const qKey = `${data.company}-${qIdx}`;
                                const isCopied = copiedQuestionKey === qKey;

                                return (
                                  <div 
                                    key={qIdx} 
                                    className="group/q bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 p-4 sm:p-5 flex items-start justify-between gap-4 transition-all duration-200 hover:shadow-xs"
                                  >
                                    <div className="flex items-start gap-3.5 min-w-0 pr-2">
                                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100/90 text-slate-500 font-bold text-xs shrink-0 font-mono mt-0.5">
                                        #{qIdx + 1}
                                      </span>

                                      <div className="space-y-2 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight ${getTagBadgeStyle(item.category)}`}>
                                            {getQuestionIcon(item.category)}
                                            <span>{item.category}</span>
                                          </span>
                                        </div>
                                        <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                                          {item.question}
                                        </p>
                                      </div>
                                    </div>

                                    <button 
                                      type="button"
                                      onClick={() => handleCopyQuestion(item.question, qKey)}
                                      title="Copy question"
                                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                                    >
                                      {isCopied ? (
                                        <>
                                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                                          <span className="text-emerald-600 text-[11px] font-bold">Copied</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3.5 h-3.5" />
                                          <span className="text-[11px] text-slate-500 hidden sm:inline">Copy</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
        
        {/* Certifications Section: Matching Reference image.png with expandable dropdowns */}
        {activeView === 'certs' && (
          <motion.div 
            key="certs" 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -8 }} 
            transition={{ duration: 0.2 }}
            className="space-y-4 sm:space-y-5"
          >
            {/* Section Eyebrow Label */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                ALL CERTIFICATION TRACKS ({certificationData.length})
              </span>
            </div>

            {/* 4 Category Cards / Subsections */}
            {certificationData.map((section, sectionIdx) => {
              const isOpen = openCerts.includes(sectionIdx);
              const SectionIcon = section.icon;

              return (
                <div 
                  key={section.id || sectionIdx} 
                  className="bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md"
                >
                  {/* Category Header Row - Clicking toggles dropdown */}
                  <button 
                    type="button"
                    onClick={() => toggleCert(sectionIdx)} 
                    className="w-full text-left p-5 sm:p-6 md:p-7 flex items-center justify-between group cursor-pointer transition-colors hover:bg-slate-50/50"
                  >
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0 pr-4">
                      {/* Icon Container: Soft colored background matching category */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${section.iconBg} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200`}>
                        <SectionIcon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
                      </div>
                      
                      <div className="min-w-0">
                        <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                          {section.category}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mt-0.5 line-clamp-2">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    {/* Circular chevron dropdown button */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/90 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700 transition-all shrink-0 ml-2">
                      <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-slate-900' : 'text-slate-500'}`} />
                    </div>
                  </button>

                  {/* Dropdown Content - Animated expansion of courses */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100 p-5 sm:p-6 md:p-7 bg-slate-50/30">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            {section.items.map((cert, certIdx) => {
                              const CertIcon = cert.icon;
                              return (
                                <div 
                                  key={certIdx} 
                                  className="group/card bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-lg"
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-3 mb-4">
                                      <span className="inline-block px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-wider">
                                        {cert.provider}
                                      </span>
                                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover/card:bg-indigo-50 group-hover/card:text-indigo-600 transition-colors">
                                        <CertIcon className="w-4 h-4" />
                                      </div>
                                    </div>

                                    <h3 className="text-base font-bold text-slate-900 leading-snug mb-2 group-hover/card:text-indigo-600 transition-colors">
                                      {cert.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mb-6">
                                      {cert.description}
                                    </p>
                                  </div>

                                  <a 
                                    href={cert.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="mt-auto inline-flex items-center justify-between w-full px-4 py-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                                  >
                                    <span>View Certification</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}

        {activeView === 'assignments' && (
          <motion.div 
            key="assignments" 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -8 }} 
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Search Input Bar */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input 
                type="text"
                placeholder="Search assignments by company or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 sm:pl-12 pr-10 sm:pr-12 py-3.5 sm:py-4 bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all shadow-xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Section Eyebrow Label */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                ALL ASSIGNMENT TRACKS ({assignmentSections.length})
              </span>
              <span className="text-xs font-medium text-slate-400">
                Click any subsection to view briefs
              </span>
            </div>

            {/* Assignment Section Cards with Expandable Dropdown */}
            <div className="space-y-4 sm:space-y-5">
              {assignmentSections.map((section, sIdx) => {
                const isOpen = openAssignments.includes(sIdx);
                const SectionIcon = section.icon;
                const filteredItems = section.items.filter(item => 
                  !searchQuery || 
                  item.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  item.position.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (searchQuery && filteredItems.length === 0) return null;

                return (
                  <div 
                    key={section.id || sIdx} 
                    className="bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md"
                  >
                    {/* Header Row */}
                    <button 
                      type="button"
                      onClick={() => toggleAssignment(sIdx)} 
                      className="w-full text-left p-5 sm:p-6 md:p-7 flex items-center justify-between group cursor-pointer transition-colors hover:bg-slate-50/50"
                    >
                      <div className="flex items-center gap-4 sm:gap-5 min-w-0 pr-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${section.iconBg} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200`}>
                          <SectionIcon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
                        </div>
                        
                        <div className="min-w-0">
                          <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                            {section.role}
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mt-0.5 line-clamp-1">
                            {section.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100/90 px-3 py-1 rounded-full whitespace-nowrap">
                          {filteredItems.length} BRIEFS
                        </span>
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/90 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700 transition-all">
                          <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-slate-900' : 'text-slate-500'}`} />
                        </div>
                      </div>
                    </button>

                    {/* Dropdown Content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: 'auto', opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }} 
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-100 p-5 sm:p-6 md:p-7 bg-slate-50/40">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                              {filteredItems.map((item, idx) => (
                                <div 
                                  key={idx} 
                                  className="group/card bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-sm"
                                >
                                  <div>
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover/card:bg-indigo-50 group-hover/card:text-indigo-600 transition-colors">
                                        <FileText className="w-5 h-5" />
                                      </div>
                                      <div className="min-w-0">
                                        <h3 className="font-extrabold text-sm text-slate-900 truncate group-hover/card:text-indigo-600 transition-colors">
                                          {item.company}
                                        </h3>
                                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                          {item.position}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <a 
                                    href={item.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="mt-4 flex items-center justify-between w-full px-3.5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                                  >
                                    <span>View Assignment</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeView === 'casebooks' && (
          <motion.div 
            key="casebooks" 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -8 }} 
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Search Input Bar */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input 
                type="text"
                placeholder="Search casebooks and problem sets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 sm:pl-12 pr-10 sm:pr-12 py-3.5 sm:py-4 bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all shadow-xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Section Eyebrow Label */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                ALL CASEBOOK TRACKS ({casebookSections.length})
              </span>
              <span className="text-xs font-medium text-slate-400">
                Click any institute to view cases
              </span>
            </div>

            {/* Casebook Section Cards with Expandable Dropdown */}
            <div className="space-y-4 sm:space-y-5">
              {casebookSections.map((section, sIdx) => {
                const isOpen = openCasebooks.includes(sIdx);
                const SectionIcon = section.icon;
                const filteredItems = section.items.filter(item => 
                  !searchQuery || 
                  item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  item.description.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (searchQuery && filteredItems.length === 0) return null;

                return (
                  <div 
                    key={section.id || sIdx} 
                    className="bg-white rounded-3xl border border-slate-200/90 hover:border-slate-300 transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md"
                  >
                    {/* Header Row */}
                    <button 
                      type="button"
                      onClick={() => toggleCasebook(sIdx)} 
                      className="w-full text-left p-5 sm:p-6 md:p-7 flex items-center justify-between group cursor-pointer transition-colors hover:bg-slate-50/50"
                    >
                      <div className="flex items-center gap-4 sm:gap-5 min-w-0 pr-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${section.iconBg} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200`}>
                          <SectionIcon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
                        </div>
                        
                        <div className="min-w-0">
                          <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                            {section.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mt-0.5 line-clamp-1">
                            {section.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100/90 px-3 py-1 rounded-full whitespace-nowrap">
                          {filteredItems.length} CASEBOOKS
                        </span>
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/90 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700 transition-all">
                          <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-slate-900' : 'text-slate-500'}`} />
                        </div>
                      </div>
                    </button>

                    {/* Dropdown Content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: 'auto', opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }} 
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-100 p-5 sm:p-6 md:p-7 bg-slate-50/40">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                              {filteredItems.map((item, idx) => {
                                const ItemIcon = item.icon || GraduationCap;
                                return (
                                  <div 
                                    key={idx} 
                                    className="group/card bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-sm"
                                  >
                                    <div>
                                      <div className="flex items-center justify-between gap-3 mb-3">
                                        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover/card:bg-indigo-50 group-hover/card:text-indigo-600 transition-colors">
                                          <ItemIcon className="w-4 h-4" />
                                        </div>
                                      </div>
                                      <h3 className="font-extrabold text-sm text-slate-900 mb-1 group-hover/card:text-indigo-600 transition-colors">
                                        {item.title}
                                      </h3>
                                      <p className="text-xs text-slate-500 font-normal leading-relaxed mb-4">
                                        {item.description}
                                      </p>
                                    </div>

                                    <a 
                                      href={item.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="mt-auto flex items-center justify-between w-full px-3.5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                                    >
                                      <span>View Casebook</span>
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Showcase & Journey CTA Banner: Matched to Reference resources.png */}
      <div className="mt-10 sm:mt-12 bg-gradient-to-r from-[#EFF6FF] via-[#F0F9FF] to-[#E0F2FE] border border-sky-100 rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
            Ready to showcase your <span className="text-[#2563EB]">skills?</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed mb-6">
            Put all the knowledge into practice. Then prove what you can do.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer group"
          >
            <span>START LEARNING</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right Graphic: 3D Target + Dart + Handwritten Annotation */}
        <div className="relative z-10 flex items-center justify-center md:justify-end gap-3 sm:gap-5 shrink-0">
          {/* 3D Target & Dart */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
            <svg className="w-full h-full drop-shadow-md" viewBox="0 0 120 120" fill="none">
              <defs>
                <radialGradient id="ringLavender" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#EDE9FE" />
                  <stop offset="100%" stopColor="#C7D2FE" />
                </radialGradient>
                <radialGradient id="ringWhite" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F8FAFC" />
                </radialGradient>
                <radialGradient id="bullseyeBlue" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#2563EB" />
                </radialGradient>
                <radialGradient id="bullseyeCenter" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </radialGradient>
              </defs>

              {/* 3D Depth base */}
              <ellipse cx="60" cy="65" rx="46" ry="46" fill="#A5B4FC" opacity="0.4" />

              {/* Outer Lilac Ring */}
              <ellipse cx="60" cy="60" rx="46" ry="46" fill="url(#ringLavender)" stroke="#C7D2FE" strokeWidth="2" />
              {/* Middle White Ring */}
              <ellipse cx="60" cy="60" rx="34" ry="34" fill="url(#ringWhite)" stroke="#E2E8F0" strokeWidth="1.5" />
              {/* Inner Lilac Ring */}
              <ellipse cx="60" cy="60" rx="22" ry="22" fill="url(#ringLavender)" stroke="#C7D2FE" strokeWidth="1.5" />
              {/* Center Bullseye */}
              <ellipse cx="60" cy="60" rx="11" ry="11" fill="url(#bullseyeBlue)" />
              <ellipse cx="60" cy="60" rx="4.5" ry="4.5" fill="url(#bullseyeCenter)" />

              {/* Dart striking the center from upper right */}
              <g transform="rotate(45 60 60)">
                <line x1="60" y1="60" x2="105" y2="60" stroke="#2563EB" strokeWidth="3.5" strokeLinecap="round" />
                {/* Rear Flights */}
                <path d="M 92 52 L 105 60 L 92 68 Z" fill="#38BDF8" />
                <path d="M 84 54 L 96 60 L 84 66 Z" fill="#1D4ED8" />
              </g>
            </svg>
          </div>

          {/* Hand-drawn doodle arrow & handwritten annotation */}
          <div className="flex items-center gap-2 sm:gap-3">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-sky-500" viewBox="0 0 50 50" fill="none">
              <path d="M 8 34 C 16 30, 26 24, 38 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 38 16 L 28 16 M 38 16 L 36 26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div 
              style={{ fontFamily: "'Caveat', cursive" }}
              className="text-sky-600 text-base sm:text-lg font-bold leading-tight tracking-wide whitespace-nowrap"
            >
              Small<br />steps.<br />Big opportunities.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
