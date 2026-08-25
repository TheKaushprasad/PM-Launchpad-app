import { InterviewScenario } from '../../types/interview';

export const DESIGN_SCENARIOS: InterviewScenario[] = [
  // ==========================================
  // 🟢 EASY (20 Questions)
  // ==========================================
  {
    id: 'design-smart-alarm-clock',
    track: 'design',
    title: 'Design a smart alarm clock for heavy sleepers',
    company: 'Philips / Withings',
    companyColor: 'bg-indigo-600 text-white',
    companyBadge: 'IoT & Smart Home',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a smart alarm clock and sleep system specifically tailored for chronic heavy sleepers, snooze-abusers, and shift workers who struggle to wake up reliably.',
    contextBackground: 'Standard audio smartphone alarms lead to reflexive snooze-tapping, sleep inertia, and missed morning obligations.',
    candidateBrief: [
      'Define User Personas: The Chronic Snooze Abuser, The Deep REM Sleeper with auditory fatigue, The Variable Shift Worker',
      'Identify Key Pain Points: Reflexive subconscious snooze hitting, waking during deep REM cycle causing morning brain fog, single-modality sensory cues (sound only)',
      'Brainstorm 3 Innovative Solutions: Multimodal wake stimulation (gradual sunrise light + gentle vibration mattress pad), Cognitive Wake Quizzes (math puzzle / barcode scan in kitchen to silence alarm), Circadian Sleep Phase Tracking (waking at lightest sleep stage in a 20-min window)',
      'Prioritize MVP features and define North Star Metrics'
    ],
    keyEvaluationMetrics: ['Persona & Sleep Inertia Understanding', 'Multimodal Sensory Solutioning', 'Friction Calibration (Waking up without rage-quitting)', 'North Star Success Metrics'],
    suggestedFramework: 'Clarify & Goals -> User Personas & Pain Points -> User Journey & Brainstorming -> Prioritization & Tradeoffs -> Metrics & Edge Cases',
    benchmarkOutline: {
      clarificationQuestions: ['Is this a hardware device or a mobile app or an integrated system?', 'Are there health/safety constraints (e.g. epilepsy/heart conditions with abrupt shocks)?'],
      coreHypothesesOrSegments: ['Sound alone fails because the brain acclimatizes; waking requires gradual biometric light cues + physical out-of-bed verification', 'The critical moment is the 3-minute post-wake window where users relapse back to sleep'],
      analyticalPath: ['MVP: Bedside smart light device + floor pressure sensor mat that requires standing for 15 seconds to disarm + gentle sunrise circadian light ramp 20 mins prior'],
      synthesisModel: 'Executive design: A circadian sunrise lamp paired with a pressure-sensing bedside rug and cognitive verification check that eliminates reflexive snoozing.'
    }
  },
  {
    id: 'design-vending-machine-school-kids',
    track: 'design',
    title: 'Design a vending machine for school children (ages 6–12)',
    company: 'HealthyKids / SmartRetail',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Accessible Hardware & UX',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a smart, healthy vending machine specifically tailored for elementary and middle school children (ages 6–12) located in school cafeterias.',
    contextBackground: 'Traditional vending machines are physically too tall for young kids, feature confusing numeric keypads, vend unhealthy snacks, and swallow cash coins.',
    candidateBrief: [
      'Analyze Target Users & Ergonomics: Children ages 6-12 (varying heights 3.5ft - 5ft), cognitive reading levels, tactile exploration vs Parent/School Nutritional Administrators',
      'Identify Key Pain Points: Cannot reach top snack buttons or coin slots, allergic reactions from hidden ingredients, losing lunch money, jammed spirals',
      'Design Accessible & Engaging Solutions: Lowered touchscreen with visual pictorial icons, RFID wristband / Student ID card tap linked to parent prepaid lunch balance, Allergen Lockout System (automatically hides peanut/dairy snacks for allergic kids), Gamified healthy choice reward tokens',
      'Define safety, durability, and health success metrics'
    ],
    keyEvaluationMetrics: ['Ergonomic & Physical Height Accommodation', 'Child-Friendly Visual UI / Allergy Safety', 'Parental Control & Cashless Payment Integration', 'Tamper & Safety Engineering'],
    suggestedFramework: 'User Group Segmentation (Kids, Parents, School) -> Physical & Cognitive Pain Points -> Hardware & Software Solutions -> Prioritization & Guardrails',
    benchmarkOutline: {
      clarificationQuestions: ['How is payment handled (cash, school ID card, or free government lunch program)?', 'Are there school district dietary guidelines to enforce?'],
      coreHypothesesOrSegments: ['Physical height is the #1 physical blocker: interactive display and dispensing tray must be located below 3 feet', 'Allergy safety is critical: scan student badge to filter out allergens in real-time'],
      analyticalPath: ['MVP: Ruggedized low-height vending kiosk with visual touchscreen, RFID school lunch badge tap, real-time dietary allergen filtering, and optical anti-drop jam sensors'],
      synthesisModel: 'Executive design: An accessible, low-height smart vending kiosk with RFID school badge payments, automated allergen filtering, and gamified rewards for nutritious snack choices.'
    }
  },
  {
    id: 'design-parking-finder-app',
    track: 'design',
    title: 'Design a parking finder app for crowded cities',
    company: 'ParkMobile / Google Maps',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Urban Mobility',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a mobile navigation and parking reservation application for drivers in densely congested metropolitan downtown areas.',
    contextBackground: '30% of downtown urban traffic congestion is caused by drivers circling blocks looking for vacant parking spots.',
    candidateBrief: [
      'Identify User Personas: The Rushed Commuter/Meeting Attendee (needs guaranteed spot now), The Weekend Shopper/Diner (budget conscious), The Delivery Driver (2-minute quick drop)',
      'Map User Journey & Friction: Pre-trip reservation anxiety, circling blocks aimlessly, confusing street parking signs (street cleaning, permit-only hours), meter expiration stress',
      'Design Core Capabilities: Real-time spot availability heatmaps (computer vision IoT + municipal meter integration), Turn-by-turn spot reservation with in-app gate bar code access, Street Parking Rule Translator (AI decodes complex parking signs), Remote meter top-up with expiration warning',
      'Define North Star Metrics'
    ],
    keyEvaluationMetrics: ['Pre-Trip vs In-Route Driving Safety UX', 'Supply-Side Parking Garage & Street Meter Integrations', 'AI Parking Sign Decoder Utility', 'Time-to-Park Metric Optimization'],
    suggestedFramework: 'Driver Personas & Journey -> Friction Points (Search, Payment, Signage) -> Feature Architecture -> Voice/CarPlay UX -> Success Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does this cover private commercial garages or municipal curbside street parking?', 'Is this integrated with Apple CarPlay / Android Auto for safe driving? (Yes).'],
      coreHypothesesOrSegments: ['Drivers need certainty before arriving; navigating while circling is dangerous and stressful', 'Parsing cryptic municipal parking signs is a major pain point solved by camera AI'],
      analyticalPath: ['MVP: CarPlay-compatible app offering guaranteed garage reservations with 1-tap booking, predictive curbside probability heatmaps, and camera sign parsing'],
      synthesisModel: 'Executive design: An integrated CarPlay parking assistant offering guaranteed pre-booked garage spaces, real-time curbside probability heatmaps, and instant AI parking sign translation.'
    }
  },
  {
    id: 'design-grocery-shopping-app-elderly',
    track: 'design',
    title: 'Design a grocery shopping app for elderly users (65+)',
    company: 'Instacart / SeniorCare',
    companyColor: 'bg-emerald-700 text-white',
    companyBadge: 'Accessible Design',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a mobile grocery ordering and home delivery experience specifically designed for seniors and elderly individuals (ages 65+).',
    contextBackground: 'Modern e-commerce apps have dense text, confusing discount popups, multi-step checkouts, and require fine motor dexterity.',
    candidateBrief: [
      'Understand Senior User Constraints: Declining visual acuity (presbyopia), reduced motor dexterity (hand tremors), cognitive friction with nested menus, fear of fraudulent charges',
      'Identify Key Pain Points: Hard to read small ingredient labels, difficult to search by typing, confusing substitutions when items are out of stock, heavy grocery bags delivery coordination',
      'Design Thoughtful Solutions: Voice-First conversational grocery list ordering ("Order my usual milk and apples"), High-contrast large-touch interface (minimum 24pt fonts, 60px tap targets), "Family Caregiver Co-Pilot" mode (adult children can review or sponsor cart), "Inside-the-Kitchen" delivery assistance option with verified senior-trained couriers',
      'Prioritize accessibility compliance (WCAG AAA) and trust building'
    ],
    keyEvaluationMetrics: ['Physical & Cognitive Senior Accessibility', 'Voice-First UX & High-Contrast Typography', 'Family Caregiver Co-Ordering Feature', 'Delivery Trust & Senior Safety Protocols'],
    suggestedFramework: 'Senior User Physical/Cognitive Constraints -> Core User Journey -> Voice & Simplified Visual UI -> Family Co-Pilot & Delivery Safety -> Success Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Are we designing for independent seniors or assisted-living facilities?', 'Should the app support voice-only ordering for seniors without smartphone literacy?'],
      coreHypothesesOrSegments: ['Typing and navigating nested category trees creates abandonment; voice ordering and repeating "The Usuals" drives retention', 'Family members want visibility to ensure parents are eating nutritious meals'],
      analyticalPath: ['MVP: Simplified high-contrast UI with 1-tap voice ordering, recurring "My Pantry Staples" list, caregiver cart approval, and white-glove inside-home delivery placement'],
      synthesisModel: 'Executive design: A senior-accessible grocery companion featuring voice ordering, large high-contrast visual cards, caregiver co-pilot billing, and trusted inside-the-kitchen delivery.'
    }
  },
  {
    id: 'design-social-app-neighbors',
    track: 'design',
    title: 'Design a social app for neighborhood communities',
    company: 'Nextdoor / CommunityOS',
    companyColor: 'bg-green-700 text-white',
    companyBadge: 'Hyperlocal Social',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a hyperlocal community engagement and mutual-aid platform that fosters genuine trust, safety, and collaboration among physical neighbors while avoiding the toxic complaining typical of existing neighborhood forums.',
    contextBackground: 'Platforms like Nextdoor often devolve into paranoia, racial profiling, lost pet spam, and petty HOA arguments.',
    candidateBrief: [
      'Identify Core User Personas: The Helpful Senior Resident, The Busy Young Parent / Newcomer, The Local HOA / Neighborhood Organizer',
      'Address Existing Platform Flaws: Toxic complaining, fear-mongering security posts, lack of positive real-world interactions',
      'Design Positive Community Engines:',
      '1. "Tool & Skill Lending Library": Borrow lawnmowers, ladders, drills from verified neighbors within 500 meters',
      '2. "Hyperlocal Mutual Aid & Favors": Request quick emergency help (package pickup, dog walk, jumper cables)',
      '3. "Block Party & Local Events Hub": Co-organize yard sales, garden swaps, and cleanups',
      '4. Strict Identity Verification (Postcard / GPS Geo-fencing) and Positive Community Moderation Guidelines'
    ],
    keyEvaluationMetrics: ['Trust & Physical Address Verification', 'Incentivizing Mutual Aid vs Toxic Complaining', 'Tool/Asset Sharing Economics & Safety', 'Community Health & Offline Connection Metrics'],
    suggestedFramework: 'Community Dynamics & Toxic Forum Analysis -> Verified Neighbor Personas -> Positive Interaction Mechanics (Tool Library, Favors, Events) -> Moderation & Trust Architecture',
    benchmarkOutline: {
      clarificationQuestions: ['How is neighborhood boundary defined (e.g. 50-100 homes per micro-block)?', 'How do we verify proof of physical residency? (GPS + Utility bill/postcard).'],
      coreHypothesesOrSegments: ['People don\'t want an open anonymous message board; they want practical utility (borrowing tools, local recommendations, emergency help)', 'Structuring posts around actionable tasks ("Lend/Borrow", "Event", "Favor") eliminates aimless rants'],
      analyticalPath: ['MVP: Micro-neighborhood verified network featuring a searchable Neighborhood Tool Shed, 1-tap favor requests, and an event organizer with zero public grievance feeds'],
      synthesisModel: 'Executive design: A utility-first neighborhood app centered on tool-sharing libraries, micro-favors, and block events, engineered to replace toxic complaint feeds with real-world neighborly collaboration.'
    }
  },
  {
    id: 'design-better-boarding-pass',
    track: 'design',
    title: 'Design a better airline digital boarding pass',
    company: 'Delta / Apple Wallet',
    companyColor: 'bg-blue-800 text-white',
    companyBadge: 'Travel Experience',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Redesign the end-to-end digital mobile boarding pass and airport day-of-travel experience for modern air travelers.',
    contextBackground: 'Current digital boarding passes are static 2D barcodes with cluttered alphanumeric flight codes (e.g. "DL 1422 CLS V SEAT 14B") that fail to guide travelers dynamically through the stress of security, gate changes, and boarding zones.',
    candidateBrief: [
      'Analyze the Day-of-Travel Emotional Journey: Pre-Airport Anxiety -> Security Line Friction -> Terminal Navigation & Gate Finding -> Gate Waiting / Boarding Zone Scramble -> In-Flight Settling',
      'Identify Cluttered Legacy UI Flaws: Critical information (Gate, Boarding Time, Group) buried under marketing loyalty tiers; zero real-time context updates when gates change',
      'Design a Dynamic Context-Aware Boarding Experience:',
      '1. State-Shifting Dynamic UI: Morph display based on airport phase (Shows Security TSA Wait Times -> Morphs to Gate Map -> Morphs to Large High-Brightness Barcode at Gate -> Morphs to Seat Finder & Baggage Carousel upon landing)',
      '2. Live Gate Change & Delay Push Alerts with interactive airport indoor navigation map',
      '3. Boarding Group Countdown Timer (eliminates crowded gate lice behavior)',
      'Define success metrics'
    ],
    keyEvaluationMetrics: ['Day-of-Travel Context-Aware UI States', 'Dynamic Lockscreen / Live Activities Integration', 'Visual Hierarchy & Gate Information Clarity', 'Accessibility & Low-Battery Offline Resilience'],
    suggestedFramework: 'User Airport Journey & Stress Points -> Information Hierarchy Audit -> Contextual State Machine UI -> Live Activities / Hardware Integration -> Success Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Is this inside an airline app or an Apple Wallet / Google Wallet Lock Screen widget?', 'How does the app handle offline / dead battery scenarios? (Offline caching + low power BLE beacon sync).'],
      coreHypothesesOrSegments: ['A boarding pass should not be a static image; it should be a real-time smart travel assistant that shifts information based on GPS/beacon location inside the terminal', 'Visual clarity on Boarding Group, Gate Number, and Seat Row reduces boarding bottlenecks by 20%'],
      analyticalPath: ['MVP: Live Activities lock-screen pass that shifts through 4 distinct visual states: 1) Transit to airport (terminal/traffic), 2) Security (TSA pre-check badge), 3) Gate (countdown & seat group), 4) Boarding (oversized high-contrast QR code + overhead bin guidance)'],
      synthesisModel: 'Executive design: A dynamic, context-aware boarding pass that morphs across your journey from security wait times to indoor terminal directions and high-contrast gate QR codes.'
    }
  },
  {
    id: 'design-book-recommendation-app',
    track: 'design',
    title: 'Design a book recommendation app for casual readers',
    company: 'Goodreads / Spotify Books',
    companyColor: 'bg-amber-700 text-white',
    companyBadge: 'Consumer Discovery',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a modern, delight-driven book discovery and reading tracking app for casual readers (who want to read 6-12 books a year) who find Goodreads clunky, intimidating, and overly academic.',
    contextBackground: 'Goodreads is dominated by hardcore power readers logging 100+ books/year, leading casual readers to feel reading shame and decision paralysis.',
    candidateBrief: [
      'User Personas & Mindsets: The Aspiring Casual Reader (wants to read before bed instead of doomscrolling TikTok), The Mood-Based Reader (picks books based on current vibe or favorite movie/show genre)',
      'Key Friction Points: 500-page book intimidation, sterile star rating reviews, lack of sample previews, losing reading momentum after Chapter 2',
      'Design Core Innovations:',
      '1. "Mood & Vibe Picker": Discover books by aesthetic/mood ("Cozy autumn rainy day mystery", "Fast-paced Silicon Valley thriller")',
      '2. Micro-Sample "Taste Test": Read the first 5 pages instantly in a swipeable vertical feed before committing',
      '3. Reading Streak & Micro-Goals: "10 minutes a day" goal tracking rather than intimidating whole-book quotas',
      '4. Social Book Clubs with audio voice notes from friends',
      'Define North Star Engagement Metrics'
    ],
    keyEvaluationMetrics: ['Casual Reader Psychology vs Hardcore Goodreads Flaws', 'Mood-Based & Media-Comparison Discovery UX', 'Micro-Sample Previews & Frictionless Onboarding', 'Bite-Sized Daily Habit Reinforcement'],
    suggestedFramework: 'Casual Reader Psychology -> Goodreads Deficits -> Discovery Innovation (Mood/Samples) -> Daily Habit Tracking -> Success Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Are we selling/delivering e-books or recommending across physical books, Kindle, and audiobooks?', 'Is the focus on solitary habit formation or social community? (Both).'],
      coreHypothesesOrSegments: ['Casual readers choose entertainment based on emotional vibe, not author pedigree; mood-based tagging drives 3x higher discovery conversion', 'Tracking daily reading minutes (e.g. 15 mins/day) creates habit retention without intimidation'],
      analyticalPath: ['MVP: Swipeable 5-page micro-sample discovery feed, mood-based tags, daily 15-minute timer streak with widget, and bookmark sync with Kindle and local libraries (Libby)'],
      synthesisModel: 'Executive design: A friendly, aesthetic book companion featuring mood-based discovery feeds, 5-page instant taste-tests, and bite-sized 15-minute daily reading habit streaks.'
    }
  },
  {
    id: 'design-dog-walking-service-app',
    track: 'design',
    title: 'Design a dog-walking service app for busy professionals',
    company: 'Rover / Wag!',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Two-Sided Marketplace & Trust',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a premium, on-demand and recurring dog-walking platform connecting busy corporate professionals with certified, vetted dog walkers.',
    contextBackground: 'Dog owners experience severe separation anxiety and lack trust regarding strangers entering their homes and caring for their beloved pets.',
    candidateBrief: [
      'Two-Sided Marketplace Personas: Busy Working Pet Parents (guilt, safety, home access trust) vs Certified Dog Walkers (scheduling, safety, fair wages)',
      'Map Trust & Safety Journey: Walker vetting -> Home key exchange / Smart Lock integration -> Live walk GPS tracking -> Post-walk report card',
      'Design Core Delight Features:',
      '1. Live GPS "Pee & Poo" Map Tracker: Real-time route tracking with photo timestamps whenever the dog relieves itself',
      '2. Secure Smart Lock / Lockbox One-Time Access Integration',
      '3. Walker Body-Cam Live Video Stream: 1-minute live video check-in for anxious owners',
      '4. Comprehensive Post-Walk Report Card: Mood, hydration, energy level, and candid photos',
      'Define Safety SLAs and Trust Metrics'
    ],
    keyEvaluationMetrics: ['Two-Sided Marketplace Balance', 'Trust & Home Access Security Architecture', 'Live Walk Telemetry & Photo Delight UX', 'Walker Vetting & Emergency Protocols'],
    suggestedFramework: 'Marketplace Dynamics -> Trust & Safety Barriers -> Feature Design (GPS Telemetry, Smart Access, Report Cards) -> Vetting & Insurance -> Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Are walks individual 1-on-1 or multi-dog group pack walks?', 'How is home access handled (digital smart locks vs physical key lockboxes)?'],
      coreHypothesesOrSegments: ['Trust is the entire product: if owners feel 100% confident in home access and pet safety, price sensitivity disappears', 'Live GPS tracking and potty-logging provide immediate emotional reassurance during the workday'],
      analyticalPath: ['MVP: Background-checked walker profiles with video intros, smart-lock one-time entry codes, live GPS walk tracking with photo check-ins, and $1M veterinary insurance guarantee'],
      synthesisModel: 'Executive design: A trust-first dog walking marketplace featuring live GPS potty tracking, smart-lock guest pass integration, and interactive post-walk photo report cards.'
    }
  },
  {
    id: 'design-recipe-app-pantry-ingredients',
    track: 'design',
    title: 'Design a recipe app based on available pantry ingredients',
    company: 'SuperCook / NYT Cooking',
    companyColor: 'bg-amber-600 text-white',
    companyBadge: 'Food Tech & Computer Vision',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a mobile kitchen assistant app that generates delicious, healthy home-cooked recipes based strictly on the leftover ingredients and condiments currently sitting in the user\'s fridge and pantry.',
    contextBackground: 'Households waste over 30% of purchased groceries because they don\'t know how to combine disparate leftover ingredients into cohesive meals.',
    candidateBrief: [
      'Understand User Personas: The Frugal Home Cook (wants to avoid food waste and save money), The Exhausted 7 PM Professional (needs a meal in 20 mins without grocery shopping), The Dietary Restrictor (Vegan/Gluten-Free)',
      'Address the Core Friction: Manual ingredient entry is tedious and leads to 80% app onboarding drop-off',
      'Design Frictionless Input & Cooking Experience:',
      '1. Fridge & Pantry AI Camera Scan: Point camera inside the fridge/pantry for instant multi-ingredient visual detection',
      '2. "Missing Ingredient Tolerance Slider": Filter recipes by "Strictly what I have (0 missing)" vs "Requires 1 common pantry item"',
      '3. Step-by-Step Hands-Free Voice Cooking Mode: "Next step", "Set 5 min timer" without touching phone with messy hands',
      '4. Food Expiration Tracker & Waste Reduction Dashboard'
    ],
    keyEvaluationMetrics: ['Ingredient Ingestion Friction Reduction (Computer Vision)', 'Dynamic Recipe Generation & Substitution Logic', 'Hands-Free Cooking UI / Voice Assistant', 'Food Waste & Cost Savings Quantification'],
    suggestedFramework: 'User Personas & Pain Points (Input Friction) -> Computer Vision Pantry Ingestion -> Smart Recipe Matching & Substitutions -> Hands-Free Kitchen UX -> Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Are recipes generated dynamically via Generative AI or matched against a curated chef database?', 'Does the app support dietary restrictions and cooking appliance filters (e.g. Air Fryer only)? (Yes).'],
      coreHypothesesOrSegments: ['Taking photos of fridge shelves is 10x faster than typing 15 ingredients; instant visual parsing is the killer acquisition hook', 'Users need intelligent substitutions (e.g. using yogurt instead of sour cream)'],
      analyticalPath: ['MVP: Multi-item fridge camera scan, recipe matcher with 0-missing ingredient filter, smart ingredient substitution engine, and voice-guided step-by-step cooking timers'],
      synthesisModel: 'Executive design: An AI kitchen companion featuring instant fridge camera scanning, zero-missing-ingredient recipe matching, smart culinary substitutions, and hands-free voice-guided cooking.'
    }
  },
  {
    id: 'design-remote-team-collaboration-tool',
    track: 'design',
    title: 'Design a remote team collaboration tool for informal interactions',
    company: 'Slack / Gather / Figma',
    companyColor: 'bg-purple-600 text-white',
    companyBadge: 'Future of Work',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a digital workplace tool that recreates the spontaneous hallway run-ins, serendipitous coffee-machine chats, and informal team bonding lost in remote and hybrid work environments.',
    contextBackground: 'Scheduled 30-minute Zoom meetings are transactional, formal, and exhausting, causing loneliness and eroding cross-functional social capital.',
    candidateBrief: [
      'Analyze Remote Worker Psychological Needs: Isolation, meeting fatigue ("Zoom dysmorphia"), hesitation to interrupt teammates for quick 2-minute questions, loss of serendipitous bonding',
      'Critique Failed Precedents: Forced "virtual happy hours" (awkward and forced), 24/7 video virtual offices (creepy surveillance vibe)',
      'Design Lightweight, Non-Intrusive Social Mechanics:',
      '1. "Virtual Watercooler Huddles": 5-minute ephemeral audio drop-in channels anchored around coffee breaks or lunch',
      '2. "Asynchronous Micro-Banter & Daily Team Sparks": Lightweight prompt games (e.g. "Show your desk view today", "What music are you coding to?")',
      '3. "Coworking Ambient Focus Rooms": Silent coworking with lofi beats where teammates see active avatar focus status',
      'Define Engagement and Team Well-Being Metrics'
    ],
    keyEvaluationMetrics: ['Remote Isolation vs Forced Fun Trap Understanding', 'Low-Friction Ambient Audio Architecture', 'Psychological Safety & Anti-Surveillance Design', 'Team Social Capital & Cohesion Metrics'],
    suggestedFramework: 'Remote Psychology & Zoom Fatigue Analysis -> The Anti-Forced-Fun Principle -> Ambient Audio & Spontaneous Interaction Features -> Privacy & Autonomy -> Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Is this a standalone desktop app or a plugin within Slack/Microsoft Teams?', 'How do we prevent this from feeling like employee monitoring software? (Strictly opt-in, zero boss telemetry).'],
      coreHypothesesOrSegments: ['Forced video games feel like work obligations; informal bonding must be ambient, lightweight, and low-pressure', 'Ephemeral audio huddles (under 5 minutes) solve 80% of quick alignment without calendar invites'],
      analyticalPath: ['MVP: Lightweight system-tray menu bar app with 1-click ambient audio lounge, daily asynchronous question prompt cards, and opt-in "Coffee Roulette" 10-minute random cross-team matchmaker'],
      synthesisModel: 'Executive design: A non-intrusive desktop companion for remote teams featuring ambient 1-click audio lounges, asynchronous daily visual sparks, and spontaneous 5-minute coffee matchmaker chats.'
    }
  },

  // 10 MORE EASY QUESTIONS (11-20)
  {
    id: 'design-lost-and-found-airports',
    track: 'design',
    title: 'Design a digital lost-and-found system for international airports',
    company: 'Heathrow / Changi / Apple AirTag',
    companyColor: 'bg-sky-700 text-white',
    companyBadge: 'Airport Operations & Computer Vision',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design an end-to-end digital Lost & Found tracking, matching, and repatriation platform for travelers who leave items behind at airport security, gates, or aboard aircraft.',
    contextBackground: 'Over 10,000 items (passports, laptops, jackets, jewelry) are lost weekly at major airport hubs, leading to long physical queues at lost property desks and low recovery rates.',
    candidateBrief: [
      'User Personas: Distressed International Traveler (already boarded flight or left country) vs Airport Security/Cleaning Staff (cataloging hundreds of items rapidly)',
      'System Architecture:',
      '1. Staff Rapid Item Ingestion: Point staff tablet camera at lost item -> AI automatically extracts brand, color, serial number, and generates visual digital tag',
      '2. Traveler Self-Service Filing: Multi-language web form with photo upload and flight boarding pass association',
      '3. Automated Computer Vision & Serial Number Matcher',
      '4. Secure Identity Verification & Global Courier Repatriation Integration (FedEx/DHL delivery to passenger\'s home address)'
    ],
    keyEvaluationMetrics: ['Staff Cataloging Efficiency', 'Computer Vision Item Matching Accuracy', 'International Identity Verification & Fraud Prevention', 'Global Repatriation Logistics Integration'],
    suggestedFramework: 'Two-Sided Process Flow (Staff Ingestion vs Traveler Claim) -> Computer Vision Tagging -> Automated Matching Algorithm -> Repatriation Delivery -> Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does this integrate with airline in-flight lost property or airport terminal only? (Both).', 'Who pays for return shipping? (Passenger pays shipping via integrated checkout).'],
      coreHypothesesOrSegments: ['Manual data entry is the biggest bottleneck; AI image recognition catalogs items in 5 seconds', 'Travelers need secure remote identity proofing (matching laptop wallpaper/passwords or passport names)'],
      analyticalPath: ['MVP: AI-assisted staff photo logging app, traveler self-serve claims portal with image matching, automated email notification upon 90%+ match, and 1-click DHL home delivery dispatch'],
      synthesisModel: 'Executive design: An automated airport lost-and-found ecosystem pairing computer vision intake for staff with self-service traveler claims and integrated global doorstep courier shipping.'
    }
  },
  {
    id: 'design-subscription-manager-app',
    track: 'design',
    title: 'Design a subscription management app to track recurring expenses',
    company: 'Rocket Money / Truebill',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Consumer Fintech',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a personal finance application that automatically identifies, tracks, visualizes, and cancels unused recurring digital subscriptions (Netflix, gym, SaaS, cloud storage).',
    contextBackground: 'The average consumer underestimates their monthly subscription spend by over $100, trapped in "free-trial" renewals and hidden dark-pattern cancellation flows.',
    candidateBrief: [
      'Identify Core User Personas: The Budget Optimizer (wants to cut waste), The Free-Trial Hoarder (forgets to cancel after 7 days), The Shocked Bill-Payer',
      'Map Key Friction Points: Subscriptions hidden across 5 different credit cards/bank accounts, tedious multi-step dark pattern cancellation flows, forgotten annual renewals',
      'Design Core Feature Suite:',
      '1. Plaid Bank & Email Auto-Scan: Instant automated discovery of all recurring debits and renewal receipts',
      '2. "1-Click Subscription Concierge Cancel": App generates and submits cancellation requests on the user\'s behalf',
      '3. Free Trial Virtual Card Shield: Virtual disposable payment cards that auto-freeze before the trial renews',
      '4. Renewal Alert Calendar with price-hike alerts'
    ],
    keyEvaluationMetrics: ['Automated Subscription Discovery Accuracy', '1-Click Cancellation Mechanics & Legal Authorization', 'Virtual Card Free Trial Protection', 'Total Customer Dollar Savings Metric'],
    suggestedFramework: 'User Psychology (Forgotten Spends) -> Bank & Email Ingestion -> 1-Click Cancellation Engine -> Virtual Card Shield -> Success Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['How does the app monetize (freemium with premium savings percentage or flat monthly fee)?', 'Can the app negotiate lower bills on behalf of the user? (Yes).'],
      coreHypothesesOrSegments: ['Users dread navigating complex cancellation dark patterns; having the app cancel subscriptions via power of attorney is the highest-value feature', 'Virtual credit cards permanently prevent accidental trial charges'],
      analyticalPath: ['MVP: Bank feed integration, categorized recurring expense dashboard, 1-tap concierge cancellation assistant, and push alerts 48 hours before any annual renewal charges'],
      synthesisModel: 'Executive design: A proactive subscription manager combining automated bank transaction detection, 1-click concierge cancellation, and disposable virtual cards to eliminate unwanted recurring charges.'
    }
  },
  {
    id: 'design-child-safety-wearable',
    track: 'design',
    title: 'Design a child safety wearable for amusement parks',
    company: 'Disney MagicBand / Apple',
    companyColor: 'bg-purple-600 text-white',
    companyBadge: 'IoT & Child Safety',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a child safety wearable wristband and mobile companion system for parents visiting crowded theme parks, festivals, and public zoos.',
    contextBackground: 'Over 2,000 children get separated from their parents daily in large theme parks, creating sheer panic for parents and operational delays for park security.',
    candidateBrief: [
      'Identify User Needs: Parents (instant location tracking without battery anxiety, geo-fence alerts), Children ages 3-10 (comfortable, waterproof, tear-proof, fun to wear), Park Staff (fast child identification and reunification)',
      'Design Hardware & Connectivity Constraints: GPS + Ultra-Wideband (UWB) for precise indoor/crowd localization, NFC tap badge for park staff, child-proof clasp that cannot be pulled off accidentally',
      'Design Companion App & Real-Time Safety Features:',
      '1. "Digital Leash" Dynamic Geofencing: Alerts parent phone immediately if child moves >20 feet away in a crowd',
      '2. Augmented Reality "Find My Child" Camera Compass (shows directional arrow overlay pointing through crowds)',
      '3. Park Security Emergency Beacon: Instantly broadcasts child photo and last-known location to all park security gates',
      'Define privacy, data encryption, and battery longevity standards'
    ],
    keyEvaluationMetrics: ['Hardware Durability & Child Clasp Ergonomics', 'UWB & Sub-Meter Crowd Tracking Precision', 'Parent Mobile UI & AR Directional Guidance', 'Child Privacy & Data Purge Security'],
    suggestedFramework: 'User Personas (Parent, Child, Security) -> Physical Wearable Hardware Design -> Connectivity Architecture (UWB/BLE) -> Software Emergency & AR Guidance -> Safety Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Is this a park-rented wristband or a personal consumer device brought from home? (Park-issued rental linked to park ticket app).', 'How long must the battery last? (Min 24 hours on single charge).'],
      coreHypothesesOrSegments: ['GPS fails in dense crowds and indoor pavilions; Ultra-Wideband (UWB) is required for directional sub-meter precision', 'Wristband must be impossible for a toddler to unbuckle without a parent key or dual-pinch clasp'],
      analyticalPath: ['MVP: Waterproof silicone UWB wristband, dynamic proximity bluetooth leash, AR camera locator, and 1-tap "Child Lost" security dispatch trigger'],
      synthesisModel: 'Executive design: A durable UWB child wristband paired with an AR directional mobile locator, dynamic proximity geo-fencing, and instant park security emergency dispatch.'
    }
  },
  {
    id: 'design-smart-mirror-clothing-fit',
    track: 'design',
    title: 'Design a smart mirror for retail clothing fitting rooms',
    company: 'Zara / LVMH',
    companyColor: 'bg-zinc-800 text-white',
    companyBadge: 'Retail Tech & AR',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design an interactive smart mirror and digital fitting room experience for flagship fashion retail stores to enhance customer conversion and eliminate fitting room friction.',
    contextBackground: 'Shoppers often leave fitting rooms without buying because an item is the wrong size/color and they do not want to get re-dressed to fetch another size from the sales floor.',
    candidateBrief: [
      'Map In-Fitting-Room Customer Journey: Tucking in tags, checking fit in various lighting, realizing size M is too small, hesitating to call store associate, leaving empty-handed',
      'Design Smart Mirror Hardware & UI:',
      '1. RFID Garment Auto-Detection: Mirror instantly detects garments brought into the stall and displays matching sizes, colors, and styling recommendations on screen',
      '2. "Call for Size / Bring to Room": 1-tap request sends alert to sales associate smartwatch to bring Size L directly to Room #4',
      '3. Adjustable Lighting Presets: Switch mirror lighting between "Daylight Office", "Golden Hour Sunset", and "Dim Evening Dinner"',
      '4. In-Stall Mobile Checkout: Scan QR code on mirror to buy immediately and skip store checkout lines'
    ],
    keyEvaluationMetrics: ['In-Fitting-Room Customer Friction Elimination', 'RFID Multi-Garment Detection UX', 'Store Associate Dispatch & Inventory Integration', 'Privacy (Strictly Optical-Sensor-Free / No Recording Cameras)'],
    suggestedFramework: 'Shopper Journey & Drop-off Points -> Hardware & RFID Interface Design -> Associate Dispatch & Lighting Controls -> Mobile Checkout -> Retail Conversion Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Are there optical cameras inside the fitting room? (Strictly NO cameras for privacy; RFID radio tags only).', 'How do store associates receive requests? (Dedicated staff smartwatch/tablet).'],
      coreHypothesesOrSegments: ['Having to put street clothes back on to find another size kills 60% of fitting room purchases', 'Customizable lighting (e.g. evening dinner vs gym daylight) dramatically boosts buyer confidence'],
      analyticalPath: ['MVP: Full-length RFID-enabled smart touchscreen mirror, ambient lighting selector, associate size-request button, and digital Apple Pay in-room checkout'],
      synthesisModel: 'Executive design: A privacy-first RFID smart fitting room mirror featuring 1-tap associate size dispatch, customizable environmental lighting presets, and frictionless in-stall mobile checkout.'
    }
  },
  {
    id: 'design-public-ev-charging-station',
    track: 'design',
    title: 'Design an intuitive public EV fast-charging station kiosk',
    company: 'Tesla Supercharger / Electrify America',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Clean Energy & Hardware UX',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design an accessible, foolproof public DC fast-charging station kiosk and mobile payment flow that solves the pervasive broken chargers, confusing payment apps, and cable wrestling plaguing non-Tesla EV drivers.',
    contextBackground: 'Over 25% of non-Tesla public charging attempts fail due to broken card readers, app authentication errors, short stiff cables, and cryptic error messages.',
    candidateBrief: [
      'Analyze User Pain Points: 15 different required mobile apps and accounts, payment tap reader failures, heavy rigid charging cables in freezing weather, lack of charging speed transparency, zero shelter from rain',
      'Design Hardware & Physical Ergonomics: Overhead articulating cable arm (takes cable weight off driver\'s hands), High-brightness anti-glare sunlight touchscreen, All-weather canopy with bright status beacon lights (visible from 100m away)',
      'Design Software & Payment Simplicity: Plug & Charge (ISO 15118) automatic billing, Universal tap-to-pay credit card without account registration, Real-time charging curve and cost progress display',
      'Define Station Reliability and Uptime Metrics'
    ],
    keyEvaluationMetrics: ['Physical Cable Ergonomics & Weatherproofing', 'Payment Friction Elimination (Tap-to-Pay / Autocharge)', 'Status Visibility & Error Recovery UX', 'Charger Uptime & Success Rate Metrics'],
    suggestedFramework: 'EV Driver Journey & Frustration Audit -> Physical Kiosk & Cable Ergonomics -> Software UI & Universal Payment Rails -> Station Uptime & Reliability SLA',
    benchmarkOutline: {
      clarificationQuestions: ['Is this designed for all EV brands (CCS / NACS connectors)? (Universal NACS + CCS).', 'How is station maintenance managed? (Real-time automated diagnostic telemetry).'],
      coreHypothesesOrSegments: ['Forcing drivers to download an app and create an account in the rain causes immediate churn; universal credit card tap is mandatory', 'Cable management must support drivers of all physical strengths and accessibility needs'],
      analyticalPath: ['MVP: Articulating overhead cable arm, high-contrast sunlight display, tap-to-pay card reader, overhead status light tower, and 99.5% uptime telemetry'],
      synthesisModel: 'Executive design: A universal, weather-sheltered EV fast charger featuring weightless overhead cable arms, direct tap-to-pay checkout, and clear real-time charging status beacons.'
    }
  },
  {
    id: 'design-medication-tracking-app',
    track: 'design',
    title: 'Design a medication adherence app for chronic patients',
    company: 'PillPack / Apple Health',
    companyColor: 'bg-rose-600 text-white',
    companyBadge: 'Digital Health',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a mobile medication tracker and adherence companion for patients managing 4+ daily prescriptions for chronic illnesses (hypertension, diabetes, cardiac care).',
    contextBackground: '50% of chronic disease patients fail to take medications as prescribed, resulting in $100B+ in preventable emergency hospitalizations annually.',
    candidateBrief: [
      'Patient Personas & Daily Routines: The Polypharmacy Patient (takes 6 pills at different meal times), The Forgetful Busy Professional, The Elderly Patient with complex regimens',
      'Key Friction Points: Pill fatigue, confusing pill names/dosages ("is this the blue round pill or the white oval?"), worrying about drug-drug interactions, forgetting refills until empty',
      'Design Core Capabilities:',
      '1. Pill Bottle Camera Scanner (Scan prescription label for instant schedule population and visual pill photo matching)',
      '2. Contextual Routine Alarms ("Take with breakfast" rather than generic 8:00 AM alarm)',
      '3. Smart Pillbox Hardware Integration (Bluetooth sensor detects when compartment opens)',
      '4. Caregiver & Doctor Shared Adherence Dashboard with 1-tap Pharmacy Refill Sync'
    ],
    keyEvaluationMetrics: ['Prescription Ingestion Simplicity (OCR Scanning)', 'Visual Pill Identification (Color/Shape confirmation)', 'Contextual Routine-Based Reminders', 'Caregiver Accountability Loops'],
    suggestedFramework: 'Chronic Patient Psychology -> Routine Friction & Pill Confusion -> OCR Prescription Setup -> Routine Alarms & Hardware Sync -> Health Adherence Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does the app integrate with pharmacy databases (CVS/Walgreens)? (Yes, via FHIR health API).', 'Are there emergency alert protocols for missed critical doses (e.g. insulin)? (Yes).'],
      coreHypothesesOrSegments: ['Showing exact photos of the pill eliminates anxiety over taking the wrong tablet', 'Alarms tied to personal daily habits (e.g. coffee, dinner) have 40% higher adherence than fixed clock alarms'],
      analyticalPath: ['MVP: Pill bottle OCR scanning, visual pill shape/color verification, smart habit-tied reminders, automated 5-day refill warnings, and caregiver miss-alerts'],
      synthesisModel: 'Executive design: A clinical-grade medication adherence assistant featuring prescription label camera scanning, visual pill verification photos, habit-linked alarms, and pharmacy refill automation.'
    }
  },
  {
    id: 'design-mobile-banking-app-teens',
    track: 'design',
    title: 'Design a mobile banking and financial literacy app for teenagers (13–18)',
    company: 'Greenlight / Step / Revolut',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Youth Fintech',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a debit card and mobile banking app for teenagers (ages 13–18) that teaches real-world budgeting, saving, and investing while providing parents with safe oversight.',
    contextBackground: 'Traditional banks treat teens as passive joint-account holders with boring statements, while teens want autonomy, instant P2P transfers, and gamified financial goals.',
    candidateBrief: [
      'Dual-User Dynamics: The Teen (craves financial independence, wants to buy food/games, learn investing) vs The Parent (wants spending guardrails, chores automation, financial literacy)',
      'Design Core Feature Pillars:',
      '1. Smart Teen Debit Card with customizable card art & Apple Pay support',
      '2. Gamified Automated Savings Goals ("Sneaker Fund", "Car Fund" with parent interest match)',
      '3. Micro-Investing Simulator & Fractional Stock Learning (approved by parents)',
      '4. Chore-to-Allowance Automation and Instant Parent Emergency Money Transfers',
      '5. Parent Safety Guardrails (merchant category blocking: gambling, alcohol, adult content)'
    ],
    keyEvaluationMetrics: ['Teen Autonomy vs Parental Control Balance', 'Financial Literacy Gamification & Micro-Lessons', 'Chore & Savings Goal Mechanics', 'Merchant Category Safety Blocking'],
    suggestedFramework: 'Teen vs Parent Needs Analysis -> Financial Independence Features -> Parental Control Architecture -> Gamified Literacy Modules -> Safety & Retention Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Are teens allowed to trade real fractional stocks with parental approval? (Yes, parent-governed micro-investing).', 'What is the pricing model ($4.99/mo family plan)?'],
      coreHypothesesOrSegments: ['Teens learn by doing: giving them a physical debit card with automated savings buckets builds lifelong financial discipline', 'Parents need real-time notification without micromanaging every $3 bubble tea purchase'],
      analyticalPath: ['MVP: Customizable teen debit card, parent co-pilot app with instant chore payouts, "Save-the-Change" roundups, parent savings interest matches, and merchant category locks'],
      synthesisModel: 'Executive design: An empowering teen banking platform combining a physical debit card, parent-matched savings vaults, chore automation, and bite-sized gamified investing lessons.'
    }
  },
  {
    id: 'design-subway-ticket-kiosk-tourists',
    track: 'design',
    title: 'Design a multilingual subway ticketing kiosk for foreign tourists',
    company: 'MTA / Tokyo Metro / TfL',
    companyColor: 'bg-blue-700 text-white',
    companyBadge: 'Transit Hardware & Kiosk UX',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design an intuitive touchscreen ticketing kiosk for a major international metropolitan subway system (e.g. Tokyo, Paris, or New York) specifically optimized for non-native foreign tourists.',
    contextBackground: 'Foreign tourists face complex zone fare maps, foreign currency confusion, long queues behind rushed locals, and language barriers.',
    candidateBrief: [
      'Understand Tourist Stress Points: Unfamiliar with zone pricing, do not know station names (know landmark: "Eiffel Tower" or "Times Square"), jetlagged, carrying luggage in crowded station',
      'Design Tourist-First Kiosk Hardware & Interface:',
      '1. Instant Visual Language Selection (large country flags + top 15 languages with voice support)',
      '2. "Search by Famous Landmark" instead of obscure station names (e.g. Tap "Louvre Museum" -> kiosk auto-calculates correct route and fare)',
      '3. "Tourist Unlimited Pass" 1-Tap Quick-Buy (1-Day, 3-Day, 7-Day passes prominently featured)',
      '4. Contactless Tap-to-Pay Credit Card & Apple Pay (no foreign currency cash conversion needed)',
      '5. QR Code Receipt: Scan to transfer live subway map and transfer directions directly to smartphone'
    ],
    keyEvaluationMetrics: ['Landmark-Based Destination Navigation', 'Language Accessibility & Visual Simplicity', 'Transaction Speed (Target <30 seconds per user)', 'Tourist Pass Packaging & Mobile Map Hand-Off'],
    suggestedFramework: 'Tourist Mental Model & Transit Anxiety -> Landmark-Based UI Architecture -> Multilingual & Universal Payment Flow -> Mobile Phone Route Hand-Off -> Throughput Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Can tourists tap their phone directly at fare gates (OMNY/Oyster), or do they require physical transit cards/tickets? (Both contactless cards and kiosk ticket issuance).', 'How many languages must be supported? (15+).'],
      coreHypothesesOrSegments: ['Tourists know the landmark they want to visit, not the municipal station name; landmark routing eliminates 80% of kiosk hesitation time', 'Pre-packaged 1-Day/3-Day tourist passes reduce transaction time from 2 minutes to 20 seconds'],
      analyticalPath: ['MVP: 24-inch anti-glare touchscreen, 1-tap language switch, visual landmark destination search, 1-tap multi-day pass purchase, and NFC contactless card reader'],
      synthesisModel: 'Executive design: A welcoming tourist transit kiosk featuring landmark-based routing, instant multi-day pass purchasing, multilingual voice guidance, and mobile QR directions.'
    }
  },
  {
    id: 'design-collaborative-playlist-app',
    track: 'design',
    title: 'Design a collaborative live party playlist app',
    company: 'Spotify / Apple Music',
    companyColor: 'bg-green-600 text-white',
    companyBadge: 'Social Music & Real-Time Sync',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a real-time collaborative social playlist and music queueing application for house parties, road trips, and social gatherings where all guests can participate without fighting over the aux cord.',
    contextBackground: 'Parties suffer from the "Aux Cord Tyrant" (one person playing only their music), guest songs getting skipped abruptly, and dead air between tracks.',
    candidateBrief: [
      'Map Party Dynamics: The Host (owns speakers, wants party energy maintained), The Party Guests (want their favorite tracks played without begging the host), The Vibe Killer (queues obscure slow songs)',
      'Design Core Real-Time Social Music Mechanics:',
      '1. 1-Tap QR Code Guest Join (Zero app download required via web app / Spotify Session)',
      '2. Democratic Song Upvoting & Downvoting Queue (Songs with most guest upvotes move up in queue automatically)',
      '3. "Vibe & BPM Guardrail" (Host sets energy floor: app blocks slow acoustic ballads during high-energy dance hours)',
      '4. "Fair-Share Queueing Algorithm" (Prevents one guest from queueing 10 songs in a row)',
      'Define Engagement and Session Duration Metrics'
    ],
    keyEvaluationMetrics: ['Frictionless Guest Onboarding (QR Join)', 'Democratic Queueing & Upvote Mechanics', 'Vibe Protection & Fair-Share Queueing Algorithms', 'Host Control & Veto Powers'],
    suggestedFramework: 'Party Social Dynamics & Aux Cord Friction -> Frictionless QR Guest Onboarding -> Democratic Voting & Queueing Algorithm -> Host Vibe Controls -> Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does every guest need a paid Spotify account to vote? (No, host hosts the session; guests join via free web link).', 'Is there cross-fading and automated transition between songs? (Yes).'],
      coreHypothesesOrSegments: ['Requiring guests to download an app kills participation; a lightweight web-app QR join ensures 100% room participation', 'An automated fair-share queue algorithm prevents any single user from dominating the party music'],
      analyticalPath: ['MVP: Host launches session on speaker, guests scan table QR code to search and upvote tracks, automated democratic queue plays highest-voted song next, host retains instant skip veto'],
      synthesisModel: 'Executive design: A democratic party music queue where guests scan a QR code to search and upvote songs in real-time, protected by fair-share queue algorithms and host vibe guardrails.'
    }
  },
  {
    id: 'design-indoor-mall-navigation-app',
    track: 'design',
    title: 'Design an indoor navigation app for mega shopping malls',
    company: 'Westfield / Google Maps Indoor',
    companyColor: 'bg-rose-600 text-white',
    companyBadge: 'Indoor Mapping & AR Navigation',
    difficulty: 'Easy',
    targetDurationMinutes: 25,
    problemStatement: 'Design a mobile indoor navigation and shopping companion app for massive multi-level shopping centers (200+ stores across 4 floors) that guides shoppers directly to stores, restrooms, and their parked car.',
    contextBackground: 'GPS satellite signals do not penetrate concrete mall structures, leaving shoppers lost, wandering multiple floors, and struggling to find specific brand stores or their parked vehicle.',
    candidateBrief: [
      'Understand Shopper Frustrations: Multi-floor confusion, broken physical directory kiosks, cannot locate restrooms/elevators with strollers, forgetting where the car is parked in massive multi-story garages',
      'Technical Positioning Architecture: BLE Beacons + Wi-Fi RTT + AR Visual Inertial Odometry for sub-meter multi-floor indoor positioning',
      'Design Core Feature Suite:',
      '1. AR Live View Walking Arrows (Look through phone camera to see floating 3D arrows directing you to Zara on Floor 3)',
      '2. "Accessible Stroller / Wheelchair Route" (Navigates exclusively via elevators, skipping escalators and stairs)',
      '3. "Smart Multi-Store Route Planner" (Calculates the most efficient walking path to visit 4 stores without backtracking)',
      '4. 1-Tap "Find My Parked Car" Navigation'
    ],
    keyEvaluationMetrics: ['Indoor Multi-Floor Positioning Architecture', 'AR Camera Wayfinding UX', 'Accessibility & Stroller Routing Modes', 'Multi-Store Trip Optimization'],
    suggestedFramework: 'Shopper Journey & Lost Navigation Pain Points -> Indoor Positioning Tech (BLE/AR) -> Feature Design (AR Live View, Floor Selector, Stroller Mode) -> Parked Car Locator -> Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['How does the app detect floor level transitions? (Barometric pressure sensors + BLE beacon triangulation).', 'Can users search for specific items or stores only? (Stores, categories, restrooms, ATMs, and baby changing stations).'],
      coreHypothesesOrSegments: ['2D flat maps fail when navigating 5 floors; AR camera arrows overlaying the physical mall corridor make wayfinding effortless', 'Forgetting where the car is parked is the #1 exit frustration'],
      analyticalPath: ['MVP: Multi-floor searchable directory, AR camera walking directions, step-free accessibility toggle, real-time parking spot pin, and promotional store discount pins along walking route'],
      synthesisModel: 'Executive design: An AR-powered indoor mall navigator providing multi-level 3D camera wayfinding, step-free accessible routes, multi-store trip optimization, and parked car return guidance.'
    }
  },

  // ==========================================
  // 🟡 MEDIUM (15 Questions)
  // ==========================================
  {
    id: 'design-digital-whiteboard-remote-teams',
    track: 'design',
    title: 'Design a digital whiteboard tool for distributed engineering teams',
    company: 'Miro / FigJam',
    companyColor: 'bg-amber-600 text-white',
    companyBadge: 'Technical Collaboration',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design a collaborative real-time digital architecture whiteboarding tool tailored specifically for distributed software engineering teams conducting system design reviews, database schema modeling, and sprint retrospectives.',
    contextBackground: 'Generic whiteboards (Miro) are great for sticky notes, but lack technical diagramming primitives (UML, AWS architecture components, live code execution, git versioning).',
    candidateBrief: [
      'Engineer Persona Needs: Staff System Architect (draws complex microservice diagrams), Frontend/Backend Engineers (database ERDs, sequence diagrams), Agile Scrum Master (sprint retros)',
      'Identify Technical Friction: Drawing arrows between 50 microservices is tedious; diagrams go out-of-date with production code immediately; no live data simulation',
      'Design Core Technical Innovations:',
      '1. "Code-to-Diagram & Diagram-to-Code Sync" (Type Mermaid/PlantUML syntax or draw visually with instant bidirectional sync)',
      '2. Cloud Infrastructure Stencil Hub with Live Cost Estimator (Connecting an AWS RDS to EC2 icon calculates estimated monthly AWS infrastructure cost live)',
      '3. Interactive API Sequence Simulator (Send a mock payload through the diagram to visualize microservice request/response hops)',
      '4. Git Version Control for Architecture Diagrams'
    ],
    keyEvaluationMetrics: ['Engineering-Specific Diagramming Primitives', 'Bidirectional Code-to-Canvas Sync (Mermaid/PlantUML)', 'Live Infrastructure Cost & Packet Simulation', 'Git Architecture Versioning'],
    suggestedFramework: 'Engineering Workflow & Persona Needs -> Technical Diagramming Deficits -> Technical Feature Architecture -> Live Cloud & Code Integrations -> Success Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does the tool integrate directly with GitHub/GitLab repositories for architecture documentation? (Yes).', 'Is there real-time multiplayer cursor collaboration? (Yes, WebGL canvas).'],
      coreHypothesesOrSegments: ['Engineers hate manually dragging boxes; typing syntax (Mermaid) and having it render a clean editable vector diagram saves 70% diagramming time', 'Simulating request payloads live through an architecture diagram reveals design bottlenecks before writing code'],
      analyticalPath: ['MVP: Multiplayer infinite canvas, Mermaid syntax bidirectional editor, AWS/GCP cloud stencil library with live pricing, and 1-click Markdown export into GitHub PRs'],
      synthesisModel: 'Executive design: A code-aware engineering canvas bridging visual architecture diagramming with Mermaid syntax sync, live cloud cost estimation, and interactive microservice payload simulation.'
    }
  },
  {
    id: 'design-ai-personal-finance-coach',
    track: 'design',
    title: 'Design an AI personal finance coach for Gen-Z',
    company: 'Cleo / Copilot / Mint',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Conversational Fintech & AI',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design an empathetic, proactive AI personal finance companion for Gen-Z entering the workforce (ages 18–25) that transforms boring budget spreadsheets into actionable, conversational financial habits.',
    contextBackground: 'Traditional budgeting apps (Mint) provide backward-looking guilt charts after money is already spent, failing to change daily impulsive spending behavior.',
    candidateBrief: [
      'Gen-Z Financial Psychology: Anxiety over inflation and housing, impulse buying via TikTok Shop/Klarna, living paycheck-to-paycheck, preferring conversational chat over pie charts',
      'Design Proactive & Contextual AI Interventions:',
      '1. "Safe-to-Spend Daily Allowance" (Calculates true discretionary cash available today after rent, bills, and emergency savings are protected)',
      '2. Pre-Purchase Sanity Check Bot ("Can I afford these $140 sneakers without sacrificing my festival ticket?")',
      '3. "Roast Me or Praise Me" Tone Customization (Humorous, brutally honest banter that resonates with Gen-Z culture)',
      '4. Automated "Paycheck Splitting Vaults" (Instant auto-routing 20% to savings upon direct deposit)',
      'Define Financial Health & Retention Metrics'
    ],
    keyEvaluationMetrics: ['Gen-Z Financial Behavior & BNPL Realities', 'Proactive Pre-Purchase Guidance vs Backward Reporting', 'Conversational AI Persona & Tone Calibration', 'Automated Paycheck Splitter Mechanics'],
    suggestedFramework: 'Gen-Z Financial Mental Model -> Flaws of Traditional Budgeting -> Conversational AI Features (Safe-to-Spend, Pre-Purchase Bot) -> Gamified Vaults -> Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does the app have access to real-time bank transactions via open banking/Plaid? (Yes).', 'Can the AI execute money transfers autonomously? (With user approval).'],
      coreHypothesesOrSegments: ['Showing a pie chart after a user overspends creates shame and app deletion; giving a single "Safe-to-Spend Today" number guides real-time decisions', 'Conversational AI persona with playful banter drives 4x higher daily engagement than dry financial graphs'],
      analyticalPath: ['MVP: Real-time bank sync, single dynamic "Safe-to-Spend" widget, WhatsApp/iMessage conversational chat assistant, and automated pay-day savings sweep'],
      synthesisModel: 'Executive design: A conversational AI financial coach that replaces complex spreadsheets with a dynamic "Safe-to-Spend Today" allowance, pre-purchase sanity checks, and customizable playful banter.'
    }
  },
  {
    id: 'design-job-search-platform-gig-workers',
    track: 'design',
    title: 'Design a job search and shift-matching platform for blue-collar gig workers',
    company: 'Instawork / Jobandtalent',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Labor Marketplace & Fintech',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design a mobile-first shift-matching and instant-payout platform for hourly blue-collar workers (hospitality, warehouse, retail, event staffing) to find verified flexible shifts within 5 miles.',
    contextBackground: 'Hourly workers struggle with unpredictable schedules, multi-week wage payment delays, deceptive job postings, and long transit times between fragmented gigs.',
    candidateBrief: [
      'Worker Persona & Core Priorities: Hourly Warehouse/Hospitality Worker (prioritizes: exact hourly wage, location transit time, guaranteed immediate payout after shift ends)',
      'Employer Persona: Restaurant / Warehouse Manager (needs vetted, reliable staff within 2 hours to cover sudden call-outs)',
      'Design High-Trust Marketplace Features:',
      '1. 1-Tap Shift Claiming (No lengthy resume submissions; verified skill badges & background check unlocks instant booking)',
      '2. "Instant Same-Day Payout" (GPS clock-out triggers immediate wage transfer to digital debit card within 5 minutes)',
      '3. Transparent Shift Cards (Display exact net pay, location transit bus route, required attire, and supervisor rating)',
      '4. Reliability Score & Worker Perks (Showing up on time boosts rating and unlocks higher-paying VIP shifts)'
    ],
    keyEvaluationMetrics: ['Hourly Worker Needs (Instant Pay, Commute Transparency)', 'Frictionless Shift Claiming vs Resume Applications', 'Instant Wage Settlement & Financial Inclusion', 'Two-Sided Reliability & No-Show Penalties'],
    suggestedFramework: 'Two-Sided Worker/Employer Needs -> Shift Discovery & Transit Transparency -> Instant Wage Payout Engine -> Reliability & Reputation Scoring -> Marketplace Liquidity Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Is this for permanent W2 hourly jobs or on-demand 1099/flexible shifts? (Flexible on-demand shifts with temp-to-perm pathways).', 'How is worker skill verified (e.g. Forklift certified, Bartender)? (Digital credential upload + in-app micro-assessments).'],
      coreHypothesesOrSegments: ['Blue-collar hourly workers care primarily about: 1) How much do I make? 2) How do I get there? 3) When do I get paid?', 'Instant same-day wage payout increases shift completion rates by 45%'],
      analyticalPath: ['MVP: Verified profile with credential badges, shift feed with transit commute filters, 1-tap shift claim, GPS check-in/out, and 5-minute post-shift instant debit payout'],
      synthesisModel: 'Executive design: A mobile shift marketplace for hourly workers offering transparent pay, public transit filters, 1-tap shift booking, and guaranteed instant same-day wage payouts.'
    }
  },
  {
    id: 'design-video-streaming-low-bandwidth',
    track: 'design',
    title: 'Design a video streaming app for emerging markets with poor connectivity',
    company: 'YouTube Go / Netflix Lite',
    companyColor: 'bg-red-600 text-white',
    companyBadge: 'Emerging Market Tech',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design a lightweight video streaming application optimized for users in rural and emerging markets with low-cost $50 smartphones, intermittent 2G/3G connectivity, and expensive prepaid mobile data limits.',
    contextBackground: 'Over 2 billion smartphone users face daily data caps, frequent network drops, and device storage constraints (<16GB total storage).',
    candidateBrief: [
      'Technical & User Constraints: Low RAM devices (1-2GB), intermittent cellular signals, extreme cost per megabyte of data, sharing devices within families',
      'Design Architectural & Product Innovations:',
      '1. Ultra-Lightweight App Binary (<10 MB install size with zero background bloat)',
      '2. "Data-First Previewer" (Hover to see animated GIF preview + exact file download size in MB before playing)',
      '3. Peer-to-Peer Offline Video Sharing (Send downloaded videos to nearby friends over local Wi-Fi Direct without consuming any cellular data)',
      '4. Scheduled Nighttime Auto-Downloads (Automatically downloads selected queue at 2:00 AM when telecom providers offer free nighttime data)',
      '5. Adaptive Audio-Only Mode for unstable connectivity'
    ],
    keyEvaluationMetrics: ['Emerging Market Device & Network Constraints', 'Data Consumption Transparency & User Control', 'P2P Offline Local Transfer (Wi-Fi Direct)', 'App Performance on Low-RAM Hardware'],
    suggestedFramework: 'Emerging Market User Realities -> Performance & Data Constraints -> Feature Suite (Data Previews, P2P Sharing, Off-Peak Downloads) -> Optimization Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Are videos monetized via ads or local micropayments/carrier billing?', 'Does the app support local micro-SD card storage? (Yes).'],
      coreHypothesesOrSegments: ['Data cost anxiety is the #1 barrier to watching video; making every MB explicit empowers users to stream without fear of depleting their balance', 'Offline peer-to-peer sharing creates exponential organic virality without telecom bandwidth costs'],
      analyticalPath: ['MVP: 8MB APK app size, multi-resolution download selector, SD card support, local Wi-Fi Direct offline transfer, and scheduled off-peak auto-download manager'],
      synthesisModel: 'Executive design: A resilient video platform engineered for emerging markets featuring transparent per-video MB counters, P2P local offline video sharing, and scheduled nighttime off-peak downloads.'
    }
  },
  {
    id: 'design-learning-platform-adhd-students',
    track: 'design',
    title: 'Design an online learning platform for students with ADHD',
    company: 'Coursera / Duolingo / NeuroBridge',
    companyColor: 'bg-violet-600 text-white',
    companyBadge: 'Neurodiversity & EdTech',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design a digital learning and study management platform specifically engineered for high school and college students with ADHD and executive function challenges.',
    contextBackground: 'Traditional e-learning platforms (dense 60-minute video lectures, static text syllabi, long deadlines) trigger ADHD paralysis, hyperfocus burnouts, and procrastination.',
    candidateBrief: [
      'Neurodiverse Psychological Profile: Executive dysfunction (trouble starting tasks), time blindness, dopamine-seeking brain, vulnerability to sensory overload, shame spirals from missed deadlines',
      'Design Neuro-Inclusive Learning Mechanisms:',
      '1. "Micro-Chunking Engine" (Breaks down 5-page essays or 45-minute lectures into 4-minute interactive bite-sized milestones)',
      '2. "Body Doubling" Virtual Study Rooms (Live silent video/avatar coworking with a focus buddy to overcome task initiation inertia)',
      '3. Visual Time-Blindness Timer (Color-depleting visual disc timer showing time disappearing rather than abstract numbers)',
      '4. Dopamine Reward Loops with "Anti-Shame Deadline Rescheduling" (Allows painless deadline resets without guilt penalties)'
    ],
    keyEvaluationMetrics: ['ADHD Psychology & Executive Function Understanding', 'Micro-Chunking & Task Initiation Mechanics', 'Visual Time Perception & Body Doubling Tools', 'Anti-Shame Retention Architecture'],
    suggestedFramework: 'ADHD Cognitive Profile & Learning Obstacles -> Task Initiation & Time Blindness Solutions -> Interactive Micro-Learning UI -> Social Body Doubling -> Success Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Is this for K-12 schooling, university curriculum, or self-paced adult upskilling? (University and high school academic work).', 'Does it integrate with Canvas / Google Classroom LMS? (Yes).'],
      coreHypothesesOrSegments: ['The hardest step for an ADHD student is starting the task (task paralysis); providing a 2-minute "micro-start" prompt bridges the initiation barrier', 'Visualizing time as a shrinking colored circle prevents time-blindness panic'],
      analyticalPath: ['MVP: LMS integration, automated AI assignment micro-chunker, visual Pomodoro countdown timers, 24/7 virtual study buddy rooms, and dynamic streak protection'],
      synthesisModel: 'Executive design: A neuro-inclusive study platform designed for ADHD learners featuring AI task micro-chunking, visual time-blindness timers, virtual body-doubling study lounges, and anti-shame deadline rescheduling.'
    }
  },

  // 10 MORE MEDIUM QUESTIONS (6-15)
  {
    id: 'design-digital-passport-identity-travel',
    track: 'design',
    title: 'Design a digital passport and identity verification system for international travelers',
    company: 'IATA / CLEAR / Apple Wallet',
    companyColor: 'bg-blue-800 text-white',
    companyBadge: 'Identity & Biometrics',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design an interoperable digital passport and biometric identity ecosystem that allows international air travelers to navigate check-in, border customs control, and boarding gates seamlessly without showing physical paper documents.',
    contextBackground: 'International border crossing requires juggling physical passports, visas, vaccination cards, and boarding passes, leading to massive airport bottlenecks and document forgery risks.',
    candidateBrief: [
      'Analyze Multi-Stakeholder Ecosystem: International Travelers, Border Control & Immigration Authorities, Airlines, Airport Security (TSA/Interpol)',
      'Design Secure Cryptographic & Biometric Architecture: Cryptographically verified digital credential stored in Secure Enclave (ICAO standards), Facial biometric one-to-many boarding verification, Zero-Knowledge Proofs for visa/age validation (proves eligibility without revealing passport number)',
      'Design Traveler Mobile Experience: Pre-travel visa & health declaration auto-sync, 1-tap biometric enrollment at home using passport NFC chip scan, Offline encrypted emergency pass backup',
      'Address Privacy, Sovereign Government Compliance, and Device Theft Security'
    ],
    keyEvaluationMetrics: ['ICAO Cryptographic Security & Zero-Knowledge Architecture', 'Facial Biometric Seamless Travel Corridor', 'International Interoperability Across Sovereign Border Systems', 'Privacy & Data Protection Compliance (GDPR)'],
    suggestedFramework: 'Multi-Stakeholder Requirements -> Cryptographic & Biometric Infrastructure -> Traveler Touchpoints (Check-In, Customs, Boarding) -> Privacy & Sovereign Security -> Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does the system comply with ICAO Digital Travel Credential (DTC) standards? (Yes).', 'What is the fallback for passengers without smartphones? (Physical passport biometric kiosks).'],
      coreHypothesesOrSegments: ['Biometric facial recognition at departure gates eliminates physical document checks, reducing boarding time from 35 mins to 12 mins per flight', 'Zero-knowledge proofs protect citizen privacy while satisfying foreign immigration queries'],
      analyticalPath: ['MVP: Passport NFC phone-scan enrollment, encrypted ICAO digital credential, biometric airport seamless lane integration, and automated visa status verification'],
      synthesisModel: 'Executive design: A sovereign-compliant digital travel credential leveraging smartphone NFC passport verification, zero-knowledge proofs, and curb-to-gate biometric facial recognition.'
    }
  },
  {
    id: 'design-smart-waste-management-smart-cities',
    track: 'design',
    title: 'Design an IoT smart waste management system for municipal smart cities',
    company: 'CleanCity / Cisco IoT',
    companyColor: 'bg-emerald-700 text-white',
    companyBadge: 'Smart Cities & IoT',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design an integrated IoT sensor hardware, logistics routing, and citizen engagement platform for municipal city governments to eliminate overflowing public trash bins and optimize garbage collection truck routes.',
    contextBackground: 'Municipal garbage trucks follow rigid static routes daily, wasting fuel visiting empty bins while other neighborhood dumpsters overflow, creating health hazards and citizen complaints.',
    candidateBrief: [
      'Stakeholder Ecosystem: Municipal Waste Department Leadership, Sanitation Truck Drivers, Commercial Businesses, Everyday Urban Citizens',
      'Design IoT Hardware & Sensor Architecture: Solar-powered optical ultrasonic fill-level sensors + odor/temperature fire detectors retrofitted onto public and residential dumpsters',
      'Design Driver & Dispatch Dynamic Routing Engine: Central dashboard uses real-time bin telemetry to generate dynamic AI truck collection routes (visits only bins >80% full, saving 35% fuel)',
      'Design Citizen Mobile App: Snap photo of illegal dumping or broken bin with instant GPS ticket tracking, earn municipal tax rebates for verified recycling sorting'
    ],
    keyEvaluationMetrics: ['IoT Sensor Telemetry & Battery Life Engineering', 'Dynamic Route Optimization Algorithm (Fuel & Labor Savings)', 'Sanitation Driver In-Cab Navigation UX', 'Citizen Engagement & Recycling Incentives'],
    suggestedFramework: 'Smart City Ecosystem & Operational Waste Inefficiencies -> IoT Sensor Hardware Specs -> Dynamic Dispatch & Driver Routing Engine -> Citizen Reporting App -> City KPI Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['How are the sensors powered (solar + 5-year lithium battery)?', 'Does the system handle commercial industrial waste and public sidewalk bins? (Both).'],
      coreHypothesesOrSegments: ['Shifting from static scheduled garbage routes to dynamic fill-level routing slashes municipal fuel consumption and emissions by 30-40%', 'Citizen photo-reporting with public resolution status builds civic trust and cleans up illegal dump sites'],
      analyticalPath: ['MVP: Ultrasonic dumpster fill sensors, driver tablet dynamic navigation app, municipal supervisor dashboard with predictive fill heatmaps, and citizen reporting app with geotagging'],
      synthesisModel: 'Executive design: A municipal smart waste platform combining solar IoT fill-level sensors on dumpsters, dynamic AI garbage truck route dispatch, and citizen photo reporting.'
    }
  },
  {
    id: 'design-b2b-procurement-marketplace',
    track: 'design',
    title: 'Design a B2B procurement marketplace for restaurant kitchen supplies',
    company: 'Toast / Choco / Sysco',
    companyColor: 'bg-amber-700 text-white',
    companyBadge: 'B2B Commerce & Supply Chain',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design a mobile-first B2B wholesale procurement marketplace connecting independent restaurant head chefs and owners with regional produce, meat, seafood, and kitchen dry-goods distributors.',
    contextBackground: 'Chefs spend 2 hours every night at 1:00 AM leaving chaotic voicemails and text messages to 8 different food distributors with fluctuating prices and stock shortages.',
    candidateBrief: [
      'User Personas & Midnight Workflows: The Exhausted Head Chef (ordering at 1 AM in a loud kitchen), The Restaurant General Manager (budgets, invoices, food cost margins), The Wholesale Food Distributor (managing perishable inventory & morning delivery cutoffs)',
      'Design Core Product Capabilities:',
      '1. Universal Digital Order Sheet (Combines all 8 suppliers into a single 1-tap checkout screen)',
      '2. Real-Time Price Comparison & Perishable Freshness Guarantees',
      '3. 1:00 AM Voice & Photo Quick-Ordering (Speak order into app: "5 crates Roma tomatoes, 2 bags flour" -> AI auto-populates cart)',
      '4. Automated Invoice Reconciliation & Food Cost Margin Alerts (Syncs with POS to alert if tomato prices rose 20%)',
      'Define Marketplace GMV and Order Accuracy Metrics'
    ],
    keyEvaluationMetrics: ['Chef Nighttime Workflow Optimization', 'Multi-Vendor Unified Order Orchestration', 'Voice/Photo Quick Reordering Mechanics', 'Restaurant POS & Food Cost Integration'],
    suggestedFramework: 'Restaurant Procurement Pain Points -> Chef & Distributor Personas -> Unified Order Sheet & Voice Ordering -> Invoice & Price Volatility Tools -> Marketplace Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does the marketplace handle delivery logistics or integrate existing distributor truck fleets? (Distributor fleet delivery with marketplace tracking).', 'How are credit terms (Net-30/60) handled? (Integrated B2B fintech credit underwriting).'],
      coreHypothesesOrSegments: ['Chefs refuse complex desktop procurement software; the app must allow completing full nightly orders in under 3 minutes on a smartphone', 'Consolidating supplier invoices into a single digital statement saves restaurant managers 10 hours/week'],
      analyticalPath: ['MVP: Multi-vendor mobile order sheet, voice-to-cart ordering, real-time cutoff countdown timers, supplier delivery confirmation, and automated Net-30 invoice reconciliation'],
      synthesisModel: 'Executive design: A mobile B2B restaurant supply marketplace that consolidates multiple food distributors into a 3-minute voice-enabled nightly order sheet with automated invoice reconciliation.'
    }
  },
  {
    id: 'design-virtual-doctor-consultation-app',
    track: 'design',
    title: 'Design a virtual telemedicine and doctor consultation experience',
    company: 'Teladoc / One Medical',
    companyColor: 'bg-cyan-700 text-white',
    companyBadge: 'Telehealth & Clinical UX',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design a comprehensive virtual primary care and telemedicine consultation platform for patients and doctors that delivers clinical diagnostic rigor while eliminating the cold, clunky feel of standard video calls.',
    contextBackground: 'Current telehealth platforms are often glorified Zoom calls with zero diagnostic peripherals, frustrating digital waiting rooms, and disjointed post-consultation pharmacy prescriptions.',
    candidateBrief: [
      'Patient & Physician Personas: Anxious Sick Patient (needs quick diagnosis and clear treatment plan) vs Overburdened Physician (needs efficient charting, accurate vitals, and EHR integration)',
      'Design Thoughtful Clinical Journey:',
      '1. Interactive AI Symptom Intake & Photo Diagnostic Prep (Patient answers adaptive medical questions and uploads high-res photos of rashes/throat before call starts)',
      '2. "No-Surprise" Virtual Waiting Room (Displays exact doctor queue position and medical history review status)',
      '3. In-Call Clinical Workspace (Split-screen video with ambient AI clinical note-taker so doctor maintains eye contact instead of typing notes)',
      '4. 1-Click Prescription Dispatch to Local Pharmacy & Digital Sick Note Generator'
    ],
    keyEvaluationMetrics: ['Clinical Diagnostic Intake Rigor', 'Physician Charting Burden Elimination (Ambient AI)', 'Patient Waiting Room Transparency', 'EHR & E-Prescription Integration'],
    suggestedFramework: 'Clinical Care Journey -> Patient & Doctor Needs -> Pre-Consultation Diagnostic Intake -> In-Call Ambient Workspace -> Post-Consultation Prescription Care -> Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Is this platform HIPAA / GDPR compliant for medical data encryption? (Strictly compliant).', 'Does it integrate home health IoT devices (e.g. smart blood pressure cuffs, pulse oximeters)? (Yes).'],
      coreHypothesesOrSegments: ['Doctors spending 50% of the video call typing notes destroys patient trust; ambient AI medical scribe lets physicians focus entirely on the patient', 'Structured pre-call symptom triage reduces consultation duration by 30% while improving diagnostic accuracy'],
      analyticalPath: ['MVP: Adaptive pre-call intake questionnaire, transparent queue tracker, HD video with real-time AI transcription/EHR auto-fill, and instant e-prescription routing'],
      synthesisModel: 'Executive design: A clinical-grade telemedicine platform combining adaptive pre-call AI symptom triage, ambient physician documentation, and seamless e-prescription dispatch.'
    }
  },
  {
    id: 'design-language-learning-app-speech',
    track: 'design',
    title: 'Design an AI conversational language tutor focused on spoken fluency',
    company: 'Duolingo / Speak / Babbel',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'AI Speech & EdTech',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design an AI-powered conversational language learning app specifically built to help intermediate language learners overcome the fear of speaking and achieve real-world conversational fluency.',
    contextBackground: 'Traditional language apps (Duolingo) focus on multiple-choice vocabulary drills and grammar translation, leaving learners unable to speak naturally in real-world conversations due to social anxiety and pronunciation insecurity.',
    candidateBrief: [
      'Understand the "Fluency Chasm": Learners know vocabulary in writing, but freeze when speaking due to fear of making mistakes, slow mental translation, and lack of speaking partners',
      'Design Immersive Conversational Speech Architecture:',
      '1. "Real-World Roleplay Scenarios" (Order tapas in Madrid, negotiate a salary in Tokyo, check into a boutique hotel in Paris with responsive AI personas)',
      '2. Real-Time Phoneme Pronunciation Visualizer (Pinpoints exact mouth/tongue positioning mistakes rather than generic "try again")',
      '3. "Gentle Speaking Safety Net" (Shows hint cards in real-time if learner pauses for >3 seconds)',
      '4. Post-Conversation Review Breakdown: Grammar optimizations, vocabulary upgrades, and fluency pace score'
    ],
    keyEvaluationMetrics: ['Speech Anxiety Mitigation & Psychology', 'Realistic Conversational AI Scenario Design', 'Phoneme-Level Pronunciation Feedback UX', 'Spoken Fluency Progression Metrics'],
    suggestedFramework: 'Speech Anxiety & The Fluency Chasm -> Conversational Roleplay Engine -> Real-Time Pronunciation Feedback -> Post-Session Actionable Coaching -> Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Is this targeting beginners or intermediate learners who already know basic grammar? (Intermediate learners struggling with speaking).', 'Does the app use real-time speech-to-speech LLMs? (Yes, sub-500ms voice latency).'],
      coreHypothesesOrSegments: ['Practicing with a non-judgmental AI speaking partner eliminates the social embarrassment of speaking broken language with humans', 'Giving phoneme-specific mouth positioning tips fixes accents 5x faster than audio replays'],
      analyticalPath: ['MVP: Interactive voice roleplay scenarios, low-latency conversational AI engine, real-time confidence hint cards, and granular phoneme pronunciation visualizer'],
      synthesisModel: 'Executive design: A conversational AI speech tutor that builds real-world language fluency through anxiety-free interactive roleplays, instant phoneme pronunciation feedback, and adaptive speaking prompts.'
    }
  },
  {
    id: 'design-smart-home-energy-monitor',
    track: 'design',
    title: 'Design a smart home energy management dashboard for homeowners',
    company: 'Tesla Powerwall / Nest',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Clean Tech & Home Energy',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design a mobile smart energy management and automation dashboard for homeowners with rooftop solar panels, home battery storage, EV chargers, and smart appliances.',
    contextBackground: 'Homeowners are overwhelmed by volatile time-of-use electricity pricing, complex solar net metering, and disconnected smart device apps, missing out on hundreds of dollars in energy savings.',
    candidateBrief: [
      'Understand Homeowner Goals: Minimize monthly utility bill, maximize solar self-consumption, maintain backup battery power for storm outages, track carbon footprint reduction',
      'Design Comprehensive Energy Operating System:',
      '1. Real-Time Energy Flow Visualizer (Live animated diagram showing Solar Generation -> Battery Storage -> Home Usage -> Grid Feed-in)',
      '2. AI "Cost-Optimized Auto-Scheduler" (Automatically runs dishwasher and charges EV at 2:00 AM when grid power is cheapest or solar is peaking)',
      '3. "Storm Watch Outage Shield" (Auto-detects severe weather warnings and charges home battery to 100% before storms hit)',
      '4. Dollar Savings & Grid Arbitrage Tracker (Visualizes exactly how much money solar and battery stored/saved this month)'
    ],
    keyEvaluationMetrics: ['Real-Time Multi-Source Energy Flow UX', 'Automated Tariff Arbitrage Optimization (EV/Appliances)', 'Storm Outage Resilience Logic', 'Dollar Savings Financial Quantification'],
    suggestedFramework: 'Home Energy Ecosystem -> User Mental Model & Bill Confusion -> Real-Time Energy Flow Architecture -> Automated AI Optimization Engine -> Savings & Impact Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does the app integrate across multiple hardware brands (Enphase, Tesla, SolarEdge) or proprietary ecosystem? (Universal standard).', 'Can the system sell stored power back to the grid during peak pricing? (Yes, Virtual Power Plant participation).'],
      coreHypothesesOrSegments: ['Homeowners do not want to constantly monitor kilowatt-hours; they want set-and-forget automation that automatically minimizes their electricity bill', 'Showing live dollar savings creates ongoing daily engagement with clean energy'],
      analyticalPath: ['MVP: Live energy flow diagram, AI smart appliance/EV auto-charging scheduler, storm backup trigger, and monthly financial savings report card'],
      synthesisModel: 'Executive design: A smart home energy operating system that visualizes real-time power flows and automates battery/EV charging around time-of-use utility rates to maximize dollar savings.'
    }
  },
  {
    id: 'design-freelancer-tax-invoicing-app',
    track: 'design',
    title: 'Design an automated tax and invoicing app for solo freelancers',
    company: 'QuickBooks / Found / Lili',
    companyColor: 'bg-indigo-600 text-white',
    companyBadge: 'Freelance Fintech & Tax',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design a financial companion application for independent freelancers and 1099 contractors that automates client invoicing, expense deduction tracking, and quarterly estimated tax payments.',
    contextBackground: 'Freelancers lose thousands in missed business tax write-offs and face panic every quarter calculating complex estimated self-employment taxes across multiple income streams.',
    candidateBrief: [
      'Freelancer Persona Needs: Graphic Designer / Consultant (hates accounting, receives erratic payments from multiple clients, terrified of IRS audits, misses tax write-offs)',
      'Design Core Product Suite:',
      '1. 1-Tap Professional Invoice Builder with Stripe/ACH Payment Links and Automated Polite Overdue Payment Chasers',
      '2. "Swipe-to-Categorize" Tax Deductions (Tinder-style swipe on daily bank transactions: Swipe Right for Business Expense, Left for Personal)',
      '3. Real-Time "Tax Vault Auto-Withholding" (Automatically sets aside 25-30% of every incoming client invoice into a locked tax savings pocket)',
      '4. 1-Click Quarterly Estimated Tax Filing & Direct IRS Payment'
    ],
    keyEvaluationMetrics: ['Freelancer Cash Flow & Tax Anxiety Understanding', 'Swipe-to-Categorize Expense UX', 'Automated Tax Withholding Vaults', 'Invoicing & Automated Payment Reminders'],
    suggestedFramework: 'Freelance Financial Pain Points -> Invoicing & Receivables Engine -> Tax Deduction & Expense Tracking -> Automated Quarterly Tax Filing -> Success Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does the app file taxes directly with the IRS or generate a Schedule C report for accountants? (Both).', 'Does it support international multi-currency client billing? (Yes).'],
      coreHypothesesOrSegments: ['Freelancers fail to save for taxes because gross income sits in their checking account; auto-withholding 28% into a hidden sub-account eliminates tax season panic', 'Polite automated payment reminders increase invoice on-time payment by 40%'],
      analyticalPath: ['MVP: Invoicing with embedded payment link, bank account sync with swipeable tax categorization, real-time estimated tax calculation, and automated quarterly tax savings bucket'],
      synthesisModel: 'Executive design: An all-in-one freelance financial app featuring automated client invoicing, swipeable tax write-off categorization, and automatic paycheck tax withholding.'
    }
  },
  {
    id: 'design-accessible-smart-tv-interface',
    track: 'design',
    title: 'Design an accessible smart TV interface for visually impaired users',
    company: 'Apple TV / Roku / Samsung',
    companyColor: 'bg-zinc-800 text-white',
    companyBadge: 'Accessibility & Hardware Interface',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design a smart TV operating system and remote control navigation experience specifically engineered for visually impaired, legally blind, and low-vision viewers.',
    contextBackground: 'Modern smart TV home screens are wall-to-wall cluttered video thumbnails, tiny subtitles, complex nested menus, and flat buttonless glass remotes that are impossible to navigate without sight.',
    candidateBrief: [
      'Understand Vision Impairments: Total blindness (relies 100% on screen reader audio), Low vision / Macular degeneration (needs ultra-high contrast, large fonts, customizable color filters), Tunnel vision',
      'Design Hardware Remote Innovations: Tactile distinct physical buttons with Braille/relief markings, High-performance voice control button, Gyroscopic haptic feedback',
      'Design Accessible Software OS Innovations:',
      '1. "Audio Description Hub" (Curated carousel highlighting shows with certified professional audio description tracks)',
      '2. Intelligent Screen Reader with Spatial Audio Cues (Earcon sounds indicate menu edges, scroll stops, and category shifts)',
      '3. High-Contrast Focus Rings & Zoom Loupe Mode',
      '4. Conversational Voice Search ("Play the latest episode of Succession with Audio Description")'
    ],
    keyEvaluationMetrics: ['Vision Accessibility Standards (WCAG AAA / Section 508)', 'Tactile Hardware Remote vs Screen Reader Integration', 'Audio Description Content Discovery', 'Spatial Earcon Sound Design'],
    suggestedFramework: 'Visual Impairment User Needs -> Tactile Remote Hardware Ergonomics -> Accessible OS & Screen Reader Architecture -> Audio Description Discovery -> Usability Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Is this an operating system for third-party TV OEMs or a dedicated set-top box? (Smart TV OS platform).', 'How is voice search triggered? (Physical tactile remote mic button or hands-free wake word).'],
      coreHypothesesOrSegments: ['Flat touch-glass remotes are unusable for blind users; distinct tactile raised geometric buttons are essential', 'Audio description tracks are usually buried 4 layers deep in audio settings; bringing them to the forefront makes entertainment accessible'],
      analyticalPath: ['MVP: Tactile high-contrast remote, spatial audio earcon screen reader, 1-tap voice navigation, dedicated Audio Description movie channel, and customizable high-contrast UI themes'],
      synthesisModel: 'Executive design: An accessible smart TV platform combining tactile raised-button remotes, spatial audio navigation cues, high-contrast zoom interfaces, and first-class Audio Description content discovery.'
    }
  },
  {
    id: 'design-campus-safety-app-university',
    track: 'design',
    title: 'Design a campus safety and emergency response app for university students',
    company: 'LiveSafe / University Safety',
    companyColor: 'bg-red-700 text-white',
    companyBadge: 'Safety & Emergency Tech',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design a mobile campus safety and emergency assistance app for university students walking home late at night or experiencing emergencies on a large collegiate campus.',
    contextBackground: 'Blue emergency light poles across campus are fixed in place, and dialing 911 takes critical seconds while failing to broadcast precise building/floor coordinates to campus police.',
    candidateBrief: [
      'Student Personas & Scenarios: The Late-Night Library Commuter (walking through dark quad feeling followed), The Student in Immediate Danger (needs silent discreet SOS), The Bystander (wants to report an incident anonymously)',
      'Design Core Emergency Features:',
      '1. "Virtual Campus SafeWalk Escort" (Select destination -> friends or campus security monitor your real-time walking route until safe arrival; triggers alert if stationary for 60s or off-path)',
      '2. "Silent Discreet SOS" (Press power button 3 times in pocket to trigger silent campus police dispatch with live microphone audio stream and sub-meter indoor GPS pin)',
      '3. Emergency Blue-Light Beacon Route Optimizer (Navigation maps routes that stay along well-lit paths with active security cameras)',
      '4. Anonymous Tip Reporting with photo/video upload'
    ],
    keyEvaluationMetrics: ['Discreet & Rapid Emergency Trigger UX', 'Virtual Walk Escort Route Telemetry', 'Campus Police Indoor Localization Integration', 'Student Trust & Anti-False-Alarm Guardrails'],
    suggestedFramework: 'Campus Safety Scenarios & Fear Analysis -> Discreet Trigger Mechanics -> Virtual Walk Escort System -> Campus Police Dispatch Integration -> Safety Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does the app integrate directly with university campus police dispatch CAD systems? (Yes).', 'How do we prevent accidental false alarms? (5-second countdown with gentle vibration cancel).'],
      coreHypothesesOrSegments: ['Students in danger cannot pull out a bright phone screen to unlock and tap 3 buttons; silent physical pocket triggers save lives', 'Virtual friend escorts provide peace of mind during everyday late-night library walks'],
      analyticalPath: ['MVP: Virtual SafeWalk GPS escort with friend/security sync, 3-click power button silent SOS, well-lit campus routing map, and 1-tap emergency dial with instant indoor building telemetry'],
      synthesisModel: 'Executive design: A campus safety ecosystem featuring virtual friend-escort walk tracking, well-lit route navigation, and silent in-pocket SOS triggers connected directly to campus police dispatch.'
    }
  },
  {
    id: 'design-collaborative-trip-planning-app',
    track: 'design',
    title: 'Design a collaborative travel itinerary and expense splitting app for friend groups',
    company: 'Wanderlog / Splitwise / Airbnb',
    companyColor: 'bg-rose-600 text-white',
    companyBadge: 'Travel & Group Planning',
    difficulty: 'Medium',
    targetDurationMinutes: 30,
    problemStatement: 'Design an all-in-one collaborative trip planning, interactive itinerary, and group expense splitting application for groups of 4–10 friends organizing vacations together.',
    contextBackground: 'Group trips are notoriously stressful, managed across chaotic 400-message WhatsApp group chats, disconnected Google Docs itineraries, and bitter arguments over Splitwise receipts weeks later.',
    candidateBrief: [
      'Group Travel Roles: The "Trip Leader" (overburdened organizer doing all research), The "Easy-Going Participant" (wants to vote on dinner spots without making spreadsheets), The "Budget-Conscious Friend"',
      'Design Unified Group Planning Workflow:',
      '1. Collaborative Interactive Map-Itinerary (Drop restaurant/activity pins onto an interactive day-by-day map that auto-clusters nearby attractions to minimize transit time)',
      '2. Democratic "Group Polls & Vibe Voting" (Vote on Airbnb options or activities with instant consensus rankings)',
      '3. Automatic Multi-Currency Expense Splitting with Receipt OCR (Snap receipt photo -> AI assigns drinks to Alex and pasta to Maya -> auto-settles debt via Venmo/Revolut)',
      '4. Shared Flight & Hotel Booking Confirmation Hub'
    ],
    keyEvaluationMetrics: ['Group Collaboration & Consensus Mechanics', 'Map-Clustered Itinerary Optimization', 'Receipt OCR & Multi-Currency Expense Settlement', 'Friction Reduction for Group Organizer'],
    suggestedFramework: 'Group Travel Chaos & Role Analysis -> Collaborative Itinerary & Map Engine -> Democratic Voting UX -> Integrated Expense Splitting -> Retention & NPS Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does the app handle in-app bookings for tours and flights or organize external confirmations? (Syncs external email confirmations + links to direct booking).', 'How are uneven expense splits handled? (Itemized receipt assignment).'],
      coreHypothesesOrSegments: ['Organizing itineraries by geographical map clusters prevents wasting 3 hours crisscrossing a city', 'Combining itinerary planning with real-time expense splitting in one app eliminates the need for 4 separate apps'],
      analyticalPath: ['MVP: Real-time multiplayer map itinerary, group voting polls, email confirmation auto-import, and receipt scanning with 1-tap Venmo/Splitwise balance settlement'],
      synthesisModel: 'Executive design: A collaborative group travel planner uniting real-time map-based itinerary building, democratic group activity voting, and automated itemized receipt expense splitting.'
    }
  },

  // ==========================================
  // 🔴 HARD (15 Questions)
  // ==========================================
  {
    id: 'design-operating-system-autonomous-cars',
    track: 'design',
    title: 'Design the in-cabin operating system and passenger experience for Level-5 fully autonomous robotaxis',
    company: 'Waymo / Apple Car',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Autonomous Mobility & In-Cabin OS',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design the complete interior in-cabin digital operating system, passenger trust visualization interface, and multisensory environment for a steering-wheel-free Level-5 autonomous vehicle.',
    contextBackground: 'In a car with no driver and no steering wheel, passenger psychology shifts from active driving to passive vulnerability. Passengers experience motion sickness, anxiety over vehicle intent, and need productive or restful interior modes.',
    candidateBrief: [
      'Deconstruct Passenger Psychology & Trust Hierarchy: Foundational Safety Trust (Why did the car stop? Did it see that pedestrian?) -> Route & Journey Control -> Productivity / Entertainment / Rest',
      'Design The "Vehicle Intent & World Visualization" Display: Real-time lidar/camera augmented reality render showing the car\'s perception boundary, upcoming lane changes, pedestrian awareness, and safety reasoning',
      'Design Dynamic Interior Cabin Modes:',
      '1. "Mobile Executive Office Mode" (Fold-out desk, directional noise-cancelling acoustic bubble for private conference calls, screen casting)',
      '2. "Sanctuary Rest & Sleep Mode" (Dimmed circadian ambient lighting, lie-flat seat recline, soothing soundscape with motion-sickness mitigation)',
      '3. "Immersive Entertainment / Gaming Theater Mode"',
      'Design Emergency & Edge-Case Passenger Overrides: "Pull Over Safely Now" physical button, 24/7 Live Remote Fleet Specialist video concierge, Route modification'
    ],
    keyEvaluationMetrics: ['Autonomous Trust Architecture & Intent Visualization', 'Motion Sickness Mitigation Ergonomics', 'Multi-Modal Cabin Experience Switching (Work/Rest/Play)', 'Safety Override & Remote Human Support Fail-Safes'],
    suggestedFramework: 'Passenger Psychological Hierarchy -> Vehicle Intent & Trust Visualization -> Multi-Modal Interior Experiences -> Safety Override Architecture -> Autonomous Journey Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Are there physical steering controls or is the vehicle 100% purpose-built without a steering wheel? (Purpose-built robotaxi).', 'How do passengers interact (voice, touchscreen, personal phone app)? (Multimodal touch + conversational voice).'],
      coreHypothesesOrSegments: ['Passenger anxiety spikes during unexpected stops; visualizing the car\'s perception of pedestrians and obstacles on passenger displays builds immediate calm', 'Without forward-facing road attention, motion sickness increases by 3x; dynamic horizon lighting and acoustic cues eliminate vestibular disorientation'],
      analyticalPath: ['MVP: 3D perception intent display, conversational AI voice assistant, 1-tap "Pull Over at Nearest Safe Curb" control, ambient noise-cancelling zones, and seamless mobile phone profile sync'],
      synthesisModel: 'Executive design: A trust-first autonomous in-cabin OS featuring real-time 3D vehicle intent visualizations, motion-sickness-mitigating adaptive acoustic environments, and 1-tap emergency roadside pull-over controls.'
    }
  },
  {
    id: 'design-brain-computer-interface-paralysis',
    track: 'design',
    title: 'Design a Brain-Computer Interface (BCI) software operating system for paralyzed patients',
    company: 'Neuralink / Synchron',
    companyColor: 'bg-purple-900 text-white',
    companyBadge: 'Neurotech & Deep BCI',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design the user interface, neural intent decoding workflow, and assistive operating system for patients with severe quadriplegia and ALS communicating via an implanted or non-invasive Brain-Computer Interface (BCI).',
    contextBackground: 'Paralyzed patients experience extreme cognitive fatigue when interacting with assistive tech. Traditional eye-trackers fail with involuntary blinks and cause severe eye strain, while raw BCI neural signals are noisy with high latency.',
    candidateBrief: [
      'Understand Clinical & Neural Constraints: High cognitive load of sustained motor imagery, noisy EEG/neural spike data, latency between neural intent and cursor action, involuntary tremors/fatigue',
      'Design Intent Decoding & Error-Tolerant UI Architecture:',
      '1. "Radial Neural Target Selection" (Large circular targets mapped to basic directional motor intents rather than fine-pixel mouse dragging)',
      '2. "Predictive Thought-to-Speech Engine" (LLM predicts full sentences from 2 decoded keyword intents, increasing typing speed from 5 WPM to 35 WPM)',
      '3. "Neural Click Confirmation" (Differentiates casual thought from committed action using deliberate neural dwell threshold)',
      '4. Emergency Medical Distress Beacon (Instantly triggers nurse call on high-intensity sustained neural focus)'
    ],
    keyEvaluationMetrics: ['Neural Decoding Latency & Error Tolerance', 'Cognitive Fatigue Reduction UX', 'Predictive Conversational Speech Synthesis', 'Patient Autonomy & Emergency Safety SLAs'],
    suggestedFramework: 'Clinical Constraints & Cognitive Load Analysis -> Neural Input Paradigm (Motor Imagery vs Radial Selection) -> Predictive Language Architecture -> Assistive Smart Home Integration -> Patient Quality-of-Life Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Is this an invasive cortical array (Neuralink/Utah) or endovascular stentrode (Synchron)? (High-bandwidth motor cortex decoding).', 'What everyday devices does the patient need to control? (Smartphone, wheelchair, speech synthesizer, smart home lights/doors).'],
      coreHypothesesOrSegments: ['Pixel-by-pixel cursor navigation exhausts patients in 10 minutes; coarse radial intent selection paired with generative LLM intent completion enables hours of comfortable communication', 'The system must have zero false-positive emergency alerts while guaranteeing 100% reliable distress triggers'],
      analyticalPath: ['MVP: Radial thought menu, high-speed predictive text-to-speech communicator, smart-home IoT environmental control, and continuous background neural calibration'],
      synthesisModel: 'Executive design: An error-tolerant BCI operating system leveraging coarse radial neural intent mapping and predictive generative language modeling to restore high-speed communication and environmental autonomy to paralyzed individuals.'
    }
  },
  {
    id: 'design-augmented-reality-glasses-os',
    track: 'design',
    title: 'Design the core interaction model and spatial OS for everyday AR smart glasses',
    company: 'Apple Vision / Meta Orion / Snap',
    companyColor: 'bg-sky-600 text-white',
    companyBadge: 'Spatial Computing & AR Glasses',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design the spatial user interface, interaction paradigm (eye tracking + micro-gestures + voice), and notification glanceability for lightweight, all-day wearable Augmented Reality (AR) glasses.',
    contextBackground: 'Heavy VR UI concepts (giant floating 2D windows, reach-and-grab hand waving) cause arm fatigue ("gorilla arm"), social embarrassment in public, and obscure real-world peripheral vision.',
    candidateBrief: [
      'Design Principles for All-Day Wearable AR: "Glanceable & Ephemeral", "Zero Social Embarrassment in Public", "Zero Occlusion of Real-World Safety Hazards", "Minimal Battery & Thermal Footprint"',
      'Design Multi-Modal Spatial Interaction Paradigm:',
      '1. "Micro-Hand Gestures via EMG Wristband" (Subtle finger taps in pocket or by hip: index-to-thumb tap selects, thumb-swipe scrolls with zero arm raising)',
      '2. "Eye-Gaze Intention Detection with Dwell Suppression"',
      '3. "Contextual Peripheral UI Anchoring" (Notifications appear subtly in upper peripheral vision and dismiss automatically when looking away)',
      '4. "World-Anchored Spatial Holograms" (Turn-by-turn walking arrows painted onto physical pavement; translations pinned directly over foreign signs)'
    ],
    keyEvaluationMetrics: ['Gorilla Arm Prevention & Micro-Gesture Ergonomics', 'Field-of-View (FOV) Information Density', 'Real-World Safety & Visual Distraction Mitigation', 'Context-Aware Environmental AI (Multi-Modal Vision)'],
    suggestedFramework: 'Spatial Wearable Constraints -> Multi-Modal Input Hierarchy (EMG Micro-Gestures + Gaze + Voice) -> Glanceable UI State Machine -> Environmental World-Anchoring -> Public Usability Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['What is the field of view (~50° diagonal FOV in a standard optical waveguide frame)?', 'How are interactions performed without looking weird in public? (Subtle finger micro-gestures on an EMG neural wristband).'],
      coreHypothesesOrSegments: ['Raising hands in the air to swipe virtual screens is fatiguing and socially awkward; EMG wristband micro-gestures by the side of the leg provide discreet, effortless control', 'Notifications must be contextual and ephemeral, vanishing the instant real-world attention is required'],
      analyticalPath: ['MVP: Gaze + EMG finger-pinch micro-interaction, glanceable heads-up notifications, world-locked pedestrian AR navigation arrows, and live optical sign translation'],
      synthesisModel: 'Executive design: A discreet spatial operating system for AR glasses powered by eye-gaze targeting, imperceptible EMG finger micro-gestures, and context-aware ephemeral holograms.'
    }
  },
  {
    id: 'design-ai-agent-air-traffic-control',
    track: 'design',
    title: 'Design an AI-human co-pilot interface for Air Traffic Controllers (ATC)',
    company: 'FAA / Raytheon / Boeing',
    companyColor: 'bg-slate-900 text-white',
    companyBadge: 'Mission-Critical Systems',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design a safety-critical AI decision support system and radar display interface for Air Traffic Controllers managing 40+ simultaneous aircraft landings, takeoffs, and storm avoidance vectors during peak airport congestion.',
    contextBackground: 'ATC controllers work under extreme cognitive stress. System errors risk catastrophic loss of life, while poorly designed AI creates "automation complacency" or alerts that controllers silence due to false alarms.',
    candidateBrief: [
      'Analyze High-Stakes Cognitive Workload: Spatial 3D airspace visualization, high radio frequency voice congestion, rapid conflict resolution under 15-second decision windows',
      'Design Human-in-the-Loop AI Collaboration Architecture:',
      '1. "Predictive 4D Trajectory Conflict Predictor" (Identifies collision loss-of-separation risks 8 minutes in advance with transparent reasoning)',
      '2. "Recommended Vector Solutions with 1-Click Approval" (AI proposes optimal heading/altitude alteration that resolves conflict without cascading into adjacent sectors)',
      '3. "Automated Pilot Voice Readback Verifier" (Listens to radio frequency and instantly flags if a pilot misunderstood an altitude clearance)',
      '4. "Dynamic Cognitive Workload Balancer" (Auto-detects controller fatigue/pupil dilation and recommends sector handoffs)'
    ],
    keyEvaluationMetrics: ['Safety-Critical Human-in-the-Loop Architecture', 'Explainable AI Decision Recommendations (XAI)', 'Radio Frequency Voice Readback Verification', 'False Alarm Suppression & Cognitive Ergonomics'],
    suggestedFramework: 'ATC Cognitive Workflow & Disaster Risks -> Conflict Prediction & Transparent AI Reasoning -> Controller UI & 1-Click Voice Clearance -> Fail-Safe Redundancies -> Safety SLAs',
    benchmarkOutline: {
      clarificationQuestions: ['Does the AI execute autonomous flight commands or provide advisory recommendations to the human controller? (Advisory with human authorization).', 'What is the required system uptime? (99.9999% six-nines mission critical).'],
      coreHypothesesOrSegments: ['AI must never be a black box in aviation; every vector recommendation must visually show the projected separation margin and storm clearance path', 'Automated audio listening to pilot readbacks eliminates the #1 cause of runway incursions (pilot mishearing runway numbers)'],
      analyticalPath: ['MVP: 3D trajectory conflict alert radar, 1-click proposed resolution vectoring, real-time pilot radio readback speech-verification banner, and emergency wake-vortex collision avoidance alerts'],
      synthesisModel: 'Executive design: A mission-critical ATC co-pilot combining predictive 4D trajectory conflict detection, explainable vector resolution recommendations, and real-time radio readback speech verification.'
    }
  },
  {
    id: 'design-deep-sea-submarine-exploration-ui',
    track: 'design',
    title: 'Design the navigation, sensor, and robotic arm control UI for a deep-sea research submarine',
    company: 'NOAA / Woods Hole Oceanographic',
    companyColor: 'bg-cyan-900 text-white',
    companyBadge: 'Extreme Environment UI',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design the cockpit heads-up display, multi-beam sonar sensor visualization, and haptic robotic manipulator interface for marine scientists operating a manned research submarine at 4,000 meters depth.',
    contextBackground: 'At 4,000 meters depth, there is total darkness, 400 atmospheres of crushing pressure, zero GPS/radio propagation through water, and delicate deep-sea specimen sampling requiring surgical precision.',
    candidateBrief: [
      'Extreme Operational Environment Constraints: Pitch black visibility, acoustic positioning lag, spatial disorientation, extreme cold, fine motor fatigue during 8-hour dive missions',
      'Design Multi-Sensor Cockpit Interface:',
      '1. "Synthetic Vision & 3D Bathymetric Sonar Map" (Reconstructs real-time 3D seafloor topography and hydrothermal vents using multi-beam sonar)',
      '2. "Force-Feedback Haptic Manipulator Controls" (Allows pilot to physically \'feel\' specimen fragility through robotic arm claws when collecting deep-sea coral)',
      '3. "Life Support & Hull Integrity Heads-Up HUD" (Oxygen, CO2 scrubbing, battery power, and acoustic comms beacon status)',
      '4. Acoustic Positioning Navigation (Inertial dead-reckoning + ultra-short baseline acoustic beacons)'
    ],
    keyEvaluationMetrics: ['Extreme Environmental Constraint Adaptation', 'Synthetic Vision & Sonar 3D Mapping UX', 'Haptic Force-Feedback Robotic Manipulator Control', 'Mission-Critical Life Support HUD & Emergency Protocols'],
    suggestedFramework: 'Deep-Sea Physics & Pilot Constraints -> Sensor Fusion (Sonar, Laser, Video) -> Haptic Robotic Teleoperation -> Life Support Critical HUD -> Mission Safety Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Are pilots operating inside a pressurized titanium sphere? (Yes, 3-person crew).', 'How is robotic arm feedback communicated? (Haptic force-resistance gloves + laser grid visual overlays).'],
      coreHypothesesOrSegments: ['Optical headlights only illuminate 10 meters in murky water; synthetic vision rendering sonar bathymetry allows pilots to navigate deep ocean canyons without blind collisions', 'Force-feedback haptic gloves prevent crushing fragile biological specimens'],
      analyticalPath: ['MVP: Real-time 3D sonar synthetic ocean floor map, haptic robotic arm manipulator with tactile force feedback, unified life-support telemetry HUD, and acoustic modem text communications'],
      synthesisModel: 'Executive design: An extreme-environment deep-sea submarine cockpit uniting 3D sonar synthetic vision for zero-visibility navigation with haptic force-feedback robotic manipulator sampling controls.'
    }
  },

  // 10 MORE HARD QUESTIONS (6-15)
  {
    id: 'design-disaster-emergency-mesh-network',
    track: 'design',
    title: 'Design an offline emergency disaster communication and rescue platform',
    company: 'Red Cross / FEMA / Starlink',
    companyColor: 'bg-rose-700 text-white',
    companyBadge: 'Disaster Recovery & Mesh Networks',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design a resilient peer-to-peer mobile application and first-responder coordination platform for disaster zones (earthquakes, hurricanes) where cellular towers, power grids, and internet backhauls are completely destroyed.',
    contextBackground: 'Following catastrophic natural disasters, victims are trapped without cell service, while first responders operate blind without real-time casualty heatmaps or infrastructure damage data.',
    candidateBrief: [
      'Severe Physical Constraints: Zero cellular reception, dead internet, rapidly draining phone batteries, debris physical hazards, medical triage urgency',
      'Design Peer-to-Peer Offline Mesh Communication Architecture:',
      '1. Bluetooth Low Energy & Wi-Fi Direct Multi-Hop Mesh (Messages hop securely phone-to-phone across up to 30 intermediate devices until reaching a satellite terminal or rescue station)',
      '2. "Ultra-Low Power Beacon Mode" (Turns off phone screen and broadcasts BLE SOS packet every 30 seconds with 5-day battery life)',
      '3. First Responder Triage Dashboard (Rescue helicopters and drones flying overhead collect mesh packets and render live survivor location heatmaps)',
      '4. Offline First-Aid & Water Purification Interactive Guides'
    ],
    keyEvaluationMetrics: ['Zero-Infrastructure P2P Mesh Network Protocol UX', 'Extreme Battery Conservation Engineering', 'First Responder Triage Prioritization (START triage system)', 'Offline Geographic Map Storage'],
    suggestedFramework: 'Disaster Failure Modes -> P2P Multi-Hop Mesh Networking -> Ultra-Low Power SOS Protocols -> First Responder Tactical Dashboard -> Rescue Operations Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['How do mesh messages travel without internet? (Multi-hop BLE / Wi-Fi Direct mesh hopping between citizen smartphones).', 'How are emergency medical priorities categorized? (Standard Red/Yellow/Green/Black triage flags).'],
      coreHypothesesOrSegments: ['Assuming internet connectivity in a disaster is a fatal flaw; true resilience requires multi-hop peer-to-peer ad-hoc mesh networking', 'Phones buried under rubble must be able to beacon their GPS coordinates for 96+ hours on 15% battery'],
      analyticalPath: ['MVP: P2P Bluetooth mesh chat, 1-tap SOS distress beacon with medical status, offline vector terrain map, and airborne drone mesh-relay packet harvester'],
      synthesisModel: 'Executive design: A zero-infrastructure disaster communication network leveraging multi-hop smartphone Bluetooth mesh protocols, ultra-low-power survivor beacons, and airborne tactical triage heatmaps.'
    }
  },
  {
    id: 'design-robotic-surgery-cockpit',
    track: 'design',
    title: 'Design the surgeon console cockpit and AR visualization for robotic surgery',
    company: 'Intuitive Surgical (da Vinci) / Medtronic',
    companyColor: 'bg-blue-900 text-white',
    companyBadge: 'Surgical Robotics & AR',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design the next-generation surgeon teleoperation console, 3D holographic stereoscopic visualization, and haptic robotic instrument controls for multi-port robotic laparoscopic and cardiac surgeries.',
    contextBackground: 'Surgeons endure severe physical and cognitive fatigue during 6-hour robotic procedures. Accidental tissue damage can be fatal, while lack of tactile haptic feedback makes suturing delicate arteries hazardous.',
    candidateBrief: [
      'Surgeon Ergonomics & Surgical Stress: Neck/eye fatigue from fixed eyepieces, lack of haptic resistance (cannot feel tissue stiffness), tremor elimination, managing multi-arm robotic instruments (cautery, graspers, endoscope)',
      'Design High-Precision Surgical Cockpit Suite:',
      '1. 3D Stereoscopic High-Definition Organ Visualization with Real-Time Tumor Margin AR Overlay (Overlay pre-op MRI/CT scan directly over live camera tissue)',
      '2. "Haptic Force-Feedback & Virtual Safety Geofence" (Robot arm provides physical resistance if surgeon attempts to move blade within 2mm of a critical nerve or artery)',
      '3. Motion-Scale Micro-Claw Teleoperation (Translates 10cm hand motion to 1mm micro-surgical motion with sub-millimeter tremor cancellation)',
      '4. Voice-Controlled Operating Room Orchestration ("Adjust overhead light", "Zoom endoscope 2x")'
    ],
    keyEvaluationMetrics: ['Zero-Latency Teleoperation Ergonomics', 'Pre-Op CT/MRI AR Overlay Alignment', 'Haptic Force-Feedback & Safety Boundary Geofences', 'Tremor Elimination & Sub-Millimeter Precision'],
    suggestedFramework: 'Surgical Risk & Ergonomic Pain Points -> 3D Holographic Stereoscopic Visuals -> Haptic Force-Resistance & Virtual Fixtures -> Voice OR Orchestration -> Clinical Outcomes Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does the console feature stereoscopic 3D vision? (Yes, 4K 3D binocular display).', 'How are safety geofences determined? (AI models pre-op CT scans and locks robotic scalpel from puncturing labeled arteries).'],
      coreHypothesesOrSegments: ['Surgeons rely on tactile feedback; restoring artificial haptic stiffness feedback reduces surgical tissue tearing by 60%', 'Superimposing 3D tumor vascular margins onto the live camera prevents incomplete resections'],
      analyticalPath: ['MVP: Ergonomic 3D stereoscopic viewer, haptic master tool controllers, AR organ/vascular overlays, virtual safety boundary locks, and seamless assistant foot pedal integration'],
      synthesisModel: 'Executive design: A next-gen surgical robotics console pairing 3D stereoscopic vision and real-time vascular AR overlays with haptic force-feedback safety geofences that prevent accidental arterial tears.'
    }
  },
  {
    id: 'design-enterprise-cybersecurity-soc-dashboard',
    track: 'design',
    title: 'Design an AI-powered Security Operations Center (SOC) threat triage platform',
    company: 'CrowdStrike / Palo Alto Networks',
    companyColor: 'bg-red-800 text-white',
    companyBadge: 'Enterprise Cybersecurity & AI',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design a modern cybersecurity incident detection, attack graph visualization, and automated remediation platform for SOC analysts overwhelmed by 50,000 daily security alerts.',
    contextBackground: 'Tier-1 security analysts suffer extreme "alert fatigue," missing critical zero-day ransomware breaches hidden among mountains of benign firewall noise.',
    candidateBrief: [
      'SOC Analyst Pain Points: 50,000 raw daily alerts, disjointed logs (Splunk, AWS CloudTrail, endpoint EDR), 45-minute manual correlation per incident, burnout and high turnover',
      'Design Threat Triaging & Autonomous Defense Engine:',
      '1. "AI Attack Graph Storyline" (Correlates 400 disparate alert logs into a single visual attack timeline showing: Phishing Email -> Credential Theft -> Lateral Movement -> Domain Controller Access)',
      '2. "Blast-Radius & Impact Visualizer" (Instantly maps which servers, databases, and customer records are compromised)',
      '3. "1-Click Autonomous Playbook Remediation" ("Isolate Host #44, Revoke Okta Session, Block IP on Firewall" with 1-click execution)',
      '4. Dynamic Risk-Prioritized Incident Queue'
    ],
    keyEvaluationMetrics: ['Alert Fatigue Reduction & Clustering Accuracy', 'Visual Attack Graph & Blast Radius UX', '1-Click Automated Playbook Orchestration (SOAR)', 'Mean Time to Detect (MTTD) & Respond (MTTR) Optimization'],
    suggestedFramework: 'SOC Alert Fatigue & Breach Dynamics -> Incident Correlation Engine -> Visual Attack Graph Timeline -> 1-Click Remediation Playbooks -> MTTD/MTTR Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does the platform support automated quarantine without human approval for critical severity? (Configurable policy: Auto-quarantine vs 1-click human confirmation).', 'What systems does it integrate? (Cloud, Identity, Endpoint, Network).'],
      coreHypothesesOrSegments: ['Triaging individual isolated alerts is a failed paradigm; auto-clustering related telemetry into a single "Incident Storyline" reduces alert volume by 95%', 'Providing instant 1-click containment playbooks drops Mean Time to Remediate from 4 hours to 90 seconds'],
      analyticalPath: ['MVP: Unified incident graph, interactive MITRE ATT&CK kill-chain visualizer, blast radius asset tree, automated playbook execution, and post-mortem audit report generator'],
      synthesisModel: 'Executive design: An enterprise security command platform that compresses 50,000 daily alerts into unified visual attack storylines with blast-radius maps and 1-click automated containment playbooks.'
    }
  },
  {
    id: 'design-algorithmic-crypto-trading-terminal',
    track: 'design',
    title: 'Design a pro-grade quantitative and algorithmic trading terminal',
    company: 'Bloomberg / Jane Street / Binance Pro',
    companyColor: 'bg-zinc-900 text-white',
    companyBadge: 'Quantitative Finance & Low Latency',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design a multi-monitor, high-density algorithmic trading terminal for institutional quantitative traders executing cross-exchange arbitrage, derivatives market making, and algorithmic order routing.',
    contextBackground: 'Pro traders require microsecond latency, multi-window custom tile layouts, real-time Level-3 order book depth, and instant panic kill-switches during market flash crashes.',
    candidateBrief: [
      'Quant Trader Persona Needs: Quantitative Portfolio Manager / Market Maker (needs dense data, zero UI lag, hotkey-driven execution, real-time risk Greeks, algorithmic backtesting)',
      'Design High-Frequency Trading Terminal Architecture:',
      '1. Microsecond WebGL Order Book Depth & Heatmap (Visualizes spoofing, wall orders, and liquidity depth across 10 global exchanges simultaneously)',
      '2. "Visual Algorithm Builder & Strategy Backtester" (Drag-and-drop quantitative logic with Python code editor sync)',
      '3. Real-Time Portfolio Risk & Greeks Matrix (Delta, Gamma, Vega, Value-at-Risk across all open positions)',
      '4. "Global Emergency Kill Switch" (1-tap physical hotkey cancels all open orders and hedges net delta to flat in 50 milliseconds)'
    ],
    keyEvaluationMetrics: ['Data Density & WebGL Rendering Performance (60 FPS under heavy tick volume)', 'Level-3 Order Book Depth Visualization', 'Algorithmic Strategy Execution & Risk Matrix', 'Emergency Kill Switch & Fail-Safe Architecture'],
    suggestedFramework: 'Institutional Trader Workflow & Latency Demands -> High-Density Workspace Customization -> Level-3 Depth & Risk Visualizations -> Algorithmic Engine & Kill Switch -> Latency & Execution Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Is this a native C++/Rust desktop client or a browser WebAssembly/WebGL application? (Ultra-fast hybrid client).', 'What is the tick update frequency? (50,000 ticks/sec).'],
      coreHypothesesOrSegments: ['Institutional traders despise whitespace and slow animations; UI must maximize information density with 0ms visual lag', 'A hardware/hotkey-bound Global Kill Switch is mandatory to prevent algorithmic runaway loops during black swan events'],
      analyticalPath: ['MVP: Custom multi-tile dockable workspace, real-time depth heatmap, low-latency DOM ladder with hotkey trading, portfolio Greeks risk monitor, and global emergency order cancel button'],
      synthesisModel: 'Executive design: A high-density institutional trading terminal engineered for quantitative market makers, featuring WebGL order book heatmaps, real-time portfolio risk matrices, and instant global kill-switch controls.'
    }
  },
  {
    id: 'design-climate-refugee-aid-coordination',
    track: 'design',
    title: 'Design a global humanitarian aid and biometric refugee resettlement coordination platform',
    company: 'UNHCR / World Food Programme',
    companyColor: 'bg-blue-700 text-white',
    companyBadge: 'Global Humanitarian Tech',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design a multi-agency humanitarian relief, biometric identity registry, and digital cash aid distribution platform for managing displaced populations across refugee camps and international borders.',
    contextBackground: 'Displaced refugees frequently lose all physical paper identity documents, while fragmented NGOs duplicate food distribution, leading to supply waste and fraud while vulnerable families fall through the cracks.',
    candidateBrief: [
      'Refugee & NGO Humanitarian Ecosystem: Displaced Families (lost passports/money, traumatized, seeking family members) vs UNHCR / Red Cross / WFP Aid Workers (managing food, shelter, medical triage, cash vouchers)',
      'Design Secure Humanitarian Platform Architecture:',
      '1. "Iris / Biometric Digital Identity Vault" (Enrolls refugee with iris/fingerprint scan to create a decentralized verifiable credential that cannot be stolen or lost)',
      '2. "Blockchain Digital Cash Transfer (CBDC / Stablecoin) Vouchers" (Refugees receive monthly food assistance directly to mobile wallet or iris-scan grocery store checkout)',
      '3. "Family Tracing & Reunification Matcher" (Facial recognition and family tree graph to locate lost children and relatives across camps)',
      '4. Inter-Agency NGO Resource Allocation Dashboard (Eliminates duplicate aid distribution)'
    ],
    keyEvaluationMetrics: ['Biometric Identity Protection without State Surveillance Risks', 'Dignified Cash-Based Aid Distribution (Iris Checkout)', 'Cross-Border Family Reunification Graph', 'Offline Camp Data Sync & Privacy Security'],
    suggestedFramework: 'Humanitarian Crisis Reality -> Biometric Identity & Privacy Protection -> Cash Aid Distribution Architecture -> Family Reunification Tools -> Humanitarian Impact Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['How is refugee personal biometric data protected from hostile sovereign governments? (Zero-knowledge encrypted decentralized identity).', 'Does it work offline in remote desert camps? (Yes, local peer sync with intermittent satellite uplinks).'],
      coreHypothesesOrSegments: ['Giving refugees direct digital cash transfers via biometric iris-scan grocery checkout restores human dignity and stimulates local camp economies', 'Decentralized identity ensures refugees own their medical and educational records across sovereign borders'],
      analyticalPath: ['MVP: Iris scan identity enrollment, mobile/iris cash voucher wallet, inter-agency aid distribution registry, offline camp sync, and secure family reunification search portal'],
      synthesisModel: 'Executive design: A humanitarian coordination platform uniting zero-knowledge biometric identity registration, iris-enabled digital cash aid distribution, and cross-camp family reunification graphs.'
    }
  },
  {
    id: 'design-space-station-astronaut-dashboard',
    track: 'design',
    title: 'Design the mission dashboard and habitat control interface for astronauts on a Lunar Space Station',
    company: 'NASA / SpaceX / Axiom Space',
    companyColor: 'bg-zinc-900 text-white',
    companyBadge: 'Aerospace & Human Spaceflight',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design the all-in-one habitat management, spacewalk (EVA) monitoring, and life-support telemetry interface for astronauts living on the Lunar Gateway space station in lunar orbit.',
    contextBackground: 'Astronauts face sensory deprivation, extreme confinement, microgravity physical limitations (floating gloves), and a 3-second communication delay with Houston Mission Control.',
    candidateBrief: [
      'Spaceflight Operational Realities: 3-second comms latency (autonomous problem solving required), microgravity interaction (gloved hands, floating bodies, zero physical mouse pads), carbon dioxide toxicity risks, high psychological stress',
      'Design Comprehensive Habitat OS Suite:',
      '1. "3D Station Digital Twin & Life Support HUD" (Real-time oxygen, pressure, radiation shielding, and thermal loops visualizer with predictive leak pinpointing)',
      '2. "Spacewalk (EVA) External Monitoring & Biometrics" (Tracks spacesuit oxygen, battery, core body temperature, and robotic arm tether coordinates)',
      '3. Voice-First Conversational Space Habitat Assistant (Hands-free emergency checklist navigation when wearing bulky spacesuit gloves)',
      '4. Circadian Lighting & Mental Well-Being Suite (Simulates Earth sun cycles to regulate sleep in space)'
    ],
    keyEvaluationMetrics: ['Microgravity Interaction Ergonomics (Gloved Touch & Voice)', '3-Second Earth Comms Latency Autonomy', 'Station 3D Digital Twin & Rapid Leak Detection UX', 'Astronaut Psychological Well-Being & Circadian Management'],
    suggestedFramework: 'Deep Space Environmental Constraints -> Station Digital Twin & ECLSS Telemetry -> Gloved Hands & Voice Interaction Model -> Spacewalk EVA Tracking -> Mission Safety Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['How do astronauts interact while floating in the module? (Large high-contrast touchscreens with physical tactile grab bars + directional voice mics).', 'How are emergency decompression alerts handled? (Visual color shifts + spatial audio alarm localization).'],
      coreHypothesesOrSegments: ['Because Earth mission control is 3 seconds away, the habitat interface must provide instant step-by-step autonomous emergency triage checklists', 'Voice-first navigation is essential during maintenance when hands are holding equipment or wearing pressurized gloves'],
      analyticalPath: ['MVP: Interactive 3D station module digital twin, life support subsystem status dashboard, hands-free voice emergency checklists, and real-time EVA spacewalk telemetry'],
      synthesisModel: 'Executive design: A deep-space habitat operating system featuring a 3D station digital twin, voice-guided autonomous emergency checklists, and spacewalk biometric telemetry designed for microgravity ergonomics.'
    }
  },
  {
    id: 'design-autonomous-drone-swarm-firefighting',
    track: 'design',
    title: 'Design a mission control interface for autonomous drone swarm wildfire suppression',
    company: 'Skydio / CAL FIRE / Anduril',
    companyColor: 'bg-orange-700 text-white',
    companyBadge: 'Autonomous Robotics & Defense',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design the command and control software interface for a single incident commander managing a fleet of 50 autonomous aerial firefighting drones coordinating thermal imaging, fire retardant drops, and firefighter perimeter safety.',
    contextBackground: 'Wildfires move erratically with shifting wind patterns and thick smoke blinding human pilots, while a human commander cannot manually pilot 50 individual drones without autonomous swarm orchestration.',
    candidateBrief: [
      'Incident Commander High-Stress Needs: 360° situational awareness through smoke, coordinating drone retardant drops without hitting ground fire crews, managing drone battery swap cycles',
      'Design Autonomous Swarm Command Architecture:',
      '1. "3D Real-Time Thermal Wildfire Map" (Fuses multispectral drone thermal cameras into a live 3D terrain map showing fire front spread and thermal hotspots)',
      '2. "High-Level Swarm Tasking vs Micro-Piloting" (Commander draws a containment line on the map; AI swarm automatically calculates optimal drop altitudes, wind drift, and staggered drop timing)',
      '3. "Ground Crew Proximity Safety Shield" (Drones automatically abort retardant drops if ground firefighters are detected within the blast radius)',
      '4. Automated "Hot-Swap Battery & Refill" Logistics Loop'
    ],
    keyEvaluationMetrics: ['Autonomous Swarm Macro-Tasking UX (No micro-piloting)', 'Multispectral Thermal 3D Map Fusion', 'Ground Firefighter Safety Interlocks', 'Swarm Battery & Retardant Logistics Orchestration'],
    suggestedFramework: 'Wildfire Command Realities & Smoke Hazards -> Swarm Tasking vs Manual Control -> Thermal Terrain Mapping -> Ground Crew Safety Interlocks -> Mission Success Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Does the commander control individual drones or assign sector objectives to the swarm? (High-level sector objectives; swarm handles autonomous formation).', 'How is data transmitted through smoke and mountainous terrain? (Airborne drone-to-drone mesh relays).'],
      coreHypothesesOrSegments: ['A single human cannot fly 50 drones; the commander must be a strategist drawing containment goals while autonomous algorithms handle flight dynamics', 'Thermal computer vision penetrates heavy smoke to pinpoint active flame fronts that human spotters cannot see'],
      analyticalPath: ['MVP: Real-time 3D thermal terrain map, drag-and-drop retardant drop containment planner, ground crew location transponder overlays, and automated drone battery swap status tracker'],
      synthesisModel: 'Executive design: A wildfire swarm command terminal that translates high-level tactical containment objectives into autonomous multi-drone thermal reconnaissance and precision fire-retardant drops.'
    }
  },
  {
    id: 'design-precision-agritech-drone-ai',
    track: 'design',
    title: 'Design an AI farm management and precision agriculture operating system',
    company: 'John Deere / Climate Corp',
    companyColor: 'bg-emerald-800 text-white',
    companyBadge: 'AgriTech & Autonomous Heavy Machinery',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design a mobile and tractor-cabin farm management operating system for commercial farmers managing 5,000 acres of crops using autonomous tractors, drone multispectral imagery, and soil IoT sensors.',
    contextBackground: 'Farmers face volatile weather, soaring fertilizer costs, crop disease outbreaks, and complex heavy machinery software that is difficult to use in bright sunlight with dirty hands.',
    candidateBrief: [
      'Farmer Persona & Field Realities: 3rd-generation industrial farmer (works in dusty, bright sunlight, operates $500k combine harvesters, needs actionable insights: "Where do I spray nitrogen today? How much yield will I get?")',
      'Design Precision Agriculture Operating Platform:',
      '1. "Multispectral NDVI Crop Health Heatmap" (Satellite and drone imaging detects crop nitrogen deficiency and fungal disease 10 days before visible to human eyes)',
      '2. "Autonomous Tractor Fleet Task Scheduler" (Assigns autonomous field tilling and planting routes with obstacle avoidance)',
      '3. "Variable-Rate Fertilizer Prescriptions" (Directly instructs sprayer equipment to apply exact chemical milliliters per square yard, slashing fertilizer waste by 30%)',
      '4. Weather Forecast & Commodity Grain Pricing Optimization Hub'
    ],
    keyEvaluationMetrics: ['High-Sunlight Dust-Resistant Tractor Cabin UI', 'NDVI Crop Health & Early Disease Detection UX', 'Autonomous Heavy Machinery Fleet Coordination', 'Direct Dollar ROI & Yield Optimization Metrics'],
    suggestedFramework: 'Commercial Agriculture Challenges -> In-Field & Tractor Cabin UX -> Satellite & Sensor Data Fusion -> Autonomous Machinery Fleet Control -> Farm Profitability Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['Is this accessible both on mobile smartphones in the field and in-cab touchscreen displays? (Yes).', 'Does it integrate with existing John Deere and Case IH telemetry? (Yes, ISOBUS standard).'],
      coreHypothesesOrSegments: ['Farmers don\'t want raw NDVI spectral wave charts; they want actionable prescriptions ("Apply 15 lbs/acre nitrogen in North Quadrant")', 'In-cab displays must have massive high-contrast buttons operable with work gloves in direct midday sunlight'],
      analyticalPath: ['MVP: High-contrast NDVI crop health map, automated variable-rate spraying prescriptions, autonomous machinery fleet tracker, and crop yield profit forecaster'],
      synthesisModel: 'Executive design: A precision agriculture operating system translating satellite and drone multispectral imagery into autonomous tractor spraying routes and variable-rate fertilizer prescriptions.'
    }
  },
  {
    id: 'design-ar-surgical-training-simulator',
    track: 'design',
    title: 'Design an immersive VR/AR surgical training and credentialing simulator for medical residents',
    company: 'Osso VR / Johnson & Johnson',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Medical Simulation & XR',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design an immersive spatial VR/AR surgical simulation, haptic bone-cutting, and objective assessment platform for orthopedic surgery residents learning joint replacement procedures.',
    contextBackground: 'Surgical residents historically learn through the "see one, do one, teach one" model on real human patients, risking patient safety and suffering from limited cadaver lab availability.',
    candidateBrief: [
      'Surgical Resident & Residency Director Needs: Resident (needs muscle memory repetition of complex surgical steps without patient risk) vs Residency Director (needs objective numerical scoring of surgical competency)',
      'Design Spatial Simulation & Haptic Training Suite:',
      '1. Physics-Accurate Anatomical Soft-Tissue & Bone Haptics (Haptic controllers provide authentic bone saw vibration and drill breakthrough sensation)',
      '2. "Procedural Surgical Step Guidance with Error Correction" (Step-by-step interactive 3D guide that alerts when implant angle is off by 2 degrees)',
      '3. Dynamic Emergency Complication Injections (Simulates sudden arterial bleeding or bone fracture to test crisis reaction)',
      '4. Objective Metric Assessment Scorecard (Measures instrument economy of motion, procedural accuracy, time-to-hemostasis, and sterility compliance)'
    ],
    keyEvaluationMetrics: ['Haptic Bone Saw & Soft-Tissue Physical Fidelity', 'Objective Surgical Competency Scoring Rubric', 'Crisis Complication Simulation Mechanics', 'Anatomical Accuracy & Procedural Muscle Memory'],
    suggestedFramework: 'Surgical Education Deficits -> Haptic Physics & Anatomical Modeling -> Interactive Procedural Workflow -> Crisis Simulation & Objective Scoring -> Clinical Readiness Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['What surgical specialty is modeled (e.g. Total Hip / Knee Orthopedic Arthroplasty)? (Orthopedic total knee replacement).', 'How is surgical performance scored? (OSATS - Objective Structured Assessment of Technical Skills).'],
      coreHypothesesOrSegments: ['Muscle memory requires authentic physical resistance; force-feedback haptics when drilling into bone improves resident operating room readiness by 300%', 'Simulating unexpected surgical complications in VR builds calm crisis management before operating on living patients'],
      analyticalPath: ['MVP: Spatial 3D anatomical knee model, haptic force-feedback bone saw integration, interactive procedural workflow checklist, and automated OSATS objective scoring report card'],
      synthesisModel: 'Executive design: A spatial surgical training simulator combining force-feedback haptic bone cutting with real-time procedural step guidance and objective surgical competency scoring.'
    }
  },
  {
    id: 'design-smart-prosthetic-limb-companion',
    track: 'design',
    title: 'Design a mobile and haptic companion app for a smart bionic prosthetic limb',
    company: 'Open Bionics / Ottobock',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Bionics & Assistive Hardware',
    difficulty: 'Hard',
    targetDurationMinutes: 35,
    problemStatement: 'Design a mobile configuration app, EMG sensor muscle calibration system, and sensory feedback companion for amputees using advanced multi-grip smart bionic prosthetic hands.',
    contextBackground: 'Bionic prosthetic hands are complex to calibrate, muscle signals change throughout the day as the stump swells or sweats, and amputees lack sensory feedback (cannot feel how hard they are gripping a glass).',
    candidateBrief: [
      'Amputee User Journey & Frustrations: Muscle fatigue when triggering grips, accidental crushed soda cans due to zero sensory feedback, frustrating manual calibration, stump skin friction and battery anxiety',
      'Design Bionic Companion Ecosystem:',
      '1. 1-Tap Grip Pattern Customizer & Quick Switcher ("Power Pinch", "Key Grip", "Keyboard Typing Mode" with NFC wrist gesture shortcuts)',
      '2. AI "Adaptive Muscle Signal Calibration" (Gamified 2-minute daily training game that recalibrates EMG sensors to adjust for muscle fatigue and sweat)',
      '3. Haptic Sensory Feedback Loop (Prosthetic fingertip pressure sensors send gentle vibration pulses to the upper arm so user \'feels\' grip tightness)',
      '4. Battery Longevity & Motor Health Telemetry'
    ],
    keyEvaluationMetrics: ['Amputee Daily Ergonomics & Grip Customization', 'Gamified EMG Muscle Signal Calibration', 'Sensory Pressure Feedback Loop (Haptic upper-arm mapping)', 'Prosthetic Reliability & Battery Safeguards'],
    suggestedFramework: 'Amputee Physical Challenges -> Grip Customization & Fast Switching -> AI EMG Muscle Calibration -> Sensory Feedback Mechanism -> Quality of Life Metrics',
    benchmarkOutline: {
      clarificationQuestions: ['How does the prosthetic communicate with the app (Bluetooth Low Energy)? (Yes).', 'How are grip patterns changed on the fly? (Muscle double-pinch gesture or quick smartphone widget).'],
      coreHypothesesOrSegments: ['Muscle EMG signals drift as the user sweats during the day; a 60-second adaptive calibration game prevents frustrating grip misfires', 'Haptic feedback on the remaining limb allows the user to hold delicate objects without looking directly at their hand'],
      analyticalPath: ['MVP: Visual grip selector library, gamified EMG muscle calibration tool, haptic grip pressure visualizer, and maintenance/battery health alerts'],
      synthesisModel: 'Executive design: A bionic prosthetic companion app featuring instant custom grip switching, gamified EMG muscle signal recalibration, and sensory haptic grip feedback.'
    }
  }
];
