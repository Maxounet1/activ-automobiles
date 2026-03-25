'use client';

import { useState, useRef } from 'react';
import { Phone, ChevronDown, Clock, MessageSquare, HelpCircle, ArrowRight, Loader2 } from 'lucide-react';
import { PHONE_MAIN } from '@/lib/utils';

export default function ContactDropdown() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setPhone(''); setOpen(false); }, 2800);
  };

  return (
    <div
      className="relative hidden xl:block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-150 hover:bg-[#EEF4FB] border border-transparent hover:border-[#BFDBFE]"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#1A3F6F,#1E4D8C)', boxShadow: '0 2px 8px rgba(26,63,111,0.3)' }}
        >
          <Phone className="w-4 h-4 text-white" />
        </span>
        <div className="text-left leading-tight">
          <span className="block text-[11px] font-semibold uppercase tracking-wide" style={{ color: '#64748B' }}>Contactez-nous</span>
          <span className="block text-base font-black tabular-nums" style={{ color: '#1A3F6F' }}>{PHONE_MAIN}</span>
        </div>
        <ChevronDown
          className="w-4 h-4 transition-transform duration-200 ml-0.5"
          style={{ color: '#94A3B8', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
        />
      </button>

      <div
        className="absolute right-0 top-full mt-3 z-[9999] transition-all duration-200"
        style={{
          width: 560,
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(-6px)',
          pointerEvents: open ? 'auto' : 'none',
          background: '#fff',
          border: '1px solid #E2E8F0',
          borderTop: '3px solid #1A3F6F',
          borderRadius: '0 0 20px 20px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.13), 0 4px 20px rgba(26,63,111,0.08)',
        }}
      >
        <div className="grid grid-cols-2 divide-x divide-slate-100">

          <div className="p-6">
            {!submitted ? (
              <>
                <p className="text-xl font-black leading-tight mb-1" style={{ color: '#0F172A' }}>
                  Un expert vous rappelle<br />
                  <span style={{ color: '#1A3F6F' }}>immédiatement !</span>
                </p>
                <p className="text-xs mb-4" style={{ color: '#64748B' }}>
                  Indiquez votre numéro pour un rappel gratuit et immédiat
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2.5 mb-2.5">
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="ex : 06 12 34 56 78"
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-150"
                      style={{ border: '1.5px solid #E2E8F0', background: '#F8FAFC', color: '#0F172A' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#1A3F6F'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,63,111,0.08)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                    <button
                      type="submit"
                      disabled={submitting || !phone.trim()}
                      className="self-start px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-150 disabled:opacity-50 flex items-center gap-1.5 whitespace-nowrap hover:opacity-90 active:scale-95"
                      style={{ background: 'linear-gradient(135deg,#1A3F6F,#1E4D8C)', boxShadow: '0 4px 12px rgba(26,63,111,0.3)' }}
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Me rappeler'}
                    </button>
                  </div>
                </form>
                <p className="text-[10px]" style={{ color: '#94A3B8' }}>
                  Vous disposez du droit de vous opposer gratuitement au démarchage via{' '}
                  <a href="https://www.bloctel.gouv.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600 transition-colors">Bloctel</a>.
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 gap-2 text-center">
                <span className="w-12 h-12 rounded-full flex items-center justify-center mb-1" style={{ background: '#F0FDF4' }}>
                  <svg viewBox="0 0 20 20" fill="none" className="w-6 h-6">
                    <circle cx="10" cy="10" r="10" fill="#16A34A" />
                    <path d="M5.5 10.5l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="font-black text-base" style={{ color: '#0F172A' }}>Demande envoyée !</p>
                <p className="text-xs" style={{ color: '#64748B' }}>Un conseiller vous rappelle dans quelques minutes.</p>
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col gap-4">
            <div>
              <p className="text-base font-black leading-tight mb-2" style={{ color: '#0F172A' }}>
                Besoin de conseils ?<br />Appelez-nous
              </p>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#EFF6FF' }}>
                  <Clock className="w-4 h-4" style={{ color: '#1A3F6F' }} />
                </span>
                <div className="text-xs leading-snug" style={{ color: '#475569' }}>
                  <p>Lun – Ven : <strong>9h – 19h</strong></p>
                  <p>Samedi : <strong>9h – 18h</strong></p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#94A3B8' }}>Appel non surtaxé</p>
                </div>
              </div>
              <a
                href={`tel:${PHONE_MAIN.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-black transition-all hover:opacity-90"
                style={{ background: '#EFF6FF', color: '#1A3F6F', border: '1.5px solid #BFDBFE' }}
              >
                <Phone className="w-3.5 h-3.5" />
                {PHONE_MAIN}
              </a>
            </div>

            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 16 }}>
              <div className="space-y-2">
                <a
                  href="/contact"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold group transition-all hover:bg-slate-50"
                  style={{ color: '#374151', border: '1.5px solid #E5E7EB' }}
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" style={{ color: '#64748B' }} />
                    Autres contacts
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" style={{ color: '#9CA3AF' }} />
                </a>
                <a
                  href="/faq"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold group transition-all hover:bg-slate-50"
                  style={{ color: '#374151', border: '1.5px solid #E5E7EB' }}
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5" style={{ color: '#64748B' }} />
                    Questions fréquentes
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" style={{ color: '#9CA3AF' }} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
