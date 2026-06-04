import { useState, useEffect, useRef, FormEvent, useMemo } from 'react';
import {
  Lightbulb, ShieldCheck, Video, Sliders, Lock, Thermometer,
  Tv, Mic, Droplets, CheckCircle, Smartphone, Zap, Star,
  ChevronRight, ArrowRight, Sparkles, X,
  Shield, Film, Moon, Briefcase, Sun, UtensilsCrossed, MapPin, Volume2,
  Home, Eye, EyeOff, Bell, Signal, Wifi, Battery, Wind,
  Heart, Activity, Gamepad2, Monitor, Cloud, Music,
} from 'lucide-react';
import { LeadForm } from '../types';
import SmartHome3D from "../assets/Smarthome.png";

interface HomeasyHomeProps {
  onBookConsultation: () => void;
  onExploreSolutions: () => void;
}

type AppTabType = 'home' | 'devices' | 'scenes' | 'security';

// ── Floor Data (outside component, static) ──
const floorData = [
  {
    id: 'floor-01',
    dot: 'bg-primary',
    level: 'Level 01 — Social Hub',
    desc: 'Automated kitchen interfaces, spatial lighting for galleries, and seamless guest networking.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT6P1I9KOfeu4wb7wotZLEIo5-VLDkRsjBEq8PiKpWoOXlwziEt4H3kqtPsY8q4gDZx5tx2P2ukCXSbNk7OGjavf52P20CGvGl-Mq_SwVYfI0YxMMJmCtztgyAWXJmu9aQpu6nxWGGXbpDvunLBMJ9wOQu-TI4jL237fZC1z6P7FVnakJZVZi8f8kYhpZ958gKYHMCBLZwtVgiyZLzmj3nIA7R9iATcCvYxQtXyG0ShsK1bZ2YQCFLMCoTwm7JL0ywoWhisvkYP24',
    features: [
      { icon: Lightbulb, text: 'Adaptive Lighting', color: 'text-amber-500' },
      { icon: Thermometer, text: 'Climate Zones', color: 'text-blue-500' },
      { icon: Volume2, text: 'Audio System', color: 'text-purple-500' },
    ],
    stats: [
      { label: 'Lighting Zones', value: '8', icon: Lightbulb },
      { label: 'Devices', value: '24', icon: Zap },
      { label: 'Scenes', value: '12', icon: Thermometer },
    ],
  },
  {
    id: 'floor-02',
    dot: 'bg-tertiary',
    level: 'Level 02 — Private Sanctuaries',
    desc: 'Biometric access to master suites, personalized circadian rhythm lighting, and noise-isolated study pods.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3J2YOdFZgVYZ5oyDzp2dDKZ9v8ByIagrOG232zkmSTBbX5UMHZqs0a0r8iADSBdgR8yR4fsCZdBYxZRZoDL5LS2KOmH8VyKF834CsWfNQx9IrpEnoL0-ASsTsG2RfxmOxD0fNnnbUXdA-rEc1X4eXPRx8SlfKZ6SyOlNSVJ4e1MgEIzlxxtwvWHzmqZYaVnu-jJNPzIKrWCsPxY_pLfWS0KYWd4PmAOKnIGLJnFegLVqmiBQLQlJFRUZ81UEgOgNqwLuY8-5VsR0',
    features: [
      { icon: Lock, text: 'Biometric Access', color: 'text-rose-500' },
      { icon: Lightbulb, text: 'Circadian Lighting', color: 'text-amber-500' },
      { icon: Volume2, text: 'Noise Control', color: 'text-indigo-500' },
    ],
    stats: [
      { label: 'Bedrooms', value: '4', icon: Lock },
      { label: 'Devices', value: '18', icon: Zap },
      { label: 'Privacy Zones', value: '6', icon: Thermometer },
    ],
  },
  {
    id: 'floor-03',
    dot: 'bg-green-500',
    level: 'Level 03 — Wellness Retreat',
    desc: 'Smart wellness suites featuring air quality monitoring, automated aromatherapy, and integrated fitness environments.',
    img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80',
    features: [
      { icon: Heart, text: 'Health Monitoring', color: 'text-red-500' },
      { icon: Wind, text: 'Air Quality Control', color: 'text-green-500' },
      { icon: Activity, text: 'Fitness Integration', color: 'text-blue-500' },
    ],
    stats: [
      { label: 'Wellness Zones', value: '5', icon: Heart },
      { label: 'Sensors', value: '32', icon: Zap },
      { label: 'Programs', value: '14', icon: Activity },
    ],
  },
  {
    id: 'floor-04',
    dot: 'bg-orange-500',
    level: 'Level 04 — Entertainment Deck',
    desc: 'Immersive cinema experiences, synchronized multi-room audio, and adaptive ambiance for unforgettable gatherings.',
    img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80',
    features: [
      { icon: Tv, text: '4K Cinema', color: 'text-red-500' },
      { icon: Volume2, text: 'Surround Audio', color: 'text-purple-500' },
      { icon: Gamepad2, text: 'Gaming Hub', color: 'text-blue-500' },
    ],
    stats: [
      { label: 'Media Rooms', value: '3', icon: Tv },
      { label: 'Speakers', value: '28', icon: Volume2 },
      { label: 'Scenes', value: '20', icon: Zap },
    ],
  },
  {
    id: 'floor-05',
    dot: 'bg-cyan-500',
    level: 'Level 05 — Executive Workspace',
    desc: 'Productivity-focused smart offices with automated meeting controls, AI assistants, and advanced security.',
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
    features: [
      { icon: Briefcase, text: 'Smart Office', color: 'text-blue-500' },
      { icon: Shield, text: 'Advanced Security', color: 'text-green-500' },
      { icon: Monitor, text: 'AI Assistant', color: 'text-purple-500' },
    ],
    stats: [
      { label: 'Workspaces', value: '6', icon: Briefcase },
      { label: 'Connected Devices', value: '40', icon: Zap },
      { label: 'Security Nodes', value: '12', icon: Shield },
    ],
  },
  {
    id: 'floor-06',
    dot: 'bg-pink-500',
    level: 'Sky Lounge — Rooftop Experience',
    desc: 'Automated rooftop oasis with weather-responsive shading, intelligent lighting, and luxury entertainment.',
    img: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80',
    features: [
      { icon: Sun, text: 'Smart Shading', color: 'text-yellow-500' },
      { icon: Cloud, text: 'Weather Response', color: 'text-blue-500' },
      { icon: Music, text: 'Outdoor Entertainment', color: 'text-pink-500' },
    ],
    stats: [
      { label: 'Outdoor Zones', value: '7', icon: Sun },
      { label: 'Sensors', value: '18', icon: Cloud },
      { label: 'Experiences', value: '15', icon: Music },
    ],
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealSection({
  children, className = '', delay = 0,
}: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function HomeasyHome({ onBookConsultation, onExploreSolutions }: HomeasyHomeProps) {
  const [projectCount, setProjectCount] = useState(0);
  const [statPopup, setStatPopup] = useState<string | null>(null);
  const [activeScene, setActiveScene] = useState('cinema');
  const [form, setForm] = useState<LeadForm>({
    name: '', phone: '', email: '', propertyType: 'Villa', budget: '$25k - $100k',
  });
  const [submitted, setSubmitted] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeAppTab, setActiveAppTab] = useState<AppTabType>('home');
  const [brightness, setBrightness] = useState(75);
  const [temperature, setTemperature] = useState(23);
  const [viewCCTV, setViewCCTV] = useState(false);
  const [deviceLights, setDeviceLights] = useState(true);
  const [deviceAudio, setDeviceAudio] = useState(false);
  const [deviceTV, setDeviceTV] = useState(false);
  const [activeFloor, setActiveFloor] = useState('floor-01');

  // ✅ Derived inside component
  const currentFloor = useMemo(
    () => floorData.find(f => f.id === activeFloor) ?? floorData[0],
    [activeFloor]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count += 83;
        if (count >= 5000) { setProjectCount(5000); clearInterval(interval); }
        else setProjectCount(count);
      }, 16);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setHeroLoaded(true);
    const iv = setInterval(() => setProjectCount(p => p + (Math.random() > 0.7 ? 1 : 0)), 4000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const autoCycle = setInterval(() => {
      setActiveScene((prev) => {
        const currentIndex = scenesList.findIndex(s => s.id === prev);
        const nextIndex = (currentIndex + 1) % scenesList.length;
        return scenesList[nextIndex].id;
      });
    }, 15000);
    return () => clearInterval(autoCycle);
  }, []);

  const hardwareCatalog = [
    {
      id: 'elite-hub', name: 'Elite Hub Gen 3', price: 1299, bestSeller: true,
      desc: 'Central orchestrator connecting up to 500 low-latency devices with surge protection.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo2LkwGqW97-u_WMI8y00EZ4SUnlulBftlD9EPB40f1TAXTDHD4ml7KedNpCEfV2Q-dVjHGWgx46xDF0sopIWMx4Po-nDJEYPCJBD4woQtThVuFawMwzSQ7i76_4xne8WxgByxQCTtBkjV-ceY9qFdzNaadHn7AvjcPKrUooiNR5kJhPZbl1eqnVlePyl6Cb9RAmSMD6i-I3NpZBy_0KQy6M_7OfTxmksSTHFhpMRJfMtIUQ6yDoQIPlC4xt1oFIHqRiodjxIp6nI',
    },
    {
      id: 'touch-panel', name: 'OLED Command Wall', price: 849, bestSeller: false,
      desc: '10-inch custom edge-to-edge ambient touch panel with rich tactile feedback.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcFPk_k8AwmyxFCA8TKp-U-pfQKB985s4BH-kEaYPX-GabZZO9Fwfgu10ilQxXCaSaSswnWKy3UsrOjfj-qqPgAW1cfTWW0GwQjNDFEM6qw_43r1zpp0Y85D06BVIn-6yDzXiWKZep17Rk7knoZn3svCryX9UlGNYFjLyfshX7zgnYJpDLJ-y5QN6ZLQ4xmOS0XoYUzjzZPHW9WuoJq1AOdvhubXX9fQX_XI-AlRbOhoRBkCWhQ2FpVm8jR6o-edWIhAJQbeqGRsE',
    },
    {
      id: 'ai-camera', name: 'Sentinel AI Cam', price: 599, bestSeller: false,
      desc: 'Ultra 4K resolution with computer vision, thermal mapping, and smart deterrence.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD48WYRpVDA_-wFd7y_-bTAhIp4XB6J9td-GhrwXZBQRCAp9-E0HNmDGs1Nd7D8P87UzYbbBy22J1PCgYr7bw1-kDZXLNB8-xZhckKJzNEFZPi6SRMa4gQCKfl6Q_x3pm_uCppZyVilgLwQ7IkSHZPed5TcctyXRAYq7QS68sZS_QDKU0Js5cWR7yEYFVMw3UmLh3rP-VSbPvT5ruK-5-Jm_I55EhjBXwhyYPSJA0NTQRD5YMBG-EULRbTinSHKAssX4VkFFaRdKyU',
    },
  ];

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', phone: '', email: '', propertyType: 'Villa', budget: '$25k - $100k' });
      setSubmitted(false);
    }, 5000);
  };

  const ecosystemItems = [
    { title: 'Lighting Control', desc: 'Custom automated lighting templates mimicking natural circadian cycles.', icon: Lightbulb },
    { title: 'Security Systems', desc: 'Enterprise protective shield tracking perimeter intrusion in real-time.', icon: ShieldCheck },
    { title: 'CCTV Surveillance', desc: 'AI-boosted object tracking with hyper-crisp night resolution.', icon: Video },
    { title: 'Curtains & Drapes', desc: 'Quiet motorized drapery reactive to outdoor solar position.', icon: Sliders },
    { title: 'Smart Access Locks', desc: 'Biometric fingerprint scanner with instant temporary codes.', icon: Lock },
    { title: 'Climate Control', desc: 'Zoned temperature regulation minimizing energy consumption.', icon: Thermometer },
    { title: 'Media & Entertainment', desc: 'Multi-room immersive audio paired with cinema scene switches.', icon: Tv },
    { title: 'Voice Intelligence', desc: 'Zero-overhead localized voice commands without internet delay.', icon: Mic },
    { title: 'Smart Irrigation', desc: 'Automated water distribution adaptive to soil moisture metrics.', icon: Droplets },
  ];

  const scenesList = [
    { id: 'cinema', icon: Film, title: 'Cinema Mode', desc: 'Perfect for movie nights', emoji: '🎬', color: 'from-purple-500 to-pink-500', details: { lighting: 'Dimmed to 2%', climate: '21°C Cool', blinds: 'Fully closed', sound: 'Atmos active' } },
    { id: 'sleep', icon: Moon, title: 'Good Night', desc: 'Secure & restful sleep', emoji: '🌙', color: 'from-blue-500 to-indigo-500', details: { lighting: 'Blue light off', climate: '19°C Cool', blinds: '50% open', sound: 'White noise on' } },
    { id: 'morning', icon: Sun, title: 'Good Morning', desc: 'Start your day energized', emoji: '☀️', color: 'from-yellow-400 to-orange-500', details: { lighting: 'Circadian rhythm active', climate: '22°C Comfortable', blinds: 'Fully open', sound: 'News & weather' } },
    { id: 'work', icon: Briefcase, title: 'Focus Mode', desc: 'Deep work environment', emoji: '💼', color: 'from-blue-600 to-cyan-500', details: { lighting: 'Bright & natural', climate: '21°C Focused', blinds: 'Strategic open', sound: 'Notifications off' } },
    { id: 'dinner', icon: UtensilsCrossed, title: 'Dinner Time', desc: 'Warm & welcoming ambiance', emoji: '🍽️', color: 'from-amber-500 to-red-500', details: { lighting: 'Warm & dim at 40%', climate: '22°C Comfortable', blinds: 'Partially open', sound: 'Ambient music' } },
    { id: 'away', icon: MapPin, title: 'Away Mode', desc: 'Home stays secure', emoji: '✈️', color: 'from-emerald-500 to-teal-500', details: { lighting: 'Randomized patterns', climate: 'Eco mode 24°C', blinds: 'Random openings', sound: 'Security alerts' } },
  ];

  const testimonials = [
    { quote: 'The customized scene presets are incredibly convenient. Entering our home to perfectly tuned lighting is a quiet luxury we love.', author: 'Rajesh Mehra', role: 'CEO, TechForward Delhi', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmX8NpDG6cDj1--AqAZukfBE061YxUyPSDqITdLbF4pT5m14iRTxaAWRsE3Abf2TxkOeoCDgeHj9v6ffgQ9jf1sMh0uH7a6derv3utT3r9LC8QLduzznnRbojaDg-3k7Hed9IG2N2CStJ8bJ4XF5itP9xeVsDM10FiyXIeIUJM4Ny8csYwzl4OnUVzCyy3XdDf8Bp1Y5GqWAnXwce3Z4zyqQ2bvHkqeo-b34nZ9oYpenLxb8DHwaxe67c-1xLRW4RN9CHOMoVAzjg' },
    { quote: 'Completely seamless setup. The Homeasy engineers respected our timeline and integrated perfectly with our existing HomePods.', author: 'Priya Sharma', role: 'Interior Architect, Mumbai', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdFJu4WQ1OZ5rSLR3Zom7lz_8gYqhsOIQ1idklND8GygeBI3WwPn7jwyTs2AowEW1B4aF5PDbgdSxEwh178LZKTqnH6oGxbATGfKoQP9USAir7vKdVeFJ6407kiDuUcwpN1IPw-d5ArH16s-8aJBdXye_40XO9acoSV3DkS5WdR2Y6zzLBCqMhJS3MrE3sV6PBeZFiUmv_eF4Rb7Ba3kKw0iV2ELfjs6XmeEiTiNmBRicVOJJpvEBMfgTJ6fuMbrod3bsoX_QdxJg' },
  ];

  const appTabs: { id: AppTabType; icon: React.ElementType; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'devices', icon: Sliders, label: 'Devices' },
    { id: 'scenes', icon: Sparkles, label: 'Scenes' },
    { id: 'security', icon: MapPin, label: 'Security' },
  ];

  const renderFloorDetails = (floor: typeof floorData[0]) => (
    <>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Key Features</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {floor.features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/60 border border-outline-variant/20 hover:border-primary/30 transition-all">
                <Icon className={`w-5 h-5 ${feat.color} flex-shrink-0`} />
                <span className="text-xs font-semibold text-on-surface truncate">{feat.text}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-primary/30 to-transparent" />
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Level Statistics</h4>
        <div className="grid grid-cols-3 gap-3">
          {floor.stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-surface-container rounded-xl p-3 text-center">
                <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-lg font-bold text-primary">{stat.value}</div>
                <div className="text-[10px] text-on-surface-variant font-mono">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <button type="button" onClick={onBookConsultation}
        className="w-full py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-95">
        Customize This Level
      </button>
    </>
  );

  const renderHomeTab = () => (
    <div className="space-y-4">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-primary mb-1">Welcome Back</p>
        <h3 className="text-lg font-bold text-zinc-900">Good Morning</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[{ label: 'Devices', value: '12', icon: '📱' }, { label: 'Energy', value: '2.4kW', icon: '⚡' }, { label: 'Climate', value: '23°C', icon: '🌡️' }].map((stat) => (
          <div key={stat.label} className="bg-primary/10 rounded-lg p-2 text-center">
            <span className="text-lg">{stat.icon}</span>
            <p className="text-[10px] font-bold text-primary mt-1">{stat.value}</p>
            <p className="text-[8px] text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Active Now</p>
        <div className="space-y-1.5">
          {[{ name: 'Living Room Light', icon: '💡', status: 'ON · 2700K' }, { name: 'Smart AC', icon: '🌬️', status: 'Cooling · 23°C' }, { name: 'TV System', icon: '📺', status: 'Standby' }].map((device) => (
            <div key={device.name} className="flex items-center justify-between bg-white/60 rounded-lg p-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm">{device.icon}</span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-zinc-900 truncate">{device.name}</p>
                  <p className="text-[8px] text-zinc-500 truncate">{device.status}</p>
                </div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDevicesTab = () => (
    <div className="space-y-3">
      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Lighting Control</p>
      <div className="bg-white/60 rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-zinc-700">Brightness</span>
          <span className="text-[10px] font-mono font-bold text-primary">{brightness}%</span>
        </div>
        <input type="range" min="0" max="100" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full accent-primary h-1 rounded-full" />
      </div>
      <div className="bg-white/60 rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-zinc-700">Temperature</span>
          <span className="text-[10px] font-mono font-bold text-primary">{temperature}°C</span>
        </div>
        <input type="range" min="16" max="30" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} className="w-full accent-primary h-1 rounded-full" />
      </div>
      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mt-4 mb-2">Quick Toggles</p>
      <div className="space-y-2">
        {[{ name: 'Living Room Light', icon: '💡', state: deviceLights, setState: setDeviceLights }, { name: 'Audio System', icon: '🔊', state: deviceAudio, setState: setDeviceAudio }, { name: 'Smart TV', icon: '📺', state: deviceTV, setState: setDeviceTV }].map((device) => (
          <button key={device.name} type="button" onClick={() => device.setState(!device.state)} className="w-full flex items-center justify-between bg-white/60 rounded-lg p-2.5 hover:bg-white/80 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-sm">{device.icon}</span>
              <span className="text-[10px] font-bold text-zinc-900">{device.name}</span>
            </div>
            <div className={`w-6 h-4 rounded-full relative flex-shrink-0 transition-colors ${device.state ? 'bg-primary' : 'bg-zinc-300'}`}>
              <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${device.state ? 'right-0.5' : 'left-0.5'}`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderScenesTab = () => (
    <div className="space-y-2">
      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Quick Scenes</p>
      {[{ name: 'Cinema Mode', emoji: '🎬', color: 'bg-purple-100' }, { name: 'Good Night', emoji: '🌙', color: 'bg-blue-100' }, { name: 'Good Morning', emoji: '☀️', color: 'bg-amber-100' }, { name: 'Focus Mode', emoji: '💼', color: 'bg-slate-100' }].map((scene) => (
        <button key={scene.name} type="button" className={`w-full flex items-center gap-3 p-3 rounded-lg border border-zinc-200 hover:border-primary/30 transition-all ${scene.color}`}>
          <span className="text-2xl">{scene.emoji}</span>
          <div className="text-left">
            <p className="text-[10px] font-bold text-zinc-900">{scene.name}</p>
            <p className="text-[8px] text-zinc-500">Tap to activate</p>
          </div>
          <ChevronRight className="w-3 h-3 text-zinc-400 ml-auto flex-shrink-0" />
        </button>
      ))}
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-3">
      <div className="bg-gradient-to-br from-rose-600 to-rose-500 text-white rounded-lg p-3">
        <div className="flex items-start justify-between mb-2">
          <div><p className="text-[8px] font-bold uppercase tracking-widest opacity-80">Status</p><p className="text-sm font-bold">🔴 Armed</p></div>
          <button type="button" className="text-[9px] font-bold uppercase px-2 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors">Disarm</button>
        </div>
        <p className="text-[9px] font-mono opacity-80">All sensors secure · 0 alerts</p>
      </div>
      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mt-4">Cameras</p>
      <div className="border border-zinc-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-white/60 border-b border-zinc-200">
          <span className="text-[10px] font-bold text-zinc-900">Lobby Cam</span>
          <button type="button" onClick={() => setViewCCTV(!viewCCTV)} className="text-[9px] font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
            {viewCCTV ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}{viewCCTV ? 'Hide' : 'View'}
          </button>
        </div>
        {viewCCTV ? (
          <div className="relative h-20 bg-zinc-200">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa17AbEGoV28rySzLCLqWN-01klDPMfslWp1MFmhKISTf5ynl8esflwOYNg-stIkn7Xpvx5IDcyFqePAL5ZT-nmN7LwKETkdoLQ9rFeG_l8LSgLeRTfD9hVxiEikXq4m9wN5JwSn_fTD54vddPqT20761LN1WGR6mrMjywY7Va5iSH9gRSWXBPdBzClH0pry65z8cZ7UX4hu3HD3ERr8QKNzwFjV0YqRq1nCxPXfxMyJ7aBYkJqWEgnwUQLj0pyme_TC6JvY7edFo" alt="Camera feed" className="w-full h-full object-cover" loading="lazy" />
            <span className="absolute bottom-1 right-1 bg-rose-500 text-[7px] font-bold text-white px-1 py-0.5 rounded uppercase tracking-wider animate-pulse">LIVE</span>
          </div>
        ) : (<div className="h-16 flex items-center justify-center bg-white/40"><p className="text-[9px] font-mono text-zinc-400">Feed Paused</p></div>)}
      </div>
      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mt-3">Sensors</p>
      {[{ name: 'Front Door', status: '🔒 Locked' }, { name: 'Windows', status: '✓ Closed' }, { name: 'Motion', status: '✓ Armed' }].map((sensor) => (
        <div key={sensor.name} className="flex items-center justify-between bg-white/60 rounded-lg p-2.5">
          <div><p className="text-[10px] font-bold text-zinc-900">{sensor.name}</p><p className="text-[8px] text-zinc-500">{sensor.status}</p></div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden bg-surface text-on-surface">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-surface">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-[120px] animate-float" />
          <div className="absolute -bottom-12 -left-40 w-80 h-80 bg-tertiary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary-fixed/8 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative z-10 max-w-7xl w-full px-5 md:px-10 py-20 md:py-22">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full transition-all duration-700 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Since 2014 • 5000+ Projects</span>
              </div>
              <div className="space-y-4">
                <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-on-surface transition-all duration-700 delay-100 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  Elevate Every<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-primary animate-gradient">Human Moment.</span>
                </h1>
                <p className={`text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-lg transition-all duration-700 delay-200 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  Experience the symphony of architectural design and aerospace-grade technology. Your environment, perfected by intelligence—crafted for luxury living.
                </p>
              </div>
              <div className={`flex flex-col sm:flex-row gap-2 transition-all duration-700 delay-300 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <button type="button" onClick={onBookConsultation} className="group flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-2xl font-bold text-sm md:text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 active:scale-95">
                  Book Free Consultation<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button type="button" onClick={onExploreSolutions} className="group flex items-center justify-center gap-2 bg-white/60 border-2 border-primary/30 hover:bg-white/80 hover:border-primary/60 text-on-surface px-8 py-4 rounded-2xl font-bold text-sm md:text-base transition-all duration-300 hover:-translate-y-1 active:scale-95">
                  <Sparkles className="w-5 h-5" />Explore Solutions
                </button>
              </div>
              <div className="space-y-3 pt-4">
                {[{ icon: Shield, text: 'Offline-First Local Processing' }, { icon: Zap, text: '12ms Ultra-Low Latency Response' }, { icon: ShieldCheck, text: 'Bank-Level AES-256 Encryption' }, { icon: CheckCircle, text: '28+ States • 85K+ Active Users' }].map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div key={i} className={`flex items-center gap-3 transition-all duration-700 ${heroLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: `${500 + i * 100}ms` }}>
                      <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-primary" /></div>
                      <span className="text-sm font-medium text-on-surface-variant">{feat.text}</span>
                    </div>
                  );
                })}
              </div>
              <div className={`grid grid-cols-3 gap-4 pt-8 border-t border-outline-variant/30 transition-all duration-700 delay-500 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {[{ num: '5000+', label: 'Projects', msg: 'Over 5,000 smart luxury setups completed.' }, { num: '12+', label: 'Years', msg: 'Leading precision home automation since 2014.' }, { num: '28+', label: 'States', msg: 'Serving 28 major metropolitan areas.' }].map((stat, i) => (
                  <button key={i} type="button" onClick={() => setStatPopup(stat.msg)} className="text-center p-3 rounded-xl bg-white/50 border border-outline-variant/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
                    <div className="text-2xl md:text-3xl font-bold text-primary group-hover:scale-110 transition-transform">{stat.num}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">{stat.label}</div>
                  </button>
                ))}
              </div>
              {statPopup && (
                <div className="mt-4 bg-gradient-to-r from-primary/10 to-tertiary/10 border border-primary/30 text-on-surface text-sm py-4 px-5 rounded-2xl flex items-start justify-between gap-4 animate-scale-in">
                  <span className="flex items-center gap-2 leading-relaxed"><Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />{statPopup}</span>
                  <button type="button" onClick={() => setStatPopup(null)} className="shrink-0 hover:text-primary transition-colors"><X className="w-4 h-4" /></button>
                </div>
              )}
            </div>
           {/*} <RevealSection className="flex-1 relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center" delay={300}>
              <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent rounded-3xl blur-3xl pointer-events-none" />
               <div className="relative w-full h-full max-w-lg group">
                        <img
                          src={SmartHome3D}
                          alt="Luxury Smart Home"
                          className="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.25)] group-hover:scale-105 transition-all duration-700 animate-float"
                        />    
                        {[{ icon: Shield, label: 'Security', value: 'AES-256', delay: '0s', pos: '-top-6 -left-6', color: 'text-primary' }, { icon: Thermometer, label: 'Climate', value: '23.5°C', delay: '0.5s', pos: '-top-4 -right-8', color: 'text-tertiary' }, { icon: Lightbulb, label: 'Lighting', value: '85%', delay: '1s', pos: 'top-1/3 -left-12', color: 'text-primary' }, { icon: Video, label: 'CCTV', value: '4 Cams', delay: '1.5s', pos: '-bottom-8 -right-4', color: 'text-secondary' }, { icon: Smartphone, label: 'Devices', value: '12', delay: '2s', pos: '-bottom-4 -left-8', color: 'text-tertiary' }].map((card, i) => {
                  const Icon = card.icon;
                  return (<div key={i} className={`absolute ${card.pos} animate-float`} style={{ animationDelay: card.delay }}><div className="bg-white/90 backdrop-blur-md border border-outline-variant/30 rounded-2xl px-4 py-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center"><Icon className={`w-4 h-4 ${card.color}`} /></div><div><div className={`text-[10px] font-bold uppercase tracking-wider ${card.color}`}>{card.label}</div><div className="text-xs font-semibold text-on-surface">{card.value}</div></div></div></div></div>);
                })}
                <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none"><div className="bg-gradient-to-r from-primary to-tertiary text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl flex items-center gap-2 animate-pulse"><span className="w-2 h-2 bg-white rounded-full animate-pulse" />Live System Online</div></div>
              </div> 
              <div className="relative w-full h-full max-w-4xl group flex items-center justify-center">

  {/* Background Glow 
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-[700px] h-[700px] rounded-full bg-primary/20 blur-[140px]" />
  </div>

  {/* House Image 
  <img
    src={SmartHome3D}
    alt="Luxury Smart Home"
    className="relative z-10 w-[120%] md:w-[130%] max-w-none object-contain
    drop-shadow-[0_50px_120px_rgba(0,0,0,0.35)]
    group-hover:scale-105 transition-all duration-700 animate-float"
  />

  {/* Connection Lines 
  <svg
    className="absolute inset-0 w-full h-full z-20 pointer-events-none"
    viewBox="0 0 1000 800"
    preserveAspectRatio="none"
  >
    {/* Security 
    <line
      x1="420"
      y1="260"
      x2="160"
      y2="120"
      stroke="rgba(59,130,246,0.8)"
      strokeWidth="2"
      strokeDasharray="8 8"
    />
    <circle cx="420" cy="260" r="6" fill="#3b82f6">
      <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Climate 
    <line
      x1="610"
      y1="220"
      x2="860"
      y2="120"
      stroke="rgba(16,185,129,0.8)"
      strokeWidth="2"
      strokeDasharray="8 8"
    />
    <circle cx="610" cy="220" r="6" fill="#10b981">
      <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Lighting 
    <line
      x1="350"
      y1="380"
      x2="130"
      y2="350"
      stroke="rgba(245,158,11,0.8)"
      strokeWidth="2"
      strokeDasharray="8 8"
    />
    <circle cx="350" cy="380" r="6" fill="#f59e0b">
      <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* CCTV 
    <line
      x1="690"
      y1="470"
      x2="900"
      y2="620"
      stroke="rgba(168,85,247,0.8)"
      strokeWidth="2"
      strokeDasharray="8 8"
    />
    <circle cx="690" cy="470" r="6" fill="#a855f7">
      <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Devices 
    <line
      x1="360"
      y1="600"
      x2="160"
      y2="650"
      stroke="rgba(236,72,153,0.8)"
      strokeWidth="2"
      strokeDasharray="8 8"
    />
    <circle cx="360" cy="600" r="6" fill="#ec4899">
      <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>

  {[
    {
      icon: Shield,
      label: "Security",
      value: "AES-256",
      delay: "0s",
      pos: "top-8 left-0",
      color: "text-primary",
    },
    {
      icon: Thermometer,
      label: "Climate",
      value: "23.5°C",
      delay: "0.5s",
      pos: "top-12 right-0",
      color: "text-green-500",
    },
    {
      icon: Lightbulb,
      label: "Lighting",
      value: "85%",
      delay: "1s",
      pos: "top-1/2 -left-4",
      color: "text-amber-500",
    },
    {
      icon: Video,
      label: "CCTV",
      value: "4 Cams",
      delay: "1.5s",
      pos: "bottom-20 right-0",
      color: "text-purple-500",
    },
    {
      icon: Smartphone,
      label: "Devices",
      value: "12",
      delay: "2s",
      pos: "bottom-16 left-0",
      color: "text-pink-500",
    },
  ].map((card, i) => {
    const Icon = card.icon;

    return (
      <div
        key={i}
        className={`absolute z-30 ${card.pos} animate-float`}
        style={{ animationDelay: card.delay }}
      >
        <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl px-4 py-3 shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className={`w-5 h-5 ${card.color}`} />
            </div>

            <div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${card.color}`}>
                {card.label}
              </div>

              <div className="text-sm font-semibold text-on-surface">
                {card.value}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  })}

  {/* Live Status *
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
    <div className="bg-gradient-to-r from-primary to-tertiary text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 animate-pulse">
      <span className="w-2 h-2 bg-white rounded-full animate-ping" />
      Live System Online
    </div>
  </div>
</div>

            </RevealSection>*/}
            <RevealSection
  className="flex-1 relative h-[550px] md:h-[650px] lg:h-[750px] flex items-center justify-center"
  delay={300}
>
  {/* Background Glow */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-[700px] h-[700px] rounded-full bg-primary/20 blur-[140px]" />
  </div>

  <div className="relative w-full h-full max-w-4xl group flex items-center justify-center">

    {/* Signal Dots 
    <div className="absolute top-[22%] left-[38%] w-3 h-3 bg-primary rounded-full animate-ping z-20" />
    <div className="absolute top-[35%] right-[28%] w-3 h-3 bg-green-500 rounded-full animate-ping z-20" />
    <div className="absolute bottom-[28%] left-[32%] w-3 h-3 bg-amber-500 rounded-full animate-ping z-20" />
    <div className="absolute bottom-[22%] right-[30%] w-3 h-3 bg-purple-500 rounded-full animate-ping z-20" />

    {/* Main House */}
    <img
      src={SmartHome3D}
      alt="Luxury Smart Home"
      className="
        relative z-10
        w-[130%]
        md:w-[140%]
        max-w-none
        object-contain
        drop-shadow-[0_60px_120px_rgba(0,0,0,0.35)]
        group-hover:scale-105
        transition-all
        duration-700
        animate-float
      "
    />

    {[
      {
        icon: Shield,
        label: "Security",
        value: "AES-256",
        delay: "0s",
        pos: "top-8 left-0",
        color: "text-primary",
      },
      {
        icon: Thermometer,
        label: "Climate",
        value: "23.5°C",
        delay: "0.5s",
        pos: "top-12 right-0",
        color: "text-green-500",
      },
      {
        icon: Lightbulb,
        label: "Lighting",
        value: "85%",
        delay: "1s",
        pos: "top-1/2 -left-4",
        color: "text-amber-500",
      },
      {
        icon: Video,
        label: "CCTV",
        value: "4 Cams",
        delay: "1.5s",
        pos: "bottom-20 right-0",
        color: "text-purple-500",
      },
      {
        icon: Smartphone,
        label: "Devices",
        value: "12",
        delay: "2s",
        pos: "bottom-16 left-0",
        color: "text-pink-500",
      },
    ].map((card, i) => {
      const Icon = card.icon;

      return (
        <div
          key={i}
          className={`absolute ${card.pos} z-30 animate-float`}
          style={{ animationDelay: card.delay }}
        >
          <div
            className="
              bg-white/10
              backdrop-blur-2xl
              border
              border-white/20
              rounded-2xl
              px-4
              py-3
              shadow-2xl
              hover:-translate-y-2
              hover:scale-105
              transition-all
              duration-500
              cursor-pointer
            "
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>

              <div>
                <div
                  className={`text-[10px] font-bold uppercase tracking-widest ${card.color}`}
                >
                  {card.label}
                </div>

                <div className="text-sm font-semibold text-on-surface">
                  {card.value}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}

    {/* Live Status */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
      <div className="bg-gradient-to-r from-primary to-tertiary text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        Live System Online
      </div>
    </div>
  </div>
</RevealSection>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-primary overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(8).fill(['Smart Lighting', 'AI Security', 'Climate Control', 'Voice Assistant', 'Motorized Blinds', 'CCTV 4K', 'Smart Locks', 'Energy Management']).flat().map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 text-white/80 text-xs font-mono font-bold uppercase tracking-widest"><span className="w-1 h-1 rounded-full bg-primary-fixed inline-block" />{item}</span>
          ))}
        </div>
      </div>

      {/* COMMAND CENTER */}
      <section className="py-24 px-5 md:px-10 max-w-7xl mx-auto" id="solutions">
        <RevealSection className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block">Central Intelligence</span>
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight">Command Center</h2>
          <p className="text-on-surface-variant text-base max-w-2xl mx-auto">A unified dashboard for every intelligent subsystem in your home.</p>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <RevealSection className="md:col-span-12 lg:col-span-4">
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-7 flex flex-col justify-between h-[380px] group overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300"><Shield className="w-5 h-5 text-primary group-hover:text-white transition-colors" /></div>
                <h3 className="text-2xl font-bold mb-2 text-on-surface">Ironclad Privacy</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Offline-first local processing. Your data never leaves the architectural perimeter.</p>
              </div>
              <div className="mt-6 relative h-20 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 flex items-end justify-around gap-1">
                  {[40, 65, 100, 55, 80, 45, 70].map((h, i) => (<div key={i} className="bg-primary rounded-t-sm animate-pulse flex-1" style={{ height: `${h}%`, animationDelay: `${i * 0.2}s` }} />))}
                </div>
              </div>
            </div>
          </RevealSection>
          <div className="md:col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <RevealSection delay={80}>
              <button type="button" onClick={onExploreSolutions} className="w-full text-left bg-surface-container-low border border-outline-variant/30 rounded-3xl p-7 group hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="flex justify-between items-start mb-10"><div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center"><Mic className="w-5 h-5 text-tertiary" /></div><ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" /></div>
                <h4 className="text-xl font-bold mb-2 text-on-surface">Sonic Isolation</h4><p className="text-on-surface-variant text-sm">Phase-cancellation windows eliminate exterior noise for pure spatial silence.</p>
              </button>
            </RevealSection>
            <RevealSection delay={160}>
              <button type="button" onClick={onExploreSolutions} className="w-full text-left bg-surface-container-low border border-outline-variant/30 rounded-3xl p-7 group hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="flex justify-between items-start mb-10"><div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Zap className="w-5 h-5 text-primary" /></div><ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" /></div>
                <h4 className="text-xl font-bold mb-2 text-on-surface">Adaptive Energy</h4><p className="text-on-surface-variant text-sm">Micro-grid management reducing your carbon footprint by 40% autonomously.</p>
              </button>
            </RevealSection>
            <RevealSection delay={240} className="sm:col-span-2">
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-7 flex items-center gap-10">
                <div className="shrink-0 relative w-24 h-24">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96"><circle cx="48" cy="48" r="40" fill="transparent" stroke="rgba(0,105,79,0.12)" strokeWidth="6" /><circle cx="48" cy="48" r="40" fill="transparent" stroke="#00694f" strokeWidth="6" strokeDasharray="251" strokeDashoffset="60" strokeLinecap="round" /></svg>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-primary text-lg">76%</div>
                </div>
                <div><h4 className="text-xl font-bold mb-1 text-on-surface">Ecosystem Health</h4><p className="text-on-surface-variant text-sm leading-relaxed">Real-time diagnostics of all architectural subsystems.</p></div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* SCENE SELECTOR */}
      <section className="py-16 md:py-24 bg-surface-container-low border-y border-outline-variant/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <RevealSection className="text-center mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block">Scene Manager</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight">Orchestrate Your <span className="text-primary">Environment.</span></h2>
            <p className="text-on-surface-variant text-sm md:text-base max-w-lg mx-auto">Intuitive scene management that shifts your entire home's personality with a single touch.</p>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full w-fit mx-auto"><div className="w-2 h-2 bg-primary rounded-full animate-pulse" /><span className="text-xs font-semibold text-primary">Auto-cycling every 15s</span></div>
          </RevealSection>
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
            <RevealSection className="w-full lg:w-1/2 flex flex-col items-center gap-6 lg:sticky lg:top-20" delay={100}>
              <div className="relative flex items-center justify-center" style={{ width: 'min(340px, 88vw)', height: 'min(340px, 88vw)', maxWidth: '340px', maxHeight: '340px' }}>
                <div className="absolute inset-0 rounded-full border border-primary/25" style={{ animation: 'spin 30s linear infinite' }} />
                <div className="absolute rounded-full border border-primary/20" style={{ inset: '10%', animation: 'spin 20s linear infinite reverse' }} />
                <div className="absolute rounded-full border border-primary/15" style={{ inset: '28%', animation: 'spin 15s linear infinite' }} />
                <div className="absolute inset-1/4 rounded-full bg-primary/10 blur-2xl" />
                <div className="relative rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border-2 border-primary/40 shadow-2xl flex flex-col items-center justify-center text-center z-20 backdrop-blur-md" style={{ width: '38%', height: '38%', minWidth: '115px', minHeight: '115px' }}>
                  <div className="font-bold text-[10px] sm:text-xs text-on-surface px-2 leading-tight">{scenesList.find(s => s.id === activeScene)?.title || 'Scene'}</div>
                  <div className="text-[7px] uppercase tracking-widest text-primary mt-0.5 font-bold">Active</div>
                </div>
                {scenesList.map((scene, index) => {
                  const Icon = scene.icon; const isActive = activeScene === scene.id;
                  const angle = (index * (360 / scenesList.length)) - 90;
                  const x = Math.cos(angle * Math.PI / 180) * 43; const y = Math.sin(angle * Math.PI / 180) * 43;
                  return (<button key={scene.id} type="button" onClick={() => setActiveScene(scene.id)} title={scene.title} className={`absolute rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/50 scale-110 z-30' : 'bg-white border-2 border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary hover:scale-110 z-10'}`} style={{ width: 'clamp(38px, 10%, 50px)', height: 'clamp(38px, 10%, 50px)', left: `calc(50% + ${x}% - clamp(19px, 5%, 25px))`, top: `calc(50% + ${y}% - clamp(19px, 5%, 25px))` }}><Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>);
                })}
              </div>
              {(() => { const scene = scenesList.find(s => s.id === activeScene); if (!scene) return null; return (
                <div className="w-full max-w-sm animate-scale-in">
                  <div className={`bg-gradient-to-r ${scene.color} p-4 rounded-t-2xl flex items-center gap-3`}><div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">{scene.emoji}</div><div><h3 className="font-bold text-white text-sm">{scene.title}</h3><p className="text-white/75 text-xs">{scene.desc}</p></div></div>
                  <div className="bg-white/80 backdrop-blur-sm border border-outline-variant/20 rounded-b-2xl p-4 grid grid-cols-2 gap-3">
                    {[{ label: '💡 Lighting', value: scene.details.lighting }, { label: '🌡️ Climate', value: scene.details.climate }, { label: '🪟 Blinds', value: scene.details.blinds }, { label: '🔊 Sound', value: scene.details.sound }].map((d, i) => (
                      <div key={i} className="bg-surface-container-low rounded-xl p-3 border border-outline-variant/15"><div className="text-[10px] font-bold text-on-surface-variant mb-1">{d.label}</div><div className="text-xs font-bold text-on-surface leading-tight">{d.value}</div></div>
                    ))}
                  </div>
                </div>); })()}
            </RevealSection>
            <RevealSection className="w-full lg:w-1/2" delay={200}>
              <div className="grid grid-cols-2 gap-3">
                {scenesList.map((scene) => { const Icon = scene.icon; const isActive = activeScene === scene.id; return (
                  <button key={scene.id} type="button" onClick={() => setActiveScene(scene.id)} className={`text-left p-4 rounded-2xl transition-all duration-300 group flex flex-col gap-3 ${isActive ? 'bg-primary/15 border-2 border-primary shadow-lg shadow-primary/15' : 'bg-white/60 border border-outline-variant/20 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5'}`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${isActive ? 'bg-primary text-white scale-105 shadow-md shadow-primary/30' : 'bg-primary/15 text-primary group-hover:bg-primary/25'}`}><Icon className="w-4 h-4" /></div>
                    <div><h3 className={`font-bold text-sm leading-tight transition-colors ${isActive ? 'text-primary' : 'text-on-surface'}`}>{scene.title}</h3><p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug line-clamp-2">{scene.desc}</p></div>
                    {isActive && <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /><span className="text-[10px] font-bold text-primary uppercase tracking-wider">Active</span></div>}
                  </button>); })}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/8 to-tertiary/8 border border-primary/20 rounded-2xl flex items-center justify-between gap-4">
                <div><div className="text-xs font-bold text-on-surface">Custom scenes available</div><div className="text-[11px] text-on-surface-variant mt-0.5">We build scenes tailored to your lifestyle & property.</div></div>
                <button type="button" onClick={onBookConsultation} className="shrink-0 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition-all active:scale-95">Consult</button>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="py-24 px-5 md:px-10 max-w-7xl mx-auto">
        <RevealSection className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block">Unified Ecosystem</span>
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight">Everything, Connected</h2>
          <p className="text-on-surface-variant text-base max-w-2xl mx-auto">Seamlessly integrate every facet of your home into a single, cohesive smart network.</p>
        </RevealSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ecosystemItems.map((item, idx) => { const Icon = item.icon; return (
            <RevealSection key={idx} delay={idx * 60}>
              <button type="button" onClick={onExploreSolutions} className="group w-full text-left bg-surface-container-lowest border border-outline-variant/20 p-7 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1.5 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between h-full">
                <div><div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"><Icon className="w-5 h-5" /></div><h3 className="text-lg font-bold mb-2 text-on-surface">{item.title}</h3><p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p></div>
                <div className="mt-5 text-primary font-bold text-xs flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">Explore <ChevronRight className="w-3.5 h-3.5" /></div>
              </button>
            </RevealSection>); })}
        </div>
      </section>

      {/* APP SIMULATOR */}
      <section className="py-24 px-5 md:px-10 bg-surface-container-low border-y border-outline-variant/20 overflow-hidden" id="app-section">
        <div className="max-w-7xl mx-auto">
          <RevealSection className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block">Mobile Command</span>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight">Homeasy On The Go</h2>
            <p className="text-on-surface-variant text-base max-w-2xl mx-auto">Control your entire smart home from anywhere.</p>
          </RevealSection>
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            <div className="flex-1 flex justify-center items-start lg:sticky lg:top-20">
              <div className="relative z-10 flex flex-col overflow-hidden" style={{ width: 'min(340px, 90vw)', height: 'min(680px, 85vh)', background: '#09090b', borderRadius: '3rem', border: '12px solid #27272a', boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 120px rgba(0, 105, 79, 0.2)' }}>
                <div className="shrink-0 flex items-center justify-between px-5 pt-3 pb-1.5 bg-zinc-950"><span className="text-[11px] text-white font-semibold">9:41</span><div className="w-20 h-4 bg-black rounded-full flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-blue-500" /></div><div className="flex items-center gap-1"><Signal className="w-3 h-3 text-white" /><Wifi className="w-3 h-3 text-white" /><Battery className="w-3.5 h-3.5 text-white" /></div></div>
                <div className="flex-1 overflow-y-auto bg-[#f7f8fa] flex flex-col" style={{ scrollbarWidth: 'none' }}>
                  <div className="shrink-0 flex items-center justify-between px-4 pt-4 pb-3 border-b border-zinc-100"><div><p className="text-[9px] font-bold uppercase tracking-widest text-primary">Homeasy App</p><h3 className="text-base font-extrabold text-zinc-900">Control Center</h3></div><button type="button" className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-zinc-200 shadow-sm flex-shrink-0"><Bell className="w-4 h-4 text-zinc-500" /></button></div>
                  <div className="flex-1 px-4 py-4 space-y-4 pb-20">
                    {activeAppTab === 'home' && renderHomeTab()}
                    {activeAppTab === 'devices' && renderDevicesTab()}
                    {activeAppTab === 'scenes' && renderScenesTab()}
                    {activeAppTab === 'security' && renderSecurityTab()}
                  </div>
                </div>
                <div className="shrink-0 flex items-center justify-around px-2 py-2 bg-white border-t border-zinc-100">
                  {appTabs.map(({ id, icon: Icon, label }) => (<button key={id} type="button" onClick={() => setActiveAppTab(id)} className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-all ${activeAppTab === id ? 'bg-primary/10' : ''}`}><Icon className={`w-4 h-4 ${activeAppTab === id ? 'text-primary' : 'text-zinc-400'}`} /><span className={`text-[7px] font-bold ${activeAppTab === id ? 'text-primary' : 'text-zinc-400'}`}>{label}</span></button>))}
                </div>
              </div>
            </div>
            <RevealSection className="flex-1 space-y-8" delay={200}>
              <div className="space-y-4">
                <div className="space-y-1"><span className="text-xs font-bold uppercase tracking-widest text-primary">KEY FEATURES</span><h3 className="text-2xl font-bold text-on-surface">Full Control At Hand</h3></div>
                {[{ icon: Sparkles, title: 'Ambient Presets', desc: 'One-tap scene modes.' }, { icon: Mic, title: 'Voice Control', desc: 'Siri, Alexa & Google Assistant.' }, { icon: Zap, title: 'Energy Monitoring', desc: 'Real-time optimization.' }, { icon: ShieldCheck, title: 'Bank-Level Security', desc: 'AES-256 encryption.' }].map((feat, i) => { const Icon = feat.icon; return (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/60 border border-outline-variant/20 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"><div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-300"><Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" /></div><div><h4 className="font-bold text-sm text-on-surface mb-0.5">{feat.title}</h4><p className="text-xs text-on-surface-variant leading-relaxed">{feat.desc}</p></div></div>); })}
              </div>
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-outline-variant/20">
                {[{ label: 'Downloads', val: '500K+' }, { label: 'Rating', val: '4.8⭐' }, { label: 'Users', val: '85K+' }].map((stat, i) => (<div key={i} className="text-center p-3 bg-surface-container rounded-xl hover:bg-primary/10 transition-all"><div className="text-lg font-bold text-primary">{stat.val}</div><div className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">{stat.label}</div></div>))}
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-on-surface text-white py-3 rounded-xl font-bold text-sm hover:bg-on-surface/90 active:scale-95 transition-all">🍎 App Store</button>
                <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-primary-container active:scale-95 transition-all">🔵 Play Store</button>
              </div>
            </RevealSection>
          </div>
          <div className="mt-20 pt-12 border-t border-outline-variant/20">
            <RevealSection className="text-center mb-10"><h3 className="text-3xl font-bold text-on-surface tracking-tight">Everything at Your Fingertips</h3></RevealSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[{ icon: '⚡', title: '12ms Response', desc: 'Lightning-fast processing' }, { icon: '🔐', title: 'Offline-First', desc: 'Works without internet' }, { icon: '📊', title: 'Real-Time Data', desc: 'Live monitoring' }, { icon: '🎯', title: 'Intelligent AI', desc: 'Learns your habits' }].map((item, i) => (
                <RevealSection key={i} delay={i * 80}><div className="p-5 rounded-2xl bg-white/60 border border-outline-variant/20 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300 group cursor-pointer hover:-translate-y-1"><div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div><h4 className="font-bold text-sm text-on-surface mb-1 group-hover:text-primary transition-colors">{item.title}</h4><p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p></div></RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HARDWARE */}
      <section className="py-24 px-5 md:px-10" id="products">
        <div className="max-w-7xl mx-auto">
          <RevealSection className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block">Our Hardware</span>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight">Premium Hardware</h2>
            <p className="text-on-surface-variant text-sm max-w-xl mx-auto">Industry-leading hardware for security, reliability, and performance.</p>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hardwareCatalog.map((item, idx) => (
              <RevealSection key={item.id} delay={idx * 100}>
                <div className="group bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="h-60 overflow-hidden relative"><img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} />{item.bestSeller && <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-bold uppercase px-3 py-1 rounded-full tracking-wider shadow">Popular Choice</span>}</div>
                  <div className="p-7 space-y-3"><h3 className="font-bold text-lg text-on-surface">{item.name}</h3><p className="text-on-surface-variant text-xs leading-relaxed">{item.desc}</p><button type="button" onClick={onBookConsultation} className="mt-2 flex items-center gap-2 text-primary text-xs font-semibold hover:underline transition-all">Ask About This →</button></div>
                </div>
              </RevealSection>
            ))}
          </div>
          <RevealSection className="mt-10">
            <div className="bg-gradient-to-r from-primary/8 to-tertiary/8 p-8 rounded-3xl border border-primary/20 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
              <div className="space-y-2"><span className="text-[10px] uppercase tracking-widest font-bold text-primary">Get Expert Advice</span><h4 className="font-bold text-xl text-on-surface">Not sure which hardware fits your property?</h4><p className="text-xs text-on-surface-variant max-w-md">Free assessment and recommendation.</p></div>
              <button type="button" onClick={onBookConsultation} className="shrink-0 bg-primary hover:bg-primary-container text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-primary/30">Book Free Consultation</button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════
          FLOOR BREAKDOWN — ORIGINAL DESIGN, DATA CHANGES ON CLICK
      ══════════════════════════════ */}
      <section className="py-24 px-5 md:px-10 bg-surface-container-low border-y border-outline-variant/20 overflow-hidden">
        <div className="max-w-7xl mx-auto">

          <RevealSection className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block">Space by Space</span>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight">Every Level, Elevated</h2>
            <p className="text-on-surface-variant text-base max-w-2xl mx-auto">Discover comprehensive smart home integration across every floor of your residence.</p>
          </RevealSection>

          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* LEFT: Timeline */}
            <div className="flex-1">
              <div className="space-y-4 relative">
                <div className="absolute left-[13px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-tertiary to-transparent" />

                {floorData.map((floor, i) => {
                  const isActive = activeFloor === floor.id;
                  return (
                    <RevealSection key={floor.id} delay={i * 80} className="relative pl-14">
                      <div className={`absolute left-0 top-5 w-7 h-7 rounded-full ${floor.dot} shadow-lg flex items-center justify-center border-4 border-surface-container-low transition-all duration-300 z-10 ${isActive ? 'scale-125 ring-4 ring-primary/30' : 'scale-100'}`}>
                        {isActive && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <button type="button" onClick={() => setActiveFloor(floor.id)}
                        className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border ${isActive ? 'bg-white/80 border-primary/30 shadow-lg shadow-primary/10' : 'bg-white/40 border-outline-variant/20 hover:bg-white/60 hover:border-primary/20'}`}>
                        <h3 className={`font-bold text-lg tracking-tight mb-1 transition-colors ${isActive ? 'text-primary' : 'text-on-surface'}`}>{floor.level}</h3>
                        <p className="text-sm text-on-surface-variant leading-relaxed">{floor.desc}</p>
                        {isActive && (
                          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary animate-scale-in">
                            <ChevronRight className="w-4 h-4" />
                            <span className="hidden lg:inline">Details shown on the right →</span>
                            <span className="lg:hidden">Details shown below ↓</span>
                          </div>
                        )}
                      </button>
                      {isActive && (
                        <div className="mt-4 lg:hidden rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm animate-scale-in">
                          <img alt={floor.level} className="w-full h-64 object-cover" src={floor.img} />
                        </div>
                      )}
                    </RevealSection>
                  );
                })}
              </div>

              {/* Mobile details */}
              <div className="lg:hidden mt-8 bg-gradient-to-br from-white/60 to-white/40 border border-primary/20 rounded-3xl p-6 space-y-6" key={`mob-${currentFloor.id}`}>
                {renderFloorDetails(currentFloor)}
              </div>
            </div>

            {/* RIGHT: Building image + details (ORIGINAL DESIGN — data changes) */}
            <RevealSection className="hidden lg:flex flex-1 flex-col lg:sticky lg:top-28 gap-6" delay={200}>

              {/* Building image container */}
              <div className="relative w-full">
                <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-3 translate-y-4 pointer-events-none" />
                <div className="relative h-[400px] w-full bg-surface-container-lowest border-2 border-outline-variant/30 rounded-3xl overflow-hidden shadow-xl">

                  {/* ✅ Image changes based on currentFloor */}
                  <img
                    key={currentFloor.id}
                    alt={currentFloor.level}
                    className="w-full h-full object-cover opacity-70 transition-opacity duration-500"
                    src={currentFloor.img}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/30 to-transparent pointer-events-none" />

                  {/* Active level badge on image */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-white/90 backdrop-blur-md border border-primary/20 rounded-xl px-4 py-2 shadow-lg">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Active Level</p>
                      <p className="text-sm font-bold text-on-surface">{currentFloor.level}</p>
                    </div>
                  </div>

                  {/* Floor badges overlaid */}
                  {floorData.map((floor, i) => {
                    const isFloorActive = activeFloor === floor.id;
                    // Distribute evenly
                    const topPercent = 15 + (i * (70 / (floorData.length - 1)));
                    return (
                      <button
                        key={floor.id}
                        type="button"
                        onClick={() => setActiveFloor(floor.id)}
                        className={`absolute right-4 transition-all duration-300 z-10 ${isFloorActive ? 'scale-110' : 'scale-95 hover:scale-105 opacity-70 hover:opacity-100'}`}
                        style={{ top: `${topPercent}%` }}
                      >
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md border transition-all duration-300 ${isFloorActive ? 'bg-white/95 border-primary shadow-lg shadow-primary/20' : 'bg-white/30 border-white/40 hover:bg-white/50'}`}>
                          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isFloorActive ? floor.dot : 'bg-white/60'}`} />
                          <span className={`font-bold text-xs whitespace-nowrap ${isFloorActive ? 'text-on-surface' : 'text-white'}`}>L{i + 1}</span>
                        </div>
                      </button>
                    );
                  })}

                  {/* Bottom navigation */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-primary animate-pulse" />
                        <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">{floorData.length} Levels</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {floorData.map((floor) => (
                          <button key={floor.id} type="button" onClick={() => setActiveFloor(floor.id)}
                            className={`h-2 rounded-full transition-all duration-300 ${activeFloor === floor.id ? `${floor.dot} w-6` : 'bg-outline-variant/40 hover:bg-outline-variant/60 w-2'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Details panel — changes based on currentFloor */}
              <div className="bg-gradient-to-br from-white/60 to-white/40 border border-primary/20 rounded-3xl p-6 space-y-6" key={`desk-${currentFloor.id}`}>
                {renderFloorDetails(currentFloor)}
              </div>

              <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                <p className="text-xs text-on-surface-variant"><span className="font-bold text-primary">Tip:</span> Click any level on the timeline or badges to explore.</p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-5 md:px-10 max-w-7xl mx-auto">
        <RevealSection className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-4">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight">Voices of Innovation</h2>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <RevealSection key={i} delay={i * 120}>
              <div className="bg-surface-container-lowest border border-outline-variant/20 p-8 rounded-3xl hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="flex gap-0.5 mb-5">{Array(5).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}</div>
                <p className="italic text-on-surface text-sm leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3"><img src={t.avatar} alt={t.author} className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20" /><div><div className="font-bold text-sm text-on-surface">{t.author}</div><div className="text-xs text-on-surface-variant">{t.role}</div></div></div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* CTA FORM */}
      <section className="py-16 px-5 md:px-10" id="contact">
        <RevealSection className="max-w-7xl mx-auto">
          <div className="bg-inverse-surface rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-white shadow-2xl">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/25 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-tertiary/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16">
              <div className="lg:w-1/2 space-y-7">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white tracking-tight">Ready to Evolve<br />Your Home?</h2>
                <p className="text-white/75 text-base leading-relaxed">Our lead consultants are standing by to map a device configuration for your property.</p>
                <ul className="space-y-4 text-sm">
                  {['Dedicated Luxury System Architect', 'Interactive 3D structural mapping', 'Surge Protection guarantees built-in'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary-fixed shrink-0 mt-0.5" /><span className="text-white/90">{item}</span></li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2">
                <div className="glass-card-dark p-7 rounded-[2rem] border border-white/10">
                  {submitted ? (
                    <div className="text-center py-12 space-y-4 animate-scale-in"><div className="w-16 h-16 bg-primary-fixed/20 rounded-full flex items-center justify-center mx-auto"><CheckCircle className="w-8 h-8 text-primary-fixed" /></div><h3 className="font-bold text-xl text-white">Consultation Requested!</h3><p className="text-xs text-white/70 max-w-xs mx-auto">We'll reach out within 2 business hours.</p></div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" required placeholder="Full Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:ring-1 focus:ring-primary-fixed outline-none w-full" />
                        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:ring-1 focus:ring-primary-fixed outline-none w-full" />
                      </div>
                      <input type="email" required placeholder="Email Address" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/35 focus:ring-1 focus:ring-primary-fixed outline-none w-full" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select value={form.propertyType} onChange={e => setForm(p => ({ ...p, propertyType: e.target.value }))} className="bg-[#1e2a26] text-white/80 border border-white/15 rounded-xl px-4 py-3 text-sm outline-none w-full focus:ring-1 focus:ring-primary-fixed">
                          <option value="Villa">Villa Estate</option><option value="Penthouse">Luxury Penthouse</option><option value="Apartment">Sleek Apartment</option><option value="Commercial">High-End Office</option>
                        </select>
                        <select value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))} className="bg-[#1e2a26] text-white/80 border border-white/15 rounded-xl px-4 py-3 text-sm outline-none w-full focus:ring-1 focus:ring-primary-fixed">
                          <option value="$10k - $25k">$10k – $25k</option><option value="$25k - $100k">$25k – $100k</option><option value="$100k+">$100k+ Luxury</option>
                        </select>
                      </div>
                      <button type="submit" className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 mt-2 active:scale-95">Request Consultation →</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

    </div>
  );
}