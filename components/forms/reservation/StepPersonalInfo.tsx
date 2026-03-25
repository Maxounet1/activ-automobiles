'use client';

import { UseFormReturn } from 'react-hook-form';
import { User, Mail, Phone } from 'lucide-react';

interface Step1Data {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
}

interface StepPersonalInfoProps {
  form: UseFormReturn<Step1Data>;
  onSubmit: (data: Step1Data) => void;
}

export default function StepPersonalInfo({ form, onSubmit }: StepPersonalInfoProps) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#64748B' }}>
            <User className="w-3.5 h-3.5 inline mr-1.5" />Prénom
          </label>
          <input
            {...form.register('prenom')}
            className="w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1A3F6F]/20"
            style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#1E293B' }}
            placeholder="Votre prénom"
          />
          {form.formState.errors.prenom && (
            <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
              {form.formState.errors.prenom.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#64748B' }}>
            Nom
          </label>
          <input
            {...form.register('nom')}
            className="w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1A3F6F]/20"
            style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#1E293B' }}
            placeholder="Votre nom"
          />
          {form.formState.errors.nom && (
            <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
              {form.formState.errors.nom.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#64748B' }}>
          <Mail className="w-3.5 h-3.5 inline mr-1.5" />Email
        </label>
        <input
          {...form.register('email')}
          type="email"
          className="w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1A3F6F]/20"
          style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#1E293B' }}
          placeholder="votre@email.com"
        />
        {form.formState.errors.email && (
          <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#64748B' }}>
          <Phone className="w-3.5 h-3.5 inline mr-1.5" />Téléphone
        </label>
        <input
          {...form.register('telephone')}
          type="tel"
          className="w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1A3F6F]/20"
          style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', color: '#1E293B' }}
          placeholder="06 12 34 56 78"
        />
        {form.formState.errors.telephone && (
          <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
            {form.formState.errors.telephone.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-0.5"
        style={{
          background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
          boxShadow: '0 6px 20px rgba(26,63,111,0.3)',
        }}
      >
        Continuer
      </button>
    </form>
  );
}
