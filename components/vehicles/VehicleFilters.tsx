'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';
import type { SearchFilters, FuelType, BodyType } from '@/lib/types';
import { BRANDS } from '@/lib/utils';

const FUEL_OPTIONS: { value: FuelType; label: string; dot: string }[] = [
  { value: 'essence',               label: 'Essence',         dot: '#F59E0B' },
  { value: 'diesel',                label: 'Diesel',          dot: '#64748B' },
  { value: 'hybride',               label: 'Hybride',         dot: '#22C55E' },
  { value: 'electrique',            label: 'Électrique',      dot: '#3B82F6' },
  { value: 'hybride-rechargeable',  label: 'Plug-in Hybride', dot: '#10B981' },
];

const BODY_TYPES: { value: BodyType; label: string }[] = [
  { value: 'citadine',  label: 'Citadine' },
  { value: 'berline',   label: 'Berline' },
  { value: 'suv',       label: 'SUV' },
  { value: 'break',     label: 'Break' },
  { value: 'monospace', label: 'Monospace' },
  { value: 'coupe',     label: 'Coupé' },
];

const YEAR_OPTIONS = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

const PRICE_MIN = 3000;
const PRICE_MAX = 50000;
const KM_MIN = 0;
const KM_MAX = 200000;

function PriceSlider({ value, onChange }: { value: number | undefined; onChange: (v: number | undefined) => void }) {
  const [dragging, setDragging] = useState(false);
  const effective = value ?? PRICE_MAX;
  const pct = Math.round(((effective - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100);
  const isActive = value !== undefined && value < PRICE_MAX;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">3 000 €</span>
        <div
          className="px-3 py-1 rounded-full text-sm font-bold transition-all"
          style={{
            background: isActive ? '#1A3F6F' : '#F1F5F9',
            color: isActive ? '#fff' : '#94A3B8',
          }}
        >
          {isActive ? `${effective.toLocaleString('fr-FR')} €` : 'Tous prix'}
        </div>
        <span className="text-xs text-gray-400">50 000 €</span>
      </div>

      <div className="relative h-8 flex items-center">
        <div className="relative w-full h-1.5 rounded-full bg-gray-200">
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: isActive ? 'linear-gradient(90deg, #1A3F6F, #2558A0)' : '#CBD5E1',
              transition: 'width 0.05s',
            }}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#1A3F6F]"
            style={{ left: `${pct}%` }}
            animate={{ scale: dragging ? 1.25 : isActive ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          />
        </div>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={500}
          value={effective}
          onChange={e => {
            const v = Number(e.target.value);
            onChange(v >= PRICE_MAX ? undefined : v);
          }}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onTouchStart={() => setDragging(true)}
          onTouchEnd={() => setDragging(false)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
          style={{ height: '100%' }}
          aria-label="Budget maximum"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {[10000, 15000, 20000, 30000].map(m => (
          <button
            key={m}
            type="button"
            onClick={() => onChange(m)}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all hover:border-[#1A3F6F]/40 hover:text-[#1A3F6F]"
            style={{
              borderColor: isActive && effective === m ? '#1A3F6F' : '#E2E8F0',
              color: isActive && effective === m ? '#1A3F6F' : '#64748B',
              background: isActive && effective === m ? '#EEF4FB' : '#fff',
            }}
          >
            &lt; {m / 1000}k €
          </button>
        ))}
      </div>
    </div>
  );
}

function MileageSlider({ value, onChange }: { value: number | undefined; onChange: (v: number | undefined) => void }) {
  const [dragging, setDragging] = useState(false);
  const effective = value ?? KM_MAX;
  const pct = Math.round(((effective - KM_MIN) / (KM_MAX - KM_MIN)) * 100);
  const isActive = value !== undefined && value < KM_MAX;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">0 km</span>
        <div
          className="px-3 py-1 rounded-full text-sm font-bold transition-all"
          style={{
            background: isActive ? '#15803D' : '#F1F5F9',
            color: isActive ? '#fff' : '#94A3B8',
          }}
        >
          {isActive ? `${(effective / 1000).toFixed(0)} 000 km` : 'Tous km'}
        </div>
        <span className="text-xs text-gray-400">200k km</span>
      </div>

      <div className="relative h-8 flex items-center">
        <div className="relative w-full h-1.5 rounded-full bg-gray-200">
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: isActive ? 'linear-gradient(90deg, #16A34A, #22C55E)' : '#CBD5E1',
              transition: 'width 0.05s',
            }}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-green-600"
            style={{ left: `${pct}%` }}
            animate={{ scale: dragging ? 1.25 : isActive ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          />
        </div>
        <input
          type="range"
          min={KM_MIN}
          max={KM_MAX}
          step={5000}
          value={effective}
          onChange={e => {
            const v = Number(e.target.value);
            onChange(v >= KM_MAX ? undefined : v);
          }}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onTouchStart={() => setDragging(true)}
          onTouchEnd={() => setDragging(false)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
          style={{ height: '100%' }}
          aria-label="Kilométrage maximum"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {[50000, 100000, 150000].map(m => (
          <button
            key={m}
            type="button"
            onClick={() => onChange(m)}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all hover:border-green-600/40 hover:text-green-700"
            style={{
              borderColor: isActive && effective === m ? '#16A34A' : '#E2E8F0',
              color: isActive && effective === m ? '#16A34A' : '#64748B',
              background: isActive && effective === m ? '#F0FDF4' : '#fff',
            }}
          >
            &lt; {m / 1000}k km
          </button>
        ))}
      </div>
    </div>
  );
}

function Section({
  title,
  badge,
  defaultOpen = true,
  children,
}: {
  title: string;
  badge?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">{title}</span>
          {badge !== undefined && badge > 0 && (
            <span
              className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-black text-white"
              style={{ background: '#1A3F6F' }}
            >
              {badge}
            </span>
          )}
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function countActive(f: SearchFilters): number {
  return [f.brand, f.fuel, f.maxPrice, f.maxMileage, f.minYear, f.bodyType, f.transmission].filter(Boolean).length;
}

interface VehicleFiltersProps {
  initialFilters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

export default function VehicleFilters({ initialFilters, onFilterChange }: VehicleFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const active = countActive(filters);

  const update = useCallback(<K extends keyof SearchFilters>(key: K, value: SearchFilters[K] | undefined) => {
    setFilters(prev => {
      const next = { ...prev, [key]: value };
      onFilterChange(next);
      return next;
    });
  }, [onFilterChange]);

  const reset = useCallback(() => {
    const empty: SearchFilters = {};
    setFilters(empty);
    onFilterChange(empty);
  }, [onFilterChange]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)' }}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-sm font-black text-gray-900 leading-none">Filtres</p>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-none">
              {active > 0 ? `${active} actif${active > 1 ? 's' : ''}` : 'Aucun filtre'}
            </p>
          </div>
        </div>
        <AnimatePresence>
          {active > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-red-500 bg-red-50 border border-red-100 hover:bg-red-100 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Effacer
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <Section title="Budget maximum" badge={filters.maxPrice ? 1 : 0} defaultOpen>
        <PriceSlider value={filters.maxPrice} onChange={v => update('maxPrice', v)} />
      </Section>

      <Section title="Kilométrage max" badge={filters.maxMileage ? 1 : 0} defaultOpen>
        <MileageSlider value={filters.maxMileage} onChange={v => update('maxMileage', v)} />
      </Section>

      <Section title="Énergie" badge={filters.fuel ? 1 : 0} defaultOpen>
        <div className="space-y-1.5">
          {FUEL_OPTIONS.map(opt => {
            const on = filters.fuel === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => update('fuel', on ? undefined : opt.value)}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left border transition-all hover:border-[#1A3F6F]/30 hover:bg-[#EEF4FB]"
                style={{
                  background: on ? '#EEF4FB' : '#FAFAFA',
                  borderColor: on ? '#1A3F6F' : '#E2E8F0',
                  color: on ? '#1A3F6F' : '#374151',
                }}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: opt.dot }} />
                <span className="flex-1">{opt.label}</span>
                {on && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#1A3F6F' }}>
                    <Check className="w-3 h-3 text-white" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Carrosserie" badge={filters.bodyType ? 1 : 0} defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {BODY_TYPES.map(opt => {
            const on = filters.bodyType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => update('bodyType', on ? undefined : opt.value)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all"
                style={{
                  background: on ? '#1A3F6F' : '#fff',
                  borderColor: on ? '#1A3F6F' : '#E2E8F0',
                  color: on ? '#fff' : '#475569',
                  boxShadow: on ? '0 2px 8px rgba(26,63,111,0.2)' : 'none',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Boîte de vitesses" badge={filters.transmission ? 1 : 0} defaultOpen={false}>
        <div className="grid grid-cols-2 gap-2">
          {([
            { value: 'manuelle',    label: 'Manuelle' },
            { value: 'automatique', label: 'Automatique' },
          ] as const).map(t => {
            const on = filters.transmission === t.value;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => update('transmission', on ? undefined : t.value)}
                className="py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all"
                style={{
                  background: on ? '#1A3F6F' : '#fff',
                  borderColor: on ? '#1A3F6F' : '#E2E8F0',
                  color: on ? '#fff' : '#475569',
                  boxShadow: on ? '0 2px 8px rgba(26,63,111,0.2)' : 'none',
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Année minimum" badge={filters.minYear ? 1 : 0} defaultOpen={false}>
        <div className="flex flex-wrap gap-1.5">
          {YEAR_OPTIONS.map(y => {
            const on = filters.minYear === y;
            return (
              <button
                key={y}
                type="button"
                onClick={() => update('minYear', on ? undefined : y)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all"
                style={{
                  background: on ? '#1A3F6F' : '#fff',
                  borderColor: on ? '#1A3F6F' : '#E2E8F0',
                  color: on ? '#fff' : '#475569',
                  boxShadow: on ? '0 2px 8px rgba(26,63,111,0.2)' : 'none',
                }}
              >
                {y}+
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Marque" badge={filters.brand ? 1 : 0} defaultOpen={false}>
        <div className="flex flex-wrap gap-1.5">
          {BRANDS.map(brand => {
            const on = filters.brand === brand;
            return (
              <button
                key={brand}
                type="button"
                onClick={() => update('brand', on ? undefined : brand)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium border transition-all"
                style={{
                  background: on ? '#1A3F6F' : '#fff',
                  borderColor: on ? '#1A3F6F' : '#E2E8F0',
                  color: on ? '#fff' : '#475569',
                }}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
