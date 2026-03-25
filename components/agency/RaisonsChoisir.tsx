import { Users, ShieldCheck, Car, Banknote, HeartHandshake } from 'lucide-react';

const RAISONS = [
  {
    icon: Users,
    title: 'Équipe disponible sur place',
    desc: 'Nos conseillers vous reçoivent en agence, sans rendez-vous, du lundi au samedi.',
  },
  {
    icon: ShieldCheck,
    title: 'Véhicules préparés et contrôlés',
    desc: 'Chaque voiture passe un contrôle complet avant la vente. Historique transparent.',
  },
  {
    icon: Car,
    title: 'Essais sur route possibles',
    desc: "Testez le véhicule avant d'acheter. Pas de décision sans essai.",
  },
  {
    icon: Banknote,
    title: 'Financement et reprise',
    desc: 'Solutions de financement adaptées à votre profil. Reprise de votre ancien véhicule au juste prix.',
  },
  {
    icon: HeartHandshake,
    title: 'Accompagnement personnalisé',
    desc: 'De la recherche à la livraison, un seul interlocuteur vous suit de A à Z.',
  },
];

export default function RaisonsChoisir({ city }: { city: string }) {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#1A3F6F]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
              Pourquoi nous choisir
            </span>
          </div>
          <h2 className="text-3xl font-black text-gray-900">
            Ce qui fait la différence à {city}
          </h2>
        </div>

        <ul className="space-y-3">
          {RAISONS.map(({ icon: Icon, title, desc }, i) => (
            <li
              key={title}
              className="relative flex items-start gap-5 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 group"
              style={{
                background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2548 100%)',
                border: '1px solid rgba(16,185,129,0.28)',
                boxShadow: '0 6px 24px rgba(16,185,129,0.08), 0 2px 8px rgba(0,0,0,0.18)',
              }}
            >
              {/* Accent ligne haute */}
              <div
                className="absolute top-0 left-0 right-0 pointer-events-none"
                style={{
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.50) 40%, transparent 100%)',
                }}
              />
              {/* Halo émeraude */}
              <div
                className="absolute -bottom-6 -right-6 pointer-events-none"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
                }}
              />
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: 'rgba(16,185,129,0.14)',
                  border: '1px solid rgba(16,185,129,0.26)',
                }}
              >
                <Icon className="w-5 h-5" style={{ color: '#10B981' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm mb-0.5">{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{desc}</p>
              </div>
              <span
                className="absolute right-4 bottom-2 font-black tabular-nums select-none pointer-events-none leading-none"
                style={{
                  fontSize: '5.5rem',
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.10)',
                  letterSpacing: '-0.04em',
                }}
                aria-hidden="true"
              >
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
