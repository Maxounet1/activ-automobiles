'use client';

import { useEffect, useState } from 'react';
import { Users, X, Eye } from 'lucide-react';

function getViewerCount(): number {
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 7) {
    return Math.floor(Math.random() * (28 - 19 + 1)) + 19;
  } else if (hour >= 7 && hour < 12) {
    return Math.floor(Math.random() * (42 - 24 + 1)) + 24;
  } else if (hour >= 12 && hour < 18) {
    return Math.floor(Math.random() * (48 - 32 + 1)) + 32;
  } else {
    return Math.floor(Math.random() * (61 - 44 + 1)) + 44;
  }
}

function getDailyVisits(): number {
  return Math.floor(Math.random() * (680 - 450 + 1)) + 450;
}

function getOfferViews(): number {
  return Math.floor(Math.random() * (36 - 15 + 1)) + 15;
}

const MESSAGES = [
  { viewers: 0, text: 'personnes ont visité le site aujourd\'hui', type: 'daily' as const },
  { viewers: 0, text: 'personnes consultent notre stock en ce moment', type: 'live' as const },
  { viewers: 0, text: 'personnes ont consulté cette offre', type: 'offer' as const },
];

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [msg, setMsg] = useState<typeof MESSAGES[0] | null>(null);

  useEffect(() => {
    const template = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    let count: number;
    if (template.type === 'daily') count = getDailyVisits();
    else if (template.type === 'live') count = getViewerCount();
    else count = getOfferViews();
    setMsg({ ...template, viewers: count });
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const show = setTimeout(() => setVisible(true), 5000);
    const hide = setTimeout(() => setVisible(false), 12000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [dismissed]);

  if (dismissed || !msg) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 left-6 z-[9998] transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="flex items-center gap-3 pr-3 pl-4 py-3 rounded-2xl max-w-[300px]"
        style={{
          background: 'rgba(10, 26, 50, 0.96)',
          border: '1px solid rgba(74,144,217,0.25)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(74,144,217,0.1)',
        }}
      >
        <div
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(26,63,111,0.35)', border: '1px solid rgba(74,144,217,0.2)' }}
        >
          <Eye className="w-4 h-4" style={{ color: '#4A90D9' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-semibold leading-snug">
            <span style={{ color: '#4A90D9' }}>{msg.viewers}</span>{' '}
            {msg.text}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>En direct</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => { setVisible(false); setDismissed(true); }}
          aria-label="Fermer"
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
