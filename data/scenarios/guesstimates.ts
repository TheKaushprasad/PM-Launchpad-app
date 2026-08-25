import { InterviewScenario } from '../../types/interview';

export const GUESSTIMATE_SCENARIOS: InterviewScenario[] = [
  // ==========================================
  // 🟢 EASY (15 Questions)
  // ==========================================
  {
    id: 'guest-tube-lights-bangalore',
    track: 'guesstimate',
    title: 'Estimate the number of tube lights in a city like Bangalore',
    company: 'Philips Lighting',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Smart Cities',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of tube lights (fluorescent/LED tube fixtures) installed across the city of Bangalore, India.',
    contextBackground: 'Consider residential homes, commercial office spaces, educational institutes, street lighting, and retail establishments.',
    candidateBrief: [
      'State baseline population assumption for Bangalore (~13-14 million people)',
      'Segment into Residential, Commercial, Industrial, and Public Infrastructure fixtures',
      'Calculate average household size and tube lights per household',
      'Estimate commercial space square footage and light fixture density per sq ft',
      'Perform quick sanity check and state top 3 sensitivity assumptions'
    ],
    keyEvaluationMetrics: ['Population Base Anchor', 'Household & Room Density', 'Commercial Floor Space Sizing', 'Sanity Check & Sensitivity Analysis'],
    suggestedFramework: 'Total Tube Lights = Residential + Commercial (Offices/Retail) + Institutional (Schools/Hospitals) + Public Streetlights',
    benchmarkOutline: {
      clarificationQuestions: ['Are we counting all tube fixtures or only active/working ones?', 'Does this include residential, commercial, and industrial?'],
      coreHypothesesOrSegments: ['Residential: ~3.5M households × 6-8 lights = ~25M', 'Commercial Offices & IT Parks: 1M desk workers × ~2 fixtures = ~10M', 'Retail & Schools & Hospitals: ~8M', 'Streetlights: ~0.8M'],
      analyticalPath: ['Bangalore Pop: 14M -> 3.5M homes -> Avg 3-room home has 6-8 tube lights = ~25M residential', 'Commercial: 200M sq ft office/retail space @ 1 tube light per 25 sq ft = ~8-10M', 'Total estimate: ~40-45 Million tube lights'],
      synthesisModel: 'Executive estimate: ~42 Million tube lights in Bangalore; ~60% residential, ~30% commercial/retail, ~10% public/industrial.'
    }
  },
  {
    id: 'guest-mcdonalds-burgers-india',
    track: 'guesstimate',
    title: 'Estimate how many McDonald’s burgers are sold per month in India',
    company: 'McDonald\'s',
    companyColor: 'bg-red-600 text-white',
    companyBadge: 'QSR Retail',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of burgers sold across all McDonald\'s outlets in India per month.',
    contextBackground: 'McDonald\'s operates across major metros and tier-1/tier-2 cities in India through master franchise partners (Westlife and Connaught Plaza Restaurants).',
    candidateBrief: [
      'Estimate total McDonald\'s store count in India (~450-500 outlets)',
      'Segment stores by footfall tiers (High-traffic transit/mall vs Standard High-Street vs Drive-thru)',
      'Calculate average daily customer transactions and burgers per order',
      'Multiply by 30 days and apply dine-in vs delivery split sanity check'
    ],
    keyEvaluationMetrics: ['Store Count Estimation', 'Orders per Store per Day', 'Burgers per Order Basket', 'Monthly Aggregation & Sanity Check'],
    suggestedFramework: 'Total Monthly Burgers = Store Count × Daily Orders per Store × Burgers per Order × 30 Days',
    benchmarkOutline: {
      clarificationQuestions: ['Are we including delivery orders (Swiggy/Zomato) as well as dine-in/takeaway?', 'Does this count combo meals and breakfast burgers?'],
      coreHypothesesOrSegments: ['Total stores in India: ~500 outlets', 'Metro flagships (150 stores): ~1,200 orders/day', 'Standard stores (350 stores): ~600 orders/day', 'Average burgers per order: ~1.8 burgers'],
      analyticalPath: ['Weighted average orders per store: ~780 orders/day', 'Daily burgers per store = 780 × 1.8 = ~1,400 burgers/day', 'Total daily burgers across 500 stores = 700,000 burgers/day', 'Monthly total = 700,000 × 30 = ~21 Million burgers/month'],
      synthesisModel: 'Executive estimate: ~20-22 Million burgers sold per month in India across ~500 McDonald\'s outlets (~700k daily).'
    }
  },
  {
    id: 'guest-pizzas-daily-nyc',
    track: 'guesstimate',
    title: 'Estimate how many pizzas are sold daily in New York City',
    company: 'Domino\'s',
    companyColor: 'bg-blue-700 text-white',
    companyBadge: 'Food & Dining',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of whole pizzas (or equivalent whole pies) sold on an average day across the 5 boroughs of New York City.',
    contextBackground: 'Consider NYC\'s resident population (8.5M), daily commuters/tourists (~1.5M), and pizza pizzeria density.',
    candidateBrief: [
      'Compare Demand-Side Approach (Population × Consumption Frequency) vs Supply-Side Approach (Pizzeria Count × Daily Pies Sold)',
      'Estimate resident population (8.5M) and percentage eating pizza on any given day (~4-6%)',
      'Factor in slice shops vs whole pie delivery vs sit-down restaurants',
      'Sanity check against ~2,000 pizzerias in NYC'
    ],
    keyEvaluationMetrics: ['Demand vs Supply Methodology', 'Daily Consumption Rate Assumption', 'Pizzeria Capacity Modeling', 'Reconciliation of Slices to Whole Pies'],
    suggestedFramework: 'Demand-Side: (NYC Population + Tourists) × Daily Pizza Eaters × Slices per Person / 8 Slices per Pie',
    benchmarkOutline: {
      clarificationQuestions: ['Are we counting whole pies only or converting individual slices into whole pie equivalents (8 slices = 1 pie)?', 'Does this include supermarket frozen pizzas or freshly made pizzeria pies only?'],
      coreHypothesesOrSegments: ['Total effective daily population: 9.5M (8.5M residents + 1M tourists/commuters)', 'Average New Yorker eats pizza ~2 times per month -> ~6.6% eat pizza on any given day', '~630,000 daily pizza eaters consuming avg 2.5 slices = ~1.57M slices = ~200,000 whole pies/day', 'Supply Check: 2,000 pizzerias × 100 pies/day = ~200,000 pies/day'],
      analyticalPath: ['Demand calculation: 9.5M × (24 pizza meals/year / 365 days) = ~625k people/day', '625k people × 2.5 slices = 1.56M slices / 8 slices/pie = ~195k whole pies', 'Supply cross-check matches at ~200k pies'],
      synthesisModel: 'Executive estimate: ~200,000 whole pizzas (or slice equivalents) sold daily in NYC, generating ~$4M in daily sales across ~2,000 pizzerias.'
    }
  },
  {
    id: 'guest-uber-requests-metro',
    track: 'guesstimate',
    title: 'Estimate number of daily Uber ride requests in a metro city',
    company: 'Uber',
    companyColor: 'bg-black text-white',
    companyBadge: 'Ride Hailing',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the number of daily Uber ride requests in a tier-1 metropolitan city with a population of 10 million (e.g., Delhi, London, or São Paulo).',
    contextBackground: 'Consider peak commute hours, leisure trips, airport rides, and competing transit options (metro, bus, personal vehicles).',
    candidateBrief: [
      'Segment population into Addressable Target Demographic by income and smartphone adoption',
      'Break down daily trip intents: Commute to work/college, Leisure/Dining, Late Night, and Transit Hubs/Airports',
      'Apply modal share for ride-hailing vs personal car / public metro',
      'Factor in unfulfilled / cancelled requests'
    ],
    keyEvaluationMetrics: ['Target Demographic Funnel', 'Trip Frequency per Active User', 'Peak vs Off-Peak Distribution', 'Market Share vs Competitors'],
    suggestedFramework: 'Addressable Pop -> Smartphone Ride-Hailing Users -> Daily Active Riders × Trips/Day + Unfulfilled Requests',
    benchmarkOutline: {
      clarificationQuestions: ['Are we counting completed rides or all initial ride search/booking requests?', 'What is the competitive landscape (e.g. Uber has 50% market share)?'],
      coreHypothesesOrSegments: ['Pop: 10M -> 4M addressable working adults (ages 20-55 with middle+ income)', '~15% (600k) use ride-hailing on any given weekday', 'Uber market share = 50% -> 300,000 daily active riders', 'Average rides per active rider = 1.6 rides/day -> 480,000 completed rides + 15% cancellation/search abandonments = ~550,000 requests'],
      analyticalPath: ['Step 1: 10M total pop -> 40% target income demographic = 4.0M', 'Step 2: 15% ride-hail penetration on a weekday = 600k riders', 'Step 3: Uber captures 50% = 300k riders taking 1.5 trips = 450k fulfilled + 100k unfulfilled/searches = ~550k total daily requests'],
      synthesisModel: 'Executive estimate: ~550,000 daily Uber ride requests in a 10M metro city (~450k completed rides, ~100k price checks/unmatched).'
    }
  },
  {
    id: 'guest-water-consumption-5m-city',
    track: 'guesstimate',
    title: 'Estimate daily water consumption for a city of 5M people',
    company: 'Municipal Water Board',
    companyColor: 'bg-cyan-700 text-white',
    companyBadge: 'Public Infrastructure',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total daily water consumption (in liters or gallons) for a metropolitan city with a population of 5 million people.',
    contextBackground: 'Include residential domestic use, commercial and institutional use, industrial manufacturing, and distribution leakage loss.',
    candidateBrief: [
      'Estimate per capita domestic daily water consumption (~135-150 liters/day per person for drinking, cooking, bathing, toilet flushing, washing)',
      'Scale to 5 million residents for total domestic demand',
      'Add Commercial & Institutional demand (Offices, Malls, Hospitals, Schools: ~25-30% of domestic)',
      'Factor in industrial manufacturing and municipal non-revenue water (NRW) pipe leakage (~15-20%)'
    ],
    keyEvaluationMetrics: ['Per Capita LPCD Standard', 'Domestic vs Commercial Split', 'Industrial & Infrastructure Inclusions', 'System Distribution Losses (NRW)'],
    suggestedFramework: 'Total Daily Water = (Domestic Population × LPCD) + Commercial + Industrial + Distribution Pipe Losses',
    benchmarkOutline: {
      clarificationQuestions: ['Are we measuring water delivered to taps or raw water treated at the reservoir including network losses?', 'What is the climate/geography (tropical vs arid)?'],
      coreHypothesesOrSegments: ['Domestic: 5M people × 150 Liters per Capita per Day (LPCD) = 750 Million Liters (MLD)', 'Commercial & Institutions: ~20% of domestic = 150 MLD', 'Industrial: ~100 MLD', 'Pipeline Transmission Loss (20% NRW): ~250 MLD'],
      analyticalPath: ['Domestic: 5,000,000 × 150L = 750M Liters = 750 MLD', 'Commercial + Industrial: 250 MLD', 'Net consumption = 1,000 MLD (1 Billion Liters/day)', 'Gross raw water demand with 20% loss = 1,250 MLD (1.25 Billion Liters/day)'],
      synthesisModel: 'Executive estimate: ~1.0 Billion Liters (1,000 MLD) of daily consumed water, requiring ~1.25 Billion Liters of municipal reservoir supply.'
    }
  },
  {
    id: 'guest-coffee-shops-10m-city',
    track: 'guesstimate',
    title: 'Estimate how many coffee shops are needed for a city of 10M people',
    company: 'Starbucks',
    companyColor: 'bg-emerald-700 text-white',
    companyBadge: 'Retail Planning',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of commercial coffee shops (chains + independent cafes + specialty coffee bars) needed to sustain a city of 10 million people.',
    contextBackground: 'Consider coffee drinking demographics, daily out-of-home consumption habits, and average coffee shop economic capacity.',
    candidateBrief: [
      'Demand-side: Population (10M) -> Coffee drinkers (% of population) -> Daily out-of-home cups bought',
      'Supply-side: Average cups served per coffee shop per day to remain profitable (~250-400 cups/day)',
      'Calculate required coffee shop count: Total Daily Out-of-Home Cups / Daily Cups per Shop',
      'Segment by Cafe types: Global Chains, Local Independent Specialty, Quick-Kiosk'
    ],
    keyEvaluationMetrics: ['Out-of-Home Coffee Penetration', 'Daily Cups per Coffee Drinker', 'Store Unit Economics / Throughput', 'Demand-Supply Equilibrium'],
    suggestedFramework: 'Total Coffee Shops = (Total Daily Out-of-Home Coffee Cups) / (Average Daily Cups Sold per Shop)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we counting dedicated sit-down/takeaway cafes, or including roadside tea/coffee stalls and fast-food counters?', 'Is this a coffee-centric culture (e.g. Seattle/Melbourne) or tea-dominant?'],
      coreHypothesesOrSegments: ['Pop: 10M -> 5M working adults -> 30% drink out-of-home commercial coffee = 1.5M daily cups', 'Average coffee shop capacity: 300 cups/day (peak morning rush + afternoon meetings)', 'Required shops = 1,500,000 / 300 = 5,000 coffee shops'],
      analyticalPath: ['Demand: 10M × 50% adult pop × 30% out-of-home coffee drinkers = 1.5M cups/day', 'Supply: A standard cafe serves ~35 cups/hour over 8-10 active hours = ~300-350 cups/day', 'Total shops needed = 1.5M / 300 = ~4,500 to 5,000 cafes (~1 cafe per 2,000 residents)'],
      synthesisModel: 'Executive estimate: ~4,500 to 5,000 coffee shops needed in a 10M city (~1 cafe per 2,000 citizens; ~300 cups/day per shop).'
    }
  },
  {
    id: 'guest-taxi-rides-globally-daily',
    track: 'guesstimate',
    title: 'Estimate number of taxi rides taken globally per day',
    company: 'Uber',
    companyColor: 'bg-black text-white',
    companyBadge: 'Global Mobility',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of commercial passenger taxi and ride-hailing trips taken globally per day.',
    contextBackground: 'Include traditional street-hail taxis, app-based ride-hailing (Uber, Lyft, Didi, Grab, Ola, Bolt), and auto-rickshaws/tuk-tuks.',
    candidateBrief: [
      'Top-down by Global Urban Population (~4.5 billion urban residents worldwide)',
      'Segment by regions: China & East Asia, North America, Europe, India & South Asia, Latin America, Africa',
      'Estimate daily ride-hail / taxi trip penetration per 1,000 urban residents',
      'Sanity check against publicly reported Uber (~28M trips/day) and Didi (~30M trips/day) metrics'
    ],
    keyEvaluationMetrics: ['Global Urban Population Sizing', 'Regional Mobility Penetration Rates', 'Public Benchmark Grounding (Uber/Didi filings)', 'Vehicle Fleet Feasibility'],
    suggestedFramework: 'Global Daily Taxi Trips = Sum of (Regional Urban Pop × Taxi/Ride-Hail Trips per Capita per Day)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we including two-wheeler and three-wheeler taxi rides (e.g. Southeast Asia / India)?', 'Does this include shared carpooling or strictly single-party taxi hires?'],
      coreHypothesesOrSegments: ['China (Didi + taxis): ~50M trips/day', 'India & SE Asia (Ola, Grab, auto-rickshaws, bikes): ~35M trips/day', 'North America (Uber, Lyft, yellow cabs): ~15M trips/day', 'Europe (FreeNow, Bolt, traditional taxis): ~15M trips/day', 'LatAm & Rest of World: ~20M trips/day'],
      analyticalPath: ['Total Global Daily Trips = 50M + 35M + 15M + 15M + 20M = ~135 Million trips/day', 'Sanity check: Uber reported ~28M daily trips (~20% global market share) -> 28M / 0.20 = ~140M total trips'],
      synthesisModel: 'Executive estimate: ~130 to 140 Million taxi and ride-hailing trips taken globally every single day (~$1.5B daily GMV).'
    }
  },
  {
    id: 'guest-gmail-emails-daily',
    track: 'guesstimate',
    title: 'Estimate daily email sends worldwide on Gmail',
    company: 'Google',
    companyColor: 'bg-red-500 text-white',
    companyBadge: 'Enterprise Workspace',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of emails sent globally per day originating from or delivered to active Gmail and Google Workspace accounts.',
    contextBackground: 'Gmail has over 1.8 billion active users worldwide across personal accounts (@gmail.com) and Google Workspace enterprise domains.',
    candidateBrief: [
      'Segment users into Consumer Personal Accounts (~1.5B) vs Enterprise Business Workspace Users (~300M)',
      'Estimate personal emails sent per day (P2P, transactional signups, customer inquiries: ~2-3 emails/day)',
      'Estimate corporate business emails sent per worker per day (~30-40 emails/day)',
      'Add automated transactional/marketing system sends originating from Google Cloud/Gmail servers'
    ],
    keyEvaluationMetrics: ['Gmail Active User Base (~1.8B)', 'Consumer vs Enterprise Usage Profiles', 'Automated Machine/Marketing Sends', 'Daily Volume Aggregation'],
    suggestedFramework: 'Total Gmail Sends = (Consumer Users × Personal Sends/Day) + (Enterprise Users × Work Sends/Day) + System Automated Sends',
    benchmarkOutline: {
      clarificationQuestions: ['Are we counting human-authored emails or including automated transactional and newsletter notifications?', 'Are we measuring emails sent OR total emails sent + received?'],
      coreHypothesesOrSegments: ['Consumer: 1.5B users × 2 sent emails/day = 3.0 Billion emails/day', 'Enterprise Workspace: 300M corporate users × 30 sent emails/day = 9.0 Billion emails/day', 'Automated Transactional / App Sends: ~8.0 Billion emails/day'],
      analyticalPath: ['Human sends: 3.0B (consumer) + 9.0B (enterprise) = 12.0 Billion human sends/day', 'Automated transactional sends = 8.0 Billion/day', 'Total sent: ~20 Billion emails sent/day (out of ~350B total global daily emails across all providers)'],
      synthesisModel: 'Executive estimate: ~20 Billion emails sent daily via Gmail/Google Workspace (~6% of all global email traffic; heavy enterprise concentration).'
    }
  },
  {
    id: 'guest-instagram-photos-daily',
    track: 'guesstimate',
    title: 'Estimate the number of photos uploaded daily to Instagram',
    company: 'Instagram',
    companyColor: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white',
    companyBadge: 'Social Media',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of photos uploaded to Instagram per day across Feed posts, Stories, Carousels, and Direct Messages (DMs).',
    contextBackground: 'Instagram has approximately 2 billion Monthly Active Users (MAU) and ~1.2 billion Daily Active Users (DAU).',
    candidateBrief: [
      'Segment DAU by upload formats: Permanent Feed Photos, Ephemeral Stories, Direct Messages (DMs), and Profile/Cover updates',
      'Estimate the creator-to-consumer ratio (1% heavy creators, 9% casual posters, 90% passive lurkers/viewers)',
      'Calculate average photos per story and multi-image carousel posts',
      'Compute total daily photo ingestion volume'
    ],
    keyEvaluationMetrics: ['DAU Anchor (~1.2B)', 'Creator vs Consumer Funnel (1-9-90 Rule)', 'Format Decomposition (Stories vs Feed vs DMs)', 'Sanity Check on Daily Storage (Petabytes)'],
    suggestedFramework: 'Total Daily Photos = (Feed Photos) + (Story Photos) + (DM Photos) = Sum of (Active Uploaders in Format × Avg Photos/Uploader)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we counting photos only or converting video frames/Reels into photo equivalents? (Strictly photos)', 'Do DMs count? (Yes, all uploaded photos).'],
      coreHypothesesOrSegments: ['DAU = 1.2 Billion users', 'Stories: ~500M daily story posters × 2 photos = ~1.0 Billion story photos/day', 'Feed & Carousels: ~100M daily feed posters × avg 2.5 photos = ~250 Million feed photos/day', 'Direct Messages (DMs): ~300M active DM users × 1.5 photos = ~450 Million DM photos/day'],
      analyticalPath: ['Total daily uploads = 1.0B (Stories) + 0.25B (Feed) + 0.45B (DMs) = ~1.7 Billion photos/day', 'Storage check: 1.7B photos × 2 MB compressed = ~3.4 Petabytes of new photo storage daily'],
      synthesisModel: 'Executive estimate: ~1.5 to 1.8 Billion photos uploaded daily to Instagram (~60% Stories, ~25% DMs, ~15% Feed Posts), consuming ~3.5 PB of raw daily storage.'
    }
  },
  {
    id: 'guest-plastic-bottles-metro-city',
    track: 'guesstimate',
    title: 'Estimate number of plastic bottles used daily in a metro city',
    company: 'Coca-Cola / Municipal Corp',
    companyColor: 'bg-red-600 text-white',
    companyBadge: 'Sustainability & Supply Chain',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the number of single-use and packaged plastic bottles (water, soft drinks, juices, personal care) consumed and discarded daily in a metro city of 10 million people.',
    contextBackground: 'Consider packaged drinking water, carbonated soft drinks, dairy beverages, and personal/home cleaning products.',
    candidateBrief: [
      'Segment by Product Category: Packaged Drinking Water, Carbonated Beverages, Juices/Energy Drinks, Household/Personal Care',
      'Segment population into Income Tiers & Daily Mobility (Commuters/Office Workers vs Home/Residential)',
      'Calculate bottles per capita per day across categories',
      'Formulate waste management and recycling implications'
    ],
    keyEvaluationMetrics: ['Category Decomposition (Water vs Soda vs Homecare)', 'Per Capita Consumption Modeling', 'Commuter & Commercial Impact', 'Environmental Sanity Check'],
    suggestedFramework: 'Total Daily Bottles = (Packaged Water Bottles) + (Soda & Beverage Bottles) + (Household/Personal Care Dailyized)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we focusing strictly on single-use beverage bottles or including shampoo/detergent bottles? (All plastic bottles)', 'Does this include bottles recycled and discarded? (All consumed bottles).'],
      coreHypothesesOrSegments: ['Packaged Drinking Water (0.5L / 1L): 10M pop × 0.35 bottles/day = 3.5 Million bottles', 'Carbonated Soft Drinks & Juices: 10M pop × 0.15 bottles/day = 1.5 Million bottles', 'Household & Personal Care (shampoo, soap, cleaners annualized): ~0.2 Million bottles/day'],
      analyticalPath: ['Total daily bottles consumed = 3.5M (water) + 1.5M (beverages) + 0.2M (homecare) = ~5.2 Million plastic bottles/day', 'Per capita average = ~0.52 plastic bottles per citizen per day'],
      synthesisModel: 'Executive estimate: ~5.0 to 5.5 Million plastic bottles used daily in a 10M metro (~70% packaged water, ~30% soft drinks/juices); generating ~100 tons of plastic waste daily.'
    }
  },
  {
    id: 'guest-petrol-pumps-india',
    track: 'guesstimate',
    title: 'Estimate number of petrol pumps in India',
    company: 'Indian Oil / Shell',
    companyColor: 'bg-amber-500 text-white',
    companyBadge: 'Energy Infrastructure',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of operational retail fuel stations (petrol/diesel pumps) across India.',
    contextBackground: 'Consider national oil marketing companies (IOCL, BPCL, HPCL) and private retailers (Reliance/Jio-bp, Shell, Nayara) along national highways, state highways, and urban cities.',
    candidateBrief: [
      'Demand-side: Vehicle Population (Two-wheelers, Passenger Cars, Commercial Trucks/Buses) × Fuel Consumption Rate',
      'Supply-side: Average fuel dispensing capacity per pump station per day',
      'Geography-side: Road network distance (National/State highways + urban density coverage)',
      'Reconcile against known public benchmarks (~80,000-85,000 fuel stations)'
    ],
    keyEvaluationMetrics: ['Vehicle Fleet Sizing in India (~300M vehicles)', 'Daily Fuel Consumption per Station', 'Highway vs Urban Station Density', 'Benchmark Accuracy'],
    suggestedFramework: 'Total Fuel Stations = (Total Daily Fuel Consumed in India) / (Average Fuel Sold per Fuel Station per Day)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we including private and public sector pumps?', 'Does this include CNG and EV charging pumps situated within fuel stations? (Yes, all retail fuel stations).'],
      coreHypothesesOrSegments: ['Total on-road vehicles in India: ~250M two-wheelers, ~40M cars, ~10M commercial trucks/buses', 'Total daily fuel consumed = ~350-400 Million liters/day', 'Average petrol station sells ~4,500 - 5,000 liters of fuel per day', 'Required stations = 400M Liters / 4,800 Liters/station = ~83,000 fuel stations'],
      analyticalPath: ['Calculated daily demand: 380M liters/day', 'Divided by average throughput of 4,600 liters/day/station', 'Result = ~82,600 retail fuel stations across India'],
      synthesisModel: 'Executive estimate: ~80,000 to 85,000 operational petrol pumps in India (~88% PSU oil marketing companies, ~12% private retailers).'
    }
  },
  {
    id: 'guest-credit-card-tx-india',
    track: 'guesstimate',
    title: 'Estimate daily credit card transactions in India',
    company: 'Visa / HDFC Bank',
    companyColor: 'bg-blue-800 text-white',
    companyBadge: 'Fintech Payments',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of credit card transactions (online e-commerce + offline POS swipe/tap) processed daily in India.',
    contextBackground: 'India has seen massive credit growth with ~95-100 million active credit cards in circulation.',
    candidateBrief: [
      'Estimate Total Active Credit Cards in India (~95-100M cards)',
      'Calculate Active Cardholder Ratio and Average Monthly Swipes per Card (~10-12 transactions/month)',
      'Segment by Channel: Online E-commerce Checkouts vs Offline Point-of-Sale (POS) Swipes',
      'Sanity check daily volume against UPI (which does ~350M transactions/day)'
    ],
    keyEvaluationMetrics: ['Credit Cards in Force (~100M)', 'Monthly Swipes per Active Card', 'Online vs Offline POS Split', 'Dailyized Volume Calculation'],
    suggestedFramework: 'Daily Transactions = (Active Credit Cards × Monthly Transactions per Card) / 30 Days',
    benchmarkOutline: {
      clarificationQuestions: ['Are we counting commercial/corporate cards as well as retail consumer cards?', 'Does this count failed/declined attempts or settled transactions only? (Settled transactions).'],
      coreHypothesesOrSegments: ['Total Credit Cards in Force: ~100 Million cards', 'Active card ratio: 80% (80M active cards)', 'Average monthly transactions per active card: ~8 transactions/month', 'Total monthly transactions = 80M × 8 = 640 Million transactions/month', 'Daily transactions = 640M / 30 = ~21.3 Million transactions/day'],
      analyticalPath: ['Step 1: 100M cards × 80% active = 80M active cards', 'Step 2: 8 swipes/month = 640M monthly tx', 'Step 3: 640M / 30 days = ~21.3M daily transactions (~60% online, ~40% offline POS)'],
      synthesisModel: 'Executive estimate: ~20 to 22 Million credit card transactions per day in India, generating ~$700M in daily spend (~$35 AOV).'
    }
  },
  {
    id: 'guest-bicycles-sold-annually',
    track: 'guesstimate',
    title: 'Estimate number of bicycles sold annually in a country',
    company: 'Trek / Hero Cycles',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Micro-Mobility',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of bicycles sold annually in a country like India (Pop: 1.4B) or the United States (Pop: 335M). (Candidate may pick India or US with clear justification).',
    contextBackground: 'Consider children\'s starter bikes, commuter utility bikes in rural/semi-urban areas, and urban fitness/enthusiast road bikes.',
    candidateBrief: [
      'Segment by User Category: Kids/Youth (Ages 3-14), Rural Commuters/Daily Utility, and Urban Fitness/Enthusiast',
      'Estimate lifecycle replacement cycle (e.g. kids outgrow bikes every 3-4 years; adults replace every 7-10 years)',
      'Calculate Annual Sales Volume = (Installed Bike Base) / (Average Replacement Lifespan in Years) + New First-Time Buyers',
      'Perform sanity check against leading bicycle manufacturers\' published sales numbers'
    ],
    keyEvaluationMetrics: ['Demographic Age Segmentation', 'Replacement Lifespan Modeling', 'Category Split (Kids vs Utility vs Sports)', 'Annual Market Sizing'],
    suggestedFramework: 'Annual Bicycle Sales = (Kids Segment Demand) + (Commuter Utility Replacement) + (Sports/Enthusiast Segment)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we sizing India or US market? (India: 1.4B pop)', 'Are we counting non-motorized pedal bikes and e-bikes? (Yes).'],
      coreHypothesesOrSegments: ['India Population: 1.4B -> ~300M households', 'Rural / Semi-urban utility: ~120M active utility bikes / 8-year replacement = ~15M bikes/year', 'Kids & Youth: ~250M kids / 4-year replacement = ~5M bikes/year', 'Urban Fitness: ~1M bikes/year'],
      analyticalPath: ['Total Annual Sales = 15M (Utility) + 5M (Kids) + 1M (Fitness) = ~21 Million bicycles sold annually in India', 'Hero Cycles produces ~6M bikes (~30% market share), validating the ~20M total industry size'],
      synthesisModel: 'Executive estimate: ~20 to 22 Million bicycles sold annually in India (~$1.8B market size, with Hero/Atlas/TI dominating).'
    }
  },
  {
    id: 'guest-hotel-rooms-cleaned-daily',
    track: 'guesstimate',
    title: 'Estimate number of rooms cleaned daily in hotels in a city',
    company: 'Marriott / OYO',
    companyColor: 'bg-rose-700 text-white',
    companyBadge: 'Hospitality',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the number of hotel rooms cleaned daily by housekeeping staff in a major tourism and business city (e.g. Las Vegas, Dubai, or Mumbai).',
    contextBackground: 'Housekeeping cleans both occupied rooms (daily stay-over refresh) and checkout rooms (full deep turnover).',
    candidateBrief: [
      'Estimate total hotel room inventory in the city across luxury, business, and budget segments',
      'Apply average hotel occupancy rate (~70-75%)',
      'Account for rooms cleaned upon checkout vs stay-over guest housekeeping requests',
      'Compute required housekeeping workforce capacity'
    ],
    keyEvaluationMetrics: ['Hotel Room Inventory Sizing', 'Occupancy Rate Assumption', 'Stay-over vs Turnover Cleaning Workflows', 'Housekeeping Labor Sanity Check'],
    suggestedFramework: 'Cleaned Rooms Daily = Total Hotel Rooms in City × Average Occupancy Rate × Cleaning Frequency (1.0/day)',
    benchmarkOutline: {
      clarificationQuestions: ['Which city are we modeling? (e.g. Las Vegas with 150k rooms or Mumbai with 40k hotel rooms)', 'Do we count Airbnb/vacation rentals or commercial hotels only? (Commercial hotels).'],
      coreHypothesesOrSegments: ['City: Mumbai (Commercial capital with ~40,000 branded + unbranded hotel rooms)', 'Average Occupancy Rate: 72% -> ~28,800 occupied rooms/day', 'Cleaning policy: 100% of occupied rooms cleaned daily + ~1,000 vacant room freshen-ups = ~30,000 rooms cleaned/day', 'Housekeeper capacity: 15 rooms/housekeeper/shift -> ~2,000 active housekeepers daily'],
      analyticalPath: ['Total Rooms: 40k rooms', 'Occupied: 40,000 × 72% = 28,800 rooms cleaned daily', 'Turnover cleans (~40% of occupied) + Stay-over cleans (~60% of occupied)'],
      synthesisModel: 'Executive estimate: ~29,000 hotel rooms cleaned daily in Mumbai across ~40k inventory (~72% occupancy; ~2,000 housekeeping staff).'
    }
  },
  {
    id: 'guest-monthly-mobile-data-consumption',
    track: 'guesstimate',
    title: 'Estimate monthly mobile data consumption in a country',
    company: 'Jio / Airtel / Verizon',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Telecom Infrastructure',
    difficulty: 'Easy',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total mobile data consumed per month across an entire country like India (Pop: 1.4B) or the US (Pop: 335M) in Exabytes (EB).',
    contextBackground: '4G/5G mobile data has exploded driven by short-form video streaming, OTT platforms, social media, and gaming.',
    candidateBrief: [
      'Estimate Mobile Broadband Smartphone Subscribers (~850M in India / ~280M in US)',
      'Estimate Average Monthly Data Consumption per Smartphone User (GB/month)',
      'Multiply (Subscribers × Avg GB/Month) and convert Petabytes/Exabytes (1,000,000 GB = 1 PB; 1,000 PB = 1 EB)',
      'Analyze data consumption by application: Video Streaming (70%), Social Media (15%), Gaming/Browsing (15%)'
    ],
    keyEvaluationMetrics: ['Smartphone Subscriber Base', 'Per-User GB/Month Standard (~20-25 GB/mo in India)', 'Unit Conversion (GB to Exabytes)', 'Sanity Check against Telecom Regulatory Filings (TRAI/FCC)'],
    suggestedFramework: 'Total Monthly Mobile Data (EB) = (Active Smartphone Data Users × Average GB / User / Month) / 1,000,000,000',
    benchmarkOutline: {
      clarificationQuestions: ['Are we sizing India (1.4B pop)? (Yes)', 'Does this include home Wi-Fi broadband or strictly cellular 4G/5G mobile tower data? (Cellular mobile data only).'],
      coreHypothesesOrSegments: ['Total mobile broadband users in India: ~850 Million smartphone users', 'Average data consumption per user: ~24 GB / month (world-leading due to cheap data)', 'Total monthly data = 850M users × 24 GB = 20.4 Billion GB = 20,400 Petabytes = ~20.4 Exabytes (EB) / month'],
      analyticalPath: ['Step 1: 850M smartphone SIMs', 'Step 2: 24 GB/user/month = 20.4 Billion GB', 'Step 3: Convert 20.4B GB = ~20.4 Exabytes/month (Jio handles ~12 EB, Airtel ~8 EB, Vi ~2 EB)'],
      synthesisModel: 'Executive estimate: ~20 to 22 Exabytes (EB) of cellular mobile data consumed monthly in India (~24 GB/user across ~850M smartphone subscribers).'
    }
  },

  // ==========================================
  // 🟡 MEDIUM (10 Questions)
  // ==========================================
  {
    id: 'guest-tennis-balls-boeing-747',
    track: 'guesstimate',
    title: 'How many tennis balls fit inside a Boeing 747?',
    company: 'Boeing / Google PM Interview',
    companyColor: 'bg-sky-700 text-white',
    companyBadge: 'Volumetric Sizing',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate how many standard tennis balls can fit inside the total interior passenger and cargo volume of a Boeing 747-400 aircraft.',
    contextBackground: 'This is a classic volumetric Fermi problem testing geometry decomposition, packing efficiency factors, and fuselage spatial reasoning.',
    candidateBrief: [
      'Estimate Boeing 747 dimensions: Fuselage length (~70m), cabin diameter (~6m), and cross-sectional internal volume',
      'Deconstruct into Cylinder geometry: Volume = π × r² × h',
      'Calculate volume of a single tennis ball (Sphere: 4/3 × π × r³ with diameter ~6.7 cm)',
      'Apply 3D sphere packing efficiency factor (~64% random close packing or ~70% loose pack)',
      'Account for fixtures, seating, luggage bins, and structural bulkheads'
    ],
    keyEvaluationMetrics: ['Fuselage Geometry Estimation', 'Tennis Ball Volume Calculation', 'Sphere Packing Density Factor (~64%)', 'Interior Usable Space Deductions'],
    suggestedFramework: 'Usable Fuselage Volume (m³) × Sphere Packing Fraction (0.64) / Volume of Single Tennis Ball (m³)',
    benchmarkOutline: {
      clarificationQuestions: ['Is the airplane stripped empty of seats and galleys, or fully furnished with passenger seats?', 'Do we include lower belly cargo holds and upper deck? (Entire interior volume).'],
      coreHypothesesOrSegments: ['Fuselage: Length ~60m usable, radius ~3m -> Volume = π × 3² × 60 = ~1,700 m³ (including cargo belly + upper deck = ~1,200 m³ usable void)', 'Tennis ball radius: ~3.3 cm (0.033m) -> Volume = 4/3 × π × (0.033)³ ≈ 0.00015 m³ (150 cm³)', 'Sphere packing efficiency: 64% (0.64)', 'Effective volume per ball = 0.00015 / 0.64 ≈ 0.000234 m³'],
      analyticalPath: ['Total usable void = 1,200 m³', 'Total balls = 1,200 m³ / 0.000234 m³ = ~5.1 Million tennis balls (Stripped empty: ~7M; furnished: ~5M)'],
      synthesisModel: 'Executive estimate: ~4.5 to 5.5 Million tennis balls fit inside a furnished Boeing 747 (up to ~7.5 Million if completely gutted to the aluminum frame).'
    }
  },
  {
    id: 'guest-cars-sold-india-2023',
    track: 'guesstimate',
    title: 'Estimate the number of cars sold in India in 2023',
    company: 'Maruti Suzuki / Hyundai',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Automotive Industry',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of new passenger vehicles (cars, SUVs, sedans, hatchbacks) sold in India in the year 2023.',
    contextBackground: 'India recently surpassed Japan to become the 3rd largest automotive market in the world behind China and the US.',
    candidateBrief: [
      'Demand-side: Population (1.4B) -> Middle/Upper class car-buying households (~60-70M) -> Annual purchase/replacement rate (~6-7%)',
      'Supply-side: Top Automakers market share (Maruti ~42%, Hyundai/Kia ~21%, Tata Motors ~14%, Mahindra ~10%, Others ~13%)',
      'Segment by Body Type: Entry Hatchbacks (28%), Compact/Mid-size SUVs (50%), Sedans (12%), Luxury/EV (10%)',
      'Cross-check against known industry milestone (~4.1 Million units)'
    ],
    keyEvaluationMetrics: ['Household Wealth Pyramid Sizing', 'Automaker Market Share Aggregation', 'SUV Trend Shift Impact', 'Final Annual Figure Precision'],
    suggestedFramework: 'Total Annual Car Sales = (Car-Buying Household Base × Annual Purchase Rate) OR Sum of (OEM Production Capacities)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we including commercial transport vehicles (taxis/trucks) or passenger cars only? (Passenger vehicles).', 'Are we counting new car registrations or used car transactions? (New car retail sales).'],
      coreHypothesesOrSegments: ['Automaker Capacity Approach: Maruti Suzuki sells ~1.7M cars/year (~42% share)', 'Total Market = 1.7M / 0.42 = ~4.05 Million passenger cars', 'Household Demand Approach: 65M upper-middle class homes × 6.5% annual buy/upgrade cycle = ~4.2M cars'],
      analyticalPath: ['Supply calculation: Maruti (1.7M) + Hyundai/Kia (0.85M) + Tata (0.55M) + Mahindra (0.45M) + Toyota/Others (0.55M) = ~4.1 Million cars'],
      synthesisModel: 'Executive estimate: ~4.1 Million passenger cars sold in India in 2023 (~$50B revenue; SUVs representing ~50% of all sales).'
    }
  },
  {
    id: 'guest-netflix-streaming-hours-india',
    track: 'guesstimate',
    title: 'Estimate total annual streaming hours on Netflix in India',
    company: 'Netflix',
    companyColor: 'bg-red-600 text-white',
    companyBadge: 'OTT Entertainment',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of hours of content streamed annually by all Netflix subscribers in India.',
    contextBackground: 'Netflix has grown significantly following mobile-only plan pricing ($2.50/mo) and localized original content investments.',
    candidateBrief: [
      'Estimate Netflix India paid subscriber base (~10-12 million paying accounts)',
      'Account for account sharing and average active viewers per subscription (~2.2 viewers/account)',
      'Calculate average daily streaming hours per viewer (Weekday: ~1.2 hrs; Weekend: ~2.5 hrs -> ~1.6 hrs/day average)',
      'Multiply: Subscribers × Viewers/Account × Daily Hours × 365 Days'
    ],
    keyEvaluationMetrics: ['Subscriber Base Estimation (~10M)', 'Profiles per Account Multiplier', 'Daily Watch Time per Active User', 'Annualized Aggregation (Billion Hours)'],
    suggestedFramework: 'Annual Streaming Hours = (Subscribers × Active Profiles/Sub) × (Average Daily Hours/Profile) × 365 Days',
    benchmarkOutline: {
      clarificationQuestions: ['Are we measuring total watched hours across all household profiles on an account?', 'Does this count downloaded offline video viewing as well as live streaming? (Yes, all watched content).'],
      coreHypothesesOrSegments: ['Paid Subscribers in India: ~10 Million accounts', 'Average active viewers per account: ~2.0 people = 20 Million active viewers', 'Average watch time: 1.5 hours per day per viewer', 'Total daily hours = 20M × 1.5 = 30 Million hours/day', 'Annual hours = 30M × 365 = ~10.95 Billion hours/year'],
      analyticalPath: ['10M paying subs × 2.0 active viewers = 20M viewers', '20M viewers × 1.5 hrs/day × 365 days = 10.95 Billion hours/year'],
      synthesisModel: 'Executive estimate: ~11 Billion hours of content streamed annually on Netflix in India (~30M hours daily across ~10M paying subscriber accounts).'
    }
  },
  {
    id: 'guest-ecommerce-shipments-globally',
    track: 'guesstimate',
    title: 'Estimate annual e-commerce shipments globally',
    company: 'Amazon / FedEx',
    companyColor: 'bg-amber-600 text-white',
    companyBadge: 'Global Logistics',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of parcels and packages shipped globally through e-commerce transactions in a single calendar year.',
    contextBackground: 'Global e-commerce is dominated by China (Taobao, Pinduoduo, JD), North America (Amazon, Walmart), Europe, and emerging markets.',
    candidateBrief: [
      'Top-down by Global Online Shoppers (~2.5 billion digital buyers globally)',
      'Segment by Regional Parcel Velocity: China (~110B parcels/year), US (~22B parcels/year), Europe (~15B), Rest of World (~20B)',
      'Calculate average annual parcels received per online shopper across developed vs developing economies',
      'Sanity check against courier volume stats (Pitney Bowes Parcel Shipping Index: ~160-170 Billion parcels)'
    ],
    keyEvaluationMetrics: ['Global Digital Shopper Base', 'Regional Market Decomposition (China vs US vs Europe)', 'Parcels per Shopper per Year', 'Global Courier Industry Sanity Check'],
    suggestedFramework: 'Global E-Commerce Parcels = China Volume + US Volume + Europe Volume + Rest of World (LatAm/SE Asia/India)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we counting B2C and C2C e-commerce parcels, or B2B freight containers? (E-commerce parcels).', 'Does a single multi-item order count as one parcel if shipped in one box? (Yes, physical packages shipped).'],
      coreHypothesesOrSegments: ['China (massive express parcel density): ~110 Billion parcels/year', 'United States (Amazon, UPS, FedEx, USPS): ~22 Billion parcels/year', 'Europe (UK, Germany, France): ~16 Billion parcels/year', 'Rest of World (India, SE Asia, LatAm, Middle East): ~22 Billion parcels/year'],
      analyticalPath: ['Global Total = 110B + 22B + 16B + 22B = ~170 Billion parcels shipped annually', 'Daily equivalent = ~465 Million parcels shipped per day worldwide'],
      synthesisModel: 'Executive estimate: ~165 to 175 Billion e-commerce parcels shipped globally each year (~65% originating in China; ~465M daily packages).'
    }
  },
  {
    id: 'guest-google-searches-country',
    track: 'guesstimate',
    title: 'Estimate daily Google search volume in a country',
    company: 'Google',
    companyColor: 'bg-blue-500 text-white',
    companyBadge: 'Search Engine',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of search queries submitted to Google daily from users in a country like India (Pop: 1.4B) or the United States (Pop: 335M).',
    contextBackground: 'Google dominates search with >90% market share across mobile Android, iOS Safari, and Desktop Chrome.',
    candidateBrief: [
      'Identify Active Internet User Base in the country (~750M in India / ~310M in US)',
      'Segment users into Persona archetypes: Knowledge Workers/Students (15-25 searches/day), Casual Smartphone Users (4-8 searches/day), Light/Elderly Users (1-2 searches/day)',
      'Calculate weighted average searches per user per day',
      'Sanity check against global volume (Google processes ~8.5-9.0 Billion searches/day globally)'
    ],
    keyEvaluationMetrics: ['Internet User Penetration', 'User Archetype Search Frequencies', 'Device Split (Mobile Search vs Desktop)', 'Global Share Calibration'],
    suggestedFramework: 'Daily Searches = (Active Internet Users) × (Weighted Average Google Searches / User / Day)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we sizing India or the US? (e.g. India with 750M internet users)', 'Do autocomplete suggestions count or only completed query submissions? (Completed queries submitted).'],
      coreHypothesesOrSegments: ['India Active Daily Searchers: ~500 Million daily active users', 'Search Frequencies: Knowledge workers/Students (100M @ 15 searches = 1.5B), General Mobile Users (300M @ 5 searches = 1.5B), Occasional (100M @ 2 searches = 0.2B)', 'Total daily searches = 1.5B + 1.5B + 0.2B = ~3.2 Billion searches/day'],
      analyticalPath: ['India accounts for ~3.2B of Google\'s ~9.0B global daily searches (~35% of global query volume due to massive population, though monetized at lower CPC)'],
      synthesisModel: 'Executive estimate: ~3.0 to 3.4 Billion daily Google search queries in India (~500M daily searchers averaging ~6.4 searches/day).'
    }
  },
  {
    id: 'guest-annual-food-delivery-nyc',
    track: 'guesstimate',
    title: 'Estimate annual food delivery orders in New York City',
    company: 'DoorDash / Uber Eats',
    companyColor: 'bg-red-500 text-white',
    companyBadge: 'Food Tech',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of prepared restaurant food delivery orders placed annually across all apps (DoorDash, Uber Eats, Grubhub) and direct restaurant deliveries in NYC.',
    contextBackground: 'NYC has 8.5M residents, high density, small apartment kitchens, and an established takeout culture.',
    candidateBrief: [
      'Segment NYC Population (8.5M) by Household Income & Age Demographics (3.3M total households)',
      'Categorize Household Delivery Frequency: Heavy Users (2-4 times/week: 25%), Moderate Users (2-4 times/month: 40%), Rare/Never (35%)',
      'Calculate Annual Household Orders and add Corporate Office Lunch Catering',
      'Sanity check against total NYC restaurant count (~25,000 restaurants)'
    ],
    keyEvaluationMetrics: ['Household Demographic Segmentation', 'Order Frequency Distribution', 'Office / Corporate Lunch Deliveries', 'Restaurant Capacity Supply Check'],
    suggestedFramework: 'Annual Orders = Sum of (Household Cohorts × Annual Deliveries per Cohort) + Corporate Deliveries',
    benchmarkOutline: {
      clarificationQuestions: ['Are we including grocery deliveries (Instacart) or cooked restaurant meals only? (Cooked restaurant meals).', 'Does this include direct phone/neighborhood deliveries alongside third-party apps? (All food deliveries).'],
      coreHypothesesOrSegments: ['3.3M Households in NYC:', '- Frequent (25% = 825k homes) @ 2.5 orders/week = ~107M orders/year', '- Moderate (40% = 1.32M homes) @ 2.5 orders/month = ~40M orders/year', '- Light (35% = 1.15M homes) @ 4 orders/year = ~4.6M orders/year', '- Corporate Office Lunches = ~10M orders/year', 'Total Annual Orders = 107M + 40M + 4.6M + 10M = ~161.6 Million orders/year'],
      analyticalPath: ['~160 Million annual orders = ~440,000 orders/day in NYC', 'Supply check: 20,000 delivery restaurants × ~22 delivery orders/day = ~440,000 orders/day (Exact match)'],
      synthesisModel: 'Executive estimate: ~160 Million restaurant food delivery orders placed annually in NYC (~440k daily orders, ~$6 Billion in annual delivery GMV).'
    }
  },
  {
    id: 'guest-hotel-bookings-worldwide-monthly',
    track: 'guesstimate',
    title: 'Estimate total number of hotel bookings worldwide per month',
    company: 'Booking.com / Expedia',
    companyColor: 'bg-blue-900 text-white',
    companyBadge: 'Online Travel Agency',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of hotel room bookings made worldwide in a single month across all Online Travel Agencies (OTAs) and direct hotel reservations.',
    contextBackground: 'Global travel encompasses business corporate travel, leisure vacations, domestic weekend trips, and conference attendees.',
    candidateBrief: [
      'Supply-side: Estimate global hotel room inventory (~18-20 million commercial hotel rooms globally)',
      'Apply global average occupancy rate (~65%) and average length of stay per booking (~2.5 nights)',
      'Calculate monthly room-nights occupied and divide by average length of stay to get total unique bookings',
      'Sanity check against Booking Holdings (~90M room nights/month) and Expedia filings'
    ],
    keyEvaluationMetrics: ['Global Hotel Room Inventory (~18M)', 'Global Occupancy Rate (~65%)', 'Average Length of Stay (ALOS ~2.5 nights)', 'OTA Market Share Validation'],
    suggestedFramework: 'Monthly Bookings = (Total Global Rooms × 30 Days × Occupancy Rate) / (Average Length of Stay in Nights)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we counting room-nights or unique reservation bookings? (Unique reservation bookings).', 'Does this include vacation rentals / Airbnb or commercial hotels only? (Commercial hotels).'],
      coreHypothesesOrSegments: ['Total global hotel rooms: ~18.5 Million rooms', 'Average monthly occupancy: 65% -> Occupied room-nights/month = 18.5M × 30 × 0.65 = ~360 Million room-nights', 'Average length of stay (ALOS): 2.5 nights per booking', 'Total Monthly Bookings = 360M room-nights / 2.5 nights = ~144 Million bookings/month'],
      analyticalPath: ['Step 1: 18.5M rooms × 30 days = 555M available room-nights', 'Step 2: 65% occupancy = 360M occupied room-nights', 'Step 3: 360M / 2.5 nights = ~144M unique hotel bookings/month'],
      synthesisModel: 'Executive estimate: ~140 to 150 Million hotel bookings made worldwide per month (~360M room-nights, generating ~$45B monthly GMV).'
    }
  },
  {
    id: 'guest-daily-messages-sms-and-apps',
    track: 'guesstimate',
    title: 'Estimate daily messages sent via SMS + messaging apps',
    company: 'WhatsApp / Apple',
    companyColor: 'bg-emerald-600 text-white',
    companyBadge: 'Mobile Messaging',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of personal and business messages sent globally per day across all channels (WhatsApp, WeChat, iMessage, SMS, Telegram, Messenger, Signal).',
    contextBackground: 'WhatsApp alone officially reported processing >100 billion messages per day.',
    candidateBrief: [
      'Deconstruct by Major Platforms: WhatsApp (~140B), WeChat (~60B in China), iMessage / Apple Messages (~40B), Traditional Carrier SMS & RCS (~25B), Others (Telegram, Messenger, Signal, Discord: ~45B)',
      'Bottom-up Demand Validation: Global Smartphone Users (~5.0B) × Average Messages Sent per Day (~60-70 messages/day across all apps)',
      'Account for Group Chat Multipliers (1 sent message delivered to 10 participants)',
      'Synthesize global daily messaging throughput'
    ],
    keyEvaluationMetrics: ['Platform-by-Platform Sizing (WhatsApp/WeChat/iMessage)', 'Bottom-up Smartphone User Averages', 'Group Chat Multiplication Factor', 'Global Volume Aggregation (Hundreds of Billions)'],
    suggestedFramework: 'Total Global Daily Messages = WhatsApp + WeChat + iMessage + Carrier SMS/RCS + Telegram/Messenger/Others',
    benchmarkOutline: {
      clarificationQuestions: ['Are we counting single outbound sent messages or total received deliveries across group chats? (Outbound messages sent).', 'Does this include transactional OTPs and marketing SMS? (Yes, all messages).'],
      coreHypothesesOrSegments: ['Platform Breakdown:', '- WhatsApp: ~140 Billion/day', '- WeChat (China): ~65 Billion/day', '- iMessage / Apple: ~40 Billion/day', '- Traditional SMS / RCS / A2P: ~25 Billion/day', '- Telegram, Messenger, Signal, Instagram DMs, Discord: ~50 Billion/day', 'Total Outbound Messages = ~320 Billion messages/day'],
      analyticalPath: ['Bottom-up check: 5B smartphone users × 64 messages/day = 320 Billion messages/day (Exact alignment)'],
      synthesisModel: 'Executive estimate: ~300 to 330 Billion messages sent globally every day (~45% on WhatsApp, ~20% WeChat, ~12% iMessage, ~8% SMS).'
    }
  },
  {
    id: 'guest-smb-digital-ad-spend-india',
    track: 'guesstimate',
    title: 'Estimate the size of digital advertising spending by SMBs in India',
    company: 'Google Ads / Meta',
    companyColor: 'bg-blue-600 text-white',
    companyBadge: 'Digital Marketing',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total annual digital advertising expenditure (Google Ads, Meta/Instagram Ads, Influencers, Marketplaces) spent by Small and Medium Businesses (SMBs) in India in USD.',
    contextBackground: 'India has ~63 million registered MSMEs, but only a fraction actively spend on digital performance marketing.',
    candidateBrief: [
      'Segment India\'s 63M MSMEs: Micro-enterprises/Kiranas (95% - zero formal ad spend), Small Digitized Businesses (4% = ~2.5M), Medium Enterprises / DTC Brands (1% = ~600k)',
      'Estimate annual digital ad budgets across active digitized tiers:',
      '- Small Local Services/Shops (2.5M @ $800/year = $2.0B)',
      '- Medium DTC/B2B Enterprises (600k @ $5,000/year = $3.0B)',
      'Sanity check against India\'s total digital ad market size (~$4.5 - $5.5 Billion total, with SMBs driving ~50-60%)'
    ],
    keyEvaluationMetrics: ['MSME Digitization Funnel', 'Tiered Annual Ad Spend Estimates', 'Channel Mix (Meta vs Google vs Amazon Sponsored)', 'Macro Ad Market Share Sanity Check'],
    suggestedFramework: 'Total SMB Digital Ad Spend = (Small Active SMBs × Avg Annual Spend) + (Medium Active Enterprises × Avg Annual Spend)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we including influencer marketing and SEO agencies or purely paid media ad spend (Meta/Google)? (Paid digital media spend).', 'Is the final answer in USD or INR? (USD).'],
      coreHypothesesOrSegments: ['Total MSMEs: 63 Million', 'Digitally Advertising SMBs: ~3.0 Million active advertisers (~5% of total base)', '- Tier 1 (Top 500k DTC/B2B/Tech): $4,000/year = $2.0 Billion', '- Tier 2 (2.5M Local clinics, restaurants, tutors, stores): $800/year = $2.0 Billion', 'Total SMB Digital Ad Spend = ~$4.0 Billion USD'],
      analyticalPath: ['Total India Digital Ad Market is ~$6.0B; Enterprise (FMCG, Auto, Banking, E-comm) is ~40% ($2.4B); SMB/Long-tail is ~60% ($3.6B - $4.0B)'],
      synthesisModel: 'Executive estimate: ~$3.8 to $4.2 Billion USD spent annually on digital ads by Indian SMBs (~3M active advertisers, split between Meta and Google).'
    }
  },
  {
    id: 'guest-cloud-storage-tb-consumed-globally',
    track: 'guesstimate',
    title: 'Estimate total number of cloud storage TB consumed globally annually',
    company: 'AWS / Microsoft Azure',
    companyColor: 'bg-amber-600 text-white',
    companyBadge: 'Cloud Infrastructure',
    difficulty: 'Medium',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total net new cloud storage data (in Terabytes / Petabytes / Zettabytes) generated, stored, and managed globally across major public cloud providers (AWS, Azure, GCP) annually.',
    contextBackground: 'Driven by enterprise database backups, 4K video ingestion, AI model training datasets, IoT telemetry, and consumer cloud backups (iCloud/Google Photos).',
    candidateBrief: [
      'Top-down by Public Cloud Market Revenue: Global Cloud IaaS/Storage Market (~$150B/year) / Average Cost per TB per Year (~$250/TB/yr including compute/redundancy)',
      'Bottom-up by Data Generators: Enterprise Workloads (Structured DBs + Logs + AI Datasets), Video/Media Streaming Repositories, and Consumer Cloud Backups',
      'Unit Conversion: 1 TB = 1,000 GB; 1 PB = 1,000 TB; 1 EB = 1,000 PB; 1 ZB = 1,000 EB',
      'Synthesize total stored cloud data in Exabytes / Zettabytes'
    ],
    keyEvaluationMetrics: ['Cloud Revenue to Storage Modeling', 'Enterprise vs Consumer Storage Breakdown', 'Data Growth Rate (~25-30% CAGR)', 'Precision in Data Storage Units'],
    suggestedFramework: 'Total Annual Cloud Storage (EB) = (Enterprise Cloud Data) + (Media/Streaming Archives) + (AI/IoT Telemetry) + (Consumer Cloud Backups)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we measuring net new storage added in a year or cumulative total stored data? (Net new storage consumed annually).', 'Does this include on-premise private data centers or public cloud only? (Public Cloud: AWS/Azure/GCP/Alibaba).'],
      coreHypothesesOrSegments: ['Enterprise Business Data & Logs: ~250 Exabytes/year', 'Video/Social/Media Streaming (YouTube, Netflix, TikTok archives): ~350 Exabytes/year', 'AI Training Datasets & IoT Sensor Telemetry: ~150 Exabytes/year', 'Consumer Mobile Backups (Google Drive, iCloud): ~100 Exabytes/year', 'Total Net New Cloud Storage = ~850 Exabytes/year (0.85 Zettabytes)'],
      analyticalPath: ['850 Exabytes = 850,000,000 Terabytes (850M TB) of net new cloud storage consumed annually across public cloud providers'],
      synthesisModel: 'Executive estimate: ~850 Million Terabytes (~850 Exabytes or ~0.85 ZB) of new cloud storage consumed annually across public cloud hyperscalers.'
    }
  },

  // ==========================================
  // 🔴 HARD (10 Questions)
  // ==========================================
  {
    id: 'guest-apple-vision-pro-sales-india',
    track: 'guesstimate',
    title: 'Estimate first-year sales volume for Apple Vision Pro in India',
    company: 'Apple',
    companyColor: 'bg-zinc-800 text-white',
    companyBadge: 'Spatial Computing',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total first-year unit sales volume and revenue for the Apple Vision Pro in the Indian market (assuming official launch at ~$4,200 USD / ~₹3,50,000 INR price point).',
    contextBackground: 'Vision Pro is an ultra-premium spatial computing headset targeting developers, tech executives, enterprise training, and high-net-worth enthusiasts.',
    candidateBrief: [
      'Define Addressable Target Market in India: High-Net-Worth Individuals (HNWIs with >$1M liquid assets: ~350k people) + Tech Executives/Developers + Enterprise/Design Studios',
      'Apply Willingness-to-Pay and Early-Adopter Penetration Curve (~3-5% of top tech-savvy HNWIs)',
      'Account for Enterprise / Developer Studio B2B purchases (~2,500 enterprise units)',
      'Calculate Total Unit Sales and Gross Revenue in INR and USD'
    ],
    keyEvaluationMetrics: ['HNWI Wealth Pyramid Segmentation in India', 'Early Adopter Tech Enthusiasm Sizing', 'Enterprise B2B vs Consumer Split', 'Supply Chain / Apple Store Footprint Realism'],
    suggestedFramework: 'Total Units = (HNWI Consumer Tech Enthusiasts × Penetration %) + (Enterprise & Developer Studio Purchases)',
    benchmarkOutline: {
      clarificationQuestions: ['Is this assuming official direct Apple retail presence in India with full localized App Store support?', 'What is the retail price in INR? (~₹3,50,000 inclusive of 18% GST and import duties).'],
      coreHypothesesOrSegments: ['Consumer Target: Top 200,000 ultra-affluent tech-forward households in Mumbai, Delhi NCR, Bangalore', 'Adoption rate: 4% early adopter adoption = 8,000 consumer units', 'Enterprise & Developer Segment: ~1,500 software studios, medical labs, and design agencies buying avg 2 units = 3,000 enterprise units', 'Total First-Year Unit Sales = 8,000 + 3,000 = ~11,000 units'],
      analyticalPath: ['11,000 units × ₹3,50,000 ($4,200 USD) = ₹385 Crore (~$46.2 Million USD in first-year revenue)'],
      synthesisModel: 'Executive estimate: ~10,000 to 12,000 Apple Vision Pro units sold in India in Year 1 (~₹385 Crore / $46M revenue; ~70% consumer HNWIs, ~30% enterprise/devs).'
    }
  },
  {
    id: 'guest-wearables-fitness-trackers-global-market',
    track: 'guesstimate',
    title: 'Estimate annual global market size for wearables (fitness trackers)',
    company: 'Apple / Garmin / Fitbit',
    companyColor: 'bg-rose-600 text-white',
    companyBadge: 'Health & Wearables',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total annual global market size (in USD and Unit Volume) for wrist-worn smart wearables (Smartwatches + Fitness Bands like Apple Watch, Garmin, Fitbit, Noise, Xiaomi).',
    contextBackground: 'Smart wearables span entry-level budget bands ($25-$50) up to luxury fitness/outdoor GPS smartwatches ($400-$1,000).',
    candidateBrief: [
      'Segment by Device Tier: Basic Fitness Bands ($35 ASP), Mass-Market Smartwatches ($150 ASP), Premium/Sports Smartwatches ($450 ASP)',
      'Estimate Global Annual Unit Shipments (~200-220 Million units globally)',
      'Calculate Weighted Average Selling Price (ASP) across developed and emerging economies',
      'Compute Total Global Market Value (Units × Weighted ASP) and compare with IDC industry reports (~$40-50 Billion)'
    ],
    keyEvaluationMetrics: ['Global Unit Shipment Sizing (~200M units)', 'Tiered ASP Modeling (Budget vs Premium)', 'Regional Adoption Disparities', 'Total Market Value ($ Billion)'],
    suggestedFramework: 'Global Market Size ($) = (Budget Bands Units × $35) + (Mid Smartwatches Units × $150) + (Premium Smartwatches Units × $450)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we including smart rings and hearables, or wrist-worn wearables only? (Wrist-worn smartwatches and fitness bands).', 'Is market size measured in retail consumer value (GMV) or wholesale OEM revenue? (Retail consumer market value).'],
      coreHypothesesOrSegments: ['Total Annual Units: 210 Million units', '- Budget Bands & Entry Smartwatches (India/China/LatAm): 110M units @ $35 ASP = $3.85 Billion', '- Mid-tier Smartwatches (Samsung/Fitbit/Amazfit): 50M units @ $150 ASP = $7.50 Billion', '- Premium Smartwatches (Apple Watch, Garmin): 50M units @ $450 ASP = $22.50 Billion', 'Total Global Market Value = $3.85B + $7.5B + $22.5B = ~$33.85 Billion ($34B wholesale / ~$42B retail)'],
      analyticalPath: ['210M units shipped with blended average retail price of ~$200 = ~$42 Billion global retail market size'],
      synthesisModel: 'Executive estimate: ~210 Million wearable units sold annually worldwide, representing a ~$42 Billion USD retail market size (~53% captured by Apple Watch value).'
    }
  },
  {
    id: 'guest-netflix-ott-revenue-5-countries',
    track: 'guesstimate',
    title: 'Estimate global OTT revenue opportunity if Netflix enters 5 new countries',
    company: 'Netflix',
    companyColor: 'bg-red-600 text-white',
    companyBadge: 'Global Expansion',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total addressable annual revenue opportunity if Netflix enters 5 hypothetical untapped emerging markets with a combined population of 250 million people.',
    contextBackground: 'Consider broadband household penetration, payment friction (credit card penetration vs local mobile wallets), local competition, and localized ARPU tiers.',
    candidateBrief: [
      'Deconstruct the Addressable Market Funnel: Total Population (250M) -> Total Households (~60M) -> Broadband Connected Households (~30M)',
      'Apply Willingness-to-Pay and Netflix Market Share Penetration over a 3-year horizon (~15-20% of broadband homes = ~5M subscribers)',
      'Model Tiered Pricing & Monthly ARPU ($4.50/month blended across Mobile, Standard, and Premium tiers)',
      'Calculate Annual Recurring Revenue (ARR): 5M Subscribers × $4.50/mo × 12 months'
    ],
    keyEvaluationMetrics: ['Broadband Household Funnel', 'Payment Infrastructure & Discretionary Income Filtering', 'Localized ARPU Blended Modeling', '3-Year ARR Projection'],
    suggestedFramework: 'Annual Revenue Opportunity = (Broadband Households × Target Penetration %) × (Monthly Blended ARPU) × 12 Months',
    benchmarkOutline: {
      clarificationQuestions: ['What is the income profile of the 5 countries (e.g. developing middle-income markets)?', 'Are we projecting Year 1 launch revenue or Year 3 mature market penetration? (Year 3 mature expansion).'],
      coreHypothesesOrSegments: ['Total Population: 250 Million -> 60M Households', 'Broadband Internet Penetration: 50% = 30M broadband homes', 'Addressable middle-class with digital payment capability: 40% = 12M homes', 'Netflix 3-year market penetration: 40% of addressable = 4.8 Million paying subscribers', 'Blended Monthly ARPU: $5.00/month'],
      analyticalPath: ['Annual Revenue = 4.8M subscribers × $5.00/mo × 12 months = $288 Million USD in Year 3 ARR'],
      synthesisModel: 'Executive estimate: ~$280 to $300 Million USD annual recurring revenue opportunity across the 5 new markets by Year 3 (~4.8M subscribers @ $5/mo ARPU).'
    }
  },
  {
    id: 'guest-saas-smb-productivity-revenue',
    track: 'guesstimate',
    title: 'Estimate SaaS subscription revenue for a productivity tool targeting SMBs globally',
    company: 'Notion / Asana',
    companyColor: 'bg-zinc-800 text-white',
    companyBadge: 'B2B SaaS Sizing',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the realistic annual subscription revenue for a fast-growing B2B collaborative productivity SaaS tool (like Notion or Monday.com) capturing a 2% share of the global SMB market.',
    contextBackground: 'Global SMB market comprises ~100M+ small businesses worldwide across tech, agency, professional services, and retail sectors.',
    candidateBrief: [
      'Segment Global SMB Market by Employee Size: Micro (1-9 employees: 80M companies), Small (10-49 employees: 18M companies), Medium (50-249 employees: 2M companies)',
      'Filter for Knowledge-Worker / Digitally Native Verticals (~15% of total SMBs = ~15M addressable companies)',
      'Apply 2% Market Share: ~300,000 paid company accounts',
      'Calculate Tiered Seat Licensing and Annual Contract Value (ACV) to derive total Annual Recurring Revenue (ARR)'
    ],
    keyEvaluationMetrics: ['Global SMB Firmographic Segmentation', 'Knowledge-Worker Vertical Filtering', 'Seat Licensing & Tiered Pricing Modeling', 'Total ARR Calculation'],
    suggestedFramework: 'Total ARR = Sum of (Paying Accounts in Tier × Paid Seats per Account × Price per Seat/Month × 12)',
    benchmarkOutline: {
      clarificationQuestions: ['What is the per-seat pricing? ($10/seat/month standard SaaS)', 'Are we including enterprise licenses or strictly SMB (<250 employees)? (SMB only).'],
      coreHypothesesOrSegments: ['Addressable Digitized SMBs: 15 Million companies', '2% Market Share = 300,000 paying customer organizations', '- Micro (60% = 180k accounts): 3 seats @ $10/mo = $360/year -> $64.8M', '- Small (35% = 105k accounts): 15 seats @ $10/mo = $1,800/year -> $189.0M', '- Medium (5% = 15k accounts): 60 seats @ $10/mo = $7,200/year -> $108.0M', 'Total ARR = $64.8M + $189.0M + $108.0M = ~$361.8 Million ARR'],
      analyticalPath: ['300,000 paying companies generating an average ACV of ~$1,200/year = ~$360 Million in Annual Recurring Revenue (ARR)'],
      synthesisModel: 'Executive estimate: ~$350 to $375 Million in Annual Recurring Revenue (ARR) with ~300k paying SMB accounts and ~3M paid seats.'
    }
  },
  {
    id: 'guest-delivery-fee-hike-gmv-impact',
    track: 'guesstimate',
    title: 'Estimate annual e-commerce GMV impact of 10% increase in delivery fees',
    company: 'Amazon / Instacart',
    companyColor: 'bg-amber-600 text-white',
    companyBadge: 'Pricing Elasticity',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'You are a PM on a $10 Billion annual GMV on-demand delivery platform. Estimate the net financial impact on GMV and Platform Gross Margin if base customer delivery fees are increased by 10% (from $4.00 to $4.40).',
    contextBackground: 'Increasing delivery fees increases per-order fee revenue but risks customer conversion churn due to price elasticity of demand.',
    candidateBrief: [
      'Deconstruct current baseline economics: $10B GMV / $50 Average Order Value (AOV) = 200 Million annual orders',
      'Apply Price Elasticity of Demand for delivery surcharges (Elasticity ~ -0.4 to -0.6 for delivery fees)',
      'Calculate Order Volume Churn: 10% fee hike × -0.5 elasticity = -5% order volume decline (Loss of 10M orders)',
      'Synthesize Net Impact: GMV Loss (-$500M) vs Additional Fee Margin Revenue gained on remaining 190M orders'
    ],
    keyEvaluationMetrics: ['Baseline Unit Economics Modeling', 'Price Elasticity Assumption Justification', 'Volume Loss Calculation vs Margin Gain', 'Strategic Tradeoff Executive Synthesis'],
    suggestedFramework: 'Net Financial Impact = (Lost Order Volume × Baseline GMV/Margin) vs (Retained Orders × Additional Fee Revenue)',
    benchmarkOutline: {
      clarificationQuestions: ['What is the baseline order volume and average basket size? ($10B GMV, $50 AOV, 200M orders, $4.00 base delivery fee)', 'Is subscription/membership (free delivery tier) affected? (Non-members only; assume 50% of orders).'],
      coreHypothesesOrSegments: ['Baseline: 100M non-member orders with $4.00 delivery fee = $400M fee revenue', '10% fee increase to $4.40 (+40¢ per order)', 'Elasticity of -0.5 -> 10% price increase leads to 5% drop in non-member order volume (-5M orders)', 'GMV Impact: -5M orders × $50 AOV = -$250 Million GMV drop (-2.5% platform GMV)', 'Fee Revenue Impact: 95M remaining orders × $4.40 = $418M fee revenue (+18M net fee gain)'],
      analyticalPath: ['Loss of $250M GMV (-$37.5M lost merchant commission at 15% take rate) vs Gain of $18M delivery fees = Net platform gross profit change of -$19.5M unless offset by higher basket sizes'],
      synthesisModel: 'Executive estimate: GMV drops by -$250 Million (-2.5%); delivery fee revenue gains +$18 Million, but net platform commission profit declines by -$19.5 Million unless subscription conversion increases.'
    }
  },
  {
    id: 'guest-bike-sharing-fleet-bangalore',
    track: 'guesstimate',
    title: 'Estimate annual demand for bike-sharing fleet size in Bangalore',
    company: 'Yulu / Bounce',
    companyColor: 'bg-cyan-600 text-white',
    companyBadge: 'Micro-Mobility',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the optimal total fleet size of dockless electric micro-mobility two-wheelers (smart e-bikes) required to service first/last-mile transit demand in Bangalore, India.',
    contextBackground: 'Bangalore has severe road traffic congestion and a rapidly expanding Namma Metro rail network with ~70 operational stations.',
    candidateBrief: [
      'Segment Target Demand Generators: Metro Commuters (first/last-mile transit from station to tech park/home), Tech Park Campuses, and Hyperlocal Gig Delivery Workers',
      'Calculate Metro Commuter Volume: 700k daily metro riders -> 20% need last-mile transit = 140k daily trips',
      'Add Gig Delivery Workers (Swiggy/Zomato/Blinkit): ~40k daily dedicated rental users',
      'Apply Vehicle Utilization / Turn Rate (Average 4-5 trips per vehicle per day) to calculate required active fleet size + 15% buffer for maintenance/charging'
    ],
    keyEvaluationMetrics: ['Metro Transit Demand Modeling', 'Gig Worker Fleet Demand', 'Vehicle Utilization Turn-Rate (Trips/Day)', 'Maintenance & Swapping Battery Buffer'],
    suggestedFramework: 'Optimal Fleet Size = (Total Daily Micro-Mobility Trips / Daily Turn-Rate per Bike) × (1 + Maintenance/Battery Buffer %)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we sizing for shared dockless micro-mobility (Yulu-style low-speed EV) or full-speed rental scooters? (Low-speed micro-mobility EV).', 'Does this include vehicles undergoing battery charging and repair? (Yes, total active fleet).'],
      coreHypothesesOrSegments: ['Daily Trip Demand:', '- Metro Last-Mile Commuters: 700k riders × 20% adoption = 140,000 trips/day', '- Tech Park / Student Local Trips: 30,000 trips/day', '- Dedicated Gig Delivery Rider Shifts: 30,000 full-day bike rentals', 'Total Daily Trips / Shifts: ~200,000 trip-equivalents', 'Daily Turn Rate: Commuter bikes handle ~4.5 trips/day; delivery bikes handle 1 dedicated rider/day', 'Required Operating Vehicles = (170k / 4.5 = 37.7k) + 30k delivery = ~68,000 active bikes', 'Add 15% maintenance/charging buffer = ~78,000 total fleet size'],
      analyticalPath: ['Calculated total required fleet size: ~75,000 - 80,000 smart e-bikes across 70 metro clusters and major IT corridors'],
      synthesisModel: 'Executive estimate: ~75,000 to 80,000 electric shared bikes needed to fully service Bangalore (~$25M annual rental revenue; ~200k daily rides).'
    }
  },
  {
    id: 'guest-active-uber-drivers-globally',
    track: 'guesstimate',
    title: 'Estimate global number of active Uber drivers',
    company: 'Uber',
    companyColor: 'bg-black text-white',
    companyBadge: 'Supply Modeling',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of monthly active drivers and delivery couriers operating on the Uber platform worldwide.',
    contextBackground: 'Uber operates mobility and food delivery across 70+ countries and 10,000+ cities.',
    candidateBrief: [
      'Demand-to-Supply Reconciliation: Global Uber trips (~28 Million trips/day = ~840 Million trips/month)',
      'Calculate average monthly trips completed per driver (Full-time drivers: 300 trips/mo; Part-time drivers: 80 trips/mo -> Blended ~150 trips/mo)',
      'Divide Total Monthly Trips by Average Trips per Driver to calculate Monthly Active Drivers',
      'Cross-check against public earnings disclosures (~5.5-6.0 million active drivers and couriers globally)'
    ],
    keyEvaluationMetrics: ['Daily/Monthly Completed Trips Anchor', 'Driver Shift & Utilization Modeling (Full-Time vs Part-Time)', 'Mobility vs Uber Eats Delivery Couriers', 'Public Regulatory Filing Validation'],
    suggestedFramework: 'Active Drivers = (Total Monthly Platform Trips) / (Weighted Average Monthly Trips per Active Driver)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we counting rideshare drivers only or including Uber Eats delivery couriers? (Both drivers and delivery couriers).', 'What constitutes an "active" driver? (Completed at least 1 trip in the trailing 30 days).'],
      coreHypothesesOrSegments: ['Total Monthly Trips: 28M trips/day × 30 days = 840 Million trips/month (Rides + Eats)', 'Driver Engagement Distribution:', '- Full-Time Drivers (35%): ~320 trips/month', '- Part-Time / Weekend Gig Drivers (65%): ~60 trips/month', '- Weighted average trips per active driver = (0.35 × 320) + (0.65 × 60) = 112 + 39 = ~151 trips/month', 'Total Monthly Active Drivers = 840,000,000 / 151 ≈ 5.56 Million drivers'],
      analyticalPath: ['840M trips / 150 trips/driver = ~5.6 Million monthly active drivers worldwide', 'Matches Uber\'s reported ~5.7M active earning drivers/couriers'],
      synthesisModel: 'Executive estimate: ~5.5 to 5.8 Million monthly active drivers and couriers globally on Uber (~35% full-time, ~65% part-time).'
    }
  },
  {
    id: 'guest-airline-seats-demand-2030',
    track: 'guesstimate',
    title: 'Estimate global demand for airline seats in the year 2030',
    company: 'Boeing / IATA',
    companyColor: 'bg-sky-700 text-white',
    companyBadge: 'Aviation Forecasting',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total global demand for commercial airline passenger seats (Total Passenger Enplanements / Boardings) in the year 2030.',
    contextBackground: 'Current global air passenger traffic is ~4.5 billion annual passenger journeys, driven by booming middle classes in Asia-Pacific, low-cost carrier expansion, and airport infrastructure growth.',
    candidateBrief: [
      'Establish 2024 Baseline: ~4.5 Billion global passenger journeys / year',
      'Segment Growth by Geography over 6 years (2024 to 2030):',
      '- Asia-Pacific & India: High growth (6-7% CAGR)',
      '- Middle East & LatAm: Moderate growth (4-5% CAGR)',
      '- North America & Europe: Mature replacement growth (2-3% CAGR)',
      'Calculate Blended Global CAGR (~4.2% per year) and compound: 4.5B × (1.042)⁶ to project 2030 demand'
    ],
    keyEvaluationMetrics: ['Aviation Baseline Anchor (~4.5B)', 'Regional CAGR Differentiation', 'Compounding Math Precision', 'Infrastructure Capacity Constraints (Airports & Fleet Deliveries)'],
    suggestedFramework: '2030 Demand = Baseline 2024 Passenger Journeys × (1 + Blended Global Aviation CAGR)^6 Years',
    benchmarkOutline: {
      clarificationQuestions: ['Are we measuring unique travelers or total flight boarding sectors (including connecting flight layovers)? (Total individual boarding enplanements).', 'Are we counting commercial scheduled aviation or private jets? (Commercial scheduled airlines).'],
      coreHypothesesOrSegments: ['Baseline 2024: 4.5 Billion passengers', 'Regional Breakdown & Weights:', '- Asia-Pacific (35% share) @ 6.5% CAGR', '- North America & Europe (45% share) @ 2.5% CAGR', '- Rest of World (20% share) @ 4.5% CAGR', 'Blended Global CAGR = (0.35 × 6.5%) + (0.45 × 2.5%) + (0.20 × 4.5%) = 2.27% + 1.12% + 0.90% = ~4.3% CAGR', 'Compound Growth: 4.5B × (1.043)⁶ = 4.5B × 1.287 = ~5.8 Billion passenger journeys in 2030'],
      analyticalPath: ['At an average load factor of 82%, 5.8B passengers requires ~7.0 Billion scheduled airline seats to be flown in 2030'],
      synthesisModel: 'Executive estimate: ~5.8 Billion passenger journeys (~7.0 Billion scheduled seats) demanded globally in 2030 (~4.3% CAGR, led by Asia-Pacific).'
    }
  },
  {
    id: 'guest-amazon-prime-daily-orders-worldwide',
    track: 'guesstimate',
    title: 'Estimate the number of Amazon Prime orders placed daily worldwide',
    company: 'Amazon',
    companyColor: 'bg-amber-600 text-white',
    companyBadge: 'E-Commerce Scale',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total number of orders placed daily by Amazon Prime members across all global Amazon marketplaces.',
    contextBackground: 'Amazon Prime has over 200 million paid subscribers globally who shop with high frequency due to free 1-day and 2-day shipping.',
    candidateBrief: [
      'Estimate Total Active Prime Member Households worldwide (~220 Million Prime members)',
      'Segment by Regional Hubs: US (~160M members), Europe (~35M members), India/Japan/Rest of World (~25M members)',
      'Calculate Average Annual Orders per Prime Member (US Prime member places ~35-40 orders/year; International places ~20-25 orders/year)',
      'Compute Total Annual Prime Orders and divide by 365 days for Daily Order Velocity'
    ],
    keyEvaluationMetrics: ['Prime Membership Sizing (~220M)', 'Order Frequency by Geography', 'Average Basket Composition', 'Daily Aggregation Sanity Check'],
    suggestedFramework: 'Daily Prime Orders = Sum of (Regional Prime Members × Annual Orders per Member) / 365 Days',
    benchmarkOutline: {
      clarificationQuestions: ['Does a multi-item checkout count as one single order? (Yes, 1 checkout transaction = 1 order).', 'Are we counting retail physical goods or digital Prime Video / Kindle rentals? (Physical e-commerce goods).'],
      coreHypothesesOrSegments: ['Total Prime Members: 220 Million', '- United States: 160M members × 38 orders/year = 6.08 Billion orders/year', '- Europe & UK: 35M members × 24 orders/year = 840 Million orders/year', '- Rest of World (India, Japan, etc.): 25M members × 18 orders/year = 450 Million orders/year', 'Total Annual Prime Orders = 6.08B + 0.84B + 0.45B = ~7.37 Billion orders/year', 'Daily Prime Orders = 7.37 Billion / 365 = ~20.2 Million orders/day'],
      analyticalPath: ['20.2 Million orders/day placed by Prime members globally (~$1.0B in daily Prime member GMV at $50 AOV)'],
      synthesisModel: 'Executive estimate: ~20 to 22 Million Amazon Prime orders placed daily worldwide (~7.4B annual orders across ~220M paid members).'
    }
  },
  {
    id: 'guest-shipping-containers-teu-movement',
    track: 'guesstimate',
    title: 'Estimate annual shipping container movement globally in TEUs',
    company: 'Maersk / MSC',
    companyColor: 'bg-sky-800 text-white',
    companyBadge: 'Maritime Supply Chain',
    difficulty: 'Hard',
    targetDurationMinutes: 15,
    problemStatement: 'Estimate the total annual container port throughput movement (in Twenty-Foot Equivalent Units - TEUs) handled across all global maritime container ports in a year.',
    contextBackground: 'Maritime shipping carries ~90% of global manufactured trade, measured in standard 20-foot (1 TEU) and 40-foot (2 TEU) steel shipping containers.',
    candidateBrief: [
      'Top-down by Major Trade Lanes: Transpacific (Asia-US), Asia-Europe, Intra-Asia, Transatlantic, and North-South Trade',
      'Port Handling Throughput vs Physical Container Fleet: Differentiate physical shipping containers in existence (~30M TEUs) from Total Port Moves / Throughput (~850M TEU port lifts/year)',
      'Account for Transshipment Hubs (containers handled multiple times at hub ports like Shanghai, Singapore, Rotterdam, Dubai)',
      'Synthesize global container port throughput TEU volume'
    ],
    keyEvaluationMetrics: ['Global Physical Container Fleet (~30M TEUs)', 'Port Throughput vs Physical Fleet Distinction', 'Major Global Trade Lanes Sizing', 'Transshipment Multiplier Factor (~2.5-3.0 lifts per journey)'],
    suggestedFramework: 'Global Port Throughput (TEUs) = Physical Loaded TEUs Moved × Average Port Handlings per Journey (Transshipment Factor)',
    benchmarkOutline: {
      clarificationQuestions: ['Are we measuring physical full containers shipped (trade volume) or total port throughput (crane lifts including empties and transshipments)? (Total port throughput TEUs).', 'What is 1 TEU? (A standard 20-foot shipping container).'],
      coreHypothesesOrSegments: ['Physical Loaded Global Container Trade: ~180 Million loaded TEUs moved per year', 'Transshipment & Empty Repositioning Multiplier: Each container is handled an average of 4.5 times (Origin Port -> Transshipment Hub 1 -> Transshipment Hub 2 -> Destination Port -> Empty return)', 'Total Global Port Throughput = 180M physical TEUs × 4.7 handlings = ~850 Million TEU moves/year', 'Top Ports check: Shanghai (47M TEU) + Singapore (37M) + Ningbo (33M) + Shenzhen (30M) = Top 10 ports alone handle ~300M TEU'],
      analyticalPath: ['850 Million TEUs handled annually across ~500 commercial container ports globally'],
      synthesisModel: 'Executive estimate: ~830 to 860 Million TEUs handled annually at global container ports (originating from ~180M physical loaded container shipments).'
    }
  }
];
