'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, Eye, EyeOff, Car, Loader2 } from 'lucide-react';

interface Props {
  onSuccess: () => void;
}

export default function AdminAuth({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError('Email ou mot de passe incorrect');
    } else {
      onSuccess();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(180deg, #0B1829 0%, #111827 100%)' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{ background: '#0d1426', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(26,63,111,0.15)', border: '1px solid rgba(26,63,111,0.3)' }}
          >
            <Car className="w-7 h-7" style={{ color: '#1A3F6F' }} />
          </div>
          <div className="text-center">
            <h1 className="text-white font-black text-xl">Activ Admin</h1>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Panneau d&apos;administration</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@activ-automobiles.fr"
              className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all"
              style={{
                background: '#0B1829',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#1A3F6F')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all pr-11"
                style={{
                  background: '#0B1829',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#1A3F6F')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-500" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)' }}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
