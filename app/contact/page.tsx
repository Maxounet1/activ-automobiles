import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/utils'
import {
  ChevronRight,
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  ArrowRight,
  Star,
} from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'
import PromiseCards from '@/components/contact/PromiseCards'

export const metadata: Metadata = {
  title: 'Contact — 6 Agences Activ Automobiles | Nancy, Bordeaux, Rennes',
  description:
    "Contactez nos équipes pour vos questions sur véhicules, financement, reprise ou garantie. 6 agences en France, réponse garantie sous 24h.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'Contact — Activ Automobiles | 6 Agences en France',
    description: "Contactez-nous pour vos questions automobiles. 6 agences, réponse sous 24h.",
    url: 'https://www.activ-automobiles.fr/contact',
    siteName: 'Activ Automobiles',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: 'https://www.activ-automobiles.fr/og-default.jpg', width: 1200, height: 630, alt: 'Contact Activ Automobiles' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nous Contacter | Activ Automobiles',
    description: '6 agences en France, équipes disponibles du lundi au samedi.',
    images: ['https://www.activ-automobiles.fr/og-default.jpg'],
  },
}

const AGENCIES = [
  {
    city: 'Nancy-Laxou',
    address: '12 Rue du Saintois',
    zip: '54520',
    phone: '03 83 97 97 97',
    email: 'nancy-laxou@activ-auto.fr',
    hours: 'Lun–Sam 9h–19h',
    rating: 4.6,
    reviews: 643,
    slug: 'nancy-laxou',
  },
  {
    city: 'Talange',
    address: 'Rue du Pré le Loop',
    zip: '57525',
    phone: '03 87 73 73 73',
    email: 'talange@activ-auto.fr',
    hours: 'Lun–Sam 10h–19h',
    rating: 4.7,
    reviews: 559,
    slug: 'talange',
  },
  {
    city: 'Épinal-Chavelot',
    address: '22 Rue d\'Épinal',
    zip: '88150',
    phone: '03 29 99 09 99',
    email: 'epinal-chavelot@activ-auto.fr',
    hours: 'Lun–Sam 9h–19h',
    rating: 4.7,
    reviews: 343,
    slug: 'epinal-chavelot',
  },
  {
    city: 'La Mothe-Achard',
    address: '3 Rue Michel Breton',
    zip: '85150',
    phone: '02 19 08 01 10',
    email: 'lamotheachard@activ-auto.fr',
    hours: 'Lun–Sam 9h–19h',
    rating: 4.6,
    reviews: 234,
    slug: 'la-mothe-achard',
  },
  {
    city: 'Bordeaux',
    address: '82 Rue Marie Curie',
    zip: '33127',
    phone: '05 18 25 14 94',
    email: 'bordeaux@activ-auto.fr',
    hours: 'Lun–Sam 9h–19h',
    rating: 4.6,
    reviews: 204,
    slug: 'bordeaux',
  },
  {
    city: 'Rennes',
    address: 'ZA La Brosse',
    zip: '35760',
    phone: '02 19 08 01 09',
    email: 'rennes@activ-auto.fr',
    hours: 'Lun–Sam 9h–19h',
    rating: 4.9,
    reviews: 94,
    slug: 'rennes',
  },
]

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-[#1A3F6F] transition-colors">
                Accueil
              </Link>
            </li>
            <ChevronRight className="w-3 h-3" />
            <li className="text-gray-700 font-medium">Contact</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-20 pb-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 60% 0%, rgba(26,63,111,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#1A3F6F]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
                Nous sommes à votre écoute
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-5">
              Une question ?{' '}
              <span
                className="block"
                style={{
                  background: 'linear-gradient(92deg, #1A3F6F 0%, #2558A0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Parlons-en.
              </span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl mb-3">
              Nos conseillers sont disponibles du lundi au samedi pour vous accompagner dans votre projet, sans pression et sans engagement.
            </p>
            <p className="text-base text-gray-400 leading-relaxed max-w-xl mb-10">
              Véhicule, financement, reprise, garantie — expliquez-nous votre situation et nous vous apportons une réponse claire et personnalisée sous 24h.
            </p>

            {/* Promises inline */}
            <PromiseCards />
          </div>
        </div>
      </section>

      {/* Main content: form + agencies */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#1A3F6F]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
                  Formulaire de contact
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Écrivez-nous
              </h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                3 étapes simples — Sujet · Coordonnées · Message. Un conseiller de l&apos;agence vous répond directement, rapidement et sans intermédiaire.
              </p>
              <div
                className="relative rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(26,63,111,0.11)]"
                style={{
                  background: 'linear-gradient(160deg, #ffffff 0%, #f4f7fb 100%)',
                  border: '1px solid rgba(26,63,111,0.38)',
                  boxShadow: '0 2px 14px rgba(26,63,111,0.07)',
                }}
              >
                {/* Shimmer top */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(26,63,111,0.32) 50%, transparent 100%)',
                  }}
                />
                <ContactForm />
              </div>
            </div>

            {/* Agencies sidebar */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-[#1A3F6F]" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
                    Nos agences
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Venez nous voir
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  6 agences à votre service, du lundi au samedi.
                </p>
              </div>

              <div className="space-y-3">
                {AGENCIES.map((agency) => {
                  const full = Math.floor(agency.rating)
                  const partial = agency.rating - full
                  const starId = `star-partial-${agency.slug}`
                  return (
                    <Link
                      key={agency.city}
                      href={`/agences/${agency.slug}`}
                      className="group relative block rounded-xl p-4 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(26,63,111,0.10)]"
                      style={{
                        background: 'linear-gradient(160deg, #ffffff 0%, #f4f7fb 100%)',
                        border: '1px solid rgba(26,63,111,0.12)',
                        boxShadow: '0 1px 4px rgba(26,63,111,0.06)',
                      }}
                    >
                      {/* Shimmer top */}
                      <div
                        aria-hidden="true"
                        className="absolute top-0 left-0 right-0 pointer-events-none"
                        style={{
                          height: '1px',
                          background: 'linear-gradient(90deg, transparent 0%, rgba(26,63,111,0.30) 50%, transparent 100%)',
                        }}
                      />
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900 text-xs group-hover:text-[#1A3F6F] transition-colors">
                            Activ Automobiles {agency.city}
                          </h3>
                          <div className="flex items-center gap-1 mt-0.5">
                            <svg width="0" height="0" className="absolute">
                              <defs>
                                <linearGradient id={starId} x1="0" x2="1" y1="0" y2="0">
                                  <stop offset={`${partial * 100}%`} stopColor="#F59E0B" />
                                  <stop offset={`${partial * 100}%`} stopColor="#E5E7EB" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => {
                                const isFull = i < full
                                const isPartial = i === full && partial > 0
                                return (
                                  <Star
                                    key={i}
                                    className="w-2.5 h-2.5"
                                    style={{
                                      fill: isFull ? '#F59E0B' : isPartial ? `url(#${starId})` : '#E5E7EB',
                                      color: isFull || isPartial ? '#F59E0B' : '#E5E7EB',
                                    }}
                                  />
                                )
                              })}
                            </div>
                            <span className="text-[10px] text-gray-400">
                              {agency.rating} ({agency.reviews} avis)
                            </span>
                          </div>
                        </div>
                        <div className="w-7 h-7 bg-[#1A3F6F]/8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A3F6F]/15 transition-colors">
                          <MapPin className="w-3 h-3 text-[#1A3F6F]" />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-[rgba(26,63,111,0.07)] pt-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                          <MapPin className="w-2.5 h-2.5 text-gray-300 flex-shrink-0" />
                          <span>{agency.address}, {agency.zip}</span>
                        </div>
                        <a
                          href={`tel:${agency.phone.replace(/\s/g, '')}`}
                          className="flex items-center gap-1.5 text-[11px] text-gray-700 font-semibold hover:text-[#1A3F6F] transition-colors"
                        >
                          <Phone className="w-2.5 h-2.5 text-gray-300 flex-shrink-0" />
                          {agency.phone}
                        </a>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                          <Clock className="w-2.5 h-2.5 text-gray-300 flex-shrink-0" />
                          <span>{agency.hours}</span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Quick contact box */}
              <div
                className="rounded-2xl p-6 text-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)' }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 60% 60% at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)',
                  }}
                />
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white font-bold text-sm mb-1">Besoin d&apos;une réponse rapide ?</p>
                  <p className="text-blue-200 text-xs leading-relaxed mb-4">
                    Appelez directement l&apos;agence la plus proche de chez vous.
                  </p>
                  <Link
                    href="/agences"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#1A3F6F] font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Trouver une agence
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom stats banner */}
      <section className="bg-gray-50 border-t border-gray-200 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, value: '< 24h', label: 'Délai de réponse garanti', sub: 'En jours ouvrés' },
              { icon: MapPin, value: '6', label: 'Agences disponibles', sub: 'Nancy · Talange · Épinal · Vendée · Bordeaux · Rennes' },
              { icon: Star, value: '4.7/5', label: 'Note de satisfaction', sub: 'Sur +2 100 avis clients' },
            ].map(({ icon: Icon, value, label, sub }) => (
              <div
                key={label}
                className="relative rounded-2xl py-10 px-8 text-center overflow-hidden transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(26,63,111,0.12)]"
                style={{
                  background: 'linear-gradient(160deg, #ffffff 0%, #f4f7fb 100%)',
                  border: '1px solid rgba(26,63,111,0.13)',
                  boxShadow: '0 1px 4px rgba(26,63,111,0.05)',
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(26,63,111,0.30) 50%, transparent 100%)',
                  }}
                />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(26,63,111,0.06)' }}>
                  <Icon className="w-5 h-5 text-[#1A3F6F]" />
                </div>
                <p className="text-4xl font-black text-gray-900 mb-1">{value}</p>
                <p className="text-gray-700 font-semibold text-sm mb-0.5">{label}</p>
                <p className="text-gray-400 text-xs">{sub}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm mb-5">
              Préférez-vous explorer notre catalogue avant de nous contacter ?
            </p>
            <Link
              href="/voitures-occasion"
              className="inline-flex items-center gap-2 font-bold text-sm text-[#1A3F6F] hover:gap-3 transition-all"
            >
              Voir tous nos véhicules disponibles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
