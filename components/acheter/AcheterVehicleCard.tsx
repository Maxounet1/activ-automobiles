'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart, MapPin, Gauge, Calendar, Settings2, Zap,
  Shield, Tag, Clock, CheckCircle2, Info,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { Vehicle } from '@/lib/types';
import { track } from '@/lib/analytics';

const FUEL_GRADIENT: Record<string, string> = {
  essence:                'linear-gradient(135deg,#D97706,#F59E0B)',
  diesel:                 'linear-gradient(135deg,#1E3A5F,#334E7A)',
  hybride:                'linear-gradient(135deg,#065F46,#059669)',
  electrique:             'linear-gradient(135deg,#1D4ED8,#3B82F6)',
  gpl:                    'linear-gradient(135deg,#5B21B6,#7C3AED)',
  'hybride-rechargeable': 'linear-gradient(135deg,#0C4A6E,#0891B2)',
};

const FUEL_SHADOW: Record<string, string> = {
  essence:                'rgba(217,119,6,0.4)',
  diesel:                 'rgba(30,58,95,0.4)',
  hybride:                'rgba(6,95,70,0.4)',
  electrique:             'rgba(29,78,216,0.4)',
  gpl:                    'rgba(91,33,182,0.4)',
  'hybride-rechargeable': 'rgba(12,74,110,0.4)',
};

const FUEL_LABEL: Record<string, string> = {
  essence:                'Essence',
  diesel:                 'Diesel',
  hybride:                'Hybride',
  electrique:             'Électrique',
  gpl:                    'GPL',
  'hybride-rechargeable': 'Hybride rech.',
};

function calcOriginalPrice(price: number): number {
  const margins = [0.12, 0.15, 0.18, 0.22, 0.28];
  const m = margins[Math.floor(price / 5000) % margins.length];
  return Math.round((price / (1 - m)) / 100) * 100;
}

function formatMileage(km: number): string {
  return `${km.toLocaleString('fr-FR')} km`;
}

type StatusBadge = 'disponible' | 'reserve' | 'faible-km' | 'nouveau';

function resolveStatus(vehicle: Vehicle): StatusBadge {
  const daysOld = Math.floor((Date.now() - new Date(vehicle.createdAt).getTime()) / 86400000);
  if (!vehicle.available) return 'reserve';
  if (daysOld <= 5) return 'nouveau';
  if (vehicle.mileage < 15000) return 'faible-km';
  return 'disponible';
}

function InfoPopover({ text, id }: { text: string; id: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(p => !p);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-flex items-center" style={{ zIndex: 20 }}>
      <button
        type="button"
        aria-label="Plus d'informations"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="inline-flex items-center justify-center rounded-full transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
        style={{
          width: 16,
          height: 16,
          background: open ? 'rgba(15,23,42,0.12)' : 'rgba(15,23,42,0.07)',
          color: '#475569',
          flexShrink: 0,
        }}
      >
        <Info style={{ width: 10, height: 10 }} />
      </button>

      {open && (
        <div
          id={id}
          role="tooltip"
          className="absolute z-50"
          style={{
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 220,
            background: '#0F172A',
            borderRadius: 10,
            boxShadow: '0 8px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.14)',
            padding: '10px 12px',
          }}
        >
          <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.88)' }}>{text}</p>
          <div
            style={{
              position: 'absolute',
              bottom: -5,
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: 10,
              height: 10,
              background: '#0F172A',
              borderRadius: 2,
            }}
          />
        </div>
      )}
    </div>
  );
}

export interface AcheterVehicleCardProps {
  vehicle: Vehicle;
  index?: number;
  href?: string;
  onOpenCallback?: () => void;
  animate?: boolean;
}

export default function AcheterVehicleCard({
  vehicle,
  index = 0,
  href,
  onOpenCallback,
  animate = true,
}: AcheterVehicleCardProps) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const vehicleHref = href ?? `/voitures-occasion/${vehicle.slug}`;
  const fuelGradient = FUEL_GRADIENT[vehicle.fuel] ?? 'linear-gradient(135deg,#475569,#64748B)';
  const fuelShadow = FUEL_SHADOW[vehicle.fuel] ?? 'rgba(71,85,105,0.35)';
  const fuelLabel = FUEL_LABEL[vehicle.fuel] ?? vehicle.fuel;

  const hasRealImage = !imgError && !!vehicle.images?.[0]?.url;
  const imgUrl = hasRealImage
    ? vehicle.images[0].url
    : '/no-photo-placeholder.jpg';

  const originalPrice = calcOriginalPrice(vehicle.price);
  const discount = Math.round(((originalPrice - vehicle.price) / originalPrice) * 100);
  const savings = originalPrice - vehicle.price;

  const status = resolveStatus(vehicle);

  const specs = [
    { Icon: Calendar,  label: String(vehicle.year) },
    { Icon: Gauge,     label: formatMileage(vehicle.mileage) },
    { Icon: Settings2, label: vehicle.transmission === 'automatique' ? 'Auto.' : 'Manuelle' },
    { Icon: Zap,       label: `${vehicle.power} ch` },
  ];

  const statusBadge = (() => {
    if (status === 'disponible') return (
      <div
        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full z-10"
        style={{ background: 'rgba(220,252,231,0.95)', backdropFilter: 'blur(6px)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#22C55E' }} />
        <span className="text-[11px] font-bold" style={{ color: '#15803D' }}>Disponible</span>
      </div>
    );
    if (status === 'reserve') return (
      <div
        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full z-10"
        style={{ background: 'rgba(254,226,226,0.95)', backdropFilter: 'blur(6px)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#EF4444' }} />
        <span className="text-[11px] font-bold" style={{ color: '#DC2626' }}>Réservé</span>
      </div>
    );
    if (status === 'faible-km') return (
      <div
        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full z-10"
        style={{ background: 'rgba(219,234,254,0.95)', backdropFilter: 'blur(6px)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#3B82F6' }} />
        <span className="text-[11px] font-bold" style={{ color: '#1D4ED8' }}>Faible km</span>
      </div>
    );
    return (
      <div
        className="nouveau-badge absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full z-10 overflow-hidden cursor-default"
        style={{
          background: 'linear-gradient(135deg,#334155,#1E293B)',
          boxShadow: '0 2px 12px rgba(30,41,59,0.45), inset 0 1px 0 rgba(255,255,255,0.15)',
          border: '1.5px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="nouveau-shimmer absolute inset-0 w-1/3"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
            transform: 'translateX(-120%) skewX(-15deg)',
          }}
        />
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 relative z-10" style={{ background: 'rgba(255,255,255,0.6)' }} />
        <span className="text-[11px] font-semibold relative z-10 tracking-wide" style={{ color: '#fff' }}>Nouveau</span>
      </div>
    );
  })();

  const cardContent = (
    <article
      className="group flex flex-col bg-white overflow-hidden relative cursor-pointer"
      style={{
        borderRadius: 20,
        border: hovered ? '1.5px solid rgba(26,63,111,0.18)' : '1.5px solid #EEF2F7',
        boxShadow: hovered
          ? '0 28px 72px rgba(26,63,111,0.14), 0 6px 20px rgba(26,63,111,0.07)'
          : '0 2px 18px rgba(15,23,42,0.06)',
        transition: 'all 0.28s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        track('vehicle_card_view', { vehicleId: vehicle.id, brand: vehicle.brand, model: vehicle.model, price: vehicle.price });
        window.location.href = vehicleHref;
      }}
    >
      <style>{`
        @keyframes shimmer-fuel {
          0%   { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(240%) skewX(-15deg); }
        }
        @keyframes shimmer-savings {
          0%   { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(240%) skewX(-15deg); }
        }
        @keyframes shimmer-nouveau {
          0%   { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(240%) skewX(-15deg); }
        }
        .fuel-badge:hover .fuel-shimmer {
          animation: shimmer-fuel 0.7s ease forwards;
        }
        .savings-badge:hover .savings-shimmer {
          animation: shimmer-savings 0.7s ease forwards;
        }
        .nouveau-badge:hover .nouveau-shimmer {
          animation: shimmer-nouveau 0.7s ease forwards;
        }
      `}</style>

      {/* Image */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{ aspectRatio: '16/10', background: hasRealImage ? '#E2E8F0' : '#1A3F6F' }}
      >
        {hasRealImage ? (
          <Image
            src={imgUrl}
            alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            onError={() => setImgError(true)}
            priority={index < 4}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/no-photo-placeholder.jpg"
            alt={`${vehicle.brand} ${vehicle.model} - Photo à venir`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(10,18,30,0.55) 0%, rgba(10,18,30,0.1) 45%, transparent 100%)' }}
        />

        {discount > 0 && (
          <div
            className="absolute top-3 left-3 flex flex-col items-center justify-center rounded-full z-10"
            style={{
              width: 52,
              height: 52,
              background: 'linear-gradient(160deg, #C2185B 0%, #AD1457 100%)',
              boxShadow: '0 4px 14px rgba(194,24,91,0.40)',
            }}
          >
            <span className="text-white font-black text-[12px] leading-none">-{discount}%</span>
            <span className="text-white/75 text-[9px] font-semibold mt-0.5 leading-none">remise</span>
          </div>
        )}

        <button
          type="button"
          onClick={e => { e.stopPropagation(); setLiked(p => !p); }}
          aria-label={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full z-10 transition-all duration-200 hover:scale-110"
          style={{
            background: liked ? '#E11D48' : 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          <Heart className="w-4 h-4" style={{ color: liked ? '#fff' : '#94A3B8', fill: liked ? '#fff' : 'none' }} />
        </button>

        {statusBadge}

        {/* Badge énergie glassmorphisme + shimmer */}
        <div
          className="fuel-badge absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full z-10 overflow-hidden cursor-default"
          style={{
            background: fuelGradient,
            boxShadow: `0 2px 12px ${fuelShadow}, inset 0 1px 0 rgba(255,255,255,0.25)`,
            border: '1.5px solid rgba(255,255,255,0.35)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            className="fuel-shimmer absolute inset-0 w-1/3"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
              transform: 'translateX(-120%) skewX(-15deg)',
            }}
          />
          <Zap className="w-3 h-3 relative z-10 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.92)' }} />
          <span className="text-[11px] font-semibold relative z-10 tracking-wide" style={{ color: '#fff' }}>{fuelLabel}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-0.5" style={{ color: '#94A3B8' }}>{vehicle.brand}</p>
          <h3 className="font-black text-[19px] leading-tight truncate" style={{ color: '#0F172A' }}>{vehicle.model}</h3>
          {vehicle.version && (
            <p className="text-[12px] mt-0.5 truncate" style={{ color: '#94A3B8' }}>{vehicle.version}</p>
          )}
          {vehicle.monthlyPrice && (
            <div className="flex items-center gap-1.5 mt-2">
              <p className="text-[12px] font-medium" style={{ color: '#475569' }}>
                À partir de{' '}
                <span className="font-black text-[14px]" style={{ color: '#16A34A' }}>{vehicle.monthlyPrice} €/mois</span>
              </p>
              <div onClick={e => e.stopPropagation()}>
                <InfoPopover
                  id={`finance-info-${vehicle.id}`}
                  text="Les modalités complètes de financement (durée, apport, TAEG, conditions) sont détaillées sur la page suivante."
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <p className="text-[26px] font-black leading-none" style={{ color: '#1E3A5F' }}>
            {vehicle.price.toLocaleString('fr-FR')} €
          </p>
          {discount > 0 && (
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <p className="text-[13px] line-through" style={{ color: '#CBD5E1' }}>
                {originalPrice.toLocaleString('fr-FR')} €
              </p>
              <div className="flex items-center gap-1.5">
                {/* Badge économies magenta glassmorphisme + shimmer */}
                <div
                  className="savings-badge relative inline-flex items-center gap-1 px-2.5 py-1 rounded-full overflow-hidden cursor-default"
                  style={{
                    background: 'linear-gradient(135deg,#BE185D,#EC4899)',
                    boxShadow: '0 2px 10px rgba(190,24,93,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div
                    className="savings-shimmer absolute inset-0 w-1/3"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                      transform: 'translateX(-120%) skewX(-15deg)',
                    }}
                  />
                  <Tag className="w-2.5 h-2.5 relative z-10" style={{ color: '#fff' }} />
                  <span className="text-[10px] font-bold relative z-10" style={{ color: '#fff' }}>
                    Économisez {savings.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <div onClick={e => e.stopPropagation()}>
                  <InfoPopover
                    id={`savings-info-${vehicle.id}`}
                    text="Cette économie correspond à la différence entre le prix constructeur et notre prix de vente."
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {specs.map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#94A3B8' }} />
              <span className="text-[12px] font-semibold" style={{ color: '#475569' }}>{label}</span>
            </div>
          ))}
        </div>

        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(to right, transparent, #E2E8F0, transparent)' }}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#64748B' }} />
            <span className="text-[11px] font-semibold" style={{ color: '#475569' }}>Garantie 12 mois</span>
          </div>
          {vehicle.agencyCity && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: '#94A3B8' }} />
              <span className="text-[11px]" style={{ color: '#94A3B8' }}>{vehicle.agencyCity}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );

  if (!animate) return cardContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: Math.min(index * 0.045, 0.5) }}
    >
      {cardContent}
    </motion.div>
  );
}
