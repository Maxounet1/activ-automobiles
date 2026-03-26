import Link from 'next/link';
import { ArrowRight, Banknote, Building2, Car, CircleCheck as CheckCircle, Gauge, LayoutGrid, Phone, Search, Settings2, Zap } from 'lucide-react';

export default function RechercheTab() {
  const criteria = [
    { icon: Banknote, title: 'Budget', desc: 'Prix clair, adapté à votre projet' },
    { icon: Car, title: 'Marque & modèle', desc: 'Sélection selon vos préférences' },
    { icon: Zap, title: 'Énergie', desc: 'Essence, Diesel, Hybride, Électrique' },
    { icon: Settings2, title: 'Boîte de vitesses', desc: 'Manuelle ou automatique' },
    { icon: LayoutGrid, title: 'Type de véhicule', desc: 'Citadine, Berline, SUV, Break, Utilitaire' },
  ]

  const included = [
    'Contrôle avant mise en vente',
    'Garantie incluse',
    'Solutions de financement',
    'Reprise possible de votre véhicule',
  ]

  const reassurance = [
    { icon: Building2, label: "Réseau d'agences" },
    { icon: Gauge, label: 'Véhicules contrôlés' },
    { icon: CheckCircle, label: 'Disponibilité réelle' },
  ]

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase"
          style={{ background: '#1A3F6F12', color: '#1A3F6F', border: '1px solid #1A3F6F25' }}>
          <Search className="w-3.5 h-3.5" />
          Pensée pour votre budget et vos besoins
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
          Trouvez le véhicule{' '}
          <span style={{ background: 'linear-gradient(92deg, #1A3F6F 0%, #2558A0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
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
          <h3 className="text-2xl font-black text-gray-900 mb-3 leading-snug">
            Une recherche qui s&apos;adapte à votre projet
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Que vous cherchiez un véhicule précis ou une solution adaptée à votre budget, notre moteur de recherche vous oriente vers les bonnes options.
          </p>
          <div className="space-y-3 mb-8">
            {criteria.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 hover:border-[#1A3F6F]/20 hover:bg-white hover:shadow-sm transition-all">
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
          <Link href="/voitures-occasion"
            className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl text-white transition-all hover:scale-[1.02] hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)', boxShadow: '0 6px 20px rgba(26,63,111,0.25)' }}>
            Lancer la recherche personnalisée
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right — trust + CTA */}
        <div className="space-y-6">
          {/* Transparency */}
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">
              Des résultats fiables, en toute transparence
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              Les véhicules proposés via la recherche sont réellement disponibles, préparés et proposés par nos agences.
            </p>
            <div className="flex flex-wrap gap-3">
              {reassurance.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5">
                  <Icon className="w-3.5 h-3.5 text-[#1A3F6F]" />
                  <span className="text-xs font-semibold text-gray-700">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Included */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8">
            <p className="text-sm font-black text-gray-900 mb-5">
              Tous les véhicules issus de la recherche bénéficient de :
            </p>
            <ul className="space-y-3">
              {included.map((item) => (
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
          <div className="rounded-3xl p-8 relative overflow-hidden border border-[#1A3F6F]/15"
            style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2548 100%)' }}>
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 60% at 85% 15%, rgba(255,255,255,0.07) 0%, transparent 60%)' }} />
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
              <Link href="/contact?sujet=recherche"
                className="inline-flex items-center gap-2 bg-white text-[#1A3F6F] font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-100 transition-all">
                Faire une demande précise
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="mb-16">
        <h3 className="text-2xl font-black text-gray-900 text-center mb-3">Comment trouver votre véhicule idéal ?</h3>
        <p className="text-gray-400 text-sm text-center mb-10 max-w-xl mx-auto">
          Trois approches pour trouver la voiture qui vous correspond.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { num: '01', title: 'Définissez vos critères', desc: 'Budget, marque, énergie, kilométrage, type de carrosserie… Affinez votre recherche selon vos besoins réels.' },
            { num: '02', title: 'Consultez les résultats', desc: 'Parcourez les véhicules correspondants avec photos, caractéristiques et prix. Tout est transparent.' },
            { num: '03', title: 'Contactez un conseiller', desc: 'Vous avez un doute ou un besoin spécifique ? Nos conseillers vous accompagnent par téléphone ou en agence.' },
          ].map((step) => (
            <div key={step.num} className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#1A3F6F]/30 hover:shadow-md transition-all">
              <span className="text-4xl font-black leading-none mb-4 block" style={{ color: 'rgba(26,63,111,0.10)' }}>{step.num}</span>
              <p className="font-bold text-gray-900 text-sm mb-2">{step.title}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini FAQ */}
      <div className="mb-16">
        <h3 className="text-xl font-black text-gray-900 text-center mb-8">Questions fréquentes — Recherche</h3>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: 'Puis-je demander un véhicule qui n’est pas en stock ?', a: 'Oui. Contactez nos conseillers avec vos critères précis. Nous pouvons sourcer un véhicule spécifique dans notre réseau.' },
            { q: 'Les véhicules affichés sont-ils réellement disponibles ?', a: 'Oui, à 100%. Notre stock est actualisé en temps réel. Si un véhicule est affiché, il est disponible.' },
            { q: 'Puis-je essayer un véhicule avant d’acheter ?', a: 'Bien sûr. Prenez rendez-vous en agence pour un essai routier. Nos conseillers vous accueillent du lundi au samedi.' },
          ].map((item) => (
            <div key={item.q} className="rounded-2xl bg-white border border-gray-200 p-5">
              <p className="font-bold text-sm text-gray-900 mb-2">{item.q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {[
          { value: '+800', label: 'Véhicules disponibles', sub: 'Actualisés en temps réel' },
          { value: '6', label: 'Agences partenaires', sub: 'Paris · Lyon · Bordeaux' },
          { value: '100%', label: 'Disponibilité réelle', sub: 'Aucun véhicule fantôme' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1"
            style={{
              background: '#fff',
              border: '1px solid rgba(26,63,111,0.13)',
              boxShadow: '0 2px 12px rgba(26,63,111,0.07)',
            }}
          >
            <p className="text-2xl font-black mb-1" style={{ color: '#1A3F6F' }}>{s.value}</p>
            <p className="text-sm font-bold mb-0.5" style={{ color: '#334155' }}>{s.label}</p>
            <p className="text-xs" style={{ color: '#94A3B8' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl overflow-hidden p-10 text-center relative border border-[#1A3F6F]/20"
        style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2548 100%)' }}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 80% 20%, rgba(255,255,255,0.07) 0%, transparent 60%)' }} />
        <div className="relative z-10">
          <h3 className="text-2xl font-black text-white mb-3">Commencez votre recherche maintenant</h3>
          <p className="text-blue-100/70 mb-7 max-w-lg mx-auto text-sm leading-relaxed">
            Accédez directement à notre catalogue filtrable et trouvez le véhicule qui correspond à votre projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/voitures-occasion"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1A3F6F] font-bold px-7 py-3.5 rounded-xl hover:bg-gray-100 transition-all text-sm">
              Voir tous les véhicules
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact?sujet=recherche"
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-semibold px-7 py-3.5 rounded-xl hover:border-white/50 transition-all text-sm">
              Faire une demande précise
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
