-- ═══════════════════════════════════════════════════════════════════════════════
-- SpiderVO Integration: Setup vehicles table
-- Run this SQL in the Supabase SQL Editor before running the sync script.
-- ═══════════════════════════════════════════════════════════════════════════════

-- Create vehicles table
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

-- Indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_vehicles_spider_vo_ref ON vehicles(spider_vo_ref) WHERE spider_vo_ref IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_vehicles_slug ON vehicles(slug);
CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON vehicles(brand);
CREATE INDEX IF NOT EXISTS idx_vehicles_model ON vehicles(model);
CREATE INDEX IF NOT EXISTS idx_vehicles_fuel ON vehicles(fuel);
CREATE INDEX IF NOT EXISTS idx_vehicles_price ON vehicles(price);
CREATE INDEX IF NOT EXISTS idx_vehicles_agency_id ON vehicles(agency_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_available ON vehicles(available);
CREATE INDEX IF NOT EXISTS idx_vehicles_featured ON vehicles(featured);

-- Enable Row Level Security
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Public read access
DO $$ BEGIN
  CREATE POLICY "Vehicles are viewable by everyone"
    ON vehicles FOR SELECT TO public USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Allow anon to insert (for sync script using anon key)
DO $$ BEGIN
  CREATE POLICY "Anon can insert vehicles"
    ON vehicles FOR INSERT TO anon WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Allow anon to update (for sync script using anon key)
DO $$ BEGIN
  CREATE POLICY "Anon can update vehicles"
    ON vehicles FOR UPDATE TO anon USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Allow authenticated users to manage vehicles
DO $$ BEGIN
  CREATE POLICY "Authenticated users can insert vehicles"
    ON vehicles FOR INSERT TO authenticated WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can update vehicles"
    ON vehicles FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can delete vehicles"
    ON vehicles FOR DELETE TO authenticated USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Verify
SELECT 'vehicles table created successfully' AS status;
SELECT count(*) AS existing_rows FROM vehicles;
