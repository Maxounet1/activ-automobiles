import Link from 'next/link';
import { ArrowRight, CircleCheck as CheckCircle, Tag, HelpCircle } from 'lucide-react';

export default function RepriseTab() {
  const steps = [
    { num: '01', title: 'Estimation en ligne', desc: 'Renseignez les informations de votre véhicule (marque, modèle, kilométrage, état). Vous recevez une première estimation indicative en quelques minutes.' },
    { num: '02', title: 'Offre ferme sous 24h', desc: 'Nos experts analysent votre dossier et vous transmettent une offre de reprise ferme par email ou téléphone, sans engagement de votre part.' },
    { num: '03', title: 'Expertise en agence', desc: 'Si l\'offre vous convient, prenez rendez-vous en agence. Nos techniciens réalisent un contrôle rapide pour confirmer le montant.' },
    { num: '04', title: 'Paiement ou déduction', desc: 'Recevez le paiement immédiat par virement ou utilisez la valeur de reprise comme apport pour votre prochain véhicule.' },
  ];

  const faq = [
    { q: 'Mon véhicule a plus de 150 000 km, est-il accepté ?', a: 'Oui. Nous reprenons tous les véhicules, quel que soit le kilométrage, la marque ou l\'ancienneté. L\'offre sera ajustée en conséquence.' },
    { q: 'L\'estimation est-elle engageante ?', a: 'Non. L\'estimation en ligne est indicative et gratuite. Vous êtes libre d\'accepter ou de refuser l\'offre ferme sans aucun frais.' },
    { q: 'Puis-je faire reprendre mon véhicule sans en acheter un nouveau ?', a: 'Tout à fait. La reprise peut se faire indépendamment d\'un achat. Vous recevrez un paiement par virement sous 48h.' },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase"
            style={{ background: '#1A3F6F12', color: '#1A3F6F', border: '1px solid #1A3F6F25' }}>
            <Tag className="w-3.5 h-3.5" />
            Estimation gratuite — Offre sous 24h
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
            Reprise de votre<br />
            <span style={{ background: 'linear-gradient(92deg, #1A3F6F 0%, #2558A0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              véhicule au juste prix.
            </span>
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Nous reprenons votre véhicule quel que soit son état — kilométrage, ancienneté ou marque — avec une estimation gratuite et une offre ferme sous 24h. Paiement immédiat ou déduction sur votre prochain achat.
          </p>
          <div className="space-y-3 mb-8">
            {[
              'Estimation en ligne, sans déplacement',
              'Offre ferme sous 24h',
              'Paiement immédiat ou déduction sur votre achat',
              'Tous véhicules acceptés, quelle que soit la marque',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#1A3F6F15' }}>
                  <CheckCircle className="w-3 h-3 text-[#1A3F6F]" />
                </div>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <Link href="/services/reprise"
            className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl text-white transition-all hover:scale-[1.02] hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)', boxShadow: '0 6px 20px rgba(26,63,111,0.25)' }}>
            Estimer ma reprise
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Photo */}
        <div className="relative rounded-3xl overflow-hidden border border-gray-200 min-h-[380px] lg:min-h-[480px]">
          <img
            src="/Reprisehome.webp"
            alt="Véhicule en reprise dans une concession Activ Automobiles"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <CheckCircle className="w-4 h-4 text-[#1A3F6F]" />
              <span className="text-[#1A3F6F] text-xs font-bold">Tous véhicules repris, toutes marques</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats band */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        {[
          { value: '+1 200', label: 'Reprises effectuées' },
          { value: '< 24h', label: "Délai moyen d'offre" },
          { value: '100%', label: 'Sans engagement' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-1"
            style={{
              background: '#fff',
              border: '1px solid rgba(26,63,111,0.13)',
              boxShadow: '0 2px 12px rgba(26,63,111,0.07)',
            }}
          >
            <p className="text-2xl font-black mb-1" style={{ color: '#1A3F6F' }}>{s.value}</p>
            <p className="text-xs" style={{ color: '#64748B' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Process steps */}
      <div className="mb-16">
        <h3 className="text-2xl font-black text-gray-900 text-center mb-3">Comment ça marche ?</h3>
        <p className="text-gray-400 text-sm text-center mb-10 max-w-xl mx-auto">
          Un processus simple en 4 étapes, sans engagement et sans surprise.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#1A3F6F]/30 hover:shadow-md transition-all group"
            >
              <span className="text-4xl font-black leading-none mb-4 block" style={{ color: 'rgba(26,63,111,0.10)' }}>
                {step.num}
              </span>
              <p className="font-bold text-gray-900 text-sm mb-2">{step.title}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini FAQ */}
      <div className="mb-16">
        <div className="flex items-center gap-2 justify-center mb-8">
          <HelpCircle className="w-5 h-5" style={{ color: '#1A3F6F' }} />
          <h3 className="text-xl font-black text-gray-900">Questions fréquentes — Reprise</h3>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faq.map((item) => (
            <div key={item.q} className="rounded-2xl bg-white border border-gray-200 p-5">
              <p className="font-bold text-sm text-gray-900 mb-2">{item.q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-3xl overflow-hidden p-10 text-center relative border border-[#1A3F6F]/20"
        style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2548 100%)' }}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)' }} />
        <div className="relative z-10">
          <h3 className="text-2xl font-black text-white mb-3">Reprise + achat : la solution malin</h3>
          <p className="text-blue-100/80 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            Utilisez la valeur de votre reprise comme apport pour l&apos;achat de votre prochain véhicule. Moins de crédit, plus d&apos;économies.
          </p>
          <Link href="/services/reprise"
            className="inline-flex items-center gap-2 bg-white text-[#1A3F6F] font-bold px-7 py-3.5 rounded-xl hover:bg-gray-100 transition-all text-sm">
            Demander une estimation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
