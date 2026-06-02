import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { experiences } from '../data/experiences';
import InnovativeGallery from '../components/InnovativeGallery';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import { MapPin, Users, CalendarDays, Compass, Star, ChevronLeft, ArrowRight, Check, Clock, DollarSign, Route, Plane, CircleDot } from 'lucide-react';

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const experience = experiences.find((exp) => exp.id === id);

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [numNights, setNumNights] = useState<number>(0);
  const [numGuests, setNumGuests] = useState<number>(1);

  if (!experience) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto">
        <span className="material-symbols-outlined text-5xl text-error mb-4">gpp_maybe</span>
        <h2 className="font-headline text-2xl font-bold">Experiencia no encontrada</h2>
        <p className="text-on-surface-variant mt-2 mb-6">La experiencia que buscas no existe o ha sido eliminada.</p>
        <Link to="/experiences" className="btn-primary px-6 py-3 rounded-full font-bold">
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  const handleSelectDates = (checkIn: Date | null, checkOut: Date | null, nights: number) => {
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
    setNumNights(nights);
  };

  const handleProceedToCheckout = () => {
    if (!checkInDate) return;

    // Package details to send to Checkout via routing state
    const bookingDetails = {
      experienceId: experience.id,
      experienceTitle: experience.title,
      experienceImage: experience.image,
      experienceCategory: experience.categoryLabel,
      pricePerUnit: experience.price,
      priceUnit: experience.priceUnit,
      checkIn: checkInDate.toLocaleDateString(),
      checkOut: checkOutDate ? checkOutDate.toLocaleDateString() : null,
      nights: numNights > 0 ? numNights : 1, // default to 1 unit if tour
      guests: numGuests,
      subtotal: experience.price * (numNights > 0 ? numNights : 1)
    };

    navigate('/checkout', { state: { booking: bookingDetails } });
  };

  const isStay = experience.category === 'Stay';
  const showProceedButton = isStay ? (checkInDate && checkOutDate) : checkInDate;

  return (
    <div className="pt-20 pb-24">
      {/* Header Back Button */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 flex items-center justify-between">
        <Link 
          to="/experiences" 
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold group"
        >
          <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
          <span>Volver al Catálogo</span>
        </Link>
        <span className="text-xs text-outline font-medium uppercase tracking-widest hidden sm:inline-block">
          Aventuras Premium en Guatapé
        </span>
      </div>

      {/* Bento Gallery Component */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-12">
        <InnovativeGallery 
          images={[experience.image, ...(experience.additionalImages || [])]} 
          title={experience.title} 
        />
      </div>

      {/* Main Details and Booking Sidebar Split */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Left Column: Property/Activity Info */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Header titles */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Guatapé, Antioquia, Colombia</span>
              {experience.rating && (
                <div className="flex items-center gap-1 ml-4 bg-tertiary-container/20 text-tertiary px-2 py-0.5 rounded-full text-xs font-black">
                  <Star className="w-3 h-3 fill-tertiary stroke-none shrink-0" />
                  <span>{experience.rating}</span>
                </div>
              )}
            </div>
            <h1 className="flex flex-wrap items-baseline gap-3 mb-2">
              <span className="font-handwriting text-5xl md:text-6xl lg:text-7xl text-primary -rotate-2">{experience.title.split(' ')[0]}</span>
              <span className="font-display text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-wide uppercase translate-y-1">
                {experience.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            
            {/* Core statistics badges */}
            <div className="flex flex-wrap gap-4 text-on-surface-variant text-sm font-semibold">
              {experience.features && experience.features.length > 0 ? (
                experience.features.map((feat, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 bg-surface-container-high px-4 py-1.5 rounded-full">
                    {idx === 0 && <Users className="w-4 h-4 text-primary shrink-0" />}
                    {idx === 1 && <CalendarDays className="w-4 h-4 text-primary shrink-0" />}
                    {idx === 2 && <Compass className="w-4 h-4 text-primary shrink-0" />}
                    <span>{feat}</span>
                  </span>
                ))
              ) : (
                <>
                  <span className="flex items-center gap-1.5 bg-surface-container-high px-4 py-1.5 rounded-full">
                    <Users className="w-4 h-4 text-primary shrink-0" />
                    <span>Hasta {isStay ? 12 : 15} Pax</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-surface-container-high px-4 py-1.5 rounded-full">
                    <CalendarDays className="w-4 h-4 text-primary shrink-0" />
                    <span>Reserva Premium</span>
                  </span>
                </>
              )}
            </div>
          </div>

          <hr className="border-outline-variant/30" />

          {/* Description Block */}
          <div className="space-y-6">
            <h2 className="flex flex-wrap items-end gap-2 border-b-2 border-primary-container/30 pb-2">
              <span className="font-sans font-bold text-2xl text-on-surface">Acerca de</span>
              <span className="font-handwriting text-4xl text-secondary -rotate-2 translate-y-1">esta experiencia</span>
            </h2>
            <div className="space-y-4">
              {experience.longDescription.split('\n\n').map((block, blockIdx) => {
                // Section headers (━━━ TITLE ━━━)
                if (block.includes('━━━')) {
                  const title = block.match(/━+\s*(.+?)\s*━+/)?.[1] || '';
                  const lines = block.split('\n').filter(l => !l.includes('━━━'));
                  return (
                    <div key={blockIdx} className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/20 space-y-3 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Plane className="w-5 h-5 text-primary" strokeWidth={2.5} />
                        </div>
                        <h3 className="font-display text-xl tracking-wider text-on-surface uppercase">{title}</h3>
                      </div>
                      {lines.length > 0 && (
                        <div className="space-y-2 pl-[52px]">
                          {lines.map((line, lineIdx) => {
                            const trimmed = line.trim();
                            if (!trimmed) return null;
                            if (trimmed.startsWith('•')) {
                              const content = trimmed.replace('•', '').trim();
                              const isDollar = content.toLowerCase().includes('pasajero') || content.toLowerCase().includes('privado') || content.toLowerCase().includes('minuto') || content.toLowerCase().includes('hora');
                              return (
                                <div key={lineIdx} className="flex items-start gap-2.5 text-on-surface-variant">
                                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                                    {isDollar ? <DollarSign className="w-3 h-3 text-secondary" strokeWidth={3} /> : <CircleDot className="w-3 h-3 text-secondary" strokeWidth={3} />}
                                  </div>
                                  <span className="text-sm font-medium leading-relaxed">{content}</span>
                                </div>
                              );
                            }
                            if (trimmed.toLowerCase().startsWith('precio')) {
                              return (
                                <div key={lineIdx} className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                                  <DollarSign className="w-3.5 h-3.5" strokeWidth={3} />
                                  <span>{trimmed}</span>
                                </div>
                              );
                            }
                            if (trimmed.toLowerCase().startsWith('recorrido')) {
                              return (
                                <div key={lineIdx} className="flex items-start gap-2.5 text-on-surface-variant mt-2">
                                  <Route className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                                  <span className="text-sm leading-relaxed">{trimmed}</span>
                                </div>
                              );
                            }
                            if (trimmed.toLowerCase().startsWith('contáctanos')) {
                              return (
                                <p key={lineIdx} className="text-sm font-semibold text-primary">{trimmed}</p>
                              );
                            }
                            return <p key={lineIdx} className="text-sm text-on-surface-variant leading-relaxed">{trimmed}</p>;
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // Bullet list blocks
                const lines = block.split('\n');
                const hasBullets = lines.some(l => l.trim().startsWith('•'));
                if (hasBullets) {
                  return (
                    <div key={blockIdx} className="space-y-2">
                      {lines.map((line, lineIdx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        if (trimmed.startsWith('•')) {
                          const content = trimmed.replace('•', '').trim();
                          return (
                            <div key={lineIdx} className="flex items-start gap-2.5 text-on-surface-variant">
                              <div className="w-5 h-5 rounded-full bg-primary-container/10 flex items-center justify-center shrink-0 mt-0.5">
                                <CircleDot className="w-3 h-3 text-primary-container" strokeWidth={3} />
                              </div>
                              <span className="text-sm font-medium leading-relaxed">{content}</span>
                            </div>
                          );
                        }
                        // Sub-headers within bullet blocks (e.g. "Incluye:", "Horarios:")
                        if (trimmed.endsWith(':')) {
                          return (
                            <h4 key={lineIdx} className="font-bold text-on-surface text-sm uppercase tracking-wider mt-3 first:mt-0">{trimmed}</h4>
                          );
                        }
                        return <p key={lineIdx} className="text-sm text-on-surface-variant leading-relaxed">{trimmed}</p>;
                      })}
                    </div>
                  );
                }

                // Section labels like "MEDELLÍN — PEÑOL — MEDELLÍN"  
                if (block === block.toUpperCase() && block.includes('—')) {
                  return (
                    <div key={blockIdx} className="flex items-center gap-3 bg-primary/5 rounded-xl px-5 py-3 border border-primary/10">
                      <Route className="w-5 h-5 text-primary shrink-0" strokeWidth={2.5} />
                      <span className="font-display text-lg text-primary tracking-wider">{block}</span>
                    </div>
                  );
                }

                // "Importante:" or warning blocks
                if (block.toLowerCase().startsWith('importante')) {
                  return (
                    <div key={blockIdx} className="bg-error/5 border border-error/15 rounded-xl p-4 text-sm text-on-surface-variant leading-relaxed">
                      <span className="font-bold text-error text-xs uppercase tracking-wider block mb-1">Importante</span>
                      {block.replace(/^importante:\s*/i, '')}
                    </div>
                  );
                }

                // Regular paragraph text
                return (
                  <p key={blockIdx} className="text-on-surface-variant leading-relaxed">
                    {block}
                  </p>
                );
              })}
            </div>
          </div>

          <hr className="border-outline-variant/30" />

          {/* Amenities/Offerings Lists */}
          <div className="space-y-8">
            <h2 className="flex flex-wrap items-baseline gap-2 border-b-2 border-secondary/30 pb-2">
              <span className="font-display text-3xl text-on-surface tracking-wider">Qué</span>
              <span className="font-serif italic font-black text-3xl text-primary">incluye</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(experience.amenities || ["Equipo de Seguridad", "Capitán Experto", "Nevera Premium", "Guía Bilingüe", "Combustible e Impuestos", "Experiencia VIP"]).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 bg-surface-container-low rounded-xl px-4 py-3 border border-outline-variant/15 hover:border-primary/30 hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-300 cursor-default group">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/15 flex items-center justify-center text-primary-container shrink-0 group-hover:bg-primary-container/25 transition-colors">
                    <Check className="w-4.5 h-4.5" strokeWidth={3} />
                  </div>
                  <span className="font-semibold text-sm text-on-surface">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Custom Booking Widget and Price Panel */}
        <div className="sticky top-28 space-y-6">
          <div className="glass-panel rounded-3xl overflow-hidden shadow-xl border border-outline-variant/30 p-6 space-y-6">
            
            {/* Top pricing info block */}
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-headline text-3xl font-black text-primary">${experience.price}</span>
                <span className="text-on-surface-variant text-sm font-semibold"> / {experience.priceUnit}</span>
              </div>
              <span className="text-xs text-outline font-bold tracking-widest uppercase">
                Confirmación instantánea
              </span>
            </div>

            {/* Interactive Availability Calendar */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Seleccionar Fechas
              </label>
              <AvailabilityCalendar 
                pricePerNight={experience.price} 
                onSelectDates={handleSelectDates} 
              />
            </div>

            {/* Select guests count */}
            <div className="space-y-2">
              <label htmlFor="guest-select" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Huéspedes
              </label>
              <select
                id="guest-select"
                value={numGuests}
                onChange={(e) => setNumGuests(Number(e.target.value))}
                className="w-full p-4 rounded-xl border border-outline-variant bg-white font-medium text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>
                    {g} {g === 1 ? 'Huésped' : 'Huéspedes'}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Proceed Button */}
            {showProceedButton ? (
              <button
                onClick={handleProceedToCheckout}
                className="w-full btn-secondary text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Proceder al Pago</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <div className="w-full text-center py-4 bg-surface-container-low text-outline text-xs font-bold rounded-2xl uppercase tracking-wider border border-dashed border-outline-variant/50">
                Por favor selecciona {isStay ? 'un rango de fechas' : 'la fecha'} arriba
              </div>
            )}

            <p className="text-center text-xs text-outline">No se te cobrará aún. Completa el pago a continuación.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
