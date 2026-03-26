'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface VehicleGalleryProps {
  images: GalleryImage[];
  brand: string;
  model: string;
}

export default function VehicleGallery({ images, brand, model }: VehicleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const allImages = images.length > 0 ? images : [{ url: '/no-photo-placeholder.jpg', alt: `${brand} ${model}`, width: 1200, height: 675 }];
  const total = allImages.length;

  const goTo = useCallback((index: number) => {
    const clamped = ((index % total) + total) % total;
    setCurrentIndex(clamped);
    // Scroll filmstrip to keep active thumbnail visible
    if (filmstripRef.current) {
      const thumbs = filmstripRef.current.children;
      if (thumbs[clamped]) {
        (thumbs[clamped] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [total]);

  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex(prev => ((prev - 1) + total) % total);
  }, [total]);

  const lightboxNext = useCallback(() => {
    setLightboxIndex(prev => (prev + 1) % total);
  }, [total]);

  // Keyboard events for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, lightboxPrev, lightboxNext]);

  // Touch events for main image swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentImg = allImages[currentIndex];

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-3">
        {/* Main image */}
        <div
          className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
          style={{ aspectRatio: '16/9', background: '#E2E8F0' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => openLightbox(currentIndex)}
        >
          <Image
            src={currentImg.url}
            alt={currentImg.alt || `${brand} ${model}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
            priority
          />

          {/* Counter badge */}
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          >
            {currentIndex + 1} / {total}
          </div>

          {/* Prev / Next arrows */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}

          {/* Click hint overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="px-3 py-1.5 rounded-full text-xs font-semibold text-white" style={{ background: 'rgba(0,0,0,0.45)' }}>
              Agrandir
            </div>
          </div>
        </div>

        {/* Filmstrip thumbnails */}
        {total > 1 && (
          <div
            ref={filmstripRef}
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E1 transparent' }}
          >
            {allImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className="flex-shrink-0 rounded-xl overflow-hidden transition-all"
                style={{
                  width: 80,
                  height: 56,
                  border: i === currentIndex ? '2.5px solid #1A3F6F' : '2px solid transparent',
                  outline: i === currentIndex ? '2px solid rgba(26,63,111,0.2)' : 'none',
                  opacity: i === currentIndex ? 1 : 0.65,
                  background: '#E2E8F0',
                }}
                aria-label={`Voir la photo ${i + 1}`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `${brand} ${model} photo ${i + 1}`}
                  width={80}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(6px)' }}
          onClick={closeLightbox}
        >
          {/* Prevent click-through on the image area */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative w-full max-w-5xl" style={{ aspectRatio: '16/9' }}>
              <Image
                src={allImages[lightboxIndex].url}
                alt={allImages[lightboxIndex].alt || `${brand} ${model}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Counter */}
            <div
              className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-bold text-white"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)' }}
            >
              {lightboxIndex + 1} / {total}
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Prev arrow */}
            {total > 1 && (
              <button
                type="button"
                onClick={lightboxPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}

            {/* Next arrow */}
            {total > 1 && (
              <button
                type="button"
                onClick={lightboxNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
                aria-label="Image suivante"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
