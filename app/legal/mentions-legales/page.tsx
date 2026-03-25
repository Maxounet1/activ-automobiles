import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, FileText, Building2, Server, Shield, Scale, Cookie, BookOpen } from 'lucide-react';
import { SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Mentions légales | Activ Automobiles – Vente de véhicules d\'occasion',
  description:
    'Mentions légales d\'Activ Automobiles, spécialiste de la vente de véhicules d\'occasion, reprise automobile et financement auto à Laxou. Réseau d\'agences automobiles en France.',
  alternates: {
    canonical: `${SITE_URL}/legal/mentions-legales`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Activ Automobiles',
  legalName: 'Activ Automobiles EURL',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  foundingDate: '2009',
  telephone: '+33383979797',
  email: 'contact@activ-automobiles.com',
  vatID: 'FR09503431066',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '12 rue du Saintois',
    postalCode: '54520',
    addressLocality: 'Laxou',
    addressCountry: 'FR',
  },
  areaServed: {
    '@type': 'Country',
    name: 'France',
  },
  description:
    'Réseau d\'agences automobiles spécialisé dans la vente de véhicules d\'occasion, la reprise de voiture et le financement automobile sur l\'ensemble du territoire français.',
};

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
        <h2
          id={`${id}-heading`}
          className="text-base font-bold text-white"
        >
          {title}
        </h2>
      </div>
      <div className="space-y-3.5 text-sm leading-relaxed pl-12" style={{ color: 'rgba(255,255,255,0.65)' }}>
        {children}
      </div>
    </section>
  );
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5 space-y-3 mt-1"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <span className="font-semibold text-white w-52 flex-shrink-0 text-xs uppercase tracking-wide"
        style={{ color: 'rgba(255,255,255,0.45)' }}>
        {label}
      </span>
      <span className="text-white font-medium text-sm">{children}</span>
    </div>
  );
}

const tocItems = [
  { href: '#editeur', label: 'Éditeur du site' },
  { href: '#hebergement', label: 'Hébergement' },
  { href: '#activite', label: 'Activité' },
  { href: '#propriete-intellectuelle', label: 'Propriété intellectuelle' },
  { href: '#responsabilite', label: 'Responsabilité' },
  { href: '#donnees-personnelles', label: 'Données personnelles' },
  { href: '#cookies', label: 'Cookies' },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <div style={{ background: '#0B1829', minHeight: '100vh' }}>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          style={{
            background: 'linear-gradient(180deg, rgba(26,63,111,0.12) 0%, transparent 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

            <nav aria-label="Fil d'Ariane" className="mb-7">
              <ol className="flex flex-wrap items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <li>
                  <Link href="/" className="hover:text-white transition-colors duration-150">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden="true"><ChevronRight size={12} /></li>
                <li className="text-white font-medium" aria-current="page">Mentions légales</li>
              </ol>
            </nav>

            <div className="flex items-center gap-2.5 mb-5">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: 'rgba(26,63,111,0.2)',
                  border: '1px solid rgba(74,143,212,0.3)',
                  color: '#4a8fd4',
                }}
              >
                <FileText size={11} />
                Information légale
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
              Mentions légales – Activ Automobiles
            </h1>
            <p className="text-sm max-w-2xl" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Conformément à la loi n° 2004-575 du 21 juin 2004 pour la Confiance dans
              l&apos;Économie Numérique (LCEN), vous trouverez ci-dessous les informations légales
              relatives au présent site.
            </p>
          </div>
        </section>

        {/* ── Content ───────────────────────────────────────────────────────── */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* ── Main ──────────────────────────────────────────────────────── */}
            <main className="flex-1 min-w-0 max-w-3xl space-y-12">

              {/* 1. Éditeur du site */}
              <Section id="editeur" icon={Building2} title="Éditeur du site">
                <p>
                  Le présent site web est édité par la société Activ Automobiles, acteur reconnu
                  dans la <strong className="text-white">vente de véhicules d&apos;occasion</strong>{' '}
                  et dans les services automobiles aux particuliers et aux professionnels.
                </p>
                <InfoGrid>
                  <Row label="Raison sociale">Activ Automobiles</Row>
                  <Row label="Forme juridique">EURL (Entreprise Unipersonnelle à Responsabilité Limitée)</Row>
                  <Row label="Capital social">3 000 000 €</Row>
                  <Row label="Siège social">
                    <address className="not-italic">
                      12 rue du Saintois, 54520 Laxou – France
                    </address>
                  </Row>
                  <Row label="RCS">Nancy 503 431 066</Row>
                  <Row label="SIREN">503 431 066</Row>
                  <Row label="N° TVA intracommunautaire">FR09 503431066</Row>
                  <Row label="Téléphone">
                    <a
                      href="tel:+33383979797"
                      className="transition-colors duration-150 hover:text-white"
                      style={{ color: '#4a8fd4' }}
                    >
                      03 83 97 97 97
                    </a>
                  </Row>
                  <Row label="Email">
                    <a
                      href="mailto:contact@activ-automobiles.com"
                      className="transition-colors duration-150 hover:text-white"
                      style={{ color: '#4a8fd4' }}
                    >
                      contact@activ-automobiles.com
                    </a>
                  </Row>
                  <Row label="Directeur de la publication">Gérant Activ Automobiles</Row>
                </InfoGrid>
              </Section>

              {/* 2. Hébergement */}
              <Section id="hebergement" icon={Server} title="Hébergement">
                <p>
                  Le site <span className="text-white font-medium">www.activ-automobiles.com</span>{' '}
                  est hébergé par :
                </p>
                <InfoGrid>
                  <Row label="Hébergeur">Netlify, Inc.</Row>
                  <Row label="Adresse">512 2nd Street, Suite 200 — San Francisco, CA 94107, États-Unis</Row>
                  <Row label="Site web">
                    <a
                      href="https://www.netlify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-150 hover:text-white"
                      style={{ color: '#4a8fd4' }}
                    >
                      www.netlify.com
                    </a>
                  </Row>
                </InfoGrid>
              </Section>

              {/* 3. Activité */}
              <Section id="activite" icon={BookOpen} title="Activité">
                <p>
                  Activ Automobiles est un réseau d&apos;agences automobiles spécialisé dans la{' '}
                  <strong className="text-white">vente de véhicules d&apos;occasion</strong>, la{' '}
                  <strong className="text-white">reprise de voiture</strong> et le{' '}
                  <strong className="text-white">financement automobile</strong>. Notre garage
                  automobile, dont le siège est situé à <strong className="text-white">Laxou</strong>,
                  accompagne ses clients dans toutes les étapes de leur projet automobile.
                </p>
                <p>
                  Nos services sont proposés sur l&apos;ensemble du territoire français grâce à
                  notre réseau d&apos;agences locales implantées dans plusieurs régions. Chaque agence
                  offre un accompagnement personnalisé pour l&apos;achat, la reprise et le financement
                  de véhicules d&apos;occasion sélectionnés avec soin.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link
                    href="/voitures-occasion"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 hover:bg-white/10"
                    style={{
                      background: 'rgba(74,143,212,0.1)',
                      border: '1px solid rgba(74,143,212,0.25)',
                      color: '#4a8fd4',
                    }}
                  >
                    Voir nos véhicules d&apos;occasion
                    <ChevronRight size={12} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 hover:bg-white/10"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.65)',
                    }}
                  >
                    Nous contacter
                    <ChevronRight size={12} />
                  </Link>
                </div>
              </Section>

              {/* 4. Propriété intellectuelle */}
              <Section id="propriete-intellectuelle" icon={Scale} title="Propriété intellectuelle">
                <p>
                  L&apos;ensemble du contenu du présent site — textes, photographies, illustrations,
                  logos, marques, vidéos, éléments graphiques, mise en page et architecture — est
                  protégé par le droit de la propriété intellectuelle et le droit d&apos;auteur
                  (Code de la Propriété Intellectuelle).
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication ou adaptation de
                  tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé,
                  est strictement interdite sans l&apos;autorisation écrite préalable d&apos;Activ Automobiles.
                  Toute exploitation non autorisée constitue une contrefaçon et est passible de
                  poursuites judiciaires.
                </p>
                <p>
                  Les marques et logos des constructeurs automobiles figurant sur ce site sont la
                  propriété exclusive de leurs titulaires respectifs. Leur présence ne constitue
                  en aucun cas une cession de droits.
                </p>
              </Section>

              {/* 5. Responsabilité */}
              <Section id="responsabilite" icon={Shield} title="Responsabilité">
                <p>
                  Les informations diffusées sur ce site sont fournies à titre indicatif. Activ
                  Automobiles s&apos;efforce de maintenir le site à jour et les informations exactes,
                  mais ne peut garantir l&apos;exhaustivité, la précision ou l&apos;actualité de
                  l&apos;ensemble des contenus publiés.
                </p>
                <p>
                  En particulier, les caractéristiques, photographies et prix des véhicules présentés
                  sont fournis à titre indicatif et peuvent être modifiés sans préavis. Seule la fiche
                  technique officielle remise lors de l&apos;achat fait foi.
                </p>
                <p>
                  Activ Automobiles ne saurait être tenu responsable des dommages directs ou
                  indirects résultant de l&apos;accès au site ou de l&apos;utilisation des informations
                  qui y figurent. Les liens hypertextes vers des sites tiers n&apos;engagent pas la
                  responsabilité d&apos;Activ Automobiles quant à leur contenu.
                </p>
                <p>
                  Pour signaler toute erreur ou dysfonctionnement, vous pouvez nous écrire à{' '}
                  <a
                    href="mailto:contact@activ-automobiles.com"
                    className="transition-colors duration-150 hover:text-white font-medium"
                    style={{ color: '#4a8fd4' }}
                  >
                    contact@activ-automobiles.com
                  </a>.
                </p>
              </Section>

              {/* 6. Données personnelles */}
              <Section id="donnees-personnelles" icon={Shield} title="Données personnelles">
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD) n°2016/679
                  du 27 avril 2016 et à la loi n° 78-17 du 6 janvier 1978 modifiée (loi
                  Informatique et Libertés), Activ Automobiles traite vos données personnelles dans
                  le cadre de ses activités de vente de véhicules d&apos;occasion, de reprise automobile
                  et de financement auto.
                </p>
                <p>
                  Vous disposez des droits suivants sur vos données : droit d&apos;accès, de rectification,
                  d&apos;effacement, de portabilité, d&apos;opposition et de limitation du traitement.
                  Pour exercer ces droits, vous pouvez contacter Activ Automobiles par email à{' '}
                  <a
                    href="mailto:contact@activ-automobiles.com"
                    className="transition-colors duration-150 hover:text-white font-medium"
                    style={{ color: '#4a8fd4' }}
                  >
                    contact@activ-automobiles.com
                  </a>{' '}
                  ou par courrier à l&apos;adresse du siège social.
                </p>
                <p>
                  En cas de contestation, vous avez la possibilité d&apos;adresser une réclamation à la
                  CNIL (Commission Nationale de l&apos;Informatique et des Libertés) :{' '}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-150 hover:text-white font-medium"
                    style={{ color: '#4a8fd4' }}
                  >
                    www.cnil.fr
                  </a>.
                </p>
                <p>
                  Pour plus d&apos;informations sur la manière dont nous collectons et utilisons vos
                  données personnelles, consultez notre{' '}
                  <Link
                    href="/legal/confidentialite"
                    className="font-semibold transition-colors duration-150 hover:text-white"
                    style={{ color: '#4a8fd4' }}
                  >
                    Politique de confidentialité
                  </Link>.
                </p>
              </Section>

              {/* 7. Cookies */}
              <Section id="cookies" icon={Cookie} title="Cookies">
                <p>
                  Le site activ-automobiles.com utilise des cookies et technologies similaires pour
                  assurer le bon fonctionnement du site, mesurer l&apos;audience, améliorer votre
                  expérience de navigation et, le cas échéant, vous proposer des contenus adaptés
                  à votre profil.
                </p>
                <p>
                  Conformément aux recommandations de la CNIL, votre consentement est recueilli
                  avant le dépôt de tout cookie non strictement nécessaire. Vous pouvez à tout
                  moment retirer votre consentement ou modifier vos préférences en consultant
                  notre{' '}
                  <Link
                    href="/legal/cookies"
                    className="font-semibold transition-colors duration-150 hover:text-white"
                    style={{ color: '#4a8fd4' }}
                  >
                    Politique cookies
                  </Link>.
                </p>
              </Section>

              {/* Droit applicable */}
              <section
                id="droit-applicable"
                aria-label="Droit applicable"
                className="rounded-xl p-6 text-sm leading-relaxed"
                style={{
                  background: 'rgba(26,63,111,0.08)',
                  border: '1px solid rgba(26,63,111,0.2)',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                <p className="font-semibold text-white mb-2">Droit applicable et juridiction compétente</p>
                <p>
                  Le présent site et les présentes mentions légales sont soumis au droit français.
                  Tout litige relatif à l&apos;utilisation du site sera soumis à la compétence exclusive
                  des tribunaux du ressort de Nancy, nonobstant pluralité de défendeurs ou appel
                  en garantie.
                </p>
              </section>

            </main>

            {/* ── Sidebar ───────────────────────────────────────────────────── */}
            <aside className="w-full lg:w-60 flex-shrink-0">
              <div className="lg:sticky lg:top-6 space-y-4">

                {/* Table of contents */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-4"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    Sommaire
                  </p>
                  <nav aria-label="Navigation dans la page">
                    <ul className="space-y-0.5">
                      {tocItems.map(({ href, label }) => (
                        <li key={href}>
                          <a
                            href={href}
                            className="block px-3 py-2 rounded-lg text-xs transition-colors duration-150 hover:text-white hover:bg-white/5"
                            style={{ color: 'rgba(255,255,255,0.5)' }}
                          >
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Legal links */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-4"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    Documents légaux
                  </p>
                  <ul className="space-y-0.5">
                    {[
                      { href: '/legal/mentions-legales', label: 'Mentions légales' },
                      { href: '/legal/confidentialite', label: 'Politique de confidentialité' },
                      { href: '/legal/cookies', label: 'Politique cookies' },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-colors duration-150 hover:text-white hover:bg-white/5"
                          style={{ color: 'rgba(255,255,255,0.5)' }}
                        >
                          <ChevronRight size={11} />
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact card */}
                <div
                  className="rounded-2xl p-5 space-y-3"
                  style={{
                    background: 'rgba(26,63,111,0.1)',
                    border: '1px solid rgba(74,143,212,0.2)',
                  }}
                >
                  <p className="text-xs font-semibold text-white">Une question légale ?</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Notre équipe est disponible pour répondre à toutes vos questions.
                  </p>
                  <a
                    href="tel:+33383979797"
                    className="flex items-center gap-2 text-xs font-semibold transition-colors duration-150 hover:text-white"
                    style={{ color: '#4a8fd4' }}
                  >
                    03 83 97 97 97
                  </a>
                  <a
                    href="mailto:contact@activ-automobiles.com"
                    className="flex items-center gap-2 text-xs transition-colors duration-150 hover:text-white break-all"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    contact@activ-automobiles.com
                  </a>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
