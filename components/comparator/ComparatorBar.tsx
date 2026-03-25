'use client';

import { useComparator, MAX_VEHICLES } from '@/lib/comparator-store';
import { X, GitCompare, ArrowRight, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

export default function ComparatorBar() {
  const { vehicles, isOpen, setOpen, removeVehicle, clearAll } = useComparator();

  if (vehicles.length === 0) return null;

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl text-white font-bold text-sm shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #0B1829 0%, #1A3F6F 100%)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <GitCompare className="w-4 h-4" />
          <span>Comparer ({vehicles.length})</span>
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
            style={{ background: '#1A3F6F', color: '#fff' }}
          >
            {vehicles.length}
          </span>
        </button>
      )}

      {/* Expanded bar */}
      {isOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl"
          style={{ background: '#0B1829', borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-3">
              {/* Header */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <GitCompare className="w-4 h-4" style={{ color: '#1A3F6F' }} />
                <span className="text-white font-bold text-sm hidden sm:block">Comparateur</span>
              </div>

              <div className="flex items-center gap-2 flex-1 overflow-x-auto">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="flex items-center gap-2 rounded-xl px-3 py-1.5 flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {vehicle.images?.[0] && (
                      <div className="w-10 h-7 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={vehicle.images[0].url}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          width={40}
                          height={28}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-white text-xs font-semibold truncate max-w-[100px]">
                        {vehicle.brand} {vehicle.model}
                      </p>
                      <p className="text-xs" style={{ color: '#1A3F6F' }}>
                        {formatPrice(vehicle.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeVehicle(vehicle.id)}
                      className="ml-1 p-0.5 rounded-full transition-colors hover:bg-white/10 flex-shrink-0"
                    >
                      <X className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                ))}

                {/* Empty slots */}
                {Array.from({ length: MAX_VEHICLES - vehicles.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="w-32 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ border: '1px dashed rgba(255,255,255,0.15)' }}
                  >
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      + Ajouter
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={clearAll}
                  className="p-2 rounded-xl transition-colors hover:bg-white/10"
                  title="Vider le comparateur"
                >
                  <Trash2 className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl transition-colors hover:bg-white/10"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
                {vehicles.length >= 2 && (
                  <Link
                    href={`/comparer?ids=${vehicles.map((v) => v.id).join(',')}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)' }}
                  >
                    Comparer
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
