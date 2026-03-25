'use client';

import { useState } from 'react';
import { Gauge } from 'lucide-react';

interface PremiumMileageSliderProps {
  value: number;
  onChange: (value: number) => void;
  light?: boolean;
}

export default function PremiumMileageSlider({ value, onChange, light = false }: PremiumMileageSliderProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const formatMileage = (km: number) => {
    return `${(km / 1000).toFixed(0)} 000 km`;
  };

  const percentage = (value / 200000) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4" style={{ color: '#10B981' }} />
          <label className="text-sm font-bold" style={{ color: light ? '#1A3F6F' : '#FFFFFF' }}>
            Kilométrage maximum
          </label>
        </div>
        <span className="text-lg font-black" style={{ color: '#10B981' }}>
          {formatMileage(value)}
        </span>
      </div>

      <div className="relative pt-2 pb-1">
        <div
          className="h-1.5 rounded-full relative"
          style={{ background: light ? 'rgba(26,63,111,0.12)' : 'rgba(255,255,255,0.18)' }}
        >
          <div
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${percentage}%`,
              background: light ? 'linear-gradient(90deg, #1A3F6F, #2558A0)' : 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, #FFFFFF 100%)',
              boxShadow: light ? '0 0 8px rgba(26,63,111,0.3)' : '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(16,185,129,0.25)',
            }}
          />
        </div>

        <input
          type="range"
          min="10000"
          max="200000"
          step="5000"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onTouchStart={() => setShowTooltip(true)}
          onTouchEnd={() => setShowTooltip(false)}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 10 }}
        />

        <div
          className="absolute top-0 w-5 h-5 rounded-full transition-all duration-200"
          style={{
            left: `calc(${percentage}% - 10px)`,
            background: light ? '#1A3F6F' : '#FFFFFF',
            border: light ? '3px solid rgba(26,63,111,0.3)' : '3px solid rgba(255,255,255,0.6)',
            boxShadow: light ? '0 2px 8px rgba(26,63,111,0.3)' : '0 2px 8px rgba(0,0,0,0.25), 0 0 12px rgba(255,255,255,0.4)',
            transform: showTooltip ? 'scale(1.25)' : 'scale(1)',
          }}
        />

        {showTooltip && (
          <div
            className="absolute -top-12 px-3 py-2 rounded-lg font-black text-sm whitespace-nowrap transition-all"
            style={{
              left: `calc(${percentage}% - 50px)`,
              background: '#0B1829',
              color: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(11,24,41,0.4)',
            }}
          >
            {formatMileage(value)}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45"
              style={{ background: '#0B1829' }}
            />
          </div>
        )}
      </div>

      <div className="flex justify-between text-xs font-semibold" style={{ color: light ? 'rgba(26,63,111,0.45)' : 'rgba(255,255,255,0.4)' }}>
        <span>10 000 km</span>
        <span>200 000 km</span>
      </div>
    </div>
  );
}
