import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Shield,
  UserCheck,
  Database,
  Target,
  Scale,
  Clock,
  Users,
  Lock,
  Eye,
  FileText,
  Cookie,
  RefreshCw,
} from 'lucide-react';
import { SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Activ Automobiles – Protection des données',
  description:
    'Protection des données personnelles et conformité RGPD – Activ Automobiles, spécialiste de la vente de véhicules d\'occasion, reprise automobile et financement auto en France.',
  alternates: {
    canonical: `${SITE_URL}/legal/confidentialite`,
  },
  robots: {
    index: true,
    follow: true,
  },
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

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5 space-y-3"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <span
        className="font-semibold w-52 flex-shrink-0 text-xs uppercase tracking-wide"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        {label}
      </span>
      <span className="text-white font-medium text-sm">{children}</span>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-0">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
          <span
            className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: '#4a8fd4' }}
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CardGrid({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map(({ title, desc }) => (
        <div
          key={title}
          className="rounded-lg p-4"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-white font-semibold text-xs mb-1.5">{title}</p>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
        </div>
      ))}
    </div>
  );
}

const tocItems = [
  { href: '#responsable', label: '1. Responsable du traitement' },
  { href: '#donnees', label: '2. Données collectées' },
  { href: '#finalites', label: '3. Finalités du traitement' },
  { href: '#bases-legales', label: '4. Bases légales' },
  { href: '#conservation', label: '5. Durée de conservation' },
  { href: '#destinataires', label: '6. Destinataires' },
  { href: '#securite', label: '7. Sécurité des données' },
  { href: '#droits', label: '8. Droits des utilisateurs' },
  { href: '#exercice-droits', label: '9. Exercice des droits' },
  { href: '#cookies', label: '10. Cookies et traceurs' },
  { href: '#mise-a-jour', label: '11. Mise à jour' },
];

export default function ConfidentialitePage() {
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
              <li className="text-white font-medium" aria-current="page">Politique de confidentialité</li>
            </ol>
          </nav>

          <div className="flex items-center gap-2.5 mb-5">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(26,63,111,0.2)', border: '1px solid rgba(74,143,212,0.3)', color: '#4a8fd4' }}
            >
              <Shield size={11} />
              RGPD Conforme
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            Politique de confidentialité – Activ Automobiles
          </h1>
          <p className="text-sm max-w-2xl" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Activ Automobiles s&apos;engage à protéger vos données personnelles conformément au
            Règlement Général sur la Protection des Données (RGPD) n°2016/679 du 27 avril 2016
            et à la loi Informatique et Libertés n°78-17 du 6 janvier 1978 modifiée.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main */}
          <main className="flex-1 min-w-0 max-w-3xl space-y-12">

            {/* 1. Responsable du traitement */}
            <Section id="responsable" icon={UserCheck} title="1. Responsable du traitement">
              <p>
                Le responsable du traitement de vos données personnelles est la société{' '}
                <strong className="text-white">Activ Automobiles</strong>, acteur du réseau
                d&apos;agences automobiles spécialisé dans la{' '}
                <strong className="text-white">vente de véhicules d&apos;occasion</strong>,
                la reprise automobile et le financement auto sur l&apos;ensemble du territoire français.
              </p>
              <InfoBox>
                <Row label="Raison sociale">Activ Automobiles</Row>
                <Row label="Forme juridique">EURL – capital social 3 000 000 €</Row>
                <Row label="Siège social">
                  <address className="not-italic">12 rue du Saintois, 54520 Laxou – France</address>
                </Row>
                <Row label="RCS">Nancy 503 431 066</Row>
                <Row label="Téléphone">
                  <a href="tel:+33383979797" className="transition-colors duration-150 hover:text-white" style={{ color: '#4a8fd4' }}>
                    03 83 97 97 97
                  </a>
                </Row>
                <Row label="Email RGPD">
                  <a href="mailto:contact@activ-automobiles.com" className="transition-colors duration-150 hover:text-white" style={{ color: '#4a8fd4' }}>
                    contact@activ-automobiles.com
                  </a>
                </Row>
              </InfoBox>
            </Section>

            {/* 2. Données collectées */}
            <Section id="donnees" icon={Database} title="2. Données collectées">
              <p>
                Nous collectons vos données personnelles uniquement lorsque vous interagissez
                activement avec nos services. Voici les données collectées selon chaque formulaire :
              </p>

              {[
                {
                  title: 'Formulaire de contact',
                  items: ['Nom et prénom', 'Adresse email', 'Numéro de téléphone', 'Message libre'],
                },
                {
                  title: 'Demande de rappel',
                  items: ['Nom et prénom', 'Numéro de téléphone', 'Créneau horaire souhaité'],
                },
                {
                  title: 'Reprise de véhicule',
                  items: ['Marque et modèle du véhicule', 'Kilométrage', 'Année', 'État général', 'Coordonnées du propriétaire'],
                },
                {
                  title: 'Demande de financement',
                  items: ['Coordonnées', 'Situation professionnelle', 'Apport envisagé', 'Mensualités souhaitées', 'Durée de financement'],
                },
              ].map(({ title, items }) => (
                <div key={title} className="rounded-xl p-4 space-y-2.5"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <h3 className="text-white font-semibold text-sm">{title}</h3>
                  <BulletList items={items} />
                </div>
              ))}

              <div className="rounded-xl p-4 space-y-2.5"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 className="text-white font-semibold text-sm">Données de navigation (cookies)</h3>
                <BulletList items={[
                  'Adresse IP (anonymisée)',
                  'Type et version du navigateur',
                  'Pages visitées et durée des visites',
                  'Source d\'acquisition (moteur de recherche, lien direct, etc.)',
                ]} />
              </div>
            </Section>

            {/* 3. Finalités */}
            <Section id="finalites" icon={Target} title="3. Finalités du traitement">
              <p>
                Vos données sont collectées et utilisées exclusivement pour les finalités suivantes.
                Elles ne sont <strong className="text-white">ni vendues, ni cédées à des tiers</strong> à
                des fins commerciales.
              </p>
              <CardGrid items={[
                {
                  title: 'Traitement des demandes',
                  desc: 'Répondre à vos demandes de contact, de rappel, de devis ou d\'information sur nos véhicules d\'occasion.',
                },
                {
                  title: 'Suivi commercial',
                  desc: 'Assurer le suivi de votre projet automobile, gérer la relation client et les échanges avec nos agences.',
                },
                {
                  title: 'Offres adaptées',
                  desc: 'Vous proposer des véhicules et services adaptés à votre projet (reprise automobile, financement auto).',
                },
                {
                  title: 'Gestion du financement',
                  desc: 'Calculer des simulations de financement et transmettre vos dossiers à nos partenaires financiers avec votre accord.',
                },
                {
                  title: 'Amélioration du site',
                  desc: 'Analyser la navigation pour améliorer l\'expérience utilisateur et l\'accessibilité de notre catalogue.',
                },
                {
                  title: 'Obligations légales',
                  desc: 'Respecter nos obligations comptables, fiscales et légales en matière de conservation des documents commerciaux.',
                },
              ]} />
            </Section>

            {/* 4. Bases légales */}
            <Section id="bases-legales" icon={Scale} title="4. Bases légales du traitement">
              <p>
                Chaque traitement de données repose sur une base légale conforme au RGPD (article 6) :
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse min-w-[480px]">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th className="text-left py-2.5 pr-4 text-white font-semibold">Finalité</th>
                      <th className="text-left py-2.5 text-white font-semibold">Base légale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { f: 'Traitement des demandes clients', b: 'Mesures précontractuelles (Art. 6.1.b)' },
                      { f: 'Suivi commercial et relance', b: 'Intérêt légitime (Art. 6.1.f)' },
                      { f: 'Dossier de financement', b: 'Mesures précontractuelles (Art. 6.1.b)' },
                      { f: 'Communication commerciale', b: 'Consentement (Art. 6.1.a)' },
                      { f: 'Mesure d\'audience (analytique)', b: 'Consentement (Art. 6.1.a)' },
                      { f: 'Obligations légales / comptabilité', b: 'Obligation légale (Art. 6.1.c)' },
                    ].map(({ f, b }, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td className="py-2.5 pr-4 text-white text-xs">{f}</td>
                        <td className="py-2.5 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* 5. Durée de conservation */}
            <Section id="conservation" icon={Clock} title="5. Durée de conservation des données">
              <p>
                Vos données sont conservées pour une durée strictement proportionnelle aux finalités
                pour lesquelles elles ont été collectées :
              </p>
              <BulletList items={[
                'Données de contact et de prospection : 3 ans à compter du dernier contact',
                'Données relatives à un contrat de vente : 5 ans à compter de la fin du contrat (obligation légale)',
                'Données de financement : 5 ans à compter de la fin du contrat de crédit',
                'Documents comptables et de facturation : 10 ans (obligation légale)',
                'Données de navigation et cookies analytiques : 13 mois maximum',
                'Données liées à une newsletter : jusqu\'à désinscription puis 3 ans',
              ]} />
              <p>
                À l&apos;issue de ces délais, vos données sont supprimées de manière sécurisée ou
                irrémédiablement anonymisées.
              </p>
            </Section>

            {/* 6. Destinataires */}
            <Section id="destinataires" icon={Users} title="6. Destinataires des données">
              <p>
                Vos données peuvent être transmises aux personnes suivantes, dans les limites strictes
                des finalités décrites ci-dessus :
              </p>
              <BulletList items={[
                'Les conseillers commerciaux Activ Automobiles de l\'agence concernée',
                'Nos partenaires bancaires et organismes de financement automobile (uniquement avec votre accord préalable)',
                'Nos prestataires techniques (hébergeur, outil CRM, solution emailing) liés par contrat de sous-traitance',
                'Les autorités judiciaires ou administratives compétentes en cas d\'obligation légale',
              ]} />
              <p>
                Vos données personnelles <strong className="text-white">ne sont ni vendues, ni louées,
                ni cédées</strong> à des tiers à des fins commerciales. En cas de transfert hors
                Union Européenne, Activ Automobiles s&apos;assure que des garanties appropriées sont en
                place (clauses contractuelles types approuvées par la Commission Européenne).
              </p>
            </Section>

            {/* 7. Sécurité */}
            <Section id="securite" icon={Lock} title="7. Sécurité des données">
              <p>
                Activ Automobiles met en œuvre des mesures techniques et organisationnelles appropriées
                pour protéger vos données personnelles contre toute perte, destruction, altération,
                accès ou divulgation non autorisés.
              </p>
              <BulletList items={[
                'Connexion sécurisée via protocole HTTPS (chiffrement SSL/TLS)',
                'Accès aux données restreint aux seules personnes habilitées',
                'Hébergement sur infrastructure sécurisée (Netlify, Inc.)',
                'Surveillance des accès et procédures de gestion des incidents',
                'Sensibilisation de nos équipes aux bonnes pratiques de sécurité',
              ]} />
              <p>
                En cas de violation de données susceptible d&apos;engendrer un risque pour vos droits
                et libertés, nous nous engageons à en informer la CNIL dans les délais légaux
                (72 heures) et à vous notifier si ce risque est élevé.
              </p>
            </Section>

            {/* 8. Droits */}
            <Section id="droits" icon={Eye} title="8. Droits des utilisateurs">
              <p>
                Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
              </p>
              <CardGrid items={[
                { title: 'Droit d\'accès (Art. 15)', desc: 'Obtenir confirmation que des données vous concernant sont traitées, et en recevoir une copie.' },
                { title: 'Droit de rectification (Art. 16)', desc: 'Faire corriger vos données inexactes ou incomplètes.' },
                { title: 'Droit à l\'effacement (Art. 17)', desc: 'Demander la suppression de vos données, sous réserve des obligations légales de conservation.' },
                { title: 'Droit à la portabilité (Art. 20)', desc: 'Recevoir vos données dans un format structuré et couramment utilisé.' },
                { title: 'Droit d\'opposition (Art. 21)', desc: 'Vous opposer au traitement de vos données à des fins de prospection commerciale.' },
                { title: 'Droit à la limitation (Art. 18)', desc: 'Demander la suspension temporaire du traitement de vos données.' },
              ]} />
              <p>
                Vous disposez également du droit de définir des directives relatives au sort de vos
                données après votre décès.
              </p>
              <p>
                En cas de litige non résolu, vous avez le droit d&apos;introduire une réclamation auprès
                de la CNIL :{' '}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer"
                  className="font-semibold transition-colors duration-150 hover:text-white" style={{ color: '#4a8fd4' }}>
                  www.cnil.fr
                </a>
              </p>
            </Section>

            {/* 9. Exercice des droits */}
            <Section id="exercice-droits" icon={FileText} title="9. Modalités d'exercice des droits">
              <p>
                Pour exercer l&apos;un de vos droits, vous pouvez nous contacter par les moyens suivants.
                Votre demande sera traitée dans un délai d&apos;un mois à compter de sa réception.
              </p>
              <InfoBox>
                <Row label="Par email">
                  <a href="mailto:contact@activ-automobiles.com"
                    className="transition-colors duration-150 hover:text-white" style={{ color: '#4a8fd4' }}>
                    contact@activ-automobiles.com
                  </a>
                </Row>
                <Row label="Par téléphone">
                  <a href="tel:+33383979797"
                    className="transition-colors duration-150 hover:text-white" style={{ color: '#4a8fd4' }}>
                    03 83 97 97 97
                  </a>
                </Row>
                <Row label="Par courrier">
                  <address className="not-italic">
                    Activ Automobiles – RGPD, 12 rue du Saintois, 54520 Laxou
                  </address>
                </Row>
              </InfoBox>
              <p>
                Toute demande doit être accompagnée d&apos;une pièce d&apos;identité afin de vérifier votre
                identité et d&apos;éviter toute communication de données à une personne non autorisée.
                Ce délai peut être prolongé de deux mois supplémentaires en raison de la complexité
                ou du nombre de demandes.
              </p>
            </Section>

            {/* 10. Cookies */}
            <Section id="cookies" icon={Cookie} title="10. Cookies et traceurs">
              <p>
                Le site activ-automobiles.com utilise des cookies et technologies similaires.
                Conformément aux recommandations de la CNIL, votre consentement est recueilli avant
                tout dépôt de cookie non strictement nécessaire au fonctionnement du site.
              </p>
              <p>
                Vous pouvez à tout moment modifier vos préférences en matière de cookies. Pour plus
                d&apos;informations détaillées sur les cookies que nous utilisons, leur finalité et leur
                durée de conservation, consultez notre{' '}
                <Link href="/legal/cookies"
                  className="font-semibold transition-colors duration-150 hover:text-white" style={{ color: '#4a8fd4' }}>
                  Politique cookies
                </Link>.
              </p>
            </Section>

            {/* 11. Mise à jour */}
            <Section id="mise-a-jour" icon={RefreshCw} title="11. Mise à jour de la politique">
              <p>
                Activ Automobiles se réserve le droit de modifier la présente politique de
                confidentialité à tout moment, notamment pour se conformer à toute évolution
                législative, réglementaire, jurisprudentielle ou technique.
              </p>
              <p>
                La version applicable est celle accessible en ligne sur ce site. Nous vous invitons
                à la consulter régulièrement. En cas de modification substantielle, nous vous en
                informerons par les moyens appropriés.
              </p>
            </Section>

            {/* Navigation interne */}
            <div
              className="rounded-xl p-5 flex flex-wrap gap-3"
              style={{ background: 'rgba(26,63,111,0.08)', border: '1px solid rgba(26,63,111,0.18)' }}
            >
              <p className="w-full text-xs font-semibold text-white mb-1">Pages associées</p>
              {[
                { href: '/voitures-occasion', label: 'Véhicules d\'occasion' },
                { href: '/contact', label: 'Nous contacter' },
                { href: '/legal/mentions-legales', label: 'Mentions légales' },
                { href: '/legal/cookies', label: 'Gestion des cookies' },
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
                <p className="text-xs font-semibold uppercase tracking-wider mb-4"
                  style={{ color: 'rgba(255,255,255,0.7)' }}>
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

              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-4"
                  style={{ color: 'rgba(255,255,255,0.7)' }}>
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

              <div
                className="rounded-2xl p-5 space-y-3"
                style={{ background: 'rgba(26,63,111,0.1)', border: '1px solid rgba(74,143,212,0.2)' }}
              >
                <p className="text-xs font-semibold text-white">Exercer vos droits RGPD</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Contactez-nous directement pour toute demande relative à vos données.
                </p>
                <a href="mailto:contact@activ-automobiles.com"
                  className="block text-xs font-semibold transition-colors duration-150 hover:text-white"
                  style={{ color: '#4a8fd4' }}>
                  contact@activ-automobiles.com
                </a>
                <a href="tel:+33383979797"
                  className="block text-xs transition-colors duration-150 hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>
                  03 83 97 97 97
                </a>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
