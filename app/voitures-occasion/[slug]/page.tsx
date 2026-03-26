export const dynamicParams = true;
export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft, MapPin, Calendar, Gauge, Fuel, Settings2, Shield, Phone,
  CreditCard, ArrowRight, Zap, Palette, DoorOpen, Users, Leaf, Car,
} from 'lucide-react';
import { getVehicleBySlug, getRelatedVehicles } from '@/repository/vehicles';
import { getAgencyById } from '@/repository/agencies';

import VehicleGallery from '@/components/vehicle/VehicleGallery';
import EquipmentAccordion from '@/components/vehicle/EquipmentAccordion';
import VehicleInteractions from '@/components/vehicle/VehicleInteractions';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Return empty array — pages are rendered on-demand via dynamicParams = true
  // This prevents build failures when SpiderVO feed is unreachable
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: 'Véhicule introuvable | Activ Automobiles' };
  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.year} | Activ Automobiles`;
  const description = `${vehicle.brand} ${vehicle.model} ${vehicle.year}, ${vehicle.mileage.toLocaleString('fr-FR')} km, ${vehicle.fuel}. Garanti 12 mois. ${vehicle.price.toLocaleString('fr-FR')} €. Activ Automobiles.`;
  const mainImg = vehicle.images[0]?.url ?? '/no-photo-placeholder.jpg';
  const url = `https://www.activ-automobiles.fr/voitures-occasion/${vehicle.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Activ Automobiles',
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: mainImg, width: 1200, height: 630, alt: `${vehicle.brand} ${vehicle.model} ${vehicle.year}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [mainImg],
    },
  };
}

const FUEL_LABELS: Record<string, string> = {
  essence: 'Essence',
  diesel: 'Diesel',
  hybride: 'Hybride',
  electrique: 'Électrique',
  gpl: 'GPL',
  'hybride-rechargeable': 'Hybride rechargeable',
};

const FUEL_COLORS: Record<string, string> = {
  essence: '#F59E0B',
  diesel: '#64748B',
  hybride: '#22C55E',
  electrique: '#3B82F6',
  gpl: '#A855F7',
  'hybride-rechargeable': '#10B981',
};

const BODY_TYPE_LABELS: Record<string, string> = {
  suv: 'SUV',
  berline: 'Berline',
  break: 'Break',
  citadine: 'Citadine',
  coupe: 'Coupé',
  cabriolet: 'Cabriolet',
  monospace: 'Monospace',
  utilitaire: 'Utilitaire',
};

/** Returns Crit'Air class (0–3) based on fuel type */
function getCritAir(fuel: string): { label: string; bg: string; text: string } {
  switch (fuel) {
    case 'electrique':
      return { label: 'Crit\'Air 0', bg: '#22C55E', text: '#fff' };
    case 'hybride':
    case 'hybride-rechargeable':
      return { label: 'Crit\'Air 1', bg: '#7C3AED', text: '#fff' };
    case 'essence':
      return { label: 'Crit\'Air 1', bg: '#7C3AED', text: '#fff' };
    case 'diesel':
      return { label: 'Crit\'Air 2', bg: '#FBBF24', text: '#0B1829' };
    default:
      return { label: 'Crit\'Air 3', bg: '#F97316', text: '#fff' };
  }
}

const TRUST_BADGES = [
  '✓ Garantie 12 mois incluse',
  '✓ Contrôlé sur 100 points',
  '✓ Livraison partout en France',
  '✓ Reprise de votre ancien véhicule',
];

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
        style={{ background: '#F8FAFC', paddingTop: '72px' }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(26,63,111,0.08)' }}
        >
          <Gauge className="w-8 h-8" style={{ color: '#1A3F6F' }} />
        </div>
        <h1 className="text-2xl font-black" style={{ color: '#0B1829' }}>
          Véhicule introuvable
        </h1>
        <p className="text-sm text-center max-w-xs" style={{ color: '#64748B' }}>
          Ce véhicule n&apos;existe pas ou a été vendu.
        </p>
        <Link
          href="/voitures-occasion"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
          style={{ background: '#1A3F6F' }}
        >
          <ChevronLeft className="w-4 h-4" />
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const fuelColor = FUEL_COLORS[vehicle.fuel] ?? '#9CA3AF';
  const fuelLabel = FUEL_LABELS[vehicle.fuel] ?? vehicle.fuel;
  const critAir = getCritAir(vehicle.fuel);
  const bodyLabel = BODY_TYPE_LABELS[vehicle.bodyType] ?? vehicle.bodyType;
  const mainImg = vehicle.images[0]?.url ?? '/no-photo-placeholder.jpg';
  const mainImgAlt = vehicle.images[0]?.alt ?? `${vehicle.brand} ${vehicle.model}`;

  const relatedVehicles = await getRelatedVehicles(vehicle, 3);
  const agency = await getAgencyById(vehicle.agencyId);
  const agencyPhone = agency?.phone ?? '03 83 97 97 97';
  const agencyPhoneTel = 'tel:+33' + agencyPhone.replace(/^0/, '').replace(/\s/g, '');

  // Build specs items — only show items with valid values
  const specsItems: Array<{ Icon: React.ElementType; label: string; value: string }> = [
    { Icon: Calendar, label: 'Année', value: String(vehicle.year) },
    { Icon: Gauge, label: 'Kilométrage', value: `${vehicle.mileage.toLocaleString('fr-FR')} km` },
    { Icon: Fuel, label: 'Énergie', value: fuelLabel },
    { Icon: Settings2, label: 'Boîte de vitesses', value: vehicle.transmission === 'automatique' ? 'Automatique' : 'Manuelle' },
    ...(vehicle.power > 0 ? [{ Icon: Zap, label: 'Puissance', value: `${vehicle.power} ch` }] : []),
    ...(vehicle.color ? [{ Icon: Palette, label: 'Couleur', value: vehicle.color }] : []),
    ...(vehicle.doors > 0 ? [{ Icon: DoorOpen, label: 'Portes', value: `${vehicle.doors} portes` }] : []),
    ...(vehicle.seats > 0 ? [{ Icon: Users, label: 'Places', value: `${vehicle.seats} places` }] : []),
    ...(vehicle.co2 > 0 ? [{ Icon: Leaf, label: 'CO2', value: `${vehicle.co2} g/km` }] : []),
    { Icon: Car, label: 'Carrosserie', value: bodyLabel },
    { Icon: MapPin, label: 'Agence', value: vehicle.agencyCity },
    { Icon: Shield, label: 'Garantie', value: '12 mois incluse' },
  ];

  const carJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    '@id': `https://www.activ-automobiles.fr/voitures-occasion/${vehicle.slug}`,
    name: `${vehicle.brand} ${vehicle.model} ${vehicle.version}`,
    brand: { '@type': 'Brand', name: vehicle.brand },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: vehicle.mileage, unitCode: 'KMT' },
    fuelType: vehicle.fuel,
    vehicleTransmission: vehicle.transmission,
    image: mainImg,
    offers: {
      '@type': 'Offer',
      price: String(vehicle.price),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `https://www.activ-automobiles.fr/voitures-occasion/${vehicle.slug}`,
      seller: { '@type': 'AutoDealer', name: 'Activ Automobiles' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(carJsonLd) }} />

      <div className="min-h-screen" style={{ background: '#F8FAFC' }}>

        {/* Hero header */}
        <div style={{ background: 'linear-gradient(180deg, #0B1829 0%, #1A3F6F 100%)', paddingTop: '72px' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/voitures-occasion" className="hover:text-white transition-colors">Catalogue</Link>
              <span>/</span>
              <span className="font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {vehicle.brand} {vehicle.model}
              </span>
            </div>

            {/* ← Back navigation at top (item 4) */}
            <div className="mt-3">
              <Link
                href="/voitures-occasion"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                <ChevronLeft className="w-4 h-4" />
                Retour au catalogue
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            {/* ── Left column ── */}
            <div className="flex-1 min-w-0 space-y-6">

              {/* Title + Price */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ background: fuelColor }}
                    >
                      {fuelLabel}
                    </span>
                    {vehicle.featured && (
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                        style={{ background: '#E11D48' }}
                      >
                        Coup de cœur
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black leading-tight" style={{ color: '#0B1829' }}>
                    {vehicle.brand} {vehicle.model}
                  </h1>
                  <p className="text-base font-medium mt-1" style={{ color: '#64748B' }}>{vehicle.version}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black" style={{ color: '#0B1829' }}>
                    {vehicle.price.toLocaleString('fr-FR')} €
                  </p>
                  {vehicle.monthlyPrice && (
                    <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                      ou dès <span className="font-bold" style={{ color: '#1A3F6F' }}>{vehicle.monthlyPrice} €</span>/mois
                    </p>
                  )}
                </div>
              </div>

              {/* Gallery (item 1) */}
              <VehicleGallery
                images={vehicle.images}
                brand={vehicle.brand}
                model={vehicle.model}
              />

              {/* Complete Specs (item 3) */}
              <div
                className="rounded-2xl p-6"
                style={{ background: '#fff', border: '1px solid #E8EDF3', boxShadow: '0 2px 12px rgba(11,24,41,0.05)' }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                    Caractéristiques
                  </h2>
                  {/* Crit'Air badge */}
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: critAir.bg, color: critAir.text }}
                  >
                    {critAir.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                  {specsItems.map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(26,63,111,0.07)' }}
                      >
                        <Icon className="w-4 h-4" style={{ color: '#1A3F6F' }} />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: '#94A3B8' }}>{label}</p>
                        <p className="text-sm font-bold mt-0.5 capitalize" style={{ color: '#0B1829' }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment Accordion (item 5) */}
              {vehicle.options && vehicle.options.length > 0 && (
                <EquipmentAccordion options={vehicle.options} />
              )}

              {vehicle.description && (
                <div
                  className="rounded-2xl p-6"
                  style={{ background: '#fff', border: '1px solid #E8EDF3' }}
                >
                  <h2 className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#94A3B8' }}>
                    Description
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{vehicle.description}</p>
                </div>
              )}

              {/* Related vehicles */}
              {relatedVehicles.length > 0 && (
                <div>
                  <h2 className="text-lg font-black mb-4" style={{ color: '#0B1829' }}>
                    Véhicules similaires
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedVehicles.map(v => (
                      <Link
                        key={v.id}
                        href={`/voitures-occasion/${v.slug}`}
                        className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        style={{ background: '#fff', border: '1px solid #E8EDF3' }}
                      >
                        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10', background: '#E2E8F0' }}>
                          <Image
                            src={v.images[0]?.url ?? '/no-photo-placeholder.jpg'}
                            alt={`${v.brand} ${v.model}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-3">
                          <p className="font-bold text-sm" style={{ color: '#0B1829' }}>{v.brand} {v.model}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{v.year} · {v.mileage.toLocaleString('fr-FR')} km</p>
                          <p className="font-black text-base mt-1" style={{ color: '#0B1829' }}>{v.price.toLocaleString('fr-FR')} €</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom back link */}
              <div className="pt-2">
                <Link
                  href="/voitures-occasion"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                  style={{ color: '#1A3F6F' }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Retour au catalogue
                </Link>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="w-full lg:w-[360px] xl:w-[380px] flex-shrink-0">
              <div style={{ position: 'sticky', top: '96px' }} className="space-y-4">

                <div
                  className="rounded-2xl p-6"
                  style={{ background: '#fff', border: '1px solid #E8EDF3', boxShadow: '0 4px 24px rgba(11,24,41,0.08)' }}
                >
                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-2xl font-black" style={{ color: '#0B1829' }}>
                      {vehicle.price.toLocaleString('fr-FR')} €
                    </p>
                    {vehicle.monthlyPrice && (
                      <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                        Finançable dès <span className="font-bold" style={{ color: '#1A3F6F' }}>{vehicle.monthlyPrice} €</span>/mois
                      </p>
                    )}
                  </div>

                  {/* Trust badges (item 2) */}
                  <div
                    className="rounded-xl p-3 mb-5 space-y-1.5"
                    style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}
                  >
                    {TRUST_BADGES.map(badge => (
                      <p key={badge} className="text-xs font-semibold" style={{ color: '#15803D' }}>{badge}</p>
                    ))}
                  </div>

                  {/* Sentinel div for IntersectionObserver (item 7) */}
                  <div id="sidebar-cta-sentinel" className="h-px w-full" />

                  {/* CTA Buttons — VehicleInteractions renders the "Je suis intéressé" button + modal + mobile bar */}
                  <div className="space-y-3">
                    <VehicleInteractions
                      vehicle={{
                        brand: vehicle.brand,
                        model: vehicle.model,
                        version: vehicle.version,
                        price: vehicle.price,
                        imageUrl: mainImg,
                        imageAlt: mainImgAlt,
                      }}
                      agencyPhone={agencyPhone}
                      agencyPhoneTel={agencyPhoneTel}
                    />

                    <a
                      href={agencyPhoneTel}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all hover:opacity-80"
                      style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', color: '#16A34A' }}
                    >
                      <Phone className="w-4 h-4" />
                      {agencyPhone}
                    </a>

                    {vehicle.monthlyPrice && (
                      <Link
                        href="/financement"
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all hover:opacity-80"
                        style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE', color: '#1D4ED8' }}
                      >
                        <CreditCard className="w-4 h-4" />
                        Simuler le financement
                      </Link>
                    )}
                  </div>
                </div>

                {/* Agency card */}
                <div
                  className="rounded-2xl p-5"
                  style={{ background: '#fff', border: '1px solid #E8EDF3' }}
                >
                  <h3 className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
                    Agence
                  </h3>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(26,63,111,0.07)' }}
                    >
                      <MapPin className="w-5 h-5" style={{ color: '#1A3F6F' }} />
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: '#0B1829' }}>Activ Automobiles</p>
                      <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{vehicle.agencyCity}</p>
                    </div>
                  </div>
                  <Link
                    href={agency ? `/agences/${agency.slug}` : '/agences'}
                    className="mt-4 text-xs font-semibold inline-flex items-center gap-1 transition-all hover:gap-2"
                    style={{ color: '#1A3F6F' }}
                  >
                    Voir les infos de l&apos;agence
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
