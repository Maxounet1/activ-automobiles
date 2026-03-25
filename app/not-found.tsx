import Link from 'next/link';
import type { Metadata } from 'next';
import { Home, Search, ArrowRight, Car } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page introuvable | Activ Automobiles',
  description: 'La page que vous recherchez est introuvable.',
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  { href: '/voitures-occasion', label: 'Voir nos véhicules', icon: Car },
  { href: '/agences', label: 'Trouver une agence', icon: Search },
  { href: '/', label: 'Retour à l\'accueil', icon: Home },
];

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
      style={{ background: 'linear-gradient(180deg, #0B1829 0%, #111827 100%)' }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(26,63,111,0.18) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* 404 number */}
        <div
          className="text-[120px] sm:text-[160px] font-black leading-none select-none mb-2"
          style={{
            background: 'linear-gradient(180deg, rgba(26,63,111,0.6) 0%, rgba(26,63,111,0.08) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </div>

        {/* Icon */}
        <div
          className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 -mt-4"
          style={{ background: 'rgba(26,63,111,0.12)', border: '1px solid rgba(26,63,111,0.25)' }}
        >
          <Car className="w-8 h-8" style={{ color: '#1A3F6F' }} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white mb-3">
          Oups, cette page a pris la route
        </h1>
        <p className="text-sm leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.55)' }}>
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Retrouvez nos véhicules d&apos;occasion sélectionnés parmi nos agences.
        </p>

        {/* Quick links */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 group"
              style={
                href === '/voitures-occasion'
                  ? {
                      background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
                      color: '#fff',
                      boxShadow: '0 4px 20px rgba(26,63,111,0.3)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(255,255,255,0.75)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }
              }
            >
              <Icon className="w-4 h-4" />
              {label}
              {href === '/voitures-occasion' && (
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              )}
            </Link>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-14 flex items-center justify-center gap-6 flex-wrap">
          {[
            '+ de 800 véhicules',
            'Garantie 12 mois',
            '6 agences en France',
          ].map((label) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ background: '#1A3F6F' }} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
