import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Car, Star, Building2, Truck, ShieldCheck, Wrench, CircleCheck as CheckCircle, ChevronRight, ArrowRight, Phone, Mail, Clock, Settings, CalendarCheck } from 'lucide-react';
import { getAllAgencies } from '@/repository/agencies';
import { getVehiclesByAgency } from '@/repository/vehicles';
import { SITE_URL, SITE_NAME } from '@/lib/utils';
import AgencyCard from '@/components/agency/AgencyCard';
import ClientAgencyInteractiveMap from '@/components/agency/ClientAgencyInteractiveMap';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Nos Agences | Activ Automobiles — 6 showrooms en France',
  description:
    "Retrouvez nos 6 agences Activ Automobiles : Nancy-Laxou, Talange, Épinal, La Mothe-Achard, Bordeaux, Rennes. Voitures d'occasion contrôlées, garanties et financées. Livraison partout en France.",
  alternates: { canonical: `${SITE_URL}/agences` },
  openGraph: {
    title: 'Nos Agences | Activ Automobiles — 6 showrooms en France',
    description:
      "Retrouvez nos 6 agences Activ Automobiles. Véhicules d'occasion contrôlés, garantis et financés. Livraison partout en France.",
    url: `${SITE_URL}/agences`,
    siteName: SITE_NAME,
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: 'Agences Activ Automobiles' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nos 6 Agences | Activ Automobiles',
    description: "Nancy, Talange, Épinal, La Mothe-Achard, Bordeaux, Rennes — voitures d'occasion garanties.",
    images: [`${SITE_URL}/og-default.jpg`],
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

const DELIVERY_BENEFITS = [
  { icon: Truck, title: 'Livraison à domicile', desc: "Un convoyeur professionnel livre votre véhicule clé en main, sur rendez-vous, à l'adresse de votre choix." },
  { icon: Settings, title: 'Livraison en point AD', desc: "Récupérez votre voiture dans un garage partenaire du réseau AD près de chez vous, avec expertise locale." },
  { icon: CalendarCheck, title: 'Horaires flexibles', desc: "Planifiez votre remise selon vos disponibilités. Nos conseillers s'adaptent à votre emploi du temps." },
  { icon: ShieldCheck, title: 'Délai garanti', desc: "10 à 15 jours après préparation complète. Révision, nettoyage, diagnostic — livré prêt à rouler." },
];

const APRES_VENTE_ITEMS = [
  { icon: Wrench, title: 'Entretien simplifié', desc: 'Réseau AD partout en France, sans perdre votre garantie constructeur.' },
  { icon: ShieldCheck, title: 'Garantie préservée', desc: 'Valable dans tout garage professionnel agréé, partout en France.' },
  { icon: CheckCircle, title: 'Véhicules révisés', desc: 'Chaque voiture rigoureusement contrôlée et révisée avant livraison.' },
  { icon: CalendarCheck, title: 'RDV rapide', desc: 'Planifiez votre livraison ou entretien en quelques clics.' },
];

export default async function AgencesPage() {
  const agencies = await getAllAgencies().catch(() => []);
  const vehiclesByAgency = await Promise.all(
    agencies.map((agency) => getVehiclesByAgency(agency.id).catch(() => []))
  );
  const vehicleCounts = agencies.map((agency, i) => ({
    agency,
    count: vehiclesByAgency[i].length,
  }));
  const avgRating = agencies.length > 0
    ? agencies.reduce((sum, a) => sum + (a.rating ?? 0), 0) / agencies.length
    : 0;
  const totalReviews = agencies.reduce((sum, a) => sum + (a.reviewCount ?? 0), 0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Nos Agences', item: `${SITE_URL}/agences` },
        ],
      },
      ...agencies.map((agency) => ({
        '@type': ['AutoDealer', 'LocalBusiness'],
        '@id': `${SITE_URL}/agences/${agency.slug}`,
        name: agency.name,
        url: `${SITE_URL}/agences/${agency.slug}`,
        telephone: agency.phone,
        email: agency.email,
        description: agency.description,
        image: agency.image,
        address: {
          '@type': 'PostalAddress',
          streetAddress: agency.address,
          postalCode: agency.zipCode,
          addressLocality: agency.city,
          addressCountry: 'FR',
        },
        geo: { '@type': 'GeoCoordinates', latitude: agency.lat, longitude: agency.lng },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: agency.rating,
          reviewCount: agency.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-white min-h-screen">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Fil d'Ariane" className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center gap-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-[#1A3F6F] transition-colors">Accueil</Link></li>
              <ChevronRight className="w-3 h-3" />
              <li className="text-gray-700 font-medium">Nos agences</li>
            </ol>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-20 pb-16" style={{ background: 'linear-gradient(170deg, #0B1829 0%, #112240 60%, #0F2040 100%)' }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 80% at 80% 30%, rgba(37,99,235,0.12) 0%, transparent 65%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 40% 50% at 10% 80%, rgba(26,63,111,0.18) 0%, transparent 60%)',
            }}
          />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12" style={{ background: '#3B82F6' }} />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#93C5FD' }}>
                    {agencies.length} showrooms en France
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.05] tracking-tight mb-4">
                  Nos agences{' '}
                  <span style={{ color: '#8A9BB0' }}>
                    près de chez vous.
                  </span>
                </h1>
                <p className="text-base leading-relaxed mb-6 max-w-lg" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  6 showrooms implantés en France, de la Moselle à la Vendée. Venez découvrir nos véhicules en vrai, rencontrer nos conseillers et repartir avec votre prochaine voiture.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: Building2, label: `${agencies.length} showrooms`, desc: 'En France métropolitaine' },
                    { icon: Car, label: '800+ véhicules', desc: 'Disponibles en stock' },
                    { icon: Star, label: `${avgRating.toFixed(1)}/5`, desc: `${totalReviews} avis clients` },
                    { icon: Truck, label: 'Livraison France', desc: 'Partout, sur demande' },
                  ].map(({ icon: Icon, label, desc }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 rounded-xl p-3.5 transition-all"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white leading-tight">{label}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.50)' }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="#agences"
                    className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3 font-bold text-white text-sm transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.99]"
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      border: '1.5px solid rgba(255,255,255,0.28)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    Trouver mon agence
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3 font-bold text-white text-sm transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.99]"
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      border: '1.5px solid rgba(255,255,255,0.28)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    Nous contacter
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Visual card */}
              <div className="hidden lg:flex justify-center">
                <div
                  className="relative rounded-2xl overflow-hidden w-full"
                  style={{
                    maxWidth: 380,
                    background: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.32)',
                  }}
                >
                  {/* Header band */}
                  <div
                    className="px-5 pt-4 pb-3.5"
                    style={{ background: 'linear-gradient(135deg, #0B1829 0%, #1A3F6F 100%)' }}
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
                      >
                        <Building2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-black text-xs tracking-wide">Activ Automobiles</p>
                        <p className="text-blue-300 text-[10px] font-medium">Réseau national · 6 showrooms</p>
                      </div>
                    </div>
                    <p className="text-white text-sm font-black leading-snug">
                      Un showroom toujours proche,{' '}
                      <span style={{ color: 'rgba(255,255,255,0.50)' }}>une livraison partout.</span>
                    </p>
                  </div>

                  {/* Agencies list */}
                  <div
                    className="px-4 pt-3.5 pb-4 relative"
                    style={{ background: '#FFFFFF' }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(26,63,111,0.04) 1px, transparent 0)',
                        backgroundSize: '18px 18px',
                      }}
                      aria-hidden="true"
                    />
                    <p className="text-[9px] font-black tracking-[0.22em] uppercase text-gray-400 mb-2.5 relative">Nos implantations</p>
                    <div className="space-y-1 relative">
                      {agencies.map((agency, idx) => (
                        <Link
                          key={agency.id}
                          href={`/agences/${agency.slug}`}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-all hover:bg-blue-50 hover:shadow-sm"
                          style={{ border: '1px solid #ECEEF2' }}
                        >
                          <div
                            className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[9px] font-black text-white"
                            style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #2563EB 100%)' }}
                          >
                            {idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-900 font-bold text-xs leading-tight truncate">{agency.city}</p>
                            <p className="text-gray-400 text-[10px] truncate">{agency.address}</p>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {agency.rating && (
                              <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                                <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                                {agency.rating.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2 relative">
                      <a
                        href="#agences"
                        className="flex items-center justify-center gap-2 w-full rounded-xl py-2.5 font-bold text-white text-xs transition-all hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]"
                        style={{
                          background: 'linear-gradient(135deg, #1A3F6F 0%, #2563EB 100%)',
                          boxShadow: '0 4px 18px rgba(26,63,111,0.32)',
                        }}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        Trouver mon agence
                      </a>
                      <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2 w-full rounded-xl py-2.5 font-bold text-white text-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
                        style={{
                          background: 'rgba(26,63,111,0.08)',
                          border: '1.5px solid rgba(26,63,111,0.20)',
                          color: '#1A3F6F',
                        }}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Nous contacter
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats band ── */}
        <section className="py-10 bg-gray-50 border-y border-gray-200" aria-label="Chiffres clés">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden">
              {[
                { value: `${agencies.length}`, label: 'Agences', sub: 'En France' },
                { value: '800+', label: 'Véhicules', sub: 'En stock immédiat' },
                { value: avgRating.toFixed(1), label: 'Note moyenne', sub: 'Sur 5 étoiles' },
                { value: `${totalReviews}`, label: 'Avis clients', sub: 'Vérifiés' },
              ].map(({ value, label, sub }) => (
                <div key={label} className="bg-white py-8 px-6 text-center hover:bg-gray-50 transition-colors">
                  <p className="text-4xl font-black text-[#1A3F6F] mb-1">{value}</p>
                  <p className="text-gray-800 font-semibold text-sm mb-0.5">{label}</p>
                  <p className="text-gray-400 text-xs">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Map section ── */}
        <section id="carte" className="py-24 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#1A3F6F]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">Carte interactive</span>
                <div className="h-px w-8 bg-[#1A3F6F]" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Nos points de vente et livraison
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Trouvez le showroom Activ Automobiles le plus proche ou découvrez nos points de livraison partenaires dans toute la France.
              </p>
            </div>

            <ClientAgencyInteractiveMap agencies={agencies} />
          </div>
        </section>

        {/* ── Agency cards ── */}
        <section id="agences" className="py-24 border-b border-gray-100" style={{ background: '#F8FAFF' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#1A3F6F]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">Nos showrooms</span>
                <div className="h-px w-8 bg-[#1A3F6F]" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                {agencies.length} agences à votre service
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Chaque agence dispose d&apos;un stock actualisé. Réservez en ligne ou appelez directement votre agence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Livraison section ── */}
        <section className="py-24 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-[#1A3F6F]" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">Service premium</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-5">
                  Livraison partout{' '}
                  <span
                    style={{
                      background: 'linear-gradient(92deg, #1A3F6F 0%, #2558A0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    en France.
                  </span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  Vous habitez loin d&apos;un de nos showrooms ? Activ Automobiles vous apporte votre voiture où vous le souhaitez — à domicile ou en point de retrait partenaire.
                </p>

                <div className="space-y-4 mb-8">
                  {DELIVERY_BENEFITS.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-4 items-start">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(26,63,111,0.08)', border: '1px solid rgba(26,63,111,0.15)' }}
                      >
                        <Icon className="w-5 h-5 text-[#1A3F6F]" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{title}</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/services/livraison"
                    className="inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 font-bold text-white text-sm transition-all hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
                      boxShadow: '0 6px 24px rgba(26,63,111,0.25)',
                    }}
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#1A3F6F]/40 text-gray-600 hover:text-[#1A3F6F] font-semibold px-7 py-3.5 rounded-xl transition-all text-sm"
                  >
                    Organiser ma livraison
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Two delivery option cards */}
              <div className="flex flex-col gap-5">
                {/* Card 1 — À domicile */}
                <div
                  className="group relative rounded-3xl overflow-hidden"
                  style={{ minHeight: '200px', border: '1px solid rgba(0,0,0,0.12)', boxShadow: '0 8px 32px rgba(0,0,0,0.22)' }}
                >
                  <img
                    src="/domicile.webp"
                    alt="Livraison à domicile — Activ Automobiles"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, rgba(10,15,30,0.96) 0%, rgba(10,15,30,0.75) 55%, rgba(10,15,30,0.40) 100%)' }}
                  />
                  <div className="relative z-10 p-7 flex flex-col justify-center h-full min-h-[200px]">
                    <div
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase mb-3 w-fit"
                      style={{ background: 'rgba(26,63,111,0.65)', color: '#93C5FD', border: '1px solid rgba(147,197,253,0.35)', backdropFilter: 'blur(8px)' }}
                    >
                      <Truck className="w-3 h-3" />
                      Livraison à domicile
                    </div>
                    <h3 className="text-lg font-black text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>Recevez votre voiture chez vous</h3>
                    <p className="text-sm text-white/80 mb-4 max-w-xs" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Un convoyeur professionnel livre votre véhicule clé en main, avec mise en main personnalisée.</p>
                    <ul className="space-y-1.5">
                      {['France métropolitaine complète', 'Mise en main personnalisée', 'Horaires flexibles'].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-blue-300" />
                          <span className="text-xs text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card 2 — Réseau AD */}
                <div
                  className="group relative rounded-3xl overflow-hidden"
                  style={{ minHeight: '200px', border: '1px solid rgba(0,0,0,0.12)', boxShadow: '0 8px 32px rgba(0,0,0,0.22)' }}
                >
                  <img
                    src="/ADliv.webp"
                    alt="Livraison en point de vente AD partenaire"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, rgba(10,15,30,0.96) 0%, rgba(10,15,30,0.75) 55%, rgba(10,15,30,0.40) 100%)' }}
                  />
                  <div className="relative z-10 p-7 flex flex-col justify-center h-full min-h-[200px]">
                    <div
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase mb-3 w-fit"
                      style={{ background: 'rgba(6,78,59,0.7)', color: '#6EE7B7', border: '1px solid rgba(110,231,183,0.35)', backdropFilter: 'blur(8px)' }}
                    >
                      <Settings className="w-3 h-3" />
                      Réseau AD
                    </div>
                    <h3 className="text-lg font-black text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>Livraison en point de vente AD</h3>
                    <p className="text-sm text-white/80 mb-4 max-w-xs" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Retrait dans un garage partenaire proche de chez vous avec expertise locale et SAV intégré.</p>
                    <ul className="space-y-1.5">
                      {['1 point de retrait près de chez vous', 'Expertise technique sur place', 'Continuité entretien & SAV'].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-emerald-300" />
                          <span className="text-xs text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Après-vente section ── */}
        <section className="py-24 bg-gray-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#1A3F6F]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">Accompagnement durable</span>
                <div className="h-px w-8 bg-[#1A3F6F]" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                L&apos;après-vente en toute sérénité
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                Activ Automobiles ne vous abandonne pas après la livraison. Profitez d&apos;un réseau national pour l&apos;entretien et la maintenance de votre véhicule.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left — items grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {APRES_VENTE_ITEMS.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#1A3F6F]/30 hover:shadow-md transition-all group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform"
                      style={{ background: 'rgba(26,63,111,0.08)' }}
                    >
                      <Icon className="w-6 h-6 text-[#1A3F6F]" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Right — photo banner */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{ minHeight: '400px', boxShadow: '0 24px 80px rgba(0,0,0,0.35)' }}
              >
                <img
                  src="/ad.webp"
                  alt="Mécanicien en atelier AD — service après-vente Activ Automobiles"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(10,15,30,0.95) 0%, rgba(10,15,30,0.60) 50%, rgba(10,15,30,0.20) 100%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-2" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>Notre engagement</p>
                  <p className="text-white text-xl font-black leading-tight mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
                    Une couverture nationale pour rouler l&apos;esprit libre.
                  </p>
                  <div className="flex gap-3">
                    <Link
                      href="/voitures-occasion"
                      className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-[#1A3F6F] bg-white hover:bg-gray-100 transition-all"
                    >
                      <Car className="w-4 h-4" />
                      Nos véhicules
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all"
                      style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                      Réserver ma livraison
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className="relative rounded-3xl overflow-hidden p-12"
              style={{
                background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2548 100%)',
                boxShadow: '0 32px 80px rgba(26,63,111,0.25)',
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
              />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                  <CheckCircle className="w-4 h-4 text-blue-200" />
                  <span className="text-blue-100 text-sm font-medium">Disponible partout en France</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                  Votre voiture vous attend.<br />On s&apos;occupe du reste.
                </h2>
                <p className="text-blue-200/80 mb-8 max-w-xl mx-auto leading-relaxed">
                  Parcourez notre catalogue ou posez-nous vos questions — nos conseillers sont disponibles pour organiser votre achat et votre livraison.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/voitures-occasion"
                    className="inline-flex items-center justify-center gap-2 font-bold text-sm px-8 py-4 rounded-xl text-[#1A3F6F] bg-white hover:bg-gray-100 transition-all"
                  >
                    <Car className="w-4 h-4" />
                    Découvrir nos véhicules
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-sm"
                  >
                    Réserver ma livraison
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
