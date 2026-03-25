'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ArrowRight, RefreshCw, ShieldCheck, Truck, CircleCheck as CheckCircle, Clock, Wrench, MapPin, KeyRound, FileText, Phone, Tag, Zap, Disc, Cog, Car, ClipboardList, Headphones, BadgeCheck, ScrollText, UserCheck, Mail, Banknote, ScanLine, Sparkles, Gauge, Cpu, Fuel, Search, LayoutGrid, Settings2, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

import RepriseTab from '@/components/services/RepriseTab';
import PreparationTab from '@/components/services/PreparationTab';
import GarantieTab from '@/components/services/GarantieTab';
import LivraisonTab from '@/components/services/LivraisonTab';
import AdministratifTab from '@/components/services/AdministratifTab';
import RechercheTab from '@/components/services/RechercheTab';

const TABS = [
  { id: 'reprise', label: 'Reprise', icon: RefreshCw, color: '#1A3F6F' },
  { id: 'preparation', label: 'Préparation', icon: Wrench, color: '#7C3D12' },
  { id: 'administratif', label: 'Service Administratif', icon: ClipboardList, color: '#374151' },
  { id: 'livraison', label: 'Livraison', icon: Truck, color: '#1A3F6F' },
  { id: 'recherche', label: 'Recherche personnalisée', icon: Search, color: '#1A3F6F' },
  { id: 'garantie', label: 'Garantie', icon: ShieldCheck, color: '#0D7A4E' },
]

export default function ServicesPage() {
  const [active, setActive] = useState('reprise')

  const activeTab = TABS.find((t) => t.id === active)!

  return (
    <main style={{ background: '#F8FAFC' }} className="min-h-screen">

      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm" style={{ color: '#94A3B8' }}>
            <li><Link href="/" className="hover:text-[#1A3F6F] transition-colors">Accueil</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li className="font-semibold" style={{ color: '#475569' }}>Services</li>
          </ol>
        </div>
      </nav>

      {/* Hero header */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(170deg, #0B1829 0%, #112240 60%, #0F2040 100%)' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 80% 30%, rgba(37,99,235,0.12) 0%, transparent 65%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 40% 50% at 10% 80%, rgba(26,63,111,0.18) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12" style={{ background: '#3B82F6' }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#93C5FD' }}>
                Ce qu&apos;on fait pour vous
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Des services pensés{' '}
              <span className="block">
                <span style={{ color: '#8A9BB0' }}>
                  pour vous simplifier la vie.
                </span>
              </span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.60)' }}>
              Reprise, garantie, livraison, administratif. Tout est prévu pour que votre achat soit fluide, transparent et sans mauvaise surprise.
            </p>
          </div>

          {/* Tab pills in hero */}
          <div className="flex flex-wrap gap-2 mt-10">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = tab.id === active
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: '#fff',
                          color: '#1A3F6F',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                        }
                      : {
                          background: 'rgba(255,255,255,0.10)',
                          color: 'rgba(255,255,255,0.70)',
                          border: '1px solid rgba(255,255,255,0.14)',
                        }
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sticky tab navigation */}
      <div
        className="sticky top-[105px] z-30 shadow-sm"
        style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = tab.id === active
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200',
                    isActive
                      ? 'border-[#1A3F6F] text-[#1A3F6F]'
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-[#1A3F6F]' : 'text-gray-400')} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {active === 'reprise' && <RepriseTab />}
        {active === 'preparation' && <PreparationTab />}
        {active === 'garantie' && <GarantieTab />}
        {active === 'livraison' && <LivraisonTab />}
        {active === 'administratif' && <AdministratifTab />}
        {active === 'recherche' && <RechercheTab />}
      </section>

      {/* Bottom strip */}
      <section className="py-14" style={{ background: '#fff', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm mb-6" style={{ color: '#64748B' }}>
            Une question sur nos services ? Notre équipe est disponible du lundi au samedi.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 font-bold text-sm px-8 py-3.5 rounded-xl text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
                boxShadow: '0 6px 24px rgba(26,63,111,0.25)',
              }}
            >
              Nous contacter
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/voitures-occasion"
              className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-3.5 rounded-xl transition-all duration-200 hover:bg-[#1A3F6F]/5"
              style={{
                color: '#1A3F6F',
                border: '1.5px solid rgba(26,63,111,0.25)',
              }}
            >
              Voir nos véhicules
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
