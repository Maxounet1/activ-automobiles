import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Clock, User, Calendar } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/utils';

const TITLE = "Guide Complet : Comment Acheter une Voiture d'Occasion en 2026";
const DESCRIPTION = "Découvrez tous nos conseils pour acheter une voiture d'occasion en toute confiance : vérifications, documents, pièges à éviter et négociation.";
const SLUG = 'guide-achat-voiture-occasion';
const PUBLISHED = '2026-01-15';
const READ_TIME = 8;

export const metadata: Metadata = {
  title: `${TITLE} | ${SITE_NAME}`,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog/${SLUG}`,
    siteName: SITE_NAME,
    locale: 'fr_FR',
    type: 'article',
    publishedTime: PUBLISHED,
    authors: ['Équipe Activ Automobiles'],
  },
};

function jsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: TITLE, item: `${SITE_URL}/blog/${SLUG}` },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: TITLE,
        description: DESCRIPTION,
        datePublished: PUBLISHED,
        author: { '@type': 'Organization', name: SITE_NAME },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}/blog/${SLUG}`,
      },
    ],
  };
}

export default function GuideAchatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      <main className="min-h-screen" style={{ background: '#F8FAFC' }}>
        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="bg-white" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center gap-2 text-xs" style={{ color: '#94A3B8' }}>
              <li><Link href="/" className="hover:text-[#1A3F6F] transition-colors">Accueil</Link></li>
              <ChevronRight className="w-3 h-3" />
              <li><Link href="/blog" className="hover:text-[#1A3F6F] transition-colors">Blog</Link></li>
              <ChevronRight className="w-3 h-3" />
              <li className="font-semibold" style={{ color: '#475569' }}>Guide d&apos;achat</li>
            </ol>
          </div>
        </nav>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-10">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ color: '#1A3F6F', background: 'rgba(26,63,111,0.08)', border: '1px solid rgba(26,63,111,0.18)' }}
            >
              Achat de véhicule
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              {TITLE}
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-6">{DESCRIPTION}</p>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><User size={14} /> Équipe Activ Automobiles</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 15 janvier 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {READ_TIME} min de lecture</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-slate prose-lg max-w-none">
            <p>
              Acheter une voiture d&apos;occasion est une décision importante qui mérite une préparation rigoureuse.
              Que ce soit votre premier achat ou que vous soyez un automobiliste expérimenté, ce guide complet
              vous accompagne à chaque étape pour faire le bon choix en toute sérénité.
            </p>

            <h2>1. Définir son Budget et ses Besoins</h2>
            <p>
              Avant de commencer vos recherches, établissez un budget réaliste qui inclut le prix d&apos;achat,
              l&apos;assurance, le carburant, l&apos;entretien et les éventuelles réparations. Pensez également à
              vos besoins réels : nombre de passagers, type de trajets (ville, autoroute, mixte), espace de
              coffre et fréquence d&apos;utilisation.
            </p>
            <p>
              <strong>Conseil Activ Automobiles :</strong> Nous proposons des solutions de financement adaptées
              (crédit classique, LOA, LLD) pour vous aider à accéder au véhicule idéal sans compromettre votre
              budget mensuel. N&apos;hésitez pas à <Link href="/financement" className="text-[#1A3F6F] font-semibold hover:underline">simuler votre financement</Link>.
            </p>

            <h2>2. Les Vérifications Essentielles avant l&apos;Achat</h2>
            <h3>Le Contrôle Technique</h3>
            <p>
              Le contrôle technique doit dater de moins de 6 mois lors de la vente. Vérifiez attentivement les
              points signalés en défaillance majeure ou critique. Un contrôle technique avec contre-visite
              obligatoire doit vous alerter : le vendeur doit effectuer les réparations avant la vente.
            </p>

            <h3>L&apos;Historique du Véhicule</h3>
            <p>
              Demandez le carnet d&apos;entretien et les factures d&apos;entretien. Consultez le rapport Histovec
              (service gratuit du gouvernement) pour vérifier l&apos;historique administratif : nombre de
              propriétaires, sinistres déclarés, kilométrage enregistré aux contrôles techniques.
            </p>

            <h3>L&apos;Inspection Visuelle</h3>
            <ul>
              <li><strong>Carrosserie :</strong> Recherchez les traces de repeint, les différences de teinte entre panneaux, les impacts et rayures profondes.</li>
              <li><strong>Pneus :</strong> Vérifiez l&apos;usure (minimum 1,6 mm de profondeur de sculpture) et l&apos;usure uniforme (une usure irrégulière peut indiquer un problème de géométrie).</li>
              <li><strong>Moteur :</strong> À froid, vérifiez le niveau d&apos;huile, le liquide de refroidissement, et recherchez les fuites. Au démarrage, écoutez les bruits anormaux.</li>
              <li><strong>Habitacle :</strong> Testez tous les équipements : climatisation, vitres électriques, autoradio, GPS, sièges chauffants.</li>
              <li><strong>Essai routier :</strong> Testez en ville et sur route. Vérifiez la direction, le freinage, la boîte de vitesses et écoutez les bruits suspects.</li>
            </ul>

            <h2>3. Les Documents Obligatoires</h2>
            <p>
              Lors de la vente d&apos;un véhicule d&apos;occasion, le vendeur doit obligatoirement fournir :
            </p>
            <ul>
              <li>La carte grise (certificat d&apos;immatriculation) barrée avec la mention &quot;Vendu le [date]&quot; et signée</li>
              <li>Le certificat de situation administrative (non-gage) de moins de 15 jours</li>
              <li>Le contrôle technique de moins de 6 mois (pour les véhicules de plus de 4 ans)</li>
              <li>Le certificat de cession (formulaire Cerfa n°15776*02) en 2 exemplaires</li>
              <li>Le procès-verbal du contrôle technique</li>
            </ul>

            <h2>4. Les Pièges à Éviter</h2>
            <ul>
              <li><strong>Le compteur trafiqué :</strong> Comparez le kilométrage avec l&apos;historique des contrôles techniques et les factures d&apos;entretien.</li>
              <li><strong>Le vice caché :</strong> Faites inspecter le véhicule par un mécanicien indépendant en cas de doute.</li>
              <li><strong>Le prix trop bas :</strong> Un prix nettement inférieur au marché cache souvent un problème (accident, mécanique défaillante).</li>
              <li><strong>Les frais cachés :</strong> Chez un professionnel, le prix affiché doit être TTC. Vérifiez les frais de mise à la route et de carte grise.</li>
              <li><strong>L&apos;arnaque à distance :</strong> Ne versez jamais d&apos;acompte sans avoir vu le véhicule. Méfiez-vous des prix irréalistes et des vendeurs pressés.</li>
            </ul>

            <h2>5. L&apos;Art de la Négociation</h2>
            <p>
              La négociation fait partie de l&apos;achat d&apos;occasion. Appuyez-vous sur des éléments concrets :
              défauts constatés lors de l&apos;inspection, comparaison avec les prix du marché (Argus, La Centrale),
              travaux à prévoir (pneus, freins, distribution). Une marge de négociation de 5 à 10 % est
              généralement réaliste.
            </p>

            <h2>6. Pourquoi Acheter chez un Professionnel ?</h2>
            <p>
              Acheter chez un professionnel comme Activ Automobiles offre des avantages significatifs par rapport
              à un particulier :
            </p>
            <ul>
              <li><strong>Garantie légale :</strong> Minimum 6 mois de garantie, extensible jusqu&apos;à 24 mois chez Activ Automobiles</li>
              <li><strong>Véhicule révisé :</strong> Chaque véhicule est inspecté et préparé selon un protocole rigoureux</li>
              <li><strong>Financement facilité :</strong> Solutions de crédit, LOA et LLD directement en agence</li>
              <li><strong>Service après-vente :</strong> Un interlocuteur dédié pour vous accompagner après l&apos;achat</li>
              <li><strong>Reprise de votre ancien véhicule :</strong> Estimation gratuite et immédiate</li>
            </ul>

            <div className="not-prose bg-[#1A3F6F]/5 border border-[#1A3F6F]/20 rounded-2xl p-8 my-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Prêt à trouver votre prochaine voiture ?</h3>
              <p className="text-slate-600 mb-4">
                Consultez notre catalogue de véhicules d&apos;occasion contrôlés et garantis dans nos 6 agences en France.
              </p>
              <Link
                href="/voitures-occasion"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #1A3F6F 0%, #143260 100%)' }}
              >
                Voir nos véhicules
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
