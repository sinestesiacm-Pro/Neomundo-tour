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
    <div className="bg-surface dark:bg-inverse-surface rounded-3xl p-6 border border-outline-variant/30 shadow-md hover:shadow-xl transition-all duration-300">
      {/* Header Oferta */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary font-bold font-mono">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-on-surface text-base">
              {offer.validatingAirlineCodes?.join(', ') || 'Aerolínea'}
            </span>
            <span className="text-xs text-on-surface-variant block">
              {itineraries.length > 1 ? 'Vuelo Ida y Vuelta' : 'Vuelo Solo Ida'}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="font-headline text-2xl font-black text-primary">
            ${totalPrice} <span className="text-xs font-bold text-on-surface-variant">{currency}</span>
          </div>
          <span className="text-[10px] text-outline uppercase font-bold tracking-wider">
            Impuestos e inc. incluidos
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
            <div key={idx} className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Etiqueta Ida / Regreso */}
              <div className="w-full md:w-24 shrink-0">
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-bold text-on-surface-variant uppercase">
                  {idx === 0 ? 'Ida' : 'Regreso'}
                </span>
                <span className="text-xs text-outline block mt-1">
                  {formatDate(firstSegment.departure?.at)}
                </span>
              </div>

              {/* Horarios y Ruta */}
              <div className="flex-1 w-full grid grid-cols-3 items-center text-center gap-2">
                {/* Salida */}
                <div className="text-left">
                  <span className="font-headline text-xl font-bold text-on-surface block">
                    {formatTime(firstSegment.departure?.at)}
                  </span>
                  <span className="font-bold text-sm text-primary font-mono block">
                    {firstSegment.departure?.iataCode}
                  </span>
                </div>

                {/* Línea de tiempo y escalas */}
                <div className="flex flex-col items-center">
                  <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDuration(itinerary.duration)}
                  </span>
                  <div className="w-full relative flex items-center justify-center my-1">
                    <div className="w-full h-0.5 bg-outline-variant/40"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span
                    className={`text-[11px] font-bold ${
                      stopsCount === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {stopsCount === 0 ? 'Directo' : `${stopsCount} escala${stopsCount > 1 ? 's' : ''}`}
                  </span>
                </div>

                {/* Llegada */}
                <div className="text-right">
                  <span className="font-headline text-xl font-bold text-on-surface block">
                    {formatTime(lastSegment.arrival?.at)}
                  </span>
                  <span className="font-bold text-sm text-secondary font-mono block">
                    {lastSegment.arrival?.iataCode}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Card: Equipaje y Botón Seleccionar */}
      <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs font-semibold text-on-surface-variant">
          <span className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-full">
            <Luggage className="w-4 h-4 text-primary" />
            <span>Equipaje de mano incluido</span>
          </span>
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-primary hover:underline flex items-center gap-1 font-bold text-xs"
          >
            <span>{showDetails ? 'Ocultar escalas' : 'Ver escalas'}</span>
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => onSelect(offer)}
          className="btn-primary px-6 py-2.5 rounded-full font-label-md text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          <span>Seleccionar Vuelo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Desglose de Escalas */}
      {showDetails && (
        <div className="mt-6 pt-4 border-t border-outline-variant/20 space-y-4 animate-fade-in-up">
          <h4 className="text-xs font-bold text-outline uppercase tracking-wider">Itinerario Completo</h4>
          {itineraries.map((itinerary: any, itIdx: number) => (
            <div key={itIdx} className="bg-surface-container-low p-4 rounded-2xl space-y-3">
              <span className="font-bold text-xs text-primary block">
                {itIdx === 0 ? 'Trayecto de Ida' : 'Trayecto de Regreso'}
              </span>
              {itinerary.segments.map((seg: any, segIdx: number) => (
                <div key={segIdx} className="text-xs space-y-1 pl-3 border-l-2 border-primary/40">
                  <div className="font-semibold text-on-surface flex justify-between">
                    <span>
                      Vuelo {seg.carrierCode} {seg.number} — {seg.departure?.iataCode} ➔ {seg.arrival?.iataCode}
                    </span>
                    <span>{formatDuration(seg.duration)}</span>
                  </div>
                  <div className="text-on-surface-variant">
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
