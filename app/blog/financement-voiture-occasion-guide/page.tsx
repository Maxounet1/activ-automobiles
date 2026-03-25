import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Clock, User, Calendar } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/utils';

const TITLE = "Financer sa Voiture d'Occasion : LOA, Crédit, LLD — Le Guide Complet";
const DESCRIPTION = "Crédit auto, LOA, LLD : découvrez toutes les solutions de financement pour votre voiture d'occasion. Comparatif, avantages et conseils pour choisir.";
const SLUG = 'financement-voiture-occasion-guide';
const PUBLISHED = '2026-01-25';
const READ_TIME = 9;

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

export default function FinancementGuidePage() {
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
              <li className="font-semibold" style={{ color: '#475569' }}>Guide financement</li>
            </ol>
          </div>
        </nav>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-10">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ color: '#0F766E', background: 'rgba(15,118,110,0.08)', border: '1px solid rgba(15,118,110,0.18)' }}
            >
              Financement
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              {TITLE}
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-6">{DESCRIPTION}</p>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><User size={14} /> Équipe Activ Automobiles</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 25 janvier 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {READ_TIME} min de lecture</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-slate prose-lg max-w-none">
            <p>
              Financer l&apos;achat d&apos;une voiture d&apos;occasion n&apos;a jamais offert autant de possibilités.
              Crédit classique, LOA (Location avec Option d&apos;Achat), LLD (Location Longue Durée)... chaque
              solution a ses avantages selon votre situation. Ce guide vous aide à comprendre et comparer
              ces options pour faire le choix le plus adapté à votre budget et vos besoins.
            </p>

            <h2>1. Le Crédit Auto Classique</h2>
            <p>
              Le crédit auto est la solution la plus répandue pour financer un véhicule d&apos;occasion.
              Vous empruntez une somme fixe remboursée en mensualités sur une durée déterminée (12 à 84 mois).
              À la fin du crédit, vous êtes propriétaire du véhicule.
            </p>
            <h3>Avantages</h3>
            <ul>
              <li>Vous êtes propriétaire dès l&apos;achat (la carte grise est à votre nom)</li>
              <li>Pas de limitation de kilométrage</li>
              <li>Liberté totale : revente, modification, usage intensif</li>
              <li>Taux d&apos;intérêt généralement compétitifs (3 à 6 % en 2026)</li>
              <li>Possibilité de remboursement anticipé</li>
            </ul>
            <h3>Inconvénients</h3>
            <ul>
              <li>Mensualités plus élevées qu&apos;en LOA (pas de valeur résiduelle reportée)</li>
              <li>Apport souvent recommandé (10 à 20 % du prix)</li>
              <li>Vous supportez la dépréciation du véhicule</li>
            </ul>

            <h2>2. La LOA (Location avec Option d&apos;Achat)</h2>
            <p>
              La LOA, aussi appelée leasing, vous permet de louer un véhicule avec la possibilité de l&apos;acheter
              en fin de contrat en levant l&apos;option d&apos;achat. Les mensualités sont calculées sur la différence
              entre le prix d&apos;achat et la valeur résiduelle estimée du véhicule.
            </p>
            <h3>Avantages</h3>
            <ul>
              <li>Mensualités réduites par rapport au crédit (30 à 40 % inférieures)</li>
              <li>Premier loyer majoré réduit (souvent équivalent à un petit apport)</li>
              <li>Flexibilité en fin de contrat : acheter, rendre ou changer de véhicule</li>
              <li>Entretien et garantie souvent inclus dans les offres</li>
              <li>Idéal pour changer de voiture tous les 3-4 ans</li>
            </ul>
            <h3>Inconvénients</h3>
            <ul>
              <li>Kilométrage limité (pénalités en cas de dépassement, typiquement 0,10 à 0,15 €/km)</li>
              <li>Le véhicule ne vous appartient pas pendant la durée du contrat</li>
              <li>Obligation de maintenir le véhicule en bon état (restitution)</li>
              <li>Coût total souvent supérieur au crédit si vous levez l&apos;option</li>
            </ul>

            <h2>3. La LLD (Location Longue Durée)</h2>
            <p>
              La LLD est une location pure : vous payez un loyer mensuel pour l&apos;usage du véhicule,
              sans possibilité de l&apos;acheter en fin de contrat. C&apos;est la solution &quot;tout compris&quot; par
              excellence, particulièrement prisée des professionnels.
            </p>
            <h3>Avantages</h3>
            <ul>
              <li>Mensualités les plus basses des trois options</li>
              <li>Budget maîtrisé : assurance, entretien et assistance souvent inclus</li>
              <li>Aucun souci de revente</li>
              <li>Changement de véhicule facile en fin de contrat</li>
            </ul>
            <h3>Inconvénients</h3>
            <ul>
              <li>Impossible de devenir propriétaire</li>
              <li>Kilométrage strictement limité</li>
              <li>Engagement sur la durée du contrat (résiliation coûteuse)</li>
              <li>Moins disponible sur le marché de l&apos;occasion</li>
            </ul>

            {/* Tableau comparatif */}
            <div className="not-prose overflow-x-auto my-8">
              <table className="w-full text-sm border-collapse rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
                <thead>
                  <tr style={{ background: '#0F766E', color: '#fff' }}>
                    <th className="px-4 py-3 text-left font-bold">Critère</th>
                    <th className="px-4 py-3 text-center font-bold">Crédit Auto</th>
                    <th className="px-4 py-3 text-center font-bold">LOA</th>
                    <th className="px-4 py-3 text-center font-bold">LLD</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Propriétaire', 'Oui, dès l\'achat', 'En fin de contrat (option)', 'Non'],
                    ['Mensualité (20 000 €, 48 mois)', '~440 €', '~280 €', '~250 €'],
                    ['Apport', 'Recommandé (10-20 %)', 'Premier loyer majoré', 'Aucun généralement'],
                    ['Kilométrage', 'Illimité', 'Limité (ex: 15 000 km/an)', 'Limité'],
                    ['Entretien inclus', 'Non', 'En option', 'Souvent inclus'],
                    ['Durée typique', '12-84 mois', '24-60 mois', '24-60 mois'],
                    ['Fin de contrat', 'Véhicule à vous', 'Acheter, rendre ou renouveler', 'Rendre'],
                    ['Profil idéal', 'Propriétaire long terme', 'Changement fréquent', 'Budget maîtrisé'],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      <td className="px-4 py-3 font-semibold text-slate-700">{row[0]}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{row[1]}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{row[2]}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>4. Comment Choisir la Bonne Option ?</h2>
            <p>
              Votre choix dépend essentiellement de trois critères :
            </p>
            <ul>
              <li><strong>Votre budget mensuel :</strong> Budget serré → LLD ou LOA. Budget plus large → crédit pour être propriétaire.</li>
              <li><strong>Votre projet de conservation :</strong> Garder 5+ ans → crédit. Changer tous les 3-4 ans → LOA.</li>
              <li><strong>Votre kilométrage :</strong> Plus de 20 000 km/an → crédit (pas de pénalités). Moins de 15 000 km/an → LOA ou LLD.</li>
            </ul>

            <h2>5. Conseils pour Obtenir le Meilleur Taux</h2>
            <ul>
              <li><strong>Comparez les offres :</strong> Ne vous limitez pas à votre banque. Les taux varient significativement entre établissements.</li>
              <li><strong>Soignez votre dossier :</strong> Stabilité professionnelle, absence d&apos;incidents bancaires et taux d&apos;endettement inférieur à 35 %.</li>
              <li><strong>Négociez l&apos;apport :</strong> Un apport de 20 % réduit le montant emprunté et améliore le taux proposé.</li>
              <li><strong>Choisissez la bonne durée :</strong> Plus la durée est courte, plus le taux est avantageux. Visez 48 mois pour un bon compromis.</li>
              <li><strong>Passez par un professionnel :</strong> Les concessionnaires comme Activ Automobiles négocient des taux préférentiels avec leurs partenaires bancaires.</li>
            </ul>

            <h2>6. Le Financement chez Activ Automobiles</h2>
            <p>
              Chez Activ Automobiles, nous travaillons avec plusieurs partenaires bancaires pour vous proposer
              la solution la plus adaptée. Notre service financement vous accompagne de A à Z :
            </p>
            <ul>
              <li>Simulation gratuite et sans engagement</li>
              <li>Étude personnalisée de votre dossier</li>
              <li>Mise en concurrence des banques partenaires</li>
              <li>Réponse sous 24 à 48h</li>
              <li>Possibilité d&apos;intégrer l&apos;assurance et la garantie dans le financement</li>
            </ul>

            <div className="not-prose bg-[#0F766E]/5 border border-[#0F766E]/20 rounded-2xl p-8 my-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Simulez votre financement</h3>
              <p className="text-slate-600 mb-4">
                Utilisez notre simulateur en ligne pour estimer vos mensualités en quelques clics,
                ou contactez nos conseillers pour une étude personnalisée.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/financement"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #0F766E 0%, #0D5E58 100%)' }}
                >
                  Simuler mon financement
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                  style={{ border: '1.5px solid #0F766E', color: '#0F766E' }}
                >
                  Contacter un conseiller
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
