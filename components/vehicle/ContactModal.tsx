'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, CheckCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: {
    brand: string;
    model: string;
    version: string;
    price: number;
    imageUrl: string;
    imageAlt: string;
  };
}

export default function ContactModal({ isOpen, onClose, vehicle }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultMessage = `Bonjour, je suis intéressé(e) par votre ${vehicle.brand} ${vehicle.model} ${vehicle.version} à ${vehicle.price.toLocaleString('fr-FR')} €. Merci de me recontacter.`;

  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    message: defaultMessage,
  });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setLoading(false);
      setForm(prev => ({ ...prev, message: defaultMessage }));
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Keyboard close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a brief async action
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

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
          0% { opacity: 0; transform: scale(0.93) translateY(14px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div
        className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-3xl"
        style={{
          animation: 'modal-in 0.28s cubic-bezier(0.22,1,0.36,1) both',
          background: '#fff',
          boxShadow: '0 32px 80px rgba(4,8,18,0.45)',
        }}
      >
        {/* Header */}
        <div
          className="relative px-6 pt-6 pb-5 rounded-t-3xl"
          style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2847 100%)' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-1">Activ Automobiles</p>
              <h3 className="text-lg font-black text-white leading-tight">Je suis intéressé(e)</h3>
              <p className="text-sm text-white/60 mt-0.5">Nous vous rappelons rapidement</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.22)' }}
              aria-label="Fermer"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Vehicle summary card */}
          <div
            className="flex items-center gap-3 mt-4 p-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <div className="relative w-16 h-11 rounded-lg overflow-hidden flex-shrink-0" style={{ background: '#1A3F6F' }}>
              <Image
                src={vehicle.imageUrl}
                alt={vehicle.imageAlt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{vehicle.brand} {vehicle.model}</p>
              <p className="text-xs text-white/60 truncate">{vehicle.version}</p>
              <p className="text-sm font-black text-white mt-0.5">{vehicle.price.toLocaleString('fr-FR')} €</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {submitted ? (
            <div className="py-8 flex flex-col items-center text-center gap-3">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: '#F0FDF4' }}
              >
                <CheckCircle className="w-8 h-8" style={{ color: '#16A34A' }} />
              </div>
              <h4 className="text-lg font-black" style={{ color: '#0B1829' }}>Demande envoyée !</h4>
              <p className="text-sm" style={{ color: '#64748B' }}>
                Notre équipe vous contactera dans les plus brefs délais pour ce véhicule.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-xl font-bold text-white text-sm"
                style={{ background: '#1A3F6F' }}
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#475569' }}>Nom *</label>
                  <input
                    type="text"
                    name="nom"
                    required
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Dupont"
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      border: '1.5px solid #E2E8F0',
                      color: '#0B1829',
                      background: '#F8FAFC',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#1A3F6F')}
                    onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#475569' }}>Prénom *</label>
                  <input
                    type="text"
                    name="prenom"
                    required
                    value={form.prenom}
                    onChange={handleChange}
                    placeholder="Jean"
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      border: '1.5px solid #E2E8F0',
                      color: '#0B1829',
                      background: '#F8FAFC',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#1A3F6F')}
                    onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#475569' }}>Téléphone *</label>
                <input
                  type="tel"
                  name="telephone"
                  required
                  value={form.telephone}
                  onChange={handleChange}
                  placeholder="06 12 34 56 78"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: '1.5px solid #E2E8F0',
                    color: '#0B1829',
                    background: '#F8FAFC',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#1A3F6F')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#475569' }}>Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jean.dupont@email.com"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: '1.5px solid #E2E8F0',
                    color: '#0B1829',
                    background: '#F8FAFC',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#1A3F6F')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#475569' }}>Message</label>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all resize-none"
                  style={{
                    border: '1.5px solid #E2E8F0',
                    color: '#0B1829',
                    background: '#F8FAFC',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#1A3F6F')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70"
                style={{ background: 'linear-gradient(135deg, #1A3F6F, #2563EB)' }}
              >
                {loading ? 'Envoi en cours…' : 'Envoyer ma demande'}
              </button>

              <p className="text-center text-[11px]" style={{ color: '#94A3B8' }}>
                Vos données sont traitées de manière confidentielle.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
