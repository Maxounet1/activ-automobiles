import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, Calendar, ArrowLeft, ChevronRight, Tag } from 'lucide-react';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/repository/blog';
import { SITE_URL, SITE_NAME } from '@/lib/utils';
import type { BlogPost } from '@/lib/types';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Article introuvable | Activ Automobiles' };

  const title = `${post.title} | Le Journal Automobile — Activ Automobiles`;
  return {
    title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: 'summary_large_image', title, description: post.excerpt, images: [post.image] },
  };
}

const CATEGORY_META: Record<string, { color: string; bg: string; border: string }> = {
  'Achat de véhicule':     { color: '#1A3F6F', bg: 'rgba(26,63,111,0.08)',   border: 'rgba(26,63,111,0.18)' },
  'Vente & reprise':       { color: '#0369A1', bg: 'rgba(3,105,161,0.08)',   border: 'rgba(3,105,161,0.18)' },
  Financement:             { color: '#0F766E', bg: 'rgba(15,118,110,0.08)',  border: 'rgba(15,118,110,0.18)' },
  'Marché automobile':     { color: '#6B7280', bg: 'rgba(107,114,128,0.08)', border: 'rgba(107,114,128,0.18)' },
  'Conseils pratiques':    { color: '#B45309', bg: 'rgba(180,83,9,0.08)',    border: 'rgba(180,83,9,0.18)' },
  'Fiabilité & entretien': { color: '#7C3AED', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.18)' },
  Électrique:              { color: '#059669', bg: 'rgba(5,150,105,0.08)',   border: 'rgba(5,150,105,0.18)' },
  Hybride:                 { color: '#16A34A', bg: 'rgba(22,163,74,0.08)',   border: 'rgba(22,163,74,0.18)' },
};

function getCat(cat: string) {
  return CATEGORY_META[cat] ?? { color: '#374151', bg: 'rgba(55,65,81,0.08)', border: 'rgba(55,65,81,0.18)' };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function CategoryPill({ category }: { category: string }) {
  const c = getCat(category);
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{ color: c.color, background: c.bg, border: `1px solid ${c.border}` }}
    >
      <Tag size={10} />
      {category}
    </span>
  );
}

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <div className="mb-2"><CategoryPill category={post.category} /></div>
        <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#1A3F6F] transition-colors duration-200">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
          <Clock size={10} />{post.readTime} min
          <span className="text-slate-200">·</span>
          {formatDate(post.publishedAt)}
        </div>
      </div>
    </Link>
  );
}

function buildJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Le Journal', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}/blog/${post.slug}`,
        headline: post.title,
        description: post.excerpt,
        articleBody: post.content.substring(0, 500),
        image: { '@type': 'ImageObject', url: post.image, width: 1200, height: 630, caption: post.title },
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: { '@type': 'Person', name: post.author },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.webp` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
        keywords: post.tags.join(', '),
        articleSection: post.category,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'p.article-excerpt'],
        },
        isAccessibleForFree: true,
        inLanguage: 'fr-FR',
        wordCount: post.content.split(' ').length,
      },
    ],
  };
}

function renderBoldText(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-slate-800 font-semibold">{part}</strong> : part
  );
}

function renderContent(content: string) {
  const paragraphs = content.split('\n\n').filter(Boolean);

  return paragraphs.map((para, idx) => {
    if (para.startsWith('## ')) {
      return (
        <h2
          key={idx}
          className="text-xl sm:text-2xl font-bold text-slate-900 mt-10 mb-4"
          style={{ borderLeft: '3px solid #1A3F6F', paddingLeft: '1rem' }}
        >
          {para.replace(/^## /, '')}
        </h2>
      );
    }
    if (para.startsWith('### ')) {
      return (
        <h3 key={idx} className="text-lg font-semibold text-slate-800 mt-7 mb-3">
          {para.replace(/^### /, '')}
        </h3>
      );
    }
    if (para.startsWith('- ')) {
      const items = para.split('\n').filter((l) => l.startsWith('- '));
      return (
        <ul key={idx} className="space-y-2 my-4">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#1A3F6F]" aria-hidden="true" />
              <span>{renderBoldText(item.replace(/^- /, ''))}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (/^\d+\./.test(para)) {
      const items = para.split('\n').filter((l) => /^\d+\./.test(l));
      return (
        <ol key={idx} className="space-y-3 my-4 list-none">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5"
                style={{ background: 'rgba(26,63,111,0.1)', color: '#1A3F6F' }}
              >
                {i + 1}
              </span>
              <span>{renderBoldText(item.replace(/^\d+\.\s*/, ''))}</span>
            </li>
          ))}
        </ol>
      );
    }
    const hasBold = /\*\*(.+?)\*\*/g.test(para);
    if (hasBold) {
      return (
        <p key={idx} className="text-sm sm:text-base leading-relaxed text-slate-600 my-3">
          {renderBoldText(para)}
        </p>
      );
    }
    return (
      <p key={idx} className="text-sm sm:text-base leading-relaxed text-slate-600 my-3">
        {para}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(post)) }} />

      <div className="bg-[#F8F9FB] min-h-screen">

        {/* ── Chapeau dark ── */}
        <div style={{ background: '#0F1C2E' }}>
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <nav aria-label="Fil d'Ariane">
              <ol className="flex flex-wrap items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Le Journal</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium truncate max-w-[200px]">{post.title}</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

            {/* ── Article principal ── */}
            <article className="flex-1 min-w-0 max-w-2xl xl:max-w-3xl">

              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#1A3F6F] transition-colors mb-6"
              >
                <ArrowLeft size={13} />
                Retour au journal
              </Link>

              <div className="mb-4">
                <CategoryPill category={post.category} />
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-5">
                {post.title}
              </h1>

              {/* Meta auteur */}
              <div
                className="flex flex-wrap items-center gap-5 text-xs text-slate-400 mb-8 pb-6"
                style={{ borderBottom: '1px solid #E2E8F0' }}
              >
                <span className="flex items-center gap-1.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #1A3F6F, #2563EB)' }}
                  >
                    {post.author.charAt(0)}
                  </div>
                  <span className="font-medium text-slate-600">{post.author}</span>
                  <span className="text-slate-300">·</span>
                  <span>Expert Activ Automobiles</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {post.readTime} min de lecture
                </span>
              </div>

              {/* Image hero */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Chapeau journalistique */}
              <p
                className="article-excerpt text-base sm:text-lg font-medium text-slate-700 leading-relaxed mb-8 pb-8"
                style={{ borderBottom: '1px solid #E2E8F0' }}
              >
                {post.excerpt}
              </p>

              {/* Corps de l'article */}
              <div className="prose-article">
                {renderContent(post.content)}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div
                  className="mt-10 pt-6 flex flex-wrap gap-2"
                  style={{ borderTop: '1px solid #E2E8F0' }}
                >
                  <span className="text-xs font-semibold text-slate-400 mr-1">Tags :</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs text-slate-500 bg-slate-100 border border-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Articles similaires */}
              {related.length > 0 && (
                <section
                  aria-labelledby="related-heading"
                  className="mt-14 pt-10"
                  style={{ borderTop: '1px solid #E2E8F0' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 id="related-heading" className="text-base font-bold text-slate-900 uppercase tracking-wider">
                      À lire aussi
                    </h2>
                    <Link href="/blog" className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-[#1A3F6F] transition-colors">
                      Tout le journal <ChevronRight size={13} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {related.map((rp) => <RelatedCard key={rp.id} post={rp} />)}
                  </div>
                </section>
              )}
            </article>

            {/* ── Sidebar ── */}
            <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-28 space-y-5">

                {/* Auteur */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">Auteur</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #1A3F6F, #2563EB)' }}
                    >
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{post.author}</p>
                      <p className="text-xs text-slate-400">Expert Activ Automobiles</p>
                    </div>
                  </div>
                </div>

                {/* Infos article */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">Cet article</p>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                      <Clock size={13} className="text-[#1A3F6F] flex-shrink-0" />
                      {post.readTime} min de lecture
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                      <Calendar size={13} className="text-[#1A3F6F] flex-shrink-0" />
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                      <Tag size={13} className="text-[#1A3F6F] flex-shrink-0" />
                      {post.category}
                    </div>
                  </div>
                </div>

                {/* CTA catalogue */}
                <div
                  className="rounded-xl p-5"
                  style={{ background: 'linear-gradient(135deg, #0F1C2E 0%, #1A3F6F 100%)' }}
                >
                  <p className="text-white font-bold text-sm mb-1.5">Voitures d&apos;occasion</p>
                  <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Contrôlées, garanties et financées dans nos agences.
                  </p>
                  <Link
                    href="/voitures-occasion"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-opacity"
                    style={{ background: '#E8A020' }}
                  >
                    Voir nos voitures
                    <ChevronRight size={13} />
                  </Link>
                </div>

                {/* CTA financement */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <p className="text-sm font-bold text-slate-900 mb-1.5">Simuler un financement</p>
                  <p className="text-xs text-slate-500 mb-4">
                    Réponse de principe en 24h. Sans engagement.
                  </p>
                  <Link
                    href="/services/financement"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold transition-colors hover:bg-slate-50"
                    style={{
                      border: '1.5px solid #1A3F6F',
                      color: '#1A3F6F',
                    }}
                  >
                    Simuler
                    <ChevronRight size={13} />
                  </Link>
                </div>

                {/* CTA reprise */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <p className="text-sm font-bold text-slate-900 mb-1.5">Faire estimer votre voiture</p>
                  <p className="text-xs text-slate-500 mb-4">
                    Estimation gratuite en 24h.
                  </p>
                  <Link
                    href="/services/reprise"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    Estimation reprise
                    <ChevronRight size={13} />
                  </Link>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
