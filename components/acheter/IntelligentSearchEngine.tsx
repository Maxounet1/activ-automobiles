'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Sparkles, SlidersHorizontal, Search } from 'lucide-react';
import PremiumBudgetSlider from './PremiumBudgetSlider';
import PremiumMileageSlider from './PremiumMileageSlider';
import EnergyChips from './EnergyChips';
import AdvancedSearchDrawer from './AdvancedSearchDrawer';

interface SearchFilters {
  maxBudget: number;
  maxMileage: number;
  fuel: string;
  brand: string;
  model: string;
  yearMin: number;
  yearMax: number;
  transmission: string;
  category: string;
  minPower: number;
}

interface VehicleSearchable {
  brand: string;
  model: string;
  category: string;
}

interface IntelligentSearchEngineProps {
  onSearch: (filters: SearchFilters) => void;
  vehiclesCount: number;
  allVehicles: VehicleSearchable[];
}

export default function IntelligentSearchEngine({
  onSearch,
  vehiclesCount,
  allVehicles
}: IntelligentSearchEngineProps) {
  const [maxBudget, setMaxBudget] = useState(80000);
  const [maxMileage, setMaxMileage] = useState(200000);
  const [selectedFuel, setSelectedFuel] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    brand: '',
    model: '',
    yearMin: 2015,
    yearMax: 2024,
    transmission: '',
    category: '',
    minPower: 0,
  });
  const [prevCount, setPrevCount] = useState(vehiclesCount);
  const [isBumping, setIsBumping] = useState(false);
  const bumpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (vehiclesCount !== prevCount) {
      setPrevCount(vehiclesCount);
      setIsBumping(true);
      if (bumpTimer.current) clearTimeout(bumpTimer.current);
      bumpTimer.current = setTimeout(() => setIsBumping(false), 300);
    }
  }, [vehiclesCount, prevCount]);

  useEffect(() => {
    onSearch({
      maxBudget,
      maxMileage,
      fuel: selectedFuel,
      ...advancedFilters,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxBudget, maxMileage, selectedFuel, advancedFilters]);

  const handleApplyAdvanced = (filters: { brand: string; model: string; yearMin: number; yearMax: number; transmission: string; category: string; minPower: number }) => {
    setAdvancedFilters(filters);
    setShowAdvanced(false);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (advancedFilters.brand) count++;
    if (advancedFilters.model) count++;
    if (advancedFilters.transmission) count++;
    if (advancedFilters.category) count++;
    if (advancedFilters.minPower > 0) count++;
    if (advancedFilters.yearMin > 2015 || advancedFilters.yearMax < 2024) count++;
    return count;
  }, [advancedFilters]);

  return (
    <>
      <div className="relative z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-5 sm:p-7 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2548 100%)',
              boxShadow: '0 24px 64px rgba(11,24,41,0.55), 0 8px 32px rgba(26,63,111,0.25)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 50% at 15% 40%, rgba(26,63,111,0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 85% 20%, rgba(16,185,129,0.07) 0%, transparent 55%)',
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)' }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: '#10B981' }} />
                </div>
                <div>
                  <p className="eyebrow mb-0" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px' }}>Recherche véhicules</p>
                  <h2 className="text-xl font-black heading-section leading-tight" style={{ color: '#FFFFFF' }}>
                    Trouvez votre véhicule idéal
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <PremiumBudgetSlider value={maxBudget} onChange={setMaxBudget} />
                <PremiumMileageSlider value={maxMileage} onChange={setMaxMileage} />
              </div>

              <div className="mb-4">
                <EnergyChips selected={selectedFuel} onSelect={setSelectedFuel} />
              </div>

              <div className="flex justify-center gap-3 flex-wrap sm:flex-nowrap">
                <button
                  className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    color: '#FFFFFF',
                    boxShadow: isBumping
                      ? '0 8px 32px rgba(5,150,105,0.55), 0 0 0 3px rgba(16,185,129,0.25)'
                      : '0 4px 20px rgba(5,150,105,0.35)',
                    transform: isBumping ? 'scale(1.03)' : 'scale(1)',
                    transition: 'transform 200ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms ease',
                    minWidth: '180px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isBumping) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 28px rgba(5,150,105,0.45)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isBumping) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,150,105,0.35)';
                    }
                  }}
                >
                  <Search className="w-4 h-4 flex-shrink-0" />
                  <span>Voir les véhicules</span>
                  <span
                    className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-black"
                    style={{ background: 'rgba(255,255,255,0.2)', minWidth: '28px' }}
                  >
                    {vehiclesCount}
                  </span>
                </button>

                <button
                  onClick={() => setShowAdvanced(true)}
                  className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm relative"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1.5px solid rgba(255,255,255,0.14)',
                    color: 'rgba(255,255,255,0.88)',
                    backdropFilter: 'blur(8px)',
                    transition: 'transform 200ms ease, box-shadow 200ms ease, background 200ms ease, border-color 200ms ease',
                    minWidth: '180px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,255,255,0.07)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.88)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtres avancés
                  {activeFiltersCount > 0 && (
                    <span
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
                      style={{ background: '#10B981', color: '#FFFFFF', boxShadow: '0 2px 8px rgba(16,185,129,0.4)' }}
                    >
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdvancedSearchDrawer
        isOpen={showAdvanced}
        onClose={() => setShowAdvanced(false)}
        onApply={handleApplyAdvanced}
        initialFilters={advancedFilters}
        allVehicles={allVehicles}
        resultsCount={vehiclesCount}
      />
    </>
  );
}
