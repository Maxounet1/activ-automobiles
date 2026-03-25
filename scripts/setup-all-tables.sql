-- ═══════════════════════════════════════════════════════════════════════════════
-- Full database setup: agencies, vehicles, reviews tables
-- Run this SQL in the Supabase SQL Editor to set up the entire database.
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── Agencies ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS agencies (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  city text NOT NULL,
  address text NOT NULL,
  zip_code text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  lat numeric NOT NULL,
  lng numeric NOT NULL,
  opening_hours jsonb NOT NULL DEFAULT '[]'::jsonb,
  services text[] NOT NULL DEFAULT '{}'::text[],
  rating numeric NOT NULL DEFAULT 0,
  review_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Agencies are viewable by everyone" ON agencies FOR SELECT TO public USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anon can insert agencies" ON agencies FOR INSERT TO anon WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anon can update agencies" ON agencies FOR UPDATE TO anon USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Seed agencies
INSERT INTO agencies (id, slug, name, city, address, zip_code, phone, email, description, image, lat, lng, opening_hours, services, rating, review_count)
VALUES
  ('agence-nancy-laxou', 'nancy-laxou', 'Activ Automobiles Nancy-Laxou', 'Nancy-Laxou', '12 Rue du Saintois', '54520', '03 83 97 97 97', 'Laxou@activ-automobiles.com', 'Bienvenue chez Activ Automobiles Nancy-Laxou, votre spécialiste de la vente de véhicules d''occasion premium dans la région Grand Est.', 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', 48.6847, 6.1464, '[{"day":"Lundi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Mardi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Mercredi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Jeudi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Vendredi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Samedi","hours":"09h00 - 12h00 / 14h00 - 18h00"},{"day":"Dimanche","hours":"Fermé"}]'::jsonb, ARRAY['Vente de véhicules d''occasion','Financement et crédit auto','Reprise de votre véhicule','Garantie minimum 12 mois','Préparation esthétique','Livraison à domicile','Extension de garantie'], 4.6, 643),
  ('agence-talange', 'talange', 'Activ Automobiles Talange', 'Talange', 'Rue du Pré le Loop', '57525', '03 87 73 73 73', 'Talange@activ-automobiles.com', 'Activ Automobiles Talange vous accueille dans son showroom moderne en Moselle.', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg', 49.2833, 6.1697, '[{"day":"Lundi","hours":"10h00 - 19h00"},{"day":"Mardi","hours":"10h00 - 19h00"},{"day":"Mercredi","hours":"10h00 - 19h00"},{"day":"Jeudi","hours":"10h00 - 19h00"},{"day":"Vendredi","hours":"10h00 - 19h00"},{"day":"Samedi","hours":"10h00 - 18h00"},{"day":"Dimanche","hours":"Fermé"}]'::jsonb, ARRAY['Vente de véhicules d''occasion','Financement et leasing','Reprise de votre véhicule','Garantie minimum 12 mois'], 4.7, 559),
  ('agence-epinal-chavelot', 'epinal-chavelot', 'Activ Automobiles Épinal-Chavelot', 'Épinal-Chavelot', '22 Rue d''Épinal', '88150', '03 29 99 09 99', 'Epinal@activ-automobiles.com', 'Activ Automobiles Épinal-Chavelot est votre référence pour l''achat d''un véhicule d''occasion de qualité dans les Vosges.', 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg', 48.1778, 6.4286, '[{"day":"Lundi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Mardi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Mercredi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Jeudi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Vendredi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Samedi","hours":"09h00 - 12h00 / 14h00 - 18h00"},{"day":"Dimanche","hours":"Fermé"}]'::jsonb, ARRAY['Vente de véhicules d''occasion','Financement personnalisé','Reprise et estimation gratuite'], 4.7, 343),
  ('agence-la-mothe-achard', 'la-mothe-achard', 'Activ Automobiles La Mothe-Achard', 'La Mothe-Achard', '3 Rue Michel Breton', '85150', '02 19 08 01 10', 'Lamotheachard@activ-automobiles.com', 'Activ Automobiles La Mothe-Achard vous accueille en Vendée, à deux pas des Achards.', 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg', 46.6167, -1.6500, '[{"day":"Lundi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Mardi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Mercredi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Jeudi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Vendredi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Samedi","hours":"09h00 - 12h00 / 14h00 - 18h00"},{"day":"Dimanche","hours":"Fermé"}]'::jsonb, ARRAY['Vente de véhicules d''occasion','Financement et crédit auto','Reprise de votre véhicule'], 4.6, 234),
  ('agence-bordeaux', 'bordeaux', 'Activ Automobiles Bordeaux', 'Bordeaux', '82 Rue Marie Curie', '33127', '05 18 25 14 94', 'Bordeaux@activ-automobiles.com', 'Activ Automobiles Bordeaux vous accueille à Saint-Jean-d''Illac, à proximité de Bordeaux.', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg', 44.8135, -0.8517, '[{"day":"Lundi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Mardi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Mercredi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Jeudi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Vendredi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Samedi","hours":"09h00 - 12h00 / 14h00 - 18h00"},{"day":"Dimanche","hours":"Fermé"}]'::jsonb, ARRAY['Vente de véhicules d''occasion','Financement personnalisé','Reprise et estimation gratuite'], 4.6, 204),
  ('agence-rennes', 'rennes', 'Activ Automobiles Rennes', 'Rennes', 'ZA La Brosse', '35760', '02 19 08 01 09', 'Rennes@activ-automobiles.com', 'Activ Automobiles Rennes vous accueille à Saint-Grégoire, au nord de Rennes.', 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg', 48.1536, -1.6668, '[{"day":"Lundi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Mardi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Mercredi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Jeudi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Vendredi","hours":"09h00 - 12h00 / 14h00 - 19h00"},{"day":"Samedi","hours":"09h00 - 12h00 / 14h00 - 18h00"},{"day":"Dimanche","hours":"Fermé"}]'::jsonb, ARRAY['Vente de véhicules d''occasion','Financement et leasing','Reprise de votre véhicule'], 4.9, 94)
ON CONFLICT (id) DO NOTHING;

-- ─── Vehicles ──────────────────────────────────────────────────────────────────

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
CREATE INDEX IF NOT EXISTS idx_vehicles_model ON vehicles(model);
CREATE INDEX IF NOT EXISTS idx_vehicles_fuel ON vehicles(fuel);
CREATE INDEX IF NOT EXISTS idx_vehicles_price ON vehicles(price);
CREATE INDEX IF NOT EXISTS idx_vehicles_agency_id ON vehicles(agency_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_available ON vehicles(available);
CREATE INDEX IF NOT EXISTS idx_vehicles_featured ON vehicles(featured);

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Vehicles are viewable by everyone" ON vehicles FOR SELECT TO public USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anon can insert vehicles" ON vehicles FOR INSERT TO anon WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anon can update vehicles" ON vehicles FOR UPDATE TO anon USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ─── Reviews ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS reviews (
  id text PRIMARY KEY,
  author text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  agency_id text,
  date timestamptz NOT NULL,
  source text NOT NULL DEFAULT 'google',
  visited_at text,
  reviewer_details text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT TO public USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Done
SELECT 'All tables created successfully' AS status;
