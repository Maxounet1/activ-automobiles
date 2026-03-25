'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ChevronLeft, ChevronRight, ArrowRight, Calendar } from 'lucide-react';
import type { BlogPost } from '@/lib/types';
import { CategoryPill } from './BlogCarousel';

const THEMES = [
  { label: 'Tous', value: null },
  { label: 'Achat', value: 'Achat de véhicule' },
  { label: 'Vente & reprise', value: 'Vente & reprise' },
  { label: 'Financement', value: 'Financement' },
  { label: 'Marché', value: 'Marché automobile' },
  { label: 'Conseils', value: 'Conseils pratiques' },
  { label: 'Fiabilité', value: 'Fiabilité & entretien' },
  { label: 'Électrique', value: 'Électrique' },
  { label: 'Hybride', value: 'Hybride' },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Achat de véhicule': '#1A3F6F',
  'Vente & reprise': '#0369A1',
  Financement: '#0F766E',
  'Marché automobile': '#64748B',
  'Conseils pratiques': '#B45309',
  'Fiabilité & entretien': '#6366F1',
  Électrique: '#059669',
  Hybride: '#16A34A',
};

const PER_PAGE = 12;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

function ArticleCard({ post, featured }: { post: BlogPost; featured?: boolean }) {
  const color = CATEGORY_COLORS[post.category] ?? '#1A3F6F';
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 hover:border-slate-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className="relative overflow-hidden" style={{ paddingBottom: featured ? '52%' : '58%' }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(10,18,35,0.35) 0%, transparent 60%)' }}
        />
        {post.featured && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
            style={{ background: '#E8A020', color: 'white' }}
          >
            A la une
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-3">
          <CategoryPill category={post.category} size="xs" />
        </div>
        <h3
          className="font-bold text-slate-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#1A3F6F] transition-colors duration-200 flex-1"
          style={{ fontSize: featured ? '1rem' : '0.9rem' }}
        >
          {post.title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
            >
              {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <span className="text-xs text-slate-600 font-semibold truncate">{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 flex-shrink-0">
            <Clock size={11} />
            <span className="font-medium">{post.readTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleRow({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-4 p-4 sm:p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200 active:scale-[0.99]"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className="relative w-[72px] h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="mb-1">
          <CategoryPill category={post.category} size="xs" />
        </div>
        <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-[#1A3F6F] transition-colors duration-150 line-clamp-2 mt-1.5">
          {post.title}
        </h4>
        <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400 flex-wrap">
          <span className="font-semibold text-slate-500">{post.author}</span>
          <span className="text-slate-200">·</span>
          <span className="flex items-center gap-1"><Clock size={9} />{post.readTime} min</span>
          <span className="text-slate-200">·</span>
          <span className="flex items-center gap-1"><Calendar size={9} />{formatDate(post.publishedAt)}</span>
        </div>
      </div>
      <div className="flex-shrink-0 self-center">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150 group-hover:scale-110"
          style={{ background: 'rgba(26,63,111,0.06)', color: '#1A3F6F' }}
        >
          <ArrowRight size={15} />
        </div>
      </div>
    </Link>
  );
}

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (activeTheme ? posts.filter(p => p.category === activeTheme) : posts),
    [posts, activeTheme]
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    posts.forEach(p => { c[p.category] = (c[p.category] ?? 0) + 1; });
    return c;
  }, [posts]);

  function selectTheme(val: string | null) {
    setActiveTheme(val);
    setPage(1);
  }

  const pageNumbers = useMemo(() => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }, [page, totalPages]);

  return (
    <div>
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
        <div className="flex gap-2 mb-7 min-w-max sm:min-w-0 sm:flex-wrap">
          {THEMES.map(theme => {
            const isActive = activeTheme === theme.value;
            const count = theme.value ? (counts[theme.value] ?? 0) : posts.length;
            return (
              <button
                key={theme.label}
                onClick={() => selectTheme(theme.value)}
                className="inline-flex items-center gap-2 rounded-xl font-semibold transition-all duration-200 border active:scale-95"
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.8125rem',
                  ...(isActive
                    ? {
                        background: '#0F1C2E',
                        color: 'white',
                        borderColor: '#0F1C2E',
                        boxShadow: '0 2px 12px rgba(15,28,46,0.25)',
                      }
                    : {
                        background: 'white',
                        color: '#475569',
                        borderColor: '#E2E8F0',
                      }),
                }}
              >
                {theme.label}
                <span
                  className="inline-flex items-center justify-center rounded-full text-[10px] font-bold transition-all duration-200"
                  style={{
                    minWidth: '1.25rem',
                    height: '1.25rem',
                    padding: '0 0.25rem',
                    ...(isActive
                      ? { background: 'rgba(255,255,255,0.18)', color: 'white' }
                      : { background: '#F1F5F9', color: '#64748B' }),
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          <span className="font-bold text-slate-800">{filtered.length}</span> article{filtered.length !== 1 ? 's' : ''}
          {activeTheme && <> — <span className="font-semibold text-[#1A3F6F]">{activeTheme}</span></>}
        </p>
        {totalPages > 1 && (
          <p className="text-xs text-slate-400 font-medium">Page {page} / {totalPages}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {paginated.map(post => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all duration-150 hover:border-slate-300 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            style={{ borderColor: '#E2E8F0', background: 'white', color: '#475569' }}
            aria-label="Page précédente"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Précédent</span>
          </button>

          <div className="flex items-center gap-1.5">
            {pageNumbers.map((p, i) =>
              p === '...' ? (
                <span key={`dots-${i}`} className="w-10 h-10 flex items-center justify-center text-slate-400 text-sm">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border transition-all duration-150 active:scale-95"
                  style={page === p
                    ? { background: '#0F1C2E', color: 'white', borderColor: '#0F1C2E', boxShadow: '0 2px 8px rgba(15,28,46,0.2)' }
                    : { background: 'white', color: '#475569', borderColor: '#E2E8F0' }
                  }
                >
                  {p}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all duration-150 hover:border-slate-300 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            style={{ borderColor: '#E2E8F0', background: 'white', color: '#475569' }}
            aria-label="Page suivante"
          >
            <span className="hidden sm:inline">Suivant</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export { ArticleRow };
