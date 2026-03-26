'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';

interface MobileStickyBarProps {
  price: number;
  agencyPhone: string;
  agencyPhoneTel: string;
  onContactClick: () => void;
  /** ref to the sidebar CTA area — bar appears when this element is scrolled out of view */
  sentinelId: string;
}

export default function MobileStickyBar({
  price,
  agencyPhone,
  agencyPhoneTel,
  onContactClick,
  sentinelId,
}: MobileStickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) {
      // Fallback: show after scrolling 300px
      const handleScroll = () => setVisible(window.scrollY > 300);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '0px', threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelId]);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden transition-transform duration-300"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(26,63,111,0.1)',
        boxShadow: '0 -4px 24px rgba(11,24,41,0.12)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Price */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: '#94A3B8' }}>Prix</p>
          <p className="text-xl font-black leading-tight" style={{ color: '#0B1829' }}>
            {price.toLocaleString('fr-FR')} €
          </p>
        </div>

        {/* Phone button */}
        <a
          href={agencyPhoneTel}
          aria-label={`Appeler : ${agencyPhone}`}
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-95"
          style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', color: '#16A34A' }}
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* CTA button */}
        <button
          type="button"
          onClick={onContactClick}
          className="flex-shrink-0 px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all active:scale-95 hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #1A3F6F, #2563EB)' }}
        >
          Je suis intéressé
        </button>
      </div>
    </div>
  );
}
