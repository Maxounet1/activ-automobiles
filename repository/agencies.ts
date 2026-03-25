import type { Agency } from '@/lib/types';

/**
 * Hardcoded agency data from scripts/setup-all-tables.sql seed.
 * Replaces Supabase queries since the agencies table doesn't exist.
 */
const AGENCIES: Agency[] = [
  {
    id: 'agence-nancy-laxou',
    slug: 'nancy-laxou',
    name: 'Activ Automobiles Nancy-Laxou',
    city: 'Nancy-Laxou',
    address: '12 Rue du Saintois',
    zipCode: '54520',
    phone: '03 83 97 97 97',
    email: 'Laxou@activ-automobiles.com',
    description:
      "Bienvenue chez Activ Automobiles Nancy-Laxou, votre spécialiste de la vente de véhicules d'occasion premium dans la région Grand Est.",
    image: '/LaxouS.webp',
    lat: 48.6847,
    lng: 6.1464,
    openingHours: [
      { day: 'Lundi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Mardi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Mercredi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Jeudi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Vendredi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Samedi', hours: '09h00 - 12h00 / 14h00 - 18h00' },
      { day: 'Dimanche', hours: 'Fermé' },
    ],
    services: [
      "Vente de véhicules d'occasion",
      'Financement et crédit auto',
      'Reprise de votre véhicule',
      'Garantie minimum 12 mois',
      'Préparation esthétique',
      'Livraison à domicile',
      'Extension de garantie',
    ],
    rating: 4.6,
    reviewCount: 643,
  },
  {
    id: 'agence-talange',
    slug: 'talange',
    name: 'Activ Automobiles Talange',
    city: 'Talange',
    address: 'Rue du Pré le Loop',
    zipCode: '57525',
    phone: '03 87 73 73 73',
    email: 'Talange@activ-automobiles.com',
    description:
      'Activ Automobiles Talange vous accueille dans son showroom moderne en Moselle.',
    image: '/TalangeS.webp',
    lat: 49.2833,
    lng: 6.1697,
    openingHours: [
      { day: 'Lundi', hours: '10h00 - 19h00' },
      { day: 'Mardi', hours: '10h00 - 19h00' },
      { day: 'Mercredi', hours: '10h00 - 19h00' },
      { day: 'Jeudi', hours: '10h00 - 19h00' },
      { day: 'Vendredi', hours: '10h00 - 19h00' },
      { day: 'Samedi', hours: '10h00 - 18h00' },
      { day: 'Dimanche', hours: 'Fermé' },
    ],
    services: [
      "Vente de véhicules d'occasion",
      'Financement et leasing',
      'Reprise de votre véhicule',
      'Garantie minimum 12 mois',
    ],
    rating: 4.7,
    reviewCount: 559,
  },
  {
    id: 'agence-epinal-chavelot',
    slug: 'epinal-chavelot',
    name: 'Activ Automobiles Épinal-Chavelot',
    city: 'Épinal-Chavelot',
    address: "22 Rue d'Épinal",
    zipCode: '88150',
    phone: '03 29 99 09 99',
    email: 'Epinal@activ-automobiles.com',
    description:
      "Activ Automobiles Épinal-Chavelot est votre référence pour l'achat d'un véhicule d'occasion de qualité dans les Vosges.",
    image: '/EpinalS.webp',
    lat: 48.1778,
    lng: 6.4286,
    openingHours: [
      { day: 'Lundi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Mardi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Mercredi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Jeudi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Vendredi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Samedi', hours: '09h00 - 12h00 / 14h00 - 18h00' },
      { day: 'Dimanche', hours: 'Fermé' },
    ],
    services: [
      "Vente de véhicules d'occasion",
      'Financement personnalisé',
      'Reprise et estimation gratuite',
    ],
    rating: 4.7,
    reviewCount: 343,
  },
  {
    id: 'agence-la-mothe-achard',
    slug: 'la-mothe-achard',
    name: 'Activ Automobiles La Mothe-Achard',
    city: 'La Mothe-Achard',
    address: '3 Rue Michel Breton',
    zipCode: '85150',
    phone: '02 19 08 01 10',
    email: 'Lamotheachard@activ-automobiles.com',
    description:
      'Activ Automobiles La Mothe-Achard vous accueille en Vendée, à deux pas des Achards.',
    image: '/LamotheachardS.webp',
    lat: 46.6167,
    lng: -1.65,
    openingHours: [
      { day: 'Lundi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Mardi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Mercredi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Jeudi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Vendredi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Samedi', hours: '09h00 - 12h00 / 14h00 - 18h00' },
      { day: 'Dimanche', hours: 'Fermé' },
    ],
    services: [
      "Vente de véhicules d'occasion",
      'Financement et crédit auto',
      'Reprise de votre véhicule',
    ],
    rating: 4.6,
    reviewCount: 234,
  },
  {
    id: 'agence-bordeaux',
    slug: 'bordeaux',
    name: 'Activ Automobiles Bordeaux',
    city: 'Bordeaux',
    address: '82 Rue Marie Curie',
    zipCode: '33127',
    phone: '05 18 25 14 94',
    email: 'Bordeaux@activ-automobiles.com',
    description:
      "Activ Automobiles Bordeaux vous accueille à Saint-Jean-d'Illac, à proximité de Bordeaux.",
    image: '/BordeauxS.webp',
    lat: 44.8135,
    lng: -0.8517,
    openingHours: [
      { day: 'Lundi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Mardi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Mercredi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Jeudi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Vendredi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Samedi', hours: '09h00 - 12h00 / 14h00 - 18h00' },
      { day: 'Dimanche', hours: 'Fermé' },
    ],
    services: [
      "Vente de véhicules d'occasion",
      'Financement personnalisé',
      'Reprise et estimation gratuite',
    ],
    rating: 4.6,
    reviewCount: 204,
  },
  {
    id: 'agence-rennes',
    slug: 'rennes',
    name: 'Activ Automobiles Rennes',
    city: 'Rennes',
    address: 'ZA La Brosse',
    zipCode: '35760',
    phone: '02 19 08 01 09',
    email: 'Rennes@activ-automobiles.com',
    description:
      'Activ Automobiles Rennes vous accueille à Saint-Grégoire, au nord de Rennes.',
    image: '/RennesS.webp',
    lat: 48.1536,
    lng: -1.6668,
    openingHours: [
      { day: 'Lundi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Mardi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Mercredi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Jeudi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Vendredi', hours: '09h00 - 12h00 / 14h00 - 19h00' },
      { day: 'Samedi', hours: '09h00 - 12h00 / 14h00 - 18h00' },
      { day: 'Dimanche', hours: 'Fermé' },
    ],
    services: [
      "Vente de véhicules d'occasion",
      'Financement et leasing',
      'Reprise de votre véhicule',
    ],
    rating: 4.9,
    reviewCount: 94,
  },
];

export async function getAllAgencies(): Promise<Agency[]> {
  return AGENCIES.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAgencyBySlug(slug: string): Promise<Agency | null> {
  return AGENCIES.find((a) => a.slug === slug) ?? null;
}

export async function getAgencyById(id: string): Promise<Agency | null> {
  return AGENCIES.find((a) => a.id === id) ?? null;
}

export async function getAllAgencyCities(): Promise<string[]> {
  return AGENCIES.map((a) => a.city);
}
