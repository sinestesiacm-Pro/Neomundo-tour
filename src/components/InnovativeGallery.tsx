import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface InnovativeGalleryProps {
  images: string[];
  title: string;
}

export default function InnovativeGallery({ images, title }: InnovativeGalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Safeguard if we have less than 4 images, repeat or use defaults
  const displayImages = [...images];
  while (displayImages.length < 4) {
    displayImages.push(images[0] || 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62');
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % displayImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + displayImages.length) % displayImages.length);
    }
  };

  return (
    <section className="relative w-full">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl relative bg-black/5">
        
        {/* Main large image (left half) */}
        <div 
          onClick={() => setActiveIdx(0)}
          onMouseEnter={() => setHoveredIdx(0)}
          onMouseLeave={() => setHoveredIdx(null)}
          className="md:col-span-2 md:row-span-2 relative cursor-pointer overflow-hidden group h-full"
        >
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
          <motion.img 
            alt={`${title} - Main View`} 
            className="w-full h-full object-cover origin-center"
            src={displayImages[0]}
            animate={{ scale: hoveredIdx === 0 ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          {/* Overlay details */}
          <div className="absolute bottom-6 left-6 z-20 text-white drop-shadow-md">
            <span className="bg-primary/80 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
              Main View
            </span>
          </div>
        </div>

        {/* Top middle image */}
        <div 
          onClick={() => setActiveIdx(1)}
          onMouseEnter={() => setHoveredIdx(1)}
          onMouseLeave={() => setHoveredIdx(null)}
          className="hidden md:block relative cursor-pointer overflow-hidden group h-full"
        >
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
          <motion.img 
            alt={`${title} - Gallery Image 1`} 
            className="w-full h-full object-cover"
            src={displayImages[1]}
            animate={{ scale: hoveredIdx === 1 ? 1.08 : 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Top right image */}
        <div 
          onClick={() => setActiveIdx(2)}
          onMouseEnter={() => setHoveredIdx(2)}
          onMouseLeave={() => setHoveredIdx(null)}
          className="hidden md:block relative cursor-pointer overflow-hidden group h-full"
        >
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
          <motion.img 
            alt={`${title} - Gallery Image 2`} 
            className="w-full h-full object-cover"
            src={displayImages[2]}
            animate={{ scale: hoveredIdx === 2 ? 1.08 : 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Bottom right image (spanning 2 columns) */}
        <div 
          onClick={() => setActiveIdx(3)}
          onMouseEnter={() => setHoveredIdx(3)}
          onMouseLeave={() => setHoveredIdx(null)}
          className="hidden md:block md:col-span-2 relative cursor-pointer overflow-hidden group h-full"
        >
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
          <motion.img 
            alt={`${title} - Gallery Image 3`} 
            className="w-full h-full object-cover"
            src={displayImages[3]}
            animate={{ scale: hoveredIdx === 3 ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          {/* Immersive gallery trigger overlay button */}
          <div className="absolute bottom-6 right-6 z-20">
            <button className="bg-surface/90 backdrop-blur-md px-5 py-2.5 rounded-full font-semibold text-xs md:text-sm text-primary flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:bg-white">
              <Grid className="w-4 h-4" />
              <span>Show all {displayImages.length} photos</span>
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox / Fullscreen Carousel Overlay */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[999] flex flex-col justify-between p-6"
            onClick={() => setActiveIdx(null)}
          >
            {/* Top Bar inside Overlay */}
            <div className="flex justify-between items-center w-full max-w-container-max mx-auto text-white z-10">
              <div>
                <h3 className="font-headline font-bold text-lg">{title}</h3>
                <p className="text-xs text-white/60">Photo {activeIdx + 1} of {displayImages.length}</p>
              </div>
              <button 
                onClick={() => setActiveIdx(null)}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Immersive Image Display with Animating Transitions */}
            <div className="relative flex items-center justify-center flex-grow max-w-5xl w-full mx-auto my-4 h-[60vh]">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-20 cursor-pointer backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-full max-w-full flex items-center justify-center p-2 rounded-2xl overflow-hidden"
              >
                <img 
                  alt={`${title} - Zoomed View`}
                  className="max-h-[70vh] object-contain rounded-xl shadow-2xl select-none"
                  src={displayImages[activeIdx]}
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-20 cursor-pointer backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Bottom thumbnail slider indicator */}
            <div className="w-full overflow-x-auto py-4 flex gap-3 justify-center z-10 max-w-4xl mx-auto scrollbar-none">
              {displayImages.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setActiveIdx(idx); }}
                  className={`w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden shrink-0 border-2 cursor-pointer transition-all duration-300 ${
                    idx === activeIdx ? 'border-primary-container scale-105 shadow-[0_0_12px_rgba(0,188,212,0.6)]' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                </div>
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
