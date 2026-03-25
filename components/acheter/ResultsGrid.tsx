'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown, Grid3x3, List } from 'lucide-react';
import AcheterVehicleCard from '@/components/acheter/AcheterVehicleCard';
import type { Vehicle } from '@/lib/types';

type RawVehicleData = Record<string, unknown>;

function normalizeVehicle(v: RawVehicleData): Vehicle {
  const raw = v as Record<string, unknown>;
  return {
    ...(raw as unknown as Partial<Vehicle>),
    images: Array.isArray(raw.images)
      ? (raw.images as (string | { url: string; alt: string; width: number; height: number })[]).map((img) =>
          typeof img === 'string' ? { url: img, alt: '', width: 0, height: 0 } : img
        )
      : [],
    agencyCity: (raw.agencyCity as string) ?? (raw.location as string) ?? '',
    condition: ((raw.condition as string) ?? 'occasion') as Vehicle['condition'],
    bodyType: ((raw.bodyType as string) ?? (raw.category as string) ?? 'berline') as Vehicle['bodyType'],
    color: (raw.color as string) ?? '',
    doors: (raw.doors as number) ?? 5,
    seats: (raw.seats as number) ?? 5,
    co2: (raw.co2 as number) ?? 0,
    description: (raw.description as string) ?? '',
    agencyId: (raw.agencyId as string) ?? '',
    available: (raw.available as boolean) ?? true,
    createdAt: (raw.createdAt as string) ?? new Date().toISOString(),
    updatedAt: (raw.updatedAt as string) ?? new Date().toISOString(),
    options: (raw.options as string[]) ?? [],
  } as Vehicle;
}

type SortOption = 'pertinence' | 'prix-asc' | 'prix-desc' | 'km-asc' | 'year-desc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'pertinence', label: 'Pertinence' },
  { value: 'prix-asc', label: 'Prix croissant' },
  { value: 'prix-desc', label: 'Prix décroissant' },
  { value: 'km-asc', label: 'Kilométrage' },
  { value: 'year-desc', label: 'Plus récents' },
];



interface ResultsGridProps {
  vehicles: Record<string, unknown>[];
}

export default function ResultsGrid({ vehicles }: ResultsGridProps) {
  const [sort, setSort] = useState<SortOption>('pertinence');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const normalized = useMemo(() => vehicles.map(normalizeVehicle), [vehicles]);

  const sorted = useMemo(() => {
    const arr = [...normalized];
    if (sort === 'pertinence') {
      return arr.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    }
    if (sort === 'prix-asc') return arr.sort((a, b) => a.price - b.price);
    if (sort === 'prix-desc') return arr.sort((a, b) => b.price - a.price);
    if (sort === 'km-asc') return arr.sort((a, b) => a.mileage - b.mileage);
    if (sort === 'year-desc') return arr.sort((a, b) => b.year - a.year);
    return arr;
  }, [normalized, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p className="text-sm font-medium" style={{ color: '#94A3B8' }}>
          <span className="text-2xl font-black" style={{ color: '#0B1829' }}>{normalized.length}</span>{' '}
          véhicule{normalized.length !== 1 ? 's' : ''} disponible{normalized.length !== 1 ? 's' : ''}
        </p>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" style={{ color: '#94A3B8' }} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="px-4 py-2 rounded-xl text-sm font-semibold outline-none transition-all"
              style={{ border: '1.5px solid #E2E8F0', color: '#0B1829', background: '#FFFFFF' }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: '#F1F5F9' }}>
            {(['grid', 'list'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="p-2 rounded-lg transition-all duration-150"
                style={{
                  background: viewMode === mode ? '#FFFFFF' : 'transparent',
                  color: viewMode === mode ? '#0B1829' : '#94A3B8',
                  boxShadow: viewMode === mode ? '0 1px 4px rgba(11,24,41,0.10)' : 'none',
                }}
              >
                {mode === 'grid' ? <Grid3x3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {sorted.map((vehicle, index) => (
          <AcheterVehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            index={index}
            href={`/voitures-occasion/${vehicle.slug}`}
          />
        ))}
      </div>

      {normalized.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: 'rgba(26,63,111,0.06)', border: '1px solid rgba(26,63,111,0.10)' }}
          >
            <Grid3x3 className="w-10 h-10" style={{ color: '#94A3B8' }} />
          </div>
          <p className="text-xl font-bold mb-2" style={{ color: '#0B1829' }}>Aucun véhicule trouvé</p>
          <p className="text-sm" style={{ color: '#94A3B8' }}>Essayez d&apos;ajuster vos critères de recherche</p>
        </div>
      )}
    </div>
  );
}
