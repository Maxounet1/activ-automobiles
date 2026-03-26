#!/usr/bin/env node
/**
 * Pre-build script: fetches SpiderVO XML feed and saves parsed vehicles as JSON.
 * This avoids runtime fetch timeouts on Vercel Hobby (10s limit).
 * Run via: node scripts/prebuild-spidervo.mjs
 */

import { XMLParser } from 'fast-xml-parser';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '..', 'lib', 'data', 'spidervo-vehicles.json');

const SPIDER_VO_URL =
  process.env.SPIDER_VO_URL ||
  'https://www.spider-vo.net/api/42446d400a5100572452215d225e07590b5f10433071174d3d3c0435090a0519012f13280b';

// ─── Mappings ───────────────────────────────────────────────────────────────

const FUEL_MAP = {
  DIESEL: 'diesel', ESSENCE: 'essence', GPL: 'gpl', ELECTRIQUE: 'electrique',
  HYBRIDE: 'hybride', 'HYBRIDE RECHARGEABLE': 'hybride-rechargeable',
  'HYBRIDE RECHARGEABLE ESSENCE': 'hybride-rechargeable',
  'HYBRIDE RECHARGEABLE DIESEL': 'hybride-rechargeable',
  'HYBRIDE ESSENCE': 'hybride', 'HYBRIDE DIESEL': 'hybride',
  'MICRO HYBRIDE ESSENCE': 'hybride', 'MICRO HYBRIDE DIESEL': 'hybride',
};
const BODY_MAP = {
  SUV: 'suv', BERLINE: 'berline', BREAK: 'break', CITADINE: 'citadine',
  COUPE: 'coupe', 'COUPÉ': 'coupe', CABRIOLET: 'cabriolet',
  MONOSPACE: 'monospace', UTILITAIRE: 'utilitaire',
};
const TRANSMISSION_MAP = { A: 'automatique', M: 'manuelle' };

const AGENCY_RULES = [
  { test: l => l.includes('54520') || l.toLowerCase().includes('laxou'), agency: { id: 'agence-nancy-laxou', city: 'Nancy-Laxou' } },
  { test: l => l.includes('57525') || l.toLowerCase().includes('talange'), agency: { id: 'agence-talange', city: 'Talange' } },
  { test: l => l.includes('88150') || l.toLowerCase().includes('chavelot') || l.toLowerCase().includes('epinal') || l.toLowerCase().includes('épinal'), agency: { id: 'agence-epinal-chavelot', city: 'Épinal-Chavelot' } },
  { test: l => l.includes('85150') || l.toLowerCase().includes('mothe'), agency: { id: 'agence-la-mothe-achard', city: 'La Mothe-Achard' } },
  { test: l => l.includes('33127') || l.toLowerCase().includes('bordeaux'), agency: { id: 'agence-bordeaux', city: 'Bordeaux' } },
  { test: l => l.includes('35760') || l.toLowerCase().includes('grégoire') || l.toLowerCase().includes('gregoire') || l.toLowerCase().includes('rennes'), agency: { id: 'agence-rennes', city: 'Rennes' } },
];

function resolveAgency(loc) {
  for (const rule of AGENCY_RULES) {
    if (rule.test(loc)) return rule.agency;
  }
  const match = loc.match(/\d{5}\s+([A-Za-zÀ-ÿ-]+)/);
  return { id: 'agence-nancy-laxou', city: match ? match[1] : 'Nancy-Laxou' };
}

function slugify(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function str(v) { return v == null ? '' : String(v).trim(); }
function num(v, fallback = 0) { const n = Number(v); return isNaN(n) ? fallback : n; }

function capitalizeBrand(b) {
  if (!b) return '';
  return b.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('-');
}

function capitalizeModel(m) {
  if (!m) return '';
  return m.charAt(0).toUpperCase() + m.slice(1);
}

function parseList(raw, key) {
  if (!raw || typeof raw === 'string') return [];
  const items = raw[key];
  if (!items) return [];
  return Array.isArray(items) ? items.filter(Boolean) : [items].filter(Boolean);
}

function mapVehicle(v) {
  const reference = str(v.reference);
  const brand = capitalizeBrand(str(v.marque));
  const model = capitalizeModel(str(v.modele));
  const version = str(v.version);
  const year = num(v.anneemodele, new Date().getFullYear());
  const mileage = num(v.kilometrage);
  const price = num(v.prixttcaffiche);
  const monthlyPrice = price > 0 ? Math.round(price / 48) : undefined;
  const fuel = FUEL_MAP[str(v.energie).toUpperCase()] || 'essence';
  const bodyType = BODY_MAP[str(v.carrosserie).toUpperCase()] || 'berline';
  const transmission = TRANSMISSION_MAP[str(v.typeboite).toUpperCase()] || 'manuelle';
  const { id: agencyId, city: agencyCity } = resolveAgency(str(v.lieu_de_stockage));
  const photos = parseList(v.photos, 'photo');
  const images = photos.map(url => ({ url, alt: `${brand} ${model} ${year}`, width: 800, height: 600 }));
  const opts = parseList(v.options, 'option');
  const equips = parseList(v.equipements, 'equipement');
  const allOptions = [...new Set([...opts, ...equips])];
  const dispo = str(v.disponibilite);
  const typeDossier = str(v.type_dossier);
  const available = dispo === 's00' && typeDossier === 'Stock';
  const slug = [brand, model, version, reference].map(slugify).filter(Boolean).join('-').substring(0, 200);
  const now = new Date().toISOString();

  return {
    id: `spidervo-${reference}`, slug, brand, model, version, year, mileage, price, monthlyPrice,
    fuel, transmission, bodyType, condition: 'occasion',
    color: str(v.couleurexterieur) || 'Non spécifié',
    doors: num(v.nbrporte, 5), seats: num(v.nbrplace, 5),
    power: num(v.puissancedyn, 0), co2: num(v.emissions_co2, 0),
    description: str(v.description) || `${brand} ${model} ${version} - ${year} - ${mileage} km`,
    images, agencyId, agencyCity, available, featured: false,
    createdAt: now, updatedAt: now, options: allOptions,
    vin: str(v.vin), dtp: str(v.immat),
  };
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('[prebuild] Fetching SpiderVO XML feed...');
  const resp = await fetch(SPIDER_VO_URL);
  if (!resp.ok) {
    console.error(`[prebuild] HTTP ${resp.status}`);
    process.exit(1);
  }
  const xml = await resp.text();
  console.log(`[prebuild] Received ${(xml.length / 1024 / 1024).toFixed(1)} MB`);

  const parser = new XMLParser({ ignoreAttributes: true, parseTagValue: false, trimValues: true, processEntities: false });
  const parsed = parser.parse(xml);
  const raw = parsed?.vehicules?.vehicule;
  if (!raw) { console.error('[prebuild] No vehicles found'); process.exit(1); }

  const vehicules = Array.isArray(raw) ? raw : [raw];
  const vehicles = [];
  for (const v of vehicules) {
    try {
      const mapped = mapVehicle(v);
      if (mapped.price > 0) vehicles.push(mapped);
    } catch (err) {
      console.warn(`[prebuild] Error mapping ${str(v.reference)}: ${err}`);
    }
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(vehicles, null, 0));
  console.log(`[prebuild] Saved ${vehicles.length} vehicles to ${OUTPUT_PATH}`);
}

main().catch(err => { console.error(err); process.exit(1); });
