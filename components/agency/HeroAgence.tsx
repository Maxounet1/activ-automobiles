'use client';

import { useState } from 'react';
import { Phone, Navigation, Star, MapPin, Clock, Mail, ExternalLink, MessageSquare } from 'lucide-react';
import type { Agency } from '@/lib/types';
import AgencyContactModal from './AgencyContactModal';
import CallbackForm from './CallbackForm';

interface HeroAgenceProps {
  agency: Agency;
}

function parseSlots(hours: string): string[] {
  if (hours === 'Fermé') return [];
  return hours.split(' / ').map((s) => s.trim().replace(' - ', '–'));
}

function getCurrentStatus(openingHours: Agency['openingHours']): {
  isOpen: boolean;
  label: string;
  sub: string;
} {
  const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const today = dayNames[new Date().getDay()];
  const entry = openingHours.find((h) => h.day === today);

  if (!entry || entry.hours === 'Fermé') {
    const tomorrowIdx = (new Date().getDay() + 1) % 7;
    const tomorrowEntry = openingHours.find((h) => h.day === dayNames[tomorrowIdx]);
    const opens =
      tomorrowEntry && tomorrowEntry.hours !== 'Fermé'
        ? (tomorrowEntry.hours.split(' / ')[0]?.split(' - ')[0]?.trim() ?? '')
        : '';
    return {
      isOpen: false,
      label: 'Fermé',
      sub: opens ? `Ouvre ${(dayNames[tomorrowIdx] ?? '').toLowerCase()} à ${opens}` : '',
    };
  }

  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  const slots = entry.hours.split(' / ');

  for (const slot of slots) {
    const [o, c] = slot.trim().split(' - ');
    if (!o || !c) continue;
    const [oh, om = 0] = o.replace('h', ':').split(':').map(Number);
    const [ch, cm = 0] = c.replace('h', ':').split(':').map(Number);
    if (cur >= (oh ?? 0) * 60 + om && cur < (ch ?? 0) * 60 + cm) {
      return { isOpen: true, label: 'Ouvert', sub: `Ferme à ${c}` };
    }
  }

  const lastSlot = slots[slots.length - 1];
  if (lastSlot) {
    const [, lc] = lastSlot.trim().split(' - ');
    const [lch, lcm = 0] = (lc ?? '').replace('h', ':').split(':').map(Number);
    if (cur < (lch ?? 0) * 60 + lcm) {
      const next = slots.find((s) => {
        const [o2] = s.trim().split(' - ');
        const [o2h, o2m = 0] = (o2 ?? '').replace('h', ':').split(':').map(Number);
        return (o2h ?? 0) * 60 + o2m > cur;
      });
      const reopens = next ? next.trim().split(' - ')[0] : '';
      return { isOpen: false, label: 'Pause', sub: reopens ? `Reprend à ${reopens}` : '' };
    }
  }

  return { isOpen: false, label: 'Fermé', sub: 'Ouvre demain matin' };
}

const DAY_SHORT: Record<string, string> = {
  Lundi: 'Lun',
  Mardi: 'Mar',
  Mercredi: 'Mer',
  Jeudi: 'Jeu',
  Vendredi: 'Ven',
  Samedi: 'Sam',
  Dimanche: 'Dim',
};

export default function HeroAgence({ agency }: HeroAgenceProps) {
  const [callbackOpen, setCallbackOpen] = useState(false);

  const telHref = `tel:${agency.phone.replace(/\s/g, '')}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${agency.name} ${agency.address} ${agency.zipCode} ${agency.city}`
  )}`;
  const { isOpen, label, sub } = getCurrentStatus(agency.openingHours);
  const todayName = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'][
    new Date().getDay()
  ];

  const statusColor = isOpen ? '#22c55e' : label === 'Pause' ? '#f59e0b' : '#ef4444';
  const statusBg = isOpen
    ? 'rgba(34,197,94,0.18)'
    : label === 'Pause'
    ? 'rgba(245,158,11,0.18)'
    : 'rgba(239,68,68,0.15)';

  const heroImage = agency.image;

  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ height: '100svh', minHeight: '640px' }}
      >
        {/* PHOTO PLEIN ÉCRAN */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt={`Activ Automobiles ${agency.city}`}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          {/* Overlay assombrissant + teinte bleutée premium */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(160deg, rgba(10,20,48,0.35) 0%, rgba(15,28,60,0.22) 50%, rgba(10,20,48,0.10) 100%)',
            }}
          />
          {/* Dégradé fade bottom */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: '40%',
              background: 'linear-gradient(to top, rgba(8,16,40,0.72) 0%, transparent 100%)',
            }}
          />
        </div>

        <div
          className="relative z-10 flex flex-col"
          style={{ height: '100svh', minHeight: '640px' }}
        >
          <div className="flex-1 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-center">

                {/* GAUCHE */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <Star className="w-5 h-5 text-transparent" style={{ fill: '#F5C842' }} />
                    <span className="text-white font-bold text-base">{agency.rating}/5</span>
                    <span className="text-white text-base">— {agency.reviewCount} avis vérifiés</span>
                  </div>

                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.04] tracking-tight mb-5">
                    Activ Automobiles
                    <br />
                    {agency.city}
                  </h1>

                  <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-xl">
                    Votre concessionnaire de confiance à {agency.city}. Des conseillers à l&apos;écoute de votre famille, de votre budget et de votre projet.
                  </p>

                  <div className="flex items-center gap-2 text-white text-sm mb-10">
                    <MapPin className="w-4 h-4 flex-shrink-0 text-white/70" />
                    <span>{agency.address}, {agency.zipCode} {agency.city}</span>
                  </div>

                  <style>{`
                    @keyframes shimmer-btn {
                      0% { transform: translateX(-100%) skewX(-15deg); }
                      100% { transform: translateX(250%) skewX(-15deg); }
                    }
                    .btn-shimmer { position: relative; overflow: hidden; }
                    .btn-shimmer::after {
                      content: '';
                      position: absolute;
                      top: 0; left: 0;
                      width: 40%;
                      height: 100%;
                      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
                      transform: translateX(-100%) skewX(-15deg);
                      animation: shimmer-btn 3.2s ease-in-out infinite;
                    }
                  `}</style>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Bouton Appeler */}
                    <a
                      href={telHref}
                      className="btn-shimmer inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 font-black text-white text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                      style={{
                        background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2847 100%)',
                        border: '1.5px solid rgba(255,255,255,0.20)',
                        boxShadow: '0 4px 20px rgba(26,63,111,0.45)',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(26,63,111,0.65), 0 2px 8px rgba(0,0,0,0.25)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(26,63,111,0.45)'; }}
                    >
                      <Phone className="w-4 h-4" />
                      <span>{agency.phone}</span>
                    </a>

                    {/* Bouton Être rappelé */}
                    <button
                      type="button"
                      onClick={() => setCallbackOpen(true)}
                      className="btn-shimmer group inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 font-semibold text-white text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: '1.5px solid rgba(255,255,255,0.35)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.25)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.20)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Être rappelé
                    </button>

                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-shimmer group inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 font-semibold text-white text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                      style={{
                        background: 'rgba(255,255,255,0.09)',
                        border: '1.5px solid rgba(255,255,255,0.28)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.20)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.16)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)'; }}
                    >
                      <Navigation className="w-4 h-4" />
                      Itinéraire
                    </a>
                  </div>
                </div>

                {/* DROITE — horaires glassmorphism */}
                <div
                  className="rounded-2xl p-5 flex flex-col gap-4"
                  style={{
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    backdropFilter: 'blur(32px)',
                    WebkitBackdropFilter: 'blur(32px)',
                    boxShadow: '0 8px 48px rgba(0,0,0,0.30)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-white/70" />
                      <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/60">
                        Horaires
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: statusBg, color: statusColor }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: statusColor }}
                        />
                        {label}
                      </span>
                      {sub && <span className="text-[10px] text-white/35">{sub}</span>}
                    </div>
                  </div>

                  <div className="h-px bg-white/15" />

                  <div className="space-y-0.5">
                    {agency.openingHours.map((h) => {
                      const isToday = h.day === todayName;
                      const slots = parseSlots(h.hours);
                      const isClosed = slots.length === 0;
                      return (
                        <div
                          key={h.day}
                          className="flex items-start gap-3 px-2.5 py-1.5 rounded-lg"
                          style={
                            isToday
                              ? {
                                  background: 'rgba(255,255,255,0.16)',
                                  border: '1px solid rgba(255,255,255,0.28)',
                                }
                              : {}
                          }
                        >
                          <span
                            className="w-9 text-[12px] flex-shrink-0 mt-px"
                            style={{
                              color: isToday ? 'white' : 'rgba(255,255,255,0.45)',
                              fontWeight: isToday ? 700 : 400,
                            }}
                          >
                            {DAY_SHORT[h.day] ?? h.day.slice(0, 3)}.
                          </span>
                          <div className="flex-1 flex flex-col gap-px">
                            {isClosed ? (
                              <span className="text-[12px] text-white/70">Fermé</span>
                            ) : (
                              slots.map((slot) => (
                                <span
                                  key={slot}
                                  className="text-[12px] tabular-nums"
                                  style={{
                                    color: isToday ? 'white' : 'rgba(255,255,255,0.75)',
                                    fontWeight: isToday ? 600 : 400,
                                  }}
                                >
                                  {slot}
                                </span>
                              ))
                            )}
                          </div>
                          {isToday && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-white/50 mt-px flex-shrink-0">
                              Auj.
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="h-px bg-white/15" />

                  <a
                    href={`mailto:${agency.email}`}
                    className="group flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-white/10"
                  >
                    <Mail className="w-3.5 h-3.5 text-white/70 flex-shrink-0" />
                    <span className="text-[12px] text-white group-hover:text-white/80 transition-colors truncate font-medium">
                      {agency.email}
                    </span>
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* BANDEAU MAPS */}
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex-shrink-0 overflow-hidden"
            style={{
              height: '56px',
              background: 'rgba(0,0,0,0.40)',
              borderTop: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
            }}
            aria-label={`Voir ${agency.name} sur Google Maps`}
          >
            <div className="relative z-10 h-full flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-white/60 flex-shrink-0" />
                <div>
                  <p className="text-[13px] font-semibold text-white leading-none mb-0.5">
                    {agency.address}, {agency.zipCode} {agency.city}
                  </p>
                  <p className="text-[11px] text-white/45">Voir sur Google Maps</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[12px] font-semibold text-white/70">
                <span>Ouvrir Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Modal rappel */}
      <AgencyContactModal
        isOpen={callbackOpen}
        onClose={() => setCallbackOpen(false)}
        title="Être rappelé par l'agence"
        subtitle={`Un conseiller de ${agency.city} vous contacte sous 2h ouvrées.`}
      >
        <CallbackForm agencyId={agency.id} agencyPhone={agency.phone} />
      </AgencyContactModal>
    </>
  );
}
