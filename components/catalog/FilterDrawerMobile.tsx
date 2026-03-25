'use client';

import React, { useEffect } from 'react';
import { useFocusTrap } from '@/lib/hooks/useFocusTrap';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { CatalogFilters } from '@/lib/types';
import FiltersPanelPremium from './FiltersPanelPremium';

interface FilterDrawerMobileProps {
  open: boolean;
  onClose: () => void;
  filters: CatalogFilters;
  brands: string[];
  cities: string[];
  totalCount: number;
  onFiltersChange: (f: Partial<CatalogFilters>) => void;
  onReset: () => void;
}

export default function FilterDrawerMobile({
  open,
  onClose,
  filters,
  brands,
  cities,
  totalCount,
  onFiltersChange,
  onReset,
}: FilterDrawerMobileProps) {
  const focusTrapRef = useFocusTrap(open);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={focusTrapRef as React.Ref<HTMLDivElement>}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm flex flex-col"
            style={{
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px)',
              boxShadow: '-8px 0 48px rgba(0,0,0,0.16)',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all hover:scale-110"
              style={{ background: '#F3F4F6', color: '#374151' }}
              aria-label="Fermer les filtres"
            >
              <X className="w-4 h-4" />
            </button>

            <FiltersPanelPremium
              filters={filters}
              brands={brands}
              cities={cities}
              totalCount={totalCount}
              onFiltersChange={onFiltersChange}
              onReset={onReset}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
