'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Star, ChevronRight, ArrowRight } from 'lucide-react';
import type { Agency } from '@/lib/types';

interface AgenciesSectionProps {
  agencies: Agency[];
}

const UNIFORM_ACCENT = { color: '#1A3F6F', bg: 'rgba(26,63,111,0.08)', dot: '#1A3F6F' };

function getAccent(_slug: string) {
  return UNIFORM_ACCENT;
}

function getTodayHours(openingHours: Agency['openingHours']): { isOpen: boolean; hours: string } {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const todayName = days[new Date().getDay()];
  const entry = openingHours.find((oh) => oh.day === todayName);
  if (!entry) return { isOpen: false, hours: '' };
  const isOpen = entry.hours !== 'Fermé';
  return { isOpen, hours: entry.hours };
}

export default function AgenciesSection({ agencies }: AgenciesSectionProps) {
  const [active, setActive] = useState<string>(agencies[0]?.slug ?? '');
  const activeAgency = agencies.find((a) => a.slug === active) ?? agencies[0];
  const accent = getAccent(active);

  return (
    <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: '#f4f5f7' }}>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8" style={{ background: '#4a8fd4' }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#4a8fd4' }}>
                Nos agences
              </span>
              <span className="h-px w-8" style={{ background: '#4a8fd4' }} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              6 agences,{' '}
              <br className="hidden sm:block" />
              <span className="text-gray-400">
                une seule exigence
              </span>
            </h2>
          </div>
          <Link
            href="/agences"
            className="self-start lg:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:gap-3 hover:opacity-90"
            style={{ background: '#1A3F6F' }}
          >
            Plus d&apos;informations
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* Left — agency list */}
          <div className="flex flex-col gap-2 lg:w-64 xl:w-72 flex-shrink-0">
            {agencies.map((agency) => {
              const a = getAccent(agency.slug);
              const { isOpen } = getTodayHours(agency.openingHours);
              const isActive = agency.slug === active;

              return (
                <button
                  key={agency.id}
                  onClick={() => setActive(agency.slug)}
                  className="group relative text-left rounded-xl px-4 py-3.5 transition-all duration-200 border"
                  style={{
                    background: isActive ? a.bg : '#ffffff',
                    borderColor: isActive ? a.color : '#e5e7eb',
                  }}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-200"
                        style={{
                          background: isActive ? a.color : '#d1d5db',
                          boxShadow: isActive ? `0 0 8px ${a.color}` : 'none',
                        }}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-gray-900 leading-tight truncate">
                          {agency.city}
                        </p>
                        <p className="text-xs truncate mt-0.5 text-gray-500">
                          {agency.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: isOpen ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)',
                          color: isOpen ? '#10b981' : '#ef4444',
                        }}
                      >
                        {isOpen ? 'Ouvert' : 'Fermé'}
                      </span>
                      <ChevronRight
                        size={14}
                        className="transition-transform duration-200"
                        style={{
                          color: isActive ? a.color : '#9ca3af',
                          transform: isActive ? 'translateX(2px)' : 'none',
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right — agency detail panel */}
          {activeAgency && (
            <div
              key={active}
              className="flex-1 rounded-2xl overflow-hidden border relative bg-white"
              style={{ borderColor: '#e5e7eb' }}
            >
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${accent.color}, transparent)` }}
                aria-hidden="true"
              />

              {/* Header */}
              <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4 border-b" style={{ borderColor: '#f3f4f6' }}>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 leading-tight">{activeAgency.city}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{activeAgency.name}</p>
                </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl flex-shrink-0"
                  style={{ background: accent.bg }}
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  <span className="font-bold text-sm" style={{ color: accent.color }}>{activeAgency.rating}</span>
                  <span className="text-xs text-gray-500">({activeAgency.reviewCount})</span>
                </div>
              </div>

              {/* Info grid */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="flex items-start gap-3">
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: accent.bg }}
                    aria-hidden="true"
                  >
                    <MapPin size={14} style={{ color: accent.color }} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1 text-gray-400">
                      Adresse
                    </p>
                    <address className="not-italic text-sm text-gray-800 leading-snug">
                      {activeAgency.address}
                      <br />
                      {activeAgency.zipCode} {activeAgency.city}
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: accent.bg }}
                    aria-hidden="true"
                  >
                    <Phone size={14} style={{ color: accent.color }} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1 text-gray-400">
                      Téléphone
                    </p>
                    <a
                      href={`tel:${activeAgency.phone.replace(/\s/g, '')}`}
                      className="text-sm font-bold text-gray-900 hover:opacity-70 transition-opacity"
                    >
                      {activeAgency.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:col-span-2">
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: accent.bg }}
                    aria-hidden="true"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: accent.color }} />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide mb-2 text-gray-400">
                      Horaires
                    </p>
                    <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                      {activeAgency.openingHours.slice(0, 6).map((oh) => (
                        <div key={oh.day} className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">{oh.day.slice(0, 3)}</span>
                          <span
                            className="text-xs font-medium"
                            style={{ color: oh.hours === 'Fermé' ? '#ef4444' : '#111827' }}
                          >
                            {oh.hours === 'Fermé' ? 'Fermé' : oh.hours.replace(' - ', '–')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Services chips */}
              {activeAgency.services && activeAgency.services.length > 0 && (
                <div className="px-6 pb-5 flex flex-wrap gap-2">
                  {activeAgency.services
                    .filter((s) => !s.toLowerCase().includes('contrôle technique'))
                    .map((s) => {
                      const label = /garantie\s+(12\s*mois|m[eé]canique|min)/i.test(s)
                        ? 'Garantie minimale 12 mois'
                        : s;
                      return (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ background: accent.bg, color: accent.color, border: `1px solid ${accent.color}30` }}
                        >
                          {label}
                        </span>
                      );
                    })
                    .slice(0, 5)}
                </div>
              )}

              {/* CTA */}
              <div className="px-6 pb-6 pt-2 border-t" style={{ borderColor: '#f3f4f6' }}>
                <Link
                  href={`/agences/${activeAgency.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:gap-3 hover:opacity-90"
                  style={{ background: accent.color }}
                >
                  Découvrir l&apos;agence
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          )}

        </div>

        {/* Bottom stats */}
        <div
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl p-5 border bg-white"
          style={{ borderColor: '#e5e7eb' }}
        >
          {[
            { value: '6', label: 'Agences en France' },
            { value: '4,8★', label: 'Note moyenne client' },
            { value: '+3 000', label: 'Avis vérifiés' },
            { value: '100 %', label: 'Livraison nationale' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-gray-900">{value}</p>
              <p className="text-xs mt-0.5 text-gray-400">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
