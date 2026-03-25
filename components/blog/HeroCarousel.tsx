'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/lib/types';

const CATEGORY_META: Record<string, { color: string; bg: string; label: string }> = {
  'Achat de véhicule':     { color: '#1A3F6F', bg: '#EFF6FF', label: 'Achat' },
  'Vente & reprise':       { color: '#0369A1', bg: '#F0F9FF', label: 'Vente & reprise' },
  Financement:             { color: '#0F766E', bg: '#F0FDFA', label: 'Financement' },
  'Marché automobile':     { color: '#475569', bg: '#F8FAFC', label: 'Marché' },
  'Conseils pratiques':    { color: '#92400E', bg: '#FFFBEB', label: 'Conseils' },
  'Fiabilité & entretien': { color: '#1e40af', bg: '#EEF2FF', label: 'Fiabilité' },
  Électrique:              { color: '#065F46', bg: '#ECFDF5', label: 'Électrique' },
  Hybride:                 { color: '#166534', bg: '#F0FDF4', label: 'Hybride' },
};

interface HeroCarouselProps {
  posts: BlogPost[];
}

export default function HeroCarousel({ posts }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const total = posts.length;

  const go = useCallback((idx: number) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setCurrent((idx + total) % total);
      setFading(false);
    }, 220);
  }, [fading, total]);

  useEffect(() => {
    const t = setInterval(() => go(current + 1), 5000);
    return () => clearInterval(t);
  }, [current, go]);

  if (!posts.length) return null;

  const post = posts[current];
  const c = CATEGORY_META[post.category] ?? { color: '#1A3F6F', bg: '#EFF6FF', label: post.category };

  return (
    <div className="relative h-full rounded-2xl overflow-hidden group" style={{ minHeight: '340px' }}>
      {posts.map((p, i) => (
        <div
          key={p.slug}
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: i === current && !fading ? 1 : 0 }}
        >
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority={i === 0}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(10,18,35,0.88) 0%, rgba(10,18,35,0.3) 55%, transparent 100%)' }}
          />
        </div>
      ))}

      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
        <span
          className="inline-flex items-center self-start px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3"
          style={{ background: 'rgba(255,255,255,0.12)', color: 'white', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          {c.label}
        </span>
        <h3
          className="text-base font-black text-white leading-tight mb-2 line-clamp-2"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)', letterSpacing: '-0.01em' }}
        >
          {post.title}
        </h3>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>{post.author}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={10} />{post.readTime} min</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black text-white transition-all duration-200 hover:brightness-110 active:scale-95 flex-shrink-0"
            style={{ background: '#E8A020', boxShadow: '0 2px 10px rgba(232,160,32,0.4)' }}
          >
            Lire
            <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={() => go(current - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 opacity-0 group-hover:opacity-100 z-20 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(8px)' }}
            aria-label="Article précédent"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => go(current + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 opacity-0 group-hover:opacity-100 z-20 active:scale-95"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(8px)' }}
            aria-label="Article suivant"
          >
            <ChevronRight size={14} />
          </button>

          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-20">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 18 : 5,
                  height: 5,
                  background: i === current ? '#E8A020' : 'rgba(255,255,255,0.3)',
                }}
                aria-label={`Article ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
