import Link from 'next/link';
import { ArrowRight, BadgeCheck, Car, ClipboardList, Cog, FileText, Headphones, Mail, MapPin, Phone, ScrollText, ShieldCheck, Truck, UserCheck } from 'lucide-react';

export default function AdministratifTab() {
  const docItems = [
    { icon: ScrollText, text: 'Certificat de cession & documents de vente' },
    { icon: Car, text: 'Dossier carte grise (changement de titulaire ou nouvelle immatriculation)' },
    { icon: ShieldCheck, text: 'Assurance temporaire ou attestation de vente' },
    { icon: UserCheck, text: 'Vérification des justificatifs (identité, domicile, permis, etc.)' },
    { icon: MapPin, text: 'Assistance sur mesure si vous achetez à distance' },
  ]

  const supportItems = [
    { icon: FileText, text: 'Suivi de dossier administratif' },
    { icon: Truck, text: "État d'avancement de la livraison" },
    { icon: ShieldCheck, text: 'Garantie, SAV, documents manquants' },
    { icon: Cog, text: "Conseils sur la mise en main ou l'entretien" },
  ]

  return (
    <div>
      {/* Intro header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase"
          style={{ background: '#37415112', color: '#374151', border: '1px solid #37415125' }}>
          <ClipboardList className="w-3.5 h-3.5" />
          Support administratif complet
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-5">
          Les démarches,{' '}
          <span style={{ background: 'linear-gradient(92deg, #374151 0%, #6B7280 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            on s&apos;en charge.
          </span>
        </h2>
        <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
          Parce qu&apos;on sait que personne n&apos;aime perdre du temps dans la paperasse, notre équipe administrative s&apos;occupe de tout pour vous.
        </p>
      </div>

      {/* Two-column section: documents + photo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-16">
        {/* Document list */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-200">
              <ScrollText className="w-4 h-4 text-gray-700" />
            </div>
            <div>
              <p className="font-black text-gray-900 text-base leading-tight">Documents & formalités</p>
              <p className="text-xs text-gray-400 mt-0.5">Tout géré par notre équipe</p>
            </div>
          </div>
          <ul className="space-y-3.5 mb-8 flex-1">
            {docItems.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3.5 group">
                <div className="w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-gray-300 transition-colors">
                  <Icon className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl px-5 py-4 flex items-start gap-3"
            style={{ background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)' }}>
            <BadgeCheck className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
            <p className="text-white/90 text-sm leading-relaxed font-medium">
              Votre carte grise arrive directement chez vous, sans passage en préfecture.
            </p>
          </div>
        </div>

        {/* Photo */}
        <div className="relative rounded-3xl overflow-hidden border border-gray-200 min-h-[380px] lg:min-h-0">
          <img
            src="/admin.webp"
            alt="Clés de voiture et documents administratifs avec deux personnes en concession"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-7">
            <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-1.5">Notre promesse</p>
            <p className="text-white font-black text-xl leading-tight">Zéro paperasse,<br />100% tranquillité.</p>
          </div>
        </div>
      </div>

      {/* Service client section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase"
              style={{ background: '#1A3F6F12', color: '#1A3F6F', border: '1px solid #1A3F6F25' }}>
              <Headphones className="w-3.5 h-3.5" />
              Service client & accompagnement
            </div>
            <h3 className="text-3xl font-black text-gray-900 leading-tight mb-4">
              Avant, pendant et{' '}
              <span style={{ background: 'linear-gradient(92deg, #1A3F6F 0%, #2558A0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                après votre achat.
              </span>
            </h3>
            <p className="text-gray-500 leading-relaxed mb-8">
              Acheter une voiture, c&apos;est un moment important. Notre mission, c&apos;est que tout se passe bien. Nos équipes sont disponibles par téléphone, email ou en agence pour répondre à vos questions.
            </p>
            <ul className="space-y-3.5 mb-8">
              {supportItems.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#1A3F6F]/8">
                    <Icon className="w-3.5 h-3.5 text-[#1A3F6F]" />
                  </div>
                  <span className="text-sm text-gray-700">{text}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl text-white transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)', boxShadow: '0 6px 20px rgba(26,63,111,0.25)' }}>
                Nous contacter
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Contact channels */}
          <div className="space-y-4">
            {[
              {
                icon: Phone,
                title: 'Par téléphone',
                desc: 'Un interlocuteur direct, pas un répondeur. Du lundi au samedi.',
                color: '#1A3F6F',
              },
              {
                icon: Mail,
                title: 'Par email',
                desc: 'Réponse sous 24h ouvrées à toutes vos questions.',
                color: '#0D7A4E',
              },
              {
                icon: MapPin,
                title: 'En agence',
                desc: 'Nos équipes vous accueillent dans toutes nos agences pour un suivi personnalisé.',
                color: '#B45309',
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: '#fff',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 8px rgba(11,24,41,0.05)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}12` }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div>
                  <p className="font-bold text-sm mb-1" style={{ color: '#0B1829' }}>{title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>{desc}</p>
                </div>
              </div>
            ))}
            <div className="rounded-2xl px-5 py-4 border border-gray-200 bg-gray-50 flex items-center gap-3">
              <BadgeCheck className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <p className="text-gray-600 text-sm font-medium">
                Un vrai suivi humain, sans plateforme ni répondeur.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="mb-16">
        <h3 className="text-2xl font-black text-gray-900 text-center mb-3">Votre dossier en 3 étapes</h3>
        <p className="text-gray-400 text-sm text-center mb-10 max-w-xl mx-auto">
          De l&apos;achat à la réception de votre carte grise, on gère tout.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { num: '01', title: 'Constitution du dossier', desc: 'Nous rassemblons les pièces nécessaires : pièce d’identité, justificatif de domicile, permis de conduire. Nous vérifions tout pour éviter les retours.' },
            { num: '02', title: 'Dépôt et suivi', desc: 'Votre dossier est déposé auprès de l’ANTS. Nous suivons l’avancement et vous tenons informé par email ou téléphone.' },
            { num: '03', title: 'Réception de la carte grise', desc: 'Votre carte grise arrive directement chez vous par courrier recommandé, sans déplacement en préfecture.' },
          ].map((step) => (
            <div key={step.num} className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-md transition-all">
              <span className="text-4xl font-black leading-none mb-4 block" style={{ color: 'rgba(55,65,81,0.10)' }}>{step.num}</span>
              <p className="font-bold text-gray-900 text-sm mb-2">{step.title}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini FAQ */}
      <div className="mb-16">
        <h3 className="text-xl font-black text-gray-900 text-center mb-8">Questions fréquentes — Administratif</h3>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: 'Dois-je me déplacer en préfecture ?', a: 'Non. Nous gérons l’intégralité des démarches à votre place. La carte grise est envoyée directement chez vous par courrier.' },
            { q: 'Quel délai pour recevoir ma carte grise ?', a: 'En général, vous recevez votre carte grise sous 5 à 10 jours ouvrés après validation du dossier. Un certificat provisoire vous permet de circuler en attendant.' },
            { q: 'Le service est-il payant ?', a: 'Le coût des formalités (taxe régionale, frais de carte grise) est à votre charge. La gestion administrative par notre équipe est incluse dans l’achat.' },
          ].map((item) => (
            <div key={item.q} className="rounded-2xl bg-white border border-gray-200 p-5">
              <p className="font-bold text-sm text-gray-900 mb-2">{item.q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats band */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {[
          { value: '7j/7', label: 'Disponibilité équipe', sub: 'Par email même le weekend' },
          { value: '< 24h', label: 'Délai de réponse', sub: 'Garanti sur toutes demandes' },
          { value: '100%', label: 'Dossiers gérés en interne', sub: 'Sans sous-traitance' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1"
            style={{
              background: '#fff',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 12px rgba(11,24,41,0.06)',
            }}
          >
            <p className="text-3xl font-black mb-1" style={{ color: '#0B1829' }}>{s.value}</p>
            <p className="text-sm font-bold mb-0.5" style={{ color: '#334155' }}>{s.label}</p>
            <p className="text-xs" style={{ color: '#94A3B8' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-3xl overflow-hidden p-10 text-center relative border border-gray-300"
        style={{ background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' }}>
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 60%)' }} />
        <div className="relative z-10">
          <h3 className="text-2xl font-black text-white mb-3">Une question ? On est là.</h3>
          <p className="text-white/60 mb-7 max-w-lg mx-auto text-sm leading-relaxed">
            Téléphone, email ou en agence — choisissez le canal qui vous convient. Votre dossier sera suivi par une vraie personne, du début à la fin.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-bold px-7 py-3.5 rounded-xl hover:bg-gray-100 transition-all text-sm">
              Nous contacter
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/agences"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl hover:border-white/40 transition-all text-sm">
              Trouver une agence
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
