'use client';

import { Shield, ChevronLeft, Loader2, CheckCircle } from 'lucide-react';

interface StepConfirmationProps {
  step1Data: { prenom: string; nom: string; email: string; telephone: string } | null;
  step2Data: { agence: string; dateSouhaitee: string; creneauHoraire: string } | null;
  isLoading: boolean;
  onBack: () => void;
  onConfirm: () => void;
}

export default function StepConfirmation({
  step1Data,
  step2Data,
  isLoading,
  onBack,
  onConfirm,
}: StepConfirmationProps) {
  return (
    <div className="p-8 space-y-6">
      {/* Summary */}
      <div className="bg-[#0B1829] rounded-xl border border-[#1a2540] p-5 space-y-3">
        <h4 className="text-white font-semibold mb-4">
          Récapitulatif de votre réservation
        </h4>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <span className="text-gray-500">Nom</span>
          <span className="text-white font-medium">
            {step1Data?.prenom} {step1Data?.nom}
          </span>
          <span className="text-gray-500">Email</span>
          <span className="text-white font-medium">{step1Data?.email}</span>
          <span className="text-gray-500">Téléphone</span>
          <span className="text-white font-medium">
            {step1Data?.telephone}
          </span>
          <span className="text-gray-500">Agence</span>
          <span className="text-white font-medium">{step2Data?.agence}</span>
          <span className="text-gray-500">Date</span>
          <span className="text-white font-medium">
            {step2Data?.dateSouhaitee &&
              new Date(step2Data.dateSouhaitee).toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
          </span>
          <span className="text-gray-500">Créneau</span>
          <span className="text-white font-medium">
            {step2Data?.creneauHoraire}
          </span>
        </div>
      </div>

      {/* Deposit notice */}
      <div className="bg-[#1A3F6F]/5 border border-[#1A3F6F]/20 rounded-xl p-5 flex gap-4">
        <Shield className="w-6 h-6 text-[#1A3F6F] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-white font-semibold mb-1">
            Dépôt de 500€ pour réserver
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Le dépôt de garantie de 500€ sera à régler directement en agence
            lors de votre rendez-vous. Il est intégralement remboursable en
            cas d&apos;annulation jusqu&apos;à 48h avant.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-[#1a2540] text-gray-300 hover:border-gray-400 hover:text-white transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 bg-[#1A3F6F] hover:bg-[#143260] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#1A3F6F]/20 hover:shadow-[#1A3F6F]/40"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Confirmation en cours...
            </>
          ) : (
            <>
              Confirmer ma réservation
              <CheckCircle className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      <p className="text-center text-gray-500 text-xs">
        En confirmant, vous acceptez nos{' '}
        <a href="/cgv" className="text-[#1A3F6F] hover:underline">
          conditions générales de vente
        </a>{' '}
        et notre{' '}
        <a
          href="/politique-confidentialite"
          className="text-[#1A3F6F] hover:underline"
        >
          politique de confidentialité
        </a>
        .
      </p>
    </div>
  );
}
