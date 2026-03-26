/**
 * SpiderVO Direct XML Feed Reader
 *
 * Replaces Supabase-based vehicle queries with direct XML feed parsing.
 * Uses Next.js `unstable_cache` for caching (1-hour revalidation).
 *
 * All mapping logic is copied verbatim from scripts/sync-spidervo.ts.
 */

import { XMLParser } from 'fast-xml-parser';
import { unstable_cache } from 'next/cache';
import type { Vehicle } from '@/lib/types';

// ─── Config ────────────────────────────────────────────────────────────────────

const SPIDER_VO_URL =
  process.env.SPIDER_VO_URL ||
  'https://www.spider-vo.net/api/42446d400a5100572452215d225e07590b5f10433071174d3d3c0435090a0519012f13280b';

// ─── Mappings (copied from scripts/sync-spidervo.ts) ────────────────────────

const FUEL_MAP: Record<string, string> = {
  DIESEL: 'diesel',
  ESSENCE: 'essence',
  GPL: 'gpl',
  ELECTRIQUE: 'electrique',
  HYBRIDE: 'hybride',
  'HYBRIDE RECHARGEABLE': 'hybride-rechargeable',
  'HYBRIDE RECHARGEABLE ESSENCE': 'hybride-rechargeable',
  'HYBRIDE RECHARGEABLE DIESEL': 'hybride-rechargeable',
  'HYBRIDE ESSENCE': 'hybride',
  'HYBRIDE DIESEL': 'hybride',
  'MICRO HYBRIDE ESSENCE': 'hybride',
  'MICRO HYBRIDE DIESEL': 'hybride',
};

const BODY_MAP: Record<string, string> = {
  SUV: 'suv',
  BERLINE: 'berline',
  BREAK: 'break',
  CITADINE: 'citadine',
  COUPE: 'coupe',
  'COUPÉ': 'coupe',
  CABRIOLET: 'cabriolet',
  MONOSPACE: 'monospace',
  UTILITAIRE: 'utilitaire',
};

const TRANSMISSION_MAP: Record<string, string> = {
  A: 'automatique',
  M: 'manuelle',
};

// ─── Agency resolution (copied from scripts/sync-spidervo.ts) ───────────────

interface AgencyMatch {
  id: string;
  city: string;
}

const AGENCY_RULES: { test: (loc: string) => boolean; agency: AgencyMatch }[] = [
  {
    test: (l) => l.includes('54520') || l.toLowerCase().includes('laxou'),
    agency: { id: 'agence-nancy-laxou', city: 'Nancy-Laxou' },
  },
  {
    test: (l) => l.includes('57525') || l.toLowerCase().includes('talange'),
    agency: { id: 'agence-talange', city: 'Talange' },
  },
  {
    test: (l) =>
      l.includes('88150') ||
      l.toLowerCase().includes('chavelot') ||
      l.toLowerCase().includes('epinal') ||
      l.toLowerCase().includes('épinal'),
    agency: { id: 'agence-epinal-chavelot', city: 'Épinal-Chavelot' },
  },
  {
    test: (l) => l.includes('85150') || l.toLowerCase().includes('mothe'),
    agency: { id: 'agence-la-mothe-achard', city: 'La Mothe-Achard' },
  },
  {
    test: (l) => l.includes('33127') || l.toLowerCase().includes('bordeaux'),
    agency: { id: 'agence-bordeaux', city: 'Bordeaux' },
  },
  {
    test: (l) =>
      l.includes('35760') ||
      l.toLowerCase().includes('grégoire') ||
      l.toLowerCase().includes('gregoire') ||
      l.toLowerCase().includes('rennes'),
    agency: { id: 'agence-rennes', city: 'Rennes' },
  },
];

function resolveAgency(lieuDeStockage: string): AgencyMatch {
  for (const rule of AGENCY_RULES) {
    if (rule.test(lieuDeStockage)) return rule.agency;
  }
  const cityFromAddress = extractCityFromAddress(lieuDeStockage);
  return { id: 'agence-nancy-laxou', city: cityFromAddress || 'Nancy-Laxou' };
}

function extractCityFromAddress(address: string): string | null {
  const match = address.match(/\d{5}\s+([A-Za-zÀ-ÿ-]+)/);
  return match ? match[1] : null;
}

// ─── Slug Generation (copied from scripts/sync-spidervo.ts) ─────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateSlug(brand: string, model: string, version: string, reference: string): string {
  const parts = [brand, model, version, reference].map(slugify).filter(Boolean);
  return parts.join('-').substring(0, 200);
}

// ─── Capitalize (copied from scripts/sync-spidervo.ts) ──────────────────────

function capitalizeBrand(brand: string): string {
  if (!brand) return '';
  return brand
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('-');
}

function capitalizeModel(model: string): string {
  if (!model) return '';
  return model.charAt(0).toUpperCase() + model.slice(1);
}

// ─── XML types ──────────────────────────────────────────────────────────────

interface SpiderVOVehicle {
  reference: string;
  marque: string;
  modele: string;
  version: string;
  energie: string;
  carrosserie: string;
  typeboite: string;
  anneemodele: number | string;
  kilometrage: number | string;
  prixttcaffiche: number | string;
  prix_marchand: number | string;
  couleurexterieur: string;
  puissancedyn: number | string;
  nbrporte: number | string;
  nbrplace: number | string;
  emissions_co2: number | string;
  dureegarantie: number | string;
  nbrmain: number | string;
  datemes: string;
  immat: string;
  vin: string;
  lieu_de_stockage: string;
  disponibilite: string;
  type_dossier: string;
  lien: string;
  description: string;
  options: { option: string | string[] } | string;
  equipements: { equipement: string | string[] } | string;
  photos: { photo: string | string[] } | string;
}

// ─── Parsing helpers (copied from scripts/sync-spidervo.ts) ─────────────────

function parseOptions(raw: SpiderVOVehicle['options'] | SpiderVOVehicle['equipements']): string[] {
  if (!raw || typeof raw === 'string') return [];
  const items =
    'option' in raw ? raw.option : 'equipement' in raw ? (raw as { equipement: string | string[] }).equipement : [];
  if (!items) return [];
  return Array.isArray(items) ? items.filter(Boolean) : [items].filter(Boolean);
}

function parsePhotos(raw: SpiderVOVehicle['photos']): string[] {
  if (!raw || typeof raw === 'string') return [];
  const items = raw.photo;
  if (!items) return [];
  return Array.isArray(items) ? items.filter(Boolean) : [items].filter(Boolean);
}

function str(v: unknown): string {
  if (v == null) return '';
  return String(v).trim();
}

function num(v: unknown, fallback = 0): number {
  const n = Number(v);
  return isNaN(n) ? fallback : n;
}

// ─── Map SpiderVO vehicle → Vehicle (app type) ─────────────────────────────

function mapVehicle(v: SpiderVOVehicle): Vehicle {
  const reference = str(v.reference);
  const brand = capitalizeBrand(str(v.marque));
  const model = capitalizeModel(str(v.modele));
  const version = str(v.version);
  const year = num(v.anneemodele, new Date().getFullYear());
  const mileage = num(v.kilometrage);
  const price = num(v.prixttcaffiche);
  const monthlyPrice = price > 0 ? Math.round(price / 48) : undefined;

  const fuelRaw = str(v.energie).toUpperCase();
  const fuel = FUEL_MAP[fuelRaw] || 'essence';

  const bodyRaw = str(v.carrosserie).toUpperCase();
  const bodyType = BODY_MAP[bodyRaw] || 'berline';

  const transRaw = str(v.typeboite).toUpperCase();
  const transmission = TRANSMISSION_MAP[transRaw] || 'manuelle';

  const lieuDeStockage = str(v.lieu_de_stockage);
  const { id: agencyId, city: agencyCity } = resolveAgency(lieuDeStockage);

  const photos = parsePhotos(v.photos);
  const images = photos.map((url) => ({
    url,
    alt: `${brand} ${model} ${year}`,
    width: 800,
    height: 600,
  }));

  // Merge options + equipements, deduplicate
  const opts = parseOptions(v.options);
  const equips = parseOptions(v.equipements);
  const allOptions = Array.from(new Set([...opts, ...equips]));

  const dispo = str(v.disponibilite);
  const typeDossier = str(v.type_dossier);
  const available = dispo === 's00' && typeDossier === 'Stock';

  const slug = generateSlug(brand, model, version, reference);

  const id = `spidervo-${reference}`;

  const description = str(v.description) || `${brand} ${model} ${version} - ${year} - ${mileage} km`;

  const now = new Date().toISOString();

  return {
    id,
    slug,
    brand,
    model,
    version,
    year,
    mileage,
    price,
    monthlyPrice,
    fuel: fuel as Vehicle['fuel'],
    transmission: transmission as Vehicle['transmission'],
    bodyType: bodyType as Vehicle['bodyType'],
    condition: 'occasion' as Vehicle['condition'],
    color: str(v.couleurexterieur) || 'Non spécifié',
    doors: num(v.nbrporte, 5),
    seats: num(v.nbrplace, 5),
    power: num(v.puissancedyn, 0),
    co2: num(v.emissions_co2, 0),
    description,
    images,
    agencyId: agencyId,
    agencyCity: agencyCity,
    available,
    featured: false,
    createdAt: now,
    updatedAt: now,
    options: allOptions,
    vin: str(v.vin),
    dtp: str(v.immat),
  };
}

// ─── Fetch and parse the feed ───────────────────────────────────────────────

async function fetchAndParseSpiderVOFeed(): Promise<Vehicle[]> {
  console.log('[spidervo-data] Fetching SpiderVO XML feed...');

  // SpiderVO XML is ~8MB and can take 15-20s to respond
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55000); // 55s timeout (Vercel allows 60s)

  let resp: Response;
  try {
    resp = await fetch(SPIDER_VO_URL, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    console.error(`[spidervo-data] Fetch failed:`, err);
    return [];
  }
  clearTimeout(timeout);

  if (!resp.ok) {
    console.error(`[spidervo-data] Failed to fetch feed: HTTP ${resp.status}`);
    return [];
  }

  const xml = await resp.text();
  console.log(`[spidervo-data] Received ${(xml.length / 1024 / 1024).toFixed(1)} MB`);

  const parser = new XMLParser({
    ignoreAttributes: true,
    parseTagValue: false,
    trimValues: true,
    processEntities: false,
  });

  const parsed = parser.parse(xml);
  const vehiculesRaw = parsed?.vehicules?.vehicule;

  if (!vehiculesRaw) {
    console.error('[spidervo-data] No <vehicule> elements found in XML');
    return [];
  }

  const vehicules: SpiderVOVehicle[] = Array.isArray(vehiculesRaw) ? vehiculesRaw : [vehiculesRaw];

  const vehicles: Vehicle[] = [];
  for (const v of vehicules) {
    try {
      const mapped = mapVehicle(v);
      // Skip vehicles with no price
      if (mapped.price <= 0) continue;
      vehicles.push(mapped);
    } catch (err) {
      console.warn(`[spidervo-data] Error mapping vehicle ${str(v.reference)}: ${err}`);
    }
  }

  console.log(`[spidervo-data] Parsed ${vehicles.length} vehicles from feed`);
  return vehicles;
}

// ─── Cached export ──────────────────────────────────────────────────────────

export const getSpiderVOVehicles = unstable_cache(
  fetchAndParseSpiderVOFeed,
  ['spidervo-vehicles-v2'],
  { revalidate: 3600 }
);
