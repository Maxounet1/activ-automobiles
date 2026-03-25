'use client'

import { useState } from 'react'
import {
  CheckCircle,
  Loader2,
  Car,
  CreditCard,
  RefreshCw,
  ShieldCheck,
  Truck,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  Search,
  Lock,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const SUBJECTS = [
  {
    id: 'vehicule',
    label: 'Renseignement véhicule',
    desc: 'Modèle, disponibilité, essai',
    icon: Car,
  },
  {
    id: 'financement',
    label: 'Financement',
    desc: 'Crédit, LOA, simulation',
    icon: CreditCard,
  },
  {
    id: 'reprise',
    label: 'Reprise',
    desc: 'Estimation gratuite',
    icon: RefreshCw,
  },
  {
    id: 'garantie',
    label: 'Garantie',
    desc: 'Extension, couverture',
    icon: ShieldCheck,
  },
  {
    id: 'livraison',
    label: 'Livraison',
    desc: 'Délai, zone, tarif',
    icon: Truck,
  },
  {
    id: 'recherche',
    label: 'Recherche personnalisée',
    desc: 'Critères, projet, conseils',
    icon: Search,
  },
  {
    id: 'autre',
    label: 'Autre demande',
    desc: 'Toute autre question',
    icon: HelpCircle,
  },
]

const AGENCIES = [
  { value: '', label: 'Toutes les agences' },
  { value: 'Nancy-Laxou — 54520', label: 'Nancy-Laxou — 54520' },
  { value: 'Talange — 57525', label: 'Talange — 57525' },
  { value: 'Épinal-Chavelot — 88150', label: 'Épinal-Chavelot — 88150' },
  { value: 'La Mothe-Achard — 85150', label: 'La Mothe-Achard — 85150' },
  { value: 'Bordeaux — 33127', label: 'Bordeaux — 33127' },
  { value: 'Rennes — 35760', label: 'Rennes — 35760' },
]

const STEPS = ['Votre demande', 'Vos coordonnées', 'Votre message']

interface FormState {
  name: string
  email: string
  phone: string
  agency: string
  subject: string
  message: string
}

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  agency: '',
  subject: '',
  message: '',
}

export default function ContactForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (field: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [field]: value }))
    setError('')
  }

  const nextStep = () => {
    if (step === 0 && !form.subject) {
      setError('Veuillez sélectionner un sujet.')
      return
    }
    if (step === 1) {
      if (!form.name.trim()) { setError('Veuillez indiquer votre nom.'); return }
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
        setError('Veuillez indiquer une adresse email valide.')
        return
      }
    }
    setError('')
    setStep((s) => s + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.message.trim()) { setError('Veuillez écrire votre message.'); return }
    setLoading(true)
    // TODO: Vérifier que les politiques RLS sont configurées pour 'contact_messages' (insert) dans Supabase Dashboard
    const { error: sbError } = await supabase.from('contact_messages').insert([{
      name: form.name,
      email: form.email,
      phone: form.phone,
      agency: form.agency,
      subject: form.subject,
      message: form.message,
    }])
    setLoading(false)
    if (sbError) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #2558A0 100%)' }}
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Message envoyé !</h3>
        <p className="text-gray-500 max-w-xs leading-relaxed text-sm">
          Nous avons bien reçu votre demande concernant{' '}
          <span className="font-semibold text-gray-700">
            {SUBJECTS.find((s) => s.id === form.subject)?.label ?? form.subject}
          </span>
          . Un conseiller vous répondra sous 24h ouvrées.
        </p>
        <button
          type="button"
          onClick={() => { setSuccess(false); setForm(EMPTY); setStep(0) }}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1A3F6F] hover:gap-3 transition-all"
        >
          Nouvelle demande <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#1A3F6F] focus:ring-2 focus:ring-[#1A3F6F]/10 transition-all duration-200'

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background:
                    i < step
                      ? 'linear-gradient(135deg, #1A3F6F, #2558A0)'
                      : i === step
                      ? 'linear-gradient(135deg, #1A3F6F, #2558A0)'
                      : '#F3F4F6',
                  color: i <= step ? '#fff' : '#9CA3AF',
                  boxShadow: i === step ? '0 0 0 3px rgba(26,63,111,0.15)' : 'none',
                }}
              >
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className="text-[10px] font-semibold tracking-wide hidden sm:block"
                style={{ color: i <= step ? '#1A3F6F' : '#9CA3AF' }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="flex-1 h-px mx-2 mb-4 transition-all duration-500"
                style={{ background: i < step ? '#1A3F6F' : '#E5E7EB' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 0 — Subject selection */}
      {step === 0 && (
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
            Quel est l&apos;objet de votre demande ?{' '}
            <span className="text-red-500">*</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {SUBJECTS.map(({ id, label, desc, icon: Icon }) => {
              const active = form.subject === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => { set('subject', id); setError('') }}
                  className="group relative flex flex-col items-start gap-2 rounded-xl p-4 text-left transition-all duration-200 overflow-hidden"
                  style={{
                    border: active ? '1.5px solid rgba(26,63,111,0.55)' : '1.5px solid rgba(26,63,111,0.13)',
                    background: active
                      ? 'linear-gradient(160deg, rgba(26,63,111,0.07) 0%, rgba(37,88,160,0.04) 100%)'
                      : 'linear-gradient(160deg, #ffffff 0%, #f4f7fb 100%)',
                    boxShadow: active
                      ? '0 4px 16px rgba(26,63,111,0.13), 0 1px 3px rgba(26,63,111,0.07)'
                      : '0 1px 4px rgba(26,63,111,0.06)',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      const el = e.currentTarget as HTMLElement
                      el.style.border = '1.5px solid rgba(26,63,111,0.28)'
                      el.style.boxShadow = '0 6px 20px rgba(26,63,111,0.11), 0 1px 4px rgba(26,63,111,0.07)'
                      el.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      const el = e.currentTarget as HTMLElement
                      el.style.border = '1.5px solid rgba(26,63,111,0.13)'
                      el.style.boxShadow = '0 1px 4px rgba(26,63,111,0.06)'
                      el.style.transform = 'translateY(0)'
                    }
                  }}
                >
                  {/* Shimmer top */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 pointer-events-none"
                    style={{
                      height: '1px',
                      background: active
                        ? 'linear-gradient(90deg, transparent 0%, rgba(26,63,111,0.45) 50%, transparent 100%)'
                        : 'linear-gradient(90deg, transparent 0%, rgba(26,63,111,0.18) 50%, transparent 100%)',
                    }}
                  />
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      background: active
                        ? 'linear-gradient(135deg, #1A3F6F 0%, #2558A0 100%)'
                        : 'linear-gradient(135deg, #EEF4FB 0%, #dce8f7 100%)',
                      boxShadow: active
                        ? '0 2px 8px rgba(26,63,111,0.25)'
                        : 'inset 0 1px 0 rgba(255,255,255,0.8)',
                    }}
                  >
                    <Icon
                      className="w-4 h-4 transition-colors"
                      style={{ color: active ? '#fff' : '#1A3F6F' }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold leading-tight"
                      style={{ color: active ? '#1A3F6F' : '#111827' }}
                    >
                      {label}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{desc}</p>
                  </div>
                  {active && (
                    <div
                      className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: '#1A3F6F' }}
                    >
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          <p className="text-[11px] text-gray-400 text-center mb-5 leading-relaxed">
            Votre demande est transmise directement à l&apos;équipe de l&apos;agence concernée.
            <br />
            Aucune obligation — réponse personnalisée sous 24h.
          </p>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4" role="alert">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={nextStep}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-bold text-white text-sm transition-all duration-200 hover:scale-[1.015] hover:shadow-lg active:scale-[0.99]"
            style={{
              background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
              boxShadow: '0 4px 20px rgba(26,63,111,0.25)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(26,63,111,0.35)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(26,63,111,0.25)'
            }}
          >
            Continuer
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 1 — Contact info */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
            Vos coordonnées
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Nom complet *"
                className={`${inputClass} pl-10`}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="Email *"
                className={`${inputClass} pl-10`}
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="Téléphone (optionnel)"
                className={`${inputClass} pl-10`}
              />
            </div>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={form.agency}
                onChange={(e) => set('agency', e.target.value)}
                className={`${inputClass} pl-10 appearance-none`}
              >
                {AGENCIES.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5">
            <Lock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <p className="text-[11px] text-gray-400 leading-snug">
              Vos informations restent confidentielles et ne sont jamais revendues. RGPD.
            </p>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#1A3F6F]/30 hover:bg-gray-50 hover:text-[#1A3F6F] transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-white text-sm transition-all duration-200 hover:scale-[1.015] active:scale-[0.99]"
              style={{
                background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
                boxShadow: '0 4px 20px rgba(26,63,111,0.25)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(26,63,111,0.35)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(26,63,111,0.25)'
              }}
            >
              Continuer
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Message */}
      {step === 2 && (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div
            className="border rounded-xl px-4 py-3 flex items-center gap-3"
            style={{
              background: 'linear-gradient(160deg, rgba(26,63,111,0.04) 0%, rgba(26,63,111,0.02) 100%)',
              borderColor: 'rgba(26,63,111,0.12)',
            }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #EEF4FB 0%, #dce8f7 100%)' }}
            >
              {(() => {
                const found = SUBJECTS.find((s) => s.id === form.subject)
                if (!found) return null
                const Icon = found.icon
                return <Icon className="w-4 h-4 text-[#1A3F6F]" />
              })()}
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A3F6F]">
                {SUBJECTS.find((s) => s.id === form.subject)?.label}
              </p>
              <p className="text-[11px] text-gray-500">{form.name} · {form.email}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
              Votre message <span className="text-red-500">*</span>
            </p>
            <textarea
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              rows={6}
              placeholder="Décrivez votre demande en détail. Plus vous êtes précis, plus notre réponse sera adaptée à votre situation."
              className={`${inputClass} resize-none`}
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#1A3F6F]/30 hover:bg-gray-50 hover:text-[#1A3F6F] transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-white text-sm transition-all duration-200 hover:scale-[1.015] active:scale-[0.99] disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)',
                boxShadow: '0 4px 20px rgba(26,63,111,0.25)',
              }}
              onMouseEnter={e => {
                if (!loading) (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(26,63,111,0.35)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(26,63,111,0.25)'
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Envoi…
                </>
              ) : (
                <>
                  Envoyer mon message
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1">
            <Lock className="w-3 h-3 text-gray-300 flex-shrink-0" />
            <p className="text-center text-[11px] text-gray-400">
              Un conseiller de votre agence vous recontacte personnellement sous 24h ouvrées.
            </p>
          </div>
        </form>
      )}
    </div>
  )
}
