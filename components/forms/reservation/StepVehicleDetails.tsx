'use client';

import { UseFormReturn } from 'react-hook-form';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Step2Data {
  agence: string;
  dateSouhaitee: string;
  creneauHoraire: string;
}

interface StepVehicleDetailsProps {
  form: UseFormReturn<Step2Data>;
  agences: string[];
  creneaux: string[];
  minDate: string;
  onSubmit: (data: Step2Data) => void;
  onBack: () => void;
}

export default function StepVehicleDetails({
  form,
  agences,
  creneaux,
  minDate,
  onSubmit,
  onBack,
}: StepVehicleDetailsProps) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Agence <span className="text-[#1A3F6F]">*</span>
        </label>
        <select
          {...form.register('agence')}
          className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors appearance-none cursor-pointer"
        >
          <option value="" disabled>
            Sélectionner une agence...
          </option>
          {agences.map((agence) => (
            <option key={agence} value={agence}>
              {agence}
            </option>
          ))}
        </select>
        {form.formState.errors.agence && (
          <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
            {form.formState.errors.agence.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Date souhaitée <span className="text-[#1A3F6F]">*</span>
        </label>
        <input
          {...form.register('dateSouhaitee')}
          type="date"
          min={minDate}
          className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
        />
        {form.formState.errors.dateSouhaitee && (
          <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
            {form.formState.errors.dateSouhaitee.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Créneau horaire <span className="text-[#1A3F6F]">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {creneaux.map((creneau) => {
            const isSelected = form.watch('creneauHoraire') === creneau;
            return (
              <label
                key={creneau}
                className={`cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-all ${
                  isSelected
                    ? 'border-[#1A3F6F] bg-[#1A3F6F]/10 text-[#1A3F6F]'
                    : 'border-[#1a2540] text-gray-400 hover:border-gray-500'
                }`}
              >
                <input
                  type="radio"
                  value={creneau}
                  className="sr-only"
                  {...form.register('creneauHoraire')}
                />
                {creneau}
              </label>
            );
          })}
        </div>
        {form.formState.errors.creneauHoraire && (
          <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
            {form.formState.errors.creneauHoraire.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-[#1a2540] text-gray-300 hover:border-gray-400 hover:text-white transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour
        </button>
        <button
          type="submit"
          className="flex-1 bg-[#1A3F6F] hover:bg-[#143260] text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#1A3F6F]/20 hover:shadow-[#1A3F6F]/40"
        >
          Confirmer la date
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
