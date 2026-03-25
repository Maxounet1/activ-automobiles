'use client';

import { useState } from 'react';
import { useFocusTrap } from '@/lib/hooks/useFocusTrap';
import { X, CreditCard } from 'lucide-react';
import type { Vehicle } from '@/lib/types';
import { track } from '@/lib/analytics';

const DURATIONS = [24, 36, 48, 60];
const RATE = 0.065;

function calcMonthly(price: number, apport: number, months: number) {
  const capital = price - apport;
  if (capital <= 0) return 0;
  const r = RATE / 12;
  const monthly = (capital * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return Math.round(monthly);
}

interface FinanceDrawerProps {
  open: boolean;
  vehicle: Vehicle | null;
  onClose: () => void;
}

export default function FinanceDrawer({ open, vehicle, onClose }: FinanceDrawerProps) {
  const focusTrapRef = useFocusTrap(open);
  const [duration, setDuration] = useState(48);
  const [apport, setApport] = useState(0);

  const price = vehicle?.price ?? 0;
  const monthly = calcMonthly(price, apport, duration);
  const totalCost = monthly * duration + apport;

  return (
    <>
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.45)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={focusTrapRef}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white flex flex-col transition-transform duration-300"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: '-8px 0 48px rgba(0,0,0,0.12)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Simuler un financement</h2>
              {vehicle && (
                <p className="text-xs" style={{ color: '#bae6fd' }}>
                  {vehicle.brand} {vehicle.model} — {vehicle.price.toLocaleString('fr-FR')} €
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* Duration */}
          <div>
            <label className="block text-xs font-bold mb-3" style={{ color: '#374151' }}>
              Durée de financement
            </label>
            <div className="grid grid-cols-4 gap-2">
              {DURATIONS.map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => { setDuration(d); track('view_financing', { duration: d }); }}
                  className="py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: duration === d ? '#0284c7' : '#f3f4f6',
                    color: duration === d ? '#fff' : '#374151',
                    border: `1.5px solid ${duration === d ? '#0284c7' : '#e5e7eb'}`,
                  }}
                >
                  {d} mois
                </button>
              ))}
            </div>
          </div>

          {/* Apport */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-bold" style={{ color: '#374151' }}>Apport personnel</label>
              <span className="text-sm font-bold" style={{ color: '#0284c7' }}>
                {apport.toLocaleString('fr-FR')} €
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={Math.round(price * 0.5)}
              step={500}
              value={apport}
              onChange={e => setApport(Number(e.target.value))}
              className="w-full accent-[#0284c7]"
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: '#9ca3af' }}>
              <span>0 €</span>
              <span>{Math.round(price * 0.5).toLocaleString('fr-FR')} €</span>
            </div>
          </div>

          {/* Result */}
          <div
            className="rounded-2xl p-5 text-center"
            style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }}
          >
            <p className="text-xs font-medium mb-1" style={{ color: '#bae6fd' }}>
              Mensualité estimée
            </p>
            <p className="text-4xl font-black text-white mb-1">
              {monthly > 0 ? `${monthly} €` : '—'}
              <span className="text-lg font-medium">/mois</span>
            </p>
            <p className="text-xs" style={{ color: '#bae6fd' }}>
              Sur {duration} mois · Taux indicatif {(RATE * 100).toFixed(1)}%
            </p>
            {monthly > 0 && (
              <p className="text-xs mt-2" style={{ color: '#e0f2fe' }}>
                Coût total : {totalCost.toLocaleString('fr-FR')} €
              </p>
            )}
          </div>

          <p className="text-[11px] text-center" style={{ color: '#9ca3af' }}>
            Simulation indicative non contractuelle. Sous réserve d&apos;acceptation du dossier.
          </p>

          <button
            type="button"
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
            style={{ background: '#0284c7' }}
          >
            <CreditCard className="w-4 h-4" />
            Demander un financement
          </button>
        </div>
      </div>
    </>
  );
}
