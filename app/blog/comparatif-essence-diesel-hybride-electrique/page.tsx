import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Clock, User, Calendar } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/utils';

const TITLE = 'Essence, Diesel, Hybride ou Électrique : Quel Moteur Choisir en 2026 ?';
const DESCRIPTION = "Comparatif complet des motorisations en 2026 : avantages, inconvénients, coûts d'usage, autonomie et valeur de revente pour chaque type d'énergie.";
const SLUG = 'comparatif-essence-diesel-hybride-electrique';
const PUBLISHED = '2026-01-20';
const READ_TIME = 10;

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

export default function ComparatifEnergiePage() {
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
              <li className="font-semibold" style={{ color: '#475569' }}>Comparatif énergies</li>
            </ol>
          </div>
        </nav>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-10">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ color: '#059669', background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.18)' }}
            >
              Conseils pratiques
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              {TITLE}
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-6">{DESCRIPTION}</p>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><User size={14} /> Équipe Activ Automobiles</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 20 janvier 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {READ_TIME} min de lecture</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-slate prose-lg max-w-none">
            <p>
              Le choix de la motorisation est devenu plus complexe que jamais. Entre essence, diesel, hybride
              et 100 % électrique, chaque technologie présente des avantages et inconvénients selon votre profil
              de conduite. Ce guide comparatif vous aide à faire le choix le plus adapté à votre usage quotidien.
            </p>

            {/* Tableau comparatif */}
            <div className="not-prose overflow-x-auto my-8">
              <table className="w-full text-sm border-collapse rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
                <thead>
                  <tr style={{ background: '#1A3F6F', color: '#fff' }}>
                    <th className="px-4 py-3 text-left font-bold">Critère</th>
                    <th className="px-4 py-3 text-center font-bold">Essence</th>
                    <th className="px-4 py-3 text-center font-bold">Diesel</th>
                    <th className="px-4 py-3 text-center font-bold">Hybride</th>
                    <th className="px-4 py-3 text-center font-bold">Électrique</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Prix d\'achat', '€€', '€€€', '€€€', '€€€€'],
                    ['Coût carburant/100km', '~10 €', '~8 €', '~6 €', '~3 €'],
                    ['Entretien annuel', '~800 €', '~900 €', '~700 €', '~400 €'],
                    ['Autonomie', '600-800 km', '800-1100 km', '700-900 km', '300-500 km'],
                    ['Émissions CO₂', 'Élevées', 'Moyennes', 'Faibles', 'Zéro (roulage)'],
                    ['Valeur revente', 'Bonne', 'En baisse', 'Très bonne', 'Bonne'],
                    ['Vignette Crit\'Air', '1 (récent)', '2 (récent)', '1', '0 (Vert)'],
                    ['ZFE compatible', 'Limité', 'Limité', 'Oui', 'Oui'],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                      <td className="px-4 py-3 font-semibold text-slate-700">{row[0]}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{row[1]}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{row[2]}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{row[3]}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>L&apos;Essence : le Choix Polyvalent</h2>
            <p>
              Le moteur essence reste le choix le plus accessible à l&apos;achat. Il convient parfaitement aux
              conducteurs urbains et périurbains avec un kilométrage annuel modéré (moins de 15 000 km/an).
              Les moteurs essence modernes consomment entre 5 et 7 litres aux 100 km et bénéficient d&apos;une
              mécanique simple et fiable.
            </p>
            <p>
              <strong>Idéal pour :</strong> Trajets urbains et mixtes, faible kilométrage, premier achat.
              <br />
              <strong>Points d&apos;attention :</strong> Consommation supérieure au diesel sur autoroute,
              restrictions ZFE pour les modèles Crit&apos;Air 2 et plus.
            </p>

            <h2>Le Diesel : pour les Gros Rouleurs</h2>
            <p>
              Malgré les restrictions croissantes, le diesel reste pertinent pour les conducteurs parcourant
              plus de 20 000 km par an, notamment sur autoroute. Sa consommation inférieure (4 à 6 L/100 km)
              et son couple élevé le rendent efficace pour les longs trajets et le tractage.
            </p>
            <p>
              <strong>Idéal pour :</strong> Gros kilométrage annuel, trajets autoroutiers, remorquage.
              <br />
              <strong>Points d&apos;attention :</strong> Valeur de revente en baisse progressive, restrictions ZFE
              dans les grandes agglomérations, FAP à entretenir.
            </p>

            <h2>L&apos;Hybride : le Meilleur Compromis ?</h2>
            <p>
              L&apos;hybride combine un moteur thermique et un moteur électrique. En hybride simple (HEV),
              la batterie se recharge seule grâce au freinage régénératif. En hybride rechargeable (PHEV),
              vous pouvez rouler 40 à 80 km en tout électrique en rechargeant sur secteur.
            </p>
            <p>
              L&apos;hybride rechargeable est particulièrement avantageux pour les trajets domicile-travail courts
              réalisés en mode électrique, tout en conservant l&apos;autonomie thermique pour les longs trajets.
              La consommation réelle dépend fortement de la fréquence de recharge : sans recharge régulière,
              un PHEV consomme plus qu&apos;un hybride simple en raison du poids de la batterie.
            </p>
            <p>
              <strong>Idéal pour :</strong> Usage mixte ville/route, sensibilité écologique, bonne valeur de revente.
              <br />
              <strong>Points d&apos;attention :</strong> Prix d&apos;achat supérieur, complexité mécanique accrue.
            </p>

            <h2>L&apos;Électrique : l&apos;Avenir de la Mobilité</h2>
            <p>
              Le véhicule 100 % électrique offre un confort de conduite incomparable (silence, couple instantané)
              et des coûts d&apos;usage très réduits. L&apos;autonomie des modèles récents atteint 300 à 500 km
              en conditions réelles, ce qui couvre la majorité des usages quotidiens.
            </p>
            <p>
              Le réseau de bornes de recharge rapide s&apos;est considérablement développé en France avec plus de
              130 000 points de charge publics en 2026. La recharge à domicile reste la solution la plus pratique
              et économique (environ 3 € pour 100 km contre 10 € en essence).
            </p>
            <p>
              <strong>Idéal pour :</strong> Trajets quotidiens jusqu&apos;à 300 km, recharge à domicile possible,
              sensibilité environnementale.
              <br />
              <strong>Points d&apos;attention :</strong> Prix d&apos;achat élevé (compensé par le bonus écologique
              et les économies d&apos;usage), autonomie réduite par temps froid, dépendance au réseau de recharge
              pour les longs trajets.
            </p>

            <h2>Comment Choisir ? Notre Recommandation</h2>
            <p>
              Le choix idéal dépend de trois facteurs principaux :
            </p>
            <ul>
              <li><strong>Kilométrage annuel :</strong> Moins de 15 000 km → essence ou hybride. Plus de 20 000 km → diesel ou électrique.</li>
              <li><strong>Type de trajets :</strong> Urbain → hybride ou électrique. Mixte → hybride. Autoroutier → diesel ou hybride rechargeable.</li>
              <li><strong>Budget :</strong> Budget serré → essence d&apos;occasion. Budget moyen → hybride. Investissement long terme → électrique.</li>
            </ul>

            <div className="not-prose bg-[#059669]/5 border border-[#059669]/20 rounded-2xl p-8 my-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Besoin d&apos;un conseil personnalisé ?</h3>
              <p className="text-slate-600 mb-4">
                Nos conseillers Activ Automobiles vous accompagnent pour trouver la motorisation idéale selon votre profil.
                Explorez notre catalogue par type d&apos;énergie.
              </p>
              <Link
                href="/voitures-occasion"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
              >
                Explorer par énergie
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
