import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Calendar, Search, ShieldCheck, X } from 'lucide-react';
import { experiences } from '../data/experiences';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [date, setDate] = useState<string>('');

  // Load particles effect in Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const handleResize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedY: number = 0;
      speedX: number = 0;
      opacity: number = 0;

      constructor() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * -0.5 - 0.1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        if (!canvas) return;
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(0, 188, 212, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Filter top 3 featured experiences
  const featured = experiences.slice(0, 3);

  return (
    <div className="pt-20">
      {/* Immersive Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Particle Canvas Background */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

        {/* Background Bento Gallery layout */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-2 opacity-90 scale-105 transform origin-center">
          <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative">
            <img
              alt="El Peñol Monolith"
              className="w-full h-full object-cover ken-burns"
              src="/images/el_penol_real.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
          </div>
          <div className="rounded-2xl overflow-hidden relative">
            <img
              alt="Luxury Villa lakeside"
              className="w-full h-full object-cover ken-burns"
              src="/images/villa_lujo_real.png"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="rounded-2xl overflow-hidden relative">
            <img
              alt="Speedboat Wake"
              className="w-full h-full object-cover ken-burns"
              src="/images/lancha_pontones_real.png"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>

        {/* Hero content overlay - Minimalist */}
        <div className="relative z-20 w-full px-4 flex flex-col items-center justify-center animate-fade-in-up mt-12">
          <h1 className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-12 drop-shadow-2xl text-center">
            <span className="font-display text-5xl md:text-7xl lg:text-[80px] text-white uppercase tracking-tight font-black leading-none drop-shadow-[2px_2px_0_black] md:drop-shadow-[4px_4px_0_black]">
              Despierta
            </span>
            <span className="font-display text-4xl md:text-6xl lg:text-[70px] text-white uppercase tracking-tight font-black leading-none drop-shadow-[2px_2px_0_black] md:drop-shadow-[4px_4px_0_black]">
              tu
            </span>
            <span 
              className="font-handwriting font-bold text-6xl md:text-8xl lg:text-[100px] text-secondary -rotate-3 translate-y-1 md:translate-y-2 leading-none drop-shadow-[2px_2px_0_white] md:drop-shadow-[4px_4px_0_white] [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] glitch-effect"
              data-text="Aventura"
            >
              Aventura
            </span>
          </h1>

          {/* Apple iOS Style Glassmorphic Search */}
          <div className="w-full max-w-md mx-auto relative z-30">
            {isSearchOpen ? (
              <div 
                className="search-glass rounded-[2rem] p-4 flex flex-col gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)] border border-white/20 transition-all duration-500 animate-fade-in-up"
              >
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center gap-4 px-5 py-3.5 bg-white/10 dark:bg-black/20 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <Compass className="w-6 h-6 text-white" />
                    <div className="text-left flex-1">
                      <div className="text-white font-semibold text-sm">Experiencia</div>
                      <div className="text-white/70 text-xs">
                        {selectedExperience ? experiences.find(e => e.id === selectedExperience)?.title : 'Todos los tours'}
                      </div>
                    </div>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-[105%] left-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl p-2 shadow-2xl z-50 border border-white/20 max-h-60 overflow-y-auto">
                      <button
                        onClick={() => { setSelectedExperience(''); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl text-sm font-medium transition-colors text-black dark:text-white"
                      >
                        Todos los tours
                      </button>
                      {experiences.map(exp => (
                        <button
                          key={exp.id}
                          onClick={() => { setSelectedExperience(exp.id); setIsDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl text-sm font-medium transition-colors text-black dark:text-white line-clamp-1"
                        >
                          {exp.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 px-5 py-3.5 bg-white/10 dark:bg-black/20 rounded-2xl border border-white/10">
                  <Calendar className="w-6 h-6 text-white" />
                  <div className="text-left flex-1 relative">
                    <div className="text-white font-semibold text-sm">Fecha</div>
                    <input 
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`bg-transparent text-xs outline-none w-full cursor-pointer [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert ${date ? 'text-white' : 'text-white/70'}`}
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => { setIsSearchOpen(false); setIsDropdownOpen(false); }}
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <Link
                    to={selectedExperience ? `/booking/${selectedExperience}` : "/experiences"}
                    className="flex-1 bg-white text-black py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg text-lg"
                  >
                    <Search className="w-5 h-5" />
                    <span>Explorar</span>
                  </Link>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="search-glass w-full mx-auto max-w-[340px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-full py-3 px-4 flex items-center justify-between group hover:bg-white/30 transition-all duration-300 active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full shadow-inner">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium text-lg tracking-wide drop-shadow-md">Buscar experiencias...</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Intro Section: Vive Guatapé */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="flex flex-wrap items-baseline gap-3 mb-6">
              <span className="font-display text-4xl md:text-5xl lg:text-6xl text-primary tracking-wide uppercase leading-none">Vive</span>
              <span className="font-handwriting text-5xl md:text-6xl lg:text-7xl text-secondary -rotate-3 translate-y-2 leading-none">Guatapé</span>
              <span className="font-sans font-light text-2xl md:text-3xl text-on-surface leading-none">con</span>
              <span className="font-serif italic font-black text-4xl md:text-5xl lg:text-6xl text-on-surface leading-none">Neomundo</span>
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              No solo te mostramos Guatapé; te sumergimos en su alma vibrante. Desde las imponentes alturas de la Piedra del Peñol hasta las serenas y cristalinas aguas del embalse, nuestras experiencias han sido diseñadas para aquellos que buscan lo extraordinario.
            </p>
            <p className="font-body-md text-body-md text-outline">
              Ya sea que busques aventuras llenas de adrenalina, lujo incomparable o una mezcla perfecta de ambos, Neomundo Tour ofrece servicios profesionales y personalizados que capturan la energía de uno de los destinos más hermosos de Colombia.
            </p>
            <Link
              to="/experiences"
              className="inline-flex items-center gap-2 font-label-md text-label-md text-primary-container hover:text-primary transition-colors border-b-2 border-primary-container pb-1 font-bold"
            >
              <span>Descubre Nuestra Historia</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Bento visual block */}
          <div className="relative h-[450px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl group">
            <img
              alt="Guatapé Colorful Town streets"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="/images/guatape_pueblo.png"
            />
            <div className="absolute bottom-8 left-8 right-8 glass-card p-6 rounded-2xl flex items-center justify-between">
              <div>
                <div className="font-headline text-2xl font-extrabold text-on-surface">Más de 10 Años</div>
                <div className="font-body-md text-body-md text-on-surface-variant">Experiencia Local</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Adventures Carousel Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="flex flex-wrap justify-center items-end gap-3 mb-4">
              <span className="font-serif italic font-black text-4xl md:text-5xl text-primary">Mejores</span>
              <span className="font-display text-4xl md:text-5xl text-on-surface tracking-wider">Aventuras</span>
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Emociones seleccionadas para elevar tu experiencia en Guatapé.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((exp) => (
              <div
                key={exp.id}
                className="bg-surface rounded-3xl overflow-hidden border border-outline-variant/30 group cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden shrink-0">
                  {exp.image.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      src={exp.image}
                      autoPlay muted loop playsInline
                    />
                  ) : (
                    <img
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      src={exp.image}
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-tertiary-container text-on-tertiary-container font-label-md text-label-md font-bold px-4 py-1.5 rounded-full shadow-md">
                    Desde ${exp.price}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-primary-container mb-3 font-semibold text-xs tracking-wider uppercase">
                    <span className="material-symbols-outlined text-sm">{exp.icon}</span>
                    <span>{exp.categoryLabel}</span>
                  </div>
                  <h3 className="font-headline text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                    {exp.description}
                  </p>
                  <Link
                    to={`/booking/${exp.id}`}
                    className="w-full py-3 text-center rounded-xl border-2 border-primary-container text-primary-container font-label-md text-label-md hover:bg-primary-container hover:text-on-primary active:scale-95 transition-all duration-200 font-bold block"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
