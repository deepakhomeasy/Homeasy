// components/Navbar.tsx
import { useState, useEffect } from 'react';
import {
  Activity,
  Layers,
  Smartphone,
  Briefcase,
  Sparkles,
  Menu,
  X,
  Quote,
  Package
} from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openContactModal: () => void;
}

export function Navbar({
  activeTab,
  setActiveTab,
  openContactModal
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navItems: {
    id: ActiveTab;
    label: string;
    icon: typeof Sparkles;
  }[] = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'solutions', label: 'Solutions', icon: Layers },
    { id: 'product', label: 'Products', icon: Package },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'app', label: 'Mobile App', icon: Smartphone },
    { id: 'blog', label: 'Blog', icon: Quote }
  ];

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-transparent' : 'bg-transparent'
        }`}
      >
        <nav className="flex justify-between items-center px-4 sm:px-5 md:px-10 py-3 md:py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 sm:gap-3 group bg-surface-container/80 border border-outline-variant/30 rounded-2xl pr-3"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
              <span className="font-display font-bold text-base sm:text-lg text-white leading-none">
                H
              </span>
            </div>
            <div>
              <div className="font-display font-bold text-sm sm:text-base leading-tight text-on-surface group-hover:text-primary transition-colors flex items-center gap-1.5 sm:gap-2">
                Homeasy
                <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-primary bg-primary-fixed px-1 sm:px-1.5 py-0.5 rounded-md">
                  LUX
                </span>
              </div>
              <div className="text-[8px] sm:text-[9px] font-mono text-on-surface-variant/70 tracking-widest uppercase leading-none">
                Aura Intelligence
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 bg-surface-container/80 border border-outline-variant/30 rounded-2xl p-1 backdrop-blur-sm">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 px-3 lg:px-4 py-2.5 rounded-xl font-medium text-xs lg:text-sm transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'text-on-surface-variant hover:text-primary hover:bg-white/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-mono text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/30">
              <Activity className="w-3 h-3 text-primary animate-blink" />
              <span>28+ STATES LIVE</span>
            </div>

            <button
              onClick={openContactModal}
              className="hidden md:block px-4 lg:px-5 py-2.5 bg-primary hover:bg-primary-container text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
            >
              Get Quote
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-surface-container border border-outline-variant/30"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="md:hidden relative bg-white/98 backdrop-blur-xl border-t border-outline-variant/20 px-4 sm:px-5 py-4 animate-fade-in shadow-xl">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm mb-1 transition-all ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {item.label}
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  openContactModal();
                  setMobileOpen(false);
                }}
                className="w-full mt-3 bg-primary text-white font-bold py-3.5 rounded-xl text-sm tracking-wide active:scale-98 transition-transform"
              >
                Get Free Quote
              </button>
            </div>
          </>
        )}
      </header>
    </>
  );
}