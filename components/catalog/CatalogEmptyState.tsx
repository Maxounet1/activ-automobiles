'use client';

import { Car, RotateCcw, PhoneCall, Expand } from 'lucide-react';

interface CatalogEmptyStateProps {
  onReset: () => void;
  onOpenCallback: () => void;
  onExpandBudget: () => void;
}

export default function CatalogEmptyState({
  onReset,
  onOpenCallback,
  onExpandBudget,
}: CatalogEmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center px-4">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: '#f3f4f6', border: '2px solid #e5e7eb' }}
      >
        <Car className="w-9 h-9" style={{ color: '#9ca3af' }} />
      </div>

      <h3 className="text-xl font-extrabold mb-2" style={{ color: '#111827' }}>
        Aucun résultat
      </h3>
      <p className="text-sm mb-8 max-w-sm" style={{ color: '#6b7280' }}>
        Aucun véhicule ne correspond à vos critères. Essayez de modifier vos filtres ou élargissez votre budget.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={onExpandBudget}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all"
          style={{ background: '#f3f4f6', color: '#374151', border: '1.5px solid #e5e7eb' }}
        >
          <Expand className="w-4 h-4" />
          Élargir le budget
        </button>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all"
          style={{ background: '#f3f4f6', color: '#374151', border: '1.5px solid #e5e7eb' }}
        >
          <RotateCcw className="w-4 h-4" />
          Retirer tous les filtres
        </button>

        <button
          type="button"
          onClick={onOpenCallback}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)' }}
        >
          <PhoneCall className="w-4 h-4" />
          Être rappelé
        </button>
      </div>

      <div
        className="mt-10 p-5 rounded-2xl w-full max-w-md text-left"
        style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
      >
        <p className="text-sm font-bold mb-1" style={{ color: '#111827' }}>
          On vous trouve le bon véhicule
        </p>
        <p className="text-xs mb-3" style={{ color: '#6b7280' }}>
          Dites-nous ce que vous cherchez, nos conseillers vous contactent sous 15 minutes.
        </p>
        <button
          type="button"
          onClick={onOpenCallback}
          className="w-full py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: '#f97316' }}
        >
          Être contacté par un conseiller
        </button>
      </div>
    </div>
  );
}
