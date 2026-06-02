import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

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

  // Dynamic title color based on current section
  const getTitleColorClass = () => {
    if (location.pathname === '/experiences') return 'text-secondary';
    if (location.pathname.startsWith('/booking/')) return 'text-tertiary-container';
    return 'text-primary dark:text-primary-fixed';
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 dark:bg-inverse-surface/95 shadow-md backdrop-blur-xl h-20'
          : 'bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-md h-24'
      } border-b border-outline-variant/20 flex items-center`}
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Logo / Back Button Area */}
        <div className="flex items-center gap-3">
          {/* Logo-to-Back-Button transition container */}
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            {/* Logo image — visible on home */}
            <Link
              to="/"
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                isHome
                  ? 'opacity-100 scale-100 rotate-0 pointer-events-auto'
                  : 'opacity-0 scale-75 -rotate-90 pointer-events-none'
              }`}
            >
              <img
                alt="Neomundo Tour Logo"
                className="h-10 w-auto md:h-12 object-contain"
                src="/Logoneotour.png"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </Link>
            {/* Back button — visible on inner pages */}
            <button
              onClick={() => navigate(-1)}
              className={`absolute inset-0 flex items-center justify-center rounded-full border-2 border-primary/30 text-primary hover:bg-primary/10 transition-all duration-500 ease-in-out ${
                !isHome
                  ? 'opacity-100 scale-100 rotate-0 pointer-events-auto'
                  : 'opacity-0 scale-75 rotate-90 pointer-events-none'
              }`}
              aria-label="Volver atrás"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Title with dynamic color */}
          <Link to="/" className="transition-transform duration-300 hover:scale-105">
            <span className={`font-headline font-black text-xl md:text-2xl tracking-tight transition-colors duration-500 ${getTitleColorClass()}`}>
              Neomundo Tour
            </span>
          </Link>
        </div>

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

              {/* Hamburger-to-X animated button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-primary p-2 w-10 h-10 flex items-center justify-center relative"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between items-center">
                  {/* Top bar */}
                  <span
                    className={`block w-6 h-[2.5px] bg-current rounded-full transition-all duration-400 ease-in-out origin-center ${
                      isOpen ? 'translate-y-[9px] rotate-45' : 'translate-y-0 rotate-0'
                    }`}
                  />
                  {/* Middle bar */}
                  <span
                    className={`block w-6 h-[2.5px] bg-current rounded-full transition-all duration-300 ease-in-out ${
                      isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                    }`}
                  />
                  {/* Bottom bar */}
                  <span
                    className={`block w-6 h-[2.5px] bg-current rounded-full transition-all duration-400 ease-in-out origin-center ${
                      isOpen ? '-translate-y-[9px] -rotate-45' : 'translate-y-0 rotate-0'
                    }`}
                  />
                </div>
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
            {/* X icon via CSS bars inside drawer close too */}
            <div className="w-8 h-8 relative flex items-center justify-center">
              <span className="block absolute w-6 h-[2.5px] bg-current rounded-full rotate-45" />
              <span className="block absolute w-6 h-[2.5px] bg-current rounded-full -rotate-45" />
            </div>
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
