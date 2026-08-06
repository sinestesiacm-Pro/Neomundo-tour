import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Search, ArrowRightLeft, SlidersHorizontal } from 'lucide-react';
import AirportAutocomplete from './AirportAutocomplete';
import type { SearchFlightParams } from '../../services/flightService';

interface FlightSearchWidgetProps {
  initialValues?: Partial<SearchFlightParams>;
  onSearchSubmit?: (params: SearchFlightParams) => void;
  compact?: boolean;
}

export default function FlightSearchWidget({
  initialValues,
  onSearchSubmit,
  compact = false
}: FlightSearchWidgetProps) {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState<'ROUND_TRIP' | 'ONE_WAY'>(
    initialValues?.returnDate ? 'ROUND_TRIP' : 'ROUND_TRIP'
  );
  const [origin, setOrigin] = useState(initialValues?.originLocationCode || 'MDE');
  const [originText, setOriginText] = useState(
    initialValues?.originLocationCode ? `${initialValues.originLocationCode}` : 'Medellín (MDE)'
  );

  const [destination, setDestination] = useState(initialValues?.destinationLocationCode || 'MIA');
  const [destinationText, setDestinationText] = useState(
    initialValues?.destinationLocationCode ? `${initialValues.destinationLocationCode}` : 'Miami (MIA)'
  );

  const [departureDate, setDepartureDate] = useState(
    initialValues?.departureDate || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]
  );
  const [returnDate, setReturnDate] = useState(
    initialValues?.returnDate || new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0]
  );

  const [adults, setAdults] = useState(initialValues?.adults || 1);
  const [children, setChildren] = useState(initialValues?.children || 0);
  const [travelClass, setTravelClass] = useState<'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST'>(
    initialValues?.travelClass || 'ECONOMY'
  );

  const swapLocations = () => {
    const tempIata = origin;
    const tempTxt = originText;
    setOrigin(destination);
    setOriginText(destinationText);
    setDestination(tempIata);
    setDestinationText(tempTxt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!origin || !destination) {
      alert('Por favor selecciona un origen y destino válidos.');
      return;
    }

    const params: SearchFlightParams = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
      children,
      travelClass,
      ...(tripType === 'ROUND_TRIP' && returnDate ? { returnDate } : {})
    };

    if (onSearchSubmit) {
      onSearchSubmit(params);
    } else {
      const query = new URLSearchParams({
        origin,
        destination,
        departureDate,
        adults: adults.toString(),
        children: children.toString(),
        travelClass,
        ...(tripType === 'ROUND_TRIP' && returnDate ? { returnDate } : {})
      }).toString();

      navigate(`/vuelos?${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-surface dark:bg-inverse-surface rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-2xl transition-all ${
        compact ? 'max-w-4xl mx-auto' : 'max-w-5xl mx-auto'
      }`}
    >
      {/* Selector de Tipo de Viaje y Clase */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-outline-variant/20">
        <div className="flex items-center gap-2 bg-surface-container-low dark:bg-surface-container-high p-1.5 rounded-full border border-outline-variant/30">
          <button
            type="button"
            onClick={() => setTripType('ROUND_TRIP')}
            className={`px-5 py-2 rounded-full font-label-md text-xs font-bold transition-all ${
              tripType === 'ROUND_TRIP'
                ? 'bg-primary text-on-primary shadow-md'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Ida y Vuelta
          </button>
          <button
            type="button"
            onClick={() => setTripType('ONE_WAY')}
            className={`px-5 py-2 rounded-full font-label-md text-xs font-bold transition-all ${
              tripType === 'ONE_WAY'
                ? 'bg-primary text-on-primary shadow-md'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Solo Ida
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-container-low dark:bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant/30">
            <SlidersHorizontal className="w-4 h-4 text-primary shrink-0" />
            <select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value as any)}
              className="bg-transparent font-bold text-xs text-on-surface focus:outline-none cursor-pointer"
            >
              <option value="ECONOMY">Económica</option>
              <option value="PREMIUM_ECONOMY">Premium Economy</option>
              <option value="BUSINESS">Ejecutiva / Business</option>
              <option value="FIRST">Primera Clase</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inputs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Origen */}
        <div className="md:col-span-4">
          <AirportAutocomplete
            label="Origen"
            placeholder="Ciudad de salida"
            value={originText}
            onChange={(code, name) => {
              setOrigin(code);
              setOriginText(name);
            }}
          />
        </div>

        {/* Botón intercambiar */}
        <div className="md:col-span-1 flex justify-center pb-1">
          <button
            type="button"
            onClick={swapLocations}
            className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary-container hover:text-on-primary text-primary flex items-center justify-center transition-all duration-300 shadow-sm border border-outline-variant/30 active:scale-90"
            title="Intercambiar origen y destino"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Destino */}
        <div className="md:col-span-4">
          <AirportAutocomplete
            label="Destino"
            placeholder="Ciudad de llegada"
            value={destinationText}
            onChange={(code, name) => {
              setDestination(code);
              setDestinationText(name);
            }}
            iconColor="text-secondary"
          />
        </div>

        {/* Pasajeros */}
        <div className="md:col-span-3 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Adultos
            </label>
            <div className="relative flex items-center">
              <Users className="w-4 h-4 absolute left-3 text-primary shrink-0" />
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full pl-9 pr-2 py-3 bg-surface-container-low dark:bg-surface-container-high rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                <option value={1}>1 Ad</option>
                <option value={2}>2 Ad</option>
                <option value={3}>3 Ad</option>
                <option value={4}>4 Ad</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Niños
            </label>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full px-3 py-3 bg-surface-container-low dark:bg-surface-container-high rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value={0}>0 Niños</option>
              <option value={1}>1 Niño</option>
              <option value={2}>2 Niños</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fechas y Botón Buscar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mt-4">
        {/* Fecha Ida */}
        <div className={tripType === 'ROUND_TRIP' ? 'md:col-span-4' : 'md:col-span-8'}>
          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
            Fecha de Ida
          </label>
          <div className="relative flex items-center">
            <Calendar className="w-5 h-5 absolute left-3.5 text-primary shrink-0" />
            <input
              type="date"
              value={departureDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-surface-container-low dark:bg-surface-container-high rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Fecha Regreso */}
        {tripType === 'ROUND_TRIP' && (
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Fecha de Regreso
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-5 h-5 absolute left-3.5 text-secondary shrink-0" />
              <input
                type="date"
                value={returnDate}
                min={departureDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-surface-container-low dark:bg-surface-container-high rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {/* Botón Buscar */}
        <div className="md:col-span-4">
          <button
            type="submit"
            className="btn-primary w-full py-3.5 rounded-xl font-label-md text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Buscar Vuelos</span>
          </button>
        </div>
      </div>
    </form>
  );
}
