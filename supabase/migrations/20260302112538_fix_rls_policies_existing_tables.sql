/*
  # Fix overly permissive RLS policies on existing tables

  ## Summary
  Replaces all USING (true) / WITH CHECK (true) policies that grant ANY
  authenticated user full write/delete access. Previous policies created IDOR
  vulnerabilities: any logged-in user could modify or delete all data.

  ## Strategy
  Admin role is stored in JWT app_metadata.role = 'admin' (set only via
  service-role key — cannot be set by clients).

  ## Tables fixed
  1. agencies      — write operations restricted to admin
  2. vehicles      — write operations restricted to admin
  3. reviews       — write operations restricted to admin
  4. contact_messages — read/update/delete restricted to admin
*/

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. agencies
-- ─────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Authenticated users can insert agencies" ON agencies;
DROP POLICY IF EXISTS "Authenticated users can update agencies" ON agencies;
DROP POLICY IF EXISTS "Authenticated users can delete agencies" ON agencies;

CREATE POLICY "Admin can insert agencies"
  ON agencies FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update agencies"
  ON agencies FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete agencies"
  ON agencies FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. vehicles
-- ─────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Authenticated users can insert vehicles" ON vehicles;
DROP POLICY IF EXISTS "Authenticated users can update vehicles" ON vehicles;
DROP POLICY IF EXISTS "Authenticated users can delete vehicles" ON vehicles;

CREATE POLICY "Admin can insert vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete vehicles"
  ON vehicles FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. reviews
-- ─────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Authenticated users can insert reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated users can update reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated users can delete reviews" ON reviews;

CREATE POLICY "Admin can insert reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. contact_messages
-- ─────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Authenticated users can read contact messages" ON contact_messages;

CREATE POLICY "Admin can read contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete contact messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
