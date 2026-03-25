import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import { createClient } from '@supabase/supabase-js';

// ─── Config ────────────────────────────────────────────────────────────────────

const SYNC_SECRET = process.env.SYNC_SECRET || '';
const SPIDER_VO_URL =
  process.env.SPIDER_VO_URL ||
  'https://www.spider-vo.net/api/42446d400a5100572452215d225e07590b5f10433071174d3d3c0435090a0519012f13280b';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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

interface AgencyMatch { id: string; city: string; }

const AGENCY_RULES: { test: (loc: string) => boolean; agency: AgencyMatch }[] = [
  { test: (l) => l.includes('54520') || l.toLowerCase().includes('laxou'), agency: { id: 'agence-nancy-laxou', city: 'Nancy-Laxou' } },
  { test: (l) => l.includes('57525') || l.toLowerCase().includes('talange'), agency: { id: 'agence-talange', city: 'Talange' } },
  { test: (l) => l.includes('88150') || l.toLowerCase().includes('chavelot') || l.toLowerCase().includes('epinal'), agency: { id: 'agence-epinal-chavelot', city: 'Épinal-Chavelot' } },
  { test: (l) => l.includes('85150') || l.toLowerCase().includes('mothe'), agency: { id: 'agence-la-mothe-achard', city: 'La Mothe-Achard' } },
  { test: (l) => l.includes('33127') || l.toLowerCase().includes('bordeaux'), agency: { id: 'agence-bordeaux', city: 'Bordeaux' } },
  { test: (l) => l.includes('35760') || l.toLowerCase().includes('grégoire') || l.toLowerCase().includes('rennes'), agency: { id: 'agence-rennes', city: 'Rennes' } },
];

function resolveAgency(lieu: string): AgencyMatch {
  for (const rule of AGENCY_RULES) {
    if (rule.test(lieu)) return rule.agency;
  }
  return { id: 'agence-nancy-laxou', city: 'Nancy-Laxou' };
}

function slugify(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function capitalizeBrand(brand: string): string {
  if (!brand) return '';
  return brand.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('-');
}

function capitalizeModel(model: string): string {
  if (!model) return '';
  return model.charAt(0).toUpperCase() + model.slice(1);
}

function str(v: unknown): string {
  if (v == null) return '';
  return String(v).trim();
}

function num(v: unknown, fb = 0): number {
  const n = Number(v);
  return isNaN(n) ? fb : n;
}

function parseList(raw: unknown, key: string): string[] {
  if (!raw || typeof raw === 'string') return [];
  const items = (raw as Record<string, unknown>)[key];
  if (!items) return [];
  return Array.isArray(items) ? items.filter(Boolean).map(String) : [String(items)].filter(Boolean);
}

function mapVehicle(v: Record<string, unknown>) {
  const reference = str(v.reference);
  const brand = capitalizeBrand(str(v.marque));
  const model = capitalizeModel(str(v.modele));
  const version = str(v.version);
  const year = num(v.anneemodele, new Date().getFullYear());
  const mileage = num(v.kilometrage);
  const price = num(v.prixttcaffiche);
  const fuel = FUEL_MAP[str(v.energie).toUpperCase()] || 'essence';
  const bodyType = BODY_MAP[str(v.carrosserie).toUpperCase()] || 'berline';
  const transmission = TRANSMISSION_MAP[str(v.typeboite).toUpperCase()] || 'manuelle';
  const { id: agencyId, city: agencyCity } = resolveAgency(str(v.lieu_de_stockage));

  const photos = parseList(v.photos, 'photo');
  const images = photos.map((url) => ({ url, alt: `${brand} ${model} ${year}`, width: 800, height: 600 }));

  const opts = parseList(v.options, 'option');
  const equips = parseList(v.equipements, 'equipement');

  const available = str(v.disponibilite) === 's00' && str(v.type_dossier) === 'Stock';

  return {
    id: `spidervo-${reference}`,
    slug: [brand, model, version, reference].map(slugify).filter(Boolean).join('-').substring(0, 200),
    brand,
    model,
    version,
    year,
    mileage,
    price,
    monthly_price: price > 0 ? Math.round(price / 48) : null,
    fuel,
    transmission,
    body_type: bodyType,
    condition: 'occasion',
    color: str(v.couleurexterieur) || 'Non spécifié',
    doors: num(v.nbrporte, 5),
    seats: num(v.nbrplace, 5),
    power: num(v.puissancedyn, 0),
    co2: num(v.emissions_co2, 0),
    description: str(v.description) || `${brand} ${model} ${version} - ${year} - ${mileage} km`,
    images,
    agency_id: agencyId,
    agency_city: agencyCity,
    available,
    featured: false,
    options: Array.from(new Set([...opts, ...equips])),
    vin: str(v.vin),
    dtp: str(v.immat),
    spider_vo_ref: reference,
    updated_at: new Date().toISOString(),
  };
}

// ─── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  // Auth check
  const authHeader = request.headers.get('authorization');
  const url = new URL(request.url);
  const secretParam = url.searchParams.get('secret');
  const providedSecret = authHeader?.replace('Bearer ', '') || secretParam;

  if (!SYNC_SECRET || providedSecret !== SYNC_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch XML
    const feedResp = await fetch(SPIDER_VO_URL);
    if (!feedResp.ok) {
      return NextResponse.json({ error: `Feed fetch failed: ${feedResp.status}` }, { status: 502 });
    }
    const xml = await feedResp.text();

    // Parse
    const parser = new XMLParser({ ignoreAttributes: true, parseTagValue: false, trimValues: true, processEntities: false });
    const parsed = parser.parse(xml);
    const vehiculesRaw = parsed?.vehicules?.vehicule;
    if (!vehiculesRaw) {
      return NextResponse.json({ error: 'No vehicles found in feed' }, { status: 502 });
    }

    const vehicules: Record<string, unknown>[] = Array.isArray(vehiculesRaw) ? vehiculesRaw : [vehiculesRaw];

    // Map
    const rows = vehicules.map(mapVehicle).filter((r) => r.price > 0);
    const currentRefs = new Set(rows.map((r) => r.spider_vo_ref));

    // Upsert in batches
    let upsertedCount = 0;
    const errors: string[] = [];
    const batchSize = 50;

    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const { error } = await supabase.from('vehicles').upsert(batch, { onConflict: 'id' });
      if (error) {
        errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
      } else {
        upsertedCount += batch.length;
      }
    }

    // Mark removed vehicles as unavailable
    const { data: existing } = await supabase.from('vehicles').select('id,spider_vo_ref').eq('available', true);
    let markedUnavailable = 0;

    if (existing) {
      for (const row of existing) {
        const ref = row.spider_vo_ref || (typeof row.id === 'string' && row.id.startsWith('spidervo-') ? row.id.replace('spidervo-', '') : null);
        if (ref && !currentRefs.has(ref)) {
          await supabase.from('vehicles').update({ available: false, updated_at: new Date().toISOString() }).eq('id', row.id);
          markedUnavailable++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      total_in_feed: vehicules.length,
      upserted: upsertedCount,
      marked_unavailable: markedUnavailable,
      errors,
    });
  } catch (err) {
    console.error('[sync-spidervo] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  if (!SYNC_SECRET || secret !== SYNC_SECRET) {
    return NextResponse.json({ error: 'Unauthorized. Use POST with Authorization header or ?secret= param.' }, { status: 401 });
  }

  // Redirect GET to POST for convenience (e.g., from a cron service)
  return POST(request);
}
