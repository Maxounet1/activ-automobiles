'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import type { Review } from '@/lib/types';
import StarRatingShared from '@/components/common/StarRating';

const OVERALL_RATING = 4.7;
const TOTAL_REVIEWS = 2077;

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function getAvatarColor(name: string): string {
  const colors = [
    'linear-gradient(135deg, #1A3F6F, #9E6A08)',
    'linear-gradient(135deg, #3A3A3A, #1C1C1C)',
    'linear-gradient(135deg, #6B4F12, #4A3509)',
    'linear-gradient(135deg, #2D6A4F, #1B4332)',
    'linear-gradient(135deg, #7F5539, #582F0E)',
    'linear-gradient(135deg, #5C4033, #3E2723)',
  ];
  const index =
    name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  });
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const px = size === 'lg' ? 24 : 16;
  return <StarRatingShared rating={rating} size={px} color="#60A5FA" />;
}

function SourceBadge({ source }: { source: Review['source'] }) {
  const config: Record<Review['source'], { label: string }> = {
    google: { label: 'Google' },
    facebook: { label: 'Facebook' },
    site: { label: 'Site officiel' },
  };
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: 'rgba(59,130,246,0.12)', color: '#93C5FD' }}
    >
      {config[source].label}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = getInitials(review.author);
  const avatarGradient = getAvatarColor(review.author);

  return (
    <article
      className="flex flex-col gap-5 rounded-2xl p-6 h-full relative overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, rgba(11,34,64,0.85) 0%, rgba(9,26,48,0.90) 100%)',
        border: '1px solid rgba(59,130,246,0.18)',
        boxShadow: '0 0 0 1px rgba(59,130,246,0.08), 0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(59,130,246,0.07) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2.5s infinite',
        }}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold select-none"
            style={{ background: avatarGradient }}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-white relative z-10">{review.author}</p>
            <p className="text-xs mt-0.5 relative z-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {formatDate(review.date)}
            </p>
          </div>
        </div>
        <SourceBadge source={review.source} />
      </div>

      <div className="relative z-10"><StarRating rating={review.rating} /></div>

      <p
        className="text-sm leading-relaxed line-clamp-4 flex-1 relative z-10"
        style={{ color: 'rgba(255,255,255,0.78)' }}
      >
        &ldquo;{review.comment}&rdquo;
      </p>
    </article>
  );
}

interface ReviewsProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsProps) {
  const displayedReviews = reviews.slice(0, 9);
  const totalPages = Math.ceil(displayedReviews.length / 3);
  const [page, setPage] = useState(0);

  const visibleReviews = displayedReviews.slice(page * 3, page * 3 + 3);
  const prevPage = () => setPage((p) => Math.max(0, p - 1));
  const nextPage = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0B2240 0%, #091A30 60%, #071525 100%)' }}
      aria-labelledby="reviews-section-heading"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 85% -10%, rgba(59,130,246,0.14) 0%, transparent 55%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 60% at 10% 110%, rgba(30,80,160,0.10) 0%, transparent 55%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.25) 35%, rgba(96,165,250,0.18) 65%, transparent 100%)' }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-10 sm:mb-14">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: 'rgba(147,197,253,0.70)' }}
          >
            AVIS CLIENTS
          </p>
          <h2
            id="reviews-section-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 sm:mb-8"
          >
            Ils nous font confiance
          </h2>

          <div
            className="inline-flex flex-col sm:flex-row items-center gap-5 rounded-2xl px-8 py-5"
            style={{
              background: 'rgba(11,34,64,0.60)',
              border: '1px solid rgba(59,130,246,0.15)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div className="text-center sm:text-left">
              <div className="flex items-baseline gap-1">
                <p className="text-5xl font-extrabold text-white leading-none">
                  {OVERALL_RATING}
                </p>
                <span className="text-lg font-semibold" style={{ color: '#6B6B6B' }}>
                  /5
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: '#6B6B6B' }}>
                Note moyenne
              </p>
            </div>

            <div className="hidden sm:block w-px h-12" style={{ background: 'rgba(255,255,255,0.08)' }} aria-hidden="true" />

            <div className="flex flex-col items-center sm:items-start gap-2">
              <StarRating rating={OVERALL_RATING} size="lg" />
              <p className="text-sm" style={{ color: '#6B6B6B' }}>
                Basé sur{' '}
                <span className="font-semibold text-white">
                  {TOTAL_REVIEWS.toLocaleString('fr-FR')} avis
                </span>{' '}
                vérifiés
              </p>
            </div>

            <div className="hidden sm:block w-px h-12" style={{ background: 'rgba(255,255,255,0.08)' }} aria-hidden="true" />

            <div className="flex flex-col items-center sm:items-start gap-1.5">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: 'rgba(59,130,246,0.12)', color: '#93C5FD' }}
              >
                4.7 sur Google
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: 'rgba(59,130,246,0.12)', color: '#93C5FD' }}
              >
                4.7 sur Facebook
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prevPage}
              disabled={page === 0}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#ffffff',
              }}
              aria-label="Avis précédents"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2" aria-hidden="true">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: i === page ? '24px' : '10px',
                    height: '10px',
                    background: i === page ? '#3B82F6' : 'rgba(255,255,255,0.18)',
                    minWidth: i === page ? 24 : 10,
                  }}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={page === totalPages - 1}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#ffffff',
              }}
              aria-label="Avis suivants"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="https://www.google.com/search?q=Activ+Automobiles+avis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3 px-5 py-3 rounded-xl"
            style={{ color: '#93C5FD', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', minHeight: 44 }}
          >
            Lire tous les avis
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
