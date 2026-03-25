'use client';

import { Phone, PhoneCall } from 'lucide-react';
import { track } from '@/lib/analytics';

interface CatalogStickyMobileCTAProps {
  onOpenCallback: () => void;
}

export default function CatalogStickyMobileCTA({ onOpenCallback }: CatalogStickyMobileCTAProps) {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden"
      style={{
        background: '#fff',
        borderTop: '1px solid #e5e7eb',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <a
          href="tel:0142567890"
          onClick={() => track('click_call', { source: 'sticky_mobile' })}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all duration-150 active:scale-95"
          style={{ background: '#16a34a' }}
        >
          <Phone className="w-4 h-4" />
          Appeler
        </a>
        <button
          type="button"
          onClick={() => {
            onOpenCallback();
            track('submit_callback', { source: 'sticky_mobile' });
          }}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all duration-150 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)' }}
        >
          <PhoneCall className="w-4 h-4" />
          Être rappelé
        </button>
      </div>
    </div>
  );
}
