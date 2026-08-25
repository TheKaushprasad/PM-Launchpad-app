import { InterviewScenario } from '../../types/interview';

export const STRATEGY_SCENARIOS: InterviewScenario[] = [
  // ==========================================
  // 🟢 EASY (10 Questions)
  // ==========================================
  {
    id: 'strat-spotify-hardware-headphones',
    track: 'strategy',
    title: 'Should Spotify launch its own hardware (headphones/speakers)?',
    company: 'Spotify',
    companyColor: 'bg-green-600 text-white',
    companyBadge: 'Hardware vs Software Strategy',
    difficulty: 'Easy',
    targetDurationMinutes: 30,
    problemStatement: 'Spotify is considering launching its own branded premium headphones and smart home speakers. As VP of Product Strategy, evaluate whether Spotify should enter the hardware manufacturing market.',
    contextBackground: 'Spotify is the audio streaming market leader (600M+ users) but operates on razor-thin gross margins (~26-28%) due to record label royalty payouts (~70%). Apple, Sony, and Bose dominate audio hardware.',
    candidateBrief: [
      'Analyze Strategic Alignment: Core competencies (software/recommendation algorithms) vs Hardware realities (supply chain, inventory risk, manufacturing capex, low margin hardware)',
      'Evaluate Competitive Dynamics: Apple, Bose, and Sony have decades of acoustic engineering and hardware retail distribution moats',
      'Assess Platform Ecosystem Risk: Will launching hardware alienate existing hardware integration partners (Sonos, Bose, Amazon Alexa)?',
      'Formulate a definitive Go / No-Go Recommendation with alternative strategic bets (e.g. Spotify Connect licensing, Car Thing learnings)'
    ],
    keyEvaluationMetrics: ['Hardware Unit Economics & CapEx', 'Core Competency Fit', 'Partner Ecosystem Conflict', 'Definitive Executive Recommendation'],
    suggestedFramework: 'Strategic Fit & Core Competencies -> Market Landscape & Competitor Moats -> Financial Economics & CapEx -> Partner Ecosystem Risks -> Strategic Recommendation',
    benchmarkOutline: {
      clarificationQuestions: ['What is the core objective (margin expansion, ecosystem lock-in, or brand defense)?', 'What were the post-mortem learnings from Spotify\'s discontinued "Car Thing" hardware?'],
      coreHypothesesOrSegments: ['Hardware manufacturing is a low-margin capital-intensive distraction that plays directly into Apple\'s hardware moat', 'Spotify\'s true competitive advantage is ubiquity via software ("Spotify Connect" on every device)', 'Entering hardware creates channel conflict with hardware partners who integrate Spotify'],
      analyticalPath: ['Evaluate unit economics: Hardware gross margins (15-25%) with high warranty/returns vs Spotify software scale', 'Analyze strategic risk: Apple/Sony can cross-subsidize hardware with services, whereas Spotify has no retail footprint', 'Recommendation: Decisive NO-GO on first-party hardware; double down on Spotify Connect API ubiquity and audio advertising tech.'],
      synthesisModel: 'Recommendation: NO-GO. Hardware dilutes Spotify\'s software ubiquity advantage, introduces severe supply chain CapEx, and competes directly with hardware partners. Focus capital on high-margin podcasting and AI audio ad-tech.'
    }
  },
  {
    id: 'strat-monetize-whatsapp-no-ads',
    track: 'strategy',
    title: 'How would you monetize WhatsApp without ads?',
    company: 'WhatsApp / Meta',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Platform Monetization',
    difficulty: 'Easy',
    targetDurationMinutes: 30,
    problemStatement: 'WhatsApp has over 2.5 billion active users globally. Meta leadership has committed to keeping the personal chat inbox private and ad-free. Formulate a comprehensive monetization strategy for WhatsApp without placing ads in personal chat threads.',
    contextBackground: 'WhatsApp generates revenue primarily through the WhatsApp Business API (B2B conversational commerce and customer support notifications).',
    candidateBrief: [
      'Segment User Archetypes: Consumers (P2P), Micro-Entrepreneurs/SMBs (WhatsApp Business App), and Enterprise Brands (WhatsApp Cloud API)',
      'Design Monetization Pillars:',
      '1. WhatsApp Business API Tiered Messaging (Utility, Authentication OTPs, Marketing/Promotional blasts)',
      '2. In-Chat End-to-End Payments & Commerce Take Rate (Merchant UPI/Pix checkout transaction fees)',
      '3. Premium WhatsApp Business Tools (Custom web links, multi-agent inbox subscriptions, CRM integrations)',
      '4. Click-to-WhatsApp Ads on Facebook/Instagram (Driving off-platform ad revenue)',
      'Prioritize revenue potential vs user experience impact and build a 3-year revenue roadmap'
    ],
    keyEvaluationMetrics: ['Monetization Pillar Structure', 'B2B Enterprise Value Proposition', 'Fintech Payment Take Rates', 'User Privacy & UX Preservation'],
    suggestedFramework: 'User & Business Segmentation -> Value Creation Mapping -> Monetization Engines (B2B API, Payments, SaaS Subscriptions) -> Tradeoffs & Risks',
    benchmarkOutline: {
      clarificationQuestions: ['Are ads in WhatsApp Status (Stories) allowed or strictly zero ads anywhere in the app?', 'What are the primary target geographic markets (e.g. India, Brazil, LatAm, Europe)?'],
      coreHypothesesOrSegments: ['B2B Enterprise Conversational Commerce is the highest-value monetization vector ($10B+ ARR potential)', 'End-to-end payment processing in Brazil/India enables zero-friction shopping with a 1.5% take rate', 'Paid Click-to-WhatsApp ads on Instagram funnel high-intent enterprise ad spend'],
      analyticalPath: ['Pillar 1: Per-conversation billing for Enterprises (Customer support, flight alerts, banking OTPs)', 'Pillar 2: WhatsApp Pay Merchant checkout commissions on catalog purchases', 'Pillar 3: WhatsApp Business Premium $9.99/mo subscription for SMB multi-device support and custom catalogue links'],
      synthesisModel: 'Executive strategy: Scale 3 pillars: 1) WhatsApp Business API tiered conversation billing, 2) In-chat merchant payment take-rate (1-2%), and 3) Premium SMB SaaS tooling, preserving a 100% ad-free personal consumer inbox.'
    }
  },
  {
    id: 'strat-netflix-free-ad-tier',
    track: 'strategy',
    title: 'Should Netflix offer a free, ad-supported tier (assuming they haven’t)?',
    company: 'Netflix',
    companyColor: 'bg-red-600 text-white',
    companyBadge: 'Pricing & Monetization',
    difficulty: 'Easy',
    targetDurationMinutes: 30,
    problemStatement: 'Netflix is evaluating whether to launch a completely 100% Free, Ad-Supported Streaming TV (FAST) tier (like Pluto TV / Tubi) alongside its paid subscription models. Analyze the strategic fit, cannibalization risks, and profitability.',
    contextBackground: 'Netflix already has a paid "Standard with Ads" tier ($6.99/mo). A completely free tier could unlock massive top-of-funnel users in emerging markets.',
    candidateBrief: [
      'Evaluate Market Opportunity: Emerging markets (India, LatAm, SE Asia) with high price sensitivity and large unmonetized audiences',
      'Analyze Cannibalization & Down-Trading Risk: Will existing $15.49/mo and $6.99/mo paid subscribers downgrade to the free tier?',
      'Model Unit Economics: Free Ad ARPU ($1.50 - $3.00/mo) vs High Content Licensing & Bandwidth Delivery Costs per user',
      'Content Catalog Strategy: Full catalog vs Windowed legacy catalog (older seasons, back catalog only)',
      'Provide a clear Strategic Decision and Execution Guardrails'
    ],
    keyEvaluationMetrics: ['Subscription Cannibalization Risk', 'Ad ARPU vs Content Cost Economics', 'Catalog Windowing Strategy', 'Emerging Market Strategic Positioning'],
    suggestedFramework: 'Market Opportunity & User Need -> Cannibalization vs Incremental Reach -> Financial Unit Economics (Ad RPM vs CDN/Content Cost) -> Catalog Gating -> Final Recommendation',
    benchmarkOutline: {
      clarificationQuestions: ['Would the free tier have the complete Netflix original catalog or a restricted subset of older titles?', 'Is this targeted globally or restricted to emerging markets?'],
      coreHypothesesOrSegments: ['Offering the full catalog for free will destroy paid subscription ARPU in developed markets (US/Europe)', 'Ad-only revenue in emerging markets ($1-2 ARPU) cannot cover expensive prestige production budgets', 'A restricted, windowed "Netflix Free" tier can act as an acquisition funnel without cannibalizing paid tiers'],
      analyticalPath: ['Unit economics check: Free user watches 20 hrs/mo @ 4 ads/hr = 80 ad impressions @ $25 CPM = $2.00/mo ad revenue; CDN/streaming cost = $0.50/mo; Content amortization = $3.00/mo -> Net negative unless heavy conversion to paid'],
      synthesisModel: 'Recommendation: NO to a global free tier (protects high-ARPU subscriptions); YES to an emerging-market-only FAST tier featuring only Season 1 originals and licensed local library as a permanent teaser funnel.'
    }
  },
  {
    id: 'strat-favorite-product-strategic-threat',
    track: 'strategy',
    title: 'Pick a favorite product. What is its biggest strategic threat?',
    company: 'Figma / Google Maps / Uber',
    companyColor: 'bg-purple-600 text-white',
    companyBadge: 'Strategic Moat Analysis',
    difficulty: 'Easy',
    targetDurationMinutes: 30,
    problemStatement: 'Pick a digital product you admire (e.g. Figma). Identify its core defensible competitive moat, and analyze its single biggest existential strategic threat over a 3-5 year horizon. Formulate a proactive defense strategy.',
    contextBackground: 'Figma revolutionized UI/UX design with collaborative real-time browser canvas and plugins, but Generative AI text-to-UI tools and platform bundling (Canva/Adobe) are shifting the landscape.',
    candidateBrief: [
      'Deconstruct Current Moats: Collaborative Multiplayer WebGL Canvas, Deep Design System Component Libraries, Community Plugin Ecosystem, Viral Bottom-Up Designer Adoption',
      'Identify Existential Strategic Threat: Generative AI Text-to-App/Code (e.g. v0, Claude Artifacts) allowing product managers and engineers to bypass manual UI design entirely',
      'Evaluate Second-Order Impact: Upstream design phase shrinking as developers generate production-ready code directly from product specs',
      'Architect a 3-Year Strategic Counter-Offensive: Integrate AI as design co-pilot, bridge Design-to-Code execution directly into Git, and expand into Product Management canvas'
    ],
    keyEvaluationMetrics: ['Moat Identification Precision', 'Existential Threat Depth (Not just surface competitors)', 'Structural Shifts vs Point Solutions', 'Proactive Strategic Roadmap'],
    suggestedFramework: 'Core Moat Assessment -> Paradigm Shift Threat Analysis -> Value Chain Disruption -> Strategic Defense & Expansion Playbook',
    benchmarkOutline: {
      clarificationQuestions: ['Which product are we dissecting? (Figma)', 'Are we analyzing competitor imitation (Adobe/Penpot) or technological paradigm shifts (GenAI text-to-code)? (Paradigm shift).'],
      coreHypothesesOrSegments: ['Figma\'s current moat: Multiplayer collaboration and design token standardization', 'Existential threat: AI text-to-code bridges the gap directly from idea to working React app, making pixel-by-pixel vector drawing redundant', 'Defense: Pivot Figma from a "drawing canvas" to the "System of Record for UI Component Code & Design Tokens"'],
      analyticalPath: ['Analyze value chain: Idea -> PRD -> Figma Wireframe -> Design Review -> Eng Slicing -> Code -> Launch', 'AI text-to-UI threatens to eliminate the middle 4 steps', 'Figma counter-move: Native AI code generation, Dev Mode code sync, and interactive functional prototypes'],
      synthesisModel: 'Executive strategy for Figma: Neutralize the AI text-to-code threat by evolving from vector illustration to the collaborative AI-native canvas that orchestrates tokens, code components, and live interactive apps.'
    }
  },
  {
    id: 'strat-local-coffee-shop-market-share',
    track: 'strategy',
    title: 'How would you increase market share for a new local coffee shop?',
    company: 'Blue Tokai / Local Specialty Cafe',
    companyColor: 'bg-amber-800 text-white',
    companyBadge: 'GTM & Local Growth',
    difficulty: 'Easy',
    targetDurationMinutes: 30,
    problemStatement: 'You are launching an independent specialty artisanal coffee cafe in a busy commercial district competing against established global chains (Starbucks) and low-cost kiosks. How would you capture a 20% local market share within 12 months?',
    contextBackground: 'The neighborhood has 15,000 corporate desk workers, 4,000 affluent residents, and 8 existing coffee outlets within a 500-meter radius.',
    candidateBrief: [
      'Customer Segmentation & Jobs-to-be-Done: Morning Grab-and-Go Commuters (speed), Afternoon Remote Workers/Meetings (Wi-Fi/ambiance), Weekend Specialty Enthusiasts (taste/origin)',
      'Value Proposition & Differentiation: Fresh single-origin beans, transparent pricing (25% cheaper than Starbucks), 60-second mobile order pickup',
      'Growth & Distribution Levers:',
      '1. Corporate B2B subscription passes for surrounding tech offices',
      '2. Hyperlocal loyalty app with prepaid coffee wallet & streak rewards',
      '3. Signature bean subscription and brewing workshops for weekend community building',
      'Set unit economics and target customer acquisition metrics'
    ],
    keyEvaluationMetrics: ['Customer Segmentation & JTBD', 'Competitive Differentiation vs Incumbents', 'B2B Corporate Partnerships & Subscriptions', 'Customer Lifetime Value & Retention Hooks'],
    suggestedFramework: 'Market & Competitor Mapping -> Distinct Value Proposition -> Acquisition Loops (Corporate, Commuter, Weekend) -> Retention & Loyalty Economics',
    benchmarkOutline: {
      clarificationQuestions: ['What is the cafe\'s physical footprint (large sit-down cafe vs compact grab-and-go kiosk)?', 'What is our unique cost or quality advantage? (Direct farm-to-cup single-origin beans).'],
      coreHypothesesOrSegments: ['Morning rush is 60% of daily volume: optimize for 45-second order-to-handout speed via WhatsApp/Mobile pre-order', 'Corporate lunch & meetings: offer dedicated quiet work tables with high-speed Wi-Fi and power outlets', 'Corporate subscriptions: partner with top 5 nearby tech companies for 15% employee corporate discounts'],
      analyticalPath: ['Capture 20% of local market (~1,000 cups/day in catchment area) = 200 cups/day to achieve breakeven and growth', 'Unit economics: $1.20 COGS on $3.80 specialty latte = 68% gross margin'],
      synthesisModel: 'Executive strategy: Win on single-origin quality and 45-second mobile pickup speed for morning commuters, while securing corporate B2B coffee subscriptions to anchor baseline daily volume.'
    }
  },
  {
    id: 'strat-uber-eats-acquire-grocery-startup',
    track: 'strategy',
    title: 'Should Uber Eats acquire a grocery delivery startup?',
    company: 'Uber',
    companyColor: 'bg-black text-white',
    companyBadge: 'M&A & Vertical Expansion',
    difficulty: 'Easy',
    targetDurationMinutes: 30,
    problemStatement: 'Uber Eats is considering acquiring a leading rapid 15-minute grocery delivery startup (e.g., Getir/Gorillas) for $800M or building its own grocery fulfillment network from scratch. Evaluate whether Uber should Acquire, Build, or Partner.',
    contextBackground: 'Uber has a global driver fleet and 150M active platform users, but instant grocery requires dark stores, specialized inventory management, and high perishables wastage.',
    candidateBrief: [
      'Strategic Build vs Buy vs Partner Analysis:',
      '- Buy: Instant dark store infrastructure and supplier relationships, but absorbs high cash burn and heavy real estate leases',
      '- Build: High time-to-market and operational learning curve in fresh food supply chain',
      '- Partner (Instacart model): Asset-light integration with existing supermarket chains (Kroger, Carrefour, Woolworths) using Uber\'s courier fleet',
      'Evaluate Synergies: Driver fleet cross-utilization during off-peak meal hours (10 AM - 12 PM, 2 PM - 5 PM)',
      'Deliver a definitive Strategic Recommendation with financial justification'
    ],
    keyEvaluationMetrics: ['Build vs Buy vs Partner Framework', 'Asset-Heavy Dark Stores vs Asset-Light Marketplace', 'Driver Fleet Off-Peak Cross-Utilization', 'Final M&A Decision Justification'],
    suggestedFramework: 'Strategic Rationale & Synergies -> Build vs Buy vs Partner Evaluation -> Financial Risk & Capital Intensity -> Strategic Recommendation',
    benchmarkOutline: {
      clarificationQuestions: ['Is the target startup an inventory-owning dark-store operator or a third-party retail marketplace aggregator?', 'What is Uber\'s capital allocation priority (profitability vs market land grab)?'],
      coreHypothesesOrSegments: ['Acquiring asset-heavy 15-minute dark store startups brings dangerous lease liabilities and perishable food write-offs', 'Uber\'s true advantage is courier fleet logistics and consumer app reach', 'An asset-light partner model with established supermarket chains maximizes gross margin without taking inventory risk'],
      analyticalPath: ['Compare unit economics: Dark store model loses -$3 to -$5 per order on average; Supermarket partner model delivers +$2.50 contribution margin using standard Uber couriers'],
      synthesisModel: 'Recommendation: DO NOT ACQUIRE the dark store startup. Adopt an asset-light PARTNER strategy with major supermarket chains (e.g. Costco, Albertsons) to monetize Uber couriers without taking real estate leases or inventory risk.'
    }
  },
  {
    id: 'strat-gtm-new-fitness-app',
    track: 'strategy',
    title: 'Design a go-to-market strategy for a new fitness app',
    company: 'Strava / WHOOP',
    companyColor: 'bg-orange-600 text-white',
    companyBadge: 'Go-To-Market (GTM)',
    difficulty: 'Easy',
    targetDurationMinutes: 30,
    problemStatement: 'You are launching an AI-powered personalized strength training and mobility coach app (subscription: $14.99/mo). Design a comprehensive Go-To-Market (GTM) strategy to reach 100,000 paid subscribers in Year 1.',
    contextBackground: 'The digital fitness market is crowded with generic workout video libraries (Peloton, Apple Fitness+) and static tracking logs.',
    candidateBrief: [
      'Target Audience ICP & Positioning: Intermediate gym-goers plateauing on generic routines who cannot afford a $100/hr human personal trainer',
      'Value Proposition & Core Hook: Computer vision form correction + dynamic workout weight progression algorithms',
      'Multi-Phase GTM Launch Architecture:',
      '- Phase 1 (Pre-Launch): Influencer fitness trainer beta co-creation & viral workout challenge waitlist',
      '- Phase 2 (Launch): App Store Apple Feature partnership, Reddit/TikTok creator proof-of-progress transformation campaigns',
      '- Phase 3 (Growth Loops): Social workout sharing cards, gym buddy referral challenges, and Strava/Apple Health integrations',
      'Model Unit Economics: CAC ($35), Trial-to-Paid Conversion (20%), LTV ($120), LTV:CAC Ratio (>3:1)'
    ],
    keyEvaluationMetrics: ['ICP Definition & Value Differentiation', 'Phased GTM Timeline (Pre-Launch -> Launch -> Scale)', 'Viral Growth & Referral Loops', 'Financial CAC / LTV Unit Economics'],
    suggestedFramework: 'Target Audience ICP -> Positioning & Core Hook -> Channel Mix (Organic, Paid, Creator, Partnerships) -> Growth Loops & Economics',
    benchmarkOutline: {
      clarificationQuestions: ['What is the core technical differentiator (computer vision form check, AI dynamic periodization, or celebrity workouts)?', 'What is our initial marketing budget? ($1.5M seed marketing budget).'],
      coreHypothesesOrSegments: ['Position as the "AI Personal Trainer in your pocket for $15/mo" vs static workout PDFs', 'Leverage micro-influencer fitness coaches on Instagram/TikTok with revenue-share affiliate deals', 'Build a native social proof sharing mechanic (auto-generated PR video clips with weight overlays)'],
      analyticalPath: ['Funnel math to 100k paid subs: 500k app downloads -> 250k free trials (50%) -> 100k paid subscribers (40% trial-to-paid) -> $18M ARR at $15/mo'],
      synthesisModel: 'Executive GTM plan: Target intermediate gym lifters via creator revenue-share partnerships, drive viral TikTok form-check video loops, and partner with Apple Health for App of the Day featuring to hit 100k paid subs.'
    }
  },
  {
    id: 'strat-apple-search-engine-google',
    track: 'strategy',
    title: 'Should Apple launch a search engine to compete with Google?',
    company: 'Apple',
    companyColor: 'bg-zinc-800 text-white',
    companyBadge: 'Search & Ecosystem Strategy',
    difficulty: 'Easy',
    targetDurationMinutes: 30,
    problemStatement: 'Google currently pays Apple ~$20 Billion annually (Information Services Agreement) to remain the default search engine on Safari iOS devices. Evaluate whether Apple should launch its own public search engine and terminate the Google deal.',
    contextBackground: 'Apple has built substantial search crawling technology (Applebot, Spotlight, Siri Suggestion Index) and champions consumer privacy.',
    candidateBrief: [
      'Strategic Financial Tradeoff: Guaranteed 100% pure profit $20B annual revenue from Google with zero CapEx vs Building global search infrastructure and ad monetization network',
      'Infrastructure & CapEx Realities: Web crawling index at Google scale requires tens of billions in server farms, web indexing pipelines, and real-time ad auction engines',
      'Antitrust & Regulatory Backdrop: US DOJ antitrust lawsuits targeting the Google-Apple default search revenue-sharing agreement',
      'Alternative Strategic Path: Enhance on-device Spotlight AI semantic search and Siri LLM integrations while collecting Google payments as long as legally permissible',
      'Definitive Go / No-Go Strategic Verdict'
    ],
    keyEvaluationMetrics: ['Financial Tradeoff ($20B Pure Profit vs Ad Network Buildout)', 'Technical & Infrastructure Barrier to Entry', 'Antitrust / Regulatory Pressures', 'Strategic Alternative Recommendations'],
    suggestedFramework: 'Financial Analysis ($20B Revenue Share vs Search Economics) -> Technical Feasibility & CapEx -> Regulatory Landscape -> Strategic Alternatives -> Decision',
    benchmarkOutline: {
      clarificationQuestions: ['Is this triggered by potential regulatory bans on the Google-Apple revenue sharing deal?', 'Would the search engine be web-wide or focused on on-device/Siri personal intelligence?'],
      coreHypothesesOrSegments: ['Launching a standalone web search engine destroys $20B of pure 100% margin EBITDA with no guarantee of building a viable ad network', 'Apple\'s brand is built on privacy, creating cognitive dissonance with building a behavioral search ads engine', 'Apple should maintain Applebot/Spotlight as an internal hedge while evolving Siri into an AI answer engine'],
      analyticalPath: ['Google Safari ad revenue is ~$35B; Google pays Apple $20B (57% rev share); If Apple built its own search, it would take 5+ years and billions in CapEx just to match that net cash flow'],
      synthesisModel: 'Recommendation: DO NOT launch a standalone public web search engine. Keep collecting the $20B Google default revenue until legally blocked; invest R&D into on-device Apple Intelligence and Siri AI answers as the next-gen search interface.'
    }
  },
  {
    id: 'strat-instagram-strategy-tiktok',
    track: 'strategy',
    title: 'How would you improve Instagram’s strategy against TikTok?',
    company: 'Instagram / Meta',
    companyColor: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white',
    companyBadge: 'Competitive Social Strategy',
    difficulty: 'Easy',
    targetDurationMinutes: 30,
    problemStatement: 'TikTok continues to dominate youth entertainment and cultural trend creation with its uncannily accurate interest-graph algorithm. As Head of Product Strategy for Instagram, define a differentiated product strategy to win back Gen-Z engagement without alienating your core community.',
    contextBackground: 'Instagram Reels successfully scaled video watch time, but users frequently complain that Instagram is becoming a clone of TikTok, losing its personal social graph identity.',
    candidateBrief: [
      'Competitive Moat Analysis: TikTok (Pure entertainment, viral interest graph, creator editing tools) vs Instagram (Social graph, Close Friends, Stories, DMs, creator commerce)',
      'Identify Strategic Vulnerabilities of TikTok: Regulatory scrutiny/bans, lack of strong 1:1 private messaging culture, weak multi-format utility (Photos, Carousels, Stories, DMs)',
      'Formulate Three Strategic Pillars:',
      '1. The Social Graph Advantage: Deepen private sharing in DMs, Close Friends, and Collaborative Collections',
      '2. Creator Monetization & Commerce: Turn creators from video performers into sustainable e-commerce / affiliate businesses',
      '3. Re-elevating Photography & Micro-Vlogging: Differentiate with authentic Carousels, photo dumps, and Notes over passive algorithmic doomscrolling',
      'Define north star success metrics'
    ],
    keyEvaluationMetrics: ['Social Graph vs Interest Graph Moat Differentiation', 'Private Messaging / DM Engagement', 'Creator Monetization & Commerce Enablement', 'Anti-Homogenization Strategic Vision'],
    suggestedFramework: 'Competitive Moat Comparison -> User Frustrations & TikTok Vulnerabilities -> Strategic Differentiation Pillars -> Execution Roadmap',
    benchmarkOutline: {
      clarificationQuestions: ['Are we trying to beat TikTok at algorithmic video entertainment or differentiate on social connection?', 'What age demographic is the primary priority (Gen Z teens vs Millennials)?'],
      coreHypothesesOrSegments: ['Trying to out-TikTok TikTok makes Instagram generic; Instagram\'s unbeatable moat is the real-world Social Graph and Direct Messaging', 'More than 50% of content sharing has moved from public feed to private DMs and Stories', 'Creators make more revenue on Instagram via sponsorships and shops than TikTok Creator Fund'],
      analyticalPath: ['Double down on DMs: Shared Reels feeds, interactive group chats, and Notes', 'Creator Commerce: Integrated shopping storefronts and direct brand affiliate partnerships', 'Reclaim culture: Authentic photo carousels and life updates'],
      synthesisModel: 'Executive strategy: Do not fight TikTok purely on algorithmic video consumption. Win on the Social Graph: position Instagram as the platform where you discover entertainment AND privately share, talk, and buy with your real-world friends.'
    }
  },
  {
    id: 'strat-peloton-lower-bike-prices',
    track: 'strategy',
    title: 'Should Peloton lower its bike prices significantly?',
    company: 'Peloton',
    companyColor: 'bg-red-700 text-white',
    companyBadge: 'Hardware & Subscription Strategy',
    difficulty: 'Easy',
    targetDurationMinutes: 30,
    problemStatement: 'Following post-pandemic subscriber stagnation and inventory write-downs, Peloton is considering slashing the retail price of its flagship Bike from $1,445 to $799 (or offering it for free with a 24-month subscription commitment). Evaluate the business impact.',
    contextBackground: 'Peloton makes ~70% gross margin on its $44/month Connected Fitness Subscription, but hardware sales have historically had thin or negative gross margins after shipping and assembly.',
    candidateBrief: [
      'Evaluate Razor-and-Blade Business Model: Hardware as an acquisition vehicle vs Subscription as long-term recurring profit engine',
      'Calculate Customer Lifetime Value (LTV) and Payback Period:',
      '- Subscription: $44/month × 70% Gross Margin = $30.80/month Gross Profit',
      '- Customer Lifespan: Average 48 months (Churn <1.5%/mo) -> Subscription LTV = ~$1,478',
      'Assess Brand Equity & Perceived Luxury vs Addressable Market Expansion',
      'Evaluate Hardware Subsidization vs Certified Pre-Owned (Refurbished) vs Rental Subscription Programs',
      'Provide a definitive Pricing Strategy Recommendation'
    ],
    keyEvaluationMetrics: ['Razor-and-Blade Model Mechanics', 'LTV / Churn / Payback Period Modeling', 'Brand Luxury Positioning vs TAM Expansion', 'Rental & Refurbished Alternative Models'],
    suggestedFramework: 'Unit Economics & LTV Modeling -> Pricing Elasticity & TAM Expansion -> Brand Equity Impact -> Business Model Options (Rental vs Direct Cut) -> Recommendation',
    benchmarkOutline: {
      clarificationQuestions: ['What is the current monthly churn rate on subscriptions (~1.2-1.4%)?', 'Is Peloton manufacturing hardware internally or via outsourced ODM partners? (Outsourced).'],
      coreHypothesesOrSegments: ['High upfront hardware price ($1,445) is the primary friction barrier blocking mass-market adoption', 'Direct price slashing damages brand prestige and creates balance sheet losses if hardware margin turns deeply negative', 'A "Hardware Rental" program ($89/month for bike + all-access content) eliminates upfront friction while preserving luxury retail MSRP'],
      analyticalPath: ['Model Rental Program: $89/mo covers hardware depreciation in 14 months; churned bikes are refurbished and redeployed 3-4 times, yielding 2.5x higher lifetime gross margin than a discounted one-off sale'],
      synthesisModel: 'Recommendation: DO NOT slash permanent retail hardware price to $799. Instead, scale the $89/month "Peloton Rental" program and expand Certified Refurbished channels to capture cost-conscious users while preserving premium brand equity.'
    }
  },

  // ==========================================
  // 🟡 MEDIUM (10 Questions)
  // ==========================================
  {
    id: 'strat-airbnb-business-travel-market',
    track: 'strategy',
    title: 'You are PM for Airbnb. Should you enter the business travel market?',
    company: 'Airbnb',
    companyColor: 'bg-rose-600 text-white',
    companyBadge: 'B2B Market Expansion',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Airbnb is evaluating whether to launch a major B2B enterprise push ("Airbnb for Work 2.0") to aggressively compete with Marriott and Hilton for corporate business travelers and digital nomads. Define the strategic roadmap.',
    contextBackground: 'Corporate travel is a $1.4 Trillion global market with high-margin, predictable weekday occupancy. However, corporate travelers prioritize consistency, instant check-in, billing integration (Concur), and strict safety SLAs.',
    candidateBrief: [
      'Analyze Corporate Traveler vs Leisure Traveler Needs (Instant check-in, dedicated workspace, high-speed Wi-Fi verification, single corporate invoicing, duty-of-care compliance)',
      'Segment Corporate Travel: Solo Sales/Consulting Road Warriors (hotels win) vs Extended Stays / Relocations vs Team Offsites & Retreats (Airbnb wins)',
      'Identify Core Product Deficits: Lack of standardized check-in desks, inconsistent Wi-Fi, expense management integration, and corporate tax receipting',
      'Formulate a 3-Year B2B Product Strategy: Focus on Extended Stays (30+ days) and Team Offsites rather than 1-night road warrior hotel displacement'
    ],
    keyEvaluationMetrics: ['B2B vs B2C Traveler Jobs-to-be-Done', 'Corporate Expense & Duty-of-Care Integrations', 'Segment Selection (Offsites/Relocation vs 1-Night Road Warriors)', 'Host Incentive & Certification Program'],
    suggestedFramework: 'Corporate Travel TAM & Persona Segmentation -> Structural Deficits vs Hotel Incumbents -> Strategic Positioning (Where to Play & Win) -> Product Roadmap & GTM',
    benchmarkOutline: {
      clarificationQuestions: ['Are we targeting 1-night solo corporate trips or multi-week project stays and group offsites?', 'Do we integrate with corporate travel booking tools like SAP Concur and Navan? (Yes).'],
      coreHypothesesOrSegments: ['Competing with hotels for 1-night road warriors is a losing battle (friction of keys, no room service, inconsistent desks)', 'Airbnb has an unbeatable natural monopoly in two lucrative B2B sub-segments: 1) Company Team Offsites/Retreats and 2) Employee Relocations/Multi-Week Project Stays', 'Creating an enterprise "Work-Certified" tier solves duty-of-care compliance'],
      analyticalPath: ['Focus 80% of B2B product investment on: 1) Verified Wi-Fi speed & ergonomic workspace filters, 2) Concur/Expensify central corporate billing, 3) Curated large homes for team offsites with breakout rooms'],
      synthesisModel: 'Executive strategy: Do NOT compete for 1-night solo business trips. Dominate the high-growth B2B niches: Team Offsites and 30+ Day Employee Relocations with Concur enterprise billing and Work-Certified host badges.'
    }
  },
  {
    id: 'strat-amazon-launch-traditional-bank',
    track: 'strategy',
    title: 'Should Amazon launch a traditional bank?',
    company: 'Amazon',
    companyColor: 'bg-amber-600 text-white',
    companyBadge: 'Fintech & Banking Strategy',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Amazon has merchant lending, consumer credit cards (partnered with Chase), and Amazon Pay. Evaluate whether Amazon should apply for a full national banking charter to operate as a full-fledged commercial bank.',
    contextBackground: 'Holding a national bank charter allows accepting consumer deposits and lower cost of capital, but triggers heavy regulatory oversight (Fed, FDIC, OCC, Dodd-Frank, capital reserve ratios).',
    candidateBrief: [
      'Analyze Strategic Benefits: Direct low-cost deposit funding for merchant loans, elimination of interchange card processing fees ($10B+ annual savings), deep customer financial telemetry',
      'Analyze Strategic Risks & Burdens: Stringent regulatory compliance, mandatory separation of banking and commercial commerce, capital adequacy reserves locking up cash, public and political antitrust scrutiny',
      'Evaluate Embedded Finance Alternatives: Partnering with chartered sponsor banks (Banking-as-a-Service) vs Owning the charter',
      'Provide a definitive Go / No-Go Strategic Verdict'
    ],
    keyEvaluationMetrics: ['Banking Charter Regulatory Burdens vs Benefits', 'Capital Efficiency & Reserve Requirements', 'Interchange Cost Elimination vs Compliance Cost', 'Embedded Finance Partner Alternative'],
    suggestedFramework: 'Strategic Objectives -> Charter Ownership Pros/Cons -> Embedded Finance Alternative -> Regulatory & Political Risk Assessment -> Strategic Decision',
    benchmarkOutline: {
      clarificationQuestions: ['Would the bank offer consumer checking/savings accounts or strictly merchant business banking?', 'What are the capital reserve requirements under current banking regulations?'],
      coreHypothesesOrSegments: ['Applying for a bank charter would invite massive antitrust scrutiny and subject all of Amazon\'s tech operations to federal banking regulators', 'Amazon can achieve 90% of the financial upside through "Embedded Finance" partnerships (e.g. co-branded cards with Chase, merchant loans with Affirm/Goldman) without regulatory liabilities', 'Becoming a regulated utility bank limits operational agility and growth multiples'],
      analyticalPath: ['Financial comparison: Compliance and capital reserves cost ~$2-3B annually and restrict cash flow; BaaS partner model yields 80% fee savings with zero balance sheet regulatory risk'],
      synthesisModel: 'Recommendation: DECISIVE NO-GO on a banking charter. Pursue aggressive "Embedded Finance" by partnering with chartered banks for consumer checking and merchant credit, capturing fintech value while keeping regulators at bay.'
    }
  },
  {
    id: 'strat-facebook-dating-gtm-strategy',
    track: 'strategy',
    title: 'Facebook wants to enter the dating market. Define the GTM strategy',
    company: 'Meta',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Market Entry & Privacy',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Facebook launched "Facebook Dating" inside the core Facebook mobile app. Define a comprehensive strategy to overcome user privacy skepticism and compete against Tinder, Bumble, and Hinge.',
    contextBackground: 'Facebook has unmatched social graph data, local events, and community groups, but users fear their friends/family will see their dating activity on Facebook.',
    candidateBrief: [
      'Identify Core Strategic Dilemma: Unmatched Identity & Event Data vs Severe Privacy Fear (nobody wants their mom or coworkers to see their dating profile)',
      'Design Privacy-First Architecture: 100% isolated profile, zero activity posted to Facebook feed, friends permanently excluded from match queue',
      'Build Differentiated Feature Hooks:',
      '1. "Secret Crush": Match only if both users mutually tag each other from their existing Facebook/Instagram friend lists',
      '2. "Shared Events & Groups": Match with people attending the same local concerts, festivals, or alumni groups (high intent & common context)',
      'Define GTM positioning and trust-building launch campaign'
    ],
    keyEvaluationMetrics: ['Privacy Wall Architecture & Trust Building', 'Social Graph Feature Differentiation ("Secret Crush")', 'Community & Event-Based Matching', 'Two-Sided Marketplace Liquidity Launch'],
    suggestedFramework: 'Market Landscape & Competitor Moats -> User Trust & Privacy Barriers -> Unique Facebook Data Advantage -> Feature Differentiation -> GTM Execution',
    benchmarkOutline: {
      clarificationQuestions: ['Is Facebook Dating a standalone app or a feature tab inside the main Facebook app?', 'Is it 100% free or freemium? (Free, monetized through ecosystem retention).'],
      coreHypothesesOrSegments: ['Privacy paranoia is the #1 adoption barrier: make profile isolation the headline message of all marketing', 'Tinder matches strangers based on superficial photos; Facebook can match people based on shared community events and mutual social circles', 'Secret Crush feature is an organic viral acquisition hook'],
      analyticalPath: ['Positioning: "Meaningful Relationships from Shared Interests" vs hookup culture', 'GTM mechanics: Launch city-by-city through college alumni and university groups to ensure high initial local liquidity'],
      synthesisModel: 'Executive strategy: Win on community and trust: enforce an ironclad privacy wall excluding existing friends, differentiate with "Shared Events" and "Secret Crush" matching, and launch free through college campus hubs.'
    }
  },
  {
    id: 'strat-google-acquire-pinterest-fit',
    track: 'strategy',
    title: 'Should Google acquire Pinterest? Analyze the strategic fit',
    company: 'Google / Alphabet',
    companyColor: 'bg-red-500 text-white',
    companyBadge: 'M&A & Visual Search Commerce',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Evaluate the strategic, commercial, and technical rationale for Alphabet (Google) acquiring Pinterest for ~$25-30 Billion. Provide a comprehensive Buy vs Do Not Buy assessment.',
    contextBackground: 'Pinterest has 500M+ high-intent monthly active users organizing visual moodboards (home decor, fashion, weddings, DIY). Google excels at intent search but has struggled with social discovery and visual shopping.',
    candidateBrief: [
      'Strategic Synergy Analysis:',
      '- High-Intent Visual Commerce: Pinterest captures early-funnel inspiration search ("boho living room ideas") where Google Search is weakest',
      '- Ad Monetization Multiplier: Google Ads auction machinery and merchant shopping graph can 3x Pinterest\'s currently under-monetized international ARPU',
      '- Visual AI & Lens Integration: Deep training data for Google Lens and generative spatial interior design',
      'Identify Strategic Risks & Antitrust Blockers:',
      '- US DOJ and EU regulatory antitrust scrutiny blocking Big Tech mega-mergers',
      '- Culture clash (algorithmic engineering vs creative aesthetic curation)',
      'Deliver a definitive Acquisition Recommendation with risk mitigation'
    ],
    keyEvaluationMetrics: ['Commercial & Ad-Tech Synergies', 'Visual Search & Early-Funnel Discovery Fit', 'Regulatory & Antitrust Feasibility', 'Definitive Valuation & M&A Verdict'],
    suggestedFramework: 'Strategic Rationale & Synergies -> Monetization & ARPU Upside -> Regulatory Antitrust Reality -> Integration Risks -> Final Recommendation',
    benchmarkOutline: {
      clarificationQuestions: ['What is Pinterest\'s current valuation and international ARPU compared to Google?', 'Would Pinterest remain an independent subsidiary or be merged into Google Shopping?'],
      coreHypothesesOrSegments: ['Pinterest solves Google\'s biggest historical blindspot: visual lifestyle discovery and moodboard curation', 'Google\'s ad-tech engine and 10M+ merchant network can instantly monetize Pinterest\'s 500M users', 'Antitrust regulators will likely attempt to block the merger unless structured carefully'],
      analyticalPath: ['Financial synergy: Pinterest US ARPU is ~$6.50 vs Google\'s ~$40+; applying Google Performance Max ad auctions to Pinterest pins unlocks $5B+ in incremental annual ad revenue'],
      synthesisModel: 'Recommendation: STRATEGIC BUY. Pinterest fills Google\'s visual shopping gap and provides high-intent commercial visual data. If antitrust blocks full acquisition, execute an exclusive global ad-monetization partnership.'
    }
  },
  {
    id: 'strat-turnaround-declining-saas-churn',
    track: 'strategy',
    title: 'How would you turn around a declining SaaS product with high churn?',
    company: 'InVision / Legacy SaaS',
    companyColor: 'bg-zinc-800 text-white',
    companyBadge: 'Product Turnaround',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'You are brought in as Chief Product Officer of a mid-stage B2B SaaS platform ($60M ARR) that has seen revenue decline 15% YoY and gross logo churn spike to 32% annually. Outline your 90-day diagnostic and 12-month turnaround strategy.',
    contextBackground: 'The product was historically a market leader in prototyping/collaboration, but modern integrated competitors (Figma/Miro) bundled its core feature set into their platforms.',
    candidateBrief: [
      'Phase 1: 30-Day Triage & Customer Cohort Diagnostic:',
      '- Cohort churn segmentation (who is leaving, why, and what tools are they switching to?)',
      '- Unit economics audit (cut unprofitable feature maintenance and reduce infrastructure burn)',
      '- Identify the "Unshakeable Core" (the top 20% power accounts that still get immense daily value)',
      'Phase 2: 60-Day Strategic Pivot & Repositioning:',
      '- Stop competing head-on with modern incumbents on their home turf',
      '- Pivot to an underserved adjacent niche (e.g. enterprise compliance, design system governance, legacy format migration)',
      'Phase 3: 12-Month Execution Roadmap (Pricing restructuring, Customer Success retention war room, and AI workflow integration)'
    ],
    keyEvaluationMetrics: ['90-Day Diagnostic Framework', 'Cohort Churn Decomposition', 'Strategic Repositioning & Niche Defense', '12-Month Financial & Retention Targets'],
    suggestedFramework: 'Immediate Triage & Cash Runway -> Churn Cohort Diagnostic -> Strategic Pivot & Niche Selection -> Product Pruning & Refocusing -> 12-Month Turnaround Roadmap',
    benchmarkOutline: {
      clarificationQuestions: ['What is the company\'s remaining cash runway (e.g. 18 months)?', 'Is the product being commoditized by a platform bundle or failing on reliability/usability? (Bundled by competitors).'],
      coreHypothesesOrSegments: ['You cannot win a feature war against modern horizontal suites (Figma); you must narrow focus to a defensible vertical niche', '80% of revenue comes from a sticky enterprise cohort with specific security/compliance needs', 'Prune 50% of legacy bloated features to focus R&D entirely on the high-retention core'],
      analyticalPath: ['Action plan: 1) Form Customer Success retention war room for top 100 accounts, 2) Deprecate low-usage features, 3) Pivot product to Enterprise Design Governance & Security System, 4) Restructure pricing to usage tiers'],
      synthesisModel: 'Executive turnaround plan: Triage churn by focusing exclusively on the top 20% enterprise retention core, stop fighting horizontal incumbents, and pivot into a specialized enterprise governance workflow to stabilize ARR.'
    }
  },
  {
    id: 'strat-tesla-5yr-india-strategy',
    track: 'strategy',
    title: 'Set the 5-year strategy for Tesla in the Indian market',
    company: 'Tesla',
    companyColor: 'bg-red-600 text-white',
    companyBadge: 'International Market Entry',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'You are appointed Head of Market Expansion for Tesla India. Formulate Tesla’s comprehensive 5-year Market Entry, Manufacturing, and Commercial Strategy for the Indian automotive market.',
    contextBackground: 'India has high import tariffs (70-100% on CBU imported cars), evolving EV charging infrastructure, extreme heat/road conditions, and local EV competition from Tata Motors and Mahindra.',
    candidateBrief: [
      'Analyze India Market Reality: Luxury car segment is small (<50k cars/year), but EV transition is accelerating in Tier-1 metros',
      'Phase 1 (Years 1-2): Brand Beachhead & Supercharger Infrastructure:',
      '- Import Model Y / Model 3 in limited volume under reduced tariff windows to establish premium brand presence in Mumbai, Delhi, Bangalore',
      '- Build out proprietary Supercharger corridors along top highways (Mumbai-Pune, Delhi-Jaipur, Bangalore-Chennai)',
      'Phase 2 (Years 3-4): Local Manufacturing / Assembly (CKD / Gigafactory):',
      '- Leverage government PLI incentives to set up local assembly and battery pack integration',
      'Phase 3 (Years 4-5): The "$25,000 Next-Gen EV / Tesla Compact":',
      '- Launch high-ground-clearance compact crossover tailored for Indian road conditions and commercial fleet autonomy'
    ],
    keyEvaluationMetrics: ['Phased Market Entry Roadmap (Import -> Assemble -> Mass Market)', 'Tariff & Government Policy Navigation', 'Supercharger Infrastructure Rollout Strategy', 'Localization for Indian Road/Climate Realities'],
    suggestedFramework: 'Market Dynamics & Regulatory Tariffs -> Phased 5-Year Roadmap (Beachhead -> Local Assembly -> Mass Market) -> Charging Ecosystem Buildout -> Product Localization',
    benchmarkOutline: {
      clarificationQuestions: ['Is the Indian government offering import duty concessions tied to local manufacturing investment commitments? (Yes, new EV policy).', 'What price segments are we targeting across the 5-year horizon? (Luxury $45k+ initial -> Mass-affluent $25k).'],
      coreHypothesesOrSegments: ['Initial CBU imports build brand prestige among affluent tech executives and establish Supercharger corridors', 'Long-term volume (>100k units/year) is impossible without local manufacturing and a sub-$30,000 vehicle', 'Suspension and battery thermal management must be localized for Indian potholes and 45°C ambient summer temperatures'],
      analyticalPath: ['5-Year Projections: Year 1-2: 8,000 premium imports + 50 Supercharger stations; Year 3-4: Local Gigafactory operational; Year 5: 75,000 units/year led by the localized Compact EV'],
      synthesisModel: 'Executive 5-year strategy: 1) Beachhead with Model Y imports and metro Supercharger corridors, 2) Invest in a localized Gigafactory to bypass 100% tariffs, 3) Launch a ruggedized $25k compact EV to capture India\'s booming mass-affluent market.'
    }
  },
  {
    id: 'strat-disney-acquire-gaming-studio',
    track: 'strategy',
    title: 'Should Disney+ acquire a major gaming studio?',
    company: 'Disney',
    companyColor: 'bg-blue-900 text-white',
    companyBadge: 'Entertainment & Gaming M&A',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Disney is evaluating whether to acquire a tier-1 gaming publisher/studio (e.g. Electronic Arts, Ubisoft, or Epic Games stake) to build an integrated Disney+ transmedia gaming ecosystem. Evaluate the strategic fit.',
    contextBackground: 'Disney historically shut down its internal game development (Disney Infinity) and shifted to a lucrative IP licensing model (EA Star Wars, Sony Spider-Man, Epic Fortnite partnerships).',
    candidateBrief: [
      'Strategic Model Comparison:',
      '- IP Licensing Model (Status Quo): Pure 100% margin royalty checks with zero game development execution risk, but cedes direct gamer relationship and backend upside',
      '- Studio Acquisition Model: Direct control over Marvel/Star Wars interactive experiences, in-game subscriptions integrated into Disney+, and cross-media engagement',
      'Analyze Historical Precedents: Disney\'s past struggle managing creative game development studios vs Netflix Games / Sony PlayStation success',
      'Evaluate Strategic Alternatives: Equity investments (like Disney\'s $1.5B investment in Epic Games) vs Full studio buyout',
      'Deliver a definitive Strategic Recommendation'
    ],
    keyEvaluationMetrics: ['IP Licensing vs First-Party Development Economics', 'Historical Corporate Competency Post-Mortem', 'Transmedia Subscriber Retention Hooks', 'Strategic Minority Equity Partnership Alternative'],
    suggestedFramework: 'Gaming Market Evolution -> First-Party Studio vs IP Licensing Tradeoffs -> Disney Core Competency Assessment -> Epic Games Model -> Final Recommendation',
    benchmarkOutline: {
      clarificationQuestions: ['What is the core strategic objective: direct gaming revenue or Disney+ streaming subscriber retention?', 'Is Disney prepared to absorb hit-driven game studio margin volatility?'],
      coreHypothesesOrSegments: ['First-party game development is a volatile, hit-driven, capital-intensive business that Hollywood studios historically mismanage', 'Licensing Marvel/Star Wars IP generated billions in risk-free royalties', 'A minority equity stake + deep commercial partnership (like Epic Unreal Engine/Fortnite) provides the perfect balance of metaverse presence without operational bloat'],
      analyticalPath: ['Financial comparison: IP Licensing delivers $1B+ in pure operating profit with zero downside; Studio ownership brings $300M+ per AAA game development risk and delayed multi-year cycles'],
      synthesisModel: 'Recommendation: DO NOT acquire a full gaming studio. Double down on the $1.5B Epic Games partnership and expand multi-publisher IP licensing, capturing massive royalties and transmedia promotion without operational studio liabilities.'
    }
  },
  {
    id: 'strat-dropbox-compete-google-drive',
    track: 'strategy',
    title: 'How should Dropbox compete with Google Drive’s free tiers?',
    company: 'Dropbox',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'SaaS Competitive Differentiation',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Google Drive and Microsoft OneDrive offer 15GB free storage and bundle seamless document collaboration (Docs, Sheets, Office 365) at near-zero marginal cost. How should standalone Dropbox defend its business and expand its enterprise moat?',
    contextBackground: 'Raw cloud storage is a commoditized race-to-the-bottom utility. Dropbox has ~$2.5B ARR with 18M paying subscribers, driven by creative professionals and secure workflows.',
    candidateBrief: [
      'Acknowledge the Commodity Trap: You cannot win a gigabyte-for-gigabyte storage price war against hyperscalers (Google, Microsoft, Apple)',
      'Identify Defensible Niche Superpowers: High-speed large file syncing (LAN sync, delta-sync for 50GB video/RAW files), platform neutrality, best-in-class security/e-signature (HelloSign), and creative review workflows (Replay)',
      'Strategic Expansion Vectors:',
      '1. Verticalized Workflow Suite for Creators & Media (Video review, automated transcription, frame-by-frame annotations)',
      '2. Universal AI Knowledge Organizer (Dropbox Dash: search and organize across Google Drive, Notion, Slack, and Salesforce)',
      '3. Enterprise Content Security & Document Workflow (E-signatures, document tracking, virtual data rooms for M&A)',
      'Set strategic targets and repositioning plan'
    ],
    keyEvaluationMetrics: ['Storage Commoditization Analysis', 'Creative & Media Workflow Specialization', 'Platform Neutrality Moat (Dropbox Dash)', 'Transition from Storage Utility to Workflow System of Record'],
    suggestedFramework: 'Commodity Trap Reality -> Core Differentiated Strengths -> Strategic Pillars (Creative Workflows, Universal AI Search, Security) -> Business Model Defense',
    benchmarkOutline: {
      clarificationQuestions: ['Are we focusing on consumer backup or B2B creative teams and SMB professional services?', 'How is Dropbox Dash performing in enterprise beta?'],
      coreHypothesesOrSegments: ['Do not sell "storage"—sell "smart workflows and content collaboration"', 'Creative professionals (photographers, video editors, architects) happily pay premium prices for fast sync of 100GB files that choke Google Drive', 'Position Dropbox as the platform-agnostic AI search layer (Dropbox Dash) that indexes competitor silos'],
      analyticalPath: ['Shift product narrative: Storage -> Content Workflows (Sign, Replay, DocSend, Dash); ARPU expands from $10/mo to $25/mo for professional creator teams'],
      synthesisModel: 'Executive strategy: Abandon the raw storage price war. Transform Dropbox into the premier workflow operating system for creative professionals and the platform-neutral universal AI knowledge hub (Dropbox Dash).'
    }
  },
  {
    id: 'strat-netflix-live-sports-pros-cons',
    track: 'strategy',
    title: 'Evaluate the pros and cons of Netflix getting into live sports',
    company: 'Netflix',
    companyColor: 'bg-red-600 text-white',
    companyBadge: 'Live Streaming & Content Strategy',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'As VP of Content Strategy for Netflix, evaluate whether Netflix should bid on major live sports broadcasting rights (e.g. NFL, Premier League, Formula 1, NBA) or continue focusing on sports docuseries and exhibition events.',
    contextBackground: 'Amazon Prime (Thursday Night Football), Apple TV+ (MLS, MLB), and Peacock are spending billions on live sports rights to drive weekly live tune-in and ad revenue.',
    candidateBrief: [
      'Evaluate Pros of Live Sports: Massive concurrent viewership spikes, high-value live ad inventory, reduced subscriber churn (sports fans rarely cancel mid-season), and weekly habitual engagement',
      'Evaluate Cons & Structural Risks: Astronomical bidding rights costs ($2-5B/year with zero long-term IP ownership), ephemeral shelf-life (nobody re-watches a 3-week-old football match), regional rights fragmentation, and technical live streaming concurrent infrastructure strain',
      'Analyze Netflix\'s "Sports Adjacent" Playbook: Sports docuseries (Drive to Survive, Full Swing, Quarterback) creating evergreen IP and global superstars at 1/20th the cost of live rights',
      'Formulate Strategic Decision: Hybrid "Sports Entertainment & Eventization" (WWE Raw, live exhibition matches, Christmas NFL games) vs Bidding on multi-billion season-long leagues'
    ],
    keyEvaluationMetrics: ['Live Sports Rights ROI & Ephemeral Nature', 'Sports Docuseries "Netflix Effect" Leverage', 'Live Ad Monetization Premium', 'Strategic Hybrid Eventization Recommendation'],
    suggestedFramework: 'Strategic Objectives -> Pros vs Cons Matrix -> Financial ROI & Rights Cost Analysis -> Netflix Sports-Adjacent Playbook -> Final Recommendation',
    benchmarkOutline: {
      clarificationQuestions: ['Are we considering global tournament rights (F1/World Cup) or localized domestic leagues (NFL/Premier League)?', 'What is the ad-tier monetization capability for live concurrent streams?'],
      coreHypothesesOrSegments: ['Traditional seasonal sports rights are a margin-destroying trap that transfers all profit to sports leagues and team owners', 'Netflix excels at global storytelling and evergreen catalog building', 'A targeted "Live Eventization" strategy (WWE weekly live, special marquee holiday games, boxing/exhibition) captures live ad revenue without multi-billion league rights lock-in'],
      analyticalPath: ['Compare costs: Premier League rights = $2.5B/yr (expires in 3 years); Drive to Survive docuseries = $30M (evergreen asset that expanded F1\'s global fanbase by 40M people)'],
      synthesisModel: 'Recommendation: DO NOT bid on multi-billion full-season league packages. Execute the "Live Eventization" playbook: acquire high-margin sports entertainment (WWE Raw), select tentpole holiday games (NFL Christmas), and dominate sports storytelling docuseries.'
    }
  },
  {
    id: 'strat-rapid-delivery-path-to-profitability',
    track: 'strategy',
    title: 'Define a path to profitability for a rapid-delivery app',
    company: 'Zepto / Blinkit / Gopuff',
    companyColor: 'bg-purple-700 text-white',
    companyBadge: 'Quick Commerce Unit Economics',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'You are appointed Chief Strategy Officer for a 10-minute quick-commerce grocery delivery platform burning $25M/month across 300 dark stores. Define a concrete 18-month roadmap to reach Dark Store Contribution Margin breakeven and corporate profitability.',
    contextBackground: 'Quick commerce has high customer love and frequency, but suffers from low average order values ($6-$10), high delivery rider costs, real estate dark store rents, and fresh food spoilage.',
    candidateBrief: [
      'Deconstruct Dark Store Order Unit Economics:',
      '- Revenue: Merchant Gross Margin (18-22%) + Delivery/Handling Fees + Brand Advertising Revenue',
      '- Variable Costs: Picker/Packer Labor + Rider Last-Mile Payout + Payment Gateway Fees + Wastage/Spoilage',
      '- Fixed Costs: Dark store rent, utilities, manager salaries, app tech amortized',
      'Identify 4 High-Impact Profitability Levers:',
      '1. AOV Expansion into High-Margin Non-Grocery (Electronics, beauty, pharmacy, festive gifts with 35-50% gross margins)',
      '2. Retail Media Ad Network (Monetizing FMCG brand search placements: 3-5% margin lift)',
      '3. Route Density & Batching (Delivering 2-3 nearby orders per trip during peak hours)',
      '4. Private Label Expansion (Direct sourcing staples and snacks at 45% gross margin)'
    ],
    keyEvaluationMetrics: ['Dark Store Unit Economics Equation', 'AOV Expansion into Non-Grocery Categories', 'Retail Media Advertising Margin Contribution', 'Dark Store Density & Breakeven Throughput'],
    suggestedFramework: 'Unit Economics Deconstruction -> Category Mix Shift (High-Margin Non-Grocery) -> Retail Media Monetization -> Logistics Batching & Density -> 18-Month P&L Roadmap',
    benchmarkOutline: {
      clarificationQuestions: ['What is the current Average Order Value ($8) and daily order throughput per dark store (1,200 orders/day)?', 'What is the current net loss per order (-$1.20)?'],
      coreHypothesesOrSegments: ['You cannot make quick commerce profitable on milk, bread, and bananas alone; category expansion into beauty, toys, and electronics is mandatory', 'FMCG brand advertising on search results provides pure 95% margin revenue', 'Achieving 2,000 orders/day per dark store amortizes fixed rent and picker overhead down to <$0.40/order'],
      analyticalPath: ['Bridge the -$1.20 gap: +$0.50 from higher AOV ($8 to $14), +$0.45 from Retail Media Ads, +$0.35 from private labels, +$0.30 from delivery batching = +$0.40 Net Profit per order'],
      synthesisModel: 'Executive profitability plan: 1) Expand into beauty/electronics to double AOV, 2) Launch an in-app Retail Media Ad Network for FMCG brands (+3.5% margin), 3) Introduce high-margin private label staples, turning unit economics from -$1.20 to +$0.40 positive contribution.'
    }
  },

  // ==========================================
  // 🔴 HARD (10 Questions)
  // ==========================================
  {
    id: 'strat-twitter-x-turnaround-strategy',
    track: 'strategy',
    title: 'You are CEO of Twitter (X). Define the turnaround strategy',
    company: 'X (Twitter)',
    companyColor: 'bg-black text-white',
    companyBadge: 'Executive Turnaround & Super-App',
    difficulty: 'Hard',
    targetDurationMinutes: 30,
    problemStatement: 'You are appointed CEO of X (formerly Twitter). The company has experienced significant brand ad revenue attrition, platform polarization, and heavy debt service obligations. Formulate a bold, 3-year strategic turnaround plan to restore financial sustainability and achieve the "Everyday Everything App" vision.',
    contextBackground: 'X has ~550M monthly active users and unmatched real-time breaking news culture, but historically struggled with ad-tech monetization, creator payouts, and subscription conversions.',
    candidateBrief: [
      'Comprehensive Strategic Assessment: Core Moats (Global real-time public square, breaking news velocity, influential power users) vs Critical Weaknesses (Brand safety advertiser flight, debt load, sub-scale subscription adoption)',
      'Design Three Strategic Turnaround Pillars:',
      '1. Creator Economy & Video Ecosystem: Revenue-share models for video creators, long-form journalism, and live broadcast audio/video spaces',
      '2. Financial Payments & Digital Wallet ("X Money"): P2P transfers, high-yield balance storage, in-app tipping, and creator subscription checkout',
      '3. Enterprise Data & AI Licensing (xAI Grok Integration): Premium API licensing for real-time sentiment analysis and conversational intelligence',
      'Establish financial milestones to achieve positive operating cash flow within 18 months'
    ],
    keyEvaluationMetrics: ['Moat vs Vulnerability Diagnosis', 'Diversification Beyond Brand Display Advertising', 'Fintech / Payments Ecosystem Architecture', 'Grok AI Integration & Enterprise Data Monetization'],
    suggestedFramework: 'Diagnosis & Core Asset Valuation -> Three Strategic Pillars (Creator Video, X Money/Payments, AI/Data) -> Advertiser Rebuilding & Brand Safety -> 3-Year Financial Roadmap',
    benchmarkOutline: {
      clarificationQuestions: ['What is the annual debt service obligation (~$1.2B/year)?', 'How is X Premium subscription conversion trending (<1% of user base)?'],
      coreHypothesesOrSegments: ['Relying solely on traditional Fortune 500 brand display ads is fundamentally broken for X\'s conversational nature', 'Turning X into a video-first platform attracts high-CPM video pre-roll ad budgets and creator loyalty', 'Integrating P2P payments (X Money) creates a sticky financial utility layer modeled on WeChat'],
      analyticalPath: ['Revenue Diversification Target: 40% Performance/Video Ads, 25% Subscriptions & Premium Creator Tiers, 20% Data API & AI Licensing (Grok), 15% Payment Take-Rate Fees'],
      synthesisModel: 'Executive turnaround plan: 1) Rebuild ad revenue through automated small-business performance ads and brand-safety tiers, 2) Launch X Money for P2P payments and creator micro-transactions, 3) Monetize real-time global news data via Grok AI enterprise APIs to achieve $4B+ diversified ARR.'
    }
  },
  {
    id: 'strat-microsoft-acquire-discord-fit',
    track: 'strategy',
    title: 'Should Microsoft acquire Discord? Valuation and strategic fit',
    company: 'Microsoft',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Strategic M&A & Community Moat',
    difficulty: 'Hard',
    targetDurationMinutes: 30,
    problemStatement: 'Microsoft evaluated acquiring Discord for ~$10-12 Billion. Conduct a senior executive analysis on the strategic synergies, consumer ecosystem fit (Xbox / Game Pass), valuation multiples, and integration risks. Recommend whether Microsoft should proceed or walk away.',
    contextBackground: 'Discord has 150M+ MAUs, dominant presence among Gen-Z gamers, web3 communities, and software developers, with rich voice/video infrastructure and Nitro subscriptions.',
    candidateBrief: [
      'Strategic Synergies & Rationale:',
      '- Consumer & Gaming Ecosystem: Instant community bridge for Xbox Game Pass, cloud gaming social hubs, and cross-platform multiplayer voice',
      '- Developer & AI Communities: Dominant home for AI builders (Midjourney operates on Discord), software engineers, and student coders',
      '- Azure Infrastructure Synergies: Migrating Discord\'s massive WebRTC voice/video bandwidth from Google Cloud to Microsoft Azure',
      'Integration Risks & Anti-Synergies:',
      '- Community Backlash: Gamers distrust big tech conglomerates (Skype post-acquisition precedent)',
      '- Nitro Monetization vs Enterprise Teams Cannibalization',
      'Deliver a definitive Strategic Verdict with valuation sanity check'
    ],
    keyEvaluationMetrics: ['Xbox & Game Pass Community Synergy', 'Azure Infrastructure Cost Reductions', 'Community Backlash & Brand Culture Preservation', 'Valuation & Strategic Alternative Analysis'],
    suggestedFramework: 'Strategic Rationale & Synergies -> Azure & Xbox Integration Opportunities -> Culture & Community Risks -> Valuation Sanity Check -> Final M&A Verdict',
    benchmarkOutline: {
      clarificationQuestions: ['Would Discord remain an independently operated subsidiary (like GitHub/LinkedIn) or be integrated into Xbox/Teams?', 'What is Discord\'s annual revenue ($500M+) and valuation multiple?'],
      coreHypothesesOrSegments: ['Discord provides Microsoft with the missing Gen-Z consumer social graph that it failed to build organically', 'Preserving Discord\'s open, cross-platform brand (accessible on PlayStation, mobile, web) is critical; forcing Microsoft account logins would destroy user trust', 'Migrating Discord to Azure yields hundreds of millions in infrastructure margin savings'],
      analyticalPath: ['Financial check: $10B price tag on $500M revenue = 20x forward revenue; justified by unique Gen-Z social graph moat and Game Pass bundle synergies if operated with complete autonomy like GitHub'],
      synthesisModel: 'Recommendation: PROCEED WITH ACQUISITION under the "GitHub/LinkedIn Autonomy Model". Keep Discord open, cross-platform (including PlayStation support), bundle Discord Nitro with Xbox Game Pass Ultimate, and migrate backend traffic to Azure to unlock $300M+ in annual cloud savings.'
    }
  },
  {
    id: 'strat-traditional-bank-compete-defi',
    track: 'strategy',
    title: 'Design a strategy for a traditional bank to compete with DeFi',
    company: 'JPMorgan Chase / Citigroup',
    companyColor: 'bg-blue-900 text-white',
    companyBadge: 'Fintech & Web3 Strategy',
    difficulty: 'Hard',
    targetDurationMinutes: 30,
    problemStatement: 'Decentralized Finance (DeFi) protocols, stablecoins, and tokenized real-world assets (RWAs) are challenging traditional commercial banks on cross-border payments, 24/7 instant settlement, and liquidity yields. Define a 5-year strategy for a top-3 global commercial bank to defend and lead in digital asset infrastructure.',
    contextBackground: 'Cross-border wire transfers on legacy SWIFT take 2-3 business days with 3-5% correspondent banking fees; stablecoins settle in seconds for fractions of a cent.',
    candidateBrief: [
      'Analyze the Structural Disruption: T+2 settlement latency, weekend banking closures, foreign exchange markups vs 24/7 programmable instant stablecoin settlement',
      'Evaluate Bank\'s Defensible Moats: Regulatory compliance (KYC/AML), FDIC deposit insurance, institutional scale ($3T balance sheet), trust, and corporate treasury client relationships',
      'Architect Four Strategic Pillars:',
      '1. Institutional Permissioned Blockchain & Deposit Tokens (e.g. JPM Coin for instant 24/7 multi-currency corporate settlement)',
      '2. Tokenized Real-World Assets (Tokenizing US Treasuries, commercial real estate, and money market funds for instant collateralization)',
      '3. Regulated Digital Asset Custody & Prime Brokerage for institutional hedge funds and ETFs',
      '4. Programmable Treasury Smart Contracts for automated corporate supplier escrow payouts'
    ],
    keyEvaluationMetrics: ['DeFi vs TradFi Structural Economics', 'Institutional Trust & Regulatory Moats', 'Deposit Tokens vs Public Stablecoins', '5-Year Commercial Roadmap'],
    suggestedFramework: 'Disruption Threat Assessment -> TradFi Moats & Institutional Assets -> Strategic Pillars (Deposit Tokens, Tokenized RWAs, Custody) -> Regulatory Governance & Roadmap',
    benchmarkOutline: {
      clarificationQuestions: ['Are we targeting institutional corporate clients (B2B treasury) or retail consumer banking?', 'Is the bank developing on public blockchains (Ethereum/Polygon) or permissioned private subnets?'],
      coreHypothesesOrSegments: ['Do not fight public crypto on retail speculation; win institutional corporate treasury cross-border settlements', 'Deposit Tokens issued by regulated banks offer legal certainty and yield that unbacked stablecoins cannot match', 'Tokenizing commercial paper and money market funds unlocks $100B+ in instant 24/7 liquidity'],
      analyticalPath: ['Cross-border wholesale settlements represent $150 Trillion annually; capturing 2% of settlement velocity on institutional deposit tokens saves corporate clients $4B in trapped float capital'],
      synthesisModel: 'Executive strategy: Lead the institutional tokenization revolution: 1) Scale Bank Deposit Tokens for 24/7 instant corporate cross-border settlement, 2) Tokenize US Treasury and money market collateral, and 3) Build regulated institutional custody to anchor corporate balance sheets in the digital asset era.'
    }
  },
  {
    id: 'strat-ai-existential-threat-google-search',
    track: 'strategy',
    title: 'Evaluate the existential threat of AI to Google Search. Strategy to mitigate?',
    company: 'Google / Alphabet',
    companyColor: 'bg-red-500 text-white',
    companyBadge: 'AI Paradigm Shift & Core Defense',
    difficulty: 'Hard',
    targetDurationMinutes: 30,
    problemStatement: 'Conversational LLMs and AI Answer Engines (ChatGPT Search, Perplexity, Claude) directly answer user questions, threatening Google\'s fundamental business model: the 10 blue links and keyword cost-per-click (CPC) search ad auctions. Evaluate this existential threat and define Google\'s survival and counter-offensive strategy.',
    contextBackground: 'Google generates >$175 Billion annually from Search Advertising. Generative AI answers have significantly higher inference compute costs and reduce link clicks to publisher/sponsored websites.',
    candidateBrief: [
      'Deconstruct the Innovator\'s Dilemma:',
      '- Legacy Search: User searches -> Clicks 10 blue links / Sponsored Ads -> Google charges $2.50 CPC -> Query compute cost is $0.0005',
      '- Conversational AI: User asks question -> LLM synthesizes single direct answer -> Zero link clicks -> Query compute cost is $0.01 (20x higher compute, zero ad click real estate)',
      'Identify Google\'s Defensible Assets: Real-time web index fresh within seconds, massive Google Shopping merchant graph, local business listings (Maps), and unmatched Android/Chrome distribution',
      'Architect the Next-Gen Search Strategy:',
      '1. AI Overviews with Embedded Commercial Shopping Ads & Action Buttons',
      '2. Shift from "Keywords" to "Agentic Task Fulfillment" (Booking travel, purchasing items directly with Google Pay take-rate)',
      '3. Custom TPU Silicon (v5p/v6) to reduce AI inference costs by 10x'
    ],
    keyEvaluationMetrics: ['Innovator\'s Dilemma Unit Economics Breakdown', 'Inference Compute Cost vs Ad Monetization Dynamics', 'Google Distribution & Data Moats (Shopping/Maps/Android)', 'Agentic Action Engine Transformation'],
    suggestedFramework: 'The Innovator\'s Dilemma Anatomy -> Unit Economics of AI vs CPC Search -> Google Structural Assets & Moats -> Strategic Counter-Offensive Roadmap',
    benchmarkOutline: {
      clarificationQuestions: ['How is user behavior shifting between informational queries (e.g. "how to fix a pipe") vs commercial transactional queries (e.g. "buy running shoes")?', 'What is the inference cost trajectory on custom TPU hardware?'],
      coreHypothesesOrSegments: ['80% of Google Search ad revenue comes from commercial and transactional queries (travel, finance, retail, insurance), not generic informational queries', 'Conversational AI struggles with real-time merchant inventory and local business data where Google is unassailable', 'Google must evolve from an "Information Retrieval Engine" to an "Agentic Action Execution Platform"'],
      analyticalPath: ['Monetization transformation: Replace keyword ads with "Sponsored AI Recommendations" and native "1-Click Checkout" commissions, turning search from a directory into a commerce marketplace'],
      synthesisModel: 'Executive strategy: Evolve Google Search into an Agentic Action Platform. Protect commercial queries with rich AI Overviews featuring native 1-click checkout commissions, leverage custom TPU silicon to crush inference costs, and deploy unmatched Android/Chrome distribution.'
    }
  },
  {
    id: 'strat-apple-buy-disney-mega-merger',
    track: 'strategy',
    title: 'Should Apple buy Disney? Analyze the mega-merger',
    company: 'Apple / Disney',
    companyColor: 'bg-zinc-800 text-white',
    companyBadge: 'Mega-Merger & Ecosystem Strategy',
    difficulty: 'Hard',
    targetDurationMinutes: 30,
    problemStatement: 'Wall Street analysts frequently speculate about Apple acquiring The Walt Disney Company for ~$200-220 Billion. As Head of Corporate Development for Apple, conduct an unsparing strategic, financial, and cultural evaluation of this hypothetical mega-merger.',
    contextBackground: 'Apple has $160B+ in cash flow generation and Apple TV+ / Vision Pro, while Disney owns premier global storytelling IP (Marvel, Star Wars, Pixar, Disney Animation, ESPN) and Theme Parks.',
    candidateBrief: [
      'Strategic Synergies & Rationale:',
      '- IP & Content Library: Disney IP gives Apple TV+ instant global scale to challenge Netflix and creates immersive spatial 3D content for Apple Vision Pro',
      '- Services Ecosystem Flywheel: Bundling Disney+ with Apple One to supercharge recurring services revenue across 2 billion active Apple devices',
      'Severe Strategic Mismatches & Liabilities:',
      '- Asset-Heavy Physical Operations: Theme parks, cruise lines, and retail stores bring high union labor costs, physical maintenance liabilities, and seasonal volatility that dilute Apple\'s 45% gross margins',
      '- Legacy Cable TV Decline: Linear television networks (ABC, ESPN linear) are in structural terminal secular decline',
      '- Cultural Antitrust Nightmare: Extreme regulatory opposition globally for an unprecedented tech-media monopoly',
      'Deliver a definitive Acquisition Verdict'
    ],
    keyEvaluationMetrics: ['Apple Services & Vision Pro Synergies', 'Asset-Heavy Theme Parks & Linear Cable Liabilities', 'Gross Margin Dilution & Operating Complexity', 'Definitive Corporate Strategy Recommendation'],
    suggestedFramework: 'Strategic Rationale & Content Synergies -> Financial & Margin Dilution Analysis -> Asset-Heavy Physical Liabilities -> Regulatory Blockers -> Definitive M&A Decision',
    benchmarkOutline: {
      clarificationQuestions: ['Would Apple spin off the theme parks and linear TV networks and acquire purely the IP/Studio assets?', 'What is Apple\'s historical M&A philosophy (Apple\'s largest deal was Beats at $3B)?'],
      coreHypothesesOrSegments: ['Apple is a high-margin consumer hardware and digital services company; running theme parks, cruise ships, and hotel resorts completely contradicts Apple\'s operational DNA', 'Disney\'s $45B linear TV and theme park infrastructure will severely dilute Apple\'s return on invested capital (ROIC)', 'Apple can license Disney content for Vision Pro and Apple TV+ without buying the entire conglomerate'],
      analyticalPath: ['Apple M&A philosophy focuses on small, bolt-on technology acquisitions; buying Disney for $200B creates catastrophic regulatory scrutiny and management distraction'],
      synthesisModel: 'Recommendation: DECISIVE NO-GO. Buying Disney introduces massive physical asset liabilities, dilutes gross margins, and violates Apple\'s operational discipline. Instead, execute long-term multi-billion spatial content licensing partnerships for Vision Pro and Apple TV+.'
    }
  },
  {
    id: 'strat-us-fintech-southeast-asia-expansion',
    track: 'strategy',
    title: 'Set the expansion strategy for a US fintech into Southeast Asia',
    company: 'Stripe / Square',
    companyColor: 'bg-indigo-600 text-white',
    companyBadge: 'International Expansion & Payments',
    difficulty: 'Hard',
    targetDurationMinutes: 30,
    problemStatement: 'You are Head of Global Expansion for a tier-1 US payment gateway/fintech platform (like Stripe). Define the market entry, regulatory licensing, and product localization strategy across Southeast Asia (Indonesia, Vietnam, Philippines, Singapore, Thailand, Malaysia).',
    contextBackground: 'Southeast Asia has 680M people, booming digital commerce, but low credit card penetration (<10% in Indonesia/Philippines) and highly fragmented local payment methods (e-wallets, QRIS, bank transfers, COD).',
    candidateBrief: [
      'Market Archetype Segmentation:',
      '- Developed Financial Hubs (Singapore): High credit card adoption, cross-border corporate treasury, regional headquarters',
      '- High-Growth Emerging Markets (Indonesia, Vietnam, Philippines): Mobile-first e-wallets (GoPay, OVO, GCash, MoMo), national QR standards (QRIS), and real-time bank transfers',
      'Regulatory & Licensing Strategy: Direct central bank payment licenses vs Acquiring local licensed PSPs vs Sponsoring through local tier-1 banks',
      'Product Architecture: Dynamic payment orchestration routing, real-time localized currency settlement, fraud detection calibrated for emerging market fraud rings, and offline-to-online cash collection integrations',
      'Build a 3-Year Market Entry Roadmap'
    ],
    keyEvaluationMetrics: ['Payment Method Fragmentation Analysis (QR/Wallets vs Cards)', 'Regulatory Licensing Navigation across 6 Jurisdictions', 'Local PSP Acquisition vs Greenfield Build', '3-Year Regional Revenue Roadmap'],
    suggestedFramework: 'Regional Macro & Payment Rails Segmentation -> Regulatory & Licensing Strategy -> Product Localization & API Architecture -> GTM & Commercial Partnerships',
    benchmarkOutline: {
      clarificationQuestions: ['Are we targeting global enterprise merchants selling into Southeast Asia or local domestic SMBs?', 'Are we acquiring local licensed payment gateways (e.g. Midtrans model) or applying for greenfield licenses?'],
      coreHypothesesOrSegments: ['Treating Southeast Asia as a monolithic market is a fatal mistake; each country has distinct central bank regulations and dominant local payment rails', 'Credit cards represent <15% of checkout volume; integrating local digital wallets (GCash, GoPay, MoMo) and national QR networks is mandatory for conversion', 'Target global tech giants (Shopify, Amazon, Airbnb) expanding into SEA as the initial high-volume anchor merchants'],
      analyticalPath: ['Phase 1: Singapore HQ + direct integration of top 12 regional e-wallets/QR systems; Phase 2: Acquire top domestic PSP in Indonesia to secure local clearing licenses; Phase 3: Launch SMB self-serve billing across all 6 countries'],
      synthesisModel: 'Executive expansion strategy: 1) Anchor regional operations in Singapore targeting global enterprise cross-border checkouts, 2) Acquire a local licensed PSP in Indonesia to fast-track regulatory compliance, 3) Integrate all native QR and mobile wallet rails (QRIS, GCash, MoMo) into a single unified API.'
    }
  },
  {
    id: 'strat-slack-response-teams-free-bundling',
    track: 'strategy',
    title: 'Teams is bundling for free. You are Slack\'s CEO. What is your response?',
    company: 'Slack / Salesforce',
    companyColor: 'bg-purple-700 text-white',
    companyBadge: 'Anti-Bundling & Enterprise Strategy',
    difficulty: 'Hard',
    targetDurationMinutes: 30,
    problemStatement: 'Microsoft is bundling Microsoft Teams for "free" with Microsoft 365 enterprise licenses (300M+ corporate seats), offering enterprise CIOs an irresistible cost-consolidation pitch to rip out paid Slack. As CEO of Slack (within Salesforce), define your comprehensive counter-strategy to defend your enterprise base and accelerate growth.',
    contextBackground: 'Slack has unmatched end-user love, 2,600+ app integrations, and developer culture, but CFOs and CIOs face intense pressure to eliminate duplicate $12/user/month software costs.',
    candidateBrief: [
      'Strategic Vulnerability & Asset Diagnosis:',
      '- Microsoft Moat: Zero marginal price bundle with Word/Excel/Exchange, single enterprise billing, IT department familiarity',
      '- Slack Superpowers: Superior UX/developer ergonomics, massive multi-company collaboration (Slack Connect), deep bidirectional app integration ecosystem (Salesforce, Jira, GitHub, Workday), and open API platform',
      'Formulate a 4-Pillar Counter-Offensive Strategy:',
      '1. Slack Connect as an Inter-Company Network Effect (Companies cannot use Teams to talk to external partners/clients seamlessly; Slack Connect is the cross-company communication graph)',
      '2. The Autonomous Enterprise "Action Platform" (Evolve Slack from a chat room into the Conversational UI for Salesforce CRM and AI Agents)',
      '3. Legal & Regulatory Pressure (Antitrust unbundling complaints with the EU Commission and US FTC)',
      '4. Enterprise Packaging & Salesforce Unified Discount Bundling'
    ],
    keyEvaluationMetrics: ['The Bundling Paradox & CIO Procurement Dynamics', 'Slack Connect Cross-Company Network Effect', 'Salesforce AI & CRM Deep Integration Moat', 'Antitrust Regulatory Strategy'],
    suggestedFramework: 'Threat Diagnosis (CIO Procurement vs End-User Love) -> Network Effect Moats (Slack Connect) -> System of Action Transformation (Salesforce Agentforce) -> Commercial & Legal Levers',
    benchmarkOutline: {
      clarificationQuestions: ['Did the European Commission recently mandate Microsoft to unbundle Teams from Office 365?', 'How does Slack Connect adoption correlate with enterprise account retention (Slack Connect accounts have 99%+ retention)?'],
      coreHypothesesOrSegments: ['Do not fight Microsoft on commoditized 1-to-1 internal chat; win on cross-company collaboration (Slack Connect) and automated business workflows', 'Slack Connect creates a multi-tenant B2B social network that Microsoft Teams cannot break', 'Embed Salesforce AI agents directly into Slack channels so Slack becomes the operating interface for all corporate work'],
      analyticalPath: ['Enterprise retention data shows: Accounts with 10+ Slack Connect external partner channels have a 99.4% renewal rate because migrating to Teams breaks their external client communication'],
      synthesisModel: 'Executive counter-strategy: 1) Scale Slack Connect into the unassailable cross-company B2B network graph, 2) Position Slack as the conversational interface for Salesforce AI agents and enterprise apps, 3) Aggressively enforce regulatory antitrust unbundling worldwide.'
    }
  },
  {
    id: 'strat-metaverse-viability-meta-longterm',
    track: 'strategy',
    title: 'Assess the strategic viability of the Metaverse for Meta long-term',
    company: 'Meta',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Long-Horizon Tech Strategy',
    difficulty: 'Hard',
    targetDurationMinutes: 30,
    problemStatement: 'Meta has invested over $50 Billion into Reality Labs (Quest VR headsets, Ray-Ban smart glasses, Horizon Worlds). Evaluate the strategic, technological, and commercial viability of this long-term bet. Should Meta continue full funding, pivot, or scale down?',
    contextBackground: 'Mark Zuckerberg initiated the metaverse pivot to escape Apple/Google mobile OS platform gatekeepers (which cost Meta $10B+ after Apple App Tracking Transparency).',
    candidateBrief: [
      'Strategic Motivation Diagnosis: The existential need to own the next computing platform and eliminate the "Apple/Google platform tax" on Meta\'s advertising ecosystem',
      'Technology & Form Factor Assessment:',
      '- Immersive VR Headsets (Quest 3/Pro): Bulky, isolation barrier, limited to gaming, fitness, and niche enterprise training',
      '- AI-Powered Smart Glasses (Ray-Ban Meta): Massive commercial breakout success, fashionable all-day wearability, natural multimodal AI interface',
      '- Full Spatial AR Glasses (Project Orion): Long-term future, optical waveguide manufacturing hurdles',
      'Strategic Recommendation: Pivot Reality Labs resource allocation from VR virtual worlds (Horizon) to AI Smart Glasses and Multimodal Wearables'
    ],
    keyEvaluationMetrics: ['Platform Independence Strategic Motivation', 'VR vs AI Smart Glasses Product-Market Fit', 'Reality Labs Financial Burn vs Advertising Cash Flow', 'Strategic Capital Reallocation Framework'],
    suggestedFramework: 'Strategic Rationale (Platform Freedom) -> Technology Modality Audit (VR vs AI Glasses vs True AR) -> Commercial PMF & Traction -> Resource Reallocation Recommendation',
    benchmarkOutline: {
      clarificationQuestions: ['What is the current annual burn of Reality Labs (~$15B/year)?', 'How has consumer adoption of Ray-Ban Meta smart glasses compared to VR headsets (Smart glasses grew 300% YoY)?'],
      coreHypothesesOrSegments: ['The original vision of 3D virtual avatars in "Horizon Worlds" has weak consumer PMF and high friction', 'AI Smart Glasses (Ray-Ban Meta) unexpectedly found massive product-market fit as the ultimate hands-free camera and conversational AI companion', 'Owning the next computing platform is still valid, but the winning form factor is AI Smart Glasses, not VR goggles'],
      analyticalPath: ['Reallocate 60% of Reality Labs R&D budget from VR software to AI Glass hardware engineering, display waveguides, and on-device multimodal AI'],
      synthesisModel: 'Recommendation: PIVOT, DO NOT ABANDON. Reallocate the majority of the $15B annual budget away from bulky VR avatars into AI-Powered Smart Glasses (Ray-Ban Meta & Orion), securing the next computing platform through fashionable, all-day wearable AI.'
    }
  },
  {
    id: 'strat-amazon-spin-off-aws',
    track: 'strategy',
    title: 'Should Amazon spin off AWS into a separate entity?',
    company: 'Amazon / AWS',
    companyColor: 'bg-amber-600 text-white',
    companyBadge: 'Corporate Restructuring & Antitrust',
    difficulty: 'Hard',
    targetDurationMinutes: 30,
    problemStatement: 'Activision investors and antitrust regulators frequently debate whether Amazon should spin off Amazon Web Services (AWS) as an independent publicly traded company. Conduct an executive strategic, financial, and competitive analysis. Recommend whether Amazon should spin off AWS or keep it integrated.',
    contextBackground: 'AWS generates ~$100B+ ARR and the vast majority of Amazon\'s operating income (~65-70%), cross-subsidizing retail e-commerce logistics, Prime Video, and hardware experiments.',
    candidateBrief: [
      'Strategic Synergies & Reasons to Keep AWS Integrated:',
      '- Free Cash Flow Engine: AWS operating cash flow finances massive multi-billion global warehouse logistics and AI infrastructure buildouts',
      '- Enterprise Customer Trust in Retail: Amazon Retail is AWS\'s ultimate Tier-0 stress test and reference customer',
      '- Shared Infrastructure & Silicon Innovation: Graviton CPU and Trainium AI chip investments scaled across both retail and cloud',
      'Strategic Arguments in Favor of a Spin-off:',
      '- Eliminating Competitor Hesitation: Retail giants (Walmart, Target, Home Depot) refuse to use AWS because it finances their retail rival Amazon',
      '- Multiple Expansion & Shareholder Value: Independent AWS could trade at pure-play SaaS/Cloud multiples (25-30x EBITDA)',
      '- Antitrust Shield: Preempts regulatory break-up lawsuits from the FTC and EU',
      'Deliver a definitive Strategic Verdict'
    ],
    keyEvaluationMetrics: ['Cash Flow Cross-Subsidization Mechanics', 'Retail Competitor Cloud Adoption Barriers (Walmart/Target)', 'Antitrust Preemption vs Capital Allocation Efficiency', 'Definitive Corporate Governance Decision'],
    suggestedFramework: 'Strategic Synergies & Cross-Subsidization -> Arguments for Independence (Valuation Multiples, Retail Competitor Friction) -> Capital Allocation & AI Capex Realities -> Final Recommendation',
    benchmarkOutline: {
      clarificationQuestions: ['How much capital expenditure is required for the ongoing AI data center buildout ($50B+ annually)?', 'Would a standalone AWS have higher or lower credit rating and borrowing capacity?'],
      coreHypothesesOrSegments: ['The AI arms race requires unprecedented capital expenditure ($50-75B/year in data centers and GPUs); Amazon\'s consolidated balance sheet is a massive competitive advantage against standalone cloud providers', 'The retail customer conflict (Walmart avoiding AWS) is real but already factored into AWS\'s $100B scale', 'Keeping AWS integrated maximizes long-term shareholder value during the AI infrastructure boom'],
      analyticalPath: ['Consolidated cash flow from Amazon Retail advertising and marketplace operations provides the critical capital cushion to fund AWS\'s massive multi-gigawatt AI data center expansion'],
      synthesisModel: 'Recommendation: DO NOT SPIN OFF AWS. In the capital-intensive AI infrastructure era, AWS needs Amazon\'s massive consolidated balance sheet and cash flows to fund $60B+ annual data center CapEx. Maintain an integrated powerhouse.'
    }
  },
  {
    id: 'strat-waymo-5yr-strategic-roadmap',
    track: 'strategy',
    title: 'Create a strategic roadmap for Waymo (Self-driving) for the next 5 years',
    company: 'Waymo / Alphabet',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Autonomous Mobility & Commercial Scale',
    difficulty: 'Hard',
    targetDurationMinutes: 30,
    problemStatement: 'Waymo has proven its Level-4 autonomous driving technology safety in Phoenix, San Francisco, and Los Angeles (surpassing 100,000 paid commercial rides/week). As Head of Commercial Strategy, build Waymo\'s 5-year strategic roadmap to scale from a regional robotaxi operator into a globally profitable autonomous mobility and logistics powerhouse.',
    contextBackground: 'Competitors like Cruise faced regulatory pauses, while Tesla is pursuing a vision-only camera approach. Waymo utilizes redundant LiDAR, radar, and sensor suites on custom vehicle platforms (Jaguar I-PACE, Zeekr).',
    candidateBrief: [
      'Phase 1 (Years 1-2): Operational City Density & Sensor Cost Reduction:',
      '- Scale commercial density in top 10 US metro markets (Austin, Miami, Atlanta with Uber partnership)',
      '- Deploy 6th-Generation Waymo Driver: Slashes hardware and sensor costs by 50% while operating in snow and rain',
      'Phase 2 (Years 2-3): Asset-Light Platform Partnerships (Uber & Fleet Operators):',
      '- Shift from owning/maintaining entire vehicle fleets to partnering with third-party fleet managers (Uber, rental agencies) who handle charging, cleaning, and depot maintenance',
      'Phase 3 (Years 4-5): Multi-Vertical Expansion (Autonomous Trucking Freight & Licensing):',
      '- Commercialize Waymo Via for Class-8 highway trucking logistics corridors',
      '- License Waymo Driver OS to global automotive OEMs for personal consumer autonomous vehicles'
    ],
    keyEvaluationMetrics: ['Unit Economics: Cost per Autonomous Mile vs Human Driver', 'Asset-Heavy Fleet Ownership vs Asset-Light Fleet Management Partnerships', 'Sensor Suite Cost Reduction Trajectory', 'Multi-Vertical Expansion (Robotaxi -> Freight -> OEM Licensing)'],
    suggestedFramework: 'Current Technological Advantage -> Unit Economics per Mile -> 3-Phase 5-Year Roadmap (Metro Density -> Fleet Partner Model -> Freight/Licensing) -> Regulatory & Safety Moat',
    benchmarkOutline: {
      clarificationQuestions: ['What is the target cost per autonomous vehicle mile ($0.50/mile vs human Uber $2.00/mile)?', 'Is Waymo manufacturing its own custom vehicles or integrating onto OEM platforms (Zeekr/Geely)? (OEM platforms).'],
      coreHypothesesOrSegments: ['Waymo has won the L4 safety credibility race; the battle is now purely about hardware cost reduction and fleet operations scaling', 'Waymo should not become an asset-heavy car maintenance company; it must transition to the "Android of Autonomous Driving"', 'Partnering with Uber for demand dispatch accelerates customer acquisition without burning marketing cash'],
      analyticalPath: ['Economics modeling: 6th-Gen sensor suite drops vehicle cost from $150k to $60k; at 18 hours/day utilization, each Waymo generates $65k in annual gross profit, achieving payback in 14 months'],
      synthesisModel: 'Executive 5-year roadmap: 1) Scale to top 15 US metros with 6th-Gen low-cost sensor suites, 2) Transition to an asset-light fleet management partnership with Uber and rental operators, 3) Expand into Class-8 highway trucking (Waymo Via) to unlock global $10B+ high-margin ARR.'
    }
  }
];
