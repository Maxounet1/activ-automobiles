'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { numeric: 18, suffix: ' ans', label: "D'expertise", sub: 'Fondés en 2006', bar: 90 },
  { numeric: 40000, suffix: '+', label: 'Véhicules vendus', sub: 'Sur tout le territoire', bar: 100 },
  { numeric: 6, suffix: '', label: 'Agences en France', sub: 'Réseau national', bar: 60 },
  { numeric: 2100, suffix: '+', label: 'Avis vérifiés', sub: 'Note moyenne 4,7 / 5', bar: 84 },
];

function formatNumber(n: number): string {
  if (n >= 1000) return n.toLocaleString('fr-FR');
  return String(n);
}

function StatCard({
  numeric, suffix, label, sub, bar, active, index,
}: typeof STATS[0] & { active: boolean; index: number }) {
  const [count, setCount] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [hovered, setHovered] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const delay = index * 120;
    const duration = 1600;
    const steps = 72;
    const interval = duration / steps;

    const timeout = setTimeout(() => {
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.round(eased * numeric));
        setBarWidth(eased * bar);
        if (step >= steps) clearInterval(timer);
      }, interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [active, numeric, bar, index]);

  return (
    <div
      className="relative flex flex-col justify-between gap-3 px-6 py-5 rounded-2xl cursor-default overflow-hidden"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #1E3F6A 0%, #132F52 100%)'
          : 'linear-gradient(160deg, #1A3A5C 0%, #122B47 60%, #0D2038 100%)',
        boxShadow: hovered
          ? '0 0 0 1px rgba(59,130,246,0.28), 0 12px 32px -8px rgba(0,0,0,0.45)'
          : '0 0 0 1px rgba(59,130,246,0.10), 0 4px 16px -4px rgba(0,0,0,0.35)',
        transition: 'background 0.35s ease, box-shadow 0.35s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.25) 50%, transparent 100%)',
        }}
      />

      <div>
        <div className="flex items-baseline gap-1 leading-none mb-2">
          <span
            className="tabular-nums leading-none"
            style={{
              fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              transition: 'text-shadow 0.35s ease',
              textShadow: hovered
                ? '0 0 32px rgba(59,130,246,0.55), 0 0 12px rgba(59,130,246,0.30)'
                : 'none',
            }}
          >
            {active ? formatNumber(count) : '0'}
          </span>
          <span
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              color: hovered ? 'rgba(147,197,253,0.90)' : 'rgba(147,197,253,0.65)',
              transition: 'color 0.35s ease',
            }}
          >
            {suffix}
          </span>
        </div>
        <p
          className="text-sm font-semibold mb-0.5"
          style={{
            color: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)',
            letterSpacing: '0.01em',
            transition: 'color 0.35s ease',
          }}
        >
          {label}
        </p>
        <p
          className="text-xs"
          style={{
            color: hovered ? 'rgba(147,197,253,0.55)' : 'rgba(255,255,255,0.30)',
            letterSpacing: '0.02em',
            transition: 'color 0.35s ease',
          }}
        >
          {sub}
        </p>
      </div>

      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: '2px', background: 'rgba(255,255,255,0.07)' }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${barWidth}%`,
            background: hovered
              ? 'linear-gradient(90deg, rgba(59,130,246,0.6) 0%, rgba(96,165,250,1) 100%)'
              : 'linear-gradient(90deg, rgba(147,197,253,0.3) 0%, rgba(147,197,253,0.7) 100%)',
            transition: 'background 0.35s ease',
          }}
        />
      </div>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
    >
      {STATS.map((stat, i) => (
        <StatCard key={stat.label} {...stat} active={visible} index={i} />
      ))}
    </div>
  );
}
