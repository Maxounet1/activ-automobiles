'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KM_MIN = 0;
const KM_MAX = 200000;
const KM_STEP = 5000;
const KM_UNLIMITED = 999999;

const MILESTONES = [30000, 60000, 100000, 150000, 200000];

interface MileageSliderProps {
  value: number;
  onChange: (val: number) => void;
}

function formatKm(val: number): string {
  if (val >= KM_MAX) return 'Sans limite';
  return `${val.toLocaleString('fr-FR')} km`;
}

export default function MileageSlider({ value, onChange }: MileageSliderProps) {
  const [dragging, setDragging] = useState(false);
  const effectiveValue = value > 0 && value < KM_UNLIMITED ? value : KM_MAX;
  const pct = ((effectiveValue - KM_MIN) / (KM_MAX - KM_MIN)) * 100;
  const isActive = value > 0 && value < KM_UNLIMITED;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: '#9CA3AF' }}>0 km</span>
        <AnimatePresence mode="wait">
          <motion.div
            key={effectiveValue}
            initial={{ y: -4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 4, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="px-3.5 py-1.5 rounded-2xl text-sm font-black"
            style={{
              background: isActive ? 'linear-gradient(135deg,#F0FDF4,#DCFCE7)' : '#F8FAFC',
              color: isActive ? '#16A34A' : '#9CA3AF',
              border: `1.5px solid ${isActive ? '#BBF7D0' : '#E5E7EB'}`,
              boxShadow: isActive ? '0 2px 8px rgba(22,163,74,0.12)' : 'none',
            }}
          >
            {isActive ? `≤ ${formatKm(effectiveValue)}` : 'Sans limite'}
          </motion.div>
        </AnimatePresence>
        <span className="text-xs" style={{ color: '#9CA3AF' }}>200 000 km</span>
      </div>

      <div className="relative px-1 py-3">
        <div className="relative h-2 rounded-full" style={{ background: '#E5E7EB' }}>
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: isActive ? 'linear-gradient(90deg,#16A34A,#22C55E)' : '#E5E7EB',
            }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.1 }}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white"
            style={{
              left: `calc(${pct}% - 10px)`,
              background: isActive ? '#16A34A' : '#D1D5DB',
              boxShadow: dragging
                ? '0 0 0 6px rgba(22,163,74,0.15), 0 4px 12px rgba(22,163,74,0.3)'
                : '0 2px 8px rgba(22,163,74,0.25)',
              cursor: 'grab',
            }}
            animate={{ scale: dragging ? 1.2 : 1 }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <input
          type="range"
          min={KM_MIN}
          max={KM_MAX}
          step={KM_STEP}
          value={effectiveValue}
          onChange={e => {
            const v = Number(e.target.value);
            onChange(v >= KM_MAX ? KM_UNLIMITED : v);
          }}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onTouchStart={() => setDragging(true)}
          onTouchEnd={() => setDragging(false)}
          className="absolute inset-0 w-full opacity-0 cursor-grab active:cursor-grabbing"
          style={{ height: '100%' }}
          aria-label="Kilométrage maximum"
        />
      </div>

      <div className="flex justify-between px-1">
        {MILESTONES.map(m => {
          const mPct = ((m - KM_MIN) / (KM_MAX - KM_MIN)) * 100;
          const isMarked = isActive && effectiveValue >= m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => onChange(m)}
              className="flex flex-col items-center gap-0.5 group"
            >
              <div
                className="w-1 h-1 rounded-full transition-all duration-150 group-hover:scale-150"
                style={{ background: isMarked ? '#16A34A' : '#D1D5DB' }}
              />
              <span
                className="text-[10px] transition-colors duration-150"
                style={{ color: isMarked ? '#16A34A' : '#9CA3AF', fontWeight: isMarked ? 600 : 400 }}
              >
                {m >= 1000 ? `${m / 1000}k` : m}
              </span>
            </button>
          );
        })}
      </div>

      {isActive && (
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
