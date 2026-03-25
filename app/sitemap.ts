import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/utils';
import { getAllVehicles } from '@/repository/vehicles';
import { getAllAgencies } from '@/repository/agencies';
import { getAllPosts } from '@/repository/blog';
import { BUDGET_RANGES, FUEL_TYPES } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [vehicles, agencies, posts] = await Promise.all([
    getAllVehicles(),
    getAllAgencies(),
    getAllPosts(),
  ]);

  // ── Static pages ──────────────────────────────────────────────────────────
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/voitures-occasion`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: `${SITE_URL}/agences`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/financement`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/services/reprise`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services/garantie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/services/livraison`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/nos-engagements`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  // ── Legal pages ───────────────────────────────────────────────────────────
  const legalPages = [
    { url: `${SITE_URL}/legal/confidentialite`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/legal/cookies`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/legal/cgv`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/legal/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  // ── Vehicle pages (canonical: /voitures-occasion/[slug]) ──────────────────
  const vehiclePages = vehicles.map((v) => ({
    url: `${SITE_URL}/voitures-occasion/${v.slug}`,
    lastModified: new Date(v.updatedAt),
    changeFrequency: 'daily' as const,
    priority: 0.8,
    images: v.images?.map(img => ({
      url: img.url,
      title: `${v.brand} ${v.model} ${img.label || ''}`.trim(),
      caption: `${v.brand} ${v.model} ${v.year} - ${v.mileage.toLocaleString('fr-FR')} km`,
    })) || [],
  }));

  // ── Agency pages ──────────────────────────────────────────────────────────
  const agencyPages = agencies.map((a) => ({
    url: `${SITE_URL}/agences/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ── SEO pages: brand ──────────────────────────────────────────────────────
  const brandPages = Array.from(new Set(vehicles.map((v) => v.brand))).map((brand) => ({
    url: `${SITE_URL}/voitures-occasion/${brand.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // ── SEO pages: brand + model ──────────────────────────────────────────────
  const seen = new Set<string>();
  const brandModelPages: MetadataRoute.Sitemap = [];
  for (const v of vehicles) {
    const key = `${v.brand}__${v.model}`;
    if (!seen.has(key)) {
      seen.add(key);
      const brandSlug = v.brand.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const modelSlug = v.model.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      brandModelPages.push({
        url: `${SITE_URL}/voitures-occasion/${brandSlug}/${modelSlug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.75,
      });
    }
  }

  // ── SEO pages: fuel type ──────────────────────────────────────────────────
  const fuelPages = FUEL_TYPES.map((f) => ({
    url: `${SITE_URL}/voitures-occasion/energie/${f.value}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  // ── SEO pages: budget range ───────────────────────────────────────────────
  const budgetPages = BUDGET_RANGES.map((b) => ({
    url: `${SITE_URL}/voitures-occasion/prix/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  // ── Blog pages ────────────────────────────────────────────────────────────
  const blogPages = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...legalPages,
    ...vehiclePages,
    ...agencyPages,
    ...brandPages,
    ...brandModelPages,
    ...fuelPages,
    ...budgetPages,
    ...blogPages,
  ] as MetadataRoute.Sitemap;
}
