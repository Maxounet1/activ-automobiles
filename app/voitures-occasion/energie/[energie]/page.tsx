import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getVehiclesByFuel } from '@/repository/vehicles';
import type { FuelType } from '@/lib/types';
import { SITE_URL, SITE_NAME, FUEL_TYPES } from '@/lib/utils';
import VehicleGrid from '@/components/vehicles/VehicleGrid';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ energie: string }>;
}

interface FuelMeta {
  value: FuelType;
  slug: string;
  label: string;
  labelLong: string;
  description: string;
  accentColor: string;
  accentBg: string;
}

const FUEL_PAGES: FuelMeta[] = [
  {
    value: 'essence',
    slug: 'essence',
    label: 'Essence',
    labelLong: 'Essence',
    description: "Polyvalentes et disponibles partout, les voitures essence d'occasion offrent souplesse d'utilisation et entretien accessible.",
    accentColor: '#f87171',
    accentBg: 'rgba(239,68,68,0.1)',
  },
  {
    value: 'diesel',
    slug: 'diesel',
    label: 'Diesel',
    labelLong: 'Diesel',
    description: "Robustes et économiques sur longs trajets, les voitures diesel d'occasion restent un choix populaire pour les grands rouleurs.",
    accentColor: '#60a5fa',
    accentBg: 'rgba(59,130,246,0.1)',
  },
  {
    value: 'hybride',
    slug: 'hybride',
    label: 'Hybride',
    labelLong: 'Hybride',
    description: "Alliant moteur thermique et électrique, les hybrides d'occasion réduisent la consommation en ville sans contrainte d'autonomie.",
    accentColor: '#34d399',
    accentBg: 'rgba(16,185,129,0.1)',
  },
  {
    value: 'electrique',
    slug: 'electrique',
    label: 'Électrique',
    labelLong: 'Électrique',
    description: "0 émission, 0 bruit. Les voitures électriques d'occasion combinent économies au quotidien et conduite moderne.",
    accentColor: '#a78bfa',
    accentBg: 'rgba(99,102,241,0.1)',
  },
  {
    value: 'hybride-rechargeable',
    slug: 'hybride-rechargeable',
    label: 'Hybride Rechargeable',
    labelLong: 'Hybride Rechargeable (PHEV)',
    description: "Le meilleur des deux mondes : roulez en électrique au quotidien et profitez du thermique pour les longs trajets.",
    accentColor: '#34d399',
    accentBg: 'rgba(16,185,129,0.1)',
  },
  {
    value: 'gpl',
    slug: 'gpl',
    label: 'GPL',
    labelLong: 'GPL (Gaz de Pétrole Liquéfié)',
    description: "Économiques à l'usage et moins polluants, les véhicules GPL d'occasion séduisent les conducteurs soucieux de leur budget carburant.",
    accentColor: '#fbbf24',
    accentBg: 'rgba(245,158,11,0.1)',
  },
];

function resolveFuelMeta(slug: string): FuelMeta | null {
  return FUEL_PAGES.find(f => f.slug === slug.toLowerCase()) ?? null;
}

export async function generateStaticParams() {
  return FUEL_PAGES.map(f => ({ energie: f.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { energie } = await params;
  const meta = resolveFuelMeta(energie);
  if (!meta) return { title: 'Page introuvable' };

  const vehicles = await getVehiclesByFuel(meta.value);
  const title = `Voitures ${meta.labelLong} d'occasion | ${SITE_NAME}`;
  const description = `Achetez votre voiture ${meta.label} d'occasion chez Activ Automobiles. ${
    vehicles.length > 0
      ? `${vehicles.length} véhicule${vehicles.length > 1 ? 's' : ''} ${meta.label.toLowerCase()} disponible${vehicles.length > 1 ? 's' : ''}.`
      : meta.description
  }`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/voitures-occasion/energie/${energie}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/voitures-occasion/energie/${energie}`,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og/voitures-occasion.jpg`,
          width: 1200,
          height: 630,
          alt: `Voitures ${meta.label} d'occasion — Activ Automobiles`,
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

function FuelFAQ({ meta }: { meta: FuelMeta }) {
  const faqs = [
    {
      question: `Pourquoi choisir une voiture ${meta.label} d'occasion chez Activ Automobiles ?`,
      answer: `${meta.description} Chez Activ Automobiles, chaque véhicule ${meta.label} d'occasion est contrôlé par nos techniciens, bénéficie d'une garantie et d'un financement adapté.`,
    },
    {
      question: `Quelle est l'autonomie d'une voiture ${meta.label} d'occasion ?`,
      answer: meta.value === 'electrique'
        ? "L'autonomie des véhicules électriques d'occasion varie entre 150 et 500 km selon le modèle et l'année. Nos conseillers vous guident vers le véhicule correspondant à votre usage quotidien."
        : meta.value === 'hybride' || meta.value === 'hybride-rechargeable'
        ? "Les véhicules hybrides d'occasion combinent la tranquillité d'un plein classique et l'économie d'une motorisation mixte, sans contrainte d'autonomie."
        : `Les véhicules ${meta.label} d'occasion offrent des autonomies comparables aux motorisations neuves, pour une utilisation quotidienne sereine.`,
    },
    {
      question: `Puis-je financer une voiture ${meta.label} d'occasion avec Activ Automobiles ?`,
      answer: `Oui, Activ Automobiles propose des solutions de financement pour tous nos véhicules ${meta.label} d'occasion : crédit classique, LOA ou LLD. Des réponses sous 24h avec des mensualités adaptées à votre budget.`,
    },
  ];

  return (
    <section aria-labelledby="faq-heading" className="mt-16">
      <div
        className="rounded-2xl p-8"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <h2 id="faq-heading" className="text-2xl font-bold text-white mb-8">
          Questions fréquentes — Voitures {meta.label} d&apos;occasion
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: i < faqs.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                paddingBottom: i < faqs.length - 1 ? '1.5rem' : '0',
              }}
            >
              <h3 className="text-base font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Quick links to other fuel types
function OtherFuelTypes({ current }: { current: string }) {
  const others = FUEL_PAGES.filter(f => f.slug !== current);
  return (
    <div className="mt-10">
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
        Autres énergies disponibles
      </p>
      <div className="flex flex-wrap gap-2">
        {others.map(f => (
          <Link
            key={f.slug}
            href={`/voitures-occasion/energie/${f.slug}`}
            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 hover:scale-105"
            style={{
              background: f.accentBg,
              border: `1px solid ${f.accentColor}33`,
              color: f.accentColor,
            }}
          >
            {f.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function EnergiePage({ params }: PageProps) {
  const { energie } = await params;
  const meta = resolveFuelMeta(energie);

  if (!meta) {
    notFound();
  }

  const vehicles = await getVehiclesByFuel(meta.value);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: "Voitures d'occasion", item: `${SITE_URL}/voitures-occasion` },
          {
            '@type': 'ListItem',
            position: 3,
            name: `Voitures ${meta.label} d'occasion`,
            item: `${SITE_URL}/voitures-occasion/energie/${energie}`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        name: `Voitures ${meta.labelLong} d'occasion — ${SITE_NAME}`,
        url: `${SITE_URL}/voitures-occasion/energie/${energie}`,
        numberOfItems: vehicles.length,
        itemListElement: vehicles.slice(0, 20).map((v, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/voitures-occasion/${v.slug}`,
          name: `${v.brand} ${v.model} ${v.version} ${v.year}`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Pourquoi choisir une voiture ${meta.label} d'occasion chez Activ Automobiles ?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${meta.description} Chaque véhicule ${meta.label} d'occasion est contrôlé, garanti et finançable.`,
            },
          },
          {
            '@type': 'Question',
            name: `Puis-je financer une voiture ${meta.label} d'occasion ?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Oui, Activ Automobiles propose crédit classique, LOA et LLD pour tous nos véhicules ${meta.label} d'occasion.`,
            },
          },
        ],
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
            background: `linear-gradient(180deg, ${meta.accentBg} 0%, transparent 100%)`,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Breadcrumb */}
            <nav aria-label="Fil d'Ariane" className="mb-4">
              <ol className="flex items-center gap-2 text-xs flex-wrap" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <li>
                  <Link href="/" className="hover:text-white transition-colors duration-150">Accueil</Link>
                </li>
                <li aria-hidden="true" className="select-none">/</li>
                <li>
                  <Link href="/voitures-occasion" className="hover:text-white transition-colors duration-150">
                    Voitures d&apos;occasion
                  </Link>
                </li>
                <li aria-hidden="true" className="select-none">/</li>
                <li className="text-white font-medium">Voitures {meta.label}</li>
              </ol>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
              Voitures {meta.labelLong} d&apos;occasion
            </h1>
            <p className="text-base max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {meta.description}
            </p>

            {vehicles.length > 0 && (
              <div
                className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs font-semibold"
                style={{ background: meta.accentBg, border: `1px solid ${meta.accentColor}40`, color: meta.accentColor }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: meta.accentColor }} />
                {vehicles.length} véhicule{vehicles.length > 1 ? 's' : ''} {meta.label.toLowerCase()} disponible{vehicles.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>

        {/* Grid */}
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <VehicleGrid
            vehicles={vehicles}
            title={`Voitures ${meta.label} d'occasion`}
            showCount={true}
          />

          <OtherFuelTypes current={energie} />
          <FuelFAQ meta={meta} />

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
