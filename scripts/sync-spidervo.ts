/**
 * SpiderVO → Supabase Sync Script
 *
 * Fetches the SpiderVO XML feed, parses vehicles, maps fields to the
 * Supabase `vehicles` table schema, and upserts them.
 *
 * Usage:
 *   npx tsx scripts/sync-spidervo.ts
 *
 * Environment variables (loaded from .env):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   SPIDER_VO_URL
 */

import { XMLParser } from 'fast-xml-parser';

// ─── Config ────────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SPIDER_VO_URL =
  process.env.SPIDER_VO_URL ||
  'https://www.spider-vo.net/api/42446d400a5100572452215d225e07590b5f10433071174d3d3c0435090a0519012f13280b';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

// ─── Mappings ──────────────────────────────────────────────────────────────────

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

/**
 * Map lieu_de_stockage (or parts of it) to an agency_id and city.
 */
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
    test: (l) => l.includes('88150') || l.toLowerCase().includes('chavelot') || l.toLowerCase().includes('epinal') || l.toLowerCase().includes('épinal'),
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
    test: (l) => l.includes('35760') || l.toLowerCase().includes('grégoire') || l.toLowerCase().includes('gregoire') || l.toLowerCase().includes('rennes'),
    agency: { id: 'agence-rennes', city: 'Rennes' },
  },
];

function resolveAgency(lieuDeStockage: string): AgencyMatch {
  for (const rule of AGENCY_RULES) {
    if (rule.test(lieuDeStockage)) return rule.agency;
  }
  // Fallback: try to extract city from the address pattern
  const cityFromAddress = extractCityFromAddress(lieuDeStockage);
  return { id: 'agence-nancy-laxou', city: cityFromAddress || 'Nancy-Laxou' };
}

function extractCityFromAddress(address: string): string | null {
  // Pattern: "12 Rue du Saintois 54520 Laxou 75"
  // Extract the word after the 5-digit postal code
  const match = address.match(/\d{5}\s+([A-Za-zÀ-ÿ-]+)/);
  return match ? match[1] : null;
}

// ─── Slug Generation ───────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9\s-]/g, '')     // remove special chars
    .replace(/\s+/g, '-')             // spaces → dashes
    .replace(/-+/g, '-')              // collapse dashes
    .replace(/^-|-$/g, '');           // trim dashes
}

function generateSlug(brand: string, model: string, version: string, reference: string): string {
  const parts = [brand, model, version, reference].map(slugify).filter(Boolean);
  return parts.join('-').substring(0, 200); // safety limit
}

// ─── Capitalize brand name ─────────────────────────────────────────────────────

function capitalizeBrand(brand: string): string {
  if (!brand) return '';
  // Handle hyphenated brands like "land-rover"
  return brand
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('-');
}

function capitalizeModel(model: string): string {
  if (!model) return '';
  return model.charAt(0).toUpperCase() + model.slice(1);
}

// ─── XML Parsing ───────────────────────────────────────────────────────────────

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

function parseOptions(raw: SpiderVOVehicle['options'] | SpiderVOVehicle['equipements']): string[] {
  if (!raw || typeof raw === 'string') return [];
  const items = 'option' in raw ? raw.option : ('equipement' in raw ? (raw as any).equipement : []);
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

// ─── Map SpiderVO vehicle → Supabase row ───────────────────────────────────────

interface SupabaseVehicleRow {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  price: number;
  monthly_price: number | null;
  fuel: string;
  transmission: string;
  body_type: string;
  condition: string;
  color: string;
  doors: number;
  seats: number;
  power: number;
  co2: number;
  description: string;
  images: { url: string; alt: string; width: number; height: number }[];
  agency_id: string;
  agency_city: string;
  available: boolean;
  featured: boolean;
  options: string[];
  vin: string;
  dtp: string;
  spider_vo_ref: string;
  updated_at: string;
}

function mapVehicle(v: SpiderVOVehicle): SupabaseVehicleRow {
  const reference = str(v.reference);
  const brand = capitalizeBrand(str(v.marque));
  const model = capitalizeModel(str(v.modele));
  const version = str(v.version);
  const year = num(v.anneemodele, new Date().getFullYear());
  const mileage = num(v.kilometrage);
  const price = num(v.prixttcaffiche);
  const monthlyPrice = price > 0 ? Math.round(price / 48) : null;

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

  // Use the SpiderVO reference as the primary key
  const id = `spidervo-${reference}`;

  const description = str(v.description) || `${brand} ${model} ${version} - ${year} - ${mileage} km`;

  return {
    id,
    slug,
    brand,
    model,
    version,
    year,
    mileage,
    price,
    monthly_price: monthlyPrice,
    fuel,
    transmission,
    body_type: bodyType,
    condition: 'occasion',
    color: str(v.couleurexterieur) || 'Non spécifié',
    doors: num(v.nbrporte, 5),
    seats: num(v.nbrplace, 5),
    power: num(v.puissancedyn, 0),
    co2: num(v.emissions_co2, 0),
    description,
    images,
    agency_id: agencyId,
    agency_city: agencyCity,
    available,
    featured: false,
    options: allOptions,
    vin: str(v.vin),
    dtp: str(v.immat),
    spider_vo_ref: reference,
    updated_at: new Date().toISOString(),
  };
}

// ─── Supabase REST helpers ─────────────────────────────────────────────────────

async function supabaseRequest(
  path: string,
  options: {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
  } = {},
): Promise<Response> {
  const { method = 'GET', body, headers = {} } = options;
  const url = `${SUPABASE_URL}${path}`;
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

async function checkTableExists(): Promise<boolean> {
  const resp = await supabaseRequest('/rest/v1/vehicles?limit=0');
  if (resp.ok) return true;
  const data = await resp.json().catch(() => null);
  if (data?.code === 'PGRST205') return false;
  return false;
}

/**
 * Create the vehicles table + spider_vo_ref via Supabase SQL editor API.
 * This uses the management API — it may not be available with just the anon key.
 * If it fails, we output the SQL to run manually.
 */
async function ensureTableExists(): Promise<boolean> {
  const exists = await checkTableExists();
  if (exists) {
    console.log('✅ Table `vehicles` exists');
    return true;
  }

  console.log('⚠️  Table `vehicles` does not exist. Attempting to create...');

  const createSQL = `
    CREATE TABLE IF NOT EXISTS vehicles (
      id text PRIMARY KEY,
      slug text UNIQUE NOT NULL,
      brand text NOT NULL,
      model text NOT NULL,
      version text NOT NULL,
      year integer NOT NULL,
      mileage integer NOT NULL,
      price integer NOT NULL,
      monthly_price integer,
      fuel text NOT NULL,
      transmission text NOT NULL,
      body_type text NOT NULL,
      condition text NOT NULL DEFAULT 'occasion',
      color text NOT NULL,
      doors integer NOT NULL,
      seats integer NOT NULL,
      power integer NOT NULL,
      co2 integer NOT NULL DEFAULT 0,
      description text NOT NULL,
      images jsonb NOT NULL DEFAULT '[]'::jsonb,
      agency_id text NOT NULL,
      agency_city text NOT NULL,
      available boolean NOT NULL DEFAULT true,
      featured boolean NOT NULL DEFAULT false,
      options text[] NOT NULL DEFAULT '{}'::text[],
      vin text,
      dtp text,
      spider_vo_ref text,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_vehicles_spider_vo_ref ON vehicles(spider_vo_ref) WHERE spider_vo_ref IS NOT NULL;
    CREATE INDEX IF NOT EXISTS idx_vehicles_slug ON vehicles(slug);
    CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON vehicles(brand);
    CREATE INDEX IF NOT EXISTS idx_vehicles_fuel ON vehicles(fuel);
    CREATE INDEX IF NOT EXISTS idx_vehicles_price ON vehicles(price);
    CREATE INDEX IF NOT EXISTS idx_vehicles_agency_id ON vehicles(agency_id);
    CREATE INDEX IF NOT EXISTS idx_vehicles_available ON vehicles(available);
    CREATE INDEX IF NOT EXISTS idx_vehicles_featured ON vehicles(featured);

    ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

    -- Public read access
    DO $$ BEGIN
      CREATE POLICY "Vehicles are viewable by everyone"
        ON vehicles FOR SELECT TO public USING (true);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    -- Allow anon to insert (for sync script)
    DO $$ BEGIN
      CREATE POLICY "Anon can insert vehicles"
        ON vehicles FOR INSERT TO anon WITH CHECK (true);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    -- Allow anon to update (for sync script)
    DO $$ BEGIN
      CREATE POLICY "Anon can update vehicles"
        ON vehicles FOR UPDATE TO anon USING (true) WITH CHECK (true);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `;

  // Try the exec_sql RPC
  const rpcResp = await supabaseRequest('/rest/v1/rpc/exec_sql', {
    method: 'POST',
    body: { query: createSQL },
  });

  if (rpcResp.ok) {
    console.log('✅ Table created via exec_sql RPC');
    return true;
  }

  // Try the SQL Management API (only works with service_role key or Supabase dashboard)
  console.error('');
  console.error('╔══════════════════════════════════════════════════════════════╗');
  console.error('║  The vehicles table does not exist and cannot be created    ║');
  console.error('║  automatically with the anon key.                          ║');
  console.error('║                                                            ║');
  console.error('║  Please run the following SQL in the Supabase SQL Editor:  ║');
  console.error('╚══════════════════════════════════════════════════════════════╝');
  console.error('');
  console.error(createSQL);
  console.error('');
  return false;
}

/**
 * Check if the spider_vo_ref column exists by trying to select it.
 */
async function checkSpiderVoRefColumn(): Promise<boolean> {
  const resp = await supabaseRequest('/rest/v1/vehicles?select=spider_vo_ref&limit=0');
  return resp.ok;
}

/**
 * Try to add spider_vo_ref column if it doesn't exist.
 */
async function ensureSpiderVoRefColumn(): Promise<boolean> {
  const has = await checkSpiderVoRefColumn();
  if (has) return true;

  console.log('⚠️  Column `spider_vo_ref` not found. Attempting to add...');

  const addColSQL = `
    ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS spider_vo_ref text;
    CREATE UNIQUE INDEX IF NOT EXISTS idx_vehicles_spider_vo_ref ON vehicles(spider_vo_ref) WHERE spider_vo_ref IS NOT NULL;
  `;

  const rpcResp = await supabaseRequest('/rest/v1/rpc/exec_sql', {
    method: 'POST',
    body: { query: addColSQL },
  });

  if (rpcResp.ok) {
    console.log('✅ Column spider_vo_ref added');
    return true;
  }

  console.warn('⚠️  Could not add spider_vo_ref column. Will use VIN as upsert key instead.');
  return false;
}

// ─── Upsert Logic ──────────────────────────────────────────────────────────────

async function upsertBatch(
  rows: SupabaseVehicleRow[],
  onConflictColumn: string,
): Promise<{ inserted: number; errors: string[] }> {
  const errors: string[] = [];
  let inserted = 0;

  // Supabase REST API supports upsert via POST with Prefer: resolution=merge-duplicates
  // and on_conflict query param
  const batchSize = 50;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const resp = await supabaseRequest(
      `/rest/v1/vehicles?on_conflict=${onConflictColumn}`,
      {
        method: 'POST',
        body: batch,
        headers: {
          Prefer: 'resolution=merge-duplicates',
        },
      },
    );

    if (resp.ok) {
      inserted += batch.length;
      process.stdout.write(`  ✓ Upserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(rows.length / batchSize)} (${batch.length} vehicles)\n`);
    } else {
      const errorBody = await resp.text();
      errors.push(`Batch ${Math.floor(i / batchSize) + 1}: HTTP ${resp.status} — ${errorBody}`);
      console.error(`  ✗ Error batch ${Math.floor(i / batchSize) + 1}: ${resp.status} — ${errorBody.substring(0, 200)}`);
    }
  }

  return { inserted, errors };
}

/**
 * Mark vehicles as unavailable if they are no longer in the feed.
 */
async function markRemovedAsUnavailable(currentRefs: Set<string>, useSpiderVoRef: boolean): Promise<number> {
  // Get all existing SpiderVO vehicles
  const field = useSpiderVoRef ? 'spider_vo_ref' : 'id';
  const prefix = useSpiderVoRef ? '' : 'spidervo-';
  const resp = await supabaseRequest(`/rest/v1/vehicles?select=${field},available&available=eq.true`);

  if (!resp.ok) {
    console.warn('  Could not fetch existing vehicles to mark as unavailable');
    return 0;
  }

  const existing: Record<string, unknown>[] = await resp.json();
  let markedCount = 0;

  for (const row of existing) {
    const ref = useSpiderVoRef ? str(row.spider_vo_ref) : str(row.id).replace('spidervo-', '');
    if (!ref) continue;

    // Only check vehicles that came from SpiderVO
    if (!useSpiderVoRef && !str(row.id).startsWith('spidervo-')) continue;

    if (!currentRefs.has(ref)) {
      const updateField = useSpiderVoRef ? 'spider_vo_ref' : 'id';
      const updateValue = useSpiderVoRef ? ref : `spidervo-${ref}`;
      const updateResp = await supabaseRequest(
        `/rest/v1/vehicles?${updateField}=eq.${encodeURIComponent(updateValue)}`,
        {
          method: 'PATCH',
          body: { available: false, updated_at: new Date().toISOString() },
        },
      );
      if (updateResp.ok) markedCount++;
    }
  }

  return markedCount;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚗 SpiderVO → Supabase Sync');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Feed URL: ${SPIDER_VO_URL}`);
  console.log(`Supabase: ${SUPABASE_URL}`);
  console.log('');

  // 1. Ensure table exists
  const tableOk = await ensureTableExists();
  if (!tableOk) {
    console.error('❌ Cannot proceed without the vehicles table. Please create it first.');
    process.exit(1);
  }

  // 2. Check if spider_vo_ref column exists
  const hasSpiderVoRef = await ensureSpiderVoRefColumn();
  const onConflictColumn = hasSpiderVoRef ? 'spider_vo_ref' : 'id';
  console.log(`Using upsert key: ${onConflictColumn}`);
  console.log('');

  // 3. Fetch XML feed
  console.log('📡 Fetching SpiderVO feed...');
  const feedResp = await fetch(SPIDER_VO_URL);
  if (!feedResp.ok) {
    console.error(`❌ Failed to fetch feed: HTTP ${feedResp.status}`);
    process.exit(1);
  }
  const xml = await feedResp.text();
  console.log(`  ✓ Received ${(xml.length / 1024 / 1024).toFixed(1)} MB`);

  // 4. Parse XML
  console.log('📋 Parsing XML...');
  const parser = new XMLParser({
    ignoreAttributes: true,
    parseTagValue: false,
    trimValues: true,
    processEntities: false,
  });

  const parsed = parser.parse(xml);
  const vehiculesRaw = parsed?.vehicules?.vehicule;

  if (!vehiculesRaw) {
    console.error('❌ No <vehicule> elements found in XML');
    process.exit(1);
  }

  const vehicules: SpiderVOVehicle[] = Array.isArray(vehiculesRaw) ? vehiculesRaw : [vehiculesRaw];
  console.log(`  ✓ Found ${vehicules.length} vehicles in feed`);

  // 5. Map vehicles
  console.log('🔄 Mapping vehicles...');
  const rows: SupabaseVehicleRow[] = [];
  const currentRefs = new Set<string>();
  let skipped = 0;

  for (const v of vehicules) {
    try {
      const row = mapVehicle(v);

      // Skip vehicles with no price
      if (row.price <= 0) {
        skipped++;
        continue;
      }

      currentRefs.add(str(v.reference));

      // If we don't have spider_vo_ref column, use id as conflict target
      if (!hasSpiderVoRef) {
        // Remove spider_vo_ref from the row since the column doesn't exist
        const { spider_vo_ref, ...rowWithoutRef } = row;
        rows.push(rowWithoutRef as SupabaseVehicleRow);
      } else {
        rows.push(row);
      }
    } catch (err) {
      console.warn(`  ⚠️  Error mapping vehicle ${str(v.reference)}: ${err}`);
      skipped++;
    }
  }

  console.log(`  ✓ Mapped ${rows.length} vehicles (${skipped} skipped)`);
  console.log('');

  // Count stats
  const availableCount = rows.filter((r) => r.available).length;
  const unavailableCount = rows.filter((r) => !r.available).length;
  const withPhotos = rows.filter((r) => r.images.length > 0).length;
  const withoutPhotos = rows.filter((r) => r.images.length === 0).length;

  console.log(`  📊 Available: ${availableCount} | Unavailable in feed: ${unavailableCount}`);
  console.log(`  📸 With photos: ${withPhotos} | Without photos: ${withoutPhotos}`);

  // Count by fuel
  const fuelCounts: Record<string, number> = {};
  rows.forEach((r) => (fuelCounts[r.fuel] = (fuelCounts[r.fuel] || 0) + 1));
  console.log(`  ⛽ Fuel breakdown: ${Object.entries(fuelCounts).map(([k, v]) => `${k}=${v}`).join(', ')}`);

  // Count by agency
  const agencyCounts: Record<string, number> = {};
  rows.forEach((r) => (agencyCounts[r.agency_city] = (agencyCounts[r.agency_city] || 0) + 1));
  console.log(`  🏢 Agency breakdown: ${Object.entries(agencyCounts).map(([k, v]) => `${k}=${v}`).join(', ')}`);
  console.log('');

  // 6. Upsert into Supabase
  console.log('📤 Upserting into Supabase...');
  const { inserted, errors } = await upsertBatch(rows, onConflictColumn);
  console.log('');

  // 7. Mark removed vehicles as unavailable
  console.log('🔍 Checking for removed vehicles...');
  const markedUnavailable = await markRemovedAsUnavailable(currentRefs, hasSpiderVoRef);
  console.log(`  ✓ Marked ${markedUnavailable} vehicles as unavailable`);
  console.log('');

  // 8. Summary
  console.log('═══════════════════════════════════════════════════');
  console.log('📊 Sync Summary');
  console.log(`  Total in feed:      ${vehicules.length}`);
  console.log(`  Mapped:             ${rows.length}`);
  console.log(`  Upserted:           ${inserted}`);
  console.log(`  Skipped:            ${skipped}`);
  console.log(`  Errors:             ${errors.length}`);
  console.log(`  Marked unavailable: ${markedUnavailable}`);
  console.log('═══════════════════════════════════════════════════');

  if (errors.length > 0) {
    console.error('');
    console.error('Errors:');
    errors.forEach((e) => console.error(`  - ${e}`));
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
