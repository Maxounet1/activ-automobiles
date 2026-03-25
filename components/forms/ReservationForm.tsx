'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  CheckCircle,
  Loader2,
  User,
  MapPin,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Shield,
} from 'lucide-react'

declare function track(event: string, props?: Record<string, unknown>): void

// --- Step 1 schema ---
const step1Schema = z.object({
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  telephone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{8})$/, 'Numéro de téléphone invalide'),
})

// --- Step 2 schema ---
const step2Schema = z.object({
  agence: z.string().min(1, 'Veuillez sélectionner une agence'),
  dateSouhaitee: z
    .string()
    .min(1, 'Veuillez sélectionner une date')
    .refine((val) => {
      const date = new Date(val)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date >= today
    }, 'La date doit être dans le futur'),
  creneauHoraire: z.string().min(1, 'Veuillez sélectionner un créneau horaire'),
})

type Step1Data = z.infer<typeof step1Schema>
type Step2Data = z.infer<typeof step2Schema>

interface ReservationFormProps {
  vehicleId: string
  vehicleSlug: string
}

const AGENCES = [
  'Paris 15ème — 42 Avenue Félix Faure',
  'Boulogne-Billancourt — 18 Rue de Sèvres',
  'Versailles — 5 Rue de la Paroisse',
  'Cergy — 12 Boulevard de l\'Hautil',
]

const CRENEAUX = [
  '09h00 – 10h00',
  '10h00 – 11h00',
  '11h00 – 12h00',
  '14h00 – 15h00',
  '15h00 – 16h00',
  '16h00 – 17h00',
  '17h00 – 18h00',
]

function generateReservationNumber(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result = 'RES-'
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function getTomorrowDate(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

export default function ReservationForm({
  vehicleId,
  vehicleSlug,
}: ReservationFormProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reservationNumber, setReservationNumber] = useState('')

  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null)

  // Step 1 form
  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
  })

  // Step 2 form
  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      dateSouhaitee: getTomorrowDate(),
      agence: '',
      creneauHoraire: '',
    },
  })

  const handleStep1Submit = (data: Step1Data) => {
    if (typeof track !== 'undefined') {
      track('start_reservation', {
        vehicleId,
        vehicleSlug,
        step: 1,
      })
    }
    setStep1Data(data)
    setCurrentStep(2)
  }

  const handleStep2Submit = (data: Step2Data) => {
    setStep2Data(data)
    setCurrentStep(3)
  }

  const handleFinalSubmit = async () => {
    setIsLoading(true)
    try {
      if (typeof track !== 'undefined') {
        track('complete_reservation', {
          vehicleId,
          vehicleSlug,
          agence: step2Data?.agence,
          date: step2Data?.dateSouhaitee,
        })
      }
      const { supabase } = await import('@/lib/supabase')
      // TODO: Vérifier que les politiques RLS sont configurées pour 'leads' (insert) dans Supabase Dashboard
      await supabase.from('leads').insert({
        type: 'reservation',
        vehicle_id: vehicleId ?? null,
        first_name: step1Data?.prenom ?? '',
        last_name: step1Data?.nom ?? '',
        email: step1Data?.email ?? '',
        phone: step1Data?.telephone ?? '',
        message: step2Data?.agence ?? null,
        preferred_date: step2Data?.dateSouhaitee ?? null,
      })
      setReservationNumber(generateReservationNumber())
      setSubmitted(true)
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  // Success state
  if (submitted) {
    return (
      <div className="rounded-2xl bg-[#0d1426] border border-[#1a2540] p-10 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 bg-[#1A3F6F]/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-[#1A3F6F]" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          Votre réservation est confirmée !
        </h3>
        <p className="text-gray-300 mb-6">
          Un email de confirmation a été envoyé à{' '}
          <span className="text-white font-medium">{step1Data?.email}</span>
        </p>
        <div className="inline-block bg-[#0B1829] border border-[#1A3F6F]/40 rounded-xl px-8 py-5 mb-6">
          <p className="text-gray-400 text-sm mb-1">Numéro de réservation</p>
          <p className="text-3xl font-bold tracking-widest text-[#1A3F6F]">
            {reservationNumber}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="bg-[#0B1829] rounded-lg p-4 border border-[#1a2540]">
            <p className="text-gray-500 text-xs mb-1">Agence choisie</p>
            <p className="text-white text-sm font-medium">{step2Data?.agence}</p>
          </div>
          <div className="bg-[#0B1829] rounded-lg p-4 border border-[#1a2540]">
            <p className="text-gray-500 text-xs mb-1">Date & créneau</p>
            <p className="text-white text-sm font-medium">
              {step2Data?.dateSouhaitee &&
                new Date(step2Data.dateSouhaitee).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}{' '}
              — {step2Data?.creneauHoraire}
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-6">
          Le dépôt de 500€ sera à régler directement en agence. Vous pouvez
          annuler gratuitement jusqu&apos;à 48h avant le rendez-vous.
        </p>
      </div>
    )
  }

  // Progress steps config
  const steps = [
    { number: 1, label: 'Coordonnées', icon: User },
    { number: 2, label: 'Agence & date', icon: MapPin },
    { number: 3, label: 'Confirmation', icon: CreditCard },
  ]

  return (
    <div className="rounded-2xl bg-[#0d1426] border border-[#1a2540] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A3F6F]/20 to-[#1A3F6F]/20 px-8 py-6 border-b border-[#1a2540]">
        <h3 className="text-xl font-bold text-white">Réserver ce véhicule</h3>
        <p className="text-gray-400 text-sm mt-1">
          Dépôt de 500€ pour sécuriser votre acquisition
        </p>
      </div>

      {/* Progress bar */}
      <div className="px-8 pt-6">
        <div className="flex items-center gap-0">
          {steps.map((step, idx) => {
            const Icon = step.icon
            const isActive = currentStep === step.number
            const isCompleted = currentStep > step.number
            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                      isCompleted
                        ? 'bg-[#1A3F6F] border-[#1A3F6F] text-white'
                        : isActive
                        ? 'bg-transparent border-[#1A3F6F] text-[#1A3F6F]'
                        : 'bg-transparent border-[#1a2540] text-gray-600'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium whitespace-nowrap ${
                      isActive
                        ? 'text-[#1A3F6F]'
                        : isCompleted
                        ? 'text-gray-300'
                        : 'text-gray-600'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 mb-5 transition-all duration-300 ${
                      currentStep > step.number
                        ? 'bg-[#1A3F6F]'
                        : 'bg-[#1a2540]'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step 1 — Coordonnées */}
      {currentStep === 1 && (
        <form
          onSubmit={form1.handleSubmit(handleStep1Submit)}
          className="p-8 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Prénom <span className="text-[#1A3F6F]">*</span>
              </label>
              <input
                {...form1.register('prenom')}
                type="text"
                autoComplete="given-name"
                placeholder="Jean"
                className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
              />
              {form1.formState.errors.prenom && (
                <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                  {form1.formState.errors.prenom.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Nom <span className="text-[#1A3F6F]">*</span>
              </label>
              <input
                {...form1.register('nom')}
                type="text"
                autoComplete="family-name"
                placeholder="Dupont"
                className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
              />
              {form1.formState.errors.nom && (
                <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                  {form1.formState.errors.nom.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Email <span className="text-[#1A3F6F]">*</span>
            </label>
            <input
              {...form1.register('email')}
              type="email"
              autoComplete="email"
              placeholder="jean.dupont@email.com"
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
            />
            {form1.formState.errors.email && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {form1.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Téléphone <span className="text-[#1A3F6F]">*</span>
            </label>
            <input
              {...form1.register('telephone')}
              type="tel"
              autoComplete="tel"
              placeholder="06 12 34 56 78"
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
            />
            {form1.formState.errors.telephone && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {form1.formState.errors.telephone.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A3F6F] hover:bg-[#143260] text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-base shadow-lg shadow-[#1A3F6F]/20 hover:shadow-[#1A3F6F]/40"
          >
            Continuer
            <ChevronRight className="w-5 h-5" />
          </button>
        </form>
      )}

      {/* Step 2 — Agence & Date */}
      {currentStep === 2 && (
        <form
          onSubmit={form2.handleSubmit(handleStep2Submit)}
          className="p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Agence <span className="text-[#1A3F6F]">*</span>
            </label>
            <select
              {...form2.register('agence')}
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Sélectionner une agence...
              </option>
              {AGENCES.map((agence) => (
                <option key={agence} value={agence}>
                  {agence}
                </option>
              ))}
            </select>
            {form2.formState.errors.agence && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {form2.formState.errors.agence.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Date souhaitée <span className="text-[#1A3F6F]">*</span>
            </label>
            <input
              {...form2.register('dateSouhaitee')}
              type="date"
              min={getTomorrowDate()}
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
            />
            {form2.formState.errors.dateSouhaitee && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {form2.formState.errors.dateSouhaitee.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Créneau horaire <span className="text-[#1A3F6F]">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CRENEAUX.map((creneau) => {
                const isSelected = form2.watch('creneauHoraire') === creneau
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
                      {...form2.register('creneauHoraire')}
                    />
                    {creneau}
                  </label>
                )
              })}
            </div>
            {form2.formState.errors.creneauHoraire && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {form2.formState.errors.creneauHoraire.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
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
      )}

      {/* Step 3 — Confirmation */}
      {currentStep === 3 && (
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
                  new Date(step2Data.dateSouhaitee).toLocaleDateString(
                    'fr-FR',
                    {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }
                  )}
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
                Le dépôt de garantie de 500€ sera à régler directement en
                agence lors de votre rendez-vous. Il est intégralement
                remboursable en cas d&apos;annulation jusqu&apos;à 48h avant.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-[#1a2540] text-gray-300 hover:border-gray-400 hover:text-white transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Retour
            </button>
            <button
              type="button"
              onClick={handleFinalSubmit}
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
      )}
    </div>
  )
}
