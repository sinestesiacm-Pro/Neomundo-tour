import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Users, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft, Loader2, CreditCard, Lock } from 'lucide-react';
import { bookFlight } from '../services/flightService';
import type { TravelerData } from '../services/flightService';

export default function FlightCheckout() {
  const [confirmedOffer, setConfirmedOffer] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('1995-01-01');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [email, setEmail] = useState('');
  const [phoneCode, setPhoneCode] = useState('57');
  const [phone, setPhone] = useState('');
  const [documentType, setDocumentType] = useState<'PASSPORT' | 'IDENTITY_CARD'>('PASSPORT');
  const [documentNumber, setDocumentNumber] = useState('');
  const [documentExpiry, setDocumentExpiry] = useState('2030-01-01');
  const [nationality, setNationality] = useState('CO');

  useEffect(() => {
    const storedOffer = sessionStorage.getItem('selected_flight_offer');
    if (storedOffer) {
      try {
        setConfirmedOffer(JSON.parse(storedOffer));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!confirmedOffer && !bookingSuccess) {
    return (
      <div className="pt-32 pb-24 text-center px-4 max-w-md mx-auto">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h2 className="font-headline text-2xl font-bold mb-2">No has seleccionado ningún vuelo</h2>
        <p className="text-on-surface-variant text-sm mb-6">
          Por favor busca y selecciona un vuelo antes de ingresar al checkout.
        </p>
        <Link to="/vuelos" className="btn-primary px-6 py-3 rounded-full font-bold text-xs inline-flex items-center gap-2">
          <Plane className="w-4 h-4" />
          <span>Ir al Buscador de Vuelos</span>
        </Link>
      </div>
    );
  }

  const price = confirmedOffer?.price || {};
  const totalPrice = parseFloat(price.grandTotal || price.total || '0').toLocaleString('es-CO');
  const currency = price.currency || 'USD';

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const traveler: TravelerData = {
      id: '1',
      dateOfBirth,
      name: {
        firstName: firstName.toUpperCase().trim(),
        lastName: lastName.toUpperCase().trim()
      },
      gender,
      contact: {
        emailAddress: email.trim(),
        phones: [
          {
            deviceType: 'MOBILE',
            countryCallingCode: phoneCode.replace('+', ''),
            number: phone.trim()
          }
        ]
      },
      documents: [
        {
          documentType,
          number: documentNumber.trim(),
          expiryDate: documentExpiry,
          issuanceCountry: nationality,
          nationality,
          holder: true
        }
      ]
    };

    try {
      const response = await bookFlight(confirmedOffer, [traveler]);
      setBookingSuccess(response);
      sessionStorage.removeItem('selected_flight_offer');
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'No se pudo completar la reserva. Revisa los datos ingresados.');
    } finally {
      setLoading(false);
    }
  };

  // Render Éxito de Reserva (PNR Generado)
  if (bookingSuccess) {
    const bookingData = bookingSuccess?.data || {};
    const pnr = bookingData?.associatedRecords?.[0]?.reference || bookingData?.id || 'CONFIRMED';

    return (
      <div className="pt-28 pb-24 px-margin-mobile md:px-margin-desktop max-w-2xl mx-auto">
        <div className="bg-surface dark:bg-inverse-surface rounded-3xl p-8 md:p-12 border border-emerald-500/30 shadow-2xl text-center space-y-6 animate-fade-in-up">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              ¡Reserva Confirmada!
            </span>
            <h1 className="font-headline text-3xl md:text-4xl font-black text-on-surface mt-1">
              Tu Vuelo ha sido Emitido
            </h1>
          </div>

          {/* Código PNR */}
          <div className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/30 inline-block w-full max-w-sm">
            <span className="text-xs text-on-surface-variant font-bold uppercase block mb-1">
              Código Localizador de la Aerolínea (PNR)
            </span>
            <span className="font-mono text-4xl font-black text-primary tracking-wider block">
              {pnr}
            </span>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            Hemos enviado la confirmación y tus e-tickets al correo <strong className="text-on-surface">{email || 'registrado'}</strong>. Guarda tu código PNR para realizar el Check-In en la aerolínea.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/vuelos" className="btn-primary px-8 py-3.5 rounded-full font-bold text-xs">
              Reservar Otro Vuelo
            </Link>
            <Link to="/" className="btn-secondary px-8 py-3.5 rounded-full font-bold text-xs">
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      {/* Botón Volver */}
      <div className="mb-6">
        <Link to="/vuelos" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Lista de Vuelos</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Formulario de Pasajeros y Pago (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <form onSubmit={handleBookingSubmit} className="space-y-8">
            {/* Sección 1: Datos del Pasajero Principal */}
            <div className="bg-surface dark:bg-inverse-surface rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-headline text-xl font-bold text-on-surface">
                  Datos del Pasajero Principal
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Nombres (Como en el documento) *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ej: CARLOS ALBERTO"
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Apellidos (Como en el documento) *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Ej: TOCORA GARCIA"
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Fecha de Nacimiento *
                  </label>
                  <input
                    type="date"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Género *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-sm focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
                  >
                    <option value="MALE">Masculino</option>
                    <option value="FEMALE">Femenino</option>
                  </select>
                </div>
              </div>

              {/* Documento y Contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/20">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Tipo de Documento *
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value as any)}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-sm focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
                  >
                    <option value="PASSPORT">Pasaporte</option>
                    <option value="IDENTITY_CARD">Documento de Identidad / Cédula</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Número de Documento *
                  </label>
                  <input
                    type="text"
                    required
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="Ej: A12345678"
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Vencimiento del Documento *
                  </label>
                  <input
                    type="date"
                    required
                    value={documentExpiry}
                    onChange={(e) => setDocumentExpiry(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Nacionalidad (Código de País) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value.toUpperCase())}
                    placeholder="CO, US, ES, MX..."
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Correo Electrónico (Notificaciones) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Teléfono Móvil *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={`+${phoneCode}`}
                      onChange={(e) => setPhoneCode(e.target.value)}
                      className="w-20 px-3 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface font-mono font-bold text-xs text-center"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="322 605 4919"
                      className="flex-1 px-4 py-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-on-surface font-semibold text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sección 2: Pago Seguro */}
            <div className="bg-surface dark:bg-inverse-surface rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <h3 className="font-headline text-xl font-bold text-on-surface">
                    Pago de la Reserva
                  </h3>
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Conexión Encriptada SSL</span>
                </span>
              </div>

              {error && (
                <div className="bg-error-container/10 p-4 rounded-xl border border-error/20 flex items-center gap-3 text-xs text-error font-bold">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 rounded-2xl font-label-md text-base font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl active:scale-98 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Emitiendo Reserva en Amadeus...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Confirmar y Emitir Reserva (${totalPrice} {currency})</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Resumen de Vuelo (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-surface dark:bg-inverse-surface rounded-3xl p-6 border border-outline-variant/30 shadow-lg sticky top-28 space-y-6">
            <h3 className="font-headline text-lg font-bold text-on-surface pb-3 border-b border-outline-variant/20">
              Resumen de tu Viaje
            </h3>

            {/* Vuelo seleccionado */}
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary flex items-center gap-1.5">
                  <Plane className="w-4 h-4" />
                  <span>Vuelo {confirmedOffer?.validatingAirlineCodes?.[0]}</span>
                </span>
                <span className="bg-surface-container-high px-2.5 py-1 rounded-full font-bold text-[10px] text-on-surface">
                  Tarifa Confirmada
                </span>
              </div>

              {confirmedOffer?.itineraries?.map((it: any, idx: number) => (
                <div key={idx} className="bg-surface-container-low p-3.5 rounded-xl space-y-1">
                  <span className="font-bold text-on-surface uppercase text-[10px] text-outline block">
                    {idx === 0 ? 'Ida' : 'Regreso'}
                  </span>
                  <div className="font-bold text-sm text-on-surface flex justify-between">
                    <span>{it.segments?.[0]?.departure?.iataCode} ➔ {it.segments?.[it.segments.length - 1]?.arrival?.iataCode}</span>
                  </div>
                  <div className="text-on-surface-variant text-[11px]">
                    Salida: {new Date(it.segments?.[0]?.departure?.at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Desglose Tarifario */}
            <div className="pt-4 border-t border-outline-variant/20 space-y-2 text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Tarifa Base</span>
                <span>${(parseFloat(price.base || price.grandTotal) * 0.85).toLocaleString('es-CO')} {currency}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Impuestos de Aeropuerto</span>
                <span>${(parseFloat(price.grandTotal) * 0.15).toLocaleString('es-CO')} {currency}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-on-surface pt-3 border-t border-outline-variant/20">
                <span>Total a Pagar</span>
                <span className="text-primary">${totalPrice} {currency}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
