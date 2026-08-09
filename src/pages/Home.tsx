import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, Calendar, Search, ShieldCheck, X, Star, Zap, Award, Sparkles, Navigation, Waves, Home as HomeIcon, Gauge } from 'lucide-react';
import { experiences } from '../data/experiences';

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [date, setDate] = useState<string>('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Filter top 3 featured experiences
  const featured = experiences.slice(0, 3);

  // Custom exclusive icon generator based on category
  const renderExclusiveCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'flight':
        return (
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-sm">
            <Navigation className="w-5 h-5 -rotate-45" />
          </div>
        );
      case 'directions_boat':
        return (
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-sm">
            <Waves className="w-5 h-5" />
          </div>
        );
      case 'villa':
        return (
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-sm">
            <HomeIcon className="w-5 h-5" />
          </div>
        );
      case 'two_wheeler':
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 shadow-sm">
            <Gauge className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <div className="pt-20 bg-background text-on-background overflow-x-hidden">
      {/* Immersive Epic Hero Section */}
      <section className="relative h-[92vh] min-h-[640px] flex items-center justify-center overflow-hidden">
        {/* Background Bento Gallery layout */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-2 opacity-95 scale-105 transform origin-center">
          <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden relative">
            <img
              alt="El Peñol Monolith"
              className="w-full h-full object-cover ken-burns"
              src="/images/el_penol_real.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-black/20"></div>
          </div>
          <div className="rounded-3xl overflow-hidden relative">
            <img
              alt="Luxury Villa lakeside"
              className="w-full h-full object-cover ken-burns"
              src="/images/villa_lujo_real.png"
            />
            <div className="absolute inset-0 bg-slate-950/40"></div>
          </div>
          <div className="rounded-3xl overflow-hidden relative">
            <img
              alt="Speedboat Wake"
              className="w-full h-full object-cover ken-burns"
              src="/images/lancha_pontones_real.png"
            />
            <div className="absolute inset-0 bg-slate-950/40"></div>
          </div>
        </div>

        {/* Hero content overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col items-center justify-center text-center mt-6"
        >
          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full mb-6 shadow-2xl">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-outfit font-extrabold text-xs uppercase tracking-[0.2em] text-white">
              EXPERIENCIAS PREMIUM & ADRENALINA EN GUATAPÉ
            </span>
          </div>

          {/* Epic Headline */}
          <h1 className="font-outfit font-black text-5xl sm:text-6xl md:text-7xl lg:text-[86px] text-white tracking-tight uppercase leading-[0.95] mb-6 drop-shadow-2xl max-w-5xl">
            Descubre Guatapé <br />
            <span className="text-gradient-cyan font-syne lowercase italic text-6xl sm:text-7xl md:text-8xl lg:text-[96px] normal-case tracking-normal">
              desde el aire y el agua
            </span>
          </h1>

          <p className="font-sans font-medium text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 drop-shadow-md leading-relaxed">
            Paseos en helicóptero, Jetcar de lujo, pontones privados y las mejores villas frente al embalse.
          </p>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10 text-white/90 font-outfit text-xs sm:text-sm font-extrabold uppercase tracking-wider">
            <span className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 shadow-lg">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>4.9 / 5.0 (1,500+ Calificaciones)</span>
            </span>
            <span className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 shadow-lg">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Reserva Inmediata</span>
            </span>
            <span className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 shadow-lg">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>RNT 209737 Certificado</span>
            </span>
          </div>

          {/* Search Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsSearchOpen(true)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-2xl w-full mx-auto max-w-[360px] border border-white/30 shadow-[0_15px_45px_rgba(0,0,0,0.4)] rounded-full py-4 px-6 flex items-center justify-between group transition-all duration-300 active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-full shadow-lg text-white">
                <Search className="w-5 h-5" />
              </div>
              <span className="text-white font-outfit font-extrabold text-base tracking-wide drop-shadow-md">
                Buscar Experiencias...
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </section>

      {/* Floating Framer Motion Search Modal (Guaranteed NO Cutoff on Mac/Mobile) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-2xl overflow-y-auto"
            onClick={() => {
              setIsSearchOpen(false);
              setIsDropdownOpen(false);
              setIsDatePickerOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-full max-w-lg bg-slate-900/95 border border-white/20 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-white space-y-4 my-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/20 text-primary border border-primary/30">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-outfit font-black text-xl text-white">Reserva tu Experiencia</h3>
                    <p className="text-xs text-gray-400">Selecciona el tour y tu fecha deseada</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsDropdownOpen(false);
                    setIsDatePickerOpen(false);
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Selector de Experiencia */}
              <div className="relative">
                <label className="block text-xs font-outfit font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  1. Experiencia o Tour
                </label>
                <button 
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                    setIsDatePickerOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-5 py-4 bg-white/10 rounded-2xl border border-white/15 hover:bg-white/15 transition-colors cursor-pointer text-left"
                >
                  <Compass className="w-6 h-6 text-cyan-400 shrink-0" />
                  <div className="flex-1">
                    <div className="text-white font-outfit font-extrabold text-sm">
                      {selectedExperience ? experiences.find(e => e.id === selectedExperience)?.title : 'Todas las experiencias'}
                    </div>
                    <div className="text-gray-400 text-xs font-sans">
                      {selectedExperience ? 'Categoría seleccionada' : 'Toca para ver el menú completo'}
                    </div>
                  </div>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-[105%] left-0 w-full bg-slate-900 backdrop-blur-2xl rounded-2xl p-2 shadow-2xl z-50 border border-white/20 max-h-60 overflow-y-auto">
                    <button
                      onClick={() => { setSelectedExperience(''); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-xl text-sm font-semibold transition-colors text-white"
                    >
                      🌟 Todos los tours y actividades
                    </button>
                    {experiences.map(exp => (
                      <button
                        key={exp.id}
                        onClick={() => { setSelectedExperience(exp.id); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-xl text-sm font-semibold transition-colors text-white line-clamp-1 flex items-center justify-between"
                      >
                        <span>{exp.title}</span>
                        <span className="text-xs text-emerald-400 font-mono font-bold">${exp.price.toLocaleString('es-CO')}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selector de Fecha */}
              <div className="relative">
                <label className="block text-xs font-outfit font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  2. Fecha del Tour
                </label>
                <button 
                  onClick={() => {
                    setIsDatePickerOpen(!isDatePickerOpen);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-5 py-4 bg-white/10 rounded-2xl border border-white/15 hover:bg-white/15 transition-colors cursor-pointer text-left"
                >
                  <Calendar className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div className="flex-1">
                    <div className="text-white font-outfit font-extrabold text-sm">
                      {date ? date : 'Seleccionar fecha'}
                    </div>
                    <div className="text-gray-400 text-xs font-sans">
                      {date ? 'Fecha elegida' : 'Consulta disponibilidad en tiempo real'}
                    </div>
                  </div>
                </button>

                {isDatePickerOpen && (
                  <div className="absolute top-[105%] left-0 w-full bg-slate-900 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl z-50 border border-white/20 text-white">
                    <div className="flex justify-between items-center mb-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)); }}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors font-bold"
                      >
                        &lt;
                      </button>
                      <div className="font-outfit font-extrabold text-sm uppercase tracking-wider">
                        {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)); }}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors font-bold"
                      >
                        &gt;
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(day => (
                        <div key={day} className="text-xs font-bold text-gray-400">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {(() => {
                        const year = currentDate.getFullYear();
                        const month = currentDate.getMonth();
                        const daysInMonth = new Date(year, month + 1, 0).getDate();
                        const firstDayIndex = new Date(year, month, 1).getDay();
                        
                        const days = [];
                        for (let i = 0; i < firstDayIndex; i++) {
                          days.push(<div key={`empty-${i}`} className="p-2"></div>);
                        }
                        for (let i = 1; i <= daysInMonth; i++) {
                          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                          const isSelected = date === dateStr;
                          days.push(
                            <button 
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                setDate(dateStr);
                                setIsDatePickerOpen(false);
                              }}
                              className={`p-2 text-xs font-bold rounded-full transition-all ${
                                isSelected 
                                  ? 'bg-emerald-500 text-white font-extrabold shadow-lg scale-110' 
                                  : 'hover:bg-white/10 text-white'
                              }`}
                            >
                              {i}
                            </button>
                          );
                        }
                        return days;
                      })()}
                    </div>
                  </div>
                )}
              </div>

              {/* Botón Confirmar Búsqueda */}
              <div className="pt-2">
                <Link
                  to={selectedExperience ? `/booking/${selectedExperience}` : "/experiences"}
                  onClick={() => setIsSearchOpen(false)}
                  className="btn-primary w-full py-4 rounded-2xl font-outfit font-extrabold flex items-center justify-center gap-3 text-base shadow-xl active:scale-98 transition-transform text-center"
                >
                  <Search className="w-5 h-5" />
                  <span>Explorar Disponibilidad</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Section: Vive Guatapé */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="font-outfit font-extrabold text-xs text-primary uppercase tracking-[0.25em] block">
              EXPERIENCIA LOCAL INIGUALABLE
            </span>
            <h2 className="font-outfit font-black text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight uppercase leading-[1.05]">
              Vive Guatapé <br />
              <span className="text-gradient-emerald font-syne normal-case italic">
                con Neomundo Tour
              </span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed">
              No solo te mostramos Guatapé; te sumergimos en su alma vibrante. Desde las imponentes alturas de la Piedra del Peñol hasta las serenas y cristalinas aguas del embalse, nuestras experiencias han sido diseñadas para aquellos que buscan lo extraordinario.
            </p>
            <p className="font-sans text-sm sm:text-base text-outline leading-relaxed">
              Ya sea que busques aventuras llenas de adrenalina en Jetcar y Cuatrimotos, lujo incomparable en pontones privados o estancias exclusivas, Neomundo Tour ofrece un servicio VIP profesional.
            </p>
            <div className="pt-2">
              <Link
                to="/experiences"
                className="inline-flex items-center gap-3 font-outfit text-sm font-extrabold text-primary hover:text-primary-container transition-all border-b-2 border-primary pb-1 group uppercase tracking-wider"
              >
                <span>Descubre Todas las Aventuras</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Bento visual block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[480px] md:h-[540px] rounded-[2.5rem] overflow-hidden shadow-epic-card group"
          >
            <img
              alt="Guatapé Colorful Town streets"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="/images/guatape_pueblo.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 right-8 glass-card-dark p-6 rounded-3xl flex items-center justify-between border border-white/20">
              <div>
                <div className="font-outfit text-2xl md:text-3xl font-black text-white">Más de 10 Años</div>
                <div className="font-sans text-xs text-white/80 font-semibold uppercase tracking-wider">Líderes en Turismo de Lujo en Guatapé</div>
              </div>
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Adventures Section */}
      <section className="py-24 bg-surface-container-low/60 border-y border-outline-variant/20">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <span className="font-outfit font-extrabold text-xs text-primary uppercase tracking-[0.25em]">
              CATÁLOGO DESTACADO
            </span>
            <h2 className="font-outfit font-black text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight uppercase">
              Las Mejores <span className="text-gradient-cyan font-syne lowercase italic">Aventuras</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto">
              Emociones seleccionadas para elevar tu experiencia en Guatapé al siguiente nivel.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-[2.5rem] overflow-hidden border border-outline-variant/30 group cursor-pointer hover:shadow-glass-hover transition-all duration-500 flex flex-col h-full"
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
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/20 text-emerald-400 font-outfit text-xs font-black px-4 py-2 rounded-full shadow-lg">
                    Desde ${exp.price.toLocaleString('es-CO')} {exp.priceUnit}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    {renderExclusiveCategoryIcon(exp.icon)}
                    <span className="font-outfit font-extrabold text-xs tracking-wider uppercase text-primary">
                      {exp.categoryLabel}
                    </span>
                  </div>
                  <h3 className="font-outfit text-2xl font-black text-on-surface mb-3 group-hover:text-primary transition-colors leading-tight">
                    {exp.title}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant mb-8 flex-grow leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>
                  <Link
                    to={`/booking/${exp.id}`}
                    className="btn-primary w-full py-3.5 text-center rounded-2xl font-outfit font-extrabold text-xs uppercase tracking-wider block shadow-md hover:shadow-lg active:scale-95 transition-all"
                  >
                    Ver Detalles y Reservar
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


