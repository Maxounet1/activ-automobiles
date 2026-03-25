import Link from 'next/link'
import {
  ArrowRight,
  Banknote,
  Car,
  Zap,
  Settings2,
  LayoutGrid,
  ShieldCheck,
  CheckCircle,
  Gauge,
  Building2,
  Phone,
} from 'lucide-react'

const CRITERIA = [
  {
    icon: Banknote,
    title: 'Budget',
    desc: 'Prix clair, adapté à votre projet',
    color: '#1A3F6F',
  },
  {
    icon: Car,
    title: 'Marque & modèle',
    desc: 'Sélection selon vos préférences',
    color: '#1A3F6F',
  },
  {
    icon: Zap,
    title: 'Énergie',
    desc: 'Essence, Diesel, Hybride, Électrique',
    color: '#1A3F6F',
  },
  {
    icon: Settings2,
    title: 'Boîte de vitesses',
    desc: 'Manuelle ou automatique',
    color: '#1A3F6F',
  },
  {
    icon: LayoutGrid,
    title: 'Type de véhicule',
    desc: 'Citadine, Berline, SUV, Break, Utilitaire',
    color: '#1A3F6F',
  },
]

const REASSURANCE = [
  { icon: Building2, label: "Réseau d'agences" },
  { icon: Gauge, label: 'Véhicules contrôlés' },
  { icon: CheckCircle, label: 'Disponibilité réelle' },
]

const INCLUDED = [
  'Contrôle avant mise en vente',
  'Garantie incluse',
  'Solutions de financement',
  'Reprise possible de votre véhicule',
]

export default function PersonalizedSearchSection() {
  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#1A3F6F]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
              Recherche personnalisée
            </span>
            <div className="h-px w-10 bg-[#1A3F6F]" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
            Trouvez le véhicule{' '}
            <span
              style={{
                background: 'linear-gradient(92deg, #1A3F6F 0%, #2558A0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              fait pour vous.
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Définissez vos critères essentiels et accédez rapidement aux véhicules disponibles dans notre réseau. Simple, clair, sans perdre de temps.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">

          {/* Left — criteria */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase"
              style={{ background: '#1A3F6F0D', color: '#1A3F6F', border: '1px solid #1A3F6F20' }}>
              Pensée pour votre budget et vos besoins
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3 leading-snug">
              Une recherche qui s&apos;adapte<br />à votre projet
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Que vous cherchiez un véhicule précis ou une solution adaptée à votre budget, notre moteur de recherche vous oriente vers les bonnes options.
            </p>

            <div className="space-y-3">
              {CRITERIA.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 hover:border-[#1A3F6F]/20 hover:bg-white hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#1A3F6F]/8">
                    <Icon className="w-4 h-4 text-[#1A3F6F]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/voitures-occasion"
              className="mt-8 inline-flex items-center gap-2 font-bold text-sm px-8 py-3.5 rounded-xl text-white transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
                boxShadow: '0 6px 20px rgba(26,63,111,0.25)',
              }}
            >
              Lancer la recherche personnalisée
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — trust + CTA */}
          <div className="space-y-6">
            {/* Transparency block */}
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">
                Des résultats fiables, en toute transparence
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Les véhicules proposés via la recherche sont réellement disponibles, préparés et proposés par nos agences.
              </p>
              <div className="flex flex-wrap gap-3">
                {REASSURANCE.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#1A3F6F]" />
                    <span className="text-xs font-semibold text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included block */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <p className="text-sm font-black text-gray-900 mb-5">
                Tous les véhicules issus de la recherche bénéficient de :
              </p>
              <ul className="space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-[#1A3F6F]/8">
                      <CheckCircle className="w-3 h-3 text-[#1A3F6F]" />
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advisor CTA */}
            <div
              className="rounded-3xl p-8 relative overflow-hidden border border-[#1A3F6F]/15"
              style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2548 100%)' }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 60% at 85% 15%, rgba(255,255,255,0.07) 0%, transparent 60%)' }}
              />
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <p className="text-white font-black text-base mb-2 leading-snug">
                  Vous avez un projet précis ?
                </p>
                <p className="text-blue-200/80 text-sm leading-relaxed mb-6">
                  Si aucun véhicule ne correspond exactement à votre recherche, nos conseillers peuvent vous accompagner et vous proposer une alternative adaptée.
                </p>
                <Link
                  href="/contact?sujet=recherche"
                  className="inline-flex items-center gap-2 bg-white text-[#1A3F6F] font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-100 transition-all"
                >
                  Faire une demande précise
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
