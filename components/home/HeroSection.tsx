'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Star, Car, Building2, ShieldCheck, Percent } from 'lucide-react';

const STATS = [
  { value: '800+', label: 'Véhicules', icon: Car },
  { value: '6', label: 'Agences', icon: Building2 },
  { value: '12 mois min.', label: 'Garantie', icon: ShieldCheck },
  { value: 'Sur mesure', label: 'Financement', icon: Percent },
];

const BADGES = [
  { icon: Star, label: '4,7 sur Google', accent: false, fill: true },
  { icon: null, label: '+2 100 avis vérifiés', accent: false, fill: false },
  { icon: Building2, label: '6 agences en France', accent: true, fill: false },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden">

      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-main.webp"
          alt="SUV premium d'occasion sélectionné par Activ Automobiles — véhicule garanti et contrôlé"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 40%' }}
          priority
          sizes="100vw"
          quality={85}
        />
        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(125deg, rgba(5,15,35,0.62) 0%, rgba(10,25,55,0.46) 45%, rgba(10,20,40,0.22) 75%, rgba(5,10,20,0.05) 100%)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{ background: 'linear-gradient(to top, rgba(5,15,35,0.72) 0%, rgba(5,15,35,0.30) 55%, transparent 100%)' }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to bottom, rgba(5,15,35,0.20) 0%, transparent 100%)' }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              {BADGES.map((b, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold"
                  style={
                    b.accent
                      ? { background: 'rgba(26,63,111,0.18)', border: '1px solid rgba(26,63,111,0.40)', backdropFilter: 'blur(8px)', color: '#FBBF24' }
                      : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#ffffff' }
                  }
                >
                  {b.icon && <b.icon className={`w-3.5 h-3.5 ${b.fill ? 'fill-yellow-400 text-yellow-400' : ''}`} />}
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="h-0.5 w-8 sm:w-10 rounded-full bg-brand-accent" />
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-brand-accent">
                Activ Automobiles
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.75rem] font-black text-white mb-4 sm:mb-5 leading-[1.1]"
              style={{ textShadow: '0 2px 32px rgba(0,0,0,0.45)' }}
            >
              Votre prochaine voiture,{' '}
              <span className="block">sélectionnée et garantie.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg mb-7 sm:mb-10 max-w-xl text-white/90 leading-relaxed"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              Plus de 800 véhicules d&apos;occasion contrôlés sur 100 points, garantis 12 mois minimum et finançables sur mesure. 6 agences en France.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/voitures-occasion"
                className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-sm sm:text-base text-white btn-cta-primary focus-visible:outline-none"
                style={{ background: 'linear-gradient(135deg, #E97B1F 0%, #D4690F 100%)', boxShadow: '0 6px 24px rgba(233,123,31,0.45)' }}
              >
                Voir nos véhicules
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
              </Link>

              <Link
                href="/services/reprise"
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-bold text-sm sm:text-base text-white transition-all duration-200 hover:opacity-90"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255,255,255,0.30)' }}
              >
                Estimer ma reprise
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(26,63,111,0.5) 30%, rgba(26,63,111,0.4) 70%, transparent 100%)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/8">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 py-4 sm:py-5 px-3 sm:px-6 text-center sm:text-left">
                <div
                  className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(26,63,111,0.12)', border: '1px solid rgba(26,63,111,0.22)' }}
                >
                  <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-brand-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-base sm:text-xl font-extrabold text-white leading-none tracking-tight">{value}</p>
                  <p className="text-[11px] sm:text-xs mt-0.5 text-white/45">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
