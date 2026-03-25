'use client';

import { useState, useEffect, useMemo } from 'react';
import { useFocusTrap } from '@/lib/hooks/useFocusTrap';
import { X, RotateCcw, Check } from 'lucide-react';

interface AdvancedFilters {
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

interface AdvancedSearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: AdvancedFilters) => void;
  initialFilters: AdvancedFilters;
  allVehicles: VehicleSearchable[];
  resultsCount: number;
}

export default function AdvancedSearchDrawer({
  isOpen,
  onClose,
  onApply,
  initialFilters,
  allVehicles,
  resultsCount,
}: AdvancedSearchDrawerProps) {
  const focusTrapRef = useFocusTrap(isOpen);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    if (isOpen) {
      setFilters(initialFilters);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialFilters]);

  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(allVehicles.map(v => v.brand))).sort();
    return uniqueBrands;
  }, [allVehicles]);

  const models = useMemo(() => {
    if (!filters.brand) return [];
    const brandVehicles = allVehicles.filter(v => v.brand === filters.brand);
    return Array.from(new Set(brandVehicles.map(v => v.model))).sort();
  }, [allVehicles, filters.brand]);

  const categories = ['suv', 'berline', 'compacte', 'citadine', 'monospace', 'sportive'];
  const transmissions = ['manuelle', 'automatique'];

  const handleReset = () => {
    const resetFilters = {
      brand: '',
      model: '',
      yearMin: 2015,
      yearMax: 2024,
      transmission: '',
      category: '',
      minPower: 0,
    };
    setFilters(resetFilters);
  };

  const handleApply = () => {
    onApply(filters);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.brand) count++;
    if (filters.model) count++;
    if (filters.transmission) count++;
    if (filters.category) count++;
    if (filters.minPower > 0) count++;
    if (filters.yearMin > 2015 || filters.yearMax < 2024) count++;
    return count;
  }, [filters]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={focusTrapRef}
          className="w-full max-w-lg rounded-2xl flex flex-col"
          style={{
            background: '#FFFFFF',
            boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
            maxHeight: '85vh',
          }}
        >
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid #E2E8F0' }}
          >
            <div>
              <h2 className="text-base font-black heading-section" style={{ color: '#0B1829' }}>
                Recherche avancée
              </h2>
              {activeFiltersCount > 0 && (
                <p className="text-xs font-semibold mt-0.5" style={{ color: '#10B981' }}>
                  {activeFiltersCount} filtre{activeFiltersCount > 1 ? 's' : ''} actif{activeFiltersCount > 1 ? 's' : ''}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E2E8F0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F1F5F9';
              }}
            >
              <X className="w-4 h-4" style={{ color: '#0B1829' }} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold mb-1.5 block" style={{ color: '#0B1829' }}>Marque</label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters({ ...filters, brand: e.target.value, model: '' })}
                  className="w-full px-3 py-2 rounded-lg text-sm font-semibold transition-all outline-none"
                  style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#111111' }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#1A3F6F'; e.currentTarget.style.background = '#FFFFFF'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; }}
                >
                  <option value="">Toutes</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold mb-1.5 block" style={{ color: '#0B1829' }}>Modèle</label>
                <select
                  value={filters.model}
                  onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                  disabled={!filters.brand}
                  className="w-full px-3 py-2 rounded-lg text-sm font-semibold transition-all outline-none"
                  style={{
                    background: filters.brand ? '#F9FAFB' : '#F3F4F6',
                    border: '1.5px solid #E2E8F0',
                    color: filters.brand ? '#111111' : '#9CA3AF',
                    cursor: filters.brand ? 'pointer' : 'not-allowed',
                  }}
                  onFocus={(e) => { if (filters.brand) { e.currentTarget.style.borderColor = '#1A3F6F'; e.currentTarget.style.background = '#FFFFFF'; } }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = filters.brand ? '#F9FAFB' : '#F3F4F6'; }}
                >
                  <option value="">Tous</option>
                  {models.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold mb-1.5 block" style={{ color: '#0B1829' }}>Année</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold mb-1 block" style={{ color: '#64748B' }}>De</label>
                  <input
                    type="number" min="2010" max={filters.yearMax} value={filters.yearMin}
                    onChange={(e) => setFilters({ ...filters, yearMin: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg text-sm font-semibold transition-all outline-none"
                    style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#111111' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#1A3F6F'; e.currentTarget.style.background = '#FFFFFF'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block" style={{ color: '#64748B' }}>À</label>
                  <input
                    type="number" min={filters.yearMin} max="2024" value={filters.yearMax}
                    onChange={(e) => setFilters({ ...filters, yearMax: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg text-sm font-semibold transition-all outline-none"
                    style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#111111' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#1A3F6F'; e.currentTarget.style.background = '#FFFFFF'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold mb-1.5 block" style={{ color: '#0B1829' }}>Transmission</label>
              <div className="grid grid-cols-2 gap-2">
                {transmissions.map(transmission => {
                  const isSelected = filters.transmission === transmission;
                  return (
                    <button
                      key={transmission}
                      onClick={() => setFilters({ ...filters, transmission: isSelected ? '' : transmission })}
                      className="px-3 py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-between"
                      style={{
                        background: isSelected ? '#1A3F6F' : '#F8FAFC',
                        border: `1.5px solid ${isSelected ? '#1A3F6F' : '#E2E8F0'}`,
                        color: isSelected ? '#FFFFFF' : '#111111',
                      }}
                      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.borderColor = '#1A3F6F'; }}
                      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.borderColor = '#E2E8F0'; }}
                    >
                      <span className="capitalize">{transmission}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold mb-1.5 block" style={{ color: '#0B1829' }}>Catégorie</label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map(category => {
                  const isSelected = filters.category === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setFilters({ ...filters, category: isSelected ? '' : category })}
                      className="px-3 py-2 rounded-lg font-bold text-xs transition-all uppercase flex items-center justify-between"
                      style={{
                        background: isSelected ? '#1A3F6F' : '#F8FAFC',
                        border: `1.5px solid ${isSelected ? '#1A3F6F' : '#E2E8F0'}`,
                        color: isSelected ? '#FFFFFF' : '#111111',
                      }}
                      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.borderColor = '#1A3F6F'; }}
                      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.borderColor = '#E2E8F0'; }}
                    >
                      <span>{category}</span>
                      {isSelected && <Check className="w-3 h-3 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold mb-1.5 block" style={{ color: '#0B1829' }}>Puissance minimale</label>
              <input
                type="number" min="0" max="500" step="10" value={filters.minPower}
                onChange={(e) => setFilters({ ...filters, minPower: Number(e.target.value) })}
                placeholder="Ex: 150 ch"
                className="w-full px-3 py-2 rounded-lg text-sm font-semibold transition-all outline-none"
                style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#111111' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#1A3F6F'; e.currentTarget.style.background = '#FFFFFF'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; }}
              />
            </div>
          </div>

          <div
            className="px-5 py-4 flex gap-2"
            style={{ borderTop: '1px solid #E2E8F0' }}
          >
            {activeFiltersCount > 0 && (
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-150 flex items-center gap-2"
                style={{ background: '#F1F5F9', color: '#64748B', border: '1.5px solid #E2E8F0' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#E2E8F0'; e.currentTarget.style.color = '#0B1829'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#64748B'; }}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Réinitialiser
              </button>
            )}
            <button
              onClick={handleApply}
              className="flex-1 px-5 py-2.5 rounded-xl font-black text-sm transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: '#FFFFFF',
                boxShadow: '0 4px 20px rgba(5,150,105,0.35)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(5,150,105,0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(5,150,105,0.35)'; }}
            >
              Voir {resultsCount} résultat{resultsCount !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
