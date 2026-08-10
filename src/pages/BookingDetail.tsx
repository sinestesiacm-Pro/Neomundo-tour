import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { experiences } from '../data/experiences';
import InnovativeGallery from '../components/InnovativeGallery';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import { MapPin, Users, CalendarDays, Compass, Star, Check, Route, Plane, CircleDot } from 'lucide-react';

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const experience = experiences.find((exp) => exp.id === id);

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
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

  const handleSelectDates = (checkIn: Date | null, checkOut: Date | null, _nights: number) => {
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
  };

  const handleProceedToWhatsApp = () => {
    const datesText = checkInDate ? ` para las fechas del ${checkInDate.toLocaleDateString()}` + (checkOutDate ? ` al ${checkOutDate.toLocaleDateString()}` : '') : '';
    const text = `Hola Neomundo Tour, me interesa reservar la experiencia: *${experience.title}*${datesText}. Quisiera consultar disponibilidad para ${numGuests} huésped(es).`;
    const url = `https://wa.me/573226054919?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const isStay = experience.category === 'Stay';

  return (
    <div className="pt-20 pb-24">


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
            <h1 className="font-outfit font-black text-4xl sm:text-5xl lg:text-6xl text-on-surface uppercase tracking-tight mb-2">
              {experience.title}
            </h1>
            
            {/* Core statistics badges */}
            <div className="flex flex-wrap gap-4 text-on-surface-variant text-sm font-semibold">
              {experience.features && experience.features.length > 0 ? (
                experience.features.map((feat, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 bg-surface-container-high px-4 py-1.5 rounded-full font-outfit font-extrabold text-xs uppercase tracking-wider">
                    {idx === 0 && <Users className="w-4 h-4 text-primary shrink-0" />}
                    {idx === 1 && <CalendarDays className="w-4 h-4 text-primary shrink-0" />}
                    {idx === 2 && <Compass className="w-4 h-4 text-primary shrink-0" />}
                    <span>{feat}</span>
                  </span>
                ))
              ) : (
                <>
                  <span className="flex items-center gap-1.5 bg-surface-container-high px-4 py-1.5 rounded-full font-outfit font-extrabold text-xs uppercase tracking-wider">
                    <Users className="w-4 h-4 text-primary shrink-0" />
                    <span>Hasta {isStay ? 12 : 15} Pax</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-surface-container-high px-4 py-1.5 rounded-full font-outfit font-extrabold text-xs uppercase tracking-wider">
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
            <h2 className="font-outfit font-black text-3xl text-on-surface uppercase border-b-2 border-primary/20 pb-3">
              Acerca de <span className="text-gradient-cyan font-syne lowercase italic">esta experiencia</span>
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
                        <h3 className="font-outfit font-extrabold text-lg tracking-wider text-on-surface uppercase">{title}</h3>
                      </div>
                      {lines.length > 0 && (
                        <div className="space-y-2 pl-[52px]">
                          {lines.map((line, lineIdx) => {
                            const trimmed = line.trim();
                            if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                              return (
                                <div key={lineIdx} className="flex items-start gap-2 text-sm text-on-surface-variant">
                                  <CircleDot className="w-3.5 h-3.5 text-primary shrink-0 mt-1" />
                                  <span>{trimmed.replace(/^[•-]\s*/, '')}</span>
                                </div>
                              );
                            }
                            return <p key={lineIdx} className="text-sm text-on-surface-variant leading-relaxed">{trimmed}</p>;
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // Section labels like "MEDELLÍN — PEÑOL — MEDELLÍN"  
                if (block === block.toUpperCase() && block.includes('—')) {
                  return (
                    <div key={blockIdx} className="flex items-center gap-3 bg-primary/5 rounded-xl px-5 py-3 border border-primary/10">
                      <Route className="w-5 h-5 text-primary shrink-0" strokeWidth={2.5} />
                      <span className="font-outfit font-extrabold text-base text-primary tracking-wider">{block}</span>
                    </div>
                  );
                }

                // Regular paragraph text
                return (
                  <p key={blockIdx} className="text-on-surface-variant leading-relaxed font-sans">
                    {block}
                  </p>
                );
              })}
            </div>
          </div>

          <hr className="border-outline-variant/30" />

          {/* Amenities/Offerings Lists */}
          <div className="space-y-8">
            <h2 className="font-outfit font-black text-3xl text-on-surface uppercase border-b-2 border-primary/20 pb-3">
              Qué <span className="text-gradient-emerald font-syne lowercase italic">incluye</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(experience.amenities || ["Equipo de Seguridad", "Capitán Experto", "Nevera Premium", "Guía Bilingüe", "Combustible e Impuestos", "Experiencia VIP"]).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 bg-surface-container-low rounded-xl px-4 py-3 border border-outline-variant/15 hover:border-primary/30 hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-300 cursor-default group">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/15 flex items-center justify-center text-primary-container shrink-0 group-hover:bg-primary-container/25 transition-colors">
                    <Check className="w-4.5 h-4.5" strokeWidth={3} />
                  </div>
                  <span className="font-sans font-bold text-sm text-on-surface">{item}</span>
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
                <span className="font-outfit font-black text-4xl text-primary">${experience.price.toLocaleString('es-CO')}</span>
                <span className="text-on-surface-variant text-sm font-semibold"> / {experience.priceUnit}</span>
              </div>
              <span className="text-xs font-outfit font-extrabold text-emerald-600 tracking-widest uppercase">
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
            <button
              onClick={handleProceedToWhatsApp}
              className="w-full bg-[#25D366] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Consultar / Reservar por WhatsApp</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="transform group-hover:scale-110 transition-transform">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.005-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
            </button>

            <p className="text-center text-xs text-outline">El pago se acordará directamente con nosotros mediante WhatsApp.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
