'use client';

import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function VehicleDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-brand-canvas pt-24">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-red-50">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h1 className="text-2xl font-black text-brand-dark">
        Impossible de charger ce véhicule
      </h1>
      <p className="text-sm text-center max-w-xs text-brand-steel">
        Une erreur est survenue lors du chargement de la fiche véhicule.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-brand"
        >
          <RefreshCw className="w-4 h-4" />
          Réessayer
        </button>
        <Link
          href="/voitures-occasion"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-brand-dark bg-brand-surface"
        >
          Retour au catalogue
        </Link>
      </div>
    </div>
  );
}
