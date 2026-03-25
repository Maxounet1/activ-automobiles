import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/utils'
import StatsBar from '@/components/home/StatsBar'
import { ChevronRight, ArrowRight, Heart, ShieldCheck, Users, Star, Lightbulb, Target, CircleCheck as CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nos Engagements — Transparence & Confiance | Activ Automobiles',
  description:
    "Découvrez les engagements, valeurs et philosophie d'Activ Automobiles. Transparence, confiance, proximité : notre promesse depuis 2008.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/nos-engagements` },
  openGraph: {
    title: 'Nos Engagements | Activ Automobiles',
    description: "Transparence, confiance, proximité — les engagements d'Activ Automobiles depuis 2008.",
    url: 'https://www.activ-automobiles.fr/nos-engagements',
    siteName: 'Activ Automobiles',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: 'https://www.activ-automobiles.fr/og-default.jpg', width: 1200, height: 630, alt: 'Engagements Activ Automobiles' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nos Engagements | Activ Automobiles',
    description: "Transparence, confiance, proximité depuis 2008.",
    images: ['https://www.activ-automobiles.fr/og-default.jpg'],
  },
}

const VALUES = [
  {
    icon: Heart,
    title: 'Passion automobile',
    description: 'Une équipe passionnée au service de votre projet',
  },
  {
    icon: ShieldCheck,
    title: 'Confiance',
    description: "Transparence totale sur l'historique et l'état de chaque véhicule",
  },
  {
    icon: Users,
    title: 'Service client',
    description: 'Un accompagnement personnalisé du début à la fin',
  },
  {
    icon: Star,
    title: 'Excellence',
    description: 'Des véhicules sélectionnés avec le plus grand soin',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Des solutions modernes pour faciliter votre achat',
  },
  {
    icon: Target,
    title: 'Engagement',
    description: 'Votre satisfaction est notre priorité absolue',
  },
]

const PHILOSOPHY = [
  {
    title: 'Simplicité avant tout',
    body: "Acheter une voiture ne devrait pas être compliqué. Chez Activ Automobiles, on parle vrai. Pas de jargon, pas de discours commercial sans fin. On vous écoute, on vous conseille, on vous trouve la bonne voiture. Simplement. Notre but : que vous repartiez au volant serein, sans stress ni surprise.",
  },
  {
    title: 'La confiance, ça se construit',
    body: "Depuis plus de 16 ans, on avance avec la même idée : mériter la confiance de chaque client. Un véhicule contrôlé, un prix clair, une livraison respectée, une garantie tenue. Pas de promesse creuse, juste du sérieux au quotidien. C'est comme ça qu'on a vendu plus de 40 000 véhicules partout en France.",
  },
  {
    title: 'La proximité, notre moteur',
    body: "Nos 6 points de vente à Nancy, Talange, Épinal, La Mothe Achard, Bordeaux et Rennes sont bien plus que des adresses : ce sont des équipes locales, accessibles, humaines. On privilégie le contact direct, la transparence et le suivi. Vous n'êtes pas un dossier, vous êtes un conducteur qu'on accompagne.",
  },
  {
    title: "L'efficacité, sans compromis",
    body: "Nos équipes maîtrisent leur métier : sourcing, contrôle, préparation, financement, livraison. Chaque étape est optimisée pour que tout soit fluide et rapide. Parce que votre temps compte autant que votre satisfaction.",
  },
  {
    title: 'Le bon sens avant tout',
    body: "Pas de surenchère, pas de tape-à-l'œil. Chez Activ Automobiles, on préfère être fiables que prétentieux. Des voitures récentes, bien entretenues, garanties, au juste prix — c'est notre ADN depuis le premier jour.",
  },
]

const COMMITMENTS = [
  'Contrôle technique rigoureux de chaque véhicule',
  'Garantie constructeur ou extension de garantie disponible',
  "Historique d'entretien complet et transparent",
  'Prix justes et compétitifs sans frais cachés',
  'Service après-vente réactif et professionnel',
  'Livraison sécurisée partout en France',
]


const MISSIONS = [
  {
    label: 'Notre mission',
    text: "Rendre l'achat d'une voiture récente simple, transparent et accessible à tous, en offrant un service de qualité et des véhicules fiables à prix compétitifs.",
    accent: '#1A3F6F',
  },
  {
    label: 'Pour nos clients',
    text: "Offrir une expérience d'achat exceptionnelle avec des véhicules de qualité, un accompagnement personnalisé et des solutions de financement adaptées à chaque budget.",
    accent: '#1A3F6F',
  },
  {
    label: 'Pour le marché',
    text: "Établir de nouveaux standards de transparence et de qualité dans la vente de véhicules d'occasion récents, en plaçant la satisfaction client au cœur de notre activité.",
    accent: '#1A3F6F',
  },
]

export default function NosEngagementsPage() {
  return (
    <main style={{ background: '#F8FAFC' }} className="min-h-screen">

      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm" style={{ color: '#94A3B8' }}>
            <li>
              <Link href="/" className="hover:text-[#1A3F6F] transition-colors">
                Accueil
              </Link>
            </li>
            <ChevronRight className="w-3 h-3" />
            <li className="font-semibold" style={{ color: '#475569' }}>Nos engagements</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(170deg, #0B1829 0%, #112240 60%, #0F2040 100%)' }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 80% at 80% 30%, rgba(37,99,235,0.12) 0%, transparent 65%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 40% 50% at 10% 80%, rgba(26,63,111,0.18) 0%, transparent 60%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12" style={{ background: '#3B82F6' }} />
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: '#93C5FD' }}
              >
                Notre promesse depuis 2008
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Pourquoi choisir{' '}
              <span className="block">
                <span className="text-white">Activ </span>
                <span style={{ color: '#8A9BB0' }}>Automobiles</span>
                <span className="text-white">&nbsp;?</span>
              </span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.60)' }}>
              Chez Activ Automobiles, nous mettons la confiance, la transparence et le service client au centre de tout. Nos équipes sélectionnent chaque véhicule avec soin pour garantir fiabilité, sécurité et satisfaction. Grâce à notre réseau national, vous profitez du meilleur choix au meilleur prix, où que vous soyez.
            </p>
          </div>
        </div>
      </section>

      {/* Mission strip */}
      <section className="py-16" style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 md:grid-cols-3 overflow-hidden rounded-2xl"
            style={{ border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(11,24,41,0.06)' }}
          >
            {MISSIONS.map((card, idx) => (
              <div
                key={card.label}
                className="p-8 group transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: '#fff',
                  borderRight: idx < MISSIONS.length - 1 ? '1px solid #E2E8F0' : undefined,
                  borderBottom: '1px solid transparent',
                }}
              >
                <div
                  className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5 transition-colors duration-200 group-hover:bg-[#1A3F6F]/15"
                  style={{ color: '#1A3F6F', background: 'rgba(26,63,111,0.08)' }}
                >
                  {card.label}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ background: '#F8FAFC' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8" style={{ background: '#1A3F6F' }} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#1A3F6F' }}>Nos valeurs</span>
              </div>
              <h2 className="text-4xl font-bold" style={{ color: '#0B1829' }}>
                Les principes qui nous guident
              </h2>
            </div>
            <p className="text-sm leading-relaxed sm:text-right max-w-xs" style={{ color: '#64748B' }}>
              Chaque décision, chaque véhicule, chaque interaction est guidée par ces six piliers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map(({ icon: Icon, title, description }, idx) => (
              <div
                key={title}
                className="engagement-value-card group relative rounded-2xl p-7"
                style={{ boxShadow: '0 2px 12px rgba(11,24,41,0.05)' }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-3 text-[9rem] font-black leading-none select-none pointer-events-none transition-colors duration-300"
                  style={{ color: 'rgba(26,63,111,0.04)' }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(26,63,111,0.08)' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: '#1A3F6F' }} />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#0B1829' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24" style={{ background: '#fff', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: '#1A3F6F' }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#1A3F6F' }}>Notre philosophie</span>
              <div className="h-px w-8" style={{ background: '#1A3F6F' }} />
            </div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#0B1829' }}>
              Des principes simples pour une expérience sereine
            </h2>
          </div>
          <div className="space-y-3">
            {PHILOSOPHY.map((item, idx) => (
              <details
                key={idx}
                className="group rounded-2xl overflow-hidden transition-all duration-200"
                style={{ background: '#fff', border: '1px solid #E2E8F0', boxShadow: '0 1px 6px rgba(11,24,41,0.04)' }}
              >
                <summary
                  className="flex items-center gap-5 px-8 py-6 cursor-pointer list-none transition-colors duration-200"
                >
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-black text-sm transition-colors duration-200"
                    style={{ background: 'rgba(26,63,111,0.08)', color: '#1A3F6F' }}
                  >
                    {idx + 1}
                  </span>
                  <span className="font-bold text-lg flex-1" style={{ color: '#0B1829' }}>{item.title}</span>
                  <ChevronRight
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-open:rotate-90"
                    style={{ color: '#94A3B8' }}
                  />
                </summary>
                <div
                  className="px-8 pb-7 leading-relaxed border-t pt-5 ml-14"
                  style={{ borderColor: '#F1F5F9', color: '#475569' }}
                >
                  {item.body}
                </div>
              </details>
            ))}
          </div>
          <div
            className="mt-10 rounded-2xl p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0B1829 0%, #1A3F6F 100%)' }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)' }}
            />
            <p className="relative text-white font-bold text-xl mb-2 tracking-wide">
              Simplicité · Confiance · Proximité · Efficacité · Bon sens
            </p>
            <p className="relative text-sm mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Notre manière de faire depuis 2008. Plus de 40 000 clients nous recommandent.
            </p>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-24" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: '#1A3F6F' }} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#1A3F6F' }}>Nos engagements</span>
              </div>
              <h2 className="text-4xl font-bold mb-5" style={{ color: '#0B1829' }}>
                Qualité, contrôle et service : notre promesse
              </h2>
              <p className="leading-relaxed" style={{ color: '#64748B' }}>
                Chaque véhicule vendu chez Activ Automobiles passe par un processus rigoureux de vérification. Notre engagement : zéro mauvaise surprise.
              </p>
            </div>
            <div className="space-y-3">
              {COMMITMENTS.map((item) => (
                <div
                  key={item}
                  className="engagement-commitment-row flex items-center gap-4 rounded-xl px-5 py-4 group hover:-translate-y-0.5"
                  style={{
                    background: '#fff',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 6px rgba(11,24,41,0.04)',
                  }}
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" style={{ color: '#1A3F6F' }} />
                  <span className="text-sm font-medium" style={{ color: '#334155' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Network stats */}
      <section className="py-24" style={{ background: '#fff', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: '#1A3F6F' }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#1A3F6F' }}>Notre réseau</span>
              <div className="h-px w-8" style={{ background: '#1A3F6F' }} />
            </div>
            <h2 className="text-4xl font-bold mb-5" style={{ color: '#0B1829' }}>
              Présents partout en France
            </h2>
            <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#64748B' }}>
              Nos points de vente vous accueillent pour découvrir nos véhicules, bénéficier de conseils personnalisés et concrétiser votre projet automobile.
            </p>
          </div>

          <div className="mb-16">
            <StatsBar />
          </div>

          {/* CTA */}
          <div
            className="relative rounded-3xl overflow-hidden p-12"
            style={{ background: 'linear-gradient(135deg, #0B1829 0%, #1A3F6F 100%)' }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,255,255,0.07) 0%, transparent 60%)' }}
            />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Prêt à trouver votre véhicule&nbsp;?
                </h2>
                <p className="max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Explorez notre catalogue de 800+ véhicules certifiés et bénéficiez d&apos;un accompagnement personnalisé dans l&apos;une de nos 6 agences.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <Link
                  href="/voitures-occasion"
                  className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                  style={{
                    background: '#fff',
                    color: '#1A3F6F',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                  }}
                >
                  Explorer nos véhicules
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/agences"
                  className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-xl whitespace-nowrap transition-all duration-200 hover:border-white/60"
                  style={{
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  Trouver une agence
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
