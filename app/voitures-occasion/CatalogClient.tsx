'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Vehicle } from '@/lib/types';
import IntelligentSearchEngine from '@/components/acheter/IntelligentSearchEngine';
import QuickFilterChips from '@/components/acheter/QuickFilterChips';
import ResultsGrid from '@/components/acheter/ResultsGrid';

interface SearchFilters {
  brand: string;
  model: string;
  maxBudget: number;
  maxMileage: number;
  fuel: string;
  yearMin: number;
  yearMax: number;
  transmission: string;
  category: string;
  minPower: number;
}

interface QuickFilter {
  category?: string;
  transmission?: string;
  maxBudget?: number;
  maxMileage?: number;
  fuel?: string;
  featured?: boolean;
  discount?: boolean;
  mensualiteMax?: number;
}

function useInitialFilters(): SearchFilters {
  const searchParams = useSearchParams();
  return {
    brand: searchParams.get('brand') ?? '',
    model: searchParams.get('model') ?? '',
    maxBudget: searchParams.get('budget') ? Number(searchParams.get('budget')) : 80000,
    maxMileage: searchParams.get('km') ? Number(searchParams.get('km')) : 200000,
    fuel: searchParams.get('fuel') ?? '',
    yearMin: searchParams.get('yearMin') ? Number(searchParams.get('yearMin')) : 2010,
    yearMax: searchParams.get('yearMax') ? Number(searchParams.get('yearMax')) : new Date().getFullYear(),
    transmission: searchParams.get('transmission') ?? '',
    category: searchParams.get('category') ?? '',
    minPower: searchParams.get('power') ? Number(searchParams.get('power')) : 0,
  };
}

interface CatalogClientProps {
  vehicles: Vehicle[];
}

export default function CatalogClient({ vehicles }: CatalogClientProps) {
  const initialFilters = useInitialFilters();
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [quickFilter, setQuickFilter] = useState<QuickFilter | null>(null);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      if (filters.brand && vehicle.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
      if (filters.model && vehicle.model.toLowerCase() !== filters.model.toLowerCase()) return false;
      if (vehicle.price > filters.maxBudget) return false;
      if (vehicle.mileage > filters.maxMileage) return false;
      if (filters.fuel && vehicle.fuel !== filters.fuel) return false;
      if (vehicle.year < filters.yearMin || vehicle.year > filters.yearMax) return false;
      if (filters.transmission && vehicle.transmission !== filters.transmission) return false;
      if (filters.category && vehicle.bodyType !== filters.category) return false;
      if (filters.minPower > 0 && vehicle.power < filters.minPower) return false;

      if (quickFilter) {
        if (quickFilter.category && vehicle.bodyType !== quickFilter.category) return false;
        if (quickFilter.transmission && vehicle.transmission !== quickFilter.transmission) return false;
        if (quickFilter.maxBudget && vehicle.price > quickFilter.maxBudget) return false;
        if (quickFilter.maxMileage && vehicle.mileage > quickFilter.maxMileage) return false;
        if (quickFilter.fuel && vehicle.fuel !== quickFilter.fuel) return false;
        if (quickFilter.featured && !vehicle.featured) return false;
      }

      return true;
    });
  }, [vehicles, filters, quickFilter]);

  const handleSearch = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    setQuickFilter(null);
  }, []);

  const handleQuickFilter = useCallback((filter: QuickFilter) => {
    setQuickFilter(filter);
    setFilters({
      brand: '',
      model: '',
      maxBudget: 80000,
      maxMileage: 200000,
      fuel: '',
      yearMin: 2010,
      yearMax: new Date().getFullYear(),
      transmission: '',
      category: '',
      minPower: 0,
    });
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="pt-32 pb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3 text-brand-dark" style={{ letterSpacing: '-0.02em' }}>
          Voitures d&apos;occasion
        </h1>
        <p className="text-base sm:text-lg text-brand-steel">
          {vehicles.length > 0
            ? `${vehicles.length} véhicules sélectionnés, garantis et finançables`
            : 'Notre stock est en cours de chargement'
          }
        </p>
      </div>

      <IntelligentSearchEngine
        onSearch={handleSearch}
        vehiclesCount={filteredVehicles.length}
        allVehicles={vehicles as any}
      />

      <QuickFilterChips onFilterClick={handleQuickFilter} />

      <ResultsGrid vehicles={filteredVehicles as any[]} />
    </div>
  );
}
