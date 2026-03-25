import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shield, CreditCard, CheckCircle2, Award, ChevronRight } from 'lucide-react';
import { getAllBrands, getVehiclesByBrand, getModelsByBrand } from '@/repository/vehicles';
import { SITE_URL, SITE_NAME, formatPrice } from '@/lib/utils';
import { getBrandSEO } from '@/lib/seo-brands';
import { SEO_CITIES } from '@/lib/seo-cities';
import VehicleGrid from '@/components/vehicles/VehicleGrid';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ marque: string }>;
}

async function findBrandBySlug(slug: string): Promise<string | null> {
  const brands = await getAllBrands();
  return (
    brands.find(
      (b) =>
        b
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') === slug
    ) ?? null
  );
}

export async function generateStaticParams() {
  const brands = await getAllBrands();
  return brands.map((brand) => ({
    marque: brand
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { marque } = await params;
  const brandName = await findBrandBySlug(marque);
  if (!brandName) return { title: 'Page introuvable' };

  const vehicles = await getVehiclesByBrand(brandName);
  const count = vehicles.length;
  const minPrice =
    count > 0 ? formatPrice(Math.min(...vehicles.map((v) => v.price))) : '';

  const title = `${brandName} d'occasion | Prix, modèles & garantie | Activ Automobiles`;
  const description =
    count > 0
      ? `${count} ${brandName} d'occasion à partir de ${minPrice}. Tous nos véhicules sont garantis 12 mois. Financement possible.`
      : `Découvrez nos ${brandName} d'occasion chez Activ Automobiles. Véhicules garantis 12 mois, financement et reprise.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/voitures-occasion/marque/${marque}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/voitures-occasion/marque/${marque}`,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og/voitures-occasion.jpg`,
          width: 1200,
          height: 630,
          alt: `${brandName} d'occasion — Activ Automobiles`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og/voitures-occasion.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function BrandFAQ({ brandName }: { brandName: string }) {
  const faqs = [
    {
      question: `Pourquoi acheter une ${brandName} d'occasion chez Activ Automobiles ?`,
      answer: `Chez Activ Automobiles, chaque ${brandName} d'occasion est rigoureusement inspectée par nos techniciens certifiés. Vous bénéficiez d'une garantie 12 mois minimum, d'un financement sur mesure et d'un service de reprise de votre ancien véhicule. Notre transparence sur l'historique et le prix vous assure un achat serein.`,
    },
    {
      question: `Quelle garantie pour une ${brandName} d'occasion ?`,
      answer: `Toutes nos ${brandName} d'occasion sont couvertes par une garantie minimum de 12 mois, extensible jusqu'à 24 mois. Cette garantie couvre les organes majeurs du véhicule : moteur, boîte de vitesses, direction, système de freinage et composants électroniques.`,
    },
    {
      question: `Peut-on financer l'achat d'une ${brandName} d'occasion ?`,
      answer: `Oui, Activ Automobiles propose plusieurs solutions de financement pour votre ${brandName} d'occasion : crédit classique, LOA (Location avec Option d'Achat) et LLD (Location Longue Durée). Nos conseillers financiers vous accompagnent pour trouver la meilleure offre selon votre budget et votre apport.`,
    },
    {
      question: `Quels modèles ${brandName} sont disponibles d'occasion ?`,
      answer: `Notre stock de ${brandName} d'occasion est régulièrement renouvelé et comprend les modèles les plus recherchés de la marque. Citadines, berlines, SUV, breaks : consultez notre catalogue en ligne pour découvrir les modèles disponibles ou contactez-nous pour une recherche personnalisée.`,
    },
  ];

  return (
    <section aria-labelledby="faq-heading" className="mt-16">
      <div
        className="rounded-2xl p-8"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <h2 id="faq-heading" className="text-2xl font-bold text-white mb-8">
          Questions fréquentes — {brandName} d&apos;occasion
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom:
                  i < faqs.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                paddingBottom: i < faqs.length - 1 ? '1.5rem' : '0',
              }}
            >
              <h3 className="text-base font-semibold text-white mb-2">{faq.question}</h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyBuySection({ brandName, usps }: { brandName: string; usps: string[] }) {
  const icons = [Shield, Award, CreditCard, CheckCircle2];

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-8">
        Pourquoi acheter une {brandName} d&apos;occasion chez Activ
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {usps.map((usp, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={usp}
              className="rounded-2xl p-6 transition-all duration-200 hover:border-blue-400/30"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
                  style={{ background: 'rgba(26,63,111,0.2)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#60a5fa' }} />
                </div>
                <p className="text-sm font-semibold text-white">{usp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CityLinks({ brandName }: { brandName: string }) {
  return (
    <div className="mt-10">
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        {brandName} d&apos;occasion par ville
      </p>
      <div className="flex flex-wrap gap-2">
        {SEO_CITIES.map((city) => (
          <Link
            key={city.slug}
            href={`/voitures-occasion/ville/${city.slug}`}
            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 hover:scale-105"
            style={{
              background: 'rgba(22,163,74,0.08)',
              border: '1px solid rgba(22,163,74,0.2)',
              color: '#16A34A',
            }}
          >
            {city.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function MarquePage({ params }: PageProps) {
  const { marque } = await params;
  const brandName = await findBrandBySlug(marque);

  if (!brandName) {
    notFound();
  }

  const [vehicles, models] = await Promise.all([
    getVehiclesByBrand(brandName),
    getModelsByBrand(brandName),
  ]);

  const sortedVehicles = [...vehicles].sort((a, b) => a.price - b.price);
  const brandSEO = getBrandSEO(brandName);
  const minPrice = vehicles.length > 0 ? Math.min(...vehicles.map((v) => v.price)) : 0;

  const faqItems = [
    {
      question: `Pourquoi acheter une ${brandName} d'occasion chez Activ Automobiles ?`,
      answer: `Chaque ${brandName} d'occasion est inspectée par nos techniciens, garantie 12 mois et finançable. Transparence totale sur l'historique et le prix.`,
    },
    {
      question: `Quelle garantie pour une ${brandName} d'occasion ?`,
      answer: `Garantie minimum 12 mois, extensible jusqu'à 24 mois, couvrant moteur, boîte, direction et freinage.`,
    },
    {
      question: `Peut-on financer l'achat d'une ${brandName} d'occasion ?`,
      answer: `Oui : crédit classique, LOA et LLD disponibles avec réponse sous 24h.`,
    },
    {
      question: `Quels modèles ${brandName} sont disponibles d'occasion ?`,
      answer: `Notre stock est régulièrement renouvelé. Consultez notre catalogue en ligne ou contactez-nous pour une recherche personnalisée.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: "Voitures d'occasion",
            item: `${SITE_URL}/voitures-occasion`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${brandName} d'occasion`,
            item: `${SITE_URL}/voitures-occasion/marque/${marque}`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        name: `${brandName} d'occasion — ${SITE_NAME}`,
        url: `${SITE_URL}/voitures-occasion/marque/${marque}`,
        numberOfItems: vehicles.length,
        itemListElement: sortedVehicles.slice(0, 20).map((v, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/voitures-occasion/${v.slug}`,
          name: `${v.brand} ${v.model} ${v.version} ${v.year}`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: '#0B1829', minHeight: '100vh' }}>
        {/* Hero band */}
        <div
          style={{
            background:
              'linear-gradient(180deg, rgba(26,63,111,0.12) 0%, transparent 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Breadcrumb */}
            <nav aria-label="Fil d'Ariane" className="mb-4">
              <ol
                className="flex items-center gap-2 text-xs flex-wrap"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                <li>
                  <Link href="/" className="hover:text-white transition-colors duration-150">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden="true" className="select-none">
                  /
                </li>
                <li>
                  <Link
                    href="/voitures-occasion"
                    className="hover:text-white transition-colors duration-150"
                  >
                    Voitures d&apos;occasion
                  </Link>
                </li>
                <li aria-hidden="true" className="select-none">
                  /
                </li>
                <li className="text-white font-medium">{brandName}</li>
              </ol>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
              {brandName} d&apos;occasion — Activ Automobiles
            </h1>
            <p
              className="text-base max-w-3xl leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {brandSEO.description}
            </p>

            {/* Stats bar */}
            {vehicles.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(26,63,111,0.15)',
                    border: '1px solid rgba(26,63,111,0.3)',
                    color: '#60a5fa',
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: '#60a5fa' }} />
                  {vehicles.length} {brandName} en stock
                </div>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(22,163,74,0.1)',
                    border: '1px solid rgba(22,163,74,0.25)',
                    color: '#16A34A',
                  }}
                >
                  À partir de {formatPrice(minPrice)}
                </div>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  <Shield className="w-3 h-3" />
                  Garantie 12 mois
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Vehicle grid */}
          <VehicleGrid
            vehicles={sortedVehicles}
            title={`${brandName} d'occasion`}
            showCount={true}
          />

          {/* Model chips */}
          {models.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-bold text-white mb-4">
                Modèles {brandName} disponibles
              </h2>
              <div className="flex flex-wrap gap-2">
                {models.map((model) => {
                  const modelSlug = model
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
                  return (
                    <Link
                      key={model}
                      href={`/voitures-occasion/${marque}/${modelSlug}`}
                      className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 hover:scale-105"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.8)',
                      }}
                    >
                      {brandName} {model}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Why buy section */}
          <WhyBuySection brandName={brandName} usps={brandSEO.usps} />

          {/* City links */}
          <CityLinks brandName={brandName} />

          {/* FAQ */}
          <BrandFAQ brandName={brandName} />

          {/* Back link */}
          <div className="mt-10 text-center">
            <Link
              href="/voitures-occasion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              ← Voir tous les véhicules
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
