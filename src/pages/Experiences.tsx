import { useSearchParams, Link } from 'react-router-dom';
import { experiences } from '../data/experiences';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Experiences() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  const setCategory = (category: string) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  // Filter experiences based on active category
  const filtered = experiences.filter((exp) => {
    if (activeCategory === 'All') return true;
    return exp.category === activeCategory;
  });

  const categories = [
    { name: 'All', label: 'Todas las Aventuras' },
    { name: 'Stay', label: 'Villas & Glamping' },
    { name: 'Water', label: 'Jetcar & Embarcaciones' },
    { name: 'Adrenaline', label: 'Adrenalina & ATV' },
    { name: 'Air Adventure', label: 'Vuelos Helicóptero' }
  ];

  return (
    <div className="pt-24 pb-24 bg-background text-on-background">
      {/* Header with Pattern Background */}
      <header className="relative px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-16 md:py-20 text-center hero-pattern rounded-3xl mb-12 overflow-hidden shadow-sm border border-outline-variant/30">
        <div className="relative z-10 space-y-6">
          <span className="bg-primary/10 text-primary px-5 py-2 rounded-full font-outfit text-xs font-extrabold uppercase tracking-[0.2em] inline-flex items-center gap-2 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span>Catálogo Completo Neomundo</span>
          </span>
          <h1 className="font-outfit font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-on-surface tracking-tight uppercase">
            Descubre <span className="text-gradient-cyan font-syne lowercase italic">Guatapé</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Experimenta la energía vibrante y los paisajes más espectaculares de Colombia con nuestra selección de experiencias VIP.
          </p>
          
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto pt-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`px-6 py-3 rounded-full font-outfit text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.name
                    ? 'bg-primary text-on-primary shadow-lg emerald-glow scale-105'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid List Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-3xl border border-outline-variant/30 max-w-md mx-auto space-y-3">
            <span className="material-symbols-outlined text-5xl text-outline mb-2">search_off</span>
            <h3 className="font-outfit text-xl font-bold text-on-surface">No se encontraron experiencias</h3>
            <p className="text-on-surface-variant text-xs">Intenta seleccionar una categoría diferente.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((exp) => (
              <article
                key={exp.id}
                className="glass-card rounded-[2.5rem] overflow-hidden border border-outline-variant/30 hover:shadow-glass-hover hover:-translate-y-2 transition-all duration-500 flex flex-col h-full group"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden shrink-0">
                  {exp.image.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      src={exp.image}
                      autoPlay muted loop playsInline
                    />
                  ) : (
                    <img
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      src={exp.image}
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/20 text-emerald-400 font-outfit text-xs font-black px-4 py-2 rounded-full shadow-lg">
                    Desde ${exp.price.toLocaleString('es-CO')} {exp.priceUnit}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-primary mb-3 font-outfit font-extrabold text-xs tracking-wider uppercase">
                    <span className="material-symbols-outlined text-base">{exp.icon}</span>
                    <span>{exp.categoryLabel}</span>
                  </div>
                  <h3 className="font-outfit text-2xl font-black text-on-surface mb-3 leading-tight group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant mb-6 flex-grow leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>
                  
                  {/* Additional features details if available */}
                  {exp.features && exp.features.length > 0 && (
                    <div className="flex gap-2 mb-6 flex-wrap">
                      {exp.features.map((feat, idx) => (
                        <span 
                          key={idx} 
                          className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide border border-outline-variant/20"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    to={`/booking/${exp.id}`}
                    className="btn-primary w-full py-3.5 rounded-2xl font-outfit font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all text-center"
                  >
                    <span>Ver Detalles y Reservar</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
