'use client';

import { CalendarCheck, Calculator } from 'lucide-react';

interface StickyMobileCTAProps {
  price: number;
  monthlyPrice: number;
  onReserve?: () => void;
}

export default function StickyMobileCTA({ price, monthlyPrice, onReserve }: StickyMobileCTAProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.10)',
      }}
    >
      <div className="px-4 py-3">
        {/* Mensualité dominante */}
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: '#94A3B8' }}>Financement dès</p>
            <p className="text-2xl font-black leading-tight" style={{ color: '#1A3F6F' }}>{monthlyPrice} €<span className="text-sm font-bold" style={{ color: '#64748B' }}>/mois</span></p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: '#94A3B8' }}>Prix total</p>
            <p className="text-base font-black" style={{ color: '#0B1829' }}>{price.toLocaleString('fr-FR')} €</p>
          </div>
        </div>

        {/* 2 CTAs hiérarchisés */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onReserve}
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white"
            style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #2563EB 100%)', boxShadow: '0 4px 16px rgba(26,63,111,0.25)' }}
          >
            <CalendarCheck className="w-4 h-4" />
            Je réserve
          </button>

          <button
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
            style={{ background: '#EEF4FB', border: '1.5px solid rgba(26,63,111,0.18)', color: '#1A3F6F' }}
          >
            <Calculator className="w-4 h-4" />
            Financer
          </button>
        </div>
      </div>
    </div>
  );
}
