import Link from 'next/link';
import { ArrowRight, Car, CircleCheck as CheckCircle, Cog, Disc, ShieldCheck, Wrench, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GarantieTab() {
  const covered = [
    { icon: Cog, title: 'Moteur', items: ['Bloc moteur', 'Distribution & culasse', 'Turbo / Compresseur', 'Injection'] },
    { icon: Car, title: 'Boîte de vitesses', items: ['Boîte manuelle / auto', 'Transmission intégrale', 'Différentiel', 'Cardans'] },
    { icon: Zap, title: 'Électronique', items: ['Calculateurs ECU', 'Capteurs ABS / ESP', 'Climatisation', 'Alternateur / démarreur'] },
    { icon: Disc, title: 'Freinage & direction', items: ['Maître-cylindre', 'Servofrein', 'Direction assistée', 'Colonne de direction'] },
  ]
  const extensions = [
    { duration: '12 mois', label: 'Inclus', price: 'Offert', features: ['Moteur & boîte', 'Électronique', 'Freinage', 'Direction'], highlight: false },
    { duration: '24 mois', label: 'Extension', price: 'Dès 299€', features: ['Tout ce qui précède', 'Assistance 24h/24', 'Véhicule de prêt', 'Priorité interventions'], highlight: true },
    { duration: '36 mois', label: 'Extension Premium', price: 'Dès 499€', features: ['Tout ce qui précède', 'Couverture étendue', 'Kilométrage illimité', 'Garantie valeur à neuf'], highlight: false },
  ]
  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase"
          style={{ background: '#0D7A4E12', color: '#0D7A4E', border: '1px solid #0D7A4E25' }}>
          <ShieldCheck className="w-3.5 h-3.5" />
          12 mois inclus sur tous nos véhicules
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
          Roulez en{' '}
          <span style={{ background: 'linear-gradient(92deg, #0D7A4E 0%, #0a5e3a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            toute sérénité.
          </span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Chaque véhicule Activ Automobiles est vendu avec une garantie 12 mois incluse dans le prix. Moteur, boîte de vitesses, électronique, freinage — vous êtes couverts sans frais cachés ni exclusions incompréhensibles.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {[
          { value: '12 mois', label: 'Garantie incluse' },
          { value: '36 mois', label: 'Extension possible' },
          { value: '100%', label: 'Véhicules couverts' },
          { value: 'France', label: 'Entière couverte' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-4 text-center transition-all duration-200 hover:-translate-y-1"
            style={{
              background: '#fff',
              border: '1px solid rgba(13,122,78,0.15)',
              boxShadow: '0 2px 12px rgba(13,122,78,0.07)',
            }}
          >
            <p className="text-xl font-black mb-0.5" style={{ color: '#0D7A4E' }}>{s.value}</p>
            <p className="text-xs" style={{ color: '#64748B' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Coverage grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {covered.map(({ icon: Icon, title, items }) => (
          <div
            key={title}
            className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              background: '#fff',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 10px rgba(11,24,41,0.05)',
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: '#0D7A4E12' }}>
              <Icon className="w-4 h-4" style={{ color: '#0D7A4E' }} />
            </div>
            <p className="font-bold text-sm mb-3" style={{ color: '#0B1829' }}>{title}</p>
            <ul className="space-y-1.5">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: '#0D7A4E' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Non covered */}
      <div className="mb-14 bg-gray-50 border border-gray-200 rounded-2xl p-5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Wrench className="w-3.5 h-3.5" /> Éléments non couverts (usure normale)
        </p>
        <p className="text-gray-500 text-sm leading-relaxed">
          Pneumatiques, plaquettes de frein, disques, filtres, ampoules, essuie-glaces, embrayage. Les dommages résultant d&apos;un accident ou d&apos;une utilisation abusive ne sont pas couverts.
        </p>
      </div>

      {/* Process Steps */}
      <div className="mb-14">
        <h3 className="text-2xl font-black text-gray-900 text-center mb-3">Comment fonctionne la garantie ?</h3>
        <p className="text-gray-400 text-sm text-center mb-10 max-w-xl mx-auto">
          Un processus simple et transparent, sans franchise cachée.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { num: '01', title: 'Activation automatique', desc: 'La garantie 12 mois démarre automatiquement à la date de livraison ou de remise en agence. Aucune démarche de votre part.' },
            { num: '02', title: 'Déclaration de sinistre', desc: 'En cas de panne couverte, contactez notre service client. Nous vous orientons vers un garage agréé proche de chez vous.' },
            { num: '03', title: 'Réparation prise en charge', desc: 'Les réparations couvertes sont intégralement prises en charge. Vous récupérez votre véhicule sans frais supplémentaires.' },
          ].map((step) => (
            <div key={step.num} className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#0D7A4E]/30 hover:shadow-md transition-all">
              <span className="text-4xl font-black leading-none mb-4 block" style={{ color: 'rgba(13,122,78,0.10)' }}>{step.num}</span>
              <p className="font-bold text-gray-900 text-sm mb-2">{step.title}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini FAQ */}
      <div className="mb-14">
        <h3 className="text-xl font-black text-gray-900 text-center mb-8">Questions fréquentes — Garantie</h3>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: 'La garantie est-elle valable dans toute la France ?', a: 'Oui. La garantie est nationale. Vous pouvez faire réparer votre véhicule dans n’importe quel garage agréé partenaire.' },
            { q: 'Y a-t-il une franchise à payer ?', a: 'Les conditions précises dépendent du contrat de garantie. Dans la majorité des cas, il n’y a pas de franchise sur la garantie 12 mois incluse.' },
            { q: 'Puis-je étendre la garantie après l’achat ?', a: 'Oui, vous pouvez souscrire une extension de garantie (24 ou 36 mois) au moment de l’achat ou dans les 30 jours suivants.' },
          ].map((item) => (
            <div key={item.q} className="rounded-2xl bg-white border border-gray-200 p-5">
              <p className="font-bold text-sm text-gray-900 mb-2">{item.q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Extension plans */}
      <div className="mb-14">
        <h3 className="text-2xl font-black text-gray-900 text-center mb-8">Étendez votre garantie jusqu&apos;à 36 mois</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {extensions.map((ext) => (
            <div key={ext.duration}
              className={cn(
                'relative rounded-2xl p-7 border transition-all',
                ext.highlight ? 'border-[#0D7A4E] bg-[#0D7A4E]/4 shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300'
              )}>
              {ext.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold px-4 py-1 rounded-full whitespace-nowrap"
                  style={{ background: '#0D7A4E' }}>
                  Recommandé
                </div>
              )}
              <div className="text-center mb-5">
                <p className="text-xs text-gray-400 font-medium mb-1">{ext.label}</p>
                <p className="text-3xl font-black text-gray-900 mb-1">{ext.duration}</p>
                <p className="text-base font-bold" style={{ color: '#0D7A4E' }}>{ext.price}</p>
              </div>
              <ul className="space-y-2.5 mb-6">
                {ext.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#0D7A4E' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact"
                className={cn(
                  'block w-full text-center font-bold py-3 rounded-xl text-sm transition-all',
                  ext.highlight ? 'text-white hover:opacity-90' : 'border border-gray-200 text-gray-700 hover:border-[#0D7A4E]/40 hover:text-[#0D7A4E]'
                )}
                style={ext.highlight ? { background: '#0D7A4E' } : undefined}>
                {ext.price === 'Offert' ? 'Inclus dans tout achat' : 'Demander un devis'}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-3xl overflow-hidden p-10 text-center relative border border-[#0D7A4E]/20"
        style={{ background: 'linear-gradient(135deg, #0D7A4E 0%, #065c39 100%)' }}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 80% 20%, rgba(255,255,255,0.07) 0%, transparent 60%)' }} />
        <div className="relative z-10">
          <h3 className="text-2xl font-black text-white mb-3">Tous nos véhicules sont protégés</h3>
          <p className="text-white/70 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            La garantie 12 mois est automatiquement activée à la date de livraison ou de remise en agence.
          </p>
          <Link href="/voitures-occasion"
            className="inline-flex items-center gap-2 bg-white text-[#0D7A4E] font-bold px-7 py-3.5 rounded-xl hover:bg-gray-100 transition-all text-sm">
            Voir nos véhicules garantis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
