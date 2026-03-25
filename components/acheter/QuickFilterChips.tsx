'use client';

import { Car, Zap, Euro, Gauge, Sparkles, Flame, Heart, CreditCard } from 'lucide-react';

interface QuickFilter {
  id: string;
  label: string;
  icon: React.ElementType;
  filter: {
    category?: string;
    transmission?: string;
    maxBudget?: number;
    maxMileage?: number;
    fuel?: string;
    featured?: boolean;
    discount?: boolean;
    mensualiteMax?: number;
  };
}

const ROW_ONE: QuickFilter[] = [
  { id: 'suv',        label: 'SUV',           icon: Car,        filter: { category: 'suv' } },
  { id: 'auto',       label: 'Automatique',   icon: Zap,        filter: { transmission: 'automatique' } },
  { id: 'budget30k',  label: '< 30 000 €',    icon: Euro,       filter: { maxBudget: 30000 } },
  { id: 'km20k',      label: '< 20 000 km',   icon: Gauge,      filter: { maxMileage: 20000 } },
  { id: 'budget10k',  label: '< 10 000 €',    icon: Euro,       filter: { maxBudget: 10000 } },
  { id: 'km100',      label: '< 100 km',      icon: Gauge,      filter: { maxMileage: 100 } },
  { id: 'mensualite', label: '< 299 € / mois',icon: CreditCard, filter: { mensualiteMax: 299 } },
];

const ROW_TWO: QuickFilter[] = [
  { id: 'new',         label: 'Nouveautés',   icon: Sparkles, filter: { featured: true } },
  { id: 'coupdecoeur', label: 'Coup de cœur', icon: Heart,    filter: { featured: true } },
  { id: 'flash',       label: 'Ventes Flash', icon: Flame,    filter: { discount: true } },
];

interface QuickFilterChipsProps {
  onFilterClick: (filter: QuickFilter['filter']) => void;
}

export default function QuickFilterChips({ onFilterClick }: QuickFilterChipsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-5">
        <span
          className="text-[10px] font-bold tracking-[0.2em] uppercase"
          style={{ color: '#1A3F6F' }}
        >
          Recherches rapides
        </span>
        <div className="h-px flex-1" style={{ background: '#E2E8F0' }} />
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 mb-4">
        {ROW_ONE.map((item) => (
          <StandardChip key={item.id} item={item} onFilterClick={onFilterClick} />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {ROW_TWO.map((item) => {
          if (item.id === 'new') return <NouveautesChip key={item.id} item={item} onFilterClick={onFilterClick} />;
          if (item.id === 'coupdecoeur') return <CoupDeCoeurChip key={item.id} item={item} onFilterClick={onFilterClick} />;
          return <VentesFlashChip key={item.id} item={item} onFilterClick={onFilterClick} />;
        })}
      </div>
    </div>
  );
}

function StandardChip({ item, onFilterClick }: { item: QuickFilter; onFilterClick: (f: QuickFilter['filter']) => void }) {
  const Icon = item.icon;
  const isMensualite = item.id === 'mensualite';

  return (
    <button
      onClick={() => onFilterClick(item.filter)}
      className="group flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
      style={{
        background: isMensualite ? 'linear-gradient(135deg, #0F2240 0%, #1A3F6F 100%)' : '#FFFFFF',
        color: isMensualite ? '#FFFFFF' : '#1A3F6F',
        border: isMensualite ? 'none' : '1.5px solid #E2E8F0',
        boxShadow: isMensualite ? '0 2px 12px rgba(15,34,64,0.22)' : '0 1px 4px rgba(11,24,41,0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        if (isMensualite) {
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(15,34,64,0.35)';
        } else {
          e.currentTarget.style.borderColor = '#1A3F6F';
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(26,63,111,0.12)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        if (isMensualite) {
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(15,34,64,0.22)';
        } else {
          e.currentTarget.style.borderColor = '#E2E8F0';
          e.currentTarget.style.boxShadow = '0 1px 4px rgba(11,24,41,0.06)';
        }
      }}
    >
      <Icon className="w-3.5 h-3.5" />
      {item.label}
    </button>
  );
}

function NouveautesChip({ item, onFilterClick }: { item: QuickFilter; onFilterClick: (f: QuickFilter['filter']) => void }) {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onFilterClick(item.filter)}
      className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all duration-250"
      style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
        color: '#FFFFFF',
        border: 'none',
        boxShadow: '0 4px 18px rgba(17,24,39,0.30), 0 1px 4px rgba(0,0,0,0.1)',
        transition: 'transform 220ms ease, box-shadow 220ms ease, filter 220ms ease',
        minWidth: 160,
        justifyContent: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(17,24,39,0.42), 0 2px 8px rgba(0,0,0,0.15)';
        e.currentTarget.style.filter = 'brightness(1.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 18px rgba(17,24,39,0.30), 0 1px 4px rgba(0,0,0,0.1)';
        e.currentTarget.style.filter = 'brightness(1)';
      }}
    >
      <Icon className="w-4 h-4" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.25))' }} />
      {item.label}
    </button>
  );
}

function CoupDeCoeurChip({ item, onFilterClick }: { item: QuickFilter; onFilterClick: (f: QuickFilter['filter']) => void }) {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onFilterClick(item.filter)}
      className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all duration-250"
      style={{
        background: 'linear-gradient(135deg, #9D1545 0%, #C2185B 45%, #D4618A 100%)',
        color: '#FFFFFF',
        border: 'none',
        boxShadow: '0 4px 18px rgba(157,21,69,0.28), 0 1px 4px rgba(0,0,0,0.1)',
        transition: 'transform 220ms ease, box-shadow 220ms ease, filter 220ms ease',
        minWidth: 160,
        justifyContent: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(157,21,69,0.40), 0 2px 8px rgba(0,0,0,0.12)';
        e.currentTarget.style.filter = 'brightness(1.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 18px rgba(157,21,69,0.28), 0 1px 4px rgba(0,0,0,0.1)';
        e.currentTarget.style.filter = 'brightness(1)';
      }}
    >
      <Icon className="w-4 h-4" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.35))' }} />
      {item.label}
    </button>
  );
}

function VentesFlashChip({ item, onFilterClick }: { item: QuickFilter; onFilterClick: (f: QuickFilter['filter']) => void }) {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onFilterClick(item.filter)}
      className="relative flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #7F1D1D 0%, #C2410C 40%, #D97706 100%)',
        color: '#FFFFFF',
        border: 'none',
        boxShadow: '0 4px 18px rgba(194,65,12,0.30), 0 1px 4px rgba(0,0,0,0.1)',
        transition: 'transform 220ms ease, box-shadow 220ms ease, filter 220ms ease',
        minWidth: 160,
        justifyContent: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
        e.currentTarget.style.boxShadow = '0 10px 32px rgba(194,65,12,0.42), 0 2px 10px rgba(217,119,6,0.25)';
        e.currentTarget.style.filter = 'brightness(1.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 18px rgba(194,65,12,0.30), 0 1px 4px rgba(0,0,0,0.1)';
        e.currentTarget.style.filter = 'brightness(1)';
      }}
    >
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
        }}
      />
      <Icon className="w-4 h-4 relative z-10" style={{ filter: 'drop-shadow(0 0 5px rgba(255,200,100,0.5))' }} />
      <span className="relative z-10">{item.label}</span>
    </button>
  );
}
