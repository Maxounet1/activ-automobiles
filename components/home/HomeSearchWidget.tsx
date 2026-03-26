'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import PremiumBudgetSlider from '@/components/acheter/PremiumBudgetSlider';
import PremiumMileageSlider from '@/components/acheter/PremiumMileageSlider';
import EnergyChips from '@/components/acheter/EnergyChips';
import AdvancedSearchDrawer from '@/components/acheter/AdvancedSearchDrawer';
// TEMPORARILY DISABLED - AI Feature - Will be re-enabled when connected
// import GuidedAssistant from '@/components/home/GuidedAssistant';
import type { Vehicle } from '@/lib/types';

const DEFAULT_ADVANCED = {
  brand: '',
  model: '',
  yearMin: 2015,
  yearMax: new Date().getFullYear() + 1,
  transmission: '',
  category: '',
  minPower: 0,
};

interface HomeSearchWidgetProps {
  vehicles?: Vehicle[];
}

export default function HomeSearchWidget({ vehicles = [] }: HomeSearchWidgetProps) {
  const router = useRouter();
  const [maxBudget, setMaxBudget] = useState(130000);
  const [maxMileage, setMaxMileage] = useState(200000);
  const [selectedFuel, setSelectedFuel] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  // TEMPORARILY DISABLED - AI Feature
  // const [showAssistant, setShowAssistant] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(DEFAULT_ADVANCED);

  const vehiclesCount = useMemo(() => {
    return (vehicles as any[]).filter((vehicle) => {
      if (vehicle.price > maxBudget) return false;
      if (vehicle.mileage > maxMileage) return false;
      if (selectedFuel && vehicle.fuel !== selectedFuel) return false;
      if (advancedFilters.brand && vehicle.brand !== advancedFilters.brand) return false;
      if (advancedFilters.model && vehicle.model !== advancedFilters.model) return false;
      if (advancedFilters.transmission && vehicle.transmission !== advancedFilters.transmission) return false;
      if (advancedFilters.category && vehicle.category !== advancedFilters.category) return false;
      if (advancedFilters.minPower > 0 && vehicle.power < advancedFilters.minPower) return false;
      if (vehicle.year < advancedFilters.yearMin || vehicle.year > advancedFilters.yearMax) return false;
      return true;
    }).length;
  }, [maxBudget, maxMileage, selectedFuel, advancedFilters]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (advancedFilters.brand) count++;
    if (advancedFilters.model) count++;
    if (advancedFilters.transmission) count++;
    if (advancedFilters.category) count++;
    if (advancedFilters.minPower > 0) count++;
    if (advancedFilters.yearMin > 2015 || advancedFilters.yearMax < new Date().getFullYear() + 1) count++;
    return count;
  }, [advancedFilters]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (maxBudget < 130000) params.set('budget', String(maxBudget));
    if (maxMileage < 200000) params.set('km', String(maxMileage));
    if (selectedFuel) params.set('fuel', selectedFuel);
    if (advancedFilters.brand) params.set('brand', advancedFilters.brand);
    if (advancedFilters.model) params.set('model', advancedFilters.model);
    if (advancedFilters.transmission) params.set('transmission', advancedFilters.transmission);
    if (advancedFilters.category) params.set('category', advancedFilters.category);
    if (advancedFilters.minPower > 0) params.set('power', String(advancedFilters.minPower));
    if (advancedFilters.yearMin > 2015) params.set('yearMin', String(advancedFilters.yearMin));
    if (advancedFilters.yearMax < new Date().getFullYear() + 1) params.set('yearMax', String(advancedFilters.yearMax));

    const qs = params.toString();
    router.push(qs ? `/voitures-occasion?${qs}` : '/voitures-occasion');
  };

  return (
    <>
      <section
        className="py-16 lg:py-20"
        style={{ background: '#F5F4F2' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-10">
              <p
                className="text-xs font-semibold tracking-[0.22em] uppercase mb-3"
                style={{ color: '#1A3F6F' }}
              >
                Stock en temps réel
              </p>
              <h2
                className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3"
                style={{ color: '#111111' }}
              >
                Trouvez votre véhicule maintenant
              </h2>
              <p className="text-base text-gray-500 max-w-xl mx-auto">
                Accédez directement à notre stock disponible — filtrez par budget, kilométrage et énergie.
              </p>
            </div>

            <div
              className="rounded-2xl p-5 sm:p-7 relative overflow-hidden"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 4px 24px rgba(26,63,111,0.09), 0 1px 4px rgba(26,63,111,0.05)',
                border: '1px solid rgba(26,63,111,0.10)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(26,63,111,0.045) 1px, transparent 0)',
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                  <PremiumBudgetSlider value={maxBudget} onChange={setMaxBudget} light />
                  <PremiumMileageSlider value={maxMileage} onChange={setMaxMileage} light />
                </div>

                <div className="mb-5">
                  <EnergyChips selected={selectedFuel} onSelect={setSelectedFuel} light />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSearch}
                    className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-sm w-full sm:flex-1"
                    style={{
                      background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2548 100%)',
                      color: '#FFFFFF',
                      boxShadow: '0 4px 20px rgba(26,63,111,0.30)',
                      transition: 'transform 200ms ease, box-shadow 200ms ease',
                      minHeight: 52,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 28px rgba(26,63,111,0.40)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(26,63,111,0.30)';
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
                    className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-sm relative w-full sm:flex-1"
                    style={{
                      background: 'rgba(26,63,111,0.06)',
                      border: '1.5px solid rgba(26,63,111,0.18)',
                      color: '#1A3F6F',
                      transition: 'transform 200ms ease, box-shadow 200ms ease, background 200ms ease, border-color 200ms ease',
                      minHeight: 52,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.background = 'rgba(26,63,111,0.10)';
                      e.currentTarget.style.borderColor = 'rgba(26,63,111,0.30)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,63,111,0.10)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(26,63,111,0.06)';
                      e.currentTarget.style.borderColor = 'rgba(26,63,111,0.18)';
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

          {/* TEMPORARILY DISABLED - AI Feature - Assistant guidé
          <div className="flex justify-center mt-5">
            <button
              onClick={() => setShowAssistant(true)}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 px-4 py-3 rounded-xl"
              style={{ color: '#1A3F6F', background: 'rgba(26,63,111,0.06)', border: '1px solid rgba(26,63,111,0.12)', cursor: 'pointer', minHeight: 44 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(26,63,111,0.10)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(26,63,111,0.06)';
              }}
            >
              Besoin d&apos;aide pour choisir ?
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          */}

        </div>
      </section>

      {/* TEMPORARILY DISABLED - AI Feature
      <GuidedAssistant isOpen={showAssistant} onClose={() => setShowAssistant(false)} vehicles={vehicles} />
      */}

      <AdvancedSearchDrawer
        isOpen={showAdvanced}
        onClose={() => setShowAdvanced(false)}
        onApply={(filters) => {
          setAdvancedFilters(filters);
          setShowAdvanced(false);
        }}
        initialFilters={advancedFilters}
        allVehicles={vehicles as any[]}
        resultsCount={vehiclesCount}
      />
    </>
  );
}
