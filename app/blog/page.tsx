import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, TrendingUp, BookOpen, Users, Sparkles, ChevronRight, Star, Zap, Shield, Calculator, Car } from 'lucide-react';
import { getAllPosts, getPostsByCategory } from '@/repository/blog';
import { SITE_URL, SITE_NAME } from '@/lib/utils';
import type { BlogPost } from '@/lib/types';
import BlogGrid, { ArticleRow } from '@/components/blog/BlogGrid';
import HeroCarousel from '@/components/blog/HeroCarousel';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Journal Auto — Guides, Conseils & Analyses | Activ Automobiles',
  description:
    "Guides d'achat, analyses du marché et conseils pratiques pour acheter ou vendre un véhicule en toute confiance. Par les experts d'Activ Automobiles.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Journal Auto — Guides, Conseils & Analyses | Activ Automobiles',
    description: "Guides d'achat, analyses du marché et conseils pratiques par les experts Activ Automobiles.",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: 'Journal Auto Activ Automobiles' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journal Auto | Activ Automobiles',
    description: "Guides d'achat, analyses du marché et conseils pratiques automobiles.",
    images: [`${SITE_URL}/og-default.jpg`],
  },
};

const CATEGORY_META: Record<string, { color: string; bg: string; darkBg: string; label: string; icon: string; gradient: string; glow: string }> = {
  'Achat de véhicule':     { color: '#93C5FD', bg: '#EFF6FF', darkBg: 'rgba(26,63,111,0.18)', label: 'Achat', icon: '🚗', gradient: 'linear-gradient(135deg, #0A1628 0%, #0F2847 40%, #1A3F6F 100%)', glow: 'rgba(59,130,246,0.35)' },
  'Vente & reprise':       { color: '#67E8F9', bg: '#F0F9FF', darkBg: 'rgba(3,105,161,0.18)', label: 'Vente & reprise', icon: '🔄', gradient: 'linear-gradient(135deg, #051220 0%, #072840 40%, #0369A1 100%)', glow: 'rgba(6,182,212,0.35)' },
  Financement:             { color: '#6EE7B7', bg: '#F0FDFA', darkBg: 'rgba(15,118,110,0.18)', label: 'Financement', icon: '💳', gradient: 'linear-gradient(135deg, #051A16 0%, #0A3028 40%, #0F766E 100%)', glow: 'rgba(16,185,129,0.35)' },
  'Marché automobile':     { color: '#CBD5E1', bg: '#F8FAFC', darkBg: 'rgba(71,85,105,0.18)', label: 'Marché', icon: '📊', gradient: 'linear-gradient(135deg, #0C1117 0%, #1A2130 40%, #2D3A4F 100%)', glow: 'rgba(100,116,139,0.35)' },
  'Conseils pratiques':    { color: '#FCD34D', bg: '#FFFBEB', darkBg: 'rgba(146,64,14,0.18)', label: 'Conseils', icon: '💡', gradient: 'linear-gradient(135deg, #1A0E00 0%, #3A2000 40%, #92400E 100%)', glow: 'rgba(245,158,11,0.35)' },
  'Fiabilité & entretien': { color: '#A5B4FC', bg: '#EEF2FF', darkBg: 'rgba(30,64,175,0.18)', label: 'Fiabilité', icon: '🔧', gradient: 'linear-gradient(135deg, #08102A 0%, #102046 40%, #1E3A8A 100%)', glow: 'rgba(99,102,241,0.35)' },
  Électrique:              { color: '#86EFAC', bg: '#ECFDF5', darkBg: 'rgba(6,95,70,0.18)', label: 'Électrique', icon: '⚡', gradient: 'linear-gradient(135deg, #021310 0%, #052E22 40%, #065F46 100%)', glow: 'rgba(34,197,94,0.35)' },
  Hybride:                 { color: '#A7F3D0', bg: '#F0FDF4', darkBg: 'rgba(22,101,52,0.18)', label: 'Hybride', icon: '🌿', gradient: 'linear-gradient(135deg, #031A0A 0%, #083318 40%, #166534 100%)', glow: 'rgba(74,222,128,0.35)' },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-2">
      <div className="h-5 w-1 rounded-full bg-[#E8A020]" />
      <span className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">{children}</span>
    </div>
  );
}

function SectionHeader({
  title, subtitle, href, cta,
}: { title: string; subtitle?: string; href?: string; cta?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900" style={{ letterSpacing: '-0.02em' }}>{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-1.5 font-medium leading-relaxed">{subtitle}</p>}
      </div>
      {href && cta && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#1A3F6F] bg-blue-50 hover:bg-[#1A3F6F] hover:text-white border border-blue-100 hover:border-[#1A3F6F] transition-all duration-200 hover:gap-3 shrink-0 active:scale-95"
        >
          {cta}
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

function HeroStatPill({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-3.5 rounded-2xl"
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(232,160,32,0.18)' }}
      >
        <Icon size={16} style={{ color: '#E8A020' }} />
      </div>
      <div>
        <p className="text-lg font-black text-white leading-none">{value}</p>
        <p className="text-[11px] font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</p>
      </div>
    </div>
  );
}

function CategoryCard({ cat, meta, count }: { cat: string; meta: typeof CATEGORY_META[string]; count: number }) {
  return (
    <div
      className="relative group rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:scale-[1.03] cursor-default"
      style={{
        background: meta.gradient,
        boxShadow: `0 8px 32px ${meta.glow}, 0 2px 8px rgba(0,0,0,0.25)`,
        aspectRatio: '4/3',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${meta.glow} 0%, transparent 65%)` }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${meta.color}50, transparent)` }}
      />
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none opacity-30"
        style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            boxShadow: `0 4px 20px ${meta.glow}`,
          }}
        >
          {meta.icon}
        </div>
        <p className="text-base font-black text-white leading-tight mb-2" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)', letterSpacing: '-0.01em' }}>
          {meta.label}
        </p>
        <p
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: meta.color, textShadow: `0 0 12px ${meta.glow}` }}
        >
          {count} article{count > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}

function EditorialCard({ post }: { post: BlogPost }) {
  const c = CATEGORY_META[post.category] ?? { color: '#374151', bg: '#F9FAFB', darkBg: 'rgba(55,65,81,0.12)', label: post.category, icon: '📄' };
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'white',
        border: '1px solid rgba(226,232,240,1)',
        boxShadow: '0 2px 8px rgba(15,28,46,0.05)',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <div className="relative overflow-hidden" style={{ paddingBottom: '56%' }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(10,18,35,0.25) 0%, transparent 60%)' }}
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <span
          className="inline-flex items-center self-start px-2.5 py-1 rounded-lg text-[10px] font-bold mb-3 tracking-wide"
          style={{ color: c.color, background: c.bg }}
        >
          {c.label}
        </span>
        <h3 className="font-black text-slate-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#1A3F6F] transition-colors duration-200 flex-1" style={{ letterSpacing: '-0.01em' }}>
          {post.title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px]">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}bb)` }}
            >
              {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <span className="font-semibold text-slate-600">{post.author}</span>
          </div>
          <span className="flex items-center gap-1 text-slate-400 font-medium">
            <Clock size={10} />
            {post.readTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}

function TrustBar() {
  const items = [
    { icon: Star, value: '4.7/5', label: 'Note de satisfaction' },
    { icon: BookOpen, value: '40+', label: 'Articles experts' },
    { icon: Shield, value: '100%', label: 'Conseils indépendants' },
    { icon: Zap, value: '8', label: 'Thématiques couvertes' },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className="relative rounded-2xl py-6 px-5 text-center overflow-hidden transition-all duration-250 hover:-translate-y-0.5 group"
          style={{
            background: 'linear-gradient(160deg, #ffffff 0%, #f4f7fb 100%)',
            border: '1px solid rgba(26,63,111,0.10)',
            boxShadow: '0 2px 8px rgba(26,63,111,0.05)',
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(26,63,111,0.25) 50%, transparent 100%)' }}
          />
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
            style={{ background: 'rgba(26,63,111,0.07)' }}
          >
            <Icon className="w-5 h-5 text-[#1A3F6F]" />
          </div>
          <p className="text-2xl font-black text-slate-900 mb-0.5" style={{ letterSpacing: '-0.02em' }}>{value}</p>
          <p className="text-xs font-semibold text-slate-400">{label}</p>
        </div>
      ))}
    </div>
  );
}

const EDITORIAL_SECTIONS = [
  { title: 'Acheter un véhicule', subtitle: 'Guides, checklists et méthodes pour sécuriser votre achat', category: 'Achat de véhicule', ctaHref: '/voitures-occasion', ctaLabel: 'Voir le catalogue' },
  { title: 'Financer son projet', subtitle: 'Crédit, LOA, LLD, taux — tout comprendre avant de signer', category: 'Financement', ctaHref: '/financement', ctaLabel: 'Simuler un financement' },
  { title: 'Marché & tendances', subtitle: 'Analyses, conjoncture et décryptages du secteur automobile', category: 'Marché automobile', ctaHref: '/blog', ctaLabel: 'Tous les articles' },
  { title: 'Fiabilité & entretien', subtitle: 'Maintenance, pannes et modèles les plus durables', category: 'Fiabilité & entretien', ctaHref: '/blog', ctaLabel: 'Tous les articles' },
];

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const featuredPosts = allPosts.filter(p => p.featured);
  const carouselPosts = featuredPosts.slice(0, 5).length >= 3 ? featuredPosts.slice(0, 5) : allPosts.slice(0, 5);
  const recentPosts = allPosts.slice(0, 6);
  const sidebarFeatured = featuredPosts.slice(0, 4);

  const uniqueAuthors = Array.from(new Set(allPosts.map(p => p.author))).length;

  const editorialSectionPosts = await Promise.all(
    EDITORIAL_SECTIONS.map(s => getPostsByCategory(s.category).then(posts => posts.slice(0, 3)))
  );

  const categoryCounts: Record<string, number> = {};
  allPosts.forEach(p => { categoryCounts[p.category] = (categoryCounts[p.category] ?? 0) + 1; });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE_URL}/blog` },
        ],
      },
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog`,
        name: 'Le Journal Automobile | Activ Automobiles',
        url: `${SITE_URL}/blog`,
        description: "Guides d'achat, analyses du marché et conseils pratiques.",
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.webp` },
        },
        blogPost: allPosts.slice(0, 10).map(p => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.publishedAt,
          author: { '@type': 'Person', name: p.author },
          image: p.image,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-[#F7F8FA] min-h-screen">

        {/* ── MASTHEAD PREMIUM ── */}
        <header
          style={{
            background: 'linear-gradient(160deg, #0A1223 0%, #0F1C2E 55%, #162640 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">

            <nav aria-label="Fil d'Ariane" className="mb-8">
              <ol className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                <li><ChevronRight size={12} /></li>
                <li className="text-white font-semibold">Journal</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                  style={{ background: 'rgba(232,160,32,0.12)', border: '1px solid rgba(232,160,32,0.25)' }}
                >
                  <Sparkles size={13} style={{ color: '#E8A020' }} />
                  <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: '#E8A020' }}>
                    Activ Automobiles — Le Journal
                  </span>
                </div>

                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none mb-5"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  Conseils &{' '}
                  <span style={{ color: '#E8A020' }}>Expertises</span>
                </h1>

                <p
                  className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  Analyses de fond, guides d&apos;achat et décryptages du marché — rédigés par nos experts pour vous aider à prendre les meilleures décisions automobiles.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  <Link
                    href="/voitures-occasion"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-black text-white transition-all duration-200 hover:brightness-110 active:scale-95"
                    style={{ background: '#E8A020', boxShadow: '0 4px 20px rgba(232,160,32,0.35)' }}
                  >
                    Voir nos véhicules
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="#tous-articles"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:bg-white/10 active:scale-95"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1.5px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    Explorer les articles
                    <ArrowRight size={15} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <HeroStatPill icon={BookOpen} value={String(allPosts.length)} label="Articles" />
                  <HeroStatPill icon={Users} value={String(uniqueAuthors)} label="Experts" />
                  <HeroStatPill icon={TrendingUp} value="8" label="Thèmes" />
                  <HeroStatPill icon={Star} value="4.7/5" label="Satisfaction" />
                </div>
              </div>

              <div className="hidden lg:block" style={{ height: '420px' }}>
                <HeroCarousel posts={carouselPosts} />
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── TRUST BAR ── */}
          <section className="py-8 border-t border-slate-200">
            <TrustBar />
          </section>

          {/* ── CATEGORIES ── */}
          <section className="py-10 border-t border-slate-200">
            <SectionLabel>Explorer par thème</SectionLabel>
            <SectionHeader
              title="Toutes les thématiques"
              subtitle="Naviguez par centre d'intérêt pour trouver les conseils adaptés à votre projet"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(CATEGORY_META).map(([cat, meta]) => {
                const count = categoryCounts[cat] ?? 0;
                if (!count) return null;
                return (
                  <div
                    key={cat}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200 cursor-default"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: meta.bg }}
                    >
                      {meta.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black text-slate-800 leading-tight">
                        {meta.label}
                      </p>
                      <p className="text-[11px] font-semibold mt-0.5 text-slate-400">
                        {count} article{count > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── DERNIERS ARTICLES + SIDEBAR ── */}
          <section className="py-10 border-t border-slate-200" aria-labelledby="recents-heading">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-14">

              <div className="lg:col-span-2">
                <SectionLabel>Fil d&apos;actualité</SectionLabel>
                <SectionHeader
                  title="Dernières publications"
                  subtitle={`Les ${recentPosts.length} articles les plus récents de nos experts`}
                  href="/blog"
                  cta="Voir tout"
                />
                <div className="space-y-3">
                  {recentPosts.map(post => (
                    <ArticleRow key={post.id} post={post} />
                  ))}
                </div>
              </div>

              <aside className="space-y-5">
                {/* Articles populaires */}
                <div
                  className="rounded-2xl border p-5"
                  style={{
                    background: 'white',
                    borderColor: 'rgba(226,232,240,1)',
                    boxShadow: '0 2px 8px rgba(15,28,46,0.04)',
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-100">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(232,160,32,0.12)' }}
                    >
                      <TrendingUp size={13} style={{ color: '#E8A020' }} />
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-500">
                      Articles populaires
                    </p>
                  </div>
                  <div className="space-y-1">
                    {sidebarFeatured.map((post, idx) => {
                      const c = CATEGORY_META[post.category] ?? { color: '#1A3F6F', bg: '#EFF6FF', darkBg: '', label: '', icon: '' };
                      return (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="group flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 -mx-1"
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                            style={{ background: c.bg, color: c.color }}
                          >
                            {idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold leading-snug text-slate-800 group-hover:text-[#1A3F6F] transition-colors line-clamp-2">
                              {post.title}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-1 font-medium flex items-center gap-1">
                              <Clock size={9} />
                              {post.readTime} min · {post.author}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* CTA véhicules */}
                <div
                  className="rounded-2xl p-6 relative overflow-hidden"
                  style={{ background: 'linear-gradient(145deg, #0A1223 0%, #1A3F6F 100%)' }}
                >
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(232,160,32,0.2) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
                  />
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(232,160,32,0.18)' }}
                  >
                    <Zap size={18} style={{ color: '#E8A020' }} />
                  </div>
                  <p className="text-white font-black text-sm mb-2 leading-snug">
                    Prêt à passer à l&apos;action ?
                  </p>
                  <p className="text-xs mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Plus de 500 véhicules contrôlés, garantis et financés dans nos 6 agences.
                  </p>
                  <Link
                    href="/voitures-occasion"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-black text-white transition-all duration-200 active:scale-95 hover:brightness-110"
                    style={{
                      background: '#E8A020',
                      boxShadow: '0 4px 16px rgba(232,160,32,0.35)',
                    }}
                  >
                    Voir nos véhicules
                    <ArrowRight size={15} />
                  </Link>
                </div>

                {/* CTA Financement */}
                <div
                  className="rounded-2xl p-6 relative overflow-hidden"
                  style={{ background: 'linear-gradient(145deg, #051A16 0%, #065F46 60%, #0A9B72 100%)' }}
                >
                  <div
                    className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(6,214,160,0.15) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.3)' }}
                  >
                    <Calculator size={18} style={{ color: '#6EE7B7' }} />
                  </div>
                  <p className="text-white font-black text-sm mb-2 leading-snug">
                    Simulez votre financement
                  </p>
                  <p className="text-xs mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    LOA, LLD, crédit classique — trouvez la formule qui vous correspond.
                  </p>
                  <Link
                    href="/financement"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-black transition-all duration-200 active:scale-95 hover:brightness-110"
                    style={{
                      background: 'linear-gradient(135deg, #10B981, #059669)',
                      color: '#fff',
                      boxShadow: '0 4px 16px rgba(16,185,129,0.35)',
                    }}
                  >
                    Simuler un financement
                    <ArrowRight size={15} />
                  </Link>
                </div>

                {/* CTA Estimation reprise */}
                <div
                  className="rounded-2xl p-6 relative overflow-hidden"
                  style={{ background: 'linear-gradient(145deg, #1A0A00 0%, #7C2D12 60%, #C2410C 100%)' }}
                >
                  <div
                    className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.25) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(251,146,60,0.2)', border: '1px solid rgba(251,146,60,0.3)' }}
                  >
                    <Car size={18} style={{ color: '#FED7AA' }} />
                  </div>
                  <p className="text-white font-black text-sm mb-2 leading-snug">
                    Faites estimer votre voiture
                  </p>
                  <p className="text-xs mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Obtenez une estimation gratuite et vendez ou reprisez en toute sérénité.
                  </p>
                  <Link
                    href="/services/reprise"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-black transition-all duration-200 active:scale-95 hover:brightness-110"
                    style={{
                      background: 'linear-gradient(135deg, #F97316, #DC2626)',
                      color: '#fff',
                      boxShadow: '0 4px 16px rgba(249,115,22,0.35)',
                    }}
                  >
                    Estimer ma voiture
                    <ArrowRight size={15} />
                  </Link>
                </div>

              </aside>
            </div>
          </section>

          {/* ── SECTIONS EDITORIALES ── */}
          {EDITORIAL_SECTIONS.map((section, idx) => {
            const sectionPosts = editorialSectionPosts[idx];
            if (!sectionPosts.length) return null;
            const cat = CATEGORY_META[section.category];
            return (
              <section key={section.category} className="py-12 border-t border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  {cat && (
                    <span className="text-lg">{cat.icon}</span>
                  )}
                  <SectionLabel>{section.category}</SectionLabel>
                </div>
                <SectionHeader
                  title={section.title}
                  subtitle={section.subtitle}
                  href={section.ctaHref}
                  cta={section.ctaLabel}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sectionPosts.map(post => (
                    <EditorialCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            );
          })}

          {/* ── BIBLIOTHEQUE COMPLETE ── */}
          <section id="tous-articles" className="py-12 border-t border-slate-200" aria-labelledby="tous-heading">
            <SectionLabel>Bibliothèque complète</SectionLabel>
            <SectionHeader
              title="Tous les articles"
              subtitle="Filtrez par thème, naviguez à votre rythme."
            />
            <BlogGrid posts={allPosts} />
          </section>

          {/* ── CTA FINAL PREMIUM ── */}
          <section className="py-12 pb-20 border-t border-slate-200">
            <div
              className="rounded-3xl px-8 py-14 sm:px-14 sm:py-16 relative overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #0A1223 0%, #0F1C2E 50%, #162640 100%)' }}
            >
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(232,160,32,0.14) 0%, transparent 70%)', transform: 'translate(25%, -30%)' }}
              />
              <div
                className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(26,63,111,0.2) 0%, transparent 70%)', transform: 'translate(-25%, 30%)' }}
              />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                <div className="max-w-xl">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
                    style={{ background: 'rgba(232,160,32,0.12)', border: '1px solid rgba(232,160,32,0.22)' }}
                  >
                    <Sparkles size={12} style={{ color: '#E8A020' }} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: '#E8A020' }}>
                      Activ Automobiles
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
                    Vous avez une question<br />sur votre projet ?
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Nos experts sont disponibles du lundi au samedi pour vous accompagner dans l&apos;achat, la vente ou le financement de votre véhicule.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <Link
                    href="/voitures-occasion"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-black text-white transition-all duration-200 hover:brightness-110 active:scale-95"
                    style={{
                      background: '#E8A020',
                      boxShadow: '0 4px 20px rgba(232,160,32,0.4)',
                      minWidth: '220px',
                    }}
                  >
                    Voir nos véhicules
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-black transition-all duration-200 hover:bg-white/10 active:scale-95"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1.5px solid rgba(255,255,255,0.13)',
                      color: 'rgba(255,255,255,0.85)',
                      minWidth: '220px',
                    }}
                  >
                    Nous contacter
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
