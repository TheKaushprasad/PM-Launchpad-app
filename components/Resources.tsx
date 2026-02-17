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
  PieChart
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

interface ContextType {
  isCollapsed: boolean;
}

const certificationData = [
  {
    category: "🤖 AI, Cloud & Developer Foundations",
    items: [
      {
        title: "Foundations of Prompt Engineering — AWS Skill Builder",
        description: "Learn how to design effective prompts and work efficiently with large language models.",
        url: "https://skillbuilder.aws/learn/VF6H4SZ1BU/foundations-of-prompt-engineering/7U8XFUVXDT",
        icon: Bot
      },
      {
        title: "AWS Cloud Practitioner Essentials — AWS Skill Builder",
        description: "Covers core cloud concepts, AWS services, pricing models, and security fundamentals.",
        url: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
        icon: Cloud
      },
      {
        title: "AI Agents Course — Hugging Face",
        description: "Hands-on introduction to building AI agents, tool use, planning, and reasoning.",
        url: "https://huggingface.co/learn/agents-course/en/unit0/introduction",
        icon: Zap
      },
      {
        title: "Postman API Fundamentals – Student Expert — Postman",
        description: "Demonstrates strong fundamentals in APIs, requests, collections, testing, and documentation.",
        url: "https://academy.postman.com/postman-api-fundamentals-student-expert-certification-1",
        icon: Code
      }
    ]
  },
  {
    category: "🧱 Beginner Level – Product Management Foundations",
    items: [
      {
        title: "Product Management Basics Certification — ProductLed",
        description: "Covers core PM concepts including roles, responsibilities, lifecycle, and stakeholder management.",
        url: "https://www.productledcertified.com/product-management-basics",
        icon: Layout
      },
      {
        title: "Radical Product Thinking: Vision Setting — ProductLed",
        description: "Focuses on defining a strong product vision, strategy, and long-term roadmap.",
        url: "https://www.productledcertified.com/radical-product-thinking-vision-setting",
        icon: Target
      }
    ]
  },
  {
    category: "⚙️ Intermediate Level – Core Product Skills",
    items: [
      {
        title: "Product Strategy Micro-Certification (PSC) — Product School",
        description: "Aligns product decisions with business outcomes and competitive strategy.",
        url: "https://productschool.teachable.com/p/productstrategy",
        icon: TrendingUp
      },
      {
        title: "Product Discovery Micro-Certification (PDC) — Product School",
        description: "Deep dive into user research, validation, and hypothesis-driven development.",
        url: "https://productschool.teachable.com/p/pdc",
        icon: Search
      },
      {
        title: "Product Roadmapping Micro-Certification (PRC) — Product School",
        description: "Covers prioritization frameworks, stakeholder alignment, and execution planning.",
        url: "https://productschool.teachable.com/p/productanalytics",
        icon: Layers
      },
      {
        title: "Product Analytics Micro-Certification (PAC) — Product School",
        description: "Teaches data-driven decision-making using metrics, funnels, and experimentation.",
        url: "https://productschool.teachable.com/p/productanalytics",
        icon: BarChart2
      }
    ]
  },
  {
    category: "🚀 Advanced Level – Specialized & Execution-Focused",
    items: [
      {
        title: "Product Launches Micro-Certification (PRLC) — Product School",
        description: "End-to-end product launch planning, GTM strategy, and post-launch optimization.",
        url: "https://productschool.teachable.com/p/productlaunches",
        icon: Rocket
      },
      {
        title: "A/B Testing for Business Analysts — Udacity",
        description: "Practical experimentation techniques to evaluate and optimize product decisions.",
        url: "https://www.udacity.com/course/ab-testing-business-analysts--ud979",
        icon: Activity
      },
      {
        title: "Product Design — Udacity",
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
    company: "Flipkart",
    questions: [
      "Assume that Flipkart owned Ekart Logistics was thinking of entering the 'courier' business. How you, as a product manager, would go about figuring this opportunity?",
      "How will you design a product for an apartment complex where the apartment owners need to use certain club facilities like Gym, Garden, Book club etc.?",
      "How would you measure the success of Google search results?",
      "Can you give me the total number of tube lights in Bangalore?",
      "How would you determine the dip in GMV of Flipkart?",
      "What would you do to get sellers sign up quickly? Take certain baseline assumptions.",
      "What would be your top priority if you were working at Uber?",
      "How would you make e-commerce experience more social?",
      "If Flipkart wants to enter into selling jewelry, what should it do?",
      "Design a movie-booking app for elder people (someone who is not very tech-savvy and just started using smartphones).",
      "How would you give recommendations to sellers on Flipkart?",
      "How will you design a solution for Bangalore traffic?"
    ]
  },
  {
    company: "Google",
    questions: [
      "Design a handheld device with a screen. Estimate the market size for the same. What features will it have? What would be the right price point for it?",
      "What are the key metrics you would use to measure the success of Google Sheets?",
      "Design a Google Pixel tablet for restaurants.",
      "How would you monetize WhatsApp?",
      "How would you A/B test Google Maps?",
      "Imagine yourself as a Product Manager of Google Maps. How would you improve the location accuracy? Why is it important to improve location accuracy? What could be the possible solutions? How would you rank the solutions?",
      "What is your favorite physical product? Design the product by empowering it with tech. Create a launch strategy for the same in a given market.",
      "Design a car parking system. Why do you think there is a need to build such as solution? What will be the launch strategy for the same - pricing, target cities, etc.? How would you estimate the number of cars coming in daily?",
      "Imagine yourself as the head of YouTube. What would you change immediately? What products would you introduce? Explain the reasons for each of your decisions.",
      "Estimate the daily number of calls that the call center operators at Uber would get.",
      "How do you make business decisions? Tell me about a time you used data to make a decision",
      "What do you look for in a good product?"
    ]
  },
  {
    company: "Meesho",
    questions: [
      "What do you think is the biggest problem you face with Ola? How would you validate your solutions using A/B testing?",
      "Check Meesho's landing page and share the process of getting that page to production. Identify all the stakeholders that will be involved in the process.",
      "Suggest growth hacks and techniques to grow Notion from X (currently) to 2X users.",
      "Understand the reselling market in India and other social commerce trends through primary and secondary research. Based on your understanding of the customers and market landscape, create a plan on how Meesho can improve the metric “Orders per Reseller per month”.",
      "What do you understand by a poorly designed product?",
      "How would you improve user experience at Meesho?",
      "If we plan to introduce new verticals, where do you think we should invest and why?",
      "What is one key metric that Practo should track?"
    ]
  },
  {
    company: "Atlassian",
    questions: [
      "What would you suggest to a new company interested in getting into the rideshare business? List the metrics you would track.",
      "How would you design a TV remote for older people?",
      "How would you design a water bottle? What parameters would you use to evaluate and perform quality testing of the bottle?",
      "Design a system for car parking which helps users find the available spots easily.",
      "How would you revolutionize the inflight entertainment system?",
      "What is your favorite product? What would you want to improve in it?",
      "How do you measure the success of any new feature that you launch?",
      "If you were the Chief Product Officer of Atlassian, what would be your strategy for company growth?",
      "Design a mobile application to assist hobby gardeners.",
      "Suggest products that can be sold at vending machines beyond classic snacks and drinks."
    ]
  },
  {
    company: "Agoda",
    questions: [
      "How will you rank search results on Agoda page - targeting the metric of profitability?",
      "What kind of filters should be added on Agoda?",
      "How will you improve Agoda?",
      "If you were conducting an A/B testing to check how discounts affects your margins, how would you go about it?",
      "How many tennis balls can fit in an airplane?",
      "If you were to go about launching a subscription service for Agoda, how would you go about it?",
      "As an Uber PM, how would you increase revenue for Uber?",
      "If you were the PM for the search results page, what would you design the relevance?"
    ]
  },
  {
    company: "Amazon",
    questions: [
      "How will you launch Electrical and indoor lighting as a category (or any other category) on Amazon?",
      "There has been an increase in the volume of the merchandise being returned from one of the locations. Choose one of the categories you frequently shop in and identify the problem which could lead to it?",
      "What is your favorite product and what would you do to make it a better product?",
      "There are three jars. One containing green balls, second containing red balls, third containing both red and green balls. Each jar is wrongly labeled. In how many attempts by withdrawing a ball can you correct the labels?",
      "How would you reduce the number of returns on Amazon?",
      "Amazon is considering starting Amazon.com in <country X>. What considerations would you make to determine if it's a good idea? How would you start?",
      "What metrics would you use to measure success for the Amazon Echo Dot (or any other Amazon product)?",
      "If you are in charge of buying decisions for varying products at Amazon, what data would you need to optimize your spends?",
      "How would you improve Prime Video?",
      "How much does the average Amazon buyer spend on Amazon products?"
    ]
  },
  {
    company: "Zepto",
    questions: [
      "Assume that Facebook has entered into dating space. What are the key metrics you will track?",
      "What would you do to improve Zepto if you were hired as a Product Manager?",
      "How will you go about designing an Uber for kids.",
      "As a PM at Zepto, what would be your strategy to increase the average order value per user?",
      "What do you think should be Zepto's strategy to enter into e-commerce in India?",
      "What is your favorite product? What would you want to improve in it?",
      "As a PM at Zepto, what key metrics would you track? What do you think should be our North Star Metric?"
    ]
  },
  {
    company: "Netflix",
    questions: [
      "Average watch time for a video streaming service dropped by 30% suddenly. How would you go about solving this?",
      "How many tennis balls fit in a plane?",
      "How would you plan Netflix’s expansion into new markets (regions)?",
      "How would you go about designing a TV remote for older people?",
      "If you were to design a roommate-finding product, how would you do it?",
      "How would you improve Netflix?",
      "There are millions of inactive users on Netflix. What would you do about them?",
      "Imagine that you’re the CEO of Netflix. What is your strategy for the next 10 years?",
      "How would you measure the success of YouTube?",
      "How would you redesign Netflix for seniors citizens."
    ]
  },
  {
    company: "Mastercard",
    questions: [
      "Imagine you're a product manager at Mastercard. Design a product for restaurants to help them transition to a purchase order (PO) system that reduces their labor costs.",
      "How did you apply data across your product management journey?",
      "Describe a situation where you negotiated a win-win situation.",
      "Describe a situation when you had conflicting responsibilities and how you handled it.",
      "Puzzle: There are 25 horses among which you need to find fastest 3. You don't have a timer and a race can be among maximum 5 horses. Find minimum number of races required.",
      "What is your favorite app (installed on your app) and what do you think makes it successful?",
      "What strategy have you followed for your past product launches?"
    ]
  },
  {
    company: "Visa",
    questions: [
      "What is your favorite product? How could it be improved?",
      "Estimate the number of people using credit cards for payments in India.",
      "Estimate daily number of transactions in US.",
      "Tell about a product you developed from its inception to its launch.",
      "How would you handle conflict in a work scenario?",
      "Walk me through a case study on how to build a new product and grow it to other markets.",
      "Why do you need a visa? [Need understanding of payments ecosystem and role of Visa in it]",
      "How would you prioritize your product backlog?"
    ]
  },
  {
    company: "Meta",
    questions: [
      "How would you build a product for hyper local communities?",
      "Create a product that can be used on airports during layover.",
      "What features would you want to create for parents on the iPhone?",
      "How would you go about designing a parking solution on Google maps?",
      "Can you think of ways/avenues to monetize WhatsApp?",
      "What key metrics would you track for Meta’s video conferencing product for businesses?",
      "What would your approach and strategy to implement ads on Facebook Reels?",
      "Talk about an instance you had to resolve a conflict between two co-workers. What was the issue? And, what role did you play?"
    ]
  },
  {
    company: "Adobe",
    questions: [
      "How would you improve Spotify?",
      "How would you design a gardening app?",
      "Give an example of a badly designed product.",
      "Create a smartphone for a 6-year-old.",
      "How would you improve Gmail?",
      "What is the most challenging project you have been on?",
      "What method you use for roadmap creation?",
      "Estimate the number of petrol pumps in a given city."
    ]
  },
  {
    company: "Disney+Hotstar",
    questions: [
      "How would you go about designing a skip feature for a video streaming service?",
      "Define and describe a strategy for Disney+ Hotstar Subscriptions growth in India.",
      "You want to launch a subscription based product like Netflix. How would you price this product?",
      "What would be the success metrics if profiles were to be introduced in Disney+ Hotstar?",
      "Design a e-commerce website on any popular social media platform?",
      "Should a popular OTT platform enter into podcast space? On what factors would you base your decision?",
      "If the revenue of Airbnb were to drop suddenly, how would you go about figuring out the reasons for the same?",
      "As a PM, what key metrics would you track for Disney+ Hotstar?"
    ]
  },
  {
    company: "Phonepe",
    questions: [
      "Which of the two do you feel is better - @Gpay or PhonePe? What new feature would you add in Gpay?",
      "How would you increase the average order value of Swiggy customers?",
      "Estimate the number of cars sold in India in 2023.",
      "How would you prioritize between high value features?",
      "Estimate the number of McDonald's burgers sold in India in a month.",
      "What is phishing? How should we educate our customers about this?",
      "How would you improve the wish list experience for an e-commerce site?",
      "What is your favourite mobile application product? And, why? How would you measure its performance in multiple phases of its growth?"
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
  const [activeView, setActiveView] = useState<'main' | 'certs' | 'casebooks' | 'assignments' | 'questions'>('main');
  const [openCerts, setOpenCerts] = useState<number[]>([0]);
  const [openCompanies, setOpenCompanies] = useState<string[]>(['Flipkart']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');

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

  // Pre-defined role categories for filtering
  const roleFilters = ['All', 'APM', 'PM Intern', 'Product Analyst', 'PM / SPM'];

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

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className={`pb-20 transition-all duration-500 mx-auto ${isCollapsed ? 'max-w-[1600px] px-4 md:px-12' : 'max-w-[1200px] px-4 md:px-6'}`}
    >
      <header className="relative bg-zinc-950 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 text-white overflow-hidden shadow-2xl mb-12">
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#79BAEC]/20 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10 max-w-4xl">
            {activeView !== 'main' && (
              <button 
                onClick={() => {
                  setActiveView('main');
                  setSearchQuery('');
                  setSelectedRoleFilter('All');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-xs font-black uppercase tracking-widest mb-8 hover:bg-white/20 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Resources
              </button>
            )}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                <Library className="w-3.5 h-3.5 fill-current" /> 
                Knowledge & Credential Hub
            </div>
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.95]">
                {activeView === 'main' ? 'Curated' : activeView === 'certs' ? 'Industry' : activeView === 'assignments' ? 'Interview' : activeView === 'casebooks' ? 'B-School' : 'Company'} <br/>
                <span className="text-[#79BAEC]">
                  {activeView === 'main' ? 'Resources.' : activeView === 'certs' ? 'Certifications.' : activeView === 'assignments' ? 'Assignments.' : activeView === 'casebooks' ? 'Casebooks.' : 'Questions.'}
                </span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-xl max-w-2xl leading-relaxed font-medium">
                {activeView === 'main' 
                  ? "A curated set of certifications, assignments, and casebooks across Product Management—covering everything from foundations to real interview tasks."
                  : activeView === 'certs'
                  ? "Validated pathways to master Product Management, AI, and Cloud foundations from top-tier organizations like AWS, Postman, and Udacity."
                  : activeView === 'assignments'
                  ? "Real-world hiring tasks from top tech companies. Practice with actual problems companies use to evaluate candidates."
                  : activeView === 'casebooks'
                  ? "Sharpen your case-solving skills with structured repositories from India's most prestigious management and technical institutions."
                  : "Actual interview questions curated from top-tier tech companies. Prepare for product sense, analytics, and strategy rounds."
                }
            </p>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeView === 'main' && (
          <motion.div 
            key="main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Certifications Card */}
            <button 
              onClick={() => setActiveView('certs')}
              className="group relative h-[380px] rounded-[3rem] overflow-hidden text-left shadow-xl border border-zinc-100 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent group-hover:from-indigo-600/10 transition-all duration-700"></div>
              <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tighter mb-3 group-hover:text-indigo-600 transition-colors">Certifications</h2>
                  <p className="text-[11px] font-bold text-zinc-500 leading-relaxed">
                    Industry-validated credentials to prove your knowledge in AI, Cloud, and Product core skills.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-indigo-600 font-black text-[9px] uppercase tracking-widest">
                  Explore Tracks <Sparkles className="w-3 h-3 fill-current" />
                </div>
              </div>
            </button>

            {/* Assignments Card */}
            <button 
              onClick={() => setActiveView('assignments')}
              className="group relative h-[380px] rounded-[3rem] overflow-hidden text-left shadow-xl border border-zinc-100 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-transparent group-hover:from-amber-600/10 transition-all duration-700"></div>
              <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tighter mb-3 group-hover:text-amber-600 transition-colors">PM Assignments</h2>
                  <p className="text-[11px] font-bold text-zinc-500 leading-relaxed">
                    Real-world hiring tasks from companies like Meesho, Paytm, and Physics Wallah to sharpen your skills.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-amber-600 font-black text-[9px] uppercase tracking-widest">
                  View 50+ Tasks <Zap className="w-3 h-3 fill-current" />
                </div>
              </div>
            </button>

            {/* Case Studies Card */}
            <button 
              onClick={() => setActiveView('casebooks')}
              className="group relative h-[380px] rounded-[3rem] overflow-hidden text-left shadow-xl border border-zinc-100 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent group-hover:from-emerald-600/10 transition-all duration-700"></div>
              <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tighter mb-3 group-hover:text-emerald-600 transition-colors">Casebooks</h2>
                  <p className="text-[11px] font-bold text-zinc-500 leading-relaxed">
                    Exclusive case study repositories from IIMs and IITs to help you ace PM interview rounds.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-emerald-600 font-black text-[9px] uppercase tracking-widest">
                  View Repository <Sparkles className="w-3 h-3 fill-current" />
                </div>
              </div>
            </button>

            {/* Company Questions Card */}
            <button 
              onClick={() => setActiveView('questions')}
              className="group relative h-[380px] rounded-[3rem] overflow-hidden text-left shadow-xl border border-zinc-100 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-600/5 to-transparent group-hover:from-rose-600/10 transition-all duration-700"></div>
              <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tighter mb-3 group-hover:text-rose-600 transition-colors">Company Qs</h2>
                  <p className="text-[11px] font-bold text-zinc-500 leading-relaxed">
                    Actual interview questions from Flipkart, Google, Amazon, and more to master your prep.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-rose-600 font-black text-[9px] uppercase tracking-widest">
                  Master Prep <Target className="w-3 h-3 fill-current" />
                </div>
              </div>
            </button>
          </motion.div>
        )}

        {activeView === 'certs' && (
          <motion.div 
            key="certs"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {certificationData.map((section, sectionIdx) => (
              <div key={sectionIdx} className="overflow-hidden">
                <button
                  onClick={() => toggleCert(sectionIdx)}
                  className={`w-full text-left p-6 md:p-8 rounded-[2.5rem] border transition-all duration-300 flex items-center justify-between group
                    ${openCerts.includes(sectionIdx) 
                      ? 'bg-zinc-900 border-zinc-800 text-white shadow-lg' 
                      : 'bg-white border-zinc-100 text-zinc-900 hover:border-indigo-100 hover:bg-zinc-50/50'}`}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm
                      ${openCerts.includes(sectionIdx) ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'}`}>
                      {sectionIdx === 0 ? <Bot className="w-6 h-6" /> : 
                       sectionIdx === 1 ? <Layout className="w-6 h-6" /> :
                       sectionIdx === 2 ? <TrendingUp className="w-6 h-6" /> :
                       <Rocket className="w-6 h-6" />}
                    </div>
                    <h2 className="text-lg md:text-2xl font-black tracking-tight uppercase">
                      {section.category}
                    </h2>
                  </div>
                  <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${openCerts.includes(sectionIdx) ? 'rotate-180 text-indigo-400' : 'text-zinc-300'}`} />
                </button>

                <AnimatePresence>
                  {openCerts.includes(sectionIdx) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 pb-12 px-2">
                        {section.items.map((cert, certIdx) => (
                          <div key={certIdx} className="group relative bg-white rounded-[2.5rem] border border-zinc-100 p-2 h-full flex flex-col transition-all duration-500 hover:border-indigo-100 hover:shadow-xl">
                            <div className="flex flex-col h-full rounded-[2.1rem] p-8 bg-white group-hover:bg-zinc-50/50 transition-colors duration-500">
                              <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-[#79BAEC] group-hover:text-white transition-all shadow-inner">
                                  <cert.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-black text-lg text-zinc-900 group-hover:text-indigo-600 transition-colors leading-tight">
                                  {cert.title}
                                </h3>
                              </div>
                              <p className="text-sm text-zinc-500 font-medium mb-8 flex-grow">{cert.description}</p>
                              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between w-full p-4 bg-zinc-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-md">
                                View Certification <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
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
          <motion.div 
            key="assignments"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            {/* Search and Filters */}
            <div className="space-y-8">
              <div className="relative max-w-xl mx-auto">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-zinc-400" />
                 </div>
                 <input 
                    type="text"
                    placeholder="Search by company or position..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-12 pr-12 py-4 bg-white border border-zinc-200 rounded-[1.5rem] focus:ring-4 focus:ring-amber-100 focus:border-amber-400 outline-none text-sm font-bold shadow-sm transition-all"
                 />
                 {searchQuery && (
                   <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600"
                   >
                     <X className="w-5 h-5" />
                   </button>
                 )}
              </div>

              {/* Role Filters */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
                 <div className="flex items-center gap-2 mr-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                    <FilterIcon className="w-3 h-3" /> Role Filter:
                 </div>
                 {roleFilters.map((filter) => (
                   <button
                    key={filter}
                    onClick={() => setSelectedRoleFilter(filter)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border
                      ${selectedRoleFilter === filter 
                        ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-100' 
                        : 'bg-white border-zinc-100 text-zinc-500 hover:border-amber-200 hover:bg-amber-50/30'}`}
                   >
                     {filter}
                   </button>
                 ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssignments.map((item, idx) => (
                <div key={idx} className="group relative bg-white rounded-[2rem] border border-zinc-100 p-2 h-full flex flex-col transition-all duration-500 hover:border-amber-100 hover:shadow-xl">
                  <div className="flex flex-col h-full rounded-[1.8rem] p-6 bg-white group-hover:bg-zinc-50/50 transition-colors duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-inner">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                         <h3 className="font-black text-sm text-zinc-900 group-hover:text-amber-600 transition-colors truncate">
                           {item.company}
                         </h3>
                         <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest truncate">{item.position}</p>
                      </div>
                    </div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between w-full p-3 bg-zinc-900 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-amber-500 transition-all shadow-md">
                      View Assignment <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
              {filteredAssignments.length === 0 && (
                <div className="col-span-full py-20 text-center bg-zinc-50/50 rounded-[3rem] border border-dashed border-zinc-200">
                  <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-300">
                     <SearchIcon className="w-6 h-6" />
                  </div>
                  <p className="text-zinc-400 font-bold">No assignments found matching your criteria.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setSelectedRoleFilter('All');}}
                    className="mt-4 text-amber-600 font-black text-[10px] uppercase tracking-widest hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeView === 'casebooks' && (
          <motion.div 
            key="casebooks"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {casebookData.items.map((cert, certIdx) => (
                <div key={certIdx} className="group relative bg-white rounded-[2.5rem] border border-zinc-100 p-2 h-full flex flex-col transition-all duration-500 hover:border-emerald-100 hover:shadow-xl">
                  <div className="flex flex-col h-full rounded-[2.1rem] p-8 bg-white group-hover:bg-zinc-50/50 transition-colors duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                        <cert.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-black text-lg text-zinc-900 group-hover:text-emerald-600 transition-colors leading-tight">
                        {cert.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-500 font-medium mb-8 flex-grow">{cert.description}</p>
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="mt-auto flex items-center justify-between w-full p-4 bg-zinc-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-md">
                      View Casebook <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeView === 'questions' && (
          <motion.div 
            key="questions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl mb-8 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-rose-800 leading-relaxed italic">
                These questions represent actual interview tasks from top companies. Use them to practice structured thinking, product sense, and analytical rigor. 
                <span className="block mt-2 font-black uppercase text-[10px]">Prepare. Practice. Excel.</span>
              </p>
            </div>

            <div className="space-y-4">
              {companyQuestionsData.map((data, idx) => (
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
                        ${openCompanies.includes(data.company) ? 'bg-rose-600 text-white' : 'bg-zinc-100 text-zinc-400 group-hover:bg-rose-50 group-hover:text-rose-600'}`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg md:text-xl font-black tracking-tight">
                        {data.company}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${openCompanies.includes(data.company) ? 'bg-white/10 text-rose-400' : 'bg-zinc-100 text-zinc-400'}`}>
                        {data.questions.length} Questions
                      </span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openCompanies.includes(data.company) ? 'rotate-180 text-rose-400' : 'text-zinc-300'}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {openCompanies.includes(data.company) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pb-8 space-y-3 px-4">
                          {data.questions.map((q, qIdx) => (
                            <div key={qIdx} className="group flex gap-4 p-5 bg-white border border-zinc-100 rounded-2xl hover:border-rose-100 hover:shadow-sm transition-all">
                               <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-[11px] font-black text-zinc-400 group-hover:text-rose-600 shrink-0 border border-zinc-100 shadow-inner">
                                 {qIdx + 1}
                               </div>
                               <p className="text-sm font-bold text-zinc-700 leading-relaxed group-hover:text-zinc-900 transition-colors">
                                 {q}
                               </p>
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
      </AnimatePresence>

      <div className="mt-20 bg-zinc-950 rounded-[3rem] p-10 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Award className="w-40 h-40 text-[#79BAEC]" /></div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-black text-white tracking-tighter">Ready to showcase your skills?</h2>
          <p className="text-zinc-400 font-medium max-w-xl mx-auto italic">
            "Knowledge is your foundation. Case studies and assignments are your proof. Build both to become unstoppable in your PM journey."
          </p>
        </div>
      </div>
    </motion.div>
  );
};