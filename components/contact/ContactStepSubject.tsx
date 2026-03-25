'use client';

import { ArrowRight, Lock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Subject {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon;
}

interface ContactStepSubjectProps {
  subjects: Subject[];
  selected: string;
  error: string;
  onSelect: (id: string) => void;
  onNext: () => void;
}

export default function ContactStepSubject({
  subjects,
  selected,
  error,
  onSelect,
  onNext,
}: ContactStepSubjectProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {subjects.map((s) => {
          const active = selected === s.id;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              className="group relative text-left rounded-xl p-4 border transition-all duration-200"
              style={{
                borderColor: active ? '#1A3F6F' : '#E2E8F0',
                background: active
                  ? 'linear-gradient(160deg, rgba(26,63,111,0.06) 0%, rgba(26,63,111,0.02) 100%)'
                  : '#fff',
                boxShadow: active
                  ? '0 4px 16px rgba(26,63,111,0.1), inset 0 0 0 1px rgba(26,63,111,0.15)'
                  : '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: active
                      ? 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)'
                      : 'linear-gradient(135deg, #EEF4FB 0%, #dce8f7 100%)',
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: active ? '#fff' : '#1A3F6F' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-sm"
                    style={{ color: active ? '#1A3F6F' : '#1E293B' }}
                  >
                    {s.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={onNext}
        className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: selected
            ? 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)'
            : '#CBD5E1',
          boxShadow: selected
            ? '0 6px 20px rgba(26,63,111,0.3)'
            : 'none',
          cursor: selected ? 'pointer' : 'not-allowed',
        }}
      >
        Continuer
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-center text-gray-400 text-[11px] mt-3 flex items-center justify-center gap-1.5">
        <Lock className="w-3 h-3" />
        Vos données sont sécurisées et ne seront jamais partagées
      </p>
    </>
  );
}
