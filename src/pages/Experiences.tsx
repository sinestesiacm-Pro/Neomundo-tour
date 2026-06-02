import { useSearchParams, Link } from 'react-router-dom';
import { experiences } from '../data/experiences';
import { Sparkles } from 'lucide-react';

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
    { name: 'All', label: 'Todas' },
    { name: 'Stay', label: 'Villas' },
    { name: 'Water', label: 'Embarcaciones' },
    { name: 'Adrenaline', label: 'Adrenalina' },
    { name: 'Air Adventure', label: 'Aire' }
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Header with Pattern Background */}
      <header className="relative px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-16 md:py-24 text-center hero-pattern rounded-3xl mb-12 overflow-hidden shadow-sm">
        <div className="relative z-10 space-y-6">
          <span className="bg-primary-container/10 text-primary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary-container" />
            <span>Catálogo Neomundo</span>
          </span>
          <h1 className="flex justify-center items-center gap-3 flex-wrap">
            <span className="font-handwriting text-5xl md:text-6xl lg:text-7xl text-secondary -rotate-2">Descubre</span>
            <span className="font-display text-4xl md:text-5xl lg:text-6xl text-primary uppercase tracking-wide translate-y-1">Guatapé</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Experimenta la energía vibrante y los impresionantes paisajes con nuestra selección de aventuras premium y estancias de lujo.
          </p>
          
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto pt-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`px-6 py-2.5 rounded-full font-label-md text-label-md font-bold hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ${
                  activeCategory === cat.name
                    ? 'bg-primary text-on-primary shadow-md cyan-glow'
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
          <div className="text-center py-20 bg-white rounded-3xl border border-outline-variant/20 shadow-sm max-w-md mx-auto">
            <span className="material-symbols-outlined text-5xl text-outline mb-4">search_off</span>
            <h3 className="font-headline text-lg font-bold">No se encontraron experiencias</h3>
            <p className="text-on-surface-variant text-sm mt-1">Intenta seleccionar una categoría diferente.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((exp) => (
              <article
                key={exp.id}
                className="group rounded-[2rem] overflow-hidden bg-white border border-outline-variant/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden shrink-0">
                  {exp.image.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      src={exp.image}
                      autoPlay muted loop playsInline
                    />
                  ) : (
                    <img
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      src={exp.image}
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-tertiary-container text-on-tertiary-container px-4 py-1.5 rounded-full font-label-md text-label-md font-black shadow-md">
                    Desde ${exp.price}/{exp.priceUnit}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <span className="material-symbols-outlined text-base">{exp.icon}</span>
                    <span className="font-label-md text-label-md tracking-wider uppercase text-xs font-bold">
                      {exp.categoryLabel}
                    </span>
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface mb-2 leading-snug group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow leading-relaxed">
                    {exp.description}
                  </p>
                  
                  {/* Additional features details if available */}
                  {exp.features && exp.features.length > 0 && (
                    <div className="flex gap-3 mb-6 flex-wrap">
                      {exp.features.map((feat, idx) => (
                        <span 
                          key={idx} 
                          className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    to={`/booking/${exp.id}`}
                    className="w-full py-3.5 rounded-full border-2 border-primary-container text-primary-container font-label-md text-label-md hover:bg-primary-container hover:text-on-primary transition-all duration-300 font-bold text-center active:scale-95 shadow-sm hover:shadow-md"
                  >
                    Ver Detalles
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
