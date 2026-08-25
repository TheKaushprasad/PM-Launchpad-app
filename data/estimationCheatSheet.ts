export interface EstimationConstantGroup {
  category: string;
  items: { label: string; value: string; note: string }[];
}

export const ESTIMATION_CHEAT_SHEET: EstimationConstantGroup[] = [
  {
    category: '🌍 Population Benchmarks',
    items: [
      { label: 'Global Population', value: '8.1 Billion', note: '~1.4B Developed, ~6.7B Developing' },
      { label: 'United States', value: '340 Million', note: '~130M Households (avg 2.6 people/hh)' },
      { label: 'India', value: '1.42 Billion', note: '~300M Households (avg 4.5-4.8 people/hh)' },
      { label: 'United Kingdom', value: '68 Million', note: '~28M Households (avg 2.4 people/hh)' },
      { label: 'European Union', value: '450 Million', note: '~200M Households' },
      { label: 'New York City', value: '8.5 Million', note: '~10M Metro day population with commuters' },
      { label: 'London', value: '9.0 Million', note: '~3.5M Households' },
      { label: 'San Francisco / Bay Area', value: '870k / 7.7M Metro', note: 'High tech & ride-hail adoption' }
    ]
  },
  {
    category: '👥 Age & Demographic Splits',
    items: [
      { label: 'Kids & Teens (0 - 18)', value: '~22% (US/UK) | ~27% (India)', note: 'Primarily dependent users, school/edtech' },
      { label: 'Young Adults (18 - 35)', value: '~24% (US) | ~30% (India)', note: 'Peak smartphone, social, ride-hail, gig economy' },
      { label: 'Working Age (35 - 60)', value: '~34% (US) | ~30% (India)', note: 'High purchasing power, household decision makers' },
      { label: 'Seniors (60+)', value: '~20% (US/UK) | ~13% (India)', note: 'Accessibility focus, healthcare, travel' },
      { label: 'Urban vs Rural (India)', value: '35% Urban / 65% Rural', note: 'Tier 1 (~10%), Tier 2/3 (~25%)' },
      { label: 'Urban vs Rural (US)', value: '82% Urban & Suburban / 18% Rural', note: 'High car dependency outside major cities' }
    ]
  },
  {
    category: '📱 Tech & Internet Penetration',
    items: [
      { label: 'Smartphone Users (US/EU)', value: '~88% - 92%', note: 'iOS (~55% in US), Android (~45% in US)' },
      { label: 'Smartphone Users (India)', value: '~650-700 Million (~50%)', note: 'Android (~95%), iOS (~5%)' },
      { label: 'Internet Users Globally', value: '~5.4 Billion (~67%)', note: 'Mobile-first in APAC/Africa' },
      { label: 'Broadband / Wi-Fi (US)', value: '~85% of households', note: 'High video streaming adoption' },
      { label: 'Daily Screen Time (Avg)', value: '~6.5 - 7.0 Hours', note: 'Mobile accounts for ~4 hours' }
    ]
  },
  {
    category: '🚗 Mobility & Commerce Metrics',
    items: [
      { label: 'Average Car Lifespan', value: '12 Years (~150k miles / 240k km)', note: '~12,000 miles per year per car (US)' },
      { label: 'E-Commerce Penetration (US)', value: '~16-18% of total retail', note: 'Higher in electronics & apparel (~30%+)' },
      { label: 'E-Commerce Penetration (India)', value: '~7-9% of total retail', note: 'Rapid tier-2/3 expansion' },
      { label: 'Ride-Hailing Take Rate', value: '20% - 28%', note: 'Uber/Lyft commission per trip' },
      { label: 'Food Delivery Commission', value: '18% - 30%', note: 'DoorDash/Swiggy from restaurant bill' }
    ]
  },
  {
    category: '⏱️ Conversion & Product Benchmarks',
    items: [
      { label: 'E-Commerce Cart-to-Order Rate', value: '2.5% - 3.5% overall', note: 'Add-to-cart is ~8-10%' },
      { label: 'SaaS Free-to-Paid Conversion', value: '2% - 5% (Freemium)', note: 'Product-led growth benchmark' },
      { label: 'App Install-to-Signup Drop', value: '20% - 35% attrition', note: 'Friction on registration & OTP' },
      { label: 'DAU / MAU Stickiness Ratio', value: '>50% (Social), >20% (Productivity)', note: 'Over 50% is world-class (Meta, WhatsApp)' }
    ]
  }
];
