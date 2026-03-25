'use client';

import { Sparkles, Star, TrendingUp, Users } from 'lucide-react';

interface VehicleEditorialProps {
  brand: string;
  model: string;
  version: string;
  year: number;
  category: string;
  fuel: string;
  description: string;
  power: number;
  mileage: number;
}

const CATEGORY_PROFILE: Record<string, { title: string; profile: string; icon: string }> = {
  suv: { title: 'Le SUV qui réconcilie tout', profile: 'Familles, baroudeurs du week-end, cadres exigeants', icon: '🏔️' },
  berline: { title: 'L\'élégance à son meilleur', profile: 'Voyageurs fréquents, professionnels, amateurs de confort', icon: '🎯' },
  citadine: { title: 'La ville, sans compromis', profile: 'Urbains pragmatiques, primo-accédants, couples', icon: '🏙️' },
  break: { title: 'Le compagnon du quotidien', profile: 'Familles actives, sportifs, voyageurs en vadrouille', icon: '🧭' },
  coupé: { title: 'Le plaisir avant tout', profile: 'Passionnés de conduite, collectionneurs du quotidien', icon: '🏎️' },
  monospace: { title: 'L\'espace, enfin maîtrisé', profile: 'Grandes familles, artisans, associations', icon: '👨‍👩‍👧‍👦' },
  cabriolet: { title: 'Quand la route devient plaisir', profile: 'Amateurs d\'émotions, escapades ensoleillées', icon: '☀️' },
};

const FUEL_EDGE: Record<string, string> = {
  hybride: 'Son moteur hybride offre le meilleur des deux mondes : les performances d\'un thermique, la douceur et l\'économie d\'un électrique.',
  electrique: 'Zéro émission, silence de cathédrale, accélération instantanée — l\'électrique ne fait plus de concessions.',
  diesel: 'L\'autonomie exceptionnelle et le couple généreux font du diesel le choix idéal pour les grands rouleurs.',
  essence: 'La réactivité du moteur essence s\'exprime parfaitement dans ce segment, pour une conduite vivante et engagée.',
};

export default function VehicleEditorial({
  brand,
  model,
  version,
  year,
  category,
  fuel,
  description,
  power,
  mileage,
}: VehicleEditorialProps) {
  const profile = CATEGORY_PROFILE[category] ?? CATEGORY_PROFILE['berline'];
  const fuelEdge = FUEL_EDGE[fuel] ?? FUEL_EDGE['essence'];

  const strengths = [
    power >= 250 ? `${power} ch qui se ressentent à chaque accélération` : `${power} ch bien dosés, jamais en manque`,
    mileage < 10000 ? `Kilométrage très bas — quasi neuf` : mileage < 30000 ? `${mileage.toLocaleString('fr-FR')} km : à peine rodé` : `${mileage.toLocaleString('fr-FR')} km maîtrisés, entretien suivi`,
    `${year} : profite des dernières évolutions du modèle`,
  ];

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ background: '#fff', border: '1px solid #E8ECF0' }}
    >
      <div className="px-8 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #0B1829 0%, #1A3F6F 100%)' }}
          >
            <Sparkles size={16} style={{ color: '#fff' }} />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#94A3B8' }}>
              Pourquoi ce véhicule
            </p>
            <p className="text-[13px] font-black" style={{ color: '#0B1829' }}>
              {brand} {model} — Notre analyse
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-8">
          <div>
            <h2
              className="text-2xl font-black mb-2 leading-tight"
              style={{ color: '#0B1829', letterSpacing: '-0.02em' }}
            >
              {profile.title}
            </h2>
            <p className="text-sm leading-[1.75] mb-5" style={{ color: '#475569', maxWidth: '64ch' }}>
              {description}
            </p>
            <p className="text-sm leading-[1.75]" style={{ color: '#475569', maxWidth: '64ch' }}>
              {fuelEdge}
            </p>

            <div className="mt-6 space-y-2.5">
              {strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #0B1829 0%, #1A3F6F 100%)' }}
                  >
                    <span className="text-[9px] font-black text-white">{i + 1}</span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: '#0B1829' }}>{s}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div
              className="rounded-2xl p-4"
              style={{ background: '#F8FAFC', border: '1px solid #E8ECF0' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Users size={14} style={{ color: '#1A3F6F' }} />
                <p className="text-[11px] font-black uppercase tracking-wide" style={{ color: '#94A3B8' }}>
                  Profil idéal
                </p>
              </div>
              <p className="text-sm font-semibold leading-relaxed" style={{ color: '#0B1829' }}>
                {profile.profile}
              </p>
              <div
                className="mt-3 text-3xl text-center py-2 rounded-xl"
                style={{ background: '#fff', border: '1px solid #F1F5F9' }}
              >
                {profile.icon}
              </div>
            </div>

            <div
              className="rounded-2xl p-4"
              style={{ background: 'linear-gradient(135deg, #0B1829 0%, #1A3F6F 100%)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Star size={13} style={{ color: '#FBBF24' }} />
                <p className="text-[11px] font-black uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Coup de cœur
                </p>
              </div>
              <p className="text-xs leading-relaxed font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Ce {model} se distingue par un rapport finition/prix rarement atteint sur ce segment. Un achat sans regret.
              </p>
            </div>

            <div
              className="relative rounded-2xl p-4 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #EA580C 0%, #F97316 60%, #FB923C 100%)',
                boxShadow: '0 4px 24px rgba(234,88,12,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
                border: '1.5px solid rgba(255,255,255,0.15)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
                }}
              />
              <div className="relative flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.25)' }}
                >
                  <TrendingUp size={15} style={{ color: '#fff' }} />
                </div>
                <div>
                  <p className="text-xs font-black text-white">Forte demande</p>
                  <p className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    Ce modèle part vite — décision conseillée
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
