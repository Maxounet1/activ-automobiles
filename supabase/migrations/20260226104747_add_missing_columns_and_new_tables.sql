/*
  # Add missing columns and create new tables

  ## Summary
  - Adds is_approved column to reviews table for moderation
  - Creates reservations table for vehicle booking system
  - Creates comparator_sessions table for vehicle comparison feature

  ## Changes
  1. reviews: add is_approved boolean column
  2. New table: reservations
  3. New table: comparator_sessions

  ## Security
  - RLS enabled on new tables
  - Appropriate policies for public submission and admin management
*/

-- ─── reviews: add moderation column ─────────────────────────────────────────

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'is_approved'
  ) THEN
    ALTER TABLE reviews ADD COLUMN is_approved boolean DEFAULT true;
  END IF;
END $$;

-- ─── reservations ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id text NOT NULL DEFAULT '',
  vehicle_slug text NOT NULL DEFAULT '',
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  agency_name text NOT NULL DEFAULT '',
  preferred_date text NOT NULL DEFAULT '',
  time_slot text NOT NULL DEFAULT '',
  reservation_number text UNIQUE NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  deposit_paid boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can create reservations"
  ON reservations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can read reservations"
  ON reservations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update reservations"
  ON reservations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete reservations"
  ON reservations FOR DELETE
  TO authenticated
  USING (true);

-- ─── comparator_sessions ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS comparator_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_key text NOT NULL DEFAULT '',
  vehicle_ids jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE comparator_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert comparator sessions"
  ON comparator_sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can read comparator sessions"
  ON comparator_sessions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can update comparator sessions"
  ON comparator_sessions FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
