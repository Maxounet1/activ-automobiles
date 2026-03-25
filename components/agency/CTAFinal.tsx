'use client';

import { useState } from 'react';
import { Phone, Clock, MessageSquare, ArrowRight, Zap } from 'lucide-react';
import CallbackForm from './CallbackForm';
import AgencyContactModal from './AgencyContactModal';
import type { Agency } from '@/lib/types';

interface CTAFinalProps {
  agencyId: string;
  phone: string;
  city: string;
  openingHours: Agency['openingHours'];
}

function getHoursSummary(openingHours: Agency['openingHours']): string {
  const weekday = openingHours.find((h) => h.day === 'Lundi');
  const saturday = openingHours.find((h) => h.day === 'Samedi');
  const formatSlot = (hours: string) => {
    if (hours === 'Fermé') return 'Fermé';
    const slots = hours.split(' / ');
    if (slots.length === 1) return slots[0] ?? hours;
    return slots.map((s) => s.trim()).join(' · ');
  };
  const parts: string[] = [];
  if (weekday && weekday.hours !== 'Fermé') {
    parts.push(`Lun–Ven : ${formatSlot(weekday.hours)}`);
  }
  if (saturday) {
    parts.push(`Sam : ${saturday.hours === 'Fermé' ? 'Fermé' : formatSlot(saturday.hours)}`);
  }
  return parts.join('  ·  ') || 'Sur rendez-vous';
}

export default function CTAFinal({ agencyId, phone, city, openingHours }: CTAFinalProps) {
  const hoursSummary = getHoursSummary(openingHours);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const telHref = `tel:${phone.replace(/\s/g, '')}`;

  return (
    <>
      <style>{`
        @keyframes shimmer-cta {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float-dot {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-8px) scale(1.1); opacity: 1; }
        }
        .cta-card-hover {
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
        }
        .cta-card-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 64px rgba(26,63,111,0.22) !important;
        }
      `}</style>

      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #f8faff 0%, #eef4ff 100%)' }}
      >
        {/* Background decorative elements */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(26,63,111,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 100% 100%, rgba(26,63,111,0.05) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(26,63,111,0.08)', border: '1px solid rgba(26,63,111,0.12)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#1A3F6F' }} />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
                Parlons de votre projet
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 leading-tight">
              Un projet&nbsp;? Une question&nbsp;?
            </h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
              Nos conseillers de {city} vous répondent vite et personnellement.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Card — Appel direct */}
            <a
              href={telHref}
              className="cta-card-hover group relative overflow-hidden rounded-3xl p-8 flex flex-col gap-6 no-underline"
              style={{
                background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2847 100%)',
                boxShadow: '0 12px 40px rgba(26,63,111,0.30)',
              }}
            >
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
              >
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
                    animation: 'shimmer-cta 1.5s ease infinite',
                  }}
                />
              </div>
              {/* Top glow */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
              />

              {/* Floating dots décor */}
              <div className="absolute top-6 right-8 flex gap-2 pointer-events-none">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.3)',
                      animation: `float-dot ${1.8 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Phone className="w-6 h-6 text-white" />
                </div>

                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/50 mb-1">
                  Réponse immédiate
                </p>
                <p className="font-black text-white text-2xl mb-2 leading-tight">
                  Appeler l&apos;agence
                </p>
                <p className="text-white text-sm leading-relaxed">
                  Pendant les horaires d&apos;ouverture, un conseiller répond immédiatement.
                </p>
              </div>

              <div className="relative z-10 mt-auto flex flex-col gap-4">
                {/* Horaires restructurés */}
                <div
                  className="rounded-xl px-4 py-3 flex flex-col gap-1.5"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
                >
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-white/70 flex-shrink-0" />
                    <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wide">Horaires</span>
                  </div>
                  {openingHours.filter(h => h.day === 'Lundi' || h.day === 'Samedi').map((h) => (
                    <div key={h.day} className="flex items-baseline gap-2 ml-5">
                      <span className="text-[11px] text-white/50 w-16 flex-shrink-0">
                        {h.day === 'Lundi' ? 'Lun–Ven' : 'Samedi'}
                      </span>
                      <span className="text-[11px] text-white/70 leading-relaxed">
                        {h.hours === 'Fermé' ? 'Fermé' : h.hours.split(' / ').join(' · ')}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Bouton CTA */}
                <div
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black text-sm transition-all duration-200 group-hover:gap-4"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1.5px solid rgba(255,255,255,0.35)',
                    color: 'white',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {phone}
                  <ArrowRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>

            {/* Card — Être rappelé */}
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="cta-card-hover group relative overflow-hidden rounded-3xl p-8 flex flex-col gap-6 text-left w-full"
              style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1.5px solid rgba(26,63,111,0.10)',
                boxShadow: '0 8px 32px rgba(26,63,111,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              {/* Shimmer effet inversé (sur fond blanc, lumière bleutée) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(26,63,111,0.06) 50%, transparent 60%)',
                    animation: 'shimmer-cta 1.5s ease infinite',
                  }}
                />
              </div>
              {/* Top glow inversé */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(26,63,111,0.18), transparent)' }}
              />
              {/* Floating dots bleus */}
              <div className="absolute top-6 right-8 flex gap-2 pointer-events-none">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: 'rgba(26,63,111,0.28)',
                      animation: `float-dot ${1.8 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
                    }}
                  />
                ))}
              </div>
              {/* Hover background */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(26,63,111,0.02) 0%, rgba(26,63,111,0.04) 100%)' }}
              />
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle at 100% 0%, rgba(26,63,111,0.10) 0%, transparent 65%)' }}
              />

              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
                    boxShadow: '0 6px 20px rgba(26,63,111,0.30)',
                  }}
                >
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400">
                    Sous 2h ouvrées
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(34,197,94,0.1)', color: '#16a34a' }}
                  >
                    <Zap className="w-2.5 h-2.5" />
                    Rapide
                  </span>
                </div>
                <p className="font-black text-gray-900 text-2xl mb-2 leading-tight">
                  Être rappelé
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Laissez vos coordonnées et un conseiller dédié vous contacte rapidement.
                </p>
              </div>

              <div className="relative z-10 mt-auto">
                <div
                  className="flex items-center justify-center gap-3 w-full px-6 py-3.5 rounded-2xl font-black text-sm text-white transition-all duration-200 group-hover:gap-4"
                  style={{
                    background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
                    boxShadow: '0 6px 20px rgba(26,63,111,0.30)',
                  }}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  Demander un rappel
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </button>

          </div>

        </div>
      </section>

      {/* Modal rappel */}
      <AgencyContactModal
        isOpen={callbackOpen}
        onClose={() => setCallbackOpen(false)}
        title="Être rappelé par l'agence"
        subtitle={`Un conseiller de ${city} vous contacte sous 2h ouvrées.`}
      >
        <CallbackForm agencyId={agencyId} agencyPhone={phone} />
      </AgencyContactModal>
    </>
  );
}
