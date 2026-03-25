import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { getAllAgencies, getAgencyBySlug } from '@/repository/agencies';
import { getVehiclesByAgency } from '@/repository/vehicles';
import { getAllReviews } from '@/repository/reviews';
import { SITE_URL, SITE_NAME } from '@/lib/utils';
import type { Agency } from '@/lib/types';

import HeroAgence from '@/components/agency/HeroAgence';
import MapBandeau from '@/components/agency/MapBandeau';
import RaisonsChoisir from '@/components/agency/RaisonsChoisir';
import PreuveHumaine from '@/components/agency/PreuveHumaine';
import ServicesAgence from '@/components/agency/ServicesAgence';
import StockAgence from '@/components/agency/StockAgence';
import AvisLocaux from '@/components/agency/AvisLocaux';
import CTAFinal from '@/components/agency/CTAFinal';

export const revalidate = 3600;

export async function generateStaticParams() {
  const agencies = await getAllAgencies();
  return agencies.map((a) => ({ ville: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string }>;
}): Promise<Metadata> {
  const { ville } = await params;
  const agency = await getAgencyBySlug(ville);
  if (!agency) return {};

  const title = `Activ Automobiles ${agency.city} — Voitures d'occasion garanties | ${agency.phone}`;
  const description = `Achetez votre véhicule d'occasion chez Activ Automobiles ${agency.city}. ${agency.reviewCount} avis clients · Note ${agency.rating}/5. Financement, reprise, garantie. Tél : ${agency.phone}.`;
  const url = `${SITE_URL}/agences/${agency.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1 } },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: agency.image, width: 1200, height: 630, alt: `Agence Activ Automobiles ${agency.city}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [agency.image],
    },
  };
}

const DAY_ABBR: Record<string, string> = {
  Lundi: 'Mo', Mardi: 'Tu', Mercredi: 'We', Jeudi: 'Th',
  Vendredi: 'Fr', Samedi: 'Sa', Dimanche: 'Su',
};

function formatSchemaHours(hours: Agency['openingHours']): string[] {
  return hours
    .filter((h) => h.hours !== 'Fermé')
    .flatMap((h) => {
      const abbr = DAY_ABBR[h.day] ?? h.day;
      return h.hours.split(' / ').map((slot) => {
        const [open, close] = slot.split(' - ');
        return `${abbr} ${(open ?? '09h00').replace('h', ':')} - ${(close ?? '18h00').replace('h', ':')}`;
      });
    });
}

export default async function AgencyPage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const agency = await getAgencyBySlug(ville);
  if (!agency) notFound();

  const [vehicles, allReviews] = await Promise.all([
    getVehiclesByAgency(agency.id),
    getAllReviews(),
  ]);

  const agencyReviews = allReviews.filter((r) => r.agencyId === agency.id);
  const displayedReviews = agencyReviews.length >= 3
    ? agencyReviews
    : allReviews.slice(0, 6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Nos Agences', item: `${SITE_URL}/agences` },
          { '@type': 'ListItem', position: 3, name: agency.city, item: `${SITE_URL}/agences/${agency.slug}` },
        ],
      },
      {
        '@type': ['AutoDealer', 'LocalBusiness'],
        '@id': `${SITE_URL}/agences/${agency.slug}`,
        name: agency.name,
        url: `${SITE_URL}/agences/${agency.slug}`,
        telephone: agency.phone,
        email: agency.email,
        description: agency.description,
        image: agency.image,
        priceRange: '€€',
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: { '@type': 'GeoCoordinates', latitude: agency.lat, longitude: agency.lng },
          geoRadius: '50000',
        },
        acceptsReservations: true,
        paymentAccepted: 'Carte bancaire, Virement bancaire, Financement',
        currenciesAccepted: 'EUR',
        address: {
          '@type': 'PostalAddress',
          streetAddress: agency.address,
          postalCode: agency.zipCode,
          addressLocality: agency.city,
          addressCountry: 'FR',
        },
        geo: { '@type': 'GeoCoordinates', latitude: agency.lat, longitude: agency.lng },
        openingHours: formatSchemaHours(agency.openingHours),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: agency.rating,
          reviewCount: agency.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        review: displayedReviews.slice(0, 5).map(r => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.author },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1,
          },
          reviewBody: r.comment,
          datePublished: r.date,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="bg-white min-h-screen">

        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
              <li><Link href="/" className="hover:text-[#1A3F6F] transition-colors">Accueil</Link></li>
              <ChevronRight className="w-3 h-3" />
              <li><Link href="/agences" className="hover:text-[#1A3F6F] transition-colors">Nos agences</Link></li>
              <ChevronRight className="w-3 h-3" />
              <li className="text-gray-700 font-medium">{agency.city}</li>
            </ol>
          </div>
        </nav>

        {/* 1. Hero */}
        <HeroAgence agency={agency} />

        {/* 2. Bandeau carte Google Maps */}
        <MapBandeau agency={agency} />

        {/* 3. Votre agence — équipe locale */}
        <PreuveHumaine
          city={agency.city}
          photos={[]}
          manager={
            agency.slug === 'nancy-laxou' ? {
              name: 'Nicolas',
              title: 'Responsable d\'agence — Activ Automobiles Nancy-Laxou',
              photo: '/Nikolaxou.webp',
              quote: 'Nicolas, dit Niko, vous accueille avec son équipe au sein de l\'agence. Chaque jour, ils accompagnent des particuliers dans l\'achat ou la reprise de leur véhicule, avec une approche simple : écouter, conseiller et sécuriser chaque décision. Vous êtes reçu par une équipe présente sur place, disponible pour échanger, répondre à vos questions et vous guider jusqu\'à la remise des clés.',
              tagline: 'Activ Automobiles Nancy-Laxou — Une équipe sur place, chaque jour',
              reviewCount: agency.reviewCount,
            }
            : agency.slug === 'epinal-chavelot' ? {
              name: 'Théo',
              title: 'Responsable d\'agence — Activ Automobiles Épinal-Chavelot',
              photo: '/TheoEpinal.webp',
              quote: 'Théo vous accueille avec son équipe au showroom d\'Épinal-Chavelot. Chaque jour, ils accompagnent des particuliers dans l\'achat ou la reprise de leur véhicule, avec une approche simple : écouter, conseiller et sécuriser chaque décision.',
              tagline: 'Activ Automobiles Épinal-Chavelot — Une équipe sur place, chaque jour',
              reviewCount: agency.reviewCount,
            }
            : agency.slug === 'la-mothe-achard' ? {
              name: 'Kevin',
              title: 'Responsable d\'agence — Activ Automobiles La Mothe-Achard',
              photo: '/Kevinlamothe.webp',
              quote: 'Kevin vous accueille avec son équipe au showroom de La Mothe-Achard. Chaque jour, ils accompagnent des particuliers dans l\'achat ou la reprise de leur véhicule, avec une approche simple : écouter, conseiller et sécuriser chaque décision.',
              tagline: 'Activ Automobiles La Mothe-Achard — Une équipe sur place, chaque jour',
              reviewCount: agency.reviewCount,
            }
            : agency.slug === 'bordeaux' ? {
              name: 'Laurent',
              title: 'Responsable d\'agence — Activ Automobiles Bordeaux',
              photo: '/LaurentBordeaux.webp',
              quote: 'Laurent vous accueille avec son équipe au showroom de Bordeaux. Chaque jour, ils accompagnent des particuliers dans l\'achat ou la reprise de leur véhicule, avec une approche simple : écouter, conseiller et sécuriser chaque décision.',
              tagline: 'Activ Automobiles Bordeaux — Une équipe sur place, chaque jour',
              reviewCount: agency.reviewCount,
            }
            : agency.slug === 'rennes' ? {
              name: 'Victor',
              title: 'Responsable d\'agence — Activ Automobiles Rennes',
              photo: '/VictorRennes.webp',
              quote: 'Victor vous accueille avec son équipe au showroom de Rennes. Chaque jour, ils accompagnent des particuliers dans l\'achat ou la reprise de leur véhicule, avec une approche simple : écouter, conseiller et sécuriser chaque décision.',
              tagline: 'Activ Automobiles Rennes — Une équipe sur place, chaque jour',
              reviewCount: agency.reviewCount,
            }
            : agency.slug === 'talange' ? {
              name: 'Vincent',
              title: 'Responsable d\'agence — Activ Automobiles Talange',
              photo: '/Vincent.webp',
              quote: 'Vincent vous accueille avec son équipe au showroom de Talange. Chaque jour, ils accompagnent des particuliers dans l\'achat ou la reprise de leur véhicule, avec une approche simple : écouter, conseiller et sécuriser chaque décision.',
              tagline: 'Activ Automobiles Talange — Une équipe sur place, chaque jour',
              reviewCount: agency.reviewCount,
            }
            : undefined
          }
        />

        {/* 3. Pourquoi nous choisir */}
        <RaisonsChoisir city={agency.city} />

        {/* 5. Services */}
        <ServicesAgence services={agency.services} city={agency.city} />

        {/* 6. Stock */}
        <StockAgence vehicles={vehicles} city={agency.city} agencyCity={agency.city} />

        {/* 7. Avis */}
        <AvisLocaux
          reviews={displayedReviews}
          agencyRating={agency.rating}
          agencyReviewCount={agency.reviewCount}
          city={agency.city}
        />

        {/* 8. CTA final */}
        <CTAFinal agencyId={agency.id} phone={agency.phone} city={agency.city} openingHours={agency.openingHours} />

      </main>
    </>
  );
}
