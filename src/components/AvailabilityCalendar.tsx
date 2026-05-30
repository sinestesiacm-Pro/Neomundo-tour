import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface AvailabilityCalendarProps {
  pricePerNight: number;
  onSelectDates: (checkIn: Date | null, checkOut: Date | null, nights: number) => void;
}

export default function AvailabilityCalendar({ pricePerNight, onSelectDates }: AvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  // Month navigation
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Days in month logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const totalDays = new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
  const emptyPads = Array.from({ length: firstDayIndex === 0 ? 6 : firstDayIndex - 1 }, (_, i) => i); // Pad to start week on Monday

  const monthsEnglish = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month, day);

    // If checkIn isn't set, or both are set already, start over
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(clickedDate);
      setCheckOut(null);
      onSelectDates(clickedDate, null, 0);
    } else if (clickedDate < checkIn) {
      // If clicked date is before checkIn, make it the new checkIn
      setCheckIn(clickedDate);
      setCheckOut(null);
      onSelectDates(clickedDate, null, 0);
    } else if (clickedDate.getTime() === checkIn.getTime()) {
      // De-select checkIn if clicked again
      setCheckIn(null);
      onSelectDates(null, null, 0);
    } else {
      // Set checkOut
      setCheckOut(clickedDate);
      const diffTime = Math.abs(clickedDate.getTime() - checkIn.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      onSelectDates(checkIn, clickedDate, diffDays);
    }
  };

  const isSelected = (day: number) => {
    const d = new Date(year, month, day);
    if (checkIn && d.getTime() === checkIn.getTime()) return 'bg-secondary text-white rounded-l-full';
    if (checkOut && d.getTime() === checkOut.getTime()) return 'bg-secondary text-white rounded-r-full';
    if (checkIn && checkOut && d > checkIn && d < checkOut) return 'bg-primary-fixed/30 text-primary dark:text-primary-fixed';
    return '';
  };

  const isPast = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(year, month, day);
    return d < today;
  };

  const getNights = () => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const nights = getNights();

  return (
    <div className="bg-white dark:bg-inverse-surface border border-outline-variant/30 rounded-2xl p-5 shadow-lg max-w-sm mx-auto">
      {/* Month Selection Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{monthsEnglish[month]} {year}</span>
        </h4>
        <div className="flex gap-1">
          <button 
            type="button" 
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-surface-container-high transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-on-surface-variant" />
          </button>
          <button 
            type="button" 
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-surface-container-high transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-on-surface-variant" />
          </button>
        </div>
      </div>

      {/* Week Days Headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-outline mb-2">
        <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-0.5 text-center">
        {/* Empty Padding days */}
        {emptyPads.map((_, idx) => (
          <div key={`pad-${idx}`} className="h-9" />
        ))}
        {/* Active Days */}
        {daysArray.map((day) => {
          const past = isPast(day);
          const activeClasses = isSelected(day);
          return (
            <button
              key={`day-${day}`}
              type="button"
              disabled={past}
              onClick={() => handleDateClick(day)}
              className={`h-9 w-full flex items-center justify-center font-medium text-sm transition-all duration-150 ${
                past 
                  ? 'text-outline/40 cursor-not-allowed line-through' 
                  : activeClasses
                    ? activeClasses
                    : 'text-on-surface hover:bg-primary-fixed/20 hover:rounded-full'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Booking selection status indicator */}
      <div className="mt-6 pt-4 border-t border-outline-variant/20 space-y-4">
        <div className="flex justify-between text-xs text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-secondary block" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary-fixed block" />
            <span>Range</span>
          </div>
        </div>

        {checkIn && (
          <div className="bg-surface-container-low dark:bg-inverse-surface/30 p-3 rounded-xl space-y-2 text-sm text-on-surface-variant border border-outline-variant/10">
            <div className="flex justify-between">
              <span className="font-semibold">Check-In:</span>
              <span className="text-primary font-bold">{checkIn.toLocaleDateString()}</span>
            </div>
            {checkOut && (
              <>
                <div className="flex justify-between">
                  <span className="font-semibold">Check-Out:</span>
                  <span className="text-primary font-bold">{checkOut.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-outline-variant/10 text-on-surface">
                  <span className="font-bold">Total Nights:</span>
                  <span className="font-bold text-secondary">{nights} Nights</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-primary mt-2">
                  <span>Price:</span>
                  <span className="text-secondary-fixed-dim bg-secondary px-3 py-0.5 rounded-full text-white text-base">
                    ${(nights * pricePerNight).toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
