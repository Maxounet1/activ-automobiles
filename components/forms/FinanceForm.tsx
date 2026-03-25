'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  CheckCircle,
  Loader2,
  User,
  Mail,
  Phone,
  Banknote,
  Calendar,
  Briefcase,
  ArrowRight,
} from 'lucide-react'

const financeSchema = z.object({
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  telephone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{8})$/, 'Numéro de téléphone invalide'),
  montantSouhaite: z
    .string()
    .min(1, 'Veuillez indiquer le montant souhaité')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 1000,
      'Le montant minimum est de 1 000 €'
    ),
  apport: z
    .string()
    .refine(
      (val) => val === '' || (!isNaN(Number(val)) && Number(val) >= 0),
      'Montant invalide'
    )
    .optional(),
  duree: z.enum(['24', '36', '48', '60', '72'], {
    errorMap: () => ({ message: 'Veuillez sélectionner une durée' }),
  }),
  situationProfessionnelle: z.enum(
    ['CDI', 'CDD', 'Indépendant', 'Retraité', 'Autre'],
    { errorMap: () => ({ message: 'Veuillez sélectionner votre situation' }) }
  ),
  vehicleId: z.string().optional(),
})

type FinanceFormData = z.infer<typeof financeSchema>

interface FinanceFormProps {
  vehicleId?: string
  vehiclePrice?: number
}

export default function FinanceForm({ vehicleId, vehiclePrice }: FinanceFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FinanceFormData>({
    resolver: zodResolver(financeSchema),
    defaultValues: {
      vehicleId: vehicleId ?? '',
      montantSouhaite: vehiclePrice ? String(vehiclePrice) : '',
      duree: '48',
      apport: '0',
    },
  })

  const onSubmit = async (_data: FinanceFormData) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-14 text-center shadow-sm">
        <div
          className="w-18 h-18 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{
            width: 72,
            height: 72,
            background: 'linear-gradient(135deg, #1A3F6F 0%, #2558A0 100%)',
          }}
        >
          <CheckCircle className="w-9 h-9 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Demande envoyée !</h3>
        <p className="text-gray-500 max-w-sm mx-auto leading-relaxed text-sm">
          Notre équipe financement vous contactera sous{' '}
          <span className="font-semibold text-gray-700">24h ouvrées</span> pour vous proposer la meilleure solution adaptée à votre profil.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1A3F6F] hover:gap-3 transition-all"
        >
          Nouvelle demande <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#1A3F6F] focus:ring-2 focus:ring-[#1A3F6F]/10 transition-all pl-10'

  const errorClass = 'text-xs text-red-500 mt-1.5'

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <div
        className="px-8 py-6 border-b border-gray-100"
        style={{
          background: 'linear-gradient(135deg, rgba(26,63,111,0.04) 0%, rgba(37,88,160,0.03) 100%)',
        }}
      >
        <h3 className="text-lg font-bold text-gray-900">Demande de simulation gratuite</h3>
        <p className="text-gray-500 text-sm mt-1">Réponse personnalisée sous 24h — Sans engagement</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
        <input type="hidden" {...register('vehicleId')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('prenom')}
                type="text"
                autoComplete="given-name"
                placeholder="Prénom *"
                className={inputClass}
              />
            </div>
            {errors.prenom && <p className={errorClass} role="alert">{errors.prenom.message}</p>}
          </div>
          <div>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('nom')}
                type="text"
                autoComplete="family-name"
                placeholder="Nom *"
                className={inputClass}
              />
            </div>
            {errors.nom && <p className={errorClass} role="alert">{errors.nom.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                placeholder="Email *"
                className={inputClass}
              />
            </div>
            {errors.email && <p className={errorClass} role="alert">{errors.email.message}</p>}
          </div>
          <div>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('telephone')}
                type="tel"
                autoComplete="tel"
                placeholder="Téléphone *"
                className={inputClass}
              />
            </div>
            {errors.telephone && <p className={errorClass} role="alert">{errors.telephone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="relative">
              <Banknote className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('montantSouhaite')}
                type="number"
                min="1000"
                step="500"
                placeholder="Montant souhaité (€) *"
                className={inputClass}
              />
            </div>
            {errors.montantSouhaite && <p className={errorClass} role="alert">{errors.montantSouhaite.message}</p>}
          </div>
          <div>
            <div className="relative">
              <Banknote className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('apport')}
                type="number"
                min="0"
                step="500"
                placeholder="Apport (€) — optionnel"
                className={inputClass}
              />
            </div>
            {errors.apport && <p className={errorClass} role="alert">{errors.apport.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                {...register('duree')}
                className={`${inputClass} appearance-none`}
              >
                <option value="24">24 mois</option>
                <option value="36">36 mois</option>
                <option value="48">48 mois</option>
                <option value="60">60 mois</option>
                <option value="72">72 mois</option>
              </select>
            </div>
            {errors.duree && <p className={errorClass} role="alert">{errors.duree.message}</p>}
          </div>
          <div>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                {...register('situationProfessionnelle')}
                className={`${inputClass} appearance-none`}
                defaultValue=""
              >
                <option value="" disabled>Situation professionnelle *</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Indépendant">Indépendant / Auto-entrepreneur</option>
                <option value="Retraité">Retraité</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            {errors.situationProfessionnelle && (
              <p className={errorClass} role="alert">{errors.situationProfessionnelle.message}</p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl px-6 py-4 font-bold text-white text-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
              boxShadow: '0 4px 20px rgba(26,63,111,0.25)',
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Envoi en cours…
              </>
            ) : (
              <>
                Demander ma simulation gratuite
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-gray-400 mt-3">
            Sans engagement · Réponse sous 24h · Données confidentielles
          </p>
        </div>
      </form>
    </div>
  )
}
