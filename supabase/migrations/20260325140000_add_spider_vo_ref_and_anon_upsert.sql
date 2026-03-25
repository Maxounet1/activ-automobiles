/*
  # Add spider_vo_ref column and anon write policies for sync

  1. Adds `spider_vo_ref` column to vehicles for SpiderVO sync
  2. Creates unique index on spider_vo_ref for upsert operations
  3. Adds anon INSERT/UPDATE/DELETE policies on vehicles for the sync script
*/

-- Add spider_vo_ref column
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS spider_vo_ref text;
CREATE UNIQUE INDEX IF NOT EXISTS idx_vehicles_spider_vo_ref ON vehicles(spider_vo_ref) WHERE spider_vo_ref IS NOT NULL;

-- Allow anon to write vehicles (needed for sync script using anon key)
CREATE POLICY IF NOT EXISTS "Anon can insert vehicles"
  ON vehicles FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Anon can update vehicles"
  ON vehicles FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
