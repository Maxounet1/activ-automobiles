import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import USPSection from '@/components/home/USPSection';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import ReviewsSection from '@/components/home/ReviewsSection';
import AgenciesSection from '@/components/home/AgenciesSection';
import TrustBadges from '@/components/home/TrustBadges';
import ReassuranceSection from '@/components/home/ReassuranceSection';
import HomeSearchWidget from '@/components/home/HomeSearchWidget';
// TEMPORARILY DISABLED - AI Feature
// import PersonalizedSearchSection from '@/components/home/PersonalizedSearchSection';
import { getFeaturedVehicles, getAllVehicles } from '@/repository/vehicles';
import { getAllAgencies } from '@/repository/agencies';
import { getAllReviews } from '@/repository/reviews';
import { SITE_URL, SITE_NAME } from '@/lib/utils';

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Voitures d'Occasion Premium | Activ Automobiles",
  description:
    "Activ Automobiles — Plus de 800 voitures d'occasion premium sélectionnées, contrôlées sur 100 points et garanties 12 mois. Financement sur mesure, reprise immédiate. Paris, Lyon, Bordeaux.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Voitures d'Occasion Premium | Activ Automobiles",
    description:
      "Plus de 800 véhicules d'occasion sélectionnés, contrôlés et garantis 12 mois. Financement sur mesure, reprise immédiate. Paris, Lyon, Bordeaux.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Activ Automobiles — Voitures d'Occasion Premium",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Voitures d'Occasion Premium | Activ Automobiles",
    description:
      "Plus de 800 véhicules d'occasion sélectionnés. Financement sur mesure, reprise immédiate. Paris, Lyon, Bordeaux.",
    images: [`${SITE_URL}/og-default.jpg`],
  },
};

// ── JSON-LD helpers ───────────────────────────────────────────────────────────

function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'Activ Automobiles',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    image: `${SITE_URL}/og-default.jpg`,
    description:
      "Réseau de concessions automobiles spécialisé dans la vente de voitures d'occasion premium. Plus de 800 véhicules sélectionnés, garantis et financés. Agences à Paris, Lyon et Bordeaux.",
    telephone: '+33142567890',
    email: 'contact@activ-automobiles.fr',
    foundingDate: '2014',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 45 },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '2077',
      bestRating: '5',
      worstRating: '1',
    },
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '42 Avenue Félix Faure',
        addressLocality: 'Paris',
        postalCode: '75015',
        addressCountry: 'FR',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '18 Rue de la République',
        addressLocality: 'Lyon',
        postalCode: '69002',
        addressCountry: 'FR',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '5 Cours du Médoc',
        addressLocality: 'Bordeaux',
        postalCode: '33300',
        addressCountry: 'FR',
      },
    ],
    sameAs: [
      'https://www.facebook.com/activautomobiles',
      'https://www.instagram.com/activautos',
      'https://www.linkedin.com/company/activ-automobiles',
    ],
  };
}

function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/voitures-occasion?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [featuredVehicles, allVehicles, agencies, reviews] = await Promise.all([
    getFeaturedVehicles(6).catch(() => []),
    getAllVehicles().catch(() => []),
    getAllAgencies().catch(() => []),
    getAllReviews().catch(() => []),
  ]);

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebSiteJsonLd()),
        }}
      />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Reassurance + Notre promesse */}
      <ReassuranceSection />

      {/* 3. Stock search widget */}
      <HomeSearchWidget vehicles={allVehicles} />

      {/* TEMPORARILY DISABLED - AI Feature - Recherche personnalisée IA
      <PersonalizedSearchSection />
      */}

      {/* 4. USP section — Pourquoi nous choisir */}
      <USPSection />

      {/* 5. Featured vehicles */}
      <FeaturedVehicles vehicles={featuredVehicles} />

      {/* 6. Reviews section */}
      <ReviewsSection reviews={reviews} />

      {/* 6. Agencies section */}
      <AgenciesSection agencies={agencies} />

      {/* 7. Trust badges */}
      <TrustBadges />
    </>
  );
}
