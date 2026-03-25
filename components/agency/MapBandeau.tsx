'use client';

import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import type { Agency } from '@/lib/types';

interface MapBandeauProps {
  agency: Agency;
}

const MAP_IMAGES: Record<string, string> = {
  'nancy-laxou': '/LaxouS.webp',
  'talange': '/TalangeS.webp',
  'epinal-chavelot': '/EpinalS.webp',
  'la-mothe-achard': '/LamotheachardS.webp',
  'bordeaux': '/BordeauxS.webp',
  'rennes': '/RennesS.webp',
};

export default function MapBandeau({ agency }: MapBandeauProps) {
  const mapImage = MAP_IMAGES[agency.slug];

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${agency.name} ${agency.address} ${agency.zipCode} ${agency.city}`
  )}`;
  const telHref = `tel:${agency.phone.replace(/\s/g, '')}`;

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'clamp(220px, 40vh, 320px)' }}>
      {/* Map image or fallback */}
      {mapImage ? (
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group block absolute inset-0 cursor-pointer"
        >
          <img
            src={mapImage}
            alt={`Carte Google Maps — Activ Automobiles ${agency.city}`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Overlay bleu nuit multiply — toujours visible, plus intense au hover */}
          <div
            className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-400 pointer-events-none"
            style={{ background: 'rgba(12,24,58,0.22)', mixBlendMode: 'multiply' }}
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
            style={{ background: 'rgba(12,24,58,0.38)', mixBlendMode: 'multiply' }}
          />
          {/* Fondu haut */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{ height: '28%', background: 'linear-gradient(to bottom, rgba(10,18,45,0.40) 0%, transparent 100%)' }}
          />
          {/* Fondu bas */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{ height: '32%', background: 'linear-gradient(to top, rgba(10,18,45,0.50) 0%, transparent 100%)' }}
          />
          {/* Vignette bords */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 60px rgba(10,18,45,0.30)' }}
          />
        </a>
      ) : (
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center bg-[#e8eaed] cursor-pointer group"
        >
          <div className="flex flex-col items-center gap-3 text-gray-400 group-hover:text-[#1A3F6F] transition-colors">
            <MapPin className="w-10 h-10" />
            <span className="text-sm font-semibold">Voir sur Google Maps</span>
          </div>
        </a>
      )}


      {/* Étiquette "ACTIV'AUTOMOBILES LAXOU" style Google Maps pin overlay */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
        style={{ marginTop: '-20px' }}
      >
        <div
          className="flex items-center gap-2 rounded-full px-4 py-2"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.12)',
            border: '1px solid rgba(255,255,255,0.95)',
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#EA4335] flex-shrink-0" />
          <span className="text-[11px] font-bold text-gray-800 tracking-wide whitespace-nowrap">
            ACTIV&apos;AUTOMOBILES {agency.city.toUpperCase()}
          </span>
        </div>
        {/* Pin tail */}
        <div className="flex justify-center mt-[-1px]">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '7px solid rgba(255,255,255,0.92)',
            }}
          />
        </div>
      </div>

      {/* Info card flottante */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-stretch rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)',
          border: '1px solid rgba(255,255,255,0.95)',
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        {/* Accent bar */}
        <div className="w-1 flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #1A3F6F, #2558A0)' }} />

        <div className="flex items-center gap-4 px-5 py-3.5">
          {/* Pin icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(26,63,111,0.10)' }}
          >
            <MapPin className="w-5 h-5 text-[#1A3F6F]" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 leading-tight whitespace-nowrap">
              Activ Automobiles {agency.city}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">
              {agency.address}, {agency.zipCode} {agency.city}
            </p>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-100 flex-shrink-0" />

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={telHref}
              className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
                boxShadow: '0 2px 12px rgba(26,63,111,0.30)',
              }}
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{agency.phone}</span>
              <span className="sm:hidden">Appeler</span>
            </a>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#1A3F6F] border border-[#1A3F6F]/20 bg-[#1A3F6F]/5 hover:bg-[#1A3F6F]/10 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Itinéraire</span>
              <ExternalLink className="w-3 h-3 sm:hidden" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
