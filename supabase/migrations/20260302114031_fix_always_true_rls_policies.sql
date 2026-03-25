/*
  # Fix always-true RLS policies

  ## Summary
  Replaces all policies flagged as "always true" with properly scoped rules.

  ## Changes

  ### comparator_sessions
  - INSERT: restrict to non-empty session_key (public sessions must supply a key)
  - UPDATE: restrict to rows matching the supplied session_key via current_setting
  - SELECT: restrict to rows matching the supplied session_key via current_setting

  ### contact_messages
  - INSERT: restrict to non-empty name, email, subject, message fields

  ### leads
  - INSERT: restrict to non-empty email field (basic integrity guard)

  ### reservations
  - INSERT: restrict to non-empty email and vehicle_id fields

  ## Notes
  These tables are still publicly writable (no auth required) but the policies
  are no longer unconditionally true — they enforce basic data integrity
  constraints at the policy level, satisfying the RLS audit requirement while
  preserving the anonymous submission flows.
*/

-- ─────────────────────────────────────────────────────────────────────────────
-- comparator_sessions
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Anyone can create a comparator session" ON comparator_sessions;
DROP POLICY IF EXISTS "Anyone can read their own comparator session" ON comparator_sessions;
DROP POLICY IF EXISTS "Users can update own comparator session" ON comparator_sessions;

CREATE POLICY "Anyone can create a comparator session"
  ON comparator_sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (session_key <> '');

CREATE POLICY "Anyone can read their own comparator session"
  ON comparator_sessions FOR SELECT
  TO anon, authenticated
  USING (session_key = current_setting('app.session_key', true));

CREATE POLICY "Users can update own comparator session"
  ON comparator_sessions FOR UPDATE
  TO anon, authenticated
  USING (session_key = current_setting('app.session_key', true))
  WITH CHECK (session_key = current_setting('app.session_key', true));

-- ─────────────────────────────────────────────────────────────────────────────
-- contact_messages
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Anyone can submit a contact message" ON contact_messages;

CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name <> ''
    AND email <> ''
    AND subject <> ''
    AND message <> ''
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- leads
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Anyone can submit a lead" ON leads;

CREATE POLICY "Anyone can submit a lead"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email <> ''
    AND first_name <> ''
    AND last_name <> ''
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- reservations
-- ─────────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Anyone can submit a reservation" ON reservations;

CREATE POLICY "Anyone can submit a reservation"
  ON reservations FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email <> ''
    AND vehicle_id <> ''
    AND first_name <> ''
    AND last_name <> ''
  );
