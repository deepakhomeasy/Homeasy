// src/components/Footer.tsx
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Heart,
} from 'lucide-react';
import { ActiveTab } from '../types';

// ─── Static Data ───────────────────────────────────────────────
const socialLinks = [
  { Icon: Instagram, href: 'https://instagram.com/homeasy_official', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/homeasy', label: 'LinkedIn' },
  { Icon: Twitter, href: 'https://twitter.com/homeasy_official', label: 'Twitter' },
  { Icon: Youtube, href: 'https://youtube.com/@homeasy', label: 'YouTube' },
];

const quickLinks: { key: ActiveTab; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'solutions', label: 'Solutions' },
  { key: 'product', label: 'Products' },
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'app', label: 'Mobile App' },
];

const smartSolutions = [
  'Smart Lighting',
  'AC Control',
  'Smart Curtains',
  'Security Systems',
  'CCTV Solutions',
  'Door Locks',
];

const experienceCenters = [
  'Mumbai',
  'Delhi NCR',
  'Bengaluru',
  'Pune',
  'Hyderabad',
];

const bottomLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Cookies', href: '#' },
];

// ─── Props ─────────────────────────────────────────────────────
interface FooterProps {
  onTabChange: (tab: ActiveTab) => void;
  onOpenModal: () => void;
}

// ─── Component ─────────────────────────────────────────────────
export function Footer({ onTabChange, onOpenModal }: FooterProps) {
  return (
    <footer className="w-full bg-gradient-to-b from-zinc-900 to-zinc-950 text-white relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00694f]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3cd7ff]/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-4 md:px-4 lg:px-4 py-4 md:py-4">

        {/* Grid - 5 equal columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">

          {/* ── Brand ── */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => onTabChange('home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00694f] to-[#00a876] text-white flex items-center justify-center font-bold text-sm shrink-0">
                H
              </div>
              <div className="text-left">
                <div className="font-bold text-sm text-white leading-tight">Homeasy</div>
                <div className="text-[8px] text-white/40 font-mono uppercase">Smart Home</div>
              </div>
            </button>

            <p className="text-white/50 text-xs leading-relaxed">
              Smart home automation for Indian homes. Trusted by 50,000+ families across 28+ states.
            </p>

            <div className="flex gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 bg-white/5 hover:bg-[#00694f]/20 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon className="w-3.5 h-3.5 text-[#8bf7cf]" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-widest text-white uppercase">
              Links
            </h4>
            <nav className="flex flex-col gap-2 pt-1">
              {quickLinks.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onTabChange(item.key)}
                  className="text-xs text-white/60 hover:text-[#8bf7cf] transition-colors text-left py-0.5"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* ── Solutions ── */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-widest text-white uppercase">
              Solutions
            </h4>
            <nav className="flex flex-col gap-2 pt-1">
              {smartSolutions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onTabChange('solutions')}
                  className="text-xs text-white/60 hover:text-[#8bf7cf] transition-colors text-left py-0.5"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* ── Cities ── */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-widest text-white uppercase">
              Visit
            </h4>
            <nav className="flex flex-col gap-2 pt-1">
              {experienceCenters.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => onTabChange('portfolio')}
                  className="text-xs text-white/60 hover:text-[#8bf7cf] transition-colors text-left py-0.5"
                >
                  {city}
                </button>
              ))}
            </nav>
          </div>

          {/* ── Contact ── */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-widest text-white uppercase">
              Contact
            </h4>
            
            <div className="space-y-3 pt-1">
              {/* Phone */}
              <a
                href="tel:+919820067338"
                className="flex items-center gap-2 text-xs text-white/60 hover:text-white group transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#8bf7cf] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="break-all">+91 XXXXX XXXXX</span>
              </a>

              {/* Email */}
              <a
                href="mailto:info@acis.co.in"
                className="flex items-center gap-2 text-xs text-white/60 hover:text-white group transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#8bf7cf] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="break-all">info@XXXXXXX.XX</span>
              </a>

              {/* Address */}
              <div className="flex items-center gap-2 text-xs text-white/60">
                <MapPin className="w-3.5 h-3.5 text-[#8bf7cf] shrink-0" />
                <span>Mumbai, India</span>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={onOpenModal}
                className="w-full bg-primary hover:bg-primary-container text-white py-2.5 px-3 rounded-lg text-[11px] font-bold transition-all hover:shadow-lg active:scale-95 mt-1"
              >
                Get Consultation
              </button>
            </div>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/10 my-8 md:my-10" />

        {/* ── Bottom Section ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-white/40">
          <p className="flex items-center justify-center sm:justify-start gap-1 order-2 sm:order-1">
            © 2026 <b>Homeasy</b> Smart Home. Made with <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" /> for smarter homes.
          </p>
          <div className="flex gap-4 order-1 sm:order-2">
            {bottomLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-white/70 transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}