'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, Phone, AlertCircle } from 'lucide-react';
import { track } from '@/lib/analytics';

const schema = z.object({
  firstName: z.string().min(2, 'Prénom requis (2 car. min)').max(50),
  phone: z
    .string()
    .regex(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{3}){3}$/,
      'Numéro français invalide'
    ),
  message: z.string().max(300).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof schema>;

interface CallbackFormProps {
  agencyId?: string;
  agencyPhone?: string;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span role="alert" className="flex items-center gap-1 text-xs mt-1.5 font-medium" style={{ color: '#ef4444' }}>
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {message}
    </span>
  );
}

export default function CallbackForm({ agencyId, agencyPhone }: CallbackFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    const { supabase } = await import('@/lib/supabase');
    // TODO: Vérifier que les politiques RLS sont configurées pour 'leads' (insert) dans Supabase Dashboard
    await supabase.from('leads').insert({
      type: 'callback',
      agency_id: agencyId ?? null,
      first_name: data.firstName,
      last_name: '',
      email: '',
      phone: data.phone,
      message: data.message ?? null,
    });
    track('submit_lead', { agencyId, source: 'agency_cta' });
    setSubmitted(true);
  };

  const inputBase =
    'w-full px-4 py-3.5 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 disabled:opacity-50';

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center gap-5 py-6">
        <div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2847 100%)',
            boxShadow: '0 8px 32px rgba(26,63,111,0.35)',
          }}
        >
          <CheckCircle2 className="w-8 h-8 text-white" />
          <div
            className="absolute -inset-px rounded-2xl opacity-40"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)' }}
          />
        </div>
        <div>
          <p className="font-black text-gray-900 text-xl mb-1.5">Demande envoyée !</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Un conseiller vous rappelle sous{' '}
            <strong className="text-gray-800">2h ouvrées</strong>.
          </p>
        </div>
        {agencyPhone && (
          <a
            href={`tel:${agencyPhone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
            style={{ color: '#1A3F6F' }}
          >
            <Phone className="w-4 h-4" />
            Appeler directement : {agencyPhone}
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="cb-firstName" className="block text-xs font-bold text-gray-700 mb-1.5 tracking-wide">
          Votre prénom <span style={{ color: '#1A3F6F' }}>*</span>
        </label>
        <input
          id="cb-firstName"
          type="text"
          placeholder="Jean"
          autoComplete="given-name"
          className={inputBase}
          style={{
            background: 'rgba(26,63,111,0.03)',
            border: errors.firstName ? '1.5px solid #ef4444' : '1.5px solid rgba(26,63,111,0.12)',
          }}
          {...register('firstName', {
            onBlur: (e) => {
              (e.target as HTMLElement).style.border = errors.firstName ? '1.5px solid #ef4444' : '1.5px solid rgba(26,63,111,0.12)';
              (e.target as HTMLElement).style.boxShadow = 'none';
              (e.target as HTMLElement).style.background = 'rgba(26,63,111,0.03)';
            },
          })}
          onFocus={(e) => {
            (e.target as HTMLElement).style.border = '1.5px solid rgba(26,63,111,0.5)';
            (e.target as HTMLElement).style.boxShadow = '0 0 0 3px rgba(26,63,111,0.08)';
            (e.target as HTMLElement).style.background = '#fff';
          }}
          disabled={isSubmitting}
        />
        <FieldError message={errors.firstName?.message} />
      </div>

      <div>
        <label htmlFor="cb-phone" className="block text-xs font-bold text-gray-700 mb-1.5 tracking-wide">
          Votre téléphone <span style={{ color: '#1A3F6F' }}>*</span>
        </label>
        <input
          id="cb-phone"
          type="tel"
          placeholder="06 12 34 56 78"
          autoComplete="tel"
          className={inputBase}
          style={{
            background: 'rgba(26,63,111,0.03)',
            border: errors.phone ? '1.5px solid #ef4444' : '1.5px solid rgba(26,63,111,0.12)',
          }}
          {...register('phone', {
            onBlur: (e) => {
              (e.target as HTMLElement).style.border = errors.phone ? '1.5px solid #ef4444' : '1.5px solid rgba(26,63,111,0.12)';
              (e.target as HTMLElement).style.boxShadow = 'none';
              (e.target as HTMLElement).style.background = 'rgba(26,63,111,0.03)';
            },
          })}
          onFocus={(e) => {
            (e.target as HTMLElement).style.border = '1.5px solid rgba(26,63,111,0.5)';
            (e.target as HTMLElement).style.boxShadow = '0 0 0 3px rgba(26,63,111,0.08)';
            (e.target as HTMLElement).style.background = '#fff';
          }}
          disabled={isSubmitting}
        />
        <FieldError message={errors.phone?.message} />
      </div>

      <div>
        <label htmlFor="cb-message" className="block text-xs font-bold text-gray-700 mb-1.5 tracking-wide">
          Votre besoin <span className="font-normal text-gray-400">(facultatif)</span>
        </label>
        <textarea
          id="cb-message"
          rows={3}
          placeholder="Type de véhicule recherché, budget, disponibilités..."
          className={`${inputBase} resize-none`}
          style={{
            background: 'rgba(26,63,111,0.03)',
            border: '1.5px solid rgba(26,63,111,0.12)',
          }}
          {...register('message', {
            onBlur: (e) => {
              (e.target as HTMLElement).style.border = '1.5px solid rgba(26,63,111,0.12)';
              (e.target as HTMLElement).style.boxShadow = 'none';
              (e.target as HTMLElement).style.background = 'rgba(26,63,111,0.03)';
            },
          })}
          onFocus={(e) => {
            (e.target as HTMLElement).style.border = '1.5px solid rgba(26,63,111,0.5)';
            (e.target as HTMLElement).style.boxShadow = '0 0 0 3px rgba(26,63,111,0.08)';
            (e.target as HTMLElement).style.background = '#fff';
          }}
          disabled={isSubmitting}
        />
      </div>

      <p className="text-[11px] text-gray-400 leading-relaxed">
        Données utilisées uniquement pour traiter votre demande. Conformément au RGPD.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative w-full overflow-hidden flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-black text-white transition-all hover:scale-[1.015] active:scale-[0.98] disabled:opacity-60"
        style={{
          background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
          boxShadow: '0 6px 24px rgba(26,63,111,0.40)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 36px rgba(26,63,111,0.55)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(26,63,111,0.40)';
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', backgroundSize: '300% 100%' }}
        />
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Phone className="w-4 h-4" />
            Être rappelé par l&apos;agence
          </>
        )}
      </button>
    </form>
  );
}
