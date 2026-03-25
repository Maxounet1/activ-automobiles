import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import ScrollProgressBar from '@/components/common/ScrollProgressBar';
import SocialProofToast from '@/components/common/SocialProofToast';
import { ComparatorProvider } from '@/lib/comparator-store';
import { WebVitals } from './web-vitals';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';

import ClientCookieBanner from '@/components/common/ClientCookieBanner';
import ClientComparatorBar from '@/components/comparator/ClientComparatorBar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  other: {
    'application-name': 'Activ Automobiles',
    'format-detection': 'telephone=no',
  },
  themeColor: '#1A3F6F',
  title: {
    default: "Activ Automobiles | Voitures d'Occasion Premium",
    template: 'Activ Automobiles | %s',
  },
  description:
    "800+ voitures d'occasion premium. Contrôlées, garanties 12 mois, financées. Reprise immédiate. 6 agences en France — Nancy, Talange, Épinal, Bordeaux, Rennes.",
  keywords: [
    "voiture occasion",
    "auto occasion",
    "financement auto",
    "reprise véhicule",
    "concession automobile",
    "voiture occasion paris",
    "voiture occasion lyon",
    "voiture occasion bordeaux",
    "garantie automobile",
  ],
  authors: [{ name: 'Activ Automobiles' }],
  creator: 'Activ Automobiles',
  metadataBase: new URL('https://www.activ-automobiles.fr'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.activ-automobiles.fr',
    siteName: 'Activ Automobiles',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Activ Automobiles — Voitures d\'Occasion Premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@activauto',
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.activ-automobiles.fr/#organization',
  name: 'Activ Automobiles',
  url: 'https://www.activ-automobiles.fr',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.activ-automobiles.fr/logo.webp',
    width: 250,
    height: 60,
  },
  description: 'Spécialiste de la vente de voitures d\'occasion premium. 800+ véhicules contrôlés, garantis 12 mois et financés. 6 agences en France.',
  areaServed: 'FR',
  sameAs: [
    'https://www.facebook.com/activautomobiles',
    'https://www.instagram.com/activautomobiles',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    areaServed: 'FR',
    availableLanguage: ['French'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Font Inter loaded via next/font/google — no external stylesheet needed */}
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title="Activ Automobiles — Recherche de véhicules"
          href="/opensearch.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black">
          Aller au contenu principal
        </a>
        <GoogleAnalytics />
        <WebVitals />
        <ComparatorProvider>
          <ScrollProgressBar />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <ClientComparatorBar />
          <Toaster />
          <SocialProofToast />
          <ClientCookieBanner />
        </ComparatorProvider>
      </body>
    </html>
  );
}
