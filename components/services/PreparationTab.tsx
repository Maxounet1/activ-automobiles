import Link from 'next/link';
import { ArrowRight, CircleCheck as CheckCircle, Cpu, FileText, Gauge, ScanLine, Sparkles, Wrench } from 'lucide-react';

export default function PreparationTab() {
  const checklist = [
    {
      icon: Wrench,
      title: 'Contrôle mécanique complet',
      desc: 'Moteur, freins, boîte de vitesses, suspension, pneus, pression des pneumatiques, niveaux — chaque point est inspecté et validé par nos techniciens.',
      color: '#7C3D12',
    },
    {
      icon: ScanLine,
      title: 'Passage au contrôle technique',
      desc: 'Si le contrôle technique est expiré ou proche de l\'expiration, le véhicule passe obligatoirement en centre agréé avant livraison.',
      color: '#7C3D12',
    },
    {
      icon: Cpu,
      title: 'Diagnostic électronique',
      desc: 'Lecture complète des calculateurs (ABS, ESP, airbags, moteur). Aucun voyant ne doit rester allumé à la livraison.',
      color: '#7C3D12',
    },
    {
      icon: Sparkles,
      title: 'Nettoyage intérieur & extérieur',
      desc: 'Lavage carrosserie, nettoyage de l\'habitacle et des vitres. Le véhicule est propre et présentable à la remise des clés.',
      color: '#7C3D12',
    },
    {
      icon: FileText,
      title: 'Vérification des documents administratifs',
      desc: 'Carte grise, carnet d\'entretien, certificat de cession, contrôle technique — tout est vérifié et mis en ordre avant remise des clés.',
      color: '#7C3D12',
    },
  ]

  return (
    <div>
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase"
            style={{ background: '#7C3D1212', color: '#7C3D12', border: '1px solid #7C3D1225' }}
          >
            <Wrench className="w-3.5 h-3.5" />
            Préparation avant livraison
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
            Préparation &amp; Contrôle{' '}
            <span
              style={{
                background: 'linear-gradient(92deg, #7C3D12 0%, #B45309 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              avant livraison.
            </span>
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Avant de vous remettre les clés, chaque véhicule passe par une préparation complète dans nos ateliers. Rien n&apos;est laissé au hasard : mécanique, sécurité, documents — tout est vérifié.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { icon: Gauge, label: '100 points de contrôle' },
              { icon: ScanLine, label: 'Diagnostic électronique' },
              { icon: FileText, label: 'Documents vérifiés' },
              { icon: CheckCircle, label: 'Prêt à rouler' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 bg-[#7C3D12]/5 border border-[#7C3D12]/15 rounded-xl px-4 py-3"
              >
                <Icon className="w-4 h-4 text-[#7C3D12] flex-shrink-0" />
                <span className="text-xs font-semibold text-gray-800">{label}</span>
              </div>
            ))}
          </div>
          <Link
            href="/voitures-occasion"
            className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl text-white transition-all hover:scale-[1.02] hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #7C3D12 0%, #5c2d0e 100%)',
              boxShadow: '0 6px 20px rgba(124,61,18,0.28)',
            }}
          >
            Voir nos véhicules préparés
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Photo */}
        <div className="relative rounded-3xl overflow-hidden border border-gray-200 min-h-[380px] lg:min-h-[480px]">
          <img
            src="/preparation.webp"
            alt="Véhicule en cours de préparation dans l'atelier Activ Automobiles"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-7">
            <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-1.5">Notre atelier</p>
            <p className="text-white font-black text-xl leading-tight">
              Impeccable<br />avant de partir.
            </p>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="mb-16">
        <h3 className="text-2xl font-black text-gray-900 text-center mb-3">Ce que l&apos;on vérifie, sans exception</h3>
        <p className="text-gray-400 text-sm text-center mb-10 max-w-xl mx-auto">
          Chaque point est contrôlé par nos techniciens certifiés avant que le véhicule quitte nos ateliers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {checklist.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={title}
              className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#7C3D12]/30 hover:shadow-md transition-all group"
            >
              <span className="absolute top-4 right-5 text-[11px] font-black text-gray-200 tabular-nums">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform"
                style={{ background: '#7C3D1210' }}
              >
                <Icon className="w-5 h-5" style={{ color: '#7C3D12' }} />
              </div>
              <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Promise banner */}
      <div className="mb-16 rounded-3xl overflow-hidden border border-[#7C3D12]/20 p-10 relative"
        style={{ background: 'linear-gradient(135deg, #7C3D12 0%, #5c2d0e 100%)' }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 70% at 85% 15%, rgba(255,255,255,0.07) 0%, transparent 60%)' }}
        />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-orange-200/70 text-xs font-bold tracking-widest uppercase mb-3">Notre objectif</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
              Vous livrer une voiture fiable, propre et prête à rouler.
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Chaque véhicule qui sort de nos ateliers a été soigneusement préparé, inspecté et validé. Vous ne découvrez pas votre voiture avec des surprises — vous la découvrez prête.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '100+', label: 'Points de contrôle' },
              { value: '100%', label: 'Véhicules inspectés' },
              { value: '0', label: 'Surprise à la livraison' },
            ].map((s) => (
              <div key={s.label} className="text-center bg-white/10 rounded-2xl p-4 border border-white/15">
                <p className="text-2xl font-black text-white mb-1">{s.value}</p>
                <p className="text-white/60 text-xs leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="mb-16">
        <h3 className="text-2xl font-black text-gray-900 text-center mb-3">Le parcours de préparation</h3>
        <p className="text-gray-400 text-sm text-center mb-10 max-w-xl mx-auto">
          Chaque véhicule suit un protocole rigoureux avant d&apos;être proposé à la vente.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { num: '01', title: 'Réception & inventaire', desc: 'Le véhicule est réceptionné, photographié et enregistré. Un état des lieux complet est réalisé.' },
            { num: '02', title: 'Contrôle mécanique', desc: 'Inspection moteur, freins, boite, suspension, pneus. Les pièces défectueuses sont remplacées.' },
            { num: '03', title: 'Diagnostic électronique', desc: 'Lecture complète des calculateurs. Aucun voyant ne doit rester allumé à la livraison.' },
            { num: '04', title: 'Nettoyage & mise en vente', desc: 'Lavage complet, nettoyage intérieur, vérification documentaire. Le véhicule est prêt.' },
          ].map((step) => (
            <div key={step.num} className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#7C3D12]/30 hover:shadow-md transition-all">
              <span className="text-4xl font-black leading-none mb-4 block" style={{ color: 'rgba(124,61,18,0.10)' }}>{step.num}</span>
              <p className="font-bold text-gray-900 text-sm mb-2">{step.title}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini FAQ */}
      <div className="mb-16">
        <h3 className="text-xl font-black text-gray-900 text-center mb-8">Questions fréquentes — Préparation</h3>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: 'Combien de temps dure la préparation d’un véhicule ?', a: 'En moyenne 3 à 5 jours ouvrés. Si des pièces doivent être commandées, le délai peut s’allonger de quelques jours.' },
            { q: 'Le contrôle technique est-il inclus ?', a: 'Oui. Si le contrôle technique est expiré ou proche de l’être, le véhicule passe en centre agréé avant livraison, sans frais supplémentaires.' },
            { q: 'Puis-je demander des travaux supplémentaires ?', a: 'Oui, nous pouvons réaliser des prestations complémentaires sur demande (polissage, traitement céramique, etc.). Contactez-nous pour un devis.' },
          ].map((item) => (
            <div key={item.q} className="rounded-2xl bg-white border border-gray-200 p-5">
              <p className="font-bold text-sm text-gray-900 mb-2">{item.q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-500 text-sm mb-6">
          Vous avez une question sur la préparation d&apos;un véhicule spécifique ?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 font-bold text-sm px-8 py-3.5 rounded-xl text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #7C3D12 0%, #5c2d0e 100%)', boxShadow: '0 6px 24px rgba(124,61,18,0.25)' }}
          >
            Nous contacter
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/voitures-occasion"
            className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-3.5 rounded-xl text-[#7C3D12] border border-[#7C3D12]/30 hover:bg-[#7C3D12]/5 hover:border-[#7C3D12]/60 transition-all"
          >
            Voir nos véhicules
          </Link>
        </div>
      </div>
    </div>
  )
}
