'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Clock, ArrowRight, Calendar } from 'lucide-react';
import type { BlogPost } from '@/lib/types';

const CATEGORY_META: Record<string, { color: string; bg: string }> = {
  'Achat de véhicule':     { color: '#1A3F6F', bg: 'rgba(26,63,111,0.15)' },
  'Vente & reprise':       { color: '#0369A1', bg: 'rgba(3,105,161,0.15)' },
  Financement:             { color: '#0F766E', bg: 'rgba(15,118,110,0.15)' },
  'Marché automobile':     { color: '#94A3B8', bg: 'rgba(100,116,139,0.15)' },
  'Conseils pratiques':    { color: '#E8A020', bg: 'rgba(180,83,9,0.15)' },
  'Fiabilité & entretien': { color: '#818CF8', bg: 'rgba(99,102,241,0.15)' },
  Électrique:              { color: '#34D399', bg: 'rgba(5,150,105,0.15)' },
  Hybride:                 { color: '#4ADE80', bg: 'rgba(22,163,74,0.15)' },
};

function getCat(cat: string) {
  return CATEGORY_META[cat] ?? { color: '#94A3B8', bg: 'rgba(55,65,81,0.12)' };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function CategoryPill({ category, size = 'sm' }: { category: string; size?: 'sm' | 'xs' }) {
  const c = getCat(category);
  return (
    <span
      className={`inline-flex items-center rounded-full font-bold tracking-wide transition-opacity duration-150 hover:opacity-90 ${size === 'xs' ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-xs'}`}
      style={{
        color: '#FFFFFF',
        background: `linear-gradient(135deg, ${c.color} 0%, ${c.color}CC 100%)`,
        boxShadow: `0 1px 6px ${c.color}40`,
      }}
    >
      {category}
    </span>
  );
}

interface BlogCarouselProps {
  posts: BlogPost[];
}

export default function BlogCarousel({ posts }: BlogCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const total = posts.length;

  const go = useCallback((idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((idx + total) % total);
      setAnimating(false);
    }, 250);
  }, [animating, total]);

  useEffect(() => {
    const timer = setInterval(() => go(current + 1), 6500);
    return () => clearInterval(timer);
  }, [current, go]);

  if (!posts.length) return null;

  const post = posts[current];

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0F1C2E] shadow-2xl" style={{ minHeight: 480 }}>
      {posts.map((p, i) => (
        <div
          key={p.slug}
          className="absolute inset-0 transition-opacity duration-400"
          style={{ opacity: i === current && !animating ? 1 : 0 }}
        >
          <Image
            src={p.image}
            alt={p.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(10,18,35,0.78) 0%, rgba(10,18,35,0.50) 45%, rgba(10,18,35,0.12) 100%)',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,18,35,0.7) 0%, transparent 60%)' }} />
        </div>
      ))}

      <div className="relative z-10 flex flex-col h-full" style={{ minHeight: 480 }}>
        <div className="flex-1 p-6 sm:p-9 lg:p-12 max-w-2xl flex flex-col justify-end">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest"
              style={{ background: 'rgba(232,160,32,0.18)', color: '#E8A020', border: '1px solid rgba(232,160,32,0.35)' }}
            >
              A la une
            </span>
            <CategoryPill category={post.category} />
          </div>

          <h2
            className="text-2xl sm:text-3xl lg:text-[2.2rem] font-black text-white leading-tight mb-3"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)', letterSpacing: '-0.01em' }}
          >
            {post.title}
          </h2>

          <p
            className="text-sm sm:text-base leading-relaxed mb-5 line-clamp-2 max-w-xl"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white ring-2 ring-white/10 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #1A3F6F, #2563EB)' }}
              >
                {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>{post.author}</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <Clock size={12} />
              {post.readTime} min de lecture
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <Calendar size={11} />
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <div>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #1A3F6F 0%, #2563EB 100%)',
                boxShadow: '0 4px 24px rgba(26,63,111,0.45)',
              }}
            >
              Lire l&apos;article
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-12 flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => go(current - 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                backdropFilter: 'blur(8px)',
              }}
              aria-label="Article précédent"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(current + 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                backdropFilter: 'blur(8px)',
              }}
              aria-label="Article suivant"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? 22 : 6,
                  height: 6,
                  background: i === current ? '#E8A020' : 'rgba(255,255,255,0.25)',
                }}
                aria-label={`Article ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {total > 1 && (
          <div
            className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' }}
          >
            {current + 1} / {total}
          </div>
        )}
      </div>
    </div>
  );
}
