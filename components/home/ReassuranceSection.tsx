'use client';

import { MapPin, Truck, ShieldCheck, HeartHandshake } from 'lucide-react';
import AwardCarousel from '@/components/home/AwardCarousel';
import StatsBar from '@/components/home/StatsBar';
import ScrollReveal from '@/components/common/ScrollReveal';
import type { LucideIcon } from 'lucide-react';

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: 'Véhicules contrôlés & préparés',
    text: 'Chaque véhicule est inspecté point par point avant livraison. Zéro mauvaise surprise.',
  },
  {
    icon: Truck,
    title: 'Livraison partout en France',
    text: 'Plus de 100 points de livraison. Votre voiture vient à vous, où que vous soyez.',
  },
  {
    icon: HeartHandshake,
    title: 'Un accompagnement humain',
    text: 'De la recherche au financement jusqu\'à la remise des clés, nos équipes restent à vos côtés.',
  },
  {
    icon: MapPin,
    title: 'Présence physique rassurante',
    text: '6 agences pour vous accueillir, échanger et signer en toute confiance.',
  },
];


export default function ReassuranceSection() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: '#FFFFFF' }}
      aria-labelledby="reassurance-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <ScrollReveal>
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <p
              className="text-xs font-semibold tracking-[0.22em] uppercase mb-4"
              style={{ color: '#1A3F6F' }}
            >
              NOS ENGAGEMENTS
            </p>
            <h2
              id="reassurance-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5"
              style={{ color: '#111111' }}
            >
              Pourquoi faire confiance à{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #1A3F6F 0%, #2558A0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Activ Automobiles&nbsp;?
              </span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#6B7280' }}>
              Depuis plus de <strong className="font-bold" style={{ color: '#111111' }}>18 ans</strong>, nous accompagnons nos clients dans l&apos;achat de leur véhicule{' '}
              <strong className="font-bold" style={{ color: '#111111' }}>en toute sérénité</strong>.
              Membre historique du réseau <strong className="font-bold" style={{ color: '#1A3F6F' }}>Distinxion</strong>{' '}
              — 127 points de vente et plus de 20 000 véhicules vendus chaque année en France. Plus de <strong className="font-bold" style={{ color: '#111111' }}>2 100 avis vérifiés</strong> par nos clients.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Stats bar ── */}
        <ScrollReveal delay={100}>
          <StatsBar />
        </ScrollReveal>

        {/* ── AWARDS CAROUSEL ── */}
        <ScrollReveal delay={150}>
          <AwardCarousel />
        </ScrollReveal>

        {/* ── Benefit cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {benefits.map(({ icon: Icon, title, text }, idx) => (
            <ScrollReveal key={title} delay={idx * 80} direction="up">
              <article
                className="group relative rounded-2xl overflow-hidden p-6 transition-all duration-250 h-full"
                style={{
                  background: 'linear-gradient(160deg, #ffffff 0%, #f0f4f9 100%)',
                  border: '1px solid rgba(26,63,111,0.13)',
                  boxShadow: '0 1px 8px rgba(26,63,111,0.07)',
                  transform: 'translateY(0)',
                  transition: 'transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-2px)';
                  el.style.boxShadow = '0 8px 24px rgba(26,63,111,0.14)';
                  el.style.borderColor = 'rgba(26,63,111,0.32)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = '0 1px 8px rgba(26,63,111,0.07)';
                  el.style.borderColor = 'rgba(26,63,111,0.13)';
                }}
              >
                {/* Shimmer line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden"
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(26,63,111,0.18) 40%, rgba(37,88,160,0.32) 50%, rgba(26,63,111,0.18) 60%, transparent 100%)', backgroundSize: '200% 100%', animation: 'shimmerBenefit 3s ease-in-out infinite', animationDelay: `${idx * 0.4}s` }}
                  />
                </div>

                <div className="pt-2">
                  <div
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 transition-colors duration-250 group-hover:bg-[rgba(26,63,111,0.12)]"
                    style={{ background: 'rgba(26,63,111,0.07)', border: '1px solid rgba(26,63,111,0.13)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#1A3F6F' }} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className="text-[15px] font-bold mb-2 leading-snug" style={{ color: '#111111' }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{text}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Notre promesse ── */}
        <ScrollReveal delay={100}>
          <div className="mt-10 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#1A3F6F' }}>
              Notre promesse
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: '#111111' }}>
              Une autre façon d&apos;acheter votre voiture
            </h3>
            <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Plus claire, plus humaine, sans stress.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
