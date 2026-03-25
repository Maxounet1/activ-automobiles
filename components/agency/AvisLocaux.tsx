'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, ShieldCheck, Quote } from 'lucide-react';
import StarRatingShared from '@/components/common/StarRating';

interface ReviewData {
  id: string;
  author: string;
  rating: number;
  comment: string;
  agencyId: string;
  date: string;
  source: string;
  badge?: string;
  visitedAt?: string;
  reviewerDetails?: string;
}

interface AvisLocauxProps {
  reviews: ReviewData[];
  agencyRating: number;
  agencyReviewCount: number;
  city: string;
}

const AVATAR_PALETTE = [
  '#1A3F6F',
  '#0F766E',
  '#B45309',
  '#DC2626',
  '#059669',
  '#7C3AED',
  '#BE185D',
  '#1D4ED8',
];

function StarRow({ rating }: { rating: number }) {
  return <StarRatingShared rating={rating} size={14} color="#F59E0B" />;
}

function Avatar({ name, idx }: { name: string; idx: number }) {
  const bg = AVATAR_PALETTE[idx % AVATAR_PALETTE.length];
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 select-none"
      style={{ background: bg }}
    >
      {initials}
    </div>
  );
}

function GoogleLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

const STATS = [
  { value: '30 000+', label: 'clients accompagnés' },
  { value: '98%', label: 'clients satisfaits' },
  { value: '6', label: 'agences en France' },
];

export default function AvisLocaux({
  reviews,
  agencyRating,
  agencyReviewCount,
}: AvisLocauxProps) {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAnim = animDir !== null;

  const displayed = reviews.slice(0, 8);
  const total = displayed.length;
  const PER_PAGE = 3;

  const go = useCallback(
    (dir: 'prev' | 'next') => {
      if (isAnim || total <= PER_PAGE) return;
      setAnimDir(dir === 'next' ? 'right' : 'left');
      setTimeout(() => {
        setCurrent((c) =>
          dir === 'next' ? (c + 1) % total : (c - 1 + total) % total
        );
        setAnimDir(null);
      }, 280);
    },
    [isAnim, total]
  );

  useEffect(() => {
    if (total <= PER_PAGE) return;
    autoRef.current = setInterval(() => go('next'), 6000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [go, total]);

  const pause = () => { if (autoRef.current) clearInterval(autoRef.current); };
  const resume = () => {
    if (total <= PER_PAGE) return;
    autoRef.current = setInterval(() => go('next'), 6000);
  };

  if (total === 0) return null;

  const visible = Array.from({ length: Math.min(PER_PAGE, total) }, (_, i) =>
    displayed[(current + i) % total]
  );

  const pct = Math.round((agencyRating / 5) * 100);

  return (
    <section className="py-20 bg-[#F7F8FA] relative overflow-hidden">
      {/* Fond décoratif premium */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,63,111,0.05) 0%, transparent 68%)',
          transform: 'translate(25%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,63,111,0.04) 0%, transparent 68%)',
          transform: 'translate(-35%, 35%)',
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#1A3F6F]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
                Avis clients vérifiés
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
              Ils nous ont fait confiance.<br />
              <span className="text-[#1A3F6F]">Voici ce qu&apos;ils en disent.</span>
            </h2>
          </div>
          <a
            href="https://www.google.com/maps/search/Activ+Automobiles"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#1A3F6F] transition-colors flex-shrink-0"
          >
            <GoogleLogo size={14} />
            Voir tous les avis Google
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Left panel: score + stats ── */}
          <div className="lg:w-72 flex-shrink-0 lg:sticky lg:top-28">

            {/* Score card */}
            <div className="bg-white rounded-2xl p-7 mb-4" style={{ border: '2px solid #1A3F6F', boxShadow: '0 0 0 1px rgba(26,63,111,0.12), 0 4px 20px rgba(26,63,111,0.1)' }}>
              <div className="flex items-center gap-2 mb-5">
                <GoogleLogo size={18} />
                <span className="text-xs font-semibold text-gray-400 tracking-wide uppercase">Google Reviews</span>
              </div>

              <div className="flex items-end gap-3 mb-3">
                <span className="text-6xl font-black text-gray-900 leading-none">{agencyRating.toFixed(1)}</span>
                <div className="pb-1">
                  <div className="mb-1">
                    <StarRatingShared rating={agencyRating} size={16} color="#F59E0B" />
                  </div>
                  <p className="text-xs text-gray-400">{agencyReviewCount} avis</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-5">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #F59E0B, #F97316)' }}
                />
              </div>

              {/* Verified badge */}
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-50 border border-blue-100">
                <ShieldCheck className="w-4 h-4 text-[#1A3F6F] flex-shrink-0" />
                <span className="text-xs font-semibold text-[#1A3F6F]">Avis vérifiés par Google</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl px-4 py-3"
                  style={{ border: '2px solid #1A3F6F', boxShadow: '0 0 0 1px rgba(26,63,111,0.1), 0 2px 12px rgba(26,63,111,0.08)' }}
                >
                  <p className="text-xl font-black text-[#1A3F6F] leading-none mb-0.5">{value}</p>
                  <p className="text-[11px] text-gray-400 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right panel: carousel ── */}
          <div
            className="flex-1 min-w-0"
            onMouseEnter={pause}
            onMouseLeave={resume}
          >
            {/* Cards */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 transition-all duration-280"
              style={{
                opacity: isAnim ? 0 : 1,
                transform: isAnim
                  ? `translateX(${animDir === 'right' ? '-16px' : '16px'})`
                  : 'translateX(0)',
                transition: 'opacity 0.28s ease, transform 0.28s ease',
              }}
            >
              {visible.map((review, idx) => (
                <article
                  key={review.id}
                  className="rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden group transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #eff6ff 100%)',
                    border: '2px solid #1A3F6F',
                    boxShadow: '0 0 0 1px rgba(26,63,111,0.15), 0 4px 16px rgba(26,63,111,0.1)',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(110deg, transparent 20%, rgba(26,63,111,0.07) 50%, transparent 80%)',
                      backgroundSize: '200% 100%',
                    }}
                    aria-hidden="true"
                  />

                  {/* Author row */}
                  <div className="flex items-start justify-between gap-2 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={review.author} idx={reviews.indexOf(review)} />
                      <div>
                        <p className="font-bold text-gray-900 text-sm leading-tight">{review.author}</p>
                        {review.reviewerDetails && (
                          <p className="text-[10px] text-gray-400 mt-0.5">{review.reviewerDetails}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <GoogleLogo size={14} />
                      {review.badge && (
                        <span className="text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded bg-amber-400 text-amber-900">
                          {review.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="relative z-10"><StarRow rating={review.rating} /></div>

                  {/* Quote + comment */}
                  <div className="relative flex-1 z-10">
                    <Quote className="absolute -top-1 -left-0.5 w-5 h-5 text-gray-100 rotate-180" aria-hidden="true" />
                    <p className="text-sm text-gray-600 leading-relaxed pl-5 line-clamp-5">
                      {review.comment}
                    </p>
                  </div>

                  {/* Footer */}
                  {review.visitedAt && (
                    <p className="text-[10px] text-gray-400 pt-2 border-t border-blue-100 relative z-10">{review.visitedAt}</p>
                  )}
                </article>
              ))}
            </div>

            {/* Navigation */}
            {total > PER_PAGE && (
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: total }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (isAnim) return;
                        setAnimDir(i > current ? 'right' : 'left');
                        setTimeout(() => { setCurrent(i); setAnimDir(null); }, 280);
                      }}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === current ? 20 : 6,
                        height: 6,
                        background: i === current ? '#1A3F6F' : '#D1D5DB',
                      }}
                      aria-label={`Avis ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => go('prev')}
                    className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 transition-all duration-200 hover:border-[#1A3F6F]/50 hover:text-[#1A3F6F] hover:scale-[1.08] hover:shadow-md"
                    aria-label="Précédent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => go('next')}
                    className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 hover:scale-[1.08]"
                    style={{ background: '#1A3F6F', borderColor: '#1A3F6F', boxShadow: '0 2px 10px rgba(26,63,111,0.28)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(26,63,111,0.50)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px rgba(26,63,111,0.28)'; }}
                    aria-label="Suivant"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
