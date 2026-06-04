import { useState } from 'react';
import {
  Smartphone,
  Bell,
  Lightbulb,
  ShieldCheck,
  Sliders,
  Power,
  Sparkles,
  Thermometer,
  Wifi,
  Battery,
  Signal,
  Home,
  MapPin,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Wind,
  Droplets,
  Sun,
  AlertTriangle,
  CheckCircle,
  Settings,
  Volume2,
  Tv,
  Car,
  Trees,
  Bed,
  UtensilsCrossed,
  ArrowRight,
  Star,
  Download,
  Apple,
  Play,
  Zap,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Globe,
  QrCode,
  Mic,
  BarChart3,
  RefreshCw,
  Layers,
} from 'lucide-react';

type TabType = 'home' | 'security' | 'control' | 'zones';

// ── STATIC DATA ─────────────────────────────────────────────────────────────

const APP_STATS = [
  { value: '4.9', label: 'App Store Rating', icon: Star, color: 'text-amber-500' },
  { value: '50K+', label: 'Active Users', icon: Users, color: 'text-primary' },
  { value: '14ms', label: 'Avg Latency', icon: Zap, color: 'text-emerald-500' },
  { value: '99.9%', label: 'App Uptime', icon: TrendingUp, color: 'text-sky-500' },
];

const APP_FEATURES = [
  {
    icon: Shield,
    title: 'Military-Grade Security',
    desc: 'AES-256 encryption on every command. Your data never leaves your local network without explicit permission.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    tag: 'ZERO KNOWLEDGE ARCH',
  },
  {
    icon: Globe,
    title: 'Global Remote Access',
    desc: 'Control your home from anywhere in the world with the same sub-20ms response time as local control.',
    color: 'text-sky-500',
    bg: 'bg-sky-50',
    tag: 'WORLDWIDE COVERAGE',
  },
  {
    icon: Mic,
    title: 'Voice Command Ready',
    desc: 'Natively integrated with Alexa & Google Assistant. Supports Hindi and English voice commands.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    tag: 'BILINGUAL SUPPORT',
  },
  {
    icon: BarChart3,
    title: 'Energy Analytics',
    desc: 'Track real-time and historical energy usage per device. Get weekly insights to reduce your electricity bill.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    tag: 'SMART REPORTS',
  },
  {
    icon: RefreshCw,
    title: 'OTA Auto Updates',
    desc: 'Your Aura hub firmware and app update silently overnight. Zero manual intervention ever required.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    tag: 'ALWAYS CURRENT',
  },
  {
    icon: Layers,
    title: 'Multi-Profile Access',
    desc: 'Create guest profiles, family members, and service access with time-limited and zone-restricted permissions.',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    tag: 'ROLE BASED ACCESS',
  },
];

const TESTIMONIALS = [
  {
    name: 'Ananya Reddy',
    location: 'Jubilee Hills, Hyderabad',
    text: 'The Away Mode is magical. One tap and my entire home locks down, lights off, curtains sealed. I use it every single morning.',
    rating: 5,
    avatar: 'AR',
  },
  {
    name: 'Karthik Iyer',
    location: 'Indiranagar, Bengaluru',
    text: 'The app latency is genuinely faster than my old physical switches. The CCTV feed loads in under 2 seconds from 8000km away.',
    rating: 5,
    avatar: 'KI',
  },
  {
    name: 'Sunita Malhotra',
    location: 'Powai, Mumbai',
    text: 'Guest access profiles saved my life. My maid has access only to specific zones during specific hours. Brilliant engineering.',
    rating: 5,
    avatar: 'SM',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Download the App',
    desc: 'Install Homeasy from the App Store or Google Play. Available on iOS 14+ and Android 10+.',
    icon: Download,
  },
  {
    step: '02',
    title: 'Connect Your Hub',
    desc: 'Scan the QR code on your Aura Elite Hub. Auto-discovery pairs all installed devices in seconds.',
    icon: QrCode,
  },
  {
    step: '03',
    title: 'Customize Your Home',
    desc: 'Name zones, set scenes, schedule routines and configure access profiles for your household.',
    icon: Settings,
  },
  {
    step: '04',
    title: 'Control Everything',
    desc: 'Tap, speak, or automate. Full home control from anywhere — with offline fallback built in.',
    icon: Smartphone,
  },
];

// ── TOGGLE COMPONENT ─────────────────────────────────────────────────────────

function Toggle({ state, onToggle }: { state: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={state}
      className={`w-10 h-5 rounded-full transition-all relative flex-shrink-0 ${
        state ? 'bg-[#00694f]' : 'bg-zinc-300'
      }`}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
          state ? 'left-5' : 'left-0.5'
        }`}
      />
    </button>
  );
}

// ── APP DOWNLOAD BUTTON ──────────────────────────────────────────────────────

function AppDownloadButtons({ variant = 'dark' }: { variant?: 'dark' | 'light' | 'outline' }) {
  const base = 'inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95';

  const styles = {
    dark: {
      ios: `${base} bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-700`,
      android: `${base} bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-700`,
    },
    light: {
      ios: `${base} bg-white text-zinc-900 hover:bg-zinc-50 shadow-md`,
      android: `${base} bg-white text-zinc-900 hover:bg-zinc-50 shadow-md`,
    },
    outline: {
      ios: `${base} bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20`,
      android: `${base} bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20`,
    },
  };

  return (
    <div className="flex flex-wrap gap-3">
      <a href="#" className={styles[variant].ios}>
        <Apple className="w-5 h-5" />
        <div className="text-left">
          <div className="text-[9px] font-normal opacity-70 leading-none mb-0.5">Download on the</div>
          <div className="text-sm font-bold leading-none">App Store</div>
        </div>
      </a>
      <a href="#" className={styles[variant].android}>
        <Play className="w-4 h-4 fill-current" />
        <div className="text-left">
          <div className="text-[9px] font-normal opacity-70 leading-none mb-0.5">Get it on</div>
          <div className="text-sm font-bold leading-none">Google Play</div>
        </div>
      </a>
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function MobileExperience() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [securityArmed, setSecurityArmed] = useState(true);
  const [livingRoomOn, setLivingRoomOn] = useState(true);
  const [curtainsOpen, setCurtainsOpen] = useState(true);
  const [audioActive, setAudioActive] = useState(false);
  const [tvOn, setTvOn] = useState(false);
  const [insideTemp, setInsideTemp] = useState(23);
  const [humidity, setHumidity] = useState(55);
  const [viewingCCTV, setViewingCCTV] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);
  const [statusMessage, setStatusMessage] = useState('All perimeter sensors are fully secured.');
  const [activeMode, setActiveMode] = useState<'home' | 'away'>('home');
  const [motionDetection, setMotionDetection] = useState(true);
  const [doorLocked, setDoorLocked] = useState(true);
  const [windowSensor, setWindowSensor] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(2);
  const [brightness, setBrightness] = useState(75);
  const [activeZone, setActiveZone] = useState<string>('Living Room');

  const zones = [
    { name: 'Living Room', icon: Tv, devices: 5, active: true, temp: 24 },
    { name: 'Bedroom', icon: Bed, devices: 3, active: false, temp: 22 },
    { name: 'Kitchen', icon: UtensilsCrossed, devices: 4, active: true, temp: 25 },
    { name: 'Garage', icon: Car, devices: 2, active: false, temp: 18 },
    { name: 'Garden', icon: Trees, devices: 3, active: true, temp: 28 },
  ];

  const triggerAwayMode = () => {
    setSecurityArmed(true);
    setLivingRoomOn(false);
    setCurtainsOpen(false);
    setAudioActive(false);
    setInsideTemp(22);
    setNotificationCount(0);
    setStatusMessage('Away Mode Active: Secure perimeter locks deployed.');
    setActiveMode('away');
  };

  const triggerHomeMode = () => {
    setSecurityArmed(false);
    setLivingRoomOn(true);
    setCurtainsOpen(true);
    setInsideTemp(24);
    setStatusMessage('Home Mode: Lights toggled, climate customized to 24°C.');
    setActiveMode('home');
  };

  const clearNotifications = () => setNotificationCount(0);

  const tabs: { id: TabType; icon: React.ElementType; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'security', icon: ShieldCheck, label: 'Security' },
    { id: 'control', icon: Sliders, label: 'Control' },
    { id: 'zones', icon: MapPin, label: 'Zones' },
  ];

  /* ══ TAB RENDERS ══ */

  const renderHomeTab = () => (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(['home', 'away'] as const).map((mode) => (
          <button
            type="button"
            key={mode}
            onClick={mode === 'home' ? triggerHomeMode : triggerAwayMode}
            className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wide transition-all ${
              activeMode === mode
                ? 'bg-[#00694f] text-white shadow-md'
                : 'bg-white text-zinc-400 border border-zinc-200'
            }`}
          >
            {mode === 'home' ? '🏠 Home' : '🌍 Away'}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#00694f] to-[#00a876] text-white shadow-lg">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-widest text-[#8bf7cf] mb-0.5">SECURITY SHIELD</p>
            <h4 className="text-base font-bold">{securityArmed ? 'System Armed' : 'System Disarmed'}</h4>
          </div>
          <button
            type="button"
            onClick={() => {
              setSecurityArmed((p) => !p);
              setStatusMessage(securityArmed ? 'Manual bypass engaged.' : 'Perimeter fully locked.');
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
              securityArmed ? 'bg-[#8bf7cf] text-[#00694f]' : 'bg-white/15 text-white'
            }`}
          >
            {securityArmed ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-[10px] font-mono opacity-80 leading-relaxed">{statusMessage}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Sun, label: 'UV Index', value: '6 MOD', color: 'text-amber-500', bg: 'bg-amber-50' },
          { icon: Thermometer, label: 'Outside', value: '31°C', color: 'text-rose-500', bg: 'bg-rose-50' },
          { icon: Droplets, label: 'Humidity', value: `${humidity}%`, color: 'text-sky-500', bg: 'bg-sky-50' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-xl p-2 text-center border border-zinc-100`}>
            <Icon className={`w-3.5 h-3.5 ${color} mx-auto mb-1`} />
            <p className={`text-[11px] font-bold ${color}`}>{value}</p>
            <p className="text-[8px] text-zinc-400 font-mono">{label}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-2">QUICK RELAYS</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setLivingRoomOn((p) => !p)}
            className={`p-3 rounded-xl text-left aspect-square flex flex-col justify-between transition-all border ${
              livingRoomOn ? 'bg-amber-50 border-amber-200 shadow-sm' : 'bg-white border-zinc-200'
            }`}
          >
            <Lightbulb className={`w-5 h-5 ${livingRoomOn ? 'text-amber-500 fill-amber-400' : 'text-zinc-300'}`} />
            <div>
              <p className="text-[11px] font-bold text-zinc-800">Living Room</p>
              <p className="text-[9px] font-mono text-zinc-400">{livingRoomOn ? 'ON · 2700K' : 'OFF'}</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setCurtainsOpen((p) => !p)}
            className={`p-3 rounded-xl text-left aspect-square flex flex-col justify-between transition-all border ${
              curtainsOpen ? 'bg-sky-50 border-sky-200 shadow-sm' : 'bg-white border-zinc-200'
            }`}
          >
            <Sliders className={`w-5 h-5 ${curtainsOpen ? 'text-sky-500' : 'text-zinc-300'}`} />
            <div>
              <p className="text-[11px] font-bold text-zinc-800">Curtains</p>
              <p className="text-[9px] font-mono text-zinc-400">{curtainsOpen ? 'OPEN' : 'CLOSED'}</p>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5 text-[#00694f]" />
            <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-wide">Climate</span>
          </div>
          <span className="text-sm font-extrabold text-[#00694f]">{insideTemp}°C</span>
        </div>
        <input
          type="range" min="18" max="28" value={insideTemp}
          onChange={(e) => setInsideTemp(Number(e.target.value))}
          className="w-full accent-[#00694f] h-1 rounded-full"
        />
        <div className="flex justify-between text-[8px] font-mono text-zinc-400">
          <span>18°C</span><span>28°C</span>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-3">
      <div className={`p-4 rounded-2xl text-white shadow-lg ${
        securityArmed ? 'bg-gradient-to-br from-rose-600 to-rose-500' : 'bg-gradient-to-br from-[#00694f] to-[#00a876]'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-widest opacity-80 mb-0.5">PERIMETER STATUS</p>
            <h4 className="text-base font-bold">{securityArmed ? '🔴 Armed & Active' : '🟢 Disarmed'}</h4>
          </div>
          <button
            type="button"
            onClick={() => {
              setSecurityArmed((p) => !p);
              setStatusMessage(securityArmed ? 'System disarmed.' : 'Perimeter fully locked.');
            }}
            className="px-3 py-1.5 bg-white/20 rounded-lg text-[10px] font-bold uppercase flex-shrink-0"
          >
            {securityArmed ? 'Disarm' : 'Arm'}
          </button>
        </div>
        <p className="text-[10px] font-mono opacity-80">{statusMessage}</p>
      </div>

      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">SENSOR STATUS</p>
      {[
        { label: 'Front Door Lock', state: doorLocked, toggle: () => setDoorLocked((p) => !p), icon: doorLocked ? Lock : Unlock, ok: doorLocked },
        { label: 'Motion Detection', state: motionDetection, toggle: () => setMotionDetection((p) => !p), icon: AlertTriangle, ok: motionDetection },
        { label: 'Window Sensors', state: windowSensor, toggle: () => setWindowSensor((p) => !p), icon: CheckCircle, ok: windowSensor },
      ].map(({ label, state, toggle, icon: Icon, ok }) => (
        <div key={label} className="flex items-center justify-between bg-white rounded-xl border border-zinc-200 px-3 py-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${ok ? 'bg-emerald-50' : 'bg-zinc-100'}`}>
              <Icon className={`w-3.5 h-3.5 ${ok ? 'text-emerald-500' : 'text-zinc-400'}`} />
            </div>
            <span className="text-[11px] font-semibold text-zinc-700 truncate">{label}</span>
          </div>
          <Toggle state={state} onToggle={toggle} />
        </div>
      ))}

      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-100">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${viewingCCTV ? 'bg-rose-500 animate-pulse' : 'bg-zinc-300'}`} />
            <span className="text-[10px] font-bold text-zinc-700 truncate">Sentinel Cam · Lobby</span>
          </div>
          <button
            type="button"
            onClick={() => setViewingCCTV((p) => !p)}
            className="flex items-center gap-1 text-[9px] font-bold text-[#00694f] uppercase flex-shrink-0 ml-2"
          >
            {viewingCCTV ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {viewingCCTV ? 'Hide' : 'View'}
          </button>
        </div>
        {viewingCCTV ? (
          <div className="relative h-28">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa17AbEGoV28rySzLCLqWN-01klDPMfslWp1MFmhKISTf5ynl8esflwOYNg-stIkn7Xpvx5IDcyFqePAL5ZT-nmN7LwKETkdoLQ9rFeG_l8LSgLeRTfD9hVxiEikXq4m9wN5JwSn_fTD54vddPqT20761LN1WGR6mrMjywY7Va5iSH9gRSWXBPdBzClH0pry65z8cZ7UX4hu3HD3ERr8QKNzwFjV0YqRq1nCxPXfxMyJ7aBYkJqWEgnwUQLj0pyme_TC6JvY7edFo"
              alt="CCTV"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1.5 right-2 bg-rose-500 text-[7px] font-bold text-white px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
              ● LIVE HD
            </span>
          </div>
        ) : (
          <div className="h-14 flex items-center justify-center">
            <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">Feed Paused</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 p-3 space-y-2">
        <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1">RECENT ALERTS</p>
        {[
          { time: '09:41', msg: 'Front door unlocked', type: 'warn' },
          { time: '08:22', msg: 'Motion detected – Garden', type: 'info' },
          { time: '07:10', msg: 'System armed', type: 'ok' },
        ].map(({ time, msg, type }) => (
          <div key={time} className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              type === 'warn' ? 'bg-amber-400' : type === 'ok' ? 'bg-emerald-400' : 'bg-sky-400'
            }`} />
            <span className="text-[9px] font-mono text-zinc-500 flex-shrink-0">{time}</span>
            <span className="text-[9px] text-zinc-700 flex-1 truncate">{msg}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderControlTab = () => (
    <div className="space-y-3">
      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">LIGHTING & AMBIENCE</p>

      <div className="bg-white rounded-xl border border-zinc-200 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-bold text-zinc-700">Brightness</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-amber-500">{brightness}%</span>
        </div>
        <input
          type="range" min="0" max="100" value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          className="w-full accent-amber-500 h-1 rounded-full"
        />
        <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-200 to-amber-500 transition-all" style={{ width: `${brightness}%` }} />
        </div>
      </div>

      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">DEVICES</p>
      {[
        { label: 'Living Room Light', state: livingRoomOn, toggle: () => setLivingRoomOn((p) => !p), icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Audio System', state: audioActive, toggle: () => setAudioActive((p) => !p), icon: Volume2, color: 'text-purple-500', bg: 'bg-purple-50' },
        { label: 'Smart TV', state: tvOn, toggle: () => setTvOn((p) => !p), icon: Tv, color: 'text-sky-500', bg: 'bg-sky-50' },
        { label: 'Curtains', state: curtainsOpen, toggle: () => setCurtainsOpen((p) => !p), icon: Sliders, color: 'text-blue-500', bg: 'bg-blue-50' },
      ].map(({ label, state, toggle, icon: Icon, color, bg }) => (
        <div key={label} className={`flex items-center justify-between rounded-xl border px-3 py-2.5 transition-all ${state ? `${bg} border-zinc-200` : 'bg-white border-zinc-200'}`}>
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${state ? 'bg-white/60' : 'bg-zinc-100'}`}>
              <Icon className={`w-3.5 h-3.5 ${state ? color : 'text-zinc-300'}`} />
            </div>
            <span className="text-[11px] font-semibold text-zinc-700 truncate">{label}</span>
          </div>
          <Toggle state={state} onToggle={toggle} />
        </div>
      ))}

      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 pt-1">CLIMATE ENGINE</p>

      <div className="bg-white rounded-xl border border-zinc-200 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5 text-[#00694f]" />
            <span className="text-[10px] font-bold text-zinc-700">Temperature</span>
          </div>
          <span className="text-sm font-extrabold text-[#00694f]">{insideTemp}°C</span>
        </div>
        <input
          type="range" min="18" max="28" value={insideTemp}
          onChange={(e) => setInsideTemp(Number(e.target.value))}
          className="w-full accent-[#00694f] h-1 rounded-full"
        />
        <div className="flex justify-between text-[8px] font-mono text-zinc-400">
          <span>18°C MIN</span><span>28°C MAX</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-sky-500" />
            <span className="text-[10px] font-bold text-zinc-700">Humidity</span>
          </div>
          <span className="text-sm font-extrabold text-sky-500">{humidity}%</span>
        </div>
        <input
          type="range" min="30" max="80" value={humidity}
          onChange={(e) => setHumidity(Number(e.target.value))}
          className="w-full accent-sky-500 h-1 rounded-full"
        />
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 p-3 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-[10px] font-bold text-zinc-700">Fan Speed</span>
          </div>
          <span className="text-[10px] font-mono text-indigo-500 font-bold">{['OFF', 'LOW', 'MED', 'HIGH'][fanSpeed]}</span>
        </div>
        <div className="flex gap-1.5">
          {['OFF', 'LOW', 'MED', 'HIGH'].map((s, i) => (
            <button
              type="button" key={s} onClick={() => setFanSpeed(i)}
              className={`flex-1 py-1 rounded-lg text-[9px] font-bold transition-all ${fanSpeed === i ? 'bg-indigo-500 text-white' : 'bg-zinc-100 text-zinc-400'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderZonesTab = () => (
    <div className="space-y-3">
      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">HOME ZONES</p>
      {zones.map((zone) => {
        const Icon = zone.icon;
        const isActive = activeZone === zone.name;
        return (
          <button
            type="button" key={zone.name} onClick={() => setActiveZone(zone.name)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
              isActive ? 'bg-[#00694f] text-white border-[#00694f] shadow-md' : 'bg-white border-zinc-200 text-zinc-700'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-white/20' : 'bg-zinc-100'}`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
              </div>
              <div className="text-left min-w-0">
                <p className={`text-[11px] font-bold truncate ${isActive ? 'text-white' : 'text-zinc-800'}`}>{zone.name}</p>
                <p className={`text-[9px] font-mono ${isActive ? 'text-white/70' : 'text-zinc-400'}`}>{zone.devices} devices · {zone.temp}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`w-1.5 h-1.5 rounded-full ${zone.active ? isActive ? 'bg-[#8bf7cf]' : 'bg-emerald-400' : 'bg-zinc-300'}`} />
              <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white/70' : 'text-zinc-300'}`} />
            </div>
          </button>
        );
      })}

      {activeZone && (
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-4 text-white space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 truncate pr-2">{activeZone} DETAILS</p>
            <Settings className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Temp', value: `${zones.find((z) => z.name === activeZone)?.temp}°C`, icon: Thermometer },
              { label: 'Humidity', value: `${humidity}%`, icon: Droplets },
              { label: 'Devices', value: `${zones.find((z) => z.name === activeZone)?.devices}`, icon: Power },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white/10 rounded-xl p-2 text-center">
                <Icon className="w-3.5 h-3.5 text-[#8bf7cf] mx-auto mb-1" />
                <p className="text-[11px] font-bold">{value}</p>
                <p className="text-[8px] text-zinc-400 font-mono">{label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-400">Zone Active</span>
            <div className={`w-10 h-5 rounded-full relative flex-shrink-0 ${zones.find((z) => z.name === activeZone)?.active ? 'bg-[#00694f]' : 'bg-zinc-600'}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${zones.find((z) => z.name === activeZone)?.active ? 'left-5' : 'left-0.5'}`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  /* ══ MAIN RENDER ══ */
  return (
    <div className="animate-fade-in text-on-surface">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden flex items-center px-4 sm:px-6 md:px-10 lg:px-12 py-12 sm:py-16 md:py-20 max-w-7xl mx-auto min-h-screen lg:min-h-[900px]">
        <div className="pointer-events-none absolute -top-32 -left-12 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-primary/10 blur-[80px] sm:blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-12 w-[300px] sm:w-[600px] lg:w-[1000px] h-[300px] sm:h-[400px] rounded-full bg-[#8bf7cf]/10 blur-[80px] sm:blur-[100px]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center z-10 w-full">

          {/* Left: Copy */}
          <div className="space-y-6 sm:space-y-8 pt-2">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] sm:text-xs font-mono font-bold text-primary">
              <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              INTELLIGENT MOBILE APP
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Your Home,
              <br />
              <span className="text-[#008565] font-extrabold">In Your Pocket.</span>
            </h1>

            <p className="text-sm sm:text-base text-on-surface-variant max-w-lg leading-relaxed">
              Experience dynamic, low-latency control from anywhere in the world.
              Multi-layer local authentication ensures instant responses — even when the cloud goes down.
            </p>

            {/* App Store Buttons — Hero */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Available on
              </p>
              <AppDownloadButtons variant="dark" />
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  {['AR', 'KI', 'SM'].map((av) => (
                    <div key={av} className="w-6 h-6 rounded-full bg-primary/20 text-primary text-[8px] font-bold flex items-center justify-center border-2 border-white">
                      {av}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-on-surface-variant font-medium">4.9 · 50K+ downloads</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={() => setNotificationCount((p) => p + 1)}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-white font-bold rounded-2xl text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                Send Test Alert
              </button>
              <button
                type="button"
                onClick={triggerAwayMode}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-surface-container-high text-on-surface font-bold rounded-2xl text-xs hover:bg-outline-variant/40 active:scale-95 transition-all border border-outline-variant/30"
              >
                Trigger Away Mode
              </button>
            </div>

            {/* Diagnostics */}
            <div className="pt-5 sm:pt-6 border-t border-outline-variant/30 space-y-3">
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Live Diagnostics</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs font-mono">
                {[
                  { label: 'GATEWAYS', value: 'ONLINE', color: 'text-emerald-500' },
                  { label: 'LATENCY', value: '14ms', color: 'text-primary' },
                  { label: 'NODES', value: '6/6', color: 'text-emerald-500' },
                  { label: 'MESH', value: 'STABLE', color: 'text-primary' },
                ].map((d) => (
                  <div key={d.label} className="flex items-center justify-between p-2.5 sm:p-3 bg-surface-container rounded-xl border border-outline-variant/20">
                    <span className="text-on-surface-variant text-[10px] sm:text-xs">{d.label}</span>
                    <span className={`font-bold text-[10px] sm:text-xs ${d.color}`}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="relative flex justify-center items-center py-6 lg:py-0">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 sm:w-64 lg:w-72 h-48 sm:h-64 lg:h-72 rounded-full bg-primary/20 blur-[60px] sm:blur-[80px]" />
            </div>

            <div
              className="relative z-10 flex flex-col overflow-hidden"
              style={{
                width: 'min(320px, 88vw)',
                height: 'min(660px, 82vh)',
                background: '#09090b',
                borderRadius: '3rem',
                border: '10px solid #27272a',
                boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
              }}
            >
              {/* Status bar */}
              <div className="shrink-0 flex items-center justify-between px-5 pt-3 pb-1 bg-zinc-950">
                <span className="text-[11px] text-white font-semibold">9:41</span>
                <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-500" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3 text-white" />
                  <Wifi className="w-3 h-3 text-white" />
                  <Battery className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              {/* Scrollable app */}
              <div className="flex-1 overflow-y-auto bg-[#f7f8fa]" style={{ scrollbarWidth: 'none' }}>
                <div className="p-4 space-y-3 pb-4">
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#00694f]">CONCIERGE PANEL</p>
                      <h3 className="text-lg font-extrabold text-zinc-900 tracking-tight">Homeasy</h3>
                    </div>
                    <button
                      type="button"
                      onClick={clearNotifications}
                      className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white border border-zinc-200 shadow-sm flex-shrink-0"
                    >
                      <Bell className="w-4 h-4 text-zinc-500" />
                      {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold animate-pulse">
                          {notificationCount}
                        </span>
                      )}
                    </button>
                  </div>
                  {activeTab === 'home' && renderHomeTab()}
                  {activeTab === 'security' && renderSecurityTab()}
                  {activeTab === 'control' && renderControlTab()}
                  {activeTab === 'zones' && renderZonesTab()}
                </div>
              </div>

              {/* Bottom nav */}
              <div className="shrink-0 flex items-center justify-around px-1 py-2 bg-white border-t border-zinc-100">
                {tabs.map(({ id, icon: Icon, label }) => (
                  <button
                    type="button" key={id} onClick={() => setActiveTab(id)}
                    className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all ${activeTab === id ? 'bg-[#00694f]/10' : ''}`}
                  >
                    <Icon className={`w-4 h-4 ${activeTab === id ? 'text-[#00694f]' : 'text-zinc-400'}`} />
                    <span className={`text-[8px] font-bold ${activeTab === id ? 'text-[#00694f]' : 'text-zinc-400'}`}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APP STATS STRIP ───────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-12 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {APP_STATS.map(({ value, label, icon: Icon, color }) => (
            <div key={label} className="text-center p-6 rounded-2xl bg-surface-container border border-outline-variant/20 hover:shadow-md transition-all group">
              <div className={`w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="font-display text-3xl font-bold text-on-surface">{value}</div>
              <div className="text-xs text-on-surface-variant font-medium mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-12 py-20 md:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
            SETUP IN MINUTES
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">Up & Running in 4 Steps</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto">
            From download to full home automation — no technical knowledge required.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 z-0" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
            {HOW_IT_WORKS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center space-y-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-primary/60 tracking-widest">{item.step}</span>
                    <h4 className="font-display text-lg font-bold text-on-surface">{item.title}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Download CTA below steps */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-on-surface-variant">Start your free 30-day trial today</p>
          <AppDownloadButtons variant="dark" />
        </div>
      </section>

      {/* ── APP FEATURES GRID ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-12 py-20 md:py-24 bg-surface-container border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
              APP CAPABILITIES
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold">Everything You Need, Nothing You Don't</h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto">
              Built from real homeowner feedback — every feature solves a real-world problem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APP_FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-white p-8 rounded-3xl border border-outline-variant/20 hover:shadow-xl transition-all group flex flex-col gap-4"
                >
                  <div className={`w-12 h-12 rounded-2xl ${feat.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${feat.color}`} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-display text-lg font-bold text-on-surface">{feat.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className={`text-[10px] font-bold tracking-widest ${feat.color}`}>{feat.tag}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-12 py-20 md:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
            USER REVIEWS
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold">What Homeowners Are Saying</h2>
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm font-bold text-on-surface ml-1">4.9 on App Store & Play Store</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-8 border border-outline-variant/20 hover:shadow-xl transition-all flex flex-col gap-5"
            >
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed italic flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/20">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm text-on-surface">{t.name}</div>
                  <div className="text-xs text-on-surface-variant flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENTO FEATURES ────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-12 py-16 sm:py-20 md:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            MOBILE CONCIERGE PLATFORM
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Intelligent Simplicity</h2>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto">
            Designed around "Quiet Intelligence" — reducing noise, amplifying real security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          <div className="md:col-span-8 p-6 sm:p-8 lg:p-10 bg-surface-container-low rounded-[2rem] border border-outline-variant/20 flex flex-col justify-between min-h-[280px] sm:min-h-[320px] md:h-[360px] hover:border-primary/30 transition-colors group">
            <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <div className="space-y-2 max-w-lg mt-4 md:mt-0">
              <h3 className="font-display text-xl sm:text-2xl font-bold">One-Touch Atmosphere Automation</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Arm motion tracking, close blinds, shift lighting templates, and power down standby equipment — all tied to your physical location in real time.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-primary font-bold mt-4 md:mt-0">
              LOCAL PROTOCOLS ENGAGED
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="md:col-span-4 p-6 sm:p-8 lg:p-10 bg-inverse-surface text-inverse-on-surface rounded-[2rem] flex flex-col justify-between min-h-[280px] sm:min-h-[320px] md:h-[360px]">
            <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#8bf7cf]" />
            </span>
            <div className="space-y-2 mt-4 md:mt-0">
              <h3 className="font-display text-lg sm:text-xl font-bold">Real-time Encrypted Feeds</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Connect through secure local node gateways with zero-knowledge security — your private moments never leave your property.
              </p>
            </div>
            <div className="text-[10px] font-mono tracking-wider opacity-50 uppercase mt-4 md:mt-0">
              Proprietary End-to-End
            </div>
          </div>

          {[
            { icon: Wifi, color: 'text-emerald-500', bg: 'bg-emerald-500/10', title: 'Mesh Network', desc: 'Redundant local mesh keeps all nodes connected even without internet.', tag: '14ms AVG LATENCY', tagColor: 'text-emerald-500' },
            { icon: Droplets, color: 'text-sky-500', bg: 'bg-sky-500/10', title: 'Smart Climate', desc: 'AI-driven climate adjustment learns your preferences over time.', tag: 'AUTO-SCHEDULE ENABLED', tagColor: 'text-sky-500' },
            { icon: Sun, color: 'text-amber-500', bg: 'bg-amber-500/10', title: 'Scene Engine', desc: 'One tap to set the perfect mood — lighting, temp and audio together.', tag: '12 SCENES READY', tagColor: 'text-amber-500' },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="md:col-span-4 p-6 sm:p-8 bg-surface-container-low rounded-[2rem] border border-outline-variant/20 flex flex-col gap-4 min-h-[200px] hover:border-primary/30 transition-colors">
                <span className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{card.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-1">{card.desc}</p>
                </div>
                <div className={`text-[10px] font-bold font-mono ${card.tagColor}`}>{card.tag}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── APP DOWNLOAD BANNER ───────────────────────────────────────────── */}
<section className="mx-4 md:mx-8 mb-12 rounded-3xl overflow-hidden relative">

  {/* ── Background layers ── */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/40 to-cyan-50/30" />

  {/* Animated glow orbs */}
  <div className="absolute top-[-80px] left-[-60px] w-[350px] h-[350px] rounded-full bg-[#00694f]/15 blur-[100px] pointer-events-none" />
  <div className="absolute bottom-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full bg-[#3cd7ff]/12 blur-[120px] pointer-events-none" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-[#8bf7cf]/8 blur-[80px] pointer-events-none" />

  {/* Subtle grid overlay */}
  <div
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: `linear-gradient(rgba(0,106,79,0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,106,79,0.5) 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
    }}
  />

  {/* ── Content ── */}
  <div className="relative z-10 px-8 md:px-16 py-16 md:py-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      {/* ── LEFT: Text block ── */}
      <div className="text-zinc-900 space-y-8">

        {/* Badge */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00694f]/12 text-[#00694f] font-bold text-[11px] tracking-widest uppercase border border-[#00694f]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00694f] animate-pulse" />
            FREE TO DOWNLOAD
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-zinc-900">
            Download Homeasy.
          </h2>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            <span className="bg-gradient-to-r from-[#00694f] via-[#008565] to-[#3cd7ff] bg-clip-text text-transparent">
              Control Everything.
            </span>
          </h2>
        </div>

        {/* Description */}
        <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-md">
          Available on iOS and Android. Works with your existing Aura hardware
          from day one — no subscription required for core features.
        </p>

        {/* Download buttons */}
        <div className="space-y-4">
          <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
            GET THE APP
          </p>
          <div className="flex flex-wrap gap-3">
            {/* App Store */}
            <a
              href="#"
              className="group inline-flex items-center gap-3 bg-zinc-900 text-white px-5 py-3.5 rounded-2xl font-bold text-sm hover:bg-zinc-800 active:scale-95 transition-all shadow-lg shadow-zinc-900/20"
            >
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 group-hover:bg-zinc-100 transition-colors">
                <Apple className="w-4 h-4 text-zinc-900" />
              </div>
              <div className="text-left">
                <div className="text-[9px] text-white/70 leading-none mb-0.5 font-normal">Download on the</div>
                <div className="text-sm font-bold leading-none">App Store</div>
              </div>
              <div className="ml-1 flex flex-col items-end shrink-0">
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[9px] text-white/60 font-mono">4.9</span>
              </div>
            </a>

            {/* Play Store */}
            <a
              href="#"
              className="group inline-flex items-center gap-3 bg-[#00694f] text-white px-5 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#005242] active:scale-95 transition-all shadow-lg shadow-[#00694f]/25"
            >
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="text-left">
                <div className="text-[9px] text-white/70 leading-none mb-0.5 font-normal">Get it on</div>
                <div className="text-sm font-bold leading-none">Google Play</div>
              </div>
              <div className="ml-1 flex flex-col items-end shrink-0">
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[9px] text-white/60 font-mono">4.8</span>
              </div>
            </a>
          </div>
        </div>

        {/* Feature pills row */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {[
            { icon: CheckCircle, text: 'Free Core Features' },
            { icon: CheckCircle, text: 'No Subscription' },
            { icon: CheckCircle, text: 'Offline Fallback' },
            { icon: CheckCircle, text: 'iOS & Android' },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="inline-flex items-center gap-1.5 bg-[#00694f]/10 border border-[#00694f]/20 text-zinc-700 px-3 py-1.5 rounded-full text-xs font-medium"
            >
              <Icon className="w-3.5 h-3.5 text-[#00694f]" />
              {text}
            </div>
          ))}
        </div>

        {/* Social proof strip */}
        <div className="flex items-center gap-4 pt-2 border-t border-zinc-200">
          <div className="flex -space-x-2">
            {['AR', 'KI', 'SM', 'RV'].map((av) => (
              <div
                key={av}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00694f] to-[#8bf7cf] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white"
              >
                {av}
              </div>
            ))}
          </div>
          <div>
            <p className="text-zinc-900 text-sm font-bold">50,000+ homes automated</p>
            <p className="text-zinc-500 text-xs font-mono">Across 15+ Indian cities</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Cards column ── */}
      <div className="flex flex-col gap-5">

        {/* QR card */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
          {/* QR block */}
          <div className="shrink-0 bg-gradient-to-br from-slate-900 to-zinc-800 rounded-2xl p-3 w-28 h-28 flex items-center justify-center">
            <QrCode className="w-20 h-20 text-white" />
          </div>
          {/* Text */}
          <div className="space-y-3 flex-1">
            <div>
              <p className="text-zinc-900 font-bold text-base">Scan to Install</p>
              <p className="text-zinc-600 text-xs leading-relaxed mt-0.5">
                Point your phone camera at the QR code to open the store listing instantly.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg text-[10px] font-bold text-zinc-700 border border-slate-200">
                <Apple className="w-3 h-3" /> iOS
              </span>
              <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg text-[10px] font-bold text-zinc-700 border border-slate-200">
                <Play className="w-3 h-3 fill-current" /> Android
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: '4.9★', label: 'App Store', sub: '2.1K reviews', color: 'text-amber-500' },
            { value: '4.8★', label: 'Play Store', sub: '3.4K reviews', color: 'text-amber-500' },
            { value: '<20ms', label: 'Response', sub: 'Avg latency', color: 'text-[#00694f]' },
          ].map(({ value, label, sub, color }) => (
            <div
              key={label}
              className="bg-white border border-zinc-200 rounded-2xl p-4 text-center space-y-1 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className={`text-lg font-bold font-display ${color}`}>{value}</p>
              <p className="text-zinc-900 text-[11px] font-semibold">{label}</p>
              <p className="text-zinc-500 text-[9px] font-mono">{sub}</p>
            </div>
          ))}
        </div>

        {/* Feature highlight card */}
        <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#00694f]/15 flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#00694f]" />
            </div>
            <p className="text-zinc-900 font-bold text-sm">What's new in v3.2</p>
          </div>
          <div className="space-y-2">
            {[
              'Geofence auto-mode switching',
              'Hindi voice command support',
              'Energy usage weekly digest',
              'Guest access time-lock profiles',
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00694f] shrink-0" />
                <span className="text-zinc-700 text-xs">{feat}</span>
              </div>
            ))}
          </div>
          <div className="pt-1">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[#00694f] text-xs font-bold hover:gap-2.5 transition-all"
            >
              View full changelog <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

    </div>
  );
}