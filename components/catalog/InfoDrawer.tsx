'use client';

import { useState } from 'react';
import { useFocusTrap } from '@/lib/hooks/useFocusTrap';
import { X, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import type { Vehicle } from '@/lib/types';
import { track } from '@/lib/analytics';

interface InfoDrawerProps {
  open: boolean;
  vehicle: Vehicle | null;
  onClose: () => void;
}

export default function InfoDrawer({ open, vehicle, onClose }: InfoDrawerProps) {
  const focusTrapRef = useFocusTrap(open);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nom requis';
    if (!form.phone.match(/^0[1-9]\d{8}$/)) e.phone = 'Numéro invalide';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
    track('submit_lead', { vehicleId: vehicle?.id, source: 'info_drawer' });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSuccess(false); setForm({ name: '', phone: '', message: '' }); setErrors({}); }, 300);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.45)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        ref={focusTrapRef}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white flex flex-col transition-transform duration-300"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: '-8px 0 48px rgba(0,0,0,0.12)',
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Demande d&apos;information</h2>
              {vehicle && (
                <p className="text-xs" style={{ color: '#d1d5db' }}>
                  {vehicle.brand} {vehicle.model} {vehicle.year}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {success ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#f0fdf4' }}>
                <CheckCircle className="w-9 h-9" style={{ color: '#16a34a' }} />
              </div>
              <h3 className="text-xl font-extrabold" style={{ color: '#111827' }}>Message envoyé !</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>Un conseiller vous répond sous 30 minutes.</p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 px-6 py-3 rounded-xl text-sm font-bold text-white"
                style={{ background: '#1A3F6F' }}
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {vehicle && (
                <div
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: '#f3f4f6', border: '1px solid #e5e7eb' }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: '#111827' }}>
                      {vehicle.brand} {vehicle.model}
                    </p>
                    <p className="text-xs" style={{ color: '#6b7280' }}>
                      {vehicle.year} · {vehicle.price.toLocaleString('fr-FR')} €
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#374151' }}>Votre nom *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(e => ({ ...e, name: '' })); }}
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ border: `1.5px solid ${errors.name ? '#ef4444' : '#e5e7eb'}`, background: '#f9fafb', color: '#111827' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#1A3F6F'; e.currentTarget.style.background = '#fff'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = errors.name ? '#ef4444' : '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
                />
                {errors.name && <p className="text-xs mt-1" role="alert" style={{ color: '#ef4444' }}>{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#374151' }}>Téléphone *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(e => ({ ...e, phone: '' })); }}
                  placeholder="06 12 34 56 78"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ border: `1.5px solid ${errors.phone ? '#ef4444' : '#e5e7eb'}`, background: '#f9fafb', color: '#111827' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#1A3F6F'; e.currentTarget.style.background = '#fff'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = errors.phone ? '#ef4444' : '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
                />
                {errors.phone && <p className="text-xs mt-1" role="alert" style={{ color: '#ef4444' }}>{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#374151' }}>Votre message (optionnel)</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Questions spécifiques, disponibilités..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                  style={{ border: '1.5px solid #e5e7eb', background: '#f9fafb', color: '#111827' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#1A3F6F'; e.currentTarget.style.background = '#fff'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70"
                style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)' }}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Envoi…</>
                ) : (
                  <><MessageSquare className="w-4 h-4" /> Envoyer ma demande</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
