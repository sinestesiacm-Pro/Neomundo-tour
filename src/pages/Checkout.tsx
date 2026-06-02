import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CreditCard, Landmark, CheckCircle, ShieldCheck, Mail, Phone, CalendarRange, Clock, Sparkles } from 'lucide-react';

interface BookingState {
  experienceId: string;
  experienceTitle: string;
  experienceImage: string;
  experienceCategory: string;
  pricePerUnit: number;
  priceUnit: string;
  checkIn: string;
  checkOut: string | null;
  nights: number;
  guests: number;
  subtotal: number;
}

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Cast location state
  const state = location.state as { booking: BookingState } | undefined;
  const booking = state?.booking;

  // Checkout forms state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+57');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pse' | 'whatsapp'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Success overlay state
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode] = useState(() => Math.random().toString(36).substring(2, 9).toUpperCase());

  // Calculates booking calculations
  const price = booking ? booking.pricePerUnit : 0;
  const nights = booking ? booking.nights : 1;
  const subtotal = price * nights;
  const taxes = subtotal * 0.19; // 19% IVA Colombia
  const total = subtotal + taxes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone) {
      alert('Por favor, completa todos los datos del huésped.');
      return;
    }
    setIsSuccess(true);
  };

    if (!booking) {
      return (
        <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4">
          <span className="material-symbols-outlined text-5xl text-outline mb-4">shopping_cart</span>
          <h2 className="font-headline text-2xl font-bold">Tu carrito de reserva está vacío</h2>
          <p className="text-on-surface-variant mt-2 mb-6">Elige una experiencia o estadía para configurar la disponibilidad y proceder al pago.</p>
          <Link to="/experiences" className="btn-secondary px-6 py-3.5 rounded-full font-bold inline-flex items-center gap-2">
            Explorar Experiencias
          </Link>
        </div>
      );
    }

  return (
    <div className="pt-28 pb-20 relative">
      
      {/* Immersive success overlay modal */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-inverse-surface rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl border border-outline-variant/30 space-y-6 relative overflow-hidden animate-fade-in-up">
            
            {/* Sparkle decorative background elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary-container/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-container/10 rounded-full blur-2xl" />

            <div className="w-20 h-20 bg-secondary/15 rounded-full flex items-center justify-center mx-auto text-secondary">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Confirmada</span>
              </span>
              <h2 className="font-headline text-2xl md:text-3xl font-black text-on-surface">
                ¡Reserva Confirmada!
              </h2>
              <p className="text-on-surface-variant text-sm">
                ¡Gracias, {firstName}! Tu viaje está seguro. Hemos enviado el voucher de confirmación a <span className="font-bold text-primary">{email}</span>.
              </p>
            </div>

            {/* Booking Details Summary box */}
            <div className="bg-surface-container-low dark:bg-inverse-surface/30 p-5 rounded-2xl border border-outline-variant/20 text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-outline">Código de Reserva:</span>
                <span className="font-bold text-on-surface">{bookingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Experiencia:</span>
                <span className="font-bold text-on-surface">{booking.experienceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Fecha de Check-In:</span>
                <span className="font-bold text-on-surface">{booking.checkIn}</span>
              </div>
              {booking.checkOut && (
                <div className="flex justify-between">
                  <span className="text-outline">Fecha de Check-Out:</span>
                  <span className="font-bold text-on-surface">{booking.checkOut}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-outline-variant/20 font-bold text-primary">
                <span>Total Pagado:</span>
                <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/573226054919?text=Hola,%20tengo%20una%20reserva%20confirmada%20con%20código%20${bookingCode}`}
                target="_blank"
                rel="noreferrer"
                className="w-full btn-secondary text-white font-bold py-3.5 rounded-xl text-center shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-100 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Chatear por WhatsApp</span>
              </a>
              <button
                onClick={() => navigate('/')}
                className="w-full py-3.5 border-2 border-outline-variant rounded-xl font-bold hover:bg-surface-container-high transition-all"
              >
                Volver al Inicio
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Main Grid Checkout content */}
      <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        
        {/* Title */}
        <div className="mb-12 text-center md:text-left animate-fade-in-up">
          <h1 className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
            <span className="font-sans font-bold text-3xl md:text-4xl text-on-surface">Completa</span>
            <span className="font-serif italic font-black text-4xl md:text-5xl text-primary">tu</span>
            <span className="font-handwriting text-5xl md:text-6xl text-secondary -rotate-3 translate-y-1">reserva</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            ¡Casi listo! Solo necesitamos algunos detalles para asegurar tu experiencia premium en Guatapé.
          </p>
        </div>

        {/* Content Columns Split */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          
          {/* Left Column Forms (8 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            
            {/* Guest details section */}
            <section className="glass-panel p-6 md:p-8 rounded-3xl tropical-shadow relative overflow-hidden space-y-6">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-container" />
              
              <h2 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                <span>Detalles del Huésped</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="firstName">Nombre</label>
                  <input 
                    id="firstName" 
                    placeholder="Jane" 
                    required 
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-4 rounded-xl border border-outline-variant bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="lastName">Apellido</label>
                  <input 
                    id="lastName" 
                    placeholder="Doe" 
                    required 
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-4 rounded-xl border border-outline-variant bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="email">Correo Electrónico</label>
                  <div className="relative">
                    <input 
                      id="email" 
                      placeholder="jane@example.com" 
                      required 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-4 pl-12 rounded-xl border border-outline-variant bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                    />
                    <Mail className="w-5 h-5 text-outline absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-[11px] text-outline">La confirmación de la reserva y los vouchers se enviarán aquí.</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="phone">Número de Teléfono</label>
                  <div className="flex rounded-xl border border-outline-variant overflow-hidden bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300">
                    <select 
                      value={countryCode} 
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-1/3 p-4 border-r border-outline-variant bg-surface-container-low font-bold text-sm focus:outline-none cursor-pointer"
                    >
                      <option value="+57">+57 (CO)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                    </select>
                    <input 
                      id="phone" 
                      placeholder="322 605 4919" 
                      required 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-2/3 p-4 bg-transparent focus:outline-none font-medium"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method section */}
            <section className="glass-panel p-6 md:p-8 rounded-3xl tropical-shadow relative overflow-hidden space-y-6">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
              
              <h2 className="font-headline text-2xl font-bold text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                <span>Método de Pago</span>
              </h2>

              <div className="space-y-4">
                {/* Option 1: Credit Card */}
                <label className="block cursor-pointer relative group">
                  <input 
                    checked={paymentMethod === 'card'} 
                    onChange={() => setPaymentMethod('card')} 
                    name="payment_method" 
                    type="radio" 
                    className="sr-only peer"
                  />
                  <div className="p-5 border border-outline-variant rounded-2xl peer-checked:border-primary-container peer-checked:bg-primary-fixed/5 hover:border-primary-container/50 hover:bg-surface-container-low transition-all duration-300 flex items-center justify-between">
                    <div className="flex items-center gap-4 group-hover:translate-x-1 transition-transform">
                      <CreditCard className="w-5 h-5 text-outline peer-checked:text-primary-container" />
                      <span className="font-bold text-on-surface text-base">Tarjeta de Crédito / Débito</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-5 bg-surface-dim rounded flex items-center justify-center text-[10px] font-black text-outline shadow-sm">VISA</div>
                      <div className="w-8 h-5 bg-surface-dim rounded flex items-center justify-center text-[10px] font-black text-outline shadow-sm">MC</div>
                    </div>
                  </div>
                  {/* Expanded Card Details form */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out px-4 ${paymentMethod === 'card' ? 'max-h-96 opacity-100 py-4 space-y-4' : 'max-h-0 opacity-0'}`}>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="cardNumber">Número de Tarjeta</label>
                      <input 
                        id="cardNumber" 
                        placeholder="0000 0000 0000 0000" 
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-4 rounded-xl border border-outline-variant bg-white focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="expiry">Fecha de Vencimiento</label>
                        <input 
                          id="expiry" 
                          placeholder="MM/YY" 
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full p-4 rounded-xl border border-outline-variant bg-white focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="cvv">CVV</label>
                        <input 
                          id="cvv" 
                          placeholder="123" 
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full p-4 rounded-xl border border-outline-variant bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </label>

                {/* Option 2: PSE */}
                <label className="block cursor-pointer relative group">
                  <input 
                    checked={paymentMethod === 'pse'} 
                    onChange={() => setPaymentMethod('pse')} 
                    name="payment_method" 
                    type="radio" 
                    className="sr-only peer"
                  />
                  <div className="p-5 border border-outline-variant rounded-2xl peer-checked:border-primary-container peer-checked:bg-primary-fixed/5 hover:border-primary-container/50 hover:bg-surface-container-low transition-all duration-300 flex items-center justify-between">
                    <div className="flex items-center gap-4 group-hover:translate-x-1 transition-transform">
                      <Landmark className="w-5 h-5 text-outline" />
                      <span className="font-bold text-on-surface text-base">PSE (Transferencia Bancaria)</span>
                    </div>
                    <span className="text-[10px] bg-primary-container text-white px-2 py-0.5 rounded-full font-bold uppercase">COL</span>
                  </div>
                </label>

                {/* Option 3: WhatsApp booking */}
                <label className="block cursor-pointer relative group">
                  <input 
                    checked={paymentMethod === 'whatsapp'} 
                    onChange={() => setPaymentMethod('whatsapp')} 
                    name="payment_method" 
                    type="radio" 
                    className="sr-only peer"
                  />
                  <div className="p-5 border border-outline-variant rounded-2xl peer-checked:border-secondary peer-checked:bg-secondary-fixed/5 hover:border-secondary/50 hover:bg-surface-container-low transition-all duration-300 flex items-center justify-between">
                    <div className="flex items-center gap-4 group-hover:translate-x-1 transition-transform">
                      <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                      <span className="font-bold text-on-surface text-base">Reserva y paga vía WhatsApp</span>
                    </div>
                    <span className="text-[10px] bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full font-bold uppercase">Más rápido</span>
                  </div>
                </label>
              </div>
            </section>

            {/* Special Request */}
            <section className="glass-panel p-6 md:p-8 rounded-3xl tropical-shadow space-y-4">
              <h2 className="font-headline text-xl font-bold text-on-surface">Peticiones Especiales (Opcional)</h2>
              <textarea 
                placeholder="¿Algún requerimiento dietético, celebración o necesidad especial?"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full p-4 rounded-xl border border-outline-variant bg-white font-medium text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-y min-h-[100px]"
              />
            </section>

          </div>

          {/* Right Column sticky summary card (4 Cols) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28 space-y-6">
            <div className="glass-panel rounded-3xl overflow-hidden shadow-xl border border-outline-variant/30 hover:shadow-2xl transition-shadow duration-300">
              
              {/* Cover visual banner */}
              <div className="h-32 bg-primary relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src={booking.experienceImage} 
                  alt={booking.experienceTitle}
                />
                <div className="absolute bottom-4 left-6 z-20">
                  <h3 className="font-headline text-xl font-bold text-white">Tu Itinerario</h3>
                </div>
              </div>

              {/* Summary calculations */}
              <div className="p-6 space-y-6">
                
                {/* Details layout */}
                <div className="flex gap-4 items-start pb-6 border-b border-outline-variant/30">
                  <div className="bg-primary-container/10 p-3 rounded-xl text-primary shrink-0">
                    <CalendarRange className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-headline font-bold text-on-surface text-base">{booking.experienceTitle}</h4>
                    <p className="text-xs font-semibold text-outline">Categoría: {booking.experienceCategory}</p>
                    <p className="text-xs font-semibold text-outline">Check-In: {booking.checkIn}</p>
                    {booking.checkOut && (
                      <p className="text-xs font-semibold text-outline">Check-Out: {booking.checkOut}</p>
                    )}
                    <p className="text-xs font-bold text-secondary flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{nights} {booking.priceUnit === 'night' ? 'Noches' : 'Cant'} • {booking.guests} Huéspedes</span>
                    </p>
                  </div>
                </div>

                {/* Subtotals & Taxes table */}
                <div className="space-y-3 font-semibold text-sm text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impuestos y Cargos (19% IVA)</span>
                    <span>${taxes.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <hr className="border-outline-variant/30 pt-2" />
                  <div className="flex justify-between items-center text-on-surface">
                    <span className="font-headline text-lg font-bold">Total</span>
                    <span className="font-headline text-2xl font-black text-primary">
                      ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="w-full bg-secondary hover:bg-[#008a23] active:bg-[#005415] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group relative overflow-hidden cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5 shrink-0 transform group-hover:scale-105" />
                  <span>Confirmar y Asegurar Reserva</span>
                </button>
                
                <p className="text-center text-[10px] text-outline leading-relaxed">
                  Al completar la reserva, aceptas los Términos de Servicio y políticas de reembolso de Neomundo Tour.
                </p>

              </div>
            </div>
          </div>

        </form>
      </main>
    </div>
  );
}
