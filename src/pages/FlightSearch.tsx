import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Plane, Sparkles, Filter, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import FlightSearchWidget from '../components/flights/FlightSearchWidget';
import FlightCard from '../components/flights/FlightCard';
import { searchFlights, priceFlightOffer } from '../services/flightService';
import type { SearchFlightParams } from '../services/flightService';

export default function FlightSearch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [stopsFilter, setStopsFilter] = useState<'ALL' | 'DIRECT' | 'STOPS'>('ALL');
  const [sortBy, setSortBy] = useState<'PRICE' | 'DURATION'>('PRICE');
  const [pricingOfferId, setPricingOfferId] = useState<string | null>(null);

  // Extract params from URL
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate') || undefined;
  const adults = parseInt(searchParams.get('adults') || '1', 10);
  const travelClass = (searchParams.get('travelClass') as any) || 'ECONOMY';

  const initialParams: SearchFlightParams = {
    originLocationCode: origin || 'MDE',
    destinationLocationCode: destination || 'MIA',
    departureDate: departureDate || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    returnDate: returnDate || new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
    adults,
    travelClass
  };

  const fetchFlightOffers = async (params: SearchFlightParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchFlights(params);
      if (Array.isArray(data)) {
        setFlights(data);
      } else {
        setFlights([]);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'No se pudieron cargar los vuelos. Por favor intenta nuevamente.');
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (origin && destination && departureDate) {
      fetchFlightOffers(initialParams);
    }
  }, [searchParams]);

  // Handle selecting flight -> Reconfirm pricing -> Proceed to checkout
  const handleSelectFlight = async (offer: any) => {
    setPricingOfferId(offer.id);
    try {
      const priceResult = await priceFlightOffer(offer);
      const confirmedOffer = priceResult?.data?.flightOffers?.[0] || offer;

      // Save to sessionStorage for checkout page
      sessionStorage.setItem('selected_flight_offer', JSON.stringify(confirmedOffer));
      sessionStorage.setItem('search_flight_params', JSON.stringify(initialParams));

      // Navigate to checkout
      navigate('/vuelos/checkout');
    } catch (err: any) {
      console.error('Pricing Error:', err);
      alert('Hubo un problema al reconfirmar el precio de este vuelo. Por favor intenta con otra opción.');
    } finally {
      setPricingOfferId(null);
    }
  };

  // Filter & Sort
  const filteredFlights = flights.filter((offer) => {
    const firstItinerary = offer.itineraries?.[0] || {};
    const stops = (firstItinerary.segments?.length || 1) - 1;

    if (stopsFilter === 'DIRECT') return stops === 0;
    if (stopsFilter === 'STOPS') return stops > 0;
    return true;
  });

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === 'PRICE') {
      const priceA = parseFloat(a.price?.grandTotal || a.price?.total || '0');
      const priceB = parseFloat(b.price?.grandTotal || b.price?.total || '0');
      return priceA - priceB;
    }
    return 0;
  });

  return (
    <div className="pt-24 pb-20 bg-background text-on-background">
      {/* Header Sección Vuelos */}
      <header className="relative px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-12 md:py-16 text-center hero-pattern rounded-3xl mb-8 overflow-hidden border border-outline-variant/30">
        <div className="relative z-10 space-y-4">
          <span className="bg-primary/10 text-primary px-5 py-2 rounded-full font-outfit text-xs font-extrabold uppercase tracking-[0.2em] inline-flex items-center gap-2 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span>Neomundo Air Travel</span>
          </span>
          <h1 className="font-outfit font-black text-4xl sm:text-5xl lg:text-6xl text-on-surface uppercase tracking-tight">
            Busca y Reserva <span className="text-gradient-cyan font-syne lowercase italic">tus Vuelos</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto">
            Conecta con más de 500 aerolíneas en el mundo al mejor precio garantizado.
          </p>
        </div>
      </header>

      {/* Buscador de Vuelos */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-12">
        <FlightSearchWidget initialValues={initialParams} />
      </section>

      {/* Resultados de Vuelos */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Barra de Filtros */}
        {flights.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 glass-card p-5 rounded-3xl border border-white/20">
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-outfit font-extrabold uppercase tracking-wider text-white">Escalas:</span>
              <button
                onClick={() => setStopsFilter('ALL')}
                className={`px-4 py-2 rounded-full text-xs font-outfit font-extrabold transition-all uppercase tracking-wider ${
                  stopsFilter === 'ALL' ? 'bg-primary text-on-primary shadow-md emerald-glow' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Todos ({flights.length})
              </button>
              <button
                onClick={() => setStopsFilter('DIRECT')}
                className={`px-4 py-2 rounded-full text-xs font-outfit font-extrabold transition-all uppercase tracking-wider ${
                  stopsFilter === 'DIRECT' ? 'bg-primary text-on-primary shadow-md emerald-glow' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Solo Directos
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-outfit font-extrabold uppercase tracking-wider text-white">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/10 text-white font-outfit font-extrabold text-xs px-4 py-2 rounded-full border border-white/15 focus:outline-none cursor-pointer"
              >
                <option value="PRICE" className="bg-slate-900 text-white">Menor Precio</option>
              </select>
            </div>
          </div>
        )}

        {/* Cargando */}
        {loading && (
          <div className="text-center py-20 glass-card rounded-3xl border border-white/20 max-w-md mx-auto space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-cyan-400 mx-auto" />
            <h3 className="font-outfit text-xl font-bold text-white">Consultando vuelos en tiempo real...</h3>
            <p className="text-gray-400 text-xs font-sans">Conectando con la red global Amadeus.</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-16 bg-rose-950/40 rounded-3xl border border-rose-500/30 max-w-lg mx-auto space-y-4 text-white">
            <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="font-outfit text-xl font-bold text-rose-300">No pudimos obtener los vuelos</h3>
            <p className="text-gray-300 text-xs px-6 font-sans">{error}</p>
            <button
              onClick={() => fetchFlightOffers(initialParams)}
              className="btn-secondary px-6 py-2.5 rounded-full text-xs font-outfit font-extrabold inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reintentar Búsqueda</span>
            </button>
          </div>
        )}

        {/* Sin resultados */}
        {!loading && !error && origin && flights.length === 0 && (
          <div className="text-center py-20 glass-card rounded-3xl border border-white/20 max-w-md mx-auto space-y-3">
            <Plane className="w-12 h-12 text-gray-500 mx-auto mb-2 opacity-50" />
            <h3 className="font-outfit text-xl font-bold text-white">No encontramos vuelos para esta ruta</h3>
            <p className="text-gray-400 text-xs font-sans">
              Intenta cambiar las fechas o buscar con ciudades cercanas.
            </p>
          </div>
        )}

        {/* Lista de Tarjetas de Vuelo */}
        {!loading && !error && sortedFlights.length > 0 && (
          <div className="space-y-6">
            {sortedFlights.map((offer) => (
              <FlightCard
                key={offer.id}
                offer={offer}
                isLoading={pricingOfferId === offer.id}
                onSelect={handleSelectFlight}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
