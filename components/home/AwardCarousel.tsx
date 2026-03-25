'use client';

import { useRef, useState } from 'react';

import { motion, useInView } from 'framer-motion';

const awards = [
  {
    id: 'automoto',
    image: '/automoto.jpg',
    imageAlt: 'Grand Prix des Concessionnaires Auto Moto',
    overline: 'Auto Moto',
    title: 'Grand Prix des Concessionnaires',
    pill: '2 distinctions',
    description: 'Récompensé par le magazine Auto Moto pour la qualité de l\'expérience client et le sérieux de notre réseau.',
    accentColor: '#C8A84B',
    imageMaxH: 143,
  },
  {
    id: 'distinxion',
    image: '/distinxion-Photoroom.webp',
    imageAlt: 'Réseau Distinxion membre historique',
    overline: 'Réseau Distinxion',
    title: 'Membre depuis 18 ans',
    pill: '127 agences France',
    description: '1er réseau national multimarque. Gage de qualité, de transparence et de confiance depuis 2008.',
    accentColor: '#1A3F6F',
    imageMaxH: 160,
  },
  {
    id: 'autoplus',
    image: '/Autoplush.jpg',
    imageAlt: 'Prix Meilleurs Distributeurs Auto Plus',
    isAutoPlus: true,
    overline: 'Auto Plus',
    title: 'Meilleurs Distributeurs',
    years: ['2021', '2022', '2023', '2024', '2025', '2026'],
    pill: '6 ans consécutifs',
    description: 'Récompensés 6 années de suite pour nos services, notre transparence et la satisfaction client.',
    accentColor: '#C8A84B',
    imageMaxH: 143,
  },
];

function AwardItem({ award, index }: { award: typeof awards[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Zone logo — hauteur fixe identique pour tous */}
      <motion.div
        animate={{ scale: hovered ? 1.06 : 1, y: hovered ? -4 : 0 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={award.image}
          alt={award.imageAlt}
          style={{
            height: award.imageMaxH,
            maxWidth: award.id === 'distinxion' ? 300 : 220,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            borderRadius: award.id === 'autoplus' ? '12px' : undefined,
          }}
        />
      </motion.div>

      {/* Overline — hauteur fixe pour aligner le titre */}
      <div style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
        <span
          className="text-[9px] font-bold tracking-[0.28em] uppercase"
          style={{ color: award.accentColor, transition: 'opacity 0.3s', opacity: hovered ? 1 : 0.7 }}
        >
          {award.overline}
        </span>
      </div>

      {/* Titre — hauteur min fixe pour aligner le trait en dessous */}
      <h4
        className="font-extrabold mb-4"
        style={{
          fontSize: 'clamp(22px, 2vw, 27px)',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          minHeight: '2.4em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: award.id === 'distinxion'
            ? 'linear-gradient(135deg, #2a5298 0%, #1a3f6f 40%, #4a7bc8 70%, #1a3f6f 100%)'
            : 'linear-gradient(135deg, #b8922a 0%, #e8c76a 25%, #f5d97a 45%, #c8a84b 60%, #a07828 80%, #d4b050 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          backgroundSize: '200% 200%',
          animation: 'goldShimmer 4s ease infinite',
          filter: hovered ? 'brightness(1.15)' : 'brightness(1)',
          transition: 'filter 0.4s ease',
        }}
      >
        {award.title}
      </h4>

      {/* Trait séparateur — aligné car le titre a une hauteur fixe */}
      <motion.div
        animate={{ width: hovered ? 44 : 16 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: 1.5, background: award.accentColor, borderRadius: 999, marginBottom: 20 }}
        aria-hidden="true"
      />

      {/* Pill / années — hauteur min fixe pour aligner la description */}
      <div style={{ minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        {award.years ? (
          <div className="flex flex-wrap justify-center gap-1.5">
            {award.years.map((yr, i) => (
              <motion.span
                key={yr}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.3 + i * 0.06, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  background: hovered ? `${award.accentColor}12` : 'transparent',
                  color: hovered ? award.accentColor : '#C4B99A',
                  border: `1px solid ${hovered ? award.accentColor + '28' : 'rgba(200,168,75,0.2)'}`,
                  transition: 'all 0.3s ease',
                }}
              >
                {yr}
              </motion.span>
            ))}
          </div>
        ) : (
          <p className="text-xs font-medium" style={{ color: '#A0A0A0' }}>{award.pill}</p>
        )}
      </div>

      <p
        className="text-[12.5px] leading-relaxed max-w-[210px]"
        style={{ color: '#B0B0B0', lineHeight: 1.85, transition: 'color 0.3s', ...(hovered && { color: '#8A8A8A' }) }}
      >
        {award.description}
      </p>
    </motion.div>
  );
}

export default function AwardCarousel() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <div className="py-20 md:py-32">

      <motion.div
        ref={headerRef}
        className="text-center mb-20"
        initial={{ opacity: 0, y: 24 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[10px] font-bold tracking-[0.32em] uppercase mb-5" style={{ color: '#C8A84B' }}>
          Reconnus & Récompensés
        </p>
        <h3 className="text-4xl sm:text-5xl font-extrabold mb-5" style={{ color: '#0D1B2A', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
          Une réputation primée
        </h3>
        <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.25 }}
            style={{ height: 1, width: 44, background: 'rgba(200,168,75,0.3)', transformOrigin: 'right' }}
          />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#C8A84B' }} />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.25 }}
            style={{ height: 1, width: 44, background: 'rgba(200,168,75,0.3)', transformOrigin: 'left' }}
          />
        </div>
        <p className="text-sm max-w-xs mx-auto" style={{ color: '#A0A0A0', lineHeight: 1.8 }}>
          6 années de récompenses nationales. Une confiance construite sur les faits.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
        {awards.map((award, i) => (
          <AwardItem key={award.id} award={award} index={i} />
        ))}
      </div>

    </div>
  );
}
