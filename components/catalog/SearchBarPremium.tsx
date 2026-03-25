'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, PhoneCall, ChevronDown, X, Check } from 'lucide-react';
import type { CatalogFilters } from '@/lib/types';
import { track } from '@/lib/analytics';

interface SearchBarPremiumProps {
  filters: CatalogFilters;
  brands: string[];
  totalCount: number;
  activeFilterCount: number;
  onSearchChange: (q: string) => void;
  onBrandSelect: (brand: string) => void;
  onOpenFilters: () => void;
  onOpenCallback: () => void;
}

export default function SearchBarPremium({
  filters,
  brands,
  totalCount,
  activeFilterCount,
  onSearchChange,
  onBrandSelect,
  onOpenFilters,
  onOpenCallback,
}: SearchBarPremiumProps) {
  const [brandOpen, setBrandOpen] = useState(false);
  const [brandQuery, setBrandQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);

  const filteredBrands = brands.filter(b =>
    b.toLowerCase().includes(brandQuery.toLowerCase())
  );

  const selectedBrand = filters.brands[0] ?? null;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (brandRef.current && !brandRef.current.contains(e.target as Node)) {
        setBrandOpen(false);
        setBrandQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="sticky top-0 z-40"
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid #F1F5F9',
        boxShadow: '0 1px 0 #F1F5F9, 0 4px 24px rgba(15,23,42,0.04)',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 sm:gap-2.5">

          <div
            className="flex-1 relative min-w-0 transition-all duration-200"
            style={{
              borderRadius: 12,
              boxShadow: focused ? '0 0 0 3px rgba(26,63,111,0.12)' : 'none',
            }}
          >
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10 transition-colors duration-200"
              style={{ color: focused ? '#1A3F6F' : '#CBD5E1' }}
            />
            <input
              type="text"
              value={filters.search}
              onChange={e => onSearchChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Marque, modèle, version…"
              className="w-full pl-10 pr-9 py-2.5 text-sm outline-none transition-all duration-200"
              style={{
                borderRadius: 12,
                border: `1.5px solid ${focused ? '#1A3F6F' : '#E2E8F0'}`,
                background: focused ? '#fff' : '#F8FAFC',
                color: '#0F172A',
              }}
            />
            <AnimatePresence>
              {filters.search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full transition-colors"
                  style={{ background: '#F1F5F9', color: '#94A3B8' }}
                >
                  <X className="w-3 h-3" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="relative flex-shrink-0" ref={brandRef}>
            <motion.button
              type="button"
              onClick={() => { setBrandOpen(p => !p); setBrandQuery(''); }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 whitespace-nowrap"
              style={{
                borderRadius: 12,
                border: `1.5px solid ${brandOpen || selectedBrand ? '#1A3F6F' : '#E2E8F0'}`,
                background: selectedBrand ? 'linear-gradient(135deg,#EFF6FF,#DBEAFE)' : '#F8FAFC',
                color: selectedBrand ? '#1A3F6F' : '#475569',
              }}
            >
              {selectedBrand ? (
                <>
                  <span className="font-bold">{selectedBrand}</span>
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); onBrandSelect(selectedBrand); }}
                    className="w-4 h-4 rounded-full flex items-center justify-center ml-0.5 hover:opacity-70"
                    style={{ background: 'rgba(26,63,111,0.15)' }}
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </>
              ) : (
                <>
                  <span>Marque</span>
                  <ChevronDown
                    className="w-3.5 h-3.5 transition-transform duration-200"
                    style={{ color: '#CBD5E1', transform: brandOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                  />
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {brandOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-0 top-full mt-2 w-72 z-50 overflow-hidden"
                  style={{
                    borderRadius: 18,
                    background: '#fff',
                    border: '1px solid #F1F5F9',
                    boxShadow: '0 24px 64px rgba(15,23,42,0.14), 0 4px 16px rgba(15,23,42,0.06)',
                  }}
                >
                  <div className="p-3" style={{ borderBottom: '1px solid #F8FAFC' }}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#CBD5E1' }} />
                      <input
                        type="text"
                        value={brandQuery}
                        onChange={e => setBrandQuery(e.target.value)}
                        placeholder="Rechercher une marque…"
                        autoFocus
                        className="w-full pl-9 pr-3 py-2 text-sm outline-none rounded-xl"
                        style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#0F172A' }}
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-64 p-2">
                    {filteredBrands.length === 0 ? (
                      <p className="text-center text-xs py-4" style={{ color: '#CBD5E1' }}>Aucune marque trouvée</p>
                    ) : (
                      filteredBrands.map(brand => (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => {
                            onBrandSelect(brand);
                            setBrandOpen(false);
                            setBrandQuery('');
                            track('catalog_filter_apply', { filter: 'brand', source: brand });
                          }}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-all duration-100 flex items-center justify-between"
                          style={{
                            background: filters.brands.includes(brand) ? '#EFF6FF' : 'transparent',
                            color: filters.brands.includes(brand) ? '#1D4ED8' : '#374151',
                            fontWeight: filters.brands.includes(brand) ? 600 : 400,
                          }}
                        >
                          <span>{brand}</span>
                          {filters.brands.includes(brand) && (
                            <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1A3F6F,#2563EB)' }}>
                              <Check className="w-3 h-3 text-white" />
                            </span>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            onClick={onOpenFilters}
            whileTap={{ scale: 0.96 }}
            className="relative inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-bold transition-all duration-200 flex-shrink-0"
            style={{
              borderRadius: 12,
              background: activeFilterCount > 0
                ? 'linear-gradient(135deg,#0F172A,#1A3F6F)'
                : '#F8FAFC',
              color: activeFilterCount > 0 ? '#fff' : '#475569',
              border: `1.5px solid ${activeFilterCount > 0 ? 'transparent' : '#E2E8F0'}`,
              boxShadow: activeFilterCount > 0 ? '0 4px 16px rgba(15,23,42,0.28)' : 'none',
            }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filtres</span>
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black"
                  style={{ background: '#F97316', color: '#fff' }}
                >
                  {activeFilterCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <div
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2.5 flex-shrink-0"
            style={{
              borderRadius: 12,
              background: '#F0F9FF',
              border: '1.5px solid #BAE6FD',
            }}
          >
            <motion.span
              key={totalCount}
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-sm font-black"
              style={{ color: '#0369A1' }}
            >
              {totalCount}
            </motion.span>
            <span className="text-xs font-medium" style={{ color: '#38BDF8' }}>
              véhicule{totalCount !== 1 ? 's' : ''}
            </span>
          </div>

          <motion.button
            type="button"
            onClick={() => { onOpenCallback(); track('submit_callback', { source: 'topbar' }); }}
            whileTap={{ scale: 0.96 }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white flex-shrink-0"
            style={{
              borderRadius: 12,
              background: 'linear-gradient(135deg,#0F172A 0%,#1A3F6F 100%)',
              boxShadow: '0 4px 16px rgba(15,23,42,0.28)',
            }}
          >
            <PhoneCall className="w-4 h-4" />
            <span className="hidden lg:inline">Être rappelé</span>
          </motion.button>

        </div>
      </div>
    </div>
  );
}
