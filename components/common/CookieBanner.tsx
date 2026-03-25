'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie, Shield, BarChart2 } from 'lucide-react';

const COOKIE_KEY = 'activ-cookie-consent';

type ConsentState = 'accepted' | 'declined' | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState | 'loading'>('loading');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      setConsent((stored as ConsentState) ?? null);
    } catch {
      setConsent(null);
    }
  }, []);

  const save = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(COOKIE_KEY, value);
    } catch {}
    setConsent(value);
  };

  if (consent === 'loading' || consent === 'accepted' || consent === 'declined') return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] p-4"
      role="dialog"
      aria-label="Gestion des cookies"
      aria-modal="false"
    >
      <div
        className="max-w-4xl mx-auto rounded-2xl p-5 shadow-2xl"
        style={{
          background: 'rgba(11,24,41,0.97)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Icon + text */}
          <div className="flex gap-3 flex-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(26,63,111,0.2)' }}
            >
              <Cookie className="w-5 h-5" style={{ color: '#1A3F6F' }} />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">
                Nous respectons votre vie privée
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.
                Vous pouvez accepter ou refuser les cookies non essentiels.{' '}
                <Link
                  href="/legal/confidentialite"
                  className="underline hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  En savoir plus
                </Link>
              </p>

              {showDetails && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    {
                      icon: Shield,
                      title: 'Cookies essentiels',
                      desc: 'Nécessaires au fonctionnement du site',
                      always: true,
                    },
                    {
                      icon: BarChart2,
                      title: 'Cookies analytiques',
                      desc: 'Mesure d\'audience et statistiques',
                      always: false,
                    },
                  ].map(({ icon: Icon, title, desc, always }) => (
                    <div
                      key={title}
                      className="flex items-start gap-2 p-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#1A3F6F' }} />
                      <div>
                        <p className="text-xs font-semibold text-white">{title}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{desc}</p>
                        {always && (
                          <span className="inline-block mt-1 text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
                            Toujours actifs
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setShowDetails((s) => !s)}
                className="mt-2 text-xs underline transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {showDetails ? 'Masquer les détails' : 'Voir les détails'}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={() => save('accepted')}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)' }}
            >
              Tout accepter
            </button>
            <button
              onClick={() => save('declined')}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Refuser
            </button>
          </div>

          <button
            onClick={() => save('declined')}
            className="p-1.5 rounded-lg transition-colors hover:bg-white/10 flex-shrink-0 self-start sm:self-auto"
            aria-label="Fermer"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
