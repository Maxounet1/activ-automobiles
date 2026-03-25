import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SITE_URL } from '@/lib/utils';
import ComparatorPageClient from '@/components/comparator/ComparatorPageClient';

export const metadata: Metadata = {
  title: "Comparateur de véhicules | Activ Automobiles",
  description: "Comparez jusqu'à 3 véhicules côte à côte : prix, kilométrage, motorisation, équipements. Trouvez la voiture qui vous correspond.",
  alternates: {
    canonical: `${SITE_URL}/comparer`,
  },
  openGraph: {
    title: "Comparateur de véhicules | Activ Automobiles",
    description: "Comparez jusqu'à 3 véhicules côte à côte et trouvez le meilleur choix selon vos critères.",
    url: 'https://www.activ-automobiles.fr/comparer',
    siteName: 'Activ Automobiles',
    locale: 'fr_FR',
    type: 'website',
    images: [{
      url: 'https://www.activ-automobiles.fr/og-default.jpg',
      width: 1200,
      height: 630,
      alt: 'Comparateur de véhicules Activ Automobiles'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Comparateur de véhicules | Activ Automobiles",
    description: "Comparez jusqu'à 3 véhicules côte à côte",
    images: ['https://www.activ-automobiles.fr/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ComparerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFC' }}>
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: '#1A3F6F', borderTopColor: 'transparent' }}
        />
      </div>
    }>
      <ComparatorPageClient />
    </Suspense>
  );
}
