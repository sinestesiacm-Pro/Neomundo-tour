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
      className={`glass-card-light rounded-[2.5rem] p-6 md:p-8 border border-white/80 shadow-[0_20px_50px_rgba(0,104,118,0.08)] transition-all ${
        compact ? 'max-w-4xl mx-auto' : 'max-w-5xl mx-auto'
      }`}
    >
      {/* Selector de Tipo de Viaje y Clase */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200/60">
        <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
          <button
            type="button"
            onClick={() => setTripType('ROUND_TRIP')}
            className={`px-5 py-2.5 rounded-full font-outfit text-xs font-extrabold uppercase tracking-wider transition-all ${
              tripType === 'ROUND_TRIP'
                ? 'bg-primary text-white shadow-md scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ida y Vuelta
          </button>
          <button
            type="button"
            onClick={() => setTripType('ONE_WAY')}
            className={`px-5 py-2.5 rounded-full font-outfit text-xs font-extrabold uppercase tracking-wider transition-all ${
              tripType === 'ONE_WAY'
                ? 'bg-primary text-white shadow-md scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Solo Ida
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100/80 px-4 py-2.5 rounded-full border border-slate-200/60">
            <SlidersHorizontal className="w-4 h-4 text-primary shrink-0" />
            <select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value as any)}
              className="bg-transparent font-outfit font-extrabold text-xs text-slate-800 focus:outline-none cursor-pointer"
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
            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-200 active:scale-90"
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
            iconColor="text-emerald-600"
          />
        </div>

        {/* Pasajeros */}
        <div className="md:col-span-3 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-outfit font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Adultos
            </label>
            <div className="relative flex items-center">
              <Users className="w-4 h-4 absolute left-3 text-primary shrink-0" />
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full pl-9 pr-2 py-3.5 bg-white/90 rounded-2xl border border-slate-200/80 text-slate-900 font-outfit font-extrabold text-xs focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm cursor-pointer"
              >
                <option value={1}>1 Adulto</option>
                <option value={2}>2 Adultos</option>
                <option value={3}>3 Adultos</option>
                <option value={4}>4 Adultos</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-outfit font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Niños
            </label>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full px-3 py-3.5 bg-white/90 rounded-2xl border border-slate-200/80 text-slate-900 font-outfit font-extrabold text-xs focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm cursor-pointer"
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
          <label className="block text-xs font-outfit font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
            Fecha de Ida
          </label>
          <div className="relative flex items-center">
            <Calendar className="w-5 h-5 absolute left-3.5 text-primary shrink-0" />
            <input
              type="date"
              value={departureDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white/90 rounded-2xl border border-slate-200/80 text-slate-900 font-sans font-semibold text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm"
            />
          </div>
        </div>

        {/* Fecha Regreso */}
        {tripType === 'ROUND_TRIP' && (
          <div className="md:col-span-4">
            <label className="block text-xs font-outfit font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Fecha de Regreso
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-5 h-5 absolute left-3.5 text-emerald-600 shrink-0" />
              <input
                type="date"
                value={returnDate}
                min={departureDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/90 rounded-2xl border border-slate-200/80 text-slate-900 font-sans font-semibold text-sm focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Botón Buscar */}
        <div className="md:col-span-4">
          <button
            type="submit"
            className="btn-primary w-full py-4 rounded-2xl font-outfit font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl active:scale-95 transition-all text-white"
          >
            <Search className="w-4 h-4" />
            <span>Buscar Vuelos</span>
          </button>
        </div>
      </div>
    </form>
  );
}
