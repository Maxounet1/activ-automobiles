import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Cookie,
  HelpCircle,
  Grid,
  List,
  Settings,
  Clock,
  ToggleLeft,
  Monitor,
  RefreshCw,
} from 'lucide-react';
import { SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Gestion des cookies | Activ Automobiles',
  description:
    'Informations sur l\'utilisation des cookies et traceurs – Activ Automobiles, spécialiste de la vente de véhicules d\'occasion, reprise automobile et financement auto en France.',
  alternates: {
    canonical: `${SITE_URL}/legal/cookies`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface CookieEntry {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  type: 'Essentiel' | 'Analytique' | 'Marketing' | 'Fonctionnel';
}

const COOKIES: CookieEntry[] = [
  { name: '__session', provider: 'activ-automobiles.com', purpose: 'Maintien de la session et sécurité des formulaires (protection CSRF)', duration: 'Session', type: 'Essentiel' },
  { name: 'cookie_consent', provider: 'activ-automobiles.com', purpose: 'Mémorisation de vos préférences en matière de cookies', duration: '13 mois', type: 'Essentiel' },
  { name: 'filters_prefs', provider: 'activ-automobiles.com', purpose: 'Mémorisation de vos derniers filtres de recherche de véhicules', duration: '30 jours', type: 'Fonctionnel' },
  { name: 'recently_viewed', provider: 'activ-automobiles.com', purpose: 'Mémorisation des véhicules récemment consultés', duration: '7 jours', type: 'Fonctionnel' },
  { name: '_ga', provider: 'Google Analytics', purpose: 'Identifiant unique permettant de comptabiliser les utilisateurs et les sessions', duration: '13 mois', type: 'Analytique' },
  { name: '_ga_XXXXXX', provider: 'Google Analytics', purpose: 'Maintien de l\'état de la session Google Analytics 4', duration: '13 mois', type: 'Analytique' },
  { name: '_gid', provider: 'Google Analytics', purpose: 'Identifiant de session pour distinguer les utilisateurs', duration: '24 heures', type: 'Analytique' },
  { name: '_fbp', provider: 'Facebook / Meta', purpose: 'Identifiant utilisé par Facebook pour les publicités ciblées', duration: '3 mois', type: 'Marketing' },
  { name: '_gcl_au', provider: 'Google Ads', purpose: 'Mesure de l\'efficacité des campagnes Google Ads', duration: '3 mois', type: 'Marketing' },
];

const TYPE_STYLES: Record<CookieEntry['type'], { bg: string; color: string; border: string }> = {
  Essentiel:   { bg: 'rgba(26,63,111,0.2)',   color: '#4a8fd4', border: 'rgba(74,143,212,0.35)' },
  Fonctionnel: { bg: 'rgba(16,160,100,0.15)', color: '#10a064', border: 'rgba(16,160,100,0.3)' },
  Analytique:  { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  Marketing:   { bg: 'rgba(220,60,60,0.12)',  color: '#e05555', border: 'rgba(220,60,60,0.3)'  },
};

function TypeBadge({ type }: { type: CookieEntry['type'] }) {
  const s = TYPE_STYLES[type];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {type}
    </span>
  );
}

function Section({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="space-y-5">
      <div className="flex items-center gap-3">
        <span
          className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
          style={{ background: 'rgba(26,63,111,0.18)', border: '1px solid rgba(26,63,111,0.3)' }}
          aria-hidden="true"
        >
          <Icon size={16} style={{ color: '#4a8fd4' }} />
        </span>
        <h2 id={`${id}-heading`} className="text-base font-bold text-white">
          {title}
        </h2>
      </div>
      <div className="space-y-3.5 text-sm leading-relaxed pl-12" style={{ color: 'rgba(255,255,255,0.65)' }}>
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
          <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#4a8fd4' }} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CookieTable({ type }: { type: CookieEntry['type'] }) {
  const filtered = COOKIES.filter((c) => c.type === type);
  if (filtered.length === 0) return null;
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <table className="w-full text-xs border-collapse min-w-[560px]">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <th className="text-left px-4 py-3 text-white font-semibold">Nom</th>
            <th className="text-left px-4 py-3 text-white font-semibold">Émetteur</th>
            <th className="text-left px-4 py-3 text-white font-semibold">Finalité</th>
            <th className="text-left px-4 py-3 text-white font-semibold whitespace-nowrap">Durée</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c, i) => (
            <tr key={c.name} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td className="px-4 py-3 font-mono text-xs" style={{ color: '#4a8fd4' }}>{c.name}</td>
              <td className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.6)' }}>{c.provider}</td>
              <td className="px-4 py-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{c.purpose}</td>
              <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.5)' }}>{c.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tocItems = [
  { href: '#definition', label: '1. Qu\'est-ce qu\'un cookie ?' },
  { href: '#types', label: '2. Types de cookies utilisés' },
  { href: '#finalites', label: '3. Finalités des cookies' },
  { href: '#duree', label: '4. Durée de conservation' },
  { href: '#consentement', label: '5. Consentement et préférences' },
  { href: '#modification', label: '6. Modifier ses préférences' },
  { href: '#navigateur', label: '7. Désactivation navigateur' },
  { href: '#mise-a-jour', label: '8. Mise à jour' },
];

export default function CookiesPage() {
  const types: CookieEntry['type'][] = ['Essentiel', 'Fonctionnel', 'Analytique', 'Marketing'];

  const typeDescriptions: Record<CookieEntry['type'], { title: string; desc: string; consent: string }> = {
    Essentiel: {
      title: 'Cookies strictement nécessaires',
      desc: 'Indispensables au bon fonctionnement du site. Ils permettent la sécurisation des formulaires, la gestion de session et la mémorisation de vos choix cookies.',
      consent: 'Aucun consentement requis',
    },
    Fonctionnel: {
      title: 'Cookies fonctionnels',
      desc: 'Améliorent votre expérience en mémorisant vos préférences de navigation (filtres véhicules, véhicules récemment consultés).',
      consent: 'Consentement recommandé',
    },
    Analytique: {
      title: 'Cookies de mesure d\'audience',
      desc: 'Permettent de comprendre comment les visiteurs naviguent sur le site afin d\'améliorer nos contenus et services. Les données sont anonymisées.',
      consent: 'Consentement requis',
    },
    Marketing: {
      title: 'Cookies marketing et publicitaires',
      desc: 'Utilisés pour vous proposer des publicités pertinentes sur d\'autres sites et mesurer l\'efficacité de nos campagnes.',
      consent: 'Consentement requis',
    },
  };

  return (
    <div style={{ background: '#0B1829', minHeight: '100vh' }}>

      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(180deg, rgba(26,63,111,0.12) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          <nav aria-label="Fil d'Ariane" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <li><Link href="/" className="hover:text-white transition-colors duration-150">Accueil</Link></li>
              <li aria-hidden="true"><ChevronRight size={12} /></li>
              <li className="text-white font-medium" aria-current="page">Gestion des cookies</li>
            </ol>
          </nav>

          <div className="flex items-center gap-2.5 mb-5">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(26,63,111,0.2)', border: '1px solid rgba(74,143,212,0.3)', color: '#4a8fd4' }}
            >
              <Cookie size={11} />
              CNIL / RGPD Conforme
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            Gestion des cookies – Activ Automobiles
          </h1>
          <p className="text-sm max-w-2xl" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Conformément aux recommandations de la CNIL et au RGPD, Activ Automobiles vous informe
            de l&apos;utilisation des cookies sur le site{' '}
            <span className="text-white font-medium">activ-automobiles.com</span>{' '}
            et vous permet de gérer vos préférences.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main */}
          <main className="flex-1 min-w-0 max-w-3xl space-y-12">

            {/* 1. Définition */}
            <Section id="definition" icon={HelpCircle} title="1. Qu'est-ce qu'un cookie ?">
              <p>
                Un cookie est un petit fichier texte déposé sur votre navigateur ou appareil lors
                de la visite d&apos;un site internet. Il permet au site de mémoriser des informations
                vous concernant afin d&apos;améliorer votre expérience de navigation ou de vous proposer
                des contenus adaptés.
              </p>
              <p>
                Les cookies peuvent être de <strong className="text-white">session</strong> (supprimés
                dès la fermeture du navigateur) ou <strong className="text-white">persistants</strong>{' '}
                (conservés jusqu&apos;à leur date d&apos;expiration ou leur suppression manuelle).
              </p>
              <p>
                Conformément à la réglementation CNIL, certains cookies ne peuvent être déposés
                qu&apos;avec votre consentement préalable explicite.
              </p>
            </Section>

            {/* 2. Types de cookies */}
            <Section id="types" icon={Grid} title="2. Types de cookies utilisés">
              <p>
                Le site activ-automobiles.com utilise quatre catégories de cookies :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {types.map((type) => {
                  const s = TYPE_STYLES[type];
                  const info = typeDescriptions[type];
                  const count = COOKIES.filter((c) => c.type === type).length;
                  return (
                    <div key={type} className="rounded-xl p-4 space-y-2.5"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="flex items-center justify-between gap-2">
                        <TypeBadge type={type} />
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                          {count} cookie{count > 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-white">{info.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{info.desc}</p>
                      <p className="text-xs font-medium" style={{ color: s.color }}>{info.consent}</p>
                    </div>
                  );
                })}
              </div>

              {/* Detailed tables */}
              <div className="space-y-6 mt-2">
                {types.map((type) => (
                  <div key={type} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TypeBadge type={type} />
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {COOKIES.filter((c) => c.type === type).length} cookie{COOKIES.filter((c) => c.type === type).length > 1 ? 's' : ''}
                      </span>
                    </div>
                    <CookieTable type={type} />
                  </div>
                ))}
              </div>
            </Section>

            {/* 3. Finalités */}
            <Section id="finalites" icon={List} title="3. Finalités des cookies">
              <p>
                Les cookies déposés sur le site activ-automobiles.com servent les finalités suivantes :
              </p>
              <BulletList items={[
                'Assurer le bon fonctionnement technique du site et la sécurité des formulaires',
                'Mémoriser vos préférences de navigation et filtres de recherche de véhicules',
                'Mesurer l\'audience et analyser le comportement des visiteurs (données anonymisées)',
                'Mesurer l\'efficacité de nos campagnes publicitaires en ligne',
                'Vous proposer des publicités adaptées à votre projet automobile (avec votre accord)',
              ]} />
              <p>
                Les données collectées via les cookies de mesure d&apos;audience sont utilisées
                exclusivement à des fins statistiques internes et ne sont jamais vendues à des tiers.
              </p>
            </Section>

            {/* 4. Durée de conservation */}
            <Section id="duree" icon={Clock} title="4. Durée de conservation">
              <p>
                Conformément aux recommandations de la CNIL, la durée maximale de conservation des
                cookies soumis à consentement est de{' '}
                <strong className="text-white">13 mois</strong> à compter de leur dépôt.
                Au-delà de ce délai, votre consentement est sollicité à nouveau.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse min-w-[400px]">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th className="text-left py-2.5 pr-4 text-white font-semibold">Catégorie</th>
                      <th className="text-left py-2.5 text-white font-semibold">Durée maximale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { cat: 'Cookies essentiels (session)', dur: 'Durée de la session' },
                      { cat: 'Cookies fonctionnels', dur: '30 jours à 12 mois' },
                      { cat: 'Cookies analytiques', dur: '24 heures à 13 mois' },
                      { cat: 'Cookies marketing', dur: '3 mois à 13 mois' },
                      { cat: 'Mémorisation du consentement', dur: '13 mois' },
                    ].map(({ cat, dur }, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td className="py-2.5 pr-4 text-white text-xs">{cat}</td>
                        <td className="py-2.5 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{dur}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* 5. Consentement */}
            <Section id="consentement" icon={ToggleLeft} title="5. Consentement et gestion des préférences">
              <p>
                Lors de votre première visite sur le site activ-automobiles.com, un bandeau de
                consentement s&apos;affiche et vous permet de choisir les cookies que vous acceptez.
                Ce bandeau vous offre trois options :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    label: 'Tout accepter',
                    desc: 'Autorise le dépôt de tous les cookies, y compris analytiques et marketing.',
                    color: '#10a064',
                  },
                  {
                    label: 'Tout refuser',
                    desc: 'Seuls les cookies strictement nécessaires sont déposés.',
                    color: '#e05555',
                  },
                  {
                    label: 'Personnaliser',
                    desc: 'Choisissez catégorie par catégorie les cookies que vous autorisez.',
                    color: '#4a8fd4',
                  },
                ].map(({ label, desc, color }) => (
                  <div key={label} className="rounded-xl p-4 space-y-2"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-xs font-bold" style={{ color }}>{label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                  </div>
                ))}
              </div>
              <p>
                Votre consentement est valable <strong className="text-white">13 mois</strong>.
                Vous pouvez le retirer ou le modifier à tout moment, sans que cela ne nuise à
                votre navigation sur les pages essentielles du site.
              </p>
            </Section>

            {/* 6. Modifier ses préférences */}
            <Section id="modification" icon={Settings} title="6. Comment modifier ses préférences">
              <p>
                Vous pouvez modifier vos préférences cookies à tout moment par les moyens suivants :
              </p>
              <div className="space-y-3">
                <div className="rounded-xl p-4"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <h3 className="text-white font-semibold text-sm mb-2">Via le bandeau de consentement</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Cliquez sur le lien &quot;Gestion des cookies&quot; présent en pied de page pour
                    rouvrir le panneau de gestion et modifier vos choix. Compatible avec les
                    solutions CookieYes, Axeptio et Tarteaucitron.
                  </p>
                </div>
                <div className="rounded-xl p-4"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <h3 className="text-white font-semibold text-sm mb-2">Via les opt-out tiers</h3>
                  <BulletList items={[
                    'Google Analytics : tools.google.com/dlpage/gaoptout',
                    'Google Ads : myaccount.google.com/data-and-privacy',
                    'Facebook / Meta : facebook.com/settings?tab=ads',
                  ]} />
                </div>
              </div>
            </Section>

            {/* 7. Désactivation navigateur */}
            <Section id="navigateur" icon={Monitor} title="7. Désactivation via le navigateur">
              <p>
                Vous pouvez également configurer votre navigateur pour bloquer certains ou tous
                les cookies. Voici les chemins d&apos;accès pour les principaux navigateurs :
              </p>
              <BulletList items={[
                'Google Chrome : Paramètres → Confidentialité et sécurité → Cookies et données des sites',
                'Mozilla Firefox : Paramètres → Vie privée et sécurité → Cookies et données des sites',
                'Safari (macOS) : Préférences → Confidentialité → Cookies et données de sites web',
                'Microsoft Edge : Paramètres → Confidentialité, recherche et services → Cookies',
                'Opera : Paramètres → Avancé → Confidentialité et sécurité → Cookies',
              ]} />
              <p
                className="rounded-lg p-3.5 text-xs"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', color: 'rgba(255,255,255,0.65)' }}
              >
                <strong className="text-white">Attention :</strong> Le blocage complet des cookies
                peut perturber certaines fonctionnalités du site, notamment la navigation dans notre
                catalogue de{' '}
                <Link href="/voitures-occasion" className="font-semibold transition-colors hover:text-white" style={{ color: '#4a8fd4' }}>
                  véhicules d&apos;occasion
                </Link>
                {' '}et les formulaires de contact.
              </p>
            </Section>

            {/* 8. Mise à jour */}
            <Section id="mise-a-jour" icon={RefreshCw} title="8. Mise à jour de la politique cookies">
              <p>
                La présente politique cookies peut être modifiée à tout moment afin de refléter les
                évolutions réglementaires ou techniques, ou l&apos;ajout de nouveaux services. La version
                en vigueur est celle accessible en ligne sur ce site.
              </p>
              <p>
                Pour toute question relative aux cookies ou à la protection de vos données,
                contactez-nous à{' '}
                <a href="mailto:contact@activ-automobiles.com"
                  className="font-semibold transition-colors duration-150 hover:text-white" style={{ color: '#4a8fd4' }}>
                  contact@activ-automobiles.com
                </a>.
              </p>
            </Section>

            {/* Internal nav */}
            <div
              className="rounded-xl p-5 flex flex-wrap gap-3"
              style={{ background: 'rgba(26,63,111,0.08)', border: '1px solid rgba(26,63,111,0.18)' }}
            >
              <p className="w-full text-xs font-semibold text-white mb-1">Pages associées</p>
              {[
                { href: '/legal/confidentialite', label: 'Politique de confidentialité' },
                { href: '/legal/mentions-legales', label: 'Mentions légales' },
                { href: '/voitures-occasion', label: 'Véhicules d\'occasion' },
                { href: '/contact', label: 'Nous contacter' },
              ].map(({ href, label }) => (
                <Link key={href} href={href}
                  className="inline-flex items-center gap-1 text-xs font-medium transition-colors duration-150 hover:text-white"
                  style={{ color: '#4a8fd4' }}>
                  {label} <ChevronRight size={11} />
                </Link>
              ))}
            </div>

          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-60 flex-shrink-0">
            <div className="lg:sticky lg:top-6 space-y-4">

              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Sommaire
                </p>
                <nav aria-label="Navigation dans la page">
                  <ul className="space-y-0.5">
                    {tocItems.map(({ href, label }) => (
                      <li key={href}>
                        <a href={href}
                          className="block px-3 py-2 rounded-lg text-xs transition-colors duration-150 hover:text-white hover:bg-white/5"
                          style={{ color: 'rgba(255,255,255,0.5)' }}>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Type legend */}
              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Types de cookies
                </p>
                <div className="space-y-2">
                  {(['Essentiel', 'Fonctionnel', 'Analytique', 'Marketing'] as const).map((type) => (
                    <div key={type}><TypeBadge type={type} /></div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Documents légaux
                </p>
                <ul className="space-y-0.5">
                  {[
                    { href: '/legal/mentions-legales', label: 'Mentions légales' },
                    { href: '/legal/confidentialite', label: 'Politique de confidentialité' },
                    { href: '/legal/cookies', label: 'Gestion des cookies' },
                    { href: '/legal/cgv', label: 'CGV' },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-colors duration-150 hover:text-white hover:bg-white/5"
                        style={{ color: 'rgba(255,255,255,0.5)' }}>
                        <ChevronRight size={11} />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
