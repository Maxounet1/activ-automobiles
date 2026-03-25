'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { GitCompare, ArrowLeft, ShieldCheck, Fuel, Settings2, Calendar, Gauge, Users, DoorOpen, Zap, Leaf, Check, X, Star } from 'lucide-react';
import { useComparator } from '@/lib/comparator-store';
import { getAllVehicles } from '@/repository/vehicles';
import type { Vehicle } from '@/lib/types';
import { formatPrice, formatMileage, getFuelLabel } from '@/lib/utils';

const FUEL_COLORS: Record<string, { bg: string; color: string }> = {
  essence: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444' },
  diesel: { bg: 'rgba(59,130,246,0.12)', color: '#3b82f6' },
  hybride: { bg: 'rgba(16,185,129,0.12)', color: '#10b981' },
  electrique: { bg: 'rgba(16,185,129,0.12)', color: '#10b981' },
  gpl: { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
  'hybride-rechargeable': { bg: 'rgba(16,185,129,0.12)', color: '#10b981' },
};

function SpecRow({ label, values, highlight }: { label: string; values: (string | number | null)[]; highlight?: boolean }) {
  const best = typeof values[0] === 'number' ? Math.min(...values.filter((v): v is number => typeof v === 'number')) : null;

  return (
    <div
      className={`grid py-3 px-4 rounded-xl mb-1 ${highlight ? '' : ''}`}
      style={{
        gridTemplateColumns: `180px repeat(${values.length}, 1fr)`,
        background: highlight ? 'rgba(26,63,111,0.04)' : 'transparent',
      }}
    >
      <span className="text-sm font-medium" style={{ color: '#64748B' }}>{label}</span>
      {values.map((val, i) => (
        <span
          key={i}
          className="text-sm font-semibold text-center"
          style={{
            color: best !== null && val === best ? '#10b981' : '#0B1829',
          }}
        >
          {val ?? '—'}
        </span>
      ))}
    </div>
  );
}

function OptionRow({ label, vehicles }: { label: string; vehicles: Vehicle[] }) {
  const hasOption = vehicles.map((v) => v.options?.includes(label) ?? false);
  return (
    <div
      className="grid py-2.5 px-4 rounded-xl mb-1"
      style={{ gridTemplateColumns: `180px repeat(${vehicles.length}, 1fr)` }}
    >
      <span className="text-xs font-medium" style={{ color: '#64748B' }}>{label}</span>
      {hasOption.map((has, i) => (
        <div key={i} className="flex justify-center">
          {has ? (
            <Check className="w-4 h-4" style={{ color: '#10b981' }} />
          ) : (
            <X className="w-4 h-4 text-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function ComparatorPageClient() {
  const searchParams = useSearchParams();
  const { vehicles: storedVehicles } = useComparator();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const idsParam = searchParams.get('ids');
      let vehiclesToShow: Vehicle[] = [];

      if (idsParam) {
        const ids = idsParam.split(',').slice(0, 3);
        const allVehicles = await getAllVehicles();
        vehiclesToShow = ids
          .map((id) => allVehicles.find((v) => v.id === id))
          .filter((v): v is Vehicle => !!v);
      } else {
        vehiclesToShow = storedVehicles;
      }

      setVehicles(vehiclesToShow);
      setLoading(false);
    }
    load();
  }, [searchParams, storedVehicles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFC' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#1A3F6F', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4" style={{ background: '#F8FAFC' }}>
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(26,63,111,0.08)' }}
        >
          <GitCompare className="w-10 h-10" style={{ color: '#1A3F6F' }} />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold" style={{ color: '#0B1829' }}>Comparateur vide</h1>
          <p className="mt-2 text-sm" style={{ color: '#64748B' }}>
            Ajoutez des véhicules depuis le catalogue pour les comparer
          </p>
        </div>
        <Link
          href="/voitures-occasion"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Voir le catalogue
        </Link>
      </div>
    );
  }

  const allOptions = Array.from(
    new Set(vehicles.flatMap((v) => v.options ?? []))
  ).sort();

  const cols = vehicles.length;

  return (
    <div className="min-h-screen pb-20" style={{ background: '#F8FAFC' }}>
      {/* Header */}
      <div
        className="pt-[72px]"
        style={{
          background: 'linear-gradient(180deg, #0B1829 0%, #122040 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/voitures-occasion"
              className="p-2 rounded-xl transition-colors hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-white">Comparateur de véhicules</h1>
              <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {cols} véhicule{cols > 1 ? 's' : ''} comparé{cols > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vehicle cards header */}
        <div
          className="grid gap-4 mb-8"
          style={{ gridTemplateColumns: `180px repeat(${cols}, 1fr)` }}
        >
          <div />
          {vehicles.map((vehicle) => {
            const fuelStyle = FUEL_COLORS[vehicle.fuel] ?? { bg: 'rgba(0,0,0,0.06)', color: '#64748B' };
            return (
              <div
                key={vehicle.id}
                className="rounded-2xl overflow-hidden"
                style={{ background: '#fff', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(11,24,41,0.06)' }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {vehicle.images?.[0] ? (
                    <Image
                      src={vehicle.images[0].url}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      fill
                      sizes="350px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full" style={{ background: '#E2E8F0' }} />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h2 className="font-bold text-base leading-tight" style={{ color: '#0B1829' }}>
                        {vehicle.brand} {vehicle.model}
                      </h2>
                      <p className="text-xs mt-0.5 truncate" style={{ color: '#64748B' }}>{vehicle.version}</p>
                    </div>
                    <span
                      className="flex-shrink-0 px-2 py-0.5 rounded-lg text-xs font-semibold"
                      style={{ background: fuelStyle.bg, color: fuelStyle.color }}
                    >
                      {getFuelLabel(vehicle.fuel)}
                    </span>
                  </div>
                  <p className="text-2xl font-black mb-3" style={{ color: '#0B1829' }}>
                    {formatPrice(vehicle.price)}
                  </p>
                  {vehicle.monthlyPrice && (
                    <p className="text-xs mb-3" style={{ color: '#64748B' }}>
                      ou <strong>{vehicle.monthlyPrice} €/mois</strong>
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Link
                      href={`/voitures-occasion/${vehicle.slug}`}
                      className="flex-1 text-center py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)' }}
                    >
                      Voir la fiche
                    </Link>
                    <Link
                      href={`/reservation/${vehicle.slug}`}
                      className="flex-1 text-center py-2 rounded-xl text-xs font-bold transition-colors"
                      style={{ background: 'rgba(26,63,111,0.08)', color: '#1A3F6F', border: '1px solid rgba(26,63,111,0.2)' }}
                    >
                      Réserver
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specs sections */}
        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{ background: '#fff', border: '1px solid #E2E8F0' }}
        >
          <div className="px-6 py-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
            <h3 className="font-black text-base" style={{ color: '#0B1829' }}>Caractéristiques principales</h3>
          </div>
          <div className="px-2 py-3">
            <SpecRow label="Année" values={vehicles.map((v) => v.year)} />
            <SpecRow label="Kilométrage" values={vehicles.map((v) => formatMileage(v.mileage))} />
            <SpecRow label="Carburant" values={vehicles.map((v) => getFuelLabel(v.fuel))} highlight />
            <SpecRow label="Boîte de vitesses" values={vehicles.map((v) => v.transmission === 'automatique' ? 'Automatique' : 'Manuelle')} />
            <SpecRow label="Carrosserie" values={vehicles.map((v) => v.bodyType)} highlight />
            <SpecRow label="Couleur" values={vehicles.map((v) => v.color)} />
          </div>
        </div>

        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{ background: '#fff', border: '1px solid #E2E8F0' }}
        >
          <div className="px-6 py-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
            <h3 className="font-black text-base" style={{ color: '#0B1829' }}>Performances & dimensions</h3>
          </div>
          <div className="px-2 py-3">
            <SpecRow label="Puissance" values={vehicles.map((v) => `${v.power} ch`)} />
            <SpecRow label="Émissions CO₂" values={vehicles.map((v) => `${v.co2} g/km`)} highlight />
            <SpecRow label="Portes" values={vehicles.map((v) => v.doors)} />
            <SpecRow label="Places" values={vehicles.map((v) => v.seats)} highlight />
          </div>
        </div>

        {/* Options comparison */}
        {allOptions.length > 0 && (
          <div
            className="rounded-2xl overflow-hidden mb-6"
            style={{ background: '#fff', border: '1px solid #E2E8F0' }}
          >
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #F1F5F9' }}>
              <h3 className="font-black text-base" style={{ color: '#0B1829' }}>Équipements & options</h3>
            </div>
            <div className="px-2 py-3">
              {allOptions.map((option) => (
                <OptionRow key={option} label={option} vehicles={vehicles} />
              ))}
            </div>
          </div>
        )}

        {/* Guarantee & services */}
        <div
          className="rounded-2xl p-6"
          style={{ background: 'linear-gradient(135deg, #0B1829 0%, #122040 100%)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-5 h-5" style={{ color: '#1A3F6F' }} />
            <h3 className="font-black text-base text-white">Garanties incluses sur tous les véhicules</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: ShieldCheck, label: 'Garantie 12 mois' },
              { icon: Star, label: 'Contrôle 150 pts' },
              { icon: Leaf, label: 'Carnet entretien' },
              { icon: Zap, label: 'Financement sur mesure' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#1A3F6F' }} />
                <span className="text-xs font-medium text-white">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
