'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRICE_MIN = 5000;
const PRICE_MAX = 60000;
const PRICE_STEP = 1000;

const MILESTONES = [10000, 15000, 20000, 30000, 40000, 60000];

interface BudgetSliderProps {
  value: number;
  onChange: (val: number) => void;
}

function formatPrice(val: number): string {
  if (val >= PRICE_MAX) return 'Sans limite';
  return `${val.toLocaleString('fr-FR')} €`;
}

export default function BudgetSlider({ value, onChange }: BudgetSliderProps) {
  const [dragging, setDragging] = useState(false);
  const effectiveValue = value > 0 && value < PRICE_MAX ? value : PRICE_MAX;
  const pct = ((effectiveValue - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: '#9CA3AF' }}>5 000 €</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={effectiveValue}
            initial={{ y: -4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 4, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="px-3.5 py-1.5 rounded-2xl text-sm font-black"
            style={{
              background: value > 0 && value < PRICE_MAX
                ? 'linear-gradient(135deg,#EFF6FF,#DBEAFE)'
                : '#F8FAFC',
              color: value > 0 && value < PRICE_MAX ? '#1D4ED8' : '#9CA3AF',
              border: `1.5px solid ${value > 0 && value < PRICE_MAX ? '#BFDBFE' : '#E5E7EB'}`,
              boxShadow: value > 0 && value < PRICE_MAX ? '0 2px 8px rgba(29,78,216,0.12)' : 'none',
            }}
          >
            {value > 0 && value < PRICE_MAX ? `≤ ${formatPrice(effectiveValue)}` : 'Sans limite'}
          </motion.div>
        </AnimatePresence>
        <span className="text-xs" style={{ color: '#9CA3AF' }}>60 000 €</span>
      </div>

      <div className="relative px-1 py-3">
        <div className="relative h-2 rounded-full" style={{ background: '#E5E7EB' }}>
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: value > 0 && value < PRICE_MAX
                ? 'linear-gradient(90deg,#1A3F6F,#3B82F6)'
                : '#E5E7EB',
            }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.1 }}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white"
            style={{
              left: `calc(${pct}% - 10px)`,
              background: value > 0 && value < PRICE_MAX ? '#1A3F6F' : '#D1D5DB',
              boxShadow: dragging
                ? '0 0 0 6px rgba(26,63,111,0.15), 0 4px 12px rgba(26,63,111,0.3)'
                : '0 2px 8px rgba(26,63,111,0.25)',
              cursor: 'grab',
            }}
            animate={{
              scale: dragging ? 1.2 : 1,
            }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={effectiveValue}
          onChange={e => onChange(Number(e.target.value))}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onTouchStart={() => setDragging(true)}
          onTouchEnd={() => setDragging(false)}
          className="absolute inset-0 w-full opacity-0 cursor-grab active:cursor-grabbing"
          style={{ height: '100%' }}
          aria-label="Budget maximum"
        />
      </div>

      <div className="flex justify-between px-1">
        {MILESTONES.map(m => {
          const mPct = ((m - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
          const isActive = effectiveValue >= m && value > 0 && value < PRICE_MAX;
          return (
            <button
              key={m}
              type="button"
              onClick={() => onChange(m === PRICE_MAX ? 0 : m)}
              className="flex flex-col items-center gap-0.5 group"
            >
              <div
                className="w-1 h-1 rounded-full transition-all duration-150 group-hover:scale-150"
                style={{ background: isActive ? '#1A3F6F' : '#D1D5DB' }}
              />
              <span
                className="text-[10px] transition-colors duration-150"
                style={{ color: isActive ? '#1A3F6F' : '#9CA3AF', fontWeight: isActive ? 600 : 400 }}
              >
                {m >= 1000 ? `${m / 1000}k` : m}
              </span>
            </button>
          );
        })}
      </div>

      {value > 0 && value < PRICE_MAX && (
        <motion.button
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          type="button"
          onClick={() => onChange(0)}
          className="text-xs font-medium transition-colors hover:opacity-70"
          style={{ color: '#EF4444' }}
        >
          Retirer la limite
        </motion.button>
      )}
    </div>
  );
}
