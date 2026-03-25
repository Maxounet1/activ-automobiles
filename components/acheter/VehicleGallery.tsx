'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Grid3X3, Expand } from 'lucide-react';

interface VehicleGalleryProps {
  images: string[];
  title: string;
}

export default function VehicleGallery({ images, title }: VehicleGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [cinema, setCinema] = useState(false);
  const [fading, setFading] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (fading) return;
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => {
          const next = c + dir;
          if (next < 0) return images.length - 1;
          if (next >= images.length) return 0;
          return next;
        });
        setFading(false);
      }, 130);
    },
    [images.length, fading]
  );

  const goTo = useCallback(
    (idx: number) => {
      if (idx === current || fading) return;
      setFading(true);
      setTimeout(() => {
        setCurrent(idx);
        setFading(false);
      }, 130);
    },
    [current, fading]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'Escape') setCinema(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);

  useEffect(() => {
    document.body.style.overflow = cinema ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cinema]);

  useEffect(() => {
    if (!thumbsRef.current) return;
    const thumb = thumbsRef.current.children[current] as HTMLElement;
    if (thumb) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [current]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) navigate(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const src = images[current] || '/C1.jpg';

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* Main image */}
        <div
          className="relative overflow-hidden group cursor-pointer"
          style={{ borderRadius: '20px', background: '#0A1520', aspectRatio: '16/10' }}
          onClick={() => setCinema(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={src || '/C1.jpg'}
            alt={`${title} - ${current + 1}`}
            fill
            className="object-cover"
            style={{
              transition: 'opacity 0.13s ease',
              opacity: fading ? 0.3 : 1,
            }}
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.45) 100%)',
            }}
          />

          <div
            className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full select-none"
            style={{
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
            }}
          >
            {current + 1} / {images.length}
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
              style={{
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
              }}
              onClick={(e) => { e.stopPropagation(); setCinema(true); }}
            >
              <Grid3X3 size={12} />
              Toutes les photos
            </button>
            <button
              className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
              style={{
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
              }}
              onClick={(e) => { e.stopPropagation(); setCinema(true); }}
              aria-label="Plein écran"
            >
              <Expand size={15} />
            </button>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                style={{
                  width: i === current ? 20 : 5,
                  height: 5,
                  borderRadius: 99,
                  background: i === current ? '#fff' : 'rgba(255,255,255,0.35)',
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <div
            ref={thumbsRef}
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none' }}
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative flex-shrink-0 overflow-hidden transition-all duration-200"
                style={{
                  width: 80,
                  height: 54,
                  borderRadius: 12,
                  background: '#0A1520',
                  border: i === current ? '2px solid #60A5FA' : '2px solid rgba(255,255,255,0.1)',
                  opacity: i === current ? 1 : 0.5,
                  transform: i === current ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: i === current ? '0 0 0 3px rgba(96,165,250,0.2)' : 'none',
                }}
              >
                <Image src={img || '/C1.jpg'} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {cinema && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{ background: '#000' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex items-center justify-between px-6 py-4 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-sm font-bold text-white truncate max-w-[60%]">{title}</p>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {current + 1} / {images.length}
              </span>
              <button
                onClick={() => setCinema(false)}
                className="p-2 rounded-full transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 relative flex items-center justify-center px-16 min-h-0">
            <div className="relative w-full h-full">
              <Image
                src={src || '/C1.jpg'}
                alt={`${title} - photo ${current + 1}`}
                fill
                className="object-contain"
                style={{ transition: 'opacity 0.13s ease', opacity: fading ? 0.3 : 1 }}
                sizes="100vw"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={() => navigate(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:scale-110 z-10"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:scale-110 z-10"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div
              className="flex-shrink-0 px-6 py-4 flex gap-2 overflow-x-auto justify-center"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)', scrollbarWidth: 'none' }}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200"
                  style={{
                    width: 72,
                    height: 48,
                    border: i === current ? '2px solid #60A5FA' : '2px solid rgba(255,255,255,0.15)',
                    opacity: i === current ? 1 : 0.4,
                    transform: i === current ? 'scale(1.06)' : 'scale(1)',
                    boxShadow: i === current ? '0 0 12px rgba(96,165,250,0.4)' : 'none',
                    background: '#111',
                  }}
                >
                  <Image src={img || '/C1.jpg'} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
