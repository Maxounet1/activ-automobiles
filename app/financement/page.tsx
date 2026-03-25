import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/utils'
import { ChevronRight, ArrowRight, CircleCheck as CheckCircle, Car, CreditCard, RefreshCw, Users, Clock, Banknote, ShieldCheck, Truck, Headphones, FileText, ThumbsUp, Sparkles } from 'lucide-react'
import FinanceForm from '@/components/forms/FinanceForm'

export const metadata: Metadata = {
  title: 'Financement Auto — Crédit, LOA, LLD | Activ Automobiles',
  description:
    "Des solutions de financement complètes et souples pour faciliter votre achat auto. Crédit, LOA, LLD — simulation gratuite, réponse sous 24h.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/financement` },
  openGraph: {
    title: 'Financement Auto — Crédit, LOA, LLD | Activ Automobiles',
    description: "Crédit auto, LOA, LLD : trouvez la formule adaptée à votre budget. Simulation gratuite, réponse rapide.",
    url: 'https://www.activ-automobiles.fr/financement',
    siteName: 'Activ Automobiles',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: 'https://www.activ-automobiles.fr/og-default.jpg', width: 1200, height: 630, alt: 'Financement automobile Activ Automobiles' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Financement Auto — Crédit, LOA, LLD | Activ Automobiles',
    description: "Crédit auto, LOA, LLD : simulation gratuite et réponse rapide.",
    images: ['https://www.activ-automobiles.fr/og-default.jpg'],
  },
}

const FORMULAS = [
  {
    icon: CreditCard,
    num: '01',
    label: 'Crédit auto classique',
    tag: 'Propriétaire',
    tagColor: '#F59E0B',
    headline: 'Achetez et payez à votre rythme',
    body: "Le choix le plus simple : vous achetez, vous payez à votre rythme. Mensualités fixes, durée modulable, dossier clair. Aucune surprise, tout est écrit noir sur blanc.",
    highlight: 'Notre conseil : idéal si vous souhaitez être propriétaire de votre voiture dès la fin du contrat.',
    highlights: [
      'Mensualités fixes et prévisibles',
      'Durée modulable selon votre budget',
      'Vous devenez propriétaire',
    ],
    bg: 'linear-gradient(145deg, #0A1628 0%, #1A3F6F 60%, #2558A0 100%)',
    glow: 'rgba(37,88,160,0.35)',
    iconBg: 'rgba(245,158,11,0.15)',
    iconBorder: 'rgba(245,158,11,0.3)',
    btnBg: 'linear-gradient(135deg, #2558A0, #1A3F6F)',
    btnShadow: 'rgba(37,88,160,0.5)',
  },
  {
    icon: Car,
    num: '02',
    label: "LOA \u2014 Location avec option d'achat",
    tag: 'Flexibilité',
    tagColor: '#34D399',
    headline: 'Roulez récent, choisissez à la fin',
    body: "Roulez dans une voiture récente sans immobiliser tout votre budget. Vous payez des loyers mensuels, et à la fin, vous choisissez : vous rachetez ou vous changez.",
    highlight: 'Parfait pour ceux qui aiment changer de véhicule régulièrement.',
    highlights: [
      'Loyers adaptés à votre budget',
      "Option d'achat ou changement en fin de contrat",
      'Toujours un véhicule récent',
    ],
    bg: 'linear-gradient(145deg, #051A16 0%, #065F46 60%, #0A9B72 100%)',
    glow: 'rgba(16,185,129,0.35)',
    iconBg: 'rgba(52,211,153,0.15)',
    iconBorder: 'rgba(52,211,153,0.3)',
    btnBg: 'linear-gradient(135deg, #10B981, #059669)',
    btnShadow: 'rgba(16,185,129,0.4)',
  },
  {
    icon: ShieldCheck,
    num: '03',
    label: 'LLD — Location longue durée',
    tag: 'Sérénité totale',
    tagColor: '#FB923C',
    headline: "Vous profitez, on s'occupe de tout",
    body: "Vous louez, nous gérons le reste. Entretien, assistance, garantie — tout peut être inclus. Vous restituez en fin de contrat et repartez sur un nouveau modèle.",
    highlight: 'La solution tranquillité totale pour rouler sans contrainte.',
    highlights: [
      'Entretien et assistance inclus',
      'Restitution en fin de contrat',
      'Budget maîtrisé',
    ],
    bg: 'linear-gradient(145deg, #1A0A00 0%, #7C2D12 60%, #C2410C 100%)',
    glow: 'rgba(194,65,12,0.35)',
    iconBg: 'rgba(251,146,60,0.15)',
    iconBorder: 'rgba(251,146,60,0.3)',
    btnBg: 'linear-gradient(135deg, #F97316, #DC2626)',
    btnShadow: 'rgba(249,115,22,0.4)',
  },
]

const WHY_US = [
  { icon: Sparkles, label: 'Simulation en ligne gratuite', desc: 'Estimation en quelques clics, sans engagement' },
  { icon: Clock, label: 'Réponse rapide', desc: 'Accord de principe sous 24h' },
  { icon: Users, label: 'Accompagnement humain', desc: 'Un conseiller dédié de A à Z' },
  { icon: Banknote, label: 'Partenaires de confiance', desc: 'Les meilleurs organismes du marché' },
]

const SERVICES_COMPLETS = [
  { icon: ShieldCheck, label: 'Garantie prolongée', desc: 'Protégez votre véhicule dans la durée' },
  { icon: RefreshCw, label: 'Reprise ancien véhicule', desc: 'Estimation immédiate, valeur maximale' },
  { icon: Truck, label: 'Livraison / Retrait', desc: 'Partout en France, à votre convenance' },
  { icon: Headphones, label: 'Assistance & assurance', desc: "Pour rouler l'esprit libre" },
]

const STEPS = [
  {
    num: '01',
    icon: FileText,
    title: 'Demandez une simulation',
    desc: 'Remplissez le formulaire en quelques minutes. Indiquez votre projet, votre profil et vos besoins.',
  },
  {
    num: '02',
    icon: Headphones,
    title: 'Un conseiller vous rappelle',
    desc: 'Sous 24h, notre équipe analyse votre situation et vous propose la formule la plus adaptée.',
  },
  {
    num: '03',
    icon: ThumbsUp,
    title: 'Vous décidez en toute confiance',
    desc: 'Chaque option vous est expliquée clairement, sans jargon, sans pression. Vous signez quand vous êtes prêt.',
  },
  {
    num: '04',
    icon: Car,
    title: 'Prenez le volant',
    desc: 'Votre financement est validé, votre véhicule est prêt. Livraison ou retrait en agence selon votre choix.',
  },
]

const SUMMARY = [
  'Financement clair, flexible et sans frais cachés',
  'Simulation rapide et personnalisée',
  'Dossier géré du début à la fin',
  "Équipe à l'écoute, partout en France",
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Financement', item: `${SITE_URL}/financement` },
  ],
};

export default function FinancementPage() {
  return (
    <main className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-[#1A3F6F] transition-colors">Accueil</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li className="text-gray-700 font-medium">Financement</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-20 pb-20">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <Image
            src="/Financement.webp"
            alt="Financement automobile — Activ Automobiles"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#1A3F6F]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
                  Financement auto
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
                Un financement{' '}
                <span
                  style={{
                    background: 'linear-gradient(92deg, #1A3F6F 0%, #2558A0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  sur mesure.
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                Des solutions complètes pour faciliter votre achat et vous accompagner sur la durée. Crédit, LOA, LLD — nos conseillers trouvent la formule adaptée à votre projet.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-10">
                {WHY_US.map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="group relative flex items-start gap-3 rounded-xl p-3.5 overflow-hidden transition-all duration-300 hover:-translate-y-[2px]"
                    style={{
                      background: 'linear-gradient(160deg, #ffffff 0%, #eef3fb 100%)',
                      border: '1px solid rgba(26,63,111,0.13)',
                      boxShadow: '0 2px 8px rgba(26,63,111,0.06)',
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px]"
                      style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(37,88,160,0.4) 40%, rgba(74,144,217,0.4) 70%, transparent 100%)' }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: 'linear-gradient(160deg, rgba(26,63,111,0.04) 0%, transparent 60%)' }}
                      aria-hidden="true"
                    />
                    <div className="relative w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(26,63,111,0.08)', border: '1px solid rgba(26,63,111,0.12)' }}>
                      <Icon className="w-4 h-4 text-[#1A3F6F]" />
                    </div>
                    <div className="relative">
                      <p className="text-xs font-bold text-gray-900 leading-tight">{label}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#simulation"
                className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 font-bold text-white text-sm border border-[#1A3F6F] transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.99]"
                style={{
                  background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
                  boxShadow: '0 6px 24px rgba(26,63,111,0.25)',
                }}
              >
                Demander une simulation gratuite
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Visual card */}
            <div className="hidden lg:block">
              <div
                className="relative rounded-3xl overflow-hidden border border-[#1A3F6F]/20"
                style={{
                  background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2548 100%)',
                  boxShadow: '0 32px 80px rgba(26,63,111,0.25)',
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)',
                  }}
                />
                <div className="relative z-10 p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <Banknote className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Activ Automobiles</p>
                      <p className="text-blue-200 text-xs">Financement sur mesure</p>
                    </div>
                  </div>

                  <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-3">Notre engagement</p>
                  <p className="text-white text-2xl font-black leading-tight mb-8">
                    Acheter malin, c&apos;est aussi bien financer.
                  </p>

                  <div className="space-y-3">
                    {SUMMARY.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0 border border-white/20">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <p className="text-white/80 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-blue-200/70 text-xs leading-relaxed">
                      Chez Activ Automobiles, vous n&apos;êtes pas un dossier. Vous êtes un conducteur avec un projet concret.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulas */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#1A3F6F] mb-4">
              Formules de financement
            </span>
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Quelle formule vous correspond ?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              Chaque conducteur a sa façon de rouler. On a la solution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            {FORMULAS.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.num}
                  className="relative flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    background: f.bg,
                    boxShadow: `0 8px 32px ${f.glow}`,
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${f.glow} 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
                      backgroundSize: '22px 22px',
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative flex flex-col flex-1 p-7">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0"
                      style={{ background: f.iconBg, border: `1px solid ${f.iconBorder}` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: f.tagColor }} />
                    </div>

                    <h3 className="text-xl font-black text-white mb-2 leading-tight">{f.label}</h3>
                    <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{f.body}</p>

                    <div className="space-y-3 mb-6">
                      {f.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: f.tagColor }} />
                          <span className="text-sm font-medium text-white">{h}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-black transition-all duration-200 active:scale-95 hover:brightness-110"
                      style={{
                        background: f.btnBg,
                        color: '#fff',
                        boxShadow: `0 4px 16px ${f.btnShadow}`,
                      }}
                    >
                      Je me renseigne
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#1A3F6F]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
                Processus simple
              </span>
              <div className="h-px w-8 bg-[#1A3F6F]" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Pas de jargon, pas de pression. Vous savez tout avant de signer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.num} className="relative">
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-[#1A3F6F]/20 to-transparent z-0" />
                  )}
                  <div
                    className="group relative z-10 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-[2px]"
                    style={{
                      background: 'linear-gradient(160deg, #ffffff 0%, #eef3fb 100%)',
                      border: '1px solid rgba(26,63,111,0.13)',
                      boxShadow: '0 2px 8px rgba(26,63,111,0.06)',
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px] rounded-t-2xl"
                      style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(37,88,160,0.4) 40%, rgba(74,144,217,0.4) 70%, transparent 100%)' }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: 'linear-gradient(160deg, rgba(26,63,111,0.04) 0%, transparent 60%)' }}
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center relative border border-[#1A3F6F]/20"
                        style={{ background: 'linear-gradient(135deg, #1A3F6F, #2558A0)' }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-white border-2 border-[#1A3F6F] text-[#1A3F6F] text-[9px] font-black rounded-full flex items-center justify-center">
                          {i + 1}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-gray-300 tracking-widest">{step.num}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Financement + Services */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#1A3F6F]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
                  Une offre globale
                </span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                Financement + Services = Sérénité
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Parce qu&apos;on pense global, vous pouvez associer votre financement à nos services pour un achat auto complet, fluide et sans tracas.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-bold text-sm text-[#1A3F6F] border border-[#1A3F6F]/30 px-5 py-2.5 rounded-xl hover:bg-[#1A3F6F]/5 hover:border-[#1A3F6F]/60 hover:gap-3 transition-all"
              >
                Parler à un conseiller
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {SERVICES_COMPLETS.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="group relative rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-[2px]"
                  style={{
                    background: 'linear-gradient(160deg, #ffffff 0%, #eef3fb 100%)',
                    border: '1px solid rgba(26,63,111,0.13)',
                    boxShadow: '0 2px 8px rgba(26,63,111,0.06)',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, #2558A0 40%, #4A90D9 70%, transparent 100%)' }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'linear-gradient(160deg, rgba(26,63,111,0.04) 0%, transparent 60%)' }}
                    aria-hidden="true"
                  />
                  <div className="relative w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(26,63,111,0.08)', border: '1px solid rgba(26,63,111,0.12)' }}>
                    <Icon className="w-4 h-4 text-[#1A3F6F]" />
                  </div>
                  <p className="relative font-bold text-gray-900 text-sm mb-1">{label}</p>
                  <p className="relative text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simulation form */}
      <section id="simulation" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#1A3F6F]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
                Gratuit &amp; sans engagement
              </span>
              <div className="h-px w-8 bg-[#1A3F6F]" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Demandez votre simulation
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-lg mx-auto">
              Vous avez trouvé votre future voiture ? Nos conseillers peuvent vous proposer une offre personnalisée en moins de 24h.
            </p>
          </div>
          <FinanceForm />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative rounded-3xl overflow-hidden p-14 text-center border border-[#1A3F6F]/20"
            style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2548 100%)' }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 70% at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)',
              }}
            />
            <div className="relative z-10">
              <p className="text-blue-200 text-xs font-bold tracking-widest uppercase mb-4">Roulez récent, payez malin</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Restez tranquille, on s&apos;occupe du reste.
              </h2>
              <p className="text-blue-100/80 mb-8 max-w-lg mx-auto leading-relaxed">
                Explorez notre catalogue de véhicules et laissez nos conseillers construire l&apos;offre qui correspond exactement à votre vie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/voitures-occasion"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#1A3F6F] font-bold px-8 py-4 rounded-xl border border-white hover:bg-gray-100 transition-all"
                >
                  Voir nos véhicules
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:border-white/60 hover:bg-white/8 transition-all"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
