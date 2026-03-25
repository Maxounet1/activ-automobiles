import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/utils'
import { ChevronRight, ArrowRight, Truck, Wrench, ClipboardCheck, KeyRound, MapPin, Clock, ShieldCheck, CalendarCheck, CircleCheck as CheckCircle, Car, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Livraison Voiture Partout en France | Activ Automobiles',
  description:
    "Activ Automobiles livre votre voiture d'occasion dans un centre partenaire partout en France, sous 10 à 15 jours. Véhicule préparé, contrôlé, garanti. Livraison sécurisée sans surprise.",
  keywords: [
    'livraison voiture occasion',
    'livraison domicile voiture',
    'acheter voiture en ligne livraison',
    'livraison centre partenaire',
    'livraison automobile France',
    'Activ Automobiles livraison',
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/services/livraison` },
  openGraph: {
    title: 'Livraison Voiture Partout en France | Activ Automobiles',
    description:
      "Livraison en centre partenaire partout en France sous 10-15 jours. Véhicule préparé et garanti.",
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.activ-automobiles.fr/services/livraison',
    siteName: 'Activ Automobiles',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Livraison Voiture Partout en France | Activ Automobiles',
    description: 'Livraison en centre partenaire sous 10-15 jours, véhicule préparé et garanti.',
  },
}

const STEPS = [
  {
    num: '01',
    icon: Car,
    title: 'Vous choisissez votre véhicule',
    desc: 'En ligne ou en agence, sélectionnez votre futur véhicule. Notre équipe prend en charge la suite.',
  },
  {
    num: '02',
    icon: Wrench,
    title: 'Préparation en atelier',
    desc: 'Révision complète, nettoyage professionnel, diagnostic électronique — 10 à 15 jours pour un véhicule impeccable.',
  },
  {
    num: '03',
    icon: ClipboardCheck,
    title: 'Dossier administratif bouclé',
    desc: "Carte grise, assurance, cession — on s'occupe de tous les documents pour vous.",
  },
  {
    num: '04',
    icon: MapPin,
    title: 'Remise en centre partenaire',
    desc: 'Votre voiture est livrée dans un centre partenaire proche de chez vous, partout en France métropolitaine.',
  },
]

const AVANTAGES = [
  {
    icon: ShieldCheck,
    title: 'Véhicule préparé avec soin',
    desc: "Chaque voiture est rigoureusement contrôlée et révisée avant livraison. Vous récupérez un véhicule prêt à rouler.",
  },
  {
    icon: Clock,
    title: '10 à 15 jours',
    desc: "Délai de livraison après la préparation complète du véhicule en atelier. Aucune précipitation.",
  },
  {
    icon: MapPin,
    title: 'Réseau national',
    desc: "Des centres partenaires dans toute la France métropolitaine pour un point de retrait toujours proche de vous.",
  },
  {
    icon: CalendarCheck,
    title: 'Remise planifiée',
    desc: "Planifiez la réception de votre véhicule selon vos disponibilités dans le centre partenaire qui vous convient.",
  },
]

const FAQS = [
  {
    question: "Puis-je choisir mon centre partenaire de livraison ?",
    answer:
      "Oui, nous vous proposons plusieurs centres partenaires proches de votre localisation. Vous choisissez celui qui vous convient le mieux en termes d'accessibilité et de disponibilité.",
  },
  {
    question: "Combien de temps dure la préparation avant livraison ?",
    answer:
      "La préparation complète du véhicule — révision, nettoyage, contrôle technique, administratif — prend entre 10 et 15 jours ouvrés. Ce délai garantit que vous récupérez un véhicule irréprochable.",
  },
  {
    question: "Quels documents me sont remis lors de la livraison ?",
    answer:
      "Lors de la remise en centre partenaire, vous recevez les clés, la carte grise, le carnet d'entretien, le certificat de garantie et l'ensemble des documents administratifs.",
  },
  {
    question: "La livraison en centre partenaire est-elle payante ?",
    answer:
      "Les frais de livraison varient selon la distance et le centre choisi. Votre conseiller Activ Automobiles vous communique le coût précis lors de la finalisation de votre commande.",
  },
  {
    question: "Que se passe-t-il si je ne peux pas récupérer le véhicule à la date prévue ?",
    answer:
      "Pas de problème. Contactez votre conseiller pour reprogrammer la remise selon votre disponibilité. Le véhicule reste sécurisé dans le centre partenaire jusqu'à votre passage.",
  },
]

const livraisonJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Livraison Voiture — Activ Automobiles',
  url: 'https://www.activ-automobiles.fr/services/livraison',
  provider: {
    '@type': 'AutoDealer',
    name: 'Activ Automobiles',
    url: 'https://www.activ-automobiles.fr',
  },
  serviceType: 'Livraison automobile',
  description: "Livraison de voitures d'occasion en centre partenaire partout en France sous 10 à 15 jours.",
  areaServed: { '@type': 'Country', name: 'France' },
};

export default function LivraisonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(livraisonJsonLd) }} />
      <main className="bg-[#0B1829] min-h-screen">

      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="bg-[#0d1426] border-b border-[#1a2540]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-[#1A3F6F] transition-colors">Accueil</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li><Link href="/services" className="hover:text-[#1A3F6F] transition-colors">Services</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li className="text-gray-300">Livraison</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1A3F6F]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#1A3F6F]/6 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#1A3F6F]/15 border border-[#1A3F6F]/30 rounded-full px-4 py-2 mb-6">
                <Truck className="w-4 h-4 text-[#4A80C4]" />
                <span className="text-[#4A80C4] text-sm font-medium">
                  Livraison en centre partenaire — 10 à 15 jours
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                Votre voiture livrée{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A3F6F] to-[#4A80C4]">
                  près de chez vous
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Activ Automobiles livre votre véhicule dans un centre partenaire sur toute la France métropolitaine. Après 10 à 15 jours de préparation complète en atelier, vous récupérez une voiture prête à rouler.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#comment-ca-marche"
                  className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)', boxShadow: '0 6px 24px rgba(26,63,111,0.35)' }}
                >
                  Comment ça marche
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[#1a2540] hover:border-[#1A3F6F]/50 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all"
                >
                  Contacter un conseiller
                </Link>
              </div>
            </div>

            {/* Hero visual panel */}
            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-[#1a2540]" style={{ minHeight: '360px' }}>
                <img
                  src="/transport.webp"
                  alt="Camion porte-voitures Activ Automobiles — livraison en centre partenaire"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1829]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(26,63,111,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white font-black text-lg leading-tight">Transport sécurisé</p>
                  </div>
                  <p className="text-white/60 text-sm">Réseau de centres partenaires partout en France</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-[#0d1426] border-y border-[#1a2540]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1a2540] rounded-2xl overflow-hidden">
            {[
              { value: '10-15j', label: 'Délai de livraison', sub: 'Après préparation complète' },
              { value: '100%', label: 'Couverture nationale', sub: 'France métropolitaine' },
              { value: '+800', label: 'Véhicules disponibles', sub: 'En stock immédiat' },
            ].map(({ value, label, sub }) => (
              <div key={label} className="bg-[#0d1426] py-10 px-8 text-center hover:bg-[#0B1829] transition-colors">
                <p className="text-4xl font-black text-[#4A80C4] mb-1">{value}</p>
                <p className="text-gray-200 font-semibold text-sm mb-0.5">{label}</p>
                <p className="text-gray-500 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment-ca-marche" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#1A3F6F]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#4A80C4]">Processus simple</span>
            <div className="h-px w-8 bg-[#1A3F6F]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Comment ça marche ?</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">De la sélection à la remise des clés en centre partenaire, on prend tout en charge en quatre étapes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.num} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-[#1A3F6F]/30 to-transparent z-0" />
                )}
                <div className="relative z-10 bg-[#0d1426] border border-[#1a2540] rounded-2xl p-6 hover:border-[#1A3F6F]/40 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center relative border border-[#1A3F6F]/30"
                      style={{ background: 'linear-gradient(135deg, #1A3F6F, #2558A0)' }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#0d1426] border-2 border-[#1A3F6F] text-[#4A80C4] text-[9px] font-black rounded-full flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-600 tracking-widest">{step.num}</span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20 bg-[#0d1426] border-t border-[#1a2540]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Les avantages Activ Automobiles
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Un service pensé pour votre tranquillité d&apos;esprit — de la préparation à la remise des clés.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AVANTAGES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-[#0B1829] border border-[#1a2540] rounded-2xl p-6 hover:border-[#1A3F6F]/40 transition-all group"
              >
                <div className="w-12 h-12 bg-[#1A3F6F]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1A3F6F]/20 transition-colors">
                  <Icon className="w-6 h-6 text-[#4A80C4]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo bannière */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden border border-[#1a2540]"
          style={{ minHeight: '360px', boxShadow: '0 24px 80px rgba(26,63,111,0.25)' }}
        >
          <img
            src="/transport.webp"
            alt="Transport Activ Automobiles — livraison en centre partenaire partout en France"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(10,15,30,0.92) 0%, rgba(10,15,30,0.65) 45%, rgba(10,15,30,0.20) 100%)' }}
          />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl px-10 lg:px-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-white/25" />
                <span className="text-white/70 text-xs font-bold tracking-[0.2em] uppercase">Transport professionnel</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                Un réseau de centres<br />partout en France
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-md">
                Votre véhicule est acheminé par des transporteurs professionnels jusqu&apos;à un centre partenaire proche de chez vous. Pas de livraison à domicile — une remise sécurisée, en mains propres, dans un environnement dédié.
              </p>
              <Link
                href="/voitures-occasion"
                className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl text-[#1A3F6F] bg-white hover:bg-gray-100 transition-all"
              >
                Voir nos véhicules
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0d1426] border-t border-[#1a2540]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Questions fréquentes</h2>
            <p className="text-gray-400">
              Tout ce que vous devez savoir sur notre service de livraison en centre partenaire.
            </p>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="bg-[#0B1829] border border-[#1a2540] rounded-xl group overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer text-white font-semibold hover:text-[#4A80C4] transition-colors list-none">
                  <span>{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-[#1a2540] pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden border border-[#1a2540] p-12 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(26,63,111,0.25) 0%, #0d1426 50%, rgba(26,63,111,0.15) 100%)' }}
        >
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1A3F6F]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1A3F6F]/8 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#1A3F6F]/15 border border-[#1A3F6F]/30 rounded-full px-4 py-2 mb-6">
              <CheckCircle className="w-4 h-4 text-[#4A80C4]" />
              <span className="text-[#4A80C4] text-sm font-medium">Service disponible partout en France</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Votre voiture vous attend.<br />On s&apos;occupe du reste.
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed text-sm">
              Parcourez notre catalogue ou posez-nous vos questions directement — nos conseillers sont disponibles pour organiser votre livraison.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/voitures-occasion"
                className="inline-flex items-center justify-center gap-2 text-[#1A3F6F] font-bold px-8 py-4 rounded-xl border border-white hover:bg-gray-100 transition-all bg-white"
              >
                <Car className="w-4 h-4" />
                Voir nos véhicules
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-[#1A3F6F]/40 text-white font-semibold px-8 py-4 rounded-xl hover:border-[#1A3F6F]/70 hover:bg-[#1A3F6F]/10 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Contacter un conseiller
              </Link>
            </div>
          </div>
        </div>
      </section>

      </main>
    </>
  )
}
