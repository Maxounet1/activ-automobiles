'use client';

import { useState } from 'react';
import { ChevronDown, Shield, Wind, Radio, Car, Sofa } from 'lucide-react';

interface EquipmentAccordionProps {
  options: string[];
}

const CATEGORIES: Array<{
  key: string;
  label: string;
  Icon: React.ElementType;
  keywords: string[];
}> = [
  {
    key: 'securite',
    label: 'Sécurité',
    Icon: Shield,
    keywords: [
      'abs', 'esp', 'airbag', 'aide au stationnement', 'alerte', 'détecteur',
      'freinage', 'régulateur', 'limiteur', 'isofix', 'anti-patinage',
      'contrôle de traction', 'caméra de recul', 'radar', 'surveillance angle mort',
    ],
  },
  {
    key: 'confort',
    label: 'Confort',
    Icon: Wind,
    keywords: [
      'climatisation', 'sièges chauffants', 'accoudoir', 'volant chauffant',
      'rétroviseur', 'fermeture centralisée', 'vitres électriques', 'direction assistée',
      'toit', 'ouvrant', 'réglage', 'lombaire', 'mémoire', 'électrique', 'keyless',
      'start', 'hayon', 'coffre',
    ],
  },
  {
    key: 'multimedia',
    label: 'Multimédia',
    Icon: Radio,
    keywords: [
      'gps', 'navigation', 'bluetooth', 'usb', 'apple carplay', 'android auto',
      'écran', 'tactile', 'radio', 'dab', 'haut-parleur', 'bose', 'harman',
      'jbl', 'chargeur', 'commande vocale', 'système audio',
    ],
  },
  {
    key: 'exterieur',
    label: 'Extérieur',
    Icon: Car,
    keywords: [
      'jantes', 'phare', 'led', 'xénon', 'feux', 'barres de toit',
      'rétroviseur extérieur', 'peinture', 'vitres teintées', 'antibrouillard',
      'pack', 'becquet', 'pare-chocs',
    ],
  },
  {
    key: 'interieur',
    label: 'Intérieur',
    Icon: Sofa,
    keywords: [
      'cuir', 'tissu', 'alcantara', 'sellerie', 'tableau de bord',
      'pédalier', 'tapis', 'éclairage ambiance', 'garnissage',
    ],
  },
];

function categorizeOptions(options: string[]) {
  const categorized: Record<string, string[]> = {};
  const others: string[] = [];

  for (const opt of options) {
    const lower = opt.toLowerCase();
    let matched = false;
    for (const cat of CATEGORIES) {
      if (cat.keywords.some(kw => lower.includes(kw))) {
        if (!categorized[cat.key]) categorized[cat.key] = [];
        categorized[cat.key].push(opt);
        matched = true;
        break;
      }
    }
    if (!matched) others.push(opt);
  }

  if (others.length > 0) {
    categorized['autres'] = others;
  }

  return categorized;
}

interface SectionProps {
  label: string;
  Icon: React.ElementType;
  items: string[];
  defaultOpen: boolean;
}

function Section({ label, Icon, items, defaultOpen }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ borderBottom: '1px solid #F1F5F9' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-3.5 px-0 text-left transition-all"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(26,63,111,0.07)' }}
          >
            <Icon className="w-4 h-4" style={{ color: '#1A3F6F' }} />
          </div>
          <span className="text-sm font-bold" style={{ color: '#0B1829' }}>{label}</span>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(26,63,111,0.08)', color: '#1A3F6F' }}
          >
            {items.length}
          </span>
        </div>
        <ChevronDown
          className="w-4 h-4 transition-transform duration-200 flex-shrink-0"
          style={{ color: '#94A3B8', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {open && (
        <div className="pb-4">
          <div className="flex flex-wrap gap-2">
            {items.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: '#F0F7FF', color: '#1A3F6F', border: '1px solid #BFDBFE' }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#3B82F6' }} />
                {item.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EquipmentAccordion({ options }: EquipmentAccordionProps) {
  if (!options || options.length === 0) return null;

  const categorized = categorizeOptions(options);

  // Build ordered list: defined categories first, then "autres"
  const sections: Array<{ key: string; label: string; Icon: React.ElementType; items: string[] }> = [];

  CATEGORIES.forEach(cat => {
    if (categorized[cat.key] && categorized[cat.key].length > 0) {
      sections.push({ key: cat.key, label: cat.label, Icon: cat.Icon, items: categorized[cat.key] });
    }
  });

  if (categorized['autres'] && categorized['autres'].length > 0) {
    sections.push({
      key: 'autres',
      label: 'Autres',
      Icon: Car,
      items: categorized['autres'],
    });
  }

  const totalOptions = options.length;

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: '#fff', border: '1px solid #E8EDF3', boxShadow: '0 2px 12px rgba(11,24,41,0.05)' }}
    >
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: '#94A3B8' }}>
          Équipements & options
        </h2>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(26,63,111,0.08)', color: '#1A3F6F' }}>
          {totalOptions} équipements
        </span>
      </div>

      <div className="mt-4">
        {sections.map((section, idx) => (
          <Section
            key={section.key}
            label={section.label}
            Icon={section.Icon}
            items={section.items}
            defaultOpen={idx < 2}
          />
        ))}
      </div>
    </div>
  );
}
