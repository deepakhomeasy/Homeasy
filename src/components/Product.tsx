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
  Search as SearchIcon,
  Filter
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
// PRODUCT DETAIL PAGE
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

      <section className="px-4 sm:px-6 md:px-12 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1 space-y-4">
            <div
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 cursor-pointer group border-2 border-gray-200 hover:border-green-400 transition-all"
              onClick={() => openLB(activeImg)}
            >
              <img 
                src={product.gallery[activeImg].url} 
                alt={product.gallery[activeImg].caption} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 ${getBadgeStyle(product.badge)} text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg`}>
                  {product.badge}
                </span>
              )}
              <button
                type="button" 
                onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted); }} 
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${wishlisted ? 'bg-red-500 text-white scale-110' : 'bg-white/80 text-gray-600 hover:bg-white'}`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-white' : ''}`} />
              </button>
              <div className="absolute bottom-4 right-4 bg-white rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-4 h-4 text-green-600" />
              </div>
            </div>

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

            <div className="text-xs text-gray-600 italic">
              {product.gallery[activeImg].caption}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
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

            <div className="flex items-center gap-4 flex-wrap bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} size={16} />
                <span className="text-lg font-bold text-gray-900">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-600 border-l border-green-300 pl-4">
                {product.reviewCount.toLocaleString()} customer reviews
              </span>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-indigo-50 border-l-4 border-green-600 p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold text-green-900">Product Summary</p>
              <p className="text-sm text-gray-700 leading-relaxed">{product.shortDesc}</p>
            </div>

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

            <div className="flex gap-3 pt-4">
              <button type="button" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                Download Brochure
              </button>
              <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-green-600 hover:text-green-600 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
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
  const [showFilter, setShowFilter] = useState(false);

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

      <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto mb-8">
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

      <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-8">
        <div className="text-center mb-6 space-y-2">
          <span className="text-xs font-bold text-green-600 tracking-widest uppercase font-mono">{categorySection.badge}</span>
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">{categorySection.heading}</h2>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">{categorySection.description}</p>
        </div>

        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="hidden md:flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategoryFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  categoryFilter === 'all'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                All Products ({productsData.length})
              </button>
              {productCategories.map((cat) => {
                const count = productsData.filter(p => p.category === cat.id).length;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      categoryFilter === cat.id
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600'
                    }`}
                  >
                    {cat.label} ({count})
                  </button>
                );
              })}
            </div>

            <div className="md:hidden relative">
              <button
                type="button"
                onClick={() => setShowFilter(!showFilter)}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 border-2 border-gray-300 rounded-xl bg-white text-sm font-semibold text-gray-700 hover:border-green-600 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>
                    {categoryFilter === 'all' 
                      ? 'All Products' 
                      : productCategories.find(c => c.id === categoryFilter)?.label}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
              </button>

              {showFilter && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => { setCategoryFilter('all'); setShowFilter(false); }}
                    className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${
                      categoryFilter === 'all' ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    All Products ({productsData.length})
                  </button>
                  {productCategories.map((cat) => {
                    const count = productsData.filter(p => p.category === cat.id).length;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => { setCategoryFilter(cat.id); setShowFilter(false); }}
                        className={`w-full text-left px-4 py-3 text-sm font-semibold border-t border-gray-100 transition-colors ${
                          categoryFilter === cat.id ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50'
                        }`}
                      >
                        {cat.label} ({count})
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {categoryFilter !== 'all' && (
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className="shrink-0 px-4 py-2 text-sm font-semibold text-green-600 hover:text-green-700 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {searchTerm ? `Search Results for "${searchTerm}"` : gridSection.heading}
          </h3>
          <p className="text-sm text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            {categoryFilter !== 'all' && (
              <span className="ml-2 text-green-600 font-semibold">
                in {productCategories.find(c => c.id === categoryFilter)?.label}
              </span>
            )}
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
                <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
                  <img 
                    src={product.heroImg} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 ${getBadgeStyle(product.badge)} text-[9px] font-bold uppercase px-2.5 py-1 rounded-lg shadow-md`}>
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-green-600/0 group-hover:bg-green-600/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 bg-white text-green-600 font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5">
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-3 flex flex-col flex-1">
                  <p className="text-[10px] font-bold text-green-600 uppercase font-mono">
                    {catInfo?.label}
                  </p>
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed flex-1">
                    {product.shortDesc}
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                    <StarRating rating={product.rating} size={12} />
                    <span className="text-[10px] text-gray-600 font-semibold">({product.reviewCount.toLocaleString()})</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

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

      <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 sm:p-12 rounded-2xl space-y-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold">Need Help Choosing the Right Product?</h3>
          <p className="text-sm sm:text-base text-green-100 max-w-lg mx-auto">
            Contact our expert team. They'll help you understand which product best fits your needs.
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
