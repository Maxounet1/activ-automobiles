'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { QuickFilter, CatalogFilters } from '@/lib/types';
import { track } from '@/lib/analytics';

const QUICK_FILTER_OPTIONS: {
  value: QuickFilter;
  label: string;
  icon: string;
  color: string;
  activeBg: string;
  activeBorder: string;
}[] = [
  { value: 'automatique', label: 'Automatique',  icon: '⚙️', color: '#374151', activeBg: '#1A3F6F', activeBorder: '#1A3F6F' },
  { value: 'hybride',     label: 'Hybride',      icon: '♻️', color: '#16A34A', activeBg: '#16A34A', activeBorder: '#16A34A' },
  { value: 'suv',         label: 'SUV',          icon: '🚙', color: '#1D4ED8', activeBg: '#1D4ED8', activeBorder: '#1D4ED8' },
  { value: 'budget-15k',  label: '< 15 000 €',   icon: '💶', color: '#D97706', activeBg: '#D97706', activeBorder: '#D97706' },
  { value: 'budget-20k',  label: '< 20 000 €',   icon: '💶', color: '#B45309', activeBg: '#B45309', activeBorder: '#B45309' },
  { value: 'faible-km',   label: 'Faible km',    icon: '📍', color: '#0369A1', activeBg: '#0369A1', activeBorder: '#0369A1' },
  { value: 'nouveaute',   label: 'Nouveauté',    icon: '✨', color: '#7C3AED', activeBg: '#7C3AED', activeBorder: '#7C3AED' },
  { value: 'budget-10k',  label: '< 10 000 €',   icon: '💶', color: '#6B7280', activeBg: '#4B5563', activeBorder: '#4B5563' },
  { value: 'budget-30k',  label: '< 30 000 €',   icon: '💶', color: '#92400E', activeBg: '#92400E', activeBorder: '#92400E' },
];

interface QuickFiltersProps {
  filters: CatalogFilters;
  onFiltersChange: (f: Partial<CatalogFilters>) => void;
  onReset: () => void;
}

export default function QuickFilters({ filters, onFiltersChange, onReset }: QuickFiltersProps) {
  const toggle = (value: QuickFilter) => {
    const isBudget = value.startsWith('budget-');
    let next: QuickFilter[];
    if (filters.quickFilters.includes(value)) {
      next = filters.quickFilters.filter(f => f !== value);
    } else if (isBudget) {
      next = [...filters.quickFilters.filter(f => !f.startsWith('budget-')), value];
    } else {
      next = [...filters.quickFilters, value];
    }
    onFiltersChange({ quickFilters: next });
    track('catalog_filter_apply', { filter: 'quick', source: value });
  };

  const hasActive = filters.quickFilters.length > 0;

  return (
    <div
      className="w-full overflow-x-auto scrollbar-none py-3 px-4 sm:px-6 lg:px-8"
      style={{
        borderBottom: '1px solid rgba(226,232,240,0.6)',
        background: 'rgba(248,250,252,0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="flex items-center gap-2 max-w-screen-xl mx-auto flex-nowrap">
        <span
          className="text-[10px] font-bold uppercase tracking-widest flex-shrink-0 mr-1 hidden sm:inline"
          style={{ color: '#CBD5E1' }}
        >
          Accès rapide
        </span>

        {QUICK_FILTER_OPTIONS.map((opt, idx) => {
          const isActive = filters.quickFilters.includes(opt.value);
          return (
            <motion.button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              whileTap={{ scale: 0.94 }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03, duration: 0.2 }}
              className="whitespace-nowrap inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold flex-shrink-0 transition-colors duration-200"
              style={{
                background: isActive ? opt.activeBg : '#fff',
                color: isActive ? '#fff' : opt.color,
                border: `1.5px solid ${isActive ? opt.activeBorder : '#E5E7EB'}`,
                boxShadow: isActive
                  ? `0 4px 12px ${opt.activeBg}44`
                  : '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <span className="text-sm leading-none">{opt.icon}</span>
              {opt.label}
            </motion.button>
          );
        })}

        <AnimatePresence>
          {hasActive && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={onReset}
              className="whitespace-nowrap inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold flex-shrink-0"
              style={{
                background: '#FEF2F2',
                color: '#DC2626',
                border: '1.5px solid #FECACA',
                boxShadow: '0 1px 4px rgba(220,38,38,0.08)',
              }}
            >
              <X className="w-3 h-3" />
              Effacer
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
