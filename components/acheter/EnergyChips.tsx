'use client';

import { Zap, Fuel, Leaf, Battery } from 'lucide-react';

interface EnergyChipsProps {
  selected: string;
  onSelect: (fuel: string) => void;
  light?: boolean;
}

const FUEL_OPTIONS = [
  { value: 'essence', label: 'Essence', icon: Fuel, color: '#F59E0B' },
  { value: 'diesel', label: 'Diesel', icon: Zap, color: '#3B82F6' },
  { value: 'hybride', label: 'Hybride', icon: Leaf, color: '#10B981' },
  { value: 'electrique', label: 'Électrique', icon: Battery, color: '#2563EB' },
];

export default function EnergyChips({ selected, onSelect, light = false }: EnergyChipsProps) {
  return (
    <div>
      <label className="text-sm font-bold mb-3 block" style={{ color: light ? '#1A3F6F' : '#FFFFFF' }}>
        Type de carburant
      </label>
      <div className="flex flex-wrap gap-3">
        {FUEL_OPTIONS.map(({ value, label, icon: Icon, color }) => {
          const isSelected = selected === value;

          return (
            <button
              key={value}
              onClick={() => onSelect(isSelected ? '' : value)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all"
              style={{
                background: isSelected ? color : light ? 'rgba(26,63,111,0.05)' : 'rgba(255,255,255,0.1)',
                border: `2px solid ${isSelected ? color : light ? 'rgba(26,63,111,0.15)' : 'rgba(255,255,255,0.15)'}`,
                color: isSelected ? '#FFFFFF' : light ? '#1A3F6F' : 'rgba(255,255,255,0.9)',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isSelected ? `0 4px 16px ${color}40` : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = light ? 'rgba(26,63,111,0.10)' : 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.borderColor = light ? 'rgba(26,63,111,0.25)' : 'rgba(255,255,255,0.25)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = light ? 'rgba(26,63,111,0.05)' : 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = light ? 'rgba(26,63,111,0.15)' : 'rgba(255,255,255,0.15)';
                }
              }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
