import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CornerFlourish } from './OrnateFrame';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Camera
} from 'lucide-react';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  caption: string;
  featured?: boolean;
  aspectClass?: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'photo-featured-couple',
    src: '/assets/aistudio/IMG_20261103_233710_861ee27c.jpg',
    title: 'A Glimpse of Forever',
    subtitle: 'Samarthya & Nikita',
    caption: 'Hand in hand beneath the chandeliers, where two hearts began their eternal journey into holy matrimony.',
    featured: true,
    aspectClass: 'aspect-[4/5]',
  },
];

export const PreWeddingGallery: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const activePhoto = activePhotoIndex !== null ? galleryPhotos[activePhotoIndex] : null;

  const handleOpenPhoto = (index: number) => {
    setImageLoading(true);
    setImageError(false);
    setActivePhotoIndex(index);
  };

  const handleClose = () => {
    setActivePhotoIndex(null);
  };

  const handlePrev = useCallback(() => {
    setImageLoading(true);
    setImageError(false);
    setActivePhotoIndex((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? galleryPhotos.length - 1 : prev - 1;
    });
  }, []);

  const handleNext = useCallback(() => {
    setImageLoading(true);
    setImageError(false);
    setActivePhotoIndex((prev) => {
      if (prev === null) return 0;
      return prev === galleryPhotos.length - 1 ? 0 : prev + 1;
    });
  }, []);

  // Keyboard navigation & body scroll locking
  useEffect(() => {
    if (activePhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activePhotoIndex, handlePrev, handleNext]);

  // Touch swipe support for multi-photo navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext(); // Swiped left -> next
      } else {
        handlePrev(); // Swiped right -> prev
      }
    }
    setTouchStartX(null);
  };

  return (
    <section className="relative my-8 px-2" id="memories">
      {/* Section Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#fdf8ed] border border-[#d4af37]/40 shadow-sm text-[#8c6b2b]">
          <Camera className="w-3.5 h-3.5 text-[#b87a00]" />
          <span className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold text-[#8a5200]">
            Memories of Love
          </span>
        </div>

        <h2 className="font-cormorant font-black text-3xl sm:text-4xl text-gold-shining tracking-tight leading-tight pt-1">
          Pre-Wedding Memories
        </h2>

        <p className="font-cormorant italic text-sm sm:text-base text-[#614a2b] max-w-xs mx-auto leading-relaxed">
          &ldquo;Two lives, two hearts, joined together in friendship, united forever in love.&rdquo;
        </p>
      </div>

      {/* Gallery Photo Card */}
      <div className="w-full max-w-md mx-auto">
        {galleryPhotos.map((photo, index) => {
          return (
            <div
              key={photo.id}
              onClick={() => handleOpenPhoto(index)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_12px_35px_rgba(184,122,0,0.35)] active:scale-[0.98] border-2 border-[#b87a00]/80 shadow-[0_8px_25px_rgba(184,122,0,0.22)] bg-gradient-to-b from-[#fefbf6] to-[#f7eedc]"
            >
              {/* Aspect-ratio image container tailored for couple portrait */}
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="eager"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle warm golden shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Golden corner accents for featured photo */}
                <CornerFlourish position="top-left" size={28} />
                <CornerFlourish position="top-right" size={28} />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/60 flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3 h-3 text-[#ffd700]" />
                  <span className="font-cinzel text-[9px] tracking-widest text-[#f5e6c8] uppercase font-bold">
                    Samarthya &amp; Nikita
                  </span>
                </div>

                {/* Expand icon pill button */}
                <div className="absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/55 backdrop-blur-md border border-[#d4af37]/50 text-[#f5e6c8] flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-md">
                  <Maximize2 className="w-3.5 h-3.5 text-[#ffd700]" />
                </div>

                {/* Bottom Title & Subtitle Scrim */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 text-left">
                  <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#ffd700] font-bold block drop-shadow-sm">
                    {photo.subtitle}
                  </span>
                  <h3 className="font-cormorant font-bold text-lg sm:text-xl text-white leading-tight drop-shadow-md">
                    {photo.title}
                  </h3>
                  <p className="font-cormorant italic text-xs text-[#f5e6c8]/90 line-clamp-2 mt-0.5 drop-shadow-sm">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpful view tap hint */}
      <p className="font-cinzel text-[9px] tracking-widest uppercase text-[#8c6b2b] text-center mt-3">
        ✦ Tap photograph to view in fullscreen ✦
      </p>

      {/* ================= FULLSCREEN LIGHTBOX MODAL (RENDERED VIA PORTAL TO BODY) ================= */}
      {activePhoto && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen photo gallery"
          onClick={handleClose}
          className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-xl flex flex-col justify-between animate-fadeIn select-none p-2 sm:p-4 cursor-pointer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar: Monogram Badge & Close Button */}
          <div 
            className="w-full max-w-xl mx-auto flex items-center justify-between px-2 sm:px-4 py-2 z-20 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-[#1e1710] border border-[#d4af37]/60 flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                <span className="font-cinzel text-[10px] sm:text-[11px] text-[#ffd700] tracking-widest font-bold uppercase">
                  Samarthya &amp; Nikita
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              aria-label="Close fullscreen gallery"
              className="px-3 py-1.5 rounded-full bg-[#1f170f] hover:bg-[#382614] border border-[#d4af37]/70 text-[#f5e6c8] hover:text-white flex items-center gap-1.5 transition-all active:scale-95 shadow-md cursor-pointer"
            >
              <X className="w-4 h-4 text-[#ffd700]" />
              <span className="font-cinzel text-[10px] tracking-wider uppercase font-semibold text-[#f5e6c8]">
                Close
              </span>
            </button>
          </div>

          {/* Main Photo View with Controls */}
          <div 
            className="relative flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden my-auto"
            onClick={handleClose}
          >
            {/* Previous Button (if multiple photos exist) */}
            {galleryPhotos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous photo"
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-[#d4af37]/60 text-[#ffd700] flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button (if multiple photos exist) */}
            {galleryPhotos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next photo"
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-[#d4af37]/60 text-[#ffd700] flex items-center justify-center shadow-lg transition-transform active:scale-90 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Photo Card with Royal Gold Frame */}
            <div 
              className="relative max-w-[94vw] sm:max-w-[440px] max-h-[68vh] sm:max-h-[72vh] flex items-center justify-center p-2 sm:p-3 rounded-2xl bg-gradient-to-b from-[#241a0d] via-[#15110c] to-[#0a0805] border-2 border-[#d4af37] shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(212,175,55,0.25)] animate-modal-zoom cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <CornerFlourish position="top-left" size={26} />
              <CornerFlourish position="top-right" size={26} />
              <CornerFlourish position="bottom-left" size={26} />
              <CornerFlourish position="bottom-right" size={26} />

              {/* Loading State Spinner */}
              {imageLoading && (
                <div className="w-[280px] h-[340px] sm:w-[360px] sm:h-[430px] flex flex-col items-center justify-center bg-[#18120b] rounded-xl border border-[#d4af37]/30 text-center p-4">
                  <div className="w-8 h-8 rounded-full border-2 border-[#d4af37]/30 border-t-[#ffd700] animate-spin mb-3" />
                  <span className="font-cinzel text-xs tracking-widest text-[#f5e6c8] uppercase">
                    Loading Portrait...
                  </span>
                  <span className="font-cormorant italic text-xs text-[#d4af37]/80 mt-1">
                    Samarthya &amp; Nikita
                  </span>
                </div>
              )}

              {/* The Couple Image */}
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
                className={`w-auto h-auto max-h-[62vh] sm:max-h-[66vh] max-w-[90vw] sm:max-w-[410px] object-contain rounded-xl shadow-inner border border-[#d4af37]/40 block mx-auto transition-opacity duration-300 ${
                  imageLoading ? 'hidden' : 'opacity-100'
                }`}
              />

              {imageError && (
                <div className="w-[280px] h-[300px] flex flex-col items-center justify-center p-6 text-center">
                  <p className="font-cormorant text-base text-[#f5e6c8]">
                    Unable to load portrait preview
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Bar: Title, Caption & Tap outside to dismiss hint */}
          <div 
            className="w-full max-w-xl mx-auto px-4 pt-2 pb-4 z-20 text-center cursor-default bg-gradient-to-t from-black via-black/90 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-cormorant font-black text-xl sm:text-2xl text-gold-shining leading-tight tracking-wide">
              {activePhoto.title}
            </h4>
            <p className="font-cormorant italic text-xs sm:text-sm text-[#f5e6c8]/95 max-w-md mx-auto leading-relaxed mt-0.5">
              &ldquo;{activePhoto.caption}&rdquo;
            </p>
            <p className="font-cinzel text-[9px] tracking-widest uppercase text-[#c5a059]/75 mt-2">
              ✦ Tap anywhere outside to close ✦
            </p>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
