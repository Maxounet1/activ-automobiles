'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Vehicle } from '@/lib/types';
import VehicleCard from '@/components/vehicles/VehicleCard';
import ScrollReveal from '@/components/common/ScrollReveal';
import { useMemo } from 'react';

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
}

export default function FeaturedVehicles({ vehicles }: FeaturedVehiclesProps) {
  const featured = useMemo(() => vehicles.slice(0, 3), [vehicles]);

  return (
    <section
      className="py-14 lg:py-28"
      style={{ background: '#EEF4FB' }}
      aria-labelledby="featured-vehicles-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                style={{ color: '#1A3F6F' }}
              >
                NOS COUPS DE COEUR
              </p>
              <h2
                id="featured-vehicles-heading"
                className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
                style={{ color: '#111111' }}
              >
                Véhicules{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #1A3F6F 0%, #143260 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Mis en Avant
                </span>
              </h2>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-500 max-w-xl">
                Notre sélection de véhicules d&apos;exception, minutieusement
                inspectés sur 100 points et garantis 12 mois.
              </p>
            </div>

            <Link
              href="/voitures-occasion"
              className="inline-flex items-center gap-2 flex-shrink-0 text-sm font-semibold transition-all duration-200 hover:gap-3"
              style={{ color: '#1A3F6F' }}
            >
              Voir tous nos véhicules
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>

        {featured.length > 0 ? (
          <>
            {/* Mobile: horizontal scroll with peek */}
            <div className="sm:hidden -mx-4 px-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
              <style>{`.mobile-vehicle-track::-webkit-scrollbar { display: none; }`}</style>
              <div className="mobile-vehicle-track flex gap-4" style={{ width: 'max-content' }}>
                {featured.map((vehicle, i) => (
                  <div key={vehicle.id} style={{ width: '82vw', maxWidth: 340, flexShrink: 0 }}>
                    <VehicleCard vehicle={vehicle} index={i} />
                  </div>
                ))}
                <div style={{ width: 4, flexShrink: 0 }} />
              </div>
            </div>

            {/* Tablet+ : grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((vehicle, i) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
              ))}
            </div>
          </>
        ) : (
          <div
            className="flex items-center justify-center py-20 rounded-2xl border border-gray-100"
            style={{ background: '#ffffff' }}
          >
            <p style={{ color: '#9A9A9A' }}>Aucun véhicule disponible pour le moment.</p>
          </div>
        )}

        <ScrollReveal delay={100}>
          <div className="mt-10 sm:mt-14 text-center">
            <Link
              href="/voitures-occasion"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
                boxShadow: '0 4px 24px rgba(26,63,111,0.30)',
                minHeight: 52,
              }}
            >
              Voir tous nos véhicules
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <p className="mt-3 text-sm" style={{ color: '#9A9A9A' }}>
              Plus de 800 véhicules disponibles dans nos 6 agences
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
