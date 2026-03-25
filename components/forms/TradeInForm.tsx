'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Loader2, Clock } from 'lucide-react'

declare function track(event: string, props?: Record<string, unknown>): void

const tradeInSchema = z.object({
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  telephone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{8})$/, 'Numéro de téléphone invalide'),
  marqueReprise: z.string().min(2, 'Veuillez indiquer la marque du véhicule'),
  modeleReprise: z.string().min(1, 'Veuillez indiquer le modèle du véhicule'),
  annee: z
    .string()
    .min(1, "Veuillez indiquer l'année")
    .refine((val) => {
      const year = Number(val)
      return !isNaN(year) && year >= 1990 && year <= new Date().getFullYear()
    }, `Veuillez entrer une année valide (1990–${new Date().getFullYear()})`),
  kilometrage: z
    .string()
    .min(1, 'Veuillez indiquer le kilométrage')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      'Kilométrage invalide'
    ),
  carburant: z.enum(['Essence', 'Diesel', 'Hybride', 'Électrique', 'GPL', 'Autre'], {
    errorMap: () => ({ message: 'Veuillez sélectionner le type de carburant' }),
  }),
  etatGeneral: z.enum(['Excellent', 'Bon', 'Correct', 'À réviser'], {
    errorMap: () => ({ message: "Veuillez sélectionner l'état général" }),
  }),
})

type TradeInFormData = z.infer<typeof tradeInSchema>

export default function TradeInForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TradeInFormData>({
    resolver: zodResolver(tradeInSchema),
    defaultValues: {
      carburant: undefined,
      etatGeneral: undefined,
    },
  })

  const onSubmit = async (data: TradeInFormData) => {
    setIsLoading(true)
    try {
      if (typeof track !== 'undefined') {
        track('submit_tradein', {
          marque: data.marqueReprise,
          modele: data.modeleReprise,
          annee: data.annee,
          kilometrage: data.kilometrage,
          etat: data.etatGeneral,
        })
      }
      const { supabase } = await import('@/lib/supabase')
      // TODO: Vérifier que les politiques RLS sont configurées pour 'leads' (insert) dans Supabase Dashboard
      await supabase.from('leads').insert({
        type: 'reprise',
        first_name: data.prenom,
        last_name: data.nom,
        email: data.email,
        phone: data.telephone,
        trade_brand: data.marqueReprise,
        trade_model: data.modeleReprise,
        trade_year: parseInt(data.annee),
        trade_mileage: parseInt(data.kilometrage),
        trade_fuel: data.carburant,
        message: data.etatGeneral ?? null,
      })
      setSubmitted(true)
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-[#0d1426] border border-[#1a2540] p-10 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-[#1A3F6F]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          Demande de reprise envoyée !
        </h3>
        <p className="text-gray-300 text-lg mb-4">
          Nous vous contactons sous{' '}
          <span className="text-[#1A3F6F] font-semibold">24h</span> avec une
          offre de reprise personnalisée.
        </p>
        <div className="inline-flex items-center gap-2 bg-[#1A3F6F]/10 border border-[#1A3F6F]/30 rounded-full px-5 py-2.5">
          <Clock className="w-4 h-4 text-[#1A3F6F]" />
          <span className="text-[#1A3F6F] font-medium text-sm">
            Réponse garantie sous 24h ouvrées
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-[#0d1426] border border-[#1a2540] overflow-hidden">
      <div className="bg-gradient-to-r from-[#1A3F6F]/20 to-[#1A3F6F]/20 px-8 py-6 border-b border-[#1a2540]">
        <h3 className="text-xl font-bold text-white">
          Estimation gratuite de votre véhicule
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Obtenez une offre de reprise sous 24h — sans engagement
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
        {/* Nom / Prénom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Prénom <span className="text-[#1A3F6F]">*</span>
            </label>
            <input
              {...register('prenom')}
              type="text"
              autoComplete="given-name"
              placeholder="Jean"
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
            />
            {errors.prenom && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {errors.prenom.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Nom <span className="text-[#1A3F6F]">*</span>
            </label>
            <input
              {...register('nom')}
              type="text"
              autoComplete="family-name"
              placeholder="Dupont"
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
            />
            {errors.nom && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {errors.nom.message}
              </p>
            )}
          </div>
        </div>

        {/* Email / Téléphone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Email <span className="text-[#1A3F6F]">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              autoComplete="email"
              placeholder="jean.dupont@email.com"
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
            />
            {errors.email && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Téléphone <span className="text-[#1A3F6F]">*</span>
            </label>
            <input
              {...register('telephone')}
              type="tel"
              autoComplete="tel"
              placeholder="06 12 34 56 78"
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
            />
            {errors.telephone && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {errors.telephone.message}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1a2540] pt-2">
          <p className="text-gray-400 text-sm font-medium">
            Informations sur votre véhicule
          </p>
        </div>

        {/* Marque / Modèle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Marque <span className="text-[#1A3F6F]">*</span>
            </label>
            <input
              {...register('marqueReprise')}
              type="text"
              placeholder="Renault"
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
            />
            {errors.marqueReprise && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {errors.marqueReprise.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Modèle <span className="text-[#1A3F6F]">*</span>
            </label>
            <input
              {...register('modeleReprise')}
              type="text"
              placeholder="Clio"
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
            />
            {errors.modeleReprise && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {errors.modeleReprise.message}
              </p>
            )}
          </div>
        </div>

        {/* Année / Kilométrage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Année <span className="text-[#1A3F6F]">*</span>
            </label>
            <input
              {...register('annee')}
              type="number"
              min="1990"
              max={new Date().getFullYear()}
              placeholder="2019"
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
            />
            {errors.annee && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {errors.annee.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Kilométrage <span className="text-[#1A3F6F]">*</span>
            </label>
            <input
              {...register('kilometrage')}
              type="number"
              min="0"
              step="1000"
              placeholder="85000"
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors"
            />
            {errors.kilometrage && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {errors.kilometrage.message}
              </p>
            )}
          </div>
        </div>

        {/* Carburant / État */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Carburant <span className="text-[#1A3F6F]">*</span>
            </label>
            <select
              {...register('carburant')}
              defaultValue=""
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Sélectionner...
              </option>
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybride">Hybride</option>
              <option value="Électrique">Électrique</option>
              <option value="GPL">GPL</option>
              <option value="Autre">Autre</option>
            </select>
            {errors.carburant && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {errors.carburant.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              État général <span className="text-[#1A3F6F]">*</span>
            </label>
            <select
              {...register('etatGeneral')}
              defaultValue=""
              className="w-full bg-[#0B1829] border border-[#1a2540] text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#1A3F6F] focus:ring-1 focus:ring-[#1A3F6F] transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Sélectionner...
              </option>
              <option value="Excellent">Excellent — Comme neuf</option>
              <option value="Bon">Bon — Quelques traces normales</option>
              <option value="Correct">Correct — Défauts visibles</option>
              <option value="À réviser">À réviser — Nécessite des travaux</option>
            </select>
            {errors.etatGeneral && (
              <p className="text-[#1A3F6F] text-xs mt-1" role="alert">
                {errors.etatGeneral.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#1A3F6F] hover:bg-[#143260] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 text-lg shadow-lg shadow-[#1A3F6F]/20 hover:shadow-[#1A3F6F]/40"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            'Obtenir mon estimation gratuite'
          )}
        </button>

        <p className="text-center text-gray-500 text-xs">
          Estimation gratuite et sans engagement. Réponse garantie sous 24h ouvrées.
        </p>
      </form>
    </div>
  )
}
