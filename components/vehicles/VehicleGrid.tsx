'use client';

import { useMemo, useState } from 'react';
import { Car, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Vehicle } from '@/lib/types';
import VehicleCard from '@/components/vehicles/VehicleCard';
import Link from 'next/link';

const PAGE_SIZE = 12;

type SortValue = 'prix-asc' | 'prix-desc' | 'annee-desc' | 'annee-asc' | 'km-asc';

function sortVehicles(vehicles: Vehicle[], sort: SortValue): Vehicle[] {
  const arr = [...vehicles];
  switch (sort) {
    case 'prix-asc': return arr.sort((a, b) => a.price - b.price);
    case 'prix-desc': return arr.sort((a, b) => b.price - a.price);
    case 'annee-desc': return arr.sort((a, b) => b.year - a.year);
    case 'annee-asc': return arr.sort((a, b) => a.year - b.year);
    case 'km-asc': return arr.sort((a, b) => a.mileage - b.mileage);
    default: return arr;
  }
}

function VehicleCardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden animate-pulse bg-white"
      style={{ border: '1px solid #e5e7eb' }}
    >
      <div className="aspect-[4/3] bg-slate-100" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-100 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="flex gap-2">
          <div className="h-4 bg-slate-100 rounded w-12" />
          <div className="h-4 bg-slate-100 rounded w-16" />
          <div className="h-4 bg-slate-100 rounded w-12" />
        </div>
        <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
          <div className="h-6 bg-slate-100 rounded w-24" />
          <div className="h-8 bg-slate-100 rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: '#EEF4FB' }}
      >
        <Car className="w-8 h-8" style={{ color: '#1A3F6F' }} />
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ color: '#111827' }}>Aucun véhicule trouvé</h3>
      <p className="text-sm mb-6 max-w-sm" style={{ color: '#6b7280' }}>
        Aucun véhicule ne correspond à vos critères. Modifiez vos filtres pour voir plus de résultats.
      </p>
      <Link
        href="/voitures-occasion"
        className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
        style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)' }}
      >
        Voir tous les véhicules
      </Link>
    </div>
  );
}

interface VehicleGridProps {
  vehicles: Vehicle[];
  sortValue?: string;
  title?: string;
  showCount?: boolean;
  loading?: boolean;
  skeletonCount?: number;
}

export default function VehicleGrid({
  vehicles,
  sortValue = 'prix-asc',
  loading = false,
  skeletonCount = 6,
}: VehicleGridProps) {
  const [page, setPage] = useState(1);
  const sort = (sortValue as SortValue) || 'prix-asc';

  const sorted = useMemo(() => sortVehicles(vehicles, sort), [vehicles, sort]);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = useMemo(() => sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [sorted, page]);

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, i) => <VehicleCardSkeleton key={i} />)
          : sorted.length === 0
          ? <EmptyState />
          : paginated.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        }
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100"
            style={{ border: '1px solid #e5e7eb', background: '#fff', color: '#374151' }}
            aria-label="Page précédente"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const isActive = p === page;
              const isNear = Math.abs(p - page) <= 1 || p === 1 || p === totalPages;
              if (!isNear) {
                if (p === page - 2 || p === page + 2) {
                  return <span key={p} className="w-6 text-center text-sm" style={{ color: '#cbd5e1' }}>…</span>;
                }
                return null;
              }
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => goToPage(p)}
                  className="w-10 h-10 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: isActive ? '#1A3F6F' : '#fff',
                    border: isActive ? 'none' : '1px solid #e5e7eb',
                    color: isActive ? '#fff' : '#374151',
                    boxShadow: isActive ? '0 4px 14px rgba(26,63,111,0.28)' : 'none',
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100"
            style={{ border: '1px solid #e5e7eb', background: '#fff', color: '#374151' }}
            aria-label="Page suivante"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
