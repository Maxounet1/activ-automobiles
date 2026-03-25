import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  MapPin,
  ShieldCheck,
  Tag,
} from 'lucide-react';

import { getVehicleBySlug } from '@/repository/vehicles';
import ReservationForm from '@/components/forms/ReservationForm';
import { formatPrice, formatMileage, SITE_URL } from '@/lib/utils';
import type { Vehicle } from '@/lib/types';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ id: string }>;
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await getVehicleBySlug(id);

  const title = vehicle
    ? `Réserver ${vehicle.brand} ${vehicle.model} ${vehicle.year}`
    : 'Réserver ce véhicule';

  return {
    title,
    description: vehicle
      ? `Réservez dès maintenant votre ${vehicle.brand} ${vehicle.model} ${vehicle.year} chez Activ Automobiles. Dépôt de garantie de 500€, annulation gratuite 48h avant.`
      : "Réservez votre véhicule d'occasion chez Activ Automobiles.",
    // noindex: reservation pages should not be indexed
    robots: {
      index: false,
      follow: false,
    },
  };
}

// ── Fuel label map ────────────────────────────────────────────────────────────

const FUEL_LABELS: Record<Vehicle['fuel'], string> = {
  essence: 'Essence',
  diesel: 'Diesel',
  hybride: 'Hybride',
  electrique: 'Électrique',
  gpl: 'GPL',
  'hybride-rechargeable': 'Hybride Rechargeable',
};

const FUEL_COLORS: Record<Vehicle['fuel'], { bg: string; color: string }> = {
  essence: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444' },
  diesel: { bg: 'rgba(59,130,246,0.12)', color: '#3b82f6' },
  hybride: { bg: 'rgba(16,185,129,0.12)', color: '#10b981' },
  electrique: { bg: 'rgba(99,102,241,0.12)', color: '#6366f1' },
  gpl: { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
  'hybride-rechargeable': { bg: 'rgba(16,185,129,0.12)', color: '#10b981' },
};

// ── Vehicle summary card (left column) ───────────────────────────────────────

function VehicleSummaryCard({ vehicle }: { vehicle: Vehicle }) {
  const primaryImage = vehicle.images[0];
  const fuelStyle = FUEL_COLORS[vehicle.fuel];

  const specs = [
    { icon: Calendar, label: 'Année', value: String(vehicle.year) },
    { icon: Gauge, label: 'Kilométrage', value: formatMileage(vehicle.mileage) },
    { icon: Settings2, label: 'Boîte', value: vehicle.transmission === 'automatique' ? 'Automatique' : 'Manuelle' },
    { icon: MapPin, label: 'Agence', value: vehicle.agencyCity },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden sticky top-24"
      style={{ background: '#0d1426', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Vehicle image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 500px"
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: '#0B1829' }}
          >
            <span className="text-gray-600 text-sm">Photo non disponible</span>
          </div>
        )}

        {/* Condition badge */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold text-white"
            style={{ background: 'rgba(10,15,30,0.85)', backdropFilter: 'blur(4px)' }}
          >
            {vehicle.condition === 'occasion' ? 'Occasion'
              : vehicle.condition === 'neuf' ? 'Neuf'
              : 'KM0'}
          </span>
        </div>

        {/* Featured badge */}
        {vehicle.featured && (
          <div className="absolute top-3 right-3">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #1A3F6F, #143260)' }}
            >
              <Tag className="w-3 h-3" aria-hidden="true" />
              À la une
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {/* Title + fuel badge */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">
              {vehicle.brand} {vehicle.model}
            </h2>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {vehicle.version}
            </p>
          </div>
          <span
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
            style={{ background: fuelStyle.bg, color: fuelStyle.color }}
          >
            <Fuel className="w-3.5 h-3.5" aria-hidden="true" />
            {FUEL_LABELS[vehicle.fuel]}
          </span>
        </div>

        {/* Price block */}
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(0,102,255,0.06)', border: '1px solid rgba(0,102,255,0.15)' }}
        >
          <p className="text-3xl font-extrabold leading-none" style={{ color: '#1A3F6F' }}>
            {formatPrice(vehicle.price)}
          </p>
          {vehicle.monthlyPrice && (
            <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              ou{' '}
              <span className="font-semibold text-white">
                {vehicle.monthlyPrice} €/mois
              </span>{' '}
              sous réserve d&apos;acceptation
            </p>
          )}
        </div>

        {/* Key specs grid */}
        <div className="grid grid-cols-2 gap-3">
          {specs.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <Icon
                className="w-4 h-4 flex-shrink-0"
                style={{ color: '#1A3F6F' }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {label}
                </p>
                <p className="text-sm font-semibold text-white truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee badge */}
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{
            background: 'rgba(26,109,212,0.08)',
            border: '1px solid rgba(26,109,212,0.18)',
          }}
        >
          <ShieldCheck
            className="w-5 h-5 flex-shrink-0"
            style={{ color: '#1A3F6F' }}
            aria-hidden="true"
          />
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            <span className="font-semibold text-white">Garantie 12 mois</span> incluse —
            extensible jusqu&apos;à 24 mois
          </p>
        </div>

        {/* View vehicle link */}
        <div className="pt-1">
          <Link
            href={`/voitures-occasion/${vehicle.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-150 hover:gap-2.5"
            style={{ color: '#1A3F6F' }}
          >
            Voir la fiche complète du véhicule
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ReservationPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = await getVehicleBySlug(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <div
      className="min-h-screen pb-20"
      style={{ background: '#0B1829' }}
    >
      {/* Page header band */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(26,109,212,0.1) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="mb-5">
            <ol
              className="flex items-center gap-1.5 text-xs flex-wrap"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-150">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li>
                <Link
                  href={`/voitures-occasion/${vehicle.slug}`}
                  className="hover:text-white transition-colors duration-150 max-w-[200px] truncate inline-block align-bottom"
                >
                  {vehicle.brand} {vehicle.model} {vehicle.year}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li className="font-medium text-white">Réservation</li>
            </ol>
          </nav>

          {/* Page heading */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Réserver{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #1A3F6F 0%, #1A3F6F 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ce véhicule
                </span>
              </h1>
              <p className="mt-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Sécurisez votre achat avec un dépôt de garantie de 500€ — annulation gratuite
                jusqu&apos;à 48h avant
              </p>
            </div>

            {/* Step indicator */}
            <div
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(0,102,255,0.1)',
                border: '1px solid rgba(0,102,255,0.25)',
                color: '#1A3F6F',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#1A3F6F' }}
                aria-hidden="true"
              />
              Processus sécurisé en 3 étapes
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ── Left: Vehicle summary ── */}
          <div>
            <VehicleSummaryCard vehicle={vehicle} />
          </div>

          {/* ── Right: Reservation form ── */}
          <div>
            <ReservationForm
              vehicleId={vehicle.id}
              vehicleSlug={vehicle.slug}
            />

            {/* Trust footer */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { emoji: '🔒', label: 'Paiement sécurisé' },
                { emoji: '📋', label: 'Sans engagement initial' },
                { emoji: '↩️', label: 'Annulation sous 48h' },
              ].map(({ emoji, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 text-center rounded-xl py-3 px-2"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <span className="text-lg leading-none" role="img" aria-hidden="true">
                    {emoji}
                  </span>
                  <span className="text-xs leading-snug" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
