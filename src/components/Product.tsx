// components/Products.tsx
import { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ArrowLeft,
  Check,
  Phone,
  X,
  ChevronDown,
  ChevronUp,
  Download,
  ArrowRight,
  Box,
  BookOpen,
  FileText,
  Video,
  Settings,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Wifi,
  Zap,
  Smartphone,
  Star,
  Heart,
  Share2,
  Package,
  Truck,
  Shield,
  Search as SearchIcon
} from 'lucide-react';
import {
  productsData,
  productCategories,
  productPageContent,
  type Product,
  type ProductCategory
} from '../data/product';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={`shrink-0 ${i <= Math.floor(rating) ? 'text-amber-400 fill-amber-400' : i - 0.5 <= rating ? 'text-amber-400 fill-amber-400/50' : 'text-zinc-300'}`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}

function getBadgeStyle(badge?: string): string {
  if (!badge) return 'bg-green-600 text-white';
  if (badge.includes('BEST') || badge.includes('TOP')) return 'bg-amber-600 text-white';
  if (badge.includes('NEW')) return 'bg-emerald-600 text-white';
  if (badge.includes('SAFETY')) return 'bg-red-600 text-white';
  if (badge.includes('CORE')) return 'bg-purple-600 text-white';
  if (badge.includes('EDITOR')) return 'bg-sky-600 text-white';
  if (badge.includes('SMART')) return 'bg-indigo-600 text-white';
  if (badge.includes('ESSENTIAL')) return 'bg-cyan-600 text-white';
  return 'bg-green-600 text-white';
}

// ─── Image Lightbox ───────────────────────────────────────────────────────────

function Lightbox({
  images,
  activeIdx,
  onClose,
  onPrev,
  onNext
}: {
  images: { url: string; caption: string }[];
  activeIdx: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
      <button
                  type="button" 
        onClick={onClose} 
        className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300 hover:scale-110"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>
      
      <button
                  type="button" 
        onClick={onPrev} 
        className="absolute left-4 md:left-8 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300 hover:scale-110"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <div className="max-w-5xl w-full space-y-4">
        <img 
          src={images[activeIdx].url} 
          alt={images[activeIdx].caption} 
          className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
        />
        <div className="text-center">
          <p className="text-white/80 text-sm font-mono">{images[activeIdx].caption}</p>
          <p className="text-white/60 text-xs mt-1">{activeIdx + 1} / {images.length}</p>
        </div>
      </div>
      
      <button
                  type="button" 
        onClick={onNext} 
        className="absolute right-4 md:right-8 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300 hover:scale-110"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PRODUCT DETAIL PAGE (INFORMATION ONLY - NO PRICING)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ProductDetailPage({ productId, onBack, onNavigate }: {
  productId: string;
  onBack: () => void;
  onNavigate: (id: string) => void;
}) {
  const product = productsData.find(p => p.id === productId)!;
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'tech' | 'install' | 'reviews'>('overview');
  const [expandedSpec, setExpandedSpec] = useState<number | null>(null);
  const [wishlisted, setWishlisted] = useState(false);

  const categoryInfo = productCategories.find(c => c.id === product.category);
  const relatedProducts = productsData.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const openLB = (idx: number) => { setLightboxIdx(idx); setLightboxOpen(true); };

  return (
    <div className="animate-fade-in text-gray-900 pt-20 md:pt-24">
      {lightboxOpen && (
        <Lightbox
          images={product.gallery}
          activeIdx={lightboxIdx}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIdx(i => (i - 1 + product.gallery.length) % product.gallery.length)}
          onNext={() => setLightboxIdx(i => (i + 1) % product.gallery.length)}
        />
      )}

      {/* ── Sticky Header Navigation ─────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 md:px-12 py-3 max-w-7xl mx-auto flex items-center justify-between">
          <button
                  type="button" 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="text-gray-400">|</span>
            <span>{categoryInfo?.label}</span>
            <span className="text-gray-400">|</span>
            <span className="font-semibold text-gray-900 max-w-[200px] truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ── Main Content Section ─────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 md:px-12 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* GALLERY SECTION (LEFT) */}
          {/* ═══════════════════════════════════════════════════════════════ */}

          <div className="lg:col-span-1 space-y-4">
            
            {/* Main Image Display */}
            <div
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 cursor-pointer group border-2 border-gray-200 hover:border-green-400 transition-all"
              onClick={() => openLB(activeImg)}
            >
              <img 
                src={product.gallery[activeImg].url} 
                alt={product.gallery[activeImg].caption} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              
              {/* Badge */}
              {product.badge && (
                <span className={`absolute top-4 left-4 ${getBadgeStyle(product.badge)} text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg`}>
                  {product.badge}
                </span>
              )}
              
              {/* Wishlist Button */}
              <button
                  type="button" 
                onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }} 
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${wishlisted ? 'bg-red-500 text-white scale-110' : 'bg-white/80 text-gray-600 hover:bg-white'}`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-white' : ''}`} />
              </button>

              {/* Click to Expand Hint */}
              <div className="absolute bottom-4 right-4 bg-white rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-4 h-4 text-green-600" />
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-2">
              {product.gallery.map((img, i) => (
                <button
                  type="button" 
                  key={i} 
                  onClick={() => setActiveImg(i)} 
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? 'border-green-600 ring-2 ring-green-300' : 'border-gray-200 hover:border-green-400'}`}
                >
                  <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Image Caption */}
            <div className="text-xs text-gray-600 italic">
              {product.gallery[activeImg].caption}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* PRODUCT INFO SECTION (RIGHT - 2 COLUMNS) */}
          {/* ═══════════════════════════════════════════════════════════════ */}

          <div className="lg:col-span-2 space-y-6">
            
            {/* Category & Title */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                {/* <span className="text-2xl">{categoryInfo?.icon}</span> */}
                <span className="text-xs font-bold text-green-600 tracking-widest uppercase font-mono">
                  {categoryInfo?.label}
                </span>
                {product.isBestseller && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">🏆 Bestseller</span>
                )}
                {product.isNew && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">✨ New</span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-600 italic font-semibold">{product.tagline}</p>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 flex-wrap bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} size={16} />
                <span className="text-lg font-bold text-gray-900">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-600 border-l border-green-300 pl-4">
                {product.reviewCount.toLocaleString()} customer reviews
              </span>
            </div>

            {/* Short Description */}
            <div className="bg-gradient-to-br from-green-50 to-indigo-50 border-l-4 border-green-600 p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold text-green-900">Product Summary</p>
              <p className="text-sm text-gray-700 leading-relaxed">{product.shortDesc}</p>
            </div>

            {/* Key Information Boxes */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-400 transition-colors">
                <Package className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Installation</p>
                  <p className="text-xs text-gray-600 mt-1">{product.installationType.split('—')[0]}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-400 transition-colors">
                <Shield className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Warranty</p>
                  <p className="text-xs text-gray-600 mt-1">{product.warranty.split('+')[0].trim()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-400 transition-colors">
                <Truck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Delivery</p>
                  <p className="text-xs text-gray-600 mt-1">Pan-India Service</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-400 transition-colors">
                <Phone className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Support</p>
                  <p className="text-xs text-gray-600 mt-1">24/7 Available</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                  type="button" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                Download Brochure
              </button>
              <button
                  type="button" className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-green-600 hover:text-green-600 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── Information Tabs ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-16 border-t border-gray-200">
        
        {/* Tab Navigation */}
        <div className="flex gap-1 overflow-x-auto -mx-4 sm:-mx-6 md:-mx-12 px-4 sm:px-6 md:px-12 mt-0 mb-0 bg-gray-50 sticky top-[88px] z-30">
          {([
            { key: 'overview', label: '📋 Overview', icon: BookOpen },
            { key: 'specs', label: '⚙️ Specifications', icon: Settings },
            { key: 'tech', label: '🔬 How It Works', icon: Zap },
            { key: 'install', label: '📖 Installation', icon: FileText },
            { key: 'reviews', label: `⭐ Reviews`, icon: Star }
          ] as const).map(tab => (
            <button
                  type="button"
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-4 text-sm font-bold whitespace-nowrap border-b-4 transition-all ${
                activeTab === tab.key 
                  ? 'border-green-600 text-green-600 bg-white' 
                  : 'border-transparent text-gray-600 hover:text-green-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB 1: OVERVIEW & FEATURES */}
        {/* ═══════════════════════════════════════════════════════════════ */}

        {activeTab === 'overview' && (
          <div className="space-y-12 animate-fade-in py-8">
            
            {/* Product Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Product Overview</h2>
              <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                {product.longDesc}
              </p>
            </div>

            {/* Features Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-green-600" />
                Key Features & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.features.map((f, i) => (
                  <div 
                    key={i} 
                    className="p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-green-400 hover:shadow-lg transition-all space-y-3 group"
                  >
                    <div className="flex items-start justify-between">
                      {/* <span className="text-3xl">{f.icon}</span> */}
                      <span className="text-green-600 text-lg opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 group-hover:text-green-600 transition-colors">{f.title}</h4>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's in the Box */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Box className="w-5 h-5 text-green-600" />
                Package Contents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-green-50 p-6 rounded-xl border-2 border-green-200">
                {product.inBox.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-green-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {product.faqs.map((faq, i) => (
                  <div key={i} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-green-400 transition-colors">
                    <button
                  type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-green-50 transition-colors"
                    >
                      <span className="font-semibold text-sm text-gray-900 pr-4">{faq.question}</span>
                      {openFaq === i ? (
                        <ChevronUp className="w-5 h-5 text-green-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                      )}
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed bg-gray-50 animate-fade-in border-t border-gray-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB 2: SPECIFICATIONS */}
        {/* ═══════════════════════════════════════════════════════════════ */}

        {activeTab === 'specs' && (
          <div className="animate-fade-in py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
            <div className="space-y-0 bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className={`border-b border-gray-200 last:border-b-0 transition-all ${
                    expandedSpec === i ? 'bg-green-50' : i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <button
                  type="button"
                    onClick={() => setExpandedSpec(expandedSpec === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-green-50 transition-all"
                  >
                    <div className="flex-1">
                      <p className="font-bold text-sm text-gray-900">{spec.label}</p>
                      {expandedSpec !== i && (
                        <p className="text-xs text-gray-600 mt-1 hidden sm:block">{spec.value}</p>
                      )}
                    </div>
                    {expandedSpec === i ? (
                      <ChevronUp className="w-5 h-5 text-green-600 shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-4" />
                    )}
                  </button>
                  {expandedSpec === i && (
                    <div className="px-6 pb-4 text-sm text-gray-700 bg-green-50">
                      {spec.value}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Additional Support Info */}
            <div className="mt-6 p-6 bg-emerald-50 rounded-xl border-2 border-emerald-200 space-y-3">
              <p className="text-sm font-bold text-emerald-900 uppercase tracking-wider">Installation & Support Details</p>
              <p className="text-sm text-emerald-800 leading-relaxed">{product.installationType}</p>
              <div className="text-xs text-emerald-700 font-mono bg-white px-3 py-2 rounded border border-emerald-300 mt-2">
                Warranty: {product.warranty}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB 3: HOW IT WORKS / TECHNOLOGY */}
        {/* ═══════════════════════════════════════════════════════════════ */}

        {activeTab === 'tech' && (
          <div className="animate-fade-in py-8 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">How It Works & Technology</h2>

            {/* Technology Overview */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                Advanced Technology Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.slice(0, 6).map((f, i) => (
                  <div key={i} className="bg-gradient-to-br from-green-50 to-indigo-50 p-5 rounded-lg border-2 border-green-200 space-y-2 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-2">
                      {/* <span className="text-2xl">{f.icon}</span> */}
                      <p className="font-bold text-sm text-gray-900 flex-1">{f.title}</p>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compatibility */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-green-600" />
                Compatibility & Integration
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {product.compatibility.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border-2 border-green-200 px-4 py-3 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                    <span className="text-xs font-bold text-gray-900">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Explanation */}
            <div className="bg-indigo-50 border-2 border-indigo-200 p-6 rounded-xl space-y-3">
              <h4 className="font-bold text-gray-900">Understanding the Technology</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                This product uses advanced wireless mesh networking technology to communicate with other devices in your home. 
                Data is encrypted using military-grade AES encryption, and all operations can run locally without internet connection. 
                Automatic updates keep the device secure and add new features over time.
              </p>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB 4: INSTALLATION & SETUP */}
        {/* ═══════════════════════════════════════════════════════════════ */}

        {activeTab === 'install' && (
          <div className="animate-fade-in py-8 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Installation & Setup Guide</h2>

            {/* Installation Overview */}
            <div className="bg-emerald-50 border-2 border-emerald-300 p-6 rounded-xl space-y-3">
              <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Installation Information
              </h3>
              <p className="text-sm text-emerald-800 leading-relaxed">
                {product.installationType}
              </p>
              <div className="text-xs text-emerald-700 font-mono bg-white px-3 py-2 rounded border border-emerald-300 mt-2">
                ⚡ {product.warranty}
              </div>
            </div>

            {/* Setup Steps */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Setup Process</h3>
              <div className="space-y-3">
                {[
                  { step: 1, title: 'Unbox & Inspect', desc: 'Open the package and verify all components match the checklist.' },
                  { step: 2, title: 'Read Documentation', desc: 'Review the quick start guide and safety instructions carefully.' },
                  { step: 3, title: 'Prepare Installation', desc: 'Gather necessary tools and plan the installation location.' },
                  { step: 4, title: 'Install the Device', desc: 'Follow step-by-step instructions for mounting and wiring.' },
                  { step: 5, title: 'Configure Settings', desc: 'Power on and configure through app or control panel.' },
                  { step: 6, title: 'Test & Verify', desc: 'Test all functions to ensure proper operation.' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-green-400 transition-colors">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Resources */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Available Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: FileText, title: 'User Manual', desc: 'Comprehensive PDF guide', href: null },
                  { icon: Video, title: 'Video Tutorial', desc: 'Step-by-step video guide', href: null },
                  { icon: Settings, title: 'Configuration', desc: 'Advanced setup options', href: null },
                  { icon: Phone, title: 'Support Contact', desc: '24/7 Customer support', href: 'tel:+918765432100' }
                ].map((resource, i) => {
                  const Icon = resource.icon;
                  const isDisabled = !resource.href;
                  return isDisabled ? (
                    <div
                      key={i}
                      title="Coming soon"
                      className="p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center gap-4 cursor-not-allowed opacity-60"
                    >
                      <Icon className="w-6 h-6 text-gray-400 shrink-0" />
                      <div>
                        <p className="font-bold text-sm text-gray-500">{resource.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Coming soon</p>
                      </div>
                    </div>
                  ) : (
                    <a
                      key={i}
                      href={resource.href!}
                      className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-600 hover:shadow-md transition-all flex items-center gap-4 group"
                    >
                      <Icon className="w-6 h-6 text-green-600 shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="font-bold text-sm text-gray-900 group-hover:text-green-600 transition-colors">{resource.title}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{resource.desc}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Safety Warning */}
            <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl">
              <p className="text-xs font-bold text-yellow-900 uppercase tracking-wider">⚠️ Safety Precautions</p>
              <ul className="text-sm text-yellow-800 mt-3 space-y-2 list-disc list-inside leading-relaxed">
                <li>Ensure power supply is switched off before installation</li>
                <li>Use qualified electrician for complex installations</li>
                <li>Follow all local electrical codes and regulations</li>
                <li>Do not expose device to water unless rated IP65 or higher</li>
                <li>Keep away from extreme heat or cold</li>
              </ul>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB 5: CUSTOMER REVIEWS */}
        {/* ═══════════════════════════════════════════════════════════════ */}

        {activeTab === 'reviews' && (
          <div className="animate-fade-in py-8 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews & Feedback</h2>

            {/* Rating Summary */}
            <div className="bg-gradient-to-br from-green-50 to-indigo-50 p-8 rounded-xl border-2 border-green-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                
                {/* Overall Rating */}
                <div className="text-center sm:border-r border-green-300 sm:pr-8">
                  <div className="text-6xl font-bold text-green-600">{product.rating}</div>
                  <div className="mt-3 flex justify-center">
                    <StarRating rating={product.rating} size={22} />
                  </div>
                  <p className="text-xs text-gray-600 mt-2 font-semibold">{product.reviewCount.toLocaleString()} verified reviews</p>
                </div>

                {/* Rating Distribution */}
                <div className="sm:col-span-2 space-y-3">
                  {[5, 4, 3, 2, 1].map(star => {
                    const count = product.testimonials.filter(t => t.rating === star).length;
                    const pct = product.testimonials.length > 0 ? (count / product.testimonials.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1 w-14">
                          <span className="text-gray-700 font-bold">{star}</span>
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        </div>
                        <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-8 text-right text-gray-600 font-semibold">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">What Customers Say</h3>
              {product.testimonials.map((t, i) => (
                <div key={i} className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-green-400 hover:shadow-md transition-all space-y-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {t.author[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-900">{t.author}</p>
                        <p className="text-xs text-gray-600 mt-0.5 font-semibold">{t.role}</p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <StarRating rating={t.rating} size={14} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 italic leading-relaxed">"{t.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* ── Related Products Section ─────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-16 md:pb-24 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
            <button
                  type="button" onClick={onBack} className="text-sm font-bold text-green-600 hover:text-green-700 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(rp => (
              <button
                  type="button"
                key={rp.id}
                onClick={() => onNavigate(rp.id)}
                className="text-left bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-green-600 hover:shadow-xl transition-all group"
              >
                <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
                  <img 
                    src={rp.heroImg} 
                    alt={rp.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {rp.badge && (
                    <span className={`absolute top-3 left-3 ${getBadgeStyle(rp.badge)} text-[9px] font-bold uppercase px-2.5 py-1 rounded-lg`}>
                      {rp.badge}
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-[10px] font-bold text-green-600 uppercase font-mono">
                    {productCategories.find(c => c.id === rp.category)?.label}
                  </p>
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                    {rp.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{rp.shortDesc}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                    <StarRating rating={rp.rating} size={12} />
                    <span className="text-[10px] text-gray-600">({rp.reviewCount.toLocaleString()})</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Support CTA ────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 sm:p-12 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <h3 className="text-2xl font-bold">Have Questions About This Product?</h3>
            <p className="text-green-100 text-sm">
              Our expert support team is available 24/7 to help you with information, compatibility, and technical guidance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a 
              href="tel:+918765432100" 
              className="flex items-center justify-center gap-2 bg-white text-green-600 font-bold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Support
            </a>
            <button
                  type="button" 
              onClick={onBack}
              className="border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Back to Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN PRODUCTS LISTING PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Products() {
  const [view, setView] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (view) {
    return (
      <ProductDetailPage
        productId={view}
        onBack={() => setView(null)}
        onNavigate={(id) => { setView(id); window.scrollTo(0, 0); }}
      />
    );
  }

  const { hero, statsBar, categorySection, gridSection, trustBanner } = productPageContent;
  
  let filteredProducts = categoryFilter === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === categoryFilter);

  if (searchTerm.trim()) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="animate-fade-in text-gray-900">

      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-end pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 overflow-hidden rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 md:mx-12 shadow-xl mt-20 md:mt-24">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={hero.img} alt="Smart Home Products" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full text-white space-y-4">
          <span className="inline-flex items-center gap-2 text-emerald-300 tracking-widest text-xs uppercase font-bold bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm w-fit">
            <Sparkles className="w-4 h-4" />
            {hero.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl">
            {hero.heading}
          </h1>
          <p className="text-sm sm:text-base opacity-90 max-w-xl leading-relaxed">
            {hero.subheading}
          </p>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────────────── */}
      <section className="mx-3 sm:mx-4 md:mx-12 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
          {statsBar.map((s, i) => (
            <div key={i} className="p-4 sm:p-6 text-center hover:bg-green-50 transition-colors">
              <div className="text-2xl sm:text-3xl font-bold text-green-600">{s.value}</div>
              <div className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust Banner ───────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto py-8 sm:py-12">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {trustBanner.items.map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-semibold">
              <span className="text-lg sm:text-xl">{t.icon}</span>
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Search Bar ────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto mb-12">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name or feature..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-600 text-sm"
          />
        </div>
      </section>

      {/* ── Category Filter ────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-12">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-bold text-green-600 tracking-widest uppercase font-mono">{categorySection.badge}</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">{categorySection.heading}</h2>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">{categorySection.description}</p>
        </div>

        {/* Category Buttons */}
{/* Category Filters */}
<div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
  <div className="flex flex-wrap justify-center gap-2">
    
    <button
                  type="button"
      onClick={() => setCategoryFilter("all")}
      className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${
        categoryFilter === "all"
          ? "bg-green-50"
          : "hover:bg-green-50"
      }`}
    >
      {/* <span className="text-xl">📦</span> */}

      <span className="font-medium text-gray-900">
        All Products
      </span>

      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
        {productsData.length}
      </span>
    </button>

    {productCategories.map((cat) => {
      const count = productsData.filter(
        (p) => p.category === cat.id
      ).length;

      return (
        <button
                  type="button"
          key={cat.id}
          onClick={() =>
            setCategoryFilter(
              categoryFilter === cat.id ? "all" : cat.id
            )
          }
          className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
            categoryFilter === cat.id
              ? "bg-green-50"
              : "hover:bg-green-50"
          }`}
        >
          {/* <span className="text-xl">{cat.icon}</span> */}

          <span className="font-medium text-gray-900">
            {cat.label}
          </span>

          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
            {count}
          </span>
        </button>
      );
    })}
  </div>
</div>
      </section>

      {/* ── Product Grid ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {searchTerm ? `Search Results for "${searchTerm}"` : gridSection.heading}
          </h3>
          <p className="text-sm text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const catInfo = productCategories.find(c => c.id === product.category);

            return (
              <button
                  type="button"
                key={product.id}
                onClick={() => { setView(product.id); window.scrollTo(0, 0); }}
                className="text-left bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-green-600 hover:shadow-lg transition-all group flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
                  <img 
                    src={product.heroImg} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-500" 
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <span className={`absolute top-3 left-3 ${getBadgeStyle(product.badge)} text-[9px] font-bold uppercase px-2.5 py-1 rounded-lg shadow-md`}>
                      {product.badge}
                    </span>
                  )}

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-green-600/0 group-hover:bg-green-600/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 bg-white text-green-600 font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5">
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3 flex flex-col flex-1">
                  {/* Category */}
                  <p className="text-[10px] font-bold text-green-600 uppercase font-mono flex items-center gap-1">
                    {/* <span>{catInfo?.icon}</span> */}
                    {catInfo?.label}
                  </p>

                  {/* Name */}
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed flex-1">
                    {product.shortDesc}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                    <StarRating rating={product.rating} size={12} />
                    <span className="text-[10px] text-gray-600 font-semibold">({product.reviewCount.toLocaleString()})</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <div className="text-5xl">🔍</div>
            <p className="text-xl font-bold text-gray-900">No products found</p>
            <p className="text-sm text-gray-600">Try adjusting your search or category filter</p>
            <button
                  type="button" 
              onClick={() => { setSearchTerm(''); setCategoryFilter('all'); }}
              className="text-sm font-bold text-green-600 hover:text-green-700 underline"
            >
              Clear filters and view all products →
            </button>
          </div>
        )}
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 sm:p-12 rounded-2xl space-y-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold">Need Help Choosing the Right Product?</h3>
          <p className="text-sm sm:text-base text-green-100 max-w-lg mx-auto">
            Contact our expert team. They'll help you understand which product best fits your needs and provide complete technical information.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a 
              href="tel:+918765432100" 
              className="flex items-center gap-2 bg-white text-green-600 font-bold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors w-full sm:w-auto justify-center"
            >
              <Phone className="w-4 h-4" />
              Call Our Experts
            </a>
            <a 
              href="mailto:info@acis.com.vn" 
              className="border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
            >
              📧 Email Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}