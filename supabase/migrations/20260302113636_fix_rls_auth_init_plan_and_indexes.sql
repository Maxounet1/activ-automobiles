/*
  # Fix RLS auth initialization plan and unused indexes

  ## Summary
  Two categories of fixes:

  1. Auth RLS Initialization Plan — all policies that call auth.jwt() directly
     are updated to wrap the call in (select auth.jwt()) so Postgres evaluates
     it once per query instead of once per row, eliminating the performance
     regression flagged by the Supabase advisor.

  2. blog_posts always-true write policies — any authenticated user could
     INSERT / UPDATE / DELETE blog posts. Restricted to admin role only.

  ## Tables affected
  - leads (3 policies)
  - agencies (3 policies)
  - vehicles (3 policies)
  - reviews (3 policies)
  - contact_messages (3 policies)
  - reservations (3 policies)
  - blog_posts (3 policies fixed + converted to admin-only)

  ## Indexes
  Unused indexes are dropped to reduce write overhead and storage.
  These can be re-added if query patterns change in the future.
*/

-- ─────────────────────────────────────────────────────────────────────────────
-- HELPER: shorthand used throughout
-- (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
-- ─────────────────────────────────────────────────────────────────────────────

-- ─────────────────────────────────────────────────────────────────────────────
-- leads
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Admin can read all leads" ON leads;
DROP POLICY IF EXISTS "Admin can update leads" ON leads;
DROP POLICY IF EXISTS "Admin can delete leads" ON leads;

CREATE POLICY "Admin can read all leads"
  ON leads FOR SELECT
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete leads"
  ON leads FOR DELETE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ─────────────────────────────────────────────────────────────────────────────
-- agencies
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Admin can insert agencies" ON agencies;
DROP POLICY IF EXISTS "Admin can update agencies" ON agencies;
DROP POLICY IF EXISTS "Admin can delete agencies" ON agencies;

CREATE POLICY "Admin can insert agencies"
  ON agencies FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update agencies"
  ON agencies FOR UPDATE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete agencies"
  ON agencies FOR DELETE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ─────────────────────────────────────────────────────────────────────────────
-- vehicles
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Admin can insert vehicles" ON vehicles;
DROP POLICY IF EXISTS "Admin can update vehicles" ON vehicles;
DROP POLICY IF EXISTS "Admin can delete vehicles" ON vehicles;

CREATE POLICY "Admin can insert vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete vehicles"
  ON vehicles FOR DELETE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ─────────────────────────────────────────────────────────────────────────────
-- reviews
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Admin can insert reviews" ON reviews;
DROP POLICY IF EXISTS "Admin can update reviews" ON reviews;
DROP POLICY IF EXISTS "Admin can delete reviews" ON reviews;

CREATE POLICY "Admin can insert reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ─────────────────────────────────────────────────────────────────────────────
-- contact_messages
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Admin can read contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin can update contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin can delete contact messages" ON contact_messages;

CREATE POLICY "Admin can read contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete contact messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ─────────────────────────────────────────────────────────────────────────────
-- reservations
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Admin can read all reservations" ON reservations;
DROP POLICY IF EXISTS "Admin can update reservations" ON reservations;
DROP POLICY IF EXISTS "Admin can delete reservations" ON reservations;

CREATE POLICY "Admin can read all reservations"
  ON reservations FOR SELECT
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update reservations"
  ON reservations FOR UPDATE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete reservations"
  ON reservations FOR DELETE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ─────────────────────────────────────────────────────────────────────────────
-- blog_posts — replace always-true policies with admin-only
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON blog_posts;

CREATE POLICY "Admin can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admin can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ─────────────────────────────────────────────────────────────────────────────
-- Drop unused indexes
-- ─────────────────────────────────────────────────────────────────────────────
DROP INDEX IF EXISTS idx_agencies_city;
DROP INDEX IF EXISTS idx_vehicles_brand;
DROP INDEX IF EXISTS idx_vehicles_model;
DROP INDEX IF EXISTS idx_vehicles_available;
DROP INDEX IF EXISTS idx_vehicles_featured;
DROP INDEX IF EXISTS idx_reviews_agency_id;
DROP INDEX IF EXISTS idx_reviews_rating;
DROP INDEX IF EXISTS blog_posts_featured_idx;
DROP INDEX IF EXISTS idx_comparator_sessions_key;
DROP INDEX IF EXISTS idx_leads_created_at;
DROP INDEX IF EXISTS idx_leads_status;
DROP INDEX IF EXISTS idx_leads_type;
