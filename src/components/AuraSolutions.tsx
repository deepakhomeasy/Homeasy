import { useState, useCallback, useMemo } from 'react';
import { 
  Lightbulb, 
  ShieldCheck, 
  Video, 
  Sliders, 
  Lock, 
  Thermometer, 
  Tv, 
  Mic, 
  Droplets,
  ChevronRight,
  ArrowRight,
  Play,
  Check,
  Smartphone,
  Volume2,
  Calendar,
  LockKeyhole,
  Zap,
  Star,
  Quote,
  MapPin,
  Clock,
  Users,
  Award,
  Home,
  Settings,
  PhoneCall,
  CheckCircle,
  TrendingUp,
  Shield,
  Eye,
  Signal,
  Bell,
  Waves,
} from 'lucide-react';
import { AtmosphereScene } from '../types';

interface AuraSolutionsProps {
  onContactRequest: () => void;
}

// ── STATIC DATA (outside component to prevent re-creation) ──────────────────

const PRESETS: AtmosphereScene[] = [
  {
    id: 'pooja',
    name: 'Pooja Mode',
    description:
      'Devotion-engineered ambient lighting with calming warm temperatures & continuous traditional acoustic loops.',
    lightsColor: 'from-amber-500 via-orange-400 to-amber-200',
    lightsIntensity: 85,
    temp: 23,
    musicActive: true,
    curtainsOpen: true,
    securityArmed: false,
  },
  {
    id: 'night',
    name: 'Good Night Sleep',
    description:
      'All operational hardware shuts off, perimeter video guards arm, curtains seal closed, temperature aligns at 22°C.',
    lightsColor: 'from-blue-950 via-[#0b1220] to-indigo-900',
    lightsIntensity: 10,
    temp: 22,
    musicActive: false,
    curtainsOpen: false,
    securityArmed: true,
  },
  {
    id: 'cinema',
    name: 'Cinema Experience',
    description:
      'Ambient lighting elements lower to precise 15% intensity, motorized shades deploy, multi-channel surround aligns.',
    lightsColor: 'from-purple-900 via-indigo-950 to-emerald-950',
    lightsIntensity: 15,
    temp: 21,
    musicActive: true,
    curtainsOpen: false,
    securityArmed: false,
  },
];

const CATEGORIES = [
  {
    title: 'Premium Light Control',
    label: '16M Color Spectrums',
    icon: Lightbulb,
    color: 'text-amber-500 bg-amber-50',
    desc: 'Tunable white and full-color spectrum across every room zone.',
  },
  {
    title: 'Local Protected Security',
    label: 'Surge Shield & Zero Leak',
    icon: ShieldCheck,
    color: 'text-[#00694f] bg-[#8bf7cf]/30',
    desc: 'Physical relay protection with AES-256 encrypted local logic.',
  },
  {
    title: 'Immersive Audio Nodes',
    label: 'Multi-Room Dolby Digital',
    icon: Tv,
    color: 'text-indigo-500 bg-indigo-50',
    desc: 'Synchronized audio across rooms with zone-based volume control.',
  },
  {
    title: 'Sentinel Night CCTV',
    label: '4K Night Face Tracking',
    icon: Video,
    color: 'text-rose-500 bg-rose-50',
    desc: 'Pre-buffer recording with AI face detection at zero latency.',
  },
  {
    title: 'Autonomous Shades',
    label: 'Thermal Sensitive Motors',
    icon: Sliders,
    color: 'text-blue-500 bg-blue-50',
    desc: 'Schedule-driven curtains that respond to sunlight and temperature.',
  },
  {
    title: 'Intelligent Door Locks',
    label: 'Biometrics & Zero Key Access',
    icon: Lock,
    color: 'text-teal-500 bg-teal-50',
    desc: 'Fingerprint, PIN, and app-based entry with full audit logs.',
  },
  {
    title: 'Aura Smart Doorbells',
    label: 'Pre-Buffer Front Guard',
    icon: Bell,
    color: 'text-purple-500 bg-purple-50',
    desc: 'Visitor detection before the bell rings with two-way audio.',
  },
  {
    title: 'Unified AC/TV Control',
    label: 'All Infrared Elements Unified',
    icon: Thermometer,
    color: 'text-orange-500 bg-orange-50',
    desc: 'Every IR device consolidated into a single Aura interface.',
  },
  {
    title: 'Smart Sprinkler Systems',
    label: 'Dynamic Soil Analytics',
    icon: Droplets,
    color: 'text-sky-500 bg-sky-50',
    desc: 'Moisture-sensor driven irrigation that adapts to weather data.',
  },
];

const STATS = [
  { value: '1,200+', label: 'Homes Automated', icon: Home },
  { value: '98.7%', label: 'Uptime Reliability', icon: TrendingUp },
  { value: '1-Day', label: 'Install Turnaround', icon: Clock },
  { value: '15+', label: 'Cities Covered', icon: MapPin },
];

const TESTIMONIALS = [
  {
    name: 'Rajesh Sharma',
    location: 'Banjara Hills, Hyderabad',
    role: 'Villa Owner',
    text: 'The Pooja Mode is something I never knew I needed. Every morning at 6AM, the entire home transitions automatically. The warm amber tones and acoustic loops feel deeply intentional.',
    rating: 5,
    avatar: 'RS',
    tag: 'Full Home Retrofit',
  },
  {
    name: 'Priya Menon',
    location: 'Koramangala, Bengaluru',
    role: 'Interior Designer',
    text: 'I recommend Aura to every premium client. The 16M lighting spectrum paired with Dolby-aligned audio nodes creates moods that even the best manual setups cannot replicate.',
    rating: 5,
    avatar: 'PM',
    tag: 'Professional Referral',
  },
  {
    name: 'Arjun Kapoor',
    location: 'Juhu, Mumbai',
    role: 'Apartment Resident',
    text: 'Power fluctuations were my biggest concern. Three months in, not a single relay failure during generator switches. The Indian Power Resistant claim is completely real.',
    rating: 5,
    avatar: 'AK',
    tag: '3BHK Apartment',
  },
];

const CONTROL_METHODS = {
  app: {
    title: 'Aura Mobile App',
    description:
      'Full command of every connected device from a single unified dashboard. Works on iOS and Android with zero latency on local network.',
    features: [
      'Scene Scheduler & Calendar',
      'Guest Access Profiles',
      'Live Camera Streams',
      'Energy Usage Graphs',
    ],
    icon: Smartphone,
    visual: 'bg-gradient-to-br from-primary/20 to-[#8bf7cf]/20',
  },
  voice: {
    title: 'Voice Command Layer',
    description:
      'Native integration with Alexa and Google Assistant. Speak naturally to trigger scenes, adjust temperature, or lock the entire perimeter.',
    features: [
      'Hindi & English Support',
      'Custom Wake Phrases',
      'Multi-Room Broadcasting',
      'Alexa & Google Native',
    ],
    icon: Mic,
    visual: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
  },
  auto: {
    title: 'Autonomous Routines',
    description:
      'Time-based and sensor-triggered automation. Your home learns your schedule and begins preparing environments before you even arrive.',
    features: [
      'Sunrise/Sunset Sync',
      'Motion-Triggered Scenes',
      'Geofence Home Detection',
      'Weather-Adaptive Logic',
    ],
    icon: Settings,
    visual: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20',
  },
} as const;

type ControlTab = keyof typeof CONTROL_METHODS;

const INSTALL_STEPS = [
  {
    step: '01',
    title: 'Free Home Survey',
    description:
      'Our certified technician visits your space, maps every switch board, and designs a custom Aura grid layout.',
    duration: '2–3 Hours',
    icon: Eye,
  },
  {
    step: '02',
    title: 'Hardware Dispatch',
    description:
      'All components are pre-configured at our facility and dispatched sealed to your address within 48 hours.',
    duration: '48 Hours',
    icon: Zap,
  },
  {
    step: '03',
    title: 'Single-Day Install',
    description:
      'Our RF retrofit team installs behind existing switch panels. Zero cement breaking, zero rewiring disruption.',
    duration: '6–8 Hours',
    icon: Settings,
  },
  {
    step: '04',
    title: 'Live Handover',
    description:
      'Scene calibration, app onboarding, and a full walkthrough of every feature with your household.',
    duration: '1–2 Hours',
    icon: CheckCircle,
  },
];

const FAQS = [
  {
    q: 'Does Aura work without internet connection?',
    a: 'Yes. Our Elite Hub retains a secure local memory. All locks, switches, and alarms continue to function independently of internet. Only remote access and cloud features require connectivity.',
  },
  {
    q: 'Will installation damage my existing walls or wiring?',
    a: 'No. Aura uses military-grade RF wireless signals that communicate behind existing switch panels. There is zero cement breaking, no new wiring, and no structural changes to your property.',
  },
  {
    q: 'Is Aura compatible with my existing AC and TV remotes?',
    a: 'Absolutely. Our Unified IR Controller maps every infrared signal from your existing AC, TV, and set-top box units into a single unified Aura interface within minutes.',
  },
  {
    q: 'What happens during a power cut or voltage spike?',
    a: 'Aura hardware contains high-voltage physical capacitors rated for 180V–280V fluctuations. Generator switches, inverter transitions, and random power drops do not cause relay failures or resets.',
  },
  {
    q: 'How long does the entire installation take?',
    a: 'A standard 3BHK home is fully automated within one day. Our team handles survey, installation, calibration, and app onboarding in a single visit.',
  },
  {
    q: 'Can I control Aura when travelling abroad?',
    a: 'Yes. The Aura mobile app provides full remote access globally over encrypted connections. You can monitor cameras, trigger scenes, lock doors, and manage access from anywhere in the world.',
  },
];

const SYSTEM_STATUS = [
  { label: 'RF Signal Nodes', value: 'Optimal', color: 'text-emerald-400', dot: 'bg-emerald-400' },
  { label: 'Encryption Layer', value: 'AES-256 Active', color: 'text-[#8bf7cf]', dot: 'bg-[#8bf7cf]' },
  { label: 'Surge Capacitors', value: 'Charged 100%', color: 'text-emerald-400', dot: 'bg-emerald-400' },
  { label: 'Local Hub Memory', value: 'Synced', color: 'text-blue-400', dot: 'bg-blue-400' },
];

const TRUST_BADGES = [
  { icon: Shield, text: '2-Year Hardware Warranty' },
  { icon: Award, text: 'ISO Certified Installation' },
  { icon: Users, text: '1,200+ Happy Homes' },
  { icon: PhoneCall, text: '24/7 Priority Support' },
];

const HERO_HIGHLIGHTS = [
  { icon: Zap, text: '1-Day Installation' },
  { icon: Shield, text: 'Indian Power Resistant' },
  { icon: Lock, text: 'AES-256 Encrypted' },
];

// ── SMALL SUB-COMPONENTS ────────────────────────────────────────────────────

function SectionBadge({ children, variant = 'primary' }: { children: React.ReactNode; variant?: 'primary' | 'green' }) {
  return variant === 'green' ? (
    <span className="text-xs font-bold uppercase tracking-widest text-[#00694f] bg-[#8bf7cf]/35 px-4 py-1.5 rounded-full inline-block">
      {children}
    </span>
  ) : (
    <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
      {children}
    </span>
  );
}

function FeatureCheck({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-sm font-medium">
      <div className="w-6 h-6 rounded-full bg-[#8bf7cf]/30 text-[#00694f] flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5" />
      </div>
      {text}
    </li>
  );
}

// ── APP VISUAL ──────────────────────────────────────────────────────────────

function AppVisual() {
  return (
    <div className="text-center space-y-4">
      <div className="w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center mx-auto">
        <Smartphone className="w-12 h-12 text-primary" />
      </div>
      <div className="space-y-2">
        {[
          'Bedroom Lights → 65%',
          'AC → 22°C',
          'Door Lock → Armed',
          'CCTV → Recording',
        ].map((item) => (
          <div
            key={item}
            className="bg-white/80 backdrop-blur px-4 py-2 rounded-lg text-xs font-mono text-on-surface flex items-center gap-2"
          >
            <Signal className="w-3 h-3 text-primary" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── VOICE VISUAL ────────────────────────────────────────────────────────────

function VoiceVisual() {
  return (
    <div className="text-center space-y-4">
      <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center mx-auto relative">
        <Mic className="w-12 h-12 text-indigo-500" />
        <div className="absolute inset-0 rounded-full border-4 border-indigo-300/50 animate-ping" />
      </div>
      <div className="bg-white/80 backdrop-blur px-6 py-3 rounded-2xl text-sm font-medium text-on-surface">
        "Alexa, activate Cinema Mode"
      </div>
      <div className="flex gap-2 justify-center items-end h-10">
        {[14, 28, 14, 21, 14].map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full bg-indigo-400 animate-pulse"
            style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── AUTO VISUAL ─────────────────────────────────────────────────────────────

function AutoVisual() {
  return (
    <div className="text-center space-y-4 w-full max-w-xs">
      <Calendar className="w-10 h-10 text-amber-500 mx-auto" />
      <h4 className="font-bold text-on-surface">Today's Automations</h4>
      {[
        { time: '06:00 AM', event: 'Pooja Mode Activates' },
        { time: '08:30 AM', event: 'Curtains Open + AC Off' },
        { time: '10:00 PM', event: 'Good Night Mode Begins' },
      ].map((item) => (
        <div
          key={item.time}
          className="flex justify-between items-center bg-white/80 backdrop-blur px-4 py-2.5 rounded-xl text-xs font-medium"
        >
          <span className="text-on-surface-variant font-mono">{item.time}</span>
          <span className="text-on-surface">{item.event}</span>
          <CheckCircle className="w-3.5 h-3.5 text-[#00694f]" />
        </div>
      ))}
    </div>
  );
}

const TAB_VISUALS: Record<ControlTab, React.ReactNode> = {
  app: <AppVisual />,
  voice: <VoiceVisual />,
  auto: <AutoVisual />,
};

// ── MAIN COMPONENT ──────────────────────────────────────────────────────────

export function AuraSolutions({ onContactRequest }: AuraSolutionsProps) {
  const [activeScene, setActiveScene] = useState<AtmosphereScene>(PRESETS[0]);
  const [lightsIntensity, setLightsIntensity] = useState<number>(PRESETS[0].lightsIntensity);
  const [temperature, setTemperature] = useState<number>(PRESETS[0].temp);
  const [activeTab, setActiveTab] = useState<ControlTab>('app');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const selectScene = useCallback((scene: AtmosphereScene) => {
    setActiveScene(scene);
    setLightsIntensity(scene.lightsIntensity);
    setTemperature(scene.temp);
  }, []);

  const toggleFaq = useCallback((i: number) => {
    setActiveFaq((prev) => (prev === i ? null : i));
  }, []);

  const activeMethod = useMemo(() => CONTROL_METHODS[activeTab], [activeTab]);

  return (
    <div className="animate-fade-in py-20">

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative mx-4 md:mx-8 mb-4 rounded-3xl overflow-hidden shadow-2xl">

        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUxH-uOCV7QFmU6oHsy5FL2dxaJFKg9IaTud_xPcQiU80fxcwBypEE57zlhOiGt4LjKlNCJrzpN5sZJdPXj9aeWCE7fTr1qLbZsWUUo0fOKHSCMh2kx2Wc3kpEd3iv-Zfff6gYo3ZB3LbEtzv_4csfZdWPvN24973mq9EGJh_QDolOAdLmtDiDh2LXTYHlugnWi4Rpl2g5tbH0qo1zgt2jawPrTBXrKQYSRq0F8n9o9_NVKI9PW-cFo3roX1EIwkERV8PLrNmX8yc"
            alt="Aura Smart Home Interior"
          />
          {/* Multi-directional overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        {/* Floating badge top-right */}
        <div className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#8bf7cf] animate-pulse" />
          <span className="text-white text-xs font-mono font-semibold">LIVE SYSTEM ACTIVE</span>
        </div>

        {/* Main content — bottom aligned */}
        <div className="relative z-10 flex flex-col justify-end min-h-[680px] px-8 md:px-14 pb-14 pt-20">

          {/* Top label */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-[11px] tracking-[0.18em] uppercase">
              AURA SYSTEM ARCHITECTURE
            </span>
          </div>

          {/* Two-column bottom layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">

            {/* Left: Headline + CTA */}
            <div className="text-white space-y-6">
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
                Elevate Every{' '}
                <span className="block bg-gradient-to-r from-[#8bf7cf] via-[#3cd7ff] to-[#8bf7cf] bg-clip-text text-transparent">
                  Human Moment.
                </span>
              </h1>
              <p className="font-sans text-base md:text-lg text-zinc-300 leading-relaxed max-w-lg">
                India's most secure smart home ecosystem — engineered with aerospace-grade hardware,
                installed in a single day without breaking a single wall.
              </p>

              {/* Highlight pills */}
              <div className="flex flex-wrap gap-3">
                {HERO_HIGHLIGHTS.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#8bf7cf]" />
                    <span className="text-white text-xs font-semibold">{text}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={onContactRequest}
                  className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/30"
                >
                  Plan My Grid
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#bento-matrix"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-medium text-sm hover:bg-white/20 transition-all"
                >
                  Explore Matrix
                </a>
              </div>
            </div>

            {/* Right: Live stats card */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4 max-w-sm ml-auto">
                <p className="text-white/60 text-xs font-mono uppercase tracking-widest mb-2">
                  AURA GRID — LIVE STATUS
                </p>
                {SYSTEM_STATUS.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
                      <span className="text-white/70 text-xs font-mono">{s.label}</span>
                    </div>
                    <span className={`text-xs font-mono font-bold ${s.color}`}>{s.value}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-4 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-xs">Homes Online Now</span>
                    <span className="text-[#8bf7cf] font-bold text-sm font-mono">1,247</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 60" className="w-full fill-surface" preserveAspectRatio="none" height="40">
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-surface-container border border-outline-variant/20 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-display text-3xl font-bold text-on-surface">{stat.value}</div>
                <div className="text-xs text-on-surface-variant font-medium mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── BENTO GRID ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="bento-matrix">
        <div className="text-center lg:text-left flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-[0.15em] mb-2 block">
              9 INTELLIGENT TIERS
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold">Master Every Dimension</h2>
            <p className="font-sans text-base text-on-surface-variant max-w-xl mt-2">
              Engineered with physical relays and high-grade surge protection, designed to withstand standard power drops.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="glass-card hover:bg-white p-8 rounded-3xl border border-outline-variant/30 flex items-start gap-5 cursor-pointer hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${cat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="font-display text-lg font-bold text-on-surface-variant">{cat.title}</h3>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider">{cat.label}</p>
                  <p className="text-xs text-on-surface-variant/80 mt-1">{cat.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-on-surface-variant/40 shrink-0 ml-auto mt-1 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CONTROL METHODS TABS ─────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <SectionBadge>COMMAND INTERFACES</SectionBadge>
          <h2 className="font-display text-3xl md:text-5xl font-bold">Three Ways to Control Everything</h2>
          <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto">
            Whether you prefer tapping, speaking, or letting automation take over — Aura adapts to your rhythm.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {(Object.keys(CONTROL_METHODS) as ControlTab[]).map((key) => {
            const Icon = CONTROL_METHODS[key].icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                aria-pressed={activeTab === key}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === key
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <Icon className="w-4 h-4" />
                {CONTROL_METHODS[key].title}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div
              className={`w-16 h-16 rounded-2xl ${activeMethod.visual} flex items-center justify-center border border-outline-variant/20`}
            >
              <activeMethod.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold">{activeMethod.title}</h3>
            <p className="text-base text-on-surface-variant leading-relaxed">{activeMethod.description}</p>
            <ul className="space-y-3">
              {activeMethod.features.map((feat) => (
                <FeatureCheck key={feat} text={feat} />
              ))}
            </ul>
            <button
              onClick={onContactRequest}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-container transition-all"
            >
              Get This Feature <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Visual panel */}
          <div
            className={`rounded-3xl p-10 ${activeMethod.visual} border border-outline-variant/20 min-h-[300px] flex flex-col justify-center items-center gap-4`}
          >
            {TAB_VISUALS[activeTab]}
          </div>
        </div>
      </section>

      {/* ── ATMOSPHERE SIMULATOR ─────────────────────────────────────────── */}
      <section className="py-20 bg-surface-container border-y border-outline-variant/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <SectionBadge>LIVE DIGITAL SHIFT PREVIEW</SectionBadge>
            <h2 className="font-display text-3xl md:text-5xl font-bold">Atmosphere on Demand</h2>
            <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto">
              Test dynamic smart templates in our virtual bedroom sandbox. Observe real-time changes to lighting
              tones, HVAC levels, and auxiliary locks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Scene selector */}
            <div className="lg:col-span-5 space-y-4">
              {PRESETS.map((scene) => (
                <div
                  key={scene.id}
                  onClick={() => selectScene(scene)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && selectScene(scene)}
                  aria-pressed={activeScene.id === scene.id}
                  className={`flex items-start gap-4 p-5 rounded-2xl cursor-pointer border transition-all ${
                    activeScene.id === scene.id
                      ? 'bg-white border-primary shadow-md translate-x-2'
                      : 'bg-white/45 border-outline-variant/30 hover:bg-white/80'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      activeScene.id === scene.id ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {activeScene.id === scene.id ? (
                      <Check className="w-5 h-5 animate-pulse" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-on-surface">{scene.name}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-1">{scene.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulator panel */}
            <div className="lg:col-span-7 bg-zinc-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl border-4 border-zinc-800">
              {/* Title bar */}
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs font-mono text-zinc-500 ml-2">
                    AURA_SIMULATOR // {activeScene.name.toUpperCase()}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-primary font-bold bg-[#8bf7cf]/15 px-2 py-0.5 rounded">
                  CONNECTED
                </span>
              </div>

              <div className="space-y-6">
                {/* Ambient preview */}
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-zinc-900 border border-zinc-800">
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr ${activeScene.lightsColor} transition-all duration-700`}
                    style={{ opacity: lightsIntensity / 100 }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      <div className="bg-black/65 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-mono">
                        AMBIENT TEMP:{' '}
                        <span className="text-primary-fixed">{temperature}°C</span>
                      </div>
                      <div className="bg-black/65 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-mono">
                        CURTAINS:{' '}
                        <span className="text-primary-fixed">
                          {activeScene.curtainsOpen ? 'DEPLOYED (OPEN)' : 'SEALED (CLOSED)'}
                        </span>
                      </div>
                    </div>
                    <div className="text-center py-6">
                      <div className="bg-white/10 backdrop-blur-md inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10">
                        {activeScene.musicActive ? (
                          <>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#8bf7cf] animate-ping" />
                            <Volume2 className="w-4 h-4 text-[#8bf7cf]" />
                            <span className="text-xs font-mono text-white/90">Acoustic Audio Loop Active</span>
                          </>
                        ) : (
                          <span className="text-xs font-mono text-white/60">Acoustics Off</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-zinc-400">Lock Relay Stems:</span>
                      <span
                        className={`font-mono text-xs font-semibold px-2.5 py-0.5 rounded ${
                          activeScene.securityArmed
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {activeScene.securityArmed ? 'ARMED & SECURE' : 'UNARMED (BYPASS)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400 flex justify-between">
                      <span>Lighting Intensity</span>
                      <span className="text-primary font-bold">{lightsIntensity}%</span>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={lightsIntensity}
                      aria-label="Lighting Intensity"
                      aria-valuenow={lightsIntensity}
                      onChange={(e) => setLightsIntensity(Number(e.target.value))}
                      className="w-full accent-primary bg-zinc-800 rounded-lg h-1"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400 flex justify-between">
                      <span>HVAC Temperature</span>
                      <span className="text-primary font-bold">{temperature}°C</span>
                    </label>
                    <input
                      type="range"
                      min="18"
                      max="28"
                      value={temperature}
                      aria-label="HVAC Temperature"
                      aria-valuenow={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      className="w-full accent-primary bg-zinc-800 rounded-lg h-1"
                    />
                  </div>
                </div>

                {/* Live status grid */}
                <div className="grid grid-cols-2 gap-2">
                  {SYSTEM_STATUS.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse shrink-0`} />
                      <div>
                        <div className="text-[9px] font-mono text-zinc-500">{s.label}</div>
                        <div className={`text-[10px] font-mono font-bold ${s.color}`}>{s.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTALLATION PROCESS ─────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <SectionBadge variant="green">ZERO DISRUPTION PROCESS</SectionBadge>
          <h2 className="font-display text-3xl md:text-5xl font-bold">From Survey to Smart in One Day</h2>
          <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto">
            Our certified installation team handles everything. You just unlock the door.
          </p>
        </div>

        <div className="relative">
          {/* Connector line desktop */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 z-0" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {INSTALL_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center space-y-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-primary/60 tracking-widest">{step.step}</span>
                    <h4 className="font-display text-lg font-bold text-on-surface">{step.title}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{step.description}</p>
                    <div className="inline-flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3 text-primary" />
                      <span className="text-xs font-mono font-bold text-primary">{step.duration}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onContactRequest}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-primary-container transition-all shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            Book My Free Survey
          </button>
        </div>
      </section>

      {/* ── THREE PILLARS ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <SectionBadge variant="green">ENGINEERED CORES</SectionBadge>
          <h2 className="font-display text-3xl md:text-5xl font-bold">Proprietary Core Foundations</h2>
          <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto">
            Homeasy & Aura Home foundations establish permanent quality, eliminating common points of smart home failure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Waves,
              label: 'AEROSUPPORT TIERS',
              title: '1-Day Wireless Retrofit',
              desc: 'Aura hardware uses military secure RF signals that adapt behind switch panels. No breaking cement, no complicated wiring loops.',
            },
            {
              icon: Zap,
              label: '180V-280V FAULT FREE',
              title: 'Indian Power Resistant',
              desc: 'Fitted with high-voltage physical capacitors that can withstand random power drops and continuous generator shifts safely.',
            },
            {
              icon: LockKeyhole,
              label: 'ZERO SECURITY BREAKOUT',
              title: 'Encrypted Local Logic',
              desc: 'Our Elite Hub retains an active secure physical memory. If internet dropouts occur, lock switches and alarms still operate.',
            },
          ].map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 bg-surface-container-low rounded-3xl space-y-4 border border-outline-variant/20 hover:bg-white hover:shadow-xl transition-all h-80 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{pillar.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{pillar.desc}</p>
                </div>
                <div className="text-xs text-primary font-bold tracking-widest">{pillar.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-surface-container border-y border-outline-variant/30">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <SectionBadge>RESIDENT EXPERIENCES</SectionBadge>
            <h2 className="font-display text-3xl md:text-5xl font-bold">Homes That Speak for Themselves</h2>
            <p className="font-sans text-base text-on-surface-variant max-w-xl mx-auto">
              Real feedback from real Indian households across metros and tier-1 cities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-3xl p-8 border border-outline-variant/20 hover:shadow-xl transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-primary/30" />
                  <p className="text-sm text-on-surface-variant leading-relaxed italic">"{t.text}"</p>
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/20">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-on-surface">{t.name}</div>
                    <div className="text-xs text-on-surface-variant flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {t.location}
                    </div>
                  </div>
                  <span className="ml-auto text-[10px] bg-[#8bf7cf]/30 text-[#00694f] font-bold px-2 py-0.5 rounded-full">
                    {t.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 items-center">
            {TRUST_BADGES.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-outline-variant/20 shadow-sm"
              >
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-on-surface">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <SectionBadge>COMMON QUESTIONS</SectionBadge>
          <h2 className="font-display text-3xl md:text-5xl font-bold">Before You Decide</h2>
          <p className="font-sans text-base text-on-surface-variant max-w-xl mx-auto">
            Straight answers to the most asked questions from Indian homeowners evaluating Aura.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all overflow-hidden ${
                activeFaq === i
                  ? 'border-primary bg-white shadow-md'
                  : 'border-outline-variant/30 bg-surface-container-low'
              }`}
            >
              <button
                onClick={() => toggleFaq(i)}
                aria-expanded={activeFaq === i}
                aria-controls={`faq-answer-${i}`}
                className="w-full flex justify-between items-center px-6 py-5 text-left gap-4"
              >
                <span className="font-display font-bold text-base text-on-surface">{faq.q}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    activeFaq === i ? 'bg-primary text-white rotate-45' : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  <span className="text-xl font-light leading-none">+</span>
                </div>
              </button>
              {activeFaq === i && (
                <div id={`faq-answer-${i}`} role="region" className="px-6 pb-5">
                  <p className="text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA BANNER ─────────────────────────────────────────────── */}
      <section className="mx-4 md:mx-8 mb-8 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #8bf7cf33 0%, transparent 50%), radial-gradient(circle at 80% 50%, #3cd7ff22 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 px-8 md:px-16 py-20 text-white text-center space-y-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#8bf7cf]/20 text-[#8bf7cf] font-bold text-xs tracking-widest uppercase border border-[#8bf7cf]/30">
            START YOUR AURA JOURNEY
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight">
            Your Home Is Ready to Become Intelligent.{' '}
            <span className="bg-gradient-to-r from-[#8bf7cf] to-[#3cd7ff] bg-clip-text text-transparent">
              Are You?
            </span>
          </h2>
          <p className="text-zinc-300 text-base max-w-xl mx-auto leading-relaxed">
            Book a free home survey today. No commitment, no pressure — just a certified specialist mapping
            the smartest version of your space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onContactRequest}
              className="bg-primary hover:bg-primary-container text-white px-10 py-4 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center gap-2 justify-center"
            >
              <Calendar className="w-4 h-4" />
              Book Free Home Survey
            </button>
            <a
              href="tel:+91XXXXXXXXXX"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-xl font-medium text-sm hover:bg-white/20 transition-all flex items-center gap-2 justify-center"
            >
              <PhoneCall className="w-4 h-4" />
              Call Our Specialists
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {['No Hidden Charges', 'Free Site Survey', '1-Day Installation', '2-Year Warranty'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-[#8bf7cf]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}