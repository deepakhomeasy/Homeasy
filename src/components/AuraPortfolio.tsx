// AuraPortfolio.tsx
import { useState, useEffect } from 'react';
import {
  MapPin,
  ChevronRight,
  ChevronLeft,
  Award,
  Clock,
  Sparkles,
  ArrowLeft,
  Check,
  Phone,
  X,
  Layers,
  Calendar,
  Users,
  Zap,
  Shield,
  Quote
} from 'lucide-react';
import {
  studiosData,
  portfolioWorks,
  type ExperienceStudioDetail,
  type PortfolioWork
} from '../data/portfolio';

// ─── Types ────────────────────────────────────────────────────────────────────
type SlugView =
  | { type: 'studio'; id: string }
  | { type: 'work'; id: string }
  | null;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getBadgeColor(badge: ExperienceStudioDetail['badge']): string {
  if (badge === 'FLAGSHIP') return 'bg-amber-500';
  if (badge === 'PREMIUM') return 'bg-primary';
  return 'bg-emerald-600';
}

const categoryColors: Record<string, string> = {
  villa: 'bg-sky-500',
  office: 'bg-violet-600',
  penthouse: 'bg-amber-500',
  resort: 'bg-rose-500',
  kitchen: 'bg-emerald-600'
};

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'villa', label: 'Villas' },
  { id: 'office', label: 'Offices' },
  { id: 'penthouse', label: 'Penthouses' },
  { id: 'resort', label: 'Resorts' },
  { id: 'kitchen', label: 'Kitchens' }
];

const MAP_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCWBcWRjtV8MVjNW6pwvm6J71oy6Rf4GQ7aWw699DcdToDnaB5kkDIkzM9BVPJc1rfqv626FB5jY3MpXEaqtykahCfZCAMcNM563WbSGEfI6RQfmjOE0nSoCdYZ48B0rq_YZ14P0XhCgSK3Ske7t7fknQhp6MiSC97PYB94BKN1hE83uvWFx9tud6_3T6Wd_2qhdTV5cjK_caR3s2hu1lJO28ZTUDftAduObMo-A3LGeIOGW1GLNiLgFKdTg2YXg8DRQuyHr19kxus';

const STATE_LIST = [
  'Maharashtra', 'Karnataka', 'Delhi NCR Area',
  'Tamil Nadu States', 'Telangana Tech Zone', 'Goa Estate Corridors'
];
const PARTNERS = [
  'LODHA BUILDERS', 'GODREJ LUXURY', 'PRESTIGE CORRIDORS',
  'DLF PRIVY', 'TATA REALTY', 'OBEROI HOMES'
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  images, activeIdx, onClose, onPrev, onNext
}: {
  images: { url: string; caption: string }[];
  activeIdx: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 sm:p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-10"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-2 sm:left-4 md:left-8 text-white bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full transition-colors z-10"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <div className="max-w-4xl w-full space-y-3 sm:space-y-4 px-10 sm:px-16">
        <img
          src={images[activeIdx].url}
          alt={images[activeIdx].caption}
          className="w-full max-h-[70vh] sm:max-h-[75vh] object-contain rounded-xl sm:rounded-2xl"
        />
        <p className="text-center text-white/70 text-xs sm:text-sm font-mono">
          {images[activeIdx].caption} — {activeIdx + 1}/{images.length}
        </p>
      </div>
      <button
        type="button"
        onClick={onNext}
        className="absolute right-2 sm:right-4 md:right-8 text-white bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full transition-colors z-10"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Studio Detail Page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function StudioSlugPage({ studioId, onBack }: { studioId: string; onBack: () => void }) {
  const studio = studiosData.find(s => s.id === studioId)!;
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  return (
    <div className="animate-fade-in text-on-surface pt-14">
      {lightboxOpen && (
        <Lightbox
          images={studio.gallery}
          activeIdx={lightboxIdx}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIdx(i => (i - 1 + studio.gallery.length) % studio.gallery.length)}
          onNext={() => setLightboxIdx(i => (i + 1) % studio.gallery.length)}
        />
      )}

      {/* Back */}
      <div className="px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 max-w-7xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </button>
      </div>

      {/* Hero */}
      <section className="relative h-[45vh] sm:h-[55vh] md:h-[60vh] mt-4 sm:mt-6 mx-3 sm:mx-6 md:mx-12 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
        <img src={studio.heroImg} alt={studio.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12 text-white space-y-2 sm:space-y-3">
          <span className={`${getBadgeColor(studio.badge)} text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full`}>
            {studio.badge}
          </span>
          <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold">{studio.name}</h1>
          <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm font-mono">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="line-clamp-1">{studio.address}</span>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="mx-3 sm:mx-6 md:mx-12 -mt-4 sm:-mt-6 relative z-10">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-outline-variant/20 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-outline-variant/20">
          {studio.stats.map((stat, i) => (
            <div key={i} className="p-3 sm:p-5 text-center">
              <div className="font-display text-lg sm:text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-on-surface-variant font-mono mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main content */}
      <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">

        {/* Left column */}
        <div className="lg:col-span-2 space-y-10 sm:space-y-12">

          {/* About */}
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">ABOUT THIS STUDIO</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold">What You'll Experience Here</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">{studio.longDesc}</p>
          </div>

          {/* Features grid */}
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">STUDIO FEATURES</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {studio.features.map((feat, i) => (
                <div key={i} className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-surface-container-low rounded-xl sm:rounded-2xl border border-outline-variant/20 hover:border-primary/30 transition-colors group">
                  <span className="text-xl sm:text-2xl shrink-0">{feat.icon}</span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{feat.title}</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">STUDIO GALLERY</span>
            <div
              className="relative h-56 sm:h-72 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => { setLightboxIdx(activeGalleryIdx); setLightboxOpen(true); }}
            >
              <img
                src={studio.gallery[activeGalleryIdx].url}
                alt={studio.gallery[activeGalleryIdx].caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                <p className="text-[10px] sm:text-xs font-mono text-white/70">{studio.gallery[activeGalleryIdx].zone}</p>
                <p className="font-semibold text-xs sm:text-sm">{studio.gallery[activeGalleryIdx].caption}</p>
              </div>
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/20 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full">
                Click to expand
              </div>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 sm:gap-2">
              {studio.gallery.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setActiveGalleryIdx(i)}
                  className={`relative h-14 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${activeGalleryIdx === i ? 'border-primary scale-95' : 'border-transparent hover:border-primary/40'}`}
                >
                  <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Specialities */}
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">STUDIO SPECIALITY</span>
            <div className="flex flex-wrap gap-2">
              {studio.speciality.map((s, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <Sparkles className="w-3 h-3 shrink-0" /> {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4 sm:space-y-6">

          {/* Visit info */}
          <div className="bg-surface-container-low rounded-xl sm:rounded-2xl border border-outline-variant/20 p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h3 className="font-display font-bold text-base sm:text-lg">Visit Information</h3>
            <div className="space-y-3 text-sm">
              {[
                { icon: Clock, label: 'Timings', value: studio.timings },
                { icon: Phone, label: 'Contact', value: studio.contact },
                { icon: MapPin, label: 'Address', value: studio.address },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-semibold text-on-surface text-sm">{label}</p>
                    <p className="text-on-surface-variant text-xs leading-relaxed">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slot booking */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-outline-variant/20 p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-md">
            <h3 className="font-display font-bold text-base sm:text-lg">Book a Visit Slot</h3>
            {!booked ? (
              <>
                <p className="text-xs text-on-surface-variant">Select a preferred time for your studio walkthrough:</p>
                <div className="grid grid-cols-2 gap-2">
                  {studio.availableSlots.map((slot, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${selectedSlot === slot ? 'bg-primary text-white border-primary' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => selectedSlot && setBooked(true)}
                  className={`w-full py-2.5 sm:py-3 rounded-xl font-bold text-sm transition-all ${selectedSlot ? 'bg-primary text-white hover:bg-primary/90' : 'bg-surface-container text-on-surface-variant cursor-not-allowed'}`}
                >
                  {selectedSlot ? `Confirm ${selectedSlot} Visit` : 'Select a Slot First'}
                </button>
              </>
            ) : (
              <div className="text-center py-3 sm:py-4 space-y-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <p className="font-bold text-on-surface">Visit Confirmed!</p>
                <p className="text-xs text-on-surface-variant">
                  Your slot at <strong>{selectedSlot}</strong> has been reserved. Our team will call you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => { setBooked(false); setSelectedSlot(null); }}
                  className="text-xs text-primary hover:underline"
                >
                  Change Slot
                </button>
              </div>
            )}
          </div>

          {/* Note */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-xs text-primary font-mono leading-relaxed">
            ✦ Walk-in visits are welcome, but slot bookings get priority entry, a dedicated consultant, and a complimentary design consultation report.
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Work Detail Page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function WorkSlugPage({ workId, onBack }: { workId: string; onBack: () => void }) {
  const work = portfolioWorks.find(w => w.id === workId)!;
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  return (
    <div className="animate-fade-in text-on-surface mt-14">
      {lightboxOpen && (
        <Lightbox
          images={work.gallery}
          activeIdx={lightboxIdx}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIdx(i => (i - 1 + work.gallery.length) % work.gallery.length)}
          onNext={() => setLightboxIdx(i => (i + 1) % work.gallery.length)}
        />
      )}

      {/* Back */}
      <div className="px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 max-w-7xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </button>
      </div>

      {/* Hero */}
      <section className="relative h-[45vh] sm:h-[55vh] md:h-[65vh] mt-4 sm:mt-6 mx-3 sm:mx-6 md:mx-12 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
        <img src={work.heroImg} alt={work.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12 text-white space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className={`${categoryColors[work.category] || 'bg-primary'} text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full`}>
              {work.category}
            </span>
            <span className="text-white/60 text-xs font-mono">{work.year}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">{work.title}</h1>
          <div className="flex items-center gap-3 sm:gap-5 text-white/80 text-[10px] sm:text-xs font-mono flex-wrap">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />{work.location}</span>
            <span className="flex items-center gap-1"><Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />{work.area}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />{work.year}</span>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="mx-3 sm:mx-6 md:mx-12 mt-4 sm:mt-6 relative z-10">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-outline-variant/20 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-outline-variant/20">
          {work.stats.map((stat, i) => (
            <div key={i} className="p-3 sm:p-5 text-center">
              <div className="font-display text-lg sm:text-xl md:text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-on-surface-variant font-mono mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main content */}
      <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">

        {/* Left column */}
        <div className="lg:col-span-2 space-y-10 sm:space-y-12">

          {/* Brief */}
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">PROJECT BRIEF</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold">The Full Story</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">{work.longDesc}</p>
          </div>

          {/* Gallery */}
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">PROJECT GALLERY</span>
            <div
              className="relative h-56 sm:h-72 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => { setLightboxIdx(activeGalleryIdx); setLightboxOpen(true); }}
            >
              <img
                src={work.gallery[activeGalleryIdx].url}
                alt={work.gallery[activeGalleryIdx].caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white font-semibold text-xs sm:text-sm">
                {work.gallery[activeGalleryIdx].caption}
              </p>
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/20 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full">
                Click to expand
              </div>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 sm:gap-2">
              {work.gallery.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setActiveGalleryIdx(i)}
                  className={`relative h-14 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${activeGalleryIdx === i ? 'border-primary scale-95' : 'border-transparent hover:border-primary/40'}`}
                >
                  <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">WHAT WAS INSTALLED</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {work.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 sm:gap-3 p-3 bg-surface-container-low rounded-lg sm:rounded-xl border border-outline-variant/20">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm text-on-surface font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          {work.testimonial && (
            <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-primary/20">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary/20 absolute top-4 sm:top-6 right-4 sm:right-6" />
              <p className="text-sm sm:text-base text-on-surface italic leading-relaxed font-medium mb-4 sm:mb-5">
                "{work.testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {work.testimonial.author[0]}
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface">{work.testimonial.author}</p>
                  <p className="text-xs text-on-surface-variant">{work.testimonial.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Awards */}
          {work.awards && work.awards.length > 0 && (
            <div className="space-y-3 sm:space-y-4">
              <span className="text-xs font-bold text-primary tracking-widest uppercase font-mono">AWARDS & RECOGNITION</span>
              <div className="space-y-2 sm:space-y-3">
                {work.awards.map((award, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-amber-900">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4 sm:space-y-6">

          {/* Project meta */}
          <div className="bg-surface-container-low rounded-xl sm:rounded-2xl border border-outline-variant/20 p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h3 className="font-display font-bold text-base sm:text-lg">Project Details</h3>
            <div className="space-y-0 text-sm divide-y divide-outline-variant/20">
              {[
                { label: 'Location', value: work.location, icon: <MapPin className="w-4 h-4" /> },
                { label: 'Total Area', value: work.area, icon: <Layers className="w-4 h-4" /> },
                { label: 'Completed', value: work.year, icon: <Calendar className="w-4 h-4" /> },
                { label: 'Client', value: work.client, icon: <Users className="w-4 h-4" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="text-primary mt-0.5 shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-on-surface-variant">{item.label}</p>
                    <p className="font-semibold text-on-surface text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-outline-variant/20 p-4 sm:p-6 space-y-3 sm:space-y-4 shadow-sm">
            <h3 className="font-display font-bold text-base sm:text-lg">Technology Used</h3>
            <div className="space-y-1.5 sm:space-y-2">
              {work.techStack.map((tech, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono text-on-surface bg-surface-container-low px-3 py-2 rounded-lg border border-outline-variant/20">
                  <Zap className="w-3 h-3 text-primary shrink-0" /> {tech}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 text-white">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary-fixed" />
            <h3 className="font-display font-bold text-base sm:text-lg">Start Your Project</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Want a similar installation? Our consultants are ready to design your custom smart space.
            </p>
            <button
              type="button"
              className="w-full bg-white text-primary font-bold text-sm py-2.5 sm:py-3 rounded-xl hover:bg-primary-fixed transition-colors"
            >
              Request a Consultation
            </button>
          </div>

          {/* Warranty */}
          <div className="flex items-start gap-3 text-xs text-on-surface-variant p-3 sm:p-4 bg-surface-container-low rounded-xl border border-outline-variant/20">
            <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p>All installations come with a 5-year hardware warranty and lifetime Homeasy OS software support.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN: AuraPortfolio
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function AuraPortfolio() {
  const [view, setView] = useState<SlugView>(null);
  const [selectedStudio, setSelectedStudio] = useState<string>('mumbai');
  const [filter, setFilter] = useState<string>('all');

  // 🔄 Auto-rotating hero featured project
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [secondaryIdx, setSecondaryIdx] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setFeaturedIdx(prev => (prev + 1) % portfolioWorks.length);
      setSecondaryIdx(prev => (prev + 2) % portfolioWorks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  if (view?.type === 'studio') return <StudioSlugPage studioId={view.id} onBack={() => setView(null)} />;
  if (view?.type === 'work') return <WorkSlugPage workId={view.id} onBack={() => setView(null)} />;

  const currentStudio = studiosData.find(s => s.id === selectedStudio) ?? studiosData[0];
  const filteredWorks: PortfolioWork[] = filter === 'all' ? portfolioWorks : portfolioWorks.filter(w => w.category === filter);
  const marqueePartners = [...PARTNERS, ...PARTNERS];

  return (
    <div className="animate-fade-in text-on-surface overflow-x-hidden pt-10 sm:pt-14 md:pt-18">

      {/* ── Hero — Auto-Rotating Showcase ── */}
      <section
        className="relative min-h-[85vh] sm:min-h-[90vh] px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16 overflow-hidden mx-3 sm:mx-4 my-3 sm:my-4 rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-[#0a1f1a] via-[#0d2b22] to-[#051512]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >

        {/* Decorative grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #8bf7cf 1px, transparent 1px), linear-gradient(to bottom, #8bf7cf 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Glowing orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#00694f] rounded-full blur-[120px] opacity-40 pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#8bf7cf] rounded-full blur-[140px] opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto h-full grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">

          {/* LEFT — Content with rotating featured info */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 md:space-y-8 text-white pt-6 sm:pt-10 lg:pt-0">

            {/* Live badge with rotation indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 backdrop-blur-md border border-[#8bf7cf]/20">
              <span className="relative flex h-2 w-2">
                <span className={`${!isPaused ? 'animate-ping' : ''} absolute inline-flex h-full w-full rounded-full bg-[#8bf7cf] opacity-75`}></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8bf7cf]"></span>
              </span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#8bf7cf]">
                {isPaused ? 'Paused' : 'Live'} • {featuredIdx + 1}/{portfolioWorks.length} Showcasing
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                Where Code Meets
                <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#8bf7cf] via-[#5ee3b5] to-[#00694f] bg-clip-text text-transparent">
                  Craftsmanship
                </span>
              </h1>

              {/* Dynamic description — changes with featured project */}
              <div key={featuredIdx} className="animate-fade-in">
                <p className="font-sans text-sm sm:text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
                  {portfolioWorks[featuredIdx]?.desc.slice(0, 160)}...
                </p>
              </div>
            </div>

            {/* CTA Row */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('portfolio-grid');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="group relative px-5 sm:px-7 py-3 sm:py-3.5 bg-[#8bf7cf] text-[#0a1f1a] rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-xl shadow-[#8bf7cf]/20"
              >
                Explore Portfolio
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('immersion-portals');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="px-5 sm:px-7 py-3 sm:py-3.5 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Visit Studio
              </button>
            </div>

            {/* Stats Row — Dynamic from data */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10">
              <div>
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#8bf7cf]">
                  {portfolioWorks.length}+
                </p>
                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50 mt-1">
                  Installations
                </p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#8bf7cf]">
                  {studiosData.length}
                </p>
                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50 mt-1">
                  Studios
                </p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#8bf7cf]">
                  {new Set(portfolioWorks.map(w => w.category)).size}
                </p>
                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50 mt-1">
                  Categories
                </p>
              </div>
            </div>

            {/* Rotation dots indicator */}
            <div className="flex items-center gap-1.5 pt-2">
              {portfolioWorks.slice(0, Math.min(portfolioWorks.length, 8)).map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    setFeaturedIdx(i);
                    setSecondaryIdx((i + 1) % portfolioWorks.length);
                  }}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    featuredIdx === i
                      ? 'w-8 bg-[#8bf7cf]'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`View project ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Auto-Rotating Image Collage */}
<div className="lg:col-span-6 relative h-[320px] sm:h-[420px] md:h-[500px] lg:h-[600px] mt-2 lg:mt-0">

  {/* Main featured image — Now on LEFT, BEHIND */}
  {portfolioWorks[featuredIdx] && (
    <div
      key={`main-${featuredIdx}`}
      onClick={() => setView({ type: 'work', id: portfolioWorks[featuredIdx].id })}
      className="absolute top-0 left-2 w-[75%] h-[70%] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group cursor-pointer animate-fade-in z-10"
    >
      <img
        src={portfolioWorks[featuredIdx].heroImg}
        alt={portfolioWorks[featuredIdx].title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Award badge if exists */}
      {portfolioWorks[featuredIdx].awards && portfolioWorks[featuredIdx].awards!.length > 0 && (
        <div className="absolute top-5 sm:top-4 right-2 sm:right-4 bg-amber-500 text-white p-1.5 sm:p-2 rounded-full shadow-lg animate-pulse">
          <Award className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
      )}

      {/* Category badge */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
        <span className={`${categoryColors[portfolioWorks[featuredIdx].category] || 'bg-primary'} text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg`}>
          {portfolioWorks[featuredIdx].category}
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8bf7cf] font-bold block mb-1">
          Featured Project
        </span>
        <p className="font-display text-white text-sm sm:text-base md:text-lg font-bold leading-tight mb-1">
          {portfolioWorks[featuredIdx].title}
        </p>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <p className="font-mono text-[9px] sm:text-[10px] text-white/60 flex items-center gap-1">
            <MapPin className="w-3 h-3 shrink-0" /> {portfolioWorks[featuredIdx].location}
          </p>
          <p className="font-mono text-[9px] sm:text-[10px] text-white/50">
            {portfolioWorks[featuredIdx].year}
          </p>
          <p className="font-mono text-[9px] sm:text-[10px] text-white/50">
            {portfolioWorks[featuredIdx].area}
          </p>
        </div>
      </div>

      {/* Progress bar at bottom */}
      {/* {!isPaused && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            key={`progress-${featuredIdx}`}
            className="h-full bg-[#8bf7cf]"
            style={{ animation: 'progress 4s linear' }}
          />
        </div>
      )} */}
    </div>
  )}

  {/* Secondary image — Now on RIGHT, FRONT */}
  {portfolioWorks[secondaryIdx] && (
    <div
      key={`secondary-${secondaryIdx}`}
      onClick={() => setView({ type: 'work', id: portfolioWorks[secondaryIdx].id })}
      className="absolute bottom-0 right-0 w-[55%] h-[50%] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border-2 sm:border-4 border-[#0a1f1a] group cursor-pointer animate-fade-in z-30"
    >
      <img
        src={portfolioWorks[secondaryIdx].heroImg}
        alt={portfolioWorks[secondaryIdx].title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-3 left-3 right-3">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#8bf7cf] font-bold block">
          {portfolioWorks[secondaryIdx].category}
        </span>
        <p className="font-display text-white text-xs sm:text-sm font-bold leading-tight">
          {portfolioWorks[secondaryIdx].title}
        </p>
      </div>
    </div>
  )}

  {/* Floating badge — Award winners count (moved to RIGHT side now) */}
  <div className="hidden sm:flex absolute top-6 right-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 sm:p-4 shadow-2xl items-center gap-3 hover:scale-105 transition-transform cursor-default z-20">
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
      <Award className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="font-display text-white text-sm font-bold leading-tight">
        {portfolioWorks.filter(w => w.awards && w.awards.length > 0).length} Awards
      </p>
      <p className="font-mono text-[9px] uppercase text-white/60 tracking-wider">Recognized Work</p>
    </div>
  </div>

  {/* Floating badge — Studio count (moved to LEFT side now) */}
  <div className="hidden md:flex absolute bottom-12 left-0 bg-[#8bf7cf]/95 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-2xl items-center gap-3 hover:scale-105 transition-transform cursor-default z-20">
    <div className="w-10 h-10 rounded-xl bg-[#0a1f1a] flex items-center justify-center">
      <span className="font-display text-[#8bf7cf] text-lg font-bold">
        {studiosData.length}
      </span>
    </div>
    <div>
      <p className="font-display text-[#0a1f1a] text-sm font-bold leading-tight">
        Live Studios
      </p>
      <p className="font-mono text-[9px] uppercase text-[#0a1f1a]/70 tracking-wider">
        India Wide
      </p>
    </div>
  </div>
</div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
          <span className="w-8 h-px bg-white/40"></span>
          {isPaused ? 'Hover to pause • Click to view' : 'Auto-rotating every 4s'}
          <span className="w-8 h-px bg-white/40"></span>
        </div>
      </section>

      {/* ── Network Section ── */}
      <section className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <span className="text-xs font-bold text-primary tracking-widest uppercase">28+ STATES ALIGNED</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface">
                Omnipresent Architectural Network
              </h2>
              <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
                From luxury beach villas in Alibaug to the high-key technical penthouses of Delhi and tech corridors in Bengaluru, our systems elevate India's premier addresses.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4">
              {STATE_LIST.map((state, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary shrink-0" />
                  <span className="font-sans text-xs sm:text-sm font-semibold text-on-surface">{state}</span>
                </div>
              ))}
            </div>
            <div className="p-3 sm:p-4 bg-primary/10 rounded-xl sm:rounded-2xl border border-primary/20 text-xs text-primary font-mono leading-relaxed">
              * Note: We support fully authorized regional concierge backup teams in over 18 state capitals. Complete security, zero wait times.
            </div>
          </div>

          <div className="glass-card rounded-2xl sm:rounded-[2.5rem] p-3 sm:p-4 aspect-square flex items-center justify-center border border-outline-variant/30 relative group overflow-hidden max-w-md mx-auto w-full lg:max-w-none">
            <img
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              src={MAP_IMG}
              alt="India Network Map"
            />
          </div>
        </div>
      </section>

      {/* ── Immersion Portals ── */}
      <section id="immersion-portals" className="py-14 sm:py-20 md:py-24 bg-surface-container-low border-y border-outline-variant/30">
        <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 sm:mb-14 md:mb-16 gap-6 sm:gap-8">
            <div className="max-w-2xl space-y-3 sm:space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">IMMERSION PORTALS</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Experience the Future Studio
              </h2>
              <p className="font-sans text-sm sm:text-base text-on-surface-variant">
                Walk in for an atmospheric preset review. Use selector switches below to view live address parameters and internal studio features.
              </p>
            </div>
            {/* Studio selector tabs — scroll on mobile */}
            <div className="flex gap-1.5 sm:gap-2 bg-surface p-1 border rounded-xl sm:rounded-2xl overflow-x-auto max-w-full shrink-0 scrollbar-none">
              {studiosData.map(s => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setSelectedStudio(s.id)}
                  className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs uppercase transition-colors whitespace-nowrap ${selectedStudio === s.id ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  {s.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Active studio card */}
          <div className="bg-white rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-outline-variant/30 p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center shadow-xl animate-fade-in">

            {/* Image */}
            <div className="lg:col-span-7 h-56 sm:h-72 md:h-96 overflow-hidden rounded-xl sm:rounded-2xl relative">
              <img
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                src={currentStudio.heroImg}
                alt={currentStudio.name}
              />
              <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-primary text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-md">
                {currentStudio.badge}
              </span>
              {/* Stats overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm rounded-b-xl sm:rounded-b-2xl grid grid-cols-4 divide-x divide-white/10">
                {currentStudio.stats.map((stat, i) => (
                  <div key={i} className="py-2 sm:py-3 text-center">
                    <div className="text-white font-bold text-xs sm:text-sm font-display leading-tight">{stat.value}</div>
                    <div className="text-white/60 text-[8px] sm:text-[10px] font-mono mt-0.5 hidden sm:block">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <div className="space-y-1.5 sm:space-y-2">
                <span className="text-xs text-primary font-mono font-bold flex items-center gap-1.5 uppercase">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> {currentStudio.location}
                </span>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-on-surface">
                  {currentStudio.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium font-mono bg-surface-container-low px-2.5 sm:px-3 py-1.5 sm:py-2 rounded border inline-block">
                  {currentStudio.address}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{currentStudio.desc}</p>

              {/* Features preview */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                {currentStudio.features.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-on-surface bg-surface-container-low px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-outline-variant/20">
                    <span className="text-base shrink-0">{feat.icon}</span>
                    <span className="font-semibold truncate text-[10px] sm:text-xs">{feat.title}</span>
                  </div>
                ))}
              </div>

              {/* Speciality tags */}
              <div className="flex flex-wrap gap-1.5">
                {currentStudio.speciality.slice(0, 3).map((tag, i) => (
                  <span key={i} className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-mono">
                    <Sparkles className="w-2.5 h-2.5 shrink-0" /> {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-3 sm:pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 text-xs">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary shrink-0" /> {currentStudio.timings}
                </span>
                <button
                  type="button"
                  onClick={() => setView({ type: 'studio', id: currentStudio.id })}
                  className="text-primary font-bold hover:underline flex items-center gap-1"
                >
                  Explore Full Studio <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Studio mini-cards */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {studiosData.map(studio => (
              <button
                type="button"
                key={studio.id}
                onClick={() => setView({ type: 'studio', id: studio.id })}
                className={`group text-left rounded-xl sm:rounded-2xl border overflow-hidden transition-all bg-white ${selectedStudio === studio.id ? 'border-primary shadow-lg ring-1 ring-primary/30' : 'border-outline-variant/20 hover:border-primary/40 hover:shadow-md'}`}
              >
                <div className="h-28 sm:h-32 overflow-hidden relative">
                  <img src={studio.heroImg} alt={studio.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-2.5 left-2.5 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${getBadgeColor(studio.badge)}`}>
                    {studio.badge}
                  </span>
                </div>
                <div className="p-3 sm:p-4 flex justify-between items-center">
                  <div className="min-w-0">
                    <p className="font-bold text-xs sm:text-sm text-on-surface truncate">{studio.name}</p>
                    <p className="text-[9px] sm:text-[10px] text-on-surface-variant font-mono mt-0.5">
                      {studio.stats[1].value} &bull; {studio.stats[2].value}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${selectedStudio === studio.id ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio Revelation ── */}
      <section id="portfolio-grid" className="py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14 md:mb-16 space-y-3 sm:space-y-4">
          <span className="text-xs font-bold text-[#00694f] bg-primary-fixed-dim px-3 py-1.5 rounded-full inline-block uppercase font-mono">
            PORTFOLIO REVELATION
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Selected Installations
          </h2>
          <p className="font-sans text-sm sm:text-base text-on-surface-variant max-w-lg mx-auto">
            A selective archive of mansions, boardrooms, and boutique hotels running customizable Homeasy codes.
          </p>
          {/* Filter tabs — scroll on mobile */}
          <div className="flex gap-2 justify-start sm:justify-center pt-3 sm:pt-4 overflow-x-auto pb-1 scrollbar-none">
            {filterTabs.map(tab => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors border whitespace-nowrap flex-shrink-0 ${filter === tab.id ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface-variant hover:text-primary hover:border-primary border-outline-variant/30'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento grid — fixed spacing with dense flow + auto rows */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[220px] grid-flow-dense">
          {filteredWorks.map((work, index) => {
            // Dynamic span pattern for bento layout
            const patterns = [
              'col-span-2 row-span-2',           // Large hero
              'col-span-2 row-span-1',           // Wide
              'col-span-1 row-span-2',           // Tall
              'col-span-1 row-span-1',           // Standard
              'col-span-2 row-span-1',           // Wide
              'col-span-1 row-span-1',           // Standard
            ];
            const spanClass = patterns[index % patterns.length];

            return (
              <div
                key={work.id}
                onClick={() => setView({ type: 'work', id: work.id })}
                className={`group hover:shadow-xl transition-all duration-300 relative rounded-xl sm:rounded-[2rem] overflow-hidden cursor-pointer ${spanClass}`}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={work.heroImg}
                  alt={work.title}
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Award badge */}
                {work.awards && work.awards.length > 0 && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-amber-500 text-white p-1 sm:p-1.5 rounded-full shadow-lg">
                    <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                )}

                {/* Info overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-4 sm:p-6 text-white flex flex-col justify-end">
                  <span className="text-[9px] sm:text-[10px] text-primary-fixed uppercase tracking-widest font-bold mb-1 block">
                    {work.category.toUpperCase()}
                  </span>
                  <h4 className="font-display text-sm sm:text-base md:text-lg font-bold leading-tight">
                    {work.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-zinc-300 opacity-90">{work.tag}</p>

                  {/* Hover reveal */}
                  <div className="flex items-center gap-2 sm:gap-3 mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex-wrap">
                    <span className="text-[9px] sm:text-[10px] font-mono text-white/70 flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" /> {work.location}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-white/50">{work.year}</span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-white bg-white/20 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ml-auto">
                      View →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Partners Marquee ── */}
<section className="py-6 sm:py-6 border-t border-outline-variant/20 overflow-hidden bg-gradient-to-b from-surface-container-lowest to-surface-container-low relative">

  {/* Background decoration */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8bf7cf]/5 rounded-full blur-3xl" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">

    {/* Header */}
    <div className="text-center mb-2 sm:mb-2 space-y-3">
      <span className="inline-block text-[10px] sm:text-xs font-bold text-primary font-mono uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full">
        ✓ Trusted Partners
      </span>
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface leading-tight">
        Powering India's Leading Real Estate
      </h2>
      <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto">
        Integrated into premium properties across India's top developers and builders
      </p>
    </div>

    {/* Marquee Container */}
    <div className="relative overflow-hidden">
      {/* Fade edges - left */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest to-transparent z-20 pointer-events-none" />
      
      {/* Fade edges - right */}
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-surface-container-lowest via-surface-container-lowest to-transparent z-20 pointer-events-none" />

      {/* Animated logos scroll */}
      <div className="flex gap-2 sm:gap-4 md:gap-5 animate-scroll py-2 sm:py-4">
        {/* First set */}
        {marqueePartners.map((partner, idx) => (
          <div
            key={`partner-1-${idx}`}
            className="flex items-center justify-center shrink-0"
          >
            <div className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-outline-variant/20 bg-white/20 backdrop-blur-sm hover:bg-white/40 hover:border-primary/40 transition-all duration-300 cursor-pointer">
              <span className="font-display text-sm sm:text-base md:text-lg font-bold text-on-surface hover:text-primary transition-colors whitespace-nowrap">
                {partner}
              </span>
            </div>
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {marqueePartners.map((partner, idx) => (
          <div
            key={`partner-2-${idx}`}
            className="flex items-center justify-center shrink-0"
          >
            <div className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-outline-variant/20 bg-white/20 backdrop-blur-sm hover:bg-white/40 hover:border-primary/40 transition-all duration-300 cursor-pointer">
              <span className="font-display text-sm sm:text-base md:text-lg font-bold text-on-surface hover:text-primary transition-colors whitespace-nowrap">
                {partner}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Stats below */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-2 sm:mt-2 border-t border-outline-variant/20">
      {[
        { value: '500+', label: 'Projects' },
        { value: '2.5M+', label: 'Properties' },
        { value: '28', label: 'States' },
        { value: '99.9%', label: 'Uptime' },
      ].map((stat) => (
        <div key={stat.label} className="text-center space-y-2 p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
          <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
          <p className="text-[10px] sm:text-xs text-on-surface-variant font-medium">{stat.label}</p>
        </div>
      ))}
    </div>

  </div>

  {/* Scroll indicator (mobile only) */}
  <div className="flex items-center justify-center gap-1.5 mt-4 sm:mt-4 md:hidden px-4">
    <span className="text-[9px] text-on-surface-variant font-mono tracking-widest">SCROLL</span>
    <div className="flex gap-1">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-1 h-1 rounded-full bg-primary animate-pulse"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
</section>
    </div>
  );
}