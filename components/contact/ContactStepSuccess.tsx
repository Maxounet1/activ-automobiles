'use client';

import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ContactStepSuccessProps {
  onReset: () => void;
}

export default function ContactStepSuccess({ onReset }: ContactStepSuccessProps) {
  return (
    <div className="flex flex-col items-center text-center py-8 px-4">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          boxShadow: '0 8px 24px rgba(5,150,105,0.3)',
        }}
      >
        <CheckCircle className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
      <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-8">
        Notre équipe vous répondra sous 24h ouvrées. Vérifiez également vos
        spams si vous ne recevez pas de réponse.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onReset}
          className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:border-gray-300 transition-all"
        >
          Envoyer un autre message
        </button>
        <Link
          href="/voitures-occasion"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold transition-all hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
            boxShadow: '0 6px 20px rgba(26,63,111,0.3)',
          }}
        >
          Voir nos véhicules
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
