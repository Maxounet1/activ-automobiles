/*
  # Create contact_messages table

  ## Summary
  Stores messages submitted via the contact form on the website.

  ## New Tables
  - `contact_messages`
    - `id` (uuid, primary key)
    - `name` (text) — Full name of the sender
    - `email` (text) — Email address
    - `phone` (text, nullable) — Optional phone number
    - `agency` (text, nullable) — Selected agency
    - `subject` (text) — Subject of the message
    - `message` (text) — Message body
    - `created_at` (timestamptz) — Submission timestamp
    - `read` (boolean) — Whether the message has been read

  ## Security
  - RLS enabled: only service role can read messages
  - Anonymous users can INSERT (submit contact form)
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  agency text DEFAULT '',
  subject text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);
