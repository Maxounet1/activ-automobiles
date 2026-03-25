'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { Vehicle } from '@/lib/types';


interface AssistantState {
  budgetMax: number | null;
  mensualite: boolean;
  usage: string;
  typeVehicule: string;
  energie: string;
  priorite: string;
}

const INITIAL_STATE: AssistantState = {
  budgetMax: null,
  mensualite: false,
  usage: '',
  typeVehicule: '',
  energie: '',
  priorite: '',
};

const STEPS = [
  { id: 1, label: 'Budget' },
  { id: 2, label: 'Usage' },
  { id: 3, label: 'Format' },
  { id: 4, label: 'Moteur' },
  { id: 5, label: 'Priorité' },
];

const BUDGET_OPTIONS = [
  { label: 'Moins de 10 000 €', value: 10000 },
  { label: '10 000 – 20 000 €', value: 20000 },
  { label: '20 000 – 30 000 €', value: 30000 },
  { label: '30 000 € et +', value: 60000 },
  { label: 'Je préfère en mensualité', value: null, mensualite: true },
];

const USAGE_OPTIONS = [
  { label: 'Ville', value: 'ville' },
  { label: 'Mixte', value: 'mixte' },
  { label: 'Longs trajets', value: 'longs-trajets' },
  { label: 'Famille', value: 'famille' },
  { label: 'Professionnel', value: 'professionnel' },
];

const TYPE_OPTIONS = [
  { label: 'SUV', value: 'suv' },
  { label: 'Citadine', value: 'citadine' },
  { label: 'Berline', value: 'berline' },
  { label: 'Break', value: 'break' },
  { label: 'Utilitaire', value: 'utilitaire' },
  { label: 'Je ne sais pas', value: '' },
];

const ENERGIE_OPTIONS = [
  { label: 'Essence', value: 'essence' },
  { label: 'Diesel', value: 'diesel' },
  { label: 'Hybride', value: 'hybride' },
  { label: 'Électrique', value: 'electrique' },
  { label: 'Peu importe', value: '' },
];

const PRIORITE_OPTIONS = [
  { label: 'Petit prix', value: 'prix' },
  { label: 'Faible consommation', value: 'conso' },
  { label: 'Confort', value: 'confort' },
  { label: 'Performance', value: 'performance' },
  { label: 'Disponible immédiatement', value: 'dispo' },
];

function countResults(state: AssistantState, vehicles: Vehicle[]): number {
  return vehicles.filter((v) => {
    if (state.budgetMax && !state.mensualite && v.price > state.budgetMax) return false;
    if (state.typeVehicule && v.bodyType !== state.typeVehicule) return false;
    if (state.energie && v.fuel !== state.energie) return false;
    return true;
  }).length;
}

function buildQueryString(state: AssistantState): string {
  const params = new URLSearchParams();
  if (state.budgetMax && !state.mensualite) params.set('budget', String(state.budgetMax));
  if (state.typeVehicule) params.set('category', state.typeVehicule);
  if (state.energie) params.set('fuel', state.energie);
  const qs = params.toString();
  return qs ? `/voitures-occasion?${qs}` : '/voitures-occasion';
}

interface GuidedAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles?: Vehicle[];
}

export default function GuidedAssistant({ isOpen, onClose, vehicles = [] }: GuidedAssistantProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<AssistantState>(INITIAL_STATE);
  const [animDir, setAnimDir] = useState<'forward' | 'back'>('forward');
  const [animating, setAnimating] = useState(false);

  const reset = useCallback(() => {
    setStep(1);
    setState(INITIAL_STATE);
    setAnimDir('forward');
    setAnimating(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const goTo = (nextStep: number, dir: 'forward' | 'back') => {
    if (animating) return;
    setAnimDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setStep(nextStep);
      setAnimating(false);
    }, 220);
  };

  const handleNext = () => {
    if (step < 5) goTo(step + 1, 'forward');
  };

  const handleBack = () => {
    if (step > 1) goTo(step - 1, 'back');
  };

  const handleSelect = (key: keyof AssistantState, value: string | number | boolean | null) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleBudgetSelect = (opt: typeof BUDGET_OPTIONS[0]) => {
    setState((prev) => ({
      ...prev,
      budgetMax: opt.value,
      mensualite: opt.mensualite ?? false,
    }));
  };

  const handleSeeResults = () => {
    const url = buildQueryString(state);
    router.push(url);
    onClose();
  };

  const resultsCount = countResults(state, vehicles);
  const isDone = step === 5;

  const getSlideStyle = (): React.CSSProperties => {
    if (!animating) return { opacity: 1, transform: 'translateX(0)' };
    return {
      opacity: 0,
      transform: animDir === 'forward' ? 'translateX(-24px)' : 'translateX(24px)',
    };
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(11,24,41,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full flex flex-col"
        style={{
          maxWidth: 560,
          background: '#FFFFFF',
          borderRadius: 20,
          boxShadow: '0 24px 60px rgba(0,0,0,0.16), 0 4px 16px rgba(26,63,111,0.10)',
          border: '1px solid rgba(26,63,111,0.08)',
          maxHeight: '92vh',
          overflow: 'hidden',
        }}
      >
        <div className="relative z-10 flex flex-col" style={{ maxHeight: '92vh' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-gray-100">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200"
              style={{
                color: step === 1 ? 'rgba(26,63,111,0.25)' : 'rgba(26,63,111,0.55)',
                cursor: step === 1 ? 'default' : 'pointer',
              }}
              disabled={step === 1}
              onMouseEnter={(e) => { if (step > 1) e.currentTarget.style.color = '#1A3F6F'; }}
              onMouseLeave={(e) => { if (step > 1) e.currentTarget.style.color = 'rgba(26,63,111,0.55)'; }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Retour
            </button>

            <div className="flex items-center gap-1.5">
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  style={{
                    width: s.id === step ? 20 : 6,
                    height: 4,
                    borderRadius: 9999,
                    background: s.id < step ? '#1A3F6F' : s.id === step ? '#1A3F6F' : 'rgba(26,63,111,0.15)',
                    transition: 'all 250ms ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200"
              style={{ background: 'rgba(26,63,111,0.06)', color: 'rgba(26,63,111,0.45)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(26,63,111,0.10)';
                e.currentTarget.style.color = '#1A3F6F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(26,63,111,0.06)';
                e.currentTarget.style.color = 'rgba(26,63,111,0.45)';
              }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Title */}
          <div
            className="px-7 pt-6 pb-3"
            style={{ transition: 'opacity 220ms ease, transform 220ms ease', ...getSlideStyle() }}
          >
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: 'rgba(26,63,111,0.40)' }}>
              Étape {step} / {STEPS.length}
            </p>
            <h2 className="text-xl font-black leading-tight" style={{ color: '#0B1829' }}>
              {step === 1 && 'Quel est votre budget ?'}
              {step === 2 && "Comment allez-vous l'utiliser ?"}
              {step === 3 && 'Quel style vous correspond ?'}
              {step === 4 && 'Préférence moteur ?'}
              {step === 5 && 'Le plus important pour vous ?'}
            </h2>
          </div>

          {/* Options */}
          <div
            className="flex-1 overflow-y-auto px-7 py-4"
            style={{ transition: 'opacity 220ms ease, transform 220ms ease', ...getSlideStyle() }}
          >
            {step === 1 && (
              <div className="flex flex-col gap-2.5">
                {BUDGET_OPTIONS.map((opt) => {
                  const selected = opt.mensualite
                    ? state.mensualite
                    : state.budgetMax === opt.value && !state.mensualite;
                  return (
                    <OptionButton
                      key={opt.label}
                      label={opt.label}
                      selected={selected}
                      onClick={() => handleBudgetSelect(opt)}
                    />
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-2.5">
                {USAGE_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.value}
                    label={opt.label}
                    selected={state.usage === opt.value}
                    onClick={() => handleSelect('usage', opt.value)}
                  />
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-2.5">
                {TYPE_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.label}
                    label={opt.label}
                    selected={state.typeVehicule === opt.value}
                    onClick={() => handleSelect('typeVehicule', opt.value)}
                  />
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-2.5">
                {ENERGIE_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.label}
                    label={opt.label}
                    selected={state.energie === opt.value}
                    onClick={() => handleSelect('energie', opt.value)}
                  />
                ))}
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col gap-2.5">
                {PRIORITE_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.value}
                    label={opt.label}
                    selected={state.priorite === opt.value}
                    onClick={() => handleSelect('priorite', opt.value)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="px-7 pb-7 pt-4 flex flex-col gap-3 border-t border-gray-100">
            {isDone ? (
              <>
                <div
                  className="text-center py-3 px-4 rounded-xl mb-1"
                  style={{ background: 'rgba(26,63,111,0.05)', border: '1px solid rgba(26,63,111,0.12)' }}
                >
                  <p className="text-sm font-bold" style={{ color: '#0B1829' }}>
                    Nous avons trouvé{' '}
                    <span style={{ color: '#1A3F6F' }}>{resultsCount} véhicule{resultsCount !== 1 ? 's' : ''}</span>{' '}
                    adaptés à votre profil.
                  </p>
                </div>
                <button
                  onClick={handleSeeResults}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm text-white transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2548 100%)',
                    boxShadow: '0 4px 20px rgba(26,63,111,0.30)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(26,63,111,0.40)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(26,63,111,0.30)';
                  }}
                >
                  Voir ma sélection
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={reset}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{
                    background: 'rgba(26,63,111,0.04)',
                    border: '1.5px solid rgba(26,63,111,0.12)',
                    color: 'rgba(26,63,111,0.55)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(26,63,111,0.08)';
                    e.currentTarget.style.color = '#1A3F6F';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(26,63,111,0.04)';
                    e.currentTarget.style.color = 'rgba(26,63,111,0.55)';
                  }}
                >
                  Modifier mes réponses
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm text-white transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #1A3F6F 0%, #0f2548 100%)',
                  boxShadow: '0 4px 20px rgba(26,63,111,0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(26,63,111,0.38)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(26,63,111,0.25)';
                }}
              >
                Continuer
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface OptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function OptionButton({ label, selected, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-4 rounded-xl text-sm font-semibold text-left transition-all duration-200"
      style={{
        background: selected ? 'rgba(26,63,111,0.07)' : '#FAFAFA',
        border: selected ? '1.5px solid rgba(26,63,111,0.40)' : '1.5px solid #ECEEF2',
        color: selected ? '#1A3F6F' : '#374151',
        transform: selected ? 'translateX(3px)' : 'translateX(0)',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.background = 'rgba(26,63,111,0.04)';
          e.currentTarget.style.borderColor = 'rgba(26,63,111,0.20)';
          e.currentTarget.style.color = '#1A3F6F';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.background = '#FAFAFA';
          e.currentTarget.style.borderColor = '#ECEEF2';
          e.currentTarget.style.color = '#374151';
        }
      }}
    >
      {label}
      {selected && (
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: '#1A3F6F' }}
        >
          <Check className="w-3 h-3 text-white" />
        </span>
      )}
    </button>
  );
}
