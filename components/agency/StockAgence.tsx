import Link from 'next/link';
import { Car, ArrowRight } from 'lucide-react';
import VehicleCard from '@/components/vehicles/VehicleCard';
import type { Vehicle } from '@/lib/types';

interface StockAgenceProps {
  vehicles: Vehicle[];
  city: string;
  agencyCity: string;
}

export default function StockAgence({ vehicles, city, agencyCity }: StockAgenceProps) {
  const visibleVehicles = vehicles.slice(0, 6);
  const remaining = vehicles.length - visibleVehicles.length;

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#1A3F6F]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
                Disponibles maintenant
              </span>
            </div>
            <h2 className="text-3xl font-black text-gray-900">
              Stock de l&apos;agence {city}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-bold text-[#1A3F6F]">{vehicles.length}</span>{' '}
              véhicule{vehicles.length !== 1 ? 's' : ''} en stock actuellement
            </p>
          </div>

          {vehicles.length > 0 && (
            <Link
              href={`/voitures-occasion?agencyId=${agencyCity.toLowerCase()}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A3F6F] hover:underline flex-shrink-0"
            >
              Voir tout le stock
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {vehicles.length === 0 ? (
          <div
            className="rounded-2xl border border-gray-200 bg-white flex flex-col items-center justify-center py-16 text-center"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: 'rgba(26,63,111,0.08)' }}
            >
              <Car className="w-8 h-8 text-[#1A3F6F] opacity-50" />
            </div>
            <p className="font-bold text-gray-900 mb-2">Stock en cours de mise à jour</p>
            <p className="text-sm text-gray-500 max-w-sm">
              Contactez-nous pour connaître nos véhicules disponibles.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>

            {remaining > 0 && (
              <div className="mt-8 text-center">
                <Link
                  href={`/voitures-occasion?agencyId=${agencyCity.toLowerCase()}`}
                  className="inline-flex items-center gap-2 rounded-xl px-8 py-4 font-bold text-white text-sm transition-all hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
                    boxShadow: '0 6px 24px rgba(26,63,111,0.25)',
                  }}
                >
                  <Car className="w-4 h-4" />
                  Voir les {remaining} autres véhicules
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
