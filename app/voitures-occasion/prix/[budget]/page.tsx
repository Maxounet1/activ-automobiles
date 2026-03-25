import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getVehiclesByBudget } from '@/repository/vehicles';
import { SITE_URL, SITE_NAME, BUDGET_RANGES, formatPrice } from '@/lib/utils';
import type { BudgetRange } from '@/lib/types';
import VehicleGrid from '@/components/vehicles/VehicleGrid';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ budget: string }>;
}

function resolveBudgetRange(slug: string): BudgetRange | null {
  return BUDGET_RANGES.find(b => b.slug === slug) ?? null;
}

function budgetTitle(range: BudgetRange): string {
  if (range.min === 0) return `Moins de ${formatPrice(range.max)}`;
  if (range.max >= 999990) return `Plus de ${formatPrice(range.min)}`;
  return `${formatPrice(range.min)} - ${formatPrice(range.max)}`;
}

export async function generateStaticParams() {
  return BUDGET_RANGES.map(b => ({ budget: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { budget } = await params;
  const range = resolveBudgetRange(budget);
  if (!range) return { title: 'Page introuvable' };

  const vehicles = await getVehiclesByBudget(range.min, range.max);
  const rangeLabel = budgetTitle(range);
  const title = `Voitures d'occasion ${rangeLabel} | ${SITE_NAME}`;
  const description = `Trouvez votre voiture d'occasion entre ${range.label.toLowerCase()} chez Activ Automobiles. ${
    vehicles.length > 0
      ? `${vehicles.length} véhicule${vehicles.length > 1 ? 's' : ''} disponible${vehicles.length > 1 ? 's' : ''} dans ce budget.`
      : 'Véhicules contrôlés, garantis et finançables.'
  }`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/voitures-occasion/prix/${budget}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/voitures-occasion/prix/${budget}`,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og/voitures-occasion.jpg`,
          width: 1200,
          height: 630,
          alt: `Voitures d'occasion ${rangeLabel} — Activ Automobiles`,
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

function BudgetFAQ({ range }: { range: BudgetRange }) {
  const rangeLabel = budgetTitle(range);
  const faqs = [
    {
      question: `Quelles voitures d'occasion trouve-t-on entre ${range.label.toLowerCase()} ?`,
      answer: range.min === 0
        ? `Avec moins de ${formatPrice(range.max)}, Activ Automobiles vous propose des citadines et compactes d'occasion en bon état, idéales pour la ville. Toutes sont contrôlées et garanties pour un achat serein.`
        : range.max >= 999990
        ? `Au-delà de ${formatPrice(range.min)}, notre catalogue d'occasion comprend berlines premium, SUV haut de gamme et véhicules récents avec faible kilométrage. Un large choix de marques prestigieuses.`
        : `Dans la tranche ${range.label.toLowerCase()}, vous trouverez chez Activ Automobiles un large choix de berlines, SUV, breaks et citadines d'occasion récents, avec kilométrage maîtrisé et historique connu.`,
    },
    {
      question: `Peut-on financer une voiture d'occasion ${rangeLabel} ?`,
      answer: `Oui, Activ Automobiles propose des solutions de financement pour tous les budgets : crédit classique, LOA (Location avec Option d'Achat) et LLD (Location Longue Durée). Pour un véhicule à ${rangeLabel.toLowerCase()}, des mensualités adaptées sont possibles selon votre apport et la durée souhaitée. Réponse sous 24h.`,
    },
    {
      question: `Quelle garantie pour les véhicules d'occasion dans cette gamme de prix ?`,
      answer: `Tous nos véhicules d'occasion ${rangeLabel.toLowerCase()} bénéficient d'une garantie minimum de 6 mois, extensible jusqu'à 24 mois. Nos techniciens certifiés réalisent un contrôle complet avant toute mise en vente : moteur, boîte, électronique, carrosserie.`,
    },
  ];

  return (
    <section aria-labelledby="faq-heading" className="mt-16">
      <div
        className="rounded-2xl p-8"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <h2 id="faq-heading" className="text-2xl font-bold text-white mb-8">
          Questions fréquentes — Budget {rangeLabel}
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

function OtherBudgets({ current }: { current: string }) {
  const others = BUDGET_RANGES.filter(b => b.slug !== current);
  return (
    <div className="mt-10">
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
        Autres tranches de budget
      </p>
      <div className="flex flex-wrap gap-2">
        {others.map(b => (
          <Link
            key={b.slug}
            href={`/voitures-occasion/prix/${b.slug}`}
            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 hover:scale-105"
            style={{
              background: 'rgba(0,102,255,0.07)',
              border: '1px solid rgba(0,102,255,0.18)',
              color: '#1A3F6F',
            }}
          >
            {b.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function BudgetPage({ params }: PageProps) {
  const { budget } = await params;
  const range = resolveBudgetRange(budget);

  if (!range) {
    notFound();
  }

  const vehicles = await getVehiclesByBudget(range.min, range.max);
  const rangeLabel = budgetTitle(range);

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
            name: `Budget ${rangeLabel}`,
            item: `${SITE_URL}/voitures-occasion/prix/${budget}`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        name: `Voitures d'occasion ${rangeLabel} — ${SITE_NAME}`,
        url: `${SITE_URL}/voitures-occasion/prix/${budget}`,
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
            name: `Quelles voitures d'occasion trouve-t-on entre ${range.label.toLowerCase()} ?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: range.min === 0
                ? `Avec moins de ${formatPrice(range.max)}, vous trouverez des citadines et compactes d'occasion contrôlées et garanties.`
                : `Dans la tranche ${range.label.toLowerCase()}, un large choix de berlines, SUV et breaks récents est disponible.`,
            },
          },
          {
            '@type': 'Question',
            name: `Peut-on financer une voiture d'occasion ${rangeLabel} ?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Oui, Activ Automobiles propose crédit classique, LOA et LLD pour tous les budgets. Réponse sous 24h.`,
            },
          },
          {
            '@type': 'Question',
            name: `Quelle garantie pour les véhicules d'occasion dans cette gamme de prix ?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Tous nos véhicules bénéficient d'une garantie minimum de 6 mois, extensible jusqu'à 24 mois, après contrôle complet par nos techniciens certifiés.`,
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
            background: 'linear-gradient(180deg, rgba(0,102,255,0.08) 0%, transparent 100%)',
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
                <li className="text-white font-medium">Budget {rangeLabel}</li>
              </ol>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
              Voitures d&apos;occasion{' '}
              <span style={{ color: '#1A3F6F' }}>{rangeLabel}</span>
            </h1>
            <p className="text-base max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {vehicles.length > 0
                ? `${vehicles.length} véhicule${vehicles.length > 1 ? 's' : ''} disponible${vehicles.length > 1 ? 's' : ''} dans cette gamme de prix — contrôlé${vehicles.length > 1 ? 's' : ''}, garanti${vehicles.length > 1 ? 's' : ''} et finançable${vehicles.length > 1 ? 's' : ''}.`
                : `Découvrez notre sélection de voitures d'occasion dans la tranche ${range.label.toLowerCase()}.`}
            </p>

            {/* Budget badge */}
            <div
              className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(0,102,255,0.08)',
                border: '1px solid rgba(0,102,255,0.2)',
                color: '#1A3F6F',
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: '#1A3F6F' }} />
              {range.label}
            </div>
          </div>
        </div>

        {/* Grid */}
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <VehicleGrid
            vehicles={vehicles}
            title={`Voitures d'occasion ${rangeLabel}`}
            showCount={true}
          />

          <OtherBudgets current={budget} />
          <BudgetFAQ range={range} />

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
