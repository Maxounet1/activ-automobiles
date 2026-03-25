import { BadgeCheck, Clock, ShieldCheck, Truck } from 'lucide-react';

const STATS = [
  {
    value: '800+',
    label: 'véhicules en stock',
    icon: BadgeCheck,
  },
  {
    value: '12 mois',
    label: 'de garantie minimum',
    icon: ShieldCheck,
  },
  {
    value: '24h',
    label: 'réponse financement',
    icon: Clock,
  },
  {
    value: 'France entière',
    label: 'livraison à domicile',
    icon: Truck,
  },
];

export default function TrustBadges() {
  return (
    <section
      className="bg-white border-b"
      style={{ borderColor: '#EBEBEB' }}
      aria-label="Chiffres clés Activ Automobiles"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ value, label, icon: Icon }, i) => (
            <div
              key={label}
              className="relative flex items-center gap-4 py-6 px-6 lg:px-8"
            >
              {i > 0 && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 hidden sm:block"
                  style={{ background: '#EBEBEB' }}
                  aria-hidden="true"
                />
              )}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: '#EEF4FB' }}
              >
                <Icon className="w-5 h-5" style={{ color: '#1A3F6F' }} strokeWidth={2} aria-hidden="true" />
              </div>
              <div>
                <p
                  className="text-xl font-extrabold leading-none tracking-tight"
                  style={{ color: '#111111' }}
                >
                  {value}
                </p>
                <p className="text-xs mt-1 text-gray-500 leading-tight">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
