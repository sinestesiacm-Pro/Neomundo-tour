import { useState } from 'react';
import { Plane, Clock, Luggage, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface FlightCardProps {
  offer: any;
  onSelect: (offer: any) => void;
  isLoading?: boolean;
}

export default function FlightCard({ offer, onSelect, isLoading = false }: FlightCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const itineraries = offer.itineraries || [];
  const price = offer.price || {};
  const totalPrice = parseFloat(price.grandTotal || price.total || '0').toLocaleString('es-CO');
  const currency = price.currency || 'USD';

  // Format ISO duration (PT2H30M -> 2h 30m)
  const formatDuration = (durationStr: string) => {
    if (!durationStr) return '';
    return durationStr
      .replace('PT', '')
      .replace('H', 'h ')
      .replace('M', 'm')
      .toLowerCase();
  };

  // Format ISO datetime to HH:MM
  const formatTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return '';
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format ISO datetime to Date (DD/MM)
  const formatDate = (dateTimeStr: string) => {
    if (!dateTimeStr) return '';
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString([], { day: '2-digit', month: 'short' });
  };

  return (
    <div className="glass-card rounded-[2.5rem] p-6 md:p-8 border border-white/20 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300">
      {/* Header Oferta */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 font-bold font-mono">
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <span className="font-outfit font-black text-white text-lg block">
              {offer.validatingAirlineCodes?.join(', ') || 'Aerolínea'}
            </span>
            <span className="text-xs text-gray-400 block font-sans">
              {itineraries.length > 1 ? 'Vuelo Ida y Vuelta' : 'Vuelo Solo Ida'}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="font-outfit text-3xl font-black text-emerald-400">
            ${totalPrice} <span className="text-xs font-bold text-gray-300 font-mono">{currency}</span>
          </div>
          <span className="text-[10px] text-gray-400 uppercase font-outfit font-extrabold tracking-wider">
            Impuestos y tasas incluidos
          </span>
        </div>
      </div>

      {/* Tramos de Itinerario (Ida y Vuelta) */}
      <div className="space-y-6 py-6">
        {itineraries.map((itinerary: any, idx: number) => {
          const segments = itinerary.segments || [];
          const firstSegment = segments[0] || {};
          const lastSegment = segments[segments.length - 1] || {};
          const stopsCount = segments.length - 1;

          return (
            <div key={idx} className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              {/* Etiqueta Ida / Regreso */}
              <div className="w-full md:w-28 shrink-0">
                <span className="bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-outfit font-extrabold text-emerald-400 uppercase tracking-wider inline-block">
                  {idx === 0 ? 'Ida' : 'Regreso'}
                </span>
                <span className="text-xs text-gray-400 block mt-1 font-sans">
                  {formatDate(firstSegment.departure?.at)}
                </span>
              </div>

              {/* Horarios y Ruta */}
              <div className="flex-1 w-full grid grid-cols-3 items-center text-center gap-2">
                {/* Salida */}
                <div className="text-left">
                  <span className="font-outfit text-2xl font-black text-white block">
                    {formatTime(firstSegment.departure?.at)}
                  </span>
                  <span className="font-bold text-sm text-cyan-400 font-mono block">
                    {firstSegment.departure?.iataCode}
                  </span>
                </div>

                {/* Línea de tiempo y escalas */}
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-300 font-medium flex items-center gap-1 font-sans">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {formatDuration(itinerary.duration)}
                  </span>
                  <div className="w-full relative flex items-center justify-center my-2">
                    <div className="w-full h-0.5 bg-white/20"></div>
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-md"></div>
                  </div>
                  <span
                    className={`text-xs font-outfit font-extrabold ${
                      stopsCount === 0 ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {stopsCount === 0 ? 'Directo' : `${stopsCount} escala${stopsCount > 1 ? 's' : ''}`}
                  </span>
                </div>

                {/* Llegada */}
                <div className="text-right">
                  <span className="font-outfit text-2xl font-black text-white block">
                    {formatTime(lastSegment.arrival?.at)}
                  </span>
                  <span className="font-bold text-sm text-emerald-400 font-mono block">
                    {lastSegment.arrival?.iataCode}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Card: Equipaje y Botón Seleccionar */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs font-bold text-gray-300">
          <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
            <Luggage className="w-4 h-4 text-emerald-400" />
            <span>Equipaje de mano incluido</span>
          </span>
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-outfit font-extrabold text-xs"
          >
            <span>{showDetails ? 'Ocultar escalas' : 'Ver escalas'}</span>
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => onSelect(offer)}
          className="btn-primary px-7 py-3 rounded-2xl font-outfit font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all text-white"
        >
          <span>Seleccionar Vuelo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Desglose de Escalas */}
      {showDetails && (
        <div className="mt-6 pt-4 border-t border-white/10 space-y-4 animate-fade-in-up">
          <h4 className="text-xs font-outfit font-extrabold text-cyan-400 uppercase tracking-wider">Itinerario Completo</h4>
          {itineraries.map((itinerary: any, itIdx: number) => (
            <div key={itIdx} className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
              <span className="font-outfit font-extrabold text-xs text-emerald-400 block">
                {itIdx === 0 ? 'Trayecto de Ida' : 'Trayecto de Regreso'}
              </span>
              {itinerary.segments.map((seg: any, segIdx: number) => (
                <div key={segIdx} className="text-xs space-y-1 pl-3 border-l-2 border-cyan-400/60">
                  <div className="font-bold text-white flex justify-between">
                    <span>
                      Vuelo {seg.carrierCode} {seg.number} — {seg.departure?.iataCode} ➔ {seg.arrival?.iataCode}
                    </span>
                    <span className="font-mono text-cyan-400">{formatDuration(seg.duration)}</span>
                  </div>
                  <div className="text-gray-400">
                    Salida: {formatTime(seg.departure?.at)} ({formatDate(seg.departure?.at)}) | Llegada: {formatTime(seg.arrival?.at)} ({formatDate(seg.arrival?.at)})
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
