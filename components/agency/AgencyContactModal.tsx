'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface AgencyContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function AgencyContactModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: AgencyContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(4,8,18,0.72)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <style>{`
        @keyframes modal-in {
          0% { opacity: 0; transform: scale(0.93) translateY(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shimmer-modal {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .modal-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%);
          background-size: 400px 100%;
          animation: shimmer-modal 3s infinite linear;
        }
      `}</style>

      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          animation: 'modal-in 0.28s cubic-bezier(0.22,1,0.36,1) both',
          background: 'rgba(255,255,255,0.97)',
          boxShadow: '0 32px 80px rgba(4,8,18,0.45), 0 0 0 1px rgba(255,255,255,0.12)',
        }}
      >
        {/* Header gradient */}
        <div
          className="relative overflow-hidden px-7 pt-7 pb-6 rounded-t-3xl"
          style={{
            background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2847 100%)',
          }}
        >
          <div className="modal-shimmer absolute inset-0 pointer-events-none" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/50 mb-1">
                Activ Automobiles
              </p>
              <h3 className="text-xl font-black text-white leading-tight">{title}</h3>
              {subtitle && (
                <p className="text-sm text-white/60 mt-1 leading-relaxed">{subtitle}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 mt-0.5"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.22)' }}
              aria-label="Fermer"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
          {/* Bottom glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
          />
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
