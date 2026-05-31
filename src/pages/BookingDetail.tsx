import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { experiences } from '../data/experiences';
import InnovativeGallery from '../components/InnovativeGallery';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import { MapPin, Users, CalendarDays, Compass, Star, ChevronLeft, ArrowRight, Check } from 'lucide-react';

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
        <h2 className="font-headline text-2xl font-bold">Experience not found</h2>
        <p className="text-on-surface-variant mt-2 mb-6">The experience you are looking for does not exist or has been removed.</p>
        <Link to="/experiences" className="btn-primary px-6 py-3 rounded-full font-bold">
          Back to Catalog
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
          <span>Back to Catalog</span>
        </Link>
        <span className="text-xs text-outline font-medium uppercase tracking-widest hidden sm:inline-block">
          Guatapé Premium Adventures
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
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-black text-on-surface leading-tight">
              {experience.title}
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
                    <span>Up to {isStay ? 12 : 15} Pax</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-surface-container-high px-4 py-1.5 rounded-full">
                    <CalendarDays className="w-4 h-4 text-primary shrink-0" />
                    <span>Premium Booking</span>
                  </span>
                </>
              )}
            </div>
          </div>

          <hr className="border-outline-variant/30" />

          {/* Description Block */}
          <div className="space-y-4">
            <h2 className="font-headline text-2xl font-bold text-on-surface">About this experience</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed whitespace-pre-line">
              {experience.longDescription}
            </p>
          </div>

          <hr className="border-outline-variant/30" />

          {/* Amenities/Offerings Lists */}
          <div className="space-y-6">
            <h2 className="font-headline text-2xl font-bold text-on-surface">What's included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
              {(experience.amenities || ["Safety Gear", "Expert Captain", "Premium Cooler", "Bilingual Guide", "Fuel & Taxes", "VIP Experience"]).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-on-surface-variant hover:-translate-y-0.5 hover:text-primary transition-all duration-300 cursor-default">
                  <div className="w-6 h-6 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-body-md text-body-md font-medium">{item}</span>
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
                Instant confirmation
              </span>
            </div>

            {/* Interactive Availability Calendar */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Select Dates
              </label>
              <AvailabilityCalendar 
                pricePerNight={experience.price} 
                onSelectDates={handleSelectDates} 
              />
            </div>

            {/* Select guests count */}
            <div className="space-y-2">
              <label htmlFor="guest-select" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Guests
              </label>
              <select
                id="guest-select"
                value={numGuests}
                onChange={(e) => setNumGuests(Number(e.target.value))}
                className="w-full p-4 rounded-xl border border-outline-variant bg-white font-medium text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>
                    {g} {g === 1 ? 'Guest' : 'Guests'}
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
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <div className="w-full text-center py-4 bg-surface-container-low text-outline text-xs font-bold rounded-2xl uppercase tracking-wider border border-dashed border-outline-variant/50">
                Please select {isStay ? 'dates range' : 'booking date'} above
              </div>
            )}

            <p className="text-center text-xs text-outline">You won't be charged yet. Complete checkout next.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
