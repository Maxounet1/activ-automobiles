'use client';

import { Shield, CreditCard, ArrowLeftRight, MapPin, PhoneCall } from 'lucide-react';

interface TrustInsertProps {
  onOpenCallback: () => void;
}

const ITEMS = [
  {
    icon: Shield,
    title: 'Véhicules contrôlés & garantis',
    desc: '100 points de contrôle. Garantie 12 mois incluse.',
    color: '#16a34a',
    bg: '#f0fdf4',
  },
  {
    icon: CreditCard,
    title: 'Financement rapide',
    desc: 'Réponse en 24h. Apport flexible dès 0 €.',
    color: '#0284c7',
    bg: '#f0f9ff',
  },
  {
    icon: ArrowLeftRight,
    title: 'Reprise simplifiée',
    desc: 'Estimation immédiate de votre véhicule actuel.',
    color: '#7c3aed',
    bg: '#faf5ff',
  },
  {
    icon: MapPin,
    title: 'Réseau d\'agences',
    desc: '6 agences en France. Livraison possible à domicile.',
    color: '#ea580c',
    bg: '#fff7ed',
  },
];

export default function TrustInsert({ onOpenCallback }: TrustInsertProps) {
  return (
    <div
      className="col-span-full rounded-2xl overflow-hidden my-4"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1A3F6F 100%)' }}
    >
      <div className="px-6 py-8">
        <div className="text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#93c5fd' }}>
            Activ Automobiles
          </p>
          <h3 className="text-xl font-extrabold text-white">
            Achetez en toute confiance
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {ITEMS.map(item => (
            <div
              key={item.title}
              className="rounded-xl p-4 flex flex-col gap-2"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: item.bg }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">{item.title}</p>
                <p className="text-xs mt-0.5" style={{ color: '#cbd5e1' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onOpenCallback}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-150 hover:opacity-90"
            style={{ background: '#f97316', boxShadow: '0 4px 20px rgba(249,115,22,0.35)' }}
          >
            <PhoneCall className="w-4 h-4" />
            Parler à un conseiller
          </button>
        </div>
      </div>
    </div>
  );
}
