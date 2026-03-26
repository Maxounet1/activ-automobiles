export const dynamicParams = true;

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, MapPin, Calendar, Gauge, Fuel, Settings2, Shield, Phone, CreditCard, CircleCheck as CheckCircle2, ArrowRight } from 'lucide-react';
import { getVehicleBySlug, getAllVehicles, getRelatedVehicles } from '@/repository/vehicles';
import { getAgencyById } from '@/repository/agencies';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const vehicles = await getAllVehicles();
  return vehicles.map(v => ({ slug: v.slug }));
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
  const mainImg = vehicle.images[0]?.url ?? '/no-photo-placeholder.jpg';
  const galleryImgs = vehicle.images.slice(1);

  const relatedVehicles = await getRelatedVehicles(vehicle, 3);
  const agency = await getAgencyById(vehicle.agencyId);
  const agencyPhone = agency?.phone ?? '03 83 97 97 97';
  const agencyPhoneTel = 'tel:+33' + agencyPhone.replace(/^0/, '').replace(/\s/g, '');

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
      <div style={{ background: 'linear-gradient(180deg, #0B1829 0%, #1A3F6F 100%)', paddingTop: '72px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
          <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/voitures-occasion" className="hover:text-white transition-colors">Catalogue</Link>
            <span>/</span>
            <span className="font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {vehicle.brand} {vehicle.model}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          <div className="flex-1 min-w-0 space-y-6">

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

            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9', background: '#E2E8F0' }}>
              <Image
                src={mainImg}
                alt={`${vehicle.brand} ${vehicle.model}`}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {galleryImgs.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {galleryImgs.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: '4/3', background: '#E2E8F0' }}>
                    <Image
                      src={img.url}
                      alt={img.alt || `${vehicle.brand} ${vehicle.model} photo ${i + 2}`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div
              className="rounded-2xl p-6"
              style={{ background: '#fff', border: '1px solid #E8EDF3', boxShadow: '0 2px 12px rgba(11,24,41,0.05)' }}
            >
              <h2 className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: '#94A3B8' }}>
                Caractéristiques
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {[
                  { Icon: Calendar, label: 'Année', value: String(vehicle.year) },
                  { Icon: Gauge, label: 'Kilométrage', value: `${vehicle.mileage.toLocaleString('fr-FR')} km` },
                  { Icon: Fuel, label: 'Énergie', value: fuelLabel },
                  { Icon: Settings2, label: 'Boîte', value: vehicle.transmission === 'automatique' ? 'Automatique' : 'Manuelle' },
                  { Icon: MapPin, label: 'Agence', value: vehicle.agencyCity },
                  { Icon: Shield, label: 'Garantie', value: '12 mois incluse' },
                ].map(({ Icon, label, value }) => (
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

            {vehicle.options && vehicle.options.length > 0 && (
              <div
                className="rounded-2xl p-6"
                style={{ background: '#fff', border: '1px solid #E8EDF3' }}
              >
                <h2 className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#94A3B8' }}>
                  Équipements & options
                </h2>
                <div className="flex flex-wrap gap-2">
                  {vehicle.options.map((eq, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{ background: '#F0F7FF', color: '#1A3F6F', border: '1px solid #BFDBFE' }}
                    >
                      <CheckCircle2 className="w-3 h-3" style={{ color: '#3B82F6' }} />
                      {eq.trim()}
                    </span>
                  ))}
                </div>
              </div>
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

          <aside className="w-full lg:w-[360px] xl:w-[380px] flex-shrink-0">
            <div style={{ position: 'sticky', top: '96px' }} className="space-y-4">

              <div
                className="rounded-2xl p-6"
                style={{ background: '#fff', border: '1px solid #E8EDF3', boxShadow: '0 4px 24px rgba(11,24,41,0.08)' }}
              >
                <div className="mb-5">
                  <p className="text-2xl font-black" style={{ color: '#0B1829' }}>
                    {vehicle.price.toLocaleString('fr-FR')} €
                  </p>
                  {vehicle.monthlyPrice && (
                    <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                      Finançable dès <span className="font-bold" style={{ color: '#1A3F6F' }}>{vehicle.monthlyPrice} €</span>/mois
                    </p>
                  )}
                </div>

                <div
                  className="flex items-center gap-2 p-3 rounded-xl mb-5"
                  style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}
                >
                  <Shield className="w-4 h-4 flex-shrink-0" style={{ color: '#16A34A' }} />
                  <span className="text-xs font-bold" style={{ color: '#15803D' }}>Garantie 12 mois incluse</span>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 active:scale-98"
                    style={{ background: 'linear-gradient(135deg, #1A3F6F, #2563EB)' }}
                  >
                    Je suis intéressé
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
