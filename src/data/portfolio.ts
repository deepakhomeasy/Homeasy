// data/portfolio-data.ts
export interface StudioFeature {
  icon: string;
  title: string;
  description: string;
}

export interface StudioGalleryImage {
  url: string;
  caption: string;
  zone: string;
}

export interface ExperienceStudioDetail {
  id: string;
  name: string;
  location: string;
  address: string;
  badge: 'FLAGSHIP' | 'PREMIUM' | 'DESIGN STUDIO';
  heroImg: string;
  gallery: StudioGalleryImage[];
  desc: string;
  longDesc: string;
  features: StudioFeature[];
  stats: { label: string; value: string }[];
  timings: string;
  contact: string;
  mapEmbed?: string;
  speciality: string[];
  availableSlots: string[];
}

export interface PortfolioWork {
  id: string;
  title: string;
  category: 'villa' | 'office' | 'penthouse' | 'resort' | 'kitchen';
  location: string;
  area: string;
  year: string;
  tag: string;
  heroImg: string;
  gallery: { url: string; caption: string }[];
  desc: string;
  longDesc: string;
  features: string[];
  techStack: string[];
  client: string;
  testimonial?: { quote: string; author: string; role: string };
  awards?: string[];
  stats: { label: string; value: string }[];
}

export const studiosData: ExperienceStudioDetail[] = [
  {
    id: 'mumbai',
    name: 'Mumbai (BKC)',
    location: 'BKC Metropolitan Area',
    address: 'Platina, G-Block, Bandra Kurla Complex, Mumbai - 400051',
    badge: 'FLAGSHIP',
    heroImg:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyf9js8B3z1yJOvinr6_ixYELMHS0vMuI-9qozaPao0B9Tvz_OhdTfF_ipSt6wz6f7o05gcrxDxMxknB-XWJIIJv-5FaIEd7pnXBJkaMlRMjC50IpH_bu8JmvEIcPdl7GpgRFC3mkrD7LtDwgXoyeGS2lYH8b2E2caCtd39i_9SNtlLTSUtKqE4ZbT_MECaCGaN-aEd1bwMdhBnVlnOAGgm16UgFdGLcTHaX1MMA-hRAihdFm2AvX5Bzfb0mh_raZyubdkLsSSsQE',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
        caption: 'Luxury Master Bedroom Suite Display',
        zone: 'Zone A — Bedroom Living'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        caption: 'Architectural Glass Facade Installation',
        zone: 'Zone B — Glass Architecture'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
        caption: 'Pooja Sanctuary Smart Lighting Room',
        zone: 'Zone C — Sacred Spaces'
      },
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
        caption: 'Premium Living Room Automation Demo',
        zone: 'Zone D — Living Spaces'
      },
      {
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        caption: 'Smart Kitchen Integration Panel',
        zone: 'Zone E — Kitchen Hub'
      },
      {
        url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
        caption: 'Home Theatre & Ambience Control',
        zone: 'Zone F — Entertainment'
      }
    ],
    desc: 'Our Mumbai central flagship showcase features luxury bedroom settings, full architectural mock glass facades, and a stateful pooja sanctuary room preview.',
    longDesc:
      'The BKC Flagship is Homeasy\'s crown jewel — a 12,000 sq ft living testament to what India\'s finest residences can become. Spread across two floors within the Platina tower, every corner is designed as a fully operational demo space, letting clients experience real-time smart controls, lighting scenes, and climate automation in actual room configurations. Our team of certified design consultants walks you through 18 distinct smart zones — from a Rajasthani-influenced pooja sanctuary fitted with motion-sensitive oil lamp simulations, to a sunlit glass pavilion bedroom that dynamically adjusts blinds based on solar angles.',
    features: [
      { icon: '🏛️', title: '18 Smart Zones', description: 'Fully operational smart rooms including bedrooms, bathrooms, kitchen, lounge, and sacred spaces.' },
      { icon: '🪟', title: 'Glass Facade Lab', description: 'Full architectural mock glass installation showing motorized blinds, UV filters, and smart tint technology.' },
      { icon: '🕯️', title: 'Pooja Sanctuary', description: 'Culturally curated sacred space with ambient lighting, incense sensor control, and soft chime automation.' },
      { icon: '🎬', title: 'Private Cinema Bay', description: '12-seater acoustic cinema room with spatial audio demonstration and scene-based lighting presets.' },
      { icon: '🌡️', title: 'Climate Lab', description: 'Real-time HVAC simulation comparing traditional AC vs AI-driven climate management system.' },
      { icon: '🔐', title: 'Security Hub', description: 'Live demonstration of biometric locks, camera AI, visitor management, and perimeter fence automation.' }
    ],
    stats: [
      { label: 'Total Area', value: '12,000 sq ft' },
      { label: 'Smart Zones', value: '18 Zones' },
      { label: 'Yearly Visitors', value: '24,000+' },
      { label: 'Projects Closed', value: '340+' }
    ],
    timings: '10:00 AM – 8:00 PM (Mon–Sun)',
    contact: '+91 98200 00001',
    speciality: [
      'Luxury Residential Automation',
      'Sacred Space Lighting',
      'Glass Facade Tech',
      'Home Cinema Systems',
      'Climate AI Systems'
    ],
    availableSlots: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM']
  },
  {
    id: 'delhi',
    name: 'Delhi (Gurugram)',
    location: 'Delhi NCR Corridor',
    address: 'Golf Course Road, Sector 54, Gurugram, Haryana - 122003',
    badge: 'PREMIUM',
    heroImg:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBymu9TgDiu2nBzKy2MilxKx2zp0LJI80t-StkzblrUXNXl0gc4g4o645So2_y6hU-Kr3TI2Yxbx8OoNQcOP4gHhhaMR8UngAN7QzAsF9gfQ9O0nLS54AXSZFmYnAiGpD1RbrUoNvt15uAVpuZsZ8kN_xht-dNr9JaVVur9uVwDDxDG0IEw5g6kdSDu8orkefOKDcRg0PSy0m6xuadtxazSlZ5Tv2HUrUiQ8Z2-uNNYM1Ij3_f2Y_i-f-trbwqKOUyWGiIDq3JSk6Y',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        caption: 'Corporate Boardroom with Interactive Table',
        zone: 'Zone A — Corporate Hub'
      },
      {
        url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
        caption: 'Seamless Marble Integration Showroom',
        zone: 'Zone B — Marble & Materials'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80',
        caption: 'Motorized Drapery Simulation Suite',
        zone: 'Zone C — Drapery Lab'
      },
      {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
        caption: 'Premium Open-Plan Office Automation',
        zone: 'Zone D — Open Office'
      },
      {
        url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&q=80',
        caption: 'Executive Lounge Smart Controls',
        zone: 'Zone E — Lounge'
      },
      {
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        caption: 'Penthouse Terrace Automation Model',
        zone: 'Zone F — Outdoor'
      }
    ],
    desc: 'A premium, high-key open environment showing seamless marble integration, corporate interactive tables, and custom motorized drapery simulators.',
    longDesc:
      'The Gurugram Premium Studio is tailored for Delhi NCR\'s high-powered corporate and luxury real estate clientele. Located on the prestigious Golf Course Road, this 9,500 sq ft studio channels the energy of India\'s most ambitious business district. Interactive smart tables allow clients to configure room automation in real time. Marble corridors lined with embedded LED pathways showcase how architectural materials can coexist seamlessly with smart tech. The motorized drapery simulator alone hosts 40+ fabric textures across 6 light-temperature zones, helping clients make truly informed choices.',
    features: [
      { icon: '🪨', title: 'Marble Integration Lab', description: 'Live demonstration of marble flooring with embedded heating systems and pressure-sensitive pathways.' },
      { icon: '🖥️', title: 'Corporate Interactive Table', description: '8-seat boardroom with AI-powered meeting table featuring real-time automation control overlays.' },
      { icon: '🪟', title: 'Drapery Simulator', description: '40+ fabric options across 6 lighting temperature zones with motorized track demo.' },
      { icon: '💼', title: 'Executive Suite Pod', description: 'Private 4-room executive home office configuration with soundproofing and biometric access demo.' },
      { icon: '🌬️', title: 'Adaptive Air Systems', description: 'Zone-wise air quality monitoring with real-time purification and CO₂ tracking.' },
      { icon: '📲', title: 'Control Panel Showroom', description: 'Wall of 24 smart panel designs from minimalist to luxury brass-finish options.' }
    ],
    stats: [
      { label: 'Total Area', value: '9,500 sq ft' },
      { label: 'Smart Zones', value: '14 Zones' },
      { label: 'Yearly Visitors', value: '18,000+' },
      { label: 'Projects Closed', value: '210+' }
    ],
    timings: '10:00 AM – 8:00 PM (Mon–Sat)',
    contact: '+91 98110 00002',
    speciality: [
      'Corporate Automation',
      'Marble & Material Integration',
      'Motorized Drapery',
      'Executive Suites',
      'Smart Panel Design'
    ],
    availableSlots: ['10:00 AM', '11:30 AM', '1:00 PM', '3:00 PM', '5:30 PM']
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru (Koramangala)',
    location: 'Tech Valley Hub',
    address: '80 Feet Road, 4th Block, Koramangala, Bengaluru - 560034',
    badge: 'DESIGN STUDIO',
    heroImg:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9VA4RWqEVWiTlnmFZWaaa_ixUgbBV4Xh1q14AWvpDKXu40Dusf523Sdz7e4uvLKelRVhTHN6hsuaL9y15tNa6TJIpuGZtXXedXoygsKJh88_wPEZIyW0G9uhtueQF_RPZMPy5sZ3vcvfDg3niJNZEMgDH_RV11O5ZZBrpW-NNV7vVonbvLJYjtQXVzTh3_w1C38DfaaJageKEw-0oNgw2K8S9u7nczPOjqmxFnFfTPAMDooCiuAB0cn71zA-YrCqxYOZPuTxU2v0',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        caption: 'Biophilic Living Room with Plant Integration',
        zone: 'Zone A — Biophilic Hub'
      },
      {
        url: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80',
        caption: 'Futuristic Automation Control Cockpit',
        zone: 'Zone B — Tech Core'
      },
      {
        url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80',
        caption: 'Native Plant + Smart Sensor Garden',
        zone: 'Zone C — Green Wall'
      },
      {
        url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
        caption: 'AI Design Lab — 3D Space Visualizer',
        zone: 'Zone D — Design Lab'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        caption: 'Smart Workspace Pod Prototype',
        zone: 'Zone E — Work Pods'
      },
      {
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        caption: 'Outdoor Terrace Automation Garden',
        zone: 'Zone F — Terrace Smart Garden'
      }
    ],
    desc: 'Blends biophilic interior designs with futuristic automation elements, featuring lush native plants positioned beside aerospace control panels.',
    longDesc:
      'Homeasy\'s Bengaluru Design Studio is where nature meets neural networks. Designed for the innovation-first residents of India\'s Silicon Valley, this 8,200 sq ft studio is half living lab, half art installation. Vertical living walls breathe alongside precision-engineered control panels. The centerpiece is the AI Design Lab — a room-sized 3D visualization system that lets clients walk through a digital twin of their home before a single wire is installed. For tech professionals who think about their homes the same way they think about their products, this studio speaks their language.',
    features: [
      { icon: '🌿', title: 'Biophilic Integration Zone', description: 'Living walls with 200+ native plant species monitored by embedded soil sensors and auto-irrigation systems.' },
      { icon: '🤖', title: 'AI Design Lab', description: 'Room-scale 3D home visualization system — walk through your future smart home before installation begins.' },
      { icon: '🛸', title: 'Aerospace Control Panel', description: 'Future-forward home control UI inspired by aerospace HMI, with full voice + gesture support.' },
      { icon: '🌱', title: 'Smart Garden Terrace', description: 'Rooftop automation garden with drip irrigation, grow-light timing, and weather-adaptive covering.' },
      { icon: '💡', title: 'Circadian Lighting Studio', description: 'Full-spectrum lighting lab showing how light temperature changes impact mood, productivity and sleep.' },
      { icon: '🔬', title: 'Prototype Testing Bay', description: 'Hands-on area where clients test beta hardware — new switches, panels, and sensor arrays before launch.' }
    ],
    stats: [
      { label: 'Total Area', value: '8,200 sq ft' },
      { label: 'Smart Zones', value: '12 Zones' },
      { label: 'Yearly Visitors', value: '15,000+' },
      { label: 'Projects Closed', value: '175+' }
    ],
    timings: '10:00 AM – 7:00 PM (Mon–Sat)',
    contact: '+91 97400 00003',
    speciality: [
      'Biophilic Smart Design',
      'AI Home Visualization',
      'Circadian Lighting',
      'Green Wall Systems',
      'Prototype Beta Testing'
    ],
    availableSlots: ['10:00 AM', '12:00 PM', '2:30 PM', '4:00 PM', '6:00 PM']
  }
];

export const portfolioWorks: PortfolioWork[] = [
  {
    id: 'azure-estate-alibaug',
    title: 'Azure Estate, Alibaug',
    category: 'villa',
    location: 'Alibaug, Maharashtra',
    area: '8,400 sq ft',
    year: '2023',
    tag: 'Full Smart Automation • Beverly Hills Aesthetics',
    heroImg:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA55UfwCCnRQOzvXWRYKlusSwmJbbWfE8rRW0dC9R6qtWhEtdigH9QBD_gPgtdM_HqT_fZGwTllXu5gB0_cPSnk7em_pIezCgnrukcnNikgLnWgKud8hdJNc30pMJx4DCZ79LlhML5sk86WIVjEgSTONCUEvNVS3ra3x5UFycVzF_C3TZ5gU_9OuKIL3Iumm27hUZ7_QDG7zOKmNa2-kErVKHOOVMDfCCJXDcm5sWUqR5445DXkvdUrRbMcocIYdhUq3_e7avg6Z5U',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', caption: 'Infinity Pool Overlooking Arabian Sea' },
      { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', caption: 'Master Bedroom with Smart Blinds' },
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', caption: 'Open Kitchen with Sensor Relay' },
      { url: 'https://images.unsplash.com/photo-1600607687644-c7f34b5063c7?w=800&q=80', caption: 'Home Theatre Acoustic Setup' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', caption: 'Garden Perimeter Smart Lighting' }
    ],
    desc: 'A sprawling 5-bedroom beachfront villa in Alibaug integrated with full Homeasy smart automation — from wave-sensing outdoor ambient systems to voice-activated pooja spaces.',
    longDesc:
      'Azure Estate redefines the concept of a weekend retreat. This 8,400 sq ft beachside villa commissioned by a Mumbai industrialist family demanded a system that could operate autonomously when unoccupied and switch to full family-mode within minutes of arrival. Homeasy installed 240 smart nodes across 22 rooms, 4 outdoor zones, and a private jetty approach path. The highlight is the sea-facing master bedroom that reads ocean light conditions and adjusts interior ambience accordingly — simulating golden hour even at noon when needed. Solar energy integration offsets 60% of total power consumption.',
    features: [
      '240 Smart Nodes Installed',
      'Solar-Integrated Power Grid',
      'Wave Ambient Sensing Exterior Lights',
      'Biometric Entry All 6 Entry Points',
      'AI Climate Control per Room',
      'Smart Irrigation for 1.2 Acre Garden',
      'Automated Pool Chemistry Monitoring',
      'Surround Sound 7.2 Outdoor Setup'
    ],
    techStack: ['Homeasy Core X7', 'KNX Protocol', 'Solar Grid Interface', 'Lutron Shading', 'Crestron AV', 'Honeywell Climate'],
    client: 'Private — Mumbai Industrialist Family',
    testimonial: {
      quote: 'We arrive from the ferry and by the time we reach the gate, the villa has already adjusted to our family profile — lights, temperature, music, even the pool temperature. It\'s not a home anymore, it feels alive.',
      author: 'Vikram R.',
      role: 'Owner, Azure Estate'
    },
    awards: ['India Smart Home Awards 2023 — Best Villa Install', 'Design & Automation Excellence Award, CEDIA India'],
    stats: [
      { label: 'Smart Nodes', value: '240' },
      { label: 'Zones Automated', value: '26' },
      { label: 'Solar Offset', value: '60%' },
      { label: 'Install Timeline', value: '14 Weeks' }
    ]
  },
  {
    id: 'tech-hub-gurugram',
    title: 'Tech Hub Gurugram HQ',
    category: 'office',
    location: 'Sector 32, Gurugram, Haryana',
    area: '32,000 sq ft',
    year: '2023',
    tag: 'Dynamic Circuits & Adaptive Air Flow',
    heroImg:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC4LCwGYnUiuFNeqhzo38w9_6AXV8cBtNn3Y9gUfB4HJFeVmphjKsghBrkBDnhxoqESvofPcRIfEtdnHwFUDVhqQqtwDhiPjZj_rN3URDeMGEhXXy_NRuG8dErsc8Mu-zbSYA3n5-hQY6UMG1u-y76PDPDzQQxGYCVsPWtde457kaHNlL8lh3JvIE9KnH1hGT4iorcF0uqUA4OYveeAw_9ACyqZc7ziYFTVH6-eipRjXdBzs5NOHcXV0jiqh-00MVORnMWQmvJZR6c',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', caption: 'Open Floor AI Lighting Grid' },
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', caption: 'Smart Boardroom with AV Control' },
      { url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80', caption: 'Focus Pods — Adaptive Noise Cancel' },
      { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80', caption: 'Reception with Presence Sensing Lights' },
      { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80', caption: 'Server Room Climate Automation' }
    ],
    desc: 'A 32,000 sq ft SaaS company HQ in Gurugram equipped with dynamic circuit load balancing, occupancy-adaptive air flow, and productivity lighting systems across 8 floors.',
    longDesc:
      'This project represents Homeasy\'s most ambitious commercial deployment to date. A fast-scaling SaaS company needed their new Gurugram HQ to match their technology philosophy — deeply intelligent, constantly learning, and quietly efficient. We designed a layered automation architecture spanning 8 floors, 450 desks, 12 conference rooms, and 6 executive cabins. The system learns weekly occupancy patterns and adjusts HVAC pre-conditioning 45 minutes ahead of predicted arrival times. Energy savings in the first quarter alone paid for 18% of the total installation cost.',
    features: [
      'Occupancy-Predictive HVAC Pre-Conditioning',
      'Dynamic Circuit Load Balancing',
      '450-Desk Presence-Adaptive Lighting',
      '12 Smart Conference Rooms',
      'Biometric Access 32 Entry Points',
      'AI Energy Dashboard — Real Time',
      'Cafeteria Queue & Occupancy Display',
      'Server Room ±0.5°C Precision Climate'
    ],
    techStack: ['Homeasy Enterprise Suite', 'Siemens BMS', 'Cisco IoT Grid', 'Lutron EcoSystem', 'Crestron NVX', 'Schneider Energy'],
    client: 'Confidential — Listed SaaS Company, NSE',
    testimonial: {
      quote: 'Our electricity bill dropped 38% in the first 6 months. But more than that — employees started reporting better focus and less fatigue. The lighting and air quality systems quietly changed how people feel at work.',
      author: 'Head of Operations',
      role: 'Fortune 500 SaaS Company'
    },
    awards: ['IGBC Green Building Smart Tech Award 2023', 'CBRE Commercial Real Estate Innovation Prize'],
    stats: [
      { label: 'Total Area', value: '32,000 sq ft' },
      { label: 'Smart Devices', value: '1,200+' },
      { label: 'Energy Saved', value: '38%' },
      { label: 'ROI Timeline', value: '22 Months' }
    ]
  },
  {
    id: 'sky-residence-mumbai',
    title: 'Sky Residence, South Mumbai',
    category: 'penthouse',
    location: 'Worli Sea Face, South Mumbai',
    area: '6,800 sq ft',
    year: '2022',
    tag: 'Spatial Audio Nodes & Light Orchestrators',
    heroImg:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuACOJ8jHExAWmDOvRY1GGOTjieaes1f16X9PQpBlDAFMKh2fa0WoeQ0XsQVUNgaVBLx4hbeiCPwKDi4YP0ILan0mIJBV4xiNQlk2KI39bQBh93zOWSAudskjYN4E5tiSY1H8hKVHWcY7AMDuA9tLwVP7np0Uz94lG5CX4PdsDCEBSYpUvBGHWO5F47k2S8gIitK4f1lfavc5VZnBmkBLGB3a9o0tNjW5CmAN4ap9AQzkQAHrIYztrZGr_n7exUWAu5Z0KTcDibM7HM',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', caption: '270° Sea View Living Room' },
      { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', caption: 'Spatial Audio Node Installation' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', caption: 'Rooftop Terrace Smart Lighting' },
      { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', caption: 'Master Bath Chromotherapy System' },
      { url: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80', caption: 'Private Wine Cellar Climate Pod' }
    ],
    desc: 'A 6,800 sq ft duplex penthouse at Worli Sea Face, built around spatial audio orchestration and a 64-zone circadian lighting system that mirrors the Arabian Sea\'s natural light cycle.',
    longDesc:
      'Sky Residence is a meditation on light and sound. The client — a renowned classical musician and entrepreneur — wanted a home that responded to art the way a concert hall responds to performance. Homeasy\'s spatial audio engineers installed 48 invisible in-ceiling speaker nodes tuned to the room\'s acoustic profile. The lighting system, built around a custom 64-zone Lutron-Homeasy integration, tracks the real-time colour of the sea and sky through a rooftop sensor, then recreates it indoors. The result is a home that has no single permanent lighting state — it is in perpetual, subtle motion, just like its view.',
    features: [
      '48 Invisible Spatial Audio Nodes',
      '64-Zone Circadian Lighting System',
      'Sea-Light Mimicry Algorithm',
      'Chromotherapy Smart Bathroom',
      'Private Wine Cellar Climate ±1°C',
      'Rooftop Telescopic Shade Automation',
      'Silent Butler App — Zero Voice Command Mode',
      'Art Lighting — Gallery-Grade Precision'
    ],
    techStack: ['Homeasy Core X9 Luxury', 'Lutron Homeworks QSX', 'Sonance Invisible Speaker Array', 'Savant Pro', 'Crestron Pyng', 'Control4 EA-5'],
    client: 'Private — Classical Musician & Entrepreneur',
    testimonial: {
      quote: 'I\'ve lived in homes across four continents. This is the first one that feels like it listens to me. Not to my commands — to my moods.',
      author: 'Rohan K.',
      role: 'Owner, Sky Residence'
    },
    awards: ['Luxury Residential Automation Award, CEDIA India 2022', 'Architectural Digest AD100 Smart Home Feature'],
    stats: [
      { label: 'Audio Nodes', value: '48' },
      { label: 'Light Zones', value: '64' },
      { label: 'Smart Devices', value: '380' },
      { label: 'Install Timeline', value: '18 Weeks' }
    ]
  },
  {
    id: 'jaipur-palace-resort',
    title: 'Jaipur Palace Heritage Resort',
    category: 'resort',
    location: 'Civil Lines, Jaipur, Rajasthan',
    area: '1,20,000 sq ft',
    year: '2022',
    tag: 'Classical Arches Integrated with Touch Relays',
    heroImg:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCA7CARIOqu6UpX7PPY1GH8eLI-TrZFnPnpc7gV64Kah4VwP3cOXQDwiH9RoZh6D03Z2lfqsLmqIJKd1Vj-iImZnmwrYsuazu4i3wc1KfgKSm_dh7wOGsqhdu3q_UZK77CYCzV173r6eUl-yKgLcVDogkg9grSusMNp1DZH9YitTnLwcQPmcYPa4Qw9fzDpd9xuZtI82wTWOSOiFdnTsGezjqvNviAkknUyyq8qdL-vsAFo1spkr0H8UnPp2bGXm-hIiaW-dDl69Kw',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', caption: 'Heritage Suite with Touch Relay Panels' },
      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', caption: 'Royal Banquet Hall Smart Ambience' },
      { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', caption: 'Palace Courtyard Lighting Automation' },
      { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', caption: 'Luxury Spa Environmental Control' },
      { url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80', caption: 'Rooftop Restaurant Scene Automation' }
    ],
    desc: 'A heritage palace converted into a 5-star resort where 19th century Rajput arches coexist with invisible smart relays, scene-based lighting, and guest-profile room automation.',
    longDesc:
      'The Jaipur Palace project is Homeasy\'s most culturally sensitive and architecturally complex installation. The 200-year-old palace, now operating as a luxury heritage resort, required every piece of technology to be completely invisible from the outside yet flawlessly functional within. Over 86 heritage rooms were fitted with custom flush-mount touch relays designed to match the original sandstone and teak finishes. The guest app allows visitors to set personal preferences before arrival — from fragrance diffuser settings to wake-up light sequences — which the palace adopts as a curated, personalized ritual for each stay.',
    features: [
      '86 Heritage Rooms Fully Automated',
      'Custom Sandstone-Finish Touch Relays',
      'Guest Profile Pre-Arrival Personalization',
      'Banquet Hall 400-Person Scene Control',
      'Palace Courtyard Dramatic Lighting Grid',
      'Spa Chromotherapy & Climate System',
      'Kitchen-to-Room Service IoT Relay',
      'Solar Roof + Heritage Battery Bank'
    ],
    techStack: ['Homeasy Heritage Suite', 'KNX/EIB Protocol', 'Custom Flush Relay Hardware', 'Crestron Hospitality', 'Ketra Natural Light', 'Lutron Vive'],
    client: 'Jaipur Palace Heritage Hotels Pvt. Ltd.',
    testimonial: {
      quote: 'Our guests are heritage lovers — they come for tradition, not technology. Homeasy made the technology so seamless that guests don\'t feel the tech. They just feel more pampered.',
      author: 'Maharaj Pratap S.',
      role: 'Managing Director, Jaipur Palace Heritage Hotels'
    },
    awards: ['UNESCO Heritage & Technology Integration Commendation', 'India Hospitality Tech Award 2022 — Grand Prix'],
    stats: [
      { label: 'Heritage Rooms', value: '86' },
      { label: 'Smart Devices', value: '2,400+' },
      { label: 'Property Size', value: '1,20,000 sq ft' },
      { label: 'Install Timeline', value: '28 Weeks' }
    ]
  },
  {
    id: 'premium-kitchen-concept',
    title: 'Premium Kitchen Concept Grid',
    category: 'kitchen',
    location: 'Baner, Pune, Maharashtra',
    area: '2,200 sq ft',
    year: '2024',
    tag: 'Surge Shield & Gas Sensor Auto Relay',
    heroImg:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVV713ufS_2CT4JLdGk0m3PbLD22uXInMJP-Fa93EXEWWquks9Vw3UCfwZb0lep-8zOKF8A44gfoon5LX1cDTBsaIlcx5jlwXP-DlCvCgwWpzFIqoYuFOVadw86wum1scUm82ltrU3I2J6khr0ru7YMr-My5tX8VyDfSStAx_G8Z0Ctkngy_E5cNmJLTeT9x-nq2mZ_O40gc4awgWhDYgqYCOGZB_tb_J1DAo_2KOjoZk3cSlx1Z7d_U4EfQo_K4D2r1hSWChu4yI',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', caption: 'Surge Shield Main Panel Installation' },
      { url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80', caption: 'Gas Sensor Relay Auto-Cutoff Demo' },
      { url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', caption: 'Smart Appliance Integration Grid' },
      { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80', caption: 'Under-Counter LED & Motion Lighting' },
      { url: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80', caption: 'Chef Voice-Command Cooking Mode' }
    ],
    desc: 'A prototype smart kitchen installation in Pune built around safety-first automation — featuring 5-point gas leak sensing, surge protection relays, and a chef-mode voice cooking assistant.',
    longDesc:
      'This project began as an experiment and became a product line. When a Pune-based hospitality entrepreneur approached Homeasy wanting to make their home kitchen as smart and safe as a professional restaurant, the team saw an opportunity to create a replicable framework. The result is the Kitchen Concept Grid — a modular smart kitchen system with 5-zone gas sensing, automatic stove cutoff on smoke/flame anomaly, surge-protected appliance circuits, and a chef voice assistant that can read out recipes, set timers, and control exhaust fans. The system has since been deployed in 40+ premium kitchen retrofits across Pune and Mumbai.',
    features: [
      '5-Zone Gas Leak Detection Network',
      'Auto Stove Cutoff on Flame Anomaly',
      'Surge Shield Appliance Protection',
      'Chef Voice Assistant Integration',
      'Smart Exhaust Fan with AQI Link',
      'Under-Counter Motion Lighting',
      'Refrigerator Temperature Logging',
      'Water Purifier Usage Analytics'
    ],
    techStack: ['Homeasy Kitchen Module', 'Honeywell Gas Sensors', 'Surge Guard Pro Series', 'Alexa Kitchen Skill (Custom)', 'Philips Hue Under-Counter', 'AWS IoT Core'],
    client: 'Private — Hospitality Entrepreneur, Pune',
    testimonial: {
      quote: 'My elderly mother is home alone often. The gas sensor auto-cutoff alone gave my entire family peace of mind. Everything else is a bonus.',
      author: 'Ananya M.',
      role: 'Homeowner, Baner Pune'
    },
    awards: ['Smart Safety Innovation Award — NASSCOM IoT Council 2024'],
    stats: [
      { label: 'Gas Sensor Zones', value: '5' },
      { label: 'Safety Devices', value: '28' },
      { label: 'Replicated Across', value: '40+ Homes' },
      { label: 'Install Timeline', value: '5 Days' }
    ]
  },
  // ============ NEW PROJECTS ADDED BELOW ============
  {
    id: 'serenity-villa-goa',
    title: 'Serenity Villa, North Goa',
    category: 'villa',
    location: 'Assagao, North Goa',
    area: '5,600 sq ft',
    year: '2024',
    tag: 'Portuguese Heritage Meets Quiet Intelligence',
    heroImg: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', caption: 'Indo-Portuguese Courtyard Lighting' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', caption: 'Tropical Master Suite Setup' },
      { url: 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&q=80', caption: 'Lap Pool with Ambient Sound Zones' },
      { url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80', caption: 'Open-Air Dining with Climate Curtains' }
    ],
    desc: 'A 4-bedroom heritage Portuguese villa in Assagao reimagined with humidity-adaptive controls, monsoon-mode automation, and hidden smart wiring through original laterite walls.',
    longDesc:
      'Serenity Villa is a delicate dance between preservation and progress. The 180-year-old Indo-Portuguese structure needed automation that respected its weathered laterite walls, hand-painted azulejos tiles, and original Burma teak beams. Homeasy engineered a wireless mesh system that required zero structural drilling, integrating with the home through invisible sensor nodes embedded in furniture and ceiling crowns. The monsoon mode — unique to coastal homes — automatically seals openings, activates dehumidifiers, and shifts lighting to warmer tones during heavy rains.',
    features: [
      'Wireless Mesh — Zero Wall Drilling',
      'Humidity-Adaptive Climate Mode',
      'Monsoon Auto-Seal & Dehumidify',
      'Heritage-Finish Switch Panels',
      'Outdoor Speaker Zones (5 Areas)',
      'Smart Pool Maintenance Suite',
      'Mosquito Repellent Auto-Diffusers',
      'Tropical Lighting Color Profiles'
    ],
    techStack: ['Homeasy Coastal Edition', 'Zigbee Mesh Network', 'Daikin VRV', 'Sonos Outdoor', 'Hunter Industries Irrigation', 'Aqara Sensors'],
    client: 'Private — Bollywood Production House Owner',
    testimonial: {
      quote: 'I bought this villa for its soul. Homeasy was the only team that understood not to disturb that soul. They added intelligence without subtracting character.',
      author: 'Karan M.',
      role: 'Owner, Serenity Villa'
    },
    stats: [
      { label: 'Heritage Age', value: '180 Yrs' },
      { label: 'Smart Devices', value: '160' },
      { label: 'Zero Drill Install', value: '100%' },
      { label: 'Install Timeline', value: '9 Weeks' }
    ]
  },
  {
    id: 'titan-corporate-tower',
    title: 'Titan Corporate Tower',
    category: 'office',
    location: 'Whitefield, Bengaluru',
    area: '48,000 sq ft',
    year: '2024',
    tag: 'AI-Driven Multi-Floor Energy Orchestration',
    heroImg: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', caption: 'Multi-Floor Energy Dashboard' },
      { url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80', caption: 'Smart Conference Wing — Floor 7' },
      { url: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80', caption: 'Wellness Lounge Automation' },
      { url: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&q=80', caption: 'Cafeteria IoT Display Wall' }
    ],
    desc: 'A 12-floor enterprise headquarters automated end-to-end with AI energy orchestration, wellness-aware lighting, and predictive maintenance for HVAC and electrical systems.',
    longDesc:
      'Titan Corporate Tower was Homeasy\'s first project to deploy our proprietary OrcaIQ™ predictive maintenance engine across an entire building stack. The system monitors 2,400+ sensors in real-time, flagging anomalies up to 14 days before failure. Each of the 12 floors operates as an independent micro-grid, with energy redistributed dynamically based on occupancy and time of day. Wellness-aware lighting tracks employee circadian patterns through anonymous WiFi signals, gently warming color temperatures as afternoon fatigue typically sets in.',
    features: [
      '12-Floor Multi-Grid Architecture',
      'OrcaIQ Predictive Maintenance AI',
      'Wellness-Aware Circadian Lighting',
      '2,400+ Real-Time Sensors',
      'EV Charging Stations (40 Bays)',
      'Smart Parking Guidance System',
      'Touchless Elevator Destination Control',
      'Air Quality Display per Floor'
    ],
    techStack: ['Homeasy OrcaIQ Engine', 'Johnson Controls Metasys', 'Tridium Niagara', 'Philips Interact', 'Cisco Meraki', 'Schneider EcoStruxure'],
    client: 'Titan Enterprises Limited',
    testimonial: {
      quote: 'The predictive maintenance alone saved us ₹84 lakhs in our first year by flagging issues before breakdowns. The system literally pays for itself.',
      author: 'Sandeep V.',
      role: 'VP Facilities, Titan Enterprises'
    },
    awards: ['Best Smart Building India 2024', 'LEED Platinum Certified Tech Integration'],
    stats: [
      { label: 'Floors Automated', value: '12' },
      { label: 'Sensors Deployed', value: '2,400+' },
      { label: 'Energy Saved', value: '42%' },
      { label: 'Predictive Alerts/Month', value: '180' }
    ]
  },
  {
    id: 'cloud-nine-penthouse',
    title: 'Cloud Nine Penthouse',
    category: 'penthouse',
    location: 'DLF Camellias, Gurugram',
    area: '9,200 sq ft',
    year: '2024',
    tag: 'Triplex Sky Living with Helipad Automation',
    heroImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', caption: 'Triplex Grand Staircase Lighting' },
      { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80', caption: 'Sky Lounge Glass Floor Scene' },
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', caption: 'Helipad Approach Lighting' },
      { url: 'https://images.unsplash.com/photo-1600607688066-890987f18a86?w=800&q=80', caption: 'Master Suite with City Panorama' }
    ],
    desc: 'A triplex sky penthouse spanning floors 38-40 of DLF Camellias, featuring full helipad automation, infinity glass-bottom lounge controls, and 3-floor synchronized lighting orchestration.',
    longDesc:
      'Cloud Nine Penthouse is among the most exclusive residential addresses in India. The 9,200 sq ft triplex required automation across three floors connected by a sweeping cantilevered staircase. Synchronizing scenes across vertically separated spaces demanded a custom timing engine to ensure lighting transitions felt seamless when moving between floors. The private helipad on the topmost level includes weather-monitored landing lights, automated wind sock illumination, and a guest-arrival sequence that prepares the home from the moment a helicopter approaches the building.',
    features: [
      'Triplex Synchronized Scene Engine',
      'Helipad Weather & Approach Lighting',
      'Glass-Bottom Lounge Privacy Controls',
      '3-Floor Cantilever Stair Lighting',
      'Private Elevator Biometric Access',
      'Cigar Room Climate ±0.5°C',
      'Indoor Waterfall Audio Sync',
      'Sky-Spa with Steam Automation'
    ],
    techStack: ['Homeasy Apex X10', 'Crestron Home OS4', 'Lutron Ketra Natural Light', 'Bang & Olufsen Stage', 'KNX Secure', 'Bosch Aviation Lighting'],
    client: 'Private — Industrialist Family (Confidential)',
    testimonial: {
      quote: 'Three floors, one experience. That was the brief. Homeasy delivered it so seamlessly that guests think it\'s one continuous space.',
      author: 'Confidential',
      role: 'Owner Representative'
    },
    awards: ['India Luxury Property Awards 2024 — Penthouse of the Year'],
    stats: [
      { label: 'Floors', value: '3' },
      { label: 'Smart Devices', value: '520' },
      { label: 'Helipad Auto Modes', value: '8' },
      { label: 'Install Timeline', value: '22 Weeks' }
    ]
  },
  {
    id: 'kerala-backwater-resort',
    title: 'Kerala Backwater Eco Resort',
    category: 'resort',
    location: 'Alleppey, Kerala',
    area: '85,000 sq ft',
    year: '2023',
    tag: 'Off-Grid Smart with Solar-Battery Hybrid',
    heroImg: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', caption: 'Floating Villas with Solar Roofs' },
      { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', caption: 'Backwater-View Spa Pavilion' },
      { url: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80', caption: 'Eco Lodge Interior Smart Controls' },
      { url: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800&q=80', caption: 'Open-Air Yoga Pavilion Ambience' }
    ],
    desc: 'A 32-villa eco resort on Kerala\'s backwaters running entirely off-grid via solar-battery hybrid systems, with full automation across floating cottages, spa pavilions, and dining decks.',
    longDesc:
      'This project tested every assumption Homeasy had about smart automation. Located on an island in Alleppey\'s backwater network with no grid power and only seasonal road access, the system needed to be self-sufficient, weather-hardened, and maintainable remotely. The team deployed 32 floating villas each with independent micro-grid solar capability, connected via underwater fiber to a central NOC on the mainland. Every villa learns its guest\'s preferences across visits, and the resort\'s overall energy load is balanced in real-time across the island\'s solar farm and battery banks.',
    features: [
      '100% Off-Grid Solar-Battery Hybrid',
      '32 Floating Smart Villas',
      'Underwater Fiber Network',
      'Weather-Hardened Outdoor IoT',
      'Returning Guest Memory Profiles',
      'Backwater Pollution Sensors',
      'Eco-Mode Auto-Optimization',
      'Remote NOC Monitoring 24/7'
    ],
    techStack: ['Homeasy Off-Grid Edition', 'Tesla Powerwall Cluster', 'Tata Solar Panels', 'Ruckus Outdoor WiFi', 'LoRaWAN Sensors', 'Custom Marine-Grade Hardware'],
    client: 'Backwater Earth Hospitality Pvt. Ltd.',
    testimonial: {
      quote: 'We wanted a luxury resort with zero environmental footprint. Homeasy made it work. Six months in, we\'ve generated 12% more solar than we consume — and sell the excess back to the village.',
      author: 'Reshma N.',
      role: 'Founder, Backwater Earth Hospitality'
    },
    awards: ['World Sustainable Tourism Award 2023', 'India Hospitality Eco-Tech Grand Prix'],
    stats: [
      { label: 'Villas', value: '32' },
      { label: 'Grid Dependency', value: '0%' },
      { label: 'Solar Capacity', value: '420 kW' },
      { label: 'Install Timeline', value: '36 Weeks' }
    ]
  },
  {
    id: 'chefs-kitchen-mumbai',
    title: 'Michelin Chef\'s Home Kitchen',
    category: 'kitchen',
    location: 'Bandra West, Mumbai',
    area: '1,800 sq ft',
    year: '2024',
    tag: 'Restaurant-Grade Home Kitchen Automation',
    heroImg: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=1200&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1556909195-4e5a9d3a4eef?w=800&q=80', caption: 'Professional Range with Smart Hood' },
      { url: 'https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=800&q=80', caption: 'Cold Storage Climate Bank' },
      { url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', caption: 'Recipe Voice-Guidance Display' },
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', caption: 'Wine & Beverage Programmed Zones' }
    ],
    desc: 'A 1,800 sq ft Michelin-starred chef\'s home kitchen retrofitted with restaurant-grade ventilation control, ingredient temperature logging, and a custom recipe-guided cooking automation suite.',
    longDesc:
      'When one of India\'s most celebrated Michelin chefs wanted his home kitchen to function with restaurant-grade precision, Homeasy assembled a specialist team including food safety consultants. The kitchen features 14 temperature-controlled storage zones, each logged continuously to satisfy professional culinary standards. The flagship innovation is the Recipe-Guidance System — a kitchen-wide ambient display that walks the chef through preparation, automatically pre-heating equipment, adjusting ventilation, and managing timing across multiple dishes. The system has been adopted by 3 other celebrity chef homes since installation.',
    features: [
      '14 Temperature-Logged Storage Zones',
      'Restaurant-Grade Smart Ventilation',
      'Recipe-Guidance Ambient System',
      'Multi-Dish Timing Orchestration',
      'Wine Cellar 6-Zone Climate',
      'Knife & Tool RFID Tracking',
      'Spill-Detection Floor Sensors',
      'Professional Camera Recording Setup'
    ],
    techStack: ['Homeasy Pro Chef Suite', 'Miele Connect@Home', 'Sub-Zero Smart Climate', 'BORA Ventilation', 'Custom Recipe Engine', 'Sonos Architectural'],
    client: 'Private — Michelin-Star Chef',
    testimonial: {
      quote: 'My home kitchen is now more capable than half the professional kitchens I\'ve worked in. The recipe guidance system has changed how I teach my children to cook.',
      author: 'Chef Aakash D.',
      role: 'Michelin-Star Chef & Author'
    },
    awards: ['Conde Nast Traveller Kitchen of the Year 2024'],
    stats: [
      { label: 'Storage Zones', value: '14' },
      { label: 'Smart Devices', value: '95' },
      { label: 'Recipe Profiles', value: '320+' },
      { label: 'Install Timeline', value: '8 Weeks' }
    ]
  },
  // ============ ADDITIONAL PROJECTS — APPEND TO portfolioWorks ARRAY ============

  {
    id: 'mountain-retreat-shimla',
    title: 'Alpine Mountain Retreat',
    category: 'villa',
    location: 'Mashobra, Shimla, Himachal Pradesh',
    area: '7,200 sq ft',
    year: '2023',
    tag: 'Snow-Adaptive Climate & Geothermal Integration',
    heroImg: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80', caption: 'Snow-Capped View Living Room' },
      { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', caption: 'Stone Fireplace with Climate Sync' },
      { url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80', caption: 'Heated Driveway Snow Melt System' },
      { url: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=800&q=80', caption: 'Cedar Sauna Smart Climate Pod' }
    ],
    desc: 'A 4-bedroom alpine retreat in Mashobra featuring geothermal heat pump integration, automated snow-melt driveways, and weather-predictive heating across cedar-wood interiors.',
    longDesc:
      'Alpine Mountain Retreat was Homeasy\'s first deep cold-climate installation. The 7,200 sq ft cedar-and-stone villa, perched at 7,500 ft elevation, required automation that anticipated weather rather than just reacted to it. The system pulls 7-day weather forecasts and pre-heats key zones — from heated driveways to interior radiant floors — hours before snowfall begins. Geothermal heat pumps reduce winter heating costs by 64% compared to conventional systems. A standout feature: when the owners are away during heavy snow, the home autonomously melts the front driveway path, preventing dangerous ice buildup before their return.',
    features: [
      'Geothermal Heat Pump Integration',
      'Predictive Weather Pre-Heating',
      'Automated Snow-Melt Driveways',
      'Radiant Floor Heating — Zone Wise',
      'Cedar Sauna Smart Climate',
      'Frozen Pipe Detection & Heating',
      'Avalanche Window Auto-Shutter',
      'Smart Firewood Inventory Monitor'
    ],
    techStack: ['Homeasy Cold Climate Edition', 'Mitsubishi Geothermal', 'WarmlyYours Floor Heating', 'AccuWeather API', 'Honeywell Smart Sensors', 'Crestron Home'],
    client: 'Private — Delhi-Based Tech CEO',
    testimonial: {
      quote: 'We used to arrive to a freezing house after the long drive up. Now the home greets us warm, the driveway is clear, and the fireplace is already lit. It\'s like the house missed us.',
      author: 'Mehul J.',
      role: 'Owner, Alpine Retreat'
    },
    awards: ['Best Climate-Adaptive Home Install 2023 — CEDIA Asia'],
    stats: [
      { label: 'Elevation', value: '7,500 ft' },
      { label: 'Heating Cost Saved', value: '64%' },
      { label: 'Snow Sensors', value: '12' },
      { label: 'Install Timeline', value: '16 Weeks' }
    ]
  },
  {
    id: 'fintech-tower-bkc',
    title: 'FinTech Trading Floor BKC',
    category: 'office',
    location: 'Bandra Kurla Complex, Mumbai',
    area: '24,000 sq ft',
    year: '2024',
    tag: 'Sub-Millisecond Latency Smart Trading Floor',
    heroImg: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80', caption: '120-Desk Active Trading Floor' },
      { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80', caption: 'Server Rack Precision Cooling' },
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', caption: 'Executive Strategy War Room' },
      { url: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80', caption: 'Quiet Pod Zones for Focus Work' }
    ],
    desc: 'A high-frequency trading firm\'s Mumbai floor automated with ultra-stable power systems, precision data center cooling, and stress-responsive ambient lighting for 120 active traders.',
    longDesc:
      'FinTech Trading Floor BKC operates at the intersection of milliseconds and millions. Homeasy was brought in to deliver an environment where infrastructure stability is non-negotiable — power failures of even 50ms can cost crores in trading losses. The team installed dual-redundant UPS with seamless failover, paired with precision HVAC maintaining ±0.3°C across the server room. Beyond infrastructure, the floor features adaptive ambient lighting that subtly shifts based on aggregated market volatility — warmer tones during calm markets, focused cool whites during high-activity periods. The system has supported zero unplanned downtime since deployment.',
    features: [
      'Dual-Redundant UPS Power Systems',
      '±0.3°C Server Room Precision Cooling',
      '120-Desk Stress-Adaptive Lighting',
      'Sub-50ms Failover Engineering',
      'Volatility-Responsive Ambience',
      'Biometric Multi-Factor Access',
      'Acoustic Privacy Pod Network',
      'Real-Time Floor Air Quality Display'
    ],
    techStack: ['Homeasy Enterprise Critical', 'APC Symmetra UPS', 'Stulz Precision AC', 'Lutron Athena', 'HID Global Biometric', 'Splunk Monitoring'],
    client: 'Confidential — Tier-1 High Frequency Trading Firm',
    testimonial: {
      quote: 'In our business, uptime is everything. Homeasy has delivered 99.999% reliability across 14 months. That is not a number — that is trust.',
      author: 'Chief Technology Officer',
      role: 'HFT Firm, BKC'
    },
    awards: ['Critical Infrastructure Excellence Award 2024 — Data Center Dynamics'],
    stats: [
      { label: 'Uptime SLA', value: '99.999%' },
      { label: 'Active Traders', value: '120' },
      { label: 'Failover Time', value: '<50ms' },
      { label: 'Install Timeline', value: '11 Weeks' }
    ]
  },
  // {
  //   id: 'horizon-penthouse-pune',
  //   title: 'Horizon Penthouse, Pune',
  //   category: 'penthouse',
  //   location: 'Koregaon Park, Pune',
  //   area: '5,400 sq ft',
  //   year: '2023',
  //   tag: 'Art Collector\'s Sanctuary with Museum-Grade Climate',
  //   heroImg: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80',
  //   gallery: [
  //     { url: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=800&q=80', caption: 'Private Art Gallery Wing' },
  //     { url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80', caption: 'Climate-Controlled Sculpture Hall' },
  //     { url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80', caption: 'Reading Lounge with Smart Skylight' },
  //     { url: 'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=800&q=80', caption: 'Master Bedroom Suite Panorama' }
  //   ],
  //   desc: 'A 5,400 sq ft penthouse designed around a private contemporary art collection — featuring museum-grade humidity control, UV-filtered window automation, and per-artwork lighting profiles.',
  //   longDesc:
  //     'Horizon Penthouse was a love letter to art preservation. The owner, a serious collector of contemporary Indian masters, needed a home that could double as a private museum without feeling sterile. Homeasy partnered with conservators from the National Gallery of Modern Art to design an environment that holds humidity within ±2% and temperature within ±1°C — conditions normally found only in major museums. Each of the 47 artworks has its own programmed lighting scene, activated by a discreet sensor as the owner approaches. A dedicated AQI system filters air to gallery standards, removing particulates that could damage delicate canvases.',
  //   features: [
  //     'Museum-Grade Humidity ±2%',
  //     'Temperature Stability ±1°C',
  //     'UV-Filtered Smart Window Tinting',
  //     '47 Per-Artwork Lighting Scenes',
  //     'Gallery-Standard Air Filtration',
  //     'Vibration Detection for Sculptures',
  //     'Smart Skylight with Solar Tracking',
  //     'Quiet HVAC <22dB Noise Floor'
  //   ],
  //   techStack: ['Homeasy Curator Edition', 'Liebert Precision Climate', 'Lutron Sivoia QS', 'Erco Museum Lighting', 'IQAir Filtration', 'KNX Secure'],
  //   client: 'Private — Art Collector & Pharma Industrialist',
  //   testimonial: {
  //     quote: 'My collection has appreciated 30% in value, partly because of the museum-grade environment Homeasy built. This is not just a home — it is an investment vault disguised as a sanctuary.',
  //     author: 'Anita K.',
  //     role: 'Owner, Horizon Penthouse'
  //   },
  //   awards: ['Architectural Digest India 100 Award 2023', 'Heritage & Conservation Tech Award'],
  //   stats: [
  //     { label: 'Artworks Lit', value: '47' },
  //     { label: 'Climate Precision', value: '±1°C' },
  //     { label: 'Smart Devices', value: '290' },
  //     { label: 'Install Timeline', value: '15 Weeks' }
  //   ]
  // },
  // {
  //   id: 'desert-oasis-jodhpur',
  //   title: 'Desert Oasis Boutique Resort',
  //   category: 'resort',
  //   location: 'Bishnoi Region, Jodhpur, Rajasthan',
  //   area: '64,000 sq ft',
  //   year: '2024',
  //   tag: 'Sand-Resistant Smart Tech in Thar Desert',
  //   heroImg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
  //   gallery: [
  //     { url: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&q=80', caption: 'Sandstone Villa Cluster' },
  //     { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', caption: 'Desert-View Infinity Pool Suite' },
  //     { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', caption: 'Open Courtyard Sunset Automation' },
  //     { url: 'https://images.unsplash.com/photo-1610530460358-dc1c1adfeb44?w=800&q=80', caption: 'Bedouin-Inspired Tent Pavilions' }
  //   ],
  //   desc: 'A 22-tent luxury desert resort with sand-resistant IP68 enclosures, extreme temperature climate management (3°C–48°C), and stargazing-optimized lighting automation.',
  //   longDesc:
  //     'Building smart automation in the Thar Desert pushed every engineering principle Homeasy had developed. Sand penetrates everything, temperatures swing from 3°C nights to 48°C days, and humidity is virtually absent. The team developed custom IP68-rated enclosures for all outdoor electronics, paired with HVAC systems that pre-cool tents 90 minutes before guest arrival. The standout feature: a synchronized lights-out protocol across the entire 64,000 sq ft property that triggers automatically based on Astronomy Twilight, plunging the resort into stargazing-optimized darkness. Guest tents then activate ultra-low red lighting that doesn\'t interfere with night vision adaptation.',
  //   features: [
  //     '22 IP68 Sand-Sealed Tent Pods',
  //     'Extreme Temperature Climate Range',
  //     'Synchronized Stargazing Mode',
  //     'Astronomy Twilight Auto-Detection',
  //     'Camel Tracking GPS for Safaris',
  //     'Heritage Water Conservation IoT',
  //     'Wind Storm Auto-Shutter Protocol',
  //     'Cultural Sound Zone Programming'
  //   ],
  //   techStack: ['Homeasy Extreme Edition', 'Custom IP68 Hardware', 'Daikin VRV-X', 'Stargaze Lighting Protocol', 'Garmin GPS Tracking', 'LoRaWAN Long Range'],
  //   client: 'Royal Heritage Resorts Pvt. Ltd.',
  //   testimonial: {
  //     quote: 'Guests fly in from Europe just to see our night skies. The synchronized darkness mode is now our most photographed feature. Homeasy built something we did not even imagine possible.',
  //     author: 'Thakur Veerendra S.',
  //     role: 'Founder, Desert Oasis Resort'
  //   },
  //   awards: ['Conde Nast Hot List 2024 — Asia Pacific', 'Sustainable Desert Tourism Award'],
  //   stats: [
  //     { label: 'Tent Suites', value: '22' },
  //     { label: 'Temperature Range', value: '3°C-48°C' },
  //     { label: 'Stargazing Sync', value: '100%' },
  //     { label: 'Install Timeline', value: '24 Weeks' }
  //   ]
  // },
  // {
  //   id: 'modular-kitchen-noida',
  //   title: 'Modular Family Kitchen System',
  //   category: 'kitchen',
  //   location: 'Sector 128, Noida',
  //   area: '1,400 sq ft',
  //   year: '2024',
  //   tag: 'Multi-Generation Cooking with Accessibility Focus',
  //   heroImg: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&q=80',
  //   gallery: [
  //     { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', caption: 'Adjustable Counter Heights Demo' },
  //     { url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80', caption: 'Voice-Activated Spice Drawer' },
  //     { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80', caption: 'Color-Coded Storage System' },
  //     { url: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80', caption: 'Multi-Profile Cooking Memory Bank' }
  //   ],
  //   desc: 'A 1,400 sq ft multi-generation family kitchen with motorized adjustable counter heights, voice-controlled storage, and dedicated user profiles for grandmother, parents, and children.',
  //   longDesc:
  //     'The Modular Family Kitchen project tackled a uniquely Indian challenge: designing a kitchen that serves three generations simultaneously — a grandmother in her 70s, parents in their 40s, and teenage children. Homeasy installed motorized adjustable counter heights that remember each user\'s comfort preference, automatically rising or lowering based on facial recognition. Voice-activated spice drawers eliminated the need for elderly family members to bend or stretch. The system tracks who is cooking what, sends safety alerts when the grandmother forgets a flame, and recommends recipes based on ingredients about to expire in the smart refrigerator.',
  //   features: [
  //     'Motorized Adjustable Counter Heights',
  //     'Facial Recognition User Profiles',
  //     'Voice-Activated Spice Storage',
  //     'Elderly Safety Flame Monitoring',
  //     'Ingredient Expiry Tracking',
  //     'Recipe Recommendation Engine',
  //     'Child Safety Lock Auto-Engage',
  //     'Multi-Language Voice Support'
  //   ],
  //   techStack: ['Homeasy Family Kitchen Suite', 'Hafele Motorized Hardware', 'Samsung Family Hub', 'Custom Hindi Voice Engine', 'Sensibo Smart Sensors', 'Google Nest Hub'],
  //   client: 'Private — Joint Family Residence',
  //   testimonial: {
  //     quote: 'My mother-in-law cooks with the same independence as before, despite her knee surgery. The kitchen adapts to her, not the other way around. That is real intelligence.',
  //     author: 'Priya S.',
  //     role: 'Homeowner, Noida'
  //   },
  //   awards: ['Universal Design Excellence Award 2024 — India Design Council'],
  //   stats: [
  //     { label: 'User Profiles', value: '6' },
  //     { label: 'Counter Positions', value: '14' },
  //     { label: 'Voice Languages', value: '4' },
  //     { label: 'Install Timeline', value: '6 Weeks' }
  //   ]
  // },
  // {
  //   id: 'lake-villa-udaipur',
  //   title: 'Lake Pichola Heritage Villa',
  //   category: 'villa',
  //   location: 'Lake Pichola, Udaipur, Rajasthan',
  //   area: '6,400 sq ft',
  //   year: '2023',
  //   tag: 'Lake-Reflection Lighting & Royal Heritage Tech',
  //   heroImg: 'https://images.unsplash.com/photo-1599661046827-dacde6976549?w=1200&q=80',
  //   gallery: [
  //     { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', caption: 'Lake-Facing Master Suite' },
  //     { url: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800&q=80', caption: 'Royal Jharokha with Smart Glass' },
  //     { url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80', caption: 'Mughal Garden Lighting Grid' },
  //     { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', caption: 'Heritage Music Pavilion' }
  //   ],
  //   desc: 'A restored 19th-century haveli on Lake Pichola with lake-reflection adaptive lighting, mughal garden automation, and invisible smart integration through hand-carved jharokhas.',
  //   longDesc:
  //     'Lake Pichola Heritage Villa is a Mewar-era haveli reimagined for the modern royal lineage that owns it. The challenge was preserving every hand-carved jharokha, every fresco, and every original architectural detail while integrating world-class smart tech. Homeasy developed a lake-reflection adaptive lighting algorithm — sensors track the changing reflections from Lake Pichola throughout the day and recreate them as interior wall washes, creating an ever-shifting interplay of light. The mughal-inspired chahar bagh garden features hidden fog systems, programmable fountains, and lantern automation that brings the property to life for evening soirées.',
  //   features: [
  //     'Lake-Reflection Adaptive Lighting',
  //     'Jharokha Smart Glass Integration',
  //     'Mughal Garden Fog & Fountain System',
  //     'Heritage Lantern Auto-Sequence',
  //     'Music Pavilion Acoustic Tuning',
  //     'Royal Crest Projection Lighting',
  //     'Boat Arrival Detection System',
  //     'Conservation Humidity Control'
  //   ],
  //   techStack: ['Homeasy Heritage Plus', 'Custom Reflection Algorithm', 'Lutron Vive Wireless', 'Ketra Natural Light', 'Sonance Outdoor Audio', 'KNX Heritage Mesh'],
  //   client: 'Royal Family — Mewar Lineage',
  //   testimonial: {
  //     quote: 'Our family has lived in this haveli for seven generations. Homeasy added the eighth dimension — time itself feels different now, as light from the lake plays across walls our ancestors painted.',
  //     author: 'Maharaj Lakshyaraj S.',
  //     role: 'Owner, Lake Pichola Villa'
  //   },
  //   awards: ['Heritage Conservation & Technology Award 2023 — INTACH', 'Architectural Digest Asia Heritage Feature'],
  //   stats: [
  //     { label: 'Heritage Age', value: '170 Yrs' },
  //     { label: 'Reflection Zones', value: '8' },
  //     { label: 'Smart Devices', value: '210' },
  //     { label: 'Install Timeline', value: '20 Weeks' }
  //   ]
  // }
];