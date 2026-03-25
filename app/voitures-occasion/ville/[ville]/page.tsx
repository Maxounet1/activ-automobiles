import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Clock, Shield, CreditCard, Truck, CheckCircle2, ChevronRight } from 'lucide-react';
import { getVehiclesByAgency } from '@/repository/vehicles';
import { getAgencyById } from '@/repository/agencies';
import { SITE_URL, SITE_NAME } from '@/lib/utils';
import { SEO_CITIES, getCityBySlug, getAllCitySlugs } from '@/lib/seo-cities';
import VehicleGrid from '@/components/vehicles/VehicleGrid';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ ville: string }>;
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((ville) => ({ ville }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) return { title: 'Page introuvable' };

  const vehicles = await getVehiclesByAgency(city.nearestAgencyId);
  const count = vehicles.length;

  const title = `Voiture d'occasion à ${city.name} | Activ Automobiles`;
  const description = `Découvrez ${count > 0 ? count : 'nos'} véhicules d'occasion garantis à ${city.name}. Financement, reprise, garantie 12 mois. Agence Activ Automobiles à ${city.nearestAgencyCity}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/voitures-occasion/ville/${ville}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/voitures-occasion/ville/${ville}`,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og/voitures-occasion.jpg`,
          width: 1200,
          height: 630,
          alt: `Voitures d'occasion à ${city.name} — Activ Automobiles`,
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

function CityFAQ({ cityName, agencyCity }: { cityName: string; agencyCity: string }) {
  const faqs = [
    {
      question: `Où acheter une voiture d'occasion à ${cityName} ?`,
      answer: `Activ Automobiles vous accueille dans son agence de ${agencyCity}, la plus proche de ${cityName}. Vous y trouverez un large choix de véhicules d'occasion contrôlés, garantis 12 mois et disponibles immédiatement. Nous proposons également la livraison à domicile.`,
    },
    {
      question: `Quel est le prix moyen d'une voiture d'occasion à ${cityName} ?`,
      answer: `Les prix varient selon la marque, le modèle et le kilométrage. Chez Activ Automobiles, notre catalogue démarre aux alentours de 7 000 € pour des citadines récentes et peut atteindre plus de 50 000 € pour des véhicules premium. Tous nos véhicules sont négociés pour offrir le meilleur rapport qualité-prix de la région.`,
    },
    {
      question: `Est-ce que Activ Automobiles livre à ${cityName} ?`,
      answer: `Oui, Activ Automobiles propose un service de livraison à domicile à ${cityName} et dans toute la région. Vous pouvez finaliser votre achat à distance et recevoir votre véhicule directement chez vous. Contactez notre agence de ${agencyCity} pour connaître les modalités.`,
    },
    {
      question: `Quelles garanties sur les voitures d'occasion à ${cityName} ?`,
      answer: `Tous nos véhicules d'occasion bénéficient d'une garantie minimum de 12 mois, extensible jusqu'à 24 mois. Chaque voiture passe un contrôle technique approfondi réalisé par nos techniciens certifiés avant la mise en vente. Moteur, boîte de vitesses, électronique : tout est vérifié.`,
    },
    {
      question: `Peut-on faire reprendre son véhicule à ${cityName} ?`,
      answer: `Absolument. Activ Automobiles propose la reprise de votre véhicule actuel, avec une estimation gratuite et sans engagement. Le montant de la reprise peut servir d'apport pour votre nouveau véhicule. Contactez-nous pour obtenir une estimation rapide.`,
    },
  ];

  return (
    <section aria-labelledby="faq-heading" className="mt-16">
      <div
        className="rounded-2xl p-8"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <h2 id="faq-heading" className="text-2xl font-bold text-white mb-8">
          Questions fréquentes — Voiture d&apos;occasion à {cityName}
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

function USPSection({ cityName }: { cityName: string }) {
  const usps = [
    {
      icon: Shield,
      title: 'Garantie 12 mois incluse',
      text: `Chaque véhicule vendu à ${cityName} bénéficie d'une garantie de 12 mois minimum, extensible jusqu'à 24 mois pour votre tranquillité.`,
    },
    {
      icon: CreditCard,
      title: 'Financement sur mesure',
      text: 'Crédit classique, LOA ou LLD : nos conseillers trouvent la solution de financement adaptée à votre budget, avec réponse sous 24h.',
    },
    {
      icon: Truck,
      title: `Livraison à ${cityName}`,
      text: `Pas le temps de vous déplacer ? Nous livrons votre véhicule directement à votre domicile à ${cityName} et dans toute la région.`,
    },
    {
      icon: CheckCircle2,
      title: 'Véhicules contrôlés',
      text: 'Chaque voiture passe un contrôle mécanique complet par nos techniciens certifiés : moteur, freins, électronique, carrosserie.',
    },
  ];

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-8">
        Pourquoi acheter chez Activ à {cityName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {usps.map((usp) => {
          const Icon = usp.icon;
          return (
            <div
              key={usp.title}
              className="rounded-2xl p-6 transition-all duration-200 hover:border-blue-400/30"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{ background: 'rgba(22,163,74,0.15)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#16A34A' }} />
                </div>
                <h3 className="text-base font-semibold text-white">{usp.title}</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {usp.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function NearbyCities({ currentSlug }: { currentSlug: string }) {
  const current = getCityBySlug(currentSlug);
  if (!current) return null;

  const nearby = current.nearbyCitySlugs
    .map((s) => SEO_CITIES.find((c) => c.slug === s))
    .filter(Boolean);

  if (nearby.length === 0) return null;

  return (
    <div className="mt-10">
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        Voitures d&apos;occasion dans les villes proches
      </p>
      <div className="flex flex-wrap gap-2">
        {nearby.map((c) => (
          <Link
            key={c!.slug}
            href={`/voitures-occasion/ville/${c!.slug}`}
            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 hover:scale-105"
            style={{
              background: 'rgba(22,163,74,0.08)',
              border: '1px solid rgba(22,163,74,0.2)',
              color: '#16A34A',
            }}
          >
            {c!.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function VillePage({ params }: PageProps) {
  const { ville } = await params;
  const city = getCityBySlug(ville);

  if (!city) {
    notFound();
  }

  const vehicles = await getVehiclesByAgency(city.nearestAgencyId);
  const agency = await getAgencyById(city.nearestAgencyId);
  const displayVehicles = vehicles.slice(0, 12);

  const faqItems = [
    {
      question: `Où acheter une voiture d'occasion à ${city.name} ?`,
      answer: `Activ Automobiles vous accueille dans son agence de ${city.nearestAgencyCity}, la plus proche de ${city.name}. Large choix de véhicules garantis 12 mois et livraison à domicile.`,
    },
    {
      question: `Quel est le prix moyen d'une voiture d'occasion à ${city.name} ?`,
      answer: `Nos prix démarrent à environ 7 000 € pour des citadines récentes et vont au-delà de 50 000 € pour des véhicules premium. Tous nos véhicules offrent le meilleur rapport qualité-prix.`,
    },
    {
      question: `Est-ce que Activ Automobiles livre à ${city.name} ?`,
      answer: `Oui, Activ Automobiles propose un service de livraison à domicile à ${city.name} et dans toute la région.`,
    },
    {
      question: `Quelles garanties sur les voitures d'occasion à ${city.name} ?`,
      answer: `Tous nos véhicules bénéficient d'une garantie minimum de 12 mois, extensible jusqu'à 24 mois, après contrôle technique complet.`,
    },
    {
      question: `Peut-on faire reprendre son véhicule à ${city.name} ?`,
      answer: `Oui, nous proposons la reprise de votre véhicule actuel avec estimation gratuite et sans engagement.`,
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
            name: `Voitures d'occasion à ${city.name}`,
            item: `${SITE_URL}/voitures-occasion/ville/${ville}`,
          },
        ],
      },
      {
        '@type': 'AutoDealer',
        name: `Activ Automobiles — ${city.nearestAgencyCity}`,
        url: `${SITE_URL}/voitures-occasion/ville/${ville}`,
        ...(agency && {
          address: {
            '@type': 'PostalAddress',
            streetAddress: agency.address,
            addressLocality: agency.city,
            postalCode: agency.zipCode,
            addressCountry: 'FR',
          },
          telephone: agency.phone,
          geo: {
            '@type': 'GeoCoordinates',
            latitude: agency.lat,
            longitude: agency.lng,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: agency.rating,
            reviewCount: agency.reviewCount,
          },
        }),
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
            background: 'linear-gradient(180deg, rgba(22,163,74,0.08) 0%, transparent 100%)',
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
                <li className="text-white font-medium">{city.name}</li>
              </ol>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
              Voiture d&apos;occasion à {city.name} — Activ Automobiles
            </h1>
            <p
              className="text-base max-w-3xl leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {city.description}
            </p>

            {vehicles.length > 0 && (
              <div
                className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs font-semibold"
                style={{
                  background: 'rgba(22,163,74,0.1)',
                  border: '1px solid rgba(22,163,74,0.25)',
                  color: '#16A34A',
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: '#16A34A' }} />
                {vehicles.length} véhicule{vehicles.length > 1 ? 's' : ''} disponible
                {vehicles.length > 1 ? 's' : ''} près de {city.name}
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Vehicle grid */}
          <VehicleGrid vehicles={displayVehicles} title={`Véhicules disponibles près de ${city.name}`} showCount={true} />

          {vehicles.length > 12 && (
            <div className="mt-8 text-center">
              <Link
                href={`/voitures-occasion?agence=${city.nearestAgencyId}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
                }}
              >
                Voir tous les véhicules
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Agency card */}
          {agency && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">
                Notre agence près de {city.name}
              </h2>
              <div
                className="rounded-2xl p-6 sm:p-8"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-4">{agency.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: '#16A34A' }}
                        />
                        <div>
                          <p className="text-sm text-white/70">{agency.address}</p>
                          <p className="text-sm text-white/70">
                            {agency.zipCode} {agency.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: '#16A34A' }}
                        />
                        <a
                          href={`tel:${agency.phone.replace(/\s/g, '')}`}
                          className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {agency.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: '#16A34A' }}
                        />
                        <div className="text-sm text-white/70">
                          {agency.openingHours.slice(0, 3).map((oh) => (
                            <p key={oh.day}>
                              {oh.day} : {oh.hours}
                            </p>
                          ))}
                          <Link
                            href={`/agences/${agency.slug}`}
                            className="text-xs text-blue-400 hover:text-blue-300 mt-1 inline-block"
                          >
                            Voir tous les horaires →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:justify-center">
                    <Link
                      href={`/agences/${agency.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
                        color: '#fff',
                        boxShadow: '0 4px 14px rgba(26,63,111,0.3)',
                      }}
                    >
                      Voir l&apos;agence
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${agency.lat},${agency.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.75)',
                      }}
                    >
                      <MapPin className="w-4 h-4" />
                      Itinéraire
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* USPs */}
          <USPSection cityName={city.name} />

          {/* Nearby cities */}
          <NearbyCities currentSlug={ville} />

          {/* FAQ */}
          <CityFAQ cityName={city.name} agencyCity={city.nearestAgencyCity} />

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all duration-150 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(22,163,74,0.35)',
              }}
            >
              Contactez notre agence
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-8 text-center">
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
