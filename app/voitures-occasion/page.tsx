import type { Metadata } from 'next';
import { getAllVehicles } from '@/repository/vehicles';
import { SITE_URL } from '@/lib/utils';
import CatalogClient from './CatalogClient';

// Note: metadata is in layout.tsx

export default async function VoituresOccasionPage() {
  const vehicles = await getAllVehicles().catch(() => []);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: "Voitures d'occasion à Nancy - Activ Automobiles",
    description: 'Découvrez notre sélection de véhicules d\'occasion garantis',
    numberOfItems: vehicles.length,
    itemListElement: vehicles.slice(0, 50).map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/voitures-occasion/${v.slug}`,
      name: `${v.brand} ${v.model} ${v.year}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <CatalogClient vehicles={vehicles} />
    </>
  );
}
