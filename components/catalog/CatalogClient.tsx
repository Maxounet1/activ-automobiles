'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Vehicle, CatalogFilters, SortOption, QuickFilter } from '@/lib/types';
import SearchBarPremium from './SearchBarPremium';
import QuickFilters from './QuickFilters';
import FiltersPanelPremium from './FiltersPanelPremium';
import FilterDrawerMobile from './FilterDrawerMobile';
import CatalogVehicleCard from './CatalogVehicleCard';
import CatalogSkeletonCard from './CatalogSkeletonCard';
import CatalogEmptyState from './CatalogEmptyState';
import TrustInsert from './TrustInsert';
import CatalogStickyMobileCTA from './CatalogStickyMobileCTA';
import CallbackDrawer from './CallbackDrawer';
import FinanceDrawer from './FinanceDrawer';
import InfoDrawer from './InfoDrawer';
import { ChevronLeft, ChevronRight, X, Shield, CreditCard, RefreshCcw, MapPin, ChevronDown, Check } from 'lucide-react';

const PAGE_SIZE = 12;

const DEFAULT_FILTERS: CatalogFilters = {
  search: '',
  brands: [],
  models: [],
  fuels: [],
  bodyTypes: [],
  transmissions: [],
  minPrice: 0,
  maxPrice: 0,
  minYear: 0,
  maxYear: 0,
  maxMileage: 0,
  cities: [],
  quickFilters: [],
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'pertinence',  label: 'Pertinence' },
  { value: 'prix-asc',   label: 'Prix croissant' },
  { value: 'prix-desc',  label: 'Prix décroissant' },
  { value: 'km-asc',     label: 'Kilométrage' },
  { value: 'annee-desc', label: 'Année (récent)' },
  { value: 'nouveaute',  label: 'Nouveautés' },
];

const TRUST_ITEMS = [
  { Icon: Shield,      label: 'Garantie incluse',     sub: '12 mois minimum',     color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0' },
  { Icon: CreditCard,  label: 'Financement possible', sub: 'Dès le 1er euro',      color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' },
  { Icon: RefreshCcw,  label: 'Reprise immédiate',    sub: 'Estimation en 2 min', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  { Icon: MapPin,      label: '6 agences en France',  sub: 'Livraison disponible', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
];

function applyQuickFilters(vehicles: Vehicle[], quick: QuickFilter[]): Vehicle[] {
  if (quick.length === 0) return vehicles;
  return vehicles.filter(v => quick.every(q => {
    switch (q) {
      case 'budget-10k': return v.price <= 10000;
      case 'budget-15k': return v.price <= 15000;
      case 'budget-20k': return v.price <= 20000;
      case 'budget-30k': return v.price <= 30000;
      case 'automatique': return v.transmission === 'automatique';
      case 'hybride': return v.fuel === 'hybride' || v.fuel === 'hybride-rechargeable';
      case 'suv': return v.bodyType === 'suv';
      case 'faible-km': return v.mileage < 30000;
      case 'nouveaute': return (Date.now() - new Date(v.createdAt).getTime()) / 86400000 <= 14;
      default: return true;
    }
  }));
}

function applyFilters(vehicles: Vehicle[], filters: CatalogFilters): Vehicle[] {
  return vehicles.filter(v => {
    if (!v.available) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!v.brand.toLowerCase().includes(q) && !v.model.toLowerCase().includes(q) && !v.version.toLowerCase().includes(q)) return false;
    }
    if (filters.brands.length > 0 && !filters.brands.includes(v.brand)) return false;
    if (filters.fuels.length > 0 && !filters.fuels.includes(v.fuel)) return false;
    if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(v.bodyType)) return false;
    if (filters.transmissions.length > 0 && !filters.transmissions.includes(v.transmission)) return false;
    if (filters.maxPrice > 0 && v.price > filters.maxPrice) return false;
    if (filters.minPrice > 0 && v.price < filters.minPrice) return false;
    if (filters.minYear > 0 && v.year < filters.minYear) return false;
    if (filters.maxMileage > 0 && filters.maxMileage < 999999 && v.mileage > filters.maxMileage) return false;
    if (filters.cities.length > 0 && !filters.cities.includes(v.agencyCity)) return false;
    return true;
  });
}

function sortVehicles(vehicles: Vehicle[], sort: SortOption): Vehicle[] {
  const arr = [...vehicles];
  switch (sort) {
    case 'prix-asc':   return arr.sort((a, b) => a.price - b.price);
    case 'prix-desc':  return arr.sort((a, b) => b.price - a.price);
    case 'km-asc':     return arr.sort((a, b) => a.mileage - b.mileage);
    case 'annee-desc': return arr.sort((a, b) => b.year - a.year);
    case 'nouveaute':  return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    default:           return arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}

function countActiveFilters(filters: CatalogFilters): number {
  let count = 0;
  if (filters.search) count++;
  count += filters.brands.length + filters.fuels.length + filters.bodyTypes.length + filters.transmissions.length + filters.cities.length + filters.quickFilters.length;
  if (filters.maxPrice > 0) count++;
  if (filters.minYear > 0) count++;
  if (filters.maxMileage > 0 && filters.maxMileage < 999999) count++;
  return count;
}

interface CatalogClientProps {
  vehicles: Vehicle[];
  brands: string[];
  cities: string[];
}

export default function CatalogClient({ vehicles, brands, cities }: CatalogClientProps) {
  const [filters, setFilters] = useState<CatalogFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>('pertinence');
  const [page, setPage] = useState(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [financeVehicle, setFinanceVehicle] = useState<Vehicle | null>(null);
  const [infoVehicle, setInfoVehicle] = useState<Vehicle | null>(null);

  const filteredVehicles = useMemo(() => {
    const base = applyFilters(vehicles, filters);
    const withQuick = applyQuickFilters(base, filters.quickFilters);
    return sortVehicles(withQuick, sort);
  }, [vehicles, filters, sort]);

  const totalPages = Math.ceil(filteredVehicles.length / PAGE_SIZE);
  const paginated = useMemo(
    () => filteredVehicles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredVehicles, page]
  );

  const activeFilterCount = useMemo(() => countActiveFilters(filters), [filters]);

  const handleFiltersChange = useCallback((partial: Partial<CatalogFilters>) => {
    setFilters(prev => ({ ...prev, ...partial }));
    setPage(1);
  }, []);

  const handleReset = useCallback(() => { setFilters(DEFAULT_FILTERS); setPage(1); }, []);
  const handleSortChange = useCallback((s: SortOption) => { setSort(s); setPage(1); setSortOpen(false); }, []);

  const handleBrandSelect = useCallback((brand: string) => {
    setFilters(prev => {
      const next = prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands: next };
    });
    setPage(1);
  }, []);

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeTags = useMemo(() => {
    const tags: { label: string; onRemove: () => void }[] = [];
    filters.brands.forEach(b => tags.push({ label: b, onRemove: () => handleFiltersChange({ brands: filters.brands.filter(x => x !== b) }) }));
    filters.fuels.forEach(f => tags.push({ label: f, onRemove: () => handleFiltersChange({ fuels: filters.fuels.filter(x => x !== f) }) }));
    filters.bodyTypes.forEach(bt => tags.push({ label: bt, onRemove: () => handleFiltersChange({ bodyTypes: filters.bodyTypes.filter(x => x !== bt) }) }));
    filters.transmissions.forEach(t => tags.push({ label: t, onRemove: () => handleFiltersChange({ transmissions: filters.transmissions.filter(x => x !== t) }) }));
    if (filters.maxPrice > 0) tags.push({ label: `≤ ${filters.maxPrice.toLocaleString('fr-FR')} €`, onRemove: () => handleFiltersChange({ maxPrice: 0 }) });
    if (filters.minYear > 0) tags.push({ label: `Depuis ${filters.minYear}`, onRemove: () => handleFiltersChange({ minYear: 0 }) });
    if (filters.maxMileage > 0 && filters.maxMileage < 999999) tags.push({ label: `< ${filters.maxMileage.toLocaleString('fr-FR')} km`, onRemove: () => handleFiltersChange({ maxMileage: 0 }) });
    filters.cities.forEach(c => tags.push({ label: c, onRemove: () => handleFiltersChange({ cities: filters.cities.filter(x => x !== c) }) }));
    return tags;
  }, [filters, handleFiltersChange]);

  const currentSortLabel = SORT_OPTIONS.find(o => o.value === sort)?.label ?? 'Trier';

  return (
    <>
      <SearchBarPremium
        filters={filters}
        brands={brands}
        totalCount={filteredVehicles.length}
        activeFilterCount={activeFilterCount}
        onSearchChange={q => handleFiltersChange({ search: q })}
        onBrandSelect={handleBrandSelect}
        onOpenFilters={() => setFilterDrawerOpen(true)}
        onOpenCallback={() => setCallbackOpen(true)}
      />

      <QuickFilters filters={filters} onFiltersChange={handleFiltersChange} onReset={handleReset} />

      <AnimatePresence>
        {activeTags.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
            style={{ background: '#FAFAFA', borderBottom: '1px solid #F3F4F6' }}
          >
            <div className="px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto">
              <div className="flex items-center gap-2 max-w-screen-xl mx-auto flex-nowrap">
                <span className="text-[10px] font-bold uppercase tracking-widest flex-shrink-0" style={{ color: '#CBD5E1' }}>Actifs :</span>
                {activeTags.map(tag => (
                  <motion.span
                    key={tag.label}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                    style={{ background: '#EFF6FF', color: '#1D4ED8', border: '1.5px solid #BFDBFE' }}
                  >
                    {tag.label}
                    <button type="button" onClick={tag.onRemove} className="ml-0.5 hover:opacity-60" aria-label={`Supprimer ${tag.label}`}>
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="px-4 sm:px-6 lg:px-8 py-10"
        style={{ background: 'linear-gradient(160deg,#0F172A 0%,#1A3F6F 55%,#1E4D8C 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">Stock disponible</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Voitures d&apos;occasion
              </h1>
              <p className="text-sm mt-2 text-white/50 font-medium">
                <motion.span key={filteredVehicles.length} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/80 font-black">
                  {filteredVehicles.length}
                </motion.span>
                {' '}véhicule{filteredVehicles.length !== 1 ? 's' : ''} · Contrôlés, garantis et financés
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TRUST_ITEMS.map(({ Icon, label, sub, color, bg, border }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: bg, boxShadow: `0 4px 12px ${color}33` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold leading-tight truncate text-white">{label}</p>
                  <p className="text-[11px] leading-tight truncate text-white/50">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-7">

          <aside
            className="hidden lg:flex flex-col w-72 xl:w-80 flex-shrink-0 self-start sticky"
            style={{
              top: '73px',
              borderRadius: 24,
              border: '1px solid #F1F5F9',
              background: '#fff',
              maxHeight: 'calc(100vh - 96px)',
              overflow: 'hidden',
              boxShadow: '0 4px 32px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)',
            }}
          >
            <FiltersPanelPremium
              filters={filters}
              brands={brands}
              cities={cities}
              totalCount={filteredVehicles.length}
              onFiltersChange={handleFiltersChange}
              onReset={handleReset}
            />
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <motion.p
                key={filteredVehicles.length}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm"
                style={{ color: '#64748B' }}
              >
                <span className="font-black text-base" style={{ color: '#0F172A' }}>{filteredVehicles.length}</span>
                {' '}résultat{filteredVehicles.length !== 1 ? 's' : ''}
              </motion.p>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSortOpen(p => !p)}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                    style={{
                      background: '#F8FAFC',
                      border: `1.5px solid ${sortOpen ? '#1A3F6F' : '#E5E7EB'}`,
                      color: '#374151',
                    }}
                  >
                    <span className="hidden sm:inline text-[10px]" style={{ color: '#9CA3AF' }}>Trier :</span>
                    <span className="font-semibold" style={{ color: '#111827' }}>{currentSortLabel}</span>
                    <ChevronDown
                      className="w-3.5 h-3.5 transition-transform duration-200"
                      style={{ color: '#6B7280', transform: sortOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                    />
                  </button>

                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 z-50 overflow-hidden"
                        style={{
                          borderRadius: 16,
                          background: 'rgba(255,255,255,0.98)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(226,232,240,0.8)',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.14)',
                        }}
                      >
                        <div className="p-1">
                          {SORT_OPTIONS.map(opt => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => handleSortChange(opt.value)}
                              className="w-full text-left px-3.5 py-2.5 text-sm transition-colors rounded-xl flex items-center justify-between"
                              style={{
                                background: sort === opt.value ? '#EFF6FF' : 'transparent',
                                color: sort === opt.value ? '#1D4ED8' : '#374151',
                                fontWeight: sort === opt.value ? 600 : 400,
                              }}
                            >
                              {opt.label}
                              {sort === opt.value && <Check className="w-3.5 h-3.5" style={{ color: '#1D4ED8' }} />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="lg:hidden">
                  <motion.button
                    type="button"
                    onClick={() => setFilterDrawerOpen(true)}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: activeFilterCount > 0 ? '#1A3F6F' : '#F8FAFC',
                      color: activeFilterCount > 0 ? '#fff' : '#374151',
                      border: `1.5px solid ${activeFilterCount > 0 ? '#1A3F6F' : '#E5E7EB'}`,
                      boxShadow: activeFilterCount > 0 ? '0 4px 12px rgba(26,63,111,0.25)' : 'none',
                    }}
                  >
                    Filtres
                    {activeFilterCount > 0 && (
                      <span className="w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center" style={{ background: '#F97316', color: '#fff' }}>
                        {activeFilterCount}
                      </span>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            {filteredVehicles.length === 0 ? (
              <CatalogEmptyState
                onReset={handleReset}
                onOpenCallback={() => setCallbackOpen(true)}
                onExpandBudget={() => handleFiltersChange({ maxPrice: 0 })}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginated.map((vehicle, idx) => {
                    const absoluteIdx = (page - 1) * PAGE_SIZE + idx;
                    const isInsert = absoluteIdx > 0 && absoluteIdx % 12 === 0;
                    return (
                      <div key={vehicle.id} className="contents">
                        {isInsert && (
                          <div className="sm:col-span-2 xl:col-span-3">
                            <TrustInsert onOpenCallback={() => setCallbackOpen(true)} />
                          </div>
                        )}
                        <CatalogVehicleCard
                          vehicle={vehicle}
                          index={absoluteIdx}
                          onOpenCallback={() => setCallbackOpen(true)}
                          onOpenFinance={v => setFinanceVehicle(v)}
                        />
                      </div>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-12 pt-6" style={{ borderTop: '1px solid #E5E7EB' }}>
                    <button
                      type="button"
                      onClick={() => goToPage(page - 1)}
                      disabled={page === 1}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
                      style={{ background: '#fff', border: '1.5px solid #E5E7EB', color: '#374151' }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Précédent
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
                        const isActive = p === page;
                        const isNear = Math.abs(p - page) <= 1 || p === 1 || p === totalPages;
                        if (!isNear) {
                          if (p === page - 2 || p === page + 2) return <span key={p} className="text-sm px-1" style={{ color: '#D1D5DB' }}>…</span>;
                          return null;
                        }
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => goToPage(p)}
                            className="w-9 h-9 rounded-xl text-sm font-bold transition-all"
                            style={{
                              background: isActive ? '#1A3F6F' : '#fff',
                              border: isActive ? 'none' : '1.5px solid #E5E7EB',
                              color: isActive ? '#fff' : '#6B7280',
                              boxShadow: isActive ? '0 4px 14px rgba(26,63,111,0.3)' : 'none',
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
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
                      style={{ background: '#fff', border: '1.5px solid #E5E7EB', color: '#374151' }}
                    >
                      Suivant
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <FilterDrawerMobile
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filters={filters}
        brands={brands}
        cities={cities}
        totalCount={filteredVehicles.length}
        onFiltersChange={handleFiltersChange}
        onReset={handleReset}
      />

      <CallbackDrawer open={callbackOpen} onClose={() => setCallbackOpen(false)} />
      <FinanceDrawer open={financeVehicle !== null} vehicle={financeVehicle} onClose={() => setFinanceVehicle(null)} />
      <InfoDrawer open={infoVehicle !== null} vehicle={infoVehicle} onClose={() => setInfoVehicle(null)} />
      <CatalogStickyMobileCTA onOpenCallback={() => setCallbackOpen(true)} />
    </>
  );
}
