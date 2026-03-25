'use client'

import { useState } from 'react'
import { Zap, ShieldCheck, Star } from 'lucide-react'

const PROMISES = [
  { icon: Zap, label: 'Réponse sous 24h', desc: 'Garanti en jours ouvrés' },
  { icon: ShieldCheck, label: 'Données protégées', desc: 'RGPD · Aucune revente' },
  { icon: Star, label: '4.7/5 de satisfaction', desc: 'Sur +2 100 avis vérifiés' },
]

export default function PromiseCards() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-wrap gap-4">
      {PROMISES.map(({ icon: Icon, label, desc }, i) => {
        const isActive = activeIndex === i
        return (
          <div
            key={label}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            className="relative flex items-center gap-3 rounded-xl px-4 py-3 overflow-hidden cursor-default"
            style={{
              background: isActive
                ? 'linear-gradient(160deg, #f0f5ff 0%, #e8f0fb 100%)'
                : 'linear-gradient(160deg, #ffffff 0%, #f4f7fb 100%)',
              border: isActive
                ? '1px solid rgba(26,63,111,0.32)'
                : '1px solid rgba(26,63,111,0.13)',
              boxShadow: isActive
                ? '0 8px 24px rgba(26,63,111,0.12)'
                : '0 1px 4px rgba(26,63,111,0.05)',
              transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'all 0.25s ease',
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
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-250"
              style={{
                background: isActive ? 'rgba(26,63,111,0.12)' : 'rgba(26,63,111,0.06)',
              }}
            >
              <Icon className="w-4 h-4 text-[#1A3F6F]" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">{label}</p>
              <p className="text-[10px] text-gray-400">{desc}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
