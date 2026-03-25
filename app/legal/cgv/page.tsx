import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  FileText,
  Building2,
  Car,
  Tag,
  CreditCard,
  CalendarCheck,
  Truck,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Wallet,
  Users,
  Scale,
  RefreshCw,
  Lock,
  MousePointerClick,
  Ban,
} from 'lucide-react';
import { SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente – Véhicules d\'occasion | Activ Automobiles Laxou',
  description:
    'CGV d\'Activ Automobiles : vente de véhicules d\'occasion en agence et à distance, paiement sécurisé automobile, livraison véhicule partout en France, acompte, réservation en ligne et garanties légales.',
  alternates: {
    canonical: `${SITE_URL}/legal/cgv`,
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

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5 space-y-3"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <span className="font-semibold w-52 flex-shrink-0 text-xs uppercase tracking-wide"
        style={{ color: 'rgba(255,255,255,0.4)' }}>
        {label}
      </span>
      <span className="text-white font-medium text-sm">{children}</span>
    </div>
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

function AlertBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg p-4 flex gap-3"
      style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)' }}>
      <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#f59e0b' }} />
      <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
        {children}
      </div>
    </div>
  );
}

function ImportantBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg p-4 flex gap-3"
      style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)' }}>
      <Ban size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#ef4444' }} />
      <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
        {children}
      </div>
    </div>
  );
}

const tocItems = [
  { href: '#objet', label: '1. Objet et champ d\'application' },
  { href: '#vendeur', label: '2. Identification du vendeur' },
  { href: '#vehicules', label: '3. Véhicules proposés' },
  { href: '#prix', label: '4. Prix' },
  { href: '#commande', label: '5. Modalités de commande' },
  { href: '#paiement', label: '6. Paiement – achat comptant' },
  { href: '#reservation', label: '7. Réservation et acompte' },
  { href: '#livraison', label: '8. Livraison nationale' },
  { href: '#propriete', label: '9. Transfert de propriété' },
  { href: '#retractation', label: '10. Droit de rétractation' },
  { href: '#garantie-conformite', label: '11. Garantie légale de conformité' },
  { href: '#vices-caches', label: '12. Garantie des vices cachés' },
  { href: '#garantie-commerciale', label: '13. Garantie commerciale' },
  { href: '#reprise', label: '14. Reprise de véhicule' },
  { href: '#financement', label: '15. Financement' },
  { href: '#antiblanchiment', label: '16. Lutte anti-blanchiment' },
  { href: '#responsabilite', label: '17. Responsabilité limitée' },
  { href: '#force-majeure', label: '18. Force majeure' },
  { href: '#donnees', label: '19. Données personnelles' },
  { href: '#mediation', label: '20. Médiation à la consommation' },
  { href: '#droit', label: '21. Droit applicable et tribunal' },
];

export default function CGVPage() {
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
              <li className="text-white font-medium" aria-current="page">Conditions Générales de Vente</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(26,63,111,0.2)', border: '1px solid rgba(74,143,212,0.3)', color: '#4a8fd4' }}
            >
              <FileText size={11} />
              Droit français – B2C
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(26,63,111,0.2)', border: '1px solid rgba(74,143,212,0.3)', color: '#4a8fd4' }}
            >
              <Lock size={11} />
              Vente en agence &amp; à distance
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            Conditions Générales de Vente – Véhicules d&apos;Occasion
          </h1>
          <p className="text-sm max-w-2xl" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Les présentes Conditions Générales de Vente (CGV) régissent l&apos;ensemble des relations
            contractuelles entre <strong className="text-white/70">Activ Automobiles</strong> et ses
            clients dans le cadre de la{' '}
            <strong className="text-white/70">vente de véhicules d&apos;occasion</strong> – en agence
            à Laxou et dans notre réseau, ainsi qu&apos;à distance avec livraison véhicule partout en France.
            Elles s&apos;appliquent à tout achat réalisé à compter du 1er janvier 2025.
          </p>
          <p className="mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Dernière mise à jour : 2 mars 2025 — Version 3.0
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main */}
          <main className="flex-1 min-w-0 max-w-3xl space-y-14">

            {/* 1. Objet */}
            <Section id="objet" icon={FileText} title="1. Objet et champ d'application">
              <p>
                Les présentes Conditions Générales de Vente ont pour objet de définir les droits
                et obligations des parties dans le cadre de la <strong className="text-white">vente de véhicules
                d&apos;occasion</strong> proposée par la société Activ Automobiles à tout acheteur
                particulier consommateur (ci-après « l&apos;Acheteur »), qu&apos;il s&apos;agisse d&apos;une vente
                réalisée directement en agence ou d&apos;un achat voiture à distance assorti d&apos;une
                livraison nationale.
              </p>
              <p>
                Toute commande passée auprès d&apos;Activ Automobiles implique l&apos;acceptation pleine,
                entière et sans réserve des présentes CGV. Activ Automobiles se réserve le droit
                de les modifier à tout moment. Les CGV applicables sont celles en vigueur à la
                date de signature du bon de commande.
              </p>
              <p>
                Les présentes CGV sont applicables à l&apos;exclusion de toute autre condition,
                notamment les éventuelles conditions générales d&apos;achat de l&apos;Acheteur.
              </p>
            </Section>

            {/* 2. Vendeur */}
            <Section id="vendeur" icon={Building2} title="2. Identification du vendeur">
              <p>
                Les véhicules d&apos;occasion sont vendus exclusivement par :
              </p>
              <InfoBox>
                <Row label="Raison sociale">Activ Automobiles</Row>
                <Row label="Forme juridique">EURL – capital social 3 000 000 €</Row>
                <Row label="Siège social">
                  <address className="not-italic">
                    12 rue du Saintois, 54520 Laxou – France
                    <br />
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Garage automobile à Laxou, Nancy
                    </span>
                  </address>
                </Row>
                <Row label="RCS">Nancy 503 431 066</Row>
                <Row label="Téléphone">
                  <a href="tel:+33383979797" className="transition-colors duration-150 hover:text-white" style={{ color: '#4a8fd4' }}>
                    03 83 97 97 97
                  </a>
                </Row>
                <Row label="Email">
                  <a href="mailto:contact@activ-automobiles.com" className="transition-colors duration-150 hover:text-white" style={{ color: '#4a8fd4' }}>
                    contact@activ-automobiles.com
                  </a>
                </Row>
              </InfoBox>
              <p>
                Activ Automobiles est un réseau d&apos;agences automobiles présent sur l&apos;ensemble du
                territoire français, spécialisé dans la{' '}
                <Link href="/voitures-occasion" className="font-semibold transition-colors hover:text-white" style={{ color: '#4a8fd4' }}>
                  vente de véhicules d&apos;occasion sélectionnés
                </Link>
                , la reprise automobile et le financement auto. Chaque agence est habilitée à
                conclure des contrats de vente au nom et pour le compte de la société.
              </p>
            </Section>

            {/* 3. Véhicules */}
            <Section id="vehicules" icon={Car} title="3. Véhicules proposés à la vente">
              <p>
                Activ Automobiles propose à la vente des véhicules d&apos;occasion sélectionnés,
                contrôlés et préparés dans ses ateliers. Chaque véhicule fait l&apos;objet d&apos;une
                fiche descriptive mentionnant ses principales caractéristiques techniques.
              </p>
              <AlertBox>
                <strong className="text-white">Caractéristiques à titre indicatif.</strong>{' '}
                Les photographies, descriptions et caractéristiques techniques présentées sur
                le site internet, les annonces en ligne ou dans tout support commercial sont
                fournies à titre purement indicatif et sont{' '}
                <strong className="text-white">non contractuelles</strong>. Elles peuvent
                différer de l&apos;état réel du véhicule au moment de la vente, notamment en
                raison d&apos;erreurs typographiques ou de mise à jour tardive des annonces,
                indépendantes de la volonté d&apos;Activ Automobiles. Seul le bon de commande
                signé fait foi. En cas d&apos;erreur matérielle manifeste sur une annonce
                (erreur de prix, de kilométrage ou de désignation manifestement erronée),
                Activ Automobiles se réserve le droit d&apos;annuler la commande et de restituer
                intégralement les sommes versées, sans qu&apos;aucune indemnité ne puisse être réclamée.
              </AlertBox>
              <BulletList items={[
                'Chaque véhicule est vendu avec son carnet d\'entretien, si disponible',
                'Un contrôle technique de moins de 6 mois est fourni pour les véhicules de plus de 4 ans',
                'Le kilométrage indiqué est celui relevé au compteur lors de la reprise ou à la date d\'annonce',
                'Toute option ou équipement mentionné est vérifié lors de la remise des clés',
                'Les véhicules sont proposés en l\'état, sauf mention contraire expressément indiquée sur le bon de commande',
              ]} />
            </Section>

            {/* 4. Prix */}
            <Section id="prix" icon={Tag} title="4. Prix">
              <p>
                Les prix sont indiqués en euros toutes taxes comprises (TTC). Activ Automobiles
                se réserve le droit de modifier ses prix à tout moment. Le prix applicable est
                celui affiché au moment de la conclusion et de la signature du bon de commande.
              </p>
              <p>
                Le prix de vente affiché ne comprend pas :
              </p>
              <BulletList items={[
                'Les frais d\'immatriculation et de carte grise, à la charge de l\'Acheteur',
                'Les éventuels frais de livraison à domicile, précisés avant toute validation de commande',
                'Les frais d\'assurance, obligatoire à compter de la remise des clés',
              ]} />
              <p>
                Des frais de préparation et de mise en état du véhicule peuvent être inclus
                dans le prix affiché. Ce point est expressément mentionné sur le bon de commande.
              </p>
            </Section>

            {/* 5. Commande à distance */}
            <Section id="commande" icon={MousePointerClick} title="5. Modalités de commande – Vente à distance et signature électronique">
              <p>
                Activ Automobiles propose la possibilité de réserver ou d&apos;acheter un véhicule
                d&apos;occasion à distance, depuis le site internet ou par tout moyen de communication
                à distance (téléphone, email, formulaire en ligne). Dans ce cadre, les modalités
                suivantes s&apos;appliquent :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    title: 'Signature électronique',
                    desc: 'Le bon de commande est transmis à l\'Acheteur par voie électronique. La signature peut être réalisée par voie électronique, conformément à l\'article 1366 du Code civil. Elle a la même valeur juridique qu\'une signature manuscrite et engage définitivement les deux parties.',
                  },
                  {
                    title: 'Acceptation des CGV',
                    desc: 'L\'Acheteur doit cocher une case confirmant qu\'il a pris connaissance des présentes CGV et qu\'il les accepte expressément, préalablement à toute validation de commande. Aucune commande ne peut être finalisée sans cette acceptation.',
                  },
                  {
                    title: 'Confirmation par email',
                    desc: 'Un bon de commande récapitulatif est envoyé à l\'Acheteur à l\'adresse email communiquée, dès validation. Ce document constitue la preuve de la transaction et est conservé par Activ Automobiles conformément aux obligations légales.',
                  },
                  {
                    title: 'Conservation de la preuve',
                    desc: 'Activ Automobiles conserve l\'ensemble des données de transaction (bon de commande, acceptation des CGV, preuve de paiement) conformément aux dispositions légales applicables. L\'Acheteur peut en demander communication à tout moment.',
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="rounded-xl p-4 space-y-2"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-white font-semibold text-xs">{title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* 6. Paiement */}
            <Section id="paiement" icon={CreditCard} title="6. Paiement – Achat comptant">
              <p>
                Le paiement sécurisé automobile est exigé <strong className="text-white">intégralement
                avant ou au moment de la remise des clés</strong>. Aucun départ de véhicule ne
                peut intervenir sans encaissement effectif et irrévocable de la totalité du prix
                de vente. Les modes de paiement acceptés sont les suivants :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    title: 'Virement bancaire sécurisé',
                    desc: 'Virement sur le compte bancaire d\'Activ Automobiles. Les coordonnées IBAN sont transmises exclusivement après validation du bon de commande. Le véhicule n\'est remis qu\'après réception effective et irrévocable des fonds sur le compte d\'Activ Automobiles.',
                  },
                  {
                    title: 'Chèque de banque certifié',
                    desc: 'Chèque de banque certifié établi à l\'ordre d\'Activ Automobiles, émis par un établissement bancaire agréé en France. Activ Automobiles se réserve le droit de vérifier l\'authenticité du chèque auprès de l\'établissement émetteur avant toute remise du véhicule. Un chèque personnel ne sera accepté que pour les montants inférieurs à 1 500 €.',
                  },
                  {
                    title: 'Financement accordé',
                    desc: 'Via nos partenaires financiers agréés. Le versement est effectué directement par l\'organisme de crédit dès accord définitif de financement. La remise du véhicule intervient après réception des fonds et signature de l\'ensemble des documents contractuels.',
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="rounded-xl p-4 space-y-2"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-white font-semibold text-xs">{title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                  </div>
                ))}
              </div>
              <ImportantBox>
                <strong className="text-white">Clause anti-fraude.</strong>{' '}
                Activ Automobiles se réserve le droit de refuser ou d&apos;annuler toute commande
                dont les conditions de paiement lui paraissent suspectes ou frauduleuses (chèque
                de banque douteux, virement de source non identifiable, demande de remboursement
                partiel avant départ du véhicule, etc.). En cas de détection d&apos;un paiement
                frauduleux, la vente sera annulée de plein droit et la transaction signalée aux
                autorités compétentes.
              </ImportantBox>
              <p>
                Tout retard de paiement entraîne l&apos;application de pénalités égales à trois fois
                le taux d&apos;intérêt légal en vigueur, sans mise en demeure préalable, ainsi qu&apos;une
                indemnité forfaitaire pour frais de recouvrement de 40 € (Décret n° 2012-1115).
              </p>
            </Section>

            {/* 7. Réservation */}
            <Section id="reservation" icon={CalendarCheck} title="7. Réservation en ligne et acompte">
              <p>
                L&apos;Acheteur peut réserver un véhicule en ligne ou en agence par le versement d&apos;un
                acompte, dont le montant est fixé d&apos;un commun accord et clairement mentionné sur
                le bon de commande. En règle générale, l&apos;acompte est compris entre{' '}
                <strong className="text-white">500 € et 2 000 €</strong> selon le prix du véhicule.
              </p>
              <BulletList items={[
                'Le versement de l\'acompte engage définitivement l\'Acheteur et le vendeur',
                'Le véhicule est retiré de la vente dès encaissement de l\'acompte',
                'L\'acompte est déduit du prix de vente total lors du solde',
                'La durée de validité de la réservation est précisée sur le bon de commande et ne dépasse pas 30 jours, sauf accord express',
              ]} />
              <InfoBox>
                <p className="text-white font-semibold text-sm mb-2">Conditions d&apos;annulation</p>
                <div className="space-y-2 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <p>
                    <strong className="text-white/80">Désistement de l&apos;Acheteur :</strong>{' '}
                    En cas de rétractation ou d&apos;annulation de la commande à l&apos;initiative de
                    l&apos;Acheteur après encaissement de l&apos;acompte, hors cas légaux de rétractation
                    applicables (vente à distance), l&apos;acompte reste acquis à Activ Automobiles
                    à titre d&apos;indemnisation du préjudice subi (immobilisation du véhicule,
                    manque à gagner).
                  </p>
                  <p>
                    <strong className="text-white/80">Désistement d&apos;Activ Automobiles :</strong>{' '}
                    En cas d&apos;impossibilité avérée de livrer le véhicule réservé (sinistre, vice
                    grave découvert, erreur matérielle manifeste), Activ Automobiles restituera
                    l&apos;intégralité de l&apos;acompte dans un délai de 14 jours, sans qu&apos;aucune
                    indemnité complémentaire ne puisse être exigée.
                  </p>
                  <p>
                    <strong className="text-white/80">Clause suspensive financement :</strong>{' '}
                    Si une clause suspensive d&apos;obtention de financement est stipulée, le refus
                    de financement entraîne l&apos;annulation de la vente et la restitution
                    intégrale de l&apos;acompte.
                  </p>
                </div>
              </InfoBox>
            </Section>

            {/* 8. Livraison */}
            <Section id="livraison" icon={Truck} title="8. Livraison nationale – Retrait en agence">
              <p>
                Activ Automobiles propose la <strong className="text-white">livraison de véhicule
                partout en France métropolitaine</strong>. Les frais de livraison sont calculés
                en fonction de la distance et du mode de transport choisi. Ils sont communiqués
                à l&apos;Acheteur avant toute validation de commande et figurent sur le bon de commande.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    title: 'Retrait en agence',
                    desc: 'Le retrait s\'effectue à l\'agence Activ Automobiles convenue lors de la commande, sur rendez-vous, après paiement intégral du prix. L\'Acheteur doit se présenter avec une pièce d\'identité en cours de validité et son permis de conduire.',
                  },
                  {
                    title: 'Livraison à domicile',
                    desc: 'La livraison est effectuée par transporteur spécialisé ou par un collaborateur Activ Automobiles sur l\'ensemble du territoire français. Le délai indicatif est communiqué lors de la commande. Activ Automobiles s\'engage à respecter le délai convenu, sauf cas de force majeure.',
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="rounded-xl p-4 space-y-2"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-white font-semibold text-xs">{title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                  </div>
                ))}
              </div>
              <p>
                Lors de la remise ou de la livraison du véhicule, un état des lieux est réalisé
                contradictoirement. L&apos;Acheteur est tenu de vérifier l&apos;état général du véhicule
                et de signaler <strong className="text-white">immédiatement</strong> et par écrit
                toute anomalie ou dommage constaté avant de signer le procès-verbal de livraison.
              </p>
              <AlertBox>
                Toute réserve non formulée par écrit au moment de la remise des clés ou de la
                livraison ne pourra plus être invoquée ultérieurement au titre de la garantie
                commerciale, ni opposée à Activ Automobiles. La signature du procès-verbal de
                livraison sans réserve vaut acceptation de l&apos;état du véhicule.
              </AlertBox>
            </Section>

            {/* 9. Transfert de propriété */}
            <Section id="propriete" icon={ShieldCheck} title="9. Transfert de propriété et des risques">
              <p>
                Le transfert de propriété du véhicule n&apos;intervient qu&apos;après{' '}
                <strong className="text-white">paiement intégral et effectif du prix de vente</strong>,
                quels que soient les délais accordés ou la date de livraison. Jusqu&apos;au paiement
                complet, Activ Automobiles demeure propriétaire du véhicule.
              </p>
              <p>
                Le <strong className="text-white">transfert des risques</strong> (dommages, perte,
                dégradation) intervient dès la remise effective et physique du véhicule à
                l&apos;Acheteur, matérialisée par la signature du procès-verbal de livraison.
                À compter de cette date, l&apos;Acheteur est seul responsable du véhicule et doit
                justifier d&apos;une assurance automobile valide couvrant au minimum la responsabilité
                civile.
              </p>
              <p>
                L&apos;Acheteur qui entrerait en possession physique du véhicule avant paiement
                intégral (notamment dans le cadre d&apos;un financement en cours de traitement)
                reconnaît le détenir au nom d&apos;Activ Automobiles et s&apos;engage à ne pas le
                revendre ou le grever de toute sûreté avant transfert effectif de propriété.
              </p>
            </Section>

            {/* 10. Rétractation */}
            <Section id="retractation" icon={RotateCcw} title="10. Droit de rétractation">
              <p>
                Le droit de rétractation est soumis aux dispositions des articles L. 221-1 et
                suivants du Code de la consommation.
              </p>
              <InfoBox>
                <p className="text-white font-semibold text-sm mb-3">Vente en agence</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Conformément à l&apos;article L. 221-2 du Code de la consommation, le droit légal
                  de rétractation de 14 jours <strong className="text-white">ne s&apos;applique pas</strong>{' '}
                  aux contrats conclus dans les locaux commerciaux d&apos;Activ Automobiles (achat en agence).
                  L&apos;Acheteur qui signe un bon de commande en agence est engagé définitivement,
                  sous réserve des clauses suspensives éventuellement stipulées.
                </p>
              </InfoBox>
              <InfoBox>
                <p className="text-white font-semibold text-sm mb-3">Vente à distance</p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Pour tout achat voiture à distance (signé hors agence physique, par voie électronique
                  ou téléphonique), l&apos;Acheteur dispose d&apos;un délai de{' '}
                  <strong className="text-white">14 jours calendaires</strong> à compter de la
                  réception du véhicule pour exercer son droit de rétractation, sans avoir à
                  motiver sa décision.
                </p>
                <p className="text-xs leading-relaxed mb-2 font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Modalités d&apos;exercice :
                </p>
                <ul className="space-y-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <li>— Notifier Activ Automobiles par email à contact@activ-automobiles.com ou par courrier recommandé avec AR au siège social</li>
                  <li>— Le véhicule doit être restitué dans un délai de 14 jours suivant la notification, en bon état et avec tous ses documents</li>
                  <li>— Les frais de retour sont à la charge de l&apos;Acheteur</li>
                  <li>— En cas d&apos;usage excessif du véhicule (kilométrage anormal, dommages), une déduction correspondant à la dépréciation subie pourra être appliquée sur le remboursement</li>
                  <li>— Le remboursement intervient dans un délai de 14 jours à compter de la récupération du véhicule par Activ Automobiles</li>
                </ul>
              </InfoBox>
              <AlertBox>
                Le droit de rétractation ne s&apos;applique pas aux véhicules ayant fait l&apos;objet
                d&apos;une personnalisation spécifique à la demande de l&apos;Acheteur (préparation
                particulière, équipements sur mesure) mentionnée sur le bon de commande.
              </AlertBox>
            </Section>

            {/* 11. Garantie conformité */}
            <Section id="garantie-conformite" icon={ShieldCheck} title="11. Garantie légale de conformité">
              <p>
                Conformément aux articles L. 217-4 à L. 217-16 du Code de la consommation,
                Activ Automobiles est tenu de livrer un véhicule conforme au contrat et répond
                des défauts de conformité existant lors de la délivrance.
              </p>
              <BulletList items={[
                'L\'Acheteur dispose d\'un délai de 2 ans à compter de la délivrance du véhicule pour agir',
                'Pour les véhicules d\'occasion, ce délai peut être réduit contractuellement à 1 an par mention expresse sur le bon de commande',
                'En cas de défaut de conformité, l\'Acheteur choisit entre la réparation ou le remplacement du véhicule',
                'Si la réparation et le remplacement sont impossibles ou disproportionnés, l\'Acheteur peut obtenir remboursement ou réduction de prix',
                'Pendant les 12 premiers mois suivant la délivrance, tout défaut de conformité est présumé exister au moment de la délivrance, sauf preuve contraire',
              ]} />
            </Section>

            {/* 12. Vices cachés */}
            <Section id="vices-caches" icon={AlertTriangle} title="12. Garantie légale des vices cachés">
              <p>
                Conformément aux articles 1641 à 1649 du Code civil, Activ Automobiles est
                tenu de la garantie à raison des défauts cachés du véhicule vendu qui le rendent
                impropre à l&apos;usage auquel il est destiné, ou qui diminuent tellement cet usage
                que l&apos;Acheteur ne l&apos;aurait pas acquis, ou n&apos;en aurait donné qu&apos;un moindre prix,
                s&apos;il les avait connus.
              </p>
              <p>
                L&apos;action résultant des vices rédhibitoires doit être intentée par l&apos;Acheteur
                dans un délai de <strong className="text-white">2 ans à compter de la découverte
                du vice</strong>. L&apos;Acheteur peut choisir entre la résolution de la vente
                (remboursement intégral) ou une réduction du prix de vente (action estimatoire).
              </p>
              <p>
                La garantie des vices cachés ne couvre pas les défauts apparents que l&apos;Acheteur
                aurait pu constater lors de la remise du véhicule et qui n&apos;ont pas fait l&apos;objet
                de réserves écrites sur le procès-verbal de livraison.
              </p>
            </Section>

            {/* 13. Garantie commerciale */}
            <Section id="garantie-commerciale" icon={ShieldCheck} title="13. Garantie commerciale">
              <p>
                En complément des garanties légales et sans s&apos;y substituer, Activ Automobiles
                peut proposer une <strong className="text-white">garantie commerciale</strong> sur
                certains véhicules. La durée (généralement 12 mois), l&apos;étendue de la couverture
                et les exclusions sont précisées sur le bon de commande et dans le document de
                garantie remis lors de la vente.
              </p>
              <BulletList items={[
                'La garantie commerciale couvre les pannes mécaniques survenant en utilisation normale du véhicule',
                'Elle ne couvre pas l\'usure normale (freins, pneus, embrayage, ampoules…)',
                'Elle est valable sur présentation du bon de commande et du certificat de garantie',
                'Elle peut être prolongée ou étendue moyennant un contrat de garantie complémentaire',
                'Elle est non transférable en cas de revente du véhicule, sauf accord express d\'Activ Automobiles',
              ]} />
            </Section>

            {/* 14. Reprise */}
            <Section id="reprise" icon={RotateCcw} title="14. Reprise de véhicule">
              <p>
                Activ Automobiles propose un service de{' '}
                <strong className="text-white">reprise de votre véhicule</strong> lors de
                l&apos;achat d&apos;un véhicule d&apos;occasion dans le réseau. L&apos;estimation est réalisée
                gratuitement et sans engagement.
              </p>
              <BulletList items={[
                'L\'estimation est valable 30 jours à compter de la date de l\'offre écrite',
                'Le prix de reprise définitif est conditionné à la vérification physique du véhicule en agence',
                'Le véhicule repris doit être en état de fonctionnement, avec tous ses documents administratifs en cours de validité',
                'La reprise n\'est valable que dans le cadre d\'un achat simultané chez Activ Automobiles',
                'Activ Automobiles se réserve le droit de refuser tout véhicule présentant des vices dissimulés ou une description inexacte',
              ]} />
            </Section>

            {/* 15. Financement */}
            <Section id="financement" icon={Wallet} title="15. Financement automobile">
              <p>
                Activ Automobiles propose des solutions de financement automobile en partenariat
                avec des organismes de crédit agréés. Tout financement est soumis à l&apos;acceptation
                du dossier par l&apos;organisme prêteur et ne constitue pas un engagement de la part
                d&apos;Activ Automobiles.
              </p>
              <BulletList items={[
                'L\'achat est conditionné à l\'obtention du financement si une clause suspensive est stipulée dans le bon de commande',
                'En cas de refus de financement, la commande est annulée de plein droit et l\'acompte restitué intégralement',
                'Le taux annuel effectif global (TAEG) et le coût total du crédit sont mentionnés dans le contrat de crédit',
                'L\'emprunteur dispose d\'un délai de rétractation de 14 jours à compter de l\'acceptation de l\'offre de crédit',
              ]} />
              <AlertBox>
                Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de
                remboursement avant de vous engager. (Articles L. 312-1 et suivants du Code
                de la consommation – Loi Scrivener)
              </AlertBox>
            </Section>

            {/* 16. Anti-blanchiment */}
            <Section id="antiblanchiment" icon={Lock} title="16. Lutte contre le blanchiment de capitaux">
              <p>
                Conformément aux articles L. 561-1 et suivants du Code monétaire et financier,
                Activ Automobiles est soumis aux obligations de vigilance en matière de lutte
                contre le blanchiment de capitaux et le financement du terrorisme.
              </p>
              <BulletList items={[
                'Activ Automobiles se réserve le droit de demander à l\'Acheteur tout justificatif d\'identité et de domicile',
                'Activ Automobiles peut demander la justification de l\'origine des fonds pour tout paiement',
                'Tout paiement en espèces est interdit au-delà du seuil légal en vigueur (1 000 € pour les résidents français)',
                'En cas de doute sur l\'origine des fonds ou l\'identité de l\'Acheteur, Activ Automobiles se réserve le droit de refuser la vente',
                'Activ Automobiles est tenu de signaler toute opération suspecte à Tracfin, l\'unité de renseignement financier française',
              ]} />
              <ImportantBox>
                <strong className="text-white">Refus de vente.</strong>{' '}
                Activ Automobiles se réserve le droit absolu de refuser toute vente dont les
                modalités de paiement, l&apos;identité de l&apos;acheteur ou l&apos;origine des fonds
                susciteraient des doutes légitimes, sans que cette décision ne puisse engager
                la responsabilité d&apos;Activ Automobiles.
              </ImportantBox>
            </Section>

            {/* 17. Responsabilité */}
            <Section id="responsabilite" icon={Scale} title="17. Responsabilité limitée">
              <p>
                Activ Automobiles ne saurait être tenu responsable des dommages indirects,
                immatériels ou consécutifs résultant de l&apos;utilisation du véhicule après la
                remise des clés. En tout état de cause, la responsabilité d&apos;Activ Automobiles
                est expressément limitée au montant de la transaction concernée.
              </p>
              <BulletList items={[
                'Activ Automobiles n\'est pas responsable des modifications apportées au véhicule par l\'Acheteur après la vente',
                'Activ Automobiles n\'est pas responsable des dommages résultant d\'une utilisation anormale ou non conforme aux préconisations du constructeur',
                'Les erreurs ou omissions dans les annonces publiées, indépendantes de la volonté d\'Activ Automobiles, n\'engagent pas sa responsabilité dès lors qu\'elles sont corrigées avant la signature du bon de commande',
                'Activ Automobiles n\'est pas responsable des retards de livraison résultant de circonstances extérieures à son contrôle',
              ]} />
            </Section>

            {/* 18. Force majeure */}
            <Section id="force-majeure" icon={RefreshCw} title="18. Force majeure">
              <p>
                Activ Automobiles ne saurait être tenu responsable de l&apos;inexécution ou du retard
                dans l&apos;exécution de ses obligations contractuelles lorsque cette inexécution
                résulte d&apos;un événement de force majeure au sens de l&apos;article 1218 du Code civil.
              </p>
              <p>
                Sont notamment considérés comme cas de force majeure : catastrophes naturelles,
                incendies, grèves générales de transport, pandémie, décision gouvernementale
                d&apos;interdiction, panne informatique majeure, indisponibilité du transporteur.
              </p>
              <p>
                En cas de force majeure, les obligations des parties sont suspendues. Si l&apos;événement
                perdure au-delà de 30 jours, chaque partie peut résilier le contrat de plein
                droit. L&apos;acompte versé est alors restitué intégralement à l&apos;Acheteur.
              </p>
            </Section>

            {/* 19. Données personnelles */}
            <Section id="donnees" icon={Users} title="19. Données personnelles">
              <p>
                Dans le cadre de la vente de véhicules d&apos;occasion, Activ Automobiles collecte
                et traite les données personnelles de l&apos;Acheteur conformément au Règlement
                Général sur la Protection des Données (RGPD – Règlement UE 2016/679) et à
                notre{' '}
                <Link href="/legal/confidentialite"
                  className="font-semibold transition-colors duration-150 hover:text-white" style={{ color: '#4a8fd4' }}>
                  Politique de confidentialité
                </Link>.
              </p>
              <p>
                Les données collectées sont utilisées pour : l&apos;exécution du contrat de vente,
                les démarches administratives d&apos;immatriculation, le respect des obligations
                légales (lutte anti-blanchiment, comptabilité), et, avec le consentement de
                l&apos;Acheteur, pour lui proposer des offres adaptées. Elles ne sont jamais
                cédées à des tiers à des fins commerciales.
              </p>
              <p>
                L&apos;Acheteur dispose d&apos;un droit d&apos;accès, de rectification, de suppression et
                de portabilité de ses données, exercisable à l&apos;adresse email{' '}
                <a href="mailto:contact@activ-automobiles.com"
                  className="font-semibold transition-colors duration-150 hover:text-white" style={{ color: '#4a8fd4' }}>
                  contact@activ-automobiles.com
                </a>.
              </p>
            </Section>

            {/* 20. Médiation */}
            <Section id="mediation" icon={Scale} title="20. Médiation à la consommation">
              <p>
                En cas de litige relatif à l&apos;exécution des présentes CGV, l&apos;Acheteur est invité
                à contacter en priorité le service clientèle d&apos;Activ Automobiles à l&apos;adresse{' '}
                <a href="mailto:contact@activ-automobiles.com"
                  className="font-semibold transition-colors duration-150 hover:text-white" style={{ color: '#4a8fd4' }}>
                  contact@activ-automobiles.com
                </a>{' '}
                ou par courrier recommandé avec AR à l&apos;adresse du siège social.
              </p>
              <p>
                Conformément à l&apos;article L. 612-1 du Code de la consommation, tout consommateur
                a le droit de recourir gratuitement à un médiateur de la consommation en vue
                de la résolution amiable du litige. La saisine du médiateur est possible
                uniquement après avoir préalablement adressé une réclamation écrite à Activ
                Automobiles et en l&apos;absence de réponse satisfaisante dans un délai de 2 mois.
              </p>
              <InfoBox>
                <p className="text-white font-semibold text-sm">Médiation et règlement en ligne des litiges</p>
                <p className="text-xs leading-relaxed mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  La saisine du médiateur est également accessible via la plateforme européenne
                  de règlement en ligne des litiges (plateforme RLL) :{' '}
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer"
                    className="font-semibold transition-colors hover:text-white" style={{ color: '#4a8fd4' }}>
                    ec.europa.eu/consumers/odr
                  </a>
                </p>
              </InfoBox>
            </Section>

            {/* 21. Droit */}
            <Section id="droit" icon={RefreshCw} title="21. Droit applicable et tribunal compétent">
              <p>
                Les présentes Conditions Générales de Vente sont soumises au{' '}
                <strong className="text-white">droit français</strong>.
                Tout litige relatif à leur interprétation ou à leur exécution sera soumis,
                à défaut de résolution amiable, à la compétence exclusive des{' '}
                <strong className="text-white">tribunaux du ressort de Nancy (54)</strong>,
                nonobstant pluralité de défendeurs ou appel en garantie.
              </p>
              <p>
                Activ Automobiles se réserve le droit de modifier les présentes CGV à tout
                moment. Les modifications entrent en vigueur dès leur publication sur le site
                internet d&apos;Activ Automobiles. Les CGV applicables à une vente sont celles
                acceptées lors de la signature du bon de commande correspondant.
              </p>
            </Section>

            {/* Internal links */}
            <div
              className="rounded-xl p-5 flex flex-wrap gap-3"
              style={{ background: 'rgba(26,63,111,0.08)', border: '1px solid rgba(26,63,111,0.18)' }}
            >
              <p className="w-full text-xs font-semibold text-white mb-1">Pages associées</p>
              {[
                { href: '/voitures-occasion', label: 'Nos véhicules d\'occasion' },
                { href: '/services/financement', label: 'Financement auto' },
                { href: '/services/garantie', label: 'Garantie 12 mois' },
                { href: '/contact', label: 'Nous contacter' },
                { href: '/legal/mentions-legales', label: 'Mentions légales' },
                { href: '/legal/confidentialite', label: 'Politique de confidentialité' },
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

              <div
                className="rounded-2xl p-5 space-y-3"
                style={{ background: 'rgba(26,63,111,0.1)', border: '1px solid rgba(74,143,212,0.2)' }}
              >
                <p className="text-xs font-semibold text-white">Une question sur la vente ?</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Nos conseillers sont disponibles pour vous accompagner dans votre projet.
                </p>
                <a href="tel:+33383979797"
                  className="block text-xs font-semibold transition-colors duration-150 hover:text-white"
                  style={{ color: '#4a8fd4' }}>
                  03 83 97 97 97
                </a>
                <a href="mailto:contact@activ-automobiles.com"
                  className="block text-xs transition-colors duration-150 hover:text-white break-all"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>
                  contact@activ-automobiles.com
                </a>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
