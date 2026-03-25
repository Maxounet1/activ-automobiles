# Activ Automobiles — Application Web Multi-Agences

Application Next.js 14 production-ready pour un réseau de concessions automobiles, optimisée SEO et conversion.

---

## Démarrage rapide

```bash
npm install
npm run dev
```

Pour builder en production :
```bash
npm run build
npm run start
```

---

## Architecture du projet

```
app/                        Pages (App Router Next.js 14)
  page.tsx                  Page d'accueil
  voitures-occasion/        Listing + facettes (marque, énergie, budget)
  vehicule/[slug]/          Fiche véhicule
  agences/                  Liste agences + pages locales
  services/                 Financement, Reprise, Garantie, Livraison
  blog/                     Articles
  legal/                    Mentions légales, RGPD, Cookies
  sitemap.ts                Sitemap dynamique
  robots.ts                 Robots.txt

components/
  layout/                   Header, Footer, MegaSearch
  home/                     Sections page d'accueil
  vehicles/                 VehicleCard, VehicleGrid, VehicleGallery, FinanceWidget
  agency/                   AgencyCard, AgencyMapSection
  forms/                    LeadForm, FinanceForm, TradeInForm, ReservationForm
  common/                   FAQAccordion, TradeInCTA

lib/
  types.ts                  Types TypeScript (Vehicle, Agency, Lead, etc.)
  analytics.ts              Tracking events (GA4 + Meta Pixel)
  utils.ts                  Helpers, constantes, formatage
  data/                     Données seed JSON (vehicles, agencies, blog, reviews)

repository/                 Couche d'accès aux données (server-only)
  vehicles.ts
  agencies.ts
  blog.ts
  reviews.ts
```

---

## Connecter votre propre API ou CSV

### Option A — API REST

Dans `repository/vehicles.ts`, remplacez l'import JSON par des appels fetch :

```typescript
// Avant (seed data)
import vehiclesData from '@/lib/data/vehicles.json';

// Après (API)
export async function getAllVehicles(): Promise<Vehicle[]> {
  const res = await fetch('https://votre-api.fr/vehicles', {
    next: { revalidate: 3600 }
  });
  return res.json();
}
```

### Option B — Base de données Supabase

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function getAllVehicles(): Promise<Vehicle[]> {
  const { data } = await supabase.from('vehicles').select('*');
  return data ?? [];
}
```

### Option C — Import CSV

Créez un script `scripts/import-csv.ts` qui lit votre CSV, transforme les données selon l'interface `Vehicle` de `lib/types.ts`, et écrit dans `lib/data/vehicles.json` ou Supabase.

---

## Règles SEO

### Pages indexables (robots: index, follow)
- `/` — Page d'accueil
- `/voitures-occasion` — Listing principal
- `/voitures-occasion/[marque]` — Facette marque ✓ indexée
- `/voitures-occasion/[marque]/[modele]` — Facette modèle ✓ indexée
- `/voitures-occasion/energie/[energie]` — Facette énergie ✓ indexée
- `/voitures-occasion/prix/[budget]` — Facette budget ✓ indexée
- `/vehicule/[slug]` — Fiche véhicule
- `/agences/[ville]` — Pages locales (SEO local !)
- `/services/*` — Pages services
- `/blog/[slug]` — Articles

### Pages non-indexables (robots: noindex)
- `/reservation/[id]` — Pages transactionnelles
- Filtres secondaires (couleur, options, km exact) : ajouter `?noindex=1` + canonical vers la page mère

### Canonicals
Chaque page a son canonical défini dans `generateMetadata()`. Pour les filtres non-indexables via URL params, ajoutez :

```typescript
alternates: {
  canonical: `https://www.activ-automobiles.fr/voitures-occasion`
}
```

### Schema.org JSON-LD implémentés
- `Car` (Vehicle) sur fiches véhicule — prix, km, carburant, disponibilité, images
- `AutoDealer` / `LocalBusiness` sur pages agences
- `FAQPage` sur pages services, marques, modèles, énergies, budgets
- `BreadcrumbList` sur toutes les pages
- `Organization` + `WebSite` (SearchAction) sur la homepage
- `Article` sur les articles de blog

---

## Analytics

Toutes les interactions importantes sont trackées via `lib/analytics.ts` :

| Événement | Déclencheur |
|-----------|-------------|
| `click_call` | Clic téléphone (header, fiche, sticky CTA) |
| `click_whatsapp` | Clic WhatsApp |
| `submit_lead` | Envoi formulaire de contact |
| `submit_finance` | Envoi demande de financement |
| `submit_tradein` | Envoi demande de reprise |
| `start_reservation` | Étape 1 du formulaire de réservation |
| `complete_reservation` | Confirmation réservation |
| `view_financing` | Vue du widget de financement |

Pour connecter GA4 : ajoutez votre script gtag dans `app/layout.tsx`. Le fichier `analytics.ts` détecte automatiquement `window.gtag` et `window.fbq`.

---

## Checklist Production

### Performance
- [ ] Vérifier les Core Web Vitals avec PageSpeed Insights
- [ ] Activer next/image optimization (supprimer `unoptimized: true` dans `next.config.js`)
- [ ] Configurer les domaines d'images autorisés dans `next.config.js`
- [ ] Activer la compression Brotli/Gzip sur le serveur
- [ ] Configurer un CDN (Vercel Edge, CloudFront)

### Cache & Revalidation
- [ ] Ajuster `export const revalidate = 3600` selon la fréquence de mise à jour du stock
- [ ] Mettre en place des webhooks pour invalider le cache lors des mises à jour (ISR on-demand)

### SEO
- [ ] Mettre à jour `SITE_URL` dans `lib/utils.ts` avec le vrai domaine
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Configurer `metadataBase` dans `app/layout.tsx`
- [ ] Remplacer les images Pexels par vos vraies photos
- [ ] Ajouter votre code Google Search Console dans `app/layout.tsx`

### Données
- [ ] Remplacer les seed data JSON par votre vraie API ou base de données
- [ ] Implémenter la persistance des leads (formulaires → base de données ou CRM)
- [ ] Configurer les notifications email sur soumission de formulaire
- [ ] Tester le flow complet de réservation

### Légal
- [ ] Mettre à jour les mentions légales avec les vraies informations
- [ ] Vérifier la conformité RGPD avec votre DPO
- [ ] Implémenter un vrai bandeau de consentement cookies (ex: Axeptio, Didomi)

### Google Maps
- [ ] Remplacer le placeholder carte dans `AgencyMapSection` par Google Maps ou Mapbox
- [ ] Obtenir et configurer une clé API Google Maps

---

## Variables d'environnement

```bash
# Supabase (si utilisé)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_KEY=xxx

# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX
```

---

## Technologies utilisées

- **Next.js 14** — App Router, SSG/ISR, Server Components
- **TypeScript** — typage complet
- **Tailwind CSS** — styles utility-first
- **shadcn/ui** — composants UI accessibles
- **react-hook-form + zod** — formulaires avec validation
- **lucide-react** — icônes

---

*Activ Automobiles — Paris · Lyon · Bordeaux*
