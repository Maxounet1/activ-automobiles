'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, RotateCcw, Sliders, Check } from 'lucide-react';
import type { CatalogFilters, FuelType, BodyType, TransmissionType } from '@/lib/types';
import { track } from '@/lib/analytics';
import BudgetSlider from './BudgetSlider';
import MileageSlider from './MileageSlider';

const FUEL_OPTIONS: { value: FuelType; label: string; icon: string; gradient: string; activeText: string }[] = [
  { value: 'essence',              label: 'Essence',             icon: '⛽', gradient: 'linear-gradient(135deg,#FEF3C7,#FDE68A)', activeText: '#92400E' },
  { value: 'diesel',               label: 'Diesel',              icon: '🛢',  gradient: 'linear-gradient(135deg,#F1F5F9,#E2E8F0)', activeText: '#1E293B' },
  { value: 'hybride',              label: 'Hybride',             icon: '🌿', gradient: 'linear-gradient(135deg,#DCFCE7,#BBF7D0)', activeText: '#14532D' },
  { value: 'electrique',           label: 'Électrique',          icon: '⚡', gradient: 'linear-gradient(135deg,#DBEAFE,#BFDBFE)', activeText: '#1E3A8A' },
  { value: 'hybride-rechargeable', label: 'Hybride Rechargeable', icon: '🔋', gradient: 'linear-gradient(135deg,#EDE9FE,#DDD6FE)', activeText: '#3B0764' },
];

const BODY_OPTIONS: { value: BodyType; label: string; icon: string }[] = [
  { value: 'citadine',  label: 'Citadine',  icon: '🏙' },
  { value: 'berline',   label: 'Berline',   icon: '🚗' },
  { value: 'suv',       label: 'SUV',       icon: '🚙' },
  { value: 'break',     label: 'Break',     icon: '🚐' },
  { value: 'monospace', label: 'Monospace', icon: '🚌' },
  { value: 'coupe',     label: 'Coupé',     icon: '🏎' },
];

const YEAR_OPTIONS = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

interface FiltersPanelPremiumProps {
  filters: CatalogFilters;
  brands: string[];
  cities: string[];
  totalCount: number;
  onFiltersChange: (f: Partial<CatalogFilters>) => void;
  onReset: () => void;
}

function Section({
  title,
  defaultOpen = true,
  badge,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  badge?: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b" style={{ borderColor: 'rgba(226,232,240,0.5)' }}>
      <button
        type="button"
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between py-3 px-5 text-left"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-black uppercase tracking-[0.08em]" style={{ color: '#94A3B8' }}>
            {title}
          </span>
          {badge !== undefined && badge > 0 && (
            <span
              className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-black"
              style={{ background: 'linear-gradient(135deg,#1A3F6F,#2563EB)', color: '#fff', boxShadow: '0 2px 8px rgba(26,63,111,0.35)' }}
            >
              {badge}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3.5 h-3.5" style={{ color: '#CBD5E1' }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FiltersPanelPremium({
  filters,
  brands,
  cities,
  totalCount,
  onFiltersChange,
  onReset,
}: FiltersPanelPremiumProps) {
  const toggleFuel = (fuel: FuelType) => {
    const next = filters.fuels.includes(fuel)
      ? filters.fuels.filter(f => f !== fuel)
      : [...filters.fuels, fuel];
    onFiltersChange({ fuels: next });
    track('catalog_filter_apply', { filter: 'fuel', source: fuel });
  };

  const toggleBody = (body: BodyType) => {
    const next = filters.bodyTypes.includes(body)
      ? filters.bodyTypes.filter(b => b !== body)
      : [...filters.bodyTypes, body];
    onFiltersChange({ bodyTypes: next });
    track('catalog_filter_apply', { filter: 'bodyType', source: body });
  };

  const toggleTransmission = (t: TransmissionType) => {
    const next = filters.transmissions.includes(t)
      ? filters.transmissions.filter(x => x !== t)
      : [...filters.transmissions, t];
    onFiltersChange({ transmissions: next });
    track('catalog_filter_apply', { filter: 'transmission', source: t });
  };

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ brands: next });
    track('catalog_filter_apply', { filter: 'brand', source: brand });
  };

  const activeCount =
    filters.fuels.length +
    filters.bodyTypes.length +
    filters.transmissions.length +
    filters.brands.length +
    filters.cities.length +
    (filters.maxPrice > 0 ? 1 : 0) +
    (filters.minYear > 0 ? 1 : 0) +
    (filters.maxMileage > 0 && filters.maxMileage < 999999 ? 1 : 0);

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center justify-between px-5 py-4 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(226,232,240,0.5)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#0F172A,#1A3F6F)', boxShadow: '0 4px 12px rgba(15,23,42,0.25)' }}
          >
            <Sliders className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-sm font-black" style={{ color: '#0F172A' }}>Filtres</p>
            <motion.p
              key={totalCount}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px]"
              style={{ color: '#94A3B8' }}
            >
              {totalCount} résultat{totalCount !== 1 ? 's' : ''}
            </motion.p>
          </div>
        </div>

        <AnimatePresence>
          {activeCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={onReset}
              whileTap={{ scale: 0.94 }}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all"
              style={{ background: '#FEF2F2', color: '#EF4444', border: '1.5px solid #FECACA' }}
            >
              <RotateCcw className="w-3 h-3" />
              Effacer ({activeCount})
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 overflow-y-auto">

        <Section title="Budget maximum" defaultOpen={true} badge={filters.maxPrice > 0 ? 1 : 0}>
          <BudgetSlider
            value={filters.maxPrice}
            onChange={v => {
              onFiltersChange({ maxPrice: v });
              track('catalog_filter_apply', { filter: 'maxPrice', value: v });
            }}
          />
        </Section>

        <Section title="Énergie" defaultOpen={true} badge={filters.fuels.length}>
          <div className="grid grid-cols-1 gap-2">
            {FUEL_OPTIONS.map(opt => {
              const isActive = filters.fuels.includes(opt.value);
              return (
                <motion.button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleFuel(opt.value)}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left w-full relative overflow-hidden"
                  style={{
                    background: isActive ? opt.gradient : '#F8FAFC',
                    border: isActive ? '1.5px solid transparent' : '1.5px solid #F1F5F9',
                    color: isActive ? opt.activeText : '#64748B',
                    boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  <span className="text-xl w-7 flex-shrink-0 text-center leading-none">{opt.icon}</span>
                  <span className="flex-1 font-semibold text-[13px]">{opt.label}</span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(0,0,0,0.12)' }}
                      >
                        <Check className="w-3 h-3" style={{ color: opt.activeText }} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </Section>

        <Section title="Carrosserie" defaultOpen={false} badge={filters.bodyTypes.length}>
          <div className="grid grid-cols-2 gap-2">
            {BODY_OPTIONS.map(opt => {
              const isActive = filters.bodyTypes.includes(opt.value);
              return (
                <motion.button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleBody(opt.value)}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-[12px] font-semibold transition-all duration-150"
                  style={{
                    background: isActive ? 'linear-gradient(135deg,#0F172A,#1A3F6F)' : '#F8FAFC',
                    border: `1.5px solid ${isActive ? 'transparent' : '#F1F5F9'}`,
                    color: isActive ? '#fff' : '#64748B',
                    boxShadow: isActive ? '0 4px 14px rgba(15,23,42,0.22)' : 'none',
                  }}
                >
                  <span className="text-xl leading-none">{opt.icon}</span>
                  <span>{opt.label}</span>
                </motion.button>
              );
            })}
          </div>
        </Section>

        <Section title="Boîte de vitesses" defaultOpen={false} badge={filters.transmissions.length}>
          <div className="grid grid-cols-2 gap-2">
            {(['manuelle', 'automatique'] as TransmissionType[]).map(t => {
              const isActive = filters.transmissions.includes(t);
              return (
                <motion.button
                  key={t}
                  type="button"
                  onClick={() => toggleTransmission(t)}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-[12px] font-semibold transition-all duration-150"
                  style={{
                    background: isActive ? 'linear-gradient(135deg,#0F172A,#1A3F6F)' : '#F8FAFC',
                    border: `1.5px solid ${isActive ? 'transparent' : '#F1F5F9'}`,
                    color: isActive ? '#fff' : '#64748B',
                    boxShadow: isActive ? '0 4px 14px rgba(15,23,42,0.22)' : 'none',
                  }}
                >
                  <span className="text-xl leading-none">{t === 'manuelle' ? '🕹' : '🤖'}</span>
                  <span>{t === 'manuelle' ? 'Manuelle' : 'Automatique'}</span>
                </motion.button>
              );
            })}
          </div>
        </Section>

        <Section title="Kilométrage maximum" defaultOpen={false} badge={filters.maxMileage > 0 && filters.maxMileage < 999999 ? 1 : 0}>
          <MileageSlider
            value={filters.maxMileage}
            onChange={v => {
              onFiltersChange({ maxMileage: v });
              track('catalog_filter_apply', { filter: 'maxMileage', value: v });
            }}
          />
        </Section>

        <Section title="Année minimum" defaultOpen={false} badge={filters.minYear > 0 ? 1 : 0}>
          <div className="flex flex-wrap gap-2">
            {YEAR_OPTIONS.map(y => {
              const isActive = filters.minYear === y;
              return (
                <motion.button
                  key={y}
                  type="button"
                  onClick={() => {
                    onFiltersChange({ minYear: filters.minYear === y ? 0 : y });
                    track('catalog_filter_apply', { filter: 'minYear', value: y });
                  }}
                  whileTap={{ scale: 0.93 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150"
                  style={{
                    background: isActive ? 'linear-gradient(135deg,#0F172A,#1A3F6F)' : '#F8FAFC',
                    border: `1.5px solid ${isActive ? 'transparent' : '#F1F5F9'}`,
                    color: isActive ? '#fff' : '#64748B',
                    boxShadow: isActive ? '0 4px 12px rgba(15,23,42,0.22)' : 'none',
                  }}
                >
                  {y}+
                </motion.button>
              );
            })}
          </div>
        </Section>

        <Section title="Marque" defaultOpen={false} badge={filters.brands.length}>
          <div className="flex flex-wrap gap-1.5">
            {brands.map(brand => {
              const isActive = filters.brands.includes(brand);
              return (
                <motion.button
                  key={brand}
                  type="button"
                  onClick={() => toggleBrand(brand)}
                  whileTap={{ scale: 0.93 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                  style={{
                    background: isActive ? 'linear-gradient(135deg,#0F172A,#1A3F6F)' : '#F8FAFC',
                    border: `1.5px solid ${isActive ? 'transparent' : '#F1F5F9'}`,
                    color: isActive ? '#fff' : '#475569',
                    boxShadow: isActive ? '0 3px 10px rgba(15,23,42,0.22)' : 'none',
                  }}
                >
                  {brand}
                </motion.button>
              );
            })}
          </div>
        </Section>

        {cities.length > 0 && (
          <Section title="Agence / Ville" defaultOpen={false} badge={filters.cities.length}>
            <div className="flex flex-wrap gap-1.5">
              {cities.map(city => {
                const isActive = filters.cities.includes(city);
                return (
                  <motion.button
                    key={city}
                    type="button"
                    onClick={() => {
                      const next = filters.cities.includes(city)
                        ? filters.cities.filter(c => c !== city)
                        : [...filters.cities, city];
                      onFiltersChange({ cities: next });
                      track('catalog_filter_apply', { filter: 'city', source: city });
                    }}
                    whileTap={{ scale: 0.93 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                    style={{
                      background: isActive ? 'linear-gradient(135deg,#0F172A,#1A3F6F)' : '#F8FAFC',
                      border: `1.5px solid ${isActive ? 'transparent' : '#F1F5F9'}`,
                      color: isActive ? '#fff' : '#475569',
                      boxShadow: isActive ? '0 3px 10px rgba(15,23,42,0.22)' : 'none',
                    }}
                  >
                    {city}
                  </motion.button>
                );
              })}
            </div>
          </Section>
        )}

      </div>

      <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(226,232,240,0.5)' }}>
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 rounded-2xl text-sm font-black text-white transition-all duration-200 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg,#0F172A 0%,#1A3F6F 50%,#1E4D8C 100%)',
            boxShadow: '0 8px 24px rgba(15,23,42,0.35)',
          }}
        >
          <motion.span
            key={totalCount}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            Voir {totalCount} véhicule{totalCount !== 1 ? 's' : ''}
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}
