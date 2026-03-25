import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: "Voitures d'Occasion Garanties — 800+ Véhicules en Stock | Activ Automobiles",
  description:
    "Trouvez votre voiture d'occasion parmi 800+ véhicules sélectionnés et contrôlés sur 100 points. Garantie 12 mois incluse, financement sur mesure dès 5,9%/an, livraison partout en France. Nancy, Talange, Épinal, Bordeaux, Rennes, La Mothe-Achard.",
  keywords: [
    "voiture occasion",
    "voiture occasion garantie",
    "acheter voiture occasion",
    "véhicule occasion certifié",
    "voiture occasion Nancy",
    "voiture occasion Bordeaux",
    "voiture occasion Rennes",
    "financement auto occasion",
    "Activ Automobiles",
  ],
  alternates: {
    canonical: `${SITE_URL}/voitures-occasion`,
  },
  openGraph: {
    title: "Voitures d'Occasion Garanties — 800+ Véhicules | Activ Automobiles",
    description:
      "800+ véhicules d'occasion certifiés, garantis 12 mois et finançables. Stock actualisé en temps réel, livraison partout en France.",
    url: `${SITE_URL}/voitures-occasion`,
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_NAME,
    images: [{
      url: `${SITE_URL}/hero-main.webp`,
      width: 1920,
      height: 1080,
      alt: "Activ Automobiles — Voitures d'occasion premium garanties",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Voitures d'Occasion Garanties | Activ Automobiles",
    description: "800+ véhicules certifiés, garantie 12 mois, financement sur mesure.",
    images: [`${SITE_URL}/hero-main.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function VoituresOccasionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
