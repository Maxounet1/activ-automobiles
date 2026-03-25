'use client';

import Link from 'next/link';
import { Shield, CreditCard, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

interface USPItem {
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
}

const usps: USPItem[] = [
  {
    icon: Shield,
    title: 'Sélection Rigoureuse',
    description: 'Chaque véhicule inspecté sur 100 points de contrôle par nos techniciens certifiés.',
    detail: '100 points de contrôle',
  },
  {
    icon: CreditCard,
    title: 'Financement Rapide',
    description: 'Réponse de principe sous 24h. Offre personnalisée selon votre profil et vos besoins.',
    detail: 'Réponse en 24h — offre sur mesure',
  },
  {
    icon: RefreshCw,
    title: 'Reprise Garantie',
    description: 'Estimation immédiate de votre véhicule actuel. Offre ferme sans engagement.',
    detail: 'Estimation et offre immédiates',
  },
  {
    icon: CheckCircle2,
    title: 'Garantie 12 Mois',
    description: "Tous nos véhicules sont garantis 12 mois minimum, extensible jusqu'à 36 mois.",
    detail: "Extensible jusqu'à 36 mois",
  },
];

function USPCard({ icon: Icon, title, description, detail, index }: USPItem & { index: number }) {
  return (
    <ScrollReveal delay={index * 80} direction="up">
      <article
        className="group relative rounded-2xl p-7 overflow-hidden hover:-translate-y-1 transition-all duration-300 h-full"
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(26,63,111,0.1)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
          style={{ background: 'linear-gradient(90deg, #1A3F6F 0%, #2558A0 100%)' }}
          aria-hidden="true"
        />

        <div className="relative mb-5">
          <div
            className="inline-flex items-center justify-center rounded-xl"
            style={{
              width: '48px',
              height: '48px',
              background: 'rgba(26,63,111,0.08)',
              border: '1px solid rgba(26,63,111,0.12)',
            }}
          >
            <Icon
              className="w-5 h-5"
              style={{ color: '#1A3F6F' }}
              aria-hidden="true"
              strokeWidth={2}
            />
          </div>
        </div>

        <h3
          className="relative text-[15px] font-bold mb-3 heading-card"
          style={{ color: '#111111' }}
        >
          {title}
        </h3>
        <p className="relative text-sm leading-relaxed mb-6" style={{ color: '#6B7280', lineHeight: 1.75 }}>
          {description}
        </p>

        <span
          className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{
            background: 'rgba(26,63,111,0.06)',
            color: '#1A3F6F',
            border: '1px solid rgba(26,63,111,0.14)',
          }}
        >
          {detail}
        </span>
      </article>
    </ScrollReveal>
  );
}

export default function USPSection() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: '#FFFFFF' }}
      aria-labelledby="usp-section-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <p
              className="eyebrow mb-5"
              style={{ color: '#1A3F6F' }}
            >
              POURQUOI NOUS CHOISIR
            </p>
            <h2
              id="usp-section-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5"
              style={{ color: '#111111' }}
            >
              L&apos;Excellence Automobile au Service de{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #1A3F6F 0%, #2558A0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Votre Mobilité
              </span>
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto body-relaxed" style={{ color: '#6B7280' }}>
              Depuis 2008, nous mettons tout en œuvre pour vous offrir une expérience d&apos;achat
              transparente, sécurisée et personnalisée.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {usps.map((usp, i) => (
            <USPCard key={usp.title} {...usp} index={i} />
          ))}
        </div>

        <ScrollReveal delay={100}>
          <div className="mt-14 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#1A3F6F' }}>
              Notre catalogue
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: '#111111' }}>
              Découvrez nos{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #1A3F6F 0%, #2558A0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                800+ véhicules
              </span>
            </h3>
            <p className="text-sm mb-8 text-gray-500">
              Tous contrôlés, garantis et disponibles dans nos 6 agences
            </p>
            <Link
              href="/voitures-occasion"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white btn-cta-primary group/cta"
            >
              Découvrez nos 800+ véhicules
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover/cta:translate-x-1.5" />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

