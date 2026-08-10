import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Plane, Compass, Home, Waves, MessageSquare } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isCheckout = location.pathname === '/checkout';
  const isHome = location.pathname === '/';

  // Navigation items with path matching
  const navItems = [
    {
      name: 'Vuelos',
      path: '/vuelos',
      icon: Plane,
      isActive: location.pathname.startsWith('/vuelos')
    },
    {
      name: 'Experiencias',
      path: '/experiences',
      icon: Compass,
      isActive: location.pathname === '/experiences' && (!location.search || location.search === '?category=All')
    },
    {
      name: 'Villas',
      path: '/experiences?category=Stay',
      icon: Home,
      isActive: location.pathname === '/experiences' && location.search.includes('category=Stay')
    },
    {
      name: 'Embarcaciones',
      path: '/experiences?category=Water',
      icon: Waves,
      isActive: location.pathname === '/experiences' && location.search.includes('category=Water')
    },
    {
      name: 'Contacto',
      path: '#footer',
      icon: MessageSquare,
      isExternal: true,
      isActive: location.hash === '#footer'
    }
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-surface/90 dark:bg-inverse-surface/90 shadow-xl backdrop-blur-2xl py-3 border-b border-outline-variant/30'
          : 'bg-surface/60 dark:bg-inverse-surface/60 backdrop-blur-lg py-5 border-b border-outline-variant/15'
      } flex items-center`}
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Logo / Back Button Area */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 md:w-11 md:h-11 shrink-0">
            {/* Logo image — visible on home */}
            <Link
              to="/"
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${
                isHome
                  ? 'opacity-100 scale-100 rotate-0 pointer-events-auto'
                  : 'opacity-0 scale-75 -rotate-90 pointer-events-none'
              }`}
            >
              <img
                alt="Neomundo Tour Logo"
                className="h-10 w-auto md:h-11 object-contain drop-shadow-md"
                src="/logoColor.png"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </Link>
            {/* Back button — visible on inner pages */}
            <button
              onClick={() => navigate(-1)}
              className={`absolute inset-0 flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-500 ease-out shadow-sm ${
                !isHome
                  ? 'opacity-100 scale-100 rotate-0 pointer-events-auto'
                  : 'opacity-0 scale-75 rotate-90 pointer-events-none'
              }`}
              aria-label="Volver atrás"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Title with Outfit font and epic styling */}
          <Link to="/" className="transition-transform duration-300 hover:scale-105">
            <span className="font-outfit font-black text-xl md:text-2xl tracking-tight text-on-surface flex items-center gap-1.5">
              <span>Neomundo</span>
              <span className="text-gradient-cyan">Tour</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        {!isCheckout && (
          <div className="hidden md:flex items-center gap-1 bg-surface-container-low/70 dark:bg-surface-container-high/60 px-3 py-1.5 rounded-full border border-outline-variant/30 backdrop-blur-md shadow-sm">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const linkClasses = `px-3.5 py-2 rounded-full font-outfit text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${
                item.isActive
                  ? 'bg-primary text-on-primary shadow-md scale-105'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant/50'
              }`;

              if (item.isExternal) {
                return (
                  <a key={item.name} href={item.path} className={linkClasses}>
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{item.name}</span>
                  </a>
                );
              }

              return (
                <Link key={item.name} to={item.path} className={linkClasses}>
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA Actions */}
        <div className="flex items-center gap-4">
          {isCheckout ? (
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>Pago 100% Seguro</span>
            </div>
          ) : (
            <>
              <Link
                to="/experiences"
                className="btn-secondary px-6 py-2.5 rounded-full hidden md:inline-flex items-center gap-2 text-xs font-outfit font-extrabold uppercase tracking-wider shadow-lg hover:shadow-xl active:scale-95 transition-all"
              >
                <span>Reservar Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Animated Hamburger Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-primary p-2 w-10 h-10 flex items-center justify-center relative rounded-full bg-surface-container-high/80 border border-outline-variant/30 active:scale-90 transition-transform"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 relative flex flex-col justify-between items-center">
                  <span
                    className={`block w-5 h-[2px] bg-current rounded-full transition-all duration-400 ease-out origin-center ${
                      isOpen ? 'translate-y-[7px] rotate-45' : 'translate-y-0 rotate-0'
                    }`}
                  />
                  <span
                    className={`block w-5 h-[2px] bg-current rounded-full transition-all duration-300 ease-out ${
                      isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                    }`}
                  />
                  <span
                    className={`block w-5 h-[2px] bg-current rounded-full transition-all duration-400 ease-out origin-center ${
                      isOpen ? '-translate-y-[7px] -rotate-45' : 'translate-y-0 rotate-0'
                    }`}
                  />
                </div>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Fullscreen Mobile Drawer */}
      {!isCheckout && isOpen && (
        <div className="fixed inset-0 top-[73px] bg-surface/98 dark:bg-inverse-surface/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-start pt-10 px-6 space-y-6 md:hidden animate-fade-in-up border-t border-outline-variant/20 h-[calc(100vh-73px)] overflow-y-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const mobileClasses = `font-outfit text-2xl font-extrabold py-3 flex items-center gap-3 w-full justify-center rounded-2xl transition-colors ${
              item.isActive ? 'text-primary bg-primary/10' : 'text-on-surface hover:text-primary'
            }`;

            if (item.isExternal) {
              return (
                <a key={item.name} href={item.path} onClick={() => setIsOpen(false)} className={mobileClasses}>
                  <IconComponent className="w-6 h-6" />
                  <span>{item.name}</span>
                </a>
              );
            }

            return (
              <Link key={item.name} to={item.path} onClick={() => setIsOpen(false)} className={mobileClasses}>
                <IconComponent className="w-6 h-6" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <Link
            to="/experiences"
            className="btn-secondary py-4 px-10 rounded-full text-center flex items-center justify-center gap-2 mt-4 text-base font-outfit font-extrabold shadow-xl active:scale-95 transition-transform w-full"
            onClick={() => setIsOpen(false)}
          >
            <span>Reservar Ahora</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </nav>
  );
}
