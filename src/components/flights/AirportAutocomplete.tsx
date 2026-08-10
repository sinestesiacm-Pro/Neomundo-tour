import { useState, useEffect, useRef } from 'react';
import { MapPin, Plane, Loader2 } from 'lucide-react';
import { searchAirports } from '../../services/flightService';

interface Airport {
  iataCode: string;
  name: string;
  cityName: string;
  countryCode: string;
}

interface AirportAutocompleteProps {
  label: string;
  placeholder?: string;
  value: string; // iataCode or text
  onChange: (iataCode: string, name: string) => void;
  iconColor?: string;
}

const POPULAR_AIRPORTS: Airport[] = [
  { iataCode: 'MDE', name: 'José María Córdova', cityName: 'Medellín', countryCode: 'CO' },
  { iataCode: 'BOG', name: 'El Dorado', cityName: 'Bogotá', countryCode: 'CO' },
  { iataCode: 'CLO', name: 'Alfonso Bonilla Aragón', cityName: 'Cali', countryCode: 'CO' },
  { iataCode: 'CTG', name: 'Rafael Núñez', cityName: 'Cartagena', countryCode: 'CO' },
  { iataCode: 'MIA', name: 'Miami International', cityName: 'Miami', countryCode: 'US' },
  { iataCode: 'MAD', name: 'Adolfo Suárez Madrid-Barajas', cityName: 'Madrid', countryCode: 'ES' },
  { iataCode: 'JFK', name: 'John F. Kennedy', cityName: 'New York', countryCode: 'US' }
];

export default function AirportAutocomplete({
  label,
  placeholder = 'Buscar ciudad o aeropuerto...',
  value,
  onChange,
  iconColor = 'text-primary'
}: AirportAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchAirports(query);
        if (Array.isArray(results) && results.length > 0) {
          const mapped: Airport[] = results.map((loc: any) => ({
            iataCode: loc.iataCode,
            name: loc.name || loc.detailedName || loc.iataCode,
            cityName: loc.address?.cityName || loc.name,
            countryCode: loc.address?.countryCode || ''
          }));
          setSuggestions(mapped);
        } else {
          // Filter popular airports as fallback
          const filtered = POPULAR_AIRPORTS.filter(
            a =>
              a.cityName.toLowerCase().includes(query.toLowerCase()) ||
              a.iataCode.toLowerCase().includes(query.toLowerCase()) ||
              a.name.toLowerCase().includes(query.toLowerCase())
          );
          setSuggestions(filtered);
        }
      } catch (err) {
        console.error(err);
        const filtered = POPULAR_AIRPORTS.filter(
          a =>
            a.cityName.toLowerCase().includes(query.toLowerCase()) ||
            a.iataCode.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (airport: Airport) => {
    setQuery(`${airport.cityName} (${airport.iataCode})`);
    onChange(airport.iataCode, `${airport.cityName} (${airport.iataCode})`);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <label className="block text-xs font-outfit font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <div className="relative flex items-center">
        <Plane className={`w-5 h-5 absolute left-3.5 ${iconColor} shrink-0`} />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-11 pr-9 py-3.5 bg-white/90 rounded-2xl border border-slate-200/80 text-slate-900 font-sans font-semibold text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder-slate-400 shadow-sm"
        />
        {loading && <Loader2 className="w-4 h-4 animate-spin text-primary absolute right-3" />}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-64 overflow-y-auto animate-fade-in-up">
          {suggestions.length > 0 ? (
            <div>
              <div className="px-4 py-2 text-[10px] font-outfit font-extrabold text-primary uppercase tracking-wider bg-slate-50 border-b border-slate-100">
                Resultados Coincidentes
              </div>
              {suggestions.map((item) => (
                <button
                  key={`${item.iataCode}-${item.name}`}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="w-full px-4 py-3 text-left hover:bg-slate-100/80 flex items-center justify-between border-b border-slate-100 last:border-0 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <span className="font-outfit font-bold text-slate-900 text-sm block">
                        {item.cityName} {item.countryCode ? `(${item.countryCode})` : ''}
                      </span>
                      <span className="text-xs text-slate-500 line-clamp-1">{item.name}</span>
                    </div>
                  </div>
                  <span className="font-black text-xs px-2.5 py-1 bg-primary/10 rounded-md text-primary font-mono border border-primary/20">
                    {item.iataCode}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <div className="px-4 py-2 text-[10px] font-outfit font-extrabold text-primary uppercase tracking-wider bg-slate-50 border-b border-slate-100">
                Aeropuertos Populares
              </div>
              {POPULAR_AIRPORTS.map((item) => (
                <button
                  key={item.iataCode}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="w-full px-4 py-3 text-left hover:bg-slate-100/80 flex items-center justify-between border-b border-slate-100 last:border-0 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <span className="font-outfit font-bold text-slate-900 text-sm block">{item.cityName}</span>
                      <span className="text-xs text-slate-500">{item.name}</span>
                    </div>
                  </div>
                  <span className="font-black text-xs px-2.5 py-1 bg-primary/10 rounded-md text-primary font-mono border border-primary/20">
                    {item.iataCode}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
