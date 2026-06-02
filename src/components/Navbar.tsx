import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 dark:bg-inverse-surface/95 shadow-md backdrop-blur-xl h-20'
          : 'bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-md h-24'
      } border-b border-outline-variant/20 flex items-center`}
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Logo and Title */}
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <img
            alt="Neomundo Tour Logo"
            className="h-10 w-auto md:h-12 object-contain"
            src="/Logoneotour.png"
            onError={(e) => {
              // Fallback if logo fails to load
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="font-headline font-black text-xl md:text-2xl tracking-tight text-primary dark:text-primary-fixed">
            Neomundo Tour
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        {!isCheckout && (
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/experiences"
              className={`font-label-md text-label-md transition-all duration-300 nav-link ${
                location.pathname === '/experiences'
                  ? 'text-primary dark:text-primary-fixed font-bold'
                  : 'text-on-surface-variant dark:text-surface-variant hover:text-primary'
              }`}
            >
              Experiencias
            </Link>
            <Link
              to="/experiences?category=Stay"
              className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-all duration-300 nav-link"
            >
              Villas
            </Link>
            <Link
              to="/experiences?category=Water"
              className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-all duration-300 nav-link"
            >
              Embarcaciones
            </Link>
            <a
              href="#footer"
              className="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-all duration-300 nav-link"
            >
              Contacto
            </a>
          </div>
        )}

        {/* CTA Actions */}
        <div className="flex items-center gap-4">
          {isCheckout ? (
            <div className="flex items-center gap-2 text-secondary font-semibold">
              <ShieldCheck className="w-5 h-5 text-secondary animate-pulse" />
              <span className="text-sm md:text-base hidden sm:inline">Pago Seguro</span>
            </div>
          ) : (
            <>
              <Link
                to="/experiences"
                className="btn-secondary font-label-md text-label-md px-6 py-3 rounded-full hidden md:inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <span>Reservar Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-primary p-2 transition-transform hover:scale-110 active:scale-90"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {!isCheckout && isOpen && (
        <div className="fixed inset-0 z-[9999] w-screen h-[100dvh] bg-white dark:bg-gray-950 flex flex-col items-center justify-center p-6 gap-6 md:hidden animate-fade-in-up overflow-y-auto">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-primary p-2 transition-transform hover:scale-110 active:scale-90 bg-primary/10 rounded-full"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>

          <Link
            to="/experiences"
            className={`font-headline text-2xl sm:text-3xl py-2 ${
              location.pathname === '/experiences' ? 'text-primary font-bold' : 'text-gray-800 dark:text-gray-200 hover:text-primary transition-colors'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Todas las Experiencias
          </Link>
          <Link
            to="/experiences?category=Stay"
            className="font-headline text-2xl sm:text-3xl py-2 text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Villas de Lujo
          </Link>
          <Link
            to="/experiences?category=Water"
            className="font-headline text-2xl sm:text-3xl py-2 text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Lanchas y Pontones
          </Link>
          <a
            href="#footer"
            onClick={() => setIsOpen(false)}
            className="font-headline text-2xl sm:text-3xl py-2 text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
          >
            Contacto
          </a>
          <Link
            to="/experiences"
            className="bg-primary text-on-primary font-bold py-4 px-10 rounded-full text-center flex items-center justify-center gap-2 mt-4 text-xl shadow-lg active:scale-95 transition-transform"
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
