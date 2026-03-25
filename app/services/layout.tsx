import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Nos Services | Activ Automobiles — Reprise, Garantie, Livraison, Financement',
  description:
    'Découvrez tous les services Activ Automobiles : reprise de véhicule au meilleur prix, garantie 12 mois sur tous les véhicules, livraison à domicile partout en France et financement auto sur mesure.',
  keywords: [
    'services voiture occasion',
    'reprise véhicule',
    'garantie 12 mois auto',
    'livraison voiture domicile',
    'financement auto',
    'Activ Automobiles services',
  ],
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: 'Nos Services | Activ Automobiles',
    description:
      'Reprise, garantie 12 mois, livraison à domicile et financement auto sur mesure. Tous les services pour votre voiture d\'occasion avec Activ Automobiles.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Activ Automobiles',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Services Activ Automobiles' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nos Services | Activ Automobiles',
    description: 'Reprise, garantie 12 mois, livraison à domicile, financement sur mesure.',
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
