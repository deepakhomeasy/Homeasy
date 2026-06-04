// src/App.tsx
import { useState, useEffect, useRef, FormEvent, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeasyHome } from './components/HomeasyHome';
import { ConsultationModal } from './components/ConsultationModal';

import { NotFoundPage } from './components/NotFoundPage';
import { ActiveTab, LeadForm } from './types';
import { Blog } from './components/Blog';
import { BlogSlug } from './components/BlogSlug';

// Lazy-load heavy routes to reduce initial bundle
const AuraSolutions = lazy(() =>
  import('./components/AuraSolutions').then(m => ({ default: m.AuraSolutions }))
);
const AuraPortfolio = lazy(() =>
  import('./components/AuraPortfolio').then(m => ({ default: m.AuraPortfolio }))
);
const Products = lazy(() =>
  import('./components/Product').then(m => ({ default: m.Products }))
);
const MobileExperience = lazy(() =>
  import('./components/MobileExperience').then(m => ({ default: m.MobileExperience }))
);

// Route ↔ ActiveTab maps
const pathToTab: Record<string, ActiveTab> = {
  '/': 'home',
  '/solutions': 'solutions',
  '/portfolio': 'portfolio',
  '/product': 'product',
  '/app': 'app',
  '/blog': 'blog',
};

const tabToPath: Record<ActiveTab, string> = {
  home: '/',
  solutions: '/solutions',
  portfolio: '/portfolio',
  product: '/product',
  app: '/app',
  blog: '/blog',
};

const EMPTY_FORM: LeadForm = {
  name: '',
  phone: '',
  email: '',
  propertyType: 'Villa',
  budget: '$25k - $100k',
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

 const activeTab: ActiveTab = (() => {
  const pathname = location.pathname;

  if (pathname.startsWith('/blog')) return 'blog';
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/solutions')) return 'solutions';
  if (pathname.startsWith('/portfolio')) return 'portfolio';
  if (pathname.startsWith('/product')) return 'product';
  if (pathname.startsWith('/app')) return 'app';

  return 'home';
})();

  // ── Page transition ────────────────────────────────────────────
  // FIX: use a proper "fade-out → navigate → fade-in" cycle so the
  // transition is actually visible and doesn't flash.
  const [visible, setVisible] = useState(true);

  const handleTabChange = (tab: ActiveTab) => {
    if (tab === activeTab) return;

    // 1. Fade out
    setVisible(false);

    // 2. After fade-out finishes, navigate and scroll
    setTimeout(() => {
      navigate(tabToPath[tab]);
      window.scrollTo({ top: 0, behavior: 'instant' });

      // 3. Fade back in on next frame so React has painted the new page
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }, 180); // match transition-duration below
  };

  // Scroll to top on browser back/forward navigation too
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Ensure page is visible when arriving via back/forward
    setVisible(true);
  }, [location.pathname]);

  // ── Modal ──────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [modalForm, setModalForm] = useState<LeadForm>(EMPTY_FORM);
  const modalFirstInputRef = useRef<HTMLInputElement>(null);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
    setTimeout(() => modalFirstInputRef.current?.focus(), 50);
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      setModalSubmitted(false);
      setModalForm(EMPTY_FORM);
    }, 300);
  };

  const handleModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!modalForm.name || !modalForm.email) return;
    setModalSubmitted(true);
    setTimeout(closeModal, 4000);
  };

  // Cleanup overflow lock on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-on-surface font-sans overflow-x-hidden pb-16 md:pb-0">
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        openContactModal={openModal}
      />

      <main
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 180ms ease',
          willChange: 'opacity',
        }}
      >
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route
              path="/"
              element={
                <HomeasyHome
                  onBookConsultation={openModal}
                  onExploreSolutions={() => handleTabChange('solutions')}
                />
              }
            />
            <Route
              path="/solutions"
              element={<AuraSolutions onContactRequest={openModal} />}
            />
            <Route path="/portfolio" element={<AuraPortfolio />} />
            <Route path="/product" element={<Products />} />
            <Route path="/app" element={<MobileExperience />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogSlug />} />
            
            <Route
              path="*"
              element={<NotFoundPage onNavigate={handleTabChange} />}
            />
          </Routes>
        </Suspense>
      </main>

      <Footer onTabChange={handleTabChange} onOpenModal={openModal} />

      <ConsultationModal
        isOpen={modalOpen}
        isSubmitted={modalSubmitted}
        form={modalForm}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        onFormChange={(partial) => setModalForm(prev => ({ ...prev, ...partial }))}
        firstInputRef={modalFirstInputRef}
      />
    </div>
  );
}
