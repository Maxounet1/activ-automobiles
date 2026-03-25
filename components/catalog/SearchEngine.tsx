'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, SlidersHorizontal, X, ArrowRight, Zap, Gauge, LayoutGrid } from 'lucide-react';
import type { Vehicle, FuelType, BodyType } from '@/lib/types';
import { BRAND_COLOR, searchEngineStyles } from './SearchStyles';
import SearchPopularTags from './SearchPopularTags';

const FUEL_OPTIONS: { value: FuelType; label: string }[] = [
  { value: 'essence', label: 'Essence' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'hybride', label: 'Hybride' },
  { value: 'hybride-rechargeable', label: 'Hybride rechargeable' },
  { value: 'electrique', label: 'Électrique' },
];

const BODY_OPTIONS: { value: BodyType; label: string }[] = [
  { value: 'suv', label: 'SUV' },
  { value: 'berline', label: 'Berline' },
  { value: 'citadine', label: 'Citadine' },
  { value: 'break', label: 'Break' },
  { value: 'coupe', label: 'Coupé' },
  { value: 'cabriolet', label: 'Cabriolet' },
  { value: 'monospace', label: 'Monospace' },
  { value: 'utilitaire', label: 'Utilitaire' },
];

const POPULAR_SEARCHES = [
  { label: 'SUV occasion', q: '', bodyType: 'suv' },
  { label: 'Électrique', q: '', fuel: 'electrique' },
  { label: '< 15 000 €', q: '', maxPrice: '15000' },
  { label: 'Automatique', q: '', transmission: 'automatique' },
  { label: 'Hybride', q: '', fuel: 'hybride' },
];

interface SearchEngineProps {
  vehicles: Vehicle[];
  onFilter: (filtered: Vehicle[]) => void;
  totalCount: number;
}

export default function SearchEngine({ vehicles, onFilter, totalCount }: SearchEngineProps) {
  const router = useRouter();

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [fuels, setFuels] = useState<FuelType[]>([]);
  const [bodyTypes, setBodyTypes] = useState<BodyType[]>([]);
  const [transmission, setTransmission] = useState<'manuelle' | 'automatique' | ''>('');
  const [maxPrice, setMaxPrice] = useState(50000);
  const [maxMileage, setMaxMileage] = useState(200000);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  const allBrands = useMemo(() => Array.from(new Set(vehicles.map(v => v.brand))).sort(), [vehicles]);
  const modelsByBrand = useMemo(() => {
    if (!brand) return [];
    return Array.from(new Set(vehicles.filter(v => v.brand === brand).map(v => v.model))).sort();
  }, [vehicles, brand]);

  const filtered = useMemo(() => {
    return vehicles.filter(v => {
      if (!v.available) return false;
      if (brand && v.brand !== brand) return false;
      if (model && v.model !== model) return false;
      if (fuels.length && !fuels.includes(v.fuel as FuelType)) return false;
      if (bodyTypes.length && !bodyTypes.includes(v.bodyType as BodyType)) return false;
      if (transmission && v.transmission !== transmission) return false;
      if (v.price > maxPrice) return false;
      if (v.mileage > maxMileage) return false;
      return true;
    });
  }, [vehicles, brand, model, fuels, bodyTypes, transmission, maxPrice, maxMileage]);

  useEffect(() => {
    onFilter(filtered);
  }, [filtered, onFilter]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (brandRef.current && !brandRef.current.contains(e.target as Node)) setBrandOpen(false);
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) setModelOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleFuel(f: FuelType) {
    setFuels(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  }

  function toggleBody(b: BodyType) {
    setBodyTypes(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
  }

  function handleReset() {
    setBrand(''); setModel(''); setFuels([]); setBodyTypes([]);
    setTransmission(''); setMaxPrice(50000); setMaxMileage(200000);
  }

  const hasFilters = brand || model || fuels.length || bodyTypes.length || transmission || maxPrice < 50000 || maxMileage < 200000;

  function buildQueryString() {
    const params = new URLSearchParams();
    if (brand) params.set('brand', brand);
    if (model) params.set('model', model);
    if (fuels.length === 1) params.set('fuel', fuels[0]);
    if (bodyTypes.length === 1) params.set('bodyType', bodyTypes[0]);
    if (transmission) params.set('transmission', transmission);
    if (maxPrice < 50000) params.set('maxPrice', String(maxPrice));
    if (maxMileage < 200000) params.set('maxMileage', String(maxMileage));
    return params.toString();
  }

  function handleSearch() {
    const qs = buildQueryString();
    router.push(`/vehicules${qs ? '?' + qs : ''}`);
  }

  function handlePopularSearch(s: { label: string; q: string; bodyType?: string; fuel?: string; maxPrice?: string; transmission?: string; [key: string]: string | undefined }) {
    const params = new URLSearchParams();
    if (s.q) params.set('q', s.q);
    if ('bodyType' in s && s.bodyType) params.set('bodyType', s.bodyType);
    if ('fuel' in s && s.fuel) params.set('fuel', s.fuel);
    if ('maxPrice' in s && s.maxPrice) params.set('maxPrice', s.maxPrice);
    if ('transmission' in s && s.transmission) params.set('transmission', s.transmission);
    const qs = params.toString();
    router.push(`/vehicules${qs ? '?' + qs : ''}`);
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <style>{searchEngineStyles + `
        .se-field-btn {
          position: relative;
          overflow: hidden;
        }
        .se-field-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .se-field-btn:hover::before {
          opacity: 1;
        }
        .se-chip {
          position: relative;
          overflow: hidden;
        }
        .se-chip::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%);
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }
        .se-chip:hover::before {
          opacity: 1;
        }
        .se-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #1A3F6F;
          box-shadow: 0 2px 8px rgba(26,63,111,0.25), 0 0 0 3px rgba(26,63,111,0.08);
          cursor: pointer;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .se-range::-webkit-slider-thumb:hover {
          box-shadow: 0 2px 12px rgba(26,63,111,0.35), 0 0 0 5px rgba(26,63,111,0.10);
          transform: scale(1.1);
        }
        .se-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #1A3F6F;
          box-shadow: 0 2px 8px rgba(26,63,111,0.25);
          cursor: pointer;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(26,63,111,0.09)',
          boxShadow: '0 2px 1px rgba(255,255,255,0.9) inset, 0 16px 56px rgba(26,63,111,0.10), 0 4px 16px rgba(26,63,111,0.05)',
        }}
        className="rounded-3xl overflow-hidden"
      >
        {/* Header strip */}
        <div
          className="flex items-center justify-between px-8 py-5 border-b"
          style={{
            borderColor: 'rgba(26,63,111,0.07)',
            background: 'linear-gradient(to right, rgba(243,247,252,0.8), rgba(234,241,250,0.5))',
          }}
        >
          <div className="flex items-center gap-3.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, #143260 100%)`,
                boxShadow: `0 4px 12px rgba(26,63,111,0.28)`,
              }}
            >
              <Search className="w-4 h-4 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">Trouver votre véhicule</p>
              <p className="text-xs text-gray-400 mt-0.5">Parmi {totalCount} véhicules disponibles</p>
            </div>
          </div>

          <motion.div
            key={filtered.length}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2.5"
          >
            <span
              className="text-xs font-bold px-3.5 py-1.5 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${BRAND_COLOR}14, ${BRAND_COLOR}0A)`,
                color: BRAND_COLOR,
                border: `1px solid ${BRAND_COLOR}20`,
              }}
            >
              {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
            </span>
            {hasFilters && (
              <button
                onClick={handleReset}
                className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors duration-200"
              >
                <X className="w-3 h-3" /> Réinitialiser
              </button>
            )}
          </motion.div>
        </div>

        {/* Main form */}
        <div className="px-8 py-7 space-y-7">

          {/* Row 1: Marque + Modèle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Marque */}
            <div ref={brandRef} className="relative">
              <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-2.5">Marque</label>
              <button
                onClick={() => setBrandOpen(o => !o)}
                className="se-field-btn w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-sm transition-all duration-200 focus:outline-none"
                style={{
                  background: brandOpen
                    ? 'linear-gradient(135deg, rgba(26,63,111,0.05), rgba(26,63,111,0.02))'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(249,250,251,0.9))',
                  borderColor: brandOpen ? BRAND_COLOR + '55' : 'rgba(229,231,235,0.8)',
                  color: brand ? '#111' : '#9CA3AF',
                  boxShadow: brandOpen
                    ? `0 0 0 3px ${BRAND_COLOR}14, 0 2px 8px rgba(26,63,111,0.08)`
                    : '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
                }}
              >
                <span className={brand ? 'font-semibold text-gray-900 text-[15px]' : 'text-[15px]'}>{brand || 'Toutes les marques'}</span>
                <ChevronDown
                  className="w-4 h-4 text-gray-400 transition-transform duration-200"
                  style={{ transform: brandOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              <AnimatePresence>
                {brandOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-2xl z-50 overflow-hidden"
                    style={{ boxShadow: '0 24px 56px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)' }}
                  >
                    <div className="max-h-52 overflow-y-auto py-1.5">
                      <button
                        onClick={() => { setBrand(''); setModel(''); setBrandOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-400 hover:bg-gray-50 transition-colors"
                      >
                        Toutes les marques
                      </button>
                      {allBrands.map(b => (
                        <button
                          key={b}
                          onClick={() => { setBrand(b); setModel(''); setBrandOpen(false); }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                          style={{ color: brand === b ? BRAND_COLOR : '#111', fontWeight: brand === b ? 600 : 400 }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Modèle */}
            <div ref={modelRef} className="relative">
              <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-2.5">Modèle</label>
              <button
                disabled={!brand}
                onClick={() => brand && setModelOpen(o => !o)}
                className="se-field-btn w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-sm transition-all duration-200 focus:outline-none"
                style={{
                  background: !brand
                    ? 'rgba(249,250,251,0.7)'
                    : modelOpen
                      ? 'linear-gradient(135deg, rgba(26,63,111,0.05), rgba(26,63,111,0.02))'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(249,250,251,0.9))',
                  borderColor: modelOpen ? BRAND_COLOR + '55' : 'rgba(229,231,235,0.8)',
                  color: !brand ? '#D1D5DB' : model ? '#111' : '#9CA3AF',
                  cursor: !brand ? 'not-allowed' : 'pointer',
                  boxShadow: modelOpen
                    ? `0 0 0 3px ${BRAND_COLOR}14, 0 2px 8px rgba(26,63,111,0.08)`
                    : '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
                }}
              >
                <span className={model ? 'font-semibold text-gray-900 text-[15px]' : 'text-[15px]'}>
                  {!brand ? "Choisir une marque d'abord" : model || 'Tous les modèles'}
                </span>
                <ChevronDown
                  className="w-4 h-4 text-gray-400 transition-transform duration-200"
                  style={{ transform: modelOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              <AnimatePresence>
                {modelOpen && brand && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-2xl z-50 overflow-hidden"
                    style={{ boxShadow: '0 24px 56px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)' }}
                  >
                    <div className="max-h-52 overflow-y-auto py-1.5">
                      <button
                        onClick={() => { setModel(''); setModelOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-400 hover:bg-gray-50 transition-colors"
                      >
                        Tous les modèles
                      </button>
                      {modelsByBrand.map(m => (
                        <button
                          key={m}
                          onClick={() => { setModel(m); setModelOpen(false); }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                          style={{ color: model === m ? BRAND_COLOR : '#111', fontWeight: model === m ? 600 : 400 }}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Séparateur subtil */}
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(26,63,111,0.07), transparent)' }} />

          {/* Row 2: Énergie */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-3">
              Énergie
            </label>
            <div className="flex flex-wrap gap-2">
              {FUEL_OPTIONS.map(({ value, label }) => {
                const active = fuels.includes(value);
                return (
                  <motion.button
                    key={value}
                    onClick={() => toggleFuel(value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="se-chip flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200"
                    style={{
                      background: active
                        ? `linear-gradient(135deg, ${BRAND_COLOR} 0%, #143260 100%)`
                        : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(249,250,251,0.9))',
                      borderColor: active ? 'transparent' : 'rgba(229,231,235,0.8)',
                      color: active ? '#fff' : '#374151',
                      boxShadow: active
                        ? `0 4px 14px ${BRAND_COLOR}30, 0 1px 3px rgba(26,63,111,0.15)`
                        : '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    {value === 'electrique' && <Zap className="w-3.5 h-3.5" />}
                    {value === 'hybride' && <Gauge className="w-3.5 h-3.5" />}
                    {label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Budget maximum */}
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400">Budget maximum</label>
              <motion.span
                key={maxPrice}
                initial={{ opacity: 0.6, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-bold tabular-nums"
                style={{ color: BRAND_COLOR }}
              >
                {maxPrice >= 50000 ? 'Tous budgets' : maxPrice.toLocaleString('fr-FR') + ' €'}
              </motion.span>
            </div>
            <div className="relative px-1">
              <input
                type="range"
                min={5000}
                max={50000}
                step={500}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="se-range w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${BRAND_COLOR} 0%, ${BRAND_COLOR} ${((maxPrice - 5000) / 45000) * 100}%, rgba(229,231,235,0.7) ${((maxPrice - 5000) / 45000) * 100}%, rgba(229,231,235,0.7) 100%)`,
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-[11px] text-gray-400">5 000 €</span>
                <span className="text-[11px] text-gray-400">50 000 €</span>
              </div>
              <div className="flex gap-2 mt-3.5 flex-wrap">
                {[10000, 15000, 20000, 30000].map(v => (
                  <button
                    key={v}
                    onClick={() => setMaxPrice(v)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200 hover:scale-[1.03]"
                    style={{
                      background: maxPrice === v
                        ? `linear-gradient(135deg, ${BRAND_COLOR}14, ${BRAND_COLOR}08)`
                        : 'transparent',
                      borderColor: maxPrice === v ? BRAND_COLOR + '30' : 'rgba(229,231,235,0.8)',
                      color: maxPrice === v ? BRAND_COLOR : '#9CA3AF',
                    }}
                  >
                    &lt; {(v / 1000).toLocaleString('fr-FR')}k €
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Séparateur subtil */}
          <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(26,63,111,0.07), transparent)' }} />

          {/* Filtres avancés toggle */}
          <button
            onClick={() => setShowAdvanced(o => !o)}
            className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:opacity-75"
            style={{ color: showAdvanced ? BRAND_COLOR : '#9CA3AF' }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showAdvanced ? 'Masquer les filtres avancés' : 'Filtres avancés — kilométrage, carrosserie, boîte'}
            <ChevronDown
              className="w-4 h-4 transition-transform duration-200"
              style={{ transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0)' }}
            />
          </button>

          {/* Panneau avancé */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden space-y-7"
              >
                {/* Kilométrage */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400">Kilométrage maximum</label>
                    <motion.span
                      key={maxMileage}
                      initial={{ opacity: 0.6, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm font-bold tabular-nums"
                      style={{ color: BRAND_COLOR }}
                    >
                      {maxMileage >= 200000 ? 'Tous km' : maxMileage.toLocaleString('fr-FR') + ' km'}
                    </motion.span>
                  </div>
                  <div className="px-1">
                    <input
                      type="range"
                      min={0}
                      max={200000}
                      step={5000}
                      value={maxMileage}
                      onChange={e => setMaxMileage(Number(e.target.value))}
                      className="se-range w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${BRAND_COLOR} 0%, ${BRAND_COLOR} ${(maxMileage / 200000) * 100}%, rgba(229,231,235,0.7) ${(maxMileage / 200000) * 100}%, rgba(229,231,235,0.7) 100%)`,
                      }}
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-[11px] text-gray-400">0 km</span>
                      <span className="text-[11px] text-gray-400">200 000 km</span>
                    </div>
                    <div className="flex gap-2 mt-3.5 flex-wrap">
                      {[50000, 100000, 150000].map(v => (
                        <button
                          key={v}
                          onClick={() => setMaxMileage(v)}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200 hover:scale-[1.03]"
                          style={{
                            background: maxMileage === v
                              ? `linear-gradient(135deg, ${BRAND_COLOR}14, ${BRAND_COLOR}08)`
                              : 'transparent',
                            borderColor: maxMileage === v ? BRAND_COLOR + '30' : 'rgba(229,231,235,0.8)',
                            color: maxMileage === v ? BRAND_COLOR : '#9CA3AF',
                          }}
                        >
                          &lt; {(v / 1000).toLocaleString('fr-FR')}k km
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Carrosserie */}
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-3">
                    <LayoutGrid className="w-3.5 h-3.5 inline mr-1.5" />
                    Type de carrosserie
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BODY_OPTIONS.map(({ value, label }) => {
                      const active = bodyTypes.includes(value);
                      return (
                        <motion.button
                          key={value}
                          onClick={() => toggleBody(value)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="se-chip px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200"
                          style={{
                            background: active
                              ? `linear-gradient(135deg, ${BRAND_COLOR} 0%, #143260 100%)`
                              : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(249,250,251,0.9))',
                            borderColor: active ? 'transparent' : 'rgba(229,231,235,0.8)',
                            color: active ? '#fff' : '#374151',
                            boxShadow: active
                              ? `0 4px 14px ${BRAND_COLOR}30, 0 1px 3px rgba(26,63,111,0.15)`
                              : '0 1px 3px rgba(0,0,0,0.04)',
                          }}
                        >
                          {label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Boîte de vitesses */}
                <div>
                  <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-3">
                    Boîte de vitesses
                  </label>
                  <div className="flex gap-2">
                    {[{ value: '', label: 'Toutes' }, { value: 'manuelle', label: 'Manuelle' }, { value: 'automatique', label: 'Automatique' }].map(opt => {
                      const active = transmission === opt.value;
                      return (
                        <motion.button
                          key={opt.value}
                          onClick={() => setTransmission(opt.value as '' | 'manuelle' | 'automatique')}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="se-chip px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200"
                          style={{
                            background: active
                              ? `linear-gradient(135deg, ${BRAND_COLOR} 0%, #143260 100%)`
                              : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(249,250,251,0.9))',
                            borderColor: active ? 'transparent' : 'rgba(229,231,235,0.8)',
                            color: active ? '#fff' : '#374151',
                            boxShadow: active
                              ? `0 4px 14px ${BRAND_COLOR}30, 0 1px 3px rgba(26,63,111,0.15)`
                              : '0 1px 3px rgba(0,0,0,0.04)',
                          }}
                        >
                          {opt.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA centré */}
          <div className="flex justify-center pt-1">
            <motion.button
              onClick={handleSearch}
              whileHover={{ scale: 1.015, boxShadow: `0 12px 36px ${BRAND_COLOR}40` }}
              whileTap={{ scale: 0.985 }}
              className="se-chip flex items-center justify-center gap-3 px-10 py-4 rounded-2xl text-white font-bold text-[15px] min-w-[280px]"
              style={{
                background: `linear-gradient(135deg, #1E4A80 0%, ${BRAND_COLOR} 40%, #143260 100%)`,
                boxShadow: `0 8px 28px ${BRAND_COLOR}32, 0 2px 8px rgba(26,63,111,0.15)`,
              }}
            >
              <Search className="w-4 h-4" strokeWidth={2.5} />
              Voir les véhicules
              <motion.span
                key={filtered.length}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-normal opacity-75"
              >
                · {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
              </motion.span>
              <ArrowRight className="w-4 h-4 opacity-60" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Recherches populaires */}
      <SearchPopularTags searches={POPULAR_SEARCHES} onSelect={handlePopularSearch} />
    </div>
  );
}
