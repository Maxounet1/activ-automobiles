'use client';

import Link from 'next/link';
import { MapPin, Phone, Clock, ChevronRight } from 'lucide-react';
import type { Agency } from '@/lib/types';
import StarRatingShared from '@/components/common/StarRating';

interface AgencyCardProps {
  agency: Agency;
}

// Return today's opening hours snippet
function getTodayHours(
  openingHours: Agency['openingHours']
): { label: string; isOpen: boolean } {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const today = days[new Date().getDay()];
  const entry = openingHours.find((h) => h.day === today);
  if (!entry) return { label: 'Horaires non disponibles', isOpen: false };
  const isOpen = entry.hours !== 'Fermé';
  const label = isOpen
    ? `Aujourd'hui : ${entry.hours}`
    : "Fermé aujourd'hui";
  return { label, isOpen };
}


export default function AgencyCard({ agency }: AgencyCardProps) {
  const todayHours = getTodayHours(agency.openingHours);
  const displayedServices = agency.services.slice(0, 4);
  const heroImage = agency.image;

  return (
    <article
      className="group relative bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5"
      style={{
        border: '1px solid #E8E6E2',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
        (e.currentTarget as HTMLElement).style.borderColor = '#D4D0CA';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
        (e.currentTarget as HTMLElement).style.borderColor = '#E8E6E2';
      }}
    >
      {/* Top color bar */}
      <div
        className="h-1 w-full flex-shrink-0"
        style={{ background: 'linear-gradient(90deg, #1A3F6F, #143260)' }}
        aria-hidden="true"
      />

      {/* Agency image */}
      <Link
        href={`/agences/${agency.slug}`}
        className="relative block overflow-hidden flex-shrink-0"
        aria-label={`Voir l'agence ${agency.name}`}
        tabIndex={-1}
      >
        <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
          <img
            src={heroImage}
            alt={`Agence Activ Automobiles ${agency.city}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Dark overlay gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, transparent 50%, rgba(11,24,41,0.45) 100%)',
            }}
            aria-hidden="true"
          />

          {/* City badge */}
          <div className="absolute bottom-3 left-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
              style={{
                background: 'rgba(11,24,41,0.75)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              {agency.city}
            </span>
          </div>
        </div>
      </Link>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-6 gap-5">
        {/* Agency name + rating */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/agences/${agency.slug}`}>
              <h3
                className="text-base font-bold leading-snug transition-colors duration-150 group-hover:text-[#1A3F6F] truncate"
                style={{ color: '#0B1829' }}
              >
                {agency.name}
              </h3>
            </Link>
            <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(11,24,41,0.5)' }}>
              {agency.zipCode} {agency.city}
            </p>
          </div>

          {/* Rating badge */}
          <div
            className="flex-shrink-0 flex flex-col items-end gap-0.5"
            aria-label={`Note globale : ${agency.rating}/5 — ${agency.reviewCount} avis`}
          >
            <div
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2648 100%)',
                boxShadow: '0 2px 12px rgba(26,63,111,0.30), inset 0 1px 0 rgba(255,255,255,0.12)',
              }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)' }}
                aria-hidden="true"
              />
              <StarRatingShared rating={agency.rating} size={12} color="#FCD34D" />
              <span className="relative text-sm font-black text-white tracking-tight">{agency.rating.toFixed(1)}</span>
            </div>
            <span className="text-[10px] font-medium text-gray-400 tabular-nums mt-0.5">{agency.reviewCount} avis</span>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 text-sm" style={{ color: 'rgba(11,24,41,0.65)' }}>
          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#1A3F6F' }} aria-hidden="true" />
          <span className="leading-snug">
            {agency.address}, {agency.zipCode} {agency.city}
          </span>
        </div>

        {/* Phone */}
        <a
          href={`tel:${agency.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-2 text-sm font-semibold transition-colors duration-150 hover:text-[#1A3F6F]"
          style={{ color: '#0B1829' }}
          aria-label={`Appeler l'agence de ${agency.city} au ${agency.phone}`}
        >
          <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#1A3F6F' }} aria-hidden="true" />
          {agency.phone}
        </a>

        {/* Opening hours */}
        <div className="flex items-center gap-2 text-xs">
          <Clock
            className="w-4 h-4 flex-shrink-0"
            style={{ color: todayHours.isOpen ? '#059669' : '#9ca3af' }}
            aria-hidden="true"
          />
          <span
            className="font-medium"
            style={{ color: todayHours.isOpen ? '#059669' : '#6b7280' }}
          >
            {todayHours.label}
          </span>
        </div>

        {/* Services badges */}
        <div className="flex flex-wrap gap-1.5" aria-label="Services proposés">
          {displayedServices.map((service) => (
            <span
              key={service}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium"
              style={{
                background: 'rgba(26,109,212,0.08)',
                color: '#1A3F6F',
                border: '1px solid rgba(26,109,212,0.15)',
              }}
            >
              {service}
            </span>
          ))}
          {agency.services.length > 4 && (
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium"
              style={{
                background: 'rgba(11,24,41,0.04)',
                color: 'rgba(11,24,41,0.45)',
                border: '1px solid rgba(11,24,41,0.08)',
              }}
            >
              +{agency.services.length - 4}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4 border-t border-[#F0EEE9]">
          <Link
            href={`/agences/${agency.slug}`}
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              boxShadow: '0 4px 16px rgba(5,150,105,0.30)',
            }}
          >
            Voir l&apos;agence
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
