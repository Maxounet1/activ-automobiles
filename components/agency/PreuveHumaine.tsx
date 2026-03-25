import { Quote, Users, ShieldCheck, Handshake } from 'lucide-react';

interface Photo {
  src: string;
  alt: string;
}

interface Manager {
  name: string;
  title: string;
  photo: string;
  quote: string;
  tagline: string;
  reviewCount?: number;
}

interface PreuveHumaineProps {
  city: string;
  photos: Photo[];
  manager?: Manager;
}

const FALLBACK_PHOTOS: Photo[] = [
  {
    src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Équipe Activ Automobiles en showroom',
  },
  {
    src: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Showroom Activ Automobiles',
  },
];

const PILLARS = [
  { icon: Users, label: 'Écoute', desc: 'Chaque projet est unique' },
  { icon: Handshake, label: 'Conseil', desc: 'Guidé jusqu\'au bout' },
  { icon: ShieldCheck, label: 'Sécurité', desc: 'Décision sans risque' },
];

export default function PreuveHumaine({ city, photos, manager }: PreuveHumaineProps) {
  const displayPhotos = photos.length > 0 ? photos.slice(0, 2) : FALLBACK_PHOTOS;

  if (manager) {
    return (
      <section className="py-20 bg-white relative overflow-hidden">

        {/* Fond diagonal léger ~10° — zone droite gris clair */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(170deg, white 52%, #f1f3f7 52%)',
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* Label section */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-8 bg-[#1A3F6F]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
              Votre agence
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">

            {/* LEFT — texte + pilliers */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-5">
                Une équipe locale,<br />
                <span className="text-[#1A3F6F]">à votre écoute</span>
              </h2>

              {/* Citation principale */}
              <div className="relative mb-8">
                <Quote
                  className="absolute -top-1 -left-1 w-8 h-8 opacity-25"
                  style={{ transform: 'scaleX(-1)', color: '#10B981' }}
                />
                <blockquote
                  className="pl-6 border-l-2 border-[#1A3F6F]/20 text-gray-600 text-[15px] leading-relaxed italic"
                >
                  {manager.quote}
                </blockquote>
              </div>

              {/* Pilliers */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {PILLARS.map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="relative flex flex-col items-start gap-2 p-4 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(145deg, #1A3F6F 0%, #0f2548 100%)',
                      border: '1px solid rgba(16,185,129,0.30)',
                      boxShadow: '0 4px 20px rgba(16,185,129,0.10), 0 1px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    {/* Halo émeraude */}
                    <div
                      className="absolute -top-4 -right-4 pointer-events-none"
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(16,185,129,0.16) 0%, transparent 70%)',
                      }}
                    />
                    {/* Shimmer accent en haut */}
                    <div
                      className="absolute top-0 left-0 right-0 pointer-events-none"
                      style={{
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.55) 50%, transparent 100%)',
                      }}
                    />
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(16,185,129,0.16)',
                        border: '1px solid rgba(16,185,129,0.28)',
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: '#10B981' }} />
                    </div>
                    <div className="relative">
                      <p className="text-[12px] font-bold text-white">{label}</p>
                      <p className="text-[11px] leading-tight" style={{ color: 'rgba(255,255,255,0.55)' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Signature */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-100" />
                <p className="text-[12px] text-gray-400 font-medium">
                  {manager.tagline}
                </p>
                <div className="h-px w-8 bg-gray-100" />
              </div>
            </div>

            {/* RIGHT — portrait premium */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Cercle décoratif derrière la photo */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: '360px',
                  height: '360px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(26,63,111,0.09) 0%, transparent 70%)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0,
                }}
              />
              <div
                className="relative flex-shrink-0"
                style={{
                  width: '320px',
                  height: '427px',
                  zIndex: 1,
                }}
              >
                {/* Halo émeraude derrière la photo */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    inset: '-18px',
                    borderRadius: '2rem',
                    background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.06) 55%, transparent 75%)',
                    zIndex: 0,
                  }}
                />
                {/* Cadre photo */}
                <div
                  className="rounded-3xl overflow-hidden w-full h-full"
                  style={{
                    boxShadow: '0 0 0 2px rgba(16,185,129,0.55), 0 24px 80px rgba(16,185,129,0.18), 0 4px 20px rgba(0,0,0,0.18)',
                    border: '2px solid rgba(16,185,129,0.60)',
                    position: 'relative',
                  }}
                >
                  <img
                    src={manager.photo}
                    alt={`${manager.name} — ${manager.title}`}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  {/* Fade bas sur la photo */}
                  <div
                    className="absolute inset-x-0 bottom-0 pointer-events-none rounded-b-3xl"
                    style={{ height: '38%', background: 'linear-gradient(to top, rgba(10,18,45,0.62) 0%, transparent 100%)' }}
                  />
                  {/* Badge nom en bas de la photo */}
                  <div
                    className="absolute bottom-4 left-4 right-4 flex items-center gap-2 pointer-events-none"
                  >
                    <div>
                      <p className="text-white font-black text-[15px] leading-tight">{manager.name}</p>
                      <p className="text-white/65 text-[11px] font-medium leading-tight mt-0.5">Responsable d&apos;agence</p>
                    </div>
                  </div>
                  {/* Badge "Activ Automobiles" en haut */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <div
                      className="flex items-center gap-1.5 rounded-full px-3 py-1"
                      style={{
                        background: '#059669',
                        boxShadow: '0 2px 8px rgba(5,150,105,0.35)',
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                      <span className="text-white text-[10px] font-bold tracking-wide uppercase">Activ Automobiles</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat flottante */}
              {manager.reviewCount && (
                <div
                  className="absolute -bottom-4 -left-4 lg:-left-8 rounded-2xl px-4 py-3 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(145deg, #1A3F6F 0%, #0f2548 100%)',
                    border: '1px solid rgba(16,185,129,0.30)',
                    boxShadow: '0 4px 20px rgba(16,185,129,0.10), 0 1px 4px rgba(0,0,0,0.2)',
                    zIndex: 2,
                  }}
                >
                  {/* Halo émeraude */}
                  <div
                    className="absolute -top-4 -right-4 pointer-events-none"
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(16,185,129,0.16) 0%, transparent 70%)',
                    }}
                  />
                  {/* Shimmer accent en haut */}
                  <div
                    className="absolute top-0 left-0 right-0 pointer-events-none"
                    style={{
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.55) 50%, transparent 100%)',
                    }}
                  />
                  <p className="relative text-[22px] font-black leading-none" style={{ color: '#10B981' }}>{manager.reviewCount}</p>
                  <p className="relative text-[11px] font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>avis Google</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-[#1A3F6F]" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A3F6F]">
            Votre agence
          </span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">
          Une équipe locale, à votre écoute
        </h2>
        <p className="text-gray-500 text-sm mb-8 max-w-lg">
          Chez Activ Automobiles {city}, vous êtes reçu par des vrais conseillers,
          dans un vrai showroom — pas un formulaire web.
        </p>

        <div className={`grid gap-4 ${displayPhotos.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {displayPhotos.map((photo, i) => (
            <div
              key={photo.src}
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: displayPhotos.length === 1 ? '16/7' : i === 0 ? '4/3' : '4/3',
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
