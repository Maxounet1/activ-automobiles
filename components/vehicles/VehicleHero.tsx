'use client';

import Link from 'next/link';
import {
  Calendar,
  Gauge,
  Settings2,
  Fuel,
  ChevronRight,
  Star,
  Zap,
  MapPin,
  CalendarCheck,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { Vehicle } from '@/lib/types';
import { formatMileage, getFuelLabel, PHONE_MAIN } from '@/lib/utils';

const FUEL_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  essence: { bg: 'rgba(239,68,68,0.10)', text: '#dc2626', border: 'rgba(239,68,68,0.20)' },
  diesel: { bg: 'rgba(59,130,246,0.10)', text: '#1A3F6F', border: 'rgba(59,130,246,0.20)' },
  hybride: { bg: 'rgba(16,185,129,0.10)', text: '#059669', border: 'rgba(16,185,129,0.20)' },
  electrique: { bg: 'rgba(6,182,212,0.10)', text: '#0891b2', border: 'rgba(6,182,212,0.20)' },
  gpl: { bg: 'rgba(245,158,11,0.10)', text: '#d97706', border: 'rgba(245,158,11,0.20)' },
  'hybride-rechargeable': { bg: 'rgba(16,185,129,0.10)', text: '#059669', border: 'rgba(16,185,129,0.20)' },
};

interface VehicleHeroProps {
  vehicle: Vehicle;
  isAuthenticated?: boolean;
}

export default function VehicleHero({ vehicle, isAuthenticated = false }: VehicleHeroProps) {
  const fuelStyle = FUEL_COLORS[vehicle.fuel] ?? FUEL_COLORS.essence;
  const isLowKm = vehicle.mileage < 500;
  const isPromo = vehicle.featured;
  const isSuperEquipped = vehicle.options && vehicle.options.length >= 8;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: '#fff', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(11,24,41,0.06)' }}
    >
      <div
        className="px-5 py-3 flex items-center gap-1.5 text-xs flex-wrap border-b"
        style={{ borderColor: '#F1F5F9', color: '#94A3B8' }}
      >
        <Link href="/" className="hover:text-[#1A3F6F] transition-colors">Accueil</Link>
        <ChevronRight size={10} />
        <Link href="/voitures-occasion" className="hover:text-[#1A3F6F] transition-colors">Acheter</Link>
        <ChevronRight size={10} />
        <Link href={`/voitures-occasion/${vehicle.brand.toLowerCase()}`} className="hover:text-[#1A3F6F] transition-colors">{vehicle.brand}</Link>
        <ChevronRight size={10} />
        <span style={{ color: '#475569' }} className="truncate max-w-[180px]">{vehicle.model} {vehicle.year}</span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ background: fuelStyle.bg, color: fuelStyle.text, border: `1px solid ${fuelStyle.border}` }}
          >
            <Fuel size={11} />
            {getFuelLabel(vehicle.fuel)}
          </span>
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' }}
          >
            {vehicle.condition === 'occasion' ? 'Occasion' : vehicle.condition === 'neuf' ? 'Neuf' : 'KM 0'}
          </span>
          {isPromo && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(245,158,11,0.10)', color: '#d97706', border: '1px solid rgba(245,158,11,0.20)' }}
            >
              <Star size={11} />
              Coup de coeur
            </span>
          )}
          {isLowKm && (
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(16,185,129,0.10)', color: '#059669', border: '1px solid rgba(16,185,129,0.20)' }}
            >
              KM &lt; 500
            </span>
          )}
          {vehicle.available && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(16,185,129,0.10)', color: '#059669', border: '1px solid rgba(16,185,129,0.20)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Disponible
            </span>
          )}
          {isSuperEquipped && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(26,63,111,0.08)', color: '#1A3F6F', border: '1px solid rgba(26,63,111,0.15)' }}
            >
              <Zap size={11} />
              Suréquipé
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-1" style={{ color: '#0B1829' }}>
          {vehicle.brand} {vehicle.model}
        </h1>
        <p className="text-base font-medium mb-3" style={{ color: '#475569' }}>{vehicle.version}</p>

        {vehicle.agencyCity && (
          <p className="flex items-center gap-1 text-xs mb-4" style={{ color: '#94A3B8' }}>
            <MapPin size={11} />
            Agence de {vehicle.agencyCity}
          </p>
        )}

        <div
          className="flex items-center gap-3 sm:gap-4 flex-wrap text-xs mb-5 px-4 py-3 rounded-xl"
          style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
        >
          <span className="flex items-center gap-1.5 font-semibold" style={{ color: '#475569' }}>
            <Calendar size={13} className="text-slate-400" />
            {vehicle.year}
          </span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="flex items-center gap-1.5 font-semibold" style={{ color: '#475569' }}>
            <Gauge size={13} className="text-slate-400" />
            {formatMileage(vehicle.mileage)}
          </span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="flex items-center gap-1.5 font-semibold" style={{ color: '#475569' }}>
            <Fuel size={13} className="text-slate-400" />
            {getFuelLabel(vehicle.fuel)}
          </span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="flex items-center gap-1.5 font-semibold" style={{ color: '#475569' }}>
            <Settings2 size={13} className="text-slate-400" />
            {vehicle.transmission === 'automatique' ? 'Automatique' : 'Manuelle'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 lg:hidden">
          <Link
            href={`/reservation/${vehicle.id}`}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)', boxShadow: '0 4px 16px rgba(26,63,111,0.25)' }}
          >
            <CalendarCheck size={16} />
            Réserver
          </Link>
          <a
            href={`tel:${PHONE_MAIN}`}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold border transition-colors hover:bg-slate-50"
            style={{ borderColor: '#E2E8F0', color: '#1A3F6F', background: '#F8FAFC' }}
          >
            <Phone size={16} />
            Appeler
          </a>
          <Link
            href={`/contact?vehicleId=${vehicle.id}`}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold border transition-colors hover:bg-slate-50"
            style={{ borderColor: '#E2E8F0', color: '#475569', background: '#F8FAFC' }}
          >
            <MessageCircle size={16} />
            Être rappelé
          </Link>
        </div>
      </div>
    </div>
  );
}
