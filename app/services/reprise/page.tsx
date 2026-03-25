import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/utils'
import {
  ChevronRight,
  ArrowRight,
  ClipboardList,
  Tag,
  Banknote,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  HeartHandshake,
} from 'lucide-react'
import TradeInForm from '@/components/forms/TradeInForm'

export const metadata: Metadata = {
  title: 'Reprise de Votre Véhicule au Meilleur Prix | Activ Automobiles',
  description:
    'Revendez votre véhicule au juste prix avec Activ Automobiles. Estimation gratuite en ligne, offre sous 24h, paiement immédiat. Sans contrainte ni engagement.',
  keywords: [
    'reprise véhicule',
    'estimation voiture gratuite',
    'vendre sa voiture',
    'reprise auto',
    'rachat véhicule',
    'estimation gratuite en ligne',
    'Activ Automobiles reprise',
  ],
  openGraph: {
    title: 'Reprise de Votre Véhicule au Meilleur Prix | Activ Automobiles',
    description:
      'Obtenez une offre de reprise sous 24h. Estimation gratuite, paiement immédiat.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/services/reprise`,
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
          name: 'Reprise',
          item: 'https://www.activautomobiles.fr/services/reprise',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Comment est estimée la valeur de mon véhicule ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Notre évaluation tient compte de la marque, du modèle, de l'année, du kilométrage, de l'état général et des cotes du marché. Nous utilisons des références professionnelles pour vous proposer le juste prix.",
          },
        },
        {
          '@type': 'Question',
          name: "Combien de temps prend l'offre de reprise ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Après réception de votre formulaire, notre équipe vous contacte sous 24h ouvrées pour vous soumettre une offre chiffrée et sans engagement.",
          },
        },
        {
          '@type': 'Question',
          name: "Mon véhicule doit-il être en parfait état ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Non, nous reprenons des véhicules dans tous les états. L'état général influe sur la valeur de reprise, mais même un véhicule nécessitant des réparations peut être repris.",
          },
        },
        {
          '@type': 'Question',
          name: "Puis-je utiliser la reprise pour financer un nouveau véhicule ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Absolument. La valeur de reprise peut être directement déduite du prix de votre prochain véhicule acheté chez Activ Automobiles, réduisant ainsi votre financement.",
          },
        },
        {
          '@type': 'Question',
          name: "Quels documents dois-je fournir pour la reprise ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Vous aurez besoin de la carte grise au nom du vendeur (ou preuve de cession), du contrôle technique de moins de 6 mois pour les véhicules de plus de 4 ans, et de votre pièce d'identité.",
          },
        },
      ],
    },
  ],
}

const processSteps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Évaluation en ligne',
    description:
      "Renseignez les caractéristiques de votre véhicule en quelques minutes. Marque, modèle, kilométrage, état général — c'est tout ce dont nous avons besoin.",
    color: 'text-[#1A3F6F]',
    border: 'border-[#1A3F6F]',
    bg: 'bg-[#1A3F6F]/10',
  },
  {
    number: '02',
    icon: Tag,
    title: 'Offre personnalisée',
    description:
      "Notre équipe analyse votre dossier et vous soumet une offre de rachat chiffrée, basée sur les cotes du marché, sous 24h ouvrées.",
    color: 'text-[#1A3F6F]',
    border: 'border-[#1A3F6F]',
    bg: 'bg-[#1A3F6F]/10',
  },
  {
    number: '03',
    icon: Banknote,
    title: 'Paiement immédiat',
    description:
      "Si vous acceptez l'offre, le paiement est effectué immédiatement lors de la remise du véhicule en agence. Simple, rapide, sans délai.",
    color: 'text-[#1A3F6F]',
    border: 'border-[#1A3F6F]',
    bg: 'bg-[#1A3F6F]/10',
  },
]

const avantages = [
  {
    icon: Clock,
    title: 'Réponse sous 24h',
    description:
      'Offre de reprise transmise sous 24h ouvrées après réception de votre dossier.',
  },
  {
    icon: Shield,
    title: 'Prix juste et transparent',
    description:
      "Estimation basée sur les cotes professionnelles. Pas de mauvaises surprises.",
  },
  {
    icon: Zap,
    title: 'Paiement immédiat',
    description:
      "Règlement instantané dès la remise des clés. Vous n'attendez pas.",
  },
  {
    icon: HeartHandshake,
    title: 'Sans engagement',
    description:
      "L'estimation est gratuite et vous n'êtes jamais obligé d'accepter l'offre.",
  },
]

const faqs = [
  {
    question: "Comment est estimée la valeur de mon véhicule ?",
    answer:
      "Notre évaluation tient compte de la marque, du modèle, de l'année, du kilométrage, de l'état général et des cotes du marché. Nous utilisons des références professionnelles pour vous proposer le juste prix.",
  },
  {
    question: "Combien de temps prend l'offre de reprise ?",
    answer:
      "Après réception de votre formulaire, notre équipe vous contacte sous 24h ouvrées pour vous soumettre une offre chiffrée et sans engagement.",
  },
  {
    question: "Mon véhicule doit-il être en parfait état ?",
    answer:
      "Non, nous reprenons des véhicules dans tous les états. L'état général influe sur la valeur de reprise, mais même un véhicule nécessitant des réparations peut être repris.",
  },
  {
    question: "Puis-je utiliser la reprise pour financer un nouveau véhicule ?",
    answer:
      "Absolument. La valeur de reprise peut être directement déduite du prix de votre prochain véhicule acheté chez Activ Automobiles, réduisant ainsi votre financement.",
  },
  {
    question: "Quels documents dois-je fournir pour la reprise ?",
    answer:
      "Vous aurez besoin de la carte grise au nom du vendeur (ou preuve de cession), du contrôle technique de moins de 6 mois pour les véhicules de plus de 4 ans, et de votre pièce d'identité.",
  },
]

export default function ReprisePage() {
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
              <li className="text-gray-300">Reprise</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden pt-20 pb-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1A3F6F]/8 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#1A3F6F]/8 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#1A3F6F]/10 border border-[#1A3F6F]/30 rounded-full px-4 py-2 mb-6">
                  <Tag className="w-4 h-4 text-[#1A3F6F]" />
                  <span className="text-[#1A3F6F] text-sm font-medium">
                    Estimation gratuite — Offre sous 24h
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                  Revendez Votre Véhicule{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A3F6F] to-[#1A3F6F]">
                    au Juste Prix
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Obtenez une estimation gratuite en ligne et une offre de rachat
                  sous 24h. Paiement immédiat, aucun engagement, zéro tracas
                  administratif.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#estimer-vehicule"
                    className="inline-flex items-center gap-2 bg-[#1A3F6F] hover:bg-[#143260] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#1A3F6F]/30 hover:shadow-[#1A3F6F]/50"
                  >
                    Estimer mon véhicule
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="#comment-ca-marche"
                    className="inline-flex items-center gap-2 border border-[#1a2540] hover:border-[#1A3F6F]/50 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all"
                  >
                    En savoir plus
                  </a>
                </div>
              </div>
              {/* Hero illustration panel */}
              <div className="hidden lg:block">
                <div className="bg-[#0d1426] border border-[#1a2540] rounded-2xl p-8 space-y-4">
                  {[
                    { label: 'Renault Clio 2019 — 72 000 km', value: '8 400€', tag: 'Estimé' },
                    { label: 'Peugeot 308 2020 — 45 000 km', value: '12 800€', tag: 'Offre acceptée' },
                    { label: 'Volkswagen Golf 2018 — 98 000 km', value: '11 200€', tag: 'En cours' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between bg-[#0B1829] border border-[#1a2540] rounded-xl px-5 py-4"
                    >
                      <div>
                        <p className="text-white font-medium text-sm">{item.label}</p>
                        <span className="inline-block mt-1 text-xs text-gray-500 bg-[#1a2540] rounded-full px-2.5 py-0.5">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[#1A3F6F] font-bold text-lg">{item.value}</p>
                    </div>
                  ))}
                  <p className="text-center text-gray-600 text-xs pt-2">
                    Exemples d&apos;estimations récentes — valeurs indicatives
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process steps */}
        <section
          id="comment-ca-marche"
          className="py-20 bg-[#0d1426] border-y border-[#1a2540]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Reprise en 3 étapes simples
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                De l&apos;évaluation au paiement, nous vous accompagnons à chaque
                étape pour une transaction fluide et transparente.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.number} className="text-center">
                    <div className="relative inline-block mb-5">
                      <div
                        className={`w-20 h-20 ${step.bg} border-2 ${step.border} rounded-2xl flex items-center justify-center mx-auto`}
                      >
                        <Icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      <span className="absolute -top-2 -right-2 w-7 h-7 bg-[#1A3F6F] text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-[#0d1426]">
                        {Number(step.number)}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3">
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

        {/* Avantages */}
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Les avantages Activ Automobiles
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Notre engagement : vous offrir la meilleure expérience de revente,
              en toute transparence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {avantages.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-[#0d1426] border border-[#1a2540] rounded-2xl p-6 hover:border-[#1A3F6F]/40 transition-all group"
                >
                  <div className="w-12 h-12 bg-[#1A3F6F]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1A3F6F]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#1A3F6F]" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Trade-In Form */}
        <section
          id="estimer-vehicule"
          className="py-20 bg-[#0d1426] border-t border-[#1a2540]"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Estimez votre véhicule gratuitement
              </h2>
              <p className="text-gray-400">
                Remplissez le formulaire ci-dessous. Notre équipe vous recontacte
                sous 24h avec une offre personnalisée.
              </p>
            </div>
            <TradeInForm />
          </div>
        </section>

        {/* Trust indicators */}
        <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: CheckCircle, value: '+1 500/an', label: 'Reprises effectuées', color: 'text-[#1A3F6F]' },
              { icon: Clock, value: '< 24h', label: "Délai moyen d'offre", color: 'text-[#1A3F6F]' },
              { icon: Shield, value: '100%', label: 'Sans engagement', color: 'text-[#1A3F6F]' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="bg-[#0d1426] border border-[#1a2540] rounded-2xl p-8"
                >
                  <Icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                  <p className={`text-3xl font-extrabold ${item.color} mb-1`}>
                    {item.value}
                  </p>
                  <p className="text-gray-400 text-sm">{item.label}</p>
                </div>
              )
            })}
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
                Tout ce que vous devez savoir sur la reprise de votre véhicule.
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

        {/* CTA Banner */}
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1A3F6F]/20 via-[#0d1426] to-[#1A3F6F]/20 border border-[#1a2540] p-12 text-center">
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1A3F6F]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1A3F6F]/10 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Reprise + achat : la solution malin
              </h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Utilisez la valeur de votre reprise comme apport pour l&apos;achat
                de votre prochain véhicule. Moins de crédit, plus d&apos;économies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/vehicules"
                  className="inline-flex items-center gap-2 bg-[#1A3F6F] hover:bg-[#143260] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#1A3F6F]/30"
                >
                  Voir nos véhicules
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/services/financement"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl transition-all"
                >
                  Nos solutions de financement
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
