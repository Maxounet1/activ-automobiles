'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Gauge, Zap, Heart, ArrowRight, SlidersHorizontal } from 'lucide-react';
import type { Vehicle } from '@/lib/types';

const BRAND_COLOR = '#1A3F6F';

type SortOption = 'prix-asc' | 'prix-desc' | 'km-asc' | 'annee-desc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'prix-asc', label: 'Prix croissant' },
  { value: 'prix-desc', label: 'Prix décroissant' },
  { value: 'km-asc', label: 'Kilométrage' },
  { value: 'annee-desc', label: 'Année récente' },
];

const FUEL_COLORS: Record<string, string> = {
  essence: '#F59E0B',
  diesel: '#3B82F6',
  hybride: '#10B981',
  'hybride-rechargeable': '#06B6D4',
  electrique: '#8B5CF6',
  gpl: '#F97316',
};

const FUEL_LABELS: Record<string, string> = {
  essence: 'Essence',
  diesel: 'Diesel',
  hybride: 'Hybride',
  'hybride-rechargeable': 'Hybride +',
  electrique: 'Électrique',
  gpl: 'GPL',
};

interface SearchResultsGridProps {
  vehicles: Vehicle[];
}

export default function SearchResultsGrid({ vehicles }: SearchResultsGridProps) {
  const [sort, setSort] = useState<SortOption>('prix-asc');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const sorted = useMemo(() => {
    const arr = [...vehicles];
    if (sort === 'prix-asc') return arr.sort((a, b) => a.price - b.price);
    if (sort === 'prix-desc') return arr.sort((a, b) => b.price - a.price);
    if (sort === 'km-asc') return arr.sort((a, b) => a.mileage - b.mileage);
    if (sort === 'annee-desc') return arr.sort((a, b) => b.year - a.year);
    return arr;
  }, [vehicles, sort]);

  function toggleFav(id: string) {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  if (vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: BRAND_COLOR + '10' }}
        >
          <SlidersHorizontal className="w-7 h-7" style={{ color: BRAND_COLOR }} />
        </div>
        <p className="text-lg font-bold text-gray-900 mb-2">Aucun véhicule trouvé</p>
        <p className="text-sm text-gray-400 max-w-xs">
          Essayez d&apos;élargir vos critères ou de réinitialiser les filtres.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          <span className="font-bold text-gray-900">{vehicles.length}</span> véhicule{vehicles.length !== 1 ? 's' : ''}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 hidden sm:block">Trier par</span>
          <div className="flex gap-1">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
                style={{
                  background: sort === opt.value ? BRAND_COLOR : 'transparent',
                  borderColor: sort === opt.value ? BRAND_COLOR : '#E5E7EB',
                  color: sort === opt.value ? '#fff' : '#6B7280',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {sorted.map((vehicle, i) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            index={i}
            isFav={favorites.has(vehicle.id)}
            onToggleFav={() => toggleFav(vehicle.id)}
          />
        ))}
      </div>
    </div>
  );
}

function VehicleCard({
  vehicle,
  index,
  isFav,
  onToggleFav,
}: {
  vehicle: Vehicle;
  index: number;
  isFav: boolean;
  onToggleFav: () => void;
}) {
  const fuelColor = FUEL_COLORS[vehicle.fuel] || '#6B7280';
  const fuelLabel = FUEL_LABELS[vehicle.fuel] || vehicle.fuel;
  const href = `/voitures-occasion/${vehicle.slug}`;

  return (
    <article
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:border-gray-200 hover:shadow-xl"
      style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        animationDelay: `${Math.min(index * 40, 400)}ms`,
      }}
    >
      {/* Image cliquable */}
      <Link href={href} className="block relative h-48 overflow-hidden bg-gray-50">
        <Image
          src={vehicle.images[0]?.url || '/no-photo-placeholder.jpg'}
          alt={vehicle.images[0]?.alt || `${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />

        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white z-10"
          style={{ background: fuelColor, boxShadow: `0 2px 8px ${fuelColor}60` }}
        >
          {fuelLabel}
        </div>

        {vehicle.featured && (
          <div
            className="absolute top-3 left-3 mt-[28px] px-2 py-0.5 rounded-full text-[9px] font-bold text-white z-10"
            style={{ background: BRAND_COLOR }}
          >
            Coup de cœur
          </div>
        )}

        {vehicle.monthlyPrice && (
          <div
            className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold z-10"
            style={{ background: 'rgba(0,0,0,0.65)', color: '#fff', backdropFilter: 'blur(4px)' }}
          >
            {vehicle.monthlyPrice} €/mois
          </div>
        )}
      </Link>

      {/* Bouton favori hors du Link */}
      <div className="relative">
        <button
          type="button"
          onClick={() => onToggleFav()}
          className="absolute -top-[84px] right-3 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center transition-all hover:scale-110"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
        >
          <Heart
            className="w-4 h-4 transition-colors"
            style={{ color: isFav ? '#EF4444' : '#9CA3AF', fill: isFav ? '#EF4444' : 'none' }}
          />
        </button>
      </div>

      {/* Contenu */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400 font-medium">{vehicle.brand}</p>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{vehicle.model}</h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[160px]">{vehicle.version}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-black text-gray-900">{vehicle.price.toLocaleString('fr-FR')} €</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-50">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="w-3 h-3" />
            {vehicle.mileage.toLocaleString('fr-FR')} km
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {vehicle.power} ch
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <MapPin className="w-3 h-3" />
            {vehicle.agencyCity}
          </span>
          <Link
            href={href}
            className="flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2"
            style={{ color: BRAND_COLOR }}
          >
            Voir le véhicule
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
