import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Calendar, Search, ShieldCheck, X } from 'lucide-react';
import { experiences } from '../data/experiences';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-2 opacity-90 scale-105 transform origin-center animate-pulse-slow">
          <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative">
            <img
              alt="El Peñol Monolith"
              className="w-full h-full object-cover ken-burns"
              src="/images/el_penol_real.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              alt="Luxury Villa lakeside"
              className="w-full h-full object-cover ken-burns"
              src="/images/villa_lujo_real.png"
            />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img
              alt="Speedboat Wake"
              className="w-full h-full object-cover ken-burns"
              src="/images/lancha_pontones_real.png"
            />
          </div>
        </div>

        {/* Hero glassmorphic content overlay */}
        <div className="relative z-20 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-[2rem] shadow-2xl animate-fade-in-up">
          <span className="font-label-md text-label-md text-primary uppercase tracking-widest mb-4 block">
            Premium Experiences
          </span>
          <h1 className="font-headline text-headline-xl md:text-[64px] md:leading-[72px] text-on-surface mb-6">
            Discover the Magic of <br />
            <span className="text-primary-container font-black">Guatapé</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
            Immerse yourself in breathtaking landscapes, luxury accommodations, and thrilling adventures. Your unforgettable Colombian journey starts here.
          </p>

          {/* Floating Booking Search Widget */}
          {isSearchOpen ? (
            <div className="bg-surface rounded-3xl md:rounded-full p-2 flex flex-col md:flex-row items-center justify-between shadow-lg max-w-3xl mx-auto border border-outline-variant/30 animate-fade-in-up">
              <div className="flex items-center gap-4 px-6 py-3 w-full md:w-auto border-b md:border-b-0 md:border-r border-outline-variant/30">
                <Compass className="w-5 h-5 text-primary-container shrink-0" />
                <div className="text-left">
                  <div className="font-label-md text-label-md text-on-surface">Experience</div>
                  <div className="font-body-md text-body-md text-on-surface-variant text-sm">All Tours & Stays</div>
                </div>
              </div>
              <div className="flex items-center gap-4 px-6 py-3 w-full md:w-auto border-b md:border-b-0 md:border-r border-outline-variant/30">
                <Calendar className="w-5 h-5 text-primary-container shrink-0" />
                <div className="text-left">
                  <div className="font-label-md text-label-md text-on-surface">Date</div>
                  <div className="font-body-md text-body-md text-on-surface-variant text-sm">Flexible dates</div>
                </div>
              </div>
              <div className="flex items-center px-2 py-2 w-full md:w-auto mt-2 md:mt-0 gap-2">
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-outline"
                >
                  <X className="w-5 h-5" />
                </button>
                <Link
                  to="/experiences"
                  className="btn-primary w-full md:w-auto px-8 py-4 rounded-full font-label-md text-label-md flex items-center justify-center gap-2 active:scale-95 transition-transform duration-200"
                >
                  <Search className="w-4 h-4" />
                  <span>Explore</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-center animate-fade-in-up delay-300">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="btn-primary px-8 py-4 rounded-full font-label-md text-label-md flex items-center justify-center gap-2 active:scale-95 transition-transform duration-200 shadow-xl"
              >
                <Search className="w-5 h-5" />
                <span>Buscar Experiencias</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Intro Section: Vive Guatapé */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-black text-on-surface leading-tight">
              Vive Guatapé with Neomundo
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              We don't just show you Guatapé; we immerse you in its vibrant soul. From the towering heights of the Peñol rock to the serene, crystalline waters of the reservoir, our curated experiences are designed for those who seek the extraordinary.
            </p>
            <p className="font-body-md text-body-md text-outline">
              Whether you're craving high-octane adventure, unparalleled luxury, or a seamless blend of both, Neomundo Tour provides professional, tailored services that capture the sun-drenched energy of Colombia's most beautiful destination.
            </p>
            <Link
              to="/experiences"
              className="inline-flex items-center gap-2 font-label-md text-label-md text-primary-container hover:text-primary transition-colors border-b-2 border-primary-container pb-1 font-bold"
            >
              <span>Discover Our Story</span>
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
                <div className="font-headline text-2xl font-extrabold text-on-surface">10+ Years</div>
                <div className="font-body-md text-body-md text-on-surface-variant">Local Expertise</div>
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
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface">
              Top Adventures
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Curated thrills to elevate your Guatapé experience.
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
                  <img
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    src={exp.image}
                  />
                  <div className="absolute top-4 right-4 bg-tertiary-container text-on-tertiary-container font-label-md text-label-md font-bold px-4 py-1.5 rounded-full shadow-md">
                    From ${exp.price}
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
                    View Details
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
