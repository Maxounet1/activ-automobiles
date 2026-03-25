import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/utils'
import {
  ChevronRight,
  ArrowRight,
  Cog,
  Zap,
  Disc,
  Phone,
  MapPin,
  FileCheck,
  Car,
  ShieldCheck,
  PlusCircle,
  CheckCircle,
  Clock,
  Wrench,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Garantie 12 Mois Incluse | Activ Automobiles',
  description:
    "Tous nos véhicules d'occasion sont vendus avec une garantie 12 mois incluse. Moteur, boîte de vitesses, électronique, freinage. Roulez en toute sérénité.",
  keywords: [
    'garantie voiture occasion',
    'garantie 12 mois',
    'garantie constructeur',
    'assurance voiture occasion',
    'extension garantie auto',
    'garantie moteur boite vitesses',
    'Activ Automobiles garantie',
  ],
  openGraph: {
    title: 'Garantie 12 Mois Incluse | Activ Automobiles',
    description:
      "Tous nos véhicules incluent une garantie 12 mois. Moteur, boîte, électronique, freinage couverts.",
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/services/garantie`,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: 'https://www.activautomobiles.fr',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://www.activautomobiles.fr/services',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Garantie',
          item: 'https://www.activautomobiles.fr/services/garantie',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quels éléments sont couverts par la garantie 12 mois ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La garantie 12 mois couvre les pannes mécaniques et électroniques liées aux organes principaux : moteur, boîte de vitesses, transmission, système de freinage, direction assistée, climatisation et électronique embarquée.',
          },
        },
        {
          '@type': 'Question',
          name: "Comment faire jouer la garantie en cas de panne ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "En cas de panne couverte par la garantie, contactez notre service client au 01 XX XX XX XX. Nous vous orientons vers un réparateur agréé et prenons en charge les frais de réparation selon les conditions de votre contrat.",
          },
        },
        {
          '@type': 'Question',
          name: "Peut-on étendre la garantie au-delà de 12 mois ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Oui, nous proposons des extensions de garantie jusqu'à 36 mois. Ces extensions peuvent être souscrites au moment de l'achat ou avant l'expiration de la garantie initiale.",
          },
        },
        {
          '@type': 'Question',
          name: "La garantie est-elle valable dans toute la France ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Oui, la garantie est valable dans toute la France métropolitaine et dans les DOM-TOM. Notre réseau de réparateurs agréés couvre l'ensemble du territoire.",
          },
        },
        {
          '@type': 'Question',
          name: "L'entretien régulier est-il obligatoire pour maintenir la garantie ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Il est recommandé de suivre les préconisations du constructeur en matière d'entretien. Un défaut d'entretien manifeste peut affecter la prise en charge d'une panne spécifique, mais n'invalide pas la garantie dans sa globalité.",
          },
        },
      ],
    },
  ],
}

const coveredItems = [
  {
    icon: Cog,
    title: 'Moteur',
    description:
      'Bloc moteur, distribution, culasse, pistons, vilebrequin, turbo compresseur.',
    items: [
      'Bloc moteur',
      'Distribution & culasse',
      'Turbo / Compresseur',
      'Injection',
    ],
  },
  {
    icon: Car,
    title: 'Boîte de vitesses',
    description:
      'Boîte manuelle, automatique, CVT. Transmission, différentiel et cardans.',
    items: [
      'Boîte manuelle / auto',
      'Transmission intégrale',
      'Différentiel',
      'Cardans',
    ],
  },
  {
    icon: Zap,
    title: 'Électronique',
    description:
      'Calculateurs, capteurs, systèmes de démarrage, aide à la conduite.',
    items: [
      'Calculateurs ECU',
      'Capteurs ABS / ESP',
      'Climatisation',
      'Alternateur / démarreur',
    ],
  },
  {
    icon: Disc,
    title: 'Freinage & direction',
    description:
      'Système de freinage, direction assistée hydraulique et électrique.',
    items: [
      'Maître-cylindre',
      'Servofrein',
      'Direction assistée',
      'Colonne de direction',
    ],
  },
]

const claimSteps = [
  {
    number: '01',
    icon: Phone,
    title: 'Contactez-nous',
    description:
      "Appelez notre service garantie au 01 XX XX XX XX ou envoyez-nous un email. Décrivez la panne et présentez votre numéro de contrat.",
  },
  {
    number: '02',
    icon: MapPin,
    title: 'Réparateur agréé',
    description:
      "Nous vous orientons vers le réparateur agréé le plus proche de chez vous. Prise de rendez-vous rapide, sans avance de frais.",
  },
  {
    number: '03',
    icon: FileCheck,
    title: 'Prise en charge',
    description:
      "Les frais de réparation couverts sont pris en charge directement par Activ Automobiles. Vous repartez avec votre véhicule réparé.",
  },
]

const extensions = [
  {
    duration: '12 mois',
    label: 'Inclus',
    price: 'Offert',
    features: ['Moteur & boîte', 'Électronique', 'Freinage', 'Direction'],
    highlight: false,
  },
  {
    duration: '24 mois',
    label: 'Extension',
    price: 'Dès 299€',
    features: [
      'Tout ce qui précède',
      'Assistance 24h/24',
      'Véhicule de prêt',
      'Priorité interventions',
    ],
    highlight: true,
  },
  {
    duration: '36 mois',
    label: 'Extension Premium',
    price: 'Dès 499€',
    features: [
      'Tout ce qui précède',
      'Couverture étendue',
      'Kilométrage illimité',
      'Garantie valeur à neuf',
    ],
    highlight: false,
  },
]

const faqs = [
  {
    question: 'Quels éléments sont couverts par la garantie 12 mois ?',
    answer:
      "La garantie 12 mois couvre les pannes mécaniques et électroniques liées aux organes principaux : moteur, boîte de vitesses, transmission, système de freinage, direction assistée, climatisation et électronique embarquée.",
  },
  {
    question: "Comment faire jouer la garantie en cas de panne ?",
    answer:
      "En cas de panne couverte par la garantie, contactez notre service client au 01 XX XX XX XX. Nous vous orientons vers un réparateur agréé et prenons en charge les frais de réparation selon les conditions de votre contrat.",
  },
  {
    question: "Peut-on étendre la garantie au-delà de 12 mois ?",
    answer:
      "Oui, nous proposons des extensions de garantie jusqu'à 36 mois. Ces extensions peuvent être souscrites au moment de l'achat ou avant l'expiration de la garantie initiale.",
  },
  {
    question: "La garantie est-elle valable dans toute la France ?",
    answer:
      "Oui, la garantie est valable dans toute la France métropolitaine et dans les DOM-TOM. Notre réseau de réparateurs agréés couvre l'ensemble du territoire.",
  },
  {
    question: "L'entretien régulier est-il obligatoire pour maintenir la garantie ?",
    answer:
      "Il est recommandé de suivre les préconisations du constructeur en matière d'entretien. Un défaut d'entretien manifeste peut affecter la prise en charge d'une panne spécifique, mais n'invalide pas la garantie dans sa globalité.",
  },
]

export default function GarantiePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-[#0B1829] min-h-screen">
        {/* Breadcrumb */}
        <nav
          aria-label="Fil d'Ariane"
          className="bg-[#0d1426] border-b border-[#1a2540]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-[#1A3F6F] transition-colors">
                  Accueil
                </Link>
              </li>
              <ChevronRight className="w-3 h-3" />
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#1A3F6F] transition-colors"
                >
                  Services
                </Link>
              </li>
              <ChevronRight className="w-3 h-3" />
              <li className="text-gray-300">Garantie</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden pt-20 pb-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-10 left-1/3 w-96 h-96 bg-[#1A3F6F]/8 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-[#1A3F6F]/8 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-[#1A3F6F]/10 border border-[#1A3F6F]/30 rounded-full px-4 py-2 mb-6">
              <ShieldCheck className="w-4 h-4 text-[#1A3F6F]" />
              <span className="text-[#1A3F6F] text-sm font-medium">
                Garantie 12 mois incluse — sur tous nos véhicules
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Roulez en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A3F6F] to-[#1A3F6F]">
                Toute Sérénité
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Chaque véhicule Activ Automobiles est vendu avec une garantie 12 mois
              incluse couvrant les pièces mécaniques et électroniques essentielles.
              Conduisez sans inquiétude.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vehicules"
                className="inline-flex items-center gap-2 bg-[#1A3F6F] hover:bg-[#143260] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#1A3F6F]/30 hover:shadow-[#1A3F6F]/50"
              >
                Voir nos véhicules garantis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#ce-qui-est-couvert"
                className="inline-flex items-center gap-2 border border-[#1a2540] hover:border-[#1A3F6F]/50 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all"
              >
                Ce qui est couvert
              </a>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <div className="bg-[#0d1426] border-y border-[#1a2540]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '12 mois', label: 'Garantie incluse', color: 'text-[#1A3F6F]' },
                { value: '36 mois', label: "Extension possible", color: 'text-[#1A3F6F]' },
                { value: '100%', label: 'Véhicules couverts', color: 'text-[#1A3F6F]' },
                { value: 'France', label: 'Entière couverte', color: 'text-[#1A3F6F]' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className={`text-3xl font-extrabold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What's covered */}
        <section
          id="ce-qui-est-couvert"
          className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ce qui est couvert
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Notre garantie couvre les organes essentiels de votre véhicule,
              vous protégeant contre les pannes les plus coûteuses.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coveredItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-[#0d1426] border border-[#1a2540] rounded-2xl p-6 hover:border-[#1A3F6F]/40 transition-all"
                >
                  <div className="w-12 h-12 bg-[#1A3F6F]/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#1A3F6F]" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {item.description}
                  </p>
                  <ul className="space-y-1.5">
                    {item.items.map((subitem) => (
                      <li
                        key={subitem}
                        className="flex items-center gap-2 text-gray-300 text-xs"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-[#1A3F6F] flex-shrink-0" />
                        {subitem}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Non-covered disclaimer */}
          <div className="mt-8 bg-[#0d1426] border border-[#1a2540] rounded-2xl p-6">
            <h4 className="text-gray-300 font-semibold mb-3 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-gray-500" />
              Éléments non couverts (usure normale)
            </h4>
            <p className="text-gray-500 text-sm">
              Les éléments soumis à usure normale (pneumatiques, plaquettes de
              frein, disques, filtres, ampoules, essuie-glaces, embrayage)
              ainsi que les dommages résultant d&apos;un accident, d&apos;un entretien
              non conforme ou d&apos;une utilisation abusive ne sont pas couverts par
              la garantie.
            </p>
          </div>
        </section>

        {/* How to claim */}
        <section className="py-20 bg-[#0d1426] border-y border-[#1a2540]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Comment faire jouer la garantie ?
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                En cas de panne couverte, la procédure est simple et rapide.
                Pas d&apos;avance de frais, pas de paperasse complexe.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {claimSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.number} className="text-center">
                    <div className="relative inline-block mb-5">
                      <div className="w-16 h-16 bg-[#1A3F6F]/10 border-2 border-[#1A3F6F] rounded-2xl flex items-center justify-center mx-auto">
                        <Icon className="w-7 h-7 text-[#1A3F6F]" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#1A3F6F] text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-[#0d1426]">
                        {Number(step.number)}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Extension Options */}
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#1A3F6F]/10 border border-[#1A3F6F]/30 rounded-full px-4 py-2 mb-5">
              <PlusCircle className="w-4 h-4 text-[#1A3F6F]" />
              <span className="text-[#1A3F6F] text-sm font-medium">
                Tranquillité prolongée
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Étendez votre garantie jusqu&apos;à 36 mois
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Pour une protection maximale, optez pour une extension de
              garantie dès votre achat ou avant l&apos;expiration de la garantie
              incluse.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {extensions.map((ext) => (
              <div
                key={ext.duration}
                className={`relative rounded-2xl border p-8 transition-all ${
                  ext.highlight
                    ? 'border-[#1A3F6F] bg-gradient-to-b from-[#1A3F6F]/10 to-[#0d1426]'
                    : 'border-[#1a2540] bg-[#0d1426] hover:border-[#1a2540]/80'
                }`}
              >
                {ext.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1A3F6F] text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    Recommandé
                  </div>
                )}
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-400 font-medium mb-1">
                    {ext.label}
                  </p>
                  <p className="text-4xl font-extrabold text-white mb-1">
                    {ext.duration}
                  </p>
                  <p className={`text-lg font-bold ${ext.highlight ? 'text-[#1A3F6F]' : 'text-gray-300'}`}>
                    {ext.price}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {ext.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-gray-300 text-sm">
                      <CheckCircle
                        className={`w-4 h-4 flex-shrink-0 ${
                          ext.highlight ? 'text-[#1A3F6F]' : 'text-[#1A3F6F]'
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block w-full text-center font-bold py-3 px-6 rounded-xl transition-all ${
                    ext.highlight
                      ? 'bg-[#1A3F6F] hover:bg-[#143260] text-white shadow-lg shadow-[#1A3F6F]/20'
                      : 'border border-[#1a2540] hover:border-gray-500 text-gray-300 hover:text-white'
                  }`}
                >
                  {ext.price === 'Offert' ? 'Inclus dans tout achat' : 'Demander un devis'}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[#0d1426] border-t border-[#1a2540]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Questions fréquentes
              </h2>
              <p className="text-gray-400">
                Tout ce que vous devez savoir sur notre garantie véhicule.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="bg-[#0B1829] border border-[#1a2540] rounded-xl group overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer text-white font-semibold hover:text-[#1A3F6F] transition-colors list-none">
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

        {/* CTA */}
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1A3F6F]/20 via-[#0d1426] to-[#1A3F6F]/20 border border-[#1a2540] p-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#1A3F6F]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#1A3F6F]/10 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-[#1A3F6F]" />
                  <span className="text-[#1A3F6F] font-semibold">
                    Garantie activée dès la livraison
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Tous nos véhicules sont protégés
                </h2>
                <p className="text-gray-300 max-w-xl leading-relaxed">
                  La garantie 12 mois est automatiquement activée à la date de
                  livraison ou de remise en agence. Aucune démarche
                  supplémentaire n&apos;est nécessaire.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <Link
                  href="/vehicules"
                  className="inline-flex items-center gap-2 bg-[#1A3F6F] hover:bg-[#143260] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#1A3F6F]/30 whitespace-nowrap"
                >
                  Explorer les véhicules
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl transition-all whitespace-nowrap"
                >
                  Une question ? Contactez-nous
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
