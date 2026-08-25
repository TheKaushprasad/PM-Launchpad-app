import { InterviewScenario } from '../../types/interview';

export const RCA_SCENARIOS: InterviewScenario[] = [
  // ==========================================
  // 🟢 EASY (10 Questions)
  // ==========================================
  {
    id: 'rca-dau-drop-5',
    track: 'rca',
    title: 'A key product metric (DAU) suddenly drops by 5%',
    company: 'Meta',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Social Network',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'You are a PM on a flagship consumer social app. Your primary health metric, Daily Active Users (DAU), suddenly dropped by 5% yesterday. Investigate the cause.',
    contextBackground: 'The alert triggered during the daily morning executive sync. Weekly active users (WAU) are relatively stable over the 7-day trailing window.',
    candidateBrief: [
      'Clarify metric definition (what counts as an active user: session open vs passive background sync)',
      'Segment by Platform (iOS, Android, Web), Geography, App Version, and Network Carrier',
      'Check internal releases, auth outages, logging/telemetry bugs, and app store updates',
      'Examine external factors: holidays, regional internet outages, competitor events',
      'Propose immediate triage and telemetry validation steps'
    ],
    keyEvaluationMetrics: ['DAU / WAU Ratio', 'Crash Rate', 'Login Success Rate', 'Telemetry Pipeline Health', 'Session Duration'],
    suggestedFramework: 'Clarify Metric & Bounds -> Segment by Dimensions -> Internal (Release/Telemetry/Infra) vs External -> Root Cause Confirmation -> Action Plan',
    benchmarkOutline: {
      clarificationQuestions: ['Is this drop global or localized?', 'Did sessions/events also drop or just unique user IDs?', 'Was there a deployment in the last 24-48 hours?'],
      coreHypothesesOrSegments: ['Telemetry logging pipeline latency', 'Auth token expiry bug in latest app build', 'Android OS version update causing crash on launch'],
      analyticalPath: ['Check logging dashboard health', 'Segment by OS version -> isolate Android v14.2 spike in crash rate', 'Identify bad null-pointer in feed initialization'],
      synthesisModel: 'Executive summary: 5% DAU dip isolated to Android v14.2 release crash loop affecting 1.2M users; rolled back release and deployed hotfix within 2 hours.'
    }
  },
  {
    id: 'rca-signups-flat-wow',
    track: 'rca',
    title: 'Sign-ups for your app are flat week-on-week',
    company: 'Notion',
    companyColor: 'bg-zinc-800 text-white',
    companyBadge: 'Productivity SaaS',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'After 6 months of 8% week-on-week organic sign-up growth, total weekly sign-ups for your productivity app suddenly flattened (0% growth WoW). Diagnose the stall.',
    contextBackground: 'Marketing ad spend is unchanged. Web traffic and app store impressions appear normal, but top-of-funnel account creation velocity plateaued.',
    candidateBrief: [
      'Segment by acquisition channel (Organic Search, Paid Ads, Referrals, Direct)',
      'Analyze the Sign-up Funnel: Landing Page -> CTA Click -> Auth Provider (Google/Apple/Email) -> Verification -> Workspace Creation',
      'Check SEO traffic shifts, paid acquisition CAC saturation, and referral link degradation',
      'Identify bottlenecks in auth third-party SSO or email delivery rates'
    ],
    keyEvaluationMetrics: ['Organic Sign-up Velocity', 'Landing Page Conversion Rate', 'SSO Auth Success Rate', 'Email Verification Rate'],
    suggestedFramework: 'Acquisition Channels -> Funnel Step-by-Step Dropoff -> Technical / Auth Integrations -> Market Saturation / Seasonality',
    benchmarkOutline: {
      clarificationQuestions: ['Did traffic volume flatten or did conversion rate drop?', 'Is the plateau across all countries or specific geos?'],
      coreHypothesesOrSegments: ['Google SSO rate limiting / consent screen error', 'Email verification OTP deliverability degradation', 'Paid marketing channel hitting audience saturation'],
      analyticalPath: ['Trace sign-up funnel by auth method', 'Isolate Email Sign-ups: OTP deliverability dropped from 98% to 74% due to spam filter blacklisting', 'Verify Google/Apple SSO remained steady at 85% conversion'],
      synthesisModel: 'Deliverability issue identified on transactional email IP domain; migrated to dedicated backup SES pool to restore 8% WoW growth trajectory.'
    }
  },
  {
    id: 'rca-web-conversion-dip',
    track: 'rca',
    title: 'Website conversion rate (Visit -> Sign-up) has dipped slightly',
    company: 'Canva',
    companyColor: 'bg-cyan-600 text-white',
    companyBadge: 'Design SaaS',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'The web visitor-to-signup conversion rate for your web app dipped from 12.5% to 11.1% over the past 10 days. Identify why.',
    contextBackground: 'Total web visitors increased by 14% over the same period, but total sign-ups remained flat.',
    candidateBrief: [
      'Calculate whether the dip is conversion-driven or top-of-funnel traffic mix shift',
      'Segment traffic sources (High-intent Organic vs Low-intent Display/Social Ads vs Direct)',
      'Examine landing page performance, page load speed, and responsive layout across devices (Mobile Web vs Desktop)',
      'Evaluate recent A/B copy tests or pricing page updates'
    ],
    keyEvaluationMetrics: ['Visitor -> Sign-up %', 'Traffic Quality by Channel', 'Mobile vs Desktop Conversion', 'LCP / Core Web Vitals'],
    suggestedFramework: 'Traffic Quality Mix Shift vs True Funnel Degradation -> Device / Browser Breakdown -> Page Speed & UX Changes',
    benchmarkOutline: {
      clarificationQuestions: ['Did the mix of traffic sources change?', 'Is the conversion drop on Mobile or Desktop?'],
      coreHypothesesOrSegments: ['Traffic mix diluted by low-intent TikTok ad campaign', 'Mobile web viewport bug blocking the sticky CTA button', 'Page load latency increased by 1.8s due to unoptimized hero banner asset'],
      analyticalPath: ['Break down traffic by source: Paid Social traffic doubled with 2% conversion, diluting overall average', 'Organic conversion rate remained completely unchanged at 12.6%'],
      synthesisModel: 'Identified Simpson\'s Paradox: overall conversion dipped purely due to a high-volume low-intent paid social campaign; organic conversion is healthy.'
    }
  },
  {
    id: 'rca-wrong-item-support-tickets',
    track: 'rca',
    title: 'Customer support tickets for “wrong item delivered” increased',
    company: 'Amazon',
    companyColor: 'bg-amber-600 text-white',
    companyBadge: 'E-Commerce',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Customer support tickets categorized as "Wrong Item Delivered" surged by 35% over the past two weeks. Investigate the operational or technical failure.',
    contextBackground: 'Returns and refund requests are clustering around specific product categories in 3 fulfillment centers.',
    candidateBrief: [
      'Clarify timeline and geographic concentration of affected orders',
      'Segment by Fulfillment Center (FC), Product Category, Seller Type (1P vs 3P Marketplace), and Barcode/SKU mapping',
      'Investigate warehouse picking software updates, barcode scanner glitches, and multi-pack bundling errors',
      'Synthesize root cause and preventative SOP safeguards'
    ],
    keyEvaluationMetrics: ['Wrong Item Rate (% of Orders)', 'Return Authorization Rate', 'Warehouse Picking Accuracy', 'Support Ticket Volume by Category'],
    suggestedFramework: 'Geographic & Fulfillment Center Segmentation -> SKU / Barcode Mapping -> Warehouse Picking Workflow -> Seller Catalog Errors',
    benchmarkOutline: {
      clarificationQuestions: ['Is this across all warehouses or specific facilities?', 'Are specific SKUs or categories overrepresented?'],
      coreHypothesesOrSegments: ['Barcode collision on newly imported vendor SKUs', 'Warehouse sorting conveyor optical scanner calibration error', 'Third-party seller mislabeling ASIN barcodes during inbound FBA'],
      analyticalPath: ['Isolate 80% of wrong item tickets to 2 fulfillment centers in Midwest', 'Trace back to a barcode scanner firmware patch that truncated leading zeros on UPC barcodes'],
      synthesisModel: 'Firmware bug in FC optical scanners caused UPC truncation and misdirected picking bins; patched firmware and audited bin inventory.'
    }
  },
  {
    id: 'rca-push-ctr-decline',
    track: 'rca',
    title: 'Push notification click-through rate has declined recently',
    company: 'Duolingo',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'EdTech',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Overall click-through rate (CTR) on retention push notifications dropped from 8.2% to 5.4% over the last month. Find the root cause.',
    contextBackground: 'Daily push send volume increased by 25% due to a new engagement experiment targeting dormant learners.',
    candidateBrief: [
      'Segment push types (Streak Reminders, Social Leaderboard, Promotional, New Course content)',
      'Analyze deliverability (iOS Focus Mode / Android 13+ Notification Permissions)',
      'Assess notification fatigue and send frequency per user per day',
      'Evaluate copy personalization and timing algorithm effectiveness'
    ],
    keyEvaluationMetrics: ['Push CTR (%)', 'Push Opt-Out Rate', 'Sends per User / Day', 'Time-to-Open Distribution'],
    suggestedFramework: 'Notification Frequency & Fatigue -> Segmentation by Push Category -> Platform Permission Changes -> Send Time Optimization',
    benchmarkOutline: {
      clarificationQuestions: ['Did opt-out / notification disabling rates also increase?', 'Which user cohorts experienced the steepest drop?'],
      coreHypothesesOrSegments: ['Over-messaging fatigue from multiple concurrent team campaigns', 'iOS notification summary grouping reducing instant glanceability', 'Decline in copy relevance for dormant cohort'],
      analyticalPath: ['Break down CTR by push category: Streak reminders steady at 11%, but new "Friend Activity" broadcast had a 1.2% CTR and fatigued users', 'Total pushes per active user increased from 2.1 to 4.2 per day'],
      synthesisModel: 'Push fatigue due to overlapping marketing campaigns; implemented global messaging frequency capping (max 2/day) and prioritized high-CTR streak alerts.'
    }
  },
  {
    id: 'rca-app-store-rating-drop',
    track: 'rca',
    title: 'App store rating has dropped from 4.5 to 4.3 over a month',
    company: 'Spotify',
    companyColor: 'bg-green-600 text-white',
    companyBadge: 'Audio Streaming',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Your iOS App Store rating for Spotify dropped from 4.5 to 4.3 stars over the last 4 weeks. Identify what is driving negative user sentiment.',
    contextBackground: 'Total review volume increased by 40%. The majority of 1-star and 2-star reviews were submitted after the latest major UI release.',
    candidateBrief: [
      'Perform sentiment analysis on 1-star and 2-star review text clustering',
      'Segment ratings by App Version, OS Version, Subscription Tier (Free vs Premium), and Device Model',
      'Examine technical issues (crashes, background audio stutters, battery drain) vs UX changes (nav overhaul, paywalls)',
      'Formulate immediate PR and product remediation steps'
    ],
    keyEvaluationMetrics: ['Average App Rating', '1-Star Review Ratio', 'Crash-Free Sessions %', 'Battery Consumption Index'],
    suggestedFramework: 'Review Text Categorization (Bugs vs UX vs Pricing) -> Version / Device Segmentation -> Technical Telemetry Correlation -> Action Plan',
    benchmarkOutline: {
      clarificationQuestions: ['Are negative reviews coming from Free or Premium subscribers?', 'Did the rating prompt timing change?'],
      coreHypothesesOrSegments: ['Unprompted in-app rating modal shown after a playback error', 'UI navigation redesign moved favorite playlists into a submenu', 'Severe background battery drain on iOS 17 devices'],
      analyticalPath: ['Cluster review keywords: "battery drain", "overheating", "queue button moved"', 'Telemetry confirms iOS v8.8 background audio thread CPU utilization increased by 300% on older iPhone models'],
      synthesisModel: 'Background audio thread bug caused battery overheating on older iPhones; pushed emergency hotfix v8.8.2 and updated in-app review prompting logic.'
    }
  },
  {
    id: 'rca-payment-success-decrease',
    track: 'rca',
    title: 'Payment success rate has decreased marginally',
    company: 'Razorpay',
    companyColor: 'bg-blue-700 text-white',
    companyBadge: 'Fintech Payments',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Overall payment success rate (PSR) across all merchant checkouts decreased from 86.5% to 84.8% over the past 5 days. Investigate the cause.',
    contextBackground: 'The decrease is subtle across aggregate charts, but represents millions in lost gross transaction value across top tier merchants.',
    candidateBrief: [
      'Segment Payment Success Rate by Payment Method (UPI, Credit Cards, Debit Cards, NetBanking, BNPL)',
      'Segment by Issuing Bank, Acquiring Gateway, Merchant Category, and Network (Visa, Mastercard, RuPay)',
      'Investigate bank downtime, 3D-Secure OTP latency, gateway routing algorithms, and SDK timeout parameters',
      'Propose automated failover and dynamic routing improvements'
    ],
    keyEvaluationMetrics: ['Payment Success Rate (PSR %)', 'Bank Downtime Duration', 'OTP Latency', 'Gateway Error Codes (Timeout vs Auth Fail)'],
    suggestedFramework: 'Payment Method Breakdown -> Bank / Issuer Split -> Gateway Latency & Error Codes -> Dynamic Routing Optimization',
    benchmarkOutline: {
      clarificationQuestions: ['Is the drop uniform across all payment methods or isolated to one rails (e.g., UPI)?', 'Which error codes spiked (USER_DROPOUT vs BANK_TIMEOUT vs INSUFFICIENT_FUNDS)?'],
      coreHypothesesOrSegments: ['Major private bank core banking maintenance causing UPI timeouts', 'New 2FA authentication protocol introducing friction on web checkout', 'Gateway smart-router misrouting high-ticket transactions to a degraded acquirer'],
      analyticalPath: ['Filter by rails: UPI PSR steady at 91%, Cards dropped from 84% to 76%', 'Filter Cards by Issuer: Bank X 3DS-2 OTP endpoint latency spiked to 22 seconds causing user abandonments'],
      synthesisModel: 'Bank X OTP timeout identified; switched smart routing to fallback acquirer integration and enabled instant WhatsApp OTP fallback.'
    }
  },
  {
    id: 'rca-new-feature-low-usage',
    track: 'rca',
    title: 'A newly launched feature shows lower-than-expected usage',
    company: 'Slack',
    companyColor: 'bg-purple-700 text-white',
    companyBadge: 'Enterprise Collab',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'You launched "Voice Huddles Clips" 3 weeks ago with a target of 15% workspace adoption, but current adoption is lagging at 3.2%. Diagnose the low adoption.',
    contextBackground: 'Marketing and in-app announcement banners drove initial clicks, but repeat weekly creation is virtually zero.',
    candidateBrief: [
      'Break down the Feature Adoption Funnel: Awareness -> First Click -> Recording Started -> Clip Sent -> Recipient Listened -> Reply Created',
      'Segment by Workspace Size (Enterprise Grid vs SMB), Platform (Desktop vs Mobile), and Role (Eng, Sales, Design)',
      'Evaluate friction points in recording UX, permission prompts, and playback controls',
      'Analyze whether this is a discovery problem, usability failure, or lack of genuine utility'
    ],
    keyEvaluationMetrics: ['Feature Trial Rate (%)', 'Creation Retention Rate', 'Recipient Playback %', 'Time-to-Create Clip'],
    suggestedFramework: 'Adoption Funnel (Discovery -> Activation -> Retention) -> Segment by User Persona -> Usability Testing Feedback -> Product Iteration',
    benchmarkOutline: {
      clarificationQuestions: ['Did users fail to discover the feature or try it and abandon it?', 'How does Desktop vs Mobile creation compare?'],
      coreHypothesesOrSegments: ['Discovery button buried behind secondary attachment menu', 'Social awkwardness: users uncomfortable sending audio clips in public workspace channels', 'Lack of transcript generation makes reading faster than listening'],
      analyticalPath: ['Funnel data reveals 45% clicked the record button, but 82% canceled before sending because audio playback had no auto-transcription preview'],
      synthesisModel: 'High initial curiosity but strong friction due to lack of text transcript; added real-time AI transcription preview and quick 1-click reaction templates.'
    }
  },
  {
    id: 'rca-email-open-rates-drop',
    track: 'rca',
    title: 'Email open rates have dropped for your weekly newsletter',
    company: 'Substack',
    companyColor: 'bg-orange-600 text-white',
    companyBadge: 'Creator Economy',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Your platform\'s flagship weekly digest open rate dropped from 38% to 24% over the last 3 editions. Diagnose the deliverability and engagement drop.',
    contextBackground: 'List size grew by 20% recently following a viral cross-promotion campaign.',
    candidateBrief: [
      'Segment open rates by Email Client (Gmail, Apple Mail, Outlook, Yahoo)',
      'Analyze Sender Domain Reputation, DMARC/DKIM authentication, and Spam Complaint Rates',
      'Evaluate cohort engagement (Tenured subscribers vs New viral leads)',
      'Check subject line testing, send time changes, and email clipping issues in Gmail'
    ],
    keyEvaluationMetrics: ['Unique Open Rate (%)', 'Deliverability to Primary Inbox (%)', 'Spam Complaint Rate', 'Unsubscribe Rate'],
    suggestedFramework: 'Email Client / Domain Deliverability -> Cohort Quality (New vs Old) -> Subject Line & Preview Text -> Technical SPF/DKIM Config',
    benchmarkOutline: {
      clarificationQuestions: ['Did open rates drop across all email clients or specifically Gmail Promotions tab?', 'Did unsubscribe or spam complaints increase?'],
      coreHypothesesOrSegments: ['Emails routed to Gmail Spam/Promotions tab due to increased promotional links', 'New viral subscriber cohort had low engagement intent', 'HTML payload size exceeded 102KB causing Gmail to clip the tracking pixel'],
      analyticalPath: ['Check Deliverability by Client: Apple Mail and Outlook steady at 40%, Gmail dropped from 39% to 12%', 'Investigation reveals email template redesign increased HTML file size to 115KB, clipping the open pixel in Gmail'],
      synthesisModel: 'Gmail message clipping hid tracking pixel and hurt sender score; minified HTML template under 80KB to restore tracked open rates.'
    }
  },
  {
    id: 'rca-session-duration-down-retention-stable',
    track: 'rca',
    title: 'Average session duration is down, but retention is stable',
    company: 'YouTube',
    companyColor: 'bg-red-600 text-white',
    companyBadge: 'Video Platform',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Average session duration on YouTube mobile decreased by 18% over the past month, yet D1, D7, and D30 user retention remained completely rock solid. How do you explain and evaluate this?',
    contextBackground: 'Total daily active users and app opens per user actually increased by 10%.',
    candidateBrief: [
      'Analyze format consumption mix shifts (Shorts vs Long-form videos vs Live streams)',
      'Evaluate whether shorter sessions represent higher user efficiency or shallower engagement',
      'Segment by User Age Cohort, Device Type, and Time of Day (Commute vs Evening lean-back)',
      'Determine if overall watch time (Sessions × Duration) is net positive or negative'
    ],
    keyEvaluationMetrics: ['Total Watch Hours', 'Sessions per User / Day', 'Shorts Views vs Long-form Views', 'Ad Impressions per User'],
    suggestedFramework: 'Metric Interdependence (Sessions × Duration = Total Time) -> Format Mix Shift (Shorts vs Longform) -> User Intent & Cannibalization -> Net Business Impact',
    benchmarkOutline: {
      clarificationQuestions: ['Did total daily watch time across all sessions go down, or just duration per individual session?', 'Did session frequency (app opens) increase?'],
      coreHypothesesOrSegments: ['YouTube Shorts algorithmic push resulting in more frequent but shorter micro-sessions throughout the day', 'Video player loading faster, reducing idle waiting time', 'UI change making it easier to find quick answers (tutorials/how-to)'],
      analyticalPath: ['App opens per user increased from 3.2 to 4.8 per day; Shorts consumption surged 60%', 'Total daily watch time per user is actually up 4% despite lower per-session duration'],
      synthesisModel: 'Healthy format shift: users open the app more frequently for quick Shorts sessions; total watch time and ad engagement grew overall.'
    }
  },

  // ==========================================
  // 🟡 MEDIUM (10 Questions)
  // ==========================================
  {
    id: 'rca-orders-down-15-traffic-stable',
    track: 'rca',
    title: 'Orders are down 15% WoW, but traffic is stable',
    company: 'Zalando',
    companyColor: 'bg-orange-600 text-white',
    companyBadge: 'Fashion E-Commerce',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Weekly completed orders plummeted 15% week-on-week, but total unique visitors and page views are flat. Diagnose why shoppers are browsing without purchasing.',
    contextBackground: 'Marketing spend, seasonal weather, and pricing catalogs are consistent with the previous month.',
    candidateBrief: [
      'Deconstruct the E-Commerce Purchase Funnel: Home -> Search/Category -> Product Detail Page (PDP) -> Add to Bag -> Checkout -> Payment Success',
      'Isolate the exact funnel drop-off step',
      'Investigate inventory availability (out-of-stock sizes on bestsellers), shipping cost display changes, and checkout bugs',
      'Segment by Platform (iOS vs Android vs Web), Geography, and Payment Method'
    ],
    keyEvaluationMetrics: ['PDP -> Add to Bag %', 'Add to Bag -> Checkout %', 'Payment Success Rate', 'Out of Stock Impression Rate'],
    suggestedFramework: 'Funnel Step-by-Step Isolation -> Inventory & Out-of-Stock Analysis -> Pricing & Delivery Fee Friction -> Technical Checkout Failures',
    benchmarkOutline: {
      clarificationQuestions: ['Which specific step in the checkout funnel showed the steepest drop?', 'Is the drop across all product categories or specific fashion apparel?'],
      coreHypothesesOrSegments: ['Increased minimum free shipping threshold from $30 to $50', 'Top 20 revenue-driving summer fashion SKUs went out of stock in popular sizes (M/L)', 'Promo code validation failure throwing an unhandled error at checkout'],
      analyticalPath: ['Funnel shows: PDP-to-Cart is normal (18%), but Cart-to-Checkout dropped 35%', 'Investigation reveals: A new delivery fee calculator was placed on the cart screen, showing high international delivery surcharges before address entry'],
      synthesisModel: 'Premature delivery surcharge calculation on cart screen shocked buyers into abandonment; rolled back cart widget to restore order conversion.'
    }
  },
  {
    id: 'rca-cancellations-up-20-window',
    track: 'rca',
    title: 'Order cancellations up 20% within the 24h window',
    company: 'Flipkart',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'E-Commerce',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Customer-initiated order cancellations within 24 hours of placement surged by 20% over the last 10 days. Identify why customers are changing their minds.',
    contextBackground: 'Overall order volume grew 5%, but net completed shipments are deteriorating due to instant remorse and cancellations.',
    candidateBrief: [
      'Analyze cancellation reason taxonomy selected by users during cancellation flow',
      'Segment by Delivery Promise Date (Estimated Delivery Days), Payment Type (Cash on Delivery vs Prepaid), and Category',
      'Examine competitor flash sales and price drop match algorithms',
      'Investigate post-order communication (delayed dispatch confirmation, unexpected shipping fees)'
    ],
    keyEvaluationMetrics: ['24-Hour Cancellation Rate (%)', 'COD vs Prepaid Cancellation Split', 'Estimated Delivery Time (EDT) Accuracy', 'Price Competitiveness Index'],
    suggestedFramework: 'Cancellation Reason Taxonomy -> Payment Mode Split (COD vs Prepaid) -> Logistics EDT Delivery Promises -> Post-Purchase Friction',
    benchmarkOutline: {
      clarificationQuestions: ['Are cancellations concentrated on COD or Prepaid orders?', 'Did the estimated delivery timeline (EDT) increase during this period?'],
      coreHypothesesOrSegments: ['Logistics bottleneck pushed EDT delivery dates from 2 days to 6 days after order confirmation', 'Competitor running a headline discount sale on high-value electronics', 'Aggressive post-order upselling confusing users into cancelling their primary order'],
      analyticalPath: ['85% of cancellations occurred on Cash on Delivery orders', 'Due to a warehouse sorting capacity constraint, algorithm dynamically inflated promised delivery times by +4 days on the order status screen'],
      synthesisModel: 'Inflated post-order delivery promise dates triggered COD buyer remorse; optimized regional warehouse routing to restore accurate 2-day delivery estimates.'
    }
  },
  {
    id: 'rca-digital-wallet-tx-drop-30',
    track: 'rca',
    title: 'Digital wallet transactions dropped by 30%',
    company: 'PhonePe',
    companyColor: 'bg-purple-600 text-white',
    companyBadge: 'Fintech Payments',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Monthly stored-value wallet peer-to-merchant transaction volume plummeted 30% over the last quarter. Explain this major structural shift.',
    contextBackground: 'Total app active users and bank-to-bank UPI transactions are at all-time record highs on the platform.',
    candidateBrief: [
      'Examine user substitution behavior: Are wallet users migrating to direct UPI / Credit on UPI rails?',
      'Investigate regulatory changes (KYC compliance mandates, wallet loading limits, interchange fees)',
      'Analyze merchant acceptance fee changes for wallet payments vs zero-fee UPI',
      'Segment transaction types: P2P, Offline QR Merchant, Online In-App, Utility Bill Payments'
    ],
    keyEvaluationMetrics: ['Wallet Transaction Count', 'Direct Bank UPI Volume', 'Full-KYC Wallet User Ratio', 'Merchant QR Acceptance Rate'],
    suggestedFramework: 'Cannibalization & Product Substitution -> Regulatory Compliance Changes -> Merchant Economics & Friction -> User Experience Differences',
    benchmarkOutline: {
      clarificationQuestions: ['Did overall platform transactions drop, or did wallet volume specifically shift to direct bank UPI?', 'Were there recent RBI / central bank KYC compliance deadlines?'],
      coreHypothesesOrSegments: ['Internal cannibalization: zero-friction UPI auto-pay replaced wallet top-ups', 'Regulatory deadline required full biometric KYC for wallet balances, locking non-compliant users', 'Merchants disabling wallet acceptance due to new 1.1% interchange surcharge'],
      analyticalPath: ['Internal substitution analysis: 92% of the lost wallet volume migrated directly to Bank UPI; total platform GMV grew 14%'],
      synthesisModel: 'Natural product cannibalization driven by frictionless bank UPI adoption, accelerated by central bank wallet KYC mandates; repositioned wallet as high-speed micro-payments ledger.'
    }
  },
  {
    id: 'rca-dating-app-dau-drop-10',
    track: 'rca',
    title: 'Dating app DAU dropped 10% last month',
    company: 'Tinder',
    companyColor: 'bg-rose-500 text-white',
    companyBadge: 'Dating & Social',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Daily Active Users on your dating app dropped 10% month-over-month. Investigate whether this is a gender ratio imbalance, match quality issue, or bot invasion.',
    contextBackground: 'New user signups are steady, but D7 and D14 retention for female users declined significantly.',
    candidateBrief: [
      'Segment two-sided marketplace dynamics: Male vs Female active users, swiping activity, and match rates',
      'Evaluate Match Liquidity: Swipes per user, Matches per active user, First-Message Sent Rate, Response Rate',
      'Investigate spam/bot accounts, harassment reports, and trust & safety flags',
      'Analyze algorithmic feed changes (ELO score matching updates, paywalls on rewinds/likes)'
    ],
    keyEvaluationMetrics: ['Gender Ratio (M/F)', 'Match Rate per Swipe', 'Chat Initiation Rate', 'Female D7 Retention', 'Trust & Safety Report Volume'],
    suggestedFramework: 'Two-Sided Marketplace Health -> Match Quality & Liquidity -> Trust & Safety / Spam -> Algorithmic Paywall Changes',
    benchmarkOutline: {
      clarificationQuestions: ['Is the drop uniform across genders or isolated to female users?', 'Did match rates and message exchange rates change before the drop?'],
      coreHypothesesOrSegments: ['Spam bots and crypto scammers degraded female user trust and experience', 'Paywall placed on seeing incoming likes reduced active swiping incentive', 'Algorithmic change clustered top 5% profiles, leaving the majority with zero matches'],
      analyticalPath: ['Data reveals female D7 retention dropped from 42% to 28% following an influx of unverified bot profiles sending spam messages', 'Match response rate dropped 40%'],
      synthesisModel: 'Bot spam degraded female retention, creating a negative two-sided liquidity spiral; deployed mandatory selfie video verification and AI proactive harassment filtering.'
    }
  },
  {
    id: 'rca-ride-hailing-completion-decline',
    track: 'rca',
    title: 'Ride-hailing trip completion rate declined; bookings constant',
    company: 'Grab',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Ride Hailing',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Trip completion rate dropped from 88% to 74% over the last 3 weeks, while customer ride bookings and search intent remained flat. Diagnose the breakdown.',
    contextBackground: 'The issue is concentrated in dense metropolitan hubs during morning and evening rush hours.',
    candidateBrief: [
      'Break down the ride fulfillment funnel: Ride Request -> Dispatch Broadcast -> Driver Accepts -> Driver En Route -> Driver Arrives -> Trip Starts -> Trip Completed',
      'Isolate whether the drop is Driver Cancellation, Rider Cancellation, or Dispatch Timeout',
      'Analyze driver earnings, fuel price hikes, traffic congestion, and upfront fare transparency',
      'Examine incentive structures and driver app battery/location permissions'
    ],
    keyEvaluationMetrics: ['Trip Completion Rate (%)', 'Driver Cancellation Rate (%)', 'Rider Wait Time / ETA', 'Driver Acceptance Rate (%)'],
    suggestedFramework: 'Ride Fulfillment Funnel Step-by-Step -> Driver Supply Economics & Cancellation Drivers -> Traffic & ETA Latency -> Actionable Triage',
    benchmarkOutline: {
      clarificationQuestions: ['Who is cancelling the rides: the driver or the passenger?', 'At what exact step is the cancellation occurring (before or after driver dispatch)?'],
      coreHypothesesOrSegments: ['Driver cancellations after accepting due to long pickup distance (>15 mins)', 'Riders cancelling due to inaccurate or fluctuating ETAs during rain/traffic', 'Drivers asking riders for cash / off-platform trips'],
      analyticalPath: ['Funnel data indicates Driver Cancellations after acceptance spiked 250% for trips with pickup distance > 3.5 km', 'Recent matching algorithm expanded dispatch radius to reduce unfulfilled demand, backfiring by assigning distant drivers'],
      synthesisModel: 'Dispatch radius expansion caused driver pickup fatigue and cancellations; tightened dispatch radius back to 2.5km and introduced distant pickup compensation bonuses.'
    }
  },
  {
    id: 'rca-banking-app-install-decrease',
    track: 'rca',
    title: 'Decrease in new banking app installations over last quarter',
    company: 'Revolut',
    companyColor: 'bg-slate-900 text-white',
    companyBadge: 'Neobank',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Organic and paid mobile app installs for your digital bank dropped 22% quarter-over-quarter across key European markets. Investigate the growth drop.',
    contextBackground: 'Brand awareness and digital ad impressions are stable. Competitor interest in high-yield savings accounts increased.',
    candidateBrief: [
      'Segment by Channel (App Store Search, Google Play, Paid Social, Affiliate Referrals)',
      'Analyze App Store Optimization (ASO) rankings for primary keywords (e.g. "free bank account", "crypto trading", "travel money")',
      'Evaluate competitor value propositions (e.g. higher interest rates on deposits)',
      'Check app store review sentiment, app size growth (>150MB), and device OS compatibility'
    ],
    keyEvaluationMetrics: ['App Store Impressions -> Installs %', 'Keyword Search Rank', 'Cost Per Install (CPI)', 'Referral Share Rate'],
    suggestedFramework: 'Acquisition Funnel Breakdown -> App Store Conversion & ASO -> Macro Competitive Landscape (Interest Rates) -> Referral Program Mechanics',
    benchmarkOutline: {
      clarificationQuestions: ['Did app store impressions drop or did page-to-install conversion drop?', 'How did peer neobanks perform in the same quarter?'],
      coreHypothesesOrSegments: ['Competitors launched 5% APY savings accounts, winning consumer attention', 'App bundle size exceeded 200MB, triggering "download over Wi-Fi only" warning on iOS', 'Referral reward budget reduced by growth team, collapsing viral K-factor'],
      analyticalPath: ['App store conversion dropped: keyword rank was stable, but referral program payout cut from €50 to €10 reduced viral user invitations by 65%'],
      synthesisModel: 'Referral incentive reduction destroyed viral organic loop; restructured tiered viral rewards tied to activated debit card spend rather than simple installs.'
    }
  },
  {
    id: 'rca-add-to-cart-dropoff-payment',
    track: 'rca',
    title: 'Add to Cart -> Purchase drop-off increased at payment step',
    company: 'ASOS',
    companyColor: 'bg-zinc-900 text-white',
    companyBadge: 'Fashion Retail',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Drop-off between the final payment selection screen and order confirmation increased from 14% to 26% following a multi-currency checkout redesign.',
    contextBackground: 'Users are successfully adding items and entering delivery addresses, but abandoning on the final review & pay modal.',
    candidateBrief: [
      'Segment checkout funnel by Payment Method (Apple Pay, Klarna/BNPL, Credit Cards, PayPal)',
      'Analyze foreign exchange fee disclosures and dynamic currency conversion warnings',
      'Investigate technical SDK timeouts and 3D-Secure modal iframe rendering bugs on mobile Safari',
      'Check unexpected taxes, duties, or shipping recalculations revealed on the final screen'
    ],
    keyEvaluationMetrics: ['Payment Screen Conversion %', 'BNPL vs Card Abandonment', '3DS Authentication Success Rate', 'Safari vs Chrome Conversion'],
    suggestedFramework: 'Checkout Step Isolation -> Payment Method Breakdown -> Pricing / FX Fee Transparency -> Browser & Technical JS Errors',
    benchmarkOutline: {
      clarificationQuestions: ['Is the drop isolated to international cross-border shoppers or domestic?', 'Which specific payment methods have the highest abandonment?'],
      coreHypothesesOrSegments: ['Unclear FX conversion fees added at the final step surprising shoppers', 'Klarna BNPL widget failing to render on iOS Safari webviews', 'Mandatory 3DS biometric authentication failing due to third-party bank pop-up blocker'],
      analyticalPath: ['Browser segmentation: Mobile Safari checkout conversion collapsed by 40%', 'Investigation: Safari 17 pop-up blocking prevented 3DS bank authorization window from opening'],
      synthesisModel: 'Safari 17 pop-up blocker broke 3DS iframe authorization; implemented inline 3DS redirect flow to recover $3.4M in weekly abandoned checkouts.'
    }
  },
  {
    id: 'rca-saas-churn-smb-vs-enterprise',
    track: 'rca',
    title: 'SaaS churn increased for SMBs but not Enterprise',
    company: 'HubSpot',
    companyColor: 'bg-orange-500 text-white',
    companyBadge: 'B2B SaaS',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Your B2B SaaS platform saw monthly logo churn jump from 2.1% to 4.8% for SMB customers (<50 seats), while Enterprise churn remained record-low (<0.5%). Diagnose why.',
    contextBackground: 'A new quarterly pricing tier restructured seat add-ons and automated onboarding workflows 3 months ago.',
    candidateBrief: [
      'Segment SMB customers by Onboarding Maturity (Self-serve vs CSM-assisted), Plan Tier, and Industry Vertical',
      'Analyze feature usage depth: Daily active users per workspace, integration connectivity, and automation recipe runs',
      'Evaluate the impact of the new minimum seat pricing policy on small businesses',
      'Examine macro economic conditions (SMB budget cuts vs tooling consolidation)'
    ],
    keyEvaluationMetrics: ['SMB Monthly Logo Churn (%)', 'Net Revenue Retention (NRR)', 'Time-to-First-Value (TTFV)', 'Product Qualified Account Score'],
    suggestedFramework: 'Customer Cohort Segmentation -> Pricing & Packaging Changes -> Onboarding & Product Value Realization -> Support & CSM Touchpoints',
    benchmarkOutline: {
      clarificationQuestions: ['Are churning SMBs cancelling in Month 1-3 (onboarding failure) or Month 12 (renewal)?', 'Did product usage decline prior to cancellation?'],
      coreHypothesesOrSegments: ['Removal of free human onboarding for SMB tier led to low activation', 'Price restructuring increased base entry tier from $50/mo to $180/mo upon renewal', 'Simpler lightweight competitor launched a freemium tool targeting SMB niche'],
      analyticalPath: ['80% of churn happened at Month 2; accounts with 0 integrations had 6x higher churn', 'Self-serve onboarding redesign skipped Zapier/Slack integration step, leaving SMBs without automated workflows'],
      synthesisModel: 'Automated onboarding redesign skipped critical CRM integrations; built guided interactive setup checklists and introduced quarterly flexible SMB tiers.'
    }
  },
  {
    id: 'rca-late-delivery-escalations-ops-logistics',
    track: 'rca',
    title: 'Escalations for "late delivery" up 15%. Is it ops or logistics?',
    company: 'DoorDash',
    companyColor: 'bg-red-500 text-white',
    companyBadge: 'On-Demand Delivery',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Customer support escalations for orders delivered late spiked 15% across several metro areas. Determine whether the bottleneck is Merchant Kitchen Prep (Ops) or Dasher Fleet Dispatch (Logistics).',
    contextBackground: 'Average delivery time increased from 32 minutes to 43 minutes in dense dining corridors.',
    candidateBrief: [
      'Deconstruct the Order Fulfillment Lifecycle Timeline: Order Placed -> Restaurant Accepts -> Kitchen Prep Time (Food Ready) -> Dasher Assigned -> Dasher Arrives at Merchant -> Dasher Wait Time -> Transit Time to Customer',
      'Compare Kitchen Prep Duration vs Dasher In-Transit Transit Duration across top restaurant categories',
      'Identify whether Dasher supply shortages caused delayed pick-ups or restaurants under-reported actual prep times',
      'Propose dynamic dispatch and kitchen tablet software calibrations'
    ],
    keyEvaluationMetrics: ['Merchant Kitchen Prep Time (Mins)', 'Dasher Dwell / Wait Time at Merchant', 'In-Transit Travel Time', 'On-Time Delivery %'],
    suggestedFramework: 'Lifecycle Milestone Timestamp Decomposition -> Merchant Prep vs Fleet Transit Isolation -> Merchant Tablet Behavior -> Predictive Dispatch Tuning',
    benchmarkOutline: {
      clarificationQuestions: ['Did restaurants report food ready accurately, or are Dashers waiting at the counter?', 'Is the delay happening during restaurant prep or during rider transit?'],
      coreHypothesesOrSegments: ['Restaurants marking food ready prematurely to avoid SLA penalties while Dashers wait 12+ mins', 'Dasher supply shortage during bad weather causing delayed assignment', 'Traffic routing engine underestimating peak-hour congestion'],
      analyticalPath: ['Decomposition shows Dasher transit time was normal (14 mins), but Dasher Dwell Time at restaurants surged from 4 mins to 15 mins because restaurants accepted more orders than kitchen capacity'],
      synthesisModel: 'Merchant kitchen prep bottleneck identified (Ops issue); implemented dynamic kitchen throttling and calibrated predictive Dasher dispatch arrival based on actual cooking velocity.'
    }
  },
  {
    id: 'rca-signup-to-kyc-drop-ui-revamp',
    track: 'rca',
    title: 'Signup-to-KYC rate dropped after UI revamp',
    company: 'Coinbase',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Crypto Exchange',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Following a modern UI redesign of the identity verification flow, conversion from initial registration to completed KYC verification dropped from 68% to 51%. Diagnose the UX and technical failures.',
    contextBackground: 'The revamp intended to reduce cognitive load by splitting the document upload into a 4-step progressive modal.',
    candidateBrief: [
      'Analyze the Step-by-Step KYC Funnel: Personal Details -> ID Document Selection -> Document Photo Capture -> Liveness Selfie -> Automated OCR / AML Verification -> Instant Approval',
      'Examine OCR recognition rejection rates and camera permission drop-offs on mobile browsers',
      'Evaluate UI design changes (clarity of instructions, glare warnings, manual retry messaging)',
      'Segment by Document Type (Passport vs Driver\'s License vs National ID Card) and Device OS'
    ],
    keyEvaluationMetrics: ['Signup-to-KYC Completion %', 'OCR Extraction Success Rate', 'Camera Permission Grant %', 'Document Re-upload Rate'],
    suggestedFramework: 'Step-by-Step KYC Funnel Isolation -> Document Photo Capture & OCR Latency -> Camera Hardware Permissions -> User Guidance & Error States',
    benchmarkOutline: {
      clarificationQuestions: ['At which specific screen in the 4-step flow are users dropping off?', 'Did document verification rejection rates increase or did users simply not upload?'],
      coreHypothesesOrSegments: ['Camera webview auto-capture triggering blur and flash glare rejections', 'Removal of explicit guidelines on acceptable national ID types', 'Mobile camera permission modal failing to reopen after accidental denial'],
      analyticalPath: ['Step 3 (Document Capture) drop-off doubled: new real-time auto-capture had an overly strict edge-detection threshold, rejecting 44% of valid ID photos with an unhelpful generic error'],
      synthesisModel: 'Overly sensitive camera auto-capture threshold blocked valid IDs; added manual capture fallback button, instant glare guidance, and relaxed blur tolerances to recover 17% conversion.'
    }
  },

  // ==========================================
  // 🔴 HARD (8 Questions)
  // ==========================================
  {
    id: 'rca-gmv-flat-health-metrics-moving',
    track: 'rca',
    title: 'GMV is flat, but all health metrics are moving slightly',
    company: 'Shopify',
    companyColor: 'bg-emerald-700 text-white',
    companyBadge: 'Commerce Platform',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Total platform Gross Merchandise Value (GMV) is completely flat YoY ($50B), but all underlying sub-metrics are moving in conflicting directions: merchant count is +18%, active buyers are -8%, average order value (AOV) is +12%, and purchase frequency is -5%. Conduct a comprehensive multi-variable diagnostic.',
    contextBackground: 'Executive leadership wants to understand if the business is quietly eroding under the surface or undergoing an organic structural shift.',
    candidateBrief: [
      'Deconstruct GMV equation: GMV = Merchants × Active Buyers × (Orders / Buyer) × Average Order Value (AOV)',
      'Segment by Merchant Tier (Enterprise Plus vs High-Volume DTC vs Long-tail Hobbyists)',
      'Analyze consumer macro inflation impact on order basket sizes vs discretionary spending frequency',
      'Evaluate cohort health and long-term customer lifetime value (LTV)'
    ],
    keyEvaluationMetrics: ['GMV by Merchant Cohort', 'Merchant Gross Margin %', 'Buyer Repeat Purchase Rate', 'Basket Size (Units per Order × ASP)'],
    suggestedFramework: 'Mathematical First-Principles Equation Breakdown -> Merchant Tier Segmentation -> Inflationary Price Effect vs Volume Erosion -> Strategic Portfolio Health Assessment',
    benchmarkOutline: {
      clarificationQuestions: ['Is the AOV increase driven by higher item prices (inflation) or more items per cart?', 'How is merchant churn and new merchant GMV contribution trending?'],
      coreHypothesesOrSegments: ['Inflation masked underlying consumer volume decay; fewer shoppers buying higher-priced goods', 'Long-tail merchant churn offset by massive GMV growth in top 1% enterprise merchants', 'DTC apparel and electronics slowing down while B2B wholesale merchants grew'],
      analyticalPath: ['Breakdown reveals: Units sold fell 15%, but merchant list prices rose 20% due to supply chain inflation; top 5% enterprise merchants now represent 78% of all GMV while SMB merchants are suffering high attrition'],
      synthesisModel: 'Flat GMV is a dangerous false stability: price inflation masked a 15% unit volume drop and SMB merchant distress; recommended strategic pivot to B2B enterprise capabilities and SMB financing support.'
    }
  },
  {
    id: 'rca-digital-bank-triple-deterioration',
    track: 'rca',
    title: 'Digital bank: Active users, tx volume, and cross-sell all worsened',
    company: 'Nubank',
    companyColor: 'bg-purple-800 text-white',
    companyBadge: 'Digital Banking',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Your digital bank experienced simultaneous degradation across 3 core pillars over the last 2 quarters: Monthly Active Transacting Users (-12%), Total Deposit Volume (-18%), and Cross-Sell to Personal Loans/Investments (-30%). Perform a holistic root cause analysis.',
    contextBackground: 'New account sign-ups remain strong due to marketing incentives, but customers are treating the app as a temporary secondary account rather than their primary bank.',
    candidateBrief: [
      'Investigate Primary Banking Relationship (PBR) drivers: Direct salary deposits, recurring bill payments, debit card daily spend',
      'Analyze interest rate competitiveness vs incumbent banks in a high-interest-rate environment',
      'Examine credit underwriting tightening and personal loan approval rate reductions',
      'Propose a multi-stage turnaround strategy to reclaim primary wallet share'
    ],
    keyEvaluationMetrics: ['Primary Banking Relationship (PBR) %', 'Salary Deposit Penetration', 'Credit Underwriting Approval Rate', 'Cost of Funds vs Net Interest Margin'],
    suggestedFramework: 'Primary Banking Relationship (PBR) Health -> Macro Interest Rate Dynamics -> Credit Risk & Approval Policies -> Retention & Loyalty Hooks',
    benchmarkOutline: {
      clarificationQuestions: ['Did users withdraw deposits to move them to traditional high-yield accounts?', 'Did credit risk models tighten loan approvals due to rising defaults?'],
      coreHypothesesOrSegments: ['Central bank interest rate hikes made incumbent banks\' fixed deposits more attractive than 0% digital balances', 'Stricter automated credit scoring slashed personal loan approvals by 45%', 'Lack of direct salary deposit incentives caused users to transfer money out on payday'],
      analyticalPath: ['Root cause synthesis: High interest rates caused affluent depositors to chase yield elsewhere, while tightened credit scoring rejected creditworthy users from taking loans, destroying primary engagement'],
      synthesisModel: 'Loss of Primary Banking status due to uncompetitive deposit yield and opaque loan underwriting; launched automated high-yield savings pots and salary-advance credit tiers to rebuild primary account stickiness.'
    }
  },
  {
    id: 'rca-major-2hr-peak-downtime',
    track: 'rca',
    title: 'Major 2-hour downtime during peak. Full RCA required',
    company: 'Cloudflare',
    companyColor: 'bg-amber-600 text-white',
    companyBadge: 'Cloud Infrastructure',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'A catastrophic 114-minute total service outage occurred during global peak traffic hours, dropping 100% of API and web traffic across millions of customer websites. Conduct a Blameless Post-Mortem and Root Cause Analysis.',
    contextBackground: 'Automated failover mechanisms failed to engage, and internal engineer access consoles were locked out during the incident.',
    candidateBrief: [
      'Trace Incident Timeline: Triggering Event -> Blast Radius Expansion -> Monitoring Detection Latency -> Internal Engineering Lockout -> Remediation Deployment -> Service Recovery',
      'Identify Root Cause: Configuration push vs BGP routing error vs Database deadlock vs DDoS cascade',
      'Analyze why redundant multi-region automated failovers failed',
      'Draft Action Items across Prevention, Detection, Mitigation, and Process Governance'
    ],
    keyEvaluationMetrics: ['Mean Time to Detect (MTTD)', 'Mean Time to Mitigate (MTTM)', 'SLA Financial Penalty Liability', 'Blast Radius %'],
    suggestedFramework: 'Incident Timeline Construction -> Triggering Root Cause -> Cascading Failure & Lockout Mechanism -> Corrective Action Prevention Items',
    benchmarkOutline: {
      clarificationQuestions: ['Was the trigger an external attack or an internal configuration change?', 'Why did automated traffic rerouting fail to isolate the affected edge nodes?'],
      coreHypothesesOrSegments: ['Malformed regex in routing rule caused 100% CPU exhaustion across all edge nodes simultaneously', 'BGP route leak broadcast invalid routing tables to tier-1 transit providers', 'Circular dependency: authentication system relied on the network it was trying to recover'],
      analyticalPath: ['Investigation reveals: A global router configuration push bypassed canary staging; invalid syntax caused a kernel panic loop on edge routers; circular dependency locked out engineers from SSH access'],
      synthesisModel: 'Comprehensive post-mortem: Global config rollout bypassed canary gates with circular SSH dependencies; implemented air-gapped out-of-band management console and mandatory automated 3-phase canary rollouts.'
    }
  },
  {
    id: 'rca-engagement-drop-15-algo-launch',
    track: 'rca',
    title: 'Engagement dropped 15% after "improved" algo launch',
    company: 'TikTok',
    companyColor: 'bg-black text-white',
    companyBadge: 'Content Recommendation',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Your ML team deployed an "improved" recommendation algorithm that tested +4% offline engagement, but 5 days post-100% production rollout, total video views and user watch time dropped by 15%. Investigate why the offline model failed in the real world.',
    contextBackground: 'The new algorithm prioritized long-term user diversity and creator variety over immediate short-term engagement.',
    candidateBrief: [
      'Analyze the Feedback Loop Failure: Offline Training Data Bias vs Online Distribution Shift vs Creator Cold-Start Dynamics',
      'Segment by User Longevity (New, Casual, Power Users) and Content Modality',
      'Evaluate echo chamber mitigation unintended consequences: Did high-affinity content get suppressed too aggressively?',
      'Propose model rollback criteria and online-offline evaluation guardrails'
    ],
    keyEvaluationMetrics: ['Watch Time per User', 'Video Completion Rate', 'Short-Term Engagement (Likes/Shares) vs Content Diversity Score', 'Session Recurrence Rate'],
    suggestedFramework: 'Offline vs Online Evaluation Gap -> Diversity vs Relevance Tradeoff -> Creator Supply Ecosystem Feedback -> Guardrail Metric Architecture',
    benchmarkOutline: {
      clarificationQuestions: ['Did the model over-index on exploration (showing random content) at the expense of proven user preferences?', 'How did creator upload frequency respond?'],
      coreHypothesesOrSegments: ['Exploration penalty alienated top 20% power users who wanted specific niche content', 'Model rewarded clickbait thumbnails with low completion rates', 'Cold-start recommendation latency caused video playback buffering on slower network connections'],
      analyticalPath: ['Analysis reveals: In an attempt to reduce repetitive content, the model penalized top-affinity creator videos by 50%, forcing generic viral videos that drove immediate user session abandonments'],
      synthesisModel: 'Model over-corrected on diversity, starving users of core high-affinity interests; rolled back to hybrid architecture with dynamic exploration exploration caps based on session depth.'
    }
  },
  {
    id: 'rca-rising-fraud-review-load-trust-decline',
    track: 'rca',
    title: 'Rising fraud, higher review load, and declining trust simultaneously',
    company: 'Airbnb',
    companyColor: 'bg-rose-600 text-white',
    companyBadge: 'Travel Marketplace',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Your trust & safety team faces a three-front crisis: fake host listing fraud is up 40%, manual agent review backlog surged by 300% causing 48h host verification delays, and guest post-checkout trust ratings dropped to a 3-year low. Dissect this systemic breakdown.',
    contextBackground: 'Scammers are using AI-generated photos and virtual phone numbers to bypass initial signup verification.',
    candidateBrief: [
      'Map the Host Onboarding & Payout Security Funnel: Account Creation -> ID Verification -> Listing Address Proof -> Photo Upload -> Bank Payout Verification -> First Booking Escrow',
      'Identify vulnerability exploits: Virtual numbers, synthetic identities, unverified GPS addresses, fake review rings',
      'Analyze why automated risk scoring failed, flooding manual human review teams',
      'Architect an end-to-end trust overhaul balancing friction for legitimate hosts vs fraud prevention'
    ],
    keyEvaluationMetrics: ['Fraud Chargeback Loss Rate', 'Manual Review Backlog (Hours)', 'Time-to-Publish Host Listing', 'Guest Safety NPS'],
    suggestedFramework: 'Fraud Vector Vulnerability Mapping -> Risk Engine Thresholds vs Human Ops Capacity -> Payout Escrow Defense -> Holistic Trust Architecture',
    benchmarkOutline: {
      clarificationQuestions: ['How are fraudulent hosts cashing out before guests discover the fake property?', 'Which verification gate has the highest false-positive rate?'],
      coreHypothesesOrSegments: ['Immediate payout release upon booking confirmation allowed scammers to drain funds before guest check-in', 'AI image generation tools defeating duplicate image hash detection algorithms', 'Risk model flagging too many legitimate new hosts, causing ops queue overload'],
      analyticalPath: ['Vulnerability isolated: Payouts were released 24h after booking rather than 24h after physical guest check-in; fraud syndicates booked their own fake listings with stolen credit cards and extracted instant cash'],
      synthesisModel: 'Critical payout policy loophole identified; enforced payout release only 24h post-physical guest check-in, integrated automated utility bill address verification, and deployed reverse AI image forensics.'
    }
  },
  {
    id: 'rca-driver-churn-cancellations-eta-spike',
    track: 'rca',
    title: 'Driver churn, rider cancellation, and ETA complaints all spiked',
    company: 'Lyft',
    companyColor: 'bg-pink-600 text-white',
    companyBadge: 'Ridesharing',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'In your largest market (NYC), active weekly driver supply fell 18%, rider pickup ETAs doubled from 4.2 mins to 8.9 mins, and passenger cancellation rate reached an unsustainable 22%. Unpack this marketplace death spiral.',
    contextBackground: 'A new municipal minimum wage regulation and dynamic platform commission algorithm went live 30 days ago.',
    candidateBrief: [
      'Model the Two-Sided Marketplace Negative Feedback Loop: Driver Supply Drop -> Higher ETAs -> Rider Cancellations -> Lower Driver Effective Hourly Earnings -> Accelerated Driver Churn',
      'Analyze the economic driver: Net hourly take-home pay after gas, vehicle depreciation, and platform commissions',
      'Examine competitive poaching by rival ride-hailing and food delivery platforms',
      'Formulate immediate marketplace balancing levers (incentives, guaranteed earnings, surge calibration)'
    ],
    keyEvaluationMetrics: ['Driver Hourly Take-Home Earnings', 'Driver Utilization Rate (Time with Passenger)', 'Rider ETA to Pickup', 'Supply-Demand Imbalance Ratio'],
    suggestedFramework: 'Two-Sided Marketplace Death Spiral Deconstruction -> Driver Net Earnings Economics -> Pricing & Dispatch Feedback Dynamics -> Emergency Rebalancing Levers',
    benchmarkOutline: {
      clarificationQuestions: ['Did driver hourly earnings go up or down after the new platform commission algorithm?', 'Are drivers multi-apping and accepting competitor trips?'],
      coreHypothesesOrSegments: ['Platform commission algorithm increased effective take rate, reducing net driver hourly pay below competitor baseline', 'Rider cancellations wasted unpaid driver travel time, driving frustration', 'Competitor offering $500 weekly bonus guarantees for 40 completed rides'],
      analyticalPath: ['Economic analysis reveals: Driver unpaid deadhead travel time increased by 60% due to inefficient dispatching; net driver hourly wage fell from $32/hr to $21/hr, causing mass migration to rival platforms'],
      synthesisModel: 'Marketplace death spiral triggered by unpaid driver travel distance; instituted paid pickup compensation, deployed destination filters, and launched earnings floor guarantees.'
    }
  },
  {
    id: 'rca-saas-triple-slowdown-renewals-depth',
    track: 'rca',
    title: 'SaaS expansion slowed, renewals down, usage depth down',
    company: 'Salesforce',
    companyColor: 'bg-sky-600 text-white',
    companyBadge: 'Enterprise CRM',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Your enterprise product line experienced a concurrent decline across Net Revenue Retention (NRR fell from 122% to 104%), Gross Renewal Rate (down from 94% to 86%), and Weekly Active Power Users per account (down 24%). Perform an executive-level diagnostic.',
    contextBackground: 'Sales teams report increasing buyer pushback during contract renewals regarding "shelfware" and unused seat licenses.',
    candidateBrief: [
      'Analyze Account Seat Utilization: Paid Seats vs Provisioned Seats vs Weekly Active Users (Shelfware Ratio)',
      'Evaluate Product Usability & Modern Alternatives: Legacy UI complexity vs modern lightweight competitors',
      'Examine corporate IT budget consolidation (CFO mandate to cut software redundancy)',
      'Design a customer success and product activation strategy to defend enterprise accounts'
    ],
    keyEvaluationMetrics: ['Net Revenue Retention (NRR %)', 'Seat Utilization Ratio (%)', 'Daily Active User / Monthly Active User (DAU/MAU)', 'Feature Adoption Depth'],
    suggestedFramework: 'Seat Utilization & Shelfware Audit -> Product UX & Workflow Complexity vs Modern Competitors -> Procurement & CFO Budget Scrutiny -> Account Recovery Playbook',
    benchmarkOutline: {
      clarificationQuestions: ['Is the renewal decline concentrated in specific company size tiers or industries?', 'Are customers replacing the tool or simply downsizing their seat licenses?'],
      coreHypothesesOrSegments: ['CFO-mandated seat audit: enterprises cutting unused licenses from 1,000 to 400 seats upon renewal', 'End-users bypassing complex CRM workflows to use modern intuitive AI tools', 'Lack of proactive Customer Success touchpoints for at-risk accounts'],
      analyticalPath: ['Telemetry data reveals: Only 35% of purchased seats were logged into in the last 60 days; during annual renewals, procurement teams cut licensing costs to match actual active usage'],
      synthesisModel: 'Shelfware crisis driving contract downsizing; introduced consumption-based flex licensing, embedded AI automated data entry to boost daily end-user utility, and established automated health alerts for CSM intervention.'
    }
  },
  {
    id: 'rca-security-breach-technical-process',
    track: 'rca',
    title: 'Security breach exposed user data. RCA on technical & process failures',
    company: 'Okta',
    companyColor: 'bg-blue-800 text-white',
    companyBadge: 'Identity & Security',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'A third-party customer support contractor\'s workstation was compromised, allowing attackers access to an internal support tool that exposed customer tenant metadata for 5 days before detection. Conduct an unsparing technical, architectural, and operational RCA.',
    contextBackground: 'The incident resulted in regulatory notifications, stock price decline, and customer security escalations.',
    candidateBrief: [
      'Trace Attack Chain: Initial Phishing Compromise -> Lateral Privilege Escalation -> Support Tool Session Hijacking -> Data Exfiltration -> Detection Latency -> Containment',
      'Analyze Principle of Least Privilege (PoLP) and Zero Trust Architecture breakdowns',
      'Examine monitoring and anomaly detection alerting failures (unusual query volumes from contractor IP)',
      'Formulate comprehensive technical refactoring and vendor security governance requirements'
    ],
    keyEvaluationMetrics: ['Time to Compromise Detection (Days)', 'Exfiltrated Tenant Record Count', 'Subcontractor Access Privilege Scope', 'MFA / WebAuthn Enforcement %'],
    suggestedFramework: 'Kill Chain Analysis (Initial Access -> Privilege Escalation -> Exfiltration) -> Architectural Zero Trust Failures -> Vendor Access Governance -> Remediation Roadmap',
    benchmarkOutline: {
      clarificationQuestions: ['What specific customer data fields were accessible in the internal support console?', 'Why did behavioral anomaly detection fail to flag bulk user record lookups?'],
      coreHypothesesOrSegments: ['Third-party contractor workstation lacked mandatory FIDO2 hardware security keys', 'Internal support tool granted excessive unscoped read access to entire customer database', 'Logging alerts were routed to an unmonitored security queue'],
      analyticalPath: ['Root cause synthesis: Contractor was phished via SMS; support portal did not enforce device health compliance or hardware MFA; role-based access allowed unlimited manual search queries without rate limiting'],
      synthesisModel: 'Comprehensive post-breach overhaul: Enforced hardware FIDO2 WebAuthn across all vendor endpoints, re-architected internal support tool with strict ephemeral token access and automated anomaly kill-switches.'
    }
  }
];
