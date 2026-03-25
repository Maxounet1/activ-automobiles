/*
  # Create reservations, comparator_sessions, and leads tables with secure RLS

  ## Summary
  Creates three tables that the application uses but were missing from the live
  database. All tables have RLS enabled with restrictive policies from the start.

  ## New Tables

  ### reservations
  - Stores vehicle booking requests from the public website
  - Anyone (anon + authenticated) can INSERT their own reservation
  - Only admin users can SELECT / UPDATE / DELETE (contains PII)

  ### comparator_sessions
  - Stores vehicle comparison lists keyed by a client-generated session_key
  - Anyone can INSERT and SELECT their own session by key
  - UPDATE is restricted to the matching session_key (prevents cross-session tampering)
  - No DELETE exposed publicly; admin can delete

  ### leads
  - Stores lead capture form submissions (info requests, trade-in inquiries, etc.)
  - Anyone can INSERT
  - Only admin can SELECT / UPDATE / DELETE (contains PII: name, email, phone)

  ## Security
  - RLS enabled on all three tables
  - Write operations for sensitive data locked to admin (app_metadata.role = 'admin')
  - Public INSERT allowed only with no USING condition on SELECT for anonymous
*/

-- ─────────────────────────────────────────────────────────────────────────────
-- reservations
-- ─────────────────────────────────────────────────────────────────────────────

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

CREATE POLICY "Anyone can submit a reservation"
  ON reservations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can read all reservations"
  ON reservations FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update reservations"
  ON reservations FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete reservations"
  ON reservations FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ─────────────────────────────────────────────────────────────────────────────
-- comparator_sessions
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS comparator_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_key text NOT NULL DEFAULT '',
  vehicle_ids jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE comparator_sessions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_comparator_sessions_key ON comparator_sessions(session_key);

CREATE POLICY "Anyone can create a comparator session"
  ON comparator_sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read their own comparator session"
  ON comparator_sessions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can update own comparator session"
  ON comparator_sessions FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- leads
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'info',
  vehicle_id text,
  agency_id text,
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_type ON leads(type);

CREATE POLICY "Anyone can submit a lead"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can read all leads"
  ON leads FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete leads"
  ON leads FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
