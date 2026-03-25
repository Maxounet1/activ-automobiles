'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

export default function AgencesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[agences/error]', error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
      style={{ background: '#F8FAFC' }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(239,68,68,0.08)' }}
      >
        <AlertCircle className="w-7 h-7" style={{ color: '#EF4444' }} />
      </div>
      <div className="text-center max-w-md">
        <h1 className="text-xl font-black mb-2" style={{ color: '#0B1829' }}>
          Erreur de chargement
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
          Impossible de charger la liste de nos agences. Veuillez réessayer dans quelques instants.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
          style={{ background: '#1A3F6F' }}
        >
          <RefreshCw className="w-4 h-4" />
          Réessayer
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all border hover:border-gray-300"
          style={{ color: '#475569', borderColor: '#E2E8F0' }}
        >
          <Home className="w-4 h-4" />
          Accueil
        </Link>
      </div>
    </div>
  );
}
