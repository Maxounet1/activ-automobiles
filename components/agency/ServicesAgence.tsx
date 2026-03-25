import {
  Car,
  Banknote,
  RefreshCw,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react';

const SERVICE_ICONS: Record<string, React.ElementType> = {
  financement: Banknote,
  reprise: RefreshCw,
  garantie: ShieldCheck,
  livraison: Truck,
  entretien: Wrench,
  default: Car,
};

function getIcon(service: string): React.ElementType {
  const s = service.toLowerCase();
  if (s.includes('financ') || s.includes('crédit') || s.includes('leasing')) return Banknote;
  if (s.includes('reprise') || s.includes('estimation')) return RefreshCw;
  if (s.includes('garantie')) return ShieldCheck;
  if (s.includes('livraison')) return Truck;
  if (s.includes('entretien') || s.includes('révision') || s.includes('sav')) return Wrench;
  return Car;
}

interface ServicesAgenceProps {
  services: string[];
  city: string;
}

export default function ServicesAgence({ services, city }: ServicesAgenceProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-[#1A3F6F]" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
            Ce qu&apos;on propose
          </span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-8">
          Services disponibles à {city}
        </h2>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service) => {
            const Icon = getIcon(service);
            return (
              <li
                key={service}
                className="relative flex flex-col items-center text-center gap-3 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl group"
                style={{
                  background: 'linear-gradient(145deg, #1A3F6F 0%, #0f2548 100%)',
                  border: '1px solid rgba(16,185,129,0.28)',
                  boxShadow: '0 6px 20px rgba(16,185,129,0.08), 0 2px 6px rgba(0,0,0,0.16)',
                }}
              >
                {/* Accent ligne haute */}
                <div
                  className="absolute top-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.50) 50%, transparent 100%)',
                  }}
                />
                {/* Halo émeraude */}
                <div
                  className="absolute -top-5 -right-5 pointer-events-none"
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)',
                  }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: 'rgba(16,185,129,0.14)',
                    border: '1px solid rgba(16,185,129,0.26)',
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: '#10B981' }} />
                </div>
                <span className="text-xs font-semibold leading-snug relative" style={{ color: 'rgba(255,255,255,0.85)' }}>{service}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
