'use client';

import { useState } from 'react';
import { useFocusTrap } from '@/lib/hooks/useFocusTrap';
import { X, PhoneCall, CheckCircle, Loader2 } from 'lucide-react';
import { track } from '@/lib/analytics';

interface CallbackDrawerProps {
  open: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  '9h - 10h', '10h - 11h', '11h - 12h',
  '14h - 15h', '15h - 16h', '16h - 17h', '17h - 18h',
];

const CITIES = ['Nancy', 'Metz', 'Bordeaux', 'Rennes', 'Épinal', 'La Mothe-Achard'];

export default function CallbackDrawer({ open, onClose }: CallbackDrawerProps) {
  const focusTrapRef = useFocusTrap(open);
  const [form, setForm] = useState({ name: '', phone: '', city: '', slot: '' });
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
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    track('submit_callback', { source: 'callback_drawer', city: form.city });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSuccess(false); setForm({ name: '', phone: '', city: '', slot: '' }); setErrors({}); }, 300);
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
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Être rappelé</h2>
              <p className="text-xs" style={{ color: '#93c5fd' }}>Réponse sous 15 minutes</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {success ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#f0fdf4' }}>
                <CheckCircle className="w-9 h-9" style={{ color: '#16a34a' }} />
              </div>
              <h3 className="text-xl font-extrabold" style={{ color: '#111827' }}>Demande envoyée !</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                Un conseiller va vous rappeler dans les plus brefs délais.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 px-6 py-3 rounded-xl text-sm font-bold text-white"
                style={{ background: '#16a34a' }}
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#374151' }}>
                  Votre prénom et nom *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(e => ({ ...e, name: '' })); }}
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: `1.5px solid ${errors.name ? '#ef4444' : '#e5e7eb'}`,
                    background: '#f9fafb',
                    color: '#111827',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#1A3F6F'; e.currentTarget.style.background = '#fff'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = errors.name ? '#ef4444' : '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
                />
                {errors.name && <p className="text-xs mt-1" role="alert" style={{ color: '#ef4444' }}>{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#374151' }}>
                  Votre téléphone *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(e => ({ ...e, phone: '' })); }}
                  placeholder="06 12 34 56 78"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: `1.5px solid ${errors.phone ? '#ef4444' : '#e5e7eb'}`,
                    background: '#f9fafb',
                    color: '#111827',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#1A3F6F'; e.currentTarget.style.background = '#fff'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = errors.phone ? '#ef4444' : '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
                />
                {errors.phone && <p className="text-xs mt-1" role="alert" style={{ color: '#ef4444' }}>{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#374151' }}>
                  Agence de votre choix
                </label>
                <select
                  value={form.city}
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none"
                  style={{ border: '1.5px solid #e5e7eb', background: '#f9fafb', color: form.city ? '#111827' : '#9ca3af' }}
                >
                  <option value="">Peu importe</option>
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2" style={{ color: '#374151' }}>
                  Créneau préféré
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, slot }))}
                      className="py-2 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: form.slot === slot ? '#1A3F6F' : '#f3f4f6',
                        color: form.slot === slot ? '#fff' : '#374151',
                        border: `1.5px solid ${form.slot === slot ? '#1A3F6F' : '#e5e7eb'}`,
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-70"
                style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)' }}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours…</>
                ) : (
                  <><PhoneCall className="w-4 h-4" /> Demander à être rappelé</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
