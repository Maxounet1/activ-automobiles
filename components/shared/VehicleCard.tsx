'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Gauge, Calendar, Settings2, Zap, Shield, ArrowRight, Phone, CreditCard, TrendingDown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Vehicle } from '@/lib/types';
import { track } from '@/lib/analytics';

const FUEL_COLOR: Record<string, string> = {
  essence:                '#F59E0B',
  diesel:                 '#64748B',
  hybride:                '#22C55E',
  electrique:             '#3B82F6',
  gpl:                    '#A855F7',
  'hybride-rechargeable': '#06B6D4',
};

const FUEL_LABEL: Record<string, string> = {
  essence:                'Essence',
  diesel:                 'Diesel',
  hybride:                'Hybride',
  electrique:             'Électrique',
  gpl:                    'GPL',
  'hybride-rechargeable': 'Hybride rech.',
};

type BadgeType = 'nouveaute' | 'bon-plan' | 'faible-km' | 'coup-de-coeur' | 'promo';

const BADGE_CONFIG: Record<BadgeType, { label: string; bg: string; Icon: React.ElementType }> = {
  'coup-de-coeur': { label: 'Coup de coeur', bg: 'linear-gradient(135deg,#E11D48,#FB7185)',  Icon: Sparkles },
  nouveaute:       { label: 'Nouveauté',      bg: 'linear-gradient(135deg,#1A3F6F,#2563EB)', Icon: Sparkles },
  'faible-km':     { label: 'Faible km',      bg: 'linear-gradient(135deg,#0284C7,#0EA5E9)', Icon: Gauge },
  'bon-plan':      { label: 'Bon plan',       bg: 'linear-gradient(135deg,#059669,#10B981)', Icon: TrendingDown },
  promo:           { label: 'Promo',          bg: 'linear-gradient(135deg,#F97316,#FB923C)', Icon: TrendingDown },
};

function resolveBadge(vehicle: Vehicle, index: number): BadgeType | null {
  if (vehicle.featured) return 'coup-de-coeur';
  const daysOld = Math.floor((Date.now() - new Date(vehicle.createdAt).getTime()) / 86400000);
  if (daysOld <= 7) return 'nouveaute';
  if (vehicle.mileage < 25000) return 'faible-km';
  if (index % 8 === 3) return 'bon-plan';
  return null;
}

export interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
  href?: string;
  onOpenCallback?: () => void;
  onOpenFinance?: (v: Vehicle) => void;
  showComparatorBtn?: boolean;
  animate?: boolean;
}

export default function VehicleCard({
  vehicle,
  index = 0,
  href,
  onOpenCallback,
  onOpenFinance,
  animate = true,
}: VehicleCardProps) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const badge = resolveBadge(vehicle, index);
  const badgeConfig = badge ? BADGE_CONFIG[badge] : null;
  const fuelColor = FUEL_COLOR[vehicle.fuel] ?? '#64748B';
  const fuelLabel = FUEL_LABEL[vehicle.fuel] ?? vehicle.fuel;

  const imgUrl = !imgError && vehicle.images?.[0]?.url
    ? vehicle.images[0].url
    : '/no-photo-placeholder.jpg';

  const vehicleHref = href ?? `/voitures-occasion/${vehicle.slug}`;

  const cardContent = (
    <article
      className="group flex flex-col bg-white overflow-hidden"
      style={{
        borderRadius: 20,
        border: hovered ? '1px solid rgba(26,63,111,0.18)' : '1px solid #F1F5F9',
        boxShadow: hovered
          ? '0 28px 70px rgba(26,63,111,0.14), 0 6px 20px rgba(26,63,111,0.08)'
          : '0 2px 16px rgba(15,23,42,0.06)',
        transition: 'box-shadow 0.28s ease, transform 0.28s ease, border-color 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link href={vehicleHref} className="relative block overflow-hidden flex-shrink-0" style={{ aspectRatio: '16/10' }}>
        <Image
          src={imgUrl}
          alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-600 group-hover:scale-[1.05]"
          onError={() => setImgError(true)}
          priority={index < 4}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {badgeConfig && (
          <span
            className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white z-10"
            style={{ background: badgeConfig.bg, boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
          >
            <badgeConfig.Icon className="w-3 h-3" />
            {badgeConfig.label}
          </span>
        )}

        <button
          type="button"
          onClick={e => { e.preventDefault(); setLiked(p => !p); }}
          aria-label={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="absolute top-2.5 right-2.5 w-10 h-10 flex items-center justify-center rounded-full z-10 transition-all duration-200 active:scale-95"
          style={{
            background: liked ? '#E11D48' : 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
          }}
        >
          <Heart className="w-4 h-4" style={{ color: liked ? '#fff' : '#94A3B8', fill: liked ? '#fff' : 'none' }} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-white font-black text-xl leading-none" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                {vehicle.price.toLocaleString('fr-FR')} €
              </p>
              {vehicle.monthlyPrice && (
                <p className="text-white/65 text-xs mt-1">
                  ou <span className="text-white font-semibold">{vehicle.monthlyPrice} €</span>/mois
                </p>
              )}
            </div>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: fuelColor }} />
              {fuelLabel}
            </span>
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        <div>
          <h3 className="font-black text-[15px] truncate" style={{ color: '#0F172A' }}>
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="text-xs mt-0.5 truncate font-medium" style={{ color: '#94A3B8' }}>{vehicle.version}</p>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {[
            { Icon: Calendar,  label: String(vehicle.year) },
            { Icon: Gauge,     label: `${Math.round(vehicle.mileage / 1000)}k km` },
            { Icon: Settings2, label: vehicle.transmission === 'automatique' ? 'Auto.' : 'Man.' },
            { Icon: Zap,       label: `${vehicle.power} ch` },
          ].map(({ Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 py-2.5 rounded-xl"
              style={{
                background: hovered ? '#EEF4FB' : '#F8FAFC',
                border: hovered ? '1px solid rgba(26,63,111,0.10)' : '1px solid transparent',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
            >
              <Icon className="w-4 h-4" style={{ color: '#94A3B8' }} />
              <span className="text-xs font-bold" style={{ color: '#374151' }}>{label}</span>
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-between py-2 px-3 rounded-xl"
          style={{ background: 'linear-gradient(135deg,#F0FDF4,#DCFCE7)', border: '1px solid #BBF7D0' }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: '#16A34A' }}>
              <Shield className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-bold" style={{ color: '#15803D' }}>Garantie 12 mois</span>
          </div>
          {vehicle.agencyCity && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: '#86EFAC' }} />
              <span className="text-xs font-medium" style={{ color: '#166534' }}>{vehicle.agencyCity}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <Link
            href={vehicleHref}
            onClick={() => track('vehicle_card_view', { vehicleId: vehicle.id, brand: vehicle.brand, model: vehicle.model, price: vehicle.price })}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 group/btn active:scale-95"
            style={{ background: '#0B1829', minHeight: 48 }}
          >
            Voir le véhicule
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>

          {onOpenCallback && (
            <button
              type="button"
              onClick={() => { onOpenCallback(); track('click_call', { vehicleId: vehicle.id, source: 'card' }); }}
              aria-label="Être rappelé"
              className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-200 active:scale-95"
              style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', color: '#16A34A', minWidth: 48 }}
            >
              <Phone className="w-4 h-4" />
            </button>
          )}

          {onOpenFinance && vehicle.monthlyPrice && (
            <button
              type="button"
              onClick={() => onOpenFinance(vehicle)}
              aria-label="Simuler un financement"
              className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0 transition-all duration-200 active:scale-95"
              style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE', color: '#1D4ED8', minWidth: 48 }}
            >
              <CreditCard className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );

  if (!animate) return cardContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
    >
      {cardContent}
    </motion.div>
  );
}
